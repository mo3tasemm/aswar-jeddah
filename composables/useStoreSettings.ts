/**
 * Public & Universal Store Settings Composable (useStoreSettings)
 * Provides centralized reactive access to live store configuration from /admin/settings.
 */
import { ref, computed } from 'vue'
import { adminSettingsApiService, type AdminSettingsState } from '~/services/adminSettingsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useLanguage } from '~/composables/useLanguage'

// Global singleton state so all components share the same settings without re-fetching
const settingsState = ref<Partial<AdminSettingsState>>({})
const isSettingsLoading = ref<boolean>(false)
const hasLoadedSettings = ref<boolean>(false)

export const useStoreSettings = () => {
  const { currentLanguage } = useLanguage()
  const { adminToken, adminCookie } = useAdminAuth()

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  const fetchStoreSettings = async (forceRefresh = false) => {
    if (hasLoadedSettings.value && !forceRefresh && Object.keys(settingsState.value).length > 0) {
      return settingsState.value
    }

    isSettingsLoading.value = true
    try {
      const token = getToken()
      const res = await adminSettingsApiService.fetchSettings(token)
      let customContact: any = null
      if (process.client) {
        try {
          const raw = localStorage.getItem('aswar_custom_contact_settings_data')
          if (raw) customContact = JSON.parse(raw)
        } catch (e) {}
      }

      if (res.success && res.data) {
        settingsState.value = {
          ...res.data,
          ...(customContact ? {
            hotline: customContact.hotline || res.data.hotline,
            support_phone: customContact.phone || customContact.hotline || res.data.support_phone,
            support_email: customContact.email || res.data.support_email,
            shop_address_ar: customContact.address_ar || res.data.shop_address_ar,
            shop_address_en: customContact.address_en || res.data.shop_address_en,
            whatsapp_number: customContact.whatsapp || res.data.whatsapp_number,
            twitter_url: customContact.twitter || res.data.twitter_url,
            instagram_url: customContact.instagram || res.data.instagram_url,
            tiktok_url: customContact.tiktok || res.data.tiktok_url,
            snapchat_url: customContact.snapchat || res.data.snapchat_url,
            facebook_url: customContact.facebook || res.data.facebook_url,
            youtube_url: customContact.youtube || res.data.youtube_url
          } : {})
        }
        hasLoadedSettings.value = true
      }
    } catch (err) {
      console.warn('[useStoreSettings] Error fetching settings:', err)
    } finally {
      isSettingsLoading.value = false
    }

    return settingsState.value
  }

  // Reactive Helpers
  const storeName = computed(() => {
    const s = settingsState.value
    if (currentLanguage?.value === 'en') {
      return s.store_name_en || s.meta_title_en || s.store_name_ar || 'Aswar Jeddah'
    }
    return s.store_name_ar || s.meta_title || s.store_name_en || 'أسوار جدة'
  })

  const storeDescription = computed(() => {
    const s = settingsState.value
    if (currentLanguage?.value === 'en') {
      return s.store_description_en || s.meta_description_en || s.store_description_ar || ''
    }
    return s.store_description_ar || s.meta_description || s.store_description_en || ''
  })

  const logoUrl = computed(() => {
    const s = settingsState.value
    return s.logo_url || s.mobile_logo_url || ''
  })

  const footerLogoUrl = computed(() => {
    const s = settingsState.value
    return s.footer_logo_url || s.logo_url || ''
  })

  const phone = computed(() => {
    const s = settingsState.value
    return s.support_phone || s.hotline || '01286000037'
  })

  const hotline = computed(() => {
    const s = settingsState.value
    return s.hotline || s.support_phone || '01286000037'
  })

  const email = computed(() => {
    const s = settingsState.value
    return s.support_email || 'info@aswarjeddah.com'
  })

  const address = computed(() => {
    const s = settingsState.value
    if (currentLanguage?.value === 'en') {
      return s.shop_address_en || s.address_en || s.shop_address_ar || 'Saudi Arabia - Jeddah'
    }
    return s.shop_address_ar || s.address_ar || s.shop_address_en || 'المملكة العربية السعودية - جدة'
  })

  const socialLinks = computed(() => {
    const s = settingsState.value
    return {
      facebook: s.facebook_url || '',
      instagram: s.instagram_url || '',
      twitter: s.twitter_url || '',
      tiktok: s.tiktok_url || '',
      snapchat: s.snapchat_url || '',
      youtube: s.youtube_url || '',
      whatsapp: s.whatsapp_number ? `https://wa.me/${s.whatsapp_number.replace(/\D/g, '')}` : ''
    }
  })

  const copyright = computed(() => {
    const s = settingsState.value
    const year = new Date().getFullYear()
    if (currentLanguage?.value === 'en') {
      return s.copyright_text_en ? s.copyright_text_en.replace('{year}', String(year)) : `© ${year} ${storeName.value}. All Rights Reserved.`
    }
    return s.copyright_text_ar ? s.copyright_text_ar.replace('{year}', String(year)) : `جميع الحقوق محفوظة © ${year} لمتجر ${storeName.value}`
  })

  return {
    settingsState,
    isSettingsLoading,
    hasLoadedSettings,
    fetchStoreSettings,
    storeName,
    storeDescription,
    logoUrl,
    footerLogoUrl,
    phone,
    hotline,
    email,
    address,
    socialLinks,
    copyright
  }
}
