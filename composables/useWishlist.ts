/**
 * Production-ready Wishlist Composable connected to live WedgetStore Wishlist API
 * Features singleton shared state, request deduplication, optimistic UI updates & strict error handling.
 */
import { ref, computed, watch, onMounted } from 'vue'
import type { Product } from '~/types/product'
import { wishlistApiService } from '~/services/wishlistApiService'
import { useToast } from '~/composables/useToast'
import { useAuthDrawer } from '~/composables/useAuthDrawer'

// Module-level shared singleton state across all component instances
const wishlistItems = ref<Product[]>([])
const wishlistPending = ref<boolean>(false)
const wishlistError = ref<string | null>(null)
const isInitialized = ref<boolean>(false)
const isFetchingWishlist = ref<boolean>(false)

export const useWishlist = () => {
  const toast = useToast()
  const { toggleLogin } = useAuthDrawer()

  /**
   * Helper to verify if user is authenticated before critical wishlist actions
   */
  const checkAuth = (): boolean => {
    const token = useCookie('auth_token').value || 
                  useCookie('token').value || 
                  useCookie('access_token').value || 
                  (process.client ? localStorage.getItem('auth_token') || localStorage.getItem('token') : null)

    if (!token) {
      toast.info('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة.')
      toggleLogin()
      return false
    }
    return true
  }

  // Initialize from LocalStorage and sync with API (with deduplication lock)
  const loadWishlist = async (force: boolean = false) => {
    // Prevent duplicate concurrent fetches
    if (isFetchingWishlist.value) return

    if (process.client && !isInitialized.value) {
      try {
        const saved = localStorage.getItem('aswar_wishlist_items')
        if (saved) {
          wishlistItems.value = JSON.parse(saved)
        }
      } catch (e) {
        console.error('Failed to load local wishlist items:', e)
      } finally {
        isInitialized.value = true
      }
    }

    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token') || localStorage.getItem('user_token') || localStorage.getItem('access_token')) : null
    
    if (token) {
      isFetchingWishlist.value = true
      wishlistPending.value = true
      wishlistError.value = null

      try {
        const res = await wishlistApiService.fetchWishlist()
        if (res.products && Array.isArray(res.products)) {
          wishlistItems.value = res.products
        } else if (res.error) {
          wishlistError.value = res.error
        }
      } catch (err) {
        console.warn('[useWishlist] Live sync error:', err)
      } finally {
        wishlistPending.value = false
        isFetchingWishlist.value = false
      }
    } else {
      wishlistPending.value = false
      isFetchingWishlist.value = false
    }
  }

  // Persist to LocalStorage whenever state changes
  watch(wishlistItems, (newVal) => {
    if (process.client) {
      try {
        localStorage.setItem('aswar_wishlist_items', JSON.stringify(newVal))
      } catch (e) {
        console.error('Failed to save wishlist to localStorage:', e)
      }
    }
  }, { deep: true })

  // Trigger load once on client if not already initialized or fetching
  onMounted(() => {
    if (process.client && !isFetchingWishlist.value && wishlistItems.value.length === 0) {
      loadWishlist()
    }
  })

  const isInWishlist = (productId: number | string) => {
    return wishlistItems.value.some(p => String(p.id) === String(productId))
  }

  const addToWishlist = async (product: Product) => {
    if (!product || !product.id) return

    // Actions Protection: Check authentication
    if (!checkAuth()) return

    if (isInWishlist(product.id)) {
      toast.info('المنتج موجود بالفعل في المفضلة')
      return
    }

    // Optimistic UI update
    wishlistItems.value.push(product)
    toast.success('تمت إضافة المنتج للمفضلة', product.title || product.name)

    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token')) : null
    if (token) {
      const res = await wishlistApiService.addToWishlist(product.id)
      if (!res.success) {
        console.warn('[useWishlist] API sync warning:', res.message)
      }
    }
  }

  const removeFromWishlist = async (productId: number | string) => {
    // Actions Protection: Check authentication
    if (!checkAuth()) return

    wishlistItems.value = wishlistItems.value.filter(p => String(p.id) !== String(productId))
    toast.info('تمت إزالة المنتج من المفضلة')

    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token')) : null
    if (token) {
      const res = await wishlistApiService.removeFromWishlist(productId)
      if (!res.success) {
        console.warn('[useWishlist] API sync warning:', res.message)
      }
    }
  }

  const clearWishlist = async () => {
    const items = [...wishlistItems.value]
    wishlistItems.value = []
    if (process.client) {
      localStorage.removeItem('aswar_wishlist_items')
    }

    const token = process.client ? (localStorage.getItem('auth_token') || localStorage.getItem('token')) : null
    if (token) {
      items.forEach(async (item) => {
        await wishlistApiService.removeFromWishlist(item.id)
      })
    }
  }

  const wishlistCount = computed(() => wishlistItems.value.length)

  return {
    wishlist: wishlistItems,
    wishlistItems,
    wishlistPending,
    wishlistError,
    wishlistCount,
    loadWishlist,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist
  }
}
