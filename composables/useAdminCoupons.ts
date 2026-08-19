/**
 * Composable for Admin Coupons Management
 */

import { ref } from 'vue'
import { 
  adminCouponsApiService, 
  type AdminCouponItem, 
  type AdminCouponPayload,
  type AdminCouponsListFilters 
} from '~/services/adminCouponsApiService'
import { useToast } from '~/composables/useToast'

export const useAdminCoupons = () => {
  const adminCookie = useCookie<string | null>('admin_token')
  const toast = useToast()

  // State
  const coupons = ref<AdminCouponItem[]>([])
  const currentCoupon = ref<AdminCouponItem | null>(null)

  const isLoading = ref(false)
  const isLoadingDetails = ref(false)
  const isSubmitting = ref(false)
  const isUpdatingStatus = ref(false)
  const isDeleting = ref(false)
  const errorMessage = ref<string | null>(null)
  const validationErrors = ref<Record<string, string[]>>({})

  // Pagination & Filters
  const totalCoupons = ref(0)
  const lastPage = ref(1)
  const currentPage = ref(1)
  const perPage = ref(10)
  const searchQuery = ref('')
  const statusFilter = ref<string | number>('')
  const typeFilter = ref<string>('all')

  const getToken = (): string => {
    if (adminCookie.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  /**
   * Fetch Coupons List
   */
  const fetchCoupons = async (page: number = currentPage.value) => {
    isLoading.value = true
    errorMessage.value = null
    currentPage.value = page

    const token = getToken()
    const filters: AdminCouponsListFilters = {
      limit: perPage.value,
      offset: page,
      search: searchQuery.value,
      status: statusFilter.value,
      coupon_type: typeFilter.value
    }

    try {
      console.log('Fetching coupons with filters:', filters)
      const res = await adminCouponsApiService.fetchCoupons(token, filters)
      console.log('Coupons list response:', res)

      if (res && res.success) {
        coupons.value = (res as any).coupons || (res as any).data || []
        totalCoupons.value = (res as any).total_size || (res as any).total || coupons.value.length || 0
        lastPage.value = (res as any).last_page || Math.max(1, Math.ceil(totalCoupons.value / (perPage.value || 10)))
        console.log('Assigned coupons.value:', coupons.value)
      } else {
        errorMessage.value = res?.message || 'فشل في جلب قائمة الكوبونات'
        coupons.value = []
        totalCoupons.value = 0
        lastPage.value = 1
      }
    } catch (err: any) {
      console.error('Error in useAdminCoupons fetchCoupons:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل الكوبونات'
      coupons.value = []
      totalCoupons.value = 0
      lastPage.value = 1
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch Single Coupon Details
   */
  const fetchCouponDetails = async (couponId: string | number) => {
    isLoadingDetails.value = true
    errorMessage.value = null
    currentCoupon.value = null

    const token = getToken()

    try {
      console.log('Fetching coupon details for ID:', couponId)
      const res = await adminCouponsApiService.fetchCouponDetails(token, couponId)
      console.log('Coupon details response:', res)

      if (res && res.success && res.coupon) {
        currentCoupon.value = res.coupon
        return res.coupon
      } else {
        errorMessage.value = res?.message || 'تعذر العثور على بيانات الكوبون'
        return null
      }
    } catch (err: any) {
      console.error('Error in useAdminCoupons fetchCouponDetails:', err)
      errorMessage.value = err.message || 'حدث خطأ أثناء تحميل تفاصيل الكوبون'
      return null
    } finally {
      isLoadingDetails.value = false
    }
  }

  /**
   * Create or Update Coupon
   */
  const saveCoupon = async (
    payload: AdminCouponPayload,
    couponId?: string | number
  ): Promise<boolean> => {
    isSubmitting.value = true
    validationErrors.value = {}
    const token = getToken()

    try {
      let res: { success: boolean; message: string; errors?: Record<string, string[]>; data?: any }

      if (couponId) {
        res = await adminCouponsApiService.updateCoupon(token, couponId, payload)
      } else {
        res = await adminCouponsApiService.createCoupon(token, payload)
      }

      if (res.success) {
        toast.showToast({
          type: 'success',
          title: 'تم بنجاح',
          message: res.message || (couponId ? 'تم تعديل الكوبون بنجاح!' : 'تمت إضافة الكوبون بنجاح!')
        })
        return true
      } else {
        if (res.errors) {
          validationErrors.value = res.errors
        }
        toast.showToast({
          type: 'error',
          title: 'فشل العملية',
          message: res.message || 'يرجى مراجعة الحقول والبيانات المدخلة'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ أثناء إرسال البيانات'
      })
      return false
    } finally {
      isSubmitting.value = false
    }
  }

  /**
   * Toggle Coupon Active Status
   */
  const toggleCouponStatus = async (coupon: AdminCouponItem): Promise<boolean> => {
    const newStatus = coupon.status ? 0 : 1
    isUpdatingStatus.value = true
    const token = getToken()

    try {
      const res = await adminCouponsApiService.toggleCouponStatus(token, coupon.id, newStatus)

      if (res.success) {
        coupon.status = newStatus
        if (currentCoupon.value && String(currentCoupon.value.id) === String(coupon.id)) {
          currentCoupon.value.status = newStatus
        }
        toast.showToast({
          type: 'success',
          title: 'تم التحديث',
          message: newStatus ? 'تم تفعيل الكوبون بنجاح!' : 'تم تعطيل الكوبون بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'خطأ',
          message: res.message || 'فشل في تغيير حالة الكوبون'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ في الاتصال بالخادم'
      })
      return false
    } finally {
      isUpdatingStatus.value = false
    }
  }

  /**
   * Delete Coupon
   */
  const deleteCoupon = async (couponId: string | number): Promise<boolean> => {
    isDeleting.value = true
    const token = getToken()

    try {
      const res = await adminCouponsApiService.deleteCoupon(token, couponId)

      if (res.success) {
        coupons.value = coupons.value.filter(c => String(c.id) !== String(couponId))
        totalCoupons.value = Math.max(0, totalCoupons.value - 1)
        toast.showToast({
          type: 'success',
          title: 'تم الحذف',
          message: res.message || 'تم حذف الكوبون بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'خطأ',
          message: res.message || 'فشل في حذف الكوبون'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ أثناء محاولة الحذف'
      })
      return false
    } finally {
      isDeleting.value = false
    }
  }

  /**
   * Generate Random Promo Code
   */
  const generateRandomCode = (prefix: string = 'ASWAR'): string => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let rand = ''
    for (let i = 0; i < 5; i++) {
      rand += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `${prefix}-${rand}`
  }

  const isExpired = (couponOrDate?: AdminCouponItem | string): boolean => {
    if (!couponOrDate) return false
    if (typeof couponOrDate === 'object') {
      if (couponOrDate.is_expired !== undefined) {
        return Boolean(couponOrDate.is_expired)
      }
      return isExpired(couponOrDate.expire_date)
    }
    try {
      const exp = new Date(couponOrDate).getTime()
      if (isNaN(exp)) return false
      // End of day
      return exp + 86400000 < Date.now()
    } catch {
      return false
    }
  }

  const isCouponEffectivelyActive = (coupon: AdminCouponItem): boolean => {
    const isActive = coupon.status === 1 || coupon.status === true
    const expired = isExpired(coupon)
    return isActive && !expired
  }

  const changePage = (page: number) => {
    if (page >= 1 && page <= lastPage.value && page !== currentPage.value) {
      fetchCoupons(page)
    }
  }

  return {
    coupons,
    currentCoupon,
    isLoading,
    isLoadingDetails,
    isSubmitting,
    isUpdatingStatus,
    isDeleting,
    errorMessage,
    validationErrors,
    totalCoupons,
    lastPage,
    currentPage,
    perPage,
    searchQuery,
    statusFilter,
    typeFilter,
    fetchCoupons,
    fetchCouponDetails,
    saveCoupon,
    toggleCouponStatus,
    deleteCoupon,
    generateRandomCode,
    isExpired,
    isCouponEffectivelyActive,
    changePage
  }
}
