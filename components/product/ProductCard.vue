<template>
  <div v-if="product" class="group/card relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col overflow-hidden p-3 sm:p-4" :dir="layoutDirection">
    
    <!-- Image Area -->
    <div class="relative w-full h-40 sm:h-48 md:h-56 bg-white flex items-center justify-center overflow-hidden shrink-0 rounded-xl p-2 mb-3">
      
      <!-- Discount Badge (Top Right/Start) -->
      <div v-if="discountBadgeText" class="absolute top-2 end-2 z-10">
        <span class="bg-[#0b1a30] text-amber-400 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">
          {{ discountBadgeText }}
        </span>
      </div>
      
      <!-- Side Floating Actions (Top Left/End) -->
      <div class="absolute top-2 start-2 flex flex-col gap-1.5 z-20 opacity-0 group-hover/card:opacity-100 transition-all duration-300 transform -translate-x-2 rtl:translate-x-2 group-hover/card:translate-x-0">
        <!-- Wishlist Icon -->
        <button 
          @click.prevent.stop="handleWishlistClick"
          :class="[
            isInWishlist(product.id)
              ? 'bg-rose-500 text-white border-rose-500 shadow-rose-500/20'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100'
          ]"
          class="p-2 rounded-xl shadow-md border transition-all cursor-pointer z-30" 
          :title="wishlistTooltip"
        >
          <svg xmlns="http://www.w3.org/2000/svg" :fill="isInWishlist(product.id) ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
        <!-- Compare Icon -->
        <button 
          @click.prevent="toggleCompare(product)"
          :class="[
            isInCompare(product.id) 
              ? 'bg-amber-500 text-slate-900 border-amber-500 shadow-amber-500/20' 
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100'
          ]"
          class="p-2 rounded-xl shadow-md border transition-all cursor-pointer" 
          :title="compareTooltip"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
          </svg>
        </button>
        <!-- Quick View Icon -->
        <button 
          @click.prevent="isQuickViewOpen = true"
          class="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 transition-colors cursor-pointer" 
          :title="t('product.quick_view')"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>

      <!-- Image -->
      <NuxtLink :to="`/product/${product?.slug || product?.id}`" :prefetch="true" class="block w-full h-full flex items-center justify-center">
        <img 
          :src="product?.thumbnail || (product?.images && product?.images[0]) || 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'" 
          :alt="displayTitle" 
          loading="lazy"
          decoding="async"
          class="w-full h-full object-contain transition-transform duration-300 group-hover/card:scale-105 mix-blend-multiply"
        />
      </NuxtLink>
    </div>

    <!-- Product Details Area -->
    <div class="flex flex-col flex-grow text-start bg-white relative">
      
      <!-- Title -->
      <div class="mb-1">
        <h3 class="text-xs md:text-sm font-bold text-slate-800 leading-snug md:leading-relaxed text-start line-clamp-2 h-[36px] md:h-[44px] overflow-hidden">
          <NuxtLink :to="`/product/${product?.slug || product?.id}`" :prefetch="true" class="hover:text-amber-500 transition-colors">
            {{ displayTitle }}
          </NuxtLink>
        </h3>
      </div>

      <!-- Dynamic Brand & SKU -->
      <div v-if="brandDisplay || product?.sku" class="flex items-center justify-between gap-1 mb-2 h-[16px] md:h-[20px] overflow-hidden text-start">
        <span class="text-[10px] md:text-xs text-amber-600 font-bold uppercase tracking-wider truncate">
          {{ brandDisplay }}
        </span>
        <span v-if="product?.sku" class="text-[9px] text-slate-400 uppercase tracking-wider shrink-0">
          {{ t('product.sku') }} {{ product.sku }}
        </span>
      </div>

      <!-- Availability with Checkmark -->
      <div class="flex items-center justify-start gap-1.5 text-start mb-3 h-[16px] md:h-[20px]">
        <span class="text-[11px] md:text-xs font-bold text-slate-800 truncate">
          {{ availabilityText }}
        </span>
        <svg v-if="product?.inStock || (product as any)?.current_stock > 0" class="w-3.5 h-3.5 text-[#0B0E28] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
      </div>

      <!-- Price (Pinned to Bottom via mt-auto) -->
      <div class="flex items-center justify-start gap-2.5 mt-auto pt-2 mb-2 flex-wrap" :dir="layoutDirection">
        <span class="text-base sm:text-lg font-black text-[#0B0E28] tracking-tight">{{ displayPrice }}</span>
        <span v-if="displayOriginalPrice" class="text-xs sm:text-sm text-slate-400 line-through font-semibold">{{ displayOriginalPrice }}</span>
      </div>

      <!-- Quick Add to Cart Button (Always Visible at Bottom) -->
      <div class="w-full mt-1">
        <button 
          @click.prevent="handleAddToCart"
          :disabled="isAdding || product?.inStock === false"
          class="w-full bg-[#0B0E28] hover:bg-[#1a204d] active:scale-[0.98] text-white text-xs md:text-sm font-bold py-2.5 px-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg v-if="isAdding" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <svg v-else-if="justAdded" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>{{ justAdded ? (layoutDirection === 'ltr' ? 'Added Successfully!' : 'تمت الإضافة بنجاح!') : t('product.add_to_cart') }}</span>
        </button>
      </div>

    </div>

    <!-- Quick View Modal Teleport -->
    <QuickViewModal 
      v-if="isQuickViewOpen"
      :is-open="isQuickViewOpen" 
      :product="product" 
      @close="isQuickViewOpen = false" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '~/types/product'
