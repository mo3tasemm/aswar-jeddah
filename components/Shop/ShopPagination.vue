<template>
  <nav class="flex justify-center items-center gap-1 sm:gap-2 mt-12" aria-label="Pagination">
    
    <!-- Prev Button -->
    <button 
      @click="goToPage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0B0E28] hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ml-1 sm:ml-2"
      aria-label="Previous page"
    >
      <svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
    </button>

    <!-- Page Numbers -->
    <template v-for="page in pages" :key="page">
      
      <!-- Ellipsis -->
      <span v-if="page === '...'" class="w-10 h-10 flex items-center justify-center text-slate-400 font-bold">
        ...
      </span>

      <!-- Page Button -->
      <button 
        v-else
        @click="goToPage(page)"
        class="w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all"
        :class="page === currentPage 
          ? 'bg-[#0B0E28] text-amber-400 shadow-md border-transparent' 
          : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'"
      >
        {{ page }}
      </button>

    </template>

    <!-- Next Button -->
    <button 
      @click="goToPage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0B0E28] hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mr-1 sm:mr-2"
      aria-label="Next page"
    >
      <svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
    </button>

  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:currentPage'])

const goToPage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}

// Logic to generate page numbers with ellipsis
const pages = computed(() => {
  const current = props.currentPage
  const total = props.totalPages
  
  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  if (current <= 3) {
    return [1, 2, 3, 4, '...', total]
  }

  if (current >= total - 2) {
    return [1, '...', total - 3, total - 2, total - 1, total]
  }

  return [1, '...', current - 1, current, current + 1, '...', total]
})
</script>
