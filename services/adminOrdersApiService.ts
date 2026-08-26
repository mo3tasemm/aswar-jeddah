/**
 * Admin Orders API Service Layer
 * Live API Endpoints:
 * 1. GET  /api/v1/admin/orders/list?limit={limit}&offset={offset}&order_status={order_status}&payment_status={payment_status}&search={search}
 * 2. GET  /api/v1/admin/orders/details/{id}
 * 3. POST /api/v1/admin/orders/update-status (body: { order_id, order_status })
 * 4. POST /api/v1/admin/orders/update-payment-status (body: { order_id, payment_status })
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https:/ai-agunt.elbakry2.com/api/v1'

export interface AdminOrderCustomer {
  id?: number | string;
  f_name?: string;
  l_name?: string;
  name?: string;
  phone?: string;
  email?: string;
  image?: string;
}

export interface AdminOrderShippingAddress {
  id?: number | string;
  customer_id?: number | string;
  contact_person_name?: string;
  address_type?: string;
  address?: string;
  city?: string;
  zip?: string;
  phone?: string;
  country?: string;
  latitude?: string;
  longitude?: string;
}

export interface AdminOrderItemDetail {
  id: number | string;
  order_id: number | string;
  product_id: number | string;
  seller_id?: number | string;
  product_details?: any;
  product_name?: string;
  product_thumbnail?: string;
  qty: number;
  price: number;
  tax?: number;
  discount?: number;
  tax_model?: string;
  delivery_status?: string;
  payment_status?: string;
  variant?: string;
  variation?: any;
}

export interface AdminOrderItem {
  id: number | string;
  customer_id?: number | string;
  customer_type?: string;
  payment_status: 'paid' | 'unpaid' | 'refunded' | string;
  order_status: 'pending' | 'confirmed' | 'processing' | 'out_for_delivery' | 'delivered' | 'canceled' | 'returned' | 'failed' | string;
  payment_method?: string;
  transaction_ref?: string;
  payment_by?: string;
  payment_note?: string;
  order_group_id?: string;
  discount_amount?: number;
  discount_type?: string;
  coupon_code?: string;
  coupon_discount_bearer?: string;
  shipping_cost?: number;
  order_amount: number;
  shipping_address_data?: AdminOrderShippingAddress | string;
  billing_address_data?: AdminOrderShippingAddress | string;
  shipping_address?: AdminOrderShippingAddress | string;
  billing_address?: AdminOrderShippingAddress | string;
  customer?: AdminOrderCustomer;
  customer_name?: string;
  customer_phone?: string;
  customer_email?: string;
  details?: AdminOrderItemDetail[];
  order_details?: AdminOrderItemDetail[];
  details_count?: number;
  created_at: string;
  updated_at?: string;
}

export interface AdminOrdersListFilters {
  limit?: number;
  offset?: number;
  page?: number;
  order_status?: string;
  payment_status?: string;
  search?: string;
}

export interface AdminOrdersListResponse {
  success: boolean;
  orders: AdminOrderItem[];
  total: number;
  limit: number;
  offset: number;
  message?: string;
}

export interface AdminOrderDetailsResponse {
  success: boolean;
  order: AdminOrderItem | null;
  details: AdminOrderItemDetail[];
  customer?: AdminOrderCustomer | null;
  shipping_address?: AdminOrderShippingAddress | null;
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

const buildHeaders = (token?: string, isJson: boolean = true): Record<string, string> => {
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'X-Client-Type': 'admin',
    'zoneId': '1'
  }

  if (isJson) {
    headers['Content-Type'] = 'application/json'
  }

  if (token) {
    const cleanToken = token.replace(/^"(.*)"$/, '$1').trim()
    headers['Authorization'] = `Bearer ${cleanToken}`
  }

  return headers
}

export const normalizeOrderProductImage = (rawImg: any): string => {
  if (!rawImg) return '/images/placeholder.png'
  if (typeof rawImg !== 'string') return '/images/placeholder.png'
  if (rawImg.startsWith('http://') || rawImg.startsWith('https://')) return rawImg
  const clean = rawImg.replace(/^\/+/, '').trim()
  return `https://wedgetstore.com/storage/app/public/product/thumbnail/${clean}`
}

export const formatCustomerFullName = (customer?: AdminOrderCustomer | null, fallbackName?: string): string => {
  if (!customer) return fallbackName || 'عميل غير مسجل'
  if (customer.name) return customer.name
  const first = customer.f_name || ''
  const last = customer.l_name || ''
  const full = `${first} ${last}`.trim()
  return full || fallbackName || 'عميل'
}

export const parseAddressData = (data: any): AdminOrderShippingAddress | null => {
  if (!data) return null
  if (typeof data === 'object') return data
  if (typeof data === 'string') {
    try {
      return JSON.parse(data)
    } catch {
      return { address: data }
    }
  }
  return null
}

export const adminOrdersApiService = {
  /**
   * Fetch Orders List with Filters & Pagination
   * GET /api/v1/admin/orders/list?limit=10&offset=1&order_status=pending&payment_status=paid&search=1001
   */
  async fetchOrdersList(
    token: string,
    filters: AdminOrdersListFilters = {}
  ): Promise<AdminOrdersListResponse> {
    const limit = filters.limit || 10
    const offset = filters.offset !== undefined ? filters.offset : (filters.page || 1)

    const params = new URLSearchParams()
    params.append('limit', String(limit))
    params.append('offset', String(offset))
    params.append('page', String(offset))
    params.append('_t', String(Date.now()))

    if (filters.order_status && filters.order_status !== 'all') {
      params.append('order_status', filters.order_status)
      params.append('status', filters.order_status)
    }
    if (filters.payment_status && filters.payment_status !== 'all') {
      params.append('payment_status', filters.payment_status)
    }
    if (filters.search && filters.search.trim()) {
      params.append('search', filters.search.trim())
    }

    const url = `${API_BASE_URL}/admin/orders/list?${params.toString()}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(token, true)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const raw = await response.json()

      let ordersList: any[] = []
      let totalCount = 0

      if (Array.isArray(raw)) {
        ordersList = raw
        totalCount = raw.length
      } else if (raw && typeof raw === 'object') {
        // Total size
        totalCount = Number(
          raw.total_size ??
          raw.total ??
          raw.orders?.total ??
          raw.data?.total ??
          0
        )

        // Find the array of orders
        if (Array.isArray(raw.orders)) {
          ordersList = raw.orders
        } else if (raw.orders && typeof raw.orders === 'object') {
          if (Array.isArray(raw.orders.data)) {
            ordersList = raw.orders.data
          } else {
            const vals = Object.values(raw.orders).filter(v => v && typeof v === 'object')
            if (vals.length > 0) ordersList = vals
          }
        } else if (Array.isArray(raw.data)) {
          ordersList = raw.data
        } else if (raw.data && typeof raw.data === 'object') {
          if (Array.isArray(raw.data.orders)) {
            ordersList = raw.data.orders
          } else if (Array.isArray(raw.data.data)) {
            ordersList = raw.data.data
          } else {
            const vals = Object.values(raw.data).filter(v => v && typeof v === 'object')
            if (vals.length > 0) ordersList = vals
          }
        } else if (Array.isArray(raw.items)) {
          ordersList = raw.items
        }

        if (totalCount === 0 && ordersList.length > 0) {
          totalCount = ordersList.length
        }
      }

      // Normalize items safely
      const mappedOrders: AdminOrderItem[] = (ordersList || []).map((item: any) => {
        if (!item || typeof item !== 'object') return null

        const shippingAddr = parseAddressData(item.shipping_address_data || item.shipping_address)
        const billingAddr = parseAddressData(item.billing_address_data || item.billing_address)

        let parsedCustomer: any = null
        if (item.customer && typeof item.customer === 'object') {
          parsedCustomer = item.customer
        } else if (item.customer && typeof item.customer === 'string') {
          try { parsedCustomer = JSON.parse(item.customer) } catch { }
        } else if (item.customer_id) {
          parsedCustomer = {
            id: item.customer_id,
            name: item.customer_name || item.name,
            phone: item.customer_phone || item.phone,
            email: item.customer_email || item.email
          }
        }

        const fallbackCustomerName = item.customer_name ||
          (item.customer ? `${item.customer.f_name || ''} ${item.customer.l_name || ''}`.trim() : '') ||
          shippingAddr?.contact_person_name ||
          billingAddr?.contact_person_name ||
          'عميل غير مسجل'

        const custName = formatCustomerFullName(parsedCustomer, fallbackCustomerName)
        const custPhone = item.customer_phone || parsedCustomer?.phone || shippingAddr?.phone || billingAddr?.phone || item.phone || ''
        const custEmail = item.customer_email || parsedCustomer?.email || item.email || ''

        const rawAmount = item.order_amount ?? item.order_amount_with_tax ?? item.total_amount ?? item.amount ?? 0
        const orderAmount = Number(rawAmount)

        return {
          ...item,
          id: item.id || item.order_id || '0',
          order_amount: isNaN(orderAmount) ? 0 : orderAmount,
          shipping_cost: Number(item.shipping_cost ?? 0),
          discount_amount: Number(item.discount_amount ?? item.discount ?? 0),
          order_status: String(item.order_status || item.status || 'pending').toLowerCase().trim(),
          payment_status: String(item.payment_status || 'unpaid').toLowerCase().trim(),
          customer: parsedCustomer,
          customer_name: custName,
          customer_phone: custPhone,
          customer_email: custEmail,
          shipping_address_data: shippingAddr,
          billing_address_data: billingAddr,
          created_at: item.created_at || new Date().toISOString()
        }
      }).filter((item): item is AdminOrderItem => item !== null)

      const lastPageNum = Number(raw.last_page || Math.max(1, Math.ceil(totalCount / limit)))

      return {
        success: true,
        orders: mappedOrders,
        data: mappedOrders,
        total: totalCount || mappedOrders.length,
        total_size: totalCount || mappedOrders.length,
        last_page: lastPageNum,
        limit,
        offset
      }
    } catch (error: any) {
      console.error('Error fetching admin orders list:', error)
      return {
        success: false,
        orders: [],
        data: [],
        total: 0,
        total_size: 0,
        last_page: 1,
        limit,
        offset,
        message: error.message || 'فشل في جلب قائمة الطلبات'
      }
    }
  },

  /**
   * Fetch Single Order Details
   * GET /api/v1/admin/orders/details/{id}
   */
  async fetchOrderDetails(
    token: string,
    orderId: string | number
  ): Promise<AdminOrderDetailsResponse> {
    const url = `${API_BASE_URL}/admin/orders/details/${orderId}?_t=${Date.now()}`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: buildHeaders(token, true)
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const raw = await response.json()

      let orderObj: any = null
      let detailsList: any[] = []

      // 1. Array response directly
      if (Array.isArray(raw)) {
        detailsList = raw
        if (raw.length > 0 && raw[0].order) {
          orderObj = raw[0].order
        }
      }
      // 2. Object response
      else if (raw && typeof raw === 'object') {
        // Extract details array from all possible keys
        if (Array.isArray(raw.details)) {
          detailsList = raw.details
        } else if (Array.isArray(raw.order_details)) {
          detailsList = raw.order_details
        } else if (Array.isArray(raw.items)) {
          detailsList = raw.items
        } else if (Array.isArray(raw.items_summary)) {
          detailsList = raw.items_summary
        } else if (Array.isArray(raw.data)) {
          detailsList = raw.data
        } else if (raw.data && Array.isArray(raw.data.details)) {
          detailsList = raw.data.details
        } else if (raw.data && Array.isArray(raw.data.order_details)) {
          detailsList = raw.data.order_details
        } else if (raw.data && Array.isArray(raw.data.items)) {
          detailsList = raw.data.items
        } else if (raw.order && Array.isArray(raw.order.details)) {
          detailsList = raw.order.details
        } else if (raw.order && Array.isArray(raw.order.order_details)) {
          detailsList = raw.order.order_details
        } else if (raw.order && Array.isArray(raw.order.items)) {
          detailsList = raw.order.items
        }

        // Extract order main object
        if (raw.order && typeof raw.order === 'object') {
          orderObj = raw.order
        } else if (raw.data && typeof raw.data === 'object' && !Array.isArray(raw.data)) {
          orderObj = raw.data.order || raw.data
        } else if (raw.id) {
          orderObj = raw
        }
      }

      // If order object is missing, search order in list
      if (!orderObj || !orderObj.id) {
        try {
          const listRes = await this.fetchOrdersList(token, { limit: 100, search: String(orderId) })
          const found = listRes.orders.find(o => String(o.id) === String(orderId))
          if (found) {
            orderObj = found
          }
        } catch { }
      }

      const mappedDetails: AdminOrderItemDetail[] = detailsList.map((d: any) => {
        if (!d || typeof d !== 'object') return null

        let pDetails: any = null
        if (d.product_details) {
          if (typeof d.product_details === 'string') {
            try {
              pDetails = JSON.parse(d.product_details)
            } catch {
              pDetails = { name: d.product_details }
            }
          } else if (typeof d.product_details === 'object') {
            pDetails = d.product_details
          }
        } else if (d.product && typeof d.product === 'object') {
          pDetails = d.product
        }

        const name = d.product_name || pDetails?.name || d.product?.name || d.name || d.title || `منتج #${d.product_id || d.id || '1'}`
        const rawThumbnail = pDetails?.thumbnail || d.product_thumbnail || d.thumbnail || d.product?.thumbnail || d.image || d.product?.image || ''
        const thumbnail = normalizeOrderProductImage(rawThumbnail)

        const qty = Number(d.qty ?? d.quantity ?? d.count ?? 1)
        const price = Number(d.price ?? d.unit_price ?? pDetails?.unit_price ?? 0)
        const tax = Number(d.tax ?? d.tax_amount ?? 0)
        const discount = Number(d.discount ?? d.discount_amount ?? 0)

        let variantText = ''
        if (typeof d.variant === 'string') {
          variantText = d.variant
        } else if (typeof d.variation === 'string') {
          variantText = d.variation
        } else if (d.variation && typeof d.variation === 'object') {
          variantText = d.variation.type || d.variation.code || d.variation.title || ''
        }

        return {
          id: d.id || String(Math.random()),
          order_id: d.order_id || orderId,
          product_id: d.product_id || pDetails?.id,
          product_name: name,
          product_thumbnail: thumbnail,
          product_details: pDetails,
          qty: isNaN(qty) ? 1 : qty,
          price: isNaN(price) ? 0 : price,
          tax: isNaN(tax) ? 0 : tax,
          discount: isNaN(discount) ? 0 : discount,
          variant: variantText,
          variation: d.variation,
          delivery_status: d.delivery_status || orderObj?.order_status || 'pending',
          payment_status: d.payment_status || orderObj?.payment_status || 'unpaid'
        }
      }).filter((item): item is AdminOrderItemDetail => item !== null)

      const parsedCustomer = orderObj?.customer || (orderObj?.customer_id ? { id: orderObj.customer_id, name: orderObj.customer_name, phone: orderObj.customer_phone, email: orderObj.customer_email } : null)
      const shippingAddr = parseAddressData(orderObj?.shipping_address_data || orderObj?.shipping_address)

      const normalizedOrder: AdminOrderItem = {
        ...orderObj,
        id: orderObj?.id || orderId,
        order_amount: Number(orderObj?.order_amount !== undefined ? orderObj?.order_amount : orderObj?.total_amount || 0),
        shipping_cost: Number(orderObj?.shipping_cost || 0),
        discount_amount: Number(orderObj?.discount_amount || orderObj?.discount || 0),
        order_status: String(orderObj?.order_status || 'pending').toLowerCase(),
        payment_status: String(orderObj?.payment_status || 'unpaid').toLowerCase(),
        customer: parsedCustomer,
        customer_name: formatCustomerFullName(parsedCustomer, orderObj?.customer_name),
        customer_phone: parsedCustomer?.phone || orderObj?.customer_phone || '',
        customer_email: parsedCustomer?.email || orderObj?.customer_email || '',
        shipping_address_data: shippingAddr,
        details: mappedDetails,
        created_at: orderObj?.created_at || new Date().toISOString()
      }

      return {
        success: true,
        order: normalizedOrder,
        details: mappedDetails,
        customer: parsedCustomer,
        shipping_address: shippingAddr
      }
    } catch (error: any) {
      console.error('Error fetching order details:', error)
      return {
        success: false,
        order: null,
        details: [],
        message: error.message || 'فشل في جلب تفاصيل الطلب'
      }
    }
  },

  /**
   * Update Order Status
   * POST /api/v1/admin/orders/update-status
   * Body: { order_id: 123, order_status: 'processing' }
   */
  async updateOrderStatus(
    token: string,
    payload: { order_id: string | number; order_status: string }
  ): Promise<ApiResponse> {
    const url = `${API_BASE_URL}/admin/orders/update-status`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: buildHeaders(token, true),
        body: JSON.stringify({
          order_id: payload.order_id,
          order_status: payload.order_status
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        return {
          success: false,
          message: data.message || `فشل تحديث حالة الطلب (${response.status})`,
          errors: data.errors
        }
      }

      return {
        success: true,
        message: data.message || 'تم تحديث حالة الطلب بنجاح',
        data
      }
    } catch (error: any) {
      console.error('Error updating order status:', error)
      return {
        success: false,
        message: error.message || 'فشل الاتصال بالخادم لتحديث حالة الطلب'
      }
    }
  },

  /**
   * Update Payment Status
   * POST /api/v1/admin/orders/update-payment-status
   * Body: { order_id: 123, payment_status: 'paid' }
   */
  async updatePaymentStatus(
    token: string,
    payload: { order_id: string | number; payment_status: string }
  ): Promise<ApiResponse> {
    const url = `${API_BASE_URL}/admin/orders/update-payment-status`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: buildHeaders(token, true),
        body: JSON.stringify({
          order_id: payload.order_id,
          payment_status: payload.payment_status
        })
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        return {
          success: false,
          message: data.message || `فشل تحديث حالة الدفع (${response.status})`,
          errors: data.errors
        }
      }

      return {
        success: true,
        message: data.message || 'تم تحديث حالة الدفع بنجاح',
        data
      }
    } catch (error: any) {
      console.error('Error updating payment status:', error)
      return {
        success: false,
        message: error.message || 'فشل الاتصال بالخادم لتحديث حالة الدفع'
      }
    }
  }
}
