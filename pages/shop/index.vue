<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    <div class="container mx-auto px-4 max-w-7xl py-6 sm:py-8">
      
      <!-- 1. Breadcrumbs -->
      <ShopBreadcrumb :tiers="breadcrumbTiers" />

      <!-- 2. Header & Live Categories Hierarchy Bar -->
      <div class="mb-6 mt-4">
        <h1 class="text-2xl sm:text-3xl font-black text-[#0B0E28] mb-2 text-start">{{ t('shop.title') }}</h1>
        <p class="text-xs sm:text-sm text-slate-500 mb-6 text-start">{{ t('shop.subtitle') }}</p>
        
        <CategoryHierarchyBar 
          v-if="categories && categories.length > 0" 
          :categories="categories" 
          :selected-category-id="selectedCategoryId"
          @select-category="handleCategorySelect"
        />
      </div>

      <!-- 3. Main Content Layout -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        
        <!-- Sidebar Column (Live Filters Sidebar) -->
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
            :total-results="totalProducts || products.length"
            :items-per-page="itemsPerPage"
            :active-filters="activeFilterChips"
            @remove-filter="removeFilter"
            @clear-filters="resetFilters"
            @open-mobile-filter="isMobileFilterOpen = true"
          />

          <!-- 1. LOADING STATE: Skeleton Loaders -->
          <div v-if="productsPending" :class="gridClass">
            <ProductCardSkeleton v-for="i in itemsPerPage" :key="i" />
          </div>

          <!-- 2. ERROR STATE: Server Error with Retry Action -->
          <div v-else-if="productsError" class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-3 my-6">
            <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
              <i class="fa-solid fa-triangle-exclamation"></i>
            </div>
            <h3 class="text-base font-bold text-red-800">{{ layoutDirection === 'ltr' ? 'Failed to load products from server' : 'تعذر تحميل المنتجات من السيرفر' }}</h3>
            <p class="text-xs text-red-600 max-w-md mx-auto">{{ productsError }}</p>
            <button 
              @click="fetchShopProducts"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <i class="fa-solid fa-rotate-right text-xs"></i>
              {{ t('shop.retry') }}
            </button>
          </div>

          <!-- 3. EMPTY STATE: No Products Matching Filters -->
          <EmptyState
            v-else-if="isEmpty"
            :title="t('shop.no_products_title')"
            :description="t('shop.no_products_desc')"
            :actionText="t('shop.reset_filters')"
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
            v-if="!productsPending && products.length > 0"
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
import { ref, computed, watch, onMounted } from 'vue'

// Import Composables
import { useProducts } from '~/composables/useProducts'
import { useCategories } from '~/composables/useCategories'
import { useBrands } from '~/composables/useBrands'
import { useLanguage } from '~/composables/useLanguage'

// Import Components
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import CategoryHierarchyBar from '~/components/Shop/CategoryHierarchyBar.vue'
import ShopToolbar from '~/components/Shop/ShopToolbar.vue'
import ShopFilterSidebar from '~/components/Shop/ShopFilterSidebar.vue'
import ShopMobileFilterDrawer from '~/components/Shop/ShopMobileFilterDrawer.vue'
import ShopPagination from '~/components/Shop/ShopPagination.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductCardSkeleton from '~/components/product/ProductCardSkeleton.vue'
import EmptyState from '~/components/common/EmptyState.vue'

const { t, layoutDirection, currentLanguage, apiLocale } = useLanguage()

// 1. Live Composables Integration
const { 
  products, 
  pending: productsPending, 
  error: productsError, 
  isEmpty, 
  totalProducts, 
  fetchFilteredProducts 
} = useProducts()

const { categories } = useCategories()
const { brands } = useBrands()

// Breadcrumbs
const breadcrumbTiers = computed(() => [
  { name: t('nav.home'), path: '/' },
  { name: t('nav.shop'), path: '/shop' }
])

// Control States
const isMobileFilterOpen = ref(false)
const viewMode = ref<'grid-4' | 'grid-3' | 'list'>('grid-4')
const sortBy = ref('default')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const selectedCategoryId = ref<number | string | null>(null)

