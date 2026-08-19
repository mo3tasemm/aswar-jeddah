<template>
  <div class="space-y-6">
    <!-- Top Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-900">إدارة المشرفين والصلاحيات (Staff & Admins)</h1>
        <p class="text-xs text-slate-500 mt-1 font-medium">إدارة حسابات مدراء النظام وتعيين الأدوار والصلاحيات والتحكم بحالة التفعيل.</p>
      </div>

      <div class="flex items-center gap-3">
        <NuxtLink
          to="/admin/staff/create"
          class="px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-black text-xs rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
          <span>إضافة مشرف جديد</span>
        </NuxtLink>
      </div>
    </div>

    <!-- Navigation Tabs (Admins vs Roles) -->
    <div class="flex items-center gap-2 border-b border-slate-200">
      <NuxtLink
        to="/admin/staff"
        class="px-4 py-2.5 text-xs font-black text-amber-600 border-b-2 border-amber-500 transition-all flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
        <span>المشرفون (Staff / Admins)</span>
      </NuxtLink>

      <NuxtLink
        to="/admin/roles"
        class="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
        <span>الأدوار والصلاحيات (Roles)</span>
      </NuxtLink>
    </div>

    <!-- Search & Filter Controls -->
    <div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4">
      <div class="w-full md:w-80">
        <BaseInput
          v-model="searchAdminQuery"
          @input="handleSearch"
          placeholder="البحث بالاسم، البريد، أو الهاتف..."
          class="w-full"
        >
          <template #icon>
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </BaseInput>
      </div>

      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
        <!-- Role Filter -->
        <div class="w-full sm:w-44">
          <label class="block text-[11px] font-black text-slate-500 mb-1">الدور الوظيفي</label>
          <select
            v-model="roleFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="">كافة الأدوار</option>
            <option v-for="r in roles" :key="r.id" :value="r.id">
              {{ r.name }}
            </option>
          </select>
        </div>

        <!-- Status Filter -->
        <div class="w-full sm:w-40">
          <label class="block text-[11px] font-black text-slate-500 mb-1">حالة الحساب</label>
          <select
            v-model="statusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"
          >
            <option value="">كافة الحالات</option>
            <option value="1">حسابات نشطة (Active)</option>
            <option value="0">حسابات معطلة (Inactive)</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div v-if="searchAdminQuery || roleFilter || statusFilter !== ''" class="self-end pb-0.5">
          <button
            @click="resetFilters"
            class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            title="إعادة تعيين الفلاتر"
          >
            إعادة تعيين
          </button>
        </div>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ errorMessage }}</span>
      </div>
      <button @click="loadData" class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button>
    </div>

    <!-- Admins Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <!-- Loading State -->
      <div v-if="isLoadingAdmins" class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">جاري تحميل قائمة المشرفين...</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!admins || admins.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 class="text-base font-black text-slate-700">لم يتم العثور على مشرفين</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">جرب تغيير معايير البحث أو أضف مشرفاً جديداً.</p>
        <NuxtLink 
          to="/admin/staff/create" 
          class="inline-block px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          إضافة مشرف جديد
        </NuxtLink>
      </div>

      <!-- Admins Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold text-start">المشرف (Admin)</th>
              <th class="px-6 py-4 font-bold text-start">معلومات التواصل</th>
              <th class="px-6 py-4 font-bold text-start">الدور الوظيفي (Role)</th>
              <th class="px-6 py-4 font-bold text-center">حالة الحساب</th>
              <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="admin in admins" 
              :key="admin.id" 
              class="hover:bg-slate-50/80 transition-colors group"
            >
              <!-- Admin Name & Avatar -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 border border-amber-200/60 flex items-center justify-center font-black text-sm shrink-0 overflow-hidden shadow-2xs">
                    <img 
                      v-if="admin.image_url" 
                      :src="admin.image_url" 
                      :alt="admin.name" 
                      class="w-full h-full object-cover"
                      @error="(e: any) => e.target.style.display = 'none'"
                    />
                    <span v-else>{{ admin.name.charAt(0) }}</span>
                  </div>
                  <div>
                    <span class="font-black text-slate-900 text-xs block">{{ admin.name }}</span>
                    <span class="text-[10px] text-slate-400 font-mono">ID: #{{ admin.id }}</span>
                  </div>
                </div>
              </td>

              <!-- Contact Info -->
              <td class="px-6 py-4 text-xs font-bold">
                <div class="text-slate-800 font-mono flex items-center gap-1.5" dir="ltr">
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span>{{ admin.email || '-' }}</span>
                </div>
                <div v-if="admin.phone" class="text-slate-500 font-mono text-[11px] mt-0.5 flex items-center gap-1.5" dir="ltr">
                  <svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>{{ admin.phone }}</span>
                </div>
              </td>

              <!-- Role Badge -->
              <td class="px-6 py-4">
                <span class="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-black inline-flex items-center gap-1.5 shadow-2xs">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  <span>{{ admin.role_name || (admin.role ? admin.role.name : 'مشرف') }}</span>
                </span>
              </td>

              <!-- Live Status Toggle Switch -->
              <td class="px-6 py-4 text-center">
                <div class="flex flex-col items-center justify-center gap-1">
                  <BaseToggle 
                    :model-value="admin.status === 1 || admin.status === true"
                    @update:model-value="handleToggleStatus(admin)"
                    :disabled="isUpdatingStatus || admin.id === 1"
                  />
                  <span 
                    class="text-[10px] font-black"
                    :class="admin.status === 1 || admin.status === true ? 'text-emerald-700' : 'text-slate-400'"
                  >
                    {{ admin.status === 1 || admin.status === true ? 'نشط (Active)' : 'معطل (Inactive)' }}
                  </span>
                </div>
              </td>

              <!-- Actions (Links to dedicated edit page) -->
              <td class="px-6 py-4 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <NuxtLink 
                    :to="`/admin/staff/${admin.id}/edit`"
                    class="p-2 text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 rounded-xl transition-all shadow-2xs cursor-pointer" 
                    title="تعديل بيانات المشرف"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </NuxtLink>

                  <button 
                    @click="confirmDeleteAdmin(admin)" 
                    :disabled="admin.id === 1 || String(admin.role_name).toLowerCase().includes('super')"
                    class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" 
                    title="حذف المشرف"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="adminToDelete" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150">
        <div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
          <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </div>
        <div>
          <h4 class="text-base font-black text-slate-900">تأكيد حذف المشرف</h4>
          <p class="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف حساب المشرف "{{ adminToDelete.name }}"؟</p>
        </div>
        <div class="flex items-center gap-2 pt-2">
          <button 
            @click="adminToDelete = null" 
            class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          <button 
            @click="executeDeleteAdmin" 
            :disabled="isDeletingAdmin"
            class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-colors shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {{ isDeletingAdmin ? 'جاري الحذف...' : 'نعم، احذف' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'
import type { AdminUserItem } from '~/services/adminRolesAndAdminsService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إدارة المشرفين والصلاحيات | لوحة التحكم'
})

