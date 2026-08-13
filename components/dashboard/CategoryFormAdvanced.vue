<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- HEADER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          {{ isEditMode ? 'تعديل قسم موجود' : 'إضافة قسم جديد' }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          أدخل اسم القسم بالعربية والإنجليزية وحدد صورة الغلاف ليتم إرسال البيانات كـ FormData.
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
        >
          إلغاء
        </button>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <span v-if="isSubmitting" class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isSubmitting ? 'جاري الإرسال (FormData)...' : (isEditMode ? 'حفظ التعديلات' : 'إضافة القسم') }}</span>
        </button>
      </div>
    </div>

    <!-- ERROR BANNER -->
    <div v-if="formError" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake">
      <svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>{{ formError }}</span>
    </div>

    <!-- MAIN FORM FIELDS CONTAINER -->
    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      <!-- Right Column: Text & Multi-language Name (2 cols) -->
      <div class="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          اسم القسم باللغتين (Arabic & English Names)
        </h3>

        <!-- Arabic Category Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-[#0B0E28] block">
            اسم القسم (بالعربية) <span class="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.name_ar"
            placeholder="مثال: أجهزة منزلية..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        <!-- English Category Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-[#0B0E28] block">
            اسم القسم (بالإنجليزية)
          </label>
          <input 
            type="text" 
            v-model="form.name_en"
            placeholder="e.g. Home Appliances..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            dir="ltr"
          />
        </div>
      </div>

      <!-- Left Column: Image File Upload (1 col) -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          صورة القسم (image File Object)
        </h3>

        <div class="space-y-3 text-center">
          <!-- Current / Selected Image Preview -->
          <div class="w-32 h-32 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden mx-auto flex items-center justify-center relative">
            <img 
              v-if="imagePreview" 
              :src="imagePreview" 
              class="w-full h-full object-cover" 
              alt="Category Preview"
            />
            <svg v-else class="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>

          <!-- Native File Input Extracting event.target.files[0] -->
          <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
            <label class="block text-xs font-bold text-slate-700 mb-2">
              اختر ملف الصورة {{ isEditMode ? '(اختياري عند التعديل)' : '(إجباري عند الإضافة)' }}
            </label>
            <input 
              type="file" 
              accept="image/*"
              @change="onFileSelected"
              class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-[#0B0E28] hover:file:bg-amber-500 cursor-pointer"
            />
          </div>

          <p v-if="fileName" class="text-xs font-bold text-emerald-600">
            الملف المحدد: {{ fileName }}
          </p>
        </div>
      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import type { CategoryFormDataPayload } from '~/services/adminCategoriesApiService'

const props = defineProps<{
  initialData?: Partial<CategoryFormDataPayload & { existingImage?: string }>;
  isEditMode?: boolean;
  isSubmitting?: boolean;
}>()

const emit = defineEmits<{
  (e: 'submit', payload: CategoryFormDataPayload): void;
  (e: 'cancel'): void;
}>()

const formError = ref('')
const fileName = ref('')
const imagePreview = ref<string>(props.initialData?.existingImage || '')

const form = reactive<CategoryFormDataPayload>({
  id: props.initialData?.id || '',
  name_ar: props.initialData?.name_ar || '',
  name_en: props.initialData?.name_en || '',
  imageFile: null
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.id = newVal.id || ''
    form.name_ar = newVal.name_ar || ''
    form.name_en = newVal.name_en || ''
    if (newVal.existingImage) {
      imagePreview.value = newVal.existingImage
    }
  }
}, { immediate: true })

/**
 * Handle File Selection (Extract event.target.files[0])
 */
const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    form.imageFile = file
    fileName.value = file.name

    // Create object URL for local preview
    imagePreview.value = URL.createObjectURL(file)
  }
}

const handleSubmit = () => {
  formError.value = ''

  if (!form.name_ar.trim()) {
    formError.value = 'يرجى كتابة اسم القسم بالعربية.'
    return
  }

  if (!props.isEditMode && !form.imageFile) {
    formError.value = 'يرجى تحديد صورة القسم (ملف الصورة إجباري عند الإضافة).'
    return
  }

  emit('submit', { ...form })
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
