<template>
  <div class="space-y-6">
    <!-- Top Header with Navigation Tabs -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900">الأدوار والصلاحيات (Roles & Permissions)</h1>
        <p class="text-xs text-slate-500 mt-1 font-medium">إنشاء وإدارة الأدوار الوظيفية وتحديد الصلاحيات المسموحة لكل دور باللوحة.</p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/admin/roles/create"
          class="px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-black text-xs rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span>إضافة دور وظيفي جديد</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation Tabs (Admins vs Roles) -->
    <div class="flex items-center gap-2 border-b border-slate-200">
      <NuxtLink
        to="/admin/staff"
        class="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <span>المشرفون (Staff / Admins)</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/roles"
        class="px-4 py-2.5 text-xs font-black text-amber-600 border-b-2 border-amber-500 transition-all flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        <span>الأدوار والصلاحيات (Roles)</span>
      </NuxtLink>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ errorMessage }}</span>
      </div>
      <button @click="fetchRoles" class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Roles Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoadingRoles" class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">جاري تحميل الأدوار الوظيفية...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!roles || roles.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h3 class="text-base font-black text-slate-700">لا توجد أدوار وظيفية مسجلة</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">ابدأ بإنشاء أول دور وظيفي وحدد صلاحيات الوصول للأقسام.</p>
        <NuxtLink 
          to="/admin/roles/create" 
          class="inline-block px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          إضافة دور جديد
        </NuxtLink>
      </div>

      <!-- Roles Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold text-start">اسم الدور (Role)</th>
              <th class="px-6 py-4 font-bold text-start">الأقسام والصلاحيات المسموحة</th>
              <th class="px-6 py-4 font-bold text-center">المشرفون التابعون</th>
              <th class="px-6 py-4 font-bold text-start">تاريخ الإنشاء</th>
              <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="role in roles" 
              :key="role.id" 
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Role Name -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-9 h-9 rounded-xl bg-amber-100/80 text-amber-800 flex items-center justify-center font-black text-xs shrink-0 shadow-2xs">
                    {{ role.name.charAt(0) }}
                  </div>
                  <div>
                    <span class="font-black text-slate-900 text-xs block">{{ role.name }}</span>
                    <span class="text-[10px] text-slate-400 font-mono">ID: #{{ role.id }}</span>
                  </div>
                </div>
              </td>

              <!-- Modules Permissions Badges -->
              <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1 max-w-md">
                  <span 
                    v-for="modKey in (role.modules || []).slice(0, 4)" 
                    :key="modKey"
                    class="px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-bold"
                  >
                    {{ getModuleName(modKey) }}
                  </span>
                  <span 
                    v-if="(role.modules || []).length > 4" 
                    class="px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200 rounded-md text-[10px] font-black"
                  >
                    +{{ (role.modules || []).length - 4 }} أقسام أخرى
                  </span>
                  <span 
                    v-if="!role.modules || role.modules.length === 0" 
                    class="text-xs text-slate-400 font-normal italic"
                  >
                    لا توجد صلاحيات محددة
                  </span>
                </div>
              </td>

              <!-- Admins Count -->
              <td class="px-6 py-4 text-center">
                <span class="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black font-mono">
                  {{ role.admins_count || 0 }} مشرف
                </span>
              </td>

              <!-- Created At -->
              <td class="px-6 py-4 text-xs font-medium text-slate-500 font-mono">
                {{ role.created_at ? role.created_at.split('T')[0] : '-' }}
              </td>

              <!-- Actions (Links to dedicated edit page) -->
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink 
                    :to="`/admin/roles/${role.id}/edit`"
                    class="p-2 text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 rounded-xl transition-all shadow-2xs cursor-pointer" 
                    title="تعديل الدور والصلاحيات"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </NuxtLink>

                  <div 
                    :title="(role.admins_count && role.admins_count > 0) 
                      ? `لا يمكن حذف هذا الدور لوجود ${role.admins_count} مشرفين مرتبطين به (يرجى نقل المشرفين أولاً)` 
                      : (role.id === 1 ? 'لا يمكن حذف دور مدير النظام الرئيسي' : 'حذف الدور')"
                  >
                    <button 
                      @click="confirmDeleteRole(role)" 
                      :disabled="role.id === 1 || (role.admins_count !== undefined && role.admins_count > 0)"
                      class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer disabled:opacity-35 disabled:hover:bg-transparent disabled:cursor-not-allowed" 
                    >
                      <svg v-if="role.admins_count && role.admins_count > 0" class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="roleToDelete" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div>
          <h4 class="text-base font-black text-slate-900">تأكيد حذف الدور الوظيفي</h4>
          <p class="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف الدور "{{ roleToDelete.name }}"؟</p>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <button 
            @click="roleToDelete = null" 
            class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button 
            @click="executeDeleteRole" 
            :disabled="isDeletingRole"
            class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {{ isDeletingRole ? 'جاري الحذف...' : 'نعم، احذف' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'
import { useToast } from '~/composables/useToast'
import type { AdminRoleItem } from '~/services/adminRolesAndAdminsService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'الأدوار والصلاحيات | لوحة التحكم'
})

const { warning } = useToast()

const {
  roles,
  availableModules,
  isLoadingRoles,
  isDeletingRole,
  errorMessage,
  fetchRoles,
  deleteRole
} = useAdminRolesAndAdmins()

const roleToDelete = ref<AdminRoleItem | null>(null)

onMounted(async () => {
  await fetchRoles()
})

const getModuleName = (key: string): string => {
  const mod = availableModules.value.find(m => m.key === key)
  return mod?.nameAr || key
}

const confirmDeleteRole = (role: AdminRoleItem) => {
  if (role.admins_count && role.admins_count > 0) {
    warning('تعذر الحذف', `لا يمكن حذف الدور "${role.name}" لوجود ${role.admins_count} مشرفين مرتبطين به. يرجى نقلهم لدور آخر أولاً.`)
    return
  }
  if (role.id === 1) {
    warning('تنبيه', 'لا يمكن حذف دور مدير النظام الرئيسي.')
    return
  }
  roleToDelete.value = role
}

const executeDeleteRole = async () => {
  if (!roleToDelete.value) return
  const success = await deleteRole(roleToDelete.value.id)
  if (success) {
    roleToDelete.value = null
  }
}
</script>
