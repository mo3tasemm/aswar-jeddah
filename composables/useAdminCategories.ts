/**
 * Dedicated Admin Categories Composable with Auto-Refresh & Optimistic State Update
 * Handles fetchCategories, deleteCategory, and submitForm (FormData)
 */
import { ref } from 'vue'
import { 
  adminCategoriesApiService, 
  buildCategoryFormData, 
  type AdminCategoryItem, 
  type CategoryFormDataPayload 
} from '~/services/adminCategoriesApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminCategories = () => {
  const toast = useToast()
  const { adminCookie } = useAdminAuth()

  const categories = ref<AdminCategoryItem[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')

  const getToken = (): string => {
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || ''
    }
    return ''
  }

  /**
   * 1. GET Categories List (with anti-cache & searchValue)
   */
  const fetchCategories = async (search: string = searchQuery.value): Promise<AdminCategoryItem[]> => {
    isLoading.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const res = await adminCategoriesApiService.fetchCategories(token, search)
      if (res.success) {
        // Fresh array replacement
        categories.value = [...res.data]
      } else {
        errorMessage.value = res.message || 'تعذر جلب قائمة الأقسام.'
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب الأقسام.'
    } finally {
      isLoading.value = false
    }

    return categories.value
  }

  /**
   * 2. DELETE Category by ID
   */
  const deleteCategory = async (id: string | number): Promise<boolean> => {
    const token = getToken()
    isLoading.value = true

    try {
      const res = await adminCategoriesApiService.deleteCategory(id, token)
      if (res.success) {
        categories.value = categories.value.filter(c => String(c.id) !== String(id))
        toast.success('تم الحذف', res.message || 'تم حذف القسم بنجاح.')
        return true
      } else {
        toast.error('خطأ في الحذف', res.message || 'لم نتمكن من حذف القسم.')
        return false
      }
    } catch (err: any) {
      toast.error('خطأ في الشبكة', 'تعذر الاتصال بالسيرفر لحذف القسم.')
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 3. SUBMIT Form (POST Add / POST Update via FormData) with Immediate Refetch
   */
  const submitForm = async (payload: CategoryFormDataPayload, isEditMode: boolean = false, categoryId?: string | number): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const formData = buildCategoryFormData(payload)

      let res
      if (isEditMode && (categoryId || payload.id)) {
        const id = categoryId || payload.id!
        res = await adminCategoriesApiService.updateCategory(id, formData, token)
      } else {
        res = await adminCategoriesApiService.addCategory(formData, token)
      }

      if (res.success) {
        toast.success(
          isEditMode ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح', 
          res.message || (isEditMode ? 'تم تحديث بيانات القسم.' : 'تم إضافة القسم الجديد بنجاح.')
        )

        // Optimistic State Update for Immediate Response
        if (!isEditMode && res.data) {
          const newItem: AdminCategoryItem = {
            id: res.data.id || Date.now(),
            name: payload.name_ar,
            name_ar: payload.name_ar,
            name_en: payload.name_en || '',
            image: res.data.image_full_url?.path || res.data.image || '',
            icon: res.data.icon_full_url?.path || res.data.icon || ''
          }
          categories.value = [newItem, ...categories.value]
        } else if (isEditMode && (categoryId || payload.id)) {
          const targetId = String(categoryId || payload.id)
          const idx = categories.value.findIndex(c => String(c.id) === targetId)
          if (idx !== -1) {
            categories.value[idx] = {
              ...categories.value[idx],
              name: payload.name_ar,
              name_ar: payload.name_ar,
              name_en: payload.name_en || ''
            }
          }
        }

        // Automatic Server Refetch with Anti-Cache Timestamp
        await fetchCategories()
        return true
      } else {
        errorMessage.value = res.message || 'فشل حفظ بيانات القسم.'
        toast.error('فشل العملية', errorMessage.value)
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ غير متوقع أثناء إرسال بيانات القسم.'
      toast.error('خطأ في النظام', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    categories,
    isLoading,
    isSubmitting,
    errorMessage,
    searchQuery,
    fetchCategories,
    deleteCategory,
    submitForm
  }
}
