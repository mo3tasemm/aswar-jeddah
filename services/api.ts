/**
 * Centralized API Client Service for Nuxt 3
 * Automatically injects authentication tokens and multi-language localization headers on all HTTP requests.
 */

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

const getApiHeaders = (localeInput?: string): Record<string, string> => {
  const token = process.client
    ? (localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || localStorage.getItem('token') || localStorage.getItem('access_token'))
    : null

  const locale = getCurrentApiLocale(localeInput)
  const isEn = locale === 'EN'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': locale,
    'lang': locale,
    'X-Language': isEn ? 'en' : 'ar'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export const useApi = () => {
  let apiBase = 'https:/ai-agunt.elbakry2.com/api/v1'
  try {
    const config = useRuntimeConfig()
    if (config?.public?.apiBase) {
      apiBase = config.public.apiBase as string
    }
  } catch (e) {
    if (process.env.NUXT_PUBLIC_API_BASE) {
      apiBase = process.env.NUXT_PUBLIC_API_BASE
    }
  }

  apiBase = apiBase.replace(/\/+$/, '')

  const request = async <T>(url: string, options?: Parameters<typeof $fetch>[1] & { locale?: string; guest_id?: string | number }) => {
    const locale = getCurrentApiLocale(options?.locale)

    // Normalize endpoint URL to prevent double /api/v1 prefix
    let cleanUrl = url
    if (apiBase.endsWith('/api/v1') && cleanUrl.startsWith('/api/v1/')) {
      cleanUrl = cleanUrl.substring(7) // remove leading /api/v1
    } else if (apiBase.endsWith('/api/v1') && cleanUrl === '/api/v1') {
      cleanUrl = '/'
    }

    // Automatically inject guest_id and locale params if URL doesn't have them
    const params = {
      guest_id: '1',
      locale,
      ...(options?.params || {})
    }

    return $fetch<T>(cleanUrl, {
      baseURL: apiBase,
      ...options,
      params,
      headers: {
        ...getApiHeaders(locale),
        ...options?.headers,
      },
    })
  }

  return {
    get: <T>(url: string, options?: any) => request<T>(url, { ...options, method: 'GET' }),
    post: <T>(url: string, body?: any, options?: any) => request<T>(url, { ...options, method: 'POST', body }),
    put: <T>(url: string, body?: any, options?: any) => request<T>(url, { ...options, method: 'PUT', body }),
    delete: <T>(url: string, options?: any) => request<T>(url, { ...options, method: 'DELETE' }),
  }
}
