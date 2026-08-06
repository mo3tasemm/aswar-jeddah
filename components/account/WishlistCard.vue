<template>
  <div class="group relative rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#1a66cc] border border-slate-100 transition-all duration-300 w-full flex-shrink-0 flex flex-col justify-between overflow-hidden h-full">
    
    <!-- Image Area -->
    <div class="relative w-full aspect-square max-h-[280px] bg-slate-50 overflow-hidden border-b border-slate-100">
      
      <!-- Discount Badge (Top Right) -->
      <div v-if="product.discount" class="absolute top-3 right-3 z-10">
        <span class="bg-[#0b1a30] text-white text-[9px] md:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
          خصم {{ product.discount }}%
        </span>
      </div>
      
      <!-- Side Floating Actions (Top Left - Wishlist Remove) -->
      <div class="absolute top-3 left-3 flex flex-col gap-2 z-20">
        <!-- Remove from Wishlist Icon -->
        <button 
          @click="$emit('remove-from-wishlist', product.id)"
          class="bg-white hover:bg-rose-50 text-rose-500 p-2 rounded-xl shadow-md border border-slate-100 transition-colors active:scale-90" 
          title="إزالة من المفضلة"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <!-- Image -->
      <NuxtLink :to="`/product/${product.id}`" class="block w-full h-full flex items-center justify-center bg-white relative">
        <!-- Main Image -->
        <img 
          v-if="product.image"
          :src="product.image" 
          :alt="product.name" 
          class="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />
        <!-- Fallback Placeholder -->
        <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
          <svg class="w-10 h-10 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span class="text-[10px] font-bold">لا توجد صورة</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Product Details Area -->
    <div class="flex flex-col flex-grow text-right p-4 pt-2 bg-white relative">
      
      <!-- Title & Rating Line -->
      <div class="relative min-h-[2.5rem] mb-1">
        <h3 class="text-[11px] md:text-xs font-bold text-slate-800 leading-relaxed line-clamp-2">
          <NuxtLink :to="`/product/${product.id}`" class="hover:text-[#1a66cc] transition-colors">
            {{ product.name }}
          </NuxtLink>
        </h3>
      </div>

      <!-- Brand / Category -->
      <span class="text-[10px] text-slate-400 mb-2 capitalize">{{ product.category }}</span>

      <!-- Availability -->
      <span class="text-[10px] md:text-[11px] font-bold mb-3" :class="product.inStock ? 'text-slate-800' : 'text-rose-500'">
        {{ product.inStock ? 'متاح للحجز.' : 'نفذت الكمية.' }}
      </span>

      <!-- Price -->
      <div class="flex items-center justify-end gap-2 mb-1">
        <span class="text-sm font-black text-slate-900">{{ product.price }} ر.س</span>
        <span v-if="product.oldPrice" class="text-[10px] text-slate-400 line-through">{{ product.oldPrice }} ر.س</span>
      </div>

      <!-- SKU -->
      <div class="text-right mt-auto pb-3">
        <span class="text-[9px] text-slate-400 uppercase">SKU: {{ product.id }}</span>
      </div>

      <!-- Static Add to Cart Button -->
      <button 
        v-if="product.inStock"
        @click="handleAddToCart"
        :disabled="isAdding"
        class="w-full bg-[#0b1a30] text-white text-[11px] font-bold py-2.5 rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 shadow-sm"
      >
        <svg v-if="isAdding" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
          إضافة إلى السلة
        </template>
      </button>

      <button
        v-else
        disabled
        class="w-full bg-slate-100 text-slate-400 text-[11px] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-sm cursor-not-allowed"
      >
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        غير متوفر حالياً
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'remove-from-wishlist'])

const isAdding = ref(false)

const handleAddToCart = () => {
  isAdding.value = true
  setTimeout(() => {
    isAdding.value = false
    emit('add-to-cart', props.product)
  }, 600)
}
</script>
