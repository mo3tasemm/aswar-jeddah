/**
 * Admin Analytics & Reports API Service Layer
 * Endpoint:
 * GET /api/v1/admin/analytics/dashboard?period={today|this_week|this_month|this_year}
 */

const API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || 'https://ai-agunt.elbakry2.com/api/v1'

export type AnalyticsPeriod = 'today' | 'this_week' | 'this_month' | 'this_year'

export interface AnalyticsSummary {
  total_sales: number;
  total_sales_growth: number;
  total_orders: number;
  total_orders_growth: number;
  pending_orders: number;
  pending_orders_growth: number;
  total_customers: number;
  total_customers_growth: number;
  out_of_stock_products: number;
  average_order_value: number;
  average_order_value_growth: number;
  currency: string;
  currency_symbol: string;
}

export interface AnalyticsSalesChart {
  labels: string[];
  sales: number[];
  orders: number[];
}

export interface AnalyticsOrderStatusCounts {
  pending: number;
  processing: number;
  delivered: number;
  canceled: number;
  [key: string]: number;
}

export interface AnalyticsRecentOrder {
  id: string | number;
  order_key: string;
  customer: {
    id?: string | number;
    name: string;
    image?: string;
    email?: string;
    phone?: string;
  };
  order_amount: number;
  order_status: string;
  payment_status?: string;
  created_at: string;
  created_at_human: string;
}

export interface AnalyticsTopSellingProduct {
  id: string | number;
  name: string;
  thumbnail: string;
  unit_price: number;
  sold_quantity: number;
  total_revenue: number;
}

export interface AdminAnalyticsDashboardData {
  summary: AnalyticsSummary;
  sales_chart: AnalyticsSalesChart;
  order_status_counts: AnalyticsOrderStatusCounts;
  recent_orders: AnalyticsRecentOrder[];
  top_selling_products: AnalyticsTopSellingProduct[];
}

export interface AdminAnalyticsDashboardResponse {
  success: boolean;
  data: AdminAnalyticsDashboardData;
  message?: string;
}

const buildHeaders = (token: string): HeadersInit => {
  const headers: HeadersInit = {
    Accept: 'application/json',
    'X-Client-Type': 'admin',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    Pragma: 'no-cache',
    Expires: '0',
    zoneId: '1'
  }
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

export function normalizeAnalyticsImageUrl(pathOrObj: any, fallback = ''): string {
  if (!pathOrObj) return fallback
  if (typeof pathOrObj === 'object') {
    const raw = pathOrObj.path || pathOrObj.url || pathOrObj.image_full_url?.path || ''
    if (raw) return normalizeAnalyticsImageUrl(raw, fallback)
  }
  const str = String(pathOrObj).trim()
  if (!str) return fallback
  if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('data:') || str.startsWith('blob:')) {
    return str
  }
  const cleanBase = API_BASE_URL.replace('/api/v1', '')
  const cleanPath = str.replace(/^\/+/, '')
  return `${cleanBase}/storage/app/public/${cleanPath}`
}

