/**
 * Global Route Authentication Middleware
 * Protects private customer routes like /checkout and /my-account/*
 */
export default defineNuxtRouteMiddleware((to) => {
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
    const toast = useToast()
    toast.info('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول للوصول إلى هذه الصفحة.')
    return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
