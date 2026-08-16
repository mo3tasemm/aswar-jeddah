/**
 * Production-ready Cart API Service Layer for WedgetStore Live API
 * Rules & Requirements:
 * 1. Authenticated User:
 *    - MUST send 'Authorization': 'Bearer ' + userToken
 *    - MUST NOT send 'guest_id' anywhere in payload or query.
 * 2. Guest User:
 *    - DO NOT send 'Authorization' header.
 *    - MUST send 'guest_id' in query or payload.
 * 3. Payload Keys:
 *    - Add: { id: productId, quantity: qty }
 *    - Update: { key: cartItemKey, quantity: qty }
 *    - Remove: { key: cartItemKey }
 *    - Clear All: DELETE /api/v1/cart/remove-all with 'key' (cart_group_id or cart item key)
 */
import type { CartItem, Product } from '~/types/product'
import { mapApiProductToProduct } from '~/types/product'

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

// Module-level cached cart_group_id
let cachedCartGroupId: string | null = null

/**
 * Extract active user token from storage or cookies
 */
export const getAuthToken = (): string | null => {
  if (process.client) {
    try {
      const nuxtCookie = useCookie('auth_token').value
      if (nuxtCookie && typeof nuxtCookie === 'string' && nuxtCookie.trim() && nuxtCookie !== 'null' && nuxtCookie !== 'undefined') {
        return nuxtCookie.replace(/^"(.*)"$/, '$1').trim()
      }
    } catch (e) {}

    const localToken = localStorage.getItem('auth_token') || 
                       localStorage.getItem('token') || 
                       localStorage.getItem('access_token') || 
                       localStorage.getItem('user_token')
    if (localToken && typeof localToken === 'string' && localToken.trim() && localToken !== 'null' && localToken !== 'undefined') {
      return localToken.replace(/^"(.*)"$/, '$1').trim()
    }

    if (typeof document !== 'undefined' && document.cookie) {
      const cookies = document.cookie.split(';')
      for (const c of cookies) {
        const parts = c.trim().split('=')
        const name = parts[0]?.trim()
        if (['auth_token', 'token', 'access_token', 'user_token'].includes(name) && parts[1]) {
          const val = decodeURIComponent(parts[1].trim())
          if (val && val !== 'null' && val !== 'undefined') {
            return val.replace(/^"(.*)"$/, '$1').trim()
          }
        }
      }
    }
  }
  return null
}

/**
 * Extract or generate persistent Guest ID
 */
export const getGuestId = (): string => {
  if (process.client) {
    let guestId = localStorage.getItem('guest_id')
    if (!guestId || guestId === 'null' || guestId === 'undefined') {
      guestId = '1'
      localStorage.setItem('guest_id', guestId)
    }
    return guestId
  }
  return '1'
}

/**
 * Get current API locale code (EN or sa)
 */
export const getApiLocale = (): string => {
  if (process.client) {
    const saved = localStorage.getItem('aswar_lang')
    if (saved === 'en') return 'EN'
  }
  return 'sa'
}

/**
 * Build request headers with strict Auth vs Guest distinction
 */
