<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink 
        to="/admin/colors" 
        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm cursor-pointer"
      >
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">تعديل بيانات اللون (ID: {{ route.params.id }})</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          تحديث اسم اللون أو كود الـ Hex أو الصورة عبر API التعديل (POST FormData).
        </p>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex flex-col items-center justify-center py-20 text-amber-500 gap-4">
      <div class="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
      <span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات اللون من السيرفر...</span>
    </div>

    <!-- Color Form -->
    <ColorFormAdvanced 
      v-else 
      :is-edit-mode="true" 
      :initial-data="colorData" 
      :is-submitting="isSubmitting"
      @submit="handleUpdate"
      @cancel="navigateTo('/admin/colors')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ColorFormAdvanced from '~/components/dashboard/ColorFormAdvanced.vue'
import { useAdminColors } from '~/composables/useAdminColors'
import type { ColorFormDataPayload } from '~/services/adminColorsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل بيانات اللون | لوحة التحكم'
})

const route = useRoute()
const colorId = String(route.params.id)

const { getColorById, submitForm, isSubmitting } = useAdminColors()
const loading = ref(true)
const colorData = ref<Partial<ColorFormDataPayload & { existingImage?: string }>>({})

onMounted(async () => {
  try {
    const found = await getColorById(colorId)

    if (found) {
      colorData.value = {
        id: found.id,
        name: found.name,
        color_type: found.color_type || 'code',
        code: found.code || '#000000',
        existingImage: found.image || found.image_full_url?.path
      }
    } else {
      colorData.value = {
        id: colorId,
        name: `لون رقم #${colorId}`,
        color_type: 'code',
        code: '#000000'
      }
    }
  } catch {
    colorData.value = {
      id: colorId,
      name: `لون رقم #${colorId}`,
      color_type: 'code',
      code: '#000000'
    }
  } finally {
    loading.value = false
  }
})

const handleUpdate = async (payload: ColorFormDataPayload) => {
  const success = await submitForm(payload, true, colorId)
  if (success) {
    navigateTo('/admin/colors')
  }
}
</script>
