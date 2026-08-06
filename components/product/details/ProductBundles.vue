<template>
  <div v-if="bundleProducts && bundleProducts.length > 0" class="bg-white rounded-3xl p-6 lg:p-8 border border-slate-200 shadow-sm">
    
    <div class="flex items-center gap-2 mb-6">
      <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
      <h3 class="text-lg md:text-xl font-black text-[#0B0E28]">يتم شراؤها معاً عادةً</h3>
    </div>

    <div class="flex flex-col lg:flex-row items-center gap-8">
      
      <!-- Products Row -->
      <div class="flex-1 flex flex-wrap items-center justify-center lg:justify-start gap-4">
        
        <!-- Main Product -->
        <div class="flex flex-col items-center gap-2 w-28">
          <div class="w-24 h-24 rounded-2xl border-2 border-amber-500 p-2 relative">
            <span class="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">هذا المنتج</span>
            <img :src="mainProduct.images[0]" :alt="mainProduct.title" class="w-full h-full object-cover rounded-xl" />
          </div>
          <span class="text-xs font-bold text-slate-800 text-center line-clamp-2 leading-snug">{{ mainProduct.title }}</span>
        </div>

        <!-- Plus -->
        <div class="text-slate-300 font-black text-2xl">+</div>

        <!-- Bundle Products -->
        <template v-for="(bProduct, idx) in bundleProducts" :key="bProduct.id">
          
          <div class="flex flex-col items-center gap-2 w-28 relative group cursor-pointer">
            <div class="w-24 h-24 rounded-2xl border border-slate-200 p-2 bg-slate-50 group-hover:border-amber-400 transition-colors relative">
              <!-- Checkbox mock -->
              <div class="absolute top-1 right-1 w-4 h-4 rounded bg-amber-500 text-white flex items-center justify-center">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
              <img :src="bProduct.image" :alt="bProduct.title" class="w-full h-full object-cover rounded-xl mix-blend-multiply" />
            </div>
            <span class="text-xs font-bold text-slate-800 text-center line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">{{ bProduct.title }}</span>
          </div>

          <!-- Plus (except last) -->
          <div v-if="idx < bundleProducts.length - 1" class="text-slate-300 font-black text-2xl">+</div>
        </template>
        
      </div>

      <!-- Equals -->
      <div class="hidden lg:block text-slate-300 font-black text-3xl">=</div>

      <!-- Action Box -->
      <div class="w-full lg:w-64 shrink-0 bg-slate-50 rounded-2xl p-5 border border-slate-200 text-center flex flex-col justify-center">
        <span class="text-sm font-bold text-slate-500 mb-1">إجمالي الحزمة ({{ bundleProducts.length + 1 }} منتج):</span>
        <div class="text-2xl font-black text-[#0B0E28] mb-4">{{ totalBundlePriceFormatted }}</div>
        
        <button class="w-full py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20">
          إضافة الحزمة للسلة
        </button>
      </div>

    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  mainProduct: {
    type: Object,
    required: true
  },
  bundleProducts: {
    type: Array,
    default: () => []
  }
})

const totalBundlePrice = computed(() => {
  const mainPrice = props.mainProduct.price || 0
  const bundleSum = props.bundleProducts.reduce((sum, item) => sum + item.price, 0)
  return mainPrice + bundleSum
})

const totalBundlePriceFormatted = computed(() => {
  return totalBundlePrice.value.toLocaleString('en-US') + ' EGP'
})
</script>
