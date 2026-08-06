<template>
  <div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
    
    <!-- Tab Headers -->
    <div class="flex items-center overflow-x-auto no-scrollbar border-b border-slate-100 px-4 md:px-8">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="relative px-6 py-5 text-sm md:text-base font-bold whitespace-nowrap transition-colors"
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
      
      <!-- Description Tab -->
      <Transition name="fade" mode="out-in">
        <div v-if="activeTab === 'desc'" class="prose prose-slate max-w-none text-slate-600 leading-loose">
          <p class="text-base lg:text-lg mb-6">{{ product.description }}</p>
          <div class="grid md:grid-cols-2 gap-8 mt-12">
            <div class="bg-slate-50 p-6 rounded-2xl">
              <h4 class="font-bold text-[#0B0E28] mb-2 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                أداء استثنائي
              </h4>
              <p class="text-sm">تقنيات حديثة تضمن لك أفضل أداء بأقل استهلاك للطاقة بفضل المحرك الديجيتال.</p>
            </div>
            <div class="bg-slate-50 p-6 rounded-2xl">
              <h4 class="font-bold text-[#0B0E28] mb-2 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                تصميم عصري
              </h4>
              <p class="text-sm">لون فضي أنيق يتماشى مع أرقى المطابخ، مع لوحة تحكم سهلة الاستخدام.</p>
            </div>
          </div>
        </div>

        <!-- Specs Tab -->
        <div v-else-if="activeTab === 'specs'" class="max-w-7xl mx-auto">
          <div class="bg-white border border-slate-100 rounded-2xl overflow-hidden">
            <div v-for="(spec, index) in product.specs" :key="index" class="flex flex-col sm:flex-row border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors">
              <div class="bg-slate-50/50 sm:w-1/3 p-4 text-sm font-bold text-slate-700 border-b sm:border-b-0 sm:border-l border-slate-100">
                {{ spec.label }}
              </div>
              <div class="p-4 text-sm text-slate-600 sm:w-2/3">
                {{ spec.value }}
              </div>
            </div>
          </div>
        </div>

        <!-- Reviews Tab -->
        <div v-else-if="activeTab === 'reviews'" class="max-w-7xl mx-auto space-y-6">
          <div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8">
            <div class="text-center shrink-0">
              <span class="text-5xl font-black text-[#0B0E28]">{{ product.rating }}</span>
              <div class="flex items-center justify-center gap-1 my-2">
                <svg v-for="i in 5" :key="i" class="w-5 h-5" :class="i <= Math.round(product.rating) ? 'text-amber-500' : 'text-slate-300'" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" /></svg>
              </div>
              <span class="text-sm text-slate-500 font-medium">بناءً على {{ product.reviewsCount }} تقييم</span>
            </div>
            
            <div class="w-full flex-1 space-y-2">
              <div v-for="i in 5" :key="i" class="flex items-center gap-3">
                <span class="text-xs font-bold w-3">{{ 6 - i }}</span>
                <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                <div class="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div class="h-full bg-amber-500" :style="`width: ${i === 1 ? '70' : i === 2 ? '15' : '5'}%`"></div>
                </div>
              </div>
            </div>
            
            <button @click="isReviewModalOpen = true" class="md:w-auto px-6 py-3 rounded-xl bg-[#0B0E28] text-amber-400 font-bold text-sm hover:bg-[#151a42] transition-colors shrink-0">
              أضف تقييمك
            </button>
          </div>

          <!-- Review Items -->
          <div v-for="review in reviews" :key="review.id" class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-3">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-lg">
                  {{ review.author.charAt(0) }}
                </div>
                <div>
                  <h5 class="font-bold text-[#0B0E28] text-sm">{{ review.author }}</h5>
                  <span class="text-xs text-slate-400">{{ review.date }}</span>
                </div>
              </div>
              <div class="flex gap-0.5">
                <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= review.rating ? 'text-amber-500' : 'text-slate-200'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
              </div>
            </div>
            <p class="text-sm text-slate-600 leading-relaxed pr-13">{{ review.content }}</p>
          </div>

        </div>
      </Transition>
    </div>
    <!-- Extracted Review Modal -->
    <ReviewModal :isOpen="isReviewModalOpen" @close="isReviewModalOpen = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReviewModal from './ReviewModal.vue'

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

const tabs = [
  { id: 'desc', label: 'تفاصيل المنتج' },
  { id: 'specs', label: 'المواصفات الفنية' },
  { id: 'reviews', label: 'التقييمات والآراء' }
]

const activeTab = ref('desc')

// Modal State
const isReviewModalOpen = ref(false)
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
