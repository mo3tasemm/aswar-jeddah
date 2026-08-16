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
        <h1 class="text-2xl font-black text-slate-900">تعديل بيانات السمة (ID: {{ route.params.id }})</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          تحديث اسم السمة بالعربية والإنجليزية عبر API التعديل (POST JSON).
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-amber-500 gap-4">
      <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات السمة من السيرفر...</span>
    </div>

    <!-- Attribute Form -->
    <AttributeFormAdvanced 
      v-else 
      :is-edit-mode="true" 
      :initial-data="attributeData" 
      :is-submitting="isSubmitting"
      @submit="handleUpdate"
      @cancel="navigateTo('/admin/attributes')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AttributeFormAdvanced from '~/components/dashboard/AttributeFormAdvanced.vue'
import { useAdminAttributes } from '~/composables/useAdminAttributes'
import type { AttributeFormDataPayload } from '~/services/adminAttributesApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل بيانات السمة | لوحة التحكم'
})

const route = useRoute()
const attributeId = String(route.params.id)

const { getAttributeById, submitForm, isSubmitting } = useAdminAttributes()
const loading = ref(true)
const attributeData = ref<Partial<AttributeFormDataPayload>>({})

onMounted(async () => {
  try {
    const found = await getAttributeById(attributeId)

    if (found) {
      attributeData.value = {
        id: found.id,
        name_ar: found.name_ar || found.name,
        name_en: found.name_en || ''
      }
    } else {
      attributeData.value = {
        id: attributeId,
        name_ar: `سمة رقم #${attributeId}`,
        name_en: ''
      }
    }
  } catch {
    attributeData.value = {
      id: attributeId,
      name_ar: `سمة رقم #${attributeId}`,
      name_en: ''
    }
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (payload: AttributeFormDataPayload) => {
  const success = await submitForm(payload, true, attributeId)
  if (success) {
    navigateTo('/admin/attributes')
  }
}
</script>
