<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <div>
            <h3 class="font-black text-slate-900 text-base">
              {{ isEdit ? 'تعديل بيانات المشرف' : 'إضافة مشرف جديد للوحة التحكم' }}
            </h3>
            <p class="text-xs text-slate-400 font-medium">أدخل بيانات الحساب وحدد الدور الوظيفي للتحكم بالصلاحيات.</p>
          </div>
        </div>

        <button 
          @click="closeModal" 
          class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
        
        <!-- Full Name -->
        <div>
          <label class="block text-xs font-black text-slate-800 mb-1.5">
            الاسم الكامل (Full Name) *
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="مثال: أحمد محمد، سارة علي..."
            class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"
            :class="getFieldError('name') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
            required
          />
          <span v-if="getFieldError('name')" class="text-xs font-bold text-rose-500 block mt-1">
            {{ getFieldError('name') }}
          </span>
        </div>

        <!-- Email & Phone Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <!-- Email -->
          <div>
            <label class="block text-xs font-black text-slate-800 mb-1.5">
              البريد الإلكتروني *
            </label>
            <input
              v-model="form.email"
              type="email"
              dir="ltr"
              placeholder="admin@aswar.com"
              class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"
              :class="getFieldError('email') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
              required
            />
            <span v-if="getFieldError('email')" class="text-xs font-bold text-rose-500 block mt-1">
              {{ getFieldError('email') }}
            </span>
          </div>

          <!-- Phone -->
          <div>
            <label class="block text-xs font-black text-slate-800 mb-1.5">
              رقم الهاتف *
            </label>
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

        <!-- Role Selection Dropdown -->
        <div>
          <label class="block text-xs font-black text-slate-800 mb-1.5">
            الدور الوظيفي (Role) *
          </label>
          <select
            v-model="form.admin_role_id"
            class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"
            :class="getFieldError('admin_role_id') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'"
            required
          >
            <option value="" disabled>اختر الدور الوظيفي...</option>
            <option v-for="r in roles" :key="r.id" :value="r.id">
              {{ r.name }} {{ r.modules ? `(${r.modules.length} صلاحيات)` : '' }}
            </option>
          </select>
          <span v-if="getFieldError('admin_role_id')" class="text-xs font-bold text-rose-500 block mt-1">
            {{ getFieldError('admin_role_id') }}
          </span>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-xs font-black text-slate-800 mb-1.5">
            كلمة المرور {{ isEdit ? '(اختيارية عند التعديل)' : '*' }}
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

        <!-- Active Status -->
        <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs font-black text-slate-800 block">حالة الحساب</span>
            <span class="text-[11px] text-slate-400 font-medium">الحسابات المعطلة تفقد القدرة على تسجيل الدخول فوراً</span>
          </div>
          <BaseToggle v-model="form.status" />
        </div>

        <!-- Modal Footer -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isEdit ? 'حفظ التعديلات' : 'إضافة المشرف' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import type { AdminUserItem, AdminUserPayload, AdminRoleItem } from '~/services/adminRolesAndAdminsService'

const props = defineProps<{
  isOpen: boolean
  isEdit?: boolean
  adminData?: AdminUserItem | null
  roles: AdminRoleItem[]
  isSubmitting?: boolean
  validationErrors?: Record<string, string[]>
}>()

const emit = defineEmits<{
  'close': []
  'submit': [payload: AdminUserPayload]
}>()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  admin_role_id: '' as string | number,
  password: '',
  status: true
})

watch(() => props.adminData, (newVal) => {
  if (newVal) {
    form.name = newVal.name || ''
    form.email = newVal.email || ''
    form.phone = newVal.phone || ''
    form.admin_role_id = newVal.admin_role_id || newVal.role_id || ''
    form.password = ''
    form.status = newVal.status !== 0 && newVal.status !== false
  } else {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.admin_role_id = props.roles.length > 0 ? props.roles[0].id : ''
    form.password = ''
    form.status = true
  }
}, { immediate: true })

watch(() => props.isOpen, (open) => {
  if (open && !props.adminData) {
    form.name = ''
    form.email = ''
    form.phone = ''
    form.admin_role_id = props.roles.length > 0 ? props.roles[0].id : ''
    form.password = ''
    form.status = true
  }
})

const getFieldError = (field: string): string => {
  if (props.validationErrors && props.validationErrors[field] && props.validationErrors[field].length > 0) {
    return props.validationErrors[field][0]
  }
  return ''
}

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  if (!props.isEdit && (!form.password || form.password.length < 6)) {
    alert('كلمة المرور يجب أن تتكون من 6 خانات على الأقل')
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

  emit('submit', payload)
}
</script>
