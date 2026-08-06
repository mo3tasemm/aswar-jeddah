<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 md:p-6 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeModal"
        dir="rtl"
      >
        <!-- Modal Container -->
        <div class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]">
          
          <!-- MODAL HEADER -->
          <div class="bg-white p-6 pb-2 flex items-center justify-between shrink-0">
            <h3 class="text-xl font-black text-[#0B0E28]">تأكيد الأمان</h3>
            <button 
              @click="closeModal" 
              class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors text-sm"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- MODAL BODY -->
          <div class="p-6 space-y-6 overflow-y-auto overscroll-contain flex-1">
            <div class="text-center space-y-4">
              <div class="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-2">
                <svg class="w-8 h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              </div>
              <h4 class="text-lg font-bold text-[#0B0E28]">التحقق بخطوتين</h4>
              <p class="text-sm text-slate-500 leading-relaxed">
                لقد قمت بتعديل بيانات حساسة. يرجى إدخال رمز التحقق (OTP) المرسل إلى جوالك لتأكيد التغييرات.
              </p>
            </div>

            <!-- OTP Inputs -->
            <div class="flex justify-center gap-3 dir-ltr" dir="ltr">
              <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-black text-[#0B0E28] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" />
              <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-black text-[#0B0E28] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" />
              <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-black text-[#0B0E28] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" />
              <input type="text" maxlength="1" class="w-12 h-14 text-center text-xl font-black text-[#0B0E28] bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all" />
            </div>

            <div class="text-center">
              <button class="text-xs font-bold text-slate-400 hover:text-[#0B0E28] transition-colors">
                لم يصلك الرمز؟ أعد الإرسال
              </button>
            </div>
          </div>

          <!-- MODAL FOOTER -->
          <div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row-reverse items-center justify-between gap-3 shrink-0">
            <button 
              @click="confirmSave"
              :disabled="isConfirming"
              class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-white hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <svg v-if="isConfirming" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>تأكيد الحفظ</span>
            </button>
            <button 
              @click="closeModal"
              class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2"
            >
              <span>إلغاء</span>
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false }
})

const emit = defineEmits(['close', 'confirm'])

const isConfirming = ref(false)

const closeModal = () => emit('close')

const confirmSave = () => {
  isConfirming.value = true
  setTimeout(() => {
    isConfirming.value = false
    emit('confirm')
  }, 1000)
}

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
  transform: scale(0.96) translateY(-10px);
}
</style>
