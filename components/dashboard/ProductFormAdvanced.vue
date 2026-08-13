<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- TOP BAR ACTIONS & TITLE -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          {{ isEditMode ? 'تعديل منتج موجود' : 'إضافة منتج جديد' }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          قم بتعبئة بيانات المنتج باللغتين العربية والإنجليزي وتحديد الأسعار والمخزون والصور.
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
          class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <span v-if="isSubmitting" class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin"></span>
          <span>{{ isSubmitting ? 'جاري الإرسال (FormData)...' : (isEditMode ? 'حفظ التعديلات' : 'إضافة المنتج') }}</span>
        </button>
      </div>
    </div>

    <!-- ERROR BANNER -->
    <div v-if="formError" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake">
      <svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
      <span>{{ formError }}</span>
    </div>

    <!-- TABBED NAVIGATION HEADER (Pure SVG Icons - No Emojis) -->
    <div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center gap-2 overflow-x-auto">
      <button
        type="button"
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2.5 cursor-pointer"
        :class="activeTab === tab.id ? 'bg-[#0B0E28] text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'"
      >
        <span v-html="tab.icon" class="w-4 h-4 flex items-center justify-center"></span>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- TAB 1: LOCALIZATION & BASIC INFO -->
    <div v-show="activeTab === 'basic'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        الاسم والوصف باللغتين (ar & en)
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Arabic Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            اسم المنتج (بالعربي) <span class="text-rose-500">*</span>
          </label>
          <input 
            type="text" 
            v-model="form.name_ar"
            placeholder="مثال: ثلاجة سامسونج 18 قدم..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        <!-- English Name -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            اسم المنتج (بالإنجليزي)
          </label>
          <input 
            type="text" 
            v-model="form.name_en"
            placeholder="e.g. Samsung Refrigerator 18 Cu..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            dir="ltr"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Arabic Description (Rich Text Editor WYSIWYG) -->
        <RichTextEditor
          v-model="form.description_ar"
          label="الوصف (بالعربي)"
          :required="true"
          dir="rtl"
          placeholder="اكتب وصفاً مفصلاً ومسقاً للمنتج..."
        />

        <!-- English Description (Rich Text Editor WYSIWYG) -->
        <RichTextEditor
          v-model="form.description_en"
          label="الوصف (بالإنجليزي)"
          dir="ltr"
          placeholder="Write detailed formatted product description..."
        />
      </div>
    </div>

    <!-- TAB 2: CATEGORIES & BRAND (Using Custom BaseSelect) -->
    <div v-show="activeTab === 'category'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        الأقسام والعلامة التجارية (Category & Brand)
      </h3>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Custom BaseSelect for Category ID -->
        <BaseSelect 
          v-model="form.category_id"
          label="القسم الرئيسي (category_id)"
          placeholder="-- اختر القسم الرئيسي --"
          :options="categorySelectOptions"
          :required="true"
          @update:model-value="onCategoryChange"
        />

        <!-- Custom BaseSelect for Sub Category ID -->
        <BaseSelect 
          v-model="form.sub_category_id"
          label="القسم الفرعي (sub_category_id)"
          placeholder="-- اختر القسم الفرعي --"
          :options="subCategorySelectOptions"
          :disabled="availableSubCategories.length === 0"
        />

        <!-- Sub Sub Category ID -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-[#0B0E28] block">
            القسم الفرعي الثانوي (sub_sub_category_id)
          </label>
          <input 
            type="number" 
            v-model="form.sub_sub_category_id"
            placeholder="رقم القسم الثانوي" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:border-amber-400"
          />
        </div>

        <!-- Custom BaseSelect for Brand ID -->
        <BaseSelect 
          v-model="form.brand_id"
          label="العلامة التجارية (brand_id)"
          placeholder="-- اختر العلامة التجارية --"
          :options="brandSelectOptions"
        />
      </div>
    </div>

    <!-- TAB 3: PRICING, STOCK & DISCOUNT -->
    <div v-show="activeTab === 'pricing'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        التسعير والمخزون والخصم
      </h3>

      <!-- Pricing & Stock Row -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            سعر البيع (unit_price) <span class="text-rose-500">*</span>
          </label>
          <input 
            type="number" 
            step="0.01"
            v-model="form.unit_price"
            placeholder="0.00" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            سعر التكلفة (purchase_price)
          </label>
          <input 
            type="number" 
            step="0.01"
            v-model="form.purchase_price"
            placeholder="0.00" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            المخزون الحالي (current_stock)
          </label>
          <input 
            type="number" 
            v-model="form.current_stock"
            placeholder="10" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            أقل كمية للطلب (minimum_order_qty)
          </label>
          <input 
            type="number" 
            v-model="form.minimum_order_qty"
            placeholder="1" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <!-- Discount Section -->
      <div class="pt-4 border-t border-slate-100 space-y-4">
        <h4 class="text-sm font-bold text-slate-800">بيانات الخصم (Discount)</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-slate-800 block">قيمة الخصم (discount)</label>
            <input 
              type="number" 
              step="0.01"
              v-model="form.discount"
              placeholder="0" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
            />
          </div>

          <!-- Custom BaseSelect for Discount Type -->
          <BaseSelect 
            v-model="form.discount_type"
            label="نوع الخصم (discount_type)"
            :options="discountTypeSelectOptions"
          />

          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-slate-800 block">تاريخ بداية الخصم</label>
            <input 
              type="date" 
              v-model="form.discount_start_date"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-slate-800 block">تاريخ نهاية الخصم</label>
            <input 
              type="date" 
              v-model="form.discount_end_date"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 4: COLORS & VARIATIONS (Live API Color Selection UI) -->
    <div v-show="activeTab === 'variations'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        الألوان والسمات والمتغيرات (Colors & Variations)
      </h3>

      <!-- Color Active Toggle -->
      <div class="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" v-model="form.colors_active" class="sr-only peer">
          <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
        </label>
        <div>
          <span class="text-xs font-extrabold text-slate-900 block">تفعيل الألوان (colors_active)</span>
          <span class="text-[11px] text-slate-500">تمكين تحديد خيارات ألوان متعددة للمنتج</span>
        </div>
      </div>

      <!-- Color Selection UI (Interactive Color Swatches from API) -->
      <div v-if="form.colors_active" class="space-y-4">
        <div class="flex items-center justify-between">
          <label class="text-xs font-extrabold text-slate-800 block">
            قائمة الألوان المتاحة من السيرفر (GET /admin/colors/list)
          </label>
          <span class="text-[11px] font-bold text-slate-400">
            تم اختيار {{ (form.colors || []).length }} لون
          </span>
        </div>

        <!-- Loading State for Colors -->
        <div v-if="isLoadingColors" class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
          <div class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          <span class="text-xs font-bold text-slate-500">جاري جلب الألوان المتاحة من السيرفر...</span>
        </div>

        <!-- Color Swatches Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div
            v-for="color in colorsList"
            :key="color.id"
            @click="toggleColorSelection(color.code)"
            class="p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 select-none"
            :class="isColorSelected(color.code) 
              ? 'border-amber-400 bg-amber-50/50 shadow-sm ring-2 ring-amber-400/20' 
              : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'"
          >
            <!-- Color Swatch Circle -->
            <div 
              class="w-6 h-6 rounded-full border border-slate-300 shrink-0 shadow-inner flex items-center justify-center"
              :style="{ backgroundColor: `#${color.code}` }"
            >
              <svg v-if="isColorSelected(color.code)" class="w-3.5 h-3.5 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <!-- Color Info -->
            <div class="flex flex-col min-w-0 overflow-hidden">
              <span class="text-xs font-extrabold text-[#0B0E28] truncate">{{ color.name }}</span>
              <span class="text-[10px] text-slate-400 font-mono">#{{ color.code }}</span>
            </div>
          </div>
        </div>

        <!-- Selected Colors Pills Bar & Custom Color Input -->
        <div class="pt-3 border-t border-slate-100 space-y-3">
          <label class="text-[11px] font-bold text-slate-600 block">الألوان المختارة (colors[]):</label>

          <div class="flex flex-wrap items-center gap-2.5">
            <div 
              v-for="(c, idx) in form.colors" 
              :key="idx" 
              class="flex items-center gap-2 bg-[#0B0E28] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
            >
              <span class="w-3.5 h-3.5 rounded-full border border-white/40" :style="{ backgroundColor: `#${c}` }"></span>
              <span>#{{ c }}</span>
              <button type="button" @click="removeColor(idx)" class="text-amber-400 hover:text-rose-400 ms-1 font-black">✕</button>
            </div>

            <div class="flex items-center gap-2 ms-auto">
              <input 
                type="text" 
                v-model="newColorInput" 
                placeholder="كود يدوي FF0000" 
                class="w-36 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                dir="ltr"
              />
              <button 
                type="button" 
                @click="addColor"
                class="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer"
              >
                + إضافة
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Variations Generator -->
      <div class="pt-4 border-t border-slate-100 space-y-4">
        <div class="flex items-center justify-between">
          <h4 class="text-sm font-bold text-slate-800">قائمة المتغيرات الفردية (price_COLOR-OPTION, sku_, qty_)</h4>
          <button 
            type="button" 
            @click="addVariationRow"
            class="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-600 font-bold text-xs hover:bg-indigo-100 transition-colors"
          >
            + إضافة صف متغير
          </button>
        </div>

        <div v-if="form.variations.length === 0" class="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-bold">
          لا توجد متغيرات مضافة حالياً.
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="(v, idx) in form.variations" 
            :key="idx"
            class="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 relative"
          >
            <div>
              <label class="text-[11px] font-bold text-slate-600 block">رمز المتغير (code)</label>
              <input 
                type="text" 
                v-model="v.code" 
                placeholder="FF0000-S"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                dir="ltr"
              />
            </div>
            <div>
              <label class="text-[11px] font-bold text-slate-600 block">السعر الخاص</label>
              <input 
                type="number" 
                v-model="v.price" 
                placeholder="250"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
              />
            </div>
            <div>
              <label class="text-[11px] font-bold text-slate-600 block">الرمز (SKU)</label>
              <input 
                type="text" 
                v-model="v.sku" 
                placeholder="SKU-FF0000-S"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                dir="ltr"
              />
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <label class="text-[11px] font-bold text-slate-600 block">الكمية</label>
                <input 
                  type="number" 
                  v-model="v.qty" 
                  placeholder="10"
                  class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold" 
                />
              </div>
              <button 
                type="button" 
                @click="removeVariationRow(idx)"
                class="mt-4 p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                title="حذف المتغير"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 5: FILES & MEDIA (File Objects) -->
    <div v-show="activeTab === 'media'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        الصور والملفات (File Object Attachments)
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Thumbnail (Required Single File) -->
        <div class="space-y-2">
          <label class="text-xs font-extrabold text-slate-800 block">
            الصورة المصغرة الرئيسية (thumbnail - ملف إجباري) <span class="text-rose-500">*</span>
          </label>
          <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
            <input 
              type="file" 
              accept="image/*"
              @change="onThumbnailSelected"
              class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-[#0B0E28] hover:file:bg-amber-500 cursor-pointer"
            />
            <p v-if="thumbnailName" class="mt-2 text-xs font-bold text-emerald-600">
              الملف المحدد: {{ thumbnailName }}
            </p>
          </div>
        </div>

        <!-- Multiple Images Gallery -->
        <div class="space-y-2">
          <label class="text-xs font-extrabold text-slate-800 block">
            معرض الصور المتعددة (images[])
          </label>
          <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center">
            <input 
              type="file" 
              accept="image/*"
              multiple
              @change="onImagesSelected"
              class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-900 cursor-pointer"
            />
            <p v-if="galleryCount > 0" class="mt-2 text-xs font-bold text-emerald-600">
              عدد الصور المحددة: {{ galleryCount }} صورة
            </p>
          </div>
        </div>
      </div>

      <!-- Color Images Attachments -->
      <div v-if="form.colors_active && form.colors.length > 0" class="pt-4 border-t border-slate-100 space-y-3">
        <h4 class="text-sm font-bold text-slate-800">صور حسب اللون (color_image[COLOR_CODE])</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            v-for="colorCode in form.colors" 
            :key="colorCode"
            class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2"
          >
            <div class="flex items-center gap-2">
              <span class="w-4 h-4 rounded-full border border-slate-300" :style="{ backgroundColor: `#${colorCode}` }"></span>
              <span class="text-xs font-bold">#{{ colorCode }}</span>
            </div>
            <input 
              type="file" 
              accept="image/*"
              @change="onColorImageSelected($event, colorCode)"
              class="block w-full text-[11px] text-slate-500 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-[11px] file:font-bold file:bg-slate-200 file:text-slate-800 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import BaseSelect, { type SelectOption } from '~/components/dashboard/ui/BaseSelect.vue'
import RichTextEditor from '~/components/dashboard/ui/RichTextEditor.vue'
import { categoryApiService, type CategoryItem } from '~/services/categoryApiService'
import { brandApiService, type BrandItem } from '~/services/brandApiService'
import { colorApiService, type ColorItem } from '~/services/colorApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import type { ProductFormDataPayload } from '~/services/adminProductsApiService'

const props = defineProps<{
  initialData?: Partial<ProductFormDataPayload>;
  isEditMode?: boolean;
  isSubmitting?: boolean;
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ProductFormDataPayload): void;
  (e: 'cancel'): void;
}>()

const { adminCookie } = useAdminAuth()

const activeTab = ref('basic')
const formError = ref('')

// Tabs with Pure SVG Outline Icons
const tabs = [
  { 
    id: 'basic', 
    label: 'البيانات الأساسية', 
    icon: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>' 
  },
  { 
    id: 'category', 
    label: 'الأقسام والبراند', 
    icon: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>' 
  },
  { 
    id: 'pricing', 
    label: 'التسعير والمخزون', 
    icon: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' 
  },
  { 
    id: 'variations', 
    label: 'الألوان والسمات', 
    icon: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>' 
  },
  { 
    id: 'media', 
    label: 'الصور والملفات', 
    icon: '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' 
  }
]

// State Form Data
const form = reactive<ProductFormDataPayload>({
  id: props.initialData?.id || '',
  name_ar: props.initialData?.name_ar || '',
  name_en: props.initialData?.name_en || '',
  description_ar: props.initialData?.description_ar || '',
  description_en: props.initialData?.description_en || '',
  category_id: props.initialData?.category_id || '',
  sub_category_id: props.initialData?.sub_category_id || '',
  sub_sub_category_id: props.initialData?.sub_sub_category_id || '',
  brand_id: props.initialData?.brand_id || '',
  unit_price: props.initialData?.unit_price || '',
  purchase_price: props.initialData?.purchase_price || '',
  minimum_order_qty: props.initialData?.minimum_order_qty || 1,
  current_stock: props.initialData?.current_stock || 10,
  discount: props.initialData?.discount || 0,
  discount_type: props.initialData?.discount_type || 'flat',
  discount_start_date: props.initialData?.discount_start_date || '',
  discount_end_date: props.initialData?.discount_end_date || '',
  colors_active: props.initialData?.colors_active ?? false,
  colors: props.initialData?.colors || ['FF0000', '000000'],
  choice_attributes: [],
  choice_options: {},
  variations: props.initialData?.variations || [
    { code: 'FF0000-Default', price: 250, sku: 'SKU-RED', qty: 10 }
  ],
  thumbnail: null,
  images: [],
  color_images: {}
})

// File state helpers
const thumbnailName = ref('')
const galleryCount = ref(0)
const newColorInput = ref('')

// Categories, Brands, & Live API Colors
const categoriesList = ref<CategoryItem[]>([])
const brandsList = ref<BrandItem[]>([])
const colorsList = ref<ColorItem[]>([])
const isLoadingColors = ref(true)

const getToken = (): string => {
  if (adminCookie?.value) return adminCookie.value
  if (process.client) return localStorage.getItem('admin_token') || ''
  return ''
}

onMounted(async () => {
  try {
    categoriesList.value = await categoryApiService.fetchCategories()
    brandsList.value = await brandApiService.fetchBrands()
  } catch {}

  try {
    isLoadingColors.value = true
    const token = getToken()
    colorsList.value = await colorApiService.fetchColors(token)
  } catch {
    colorsList.value = []
  } finally {
    isLoadingColors.value = false
  }
})

const categorySelectOptions = computed<SelectOption[]>(() => {
  return categoriesList.value.map(c => ({ label: c.name, value: c.id }))
})

const availableSubCategories = computed(() => {
  if (!form.category_id) return []
  const selectedCat = categoriesList.value.find(c => String(c.id) === String(form.category_id))
  return selectedCat?.subCategories || []
})

const subCategorySelectOptions = computed<SelectOption[]>(() => {
  return availableSubCategories.value.map(s => ({ label: s.name, value: s.id }))
})

const brandSelectOptions = computed<SelectOption[]>(() => {
  return brandsList.value.map(b => ({ label: b.name, value: b.id }))
})

const discountTypeSelectOptions: SelectOption[] = [
  { label: 'مبلغ ثابت (flat)', value: 'flat' },
  { label: 'نسبة مئوية (percent %)', value: 'percent' }
]

const onCategoryChange = () => {
  form.sub_category_id = ''
  form.sub_sub_category_id = ''
}

// Color Swatch Selection Helpers
const isColorSelected = (colorCode: string): boolean => {
  const clean = colorCode.replace(/^#/, '').toUpperCase()
  return (form.colors || []).some(c => c.replace(/^#/, '').toUpperCase() === clean)
}

const toggleColorSelection = (colorCode: string) => {
  const clean = colorCode.replace(/^#/, '').toUpperCase()
  if (!form.colors) form.colors = []
  
  if (isColorSelected(clean)) {
    form.colors = form.colors.filter(c => c.replace(/^#/, '').toUpperCase() !== clean)
  } else {
    form.colors.push(clean)
  }
}

const addColor = () => {
  const clean = newColorInput.value.trim().replace(/^#/, '').toUpperCase()
  if (clean && !isColorSelected(clean)) {
    form.colors = [...(form.colors || []), clean]
    newColorInput.value = ''
  }
}

const removeColor = (idx: number) => {
  form.colors?.splice(idx, 1)
}

// Variations methods
const addVariationRow = () => {
  form.variations = [
    ...(form.variations || []),
    { code: 'VAR-' + (form.variations.length + 1), price: form.unit_price || 100, sku: 'SKU-VAR', qty: 10 }
  ]
}

const removeVariationRow = (idx: number) => {
  form.variations.splice(idx, 1)
}

// File Handler Methods
const onThumbnailSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.thumbnail = target.files[0]
    thumbnailName.value = target.files[0].name
  }
}

const onImagesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.images = Array.from(target.files)
    galleryCount.value = target.files.length
  }
}

const onColorImageSelected = (event: Event, colorCode: string) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    if (!form.color_images) form.color_images = {}
    form.color_images[colorCode] = target.files[0]
  }
}

// Form Submission
const handleSubmit = () => {
  formError.value = ''

  const cleanDescAr = form.description_ar ? form.description_ar.replace(/<[^>]*>/g, '').trim() : ''

  if (!form.name_ar.trim()) {
    activeTab.value = 'basic'
    formError.value = 'يرجى كتابة اسم المنتج بالعربي.'
    return
  }

  if (!cleanDescAr) {
    activeTab.value = 'basic'
    formError.value = 'يرجى كتابة وصف المنتج بالعربي.'
    return
  }

  if (!form.category_id) {
    activeTab.value = 'category'
    formError.value = 'يرجى اختيار القسم الرئيسي للمنتج.'
    return
  }

  if (!form.unit_price || Number(form.unit_price) <= 0) {
    activeTab.value = 'pricing'
    formError.value = 'يرجى إدخال سعر بيع المنتج بشكل صحيح.'
    return
  }

  if (!props.isEditMode && !form.thumbnail) {
    activeTab.value = 'media'
    formError.value = 'يرجى تحديد الصورة المصغرة الرئيسية للمنتج (thumbnail).'
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
