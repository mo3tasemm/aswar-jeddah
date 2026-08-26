<template>
  <div class="space-y-6" :dir="adminDir">
    <!-- Header with Back Button -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink 
        to="/admin/navbar" 
        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm cursor-pointer"
      >
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-900">
          {{ isSubItemCreation ? `إضافة عنصر فرعي منسدل لـ "${parentNameDisplay}"` : 'إضافة عنصر جديد لشريط التنقل' }}
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          أدخل بيانات الرابط، العنوان باللغتين، الشارة الترويجية والوجهة المستهدفة.
        </p>
      </div>
    </div>

    <!-- Form -->
    <NavbarItemForm 
      :is-edit-mode="false"
      :initial-data="initialFormData"
      :is-submitting="isSubmitting"
      :parent-options="parentOptions"
      :db-categories="dbCategories"
      :db-brands="dbBrands"
      @submit="handleCreate"
      @cancel="navigateTo('/admin/navbar')"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import NavbarItemForm from '~/components/dashboard/NavbarItemForm.vue'
import { useAdminNavbar } from '~/composables/useAdminNavbar'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { NavbarItemPayload } from '~/services/adminNavbarApiService'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { adminDir } = useAdminLanguage()
const { 
  rawItems, 
  parentOptions, 
  dbCategories, 
  dbBrands, 
  isSubmitting, 
  fetchNavbarItems, 
  fetchAutocompleteOptions, 
  createNavbarItem 
} = useAdminNavbar()

useHead({
  title: 'إضافة عنصر قائمة جديد | لوحة تحكم أسوار جدة'
})

const queryParentId = computed(() => route.query.parent_id ? String(route.query.parent_id) : '')
const isSubItemCreation = computed(() => Boolean(queryParentId.value && queryParentId.value !== '0'))

const parentNameDisplay = computed(() => {
  const found = rawItems.value.find(i => String(i.id) === queryParentId.value)
  return found ? (found.title_ar || found.title) : `عنصر #${queryParentId.value}`
})

const initialFormData = computed(() => ({
  parent_id: queryParentId.value ? Number(queryParentId.value) : null,
  type: 'link',
  url: '/',
  target: '_self',
  is_active: true
}))

onMounted(async () => {
  await Promise.all([
    fetchNavbarItems(),
    fetchAutocompleteOptions()
  ])
})

const handleCreate = async (payload: NavbarItemPayload) => {
  await createNavbarItem(payload)
  await navigateTo('/admin/navbar')
}
</script>
