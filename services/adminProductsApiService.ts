/**
 * Admin Products API Service Layer with Multi-language Translation Support
 * Live API Endpoints:
 * 1. GET  /api/v1/admin/products/list?page={page}&limit={limit}
 * 2. DELETE /api/v1/admin/products/delete/{id}
 * 3. POST /api/v1/admin/products/add (Multipart FormData with binary files)
 * 4. POST /api/v1/admin/products/update/{id} (Multipart FormData with binary files)
 *
 * NOTE: /api/v1/admin/products/upload-images is NOT a valid endpoint on this server.
 * Images MUST be sent directly as binary files inside the add/update FormData request.
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

export interface AdminProductItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
  description?: string;
  description_ar?: string;
  description_en?: string;
  sku?: string;
  category_id?: number | string;
  category_name?: string;
  sub_category_id?: number | string;
  sub_sub_category_id?: number | string;
  brand_id?: number | string;
  brand_name?: string;
  unit_price: number | string;
  purchase_price?: number | string;
  minimum_order_qty?: number;
  current_stock: number;
  discount?: number | string;
  discount_type?: 'flat' | 'percent';
  discount_start_date?: string;
  discount_end_date?: string;
  colors_active?: boolean | number;
  colors?: string[];
  thumbnail?: string;
  images?: string[];
  status?: number | boolean;
  created_at?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ProductVariationItem {
  code: string;
  color_name?: string;
  price: string | number;
  sku: string;
  qty: string | number;
}

export interface ProductFormDataPayload {
  id?: number | string;
  product_type?: 'physical' | 'digital';
  name_ar: string;
  name_en: string;
  description_ar: string;
  description_en: string;
  category_id: string | number;
  sub_category_id?: string | number;
  sub_sub_category_id?: string | number;
  brand_id?: string | number;
  unit_price: string | number;
  purchase_price?: string | number;
  minimum_order_qty?: string | number;
  current_stock?: string | number;
  discount?: string | number;
  discount_type?: 'flat' | 'percent';
  discount_start_date?: string;
  discount_end_date?: string;
  colors_active?: boolean | number;
  colors?: string[];
  choice_attributes?: (string | number)[];
  choice_options?: Record<string | number, string[]>;
  variations?: ProductVariationItem[];
  thumbnail?: File | string | null;
  images?: (File | string)[];
  color_images?: Record<string, File | string>;
}

/**
 * Normalizes product image url into a complete absolute URL
 */
export function normalizeProductImageUrl(raw: any, isThumbnail: boolean = false): string {
  if (!raw) return ''
  if (typeof raw === 'object') {
    if (raw.path) return normalizeProductImageUrl(raw.path, isThumbnail)
    if (raw.url) return normalizeProductImageUrl(raw.url, isThumbnail)
    if (raw.image_full_url?.path) return normalizeProductImageUrl(raw.image_full_url.path, isThumbnail)
    if (raw.thumbnail_full_url?.path) return normalizeProductImageUrl(raw.thumbnail_full_url.path, true)
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    if (trimmed.startsWith('data:image/') || trimmed.startsWith('blob:')) return trimmed
    if (trimmed.startsWith('/')) return `https://wedgetstore.com${trimmed}`

    // Clean filename
    const cleanName = extractCleanFilename(trimmed)
    if (isThumbnail) {
      return `https://wedgetstore.com/storage/app/public/product/thumbnail/${cleanName}`
    }
    return `https://wedgetstore.com/storage/app/public/product/${cleanName}`
  }
  return ''
}

/**
 * Extracts pure filename from path or URL
 */
export function extractCleanFilename(raw: string): string {
  if (!raw) return ''
  const trimmed = raw.trim()
  if (trimmed.includes('/')) {
    const parts = trimmed.split('/')
    return parts[parts.length - 1] || trimmed
  }
  return trimmed
}

/**
 * Universal Multi-Language Text Extractor Helper
 * Extracts Arabic and English text from direct properties, nested objects, or translations arrays
 */
