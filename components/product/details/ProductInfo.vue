<template>
  <div class="flex flex-col h-full">
    
    <!-- Title & Meta -->
    <div class="mb-6">
      <h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-[#0B0E28] leading-tight mb-4">
        {{ product.title }}
      </h1>
      
      <div class="flex flex-wrap items-center gap-4 text-sm">
        <!-- Rating -->
        <div class="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100">
          <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
          <span class="font-bold text-amber-700">{{ product.rating }}</span>
          <span class="text-amber-600/70">({{ product.reviewsCount }} تقييم)</span>
        </div>
        
        <!-- SKU -->
        <div class="flex items-center gap-1.5 text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
          <span>SKU:</span>
          <span class="text-slate-700 dir-ltr">{{ product.sku }}</span>
        </div>
      </div>
    </div>

    <!-- Pricing Box -->
    <div class="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 mb-6 relative overflow-hidden">
      
      <!-- Flash Sale Timer -->
      <div v-if="timeLeft" class="absolute top-0 left-0 right-0 bg-rose-500 text-white text-xs font-bold py-1.5 px-4 flex items-center justify-between">
        <span class="flex items-center gap-1.5">
          <svg class="w-4 h-4 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
          ينتهي العرض خلال
        </span>
        <span class="font-black tracking-wider dir-ltr">{{ timeLeft }}</span>
      </div>

      <div :class="['flex items-end justify-between flex-wrap gap-4', timeLeft ? 'mt-8' : '']">
        <div>
          <span class="text-slate-500 font-bold block mb-1">السعر</span>
          <div class="flex items-end gap-3">
            <span class="text-3xl md:text-4xl font-black text-[#0B0E28] leading-none">{{ product.formattedPrice }}</span>
            <div v-if="product.formattedOldPrice" class="flex flex-col">
              <span class="text-sm md:text-base text-slate-400 line-through font-medium">{{ product.formattedOldPrice }}</span>
            </div>
          </div>
        </div>
        
        <div v-if="product.discountPercentage" class="bg-rose-100 text-rose-600 font-black text-sm px-3 py-1.5 rounded-xl border border-rose-200">
          وفر {{ product.discountPercentage }}%
        </div>
      </div>
    </div>

    <!-- Smart Installments Banner -->
    <div class="bg-gradient-to-r from-[#0B0E28] to-[#1a235c] rounded-2xl p-4 mb-6 flex items-center gap-4 text-white shadow-lg shadow-[#0B0E28]/10 cursor-pointer hover:shadow-xl transition-shadow group">
      <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20">
        <svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
      </div>
      <div class="flex-1">
        <h4 class="font-bold text-sm mb-0.5">قسط مشترياتك بذكاء</h4>
        <p class="text-xs text-slate-300 font-medium">خطط تقسيط مرنة تبدأ من <span class="text-amber-400 font-bold">{{ installmentAmount }} ج.م</span> / شهر</p>
      </div>
      <svg class="w-5 h-5 text-slate-400 rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </div>

    <!-- Stock Urgency & Add to Cart -->
    <div class="mt-auto pt-6 border-t border-slate-100">
      
      <!-- Stock Status -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div class="flex items-center gap-2">
          <span class="relative flex h-3 w-3">
            <span :class="[product.stockCount && product.stockCount <= 5 ? 'bg-rose-500' : 'bg-emerald-500']" class="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"></span>
            <span :class="[product.stockCount && product.stockCount <= 5 ? 'bg-rose-500' : 'bg-emerald-500']" class="relative inline-flex rounded-full h-3 w-3"></span>
          </span>
          <span class="font-bold text-sm" :class="[product.stockCount && product.stockCount <= 5 ? 'text-rose-600' : 'text-emerald-600']">
            {{ product.availabilityStatus }}
          </span>
        </div>
        <span v-if="product.stockCount && product.stockCount <= 5" class="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100/50">
          باقي {{ product.stockCount }} قطع فقط - اطلبها الآن!
        </span>
      </div>

      <!-- Actions Row -->
      <div class="flex flex-wrap sm:flex-nowrap items-stretch gap-3">
        <!-- Quantity -->
        <div class="flex items-center bg-slate-50 rounded-2xl border border-slate-200 h-14 px-2 w-[120px] shrink-0 order-1">
          <button @click="quantity--" :disabled="quantity <= 1" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:text-[#0B0E28] disabled:opacity-50 transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span class="flex-1 text-center font-black text-[#0B0E28] text-lg">{{ quantity }}</span>
          <button @click="quantity++" class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:text-[#0B0E28] transition-colors">
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
        </div>

        <!-- Wishlist -->
        <button class="w-14 h-14 flex items-center justify-center rounded-2xl border-2 border-slate-100 text-slate-400 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0 order-2 mr-auto sm:mr-0">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
        </button>

        <!-- Add to Cart -->
        <button 
          @click="handleAddToCart"
          class="w-full sm:flex-1 h-14 bg-amber-500 text-slate-900 font-black text-base rounded-2xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 overflow-hidden relative group order-3 sm:order-2 mt-1 sm:mt-0"
        >
          <!-- Shine effect -->
          <div class="absolute inset-0 -translate-x-full bg-white/30 group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
          
          <svg class="w-5 h-5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          <span class="relative z-10">أضف إلى السلة</span>
        </button>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart, openCart } = useCart()
const quantity = ref(1)

const handleAddToCart = () => {
  addToCart(props.product, quantity.value)
  openCart()
}

// Mock installment calculation (e.g. 12 months)
const installmentAmount = computed(() => {
  return Math.ceil((props.product.price * 1.15) / 12).toLocaleString('en-US')
})

// Flash Sale Timer Logic
const timeLeft = ref('')
let timerInterval = null

const updateTimer = () => {
  if (!props.product.flashSaleEndTime) return
  
  const now = new Date().getTime()
  const distance = props.product.flashSaleEndTime.getTime() - now

  if (distance < 0) {
    timeLeft.value = ''
    clearInterval(timerInterval)
    return
  }

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((distance % (1000 * 60)) / 1000)

  timeLeft.value = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

onMounted(() => {
  if (props.product.flashSaleEndTime) {
    updateTimer()
    timerInterval = setInterval(updateTimer, 1000)
  }
})

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval)
})
</script>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
