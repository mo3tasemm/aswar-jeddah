/**
 * Production-ready Composable for Address Management, Instant Reactivity & Sync
 * Aligned with official API endpoints:
 * - GET    /api/v1/customer/address/get/{id}
 * - PUT    /api/v1/customer/address/update (params: { id: addressId }, body: payload)
 * - GET    /api/v1/customer/address/list
 * - POST   /api/v1/customer/address/add
 * - DELETE /api/v1/customer/address/{id}
 */
import { ref, computed, onMounted } from 'vue'
import { addressApiService, type AddressItem, type AddAddressPayload, type UpdateAddressPayload } from '~/services/addressApiService'
import { useToast } from '~/composables/useToast'

const addressList = ref<AddressItem[]>([])
const selectedAddressId = ref<number | null>(null)
const selectedBillingAddressId = ref<number | null>(null)
const addressPending = ref<boolean>(false)

export const useAddresses = () => {
  const toast = useToast()

  const loadAddresses = async () => {
    addressPending.value = true
    try {
      const res = await addressApiService.fetchAddresses()
      if (res.addresses && res.addresses.length > 0) {
        addressList.value = res.addresses
        if (!selectedAddressId.value) {
          selectedAddressId.value = res.addresses[0].id
        }
      } else {
        addressList.value = []
      }
    } catch (e) {
      console.warn('[useAddresses] Load error:', e)
    } finally {
      addressPending.value = false
    }
  }

  onMounted(() => {
    if (addressList.value.length === 0) {
      loadAddresses()
    }
  })

  /**
   * GET Address Details (GET /api/v1/customer/address/get/{id})
   */
  const getAddressDetails = async (addressId: number | string): Promise<AddressItem | null> => {
    addressPending.value = true
    try {
      const res = await addressApiService.getAddressDetails(addressId)
      if (res.address) {
        return res.address
      }
      return null
    } catch (e) {
      console.warn('[useAddresses] getAddressDetails error:', e)
      return null
    } finally {
      addressPending.value = false
    }
  }

  /**
   * Add Address (POST /api/v1/customer/address/add)
   */
  const addAddress = async (payload: AddAddressPayload): Promise<boolean> => {
    addressPending.value = true
    try {
      const res = await addressApiService.addAddress(payload)
      if (res.success) {
        toast.success('تمت إضافة العنوان بنجاح', payload.address)
        await loadAddresses()
        if (res.addressId) {
          selectedAddressId.value = Number(res.addressId)
        }
        return true
      } else {
        toast.error('خطأ في إضافة العنوان', res.message)
        return false
      }
    } catch (e: any) {
      toast.error('فشل حفظ العنوان', e?.message || 'يرجى التأكد من البيانات.')
      return false
    } finally {
      addressPending.value = false
    }
  }

  /**
   * Update Address (PUT /api/v1/customer/address/update with params: { id: addressId } and body)
   */
  const updateAddress = async (payload: UpdateAddressPayload): Promise<boolean> => {
    addressPending.value = true
    try {
      // 1. Instant Local State Update (Zero Lag UI)
      const index = addressList.value.findIndex(a => String(a.id) === String(payload.address_id))
      if (index !== -1) {
        addressList.value[index] = {
          ...addressList.value[index],
          contact_person_name: payload.contact_person_name,
          phone: payload.phone,
          address_type: payload.address_type,
          address: payload.address,
          city: payload.city,
          country: payload.country,
          is_billing: payload.is_billing
        }
      }

      // 2. Call API PUT /api/v1/customer/address/update
      const res = await addressApiService.updateAddress(payload)
      if (res.success) {
        toast.success('تم تحديث العنوان بنجاح!')
        // 3. Auto-Refetching GET /list to guarantee 100% Data Consistency
        await loadAddresses()
        return true
      } else {
        toast.error('فشل تحديث العنوان في السيرفر', res.message)
        await loadAddresses()
        return false
      }
    } catch (e: any) {
      toast.error('فشل تحديث العنوان', e?.message || 'يرجى التأكد من البيانات.')
      await loadAddresses()
      return false
    } finally {
      addressPending.value = false
    }
  }

  /**
   * Delete Address (DELETE /api/v1/customer/address/{id})
   */
  const deleteAddress = async (addressId: number | string): Promise<boolean> => {
    addressPending.value = true
    try {
      // Optimistic local state update
      addressList.value = addressList.value.filter(a => String(a.id) !== String(addressId))
      toast.success('تم حذف العنوان بنجاح')

      const res = await addressApiService.deleteAddress(addressId)
      if (!res.success) {
        toast.error('ملاحظة في السيرفر', res.message)
      }
      await loadAddresses()
      return true
    } catch (e: any) {
      toast.error('فشل حذف العنوان', e?.message)
      return false
    } finally {
      addressPending.value = false
    }
  }

  const selectAddress = (id: number) => {
    selectedAddressId.value = id
  }

  const selectedAddress = computed(() => {
    return addressList.value.find(a => a.id === selectedAddressId.value) || addressList.value[0] || null
  })

  return {
    addresses: addressList,
    selectedAddressId,
    selectedBillingAddressId,
    selectedAddress,
    addressPending,
    loadAddresses,
    getAddressDetails,
    addAddress,
    updateAddress,
    deleteAddress,
    selectAddress
  }
}
