/**
 * Production-ready Cart API Service Layer for WedgetStore Live API
 * Target Endpoints:
 * - GET    /api/v1/cart?guest_id=1&locale={ar|en}
 * - POST   /api/v1/cart/add?guest_id=1&locale={ar|en}
 * - PUT    /api/v1/cart/update?guest_id=1&locale={ar|en}
 * - DELETE /api/v1/cart/remove?guest_id=1&locale={ar|en}&key={id}&id={id}&product_id={id}
 * - DELETE /api/v1/cart/remove-all?guest_id=1&locale={ar|en}
 * Supports Authorization: Bearer <token> for logged in users and guest_id for guests.
 */
import type { CartItem, Product } from '~/types/product'
import { mapApiProductToProduct } from '~/types/product'

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    return localStorage.getItem('auth_token') || localStorage.getItem('token') || null
  }
  return null
}

const getGuestId = (): string => {
  if (process.client) {
    let guestId = localStorage.getItem('guest_id')
    if (!guestId) {
      guestId = '1'
      localStorage.setItem('guest_id', guestId)
    }
    return guestId
  }
  return '1'
}

const getLangCode = (): string => {
  if (process.client) {
    return localStorage.getItem('aswar_lang') || 'ar'
  }
  return 'ar'
}

const buildHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  const lang = getLangCode()
  const isEn = lang === 'en'

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': isEn ? 'en' : 'sa',
    'lang': isEn ? 'en' : 'sa',
    'X-Language': isEn ? 'en' : 'ar'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export const cartApiService = {
  /**
   * Fetch current cart contents from WedgetStore API
   */
  async fetchCart(guestIdInput?: string | number): Promise<CartItem[]> {
    try {
      const guestId = guestIdInput || getGuestId()
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/cart?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(),
        timeout: 8000
      })

      const rawItems = Array.isArray(response) ? response : (response?.data || response?.cart || [])
      
      return rawItems.map((item: any) => {
        const prod = item.product || item
        const mappedProduct = mapApiProductToProduct(prod)
        return {
          id: item.id || `cart-${prod?.id || Math.random()}`,
          product: mappedProduct,
          quantity: Number(item.quantity || item.qty || 1),
          selectedSize: item.variant || item.size || undefined,
          selectedColor: item.color || undefined
        }
      })
    } catch (error) {
      console.warn('[CartApiService] fetchCart API failed, fallback to empty array:', error)
      return []
    }
  },

  /**
   * Add Product to Cart via WedgetStore API
   */
  async addToCart(product: Product, quantity: number = 1): Promise<{ success: boolean; message?: string }> {
    try {
      const guestId = getGuestId()
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/cart/add?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          id: product.id,
          quantity
        }
      })

      return {
        success: true,
        message: response?.message || 'Product added to cart successfully'
      }
    } catch (error: any) {
      console.warn('[CartApiService] addToCart API failed:', error)
      return {
        success: false,
        message: error?.data?.message || 'Failed to add product to cart'
      }
    }
  },

  /**
   * Update Cart Item Quantity
   */
  async updateQuantity(productId: string | number, quantity: number): Promise<{ success: boolean }> {
    try {
      const guestId = getGuestId()
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/cart/update?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      await $fetch<any>(endpoint, {
        method: 'PUT',
        headers: buildHeaders(),
        body: {
          id: productId,
          quantity
        }
      })

      return { success: true }
    } catch (error) {
      console.warn('[CartApiService] updateQuantity failed:', error)
      return { success: false }
    }
  },

  /**
   * Remove Item from Cart sending parameters in query string + body for server compatibility
   */
  async removeFromCart(productId: string | number): Promise<{ success: boolean }> {
    try {
      const guestId = getGuestId()
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const targetId = String(productId)
      
      const endpoint = `${API_BASE_URL}/cart/remove?guest_id=${encodeURIComponent(guestId)}&locale=${locale}&key=${encodeURIComponent(targetId)}&id=${encodeURIComponent(targetId)}&product_id=${encodeURIComponent(targetId)}`

      await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: buildHeaders(),
        body: {
          key: targetId,
          id: targetId,
          product_id: targetId
        }
      })

      return { success: true }
    } catch (error) {
      console.warn('[CartApiService] removeFromCart failed:', error)
      return { success: false }
    }
  },

  /**
   * Clear All Items from Cart
   */
  async clearAllCart(): Promise<{ success: boolean }> {
    try {
      const guestId = getGuestId()
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/cart/remove-all?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: buildHeaders()
      })

      return { success: true }
    } catch (error) {
      console.warn('[CartApiService] clearAllCart failed:', error)
      return { success: false }
    }
  }
}
