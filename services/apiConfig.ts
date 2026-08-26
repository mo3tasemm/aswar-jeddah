/**
 * Central API Configuration for Aswar Store
 * Supports dynamic environment variables in Vercel, Node, and local development.
 */

export const getApiBaseUrl = (): string => {
  // 1. Check Nuxt Runtime Config
  try {
    const config = useRuntimeConfig()
    if (config?.public?.apiBase && typeof config.public.apiBase === 'string') {
      return config.public.apiBase.replace(/\/+$/, '')
    }
  } catch (e) {
    // ignore outside Nuxt context
  }

  // 2. Check process.env (Vercel & Node SSR environment)
  if (typeof process !== 'undefined' && process.env?.NUXT_PUBLIC_API_BASE) {
    return process.env.NUXT_PUBLIC_API_BASE.replace(/\/+$/, '')
  }

  // 3. Production Default
  return 'https://ai-agunt.elbakry2.com/api/v1'
}

export const API_BASE_URL = getApiBaseUrl()
