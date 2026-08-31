<template>
  <div class="group/wishlist relative rounded-2xl bg-white shadow-sm hover:shadow-xl hover:border-[#1a66cc] border border-slate-100 transition-all duration-300 w-full flex-shrink-0 flex flex-col justify-between overflow-hidden h-full">
    
    <!-- Image Area -->
    <div class="relative w-full aspect-square max-h-[280px] bg-slate-50 overflow-hidden border-b border-slate-100 p-3 flex items-center justify-center">
      
      <!-- Discount Badge (Top Right) -->
      <div v-if="discountBadge" class="absolute top-3 right-3 z-10">
        <span class="bg-[#0b1a30] text-white text-[9px] md:text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          {{ discountBadge }}
        </span>
      </div>
      
      <!-- Side Floating Actions (Top Left - Wishlist Remove) -->
      <div class="absolute top-3 left-3 flex flex-col gap-2 z-20">
        <button 
          @click.prevent.stop="$emit('remove-from-wishlist', product.id)"
          class="bg-white hover:bg-rose-50 text-rose-500 p-2 rounded-xl shadow-md border border-slate-100 transition-colors active:scale-90 cursor-pointer" 
          title="إزالة من المفضلة"
        >
          <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <!-- Image Link -->
      <NuxtLink :to="`/product/${product.slug || product.id}`" class="block w-full h-full flex items-center justify-center bg-white relative">
        <img 
          v-if="imageUrl"
          :src="imageUrl" 
          :alt="productTitle" 
          class="w-full h-full object-contain object-center transition-transform duration-500 group-hover/wishlist:scale-105 mix-blend-multiply"
        />
        <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-300 bg-slate-50">
          <svg class="w-10 h-10 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
          <span class="text-[10px] font-bold">لا توجد صورة</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Product Details Area -->
    <div class="flex flex-col flex-grow text-right p-4 pt-2 bg-white relative">
      
      <!-- Title -->
      <div class="relative min-h-[2.5rem] mb-1">
        <h3 class="text-[11px] md:text-xs font-bold text-slate-800 leading-relaxed line-clamp-2">
          <NuxtLink :to="`/product/${product.slug || product.id}`" class="hover:text-[#1a66cc] transition-colors">
            {{ productTitle }}
          </NuxtLink>
        </h3>
      </div>

      <!-- Category / Brand -->
      <span class="text-[10px] text-slate-400 mb-2 capitalize">{{ categoryDisplay }}</span>

      <!-- Availability -->
      <span class="text-[10px] md:text-[11px] font-bold mb-3" :class="isAvailable ? 'text-emerald-600' : 'text-rose-500'">
        {{ isAvailable ? 'متاح للحجز.' : 'نفذت الكمية.' }}
      </span>

      <!-- Price -->
      <div class="flex items-center justify-end gap-2 mb-1" dir="ltr">
        <span class="text-sm font-black text-slate-900">{{ priceDisplay }}</span>
        <span v-if="oldPriceDisplay" class="text-[10px] text-slate-400 line-through">{{ oldPriceDisplay }}</span>
      </div>

      <!-- SKU -->
      <div class="text-right mt-auto pb-3">
        <span class="text-[9px] text-slate-400 uppercase">SKU: {{ product.sku || product.id }}</span>
      </div>

      <!-- Add to Cart Button -->
      <button 
        v-if="isAvailable"
        @click="handleAddToCart"
        :disabled="isAdding"
        class="w-full bg-[#0b1a30] text-white text-[11px] font-bold py-2.5 rounded-xl hover:bg-amber-400 hover:text-slate-900 transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
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

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'remove-from-wishlist'])
const isAdding = ref(false)

const productTitle = computed(() => {
  return props.product.title || props.product.name || 'منتج'
})

const imageUrl = computed(() => {
  return props.product.thumbnail || (props.product.images && props.product.images[0]) || props.product.image || ''
})

const priceDisplay = computed(() => {
  if (props.product.formattedPrice) return props.product.formattedPrice
  if (props.product.price) return `${props.product.price} ر.س`
  return '0 ر.س'
})

const oldPriceDisplay = computed(() => {
  if (props.product.formattedOldPrice) return props.product.formattedOldPrice
  if (props.product.originalPrice) return `${props.product.originalPrice} ر.س`
  if (props.product.oldPrice) return `${props.product.oldPrice} ر.س`
  return null
})

const discountBadge = computed(() => {
  if (props.product.discountBadge) return props.product.discountBadge
  if (props.product.discount) return `خصم ${props.product.discount}%`
  if (props.product.discountPercentage) return `خصم ${props.product.discountPercentage}%`
  return null
})

const categoryDisplay = computed(() => {
  return props.product.category || (typeof props.product.brand === 'object' ? props.product.brand?.name : props.product.brandName) || 'عام'
})

const isAvailable = computed(() => {
  return props.product.inStock !== false
})

const handleAddToCart = () => {
  isAdding.value = true
  setTimeout(() => {
    isAdding.value = false
    emit('add-to-cart', props.product)
  }, 400)
}
</script>
