<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/dashboard/categories" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-800">تعديل التصنيف</h1>
        <p class="text-sm text-slate-500 mt-1">تحديث بيانات التصنيف ومكانه في الشجرة الهرمية.</p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-indigo-500 gap-4">
      <svg class="animate-spin h-10 w-10 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      <span class="font-bold">جاري جلب البيانات...</span>
    </div>

    <!-- Category Form -->
    <div v-else>
      <CategoryForm :is-edit-mode="true" :initial-data="categoryData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import CategoryForm from '~/components/dashboard/CategoryForm.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const loading = ref(true)
const categoryData = ref<any>(null)

onMounted(() => {
  // Simulate API fetch using route.params.id
  setTimeout(() => {
    categoryData.value = {
      id: 'cat_1_1_1',
      name: 'سبليت',
      parentId: 'cat_1_1', // belongs to مكيفات
      icon: null
    }
    loading.value = false
  }, 1000)
})
</script>