import { useCart } from '~/composables/useCart'
import { useBrands } from '~/composables/useBrands'
import { useCompare } from '~/composables/useCompare'
import { useWishlist } from '~/composables/useWishlist'
import { useLanguage } from '~/composables/useLanguage'
import QuickViewModal from '~/components/product/QuickViewModal.vue'

const props = defineProps<{
  product: Product
  viewMode?: 'grid-4' | 'grid-3' | 'list'
}>()

const { t, formatCurrency, layoutDirection } = useLanguage()
const { addToCart } = useCart()
const { brands } = useBrands()
const { toggleCompare, isInCompare } = useCompare()
const { toggleWishlist, isInWishlist } = useWishlist()

const isQuickViewOpen = ref(false)
const isAdding = ref(false)
const justAdded = ref(false)

const handleWishlistClick = async () => {
  if (!props.product || !props.product.id) return
  await toggleWishlist(props.product)
}

const displayTitle = computed(() => {
  if (!props.product) return ''
  if (layoutDirection.value === 'ltr') {
    return (props.product as any).name_en || (props.product as any).title_en || (props.product as any).en_name || props.product.title || props.product.name || 'Featured Product'
  }
  return props.product.title || props.product.name || 'منتج مميز'
})

const discountBadgeText = computed(() => {
  if (!props.product) return ''
  const pct = props.product.discountPercentage || 0
  if (pct > 0) {
    return layoutDirection.value === 'ltr' ? `${pct}% OFF` : `خصم ${pct}%`
  }
  return props.product.discountBadge || ''
})

const availabilityText = computed(() => {
  if (!props.product) return ''
  const inStock = props.product.inStock ?? ((props.product as any).current_stock > 0)
  if (inStock) {
    return t('product.in_stock')
  }
  return t('product.out_of_stock')
})

const displayPrice = computed(() => {
  if (!props.product) return formatCurrency(0)
  return formatCurrency(props.product.price || 0)
})

const displayOriginalPrice = computed(() => {
  if (!props.product || !props.product.hasDiscount || !props.product.originalPrice) return ''
  return formatCurrency(props.product.originalPrice)
})

const wishlistTooltip = computed(() => {
  const inW = isInWishlist(props.product?.id)
  if (layoutDirection.value === 'ltr') {
    return inW ? 'Remove from Wishlist' : 'Add to Wishlist'
  }
  return inW ? 'إزالة من المفضلة' : 'إضافة للمفضلة'
})

const compareTooltip = computed(() => {
  const inC = isInCompare(props.product?.id)
  if (layoutDirection.value === 'ltr') {
    return inC ? 'Remove from Compare' : 'Add to Compare'
  }
  return inC ? 'إزالة من المقارنة' : 'إضافة للمقارنة'
})

// Computed Dynamic Brand Name
const brandDisplay = computed(() => {
  if (!props.product) return ''
  
  const targetBrandId = props.product.brandId || (typeof props.product.brand === 'object' ? props.product.brand?.id : undefined)
  if (targetBrandId !== undefined && targetBrandId !== null && brands.value.length > 0) {
    const matchedBrand = brands.value.find(b => String(b.id) === String(targetBrandId))
    if (matchedBrand && matchedBrand.name) {
      return matchedBrand.name
    }
  }

  if (typeof props.product.brand === 'object' && props.product.brand?.name) {
    return props.product.brand.name
  }

  if (props.product.brandName && props.product.brandName.trim() !== '') {
    return props.product.brandName
  }

  if (typeof props.product.brand === 'string' && props.product.brand.trim() !== '') {
    return props.product.brand
  }

  if (props.product.category && props.product.category !== 'عام' && props.product.category !== 'General') {
    return props.product.category
  }

  return ''
})

const handleAddToCart = async () => {
  if (isAdding.value || !props.product) return
  isAdding.value = true

  try {
    await addToCart(props.product, 1)
    justAdded.value = true
    setTimeout(() => {
      justAdded.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to add product to cart:', err)
  } finally {
    isAdding.value = false
  }
}
</script>
