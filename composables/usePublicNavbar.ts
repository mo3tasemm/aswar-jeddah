/**
 * Public Navbar Composable (usePublicNavbar)
 * Loads dynamic navbar items configured from /admin/navbar and translates titles with fallback.
 */
import { ref, computed } from 'vue'
import { adminNavbarApiService, type NavbarItem } from '~/services/adminNavbarApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useLanguage } from '~/composables/useLanguage'

export interface NavItemDisplay {
  id: string | number
  name: string
  url: string
  target: string
  badge?: string
  badge_color?: string
  icon?: string
  children?: NavItemDisplay[]
}

const rawNavItems = ref<NavbarItem[]>([])
const isNavLoading = ref<boolean>(false)
const hasLoadedNav = ref<boolean>(false)

export const usePublicNavbar = () => {
  const { currentLanguage, t } = useLanguage()
  const { adminToken, adminCookie } = useAdminAuth()

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  const fetchPublicNavbar = async (forceRefresh = false) => {
    if (hasLoadedNav.value && !forceRefresh && rawNavItems.value.length > 0) {
      return rawNavItems.value
    }

    isNavLoading.value = true
    try {
      const token = getToken()
      const res = await adminNavbarApiService.fetchNavbarItems(token)
      if (res.success && Array.isArray(res.data) && res.data.length > 0) {
        rawNavItems.value = res.data
        hasLoadedNav.value = true
      }
    } catch (err) {
      console.warn('[usePublicNavbar] Failed to load public navbar:', err)
    } finally {
      isNavLoading.value = false
    }

    return rawNavItems.value
  }

  // Active items hierarchy
  const dynamicNavItems = computed<NavItemDisplay[]>(() => {
    const list = rawNavItems.value.filter(item => item.is_active === 1 || item.is_active === true)
    if (!list || list.length === 0) return []

    // Sort by sort_order
    list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))

    const isEn = currentLanguage?.value === 'en'

    const formatItem = (item: NavbarItem): NavItemDisplay => ({
      id: item.id,
      name: isEn ? (item.title_en || item.title_ar || item.title) : (item.title_ar || item.title || item.title_en),
      url: item.url || '/',
      target: item.target || '_self',
      badge: item.badge,
      badge_color: item.badge_color,
      icon: item.icon,
      children: []
    })

    // If items already have nested children
    const hasPreNested = list.some(item => Array.isArray(item.children) && item.children.length > 0)
    if (hasPreNested) {
      return list
        .filter(item => !item.parent_id || item.parent_id === 0 || item.parent_id === '0')
        .map(parent => {
          const formatted = formatItem(parent)
          if (Array.isArray(parent.children) && parent.children.length > 0) {
            formatted.children = parent.children
              .filter(c => c.is_active === 1 || c.is_active === true)
              .map(formatItem)
          }
          return formatted
        })
    }

    // Build hierarchy from flat list
    const itemMap = new Map<string | number, NavItemDisplay>()
    list.forEach(item => {
      itemMap.set(item.id, formatItem(item))
    })

    const rootItems: NavItemDisplay[] = []

    list.forEach(item => {
      const current = itemMap.get(item.id)!
      if (item.parent_id && itemMap.has(item.parent_id)) {
        const parent = itemMap.get(item.parent_id)!
        if (!parent.children) parent.children = []
        parent.children.push(current)
      } else {
        rootItems.push(current)
      }
    })

    return rootItems
  })

  // Default fallback links if database navbar is empty
  const defaultFallbackLinks = computed<NavItemDisplay[]>(() => [
    { id: 'app-1', name: t('cat.appliances'), url: '/category/appliances', target: '_self' },
    { id: 'app-2', name: t('cat.houseware'), url: '/category/houseware', target: '_self' },
    { id: 'app-3', name: t('cat.security'), url: '/category/security', target: '_self' },
    { id: 'app-4', name: t('cat.laptops'), url: '/category/laptops', target: '_self' },
    { id: 'app-5', name: t('cat.networks'), url: '/category/networks', target: '_self' },
    { id: 'app-6', name: t('cat.pos'), url: '/category/pos', target: '_self' },
    { id: 'app-7', name: t('cat.mobile'), url: '/category/mobile', target: '_self' },
    { id: 'app-8', name: t('cat.scooter'), url: '/category/scooter', target: '_self' },
    { id: 'app-9', name: `${t('cat.blog')} 📝`, url: '/blog', target: '_self' },
  ])

  // Final resolved navbar items (dynamic first, fallback second)
  const navItems = computed<NavItemDisplay[]>(() => {
    if (dynamicNavItems.value.length > 0) {
      return dynamicNavItems.value
    }
    return defaultFallbackLinks.value
  })

  return {
    rawNavItems,
    isNavLoading,
    fetchPublicNavbar,
    dynamicNavItems,
    navItems
  }
}
