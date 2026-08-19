<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoadingDetails" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
      <svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-sm font-bold">{{ t('admin.common.loading') }}</span>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="!currentCustomer && !isLoadingDetails" class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100">
      <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h2 class="text-xl font-black text-slate-800">تعذر العثور على بيانات العميل</h2>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">تأكد من صحة رقم العميل أو حاول العودة إلى قائمة العملاء.</p>
      <NuxtLink to="/admin/customers" class="inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
        العودة لقائمة العملاء
      </NuxtLink>
    </div>

    <!-- Main Customer View -->
    <div v-else-if="currentCustomer" class="space-y-6">
      
      <!-- Top Action Bar -->
      <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/admin/customers" 
            class="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer"
            title="العودة"
          >
            <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>

          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-2xl font-black text-slate-900">{{ currentCustomer.name }}</h1>
              <span class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full font-mono">
                #{{ currentCustomer.id }}
              </span>
              <span 
                class="px-3 py-1 rounded-full text-xs font-black border"
                :class="currentCustomer.is_active ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-rose-50 text-rose-800 border-rose-300'"
              >
                {{ currentCustomer.is_active ? 'حساب نشط' : 'حساب محظور' }}
              </span>
            </div>
            <p class="text-xs text-slate-400 font-medium mt-1">
              تاريخ التسجيل: {{ formatDate(currentCustomer.created_at) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <!-- Toggle Status Button -->
          <button
            @click="handleStatusToggle"
            :disabled="isUpdatingStatus"
            class="w-full sm:w-auto px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
            :class="currentCustomer.is_active 
              ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
              : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'"
          >
            <span v-if="isUpdatingStatus">جاري التحديث...</span>
            <span v-else>{{ currentCustomer.is_active ? 'حظر الحساب' : 'تفعيل الحساب' }}</span>
          </button>
        </div>
      </div>

      <!-- Main Grid Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left / Sidebar Column: Profile Card & Wallet (1 col) -->
        <div class="space-y-6">
          
          <!-- Profile Details Card -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center flex flex-col items-center">
            <!-- Avatar -->
            <img 
              v-if="currentCustomer.image_url"
              :src="currentCustomer.image_url"
              :alt="currentCustomer.name"
              class="w-24 h-24 rounded-full object-cover border-4 border-amber-400/20 shadow-md mb-4 bg-slate-100"
              @error="handleAvatarError"
            />
            <div 
              v-else
              class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-700 text-amber-400 flex items-center justify-center font-black text-3xl shadow-md mb-4"
            >
              {{ getInitials(currentCustomer.name) }}
            </div>

            <h2 class="text-lg font-black text-slate-900">{{ currentCustomer.name }}</h2>
            <p class="text-xs text-slate-400 font-medium mt-0.5">عضو مسجل منذ {{ formatDate(currentCustomer.created_at) }}</p>

            <div class="w-full h-px bg-slate-100 my-5"></div>

            <!-- Contact List -->
            <div class="w-full space-y-3.5 text-start text-xs">
              <!-- Email -->
              <div class="flex items-center gap-3 text-slate-700">
                <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-400 font-bold">البريد الإلكتروني:</span>
                  <span class="font-bold font-mono">{{ currentCustomer.email || 'غير مسجل' }}</span>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-center gap-3 text-slate-700">
                <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-400 font-bold">رقم الهاتف:</span>
                  <a v-if="currentCustomer.phone" :href="`tel:${currentCustomer.phone}`" class="font-bold font-mono text-amber-600" dir="ltr">
                    {{ currentCustomer.phone }}
                  </a>
                  <span v-else class="font-bold text-slate-400">غير مسجل</span>
                </div>
              </div>

              <!-- City / Location -->
              <div class="flex items-center gap-3 text-slate-700">
                <div class="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100 text-slate-400">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div class="flex flex-col">
                  <span class="text-[10px] text-slate-400 font-bold">المدينة / المنطقة:</span>
                  <span class="font-bold">{{ currentCustomer.city || 'غير محددة' }}</span>
                </div>
              </div>
            </div>

            <!-- Wallet & Loyalty Balance Cards -->
            <div class="w-full grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100">
              <div class="p-3 bg-amber-50/70 rounded-2xl border border-amber-100 text-center">
                <span class="text-[10px] font-black text-amber-800 block mb-0.5">رصيد المحفظة</span>
                <span class="text-sm font-black text-amber-900 font-mono">
                  {{ formatCurrency(currentCustomer.wallet_balance) }} <span class="text-[10px] font-sans">ر.س</span>
                </span>
              </div>

              <div class="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100 text-center">
                <span class="text-[10px] font-black text-indigo-800 block mb-0.5">نقاط الولاء</span>
                <span class="text-sm font-black text-indigo-900 font-mono">
                  {{ currentCustomer.loyalty_point }} <span class="text-[10px] font-sans">نقطة</span>
                </span>
              </div>
            </div>
          </div>

          <!-- Customer Addresses List -->
          <div class="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 space-y-3">
            <h3 class="text-xs font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span>عناوين الشحن المسجلة ({{ currentCustomerAddresses.length }})</span>
            </h3>

            <div v-if="currentCustomerAddresses.length === 0" class="text-xs text-slate-400 font-medium py-3 text-center">
              لا توجد عناوين شحن إضافية مسجلة.
            </div>

            <div v-else class="space-y-2.5">
              <div 
                v-for="addr in currentCustomerAddresses" 
                :key="addr.id"
                class="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 space-y-1 text-xs"
              >
                <div class="flex justify-between items-center font-bold">
                  <span class="text-slate-800 font-black">{{ addr.contact_person_name || currentCustomer.name }}</span>
                  <span class="px-2 py-0.5 bg-white text-slate-600 rounded-md border text-[10px]">
                    {{ addr.address_type || 'عنوان رئيسي' }}
                  </span>
                </div>
                <div class="text-slate-600 font-medium">
                  <span v-if="addr.city">{{ addr.city }} - </span>
                  <span>{{ addr.address }}</span>
                </div>
                <div v-if="addr.phone" class="font-mono text-slate-400 text-[11px]" dir="ltr">
                  {{ addr.phone }}
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Right / Main Column: Stats & Orders History (2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Statistics Cards Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <!-- Total Orders -->
            <div class="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100 text-center space-y-1">
              <div class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <span class="text-[11px] font-bold text-slate-400 block">إجمالي الطلبات</span>
              <span class="text-xl font-black text-slate-900 block font-mono">{{ currentCustomerStats.total_orders }}</span>
            </div>

            <!-- Completed Orders -->
            <div class="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100 text-center space-y-1">
              <div class="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span class="text-[11px] font-bold text-slate-400 block">الطلبات المكتملة</span>
              <span class="text-xl font-black text-emerald-600 block font-mono">{{ currentCustomerStats.completed_orders }}</span>
            </div>

            <!-- Processing Orders -->
            <div class="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100 text-center space-y-1">
              <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span class="text-[11px] font-bold text-slate-400 block">قيد التجهيز</span>
              <span class="text-xl font-black text-amber-600 block font-mono">{{ currentCustomerStats.processing_orders }}</span>
            </div>

            <!-- Total Spent -->
            <div class="bg-white p-4 sm:p-5 rounded-3xl shadow-sm border border-slate-100 text-center space-y-1">
              <div class="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-2">
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <span class="text-[11px] font-bold text-slate-400 block">إجمالي المدفوعات</span>
              <span class="text-lg font-black text-purple-700 block font-mono">{{ formatCurrency(currentCustomerStats.total_spent) }} <span class="text-[10px] font-sans">ر.س</span></span>
            </div>
          </div>

          <!-- Customer Orders History Table -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>سجل طلبات العميل ({{ currentCustomerOrders.length }})</span>
              </h3>
            </div>

            <div v-if="currentCustomerOrders.length === 0" class="p-12 text-center text-slate-400 space-y-2">
              <svg class="w-8 h-8 mx-auto text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p class="text-xs font-bold">لا توجد طلبات سابقة مسجلة لهذا العميل حتى الآن.</p>
            </div>

            <div v-else class="overflow-x-auto w-full">
              <table class="w-full text-start text-sm whitespace-nowrap">
                <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-xs">
                  <tr>
                    <th class="px-6 py-3.5 text-start">رقم الطلب</th>
                    <th class="px-6 py-3.5 text-start">تاريخ الطلب</th>
                    <th class="px-6 py-3.5 text-start">طريقة الدفع</th>
                    <th class="px-6 py-3.5 text-start">المبلغ الإجمالي</th>
                    <th class="px-6 py-3.5 text-start">حالة الطلب</th>
                    <th class="px-6 py-3.5 text-center">الإجراء</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="order in currentCustomerOrders" :key="order.id" class="hover:bg-slate-50/60 transition-colors">
                    <!-- Order ID -->
                    <td class="px-6 py-4 font-mono font-black text-slate-900 text-xs">
                      <NuxtLink :to="`/admin/orders/${order.id}`" class="hover:text-amber-600 transition-colors">
                        #{{ order.id }}
                      </NuxtLink>
                    </td>

                    <!-- Date -->
                    <td class="px-6 py-4 text-xs font-bold text-slate-600">
                      {{ formatDate(order.created_at) }}
                    </td>

                    <!-- Payment Method -->
                    <td class="px-6 py-4 text-xs font-bold text-slate-600">
                      {{ formatPaymentMethod(order.payment_method) }}
                    </td>

                    <!-- Total Amount -->
                    <td class="px-6 py-4 font-black text-slate-900 text-xs font-mono">
                      {{ formatCurrency(order.order_amount) }} ر.س
                    </td>

                    <!-- Order Status -->
                    <td class="px-6 py-4">
                      <span 
                        class="px-3 py-1 rounded-full text-xs font-black border"
                        :class="getOrderStatusBadgeClass(order.order_status)"
                      >
                        {{ getOrderStatusLabel(order.order_status) }}
                      </span>
                    </td>

                    <!-- Action Link -->
                    <td class="px-6 py-4 text-center">
                      <NuxtLink 
                        :to="`/admin/orders/${order.id}`"
                        class="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-[#0B0E28] text-slate-700 text-xs font-black transition-all inline-flex items-center gap-1 cursor-pointer shadow-2xs"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                        <span>عرض الطلب</span>
                      </NuxtLink>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useAdminCustomers } from '~/composables/useAdminCustomers'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { t } = useAdminLanguage()

const {
  currentCustomer,
  currentCustomerOrders,
  currentCustomerAddresses,
  currentCustomerStats,
  isLoadingDetails,
  isUpdatingStatus,
  fetchCustomerDetails,
  toggleCustomerStatus
} = useAdminCustomers()

const handleStatusToggle = async () => {
  if (!currentCustomer.value) return
  await toggleCustomerStatus(currentCustomer.value)
}

const getInitials = (name?: string) => {
  if (!name) return 'ع'
  return name.trim().charAt(0).toUpperCase()
}

const handleAvatarError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.style.display = 'none'
  }
}

