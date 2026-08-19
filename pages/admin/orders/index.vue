<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-slate-900">{{ t('admin.orders.title') }}</h1>
          <span v-if="!isLoading" class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
            {{ totalOrders }} {{ t('admin.orders.order_number') || 'طلب' }}
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ t('admin.orders.subtitle') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          @click="loadOrders(currentPage)"
          :disabled="isLoading"
          class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ t('admin.common.refresh') }}</span>
        </button>
      </div>
    </div>

    <!-- Quick Status Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="pill in statusPills"
        :key="pill.value"
        @click="handleStatusFilterChange(pill.value)"
        class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border"
        :class="orderStatusFilter === pill.value 
          ? 'bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-sm' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
      >
        <span>{{ pill.label }}</span>
      </button>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:flex-1">
        <BaseInput 
          v-model="searchQuery" 
          :placeholder="t('admin.common.search_placeholder') + ' (رقم الطلب أو اسم العميل أو الهاتف)...'" 
          @input="handleSearchInput"
        >
          <template #icon>
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </BaseInput>
      </div>

      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
        <!-- Order Status Dropdown -->
        <div class="w-full sm:w-48">
          <label class="block text-[11px] font-black text-slate-500 mb-1">{{ t('admin.orders.order_status') }}</label>
          <select
            v-model="orderStatusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
          >
            <option v-for="opt in orderStatusOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <!-- Payment Status Dropdown -->
        <div class="w-full sm:w-44">
          <label class="block text-[11px] font-black text-slate-500 mb-1">{{ t('admin.orders.payment_status') }}</label>
          <select
            v-model="paymentStatusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
          >
            <option v-for="opt in paymentStatusOptions" :key="opt.value" :value="opt.value">
              {{ opt.label }}
            </option>
          </select>
        </div>

        <!-- Reset Button -->
        <div v-if="orderStatusFilter !== 'all' || paymentStatusFilter !== 'all' || searchQuery" class="self-end pb-0.5">
          <button
            @click="resetFilters"
            class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="إعادة تعيين الفلاتر"
          >
            {{ t('admin.common.reset_filter') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ errorMessage }}</span>
      </div>
      <button @click="loadOrders(currentPage)" class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Orders Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">{{ t('admin.common.loading') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!orders || orders.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 class="text-base font-black text-slate-700">{{ t('admin.common.no_data') }}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي طلبات تطابق معايير البحث أو الفلترة المحددة.</p>
        <button 
          v-if="orderStatusFilter !== 'all' || paymentStatusFilter !== 'all' || searchQuery"
          @click="resetFilters" 
          class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          عرض كافة الطلبات
        </button>
      </div>

      <!-- Orders List Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.order_number') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.customer') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.order_date') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.total_amount') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.payment_status') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.orders.order_status') }}</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="order in orders" 
              :key="order.id" 
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Order ID -->
              <td class="px-6 py-4 font-black text-slate-900">
                <NuxtLink 
                  :to="`/admin/orders/${order.id}`"
                  class="text-[#0B0E28] hover:text-amber-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <span class="font-mono text-sm">#{{ order.id }}</span>
                </NuxtLink>
              </td>

              <!-- Customer Info -->
              <td class="px-6 py-4">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-800">{{ order.customer_name || 'عميل غير مسجل' }}</span>
                  <span v-if="order.customer_phone" class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">{{ order.customer_phone }}</span>
                </div>
              </td>

              <!-- Date -->
              <td class="px-6 py-4 text-xs font-bold text-slate-600">
                <div>{{ formatDate(order.created_at) }}</div>
                <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ formatTime(order.created_at) }}</div>
              </td>

              <!-- Total Amount -->
              <td class="px-6 py-4 font-black text-slate-900 text-start">
                <span class="text-sm">{{ formatCurrency(order.order_amount) }}</span>
                <span class="text-[11px] text-slate-400 ms-1">{{ t('admin.common.currency') }}</span>
              </td>

              <!-- Payment Status Dropdown Pill -->
              <td class="px-6 py-4">
                <div class="relative inline-block">
                  <select
                    :value="order.payment_status"
                    @change="onPaymentStatusChange(order.id, $event)"
                    :disabled="isUpdatingPayment"
                    class="appearance-none text-xs font-black rounded-full px-3.5 py-1.5 pe-7 border transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2"
                    :class="getPaymentStatusClass(order.payment_status)"
                    title="تغيير حالة الدفع"
                  >
                    <option value="paid" class="bg-white text-slate-800 font-bold py-1">مدفوع (Paid)</option>
                    <option value="unpaid" class="bg-white text-slate-800 font-bold py-1">غير مدفوع (Unpaid)</option>
                    <option value="refunded" class="bg-white text-slate-800 font-bold py-1">مسترد (Refunded)</option>
                  </select>
                  <div class="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </td>

              <!-- Order Status Dropdown Pill -->
              <td class="px-6 py-4">
                <div class="relative inline-block">
                  <select
                    :value="order.order_status"
                    @change="onOrderStatusChange(order.id, $event)"
                    :disabled="isUpdatingStatus"
                    class="appearance-none text-xs font-black rounded-full px-3.5 py-1.5 pe-7 border transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2"
                    :class="getOrderStatusClass(order.order_status)"
                    title="تغيير حالة الطلب"
                  >
                    <option v-for="st in updateStatusOptions" :key="st.value" :value="st.value" class="bg-white text-slate-800 font-bold py-1">
                      {{ st.label }}
                    </option>
                  </select>
                  <div class="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60">
                    <svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </td>

              <!-- Actions -->
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink 
                    :to="`/admin/orders/${order.id}`" 
                    class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-[#0B0E28] text-slate-700 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    <span>{{ t('admin.common.details') }}</span>
                  </NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="orders && orders.length > 0 && totalOrders > perPage" class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-xs font-bold text-slate-500">
          عرض الصفحة <span class="text-slate-900 font-black">{{ currentPage }}</span> من أصل <span class="text-slate-900 font-black">{{ lastPage }}</span> (إجمالي {{ totalOrders }} طلب)
        </div>

        <div class="flex items-center gap-1.5">
          <button 
            @click="changePage(currentPage - 1)" 
            :disabled="currentPage <= 1 || isLoading"
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            السابق
          </button>

          <button
            v-for="p in visiblePages"
            :key="p"
            @click="changePage(p)"
            class="w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center"
            :class="p === currentPage 
              ? 'bg-[#0B0E28] text-amber-400 shadow-sm' 
              : 'border border-slate-200 text-slate-700 hover:bg-slate-50'"
          >
            {{ p }}
          </button>

          <button 
            @click="changePage(currentPage + 1)" 
            :disabled="currentPage >= lastPage || isLoading"
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'
import { useAdminOrders } from '~/composables/useAdminOrders'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { AdminOrderItem } from '~/services/adminOrdersApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useAdminLanguage()

useHead({
  title: computed(() => `${t('admin.orders.title')} | ${t('admin.sidebar.panel_title')}`)
})

const {
  orders,
  isLoading,
  isUpdatingPayment,
  errorMessage,
  totalOrders,
  currentPage,
  perPage,
  lastPage,
  orderStatusFilter,
  paymentStatusFilter,
  searchQuery,
  fetchOrders,
  updateOrderStatus,
  updatePaymentStatus,
  changePage
} = useAdminOrders()

// Status Pills for quick filter switching
const statusPills = computed(() => [
  { value: 'all', label: 'كافة الطلبات' },
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'confirmed', label: 'تم التأكيد' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'out_for_delivery', label: 'خرج للتوصيل' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'canceled', label: 'ملغي' },
  { value: 'returned', label: 'مرتجع' },
])

