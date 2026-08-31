<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
    >
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        @click="closeModal"
      ></div>

      <!-- Modal Container -->
      <div 
        class="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 animate-fade-in-up border border-slate-100"
        :dir="layoutDirection"
      >
        <!-- Close Button -->
        <button 
          @click="closeModal"
          class="absolute top-4 end-4 z-30 w-9 h-9 flex items-center justify-center rounded-full bg-slate-100/90 text-slate-600 hover:bg-rose-50 hover:text-rose-500 transition-all shadow-sm active:scale-95 cursor-pointer"
          :title="t('common.close') || 'إغلاق'"
          aria-label="إغلاق"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Start Side (Image Gallery) -->
        <div class="w-full md:w-1/2 relative bg-slate-50/60 border-b md:border-b-0 md:border-e border-slate-100 flex flex-col justify-between p-4 sm:p-6">
          
          <!-- Discount Badge -->
          <div v-if="discountBadgeText" class="absolute top-4 start-4 z-20">
            <span class="bg-[#0B0E28] text-amber-400 text-xs font-black px-3 py-1 rounded-full shadow-sm">
              {{ discountBadgeText }}
            </span>
          </div>

          <!-- Main Image Container -->
          <div class="relative w-full h-56 sm:h-72 md:h-80 flex items-center justify-center p-2 my-auto">
            <img 
              :src="activeImage" 
              :alt="displayTitle"
              class="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              loading="lazy"
            />
            
            <!-- Slider Arrows (if multiple images) -->
            <button 
              v-if="galleryImages.length > 1"
              type="button"
              @click="prevImage"
              class="absolute start-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-[#0B0E28] hover:text-white transition-all text-slate-800 cursor-pointer"
              title="السابق"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            
            <button 
              v-if="galleryImages.length > 1"
              type="button"
              @click="nextImage"
              class="absolute end-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-[#0B0E28] hover:text-white transition-all text-slate-800 cursor-pointer"
              title="التالي"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          <!-- Thumbnails Strip -->
          <div v-if="galleryImages.length > 1" class="flex items-center justify-center gap-2 pt-3 overflow-x-auto no-scrollbar">
            <button 
              v-for="(img, idx) in galleryImages" 
              :key="idx"
              type="button"
              @click="currentImageIndex = idx"
              :class="[
                'w-12 h-12 rounded-xl p-1 border transition-all shrink-0 bg-white cursor-pointer overflow-hidden',
                currentImageIndex === idx ? 'border-amber-500 ring-2 ring-amber-500/20 scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
              ]"
            >
              <img :src="img" :alt="`${displayTitle} - ${idx + 1}`" class="w-full h-full object-contain mix-blend-multiply" />
            </button>
          </div>
        </div>

        <!-- End Side (Product Details & Purchase Actions) -->
        <div class="w-full md:w-1/2 overflow-y-auto max-h-[50vh] md:max-h-[85vh] p-5 sm:p-7 md:p-8 space-y-4 bg-white flex flex-col text-start">
          
          <!-- Category / Brand & Reviews Bar -->
          <div class="flex items-center justify-between gap-2">
            <span class="text-xs font-bold text-amber-600 uppercase tracking-wider truncate">
              {{ brandDisplay || activeProduct.category || '' }}
            </span>

            <div v-if="activeProduct.rating || (activeProduct as any)?.reviews_avg_rating" class="flex items-center gap-1 text-amber-400 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
              <span class="text-xs font-bold text-slate-700">
                {{ Number(activeProduct.rating || (activeProduct as any)?.reviews_avg_rating).toFixed(1) }}
                <span class="text-slate-400 font-normal">({{ activeProduct.reviewCount || (activeProduct as any)?.reviews_count || 0 }})</span>
              </span>
            </div>
          </div>

          <!-- Product Title -->
          <h2 class="text-lg sm:text-xl font-black text-slate-900 leading-snug">
            {{ displayTitle }}
          </h2>

          <!-- Price Row -->
          <div class="flex items-center gap-3 pb-3 border-b border-slate-100">
            <span class="text-2xl sm:text-3xl font-black text-[#0B0E28] tracking-tight">
              {{ displayPrice }}
            </span>
            <span v-if="displayOriginalPrice" class="text-sm sm:text-base text-slate-400 line-through font-semibold">
              {{ displayOriginalPrice }}
            </span>
          </div>

          <!-- Product Description (From Backend API) -->
          <div v-if="cleanDescription" class="py-1">
            <p class="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-4">
              {{ cleanDescription }}
            </p>
          </div>

          <!-- Stock & SKU Meta -->
          <div class="flex items-center justify-between text-xs py-2 bg-slate-50 px-3.5 rounded-xl border border-slate-100/80">
            <div class="flex items-center gap-2">
              <span 
                class="w-2 h-2 rounded-full" 
                :class="isAvailable ? 'bg-emerald-500' : 'bg-rose-500'"
              ></span>
              <span :class="isAvailable ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'">
                {{ isAvailable ? t('product.in_stock') : t('product.out_of_stock') }}
              </span>
            </div>
            <span v-if="activeProduct.sku" class="text-slate-500 font-medium uppercase text-[11px]">
              {{ t('product.sku') }}: {{ activeProduct.sku }}
            </span>
          </div>

          <!-- Quantity & Add to Cart -->
          <div class="pt-2 space-y-3 mt-auto">
            <div class="flex items-center gap-3">
              <!-- Quantity Controller -->
              <div class="flex items-center border border-slate-200 rounded-xl h-11 bg-slate-50 shrink-0">
                <button 
                  type="button"
                  @click="decreaseQty" 
                  class="w-9 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 rounded-s-xl transition-colors font-bold text-base cursor-pointer"
                >
                  -
                </button>
                <input 
                  type="text" 
                  readonly 
                  :value="quantity" 
                  class="w-10 text-center font-bold text-xs text-slate-900 bg-transparent outline-none pointer-events-none" 
                />
                <button 
                  type="button"
                  @click="increaseQty" 
                  class="w-9 h-full flex items-center justify-center text-slate-600 hover:text-black hover:bg-slate-100 rounded-e-xl transition-colors font-bold text-base cursor-pointer"
                >
                  +
                </button>
              </div>

              <!-- Add to Cart Button -->
              <button 
                type="button"
                @click="handleAddToCart"
                :disabled="isAdding || !isAvailable"
                class="flex-1 h-11 bg-[#0B0E28] hover:bg-[#1a204d] text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <svg v-if="isAdding" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <svg v-else-if="justAdded" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <svg v-else class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>{{ justAdded ? (layoutDirection === 'ltr' ? 'Added!' : 'تمت الإضافة!') : t('product.add_to_cart') }}</span>
              </button>
            </div>

            <!-- Full Details Link -->
            <NuxtLink 
              :to="localePath(`/product/${activeProduct.slug || activeProduct.id}`)"
              @click="closeModal"
              class="w-full py-2.5 rounded-xl border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-700 hover:text-amber-700 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <span>{{ layoutDirection === 'ltr' ? 'View Full Product Details' : 'عرض كافة تفاصيل ومواصفات المنتج' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </NuxtLink>
          </div>

        </div>

      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import type { Product } from '~/types/product'
