/**
 * Global Route Authentication Middleware for Nuxt 3
 * Automatically intercepts direct URL entries (e.g. Incognito mode) and navigation for protected routes:
 * - /checkout
 * - /my-account and all /my-account/* sub-routes
 * Works correctly with locale-prefixed URLs (e.g. /en/checkout, /en/my-account).
 */
import { parseLocalePath, buildLocalePath } from '~/middleware/locale.global'
import type { LanguageCode } from '~/composables/useLanguage'

export default defineNuxtRouteMiddleware((to) => {
  // Strip locale prefix to get the clean path for route matching
  const { locale, cleanPath } = parseLocalePath(to.path)

  const protectedRoutes = ['/checkout', '/my-account']
  const isProtected = protectedRoutes.some(path => cleanPath === path || cleanPath.startsWith(`${path}/`))

  if (!isProtected) return

  const tokenCookie = useCookie('auth_token').value || 
                      useCookie('token').value || 
                      useCookie('access_token').value

  let hasToken = Boolean(tokenCookie)

  if (process.client && !hasToken) {
    const localToken = localStorage.getItem('auth_token') || 
                       localStorage.getItem('token') || 
                       localStorage.getItem('access_token')
    if (localToken) {
      hasToken = true
    }
  }

  if (!hasToken) {
    if (process.client) {
      try {
        const toast = useToast()
        toast.info('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول أولاً للوصول إلى هذه الصفحة.')
      } catch (e) {}
    }
    // Redirect to locale-aware login page
    const loginPath = buildLocalePath(locale as LanguageCode, '/login')
    return navigateTo(`${loginPath}?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
