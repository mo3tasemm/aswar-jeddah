/**
 * Category API Service Layer
 * Endpoint: GET https:/ai-agunt.elbakry2.com/api/v1/categories?guest_id=1&locale=sa
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

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
  const locale = getCurrentApiLocale(localeInput)
  const isEn = locale === 'EN'

  return {
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': locale,
    'lang': locale,
    'X-Language': isEn ? 'en' : 'ar'
  }
}

export function extractCategoryName(c: any, lang: string = 'ar'): string {
  if (!c) return ''
  const isEn = lang === 'en'

  let nameAr = ''
  let nameEn = ''

  if (c.name_ar) nameAr = String(c.name_ar).trim()
  if (c.name_en) nameEn = String(c.name_en).trim()
  if (c.title_ar) nameAr = nameAr || String(c.title_ar).trim()
  if (c.title_en) nameEn = nameEn || String(c.title_en).trim()

  if (Array.isArray(c.translations)) {
    for (const t of c.translations) {
      const loc = String(t.locale || t.lang || t.language || '').toLowerCase()
      const key = String(t.key || '').toLowerCase()
      if (!key || key === 'name' || key === 'title') {
        if ((loc === 'sa' || loc === 'ar') && t.value && !nameAr) {
          nameAr = String(t.value).trim()
        }
        if (loc === 'en' && t.value && !nameEn) {
          nameEn = String(t.value).trim()
        }
      }
    }
  }

  if (typeof c.name === 'object' && c.name !== null && !Array.isArray(c.name)) {
    if (c.name.ar && !nameAr) nameAr = String(c.name.ar).trim()
    if (c.name.en && !nameEn) nameEn = String(c.name.en).trim()
  }

  if (typeof c.name === 'string' && c.name) {
    const raw = c.name.trim()
    if (!nameAr) nameAr = raw
    if (!nameEn && /^[A-Za-z0-9\s&/.,'()_-]+$/.test(raw)) {
      nameEn = raw
    }
  }

  if (isEn) {
    return nameEn || nameAr || (typeof c.name === 'string' ? c.name : '')
  }
  return nameAr || (typeof c.name === 'string' ? c.name : '') || nameEn
}

export interface CategoryItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
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
      const locale = getCurrentApiLocale(localeInput)
      const isEn = locale === 'EN'
      const endpoint = `${API_BASE_URL}/categories?guest_id=${guestId}&locale=${locale}`

      const response = await $fetch<any[]>(endpoint, {
        method: 'GET',
        headers: buildHeaders(locale),
        retry: 1,
        timeout: 10000
      })

      if (!Array.isArray(response)) return []

      return response.map(cat => {
        const catName = extractCategoryName(cat, isEn ? 'en' : 'ar')
        const catNameAr = extractCategoryName(cat, 'ar')
        const catNameEn = extractCategoryName(cat, 'en')

        return {
          id: cat.id,
          name: catName,
          name_ar: catNameAr,
          name_en: catNameEn,
          slug: cat.slug || `cat-${cat.id}`,
          icon: cat.icon_full_url?.path || cat.icon || '',
          productCount: cat.product_count || 0,
          subCategories: (cat.childes || []).map((sub: any) => {
            const subName = extractCategoryName(sub, isEn ? 'en' : 'ar')
            const subNameAr = extractCategoryName(sub, 'ar')
            const subNameEn = extractCategoryName(sub, 'en')
            return {
              id: sub.id,
              name: subName,
              name_ar: subNameAr,
              name_en: subNameEn,
              slug: sub.slug || `subcat-${sub.id}`,
              productCount: sub.product_count || sub.sub_category_product_count || 0
            }
          })
        }
      })
    } catch (err: any) {
      console.warn('Category API request failed:', err?.message || err)
      return []
    }
  }
}
