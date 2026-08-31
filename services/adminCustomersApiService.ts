/**
 * Production-ready Admin Customers API Service Layer
 * Endpoints:
 * - GET /api/v1/admin/customers/list?limit=10&offset=1&search=...
 * - GET /api/v1/admin/customers/details/{id}
 * - POST /api/v1/admin/customers/status-update (or /update-status)
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

export interface AdminCustomerAddress {
  id?: string | number;
  customer_id?: string | number;
  contact_person_name?: string;
  address_type?: string;
  address?: string;
  city?: string;
  zip?: string;
  phone?: string;
  country?: string;
  is_billing?: number | boolean;
}

export interface AdminCustomerOrder {
  id: string | number;
  order_amount: number;
  order_status: string;
  payment_status: string;
  payment_method?: string;
  created_at: string;
}

export interface AdminCustomerItem {
  id: string | number;
  name: string;
  f_name?: string;
  l_name?: string;
  email?: string;
  phone?: string;
  image?: string;
  image_url?: string;
  is_active: boolean | number;
  orders_count: number;
  total_spent: number;
  city?: string;
  wallet_balance?: number;
  loyalty_point?: number;
  created_at: string;
  addresses?: AdminCustomerAddress[];
}

export interface AdminCustomerStats {
  total_orders: number;
  completed_orders: number;
  processing_orders: number;
  total_spent: number;
}

export interface AdminCustomersListFilters {
  limit?: number;
  offset?: number;
  page?: number;
  search?: string;
  is_active?: string | number;
}

export interface AdminCustomersListResponse {
  success: boolean;
  customers: AdminCustomerItem[];
  data?: AdminCustomerItem[];
  total: number;
  total_size?: number;
  last_page: number;
  limit: number;
  offset: number;
  message?: string;
}

export interface AdminCustomerDetailsResponse {
  success: boolean;
  customer: AdminCustomerItem | null;
  orders: AdminCustomerOrder[];
  addresses: AdminCustomerAddress[];
  stats: AdminCustomerStats;
  message?: string;
}

/**
 * Format headers with Token
 */
const buildHeaders = (token: string, isJson: boolean = true): HeadersInit => {
  const cleanToken = (token || '').replace(/^Bearer\s+/i, '').trim()
  const headers: HeadersInit = {
    'Accept': 'application/json',
    'X-Client-Type': 'admin',
    'zoneId': '1'
  }
  if (cleanToken) {
    headers['Authorization'] = `Bearer ${cleanToken}`
  }
  if (isJson) {
    headers['Content-Type'] = 'application/json'
  }
  return headers
}

/**
 * Normalize Customer Avatar Image
 */
export const normalizeCustomerAvatar = (imagePath?: string): string => {
  if (!imagePath || typeof imagePath !== 'string') return ''
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://') || imagePath.startsWith('blob:') || imagePath.startsWith('data:')) {
    return imagePath
  }
  const clean = imagePath.replace(/^\/+/, '')
  if (clean.startsWith('storage/')) {
    return `https://wedgetstore.com/${clean}`
  }
  return `https://wedgetstore.com/storage/app/public/profile/${clean}`
}

/**
 * Format Customer Full Name
 */
export const getCustomerFullName = (c: any): string => {
  if (!c) return 'عميل'
  if (c.name && typeof c.name === 'string' && c.name.trim()) return c.name.trim()
  const first = c.f_name || ''
  const last = c.l_name || ''
  const full = `${first} ${last}`.trim()
  return full || c.email || 'عميل'
}

