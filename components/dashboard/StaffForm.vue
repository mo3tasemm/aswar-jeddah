<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 pb-24 lg:pb-6 relative max-w-[1200px] mx-auto">
    
    <!-- Header & Top Actions -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink 
          to="/admin/staff"
          class="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-colors shadow-2xs cursor-pointer"
        >
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-900">
            {{ isEdit ? 'تعديل بيانات المشرف' : 'إضافة مشرف جديد' }}
          </h1>
          <p class="text-xs text-slate-500 mt-1 font-medium">قم بتعبئة بيانات المشرف وتحديد الدور الوظيفي للتحكم بالصلاحيات.</p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          to="/admin/staff" 
          class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          إلغاء
        </NuxtLink>
        <button 
          type="submit"
          class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          :disabled="isSavingAdmin"
        >
          <svg v-if="isSavingAdmin" class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isEdit ? 'حفظ التغييرات' : 'إضافة المشرف' }}</span>
        </button>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      <!-- Right Column: Basic Info & Security -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Basic Info -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>البيانات الأساسية</span>
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-black text-slate-800 mb-1.5">الاسم الكامل *</label>
              <input
                v-model="form.name"
                type="text"
                placeholder="مثال: أحمد محمد"
                class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"
                :class="getFieldError('name') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                required
              />
              <span v-if="getFieldError('name')" class="text-xs font-bold text-rose-500 block mt-1">
                {{ getFieldError('name') }}
              </span>
            </div>
            
            <div>
              <label class="block text-xs font-black text-slate-800 mb-1.5">البريد الإلكتروني *</label>
              <input
                v-model="form.email"
                type="email"
                dir="ltr"
                placeholder="ahmed@aswar.com"
                class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"
                :class="getFieldError('email') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                required
              />
              <span v-if="getFieldError('email')" class="text-xs font-bold text-rose-500 block mt-1">
                {{ getFieldError('email') }}
              </span>
            </div>

            <div class="md:col-span-2">
              <label class="block text-xs font-black text-slate-800 mb-1.5">رقم الهاتف *</label>
              <input
                v-model="form.phone"
                type="tel"
                dir="ltr"
                placeholder="0501234567"
                class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"
                :class="getFieldError('phone') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                required
              />
              <span v-if="getFieldError('phone')" class="text-xs font-bold text-rose-500 block mt-1">
                {{ getFieldError('phone') }}
              </span>
            </div>
          </div>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>الأمان وكلمة المرور</span>
          </h3>
          
          <div class="grid grid-cols-1 gap-4">
            <div>
              <label class="block text-xs font-black text-slate-800 mb-1.5">
                كلمة المرور {{ isEdit ? '(اتركها فارغة للإبقاء على الحالية)' : '*' }}
              </label>
              <input
                v-model="form.password"
                type="password"
                dir="ltr"
                :placeholder="isEdit ? 'اتركه فارغاً للإبقاء على كلمة المرور الحالية' : '6 خانات على الأقل...'"
                class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"
                :class="getFieldError('password') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                :required="!isEdit"
                minlength="6"
              />
              <span v-if="getFieldError('password')" class="text-xs font-bold text-rose-500 block mt-1">
                {{ getFieldError('password') }}
              </span>
            </div>
            
            <div class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50">
              <div>
                <h4 class="font-black text-xs text-slate-800">حالة الحساب</h4>
                <p class="text-[11px] text-slate-400 mt-0.5">تعطيل الحساب سيمنع المشرف من تسجيل الدخول فوراً.</p>
              </div>
              <BaseToggle v-model="form.status" />
            </div>
          </div>
        </div>
      </div>

      <!-- Left Column: Role & Permissions Info -->
      <div class="space-y-6">
        
        <!-- Role Selection -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>الدور الوظيفي والصلاحيات</span>
          </h3>

          <div>
            <label class="block text-xs font-black text-slate-800 mb-1.5">تحديد الدور الوظيفي *</label>
            <select 
              v-model="form.admin_role_id" 
              class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
              :class="getFieldError('admin_role_id') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'"
              required
            >
              <option value="" disabled>اختر الدور الوظيفي...</option>
              <option v-for="r in (roles || [])" :key="r.id" :value="r.id">
                {{ r.name }} {{ r.modules ? `(${r.modules.length} صلاحيات)` : '' }}
              </option>
            </select>
          </div>

          <div v-if="selectedRole" class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2">
            <div class="text-xs font-black text-amber-900 flex items-center justify-between">
              <span>صلاحيات هذا الدور:</span>
              <span class="text-[10px] font-bold font-mono">{{ selectedRole.modules?.length || 0 }} أقسام</span>
            </div>
            <div class="flex flex-wrap gap-1 pt-1">
              <span 
                v-for="m in (selectedRole.modules || [])" 
                :key="m"
                class="px-2 py-0.5 bg-white text-amber-900 border border-amber-200 rounded-md text-[10px] font-bold"
              >
                {{ m }}
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'
import type { AdminUserItem, AdminUserPayload } from '~/services/adminRolesAndAdminsService'

const props = defineProps<{
  initialData?: AdminUserItem | null
}>()

const router = useRouter()
const route = useRoute()
const isEdit = computed(() => !!props.initialData)

const {
  roles,
  isSavingAdmin,
  validationErrors,
  fetchRoles,
  saveAdmin
} = useAdminRolesAndAdmins()

const form = reactive({
  name: props.initialData?.name || '',
  email: props.initialData?.email || '',
  phone: props.initialData?.phone || '',
  password: '',
  admin_role_id: props.initialData?.admin_role_id || props.initialData?.role_id || ('' as string | number),
  status: props.initialData?.status !== 0 && props.initialData?.status !== false
})

function populateForm(data: AdminUserItem | null | undefined) {
  if (!data) return
  form.name = data.name || ''
  form.email = data.email || ''
  form.phone = data.phone || ''
  form.password = ''
  form.admin_role_id = data.admin_role_id || data.role_id || ''
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

const selectedRole = computed(() => {
  if (!form.admin_role_id || !roles.value) return null
  return roles.value.find(r => String(r.id) === String(form.admin_role_id)) || null
})

const getFieldError = (field: string): string => {
  if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) {
    return validationErrors.value[field][0]
  }
  return ''
}

const handleSubmit = async () => {
  if (!isEdit.value && (!form.password || form.password.length < 6)) {
    alert('كلمة المرور مطلوبة ويجب أن تتكون من 6 خانات على الأقل')
    return
  }

  const payload: AdminUserPayload = {
    name: form.name,
    email: form.email,
    phone: form.phone,
    admin_role_id: form.admin_role_id,
    status: form.status ? 1 : 0
  }

  if (form.password && form.password.trim()) {
    payload.password = form.password.trim()
  }

  const targetId = props.initialData?.id || (route.params.id as string)
  const success = await saveAdmin(payload, targetId)
  if (success) {
    const isEnglish = route.path.startsWith('/en') || route.path.includes('/en/admin')
    const targetPath = isEnglish ? '/en/admin/staff' : '/admin/staff'
    await navigateTo(targetPath, { replace: true })
  }
}
</script>