export const adminAnalyticsApiService = {
  /**
   * Fetch Dashboard Analytics Data
   * GET /api/v1/admin/analytics/dashboard?period=...
   */
  async fetchDashboardAnalytics(token: string, period: AnalyticsPeriod = 'this_month'): Promise<AdminAnalyticsDashboardResponse> {
    const candidateUrls = [
      `${API_BASE_URL}/admin/analytics/dashboard?period=${period}&_t=${Date.now()}`,
      `${API_BASE_URL}/admin/analytics?period=${period}&_t=${Date.now()}`,
      `${API_BASE_URL}/admin/dashboard?period=${period}&_t=${Date.now()}`
    ]

    for (const url of candidateUrls) {
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: buildHeaders(token),
          cache: 'no-store'
        })

        if (!response.ok) continue

        const raw = await response.json()
        console.log('[adminAnalyticsApiService] Dashboard raw response:', raw)

        const payload = raw?.data || raw
        if (payload && typeof payload === 'object') {
          return {
            success: true,
            data: this.mapDashboardData(payload)
          }
        }
      } catch (err) {
        console.warn(`[adminAnalyticsApiService] Error fetching from ${url}:`, err)
      }
    }

    return {
      success: false,
      data: this.getEmptyDashboardData(),
      message: 'تعذر جلب إحصائيات لوحة التحكم من السيرفر.'
    }
  },

  /**
   * Safely map raw response data to normalized AdminAnalyticsDashboardData
   */
  mapDashboardData(raw: any): AdminAnalyticsDashboardData {
    const summaryRaw = raw.summary || raw.kpi || raw.statistics || {}
    const chartRaw = raw.sales_chart || raw.chart || raw.chart_data || {}
    const statusCountsRaw = raw.order_status_counts || raw.order_statuses || raw.orders_count_by_status || {}
    const recentOrdersRaw = Array.isArray(raw.recent_orders) ? raw.recent_orders : (Array.isArray(raw.orders) ? raw.orders : [])
    const topProductsRaw = Array.isArray(raw.top_selling_products) ? raw.top_selling_products : (Array.isArray(raw.top_products) ? raw.top_products : [])

    // Summary Mapping
    const totalSales = Number(summaryRaw.total_sales ?? summaryRaw.sales ?? summaryRaw.revenue ?? 0)
    const totalSalesGrowth = Number(summaryRaw.total_sales_growth ?? summaryRaw.sales_growth ?? summaryRaw.revenue_growth ?? 0)
    const totalOrders = Number(summaryRaw.total_orders ?? summaryRaw.orders ?? summaryRaw.orders_count ?? 0)
    const totalOrdersGrowth = Number(summaryRaw.total_orders_growth ?? summaryRaw.orders_growth ?? 0)
    const totalCustomers = Number(summaryRaw.total_customers ?? summaryRaw.customers ?? summaryRaw.users_count ?? 0)
    const totalCustomersGrowth = Number(summaryRaw.total_customers_growth ?? summaryRaw.customers_growth ?? 0)
    const pendingOrders = Number(summaryRaw.pending_orders ?? statusCountsRaw.pending ?? statusCountsRaw.Pending ?? 0)
    const pendingOrdersGrowth = Number(summaryRaw.pending_orders_growth ?? summaryRaw.total_orders_growth ?? 0)
    const outOfStockProducts = Number(summaryRaw.out_of_stock_products ?? summaryRaw.out_of_stock ?? summaryRaw.stock_out_products ?? 0)
    const avgOrderValue = Number(summaryRaw.average_order_value ?? summaryRaw.avg_order_value ?? (totalOrders > 0 ? (totalSales / totalOrders) : 0))
    const avgOrderValueGrowth = Number(summaryRaw.average_order_value_growth ?? summaryRaw.avg_order_value_growth ?? 0)
    const currency = summaryRaw.currency || 'SAR'
    const currencySymbol = summaryRaw.currency_symbol || summaryRaw.currency || 'ر.س'

    // Chart Mapping
    const chartLabels: string[] = Array.isArray(chartRaw.labels) ? chartRaw.labels : (Array.isArray(chartRaw.categories) ? chartRaw.categories : [])
    const chartSales: number[] = Array.isArray(chartRaw.sales) ? chartRaw.sales.map(Number) : (Array.isArray(chartRaw.data) ? chartRaw.data.map(Number) : (Array.isArray(chartRaw.series) ? chartRaw.series.map(Number) : []))
    const chartOrders: number[] = Array.isArray(chartRaw.orders) ? chartRaw.orders.map(Number) : []

    // Order Status Counts Mapping
    const pendingCount = Number(statusCountsRaw.pending ?? statusCountsRaw.Pending ?? pendingOrders)
    const processingCount = Number(statusCountsRaw.processing ?? statusCountsRaw.Processing ?? statusCountsRaw.confirmed ?? 0)
    const deliveredCount = Number(statusCountsRaw.delivered ?? statusCountsRaw.Delivered ?? statusCountsRaw.completed ?? 0)
    const canceledCount = Number(statusCountsRaw.canceled ?? statusCountsRaw.cancelled ?? statusCountsRaw.Canceled ?? statusCountsRaw.Cancelled ?? 0)

    // Recent Orders Mapping
    const recentOrders: AnalyticsRecentOrder[] = recentOrdersRaw.map((item: any) => {
      const orderKey = String(item.order_key || item.id || item.order_id || '')
      const custObj = item.customer || item.user || {}
      const custName = typeof custObj === 'object'
        ? (custObj.name || `${custObj.f_name || ''} ${custObj.l_name || ''}`.trim() || 'عميل نقدي')
        : (typeof item.customer_name === 'string' ? item.customer_name : 'عميل نقدي')
      const custImage = normalizeAnalyticsImageUrl(custObj.image || item.customer_image, '')
      const orderAmount = Number(item.order_amount ?? item.total ?? item.order_total ?? 0)
      const orderStatus = String(item.order_status || item.status || 'pending').toLowerCase()
      const createdAt = String(item.created_at || '')
      const createdAtHuman = String(item.created_at_human || item.created_at_formatted || item.created_at || '')

      return {
        id: item.id || orderKey,
        order_key: orderKey.startsWith('#') ? orderKey : `#${orderKey}`,
        customer: {
          id: custObj.id,
          name: custName,
          image: custImage,
          email: custObj.email,
          phone: custObj.phone
        },
        order_amount: orderAmount,
        order_status: orderStatus,
        payment_status: item.payment_status,
        created_at: createdAt,
        created_at_human: createdAtHuman
      }
    })

    // Top Selling Products Mapping
    const topProducts: AnalyticsTopSellingProduct[] = topProductsRaw.map((p: any) => {
      const id = p.id || p.product_id
      const name = p.name || p.product_name || 'منتج غير محدد'
      const thumb = normalizeAnalyticsImageUrl(p.thumbnail || p.image || p.cover_image, '')
      const unitPrice = Number(p.unit_price ?? p.price ?? 0)
      const soldQuantity = Number(p.sold_quantity ?? p.quantity ?? p.qty ?? p.sales_count ?? 0)
      const totalRevenue = Number(p.total_revenue ?? p.revenue ?? (unitPrice * soldQuantity))

      return {
        id,
        name,
        thumbnail: thumb,
        unit_price: unitPrice,
        sold_quantity: soldQuantity,
        total_revenue: totalRevenue
      }
    })

    return {
      summary: {
        total_sales: totalSales,
        total_sales_growth: isNaN(totalSalesGrowth) ? 0 : totalSalesGrowth,
        total_orders: totalOrders,
        total_orders_growth: isNaN(totalOrdersGrowth) ? 0 : totalOrdersGrowth,
        pending_orders: pendingOrders,
        pending_orders_growth: isNaN(pendingOrdersGrowth) ? 0 : pendingOrdersGrowth,
        total_customers: totalCustomers,
        total_customers_growth: isNaN(totalCustomersGrowth) ? 0 : totalCustomersGrowth,
        out_of_stock_products: outOfStockProducts,
        average_order_value: isNaN(avgOrderValue) ? 0 : avgOrderValue,
        average_order_value_growth: isNaN(avgOrderValueGrowth) ? 0 : avgOrderValueGrowth,
        currency,
        currency_symbol: currencySymbol
      },
      sales_chart: {
        labels: chartLabels,
        sales: chartSales,
        orders: chartOrders
      },
      order_status_counts: {
        pending: pendingCount,
        processing: processingCount,
        delivered: deliveredCount,
        canceled: canceledCount
      },
      recent_orders: recentOrders,
      top_selling_products: topProducts
    }
  },

  getEmptyDashboardData(): AdminAnalyticsDashboardData {
    return {
      summary: {
        total_sales: 0,
        total_sales_growth: 0,
        total_orders: 0,
        total_orders_growth: 0,
        pending_orders: 0,
        pending_orders_growth: 0,
        total_customers: 0,
        total_customers_growth: 0,
        out_of_stock_products: 0,
        average_order_value: 0,
        average_order_value_growth: 0,
        currency: 'SAR',
        currency_symbol: 'ر.س'
      },
      sales_chart: {
        labels: [],
        sales: [],
        orders: []
      },
      order_status_counts: {
        pending: 0,
        processing: 0,
        delivered: 0,
        canceled: 0
      },
      recent_orders: [],
      top_selling_products: []
    }
  }
}

