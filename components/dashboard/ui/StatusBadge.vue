<template>
  <span 
    class="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide"
    :class="colorClasses"
  >
    <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0" :class="dotColorClass"></span>
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: 'processing' | 'completed' | 'cancelled' | 'pending' | 'shipped'
}>()

const statusConfig = {
  processing: { label: 'قيد المعالجة', bg: 'bg-blue-50 text-blue-700 border border-blue-200/60', dot: 'bg-blue-500' },
  completed: { label: 'مكتمل', bg: 'bg-emerald-50 text-emerald-700 border border-emerald-200/60', dot: 'bg-emerald-500' },
  cancelled: { label: 'ملغي', bg: 'bg-red-50 text-red-700 border border-red-200/60', dot: 'bg-red-500' },
  pending: { label: 'قيد الانتظار', bg: 'bg-amber-50 text-amber-700 border border-amber-200/60', dot: 'bg-amber-500' },
  shipped: { label: 'تم الشحن', bg: 'bg-indigo-50 text-indigo-700 border border-indigo-200/60', dot: 'bg-indigo-500' },
}

const config = computed(() => statusConfig[props.status] || statusConfig.pending)

const label = computed(() => config.value.label)
const colorClasses = computed(() => config.value.bg)
const dotColorClass = computed(() => config.value.dot)
</script>
