<template>
  <div class="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-100/80 lg:sticky lg:top-28 transition-all" :dir="layoutDirection">
    <div class="flex items-center justify-between mb-4 sm:mb-6">
      <h3 class="text-base sm:text-lg font-black text-[#0B0E28] text-start">{{ t('checkout.order_summary') }}</h3>
      <span class="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
        {{ cartItems.length }} {{ isEn ? 'Items' : 'منتجات' }}
      </span>
    </div>

    <!-- Mini Cart List -->
    <div class="space-y-3 mb-5 max-h-56 overflow-y-auto custom-scrollbar pe-1">
      <div v-for="item in cartItems" :key="item.product?.id || item.id" class="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50/80 transition-colors">
        <div class="w-14 h-14 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 p-1 flex items-center justify-center">
          <img :src="item.product?.thumbnail || item.product?.images?.[0] || item.image" :alt="item.product?.title || item.name" class="w-full h-full object-contain mix-blend-multiply" />
        </div>
        <div class="flex-1 min-w-0 text-start">
          <h4 class="text-xs font-bold text-[#0B0E28] truncate">{{ item.product?.title || item.name }}</h4>
          <div class="flex items-center gap-2 mt-0.5">
            <span class="text-[10px] text-slate-400 block">{{ t('order.qty') || 'الكمية:' }} {{ item.quantity }}</span>
            <span v-if="item.selectedColor" class="text-[10px] text-slate-400 block">• {{ item.selectedColor }}</span>
          </div>
        </div>
        <div class="text-xs sm:text-sm font-black text-[#0B0E28] shrink-0">
          {{ getItemFormattedPrice(item) }}
        </div>
      </div>
    </div>

    <!-- Promo Code Input -->
    <div class="mb-5 relative">
      <input 
        type="text" 
        v-model="couponCode"
        :placeholder="t('checkout.have_coupon') || (isEn ? 'Promo or Coupon code' : 'كود الخصم أو الكوبون')" 
        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-start"
        :class="layoutDirection === 'rtl' ? 'pl-24' : 'pr-24'"
      />
      <button 
        type="button"
        @click="handleApplyCoupon"
        :disabled="isApplying || !couponCode.trim()"
        class="absolute top-1.5 bottom-1.5 bg-[#0B0E28] text-amber-400 px-3 sm:px-4 rounded-lg text-xs font-bold hover:bg-[#1a204c] active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        :class="layoutDirection === 'rtl' ? 'left-1.5' : 'right-1.5'"
      >
        <span v-if="!isApplying">{{ t('checkout.apply_coupon') || (isEn ? 'Apply' : 'تطبيق') }}</span>
        <svg v-else class="animate-spin h-3.5 w-3.5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </button>
    </div>

    <!-- Order Details Financials -->
    <div class="space-y-2.5 text-xs sm:text-sm font-bold border-b border-slate-100 pb-4 mb-4">
      <div class="flex items-center justify-between text-slate-600">
        <span>{{ t('order.subtotal') || (isEn ? 'Subtotal' : 'المجموع الفرعي') }}</span>
        <span class="text-[#0B0E28]">{{ subtotalFormatted }}</span>
      </div>

      <div v-if="discountAmount > 0" class="flex items-center justify-between text-emerald-600">
        <span>{{ t('order.discount') || (isEn ? 'Coupon Discount' : 'خصم الكوبون') }}</span>
        <span>- {{ discountAmountFormatted }}</span>
      </div>

      <div class="flex items-center justify-between text-slate-600">
        <span>{{ t('order.shipping_fee') || (isEn ? 'Shipping' : 'الشحن والتوصيل') }}</span>
        <span class="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px] font-black">
          {{ shippingFee === 0 ? (t('checkout.free_shipping') || (isEn ? 'Free Shipping' : 'شحن مجاني')) : formatCurrency(shippingFee) }}
        </span>
      </div>
    </div>

    <!-- Grand Total -->
    <div class="flex items-end justify-between mb-5">
      <div class="text-start">
        <span class="text-sm sm:text-base font-black text-[#0B0E28] block">{{ t('order.grand_total') || (isEn ? 'Total Amount' : 'المبلغ الإجمالي') }}</span>
        <span class="text-[11px] text-slate-400 font-normal block">{{ t('checkout.total_incl_vat') || (isEn ? 'Includes VAT' : 'شامل ضريبة القيمة المضافة') }}</span>
      </div>
      <span class="text-xl sm:text-2xl font-black text-amber-500">{{ totalFormatted }}</span>
    </div>

    <!-- CTA Slot (For the place order & pay button) -->
    <slot name="action"></slot>

    <!-- Trust Badges -->
    <div class="mt-5 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3">
      <div class="flex items-center gap-2 text-start">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <span class="text-[10px] font-bold text-slate-600 leading-tight">{{ t('checkout.secure_payment_badge') || (isEn ? 'Encrypted & Secure' : 'دفع مشفر وآمن') }}</span>
      </div>
      <div class="flex items-center gap-2 text-start">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
          <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <span class="text-[10px] font-bold text-slate-600 leading-tight">{{ t('checkout.guarantee_badge') || (isEn ? 'Original Guarantee' : 'ضمان أصلي 100%') }}</span>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { couponApiService } from '~/services/couponApiService'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  cartItems: {
    type: Array as () => any[],
    required: true,
    default: () => []
  }
})

