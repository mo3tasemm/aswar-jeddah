/**
 * Dedicated Admin Brands Composable with Pagination & Auto-Refetch Support
 * Handles fetchBrands, changePage, deleteBrand, and submitForm (FormData)
 */
import { ref } from 'vue'
import { 
  adminBrandsApiService, 
  buildBrandFormData, 
  type AdminBrandItem, 
  type BrandFormDataPayload,
  type PaginationMeta
} from '~/services/adminBrandsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminBrands = () => {
  const toast = useToast()
  const { adminCookie } = useAdminAuth()

  const brands = ref<AdminBrandItem[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')
  const searchQuery = ref('')

  // Pagination State
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(10)
  const totalBrands = ref(0)

  const getToken = (): string => {
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || ''
    }
    return ''
  }

  /**
   * 1. GET Brands List (with pagination, anti-cache & searchValue)
   */
  const fetchBrands = async (
    search: string = searchQuery.value, 
    page: number = currentPage.value, 
    limit: number = perPage.value
  ): Promise<AdminBrandItem[]> => {
    isLoading.value = true
    errorMessage.value = ''
    currentPage.value = page
    perPage.value = limit
    const token = getToken()

    try {
      const res = await adminBrandsApiService.fetchBrands(token, search, page, limit)
      if (res.success) {
        brands.value = [...res.data]
        if (res.pagination) {
          currentPage.value = res.pagination.current_page
          lastPage.value = res.pagination.last_page
          perPage.value = res.pagination.per_page
          totalBrands.value = res.pagination.total
        }
      } else {
        errorMessage.value = res.message || 'تعذر جلب قائمة العلامات التجارية.'
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب العلامات التجارية.'
    } finally {
      isLoading.value = false
    }

    return brands.value
  }

  /**
   * Navigate to a specific page
   */
  const changePage = async (page: number) => {
    if (page < 1 || page > lastPage.value || page === currentPage.value) return
    await fetchBrands(searchQuery.value, page, perPage.value)
  }

  /**
   * 2. DELETE Brand by ID
   */
  const deleteBrand = async (id: string | number): Promise<boolean> => {
    const token = getToken()
    isLoading.value = true

    try {
      const res = await adminBrandsApiService.deleteBrand(id, token)
      if (res.success) {
        brands.value = brands.value.filter(b => String(b.id) !== String(id))
        totalBrands.value = Math.max(0, totalBrands.value - 1)
        toast.success('تم الحذف', res.message || 'تم حذف العلامة التجارية بنجاح.')
        return true
      } else {
        toast.error('خطأ في الحذف', res.message || 'لم نتمكن من حذف العلامة التجارية.')
        return false
      }
    } catch (err: any) {
      toast.error('خطأ في الشبكة', 'تعذر الاتصال بالسيرفر لحذف العلامة التجارية.')
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 3. SUBMIT Form (POST Add / POST Update via FormData) with Immediate Refetch
   */
  const submitForm = async (payload: BrandFormDataPayload, isEditMode: boolean = false, brandId?: string | number): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const formData = buildBrandFormData(payload)

      let res
      if (isEditMode && (brandId || payload.id)) {
        const id = brandId || payload.id!
        res = await adminBrandsApiService.updateBrand(id, formData, token)
      } else {
        res = await adminBrandsApiService.addBrand(formData, token)
      }

      if (res.success) {
        toast.success(
          isEditMode ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح', 
          res.message || (isEditMode ? 'تم تحديث بيانات العلامة التجارية.' : 'تم إضافة العلامة التجارية الجديدة بنجاح.')
        )

        // Optimistic State Update for Immediate Response
        if (!isEditMode && res.data) {
          const newItem: AdminBrandItem = {
            id: res.data.id || Date.now(),
            name: payload.name_ar,
            name_ar: payload.name_ar,
            name_en: payload.name_en || '',
            image: res.data.image_full_url?.path || res.data.image || ''
          }
          brands.value = [newItem, ...brands.value]
          totalBrands.value = totalBrands.value + 1
        } else if (isEditMode && (brandId || payload.id)) {
          const targetId = String(brandId || payload.id)
          const idx = brands.value.findIndex(b => String(b.id) === targetId)
          if (idx !== -1) {
            brands.value[idx] = {
              ...brands.value[idx],
              name: payload.name_ar,
              name_ar: payload.name_ar,
              name_en: payload.name_en || ''
            }
          }
        }

        // Automatic Server Refetch with Anti-Cache Timestamp
        await fetchBrands(searchQuery.value, currentPage.value, perPage.value)
        return true
      } else {
        errorMessage.value = res.message || 'فشل حفظ بيانات العلامة التجارية.'
        toast.error('فشل العملية', errorMessage.value)
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ غير متوقع أثناء إرسال بيانات العلامة التجارية.'
      toast.error('خطأ في النظام', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    brands,
    isLoading,
    isSubmitting,
    errorMessage,
    searchQuery,
    currentPage,
    lastPage,
    perPage,
    totalBrands,
    fetchBrands,
    changePage,
    deleteBrand,
    submitForm
  }
}
