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
          @click="activePeriod = period.value"
          class="px-4 py-1.5 rounded-md text-sm font-bold transition-all"
          :class="activePeriod === period.value ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'"
        >
          {{ period.label }}
        </button>
      </div>
    </div>

    <!-- Chart Area -->
    <div class="flex-1 relative w-full h-full min-h-0">
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
import { ref, computed } from 'vue'
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

const periods = [
  { label: 'شهري', value: 'monthly' },
  { label: 'أسبوعي', value: 'weekly' },
  { label: 'يومي', value: 'daily' }
]

const activePeriod = ref('monthly')

// Dummy Data Generators
const getLabels = (period: string) => {
  if (period === 'monthly') return ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو']
  if (period === 'weekly') return ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4']
  return ['السبت', 'الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
}

const getData = (period: string) => {
  if (period === 'monthly') return [65000, 59000, 80000, 81000, 56000, 95000, 110000]
  if (period === 'weekly') return [25000, 32000, 28000, 45000]
  return [5000, 4000, 6000, 8000, 7500, 12000, 15000]
}

const chartData = computed(() => {
  return {
    labels: getLabels(activePeriod.value),
    datasets: [
      {
        label: 'إجمالي المبيعات (ر.س)',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        borderColor: '#4f46e5',
        borderWidth: 3,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#4f46e5',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.4,
        data: getData(activePeriod.value)
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#0B0E28',
      titleFont: { family: 'Tajawal', size: 14, weight: 'bold' },
      bodyFont: { family: 'Tajawal', size: 13 },
      padding: 12,
      displayColors: false,
      rtl: true,
      textDirection: 'rtl'
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
        color: '#94a3b8',
        font: { family: 'Tajawal', size: 12 },
        callback: function(value: any) {
          if (value >= 1000) return value / 1000 + 'k'
          return value
        }
      }
    },
    x: {
      grid: {
        display: false,
        drawBorder: false
      },
      ticks: {
        color: '#64748b',
        font: { family: 'Tajawal', size: 12, weight: 'bold' }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}
</script>
