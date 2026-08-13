<template>
  <div class="space-y-6">
    <!-- Header & Filters -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800">التقارير والإحصائيات</h1>
        <p class="text-sm text-slate-500 mt-1">نظرة شاملة على أداء المتجر والمبيعات.</p>
      </div>
      
      <!-- Time Range Filter -->
      <div class="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm w-full sm:w-auto">
        <button 
          v-for="range in timeRanges" 
          :key="range.value"
          @click="selectedRange = range.value"
          class="flex-1 sm:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-colors"
          :class="selectedRange === range.value ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50'"
        >
          {{ range.label }}
        </button>
      </div>
    </div>

    <!-- KPIs Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard 
        v-for="stat in kpiStats" 
        :key="stat.title"
        :title="stat.title"
        :value="stat.value"
        :trend="stat.trend"
        :icon="stat.icon"
        :color="stat.color"
      />
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Line Chart: Sales -->
      <div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-black text-slate-800">حركة المبيعات</h3>
          <span class="text-sm font-bold text-slate-500">{{ currentRangeLabel }}</span>
        </div>
        <div class="h-[300px] w-full relative">
          <Line v-if="chartDataReady" :data="salesChartData" :options="salesChartOptions" />
        </div>
      </div>

      <!-- Donut Chart: Order Status -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-black text-slate-800">حالة الطلبات</h3>
        </div>
        <div class="h-[300px] w-full relative flex items-center justify-center">
          <Doughnut v-if="chartDataReady" :data="orderStatusChartData" :options="donutChartOptions" />
        </div>
      </div>
    </div>

    <!-- Top Products Table -->
    <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-lg font-black text-slate-800">المنتجات الأكثر مبيعاً</h3>
        <NuxtLink to="/admin/products" class="text-sm font-bold text-indigo-600 hover:text-indigo-800">
          عرض كل المنتجات &larr;
        </NuxtLink>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-4 py-3">المنتج</th>
              <th class="px-4 py-3">التصنيف</th>
              <th class="px-4 py-3">الكمية المباعة</th>
              <th class="px-4 py-3">إجمالي الإيرادات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-for="product in topProducts" :key="product.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden border border-slate-200">
                    <img :src="product.image" class="w-full h-full object-cover" :alt="product.name">
                  </div>
                  <span class="font-bold text-slate-800">{{ product.name }}</span>
                </div>
              </td>
              <td class="px-4 py-3 text-slate-500">{{ product.category }}</td>
              <td class="px-4 py-3">
                <span class="font-bold text-slate-800">{{ product.soldCount }}</span>
                <span class="text-slate-400 text-xs mr-1">قطعة</span>
              </td>
              <td class="px-4 py-3 font-bold text-emerald-600">{{ product.revenue }} ر.س</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, markRaw } from 'vue'
import StatCard from '~/components/dashboard/StatCard.vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
} from 'chart.js'
import { Line, Doughnut } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  Filler
)

definePageMeta({
  layout: 'dashboard'
})

// Time Range Filter
const timeRanges = [
  { label: 'اليوم', value: 'today' },
  { label: 'الأسبوع', value: 'week' },
  { label: 'الشهر', value: 'month' },
  { label: 'السنة', value: 'year' }
]
const selectedRange = ref('month')

const currentRangeLabel = computed(() => {
  return timeRanges.find(r => r.value === selectedRange.value)?.label || ''
})

// KPI Data
const kpiStats = computed(() => [
  {
    title: 'إجمالي المبيعات',
    value: selectedRange.value === 'month' ? '124,500 ر.س' : '45,200 ر.س',
    trend: { value: 12, isPositive: true },
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>',
    color: 'emerald'
  },
  {
    title: 'إجمالي الطلبات',
    value: selectedRange.value === 'month' ? '342' : '156',
    trend: { value: 8.5, isPositive: true },
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>',
    color: 'indigo'
  },
  {
    title: 'إجمالي الأرباح',
    value: selectedRange.value === 'month' ? '45,800 ر.س' : '12,400 ر.س',
    trend: { value: 5, isPositive: true },
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>',
    color: 'amber'
  },
  {
    title: 'متوسط قيمة الطلب',
    value: '364 ر.س',
    trend: { value: 2.1, isPositive: false },
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>',
    color: 'blue'
  }
])

