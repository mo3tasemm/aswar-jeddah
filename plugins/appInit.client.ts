import { defineNuxtPlugin } from '#app'
import { useAppInit } from '~/composables/useAppInit'

export default defineNuxtPlugin((nuxtApp) => {
  const { initApp } = useAppInit()

  // Bootstrap core APIs immediately when Nuxt client app is ready
  nuxtApp.hook('app:mounted', () => {
    initApp()
  })
})
