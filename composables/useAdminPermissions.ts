import { computed } from 'vue'
import { useAdminAuth } from '~/composables/useAdminAuth'

/**
 * Route to Module Permission Keys Mapping
 * Maps clean admin route prefixes to candidate permission module keys.
 */
export const ROUTE_PERMISSION_MAP: Record<string, string[]> = {
  '/admin/analytics': ['report_management', 'analytics', 'reports'],
  '/admin/products': ['product_management', 'products'],
  '/admin/categories': ['category_management', 'categories'],
  '/admin/brands': ['brand_management', 'brands'],
  '/admin/attributes': ['attributes_management', 'attributes', 'colors'],
  '/admin/colors': ['attributes_management', 'attributes', 'colors'],
  '/admin/orders': ['order_management', 'orders'],
  '/admin/customers': ['customer_management', 'customers'],
  '/admin/coupons': ['coupon_management', 'coupons'],
  '/admin/staff': ['employee_management', 'employees', 'staff', 'admin_management', 'custom_role', 'roles'],
  '/admin/admins': ['employee_management', 'employees', 'staff', 'admin_management', 'custom_role', 'roles'],
  '/admin/roles': ['employee_management', 'employees', 'staff', 'admin_management', 'custom_role', 'roles'],
  '/admin/custom-role': ['employee_management', 'employees', 'staff', 'admin_management', 'custom_role', 'roles'],
  '/admin/settings': ['system_settings', 'settings', 'business_settings'],
  '/admin/storefront': ['system_settings', 'settings', 'storefront'],
  '/admin/navbar': ['system_settings', 'settings', 'storefront', 'navbar'],
  '/admin/about-us': ['system_settings', 'settings', 'storefront', 'about_us'],
  '/admin/return-policy': ['system_settings', 'settings', 'storefront', 'return_policy'],
  '/admin/privacy-policy': ['system_settings', 'settings', 'storefront', 'privacy_policy'],
  '/admin/contact-messages': ['system_settings', 'settings', 'support_tickets', 'contact_messages', 'messages'],
  '/admin/contact-settings': ['system_settings', 'settings', 'business_settings', 'contact_settings']
}

export const useAdminPermissions = () => {
  const { adminUser } = useAdminAuth()

  /**
   * Check if current user is Super Admin
   * Unconditionally grants full access to wedgetstore@gmail.com and admin_role_id 1
   */
  const isSuperAdmin = computed<boolean>(() => {
    const user = adminUser.value
    if (!user) return false

    const email = String(user.email || '').trim().toLowerCase()
    if (email === 'wedgetstore@gmail.com') return true

    // Check super admin indicators
    if (user.admin_role_id === 1 || user.admin_role_id === '1') return true
    if (user.role_id === 1 || user.role_id === '1') return true
    if (user.id === 1 || user.id === '1') return true
    if (user.role?.id === 1 || user.role?.id === '1') return true
    if (user.admin_role?.id === 1 || user.admin_role?.id === '1') return true
    
    const roleName = String(user.role_name || user.role?.name || user.admin_role?.name || user.role_title || '').toLowerCase()
    if (
      roleName.includes('super') || 
      roleName.includes('مدير النظام') || 
      roleName.includes('المدير العام') ||
      roleName.includes('سوبر') ||
      roleName.includes('super admin') ||
      roleName === 'admin'
    ) return true

    return false
  })

  /**
   * Extract array of allowed module keys from admin user object
   */
  const userModules = computed<string[]>(() => {
    if (isSuperAdmin.value) {
      return ['*']
    }

    const user = adminUser.value
    if (!user) return []

    let rawModules: any = 
      user.modules || 
      user.module_access || 
      user.role?.modules || 
      user.role?.module_access || 
      user.admin_role?.modules || 
      user.admin_role?.module_access || 
      []

    if (typeof rawModules === 'string') {
      try {
        rawModules = JSON.parse(rawModules)
      } catch {
        rawModules = rawModules.split(',').map((s: string) => s.trim()).filter(Boolean)
      }
    }

    if (!Array.isArray(rawModules)) {
      return []
    }

    return rawModules.map((m: any) => String(m).trim().toLowerCase())
  })

  /**
   * Check if admin has access to a specific module
   */
  const hasModulePermission = (moduleKey: string): boolean => {
    if (isSuperAdmin.value) return true
    if (!moduleKey) return true

    const cleanKey = moduleKey.trim().toLowerCase()
    const modules = userModules.value

    return modules.includes('*') || modules.includes(cleanKey)
  }

  /**
   * Check if admin can access a specific route
   */
  const canAccessRoute = (routePath: string): boolean => {
    if (isSuperAdmin.value) return true

    // Remove locale prefix e.g. /en/admin/... -> /admin/...
    let clean = routePath.replace(/^\/(?:en|ar)\//, '/')
    if (!clean.startsWith('/')) clean = '/' + clean

    // Dashboard root is always accessible for any logged in admin
    if (clean === '/admin' || clean === '/admin/') {
      return true
    }

    // Match against route prefixes
    for (const [prefix, requiredKeys] of Object.entries(ROUTE_PERMISSION_MAP)) {
      if (clean === prefix || clean.startsWith(prefix + '/') || clean.startsWith(prefix + '?')) {
        const modules = userModules.value
        // If user has ANY of the required module keys, allow access
        const hasMatch = requiredKeys.some(k => modules.includes(k.toLowerCase()) || modules.includes('*'))
        return hasMatch
      }
    }

    // Default allow if route is not specifically restricted
    return true
  }

  /**
   * Get first allowed route to redirect if root /admin is not allowed or for fallbacks
   */
  const getFirstAllowedRoute = (): string => {
    const navCandidates = [
      '/admin',
      '/admin/products',
      '/admin/orders',
      '/admin/categories',
      '/admin/customers',
      '/admin/coupons',
      '/admin/analytics',
      '/admin/staff',
      '/admin/settings'
    ]

    for (const r of navCandidates) {
      if (canAccessRoute(r)) return r
    }

    return '/admin'
  }

  return {
    isSuperAdmin,
    userModules,
    hasModulePermission,
    canAccessRoute,
    getFirstAllowedRoute
  }
}
