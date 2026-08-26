<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    <div :class="`rounded-2xl p-4 md:p-6 overflow-hidden ${resolvedBgColor} shadow-sm transition-all`">
      
      <!-- Header -->
      <div class="flex flex-col md:flex-row items-center justify-between mb-6 px-2 gap-4">
        
        <!-- Title & Subtitle -->
        <div class="w-full md:w-1/3 text-center md:text-right">
          <h2 class="text-base md:text-lg font-black text-white">{{ resolvedTitle }}</h2>
          <p v-if="resolvedSubtitle" class="text-xs md:text-sm text-white/80 mt-1 font-medium">{{ resolvedSubtitle }}</p>
        </div>
        
        <!-- Brand Name or Logo -->
        <div class="w-full md:w-1/3 text-center flex justify-center items-center order-first md:order-none">
          <div v-if="resolvedBrandLogo" class="h-12 md:h-14 max-w-[180px] bg-white/10 backdrop-blur-xs rounded-xl p-2 flex items-center justify-center">
            <img :src="resolvedBrandLogo" :alt="resolvedBrandName" class="h-full w-full object-contain filter drop-shadow-sm" />
          </div>
          <h3 v-else class="text-2xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-xs">{{ resolvedBrandName }}</h3>
        </div>

        <!-- View All Button -->
        <div class="w-full md:w-1/3 flex justify-center md:justify-end">
          <NuxtLink :to="resolvedViewAllUrl" :class="['font-bold text-xs md:text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-sm', resolvedBtnColor || 'bg-white text-slate-900 hover:bg-slate-50']">
            <span>عرض الكل</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Slider Container -->
      <div class="relative w-full">
        
        <!-- Loading Skeleton -->
        <div v-if="isLoadingProducts && displayProducts.length === 0" class="flex gap-3 sm:gap-6 overflow-hidden pb-4">
          <div 
            v-for="i in 4" 
            :key="i"
            class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-white/20 rounded-2xl animate-pulse p-4 space-y-3"
          >
            <div class="w-full h-44 bg-white/30 rounded-xl"></div>
            <div class="h-4 bg-white/40 rounded w-3/4"></div>
            <div class="h-4 bg-white/30 rounded w-1/2"></div>
          </div>
        </div>

        <!-- Products Slider -->
        <div v-else class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4">
          <ProductCard 
            v-for="product in displayProducts" 
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
import { ref, computed, onMounted, watch } from 'vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { productApiService } from '~/services/productApiService'
import { getProductsByBrand } from '~/services/productService'
import type { Product } from '~/types'

const props = defineProps<{
  brandName?: string
  brand_id?: number | string
  title?: string
  viewAllUrl?: string
  bgColor?: string
  products?: Product[]
  subtitle?: string
  btnColor?: string
  brandLogo?: string
  config?: {
    brand_id?: number | string
    brandId?: number | string
    brandName?: string
    brand_name?: string
    title?: string
    subtitle?: string
    brandLogo?: string
    brand_logo?: string
    viewAllUrl?: string
    view_all_url?: string
    bgColor?: string
    bg_color?: string
    btnColor?: string
    btn_color?: string
    products?: Product[]
    limit?: number
  }
}>()

const apiProducts = ref<Product[]>([])
const isLoadingProducts = ref(false)

const resolvedBrandId = computed(() => {
  return props.config?.brand_id || props.config?.brandId || props.brand_id || ''
})

const resolvedBrandName = computed(() => {
  return props.config?.brandName || props.config?.brand_name || props.brandName || 'PHILIPS'
})

const resolvedTitle = computed(() => {
  return props.config?.title || props.title || `منتجات ${resolvedBrandName.value} العالمية`
})

const resolvedSubtitle = computed(() => {
  return props.config?.subtitle || props.subtitle || ''
})

const resolvedBrandLogo = computed(() => {
  return props.config?.brandLogo || props.config?.brand_logo || props.brandLogo || ''
})

const resolvedViewAllUrl = computed(() => {
  return props.config?.viewAllUrl || props.config?.view_all_url || props.viewAllUrl || (resolvedBrandName.value ? `/brand/${resolvedBrandName.value.toLowerCase().replace(/\s+/g, '-')}` : '/shop')
})

const resolvedBgColor = computed(() => {
  return props.config?.bgColor || props.config?.bg_color || props.bgColor || 'bg-[#1a66cc]'
})

const resolvedBtnColor = computed(() => {
  return props.config?.btnColor || props.config?.btn_color || props.btnColor || ''
})

const resolvedLimit = computed(() => {
  return Number(props.config?.limit) || 6
})

// Fetch live products for this brand
const fetchShowcaseProducts = async () => {
  // If static products were directly passed in props, use them
  if (props.config?.products && props.config.products.length > 0) {
    apiProducts.value = props.config.products
    return
  }
  if (props.products && props.products.length > 0) {
    apiProducts.value = props.products
    return
  }

  isLoadingProducts.value = true
  try {
    const limit = resolvedLimit.value
    let fetched: Product[] = []

    // 1. Fetch by Brand ID from backend API
    const brandId = resolvedBrandId.value
    if (brandId) {
      const res = await productApiService.fetchFilteredProducts({
        brand_id: brandId,
        limit
      })
      if (Array.isArray(res.products) && res.products.length > 0) {
        fetched = res.products.slice(0, limit)
      }
    }

    // 2. If empty or no brand_id, search by brand name keyword
    if (fetched.length === 0 && resolvedBrandName.value) {
      const searchRes = await productApiService.searchProducts({
        keyword: resolvedBrandName.value,
        name: resolvedBrandName.value,
        limit
      })
      if (Array.isArray(searchRes.products) && searchRes.products.length > 0) {
        fetched = searchRes.products.slice(0, limit)
      }
    }

    // 3. Fallback: query local mock products or latest products if backend has no items for this brand yet
    if (fetched.length === 0) {
      const mockList = getProductsByBrand(resolvedBrandName.value)
      if (mockList.length > 0) {
        fetched = mockList.slice(0, limit)
      } else {
        const latestRes = await productApiService.fetchFilteredProducts({ limit })
        fetched = latestRes.products.slice(0, limit)
      }
    }

    apiProducts.value = fetched
  } catch (err) {
    console.warn('[BrandShowcase] Error loading brand products:', err)
    apiProducts.value = getProductsByBrand(resolvedBrandName.value).slice(0, resolvedLimit.value)
  } finally {
    isLoadingProducts.value = false
  }
}

const displayProducts = computed<Product[]>(() => {
  return apiProducts.value.length > 0 
    ? apiProducts.value 
    : getProductsByBrand(resolvedBrandName.value).slice(0, resolvedLimit.value)
})

onMounted(() => {
  fetchShowcaseProducts()
})

watch(
  [resolvedBrandId, resolvedBrandName, resolvedLimit],
  () => {
    fetchShowcaseProducts()
  },
  { deep: true }
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
