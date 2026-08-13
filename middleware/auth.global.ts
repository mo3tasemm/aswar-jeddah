/**
 * Global Route Authentication Middleware for Nuxt 3
 * Automatically intercepts direct URL entries (e.g. Incognito mode) and navigation for protected routes:
 * - /checkout
 * - /my-account and all /my-account/* sub-routes
 */
export default defineNuxtRouteMiddleware((to) => {
  const protectedRoutes = ['/checkout', '/my-account']
  const isProtected = protectedRoutes.some(path => to.path === path || to.path.startsWith(`${path}/`))

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
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
