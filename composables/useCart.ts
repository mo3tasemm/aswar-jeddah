/**
 * Production-ready Vue 3 / Nuxt 3 Cart Composable connected to live WedgetStore Cart API
 * Features global singleton state, request deduplication lock & dynamic locale sync.
 */
import { ref, computed, watch, onMounted } from 'vue'
import type { CartItem, Product } from '~/types/product'
import { cartApiService } from '~/services/cartApiService'
import { useLanguage } from '~/composables/useLanguage'
import { useToast } from '~/composables/useToast'

// Module-level shared singleton state
const globalCartItems = ref<CartItem[]>([])
const isCartOpenState = ref<boolean>(false)
const isCartLoadingState = ref<boolean>(false)
const isCartInitialized = ref<boolean>(false)
const isFetchingCart = ref<boolean>(false)

export const useCart = () => {
  const { currentLanguage, formatCurrency } = useLanguage()
  const toast = useToast()

  /**
   * Load cart from backend API with global deduplication lock
   */
  const loadCart = async (force: boolean = false) => {
    if (isFetchingCart.value && !force) return
    if (isCartInitialized.value && !force) return

    isFetchingCart.value = true
    isCartLoadingState.value = true

    try {
      const items = await cartApiService.fetchCart()
      globalCartItems.value = items || []
      isCartInitialized.value = true
    } catch (err) {
      console.warn('[useCart] Failed to sync cart with API:', err)
    } finally {
      isCartLoadingState.value = false
      isFetchingCart.value = false
    }
  }

  // Trigger load once on client side
  onMounted(() => {
    if (process.client && !isCartInitialized.value && !isFetchingCart.value) {
      loadCart()
    }
  })

  // Watch for language changes and refresh localized cart names
  watch(currentLanguage, () => {
    if (process.client && isCartInitialized.value) {
      loadCart(true)
    }
  })

  const toggleCart = () => {
    isCartOpenState.value = !isCartOpenState.value
  }

  const openCart = () => {
    isCartOpenState.value = true
  }

  const closeCart = () => {
    isCartOpenState.value = false
  }

  /**
   * Add item to cart
   * Payload: id (product id), quantity, options
   */
  const addToCart = async (product: Product, quantity: number = 1, size?: string, color?: string) => {
    if (!product || !product.id) return

    // Optimistic local update
    const existingIndex = globalCartItems.value.findIndex(
      (item) => String(item.product?.id) === String(product.id) && item.selectedSize === size && item.selectedColor === color
    )

    if (existingIndex > -1) {
      globalCartItems.value[existingIndex].quantity += quantity
    } else {
      const tempId = `temp-${product.id}-${Date.now()}`
      globalCartItems.value.push({
        id: tempId,
        key: tempId,
        cartKey: tempId,
        product_id: product.id,
        product,
        quantity,
        selectedSize: size,
        selectedColor: color
      })
    }

    const prodTitle = currentLanguage.value === 'en' 
      ? (product.title_en || product.name_en || product.title || product.name) 
      : (product.title || product.name)
    toast.success(currentLanguage.value === 'en' ? 'Item added to cart' : 'تمت إضافة المنتج إلى السلة', prodTitle)

    // Backend sync
    try {
      await cartApiService.addToCart(product.id, quantity, { variant: size, color })
    } catch (e) {
      console.warn('[useCart] API sync fallback:', e)
    } finally {
      await loadCart(true)
    }
  }

  /**
   * Remove item from cart by cartItemKey (or product.id)
   * Payload: key (cart item key)
   */
  const removeFromCart = async (targetId: string | number) => {
    if (!targetId && targetId !== 0) return

    const index = globalCartItems.value.findIndex(
      (item) => String(item.id) === String(targetId) || 
                String(item.key) === String(targetId) || 
                String(item.cartKey) === String(targetId) || 
                String(item.product?.id) === String(targetId)
    )

    let targetKey: string | number = targetId
    if (index > -1) {
      const removedItem = globalCartItems.value.splice(index, 1)[0]
      targetKey = removedItem.key || removedItem.id || removedItem.cartKey || targetId
    }

    toast.info(currentLanguage.value === 'en' ? 'Item removed from cart' : 'تمت إزالة المنتج من السلة')

    try {
      await cartApiService.removeFromCart(targetKey)
    } catch (e) {
      console.warn('[useCart] Remove API sync fallback:', e)
    } finally {
      await loadCart(true)
    }
  }

  /**
   * Update item quantity by cartItemKey (or product.id)
   * Payload: key (cart item key), quantity
   */
  const updateQuantity = async (targetId: string | number, newQty: number) => {
    if (!targetId && targetId !== 0) return

    const item = globalCartItems.value.find(
      (i) => String(i.id) === String(targetId) || 
             String(i.key) === String(targetId) || 
             String(i.cartKey) === String(targetId) || 
             String(i.product?.id) === String(targetId)
    )

    if (!item) return

    if (newQty <= 0) {
      await removeFromCart(targetId)
      return
    }

    item.quantity = newQty
    const targetKey = item.key || item.id || item.cartKey || targetId

    try {
      await cartApiService.updateQuantity(targetKey, newQty)
    } catch (e) {
      console.warn('[useCart] Update Qty API sync fallback:', e)
    } finally {
      await loadCart(true)
    }
  }

  /**
   * Clear entire cart with key/cart_group_id support and item keys fallback
   */
  const clearCart = async () => {
    const itemsToClear = [...globalCartItems.value]
    const itemKeys = itemsToClear.map(i => i.key || i.id || i.product?.id).filter(Boolean) as (string | number)[]
    const cartGroupId = itemsToClear.find(i => i.cart_group_id)?.cart_group_id

    globalCartItems.value = []
    try {
      await cartApiService.clearAllCart({ cartGroupId, itemKeys })
      toast.info(currentLanguage.value === 'en' ? 'Cart cleared' : 'تم تفريغ السلة')
    } catch (e) {
      console.warn('[useCart] Clear cart API error:', e)
    } finally {
      await loadCart(true)
    }
  }

  const cartCount = computed(() => {
    return globalCartItems.value.reduce((total, item) => total + (item.quantity || 1), 0)
  })

  const cartTotal = computed(() => {
    return globalCartItems.value.reduce((total, item) => {
      const price = typeof item.product?.price === 'number' ? item.product.price : Number(item.product?.price || 0)
      return total + (isNaN(price) ? 0 : price) * (item.quantity || 1)
    }, 0)
  })

  const formattedCartTotal = computed(() => {
    return formatCurrency(cartTotal.value || 0)
  })

  return {
    cart: globalCartItems,
    isCartOpen: isCartOpenState,
    isCartLoading: isCartLoadingState,
    cartCount,
    cartTotal,
    formattedCartTotal,
    loadCart,
    toggleCart,
    openCart,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  }
}
