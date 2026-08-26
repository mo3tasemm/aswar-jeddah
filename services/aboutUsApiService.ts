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

export interface StoreValueItem {
  id?: number | string
  icon?: string
  title_ar?: string
  title_en?: string
  title?: string
  desc_ar?: string
  desc_en?: string
  description_ar?: string
  description_en?: string
  description?: string
}

export interface AboutUsData {
  id?: number | string
  title?: string
  title_ar?: string
  title_en?: string
  translated_title?: string
  subtitle?: string
  subtitle_ar?: string
  subtitle_en?: string
  translated_subtitle?: string

  story_title?: string
  story_title_ar?: string
  story_title_en?: string
  story_content?: string
  story_content_ar?: string
  story_content_en?: string
  story_image?: string
  story_image_full_url?: string

  vision_title?: string
  vision_title_ar?: string
  vision_title_en?: string
  vision_content?: string
  vision_content_ar?: string
  vision_content_en?: string

  mission_title?: string
  mission_title_ar?: string
  mission_title_en?: string
  mission_content?: string
  mission_content_ar?: string
  mission_content_en?: string

  banner_image?: string
  banner_image_full_url?: string

  // Stats Counters & Labels (Fully Dynamic)
  stats_customers?: string | number
  stats_customers_label_ar?: string
  stats_customers_label_en?: string
  stats_customers_icon?: string

  stats_products?: string | number
  stats_products_label_ar?: string
  stats_products_label_en?: string
  stats_products_icon?: string

  stats_experience?: string | number
  stats_experience_label_ar?: string
  stats_experience_label_en?: string
  stats_experience_icon?: string

  stats_awards?: string | number
  stats_awards_label_ar?: string
  stats_awards_label_en?: string
  stats_awards_icon?: string

  stats_warranty?: string | number
  stats_excellence?: string | number
  stats_satisfaction?: string | number

  // Store Commitments / Values
  features_badge?: string
  features_badge_ar?: string
  features_badge_en?: string

  features_title?: string
  features_title_ar?: string
  features_title_en?: string

  values?: StoreValueItem[]

  feature_1_title_ar?: string
  feature_1_title_en?: string
  feature_1_desc_ar?: string
  feature_1_desc_en?: string
  feature_1_icon?: string

  feature_2_title_ar?: string
  feature_2_title_en?: string
  feature_2_desc_ar?: string
  feature_2_desc_en?: string
  feature_2_icon?: string

  feature_3_title_ar?: string
  feature_3_title_en?: string
  feature_3_desc_ar?: string
  feature_3_desc_en?: string
  feature_3_icon?: string

  feature_4_title_ar?: string
  feature_4_title_en?: string
  feature_4_desc_ar?: string
  feature_4_desc_en?: string
  feature_4_icon?: string

  // CTA Section
  cta_title_ar?: string
  cta_title_en?: string
  cta_desc_ar?: string
  cta_desc_en?: string
  cta_btn_ar?: string
  cta_btn_en?: string
  cta_url?: string

  meta_title?: string
  meta_description?: string
  created_at?: string
  updated_at?: string
}

