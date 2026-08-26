<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16" :dir="layoutDirection">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- 1. Dynamic Breadcrumbs -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- 2. Brand Header Showcase & Other Brands Quick Bar -->
      <div class="mb-8 mt-6">
        <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          
          <div class="flex items-center gap-5 z-10">
            <!-- Brand Logo Frame -->
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">
              <img 
                v-if="displayBrandLogo" 
                :src="displayBrandLogo" 
                :alt="displayBrandName" 
                class="w-full h-full object-contain"
              />
              <div v-else class="w-full h-full rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-2xl uppercase">
                {{ displayBrandName.charAt(0) }}
              </div>
            </div>

            <!-- Brand Info & Total Products (Accurate Live Count from Brand API) -->
            <div class="space-y-1.5">
              <div class="flex items-center gap-3 flex-wrap">
                <h1 class="text-2xl sm:text-3xl font-black text-[#0B0E28]">{{ displayBrandName }}</h1>
                
                <!-- Accurate dynamic count badge -->
                <span 
                  v-if="!productsPending" 
                  class="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100/80"
                >
                  {{ displayTotalCount }} {{ layoutDirection === 'ltr' ? 'Products' : 'منتج' }}
                </span>
                <span v-else class="w-16 h-5 bg-slate-100 rounded-full animate-pulse"></span>
              </div>

              <p class="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">
                {{ layoutDirection === 'ltr' 
                  ? `Discover the latest genuine products and exclusive offers from ${displayBrandName}.` 
                  : `اكتشف أحدث المنتجات الأصلية والعروض الحصرية المتوفرة من ماركة ${displayBrandName}.` }}
              </p>
            </div>
          </div>

          <!-- Quick Return to All Brands / Shop -->
          <NuxtLink 
            to="/shop" 
            class="z-10 px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
          >
            <span>{{ layoutDirection === 'ltr' ? 'All Brands & Products' : 'كافة الماركات والمنتجات' }}</span>
            <i class="fa-solid fa-arrow-left text-[11px] rtl:rotate-0 rotate-180"></i>
          </NuxtLink>

          <!-- Decorative background glow -->
          <div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <!-- Quick Switch Brands Bar -->
        <div v-if="otherBrands && otherBrands.length > 0" class="mt-4 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          <span class="text-xs font-bold text-slate-400 shrink-0 px-1">
            {{ layoutDirection === 'ltr' ? 'Other Brands:' : 'ماركات أخرى:' }}
          </span>
          <NuxtLink
            v-for="b in otherBrands"
            :key="b.id"
            :to="`/brand/${getBrandSlug(b)}`"
            class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-xs"
          >
            <img v-if="b.image || b.logo" :src="b.image || b.logo" :alt="b.name" class="w-4 h-4 object-contain" />
            <span>{{ getBrandName(b) }}</span>
          </NuxtLink>
        </div>
      </div>

      <!-- 3. Main Content Layout (Sidebar & Products Grid) -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        
        <!-- Sidebar Column -->
        <aside class="hidden lg:block w-full lg:w-[280px] shrink-0 sticky top-24 h-fit">
          <ShopFilterSidebar 
            :filters="filters"
            :categories="categories"
            :brands="brands"
            @update-filters="applyFilters"
            @reset-filters="resetFilters"
          />
        </aside>

        <!-- Products Area Column -->
        <main class="flex-1 w-full min-w-0 space-y-6">
          <!-- Toolbar -->
          <ShopToolbar 
            v-model:sortBy="sortBy"
            v-model:viewMode="viewMode"
            :total-results="displayTotalCount"
            :items-per-page="itemsPerPage"
            :active-filters="activeFilterChips"
            @remove-filter="removeFilter"
            @clear-filters="resetFilters"
            @open-mobile-filter="isMobileFilterOpen = true"
          />

          <!-- 1. LOADING STATE: Skeleton Grid -->
          <div v-if="productsPending" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <ProductCardSkeleton v-for="i in itemsPerPage" :key="i" />
          </div>

          <!-- 2. ERROR STATE: Server Error with Retry Action -->
          <div v-else-if="productsError" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-3 my-6">
            <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="text-base font-bold text-red-800">{{ t('category.error_title') }}</h3>
            <p class="text-xs text-red-600 max-w-md mx-auto">{{ productsError }}</p>
            <button 
              @click="initBrandPage"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <i class="fa-solid fa-rotate-right text-xs"></i>
              {{ t('shop.retry') }}
            </button>
          </div>

          <!-- 3. EMPTY STATE: No Products Matching Brand -->
          <EmptyState
            v-else-if="isEmpty || (!productsPending && products.length === 0)"
            :title="layoutDirection === 'ltr' ? `No products found for ${displayBrandName}` : `لا توجد منتجات متوفرة لماركة ${displayBrandName}`"
            :description="layoutDirection === 'ltr' ? 'Try adjusting your filters or browsing other brands.' : 'يرجى تجربة تعديل الفلاتر أو تصفح علامات تجارية أخرى.'"
            :actionText="t('category.reset_filters')"
            @action="resetFilters"
          >
            <template #icon>
              <svg class="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </template>
          </EmptyState>

          <!-- 4. DATA STATE: Dynamic Filtered Products Grid -->
          <div 
            v-else 
            :class="[
              'grid gap-6 w-full',
              viewMode === 'list' 
                ? 'grid-cols-1' 
                : (viewMode === 'grid-4' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3')
            ]"
          >
            <ProductCard 
              v-for="product in products" 
              :key="product.id" 
              :product="product"
              :view-mode="viewMode"
            />
          </div>

          <!-- Pagination -->
          <ShopPagination 
            v-if="!productsPending && products.length > 0 && totalPages > 1"
            v-model:current-page="currentPage"
            :total-pages="totalPages"
            class="pt-6"
          />
        </main>

      </div>

      <!-- Mobile Drawer Filter -->
      <ShopMobileFilterDrawer 
        :is-open="isMobileFilterOpen"
        :filters="filters"
        :categories="categories"
        :brands="brands"
        @close="isMobileFilterOpen = false"
        @update-filters="applyFilters"
        @reset-filters="resetFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  name: 'brand-catchall'
})