const formatPaymentMethod = (method?: string) => {
  if (!method) return 'دفع إلكتروني'
  if (method === 'cash_on_delivery' || method === 'cod') return 'الدفع عند الاستلام'
  if (method === 'card' || method === 'credit_card') return 'بطاقة ائتمان / مدى'
  return method
}

const getOrderStatusLabel = (status?: string) => {
  const s = String(status || 'pending').toLowerCase().trim()
  const map: Record<string, string> = {
    pending: 'قيد الانتظار',
    confirmed: 'تم التأكيد',
    processing: 'قيد التجهيز',
    out_for_delivery: 'خرج للتوصيل',
    delivered: 'تم التوصيل',
    completed: 'مكتمل',
    canceled: 'ملغي',
    cancelled: 'ملغي',
    returned: 'مرتجع',
    failed: 'فشل التسليم'
  }
  return map[s] || status || 'قيد الانتظار'
}

const getOrderStatusBadgeClass = (status?: string) => {
  const s = String(status || 'pending').toLowerCase().trim()
  switch (s) {
    case 'pending':
      return 'bg-amber-50 text-amber-800 border-amber-300'
    case 'confirmed':
      return 'bg-sky-50 text-sky-800 border-sky-300'
    case 'processing':
      return 'bg-blue-50 text-blue-800 border-blue-300'
    case 'out_for_delivery':
      return 'bg-indigo-50 text-indigo-800 border-indigo-300'
    case 'delivered':
    case 'completed':
      return 'bg-emerald-50 text-emerald-800 border-emerald-300'
    case 'canceled':
    case 'cancelled':
    case 'failed':
      return 'bg-rose-50 text-rose-800 border-rose-300'
    case 'returned':
      return 'bg-orange-50 text-orange-800 border-orange-300'
    default:
      return 'bg-slate-50 text-slate-700 border-slate-300'
  }
}

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

const formatCurrency = (val: any) => {
  const num = Number(val || 0)
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(async () => {
  const customerId = route.params.id as string
  if (customerId) {
    await fetchCustomerDetails(customerId)
  }
})
</script>
