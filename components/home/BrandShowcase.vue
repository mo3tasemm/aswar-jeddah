<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    <div :class="`rounded-xl p-4 md:p-6 overflow-hidden ${bgColor}`">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-6 px-2 gap-4">
        
        <!-- Title & Subtitle -->
        <div class="w-full md:w-1/3 text-center md:text-right">
          <h2 class="text-base md:text-lg font-bold text-white">{{ title }}</h2>
          <p v-if="subtitle" class="text-xs md:text-sm text-gray-300 mt-1">{{ subtitle }}</p>
        </div>
        
        <!-- Brand Name or Logo -->
        <div class="w-full md:w-1/3 text-center flex justify-center items-center order-first md:order-none">
          <img v-if="brandLogo" :src="brandLogo" :alt="brandName" class="h-12 md:h-14 object-contain" />
          <h3 v-else class="text-2xl md:text-4xl font-black text-white tracking-wide uppercase">{{ brandName }}</h3>
        </div>

        <!-- View All Button -->
        <div class="w-full md:w-1/3 flex justify-center md:justify-end">
          <NuxtLink :to="viewAllUrl" :class="['font-bold text-xs md:text-sm px-5 py-2 rounded-full hover:opacity-80 transition-all flex items-center justify-center gap-2 w-full md:w-auto', btnColor || 'bg-white text-[#1a66cc] hover:bg-gray-100']">
            <span>عرض الكل</span>
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
            class="snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px]"
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
  brandName: string
  title: string
  viewAllUrl: string
  bgColor: string
  products: Product[]
  subtitle?: string
  btnColor?: string
  brandLogo?: string
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
