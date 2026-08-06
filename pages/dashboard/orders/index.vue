<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة الطلبات</h1>
        <p class="text-sm text-slate-500 mt-1">تتبع وعالج طلبات عملائك من مكان واحد.</p>
      </div>
      
      <!-- Export button or something if needed in future -->
      <BaseButton variant="outline" class="gap-2 bg-white">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        تصدير التقرير
      </BaseButton>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <BaseInput 
        v-model="searchQuery" 
        placeholder="ابحث برقم الطلب أو اسم العميل..." 
        class="w-full md:w-80"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </BaseInput>

      <BaseSelect 
        v-model="statusFilter"
        :options="statusOptions"
        class="w-full md:w-56"
      />
      
      <BaseSelect 
        v-model="dateFilter"
        :options="dateOptions"
        class="w-full md:w-48"
      />
    </div>

    <!-- Orders Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">رقم الطلب</th>
              <th class="px-6 py-4">العميل</th>
              <th class="px-6 py-4">التاريخ والوقت</th>
              <th class="px-6 py-4">حالة الطلب</th>
              <th class="px-6 py-4">طريقة الدفع</th>
              <th class="px-6 py-4 text-left">الإجمالي</th>
              <th class="px-6 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-if="filteredOrders.length === 0">
              <td colspan="7" class="px-6 py-12 text-center text-slate-500 font-bold">
                لم يتم العثور على أي طلبات مطابقة.
              </td>
            </tr>
            <tr v-for="order in filteredOrders" :key="order.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4 font-bold text-indigo-600">
                #{{ order.orderNumber }}
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">
                    {{ order.customerName.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">{{ order.customerName }}</span>
                    <span class="text-xs text-slate-500">{{ order.customerEmail }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">
                <div class="flex flex-col">
                  <span>{{ order.date }}</span>
                  <span class="text-xs text-slate-400">{{ order.time }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <StatusBadge :status="order.status" />
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 text-slate-600 text-xs font-bold border border-slate-200">
                  <svg v-if="order.paymentMethod === 'card'" class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  <svg v-else class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  {{ order.paymentMethod === 'card' ? 'بطاقة ائتمان' : 'الدفع عند الاستلام' }}
                </span>
              </td>
              <td class="px-6 py-4 text-left font-black text-slate-800">
                {{ order.total }} ر.س
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center">
                  <NuxtLink :to="`/dashboard/orders/${order.id}`" class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 flex items-center gap-1">
                    التفاصيل
                    <svg class="w-3.5 h-3.5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'

definePageMeta({
  layout: 'dashboard'
})

// Filters
const searchQuery = ref('')
const statusFilter = ref('')
const dateFilter = ref('')

const statusOptions = [
  { value: '', label: 'جميع الحالات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد المعالجة' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'completed', label: 'مكتمل (تم التسليم)' },
  { value: 'cancelled', label: 'ملغي' },
]

const dateOptions = [
  { value: '', label: 'كل الأوقات' },
  { value: 'today', label: 'اليوم' },
  { value: 'yesterday', label: 'أمس' },
  { value: 'this_week', label: 'هذا الأسبوع' },
  { value: 'this_month', label: 'هذا الشهر' },
]

// Mock Orders Data
const orders = ref([
  { id: '1', orderNumber: 'ORD-1001', customerName: 'أحمد محمد', customerEmail: 'ahmed@example.com', date: '2026-08-06', time: '14:30', status: 'pending', paymentMethod: 'cod', total: 4500 },
  { id: '2', orderNumber: 'ORD-1002', customerName: 'سارة خالد', customerEmail: 'sara@example.com', date: '2026-08-05', time: '09:15', status: 'processing', paymentMethod: 'card', total: 1250 },
  { id: '3', orderNumber: 'ORD-1003', customerName: 'عبدالله السعيد', customerEmail: 'abdullah@example.com', date: '2026-08-04', time: '18:45', status: 'shipped', paymentMethod: 'card', total: 3200 },
  { id: '4', orderNumber: 'ORD-1004', customerName: 'نورة الدوسري', customerEmail: 'noura@example.com', date: '2026-08-02', time: '11:20', status: 'completed', paymentMethod: 'card', total: 850 },
  { id: '5', orderNumber: 'ORD-1005', customerName: 'محمد العتيبي', customerEmail: 'mohammed@example.com', date: '2026-08-01', time: '16:00', status: 'cancelled', paymentMethod: 'cod', total: 5400 },
])

const filteredOrders = computed(() => {
  let result = orders.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(o => 
      o.orderNumber.toLowerCase().includes(q) || 
      o.customerName.toLowerCase().includes(q) ||
      o.customerEmail.toLowerCase().includes(q)
    )
  }

  if (statusFilter.value) {
    result = result.filter(o => o.status === statusFilter.value)
  }
  
  // Date filter logic (mocked for visual correctness)
  // In a real scenario, use dayjs to filter dates

  return result
})
</script>
