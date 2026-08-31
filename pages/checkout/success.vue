<template>
  <div class="payment-success-page selection:bg-emerald-500 selection:text-white bg-[#F8F9FA] min-h-[calc(100vh-200px)] py-6 sm:py-10 font-sans" :dir="layoutDirection">
    
    <!-- Top Breadcrumbs Header -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 mb-6">
      <nav class="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1 text-start">
        <NuxtLink :to="localePath('/')" class="hover:text-amber-500 transition-colors">
          {{ isEn ? 'Home' : 'الرئيسية' }}
        </NuxtLink>
        <span>/</span>
        <NuxtLink :to="localePath('/checkout')" class="hover:text-amber-500 transition-colors">
          {{ isEn ? 'Checkout' : 'إتمام الطلب' }}
        </NuxtLink>
        <span>/</span>
        <span class="text-emerald-700 font-bold">
          {{ isEn ? 'Order Confirmed' : 'تم تأكيد الطلب' }}
        </span>
      </nav>
    </div>

    <!-- 4-Step Stepper (Step 4: Confirmation Active / Completed) -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 mb-8 sm:mb-10">
      <CheckoutStepper :currentStep="4" />
    </div>

    <!-- Wide Horizontal Success Card Container -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      
      <div class="bg-white rounded-3xl p-6 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden">
        
        <!-- Top Status Gradient Bar -->
        <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>

        <!-- 1. Header Hero Area (Horizontal layout on desktop) -->
        <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 pb-8 border-b border-slate-100 text-center sm:text-start">
          
          <!-- Success Animated Icon -->
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-emerald-50 border-2 border-emerald-100 text-emerald-500 flex items-center justify-center shrink-0 shadow-inner animate-bounce-subtle">
            <svg class="w-8 h-8 sm:w-10 sm:h-10 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          <!-- Titles & Confirmation Message -->
          <div class="flex-1 space-y-1.5">
            <div class="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
              <span class="px-3 py-1 bg-emerald-100/80 text-emerald-800 text-xs font-black rounded-full">
                {{ isEn ? 'Payment & Order Confirmed' : 'تم استلام وتأكيد الطلب بنجاح' }}
              </span>
              <span class="text-xs text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md font-bold">
                {{ isEn ? 'Preparing Package' : 'جاري تجهيز الشحنة' }}
              </span>
            </div>

            <h1 class="text-xl sm:text-2xl md:text-3xl font-black text-[#0B0E28]">
              {{ isEn ? 'Thank You For Your Order!' : 'شكراً لتسوقك من أسوار جدة!' }}
            </h1>

            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              {{ isEn 
                ? 'Your order has been placed and confirmed. We are currently processing your package for fast express dispatch.' 
                : 'تم استلام وتأكيد طلبك بنجاح وجاري الآن تحضير شحنتك للتوصيل السريع إلى عنوانك.' }}
            </p>
          </div>

        </div>

        <!-- 2. Two-Column Details & Highlights Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 py-6 sm:py-8 border-b border-slate-100">
          
          <!-- Column 1: Order Reference Details Box -->
          <div class="bg-slate-50/80 border border-slate-200/70 rounded-2xl p-5 text-start flex flex-col justify-between space-y-4">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-black text-slate-700 flex items-center gap-1.5">
                  <svg class="w-4 h-4 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                  {{ isEn ? 'Order Summary' : 'بيانات الطلب' }}
                </span>
                <span class="text-[11px] font-black uppercase text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded">
                  {{ paymentStatus || 'PAID / CONFIRMED' }}
                </span>
              </div>

              <div class="space-y-1">
                <span class="text-[11px] font-bold text-slate-400 block">{{ isEn ? 'Order Reference Number' : 'رقم مرجع الطلب' }}</span>
                <div class="flex items-center justify-between bg-white border border-slate-200 rounded-xl px-3 py-2">
                  <span class="text-xs sm:text-sm font-black text-[#0B0E28] tracking-wider truncate" dir="ltr">#{{ displayPaymentId }}</span>
                  <button 
                    type="button" 
                    @click="copyReference"
                    class="text-[11px] font-bold text-amber-600 hover:text-amber-700 transition-colors shrink-0 ms-2 cursor-pointer"
                  >
                    {{ copied ? (isEn ? 'Copied!' : 'تم النسخ!') : (isEn ? 'Copy' : 'نسخ') }}
                  </button>
                </div>
              </div>
            </div>

            <div class="text-[11px] text-slate-400 font-medium pt-2 border-t border-slate-200/50">
              {{ isEn ? 'You will receive SMS tracking updates on your phone.' : 'ستصلك رسائل نصية بحالة وتتبع الشحنة على رقم جوالك.' }}
            </div>
          </div>

          <!-- Column 2: Highlights (SMS & Express Dispatch) -->
          <div class="space-y-3 text-start">
            <div class="bg-amber-50/60 border border-amber-100 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div>
                <span class="text-xs font-black text-[#0B0E28] block">{{ isEn ? 'Invoice Details Sent' : 'تم إرسال تفاصيل الفاتورة' }}</span>
                <span class="text-[11px] text-slate-500 leading-tight block">{{ isEn ? 'Receipt sent to your SMS and email address' : 'تم إرسال إيصال الشراء ورقم الطلب لهاتفك' }}</span>
              </div>
            </div>

            <div class="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
              </div>
              <div>
                <span class="text-xs font-black text-[#0B0E28] block">{{ isEn ? 'Express Dispatch from Jeddah' : 'شحن وتوصيل فوري' }}</span>
                <span class="text-[11px] text-slate-500 leading-tight block">{{ isEn ? 'Fast shipping directly from our warehouse' : 'يتم تجهيز الطلب وشحنه مباشرة من مستودع جدة' }}</span>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. Action Buttons Bar -->
        <div class="pt-6 flex flex-col sm:flex-row items-center gap-3">
          <!-- Primary CTA: View Order Details -->
          <NuxtLink 
            :to="localePath('/my-account/orders')"
            class="w-full sm:flex-1 py-3.5 px-6 bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] active:scale-[0.99] rounded-2xl text-xs sm:text-sm font-black transition-all shadow-lg shadow-[#0B0E28]/15 flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            <span>{{ isEn ? 'Track & View My Orders' : 'متابعة وتفاصيل طلباتي' }}</span>
          </NuxtLink>

          <!-- Secondary CTA: Continue Shopping -->
          <NuxtLink 
            :to="localePath('/')"
            class="w-full sm:w-auto py-3.5 px-6 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            <span>{{ isEn ? 'Back to Store' : 'العودة للمتجر الرئيسي' }}</span>
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
const { clearCart } = useCart()
const toast = useToast()

