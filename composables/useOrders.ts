/**
 * Production-ready Composable for Order Management, Placement, Refunds & Tracking
 * Bound to official Order APIs:
 * - GET    /api/v1/customer/order/list
 * - GET    /api/v1/customer/order/details
 * - POST   /api/v1/customer/order/place
 * - POST   /api/v1/customer/order/again
 * - POST   /api/v1/customer/order/refund-store
 * - GET    /api/v1/customer/order/refund-details
 * - GET    /api/v1/order/track
 * - GET    /api/v1/order/cancel-order
 */
import { ref, computed } from 'vue'
import { 
  orderApiService, 
  type PlaceOrderPayload, 
  type OrderItem 
} from '~/services/orderApiService'
import { useToast } from '~/composables/useToast'

export interface RefundPayload {
  order_details_id: number | string;
  amount: number;
  refund_reason: string;
}

const ordersList = ref<OrderItem[]>([])
const activeOrderDetails = ref<any>(null)
const ordersPending = ref<boolean>(false)
const orderError = ref<string | null>(null)

export const useOrders = () => {
  const toast = useToast()

  /**
   * 1. GET Orders List (GET /api/v1/customer/order/list)
   */
  const fetchOrdersList = async () => {
    ordersPending.value = true
    orderError.value = null
    try {
      const res = await orderApiService.fetchCustomerOrders()
      if (res.orders) {
        ordersList.value = res.orders
      } else {
        ordersList.value = []
        if (res.error) orderError.value = res.error
      }
      return ordersList.value
    } catch (err: any) {
      console.error('[useOrders] fetchOrdersList Error:', err)
      orderError.value = err?.message || 'تعذر جلب قائمة الطلبات.'
      return []
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 2. GET Order Details (GET /api/v1/customer/order/details?order_id={id})
   */
  const fetchOrderDetails = async (orderId: number | string) => {
    ordersPending.value = true
    orderError.value = null
    try {
      const res = await orderApiService.fetchOrderDetails(orderId)
      activeOrderDetails.value = res
      return res
    } catch (err: any) {
      console.error('[useOrders] fetchOrderDetails Error:', err)
      orderError.value = err?.message || 'تعذر جلب تفاصيل الطلب.'
      return null
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 3. Place Order (POST /api/v1/customer/order/place)
   */
  const placeOrder = async (payload: PlaceOrderPayload) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.placeOrder(payload)
      if (res.success) {
        toast.success('تم إرسال وانشاء طلبك بنجاح!', res.message)
        await fetchOrdersList()
      } else {
        toast.error('فشل إنشاء الطلب', res.message)
      }
      return res
    } catch (err: any) {
      console.error('[useOrders] placeOrder Error:', err)
      toast.error('خطأ غير متوقع', 'تعذر إتمام الطلب حالياً.')
      return { success: false, message: 'تعذر إتمام الطلب حالياً.' }
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 4. Re-order Products (POST /api/v1/customer/order/again)
   */
  const reorderProducts = async (orderId: number | string) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.orderAgain(orderId)
      if (res.success) {
        toast.success('تم تكرار الطلب بنجاح', res.message)
      } else {
        toast.error('فشل تكرار الطلب', res.message)
      }
      return res
    } catch (err: any) {
      console.error('[useOrders] reorderProducts Error:', err)
      toast.error('خطأ في تكرار الطلب')
      return { success: false, message: 'فشل تكرار الطلب.' }
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 5. Request Refund (POST /api/v1/customer/order/refund-store) with "Already applied" Toast handling
   */
  const requestRefund = async (refundData: RefundPayload) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.requestRefund(refundData)
      if (res.success) {
        toast.success('تم تقديم طلب الاسترجاع بنجاح!', res.message || 'تم تسليم طلب الاسترجاع لفريق الخدمة.')
      } else if (res.alreadyApplied) {
        toast.info('طلب استرجاع سابق', res.message)
      } else {
        toast.error('ملاحظة في طلب الاسترجاع', res.message)
      }
      return res
    } catch (err: any) {
      console.error('[useOrders] requestRefund Error:', err)
      toast.error('خطأ في إرسال طلب الاسترجاع')
      return { success: false, message: 'فشل طلب الاسترجاع.' }
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 6. Fetch Refund Details (GET /api/v1/customer/order/refund-details)
   */
  const fetchRefundDetails = async (refundId: number | string) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.getRefundDetails(refundId)
      return res
    } catch (err: any) {
      console.error('[useOrders] fetchRefundDetails Error:', err)
      return null
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 7. Track Order (GET /api/v1/order/track?order_id={id})
   */
  const trackOrder = async (orderId: number | string, phone?: string) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.trackOrder(orderId, phone)
      return res
    } catch (err: any) {
      console.error('[useOrders] trackOrder Error:', err)
      return { error: 'تعذر تتبع الطلب حالياً.' }
    } finally {
      ordersPending.value = false
    }
  }

  /**
   * 8. Cancel Order (GET /api/v1/order/cancel-order) with HTTP 403 & "Status not changeable now" parsing
   */
  const cancelOrder = async (orderId: number | string) => {
    ordersPending.value = true
    try {
      const res = await orderApiService.cancelOrder(orderId)
      if (res.success) {
        toast.success('تم إلغاء الطلب بنجاح', res.message)
        await fetchOrdersList()
      } else if (res.notChangeable) {
        toast.info('تنبيه إلغاء الطلب', res.message || 'عذراً، لا يمكن إلغاء هذا الطلب في الوقت الحالي لأن حالته لا تسمح بذلك')
      } else {
        toast.error('فشل إلغاء الطلب', res.message || 'عذراً، لا يمكن إلغاء هذا الطلب في الوقت الحالي لأن حالته لا تسمح بذلك')
      }
      return res
    } catch (err: any) {
      console.error('[useOrders] cancelOrder Error:', err)
      toast.error('إلغاء الطلب', 'عذراً، لا يمكن إلغاء هذا الطلب في الوقت الحالي لأن حالته لا تسمح بذلك')
      return { success: false, message: 'فشل إلغاء الطلب.' }
    } finally {
      ordersPending.value = false
    }
  }

  return {
    orders: ordersList,
    activeOrderDetails,
    ordersPending,
    orderError,
    fetchOrdersList,
    fetchOrderDetails,
    placeOrder,
    reorderProducts,
    requestRefund,
    fetchRefundDetails,
    trackOrder,
    cancelOrder
  }
}