import { useCart } from '~/composables/useCart'
import { useLanguage } from '~/composables/useLanguage'
import { useBrands } from '~/composables/useBrands'
import { productApiService } from '~/services/productApiService'

const props = defineProps<{
  isOpen: boolean
  product: Product
}>()

const emit = defineEmits(['close'])

const { t, formatCurrency, layoutDirection, localePath, apiLocale } = useLanguage()
const { addToCart } = useCart()
const { brands } = useBrands()

const detailedProduct = ref<Product | null>(null)
const isLoadingDetails = ref(false)
const currentImageIndex = ref(0)
const quantity = ref(1)
const isAdding = ref(false)
const justAdded = ref(false)

// Active working product (detailed data if available, fallback to initial props)
const activeProduct = computed<Product>(() => {
  return detailedProduct.value || props.product
})

// Localized Title
const displayTitle = computed(() => {
  const p = activeProduct.value
  if (!p) return ''
  if (layoutDirection.value === 'ltr') {
    return (p as any).name_en || (p as any).title_en || (p as any).en_name || p.title || p.name || 'Featured Product'
  }
  return p.title || p.name || 'منتج مميز'
})

// Brand Name Display
const brandDisplay = computed(() => {
  const p = activeProduct.value
  if (!p) return ''
  
  const targetBrandId = p.brandId || (typeof p.brand === 'object' ? (p.brand as any)?.id : undefined)
  if (targetBrandId !== undefined && targetBrandId !== null && brands.value.length > 0) {
    const matchedBrand = brands.value.find(b => String(b.id) === String(targetBrandId))
    if (matchedBrand && matchedBrand.name) {
      return matchedBrand.name
    }
  }

  if (typeof p.brand === 'object' && (p.brand as any)?.name) {
    return (p.brand as any).name
  }

  if (p.brandName && p.brandName.trim() !== '') {
    return p.brandName
  }

  if (typeof p.brand === 'string' && p.brand.trim() !== '') {
    return p.brand
  }

  return ''
})

