/**
 * Storefront Builder Composable (useStorefrontBuilder)
 * Uses Admin Brands & Categories API Services to match /admin/brands and /admin/categories dynamically.
 */
import { ref, computed } from 'vue'
import { useApi } from '~/services/api'
import { adminHomeSectionsApiService } from '~/services/adminHomeSectionsApiService'
import { adminBrandsApiService, type AdminBrandItem } from '~/services/adminBrandsApiService'
import { adminCategoriesApiService, type AdminCategoryItem } from '~/services/adminCategoriesApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export interface StorefrontBrandItem {
  id: number | string
  name: string
  name_ar?: string
  name_en?: string
  logo: string
  image?: string
  image_full_url?: string
  slug?: string
}

export interface StorefrontCategoryItem {
  id: number | string
  name: string
  name_ar?: string
  name_en?: string
  parent_id?: number | string
  position?: number
  slug?: string
  image?: string
  icon?: string
  subCategories?: StorefrontCategoryItem[]
}

export interface StorefrontSection {
  id: number | string
  type: string
  sort_order: number
  is_active: number | boolean
  data: Record<string, any>
  slides?: any[]
  [key: string]: any
}

export const useStorefrontBuilder = () => {
  const toast = useToast()
  const api = useApi()
  const { adminCookie, adminToken } = useAdminAuth()

  // Reactive State
  const sections = ref<StorefrontSection[]>([])
  const brands = ref<StorefrontBrandItem[]>([])
  const categories = ref<StorefrontCategoryItem[]>([])
  const allSubcategories = ref<StorefrontCategoryItem[]>([])

  const isLoading = ref<boolean>(false)
  const isLoadingBrands = ref<boolean>(false)
  const isLoadingCategories = ref<boolean>(false)
  const isSaving = ref<boolean>(false)
  const isReordering = ref<boolean>(false)
  const savingSectionId = ref<string | number | null>(null)

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // -------------------------------------------------------------
  // 1. Fetch Dynamic Brands (Exact match with /admin/brands)
  // -------------------------------------------------------------
  const fetchBrands = async (): Promise<StorefrontBrandItem[]> => {
    isLoadingBrands.value = true
    try {
      const token = getToken()
      
      // 1. Primary call: Admin Brands API (limit=100)
      const adminRes = await adminBrandsApiService.fetchBrands(token, '', 1, 100)
      if (adminRes.success && Array.isArray(adminRes.data) && adminRes.data.length > 0) {
        brands.value = adminRes.data.map(b => {
          const imgUrl = b.image || b.logo || ''
          return {
            id: b.id,
            name: b.name_ar || b.name || b.name_en || 'علامة تجارية',
            name_ar: b.name_ar,
            name_en: b.name_en,
            logo: imgUrl,
            image: imgUrl,
            image_full_url: imgUrl,
            slug: (b.name_en || b.name || String(b.id)).toLowerCase().replace(/\s+/g, '-')
          }
        })
        return brands.value
      }

      // 2. Secondary fallback: Storefront Brands API
      const publicRes: any = await api.get('/api/v1/brands')
      const rawList = Array.isArray(publicRes) ? publicRes : (publicRes?.data || [])

      if (Array.isArray(rawList) && rawList.length > 0) {
        brands.value = rawList.map((b: any, idx: number) => {
          const logoUrl = b.image_full_url?.path || b.image_full_url || b.logo || b.image || b.icon || ''
          const name = b.name || b.name_ar || b.name_en || b.title_ar || b.title_en || `Brand ${idx + 1}`
          return {
            id: b.id || idx + 1,
            name,
            name_ar: b.name_ar,
            name_en: b.name_en,
            logo: logoUrl,
            image: logoUrl,
            image_full_url: logoUrl,
            slug: b.slug || name.toLowerCase().replace(/\s+/g, '-')
          }
        }).filter(b => Boolean(b.name))
      }
      return brands.value
    } catch (err) {
      console.warn('[useStorefrontBuilder] Failed to fetch live brands:', err)
      return brands.value
    } finally {
      isLoadingBrands.value = false
    }
  }

  // -------------------------------------------------------------
  // 2. Fetch Dynamic Categories & Subcategories (Exact match with /admin/categories)
  // -------------------------------------------------------------
  const fetchCategories = async (): Promise<StorefrontCategoryItem[]> => {
    isLoadingCategories.value = true
    try {
      const token = getToken()

      // 1. Fetch Main Categories (page 1, limit 100) and Subcategories (position 1) in parallel
      const [mainRes, subRes] = await Promise.allSettled([
        adminCategoriesApiService.fetchCategories(token, '', 1),
        adminCategoriesApiService.fetchCategories(token, '', 1, { position: 1 })
      ])

      const mappedCategories: StorefrontCategoryItem[] = []
      const subList: StorefrontCategoryItem[] = []

      if (subRes.status === 'fulfilled' && subRes.value.success && Array.isArray(subRes.value.data)) {
        subRes.value.data.forEach(s => {
          subList.push({
            id: s.id,
            name: s.name_ar || s.name || s.name_en || 'تصنيف فرعي',
            name_ar: s.name_ar,
            name_en: s.name_en,
            parent_id: s.parent_id,
            position: s.position,
            slug: s.slug || String(s.id),
            image: s.image || s.icon || '',
            icon: s.icon || ''
          })
        })
      }

      if (mainRes.status === 'fulfilled' && mainRes.value.success && Array.isArray(mainRes.value.data)) {
        mainRes.value.data.forEach(c => {
          const nestedSubs: StorefrontCategoryItem[] = []
          
          // From childes attached by Backend
          if (Array.isArray(c.subCategories) && c.subCategories.length > 0) {
            c.subCategories.forEach((sc: any) => {
              nestedSubs.push({
                id: sc.id,
                name: sc.name_ar || sc.name || sc.name_en || 'تصنيف فرعي',
                name_ar: sc.name_ar,
                name_en: sc.name_en,
                parent_id: c.id,
                position: 1,
                slug: sc.slug || String(sc.id),
                image: sc.image || sc.icon || '',
                icon: sc.icon || ''
              })
            })
          }

          // From separate subcategories list matching parent_id
          subList.filter(s => String(s.parent_id) === String(c.id)).forEach(sc => {
            if (!nestedSubs.some(existing => String(existing.id) === String(sc.id))) {
              nestedSubs.push(sc)
            }
          })

          mappedCategories.push({
            id: c.id,
            name: c.name_ar || c.name || c.name_en || 'تصنيف رئيسي',
            name_ar: c.name_ar,
            name_en: c.name_en,
            parent_id: c.parent_id || 0,
            position: c.position || 0,
            slug: c.slug || (c.name_en || c.name || String(c.id)).toLowerCase().replace(/\s+/g, '-'),
            image: c.image || c.icon || '',
            icon: c.icon || '',
            subCategories: nestedSubs
          })
        })
      }

      if (mappedCategories.length > 0) {
        categories.value = mappedCategories
        allSubcategories.value = subList
        return categories.value
      }

      // 2. Secondary fallback: Storefront Categories API
      const publicRes: any = await api.get('/api/v1/categories')
      const rawList = Array.isArray(publicRes) ? publicRes : (publicRes?.data || [])

      if (Array.isArray(rawList) && rawList.length > 0) {
        categories.value = rawList.map((c: any, idx: number) => {
          const name = c.name || c.category_name || c.title || `Category ${idx + 1}`
          const subs = Array.isArray(c.childes || c.sub_categories) 
            ? (c.childes || c.sub_categories).map((sc: any) => ({
                id: sc.id,
                name: sc.name || sc.name_ar || sc.name_en || 'تصنيف فرعي',
                name_ar: sc.name_ar,
                name_en: sc.name_en,
                parent_id: c.id,
                slug: sc.slug || String(sc.id)
              }))
            : []

          return {
            id: c.id || idx + 1,
            name,
            name_ar: c.name_ar || name,
            name_en: c.name_en,
            slug: c.slug || name.toLowerCase().replace(/\s+/g, '-'),
            image: c.image || c.icon || '',
            icon: c.icon || '',
            subCategories: subs
          }
        }).filter(c => Boolean(c.name))
      }
      return categories.value
    } catch (err) {
      console.warn('[useStorefrontBuilder] Failed to fetch live categories:', err)
      return categories.value
    } finally {
      isLoadingCategories.value = false
    }
  }

  // Helper to get subcategories for any selected category ID or Name
  const getSubcategoriesForParent = (parentIdOrName: number | string | undefined): StorefrontCategoryItem[] => {
    if (!parentIdOrName) return []
    
    // Find parent category by ID or by Name
    const parent = categories.value.find(c => 
      String(c.id) === String(parentIdOrName) || 
      c.name === parentIdOrName || 
      c.name_ar === parentIdOrName || 
      c.name_en === parentIdOrName
    )

    if (parent && Array.isArray(parent.subCategories) && parent.subCategories.length > 0) {
      return parent.subCategories
    }

    // Check allSubcategories list
    if (parent) {
      return allSubcategories.value.filter(s => String(s.parent_id) === String(parent.id))
    }

    return []
  }

  // -------------------------------------------------------------
  // 3. Helper to Sanitize & Normalize Section Data Structure
  // -------------------------------------------------------------
  const normalizeSection = (sec: any, idx: number): StorefrontSection => {
    const rawType = sec.type === 'hero' ? 'hero_slider' : (sec.type || 'hero_slider')
    let rawData = sec.data

    if (typeof rawData === 'string') {
      try {
        rawData = JSON.parse(rawData)
      } catch (e) {
        rawData = {}
      }
    }

    if (!rawData || typeof rawData !== 'object' || Array.isArray(rawData)) {
      rawData = {}
    }

    const realId = (sec.id !== undefined && sec.id !== null && sec.id !== '')
      ? sec.id
      : (sec.section_id !== undefined && sec.section_id !== null ? sec.section_id : (sec._id || `sec-${rawType}-${idx + 1}`))

    const normalized: StorefrontSection = {
      id: realId,
      type: rawType,
      sort_order: sec.sort_order !== undefined ? Number(sec.sort_order) : idx + 1,
      is_active: sec.is_active !== undefined ? (sec.is_active === 1 || sec.is_active === true || sec.is_active === '1' ? 1 : 0) : 1,
      data: { ...rawData }
    }

    // Default structure populations for clean 2-way data binding
    switch (rawType) {
      case 'hero_slider':
        if (!Array.isArray(normalized.data.slides)) {
          normalized.data.slides = Array.isArray(sec.slides) && sec.slides.length > 0
            ? sec.slides
            : [
                { id: 1, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80', mobileImageUrl: '', linkUrl: '/category/ac', altText: 'أقوى التخفيضات' }
              ]
        }
        break

      case 'category_slider':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'أقسام المتجر'
        if (normalized.data.limit === undefined) normalized.data.limit = Number(sec.limit) || 12
        break

      case 'brand_showcase':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'منتجات فيليبس العالمية'
        if (normalized.data.subtitle === undefined) normalized.data.subtitle = sec.subtitle || 'ابتكر معنا لحياة أفضل'
        if (normalized.data.brand_id === undefined) normalized.data.brand_id = sec.brand_id || ''
        if (normalized.data.brandName === undefined) normalized.data.brandName = sec.brandName || 'PHILIPS'
        if (normalized.data.brandLogo === undefined) normalized.data.brandLogo = sec.brandLogo || ''
        if (normalized.data.bgColor === undefined) normalized.data.bgColor = sec.bgColor || 'bg-[#1a66cc]'
        if (normalized.data.viewAllUrl === undefined) normalized.data.viewAllUrl = sec.viewAllUrl || '/brand/philips'
        if (normalized.data.limit === undefined) normalized.data.limit = Number(sec.limit) || 6
        break

      case 'new_arrivals':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'أحدث المنتجات الواصلة حديثاً'
        if (normalized.data.subtitle === undefined) normalized.data.subtitle = sec.subtitle || 'اكتشف أحدث الأجهزة المنزلية'
        if (normalized.data.shopUrl === undefined) normalized.data.shopUrl = sec.shopUrl || '/shop?sort_by=latest'
        if (normalized.data.bgColor === undefined) normalized.data.bgColor = sec.bgColor || sec.bg_color || 'bg-[#7dd3fc]'
        if (normalized.data.limit === undefined) normalized.data.limit = Number(sec.limit) || 8
        break

      case 'brand_campaign':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'خصومات مميزة'
        if (normalized.data.subtitle === undefined) normalized.data.subtitle = sec.subtitle || 'أقوى العروض الحصرية'
        if (normalized.data.btnText === undefined) normalized.data.btnText = sec.btnText || 'تسوق الآن'
        if (normalized.data.targetUrl === undefined) normalized.data.targetUrl = sec.targetUrl || '/category/kitchen-appliances'
        if (normalized.data.bannerImage === undefined) normalized.data.bannerImage = sec.bannerImage || 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80'
        if (normalized.data.category_id === undefined) normalized.data.category_id = sec.category_id || ''
        if (normalized.data.category === undefined) normalized.data.category = sec.category || 'أجهزة المطبخ'
        if (normalized.data.sub_category_id === undefined) normalized.data.sub_category_id = sec.sub_category_id || ''
        if (normalized.data.subCategory === undefined) normalized.data.subCategory = sec.subCategory || ''
        if (normalized.data.brandName === undefined) normalized.data.brandName = sec.brandName || ''
        if (normalized.data.brand_id === undefined) normalized.data.brand_id = sec.brand_id || ''
        if (normalized.data.limit === undefined) normalized.data.limit = Number(sec.limit) || 5
        break

      case 'side_banner':
        if (!Array.isArray(normalized.data.sideBannerSlides)) {
          normalized.data.sideBannerSlides = Array.isArray(sec.sideBannerSlides) && sec.sideBannerSlides.length > 0
            ? sec.sideBannerSlides
            : [
                { imageUrl: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop', linkUrl: '/brand/smeg' }
              ]
        }
        if (normalized.data.sideBannerUrl === undefined) normalized.data.sideBannerUrl = sec.sideBannerUrl || ''
        if (normalized.data.category_id === undefined) normalized.data.category_id = sec.category_id || ''
        if (normalized.data.category === undefined) normalized.data.category = sec.category || 'أجهزة المطبخ'
        if (normalized.data.sub_category_id === undefined) normalized.data.sub_category_id = sec.sub_category_id || ''
        if (normalized.data.subCategory === undefined) normalized.data.subCategory = sec.subCategory || ''
        if (normalized.data.brandName === undefined) normalized.data.brandName = sec.brandName || ''
        if (normalized.data.limit === undefined) normalized.data.limit = Number(sec.limit) || 5
        break

      case 'store_features':
        if (!Array.isArray(normalized.data.features)) {
          normalized.data.features = Array.isArray(sec.features) && sec.features.length > 0
            ? sec.features
            : [
                { icon: 'fa-solid fa-truck-fast', title: 'توصيل سريع وآمن', desc: 'توصيل مجاني للطلبات فوق 300 ريال' },
                { icon: 'fa-solid fa-shield-halved', title: 'ضمان الوكيل الأصلي', desc: 'جميع الأجهزة الكهربائية بأعلى جودة' }
              ]
        }
        break

      case 'brands_ticker':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'شركاؤنا من كبرى العلامات التجارية'
        if (!Array.isArray(normalized.data.brandLogos)) {
          normalized.data.brandLogos = Array.isArray(sec.brandLogos) && sec.brandLogos.length > 0
            ? sec.brandLogos
            : [
                { name: 'PHILIPS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg', linkUrl: '/brand/philips' }
              ]
        }
        break

      case 'store_guarantees':
        if (!Array.isArray(normalized.data.guarantees)) {
          normalized.data.guarantees = Array.isArray(sec.guarantees) && sec.guarantees.length > 0
            ? sec.guarantees
            : [
                { icon: 'fa-solid fa-certificate', title: 'منتجات أصلية 100%', desc: 'جميع منتجاتنا مضمونة من الوكيل المعتمد' }
              ]
        }
        break

      case 'store_location':
        if (normalized.data.title === undefined) normalized.data.title = sec.title || 'زيارة معرضنا الرئيسي'
        if (normalized.data.address === undefined) normalized.data.address = sec.address || 'جدة - حي الصفا - طريق الملك فهد'
        if (normalized.data.workingHours === undefined) normalized.data.workingHours = sec.workingHours || 'يومياً من 10 صباحاً إلى 11 مساءً'
        if (normalized.data.phone === undefined) normalized.data.phone = sec.phone || '01286000037'
        if (normalized.data.mapsUrl === undefined) normalized.data.mapsUrl = sec.mapsUrl || 'https://maps.google.com'
        break
    }

    return normalized
  }

  // -------------------------------------------------------------
  // 4. Fetch Home Sections List from API
  // -------------------------------------------------------------
  const fetchSections = async (): Promise<StorefrontSection[]> => {
    isLoading.value = true
    try {
      const rawList = await adminHomeSectionsApiService.getSections()
      sections.value = rawList.map((sec, idx) => normalizeSection(sec, idx))
      syncSortOrders()
      return sections.value
    } catch (err: any) {
      console.error('[useStorefrontBuilder] Error fetching sections:', err)
      toast.error('تعذر جلب أقسام واجهة المتجر من الخادم')
      return []
    } finally {
      isLoading.value = false
    }
  }

  const syncSortOrders = () => {
    sections.value.forEach((sec, idx) => {
      sec.sort_order = idx + 1
    })
  }

  // -------------------------------------------------------------
  // 5. Prepare Clean Data Payload with Numeric Limits
  // -------------------------------------------------------------
  const preparePayloadData = (sec: StorefrontSection) => {
    const type = sec.type === 'hero' ? 'hero_slider' : (sec.type || 'hero_slider')
    const data = sec.data || {}

    switch (type) {
      case 'hero_slider':
        return {
          slides: (data.slides || []).map((s: any) => ({
            id: s.id || Date.now(),
            imageUrl: typeof s.imageUrl === 'string' ? s.imageUrl : '',
            mobileImageUrl: typeof s.mobileImageUrl === 'string' ? s.mobileImageUrl : '',
            linkUrl: s.linkUrl || '',
            altText: s.altText || ''
          }))
        }

      case 'category_slider':
        return {
          title: data.title || 'أقسام المتجر',
          limit: Number(data.limit) || 12
        }

      case 'brand_showcase':
        return {
          brand_id: data.brand_id ? (isNaN(Number(data.brand_id)) ? data.brand_id : Number(data.brand_id)) : '',
          brandName: data.brandName || 'PHILIPS',
          title: data.title || '',
          subtitle: data.subtitle || '',
          brandLogo: typeof data.brandLogo === 'string' ? data.brandLogo : '',
          bgColor: data.bgColor || 'bg-[#1a66cc]',
          btnColor: data.btnColor || '',
          viewAllUrl: data.viewAllUrl || '',
          limit: Number(data.limit) || 6
        }

      case 'new_arrivals':
        return {
          title: data.title || 'أحدث المنتجات الواصلة حديثاً',
          subtitle: data.subtitle || '',
          shopUrl: data.shopUrl || '/shop?sort_by=latest',
          bgColor: data.bgColor || 'bg-[#7dd3fc]',
          limit: Number(data.limit) || 8
        }

      case 'brand_campaign':
        return {
          title: data.title || '',
          subtitle: data.subtitle || '',
          btnText: data.btnText || 'تسوق الآن',
          targetUrl: data.targetUrl || '',
          bannerImage: typeof data.bannerImage === 'string' ? data.bannerImage : '',
          category_id: data.category_id || '',
          category: data.category || '',
          sub_category_id: data.sub_category_id || '',
          subCategory: data.subCategory || '',
          brandName: data.brandName || '',
          brand_id: data.brand_id ? (isNaN(Number(data.brand_id)) ? data.brand_id : Number(data.brand_id)) : '',
          limit: Number(data.limit) || 5
        }

      case 'side_banner':
        return {
          sideBannerSlides: (data.sideBannerSlides || []).map((slide: any) => ({
            imageUrl: typeof slide.imageUrl === 'string' ? slide.imageUrl : '',
            linkUrl: slide.linkUrl || ''
          })),
          sideBannerUrl: data.sideBannerUrl || '',
          category_id: data.category_id || '',
          category: data.category || '',
          sub_category_id: data.sub_category_id || '',
          subCategory: data.subCategory || '',
          brandName: data.brandName || '',
          limit: Number(data.limit) || 5
        }

      case 'store_features':
        return {
          features: (data.features || []).map((f: any) => ({
            icon: f.icon || 'fa-solid fa-truck-fast',
            title: f.title || '',
            desc: f.desc || ''
          }))
        }

      case 'brands_ticker':
        return {
          title: data.title || '',
          brandLogos: (data.brandLogos || []).map((b: any) => ({
            name: b.name || '',
            imageUrl: typeof b.imageUrl === 'string' ? b.imageUrl : '',
            linkUrl: b.linkUrl || ''
          }))
        }

      case 'store_guarantees':
        return {
          guarantees: (data.guarantees || []).map((g: any) => ({
            icon: g.icon || 'fa-solid fa-certificate',
            title: g.title || '',
            desc: g.desc || ''
          }))
        }

      case 'store_location':
        return {
          title: data.title || '',
          address: data.address || '',
          workingHours: data.workingHours || '',
          phone: data.phone || '',
          mapsUrl: data.mapsUrl || ''
        }

      default:
        return (data && typeof data === 'object' && !Array.isArray(data)) ? data : {}
    }
  }

  // -------------------------------------------------------------
  // 6. Save Single Section (PUT /api/v1/admin/home-sections/{id})
  // -------------------------------------------------------------
  const saveSection = async (id: number | string, sectionPayload: StorefrontSection) => {
    savingSectionId.value = id
    try {
      const type = sectionPayload.type === 'hero' ? 'hero_slider' : (sectionPayload.type || 'hero_slider')
      const cleanData = preparePayloadData(sectionPayload)

      const payload = {
        type,
        is_active: sectionPayload.is_active ? 1 : 0,
        sort_order: Number(sectionPayload.sort_order) || 1,
        data: cleanData
      }

      const res = await adminHomeSectionsApiService.saveOrUpdateSection(id, payload)
      
      if (res?.id) {
        sectionPayload.id = res.id
      } else if (res?.data?.id) {
        sectionPayload.id = res.data.id
      }

      toast.success('تم حفظ تعديلات السكشن بنجاح!')
      return res
    } catch (err: any) {
      console.error('[useStorefrontBuilder] Save error:', err)
      toast.error('حدث خطأ أثناء حفظ السكشن')
      throw err
    } finally {
      savingSectionId.value = null
    }
  }

  // -------------------------------------------------------------
  // 7. Create Section (POST /api/v1/admin/home-sections)
  // -------------------------------------------------------------
  const createSection = async (payload: { type: string; is_active?: number; sort_order?: number; data?: Record<string, any> }) => {
    try {
      const created = await adminHomeSectionsApiService.createSection({
        type: payload.type === 'hero' ? 'hero_slider' : payload.type,
        is_active: payload.is_active !== undefined ? payload.is_active : 1,
        sort_order: payload.sort_order || sections.value.length + 1,
        data: payload.data || {}
      })
      const normalized = normalizeSection(created, sections.value.length)
      return normalized
    } catch (err) {
      console.error('[useStorefrontBuilder] Create error:', err)
      throw err
    }
  }

  // -------------------------------------------------------------
  // 8. Delete Section (DELETE /api/v1/admin/home-sections/{id})
  // -------------------------------------------------------------
  const deleteSection = async (id: number | string) => {
    const isTempId = !id || (typeof id === 'string' && (id.startsWith('sec-') || isNaN(Number(id))))
    if (!isTempId) {
      await adminHomeSectionsApiService.deleteSection(id)
    }
    const idx = sections.value.findIndex(s => s.id === id)
    if (idx !== -1) {
      sections.value.splice(idx, 1)
      syncSortOrders()
      if (sections.value.length > 0) {
        await reorderSections(sections.value.map(s => s.id))
      }
    }
  }

  // -------------------------------------------------------------
  // 9. Reorder Sections (POST /api/v1/admin/home-sections/reorder)
  // -------------------------------------------------------------
  const reorderSections = async (idsOrItems: Array<number | string | { id: number | string; sort_order: number }>) => {
    isReordering.value = true
    try {
      const payload = idsOrItems.map((item, idx) => {
        if (typeof item === 'object' && item !== null) {
          return { id: item.id, sort_order: idx + 1 }
        }
        return { id: item, sort_order: idx + 1 }
      })
      await adminHomeSectionsApiService.reorderSections(payload)
    } catch (err) {
      console.error('[useStorefrontBuilder] Reorder error:', err)
    } finally {
      isReordering.value = false
    }
  }

  return {
    // State
    sections,
    brands,
    categories,
    allSubcategories,
    isLoading,
    isLoadingBrands,
    isLoadingCategories,
    isSaving,
    isReordering,
    savingSectionId,

    // Actions
    fetchBrands,
    fetchCategories,
    getSubcategoriesForParent,
    fetchSections,
    saveSection,
    createSection,
    deleteSection,
    reorderSections,
    syncSortOrders,
    normalizeSection,
    preparePayloadData
  }
}
