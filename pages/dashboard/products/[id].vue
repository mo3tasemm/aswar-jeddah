<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/dashboard/products" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-800">تعديل المنتج</h1>
        <p class="text-sm text-slate-500 mt-1">تحديث بيانات المنتج وتعديل خصائصه.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-indigo-500 gap-4">
      <svg class="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="font-bold">جاري جلب بيانات المنتج...</span>
    </div>

    <!-- Product Form -->
    <ProductForm v-else :is-edit-mode="true" :initial-data="productData" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductForm from '~/components/dashboard/ProductForm.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const loading = ref(true)
const productData = ref<any>(null)

onMounted(() => {
  // Simulate API fetch using route.params.id
  setTimeout(() => {
    productData.value = {
      name: 'غسالة سامسونج 9 كيلو تعبئة أمامية',
      description: '<b>غسالة سامسونج المتطورة</b> بتقنية EcoBubble التي تضمن غسيلاً مثالياً وتوفيراً كبيراً في استهلاك الطاقة.',
      mainCategory: 'electronics',
      subCategory: 'washing',
      subSubCategory: 'front_load',
      sku: 'SAM-WM-9K-FR',
      price: 2450,
      discountPrice: 2200,
      stock: 5,
      featuredImage: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=200&auto=format&fit=crop',
      galleryImages: [
        'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=200&auto=format&fit=crop'
      ],
      variants: [
        { name: 'اللون', values: 'أبيض, فضي' }
      ]
    }
    loading.value = false
  }, 1000)
})
</script>
