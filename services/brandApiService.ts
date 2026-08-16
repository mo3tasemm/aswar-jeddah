/**
 * Brand API Service Layer
 * Endpoint: GET https://wedgetstore.com/api/v1/brands?guest_id=1&locale=sa
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://wedgetstore.com/api/v1'

export interface BrandItem {
  id: number | string;
  name: string;
  name_ar?: string;
  name_en?: string;
  image?: string;
  alt_text?: string;
  productCount?: number;
}

// Brand dictionary for Arabic-to-English brand transliteration fallbacks
const BRAND_AR_TO_EN_MAP: Record<string, string> = {
  'ويسلامك': 'weslamic',
  'اشهار التسويقية': 'ESHHAR',
  'ايفون هاي كوبي': 'IPhone High copy',
  'ناتشر ريبورت': 'NATURE REPORT',
  'ارجان': 'Argan',
  'أنكر ساوندكور': 'Anker Soundcore',
  'توسما': 'TOSMA',
  'ديورا بوكس': 'DURA BOX',
  'سوني': 'SONY',
  'بايسِل': 'Piecell',
  'بيلديند': 'Beldend',
  'ريجرسي': 'REGRSI',
  'جو ديس': 'Go-Des',
  'أسوار جدة': 'Aswar Jeddah',
  'فيليبس': 'PHILIPS',
  'سامسونج': 'SAMSUNG',
  'كينوود': 'KENWOOD',
  'ديجيتال كريست': 'Digital Crest',
  'ايربلو': 'Airblu'
}

export function extractBrandName(b: any, lang: string = 'ar'): string {
  if (!b) return ''
  const isEn = lang === 'en'

  let nameAr = ''
  let nameEn = ''

  if (b.name_ar) nameAr = String(b.name_ar).trim()
  if (b.name_en) nameEn = String(b.name_en).trim()
  if (b.title_ar) nameAr = nameAr || String(b.title_ar).trim()
  if (b.title_en) nameEn = nameEn || String(b.title_en).trim()

  // 1. Inspect image_alt_text & alt_text (Wedgetstore live API stores the English brand name here)
  const alt = b.image_alt_text || b.alt_text || b.image_alt
  if (typeof alt === 'string' && alt.trim()) {
    const cleanAlt = alt.trim()
    if (!/[\u0600-\u06FF]/.test(cleanAlt)) {
      if (!nameEn) nameEn = cleanAlt
    } else {
      if (!nameAr) nameAr = cleanAlt
    }
  }

  // 2. Inspect translations array
  if (Array.isArray(b.translations)) {
    for (const t of b.translations) {
      const loc = String(t.locale || t.lang || t.language || '').toLowerCase()
      const key = String(t.key || '').toLowerCase()
      if (!key || key === 'name' || key === 'title') {
        const val = String(t.value || '').trim()
        if ((loc === 'sa' || loc === 'ar') && val && !nameAr) {
          nameAr = val
        }
        if ((loc === 'en' || loc === 'en-us' || loc === 'en_us') && val && !nameEn) {
          nameEn = val
        }
      }
    }
  }

  // 3. Inspect main name attribute
  if (typeof b.name === 'string' && b.name.trim()) {
    const raw = b.name.trim()
    if (/[\u0600-\u06FF]/.test(raw)) {
      if (!nameAr) nameAr = raw
      if (!nameEn && BRAND_AR_TO_EN_MAP[raw]) {
        nameEn = BRAND_AR_TO_EN_MAP[raw]
      }
    } else {
      if (!nameEn) nameEn = raw
    }
  }

  // 4. Check dictionary mapping if nameAr is known
  if (nameAr && !nameEn && BRAND_AR_TO_EN_MAP[nameAr]) {
    nameEn = BRAND_AR_TO_EN_MAP[nameAr]
  }

  if (isEn) {
    return nameEn || (nameAr ? (BRAND_AR_TO_EN_MAP[nameAr] || nameAr) : (typeof b.name === 'string' ? b.name : ''))
  }
  return nameAr || (typeof b.name === 'string' ? b.name : '') || nameEn
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

export const brandApiService = {
  /**
   * Fetch brands from live WedgetStore API
   */
  async fetchBrands(guestId: string | number = '1', localeInput?: string): Promise<BrandItem[]> {
    try {
      const locale = getCurrentApiLocale(localeInput)
      const isEn = locale === 'EN'
      const endpoint = `${API_BASE_URL}/brands?guest_id=${guestId}&locale=${locale}`

      // HTTP GET request with mandatory anti-302 JSON headers and localization
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
          'X-localization': locale,
          'lang': locale,
          'X-Language': isEn ? 'en' : 'ar'
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

      return rawBrands.map(b => {
        const brandName = extractBrandName(b, isEn ? 'en' : 'ar')
        const brandNameAr = extractBrandName(b, 'ar')
        const brandNameEn = extractBrandName(b, 'en')
        const altText = b.image_alt_text || b.alt_text || ''

        return {
          id: b.id,
          name: brandName,
          name_ar: brandNameAr,
          name_en: brandNameEn,
          alt_text: altText,
          image: b.image_full_url?.path || b.image || '',
          productCount: b.brand_products_count || 0
        }
      })
    } catch (err: any) {
      console.warn('Brand API request failed:', err?.message || err)
      return []
    }
  }
}
