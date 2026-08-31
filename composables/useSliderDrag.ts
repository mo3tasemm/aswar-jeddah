import { ref, onMounted, onUnmounted } from 'vue'

export interface UseSliderDragOptions {
  scrollAmount?: number
  dragSpeed?: number
}

export const useSliderDrag = (options: UseSliderDragOptions = {}) => {
  const sliderRef = ref<HTMLElement | null>(null)
  const isDragging = ref(false)
  const hasDragged = ref(false)
  
  let startX = 0
  let startScrollLeft = 0
  const dragThreshold = 6 // pixels moved before treating as drag instead of click
  const defaultScrollAmount = options.scrollAmount || 360
  const dragSpeed = options.dragSpeed || 1.4

  const onMouseDown = (e: MouseEvent) => {
    if (!sliderRef.value) return
    // Only handle primary (left) mouse button
    if (e.button !== 0) return

    isDragging.value = true
    hasDragged.value = false
    startX = e.pageX - sliderRef.value.offsetLeft
    startScrollLeft = sliderRef.value.scrollLeft
    sliderRef.value.style.scrollBehavior = 'auto' // Instant for smooth dragging
    sliderRef.value.style.cursor = 'grabbing'
    sliderRef.value.style.userSelect = 'none'
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value || !sliderRef.value) return
    e.preventDefault()

    const currentX = e.pageX - sliderRef.value.offsetLeft
    const diff = (currentX - startX) * dragSpeed

    if (Math.abs(diff) > dragThreshold) {
      hasDragged.value = true
    }

    sliderRef.value.scrollLeft = startScrollLeft - diff
  }

  const onMouseUp = () => {
    if (!isDragging.value) return
    isDragging.value = false
    if (sliderRef.value) {
      sliderRef.value.style.scrollBehavior = 'smooth'
      sliderRef.value.style.cursor = 'grab'
      sliderRef.value.style.removeProperty('user-select')
    }
  }

  const onMouseLeave = () => {
    if (isDragging.value) {
      onMouseUp()
    }
  }

  // Intercept and cancel clicks on child links if user dragged
  const onClickCapture = (e: MouseEvent) => {
    if (hasDragged.value) {
      e.preventDefault()
      e.stopPropagation()
      hasDragged.value = false
    }
  }

  // Arrow navigation functions
  const scrollLeft = (amount: number = defaultScrollAmount) => {
    if (!sliderRef.value) return
    sliderRef.value.style.scrollBehavior = 'smooth'
    sliderRef.value.scrollBy({ left: -amount, behavior: 'smooth' })
  }

  const scrollRight = (amount: number = defaultScrollAmount) => {
    if (!sliderRef.value) return
    sliderRef.value.style.scrollBehavior = 'smooth'
    sliderRef.value.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const scroll = (direction: 'left' | 'right', amount: number = defaultScrollAmount) => {
    if (direction === 'left') {
      scrollLeft(amount)
    } else {
      scrollRight(amount)
    }
  }

  onMounted(() => {
    if (sliderRef.value) {
      sliderRef.value.style.cursor = 'grab'
    }
  })

  return {
    sliderRef,
    isDragging,
    hasDragged,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onClickCapture,
    scrollLeft,
    scrollRight,
    scroll
  }
}