const defaultFilters = {
  priceMin: null,
  priceMax: null,
  brands: [],
  categoryId: [],
  inStock: false
}
const filters = ref({ ...defaultFilters })

// Computed Grid Class based on ViewMode
const gridClass = computed(() => {
  if (viewMode.value === 'list') {
    return 'flex flex-col gap-4 w-full'
  } else if (viewMode.value === 'grid-3') {
    return 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full'
  } else {
    return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full'
  }
})

// Active Filter Chips for UI Header
const activeFilterChips = computed(() => {
  const chips = []
  if (filters.value.priceMin || filters.value.priceMax) {
    chips.push({ id: 'price', label: `${t('product.price')}: ${filters.value.priceMin || 0} - ${filters.value.priceMax || 'Max'}` })
  }
  if (filters.value.brands.length) {
    chips.push({ id: 'brands', label: `${filters.value.brands.length} ${layoutDirection.value === 'ltr' ? 'Brands' : 'ماركات'}` })
  }
  if (selectedCategoryId.value) {
    const foundCat = categories.value.find(c => String(c.id) === String(selectedCategoryId.value))
    if (foundCat) chips.push({ id: 'category', label: `${t('product.category')}: ${foundCat.name}` })
  }
  if (filters.value.inStock) chips.push({ id: 'inStock', label: t('product.in_stock') })
  return chips
})

// Computed Total Pages
const totalPages = computed(() => Math.ceil((totalProducts.value || 1) / itemsPerPage.value))

// 2. Fetch Data Action
const fetchShopProducts = () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const selectedBrandId = filters.value.brands.length > 0 ? filters.value.brands[0] : undefined
  const activeCatId = selectedCategoryId.value || (Array.isArray(filters.value.categoryId) && filters.value.categoryId.length > 0 ? filters.value.categoryId[0] : undefined)

  fetchFilteredProducts({
    limit: itemsPerPage.value,
    page: currentPage.value,
    offset: (currentPage.value - 1) * itemsPerPage.value,
    category_id: activeCatId || undefined,
    brand_id: selectedBrandId || undefined,
    locale: apiLocale.value,
    min_price: filters.value.priceMin || undefined,
    max_price: filters.value.priceMax || undefined,
    sort_by: sortBy.value === 'default' ? 'latest' : (sortBy.value as any)
  })
}

// 3. Category Select Handler
const handleCategorySelect = (catId: number | string) => {
  const cat = categories.value.find(c => String(c.id) === String(catId))
  const targetSlug = cat?.slug || catId
  navigateTo(`/category/${targetSlug}`)
}

// 4. Action Handlers
const applyFilters = (newFilters: any) => {
  filters.value = { ...newFilters }
  if (Array.isArray(newFilters.categoryId) && newFilters.categoryId.length > 0) {
    selectedCategoryId.value = newFilters.categoryId[0]
  }
  currentPage.value = 1
  fetchShopProducts()
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  selectedCategoryId.value = null
  currentPage.value = 1
  fetchShopProducts()
}

const removeFilter = (id: string) => {
  if (id === 'price') {
    filters.value.priceMin = null
    filters.value.priceMax = null
  } else if (id === 'brands') {
    filters.value.brands = []
  } else if (id === 'category') {
    selectedCategoryId.value = null
    filters.value.categoryId = []
  } else {
    (filters.value as any)[id] = false
  }
  fetchShopProducts()
}

// Watchers for Pagination, Sorting & Deep Filter / Language changes
watch([currentPage, sortBy, apiLocale, currentLanguage], () => {
  fetchShopProducts()
})

watch(filters, () => {
  currentPage.value = 1
  fetchShopProducts()
}, { deep: true })

onMounted(() => {
  fetchShopProducts()
})

useHead({
  title: computed(() => `${t('shop.title')} | ${layoutDirection.value === 'ltr' ? 'Aswar Jeddah' : 'أسوار جدة'}`)
})
</script>
