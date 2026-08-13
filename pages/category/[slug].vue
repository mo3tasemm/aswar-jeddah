<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16" dir="rtl">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- 1. Breadcrumb -->
      <Breadcrumbs :items="[
        { label: 'الرئيسية', to: '/' },
        { label: 'المتجر', to: '/shop' },
        { label: displayCategoryName }
      ]" />

      <!-- 2. Header & Categories -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0B0E28] mb-6 mt-6 text-start">{{ displayCategoryName }}</h1>
        <CategoryHierarchyBar 
          v-if="subCategoriesList && subCategoriesList.length > 0" 
          :categories="subCategoriesList" 
          @select-category="handleCategorySelect"
        />
      </div>

      <!-- 3. Main Content Layout -->
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
            :total-results="totalProducts"
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
            <h3 class="text-base font-bold text-red-800">تعذر تحميل منتجات التصنيف</h3>
            <p class="text-xs text-red-600 max-w-md mx-auto">{{ productsError }}</p>
            <button 
              @click="initCategoryPage"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <i class="fa-solid fa-rotate-right text-xs"></i>
              إعادة المحاولة
            </button>
          </div>

          <!-- 3. EMPTY STATE: No Products Matching Category -->
          <EmptyState
            v-else-if="isEmpty"
            title="عذراً، لم نجد أي منتجات"
            description="لم نتمكن من العثور على منتجات تابعة لهذا التصنيف حالياً. حاول مراجعة الفلاتر أو الأقسام الأخرى."
            actionText="إفراغ الفلاتر والمحاولة مجدداً"
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
import { useRoute } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useCategories } from '~/composables/useCategories'
import { useBrands } from '~/composables/useBrands'
import { useLanguage } from '~/composables/useLanguage'

// Import UI Components
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import CategoryHierarchyBar from '~/components/Shop/CategoryHierarchyBar.vue'
import ShopToolbar from '~/components/Shop/ShopToolbar.vue'
import ShopFilterSidebar from '~/components/Shop/ShopFilterSidebar.vue'
import ShopMobileFilterDrawer from '~/components/Shop/ShopMobileFilterDrawer.vue'
import ShopPagination from '~/components/Shop/ShopPagination.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductCardSkeleton from '~/components/product/ProductCardSkeleton.vue'
import EmptyState from '~/components/common/EmptyState.vue'

const route = useRoute()
const { apiLocale, currentLanguage } = useLanguage()

// Composables
const { products, pending: productsPending, error: productsError, isEmpty, totalProducts, fetchFilteredProducts } = useProducts()
const { categories, loadCategories } = useCategories()
const { brands } = useBrands()

// Active Route Category Slug
const categorySlug = computed(() => String(route.params.slug || ''))

// Match current category item from live categories composable
const currentCategory = computed(() => {
  if (!categories.value || categories.value.length === 0) return null
  return categories.value.find(c => String(c.slug) === categorySlug.value || String(c.id) === categorySlug.value)
})

// Resolve category ID across top-level categories and subcategories
const resolvedCategoryId = computed(() => {
  const slug = categorySlug.value
  if (!slug) return undefined

  if (currentCategory.value?.id) {
    return currentCategory.value.id
  }

  for (const cat of categories.value) {
    if (String(cat.id) === slug || cat.slug === slug) return cat.id
    if (cat.subCategories && cat.subCategories.length > 0) {
      const subMatch = cat.subCategories.find(s => String(s.id) === slug || s.slug === slug)
      if (subMatch) return subMatch.id
    }
  }

  if (!isNaN(Number(slug))) {
    return Number(slug)
  }

  return slug
})

// Display Category Name
const displayCategoryName = computed(() => {
  if (currentCategory.value?.name) {
    return currentCategory.value.name
  }
  const slug = categorySlug.value
  return slug ? slug.replace(/-/g, ' ') : 'تصنيف المنتجات'
})

// Subcategories list if present
const subCategoriesList = computed(() => {
  if (currentCategory.value?.subCategories) {
    return currentCategory.value.subCategories
  }
  return []
})

