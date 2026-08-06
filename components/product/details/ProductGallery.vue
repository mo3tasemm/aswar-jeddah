<template>
  <div class="flex flex-col gap-4 sticky top-24">
    
    <!-- Main Image Display -->
    <div class="relative w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-8 group">
      
      <!-- Badges -->
      <div class="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <span v-if="discountBadge" class="bg-amber-500 text-white text-xs md:text-sm font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/30">
          {{ discountBadge }}
        </span>
      </div>

      <!-- Brand Floating Badge -->
      <div v-if="brand" class="absolute top-4 left-4 z-10">
        <span class="bg-white/90 backdrop-blur text-slate-800 text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-sm border border-slate-100">
          {{ brand }}
        </span>
      </div>

      <!-- Image with Zoom/Hover effect -->
      <Transition name="fade" mode="out-in">
        <img 
          :key="activeImageIndex"
          :src="images[activeImageIndex]" 
          alt="Product Image" 
          class="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </Transition>

      <!-- Wishlist Floating Button (Top Left - Desktop hover only) -->
      <button class="absolute bottom-4 left-4 z-10 w-12 h-12 rounded-full bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 flex items-center justify-center shadow-lg transition-all md:opacity-0 md:group-hover:opacity-100">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
      </button>

    </div>

    <!-- Thumbnails Row -->
    <div v-if="images.length > 1" class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
      <button 
        v-for="(img, idx) in images" 
        :key="idx"
        @click="activeImageIndex = idx"
        class="relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-slate-50 p-2"
        :class="activeImageIndex === idx ? 'border-amber-500 shadow-md shadow-amber-500/20' : 'border-transparent hover:border-slate-200 opacity-60 hover:opacity-100'"
      >
        <img :src="img" alt="Thumbnail" class="w-full h-full object-contain mix-blend-multiply" />
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
    default: () => []
  },
  brand: {
    type: String,
    default: ''
  },
  discountBadge: {
    type: String,
    default: ''
  }
})

const activeImageIndex = ref(0)
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
