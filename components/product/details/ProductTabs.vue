<template>
  <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden" :dir="layoutDirection">
    
    <!-- Tab Headers -->
    <div class="flex items-center overflow-x-auto no-scrollbar border-b border-slate-100 px-4 md:px-8">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="relative px-6 py-5 text-sm md:text-base font-bold whitespace-nowrap transition-colors cursor-pointer"
        :class="activeTab === tab.id ? 'text-[#0B0E28]' : 'text-slate-400 hover:text-slate-600'"
      >
        {{ tab.label }}
        <!-- Active Indicator -->
        <span 
          v-if="activeTab === tab.id" 
          class="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t-full"
        ></span>
      </button>
    </div>

    <!-- Tab Contents -->
    <div class="p-6 md:p-8 lg:p-10 min-h-[300px]">
      
      <!-- 1. Description Tab with v-html Rendering -->
      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === 'desc'" class="prose prose-slate max-w-none text-slate-600 leading-loose">
          <div 
            v-if="product.details || product.description" 
            v-html="product.details || product.description" 
            class="rich-html-content space-y-4 text-slate-700 font-medium text-start"
          ></div>
          <div v-else class="text-slate-400 font-bold text-sm text-center py-6">
            {{ layoutDirection === 'ltr' ? 'No detailed description available for this product.' : 'لا يوجد وصف تفصيلي متوفر لهذا المنتج.' }}
          </div>
        </div>

        <!-- 2. Technical Specs Tab -->
        <div v-else-if="activeTab === 'specs'" class="max-w-7xl mx-auto">
          <div v-if="specificationsList.length > 0" class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
            <div 
              v-for="(spec, index) in specificationsList" 
              :key="index" 
              class="flex flex-col sm:flex-row border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
            >
              <div class="bg-slate-50/50 sm:w-1/3 p-4 text-sm font-bold text-[#0B0E28] border-b sm:border-b-0 sm:border-s border-slate-100 text-start">
                {{ spec.label }}
              </div>
              <div class="p-4 text-sm text-slate-600 sm:w-2/3 font-medium text-start">
                {{ spec.value }}
              </div>
            </div>
          </div>
          <div v-else class="bg-slate-50 p-8 rounded-2xl text-center text-slate-500 font-bold text-sm">
            {{ layoutDirection === 'ltr' ? 'No additional specifications available for this product.' : 'لا توجد مواصفات إضافية لهذا المنتج حالياً.' }}
          </div>
        </div>

        <!-- 3. Reviews Tab -->
        <div v-else-if="activeTab === 'reviews'" class="max-w-7xl mx-auto space-y-6">
          <!-- Dynamic Reviews Summary Header -->
          <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
            <div class="text-center shrink-0">
              <span class="text-5xl font-black text-[#0B0E28]">{{ displayRating }}</span>
              <div class="flex items-center justify-center gap-1 my-2">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(Number(displayRating)) ? 'text-amber-500' : 'text-slate-300'" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
              </div>
              <span class="text-sm text-slate-500 font-medium">
                {{ layoutDirection === 'ltr' ? `Based on ${displayReviewsCount} reviews` : `بناءً على ${displayReviewsCount} تقييم` }}
              </span>
            </div>
            
            <!-- Dynamic Star Breakdown Bars (5 stars down to 1 star) -->
            <div class="w-full flex-1 space-y-2">
              <div v-for="item in ratingBreakdown" :key="item.star" class="flex items-center gap-3">
                <span class="text-xs font-bold w-3 text-slate-600">{{ item.star }}</span>
                <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <div class="flex-1 h-2.5 bg-slate-200/80 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-500 transition-all duration-500 rounded-full" :style="`width: ${item.percentage}%`"></div>
                </div>
                <span class="text-[11px] font-bold text-slate-400 min-w-[28px] text-end">{{ item.percentage }}%</span>
              </div>
            </div>
            
            <button @click="isReviewModalOpen = true" class="md:w-auto px-6 py-3 rounded-xl bg-[#0B0E28] text-amber-400 font-bold text-sm hover:bg-[#151a42] transition-colors shrink-0 cursor-pointer shadow-md">
              {{ layoutDirection === 'ltr' ? 'Add Your Review' : 'أضف تقييمك' }}
            </button>
          </div>

          <!-- Review Items List -->
          <div v-if="reviewsList.length > 0" class="space-y-4">
            <div v-for="(review, index) in reviewsList" :key="review.id || index" class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <div class="flex justify-between items-start mb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center text-base">
                    {{ review.author ? review.author.charAt(0) : 'U' }}
                  </div>
                  <div class="text-start">
                    <h5 class="font-bold text-[#0B0E28] text-sm">{{ review.author || (layoutDirection === 'ltr' ? 'Verified Customer' : 'عميل موثوق') }}</h5>
                    <span class="text-xs text-slate-400">{{ review.date || (layoutDirection === 'ltr' ? 'Recently' : 'مؤخراً') }}</span>
                  </div>
                </div>
                
                <div class="flex items-center gap-3">
                  <div class="flex gap-0.5">
                    <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= (review.rating || 5) ? 'text-amber-500' : 'text-slate-200'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                  </div>
                  
                  <button 
                    v-if="review.id" 
                    @click="handleLikeReview(review)"
                    class="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-500 transition-colors bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 cursor-pointer"
                    :title="layoutDirection === 'ltr' ? 'Like review' : 'أعجبني هذا التقييم'"
                  >
                    <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span>{{ review.likes_count || 0 }}</span>
                  </button>
                </div>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed text-start">{{ review.comment || review.details || (layoutDirection === 'ltr' ? 'Excellent product, fast delivery and great quality!' : 'منتج ممتاز ورائع، التوصيل سريع جداً والخامة ممتازة.') }}</p>
            </div>
          </div>
          <div v-else class="text-center py-8 text-slate-400 font-bold text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            {{ layoutDirection === 'ltr' ? 'No written reviews for this product yet. Be the first to leave a review!' : 'لا توجد تقييمات مكتوبة لهذا المنتج بعد. كن أول من يضيف تقييماً!' }}
          </div>

        </div>
      </Transition>
    </div>

    <!-- Extracted Review Modal -->
    <ReviewModal 
      :isOpen="isReviewModalOpen" 
      :productId="product?.id" 
      @close="isReviewModalOpen = false" 
      @submitted="$emit('reload-reviews')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ReviewModal from './ReviewModal.vue'
