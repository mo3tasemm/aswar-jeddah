<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    <div class="container mx-auto px-4 max-w-7xl py-6 sm:py-8">
      
      <!-- 1. Breadcrumb -->
      <ShopBreadcrumb :tiers="breadcrumbTiers" />

      <!-- 2. Header & Search Query -->
      <div class="mb-8 mt-6">
        <h1 class="text-2xl font-bold text-[#0B0E28] mb-2 text-start">
          {{ searchHeaderTitle }}: <span class="text-amber-500">"{{ searchQuery }}"</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium text-start">
          {{ searchFoundCountText }}
        </p>
      </div>

      <!-- 3. Main Content Layout -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        
        <!-- Sidebar Column -->
        <aside class="hidden lg:block w-full lg:w-[280px] shrink-0 sticky top-24 h-fit">
          <ShopFilterSidebar 
            :filters="filters"
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
            :total-results="totalResults"
            :items-per-page="itemsPerPage"
            :active-filters="activeFilterChips"
            @remove-filter="removeFilter"
            @clear-filters="resetFilters"
            @open-mobile-filter="isMobileFilterOpen = true"
          />

          <!-- Loading State (Skeleton Loader) -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <div v-for="i in itemsPerPage" :key="i" class="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse flex flex-col gap-4">
              <div class="bg-slate-200/80 rounded-xl w-full aspect-square"></div>
              <div class="flex-1 space-y-3 w-full">
                <div class="h-4 bg-slate-200/80 rounded-full w-3/4"></div>
                <div class="h-3 bg-slate-200/80 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="products.length === 0" class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center justify-center min-h-[400px] w-full space-y-6">
            <div class="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto text-3xl shadow-inner">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <div class="space-y-2 max-w-md mx-auto">
              <h3 class="text-xl font-black text-[#0B0E28]">{{ t('shop.no_products_title') }}</h3>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {{ layoutDirection === 'ltr' ? `No products found matching "${searchQuery}". Try broader search terms.` : `لم نجد أي منتجات تطابق "${searchQuery}". جرب استخدام كلمات بحث عامة.` }}
              </p>
            </div>
            <button 
              @click="resetFilters"
              class="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 cursor-pointer"
            >
              {{ t('shop.reset_filters') }}
            </button>
          </div>

          <!-- Products Grid -->
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
            v-if="!isLoading && products.length > 0"
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
        @close="isMobileFilterOpen = false"
        @update-filters="applyFilters"
        @reset-filters="resetFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Product } from '~/types/product'
import { productApiService } from '~/services/productApiService'
import { useLanguage } from '~/composables/useLanguage'

// Import Components
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import ShopToolbar from '~/components/Shop/ShopToolbar.vue'
import ShopFilterSidebar from '~/components/Shop/ShopFilterSidebar.vue'
import ShopMobileFilterDrawer from '~/components/Shop/ShopMobileFilterDrawer.vue'
import ShopPagination from '~/components/Shop/ShopPagination.vue'
import ProductCard from '~/components/product/ProductCard.vue'

const route = useRoute()
const { t, layoutDirection, currentLanguage } = useLanguage()

const searchQuery = ref((route.query.q || route.query.name || '') as string)

const searchHeaderTitle = computed(() => {
  return layoutDirection.value === 'ltr' ? 'Search Results for' : 'نتائج البحث عن'
})

const searchFoundCountText = computed(() => {
  if (layoutDirection.value === 'ltr') {
    return `Found ${totalResults.value} products`
  }
  return `تم العثور على ${totalResults.value} منتج`
})

useHead({
  title: computed(() => `${searchHeaderTitle.value}: ${searchQuery.value || 'All'} | أسوار جدة`)
})

// === Breadcrumbs ===
const breadcrumbTiers = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: searchHeaderTitle.value, path: '#' },
])

// === State ===
const isLoading = ref(true)
const isMobileFilterOpen = ref(false)
const products = ref<Product[]>([])

const viewMode = ref('grid-4')
const sortBy = ref('default')
const currentPage = ref(1)
const totalPages = ref(1)
const itemsPerPage = ref(12)
const totalResults = ref(0)

const defaultFilters = {
  priceMin: null,
  priceMax: null,
  brands: [],
  colors: [],
  inStock: false,
  onSale: false,
  freeShipping: false
}
const filters = ref({ ...defaultFilters })

// === Active Filter Chips ===
const activeFilterChips = computed(() => {
  const chips = []
  if (filters.value.priceMin || filters.value.priceMax) {
    chips.push({ id: 'price', label: `${t('product.price')}: ${filters.value.priceMin || 0} - ${filters.value.priceMax || 'Max'}` })
  }
  if (filters.value.brands.length) {
    chips.push({ id: 'brands', label: `${filters.value.brands.length} ${layoutDirection.value === 'ltr' ? 'Brands' : 'ماركات'}` })
  }
  if (filters.value.inStock) chips.push({ id: 'inStock', label: t('product.in_stock') })
  return chips
})

// === Fetch Products Method ===
const fetchProducts = async () => {
  isLoading.value = true
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  try {
    const res = await productApiService.searchProducts({
      name: searchQuery.value,
      keyword: searchQuery.value,
      min_price: filters.value.priceMin ? Number(filters.value.priceMin) : undefined,
      max_price: filters.value.priceMax ? Number(filters.value.priceMax) : undefined,
      sort_by: sortBy.value,
      limit: itemsPerPage.value,
      offset: (currentPage.value - 1) * itemsPerPage.value
    })

    products.value = res.products
    totalResults.value = res.total
    totalPages.value = Math.max(1, Math.ceil(res.total / itemsPerPage.value))
  } catch (err) {
    console.warn('[SearchPage] Fetch error:', err)
    products.value = []
    totalResults.value = 0
  } finally {
    isLoading.value = false
  }
}

// === Methods ===
const applyFilters = (newFilters: any) => {
  filters.value = { ...newFilters }
  currentPage.value = 1
  fetchProducts()
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  currentPage.value = 1
  fetchProducts()
}

const removeFilter = (id: string) => {
  if (id === 'price') {
    filters.value.priceMin = null
    filters.value.priceMax = null
  } else if (id === 'brands') {
    filters.value.brands = []
  } else if (id === 'colors') {
    filters.value.colors = []
  } else {
    (filters.value as any)[id] = false
  }
  currentPage.value = 1
  fetchProducts()
}

// === Reactive Watchers ===
watch([sortBy, currentPage, currentLanguage], () => {
  fetchProducts()
})

watch(() => route.query.q, (newQ) => {
  searchQuery.value = (newQ || '') as string
  currentPage.value = 1
  fetchProducts()
})

onMounted(() => {
  fetchProducts()
})
</script>