// Dropdown filter options
const orderStatusOptions = [
  { value: 'all', label: 'كافة الحالات (الكل)' },
  { value: 'pending', label: 'قيد الانتظار (Pending)' },
  { value: 'confirmed', label: 'تم التأكيد (Confirmed)' },
  { value: 'processing', label: 'قيد التجهيز (Processing)' },
  { value: 'out_for_delivery', label: 'خرج للتوصيل (Out for delivery)' },
  { value: 'delivered', label: 'تم التوصيل (Delivered)' },
  { value: 'canceled', label: 'ملغي (Canceled)' },
  { value: 'returned', label: 'مرتجع (Returned)' },
  { value: 'failed', label: 'فشل التسليم (Failed)' },
]

const paymentStatusOptions = [
  { value: 'all', label: 'كافة حالات الدفع (الكل)' },
  { value: 'paid', label: 'مدفوع (Paid)' },
  { value: 'unpaid', label: 'غير مدفوع (Unpaid)' },
]

// Status options for inline status update
const updateStatusOptions = [
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'confirmed', label: 'تم التأكيد' },
  { value: 'processing', label: 'قيد التجهيز' },
  { value: 'out_for_delivery', label: 'خرج للتوصيل' },
  { value: 'delivered', label: 'تم التوصيل' },
  { value: 'canceled', label: 'ملغي' },
  { value: 'returned', label: 'مرتجع' },
  { value: 'failed', label: 'فاشل' },
]

