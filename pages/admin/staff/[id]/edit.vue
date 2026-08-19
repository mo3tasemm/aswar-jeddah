<template>
  <div class="max-w-[1200px] mx-auto space-y-6 pb-24 lg:pb-6">
    
    <!-- Top Header & Navigation -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3">
        <NuxtLink 
          :to="backRoute"
          class="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-colors shadow-2xs cursor-pointer"
        >
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-2xl font-black text-slate-900">
            تعديل بيانات المشرف
          </h1>
          <p class="text-xs text-slate-500 mt-1 font-medium">
            تعديل الحساب وتعيين الدور الوظيفي وحالة التفعيل للمشرف #{{ adminId }}.
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          :to="backRoute" 
          class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          إلغاء
        </NuxtLink>
        <button 
          @click="submitForm"
          type="button"
          :disabled="isSubmitting || isLoading"
          class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg v-if="isSubmitting" class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>حفظ التغييرات</span>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm">
      <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-xs font-bold text-slate-600">جاري جلب وتعبئة بيانات المشرف...</span>
    </div>

    <!-- Error / Not Found -->
    <div v-else-if="!adminFound" class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100 shadow-sm">
      <div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 class="text-base font-black text-slate-800">تعذر العثور على بيانات المشرف (#{{ adminId }})</h3>
      <p class="text-xs text-slate-400 max-w-sm mx-auto">تأكد من صحة معرف المشرف وحاول مجدداً أو عد لقائمة المشرفين.</p>
      <NuxtLink :to="backRoute" class="inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs rounded-xl cursor-pointer shadow-sm transition-all">
        العودة لقائمة المشرفين
      </NuxtLink>
    </div>

    <!-- Main Content Form (Protected with v-if="adminFound") -->
    <form v-else @submit.prevent="submitForm" class="space-y-6">
      
      <!-- Top Error Notice if any -->
      <div v-if="formError" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>{{ formError }}</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        <!-- Right Column: Basic Info & Password -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Basic Info Card -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>البيانات الأساسية للمشرف</span>
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-xs font-black text-slate-800 mb-1.5">الاسم الكامل *</label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="مثال: أحمد محمد"
                  class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"
                  :class="errors.name ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                  required
                />
                <span v-if="errors.name" class="text-xs font-bold text-rose-500 block mt-1">
                  {{ errors.name }}
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
                  :class="errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                  required
                />
                <span v-if="errors.email" class="text-xs font-bold text-rose-500 block mt-1">
                  {{ errors.email }}
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
                  :class="errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                  required
                />
                <span v-if="errors.phone" class="text-xs font-bold text-rose-500 block mt-1">
                  {{ errors.phone }}
                </span>
              </div>
            </div>
          </div>

          <!-- Security & Password -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
            <h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>الأمان وتعديل كلمة المرور</span>
            </h2>
            
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-xs font-black text-slate-800 mb-1.5">
                  كلمة المرور الجديدة (اتركها فارغة إذا لم ترغب في تغييرها)
                </label>
                <input
                  v-model="form.password"
                  type="password"
                  dir="ltr"
                  placeholder="اتركه فارغاً للإبقاء على كلمة المرور الحالية"
                  class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400"
                  minlength="6"
                />
                <span v-if="errors.password" class="text-xs font-bold text-rose-500 block mt-1">
                  {{ errors.password }}
                </span>
              </div>
              
              <div class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50">
                <div>
                  <h4 class="font-black text-xs text-slate-800">حالة الحساب</h4>
                  <p class="text-[11px] text-slate-400 mt-0.5">تعطيل الحساب سيمنع المشرف من تسجيل الدخول للوحة التحكم فوراً.</p>
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
            <h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>الدور الوظيفي والصلاحيات</span>
            </h2>

            <div>
              <label class="block text-xs font-black text-slate-800 mb-1.5">تحديد الدور الوظيفي *</label>
              <select 
                v-model="form.admin_role_id" 
                class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
                :class="errors.admin_role_id ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'"
                required
              >
                <option value="" disabled>اختر الدور الوظيفي...</option>
                <option v-for="r in (roles || [])" :key="r.id" :value="r.id">
                  {{ r.name }} {{ r.modules ? `(${r.modules.length} صلاحيات)` : '' }}
                </option>
              </select>
              <span v-if="errors.admin_role_id" class="text-xs font-bold text-rose-500 block mt-1">
                {{ errors.admin_role_id }}
              </span>
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminRolesAndAdmins } from '~/composables/useAdminRolesAndAdmins'
import { useToast } from '~/composables/useToast'
import type { AdminUserPayload } from '~/services/adminRolesAndAdminsService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'تعديل بيانات المشرف | لوحة التحكم'
})