import { productApiService } from '~/services/productApiService'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  reviews: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['reload-reviews'])
const { t, layoutDirection } = useLanguage()

const tabs = computed(() => [
  { id: 'desc', label: layoutDirection.value === 'ltr' ? 'Product Details' : 'تفاصيل المنتج' },
  { id: 'specs', label: layoutDirection.value === 'ltr' ? 'Technical Specifications' : 'المواصفات الفنية' },
  { id: 'reviews', label: layoutDirection.value === 'ltr' ? 'Reviews & Ratings' : 'التقييمات والآراء' }
])

const activeTab = ref('desc')
const isReviewModalOpen = ref(false)

const reviewsList = computed(() => {
  return (props.reviews && props.reviews.length > 0) ? props.reviews : (props.product as any).reviews || []
})

const specificationsList = computed(() => {
  const specs: { label: string; value: string }[] = []
  const p = props.product as any
  if (!p) return specs

  if (p.brand) {
    specs.push({ 
      label: layoutDirection.value === 'ltr' ? 'Brand' : 'الماركة / العلامة التجارية', 
      value: typeof p.brand === 'object' ? p.brand.name : p.brand 
    })
  }
  if (p.unit) {
    specs.push({ 
      label: layoutDirection.value === 'ltr' ? 'Unit' : 'الوحدة', 
      value: p.unit 
    })
  }
  if (p.product_type) {
    specs.push({ 
      label: layoutDirection.value === 'ltr' ? 'Product Type' : 'نوع المنتج', 
      value: p.product_type === 'physical' ? (layoutDirection.value === 'ltr' ? 'Physical Product' : 'منتج مادي') : (layoutDirection.value === 'ltr' ? 'Digital Product' : 'منتج رقمي') 
    })
  }
  if (p.current_stock !== undefined) {
    specs.push({ 
      label: layoutDirection.value === 'ltr' ? 'Available Stock' : 'المخزون المتوفر', 
      value: `${p.current_stock} ${layoutDirection.value === 'ltr' ? 'items' : 'قطعة'}` 
    })
  }

  return specs
})

// === DYNAMIC RATING & REVIEWS COMPUTATIONS ===
const displayRating = computed(() => {
  if (reviewsList.value.length > 0) {
    const sum = reviewsList.value.reduce((acc, r: any) => acc + Number(r.rating || 5), 0)
    return (sum / reviewsList.value.length).toFixed(1)
  }
  const val = props.product.rating || (props.product as any).reviews_avg_rating || (props.product as any).average_rating || 5.0
  return Number(val).toFixed(1)
})

const displayReviewsCount = computed(() => {
  return reviewsList.value.length || props.product.reviewCount || (props.product as any).reviews_count || 0
})

// DYNAMIC STAR BREAKDOWN COMPUTATION (5 Stars down to 1 Star)
const ratingBreakdown = computed(() => {
  const counts: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  const total = reviewsList.value.length

  if (total > 0) {
    reviewsList.value.forEach((r: any) => {
      const star = Math.min(5, Math.max(1, Math.round(Number(r.rating || 5))))
      counts[star] = (counts[star] || 0) + 1
    })
  }

  return [5, 4, 3, 2, 1].map((star) => {
    const count = counts[star] || 0
    const percentage = total > 0 ? Math.round((count / total) * 100) : (star === 5 && total === 0 ? 100 : 0)
    return {
      star,
      count,
      percentage
    }
  })
})

const handleLikeReview = async (review: any) => {
  if (!review.id) return
  review.likes_count = (review.likes_count || 0) + 1
  await productApiService.likeProductReview(review.id)
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
  transform: translateY(10px);
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