const route = useRoute()

const {
  admins,
  roles,
  isLoadingAdmins,
  isUpdatingStatus,
  isDeletingAdmin,
  searchAdminQuery,
  roleFilter,
  statusFilter,
  errorMessage,
  fetchAdmins,
  fetchRoles,
  toggleAdminStatus,
  deleteAdmin
} = useAdminRolesAndAdmins()

const adminToDelete = ref<AdminUserItem | null>(null)
let searchDebounce: any = null

const loadData = async () => {
  if (route.query.role_id) {
    roleFilter.value = String(route.query.role_id)
  }
  await Promise.all([
    fetchAdmins(1),
    fetchRoles()
  ])
}

onMounted(async () => {
  await loadData()
})

const handleSearch = () => {
  clearTimeout(searchDebounce)
  searchDebounce = setTimeout(() => {
    fetchAdmins(1)
  }, 350)
}

const handleFilterChange = () => {
  fetchAdmins(1)
}

const resetFilters = () => {
  searchAdminQuery.value = ''
  roleFilter.value = ''
  statusFilter.value = ''
  fetchAdmins(1)
}

const handleToggleStatus = async (admin: AdminUserItem) => {
  await toggleAdminStatus(admin)
}

const confirmDeleteAdmin = (admin: AdminUserItem) => {
  adminToDelete.value = admin
}

const executeDeleteAdmin = async () => {
  if (!adminToDelete.value) return
  const success = await deleteAdmin(adminToDelete.value.id)
  if (success) {
    adminToDelete.value = null
  }
}
</script>
