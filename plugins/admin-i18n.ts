/**
 * Global Admin i18n Plugin for Nuxt 3 / Vue 3
 * Provides global $t helper across all templates and composables.
 */
import { defineNuxtPlugin } from '#app'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

export default defineNuxtPlugin((nuxtApp) => {
  const { t, adminLanguage, adminDir, toggleAdminLanguage, setAdminLanguage } = useAdminLanguage()

  return {
    provide: {
      t,
      adminLanguage,
      adminDir,
      toggleAdminLanguage,
      setAdminLanguage
    }
  }
})