const emit = defineEmits(['coupon-applied', 'financials-updated'])
const toast = useToast()
const { t, formatCurrency, layoutDirection, currentLanguage } = useLanguage()
const isEn = computed(() => currentLanguage.value === 'en')

const couponCode = ref('')
const isApplying = ref(false)
const discountAmount = ref(0)
const shippingFee = ref(0)

const getItemFormattedPrice = (item: any) => {
  const p = item.product?.price || (typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price) || 0
  return formatCurrency(p)
}

const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    const priceNum = item.product?.price || (typeof item.price === 'string' ? parseFloat(item.price.replace(/,/g, '')) : item.price) || 0
    return sum + (priceNum * (item.quantity || 1))
  }, 0)
})

const subtotalFormatted = computed(() => {
  return formatCurrency(subtotal.value)
})

const discountAmountFormatted = computed(() => {
  return formatCurrency(discountAmount.value)
})

const total = computed(() => {
  return Math.max(0, subtotal.value - discountAmount.value + shippingFee.value)
})

const totalFormatted = computed(() => {
  return formatCurrency(total.value)
})

watch([subtotal, discountAmount, shippingFee, total], () => {
  emit('financials-updated', {
    subtotal: subtotal.value,
    discount: discountAmount.value,
    shippingFee: shippingFee.value,
    total: total.value,
    couponCode: couponCode.value
  })
}, { immediate: true })

const handleApplyCoupon = async () => {
  if (!couponCode.value.trim()) return
  isApplying.value = true

  try {
    const res = await couponApiService.applyCoupon(couponCode.value)
    if (res.success) {
      const discVal = res.data?.discount_amount || res.discount || 20
      discountAmount.value = Number(discVal) || 0
      toast.success(
        isEn.value ? 'Coupon Applied' : 'تم تفعيل الكوبون', 
        res.message || (isEn.value ? 'Discount has been applied to total' : 'تم تطبيق الخصم على إجمالي الطلب')
      )
      emit('coupon-applied', { code: couponCode.value, discount: discountAmount.value })
    } else {
      toast.error(
        isEn.value ? 'Invalid Coupon' : 'كوبون غير صالح', 
        res.message || (isEn.value ? 'The coupon code is invalid or expired' : 'رمز الكوبون غير صحيح أو منتهي الصلاحية')
      )
    }
  } catch (err: any) {
    toast.error(
      isEn.value ? 'Error' : 'خطأ', 
      isEn.value ? 'Failed to apply coupon' : 'فشل في تطبيق الكوبون'
    )
  } finally {
    isApplying.value = false
  }
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
