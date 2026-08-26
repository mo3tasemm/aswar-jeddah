/**
 * Contact Us Composable (useContact)
 * Manages Public contact info, message form submission with validation,
 * Admin inbox messages and contact settings with persistent sync.
 */
import { ref, reactive, computed } from 'vue'
import { contactApiService, type ContactInfoData, type ContactMessagePayload, type ContactMessageItem } from '~/services/contactApiService'
import { useLanguage } from '~/composables/useLanguage'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

const CONTACT_SETTINGS_CACHE_KEY = 'aswar_custom_contact_settings_data'

export const useContact = () => {
  const { currentLanguage } = useLanguage()
  const { adminToken, adminCookie } = useAdminAuth()
  const toast = useToast()

  // Public State
  const contactInfo = ref<ContactInfoData>(contactApiService.getDefaultContactInfo('ar'))
  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)

  // Public Form
  const messageForm = reactive<ContactMessagePayload>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const formErrors = reactive<Record<string, string>>({})

  // Admin Messages Inbox State
  const adminMessages = ref<ContactMessageItem[]>([])
  const totalMessages = ref<number>(0)
  const unreadCount = ref<number>(0)
  const currentPage = ref<number>(1)
  const lastPage = ref<number>(1)
  const searchFilter = ref<string>('')
  const statusFilter = ref<'all' | 'unread' | 'read'>('all')
  const selectedMessageIds = ref<(number | string)[]>([])
  const activeMessage = ref<ContactMessageItem | null>(null)
  const isModalOpen = ref<boolean>(false)

  // Admin Contact Settings State
  const adminSettingsForm = reactive<ContactInfoData>({
    ...contactApiService.getDefaultContactInfo('ar')
  })

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  const getCachedSettings = (): Partial<ContactInfoData> | null => {
    if (process.client) {
      try {
        const cached = localStorage.getItem(CONTACT_SETTINGS_CACHE_KEY)
        if (cached) return JSON.parse(cached)
      } catch (e) {
        // ignore
      }
    }
    return null
  }

  const setCachedSettings = (data: ContactInfoData) => {
    if (process.client) {
      try {
        localStorage.setItem(CONTACT_SETTINGS_CACHE_KEY, JSON.stringify(data))
      } catch (e) {
        // ignore
      }
    }
  }

  // 1. Fetch Public Contact Info
  const fetchPublicContactInfo = async () => {
    isLoading.value = true
    try {
      const lang = currentLanguage?.value || 'ar'
      const res = await contactApiService.fetchContactInfo(lang)
      const cached = getCachedSettings()

      const merged = {
        ...contactApiService.getDefaultContactInfo(lang),
        ...(res?.data || {}),
        ...(cached || {})
      }

      contactInfo.value = merged
    } catch (err) {
      console.warn('[useContact] fetchPublicContactInfo error:', err)
      const cached = getCachedSettings()
      if (cached) {
        contactInfo.value = { ...contactApiService.getDefaultContactInfo('ar'), ...cached }
      }
    } finally {
      isLoading.value = false
    }
    return contactInfo.value
  }

  // 2. Validate Public Message Form
  const validateMessageForm = (): boolean => {
    Object.keys(formErrors).forEach(key => delete formErrors[key])
    let isValid = true

    if (!messageForm.name || messageForm.name.trim().length < 2) {
      formErrors.name = currentLanguage.value === 'en' ? 'Please enter a valid name' : 'يرجى إدخال الاسم بشكل صحيح'
      isValid = false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!messageForm.email || !emailRegex.test(messageForm.email.trim())) {
      formErrors.email = currentLanguage.value === 'en' ? 'Please enter a valid email address' : 'يرجى إدخال بريد إلكتروني صحيح'
      isValid = false
    }

    if (!messageForm.subject || messageForm.subject.trim().length < 3) {
      formErrors.subject = currentLanguage.value === 'en' ? 'Please enter message subject' : 'يرجى تحديد موضوع الرسالة'
      isValid = false
    }

    if (!messageForm.message || messageForm.message.trim().length < 10) {
      formErrors.message = currentLanguage.value === 'en' ? 'Message must be at least 10 characters' : 'يرجى كتابة نص الرسالة (10 أحرف على الأقل)'
      isValid = false
    }

    return isValid
  }

  // 3. Submit Public Contact Message
  const submitMessage = async () => {
    if (!validateMessageForm()) {
      toast.error(currentLanguage.value === 'en' ? 'Please check required fields' : 'يرجى التأكد من ملء جميع الحقول المطلوبة')
      return false
    }

    isSubmitting.value = true
    try {
      const res = await contactApiService.submitContactMessage(messageForm)
      if (res.success) {
        toast.success(res.message || (currentLanguage.value === 'en' ? 'Message sent successfully!' : 'تم إرسال رسالتكم بنجاح!'))
        // Reset form
        messageForm.name = ''
        messageForm.email = ''
        messageForm.phone = ''
        messageForm.subject = ''
        messageForm.message = ''
        return true
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || (currentLanguage.value === 'en' ? 'Failed to send message' : 'حدث خطأ أثناء إرسال الرسالة'))
    } finally {
      isSubmitting.value = false
    }
    return false
  }

  // 4. Admin: Fetch Messages List
  const fetchAdminMessages = async (page = 1) => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await contactApiService.fetchAdminMessages(token, {
        page,
        search: searchFilter.value,
        status: statusFilter.value
      })
      if (res.success) {
        adminMessages.value = res.data
        totalMessages.value = res.total
        unreadCount.value = res.unreadCount
        currentPage.value = res.meta.current_page || 1
        lastPage.value = res.meta.last_page || 1
      }
    } catch (err) {
      console.warn('[useContact] fetchAdminMessages error:', err)
    } finally {
      isLoading.value = false
    }
  }

  // 5. Admin: Fetch Single Message Detail (Marks as read on server)
  const fetchMessageDetail = async (id: number | string) => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await contactApiService.fetchAdminMessageDetail(token, id)
      if (res && res.success && res.data) {
        activeMessage.value = res.data
        // Mark as read in the local list
        const found = adminMessages.value.find(m => String(m.id) === String(id))
        if (found && !found.is_read) {
          found.is_read = true
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
        return res.data
      }
    } catch (err: any) {
      console.warn('[useContact] fetchMessageDetail error:', err)
    } finally {
      isLoading.value = false
    }
    return null
  }

  // 5b. Admin: Open Message Detail (legacy helper)
  const openMessageModal = async (msg: ContactMessageItem) => {
    activeMessage.value = msg
    isModalOpen.value = true

    if (!msg.is_read) {
      msg.is_read = true
      unreadCount.value = Math.max(0, unreadCount.value - 1)
    }

    try {
      const token = getToken()
      const res = await contactApiService.fetchAdminMessageDetail(token, msg.id)
      if (res.success && res.data) {
        activeMessage.value = res.data
      }
    } catch (err) {
      // Ignored
    }
  }

  // 6. Admin: Delete Single Message
  const deleteMessage = async (id: number | string) => {
    if (!confirm('هل أنت متأكد من رغبتك في حذف هذه الرسالة نهائياً؟')) return

    try {
      const token = getToken()
      const res = await contactApiService.deleteAdminMessage(token, id)
      if (res.success) {
        toast.success(res.message || 'تم حذف الرسالة بنجاح')
        adminMessages.value = adminMessages.value.filter(m => m.id !== id)
        selectedMessageIds.value = selectedMessageIds.value.filter(i => i !== id)
        if (activeMessage.value?.id === id) {
          isModalOpen.value = false
          activeMessage.value = null
        }
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || 'حدث خطأ أثناء حذف الرسالة')
    }
  }

  // 7. Admin: Bulk Delete Messages
  const bulkDeleteMessages = async () => {
    if (selectedMessageIds.value.length === 0) return
    if (!confirm(`هل أنت متأكد من حذف ${selectedMessageIds.value.length} رسالة محددة؟`)) return

    try {
      const token = getToken()
      const res = await contactApiService.bulkDeleteAdminMessages(token, selectedMessageIds.value)
      if (res.success) {
        toast.success(res.message || 'تم حذف الرسائل المحددة بنجاح')
        adminMessages.value = adminMessages.value.filter(m => !selectedMessageIds.value.includes(m.id))
        selectedMessageIds.value = []
      }
    } catch (err: any) {
      toast.error(err.data?.message || err.message || 'حدث خطأ أثناء حذف الرسائل')
    }
  }

  // 8. Admin: Fetch Contact Settings
  const fetchAdminContactSettings = async () => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await contactApiService.fetchAdminContactSettings(token)

      if (res && res.success && res.data) {
        Object.assign(adminSettingsForm, {
          ...contactApiService.getDefaultContactInfo('ar'),
          ...res.data
        })
        setCachedSettings(adminSettingsForm)
        contactInfo.value = { ...adminSettingsForm }
      } else {
        const cached = getCachedSettings()
        if (cached) {
          Object.assign(adminSettingsForm, {
            ...contactApiService.getDefaultContactInfo('ar'),
            ...cached
          })
        }
      }
    } catch (err) {
      console.warn('[useContact] fetchAdminContactSettings error:', err)
      const cached = getCachedSettings()
      if (cached) {
        Object.assign(adminSettingsForm, {
          ...contactApiService.getDefaultContactInfo('ar'),
          ...cached
        })
      }
    } finally {
      isLoading.value = false
    }
    return adminSettingsForm
  }

  // 9. Admin: Save Contact Settings
  const saveAdminContactSettings = async () => {
    isSubmitting.value = true
    try {
      const token = getToken()
      const res = await contactApiService.updateAdminContactSettings(token, adminSettingsForm)

      if (res && res.success) {
        if (res.data) {
          Object.assign(adminSettingsForm, res.data)
        }
        setCachedSettings(adminSettingsForm)
        contactInfo.value = { ...adminSettingsForm }

        toast.success(res.message || 'تم حفظ إعدادات التواصل بنجاح')
        return { success: true, data: adminSettingsForm }
      } else {
        throw new Error(res?.message || 'حدث خطأ أثناء حفظ الإعدادات')
      }
    } catch (err: any) {
      console.error('[useContact] saveAdminContactSettings error:', err)
      toast.error(err?.data?.message || err?.message || 'حدث خطأ أثناء حفظ الإعدادات')
      return { success: false, error: err }
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    contactInfo,
    isLoading,
    isSubmitting,
    messageForm,
    formErrors,
    fetchPublicContactInfo,
    submitMessage,
    // Admin Messages Inbox
    adminMessages,
    totalMessages,
    unreadCount,
    currentPage,
    lastPage,
    searchFilter,
    statusFilter,
    selectedMessageIds,
    activeMessage,
    isModalOpen,
    fetchAdminMessages,
    fetchMessageDetail,
    openMessageModal,
    deleteMessage,
    bulkDeleteMessages,
    // Admin Settings
    adminSettingsForm,
    fetchAdminContactSettings,
    saveAdminContactSettings
  }
}
