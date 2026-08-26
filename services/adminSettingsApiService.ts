/**
 * Admin Settings & Business Configuration API Service Layer
 * Supports full multipart/form-data payload with multiple binary media uploads,
 * scalar types (strings, numbers, booleans), and nested configuration mappings.
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

export interface AdminSettingsState {
  // 1. General & SEO
  store_name_ar: string;
  store_name_en: string;
  meta_title: string;
  meta_title_en: string;
  meta_description: string;
  meta_description_en: string;
  store_description_ar: string;
  store_description_en: string;
  support_email: string;
  support_phone: string;
  hotline: string;
  currency: string;
  currency_symbol: string;
  timezone: string;

  // 2. Location
  shop_address_ar: string;
  shop_address_en: string;
  address_ar: string;
  address_en: string;
  city: string;
  country: string;
  latitude: string | number;
  longitude: string | number;
  google_map_embed_url: string;

  // 3. Media & Logos URLs (server strings)
  logo_url: string;
  mobile_logo_url: string;
  footer_logo_url: string;
  invoice_logo_url: string;
  favicon_url: string;
  loader_gif_url: string;

  // 4. Colors & Branding
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  bg_color: string;
  header_color: string;
  footer_color: string;

  // 5. Legal & Copyrights
  copyright_text_ar: string;
  copyright_text_en: string;
  cookie_bar_status: boolean;
  cookie_bar_text_ar: string;
  cookie_bar_text_en: string;
  terms_url: string;
  privacy_url: string;
  refund_url: string;

  // 6. Shipping & Delivery
  shipping_enabled: boolean;
  free_shipping_enabled: boolean;
  free_shipping_threshold: number;
  default_shipping_cost: number;
  estimated_delivery_days: string;

  // 7. Finance & Taxes
  vat_enabled: boolean;
  vat_rate: number;
  prices_tax_inclusive: boolean;
  tax_number: string;
  vat_status?: boolean;
  vat_percentage?: number;
  prices_include_tax?: boolean;
  tax_id_number?: string;

  // 8. Orders & Inventory
  backorder_enabled: boolean;
  min_order_amount: number;
  default_order_status: string;
  invoice_prefix: string;
  allow_checkout_out_of_stock?: boolean;
  minimum_order_amount?: number;
  minimum_order_amount_status?: boolean;

  // 9. Payment Gateways
  cod_enabled: boolean;
  online_payment_enabled: boolean;
  payment_mode: 'sandbox' | 'live';
  paymob_api_key: string;
  paymob_integration_id: string;
  paymob_iframe_id: string;
  tabby_enabled: boolean;
  tamara_enabled: boolean;
  moyasar_enabled: boolean;
  cash_on_delivery?: boolean;
  digital_payment?: boolean;
  tabby?: boolean;
  tamara?: boolean;
  sandbox_mode?: boolean;
  active_gateways?: string[];

  // 10. Social Media & Tracking
  whatsapp_number: string;
  whatsapp_chat_enabled?: boolean;
  facebook_url: string;
  instagram_url: string;
  twitter_url: string;
  tiktok_url: string;
  youtube_url?: string;
  snapchat_url: string;
  ga_tracking_id: string;
  google_analytics_id?: string;
  fb_pixel_id: string;
  facebook_pixel_id?: string;
  tiktok_pixel_id: string;
  download_app_apple_store?: string;
  download_app_google_store?: string;

  // 11. Maintenance Mode & Store Management
  maintenance_mode: boolean;
  allow_admin_bypass?: boolean;
  maintenance_title_ar: string;
  maintenance_title_en: string;
  maintenance_message_ar: string;
  maintenance_message_en: string;
  expected_back_date: string;
  maintenance_end_at?: string;
}

export interface SettingsFilesMap {
  logo?: File | null;
  mobile_logo?: File | null;
  footer_logo?: File | null;
  invoice_logo?: File | null;
  favicon?: File | null;
  loader_gif?: File | null;
}

const buildHeaders = (token: string): HeadersInit => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'X-Client-Type': 'admin',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    zoneId: '1'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

/**
 * Normalizes full image path if returned as relative
 */
export function normalizeSettingsImageUrl(pathOrObj: any): string {
  if (!pathOrObj) return ''
  if (typeof pathOrObj === 'object') {
    const rawPath = pathOrObj.path || pathOrObj.url || pathOrObj.image_full_url?.path || ''
    if (rawPath) return normalizeSettingsImageUrl(rawPath)
  }
  const str = String(pathOrObj).trim()
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:') || str.startsWith('blob:')) {
    return str
  }
  const cleanBase = API_BASE_URL.replace('/api/v1', '')
  const cleanPath = str.replace(/^\/+/, '')
  return `${cleanBase}/storage/app/public/company/${cleanPath}`
}

