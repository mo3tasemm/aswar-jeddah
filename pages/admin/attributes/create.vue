<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink 
        to="/admin/attributes" 
        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm cursor-pointer"
      >
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">إضافة سمة جديدة (POST JSON)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          أدخل اسم السمة بالعربية والإنجليزية لإضافتها إلى خيارات مواصفات المنتجات.
        </p>
      </div>
    </div>

    <!-- Attribute Form Component -->
    <AttributeFormAdvanced 
      :is-edit-mode="false"
      :is-submitting="isSubmitting"
      @submit="handleCreate"
      @cancel="navigateTo('/admin/attributes')"
    />
  </div>
</template>

<script setup lang="ts">
import AttributeFormAdvanced from '~/components/dashboard/AttributeFormAdvanced.vue'
import { useAdminAttributes } from '~/composables/useAdminAttributes'
import type { AttributeFormDataPayload } from '~/services/adminAttributesApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إضافة سمة جديدة | لوحة التحكم'
})

const { submitForm, isSubmitting } = useAdminAttributes()

const handleCreate = async (payload: AttributeFormDataPayload) => {
  const success = await submitForm(payload, false)
  if (success) {
    navigateTo('/admin/attributes')
  }
}
</script>
