/**
 * Composable for Admin Customers Management
 */

import { ref } from 'vue'
import { 
  adminCustomersApiService, 
  type AdminCustomerItem, 
  type AdminCustomerOrder, 
  type AdminCustomerAddress,
  type AdminCustomerStats,
  type AdminCustomersListFilters 
} from '~/services/adminCustomersApiService'
import { useToast } from '~/composables/useToast'

export const useAdminCustomers = () => {
  const adminCookie = useCookie<string | null>('admin_token')
  const toast = useToast()

  // State
  const customers = ref<AdminCustomerItem[]>([])
  const currentCustomer = ref<AdminCustomerItem | null>(null)
  const currentCustomerOrders = ref<AdminCustomerOrder[]>([])
  const currentCustomerAddresses = ref<AdminCustomerAddress[]>([])
  const currentCustomerStats = ref<AdminCustomerStats>({
    total_orders: 0,
    completed_orders: 0,
    processing_orders: 0,
    total_spent: 0
  })

  const isLoading = ref(false)
  const isLoadingDetails = ref(false)
  const isUpdatingStatus = ref(false)
  const errorMessage = ref<string | null>(null)

  // Pagination & Search
  const totalCustomers = ref(0)
  const lastPage = ref(1)
  const currentPage = ref(1)
  const perPage = ref(10)
  const searchQuery = ref('')
  const statusFilter = ref<string | number>('')

  const getToken = (): string => {
    if (adminCookie.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  /**
   * Fetch Customers List
   */
  const fetchCustomers = async (page: number = currentPage.value) => {
    isLoading.value = true
    errorMessage.value = null
    currentPage.value = page

    const token = getToken()
    const filters: AdminCustomersListFilters = {
      limit: perPage.value,
      offset: page,
      search: searchQuery.value,
      is_active: statusFilter.value
    }

    try {
      console.log('Fetching customers with filters:', filters)
      const res = await adminCustomersApiService.fetchCustomersList(token, filters)
      console.log('Customers list response:', res)

      if (res && res.success) {
        customers.value = (res as any).customers || (res as any).data || []
        totalCustomers.value = (res as any).total_size || (res as any).total || customers.value.length || 0
        lastPage.value = (res as any).last_page || Math.max(1, Math.ceil(totalCustomers.value / (perPage.value || 10)))
        console.log('Assigned customers.value:', customers.value)
      } else {
        errorMessage.value = res?.message || 'فشل في جلب قائمة العملاء'
        customers.value = []
        totalCustomers.value = 0
        lastPage.value = 1
      }
    } catch (err: any) {
      console.error('Error in useAdminCustomers fetchCustomers:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل بيانات العملاء'
      customers.value = []
      totalCustomers.value = 0
      lastPage.value = 1
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch Single Customer Details
   */
  const fetchCustomerDetails = async (customerId: string | number) => {
    isLoadingDetails.value = true
    errorMessage.value = null
    currentCustomer.value = null
    currentCustomerOrders.value = []
    currentCustomerAddresses.value = []
    currentCustomerStats.value = { total_orders: 0, completed_orders: 0, processing_orders: 0, total_spent: 0 }

    const token = getToken()

    try {
      console.log('Fetching customer details for ID:', customerId)
      const res = await adminCustomersApiService.fetchCustomerDetails(token, customerId)
      console.log('Customer details response:', res)

      if (res && res.success && res.customer) {
        currentCustomer.value = res.customer
        currentCustomerOrders.value = res.orders || []
        currentCustomerAddresses.value = res.addresses || []
        currentCustomerStats.value = res.stats || {
          total_orders: currentCustomerOrders.value.length,
          completed_orders: 0,
          processing_orders: 0,
          total_spent: currentCustomer.value.total_spent
        }
        return res.customer
      } else {
        errorMessage.value = res?.message || 'تعذر العثور على بيانات العميل'
        return null
      }
    } catch (err: any) {
      console.error('Error in useAdminCustomers fetchCustomerDetails:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل تفاصيل العميل'
      return null
    } finally {
      isLoadingDetails.value = false
    }
  }

  /**
   * Toggle Customer Active / Block Status
   */
  const toggleCustomerStatus = async (customer: AdminCustomerItem) => {
    const newStatus = customer.is_active ? 0 : 1
    isUpdatingStatus.value = true

    const token = getToken()

    try {
      const res = await adminCustomersApiService.updateCustomerStatus(token, {
        id: customer.id,
        is_active: newStatus
      })

      if (res.success) {
        customer.is_active = newStatus
        if (currentCustomer.value && String(currentCustomer.value.id) === String(customer.id)) {
          currentCustomer.value.is_active = newStatus
        }
        toast.showToast({
          type: 'success',
          title: 'تم التحديث',
          message: newStatus ? 'تم تفعيل حساب العميل بنجاح!' : 'تم حظر حساب العميل بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'خطأ',
          message: res.message || 'فشل في تحديث حالة الحساب'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ أثناء الاتصال بالخادم'
      })
      return false
    } finally {
      isUpdatingStatus.value = false
    }
  }

  const changePage = (page: number) => {
    if (page >= 1 && page <= lastPage.value && page !== currentPage.value) {
      fetchCustomers(page)
    }
  }

  return {
    customers,
    currentCustomer,
    currentCustomerOrders,
    currentCustomerAddresses,
    currentCustomerStats,
    isLoading,
    isLoadingDetails,
    isUpdatingStatus,
    errorMessage,
    totalCustomers,
    lastPage,
    currentPage,
    perPage,
    searchQuery,
    statusFilter,
    fetchCustomers,
    fetchCustomerDetails,
    toggleCustomerStatus,
    changePage
  }
}
