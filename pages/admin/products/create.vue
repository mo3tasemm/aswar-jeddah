<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/admin/products" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm">
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">إضافة منتج جديد (POST FormData)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">أدخل تفاصيل المنتج الجديد كـ FormData عبر API الإضافة المباشر.</p>
      </div>
    </div>

    <!-- Product Form -->
    <ProductFormAdvanced 
      :is-edit-mode="false"
      :is-submitting="isSubmitting"
      :server-error="errorMessage"
      @submit="handleCreate"
      @cancel="navigateTo('/admin/products')"
    />
  </div>
</template>

<script setup lang="ts">
import ProductFormAdvanced from '~/components/dashboard/ProductFormAdvanced.vue'
import { useAdminProducts } from '~/composables/useAdminProducts'
import type { ProductFormDataPayload } from '~/services/adminProductsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إضافة منتج جديد | لوحة التحكم'
})

const { submitForm, isSubmitting, errorMessage } = useAdminProducts()

const handleCreate = async (payload: ProductFormDataPayload) => {
  const success = await submitForm(payload, false)
  if (success) {
    navigateTo('/admin/products')
  }
}
</script>
