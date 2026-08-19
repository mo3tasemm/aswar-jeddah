/**
 * Dedicated Admin Products Composable with Pagination Support
 * Handles fetchProducts, page navigation, deleteProduct, and submitForm (FormData)
 */
import { ref } from 'vue'
import { 
  adminProductsApiService, 
  buildProductFormData, 
  extractCleanFilename,
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
   * 3. SUBMIT Form (Two-step flow: Upload images to /upload-images -> send names to /add or /update)
   */
  const submitForm = async (payload: ProductFormDataPayload, isEditMode: boolean = false, productId?: string | number): Promise<boolean> => {
    isSubmitting.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const processedPayload: ProductFormDataPayload = { ...payload }

      // Step 1: Upload Images first & receive string filenames
      // 1.1 Upload Thumbnail
      if (payload.thumbnail && typeof payload.thumbnail !== 'string' && (payload.thumbnail instanceof File || payload.thumbnail instanceof Blob)) {
        const thumbRes = await adminProductsApiService.uploadProductImage(payload.thumbnail as File, 'thumbnail', token)
        if (!thumbRes.success || !thumbRes.imageName) {
          throw new Error(thumbRes.message || 'فشل رفع صورة الغلاف (Thumbnail).')
        }
        processedPayload.thumbnail = thumbRes.imageName
      } else if (typeof payload.thumbnail === 'string') {
        processedPayload.thumbnail = extractCleanFilename(payload.thumbnail)
      }

      // 1.2 Upload Gallery Images
      if (payload.images && payload.images.length > 0) {
        const uploadedImages: string[] = []
        for (const img of payload.images) {
          if (img && typeof img !== 'string' && (img instanceof File || img instanceof Blob)) {
            const imgRes = await adminProductsApiService.uploadProductImage(img as File, 'product', token)
            if (!imgRes.success || !imgRes.imageName) {
              throw new Error(imgRes.message || 'فشل رفع إحدى صور المنتج.')
            }
            uploadedImages.push(imgRes.imageName)
          } else if (typeof img === 'string' && img.trim()) {
            uploadedImages.push(extractCleanFilename(img))
          }
        }
        processedPayload.images = uploadedImages
      }

      // 1.3 Upload Color Images
      if (payload.color_images && Object.keys(payload.color_images).length > 0) {
        const uploadedColorImages: Record<string, string> = {}
        for (const [colorKey, fileOrStr] of Object.entries(payload.color_images)) {
          if (fileOrStr && typeof fileOrStr !== 'string' && (fileOrStr instanceof File || fileOrStr instanceof Blob)) {
            const colorImgRes = await adminProductsApiService.uploadProductImage(fileOrStr as File, 'product', token)
            if (!colorImgRes.success || !colorImgRes.imageName) {
              throw new Error(colorImgRes.message || `فشل رفع صورة اللون ${colorKey}`)
            }
            uploadedColorImages[colorKey] = colorImgRes.imageName
          } else if (typeof fileOrStr === 'string' && fileOrStr.trim()) {
            uploadedColorImages[colorKey] = extractCleanFilename(fileOrStr)
          }
        }
        processedPayload.color_images = uploadedColorImages
      }

      // Step 2: Build FormData with clean text image filenames & post to /add or /update/{id}
      const formData = buildProductFormData(processedPayload)

      let res
      if (isEditMode && (productId || processedPayload.id)) {
        const id = productId || processedPayload.id!
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
      errorMessage.value = err?.data?.message || err?.message || 'حدث خطأ أثناء حفظ بيانات وصور المنتج.'
      toast.error('خطأ في العملية', errorMessage.value)
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * 4. GET Product Details by ID for Edit Form
   */
  const fetchProductDetails = async (id: string | number): Promise<ProductFormDataPayload | null> => {
    isLoading.value = true
    errorMessage.value = ''
    const token = getToken()

    try {
      const res = await adminProductsApiService.fetchProductDetails(id, token)
      if (res.success && res.data) {
        return res.data
      } else {
        errorMessage.value = res.message || 'تعذر جلب تفاصيل المنتج.'
        return null
      }
    } catch (err: any) {
      errorMessage.value = 'حدث خطأ في الشبكة أثناء جلب تفاصيل المنتج.'
      return null
    } finally {
      isLoading.value = false
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
    fetchProductDetails,
    changePage,
    deleteProduct,
    submitForm
  }
}
