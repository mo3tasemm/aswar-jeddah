/**
 * Global Authentication Composable for Managing Token, User Profile & Auth Flow
 * Includes robust session cleanup and redirect logic for Logout and Account Deletion.
 */
import { ref, computed, onMounted } from 'vue'
import { authApiService } from '~/services/authApiService'
import { useToast } from '~/composables/useToast'

export interface UserProfile {
  id?: number | string;
  f_name?: string;
  l_name?: string;
  name?: string;
  email?: string;
  phone?: string;
  image?: string;
}

const userState = ref<UserProfile | null>(null)
const tokenState = ref<string | null>(null)
const isAuthInitialized = ref(false)

export const useAuth = () => {
  const cookieToken = useCookie<string | null>('auth_token', { maxAge: 60 * 60 * 24 * 30 })
  const toast = useToast()

  const fetchProfile = async () => {
    const activeToken = tokenState.value || cookieToken.value
    if (!activeToken) return

    try {
      const res = await authApiService.fetchCustomerInfo(activeToken)
      if (res.success && res.user) {
        userState.value = res.user
        if (process.client) {
          localStorage.setItem('user_profile', JSON.stringify(res.user))
        }
      }
    } catch (e) {
      console.warn('[useAuth] fetchProfile Error:', e)
    }
  }

  const initializeAuth = () => {
    if (process.client && !isAuthInitialized.value) {
      const savedToken = cookieToken.value || 
                         localStorage.getItem('auth_token') || 
                         localStorage.getItem('token') ||
                         localStorage.getItem('access_token')
      const savedUser = localStorage.getItem('user_profile')

      if (savedToken) {
        tokenState.value = savedToken
        cookieToken.value = savedToken
      }

      if (savedUser) {
        try {
          userState.value = JSON.parse(savedUser)
        } catch {}
      }

      isAuthInitialized.value = true

      if (savedToken) {
        fetchProfile()
      }
    }
  }

  onMounted(() => {
    initializeAuth()
  })

  const setAuth = (token: string, user?: UserProfile | null) => {
    tokenState.value = token
    cookieToken.value = token

    if (process.client) {
      localStorage.setItem('auth_token', token)
      localStorage.setItem('token', token)
      if (user) {
        userState.value = user
        localStorage.setItem('user_profile', JSON.stringify(user))
      }
    }

    fetchProfile()
  }

  const updateProfile = async (payload: any) => {
    const activeToken = tokenState.value || cookieToken.value
    if (!activeToken) return { success: false, message: 'يرجى تسجيل الدخول أولاً.' }

    try {
      const res = await authApiService.updateProfile(payload, activeToken)
      if (res.success) {
        toast.success('تم تحديث البيانات بنجاح!', res.message)
        await fetchProfile()
      } else {
        toast.error('فشل تحديث البيانات', res.message)
      }
      return res
    } catch (e: any) {
      toast.error('فشل تحديث الملف الشخصي', e?.message)
      return { success: false, message: e?.message }
    }
  }

  /**
   * Account Deletion Handler:
   * Clears all session tokens and user state in finally block to ensure user is redirected to /login regardless of server response
   */
  const deleteAccount = async () => {
    const activeToken = tokenState.value || cookieToken.value

    try {
      if (activeToken) {
        await authApiService.deleteAccount(activeToken)
      }
    } catch (e: any) {
      console.warn('[useAuth] Server deleteAccount error:', e)
    } finally {
      tokenState.value = null
      cookieToken.value = null
      userState.value = null

      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_profile')
        localStorage.removeItem('aswar_wishlist_items')
        localStorage.removeItem('aswar_compare_items')
      }

      toast.success('تم حذف الحساب بنجاح', 'تم حذف الحساب وتصفية البيانات المحلية.')
      return navigateTo('/login')
    }
  }

  /**
   * Complete Logout Handler:
   * Always clears local state and redirects to /login in finally block
   */
  const logout = async () => {
    const currentToken = tokenState.value || 
                         cookieToken.value || 
                         (process.client ? localStorage.getItem('auth_token') || localStorage.getItem('token') : null)

    try {
      if (currentToken) {
        await authApiService.logout(currentToken)
      }
    } catch (e) {
      console.warn('[useAuth] Server logout notification failed:', e)
    } finally {
      tokenState.value = null
      cookieToken.value = null
      userState.value = null

      if (process.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('token')
        localStorage.removeItem('access_token')
        localStorage.removeItem('user_token')
        localStorage.removeItem('user_profile')
      }

      toast.info('تم تسجيل الخروج', 'تم الخروج وتصفية الجلسة بنجاح.')
      return navigateTo('/login')
    }
  }

  const isAuthenticated = computed(() => {
    return Boolean(tokenState.value || cookieToken.value)
  })

  const isLoggedIn = computed(() => {
    return Boolean(tokenState.value || cookieToken.value)
  })

  const userName = computed(() => {
    if (userState.value?.f_name || userState.value?.l_name) {
      return `${userState.value.f_name || ''} ${userState.value.l_name || ''}`.trim()
    }
    return userState.value?.name || 'عميل أسوار جدة'
  })

  const userEmail = computed(() => {
    return userState.value?.email || userState.value?.phone || 'حساب العميل'
  })

  return {
    user: userState,
    token: tokenState,
    isAuthenticated,
    isLoggedIn,
    userName,
    userEmail,
    fetchProfile,
    updateProfile,
    deleteAccount,
    setAuth,
    logout
  }
}
