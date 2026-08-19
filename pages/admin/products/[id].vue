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
        <h1 class="text-2xl font-black text-slate-900">تعديل المنتج (ID: {{ route.params.id }})</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">تحديث بيانات المنتج وتعديل خصائصه عبر API التحديث (POST FormData).</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-amber-500 gap-4">
      <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات المنتج من السيرفر...</span>
    </div>

    <!-- Product Form -->
    <ProductFormAdvanced 
      v-else 
      :is-edit-mode="true" 
      :initial-data="productData" 
      :is-submitting="isSubmitting"
      :server-error="errorMessage"
      @submit="handleUpdate"
      @cancel="navigateTo('/admin/products')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductFormAdvanced from '~/components/dashboard/ProductFormAdvanced.vue'
import { useAdminProducts } from '~/composables/useAdminProducts'
import type { ProductFormDataPayload } from '~/services/adminProductsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل المنتج | لوحة التحكم'
})

const route = useRoute()
const productId = String(route.params.id)

const { fetchProductDetails, submitForm, isSubmitting, errorMessage } = useAdminProducts()
const loading = ref(true)
const productData = ref<Partial<ProductFormDataPayload>>({})

onMounted(async () => {
  try {
    const data = await fetchProductDetails(productId)
    if (data) {
      productData.value = data
    } else {
      productData.value = {
        id: productId,
        name_ar: `منتج رقم #${productId}`,
        unit_price: 100,
        current_stock: 10
      }
    }
  } catch (err) {
    console.error('Error fetching product details in [id].vue:', err)
    productData.value = {
      id: productId,
      name_ar: `منتج رقم #${productId}`,
      unit_price: 100
    }
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (payload: ProductFormDataPayload) => {
  const success = await submitForm(payload, true, productId)
  if (success) {
    navigateTo('/admin/products')
  }
}
</script>
