/**
 * Admin Coupons API Service Layer
 * Supported Endpoints:
 * - GET /api/v1/admin/coupon/list or /api/v1/admin/coupons/list
 * - GET /api/v1/admin/coupon/{id} or /api/v1/admin/coupon/details/{id}
 * - POST /api/v1/admin/coupon/add or /api/v1/admin/coupon/store
 * - POST /api/v1/admin/coupon/update/{id} or PUT /api/v1/admin/coupon/update/{id}
 * - POST /api/v1/admin/coupon/status-update or /api/v1/admin/coupon/status
 * - DELETE /api/v1/admin/coupon/delete/{id} or DELETE /api/v1/admin/coupon/{id}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

export interface AdminCouponItem {
  id: string | number;
  title: string;
  code: string;
  coupon_type: 'discount_on_purchase' | 'free_delivery' | 'first_order' | string;
  discount_type: 'percent' | 'percentage' | 'amount' | string;
  discount: number;
  min_purchase: number;
  max_discount: number;
  limit: number;
  order_count?: number;
  start_date: string;
  expire_date: string;
  is_expired?: boolean;
  status: number | boolean;
  customer_id?: string | number;
  created_at?: string;
}

export interface AdminCouponPayload {
  title: string;
  code: string;
  coupon_type: string;
  discount_type: string;
  discount: number;
  min_purchase?: number;
  max_discount?: number;
  limit?: number;
  start_date: string;
  expire_date: string;
  status?: number | boolean;
  customer_id?: string | number;
}

export interface AdminCouponsListFilters {
  limit?: number;
  offset?: number;
  page?: number;
  search?: string;
  status?: string | number;
  coupon_type?: string;
}

export interface AdminCouponsListResponse {
  success: boolean;
  coupons: AdminCouponItem[];
  data?: AdminCouponItem[];
  total: number;
  total_size?: number;
  last_page: number;
  limit: number;
  offset: number;
  message?: string;
}

export interface AdminCouponDetailsResponse {
  success: boolean;
  coupon: AdminCouponItem | null;
  message?: string;
}

/**
 * Format headers with Token
 */
const buildHeaders = (token: string, isJson: boolean = true): HeadersInit => {
  const cleanToken = (token || '').replace(/^Bearer\s+/i, '').trim()
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'X-Client-Type': 'admin',
    'zoneId': '1'
  }
  if (cleanToken) {
    headers['Authorization'] = `Bearer ${cleanToken}`
  }
  if (isJson) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

/**
 * Parse server validation and error responses from Laravel / 6valley
 */
const parseServerApiError = (json: any, status: number, defaultMsg: string = 'فشل في حفظ الكوبون') => {
  let message = json?.message || json?.error || defaultMsg
  const errors: Record<string, string[]> = {}

  if (json?.errors) {
    if (Array.isArray(json.errors)) {
      json.errors.forEach((err: any) => {
        if (typeof err === 'string') {
          message = err
        } else if (err && typeof err === 'object') {
          const key = err.code || err.key || 'general'
          const msg = err.message || JSON.stringify(err)
          if (!errors[key]) errors[key] = []
          errors[key].push(msg)
          if (message === defaultMsg) message = msg
        }
      })
    } else if (typeof json.errors === 'object') {
      for (const [key, val] of Object.entries(json.errors)) {
        if (Array.isArray(val)) {
          errors[key] = val.map(String)
        } else if (typeof val === 'string') {
          errors[key] = [val]
        }
      }
    }
  }

  // Detect duplicate coupon code error
  const msgLower = String(message).toLowerCase()
  const isDuplicateCode = msgLower.includes('unique') || msgLower.includes('already exists') || (errors.code && errors.code.some(e => e.toLowerCase().includes('unique')))

  if (isDuplicateCode) {
    errors.code = ['كود الخصم مستخدم مسبقاً! يرجى اختيار كود آخر أو الضغط على زر "توليد كود".']
    message = 'كود الخصم مستخدم مسبقاً في النظام! يرجى إدخال كود جديد.'
  }

  if (status === 403 && !isDuplicateCode) {
    message = json?.message || 'ليس لديك الصلاحية لتنفيذ هذا الإجراء أو أن البيانات غير مطابقة.'
  }

  return { message, errors }
}