let searchTimeout: any = null
const handleSearchInput = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchOrders(1)
  }, 400)
}

const handleStatusFilterChange = (status: string) => {
  orderStatusFilter.value = status
  fetchOrders(1)
}

const handleFilterChange = () => {
  fetchOrders(1)
}

const resetFilters = () => {
  orderStatusFilter.value = 'all'
  paymentStatusFilter.value = 'all'
  searchQuery.value = ''
  fetchOrders(1)
}

const loadOrders = (page: number = 1) => {
  fetchOrders(page)
}

const onOrderStatusChange = async (orderId: string | number, event: Event) => {
  const target = event.target as HTMLSelectElement | null
  if (target && target.value) {
    await updateOrderStatus(orderId, target.value)
  }
}

const onPaymentStatusChange = async (orderId: string | number, event: Event) => {
  const target = event.target as HTMLSelectElement | null
  if (target && target.value) {
    await updatePaymentStatus(orderId, target.value)
  }
}

const getOrderStatusClass = (status?: string) => {
  const s = String(status || 'pending').toLowerCase().trim()
  switch (s) {
    case 'pending':
      return 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/70 focus:ring-amber-400'
    case 'confirmed':
      return 'bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100/70 focus:ring-sky-400'
    case 'processing':
      return 'bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100/70 focus:ring-blue-400'
    case 'out_for_delivery':
    case 'shipped':
      return 'bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100/70 focus:ring-indigo-400'
    case 'delivered':
    case 'completed':
      return 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70 focus:ring-emerald-400'
    case 'canceled':
    case 'cancelled':
    case 'failed':
      return 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100/70 focus:ring-rose-400'
    case 'returned':
      return 'bg-orange-50 text-orange-800 border-orange-300 hover:bg-orange-100/70 focus:ring-orange-400'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 focus:ring-slate-400'
  }
}

const getPaymentStatusClass = (status?: string) => {
  const s = String(status || 'unpaid').toLowerCase().trim()
  switch (s) {
    case 'paid':
      return 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70 focus:ring-emerald-400'
    case 'unpaid':
      return 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/70 focus:ring-amber-400'
    case 'refunded':
      return 'bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100/70 focus:ring-purple-400'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 focus:ring-slate-400'
  }
}

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxButtons = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2))
  let end = Math.min(lastPage.value, start + maxButtons - 1)

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-'
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return String(dateStr).split('T')[0] || dateStr
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(dateStr)
  }
}

const formatTime = (dateStr?: string) => {
  if (!dateStr) return ''
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

const formatCurrency = (val: any) => {
  const num = Number(val || 0)
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(() => {
  loadOrders(1)
})
</script>
