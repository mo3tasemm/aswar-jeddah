<template>
  <div class="w-full bg-slate-50/50 min-h-screen pb-16" dir="rtl">
    <div class="container mx-auto px-4 max-w-7xl">
      
      <!-- 1. Breadcrumb -->
      <ShopBreadcrumb :tiers="breadcrumbTiers" />

      <!-- 2. Header & Search Query -->
      <div class="mb-8 mt-6">
        <h1 class="text-2xl font-bold text-[#0B0E28] mb-2">
          نتائج البحث: <span class="text-amber-500">"{{ searchQuery }}"</span>
        </h1>
        <p class="text-slate-500 text-sm font-medium">تم العثور على {{ totalResults }} منتج</p>
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

          <!-- Loading State -->
          <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full">
            <div v-for="i in itemsPerPage" :key="i" class="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse flex flex-col gap-4">
              <div class="bg-slate-200 rounded-xl w-full aspect-square"></div>
              <div class="flex-1 space-y-3 w-full">
                <div class="h-4 bg-slate-200 rounded-full w-3/4"></div>
                <div class="h-3 bg-slate-200 rounded-full w-1/2"></div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else-if="products.length === 0" class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center justify-center min-h-[400px] w-full">
            <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 mx-auto">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 class="text-xl font-bold text-[#0B0E28] mb-2">عذراً، لم نجد أي نتائج</h3>
            <p class="text-slate-500 max-w-sm mx-auto mb-8">لم نجد أي نتائج تطابق "{{ searchQuery }}". جرب تغيير كلمات البحث أو إزالة بعض الفلاتر.</p>
            <button 
              @click="resetFilters"
              class="px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20"
            >
              إلغاء الفلاتر وإعادة البحث
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

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Import Components
import ShopBreadcrumb from '~/components/Shop/ShopBreadcrumb.vue'
import ShopToolbar from '~/components/Shop/ShopToolbar.vue'
import ShopFilterSidebar from '~/components/Shop/ShopFilterSidebar.vue'
import ShopMobileFilterDrawer from '~/components/Shop/ShopMobileFilterDrawer.vue'
import ShopPagination from '~/components/Shop/ShopPagination.vue'
import ProductCard from '~/components/product/ProductCard.vue'

const route = useRoute()
const searchQuery = ref(route.query.q || '')

useHead({
  title: computed(() => `نتائج البحث: ${searchQuery.value} | أسوار جدة`)
})

// === Breadcrumbs ===
const breadcrumbTiers = computed(() => [
  { name: 'الرئيسية', path: '/' },
  { name: 'نتائج البحث', path: '#' },
])

// === State ===
const isLoading = ref(true)
const isMobileFilterOpen = ref(false)

const viewMode = ref('grid-4') // grid-4, grid-3, list
const sortBy = ref('default')
const currentPage = ref(1)
const totalPages = ref(2)
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
  if (process.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // Simulate API call filtering based on searchQuery
  setTimeout(() => {
    if (!searchQuery.value) {
       products.value = []
       totalResults.value = 0
    } else {
       products.value = [...mockProducts]
       totalResults.value = products.value.length
    }
    
    // Artificial logic for Empty State demo:
    if (filters.value.priceMax && filters.value.priceMax < 100) {
      products.value = []
      totalResults.value = 0
    }
    
    isLoading.value = false
  }, 600)
}

// Watchers for Pagination & Sorting
watch([currentPage, sortBy, itemsPerPage], () => {
  fetchProducts()
})

// Watch for search query parameter changes from the URL
watch(() => route.query.q, (newQuery) => {
  searchQuery.value = newQuery || ''
  currentPage.value = 1
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
  }
]
const products = ref([])

onMounted(() => {
  fetchProducts()
})
</script>
