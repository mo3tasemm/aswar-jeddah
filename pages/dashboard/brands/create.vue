<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-6">
      <NuxtLink to="/dashboard/brands" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
        <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </NuxtLink>
      <div>
        <h1 class="text-2xl font-black text-slate-800">إضافة براند جديد</h1>
        <p class="text-sm text-slate-500 mt-1">قم بإضافة علامة تجارية جديدة لربطها بمنتجات المتجر.</p>
      </div>
    </div>

    <!-- Brand Form -->
    <div>
      <BrandForm />
    </div>
  </div>
</template>

<script setup lang="ts">
import BrandForm from '~/components/dashboard/BrandForm.vue'

definePageMeta({
  layout: 'dashboard'
})
</script>
