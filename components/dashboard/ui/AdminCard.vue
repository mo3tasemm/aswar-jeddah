<template>
  <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
    
    <!-- Card Header -->
    <div v-if="title || $slots['header-actions']" class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
      <div>
        <div class="flex items-center gap-2">
          <i v-if="icon" :class="[icon, iconColor || 'text-amber-500', 'text-base sm:text-lg']"></i>
          <h3 class="text-base sm:text-lg font-black text-slate-900">
            {{ title }}
          </h3>
          <span 
            v-if="badge" 
            :class="['px-2.5 py-0.5 rounded-full text-[11px] font-bold', badgeColor || 'bg-indigo-50 text-indigo-700 border border-indigo-200/60']"
          >
            {{ badge }}
          </span>
        </div>
        <p v-if="subtitle" class="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
          {{ subtitle }}
        </p>
      </div>

      <!-- Header Actions Slot -->
      <div v-if="$slots['header-actions']" class="flex items-center gap-2 shrink-0">
        <slot name="header-actions"></slot>
      </div>
    </div>

    <!-- Card Body Slot -->
    <div>
      <slot></slot>
    </div>

    <!-- Card Footer Slot -->
    <div v-if="$slots.footer" class="border-t border-slate-100 pt-4">
      <slot name="footer"></slot>
    </div>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  icon?: string
  iconColor?: string
  badge?: string
  badgeColor?: string
}>()
</script>
