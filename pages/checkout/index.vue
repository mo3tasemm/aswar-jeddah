<template>
  <div class="checkout-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" :dir="layoutDirection">
    
    <!-- Header -->
    <header class="bg-white border-b border-slate-100 py-4 mb-8">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <!-- Logo -->
          <img src="~/assets/images/Logo.png" alt="أسوار" class="h-10 object-contain" />
        </NuxtLink>
        <div class="flex items-center gap-2 text-slate-500 text-sm font-bold">
          <svg class="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <span>{{ t('checkout.secure_shopping') }}</span>
        </div>
      </div>
    </header>

    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Stepper -->
      <CheckoutStepper :currentStep="currentStep" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Main Content -->
        <main class="lg:col-span-8 space-y-8">
          
          <!-- Step 2: Shipping Address -->
          <section v-if="currentStep === 2" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-black text-[#0B0E28]">{{ t('checkout.delivery_address') }}</h2>
              <button @click="isAddressModalOpen = true" class="text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>{{ t('checkout.add_address') }}</span>
              </button>
            </div>

            <!-- Loading Addresses -->
            <div v-if="addressPending" class="py-8 text-center">
              <div class="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p class="text-xs text-slate-500 font-bold">{{ t('checkout.loading_addresses') }}</p>
            </div>
            
            <!-- Empty Addresses -->
            <div v-else-if="addresses.length === 0" class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p class="text-xs text-slate-500 font-bold mb-3">{{ t('checkout.no_addresses') }}</p>
              <button @click="isAddressModalOpen = true" class="px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl shadow-md cursor-pointer">
                {{ t('checkout.add_first_address') }}
              </button>
            </div>

            <!-- Addresses List -->
            <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label v-for="address in addresses" :key="address.id" class="cursor-pointer relative">
                <input type="radio" v-model="selectedAddressId" :value="address.id" class="peer sr-only" />
                <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/20 transition-all flex flex-col gap-2 h-full text-start">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 text-[#0B0E28] font-black text-sm">
                      <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      {{ address.address_type || t('checkout.default_home') }}
                    </div>
                    <div v-if="selectedAddressId === address.id" class="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[#0B0E28] shrink-0">
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>
                  <p class="text-sm font-bold text-slate-600 mt-1">{{ address.contact_person_name }}</p>
                  <p class="text-xs text-slate-500 leading-relaxed">{{ address.city }}، {{ address.address }}</p>
                  <p class="text-xs font-bold text-[#0B0E28] mt-1" dir="ltr">{{ address.phone || address.contact_person_number }}</p>
                </div>
              </label>
            </div>
          </section>

          <!-- Step 3: Payment Methods -->
          <section v-if="currentStep === 3" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all space-y-6">
            <CheckoutPaymentMethods v-model:method="paymentMethod" />

            <!-- Order Note -->
            <div class="text-start">
              <label class="block text-xs font-bold text-slate-700 mb-1.5">{{ t('checkout.order_notes_label') }}</label>
              <textarea 
                v-model="orderNote" 
                rows="2" 
                :placeholder="t('checkout.order_notes_placeholder')" 
                class="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B0E28] resize-none"
              ></textarea>
            </div>
          </section>

        </main>

        <!-- Sidebar (Order Summary) -->
        <aside class="lg:col-span-4 relative">
          <CheckoutOrderSummary 
            :cartItems="cart" 
            @coupon-applied="onCouponApplied"
            @financials-updated="onFinancialsUpdated"
          >
            <template #action>
              <button 
                @click="nextStep"
                :disabled="isProcessing"
                class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70"
              >
                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span v-else>{{ currentStep === 2 ? t('checkout.proceed_to_payment') : t('checkout.place_order') }}</span>
              </button>
              
              <button 
                v-if="currentStep === 3" 
                @click="currentStep = 2"
                :disabled="isProcessing"
                class="w-full py-3 mt-3 rounded-xl text-sm font-bold bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {{ t('checkout.back_to_address') }}
              </button>
            </template>
          </CheckoutOrderSummary>
        </aside>

      </div>
    </div>
    
    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-20">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- Address Modal -->
    <AddressModal 
      :isOpen="isAddressModalOpen" 
      @close="isAddressModalOpen = false" 
      @saved="loadAddresses" 
    />

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import CheckoutStepper from '~/components/Checkout/CheckoutStepper.vue'
import CheckoutOrderSummary from '~/components/Checkout/OrderSummary.vue'
import CheckoutPaymentMethods from '~/components/Checkout/PaymentMethods.vue'
import AddressModal from '~/components/account/AddressModal.vue'
import { useCart } from '~/composables/useCart'
import { useAddresses } from '~/composables/useAddresses'
import { orderApiService } from '~/services/orderApiService'
import { cartApiService } from '~/services/cartApiService'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => t('checkout.title'))
})

