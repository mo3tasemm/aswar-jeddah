<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-slate-800">{{ isEdit ? 'تعديل الكوبون' : 'إضافة كوبون جديد' }}</h2>
        <p class="text-sm text-slate-500 mt-1">قم بتحديد شروط وأحكام هذا الكوبون.</p>
      </div>
      <div class="flex items-center gap-3">
        <BaseButton variant="outline" type="button" @click="$router.push('/dashboard/coupons')" class="bg-white">إلغاء</BaseButton>
        <BaseButton variant="primary" type="submit" :loading="isSubmitting">
          {{ isEdit ? 'حفظ التعديلات' : 'إضافة الكوبون' }}
        </BaseButton>
      </div>
    </div>

    <div class="space-y-6 w-full">
      
      <!-- Basic Info -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-lg font-black text-slate-800 border-b border-slate-100 pb-4">البيانات الأساسية</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="md:col-span-1">
            <BaseInput 
              v-model="form.code"
              label="كود الكوبون *"
              placeholder="مثال: SUMMER2026"
              :error="errors.code"
              class="font-mono"
              dir="ltr"
            />
            <p class="text-xs text-slate-500 mt-2 text-right">يجب أن يحتوي على أحرف إنجليزية وأرقام فقط (بدون مسافات).</p>
          </div>
          <BaseSelect 
            v-model="form.discountType"
            label="نوع الخصم *"
            :options="discountTypeOptions"
            class="md:col-span-1"
          />
          <BaseInput 
            v-model="form.discountValue"
            label="قيمة الخصم *"
            type="number"
            min="0"
            placeholder="0"
            :error="errors.discountValue"
            class="md:col-span-1"
          >
            <template #icon>
              <span class="text-slate-400 font-bold px-3">
                {{ form.discountType === 'percentage' ? '%' : 'ر.س' }}
              </span>
            </template>
          </BaseInput>
        </div>
      </div>

      <!-- Usage Limits -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-lg font-black text-slate-800 border-b border-slate-100 pb-4">شروط الاستخدام</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput 
            v-model="form.minOrder"
            label="الحد الأدنى للطلب (اختياري)"
            type="number"
            min="0"
            placeholder="0"
          >
            <template #icon>
              <span class="text-slate-400 font-bold px-3">ر.س</span>
            </template>
          </BaseInput>
          
          <BaseInput 
            v-model="form.usageLimit"
            label="الحد الأقصى للاستخدام الإجمالي (اختياري)"
            type="number"
            min="0"
            placeholder="اتركه فارغاً لعدد غير محدود"
          />
        </div>
      </div>

      <!-- Dates -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-lg font-black text-slate-800 border-b border-slate-100 pb-4">تاريخ الصلاحية</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BaseInput 
            v-model="form.startDate"
            label="تاريخ البدء"
            type="date"
            :error="errors.startDate"
          />
          
          <BaseInput 
            v-model="form.expiryDate"
            label="تاريخ الانتهاء"
            type="date"
            :error="errors.expiryDate"
          />
        </div>
      </div>

      <!-- Status -->
      <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-lg font-black text-slate-800 border-b border-slate-100 pb-4">حالة الكوبون</h3>
        
        <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors w-full md:w-1/2">
          <div class="flex items-center gap-2">
            <span class="font-bold text-slate-700">تفعيل الكوبون</span>
          </div>
          <BaseToggle v-model="form.isActive" />
        </div>
        <p class="text-xs text-slate-500">إيقاف التفعيل سيمنع العملاء من استخدام هذا الكوبون فوراً حتى لو لم ينته تاريخ صلاحيته.</p>
      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
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

const discountTypeOptions = [
  { value: 'percentage', label: 'نسبة مئوية (%)' },
  { value: 'fixed', label: 'مبلغ ثابت (ر.س)' }
]

const form = reactive({
  code: '',
  discountType: 'percentage',
  discountValue: '',
  minOrder: '',
  usageLimit: '',
  startDate: new Date().toISOString().split('T')[0],
  expiryDate: '',
  isActive: true
})

const errors = reactive({
  code: '',
  discountValue: '',
  startDate: '',
  expiryDate: ''
})

onMounted(() => {
  if (props.initialData) {
    Object.assign(form, props.initialData)
  }
})

const validate = () => {
  let isValid = true
  errors.code = ''
  errors.discountValue = ''
  
  if (!form.code) {
    errors.code = 'كود الكوبون مطلوب'
    isValid = false
  } else if (!/^[A-Za-z0-9]+$/.test(form.code)) {
    errors.code = 'الكود يجب أن يحتوي على أحرف إنجليزية وأرقام فقط'
    isValid = false
  }

  if (!form.discountValue || Number(form.discountValue) <= 0) {
    errors.discountValue = 'قيمة الخصم يجب أن تكون أكبر من صفر'
    isValid = false
  }

  if (form.discountType === 'percentage' && Number(form.discountValue) > 100) {
    errors.discountValue = 'النسبة المئوية لا يمكن أن تتجاوز 100%'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validate()) return

  isSubmitting.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 800))
  
  isSubmitting.value = false
  success(
    isEdit.value ? 'تم التعديل' : 'تمت الإضافة', 
    isEdit.value ? 'تم حفظ تعديلات الكوبون بنجاح.' : 'تم إضافة الكوبون الجديد بنجاح.'
  )
  router.push('/dashboard/coupons')
}
</script>
