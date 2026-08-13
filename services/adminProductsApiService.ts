/**
 * Admin Products API Service Layer with Multi-language Translation Support
 * Live API Endpoints:
 * 1. GET /api/v1/admin/products/list?page={page}&limit={limit}
 * 2. DELETE /api/v1/admin/products/delete/{id}
 * 3. POST /api/v1/admin/products/add
 * 4. POST /api/v1/admin/products/update/{id}
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
  variations?: Array<{
    code: string;
    price: string | number;
    sku: string;
    qty: string | number;
  }>;
  thumbnail?: File | null;
  images?: File[];
  color_images?: Record<string, File>;
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
 * Builds standard FormData for Add / Update Admin Products API
 */
export function buildProductFormData(payload: ProductFormDataPayload): FormData {
  const formData = new FormData()

  const nameAr = (payload.name_ar || '').trim()
  const nameEn = (payload.name_en || payload.name_ar || '').trim()

  const descAr = (payload.description_ar || '').trim()
  const descEn = (payload.description_en || payload.description_ar || '').trim()

  // 1. Languages
  formData.append('lang[]', 'ar')
  formData.append('lang[]', 'en')

  formData.append('name[]', nameAr)
  formData.append('name[]', nameEn)

  formData.append('description[]', descAr)
  formData.append('description[]', descEn)

  // 2. Category & Brand
  if (payload.category_id !== undefined && payload.category_id !== null && payload.category_id !== '') {
    formData.append('category_id', String(payload.category_id))
  }
  if (payload.sub_category_id) {
    formData.append('sub_category_id', String(payload.sub_category_id))
  }
  if (payload.sub_sub_category_id) {
    formData.append('sub_sub_category_id', String(payload.sub_sub_category_id))
  }
  if (payload.brand_id) {
    formData.append('brand_id', String(payload.brand_id))
  }

  // 3. Pricing & Stock
  formData.append('unit_price', String(payload.unit_price || 0))
  if (payload.purchase_price !== undefined) {
    formData.append('purchase_price', String(payload.purchase_price || 0))
  }
  if (payload.minimum_order_qty !== undefined) {
    formData.append('minimum_order_qty', String(payload.minimum_order_qty || 1))
  }
  if (payload.current_stock !== undefined) {
    formData.append('current_stock', String(payload.current_stock || 0))
  }

  // 4. Discount
  if (payload.discount !== undefined) {
    formData.append('discount', String(payload.discount || 0))
  }
  formData.append('discount_type', payload.discount_type || 'flat')
  if (payload.discount_start_date) {
    formData.append('discount_start_date', payload.discount_start_date)
  }
  if (payload.discount_end_date) {
    formData.append('discount_end_date', payload.discount_end_date)
  }

  // 5. Colors & Variations
  const isColorsActive = payload.colors_active ? 1 : 0
  formData.append('colors_active', String(isColorsActive))

  if (payload.colors && payload.colors.length > 0) {
    payload.colors.forEach((colorCode) => {
      const cleanColor = colorCode.replace(/^#/, '')
      formData.append('colors[]', cleanColor)
    })
  }

  if (payload.choice_attributes && payload.choice_attributes.length > 0) {
    payload.choice_attributes.forEach((attrId) => {
      formData.append('choice_attributes[]', String(attrId))
      
      const options = payload.choice_options?.[attrId] || []
      options.forEach((opt) => {
        formData.append(`choice_options_${attrId}[]`, opt)
      })
    })
  }

  if (payload.variations && payload.variations.length > 0) {
    payload.variations.forEach((varItem) => {
      formData.append(`price_${varItem.code}`, String(varItem.price || 0))
      formData.append(`sku_${varItem.code}`, varItem.sku || '')
      formData.append(`qty_${varItem.code}`, String(varItem.qty || 0))
    })
  }

  // 6. Files
  if (payload.thumbnail && payload.thumbnail instanceof File) {
    formData.append('thumbnail', payload.thumbnail)
  }

  if (payload.images && payload.images.length > 0) {
    payload.images.forEach((file) => {
      if (file instanceof File) {
        formData.append('images[]', file)
      }
    })
  }

  if (payload.color_images) {
    Object.entries(payload.color_images).forEach(([colorCode, file]) => {
      if (file instanceof File) {
        const cleanColor = colorCode.replace(/^#/, '')
        formData.append(`color_image[${cleanColor}]`, file)
      }
    })
  }

  // 7. Mandatory default keys
  formData.append('unit', 'pc')
  formData.append('tax', '15')
  formData.append('tax_type', 'percent')

  return formData
}

export const adminProductsApiService = {
  /**
   * 1. GET Admin Products List with Pagination & Accept-Language Headers
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
          'Accept-Language': 'ar', // Pass Arabic language header
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
          thumbnail: p.thumbnail_full_url?.path || p.thumbnail || p.images?.[0] || '',
          images: Array.isArray(p.images) ? p.images.map((img: any) => typeof img === 'string' ? img : (img?.path || img?.url || '')) : [],
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
      console.warn('Admin fetchProducts Error:', err?.data?.message || err?.message || err)
      return {
        success: false,
        data: [],
        pagination: { current_page: page, last_page: 1, per_page: limit, total: 0 },
        message: err?.data?.message || err?.message || 'فشل جلب قائمة المنتجات.'
      }
    }
  },

  /**
   * 2. DELETE Admin Product
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
        message: err?.data?.message || err?.message || 'فشل حذف المنتج.'
      }
    }
  },

  /**
   * 3. POST Add Admin Product (FormData)
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
        timeout: 15000
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
        message: err?.data?.message || err?.message || 'فشل إضافة المنتج.'
      }
    }
  },

  /**
   * 4. POST Update Admin Product (FormData)
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
        timeout: 15000
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
        message: err?.data?.message || err?.message || 'فشل تحديث المنتج.'
      }
    }
  }
}
