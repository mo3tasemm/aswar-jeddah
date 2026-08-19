/**
 * Dedicated Admin Authentication Composable
 * Manages admin_token cookie & state separately from regular customer session tokens.
 */
import { ref, computed, onMounted } from 'vue'
import { adminAuthApiService } from '~/services/adminAuthApiService'
import { useToast } from '~/composables/useToast'

export const useAdminAuth = () => {
  const adminCookie = useCookie<string | null>('admin_token', { maxAge: 60 * 60 * 24 * 30 })
  const adminUserCookie = useCookie<any | null>('admin_user', { maxAge: 60 * 60 * 24 * 30 })
  const adminState = useState<string | null>('admin_token_state', () => adminCookie.value || null)
  const adminUser = useState<any | null>('admin_user_state', () => adminUserCookie.value || null)
  const isLoadingProfile = useState<boolean>('admin_is_loading_profile', () => false)
  const toast = useToast()

  /**
   * Normalize admin user object (special rule for Super Admin wedgetstore@gmail.com)
   */
  const normalizeAdminUser = (user: any) => {
    if (!user || typeof user !== 'object') return user
    const email = String(user.email || '').trim().toLowerCase()

    if (email === 'wedgetstore@gmail.com' || user.admin_role_id === 1 || user.admin_role_id === '1') {
      user.admin_role_id = 1
      user.role_id = 1
      if (!user.role_name || user.role_name === 'مشرف') {
        user.role_name = 'مدير عام النظام (Super Admin)'
      }
      user.modules = ['*']
      user.module_access = ['*']
    }
    return user
  }

  /**
   * Fetch fresh admin profile from API to refresh permissions and state
   */
  const fetchAdminProfile = async (force = false): Promise<any> => {
    const currentToken = adminState.value || adminCookie.value || (process.client ? localStorage.getItem('admin_token') : null)
    if (!currentToken) return null

    isLoadingProfile.value = true
    try {
      const res = await adminAuthApiService.getProfile(currentToken)
      if (res.success && res.admin) {
        const normalized = normalizeAdminUser(res.admin)
        adminUser.value = normalized
        adminUserCookie.value = normalized
        if (process.client) {
          localStorage.setItem('admin_user', JSON.stringify(normalized))
        }
        return normalized
      }
    } catch (e) {
      console.warn('[useAdminAuth] fetchAdminProfile error:', e)
    } finally {
      isLoadingProfile.value = false
    }

    return adminUser.value
  }

  const initializeAdminAuth = () => {
    if (process.client) {
      const savedToken = adminCookie.value || localStorage.getItem('admin_token')
      const savedUser = localStorage.getItem('admin_user')

      if (savedToken) {
        adminState.value = savedToken
        adminCookie.value = savedToken
      }

      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser)
          const normalized = normalizeAdminUser(parsed)
          adminUser.value = normalized
          adminUserCookie.value = normalized
        } catch {}
      }

      // Automatically refetch latest profile in background to invalidate stale cached permissions if not yet loaded
      if (savedToken && !adminUser.value) {
        fetchAdminProfile()
      }
    }
  }

  // Safe client-side initialization without lifecycle hook injection issues
  if (process.client && !adminState.value) {
    initializeAdminAuth()
  }

  const setAdminAuth = (token: string, adminData?: any) => {
    adminState.value = token
    adminCookie.value = token

    if (adminData) {
      const normalized = normalizeAdminUser(adminData)
      adminUser.value = normalized
      adminUserCookie.value = normalized
      if (process.client) {
        localStorage.setItem('admin_user', JSON.stringify(normalized))
      }
    }

    if (process.client) {
      localStorage.setItem('admin_token', token)
    }

    // Immediately fetch fresh profile from backend
    fetchAdminProfile(true)
  }

  const logoutAdmin = async () => {
    const currentToken = adminState.value || adminCookie.value
    if (currentToken) {
      await adminAuthApiService.logout(currentToken)
    }

    adminState.value = null
    adminCookie.value = null
    adminUser.value = null
    adminUserCookie.value = null

    if (process.client) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }

    toast.info('تسجيل خروج المشرف', 'تم تسجيل الخروج من لوحة التحكم بنجاح.')
    return navigateTo('/admin/login')
  }

  const isAdminLoggedIn = computed(() => {
    return Boolean(adminState.value || adminCookie.value)
  })

  const getAdminToken = (): string | null => {
    return adminState.value || adminCookie.value || (process.client ? localStorage.getItem('admin_token') : null)
  }

  return {
    adminToken: adminState,
    adminUser,
    isLoadingProfile,
    isAdminLoggedIn,
    getAdminToken,
    setAdminAuth,
    fetchAdminProfile,
    logoutAdmin,
    initializeAdminAuth
  }
}
