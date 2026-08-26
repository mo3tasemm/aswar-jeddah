/**
 * Admin Color API Service
 * Endpoint: GET https:/ai-agunt.elbakry2.com/api/v1/admin/colors/list
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

export interface ColorItem {
  id: number | string;
  name: string;
  code: string; // Hex code without '#' e.g. 'FF0000' or '000000'
}

export const colorApiService = {
  /**
   * GET Admin Colors List
   */
  async fetchColors(token: string): Promise<ColorItem[]> {
    try {
      const endpoint = `${API_BASE_URL}/admin/colors/list`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        retry: 1,
        timeout: 10000
      })

      let rawColors: any[] = []
      if (Array.isArray(response)) {
        rawColors = response
      } else if (response && typeof response === 'object') {
        rawColors = response.colors || response.data || response.list || []
      }

      return rawColors.map((c: any) => ({
        id: c.id || c.code || Math.random(),
        name: c.name || c.name_ar || c.code || 'لون',
        code: String(c.code || c.hex || c.color_code || '').replace(/^#/, '')
      }))
    } catch (err) {
      console.warn('fetchColors Error:', err)
      // Fallback preset colors if endpoint unavailable
      return [
        { id: 1, name: 'أحمر', code: 'FF0000' },
        { id: 2, name: 'أسود', code: '000000' },
        { id: 3, name: 'أبيض', code: 'FFFFFF' },
        { id: 4, name: 'أزرق', code: '0000FF' },
        { id: 5, name: 'رمادي', code: '808080' },
        { id: 6, name: 'فضي', code: 'C0C0C0' },
        { id: 7, name: 'ذهبي', code: 'FFD700' },
        { id: 8, name: 'بني', code: 'A52A2A' }
      ]
    }
  }
}
