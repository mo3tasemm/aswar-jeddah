<template>
  <section class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-12 relative group">
    
    <!-- Header -->
    <div class="flex items-center justify-between mb-8 px-2">
      <h2 class="text-2xl font-bold text-luxury-black">{{ displayTitle }}</h2>
    </div>

    <!-- Right Arrow (Scroll Right in RTL) -->
    <button 
      @click="scrollRight"
      class="hidden md:flex absolute right-0 top-[55%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-luxury-black shadow-lg hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 border border-slate-200"
      :aria-label="layoutDirection === 'ltr' ? 'Scroll right' : 'التمرير يميناً'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>

    <!-- Slider Container -->
    <div 
      ref="sliderRef"
      class="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 px-2"
    >
      <!-- Category Cards with Dynamic Slug Link -->
      <NuxtLink 
        v-for="category in displayCategories" 
        :key="category.id"
        :to="`/category/${category.slug || category.id}`"
        class="flex-none w-[calc(50%-6px)] sm:w-[160px] md:w-[200px] h-[180px] sm:h-[220px] rounded-2xl overflow-hidden relative group/card snap-start shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col bg-white"
      >
        <!-- Image Area -->
        <div class="flex-grow p-4 flex items-center justify-center bg-white overflow-hidden relative">
          <img 
            :src="category.icon || (category as any).imageUrl || 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80'" 
            :alt="category.name"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-500 ease-out"
          />
        </div>
        <!-- Navy Bottom Bar -->
        <div class="bg-[#0a192f] py-3 text-center transition-colors duration-300 group-hover/card:bg-luxury-gold flex-shrink-0">
          <span class="text-white font-bold text-sm sm:text-base tracking-wide">{{ category.name }}</span>
        </div>
      </NuxtLink>
    </div>

    <!-- Left Arrow (Scroll Left in RTL) -->
    <button 
      @click="scrollLeft"
      class="hidden md:flex absolute left-0 top-[55%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-luxury-black shadow-lg hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 border border-slate-200"
      :aria-label="layoutDirection === 'ltr' ? 'Scroll left' : 'التمرير يساراً'"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCategories } from '~/composables/useCategories'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps<{
  title?: string
  config?: { title?: string; limit?: number; categories?: any[] }
}>()

const { categories: fetchedCategories } = useCategories()
const { layoutDirection } = useLanguage()
const sliderRef = ref<HTMLElement | null>(null)

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

const scrollAmount = 400 // Smooth scroll amount for desktop

const scrollLeft = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

const scrollRight = () => {
  if (sliderRef.value) {
    sliderRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}
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
