<template>
  <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow">
    <div class="flex items-start justify-between mb-4">
      <div>
        <p class="text-sm font-bold text-slate-500 mb-1">{{ title }}</p>
        <h4 class="text-2xl font-black text-slate-800 dir-ltr text-right">{{ value }}</h4>
      </div>
      
      <!-- Icon Wrapper -->
      <div 
        class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
        :class="iconBgColor"
      >
        <slot name="icon">
          <!-- Fallback Icon -->
          <svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </slot>
      </div>
    </div>
    
    <!-- Trend -->
    <div v-if="trend" class="flex items-center gap-2 text-xs font-bold mt-auto pt-2 border-t border-slate-50">
      <div 
        class="flex items-center gap-1"
        :class="trend > 0 ? 'text-green-600' : (trend < 0 ? 'text-red-500' : 'text-slate-400')"
      >
        <svg v-if="trend > 0" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
        <svg v-else-if="trend < 0" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25" />
        </svg>
        <svg v-else class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15" />
        </svg>
        <span class="dir-ltr inline-block">{{ Math.abs(trend) }}%</span>
      </div>
      <span class="text-slate-400">{{ trendLabel }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  value: string | number
  trend?: number
  trendLabel?: string
  iconBgColor?: string
}

withDefaults(defineProps<Props>(), {
  iconBgColor: 'bg-indigo-50 text-indigo-600',
  trendLabel: 'مقارنة بالشهر الماضي'
})
</script>
