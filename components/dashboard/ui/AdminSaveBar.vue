<template>
  <div class="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 sm:px-8 z-40 flex flex-wrap items-center justify-between gap-3 shadow-lg">
    
    <!-- Status Slot & Status Info -->
    <div class="flex items-center gap-2.5">
      <slot name="status-slot">
        <template v-if="showStatus">
          <span 
            class="w-2.5 h-2.5 rounded-full shrink-0" 
            :class="isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'"
          ></span>
          <span class="text-xs font-bold text-slate-700">
            {{ statusLabel || 'حالة الصفحة:' }} 
            <span :class="isActive ? 'text-emerald-700 font-black' : 'text-slate-500 font-medium'">
              {{ isActive ? 'مفعلة وتظهر للمستخدمين' : 'غير نشطة مؤقتاً' }}
            </span>
          </span>
        </template>
      </slot>
    </div>

    <!-- Actions -->
    <div class="flex items-center gap-2 sm:gap-3 ms-auto">
      <!-- Cancel Link or Button -->
      <slot name="cancel">
        <NuxtLink 
          v-if="cancelUrl" 
          :to="cancelUrl" 
          class="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
        >
          {{ cancelLabel || 'إلغاء' }}
        </NuxtLink>
      </slot>

      <!-- Preview Link -->
      <slot name="preview">
        <NuxtLink 
          v-if="previewUrl" 
          :to="previewUrl" 
          target="_blank"
          class="px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
        >
          <i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400"></i>
          <span class="hidden sm:inline">{{ previewLabel || 'معاينة بالمتجر' }}</span>
        </NuxtLink>
      </slot>

      <!-- Custom Actions Slot -->
      <slot name="actions"></slot>

      <!-- Main Save Button -->
      <button 
        type="button" 
        @click="$emit('save')" 
        :disabled="isSaving"
        class="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-98"
      >
        <i v-if="isSaving" class="fa-solid fa-spinner fa-spin"></i>
        <i v-else class="fa-solid fa-check"></i>
        <span>{{ isSaving ? (savingLabel || 'جاري الحفظ...') : (saveLabel || 'حفظ ونشر التعديلات') }}</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  isSaving?: boolean
  saveLabel?: string
  savingLabel?: string
  statusLabel?: string
  isActive?: boolean | number
  showStatus?: boolean
  previewUrl?: string
  previewLabel?: string
  cancelUrl?: string
  cancelLabel?: string
}>(), {
  isSaving: false,
  saveLabel: 'حفظ ونشر التعديلات',
  savingLabel: 'جاري الحفظ...',
  showStatus: true,
  isActive: true
})

defineEmits<{
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>
