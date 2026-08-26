<template>
  <div class="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80 shrink-0">
    <button 
      type="button" 
      @click="$emit('update:modelValue', 'ar')" 
      :class="[
        'px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5',
        modelValue === 'ar' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
      ]"
    >
      <span>🇸🇦</span>
      <span>{{ arLabel }}</span>
    </button>
    <button 
      type="button" 
      @click="$emit('update:modelValue', 'en')" 
      :class="[
        'px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5',
        modelValue === 'en' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
      ]"
    >
      <span>🇺🇸</span>
      <span>{{ enLabel }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: 'ar' | 'en' | string
  arLabel?: string
  enLabel?: string
}>(), {
  modelValue: 'ar',
  arLabel: 'العربية (AR)',
  enLabel: 'English (EN)'
})

defineEmits<{
  (e: 'update:modelValue', value: 'ar' | 'en'): void
}>()
</script>
