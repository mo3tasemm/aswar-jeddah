<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeModal"
        :dir="layoutDirection"
      >
        <!-- Modal Container -->
        <div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]">
          
          <!-- MODAL HEADER -->
          <div class="bg-[#0B0E28] text-white p-6 pb-5 flex items-center justify-between shrink-0">
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-xl font-black text-white">{{ t('order.details_title') }}</h3>
                <span class="bg-amber-400 text-[#0B0E28] text-xs font-black px-3 py-0.5 rounded-full dir-ltr">
                  {{ orderIdDisplay }}
                </span>
              </div>
              <p class="text-xs text-slate-300 mt-1">{{ t('order.date') }} {{ dateDisplay }}</p>
            </div>
            <button 
              @click="closeModal" 
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- MODAL BODY -->
          <div class="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar overscroll-contain flex-1">
            
            <!-- LOADER STATE -->
            <div v-if="pending" class="py-16 text-center">
              <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p class="text-xs font-bold text-slate-500">{{ t('common.loading') }}</p>
            </div>

            <template v-else>
              <!-- SECTION A: ORDER STATUS & TRACKER -->

              <!-- 1. CANCELED ORDER ALERT BOX -->
              <div 
                v-if="isCanceled" 
                class="bg-rose-50/90 rounded-3xl p-6 sm:p-7 border border-rose-200/90 shadow-sm transition-all"
              >
                <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <!-- Icon + Text Group -->
                  <div class="flex items-start sm:items-center gap-4">
                    <!-- Soft Red Warning Icon Badge -->
                    <div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-xs">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="15" y1="9" x2="9" y2="15"></line>
                        <line x1="9" y1="9" x2="15" y2="15"></line>
                      </svg>
                    </div>

                    <!-- Typography Header & Message -->
                    <div class="space-y-1 text-start">
                      <div class="flex items-center gap-3 flex-wrap">
                        <h4 class="text-lg font-black text-rose-700">{{ t('order.canceled_title') }}</h4>
                        <span class="bg-rose-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs">
                          {{ t('order.canceled_badge') }}
                        </span>
                      </div>
                      <p class="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-medium">
                        {{ t('order.canceled_desc') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 2. ACTIVE ORDER TRACKER BAR & 4-STEP TIMELINE -->
              <div v-else class="bg-slate-50 p-6 rounded-3xl border border-slate-200/60">
                <div class="flex items-center justify-between mb-6">
                  <h4 class="text-xs font-bold text-slate-400">{{ t('order.status_header') }}</h4>
                  <span class="text-xs font-black px-3 py-1 rounded-full border shadow-2xs" :class="statusBadgeClass">
                    {{ statusTextDisplay }}
                  </span>
                </div>

                <!-- Dynamic 4-Step Timeline -->
                <div class="relative flex items-center justify-between max-w-md mx-auto">
                  <div class="absolute top-1/2 start-0 end-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                  <div class="absolute top-1/2 start-0 h-1 bg-[#0B0E28] -translate-y-1/2 z-0 transition-all duration-500" :style="{ width: trackerProgress }"></div>
                  
                  <div 
                    v-for="(step, index) in trackerSteps" 
                    :key="index"
                    class="relative z-10 flex flex-col items-center gap-2"
                  >
                    <div 
                      :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                        index <= currentStepIndex 
                          ? 'bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/20 shadow-md' 
                          : 'bg-white text-slate-400 border-2 border-slate-200'
                      ]"
                    >
                      <svg v-if="index === 0" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      <svg v-else-if="index === 1" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                      <svg v-else-if="index === 2" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                      <svg v-else-if="index === 3" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </div>
                    <span 
                      :class="[
                        'text-[11px] font-bold whitespace-nowrap',
                        index <= currentStepIndex ? 'text-[#0B0E28]' : 'text-slate-400'
                      ]"
                    >
                      {{ step.label }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- SECTION B: PURCHASED ITEMS LIST -->
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h4 class="text-sm font-black text-[#0B0E28]">{{ t('order.items_header') }}</h4>
                  <span class="text-xs font-bold text-slate-400">({{ orderItemsList.length }} {{ t('order.items_count') }})</span>
                </div>
                
                <div v-if="orderItemsList.length === 0" class="text-center py-8 text-slate-400 text-xs font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  {{ t('order.empty_items') }}
                </div>

                <div v-else class="space-y-3">
                  <div 
                    v-for="(item, idx) in orderItemsList" 
                    :key="item.id || idx"
                    class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition-colors"
                  >
                    <div class="flex items-center gap-4">
                      <div class="w-14 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0">
                        <img v-if="item.image" :src="item.image" :alt="item.name" class="w-full h-full object-contain" />
                        <svg v-else class="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                      </div>
                      <div class="text-start">
                        <h5 class="font-extrabold text-[#0B0E28] text-sm line-clamp-1">{{ item.name }}</h5>
                        <p class="text-xs text-slate-400 mt-1">{{ t('order.qty') }} {{ item.quantity }}</p>
                      </div>
                    </div>
                    <span class="font-black text-[#0B0E28] text-sm shrink-0">{{ item.price }} {{ t('product.currency') }}</span>
                  </div>
                </div>
              </div>

              <!-- SECTION C: SHIPPING & SUMMARY GRID -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <!-- Shipping Details Card -->
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2 text-start">
                  <h5 class="text-xs font-bold text-slate-400">{{ t('order.shipping_info') }}</h5>
                  <p class="text-xs font-bold text-[#0B0E28] mt-2">{{ shippingInfo.name }}</p>
                  <p class="text-xs text-slate-600 leading-relaxed">{{ shippingInfo.address }}</p>
                  <div class="pt-2 flex items-center gap-2">
                    <span class="text-[11px] font-semibold text-slate-500">{{ t('order.payment_method') }}</span>
                    <span class="text-[11px] font-bold text-[#0B0E28] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm">{{ paymentMethodDisplay }}</span>
                  </div>
                </div>

                <!-- Financial Summary Card -->
                <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5 text-start">
                  <h5 class="text-xs font-bold text-slate-400 mb-3">{{ t('order.invoice_summary') }}</h5>
                  <div class="flex justify-between text-xs text-slate-600">
                    <span>{{ t('order.subtotal') }}</span>
                    <span class="font-bold text-[#0B0E28]">{{ subtotalDisplay }} {{ t('product.currency') }}</span>
                  </div>

                  <!-- Shipping cost row -->
                  <div v-if="shippingFeeValue > 0" class="flex justify-between text-xs text-slate-600">
                    <span>{{ t('order.shipping_fee') }}</span>
                    <span class="font-bold text-[#0B0E28]">{{ shippingFeeDisplay }}</span>
                  </div>

                  <!-- Discount row -->
                  <div v-if="discountValue > 0" class="flex justify-between text-xs text-emerald-600 font-bold">
                    <span>{{ t('order.discount') }}</span>
                    <span>{{ discountDisplay }}</span>
                  </div>

                  <div class="border-t border-slate-200 pt-3 flex justify-between items-center">
                    <span class="text-xs font-black text-[#0B0E28]">{{ t('order.grand_total') }}</span>
                    <span class="text-base font-black text-[#0B0E28]">{{ totalDisplay }} {{ t('product.currency') }}</span>
                  </div>
                </div>
              </div>
            </template>

          </div>

          <!-- MODAL FOOTER WITH DYNAMIC ACTIONS & REORDER UX -->
          <div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <!-- Re-order Button -->
              <button 
                v-if="isDelivered"
                @click="handleReorder"
                :disabled="actionPending || isReordering"
                class="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span v-if="isReordering" class="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></span>
                <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
                <span>{{ isReordering ? t('order.reordering') : t('order.reorder') }}</span>
              </button>

              <!-- Refund Request Button -->
              <button 
                v-if="isDelivered"
                @click="handleRefundRequest"
                :disabled="actionPending || isRefunding || isRefundApplied"
                class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                :class="isRefundApplied ? 'bg-slate-200/80 text-slate-500 border border-slate-300 cursor-not-allowed' : 'bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 shadow-2xs'"
              >
                <span v-if="isRefunding" class="w-3.5 h-3.5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin"></span>
                <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h18M3 14h18M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 2 2 2z"></path></svg>
                <span>{{ isRefunding ? t('order.refund_submitting') : (isRefundApplied ? t('order.refund_applied') : t('order.refund_request')) }}</span>
              </button>

              <!-- Cancel Order Button (If Order is Pending/Confirmed) -->
              <button 
                v-if="isPendingOrConfirmed"
                @click="handleCancelOrder"
                :disabled="actionPending"
                class="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                <span>{{ t('order.cancel_order') }}</span>
              </button>

              <NuxtLink to="/my-account/support-tickets" class="px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-1.5">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                <span>{{ t('order.support') }}</span>
              </NuxtLink>
            </div>

            <button @click="closeModal" class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer">
              {{ t('order.close') }}
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { orderApiService } from '~/services/orderApiService'
import { useOrders } from '~/composables/useOrders'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  activeOrder: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])
const toast = useToast()
const { openCart, loadCart } = useCart()
const { reorderProducts, cancelOrder, requestRefund } = useOrders()
const { t, layoutDirection } = useLanguage()

