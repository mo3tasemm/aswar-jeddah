/**
 * Global Admin Route Protection & Permissions Middleware for Nuxt 3
 * 1. Restricts access to /admin and all /admin/* sub-routes (except /admin/login) to authenticated admins holding an admin_token.
 * 2. Strict Role-Based Access Control (RBAC): Blocks unauthorized admins from visiting routes outside their module permissions.
 * Works seamlessly with locale-prefixed routes (e.g., /en/admin/products, /admin/products).
 */

import { parseLocalePath, buildLocalePath } from '~/middleware/locale.global'
import type { LanguageCode } from '~/composables/useLanguage'
import { useAdminPermissions } from '~/composables/useAdminPermissions'

export default defineNuxtRouteMiddleware((to) => {
  const { locale, cleanPath } = parseLocalePath(to.path)

  const isAdminLoginPage = cleanPath === '/admin/login'
  const isAdminRoute = (cleanPath === '/admin' || cleanPath.startsWith('/admin/')) && !isAdminLoginPage

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
    const adminPath = buildLocalePath(locale as LanguageCode, '/admin')
    return navigateTo(adminPath)
  }

  // 2. If guest/customer attempts to open any protected admin page without admin_token
  if (isAdminRoute && !hasAdminToken) {
    if (process.client) {
      try {
        const toast = useToast()
        toast.info('دخول المسؤولين فقط', 'يرجى تسجيل الدخول كمسؤول للوصول إلى لوحة التحكم.')
      } catch (e) {}
    }
    const loginPath = buildLocalePath(locale as LanguageCode, '/admin/login')
    return navigateTo(`${loginPath}?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // 3. Strict Permission Guard for logged-in admins accessing sub-sections
  if (isAdminRoute && hasAdminToken && cleanPath !== '/admin') {
    const { canAccessRoute, getFirstAllowedRoute } = useAdminPermissions()
    const allowed = canAccessRoute(cleanPath)

    if (!allowed) {
      if (process.client) {
        try {
          const toast = useToast()
          toast.warning('غير مصرح لك', 'عذراً، لا تملك الصلاحية للوصول إلى هذا القسم.')
        } catch (e) {}
      }

      const fallbackRoute = getFirstAllowedRoute()
      const safePath = buildLocalePath(locale as LanguageCode, fallbackRoute)
      return navigateTo(safePath)
    }
  }
})
