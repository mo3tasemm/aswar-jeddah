/**
 * Global Locale Routing Middleware for Nuxt 3
 *
 * Responsibilities:
 * 1. Detect locale from URL prefix (/en/...) and sync with global state.
 * 2. On language switch (via toggleLanguage/setLanguage), navigate to the correct prefixed URL.
 * 3. Arabic (default) has no prefix → /shop, /cart, /admin/products, etc.
 * 4. English has /en prefix    → /en/shop, /en/cart, /en/admin/products, etc.
 */

import type { LanguageCode } from '~/composables/useLanguage'

export const SUPPORTED_LOCALES: LanguageCode[] = ['ar', 'en']
export const DEFAULT_LOCALE: LanguageCode = 'ar'
export const PREFIXED_LOCALES: LanguageCode[] = ['en'] // Only 'en' gets a URL prefix

/**
 * Extracts locale and the "clean" path (without locale prefix) from a given pathname.
 * Examples:
 *   /en/admin/products → { locale: 'en', cleanPath: '/admin/products' }
 *   /en/shop           → { locale: 'en', cleanPath: '/shop' }
 *   /shop              → { locale: 'ar', cleanPath: '/shop' }
 *   /en                → { locale: 'en', cleanPath: '/' }
 *   /                  → { locale: 'ar', cleanPath: '/' }
 */
export const parseLocalePath = (path: string): { locale: LanguageCode; cleanPath: string } => {
  if (!path) return { locale: DEFAULT_LOCALE, cleanPath: '/' }

  for (const locale of PREFIXED_LOCALES) {
    if (path === `/${locale}`) {
      return { locale, cleanPath: '/' }
    }
    if (path.startsWith(`/${locale}/`)) {
      return { locale, cleanPath: path.slice(`/${locale}`.length) }
    }
  }
  return { locale: DEFAULT_LOCALE, cleanPath: path }
}

/**
 * Builds the full localized path for a given locale and clean path.
 * Examples:
 *   buildLocalePath('en', '/admin/products') → '/en/admin/products'
 *   buildLocalePath('ar', '/admin/products') → '/admin/products'
 *   buildLocalePath('en', '/shop')           → '/en/shop'
 *   buildLocalePath('ar', '/shop')           → '/shop'
 *   buildLocalePath('en', '/')               → '/en'
 *   buildLocalePath('ar', '/')               → '/'
 */
export const buildLocalePath = (locale: LanguageCode, rawPath: string): string => {
  if (!rawPath) return locale === 'en' ? '/en' : '/'

  // Clean path in case rawPath already had a prefix
  const { cleanPath } = parseLocalePath(rawPath)

  if (!PREFIXED_LOCALES.includes(locale)) {
    return cleanPath || '/'
  }
  if (cleanPath === '/') {
    return `/${locale}`
  }
  return `/${locale}${cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath}`
}

export default defineNuxtRouteMiddleware((to) => {
  const path = to.path

  const { locale: urlLocale, cleanPath } = parseLocalePath(path)

  // Sync the global language state from the URL on every navigation
  const currentLanguage = useState<LanguageCode>('appLanguage', () => DEFAULT_LOCALE)

  // On client: handle initial landing with stored language preference
  if (process.client) {
    const savedLang = localStorage.getItem('aswar_lang') as LanguageCode | null

    // If on default (no-prefix) route, but user has an English preference saved,
    // redirect to the /en version so the URL matches the user preference.
    if (urlLocale === DEFAULT_LOCALE && savedLang === 'en') {
      const targetPath = buildLocalePath('en', cleanPath)
      if (targetPath !== path) {
        currentLanguage.value = 'en'
        return navigateTo(targetPath + (to.fullPath.includes('?') ? `?${to.fullPath.split('?')[1]}` : ''), { redirectCode: 302 })
      }
    }
  }

  // Sync state from URL locale
  currentLanguage.value = urlLocale

  // Sync HTML attributes (dir/lang) on client
  if (process.client) {
    const targetDir = urlLocale === 'en' ? 'ltr' : 'rtl'
    document.documentElement.setAttribute('dir', targetDir)
    document.documentElement.setAttribute('lang', urlLocale)
    localStorage.setItem('aswar_lang', urlLocale)
  }
})
