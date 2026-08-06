export const useApi = () => {
  const config = useRuntimeConfig()

  const request = async <T>(url: string, options?: Parameters<typeof $fetch>[1]) => {
    return $fetch<T>(url, {
      baseURL: config.public.apiBase as string,
      ...options,
      headers: {
        'Content-Type': 'application/json',
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
