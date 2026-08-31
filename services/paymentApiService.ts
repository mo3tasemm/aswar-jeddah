/**
 * Production-ready Payment API Service for Moyasar, Tamara, and Tabby gateways
 * Aswar Jeddah Electronics E-Commerce Store
 *
 * Gateway Endpoints:
 * - POST /api/v1/moyasar/pay  { payment_id: string | number }
 * - POST /api/v1/tamara/pay   { payment_id: string | number }
 * - POST /api/v1/tabby/pay    { payment_id: string | number }
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    try {
      const nuxtCookie = useCookie('auth_token').value
      if (nuxtCookie) return String(nuxtCookie).replace(/^"(.*)"$/, '$1')
    } catch (e) { }

    const localToken = localStorage.getItem('auth_token') ||
      localStorage.getItem('token') ||
      localStorage.getItem('access_token') ||
      localStorage.getItem('user_token')
    if (localToken) return localToken.replace(/^"(.*)"$/, '$1')

    const cookies = document.cookie.split(';')
    for (const c of cookies) {
      const parts = c.trim().split('=')
      const name = parts[0].trim()
      if (['auth_token', 'token', 'access_token', 'user_token'].includes(name) && parts[1]) {
        const val = decodeURIComponent(parts[1].trim())
        return val.replace(/^"(.*)"$/, '$1')
      }
    }
  }
  return null
}

const getLangCode = (): string => {
  if (process.client) {
    return localStorage.getItem('aswar_lang') || 'ar'
  }
  return 'ar'
}

const buildHeaders = (): Record<string, string> => {
  const token = getAuthToken()
  const lang = getLangCode()
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

export type PaymentGateway = 'moyasar' | 'tamara' | 'tabby' | 'offline_payment' | 'cash_on_delivery'

export interface PaymentInitiationResponse {
  success: boolean
  paymentUrl?: string
  paymentId?: string | number
  status?: string
  message?: string
  raw?: any
}

/**
 * Helper to extract redirect payment URL from diverse API responses
 */
const extractPaymentUrl = (response: any): string | null => {
  if (!response) return null
  return (
    response.payment_url ||
    response.checkout_url ||
    response.redirect_url ||
    response.url ||
    response.data?.payment_url ||
    response.data?.checkout_url ||
    response.data?.redirect_url ||
    response.data?.url ||
    response.paymentUrl ||
    response.checkoutUrl ||
    null
  )
}

export const paymentApiService = {
  /**
   * Moyasar Payment Request (Credit Cards, Mada, Apple Pay, STC Pay)
   * Supports both POST API response with JSON and direct GET 302 redirect.
   */
  async payWithMoyasar(paymentId: string | number): Promise<PaymentInitiationResponse> {
    const lang = getLangCode()
    const locale = lang === 'en' ? 'en' : 'sa'
    const endpoint = `${API_BASE_URL}/moyasar/pay?locale=${locale}`
    const directRedirectUrl = `${API_BASE_URL}/moyasar/pay?payment_id=${encodeURIComponent(paymentId)}&locale=${locale}`

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          payment_id: paymentId
        }
      })

      const paymentUrl = extractPaymentUrl(response) || directRedirectUrl

      return {
        success: true,
        paymentUrl: paymentUrl,
        paymentId,
        message: response?.message || 'Redirecting to Moyasar checkout...',
        raw: response
      }
    } catch (err: any) {
      console.warn('[PaymentApiService] Moyasar API call fallback to direct URL:', err)
      // Since backend supports direct 302 redirect on GET, fallback gracefully to direct URL
      return {
        success: true,
        paymentUrl: directRedirectUrl,
        paymentId,
        message: 'Redirecting to Moyasar checkout...',
        raw: err?.data || err
      }
    }
  },

  /**
   * Tamara Payment Request (Buy Now, Pay Later - Split in 3 or 4)
   * POST /api/v1/tamara/pay
   */
  async payWithTamara(paymentId: string | number): Promise<PaymentInitiationResponse> {
    const lang = getLangCode()
    const locale = lang === 'en' ? 'en' : 'sa'
    const endpoint = `${API_BASE_URL}/tamara/pay?locale=${locale}`

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          payment_id: paymentId
        }
      })

      const paymentUrl = extractPaymentUrl(response)

      return {
        success: Boolean(paymentUrl || response?.success || response?.status === 1),
        paymentUrl: paymentUrl || undefined,
        paymentId,
        message: response?.message || 'Redirecting to Tamara checkout...',
        raw: response
      }
    } catch (err: any) {
      console.error('[PaymentApiService] Tamara Payment Error:', err)
      const errorMsg = err?.data?.message || err?.data?.error || err?.message || 'فشلت تهيئة الدفع عبر تمارا (Tamara)'
      return {
        success: false,
        paymentId,
        message: errorMsg,
        raw: err?.data || err
      }
    }
  },

  /**
   * Tabby Payment Request (Split in 4 installments)
   * POST /api/v1/tabby/pay
   */
  async payWithTabby(paymentId: string | number): Promise<PaymentInitiationResponse> {
    const lang = getLangCode()
    const locale = lang === 'en' ? 'en' : 'sa'
    const endpoint = `${API_BASE_URL}/tabby/pay?locale=${locale}`

    try {
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: buildHeaders(),
        body: {
          payment_id: paymentId
        }
      })

      const paymentUrl = extractPaymentUrl(response)

      return {
        success: Boolean(paymentUrl || response?.success || response?.status === 1),
        paymentUrl: paymentUrl || undefined,
        paymentId,
        message: response?.message || 'Redirecting to Tabby checkout...',
        raw: response
      }
    } catch (err: any) {
      console.error('[PaymentApiService] Tabby Payment Error:', err)
      const errorMsg = err?.data?.message || err?.data?.error || err?.message || 'فشلت تهيئة الدفع عبر تابي (Tabby)'
      return {
        success: false,
        paymentId,
        message: errorMsg,
        raw: err?.data || err
      }
    }
  },

  /**
   * Dynamic gateway payment dispatcher
   */
  async initiateGatewayPayment(gateway: PaymentGateway | string, paymentId: string | number): Promise<PaymentInitiationResponse> {
    const normalizedGateway = (gateway || '').toLowerCase().trim()

    switch (normalizedGateway) {
      case 'moyasar':
      case 'card':
      case 'credit_card':
      case 'mada':
      case 'apple_pay':
        return await this.payWithMoyasar(paymentId)

      case 'tamara':
        return await this.payWithTamara(paymentId)

      case 'tabby':
        return await this.payWithTabby(paymentId)

      default:
        // For custom gateways or fallback
        if (normalizedGateway.includes('tamara')) return await this.payWithTamara(paymentId)
        if (normalizedGateway.includes('tabby')) return await this.payWithTabby(paymentId)
        return await this.payWithMoyasar(paymentId)
    }
  }
}