const closeModal = () => emit('close')
const pending = ref(false)
const actionPending = ref(false)
const isReordering = ref(false)
const isRefunding = ref(false)
const hasRefundApplied = ref(false)
const orderDetailsData = ref<any[]>([])
const orderHeaderInfo = ref<any>(null)
const rawApiResponse = ref<any>(null)

const trackerSteps = computed(() => [
  { label: t('order.step_confirmed') },
  { label: t('order.step_processing') },
  { label: t('order.step_shipped') },
  { label: t('order.step_delivered') }
])

const loadDetails = async () => {
  if (!props.activeOrder) return
  const rawObj = props.activeOrder.rawItem || props.activeOrder
  const rawId = rawObj.id || rawObj.order_id || props.activeOrder.id
  if (!rawId) return

  pending.value = true
  hasRefundApplied.value = false
  try {
    const cleanId = typeof rawId === 'string' ? rawId.replace('#ORD-', '').replace('#', '') : rawId
    const res = await orderApiService.fetchOrderDetails(cleanId)
    
    rawApiResponse.value = res.rawResponse || res

    if (res.details && res.details.length > 0) {
      orderDetailsData.value = res.details
    } else if (Array.isArray(res)) {
      orderDetailsData.value = res
    } else if (Array.isArray(res.rawResponse)) {
      orderDetailsData.value = res.rawResponse
    }

    if (res.orderInfo) {
      orderHeaderInfo.value = res.orderInfo
    } else if (orderDetailsData.value[0]?.order) {
      orderHeaderInfo.value = orderDetailsData.value[0].order
    }

    const checkRefundFlag = orderDetailsData.value.some((item: any) => item.refund_request === 1 || item.refund_request === true) ||
                            Boolean(orderHeaderInfo.value?.refund_request === 1 || props.activeOrder?.rawItem?.refund_request === 1)
    if (checkRefundFlag) {
      hasRefundApplied.value = true
    }

  } catch (err) {
    console.warn('[OrderDetailsModal] Failed to load order details:', err)
  } finally {
    pending.value = false
  }
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    lockScroll()
    loadDetails()
  } else {
    unlockScroll()
  }
})

