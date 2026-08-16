/**
 * Admin Colors API Service Layer
 * Live API Endpoints:
 * 1. GET /api/v1/admin/colors/list?searchValue={searchValue}&page={page}&limit={limit}&_t={timestamp}
 * 2. POST /api/v1/admin/colors/add (FormData)
 * 3. POST /api/v1/admin/colors/update/{id} (FormData)
 * 4. DELETE /api/v1/admin/colors/delete/{id}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

export type ColorType = 'code' | 'image'

export interface AdminColorItem {
  id: number | string;
  name: string;
  color_type: ColorType;
  code?: string;
  image?: string;
  image_full_url?: {
    key?: string;
    path?: string;
    status?: number;
  };
  created_at?: string;
  updated_at?: string;
}

export interface PaginationMeta {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface ColorFormDataPayload {
  id?: number | string;
  name: string;
  color_type: ColorType;
  code?: string;
  imageFile?: File | null;
  existingImage?: string;
}

/**
 * Normalizes hex code to standard `#RRGGBB` format or raw string
 */
export function normalizeHexCode(code: string | undefined): string {
  if (!code) return '#000000'
  const trimmed = code.trim()
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

/**
 * Builds FormData payload for Admin Add/Update Color API
 * Nuxt/$fetch handles multipart/form-data boundary automatically when passing FormData
 */
export function buildColorFormData(payload: ColorFormDataPayload): FormData {
  const formData = new FormData()

  // 1. Color Name
  formData.append('name', (payload.name || '').trim())

  // 2. Color Type: 'code' or 'image'
  formData.append('color_type', payload.color_type || 'code')

  // 3. Conditional Fields based on color_type
  if (payload.color_type === 'code') {
    const cleanCode = normalizeHexCode(payload.code)
    formData.append('code', cleanCode)
  } else if (payload.color_type === 'image') {
    if (payload.imageFile && payload.imageFile instanceof File) {
      formData.append('image', payload.imageFile)
    }
  }

  return formData
}

export const adminColorsApiService = {
  /**
   * 1. GET Admin Colors List (with pagination, anti-cache & searchValue)
   */
  async fetchColors(
    token: string,
    searchValue: string = '',
    page: number = 1,
    limit: number = 10
  ): Promise<{ success: boolean; data: AdminColorItem[]; pagination: PaginationMeta; message?: string }> {
    try {
      const queryParams = new URLSearchParams()
      if (searchValue.trim()) queryParams.append('searchValue', searchValue.trim())
      queryParams.append('page', String(page))
      queryParams.append('limit', String(limit))
      queryParams.append('_t', String(Date.now()))

      const endpoint = `${API_BASE_URL}/admin/colors/list?${queryParams.toString()}`

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
        rawList = response.colors || response.data || response.list || []

        const meta = response.meta || response.pagination || response
        pagination.current_page = Number(meta.current_page || meta.page || page)
        pagination.per_page = Number(meta.per_page || meta.limit || limit)
        pagination.total = Number(meta.total || rawList.length)
        pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1)
      }

      const formattedColors: AdminColorItem[] = rawList.map((c: any) => {
        // Detect color type if not explicitly set
        let detectedType: ColorType = 'code'
        if (c.color_type) {
          detectedType = c.color_type === 'image' ? 'image' : 'code'
        } else if (c.image || c.image_full_url?.path) {
          detectedType = 'image'
        }

        const rawCode = c.code || c.hex || c.color_code || ''
        const imageUrl = c.image_full_url?.path || c.image || ''

        return {
          id: c.id,
          name: c.name || c.name_ar || 'لون بدون اسم',
          color_type: detectedType,
          code: rawCode ? normalizeHexCode(rawCode) : '#000000',
          image: imageUrl,
          image_full_url: c.image_full_url || (imageUrl ? { path: imageUrl } : undefined),
          created_at: c.created_at || '',
          updated_at: c.updated_at || ''
        }
      })

      return {
        success: true,
        data: formattedColors,
        pagination
      }
    } catch (err: any) {
      console.warn('Admin fetchColors Error:', err?.data?.message || err?.message || err)
      return {
        success: false,
        data: [],
        pagination: { current_page: page, last_page: 1, per_page: limit, total: 0 },
        message: err?.data?.message || err?.message || 'فشل جلب قائمة الألوان.'
      }
    }
  },

  /**
   * 2. POST Add Admin Color (FormData)
   */
  async addColor(formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/colors/add`
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
        message: response?.message || 'تمت إضافة اللون بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin addColor Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل إضافة اللون الجديد.'
      }
    }
  },

  /**
   * 3. POST Update Admin Color (FormData)
   */
  async updateColor(id: string | number, formData: FormData, token: string): Promise<{ success: boolean; message?: string; data?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/colors/update/${id}`
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
        message: response?.message || 'تم تحديث بيانات اللون بنجاح.',
        data: response?.data || response
      }
    } catch (err: any) {
      console.error('Admin updateColor Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل تحديث بيانات اللون.'
      }
    }
  },

  /**
   * 4. DELETE Admin Color
   */
  async deleteColor(id: string | number, token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/colors/delete/${id}`
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
        message: response?.message || 'تم حذف اللون بنجاح.'
      }
    } catch (err: any) {
      console.error('Admin deleteColor Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.message || 'فشل حذف اللون.'
      }
    }
  }
}
