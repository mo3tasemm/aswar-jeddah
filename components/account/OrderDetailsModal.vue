<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeModal"
        dir="rtl"
      >
        <!-- Modal Container -->
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]">
          
          <!-- MODAL HEADER -->
          <div class="bg-[#0B0E28] text-white p-6 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div>
              <div class="flex items-center gap-3">
                <h3 class="text-lg font-black text-amber-400">طلب رقم {{ activeOrder?.id }}</h3>
                <span class="px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                  {{ activeOrder?.statusText }}
                </span>
              </div>
              <p class="text-xs text-slate-400 mt-1">تاريخ الطلب: {{ activeOrder?.date }}</p>
            </div>
            <button 
              @click="closeModal" 
              class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- MODAL BODY -->
          <div class="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar overscroll-contain flex-1">
            
            <!-- SECTION A: ORDER TRACKER BAR -->
            <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200/60">
              <h4 class="text-xs font-bold text-slate-400 mb-6">حالة الشحنة</h4>
              <div class="relative flex items-center justify-between max-w-md mx-auto">
                <div class="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 z-0"></div>
                <div class="absolute top-1/2 right-0 h-1 bg-[#0B0E28] -translate-y-1/2 z-0 transition-all duration-500" :style="{ width: trackerProgress }"></div>
                
                <div 
                  v-for="(step, index) in trackerSteps" 
                  :key="index"
                  class="relative z-10 flex flex-col items-center gap-2"
                >
                  <div 
                    :class="[
                      'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300',
                      index <= currentStepIndex 
                        ? 'bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/20 shadow-md' 
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    ]"
                  >
                    <!-- Instead of FontAwesome, use simple inline SVGs or keep as is if FontAwesome is loaded -->
                    <svg v-if="index === 0" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <svg v-else-if="index === 1" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                    <svg v-else-if="index === 2" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
                    <svg v-else-if="index === 3" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                  </div>
                  <span 
                    :class="[
                      'text-[11px] font-bold whitespace-nowrap',
                      index <= currentStepIndex ? 'text-[#0B0E28]' : 'text-slate-400'
                    ]"
                  >
                    {{ step.label }}
                  </span>
                </div>
              </div>
            </div>

            <!-- SECTION B: PURCHASED ITEMS LIST -->
            <div>
              <h4 class="text-sm font-black text-[#0B0E28] mb-4">المنتجات المطلوبة</h4>
              <div class="space-y-3">
                <div 
                  v-for="item in activeOrder?.items" 
                  :key="item.id"
                  class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition-colors"
                >
                  <div class="flex items-center gap-4">
                    <img v-if="item.image" :src="item.image" :alt="item.name" class="w-14 h-14 object-cover rounded-xl border border-slate-200" />
                    <div v-else class="w-14 h-14 bg-slate-200 rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    </div>
                    <div>
                      <h5 class="font-extrabold text-[#0B0E28] text-sm">{{ item.name }}</h5>
                      <p class="text-xs text-slate-400 mt-1">الكمية: {{ item.quantity }}</p>
                    </div>
                  </div>
                  <span class="font-black text-[#0B0E28] text-sm">{{ item.price }} ر.س</span>
                </div>
              </div>
            </div>

            <!-- SECTION C: SHIPPING & SUMMARY GRID -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <!-- Shipping Details Card -->
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                <h5 class="text-xs font-bold text-slate-400">معلومات التوصيل والدفع</h5>
                <p class="text-xs font-bold text-[#0B0E28] mt-2">{{ activeOrder?.customerName }}</p>
                <p class="text-xs text-slate-600 leading-relaxed">{{ activeOrder?.shippingAddress }}</p>
                <div class="pt-2 flex items-center gap-2">
                  <span class="text-[11px] font-semibold text-slate-500">طريقة الدفع:</span>
                  <span class="text-[11px] font-bold text-[#0B0E28] bg-white px-2 py-0.5 rounded border border-slate-200">{{ activeOrder?.paymentMethod }}</span>
                </div>
              </div>

              <!-- Financial Summary Card -->
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5">
                <h5 class="text-xs font-bold text-slate-400 mb-3">ملخص الفاتورة</h5>
                <div class="flex justify-between text-xs text-slate-600">
                  <span>المجموع الفرعي:</span>
                  <span class="font-bold text-[#0B0E28]">{{ activeOrder?.subtotal }} ر.س</span>
                </div>
                <div class="flex justify-between text-xs text-slate-600">
                  <span>رسوم الشحن:</span>
                  <span class="font-bold text-emerald-600">{{ activeOrder?.shippingFee === 0 ? 'مجاني' : activeOrder?.shippingFee + ' ر.س' }}</span>
                </div>
                <div class="flex justify-between text-xs text-slate-600">
                  <span>الضريبة:</span>
                  <span class="font-bold text-[#0B0E28]">{{ activeOrder?.tax }} ر.س</span>
                </div>
                <div class="border-t border-slate-200 pt-3 flex justify-between items-center">
                  <span class="text-xs font-black text-[#0B0E28]">الإجمالي النهائي:</span>
                  <span class="text-base font-black text-[#0B0E28]">{{ activeOrder?.total }} ر.س</span>
                </div>
              </div>
            </div>

          </div>

          <!-- MODAL FOOTER -->
          <div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <button class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#0B0E28] text-white hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <span>تحميل الفاتورة PDF</span>
            </button>
            <button class="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
              <span>المساعدة والدعم الفني</span>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  activeOrder: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

const closeModal = () => emit('close')

const trackerSteps = [
  { label: 'تم التأكيد' },
  { label: 'قيد التجهيز' },
  { label: 'تم الشحن' },
  { label: 'تم التوصيل' }
]

const currentStepIndex = computed(() => {
  if (!props.activeOrder) return 0
  const statusMap = {
    'confirmed': 0,
    'processing': 1,
    'shipped': 2,
    'completed': 3
  }
  return statusMap[props.activeOrder.status] || 0
})

const trackerProgress = computed(() => {
  const percentage = (currentStepIndex.value / (trackerSteps.length - 1)) * 100
  return `${percentage}%`
})

// SCROLL LOCK FIX LOGIC
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  // using paddingRight instead of paddingLeft since the layout is RTL
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0B0E28;
}
</style>
