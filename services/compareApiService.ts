/**
 * Production-ready Compare API Service Layer
 * Target Endpoints:
 * - GET    /api/v1/customer/compare/list
 * - POST   /api/v1/customer/compare/product-store
 * - DELETE /api/v1/customer/compare/clear-all
 * Mandatory Header: Authorization: Bearer <token>
 */
import type { Product } from '~/types/product'
import { mapApiProductToProduct } from '~/types/product'

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    return localStorage.getItem('auth_token') || localStorage.getItem('token') || null
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

export const compareApiService = {
  /**
   * Fetch customer compare items list directly from WedgetStore API with locale parameter & unwrapping
   */
  async fetchCompareList(): Promise<{ products: Product[]; error?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()

    if (!token) {
      return { products: [], error: lang === 'en' ? 'Please log in to view compare list.' : 'يرجى تسجيل الدخول لعرض قائمة المقارنة.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/compare/list?locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(),
        timeout: 8000
      })

      let rawProducts: any[] = []
      if (Array.isArray(response)) {
        rawProducts = response
      } else if (response && typeof response === 'object') {
        rawProducts = response.compare || response.compare_list || response.products || response.data || []
        if (!Array.isArray(rawProducts) && typeof rawProducts === 'object' && Array.isArray((rawProducts as any).data)) {
          rawProducts = (rawProducts as any).data
        }
      }

      const mapped = (Array.isArray(rawProducts) ? rawProducts : [])
        .map((item: any) => {
          if (!item) return null
          const rawProd = item.productFullInfo || item.product_full_info || item.product || item.product_details || item.product_all_status || item
          return mapApiProductToProduct(rawProd)
        })
        .filter(Boolean) as Product[]

      return { products: mapped }
    } catch (err: any) {
      console.warn('[compareApiService] Fetch compare list error:', err?.message || err)
      return { products: [], error: lang === 'en' ? 'Could not load compare list from server.' : 'تعذر جلب قائمة المقارنة من السيرفر.' }
    }
  },

  /**
   * Add product to compare list via API
   */
  async addToCompare(productId: number | string): Promise<{ success: boolean; message?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()

    if (!token) {
      return { success: false, message: lang === 'en' ? 'Please log in to compare products.' : 'يرجى تسجيل الدخول لإضافة المنتج لقائمة المقارنة.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/compare/product-store?locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          product_id: productId
        },
        timeout: 8000
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
        message: response?.message || (lang === 'en' ? 'Product added to comparison.' : 'تمت إضافة المنتج لقائمة المقارنة.')
      }
    } catch (err: any) {
      console.warn('[compareApiService] Add compare error:', err?.message || err)
      return { success: false, message: lang === 'en' ? 'Failed to add product to comparison.' : 'فشل إضافة المنتج للمقارنة.' }
    }
  },

  /**
   * Clear all items from compare list via API
   */
  async clearAllCompare(): Promise<{ success: boolean; message?: string }> {
    const token = getAuthToken()
    const lang = getLangCode()

    if (!token) {
      return { success: false, message: lang === 'en' ? 'Please log in to clear compare list.' : 'يرجى تسجيل الدخول لتفريغ قائمة المقارنة.' }
    }

    try {
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/customer/compare/clear-all?locale=${locale}`
      const response = await $fetch<any>(endpoint, {
        method: 'DELETE',
        headers: buildHeaders(),
        timeout: 8000
      })

      return {
        success: true,
        message: response?.message || (lang === 'en' ? 'Compare list cleared.' : 'تم تفريغ قائمة المقارنة.')
      }
    } catch (err: any) {
      console.warn('[compareApiService] Clear compare error:', err?.message || err)
      return { success: false, message: lang === 'en' ? 'Failed to clear compare list.' : 'فشل تفريغ قائمة المقارنة.' }
    }
  }
}
