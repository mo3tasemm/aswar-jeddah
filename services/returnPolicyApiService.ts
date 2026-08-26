const getApiBaseUrl = (): string => {
  if (process.client) {
    try {
      const config = useRuntimeConfig()
      if (config?.public?.apiBase) {
        return (config.public.apiBase as string).replace(/\/$/, '')
      }
    } catch (e) {
      // Ignore outside setup
    }
  }
  return (process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1').replace(/\/$/, '')
}

export interface PolicyHighlightItem {
  id?: number | string
  icon?: string
  title?: string
  title_ar?: string
  title_en?: string
  desc?: string
  desc_ar?: string
  desc_en?: string
  description_ar?: string
  description_en?: string
}

export interface ReturnPolicyData {
  id?: number | string
  title?: string
  title_ar?: string
  title_en?: string
  translated_title?: string

  subtitle?: string
  subtitle_ar?: string
  subtitle_en?: string
  translated_subtitle?: string

  content?: string
  content_ar?: string
  content_en?: string
  translated_content?: string

  is_active?: boolean | number
  status?: boolean | number

  // Key Policy Highlights (4 Cards)
  highlight_1_icon?: string
  highlight_1_title_ar?: string
  highlight_1_title_en?: string
  highlight_1_desc_ar?: string
  highlight_1_desc_en?: string

  highlight_2_icon?: string
  highlight_2_title_ar?: string
  highlight_2_title_en?: string
  highlight_2_desc_ar?: string
  highlight_2_desc_en?: string

  highlight_3_icon?: string
  highlight_3_title_ar?: string
  highlight_3_title_en?: string
  highlight_3_desc_ar?: string
  highlight_3_desc_en?: string

  highlight_4_icon?: string
  highlight_4_title_ar?: string
  highlight_4_title_en?: string
  highlight_4_desc_ar?: string
  highlight_4_desc_en?: string

  highlights?: PolicyHighlightItem[]

  // Step-by-Step Return Process (4 Steps)
  steps_title_ar?: string
  steps_title_en?: string

  step_1_title_ar?: string
  step_1_title_en?: string
  step_1_desc_ar?: string
  step_1_desc_en?: string

  step_2_title_ar?: string
  step_2_title_en?: string
  step_2_desc_ar?: string
  step_2_desc_en?: string

  step_3_title_ar?: string
  step_3_title_en?: string
  step_3_desc_ar?: string
  step_3_desc_en?: string

  step_4_title_ar?: string
  step_4_title_en?: string
  step_4_desc_ar?: string
  step_4_desc_en?: string

  // Help & Contact CTA Box
  help_box_title_ar?: string
  help_box_title_en?: string
  help_box_desc_ar?: string
  help_box_desc_en?: string
  help_box_whatsapp?: string
  help_box_whatsapp_text_ar?: string
  help_box_whatsapp_text_en?: string
  help_box_contact_url?: string
  help_box_contact_text_ar?: string
  help_box_contact_text_en?: string

  // Legacy fields
  return_window_days?: number | string
  refund_timeframe_ar?: string
  refund_timeframe_en?: string
  shipping_coverage_ar?: string
  shipping_coverage_en?: string
  inspection_rule_ar?: string
  inspection_rule_en?: string

  // SEO & Meta
  meta_title?: string
  meta_title_ar?: string
  meta_title_en?: string
  meta_description?: string
  meta_description_ar?: string
  meta_description_en?: string
  created_at?: string
  updated_at?: string
}

export const returnPolicyApiService = {
  /**
   * 1. GET Public Return Policy Data
   */
  async fetchReturnPolicy(lang = 'ar', force = false): Promise<{ success: boolean; data: ReturnPolicyData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/return-policy`,
      `${apiBase}/return_policy`,
      `${apiBase}/refund-policy`,
      `${apiBase}/admin/return-policy`,
      `${apiBase}/admin/return_policy`
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

        if (response && (response.success || response.status === 200 || response.data || response.return_policy)) {
          const raw = response.data?.data || response.data || response.return_policy || response.policy || response
          return {
            success: true,
            data: this.normalizeReturnPolicy(raw, lang)
          }
        }
      } catch (err) {
        // Try next endpoint silently
      }
    }

    return {
      success: true,
      data: this.getDefaultReturnPolicy(lang)
    }
  },

  /**
   * 2. GET Admin Return Policy for Editing
   */
  async fetchAdminReturnPolicy(token: string): Promise<{ success: boolean; data: ReturnPolicyData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      `${apiBase}/admin/return-policy`,
      `${apiBase}/admin/return_policy`,
      `${apiBase}/return-policy`,
      `${apiBase}/return_policy`
    ]

    const headers: Record<string, string> = {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }

    for (const url of endpoints) {
      try {
        const response = await $fetch<any>(url, {
          method: 'GET',
          headers,
          params: { _t: Date.now() },
          timeout: 8000
        })

        if (response && (response.success || response.status === 200 || response.data || response.return_policy)) {
          const raw = response.data?.data || response.data || response.return_policy || response.policy || response
          return {
            success: true,
            data: this.normalizeReturnPolicy(raw, 'ar')
          }
        }
      } catch (err) {
        // Try next endpoint
      }
    }

    return {
      success: true,
      data: this.getDefaultReturnPolicy('ar')
    }
  },

  /**
   * 3. POST / PUT Update Admin Return Policy
   */
  async updateAdminReturnPolicy(token: string, payload: FormData | Record<string, any>): Promise<{ success: boolean; message?: string; data?: ReturnPolicyData }> {
    const apiBase = getApiBaseUrl()
    const endpoints = [
      { url: `${apiBase}/admin/return-policy`, method: 'POST' },
      { url: `${apiBase}/admin/return-policy`, method: 'PUT' },
      { url: `${apiBase}/admin/return_policy`, method: 'POST' },
      { url: `${apiBase}/admin/return_policy`, method: 'PUT' }
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
          const raw = json.data?.data || json.data || json.return_policy || json.policy || json.item || json
          return {
            success: true,
            message: json.message || json.data?.message || 'تم حفظ وتحديث سياسة الاستبدال والاسترجاع بنجاح!',
            data: this.normalizeReturnPolicy(raw, 'ar')
          }
        } else if (!response.ok) {
          lastError = json
        }
      } catch (err: any) {
        lastError = err
      }
    }

    if (lastError) {
      console.error('[returnPolicyApiService] updateAdminReturnPolicy error:', lastError)
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
  normalizeReturnPolicy(raw: any, lang = 'ar'): ReturnPolicyData {
    if (!raw || typeof raw !== 'object') {
      return this.getDefaultReturnPolicy(lang)
    }

    let item = raw
    if (item.data && typeof item.data === 'object' && !Array.isArray(item.data)) {
      item = item.data
    }
    if (item.return_policy && typeof item.return_policy === 'object') {
      item = item.return_policy
    }
    if (item.policy && typeof item.policy === 'object') {
      item = item.policy
    }

    // Highlights parsing
    let highlights: PolicyHighlightItem[] = []
    if (Array.isArray(item.highlights)) {
      highlights = item.highlights
    } else if (typeof item.highlights === 'string') {
      try {
        const parsed = JSON.parse(item.highlights)
        if (Array.isArray(parsed)) highlights = parsed
      } catch (e) {}
    }

    return {
      id: item.id || 1,
      title: item.title || item.title_ar || item.name || 'سياسة الاستبدال والاسترجاع',
      title_ar: item.title_ar || item.title || 'سياسة الاستبدال والاسترجاع',
      title_en: item.title_en || item.name_en || 'Return & Refund Policy',
      translated_title: lang === 'en' ? (item.title_en || item.title || 'Return & Refund Policy') : (item.title_ar || item.title || 'سياسة الاستبدال والاسترجاع'),

      subtitle: item.subtitle || item.subtitle_ar || 'حرصاً على رضاكم، نوفر لكم سياسة استبدال واسترجاع مرنة وسريعة وفق الأنظمة المعتمدة في المملكة العربية السعودية.',
      subtitle_ar: item.subtitle_ar || item.subtitle || 'حرصاً على رضاكم، نوفر لكم سياسة استبدال واسترجاع مرنة وسريعة وفق الأنظمة المعتمدة في المملكة العربية السعودية.',
      subtitle_en: item.subtitle_en || 'To ensure your complete satisfaction, we provide a flexible and transparent return & refund policy aligned with Saudi regulations.',
      translated_subtitle: lang === 'en' ? (item.subtitle_en || item.subtitle) : (item.subtitle_ar || item.subtitle),

      content: item.content || item.content_ar || item.description || this.getDefaultContent('ar'),
      content_ar: item.content_ar || item.content || item.description_ar || this.getDefaultContent('ar'),
      content_en: item.content_en || item.description_en || this.getDefaultContent('en'),
      translated_content: lang === 'en' ? (item.content_en || item.content || this.getDefaultContent('en')) : (item.content_ar || item.content || this.getDefaultContent('ar')),

      is_active: item.is_active !== undefined ? (item.is_active === 1 || item.is_active === true || item.is_active === '1') : true,
      status: item.status !== undefined ? (item.status === 1 || item.status === true || item.status === '1') : true,

      // 4 Top Highlight Cards
      highlight_1_icon: item.highlight_1_icon || 'fa-solid fa-clock-rotate-left',
      highlight_1_title_ar: item.highlight_1_title_ar || 'مهلة استرجاع 14 يوماً',
      highlight_1_title_en: item.highlight_1_title_en || '14-Day Return Window',
      highlight_1_desc_ar: item.highlight_1_desc_ar || 'يمكنك استرجاع أو استبدال المنتج خلال 14 يوماً من تاريخ استلام الشحنة.',
      highlight_1_desc_en: item.highlight_1_desc_en || 'Return or exchange your items within 14 days of receipt with ease.',

      highlight_2_icon: item.highlight_2_icon || 'fa-solid fa-box-open',
      highlight_2_title_ar: item.highlight_2_title_ar || 'تغليف المصنع الأصلي',
      highlight_2_title_en: item.highlight_2_title_en || 'Original Packaging',
      highlight_2_desc_ar: item.highlight_2_desc_ar || 'يشترط أن يكون الجهاز غير مستخدم وبكافة ملحقاته وتغليفه الأصلي.',
      highlight_2_desc_en: item.highlight_2_desc_en || 'Products must be unused with all original accessories and packaging intact.',

      highlight_3_icon: item.highlight_3_icon || 'fa-solid fa-money-bill-transfer',
      highlight_3_title_ar: item.highlight_3_title_ar || 'استرداد نقدي سريع',
      highlight_3_title_en: item.highlight_3_title_en || 'Fast Refund Processing',
      highlight_3_desc_ar: item.highlight_3_desc_ar || 'يتم استرجاع المبالغ لنفس وسيلة الدفع خلال 3 إلى 7 أيام عمل.',
      highlight_3_desc_en: item.highlight_3_desc_en || 'Refunds issued directly to original payment method within 3-7 business days.',

      highlight_4_icon: item.highlight_4_icon || 'fa-solid fa-shield-halved',
      highlight_4_title_ar: item.highlight_4_title_ar || 'استبدال فوري للعيوب',
      highlight_4_title_en: item.highlight_4_title_en || 'Instant Defect Exchange',
      highlight_4_desc_ar: item.highlight_4_desc_ar || 'شحن مجاني واستبدال فوري إذا وجد أي عيب مصنعي في الجهاز.',
      highlight_4_desc_en: item.highlight_4_desc_en || 'Free replacement shipping for any factory defects verified by our team.',

      // Step-by-Step Return Process
      steps_title_ar: item.steps_title_ar || 'كيف تبدأ طلب الاسترجاع؟',
      steps_title_en: item.steps_title_en || 'How to Request a Return?',

      step_1_title_ar: item.step_1_title_ar || '1. تقديم الطلب',
      step_1_title_en: item.step_1_title_en || '1. Submit Request',
      step_1_desc_ar: item.step_1_desc_ar || 'تواصل معنا عبر الواتساب أو صفحة التواصل وزودنا برقم طلبك.',
      step_1_desc_en: item.step_1_desc_en || 'Contact our team via WhatsApp with your Order ID.',

      step_2_title_ar: item.step_2_title_ar || '2. استلام الشحنة',
      step_2_title_en: item.step_2_title_en || '2. Courier Pickup',
      step_2_desc_ar: item.step_2_desc_ar || 'يصلك مندوب شركة الشحن لاستلام الجهاز بتغليفه الأصلي.',
      step_2_desc_en: item.step_2_desc_en || 'We arrange a pickup from your address.',

      step_3_title_ar: item.step_3_title_ar || '3. الفحص الفني',
      step_3_title_en: item.step_3_title_en || '3. Quality Check',
      step_3_desc_ar: item.step_3_desc_ar || 'يقوم الفريق بفحص الجهاز والتأكد من سلامة الرقم التسلسلي.',
      step_3_desc_en: item.step_3_desc_en || 'Our technical team verifies the item condition.',

      step_4_title_ar: item.step_4_title_ar || '4. الاسترداد أو الاستبدال',
      step_4_title_en: item.step_4_title_en || '4. Fast Refund',
      step_4_desc_ar: item.step_4_desc_ar || 'يتم إيداع المبلغ في حسابك البنكي أو شحن البديل فوراً.',
      step_4_desc_en: item.step_4_desc_en || 'Refund transferred to your card in 3-7 days.',

      // Help & Contact CTA Box
      help_box_title_ar: item.help_box_title_ar || 'تحتاج مساعدة بخصوص طلبك؟',
      help_box_title_en: item.help_box_title_en || 'Need Help with a Return?',
      help_box_desc_ar: item.help_box_desc_ar || 'فريق خدمة العملاء جاهز لمساعدتكم والإجابة على استفساراتكم على مدار الساعة.',
      help_box_desc_en: item.help_box_desc_en || 'Our support specialists are available 24/7 to assist you.',
      help_box_whatsapp: item.help_box_whatsapp || 'https://wa.me/966500000000',
      help_box_whatsapp_text_ar: item.help_box_whatsapp_text_ar || 'محادثة عبر الواتساب',
      help_box_whatsapp_text_en: item.help_box_whatsapp_text_en || 'Chat on WhatsApp',
      help_box_contact_url: item.help_box_contact_url || '/contact-us',
      help_box_contact_text_ar: item.help_box_contact_text_ar || 'تواصل مع الدعم الفني',
      help_box_contact_text_en: item.help_box_contact_text_en || 'Contact Support',

      // Legacy fields
      return_window_days: item.return_window_days || item.return_period || 14,
      refund_timeframe_ar: item.refund_timeframe_ar || '3 - 7 أيام عمل',
      refund_timeframe_en: item.refund_timeframe_en || '3 - 7 Business Days',
      shipping_coverage_ar: item.shipping_coverage_ar || 'مجاني بالكامل في حال وجود عيب مصنعي أو خطأ بالطلب',
      shipping_coverage_en: item.shipping_coverage_en || '100% Free if defective or damaged upon arrival',
      inspection_rule_ar: item.inspection_rule_ar || 'يجب أن يكون المنتج بحالته الأصلية وبتغليف المصنع',
      inspection_rule_en: item.inspection_rule_en || 'Product must be in original condition with factory packaging',

      highlights,

      meta_title: item.meta_title || item.meta_title_ar || '',
      meta_title_ar: item.meta_title_ar || item.meta_title || '',
      meta_title_en: item.meta_title_en || '',

      meta_description: item.meta_description || item.meta_description_ar || '',
      meta_description_ar: item.meta_description_ar || item.meta_description || '',
      meta_description_en: item.meta_description_en || '',

      created_at: item.created_at || '',
      updated_at: item.updated_at || ''
    }
  },

  /**
   * Fallback data for Return Policy
   */
  getDefaultReturnPolicy(lang = 'ar'): ReturnPolicyData {
    const isEn = lang === 'en'
    return {
      id: 1,
      title: isEn ? 'Return & Refund Policy' : 'سياسة الاستبدال والاسترجاع',
      title_ar: 'سياسة الاستبدال والاسترجاع',
      title_en: 'Return & Refund Policy',
      translated_title: isEn ? 'Return & Refund Policy' : 'سياسة الاستبدال والاسترجاع',

      subtitle: isEn 
        ? 'Shop with complete peace of mind. We offer transparent and fast returns across Saudi Arabia.' 
        : 'تسوق بكل طمأنينة وراحة بال. نوفر لك سياسة استرجاع واستبدال واضحة وميسرة في كافة أنحاء المملكة.',
      subtitle_ar: 'تسوق بكل طمأنينة وراحة بال. نوفر لك سياسة استرجاع واستبدال واضحة وميسرة في كافة أنحاء المملكة.',
      subtitle_en: 'Shop with complete peace of mind. We offer transparent and fast returns across Saudi Arabia.',
      translated_subtitle: isEn 
        ? 'Shop with complete peace of mind. We offer transparent and fast returns across Saudi Arabia.' 
        : 'تسوق بكل طمأنينة وراحة بال. نوفر لك سياسة استرجاع واستبدال واضحة وميسرة في كافة أنحاء المملكة.',

      content_ar: this.getDefaultContent('ar'),
      content_en: this.getDefaultContent('en'),
      content: isEn ? this.getDefaultContent('en') : this.getDefaultContent('ar'),
      translated_content: isEn ? this.getDefaultContent('en') : this.getDefaultContent('ar'),

      is_active: true,
      status: true,

      // 4 Highlights Defaults
      highlight_1_icon: 'fa-solid fa-clock-rotate-left',
      highlight_1_title_ar: 'مهلة استرجاع 14 يوماً',
      highlight_1_title_en: '14-Day Return Window',
      highlight_1_desc_ar: 'يمكنك استرجاع أو استبدال المنتج خلال 14 يوماً من تاريخ استلام الشحنة.',
      highlight_1_desc_en: 'Return or exchange your items within 14 days of delivery.',

      highlight_2_icon: 'fa-solid fa-box-open',
      highlight_2_title_ar: 'تغليف المصنع الأصلي',
      highlight_2_title_en: 'Original Packaging',
      highlight_2_desc_ar: 'يشترط أن يكون الجهاز غير مستخدم وبكافة ملحقاته وتغليفه الأصلي.',
      highlight_2_desc_en: 'Products must be unused with all original accessories intact.',

      highlight_3_icon: 'fa-solid fa-money-bill-transfer',
      highlight_3_title_ar: 'استرداد نقدي سريع',
      highlight_3_title_en: 'Fast Refund Processing',
      highlight_3_desc_ar: 'يتم استرجاع المبالغ لنفس وسيلة الدفع خلال 3 إلى 7 أيام عمل.',
      highlight_3_desc_en: 'Refunds issued directly to original payment method in 3-7 days.',

      highlight_4_icon: 'fa-solid fa-shield-halved',
      highlight_4_title_ar: 'استبدال فوري للعيوب',
      highlight_4_title_en: 'Instant Defect Exchange',
      highlight_4_desc_ar: 'شحن مجاني واستبدال فوري إذا وجد أي عيب مصنعي في الجهاز.',
      highlight_4_desc_en: 'Free replacement shipping for any verified factory defects.',

      // Step-by-Step Defaults
      steps_title_ar: 'كيف تبدأ طلب الاسترجاع؟',
      steps_title_en: 'How to Request a Return?',

      step_1_title_ar: '1. تقديم الطلب',
      step_1_title_en: '1. Submit Request',
      step_1_desc_ar: 'تواصل معنا عبر الواتساب أو صفحة التواصل وزودنا برقم طلبك.',
      step_1_desc_en: 'Contact our team via WhatsApp with your Order ID.',

      step_2_title_ar: '2. استلام الشحنة',
      step_2_title_en: '2. Courier Pickup',
      step_2_desc_ar: 'يصلك مندوب شركة الشحن لاستلام الجهاز بتغليفه الأصلي.',
      step_2_desc_en: 'We arrange a pickup from your address.',

      step_3_title_ar: '3. الفحص الفني',
      step_3_title_en: '3. Quality Check',
      step_3_desc_ar: 'يقوم الفريق بفحص الجهاز والتأكد من سلامة الرقم التسلسلي.',
      step_3_desc_en: 'Our technical team verifies the item condition.',

      step_4_title_ar: '4. الاسترداد أو الاستبدال',
      step_4_title_en: '4. Fast Refund',
      step_4_desc_ar: 'يتم إيداع المبلغ في حسابك البنكي أو شحن البديل فوراً.',
      step_4_desc_en: 'Refund transferred to your card in 3-7 days.',

      // Help Box Defaults
      help_box_title_ar: 'تحتاج مساعدة بخصوص طلبك؟',
      help_box_title_en: 'Need Help with a Return?',
      help_box_desc_ar: 'فريق خدمة العملاء جاهز لمساعدتكم والإجابة على استفساراتكم على مدار الساعة.',
      help_box_desc_en: 'Our support specialists are available 24/7 to assist you.',
      help_box_whatsapp: 'https://wa.me/966500000000',
      help_box_whatsapp_text_ar: 'محادثة عبر الواتساب',
      help_box_whatsapp_text_en: 'Chat on WhatsApp',
      help_box_contact_url: '/contact-us',
      help_box_contact_text_ar: 'تواصل مع الدعم الفني',
      help_box_contact_text_en: 'Contact Support',

      return_window_days: 14,
      refund_timeframe_ar: '3 - 7 أيام عمل',
      refund_timeframe_en: '3 - 7 Business Days',
      shipping_coverage_ar: 'مجاني بالكامل في حال وجود عيب مصنعي أو خطأ بالطلب',
      shipping_coverage_en: '100% Free if defective or damaged upon arrival',
      inspection_rule_ar: 'يجب أن يكون المنتج بحالته الأصلية وبتغليف المصنع',
      inspection_rule_en: 'Product must be in original condition with factory packaging',
      meta_title: '',
      meta_title_ar: 'سياسة الاستبدال والاسترجاع | متجر أسوار جدة',
      meta_title_en: 'Return & Refund Policy | Aswar Jeddah',
      meta_description: '',
      meta_description_ar: 'تعرف على شروط وسياسة الاستبدال والاسترجاع الميسرة لدينا وضمان استرداد أموالك بسرعة وأمان.',
      meta_description_en: 'Learn more about return & refund policy at Aswar Jeddah store with transparent procedures.'
    }
  },

  /**
   * Rich text default content
   */
  getDefaultContent(lang = 'ar'): string {
    if (lang === 'en') {
      return `
<h3>1. Return & Exchange Eligibility</h3>
<p>At <strong>Aswar Jeddah</strong>, we are committed to providing the highest quality electronic and home appliances. If you are not completely satisfied with your purchase, you may request a return or exchange within <strong>14 days</strong> from the delivery date.</p>

<h3>2. Conditions for Return</h3>
<ul>
  <li>The product must be in its original, sealed factory condition with all tags, serial numbers, warranty cards, and accessories included.</li>
  <li>Items must not show any signs of misuse, physical damage, scratches, or unauthorized technical modifications.</li>
  <li>Personal hygiene items, opened software, or customized items cannot be returned unless a confirmed factory defect is present.</li>
</ul>

<h3>3. Defective or Damaged Products</h3>
<p>If you receive a damaged or malfunctioning device, please notify our customer care team within <strong>48 hours</strong> of delivery. We will arrange a free courier pickup and provide an instant replacement or a full refund including shipping fees.</p>

<h3>4. Refund Process & Timelines</h3>
<p>Once your returned item arrives at our inspection facility and passes the quality assessment:</p>
<ul>
  <li><strong>Credit Card / Mada / Apple Pay:</strong> Refund will be credited back to the original card within 3 to 7 business days (depending on your bank).</li>
  <li><strong>Installments (Tabby / Tamara):</strong> Your payment schedule will be adjusted or refunded directly through the provider.</li>
</ul>

<h3>5. How to Initiate a Return</h3>
<p>You can start a return easily through your account dashboard or by contacting our technical support via WhatsApp or email with your Order ID.</p>
`
    }

    return `
<h3>1. شروط وأحكام الاسترجاع والاستبدال</h3>
<p>في <strong>شركة أسوار جدة</strong>، نسعى دائماً لتقديم أفضل تجربة تسوق للأجهزة الكهربائية والحلول التقنية والمنزلية. إذا لم تكن راضياً تماماً عن مشترياتك، يمكنك طلب الاستبدال أو الاسترجاع خلال <strong>14 يوماً</strong> من تاريخ استلام الطلب وفقاً لاشتراطات وزارة التجارة وحماية المستهلك في المملكة.</p>

<h3>2. الحالات التي يحق فيها الاسترجاع</h3>
<ul>
  <li>أن يكون المنتج بحالته الأصلية غير مفتوح وبنفس تغليف المصنع مع وجود كافة الكتيبات والملحقات والهدايا المرفقة.</li>
  <li>وجود عيب مصنعي أو خلل فني في الجهاز عند الاستلام (يتم الإبلاغ عنه خلال 48 ساعة لفحصه واستبداله فوراً).</li>
  <li>استلام منتج مختلف عن المنتج المطلوب عن طريق الخطأ (يتم استبداله وشحنه مجاناً بالكامل).</li>
</ul>

<h3>3. المنتجات المستثناة من الاسترجاع</h3>
<ul>
  <li>المنتجات التي تم استخدامها أو فتح تغليفها الحامي (إلا في حال وجود عيب مصنعي مشمول بالضمان).</li>
  <li>البرمجيات والبطاقات الرقمية والأكواد بعد كشطها أو تفعيلها.</li>
  <li>منتجات العناية الشخصية والأجهزة التي تم العبث بأرقامها التسلسلية أو ملصقات الضمان الخاصة بها.</li>
</ul>

<h3>4. آلية وطرق استرداد الأموال (Refund Policy)</h3>
<p>بعد وصول المنتج المرتجع إلى مستودعاتنا والتأكد من مطابقته لشروط الاسترجاع عبر فريق الفحص الفني:</p>
<ul>
  <li><strong>البطاقات البنكية (مدى / فيزا / ماستركارد / Apple Pay):</strong> يتم إعادة المبلغ تلقائياً إلى نفس البطاقة المستخدمة خلال 3 إلى 7 أيام عمل (حسب سياسة البنك المصدر).</li>
  <li><strong>خيارات التقسيط (تابي / تمارا):</strong> يتم إلغاء الأقساط المتبقية واسترداد الدفعات المسددة مباشرة عبر بوابة مزود الخدمة.</li>
</ul>

<h3>5. خطوات تقديم طلب الاسترجاع</h3>
<p>يمكنكم رفع طلب الاسترجاع بكل سهولة عبر التواصل مع خدمة العملاء من خلال الواتساب أو صفحة "اتصل بنا" مع تزويدنا برقم الطلب وفيديو/صورة توضيحية في حال وجود عيب مصنعي.</p>
`
  }
}
