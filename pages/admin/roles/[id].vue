<template>
  <div>
    <!-- Loading -->
    <div v-if="isLoadingRoles" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
      <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-xs font-bold">جاري تحميل بيانات الدور...</span>
    </div>

    <!-- Edit Form -->
    <RoleForm v-else-if="currentRole" :initial-data="currentRole" :is-edit="true" :role-id="currentRole.id" />

    <!-- Error / Not Found -->
    <div v-else class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100">
      <h3 class="text-base font-black text-slate-800">تعذر العثور على بيانات الدور الوظيفي</h3>
      <p class="text-xs text-slate-400">تأكد من صحة معرف الدور وحاول مجدداً.</p>
      <NuxtLink to="/admin/roles" class="inline-block px-4 py-2 bg-amber-400 text-[#0B0E28] font-bold text-xs rounded-xl">
        العودة لقائمة الأدوار
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import RoleForm from '~/components/dashboard/RoleForm.vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل الدور الوظيفي | لوحة التحكم'
})

const route = useRoute()
const { currentRole, isLoadingRoles, fetchRoleDetails } = useAdminRolesAndAdmins()

onMounted(async () => {
  const roleId = route.params.id as string
  if (roleId) {
    await fetchRoleDetails(roleId)
  }
})
</script>
