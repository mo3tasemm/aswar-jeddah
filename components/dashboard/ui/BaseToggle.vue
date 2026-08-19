<template>
  <label class="flex items-center gap-3 cursor-pointer">
    <div class="relative">
      <input 
        type="checkbox" 
        :checked="modelValue"
        @change="handleChange"
        class="sr-only peer"
        :disabled="disabled"
      >
      <div 
        class="w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all rtl:peer-checked:after:-translate-x-full"
        :class="[
          modelValue ? 'bg-emerald-500' : 'bg-rose-500',
          disabled ? 'opacity-50 cursor-not-allowed' : ''
        ]"
      ></div>
    </div>
    <span v-if="label" class="font-bold text-slate-700 select-none">{{ label }}</span>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('update:modelValue', target.checked)
  }
}
</script>