export function extractMultiLangField(item: any, fieldName: 'name' | 'description' | 'details'): { ar: string; en: string } {
  if (!item) return { ar: '', en: '' }

  let ar = ''
  let en = ''

  // 1. Direct explicit fields (e.g. name_ar, name_en, description_ar, description_en)
  if (item[`${fieldName}_ar`]) ar = String(item[`${fieldName}_ar`])
  if (item[`${fieldName}_en`]) en = String(item[`${fieldName}_en`])

  // 2. Nested object (e.g. item.name = { ar: '...', en: '...' })
  const rawField = item[fieldName] || (fieldName === 'description' ? item['details'] : null)
  if (rawField && typeof rawField === 'object' && !Array.isArray(rawField)) {
    if (!ar && rawField.ar) ar = String(rawField.ar)
    if (!en && rawField.en) en = String(rawField.en)
  }

  // 3. Translations array (e.g. item.translations = [{ locale: 'ar', key: 'name', value: '...' }])
  if (Array.isArray(item.translations)) {
    item.translations.forEach((t: any) => {
      const locale = (t.locale || t.lang || t.language || '').toLowerCase()
      const key = t.key || t.field_name
      if (!key || key === fieldName || (fieldName === 'description' && key === 'details')) {
        const val = t.value || t.name || t.description || t.details || ''
        if (locale === 'ar' && !ar) ar = String(val)
        if (locale === 'en' && !en) en = String(val)
      }
    })
  }

  // 4. Primary string fallback
  if (!ar && typeof rawField === 'string' && rawField) {
    ar = rawField
  }
  if (!en) {
    en = ar
  }

  return { ar, en }
}

/**
 * Helper to parse backend error response from 6valley Laravel API
 */
export function formatApiErrorMessage(err: any): string {
  if (!err) return 'حدث خطأ غير متوقع في الخادم.'
  if (err.data) {
    if (typeof err.data === 'string') return err.data
    if (Array.isArray(err.data.errors) && err.data.errors.length > 0) {
      return err.data.errors.map((e: any) => e.message || e.code || JSON.stringify(e)).join(' - ')
    }
    if (err.data.errors && typeof err.data.errors === 'object') {
      const messages = Object.values(err.data.errors).flat()
      if (messages.length > 0) return messages.join(' - ')
    }
    if (err.data.message) return err.data.message
  }
  return err.message || 'فشل الاتصال بالخادم.'
}

/**
 * Universal Mapper: Converts backend raw product JSON into complete ProductFormDataPayload
 */
