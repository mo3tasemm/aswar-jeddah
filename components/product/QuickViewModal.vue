<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <!-- Backdrop -->
      <div 
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal Container -->
      <div 
        class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 animate-fade-in-up"
        dir="rtl"
      >
        <!-- Close Button -->
        <button 
          @click="closeModal"
          class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Right Side: Image Slider (In RTL, this is technically the right side, so first flex item) -->
        <div class="w-full md:w-1/2 relative group bg-white border-b md:border-b-0 md:border-l border-slate-100">
          <!-- Main Image Container -->
          <div class="relative w-full h-[300px] md:h-full min-h-[300px] flex items-center justify-center p-8">
            <img 
              :src="product.images[currentImageIndex]" 
              :alt="product.title"
              class="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
            />
            
            <!-- View Details Overlay Button -->
            <div class="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <NuxtLink 
                :to="`/product/${product.slug}`"
                class="bg-[#0b1a30] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-luxury-gold hover:text-white transition-colors shadow-lg whitespace-nowrap"
              >
                عرض التفاصيل الكاملة
              </NuxtLink>
            </div>
          </div>

          <!-- Slider Arrows (if multiple images) -->
          <button 
            v-if="product.images.length > 1"
            @click="prevImage"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-luxury-gold hover:text-white transition-colors text-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          
          <button 
            v-if="product.images.length > 1"
            @click="nextImage"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-luxury-gold hover:text-white transition-colors text-slate-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        <!-- Left Side: Product Details -->
        <div class="w-full md:w-1/2 overflow-y-auto max-h-[50vh] md:max-h-[80vh] p-6 md:p-8 space-y-5 bg-slate-50/50">
          <!-- Brand & Rating -->
          <div class="flex items-center justify-between">
            <span class="text-sm font-bold text-slate-500 uppercase tracking-widest">{{ product.brand || product.category }}</span>
            <div v-if="product.rating" class="flex items-center gap-1 text-yellow-500">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
              <span class="text-xs font-bold text-slate-600 mt-1">{{ product.rating }} ({{ product.reviewCount || 0 }})</span>
            </div>
          </div>

          <!-- Title -->
          <h2 class="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
            {{ product.title }}
          </h2>

          <!-- Price -->
          <div class="flex items-end gap-3 pb-4 border-b border-slate-200">
            <span class="text-2xl font-black text-[#1a66cc]">{{ product.formattedPrice }}</span>
            <span v-if="product.formattedOldPrice" class="text-sm text-slate-400 line-through mb-1">{{ product.formattedOldPrice }}</span>
          </div>

          <!-- Features / Specs List -->
          <div class="py-2">
            <h4 class="text-sm font-bold text-slate-800 mb-3">أبرز المواصفات:</h4>
            <ul class="space-y-2">
              <li 
                v-for="(feature, idx) in product.features || defaultFeatures" 
                :key="idx"
                class="flex items-start gap-2 text-sm text-slate-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-green-500 flex-shrink-0">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>

          <!-- Availability & SKU -->
          <div class="flex items-center justify-between text-sm py-2">
            <span :class="product.inStock ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'">
              {{ product.availabilityStatus || (product.inStock ? 'متوفر في المخزون' : 'نفذت الكمية') }}
            </span>
            <span class="text-slate-500 font-medium text-xs uppercase">SKU: {{ product.sku || 'N/A' }}</span>
          </div>

          <!-- Add to Cart Area -->
          <div class="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 mt-auto">
            <!-- Quantity Box -->
            <div class="flex items-center border border-slate-300 rounded-lg h-12 w-full sm:w-32 bg-white flex-shrink-0">
              <button @click="quantity > 1 && quantity--" class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-50 rounded-r-lg transition-colors pb-1">-</button>
              <input type="text" readonly :value="quantity" class="w-full h-full text-center font-bold text-slate-800 bg-transparent outline-none pointer-events-none" />
              <button @click="quantity++" class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-50 rounded-l-lg transition-colors pb-1">+</button>
            </div>
            
            <!-- Add Button -->
            <button 
              @click="handleAddToCart"
              :disabled="!product.inStock"
              class="flex-grow h-12 w-full bg-[#0b1a30] text-white font-bold rounded-lg hover:bg-luxury-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              إضافة إلى السلة
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'
import type { Product } from '~/types'
import { useCart } from '~/composables/useCart'

const props = defineProps<{
  isOpen: boolean
  product: Product
}>()

const emit = defineEmits(['close'])
const { addToCart } = useCart()

const currentImageIndex = ref(0)
const quantity = ref(1)

const defaultFeatures = [
  'جودة تصنيع عالية وتصميم عصري يعزز مطبخك.',
  'أداء قوي وفعال يلبي كافة الاحتياجات اليومية.',
  'ضمان الوكيل الشامل المعتمد لمدة سنتين.',
  'توفير في استهلاك الطاقة بفضل التكنولوجيا الحديثة.'
]

const nextImage = () => {
  if (currentImageIndex.value < props.product.images.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else {
    currentImageIndex.value = props.product.images.length - 1
  }
}

const closeModal = () => {
  emit('close')
}

const handleAddToCart = () => {
  for (let i = 0; i < quantity.value; i++) {
    addToCart(props.product)
  }
  closeModal()
}

// Handle Body Scroll Lock
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    quantity.value = 1 // Reset quantity when opened
    currentImageIndex.value = 0
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup just in case modal unmounts while open
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
