<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4 select-none">
    <div class="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 relative">
      
      <!-- Header -->
      <div v-if="title || viewAllUrl" class="flex items-center justify-between mb-5 px-2">
        <!-- Title -->
        <div>
          <h2 v-if="title" class="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{{ title }}</h2>
          <p v-if="subtitle" class="text-xs md:text-sm text-slate-500 mt-0.5 font-medium">{{ subtitle }}</p>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2">
          <!-- Arrow Controls -->
          <div class="flex items-center gap-1.5">
            <button 
              type="button"
              @click="scrollRight()"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 hover:bg-[#0B0E28] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0B0E28] transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-2xs"
              title="السابق (يمين)"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            <button 
              type="button"
              @click="scrollLeft()"
              class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-50 hover:bg-[#0B0E28] text-slate-700 hover:text-white border border-slate-200 hover:border-[#0B0E28] transition-all flex items-center justify-center active:scale-95 cursor-pointer shadow-2xs"
              title="التالي (يسار)"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          </div>

          <!-- View All Link -->
          <NuxtLink 
            v-if="viewAllUrl" 
            :to="viewAllUrl" 
            class="text-xs font-bold text-slate-700 hover:text-amber-600 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors inline-flex items-center gap-1.5"
          >
            <span>عرض الكل</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Slider Container with Mouse Drag -->
      <div class="relative w-full group/slider">
        
        <!-- Floating Side Arrow Right (For quick access while hovering cards) -->
        <button 
          type="button"
          @click="scrollRight()"
          class="hidden lg:flex absolute right-1 top-1/2 -translate-y-1/2 z-20 bg-white/95 text-slate-900 hover:bg-[#0B0E28] hover:text-white p-3 rounded-full shadow-lg transition-all border border-slate-200 opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          title="السابق (يمين)"
          aria-label="Previous products"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <!-- Floating Side Arrow Left -->
        <button 
          type="button"
          @click="scrollLeft()"
          class="hidden lg:flex absolute left-1 top-1/2 -translate-y-1/2 z-20 bg-white/95 text-slate-900 hover:bg-[#0B0E28] hover:text-white p-3 rounded-full shadow-lg transition-all border border-slate-200 opacity-0 group-hover/slider:opacity-100 hover:scale-105 active:scale-95 cursor-pointer"
          title="التالي (يسار)"
          aria-label="Next products"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        <!-- Products Grid / Slider with Mouse Drag -->
        <div 
          ref="sliderRef"
          @scroll="handleScroll"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseLeave"
          @click.capture="onClickCapture"
          class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 pt-1 px-1 cursor-grab active:cursor-grabbing"
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
      <div class="mt-3 flex justify-center items-center gap-1.5">
        <div class="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden relative">
          <!-- In RTL, the progress bar grows from the right -->
          <div 
            class="absolute top-0 right-0 h-full bg-[#0B0E28] transition-all duration-300 rounded-full" 
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
import { useSliderDrag } from '~/composables/useSliderDrag'
import type { Product } from '~/types'

defineProps<{
  title?: string
  subtitle?: string
  viewAllUrl?: string
  products: Product[]
}>()

const {
  sliderRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onClickCapture,
  scrollLeft,
  scrollRight
} = useSliderDrag({ scrollAmount: 320 })

const scrollProgress = ref(0)

const handleScroll = () => {
  if (!sliderRef.value) return
  const { scrollLeft: sLeft, scrollWidth, clientWidth } = sliderRef.value
  
  const maxScroll = scrollWidth - clientWidth
  
  if (maxScroll <= 0) {
    scrollProgress.value = 100
    return
  }

  let progress = (Math.abs(sLeft) / maxScroll) * 100
  
  if (progress < 0) progress = 0
  if (progress > 100) progress = 100

  if (progress < 1) progress = 0
  if (progress > 99) progress = 100

  scrollProgress.value = progress
}

onMounted(() => {
  setTimeout(handleScroll, 150)
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
