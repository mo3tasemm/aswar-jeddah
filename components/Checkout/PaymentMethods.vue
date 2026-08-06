<template>
  <div class="space-y-6">
    <h3 class="text-xl font-black text-[#0B0E28] mb-4">اختر طريقة الدفع</h3>

    <!-- Payment Options Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <!-- Credit / Mada -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="credit" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'credit' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'credit'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span class="text-sm font-bold text-[#0B0E28]">البطاقة الائتمانية / مدى</span>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-8 h-5 bg-blue-900 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
            <div class="w-8 h-5 bg-slate-100 rounded text-green-600 text-[10px] font-black flex items-center justify-center border border-slate-200">مدى</div>
          </div>
        </div>
      </label>

      <!-- Apple Pay -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="applepay" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'applepay' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'applepay'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span class="text-sm font-bold text-[#0B0E28]">Apple Pay</span>
          </div>
          <svg class="w-8 h-8 text-black" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 28.5c-.3 0-1.6-.2-2.5-.7-3.9-1.9-6.3-6.5-6.3-11.4 0-4.9 2.5-8.2 6.5-10.2.7-.4 1.5-.5 2.3-.5.8 0 1.6.1 2.3.5 3.9 1.9 6.5 5.3 6.5 10.2 0 4.8-2.4 9.4-6.3 11.4-.9.5-2.2.7-2.5.7zm0-20.7c-.5 0-1 .1-1.5.3-3 1.5-4.8 4.2-4.8 8.4 0 4.1 1.9 7.8 4.8 9.3.9.5 2.1.5 3 0 3-1.5 4.8-5.2 4.8-9.3 0-4.2-1.8-6.9-4.8-8.4-.5-.2-1-.3-1.5-.3z"/>
            <!-- Simplified Apple Logo Path -->
            <path d="M19.1 12.3c0-2.3 1.9-3.7 2-3.7-1.1-1.6-2.8-1.8-3.4-1.9-1.4-.1-2.9.8-3.6.8-.8 0-2-.8-3.1-.8-1.3 0-2.6.8-3.3 2-1.5 2.6-.4 6.4 1 8.5.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.6 2.6-.6s1.6.6 2.7.6c1.1 0 1.8-1 2.5-2 .8-1.2 1.1-2.3 1.2-2.4-.1-.1-2.2-.8-2.2-3.1zm-1.8-5c.5-.7.9-1.6.8-2.6-.8 0-1.8.5-2.4 1.2-.5.6-.9 1.5-.8 2.5.9 0 1.8-.5 2.4-1.1z"/>
          </svg>
        </div>
      </label>

      <!-- BNPL (Tabby/Tamara) -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="bnpl" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'bnpl' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'bnpl'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-bold text-[#0B0E28]">تقسيط تابي / تمارا</span>
              <span class="text-[10px] text-slate-400">بدون فوائد</span>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <div class="w-8 h-5 bg-teal-300 rounded flex items-center justify-center text-[#0B0E28] font-black text-[9px] uppercase">Tabby</div>
            <div class="w-8 h-5 bg-rose-200 rounded flex items-center justify-center text-[#0B0E28] font-black text-[9px] uppercase">Tamara</div>
          </div>
        </div>
      </label>

      <!-- Bank Transfer -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="transfer" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'transfer' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'transfer'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span class="text-sm font-bold text-[#0B0E28]">تحويل بنكي مباشر</span>
          </div>
          <svg class="w-6 h-6 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>
      </label>
    </div>

    <!-- Credit Card Form Expand (Only visible if 'credit' selected) -->
    <Transition name="expand">
      <div v-if="selectedMethod === 'credit'" class="mt-6 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        
        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-600">اسم صاحب البطاقة</label>
          <input type="text" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="الاسم كما هو على البطاقة" />
        </div>

        <div class="space-y-2">
          <label class="text-xs font-bold text-slate-600">رقم البطاقة</label>
          <div class="relative">
            <input type="text" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-left" dir="ltr" placeholder="0000 0000 0000 0000" maxlength="19" />
            <svg class="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-600">تاريخ الانتهاء</label>
            <input type="text" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-center" dir="ltr" placeholder="MM / YY" maxlength="5" />
          </div>
          <div class="space-y-2">
            <label class="text-xs font-bold text-slate-600">رمز التحقق (CVV)</label>
            <div class="relative">
              <input type="password" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-center" dir="ltr" placeholder="123" maxlength="3" />
              <svg class="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const selectedMethod = ref('credit')
const emit = defineEmits(['update:method'])

watch(selectedMethod, (newVal) => {
  emit('update:method', newVal)
}, { immediate: true })
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease-out;
  overflow: hidden;
}
.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}
.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 400px;
  transform: translateY(0);
}
</style>
