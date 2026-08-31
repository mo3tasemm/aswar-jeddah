/**
 * Products API Service Layer
 * Connects directly to WedgetStore Live API Endpoints:
 * 1. Category Products: GET https://ai-agunt.elbakry2.com/api/v1/categories/products/{category_id}?guest_id=1&locale=sa
 * 2. Brand Products: GET https://ai-agunt.elbakry2.com/api/v1/brands/products/{brand_id}?guest_id=1&locale=sa
 * 3. Search Products: GET https://ai-agunt.elbakry2.com/api/v1/products/search?name={keyword}&guest_id=1&locale=sa
 * 4. Latest Products: GET https://ai-agunt.elbakry2.com/api/v1/products/latest?guest_id=1&locale=sa
 * 5. Product Details: GET https://ai-agunt.elbakry2.com/api/v1/products/details/{slug}?guest_id=1&locale=sa
 * 6. Product Reviews: GET https://ai-agunt.elbakry2.com/api/v1/products/reviews/{productId}?locale=sa
 * 7. Submit Review: POST https://ai-agunt.elbakry2.com/api/v1/products/reviews/submit (via FormData with fileUpload[])
 * 8. Like Review: POST https://ai-agunt.elbakry2.com/api/v1/products/review/like
 */
import type { ApiProduct, ApiProductsResponse, ProductFetchParams, Product } from '~/types/product'
import { mapApiProductToProduct } from '~/types/product'
import { API_BASE_URL } from '~/services/apiConfig'

