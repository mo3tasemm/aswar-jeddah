<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h3 class="font-black text-slate-800 text-lg">أحدث الطلبات</h3>
        <p class="text-xs text-slate-400 mt-0.5">آخر العمليات الشرائية المحدثة في المتجر</p>
      </div>
      <NuxtLink to="/admin/orders" class="text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
        عرض الكل
        <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Table Container for Responsive Scroll -->
    <div class="overflow-x-auto w-full flex-1">
      <table class="w-full text-start text-sm whitespace-nowrap">
        <thead class="bg-slate-50 text-slate-400 text-xs font-bold border-b border-slate-100">
          <tr>
            <th class="px-6 py-3.5 font-black text-start">رقم الطلب</th>
            <th class="px-6 py-3.5 font-black text-start">العميل</th>
            <th class="px-6 py-3.5 font-black text-start">التاريخ</th>
            <th class="px-6 py-3.5 font-black text-start">الحالة</th>
            <th class="px-6 py-3.5 font-black text-end">الإجمالي</th>
            <th class="px-6 py-3.5 font-black text-center">إجراء</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <template v-if="orders && orders.length > 0">
            <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4 font-mono font-black text-xs text-indigo-600 text-start">
                {{ formatOrderKey(order) }}
              </td>
              <td class="px-6 py-4 text-start">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-700 font-black text-xs shrink-0">
                    <img 
                      v-if="getCustomerImage(order)" 
                      :src="getCustomerImage(order)" 
                      class="w-full h-full object-cover" 
                      alt="Customer"
                      @error="(e: any) => e.target.style.display = 'none'"
                    />
                    <span v-else>{{ getCustomerName(order).charAt(0).toUpperCase() }}</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-xs text-slate-800">{{ getCustomerName(order) }}</span>
                    <span class="text-[11px] text-slate-400 font-mono">{{ getCustomerContact(order) }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-xs text-slate-500 font-medium text-start">
                {{ order.created_at_human || order.date || order.created_at || 'الآن' }}
              </td>
              <td class="px-6 py-4 text-start">
                <StatusBadge :status="order.order_status || order.status || 'pending'" />
              </td>
              <td class="px-6 py-4 font-black text-xs text-slate-900 text-end">
                {{ formatTotal(order) }}
              </td>
              <td class="px-6 py-4 text-center">
                <NuxtLink 
                  :to="`/admin/orders/${order.id}`" 
                  class="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-indigo-50 inline-flex items-center justify-center cursor-pointer"
                  title="تفاصيل الطلب"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </NuxtLink>
              </td>
            </tr>
          </template>
          <tr v-else>
            <td colspan="6" class="py-12 text-center text-xs text-slate-400 font-bold">
              لا توجد طلبات مسجلة حالياً
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './ui/StatusBadge.vue'

interface Props {
  orders?: any[]
  currencySymbol?: string
}

const props = withDefaults(defineProps<Props>(), {
  orders: () => [],
  currencySymbol: 'ر.س'
})

const formatOrderKey = (order: any): string => {
  const key = String(order.order_key || order.id || '')
  if (!key) return '#---'
  return key.startsWith('#') ? key : `#${key}`
}

const getCustomerName = (order: any): string => {
  if (typeof order.customer === 'object' && order.customer !== null) {
    return order.customer.name || 'عميل نقدي'
  }
  if (typeof order.customer === 'string' && order.customer) {
    return order.customer
  }
  return order.customer_name || 'عميل نقدي'
}

const getCustomerContact = (order: any): string => {
  if (typeof order.customer === 'object' && order.customer !== null) {
    return order.customer.email || order.customer.phone || ''
  }
  return order.email || order.phone || ''
}

const getCustomerImage = (order: any): string => {
  if (typeof order.customer === 'object' && order.customer !== null) {
    return order.customer.image || ''
  }
  return order.image || ''
}

const formatTotal = (order: any): string => {
  if (order.total !== undefined && typeof order.total === 'string') {
    return order.total
  }
  const amount = Number(order.order_amount ?? order.total ?? 0)
  return `${amount.toLocaleString()} ${props.currencySymbol}`
}
</script>
