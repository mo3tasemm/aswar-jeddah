/**
 * Centralized API Client Service for Nuxt 3
 * Automatically injects authentication tokens and multi-language localization headers on all HTTP requests.
 */

const getApiHeaders = (): Record<string, string> => {
  const token = process.client 
    ? (localStorage.getItem('auth_token') || localStorage.getItem('token') || localStorage.getItem('access_token'))
    : null

  const lang = process.client ? (localStorage.getItem('aswar_lang') || 'ar') : 'ar'
  const isEn = lang === 'en'

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Accept-Language': isEn ? 'en-US,en;q=0.9' : 'ar-SA,ar;q=0.9',
    'X-localization': isEn ? 'en' : 'sa',
    'lang': isEn ? 'en' : 'sa',
    'X-Language': isEn ? 'en' : 'ar'
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  return headers
}

export const useApi = () => {
  const config = useRuntimeConfig()

  const request = async <T>(url: string, options?: Parameters<typeof $fetch>[1]) => {
    return $fetch<T>(url, {
      baseURL: config.public.apiBase as string,
      ...options,
      headers: {
        ...getApiHeaders(),
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
