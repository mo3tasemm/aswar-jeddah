<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-8">
    
    <!-- Banner Container -->
    <section 
class="relative w-full overflow-hidden group aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.6/1] rounded-3xl shadow-xl border border-slate-100"    >
      <!-- Slides -->
      <div class="relative w-full h-full bg-luxury-black">
        <transition-group 
          tag="div"
          class="w-full h-full"
          enter-active-class="transition-opacity duration-700 ease-in-out" 
          enter-from-class="opacity-0" 
          enter-to-class="opacity-100" 
          leave-active-class="transition-opacity duration-700 ease-in-out absolute inset-0" 
          leave-from-class="opacity-100" 
          leave-to-class="opacity-0"
        >
          <div 
            v-for="(slide, index) in slides" 
            v-show="currentIndex === index" 
            :key="slide.id"
            class="absolute inset-0 w-full h-full"
          >
            <NuxtLink :to="slide.linkUrl" class="block w-full h-full">
              <picture class="w-full h-full block">
                <source v-if="slide.mobileImageUrl" :srcset="slide.mobileImageUrl" media="(max-width: 767px)" />
                <img 
                  :src="slide.imageUrl" 
                  :alt="slide.altText" 
                  class="w-full h-full object-cover" 
                />
              </picture>
            </NuxtLink>
          </div>
        </transition-group>
      </div>

      <!-- Right Arrow (Next) -->
      <button 
        @click="nextSlide"
        class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-luxury-black shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <!-- Left Arrow (Prev) -->
      <button 
        @click="prevSlide"
        class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-luxury-black shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Pagination Dots (Inside Banner) -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="goToSlide(index)"
          :class="[
            'w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm',
            currentIndex === index ? 'bg-luxury-gold scale-125 w-6' : 'bg-white/60 hover:bg-white'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useHero } from '~/composables/useHero'
import type { HeroSlide } from '~/types/hero'

const defaultSlides: HeroSlide[] = [
  {
    id: 1,
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    linkUrl: '/category/ac',
    altText: 'أقوى التخفيضات على المكيفات',
  },
  {
    id: 2,
    imageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80',
    linkUrl: '/category/kitchen-appliances',
    altText: 'جدد مطبخك بأحدث الأجهزة',
  },
  {
    id: 3,
    imageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1600&q=80',
    mobileImageUrl: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80',
    linkUrl: '/category/screens',
    altText: 'شاشات ذكية بدقة 4K',
  }
]

const props = defineProps<{
  slides?: HeroSlide[]
  config?: { slides?: HeroSlide[]; items?: HeroSlide[] }
}>()

const initialSlides = computed<HeroSlide[]>(() => {
  if (props.config?.slides && props.config.slides.length > 0) return props.config.slides
  if (props.config?.items && props.config.items.length > 0) return props.config.items
  if (props.slides && props.slides.length > 0) return props.slides
  return defaultSlides
})

const { 
  slides, 
  currentIndex, 
  nextSlide, 
  prevSlide, 
  goToSlide, 
  startAutoplay, 
  stopAutoplay 
} = useHero(initialSlides.value)
</script>
