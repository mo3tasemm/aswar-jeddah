<template>
  <section class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-8 relative group select-none">
    
    <!-- Header with Title & Arrow Navigation Controls -->
    <div class="flex items-center justify-between mb-6 px-2">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">{{ displayTitle }}</h2>
        <p class="text-xs text-slate-500 font-medium mt-0.5">تصفح الأقسام الرئيسية بأفضل الأسعار</p>
      </div>

      <!-- Arrow Buttons in Header (Desktop & Tablet) -->
      <div class="flex items-center gap-2">
        <button 
          type="button"
          @click="scrollRight()"
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#0B0E28] hover:text-white hover:border-[#0B0E28] transition-all flex items-center justify-center shadow-2xs hover:shadow-sm active:scale-95 cursor-pointer"
          :title="layoutDirection === 'ltr' ? 'Scroll right' : 'السابق (يمين)'"
          aria-label="Previous categories"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        <button 
          type="button"
          @click="scrollLeft()"
          class="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-[#0B0E28] hover:text-white hover:border-[#0B0E28] transition-all flex items-center justify-center shadow-2xs hover:shadow-sm active:scale-95 cursor-pointer"
          :title="layoutDirection === 'ltr' ? 'Scroll left' : 'التالي (يسار)'"
          aria-label="Next categories"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:rotate-0">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Slider Container with Mouse Drag -->
    <div class="relative w-full">
      <div 
        ref="sliderRef"
        @mousedown="onMouseDown"
        @mousemove="onMouseMove"
        @mouseup="onMouseUp"
        @mouseleave="onMouseLeave"
        @click.capture="onClickCapture"
        class="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-3 px-2 cursor-grab active:cursor-grabbing"
      >
        <!-- Category Cards with Dynamic Slug Link -->
        <NuxtLink 
          v-for="category in displayCategories" 
          :key="category.id"
          :to="localePath(`/category/${category.slug || category.id}`)"
          draggable="false"
          class="flex-none w-[calc(50%-6px)] sm:w-[160px] md:w-[200px] h-[180px] sm:h-[220px] rounded-2xl overflow-hidden relative group/card snap-start shadow-2xs hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col bg-white select-none"
        >
          <!-- Image Area -->
          <div class="flex-grow p-4 flex items-center justify-center bg-white overflow-hidden relative pointer-events-none">
            <img 
              :src="category.icon || (category as any).imageUrl || 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'" 
              :alt="category.name"
              loading="lazy"
              decoding="async"
              draggable="false"
              class="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-500 ease-out select-none" 
            />
          </div>
          <!-- Navy Bottom Bar -->
          <div class="bg-[#0B0E28] py-2.5 sm:py-3 text-center transition-colors duration-300 group-hover/card:bg-amber-500 group-hover/card:text-slate-950 flex-shrink-0">
            <span class="text-white group-hover/card:text-slate-950 font-black text-xs sm:text-sm tracking-wide block truncate px-2 transition-colors">
              {{ category.name }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCategories } from '~/composables/useCategories'
import { useLanguage } from '~/composables/useLanguage'
import { useSliderDrag } from '~/composables/useSliderDrag'

const props = defineProps<{
  title?: string
  config?: { title?: string; limit?: number; categories?: any[] }
}>()

const { categories: fetchedCategories } = useCategories()
const { t, layoutDirection, localePath } = useLanguage()

const {
  sliderRef,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
  onClickCapture,
  scrollLeft,
  scrollRight
} = useSliderDrag({ scrollAmount: 400 })

const displayTitle = computed(() => {
  if (props.config?.title) return props.config.title
  if (props.title) return props.title
  return layoutDirection.value === 'ltr' ? 'Shop by Category' : 'تسوق حسب القسم'
})

const displayCategories = computed(() => {
  const list = props.config?.categories && props.config.categories.length > 0
    ? props.config.categories
    : fetchedCategories.value

  const limit = props.config?.limit
  if (limit && Number(limit) > 0) {
    return list.slice(0, Number(limit))
  }
  return list
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
