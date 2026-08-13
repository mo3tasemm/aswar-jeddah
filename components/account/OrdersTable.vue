<template>
  <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden" :dir="layoutDirection">
    <div class="p-8 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-[#0B0E28]">{{ title || t('account.orders') }}</h2>
        <p class="text-slate-400 text-sm mt-1">{{ t('orders.track_subtitle') }}</p>
      </div>
      <NuxtLink v-if="showViewAll" to="/my-account/orders" class="text-sm font-bold text-amber-500 hover:text-[#0B0E28] transition-colors flex items-center gap-2 cursor-pointer">
        <span>{{ t('orders.view_all') }}</span>
        <svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
      </NuxtLink>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-start border-collapse">
        <thead>
          <tr class="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <th class="p-6 whitespace-nowrap text-start">{{ t('orders.order_id') }}</th>
            <th class="p-6 whitespace-nowrap text-start">{{ t('orders.date') }}</th>
            <th class="p-6 whitespace-nowrap text-start">{{ t('orders.total') }}</th>
            <th class="p-6 whitespace-nowrap text-start">{{ t('orders.status') }}</th>
            <th class="p-6 whitespace-nowrap text-end">{{ t('orders.action') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors group">
            <td class="p-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <span class="font-black text-[#0B0E28]">{{ order.id }}</span>
              </div>
            </td>
            <td class="p-6 text-sm text-slate-500 font-medium">{{ order.date }}</td>
            <td class="p-6 text-sm font-black text-[#0B0E28]">{{ renderOrderTotal(order) }}</td>
            <td class="p-6">
              <span 
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"
                :class="getStatusBadgeClass(order)"
              >
                <span v-if="isProcessing(order)" class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                <span>{{ getStatusLabel(order) }}</span>
              </span>
            </td>
            <td class="p-6 text-end">
              <button @click="$emit('open-details', order)" class="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-[#0B0E28] hover:text-amber-400 hover:border-[#0B0E28] transition-all shadow-sm cursor-pointer">
                {{ t('orders.details') }}
              </button>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="orders.length === 0">
            <td colspan="5" class="p-12 text-center text-slate-400 font-medium">
              {{ t('orders.empty') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  orders: {
    type: Array as () => any[],
    default: () => []
  },
  title: {
    type: String,
    default: ''
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
})

defineEmits(['open-details'])

const { t, formatCurrency, layoutDirection } = useLanguage()

const renderOrderTotal = (order: any) => {
  if (typeof order.total === 'string' && (order.total.includes('SAR') || order.total.includes('ر.س'))) {
    return order.total
  }
  return formatCurrency(order.total || 0)
}

const isProcessing = (order: any) => {
  return order.status === 'processing'
}

const getStatusBadgeClass = (order: any) => {
  if (order.status === 'completed') {
    return 'bg-emerald-50 text-emerald-600 border-emerald-200'
  }
  if (order.status === 'cancelled') {
    return 'bg-rose-50 text-rose-600 border-rose-200'
  }
  return 'bg-amber-50 text-amber-600 border-amber-200'
}

const getStatusLabel = (order: any) => {
  if (order.statusText) return order.statusText
  if (order.status === 'completed') return t('orders.completed')
  if (order.status === 'cancelled') return t('orders.cancelled')
  return t('orders.processing')
}
</script>
