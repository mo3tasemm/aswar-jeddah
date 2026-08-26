<template>
  <div class="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
    
    <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      
      <!-- 1. TITLE, ICON & BREADCRUMBS -->
      <div class="space-y-1.5 min-w-0">
        <!-- Breadcrumbs -->
        <slot name="breadcrumbs">
          <nav v-if="breadcrumbs && breadcrumbs.length > 0" class="flex items-center gap-2 text-xs text-slate-400 font-bold flex-wrap mb-1">
            <template v-for="(item, idx) in breadcrumbs" :key="idx">
              <NuxtLink v-if="item.to" :to="item.to" class="hover:text-indigo-600 transition-colors">
                {{ item.label }}
              </NuxtLink>
              <span v-else class="text-slate-700">{{ item.label }}</span>
              <span v-if="idx < breadcrumbs.length - 1" class="text-slate-300">/</span>
            </template>
          </nav>
        </slot>

        <!-- Main Title & Icon -->
        <div class="flex items-start sm:items-center gap-3">
          <div v-if="icon" class="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl border border-indigo-100 shrink-0 shadow-2xs mt-0.5 sm:mt-0">
            <i :class="icon"></i>
          </div>
          <div>
            <h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
              {{ title }}
            </h1>
            <p v-if="subtitle" class="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 line-clamp-2">
              {{ subtitle }}
            </p>
          </div>
        </div>
      </div>

      <!-- 2. ACTIONS & CONTROLS GROUP (Flex Wrap Safe) -->
      <div class="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 self-stretch lg:self-center justify-start lg:justify-end">
        
        <!-- Language Switcher Tabs -->
        <slot name="lang-tabs">
          <AdminLangTabs 
            v-if="showLangTabs"
            :model-value="langTab"
            @update:model-value="$emit('update:langTab', $event)"
          />
        </slot>

        <!-- Custom Additional Action Buttons (e.g. Preview / Add) -->
        <slot name="actions"></slot>

        <!-- Primary Header Save Button -->
        <button 
          v-if="showSave"
          type="button" 
          @click="$emit('save')" 
          :disabled="isSaving"
          class="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 active:scale-98 shrink-0"
        >
          <i v-if="isSaving" class="fa-solid fa-spinner fa-spin"></i>
          <i v-else class="fa-solid fa-floppy-disk"></i>
          <span>{{ isSaving ? (savingLabel || 'جاري الحفظ...') : (saveLabel || 'حفظ التعديلات') }}</span>
        </button>

      </div>

    </div>

    <!-- 3. OPTIONAL SUB-ROW SLOT (e.g. Filters, Tabs, Custom Bars) -->
    <div v-if="$slots.bottom" class="pt-3 border-t border-slate-100">
      <slot name="bottom"></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
import AdminLangTabs from './AdminLangTabs.vue'

withDefaults(defineProps<{
  title: string
  subtitle?: string
  icon?: string
  breadcrumbs?: Array<{ label: string; to?: string }>
  showLangTabs?: boolean
  langTab?: 'ar' | 'en' | string
  showSave?: boolean
  isSaving?: boolean
  saveLabel?: string
  savingLabel?: string
}>(), {
  title: '',
  subtitle: '',
  icon: '',
  showLangTabs: false,
  langTab: 'ar',
  showSave: false,
  isSaving: false
})

defineEmits<{
  (e: 'save'): void
  (e: 'update:langTab', value: 'ar' | 'en'): void
}>()
</script>
