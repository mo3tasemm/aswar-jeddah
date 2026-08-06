<template>
  <div v-if="!isLoading">
    <CouponForm :initial-data="couponData" />
  </div>
  <div v-else class="flex justify-center items-center h-64">
    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CouponForm from '~/components/dashboard/CouponForm.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const isLoading = ref(true)
const couponData = ref(null)

onMounted(async () => {
  // Simulate API Fetch
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock Data (matches the Flash Sale coupon from index)
  couponData.value = {
    code: 'FLASH_SALE',
    discountType: 'percentage',
    discountValue: 50,
    minOrder: 0,
    usageLimit: 50,
    startDate: '2026-07-01',
    expiryDate: '2026-08-01',
    isActive: true
  }
  
  isLoading.value = false
})
</script>
