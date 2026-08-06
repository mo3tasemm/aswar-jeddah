<template>
  <Transition name="fade-slide">
    <button
      v-if="isVisible"
      @click="scrollToTop"
      class="fixed bottom-6 rtl:left-6 ltr:right-6 z-[90] w-12 h-12 rounded-full shadow-lg bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
      aria-label="العودة للأعلى"
      title="العودة للأعلى"
    >
      <svg class="w-6 h-6 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
      </svg>
    </button>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  // Show button when scrolled down 400px
  isVisible.value = window.scrollY > 400
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
