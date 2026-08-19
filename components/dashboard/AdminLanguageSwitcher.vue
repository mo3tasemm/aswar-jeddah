<template>
  <button
    type="button"
    @click="toggleAdminLanguage"
    class="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer select-none bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
    :title="adminLanguage === 'ar' ? 'Switch to English' : 'التحويل إلى العربية'"
  >
    <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    <span>{{ adminLanguage === 'ar' ? 'English' : 'عربي' }}</span>
  </button>
</template>

<script setup lang="ts">
import { useAdminLanguage } from '~/composables/useAdminLanguage'

const { adminLanguage, toggleAdminLanguage } = useAdminLanguage()
</script>
