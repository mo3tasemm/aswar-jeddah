<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة العملاء</h1>
        <p class="text-sm text-slate-500 mt-1">تابع عملائك، وتعرف على تاريخ مشترياتهم وسلوكياتهم.</p>
      </div>
      
      <!-- Export button (for future use) -->
      <BaseButton variant="outline" class="gap-2 bg-white">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        تصدير القائمة
      </BaseButton>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <BaseInput 
        v-model="searchQuery" 
        placeholder="ابحث بالاسم، أو البريد الإلكتروني، أو رقم الهاتف..." 
        class="w-full md:w-96"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </BaseInput>

      <BaseSelect 
        v-model="sortFilter"
        :options="sortOptions"
        class="w-full md:w-56"
      />
    </div>

    <!-- Customers Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">العميل</th>
              <th class="px-6 py-4">تاريخ التسجيل</th>
              <th class="px-6 py-4 text-center">إجمالي الطلبات</th>
              <th class="px-6 py-4 text-left">إجمالي المشتريات</th>
              <th class="px-6 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-if="filteredCustomers.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500 font-bold">
                لم يتم العثور على أي عملاء مطابقين.
              </td>
            </tr>
            <tr v-for="customer in filteredCustomers" :key="customer.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg shrink-0">
                    {{ customer.name.charAt(0) }}
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">{{ customer.name }}</span>
                    <div class="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{{ customer.email }}</span>
                      <span class="w-1 h-1 rounded-full bg-slate-300"></span>
                      <span dir="ltr">{{ customer.phone }}</span>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600">
                {{ customer.registrationDate }}
              </td>
              <td class="px-6 py-4 text-center">
                <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold">
                  {{ customer.totalOrders }}
                </span>
              </td>
              <td class="px-6 py-4 text-left font-black text-emerald-600">
                {{ customer.totalSpent }} ر.س
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center">
                  <NuxtLink :to="`/admin/customers/${customer.id}`" class="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors flex items-center gap-1">
                    الملف الشخصي
                    <svg class="w-3.5 h-3.5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>عرض {{ filteredCustomers.length }} من أصل {{ customers.length }} عميل</span>
        <div class="flex gap-2">
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50" disabled>
            <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-600 text-white font-bold">1</button>
          <button class="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-400 disabled:opacity-50" disabled>
            <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'

definePageMeta({
  layout: 'dashboard'
})

// Filters
const searchQuery = ref('')
const sortFilter = ref('newest')

const sortOptions = [
  { value: 'newest', label: 'الأحدث تسجيلاً' },
  { value: 'oldest', label: 'الأقدم تسجيلاً' },
  { value: 'highest_spent', label: 'الأعلى إنفاقاً' },
  { value: 'most_orders', label: 'الأكثر طلبات' },
]

// Mock Customers Data
const customers = ref([
  { id: '1', name: 'أحمد محمد', email: 'ahmed@example.com', phone: '+966 50 123 4567', registrationDate: '2026-08-01', totalOrders: 12, totalSpent: 14500 },
  { id: '2', name: 'سارة خالد', email: 'sara@example.com', phone: '+966 55 987 6543', registrationDate: '2026-07-15', totalOrders: 5, totalSpent: 3200 },
  { id: '3', name: 'عبدالله السعيد', email: 'abdullah@example.com', phone: '+966 53 456 7890', registrationDate: '2026-06-20', totalOrders: 21, totalSpent: 45000 },
  { id: '4', name: 'نورة الدوسري', email: 'noura@example.com', phone: '+966 56 321 0987', registrationDate: '2026-08-05', totalOrders: 1, totalSpent: 850 },
  { id: '5', name: 'محمد العتيبي', email: 'mohammed@example.com', phone: '+966 59 876 5432', registrationDate: '2026-05-10', totalOrders: 8, totalSpent: 9600 },
])

const filteredCustomers = computed(() => {
  let result = [...customers.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q)
    )
  }

  if (sortFilter.value === 'newest') {
    result.sort((a, b) => new Date(b.registrationDate).getTime() - new Date(a.registrationDate).getTime())
  } else if (sortFilter.value === 'oldest') {
    result.sort((a, b) => new Date(a.registrationDate).getTime() - new Date(b.registrationDate).getTime())
  } else if (sortFilter.value === 'highest_spent') {
    result.sort((a, b) => b.totalSpent - a.totalSpent)
  } else if (sortFilter.value === 'most_orders') {
    result.sort((a, b) => b.totalOrders - a.totalOrders)
  }

  return result
})
</script>