import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useCategories } from '~/composables/useCategories'
import { useBrands } from '~/composables/useBrands'
import { useLanguage } from '~/composables/useLanguage'
import { getProductsByBrand } from '~/services/productService'

// Import UI Components
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ShopToolbar from '~/components/Shop/ShopToolbar.vue'
import ShopFilterSidebar from '~/components/Shop/ShopFilterSidebar.vue'
import ShopMobileFilterDrawer from '~/components/Shop/ShopMobileFilterDrawer.vue'
import ShopPagination from '~/components/Shop/ShopPagination.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductCardSkeleton from '~/components/product/ProductCardSkeleton.vue'
import EmptyState from '~/components/common/EmptyState.vue'

const route = useRoute()
const { t, apiLocale, currentLanguage, layoutDirection } = useLanguage()

// Composables
const { products, pending: productsPending, error: productsError, isEmpty, totalProducts, fetchFilteredProducts } = useProducts()
const { categories, loadCategories } = useCategories()
const { brands, loadBrands } = useBrands()

// Parse route slug parameter (e.g. 'philips' or '1')
const routeSlug = computed<string>(() => {
  const s = route.params.slug
  if (!s) return ''
  if (Array.isArray(s)) return s.join('-')
  return String(s)
})

// Brand Helper Functions
const getBrandSlug = (b: any): string => {
  if (!b) return ''
  if (b.slug) return String(b.slug)
  const name = b.name_en || b.name || String(b.id)
  return name.toLowerCase().replace(/\s+/g, '-')
}

const getBrandName = (b: any): string => {
  if (!b) return ''
  if (currentLanguage.value === 'en') {
    return b.name_en || b.name || b.name_ar || ''
  }
  return b.name_ar || b.name || b.name_en || ''
}

// Match current brand from brands composable
const currentBrand = computed(() => {
  const slug = routeSlug.value.toLowerCase().trim()
  if (!slug) return null

  return brands.value.find(b => {
    const bId = String(b.id).toLowerCase()
    const bName = (b.name || '').toLowerCase()
    const bNameAr = (b.name_ar || '').toLowerCase()
    const bNameEn = (b.name_en || '').toLowerCase()
    const bSlug = getBrandSlug(b).toLowerCase()
    
    return bId === slug || bSlug === slug || bName === slug || bNameEn === slug || bNameAr === slug
  }) || null
})

// Display Brand Name
const displayBrandName = computed(() => {
  if (currentBrand.value) {
    return getBrandName(currentBrand.value)
  }
  const raw = routeSlug.value
  return raw ? raw.replace(/-/g, ' ').toUpperCase() : (layoutDirection.value === 'ltr' ? 'Brand' : 'العلامة التجارية')
})

// Display Brand Logo (Actual Brand Logo Image from Backend)
const displayBrandLogo = computed(() => {
  if (currentBrand.value) {
    return currentBrand.value.image || (currentBrand.value as any).logo || (currentBrand.value as any).image_full_url || ''
  }
  return ''
})

// Accurate Total Products Count for this Brand
const displayTotalCount = computed(() => {
  if (productsPending.value) return 0
  return totalProducts.value || products.value.length || 0
})

// Quick Switch Other Brands List
const otherBrands = computed(() => {
  if (!brands.value || brands.value.length === 0) return []
  const currentId = currentBrand.value?.id
  return brands.value.filter(b => b.id !== currentId).slice(0, 10)
})

// Dynamic Breadcrumb Trail
const breadcrumbItems = computed(() => {
  const isEn = layoutDirection.value === 'ltr'
  return [
    { label: isEn ? 'Home' : 'الرئيسية', to: '/' },
    { label: isEn ? 'Shop' : 'المتجر', to: '/shop' },
    { label: displayBrandName.value }
  ]
})

