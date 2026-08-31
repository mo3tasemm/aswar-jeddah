<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4 select-none">
    <div 
      :class="['rounded-3xl py-5 px-4 sm:px-6 relative overflow-hidden shadow-sm transition-all group', resolvedBgColor.startsWith('bg-') ? resolvedBgColor : '']"
      :style="resolvedBgStyle"
    >      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-5 gap-3 px-2">
        
        <!-- Right Side: Title & Badge -->
        <div class="text-start">
          <!-- Badge -->
          <div class="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-[10px] md:text-xs font-black inline-flex items-center gap-1 mb-1.5 shadow-xs">
            <span class="text-amber-500">✦</span>
            <span>وصل حديثاً</span>
          </div>
          
          <h2 class="text-xl md:text-2xl font-black text-slate-900 tracking-tight leading-snug">
            {{ resolvedTitle }}
          </h2>
          <p v-if="resolvedSubtitle" class="text-xs md:text-sm text-slate-700/90 mt-0.5 font-medium">
            {{ resolvedSubtitle }}
          </p>
        </div>
        
        <!-- Left Side: Navigation Arrows & Shop Now Button -->
        <div class="flex items-center gap-2 mt-2 md:mt-0">
          <!-- Left / Right Arrows -->
          <div class="flex items-center gap-1.5 me-1">
            <button 
              type="button"
              @click="scrollRight()"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 hover:bg-white text-slate-900 transition-all flex items-center justify-center backdrop-blur-md active:scale-95 cursor-pointer shadow-xs border border-white/60"
              title="السابق (يمين)"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button 
              type="button"
              @click="scrollLeft()"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/90 hover:bg-white text-slate-900 transition-all flex items-center justify-center backdrop-blur-md active:scale-95 cursor-pointer shadow-xs border border-white/60"
              title="التالي (يسار)"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          <NuxtLink 
            :to="resolvedShopUrl" 
            class="bg-[#0B0E28] hover:bg-slate-900 text-white font-black px-5 py-2.5 rounded-xl shadow-sm transition-all inline-flex items-center gap-2 text-xs sm:text-sm active:scale-95 cursor-pointer"
          >
            <span>تسوق الآن</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Slider Container with Mouse Drag -->
      <div class="relative w-full">
        <!-- Skeleton Loading State -->
        <div v-if="isLoading && displayProducts.length === 0" class="flex gap-3 sm:gap-6 overflow-hidden pb-4">
          <div 
            v-for="i in 4" 
            :key="i"
            class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-white/40 rounded-2xl animate-pulse p-4 space-y-3"
          >
            <div class="w-full h-44 bg-white/50 rounded-xl"></div>
            <div class="h-4 bg-white/60 rounded w-3/4"></div>
            <div class="h-4 bg-white/50 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Products Slider with Drag to Scroll -->
        <div 
          v-else 
          ref="sliderRef"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
          @click.capture="onClickCapture"
          class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 cursor-grab active:cursor-grabbing"
        >
          <ProductCard 
            v-for="product in displayProducts" 
            :key="product.id" 
            :product="product"
            class="snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] shadow-sm hover:shadow-xl"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { productApiService } from '~/services/productApiService'
import { getNewArrivalProducts } from '~/services/productService'
import { useSliderDrag } from '~/composables/useSliderDrag'
import type { Product } from '~/types'

const props = defineProps<{
  products?: Product[]
  shopUrl?: string
  bgColor?: string
  config?: {
    title?: string
    subtitle?: string
    shopUrl?: string
    shop_url?: string
    bgColor?: string
    bg_color?: string
    products?: Product[]
    limit?: number
  }
}>()

const apiProducts = ref<Product[]>([])
const isLoading = ref<boolean>(false)

const {
  sliderRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onClickCapture,
  scrollLeft,
  scrollRight
} = useSliderDrag({ scrollAmount: 320 })

const resolvedTitle = computed(() => {
  return props.config?.title || 'أجهزة كهربائية وصلت حديثاً'
})

const resolvedSubtitle = computed(() => {
  return props.config?.subtitle !== undefined ? props.config.subtitle : 'اكتشف أحدث الأجهزة المنزلية بأفضل الأسعار'
})

const resolvedLimit = computed(() => {
  return Number(props.config?.limit) || 8
})

const resolvedBgColor = computed(() => {
  return props.config?.bgColor || props.config?.bg_color || props.bgColor || 'bg-[#7dd3fc]'
})

const resolvedBgStyle = computed(() => {
  const bg = resolvedBgColor.value
  if (!bg) return { backgroundColor: '#7dd3fc' }
  
  if (bg.startsWith('#') || bg.startsWith('rgb')) {
    return { backgroundColor: bg }
  }
  
  const hexMatch = bg.match(/bg-\[(#[0-9A-Fa-f]{3,8})\]/)
  if (hexMatch && hexMatch[1]) {
    return { backgroundColor: hexMatch[1] }
  }
  
  return {}
})

// Ensures navigation leads to an active working route (e.g. /shop?sort_by=latest)
const resolvedShopUrl = computed(() => {
  const url = props.config?.shopUrl || props.config?.shop_url || props.shopUrl
  if (!url || url === '/new-arrivals' || url === 'new-arrivals') {
    return '/shop?sort_by=latest'
  }
  return url
})

// Fetch live new arrival products from Wedgetstore latest API
const fetchNewArrivals = async () => {
  if (props.config?.products && props.config.products.length > 0) {
    apiProducts.value = props.config.products
    return
  }
  if (props.products && props.products.length > 0) {
    apiProducts.value = props.products
    return
  }

  isLoading.value = true
  try {
    const limit = resolvedLimit.value
    const res = await productApiService.fetchFilteredProducts({
      sort_by: 'latest',
      limit
    })

    if (Array.isArray(res.products) && res.products.length > 0) {
      apiProducts.value = res.products.slice(0, limit)
    } else {
      apiProducts.value = getNewArrivalProducts().slice(0, limit)
    }
  } catch (err) {
    console.warn('[NewArrivalsShowcase] Error fetching latest products:', err)
    apiProducts.value = getNewArrivalProducts().slice(0, resolvedLimit.value)
  } finally {
    isLoading.value = false
  }
}

const displayProducts = computed<Product[]>(() => {
  return apiProducts.value.length > 0
    ? apiProducts.value
    : getNewArrivalProducts().slice(0, resolvedLimit.value)
})

onMounted(() => {
  fetchNewArrivals()
})

watch(
  () => [props.config?.limit],
  () => fetchNewArrivals()
)
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
