<template>
  <div class="space-y-6">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink 
        to="/admin/categories" 
        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm cursor-pointer"
      >
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">
          {{ isSubcategoryCreation ? `إضافة قسم فرعي جديد لـ "${parentNameDisplay}"` : 'إضافة قسم رئيسي جديد' }}
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          أدخل بيانات القسم باللغتين العربية والإنجليزية وحدد صورة الغلاف ليتم إرسال البيانات كـ FormData.
        </p>
      </div>
    </div>

    <!-- Category Form in Full Page Layout -->
    <CategoryFormAdvanced 
      :is-edit-mode="false"
      :initial-data="initialFormData"
      :is-submitting="isSubmitting"
      :categories-list="categories"
      @submit="handleCreate"
      @cancel="navigateTo('/admin/categories')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CategoryFormAdvanced from '~/components/dashboard/CategoryFormAdvanced.vue'
import { useAdminCategories } from '~/composables/useAdminCategories'
import type { CategoryFormDataPayload } from '~/services/adminCategoriesApiService'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { categories, fetchCategories, submitForm, isSubmitting } = useAdminCategories()

const queryParentId = computed(() => route.query.parent_id ? String(route.query.parent_id) : '')
const queryParentName = computed(() => route.query.parent_name ? String(route.query.parent_name) : '')

const isSubcategoryCreation = computed(() => Boolean(queryParentId.value && queryParentId.value !== '0'))

const parentNameDisplay = computed(() => {
  if (queryParentName.value) return queryParentName.value
  const found = categories.value.find(c => String(c.id) === queryParentId.value)
  return found ? (found.name_ar || found.name) : `قسم #${queryParentId.value}`
})

const initialFormData = computed<Partial<CategoryFormDataPayload>>(() => {
  if (isSubcategoryCreation.value) {
    return {
      parent_id: queryParentId.value,
      position: 1,
      priority: 1
    }
  }
  return {
    parent_id: 0,
    position: 0,
    priority: 1
  }
})

useHead({
  title: computed(() => isSubcategoryCreation.value ? 'إضافة قسم فرعي | لوحة التحكم' : 'إضافة قسم رئيسي | لوحة التحكم')
})

onMounted(() => {
  if (categories.value.length === 0) {
    fetchCategories()
  }
})

const handleCreate = async (payload: CategoryFormDataPayload) => {
  const success = await submitForm(payload, false)
  if (success) {
    navigateTo('/admin/categories')
  }
}
</script>