// Charts Data
const chartDataReady = ref(false)

onMounted(() => {
  // Add a slight delay to ensure client-side rendering for charts
  setTimeout(() => {
    chartDataReady.value = true
  }, 100)
})

// Line Chart Settings (Sales)
const salesChartData = computed(() => {
  // Mock data changing based on filter
  const isMonth = selectedRange.value === 'month'
  return {
    labels: isMonth ? ['1', '5', '10', '15', '20', '25', '30'] : ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة'],
    datasets: [
      {
        label: 'المبيعات (ر.س)',
        data: isMonth ? [12000, 19000, 15000, 25000, 22000, 30000, 28000] : [2000, 4500, 3200, 5000, 4800, 7000, 8500],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4f46e5',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  }
})

const salesChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0B0E28',
      titleFont: { family: 'Tajawal', size: 14 },
      bodyFont: { family: 'Tajawal', size: 13 },
      padding: 12,
      displayColors: false,
      rtl: true,
      textDirection: 'rtl',
      callbacks: {
        label: (context: any) => `${context.parsed.y} ر.س`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f1f5f9',
        drawBorder: false,
      },
      ticks: {
        font: { family: 'Tajawal' },
        color: '#64748b'
      }
    },
    x: {
      grid: { display: false },
      ticks: {
        font: { family: 'Tajawal' },
        color: '#64748b'
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}

// Donut Chart Settings (Order Status)
const orderStatusChartData = computed(() => {
  return {
    labels: ['مكتمل', 'قيد التنفيذ', 'ملغي', 'مسترجع'],
    datasets: [
      {
        data: [65, 20, 10, 5],
        backgroundColor: [
          '#10b981', // Emerald for completed
          '#f59e0b', // Amber for processing
          '#ef4444', // Red for cancelled
          '#64748b'  // Slate for refunded
        ],
        borderWidth: 0,
        hoverOffset: 4
      }
    ]
  }
})

const donutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '75%',
  plugins: {
    legend: {
      position: 'bottom',
      rtl: true,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: { family: 'Tajawal', size: 13, weight: 'bold' },
        color: '#475569'
      }
    },
    tooltip: {
      backgroundColor: '#0B0E28',
      titleFont: { family: 'Tajawal', size: 14 },
      bodyFont: { family: 'Tajawal', size: 13 },
      padding: 12,
      rtl: true,
      textDirection: 'rtl',
      callbacks: {
        label: (context: any) => ` ${context.parsed}%`
      }
    }
  }
}

// Top Products Table Data
const topProducts = ref([
  { id: '1', name: 'ثلاجة ال جي 24 قدم', category: 'الثلاجات', soldCount: 45, revenue: '135,000', image: 'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop' },
  { id: '2', name: 'مكيف جري سبليت 18000 وحدة', category: 'المكيفات', soldCount: 38, revenue: '87,400', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=200&h=200&fit=crop' },
  { id: '3', name: 'غسالة سامسونج اتوماتيك 9 كيلو', category: 'الغسالات', soldCount: 32, revenue: '60,800', image: 'https://images.unsplash.com/photo-1626806787426-5910811b6325?w=200&h=200&fit=crop' },
  { id: '4', name: 'تلفزيون سوني 65 بوصة سمارت', category: 'الشاشات', soldCount: 28, revenue: '98,000', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop' },
  { id: '5', name: 'ميكروويف باناسونيك 25 لتر', category: 'أجهزة المطبخ', soldCount: 25, revenue: '12,500', image: 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=200&h=200&fit=crop' },
])
</script>
