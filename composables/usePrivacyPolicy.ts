/**
 * Privacy Policy Composable (usePrivacyPolicy)
 * Manages reactive state for public storefront and admin dashboard.
 * Includes global state persistence, cache invalidation, and multi-language support.
 */

import { ref, reactive, computed } from 'vue'
import { useState, clearNuxtData, refreshNuxtData } from '#imports'
import { privacyPolicyApiService, type PrivacyPolicyData } from '~/services/privacyPolicyApiService'
import { useLanguage } from '~/composables/useLanguage'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

const LOCAL_STORAGE_KEY = 'aswar_custom_privacy_policy_data'

export const usePrivacyPolicy = () => {
  const { currentLanguage } = useLanguage()
  const { adminToken, adminCookie } = useAdminAuth()
  const toast = useToast()

  const getCachedData = (): Partial<PrivacyPolicyData> | null => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (cached) return JSON.parse(cached)
      } catch (e) {}
    }
    return null
  }

  const setCachedData = (data: PrivacyPolicyData) => {
    if (process.client) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      } catch (e) {}
    }
  }

  // Global shared state across entire application
  const policyData = useState<PrivacyPolicyData>('aswar_global_privacy_policy_data', () => {
    const cached = getCachedData()
    if (cached) {
      return { ...privacyPolicyApiService.getDefaultPrivacyPolicy('ar'), ...cached }
    }
    return privacyPolicyApiService.getDefaultPrivacyPolicy('ar')
  })

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Admin Form State
  const form = reactive<PrivacyPolicyData>({
    ...privacyPolicyApiService.getDefaultPrivacyPolicy('ar')
  })

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // 1. Fetch for Public Storefront
  const fetchPublicPrivacyPolicy = async (force = true) => {
    isLoading.value = true
    try {
      const lang = currentLanguage?.value || 'ar'
      const res = await privacyPolicyApiService.fetchPrivacyPolicy(lang, force)

      if (res?.success && res.data) {
        policyData.value = {
          ...privacyPolicyApiService.getDefaultPrivacyPolicy(lang),
          ...res.data
        }
        setCachedData(policyData.value)
      } else {
        const cached = getCachedData()
        if (cached) {
          policyData.value = { ...privacyPolicyApiService.getDefaultPrivacyPolicy(lang), ...cached }
        }
      }
    } catch (err) {
      console.warn('[usePrivacyPolicy] Failed to fetch public privacy policy:', err)
      const cached = getCachedData()
      if (cached) {
        policyData.value = { ...privacyPolicyApiService.getDefaultPrivacyPolicy('ar'), ...cached }
      }
    } finally {
      isLoading.value = false
    }
    return policyData.value
  }

  // 2. Fetch for Admin Manager
  const fetchAdminPrivacyPolicy = async () => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await privacyPolicyApiService.fetchAdminPrivacyPolicy(token, true)

      const def = privacyPolicyApiService.getDefaultPrivacyPolicy('ar')
      if (res?.success && res.data) {
        const data = res.data
        policyData.value = {
          ...def,
          ...data
        }

        // Fill missing fields with defaults so inputs are never empty
        Object.keys(def).forEach((k) => {
          const val = (policyData.value as any)[k]
          if (val === undefined || val === null || val === '') {
            (policyData.value as any)[k] = (def as any)[k]
          }
        })

        Object.assign(form, policyData.value)
        setCachedData(policyData.value)
      } else {
        const cached = getCachedData()
        if (cached) {
          policyData.value = { ...def, ...cached }
          Object.assign(form, policyData.value)
        } else {
          policyData.value = { ...def }
          Object.assign(form, def)
        }
      }
    } catch (err) {
      console.warn('[usePrivacyPolicy] Failed to fetch admin privacy policy:', err)
      const def = privacyPolicyApiService.getDefaultPrivacyPolicy('ar')
      const cached = getCachedData()
      if (cached) {
        policyData.value = { ...def, ...cached }
        Object.assign(form, policyData.value)
      } else {
        policyData.value = { ...def }
        Object.assign(form, def)
      }
    } finally {
      isLoading.value = false
    }
    return policyData.value
  }

  // 3. Save Admin Privacy Policy
  const submitAdminPrivacyPolicy = async () => {
    isSubmitting.value = true
    try {
      const token = getToken()

      const payload: Record<string, any> = {
        _method: 'PUT',
        title_ar: form.title_ar || 'سياسة الخصوصية والشروط والأحكام',
        title_en: form.title_en || 'Privacy Policy & Terms of Service',
        title: form.title_ar || form.title_en || 'سياسة الخصوصية والشروط والأحكام',

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

        // Badges
        badge_1_icon: form.badge_1_icon || 'fa-solid fa-shield-halved',
        badge_1_title_ar: form.badge_1_title_ar || '',
        badge_1_title_en: form.badge_1_title_en || '',
        badge_1_desc_ar: form.badge_1_desc_ar || '',
        badge_1_desc_en: form.badge_1_desc_en || '',

        badge_2_icon: form.badge_2_icon || 'fa-solid fa-user-lock',
        badge_2_title_ar: form.badge_2_title_ar || '',
        badge_2_title_en: form.badge_2_title_en || '',
        badge_2_desc_ar: form.badge_2_desc_ar || '',
        badge_2_desc_en: form.badge_2_desc_en || '',

        badge_3_icon: form.badge_3_icon || 'fa-solid fa-building-shield',
        badge_3_title_ar: form.badge_3_title_ar || '',
        badge_3_title_en: form.badge_3_title_en || '',
        badge_3_desc_ar: form.badge_3_desc_ar || '',
        badge_3_desc_en: form.badge_3_desc_en || '',

        badge_4_icon: form.badge_4_icon || 'fa-solid fa-sliders',
        badge_4_title_ar: form.badge_4_title_ar || '',
        badge_4_title_en: form.badge_4_title_en || '',
        badge_4_desc_ar: form.badge_4_desc_ar || '',
        badge_4_desc_en: form.badge_4_desc_en || '',

        // Summary
        summary_title_ar: form.summary_title_ar || '',
        summary_title_en: form.summary_title_en || '',
        summary_point_1_ar: form.summary_point_1_ar || '',
        summary_point_1_en: form.summary_point_1_en || '',
        summary_point_2_ar: form.summary_point_2_ar || '',
        summary_point_2_en: form.summary_point_2_en || '',
        summary_point_3_ar: form.summary_point_3_ar || '',
        summary_point_3_en: form.summary_point_3_en || '',

        // Inquiries
        inquiry_title_ar: form.inquiry_title_ar || '',
        inquiry_title_en: form.inquiry_title_en || '',
        inquiry_desc_ar: form.inquiry_desc_ar || '',
        inquiry_desc_en: form.inquiry_desc_en || '',
        inquiry_contact_url: form.inquiry_contact_url || '/contact-us',
        inquiry_contact_btn_ar: form.inquiry_contact_btn_ar || '',
        inquiry_contact_btn_en: form.inquiry_contact_btn_en || '',
        inquiry_whatsapp_url: form.inquiry_whatsapp_url || 'https://wa.me/966500000000',
        inquiry_whatsapp_btn_ar: form.inquiry_whatsapp_btn_ar || '',
        inquiry_whatsapp_btn_en: form.inquiry_whatsapp_btn_en || '',

        meta_title_ar: form.meta_title_ar || form.meta_title || '',
        meta_title_en: form.meta_title_en || '',
        meta_title: form.meta_title_ar || form.meta_title || '',

        meta_description_ar: form.meta_description_ar || form.meta_description || '',
        meta_description_en: form.meta_description_en || '',
        meta_description: form.meta_description_ar || form.meta_description || ''
      }

      // Also support FormData
      const fd = new FormData()
      Object.entries(payload).forEach(([k, v]) => {
        fd.append(k, String(v))
      })

      const res = await privacyPolicyApiService.updateAdminPrivacyPolicy(token, fd)

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
            clearNuxtData('privacy-policy-public')
            refreshNuxtData('privacy-policy-public')
          } catch (e) {}
          try {
            window.dispatchEvent(new CustomEvent('aswar:privacy-policy-updated', { detail: policyData.value }))
          } catch (e) {}
        }

        toast.success(res.message || 'تم حفظ وتحديث سياسة الخصوصية بنجاح!')
        return { success: true }
      } else {
        throw new Error(res?.message || 'فشل حفظ التعديلات')
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || 'حدث خطأ أثناء حفظ سياسة الخصوصية')
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  // Computed display properties for public page
  const displayTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.title_en || policyData.value.title_ar || policyData.value.title || 'Privacy Policy & Terms')
      : (policyData.value.title_ar || policyData.value.title || policyData.value.title_en || 'سياسة الخصوصية والشروط والأحكام')
  })

  const displaySubtitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.subtitle_en || policyData.value.subtitle_ar || policyData.value.subtitle || 'Your privacy and data security are our highest priority.')
      : (policyData.value.subtitle_ar || policyData.value.subtitle || policyData.value.subtitle_en || 'خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى وفق الأنظمة المعتمدة في المملكة.')
  })

  const displayContent = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.content_en || policyData.value.content_ar || policyData.value.content || '')
      : (policyData.value.content_ar || policyData.value.content || policyData.value.content_en || '')
  })

  const displayBadges = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return [
      {
        id: 1,
        icon: d.badge_1_icon || 'fa-solid fa-shield-halved',
        title: isEn ? (d.badge_1_title_en || 'SSL/TLS Encryption') : (d.badge_1_title_ar || 'تشفير وحماية مشددة'),
        desc: isEn ? (d.badge_1_desc_en || '256-bit encrypted data protocols') : (d.badge_1_desc_ar || 'حماية كاملة لكافة البيانات والمعاملات')
      },
      {
        id: 2,
        icon: d.badge_2_icon || 'fa-solid fa-user-lock',
        title: isEn ? (d.badge_2_title_en || 'Strict Confidentiality') : (d.badge_2_title_ar || 'سرية تامة للبيانات'),
        desc: isEn ? (d.badge_2_desc_en || 'We never sell or trade your info') : (d.badge_2_desc_ar || 'لا نشارك أو نبيع بياناتك لأي طرف')
      },
      {
        id: 3,
        icon: d.badge_3_icon || 'fa-solid fa-building-shield',
        title: isEn ? (d.badge_3_title_en || 'Saudi PDPL Compliant') : (d.badge_3_title_ar || 'نظام حماية البيانات'),
        desc: isEn ? (d.badge_3_desc_en || 'Full alignment with KSA privacy laws') : (d.badge_3_desc_ar || 'متوافق مع أنظمة حماية البيانات في المملكة')
      },
      {
        id: 4,
        icon: d.badge_4_icon || 'fa-solid fa-sliders',
        title: isEn ? (d.badge_4_title_en || 'Full User Rights') : (d.badge_4_title_ar || 'تحكم كامل بالبيانات'),
        desc: isEn ? (d.badge_4_desc_en || 'Manage or delete your data anytime') : (d.badge_4_desc_ar || 'حق مراجعة وتحديث أو حذف بياناتك')
      }
    ]
  })

  const displaySummaryTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.summary_title_en || 'Summary in Brief')
      : (policyData.value.summary_title_ar || 'ملخص موجز لأهم البنود')
  })

  const displaySummaryPoints = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return [
      isEn ? (d.summary_point_1_en || 'We collect data strictly to process and deliver your orders.') : (d.summary_point_1_ar || 'نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة.'),
      isEn ? (d.summary_point_2_en || 'Payment card information is never stored on our servers.') : (d.summary_point_2_ar || 'لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا.'),
      isEn ? (d.summary_point_3_en || 'You have full right to edit or delete your account anytime.') : (d.summary_point_3_ar || 'يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم.')
    ].filter(Boolean)
  })

  const displayInquiryBox = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = policyData.value
    return {
      title: isEn ? (d.inquiry_title_en || 'Privacy Inquiries?') : (d.inquiry_title_ar || 'استفسارات حول الخصوصية؟'),
      desc: isEn ? (d.inquiry_desc_en || 'For any questions regarding your personal data or privacy rights, please reach out to us.') : (d.inquiry_desc_ar || 'إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة.'),
      contactUrl: d.inquiry_contact_url || '/contact-us',
      contactBtn: isEn ? (d.inquiry_contact_btn_en || 'Contact Privacy Team') : (d.inquiry_contact_btn_ar || 'تواصل مع فريق الخصوصية'),
      whatsappUrl: d.inquiry_whatsapp_url || 'https://wa.me/966500000000',
      whatsappBtn: isEn ? (d.inquiry_whatsapp_btn_en || 'WhatsApp Support') : (d.inquiry_whatsapp_btn_ar || 'دعم عبر الواتساب')
    }
  })

  const displayMetaTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.meta_title_en || policyData.value.meta_title_ar || policyData.value.meta_title || `${displayTitle.value} | Aswar Jeddah`)
      : (policyData.value.meta_title_ar || policyData.value.meta_title || `${displayTitle.value} | متجر أسوار جدة`)
  })

  const displayMetaDescription = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn 
      ? (policyData.value.meta_description_en || policyData.value.meta_description_ar || policyData.value.meta_description || displaySubtitle.value)
      : (policyData.value.meta_description_ar || policyData.value.meta_description || displaySubtitle.value)
  })

  return {
    policyData,
    form,
    isLoading,
    isSubmitting,
    fetchPublicPrivacyPolicy,
    fetchAdminPrivacyPolicy,
    submitAdminPrivacyPolicy,
    displayTitle,
    displaySubtitle,
    displayContent,
    displayBadges,
    displaySummaryTitle,
    displaySummaryPoints,
    displayInquiryBox,
    displayMetaTitle,
    displayMetaDescription
  }
}
