<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/admin/categories" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm">
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">تعديل القسم (ID: {{ route.params.id }})</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">تحديث بيانات القسم وصورته عبر API التحديث (POST FormData).</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-amber-500 gap-4">
      <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات القسم من السيرفر...</span>
    </div>

    <!-- Category Form -->
    <CategoryFormAdvanced 
      v-else 
      :is-edit-mode="true" 
      :initial-data="categoryData" 
      :is-submitting="isSubmitting"
      @submit="handleUpdate"
      @cancel="navigateTo('/admin/categories')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CategoryFormAdvanced from '~/components/dashboard/CategoryFormAdvanced.vue'
import { useAdminCategories } from '~/composables/useAdminCategories'
import type { CategoryFormDataPayload } from '~/services/adminCategoriesApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل القسم | لوحة التحكم'
})

const route = useRoute()
const categoryId = String(route.params.id)

const { fetchCategories, submitForm, isSubmitting } = useAdminCategories()
const loading = ref(true)
const categoryData = ref<Partial<CategoryFormDataPayload & { existingImage?: string }>>({})

onMounted(async () => {
  try {
    const list = await fetchCategories()
    const found = list.find(c => String(c.id) === categoryId)

    if (found) {
      categoryData.value = {
        id: found.id,
        name_ar: found.name_ar || found.name,
        name_en: found.name_en || '',
        existingImage: found.image || found.icon
      }
    } else {
      categoryData.value = {
        id: categoryId,
        name_ar: `قسم رقم #${categoryId}`
      }
    }
  } catch {
    categoryData.value = {
      id: categoryId,
      name_ar: `قسم رقم #${categoryId}`
    }
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (payload: CategoryFormDataPayload) => {
  const success = await submitForm(payload, true, categoryId)
  if (success) {
    navigateTo('/admin/categories')
  }
}
</script>
