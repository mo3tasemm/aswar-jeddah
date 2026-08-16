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
    ? (localStorage.getItem('auth_token') || localStorage.getItem('token') || localStorage.getItem('access_token'))
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
  const config = useRuntimeConfig()

  const request = async <T>(url: string, options?: Parameters<typeof $fetch>[1] & { locale?: string; guest_id?: string | number }) => {
    const locale = getCurrentApiLocale(options?.locale)
    
    // Automatically inject guest_id and locale params if URL doesn't have them
    const params = {
      guest_id: '1',
      locale,
      ...(options?.params || {})
    }

    return $fetch<T>(url, {
      baseURL: config.public.apiBase as string,
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
