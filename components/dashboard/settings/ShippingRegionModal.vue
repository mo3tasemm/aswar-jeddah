<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" @click="close"></div>
    
    <!-- Modal -->
    <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
        <h3 class="text-lg font-black text-slate-800">{{ isEdit ? 'تعديل منطقة الشحن' : 'إضافة منطقة شحن جديدة' }}</h3>
        <button @click="close" class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 overflow-y-auto flex-1 space-y-6">
        <BaseInput 
          v-model="form.name" 
          label="اسم المحافظة / المدينة *" 
          placeholder="مثال: الرياض"
          :error="errors.name"
        />
        
        <BaseInput 
          v-model="form.cost" 
          label="تكلفة الشحن *" 
          type="number" 
          min="0"
          placeholder="0"
          :error="errors.cost"
        >
          <template #icon><span class="text-slate-400 font-bold px-3">ر.س</span></template>
        </BaseInput>
        
        <BaseInput 
          v-model="form.estimatedTime" 
          label="الوقت المتوقع للتوصيل *" 
          placeholder="مثال: 2 - 3 أيام عمل"
          :error="errors.estimatedTime"
        />

        <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="font-bold text-slate-700">تفعيل هذه المنطقة</h4>
              <p class="text-xs text-slate-500 mt-1">إذا تم التعطيل، لن يتمكن العملاء من هذه المنطقة من إتمام الطلب.</p>
            </div>
            <BaseToggle v-model="form.isActive" />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="p-6 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
        <BaseButton variant="outline" @click="close" class="bg-white">إلغاء</BaseButton>
        <BaseButton variant="primary" @click="save" :loading="isSubmitting">حفظ البيانات</BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  isOpen: boolean
  regionData?: any
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  'save': [data: any]
}>()

const { success } = useToast()

const isEdit = computed(() => !!props.regionData)
const isSubmitting = ref(false)

const form = reactive({
  id: '',
  name: '',
  cost: '',
  estimatedTime: '',
  isActive: true
})

const errors = reactive({
  name: '',
  cost: '',
  estimatedTime: ''
})

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.regionData) {
      Object.assign(form, props.regionData)
    } else {
      Object.assign(form, {
        id: '',
        name: '',
        cost: '',
        estimatedTime: '',
        isActive: true
      })
    }
    // Clear errors
    Object.keys(errors).forEach(key => (errors as any)[key] = '')
  }
})

const validate = () => {
  let isValid = true
  errors.name = ''
  errors.cost = ''
  errors.estimatedTime = ''

  if (!form.name.trim()) {
    errors.name = 'اسم المنطقة مطلوب'
    isValid = false
  }
  if (form.cost === '' || Number(form.cost) < 0) {
    errors.cost = 'تكلفة الشحن مطلوبة'
    isValid = false
  }
  if (!form.estimatedTime.trim()) {
    errors.estimatedTime = 'الوقت المتوقع مطلوب'
    isValid = false
  }

  return isValid
}

const close = () => {
  emit('update:isOpen', false)
}

const save = async () => {
  if (!validate()) return

  isSubmitting.value = true
  // Simulate API
  await new Promise(resolve => setTimeout(resolve, 600))
  isSubmitting.value = false
  
  emit('save', { ...form, id: form.id || Date.now().toString() })
  success(isEdit.value ? 'تم التعديل' : 'تمت الإضافة', 'تم حفظ بيانات منطقة الشحن بنجاح.')
  close()
}
</script>