const { cart, clearCart } = useCart()
const { addresses, selectedAddressId, addressPending, loadAddresses } = useAddresses()
const toast = useToast()

const currentStep = ref(2)
const paymentMethod = ref('offline_payment')
const orderNote = ref('')
const couponCode = ref('')
const isProcessing = ref(false)
const isAddressModalOpen = ref(false)

const checkoutFinancials = ref({
  subtotal: 0,
  discount: 0,
  shippingFee: 0,
  total: 0,
  couponCode: ''
})

onMounted(() => {
  loadAddresses()
})

const onCouponApplied = (data: { code: string; discount: number }) => {
  couponCode.value = data.code
}

const onFinancialsUpdated = (data: any) => {
  if (data) {
    checkoutFinancials.value = {
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      shippingFee: data.shippingFee || 0,
      total: data.total || 0,
      couponCode: data.couponCode || couponCode.value
    }
  }
}

const nextStep = async () => {
  if (currentStep.value === 2) {
    if (!selectedAddressId.value && addresses.value.length > 0) {
      selectedAddressId.value = addresses.value[0].id
    }

    if (!selectedAddressId.value && addresses.value.length === 0) {
      toast.error(
        layoutDirection.value === 'ltr' ? 'Missing Address' : 'عنوان التوصيل مفقود',
        layoutDirection.value === 'ltr' ? 'Please add a delivery address to complete your order.' : 'يرجى إضافة عنوان توصيل لإكمال الطلب.'
      )
      isAddressModalOpen.value = true
      return
    }

    isProcessing.value = true
    setTimeout(() => {
      isProcessing.value = false
      currentStep.value = 3
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 400)

  } else if (currentStep.value === 3) {
    if (!cart.value || cart.value.length === 0) {
      toast.error(
        layoutDirection.value === 'ltr' ? 'Cart is Empty' : 'السلة فارغة',
        layoutDirection.value === 'ltr' ? 'Please add products to your cart before checking out.' : 'يرجى إضافة منتجات إلى السلة قبل إتمام الطلب.'
      )
      return
    }

    if (!selectedAddressId.value) {
      toast.error(layoutDirection.value === 'ltr' ? 'Please select a delivery address' : 'يرجى تحديد عنوان التوصيل')
      currentStep.value = 2
      return
    }

    isProcessing.value = true
    try {
      if (cart.value && cart.value.length > 0) {
        for (const item of cart.value) {
          if (item.product && item.product.id) {
            await cartApiService.addToCart(item.product, item.quantity || 1)
          }
        }
      }

      const res = await orderApiService.placeOrder({
        address_id: selectedAddressId.value,
        payment_method: paymentMethod.value || 'offline_payment',
        order_note: orderNote.value,
        coupon_code: couponCode.value || checkoutFinancials.value.couponCode,
        coupon_discount: checkoutFinancials.value.discount,
        discount_amount: checkoutFinancials.value.discount,
        shipping_cost: checkoutFinancials.value.shippingFee,
        order_amount: checkoutFinancials.value.total
      })

      if (res.success) {
        const orderIdDisplay = res.orderId ? (String(res.orderId).startsWith('#') ? res.orderId : `#${res.orderId}`) : '#ORD-101'
        toast.success(
          layoutDirection.value === 'ltr' ? 'Order Placed Successfully!' : 'تم إرسال وإنشاء طلبك بنجاح!',
          `${layoutDirection.value === 'ltr' ? 'Order ID:' : 'رقم الطلب:'} ${orderIdDisplay}`
        )
        await clearCart()
        navigateTo('/my-account/orders')
      } else {
        toast.error(
          layoutDirection.value === 'ltr' ? 'Order Execution Failed' : 'لم يتم إكتمال الطلب',
          res.message
        )
      }
    } catch (err: any) {
      console.error('[CheckoutPage] Unexpected error during checkout:', err)
      const msg = err?.data?.message || err?.message || (layoutDirection.value === 'ltr' ? 'Unexpected checkout error. Please try again.' : 'حدث خطأ غير متوقع أثناء الدفع. حاول مرة أخرى.')
      toast.error(layoutDirection.value === 'ltr' ? 'Order Failed' : 'فشل إرسال الطلب', msg)
    } finally {
      isProcessing.value = false
    }
  }
}
</script>
