<template>
  <aside class="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm block space-y-6">
    
    <!-- Header & Reset -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-100 w-full">
      <h3 class="text-base font-black text-[#0B0E28] flex items-center gap-2 whitespace-nowrap">
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
        الفلاتر
      </h3>
      <button 
        @click="$emit('reset-filters')"
        class="text-xs font-bold text-slate-400 hover:text-amber-500 transition-colors whitespace-nowrap"
      >
        إعادة ضبط
      </button>
    </div>

    <!-- 1. Price Range -->
    <div class="w-full">
      <h4 class="text-sm font-bold text-[#0B0E28] mb-3 block break-words">الفئة السعرية</h4>
      
      <div class="flex items-center gap-2 w-full my-3">
        <div class="relative w-full min-w-0 flex-1">
          <input 
            type="number" 
            v-model.number="localFilters.priceMin"
            class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-center focus:outline-none focus:border-amber-400"
            placeholder="من"
          />
        </div>
        <span class="text-slate-300 shrink-0">-</span>
        <div class="relative w-full min-w-0 flex-1">
          <input 
            type="number" 
            v-model.number="localFilters.priceMax"
            class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-center focus:outline-none focus:border-amber-400"
            placeholder="إلى"
          />
        </div>
      </div>
      <!-- Apply Price Filter -->
      <button 
        @click="applyFilters"
        class="w-full mt-1 bg-slate-100 hover:bg-slate-200 text-[#0B0E28] font-bold text-xs py-2 rounded-lg transition-colors whitespace-nowrap"
      >
        تصفية السعر
      </button>
    </div>

    <div class="w-full h-px bg-slate-100"></div>

    <!-- 2. Brands Accordion -->
    <div class="w-full">
      <button 
        @click="isBrandsOpen = !isBrandsOpen"
        class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 block group whitespace-nowrap"
      >
        العلامات التجارية
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
          <svg class="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            v-model="brandSearchQuery"
            class="w-full min-w-0 bg-white border border-slate-200 rounded-lg pr-9 pl-3 py-2 text-xs font-medium text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none placeholder-slate-400"
            placeholder="ابحث عن ماركة..."
          />
        </div>

        <!-- Brands List -->
        <div class="max-h-48 overflow-y-auto custom-scrollbar flex flex-col pr-1 w-full">
          <label 
            v-for="brand in filteredBrands" 
            :key="brand.id"
            class="flex items-center justify-between gap-3 w-full py-1.5 group cursor-pointer"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <input 
                type="checkbox" 
                :value="brand.id"
                v-model="localFilters.brands"
                @change="applyFilters"
                class="w-4 h-4 text-amber-500 bg-slate-50 border-slate-300 rounded focus:ring-amber-500 focus:ring-offset-0 cursor-pointer shrink-0"
              />
              <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors break-words truncate">{{ brand.name }}</span>
            </div>
            <span class="text-[10px] font-medium text-slate-400 shrink-0">{{ brand.count }}</span>
          </label>
        </div>
      </div>
    </div>

    <div class="w-full h-px bg-slate-100"></div>

    <!-- 3. Colors -->
    <div class="w-full">
      <h4 class="text-sm font-bold text-[#0B0E28] mb-3 block break-words">اللون</h4>
      
      <div class="flex flex-wrap items-center gap-2 mt-1">
        <label 
          v-for="color in colors" 
          :key="color.id"
          class="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center transition-transform hover:scale-110"
          :class="{ 'ring-2 ring-offset-2 ring-slate-300': localFilters.colors.includes(color.id) }"
          :style="{ backgroundColor: color.hex }"
        >
          <input 
            type="checkbox" 
            :value="color.id"
            v-model="localFilters.colors"
            @change="applyFilters"
            class="sr-only"
          />
          <svg 
            v-if="localFilters.colors.includes(color.id)"
            class="w-3.5 h-3.5" 
            :class="color.hex === '#FFFFFF' ? 'text-slate-800' : 'text-white'"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </label>
      </div>
    </div>

    <div class="w-full h-px bg-slate-100"></div>

    <!-- 4. Quick Toggles -->
    <div class="flex flex-col gap-1 w-full">
      
      <label class="flex items-center justify-between gap-3 w-full py-1.5 cursor-pointer group">
        <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors whitespace-nowrap">متاح بالمخزون فقط</span>
        <div class="relative shrink-0">
          <input type="checkbox" v-model="localFilters.inStock" @change="applyFilters" class="sr-only peer" />
          <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
        </div>
      </label>

      <label class="flex items-center justify-between gap-3 w-full py-1.5 cursor-pointer group">
        <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors whitespace-nowrap">عروض وخصومات</span>
        <div class="relative shrink-0">
          <input type="checkbox" v-model="localFilters.onSale" @change="applyFilters" class="sr-only peer" />
          <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
        </div>
      </label>

      <label class="flex items-center justify-between gap-3 w-full py-1.5 cursor-pointer group">
        <span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors whitespace-nowrap">شحن مجاني</span>
        <div class="relative shrink-0">
          <input type="checkbox" v-model="localFilters.freeShipping" @change="applyFilters" class="sr-only peer" />
          <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-500"></div>
        </div>
      </label>

    </div>

  </aside>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  filters: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update-filters', 'reset-filters'])

// Local state for UI
const isBrandsOpen = ref(true)
const brandSearchQuery = ref('')

// Clone props to local state for v-model binding
const localFilters = ref(JSON.parse(JSON.stringify(props.filters)))

// Watch external reset
watch(() => props.filters, (newFilters) => {
  localFilters.value = JSON.parse(JSON.stringify(newFilters))
}, { deep: true })

const applyFilters = () => {
  emit('update-filters', localFilters.value)
}

// Mock Data
const allBrands = [
  { id: 'samsung', name: 'سامسونج Samsung', count: 142 },
  { id: 'lg', name: 'إل جي LG', count: 98 },
  { id: 'toshiba', name: 'توشيبا Toshiba', count: 54 },
  { id: 'tornado', name: 'تورنيدو Tornado', count: 32 },
  { id: 'beko', name: 'بيكو Beko', count: 21 },
  { id: 'bosch', name: 'بوش Bosch', count: 15 },
  { id: 'delonghi', name: 'ديلونجي DeLonghi', count: 8 },
]

const colors = [
  { id: 'black', hex: '#0F172A' },
  { id: 'white', hex: '#FFFFFF' },
  { id: 'silver', hex: '#94A3B8' },
  { id: 'gold', hex: '#D97706' },
  { id: 'red', hex: '#EF4444' },
  { id: 'blue', hex: '#3B82F6' },
]

const filteredBrands = computed(() => {
  if (!brandSearchQuery.value) return allBrands
  const q = brandSearchQuery.value.toLowerCase()
  return allBrands.filter(b => b.name.toLowerCase().includes(q))
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e2e8f0;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #cbd5e1;
}
</style>
