/**
 * Central API Configuration for Aswar Store
 * Supports dynamic environment variables in Vercel, Node, and local development.
 */

export const sanitizeApiUrl = (url?: string | null): string => {
  if (!url || typeof url !== 'string') {
    return 'https://ai-agunt.elbakry2.com/api/v1'
  }
  let clean = url.trim()
  // Fix single slash typos e.g. https:/ai-agunt -> https://ai-agunt
  if (clean.startsWith('https:/') && !clean.startsWith('https://')) {
    clean = clean.replace(/^https:\/+/, 'https://')
  } else if (clean.startsWith('http:/') && !clean.startsWith('http://')) {
    clean = clean.replace(/^http:\/+/, 'http://')
  } else if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = `https://${clean.replace(/^\/+/, '')}`
  }
  return clean.replace(/\/+$/, '')
}

export const getApiBaseUrl = (): string => {
  // 1. Check Nuxt Runtime Config
  try {
    const config = useRuntimeConfig()
    if (config?.public?.apiBase && typeof config.public.apiBase === 'string') {
      return sanitizeApiUrl(config.public.apiBase)
    }
  } catch (e) {
    // outside Nuxt context
  }

  // 2. Check process.env (Vercel & Node SSR environment)
  if (typeof process !== 'undefined' && process.env?.NUXT_PUBLIC_API_BASE) {
    return sanitizeApiUrl(process.env.NUXT_PUBLIC_API_BASE)
  }

  // 3. Check import.meta.env (Vite client environment)
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env?.NUXT_PUBLIC_API_BASE) {
      return sanitizeApiUrl(import.meta.env.NUXT_PUBLIC_API_BASE as string)
    }
  } catch (e) {
    // ignore
  }

  // 4. Production Default
  return 'https://ai-agunt.elbakry2.com/api/v1'
}

export const API_BASE_URL = getApiBaseUrl()
export const getApiBase = getApiBaseUrl