const orderIdDisplay = computed(() => {
  const rawObj = props.activeOrder?.rawItem || props.activeOrder
  const id = rawObj?.id || rawObj?.order_id
  return id ? (String(id).startsWith('#') ? id : `#${id}`) : '#ORD-101'
})

const rawStatus = computed(() => {
  const info = orderHeaderInfo.value || props.activeOrder?.rawItem || props.activeOrder || {}
  return (info.order_status || info.status || info.statusText || 'pending').toString().toLowerCase()
})

const isCanceled = computed(() => {
  return ['canceled', 'cancelled', 'failed', 'returned', 'ملغي'].includes(rawStatus.value)
})

const isDelivered = computed(() => {
  return ['delivered', 'completed', 'مكتمل', 'تم التوصيل'].includes(rawStatus.value)
})

const isPendingOrConfirmed = computed(() => {
  return ['pending', 'confirmed', 'قيد الانتظار', 'مؤكد'].includes(rawStatus.value)
})

const isRefundApplied = computed(() => {
  return hasRefundApplied.value
})

const statusTextDisplay = computed(() => {
  const st = rawStatus.value
  if (st === 'pending') return layoutDirection.value === 'ltr' ? 'Pending' : 'قيد الانتظار'
  if (st === 'confirmed') return t('order.step_confirmed')
  if (st === 'processing') return t('order.step_processing')
  if (st === 'shipped') return t('order.step_shipped')
  if (st === 'delivered' || st === 'completed') return t('order.step_delivered')
  if (st === 'canceled' || st === 'cancelled') return t('order.canceled_badge')
  if (st === 'returned') return layoutDirection.value === 'ltr' ? 'Returned' : 'مسترجع'
  return props.activeOrder?.statusText || t('order.step_delivered')
})

