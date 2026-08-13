/**
 * Production-ready Admin Auth API Service Layer
 * Endpoints for Admin Authentication:
 * - POST /api/v1/admin/auth/login (or fallback /api/v1/auth/admin/login)
 * - POST /api/v1/admin/auth/logout
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

export interface AdminLoginPayload {
  email: string;
  password: string;
}

export interface AdminAuthResponse {
  token?: string;
  access_token?: string;
  admin?: any;
  user?: any;
  data?: any;
  status?: number;
  message?: string;
  errors?: any[];
}

export const adminAuthApiService = {
  /**
   * Send Admin Login Request
   */
  async login(payload: AdminLoginPayload): Promise<{ success: boolean; token?: string; admin?: any; message?: string }> {
    const bodyPayload = {
      email: payload.email.trim(),
      password: payload.password
    }

    // Try primary admin endpoint
    const endpoints = [
      `${API_BASE_URL}/admin/auth/login`,
      `${API_BASE_URL}/auth/admin/login`,
      `${API_BASE_URL}/admin/login`
    ]

    let lastErrorMsg = 'بيانات الاعتماد غير صحيحة.'

    for (const endpoint of endpoints) {
      try {
        const response = await $fetch<AdminAuthResponse>(endpoint, {
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
                      response?.data?.access_token

        const adminObj = response?.admin || response?.user || response?.data?.admin || response?.data?.user

        if (token) {
          return {
            success: true,
            token,
            admin: adminObj,
            message: response?.message || 'تم تسجيل الدخول بنجاح'
          }
        }
      } catch (err: any) {
        lastErrorMsg = err?.data?.message || err?.message || 'فشل الاتصال بسيرفر الآدمن.'
      }
    }

    return {
      success: false,
      message: lastErrorMsg
    }
  },

  /**
   * Admin Logout Request
   */
  async logout(token: string): Promise<boolean> {
    try {
      await $fetch(`${API_BASE_URL}/admin/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      })
      return true
    } catch {
      return false
    }
  }
}
