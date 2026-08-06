<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    <div class="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100">
      
      <!-- Header -->
      <div v-if="title" class="flex items-center justify-between mb-6 px-2">
        <!-- Title -->
        <div>
          <h2 class="text-xl md:text-2xl font-black text-slate-800">{{ title }}</h2>
          <p v-if="subtitle" class="text-sm text-slate-500 mt-1">{{ subtitle }}</p>
        </div>
      </div>

      <!-- Slider Container -->
      <div class="relative w-full group/slider">
        
        <!-- Right Arrow (Visually on the Right, Scrolls Left/Back) -->
        <button 
          @click="scroll('right')"
          class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a] text-white hover:bg-black p-3 rounded-xl shadow-lg transition-all border border-slate-700 opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-2"
          title="السابق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <!-- Left Arrow (Visually on the Left, Scrolls Right/Forward) -->
        <button 
          @click="scroll('left')"
          class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a] text-white hover:bg-black p-3 rounded-xl shadow-lg transition-all border border-slate-700 opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:-translate-x-2"
          title="التالي"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- Products Grid / Slider -->
        <div 
          ref="sliderRef"
          @scroll="handleScroll"
          class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 pt-1 px-1"
        >
          <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product"
            class="snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px]"
          />
        </div>
      </div>

      <!-- Bottom Navigation / Progress Tracker -->
      <div class="mt-4 flex justify-center items-center gap-1.5">
        <div class="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden relative">
          <!-- In RTL, the progress bar should grow from the right -->
          <div 
            class="absolute top-0 right-0 h-full bg-[#0f172a] transition-all duration-300 rounded-full" 
            :style="{ width: scrollProgress + '%' }"
          ></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProductCard from '~/components/product/ProductCard.vue'
import type { Product } from '~/types'

defineProps<{
  title?: string
  subtitle?: string
  viewAllUrl?: string
  products: Product[]
}>()

const sliderRef = ref<HTMLElement | null>(null)
const scrollProgress = ref(0)

const scroll = (direction: 'left' | 'right') => {
  if (!sliderRef.value) return
  const scrollAmount = 320 // مسافة التمرير 320px
  sliderRef.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  if (!sliderRef.value) return
  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value
  
  const maxScroll = scrollWidth - clientWidth
  
  if (maxScroll <= 0) {
    scrollProgress.value = 100 // If there's no scrolling needed, fill the bar
    return
  }

  // Calculate percentage (using Math.abs because scrollLeft is negative in RTL in modern browsers)
  let progress = (Math.abs(scrollLeft) / maxScroll) * 100
  
  // ensure limits between 0 and 100
  if (progress < 0) progress = 0
  if (progress > 100) progress = 100

  // Optional: If progress is very small or maxed out, fix it to edges
  if (progress < 1) progress = 0
  if (progress > 99) progress = 100

  scrollProgress.value = progress
}

onMounted(() => {
  // Initialize progress bar
  setTimeout(handleScroll, 100)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none; 
  scrollbar-width: none; 
}
</style>
