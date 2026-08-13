<template>
  <div class="w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col gap-6" :dir="layoutDirection">
    
    <!-- 1. Price Range Accordion -->
    <div class="w-full">
      <button 
        @click="isPriceOpen = !isPriceOpen"
        class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"
      >
        <span>{{ layoutDirection === 'ltr' ? 'Price (SAR)' : 'السعر (ر.س)' }}</span>
        <svg 
          class="w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"
          :class="isPriceOpen ? 'rotate-180' : ''"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div v-show="isPriceOpen" class="flex flex-col gap-4 mt-2 w-full">
        <!-- Min & Max Inputs -->
        <div class="flex items-center gap-2 w-full">
          <div class="flex-1 min-w-0">
            <label class="text-[10px] font-bold text-slate-400 mb-1 block text-start">{{ layoutDirection === 'ltr' ? 'From' : 'من' }}</label>
            <input 
              type="number" 
              v-model.number="localFilters.priceMin"
              placeholder="0"
              class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none text-start"
            />
          </div>
          <span class="text-slate-300 font-bold mt-4 shrink-0">-</span>
          <div class="flex-1 min-w-0">
            <label class="text-[10px] font-bold text-slate-400 mb-1 block text-start">{{ layoutDirection === 'ltr' ? 'To' : 'إلى' }}</label>
            <input 
              type="number" 
              v-model.number="localFilters.priceMax"
              placeholder="Max"
              class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none text-start"
            />
          </div>
        </div>

        <!-- Apply Price Button -->
        <button 
          @click="applyFilters"
          class="w-full bg-[#0B0E28] hover:bg-[#1a204d] text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer"
        >
          {{ layoutDirection === 'ltr' ? 'Apply Price' : 'تطبيق السعر' }}
        </button>
      </div>
    </div>

    <div class="w-full h-px bg-slate-100"></div>

    <!-- 2. Categories Accordion -->
    <div class="w-full" v-if="categoriesList.length > 0">
      <button 
        @click="isCategoriesOpen = !isCategoriesOpen"
        class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"
      >
        <span>{{ t('nav.categories') }}</span>
        <svg 
          class="w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"
          :class="isCategoriesOpen ? 'rotate-180' : ''"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>

      <div v-show="isCategoriesOpen" class="flex flex-col gap-1 mt-1 w-full max-h-48 overflow-y-auto custom-scrollbar">
        <NuxtLink 
          v-for="cat in categoriesList" 
          :key="cat.id"
          :to="`/category/${cat.slug || cat.id}`"
          class="flex items-center justify-between gap-3 w-full py-1.5 px-2 rounded-lg cursor-pointer group hover:bg-amber-50/60 transition-colors"
        >
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform"></span>
            <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors truncate">{{ getCategoryName(cat) }}</span>
          </div>
          <span v-if="cat.productCount" class="text-[10px] font-medium text-slate-400 shrink-0">{{ cat.productCount }}</span>
        </NuxtLink>
      </div>
    </div>

    <div class="w-full h-px bg-slate-100" v-if="categoriesList.length > 0"></div>

    <!-- 3. Brands Accordion -->
    <div class="w-full">
      <button 
        @click="isBrandsOpen = !isBrandsOpen"
        class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"
      >
        <span>{{ layoutDirection === 'ltr' ? 'Brands' : 'العلامات التجارية' }}</span>
        <svg 
          class="w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"
          :class="isBrandsOpen ? 'rotate-180' : ''"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
        >
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <div v-show="isBrandsOpen" class="flex flex-col gap-3 mt-1 w-full">
        <!-- Search Brands -->
        <div class="relative w-full">
          <input 
            type="text" 
            v-model="brandSearchQuery"
            class="w-full min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none placeholder-slate-400 text-start"
            :placeholder="layoutDirection === 'ltr' ? 'Search brands...' : 'ابحث عن ماركة...'"
          />
        </div>

        <!-- Brands List -->
        <div class="max-h-48 overflow-y-auto custom-scrollbar flex flex-col pr-1 w-full">
          <label 
            v-for="brand in filteredBrands" 
            :key="brand.id"
            class="flex items-center justify-between gap-3 w-full py-1 cursor-pointer group"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <input 
                type="checkbox" 
                :value="brand.id"
                v-model="localFilters.brands"
                @change="applyFilters"
                class="w-4 h-4 text-amber-500 bg-slate-50 border-slate-300 rounded focus:ring-amber-500 cursor-pointer shrink-0"
              />
              <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors truncate">{{ getBrandName(brand) }}</span>
            </div>
            <span v-if="brand.count" class="text-[10px] font-medium text-slate-400 shrink-0">{{ brand.count }}</span>
          </label>
        </div>
      </div>
    </div>

    <!-- Reset All Filters Action -->
    <button 
      @click="resetFilters"
      class="w-full border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer mt-2"
    >
      {{ t('shop.reset_filters') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  filters: {
    type: Object,
    default: () => ({
      priceMin: null,
      priceMax: null,
      brands: [],
      categoryId: []
    })
  },
  categories: {
    type: Array as () => any[],
    default: () => []
  },
  brands: {
    type: Array as () => any[],
    default: () => []
  }
})

const emit = defineEmits(['update-filters', 'reset-filters'])

const { t, layoutDirection } = useLanguage()

// Accordion Open States
const isPriceOpen = ref(true)
const isCategoriesOpen = ref(true)
const isBrandsOpen = ref(true)

const brandSearchQuery = ref('')
const localFilters = ref({
  priceMin: props.filters.priceMin,
  priceMax: props.filters.priceMax,
  brands: [...(props.filters.brands || [])],
  categoryId: [...(props.filters.categoryId || [])]
})

watch(() => props.filters, (newVal) => {
  localFilters.value = {
    priceMin: newVal.priceMin,
    priceMax: newVal.priceMax,
    brands: [...(newVal.brands || [])],
    categoryId: [...(newVal.categoryId || [])]
  }
}, { deep: true })

const categoriesList = computed(() => props.categories || [])

const getCategoryName = (cat: any) => {
  if (!cat) return ''
  if (layoutDirection.value === 'ltr') {
    return cat.name_en || cat.title_en || cat.name
  }
  return cat.name || cat.name_ar
}

const getBrandName = (brand: any) => {
  if (!brand) return ''
  if (layoutDirection.value === 'ltr') {
    return brand.name_en || brand.title_en || brand.name
  }
  return brand.name || brand.name_ar
}

const filteredBrands = computed(() => {
  if (!props.brands) return []
  if (!brandSearchQuery.value.trim()) return props.brands
  const q = brandSearchQuery.value.toLowerCase()
  return props.brands.filter(b => getBrandName(b).toLowerCase().includes(q))
})

const applyFilters = () => {
  emit('update-filters', { ...localFilters.value })
}

const resetFilters = () => {
  localFilters.value = {
    priceMin: null,
    priceMax: null,
    brands: [],
    categoryId: []
  }
  brandSearchQuery.value = ''
  emit('reset-filters')
}
</script>
