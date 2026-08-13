<template>
  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" :dir="layoutDirection">
      <div class="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl border border-slate-100 relative space-y-5 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        <!-- Close Button -->
        <button 
          @click="$emit('close')" 
          class="absolute top-4 end-4 lg:top-6 lg:end-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        
        <!-- Header -->
        <div class="text-start">
          <h3 class="text-2xl font-black text-[#0B0E28] mb-1">{{ layoutDirection === 'ltr' ? 'Add Your Review' : 'أضف تقييمك للمنتج' }}</h3>
          <p class="text-sm text-slate-500">{{ layoutDirection === 'ltr' ? 'Share your experience with this product.' : 'شاركنا رأيك وتجربتك مع المنتج بكل شفافية.' }}</p>
        </div>

        <!-- Alert Notification -->
        <div v-if="alertMessage" :class="['p-4 rounded-2xl text-xs font-bold transition-all text-start', alertSuccess ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200']">
          {{ alertMessage }}
        </div>
        
        <!-- Star Rating -->
        <div class="text-start">
          <label class="block text-sm font-bold text-slate-700 mb-2">{{ layoutDirection === 'ltr' ? 'Overall Rating' : 'ما هو تقييمك العام؟' }}</label>
          <div class="flex items-center gap-1.5 justify-start">
            <button 
              v-for="star in 5" 
              :key="star"
              type="button"
              @click="reviewForm.rating = star"
              class="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
            >
              <svg class="w-9 h-9" :class="star <= reviewForm.rating ? 'text-amber-500 drop-shadow-sm' : 'text-slate-200'" viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Optional Order ID Input -->
        <div class="text-start">
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ layoutDirection === 'ltr' ? 'Order ID (Optional)' : 'رقم الطلب (اختياري لتوثيق الشراء)' }}</label>
          <input 
            v-model="reviewForm.order_id" 
            type="text" 
            :placeholder="layoutDirection === 'ltr' ? 'e.g. 100408' : 'مثال: 100408'" 
            class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:font-normal placeholder:text-slate-400 text-start"
          >
        </div>

        <!-- Review Textarea -->
        <div class="text-start">
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ layoutDirection === 'ltr' ? 'Detailed Review' : 'التقييم التفصيلي' }} <span class="text-rose-500">*</span></label>
          <textarea 
            v-model="reviewForm.comment" 
            rows="4" 
            :placeholder="layoutDirection === 'ltr' ? 'Write your review here...' : 'اكتب تجربتك الدقيقة مع هذا المنتج...'" 
            class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none placeholder:text-slate-400 text-start"
          ></textarea>
        </div>

        <!-- File Upload Input -->
        <div class="text-start">
          <label class="block text-xs font-bold text-slate-600 mb-1.5">{{ layoutDirection === 'ltr' ? 'Attach Photos (Optional)' : 'إرفاق صور للمنتج (اختياري)' }}</label>
          <input 
            type="file" 
            multiple 
            accept="image/*" 
            @change="handleFileUpload" 
            class="w-full text-xs text-slate-500 file:me-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
          />
        </div>

        <!-- Actions -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button 
            @click="$emit('close')" 
            class="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-xs cursor-pointer"
          >
            {{ layoutDirection === 'ltr' ? 'Cancel' : 'إلغاء' }}
          </button>
          <button 
            @click="submitReview" 
            :disabled="isSubmitting"
            class="bg-[#0B0E28] text-amber-400 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#151a42] transition-all shadow-lg shadow-[#0B0E28]/10 flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span v-if="isSubmitting" class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
            <span>{{ isSubmitting ? (layoutDirection === 'ltr' ? 'Submitting...' : 'جاري إرسال التقييم...') : (layoutDirection === 'ltr' ? 'Submit Review' : 'إرسال التقييم') }}</span>
          </button>
        </div>
        
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { productApiService } from '~/services/productApiService'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  productId: {
    type: [Number, String],
    default: null
  }
})

const emit = defineEmits(['close', 'submitted'])
const { t, layoutDirection } = useLanguage()

const isSubmitting = ref(false)
const alertMessage = ref('')
const alertSuccess = ref(false)
const uploadedFiles = ref<File[]>([])

const reviewForm = ref({
  rating: 5,
  order_id: '',
  comment: ''
})

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    uploadedFiles.value = Array.from(target.files)
  }
}

const submitReview = async () => {
  if (!reviewForm.value.comment.trim()) {
    alertMessage.value = layoutDirection.value === 'ltr' ? 'Please write your review before submitting.' : 'يرجى كتابة نص التقييم قبل الإرسال.'
    alertSuccess.value = false
    return
  }

  isSubmitting.value = true
  alertMessage.value = ''

  try {
    const res = await productApiService.submitProductReview({
      product_id: props.productId || 1,
      order_id: reviewForm.value.order_id || undefined,
      rating: reviewForm.value.rating,
      comment: reviewForm.value.comment,
      files: uploadedFiles.value
    })

    alertSuccess.value = res.success
    alertMessage.value = res.message || (layoutDirection.value === 'ltr' ? 'Review submitted successfully.' : 'تم إرسال التقييم بنجاح.')

    if (res.success) {
      setTimeout(() => {
        emit('submitted')
        emit('close')
        reviewForm.value = { rating: 5, order_id: '', comment: '' }
        uploadedFiles.value = []
        alertMessage.value = ''
      }, 1500)
    }
  } catch (err: any) {
    alertSuccess.value = false
    alertMessage.value = layoutDirection.value === 'ltr' ? 'An error occurred while submitting review.' : 'حدث خطأ أثناء إرسال التقييم.'
  } finally {
    isSubmitting.value = false
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
