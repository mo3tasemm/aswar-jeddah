<template>
  <form @submit="onSubmit" class="space-y-6">
    <div class="flex flex-col xl:flex-row gap-6 w-full">
      <!-- Main Content Area (Right Column in RTL) -->
      <div class="flex-1 space-y-6 min-w-0">
        
        <!-- Basic Information Card -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">البيانات الأساسية</h3>
            <p class="text-sm text-slate-500">أدخل معلومات المنتج الأساسية وتفاصيله.</p>
          </div>
          
          <div class="space-y-5">
            <BaseInput 
              v-model="name"
              label="اسم المنتج *"
              placeholder="مثال: غسالة سامسونج 9 كيلو..."
              :error="errors.name"
            />
            
            <BaseRichText 
              v-model="description"
              label="الوصف التفصيلي *"
              :error="errors.description"
            />
          </div>
        </div>

        <!-- Dynamic Variants Section -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 class="text-lg font-black text-slate-800 mb-1">الخصائص المتغيرة (Variants)</h3>
              <p class="text-sm text-slate-500">أضف خيارات متعددة للمنتج مثل اللون أو المقاس.</p>
            </div>
            <BaseButton variant="secondary" size="sm" type="button" @click="addVariant" class="gap-1 shrink-0">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              إضافة خاصية
            </BaseButton>
          </div>

          <div v-if="variants.length === 0" class="text-center py-8 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            <p class="text-sm font-bold text-slate-500">لا توجد خصائص إضافية لهذا المنتج.</p>
          </div>
          
          <div v-else class="space-y-4">
            <div 
              v-for="(variant, index) in variants" 
              :key="index"
              class="flex flex-col sm:flex-row gap-4 p-5 border border-slate-100 rounded-xl bg-slate-50 relative group"
            >
              <button 
                type="button" 
                @click="removeVariant(index)"
                class="absolute left-3 top-3 w-7 h-7 rounded-md bg-white border border-red-100 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors shadow-sm"
                title="حذف"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div class="flex-1">
                <BaseInput 
                  v-model="variant.name"
                  label="اسم الخاصية"
                  placeholder="مثال: المقاس"
                />
              </div>
              <div class="flex-[2]">
                <BaseInput 
                  v-model="variant.values"
                  label="القيم (مفصولة بفاصلة)"
                  placeholder="S, M, L, XL"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Media Upload Card (Gallery) -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">معرض الصور (Gallery)</h3>
            <p class="text-sm text-slate-500">ارفع صوراً إضافية توضح زوايا وتفاصيل المنتج.</p>
          </div>
          
          <ImageUploader 
            v-model="galleryImages"
          />
        </div>

      </div>

      <!-- Sidebar Area (Left Column in RTL) -->
      <div class="w-full xl:w-[380px] shrink-0 space-y-6">
        
        <!-- Featured Image Card -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">صورة الغلاف (Featured)</h3>
            <p class="text-sm text-slate-500">ستكون الصورة الرئيسية المعروضة في القوائم.</p>
          </div>
          
          <ImageUploader 
            v-model="featuredImage"
            :maxFiles="1"
            :error="errors.featuredImage"
          />
        </div>

        <!-- Organization Card (Cascading Categories) -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <div>
            <h3 class="text-lg font-black text-slate-800 mb-1">التنظيم</h3>
            <p class="text-sm text-slate-500">حدد أين سيظهر المنتج.</p>
          </div>
          
          <div class="space-y-4">
            <BaseSelect 
              v-model="mainCategory"
              label="التصنيف الرئيسي *"
              :options="mainCategoryOptions"
              :error="errors.mainCategory"
            />
            
            <BaseSelect 
              v-if="mainCategory"
              v-model="subCategory"
              label="التصنيف الفرعي *"
              :options="subCategoryOptions"
              :error="errors.subCategory"
            />

            <BaseSelect 
              v-if="subCategory"
              v-model="subSubCategory"
              label="تصنيف دقيق (اختياري)"
              :options="subSubCategoryOptions"
            />
            
            <BaseInput 
              v-model="sku"
              label="رقم التتبع (SKU)"
              placeholder="مثال: PRD-001"
            />
          </div>

          <!-- Brand -->
          <div class="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h4 class="font-bold text-slate-700 text-sm mb-3">العلامة التجارية</h4>
            <BaseSelect 
              v-model="brandId"
              label="براند المنتج (اختياري)"
              :options="brandOptions"
              placeholder="اختر العلامة التجارية"
            />
          </div>
        </div>

        <!-- Pricing Card -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 class="text-lg font-black text-slate-800">التسعير والمخزون</h3>
          
          <div class="space-y-4">
            <BaseInput 
              v-model="price"
              label="السعر الأساسي (ر.س) *"
              type="number"
              placeholder="0.00"
              :error="errors.price"
            />
            
            <BaseInput 
              v-model="discountPrice"
              label="سعر التخفيض (اختياري)"
              type="number"
              placeholder="0.00"
            />
            
            <BaseInput 
              v-model="stock"
              label="كمية المخزون *"
              type="number"
              placeholder="0"
              :error="errors.stock"
            />
          </div>
        </div>

      </div>
    </div>
    
    <!-- Form Actions / Sticky Footer -->
    <div class="sticky bottom-0 bg-white/90 backdrop-blur-md p-4 rounded-t-2xl border-t border-slate-200 flex items-center justify-between gap-4 z-40 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
      <NuxtLink to="/admin/products" class="text-sm font-bold text-slate-500 hover:text-slate-700 transition-colors">
        إلغاء والعودة
      </NuxtLink>
      <BaseButton type="submit" variant="primary" :loading="isSubmitting" class="w-full sm:w-auto px-12">
        {{ isEditMode ? 'حفظ التعديلات' : 'إضافة المنتج' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import BaseRichText from '~/components/dashboard/ui/BaseRichText.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import { useToast } from '~/composables/useToast'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isEditMode?: boolean
  initialData?: any
}>()

const { success } = useToast()
const router = useRouter()

// --- Mock Categories Hierarchical Data ---
const categoriesData = [
  {
    id: 'electronics', label: 'أجهزة كهربائية', children: [
      { id: 'ac', name: 'مكيفات', children: [{ id: 'split', name: 'سبليت' }, { id: 'window', name: 'شباك' }] },
      { id: 'fridge', name: 'ثلاجات', children: [{ id: 'top_mount', name: 'فريزر علوي' }, { id: 'side_by_side', name: 'بابين' }] },
    ]
  }
]

const mainCategoryOptions = categoriesData.map(c => ({ value: c.id, label: c.label }))

// Yup Validation Schema
const schema = yup.object({
  name: yup.string().required('اسم المنتج مطلوب'),
  description: yup.string().required('وصف المنتج مطلوب'),
  mainCategory: yup.string().required('التصنيف الرئيسي مطلوب'),
  subCategory: yup.string().required('التصنيف الفرعي مطلوب'),
  price: yup.number()
    .typeError('السعر يجب أن يكون رقماً')
    .positive('يجب أن يكون السعر أكبر من صفر')
    .required('السعر مطلوب'),
  stock: yup.number()
    .typeError('الكمية يجب أن تكون رقماً')
    .integer('يجب أن يكون عدداً صحيحاً')
    .min(0, 'الكمية لا يمكن أن تكون سالبة')
    .required('كمية المخزون مطلوبة'),
})

// Setup vee-validate form
const { handleSubmit, errors, isSubmitting, setValues } = useForm({
  validationSchema: schema,
  initialValues: { 
    name: '', sku: '', price: 0, discountPrice: 0, stock: 0, 
    mainCategory: '', subCategory: '', subSubCategory: '', brandId: '' 
  }
})

// Fields
const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: sku } = useField<string>('sku')
const { value: price } = useField<number>('price')
const { value: discountPrice } = useField<number>('discountPrice')
const { value: stock } = useField<number>('stock')
const { value: mainCategory } = useField<string>('mainCategory')
const { value: subCategory } = useField<string>('subCategory')
const { value: subSubCategory } = useField<string>('subSubCategory')
const { value: brandId } = useField<string>('brandId')

