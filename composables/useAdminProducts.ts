/**
 * Dedicated Admin Products Composable with Pagination Support
 * Handles fetchProducts, page navigation, deleteProduct, and submitForm (FormData)
 */
import { ref } from 'vue'
import { 
  adminProductsApiService, 
  buildProductFormData, 
  type AdminProductItem, 
  type ProductFormDataPayload,
  type PaginationMeta
} from '~/services/adminProductsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminProducts = () => {
  const toast = useToast()
  const { adminCookie } = useAdminAuth()

  const products = ref<AdminProductItem[]>([])
  const isLoading = ref(false)
  const isSubmitting = ref(false)
  const errorMessage = ref('')

  // Pagination State
  const currentPage = ref(1)
  const lastPage = ref(1)
  const perPage = ref(10)
  const totalProducts = ref(0)

  const getToken = (): string => {
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || ''
    }
    return ''
  }

  /**
   * 1. GET Products List with Pagination (page & limit)
   */
  const fetchProducts = async (page: number = currentPage.value, limit: number = perPage.value): Promise<AdminProductItem[]> => {
    isLoading.value = true
    errorMessage.value = ''
    currentPage.value = page
    perPage.value = limit
    const token = getToken()

    try {
      const res = await adminProductsApiService.fetchProducts(token, page, limit)
      if (res.success) {
        products.value = res.data
        if (res.pagination) {
          currentPage.value = res.pagination.current_page
          lastPage.value = res.pagination.last_page
          perPage.value = res.pagination.per_page
          totalProducts.value = res.pagination.total
        }
      } else {
        errorMessage.value = res.message || 'تعذر جلب قائمة المنتجات.'
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب المنتجات.'
    } finally {
      isLoading.value = false
    }

    return products.value
  }

  /**
   * Navigate to a specific page
   */
  const changePage = async (page: number) => {
    if (page < 1 || page > lastPage.value || page === currentPage.value) return
    await fetchProducts(page, perPage.value)
  }

  /**
   * 2. DELETE Product by ID
   */
  const deleteProduct = async (id: string | number): Promise<boolean> => {
    const token = getToken()
    isLoading.value = true

    try {
      const res = await adminProductsApiService.deleteProduct(id, token)
      if (res.success) {
        products.value = products.value.filter(p => String(p.id) !== String(id))
        totalProducts.value = Math.max(0, totalProducts.value - 1)
        toast.success('تم الحذف', res.message || 'تم حذف المنتج بنجاح.')
        return true
      } else {
        toast.error('خطأ في الحذف', res.message || 'لم نتمكن من حذف المنتج.')
        return false
      }
    } catch (err: any) {
      toast.error('خطأ في الشبكة', 'تعذر الاتصال بالسيرفر لحذف المنتج.')
      return false
    } finally {
      isLoading.value = false
    }
  }

  /**
   * 3. SUBMIT Form (Direct Multipart FormData with Binary Files -> POST Add / POST Update)
   * NOTE: /api/v1/admin/products/upload-images does NOT exist on this server.
   * Images are sent directly as binary files inside the add/update request.
   */
  const submitForm = async (payload: ProductFormDataPayload, isEditMode: boolean = false, productId?: string | number): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const formData = buildProductFormData(payload)

      let res
      if (isEditMode && (productId || payload.id)) {
        const id = productId || payload.id!
        res = await adminProductsApiService.updateProduct(id, formData, token)
      } else {
        res = await adminProductsApiService.addProduct(formData, token)
      }

      if (res.success) {
        toast.success(
          isEditMode ? 'تم التحديث بنجاح' : 'تمت الإضافة بنجاح', 
          res.message || (isEditMode ? 'تم تحديث بيانات المنتج.' : 'تم إضافة المنتج الجديد إلى القائمة.')
        )
        await fetchProducts(currentPage.value, perPage.value)
        return true
      } else {
        errorMessage.value = res.message || 'فشل حفظ بيانات المنتج.'
        toast.error('فشل العملية', errorMessage.value)
        return false
      }
    } catch (err: any) {
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ غير متوقع أثناء إرسال البيانات.'
      toast.error('خطأ في النظام', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    products,
    isLoading,
    isSubmitting,
    errorMessage,
    currentPage,
    lastPage,
    perPage,
    totalProducts,
    fetchProducts,
    changePage,
    deleteProduct,
    submitForm
  }
}
