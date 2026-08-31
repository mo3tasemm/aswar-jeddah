<template>
  <div class="w-full max-w-4xl mx-auto my-4 sm:my-6 px-2 sm:px-4" :dir="layoutDirection">
    <div class="relative flex items-center justify-between">
      
      <!-- Connecting Track Background (Aligned with icon center) -->
      <div class="absolute top-4 sm:top-5.5 -translate-y-1/2 inset-x-8 sm:inset-x-14 h-1 bg-slate-200/80 rounded-full z-0"></div>
      
      <!-- Active Progress Track Fill (Aligned with icon center) -->
      <div 
        class="absolute top-4 sm:top-5.5 -translate-y-1/2 h-1 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full z-0 transition-all duration-500 ease-out"
        :class="layoutDirection === 'rtl' ? 'right-8 sm:right-14' : 'left-8 sm:left-14'"
        :style="{ width: computedProgressWidth }"
      ></div>

      <!-- Step 1: Cart (سلة المشتريات) -->
      <NuxtLink :to="localePath('/cart')" class="relative z-10 flex flex-col items-center group cursor-pointer flex-1">
        <div 
          class="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 shadow-sm"
          :class="[
            currentStep >= 1 
              ? (currentStep > 1 ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/25 scale-105') 
              : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 1" class="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <span 
          class="text-[10px] sm:text-xs font-bold mt-2 text-center transition-colors select-none line-clamp-1"
          :class="currentStep >= 1 ? 'text-[#0B0E28]' : 'text-slate-400'"
        >
          {{ isEn ? '1. Cart' : '1. سلة المشتريات' }}
        </span>
      </NuxtLink>

      <!-- Step 2: Shipping Address (عنوان الشحن والتوصيل) -->
      <button 
        type="button"
        @click="$emit('step-click', 2)"
        class="relative z-10 flex flex-col items-center group flex-1 cursor-pointer"
      >
        <div 
          class="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 shadow-sm"
          :class="[
            currentStep === 2 
              ? 'bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/30 scale-110 shadow-lg shadow-[#0B0E28]/25' 
              : currentStep > 2 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 2" class="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </div>
        <span 
          class="text-[10px] sm:text-xs font-black mt-2 text-center transition-colors select-none line-clamp-1"
          :class="currentStep === 2 ? 'text-[#0B0E28]' : currentStep > 2 ? 'text-emerald-700 font-bold' : 'text-slate-400'"
        >
          {{ isEn ? '2. Shipping' : '2. عنوان الشحن' }}
        </span>
      </button>

      <!-- Step 3: Payment Method (طريقة الدفع) -->
      <button 
        type="button"
        @click="$emit('step-click', 3)"
        class="relative z-10 flex flex-col items-center group flex-1 cursor-pointer"
      >
        <div 
          class="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 shadow-sm"
          :class="[
            currentStep === 3 
              ? 'bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/30 scale-110 shadow-lg shadow-[#0B0E28]/25' 
              : currentStep > 3 
                ? 'bg-emerald-500 text-white shadow-emerald-500/20' 
                : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 3" class="w-4 h-4 sm:w-5 sm:h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <svg v-else class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="5" width="20" height="14" rx="2"></rect>
            <line x1="2" y1="10" x2="22" y2="10"></line>
          </svg>
        </div>
        <span 
          class="text-[10px] sm:text-xs font-black mt-2 text-center transition-colors select-none line-clamp-1"
          :class="currentStep === 3 ? 'text-[#0B0E28]' : currentStep > 3 ? 'text-emerald-700 font-bold' : 'text-slate-400'"
        >
          {{ isEn ? '3. Payment' : '3. طريقة الدفع' }}
        </span>
      </button>

      <!-- Step 4: Confirmation (تأكيد الطلب) -->
      <div class="relative z-10 flex flex-col items-center group flex-1">
        <div 
          class="w-8 h-8 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-black text-xs sm:text-sm transition-all duration-300 shadow-sm"
          :class="[
            currentStep >= 4 
              ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/25 scale-110 shadow-emerald-500/25' 
              : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <span 
          class="text-[10px] sm:text-xs font-bold mt-2 text-center transition-colors select-none line-clamp-1"
          :class="currentStep >= 4 ? 'text-emerald-700 font-black' : 'text-slate-400'"
        >
          {{ isEn ? '4. Confirmation' : '4. تأكيد الطلب' }}
        </span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  currentStep: {
    type: Number,
    required: false,
    default: 2
  }
})

defineEmits(['step-click'])

const { layoutDirection, localePath, currentLanguage } = useLanguage()
const isEn = computed(() => currentLanguage.value === 'en')

const computedProgressWidth = computed(() => {
  if (props.currentStep <= 1) return '0%'
  if (props.currentStep === 2) return '33.3%'
  if (props.currentStep === 3) return '66.6%'
  if (props.currentStep >= 4) return '100%'
  return '33.3%'
})
</script>