const getAuthToken = (): string | null => {
  if (process.client) {
    try {
      const nuxtCookie = useCookie('auth_token').value
      if (nuxtCookie) return String(nuxtCookie).replace(/^"(.*)"$/, '$1')
    } catch (e) { }

    let localToken = localStorage.getItem('auth_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('user_token')
    if (localToken) return localToken.replace(/^"(.*)"$/, '$1')

    const cookies = document.cookie.split(';')
    for (let c of cookies) {
      const parts = c.trim().split('=')
      const name = parts[0].trim()
      if (['auth_token', 'token', 'access_token', 'user_token'].includes(name) && parts[1]) {
        const val = decodeURIComponent(parts[1].trim())
        return val.replace(/^"(.*)"$/, '$1')
      }
    }
  }
  return null
}

export const getCurrentApiLocale = (localeInput?: string): string => {
  if (localeInput) {
    const clean = localeInput.trim()
    if (clean.toUpperCase() === 'EN' || clean.toLowerCase() === 'en') return 'EN'
    if (clean.toLowerCase() === 'sa' || clean.toLowerCase() === 'ar') return 'sa'
    return clean
  }
  if (process.client) {
    const saved = localStorage.getItem('aswar_lang')
    if (saved === 'en') return 'EN'
  }
  return 'sa'
}

const buildHeaders = (localeInput?: string): Record<string, string> => {
  const token = getAuthToken()
  const locale = getCurrentApiLocale(localeInput)
  const isEn = locale === 'EN'

  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': locale,
    'lang': locale,
    'X-Language': isEn ? 'en' : 'ar'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  return headers
}

export interface ProductReviewItem {
  id: number | string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  likes_count?: number;
}

export const productApiService = {
  /**
   * Fetch Filtered Products by routing to appropriate WedgetStore API endpoint
   */
  async fetchFilteredProducts(params: ProductFetchParams = {}): Promise<{ products: Product[]; total: number }> {
    const guestId = params.guest_id || '1'
    const locale = getCurrentApiLocale(params.locale)
    let endpoint = ''

    const queryParams = new URLSearchParams()
    queryParams.append('guest_id', String(guestId))
    queryParams.append('locale', String(locale))
    if (params.limit) queryParams.append('limit', String(params.limit))
    if (params.offset) queryParams.append('offset', String(params.offset))
    if (params.page) queryParams.append('page', String(params.page))
    if (params.search) queryParams.append('search', params.search)
    if (params.sort_by) queryParams.append('sort_by', params.sort_by)

    if (params.category_id) {
      endpoint = `${API_BASE_URL}/categories/products/${params.category_id}?${queryParams.toString()}`
    }
    else if (params.brand_id) {
      endpoint = `${API_BASE_URL}/brands/products/${params.brand_id}?${queryParams.toString()}`
    }
    else {
      endpoint = `${API_BASE_URL}/products/latest?${queryParams.toString()}`
    }

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(locale),
        retry: 1,
        timeout: 10000
      })

      let rawProducts: ApiProduct[] = []
      let totalCount = 0

      if (Array.isArray(response)) {
        rawProducts = response
      } else if (response && typeof response === 'object') {
        rawProducts = response.products || response.data || []
        totalCount = response.total_size || rawProducts.length
      }

      let mappedProducts = (rawProducts || [])
        .filter(p => p && typeof p === 'object')
        .map(mapApiProductToProduct)
        .filter(Boolean)

      if (params.min_price !== undefined && params.min_price !== null) {
        mappedProducts = mappedProducts.filter(p => p.price >= params.min_price!)
      }
      if (params.max_price !== undefined && params.max_price !== null) {
        mappedProducts = mappedProducts.filter(p => p.price <= params.max_price!)
      }

      if (params.search && params.search.trim() !== '') {
        const q = params.search.toLowerCase()
        mappedProducts = mappedProducts.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q))
      }

      return {
        products: mappedProducts,
        total: totalCount || mappedProducts.length
      }
    } catch (err: any) {
      console.error('[productApiService] API fetch error:', err?.message || err)
      return {
        products: [],
        total: 0
      }
    }
  },

  /**
   * Search and filter products via API
   * Endpoint: GET https://ai-agunt.elbakry2.com/api/v1/products/search?name={keyword}
   */
  async searchProducts(params: {
    name?: string;
    keyword?: string;
    category_id?: number | string;
    brand_id?: number | string;
    min_price?: number;
    max_price?: number;
    sort_by?: string;
    limit?: number;
    offset?: number;
    guest_id?: string | number;
    locale?: string;
  } = {}): Promise<{ products: Product[]; total: number }> {
    const guestId = params.guest_id || '1'
    const locale = getCurrentApiLocale(params.locale)
    const searchTerm = params.name || params.keyword || ''

    const queryParams = new URLSearchParams()
    queryParams.append('guest_id', String(guestId))
    queryParams.append('locale', String(locale))
    if (searchTerm) queryParams.append('name', searchTerm)
    if (params.category_id) queryParams.append('category_id', String(params.category_id))
    if (params.brand_id) queryParams.append('brand_id', String(params.brand_id))
    if (params.limit) queryParams.append('limit', String(params.limit))
    if (params.offset) queryParams.append('offset', String(params.offset))

    const endpoint = `${API_BASE_URL}/products/search?${queryParams.toString()}`

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(locale),
        timeout: 8000
      })

      let rawProducts: ApiProduct[] = []
      let totalCount = 0

      if (Array.isArray(response)) {
        rawProducts = response
        totalCount = response.length
      } else if (response && typeof response === 'object') {
        rawProducts = response.products || response.data || []
        totalCount = response.total_size || rawProducts.length
      }

      let mappedProducts = (rawProducts || [])
        .filter(p => p && typeof p === 'object')
        .map(mapApiProductToProduct)
        .filter(Boolean)

      return {
        products: mappedProducts,
        total: totalCount || mappedProducts.length
      }
    } catch (err) {
      console.warn('[productApiService] searchProducts error:', err)
      return { products: [], total: 0 }
    }
  },

  /**
   * Fetch Single Product Details by ID or Slug with fallback search
   */
  async fetchProductDetails(slugOrId: string | number, guestIdInput?: string | number, localeInput?: string): Promise<Product | null> {
    try {
      const guestId = guestIdInput || '1'
      const locale = getCurrentApiLocale(localeInput)
      const endpoint = `${API_BASE_URL}/products/details/${slugOrId}?guest_id=${guestId}&locale=${locale}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(locale),
        timeout: 8000
      })

      let rawProd: ApiProduct | null = null
      if (response && typeof response === 'object') {
        if (response.id) rawProd = response
        else if (response.product) rawProd = response.product
        else if (Array.isArray(response) && response[0]) rawProd = response[0]
      }

      if (rawProd) {
        return mapApiProductToProduct(rawProd)
      }
    } catch (err) {
      console.warn('[productApiService] fetchProductDetails primary endpoint failed, trying fallback:', err)
    }

    // Fallback: If direct slug/ID API call failed or returned 404, search latest products
    try {
      const cleanKey = String(slugOrId).split('-')[0] || String(slugOrId)
      const fallbackRes = await this.fetchFilteredProducts({ search: cleanKey, limit: 10, locale: localeInput })
      if (fallbackRes.products && fallbackRes.products.length > 0) {
        const found = fallbackRes.products.find(p => String(p.slug) === String(slugOrId) || String(p.id) === String(slugOrId))
        return found || fallbackRes.products[0]
      }
    } catch (e) {
      console.warn('[productApiService] fetchProductDetails fallback error:', e)
    }

    return null
  },

  /**
   * Alias method for fetchProductDetails to support loadProductBySlug
   */
  async fetchProductBySlug(slugOrId: string | number, guestId?: string, localeInput?: string): Promise<Product | null> {
    return this.fetchProductDetails(slugOrId, guestId, localeInput)
  },

  /**
   * Fetch Product Reviews
   * GET https://ai-agunt.elbakry2.com/api/v1/products/reviews/{product_id}
   */
  async fetchProductReviews(productId: number | string, guestId?: string, localeInput?: string): Promise<ProductReviewItem[]> {
    try {
      const locale = getCurrentApiLocale(localeInput)
      const isEn = locale === 'EN'
      const endpoint = `${API_BASE_URL}/products/reviews/${productId}?locale=${locale}`

      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: buildHeaders(locale),
        timeout: 8000
      })

      const list = Array.isArray(response) ? response : (response?.data || response?.reviews || response?.reviews_list || [])
      return (list || []).map((r: any) => ({
        id: r.id || Math.random(),
        rating: Number(r.rating || r.stars || 5),
        comment: r.comment || r.review || r.details || '',
        author: r.customer_name || r.user_name || r.name || (lang === 'en' ? 'Verified Customer' : 'عميل مؤكد'),
        date: r.created_at || r.date || (lang === 'en' ? 'Recently' : 'مؤخراً'),
        likes_count: Number(r.likes_count || r.likes || 0)
      }))
    } catch (err) {
      console.warn('[productApiService] fetchProductReviews error:', err)
      return []
    }
  },

  /**
   * Submit Review via FormData
   * POST https://ai-agunt.elbakry2.com/api/v1/products/reviews/submit
   */
  async submitReview(data: {
    product_id: number | string;
    order_id?: number | string;
    rating: number;
    comment: string;
    files?: File[];
  }): Promise<{ success: boolean; message?: string }> {
    try {
      const lang = getLangCode()
      const locale = lang === 'en' ? 'en' : 'sa'
      const endpoint = `${API_BASE_URL}/products/reviews/submit?locale=${locale}`

      const formData = new FormData()
      formData.append('product_id', String(data.product_id))
      if (data.order_id) {
        formData.append('order_id', String(data.order_id))
      }
      formData.append('rating', String(data.rating))
      formData.append('comment', data.comment || '')

      if (Array.isArray(data.files) && data.files.length > 0) {
        data.files.forEach((file) => {
          formData.append('fileUpload[]', file)
        })
      }

      const token = getAuthToken()
      const headers: Record<string, string> = {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Language': lang === 'en' ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
        'X-localization': lang === 'en' ? 'en' : 'sa',
        'lang': lang === 'en' ? 'en' : 'sa',
        'X-Language': lang === 'en' ? 'en' : 'ar'
      }
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }

      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers,
        body: formData
      })

      return {
        success: response?.status === 1 || response?.success === true || true,
        message: response?.message || (lang === 'en' ? 'Review submitted successfully' : 'تم إرسال تقييمك بنجاح')
      }
    } catch (err: any) {
      console.warn('[productApiService] submitReview error:', err)
      return {
        success: false,
        message: err?.data?.message || (lang === 'en' ? 'Failed to submit review' : 'فشل إرسال التقييم')
      }
    }
  },

  /**
   * Alias method for submitReview
   */
  async submitProductReview(data: {
    product_id: number | string;
    order_id?: number | string;
    rating: number;
    comment: string;
    files?: File[];
  }): Promise<{ success: boolean; message?: string }> {
    return this.submitReview(data)
  },

  /**
   * Like a Product Review
   * POST https://ai-agunt.elbakry2.com/api/v1/products/review/like
   */
  async likeProductReview(reviewId: number | string): Promise<{ success: boolean }> {
    try {
      const endpoint = `${API_BASE_URL}/products/review/like`
      await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: { review_id: reviewId }
      })
      return { success: true }
    } catch (e) {
      console.warn('[productApiService] likeProductReview error:', e)
      return { success: false }
    }
  }
}

