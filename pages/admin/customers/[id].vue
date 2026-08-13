<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/admin/customers" class="w-10 h-10 shrink-0 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-800 leading-tight">الملف الشخصي للعميل</h1>
          <p class="text-sm text-slate-500 mt-1">تفاصيل العميل وسجل طلباته الكامل</p>
        </div>
      </div>
      
      <!-- Actions -->
      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full sm:w-auto">
        <BaseButton variant="outline" class="w-full sm:w-auto gap-2 bg-white text-red-600 hover:bg-red-50 hover:border-red-200 shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          حذف العميل
        </BaseButton>
        <BaseButton variant="primary" class="w-full sm:w-auto gap-2 shrink-0">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          إرسال بريد
        </BaseButton>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-6">
      
      <!-- Top Section: Profile & Stats -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- Right Column: Profile Card (col-span-1) -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center h-full">
            <div class="w-24 h-24 rounded-full bg-indigo-50 border-4 border-white shadow-sm flex items-center justify-center text-indigo-700 font-bold text-4xl mb-4">
              {{ customer.name.charAt(0) }}
            </div>
            <h2 class="text-xl font-black text-slate-800">{{ customer.name }}</h2>
            <p class="text-sm text-slate-500 mt-1">عضو منذ {{ customer.registrationDate }}</p>
            
            <div class="w-full h-px bg-slate-100 my-6"></div>
            
            <div class="w-full space-y-4 text-right">
              <div class="flex items-center gap-3 text-slate-600">
                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <span class="text-sm font-medium">{{ customer.email }}</span>
              </div>
              <div class="flex items-center gap-3 text-slate-600">
                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <span class="text-sm font-medium" dir="ltr">{{ customer.phone }}</span>
              </div>
              <div class="flex items-center gap-3 text-slate-600">
                <div class="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <span class="text-sm font-medium">{{ customer.address }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Left Column: Stats Grid (col-span-2) -->
        <div class="lg:col-span-2">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 h-full">
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <div class="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <span class="text-sm font-bold text-slate-500 mb-1">إجمالي الطلبات</span>
              <span class="text-3xl font-black text-indigo-600">{{ customer.totalOrders }}</span>
            </div>
            
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center">
              <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span class="text-sm font-bold text-slate-500 mb-1">إجمالي المدفوعات</span>
              <span class="text-2xl font-black text-emerald-600">{{ customer.totalSpent }} ر.س</span>
            </div>
            
            <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-center items-center text-center sm:col-span-2 lg:col-span-1">
              <div class="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              </div>
              <span class="text-sm font-bold text-slate-500 mb-1">متوسط قيمة الطلب</span>
              <span class="text-2xl font-black text-amber-600">{{ Math.round(customer.totalSpent / Math.max(1, customer.totalOrders)) }} ر.س</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Section: Order History -->
      <div class="w-full">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 class="text-lg font-black text-slate-800">سجل الطلبات</h3>
            <span class="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-sm">{{ customer.orders.length }} طلبات</span>
          </div>
          
          <div class="overflow-x-auto w-full">
            <table class="w-full text-right text-sm whitespace-nowrap">
              <thead class="bg-white text-slate-500 font-bold border-b border-slate-100">
                <tr>
                  <th class="px-6 py-4">رقم الطلب</th>
                  <th class="px-6 py-4">التاريخ</th>
                  <th class="px-6 py-4">الحالة</th>
                  <th class="px-6 py-4">العناصر</th>
                  <th class="px-6 py-4 text-left">الإجمالي</th>
                  <th class="px-6 py-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100/80 bg-white">
                <tr v-if="customer.orders.length === 0">
                  <td colspan="6" class="px-6 py-12 text-center text-slate-500 font-bold">
                    لا يوجد سجل طلبات لهذا العميل.
                  </td>
                </tr>
                <tr v-for="order in customer.orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors group">
                  <td class="px-6 py-4 font-bold text-slate-800">
                    #{{ order.orderNumber }}
                  </td>
                  <td class="px-6 py-4 text-slate-600">
                    {{ order.date }}
                  </td>
                  <td class="px-6 py-4">
                    <StatusBadge :status="order.status" />
                  </td>
                  <td class="px-6 py-4 text-slate-600">
                    {{ order.itemsCount }} منتجات
                  </td>
                  <td class="px-6 py-4 text-left font-black text-slate-800">
                    {{ order.total }} ر.س
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex items-center justify-center">
                      <NuxtLink :to="`/admin/orders/${order.id}`" class="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1">
                        التفاصيل
                      </NuxtLink>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()

// Mock Customer Data
const customer = ref({
  id: '1',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+966 50 123 4567',
  registrationDate: '1 أغسطس 2026',
  address: 'الرياض، المملكة العربية السعودية',
  totalOrders: 4,
  totalSpent: 14500,
  orders: [
    { id: '101', orderNumber: 'ORD-1001', date: '2026-08-06', status: 'pending', itemsCount: 3, total: 5900 },
    { id: '102', orderNumber: 'ORD-0952', date: '2026-07-20', status: 'completed', itemsCount: 1, total: 3200 },
    { id: '103', orderNumber: 'ORD-0811', date: '2026-06-15', status: 'completed', itemsCount: 4, total: 4550 },
    { id: '104', orderNumber: 'ORD-0750', date: '2026-05-10', status: 'cancelled', itemsCount: 2, total: 850 },
  ]
})
</script>
