<template>
  <div class="w-full space-y-6">
    
    <!-- Section Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-800">{{ sectionTitle }}</h2>
        <p v-if="sectionSubtitle" class="text-xs sm:text-sm text-slate-500 mt-1">{{ sectionSubtitle }}</p>
      </div>

      <!-- Optional Refresh / Filter Button -->
      <button 
        type="button" 
        @click="handleRefresh" 
        :disabled="pending"
        class="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
      >
        <i :class="['fa-solid fa-arrows-rotate text-xs', { 'fa-spin': pending }]"></i>
        تحديث المنتجات
      </button>
    </div>

    <!-- 1. LOADING STATE: Skeleton Loaders -->
    <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <ProductCardSkeleton v-for="n in (limit || 4)" :key="n" />
    </div>

    <!-- 2. ERROR STATE: Elegant Error Message with Retry Option -->
    <div v-else-if="error" class="bg-red-50/80 border border-red-200 rounded-2xl p-6 text-center space-y-3 my-4">
      <div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl">
        <i class="fa-solid fa-triangle-exclamation"></i>
      </div>
      <h3 class="text-base font-bold text-red-800">تعذر تحميل المنتجات</h3>
      <p class="text-xs text-red-600 max-w-md mx-auto">{{ error }}</p>
      <button 
        @click="handleRefresh"
        class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm"
      >
        <i class="fa-solid fa-rotate-right text-xs"></i>
        إعادة المحاولة
      </button>
    </div>

    <!-- 3. EMPTY STATE: No Products Available UI -->
    <div v-else-if="isEmpty" class="bg-slate-50 border border-slate-200/80 rounded-2xl p-10 text-center space-y-3">
      <div class="w-14 h-14 rounded-full bg-white text-slate-400 border border-slate-200 flex items-center justify-center mx-auto text-2xl shadow-sm">
        <i class="fa-solid fa-box-open"></i>
      </div>
      <h3 class="text-base font-bold text-slate-800">لا توجد منتجات متاحة حالياً</h3>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">لم نتمكن من العثور على منتجات تطابق معايير البحث أو التصنيف المحدد.</p>
      <button 
        @click="handleResetFilters"
        class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2"
      >
        عرض جميع المنتجات
      </button>
    </div>

    <!-- 4. DATA STATE: Render Products Grid -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      <ProductCard 
        v-for="product in products" 
        :key="product.id" 
        :product="product" 
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useProducts } from '~/composables/useProducts'
import ProductCard from '~/components/product/ProductCard.vue'
import ProductCardSkeleton from '~/components/product/ProductCardSkeleton.vue'

// Props configuration for high reusability
const props = withDefaults(defineProps<{
  sectionTitle?: string
  sectionSubtitle?: string
  category?: string
  brand?: string
  limit?: number
}>(), {
  sectionTitle: 'منتجات مختارة لك',
  limit: 8
})

// Extract composable state & network actions
const { 
  products, 
  pending, 
  error, 
  isEmpty, 
  loadProducts 
} = useProducts()

// Fetch products on component mount
onMounted(() => {
  fetchInitialData()
})

const fetchInitialData = () => {
  loadProducts({
    category: props.category,
    brand: props.brand,
    limit: props.limit
  })
}

const handleRefresh = () => {
  fetchInitialData()
}

const handleResetFilters = () => {
  loadProducts({ limit: props.limit })
}
</script>
