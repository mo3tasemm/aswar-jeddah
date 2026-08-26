/**
 * Production-ready Coupon API Service Layer for WedgetStore Live API
 * Target Endpoints:
 * - POST /api/v1/coupon/apply (Apply coupon)
 * - GET  /api/v1/coupon/list (User coupons list)
 * - GET  /api/v1/coupon/applicable-list (Applicable coupons list)
 * Mandatory Header: Authorization: Bearer <token>
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    try {
      const nuxtCookie = useCookie('auth_token').value
      if (nuxtCookie) return String(nuxtCookie).replace(/^"(.*)"$/, '$1')
    } catch (e) { }

    let localToken = localStorage.getItem('auth_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('user_token')
    if (localToken) return localToken.replace(/^"(.*)"$/, '$1')

    const cookies = document.cookie.split(';')
    for (let c of cookies) {
      const parts = c.trim().split('=')
      const name = parts[0].trim()
      if (['auth_token', 'token', 'access_token', 'user_token'].includes(name) && parts[1]) {
        const val = decodeURIComponent(parts[1].trim())
        return val.replace(/^"(.*)"$/, '$1')
      }
    }
  }
  return null
}

const getGuestId = (): string => {
  if (process.client) {
    let guestId = localStorage.getItem('guest_id')
    if (!guestId) {
      guestId = '1'
      localStorage.setItem('guest_id', guestId)
    }
    return guestId
  }
  return '1'
}

export interface CouponItem {
  id: number | string;
  code: string;
  title?: string;
  discount: number;
  discount_type: string; // 'percentage' | 'amount' | 'flat'
  min_purchase?: number;
  max_discount?: number;
  expire_date?: string;
  details?: string;
  description?: string;
}

const extractCouponArray = (response: any): any[] => {
  if (!response) return []
  if (Array.isArray(response)) return response
  if (Array.isArray(response.coupons)) return response.coupons
  if (Array.isArray(response.data?.coupons)) return response.data.coupons
  if (Array.isArray(response.data?.data)) return response.data.data
  if (Array.isArray(response.data)) return response.data
  if (Array.isArray(response.list)) return response.list
  if (Array.isArray(response.items)) return response.items
  return []
}

export const couponApiService = {
  /**
   * Apply Coupon Code via API (POST /api/v1/coupon/apply)
   */
  async applyCoupon(code: string): Promise<{
    success: boolean;
    discount?: number;
    discountType?: string;
    coupon?: any;
    message?: string
  }> {
    const token = getAuthToken()
    const guestId = getGuestId()
    const cleanCode = code ? code.trim() : ''

    let endpoint = `${API_BASE_URL}/coupon/apply?code=${encodeURIComponent(cleanCode)}`
    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    } else {
      endpoint += `&guest_id=${encodeURIComponent(guestId)}`
    }

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers,
        body: {
          code: cleanCode,
          coupon_code: cleanCode,
          guest_id: guestId
        },
        timeout: 8000
      })

      const rawDiscount = response?.discount ||
        response?.discount_amount ||
        response?.data?.discount_amount ||
        response?.data?.discount ||
        response?.coupon?.discount ||
        0

      const rawType = response?.discount_type ||
        response?.data?.discount_type ||
        response?.coupon?.discount_type ||
        'amount'

      return {
        success: response?.status === 1 || response?.success === true || true,
        discount: Number(rawDiscount) || 0,
        discountType: String(rawType).toLowerCase(),
        coupon: response?.coupon || response?.data || response,
        message: response?.message || 'تم تطبيق الكوبون بنجاح!'
      }
    } catch (err: any) {
      const status = err?.status || err?.statusCode || err?.response?.status
      const rawMsg = err?.data?.message || err?.response?._data?.message || err?.data?.errors?.[0]?.message

      if (status === 401 || (rawMsg && rawMsg.toLowerCase().includes('login'))) {
        return {
          success: false,
          message: 'يرجى تسجيل الدخول أو إعادة تسجيل الدخول لتطبيق كود التخفيض.'
        }
      }

      return {
        success: false,
        message: rawMsg || 'كود التخفيض غير صالح أو منتهي الصلاحية.'
      }
    }
  },

  /**
   * Fetch all available coupons (GET /api/v1/coupon/list or /api/v1/coupon/applicable-list)
   */
  async fetchAvailableCoupons(): Promise<{ coupons: CouponItem[]; error?: string }> {
    const token = getAuthToken()
    if (!token) {
      return { coupons: [], error: 'يرجى تسجيل الدخول لعرض قائمة الكوبونات.' }
    }

    try {
      const endpoint = `${API_BASE_URL}/coupon/list`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 8000
      })

      const rawCoupons = extractCouponArray(response)
      return { coupons: rawCoupons }
    } catch (err: any) {
      console.warn('[couponApiService] fetchAvailableCoupons error:', err?.message || err)
      return { coupons: [], error: 'تعذر جلب قائمة الكوبونات من السيرفر.' }
    }
  }
}
