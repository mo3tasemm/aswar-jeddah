<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة الكوبونات</h1>
        <p class="text-sm text-slate-500 mt-1">قم بإنشاء وإدارة كوبونات الخصم والعروض الترويجية.</p>
      </div>
      
      <NuxtLink to="/admin/coupons/create" class="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-bold hover:bg-indigo-700 transition-colors shadow-sm gap-2">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        إضافة كوبون جديد
      </NuxtLink>
    </div>

    <!-- Filters & Search Toolbar -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <BaseInput 
        v-model="searchQuery" 
        placeholder="ابحث بكود الكوبون..." 
        class="w-full md:w-80"
      >
        <template #icon>
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </BaseInput>

      <BaseSelect 
        v-model="statusFilter"
        :options="statusOptions"
        class="w-full md:w-56"
      />
    </div>

    <!-- Coupons Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">كود الكوبون</th>
              <th class="px-6 py-4">قيمة الخصم</th>
              <th class="px-6 py-4">الاستخدام</th>
              <th class="px-6 py-4">تاريخ الانتهاء</th>
              <th class="px-6 py-4">الحالة</th>
              <th class="px-6 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-if="filteredCoupons.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-slate-500 font-bold">
                لم يتم العثور على أي كوبونات.
              </td>
            </tr>
            <tr v-for="coupon in filteredCoupons" :key="coupon.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-black text-slate-800 tracking-wider font-mono">{{ coupon.code }}</span>
                    <span class="text-xs text-slate-500 mt-1" v-if="coupon.minOrder > 0">حد أدنى: {{ coupon.minOrder }} ر.س</span>
                    <span class="text-xs text-slate-500 mt-1" v-else>بدون حد أدنى</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4">
                <span class="font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {{ coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `${coupon.discountValue} ر.س` }}
                </span>
              </td>
              <td class="px-6 py-4 text-slate-600">
                <div class="flex items-center gap-2">
                  <div class="w-full h-1.5 bg-slate-100 rounded-full max-w-[80px] overflow-hidden">
                    <div 
                      class="h-full bg-indigo-500" 
                      :style="{ width: coupon.usageLimit ? `${(coupon.timesUsed / coupon.usageLimit) * 100}%` : '0%' }"
                    ></div>
                  </div>
                  <span class="text-xs font-bold font-mono">
                    {{ coupon.timesUsed }} / {{ coupon.usageLimit || '∞' }}
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 font-bold" :class="{'text-red-500': isExpired(coupon.expiryDate)}">
                {{ coupon.expiryDate }}
              </td>
              <td class="px-6 py-4">
                <span v-if="isExpired(coupon.expiryDate)" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 bg-red-500"></span>
                  منتهي
                </span>
                <span v-else-if="coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 bg-slate-400"></span>
                  مستنفد
                </span>
                <span v-else-if="coupon.isActive" class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 bg-emerald-500"></span>
                  نشط
                </span>
                <span v-else class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600">
                  <span class="w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 bg-amber-500"></span>
                  معطل
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                  <NuxtLink :to="`/admin/coupons/${coupon.id}`" class="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="تعديل الكوبون">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </NuxtLink>
                  <button class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف الكوبون">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
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
const statusFilter = ref('')

const statusOptions = [
  { value: '', label: 'جميع الحالات' },
  { value: 'active', label: 'نشط' },
  { value: 'expired', label: 'منتهي الصلاحية' },
  { value: 'depleted', label: 'مستنفد' },
]

// Mock Data
const coupons = ref([
  { id: '1', code: 'SUMMER2026', discountType: 'percentage', discountValue: 20, minOrder: 500, timesUsed: 45, usageLimit: 100, expiryDate: '2026-08-31', isActive: true },
  { id: '2', code: 'WELCOME50', discountType: 'fixed', discountValue: 50, minOrder: 200, timesUsed: 120, usageLimit: null, expiryDate: '2026-12-31', isActive: true },
  { id: '3', code: 'FLASH_SALE', discountType: 'percentage', discountValue: 50, minOrder: 0, timesUsed: 50, usageLimit: 50, expiryDate: '2026-08-01', isActive: true },
  { id: '4', code: 'EID_MUBARAK', discountType: 'fixed', discountValue: 100, minOrder: 1000, timesUsed: 15, usageLimit: 200, expiryDate: '2026-03-20', isActive: true }, // Past date
])

const isExpired = (dateString: string) => {
  return new Date(dateString).getTime() < new Date().getTime()
}

const getStatus = (coupon: any) => {
  if (isExpired(coupon.expiryDate)) return 'expired'
  if (coupon.usageLimit && coupon.timesUsed >= coupon.usageLimit) return 'depleted'
  if (coupon.isActive) return 'active'
  return 'inactive'
}

const filteredCoupons = computed(() => {
  let result = coupons.value

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(c => c.code.toLowerCase().includes(q))
  }

  if (statusFilter.value) {
    result = result.filter(c => getStatus(c) === statusFilter.value)
  }

  return result
})
</script>
