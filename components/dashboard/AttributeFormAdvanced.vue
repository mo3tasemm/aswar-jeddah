<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- HEADER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          {{ formTitle }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          أدخل اسم السمة بالعربية والإنجليزية (مثل: المقاس / Size) ليتم إرسالها بصيغة المصفوفات عبر JSON.
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          type="button" 
          @click="$emit('cancel')" 
          class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer"
        >
          إلغاء
        </button>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          <span v-if="isSubmitting" class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin"></span>
          <span>{{ submitButtonText }}</span>
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
      
      <!-- Right / Main Column: Multilingual Names (2 cols) -->
      <div class="xl:col-span-2 space-y-6">
        
        <!-- Multilingual Names Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              بيانات السمة واللغات المدعومة (Multilingual Names)
            </h3>
            <span class="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100">
              JSON Array Format
            </span>
          </div>

          <!-- Arabic Attribute Name Input -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-extrabold text-[#0B0E28] flex items-center gap-1.5">
                <span>اسم السمة (بالعربية - name[0])</span>
                <span class="text-rose-500">*</span>
              </label>
              <span class="text-[11px] font-bold text-slate-400">lang: ar</span>
            </div>
            <div class="relative">
              <input 
                type="text" 
                v-model="form.name_ar"
                placeholder="مثال: المقاس، الوزن، الخامة، السعة..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
              />
            </div>
            <p class="text-[11px] text-slate-400 font-medium">اسم الخاصية أو السمة كما سيظهر للمستخدمين بالعربية.</p>
          </div>

          <!-- English Attribute Name Input -->
          <div class="space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-extrabold text-[#0B0E28] flex items-center gap-1.5">
                <span>اسم السمة (بالإنجليزية - name[1])</span>
                <span class="text-rose-500">*</span>
              </label>
              <span class="text-[11px] font-bold text-slate-400">lang: en</span>
            </div>
            <div class="relative">
              <input 
                type="text" 
                v-model="form.name_en"
                placeholder="e.g. Size, Weight, Material, Capacity..." 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                dir="ltr"
              />
            </div>
            <p class="text-[11px] text-slate-400 font-medium">الاسم بالإنجليزية (شرط أساسي في الـ API للترجمة).</p>
          </div>

          <!-- Quick Preset Attributes Palette -->
          <div class="space-y-2 pt-2 border-t border-slate-100">
            <span class="text-xs font-extrabold text-[#0B0E28] block">
              سمات شائعة جاهزة للاختيار السريع:
            </span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="preset in presetAttributes"
                :key="preset.en"
                type="button"
                @click="selectPreset(preset)"
                class="group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer"
                :class="(form.name_ar === preset.ar && form.name_en === preset.en)
                  ? 'border-amber-400 bg-amber-50 text-slate-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'"
              >
                <span>{{ preset.ar }}</span>
                <span class="text-slate-300">|</span>
                <span class="text-slate-400 font-medium" dir="ltr">{{ preset.en }}</span>
              </button>
            </div>
          </div>

        </div>

      </div>

      <!-- Left Column: Live Visual Preview & Info Card (1 col) -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between">
        <div class="space-y-6">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            معاينة السمة في المتجر (Live Preview)
          </h3>

          <!-- Preview Badge Showcase -->
          <div class="space-y-4">
            
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <span class="text-[11px] font-bold text-slate-400 block">شكل الخاصية في صفحة تفاصيل المنتج:</span>
              
              <!-- Attribute Pill Mockup -->
              <div class="space-y-2">
                <span class="text-xs font-black text-slate-800 block">
                  {{ form.name_ar || 'اسم السمة' }} ({{ form.name_en || 'Attribute' }}):
                </span>
                
                <!-- Mockup Options -->
                <div class="flex flex-wrap gap-2">
                  <div class="px-3 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 text-[#0B0E28] font-bold text-xs shadow-xs">
                    خيار 1 (افتراضي)
                  </div>
                  <div class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-xs">
                    خيار 2
                  </div>
                  <div class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-xs">
                    خيار 3
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary Specifications -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs font-medium text-slate-600">
              <div class="flex justify-between items-center">
                <span class="text-slate-400">الاسم العربي:</span>
                <span class="font-extrabold text-slate-900">{{ form.name_ar || 'لم يُحدد' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400">الاسم الإنجليزي:</span>
                <span class="font-extrabold text-slate-900" dir="ltr">{{ form.name_en || 'Not set' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400">هيكل الإرسال:</span>
                <span class="font-mono text-[11px] font-bold text-indigo-600">name[], lang[]</span>
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom Tip -->
        <div class="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/50 text-[11px] text-amber-900 font-medium flex items-center gap-2 mt-4">
          <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>تُستخدم هذه السمات لإنشاء تنوعات وخيارات المنتجات (Variations).</span>
        </div>

      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { AttributeFormDataPayload } from '~/services/adminAttributesApiService'

interface Props {
  initialData?: Partial<AttributeFormDataPayload>;
  isEditMode?: boolean;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditMode: false,
  isSubmitting: false
})

const emit = defineEmits<{
  (e: 'submit', payload: AttributeFormDataPayload): void;
  (e: 'cancel'): void;
}>()

const formError = ref('')

const form = reactive<AttributeFormDataPayload>({
  id: props.initialData?.id || '',
  name_ar: props.initialData?.name_ar || '',
  name_en: props.initialData?.name_en || ''
})

const formTitle = computed(() => {
  return props.isEditMode ? 'تعديل بيانات السمة' : 'إضافة سمة جديدة'
})

const submitButtonText = computed(() => {
  if (props.isSubmitting) return 'جاري الحفظ (JSON)...'
  return props.isEditMode ? 'حفظ التعديلات' : 'إضافة السمة'
})

// Common preset attributes
const presetAttributes = [
  { ar: 'المقاس', en: 'Size' },
  { ar: 'الوزن', en: 'Weight' },
  { ar: 'الخامة', en: 'Material' },
  { ar: 'الحجم', en: 'Volume' },
  { ar: 'الطول', en: 'Length' },
  { ar: 'الذاكرة', en: 'Storage' },
  { ar: 'السعة', en: 'Capacity' },
  { ar: 'الموديل', en: 'Model' },
  { ar: 'النمط', en: 'Style' }
]

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.id = newVal.id || ''
    form.name_ar = newVal.name_ar || ''
    form.name_en = newVal.name_en || ''
  }
}, { immediate: true, deep: true })

const selectPreset = (preset: { ar: string; en: string }) => {
  form.name_ar = preset.ar
  form.name_en = preset.en
  formError.value = ''
}

const handleSubmit = () => {
  formError.value = ''

  if (!form.name_ar || !form.name_ar.trim()) {
    formError.value = 'يرجى إدخال اسم السمة بالعربية.'
    return
  }

  if (!form.name_en || !form.name_en.trim()) {
    formError.value = 'يرجى إدخال اسم السمة بالإنجليزية.'
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