export function mapRawProductToFormData(p: any): ProductFormDataPayload {
  if (!p) return {} as ProductFormDataPayload

  const nameData = extractMultiLangField(p, 'name')
  const descData = extractMultiLangField(p, 'description')

  // 1. Parse Category Hierarchy
  let categoryId = p.category_id || ''
  let subCategoryId = p.sub_category_id || ''
  let subSubCategoryId = p.sub_sub_category_id || ''

  if (!categoryId && Array.isArray(p.category_ids)) {
    const mainCat = p.category_ids.find((c: any) => c.position === 1 || c.position === '1' || c.position === 0 || c.position === '0')
    const subCat = p.category_ids.find((c: any) => c.position === 2 || c.position === '2')
    const subSubCat = p.category_ids.find((c: any) => c.position === 3 || c.position === '3')
    if (mainCat) categoryId = mainCat.id
    if (subCat) subCategoryId = subCat.id
    if (subSubCat) subSubCategoryId = subSubCat.id
  } else if (!categoryId && typeof p.category_ids === 'string') {
    try {
      const parsedCatIds = JSON.parse(p.category_ids)
      if (Array.isArray(parsedCatIds)) {
        if (parsedCatIds[0]?.id) categoryId = parsedCatIds[0].id
        if (parsedCatIds[1]?.id) subCategoryId = parsedCatIds[1].id
        if (parsedCatIds[2]?.id) subSubCategoryId = parsedCatIds[2].id
      }
    } catch { }
  }

  // 2. Parse Colors
  let colorsList: string[] = []
  if (Array.isArray(p.colors)) {
    colorsList = p.colors
      .map((c: any) => typeof c === 'string' ? c.replace(/^#/, '').toUpperCase().trim() : (c?.code ? String(c.code).replace(/^#/, '').toUpperCase().trim() : ''))
      .filter(Boolean)
  } else if (typeof p.colors === 'string' && p.colors.trim()) {
    try {
      const parsedColors = JSON.parse(p.colors)
      if (Array.isArray(parsedColors)) {
        colorsList = parsedColors
          .map((c: any) => typeof c === 'string' ? c.replace(/^#/, '').toUpperCase().trim() : (c?.code ? String(c.code).replace(/^#/, '').toUpperCase().trim() : ''))
          .filter(Boolean)
      }
    } catch {
      colorsList = p.colors.split(',').map((c: string) => c.replace(/^#/, '').toUpperCase().trim()).filter(Boolean)
    }
  }

  // Helper to safely parse string JSON (including double-encoded JSON)
  const safeJsonParse = (val: any) => {
    if (!val) return null
    if (typeof val === 'object') return val
    if (typeof val === 'string') {
      try {
        let parsed = JSON.parse(val)
        if (typeof parsed === 'string') {
          try { parsed = JSON.parse(parsed) } catch { }
        }
        return parsed
      } catch {
        return null
      }
    }
    return null
  }

  // 3. Parse Choice Attributes
  let choiceAttributes: (string | number)[] = []
  const rawAttrs = safeJsonParse(p.attributes) || p.attributes || p.choice_attributes || p.choice_no
  if (Array.isArray(rawAttrs)) {
    rawAttrs.forEach((a: any) => {
      const id = typeof a === 'object' ? (a?.id || a?.attribute_id || a?.no) : a
      if (id !== undefined && id !== null && String(id).trim()) {
        choiceAttributes.push(String(id).trim())
      }
    })
  }

  // 4. Parse Choice Options (6valley standard formats: name="choice_2", attribute_id=2, direct properties, etc.)
  let choiceOptions: Record<string | number, string[]> = {}
  const rawChoiceOptions = safeJsonParse(p.choice_options) || p.choice_options

  if (Array.isArray(rawChoiceOptions)) {
    rawChoiceOptions.forEach((opt: any) => {
      let attrId = opt.attribute_id || opt.id || opt.no
      if (!attrId && opt.name) {
        // e.g. "choice_2" or "choice_options_2" -> extract "2"
        const match = String(opt.name).match(/\d+/)
        if (match) {
          attrId = match[0]
        }
      }

      if (attrId !== undefined && attrId !== null) {
        const idStr = String(attrId).trim()
        let optionsList: string[] = []

        const rawOpts = safeJsonParse(opt.options) || opt.options
        if (Array.isArray(rawOpts)) {
          optionsList = rawOpts.map((o: any) => String(o).trim()).filter(Boolean)
        } else if (typeof rawOpts === 'string' && rawOpts.trim()) {
          optionsList = rawOpts.split(/[,،\n]+/).map(o => o.trim()).filter(Boolean)
        }

        if (idStr && optionsList.length > 0) {
          choiceOptions[idStr] = optionsList
          if (!choiceAttributes.includes(idStr)) {
            choiceAttributes.push(idStr)
          }
        }
      }
    })
  } else if (rawChoiceOptions && typeof rawChoiceOptions === 'object') {
    Object.entries(rawChoiceOptions).forEach(([k, v]) => {
      const match = String(k).match(/\d+/)
      const idStr = match ? match[0] : String(k).trim()
      const rawOpts = safeJsonParse(v) || v
      let optionsList: string[] = []

      if (Array.isArray(rawOpts)) {
        optionsList = rawOpts.map((o: any) => String(o).trim()).filter(Boolean)
      } else if (typeof rawOpts === 'string' && rawOpts.trim()) {
        optionsList = rawOpts.split(/[,،\n]+/).map(o => o.trim()).filter(Boolean)
      }

      if (idStr && optionsList.length > 0) {
        choiceOptions[idStr] = optionsList
        if (!choiceAttributes.includes(idStr)) {
          choiceAttributes.push(idStr)
        }
      }
    })
  }

  // Also check direct dynamic properties on p like p.choice_options_2, p.choice_options_3
  Object.keys(p).forEach((key) => {
    if (key.startsWith('choice_options_')) {
      const attrId = key.replace('choice_options_', '').trim()
      const val = p[key]
      const rawOpts = safeJsonParse(val) || val
      let optionsList: string[] = []

      if (Array.isArray(rawOpts)) {
        optionsList = rawOpts.map((o: any) => String(o).trim()).filter(Boolean)
      } else if (typeof rawOpts === 'string' && rawOpts.trim()) {
        optionsList = rawOpts.split(/[,،\n]+/).map(o => o.trim()).filter(Boolean)
      }

      if (attrId && optionsList.length > 0) {
        choiceOptions[attrId] = Array.from(new Set([...(choiceOptions[attrId] || []), ...optionsList]))
        if (!choiceAttributes.includes(attrId)) {
          choiceAttributes.push(attrId)
        }
      }
    }
  })

  // Deduplicate choiceAttributes
  choiceAttributes = Array.from(new Set(choiceAttributes.map(String).filter(Boolean)))

  // 5. Parse Variations
  let variations: ProductVariationItem[] = []
  const rawVariations = p.variation || p.variations
  if (Array.isArray(rawVariations)) {
    variations = rawVariations.map((v: any) => ({
      code: String(v.type || v.code || v.sku || '').replace(/^#/, '').trim().toUpperCase(),
      color_name: v.color_name || v.color || '',
      price: v.price ?? p.unit_price ?? 0,
      sku: v.sku || `SKU-${v.type || v.code || 'VAR'}`,
      qty: v.qty ?? v.quantity ?? v.stock ?? 10
    }))
  } else if (typeof rawVariations === 'string' && rawVariations.trim()) {
    try {
      const parsedVars = JSON.parse(rawVariations)
      if (Array.isArray(parsedVars)) {
        variations = parsedVars.map((v: any) => ({
          code: String(v.type || v.code || v.sku || '').replace(/^#/, '').trim().toUpperCase(),
          color_name: v.color_name || v.color || '',
          price: v.price ?? p.unit_price ?? 0,
          sku: v.sku || `SKU-${v.type || v.code || 'VAR'}`,
          qty: v.qty ?? v.quantity ?? v.stock ?? 10
        }))
      }
    } catch { }
  }

  // 6. Parse Gallery Images
  let imagesList: string[] = []
  if (Array.isArray(p.images)) {
    imagesList = p.images
      .map((img: any) => typeof img === 'string' ? extractCleanFilename(img) : extractCleanFilename(img?.path || img?.image_name || img?.url || ''))
      .filter(Boolean)
  } else if (typeof p.images === 'string' && p.images.trim()) {
    try {
      const parsedImgs = JSON.parse(p.images)
      if (Array.isArray(parsedImgs)) {
        imagesList = parsedImgs
          .map((img: any) => typeof img === 'string' ? extractCleanFilename(img) : extractCleanFilename(img?.image_name || img?.path || ''))
          .filter(Boolean)
      } else {
        imagesList = [extractCleanFilename(p.images)]
      }
    } catch {
      imagesList = [extractCleanFilename(p.images)]
    }
  }

  // 7. Parse Color Images
  let colorImages: Record<string, string> = {}
  const rawColorImages = p.color_images || p.color_image
  if (Array.isArray(rawColorImages)) {
    rawColorImages.forEach((item: any) => {
      const color = (item.color || item.color_code || item.code || '').replace(/^#/, '').trim().toUpperCase()
      const img = extractCleanFilename(item.image_name || item.image || item.file_name || item.path || '')
      if (color && img) {
        colorImages[color] = img
      }
    })
  } else if (rawColorImages && typeof rawColorImages === 'object') {
    Object.entries(rawColorImages).forEach(([k, v]) => {
      const color = k.replace(/^#/, '').trim().toUpperCase()
      const img = extractCleanFilename(typeof v === 'string' ? v : ((v as any)?.image_name || (v as any)?.path || ''))
      if (color && img) {
        colorImages[color] = img
      }
    })
  } else if (typeof rawColorImages === 'string' && rawColorImages.trim()) {
    try {
      const parsedColorImgs = JSON.parse(rawColorImages)
      if (Array.isArray(parsedColorImgs)) {
        parsedColorImgs.forEach((item: any) => {
          const color = (item.color || item.color_code || '').replace(/^#/, '').trim().toUpperCase()
          const img = extractCleanFilename(item.image_name || item.image || '')
          if (color && img) colorImages[color] = img
        })
      }
    } catch { }
  }

  const thumb = extractCleanFilename(p.thumbnail_full_url?.path || p.thumbnail_full_url?.key || p.thumbnail || p.image || imagesList[0] || '')

  const rawStartDate = p.discount_start_date || p.start_date || p.discount_start || ''
  const rawEndDate = p.discount_end_date || p.end_date || p.discount_end || ''
  const startDate = rawStartDate ? String(rawStartDate).split('T')[0].split(' ')[0] : ''
  const endDate = rawEndDate ? String(rawEndDate).split('T')[0].split(' ')[0] : ''

  const purchasePrice = p.purchase_price !== undefined && p.purchase_price !== null && p.purchase_price !== ''
    ? p.purchase_price
    : (p.unit_price ?? p.price ?? '')

  return {
    id: p.id,
    product_type: p.product_type || 'physical',
    name_ar: nameData.ar || nameData.en || p.name || '',
    name_en: nameData.en || '',
    description_ar: descData.ar || descData.en || p.description || p.details || '',
    description_en: descData.en || '',
    category_id: categoryId || '',
    sub_category_id: subCategoryId || '',
    sub_sub_category_id: subSubCategoryId || '',
    brand_id: p.brand_id || '',
    unit_price: p.unit_price ?? p.price ?? '',
    purchase_price: purchasePrice,
    minimum_order_qty: p.minimum_order_qty ?? p.min_qty ?? p.minimum_order_quantity ?? 1,
    current_stock: p.current_stock ?? p.stock ?? p.total_stock ?? 10,
    discount: p.discount ?? 0,
    discount_type: p.discount_type || 'flat',
    discount_start_date: startDate,
    discount_end_date: endDate,
    colors_active: Boolean(p.colors_active === 1 || p.colors_active === '1' || p.colors_active === true || colorsList.length > 0),
    colors: colorsList,
    choice_attributes: choiceAttributes,
    choice_options: choiceOptions,
    variations: variations,
    thumbnail: thumb,
    images: imagesList,
    color_images: colorImages
  }
}

/**
 * Builds standard FormData for Add / Update Admin Products API (6valley Standard)
 * - Multi-language: ONLY lang[], name[], description[] arrays
 * - Attributes & Choices: ONLY choice_no[] and choice_attributes[] when active
 * - Colors: colors_active ('1'|'0') & colors[] & color_image_{cleanHex}
 * - Variations: Clean keys without '#' symbols (price_{cleanCode}, sku_{cleanCode}, qty_{cleanCode})
 * - Images: Text string names of already uploaded images
 */
export function buildProductFormData(payload: ProductFormDataPayload): FormData {
  const formData = new FormData()
  const nameAr = (payload.name_ar || '').trim()
  const nameEn = (payload.name_en || payload.name_ar || '').trim()
  const descAr = (payload.description_ar || '').trim()
  const descEn = (payload.description_en || payload.description_ar || '').trim()

  // 1. Multi-language Arrays ONLY (Matching lang[] and name[] / description[] by index)
  formData.append('lang[]', 'ar')
  formData.append('name[]', nameAr)
  formData.append('description[]', descAr)

  formData.append('lang[]', 'en')
  formData.append('name[]', nameEn)
  formData.append('description[]', descEn)

  // 2. Category Hierarchy
  if (payload.category_id !== undefined && payload.category_id !== null && String(payload.category_id).trim() !== '') {
    formData.append('category_id', String(payload.category_id))
  }
  if (payload.sub_category_id !== undefined && payload.sub_category_id !== null && String(payload.sub_category_id).trim() !== '') {
    formData.append('sub_category_id', String(payload.sub_category_id))
  }
  if (payload.sub_sub_category_id !== undefined && payload.sub_sub_category_id !== null && String(payload.sub_sub_category_id).trim() !== '') {
    formData.append('sub_sub_category_id', String(payload.sub_sub_category_id))
  }

  // 3. Brand
  if (payload.brand_id !== undefined && payload.brand_id !== null && String(payload.brand_id).trim() !== '') {
    formData.append('brand_id', String(payload.brand_id))
  }

  // 4. Pricing, Stock & Defaults
  const unitPrice = String(payload.unit_price || 0)
  const purchasePrice = String(payload.purchase_price !== undefined && payload.purchase_price !== null && payload.purchase_price !== '' ? payload.purchase_price : unitPrice)
  const currentStock = String(payload.current_stock !== undefined ? payload.current_stock : 0)
  const minOrderQty = String(payload.minimum_order_qty || 1)

  formData.append('unit_price', unitPrice)
  formData.append('purchase_price', purchasePrice)
  formData.append('unit', 'pc')
  formData.append('tax', '15')
  formData.append('tax_type', 'percent')
  formData.append('tax_model', 'exclude')
  formData.append('minimum_order_qty', minOrderQty)
  formData.append('current_stock', currentStock)
  formData.append('discount', String(payload.discount || 0))
  formData.append('discount_type', payload.discount_type || 'flat')
  if (payload.discount_start_date) formData.append('discount_start_date', payload.discount_start_date)
  if (payload.discount_end_date) formData.append('discount_end_date', payload.discount_end_date)
  formData.append('product_type', payload.product_type || 'physical')
  formData.append('shipping_cost', '0')
  formData.append('multiply_qty', '0')
  formData.append('status', '1')
  formData.append('request_status', '1')

  // 5. Colors (Unique single format only with '#')
  const isColorsActive = Boolean(payload.colors_active && payload.colors && payload.colors.length > 0)
  formData.append('colors_active', isColorsActive ? '1' : '0')

  const uniqueCleanColors = Array.from(
    new Set(
      (payload.colors || [])
        .map((c) => String(c).replace(/^#/, '').trim().toUpperCase())
        .filter(Boolean)
    )
  )

  if (isColorsActive && uniqueCleanColors.length > 0) {
    uniqueCleanColors.forEach((clean) => {
      formData.append('colors[]', `#${clean}`)
    })
  }

  // 6. Attributes & Choice Options (Only appended when valid attributes are selected)
  const choiceAttrs = Array.from(
    new Set((payload.choice_attributes || []).map(String).filter(Boolean))
  )
  if (choiceAttrs.length > 0) {
    choiceAttrs.forEach((attrId) => {
      formData.append('choice_no[]', attrId)
      formData.append('choice_attributes[]', attrId)

      const options = Array.from(
        new Set(
          (payload.choice_options?.[attrId] || [])
            .map((opt) => String(opt || '').trim())
            .filter(Boolean)
        )
      )
      options.forEach((opt) => {
        formData.append(`choice_options_${attrId}[]`, opt)
      })
    })
  }

  // 7. Variations & Combinations (Clean, non-empty, and validated)
  const hasVariations = Boolean(
    (isColorsActive && uniqueCleanColors.length > 0) || choiceAttrs.length > 0
  )
  if (hasVariations && payload.variations && payload.variations.length > 0) {
    const seenCodes = new Set<string>()

    payload.variations.forEach((varItem) => {
      const cleanCode = String(varItem.code || '').replace(/^#/, '').trim().toUpperCase()
      if (!cleanCode || seenCodes.has(cleanCode)) return
      seenCodes.add(cleanCode)

      const price = String(
        varItem.price !== undefined && varItem.price !== null && Number(varItem.price) > 0
          ? varItem.price
          : (unitPrice || '0')
      )
      const sku = (varItem.sku && String(varItem.sku).trim()) || `SKU-${cleanCode}`
      const qty = String(
        varItem.qty !== undefined && varItem.qty !== null && Number(varItem.qty) >= 0
          ? varItem.qty
          : '10'
      )

      formData.append(`price_${cleanCode}`, price)
      formData.append(`sku_${cleanCode}`, sku)
      formData.append(`qty_${cleanCode}`, qty)
    })
  }

  // 8. Files & Media Attachments (Sent as text image names in FormData)
  if (payload.thumbnail) {
    const thumbVal = typeof payload.thumbnail === 'string'
      ? extractCleanFilename(payload.thumbnail)
      : payload.thumbnail
    if (thumbVal) {
      formData.append('image', thumbVal)
      formData.append('thumbnail', thumbVal)
    }
  }

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((img) => {
      if (img) {
        const imgVal = typeof img === 'string' ? extractCleanFilename(img) : img
        if (imgVal) {
          formData.append('images[]', imgVal)
        }
      }
    })
  }

  if (payload.color_images && isColorsActive) {
    Object.entries(payload.color_images).forEach(([colorKey, fileOrStr]) => {
      const cleanCode = colorKey.replace(/^#/, '').trim()
      if (fileOrStr) {
        const colorImgVal = typeof fileOrStr === 'string' ? extractCleanFilename(fileOrStr) : fileOrStr
        if (colorImgVal) {
          formData.append(`color_image_${cleanCode}`, colorImgVal)
        }
      }
    })
  }

  return formData
}

export const adminProductsApiService = {
  /**
   * 1. GET Admin Products List with Pagination & Multi-lang formatting
   */
  async fetchProducts(
    token: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ success: boolean; data: AdminProductItem[]; pagination: PaginationMeta; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/products/list?page=${page}&limit=${limit}&_t=${Date.now()}`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        retry: 1,
        timeout: 10000
      })

      let rawProducts: any[] = []
      let pagination: PaginationMeta = {
        current_page: page,
        last_page: 1,
        per_page: limit,
        total: 0
      }

      if (Array.isArray(response)) {
        rawProducts = response
        pagination.total = response.length
        pagination.last_page = Math.ceil(response.length / limit) || 1
      } else if (response && typeof response === 'object') {
        rawProducts = response.products || response.data || response.list || []
        const meta = response.meta || response.pagination || response
        pagination.current_page = Number(meta.current_page || meta.page || page)
        pagination.per_page = Number(meta.per_page || meta.limit || limit)
        pagination.total = Number(meta.total || rawProducts.length)
        pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1)
      }

      const formattedProducts: AdminProductItem[] = rawProducts.map((p: any) => {
        const nameData = extractMultiLangField(p, 'name')
        const descData = extractMultiLangField(p, 'description')

        return {
          id: p.id,
          name: nameData.ar || nameData.en || 'منتج بدون اسم',
          name_ar: nameData.ar,
          name_en: nameData.en,
          description: descData.ar || descData.en || '',
          description_ar: descData.ar,
          description_en: descData.en,
          sku: p.code || p.sku || `SKU-${p.id}`,
          category_id: p.category_id || p.category_ids?.[0]?.id || '',
          category_name: p.category_name || p.category?.name || 'تصنيف عام',
          sub_category_id: p.sub_category_id || '',
          sub_sub_category_id: p.sub_sub_category_id || '',
          brand_id: p.brand_id || '',
          brand_name: p.brand?.name || '',
          unit_price: p.unit_price || p.price || 0,
          purchase_price: p.purchase_price || 0,
          minimum_order_qty: p.minimum_order_qty || 1,
          current_stock: p.current_stock !== undefined ? p.current_stock : (p.stock || 0),
          discount: p.discount || 0,
          discount_type: p.discount_type || 'flat',
          discount_start_date: p.discount_start_date || '',
          discount_end_date: p.discount_end_date || '',
          thumbnail: normalizeProductImageUrl(p.thumbnail_full_url?.path || p.thumbnail || p.images?.[0] || ''),
          images: Array.isArray(p.images) ? p.images.map((img: any) => normalizeProductImageUrl(typeof img === 'string' ? img : (img?.path || img?.url || ''))) : [],
          status: p.status ?? 1,
          created_at: p.created_at || ''
        }
      })

      return {
        success: true,
        data: formattedProducts,
        pagination
      }
    } catch (err: any) {
      console.warn('Admin fetchProducts Error:', err)
      return {
        success: false,
        data: [],
        pagination: { current_page: page, last_page: 1, per_page: limit, total: 0 },
        message: formatApiErrorMessage(err)
      }
    }
  },

  /**
   * 2. DELETE Admin Product by ID
   */
  async deleteProduct(id: string | number, token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/products/delete/${id}`
      const response = await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 10000
      })

      return {
        success: true,
        message: response?.message || 'تم حذف المنتج بنجاح.'
      }
    } catch (err: any) {
      console.error('Admin deleteProduct Error:', err)
      return {
        success: false,
        message: formatApiErrorMessage(err)
      }
    }
  },

  /**
   * 3. Step 1: POST Upload Single Image (type: 'thumbnail' | 'product')
   * Endpoint: POST /api/v1/admin/products/upload-images
   */
  async uploadProductImage(
    file: File,
    type: 'thumbnail' | 'product' = 'product',
    token: string
  ): Promise<{ success: boolean; imageName: string; message?: string }> {
    try {
      const uploadData = new FormData()
      uploadData.append('image', file)
      uploadData.append('file', file)
      uploadData.append('type', type)

      const endpoint = `${API_BASE_URL}/admin/products/upload-images`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: uploadData,
        timeout: 30000
      })

      let imageName = ''
      if (typeof response === 'string') {
        imageName = response
      } else if (response && typeof response === 'object') {
        imageName =
          response.image_name ||
          response.img_name ||
          response.imageName ||
          response.file_name ||
          response.name ||
          response.data?.image_name ||
          response.data?.name ||
          (Array.isArray(response.data) ? response.data[0] : (typeof response.data === 'string' ? response.data : '')) ||
          (Array.isArray(response.images) ? response.images[0] : response.images) ||
          (Array.isArray(response.image) ? response.image[0] : response.image) ||
          (Array.isArray(response) ? response[0] : '') ||
          ''
      }

      if (!imageName && response?.data && typeof response.data === 'string') {
        imageName = response.data
      }

      if (imageName) {
        return {
          success: true,
          imageName: extractCleanFilename(String(imageName)),
          message: 'تم رفع الصورة بنجاح.'
        }
      } else {
        return {
          success: false,
          imageName: '',
          message: 'لم يتم استلام اسم الصورة من السيرفر بعد الرفع.'
        }
      }
    } catch (err: any) {
      console.error('Admin uploadProductImage Error:', err)
      return {
        success: false,
        imageName: '',
        message: formatApiErrorMessage(err)
      }
    }
  },

  /**
   * 4. Step 2: POST Add Admin Product (Metadata with Text Image Names)
   */
  async addProduct(formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/products/add`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData,
        timeout: 30000
      })

      return {
        success: true,
        message: response?.message || 'تم إضافة المنتج الجديد بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin addProduct Error:', err)
      return {
        success: false,
        message: formatApiErrorMessage(err)
      }
    }
  },

  /**
   * 5. Step 2: POST Update Admin Product (Metadata with Text Image Names)
   */
  async updateProduct(id: string | number, formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/products/update/${id}`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: formData,
        timeout: 30000
      })

      return {
        success: true,
        message: response?.message || 'تم تحديث بيانات المنتج بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin updateProduct Error:', err)
      return {
        success: false,
        message: formatApiErrorMessage(err)
      }
    }
  },

  /**
   * 6. GET Single Admin Product Details for Editing with full mapping
   */
  async fetchProductDetails(
    id: string | number,
    token: string
  ): Promise<{ success: boolean; data: ProductFormDataPayload | null; message?: string }> {
    try {
      // Fetch directly from verified Admin Products API endpoint (GET /api/v1/admin/products/list)
      const endpoint = `${API_BASE_URL}/admin/products/list?page=1&limit=500&_t=${Date.now()}`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        },
        retry: 1,
        timeout: 15000
      })

      let rawProducts: any[] = []
      if (Array.isArray(response)) {
        rawProducts = response
      } else if (response && typeof response === 'object') {
        rawProducts = response.products || response.data || response.list || []
      }

      const found = rawProducts.find((p: any) => String(p.id) === String(id))

      if (found) {
        const parsed = mapRawProductToFormData(found)
        return {
          success: true,
          data: parsed
        }
      }

      return {
        success: false,
        data: null,
        message: 'لم يتم العثور على بيانات المنتج المطلوب.'
      }
    } catch (err: any) {
      console.error('Admin fetchProductDetails Error:', err)
      return {
        success: false,
        data: null,
        message: formatApiErrorMessage(err)
      }
    }
  }
}