const statusBadgeClass = computed(() => {
  if (isCanceled.value) return 'bg-rose-50 text-rose-600 border-rose-200'
  if (isDelivered.value) return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  return 'bg-amber-50 text-amber-700 border-amber-200'
})

const dateDisplay = computed(() => {
  return props.activeOrder?.date || (layoutDirection.value === 'ltr' ? 'Recently' : 'مؤخراً')
})

const paymentMethodDisplay = computed(() => {
  const rawObj = props.activeOrder?.rawItem || props.activeOrder || {}
  const rawMethod = (props.activeOrder?.paymentMethod || rawObj?.payment_method || orderHeaderInfo.value?.payment_method || '').toLowerCase()

  if (layoutDirection.value === 'ltr') {
    const enMap: Record<string, string> = {
      'offline_payment': 'Bank Transfer / Manual',
      'manual_payment': 'Bank Transfer / Manual',
      'bank_transfer': 'Bank Transfer',
      'cash_on_delivery': 'Cash on Delivery',
      'cod': 'Cash on Delivery',
      'paymob': 'Digital Payment (Paymob)',
      'tabby': 'Tabby (Installments)',
      'tamara': 'Tamara (Interest-free)',
      'digital_payment': 'Credit Card / Mada / Visa'
    }
    return enMap[rawMethod] || (rawMethod ? rawMethod : 'Bank Transfer')
  }

  const arMap: Record<string, string> = {
    'offline_payment': 'تحويل بنكي / دفع يدوي',
    'manual_payment': 'تحويل بنكي / دفع يدوي',
    'bank_transfer': 'تحويل بنكي معتمد',
    'cash_on_delivery': 'الدفع عند الاستلام',
    'cod': 'الدفع عند الاستلام',
    'paymob': 'الدفع الإلكتروني (Paymob)',
    'tabby': 'تابي (تقسيط مشترياتك)',
    'tamara': 'تمارا (تقسيط بدون فوائد)',
    'digital_payment': 'بطاقة ماليّة / مدى / فيزا'
  }

  return arMap[rawMethod] || (rawMethod ? rawMethod : 'تحويل بنكي / يدوي')
})

