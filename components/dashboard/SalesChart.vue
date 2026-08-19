<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[400px]">
    <!-- Header & Controls -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h3 class="font-black text-slate-800 text-lg">تحليلات المبيعات</h3>
        <p class="text-sm text-slate-400 font-medium">مراقبة الأداء والإيرادات بمرور الوقت</p>
      </div>

      <!-- Time Toggles -->
      <div class="flex bg-slate-50 p-1 rounded-lg border border-slate-100">
        <button 
          v-for="period in periods" 
          :key="period.value"
          @click="selectPeriod(period.value)"
          :disabled="loading"
          class="px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50"
          :class="currentActivePeriod === period.value ? 'bg-[#0B0E28] text-amber-400 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="flex-1 relative w-full h-full min-h-0 flex items-center justify-center">
      <div v-if="loading" class="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10">
        <div class="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <Line
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
        class="w-full h-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'
import type { AnalyticsPeriod } from '~/services/adminAnalyticsApiService'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface Props {
  labels?: string[]
  sales?: number[]
  period?: AnalyticsPeriod
  loading?: boolean
  currencySymbol?: string
}

const props = withDefaults(defineProps<Props>(), {
  labels: () => [],
  sales: () => [],
  period: 'this_month',
  loading: false,
  currencySymbol: 'ر.س'
})

const emit = defineEmits<{
  (e: 'update:period', val: AnalyticsPeriod): void
  (e: 'change-period', val: AnalyticsPeriod): void
}>()

const periods = [
  { label: 'شهري', value: 'this_month' as AnalyticsPeriod },
  { label: 'أسبوعي', value: 'this_week' as AnalyticsPeriod },
  { label: 'يومي', value: 'today' as AnalyticsPeriod }
]

const internalPeriod = ref<AnalyticsPeriod>(props.period || 'this_month')

watch(() => props.period, (newVal) => {
  if (newVal) internalPeriod.value = newVal
})

const currentActivePeriod = computed(() => props.period || internalPeriod.value)

const selectPeriod = (val: AnalyticsPeriod) => {
  internalPeriod.value = val
  emit('update:period', val)
  emit('change-period', val)
}

const chartData = computed(() => {
  const customLabels = props.labels && props.labels.length > 0 
    ? props.labels 
    : (currentActivePeriod.value === 'today' ? ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'] : ['1', '5', '10', '15', '20', '25', '30'])
  
  const customSales = props.sales && props.sales.length > 0 
    ? props.sales 
    : [0, 0, 0, 0, 0, 0, 0]

  return {
    labels: customLabels,
    datasets: [
      {
        label: `إجمالي المبيعات (${props.currencySymbol})`,
        backgroundColor: 'rgba(99, 102, 241, 0.12)',
        borderColor: '#4f46e5',
        borderWidth: 2.5,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4f46e5',
        pointBorderWidth: 2,
        pointRadius: 3.5,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.35,
        data: customSales
      }
    ]
  }
})

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#0B0E28',
      titleFont: { family: 'Tajawal', size: 13, weight: 'bold' },
      bodyFont: { family: 'Tajawal', size: 12 },
      padding: 10,
      displayColors: false,
      rtl: true,
      textDirection: 'rtl',
      callbacks: {
        label: (ctx: any) => `${ctx.dataset.label}: ${Number(ctx.raw).toLocaleString()} ${props.currencySymbol}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f1f5f9'
      },
      ticks: {
        color: '#94a3b8',
        font: { family: 'Tajawal', size: 11 },
        callback: function(value: any) {
          if (value >= 1000) return (value / 1000).toFixed(0) + 'k'
          return value
        }
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        color: '#64748b',
        font: { family: 'Tajawal', size: 11, weight: 'bold' }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index' as const,
  }
}))
</script>
