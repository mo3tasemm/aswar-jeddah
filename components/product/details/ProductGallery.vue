<template>
  <div class="flex flex-col gap-4 sticky top-24">
    
    <!-- Main Image Display Container -->
    <div class="relative w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-8 group">
      
      <!-- Badges -->
      <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span v-if="discountBadge" class="bg-amber-500 text-white text-xs md:text-sm font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
          {{ discountBadge }}
        </span>
      </div>

      <!-- Brand Floating Logo / Name Badge -->
      <div v-if="brandName" class="absolute top-4 left-4 z-10">
        <div class="bg-white/95 backdrop-blur text-slate-800 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2">
          <img 
            v-if="brandLogo" 
            :src="brandLogo" 
            :alt="brandName" 
            class="h-5 w-auto object-contain max-w-[80px]" 
          />
          <span v-else>{{ brandName }}</span>
        </div>
      </div>

      <!-- Image Navigation Arrows (Appear on Hover) -->
      <button 
        v-if="imagesList.length > 1"
        @click.stop="prevImage"
        class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-[#0B0E28] hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="الصورة السابقة"
      >
        <svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <button 
        v-if="imagesList.length > 1"
        @click.stop="nextImage"
        class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-[#0B0E28] hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer"
        aria-label="الصورة التالية"
      >
        <svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

      <!-- Main Image with Fade -->
      <Transition name="fade" mode="out-in">
        <img 
          :key="activeImageIndex"
          :src="imagesList[activeImageIndex]" 
          alt="Product Image" 
          class="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </Transition>

    </div>

    <!-- Thumbnails Row -->
    <div v-if="imagesList.length > 1" class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
      <button 
        v-for="(img, idx) in imagesList" 
        :key="idx"
        @click="activeImageIndex = idx"
        class="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-slate-50 p-2 cursor-pointer"
        :class="activeImageIndex === idx ? 'border-amber-500 shadow-md shadow-amber-500/20' : 'border-transparent hover:border-slate-200 opacity-60 hover:opacity-100'"
      >
        <img :src="img" alt="Thumbnail" class="w-full h-full object-contain mix-blend-multiply" />
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    default: () => []
  },
  brand: {
    type: [Object, String],
    default: ''
  },
  discountBadge: {
    type: String,
    default: ''
  }
})

const activeImageIndex = ref(0)

const imagesList = computed(() => {
  if (Array.isArray(props.images) && props.images.length > 0) {
    return props.images as string[]
  }
  return ['https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80']
})

const brandLogo = computed(() => {
  if (typeof props.brand === 'object' && props.brand !== null) {
    return (props.brand as any).logo || (props.brand as any).image || (props.brand as any).icon || ''
  }
  return ''
})

const brandName = computed(() => {
  if (typeof props.brand === 'object' && props.brand !== null) {
    return (props.brand as any).name || ''
  }
  return String(props.brand || '')
})

const prevImage = () => {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
  } else {
    activeImageIndex.value = imagesList.value.length - 1
  }
}

const nextImage = () => {
  if (activeImageIndex.value < imagesList.value.length - 1) {
    activeImageIndex.value++
  } else {
    activeImageIndex.value = 0
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
