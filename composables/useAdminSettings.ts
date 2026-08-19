import { ref, reactive, computed, watch } from 'vue'
import { adminSettingsApiService, type AdminSettingsState, type SettingsFilesMap } from '~/services/adminSettingsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminSettings = () => {
  const { adminToken } = useAdminAuth()
  const toast = useToast()

  const isLoading = ref(false)
  const isSaving = ref(false)
  const hasUnsavedChanges = ref(false)
  const isInitialLoaded = ref(false)
  const errorMessage = ref('')
  const fieldErrors = ref<Record<string, string[]>>({})

  // Full reactive settings state with all 11 sections
  const settings = reactive<AdminSettingsState>({
    // 1. General & SEO
    store_name_ar: 'أسوار جدة',
    store_name_en: 'Aswar Jeddah',
    meta_title: 'أسوار جدة | الأجهزة الكهربائية والمنزلية',
    meta_title_en: 'Aswar Jeddah | Home Appliances & Electronics',
    meta_description: 'متجر أسوار جدة الرائد للأجهزة الكهربائية والمنزلية والإلكترونيات بالمملكة العربية السعودية بأفضل الأسعار وأعلى جودة.',
    meta_description_en: 'Leading e-commerce store for home appliances and electronics in Saudi Arabia with best prices and fast delivery.',
    store_description_ar: 'متجر أسوار جدة الرائد للأجهزة الكهربائية والمنزلية والإلكترونيات بالمملكة العربية السعودية.',
    store_description_en: 'Leading e-commerce store for home appliances and electronics in Saudi Arabia.',
    support_email: 'support@aswarjeddah.com',
    support_phone: '+966559876543',
    hotline: '920000000',
    currency: 'SAR',
    currency_symbol: 'ر.س',
    timezone: 'Asia/Riyadh',

    // 2. Location
    shop_address_ar: 'طريق الملك فهد، حي الروضة، جدة، المملكة العربية السعودية',
    shop_address_en: 'King Fahd Road, Al Rawdah, Jeddah, Saudi Arabia',
    address_ar: 'طريق الملك فهد، حي الروضة، جدة، المملكة العربية السعودية',
    address_en: 'King Fahd Road, Al Rawdah, Jeddah, Saudi Arabia',
    city: 'جدة',
    country: 'المملكة العربية السعودية',
    latitude: '21.543333',
    longitude: '39.172778',
    google_map_embed_url: '',

    // 3. Media URLs
    logo_url: '',
    mobile_logo_url: '',
    footer_logo_url: '',
    invoice_logo_url: '',
    favicon_url: '',
    loader_gif_url: '',

    // 4. Colors & Branding
    primary_color: '#0B0E28',
    secondary_color: '#FBBF24',
    accent_color: '#4F46E5',
    bg_color: '#F8F9FA',
    header_color: '#FFFFFF',
    footer_color: '#0B0E28',

    // 5. Legal & Copyrights
    copyright_text_ar: 'جميع الحقوق محفوظة © 2026 لشركة أسوار جدة للتجارة.',
    copyright_text_en: 'All rights reserved © 2026 Aswar Jeddah Trading Co.',
    cookie_bar_status: true,
    cookie_bar_text_ar: 'نستخدم ملفات تعريف الارتباط لتحسين تجربة التسوق وتقديم محتوى ملائم.',
    cookie_bar_text_en: 'We use cookies to improve your shopping experience and deliver relevant content.',
    terms_url: '/terms',
    privacy_url: '/privacy',
    refund_url: '/refund-policy',

    // 6. Shipping & Delivery
    shipping_enabled: true,
    free_shipping_enabled: true,
    free_shipping_threshold: 500,
    default_shipping_cost: 25,
    estimated_delivery_days: '1 - 3 أيام عمل',

    // 7. Finance & Taxes
    vat_enabled: true,
    vat_rate: 15,
    prices_tax_inclusive: true,
    tax_number: '300123456789003',

    // 8. Orders & Inventory
    backorder_enabled: false,
    min_order_amount: 50,
    default_order_status: 'pending',
    invoice_prefix: 'ASW-',

    // 9. Payment Gateways
    cod_enabled: true,
    online_payment_enabled: true,
    payment_mode: 'live',
    paymob_api_key: '',
    paymob_integration_id: '',
    paymob_iframe_id: '',
    tabby_enabled: true,
    tamara_enabled: true,
    moyasar_enabled: false,
    cash_on_delivery: true,
    digital_payment: true,
    tabby: true,
    tamara: true,
    sandbox_mode: false,
    active_gateways: ['cash_on_delivery', 'paymob_accept', 'tamara', 'tabby'],

    // 10. Social Media & Tracking
    whatsapp_number: '+966559876543',
    whatsapp_chat_enabled: true,
    facebook_url: 'https://facebook.com',
    instagram_url: 'https://instagram.com',
    twitter_url: 'https://x.com',
    tiktok_url: 'https://tiktok.com',
    youtube_url: '',
    snapchat_url: 'https://snapchat.com',
    ga_tracking_id: '',
    google_analytics_id: '',
    fb_pixel_id: '',
    facebook_pixel_id: '',
    tiktok_pixel_id: '',
    download_app_apple_store: '',
    download_app_google_store: '',

    // 11. Maintenance Mode & Store Management
    maintenance_mode: false,
    allow_admin_bypass: true,
    maintenance_title_ar: 'المتجر تحت الصيانة والتطوير',
    maintenance_title_en: 'Store Under Maintenance',
    maintenance_message_ar: 'نقوم حالياً ببعض أعمال الصيانة والترقية لنقدم لكم تجربة تسوق أفضل. سنعود قريباً!',
    maintenance_message_en: 'We are currently upgrading our store for a better experience. We will be back shortly!',
    expected_back_date: '',
    maintenance_end_at: ''
  })

  // Pending binary files to be sent on update
  const files = reactive<SettingsFilesMap>({
    logo: null,
    mobile_logo: null,
    footer_logo: null,
    invoice_logo: null,
    favicon: null,
    loader_gif: null
  })

  // Live preview data URLs for local chosen files
  const filePreviews = reactive<Record<string, string>>({
    logo: '',
    mobile_logo: '',
    footer_logo: '',
    invoice_logo: '',
    favicon: '',
    loader_gif: ''
  })

  /**
   * Fetch current settings from backend
   */
  const fetchSettings = async () => {
    const token = adminToken.value || (process.client ? (localStorage.getItem('admin_token') || useCookie('admin_token').value) : null)
    if (!token) {
      console.warn('[useAdminSettings] No admin token found for fetchSettings')
      return
    }

    isLoading.value = true
    errorMessage.value = ''
    try {
      const res = await adminSettingsApiService.fetchSettings(token as string)
      console.log('[useAdminSettings] fetchSettings result:', res)

      if (res.success && res.data) {
        Object.assign(settings, res.data)
      }
    } catch (err: any) {
      console.warn('[useAdminSettings] fetch error:', err)
      errorMessage.value = 'تعذر جلب إعدادات المتجر من السيرفر.'
    } finally {
      isLoading.value = false
      isInitialLoaded.value = true
      // Reset dirty flag after initial load
      setTimeout(() => {
        hasUnsavedChanges.value = false
      }, 150)
    }
  }

  /**
   * Handle image file selection with live preview
   */
  const handleFileUpload = (field: keyof SettingsFilesMap, file: File | null) => {
    if (!file) {
      files[field] = null
      filePreviews[field] = ''
      return
    }

    files[field] = file
    const reader = new FileReader()
    reader.onload = (e) => {
      filePreviews[field] = e.target?.result as string
      hasUnsavedChanges.value = true
    }
    reader.readAsDataURL(file)
  }

  /**
   * Remove image
   */
  const removeImage = (field: keyof SettingsFilesMap) => {
    files[field] = null
    filePreviews[field] = ''
    const urlKey = `${field}_url` as keyof AdminSettingsState
    if (urlKey in settings) {
      (settings as any)[urlKey] = ''
    }
    hasUnsavedChanges.value = true
  }

  /**
   * Save / Update all settings via multipart/form-data
   */
  const saveSettings = async (): Promise<boolean> => {
    const token = adminToken.value
    if (!token) {
      toast.error('غير مصرح', 'يرجى تسجيل الدخول أولاً كمسؤول.')
      return false
    }

    isSaving.value = true
    fieldErrors.value = {}
    errorMessage.value = ''

    try {
      const res = await adminSettingsApiService.updateSettings(token, settings, files)

      if (res.success) {
        toast.success('تم الحفظ بنجاح', res.message || 'تم تحديث كافة إعدادات المتجر بنجاح!')
        hasUnsavedChanges.value = false

        // Clear local binary files queue and refresh state
        Object.keys(files).forEach((k) => {
          (files as any)[k] = null
        })
        Object.keys(filePreviews).forEach((k) => {
          filePreviews[k] = ''
        })

        // Immediate state reflection from response if returned
        if (res.data) {
          const mapped = adminSettingsApiService.mapServerSettingsToState(res.data)
          Object.assign(settings, mapped)
        }

        await fetchSettings()
        return true
      } else {
        errorMessage.value = res.message
        if (res.errors) {
          fieldErrors.value = res.errors
        }
        toast.error('فشل الحفظ', res.message || 'يرجى مراجعة الحقول وإعادة المحاولة.')
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.message || 'حدث خطأ غير متوقع أثناء حفظ الإعدادات.'
      toast.error('خطأ غير متوقع', errorMessage.value)
      return false
    } finally {
      isSaving.value = false
    }
  }

  // Keep payment alias properties in sync
  watch(
    () => [settings.cod_enabled, settings.online_payment_enabled, settings.tabby_enabled, settings.tamara_enabled, settings.payment_mode],
    ([cod, online, tabby, tamara, mode]) => {
      settings.cash_on_delivery = Boolean(cod)
      settings.digital_payment = Boolean(online)
      settings.tabby = Boolean(tabby)
      settings.tamara = Boolean(tamara)
      settings.sandbox_mode = (mode === 'sandbox')
    },
    { immediate: true }
  )

  // Watch for changes to mark dirty state
  watch(
    () => settings,
    () => {
      if (isInitialLoaded.value) {
        hasUnsavedChanges.value = true
      }
    },
    { deep: true }
  )

  return {
    settings,
    files,
    filePreviews,
    isLoading,
    isSaving,
    hasUnsavedChanges,
    errorMessage,
    fieldErrors,
    fetchSettings,
    handleFileUpload,
    removeImage,
    saveSettings
  }
}