// Toolbar & Pagination State
const viewMode = ref<'grid-4' | 'grid-3' | 'list'>('grid-4')
const sortBy = ref('default')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const isMobileFilterOpen = ref(false)

// Default Clean Filters State
const defaultFilters = {
  priceMin: null as number | null,
  priceMax: null as number | null,
  brands: [] as (string | number)[],
  categoryId: [] as (string | number)[],
  inStock: false
}
const filters = ref({ ...defaultFilters })

// Computed Total Pages
const totalPages = computed(() => Math.ceil((displayTotalCount.value || 1) / itemsPerPage.value))

// Active Filter Chips
const activeFilterChips = computed(() => {
  const chips: { id: string; label: string }[] = []
  const isEn = layoutDirection.value === 'ltr'

  if (filters.value.priceMin || filters.value.priceMax) {
    const min = filters.value.priceMin || 0
    const max = filters.value.priceMax || (isEn ? 'All' : 'الكل')
    chips.push({ id: 'price', label: isEn ? `Price: ${min} - ${max} SAR` : `السعر: ${min} - ${max} ر.س` })
  }
  if (filters.value.categoryId.length) {
    chips.push({ id: 'category', label: isEn ? `${filters.value.categoryId.length} Categories` : `${filters.value.categoryId.length} أقسام` })
  }
  if (filters.value.inStock) {
    chips.push({ id: 'inStock', label: isEn ? 'In Stock' : 'متاح بالمخزون' })
  }
  return chips
})

// Fetch Brand Products Action
const fetchBrandProducts = async () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Ensure brands list is available
  if (brands.value.length === 0) {
    await loadBrands(true)
  }
  if (categories.value.length === 0) {
    loadCategories()
  }

  const brandId = currentBrand.value?.id || (!isNaN(Number(routeSlug.value)) ? Number(routeSlug.value) : undefined)
  const selectedCategoryId = filters.value.categoryId.length > 0 ? filters.value.categoryId[0] : undefined

  // 1. Primary: If brand_id is identified, fetch using the official Brand Filter API (/api/v1/brands/products/{brand_id})
  if (brandId) {
    await fetchFilteredProducts({
      brand_id: brandId,
      category_id: selectedCategoryId || undefined,
      locale: apiLocale.value,
      limit: itemsPerPage.value,
      page: currentPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
      min_price: filters.value.priceMin || undefined,
      max_price: filters.value.priceMax || undefined,
      sort_by: sortBy.value === 'default' ? 'latest' : (sortBy.value as any)
    })
  } else {
    // 2. Secondary: If only brand slug name is in route, search specifically by name keyword
    const searchKeyword = currentBrand.value?.name || routeSlug.value.replace(/-/g, ' ')
    await fetchFilteredProducts({
      search: searchKeyword,
      category_id: selectedCategoryId || undefined,
      locale: apiLocale.value,
      limit: itemsPerPage.value,
      page: currentPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value,
      min_price: filters.value.priceMin || undefined,
      max_price: filters.value.priceMax || undefined,
      sort_by: sortBy.value === 'default' ? 'latest' : (sortBy.value as any)
    })
  }

  // 3. Fallback: If API returns empty products array, check local mock products for that brand
  if (products.value.length === 0) {
    const mockList = getProductsByBrand(displayBrandName.value)
    if (mockList.length > 0) {
      products.value = mockList
      totalProducts.value = mockList.length
    }
  }
}

// Initial Clean Page Setup
const initBrandPage = async () => {
  filters.value = { ...defaultFilters }
  currentPage.value = 1
  if (brands.value.length === 0) {
    await loadBrands(true)
  }
  if (categories.value.length === 0) {
    loadCategories()
  }
  await fetchBrandProducts()
}

// Handlers
const applyFilters = (newFilters: any) => {
  filters.value = { ...newFilters }
  currentPage.value = 1
  fetchBrandProducts()
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  currentPage.value = 1
  fetchBrandProducts()
}

const removeFilter = (id: string) => {
  if (id === 'price') {
    filters.value.priceMin = null
    filters.value.priceMax = null
  } else if (id === 'category') {
    filters.value.categoryId = []
  } else {
    (filters.value as any)[id] = false
  }
  fetchBrandProducts()
}

// Watchers
watch([currentPage, sortBy], () => {
  fetchBrandProducts()
})

watch(filters, () => {
  currentPage.value = 1
  fetchBrandProducts()
}, { deep: true })

watch(() => route.params.slug, () => {
  initBrandPage()
})

watch([apiLocale, currentLanguage], () => {
  initBrandPage()
})

onMounted(() => {
  initBrandPage()
})

useHead({
  title: computed(() => `${displayBrandName.value} | ${layoutDirection.value === 'ltr' ? 'Aswar Jeddah' : 'أسوار جدة'}`)
})
</script>
