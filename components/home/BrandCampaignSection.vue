<template>
  <div class="mb-8">
    <HomeBrandBannerShowcase 
      :title="resolvedTitle"
      :btnText="resolvedBtnText"
      :targetUrl="resolvedTargetUrl"
      :bannerImage="resolvedBannerImage"
    />
    
    <div class="-mt-4 relative z-10">
      <!-- Loading Skeleton State -->
      <div v-if="isLoading && displayProducts.length === 0" class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
        <div class="flex gap-3 sm:gap-6 overflow-hidden pb-4">
          <div 
            v-for="i in 4" 
            :key="i"
            class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-slate-100 rounded-2xl animate-pulse p-4 space-y-3 border border-slate-200"
          >
            <div class="w-full h-44 bg-slate-200 rounded-xl"></div>
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-4 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Products Slider -->
      <HomeProductsSliderShowcase 
        v-else
        :viewAllUrl="resolvedTargetUrl"
        :products="displayProducts"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import HomeBrandBannerShowcase from '~/components/home/BrandBannerShowcase.vue'
import HomeProductsSliderShowcase from '~/components/home/ProductsSliderShowcase.vue'
import { productApiService } from '~/services/productApiService'
import { getProductsByCategory, getProductsByBrand, getNewArrivalProducts } from '~/services/productService'
import type { Product } from '~/types'

const props = defineProps<{
  title?: string
  btnText?: string
  targetUrl?: string
  bannerImage?: string
  products?: Product[]
  config?: {
    title?: string
    btnText?: string
    btn_text?: string
    targetUrl?: string
    target_url?: string
    bannerImage?: string
    banner_image?: string
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

import { useLanguage } from '~/composables/useLanguage'

const { currentLanguage } = useLanguage()
const apiProducts = ref<Product[]>([])
const isLoading = ref(false)

const resolvedTitle = computed(() => {
  if (currentLanguage.value === 'en') {
    return (props.config as any)?.title_en || props.config?.title || props.title || 'Special Offers & Discounts'
  }
  return props.config?.title || props.title || 'خصومات وعروض مميزة'
})

const resolvedBtnText = computed(() => {
  if (currentLanguage.value === 'en') {
    return (props.config as any)?.btnText_en || (props.config as any)?.btn_text_en || 'Shop Now'
  }
  return props.config?.btnText || props.config?.btn_text || props.btnText || 'تسوق الآن'
})

const resolvedTargetUrl = computed(() => {
  return props.config?.targetUrl || props.config?.target_url || props.targetUrl || '/shop'
})

const resolvedBannerImage = computed(() => {
  return props.config?.bannerImage || props.config?.banner_image || props.bannerImage || 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80'
})

const resolvedLimit = computed(() => {
  return Number(props.config?.limit) || 5
})

const fetchCampaignProducts = async () => {
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
    if (targetCatId && brandId) {
      const res = await productApiService.searchProducts({
        category_id: targetCatId,
        brand_id: brandId,
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

    // 3. If brand ID specified
    if (fetched.length === 0 && brandId) {
      const res = await productApiService.fetchFilteredProducts({
        brand_id: brandId,
        limit
      })
      if (Array.isArray(res.products) && res.products.length > 0) {
        fetched = res.products.slice(0, limit)
      }
    }

    // 4. If only text names are available, search by keywords
    if (fetched.length === 0 && (brandName || catName)) {
      const searchTerms = [brandName, catName].filter(Boolean).join(' ')
      const res = await productApiService.searchProducts({
        keyword: searchTerms,
        name: searchTerms,
        limit
      })
      if (Array.isArray(res.products) && res.products.length > 0) {
        fetched = res.products.slice(0, limit)
      }
    }

    // 5. Fallbacks
    if (fetched.length === 0) {
      if (brandName) {
        const byBrand = getProductsByBrand(brandName)
        if (byBrand.length > 0) fetched = byBrand.slice(0, limit)
      }
      if (fetched.length === 0 && catName) {
        const byCat = getProductsByCategory(catName)
        if (byCat.length > 0) fetched = byCat.slice(0, limit)
      }
      if (fetched.length === 0) {
        const latest = await productApiService.fetchFilteredProducts({ limit })
        if (Array.isArray(latest.products) && latest.products.length > 0) {
          fetched = latest.products.slice(0, limit)
        } else {
          fetched = getNewArrivalProducts().slice(0, limit)
        }
      }
    }

    apiProducts.value = fetched
  } catch (e) {
    console.warn('[BrandCampaignSection] Error fetching campaign products:', e)
    apiProducts.value = getNewArrivalProducts().slice(0, resolvedLimit.value)
  } finally {
    isLoading.value = false
  }
}

const displayProducts = computed<Product[]>(() => {
  if (apiProducts.value.length > 0) return apiProducts.value
  const limit = resolvedLimit.value
  const brandName = props.config?.brandName || props.config?.brand_name
  const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category
  
  if (brandName) {
    return getProductsByBrand(brandName).slice(0, limit)
  }
  if (catName) {
    return getProductsByCategory(catName).slice(0, limit)
  }
  return getNewArrivalProducts().slice(0, limit)
})

onMounted(() => {
  fetchCampaignProducts()
})

watch(
  () => [
    props.config?.brand_id, 
    props.config?.brandName, 
    props.config?.category_id, 
    props.config?.category, 
    props.config?.sub_category_id, 
    props.config?.subCategory, 
    props.config?.limit
  ],
  () => fetchCampaignProducts(),
  { deep: true }
)
</script>
