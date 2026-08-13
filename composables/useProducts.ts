/**
 * Production-ready Vue 3 / Nuxt 3 Composable for Managing Pure Backend Products & Reviews State
 */
import { ref, computed, watch } from 'vue'
import type { Product, ProductFetchParams } from '~/types/product'
import { productApiService, type ProductReviewItem } from '~/services/productApiService'
import { useLanguage } from '~/composables/useLanguage'

export const useProducts = () => {
  // Reactive Language Composable State
  const { apiLocale, currentLanguage } = useLanguage()

  // Reactive State Variables
  const products = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const productReviews = ref<ProductReviewItem[]>([])
  const pending = ref<boolean>(false)
  const reviewsPending = ref<boolean>(false)
  const error = ref<string | null>(null)
  const totalProducts = ref<number>(0)
  const lastParams = ref<ProductFetchParams>({})

  // Derived Computed Properties
  const isEmpty = computed(() => !pending.value && !error.value && products.value.length === 0)
  const hasError = computed(() => error.value !== null)

  /**
   * Fetch filtered products directly via WedgetStore Filter API with strict state overwrite
   */
  const fetchFilteredProducts = async (params: ProductFetchParams = {}) => {
    pending.value = true
    error.value = null
    products.value = []
    lastParams.value = { ...params }

    const activeParams: ProductFetchParams = {
      locale: params.locale || apiLocale.value,
      ...params
    }

    try {
      const result = await productApiService.fetchFilteredProducts(activeParams)
      products.value = Array.isArray(result?.products) ? result.products : []
      totalProducts.value = Number(result?.total) || products.value.length
    } catch (err: any) {
      console.error('[useProducts] Filter request failed:', err)
      error.value = err?.message || (currentLanguage.value === 'en' ? 'An error occurred while fetching filtered products.' : 'حدث خطأ أثناء جلب المنتجات المفلترة.')
      products.value = []
      totalProducts.value = 0
    } finally {
      pending.value = false
    }
  }

  /**
   * Fetch products list directly from WedgetStore Latest API
   */
  const loadProducts = async (params: ProductFetchParams = {}) => {
    return fetchFilteredProducts(params)
  }

  /**
   * Fetch details for a specific single product by slug or ID
   */
  const loadProductBySlug = async (slugOrId: string) => {
    pending.value = true
    error.value = null
    currentProduct.value = null
    productReviews.value = []

    try {
      const result = await productApiService.fetchProductDetails(slugOrId)
      if (!result) {
        error.value = currentLanguage.value === 'en' ? 'The requested product is unavailable or not found.' : 'المنتج المطلوب غير موجود أو غير متاح حالياً.'
      } else {
        currentProduct.value = result
        if (result.id) {
          loadProductReviews(result.id)
        }
      }
    } catch (err: any) {
      console.error(`[useProducts] Failed to fetch product details for ${slugOrId}:`, err)
      error.value = currentLanguage.value === 'en' ? 'Could not load product details.' : 'تعذر تحميل تفاصيل المنتج.'
    } finally {
      pending.value = false
    }
  }

  /**
   * Fetch live reviews list for a specific product ID
   */
  const loadProductReviews = async (productId: number | string) => {
    reviewsPending.value = true
    try {
      const data = await productApiService.fetchProductReviews(productId, '12345', apiLocale.value)
      productReviews.value = data
    } catch (err) {
      console.warn(`[useProducts] Failed to load reviews for product ${productId}:`, err)
      productReviews.value = []
    } finally {
      reviewsPending.value = false
    }
  }

  /**
   * Watcher: Auto-refetch products whenever the locale/language changes anywhere in the app
   */
  watch([apiLocale, currentLanguage], ([newLocale]) => {
    if (currentProduct.value?.slug) {
      loadProductBySlug(currentProduct.value.slug)
    } else if (lastParams.value && Object.keys(lastParams.value).length > 0) {
      fetchFilteredProducts({ ...lastParams.value, locale: newLocale })
    }
  })

  /**
   * Search products by keyword via backend API
   */
  const searchProducts = async (query: string) => {
    if (!query.trim()) {
      return fetchFilteredProducts()
    }
    return fetchFilteredProducts({ search: query.trim() })
  }

  /**
   * Filter products by Category ID via backend API
   */
  const loadCategoryProducts = async (categoryId: number | string, limit: number = 12) => {
    return fetchFilteredProducts({ category_id: categoryId, limit })
  }

  /**
   * Filter products by Brand ID via backend API
   */
  const loadBrandProducts = async (brandId: number | string, limit: number = 12) => {
    return fetchFilteredProducts({ brand_id: brandId, limit })
  }

  return {
    // State
    products,
    currentProduct,
    productReviews,
    pending,
    reviewsPending,
    error,
    isEmpty,
    hasError,
    totalProducts,
    currentLocale: apiLocale,

    // Actions
    loadProducts,
    fetchFilteredProducts,
    loadProductBySlug,
    loadProductReviews,
    searchProducts,
    loadCategoryProducts,
    loadBrandProducts
  }
}
