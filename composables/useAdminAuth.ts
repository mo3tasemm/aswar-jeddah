/**
 * Dedicated Admin Authentication Composable
 * Manages admin_token cookie & state separately from regular customer session tokens.
 */
import { ref, computed, onMounted } from 'vue'
import { adminAuthApiService } from '~/services/adminAuthApiService'
import { useToast } from '~/composables/useToast'

export const useAdminAuth = () => {
  const adminCookie = useCookie<string | null>('admin_token', { maxAge: 60 * 60 * 24 * 30 })
  const adminState = useState<string | null>('admin_token_state', () => null)
  const adminUser = useState<any | null>('admin_user_state', () => null)
  const toast = useToast()

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
          adminUser.value = JSON.parse(savedUser)
        } catch {}
      }
    }
  }

  onMounted(() => {
    initializeAdminAuth()
  })

  const setAdminAuth = (token: string, adminData?: any) => {
    adminState.value = token
    adminCookie.value = token

    if (process.client) {
      localStorage.setItem('admin_token', token)
      if (adminData) {
        adminUser.value = adminData
        localStorage.setItem('admin_user', JSON.stringify(adminData))
      }
    }
  }

  const logoutAdmin = async () => {
    const currentToken = adminState.value || adminCookie.value
    if (currentToken) {
      await adminAuthApiService.logout(currentToken)
    }

    adminState.value = null
    adminCookie.value = null
    adminUser.value = null

    if (process.client) {
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_user')
    }

    toast.info('تسجيل خروج المسند', 'تم خروج مسؤول النظام بنجاح.')
    return navigateTo('/admin/login')
  }

  const isAdminLoggedIn = computed(() => {
    return Boolean(adminState.value || adminCookie.value)
  })

  return {
    adminToken: adminState,
    adminUser,
    isAdminLoggedIn,
    setAdminAuth,
    logoutAdmin,
    initializeAdminAuth
  }
}
