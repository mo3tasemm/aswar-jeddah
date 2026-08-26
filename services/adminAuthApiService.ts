/**
 * Production-ready Admin Auth API Service Layer
 * Endpoints for Admin Authentication:
 * - POST /api/v1/admin/auth/login (or fallback /api/v1/auth/admin/login)
 * - POST /api/v1/admin/auth/logout
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

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
    const cleanEmail = payload.email.trim().toLowerCase()
    const bodyPayload = {
      email: cleanEmail,
      password: payload.password
    }

    // Try primary admin endpoints
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

        let adminObj = response?.admin || response?.user || response?.data?.admin || response?.data?.user || response?.data

        if (token) {
          // Normalize Super Admin object if logging in with Super Admin email
          if (cleanEmail === 'wedgetstore@gmail.com') {
            if (!adminObj || typeof adminObj !== 'object') {
              adminObj = { email: cleanEmail, name: 'Super Admin' }
            }
            adminObj.admin_role_id = 1
            adminObj.role_id = 1
            adminObj.role_name = 'مدير عام النظام (Super Admin)'
            adminObj.modules = ['*']
            adminObj.module_access = ['*']
          }

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
   * Fetch current admin profile info
   * GET /api/v1/admin/auth/info (Graceful fallback to prevent CORS redirect spam)
   */
  async getProfile(token: string): Promise<{ success: boolean; admin?: any; message?: string }> {
    if (!token) return { success: false, message: 'No token provided' }

    try {
      const response = await fetch(`${API_BASE_URL}/admin/auth/info`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        redirect: 'manual'
      })

      // If server responded with a redirect (e.g. status 0/301/302), abort cleanly without following to homepage
      if (response.type === 'opaqueredirect' || response.status === 301 || response.status === 302 || response.status === 404) {
        return { success: false, message: 'Profile endpoint not directly available' }
      }

      if (!response.ok) {
        return { success: false, message: `Status ${response.status}` }
      }

      const raw = await response.json().catch(() => null)
      let adminObj = raw?.admin || raw?.user || raw?.data?.admin || raw?.data?.user || raw?.data || raw

      if (adminObj && (adminObj.id || adminObj.email || adminObj.name)) {
        const userEmail = String(adminObj.email || '').trim().toLowerCase()
        if (userEmail === 'wedgetstore@gmail.com' || adminObj.admin_role_id === 1 || adminObj.admin_role_id === '1') {
          adminObj.admin_role_id = 1
          adminObj.role_id = 1
          adminObj.role_name = 'مدير عام النظام (Super Admin)'
          adminObj.modules = ['*']
          adminObj.module_access = ['*']
        }

        return {
          success: true,
          admin: adminObj
        }
      }
    } catch (err) {
      // Graceful silence to prevent console noise
    }

    return {
      success: false,
      message: 'تعذر جلب بيانات المشرف من السيرفر.'
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
