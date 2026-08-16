<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16" :dir="layoutDirection">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- 1. Dynamic Breadcrumbs Hierarchy -->
      <Breadcrumbs :items="breadcrumbItems" />

      <!-- 2. Header & Subcategories -->
      <div class="mb-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-[#0B0E28] mb-6 mt-6 text-start">{{ displayCategoryName }}</h1>
        <CategoryHierarchyBar 
          v-if="subCategoriesList && subCategoriesList.length > 0" 
          :categories="subCategoriesList" 
          :selected-category-id="selectedSubCategoryId"
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
            <h3 class="text-base font-bold text-red-800">{{ t('category.error_title') }}</h3>
            <p class="text-xs text-red-600 max-w-md mx-auto">{{ productsError }}</p>
            <button 
              @click="initCategoryPage"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <i class="fa-solid fa-rotate-right text-xs"></i>
              {{ t('shop.retry') }}
            </button>
          </div>

          <!-- 3. EMPTY STATE: No Products Matching Category -->
          <EmptyState
            v-else-if="isEmpty"
            :title="t('category.empty_title')"
            :description="t('category.empty_desc')"
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
import CategoryHierarchyBar from '~/components/Shop/CategoryHierarchyBar.vue'
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

// Parse Catch-all Slugs Hierarchy (e.g. ['care', 'skin'] from /category/care/skin)
const slugs = computed<string[]>(() => {
  const s = route.params.slug
  if (!s) return []
  if (Array.isArray(s)) return s.map(String).filter(Boolean)
  return String(s).split('/').filter(Boolean)
})

// Current path segments for building nested child links
const currentCategoryPath = computed(() => {
  return slugs.value.join('/')
})

// Deepest leaf slug in current route
const targetLeafSlug = computed(() => {
  return slugs.value.length > 0 ? slugs.value[slugs.value.length - 1] : ''
})

// Localization helper for Category Name
const getCategoryName = (cat: any) => {
  if (!cat) return ''
  if (currentLanguage.value === 'en') {
    return cat.name_en || cat.title_en || cat.name
  }
  return cat.name_ar || cat.name
}

interface MatchedTier {
  category: any;
  slug: string;
  name: string;
  url: string;
}

// Build complete hierarchical trail across tiers
const hierarchyTrail = computed<MatchedTier[]>(() => {
  const trail: MatchedTier[] = []
  if (!categories.value || categories.value.length === 0) return trail

  let currentLevelList = categories.value
  let accumulatedPath = '/category'

  for (let i = 0; i < slugs.value.length; i++) {
    const slugSegment = slugs.value[i]
    let matched = currentLevelList.find(c => String(c.slug) === slugSegment || String(c.id) === slugSegment)
    
    if (matched) {
      accumulatedPath += `/${matched.slug || matched.id}`
      trail.push({
        category: matched,
        slug: matched.slug || String(matched.id),
        name: getCategoryName(matched),
        url: accumulatedPath
      })
      currentLevelList = matched.subCategories || matched.childes || []
    } else {
      // Global Fallback search
      let globalMatch: any = null
      for (const cat of categories.value) {
        if (String(cat.slug) === slugSegment || String(cat.id) === slugSegment) {
          globalMatch = cat
          break
        }
        if (cat.subCategories && cat.subCategories.length > 0) {
          const sub = cat.subCategories.find((s: any) => String(s.slug) === slugSegment || String(s.id) === slugSegment)
          if (sub) {
            globalMatch = sub
            break
          }
        }
      }

      if (globalMatch) {
        accumulatedPath += `/${globalMatch.slug || globalMatch.id}`
        trail.push({
          category: globalMatch,
          slug: globalMatch.slug || String(globalMatch.id),
          name: getCategoryName(globalMatch),
          url: accumulatedPath
        })
        currentLevelList = globalMatch.subCategories || globalMatch.childes || []
      } else {
        accumulatedPath += `/${slugSegment}`
        trail.push({
          category: null,
          slug: slugSegment,
          name: slugSegment.replace(/-/g, ' '),
          url: accumulatedPath
        })
      }
    }
  }

  return trail
})

// Active leaf tier and category item
const activeLeafTier = computed(() => {
  return hierarchyTrail.value.length > 0 ? hierarchyTrail.value[hierarchyTrail.value.length - 1] : null
})

const currentCategory = computed(() => {
  return activeLeafTier.value?.category || null
})

