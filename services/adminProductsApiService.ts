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

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

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
export function normalizeProductImageUrl(raw: any): string {
  if (!raw) return ''
  if (typeof raw === 'object') {
    if (raw.path) return String(raw.path)
    if (raw.url) return String(raw.url)
    if (raw.image_full_url?.path) return String(raw.image_full_url.path)
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim()
    if (!trimmed || trimmed === 'null' || trimmed === 'undefined') return ''
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    if (trimmed.startsWith('data:image/')) return trimmed
    if (trimmed.startsWith('/')) return `https://wedgetstore.com${trimmed}`
    return `https://wedgetstore.com/storage/app/public/product/${trimmed}`
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
 * Builds standard FormData for Add / Update Admin Products API (6valley Standard)
 * - Multi-language: ONLY lang[], name[], description[] arrays
 * - Attributes & Choices: ONLY choice_no[] and choice_attributes[] when active
 * - Colors: colors_active ('1'|'0') & colors[] & color_image_{cleanHex}
 * - Variations: Clean keys without '#' symbols (price_{cleanCode}, sku_{cleanCode}, qty_{cleanCode})
 * - Images: Binary File objects sent directly as multipart (thumbnail=File, image=File, images[]=File, color_image_{hex}=File)
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
  formData.append('shipping_cost', '0')
  formData.append('multiply_qty', '0')
  formData.append('status', '1')
  formData.append('request_status', '1')

  // 5. Colors
  // 6valley stores colors in DB — the exact format (with or without '#') depends on the version.
  // We send BOTH formats so Color::where('code', $item)->first() succeeds regardless.
  const isColorsActive = Boolean(payload.colors_active && payload.colors && payload.colors.length > 0)
  formData.append('colors_active', isColorsActive ? '1' : '0')

  const cleanColorCodes: string[] = [] // without '#', uppercase
  if (isColorsActive && payload.colors && payload.colors.length > 0) {
    payload.colors.forEach((c) => {
      const clean = c.replace(/^#/, '').toUpperCase().trim()
      if (clean) {
        cleanColorCodes.push(clean)
        // Send BOTH formats for maximum compatibility
        formData.append('colors[]', clean)           // without '#' (e.g. FF0505)
        formData.append('colors[]', `#${clean}`)     // with '#' (e.g. #FF0505)
      }
    })
  }

  // 6. Attributes & Choice Options (Only appended when attributes are selected)
  const choiceAttrs = (payload.choice_attributes || []).map(String).filter(Boolean)
  if (choiceAttrs.length > 0) {
    choiceAttrs.forEach((attrId) => {
      formData.append('choice_no[]', attrId)
      formData.append('choice_attributes[]', attrId)

      const options = payload.choice_options?.[attrId] || []
      options.forEach((opt) => {
        const val = String(opt || '').trim()
        if (val) {
          formData.append(`choice_options_${attrId}[]`, val)
        }
      })
    })
  }

  // 7. Variations & Combinations
  // Only send if colors OR attributes are actually active
  const hasVariations = Boolean(
    (isColorsActive && cleanColorCodes.length > 0) || choiceAttrs.length > 0
  )
  if (hasVariations && payload.variations && payload.variations.length > 0) {
    payload.variations.forEach((varItem) => {
      // cleanCode is WITHOUT '#' uppercase (e.g. FF0505 or FF0505-S)
      const cleanCode = String(varItem.code || '').replace(/^#/, '').trim().toUpperCase()
      if (!cleanCode) return

      const price = String(varItem.price || unitPrice)
      const sku = varItem.sku || `SKU-${cleanCode}`
      const qty = String(varItem.qty || 10)
      const lowerCode = cleanCode.toLowerCase()

      // Send without '#' (uppercase + lowercase)
      formData.append(`price_${cleanCode}`, price)
      formData.append(`sku_${cleanCode}`, sku)
      formData.append(`qty_${cleanCode}`, qty)
      if (lowerCode !== cleanCode) {
        formData.append(`price_${lowerCode}`, price)
        formData.append(`sku_${lowerCode}`, sku)
        formData.append(`qty_${lowerCode}`, qty)
      }
    })
  }

  // 8. Files & Media Attachments (Direct Binary Multipart — no pre-upload step)
  if (payload.thumbnail) {
    formData.append('image', payload.thumbnail)
    formData.append('thumbnail', payload.thumbnail)
  }

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((img) => {
      if (img) formData.append('images[]', img)
    })
  }

  if (payload.color_images && isColorsActive) {
    Object.entries(payload.color_images).forEach(([colorKey, fileOrStr]) => {
      const cleanCode = colorKey.replace(/^#/, '').trim()
      if (fileOrStr) {
        formData.append(`color_image_${cleanCode}`, fileOrStr)
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
  }
}
