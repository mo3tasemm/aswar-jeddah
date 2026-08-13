/**
 * Admin Categories API Service Layer with Multi-language Translation Support
 * Live API Endpoints:
 * 1. GET /api/v1/admin/categories/list?searchValue={searchValue}&_t={timestamp}
 * 2. DELETE /api/v1/admin/categories/delete/{id}
 * 3. POST /api/v1/admin/categories/add
 * 4. POST /api/v1/admin/categories/update/{id}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

export interface AdminCategoryItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
  slug?: string;
  icon?: string;
  image?: string;
  productCount?: number;
  subCategories?: AdminCategoryItem[];
  created_at?: string;
}

export interface CategoryFormDataPayload {
  id?: number | string;
  name_ar: string;
  name_en?: string;
  imageFile?: File | null;
}

/**
 * Universal Multi-Language Text Extractor Helper
 */
export function extractMultiLangCategory(c: any): { ar: string; en: string } {
  if (!c) return { ar: '', en: '' }

  let ar = ''
  let en = ''

  if (c.name_ar) ar = String(c.name_ar)
  if (c.name_en) en = String(c.name_en)

  if (c.name && typeof c.name === 'object' && !Array.isArray(c.name)) {
    if (!ar && c.name.ar) ar = String(c.name.ar)
    if (!en && c.name.en) en = String(c.name.en)
  }

  if (Array.isArray(c.translations)) {
    c.translations.forEach((t: any) => {
      const locale = (t.locale || t.lang || t.language || '').toLowerCase()
      const val = t.value || t.name || ''
      if (locale === 'ar' && !ar) ar = String(val)
      if (locale === 'en' && !en) en = String(val)
    })
  }

  if (!ar && typeof c.name === 'string' && c.name) {
    ar = c.name
  }
  if (!en) {
    en = ar
  }

  return { ar, en }
}

/**
 * Builds FormData payload for Admin Add/Update Category API
 */
export function buildCategoryFormData(payload: CategoryFormDataPayload): FormData {
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

export const adminCategoriesApiService = {
  /**
   * 1. GET Admin Categories List (with Accept-Language: ar and anti-cache query)
   */
  async fetchCategories(
    token: string, 
    searchValue: string = ''
  ): Promise<{ success: boolean; data: AdminCategoryItem[]; message?: string }> {
    try {
      const queryParams = new URLSearchParams()
      if (searchValue) queryParams.append('searchValue', searchValue)
      queryParams.append('_t', String(Date.now()))

      const endpoint = `${API_BASE_URL}/admin/categories/list?${queryParams.toString()}`

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
      if (Array.isArray(response)) {
        rawList = response
      } else if (response && typeof response === 'object') {
        rawList = response.categories || response.data || response.list || []
      }

      const formattedCategories: AdminCategoryItem[] = rawList.map((c: any) => {
        const langData = extractMultiLangCategory(c)

        return {
          id: c.id,
          name: langData.ar || langData.en || 'قسم بدون اسم',
          name_ar: langData.ar,
          name_en: langData.en,
          slug: c.slug || `cat-${c.id}`,
          icon: c.icon_full_url?.path || c.icon || c.image_full_url?.path || c.image || '',
          image: c.image_full_url?.path || c.image || c.icon_full_url?.path || c.icon || '',
          productCount: c.product_count || c.products_count || 0,
          subCategories: (c.childes || c.sub_categories || []).map((sub: any) => {
            const subLang = extractMultiLangCategory(sub)
            return {
              id: sub.id,
              name: subLang.ar || subLang.en || '',
              name_ar: subLang.ar,
              name_en: subLang.en,
              slug: sub.slug || `sub-${sub.id}`,
              icon: sub.icon_full_url?.path || sub.icon || '',
              image: sub.image_full_url?.path || sub.image || ''
            }
          }),
          created_at: c.created_at || ''
        }
      })

      return {
        success: true,
        data: formattedCategories
      }
    } catch (err: any) {
      console.warn('Admin fetchCategories Error:', err?.data?.message || err?.message || err)
      return {
        success: false,
        data: [],
        message: err?.data?.message || err?.message || 'فشل جلب قائمة الأقسام.'
      }
    }
  },

  /**
   * 2. DELETE Admin Category
   */
  async deleteCategory(id: string | number, token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/categories/delete/${id}`
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
        message: response?.message || 'تم حذف القسم بنجاح.'
      }
    } catch (err: any) {
      console.error('Admin deleteCategory Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل حذف القسم.'
      }
    }
  },

  /**
   * 3. POST Add Admin Category (FormData)
   */
  async addCategory(formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/categories/add`
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
        message: response?.message || 'تم إضافة القسم الجديد بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin addCategory Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل إضافة القسم.'
      }
    }
  },

  /**
   * 4. POST Update Admin Category (FormData)
   */
  async updateCategory(id: string | number, formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/categories/update/${id}`
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
        message: response?.message || 'تم تحديث بيانات القسم بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin updateCategory Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل تحديث بيانات القسم.'
      }
    }
  }
}