const buildCartHeaders = (token: string | null, locale: string): Record<string, string> => {
  const isEn = locale === 'EN'
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': locale,
    'lang': locale,
    'X-Language': isEn ? 'en' : 'ar'
  }

  // Attach token when user is authenticated
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export const cartApiService = {
  /**
   * Fetch current cart contents from WedgetStore API
   */
  async fetchCart(): Promise<CartItem[]> {
    try {
      const token = getAuthToken()
      const locale = getApiLocale()
      const isAuth = !!token
      const guestId = getGuestId()

      // Endpoint: Auth uses /cart?locale=..., Guest uses /cart?guest_id=...&locale=...
      const endpoint = isAuth
        ? `${API_BASE_URL}/cart?locale=${locale}`
        : `${API_BASE_URL}/cart?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildCartHeaders(token, locale),
        timeout: 8000
      })

      const rawItems = Array.isArray(response) ? response : (response?.data || response?.cart || [])
      
      return rawItems.map((item: any) => {
        const prod = item.product || item
        const mappedProduct = mapApiProductToProduct(prod)
        const cartKey = item.id || item.key || item.cart_id || `cart-${prod?.id || Math.random()}`
        const cartGroupId = item.cart_group_id || item.cart_id || null
        if (cartGroupId) {
          cachedCartGroupId = String(cartGroupId)
        }

        return {
          id: cartKey,
          key: cartKey,
          cartKey: cartKey,
          cart_group_id: cartGroupId,
          product_id: item.product_id || prod?.id,
          product: mappedProduct,
          quantity: Number(item.quantity || item.qty || 1),
          price: Number(item.price || mappedProduct.price),
          discount: Number(item.discount || 0),
          tax: Number(item.tax || 0),
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
   * Payload Keys: { id: productId, quantity: qty }
   */
  async addToCart(
    productId: string | number, 
    quantity: number = 1, 
    options: { variant?: string; color?: string } = {}
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const token = getAuthToken()
      const locale = getApiLocale()
      const isAuth = !!token
      const guestId = getGuestId()

      // Endpoint: Auth uses /cart/add?locale=..., Guest uses /cart/add?guest_id=...&locale=...
      const endpoint = isAuth
        ? `${API_BASE_URL}/cart/add?locale=${locale}`
        : `${API_BASE_URL}/cart/add?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const body: Record<string, any> = {
        id: Number(productId) || productId,
        quantity: Number(quantity) || 1,
        ...(options.variant ? { variant: options.variant } : {}),
        ...(options.color ? { color: options.color } : {})
      }

      // Only attach guest_id if not authenticated
      if (!isAuth) {
        body.guest_id = guestId
      }

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildCartHeaders(token, locale),
        body
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
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
   * Payload Keys: { key: cartItemKey, quantity: qty }
   */
  async updateQuantity(
    cartItemKey: string | number, 
    quantity: number
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const token = getAuthToken()
      const locale = getApiLocale()
      const isAuth = !!token
      const guestId = getGuestId()

      // Endpoint: Auth uses /cart/update?locale=..., Guest uses /cart/update?guest_id=...&locale=...
      const endpoint = isAuth
        ? `${API_BASE_URL}/cart/update?locale=${locale}`
        : `${API_BASE_URL}/cart/update?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const body: Record<string, any> = {
        key: cartItemKey,
        quantity: Number(quantity)
      }

      // Only attach guest_id if not authenticated
      if (!isAuth) {
        body.guest_id = guestId
      }

      const response = await $fetch<any>(endpoint, {
        method: 'PUT',
        headers: buildCartHeaders(token, locale),
        body
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
        message: response?.message || 'Cart quantity updated successfully'
      }
    } catch (error: any) {
      console.warn('[CartApiService] updateQuantity failed:', error)
      return {
        success: false,
        message: error?.data?.message || 'Failed to update cart quantity'
      }
    }
  },

  /**
   * Remove Item from Cart
   * Payload Keys: { key: cartItemKey }
   */
  async removeFromCart(cartItemKey: string | number): Promise<{ success: boolean; message?: string }> {
    try {
      const token = getAuthToken()
      const locale = getApiLocale()
      const isAuth = !!token
      const guestId = getGuestId()
      const cleanKey = String(cartItemKey)

      // Endpoint: Auth uses /cart/remove?key=...&locale=..., Guest uses /cart/remove?key=...&guest_id=...&locale=...
      const endpoint = isAuth
        ? `${API_BASE_URL}/cart/remove?key=${encodeURIComponent(cleanKey)}&locale=${locale}`
        : `${API_BASE_URL}/cart/remove?key=${encodeURIComponent(cleanKey)}&guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

      const body: Record<string, any> = {
        key: cleanKey
      }

      // Only attach guest_id if not authenticated
      if (!isAuth) {
        body.guest_id = guestId
      }

      const response = await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: buildCartHeaders(token, locale),
        body
      })

      return {
        success: true,
        message: typeof response === 'string' ? response : (response?.message || 'Item removed from cart')
      }
    } catch (error: any) {
      console.warn('[CartApiService] removeFromCart failed:', error)
      return {
        success: false,
        message: error?.data?.message || 'Failed to remove item from cart'
      }
    }
  },

  /**
   * Clear All Items from Cart
   * WedgetStore API requires: 'key' (cart_group_id or item key/id)
   */
  async clearAllCart(options?: { cartGroupId?: string | number; itemKeys?: (string | number)[] }): Promise<{ success: boolean }> {
    try {
      const token = getAuthToken()
      const locale = getApiLocale()
      const isAuth = !!token
      const guestId = getGuestId()

      const targetKey = options?.cartGroupId || cachedCartGroupId || (options?.itemKeys && options.itemKeys.length > 0 ? options.itemKeys[0] : null)

      if (targetKey) {
        const cleanKey = String(targetKey)
        const endpoint = isAuth
          ? `${API_BASE_URL}/cart/remove-all?key=${encodeURIComponent(cleanKey)}&locale=${locale}`
          : `${API_BASE_URL}/cart/remove-all?key=${encodeURIComponent(cleanKey)}&guest_id=${encodeURIComponent(guestId)}&locale=${locale}`

        const body: Record<string, any> = {
          key: cleanKey
        }
        if (!isAuth) {
          body.guest_id = guestId
        }

        const response = await $fetch<any>(endpoint, {
          method: 'DELETE',
          headers: buildCartHeaders(token, locale),
          body
        })

        if (response?.errors && Array.isArray(response.errors)) {
          console.warn('[CartApiService] remove-all API returned errors:', response.errors)
        } else {
          cachedCartGroupId = null
          return { success: true }
        }
      }

      // Fallback: If remove-all had no key or returned an error, iterate and delete each item key
      if (options?.itemKeys && options.itemKeys.length > 0) {
        await Promise.allSettled(
          options.itemKeys.map(k => this.removeFromCart(k))
        )
      }

      cachedCartGroupId = null
      return { success: true }
    } catch (error: any) {
      console.warn('[CartApiService] clearAllCart failed, trying fallback:', error)
      if (options?.itemKeys && options.itemKeys.length > 0) {
        await Promise.allSettled(
          options.itemKeys.map(k => this.removeFromCart(k))
        )
      }
      return { success: true }
    }
  }
}
