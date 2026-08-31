<template>
  <div class="flex flex-col lg:flex-row gap-4 items-stretch max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    
    <!-- Side Banner Wrapper to match slider padding -->
    <div class="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 flex flex-col pt-4">
      <div 
        class="w-full h-[350px] sm:h-[565px] rounded-2xl overflow-hidden shadow-sm relative group bg-slate-100"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <!-- Auto Sliding Banner Images (No arrows, no pagination) -->
        <NuxtLink 
          v-for="(banner, idx) in banners" 
          :key="idx" 
          :to="banner.url || sideBannerUrl || '#'"
          class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          :class="idx === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'"
        >
          <img 
            :src="banner.image" 
            :alt="`Side Banner ${idx + 1}`"
            class="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Products Slider Portion -->
    <div class="flex-1 min-w-0 relative -mx-2 sm:-mx-4 lg:-mx-6 -my-4 lg:my-0">
      <!-- Loading Skeleton State -->
      <div v-if="isLoading && displayProducts.length === 0" class="flex gap-3 sm:gap-6 overflow-hidden py-4 px-4">
        <div 
          v-for="i in 3" 
          :key="i"
          class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-slate-100 rounded-2xl animate-pulse p-4 space-y-3 border border-slate-200"
        >
          <div class="w-full h-44 bg-slate-200 rounded-xl"></div>
          <div class="h-4 bg-slate-200 rounded w-3/4"></div>
          <div class="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
      </div>

      <HomeProductsSliderShowcase 
        v-else
        :products="displayProducts"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import HomeProductsSliderShowcase from '~/components/home/ProductsSliderShowcase.vue'
import { productApiService } from '~/services/productApiService'
import { getProductsByCategory, getProductsByBrand, getNewArrivalProducts } from '~/services/productService'
import type { Product } from '~/types'

const props = defineProps<{
  sideBannerImage?: string
  sideBannerImages?: (string | { image?: string; imageUrl?: string; url?: string; linkUrl?: string })[]
  sideBannerSlides?: { imageUrl?: string; image?: string; linkUrl?: string; url?: string }[]
  sideBannerUrl?: string
  products?: Product[]
  config?: {
    sideBannerImage?: string
    side_banner_image?: string
    sideBannerImages?: (string | { image?: string; imageUrl?: string; url?: string; linkUrl?: string })[]
    side_banner_images?: (string | { image?: string; imageUrl?: string; url?: string; linkUrl?: string })[]
    sideBannerSlides?: { imageUrl?: string; image?: string; linkUrl?: string; url?: string }[]
    sideBannerUrl?: string
    side_banner_url?: string
    category_id?: number | string
    categoryId?: number | string
    category?: string
    sub_category_id?: number | string
    subCategoryId?: number | string
    subCategory?: string
    sub_category?: string
    brandName?: string
    brand_name?: string
    brand_id?: number | string
    brandId?: number | string
    products?: Product[]
    limit?: number
  }
}>()

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null
const apiProducts = ref<Product[]>([])
const isLoading = ref(false)

const resolvedSideBannerUrl = computed(() => {
  return props.config?.sideBannerUrl || props.config?.side_banner_url || props.sideBannerUrl || '#'
})

const resolvedLimit = computed(() => {
  return Number(props.config?.limit) || 5
})

const banners = computed(() => {
  const cfgSlides = props.config?.sideBannerSlides || props.sideBannerSlides
  if (cfgSlides && cfgSlides.length > 0) {
    return cfgSlides.map((slide) => ({
      image: slide.imageUrl || slide.image || '',
      url: slide.linkUrl || slide.url || resolvedSideBannerUrl.value
    }))
  }

  const cfgImages = props.config?.sideBannerImages || props.config?.side_banner_images || props.sideBannerImages
  if (cfgImages && cfgImages.length > 0) {
    return cfgImages.map((img) => 
      typeof img === 'string' 
        ? { image: img, url: resolvedSideBannerUrl.value } 
        : { image: img.imageUrl || img.image || '', url: img.linkUrl || img.url || resolvedSideBannerUrl.value }
    )
  }

  const singleImg = props.config?.sideBannerImage || props.config?.side_banner_image || props.sideBannerImage
  if (singleImg) {
    return [
      { image: singleImg, url: resolvedSideBannerUrl.value },
      { image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', url: '/category/kitchen-appliances' },
      { image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80', url: '/brand/philips' },
    ]
  }

  return [
    { image: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop', url: '/brand/smeg' },
    { image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', url: '/category/kitchen-appliances' },
    { image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80', url: '/brand/philips' },
  ]
})

const fetchSideProducts = async () => {
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
    let fetched: Product[] = []

    const brandId = props.config?.brand_id || props.config?.brandId
    const brandName = props.config?.brandName || props.config?.brand_name
    const targetCatId = props.config?.sub_category_id || props.config?.subCategoryId || props.config?.category_id || props.config?.categoryId
    const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category

    // 1. If both Category and Brand are specified, query searchProducts with multi-params
    if (targetCatId && (brandId || brandName)) {
      const res = await productApiService.searchProducts({
        category_id: targetCatId,
        brand_id: brandId || undefined,
        keyword: brandName || undefined,
        limit
      })
      if (Array.isArray(res.products) && res.products.length > 0) {
        fetched = res.products.slice(0, limit)
      }
    }

    // 2. If subcategory or category ID specified
    if (fetched.length === 0 && targetCatId) {
      const res = await productApiService.fetchFilteredProducts({
        category_id: targetCatId,
        brand_id: brandId || undefined,
        limit
      })
      if (Array.isArray(res.products) && res.products.length > 0) {
        fetched = res.products.slice(0, limit)
      }
    }

    // 3. If brand specified
    if (fetched.length === 0 && (brandId || brandName)) {
      if (brandId) {
        const res = await productApiService.fetchFilteredProducts({ brand_id: brandId, limit })
        if (Array.isArray(res.products) && res.products.length > 0) {
          fetched = res.products.slice(0, limit)
        }
      } else if (brandName) {
        const res = await productApiService.searchProducts({ keyword: brandName, name: brandName, limit })
        if (Array.isArray(res.products) && res.products.length > 0) {
          fetched = res.products.slice(0, limit)
        }
      }
    }

    // 4. Fallback to latest products from backend API
    if (fetched.length === 0) {
      const latestRes = await productApiService.fetchFilteredProducts({ limit })
      if (Array.isArray(latestRes.products) && latestRes.products.length > 0) {
        fetched = latestRes.products.slice(0, limit)
      }
    }

    apiProducts.value = fetched
  } catch (e) {
    console.warn('[SideBannerSliderShowcase] Error fetching side products:', e)
    apiProducts.value = []
  } finally {
    isLoading.value = false
  }
}

const displayProducts = computed<Product[]>(() => {
  return apiProducts.value
})

const startAutoPlay = () => {
  if (timer) clearInterval(timer)
  if (banners.value.length > 1) {
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    }, 4000)
  }
}

const pauseAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

onMounted(() => {
  startAutoPlay()
  fetchSideProducts()
})

onUnmounted(() => {
  pauseAutoPlay()
})

watch(
  () => [
    props.config?.brandName, 
    props.config?.brand_id,
    props.config?.category_id,
    props.config?.category, 
    props.config?.sub_category_id,
    props.config?.subCategory,
    props.config?.limit
  ],
  () => fetchSideProducts(),
  { deep: true }
)
</script>
