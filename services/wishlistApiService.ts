/**
 * Production-ready Wishlist API Service Layer with Query + Body Payload & Localization
 * Target Endpoints:
 * - GET    /api/v1/customer/wish-list?locale=en|sa
 * - POST   /api/v1/customer/wish-list/add
 * - DELETE /api/v1/customer/wish-list/remove
 * Header format: Authorization: Bearer <token>
 */
import type { Product } from '~/types/product'
import { mapApiProductToProduct } from '~/types/product'

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    const tokenFromStorage = localStorage.getItem('auth_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('user_token') ||
      localStorage.getItem('access_token')
    if (tokenFromStorage) return tokenFromStorage

    try {
      const match = document.cookie.match(new RegExp('(^| )' + 'auth_token' + '=([^;]+)'))
      if (match) return match[2]
    } catch { }
  }
  return null
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

export const wishlistApiService = {
  /**
   * Fetch customer wishlist items from WedgetStore API with locale parameter & language headers
   */
  async fetchWishlist(): Promise<{ products: Product[]; error?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()

    if (!token) {
      return { products: [], error: lang === 'en' ? 'Please log in to view your wishlist.' : 'يرجى تسجيل الدخول لعرض قائمة الرغبات.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/wish-list?locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(),
        timeout: 8000
      })

      // Flexible unwrapping for all possible backend JSON structures
      let rawList: any[] = []
      if (Array.isArray(response)) {
        rawList = response
      } else if (response && typeof response === 'object') {
        rawList = response.wishlist || response.wish_list || response.products || response.data || []
        if (!Array.isArray(rawList) && typeof rawList === 'object' && Array.isArray((rawList as any).data)) {
          rawList = (rawList as any).data
        }
      }

      const mapped = (Array.isArray(rawList) ? rawList : [])
        .map((item: any) => {
          if (!item) return null
          // Prioritize productFullInfo and product_full_info
          const rawProd = item.productFullInfo || item.product_full_info || item.product || item.product_details || item.product_all_status || item
          return mapApiProductToProduct(rawProd)
        })
        .filter(Boolean) as Product[]

      return { products: mapped }
    } catch (err: any) {
      console.warn('[Wishlist API] fetchWishlist Error:', err?.message || err)
      return { products: [], error: lang === 'en' ? 'Could not load wishlist from server.' : 'تعذر جلب قائمة المفضلة من السيرفر.' }
    }
  },

  /**
   * Add product to customer wishlist via API
   */
  async addToWishlist(productId: number | string): Promise<{ success: boolean; message?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()
    const targetId = Number(productId) || productId

    if (!token) {
      return { success: false, message: lang === 'en' ? 'Please log in to add item to wishlist.' : 'يرجى تسجيل الدخول لإضافة المنتج إلى المفضلة.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/wish-list/add?product_id=${targetId}&locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          product_id: targetId
        },
        timeout: 8000
      })

      return {
        success: true,
        message: response?.message || (lang === 'en' ? 'Product added to wishlist.' : 'تمت إضافة المنتج للمفضلة.')
      }
    } catch (err: any) {
      console.warn('[Wishlist API] addToWishlist Error:', err?.message || err)
      return {
        success: false,
        message: err?.data?.message || (lang === 'en' ? 'Failed to add item to wishlist.' : 'فشل إضافة المنتج للمفضلة.')
      }
    }
  },

  /**
   * Remove product from customer wishlist via API
   */
  async removeFromWishlist(productId: number | string): Promise<{ success: boolean; message?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()
    const targetId = Number(productId) || productId

    if (!token) {
      return { success: false, message: lang === 'en' ? 'Please log in to modify wishlist.' : 'يرجى تسجيل الدخول لتعديل المفضلة.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/wish-list/remove?product_id=${targetId}&locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: buildHeaders(),
        body: {
          product_id: targetId
        },
        timeout: 8000
      })

      return {
        success: true,
        message: response?.message || (lang === 'en' ? 'Product removed from wishlist.' : 'تمت إزالة المنتج من المفضلة.')
      }
    } catch (err: any) {
      console.warn('[Wishlist API] removeFromWishlist Error:', err?.message || err)
      return {
        success: false,
        message: err?.data?.message || (lang === 'en' ? 'Failed to remove item from wishlist.' : 'فشل إزالة المنتج من المفضلة.')
      }
    }
  }
}
