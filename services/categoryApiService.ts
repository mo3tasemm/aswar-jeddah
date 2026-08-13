/**
 * Category API Service Layer
 * Endpoint: GET https://wedgetstore.com/api/v1/categories?guest_id=1&locale=sa
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

const getLangCode = (): string => {
  if (process.client) {
    return localStorage.getItem('aswar_lang') || 'ar'
  }
  return 'ar'
}

const buildHeaders = (): Record<string, string> => {
  const lang = getLangCode()
  const isEn = lang === 'en'

  return {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': isEn ? 'en' : 'sa',
    'lang': isEn ? 'en' : 'sa',
    'X-Language': isEn ? 'en' : 'ar'
  }
}

export interface CategoryItem {
  id: number | string;
  name: string;
  slug: string;
  icon?: string;
  productCount?: number;
  subCategories?: CategoryItem[];
}

export const categoryApiService = {
  /**
   * Fetch categories from live WedgetStore API
   */
  async fetchCategories(guestId: string | number = '1', localeInput?: string): Promise<CategoryItem[]> {
    try {
      const lang = getLangCode()
      const locale = localeInput || (lang === 'en' ? 'en' : 'sa')
      const endpoint = `${API_BASE_URL}/categories?guest_id=${guestId}&locale=${locale}`

      const response = await $fetch<any[]>(endpoint, {
        method: 'GET',
        headers: buildHeaders(),
        retry: 1,
        timeout: 10000
      })

      if (!Array.isArray(response)) return []

      return response.map(cat => {
        const catName = lang === 'en' ? (cat.name_en || cat.title_en || cat.name) : (cat.name || cat.name_ar)
        return {
          id: cat.id,
          name: catName,
          slug: cat.slug || `cat-${cat.id}`,
          icon: cat.icon_full_url?.path || cat.icon || '',
          productCount: cat.product_count || 0,
          subCategories: (cat.childes || []).map((sub: any) => ({
            id: sub.id,
            name: lang === 'en' ? (sub.name_en || sub.name) : (sub.name || sub.name_ar),
            slug: sub.slug || `subcat-${sub.id}`,
            productCount: sub.product_count || sub.sub_category_product_count || 0
          }))
        }
      })
    } catch (err: any) {
      console.warn('Category API request failed:', err?.message || err)
      return []
    }
  }
}
