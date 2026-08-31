/**
 * Admin Attributes API Service Layer with Multi-language (AR & EN) Support
 * Live API Endpoints:
 * 1. GET /api/v1/admin/attributes/list?searchValue={searchValue}&page={page}&limit={limit}&_t={timestamp}
 * 2. POST /api/v1/admin/attributes/add (JSON: name[], lang[])
 * 3. POST /api/v1/admin/attributes/update/{id} (JSON: name[], lang[])
 * 4. DELETE /api/v1/admin/attributes/delete/{id}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

export interface AdminAttributeItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
  created_at?: string;
  updated_at?: string;
  values?: Array<{ id: number | string; value: string }>;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface AttributeFormDataPayload {
  id?: number | string;
  name_ar: string;
  name_en: string;
}

/**
 * Universal Multi-Language Text Extractor Helper for Attributes
 */
export function extractMultiLangAttribute(item: any): { ar: string; en: string } {
  if (!item) return { ar: '', en: '' }

  let ar = ''
  let en = ''

  if (item.name_ar) ar = String(item.name_ar)
  if (item.name_en) en = String(item.name_en)

  // Object structure { ar: '...', en: '...' }
  if (item.name && typeof item.name === 'object' && !Array.isArray(item.name)) {
    if (!ar && item.name.ar) ar = String(item.name.ar)
    if (!en && item.name.en) en = String(item.name.en)
  }

  // Array of translations [{locale/lang: 'ar', value/name: '...'}, ...]
  if (Array.isArray(item.translations)) {
    item.translations.forEach((t: any) => {
      const locale = (t.locale || t.lang || t.language || '').toLowerCase()
      const val = t.value || t.name || ''
      if (locale === 'ar' && !ar) ar = String(val)
      if (locale === 'en' && !en) en = String(val)
    })
  }

  // String fallback
  if (!ar && typeof item.name === 'string' && item.name) {
    ar = item.name
  }
  if (!en) {
    en = ar
  }

  return { ar, en }
}

/**
 * Builds JSON payload for Admin Add/Update Attribute API
 */
export function buildAttributeJsonPayload(payload: AttributeFormDataPayload): { name: string[]; lang: string[] } {
  const nameAr = (payload.name_ar || '').trim()
  const nameEn = (payload.name_en || payload.name_ar || '').trim()

  return {
    name: [nameAr, nameEn],
    lang: ['ar', 'en']
  }
}

export const adminAttributesApiService = {
  /**
   * 1. GET Admin Attributes List
   */
  async fetchAttributes(
    token: string,
    searchValue: string = '',
    page: number = 1,
    limit: number = 10
  ): Promise<{ success: boolean; data: AdminAttributeItem[]; pagination: PaginationMeta; message?: string }> {
    try {
      const queryParams = new URLSearchParams()
      if (searchValue.trim()) queryParams.append('searchValue', searchValue.trim())
      queryParams.append('page', String(page))
      queryParams.append('limit', String(limit))
      queryParams.append('_t', String(Date.now()))

      const endpoint = `${API_BASE_URL}/admin/attributes/list?${queryParams.toString()}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
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
        rawList = response.attributes || response.data || response.list || []

        const meta = response.meta || response.pagination || response
        pagination.current_page = Number(meta.current_page || meta.page || page)
        pagination.per_page = Number(meta.per_page || meta.limit || limit)
        pagination.total = Number(meta.total || rawList.length)
        pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1)
      }

      const formattedAttributes: AdminAttributeItem[] = rawList.map((a: any) => {
        const langData = extractMultiLangAttribute(a)

        return {
          id: a.id,
          name: langData.ar || langData.en || 'سمة بدون اسم',
          name_ar: langData.ar,
          name_en: langData.en,
          created_at: a.created_at || '',
          updated_at: a.updated_at || '',
          values: a.values || []
        }
      })

      return {
        success: true,
        data: formattedAttributes,
        pagination
      }
    } catch (err: any) {
      console.warn('Admin fetchAttributes Error:', err?.data?.message || err?.message || err)
      return {
        success: false,
        data: [],
        pagination: { current_page: page, last_page: 1, per_page: limit, total: 0 },
        message: err?.data?.message || err?.message || 'فشل جلب قائمة السمات.'
      }
    }
  },

  /**
   * 2. POST Add Admin Attribute (JSON)
   */
  async addAttribute(payload: AttributeFormDataPayload, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/attributes/add`
      const jsonBody = buildAttributeJsonPayload(payload)

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: jsonBody,
        timeout: 15000
      })

      return {
        success: true,
        message: response?.message || 'تمت إضافة السمة بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin addAttribute Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل إضافة السمة الجديدة.'
      }
    }
  },

  /**
   * 3. POST Update Admin Attribute (JSON)
   */
  async updateAttribute(id: string | number, payload: AttributeFormDataPayload, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/attributes/update/${id}`
      const jsonBody = buildAttributeJsonPayload(payload)

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: jsonBody,
        timeout: 15000
      })

      return {
        success: true,
        message: response?.message || 'تم تحديث بيانات السمة بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin updateAttribute Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل تحديث السمة.'
      }
    }
  },

  /**
   * 4. DELETE Admin Attribute
   */
  async deleteAttribute(id: string | number, token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/attributes/delete/${id}`
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
        message: response?.message || 'تم حذف السمة بنجاح.'
      }
    } catch (err: any) {
      console.error('Admin deleteAttribute Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل حذف السمة.'
      }
    }
  }
}

