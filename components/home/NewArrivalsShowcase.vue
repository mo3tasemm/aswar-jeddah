<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    <div class="bg-[#7dd3fc]/90 sm:bg-[#80caf8] rounded-3xl py-3 px-4 sm:px-6 relative overflow-hidden shadow-sm">      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 px-2">
        
        <!-- Right Side: Title & Badge -->
        <div class="text-right">
          <!-- Badge -->
          <div class="bg-white/90 text-[#0284c7] px-3 py-1 rounded-full text-[10px] md:text-xs font-bold inline-flex items-center gap-1 mb-1 shadow-sm">
            <span>✦ وصل حديثاً</span>
          </div>
          
          <h2 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug">
            أجهزة كهربائية وصلت حديثاً
          </h2>
          <p class="text-xs md:text-sm text-slate-700/80 mt-0.5 font-medium">
            اكتشف أحدث الأجهزة المنزلية بأفضل الأسعار
          </p>
        </div>
        
        <!-- Left Side: Button -->
        <div class="flex-shrink-0 mt-2 md:mt-0">
          <NuxtLink 
            :to="shopUrl" 
            class="bg-white text-[#0369a1] hover:bg-slate-50 font-bold px-5 py-2 rounded-full shadow-sm border border-white/50 transition-all inline-flex items-center gap-2 text-sm"
          >
            <span>تسوق الآن</span>
            <!-- Arrow -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Slider Container -->
      <div class="relative w-full">
        <!-- Products Slider -->
        <div class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4">
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product"
            class="snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] shadow-md hover:shadow-xl"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/product/ProductCard.vue'
import type { Product } from '~/types'

defineProps<{
  products: Product[]
  shopUrl: string
}>()
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>
