/**
 * Brand API Service Layer
 * Endpoint: GET https://wedgetstore.com/api/v1/brands?guest_id=1&locale=sa
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

export interface BrandItem {
  id: number | string;
  name: string;
  image?: string;
  productCount?: number;
}

export const brandApiService = {
  /**
   * Fetch brands from live WedgetStore API
   */
  async fetchBrands(guestId: string | number = '1', locale: string = 'sa'): Promise<BrandItem[]> {
    try {
      const endpoint = `${API_BASE_URL}/brands?guest_id=${guestId}&locale=${locale}`

      // HTTP GET request with mandatory anti-302 JSON headers
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        retry: 1,
        timeout: 10000
      })

      let rawBrands: any[] = []
      if (Array.isArray(response)) {
        rawBrands = response
      } else if (response && typeof response === 'object') {
        rawBrands = response.brands || response.data || []
      }

      return rawBrands.map(b => ({
        id: b.id,
        name: b.name,
        image: b.image_full_url?.path || b.image || '',
        productCount: b.brand_products_count || 0
      }))
    } catch (err: any) {
      console.warn('Brand API request failed:', err?.message || err)
      return []
    }
  }
}
