// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  srcDir: '.',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  
  // تعطيل الـ SSR ليعمل كـ SPA خفيف وسريع وتجنب حدود دوال السيرفر
  ssr: false,

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'
    }
  },

  hooks: {
    'pages:extend'(pages) {
      function cloneChildren(children: any[], prefix: string): any[] {
        return children.map(child => ({
          ...child,
          name: child.name ? `${prefix}-${child.name}` : undefined,
          children: child.children ? cloneChildren(child.children, prefix) : undefined
        }))
      }

      function duplicateRoutesForLocale(routes: any[], prefix: string): any[] {
        const result: any[] = []
        for (const route of routes) {
          if (route.path.startsWith(`/${prefix}`) || route.path === '/:slug(.*)*' || route.path === '/:catchAll(.*)*') {
            continue
          }

          let localizedPath = route.path
          if (localizedPath === '/') {
            localizedPath = `/${prefix}`
          } else if (localizedPath.startsWith('/')) {
            localizedPath = `/${prefix}${localizedPath}`
          }

          const clonedRoute = {
            ...route,
            name: route.name ? `${prefix}-${route.name}` : undefined,
            path: localizedPath,
            children: route.children ? cloneChildren(route.children, prefix) : undefined
          }
          result.push(clonedRoute)
        }
        return result
      }

      const enRoutes = duplicateRoutesForLocale(pages, 'en')
      pages.push(...enRoutes)
    }
  },

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
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ]
    }
  }
})