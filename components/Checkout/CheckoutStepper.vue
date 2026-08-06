<template>
  <div class="w-full relative mb-10 mt-4" dir="rtl">
    <!-- Progress Line Background -->
    <div class="absolute top-5 inset-x-0 h-1 bg-slate-100 rounded-full w-[90%] mx-auto hidden sm:block"></div>
    
    <!-- Progress Line Active -->
    <div 
      class="absolute top-5 right-[5%] h-1 bg-amber-400 rounded-full transition-all duration-500 hidden sm:block"
      :style="{ width: progressWidth }"
    ></div>

    <div class="relative flex justify-between items-center sm:w-[90%] mx-auto gap-2">
      <!-- Step 1: Cart -->
      <div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"
          :class="[
            currentStep >= 1 ? 'bg-[#0B0E28] text-amber-400 border-2 border-amber-400' : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 1" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span v-else>1</span>
        </div>
        <span class="text-xs sm:text-sm font-bold text-center" :class="currentStep >= 1 ? 'text-[#0B0E28]' : 'text-slate-400'">السلة</span>
      </div>

      <!-- Step 2: Address -->
      <div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"
          :class="[
            currentStep >= 2 ? 'bg-[#0B0E28] text-amber-400 border-2 border-amber-400' : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 2" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span v-else>2</span>
        </div>
        <span class="text-xs sm:text-sm font-bold text-center" :class="currentStep >= 2 ? 'text-[#0B0E28]' : 'text-slate-400'">التوصيل</span>
      </div>

      <!-- Step 3: Payment -->
      <div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none">
        <div 
          class="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"
          :class="[
            currentStep >= 3 ? 'bg-[#0B0E28] text-amber-400 border-2 border-amber-400' : 'bg-white text-slate-400 border border-slate-200'
          ]"
        >
          <svg v-if="currentStep > 3" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          <span v-else>3</span>
        </div>
        <span class="text-xs sm:text-sm font-bold text-center" :class="currentStep >= 3 ? 'text-[#0B0E28]' : 'text-slate-400'">الدفع والتأكيد</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentStep: {
    type: Number,
    required: true,
    default: 1
  }
})

const progressWidth = computed(() => {
  if (props.currentStep === 1) return '0%'
  if (props.currentStep === 2) return '50%'
  if (props.currentStep === 3) return '100%'
  return '0%'
})
</script>
