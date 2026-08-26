import { ref, reactive, computed } from 'vue'
import { returnPolicyApiService, type ReturnPolicyData } from '~/services/returnPolicyApiService'
import { useLanguage } from '~/composables/useLanguage'
import { useToast } from '~/composables/useToast'
import { useAdminAuth } from '~/composables/useAdminAuth'

const STORAGE_KEY = 'aswar_return_policy_data_v2'

export const useReturnPolicy = () => {
  const { currentLanguage } = useLanguage()
  const toast = useToast()
  const { adminToken, adminCookie } = useAdminAuth()

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // Global reactive state shared across Admin & Public pages
  const policyData = useState<ReturnPolicyData>('aswar_global_return_policy_data', () => {
    return returnPolicyApiService.getDefaultReturnPolicy(currentLanguage?.value || 'ar')
  })

  const isLoading = ref(false)
  const isSubmitting = ref(false)

  // Reactive form for Admin editing
  const form = reactive<ReturnPolicyData>({
    title_ar: '',
    title_en: '',
    subtitle_ar: '',
    subtitle_en: '',
    content_ar: '',
    content_en: '',
    is_active: true,

    // 4 Highlights
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

    // Step-by-Step Return Guide
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

    // Help & Contact CTA Box
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

    // SEO
    meta_title_ar: '',
    meta_title_en: '',
    meta_description_ar: '',
    meta_description_en: ''
  })

  // Helper to load cached data
  const getCachedData = (): ReturnPolicyData | null => {
    if (!process.client) return null
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      return null
    }
  }

  // Helper to persist cached data
  const setCachedData = (data: ReturnPolicyData) => {
    if (!process.client) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch (e) {}
  }

  // 1. Fetch Public Return Policy
  const fetchPublicReturnPolicy = async (force = false) => {
    isLoading.value = true
    try {
      const cached = getCachedData()
      if (cached && !force) {
        policyData.value = cached
      }

      const res = await returnPolicyApiService.fetchReturnPolicy(currentLanguage?.value || 'ar', force)
      if (res?.data) {
        policyData.value = res.data
        setCachedData(res.data)
      }
      return policyData.value
    } catch (err) {
      console.error('[useReturnPolicy] fetchPublicReturnPolicy error:', err)
      return policyData.value
    } finally {
      isLoading.value = false
    }
  }

  // 2. Fetch Admin Return Policy for Editing
  const fetchAdminReturnPolicy = async () => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await returnPolicyApiService.fetchAdminReturnPolicy(token)
      if (res?.data) {
        policyData.value = res.data
        Object.assign(form, res.data)
        setCachedData(res.data)
      }
    } catch (err: any) {
      console.error('[useReturnPolicy] fetchAdminReturnPolicy error:', err)
      const cached = getCachedData()
      if (cached) {
        policyData.value = cached
        Object.assign(form, cached)
      }
    } finally {
      isLoading.value = false
    }
  }

  // 3. Save Admin Return Policy
  const submitAdminReturnPolicy = async () => {
    isSubmitting.value = true
    try {
      const token = getToken()

      const payload: Record<string, any> = {
        _method: 'PUT',
        title_ar: form.title_ar || 'سياسة الاستبدال والاسترجاع',
        title_en: form.title_en || 'Return & Refund Policy',
        title: form.title_ar || form.title_en || 'سياسة الاستبدال والاسترجاع',

        subtitle_ar: form.subtitle_ar || '',
        subtitle_en: form.subtitle_en || '',
        subtitle: form.subtitle_ar || form.subtitle_en || '',

        content_ar: form.content_ar || '',
        content_en: form.content_en || '',
        content: form.content_ar || form.content_en || '',
        description_ar: form.content_ar || '',
        description_en: form.content_en || '',

        is_active: form.is_active ? 1 : 0,
        status: form.is_active ? 1 : 0,

        // 4 Highlights
        highlight_1_icon: form.highlight_1_icon || 'fa-solid fa-clock-rotate-left',
        highlight_1_title_ar: form.highlight_1_title_ar || 'مهلة استرجاع 14 يوماً',
        highlight_1_title_en: form.highlight_1_title_en || '14-Day Return Window',
        highlight_1_desc_ar: form.highlight_1_desc_ar || '',
        highlight_1_desc_en: form.highlight_1_desc_en || '',

        highlight_2_icon: form.highlight_2_icon || 'fa-solid fa-box-open',
        highlight_2_title_ar: form.highlight_2_title_ar || 'تغليف المصنع الأصلي',
        highlight_2_title_en: form.highlight_2_title_en || 'Original Packaging',
        highlight_2_desc_ar: form.highlight_2_desc_ar || '',
        highlight_2_desc_en: form.highlight_2_desc_en || '',

        highlight_3_icon: form.highlight_3_icon || 'fa-solid fa-money-bill-transfer',
        highlight_3_title_ar: form.highlight_3_title_ar || 'استرداد نقدي سريع',
        highlight_3_title_en: form.highlight_3_title_en || 'Fast Refund Processing',
        highlight_3_desc_ar: form.highlight_3_desc_ar || '',
        highlight_3_desc_en: form.highlight_3_desc_en || '',

        highlight_4_icon: form.highlight_4_icon || 'fa-solid fa-shield-halved',
        highlight_4_title_ar: form.highlight_4_title_ar || 'استبدال فوري للعيوب',
        highlight_4_title_en: form.highlight_4_title_en || 'Instant Defect Exchange',
        highlight_4_desc_ar: form.highlight_4_desc_ar || '',
        highlight_4_desc_en: form.highlight_4_desc_en || '',

        // Step-by-Step Return Guide
        steps_title_ar: form.steps_title_ar || 'كيف تبدأ طلب الاسترجاع؟',
        steps_title_en: form.steps_title_en || 'How to Request a Return?',

        step_1_title_ar: form.step_1_title_ar || '1. تقديم الطلب',
        step_1_title_en: form.step_1_title_en || '1. Submit Request',
        step_1_desc_ar: form.step_1_desc_ar || '',
        step_1_desc_en: form.step_1_desc_en || '',

        step_2_title_ar: form.step_2_title_ar || '2. استلام الشحنة',
        step_2_title_en: form.step_2_title_en || '2. Courier Pickup',
        step_2_desc_ar: form.step_2_desc_ar || '',
        step_2_desc_en: form.step_2_desc_en || '',

        step_3_title_ar: form.step_3_title_ar || '3. الفحص الفني',
        step_3_title_en: form.step_3_title_en || '3. Quality Check',
        step_3_desc_ar: form.step_3_desc_ar || '',
        step_3_desc_en: form.step_3_desc_en || '',

        step_4_title_ar: form.step_4_title_ar || '4. الاسترداد أو الاستبدال',
        step_4_title_en: form.step_4_title_en || '4. Fast Refund',
        step_4_desc_ar: form.step_4_desc_ar || '',
        step_4_desc_en: form.step_4_desc_en || '',

        // Help & Contact CTA Box
        help_box_title_ar: form.help_box_title_ar || 'تحتاج مساعدة بخصوص طلبك؟',
        help_box_title_en: form.help_box_title_en || 'Need Help with a Return?',
        help_box_desc_ar: form.help_box_desc_ar || '',
        help_box_desc_en: form.help_box_desc_en || '',
        help_box_whatsapp: form.help_box_whatsapp || 'https://wa.me/966500000000',
        help_box_whatsapp_text_ar: form.help_box_whatsapp_text_ar || 'محادثة عبر الواتساب',
        help_box_whatsapp_text_en: form.help_box_whatsapp_text_en || 'Chat on WhatsApp',
        help_box_contact_url: form.help_box_contact_url || '/contact-us',
        help_box_contact_text_ar: form.help_box_contact_text_ar || 'تواصل مع الدعم الفني',
        help_box_contact_text_en: form.help_box_contact_text_en || 'Contact Support',

        // SEO
        meta_title_ar: form.meta_title_ar || form.meta_title || '',
        meta_title_en: form.meta_title_en || '',
        meta_title: form.meta_title_ar || form.meta_title || '',

        meta_description_ar: form.meta_description_ar || form.meta_description || '',
        meta_description_en: form.meta_description_en || '',
        meta_description: form.meta_description_ar || form.meta_description || ''
      }

      // Also support FormData for Laravel controllers
      const fd = new FormData()
      Object.entries(payload).forEach(([k, v]) => {
        fd.append(k, String(v))
      })

      const res = await returnPolicyApiService.updateAdminReturnPolicy(token, fd)

      if (res?.success) {
        policyData.value = {
          ...form,
          ...(res.data || {})
        }
        Object.assign(form, policyData.value)
        setCachedData(policyData.value)

        // Clear Nuxt cache and notify all tabs
        if (process.client) {
          try {
            clearNuxtData('return-policy-public')
            refreshNuxtData('return-policy-public')
          } catch (e) {}
          try {
            window.dispatchEvent(new CustomEvent('aswar:return-policy-updated', { detail: policyData.value }))
          } catch (e) {}
        }

        toast.success(res.message || 'تم حفظ وتحديث سياسة الاستبدال والاسترجاع بنجاح!')
        return { success: true }
      } else {
        throw new Error(res?.message || 'فشل حفظ التعديلات')
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || 'حدث خطأ أثناء حفظ السياسة')
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  // Computed display properties for public page
  const displayTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.title_en || policyData.value.title_ar || policyData.value.title || 'Return & Refund Policy')
      : (policyData.value.title_ar || policyData.value.title || policyData.value.title_en || 'سياسة الاستبدال والاسترجاع')
  })

  const displaySubtitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.subtitle_en || policyData.value.subtitle_ar || policyData.value.subtitle || 'Shop with complete peace of mind with our transparent return rules.')
      : (policyData.value.subtitle_ar || policyData.value.subtitle || policyData.value.subtitle_en || 'تسوق بكل طمأنينة وراحة بال وفق أنظمة وزارة التجارة وحماية المستهلك.')
  })

  const displayContent = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.content_en || policyData.value.content_ar || policyData.value.content || '')
      : (policyData.value.content_ar || policyData.value.content || policyData.value.content_en || '')
  })

  const displayHighlights = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return [
      {
        id: 1,
        icon: d.highlight_1_icon || 'fa-solid fa-clock-rotate-left',
        title: isEn ? (d.highlight_1_title_en || '14-Day Return Window') : (d.highlight_1_title_ar || 'مهلة استرجاع 14 يوماً'),
        desc: isEn ? (d.highlight_1_desc_en || 'Return or exchange your items within 14 days from delivery.') : (d.highlight_1_desc_ar || 'يمكنك استرجاع أو استبدال المنتج خلال 14 يوماً من تاريخ استلام الشحنة.')
      },
      {
        id: 2,
        icon: d.highlight_2_icon || 'fa-solid fa-box-open',
        title: isEn ? (d.highlight_2_title_en || 'Original Packaging') : (d.highlight_2_title_ar || 'تغليف المصنع الأصلي'),
        desc: isEn ? (d.highlight_2_desc_en || 'Products must be unused with all original accessories intact.') : (d.highlight_2_desc_ar || 'يشترط أن يكون الجهاز غير مستخدم وبكافة ملحقاته وتغليفه الأصلي.')
      },
      {
        id: 3,
        icon: d.highlight_3_icon || 'fa-solid fa-money-bill-transfer',
        title: isEn ? (d.highlight_3_title_en || 'Fast Refund Processing') : (d.highlight_3_title_ar || 'استرداد نقدي سريع'),
        desc: isEn ? (d.highlight_3_desc_en || 'Refunds issued directly to original payment method in 3-7 days.') : (d.highlight_3_desc_ar || 'يتم استرجاع المبالغ لنفس وسيلة الدفع خلال 3 إلى 7 أيام عمل.')
      },
      {
        id: 4,
        icon: d.highlight_4_icon || 'fa-solid fa-shield-halved',
        title: isEn ? (d.highlight_4_title_en || 'Instant Defect Exchange') : (d.highlight_4_title_ar || 'استبدال فوري للعيوب'),
        desc: isEn ? (d.highlight_4_desc_en || 'Free replacement shipping for any verified factory defects.') : (d.highlight_4_desc_ar || 'شحن مجاني واستبدال فوري إذا وجد أي عيب مصنعي في الجهاز.')
      }
    ]
  })

  const displayStepsTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.steps_title_en || 'How to Request a Return?')
      : (policyData.value.steps_title_ar || 'كيف تبدأ طلب الاسترجاع؟')
  })

  const displaySteps = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return [
      {
        number: 1,
        title: isEn ? (d.step_1_title_en || '1. Submit Request') : (d.step_1_title_ar || '1. تقديم الطلب'),
        desc: isEn ? (d.step_1_desc_en || 'Contact our team via WhatsApp with your Order ID.') : (d.step_1_desc_ar || 'تواصل معنا عبر الواتساب أو صفحة التواصل وزودنا برقم طلبك.')
      },
      {
        number: 2,
        title: isEn ? (d.step_2_title_en || '2. Courier Pickup') : (d.step_2_title_ar || '2. استلام الشحنة'),
        desc: isEn ? (d.step_2_desc_en || 'We arrange a pickup from your address.') : (d.step_2_desc_ar || 'يصلك مندوب شركة الشحن لاستلام الجهاز بتغليفه الأصلي.')
      },
      {
        number: 3,
        title: isEn ? (d.step_3_title_en || '3. Quality Check') : (d.step_3_title_ar || '3. الفحص الفني'),
        desc: isEn ? (d.step_3_desc_en || 'Our technical team verifies the item condition.') : (d.step_3_desc_ar || 'يقوم الفريق بفحص الجهاز والتأكد من سلامة الرقم التسلسلي.')
      },
      {
        number: 4,
        title: isEn ? (d.step_4_title_en || '4. Fast Refund') : (d.step_4_title_ar || '4. الاسترداد أو الاستبدال'),
        desc: isEn ? (d.step_4_desc_en || 'Refund transferred to your card in 3-7 days.') : (d.step_4_desc_ar || 'يتم إيداع المبلغ في حسابك البنكي أو شحن البديل فوراً.')
      }
    ]
  })

  const displayHelpBox = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return {
      title: isEn ? (d.help_box_title_en || 'Need Help with a Return?') : (d.help_box_title_ar || 'تحتاج مساعدة بخصوص طلبك؟'),
      desc: isEn ? (d.help_box_desc_en || 'Our support specialists are available 24/7 to assist you.') : (d.help_box_desc_ar || 'فريق خدمة العملاء جاهز لمساعدتكم والإجابة على استفساراتكم.'),
      whatsapp: d.help_box_whatsapp || 'https://wa.me/966500000000',
      whatsappBtn: isEn ? (d.help_box_whatsapp_text_en || 'Chat on WhatsApp') : (d.help_box_whatsapp_text_ar || 'محادثة عبر الواتساب'),
      contactUrl: d.help_box_contact_url || '/contact-us',
      contactBtn: isEn ? (d.help_box_contact_text_en || 'Contact Support') : (d.help_box_contact_text_ar || 'تواصل مع الدعم الفني')
    }
  })

  return {
    policyData,
    form,
    isLoading,
    isSubmitting,
    fetchPublicReturnPolicy,
    fetchAdminReturnPolicy,
    submitAdminReturnPolicy,
    displayTitle,
    displaySubtitle,
    displayContent,
    displayHighlights,
    displayStepsTitle,
    displaySteps,
    displayHelpBox
  }
}
