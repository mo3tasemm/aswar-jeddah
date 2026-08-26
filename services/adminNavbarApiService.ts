/**
 * Admin Navbar & Navigation Menus API Service
 * Handles CRUD and Reordering for /api/v1/admin/navbar
 */

export interface NavbarItem {
  id: number | string
  title: string
  title_ar?: string
  title_en?: string
  name?: string
  name_ar?: string
  name_en?: string
  type: 'link' | 'dropdown' | 'category' | 'brand' | 'page' | string
  url: string
  target: '_self' | '_blank' | string
  parent_id?: number | string | null
  badge?: string
  badge_color?: string
  icon?: string
  is_active: boolean | number
  sort_order: number
  children?: NavbarItem[]
  childes?: NavbarItem[]
  sub_items?: NavbarItem[]
  [key: string]: any
}

export interface NavbarItemPayload {
  title: string
  title_ar?: string
  title_en?: string
  type: string
  url: string
  target?: string
  parent_id?: number | string | null
  badge?: string
  badge_color?: string
  icon?: string
  is_active?: boolean | number
  sort_order?: number
}

import { API_BASE_URL } from '~/services/apiConfig'

const extractMultiLangTitle = (item: any): { ar: string; en: string } => {
  let ar = item.title_ar || item.name_ar || ''
  let en = item.title_en || item.name_en || ''

  if (Array.isArray(item.translations) && item.translations.length > 0) {
    item.translations.forEach((t: any) => {
      const locale = (t.locale || '').toLowerCase()
      const key = (t.key || '').toLowerCase()
      if (!key || key === 'title' || key === 'name') {
        const val = (t.value || t.title || t.name || '').trim()
        if (locale === 'ar' && !ar) ar = val
        if (locale === 'en' && !en) en = val
      }
    })
  }

  const rawTitle = typeof item.title === 'string' ? item.title.trim() : (typeof item.name === 'string' ? item.name.trim() : '')
  if (rawTitle) {
    if (/[\u0600-\u06FF]/.test(rawTitle)) {
      if (!ar) ar = rawTitle
    } else {
      if (!en) en = rawTitle
    }
  }

  if (!ar && rawTitle) ar = rawTitle
  if (!en) en = ar || 'Menu Item'

  return { ar, en }
}

const normalizeNavbarItem = (item: any, idx: number = 0): NavbarItem => {
  const lang = extractMultiLangTitle(item)
  const isAct = item.is_active !== undefined
    ? (item.is_active === 1 || item.is_active === true || item.is_active === '1')
    : (item.status === 1 || item.status === true || item.status === '1' || item.status === undefined)

  const rawSubs = item.children || item.childes || item.sub_items || []
  const mappedSubs: NavbarItem[] = Array.isArray(rawSubs)
    ? rawSubs.map((sub: any, sIdx: number) => normalizeNavbarItem(sub, sIdx))
    : []

  return {
    id: item.id !== undefined && item.id !== null ? item.id : `nav-${idx + 1}`,
    title: lang.ar || item.title || item.name || 'عنصر قائمة',
    title_ar: lang.ar || item.title_ar || item.name_ar || item.title || '',
    title_en: lang.en || item.title_en || item.name_en || item.title || '',
    type: item.type || 'link',
    url: item.url || item.link || '/',
    target: item.target === '_blank' ? '_blank' : '_self',
    parent_id: (item.parent_id !== undefined && item.parent_id !== null && item.parent_id !== 0 && item.parent_id !== '0')
      ? item.parent_id
      : null,
    badge: item.badge || item.badge_text || '',
    badge_color: item.badge_color || item.badgeColor || '',
    icon: item.icon || '',
    is_active: isAct ? 1 : 0,
    sort_order: item.sort_order !== undefined ? Number(item.sort_order) : (item.order !== undefined ? Number(item.order) : idx + 1),
    children: mappedSubs,
    childes: mappedSubs
  }
}

