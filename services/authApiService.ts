/**
 * Production-ready Auth API Service Layer for WedgetStore Live API
 * Endpoints:
 * - POST   https:/ai-agunt.elbakry2.com/api/v1/auth/login
 * - POST   https:/ai-agunt.elbakry2.com/api/v1/auth/register
 * - GET    https:/ai-agunt.elbakry2.com/api/v1/auth/logout (Authorization: Bearer <token>)
 * - GET    https:/ai-agunt.elbakry2.com/api/v1/customer/info (Authorization: Bearer <token>)
 * - POST   https:/ai-agunt.elbakry2.com/api/v1/customer/update-profile (_method: 'PUT', Authorization: Bearer <token>)
 * - DELETE https:/ai-agunt.elbakry2.com/api/v1/customer/account-delete (Authorization: Bearer <token>)
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

export interface LoginPayload {
  email_or_phone: string;
  password: string;
  type?: string;
}

export interface RegisterPayload {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  password: string;
  type?: string;
}

export interface AuthResponse {
  token?: string;
  access_token?: string;
  user?: any;
  customer?: any;
  data?: any;
  status?: number;
  message?: string;
  errors?: any[];
}

export const authApiService = {
  /**
   * Send Login Request with Clean Body & Dynamic Type ('manual' / 'email' / 'phone')
   */
  async login(payload: LoginPayload): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
    const inputVal = payload.email_or_phone ? payload.email_or_phone.trim() : ''
    const isEmail = inputVal.includes('@')
    const loginType = payload.type || (isEmail ? 'email' : 'manual')

    const bodyPayload: Record<string, any> = {
      email_or_phone: inputVal,
      password: payload.password,
      type: loginType
    }

    try {
      const endpoint = `${API_BASE_URL}/auth/login`
      const response = await $fetch<AuthResponse>(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: bodyPayload,
        timeout: 10000
      })

      const token = response?.token ||
        response?.access_token ||
        response?.data?.token ||
        response?.data?.access_token ||
        response?.user?.token

      const user = response?.user || response?.customer || response?.data?.user || response?.data?.customer || null

      if (token) {
        return {
          success: true,
          token,
          user,
          message: response?.message || 'تم تسجيل الدخول بنجاح.'
        }
      }

      return {
        success: false,
        message: response?.message || 'فشل تسجيل الدخول. يرجى التأكد من البيانات المدخلة.'
      }
    } catch (err: any) {
      console.error('[authApiService] Login Error:', err?.data || err?.message || err)
      return {
        success: false,
        message: err?.data?.message || err?.data?.errors?.[0]?.message || 'خطأ في الاتصال بالخادم.'
      }
    }
  },

  /**
   * Send Register Request
   */
  async register(payload: RegisterPayload): Promise<{ success: boolean; token?: string; user?: any; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/auth/register`
      const response = await $fetch<AuthResponse>(endpoint, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: payload,
        timeout: 10000
      })

      const token = response?.token || response?.access_token || response?.data?.token
      const user = response?.user || response?.customer || response?.data?.user

      if (token) {
        return {
          success: true,
          token,
          user,
          message: response?.message || 'تم إنشاء الحساب بنجاح.'
        }
      }

      return {
        success: false,
        message: response?.message || 'فشل إنشاء الحساب.'
      }
    } catch (err: any) {
      console.error('[authApiService] Register Error:', err)
      return {
        success: false,
        message: err?.data?.message || 'فشل إنشاء الحساب. يرجى التأكد من البيانات.'
      }
    }
  },

  /**
   * Fetch Customer Info (GET /api/v1/customer/info with Bearer Token)
   */
  async fetchCustomerInfo(token: string): Promise<{ success: boolean; user?: any }> {
    try {
      const endpoint = `${API_BASE_URL}/customer/info`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 8000
      })

      const user = response?.user || response?.customer || response?.data || response
      return { success: true, user }
    } catch (err: any) {
      console.warn('[authApiService] fetchCustomerInfo Error:', err?.data || err?.message || err)
      return { success: false }
    }
  },

  /**
   * Update Profile via POST + Laravel Method Spoofing (_method: 'PUT') for 100% Multipart FormData & Image Upload Compatibility
   */
  async updateProfile(payload: any, token: string): Promise<{ success: boolean; user?: any; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/customer/update-profile`
      let bodyData: any

      if (typeof FormData !== 'undefined' && payload instanceof FormData) {
        bodyData = payload
        if (!bodyData.has('_method')) {
          bodyData.append('_method', 'PUT')
        }
      } else {
        const fd = new FormData()
        fd.append('_method', 'PUT')
        if (payload) {
          Object.keys(payload).forEach(key => {
            if (payload[key] !== undefined && payload[key] !== null) {
              fd.append(key, payload[key])
            }
          })
        }
        bodyData = fd
      }

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: bodyData,
        timeout: 12000
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
        user: response?.user || response?.customer || response?.data || null,
        message: response?.message || 'تم تحديث الملف الشخصي بنجاح.'
      }
    } catch (err: any) {
      console.error('[authApiService] updateProfile Error:', err)
      return {
        success: false,
        message: err?.data?.message || err?.data?.errors?.[0]?.message || 'فشل تحديث البيانات.'
      }
    }
  },

  /**
   * Delete Customer Account (DELETE /api/v1/customer/account-delete)
   */
  async deleteAccount(token: string): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/customer/account-delete`
      const response = await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 10000
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
        message: response?.message || 'تم حذف الحساب نهائياً.'
      }
    } catch (err: any) {
      console.error('[authApiService] deleteAccount Error:', err)
      return {
        success: false,
        message: err?.data?.message || 'فشل حذف الحساب.'
      }
    }
  },

  /**
   * Send Logout Request (GET /api/v1/auth/logout with Bearer Token)
   */
  async logout(token?: string | null): Promise<{ success: boolean; message?: string }> {
    if (!token) {
      return { success: true, message: 'تم تسجيل الخروج بنجاح.' }
    }

    try {
      const endpoint = `${API_BASE_URL}/auth/logout`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 6000
      })

      return {
        success: true,
        message: response?.message || 'تم تسجيل الخروج بنجاح.'
      }
    } catch (err: any) {
      return {
        success: true,
        message: 'تم تسجيل الخروج محلياً.'
      }
    }
  }
}
