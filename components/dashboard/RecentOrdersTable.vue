<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
    <!-- Header -->
    <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
      <h3 class="font-black text-slate-800 text-lg">أحدث الطلبات</h3>
      <NuxtLink to="/admin/orders" class="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
        عرض الكل
        <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Table Container for Responsive Scroll -->
    <div class="overflow-x-auto w-full">
      <table class="w-full text-right text-sm whitespace-nowrap">
        <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
          <tr>
            <th class="px-6 py-4 font-bold">رقم الطلب</th>
            <th class="px-6 py-4 font-bold">العميل</th>
            <th class="px-6 py-4 font-bold">التاريخ</th>
            <th class="px-6 py-4 font-bold">الحالة</th>
            <th class="px-6 py-4 font-bold">الإجمالي</th>
            <th class="px-6 py-4 font-bold text-center">إجراء</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100/80">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors">
            <td class="px-6 py-4 font-black text-slate-800 dir-ltr text-right">#{{ order.id }}</td>
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold shrink-0">
                  {{ order.customer.charAt(0) }}
                </div>
                <div class="flex flex-col">
                  <span class="font-bold text-slate-700">{{ order.customer }}</span>
                  <span class="text-xs text-slate-400">{{ order.email }}</span>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 text-slate-500 font-medium">{{ order.date }}</td>
            <td class="px-6 py-4">
              <StatusBadge :status="order.status" />
            </td>
            <td class="px-6 py-4 font-bold text-slate-800 dir-ltr text-right">{{ order.total }}</td>
            <td class="px-6 py-4 text-center">
              <button class="text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-indigo-50">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import StatusBadge from './ui/StatusBadge.vue'

interface Order {
  id: string
  customer: string
  email: string
  date: string
  status: 'processing' | 'completed' | 'cancelled' | 'pending' | 'shipped'
  total: string
}

defineProps<{
  orders: Order[]
}>()
</script>
