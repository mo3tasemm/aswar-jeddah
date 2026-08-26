import { ref, reactive, computed } from 'vue'
import { useState, clearNuxtData, refreshNuxtData } from '#imports'
import { aboutUsApiService, type AboutUsData } from '~/services/aboutUsApiService'
import { useLanguage } from '~/composables/useLanguage'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

const LOCAL_STORAGE_KEY = 'aswar_custom_about_us_data'

export const useAboutUs = () => {
  const { currentLanguage } = useLanguage()
  const { adminToken, adminCookie } = useAdminAuth()
  const toast = useToast()

  const getCachedData = (): Partial<AboutUsData> | null => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
        if (cached) return JSON.parse(cached)
      } catch (e) {
        // ignore
      }
    }
    return null
  }

  const setCachedData = (data: AboutUsData) => {
    if (process.client) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
      } catch (e) {
        // ignore
      }
    }
  }

  // Global shared state across entire app
  const aboutData = useState<AboutUsData>('aswar_global_about_us_data', () => {
    const cached = getCachedData()
    if (cached) {
      return { ...aboutUsApiService.getDefaultAboutUs('ar'), ...cached }
    }
    return aboutUsApiService.getDefaultAboutUs('ar')
  })

  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Admin Form State
  const form = reactive<AboutUsData>({
    ...aboutUsApiService.getDefaultAboutUs('ar')
  })

  // File Upload State
  const bannerFile = ref<File | null>(null)
  const bannerPreview = ref<string>('')

  const storyFile = ref<File | null>(null)
  const storyPreview = ref<string>('')

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // 1. Fetch for Public Storefront
  const fetchPublicAboutUs = async (force = true) => {
    isLoading.value = true
    try {
      const lang = currentLanguage?.value || 'ar'
      const res = await aboutUsApiService.fetchAboutUs(lang, force)

      if (res?.success && res.data) {
        aboutData.value = {
          ...aboutUsApiService.getDefaultAboutUs(lang),
          ...res.data
        }
        setCachedData(aboutData.value)
      } else {
        const cached = getCachedData()
        if (cached) {
          aboutData.value = { ...aboutUsApiService.getDefaultAboutUs(lang), ...cached }
        }
      }
    } catch (err) {
      console.warn('[useAboutUs] Failed to fetch public about us:', err)
      const cached = getCachedData()
      if (cached) {
        aboutData.value = { ...aboutUsApiService.getDefaultAboutUs('ar'), ...cached }
      }
    } finally {
      isLoading.value = false
    }
    return aboutData.value
  }

  // 2. Fetch for Admin Manager
  const fetchAdminAboutUs = async () => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await aboutUsApiService.fetchAdminAboutUs(token)

      if (res?.success && res.data) {
        const data = res.data
        aboutData.value = {
          ...aboutUsApiService.getDefaultAboutUs('ar'),
          ...data
        }
        Object.assign(form, aboutData.value)

        // Set live image previews
        const bannerUrl = data.banner_image_full_url || aboutUsApiService.resolveImageUrl(data.banner_image)
        if (bannerUrl) {
          bannerPreview.value = bannerUrl
          form.banner_image_full_url = bannerUrl
        }
        const storyUrl = data.story_image_full_url || aboutUsApiService.resolveImageUrl(data.story_image)
        if (storyUrl) {
          storyPreview.value = storyUrl
          form.story_image_full_url = storyUrl
        }

        setCachedData(aboutData.value)
      } else {
        const cached = getCachedData()
        if (cached) {
          Object.assign(form, cached)
          aboutData.value = { ...aboutUsApiService.getDefaultAboutUs('ar'), ...cached }
          bannerPreview.value = cached.banner_image_full_url || aboutUsApiService.resolveImageUrl(cached.banner_image) || ''
          storyPreview.value = cached.story_image_full_url || aboutUsApiService.resolveImageUrl(cached.story_image) || ''
        }
      }
    } catch (err) {
      console.warn('[useAboutUs] Failed to fetch admin about us:', err)
      const cached = getCachedData()
      if (cached) {
        Object.assign(form, cached)
        aboutData.value = { ...aboutUsApiService.getDefaultAboutUs('ar'), ...cached }
        bannerPreview.value = cached.banner_image_full_url || aboutUsApiService.resolveImageUrl(cached.banner_image) || ''
        storyPreview.value = cached.story_image_full_url || aboutUsApiService.resolveImageUrl(cached.story_image) || ''
      }
    } finally {
      isLoading.value = false
    }
    return aboutData.value
  }

  // File Change Handlers
  const handleBannerFileChange = (file: File | null) => {
    bannerFile.value = file
    if (file) {
      bannerPreview.value = URL.createObjectURL(file)
      form.banner_image_full_url = bannerPreview.value
    }
  }

  const handleStoryFileChange = (file: File | null) => {
    storyFile.value = file
    if (file) {
      storyPreview.value = URL.createObjectURL(file)
      form.story_image_full_url = storyPreview.value
    }
  }

  // 3. Save Admin About Us
  const submitAdminAboutUs = async () => {
    isSubmitting.value = true
    try {
      const token = getToken()

      // 1. Upload Banner Image if a new file is picked
      if (bannerFile.value instanceof File) {
        try {
          const uploadRes = await aboutUsApiService.uploadImage(bannerFile.value, token)
          if (uploadRes?.url || uploadRes?.full_url) {
            form.banner_image = uploadRes.url || uploadRes.full_url
            form.banner_image_full_url = uploadRes.full_url || uploadRes.url
            bannerPreview.value = uploadRes.full_url || uploadRes.url
          }
        } catch (uploadErr) {
          console.warn('[useAboutUs] Upload banner image via dedicated endpoint failed:', uploadErr)
        }
      }

      // 2. Upload Story Image if a new file is picked
      if (storyFile.value instanceof File) {
        try {
          const uploadRes = await aboutUsApiService.uploadImage(storyFile.value, token)
          if (uploadRes?.url || uploadRes?.full_url) {
            form.story_image = uploadRes.url || uploadRes.full_url
            form.story_image_full_url = uploadRes.full_url || uploadRes.url
            storyPreview.value = uploadRes.full_url || uploadRes.url
          }
        } catch (uploadErr) {
          console.warn('[useAboutUs] Upload story image via dedicated endpoint failed:', uploadErr)
        }
      }

      const fd = new FormData()
      fd.append('_method', 'PUT')

      // Main Text fields
      fd.append('title_ar', form.title_ar || '')
      fd.append('title_en', form.title_en || '')
      fd.append('title', form.title_ar || form.title_en || '')

      fd.append('subtitle_ar', form.subtitle_ar || '')
      fd.append('subtitle_en', form.subtitle_en || '')
      fd.append('subtitle', form.subtitle_ar || form.subtitle_en || '')

      // Story
      fd.append('story_title_ar', form.story_title_ar || '')
      fd.append('story_title_en', form.story_title_en || '')
      fd.append('story_title', form.story_title_ar || form.story_title_en || '')

      fd.append('story_content_ar', form.story_content_ar || '')
      fd.append('story_content_en', form.story_content_en || '')
      fd.append('story_content', form.story_content_ar || form.story_content_en || '')

      // Vision & Mission
      fd.append('vision_title_ar', form.vision_title_ar || '')
      fd.append('vision_title_en', form.vision_title_en || '')
      fd.append('vision_title', form.vision_title_ar || form.vision_title_en || '')
      fd.append('vision_content_ar', form.vision_content_ar || '')
      fd.append('vision_content_en', form.vision_content_en || '')
      fd.append('vision_content', form.vision_content_ar || form.vision_content_en || '')

      fd.append('mission_title_ar', form.mission_title_ar || '')
      fd.append('mission_title_en', form.mission_title_en || '')
      fd.append('mission_title', form.mission_title_ar || form.mission_title_en || '')
      fd.append('mission_content_ar', form.mission_content_ar || '')
      fd.append('mission_content_en', form.mission_content_en || '')
      fd.append('mission_content', form.mission_content_ar || form.mission_content_en || '')

      // Dynamic Statistics & Labels
      fd.append('stats_customers', String(form.stats_customers || '25,000+'))
      fd.append('stats_customers_label_ar', form.stats_customers_label_ar || 'عميل سعيد وموثوق')
      fd.append('stats_customers_label_en', form.stats_customers_label_en || 'Satisfied Customers')
      fd.append('stats_customers_icon', form.stats_customers_icon || 'fa-solid fa-users')

      fd.append('stats_products', String(form.stats_products || '1,500+'))
      fd.append('stats_products_label_ar', form.stats_products_label_ar || 'منتج أصلي معتمد')
      fd.append('stats_products_label_en', form.stats_products_label_en || 'Certified Products')
      fd.append('stats_products_icon', form.stats_products_icon || 'fa-solid fa-boxes-stacked')

      fd.append('stats_experience', String(form.stats_experience || '10+'))
      fd.append('stats_experience_label_ar', form.stats_experience_label_ar || 'سنوات من الخبرة')
      fd.append('stats_experience_label_en', form.stats_experience_label_en || 'Years of Experience')
      fd.append('stats_experience_icon', form.stats_experience_icon || 'fa-solid fa-award')

      fd.append('stats_awards', String(form.stats_awards || '100%'))
      fd.append('stats_awards_label_ar', form.stats_awards_label_ar || 'ضمان وجودة معتمدة')
      fd.append('stats_awards_label_en', form.stats_awards_label_en || 'Warranty & Quality')
      fd.append('stats_awards_icon', form.stats_awards_icon || 'fa-solid fa-shield')

      fd.append('stats_warranty', String(form.stats_awards || '100%'))
      fd.append('stats_excellence', '99.8%')
      fd.append('stats_satisfaction', '99%')

      const statsObj = {
        customers: {
          value: form.stats_customers || '25,000+',
          label_ar: form.stats_customers_label_ar || 'عميل سعيد وموثوق',
          label_en: form.stats_customers_label_en || 'Satisfied Customers',
          icon: form.stats_customers_icon || 'fa-solid fa-users'
        },
        products: {
          value: form.stats_products || '1,500+',
          label_ar: form.stats_products_label_ar || 'منتج أصلي معتمد',
          label_en: form.stats_products_label_en || 'Certified Products',
          icon: form.stats_products_icon || 'fa-solid fa-boxes-stacked'
        },
        experience: {
          value: form.stats_experience || '10+',
          label_ar: form.stats_experience_label_ar || 'سنوات من الخبرة',
          label_en: form.stats_experience_label_en || 'Years of Experience',
          icon: form.stats_experience_icon || 'fa-solid fa-award'
        },
        awards: {
          value: form.stats_awards || '100%',
          label_ar: form.stats_awards_label_ar || 'ضمان وجودة معتمدة',
          label_en: form.stats_awards_label_en || 'Warranty & Quality',
          icon: form.stats_awards_icon || 'fa-solid fa-shield'
        }
      }
      fd.append('stats', JSON.stringify(statsObj))

      // Features & Commitments Badge/Title
      fd.append('features_badge_ar', form.features_badge_ar || 'التزاماتنا لعملائنا')
      fd.append('features_badge_en', form.features_badge_en || 'Store Commitments')
      fd.append('features_title_ar', form.features_title_ar || 'لماذا يفضل العملاء التسوق معنا؟')
      fd.append('features_title_en', form.features_title_en || 'Why Shop With Aswar Jeddah?')

      // Feature items (flat fields)
      fd.append('feature_1_title_ar', form.feature_1_title_ar || '')
      fd.append('feature_1_title_en', form.feature_1_title_en || '')
      fd.append('feature_1_desc_ar', form.feature_1_desc_ar || '')
      fd.append('feature_1_desc_en', form.feature_1_desc_en || '')
      fd.append('feature_1_icon', form.feature_1_icon || 'fa-solid fa-shield')

      fd.append('feature_2_title_ar', form.feature_2_title_ar || '')
      fd.append('feature_2_title_en', form.feature_2_title_en || '')
      fd.append('feature_2_desc_ar', form.feature_2_desc_ar || '')
      fd.append('feature_2_desc_en', form.feature_2_desc_en || '')
      fd.append('feature_2_icon', form.feature_2_icon || 'fa-solid fa-truck-fast')

      fd.append('feature_3_title_ar', form.feature_3_title_ar || '')
      fd.append('feature_3_title_en', form.feature_3_title_en || '')
      fd.append('feature_3_desc_ar', form.feature_3_desc_ar || '')
      fd.append('feature_3_desc_en', form.feature_3_desc_en || '')
      fd.append('feature_3_icon', form.feature_3_icon || 'fa-solid fa-credit-card')

      fd.append('feature_4_title_ar', form.feature_4_title_ar || '')
      fd.append('feature_4_title_en', form.feature_4_title_en || '')
      fd.append('feature_4_desc_ar', form.feature_4_desc_ar || '')
      fd.append('feature_4_desc_en', form.feature_4_desc_en || '')
      fd.append('feature_4_icon', form.feature_4_icon || 'fa-solid fa-headset')

      // Values array (both JSON and array indices)
      const valuesArray = [
        {
          id: 1,
          icon: form.feature_1_icon || 'fa-solid fa-shield',
          title_ar: form.feature_1_title_ar || '',
          title_en: form.feature_1_title_en || '',
          title: form.feature_1_title_ar || form.feature_1_title_en || '',
          desc_ar: form.feature_1_desc_ar || '',
          desc_en: form.feature_1_desc_en || '',
          description_ar: form.feature_1_desc_ar || '',
          description_en: form.feature_1_desc_en || ''
        },
        {
          id: 2,
          icon: form.feature_2_icon || 'fa-solid fa-truck-fast',
          title_ar: form.feature_2_title_ar || '',
          title_en: form.feature_2_title_en || '',
          title: form.feature_2_title_ar || form.feature_2_title_en || '',
          desc_ar: form.feature_2_desc_ar || '',
          desc_en: form.feature_2_desc_en || '',
          description_ar: form.feature_2_desc_ar || '',
          description_en: form.feature_2_desc_en || ''
        },
        {
          id: 3,
          icon: form.feature_3_icon || 'fa-solid fa-credit-card',
          title_ar: form.feature_3_title_ar || '',
          title_en: form.feature_3_title_en || '',
          title: form.feature_3_title_ar || form.feature_3_title_en || '',
          desc_ar: form.feature_3_desc_ar || '',
          desc_en: form.feature_3_desc_en || '',
          description_ar: form.feature_3_desc_ar || '',
          description_en: form.feature_3_desc_en || ''
        },
        {
          id: 4,
          icon: form.feature_4_icon || 'fa-solid fa-headset',
          title_ar: form.feature_4_title_ar || '',
          title_en: form.feature_4_title_en || '',
          title: form.feature_4_title_ar || form.feature_4_title_en || '',
          desc_ar: form.feature_4_desc_ar || '',
          desc_en: form.feature_4_desc_en || '',
          description_ar: form.feature_4_desc_ar || '',
          description_en: form.feature_4_desc_en || ''
        }
      ]
      fd.append('values', JSON.stringify(valuesArray))
      valuesArray.forEach((val, idx) => {
        fd.append(`values[${idx}][icon]`, val.icon)
        fd.append(`values[${idx}][title_ar]`, val.title_ar)
        fd.append(`values[${idx}][title_en]`, val.title_en)
        fd.append(`values[${idx}][desc_ar]`, val.desc_ar)
        fd.append(`values[${idx}][desc_en]`, val.desc_en)
      })

      // CTA Banner
      fd.append('cta_title_ar', form.cta_title_ar || '')
      fd.append('cta_title_en', form.cta_title_en || '')
      fd.append('cta_desc_ar', form.cta_desc_ar || '')
      fd.append('cta_desc_en', form.cta_desc_en || '')
      fd.append('cta_btn_ar', form.cta_btn_ar || '')
      fd.append('cta_btn_en', form.cta_btn_en || '')
      fd.append('cta_url', form.cta_url || '/shop')

      // Image String URLs (From uploads or existing)
      if (form.banner_image) {
        fd.append('banner_image', form.banner_image)
      }
      if (form.banner_image_full_url) {
        fd.append('banner_image_full_url', form.banner_image_full_url)
      }
      if (form.story_image) {
        fd.append('story_image', form.story_image)
      }
      if (form.story_image_full_url) {
        fd.append('story_image_full_url', form.story_image_full_url)
      }

      // Binary Files as fallback
      if (bannerFile.value instanceof File) {
        fd.append('banner_file', bannerFile.value)
        fd.append('banner', bannerFile.value)
      }
      if (storyFile.value instanceof File) {
        fd.append('story_file', storyFile.value)
        fd.append('story', storyFile.value)
      }

      const res = await aboutUsApiService.updateAdminAboutUs(token, fd)

      if (res?.success) {
        if (res.data) {
          aboutData.value = { ...form, ...res.data }
          Object.assign(form, aboutData.value)
          const newBanner = res.data.banner_image_full_url || aboutUsApiService.resolveImageUrl(res.data.banner_image)
          if (newBanner) {
            bannerPreview.value = newBanner
            form.banner_image_full_url = newBanner
          }
          const newStory = res.data.story_image_full_url || aboutUsApiService.resolveImageUrl(res.data.story_image)
          if (newStory) {
            storyPreview.value = newStory
            form.story_image_full_url = newStory
          }
        } else {
          aboutData.value = { ...form }
        }

        bannerFile.value = null
        storyFile.value = null
        setCachedData(aboutData.value)

        // Instantly invalidate Nuxt data cache so public pages show fresh data immediately
        if (process.client) {
          try {
            clearNuxtData('about-us-public')
            refreshNuxtData('about-us-public')
          } catch (e) {
            // ignore
          }
          try {
            window.dispatchEvent(new CustomEvent('aswar:about-us-updated', { detail: aboutData.value }))
          } catch (e) {
            // ignore
          }
        }

        toast.success(res.message || 'تم حفظ وتحديث بيانات صفحة من نحن بنجاح!')
        return { success: true }
      } else {
        throw new Error(res?.message || 'فشل حفظ التعديلات')
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || 'حدث خطأ أثناء حفظ البيانات')
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  // Display computed properties for public page
  const displayTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.title_en || aboutData.value.title_ar || aboutData.value.title) : (aboutData.value.title_ar || aboutData.value.title || aboutData.value.title_en)
  })

  const displaySubtitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.subtitle_en || aboutData.value.subtitle_ar || aboutData.value.subtitle) : (aboutData.value.subtitle_ar || aboutData.value.subtitle || aboutData.value.subtitle_en)
  })

  const displayStoryTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.story_title_en || aboutData.value.story_title_ar || aboutData.value.story_title) : (aboutData.value.story_title_ar || aboutData.value.story_title || aboutData.value.story_title_en)
  })

  const displayStoryContent = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.story_content_en || aboutData.value.story_content_ar || aboutData.value.story_content) : (aboutData.value.story_content_ar || aboutData.value.story_content || aboutData.value.story_content_en)
  })

  const displayVisionTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.vision_title_en || aboutData.value.vision_title_ar || aboutData.value.vision_title) : (aboutData.value.vision_title_ar || aboutData.value.vision_title || aboutData.value.vision_title_en)
  })

  const displayVisionContent = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.vision_content_en || aboutData.value.vision_content_ar || aboutData.value.vision_content) : (aboutData.value.vision_content_ar || aboutData.value.vision_content || aboutData.value.vision_content_en)
  })

  const displayMissionTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.mission_title_en || aboutData.value.mission_title_ar || aboutData.value.mission_title) : (aboutData.value.mission_title_ar || aboutData.value.mission_title || aboutData.value.mission_title_en)
  })

  const displayMissionContent = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.mission_content_en || aboutData.value.mission_content_ar || aboutData.value.mission_content) : (aboutData.value.mission_content_ar || aboutData.value.mission_content || aboutData.value.mission_content_en)
  })

  const displayFeaturesBadge = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.features_badge_en || 'Store Commitments') : (aboutData.value.features_badge_ar || 'التزاماتنا لعملائنا')
  })

  const displayFeaturesTitle = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return isEn ? (aboutData.value.features_title_en || 'Why Shop With Aswar Jeddah?') : (aboutData.value.features_title_ar || 'لماذا يفضل العملاء التسوق معنا؟')
  })

  const displayFeature1 = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return {
      title: isEn ? (aboutData.value.feature_1_title_en || '100% Genuine Products') : (aboutData.value.feature_1_title_ar || 'منتجات أصلية 100%'),
      desc: isEn ? (aboutData.value.feature_1_desc_en || 'Direct from certified brands and authorized distributors') : (aboutData.value.feature_1_desc_ar || 'نوفر كافة الأجهزة مباشرة من الوكلاء والمصادر المعتمدة'),
      icon: aboutData.value.feature_1_icon || 'fa-solid fa-shield'
    }
  })

  const displayFeature2 = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return {
      title: isEn ? (aboutData.value.feature_2_title_en || 'Fast Kingdom Shipping') : (aboutData.value.feature_2_title_ar || 'شحن سريع وآمن'),
      desc: isEn ? (aboutData.value.feature_2_desc_en || 'Reliable door-to-door delivery across all regions of KSA') : (aboutData.value.feature_2_desc_ar || 'توصيل موثوق ومحمي لكافة مدن ومناطق المملكة'),
      icon: aboutData.value.feature_2_icon || 'fa-solid fa-truck-fast'
    }
  })

  const displayFeature3 = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return {
      title: isEn ? (aboutData.value.feature_3_title_en || 'Secure Payment Options') : (aboutData.value.feature_3_title_ar || 'طرق دفع متعددة وآمنة'),
      desc: isEn ? (aboutData.value.feature_3_desc_en || 'Support for Mada, Apple Pay, Visa, and installments') : (aboutData.value.feature_3_desc_ar || 'مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط الميسر'),
      icon: aboutData.value.feature_3_icon || 'fa-solid fa-credit-card'
    }
  })

  const displayFeature4 = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return {
      title: isEn ? (aboutData.value.feature_4_title_en || 'Dedicated Support') : (aboutData.value.feature_4_title_ar || 'خدمة عملاء متخصصة'),
      desc: isEn ? (aboutData.value.feature_4_desc_en || 'Our technical support team is ready to assist you anytime') : (aboutData.value.feature_4_desc_ar || 'فريق متكامل للإجابة على استفساراتكم ومتابعة طلباتكم'),
      icon: aboutData.value.feature_4_icon || 'fa-solid fa-headset'
    }
  })

  const displayCta = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    return {
      title: isEn ? (aboutData.value.cta_title_en || 'Discover Thousands of Verified Products') : (aboutData.value.cta_title_ar || 'اكتشف آلاف الأجهزة والحلول التقنية المعتمدة'),
      desc: isEn ? (aboutData.value.cta_desc_en || 'Shop with complete peace of mind with our official warranties.') : (aboutData.value.cta_desc_ar || 'تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة.'),
      btn: isEn ? (aboutData.value.cta_btn_en || 'Browse All Products') : (aboutData.value.cta_btn_ar || 'تسوق المنتجات الآن'),
      url: aboutData.value.cta_url || '/shop'
    }
  })

  const displayStats = computed(() => {
    const isEn = currentLanguage?.value === 'en'
    const d = aboutData.value
    return [
      {
        id: 1,
        key: 'customers',
        value: d.stats_customers || '25,000+',
        label: isEn ? (d.stats_customers_label_en || 'Satisfied Customers') : (d.stats_customers_label_ar || 'عميل سعيد وموثوق'),
        icon: d.stats_customers_icon || 'fa-solid fa-users',
        colorClass: 'bg-amber-50 border-amber-100 text-amber-500'
      },
      {
        id: 2,
        key: 'products',
        value: d.stats_products || '1,500+',
        label: isEn ? (d.stats_products_label_en || 'Certified Products') : (d.stats_products_label_ar || 'منتج أصلي معتمد'),
        icon: d.stats_products_icon || 'fa-solid fa-boxes-stacked',
        colorClass: 'bg-indigo-50 border-indigo-100 text-indigo-600'
      },
      {
        id: 3,
        key: 'experience',
        value: d.stats_experience || '10+',
        label: isEn ? (d.stats_experience_label_en || 'Years of Experience') : (d.stats_experience_label_ar || 'سنوات من الخبرة'),
        icon: d.stats_experience_icon || 'fa-solid fa-award',
        colorClass: 'bg-purple-50 border-purple-100 text-purple-600'
      },
      {
        id: 4,
        key: 'awards',
        value: d.stats_awards || d.stats_warranty || '100%',
        label: isEn ? (d.stats_awards_label_en || 'Warranty & Quality') : (d.stats_awards_label_ar || 'ضمان وجودة معتمدة'),
        icon: d.stats_awards_icon || 'fa-solid fa-shield',
        colorClass: 'bg-emerald-50 border-emerald-100 text-emerald-600'
      }
    ]
  })

  return {
    aboutData,
    form,
    isLoading,
    isSubmitting,
    bannerFile,
    bannerPreview,
    storyFile,
    storyPreview,
    fetchPublicAboutUs,
    fetchAdminAboutUs,
    submitAdminAboutUs,
    handleBannerFileChange,
    handleStoryFileChange,
    displayTitle,
    displaySubtitle,
    displayStoryTitle,
    displayStoryContent,
    displayVisionTitle,
    displayVisionContent,
    displayMissionTitle,
    displayMissionContent,
    displayStats,
    displayFeaturesBadge,
    displayFeaturesTitle,
    displayFeature1,
    displayFeature2,
    displayFeature3,
    displayFeature4,
    displayCta
  }
}
