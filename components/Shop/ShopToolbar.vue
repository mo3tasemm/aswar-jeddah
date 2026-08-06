<template>
  <div class="w-full flex flex-col gap-4 mb-8">
    
    <!-- Top Row: Results count, Filters Toggle (Mobile), Sort/View (Desktop) -->
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6">
      
      <!-- Results Count & Mobile Filter Toggle -->
      <div class="flex flex-row items-center justify-between w-full sm:w-auto gap-4">
        <!-- Mobile Filter Button -->
        <button 
          @click="$emit('open-mobile-filter')"
          class="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#0B0E28] rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors flex-1 sm:flex-none"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          تصفية الفلاتر
          <span v-if="activeFilters.length" class="flex items-center justify-center w-5 h-5 bg-amber-500 text-[#0B0E28] rounded-full text-[10px]">{{ activeFilters.length }}</span>
        </button>

        <p class="text-xs sm:text-sm font-bold text-slate-500">
          عرض <span class="text-[#0B0E28]">1-{{ itemsPerPage }}</span> من أصل <span class="text-[#0B0E28]">{{ totalResults }}</span> نتيجة
        </p>
      </div>

      <!-- Controls (Sort & View) -->
      <div class="flex items-center gap-4 justify-between w-full sm:w-auto sm:justify-end">
        
        <!-- Sorting -->
        <div class="flex items-center gap-2 flex-1 sm:flex-none">
          <label class="text-xs font-bold text-slate-500 hidden sm:block shrink-0">ترتيب حسب:</label>
          <select 
            :value="sortBy"
            @change="$emit('update:sortBy', $event.target.value)"
            class="bg-white border border-slate-200 text-[#0B0E28] text-xs sm:text-sm font-bold rounded-2xl focus:ring-amber-400 focus:border-amber-400 block w-full sm:w-auto px-4 py-3 outline-none cursor-pointer"
          >
            <option value="default">الافتراضي</option>
            <option value="newest">الأحدث</option>
            <option value="bestseller">الأكثر مبيعاً</option>
            <option value="price_asc">السعر: من الأقل للأعلى</option>
            <option value="price_desc">السعر: من الأعلى للأقل</option>
            <option value="rating">الأعلى تقييماً</option>
          </select>
        </div>

        <div class="hidden sm:block w-px h-6 bg-slate-200"></div>

        <!-- View Toggles (Desktop only) -->
        <div class="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button 
            @click="$emit('update:viewMode', 'grid-4')"
            class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            :class="viewMode === 'grid-4' ? 'bg-white shadow-sm text-[#0B0E28]' : 'text-slate-400 hover:text-slate-600'"
            title="4 أعمدة"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="7.5" y1="3" x2="7.5" y2="21"></line><line x1="12" y1="3" x2="12" y2="21"></line><line x1="16.5" y1="3" x2="16.5" y2="21"></line></svg>
          </button>
          <button 
            @click="$emit('update:viewMode', 'grid-3')"
            class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            :class="viewMode === 'grid-3' ? 'bg-white shadow-sm text-[#0B0E28]' : 'text-slate-400 hover:text-slate-600'"
            title="3 أعمدة"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg>
          </button>
          <button 
            @click="$emit('update:viewMode', 'list')"
            class="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
            :class="viewMode === 'list' ? 'bg-white shadow-sm text-[#0B0E28]' : 'text-slate-400 hover:text-slate-600'"
            title="قائمة"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
          </button>
        </div>

      </div>
    </div>

    <!-- Active Filters Chips -->
    <div v-if="activeFilters.length > 0" class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-bold text-slate-500 ml-1">الفلاتر النشطة:</span>
      
      <div 
        v-for="filter in activeFilters" 
        :key="filter.id"
        class="flex items-center gap-1.5 bg-[#0B0E28] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"
      >
        <span>{{ filter.label }}</span>
        <button 
          @click="$emit('remove-filter', filter.id)"
          class="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-rose-500 transition-colors"
        >
          <svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <button 
        @click="$emit('clear-filters')"
        class="text-xs font-bold text-amber-500 hover:text-amber-600 underline decoration-amber-500/30 underline-offset-4 mr-2"
      >
        إفراغ الكل
      </button>
    </div>

  </div>
</template>

<script setup>
defineProps({
  totalResults: {
    type: Number,
    default: 0
  },
  itemsPerPage: {
    type: Number,
    default: 24
  },
  sortBy: {
    type: String,
    default: 'default'
  },
  viewMode: {
    type: String,
    default: 'grid-4' // grid-4, grid-3, list
  },
  activeFilters: {
    type: Array,
    default: () => [] // [{ id: 'brand_samsung', label: 'سامسونج' }, ...]
  }
})

defineEmits([
  'update:sortBy', 
  'update:viewMode', 
  'remove-filter', 
  'clear-filters',
  'open-mobile-filter'
])
</script>
