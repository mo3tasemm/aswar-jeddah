<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    <div 
      :class="['rounded-3xl py-4 px-4 sm:px-6 relative overflow-hidden shadow-sm transition-all', resolvedBgColor.startsWith('bg-') ? resolvedBgColor : '']"
      :style="resolvedBgStyle"
    >      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 px-2">
        
        <!-- Right Side: Title & Badge -->
        <div class="text-right">
          <!-- Badge -->
          <div class="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold inline-flex items-center gap-1 mb-1 shadow-sm">
            <span>✦ وصل حديثاً</span>
          </div>
          
          <h2 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug">
            {{ resolvedTitle }}
          </h2>
          <p v-if="resolvedSubtitle" class="text-xs md:text-sm text-slate-800/80 mt-0.5 font-medium">
            {{ resolvedSubtitle }}
          </p>
        </div>
        
        <!-- Left Side: Button (Links to active working shop route) -->
        <div class="flex-shrink-0 mt-2 md:mt-0">
          <NuxtLink 
            :to="resolvedShopUrl" 
            class="bg-white text-slate-900 hover:bg-slate-50 font-bold px-5 py-2 rounded-full shadow-sm border border-white/50 transition-all inline-flex items-center gap-2 text-sm shadow-xs cursor-pointer"
          >
            <span>تسوق الآن</span>
            <!-- Arrow -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Slider Container -->
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

        <!-- Products Slider -->
        <div v-else class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4">
          <ProductCard 
            v-for="product in displayProducts" 
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
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { productApiService } from '~/services/productApiService'
import { getNewArrivalProducts } from '~/services/productService'
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