// Resolved Category ID for API queries
const resolvedCategoryId = computed(() => {
  if (currentCategory.value?.id) {
    return currentCategory.value.id
  }
  const leaf = targetLeafSlug.value
  if (!leaf) return undefined
  if (!isNaN(Number(leaf))) return Number(leaf)
  return leaf
})

// Display Category Name
const displayCategoryName = computed(() => {
  if (activeLeafTier.value?.name) {
    return activeLeafTier.value.name
  }
  if (currentCategory.value) {
    return getCategoryName(currentCategory.value)
  }
  const slug = targetLeafSlug.value
  return slug ? slug.replace(/-/g, ' ') : (currentLanguage.value === 'en' ? 'Category' : 'تصنيف المنتجات')
})

// Dynamic Breadcrumb Trail
const breadcrumbItems = computed(() => {
  const isEn = layoutDirection.value === 'ltr'
  const items: { label: string; to?: string }[] = [
    { label: isEn ? 'Home' : 'الرئيسية', to: '/' },
    { label: isEn ? 'Shop' : 'المتجر', to: '/shop' }
  ]

  hierarchyTrail.value.forEach((tier, index) => {
    const isLast = index === hierarchyTrail.value.length - 1
    items.push({
      label: tier.name,
      to: isLast ? undefined : tier.url
    })
  })

  return items
})

// Subcategories list with nested hierarchical URLs
const subCategoriesList = computed(() => {
  // If active category has child subcategories, render them with nested URLs
  if (currentCategory.value?.subCategories && currentCategory.value.subCategories.length > 0) {
    return currentCategory.value.subCategories.map((sub: any) => ({
      ...sub,
      name: getCategoryName(sub),
      customUrl: `/category/${currentCategoryPath.value}/${sub.slug || sub.id}`
    }))
  }

  // If leaf subcategory has siblings under parent, render sibling links
  if (hierarchyTrail.value.length > 1) {
    const parentTier = hierarchyTrail.value[hierarchyTrail.value.length - 2]
    if (parentTier?.category?.subCategories && parentTier.category.subCategories.length > 0) {
      const parentPath = slugs.value.slice(0, -1).join('/')
      return parentTier.category.subCategories.map((sub: any) => ({
        ...sub,
        name: getCategoryName(sub),
        customUrl: `/category/${parentPath}/${sub.slug || sub.id}`
      }))
    }
  }

  return []
})

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
  const isEn = layoutDirection.value === 'ltr'

  if (filters.value.priceMin || filters.value.priceMax) {
    const min = filters.value.priceMin || 0
    const max = filters.value.priceMax || (isEn ? 'All' : 'الكل')
    chips.push({ id: 'price', label: isEn ? `Price: ${min} - ${max} SAR` : `السعر: ${min} - ${max} ر.س` })
  }
  if (filters.value.brands.length) {
    chips.push({ id: 'brands', label: isEn ? `${filters.value.brands.length} Brands` : `${filters.value.brands.length} ماركات` })
  }
  if (selectedSubCategoryId.value) {
    const foundSub = subCategoriesList.value.find(s => String(s.id) === String(selectedSubCategoryId.value))
    if (foundSub) {
      const subName = getCategoryName(foundSub)
      chips.push({ id: 'subcategory', label: isEn ? `Subcategory: ${subName}` : `فرعي: ${subName}` })
    }
  }
  if (filters.value.inStock) {
    chips.push({ id: 'inStock', label: isEn ? 'In Stock' : 'متاح بالمخزون' })
  }
  return chips
})

// Fetch Category Products Action with locale
const fetchCategoryProducts = async () => {
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Ensure categories and brands are loaded
  if (categories.value.length === 0) {
    await loadCategories()
  }
  loadBrands(true)

  const targetCategoryId = selectedSubCategoryId.value || resolvedCategoryId.value || targetLeafSlug.value
  const selectedBrandId = filters.value.brands.length > 0 ? filters.value.brands[0] : undefined

  fetchFilteredProducts({
    category_id: targetCategoryId,
    brand_id: selectedBrandId || undefined,
    locale: apiLocale.value,
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
  loadBrands(true)
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
  title: computed(() => `${displayCategoryName.value} | ${layoutDirection.value === 'ltr' ? 'Aswar Jeddah' : 'أسوار جدة'}`)
})
</script>
