<template>
  <form @submit.prevent="save" class="space-y-6 pb-24 lg:pb-6 relative max-w-[1200px] mx-auto">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800">{{ isEdit ? 'تعديل بيانات المشرف' : 'إضافة مشرف جديد' }}</h1>
        <p class="text-sm text-slate-500 mt-1">قم بتعبئة بيانات المشرف وتحديد صلاحياته بدقة.</p>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <BaseButton 
          variant="primary" 
          class="w-full sm:w-auto justify-center shadow-sm" 
          :loading="isSubmitting"
          type="submit"
        >
          {{ isEdit ? 'حفظ التغييرات' : 'إضافة المشرف' }}
        </BaseButton>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
      
      <!-- Right Column: Basic Info & Security -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Basic Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-black text-slate-800 mb-6">البيانات الأساسية</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput 
              v-model="form.name" 
              label="اسم المشرف *" 
              placeholder="مثال: أحمد محمد"
              :error="errors.name"
            />
            
            <BaseInput 
              v-model="form.email" 
              label="البريد الإلكتروني *" 
              type="email"
              placeholder="ahmed@domain.com" 
              dir="ltr"
              :error="errors.email"
            />
          </div>
        </div>

        <!-- Security -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-black text-slate-800 mb-6">الأمان وكلمة المرور</h3>
          
          <div class="grid grid-cols-1 gap-6">
            <BaseInput 
              v-model="form.password" 
              :label="isEdit ? 'كلمة المرور الجديدة (اتركها فارغة إذا لم ترد التغيير)' : 'كلمة المرور *'" 
              type="password"
              placeholder="••••••••" 
              dir="ltr"
              :error="errors.password"
            />
            
            <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50">
              <div>
                <h4 class="font-bold text-slate-700">حالة الحساب</h4>
                <p class="text-xs text-slate-500 mt-1">تعطيل الحساب سيمنع المشرف من تسجيل الدخول للوحة التحكم.</p>
              </div>
              <BaseToggle v-model="form.isActive" />
            </div>
          </div>
        </div>
      </div>

      <!-- Left Column: Role & Permissions -->
      <div class="space-y-6">
        
        <!-- Role -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-black text-slate-800 mb-6">الرتبة</h3>
          <BaseSelect 
            v-model="form.role" 
            label="تحديد دور المشرف *"
            :options="roleOptions"
            :error="errors.role"
          />
        </div>

        <!-- Permissions -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <h3 class="text-lg font-black text-slate-800 mb-2">صلاحيات الوصول</h3>
          <p class="text-xs text-slate-500 mb-6 leading-relaxed">حدد الأقسام التي يمكن لهذا المشرف إدارتها. (تُطبق هذه الصلاحيات إذا لم يكن مديراً عاماً).</p>
          
          <div class="space-y-3" :class="{'opacity-50 pointer-events-none': form.role === 'admin'}">
            <label v-for="perm in permissionOptions" :key="perm.id" class="flex items-center gap-3 cursor-pointer group">
              <div class="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  :value="perm.id"
                  v-model="form.permissions"
                  class="peer sr-only"
                >
                <div class="w-5 h-5 rounded border-2 border-slate-300 peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors flex items-center justify-center">
                  <svg class="w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <span class="font-bold text-sm text-slate-700 group-hover:text-indigo-600 transition-colors select-none">
                {{ perm.label }}
              </span>
            </label>
          </div>
          <div v-if="form.role === 'admin'" class="mt-4 p-3 rounded-lg bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold text-center">
            المدير العام يملك كافة الصلاحيات افتراضياً.
          </div>
        </div>

      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  initialData?: any
}>()

const router = useRouter()
const { success } = useToast()

const isEdit = computed(() => !!props.initialData)
const isSubmitting = ref(false)

const roleOptions = [
  { value: 'admin', label: 'مدير عام (Admin)' },
  { value: 'manager', label: 'مدير متجر (Manager)' },
  { value: 'support', label: 'خدمة عملاء (Support)' }
]

const permissionOptions = [
  { id: 'products', label: 'إدارة المنتجات والتصنيفات' },
  { id: 'orders', label: 'إدارة الطلبات والشحن' },
  { id: 'customers', label: 'إدارة العملاء' },
  { id: 'coupons', label: 'إدارة الكوبونات والخصومات' },
  { id: 'settings', label: 'تعديل الإعدادات العامة' },
]

const form = reactive({
  name: '',
  email: '',
  password: '',
  role: 'support',
  isActive: true,
  permissions: [] as string[]
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  role: ''
})

onMounted(() => {
  if (isEdit.value && props.initialData) {
    Object.assign(form, props.initialData)
    // Clear password field for security
    form.password = ''
  }
})

const validate = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.password = ''
  errors.role = ''

  if (!form.name.trim()) {
    errors.name = 'الاسم مطلوب'
    isValid = false
  }
  
  if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) {
    errors.email = 'بريد إلكتروني غير صالح'
    isValid = false
  }

  if (!isEdit.value && !form.password) {
    errors.password = 'كلمة المرور مطلوبة للمشرفين الجدد'
    isValid = false
  } else if (form.password && form.password.length < 6) {
    errors.password = 'يجب أن لا تقل كلمة المرور عن 6 أحرف'
    isValid = false
  }

  return isValid
}

const save = async () => {
  if (!validate()) return

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  isSubmitting.value = false
  
  success(
    isEdit.value ? 'تم التعديل' : 'تمت الإضافة', 
    isEdit.value ? 'تم حفظ بيانات المشرف بنجاح.' : 'تم إضافة المشرف الجديد بنجاح.'
  )
  
  router.push('/dashboard/staff')
}
</script>
