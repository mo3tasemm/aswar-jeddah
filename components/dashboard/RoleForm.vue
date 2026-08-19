<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 pb-24 lg:pb-6 relative max-w-[1100px] mx-auto">
    
    <!-- Top Header & Actions -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink 
          to="/admin/roles"
          class="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-colors shadow-2xs cursor-pointer"
        >
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-900">
            {{ isEdit ? 'تعديل الدور الوظيفي والصلاحيات' : 'إضافة دور وظيفي جديد' }}
          </h1>
          <p class="text-xs text-slate-500 mt-1 font-medium">حدد اسم الدور ومصفوفة الصلاحيات المسموح بها للمشرفين التابعين له.</p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          to="/admin/roles" 
          class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          إلغاء
        </NuxtLink>
        <button 
          type="submit"
          :disabled="isSavingRole"
          class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg v-if="isSavingRole" class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isEdit ? 'حفظ التعديلات' : 'إنشاء الدور' }}</span>
        </button>
      </div>
    </div>

    <!-- Error Alert -->
    <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{{ errorMessage }}</span>
      </div>
    </div>

    <!-- Reassign Admins Notice Banner (when role has assigned admins) -->
    <div v-if="isEdit && initialData?.admins_count && initialData.admins_count > 0" class="p-4 bg-amber-50/80 border border-amber-200/80 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-amber-400 text-[#0B0E28] flex items-center justify-center shrink-0 shadow-2xs">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 class="text-xs font-black text-amber-950">
            هذا الدور مرتبط حالياً بـ <span class="text-amber-800 underline font-mono font-black">{{ initialData.admins_count }}</span> مشرفين
          </h4>
          <p class="text-[11px] text-amber-800 font-medium mt-0.5">
            إذا كنت تخطط لحذف هذا الدور لاحقاً، يرجى أولاً نقل المشرفين المرتبطين به إلى دور وظيفي آخر (Reassign Admins).
          </p>
        </div>
      </div>

      <NuxtLink 
        :to="`/admin/staff?role_id=${initialData.id}`" 
        class="px-4 py-2 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
      >
        <span>عرض ونقل المشرفين</span>
        <svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
      </NuxtLink>
    </div>

    <!-- Main Form Grid -->
    <div class="space-y-6">
      
      <!-- Basic Info Card -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>البيانات الأساسية للدور</span>
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
          <div>
            <label class="block text-xs font-black text-slate-800 mb-1.5">
              اسم الدور الوظيفي (Role Name) *
            </label>
            <input
              v-model="form.name"
              type="text"
              placeholder="مثال: مدير المنتجات، مسؤول خدمة العملاء، محاسب..."
              class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"
              :class="getFieldError('name') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
              required
            />
            <span v-if="getFieldError('name')" class="text-xs font-bold text-rose-500 block mt-1">
              {{ getFieldError('name') }}
            </span>
          </div>

          <div class="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50">
            <div>
              <span class="text-xs font-black text-slate-800 block">حالة تفعيل الدور</span>
              <span class="text-[11px] text-slate-400 font-medium">الأدوار المعطلة تمنع المشرفين من الوصول</span>
            </div>
            <BaseToggle v-model="form.status" />
          </div>
        </div>
      </div>

      <!-- Permissions Grid Card -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>مصفوفة الصلاحيات والأقسام المسموحة (Module Permissions) *</span>
            </h2>
            <p class="text-[11px] text-slate-400 font-medium mt-0.5">اختر الأقسام التي يحق للمشرفين التابعين لهذا الدور الوصول إليها.</p>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="selectAllModules"
              class="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              تحديد الكل (Select All)
            </button>
            <button
              type="button"
              @click="deselectAllModules"
              class="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
            >
              إلغاء التحديد
            </button>
          </div>
        </div>

        <!-- Modules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          <label
            v-for="mod in availableModules"
            :key="mod.key"
            class="flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none"
            :class="isModuleSelected(mod.key) 
              ? 'border-amber-400 bg-amber-50/40 shadow-2xs' 
              : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'"
          >
            <input
              type="checkbox"
              :value="mod.key"
              :checked="isModuleSelected(mod.key)"
              @change="toggleModule(mod.key)"
              class="mt-1 rounded border-slate-300 text-amber-500 focus:ring-amber-400 h-4 w-4 cursor-pointer"
            />
            <div class="flex-1">
              <div class="text-xs font-black text-slate-900 flex items-center justify-between">
                <span>{{ mod.nameAr }}</span>
                <span class="text-[10px] font-bold text-slate-400 font-mono" dir="ltr">{{ mod.key }}</span>
              </div>
              <p v-if="mod.description" class="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">
                {{ mod.description }}
              </p>
            </div>
          </label>
        </div>

        <span v-if="getFieldError('modules')" class="text-xs font-bold text-rose-500 block mt-1">
          {{ getFieldError('modules') }}
        </span>
      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'
import type { AdminRoleItem, AdminRolePayload } from '~/services/adminRolesAndAdminsService'

const props = defineProps<{
  initialData?: AdminRoleItem | null
  isEdit?: boolean
  roleId?: string | number
}>()

const router = useRouter()
const route = useRoute()

const {
  availableModules,
  isSavingRole,
  validationErrors,
  errorMessage,
  fetchRoles,
  saveRole
} = useAdminRolesAndAdmins()

const form = reactive({
  name: props.initialData?.name || '',
  modules: [...(props.initialData?.modules || [])],
  status: props.initialData?.status !== 0 && props.initialData?.status !== false
})

function populateForm(data: AdminRoleItem | null | undefined) {
  if (!data) return
  form.name = data.name || ''
  form.modules = [...(data.modules || [])]
  form.status = data.status !== 0 && data.status !== false
}

onMounted(async () => {
  await fetchRoles()
  if (props.initialData) {
    populateForm(props.initialData)
  }
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    populateForm(newVal)
  }
}, { immediate: true })

const isModuleSelected = (key: string) => {
  return form.modules.includes(key)
}

const toggleModule = (key: string) => {
  const idx = form.modules.indexOf(key)
  if (idx > -1) {
    form.modules.splice(idx, 1)
  } else {
    form.modules.push(key)
  }
}

const selectAllModules = () => {
  form.modules = availableModules.value.map(m => m.key)
}

const deselectAllModules = () => {
  form.modules = []
}

const getFieldError = (field: string): string => {
  if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) {
    return validationErrors.value[field][0]
  }
  return ''
}

const handleSubmit = async () => {
  if (!form.name.trim()) {
    alert('اسم الدور الوظيفي مطلوب')
    return
  }

  if (form.modules.length === 0) {
    alert('يرجى تحديد صلاحية قسم واحد على الأقل لهذا الدور')
    return
  }

  const payload: AdminRolePayload = {
    name: form.name.trim(),
    modules: form.modules,
    status: form.status ? 1 : 0
  }

  const targetId = props.roleId || props.initialData?.id || (props.isEdit ? (route.params.id as string) : undefined)
  const success = await saveRole(payload, targetId)
  if (success) {
    const isEnglish = route.path.startsWith('/en') || route.path.includes('/en/admin')
    const targetPath = isEnglish ? '/en/admin/roles' : '/admin/roles'
    await navigateTo(targetPath, { replace: true })
  }
}
</script>
