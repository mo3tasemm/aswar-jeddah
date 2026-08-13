<template>
  <Transition name="slide-up">
    <div 
      v-if="isVisible" 
      class="fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 pb-safe flex items-center gap-4 md:hidden"
    >
      <div class="flex-1 min-w-0">
        <h4 class="text-xs font-bold text-slate-500 truncate mb-0.5">{{ product.title }}</h4>
        <div class="text-lg font-black text-[#0B0E28] leading-none">{{ product.formattedPrice }}</div>
      </div>
      
      <button 
        @click="handleAddToCart"
        class="shrink-0 bg-amber-500 text-slate-900 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        إضافة للسلة
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const { addToCart, openCart } = useCart()

const isVisible = ref(false)

const handleAddToCart = () => {
  addToCart(props.product, 1)
  openCart()
}

onMounted(() => {
  let ticking = false
  const updateScroll = () => {
    const y = window.scrollY
    if (!isVisible.value && y > 400) {
      isVisible.value = true
    } else if (isVisible.value && y < 300) {
      isVisible.value = false
    }
    ticking = false
  }

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScroll)
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  updateScroll()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.pb-safe {
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}
</style>
