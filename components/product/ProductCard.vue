<template>
  <div class="group relative bg-white transition-all duration-300 w-full h-full flex flex-col overflow-hidden">
    
    <!-- Image Area -->
    <div class="relative w-full h-40 sm:h-48 md:h-56 bg-transparent flex items-center justify-center overflow-hidden shrink-0 border-b border-slate-50 p-2 sm:p-4">
      
      <!-- Discount Badge (Top Right) -->
      <div v-if="product.discountBadge" class="absolute top-4 right-4 z-10">
        <span class="bg-[#0b1a30] text-white text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-full">
          {{ product.discountBadge }}
        </span>
      </div>
      
      <!-- Side Floating Actions (Top Left) -->
      <div class="absolute top-3 left-3 flex flex-col gap-2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
        <!-- Wishlist Icon -->
        <button class="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 transition-colors" title="إضافة للمفضلة">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <!-- Compare Icon -->
        <button class="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 transition-colors" title="مقارنة">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>
        <!-- Quick View Icon -->
        <button 
          @click.prevent="isQuickViewOpen = true"
          class="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 transition-colors" 
          title="نظرة سريعة"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>

      <!-- Image -->
      <NuxtLink :to="`/product/${product.slug}`" :prefetch="true" class="block w-full h-full flex items-center justify-center">
        <img 
          :src="product.images[0]" 
          :alt="product.title" 
          loading="lazy"
          decoding="async"
          class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
        />
      </NuxtLink>
    </div>

    <!-- Product Details Area -->
    <div class="flex flex-col flex-grow text-right p-3 sm:p-4 bg-white relative">
      
      <!-- Title & Rating Line -->
      <div class="mb-1">
        <!-- Title with STRICT fixed height -->
        <h3 class="text-[11px] md:text-sm font-bold text-slate-800 leading-snug md:leading-relaxed text-right line-clamp-2 h-[36px] md:h-[44px] overflow-hidden">
          <NuxtLink :to="`/product/${product.slug}`" :prefetch="true" class="hover:text-amber-500 transition-colors">
            {{ product.title }}
          </NuxtLink>
        </h3>
      </div>

      <!-- Brand -->
      <span class="text-[10px] md:text-xs text-slate-400 mb-2 capitalize text-right block h-[16px] md:h-[20px] overflow-hidden truncate">
        {{ product.brand || product.category }}
      </span>

      <!-- Availability with Checkmark -->
      <div class="flex items-center justify-end gap-1.5 text-right mb-4 h-[16px] md:h-[20px]">
        <span class="text-[11px] md:text-xs font-bold text-slate-800 truncate">
          {{ product.availabilityStatus || (product.inStock ? 'متاح مخزون' : 'متاح للحجز.') }}
        </span>
        <svg v-if="product.inStock || product.availabilityStatus?.includes('مخزون')" class="w-3.5 h-3.5 text-[#0B0E28] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>

      <!-- Price (Pinned to Bottom via mt-auto) -->
      <div class="flex items-center justify-start gap-2 mt-auto pt-2" dir="ltr">
        <span class="text-sm md:text-base font-black text-[#0B0E28]">{{ product.formattedPrice }}</span>
        <span v-if="product.formattedOldPrice" class="text-[11px] text-slate-400 line-through">{{ product.formattedOldPrice }}</span>
      </div>
    </div>



    <!-- Quick View Modal -->
    <QuickViewModal 
      v-if="isQuickViewOpen"
      :is-open="isQuickViewOpen" 
      :product="product" 
      @close="isQuickViewOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Product } from '~/types'
import { useCart } from '~/composables/useCart'
import QuickViewModal from '~/components/product/QuickViewModal.vue'

defineProps<{
  product: Product
}>()

const { addToCart } = useCart()
const isQuickViewOpen = ref(false)
</script>
