<template>
  <div class="space-y-6">
    <!-- Header & Live Date Bar -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-slate-800">نظرة عامة</h1>
          <button 
            @click="loadDashboard" 
            :disabled="loading"
            title="تحديث البيانات"
            class="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': loading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
        <p class="text-sm text-slate-500 mt-1">مرحباً بك في لوحة تحكم أسوار جدة. إليك ملخص وأداء المتجر.</p>
      </div>
      
      <!-- Date Display & Quick Filter Info -->
      <div class="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm">
        <svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>اليوم: {{ currentDate }}</span>
      </div>
    </div>

    <!-- Error Banner if API fails -->
    <div v-if="errorMessage" class="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-between">
      <span>{{ errorMessage }}</span>
      <button @click="loadDashboard" class="underline hover:text-red-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Stats Grid (KPIs) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <template v-if="loading && !isInitialLoaded">
        <StatCardSkeleton v-for="i in 4" :key="i" />
      </template>
      <template v-else>
        <!-- 1. Total Sales -->
        <StatCard 
          title="إجمالي المبيعات" 
          :value="`${dashboardData.summary.total_sales.toLocaleString()} ${currencySymbol}`" 
          :trend="dashboardData.summary.total_sales_growth" 
          :trendLabel="periodGrowthLabel"
          iconBgColor="bg-indigo-50 text-indigo-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </StatCard>
        
        <!-- 2. Pending Orders / Total Orders -->
        <StatCard 
          title="الطلبات المعلقة" 
          :value="`${(dashboardData.summary.pending_orders || dashboardData.order_status_counts.pending || dashboardData.summary.total_orders).toLocaleString()} طلب`" 
          :trend="dashboardData.summary.pending_orders_growth || dashboardData.summary.total_orders_growth" 
          :trendLabel="periodGrowthLabel"
          iconBgColor="bg-amber-50 text-amber-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </template>
        </StatCard>

        <!-- 3. Total Customers -->
        <StatCard 
          title="عدد العملاء" 
          :value="dashboardData.summary.total_customers.toLocaleString()" 
          :trend="dashboardData.summary.total_customers_growth" 
          :trendLabel="periodGrowthLabel"
          iconBgColor="bg-emerald-50 text-emerald-600"
        >
          <template #icon>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </template>
        </StatCard>

        <!-- 4. Out of Stock Products -->
        <StatCard 
          title="منتجات نفدت" 
          :value="`${dashboardData.summary.out_of_stock_products.toLocaleString()} منتج`" 
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
        <div v-if="loading && !isInitialLoaded" class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[400px]">
           <div class="flex items-center justify-between mb-6">
              <div class="w-32 h-6 bg-slate-200 rounded-lg animate-pulse mb-2"></div>
              <div class="w-48 h-8 bg-slate-200 rounded-lg animate-pulse"></div>
           </div>
           <div class="flex-1 w-full bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
        <SalesChart 
          v-else 
          :labels="dashboardData.sales_chart.labels"
          :sales="dashboardData.sales_chart.sales"
          :period="activePeriod"
          :loading="loading"
          :currencySymbol="currencySymbol"
          @change-period="handlePeriodChange"
        />
      </div>

      <!-- Recent Orders Area -->
      <div class="xl:col-span-1 flex flex-col min-w-0">
        <TableSkeleton v-if="loading && !isInitialLoaded" :rows="5" />
        <RecentOrdersTable 
          v-else 
          :orders="dashboardData.recent_orders" 
          :currencySymbol="currencySymbol"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import StatCard from '~/components/dashboard/StatCard.vue'
import StatCardSkeleton from '~/components/dashboard/StatCardSkeleton.vue'
import SalesChart from '~/components/dashboard/SalesChart.vue'
import RecentOrdersTable from '~/components/dashboard/RecentOrdersTable.vue'
import TableSkeleton from '~/components/dashboard/TableSkeleton.vue'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { 
  adminAnalyticsApiService, 
  type AnalyticsPeriod, 
  type AdminAnalyticsDashboardData 
} from '~/services/adminAnalyticsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'لوحة التحكم الرئيسية | أسوار جدة'
})

const { getAdminToken } = useAdminAuth()

const loading = ref<boolean>(true)
const isInitialLoaded = ref<boolean>(false)
const errorMessage = ref<string>('')
const activePeriod = ref<AnalyticsPeriod>('this_month')

const dashboardData = ref<AdminAnalyticsDashboardData>(adminAnalyticsApiService.getEmptyDashboardData())

const currentDate = new Intl.DateTimeFormat('ar-SA', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}).format(new Date())

const currencySymbol = computed(() => {
  return dashboardData.value.summary.currency_symbol || dashboardData.value.summary.currency || 'ر.س'
})

const periodGrowthLabel = computed(() => {
  if (activePeriod.value === 'today') return 'مقارنة بالأمس'
  if (activePeriod.value === 'this_week') return 'مقارنة بالأسبوع الماضي'
  return 'مقارنة بالشهر الماضي'
})

const handlePeriodChange = async (period: AnalyticsPeriod) => {
  if (activePeriod.value === period && isInitialLoaded.value) return
  activePeriod.value = period
  await loadDashboard()
}

const loadDashboard = async () => {
  const token = getAdminToken() || (process.client ? localStorage.getItem('admin_token') : null)
  if (!token) {
    loading.value = false
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    const res = await adminAnalyticsApiService.fetchDashboardAnalytics(token, activePeriod.value)
    if (res.success && res.data) {
      dashboardData.value = res.data
    } else {
      errorMessage.value = res.message || 'تعذر جلب إحصائيات المتجر.'
    }
  } catch (err: any) {
    console.error('[Dashboard] Error loading dashboard:', err)
    errorMessage.value = err?.message || 'حدث خطأ أثناء تحديث بيانات لوحة التحكم.'
  } finally {
    loading.value = false
    isInitialLoaded.value = true
  }
}

onMounted(async () => {
  await loadDashboard()
})
</script>
