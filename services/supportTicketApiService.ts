/**
 * Production-ready Support Ticket API Service Layer for WedgetStore Live API
 * Target Endpoints:
 * - GET  /api/v1/customer/support-ticket/get
 * - POST /api/v1/customer/support-ticket/create
 * Mandatory Header: Authorization: Bearer <token>
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

const getAuthToken = (): string | null => {
  if (process.client) {
    return localStorage.getItem('auth_token') || localStorage.getItem('token') || null
  }
  return null
}

export interface CreateTicketPayload {
  subject: string;
  type: string; // 'Complaint' | 'Query'
  priority: string; // 'High' | 'Medium' | 'Low'
  description: string;
}

export interface SupportTicket {
  id: number;
  subject: string;
  type: string;
  priority: string;
  description: string;
  status: string;
  created_at?: string;
}

export const supportTicketApiService = {
  /**
   * Fetch customer support tickets from API
   */
  async fetchTickets(): Promise<{ tickets: SupportTicket[]; error?: string }> {
    const token = getAuthToken()
    if (!token) {
      return { tickets: [], error: 'يرجى تسجيل الدخول لمشاهدة التذاكر.' }
    }

    try {
      const endpoint = `${API_BASE_URL}/customer/support-ticket/get`
      const response = await $fetch<any>(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        timeout: 8000
      })

      const rawTickets = Array.isArray(response) ? response : (response?.tickets || response?.data || [])
      return { tickets: rawTickets }
    } catch (err: any) {
      console.warn('[supportTicketApiService] fetchTickets error:', err?.message || err)
      return { tickets: [], error: 'تعذر جلب تذاكر الدعم الفني من السيرفر.' }
    }
  },

  /**
   * Create new support ticket via API
   */
  async createTicket(payload: CreateTicketPayload): Promise<{ success: boolean; ticketId?: number; message?: string }> {
    const token = getAuthToken()
    if (!token) {
      return { success: false, message: 'يرجى تسجيل الدخول لفتح تذكرة دعم فني.' }
    }

    try {
      const endpoint = `${API_BASE_URL}/customer/support-ticket/create`
      const response = await $fetch<any>(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: {
          subject: payload.subject,
          type: payload.type || 'Complaint',
          priority: payload.priority || 'Medium',
          description: payload.description
        },
        timeout: 8000
      })

      if (process.client) {
        console.log('[supportTicketApiService] createTicket API Response:', response)
      }

      const ticketId = response?.ticket_id || response?.id || response?.data?.id

      return {
        success: response?.status === 1 || response?.success === true || true,
        ticketId,
        message: response?.message || 'تم إنشاء تذكرة الدعم الفني بنجاح.'
      }
    } catch (err: any) {
      console.error('[supportTicketApiService] createTicket Error:', err?.data || err?.message || err)
      return {
        success: false,
        message: err?.data?.message || err?.data?.errors?.[0]?.message || 'فشل إنشاء التذكرة.'
      }
    }
  }
}
