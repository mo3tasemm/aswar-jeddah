<template>
  <span 
    class="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-xs font-black tracking-wide shrink-0 transition-colors"
    :class="colorClasses"
  >
    <span class="w-2 h-2 rounded-full shrink-0" :class="dotColorClass"></span>
    <span>{{ statusLabel }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

const props = defineProps<{
  status: string
  type?: 'order' | 'payment' | 'general'
}>()

const { locale, adminLanguage } = useAdminLanguage()
const isAr = computed(() => {
  const lang = locale?.value || adminLanguage?.value || 'ar'
  return lang === 'ar'
})

const statusNormalized = computed(() => {
  return String(props.status || 'pending').toLowerCase().trim()
})

const statusConfig: Record<string, { ar: string; en: string; bg: string; dot: string }> = {
  // Order Statuses
  pending: { 
    ar: 'قيد الانتظار', 
    en: 'Pending', 
    bg: 'bg-amber-50 text-amber-800 border border-amber-200/80', 
    dot: 'bg-amber-500' 
  },
  confirmed: { 
    ar: 'تم التأكيد', 
    en: 'Confirmed', 
    bg: 'bg-sky-50 text-sky-800 border border-sky-200/80', 
    dot: 'bg-sky-500' 
  },
  processing: { 
    ar: 'قيد التجهيز', 
    en: 'Processing', 
    bg: 'bg-blue-50 text-blue-800 border border-blue-200/80', 
    dot: 'bg-blue-500' 
  },
  out_for_delivery: { 
    ar: 'خرج للتوصيل', 
    en: 'Out for Delivery', 
    bg: 'bg-indigo-50 text-indigo-800 border border-indigo-200/80', 
    dot: 'bg-indigo-500' 
  },
  shipped: { 
    ar: 'تم الشحن', 
    en: 'Shipped', 
    bg: 'bg-indigo-50 text-indigo-800 border border-indigo-200/80', 
    dot: 'bg-indigo-500' 
  },
  delivered: { 
    ar: 'تم التوصيل', 
    en: 'Delivered', 
    bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80', 
    dot: 'bg-emerald-500' 
  },
  completed: { 
    ar: 'مكتمل', 
    en: 'Completed', 
    bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80', 
    dot: 'bg-emerald-500' 
  },
  canceled: { 
    ar: 'ملغي', 
    en: 'Canceled', 
    bg: 'bg-rose-50 text-rose-800 border border-rose-200/80', 
    dot: 'bg-rose-500' 
  },
  cancelled: { 
    ar: 'ملغي', 
    en: 'Cancelled', 
    bg: 'bg-rose-50 text-rose-800 border border-rose-200/80', 
    dot: 'bg-rose-500' 
  },
  returned: { 
    ar: 'مرتجع', 
    en: 'Returned', 
    bg: 'bg-orange-50 text-orange-800 border border-orange-200/80', 
    dot: 'bg-orange-500' 
  },
  failed: { 
    ar: 'فشل التسليم', 
    en: 'Failed', 
    bg: 'bg-red-50 text-red-800 border border-red-200/80', 
    dot: 'bg-red-500' 
  },

  // Payment Statuses
  paid: { 
    ar: 'مدفوع', 
    en: 'Paid', 
    bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80', 
    dot: 'bg-emerald-500' 
  },
  unpaid: { 
    ar: 'غير مدفوع', 
    en: 'Unpaid', 
    bg: 'bg-amber-50 text-amber-800 border border-amber-200/80', 
    dot: 'bg-amber-500' 
  },
  refunded: { 
    ar: 'مسترد', 
    en: 'Refunded', 
    bg: 'bg-purple-50 text-purple-800 border border-purple-200/80', 
    dot: 'bg-purple-500' 
  },

  // Generic
  active: {
    ar: 'نشط',
    en: 'Active',
    bg: 'bg-emerald-50 text-emerald-800 border border-emerald-200/80',
    dot: 'bg-emerald-500'
  },
  inactive: {
    ar: 'غير نشط',
    en: 'Inactive',
    bg: 'bg-slate-100 text-slate-700 border border-slate-200/80',
    dot: 'bg-slate-400'
  }
}

const currentConfig = computed(() => {
  return statusConfig[statusNormalized.value] || {
    ar: props.status,
    en: props.status,
    bg: 'bg-slate-100 text-slate-700 border border-slate-200',
    dot: 'bg-slate-400'
  }
})

const statusLabel = computed(() => {
  return isAr.value ? currentConfig.value.ar : currentConfig.value.en
})

const colorClasses = computed(() => currentConfig.value.bg)
const dotColorClass = computed(() => currentConfig.value.dot)
</script>