export const adminCustomersApiService = {
  /**
   * Fetch Customers List
   * GET /api/v1/admin/customers/list?limit=10&offset=1&search=...
   */
  async fetchCustomersList(
    token: string,
    filters: AdminCustomersListFilters = {}
  ): Promise<AdminCustomersListResponse> {
    const limit = filters.limit || 10
    const offset = filters.offset !== undefined ? filters.offset : (filters.page || 1)

    const params = new URLSearchParams()
    params.append('limit', String(limit))
    params.append('offset', String(offset))
    params.append('page', String(offset))
    params.append('_t', String(Date.now()))

    if (filters.search && filters.search.trim()) {
      params.append('search', filters.search.trim())
    }
    if (filters.is_active !== undefined && filters.is_active !== '') {
      params.append('is_active', String(filters.is_active))
    }

    const url = `${API_BASE_URL}/admin/customers/list?${params.toString()}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(token, true)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const raw = await response.json()

      let rawList: any[] = []
      let totalCount = 0

      if (Array.isArray(raw)) {
        rawList = raw
        totalCount = raw.length
      } else if (raw && typeof raw === 'object') {
        totalCount = Number(
          raw.total_size ??
          raw.total ??
          raw.customers?.total ??
          raw.data?.total ??
          0
        )

        if (Array.isArray(raw.customers)) {
          rawList = raw.customers
        } else if (raw.customers && Array.isArray(raw.customers.data)) {
          rawList = raw.customers.data
        } else if (Array.isArray(raw.data)) {
          rawList = raw.data
        } else if (raw.data && Array.isArray(raw.data.customers)) {
          rawList = raw.data.customers
        } else if (raw.data && Array.isArray(raw.data.data)) {
          rawList = raw.data.data
        } else if (Array.isArray(raw.items)) {
          rawList = raw.items
        }

        if (totalCount === 0 && rawList.length > 0) {
          totalCount = rawList.length
        }
      }

      const mappedCustomers: AdminCustomerItem[] = (rawList || []).map((item: any) => {
        if (!item || typeof item !== 'object') return null

        const fullName = getCustomerFullName(item)
        const avatar = normalizeCustomerAvatar(item.image_url || item.image || '')

        const ordersCount = Number(
          item.orders_count ??
          item.total_orders ??
          (Array.isArray(item.orders) ? item.orders.length : 0)
        )

        const totalSpent = Number(
          item.total_spent ??
          item.orders_sum_order_amount ??
          item.total_order_amount ??
          0
        )

        const isActive = item.is_active === true || item.is_active === 1 || item.is_active === '1' || item.status === 1 || item.status === '1'

        const city = item.city || item.address?.city || (Array.isArray(item.addresses) && item.addresses[0]?.city ? item.addresses[0].city : '')

        return {
          id: item.id,
          name: fullName,
          f_name: item.f_name || '',
          l_name: item.l_name || '',
          email: item.email || '',
          phone: item.phone || '',
          image: item.image || '',
          image_url: avatar,
          is_active: isActive ? 1 : 0,
          orders_count: isNaN(ordersCount) ? 0 : ordersCount,
          total_spent: isNaN(totalSpent) ? 0 : totalSpent,
          city: city,
          wallet_balance: Number(item.wallet_balance || 0),
          loyalty_point: Number(item.loyalty_point || 0),
          created_at: item.created_at || new Date().toISOString(),
          addresses: Array.isArray(item.addresses) ? item.addresses : []
        }
      }).filter((item): item is AdminCustomerItem => item !== null)

      const lastPageNum = Number(raw.last_page || Math.max(1, Math.ceil(totalCount / limit)))

      return {
        success: true,
        customers: mappedCustomers,
        data: mappedCustomers,
        total: totalCount || mappedCustomers.length,
        total_size: totalCount || mappedCustomers.length,
        last_page: lastPageNum,
        limit,
        offset
      }
    } catch (error: any) {
      console.error('Error fetching admin customers list:', error)
      return {
        success: false,
        customers: [],
        data: [],
        total: 0,
        total_size: 0,
        last_page: 1,
        limit,
        offset,
        message: error.message || 'فشل في جلب قائمة العملاء'
      }
    }
  },

  /**
   * Fetch Single Customer Details with Orders & Addresses
   * GET /api/v1/admin/customers/details/{id}
   */
  async fetchCustomerDetails(
    token: string,
    customerId: string | number
  ): Promise<AdminCustomerDetailsResponse> {
    const url = `${API_BASE_URL}/admin/customers/details/${customerId}?_t=${Date.now()}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(token, true)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const raw = await response.json()

      let customerObj: any = null
      let rawOrders: any[] = []
      let rawAddresses: any[] = []

      if (raw && typeof raw === 'object') {
        if (raw.customer && typeof raw.customer === 'object') {
          customerObj = raw.customer
          rawOrders = Array.isArray(raw.orders) ? raw.orders : (Array.isArray(raw.customer?.orders) ? raw.customer.orders : [])
          rawAddresses = Array.isArray(raw.addresses) ? raw.addresses : (Array.isArray(raw.customer?.addresses) ? raw.customer.addresses : [])
        } else if (raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data)) {
          customerObj = raw.data.customer || raw.data
          rawOrders = Array.isArray(raw.data.orders) ? raw.data.orders : []
          rawAddresses = Array.isArray(raw.data.addresses) ? raw.data.addresses : []
        } else if (raw.id) {
          customerObj = raw
          rawOrders = Array.isArray(raw.orders) ? raw.orders : []
          rawAddresses = Array.isArray(raw.addresses) ? raw.addresses : []
        }
      }

      // If customer object is missing, search from list
      if (!customerObj || !customerObj.id) {
        try {
          const listRes = await this.fetchCustomersList(token, { limit: 100, search: String(customerId) })
          const found = listRes.customers.find(c => String(c.id) === String(customerId))
          if (found) {
            customerObj = found
          }
        } catch { }
      }

      const fullName = getCustomerFullName(customerObj)
      const avatar = normalizeCustomerAvatar(customerObj?.image_url || customerObj?.image || '')
      const isActive = customerObj?.is_active === true || customerObj?.is_active === 1 || customerObj?.is_active === '1'

      // Map orders
      const mappedOrders: AdminCustomerOrder[] = (rawOrders || []).map((o: any) => ({
        id: o.id || o.order_id,
        order_amount: Number(o.order_amount ?? o.total_amount ?? 0),
        order_status: String(o.order_status || o.status || 'pending').toLowerCase().trim(),
        payment_status: String(o.payment_status || 'unpaid').toLowerCase().trim(),
        payment_method: o.payment_method || 'card',
        created_at: o.created_at || new Date().toISOString()
      }))

      // Map addresses
      const mappedAddresses: AdminCustomerAddress[] = (rawAddresses || []).map((a: any) => ({
        id: a.id,
        customer_id: a.customer_id || customerId,
        contact_person_name: a.contact_person_name || fullName,
        address_type: a.address_type || 'منزل',
        address: a.address || '',
        city: a.city || '',
        zip: a.zip || '',
        phone: a.phone || customerObj?.phone || '',
        country: a.country || 'المملكة العربية السعودية',
        is_billing: a.is_billing || 0
      }))

      // Extract statistics object directly from response or customerData
      const rawStats = raw.statistics || raw.customer?.statistics || raw.data?.statistics || customerObj?.statistics || null

      // Fallback compute statistics from mapped orders
      const totalOrdersCount = mappedOrders.length
      const completedOrders = mappedOrders.filter(o => o.order_status === 'delivered' || o.order_status === 'completed').length
      const processingOrders = mappedOrders.filter(o => ['pending', 'confirmed', 'processing', 'out_for_delivery'].includes(o.order_status)).length
      const totalSpentAmount = mappedOrders.reduce((sum, o) => sum + o.order_amount, 0) || Number(customerObj?.total_spent || 0)

      const stats: AdminCustomerStats = {
        total_orders: Number(rawStats?.total_orders ?? rawStats?.total_order ?? totalOrdersCount ?? customerObj?.orders_count ?? 0),
        completed_orders: Number(rawStats?.completed_orders ?? rawStats?.delivered_orders ?? completedOrders ?? 0),
        processing_orders: Number(rawStats?.processing_orders ?? rawStats?.ongoing_orders ?? processingOrders ?? 0),
        total_spent: Number(rawStats?.total_spent ?? rawStats?.total_order_amount ?? totalSpentAmount ?? customerObj?.total_spent ?? 0)
      }

      const walletBalance = Number(customerObj?.wallet_balance ?? raw.wallet_balance ?? raw.data?.wallet_balance ?? 0)
      const loyaltyPoint = Number(customerObj?.loyalty_point ?? raw.loyalty_point ?? raw.data?.loyalty_point ?? 0)

      const normalizedCustomer: AdminCustomerItem = {
        id: customerObj?.id || customerId,
        name: fullName,
        f_name: customerObj?.f_name || '',
        l_name: customerObj?.l_name || '',
        email: customerObj?.email || '',
        phone: customerObj?.phone || '',
        image: customerObj?.image || '',
        image_url: avatar,
        is_active: isActive ? 1 : 0,
        orders_count: stats.total_orders,
        total_spent: stats.total_spent,
        city: customerObj?.city || (mappedAddresses[0]?.city || ''),
        wallet_balance: isNaN(walletBalance) ? 0 : walletBalance,
        loyalty_point: isNaN(loyaltyPoint) ? 0 : loyaltyPoint,
        created_at: customerObj?.created_at || new Date().toISOString(),
        addresses: mappedAddresses
      }

      return {
        success: true,
        customer: normalizedCustomer,
        orders: mappedOrders,
        addresses: mappedAddresses,
        stats
      }
    } catch (error: any) {
      console.error('Error fetching customer details:', error)
      return {
        success: false,
        customer: null,
        orders: [],
        addresses: [],
        stats: { total_orders: 0, completed_orders: 0, processing_orders: 0, total_spent: 0 },
        message: error.message || 'فشل في جلب تفاصيل العميل'
      }
    }
  },

  /**
   * Update Customer Active Status
   * POST /api/v1/admin/customers/status-update or /update-status
   */
  async updateCustomerStatus(
    token: string,
    payload: { id: string | number; is_active: number | boolean }
  ): Promise<{ success: boolean; message: string }> {
    const endpoints = [
      `${API_BASE_URL}/admin/customers/status-update`,
      `${API_BASE_URL}/admin/customers/update-status`,
      `${API_BASE_URL}/admin/customer/status-update`
    ]

    const bodyPayload = {
      id: payload.id,
      customer_id: payload.id,
      is_active: payload.is_active ? 1 : 0,
      status: payload.is_active ? 1 : 0
    }

    let lastError = 'فشل في تحديث حالة العميل'

    for (const ep of endpoints) {
      try {
        const res = await fetch(ep, {
          method: 'POST',
          headers: buildHeaders(token, true),
          body: JSON.stringify(bodyPayload)
        })
        if (res.ok) {
          const json = await res.json().catch(() => ({}))
          return {
            success: true,
            message: json.message || 'تم تحديث حالة حساب العميل بنجاح!'
          }
        }
      } catch (err: any) {
        lastError = err.message || lastError
      }
    }

    return {
      success: false,
      message: lastError
    }
  }
}