const route = useRoute()
const { success: showSuccessToast, error: showErrorToast } = useToast()
const { roles, fetchRoles, fetchAdminDetails, saveAdmin } = useAdminRolesAndAdmins()

const adminId = computed(() => route.params.id as string)
const isEnglish = computed(() => route.path.startsWith('/en') || route.path.includes('/en/admin'))
const backRoute = computed(() => isEnglish.value ? '/en/admin/admins' : '/admin/admins')

const isLoading = ref(true)
const isSubmitting = ref(false)
const adminFound = ref(false)
const formError = ref('')

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  admin_role_id: '' as string | number,
  status: true
})

const errors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  admin_role_id: ''
})

onMounted(async () => {
  isLoading.value = true
  try {
    // 1. Fetch roles
    await fetchRoles()

    // 2. Fetch admin details / find from list
    const admin = await fetchAdminDetails(adminId.value)
    if (admin) {
      adminFound.value = true
      form.name = admin.name || ''
      form.email = admin.email || ''
      form.phone = admin.phone || ''
      form.password = ''
      form.admin_role_id = admin.admin_role_id || admin.role_id || (admin.role ? admin.role.id : '')
      form.status = admin.status !== 0 && admin.status !== false
    } else {
      adminFound.value = false
    }
  } catch (err: any) {
    console.error('[AdminEdit] Error loading admin:', err)
    adminFound.value = false
  } finally {
    isLoading.value = false
  }
})

const selectedRole = computed(() => {
  if (!form.admin_role_id || !roles.value) return null
  return roles.value.find(r => String(r.id) === String(form.admin_role_id)) || null
})

const validate = (): boolean => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.phone = ''
  errors.password = ''
  errors.admin_role_id = ''

  if (!form.name.trim()) {
    errors.name = 'اسم المشرف مطلوب'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'البريد الإلكتروني مطلوب'
    isValid = false
  }

  if (!form.phone.trim()) {
    errors.phone = 'رقم الهاتف مطلوب'
    isValid = false
  }

  if (!form.admin_role_id) {
    errors.admin_role_id = 'يرجى تحديد الدور الوظيفي'
    isValid = false
  }

  if (form.password && form.password.length < 6) {
    errors.password = 'يجب أن لا تقل كلمة المرور عن 6 أحرف'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validate()) return

  isSubmitting.value = true
  formError.value = ''

  const payload: AdminUserPayload = {
    name: form.name.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    admin_role_id: form.admin_role_id,
    status: form.status ? 1 : 0
  }

  // Only send password if user provided a new one
  if (form.password && form.password.trim()) {
    payload.password = form.password.trim()
  }

  try {
    const isSuccess = await saveAdmin(payload, adminId.value)
    if (isSuccess) {
      showSuccessToast('تم بنجاح', 'تم حفظ تعديلات المشرف بنجاح!')
      const target = isEnglish.value ? '/en/admin/admins' : '/admin/admins'
      await navigateTo(target, { replace: true })
    }
  } catch (err: any) {
    formError.value = err.message || 'حدث خطأ أثناء حفظ التعديلات'
    showErrorToast('خطأ', formError.value)
  } finally {
    isSubmitting.value = false
  }
}
</script>
