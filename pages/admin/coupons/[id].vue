<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoadingDetails" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
      <svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-xs font-bold">{{ t('admin.common.loading') }}</span>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="!currentCoupon && !isLoadingDetails" class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100">
      <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h2 class="text-xl font-black text-slate-800">تعذر العثور على بيانات الكوبون</h2>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">تأكد من صحة معرف الكوبون أو حاول العودة إلى قائمة الكوبونات.</p>
      <NuxtLink to="/admin/coupons" class="inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
        العودة لقائمة الكوبونات
      </NuxtLink>
    </div>

    <!-- Coupon Edit Form -->
    <div v-else-if="currentCoupon">
      <CouponForm 
        :initial-data="currentCoupon" 
        :is-edit="true" 
        :coupon-id="currentCoupon.id" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CouponForm from '~/components/dashboard/CouponForm.vue'
import { useAdminCoupons } from '~/composables/useAdminCoupons'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { t } = useAdminLanguage()

useHead({
  title: computed(() => `تعديل الكوبون | ${t('admin.sidebar.panel_title')}`)
})

const {
  currentCoupon,
  isLoadingDetails,
  fetchCouponDetails
} = useAdminCoupons()

onMounted(async () => {
  const couponId = route.params.id as string
  if (couponId) {
    await fetchCouponDetails(couponId)
  }
})
</script>