export const adminSettingsApiService = {
  /**
   * Fetch All Store & Business Settings
   * GET /api/v1/admin/settings or candidate endpoints
   */
  async fetchSettings(token: string): Promise<{ success: boolean; data?: Partial<AdminSettingsState>; raw?: any; message?: string }> {
    const candidateUrls = [
      `${API_BASE_URL}/admin/settings?_t=${Date.now()}_${Math.random()}`,
      `${API_BASE_URL}/admin/business-settings?_t=${Date.now()}_${Math.random()}`,
      `${API_BASE_URL}/admin/business-settings/web-config?_t=${Date.now()}_${Math.random()}`,
      `${API_BASE_URL}/admin/settings/get?_t=${Date.now()}_${Math.random()}`
    ]

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: buildHeaders(token),
          cache: 'no-store'
        })

        if (!response.ok) continue

        const raw = await response.json()
        console.log('[adminSettingsApiService] fetchSettings raw response:', raw)

        const payload = raw?.data || raw?.settings || raw?.business_settings || raw

        if (payload && typeof payload === 'object') {
          const mapped = this.mapServerSettingsToState(raw)
          return {
            success: true,
            data: mapped,
            raw
          }
        }
      } catch (err) {
        console.warn(`[adminSettingsApiService] Error fetching from ${url}:`, err)
      }
    }

    return {
      success: false,
      message: 'تعذر جلب إعدادات المتجر من السيرفر.'
    }
  },

  /**
   * Update Settings with Multipart/FormData
   * POST /api/v1/admin/settings/update or candidate endpoints
   */
  async updateSettings(
    token: string,
    state: Partial<AdminSettingsState>,
    files: SettingsFilesMap = {}
  ): Promise<{ success: boolean; message: string; data?: any; errors?: Record<string, string[]> }> {
    const candidateEndpoints = [
      { url: `${API_BASE_URL}/admin/settings/update`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/business-settings/update`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/business-settings/web-config/update`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/settings`, method: 'POST' },
      { url: `${API_BASE_URL}/admin/settings/update`, method: 'PUT' }
    ]

    const formData = new FormData()

    // 1. Append scalar state fields
    Object.entries(state).forEach(([key, val]) => {
      if (val === undefined || val === null) return

      // Convert booleans to 1 / 0
      if (typeof val === 'boolean') {
        formData.append(key, val ? '1' : '0')
        formData.append(`${key}_status`, val ? '1' : '0')
      } else if (typeof val === 'number') {
        formData.append(key, String(val))
      } else if (typeof val === 'string') {
        formData.append(key, val)
      } else if (typeof val === 'object') {
        formData.append(key, JSON.stringify(val))
      }
    })

    // 2. Compatibility aliases & Grouped structures for backend controllers
    if (state.store_name_ar || state.store_name_en) {
      formData.append('company_name', state.store_name_ar || state.store_name_en || '')
      formData.append('name', state.store_name_ar || state.store_name_en || '')
      formData.append('store_name', state.store_name_ar || state.store_name_en || '')
    }
    if (state.meta_title) {
      formData.append('meta_title', state.meta_title)
      formData.append('meta_title_ar', state.meta_title)
      formData.append('store_meta_title', state.meta_title)
      formData.append('general[meta_title]', state.meta_title)
    }
    if (state.meta_title_en) {
      formData.append('meta_title_en', state.meta_title_en)
      formData.append('store_meta_title_en', state.meta_title_en)
      formData.append('general[meta_title_en]', state.meta_title_en)
    }
    if (state.meta_description) {
      formData.append('meta_description', state.meta_description)
      formData.append('meta_description_ar', state.meta_description)
      formData.append('store_meta_description', state.meta_description)
      formData.append('description_ar', state.meta_description)
      formData.append('about_us', state.meta_description)
      formData.append('general[meta_description]', state.meta_description)
    }
    if (state.meta_description_en) {
      formData.append('meta_description_en', state.meta_description_en)
      formData.append('store_meta_description_en', state.meta_description_en)
      formData.append('description_en', state.meta_description_en)
      formData.append('general[meta_description_en]', state.meta_description_en)
    }

    // Grouped general array representation
    formData.append('general[store_name_ar]', state.store_name_ar || '')
    formData.append('general[store_name_en]', state.store_name_en || '')
    formData.append('general[support_email]', state.support_email || '')
    formData.append('general[support_phone]', state.support_phone || '')
    formData.append('general[hotline]', state.hotline || '')
    formData.append('general[currency]', state.currency || 'SAR')
    formData.append('general[timezone]', state.timezone || 'Asia/Riyadh')

    // Location fields & Grouped representations
    if (state.shop_address_ar || state.address_ar) {
      const addrAr = state.shop_address_ar || state.address_ar || ''
      formData.append('shop_address_ar', addrAr)
      formData.append('address_ar', addrAr)
      formData.append('shop_address', addrAr)
      formData.append('location[shop_address_ar]', addrAr)
      formData.append('location[address_ar]', addrAr)
    }
    if (state.shop_address_en || state.address_en) {
      const addrEn = state.shop_address_en || state.address_en || ''
      formData.append('shop_address_en', addrEn)
      formData.append('address_en', addrEn)
      formData.append('location[shop_address_en]', addrEn)
      formData.append('location[address_en]', addrEn)
    }
    if (state.latitude !== undefined) {
      formData.append('latitude', String(state.latitude))
      formData.append('location[latitude]', String(state.latitude))
    }
    if (state.longitude !== undefined) {
      formData.append('longitude', String(state.longitude))
      formData.append('location[longitude]', String(state.longitude))
    }
    if (state.city) {
      formData.append('city', state.city)
      formData.append('location[city]', state.city)
    }

    // Colors & Branding Payloads (supports 6amTech/6valley keys, JSON string, and nested arrays)
    if (state.primary_color) {
      formData.append('primary_color', state.primary_color)
      formData.append('primary_color_code', state.primary_color)
      formData.append('primary', state.primary_color)
      formData.append('colors[primary]', state.primary_color)
      formData.append('branding_colors[primary_color]', state.primary_color)
    }
    if (state.secondary_color) {
      formData.append('secondary_color', state.secondary_color)
      formData.append('secondary_color_code', state.secondary_color)
      formData.append('secondary', state.secondary_color)
      formData.append('colors[secondary]', state.secondary_color)
      formData.append('branding_colors[secondary_color]', state.secondary_color)
    }
    if (state.accent_color) {
      formData.append('accent_color', state.accent_color)
      formData.append('accent_color_code', state.accent_color)
    }
    if (state.bg_color) {
      formData.append('bg_color', state.bg_color)
      formData.append('background_color', state.bg_color)
    }
    if (state.header_color) {
      formData.append('header_color', state.header_color)
      formData.append('navbar_color', state.header_color)
    }
    if (state.footer_color) {
      formData.append('footer_color', state.footer_color)
      formData.append('footer_bg_color', state.footer_color)
    }
    formData.append('colors', JSON.stringify({
      primary: state.primary_color || '#0B0E28',
      secondary: state.secondary_color || '#FBBF24',
      accent: state.accent_color || '#4F46E5',
      primary_color: state.primary_color || '#0B0E28',
      secondary_color: state.secondary_color || '#FBBF24'
    }))

    // Legal & Compliance Keys (supports legal[...] and flat keys)
    if (state.copyright_text_ar) {
      formData.append('company_copyright_text_ar', state.copyright_text_ar)
      formData.append('legal[company_copyright_text_ar]', state.copyright_text_ar)
    }
    if (state.copyright_text_en) {
      formData.append('company_copyright_text_en', state.copyright_text_en)
      formData.append('legal[company_copyright_text_en]', state.copyright_text_en)
    }
    if (state.cookie_bar_status !== undefined) {
      formData.append('cookie_notice_enabled', state.cookie_bar_status ? '1' : '0')
      formData.append('legal[cookie_notice_enabled]', state.cookie_bar_status ? '1' : '0')
    }
    if (state.cookie_bar_text_ar) {
      formData.append('cookie_notice_text_ar', state.cookie_bar_text_ar)
      formData.append('legal[cookie_notice_text_ar]', state.cookie_bar_text_ar)
    }
    if (state.cookie_bar_text_en) {
      formData.append('cookie_notice_text_en', state.cookie_bar_text_en)
      formData.append('legal[cookie_notice_text_en]', state.cookie_bar_text_en)
    }
    if (state.privacy_url) {
      formData.append('privacy_policy_url', state.privacy_url)
      formData.append('legal[privacy_policy_url]', state.privacy_url)
    }
    if (state.terms_url) {
      formData.append('terms_conditions_url', state.terms_url)
      formData.append('legal[terms_conditions_url]', state.terms_url)
    }

    // Shipping & Delivery Configurations (Supports Nested shipping[...] FormData, JSON object, and Flat fields)
    const freeDeliveryStatus = (state.free_shipping_enabled !== undefined)
      ? (state.free_shipping_enabled ? '1' : '0')
      : '1'
    const freeDeliveryOverAmount = state.free_shipping_threshold !== undefined
      ? String(state.free_shipping_threshold)
      : '0'
    const shippingEnabled = (state.shipping_enabled !== undefined)
      ? (state.shipping_enabled ? '1' : '0')
      : '1'
    const defaultShippingCost = state.default_shipping_cost !== undefined
      ? String(state.default_shipping_cost)
      : '0'
    const estimatedDeliveryDays = state.estimated_delivery_days || '1 - 2 أيام عمل'

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('shipping[free_delivery_status]', freeDeliveryStatus)
    formData.append('shipping[free_delivery_over_amount]', freeDeliveryOverAmount)
    formData.append('shipping[shipping_enabled]', shippingEnabled)
    formData.append('shipping[default_shipping_cost]', defaultShippingCost)
    formData.append('shipping[estimated_delivery_days]', estimatedDeliveryDays)

    // Legacy & alternative nested keys for maximum compatibility
    formData.append('shipping[free_shipping_enabled]', freeDeliveryStatus)
    formData.append('shipping[free_shipping_threshold]', freeDeliveryOverAmount)
    formData.append('shipping_delivery[free_delivery_status]', freeDeliveryStatus)
    formData.append('shipping_delivery[free_delivery_over_amount]', freeDeliveryOverAmount)
    formData.append('shipping_delivery[shipping_enabled]', shippingEnabled)
    formData.append('shipping_delivery[default_shipping_cost]', defaultShippingCost)
    formData.append('shipping_delivery[estimated_delivery_days]', estimatedDeliveryDays)

    // JSON encoded shipping object
    formData.append('shipping', JSON.stringify({
      free_delivery_status: state.free_shipping_enabled ? 1 : 0,
      free_delivery_over_amount: Number(state.free_shipping_threshold ?? 0),
      shipping_enabled: state.shipping_enabled !== undefined ? (state.shipping_enabled ? 1 : 0) : 1,
      default_shipping_cost: Number(state.default_shipping_cost ?? 0),
      estimated_delivery_days: estimatedDeliveryDays
    }))

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('free_delivery_status', freeDeliveryStatus)
    formData.append('free_delivery_over_amount', freeDeliveryOverAmount)

    if (state.support_email) {
      formData.append('company_email', state.support_email)
      formData.append('email', state.support_email)
    }
    if (state.support_phone) {
      formData.append('company_phone', state.support_phone)
      formData.append('phone', state.support_phone)
    }
    // 7. Finance & Taxes Configurations (Supports Nested finance_taxes[...] FormData, JSON, and Flat fields)
    const vatStatus = (state.vat_enabled !== undefined)
      ? (state.vat_enabled ? '1' : '0')
      : (state.vat_status !== undefined ? (state.vat_status ? '1' : '0') : '1')
    const vatStatusBool = (state.vat_enabled !== undefined)
      ? Boolean(state.vat_enabled)
      : (state.vat_status !== undefined ? Boolean(state.vat_status) : true)

    const vatPercentage = state.vat_rate !== undefined
      ? Number(state.vat_rate)
      : (state.vat_percentage !== undefined ? Number(state.vat_percentage) : 15)

    const pricesIncludeTax = (state.prices_tax_inclusive !== undefined)
      ? (state.prices_tax_inclusive ? '1' : '0')
      : (state.prices_include_tax !== undefined ? (state.prices_include_tax ? '1' : '0') : '1')
    const pricesIncludeTaxBool = (state.prices_tax_inclusive !== undefined)
      ? Boolean(state.prices_tax_inclusive)
      : (state.prices_include_tax !== undefined ? Boolean(state.prices_include_tax) : true)

    const taxIdNumber = state.tax_number || state.tax_id_number || '300123456789003'

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('finance_taxes[vat_status]', vatStatus)
    formData.append('finance_taxes[vat_percentage]', String(vatPercentage))
    formData.append('finance_taxes[prices_include_tax]', pricesIncludeTax)
    formData.append('finance_taxes[tax_id_number]', taxIdNumber)

    // Legacy & alternative nested keys for maximum compatibility
    formData.append('finance_taxes[vat_enabled]', vatStatus)
    formData.append('finance_taxes[vat_rate]', String(vatPercentage))
    formData.append('finance_taxes[prices_tax_inclusive]', pricesIncludeTax)
    formData.append('finance_taxes[tax_number]', taxIdNumber)
    formData.append('finance[vat_status]', vatStatus)
    formData.append('finance[vat_percentage]', String(vatPercentage))
    formData.append('finance[prices_include_tax]', pricesIncludeTax)
    formData.append('finance[tax_id_number]', taxIdNumber)

    // JSON encoded finance_taxes object
    formData.append('finance_taxes', JSON.stringify({
      vat_status: vatStatusBool,
      vat_percentage: vatPercentage,
      prices_include_tax: pricesIncludeTaxBool,
      tax_id_number: taxIdNumber
    }))

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('vat_status', vatStatus)
    formData.append('vat_percentage', String(vatPercentage))
    formData.append('prices_include_tax', pricesIncludeTax)
    formData.append('tax_id_number', taxIdNumber)

    // Flat compatibility aliases
    formData.append('vat_enabled', vatStatus)
    formData.append('vat_rate', String(vatPercentage))
    formData.append('vat', String(vatPercentage))
    formData.append('tax', String(vatPercentage))
    formData.append('prices_tax_inclusive', pricesIncludeTax)
    formData.append('tax_number', taxIdNumber)

    // 8. Orders & Inventory Configurations (Supports Nested orders_inventory[...] FormData, JSON, and Flat fields)
    const defaultOrderStatus = state.default_order_status || 'pending'
    const minOrderAmount = state.minimum_order_amount !== undefined
      ? Number(state.minimum_order_amount)
      : (state.min_order_amount !== undefined ? Number(state.min_order_amount) : 0)
    const minOrderAmountStatus = state.minimum_order_amount_status !== undefined
      ? (state.minimum_order_amount_status ? '1' : '0')
      : (minOrderAmount > 0 ? '1' : '0')
    const minOrderAmountStatusBool = state.minimum_order_amount_status !== undefined
      ? Boolean(state.minimum_order_amount_status)
      : (minOrderAmount > 0)
    const invoicePrefix = state.invoice_prefix || 'ASW-'
    const allowOutOfStock = (state.allow_checkout_out_of_stock !== undefined)
      ? (state.allow_checkout_out_of_stock ? '1' : '0')
      : (state.backorder_enabled !== undefined ? (state.backorder_enabled ? '1' : '0') : '0')
    const allowOutOfStockBool = (state.allow_checkout_out_of_stock !== undefined)
      ? Boolean(state.allow_checkout_out_of_stock)
      : Boolean(state.backorder_enabled)

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('orders_inventory[default_order_status]', defaultOrderStatus)
    formData.append('orders_inventory[minimum_order_amount]', String(minOrderAmount))
    formData.append('orders_inventory[minimum_order_amount_status]', minOrderAmountStatus)
    formData.append('orders_inventory[invoice_prefix]', invoicePrefix)
    formData.append('orders_inventory[allow_checkout_out_of_stock]', allowOutOfStock)

    // Legacy & alternative nested keys for maximum compatibility
    formData.append('orders_inventory[backorder_enabled]', allowOutOfStock)
    formData.append('orders_inventory[min_order_amount]', String(minOrderAmount))
    formData.append('orders[default_order_status]', defaultOrderStatus)
    formData.append('orders[minimum_order_amount]', String(minOrderAmount))
    formData.append('orders[minimum_order_amount_status]', minOrderAmountStatus)
    formData.append('orders[invoice_prefix]', invoicePrefix)
    formData.append('orders[allow_checkout_out_of_stock]', allowOutOfStock)
    formData.append('orders[backorder_enabled]', allowOutOfStock)

    // JSON encoded orders_inventory object
    formData.append('orders_inventory', JSON.stringify({
      default_order_status: defaultOrderStatus,
      minimum_order_amount: minOrderAmount,
      minimum_order_amount_status: minOrderAmountStatusBool,
      invoice_prefix: invoicePrefix,
      allow_checkout_out_of_stock: allowOutOfStockBool
    }))

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('default_order_status', defaultOrderStatus)
    formData.append('minimum_order_amount', String(minOrderAmount))
    formData.append('minimum_order_amount_status', minOrderAmountStatus)
    formData.append('invoice_prefix', invoicePrefix)
    formData.append('allow_checkout_out_of_stock', allowOutOfStock)

    // Flat compatibility aliases
    formData.append('backorder_enabled', allowOutOfStock)
    formData.append('min_order_amount', String(minOrderAmount))

    // 9. Payment Gateways Configurations (Supports Nested payment_gateways[...] FormData, JSON, and Flat fields)
    const codEnabled = state.cash_on_delivery !== undefined
      ? Boolean(state.cash_on_delivery)
      : (state.cod_enabled !== undefined ? Boolean(state.cod_enabled) : true)
    const onlinePaymentEnabled = state.digital_payment !== undefined
      ? Boolean(state.digital_payment)
      : (state.online_payment_enabled !== undefined ? Boolean(state.online_payment_enabled) : true)
    const tabbyEnabled = state.tabby !== undefined
      ? Boolean(state.tabby)
      : (state.tabby_enabled !== undefined ? Boolean(state.tabby_enabled) : true)
    const tamaraEnabled = state.tamara !== undefined
      ? Boolean(state.tamara)
      : (state.tamara_enabled !== undefined ? Boolean(state.tamara_enabled) : true)
    const isSandbox = state.sandbox_mode !== undefined
      ? Boolean(state.sandbox_mode)
      : (state.payment_mode === 'sandbox')
    const paymobApiKey = state.paymob_api_key || ''
    const paymobIframeId = state.paymob_iframe_id ? String(state.paymob_iframe_id) : ''
    const paymobIntegrationId = state.paymob_integration_id ? String(state.paymob_integration_id) : ''

    const computedActiveGateways: string[] = state.active_gateways && Array.isArray(state.active_gateways)
      ? state.active_gateways
      : [
        ...(codEnabled ? ['cash_on_delivery'] : []),
        ...(onlinePaymentEnabled ? ['paymob_accept'] : []),
        ...(tamaraEnabled ? ['tamara'] : []),
        ...(tabbyEnabled ? ['tabby'] : []),
        ...(state.moyasar_enabled ? ['moyasar'] : [])
      ]

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('payment_gateways[cash_on_delivery]', codEnabled ? '1' : '0')
    formData.append('payment_gateways[digital_payment]', onlinePaymentEnabled ? '1' : '0')
    formData.append('payment_gateways[tabby]', tabbyEnabled ? '1' : '0')
    formData.append('payment_gateways[tamara]', tamaraEnabled ? '1' : '0')
    formData.append('payment_gateways[sandbox_mode]', isSandbox ? '1' : '0')
    formData.append('payment_gateways[paymob_api_key]', paymobApiKey)
    formData.append('payment_gateways[paymob_iframe_id]', paymobIframeId)
    formData.append('payment_gateways[paymob_integration_id]', paymobIntegrationId)

    computedActiveGateways.forEach((gw) => {
      formData.append('payment_gateways[active_gateways][]', gw)
    })
    formData.append('payment_gateways[active_gateways]', JSON.stringify(computedActiveGateways))

    // JSON encoded payment_gateways object
    formData.append('payment_gateways', JSON.stringify({
      cash_on_delivery: codEnabled,
      digital_payment: onlinePaymentEnabled,
      tabby: tabbyEnabled,
      tamara: tamaraEnabled,
      sandbox_mode: isSandbox,
      paymob_api_key: paymobApiKey,
      paymob_iframe_id: paymobIframeId,
      paymob_integration_id: paymobIntegrationId,
      active_gateways: computedActiveGateways
    }))

    // Legacy & alternative nested keys for maximum compatibility
    formData.append('payment_gateways[cod_enabled]', codEnabled ? '1' : '0')
    formData.append('payment_gateways[online_payment_enabled]', onlinePaymentEnabled ? '1' : '0')
    formData.append('payment_gateways[payment_mode]', isSandbox ? 'sandbox' : 'live')
    formData.append('payment_gateways[tabby_enabled]', tabbyEnabled ? '1' : '0')
    formData.append('payment_gateways[tamara_enabled]', tamaraEnabled ? '1' : '0')
    formData.append('payment_gateways[moyasar_enabled]', state.moyasar_enabled ? '1' : '0')

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('cash_on_delivery', codEnabled ? '1' : '0')
    formData.append('digital_payment', onlinePaymentEnabled ? '1' : '0')
    formData.append('tabby', tabbyEnabled ? '1' : '0')
    formData.append('tamara', tamaraEnabled ? '1' : '0')
    formData.append('sandbox_mode', isSandbox ? '1' : '0')
    formData.append('paymob_api_key', paymobApiKey)
    formData.append('paymob_iframe_id', paymobIframeId)
    formData.append('paymob_integration_id', paymobIntegrationId)
    formData.append('active_gateways', JSON.stringify(computedActiveGateways))
    formData.append('cod_enabled', codEnabled ? '1' : '0')
    formData.append('online_payment_enabled', onlinePaymentEnabled ? '1' : '0')
    formData.append('tabby_enabled', tabbyEnabled ? '1' : '0')
    formData.append('tamara_enabled', tamaraEnabled ? '1' : '0')
    formData.append('payment_mode', isSandbox ? 'sandbox' : 'live')

    // 10. Social Media & Tracking Configurations (Supports Nested social_tracking[...] FormData, JSON, and Flat fields)
    const facebookUrl = state.facebook_url || ''
    const twitterUrl = state.twitter_url || ''
    const instagramUrl = state.instagram_url || ''
    const tiktokUrl = state.tiktok_url || ''
    const youtubeUrl = state.youtube_url || ''
    const snapchatUrl = state.snapchat_url || ''
    const whatsappNumber = state.whatsapp_number || '+966559876543'
    const whatsappChatEnabled = state.whatsapp_chat_enabled !== undefined ? Boolean(state.whatsapp_chat_enabled) : true
    const googleAnalyticsId = state.google_analytics_id || state.ga_tracking_id || ''
    const facebookPixelId = state.facebook_pixel_id || state.fb_pixel_id || ''
    const tiktokPixelId = state.tiktok_pixel_id || ''
    const downloadAppleStore = state.download_app_apple_store || ''
    const downloadGoogleStore = state.download_app_google_store || ''

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('social_tracking[facebook_url]', facebookUrl)
    formData.append('social_tracking[twitter_url]', twitterUrl)
    formData.append('social_tracking[instagram_url]', instagramUrl)
    formData.append('social_tracking[tiktok_url]', tiktokUrl)
    formData.append('social_tracking[youtube_url]', youtubeUrl)
    formData.append('social_tracking[snapchat_url]', snapchatUrl)
    formData.append('social_tracking[whatsapp_number]', whatsappNumber)
    formData.append('social_tracking[whatsapp_chat_enabled]', whatsappChatEnabled ? '1' : '0')
    formData.append('social_tracking[google_analytics_id]', googleAnalyticsId)
    formData.append('social_tracking[facebook_pixel_id]', facebookPixelId)
    formData.append('social_tracking[tiktok_pixel_id]', tiktokPixelId)
    formData.append('social_tracking[download_app_apple_store]', downloadAppleStore)
    formData.append('social_tracking[download_app_google_store]', downloadGoogleStore)

    // Legacy nested aliases
    formData.append('social_tracking[ga_tracking_id]', googleAnalyticsId)
    formData.append('social_tracking[fb_pixel_id]', facebookPixelId)

    // JSON encoded social_tracking object
    formData.append('social_tracking', JSON.stringify({
      facebook_url: facebookUrl,
      twitter_url: twitterUrl,
      instagram_url: instagramUrl,
      tiktok_url: tiktokUrl,
      youtube_url: youtubeUrl,
      snapchat_url: snapchatUrl,
      whatsapp_number: whatsappNumber,
      whatsapp_chat_enabled: whatsappChatEnabled,
      google_analytics_id: googleAnalyticsId,
      facebook_pixel_id: facebookPixelId,
      tiktok_pixel_id: tiktokPixelId,
      download_app_apple_store: downloadAppleStore,
      download_app_google_store: downloadGoogleStore
    }))

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('facebook_url', facebookUrl)
    formData.append('twitter_url', twitterUrl)
    formData.append('instagram_url', instagramUrl)
    formData.append('tiktok_url', tiktokUrl)
    formData.append('youtube_url', youtubeUrl)
    formData.append('snapchat_url', snapchatUrl)
    formData.append('whatsapp_number', whatsappNumber)
    formData.append('whatsapp_chat_enabled', whatsappChatEnabled ? '1' : '0')
    formData.append('google_analytics_id', googleAnalyticsId)
    formData.append('facebook_pixel_id', facebookPixelId)
    formData.append('tiktok_pixel_id', tiktokPixelId)
    formData.append('download_app_apple_store', downloadAppleStore)
    formData.append('download_app_google_store', downloadGoogleStore)
    formData.append('ga_tracking_id', googleAnalyticsId)
    formData.append('fb_pixel_id', facebookPixelId)

    // 11. Store Management & Maintenance Configurations (Supports Nested store_management[...] FormData, JSON, and Flat fields)
    const maintenanceMode = state.maintenance_mode !== undefined ? Boolean(state.maintenance_mode) : false
    const allowAdminBypass = state.allow_admin_bypass !== undefined ? Boolean(state.allow_admin_bypass) : true
    const maintenanceTitleAr = state.maintenance_title_ar || 'المتجر تحت الصيانة والتطوير'
    const maintenanceTitleEn = state.maintenance_title_en || 'Store Under Maintenance'
    const maintenanceMessageAr = state.maintenance_message_ar || 'نقوم حالياً ببعض أعمال الصيانة والترقية لنقدم لكم تجربة تسوق أفضل. سنعود قريباً!'
    const maintenanceMessageEn = state.maintenance_message_en || 'We are currently upgrading our store for a better experience. We will be back shortly!'
    const maintenanceEndAt = state.maintenance_end_at || state.expected_back_date || ''

    // Format 1: Preferred Nested Array / Object (FormData & JSON)
    formData.append('store_management[maintenance_mode]', maintenanceMode ? '1' : '0')
    formData.append('store_management[allow_admin_bypass]', allowAdminBypass ? '1' : '0')
    formData.append('store_management[maintenance_title_ar]', maintenanceTitleAr)
    formData.append('store_management[maintenance_title_en]', maintenanceTitleEn)
    formData.append('store_management[maintenance_message_ar]', maintenanceMessageAr)
    formData.append('store_management[maintenance_message_en]', maintenanceMessageEn)
    formData.append('store_management[maintenance_end_at]', maintenanceEndAt)
    formData.append('store_management[expected_back_date]', maintenanceEndAt)

    // JSON encoded store_management object
    formData.append('store_management', JSON.stringify({
      maintenance_mode: maintenanceMode,
      allow_admin_bypass: allowAdminBypass,
      maintenance_title_ar: maintenanceTitleAr,
      maintenance_title_en: maintenanceTitleEn,
      maintenance_message_ar: maintenanceMessageAr,
      maintenance_message_en: maintenanceMessageEn,
      maintenance_end_at: maintenanceEndAt
    }))

    // Format 2: Flat Payload (Direct Request Body fields)
    formData.append('maintenance_mode', maintenanceMode ? '1' : '0')
    formData.append('allow_admin_bypass', allowAdminBypass ? '1' : '0')
    formData.append('maintenance_title_ar', maintenanceTitleAr)
    formData.append('maintenance_title_en', maintenanceTitleEn)
    formData.append('maintenance_message_ar', maintenanceMessageAr)
    formData.append('maintenance_message_en', maintenanceMessageEn)
    formData.append('maintenance_end_at', maintenanceEndAt)
    formData.append('expected_back_date', maintenanceEndAt)

    // 3. Append Binary Files
    if (files.logo instanceof File) {
      formData.append('logo', files.logo)
      formData.append('company_web_logo', files.logo)
      formData.append('store_logo', files.logo)
    }
    if (files.mobile_logo instanceof File) {
      formData.append('mobile_logo', files.mobile_logo)
      formData.append('company_mobile_logo', files.mobile_logo)
    }
    if (files.footer_logo instanceof File) {
      formData.append('footer_logo', files.footer_logo)
      formData.append('company_footer_logo', files.footer_logo)
    }
    if (files.invoice_logo instanceof File) {
      formData.append('invoice_logo', files.invoice_logo)
      formData.append('company_invoice_logo', files.invoice_logo)
      formData.append('terms_and_condition_company_invoice_logo', files.invoice_logo)
    }
    if (files.favicon instanceof File) {
      formData.append('favicon', files.favicon)
      formData.append('company_fav_icon', files.favicon)
    }
    if (files.loader_gif instanceof File) {
      formData.append('loader_gif', files.loader_gif)
      formData.append('loading_gif', files.loader_gif)
      formData.append('preloader', files.loader_gif)
    }

    let lastError = 'فشل في تحديث إعدادات المتجر'
    const errors: Record<string, string[]> = {}

    for (const ep of candidateEndpoints) {
      try {
        const response = await fetch(ep.url, {
          method: ep.method,
          headers: buildHeaders(token),
          body: formData
        })

        const json = await response.json().catch(() => ({}))
        console.log(`[adminSettingsApiService] updateSettings (${ep.method} ${ep.url}) status:`, response.status, json)

        if ((response.ok || response.status === 200 || response.status === 201) && json.success !== false) {
          return {
            success: true,
            message: json.message || 'تم تحديث كافة إعدادات المتجر بنجاح!',
            data: json.data || json.settings
          }
        }

        if (json?.errors) {
          if (typeof json.errors === 'object') {
            for (const [k, v] of Object.entries(json.errors)) {
              errors[k] = Array.isArray(v) ? v.map(String) : [String(v)]
            }
          }
        }

        if (json?.message) {
          lastError = json.message
        }
      } catch (err: any) {
        lastError = err.message || lastError
      }
    }

    return {
      success: false,
      message: lastError,
      errors
    }
  },

  /**
   * Helper to map diverse server key formats to standardized state
   * Deeply extracts keys from nested objects (e.g. settings.general, data.finance_taxes, etc.)
   */
  mapServerSettingsToState(serverData: any): Partial<AdminSettingsState> {
    if (!serverData || typeof serverData !== 'object') return {}

    // 1. Direct object resolution if payment_gateways (or other configs) is directly available
    let directPayment: any = serverData?.payment_gateways || serverData?.data?.payment_gateways || serverData?.settings?.payment_gateways || serverData?.business_settings?.payment_gateways
    if (typeof directPayment === 'string') {
      try {
        if (directPayment.startsWith('{') || directPayment.startsWith('[')) {
          directPayment = JSON.parse(directPayment)
        }
      } catch (e) { }
    }

    // Deep recursive flattener
    const flatObj: Record<string, any> = {}

    const flatten = (obj: any, prefix = '') => {
      if (!obj || typeof obj !== 'object') return

      if (Array.isArray(obj)) {
        obj.forEach((item) => {
          if (item && typeof item === 'object') {
            const key = item.type || item.key || item.name || item.code
            if (key && 'value' in item) {
              flatObj[key] = item.value
              if (prefix) flatObj[`${prefix}.${key}`] = item.value

              // Parse JSON string values (like type="payment_gateways", value="{...}")
              if (typeof item.value === 'string' && (item.value.startsWith('{') || item.value.startsWith('['))) {
                try {
                  const parsed = JSON.parse(item.value)
                  if (parsed && typeof parsed === 'object') {
                    flatten(parsed, key)
                  }
                } catch (e) { }
              } else if (item.value && typeof item.value === 'object') {
                flatten(item.value, key)
              }
            } else {
              flatten(item, prefix)
            }
          }
        })
        return
      }

      for (const [k, v] of Object.entries(obj)) {
        // Direct key
        if (flatObj[k] === undefined || flatObj[k] === null || flatObj[k] === '') {
          flatObj[k] = v
        }
        if (prefix) {
          flatObj[`${prefix}.${k}`] = v
        }

        if (v && typeof v === 'object' && !Array.isArray(v)) {
          flatten(v, k)
        } else if (Array.isArray(v)) {
          flatten(v, k)
        } else if (typeof v === 'string' && (v.startsWith('{') || v.startsWith('['))) {
          try {
            const parsed = JSON.parse(v)
            if (parsed && typeof parsed === 'object') {
              flatten(parsed, k)
            }
          } catch (e) {
            // Not a JSON string
          }
        }
      }
    }

    flatten(serverData)

    console.log('[adminSettingsApiService] Flattened settings keys count:', Object.keys(flatObj).length, flatObj)

    const findVal = (...keys: string[]): any => {
      for (const k of keys) {
        if (flatObj[k] !== undefined && flatObj[k] !== null) {
          return flatObj[k]
        }
      }
      return undefined
    }

    const parseBool = (v: any, def = false): boolean => {
      if (v === undefined || v === null) return def
      if (v === true || v === 1 || v === '1' || v === 'true' || v === 'active' || v === 'on') return true
      if (v === false || v === 0 || v === '0' || v === 'false' || v === 'inactive' || v === 'off') return false
      return def
    }

    const parseNum = (v: any, def = 0): number => {
      if (v === undefined || v === null || v === '') return def
      const n = Number(v)
      return isNaN(n) ? def : n
    }

    const storeNameAr = findVal('store_name_ar', 'general.store_name_ar', 'name_ar', 'general.name_ar', 'company_name_ar', 'company_name', 'name', 'store_name', 'shop_name') || ''
    const storeNameEn = findVal('store_name_en', 'general.store_name_en', 'name_en', 'general.name_en', 'company_name_en', 'company_name', 'store_name', 'name') || ''
    const metaTitle = findVal('meta_title', 'general.meta_title', 'store_meta_title', 'meta_title_ar', 'general.meta_title_ar') || storeNameAr
    const metaTitleEn = findVal('meta_title_en', 'general.meta_title_en', 'store_meta_title_en') || storeNameEn
    const metaDesc = findVal('meta_description', 'general.meta_description', 'store_meta_description', 'store_description_ar', 'general.store_description_ar', 'description_ar', 'about_us_ar', 'about_us', 'description', 'store_description') || ''
    const metaDescEn = findVal('meta_description_en', 'general.meta_description_en', 'store_meta_description_en', 'store_description_en', 'general.store_description_en', 'description_en', 'about_us_en') || ''

    // Payment Gateways Robust Resolution
    const paymentObj = (typeof directPayment === 'object' && directPayment !== null) ? directPayment : {}
    const codValue = parseBool(paymentObj.cash_on_delivery ?? paymentObj.cod_enabled ?? findVal('payment_gateways.cash_on_delivery', 'cash_on_delivery', 'payment_gateways.cod_enabled', 'payments.cod_enabled', 'cod_enabled', 'cash_on_delivery_status', 'cod'), true)
    const digitalValue = parseBool(paymentObj.digital_payment ?? paymentObj.online_payment_enabled ?? findVal('payment_gateways.digital_payment', 'digital_payment', 'payment_gateways.online_payment_enabled', 'payments.online_payment_enabled', 'online_payment_enabled', 'digital_payment_status', 'online_payment_status'), true)
    const tabbyValue = parseBool(paymentObj.tabby ?? paymentObj.tabby_enabled ?? findVal('payment_gateways.tabby', 'tabby', 'payment_gateways.tabby_enabled', 'tabby_enabled', 'payments.tabby_enabled', 'tabby_status'), true)
    const tamaraValue = parseBool(paymentObj.tamara ?? paymentObj.tamara_enabled ?? findVal('payment_gateways.tamara', 'tamara', 'payment_gateways.tamara_enabled', 'tamara_enabled', 'payments.tamara_enabled', 'tamara_status'), true)
    const moyasarValue = parseBool(paymentObj.moyasar ?? paymentObj.moyasar_enabled ?? findVal('payment_gateways.moyasar_enabled', 'moyasar_enabled', 'payments.moyasar_enabled', 'moyasar_status', 'moyasar'), false)

    const isSandboxMode = parseBool(paymentObj.sandbox_mode ?? findVal('payment_gateways.sandbox_mode', 'sandbox_mode'), false) || (paymentObj.payment_mode === 'sandbox' || findVal('payment_gateways.payment_mode', 'payment_mode') === 'sandbox')

    const paymobKey = String(paymentObj.paymob_api_key ?? findVal('payment_gateways.paymob_api_key', 'paymob_api_key', 'payments.paymob_api_key', 'paymob_secret_key', 'api_key') ?? '')
    const paymobInteg = String(paymentObj.paymob_integration_id ?? findVal('payment_gateways.paymob_integration_id', 'paymob_integration_id', 'payments.paymob_integration_id', 'integration_id') ?? '')
    const paymobIframe = String(paymentObj.paymob_iframe_id ?? findVal('payment_gateways.paymob_iframe_id', 'paymob_iframe_id', 'payments.paymob_iframe_id', 'iframe_id') ?? '')
    const activeGws = Array.isArray(paymentObj.active_gateways) ? paymentObj.active_gateways : (findVal('payment_gateways.active_gateways', 'active_gateways') || [])

    return {
      store_name_ar: storeNameAr,
      store_name_en: storeNameEn,
      meta_title: metaTitle,
      meta_title_en: metaTitleEn,
      meta_description: metaDesc,
      meta_description_en: metaDescEn,
      store_description_ar: metaDesc,
      store_description_en: metaDescEn,
      support_email: findVal('support_email', 'general.support_email', 'company_email', 'general.company_email', 'email', 'store_email', 'contact_email') || '',
      support_phone: findVal('support_phone', 'general.support_phone', 'company_phone', 'general.company_phone', 'phone', 'mobile', 'store_phone') || '',
      hotline: findVal('hotline', 'general.hotline', 'company_hotline', 'general.company_hotline', 'unified_number', 'phone') || '',
      currency: findVal('currency', 'general.currency', 'currency_code', 'general.currency_code', 'default_currency') || 'SAR',
      currency_symbol: findVal('currency_symbol', 'general.currency_symbol', 'symbol') || 'ر.س',
      timezone: findVal('timezone', 'general.timezone', 'time_zone', 'general.time_zone', 'default_timezone') || 'Asia/Riyadh',

      shop_address_ar: findVal('shop_address_ar', 'location.shop_address_ar', 'address_ar', 'location.address_ar', 'shop_address', 'company_address', 'address', 'location.address') || '',
      shop_address_en: findVal('shop_address_en', 'location.shop_address_en', 'address_en', 'location.address_en', 'company_address_en', 'address', 'location.address') || '',
      address_ar: findVal('shop_address_ar', 'location.shop_address_ar', 'address_ar', 'location.address_ar', 'shop_address', 'company_address', 'address', 'location.address') || '',
      address_en: findVal('shop_address_en', 'location.shop_address_en', 'address_en', 'location.address_en', 'company_address_en', 'address', 'location.address') || '',
      city: findVal('city', 'location.city', 'city_ar', 'location.city_ar') || 'جدة',
      country: findVal('country', 'location.country', 'country_ar', 'location.country_ar') || 'المملكة العربية السعودية',
      latitude: findVal('latitude', 'location.latitude', 'lat', 'location.lat', 'location_lat') || '21.543333',
      longitude: findVal('longitude', 'location.longitude', 'lng', 'location.lng', 'location_lng', 'long') || '39.172778',
      google_map_embed_url: findVal('google_map_embed_url', 'location.google_map_embed_url', 'map_api_key', 'map_url', 'google_map_url') || '',

      logo_url: normalizeSettingsImageUrl(findVal('company_web_logo', 'web_logo', 'logo', 'store_logo', 'header_logo', 'media_logos.company_web_logo', 'media_logos.logo_url', 'media.logo_url')),
      mobile_logo_url: normalizeSettingsImageUrl(findVal('company_mobile_logo', 'mobile_logo', 'store_mobile_logo', 'media_logos.company_mobile_logo', 'media_logos.mobile_logo_url', 'media.mobile_logo_url')),
      footer_logo_url: normalizeSettingsImageUrl(findVal('company_footer_logo', 'footer_logo', 'store_footer_logo', 'media_logos.company_footer_logo', 'media_logos.footer_logo_url', 'media.footer_logo_url')),
      invoice_logo_url: normalizeSettingsImageUrl(findVal('company_invoice_logo', 'terms_and_condition_company_invoice_logo', 'invoice_logo', 'print_logo', 'media_logos.company_invoice_logo', 'media_logos.invoice_logo', 'media.company_invoice_logo', 'media_logos.invoice_logo_url', 'media.invoice_logo_url')),
      favicon_url: normalizeSettingsImageUrl(findVal('company_fav_icon', 'fav_icon', 'favicon', 'site_favicon', 'media_logos.company_fav_icon', 'media_logos.favicon_url', 'media.favicon_url')),
      loader_gif_url: normalizeSettingsImageUrl(findVal('loader_gif', 'loading_gif', 'preloader', 'loader', 'media_logos.loader_gif_url', 'media.loader_gif_url')),

      primary_color: findVal('primary_color', 'primary_color_code', 'colors.primary', 'colors.primary_color', 'branding_colors.primary_color', 'primary', 'main_color') || '#0B0E28',
      secondary_color: findVal('secondary_color', 'secondary_color_code', 'colors.secondary', 'colors.secondary_color', 'branding_colors.secondary_color', 'secondary') || '#FBBF24',
      accent_color: findVal('accent_color', 'accent_color_code', 'colors.accent', 'colors.accent_color', 'branding_colors.accent_color') || '#4F46E5',
      bg_color: findVal('bg_color', 'background_color', 'colors.bg_color', 'colors.background_color', 'branding_colors.bg_color') || '#F8F9FA',
      header_color: findVal('header_color', 'navbar_color', 'colors.header_color', 'branding_colors.header_color') || '#FFFFFF',
      footer_color: findVal('footer_color', 'footer_bg_color', 'colors.footer_color', 'branding_colors.footer_color') || '#0B0E28',

      copyright_text_ar: findVal('company_copyright_text_ar', 'legal.company_copyright_text_ar', 'copyright_text_ar', 'legal_compliance.copyright_text_ar', 'legal.copyright_text_ar', 'company_copyright_text', 'copyright', 'copyright_ar') || '',
      copyright_text_en: findVal('company_copyright_text_en', 'legal.company_copyright_text_en', 'copyright_text_en', 'legal_compliance.copyright_text_en', 'legal.copyright_text_en', 'copyright_en') || '',
      cookie_bar_status: parseBool(findVal('cookie_notice_enabled', 'legal.cookie_notice_enabled', 'cookie_bar_status', 'legal_compliance.cookie_bar_status', 'legal.cookie_bar_status', 'cookie_text_status', 'cookie_status'), true),
      cookie_bar_text_ar: findVal('cookie_notice_text_ar', 'legal.cookie_notice_text_ar', 'cookie_bar_text_ar', 'legal_compliance.cookie_bar_text_ar', 'legal.cookie_bar_text_ar', 'cookie_text', 'cookie_message_ar') || '',
      cookie_bar_text_en: findVal('cookie_notice_text_en', 'legal.cookie_notice_text_en', 'cookie_bar_text_en', 'legal_compliance.cookie_bar_text_en', 'legal.cookie_bar_text_en', 'cookie_message_en') || '',
      terms_url: findVal('terms_conditions_url', 'legal.terms_conditions_url', 'terms_url', 'legal_compliance.terms_url', 'legal.terms_url', 'terms_and_conditions_url', 'terms') || '/terms',
      privacy_url: findVal('privacy_policy_url', 'legal.privacy_policy_url', 'privacy_url', 'legal_compliance.privacy_url', 'legal.privacy_url', 'privacy_policy_url', 'privacy') || '/privacy',
      refund_url: findVal('refund_url', 'legal_compliance.refund_url', 'legal.refund_url', 'refund_policy_url', 'refund') || '/refund-policy',

      shipping_enabled: parseBool(findVal('shipping.shipping_enabled', 'shipping_delivery.shipping_enabled', 'shipping_enabled', 'shipping_method_status', 'shipping_status'), true),
      free_shipping_enabled: parseBool(findVal('shipping.free_delivery_status', 'shipping_delivery.free_delivery_status', 'free_delivery_status', 'shipping.free_shipping_enabled', 'shipping_delivery.free_shipping_enabled', 'free_shipping_enabled', 'free_shipping_status'), true),
      free_shipping_threshold: parseNum(findVal('shipping.free_delivery_over_amount', 'shipping_delivery.free_delivery_over_amount', 'free_delivery_over_amount', 'shipping.free_shipping_threshold', 'shipping_delivery.free_shipping_threshold', 'free_shipping_threshold', 'free_shipping_over'), 500),
      default_shipping_cost: parseNum(findVal('shipping.default_shipping_cost', 'shipping_delivery.default_shipping_cost', 'default_shipping_cost', 'shipping_charge', 'default_delivery_charge'), 25),
      estimated_delivery_days: findVal('shipping.estimated_delivery_days', 'shipping_delivery.estimated_delivery_days', 'estimated_delivery_days', 'estimated_delivery_time', 'delivery_time') || '1 - 2 أيام عمل',

      vat_enabled: parseBool(findVal('finance_taxes.vat_status', 'vat_status', 'finance_taxes.vat_enabled', 'finance.vat_status', 'finance.vat_enabled', 'financial.vat_enabled', 'vat_enabled', 'tax_status', 'tax_enabled'), true),
      vat_rate: parseNum(findVal('finance_taxes.vat_percentage', 'vat_percentage', 'finance_taxes.vat_rate', 'finance.vat_percentage', 'finance.vat_rate', 'financial.vat_rate', 'vat_rate', 'vat', 'tax_rate', 'tax_percentage', 'tax'), 15),
      prices_tax_inclusive: parseBool(findVal('finance_taxes.prices_include_tax', 'prices_include_tax', 'finance_taxes.prices_tax_inclusive', 'finance.prices_include_tax', 'finance.prices_tax_inclusive', 'prices_tax_inclusive', 'tax_inclusive', 'is_tax_included', 'price_include_tax'), true),
      tax_number: String(findVal('finance_taxes.tax_id_number', 'tax_id_number', 'finance_taxes.tax_number', 'finance.tax_id_number', 'finance.tax_number', 'tax_number', 'vat_number', 'vat_reg_no', 'tax_reg_no', 'tin') || '300123456789003'),

      backorder_enabled: parseBool(findVal('orders_inventory.allow_checkout_out_of_stock', 'allow_checkout_out_of_stock', 'orders_inventory.backorder_enabled', 'orders.allow_checkout_out_of_stock', 'orders.backorder_enabled', 'backorder_enabled', 'stock_limit_status', 'out_of_stock_sale'), false),
      min_order_amount: parseNum(findVal('orders_inventory.minimum_order_amount', 'minimum_order_amount', 'orders_inventory.min_order_amount', 'orders.minimum_order_amount', 'orders.min_order_amount', 'min_order_amount', 'min_order_value'), 0),
      default_order_status: findVal('orders_inventory.default_order_status', 'default_order_status', 'orders.default_order_status', 'order_status', 'initial_order_status') || 'pending',
      invoice_prefix: findVal('orders_inventory.invoice_prefix', 'invoice_prefix', 'orders.invoice_prefix', 'order_prefix', 'invoice_no_prefix') || 'ASW-',

      cod_enabled: codValue,
      cash_on_delivery: codValue,
      online_payment_enabled: digitalValue,
      digital_payment: digitalValue,
      tabby_enabled: tabbyValue,
      tabby: tabbyValue,
      tamara_enabled: tamaraValue,
      tamara: tamaraValue,
      moyasar_enabled: moyasarValue,
      sandbox_mode: isSandboxMode,
      payment_mode: isSandboxMode ? 'sandbox' : 'live',
      paymob_api_key: paymobKey,
      paymob_integration_id: paymobInteg,
      paymob_iframe_id: paymobIframe,
      active_gateways: activeGws,

      whatsapp_number: findVal('social_tracking.whatsapp_number', 'whatsapp_number', 'social.whatsapp_number', 'whatsapp', 'whatsapp_phone') || '+966559876543',
      whatsapp_chat_enabled: parseBool(findVal('social_tracking.whatsapp_chat_enabled', 'whatsapp_chat_enabled', 'social.whatsapp_chat_enabled', 'whatsapp_enabled'), true),
      facebook_url: findVal('social_tracking.facebook_url', 'facebook_url', 'social.facebook_url', 'facebook') || '',
      instagram_url: findVal('social_tracking.instagram_url', 'instagram_url', 'social.instagram_url', 'instagram') || '',
      twitter_url: findVal('social_tracking.twitter_url', 'twitter_url', 'social.twitter_url', 'twitter', 'x_url', 'x') || '',
      tiktok_url: findVal('social_tracking.tiktok_url', 'tiktok_url', 'social.tiktok_url', 'tiktok') || '',
      youtube_url: findVal('social_tracking.youtube_url', 'youtube_url', 'social.youtube_url', 'youtube') || '',
      snapchat_url: findVal('social_tracking.snapchat_url', 'snapchat_url', 'social.snapchat_url', 'snapchat') || '',
      ga_tracking_id: findVal('social_tracking.google_analytics_id', 'google_analytics_id', 'social_tracking.ga_tracking_id', 'ga_tracking_id', 'social.ga_tracking_id', 'google_tag_manager_id', 'google_analytics', 'ga_id') || '',
      google_analytics_id: findVal('social_tracking.google_analytics_id', 'google_analytics_id', 'social_tracking.ga_tracking_id', 'ga_tracking_id', 'social.ga_tracking_id', 'google_tag_manager_id', 'google_analytics', 'ga_id') || '',
      fb_pixel_id: findVal('social_tracking.facebook_pixel_id', 'facebook_pixel_id', 'social_tracking.fb_pixel_id', 'fb_pixel_id', 'social.fb_pixel_id', 'meta_pixel_id', 'pixel_id') || '',
      facebook_pixel_id: findVal('social_tracking.facebook_pixel_id', 'facebook_pixel_id', 'social_tracking.fb_pixel_id', 'fb_pixel_id', 'social.fb_pixel_id', 'meta_pixel_id', 'pixel_id') || '',
      tiktok_pixel_id: findVal('social_tracking.tiktok_pixel_id', 'tiktok_pixel_id', 'social.tiktok_pixel_id', 'tiktok_pixel') || '',
      download_app_apple_store: findVal('social_tracking.download_app_apple_store', 'download_app_apple_store', 'apple_store_url', 'ios_app_url', 'app_store') || '',
      download_app_google_store: findVal('social_tracking.download_app_google_store', 'download_app_google_store', 'google_play_url', 'android_app_url', 'play_store') || '',

      maintenance_mode: parseBool(findVal('store_management.maintenance_mode', 'maintenance_mode', 'store_management.maintenance_status', 'maintenance.maintenance_mode', 'maintenance_status', 'maintenance'), false),
      allow_admin_bypass: parseBool(findVal('store_management.allow_admin_bypass', 'allow_admin_bypass', 'maintenance.allow_admin_bypass'), true),
      maintenance_title_ar: findVal('store_management.maintenance_title_ar', 'maintenance_title_ar', 'maintenance.maintenance_title_ar', 'maintenance_title', 'title_ar') || 'المتجر تحت الصيانة والتطوير',
      maintenance_title_en: findVal('store_management.maintenance_title_en', 'maintenance_title_en', 'maintenance.maintenance_title_en', 'maintenance_title', 'title_en') || 'Store Under Maintenance',
      maintenance_message_ar: findVal('store_management.maintenance_message_ar', 'maintenance_message_ar', 'maintenance.maintenance_message_ar', 'maintenance_message', 'message_ar') || 'نقوم حالياً ببعض أعمال الصيانة والترقية لنقدم لكم تجربة تسوق أفضل. سنعود قريباً!',
      maintenance_message_en: findVal('store_management.maintenance_message_en', 'maintenance_message_en', 'maintenance.maintenance_message_en', 'maintenance_message', 'message_en') || 'We are currently upgrading our store for a better experience. We will be back shortly!',
      expected_back_date: findVal('store_management.maintenance_end_at', 'maintenance_end_at', 'store_management.expected_back_date', 'expected_back_date', 'maintenance.expected_back_date', 'maintenance_end_date', 'maintenance_until') || '',
      maintenance_end_at: findVal('store_management.maintenance_end_at', 'maintenance_end_at', 'store_management.expected_back_date', 'expected_back_date', 'maintenance.expected_back_date', 'maintenance_end_date', 'maintenance_until') || ''
    }
  }
}

