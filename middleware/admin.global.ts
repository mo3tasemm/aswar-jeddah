/**
 * Global Admin Route Protection Middleware for Nuxt 3
 * Restricts access to /admin and all /admin/* sub-routes (except /admin/login) to authenticated admins holding an admin_token.
 */
export default defineNuxtRouteMiddleware((to) => {
  const isAdminLoginPage = to.path === '/admin/login'
  const isAdminRoute = (to.path === '/admin' || to.path.startsWith('/admin/')) && !isAdminLoginPage

  const adminTokenCookie = useCookie('admin_token').value
  let hasAdminToken = Boolean(adminTokenCookie)

  if (process.client && !hasAdminToken) {
    const localToken = localStorage.getItem('admin_token')
    if (localToken) {
      hasAdminToken = true
    }
  }

  // 1. If admin is already logged in and attempts to open /admin/login
  if (isAdminLoginPage && hasAdminToken) {
    return navigateTo('/admin')
  }

  // 2. If guest/customer attempts to open any protected admin page without admin_token
  if (isAdminRoute && !hasAdminToken) {
    if (process.client) {
      try {
        const toast = useToast()
        toast.info('دخول المسؤولين فقط', 'يرجى تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم.')
      } catch (e) {}
    }
    return navigateTo(`/admin/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
})
