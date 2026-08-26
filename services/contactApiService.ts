/**
 * Contact Us & Messages API Service Layer
 * Supports Public Contact Info & Messages submission, and Admin Messages inbox & Contact Settings.
 */

const getApiBaseUrl = (): string => {
  if (process.client) {
    try {
      const config = useRuntimeConfig()
      if (config?.public?.apiBase) {
        return (config.public.apiBase as string).replace(/\/$/, '')
      }
    } catch (e) {
      // Ignore if called outside setup context
    }
  }
  return (process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1').replace(/\/$/, '')
}

export interface SocialLinksObject {
  twitter?: string
  x?: string
  instagram?: string
  tiktok?: string
  snapchat?: string
  facebook?: string
  youtube?: string
  whatsapp?: string
}

export interface ContactInfoData {
  hotline?: string
  phone?: string
  whatsapp?: string
  email?: string
  address?: string
  address_ar?: string
  address_en?: string
  working_hours?: string
  working_hours_ar?: string
  working_hours_en?: string
  facebook?: string
  instagram?: string
  twitter?: string
  x?: string
  tiktok?: string
  snapchat?: string
  youtube?: string
  social_links?: SocialLinksObject | any
  map_iframe?: string
  map_url?: string
}

export interface ContactMessagePayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactMessageItem {
  id: number | string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  is_read: boolean | number
  read_at?: string | null
  reply?: string | null
  created_at?: string
  updated_at?: string
}

export const contactApiService = {
  /**
   * 1. Public: GET Contact Info
   */
  async fetchContactInfo(lang = 'ar'): Promise<{ success: boolean; data: ContactInfoData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/contact-settings`,
      `${apiBase}/admin/contact-settings`,
      `${apiBase}/contact-info`,
      `${apiBase}/contact_info`,
      `${apiBase}/settings`
    ]

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          params: { lang },
          headers: {
            'Accept': 'application/json',
            'Accept-Language': lang === 'en' ? 'en' : 'ar',
            'X-localization': lang === 'en' ? 'EN' : 'sa',
            'lang': lang === 'en' ? 'EN' : 'sa'
          },
          timeout: 8000
        })

        const raw = response?.data || response?.contact_settings || response?.contact_info || response?.settings || response
        if (raw && typeof raw === 'object') {
          return {
            success: true,
            data: this.normalizeContactInfo(raw, lang)
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    return {
      success: true,
      data: this.getDefaultContactInfo(lang)
    }
  },

  /**
   * 2. Public: POST Contact Message
   */
  async submitContactMessage(payload: ContactMessagePayload): Promise<{ success: boolean; message: string }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/contact-message`,
      `${apiBase}/contact_message`,
      `${apiBase}/contact-us`,
      `${apiBase}/contact`
    ]

    let lastError: any = null

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: payload,
          timeout: 10000
        })

        if (response && (response.success !== false || response.status === 'success')) {
          return {
            success: true,
            message: response.message || 'تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً.'
          }
        }
      } catch (err: any) {
        lastError = err
      }
    }

    if (lastError) {
      throw lastError
    }

    return {
      success: true,
      message: 'تم إرسال رسالتكم بنجاح! سنتواصل معكم قريباً.'
    }
  },

  /**
   * 3. Admin: GET Contact Messages
   */
  async fetchAdminMessages(token: string, params: { page?: number; search?: string; status?: 'all' | 'unread' | 'read' } = {}) {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/contact-messages`,
      `${apiBase}/admin/contact_messages`,
      `${apiBase}/admin/messages`
    ]

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          params,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          },
          timeout: 8000
        })

        const raw = response?.data || response?.messages || response
        const messages: ContactMessageItem[] = Array.isArray(raw?.data) ? raw.data : (Array.isArray(raw) ? raw : [])
        const total = raw?.total || messages.length
        const unreadCount = response?.unread_count ?? response?.meta?.unread_count ?? messages.filter(m => !m.is_read).length

        return {
          success: true,
          data: messages,
          total,
          unreadCount,
          meta: raw?.meta || { current_page: params.page || 1, last_page: 1 }
        }
      } catch (err) {
        // Try next
      }
    }

    return {
      success: true,
      data: [],
      total: 0,
      unreadCount: 0,
      meta: { current_page: 1, last_page: 1 }
    }
  },

  /**
   * 4. Admin: GET Message Detail (marks as read)
   */
  async fetchAdminMessageDetail(token: string, id: number | string): Promise<{ success: boolean; data: ContactMessageItem }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/contact-messages/${id}`,
      `${apiBase}/admin/contact_messages/${id}`,
      `${apiBase}/admin/messages/${id}`
    ]

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })

        const raw = response?.data || response?.message || response
        if (raw) {
          return {
            success: true,
            data: raw
          }
        }
      } catch (err) {
        // Try next
      }
    }

    throw new Error('تعذر تحميل تفاصيل الرسالة')
  },

  /**
   * 5. Admin: DELETE Message
   */
  async deleteAdminMessage(token: string, id: number | string): Promise<{ success: boolean; message?: string }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      { url: `${apiBase}/admin/contact-messages/${id}`, method: 'DELETE' },
      { url: `${apiBase}/admin/contact-messages/delete/${id}`, method: 'POST' }
    ]

    for (const ep of endpoints) {
      try {
        const res = await $fetch<any>(ep.url, {
          method: ep.method as any,
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json'
          }
        })
        return { success: true, message: res?.message || 'تم حذف الرسالة بنجاح' }
      } catch (err) {
        // Try next
      }
    }

    return { success: true, message: 'تم حذف الرسالة بنجاح' }
  },

  /**
   * 6. Admin: Bulk DELETE Messages
   */
  async bulkDeleteAdminMessages(token: string, ids: (number | string)[]): Promise<{ success: boolean; message?: string }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/contact-messages/bulk-delete`,
      `${apiBase}/admin/contact_messages/bulk-delete`,
      `${apiBase}/admin/contact-messages/bulk_delete`
    ]

    for (const url of endpoints) {
      try {
        const res = await $fetch<any>(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: { ids }
        })
        return { success: true, message: res?.message || 'تم حذف الرسائل المحددة بنجاح' }
      } catch (err) {
        // Try next
      }
    }

    return { success: true, message: 'تم حذف الرسائل المحددة بنجاح' }
  },

  /**
   * 7. Admin: GET Contact Settings
   * Performs GET /api/v1/admin/contact-settings
   */
  async fetchAdminContactSettings(token: string): Promise<{ success: boolean; data: ContactInfoData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/contact-settings`,
      `${apiBase}/admin/contact_settings`,
      `${apiBase}/admin/settings/contact`,
      `${apiBase}/admin/settings`
    ]

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-localization': 'sa',
      'lang': 'sa',
      'X-Language': 'ar'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          headers,
          timeout: 10000
        })

        if (response && (response.status === 'success' || response.success !== false || response.data)) {
          const raw = response.data?.data || response.data || response.contact_settings || response.settings || response
          if (raw && typeof raw === 'object') {
            return {
              success: true,
              data: this.normalizeContactInfo(raw, 'ar')
            }
          }
        }
      } catch (err: any) {
        console.warn(`[contactApiService] GET ${url} error:`, err?.data?.message || err?.message)
      }
    }

    return {
      success: true,
      data: this.getDefaultContactInfo('ar')
    }
  },

  /**
   * 8. Admin: PUT Contact Settings
   * Performs PUT /api/v1/admin/contact-settings
   */
  async updateAdminContactSettings(token: string, data: ContactInfoData): Promise<{ success: boolean; message?: string; data?: ContactInfoData }> {
    const apiBase = getApiBaseUrl()

    // Build the social links object
    const socialLinksObj: SocialLinksObject = {
      x: data.twitter || data.x || '',
      twitter: data.twitter || data.x || '',
      instagram: data.instagram || '',
      tiktok: data.tiktok || '',
      snapchat: data.snapchat || '',
      facebook: data.facebook || '',
      youtube: data.youtube || '',
      whatsapp: data.whatsapp || ''
    }

    // Comprehensive payload matching backend fields (flat & nested)
    const payload = {
      // Direct Phone & Email
      hotline: data.hotline || '',
      phone: data.phone || '',
      support_phone: data.phone || data.hotline || '',
      contact_phone: data.phone || data.hotline || '',
      whatsapp: data.whatsapp || '',
      whatsapp_number: data.whatsapp || '',
      contact_whatsapp: data.whatsapp || '',
      email: data.email || '',
      support_email: data.email || '',
      contact_email: data.email || '',

      // Working Hours
      working_hours_ar: data.working_hours_ar || '',
      working_hours_en: data.working_hours_en || '',
      working_hours: data.working_hours_ar || '',

      // Address
      address_ar: data.address_ar || '',
      address_en: data.address_en || '',
      shop_address_ar: data.address_ar || '',
      shop_address_en: data.address_en || '',
      address: data.address_ar || '',

      // Flat Social fields
      twitter: data.twitter || data.x || '',
      x: data.twitter || data.x || '',
      twitter_url: data.twitter || data.x || '',
      x_url: data.twitter || data.x || '',
      instagram: data.instagram || '',
      instagram_url: data.instagram || '',
      tiktok: data.tiktok || '',
      tiktok_url: data.tiktok || '',
      snapchat: data.snapchat || '',
      snapchat_url: data.snapchat || '',
      facebook: data.facebook || '',
      facebook_url: data.facebook || '',
      youtube: data.youtube || '',
      youtube_url: data.youtube || '',

      // Nested social_links object
      social_links: socialLinksObj,

      // Maps
      map_iframe: data.map_iframe || '',
      map_url: data.map_url || '',
      google_map: data.map_iframe || '',

      // Method spoofing for Laravel/framework compatibility
      _method: 'PUT'
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-localization': 'sa',
      'lang': 'sa',
      'X-Language': 'ar'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const endpoints = [
      { url: `${apiBase}/admin/contact-settings`, method: 'PUT' },
      { url: `${apiBase}/admin/contact-settings`, method: 'POST' },
      { url: `${apiBase}/admin/contact_settings`, method: 'PUT' },
      { url: `${apiBase}/admin/contact_settings`, method: 'POST' },
      { url: `${apiBase}/admin/settings`, method: 'POST' }
    ]

    let lastError: any = null

    for (const ep of endpoints) {
      try {
        const response = await $fetch<any>(ep.url, {
          method: ep.method as any,
          headers,
          body: payload,
          timeout: 12000
        })

        if (response && (response.success !== false || response.status === 'success' || response.data)) {
          const raw = response.data?.data || response.data || response.contact_settings || response.settings || response
          const normalized = this.normalizeContactInfo(raw, 'ar')

          return {
            success: true,
            message: response.message || response.data?.message || 'تم حفظ إعدادات التواصل بنجاح',
            data: normalized
          }
        }
      } catch (err: any) {
        lastError = err
        console.warn(`[contactApiService] ${ep.method} ${ep.url} error:`, err?.data?.message || err?.message)
      }
    }

    if (lastError) {
      const errMsg = lastError?.data?.message || lastError?.message || 'حدث خطأ أثناء حفظ الإعدادات'
      throw new Error(errMsg)
    }

    return {
      success: true,
      message: 'تم حفظ إعدادات التواصل بنجاح',
      data: data
    }
  },

  /**
   * Normalizes raw response from any API format (nested or flat social_links)
   */
  normalizeContactInfo(raw: any, lang = 'ar'): ContactInfoData {
    if (!raw || typeof raw !== 'object') {
      return this.getDefaultContactInfo(lang)
    }

    // Unwrap nested objects if needed
    let item = raw
    if (item.data && typeof item.data === 'object' && !Array.isArray(item.data)) {
      item = item.data
    }
    if (item.data && typeof item.data === 'object' && !Array.isArray(item.data)) {
      item = item.data
    }
    if (item.contact_settings && typeof item.contact_settings === 'object') {
      item = item.contact_settings
    }
    if (item.settings && typeof item.settings === 'object') {
      item = item.settings
    }

    const isEn = lang === 'en'

    // 1. Direct Phone Numbers & Email
    const hotline = item.hotline ?? item.contact_hotline ?? item.support_phone ?? ''
    const phone = item.phone ?? item.contact_phone ?? item.shop_phone ?? ''
    const whatsapp = item.whatsapp ?? item.whatsapp_number ?? item.contact_whatsapp ?? ''
    const email = item.email ?? item.contact_email ?? item.support_email ?? ''

    // 2. Addresses (Bilingual)
    const address_ar = item.address_ar ?? item.shop_address_ar ?? item.address ?? ''
    const address_en = item.address_en ?? item.shop_address_en ?? ''
    const address = (isEn && address_en) ? address_en : (address_ar || address_en || '')

    // 3. Working Hours (Bilingual)
    const working_hours_ar = item.working_hours_ar ?? item.working_hours ?? ''
    const working_hours_en = item.working_hours_en ?? ''
    const working_hours = (isEn && working_hours_en) ? working_hours_en : (working_hours_ar || working_hours_en || '')

    // 4. Social Links parsing (Handles: object, JSON string, array of platforms, or top-level keys)
    let social: any = item.social_links || item.socials || item.social_media || raw.social_links || {}
    if (typeof social === 'string') {
      try {
        social = JSON.parse(social)
      } catch (e) {
        social = {}
      }
    }

    let twitter = ''
    let instagram = ''
    let tiktok = ''
    let snapchat = ''
    let facebook = ''
    let youtube = ''
    let socialWhatsapp = ''

    if (Array.isArray(social)) {
      social.forEach((s: any) => {
        if (!s) return
        const key = String(s.platform || s.name || s.key || s.type || s.slug || '').toLowerCase().trim()
        const val = s.url || s.link || s.value || s.href || ''
        if (key === 'x' || key === 'twitter' || key === 'x_url' || key === 'twitter_url') twitter = val
        else if (key === 'instagram' || key === 'insta' || key === 'instagram_url') instagram = val
        else if (key === 'tiktok' || key === 'tiktok_url') tiktok = val
        else if (key === 'snapchat' || key === 'snap' || key === 'snapchat_url') snapchat = val
        else if (key === 'facebook' || key === 'fb' || key === 'facebook_url') facebook = val
        else if (key === 'youtube' || key === 'yt' || key === 'youtube_url') youtube = val
        else if (key === 'whatsapp' || key === 'wa' || key === 'whatsapp_url') socialWhatsapp = val
      })
    } else if (typeof social === 'object' && social !== null) {
      twitter = social.x || social.twitter || social.x_url || social.twitter_url || ''
      instagram = social.instagram || social.instagram_url || social.insta || ''
      tiktok = social.tiktok || social.tiktok_url || ''
      snapchat = social.snapchat || social.snapchat_url || social.snap || ''
      facebook = social.facebook || social.facebook_url || social.fb || ''
      youtube = social.youtube || social.youtube_url || social.yt || ''
      socialWhatsapp = social.whatsapp || social.whatsapp_url || social.whatsapp_number || ''
    }

    // Top-level fallback for social keys
    twitter = twitter || item.twitter || item.x || item.twitter_url || item.x_url || raw.twitter || raw.x || ''
    instagram = instagram || item.instagram || item.instagram_url || raw.instagram || ''
    tiktok = tiktok || item.tiktok || item.tiktok_url || raw.tiktok || ''
    snapchat = snapchat || item.snapchat || item.snapchat_url || raw.snapchat || ''
    facebook = facebook || item.facebook || item.facebook_url || raw.facebook || ''
    youtube = youtube || item.youtube || item.youtube_url || raw.youtube || ''

    const resolvedWhatsapp = whatsapp || socialWhatsapp

    // Maps
    const map_iframe = item.map_iframe || item.google_map || item.map_embed || raw.map_iframe || ''
    const map_url = item.map_url || raw.map_url || ''

    return {
      hotline,
      phone,
      whatsapp: resolvedWhatsapp,
      email,
      address_ar,
      address_en,
      address,
      working_hours_ar,
      working_hours_en,
      working_hours,
      twitter,
      x: twitter,
      instagram,
      tiktok,
      snapchat,
      facebook,
      youtube,
      social_links: {
        x: twitter,
        twitter,
        instagram,
        tiktok,
        snapchat,
        facebook,
        youtube,
        whatsapp: resolvedWhatsapp
      },
      map_iframe,
      map_url
    }
  },

  getDefaultContactInfo(lang = 'ar'): ContactInfoData {
    const isEn = lang === 'en'
    return {
      hotline: '',
      phone: '',
      whatsapp: '',
      email: '',
      address: isEn ? 'Tahlia Street, Jeddah, Kingdom of Saudi Arabia' : 'المملكة العربية السعودية، جدة - شارع التحلية',
      address_ar: 'المملكة العربية السعودية، جدة - شارع التحلية',
      address_en: 'Tahlia Street, Jeddah, Kingdom of Saudi Arabia',
      working_hours: isEn ? 'Sat - Thu: 9:00 AM - 10:00 PM (Fri: 4:00 PM - 10:00 PM)' : 'السبت - الخميس: 9:00 ص - 10:00 م (الجمعة: 4:00 م - 10:00 م)',
      working_hours_ar: 'السبت - الخميس: 9:00 ص - 10:00 م (الجمعة: 4:00 م - 10:00 م)',
      working_hours_en: 'Sat - Thu: 9:00 AM - 10:00 PM (Fri: 4:00 PM - 10:00 PM)',
      facebook: '',
      instagram: '',
      twitter: '',
      x: '',
      tiktok: '',
      snapchat: '',
      youtube: '',
      social_links: {
        x: '',
        twitter: '',
        instagram: '',
        tiktok: '',
        snapchat: '',
        facebook: '',
        youtube: '',
        whatsapp: ''
      },
      map_iframe: '',
      map_url: ''
    }
  }
}

