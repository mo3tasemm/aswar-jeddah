<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-6 select-none">
    
    <!-- Banner Container with Mouse Drag & Touch Swipe -->
    <section 
      class="relative w-full overflow-hidden group aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.6/1] rounded-3xl shadow-xl border border-slate-100 cursor-grab active:cursor-grabbing"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @mouseleave="handleMouseLeave"
      @touchstart="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @mouseenter="stopAutoplay"
      @click.capture="handleClickCapture"
    >
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
            <NuxtLink :to="slide.linkUrl" class="block w-full h-full" draggable="false">
              <picture class="w-full h-full block pointer-events-none">
                <source v-if="slide.mobileImageUrl" :srcset="slide.mobileImageUrl" media="(max-width: 767px)" />
                <img 
                  :src="slide.imageUrl" 
                  :alt="slide.altText" 
                  draggable="false"
                  class="w-full h-full object-cover select-none" 
                />
              </picture>
            </NuxtLink>
          </div>
        </transition-group>
      </div>

      <!-- Right Arrow (Next in RTL, Forward) -->
      <button 
        type="button"
        @click.stop="nextSlide"
        class="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/60"
        aria-label="Next slide"
        title="التالي"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <!-- Left Arrow (Prev in RTL, Backward) -->
      <button 
        type="button"
        @click.stop="prevSlide"
        class="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 items-center justify-center rounded-full bg-white/80 hover:bg-white text-slate-900 shadow-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 cursor-pointer border border-slate-200/60"
        aria-label="Previous slide"
        title="السابق"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 sm:w-6 sm:h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <!-- Pagination Dots (Inside Banner) -->
      <div class="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          type="button"
          @click.stop="goToSlide(index)"
          :class="[
            'h-2.5 rounded-full transition-all duration-300 shadow-sm cursor-pointer',
            currentIndex === index ? 'bg-amber-400 w-7' : 'bg-white/60 hover:bg-white w-2.5'
          ]"
          :aria-label="`Go to slide ${index + 1}`"
        ></button>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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

// Mouse & Touch Swipe Handlers
const isDragging = ref(false)
const dragStartX = ref(0)
const dragDistance = ref(0)
const hasDragged = ref(false)
const minSwipeDistance = 45 // min pixel drag to trigger slide change

const handleMouseDown = (e: MouseEvent) => {
  if (e.button !== 0) return
  isDragging.value = true
  dragStartX.value = e.clientX
  dragDistance.value = 0
  hasDragged.value = false
  stopAutoplay()
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  dragDistance.value = e.clientX - dragStartX.value
  if (Math.abs(dragDistance.value) > 8) {
    hasDragged.value = true
  }
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(dragDistance.value) >= minSwipeDistance) {
    if (dragDistance.value > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  dragDistance.value = 0
  startAutoplay()
}

const handleMouseLeave = () => {
  if (isDragging.value) {
    handleMouseUp()
  }
}

const handleClickCapture = (e: MouseEvent) => {
  if (hasDragged.value) {
    e.preventDefault()
    e.stopPropagation()
    hasDragged.value = false
  }
}

// Touch Handlers
const handleTouchStart = (e: TouchEvent) => {
  if (e.touches.length !== 1) return
  isDragging.value = true
  dragStartX.value = e.touches[0].clientX
  dragDistance.value = 0
  hasDragged.value = false
  stopAutoplay()
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value || e.touches.length !== 1) return
  dragDistance.value = e.touches[0].clientX - dragStartX.value
  if (Math.abs(dragDistance.value) > 8) {
    hasDragged.value = true
  }
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false

  if (Math.abs(dragDistance.value) >= minSwipeDistance) {
    if (dragDistance.value > 0) {
      prevSlide()
    } else {
      nextSlide()
    }
  }

  dragDistance.value = 0
  startAutoplay()
}
</script>
