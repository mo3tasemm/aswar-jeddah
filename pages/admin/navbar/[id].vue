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
          تعديل عنصر القائمة: "{{ currentItem?.title_ar || currentItem?.title || 'جاري التحميل...' }}"
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          قم بتحديث الروابط، العناوين، الأيقونات أو الشارات الترويجية وحفظ التغييرات فوراً.
        </p>
      </div>
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading && !currentItem" class="bg-white rounded-3xl p-8 border border-slate-100 space-y-6 animate-pulse">
      <div class="h-10 bg-slate-100 rounded-xl w-1/3"></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="h-12 bg-slate-100 rounded-xl"></div>
        <div class="h-12 bg-slate-100 rounded-xl"></div>
      </div>
      <div class="h-40 bg-slate-100 rounded-2xl"></div>
    </div>

    <!-- Form -->
    <NavbarItemForm 
      v-else
      :is-edit-mode="true"
      :initial-data="currentItem || {}"
      :is-submitting="isSubmitting"
      :parent-options="parentOptions"
      :db-categories="dbCategories"
      :db-brands="dbBrands"
      @submit="handleUpdate"
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
const itemId = computed(() => route.params.id as string)

const { adminDir } = useAdminLanguage()
const { 
  rawItems, 
  parentOptions, 
  dbCategories, 
  dbBrands, 
  isLoading, 
  isSubmitting, 
  fetchNavbarItems, 
  fetchAutocompleteOptions, 
  updateNavbarItem 
} = useAdminNavbar()

const currentItem = computed(() => {
  return rawItems.value.find(i => String(i.id) === itemId.value)
})

useHead({
  title: computed(() => `تعديل ${currentItem.value?.title_ar || currentItem.value?.title || 'عنصر القائمة'} | لوحة تحكم أسوار جدة`)
})

onMounted(async () => {
  await Promise.all([
    fetchNavbarItems(),
    fetchAutocompleteOptions()
  ])
})

const handleUpdate = async (payload: NavbarItemPayload) => {
  await updateNavbarItem(itemId.value, payload)
  await navigateTo('/admin/navbar')
}
</script>
