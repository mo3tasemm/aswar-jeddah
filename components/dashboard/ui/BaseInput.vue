<template>
  <div class="flex flex-col gap-1.5 w-full">
    <label v-if="label" :for="id" class="text-sm font-bold text-slate-700">
      {{ label }}
    </label>
    
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :placeholder="placeholder"
        :disabled="disabled"
        :class="[
          'w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200',
          error 
            ? 'border-red-500 bg-red-50/50 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500/20' 
            : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 hover:border-slate-400',
          disabled ? 'opacity-60 cursor-not-allowed bg-slate-50' : ''
        ]"
      />
      <!-- Optional: Icon slot -->
      <div v-if="$slots.icon" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <slot name="icon"></slot>
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

interface Props {
  modelValue?: string | number
  label?: string
  error?: string
  placeholder?: string
  type?: string
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  modelValue: '',
  label: '',
  error: '',
  placeholder: '',
  type: 'text',
  disabled: false
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
