/**
 * Centralized Multi-Language Composable for Aswar Jeddah Admin Panel
 *
 * Supports nested JSON dictionary keys from `locales/admin/ar.json` and `locales/admin/en.json`.
 * Features:
 * - Reactive state persistence in localStorage ('admin_lang') and cookies ('admin_lang').
 * - Dynamic RTL / LTR layout switching.
 * - String variable interpolation (e.g. {name}, {count}).
 * - Fallback to Arabic and key string if translation is missing.
 */

import { computed, onMounted, getCurrentInstance } from 'vue'
import { useState } from '#imports'
import arMessages from '~/locales/admin/ar.json'
import enMessages from '~/locales/admin/en.json'

export type AdminLanguageCode = 'ar' | 'en'

const dictionaries: Record<AdminLanguageCode, any> = {
  ar: arMessages,
  en: enMessages
}

/**
 * Resolves a nested key (e.g. 'admin.products.title') in a dictionary object.
 */
const resolveNestedKey = (obj: any, path: string): string | undefined => {
  if (!obj || !path) return undefined
  const keys = path.split('.')
  let current = obj
  for (const key of keys) {
    if (current === undefined || current === null) return undefined
    current = current[key]
  }
  return typeof current === 'string' ? current : undefined
}

export const useAdminLanguage = () => {
  // Global reactive language state for admin panel ('ar' is default)
  const adminLanguage = useState<AdminLanguageCode>('adminAppLanguage', () => {
    if (process.client) {
      const savedLang = localStorage.getItem('admin_lang') as AdminLanguageCode | null
      if (savedLang === 'ar' || savedLang === 'en') return savedLang
    }
    return 'ar'
  })

  const adminDir = computed<'rtl' | 'ltr'>(() => (adminLanguage.value === 'en' ? 'ltr' : 'rtl'))
  const isAdminRtl = computed<boolean>(() => adminDir.value === 'rtl')

  /**
   * Sync document attributes and localStorage
   */
  const syncAttributes = (lang: AdminLanguageCode) => {
    if (process.client) {
      const targetDir = lang === 'en' ? 'ltr' : 'rtl'
      document.documentElement.setAttribute('dir', targetDir)
      document.documentElement.setAttribute('lang', lang)
      localStorage.setItem('admin_lang', lang)
      // Also update cookie for SSR
      const cookie = useCookie('admin_lang', { maxAge: 60 * 60 * 24 * 365, path: '/' })
      cookie.value = lang
    }
  }

  /**
   * Switch admin language
   */
  const setAdminLanguage = (lang: AdminLanguageCode) => {
    if (adminLanguage.value !== lang) {
      adminLanguage.value = lang
      syncAttributes(lang)
    }
  }

  /**
   * Toggle between Arabic and English
   */
  const toggleAdminLanguage = () => {
    const nextLang: AdminLanguageCode = adminLanguage.value === 'ar' ? 'en' : 'ar'
    setAdminLanguage(nextLang)
  }

  /**
   * Translation Helper
   * Supports nested keys (e.g., 'admin.products.title' or 'admin.common.save') and parameter interpolation.
   */
  const t = (key: string, params?: Record<string, string | number>, fallback?: string): string => {
    const currentDict = dictionaries[adminLanguage.value] || dictionaries.ar
    const fallbackDict = dictionaries.ar

    let text = resolveNestedKey(currentDict, key)
    if (!text) {
      text = resolveNestedKey(fallbackDict, key)
    }
    if (!text) {
      text = fallback || key
    }

    // Interpolate {variable} if params are provided
    if (params && typeof text === 'string') {
      for (const [k, val] of Object.entries(params)) {
        text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(val))
      }
    }

    return text
  }

  // Only call onMounted if within an active Vue component instance
  if (getCurrentInstance()) {
    onMounted(() => {
      if (process.client) {
        const savedLang = localStorage.getItem('admin_lang') as AdminLanguageCode | null
        if (savedLang === 'ar' || savedLang === 'en') {
          adminLanguage.value = savedLang
          syncAttributes(savedLang)
        } else {
          syncAttributes(adminLanguage.value)
        }
      }
    })
  }

  return {
    adminLanguage,
    currentLanguage: adminLanguage,
    locale: adminLanguage,
    adminDir,
    dir: adminDir,
    isAdminRtl,
    isRtl: isAdminRtl,
    setAdminLanguage,
    toggleAdminLanguage,
    t,
    $t: t
  }
}
