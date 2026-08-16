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
          تعديل بيانات القسم (ID: #{{ categoryId }})
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          تحديث اسم القسم باللغتين، صورة الغلاف، الترتيب، أو نقله إلى قسم أب آخر عبر API التحديث المباشر.
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4">
      <div class="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات القسم #{{ categoryId }} من السيرفر...</span>
    </div>

    <!-- Error / Not Found Banner (if any) -->
    <div v-else-if="fetchError" class="p-5 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        <div>
          <span class="font-bold text-xs text-rose-700 block">{{ fetchError }}</span>
          <span class="text-[11px] text-rose-500 font-medium">يمكنك المتابعة وتعديل بيانات القسم أدناه أو إعادة المحاولة.</span>
        </div>
      </div>

      <button 
        @click="loadCategoryData"
        class="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"
      >
        إعادة المحاولة
      </button>
    </div>

    <!-- Category Form in Full Page Layout -->
    <CategoryFormAdvanced 
      v-if="!loading"
      :is-edit-mode="true" 
      :initial-data="categoryData" 
      :is-submitting="isSubmitting"
      :categories-list="categories"
      @submit="handleUpdate"
      @cancel="navigateTo('/admin/categories')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import CategoryFormAdvanced from '~/components/dashboard/CategoryFormAdvanced.vue'
import { useAdminCategories } from '~/composables/useAdminCategories'
import type { CategoryFormDataPayload } from '~/services/adminCategoriesApiService'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const categoryId = String(route.params.id)

useHead({
  title: computed(() => `تعديل القسم #${categoryId} | لوحة التحكم`)
})

const { categories, fetchCategories, fetchCategoryById, submitForm, isSubmitting } = useAdminCategories()
const loading = ref(true)
const fetchError = ref('')
const categoryData = ref<Partial<CategoryFormDataPayload & { existingImage?: string }>>({})

const loadCategoryData = async () => {
  loading.value = true
  fetchError.value = ''

  try {
    // 1. Fetch available parents list in parallel if empty
    if (categories.value.length === 0) {
      await fetchCategories()
    }

    // 2. Fetch target category by ID using deep search
    const category = await fetchCategoryById(categoryId)

    if (category) {
      categoryData.value = {
        id: category.id,
        name_ar: category.name_ar || category.name || '',
        name_en: category.name_en || '',
        parent_id: category.parent_id !== undefined ? category.parent_id : 0,
        position: category.position || (Number(category.parent_id) > 0 ? 1 : 0),
        priority: category.priority || 1,
        existingImage: category.image || category.icon || ''
      }
    } else {
      // Fallback: Check in already loaded categories
      let found: any = categories.value.find(c => String(c.id) === categoryId)

      if (!found) {
        for (const parent of categories.value) {
          if (parent.subCategories && parent.subCategories.length > 0) {
            const sub = parent.subCategories.find((s: any) => String(s.id) === categoryId)
            if (sub) {
              found = { ...sub, parent_id: parent.id }
              break
            }
          }
        }
      }

      if (found) {
        categoryData.value = {
          id: found.id,
          name_ar: found.name_ar || found.name || '',
          name_en: found.name_en || '',
          parent_id: found.parent_id !== undefined ? found.parent_id : 0,
          position: found.position || (Number(found.parent_id) > 0 ? 1 : 0),
          priority: found.priority || 1,
          existingImage: found.image || found.icon || ''
        }
      } else {
        fetchError.value = `تعذر العثور على بيانات القسم رقم #${categoryId} على السيرفر.`
        categoryData.value = {
          id: categoryId,
          name_ar: '',
          name_en: '',
          parent_id: 0,
          position: 0,
          priority: 1
        }
      }
    }
  } catch (err: any) {
    console.error('[CategoryEdit] Load Error:', err)
    fetchError.value = 'حدث خطأ أثناء جلب بيانات القسم من السيرفر.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategoryData()
})

const handleUpdate = async (payload: CategoryFormDataPayload) => {
  const success = await submitForm(payload, true, categoryId)
  if (success) {
    navigateTo('/admin/categories')
  }
}
</script>
