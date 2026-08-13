<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-xs font-extrabold text-[#0B0E28] block">
      {{ label }}
      <span v-if="required" class="text-rose-500 ms-0.5">*</span>
    </label>
    
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-3 pe-10 rounded-xl border text-sm font-bold outline-none transition-all duration-200 appearance-none cursor-pointer',
          error 
            ? 'border-rose-500 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-500/20' 
            : 'border-slate-200 bg-slate-50/80 text-[#0B0E28] focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-slate-300',
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-100' : '',
          !modelValue ? 'text-slate-400 font-medium' : ''
        ]"
      >
        <option value="" disabled selected v-if="placeholder">{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
          class="text-[#0B0E28] font-bold py-2"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Custom Chevron Arrow -->
      <div class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center">
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    
    <!-- Error Message -->
    <Transition name="fade-down">
      <span v-if="error" class="text-xs font-bold text-rose-500 mt-0.5">
        {{ error }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  label?: string
  error?: string
  placeholder?: string
  options: SelectOption[]
  disabled?: boolean
  required?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  error: '',
  placeholder: 'اختر...',
  disabled: false,
  required: false
})

defineEmits(['update:modelValue'])

const id = useId()
</script>

<style scoped>
.fade-down-enter-active,
.fade-down-leave-active {
  transition: all 0.2s ease;
}
.fade-down-enter-from,
.fade-down-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
