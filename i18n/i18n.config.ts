/**
 * Vue I18n Configuration File
 * Required by @nuxtjs/i18n module.
 *
 * Note: Actual translations are managed by the custom useLanguage composable
 * which holds the full translation dictionary. This file just satisfies the
 * i18n module requirement with minimal configuration.
 * The i18n module here is used ONLY for its routing capabilities (locale prefix in URLs).
 */
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'ar',
  fallbackLocale: 'ar',
  messages: {
    ar: {},
    en: {}
  }
}))