// Images Gallery
const galleryImages = computed<string[]>(() => {
  const p = activeProduct.value
  if (!p) return []
  const list: string[] = []

  if (Array.isArray(p.images) && p.images.length > 0) {
    p.images.forEach(img => {
      if (img && typeof img === 'string' && img.trim()) {
        list.push(img)
      }
    })
  }

  if (p.thumbnail && typeof p.thumbnail === 'string' && !list.includes(p.thumbnail)) {
    list.unshift(p.thumbnail)
  }

  return list.length > 0 ? list : ['/images/placeholder.png']
})

const activeImage = computed(() => {
  const images = galleryImages.value
  if (currentImageIndex.value >= 0 && currentImageIndex.value < images.length) {
    return images[currentImageIndex.value]
  }
  return images[0] || '/images/placeholder.png'
})

// Prices & Discounts
const displayPrice = computed(() => {
  if (!activeProduct.value) return formatCurrency(0)
  return formatCurrency(activeProduct.value.price || 0)
})

const displayOriginalPrice = computed(() => {
  const p = activeProduct.value
  if (!p || !p.hasDiscount || !p.originalPrice) return ''
  return formatCurrency(p.originalPrice)
})

const discountBadgeText = computed(() => {
  const p = activeProduct.value
  if (!p) return ''
  const pct = p.discountPercentage || 0
  if (pct > 0) {
    return layoutDirection.value === 'ltr' ? `${pct}% OFF` : `خصم ${pct}%`
  }
  return p.discountBadge || ''
})

// Stock Availability
const isAvailable = computed(() => {
  const p = activeProduct.value
  if (!p) return false
  return p.inStock ?? ((p as any).current_stock > 0)
})

// Clean Plaintext Description from HTML
const cleanDescription = computed(() => {
  const p = activeProduct.value
  const desc = p?.description || (p as any)?.details || ''
  if (!desc) return ''
  return desc.replace(/<[^>]*>?/gm, '').trim()
})

// Fetch Full Details from Backend API when modal opens
const fetchDetails = async () => {
  if (!props.product) return
  const idOrSlug = props.product.id || props.product.slug
  if (!idOrSlug) return

  isLoadingDetails.value = true
  try {
    const fullData = await productApiService.fetchProductDetails(idOrSlug, '1', apiLocale.value)
    if (fullData) {
      detailedProduct.value = fullData
    }
  } catch (err) {
    console.warn('[QuickViewModal] Error fetching full product details:', err)
  } finally {
    isLoadingDetails.value = false
  }
}

// Navigation Controls
const nextImage = () => {
  const len = galleryImages.value.length
  if (len <= 1) return
  currentImageIndex.value = (currentImageIndex.value + 1) % len
}

const prevImage = () => {
  const len = galleryImages.value.length
  if (len <= 1) return
  currentImageIndex.value = (currentImageIndex.value - 1 + len) % len
}

const increaseQty = () => {
  quantity.value++
}

const decreaseQty = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const closeModal = () => {
  emit('close')
}

const handleAddToCart = async () => {
  if (isAdding.value || !activeProduct.value) return
  isAdding.value = true

  try {
    await addToCart(activeProduct.value, quantity.value)
    justAdded.value = true
    setTimeout(() => {
      justAdded.value = false
      closeModal()
    }, 900)
  } catch (err) {
    console.error('Failed to add to cart:', err)
  } finally {
    isAdding.value = false
  }
}

// Watchers
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (process.client) {
      document.body.style.overflow = 'hidden'
    }
    quantity.value = 1
    currentImageIndex.value = 0
    detailedProduct.value = null
    fetchDetails()
  } else {
    if (process.client) {
      document.body.style.overflow = ''
    }
  }
})

onUnmounted(() => {
  if (process.client) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
