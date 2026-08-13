<template>
  <div class="flex flex-col lg:flex-row gap-4 items-stretch max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    
    <!-- Side Banner Wrapper to match slider padding -->
    <div class="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 flex flex-col pt-4">
      <div 
        class="w-full h-[350px] sm:h-[565px] rounded-2xl overflow-hidden shadow-sm relative group bg-slate-100"
        @mouseenter="pauseAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <!-- Auto Sliding Banner Images (No arrows, no pagination) -->
        <NuxtLink 
          v-for="(banner, idx) in banners" 
          :key="idx" 
          :to="banner.url || sideBannerUrl || '#'"
          class="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
          :class="idx === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'"
        >
          <img 
            :src="banner.image" 
            :alt="`Side Banner ${idx + 1}`"
            class="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
          />
        </NuxtLink>
      </div>
    </div>

    <!-- Products Slider Portion -->
    <div class="flex-1 min-w-0 relative -mx-2 sm:-mx-4 lg:-mx-6 -my-4 lg:my-0">
      <HomeProductsSliderShowcase 
        :products="products"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import HomeProductsSliderShowcase from '~/components/home/ProductsSliderShowcase.vue'
import type { Product } from '~/types'

const props = defineProps<{
  sideBannerImage?: string
  sideBannerImages?: (string | { image?: string; imageUrl?: string; url?: string; linkUrl?: string })[]
  sideBannerSlides?: { imageUrl?: string; image?: string; linkUrl?: string; url?: string }[]
  sideBannerUrl?: string
  products: Product[]
}>()

const currentIndex = ref(0)
let timer: ReturnType<typeof setInterval> | null = null

const banners = computed(() => {
  if (props.sideBannerSlides && props.sideBannerSlides.length > 0) {
    return props.sideBannerSlides.map((slide) => ({
      image: slide.imageUrl || slide.image || '',
      url: slide.linkUrl || slide.url || props.sideBannerUrl || '#'
    }))
  }

  if (props.sideBannerImages && props.sideBannerImages.length > 0) {
    return props.sideBannerImages.map((img) => 
      typeof img === 'string' 
        ? { image: img, url: props.sideBannerUrl || '#' } 
        : { image: img.imageUrl || img.image || '', url: img.linkUrl || img.url || props.sideBannerUrl || '#' }
    )
  }

  if (props.sideBannerImage) {
    return [
      { image: props.sideBannerImage, url: props.sideBannerUrl || '#' },
      { image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80', url: '/category/kitchen-appliances' },
      { image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80', url: '/brand/philips' },
    ]
  }

  return [
    { image: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop', url: '/brand/smeg' },
    { image: 'https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80', url: '/brand/philips' }
  ]
})

const startAutoPlay = () => {
  stopAutoPlay()
  if (banners.value.length > 1) {
    timer = setInterval(() => {
      currentIndex.value = (currentIndex.value + 1) % banners.value.length
    }, 3500)
  }
}

const stopAutoPlay = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

const pauseAutoPlay = () => stopAutoPlay()

onMounted(() => {
  startAutoPlay()
})

onUnmounted(() => {
  stopAutoPlay()
})
</script>
