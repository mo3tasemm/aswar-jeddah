<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl border border-slate-100 relative space-y-6">
        
        <!-- Close Button -->
        <button @click="$emit('close')" class="absolute top-4 left-4 lg:top-6 lg:left-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <!-- Header -->
        <div>
          <h3 class="text-2xl font-black text-[#0B0E28] mb-1">أضف تقييمك للمنتج</h3>
          <p class="text-sm text-slate-500">شاركنا رأيك وتجربتك بكل شفافية.</p>
        </div>
        
        <!-- Star Rating -->
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-3">ما هو تقييمك العام؟</label>
          <div class="flex items-center gap-1.5 dir-ltr justify-end">
            <button 
              v-for="star in 5" 
              :key="star"
              @click="reviewForm.rating = star"
              class="transition-transform hover:scale-110 focus:outline-none"
            >
              <svg class="w-10 h-10" :class="star <= reviewForm.rating ? 'text-amber-500 drop-shadow-sm' : 'text-slate-200'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Name Input -->
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">الاسم <span class="text-rose-500">*</span></label>
          <input v-model="reviewForm.name" type="text" placeholder="مثال: أحمد محمد" class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:text-slate-400">
        </div>

        <!-- Review Textarea -->
        <div>
          <label class="block text-sm font-bold text-slate-700 mb-2">التقييم التفصيلي <span class="text-rose-500">*</span></label>
          <textarea v-model="reviewForm.comment" rows="4" placeholder="كيف كانت تجربتك مع هذا المنتج؟" class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none placeholder:text-slate-400"></textarea>
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button @click="$emit('close')" class="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-xs">
            إلغاء
          </button>
          <button @click="submitReview" class="bg-[#0B0E28] text-amber-400 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#151a42] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#0B0E28]/10">
            إرسال التقييم
          </button>
        </div>
        
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const reviewForm = ref({
  rating: 5,
  name: '',
  comment: ''
})

const submitReview = () => {
  // Normally you would send this to an API here
  console.log('Review submitted:', reviewForm.value)
  emit('close')
  
  // Reset form
  reviewForm.value = {
    rating: 5,
    name: '',
    comment: ''
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
  transform: translateY(10px);
}
</style>
