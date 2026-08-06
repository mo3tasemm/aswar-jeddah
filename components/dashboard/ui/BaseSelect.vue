<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-sm font-bold text-slate-700">
      {{ label }}
    </label>
    
    <div class="relative">
      <select
        :id="id"
        :value="modelValue"
        @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200 appearance-none cursor-pointer px-4',
          error 
            ? 'border-red-500 bg-red-50/50 text-red-900 focus:ring-2 focus:ring-red-500/20' 
            : 'border-slate-300 bg-white text-slate-900 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 hover:border-slate-400',
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : '',
          !modelValue ? 'text-slate-400' : ''
        ]"
      >
        <option value="" disabled selected v-if="placeholder">{{ placeholder }}</option>
        <option 
          v-for="option in options" 
          :key="option.value" 
          :value="option.value"
          class="text-slate-900"
        >
          {{ option.label }}
        </option>
      </select>
      
      <!-- Custom Chevron -->
      <div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </div>
    
    <!-- Error Message -->
    <Transition name="fade-down">
      <span v-if="error" class="text-xs font-bold text-red-500 mt-0.5">
        {{ error }}
      </span>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useId } from 'vue'

interface Option {
  label: string
  value: string | number
}

interface Props {
  modelValue?: string | number
  label?: string
  error?: string
  placeholder?: string
  options: Option[]
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  error: '',
  placeholder: 'اختر...',
  disabled: false,
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