const isEn = computed(() => currentLanguage.value === 'en')

useHead({
  title: computed(() => isEn.value ? 'Order Placed Successfully - Aswar' : 'تم استلام طلبك بنجاح - أسوار جدة')
})

const copied = ref(false)

// Read Route Query Parameters
const paymentId = computed(() => (route.query.payment_id || route.query.id || route.query.order_id || route.query.paymentRequestId || '') as string)
const paymentStatus = computed(() => (route.query.status || route.query.payment_status || 'paid') as string)

const displayPaymentId = computed(() => {
  if (paymentId.value) return paymentId.value
  return 'ORD-' + Math.floor(100000 + Math.random() * 900000)
})

const copyReference = () => {
  if (process.client && navigator.clipboard) {
    navigator.clipboard.writeText(displayPaymentId.value)
    copied.value = true
    toast.success(
      isEn.value ? 'Copied' : 'تم النسخ',
      isEn.value ? 'Order reference copied to clipboard' : 'تم نسخ رقم الطلب إلى الحافظة'
    )
    setTimeout(() => {
      copied.value = false
    }, 2500)
  }
}

onMounted(async () => {
  try {
    await clearCart()
  } catch (e) {
    // Ignore
  }
})
</script>

<style scoped>
@keyframes bounce-subtle {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}
.animate-bounce-subtle {
  animation: bounce-subtle 2.5s ease-in-out infinite;
}
</style>
