<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16" dir="rtl">
    <div class="container mx-auto px-4 max-w-7xl">
      <!-- 1. Breadcrumb -->
      <ShopBreadcrumb :tiers="breadcrumbTiers" />

      <!-- 2. Header & Categories -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-[#0B0E28] mb-6 mt-6">الأجهزة الكهربائية</h1>
        <CategoryHierarchyBar v-if="subCategories && subCategories.length > 0" :categories="subCategories" />
      </div>

      <!-- 3. Main Content Layout -->
      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full">
        
        <!-- Sidebar Column (تم تصليح الـ Sticky وسمك العمود) -->
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

          <!-- Loading State -->
          <div v-if="isLoading" :class="gridClass">
            <ProductCardSkeleton v-for="i in itemsPerPage" :key="i" />
          </div>

          <!-- Empty State -->
          <EmptyState
            v-else-if="products.length === 0"
            title="عذراً، لم نجد أي نتائج"
            description="لم نتمكن من العثور على منتجات تطابق الفلاتر أو الكلمات البحثية المدخلة. حاول تغيير خيارات التصفية."
            actionText="إفراغ الفلاتر والمحاولة مجدداً"
            @action="resetFilters"
          >
            <template #icon>
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </template>
          </EmptyState>

          <!-- Products Grid (ربط dynamic class مع viewMode) -->
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

      <!-- Mobile Drawer Filter (تم إخراجه خارج الـ Flex لضمان عدم التداخل) -->
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

<script setup>
import { ref, computed, watch, onMounted } from 'vue'

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
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'

useHead({
  title: 'الأجهزة الكهربائية | أسوار جدة'
})

// === Breadcrumbs ===
const breadcrumbTiers = [
  { name: 'الأجهزة الكهربائية', path: '/shop' },
  { name: 'أجهزة الطهي', path: '/shop/cooking' },
  { name: 'ماكينات القهوة', path: '/shop/cooking/coffee-machines' }
]

// === Categories Bar ===
const subCategories = ref([
  { id: 1, name: 'ماكينات القهوة', image: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=300&auto=format&fit=crop', count: 45, path: '#', isActive: true },
  { id: 2, name: 'قلايات هوائية', image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=300&auto=format&fit=crop', count: 32, path: '#', isActive: false },
  { id: 3, name: 'أفران ومايكروويف', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?q=80&w=300&auto=format&fit=crop', count: 120, path: '#', isActive: false },
  { id: 4, name: 'عجانات وخلاطات', image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=300&auto=format&fit=crop', count: 78, path: '#', isActive: false },
  { id: 5, name: 'شوايات كهربائية', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=300&auto=format&fit=crop', count: 15, path: '#', isActive: false }
])

// === State ===
const isLoading = ref(true)
const isMobileFilterOpen = ref(false)

const viewMode = ref('grid-4') // grid-4, grid-3, list
const sortBy = ref('default')
const currentPage = ref(1)
const totalPages = ref(8)
const itemsPerPage = ref(12)
const totalResults = ref(96)

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

// Computed Grid Class based on ViewMode
const gridClass = computed(() => {
  if (viewMode.value === 'list') {
    return 'flex flex-col gap-4 w-full'
  } else if (viewMode.value === 'grid-3') {
    return 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full'
  } else {
    // grid-4
    return 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full'
  }
})

// === Active Filter Chips ===
const activeFilterChips = computed(() => {
  const chips = []
  if (filters.value.priceMin || filters.value.priceMax) {
    chips.push({ id: 'price', label: `السعر: ${filters.value.priceMin || 0} - ${filters.value.priceMax || 'Max'}` })
  }
  if (filters.value.brands.length) {
    chips.push({ id: 'brands', label: `${filters.value.brands.length} ماركات` })
  }
  if (filters.value.colors.length) {
    chips.push({ id: 'colors', label: `${filters.value.colors.length} ألوان` })
  }
  if (filters.value.inStock) chips.push({ id: 'inStock', label: 'متاح بالمخزون' })
  if (filters.value.onSale) chips.push({ id: 'onSale', label: 'عروض' })
  if (filters.value.freeShipping) chips.push({ id: 'freeShipping', label: 'شحن مجاني' })
  return chips
})

// === Methods ===
const applyFilters = (newFilters) => {
  filters.value = { ...newFilters }
  fetchProducts()
}

const resetFilters = () => {
  filters.value = { ...defaultFilters }
  fetchProducts()
}

const removeFilter = (id) => {
  if (id === 'price') {
    filters.value.priceMin = null
    filters.value.priceMax = null
  } else if (id === 'brands') {
    filters.value.brands = []
  } else if (id === 'colors') {
    filters.value.colors = []
  } else {
    filters.value[id] = false
  }
  fetchProducts()
}

const fetchProducts = () => {
  isLoading.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
  
  // Simulate API call
  setTimeout(() => {
    // Artificial logic for Empty State demo:
    if (filters.value.priceMax && filters.value.priceMax < 100) {
      products.value = []
    } else {
      products.value = [...mockProducts]
    }
    isLoading.value = false
  }, 800)
}

// Watchers for Pagination & Sorting
watch([currentPage, sortBy, itemsPerPage], () => {
  fetchProducts()
})

// === Mock Data ===
const mockProducts = [
  {
    id: 1,
    title: 'ماكينة إسبريسو ديلونجي ديديكا، فضي',
    formattedPrice: '899 ر.س',
    formattedOldPrice: '1,199 ر.س',
    discountBadge: 'خصم 25%',
    rating: 4.8,
    reviews: 124,
    images: ['https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=500&auto=format&fit=crop'],
    brand: 'ديلونجي',
    availabilityStatus: 'متاح بالمخزون'
  },
  {
    id: 2,
    title: 'ماكينة قهوة نسبريسو إسينزا ميني، أسود',
    formattedPrice: '499 ر.س',
    formattedOldPrice: null,
    discountBadge: null,
    rating: 4.6,
    reviews: 89,
    images: ['https://images.unsplash.com/photo-1585237722700-1c7b8bc1df84?q=80&w=500&auto=format&fit=crop'],
    brand: 'نسبريسو',
    availabilityStatus: 'متاح بالمخزون'
  },
  {
    id: 3,
    title: 'قلاية فيليبس الهوائية حجم عائلي 7.3 لتر',
    formattedPrice: '1,250 ر.س',
    formattedOldPrice: '1,500 ر.س',
    discountBadge: 'شحن مجاني',
    rating: 4.9,
    reviews: 342,
    images: ['https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=500&auto=format&fit=crop'],
    brand: 'فيليبس',
    availabilityStatus: 'متاح بالمخزون'
  },
  {
    id: 4,
    title: 'خلاط ومطحنة كينوود 800 واط',
    formattedPrice: '320 ر.س',
    formattedOldPrice: null,
    discountBadge: null,
    rating: 4.5,
    reviews: 56,
    images: ['https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=500&auto=format&fit=crop'],
    brand: 'كينوود',
    availabilityStatus: 'متاح بالمخزون'
  }
]
const products = ref([])

onMounted(() => {
  fetchProducts()
})
</script>