export const adminNavbarApiService = {
  /**
   * 1. GET Admin Navbar items list (Tree or Flat)
   */
  async fetchNavbarItems(token: string): Promise<{ success: boolean; data: NavbarItem[]; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/navbar?_t=${Date.now()}`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Accept-Language': 'ar',
          'X-Requested-With': 'XMLHttpRequest'
        },
        retry: 1,
        timeout: 10000
      })

      let rawList: any[] = []
      if (Array.isArray(response)) {
        rawList = response
      } else if (response && typeof response === 'object') {
        rawList = response.data || response.items || response.navbar || response.list || []
      }

      const formatted: NavbarItem[] = rawList.map((item, idx) => normalizeNavbarItem(item, idx))

      return {
        success: true,
        data: formatted
      }
    } catch (err: any) {
      console.warn('[adminNavbarApiService] fetchNavbarItems fallback or error:', err)
      return {
        success: false,
        data: [],
        message: err.data?.message || err.message || 'تعذر جلب عناصر الناف بار من الخادم'
      }
    }
  },

  /**
   * 2. POST Create new Navbar Item
   */
  async createNavbarItem(token: string, payload: NavbarItemPayload): Promise<{ success: boolean; data?: NavbarItem; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/navbar`
      const arTitle = (payload.title_ar || payload.title || '').trim()
      const enTitle = (payload.title_en || payload.title || payload.title_ar || '').trim()

      const body = {
        title: arTitle || enTitle,
        title_ar: arTitle,
        title_en: enTitle,
        name: arTitle || enTitle,
        name_ar: arTitle,
        name_en: enTitle,
        translations: [
          { locale: 'ar', key: 'title', value: arTitle },
          { locale: 'en', key: 'title', value: enTitle },
          { locale: 'ar', key: 'name', value: arTitle },
          { locale: 'en', key: 'name', value: enTitle }
        ],
        type: payload.type || 'link',
        url: payload.url || '/',
        target: payload.target || '_self',
        parent_id: payload.parent_id ? Number(payload.parent_id) : null,
        badge: payload.badge || null,
        badge_color: payload.badge_color || null,
        icon: payload.icon || null,
        is_active: payload.is_active ? 1 : 0,
        sort_order: payload.sort_order || 1
      }

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body
      })

      const raw = response?.data || response?.item || response || body
      return {
        success: true,
        data: normalizeNavbarItem(raw),
        message: response?.message || 'تمت إضافة عنصر القائمة بنجاح'
      }
    } catch (err: any) {
      console.error('[adminNavbarApiService] createNavbarItem error:', err)
      throw err
    }
  },

  /**
   * 3. PUT Update Navbar Item
   */
  async updateNavbarItem(token: string, id: number | string, payload: Partial<NavbarItemPayload>): Promise<{ success: boolean; data?: NavbarItem; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/navbar/${id}`
      const arTitle = (payload.title_ar || payload.title || '').trim()
      const enTitle = (payload.title_en || payload.title || payload.title_ar || '').trim()

      const body: any = {
        title: arTitle || enTitle,
        title_ar: arTitle,
        title_en: enTitle,
        name: arTitle || enTitle,
        name_ar: arTitle,
        name_en: enTitle,
        translations: [
          { locale: 'ar', key: 'title', value: arTitle },
          { locale: 'en', key: 'title', value: enTitle },
          { locale: 'ar', key: 'name', value: arTitle },
          { locale: 'en', key: 'name', value: enTitle }
        ],
        type: payload.type,
        url: payload.url,
        target: payload.target || '_self',
        parent_id: payload.parent_id ? Number(payload.parent_id) : null,
        badge: payload.badge,
        badge_color: payload.badge_color,
        icon: payload.icon,
        is_active: payload.is_active !== undefined ? (payload.is_active ? 1 : 0) : undefined,
        sort_order: payload.sort_order
      }

      const response = await $fetch<any>(endpoint, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body
      })

      const raw = response?.data || response?.item || response || body
      return {
        success: true,
        data: normalizeNavbarItem(raw),
        message: response?.message || 'تم تعديل عنصر القائمة بنجاح'
      }
    } catch (err: any) {
      console.error('[adminNavbarApiService] updateNavbarItem error:', err)
      throw err
    }
  },

  /**
   * 4. DELETE Navbar Item (supports multiple endpoint patterns)
   */
  async deleteNavbarItem(token: string, id: number | string): Promise<{ success: boolean; message?: string }> {
    const cleanId = String(id).trim()
    const endpoints = [
      { url: `${API_BASE_URL}/admin/navbar/${cleanId}`, method: 'DELETE' },
      { url: `${API_BASE_URL}/admin/navbar/delete/${cleanId}`, method: 'DELETE' },
      { url: `${API_BASE_URL}/admin/navbar/delete/${cleanId}`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/navbar/${cleanId}`, method: 'POST', body: { _method: 'DELETE' } }
    ]

    let lastError: any = null

    for (const ep of endpoints) {
      try {
        const response = await $fetch<any>(ep.url, {
          method: ep.method as any,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: (ep as any).body || undefined,
          timeout: 10000
        })

        return {
          success: true,
          message: response?.message || 'تم حذف العنصر بنجاح'
        }
      } catch (err: any) {
        lastError = err
        // If 404 or 405, try next endpoint candidate
        if (err.status === 404 || err.status === 405 || err.statusCode === 404 || err.statusCode === 405) {
          continue
        }
        if (err.response?.status === 200 || err.response?.status === 204) {
          return { success: true, message: 'تم حذف العنصر بنجاح' }
        }
      }
    }

    // If local/temp item, still allow successful client removal
    if (typeof id === 'string' && (id.startsWith('nav-') || isNaN(Number(id)))) {
      return { success: true, message: 'تم حذف العنصر بنجاح' }
    }

    if (lastError) {
      console.error('[adminNavbarApiService] deleteNavbarItem error:', lastError)
      throw lastError
    }

    return {
      success: true,
      message: 'تم حذف العنصر بنجاح'
    }
  },

  /**
   * 5. POST Reorder Navbar Items
   */
  async reorderNavbarItems(token: string, items: Array<{ id: number | string; sort_order: number } | number | string>): Promise<{ success: boolean; message?: string }> {
    try {
      const endpoint = `${API_BASE_URL}/admin/navbar/reorder`
      const payload = items.map((item, idx) => {
        if (typeof item === 'object' && item !== null) {
          return { id: item.id, sort_order: item.sort_order || idx + 1 }
        }
        return { id: item, sort_order: idx + 1 }
      })

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: { items: payload, ids: payload.map(p => p.id) }
      })

      return {
        success: true,
        message: response?.message || 'تم تحديث الترتيب بنجاح'
      }
    } catch (err: any) {
      console.error('[adminNavbarApiService] reorderNavbarItems error:', err)
      throw err
    }
  }
}
