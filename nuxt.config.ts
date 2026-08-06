// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: '.',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  app: {
    head: {
      titleTemplate: '%s',
      title: 'أسوار جدة | Aswar Jeddah - متجر الأجهزة الكهربائية الأول',
      htmlAttrs: {
        dir: 'rtl',
        lang: 'ar'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'المتجر الإلكتروني الأول للأجهزة الكهربائية في جدة. تسوق أحدث المنتجات بأفضل الأسعار.' },
        { property: 'og:title', content: 'أسوار جدة | Aswar Jeddah' },
        { property: 'og:description', content: 'المتجر الإلكتروني الأول للأجهزة الكهربائية في جدة. تسوق أحدث المنتجات بأفضل الأسعار.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'ar_SA' },
        { name: 'theme-color', content: '#0B0E28' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' }
      ]
    }
  }
})