<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-black text-slate-900">{{ t('admin.coupons.title') }}</h1>
          <span v-if="!isLoading" class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full font-mono">
            {{ totalCoupons }} كوبون
          </span>
        </div>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ t('admin.coupons.subtitle') }}
        </p>
      </div>
      
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          @click="loadCoupons(currentPage)"
          :disabled="isLoading"
          class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          title="تحديث البيانات"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ t('admin.common.refresh') }}</span>
        </button>

        <NuxtLink 
          to="/admin/coupons/create" 
          class="w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs transition-all shadow-md gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>{{ t('admin.coupons.add_coupon') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:flex-1">
        <BaseInput 
          v-model="searchQuery" 
          :placeholder="t('admin.common.search_placeholder') + ' (كود الكوبون أو العنوان)...'" 
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
        <!-- Status Filter -->
        <div class="w-full sm:w-48">
          <label class="block text-[11px] font-black text-slate-500 mb-1">حالة الكوبون</label>
          <select
            v-model="statusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="">كافة الحالات (الكل)</option>
            <option value="1">كوبونات نشطة (Active)</option>
            <option value="0">كوبونات معطلة (Inactive)</option>
            <option value="expired">كوبونات منتهية الصلاحية (Expired)</option>
          </select>
        </div>

        <!-- Type Filter -->
        <div class="w-full sm:w-48">
          <label class="block text-[11px] font-black text-slate-500 mb-1">نوع الكوبون</label>
          <select
            v-model="typeFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="all">كافة الأنواع</option>
            <option value="discount_on_purchase">خصم على المشتريات</option>
            <option value="free_delivery">توصيل مجاني</option>
            <option value="first_order">خصم أول طلب</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div v-if="statusFilter !== '' || typeFilter !== 'all' || searchQuery" class="self-end pb-0.5">
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
      <button @click="loadCoupons(currentPage)" class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Coupons Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoading" class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">{{ t('admin.common.loading') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!coupons || coupons.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <h3 class="text-base font-black text-slate-700">{{ t('admin.common.no_data') }}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي كوبونات تطابق معايير البحث.</p>
        <NuxtLink 
          to="/admin/coupons/create" 
          class="inline-block px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          {{ t('admin.coupons.add_coupon') }}
        </NuxtLink>
      </div>

      <!-- Coupons Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.coupons.coupon_code') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.coupons.discount_value') }}</th>
              <th class="px-6 py-4 font-bold text-start">فترة الصلاحية</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.coupons.usage_count') }}</th>
              <th class="px-6 py-4 font-bold text-center">حالة الكوبون</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="coupon in coupons" 
              :key="coupon.id" 
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Code & Title -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="px-3.5 py-1.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/80 font-mono font-black text-amber-900 tracking-wider text-xs flex items-center gap-1.5 shadow-2xs">
                    <span>{{ coupon.code }}</span>
                    <button 
                      @click="copyCode(coupon.code)" 
                      class="text-amber-700 hover:text-amber-900 cursor-pointer"
                      title="نسخ الكود"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-black text-slate-900 text-xs">{{ coupon.title }}</span>
                    <span class="text-[11px] text-slate-400 font-bold mt-0.5">
                      {{ getCouponTypeLabel(coupon.coupon_type) }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Discount Value -->
              <td class="px-6 py-4 text-start">
                <div class="font-black text-slate-900 text-sm font-mono">
                  <span v-if="coupon.coupon_type === 'free_delivery'" class="text-emerald-700 font-sans text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                    توصيل مجاني
                  </span>
                  <span v-else-if="coupon.discount_type === 'percent' || coupon.discount_type === 'percentage'" class="text-amber-700">
                    {{ coupon.discount }}%
                    <span v-if="coupon.max_discount > 0" class="text-[10px] text-slate-400 font-normal block">
                      (حد أقصى {{ coupon.max_discount }} ر.س)
                    </span>
                  </span>
                  <span v-else class="text-slate-800">
                    {{ coupon.discount }} <span class="text-xs text-slate-400 font-bold font-sans">ر.س</span>
                  </span>
                </div>
                <div v-if="coupon.min_purchase > 0" class="text-[10px] text-slate-400 font-medium mt-0.5">
                  الحد الأدنى: {{ coupon.min_purchase }} ر.س
                </div>
              </td>

              <!-- Validity Range with Prominent Badges -->
              <td class="px-6 py-4 text-xs font-bold">
                <div class="text-slate-700 font-mono">
                  {{ coupon.start_date || '-' }} <span class="text-slate-400">إلى</span> {{ coupon.expire_date || '-' }}
                </div>
                <div class="mt-1.5">
                  <!-- Expired Red Badge -->
                  <div 
                    v-if="isExpired(coupon)" 
                    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-300 rounded-md text-[11px] font-black shadow-2xs"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                    <span>منتهي الصلاحية (Expired)</span>
                  </div>

                  <!-- Valid Green Badge -->
                  <div 
                    v-else 
                    class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-md text-[11px] font-black shadow-2xs"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>ساري المفعول (Valid)</span>
                  </div>
                </div>
              </td>

              <!-- Usage Count -->
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black font-mono">
                  {{ coupon.order_count || 0 }} / {{ coupon.limit > 0 ? coupon.limit : '∞' }}
                </span>
              </td>

              <!-- Live Status Toggle Switch & Clear Text -->
              <td class="px-6 py-4 text-center">
                <div class="flex flex-col items-center justify-center gap-1">
                  <div 
                    :title="isExpired(coupon) ? 'الكوبون منتهي الصلاحية ويتم تعطيله تلقائياً' : (coupon.status === 1 || coupon.status === true ? 'انقر لتعطيل الكوبون' : 'انقر لتفعيل الكوبون')"
                    :class="isExpired(coupon) ? 'cursor-not-allowed opacity-60' : ''"
                  >
                    <BaseToggle 
                      :model-value="!isExpired(coupon) && (coupon.status === 1 || coupon.status === true)"
                      @update:model-value="handleToggleStatus(coupon)"
                      :disabled="isUpdatingStatus || isExpired(coupon)"
                    />
                  </div>

                  <!-- Explicit Status Label -->
                  <span 
                    class="text-[10px] font-black"
                    :class="{
                      'text-rose-600 font-bold': isExpired(coupon),
                      'text-emerald-700 font-bold': !isExpired(coupon) && (coupon.status === 1 || coupon.status === true),
                      'text-slate-400 font-bold': !isExpired(coupon) && (coupon.status === 0 || coupon.status === false)
                    }"
                  >
                    {{ isExpired(coupon) ? 'منتهي (معطل تلقائياً)' : (coupon.status === 1 || coupon.status === true ? 'نشط (Active)' : 'معطل (Inactive)') }}
                  </span>
                </div>
              </td>

              <!-- Actions (Edit / Delete) -->
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink 
                    :to="`/admin/coupons/${coupon.id}`"
                    class="p-2 text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 rounded-xl transition-all shadow-2xs cursor-pointer" 
                    :title="t('admin.common.edit')"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </NuxtLink>

                  <button 
                    @click="confirmDeleteCoupon(coupon)" 
                    class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer" 
                    :title="t('admin.common.delete')"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Footer -->
      <div v-if="coupons && coupons.length > 0 && totalCoupons > perPage" class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-xs font-bold text-slate-500">
          عرض الصفحة <span class="text-slate-900 font-black">{{ currentPage }}</span> من أصل <span class="text-slate-900 font-black">{{ lastPage }}</span> (إجمالي {{ totalCoupons }} كوبون)
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

    <!-- Delete Confirmation Modal -->
    <div 
      v-if="couponToDelete" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
    >
      <div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center border border-slate-100">
        <div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>

        <h3 class="text-base font-black text-slate-900">تأكيد حذف الكوبون</h3>
        <p class="text-xs text-slate-500">
          هل أنت متأكد من رغبتك في حذف الكوبون <span class="font-mono font-black text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">{{ couponToDelete.code }}</span>؟ لن يتمكن العملاء من استخدامه بعد الحذف.
        </p>

        <div class="flex items-center gap-3 pt-2">
          <button 
            @click="couponToDelete = null" 
            class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            إلغاء
          </button>
          <button 
            @click="handleDelete" 
            :disabled="isDeleting"
            class="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-colors cursor-pointer disabled:opacity-50"
          >
            <span v-if="isDeleting">جاري الحذف...</span>
            <span v-else>تأكيد الحذف</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminCoupons } from '~/composables/useAdminCoupons'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import { useToast } from '~/composables/useToast'
