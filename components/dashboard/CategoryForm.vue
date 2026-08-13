<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="flex flex-col xl:flex-row gap-6">
      <!-- Right Column: Main Data (Name & Hierarchy) -->
      <div class="flex-1 space-y-6">
        <!-- Basic Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">البيانات الأساسية</h3>
            <p class="text-sm text-slate-500">اسم التصنيف ومكانه في الشجرة الهرمية.</p>
          </div>
          
          <BaseInput 
            v-model="name"
            label="اسم التصنيف *"
            placeholder="مثال: غسالات تعبئة أمامية"
            :error="errors.name"
          />
          
          <div class="bg-slate-50/50 p-5 rounded-xl border border-slate-100 space-y-5 relative">
            <h4 class="font-bold text-slate-700 text-sm mb-2">موقع التصنيف (Hierarchy)</h4>
            
            <BaseSelect 
              v-model="parentMainCategory"
              label="التصنيف الرئيسي (اختياري)"
              :options="mainCategoriesOptions"
              placeholder="بدون (يعتبر هذا تصنيفاً رئيسياً)"
            />
            
            <Transition name="fade">
              <div v-if="parentMainCategory">
                <BaseSelect 
                  v-model="parentSubCategory"
                  label="التصنيف الفرعي (اختياري)"
                  :options="subCategoriesOptions"
                  placeholder="بدون (يعتبر هذا تصنيفاً فرعياً)"
                />
              </div>
            </Transition>
            
            <!-- Helper text -->
            <div class="text-xs font-bold px-3 py-2 rounded-lg mt-2 flex items-center gap-2" :class="hierarchyHelper.class">
              <span v-html="hierarchyHelper.icon" class="w-4 h-4 shrink-0"></span>
              <span>{{ hierarchyHelper.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Left Column: Icon/Image -->
      <div class="w-full xl:w-[350px] shrink-0 space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-4">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">أيقونة التصنيف</h3>
            <p class="text-sm text-slate-500">صورة أو أيقونة تعبر عن التصنيف.</p>
          </div>
          
          <ImageUploader 
            v-model="icon"
            label="صورة الغلاف / الأيقونة"
            :maxFiles="1"
          />
        </div>
      </div>
    </div>

    <!-- Form Actions / Sticky Footer -->
    <div class="sticky bottom-0 bg-white/90 backdrop-blur-md p-4 rounded-t-2xl border-t border-slate-200 flex items-center justify-between gap-4 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
      <NuxtLink to="/admin/categories" class="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
        إلغاء والعودة
      </NuxtLink>
      <BaseButton type="submit" variant="primary" :loading="isSubmitting" class="w-full sm:w-auto px-12">
        {{ isEditMode ? 'حفظ التعديلات' : 'إضافة التصنيف' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useRouter } from 'vue-router'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import { useToast } from '~/composables/useToast'

const props = defineProps<{
  isEditMode?: boolean
  initialData?: any
}>()

const router = useRouter()
const { success } = useToast()

// Raw Categories Data (Same structure as Products dropdown)
const categoriesData = ref([
  {
    id: 'cat_1',
    name: 'أجهزة كهربائية',
    children: [
      { id: 'cat_1_1', name: 'مكيفات' },
      { id: 'cat_1_2', name: 'ثلاجات' }
    ]
  },
  {
    id: 'cat_2',
    name: 'أجهزة المطبخ',
    children: [
      { id: 'cat_2_1', name: 'خلاطات' },
      { id: 'cat_2_2', name: 'عجانات' }
    ]
  }
])

// Filter out the category itself if editing, to prevent circular parenting
// For simplicity in this demo, we assume we just show the dropdowns. 
// A real app would recursively filter out `initialData.id` and its descendants.

// Dropdown Options
const mainCategoriesOptions = computed(() => [
  { value: '', label: 'بدون (تصنيف رئيسي)' },
  ...categoriesData.value.map(c => ({ value: c.id, label: c.name }))
])

const subCategoriesOptions = computed(() => {
  const options = [{ value: '', label: 'بدون (تصنيف فرعي)' }]
  if (!parentMainCategory.value) return options
  
  const mainCat = categoriesData.value.find(c => c.id === parentMainCategory.value)
  if (mainCat && mainCat.children) {
    mainCat.children.forEach(sub => {
      options.push({ value: sub.id, label: sub.name })
    })
  }
  return options
})

// Form Validation Setup
const schema = yup.object({
  name: yup.string().required('اسم التصنيف مطلوب'),
})

const { handleSubmit, errors, isSubmitting, setValues } = useForm({
  validationSchema: schema,
  initialValues: { 
    name: '',
    parentMainCategory: '',
    parentSubCategory: ''
  }
})

const { value: name } = useField<string>('name')
const { value: parentMainCategory } = useField<string>('parentMainCategory')
const { value: parentSubCategory } = useField<string>('parentSubCategory')
const icon = ref<File | string | null>(null)

// Watcher to reset subCategory when mainCategory changes
watch(parentMainCategory, (newVal) => {
  if (!newVal) {
    parentSubCategory.value = ''
  }
})

// Helper Text for Hierarchy context
const hierarchyHelper = computed(() => {
  if (!parentMainCategory.value) {
    return {
      text: 'أنت تقوم بإنشاء (تصنيف رئيسي) سيكون في المستوى الأول.',
      class: 'bg-indigo-50 text-indigo-700',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>'
    }
  } else if (parentMainCategory.value && !parentSubCategory.value) {
    return {
      text: 'أنت تقوم بإنشاء (تصنيف فرعي) سيكون تابعاً للتصنيف الرئيسي المختار.',
      class: 'bg-sky-50 text-sky-700',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
    }
  } else {
    return {
      text: 'أنت تقوم بإنشاء (تصنيف فرعي دقيق) سيكون في المستوى الثالث والأخير.',
      class: 'bg-slate-100 text-slate-700',
      icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>'
    }
  }
})

// Populate data if Edit Mode
onMounted(() => {
  if (props.isEditMode && props.initialData) {
    // In a real scenario, you'd map the `initialData.parentId` to figure out its main/sub parents.
    // For this demo, we'll just set the name.
    setValues({
      name: props.initialData.name,
      parentMainCategory: props.initialData.parentMainCategory || '',
      parentSubCategory: props.initialData.parentSubCategory || ''
    })
    icon.value = props.initialData.icon || null
  }
})

const onSubmit = handleSubmit(async (values) => {
  // Determine final parentId before sending to API
  const finalParentId = values.parentSubCategory || values.parentMainCategory || null
  
  await new Promise(resolve => setTimeout(resolve, 800))
  if (props.isEditMode) {
    success('تم التعديل!', 'تم تحديث بيانات التصنيف بنجاح.')
  } else {
    success('تمت الإضافة!', 'تم إنشاء التصنيف الجديد بنجاح.')
  }
  router.push('/admin/categories')
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