export const aboutUsApiService = {
  /**
   * 1. GET Public About Us Data (supports lang parameter, cache-busting, and Accept-Language header)
   */
  async fetchAboutUs(lang = 'ar', force = false): Promise<{ success: boolean; data: AboutUsData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/about-us`,
      `${apiBase}/about_us`,
      `${apiBase}/admin/about-us`,
      `${apiBase}/admin/about_us`
    ]

    const params: Record<string, any> = { lang }
    if (force || process.client) {
      params._t = Date.now()
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'Accept-Language': lang === 'en' ? 'en' : 'ar',
      'X-localization': lang === 'en' ? 'EN' : 'sa',
      'lang': lang === 'en' ? 'EN' : 'sa',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          params,
          headers,
          timeout: 8000
        })

        const raw = response?.data?.data || response?.data || response?.about_us || response?.item || response
        if (raw && typeof raw === 'object') {
          return {
            success: true,
            data: this.normalizeAboutUs(raw, lang)
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    // Default fallback data if API returns empty
    return {
      success: true,
      data: this.getDefaultAboutUs(lang)
    }
  },

  /**
   * 2. GET Admin About Us Data
   */
  async fetchAdminAboutUs(token: string, force = false): Promise<{ success: boolean; data: AboutUsData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/about-us`,
      `${apiBase}/admin/about_us`,
      `${apiBase}/about-us`,
      `${apiBase}/about_us`
    ]

    const params: Record<string, any> = {}
    if (force || process.client) {
      params._t = Date.now()
    }

    const headers: Record<string, string> = {
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-localization': 'sa',
      'lang': 'sa',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          params,
          headers,
          timeout: 10000
        })

        const raw = response?.data?.data || response?.data || response?.about_us || response?.item || response
        if (raw && typeof raw === 'object') {
          return {
            success: true,
            data: this.normalizeAboutUs(raw, 'ar')
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    return {
      success: true,
      data: this.getDefaultAboutUs('ar')
    }
  },

  /**
   * Resolve Image URL to absolute full URL
   */
  resolveImageUrl(img: any): string {
    if (!img) return ''
    if (typeof img === 'object') {
      if (img.full_url) return this.resolveImageUrl(img.full_url)
      if (img.url) return this.resolveImageUrl(img.url)
      if (img.path) return this.resolveImageUrl(img.path)
      if (img.src) return this.resolveImageUrl(img.src)
    }
    const str = String(img).trim()
    if (!str || str === 'null' || str === 'undefined') return ''
    if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('blob:') || str.startsWith('data:')) {
      return str
    }
    const apiBase = getApiBaseUrl()
    const baseHost = apiBase.replace(/\/api\/v1\/?$/, '')
    const cleanPath = str.replace(/^\/+/, '')
    if (cleanPath.startsWith('storage/')) {
      return `${baseHost}/${cleanPath}`
    }
    return `${baseHost}/storage/${cleanPath}`
  },

  /**
   * Upload an image to the dedicated admin upload endpoint
   */
  async uploadImage(file: File, token: string): Promise<{ success: boolean; url: string; full_url: string; path?: string }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/upload-image`,
      `${apiBase}/admin/media/upload`,
      `${apiBase}/admin/upload`,
      `${apiBase}/upload-image`,
      `${apiBase}/media/upload`
    ]

    const fd = new FormData()
    fd.append('image', file)
    fd.append('file', file)

    let lastError: any = null

    for (const url of endpoints) {
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: fd
        })

        const json = await response.json().catch(() => ({}))
        if (response.ok && (json.success !== false || json.status === 'success' || json.data || json.url || json.path || json.image)) {
          const payload = json.data || json
          const rawUrl = typeof payload === 'string'
            ? payload
            : (payload.url || payload.full_url || payload.path || payload.image || payload.file || '')

          const fullUrl = this.resolveImageUrl(payload.full_url || rawUrl || payload)
          return {
            success: true,
            url: rawUrl || fullUrl,
            full_url: fullUrl || rawUrl,
            path: payload.path || rawUrl
          }
        } else if (!response.ok) {
          lastError = json
        }
      } catch (err: any) {
        lastError = err
      }
    }

    console.warn('[aboutUsApiService] uploadImage failed on all endpoints:', lastError)
    throw new Error(lastError?.message || lastError?.data?.message || 'فشل رفع الصورة على الخادم')
  },

  /**
   * 3. POST / PUT Update Admin About Us (FormData or JSON)
   */
  async updateAdminAboutUs(token: string, payload: FormData | Record<string, any>): Promise<{ success: boolean; message?: string; data?: AboutUsData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      { url: `${apiBase}/admin/about-us`, method: 'POST' },
      { url: `${apiBase}/admin/about-us`, method: 'PUT' },
      { url: `${apiBase}/admin/about_us`, method: 'POST' },
      { url: `${apiBase}/admin/about_us`, method: 'PUT' }
    ]

    const isFd = payload instanceof FormData
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest'
    }

    let body: any = payload
    if (!isFd) {
      headers['Content-Type'] = 'application/json'
      body = JSON.stringify(payload)
    }

    let lastError: any = null

    for (const ep of endpoints) {
      try {
        const response = await fetch(ep.url, {
          method: ep.method,
          headers,
          body
        })

        const json = await response.json().catch(() => ({}))
        if (response.ok && (json.success !== false || json.status === 'success' || json.data)) {
          const raw = json.data?.data || json.data || json.about_us || json.item || json
          return {
            success: true,
            message: json.message || json.data?.message || 'تم حفظ وتحديث بيانات صفحة من نحن بنجاح!',
            data: this.normalizeAboutUs(raw, 'ar')
          }
        } else if (!response.ok) {
          lastError = json
        }
      } catch (err: any) {
        lastError = err
      }
    }

    if (lastError) {
      console.error('[aboutUsApiService] updateAdminAboutUs error:', lastError)
      throw new Error(lastError?.message || lastError?.data?.message || 'تعذر حفظ التعديلات')
    }

    return {
      success: true,
      message: 'تم حفظ التعديلات بنجاح'
    }
  },

  /**
   * Normalizes server response
   */
  normalizeAboutUs(raw: any, lang = 'ar'): AboutUsData {
    if (!raw || typeof raw !== 'object') {
      return this.getDefaultAboutUs(lang)
    }

    // Unwrap if nested
    let item = raw
    if (item.data && typeof item.data === 'object' && !Array.isArray(item.data)) {
      item = item.data
    }
    if (item.about_us && typeof item.about_us === 'object') {
      item = item.about_us
    }

    const banner_image = item.banner_image || item.banner || ''
    const banner_image_full_url = this.resolveImageUrl(item.banner_image_full_url || item.banner_image || item.banner_full_url || item.banner)

    const story_image = item.story_image || item.image || ''
    const story_image_full_url = this.resolveImageUrl(item.story_image_full_url || item.story_image || item.story_full_url || item.image_full_url || item.image)

    // Values parsing
    let values: StoreValueItem[] = []
    if (Array.isArray(item.values)) {
      values = item.values.map((v: any, idx: number) => ({
        id: v.id || idx + 1,
        icon: v.icon || v.icon_class || 'fa-solid fa-star',
        title_ar: v.title_ar || v.title || '',
        title_en: v.title_en || v.title || '',
        title: lang === 'en' ? (v.title_en || v.title || v.title_ar) : (v.title_ar || v.title || v.title_en),
        desc_ar: v.desc_ar || v.description_ar || v.desc || v.description || '',
        desc_en: v.desc_en || v.description_en || v.desc || v.description || '',
        description: lang === 'en' ? (v.desc_en || v.description_en || v.desc || v.description) : (v.desc_ar || v.description_ar || v.desc || v.description)
      }))
    } else if (typeof item.values === 'string') {
      try {
        const parsed = JSON.parse(item.values)
        if (Array.isArray(parsed)) {
          values = parsed
        }
      } catch (e) {
        // ignore
      }
    }

    return {
      id: item.id || 1,
      title: item.title || item.title_ar || item.name || 'عن أسوار جدة',
      title_ar: item.title_ar || item.title || 'عن أسوار جدة',
      title_en: item.title_en || item.name_en || 'About Aswar Jeddah',
      translated_title: lang === 'en' ? (item.title_en || item.title || 'About Aswar Jeddah') : (item.title_ar || item.title || 'عن أسوار جدة'),

      subtitle: item.subtitle || item.subtitle_ar || 'وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة',
      subtitle_ar: item.subtitle_ar || item.subtitle || 'وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة',
      subtitle_en: item.subtitle_en || 'Your leading destination for tech, appliances and smart solutions in KSA',
      translated_subtitle: lang === 'en' ? (item.subtitle_en || item.subtitle) : (item.subtitle_ar || item.subtitle),

      story_title: item.story_title || item.story_title_ar || 'قصة نجاحنا وشغفنا',
      story_title_ar: item.story_title_ar || item.story_title || 'قصة نجاحنا وشغفنا',
      story_title_en: item.story_title_en || 'Our Story & Passion',
      story_content: item.story_content || item.story_content_ar || '<p>تأسست أسوار جدة برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>',
      story_content_ar: item.story_content_ar || item.story_content || '<p>تأسست أسوار جدة برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>',
      story_content_en: item.story_content_en || '<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and security solutions with certified quality and warranty across the Kingdom.</p>',
      story_image,
      story_image_full_url,

      vision_title: item.vision_title || item.vision_title_ar || 'رؤيتنا',
      vision_title_ar: item.vision_title_ar || item.vision_title || 'رؤيتنا',
      vision_title_en: item.vision_title_en || 'Our Vision',
      vision_content: item.vision_content || item.vision_content_ar || 'أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.',
      vision_content_ar: item.vision_content_ar || item.vision_content || 'أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.',
      vision_content_en: item.vision_content_en || 'To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies.',

      mission_title: item.mission_title || item.mission_title_ar || 'رسالتنا',
      mission_title_ar: item.mission_title_ar || item.mission_title || 'رسالتنا',
      mission_title_en: item.mission_title_en || 'Our Mission',
      mission_content: item.mission_content || item.mission_content_ar || 'توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.',
      mission_content_ar: item.mission_content_ar || item.mission_content || 'توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.',
      mission_content_en: item.mission_content_en || 'Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties.',

      banner_image,
      banner_image_full_url,

      // Dynamic Stats Counters
      stats_customers: item.stats_customers || item.stats?.customers || item.stats_1_value || '25,000+',
      stats_customers_label_ar: item.stats_customers_label_ar || item.stats_1_title_ar || 'عميل سعيد وموثوق',
      stats_customers_label_en: item.stats_customers_label_en || item.stats_1_title_en || 'Satisfied Customers',
      stats_customers_icon: item.stats_customers_icon || item.stats_1_icon || 'fa-solid fa-users',

      stats_products: item.stats_products || item.stats?.products || item.stats_2_value || '1,500+',
      stats_products_label_ar: item.stats_products_label_ar || item.stats_2_title_ar || 'منتج أصلي معتمد',
      stats_products_label_en: item.stats_products_label_en || item.stats_2_title_en || 'Certified Products',
      stats_products_icon: item.stats_products_icon || item.stats_2_icon || 'fa-solid fa-boxes-stacked',

      stats_experience: item.stats_experience || item.stats?.experience || item.stats_3_value || '10+',
      stats_experience_label_ar: item.stats_experience_label_ar || item.stats_3_title_ar || 'سنوات من الخبرة',
      stats_experience_label_en: item.stats_experience_label_en || item.stats_3_title_en || 'Years of Experience',
      stats_experience_icon: item.stats_experience_icon || item.stats_3_icon || 'fa-solid fa-award',

      stats_awards: item.stats_awards || item.stats?.awards || item.stats_warranty || item.stats_4_value || '100%',
      stats_awards_label_ar: item.stats_awards_label_ar || item.stats_4_title_ar || 'ضمان وجودة معتمدة',
      stats_awards_label_en: item.stats_awards_label_en || item.stats_4_title_en || 'Warranty & Quality',
      stats_awards_icon: item.stats_awards_icon || item.stats_4_icon || 'fa-solid fa-shield',

      stats_warranty: item.stats_warranty || item.stats_awards || '100%',
      stats_excellence: item.stats_excellence || '99.8%',
      stats_satisfaction: item.stats_satisfaction || '99%',

      // Features / Why Choose Us
      features_badge_ar: item.features_badge_ar || 'التزاماتنا لعملائنا',
      features_badge_en: item.features_badge_en || 'Store Commitments',
      features_title_ar: item.features_title_ar || 'لماذا يفضل العملاء التسوق معنا؟',
      features_title_en: item.features_title_en || 'Why Shop With Aswar Jeddah?',

      values,

      feature_1_title_ar: item.feature_1_title_ar || values[0]?.title_ar || 'منتجات أصلية 100%',
      feature_1_title_en: item.feature_1_title_en || values[0]?.title_en || '100% Genuine Products',
      feature_1_desc_ar: item.feature_1_desc_ar || values[0]?.desc_ar || values[0]?.description_ar || 'نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة',
      feature_1_desc_en: item.feature_1_desc_en || values[0]?.desc_en || values[0]?.description_en || 'Direct from certified brands and authorized distributors',
      feature_1_icon: item.feature_1_icon || values[0]?.icon || 'fa-solid fa-shield',

      feature_2_title_ar: item.feature_2_title_ar || values[1]?.title_ar || 'شحن سريع وآمن',
      feature_2_title_en: item.feature_2_title_en || values[1]?.title_en || 'Fast Kingdom Shipping',
      feature_2_desc_ar: item.feature_2_desc_ar || values[1]?.desc_ar || values[1]?.description_ar || 'توصيل موثوق ومحمي لكافة مدن ومناطق المملكة',
      feature_2_desc_en: item.feature_2_desc_en || values[1]?.desc_en || values[1]?.description_en || 'Reliable door-to-door delivery across all regions of KSA',
      feature_2_icon: item.feature_2_icon || values[1]?.icon || 'fa-solid fa-truck-fast',

      feature_3_title_ar: item.feature_3_title_ar || values[2]?.title_ar || 'طرق دفع متعددة وآمنة',
      feature_3_title_en: item.feature_3_title_en || values[2]?.title_en || 'Secure Payment Options',
      feature_3_desc_ar: item.feature_3_desc_ar || values[2]?.desc_ar || values[2]?.description_ar || 'مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر',
      feature_3_desc_en: item.feature_3_desc_en || values[2]?.desc_en || values[2]?.description_en || 'Support for Mada, Apple Pay, Visa, and installments',
      feature_3_icon: item.feature_3_icon || values[2]?.icon || 'fa-solid fa-credit-card',

      feature_4_title_ar: item.feature_4_title_ar || values[3]?.title_ar || 'خدمة عملاء متخصصة',
      feature_4_title_en: item.feature_4_title_en || values[3]?.title_en || 'Dedicated Support',
      feature_4_desc_ar: item.feature_4_desc_ar || values[3]?.desc_ar || values[3]?.description_ar || 'فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم',
      feature_4_desc_en: item.feature_4_desc_en || values[3]?.desc_en || values[3]?.description_en || 'Our technical support team is ready to assist you anytime',
      feature_4_icon: item.feature_4_icon || values[3]?.icon || 'fa-solid fa-headset',

      // CTA Banner
      cta_title_ar: item.cta_title_ar || 'اكتشف آلاف الأجهزة والحلول التقنية المعتمدة',
      cta_title_en: item.cta_title_en || 'Discover Thousands of Verified Products',
      cta_desc_ar: item.cta_desc_ar || 'تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.',
      cta_desc_en: item.cta_desc_en || 'Shop with complete peace of mind with our official warranties.',
      cta_btn_ar: item.cta_btn_ar || 'تسوق المنتجات الآن',
      cta_btn_en: item.cta_btn_en || 'Browse All Products',
      cta_url: item.cta_url || '/shop',

      meta_title: item.meta_title || '',
      meta_description: item.meta_description || ''
    }
  },

  /**
   * Fallback data
   */
  getDefaultAboutUs(lang = 'ar'): AboutUsData {
    const isEn = lang === 'en'
    return {
      id: 1,
      title: isEn ? 'About Aswar Jeddah' : 'عن أسوار جدة',
      title_ar: 'عن أسوار جدة',
      title_en: 'About Aswar Jeddah',
      translated_title: isEn ? 'About Aswar Jeddah' : 'عن أسوار جدة',
      subtitle: isEn ? 'Your leading destination for smart tech, security & home appliances' : 'وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة',
      subtitle_ar: 'وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة',
      subtitle_en: 'Your leading destination for smart tech, security & home appliances',
      translated_subtitle: isEn ? 'Your leading destination for smart tech, security & home appliances' : 'وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة',

      story_title: isEn ? 'Our Story & Passion' : 'قصة نجاحنا وشغفنا',
      story_title_ar: 'قصة نجاحنا وشغفنا',
      story_title_en: 'Our Story & Passion',
      story_content: isEn
        ? '<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and smart solutions with certified quality and warranty across the Kingdom. We take pride in serving thousands of satisfied customers with unmatched care.</p>'
        : '<p>تأسست <strong>أسوار جدة</strong> برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p><p>نحرص دائماً على اختيار أفضل العلامات التجارية العالمية وتقديم خدمات دعم فني وضمان متكامل بعد البيع لضمان رضاكم الدائم.</p>',
      story_content_ar: '<p>تأسست <strong>أسوار جدة</strong> برؤية طموحة تهدف إلى تقديم أفضل المنتجات التقنية والأجهزة المنزلية وحلول الأمن المتطورة بأعلى معايير الجودة والضمان المعتمد وبأسعار تنافسية تلبي تطلعات عملائنا في كافة أرجاء المملكة.</p>',
      story_content_en: '<p>Aswar Jeddah was founded with an ambitious vision to provide premium technology, home appliances, and smart solutions with certified quality and warranty across the Kingdom.</p>',
      story_image: '',
      story_image_full_url: '',

      vision_title: isEn ? 'Our Vision' : 'رؤيتنا',
      vision_title_ar: 'رؤيتنا',
      vision_title_en: 'Our Vision',
      vision_content: isEn
        ? 'To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies and smart living.'
        : 'أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.',
      vision_content_ar: 'أن نكون الخيار الأول والموثوق لكل منزل وشركة في المملكة عند البحث عن التكنولوجيا الحديثة والأجهزة المبتكرة.',
      vision_content_en: 'To be the first and most trusted choice for every home and business in the Kingdom seeking innovative technologies and smart living.',

      mission_title: isEn ? 'Our Mission' : 'رسالتنا',
      mission_title_ar: 'رسالتنا',
      mission_title_en: 'Our Mission',
      mission_content: isEn
        ? 'Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties.'
        : 'توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.',
      mission_content_ar: 'توفير تجربة تسوق إلكترونية سلسة وموثوقة، مع تقديم منتجات أصلية 100%، وخدمة عملاء استثنائية، وضمان حقيقي يضمن راحة بال العميل.',
      mission_content_en: 'Delivering a seamless shopping experience with 100% genuine products, exceptional customer service, and certified warranties.',

      banner_image: '',
      banner_image_full_url: '',

      // Dynamic Stats Counters Defaults
      stats_customers: '25,000+',
      stats_customers_label_ar: 'عميل سعيد وموثوق',
      stats_customers_label_en: 'Satisfied Customers',
      stats_customers_icon: 'fa-solid fa-users',

      stats_products: '1,500+',
      stats_products_label_ar: 'منتج أصلي معتمد',
      stats_products_label_en: 'Certified Products',
      stats_products_icon: 'fa-solid fa-boxes-stacked',

      stats_experience: '10+',
      stats_experience_label_ar: 'سنوات من الخبرة',
      stats_experience_label_en: 'Years of Experience',
      stats_experience_icon: 'fa-solid fa-award',

      stats_awards: '100%',
      stats_awards_label_ar: 'ضمان وجودة معتمدة',
      stats_awards_label_en: 'Warranty & Quality',
      stats_awards_icon: 'fa-solid fa-shield',

      stats_warranty: '100%',
      stats_excellence: '99.8%',
      stats_satisfaction: '99%',

      // Features
      features_badge_ar: 'التزاماتنا لعملائنا',
      features_badge_en: 'Store Commitments',
      features_title_ar: 'لماذا يفضل العملاء التسوق معنا؟',
      features_title_en: 'Why Shop With Aswar Jeddah?',

      values: [],

      feature_1_title_ar: 'منتجات أصلية 100%',
      feature_1_title_en: '100% Genuine Products',
      feature_1_desc_ar: 'نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة',
      feature_1_desc_en: 'Direct from certified brands and authorized distributors',
      feature_1_icon: 'fa-solid fa-shield',

      feature_2_title_ar: 'شحن سريع وآمن',
      feature_2_title_en: 'Fast Kingdom Shipping',
      feature_2_desc_ar: 'توصيل موثوق ومحمي لكافة مدن ومناطق المملكة',
      feature_2_desc_en: 'Reliable door-to-door delivery across all regions of KSA',
      feature_2_icon: 'fa-solid fa-truck-fast',

      feature_3_title_ar: 'طرق دفع متعددة وآمنة',
      feature_3_title_en: 'Secure Payment Options',
      feature_3_desc_ar: 'مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر',
      feature_3_desc_en: 'Support for Mada, Apple Pay, Visa, and installments',
      feature_3_icon: 'fa-solid fa-credit-card',

      feature_4_title_ar: 'خدمة عملاء متخصصة',
      feature_4_title_en: 'Dedicated Support',
      feature_4_desc_ar: 'فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم',
      feature_4_desc_en: 'Our technical support team is ready to assist you anytime',
      feature_4_icon: 'fa-solid fa-headset',

      // CTA
      cta_title_ar: 'اكتشف آلاف الأجهزة والحلول التقنية المعتمدة',
      cta_title_en: 'Discover Thousands of Verified Products',
      cta_desc_ar: 'تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.',
      cta_desc_en: 'Shop with complete peace of mind with our official warranties.',
      cta_btn_ar: 'تسوق المنتجات الآن',
      cta_btn_en: 'Browse All Products',
      cta_url: '/shop'
    }
  }
}