import type { AdminCouponItem } from '~/services/adminCouponsApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useAdminLanguage()
const toast = useToast()

useHead({
  title: computed(() => `${t('admin.coupons.title')} | ${t('admin.sidebar.panel_title')}`)
})

const {
  coupons,
  isLoading,
  isUpdatingStatus,
  isDeleting,
  errorMessage,
  totalCoupons,
  lastPage,
  currentPage,
  perPage,
  searchQuery,
  statusFilter,
  typeFilter,
  fetchCoupons,
  toggleCouponStatus,
  deleteCoupon,
  isExpired,
  changePage
} = useAdminCoupons()

const couponToDelete = ref<AdminCouponItem | null>(null)

let searchTimeout: any = null
const handleSearchInput = () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    fetchCoupons(1)
  }, 400)
}

const handleFilterChange = () => {
  fetchCoupons(1)
}

const resetFilters = () => {
  statusFilter.value = ''
  typeFilter.value = 'all'
  searchQuery.value = ''
  fetchCoupons(1)
}

const loadCoupons = (page: number = 1) => {
  fetchCoupons(page)
}

const handleToggleStatus = async (coupon: AdminCouponItem) => {
  await toggleCouponStatus(coupon)
}

const confirmDeleteCoupon = (coupon: AdminCouponItem) => {
  couponToDelete.value = coupon
}

const handleDelete = async () => {
  if (!couponToDelete.value) return
  const ok = await deleteCoupon(couponToDelete.value.id)
  if (ok) {
    couponToDelete.value = null
  }
}

const copyCode = (code: string) => {
  if (process.client) {
    navigator.clipboard.writeText(code)
    toast.showToast({
      type: 'info',
      title: 'تم النسخ',
      message: `تم نسخ كود الكوبون ${code} إلى الحافظة!`
    })
  }
}

const getCouponTypeLabel = (type?: string): string => {
  const map: Record<string, string> = {
    discount_on_purchase: 'خصم على المشتريات',
    free_delivery: 'توصيل مجاني',
    first_order: 'خصم أول طلب'
  }
  return map[type || ''] || 'خصم عام'
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

onMounted(() => {
  loadCoupons(1)
})
</script>