// === Breadcrumbs ===
const breadcrumbTiers = computed(() => [
  { name: 'الرئيسية', path: '/' },
  { name: 'المتجر', path: '/shop' },
  { name: displayCategoryName.value, path: `/category/${categorySlug.value}` }
])

// Toolbar & Pagination State
const viewMode = ref<'grid-4' | 'grid-3' | 'list'>('grid-4')
const sortBy = ref('default')
const currentPage = ref(1)
const itemsPerPage = ref(12)
const isMobileFilterOpen = ref(false)
const selectedSubCategoryId = ref<number | string | null>(null)

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
const totalPages = computed(() => Math.ceil((totalProducts.value || 1) / itemsPerPage.value))

// Active Filter Chips
const activeFilterChips = computed(() => {
  const chips: { id: string; label: string }[] = []
  if (filters.value.priceMin || filters.value.priceMax) {
    chips.push({ id: 'price', label: `السعر: ${filters.value.priceMin || 0} - ${filters.value.priceMax || 'الكل'}` })
  }
  if (filters.value.brands.length) {
    chips.push({ id: 'brands', label: `${filters.value.brands.length} ماركات` })
  }
  if (selectedSubCategoryId.value) {
    const foundSub = subCategoriesList.value.find(s => s.id === selectedSubCategoryId.value)
    if (foundSub) chips.push({ id: 'subcategory', label: `فرعي: ${foundSub.name}` })
  }
  if (filters.value.inStock) chips.push({ id: 'inStock', label: 'متاح بالمخزون' })
  return chips
})

// Fetch Category Products Action
const fetchCategoryProducts = async () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Ensure categories are loaded first to map category ID accurately
  if (categories.value.length === 0) {
    await loadCategories()
  }

  const targetCategoryId = selectedSubCategoryId.value || resolvedCategoryId.value || categorySlug.value
  const selectedBrandId = filters.value.brands.length > 0 ? filters.value.brands[0] : undefined

  fetchFilteredProducts({
    category_id: targetCategoryId,
    brand_id: selectedBrandId || undefined,
    limit: itemsPerPage.value,
    page: currentPage.value,
    offset: (currentPage.value - 1) * itemsPerPage.value,
    min_price: filters.value.priceMin || undefined,
    max_price: filters.value.priceMax || undefined,
    sort_by: sortBy.value === 'default' ? 'latest' : (sortBy.value as any)
  })
}

// Initial Clean Page Setup
const initCategoryPage = async () => {
  filters.value = { ...defaultFilters }
  selectedSubCategoryId.value = null
  currentPage.value = 1
  if (categories.value.length === 0) {
    await loadCategories()
  }
  await fetchCategoryProducts()
}

// Handlers
const handleCategorySelect = (subId: number | string) => {
  selectedSubCategoryId.value = selectedSubCategoryId.value === subId ? null : subId
  currentPage.value = 1
  fetchCategoryProducts()
}

const applyFilters = (newFilters: any) => {
  filters.value = { ...newFilters }
  currentPage.value = 1
  fetchCategoryProducts()
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  selectedSubCategoryId.value = null
  currentPage.value = 1
  fetchCategoryProducts()
}

const removeFilter = (id: string) => {
  if (id === 'price') {
    filters.value.priceMin = null
    filters.value.priceMax = null
  } else if (id === 'brands') {
    filters.value.brands = []
  } else if (id === 'subcategory') {
    selectedSubCategoryId.value = null
  } else {
    (filters.value as any)[id] = false
  }
  fetchCategoryProducts()
}

// Watchers
watch([currentPage, sortBy], () => {
  fetchCategoryProducts()
})

watch(filters, () => {
  currentPage.value = 1
  fetchCategoryProducts()
}, { deep: true })

watch(() => route.params.slug, () => {
  initCategoryPage()
})

watch([apiLocale, currentLanguage], () => {
  initCategoryPage()
})

onMounted(() => {
  initCategoryPage()
})

useHead({
  title: computed(() => `${displayCategoryName.value} | أسوار جدة`)
})
</script>