const orderItemsList = computed(() => {
  let source: any[] = []

  if (orderDetailsData.value && orderDetailsData.value.length > 0) {
    source = orderDetailsData.value
  } else if (rawApiResponse.value) {
    source = Array.isArray(rawApiResponse.value)
      ? rawApiResponse.value
      : (rawApiResponse.value.details || 
         rawApiResponse.value.order_details || 
         rawApiResponse.value.data || 
         rawApiResponse.value.order?.details || 
         rawApiResponse.value.order?.order_details || 
         rawApiResponse.value.order?.items || 
         rawApiResponse.value.items || 
         [])
  }

  if ((!source || source.length === 0) && props.activeOrder) {
    const rawObj = props.activeOrder.rawItem || props.activeOrder
    source = rawObj.details || rawObj.order_details || rawObj.items || rawObj.products || []
  }

  if (Array.isArray(source) && source.length > 0) {
    return source.map((item: any) => {
      let prodObj = item.product_details || item.product || item.product_detail || {}
      if (typeof prodObj === 'string') {
        try { prodObj = JSON.parse(prodObj) } catch {}
      }

      const name = prodObj.name || prodObj.title || item.product_name || item.name || 'منتج من أسوار جدة'
      const qty = Number(item.qty || item.quantity || item.product_quantity || 1)
      const numPrice = Number(item.price || item.unit_price || prodObj.price || prodObj.unit_price || 0)
      
      let img = prodObj.thumbnail || prodObj.image || prodObj.images?.[0] || item.image || item.thumbnail || item.product_thumbnail
      if (img && typeof img === 'string' && !img.startsWith('http')) {
        img = `https://wedgetstore.com/storage/app/public/product/thumbnail/${img}`
      }

      return {
        id: item.id || prodObj.id || Math.random(),
        name,
        quantity: qty,
        unitPrice: numPrice,
        price: numPrice.toLocaleString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US'),
        image: img || null
      }
    })
  }

  return []
})

const shippingInfo = computed(() => {
  const rawAddr = props.activeOrder?.rawItem?.shipping_address_data || orderHeaderInfo.value?.shipping_address_data
  if (rawAddr) {
    return {
      name: rawAddr.contact_person_name || 'عميل أسوار',
      address: `${rawAddr.city || ''}، ${rawAddr.address || ''}`
    }
  }
  return {
    name: props.activeOrder?.customerName || (layoutDirection.value === 'ltr' ? 'Aswar Customer' : 'عميل أسوار جدة'),
    address: props.activeOrder?.shippingAddress || (layoutDirection.value === 'ltr' ? 'Saudi Arabia' : 'المملكة العربية السعودية')
  }
})

const orderObj = computed(() => {
  if (orderHeaderInfo.value) return orderHeaderInfo.value
  if (orderDetailsData.value[0]?.order) return orderDetailsData.value[0].order
  return rawApiResponse.value?.order || 
         rawApiResponse.value?.data?.order || 
         props.activeOrder?.rawItem || 
         props.activeOrder || 
         {}
})

const subtotalValue = computed(() => {
  if (orderItemsList.value && orderItemsList.value.length > 0) {
    const sum = orderItemsList.value.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0)
    if (sum > 0) return sum
  }
  const rawSub = orderObj.value.subtotal || orderObj.value.order_amount || 0
  return Number(rawSub) || 0
})

const subtotalDisplay = computed(() => {
  return subtotalValue.value.toLocaleString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US')
})

const discountValue = computed(() => {
  let itemDiscountSum = 0
  if (orderDetailsData.value && orderDetailsData.value.length > 0) {
    itemDiscountSum = orderDetailsData.value.reduce((acc, item) => acc + Number(item.discount || item.discount_amount || 0), 0)
  }

  const val = orderObj.value.discount_amount || 
              orderObj.value.coupon_discount_amount || 
              orderObj.value.coupon_discount || 
              orderObj.value.discount || 
              itemDiscountSum || 
              0
  return Number(val) || 0
})

const discountDisplay = computed(() => {
  return discountValue.value > 0 ? `- ${discountValue.value.toLocaleString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US')} ${t('product.currency')}` : ''
})

const shippingFeeValue = computed(() => {
  const val = orderObj.value.shipping_cost || 
              orderObj.value.delivery_fee || 
              orderObj.value.shipping_fee || 
              0
  return Number(val) || 0
})

