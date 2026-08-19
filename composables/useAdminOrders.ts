/**
 * Admin Orders Management Composable
 * Handles fetching list, filtering, pagination, details view, and status updates.
 */

import { ref, computed } from 'vue'
import { adminOrdersApiService, type AdminOrderItem, type AdminOrderItemDetail, type AdminOrdersListFilters } from '~/services/adminOrdersApiService'
import { useToast } from '~/composables/useToast'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

export const useAdminOrders = () => {
  const adminCookie = useCookie<string | null>('admin_token')
  const toast = useToast()
  const { t } = useAdminLanguage()

  // State
  const orders = ref<AdminOrderItem[]>([])
  const currentOrder = ref<AdminOrderItem | null>(null)
  const currentOrderDetails = ref<AdminOrderItemDetail[]>([])
  const isLoading = ref(false)
  const isLoadingDetails = ref(false)
  const isUpdatingStatus = ref(false)
  const isUpdatingPayment = ref(false)
  const errorMessage = ref<string | null>(null)

  // Pagination & Filters
  const totalOrders = ref(0)
  const lastPage = ref(1)
  const currentPage = ref(1)
  const perPage = ref(10)
  const orderStatusFilter = ref('all')
  const paymentStatusFilter = ref('all')
  const searchQuery = ref('')

  const getToken = (): string => {
    if (adminCookie.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  /**
   * Fetch Orders List from API
   */
  const fetchOrders = async (page: number = currentPage.value) => {
    isLoading.value = true
    errorMessage.value = null
    currentPage.value = page

    const token = getToken()
    const filters: AdminOrdersListFilters = {
      limit: perPage.value,
      offset: page,
      order_status: orderStatusFilter.value,
      payment_status: paymentStatusFilter.value,
      search: searchQuery.value
    }

    try {
      console.log('Fetching orders with filters:', filters)
      const res = await adminOrdersApiService.fetchOrdersList(token, filters)
      console.log('API Response:', res)
      if (res && res.success) {
        orders.value = (res as any).orders || (res as any).data || []
        totalOrders.value = (res as any).total_size || (res as any).total || orders.value.length || 0
        lastPage.value = (res as any).last_page || Math.max(1, Math.ceil(totalOrders.value / (perPage.value || 10)))
        console.log('Orders Variable:', orders.value)
      } else {
        errorMessage.value = res?.message || 'فشل في جلب قائمة الطلبات'
        orders.value = []
        totalOrders.value = 0
        lastPage.value = 1
      }
    } catch (err: any) {
      console.error('Error in useAdminOrders fetchOrders:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل الطلبات'
      orders.value = []
      totalOrders.value = 0
      lastPage.value = 1
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch Single Order Details
   */
  const fetchOrderDetails = async (orderId: string | number) => {
    isLoadingDetails.value = true
    errorMessage.value = null
    currentOrder.value = null
    currentOrderDetails.value = []

    const token = getToken()

    try {
      console.log('Fetching order details for ID:', orderId)
      const res = await adminOrdersApiService.fetchOrderDetails(token, orderId)
      console.log('Order details response:', res)
      if (res && (res.success || res.order)) {
        currentOrder.value = res.order || (res as any)
        currentOrderDetails.value = res.details || res.order?.details || (res as any).details || (res as any).items || (res as any).order_details || []
        console.log('Final currentOrderDetails:', currentOrderDetails.value)
        return currentOrder.value
      } else {
        errorMessage.value = res?.message || 'تعذر العثور على بيانات الطلب'
        return null
      }
    } catch (err: any) {
      console.error('Error in useAdminOrders fetchOrderDetails:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل تفاصيل الطلب'
      return null
    } finally {
      isLoadingDetails.value = false
    }
  }

  /**
   * Quick Update Order Status
   */
  const updateOrderStatus = async (orderId: string | number, newStatus: string) => {
    if (!orderId || !newStatus) return false
    isUpdatingStatus.value = true

    const token = getToken()

    try {
      const res = await adminOrdersApiService.updateOrderStatus(token, {
        order_id: orderId,
        order_status: newStatus
      })

      if (res.success) {
        toast.success(t('admin.common.success') || 'تم التحديث بنجاح', res.message || 'تم تحديث حالة الطلب بنجاح')

        // Update local state in list
        const idx = orders.value.findIndex(o => String(o.id) === String(orderId))
        if (idx !== -1) {
          orders.value[idx].order_status = newStatus
        }

        // Update current single order if open
        if (currentOrder.value && String(currentOrder.value.id) === String(orderId)) {
          currentOrder.value.order_status = newStatus
        }

        return true
      } else {
        toast.error(t('admin.common.error') || 'فشل التحديث', res.message || 'تعذر تغيير حالة الطلب')
        return false
      }
    } catch (err: any) {
      toast.error(t('admin.common.error') || 'فشل التحديث', err.message || 'حدث خطأ أثناء تحديث حالة الطلب')
      return false
    } finally {
      isUpdatingStatus.value = false
    }
  }

  /**
   * Quick Update Payment Status
   */
  const updatePaymentStatus = async (orderId: string | number, newPaymentStatus: string) => {
    if (!orderId || !newPaymentStatus) return false
    isUpdatingPayment.value = true

    const token = getToken()

    try {
      const res = await adminOrdersApiService.updatePaymentStatus(token, {
        order_id: orderId,
        payment_status: newPaymentStatus
      })

      if (res.success) {
        toast.success(t('admin.common.success') || 'تم التحديث بنجاح', res.message || 'تم تحديث حالة الدفع بنجاح')

        // Update local state in list
        const idx = orders.value.findIndex(o => String(o.id) === String(orderId))
        if (idx !== -1) {
          orders.value[idx].payment_status = newPaymentStatus
        }

        // Update current single order if open
        if (currentOrder.value && String(currentOrder.value.id) === String(orderId)) {
          currentOrder.value.payment_status = newPaymentStatus
        }

        return true
      } else {
        toast.error(t('admin.common.error') || 'فشل التحديث', res.message || 'تعذر تغيير حالة الدفع')
        return false
      }
    } catch (err: any) {
      toast.error(t('admin.common.error') || 'فشل التحديث', err.message || 'حدث خطأ أثناء تحديث حالة الدفع')
      return false
    } finally {
      isUpdatingPayment.value = false
    }
  }

  const changePage = (page: number) => {
    if (page >= 1 && page <= lastPage.value) {
      fetchOrders(page)
    }
  }

  return {
    // State
    orders,
    currentOrder,
    currentOrderDetails,
    isLoading,
    isLoadingDetails,
    isUpdatingStatus,
    isUpdatingPayment,
    errorMessage,

    // Pagination & Filter States
    totalOrders,
    currentPage,
    perPage,
    lastPage,
    orderStatusFilter,
    paymentStatusFilter,
    searchQuery,

    // Methods
    fetchOrders,
    fetchOrderDetails,
    updateOrderStatus,
    updatePaymentStatus,
    changePage
  }
}
