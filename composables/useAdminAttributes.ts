/**
 * Dedicated Admin Attributes Composable with Pagination, Search & Auto-Refetch Support
 * Handles fetchAttributes, changePage, deleteAttribute, and submitForm (JSON)
 */
import { ref, computed } from 'vue'
import {
  adminAttributesApiService,
  type AdminAttributeItem,
  type AttributeFormDataPayload,
  type PaginationMeta
} from '~/services/adminAttributesApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminAttributes = () => {
  const toast = useToast()
  const { adminCookie } = useAdminAuth()

  const attributes = ref<AdminAttributeItem[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')

  // Pagination State
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(10)
  const totalAttributes = ref(0)

  const getToken = (): string => {
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || ''
    }
    return ''
  }

  /**
   * 1. GET Attributes List (with pagination, anti-cache & searchValue)
   */
  const fetchAttributes = async (
    search: string = searchQuery.value,
    page: number = currentPage.value,
    limit: number = perPage.value
  ): Promise<AdminAttributeItem[]> => {
    isLoading.value = true
    errorMessage.value = ''
    currentPage.value = page
    perPage.value = limit
    const token = getToken()

    try {
      const res = await adminAttributesApiService.fetchAttributes(token, search, page, limit)
      if (res.success) {
        attributes.value = [...res.data]
        if (res.pagination) {
          currentPage.value = res.pagination.current_page
          lastPage.value = res.pagination.last_page
          perPage.value = res.pagination.per_page
          totalAttributes.value = res.pagination.total
        }
      } else {
        errorMessage.value = res.message || 'تعذر جلب قائمة السمات والخصائص.'
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب السمات.'
    } finally {
      isLoading.value = false
    }

    return attributes.value
  }

  /**
   * Navigate to a specific page
   */
  const changePage = async (page: number) => {
    if (page < 1 || page > lastPage.value || page === currentPage.value) return
    await fetchAttributes(searchQuery.value, page, perPage.value)
  }

  /**
   * 2. DELETE Attribute by ID
   */
  const deleteAttribute = async (id: string | number): Promise<boolean> => {
    const token = getToken()
    isLoading.value = true

    try {
      const res = await adminAttributesApiService.deleteAttribute(id, token)
      if (res.success) {
        attributes.value = attributes.value.filter(a => String(a.id) !== String(id))
        totalAttributes.value = Math.max(0, totalAttributes.value - 1)
        toast.success('تم الحذف', res.message || 'تم حذف السمة بنجاح.')
        return true
      } else {
        toast.error('خطأ في الحذف', res.message || 'لم نتمكن من حذف السمة.')
        return false
      }
    } catch (err: any) {
      toast.error('خطأ في الشبكة', 'تعذر الاتصال بالسيرفر لحذف السمة.')
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 3. SUBMIT Form (POST Add / POST Update via JSON) with Immediate Refetch
   */
  const submitForm = async (
    payload: AttributeFormDataPayload,
    isEditMode: boolean = false,
    attributeId?: string | number
  ): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      let res
      if (isEditMode && (attributeId || payload.id)) {
        const id = attributeId || payload.id!
        res = await adminAttributesApiService.updateAttribute(id, payload, token)
      } else {
        res = await adminAttributesApiService.addAttribute(payload, token)
      }

      if (res.success) {
        toast.success(
          isEditMode ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح',
          res.message || (isEditMode ? 'تم تحديث بيانات السمة بنجاح.' : 'تم إضافة السمة الجديدة بنجاح.')
        )

        // Optimistic State Update
        if (!isEditMode && res.data) {
          const newItem: AdminAttributeItem = {
            id: res.data.id || Date.now(),
            name: payload.name_ar,
            name_ar: payload.name_ar,
            name_en: payload.name_en
          }
          attributes.value = [newItem, ...attributes.value]
          totalAttributes.value = totalAttributes.value + 1
        } else if (isEditMode && (attributeId || payload.id)) {
          const targetId = String(attributeId || payload.id)
          const idx = attributes.value.findIndex(a => String(a.id) === targetId)
          if (idx !== -1) {
            attributes.value[idx] = {
              ...attributes.value[idx],
              name: payload.name_ar,
              name_ar: payload.name_ar,
              name_en: payload.name_en
            }
          }
        }

        // Refetch fresh data from server
        await fetchAttributes(searchQuery.value, currentPage.value, perPage.value)
        return true
      } else {
        errorMessage.value = res.message || 'فشل حفظ بيانات السمة.'
        toast.error('فشل العملية', errorMessage.value)
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ غير متوقع أثناء إرسال بيانات السمة.'
      toast.error('خطأ في النظام', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Find an attribute item by ID from local list or API
   */
  const getAttributeById = async (id: string | number): Promise<AdminAttributeItem | null> => {
    const existing = attributes.value.find(a => String(a.id) === String(id))
    if (existing) return existing

    const list = await fetchAttributes('', 1, 100)
    return list.find(a => String(a.id) === String(id)) || null
  }

  // Quick statistics
  const totalCount = computed(() => totalAttributes.value || attributes.value.length)
  const multilingualCount = computed(() => attributes.value.filter(a => a.name_ar && a.name_en).length)

  return {
    attributes,
    isLoading,
    isSubmitting,
    errorMessage,
    searchQuery,
    currentPage,
    lastPage,
    perPage,
    totalAttributes,
    totalCount,
    multilingualCount,
    fetchAttributes,
    changePage,
    deleteAttribute,
    submitForm,
    getAttributeById
  }
}
