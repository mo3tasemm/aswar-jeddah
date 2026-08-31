/**
 * Admin Brands API Service Layer with Multi-language Translation Support
 * Live API Endpoints:
 * 1. GET /api/v1/admin/brands/list?searchValue={searchValue}&page={page}&limit={limit}&_t={timestamp}
 * 2. DELETE /api/v1/admin/brands/delete/{id}
 * 3. POST /api/v1/admin/brands/add
 * 4. POST /api/v1/admin/brands/update/{id}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

export interface AdminBrandItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
  image?: string;
  logo?: string;
  productCount?: number;
  created_at?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface BrandFormDataPayload {
  id?: number | string;
  name_ar: string;
  name_en?: string;
  imageFile?: File | null;
}

/**
 * Universal Multi-Language Text Extractor Helper
 */
export function extractMultiLangBrand(b: any): { ar: string; en: string } {
  if (!b) return { ar: '', en: '' }

  let ar = ''
  let en = ''

  if (b.name_ar) ar = String(b.name_ar)
  if (b.name_en) en = String(b.name_en)

  if (b.name && typeof b.name === 'object' && !Array.isArray(b.name)) {
    if (!ar && b.name.ar) ar = String(b.name.ar)
    if (!en && b.name.en) en = String(b.name.en)
  }

  if (Array.isArray(b.translations)) {
    b.translations.forEach((t: any) => {
      const locale = (t.locale || t.lang || t.language || '').toLowerCase()
      const val = t.value || t.name || ''
      if (locale === 'ar' && !ar) ar = String(val)
      if (locale === 'en' && !en) en = String(val)
    })
  }

  if (!ar && typeof b.name === 'string' && b.name) {
    ar = b.name
  }
  if (!en) {
    en = ar
  }

  return { ar, en }
}

/**
 * Builds FormData payload for Admin Add/Update Brand API
 */
export function buildBrandFormData(payload: BrandFormDataPayload): FormData {
  const formData = new FormData()

  const nameAr = (payload.name_ar || '').trim()
  const nameEn = (payload.name_en || payload.name_ar || '').trim()

  // Primary name key
  formData.append('name', nameAr)

  // Multi-language arrays
  formData.append('lang[]', 'ar')
  formData.append('lang[]', 'en')

  formData.append('name[]', nameAr)
  formData.append('name[]', nameEn)

  // Image File Object attachment
  if (payload.imageFile && payload.imageFile instanceof File) {
    formData.append('image', payload.imageFile)
  }

  return formData
}

export const adminBrandsApiService = {
  /**
   * 1. GET Admin Brands List (with Accept-Language: ar, pagination, anti-cache & searchValue)
   */
  async fetchBrands(
    token: string,
    searchValue: string = '',
    page: number = 1,
    limit: number = 10
  ): Promise<{ success: boolean; data: AdminBrandItem[]; pagination: PaginationMeta; message?: string }> {
    try {
      const queryParams = new URLSearchParams()
      if (searchValue) queryParams.append('searchValue', searchValue)
      queryParams.append('page', String(page))
      queryParams.append('limit', String(limit))
      queryParams.append('_t', String(Date.now()))

      const endpoint = `${API_BASE_URL}/admin/brands/list?${queryParams.toString()}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar', // Pass Arabic language header
          'X-Requested-With': 'XMLHttpRequest',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        retry: 1,
        timeout: 10000
      })

      let rawList: any[] = []
      let pagination: PaginationMeta = {
        current_page: page,
        last_page: 1,
        per_page: limit,
        total: 0
      }

      if (Array.isArray(response)) {
        rawList = response
        pagination.total = response.length
        pagination.last_page = Math.ceil(response.length / limit) || 1
      } else if (response && typeof response === 'object') {
        rawList = response.brands || response.data || response.list || []

        const meta = response.meta || response.pagination || response
        pagination.current_page = Number(meta.current_page || meta.page || page)
        pagination.per_page = Number(meta.per_page || meta.limit || limit)
        pagination.total = Number(meta.total || rawList.length)
        pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1)
      }

      const formattedBrands: AdminBrandItem[] = rawList.map((b: any) => {
        const langData = extractMultiLangBrand(b)

        return {
          id: b.id,
          name: langData.ar || langData.en || 'علامة تجارية بدون اسم',
          name_ar: langData.ar,
          name_en: langData.en,
          image: b.image_full_url?.path || b.image || b.logo_full_url?.path || b.logo || '',
          logo: b.image_full_url?.path || b.image || b.logo_full_url?.path || b.logo || '',
          productCount: b.product_count || b.products_count || 0,
          created_at: b.created_at || ''
        }
      })

      return {
        success: true,
        data: formattedBrands,
        pagination
      }
    } catch (err: any) {
      console.warn('Admin fetchBrands Error:', err?.data?.message || err?.message || err)
      return {
        success: false,
        data: [],
        pagination: { current_page: page, last_page: 1, per_page: limit, total: 0 },
        message: err?.data?.message || err?.message || 'فشل جلب قائمة العلامات التجارية.'
      }
    }
  },

  /**
   * 2. DELETE Admin Brand
   */
  async deleteBrand(id: string | number, token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/brands/delete/${id}`
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
        message: response?.message || 'تم حذف العلامة التجارية بنجاح.'
      }
    } catch (err: any) {
      console.error('Admin deleteBrand Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل حذف العلامة التجارية.'
      }
    }
  },

  /**
   * 3. POST Add Admin Brand (FormData)
   */
  async addBrand(formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/brands/add`
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
        message: response?.message || 'تم إضافة العلامة التجارية بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin addBrand Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل إضافة العلامة التجارية.'
      }
    }
  },

  /**
   * 4. POST Update Admin Brand (FormData)
   */
  async updateBrand(id: string | number, formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/brands/update/${id}`
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
        message: response?.message || 'تم تحديث بيانات العلامة التجارية بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin updateBrand Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل تحديث العلامة التجارية.'
      }
    }
  }
}