// Non-validated or custom validated fields
const featuredImage = ref<File | string | null>(null)
const galleryImages = ref<(File|string)[]>([])
const variants = ref<{ name: string; values: string }[]>([])

// Populate data if Edit Mode
onMounted(() => {
  if (props.isEditMode && props.initialData) {
    setValues({
      name: props.initialData.name,
      description: props.initialData.description,
      mainCategory: props.initialData.mainCategory,
      subCategory: props.initialData.subCategory || '',
      subSubCategory: props.initialData.subSubCategory || '',
      brandId: props.initialData.brandId || '',
      price: props.initialData.price,
      stock: props.initialData.stock
    })
    sku.value = props.initialData.sku || ''
    discountPrice.value = props.initialData.discountPrice || ''
    featuredImage.value = props.initialData.featuredImage || null
    galleryImages.value = props.initialData.galleryImages || []
    variants.value = props.initialData.variants || []
  }
})

// Computed Sub Categories based on Main Category
const subCategoryOptions = computed(() => {
  const options = [{ value: '', label: 'اختر تصنيف فرعي' }]
  const main = categoriesData.find(c => c.id === mainCategory.value)
  if (main && main.children) {
    main.children.forEach(sub => options.push({ value: sub.id, label: sub.name }))
  }
  return options
})

// Computed Sub-Sub Categories based on Sub Category
const subSubCategoryOptions = computed(() => {
  const options = [{ value: '', label: 'بدون' }]
  if (!subCategory.value || !mainCategory.value) return options
  const main = categoriesData.find(c => c.id === mainCategory.value)
  const sub = main?.children?.find((c: any) => c.id === subCategory.value)
  if (sub && sub.children) {
    sub.children.forEach((subSub: any) => {
      options.push({ value: subSub.id, label: subSub.name })
    })
  }
  return options
})

// Mock Brands Data
const brandsData = [
  { id: 'b1', name: 'سامسونج - Samsung' },
  { id: 'b2', name: 'إل جي - LG' },
  { id: 'b3', name: 'سوني - Sony' },
  { id: 'b4', name: 'جري - Gree' },
  { id: 'b5', name: 'باناسونيك - Panasonic' },
]

const brandOptions = computed(() => [
  { value: '', label: 'بدون براند' },
  ...brandsData.map(b => ({ value: b.id, label: b.name }))
])

// Reset sub categories when parent changes
watch(mainCategory, () => {
  if (!props.isEditMode || (props.isEditMode && mainCategory.value !== props.initialData?.mainCategory)) {
    subCategory.value = ''
    subSubCategory.value = ''
  }
})
watch(subCategory, () => {
  if (!props.isEditMode || (props.isEditMode && subCategory.value !== props.initialData?.subCategory)) {
    subSubCategory.value = ''
  }
})

const addVariant = () => {
  variants.value.push({ name: '', values: '' })
}
const removeVariant = (index: number) => {
  variants.value.splice(index, 1)
}

// Form Submission
const onSubmit = handleSubmit(async (values) => {
  if (!featuredImage.value) {
    errors.featuredImage = 'صورة الغلاف مطلوبة'
    return
  }

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  success('تم الحفظ بنجاح!', props.isEditMode ? 'تم تعديل المنتج بنجاح.' : 'تم إضافة المنتج الجديد إلى المتجر.')
  router.push('/admin/products')
})
</script>
