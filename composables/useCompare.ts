/**
 * Production-ready Composable for Product Comparison State connected to live Compare API
 * Protected Actions: Guests are prompted to log in before adding items to compare list.
 */
import { ref, computed, watch, onMounted } from 'vue'
import type { Product } from '~/types/product'
import { compareApiService } from '~/services/compareApiService'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'
import { useAuthDrawer } from '~/composables/useAuthDrawer'

const compareList = ref<Product[]>([])
const isInitialized = ref(false)
const comparePending = ref(false)

export const useCompare = () => {
  const { currentLanguage } = useLanguage()
  const toast = useToast()
  const { toggleLogin } = useAuthDrawer()

  /**
   * Helper to verify if user is authenticated before critical compare actions
   */
  const checkAuth = (): boolean => {
    const token = useCookie('auth_token').value || 
                  useCookie('token').value || 
                  useCookie('access_token').value || 
                  (process.client ? localStorage.getItem('auth_token') || localStorage.getItem('token') : null)

    if (!token) {
      toast.info('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول أولاً لمقارنة المنتجات.')
      toggleLogin()
      return false
    }
    return true
  }

  // Initialize from LocalStorage & sync with live API
  onMounted(async () => {
    if (!isInitialized.value && process.client) {
      try {
        const saved = localStorage.getItem('aswar_compare_items')
        if (saved) {
          compareList.value = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Failed to load compare list from localStorage:', e)
      } finally {
        isInitialized.value = true
      }

      // Try fetching live list from API if token exists
      const token = localStorage.getItem('auth_token') || localStorage.getItem('token')
      if (token) {
        comparePending.value = true
        try {
          const res = await compareApiService.fetchCompareList()
          if (res.products && res.products.length > 0) {
            compareList.value = res.products
          }
        } catch (e) {
          console.warn('Compare API load failed:', e)
        } finally {
          comparePending.value = false
        }
      }
    }
  })

  // Watch and persist to localStorage
  watch(compareList, (newVal) => {
    if (process.client) {
      try {
        localStorage.setItem('aswar_compare_items', JSON.stringify(newVal))
      } catch (e) {
        console.error('Failed to save compare list to localStorage:', e)
      }
    }
  }, { deep: true })

  const compareCount = computed(() => compareList.value.length)

  const isInCompare = (productId: number | string) => {
    return compareList.value.some(p => String(p.id) === String(productId))
  }

  const addToCompare = async (product: Product) => {
    if (!product || !product.id) return

    // Actions Protection: Check authentication
    if (!checkAuth()) return

    if (isInCompare(product.id)) {
      toast.info('المنتج موجود بالفعل في المقارنة')
      return
    }

    if (compareList.value.length >= 4) {
      toast.error(
        currentLanguage.value === 'en' ? 'Max 4 items' : 'الحد الأقصى للمقارنة',
        currentLanguage.value === 'en' ? 'You can compare up to 4 products.' : 'يمكنك مقارنة حتى 4 منتجات في وقت واحد.'
      )
      return
    }

    compareList.value.push(product)
    toast.success('تمت إضافة المنتج للمقارنة', product.title)

    // Sync with API if token exists
    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token')) : null
    if (token) {
      await compareApiService.addToCompare(product.id)
    }
  }

  const removeFromCompare = (productId: number | string) => {
    if (!checkAuth()) return

    compareList.value = compareList.value.filter(p => String(p.id) !== String(productId))
    toast.info('تمت إزالة المنتج من المقارنة')
  }

  const toggleCompare = async (product: Product) => {
    if (!product || !product.id) return
    if (!checkAuth()) return

    if (isInCompare(product.id)) {
      removeFromCompare(product.id)
    } else {
      await addToCompare(product)
    }
  }

  const clearCompare = async () => {
    if (!checkAuth()) return

    compareList.value = []
    toast.info('تم تفريغ قائمة المقارنة')

    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token')) : null
    if (token) {
      await compareApiService.clearAllCompare()
    }
  }

  return {
    compareList,
    compareCount,
    comparePending,
    isInCompare,
    addToCompare,
    removeFromCompare,
    toggleCompare,
    clearCompare
  }
}
