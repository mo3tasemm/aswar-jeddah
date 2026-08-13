<template>
  <div class="space-y-6" :dir="layoutDirection">
    <h3 class="text-xl font-black text-[#0B0E28] mb-4 text-start">{{ t('checkout.select_payment') }}</h3>

    <!-- Payment Options Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      
      <!-- Offline Payment / Bank Transfer -->
      <label class="cursor-pointer relative group sm:col-span-2">
        <input type="radio" v-model="selectedMethod" value="offline_payment" class="peer sr-only" />
        <div class="p-5 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/40 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200 shadow-sm">
          <div class="flex items-center gap-4">
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors" :class="selectedMethod === 'offline_payment' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
              <div v-if="selectedMethod === 'offline_payment'" class="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <div class="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
              <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
            </div>
            <div class="flex flex-col text-start">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-base font-black text-[#0B0E28]">{{ t('checkout.offline_payment_title') }}</span>
                <span class="bg-amber-400 text-[#0B0E28] text-[10px] font-black px-2 py-0.5 rounded-md">{{ t('checkout.recommended_badge') }}</span>
              </div>
              <span class="text-xs text-slate-500 mt-1 leading-relaxed">{{ t('checkout.offline_payment_desc') }}</span>
            </div>
          </div>
        </div>
      </label>

      <!-- Paymob / Credit / Mada -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="paymob" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'paymob' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'paymob'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <span class="text-sm font-bold text-[#0B0E28] text-start">{{ t('checkout.paymob_title') }}</span>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <div class="w-8 h-5 bg-blue-900 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
            <div class="w-8 h-5 bg-slate-100 rounded text-green-600 text-[10px] font-black flex items-center justify-center border border-slate-200">Mada</div>
          </div>
        </div>
      </label>

      <!-- Tabby / Tamara -->
      <label class="cursor-pointer relative group">
        <input type="radio" v-model="selectedMethod" value="tabby" class="peer sr-only" />
        <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0" :class="selectedMethod === 'tabby' ? 'border-amber-400 bg-amber-400' : 'border-slate-300'">
              <div v-if="selectedMethod === 'tabby'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="flex flex-col text-start">
              <span class="text-sm font-bold text-[#0B0E28]">{{ t('checkout.tabby_title') }}</span>
              <span class="text-[10px] text-slate-400">{{ t('checkout.interest_free') }}</span>
            </div>
          </div>
          <div class="flex items-center gap-1 shrink-0">
            <div class="w-8 h-5 bg-teal-300 rounded flex items-center justify-center text-[#0B0E28] font-black text-[9px] uppercase">Tabby</div>
          </div>
        </div>
      </label>

    </div>

    <!-- Instructions Banner for Offline Payment -->
    <Transition name="expand">
      <div v-if="selectedMethod === 'offline_payment'" class="mt-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 text-start">
        <div class="flex items-center gap-2 text-amber-400 text-sm font-black">
          <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          <span>{{ t('checkout.offline_instructions_title') }}</span>
        </div>
        <ul class="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed">
          <li>{{ t('checkout.offline_instruction_1') }}</li>
          <li>{{ t('checkout.offline_instruction_2') }}</li>
        </ul>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  method: {
    type: String,
    default: 'offline_payment'
  }
})

const emit = defineEmits(['update:method'])
const { t, layoutDirection } = useLanguage()

const selectedMethod = ref(props.method || 'offline_payment')

watch(selectedMethod, (newVal) => {
  emit('update:method', newVal)
})
</script>
