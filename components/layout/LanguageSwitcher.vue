<template>
  <button
    type="button"
    @click="toggleLanguage"
    class="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer select-none"
    :class="[
      isScrolled 
        ? 'bg-slate-800/90 hover:bg-slate-700 text-white border-slate-700' 
        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
    ]"
    :title="currentLanguage === 'ar' ? 'Switch to English' : 'التحويل للعربية'"
  >
    <i class="fa-solid fa-globe text-xs text-amber-500"></i>
    <span>{{ currentLanguage === 'ar' ? 'EN' : 'عربي' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

defineProps<{
  isScrolled?: boolean
}>()

const { currentLanguage, toggleLanguage } = useLanguage()
</script>
