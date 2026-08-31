<template>
  <div class="payment-failure-page selection:bg-rose-500 selection:text-white bg-[#F8F9FA] min-h-[calc(100vh-200px)] py-6 sm:py-10 font-sans" :dir="layoutDirection">
    
    <!-- Top Breadcrumbs Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
      <nav class="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1 text-start">
        <NuxtLink :to="localePath('/')" class="hover:text-amber-500 transition-colors">
          {{ isEn ? 'Home' : 'الرئيسية' }}
        </NuxtLink>
        <span>/</span>
        <NuxtLink :to="localePath('/cart')" class="hover:text-amber-500 transition-colors">
          {{ isEn ? 'Cart' : 'السلة' }}
        </NuxtLink>
        <span>/</span>
        <NuxtLink :to="localePath('/checkout')" class="hover:text-amber-500 transition-colors">
          {{ isEn ? 'Checkout' : 'إتمام الطلب' }}
        </NuxtLink>
        <span>/</span>
        <span class="text-rose-600 font-bold">
          {{ isEn ? 'Payment Cancelled' : 'فشل الدفع' }}
        </span>
      </nav>
    </div>

    <!-- 4-Step Stepper (Step 3: Payment Method Highlighted / Interrupted) -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
      <CheckoutStepper :currentStep="3" />
    </div>

    <!-- Wide Horizontal Failure Card Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      
      <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        
        <!-- Top Status Gradient Bar -->
        <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500"></div>

        <!-- 1. Header Hero Area (Horizontal layout on desktop) -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-8 border-b border-slate-100 text-center sm:text-start">
          
          <!-- Failure Icon Badge -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-rose-50 border-2 border-rose-100 text-rose-500 flex items-center justify-center shrink-0 shadow-inner">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
          </div>

          <!-- Titles & Reassurance -->
          <div class="flex-1 space-y-1.5">
            <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span class="px-3 py-1 bg-rose-100/80 text-rose-800 text-xs font-black rounded-full">
                {{ isEn ? 'Payment Cancelled or Incomplete' : 'لم تكتمل عملية الدفع' }}
              </span>
              <span class="text-xs text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md font-bold">
                {{ isEn ? 'No amount was charged' : 'لم يتم خصم أي مبلغ' }}
              </span>
            </div>

            <h1 class="text-xl sm:text-2xl md:text-3xl font-black text-[#0B0E28]">
              {{ isEn ? 'Payment Was Not Completed' : 'عذراً، لم تكتمل عملية الدفع أو تم إلغاؤها' }}
            </h1>

            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {{ isEn 
                ? 'The transaction was cancelled or could not be completed. Rest assured, your cart items are preserved and you can retry paying easily.' 
                : 'تم إلغاء عملية الدفع أو إغلاق النافذة قبل التأكيد. نطمئنك بأن سلتك محفوظة بالكامل ويمكنك إعادة المحاولة في أي وقت.' }}
            </p>
          </div>

        </div>

        <!-- 2. Two-Column Info & Recommendations Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-6 sm:py-8 border-b border-slate-100">
          
          <!-- Column 1: Order / Transaction Details Box -->
          <div class="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 text-start flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  {{ isEn ? 'Transaction Details' : 'بيانات المعاملة' }}
                </span>
                <span class="text-[11px] font-black uppercase text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  {{ paymentStatus || 'CANCELLED' }}
                </span>
              </div>

              <div v-if="paymentId" class="space-y-1">
                <span class="text-[11px] font-bold text-slate-400 block">{{ isEn ? 'Reference ID' : 'رقم المرجع' }}</span>
                <div class="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2">
                  <span class="text-xs font-black text-[#0B0E28] tracking-wider truncate" dir="ltr">#{{ paymentId }}</span>
                  <button 
                    type="button" 
                    @click="copyReference"
                    class="text-[11px] font-bold text-amber-600 hover:text-amber-700 transition-colors shrink-0 ms-2 cursor-pointer"
                  >
                    {{ copied ? (isEn ? 'Copied!' : 'تم النسخ!') : (isEn ? 'Copy' : 'نسخ') }}
                  </button>
                </div>
              </div>

              <div v-if="errorMessage" class="mt-3 text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-100 flex items-start gap-2">
                <svg class="w-4 h-4 shrink-0 mt-0.5 text-rose-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                <span>{{ errorMessage }}</span>
              </div>
            </div>

            <div class="text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-200/50">
              {{ isEn ? 'Cart items are still reserved in your bag.' : 'محتويات سلة مشترياتك ما زالت محفوظة في حسابك.' }}
            </div>
          </div>

          <!-- Column 2: What to do next / Recommendations -->
          <div class="bg-amber-50/50 border border-amber-200/60 rounded-2xl p-5 text-start space-y-3">
            <h4 class="text-xs sm:text-sm font-black text-[#0B0E28] flex items-center gap-2">
              <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
              {{ isEn ? 'Quick Solutions & Recommendations:' : 'حلول مقترحة لإتمام طلبك بسهولة:' }}
            </h4>
            <ul class="text-xs text-slate-600 space-y-2.5 leading-relaxed">
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>{{ isEn ? 'Retry payment with Mada, Visa, Mastercard, or Apple Pay.' : 'إعادة محاولة الدفع باستخدام بطاقة مدى، فيزا، ماستركارد، أو آبل باي.' }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>{{ isEn ? 'Split your payment into easy installments with Tamara or Tabby.' : 'تقسيط المشتريات على 3 أو 4 دفعات ميسرة عبر تمارا أو تابي.' }}</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                <span>{{ isEn ? 'Choose Cash On Delivery or Bank Transfer.' : 'اختيار الدفع عند الاستلام أو التحويل البنكي.' }}</span>
              </li>
            </ul>
          </div>

        </div>

        <!-- 3. Action Buttons Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center gap-3">
          <!-- Primary CTA: Try Again -->
          <NuxtLink 
            :to="localePath('/checkout')"
            class="w-full sm:flex-1 py-3.5 px-6 bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] active:scale-[0.99] rounded-2xl text-xs sm:text-sm font-black transition-all shadow-lg shadow-[#0B0E28]/15 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="1 4 1 10 7 10"></polyline><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path></svg>
            <span>{{ isEn ? 'Try Payment Again (Back to Checkout)' : 'إعادة محاولة الدفع (العودة لصفحة الدفع)' }}</span>
          </NuxtLink>

          <!-- Secondary CTA: Return to Cart -->
          <NuxtLink 
            :to="localePath('/cart')"
            class="w-full sm:w-auto py-3.5 px-6 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>{{ isEn ? 'Review Cart' : 'مراجعة سلة المشتريات' }}</span>
          </NuxtLink>

          <!-- Tertiary CTA: Continue Shopping -->
          <NuxtLink 
            :to="localePath('/shop')"
            class="w-full sm:w-auto py-3.5 px-6 text-slate-500 hover:text-[#0B0E28] text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-1"
          >
            <span>{{ isEn ? 'Continue Shopping' : 'تصفح المتجر' }}</span>
          </NuxtLink>
        </div>

      </div>

    </div>

    <!-- Store Features Bar -->
    <section class="w-full bg-white border-t border-slate-200 mt-14 sm:mt-18">
      <HomeStoreFeaturesBar />
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import CheckoutStepper from '~/components/Checkout/CheckoutStepper.vue'
import { useLanguage } from '~/composables/useLanguage'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'

const route = useRoute()
const { layoutDirection, localePath, currentLanguage } = useLanguage()
const { loadCart } = useCart()
const toast = useToast()

const isEn = computed(() => currentLanguage.value === 'en')

useHead({
  title: computed(() => isEn.value ? 'Payment Cancelled or Failed - Aswar' : 'فشل عملية الدفع - أسوار جدة')
})

const copied = ref(false)

// Read Route Query Parameters
const paymentId = computed(() => (route.query.payment_id || route.query.id || route.query.order_id || '') as string)
const paymentStatus = computed(() => (route.query.status || route.query.payment_status || 'cancelled') as string)
const errorMessage = computed(() => (route.query.message || route.query.error || '') as string)

const copyReference = () => {
  if (process.client && navigator.clipboard && paymentId.value) {
    navigator.clipboard.writeText(paymentId.value)
    copied.value = true
    toast.success(
      isEn.value ? 'Copied' : 'تم النسخ',
      isEn.value ? 'Reference ID copied to clipboard' : 'تم نسخ رقم المرجع إلى الحافظة'
    )
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

onMounted(async () => {
  try {
    await loadCart(true)
  } catch (e) {
    // Ignore
  }
})
</script>
