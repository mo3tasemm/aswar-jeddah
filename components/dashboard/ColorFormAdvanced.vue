<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- HEADER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          {{ formTitle }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          حدد اسم اللون ونوعه (كود سداسي عشري أو صورة نقوش/خامة) لإرسال البيانات كـ FormData.
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
      
      <!-- Right / Main Column: Color Name & Type Selection (2 cols) -->
      <div class="xl:col-span-2 space-y-6">
        
        <!-- Basic Info Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            البيانات الأساسية ونوع اللون
          </h3>

          <!-- Color Name Input -->
          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              اسم اللون <span class="text-rose-500">*</span>
            </label>
            <input 
              type="text" 
              v-model="form.name"
              placeholder="مثال: أحمر ياقوتي، أزرق كحلي، رمادي ميتاليك..." 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />
            <p class="text-[11px] text-slate-400 font-medium">الاسم الذي يظهر للعملاء في صفحة المنتج وفلاتر البحث.</p>
          </div>

          <!-- Color Type Selector (Cards / Tabs) -->
          <div class="space-y-2">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              نوع اللون (Color Type) <span class="text-rose-500">*</span>
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <!-- Option 1: Hex Code -->
              <button
                type="button"
                @click="setColorType('code')"
                class="p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 cursor-pointer"
                :class="form.color_type === 'code' 
                  ? 'border-amber-400 bg-amber-50/40 shadow-sm' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'"
              >
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                  :class="form.color_type === 'code' ? 'bg-amber-400 text-[#0B0E28]' : 'bg-white text-slate-400 border border-slate-200'"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7" />
                  </svg>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-extrabold text-slate-900">كود لون (Hex Code)</span>
                    <span v-if="form.color_type === 'code'" class="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium leading-relaxed">
                    استخدام لون أحادي مصمت عبر كود الـ Hex (مثال: #FF0000).
                  </p>
                </div>
              </button>

              <!-- Option 2: Image / Texture -->
              <button
                type="button"
                @click="setColorType('image')"
                class="p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 cursor-pointer"
                :class="form.color_type === 'image' 
                  ? 'border-amber-400 bg-amber-50/40 shadow-sm' 
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600'"
              >
                <div 
                  class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"
                  :class="form.color_type === 'image' ? 'bg-amber-400 text-[#0B0E28]' : 'bg-white text-slate-400 border border-slate-200'"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span class="text-sm font-extrabold text-slate-900">صورة / نقوش (Image)</span>
                    <span v-if="form.color_type === 'image'" class="w-2 h-2 rounded-full bg-amber-500"></span>
                  </div>
                  <p class="text-xs text-slate-500 font-medium leading-relaxed">
                    رفع صورة لخامة أو نقشة مميزة أو تدرج لوني خاص.
                  </p>
                </div>
              </button>

            </div>
          </div>
        </div>

        <!-- Dynamic Section 1: Hex Code Picker & Preset Palette (When color_type === 'code') -->
        <div v-if="form.color_type === 'code'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            تحديد كود اللون وقائمته السريعة
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <!-- Hex Text Input with Color Picker Trigger -->
            <div class="space-y-1.5">
              <label class="text-xs font-extrabold text-[#0B0E28] block">
                كود الـ Hex <span class="text-rose-500">*</span>
              </label>
              <div class="flex items-center gap-2">
                <!-- Color Input Trigger -->
                <div class="relative w-12 h-12 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-inner cursor-pointer">
                  <input 
                    type="color" 
                    v-model="normalizedHex"
                    @input="onColorPickerChange"
                    class="absolute -top-4 -left-4 w-20 h-20 cursor-pointer border-0 p-0"
                  />
                </div>
                <!-- Text Hex Input -->
                <div class="relative flex-1">
                  <input 
                    type="text" 
                    v-model="form.code"
                    @input="onHexTextInput"
                    placeholder="#1E40AF" 
                    maxlength="7"
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black font-mono text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 uppercase"
                    dir="ltr"
                  />
                </div>
              </div>
              <p class="text-[11px] text-slate-400 font-medium">يمكنك كتابة الكود مباشرة أو النقر على المربع لاختيار اللون.</p>
            </div>

            <!-- Quick Info Badge -->
            <div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3">
              <div 
                class="w-10 h-10 rounded-xl shadow-md border border-black/10 shrink-0"
                :style="{ backgroundColor: previewColor }"
              ></div>
              <div>
                <span class="text-xs font-bold text-slate-700 block">اللون المحدد:</span>
                <span class="text-sm font-black font-mono text-slate-900 uppercase">{{ previewColor }}</span>
              </div>
            </div>
          </div>

          <!-- Quick Preset Palette -->
          <div class="space-y-2 pt-2 border-t border-slate-100">
            <span class="text-xs font-extrabold text-[#0B0E28] block">
              ألوان سريعة شائعة (Quick Colors):
            </span>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="preset in presetColors"
                :key="preset.code"
                type="button"
                @click="selectPresetColor(preset)"
                class="group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold cursor-pointer"
                :class="(form.code || '').toUpperCase() === preset.code.toUpperCase()
                  ? 'border-amber-400 bg-amber-50 text-slate-900 shadow-xs'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'"
                :title="`${preset.name} (${preset.code})`"
              >
                <span 
                  class="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0" 
                  :style="{ backgroundColor: preset.code }"
                ></span>
                <span>{{ preset.name }}</span>
              </button>
            </div>
          </div>

        </div>

        <!-- Dynamic Section 2: Image Upload (When color_type === 'image') -->
        <div v-else-if="form.color_type === 'image'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            رفع صورة نقشة أو خامة اللون
          </h3>

          <div 
            class="p-6 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-3xl transition-all text-center cursor-pointer group"
            @click="triggerFileInput"
          >
            <input 
              ref="fileInputRef"
              type="file" 
              accept="image/*"
              @change="onFileSelected"
              class="hidden"
            />
            <div class="space-y-2">
              <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p class="text-sm font-extrabold text-[#0B0E28]">
                اضغط هنا لاختيار صورة اللون أو اسحب الملف وأفلته
              </p>
              <p class="text-xs text-slate-400 font-medium">
                {{ imageUploadHint }}
              </p>
            </div>
          </div>

          <div v-if="fileName" class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800">
            <div class="flex items-center gap-2 truncate">
              <svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg>
              <span class="truncate">الملف المحدد: {{ fileName }}</span>
            </div>
            <button 
              type="button" 
              @click.stop="clearSelectedImage"
              class="text-rose-600 hover:text-rose-800 underline text-xs shrink-0 cursor-pointer"
            >
              إلغاء التحديد
            </button>
          </div>

        </div>

      </div>

      <!-- Left Column: Live Visual Preview Card (1 col) -->
      <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between">
        <div class="space-y-6">
          <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            معاينة اللون الحية (Live Preview)
          </h3>

          <!-- Visual Swatch Card -->
          <div class="space-y-4">
            
            <!-- When Code: Large Color Card -->
            <div 
              v-if="form.color_type === 'code'"
              class="w-full h-44 rounded-2xl border border-slate-200 shadow-inner flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300 relative overflow-hidden"
              :style="{ backgroundColor: previewColor }"
            >
              <!-- Contrast Text Badge -->
              <div 
                class="px-3 py-1.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-2 backdrop-blur-md"
                :class="isDark ? 'bg-white/80 text-slate-900' : 'bg-slate-900/80 text-white'"
              >
                <span>{{ form.name || 'اسم اللون' }}</span>
                <span class="font-mono text-[11px]">{{ previewColor }}</span>
              </div>

              <!-- Round Swatch Mini -->
              <div class="w-10 h-10 rounded-full border-2 border-white shadow-lg" :style="{ backgroundColor: previewColor }"></div>
            </div>

            <!-- When Image: Large Image Card -->
            <div 
              v-else-if="form.color_type === 'image'"
              class="w-full h-44 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center relative p-2"
            >
              <img 
                v-if="imagePreview" 
                :src="imagePreview" 
                class="w-full h-full object-cover rounded-xl"
                alt="Color Image Preview"
              />
              <div v-else class="flex flex-col items-center justify-center text-slate-400 gap-1">
                <svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                <span class="text-xs font-bold">لا توجد صورة محددة</span>
              </div>
            </div>

            <!-- Summary Specifications -->
            <div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs font-medium text-slate-600">
              <div class="flex justify-between items-center">
                <span class="text-slate-400">الاسم:</span>
                <span class="font-extrabold text-slate-900">{{ form.name || 'لم يُحدد' }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-slate-400">النوع:</span>
                <span class="font-extrabold" :class="form.color_type === 'code' ? 'text-amber-600' : 'text-indigo-600'">
                  {{ form.color_type === 'code' ? 'كود لون (Hex)' : 'صورة (Image)' }}
                </span>
              </div>
              <div class="flex justify-between items-center" v-if="form.color_type === 'code'">
                <span class="text-slate-400">القيمة:</span>
                <span class="font-black font-mono text-slate-900 uppercase">{{ previewColor }}</span>
              </div>
              <div class="flex justify-between items-center" v-else>
                <span class="text-slate-400">ملف الصورة:</span>
                <span class="font-bold text-slate-900 truncate max-w-[140px]">
                  {{ fileName || (imagePreview ? 'صورة مرفوعة' : 'غير متوفر') }}
                </span>
              </div>
            </div>

          </div>
        </div>

        <!-- Bottom Tip -->
        <div class="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/50 text-[11px] text-amber-900 font-medium flex items-center gap-2 mt-4">
          <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>تظهر هذه الألوان مباشرة في خيارات المنتجات وفلاتر المتجر.</span>
        </div>

      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import type { ColorFormDataPayload, ColorType } from '~/services/adminColorsApiService'

interface Props {
  initialData?: Partial<ColorFormDataPayload>;
  isEditMode?: boolean;
  isSubmitting?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  isEditMode: false,
  isSubmitting: false
})

const emit = defineEmits<{
  (e: 'submit', payload: ColorFormDataPayload): void;
  (e: 'cancel'): void;
}>()

const formTitle = computed(() => {
  return props.isEditMode ? 'تعديل بيانات اللون' : 'إضافة لون جديد'
})

const submitButtonText = computed(() => {
  if (props.isSubmitting) return 'جاري الإرسال (FormData)...'
  return props.isEditMode ? 'حفظ التعديلات' : 'إضافة اللون'
})

const imageUploadHint = computed(() => {
  return props.isEditMode 
    ? '(اختياري عند التعديل - اتركها للإبقاء على الصورة الحالية)' 
    : '(إجباري عند الإضافة - يدعم PNG, JPG, WEBP)'
})

const fileInputRef = ref<HTMLInputElement | null>(null)
const formError = ref('')
const fileName = ref('')
const imagePreview = ref<string>(props.initialData?.existingImage || '')

const form = reactive<ColorFormDataPayload>({
  id: props.initialData?.id || '',
  name: props.initialData?.name || '',
  color_type: props.initialData?.color_type || 'code',
  code: props.initialData?.code || '#000000',
  imageFile: null,
  existingImage: props.initialData?.existingImage || ''
})

// Popular preset colors for instant 1-click selection
const presetColors = [
  { name: 'أسود', code: '#000000' },
  { name: 'أبيض', code: '#FFFFFF' },
  { name: 'رمادي', code: '#6B7280' },
  { name: 'فضي', code: '#CBD5E1' },
  { name: 'أحمر', code: '#EF4444' },
  { name: 'عنابي', code: '#881337' },
  { name: 'برتقالي', code: '#F97316' },
  { name: 'أصفر', code: '#FACC15' },
  { name: 'ذهبي', code: '#D97706' },
  { name: 'أخضر', code: '#10B981' },
  { name: 'زيتي', code: '#365314' },
  { name: 'أزرق', code: '#3B82F6' },
  { name: 'كحلي', code: '#1E3A8A' },
  { name: 'سماوي', code: '#06B6D4' },
  { name: 'بنفسجي', code: '#8B5CF6' },
  { name: 'وردي', code: '#EC4899' },
  { name: 'بيج', code: '#E2D9C8' },
  { name: 'بني', code: '#78350F' }
]

// Normalized hex for the <input type="color">
const normalizedHex = computed({
  get: () => {
    let hex = form.code || '#000000'
    if (!hex.startsWith('#')) hex = `#${hex}`
    return /^#[0-9A-F]{6}$/i.test(hex) ? hex : '#000000'
  },
  set: (val: string) => {
    form.code = val.toUpperCase()
  }
})

// Preview color with fallback
const previewColor = computed(() => {
  const c = form.code || '#000000'
  return c.startsWith('#') ? c : `#${c}`
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.id = newVal.id || ''
    form.name = newVal.name || ''
    form.color_type = newVal.color_type || 'code'
    form.code = newVal.code || '#000000'
    if (newVal.existingImage) {
      form.existingImage = newVal.existingImage
      imagePreview.value = newVal.existingImage
    }
  }
}, { immediate: true, deep: true })

const setColorType = (type: ColorType) => {
  form.color_type = type
  formError.value = ''
}

const selectPresetColor = (preset: { name: string; code: string }) => {
  form.code = preset.code
  if (!form.name || form.name.trim() === '') {
    form.name = preset.name
  }
}

const onColorPickerChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  form.code = target.value.toUpperCase()
}

const onHexTextInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  let val = target.value.trim()
  if (val && !val.startsWith('#')) {
    val = `#${val}`
  }
  form.code = val.toUpperCase()
}

const triggerFileInput = () => {
  fileInputRef.value?.click()
}

const onFileSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    form.imageFile = file
    fileName.value = file.name
    imagePreview.value = URL.createObjectURL(file)
  }
}

const clearSelectedImage = () => {
  form.imageFile = null
  fileName.value = ''
  imagePreview.value = props.initialData?.existingImage || ''
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

// Determines text contrast color for the preview badge
const isDark = computed(() => {
  let c = previewColor.value.replace('#', '')
  if (c.length === 3) c = c.split('').map(x => x + x).join('')
  const r = parseInt(c.substring(0, 2), 16) || 0
  const g = parseInt(c.substring(2, 4), 16) || 0
  const b = parseInt(c.substring(4, 6), 16) || 0
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq < 128
})

const handleSubmit = () => {
  formError.value = ''

  if (!form.name || !form.name.trim()) {
    formError.value = 'يرجى إدخال اسم اللون.'
    return
  }

  if (form.color_type === 'code') {
    if (!form.code || !form.code.trim()) {
      formError.value = 'يرجى تحديد أو إدخال كود الـ Hex للون.'
      return
    }
  } else if (form.color_type === 'image') {
    if (!props.isEditMode && !form.imageFile) {
      formError.value = 'يرجى رفع صورة اللون (ملف الصورة إجباري عند الإضافة).'
      return
    }
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
