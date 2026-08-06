<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">نظرة عامة</h1>
        <p class="text-sm text-slate-500 mt-1">مرحباً بك في لوحة تحكم أسوار جدة. إليك ملخص أداء المتجر اليوم.</p>
      </div>
      
      <!-- Date Range Filter (Placeholder) -->
      <button class="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        اليوم: {{ currentDate }}
      </button>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <template v-if="loading">
        <StatCardSkeleton v-for="i in 4" :key="i" />
      </template>
      <template v-else>
        <StatCard 
          title="إجمالي المبيعات" 
          value="124,500 ر.س" 
          :trend="12.5" 
          iconBgColor="bg-indigo-50 text-indigo-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </StatCard>
        
        <StatCard 
          title="الطلبات المعلقة" 
          value="45 طلب" 
          :trend="-5.2" 
          trendLabel="مقارنة باليوم الماضي"
          iconBgColor="bg-amber-50 text-amber-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </template>
        </StatCard>

        <StatCard 
          title="عدد العملاء" 
          value="1,204" 
          :trend="8.1" 
          iconBgColor="bg-emerald-50 text-emerald-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </template>
        </StatCard>

        <StatCard 
          title="منتجات نفدت" 
          value="12 منتج" 
          :trend="0"
          trendLabel="يحتاج لتوريد عاجل"
          iconBgColor="bg-red-50 text-red-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </template>
        </StatCard>
      </template>
    </div>

    <!-- Charts & Tables Row -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- Chart Area (Spans 2 columns on large screens) -->
      <div class="xl:col-span-2 flex flex-col min-w-0">
        <!-- Skeleton for Chart -->
        <div v-if="loading" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[400px]">
           <div class="flex items-center justify-between mb-6">
              <div class="w-32 h-6 bg-slate-200 rounded-lg animate-pulse mb-2"></div>
              <div class="w-48 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
           </div>
           <div class="flex-1 w-full bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
        <SalesChart v-else />
      </div>

      <!-- Recent Orders Area -->
      <div class="xl:col-span-1 flex flex-col min-w-0">
        <TableSkeleton v-if="loading" :rows="5" />
        <RecentOrdersTable v-else :orders="recentOrders" />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import StatCard from '~/components/dashboard/StatCard.vue'
import StatCardSkeleton from '~/components/dashboard/StatCardSkeleton.vue'
import SalesChart from '~/components/dashboard/SalesChart.vue'
import RecentOrdersTable from '~/components/dashboard/RecentOrdersTable.vue'
import TableSkeleton from '~/components/dashboard/TableSkeleton.vue'

definePageMeta({
  layout: 'dashboard'
})

const loading = ref(true)

const currentDate = new Intl.DateTimeFormat('ar-SA', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}).format(new Date())

// Mock Orders Data
const recentOrders = ref([
  { id: '1042', customer: 'أحمد محمد', email: 'ahmed@example.com', date: 'منذ ساعتين', status: 'pending', total: '4,500 ر.س' },
  { id: '1041', customer: 'سارة خالد', email: 'sara@example.com', date: 'اليوم', status: 'processing', total: '1,250 ر.س' },
  { id: '1040', customer: 'شركة الأفق', email: 'info@horizon.com', date: 'أمس', status: 'completed', total: '12,000 ر.س' },
  { id: '1039', customer: 'فهد عبدالله', email: 'fahad@example.com', date: 'أمس', status: 'shipped', total: '850 ر.س' },
  { id: '1038', customer: 'نورة الدوسري', email: 'noura@example.com', date: 'منذ يومين', status: 'cancelled', total: '3,200 ر.س' },
] as const)

onMounted(() => {
  // Simulate API Call for skeletons
  setTimeout(() => {
    loading.value = false
  }, 1500)
})
</script>
