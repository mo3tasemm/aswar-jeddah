<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-slate-900">{{ t('admin.customers.title') }}</h1>
          <span v-if="!isLoading" class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
            {{ totalCustomers }} عميل
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ t('admin.customers.subtitle') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          @click="loadCustomers(currentPage)"
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

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:flex-1">
        <BaseInput 
          v-model="searchQuery" 
          :placeholder="t('admin.common.search_placeholder') + ' (الاسم أو البريد أو الهاتف)...'" 
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
        <!-- Status Filter Dropdown -->
        <div class="w-full sm:w-48">
          <label class="block text-[11px] font-black text-slate-500 mb-1">حالة الحساب</label>
          <select
            v-model="statusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
          >
            <option value="">كافة الحالات (الكل)</option>
            <option value="1">حسابات نشطة (Active)</option>
            <option value="0">حسابات محظورة (Blocked)</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div v-if="statusFilter !== '' || searchQuery" class="self-end pb-0.5">
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
      <button @click="loadCustomers(currentPage)" class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Customers Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">{{ t('admin.common.loading') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!customers || customers.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-base font-black text-slate-700">{{ t('admin.common.no_data') }}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي عملاء يطابقون معايير البحث المحددة.</p>
        <button 
          v-if="statusFilter !== '' || searchQuery"
          @click="resetFilters" 
          class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          عرض كافة العملاء
        </button>
      </div>

      <!-- Customers List Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.customers.customer_details') }}</th>
              <th class="px-6 py-4 font-bold text-start">معلومات الاتصال والمدينة</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.customers.orders_count') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.customers.total_spent') }}</th>
              <th class="px-6 py-4 font-bold text-center">حالة الحساب</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="customer in customers" 
              :key="customer.id" 
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Customer Avatar & Name -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3.5">
                  <img 
                    v-if="customer.image_url"
                    :src="customer.image_url"
                    :alt="customer.name"
                    class="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-2xs"
                    @error="handleAvatarError($event, customer.name)"
                  />
                  <div 
                    v-else
                    class="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-700 text-amber-400 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs"
                  >
                    {{ getInitials(customer.name) }}
                  </div>
                  <div class="flex flex-col">
                    <NuxtLink 
                      :to="`/admin/customers/${customer.id}`"
                      class="font-black text-slate-900 hover:text-amber-600 transition-colors text-xs sm:text-sm cursor-pointer"
                    >
                      {{ customer.name }}
                    </NuxtLink>
                    <span class="text-xs text-slate-400 font-medium mt-0.5 font-mono">
                      {{ customer.email || 'بدون بريد إلكتروني' }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Phone & City -->
              <td class="px-6 py-4 text-xs font-bold text-slate-600">
                <div v-if="customer.phone" class="font-mono text-slate-800" dir="ltr">{{ customer.phone }}</div>
                <div v-else class="text-slate-400">غير محدد</div>
                <div class="text-[11px] text-slate-400 mt-0.5">
                  {{ customer.city || 'المدينة غير محددة' }}
                </div>
              </td>

              <!-- Total Orders Count -->
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black">
                  {{ customer.orders_count }} طلبات
                </span>
              </td>

              <!-- Total Spent -->
              <td class="px-6 py-4 font-black text-slate-900 text-start">
                <span class="text-sm">{{ formatCurrency(customer.total_spent) }}</span>
                <span class="text-[11px] text-slate-400 ms-1">{{ t('admin.common.currency') }}</span>
              </td>

              <!-- Account Status Toggle Pill -->
              <td class="px-6 py-4 text-center">
                <button
                  @click="handleStatusToggle(customer)"
                  :disabled="isUpdatingStatus"
                  class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black border transition-all cursor-pointer shadow-2xs hover:scale-105"
                  :class="customer.is_active 
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100' 
                    : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'"
                  :title="customer.is_active ? 'انقر لحظر الحساب' : 'انقر لتفعيل الحساب'"
                >
                  <span class="w-2 h-2 rounded-full" :class="customer.is_active ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                  <span>{{ customer.is_active ? 'نشط (Active)' : 'محظور (Blocked)' }}</span>
                </button>
              </td>

              <!-- Action Link -->
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink 
                    :to="`/admin/customers/${customer.id}`" 
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
      <div v-if="customers && customers.length > 0 && totalCustomers > perPage" class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-xs font-bold text-slate-500">
          عرض الصفحة <span class="text-slate-900 font-black">{{ currentPage }}</span> من أصل <span class="text-slate-900 font-black">{{ lastPage }}</span> (إجمالي {{ totalCustomers }} عميل)
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
import { computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import { useAdminCustomers } from '~/composables/useAdminCustomers'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { AdminCustomerItem } from '~/services/adminCustomersApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useAdminLanguage()

useHead({
  title: computed(() => `${t('admin.customers.title')} | ${t('admin.sidebar.panel_title')}`)
})

const {
  customers,
  isLoading,
  isUpdatingStatus,
  errorMessage,
  totalCustomers,
  lastPage,
  currentPage,
  perPage,
  searchQuery,
  statusFilter,
  fetchCustomers,
  toggleCustomerStatus,
  changePage
} = useAdminCustomers()

let searchTimeout: any = null
const handleSearchInput = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchCustomers(1)
  }, 400)
}

const handleFilterChange = () => {
  fetchCustomers(1)
}

const resetFilters = () => {
  statusFilter.value = ''
  searchQuery.value = ''
  fetchCustomers(1)
}

const loadCustomers = (page: number = 1) => {
  fetchCustomers(page)
}

const handleStatusToggle = async (customer: AdminCustomerItem) => {
  await toggleCustomerStatus(customer)
}

const getInitials = (name?: string) => {
  if (!name) return 'ع'
  return name.trim().charAt(0).toUpperCase()
}

const handleAvatarError = (event: Event, name?: string) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.style.display = 'none'
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

const formatCurrency = (val: any) => {
  const num = Number(val || 0)
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(() => {
  loadCustomers(1)
})
</script>
