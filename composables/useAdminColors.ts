/**
 * Dedicated Admin Colors Composable with Pagination, Search & Auto-Refetch Support
 * Handles fetchColors, changePage, deleteColor, submitForm (FormData)
 */
import { ref, computed } from 'vue'
import {
  adminColorsApiService,
  buildColorFormData,
  type AdminColorItem,
  type ColorFormDataPayload,
  type PaginationMeta,
  type ColorType
} from '~/services/adminColorsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminColors = () => {
  const toast = useToast()
  const { adminCookie } = useAdminAuth()

  const colors = ref<AdminColorItem[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')

  // Pagination State
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(10)
  const totalColors = ref(0)

  const getToken = (): string => {
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || ''
    }
    return ''
  }

  /**
   * 1. GET Colors List (with pagination, anti-cache & searchValue)
   */
  const fetchColors = async (
    search: string = searchQuery.value,
    page: number = currentPage.value,
    limit: number = perPage.value
  ): Promise<AdminColorItem[]> => {
    isLoading.value = true
    errorMessage.value = ''
    currentPage.value = page
    perPage.value = limit
    const token = getToken()

    try {
      const res = await adminColorsApiService.fetchColors(token, search, page, limit)
      if (res.success) {
        colors.value = [...res.data]
        if (res.pagination) {
          currentPage.value = res.pagination.current_page
          lastPage.value = res.pagination.last_page
          perPage.value = res.pagination.per_page
          totalColors.value = res.pagination.total
        }
      } else {
        errorMessage.value = res.message || 'تعذر جلب قائمة الألوان.'
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب الألوان.'
    } finally {
      isLoading.value = false
    }

    return colors.value
  }

  /**
   * Navigate to a specific page
   */
  const changePage = async (page: number) => {
    if (page < 1 || page > lastPage.value || page === currentPage.value) return
    await fetchColors(searchQuery.value, page, perPage.value)
  }

  /**
   * 2. DELETE Color by ID
   */
  const deleteColor = async (id: string | number): Promise<boolean> => {
    const token = getToken()
    isLoading.value = true

    try {
      const res = await adminColorsApiService.deleteColor(id, token)
      if (res.success) {
        colors.value = colors.value.filter(c => String(c.id) !== String(id))
        totalColors.value = Math.max(0, totalColors.value - 1)
        toast.success('تم الحذف', res.message || 'تم حذف اللون بنجاح.')
        return true
      } else {
        toast.error('خطأ في الحذف', res.message || 'لم نتمكن من حذف اللون.')
        return false
      }
    } catch (err: any) {
      toast.error('خطأ في الشبكة', 'تعذر الاتصال بالسيرفر لحذف اللون.')
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 3. SUBMIT Form (POST Add / POST Update via FormData) with Immediate Refetch
   */
  const submitForm = async (
    payload: ColorFormDataPayload,
    isEditMode: boolean = false,
    colorId?: string | number
  ): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const formData = buildColorFormData(payload)

      let res
      if (isEditMode && (colorId || payload.id)) {
        const id = colorId || payload.id!
        res = await adminColorsApiService.updateColor(id, formData, token)
      } else {
        res = await adminColorsApiService.addColor(formData, token)
      }

      if (res.success) {
        toast.success(
          isEditMode ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح',
          res.message || (isEditMode ? 'تم تحديث بيانات اللون بنجاح.' : 'تم إضافة اللون الجديد بنجاح.')
        )

        // Optimistic State Update for Immediate Response
        if (!isEditMode && res.data) {
          const newItem: AdminColorItem = {
            id: res.data.id || Date.now(),
            name: payload.name,
            color_type: payload.color_type,
            code: payload.code,
            image: res.data.image_full_url?.path || res.data.image || ''
          }
          colors.value = [newItem, ...colors.value]
          totalColors.value = totalColors.value + 1
        } else if (isEditMode && (colorId || payload.id)) {
          const targetId = String(colorId || payload.id)
          const idx = colors.value.findIndex(c => String(c.id) === targetId)
          if (idx !== -1) {
            colors.value[idx] = {
              ...colors.value[idx],
              name: payload.name,
              color_type: payload.color_type,
              code: payload.code,
              image: payload.existingImage || colors.value[idx].image
            }
          }
        }

        // Refetch fresh data from server
        await fetchColors(searchQuery.value, currentPage.value, perPage.value)
        return true
      } else {
        errorMessage.value = res.message || 'فشل حفظ بيانات اللون.'
        toast.error('فشل العملية', errorMessage.value)
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ غير متوقع أثناء إرسال بيانات اللون.'
      toast.error('خطأ في النظام', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Find a color item by ID from local list or API
   */
  const getColorById = async (id: string | number): Promise<AdminColorItem | null> => {
    const existing = colors.value.find(c => String(c.id) === String(id))
    if (existing) return existing

    const list = await fetchColors('', 1, 100)
    return list.find(c => String(c.id) === String(id)) || null
  }

  // Quick statistics
  const totalCount = computed(() => totalColors.value || colors.value.length)
  const codeColorsCount = computed(() => colors.value.filter(c => c.color_type === 'code').length)
  const imageColorsCount = computed(() => colors.value.filter(c => c.color_type === 'image').length)

  return {
    colors,
    isLoading,
    isSubmitting,
    errorMessage,
    searchQuery,
    currentPage,
    lastPage,
    perPage,
    totalColors,
    totalCount,
    codeColorsCount,
    imageColorsCount,
    fetchColors,
    changePage,
    deleteColor,
    submitForm,
    getColorById
  }
}
