<template>
  <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 sticky top-24">
    <h3 class="text-lg font-black text-[#0B0E28] mb-6">ملخص الطلب</h3>

    <!-- Mini Cart List (Optional for checkout) -->
    <div class="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pr-2">
      <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-3">
        <div class="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100">
          <img :src="item.image" :alt="item.name" class="w-full h-full object-cover mix-blend-multiply" />
        </div>
        <div class="flex-1 min-w-0">
          <h4 class="text-xs font-bold text-[#0B0E28] truncate">{{ item.name }}</h4>
          <span class="text-[10px] text-slate-400">الكمية: {{ item.quantity }}</span>
        </div>
        <div class="text-sm font-black text-[#0B0E28] shrink-0">{{ item.price }} <span class="text-[10px]">ر.س</span></div>
      </div>
    </div>

    <!-- Promo Code -->
    <div class="mb-6 relative">
      <input 
        type="text" 
        placeholder="لديك كود خصم؟" 
        class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all pl-20"
      />
      <button class="absolute left-2 top-2 bottom-2 bg-[#0B0E28] text-white px-4 rounded-lg text-xs font-bold hover:bg-[#1a204c] transition-colors">
        تطبيق
      </button>
    </div>

    <!-- Order Details -->
    <div class="space-y-3 text-sm font-bold border-b border-slate-100 pb-4 mb-4">
      <div class="flex items-center justify-between text-slate-600">
        <span>المجموع الفرعي</span>
        <span class="text-[#0B0E28]">{{ subtotalFormatted }} ر.س</span>
      </div>
      <div class="flex items-center justify-between text-slate-600">
        <span>رسوم الشحن</span>
        <span class="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md text-xs">شحن مجاني</span>
      </div>
      <div class="flex items-center justify-between text-slate-600">
        <span>ضريبة القيمة المضافة (15%)</span>
        <span class="text-[#0B0E28]">{{ taxFormatted }} ر.س</span>
      </div>
    </div>

    <!-- Total -->
    <div class="flex items-end justify-between mb-6">
      <span class="text-base font-black text-[#0B0E28]">الإجمالي <span class="text-xs text-slate-400 font-normal">(شامل الضريبة)</span></span>
      <span class="text-2xl font-black text-amber-500">{{ totalFormatted }} <span class="text-sm text-[#0B0E28]">ر.س</span></span>
    </div>

    <!-- CTA Slot (For the final checkout button) -->
    <slot name="action"></slot>

    <!-- Trust Badges -->
    <div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        </div>
        <span class="text-[10px] font-bold text-slate-600">دفع إلكتروني آمن 100%</span>
      </div>
      <div class="flex items-center gap-2">
        <div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <span class="text-[10px] font-bold text-slate-600">ضمان ذهبي معتمد</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  cartItems: {
    type: Array,
    required: true,
    default: () => []
  }
})

const subtotal = computed(() => {
  return props.cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/,/g, ''))
    return sum + (price * item.quantity)
  }, 0)
})

const subtotalFormatted = computed(() => {
  return subtotal.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

// Example tax calculation (Assuming subtotal includes tax already in KSA, or we calculate it. Let's assume subtotal doesn't include it for this example, or just display it as extracted from total)
// If prices include tax, tax = subtotal - (subtotal / 1.15)
const tax = computed(() => {
  return subtotal.value - (subtotal.value / 1.15)
})

const taxFormatted = computed(() => {
  return tax.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})

const total = computed(() => {
  return subtotal.value // Assuming subtotal already includes tax based on typical KSA store pricing. If not, add tax here.
})

const totalFormatted = computed(() => {
  return total.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
