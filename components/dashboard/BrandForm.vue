<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="flex flex-col xl:flex-row gap-6">
      
      <!-- Right Column: Main Data -->
      <div class="flex-1 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">بيانات العلامة التجارية</h3>
            <p class="text-sm text-slate-500">أدخل تفاصيل واسم العلامة التجارية ليتمكن العملاء من تصفح منتجاتها.</p>
          </div>
          
          <div class="space-y-5">
            <BaseInput 
              v-model="name"
              label="اسم البراند *"
              placeholder="مثال: سامسونج"
              :error="errors.name"
            />
            
            <!-- Description uses BaseRichText or textarea. We can use a standard input or textarea. We will use a standard input here as before, or maybe a textarea if we had one. Let's stick to BaseInput but maybe allow multiline if supported, otherwise just string. -->
            <BaseInput 
              v-model="description"
              label="وصف مختصر (اختياري)"
              placeholder="وصف أو شعار لفظي للبراند..."
            />
          </div>
        </div>
      </div>

      <!-- Left Column: Logo Uploader -->
      <div class="w-full xl:w-[350px] shrink-0 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">شعار البراند</h3>
            <p class="text-sm text-slate-500">ارفع شعاراً واضحاً وبجودة عالية.</p>
          </div>
          
          <ImageUploader 
            v-model="logo"
            label="الشعار (Logo) *"
            :maxFiles="1"
            :error="errors.logo"
          />
        </div>
      </div>
      
    </div>

    <!-- Form Actions / Sticky Footer -->
    <div class="sticky bottom-0 bg-white/90 backdrop-blur-md p-4 rounded-t-2xl border-t border-slate-200 flex items-center justify-between gap-4 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
      <NuxtLink to="/admin/brands" class="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
        إلغاء والعودة
      </NuxtLink>
      <BaseButton type="submit" variant="primary" :loading="isSubmitting" class="w-full sm:w-auto px-12">
        {{ isEditMode ? 'حفظ التعديلات' : 'إضافة البراند' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  isEditMode?: boolean
  initialData?: any
}>()

const router = useRouter()
const { success } = useToast()

const schema = yup.object({
  name: yup.string().required('اسم البراند مطلوب'),
})

const { handleSubmit, errors, isSubmitting, setValues } = useForm({
  validationSchema: schema,
  initialValues: { name: '' }
})

const { value: name } = useField<string>('name')
const description = ref('')
const logo = ref<File | string | null>(null)

onMounted(() => {
  if (props.isEditMode && props.initialData) {
    setValues({ name: props.initialData.name })
    description.value = props.initialData.description || ''
    logo.value = props.initialData.logo || null
  }
})

const onSubmit = handleSubmit(async (values) => {
  if (!logo.value) {
    errors.logo = 'شعار البراند مطلوب'
    return
  }

  await new Promise(resolve => setTimeout(resolve, 800))
  if (props.isEditMode) {
    success('تم التعديل!', 'تم تحديث بيانات البراند بنجاح.')
  } else {
    success('تمت الإضافة!', 'تم إضافة البراند الجديد بنجاح.')
  }
  router.push('/admin/brands')
})
</script>
