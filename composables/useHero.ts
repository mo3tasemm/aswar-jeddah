import { ref, onMounted, onUnmounted } from 'vue'
import type { HeroSlide } from '~/types/hero'

export const useHero = (initialSlides: HeroSlide[] = []) => {
  const slides = ref<HeroSlide[]>(initialSlides)

  const currentIndex = ref(0)
  let autoplayTimer: ReturnType<typeof setInterval> | null = null

  const nextSlide = () => {
    currentIndex.value = (currentIndex.value + 1) % slides.value.length
  }

  const prevSlide = () => {
    currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length
  }

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.value.length) {
      currentIndex.value = index
    }
  }

  const startAutoplay = () => {
    if (!autoplayTimer) {
      autoplayTimer = setInterval(() => {
        nextSlide()
      }, 5000)
    }
  }

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer)
      autoplayTimer = null
    }
  }

  onMounted(() => {
    startAutoplay()
  })

  onUnmounted(() => {
    stopAutoplay()
  })

  return {
    slides,
    currentIndex,
    nextSlide,
    prevSlide,
    goToSlide,
    startAutoplay,
    stopAutoplay,
  }
}