export const adminCouponsApiService = {
  /**
   * Fetch Coupons List
   */
  async fetchCoupons(
    token: string,
    filters: AdminCouponsListFilters = {}
  ): Promise<AdminCouponsListResponse> {
    const limit = filters.limit || 10
    const offset = filters.offset !== undefined ? filters.offset : (filters.page || 1)

    const params = new URLSearchParams()
    params.append('limit', String(limit))
    params.append('offset', String(offset))
    params.append('page', String(offset))
    params.append('_t', String(Date.now()))

    if (filters.search && filters.search.trim()) {
      params.append('search', filters.search.trim())
    }
    if (filters.status !== undefined && filters.status !== '') {
      params.append('status', String(filters.status))
    }
    if (filters.coupon_type && filters.coupon_type !== 'all') {
      params.append('coupon_type', filters.coupon_type)
    }

    const candidateUrls = [
      `${API_BASE_URL}/admin/coupons/list?${params.toString()}`,
      `${API_BASE_URL}/admin/coupon/list?${params.toString()}`,
      `${API_BASE_URL}/admin/coupon?${params.toString()}`
    ]

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: buildHeaders(token, true)
        })

        if (!response.ok) continue

        const raw = await response.json()

        let rawList: any[] = []
        let totalCount = 0

        if (Array.isArray(raw)) {
          rawList = raw
          totalCount = raw.length
        } else if (raw && typeof raw === 'object') {
          totalCount = Number(
            raw.total_size ??
            raw.total ??
            raw.coupons?.total ??
            raw.data?.total ??
            0
          )

          if (Array.isArray(raw.coupons)) {
            rawList = raw.coupons
          } else if (raw.coupons && Array.isArray(raw.coupons.data)) {
            rawList = raw.coupons.data
          } else if (Array.isArray(raw.data)) {
            rawList = raw.data
          } else if (raw.data && Array.isArray(raw.data.coupons)) {
            rawList = raw.data.coupons
          } else if (raw.data && Array.isArray(raw.data.data)) {
            rawList = raw.data.data
          } else if (Array.isArray(raw.items)) {
            rawList = raw.items
          }

          if (totalCount === 0 && rawList.length > 0) {
            totalCount = rawList.length
          }
        }

        const mappedCoupons: AdminCouponItem[] = rawList.map((item: any) => {
          if (!item || typeof item !== 'object') return null

          const statusVal = item.status === 1 || item.status === '1' || item.status === true || item.is_active === 1 || item.is_active === true
          const expDate = item.expire_date ? String(item.expire_date).split('T')[0] : (item.end_date ? String(item.end_date).split('T')[0] : '')

          let isExp = false
          if (item.is_expired !== undefined) {
            isExp = item.is_expired === 1 || item.is_expired === true || item.is_expired === '1'
          } else if (expDate) {
            try {
              const expTime = new Date(expDate).getTime()
              isExp = !isNaN(expTime) && (expTime + 86400000 < Date.now())
            } catch {
              isExp = false
            }
          }

          return {
            id: item.id,
            title: item.title || item.code || 'كوبون خصم',
            code: String(item.code || '').trim().toUpperCase(),
            coupon_type: item.coupon_type || item.type || 'discount_on_purchase',
            discount_type: item.discount_type || 'percent',
            discount: Number(item.discount || item.discount_value || 0),
            min_purchase: Number(item.min_purchase || item.min_order || 0),
            max_discount: Number(item.max_discount || 0),
            limit: Number(item.limit || item.usage_limit || 0),
            order_count: Number(item.order_count || item.times_used || item.usage_count || 0),
            start_date: item.start_date ? String(item.start_date).split('T')[0] : '',
            expire_date: expDate,
            is_expired: isExp,
            status: statusVal ? 1 : 0,
            customer_id: item.customer_id || '0',
            created_at: item.created_at || ''
          }
        }).filter((c): c is AdminCouponItem => c !== null)

        const lastPageNum = Number(raw.last_page || Math.max(1, Math.ceil(totalCount / limit)))

        return {
          success: true,
          coupons: mappedCoupons,
          data: mappedCoupons,
          total: totalCount || mappedCoupons.length,
          total_size: totalCount || mappedCoupons.length,
          last_page: lastPageNum,
          limit,
          offset
        }
      } catch (err) { }
    }

    return {
      success: false,
      coupons: [],
      data: [],
      total: 0,
      total_size: 0,
      last_page: 1,
      limit,
      offset,
      message: 'فشل في جلب قائمة الكوبونات'
    }
  },

  /**
   * Fetch Single Coupon Details
   */
  async fetchCouponDetails(
    token: string,
    couponId: string | number
  ): Promise<AdminCouponDetailsResponse> {
    const candidateUrls = [
      `${API_BASE_URL}/admin/coupons/details/${couponId}?_t=${Date.now()}`,
      `${API_BASE_URL}/admin/coupon/details/${couponId}?_t=${Date.now()}`,
      `${API_BASE_URL}/admin/coupon/${couponId}?_t=${Date.now()}`,
      `${API_BASE_URL}/admin/coupon/edit/${couponId}?_t=${Date.now()}`
    ]

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: buildHeaders(token, true)
        })

        if (!response.ok) continue

        const raw = await response.json()
        const item = raw.coupon || raw.data?.coupon || raw.data || raw

        if (item && (item.id || item.code)) {
          const statusVal = item.status === 1 || item.status === '1' || item.status === true || item.is_active === 1 || item.is_active === true
          const expDate = item.expire_date ? String(item.expire_date).split('T')[0] : (item.end_date ? String(item.end_date).split('T')[0] : '')

          let isExp = false
          if (item.is_expired !== undefined) {
            isExp = item.is_expired === 1 || item.is_expired === true || item.is_expired === '1'
          } else if (expDate) {
            try {
              const expTime = new Date(expDate).getTime()
              isExp = !isNaN(expTime) && (expTime + 86400000 < Date.now())
            } catch {
              isExp = false
            }
          }

          const mapped: AdminCouponItem = {
            id: item.id || couponId,
            title: item.title || item.code || '',
            code: String(item.code || '').trim().toUpperCase(),
            coupon_type: item.coupon_type || item.type || 'discount_on_purchase',
            discount_type: item.discount_type || 'percent',
            discount: Number(item.discount || item.discount_value || 0),
            min_purchase: Number(item.min_purchase || item.min_order || 0),
            max_discount: Number(item.max_discount || 0),
            limit: Number(item.limit || item.usage_limit || 0),
            order_count: Number(item.order_count || item.times_used || 0),
            start_date: item.start_date ? String(item.start_date).split('T')[0] : '',
            expire_date: expDate,
            is_expired: isExp,
            status: statusVal ? 1 : 0,
            customer_id: item.customer_id || '0',
            created_at: item.created_at || ''
          }

          return {
            success: true,
            coupon: mapped
          }
        }
      } catch (e) { }
    }

    // Fallback: search in list
    try {
      const listRes = await this.fetchCoupons(token, { limit: 100, search: String(couponId) })
      const found = listRes.coupons.find(c => String(c.id) === String(couponId) || c.code.toLowerCase() === String(couponId).toLowerCase())
      if (found) {
        return { success: true, coupon: found }
      }
    } catch { }

    return {
      success: false,
      coupon: null,
      message: 'تعذر العثور على بيانات الكوبون'
    }
  },

  /**
   * Create New Coupon
   * Target endpoint: POST /api/v1/admin/coupons/store
   */
  async createCoupon(
    token: string,
    payload: AdminCouponPayload
  ): Promise<{ success: boolean; message: string; errors?: Record<string, string[]>; data?: any }> {
    const candidateEndpoints = [
      `${API_BASE_URL}/admin/coupons/store`,
      `${API_BASE_URL}/admin/coupon/store`
    ]

    const bodyData = {
      coupon_type: payload.coupon_type || 'discount_on_purchase',
      title: payload.title,
      code: String(payload.code).trim().toUpperCase(),
      start_date: payload.start_date,
      expire_date: payload.expire_date,
      discount_type: payload.discount_type || 'percent',
      discount: Number(payload.discount || 0),
      min_purchase: Number(payload.min_purchase || 0),
      max_discount: Number(payload.max_discount || 0),
      limit: Number(payload.limit || 0),
      status: payload.status ? 1 : 0,
      customer_id: payload.customer_id || '0'
    }

    let parsedResult = { message: 'فشل في إضافة الكوبون', errors: {} }

    for (const ep of candidateEndpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: buildHeaders(token, true),
          body: JSON.stringify(bodyData)
        })

        const json = await res.json().catch(() => ({}))
        console.log(`[adminCouponsApiService] createCoupon (${ep}) status:`, res.status, json)

        if ((res.status === 200 || res.status === 201 || res.ok) && (json.success !== false)) {
          return {
            success: true,
            message: json.message || 'تمت إضافة الكوبون بنجاح!',
            data: json.data || json.coupon
          }
        }

        parsedResult = parseServerApiError(json, res.status, 'فشل في إضافة الكوبون')

        // If it's a 403 or validation error, don't try fallback, return immediately
        if (res.status === 403 || res.status === 422 || parsedResult.errors.code) {
          return {
            success: false,
            message: parsedResult.message,
            errors: parsedResult.errors
          }
        }
      } catch (err: any) {
        console.error(`[adminCouponsApiService] createCoupon (${ep}) error:`, err)
        parsedResult.message = err.message || parsedResult.message
      }
    }

    return {
      success: false,
      message: parsedResult.message,
      errors: parsedResult.errors
    }
  },

  /**
   * Update Existing Coupon
   * Target endpoint: PUT or POST /api/v1/admin/coupons/update/{id}
   */
  async updateCoupon(
    token: string,
    couponId: string | number,
    payload: AdminCouponPayload
  ): Promise<{ success: boolean; message: string; errors?: Record<string, string[]>; data?: any }> {
    const candidateEndpoints = [
      { url: `${API_BASE_URL}/admin/coupons/update/${couponId}`, method: 'PUT' },
      { url: `${API_BASE_URL}/admin/coupons/update/${couponId}`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/coupon/update/${couponId}`, method: 'PUT' },
      { url: `${API_BASE_URL}/admin/coupon/update/${couponId}`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/coupons/store`, method: 'POST' }
    ]

    const bodyData = {
      id: couponId,
      coupon_id: couponId,
      coupon_type: payload.coupon_type || 'discount_on_purchase',
      title: payload.title,
      code: String(payload.code).trim().toUpperCase(),
      start_date: payload.start_date,
      expire_date: payload.expire_date,
      discount_type: payload.discount_type || 'percent',
      discount: Number(payload.discount || 0),
      min_purchase: Number(payload.min_purchase || 0),
      max_discount: Number(payload.max_discount || 0),
      limit: Number(payload.limit || 0),
      status: payload.status ? 1 : 0,
      customer_id: payload.customer_id || '0'
    }

    let parsedResult = { message: 'فشل في تحديث الكوبون', errors: {} }

    for (const ep of candidateEndpoints) {
      try {
        const res = await fetch(ep.url, {
          method: ep.method,
          headers: buildHeaders(token, true),
          body: JSON.stringify(bodyData)
        })

        const json = await res.json().catch(() => ({}))
        console.log(`[adminCouponsApiService] updateCoupon (${ep.method} ${ep.url}) status:`, res.status, json)

        if ((res.status === 200 || res.status === 201 || res.ok) && (json.success !== false)) {
          return {
            success: true,
            message: json.message || 'تم تحديث الكوبون بنجاح!',
            data: json.data || json.coupon
          }
        }

        parsedResult = parseServerApiError(json, res.status, 'فشل في تحديث الكوبون')

        if (res.status === 403 || res.status === 422 || parsedResult.errors.code) {
          return {
            success: false,
            message: parsedResult.message,
            errors: parsedResult.errors
          }
        }
      } catch (err: any) {
        console.error(`[adminCouponsApiService] updateCoupon (${ep.method} ${ep.url}) error:`, err)
        parsedResult.message = err.message || parsedResult.message
      }
    }

    return {
      success: false,
      message: parsedResult.message,
      errors: parsedResult.errors
    }
  },

  /**
   * Toggle Coupon Status (Active / Inactive)
   * POST /api/v1/admin/coupons/status-update
   */
  async toggleCouponStatus(
    token: string,
    couponId: string | number,
    status: number | boolean
  ): Promise<{ success: boolean; message: string }> {
    const candidateEndpoints = [
      `${API_BASE_URL}/admin/coupons/status-update`,
      `${API_BASE_URL}/admin/coupon/status-update`,
      `${API_BASE_URL}/admin/coupon/status`
    ]

    const statusVal = status ? 1 : 0
    const bodyData = {
      id: couponId,
      coupon_id: couponId,
      status: statusVal,
      is_active: statusVal
    }

    for (const ep of candidateEndpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: buildHeaders(token, true),
          body: JSON.stringify(bodyData)
        })

        if (res.ok) {
          const json = await res.json().catch(() => ({}))
          return {
            success: true,
            message: json.message || 'تم تغيير حالة الكوبون بنجاح!'
          }
        }
      } catch (e) { }
    }

    return {
      success: false,
      message: 'فشل في تحديث حالة الكوبون'
    }
  },

  /**
   * Delete Coupon
   * DELETE /api/v1/admin/coupons/delete/{id}
   */
  async deleteCoupon(
    token: string,
    couponId: string | number
  ): Promise<{ success: boolean; message: string }> {
    const candidateEndpoints = [
      { url: `${API_BASE_URL}/admin/coupons/delete/${couponId}`, method: 'DELETE' },
      { url: `${API_BASE_URL}/admin/coupons/delete/${couponId}`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/coupon/delete/${couponId}`, method: 'DELETE' }
    ]

    for (const ep of candidateEndpoints) {
      try {
        const res = await fetch(ep.url, {
          method: ep.method,
          headers: buildHeaders(token, true),
          body: JSON.stringify({ id: couponId })
        })

        if (res.ok) {
          const json = await res.json().catch(() => ({}))
          return {
            success: true,
            message: json.message || 'تم حذف الكوبون بنجاح!'
          }
        }
      } catch (e) { }
    }

    return {
      success: false,
      message: 'فشل في حذف الكوبون'
    }
  }
}