const shippingFeeDisplay = computed(() => {
  return shippingFeeValue.value > 0 ? `${shippingFeeValue.value.toLocaleString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US')} ${t('product.currency')}` : ''
})

const totalValue = computed(() => {
  const serverTotal = orderObj.value.order_amount || orderObj.value.total_amount || orderObj.value.total
  if (serverTotal && Number(serverTotal) > 0) {
    return Number(serverTotal)
  }
  const calculated = subtotalValue.value - discountValue.value + shippingFeeValue.value
  return Math.max(0, calculated)
})

const totalDisplay = computed(() => {
  return totalValue.value.toLocaleString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US')
})

const currentStepIndex = computed(() => {
  const st = rawStatus.value
  if (st.includes('deliver') || st.includes('complet')) return 3
  if (st.includes('ship') || st.includes('out')) return 2
  if (st.includes('process') || st.includes('prepar')) return 1
  return 0
})

const trackerProgress = computed(() => {
  const idx = currentStepIndex.value
  if (idx === 0) return '0%'
  if (idx === 1) return '33%'
  if (idx === 2) return '66%'
  return '100%'
})

const lockScroll = () => {
  if (process.client) {
    document.body.style.overflow = 'hidden'
  }
}

const unlockScroll = () => {
  if (process.client) {
    document.body.style.overflow = ''
  }
}

onUnmounted(() => {
  unlockScroll()
})

const handleReorder = async () => {
  if (!props.activeOrder) return
  const rawId = props.activeOrder.rawItem?.id || props.activeOrder.id
  if (!rawId) return

  actionPending.value = true
  isReordering.value = true

  try {
    const cleanId = typeof rawId === 'string' ? rawId.replace('#ORD-', '').replace('#', '') : rawId
    const res = await reorderProducts(cleanId)

    if (res.success) {
      toast.success(t('order.reorder'), res.message || 'Product reordered')
      closeModal()
      await loadCart()
      openCart()
    } else {
      toast.error('Reorder Failed', res.message || 'Could not reorder.')
    }
  } catch (err: any) {
    toast.error('Error', 'Reorder failed.')
  } finally {
    actionPending.value = false
    isReordering.value = false
  }
}

const handleRefundRequest = async () => {
  if (!props.activeOrder) return
  const rawId = props.activeOrder.rawItem?.id || props.activeOrder.id
  if (!rawId) return

  actionPending.value = true
  isRefunding.value = true

  try {
    const cleanId = typeof rawId === 'string' ? rawId.replace('#ORD-', '').replace('#', '') : rawId
    const firstItem = orderItemsList.value[0]
    const amount = totalValue.value

    const res = await requestRefund({
      order_id: cleanId,
      amount,
      refund_reason: 'طلب استرجاع من حساب العميل',
      order_details_id: firstItem?.id
    })

    if (res.success) {
      toast.success(t('order.refund_request'), res.message || 'Refund submitted')
      hasRefundApplied.value = true
    } else {
      toast.error('Refund Request', res.message || 'Could not submit refund.')
    }
  } catch (err: any) {
    toast.error('Error', 'Failed to submit refund.')
  } finally {
    actionPending.value = false
    isRefunding.value = false
  }
}

const handleCancelOrder = async () => {
  if (!props.activeOrder) return
  const rawId = props.activeOrder.rawItem?.id || props.activeOrder.id
  if (!rawId) return

  if (process.client && !confirm('هل أنت تأكد من إرغابك في إلغاء هذا الطلب؟')) {
    return
  }

  actionPending.value = true

  try {
    const cleanId = typeof rawId === 'string' ? rawId.replace('#ORD-', '').replace('#', '') : rawId
    const res = await cancelOrder(cleanId)

    if (res.success) {
      toast.success(t('order.cancel_order'), res.message || 'Order cancelled')
      closeModal()
      window.location.reload()
    } else {
      toast.error('Cancel Order', res.message || 'Failed to cancel order.')
    }
  } catch (err: any) {
    toast.error('Error', 'Failed to cancel order.')
  } finally {
    actionPending.value = false
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
