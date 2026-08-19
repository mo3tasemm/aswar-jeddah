<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- TOP BAR ACTIONS & TITLE -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 class="text-xl sm:text-2xl font-black text-slate-900">
          {{ isEditMode ? 'تعديل منتج موجود' : 'إضافة منتج جديد' }}
        </h2>
        <p class="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          قم بتعبئة بيانات المنتج باللغتين وتحديد التصنيفات، السمات، خيارات الألوان، والأسعار.
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
          <span>{{ isSubmitting ? 'جاري الحفظ والرفع...' : (isEditMode ? 'حفظ التعديلات' : 'إضافة المنتج') }}</span>
        </button>
      </div>
    </div>

    <!-- ERROR BANNER -->
    <Transition name="fade">
      <div v-if="formError" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake">
        <svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ formError }}</span>
      </div>
    </Transition>

    <!-- TABBED NAVIGATION HEADER (Pure SVG Icons) -->
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
            placeholder="مثال: مكنسة بيسيل بروهيت اللاسلكية..." 
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
            placeholder="e.g. Bissell ProHeat Cordless Vacuum..." 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            dir="ltr"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Arabic Description (Rich Text Editor) -->
        <RichTextEditor
          v-model="form.description_ar"
          label="الوصف (بالعربي)"
          :required="true"
          dir="rtl"
          placeholder="اكتب وصفاً مفصلاً ومنسقاً للمنتج..."
        />

        <!-- English Description (Rich Text Editor) -->
        <RichTextEditor
          v-model="form.description_en"
          label="الوصف (بالإنجليزي)"
          dir="ltr"
          placeholder="Write detailed formatted product description..."
        />
      </div>
    </div>

    <!-- TAB 2: DYNAMIC CATEGORIES, SUBCATEGORIES & BRAND -->
    <div v-show="activeTab === 'category'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
          <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          ربط التصنيفات والفئات الفرعية والعلامة التجارية
        </h3>
        <span class="text-xs text-slate-400 font-medium">جلب حي ومترابط من الـ API</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <!-- Main Category Select -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              الفئة الرئيسية (category_id) <span class="text-rose-500">*</span>
            </label>
            <span v-if="isLoadingCategories" class="text-[10px] text-amber-500 font-bold animate-pulse">جاري التحميل...</span>
          </div>
          <BaseSelect 
            v-model="form.category_id"
            placeholder="-- اختر الفئة الرئيسية --"
            :options="mainCategorySelectOptions"
            :required="true"
            :disabled="isLoadingCategories"
            @update:model-value="handleMainCategoryChange"
          />
        </div>

        <!-- Dynamic Subcategory Select (Fetched dynamically per parent_id) -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              الفئة الفرعية (sub_category_id)
            </label>
            <span v-if="isLoadingSubcategories" class="text-[10px] text-amber-500 font-bold animate-pulse">جاري جلب الفئات الفرعية...</span>
          </div>
          <BaseSelect 
            v-model="form.sub_category_id"
            :placeholder="subCategoryPlaceholder"
            :options="subCategorySelectOptions"
            :disabled="!form.category_id || isLoadingSubcategories || subCategoriesList.length === 0"
          />
          <p v-if="form.category_id && !isLoadingSubcategories && subCategoriesList.length === 0" class="text-[10px] text-slate-400 font-medium">
            لا توجد فئات فرعية مسجلة تحت هذا القسم.
          </p>
        </div>

        <!-- Sub Sub Category ID -->
        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-[#0B0E28] block">
            الفئة الفرعية الثانوية (sub_sub_category_id)
          </label>
          <input 
            type="number" 
            v-model="form.sub_sub_category_id"
            placeholder="رقم الفئة الثانوية (اختياري)" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        <!-- Brand Select -->
        <div class="space-y-1.5">
          <div class="flex items-center justify-between">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              العلامة التجارية (brand_id)
            </label>
            <span v-if="isLoadingBrands" class="text-[10px] text-amber-500 font-bold animate-pulse">جاري التحميل...</span>
          </div>
          <BaseSelect 
            v-model="form.brand_id"
            placeholder="-- اختر العلامة التجارية --"
            :options="brandSelectOptions"
            :disabled="isLoadingBrands"
          />
        </div>
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
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs font-extrabold text-slate-800 block">
            المخزون الكلي (current_stock)
          </label>
          <input 
            type="number" 
            v-model="form.current_stock"
            placeholder="10" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
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
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
          />
        </div>
      </div>

      <!-- Discount Section -->
      <div class="pt-4 border-t border-slate-100 space-y-4">
        <h4 class="text-sm font-bold text-slate-800">بيانات الخصم والعروض الترويجية</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-slate-800 block">قيمة الخصم (discount)</label>
            <input 
              type="number" 
              step="0.01"
              v-model="form.discount"
              placeholder="0" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
            />
          </div>

          <div class="space-y-1.5">
            <label class="text-xs font-extrabold text-slate-800 block">نوع الخصم (discount_type)</label>
            <BaseSelect 
              v-model="form.discount_type"
              :options="discountTypeSelectOptions"
            />
          </div>

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

    <!-- TAB 4: DYNAMIC COLORS, ATTRIBUTES & VARIATIONS -->
    <div v-show="activeTab === 'variations'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-8">
      
      <!-- 4.1 COLORS SECTION (GET /admin/colors/list + Swatches + Checkboxes) -->
      <div class="space-y-4">
        <div class="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              1. خيارات الألوان المتاحة (Colors)
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">تفعيل الألوان لجلب قائمة الألوان التفاعلية من الـ API وتخصيصها للمنتج.</p>
          </div>

          <!-- Color Active Toggle -->
          <label class="flex items-center gap-3 cursor-pointer select-none bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors">
            <div class="relative">
              <input type="checkbox" v-model="form.colors_active" class="sr-only peer">
              <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400"></div>
            </div>
            <span class="text-xs font-black text-slate-900">تفعيل الألوان (colors_active)</span>
          </label>
        </div>

        <!-- Color Selection UI (When colors_active is true) -->
        <Transition name="fade">
          <div v-if="form.colors_active" class="space-y-4 pt-2">
            <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-slate-700">اختر من الألوان المتاحة في المتجر:</span>
                <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[11px] font-black">
                  تم تحديد {{ (form.colors || []).length }} لون
                </span>
              </div>

              <!-- Filter Search for Colors -->
              <div class="relative w-full sm:w-64">
                <input 
                  type="text" 
                  v-model="colorSearchTerm"
                  placeholder="بحث في الألوان..."
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                />
                <svg class="w-4 h-4 text-slate-400 absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <!-- Loading Colors State -->
            <div v-if="isLoadingColors" class="flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 gap-3">
              <div class="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
              <span class="text-xs font-bold text-slate-600">جاري جلب قائمة الألوان من السيرفر...</span>
            </div>

            <!-- Swatches Grid -->
            <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              <div
                v-for="color in filteredColorsList"
                :key="color.id"
                @click="toggleColorSelection(color.code || color.name)"
                class="p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 select-none"
                :class="isColorSelected(color.code || color.name) 
                  ? 'border-amber-400 bg-amber-50/60 shadow-sm ring-2 ring-amber-400/20' 
                  : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'"
              >
                <!-- Color Swatch Circle -->
                <div 
                  class="w-6 h-6 rounded-full border border-slate-300 shrink-0 shadow-inner flex items-center justify-center transition-transform"
                  :style="{ backgroundColor: normalizeHex(color.code) }"
                >
                  <svg v-if="isColorSelected(color.code || color.name)" class="w-3.5 h-3.5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <!-- Color Name & Code -->
                <div class="flex flex-col min-w-0 overflow-hidden">
                  <span class="text-xs font-extrabold text-[#0B0E28] truncate">{{ color.name }}</span>
                  <span class="text-[10px] text-slate-400 font-mono">{{ normalizeHex(color.code) }}</span>
                </div>
              </div>
            </div>

            <!-- Selected Colors Pills Bar & Custom Color Input -->
            <div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <div class="flex flex-wrap items-center gap-2">
                <span class="text-xs font-bold text-slate-600">الألوان المختارة:</span>
                <div 
                  v-for="c in form.colors" 
                  :key="`color-pill-${cleanColorCode(c)}`" 
                  class="flex items-center gap-2 bg-[#0B0E28] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
                >
                  <span class="w-3.5 h-3.5 rounded-full border border-white/40" :style="{ backgroundColor: normalizeHex(c) }"></span>
                  <span>#{{ cleanColorCode(c) }}</span>
                  <button type="button" @click.stop="removeColor(c)" class="text-amber-400 hover:text-rose-400 font-black cursor-pointer">✕</button>
                </div>
                <span v-if="!form.colors || form.colors.length === 0" class="text-xs text-slate-400 italic">لم يتم اختيار أي لون بعد</span>
              </div>

              <!-- Custom Color Input -->
              <div class="flex items-center gap-2">
                <input 
                  type="text" 
                  v-model="newColorInput" 
                  placeholder="كود لون مخصص (FF0000)" 
                  class="w-40 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400"
                  dir="ltr"
                  @keyup.enter.prevent="addCustomColor"
                />
                <button 
                  type="button" 
                  @click="addCustomColor"
                  class="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer"
                >
                  + إضافة
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- 4.2 ATTRIBUTES & CHOICE OPTIONS SECTION (GET /admin/attributes/list) -->
      <div class="space-y-4 pt-4 border-t border-slate-100">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              2. السمات والخصائص (Attributes & Choice Options)
            </h3>
            <p class="text-xs text-slate-500 mt-0.5">اختر السمات المطلوبة (مثل المقاس، الخامة، السعة) وحدد خياراتها للمنتج.</p>
          </div>

          <span v-if="isLoadingAttributes" class="text-xs font-bold text-amber-500 animate-pulse">جاري جلب السمات...</span>
        </div>

        <!-- Available Attributes Multi-Selector Bar -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <label class="text-xs font-extrabold text-slate-800 block">
            اضغط لتحديد السمات المطبقة على هذا المنتج:
          </label>

          <div v-if="attributesList.length > 0" class="flex flex-wrap gap-2.5">
            <button
              type="button"
              v-for="attr in attributesList"
              :key="`attr-btn-${attr.id}`"
              @click="toggleAttributeSelection(attr.id)"
              class="px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer border"
              :class="isAttributeSelected(attr.id)
                ? 'bg-amber-400 border-amber-500 text-[#0B0E28] shadow-sm'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300'"
            >
              <svg v-if="isAttributeSelected(attr.id)" class="w-3.5 h-3.5 text-[#0B0E28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ attr.name }}</span>
            </button>
          </div>

          <div v-else-if="!isLoadingAttributes" class="text-xs text-slate-400 font-bold">
            لا توجد سمات متاحة مسجلة في المتجر.
          </div>
        </div>

        <!-- Selected Attributes Choice Options Configuration -->
        <div v-if="selectedAttributesObjects.length > 0" class="space-y-4 pt-2">
          <h4 class="text-xs font-black text-slate-800">تحديد خيارات وقيم السمات المختارة (Choice Options):</h4>

          <div 
            v-for="attr in selectedAttributesObjects" 
            :key="`selected-attr-${attr.id}`"
            class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-slate-800"></span>
                <span class="text-xs font-black text-[#0B0E28]">{{ attr.name }}</span>
                <span class="text-[11px] text-slate-400 font-mono">(ID: {{ attr.id }})</span>
              </div>

              <button 
                type="button" 
                @click="toggleAttributeSelection(attr.id)"
                class="text-xs font-bold text-rose-500 hover:text-rose-700 cursor-pointer"
              >
                إلغاء السمة
              </button>
            </div>

            <!-- Choice Options Chips & Input -->
            <div class="space-y-2">
              <div class="flex flex-wrap items-center gap-2">
                <!-- Active Option Chips with unique string keys -->
                <div 
                  v-for="opt in getChoiceOptions(attr.id)" 
                  :key="`opt-chip-${attr.id}-${opt}`"
                  class="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm"
                >
                  <span>{{ opt }}</span>
                  <button 
                    type="button" 
                    @click="removeChoiceOption(attr.id, opt)" 
                    class="text-slate-400 hover:text-rose-500 font-black ms-1"
                  >
                    ✕
                  </button>
                </div>

                <!-- Input to add new choice option -->
                <div class="flex items-center gap-1.5">
                  <input 
                    type="text" 
                    v-model="newOptionInputs[attr.id]"
                    :placeholder="`أضف خيار لـ ${attr.name}...`"
                    class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
                    @keyup.enter.prevent="addChoiceOption(attr.id)"
                  />
                  <button 
                    type="button" 
                    @click="addChoiceOption(attr.id)"
                    class="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer"
                  >
                    + إضافة
                  </button>
                </div>
              </div>

              <!-- Quick Predefined Suggestions if available -->
              <div v-if="attr.values && attr.values.length > 0" class="flex flex-wrap items-center gap-1.5 pt-1">
                <span class="text-[10px] font-bold text-slate-400">اقتراحات سريعة:</span>
                <button
                  type="button"
                  v-for="val in attr.values"
                  :key="`val-sug-${val.id}`"
                  @click="addQuickOption(attr.id, val.value)"
                  class="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-400 hover:text-[#0B0E28]"
                >
                  + {{ val.value }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4.3 VARIATIONS & COMBINATIONS GENERATOR -->
      <div class="pt-4 border-t border-slate-100 space-y-4">
        <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h4 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              3. جدول المتغيرات والتوليفات (Product Variations)
            </h4>
            <p class="text-xs text-slate-500 mt-0.5">يتم تحديث التوليفات والأسعار والمخزون تلقائياً عند تغيير الألوان أو السمات.</p>
          </div>

          <div class="flex items-center gap-2">
            <button 
              type="button" 
              @click="autoGenerateVariations(false)"
              class="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="إعادة ضبط وتوليد التوليفات من البداية"
            >
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
              </svg>
              <span>إعادة توليد التوليفات</span>
            </button>

            <button 
              type="button" 
              @click="addManualVariationRow"
              class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              + إضافة صف يدوي
            </button>
          </div>
        </div>

        <div v-if="(form.variations || []).length === 0" class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-bold">
          لا توجد متغيرات حالياً. سيتم إنشاؤها تلقائياً عند تحديد لون أو سمة، أو يمكنك إضافة صف يدوياً.
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="(v, idx) in form.variations" 
            :key="`var-row-${v.code || idx}`"
            class="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 relative items-center shadow-xs"
          >
            <div>
              <div class="flex items-center justify-between mb-1">
                <label class="text-[11px] font-bold text-slate-600 block">رمز المتغير (code)</label>
                <span v-if="v.color_name" class="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                  {{ v.color_name }}
                </span>
              </div>
              <input 
                type="text" 
                v-model="v.code" 
                placeholder="FF0000-S"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 font-mono" 
                dir="ltr"
              />
            </div>
            <div>
              <label class="text-[11px] font-bold text-slate-600 block">السعر الخاص</label>
              <input 
                type="number" 
                step="0.01"
                v-model.number="v.price" 
                placeholder="0.00"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" 
              />
            </div>
            <div>
              <label class="text-[11px] font-bold text-slate-600 block">رمز الـ SKU</label>
              <input 
                type="text" 
                v-model="v.sku" 
                placeholder="SKU-CODE"
                class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" 
                dir="ltr"
              />
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1">
                <label class="text-[11px] font-bold text-slate-600 block">الكمية بالمخزن</label>
                <input 
                  type="number" 
                  v-model.number="v.qty" 
                  placeholder="10"
                  class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" 
                />
              </div>
              <button 
                type="button" 
                @click="removeVariationRow(idx)"
                class="mt-4 p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                title="حذف هذا المتغير"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 5: FILES & MEDIA (Thumbnail, Gallery & Color Images) -->
    <div v-show="activeTab === 'media'" class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
      <h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
        الصور والملفات (Media & Gallery Attachments)
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Thumbnail (Required Single File with Visual Preview) -->
        <div class="space-y-2">
          <label class="text-xs font-extrabold text-slate-800 block flex items-center justify-between">
            <span>الصورة المصغرة الرئيسية (thumbnail) <span class="text-rose-500">*</span></span>
            <span v-if="thumbnailPreview" class="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              جاهزة للمعاينة
            </span>
          </label>
          
          <!-- Image Preview Card -->
          <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3">
            <div v-if="thumbnailPreview" class="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-white group">
              <img 
                :src="thumbnailPreview" 
                @error="handleThumbnailImgError"
                class="w-full h-full object-contain p-1" 
                alt="معاينة الصورة المصغرة"
              />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button 
                  type="button" 
                  @click="triggerThumbnailPick" 
                  class="bg-amber-400 text-slate-900 px-2.5 py-1 rounded-xl text-xs font-black shadow hover:bg-amber-500"
                >
                  استبدال
                </button>
                <button 
                  type="button" 
                  @click="removeThumbnail" 
                  class="bg-rose-500 text-white p-1.5 rounded-xl text-xs shadow hover:bg-rose-600"
                  title="حذف الصورة"
                >
                  ✕
                </button>
              </div>
            </div>

            <!-- Hidden File Input -->
            <input 
              ref="thumbnailInputRef"
              type="file" 
              accept="image/*"
              @change="onThumbnailSelected"
              class="hidden"
            />

            <!-- File Upload Action Button -->
            <div class="flex items-center gap-2">
              <button 
                type="button" 
                @click="triggerThumbnailPick"
                class="py-2 px-4 rounded-xl text-xs font-black bg-amber-400 text-[#0B0E28] hover:bg-amber-500 shadow-sm cursor-pointer"
              >
                {{ thumbnailPreview ? 'اختر صورة جديدة للاستبدال' : 'رفع الصورة المصغرة' }}
              </button>

              <button 
                v-if="thumbnailPreview"
                type="button" 
                @click="removeThumbnail"
                class="py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer"
              >
                حذف
              </button>
            </div>

            <p v-if="thumbnailName" class="text-xs font-bold text-slate-600 truncate max-w-[260px]" dir="ltr">
              {{ thumbnailName }}
            </p>
          </div>
        </div>

        <!-- Multiple Images Gallery -->
        <div class="space-y-2">
          <label class="text-xs font-extrabold text-slate-800 block flex items-center justify-between">
            <span>معرض صور المنتج الإضافية (images[])</span>
            <span v-if="galleryPreviews.length > 0" class="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {{ galleryPreviews.length }} صور
            </span>
          </label>
          <div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3">
            <!-- Gallery Previews Grid -->
            <div v-if="galleryPreviews.length > 0" class="flex flex-wrap gap-2.5 justify-center max-h-48 overflow-y-auto p-1">
              <div 
                v-for="(prev, gIdx) in galleryPreviews" 
                :key="`gallery-prev-${gIdx}`" 
                class="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white"
              >
                <img :src="prev" class="w-full h-full object-cover" />
                <button 
                  type="button" 
                  @click="removeGalleryImage(gIdx)" 
                  class="absolute top-0.5 end-0.5 bg-rose-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] shadow hover:bg-rose-600 cursor-pointer"
                  title="حذف هذه الصورة"
                >
                  ✕
                </button>
              </div>
            </div>

            <input 
              type="file" 
              accept="image/*"
              multiple
              @change="onImagesSelected"
              class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      <!-- Color Images Attachments -->
      <div v-if="form.colors_active && (form.colors || []).length > 0" class="pt-4 border-t border-slate-100 space-y-3">
        <h4 class="text-sm font-bold text-slate-800">صور المنتجات حسب اللون المختار (color_image[COLOR_CODE])</h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div 
            v-for="colorCode in form.colors" 
            :key="colorCode"
            class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-4 h-4 rounded-full border border-slate-300 shadow-inner" :style="{ backgroundColor: normalizeHex(colorCode) }"></span>
                <span class="text-xs font-black text-slate-900">#{{ cleanColorCode(colorCode) }}</span>
              </div>

              <span v-if="colorImageNames[cleanColorCode(colorCode)]" class="text-[10px] font-bold text-emerald-600">تم الاختيار</span>
            </div>

            <div v-if="colorImagePreviews[cleanColorCode(colorCode)]" class="w-16 h-16 rounded-xl overflow-hidden border border-slate-200">
              <img :src="colorImagePreviews[cleanColorCode(colorCode)]" class="w-full h-full object-cover" />
            </div>

            <input 
              type="file" 
              accept="image/*"
              @change="onColorImageSelected($event, colorCode)"
              class="block w-full text-[11px] text-slate-500 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-slate-200 file:text-slate-800 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import BaseSelect, { type SelectOption } from '~/components/dashboard/ui/BaseSelect.vue'
import RichTextEditor from '~/components/dashboard/ui/RichTextEditor.vue'
import { adminCategoriesApiService, type AdminCategoryItem } from '~/services/adminCategoriesApiService'
import { adminBrandsApiService, type AdminBrandItem } from '~/services/adminBrandsApiService'
import { adminColorsApiService, type AdminColorItem } from '~/services/adminColorsApiService'
import { adminAttributesApiService, type AdminAttributeItem } from '~/services/adminAttributesApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { 
  normalizeProductImageUrl, 
  extractCleanFilename, 
  type ProductFormDataPayload, 
  type ProductVariationItem 
} from '~/services/adminProductsApiService'

const props = defineProps<{
  initialData?: Partial<ProductFormDataPayload>;
  isEditMode?: boolean;
  isSubmitting?: boolean;
  serverError?: string;
}>()

const emit = defineEmits<{
  (e: 'submit', payload: ProductFormDataPayload): void;
  (e: 'cancel'): void;
}>()

const { adminCookie, adminToken } = useAdminAuth()

const activeTab = ref('basic')
const formError = ref('')

watch(() => props.serverError, (val) => {
  if (val) formError.value = val
})

// Tabs with pure SVG icons
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
  id: '',
  product_type: 'physical',
  name_ar: '',
  name_en: '',
  description_ar: '',
  description_en: '',
  category_id: '',
  sub_category_id: '',
  sub_sub_category_id: '',
  brand_id: '',
  unit_price: '',
  purchase_price: '',
  minimum_order_qty: 1,
  current_stock: 10,
  discount: 0,
  discount_type: 'flat',
  discount_start_date: '',
  discount_end_date: '',
  colors_active: false,
  colors: [],
  choice_attributes: [],
  choice_options: {},
  variations: [],
  thumbnail: null,
  images: [],
  color_images: {}
})

// Dynamic Data Lists
const categoriesList = ref<AdminCategoryItem[]>([])
const subCategoriesList = ref<AdminCategoryItem[]>([])
const brandsList = ref<AdminBrandItem[]>([])
const colorsList = ref<AdminColorItem[]>([])
const attributesList = ref<AdminAttributeItem[]>([])

// Loading states
const isLoadingCategories = ref(false)
const isLoadingSubcategories = ref(false)
const isLoadingBrands = ref(false)
const isLoadingColors = ref(false)
const isLoadingAttributes = ref(false)

// UI Helpers
const colorSearchTerm = ref('')
const newColorInput = ref('')
const newOptionInputs = reactive<Record<string | number, string>>({})
const thumbnailName = ref('')
const thumbnailPreview = ref<string>('')
const thumbnailInputRef = ref<HTMLInputElement | null>(null)
const galleryCount = ref(0)
const galleryPreviews = ref<string[]>([])
const colorImagePreviews = reactive<Record<string, string>>({})
const colorImageNames = reactive<Record<string, string>>({})

let isInitialPopulating = false

const triggerThumbnailPick = () => {
  thumbnailInputRef.value?.click()
}

const handleThumbnailImgError = (event: Event) => {
  const target = event.target as HTMLImageElement
  if (!target) return
  const currentSrc = target.src || ''
  if (currentSrc.includes('/product/thumbnail/')) {
    target.src = currentSrc.replace('/product/thumbnail/', '/product/')
  }
}

const getToken = (): string => {
  if (adminToken?.value) return adminToken.value
  if (adminCookie?.value) return adminCookie.value
  if (process.client) {
    return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
  }
  return ''
}

// 0. Subcategories Fetcher (Declared before populateForm to avoid TDZ ReferenceError)
const fetchSubcategoriesForCategory = async (parentId: string | number) => {
  if (!parentId) {
    subCategoriesList.value = []
    return
  }

  isLoadingSubcategories.value = true
  const token = getToken()

  try {
    const res = await adminCategoriesApiService.fetchSubcategories(token, parentId)
    if (res.success) {
      subCategoriesList.value = res.data
    } else {
      subCategoriesList.value = []
    }
  } catch (err) {
    console.warn('Error fetching subcategories:', err)
    subCategoriesList.value = []
  } finally {
    isLoadingSubcategories.value = false
  }
}

// 1. Populate Form From External Data
const populateForm = async (data: Partial<ProductFormDataPayload>) => {
  if (!data) return
  isInitialPopulating = true

  form.id = data.id || ''
  form.product_type = data.product_type || 'physical'
  form.name_ar = data.name_ar || ''
  form.name_en = data.name_en || ''
  form.description_ar = data.description_ar || ''
  form.description_en = data.description_en || ''
  form.category_id = data.category_id !== undefined && data.category_id !== null ? String(data.category_id) : ''
  form.sub_category_id = data.sub_category_id !== undefined && data.sub_category_id !== null ? String(data.sub_category_id) : ''
  form.sub_sub_category_id = data.sub_sub_category_id !== undefined && data.sub_sub_category_id !== null ? String(data.sub_sub_category_id) : ''
  form.brand_id = data.brand_id !== undefined && data.brand_id !== null ? String(data.brand_id) : ''
  form.unit_price = data.unit_price !== undefined && data.unit_price !== null ? data.unit_price : ''
  form.purchase_price = data.purchase_price !== undefined && data.purchase_price !== null ? data.purchase_price : ''
  form.minimum_order_qty = data.minimum_order_qty || 1
  form.current_stock = data.current_stock !== undefined && data.current_stock !== null ? data.current_stock : 10
  form.discount = data.discount || 0
  form.discount_type = data.discount_type || 'flat'
  form.discount_start_date = data.discount_start_date || ''
  form.discount_end_date = data.discount_end_date || ''
  form.colors_active = Boolean(data.colors_active)
  form.colors = data.colors ? [...data.colors] : []
  form.choice_attributes = data.choice_attributes ? [...data.choice_attributes] : []
  form.choice_options = data.choice_options ? JSON.parse(JSON.stringify(data.choice_options)) : {}
  form.variations = data.variations && data.variations.length > 0 ? JSON.parse(JSON.stringify(data.variations)) : []
  form.thumbnail = data.thumbnail || null
  form.images = data.images ? [...data.images] : []
  form.color_images = data.color_images ? { ...data.color_images } : {}

  // Pre-fill image previews with normalized URLs
  if (typeof form.thumbnail === 'string' && form.thumbnail) {
    thumbnailPreview.value = normalizeProductImageUrl(form.thumbnail, true)
    thumbnailName.value = extractCleanFilename(form.thumbnail) || 'الصورة المحفوظة'
  } else if (!form.thumbnail) {
    thumbnailPreview.value = ''
    thumbnailName.value = ''
  }

  galleryPreviews.value = []
  if (Array.isArray(form.images)) {
    form.images.forEach(img => {
      if (typeof img === 'string' && img) {
        galleryPreviews.value.push(normalizeProductImageUrl(img, false))
      }
    })
    galleryCount.value = galleryPreviews.value.length
  }

  if (form.color_images) {
    Object.entries(form.color_images).forEach(([k, v]) => {
      const clean = cleanColorCode(k)
      if (typeof v === 'string' && v) {
        colorImagePreviews[clean] = normalizeProductImageUrl(v, false)
        colorImageNames[clean] = extractCleanFilename(v)
      }
    })
  }

  // If variations are empty but colors or attributes exist, auto-generate them
  if ((!form.variations || form.variations.length === 0) && (form.colors_active || (form.choice_attributes && form.choice_attributes.length > 0))) {
    autoGenerateVariations(true)
  }

  // Fetch subcategories if category_id exists
  if (form.category_id) {
    await fetchSubcategoriesForCategory(form.category_id)
  }

  setTimeout(() => {
    isInitialPopulating = false
  }, 250)
}

// Watch initialData prop for async population
watch(() => props.initialData, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    populateForm(newVal)
  }
}, { immediate: true, deep: true })

// Auto-generate variations when Colors or Attributes change
watch(
  [
    () => form.colors_active,
    () => form.colors,
    () => form.choice_attributes,
    () => form.choice_options
  ],
  () => {
    if (isInitialPopulating) return
    autoGenerateVariations(true)
  },
  { deep: true }
)

// 2. Initial Lifecycle Fetch
onMounted(async () => {
  const token = getToken()

  if (props.initialData && Object.keys(props.initialData).length > 0) {
    await populateForm(props.initialData)
  }

  // Load Main Categories
  isLoadingCategories.value = true
  try {
    const catRes = await adminCategoriesApiService.fetchCategories(token, '', 1, { position: 0 })
    if (catRes.success) {
      categoriesList.value = catRes.data
    }
  } catch (err) {
    console.warn('Error fetching main categories:', err)
  } finally {
    isLoadingCategories.value = false
  }

  // Load Brands
  isLoadingBrands.value = true
  try {
    const brandRes = await adminBrandsApiService.fetchBrands(token, '', 1, 100)
    if (brandRes.success) {
      brandsList.value = brandRes.data
    }
  } catch (err) {
    console.warn('Error fetching brands:', err)
  } finally {
    isLoadingBrands.value = false
  }

  // Load Colors
  isLoadingColors.value = true
  try {
    const colorRes = await adminColorsApiService.fetchColors(token, '', 1, 100)
    if (colorRes.success) {
      colorsList.value = colorRes.data
    }
  } catch (err) {
    console.warn('Error fetching colors:', err)
  } finally {
    isLoadingColors.value = false
  }

  // Load Attributes
  isLoadingAttributes.value = true
  try {
    const attrRes = await adminAttributesApiService.fetchAttributes(token, '', 1, 100)
    if (attrRes.success) {
      attributesList.value = attrRes.data
    }
  } catch (err) {
    console.warn('Error fetching attributes:', err)
  } finally {
    isLoadingAttributes.value = false
  }

  // If editing and category_id is already populated, fetch subcategories
  if (form.category_id) {
    await fetchSubcategoriesForCategory(form.category_id)
  }
})

// 3. Categories & Subcategories Handlers
const mainCategorySelectOptions = computed<SelectOption[]>(() => {
  return categoriesList.value.map(c => ({
    label: c.name,
    value: c.id
  }))
})

const subCategorySelectOptions = computed<SelectOption[]>(() => {
  return subCategoriesList.value.map(s => ({
    label: s.name,
    value: s.id
  }))
})

const subCategoryPlaceholder = computed(() => {
  if (!form.category_id) return 'اختر الفئة الرئيسية أولاً'
  if (isLoadingSubcategories.value) return 'جاري جلب الفئات الفرعية...'
  if (subCategoriesList.value.length === 0) return 'لا توجد فئات فرعية متاحة'
  return '-- اختر الفئة الفرعية --'
})

const handleMainCategoryChange = async (newCategoryId: string | number) => {
  form.sub_category_id = ''
  form.sub_sub_category_id = ''
  await fetchSubcategoriesForCategory(newCategoryId)
}

// 3. Brands & Discount Options
const brandSelectOptions = computed<SelectOption[]>(() => {
  return brandsList.value.map(b => ({
    label: b.name,
    value: b.id
  }))
})

const discountTypeSelectOptions: SelectOption[] = [
  { label: 'مبلغ ثابت (flat)', value: 'flat' },
  { label: 'نسبة مئوية (percent %)', value: 'percent' }
]

// 4. Color Swatch Helpers
const cleanColorCode = (code: string | undefined): string => {
  if (!code) return ''
  return String(code).replace(/^#/, '').toUpperCase()
}

const normalizeHex = (code: string | undefined): string => {
  if (!code) return '#000000'
  const clean = cleanColorCode(code)
  return `#${clean}`
}

const filteredColorsList = computed(() => {
  if (!colorSearchTerm.value.trim()) return colorsList.value
  const q = colorSearchTerm.value.trim().toLowerCase()
  return colorsList.value.filter(c => 
    c.name.toLowerCase().includes(q) || 
    (c.code && c.code.toLowerCase().includes(q))
  )
})

const isColorSelected = (colorCodeOrName: string): boolean => {
  const clean = cleanColorCode(colorCodeOrName)
  return (form.colors || []).some(c => cleanColorCode(c) === clean)
}

const toggleColorSelection = (colorCodeOrName: string) => {
  const clean = cleanColorCode(colorCodeOrName)
  if (!clean) return
  const current = form.colors ? [...form.colors] : []

  if (isColorSelected(clean)) {
    form.colors = current.filter(c => cleanColorCode(c) !== clean)
  } else {
    form.colors = [...current, clean]
  }
}

const addCustomColor = () => {
  const clean = cleanColorCode(newColorInput.value)
  if (clean && !isColorSelected(clean)) {
    const current = form.colors ? [...form.colors] : []
    form.colors = [...current, clean]
    newColorInput.value = ''
  }
}

const removeColor = (colorCode: string) => {
  const clean = cleanColorCode(colorCode)
  form.colors = (form.colors || []).filter(c => cleanColorCode(c) !== clean)
}

// 5. Attributes & Choice Options Helpers
const isAttributeSelected = (attrId: string | number): boolean => {
  const idStr = String(attrId)
  return (form.choice_attributes || []).some(id => String(id) === idStr)
}

const selectedAttributesObjects = computed<AdminAttributeItem[]>(() => {
  return attributesList.value.filter(attr => isAttributeSelected(attr.id))
})

const toggleAttributeSelection = (attrId: string | number) => {
  const idStr = String(attrId)
  const currentAttrs = (form.choice_attributes || []).map(String)
  const currentOptions = form.choice_options ? { ...form.choice_options } : {}

  if (isAttributeSelected(attrId)) {
    form.choice_attributes = currentAttrs.filter(id => id !== idStr)
    delete currentOptions[idStr]
    delete currentOptions[attrId]
    form.choice_options = currentOptions
  } else {
    form.choice_attributes = [...currentAttrs, idStr]
    form.choice_options = {
      ...currentOptions,
      [idStr]: currentOptions[idStr] || currentOptions[attrId] || []
    }
  }
}

const getChoiceOptions = (attrId: string | number): string[] => {
  const idStr = String(attrId)
  return form.choice_options?.[idStr] || form.choice_options?.[attrId] || []
}

const addChoiceOption = (attrId: string | number) => {
  const idStr = String(attrId)
  const rawVal = String(newOptionInputs[idStr] || newOptionInputs[attrId] || '').trim()
  if (!rawVal) return

  // Split by commas, Arabic commas (،), or newlines to allow multiple values (e.g. "40, 41, 42" or "L, XL")
  const splitValues = rawVal
    .split(/[,،\n]+/)
    .map(s => s.trim())
    .filter(Boolean)

  if (splitValues.length === 0) return

  const currentOpts = form.choice_options?.[idStr] 
    ? [...form.choice_options[idStr]] 
    : (form.choice_options?.[attrId] ? [...form.choice_options[attrId]] : [])

  splitValues.forEach(val => {
    if (!currentOpts.includes(val)) {
      currentOpts.push(val)
    }
  })

  form.choice_options = {
    ...(form.choice_options || {}),
    [idStr]: currentOpts
  }
  newOptionInputs[idStr] = ''
  newOptionInputs[attrId] = ''
}

const addQuickOption = (attrId: string | number, value: string) => {
  if (!value) return
  const idStr = String(attrId)
  const currentOpts = form.choice_options?.[idStr] 
    ? [...form.choice_options[idStr]] 
    : (form.choice_options?.[attrId] ? [...form.choice_options[attrId]] : [])

  if (!currentOpts.includes(value)) {
    currentOpts.push(value)
    form.choice_options = {
      ...(form.choice_options || {}),
      [idStr]: currentOpts
    }
  }
}

const removeChoiceOption = (attrId: string | number, opt: string) => {
  const idStr = String(attrId)
  const currentOpts = form.choice_options?.[idStr] || form.choice_options?.[attrId] || []
  const updated = currentOpts.filter(o => o !== opt)
  form.choice_options = {
    ...form.choice_options,
    [idStr]: updated
  }
}

// 6. Variations Auto-Generator
const getColorNameByCode = (colorCode: string): string => {
  const clean = cleanColorCode(colorCode)
  const found = colorsList.value.find(c => cleanColorCode(c.code) === clean || cleanColorCode(c.name) === clean)
  return found ? found.name : ''
}

const autoGenerateVariations = (preserveExisting: boolean = true) => {
  const activeColors = form.colors_active && (form.colors || []).length > 0 ? form.colors! : []
  const choiceAttrIds = form.choice_attributes || []
  
  const attrOptionsMatrix: string[][] = []
  choiceAttrIds.forEach(attrId => {
    const idStr = String(attrId)
    const opts = form.choice_options?.[idStr] || form.choice_options?.[attrId] || []
    if (opts.length > 0) {
      attrOptionsMatrix.push(opts)
    }
  })

  // Cartesian Product helper
  const cartesian = (arrays: string[][]): string[][] => {
    return arrays.reduce((acc, curr) => {
      return acc.flatMap(a => curr.map(c => [...a, c]))
    }, [[]] as string[][])
  }

  // Create lookup map of existing variations to preserve custom values
  const existingMap = new Map<string, ProductVariationItem>()
  if (preserveExisting && Array.isArray(form.variations)) {
    form.variations.forEach(v => {
      const codeKey = String(v.code || '').replace(/^#/, '').trim().toUpperCase()
      if (codeKey) {
        existingMap.set(codeKey, v)
      }
    })
  }

  const variationRows: ProductVariationItem[] = []
  const defaultPrice = form.unit_price !== undefined && form.unit_price !== '' ? Number(form.unit_price) : 100

  if (activeColors.length > 0 && attrOptionsMatrix.length > 0) {
    const attrCombos = cartesian(attrOptionsMatrix)
    activeColors.forEach(c => {
      const cleanC = cleanColorCode(c)
      const colorName = getColorNameByCode(c)
      attrCombos.forEach(combo => {
        const comboStr = combo.join('-')
        const code = `${cleanC}-${comboStr}`
        const existing = existingMap.get(code.toUpperCase())
        variationRows.push({
          code: code,
          color_name: colorName,
          price: existing?.price ?? defaultPrice,
          sku: existing?.sku || `SKU-${code}`,
          qty: existing?.qty ?? 10
        })
      })
    })
  } else if (activeColors.length > 0) {
    activeColors.forEach(c => {
      const cleanC = cleanColorCode(c)
      const colorName = getColorNameByCode(c)
      const code = cleanC
      const existing = existingMap.get(code.toUpperCase())
      variationRows.push({
        code: code,
        color_name: colorName,
        price: existing?.price ?? defaultPrice,
        sku: existing?.sku || `SKU-${code}`,
        qty: existing?.qty ?? 10
      })
    })
  } else if (attrOptionsMatrix.length > 0) {
    const attrCombos = cartesian(attrOptionsMatrix)
    attrCombos.forEach(combo => {
      const comboStr = combo.join('-')
      const code = comboStr
      const existing = existingMap.get(code.toUpperCase())
      variationRows.push({
        code: code,
        price: existing?.price ?? defaultPrice,
        sku: existing?.sku || `SKU-${code}`,
        qty: existing?.qty ?? 10
      })
    })
  }

  // Calculate stock per variation if not preserved
  if (variationRows.length > 0) {
    const stockPerVar = Math.max(1, Math.floor(Number(form.current_stock || 10) / variationRows.length))
    variationRows.forEach(v => {
      if (v.qty === undefined || v.qty === null || !existingMap.has(v.code.toUpperCase())) {
        v.qty = stockPerVar
      }
    })
  }

  form.variations = variationRows
}

const addManualVariationRow = () => {
  if (!form.variations) form.variations = []
  form.variations.push({
    code: `VAR-${form.variations.length + 1}`,
    price: form.unit_price || 100,
    sku: `SKU-VAR-${form.variations.length + 1}`,
    qty: 10
  })
}

const removeVariationRow = (idx: number) => {
  form.variations?.splice(idx, 1)
}

// 7. Media & File Handling
const onThumbnailSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    form.thumbnail = file
    thumbnailName.value = file.name
    thumbnailPreview.value = URL.createObjectURL(file)
  }
}

const removeThumbnail = () => {
  form.thumbnail = null
  thumbnailName.value = ''
  thumbnailPreview.value = ''
}

const onImagesSelected = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    const files = Array.from(target.files)
    if (!form.images) form.images = []
    
    files.forEach(f => {
      form.images!.push(f)
      galleryPreviews.value.push(URL.createObjectURL(f))
    })
    galleryCount.value = galleryPreviews.value.length
  }
}

const removeGalleryImage = (idx: number) => {
  form.images?.splice(idx, 1)
  galleryPreviews.value.splice(idx, 1)
  galleryCount.value = galleryPreviews.value.length
}

const onColorImageSelected = (event: Event, colorCode: string) => {
  const clean = cleanColorCode(colorCode)
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    if (!form.color_images) form.color_images = {}
    form.color_images[clean] = file
    colorImagePreviews[clean] = URL.createObjectURL(file)
    colorImageNames[clean] = file.name
  }
}

// 8. Form Submit & Validation
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
    formError.value = 'يرجى اختيار الفئة الرئيسية للمنتج.'
    return
  }

  if (!form.unit_price || Number(form.unit_price) <= 0) {
    activeTab.value = 'pricing'
    formError.value = 'يرجى إدخال سعر بيع المنتج بشكل صحيح (أكبر من 0).'
    return
  }

  if (!props.isEditMode && !form.thumbnail) {
    activeTab.value = 'media'
    formError.value = 'يرجى تحديد الصورة المصغرة الرئيسية للمنتج (thumbnail).'
    return
  }

  // Auto-commit any remaining text in newOptionInputs before submission
  Object.keys(newOptionInputs).forEach(attrId => {
    if (newOptionInputs[attrId] && String(newOptionInputs[attrId]).trim()) {
      addChoiceOption(attrId)
    }
  })

  // 1. Clean and deduplicate colors
  const cleanColors = Array.from(
    new Set(
      (form.colors || [])
        .map(c => cleanColorCode(c))
        .filter(Boolean)
    )
  )
  const isColorsActive = Boolean(form.colors_active && cleanColors.length > 0)

  // 2. Clean valid choice attributes & non-empty options
  const cleanedChoiceAttrs: (string | number)[] = []
  const cleanedChoiceOptions: Record<string | number, string[]> = {}
  
  if (form.choice_attributes && form.choice_attributes.length > 0) {
    form.choice_attributes.forEach(attrId => {
      const opts = Array.from(
        new Set(
          (form.choice_options?.[attrId] || [])
            .map(o => String(o || '').trim())
            .filter(Boolean)
        )
      )
      if (opts.length > 0) {
        cleanedChoiceAttrs.push(attrId)
        cleanedChoiceOptions[attrId] = opts
      }
    })
  }

  // 3. Ensure variations are accurately generated and validated
  const hasVariations = Boolean(isColorsActive || cleanedChoiceAttrs.length > 0)
  let cleanedVariations: ProductVariationItem[] = []

  if (hasVariations) {
    if (!form.variations || form.variations.length === 0) {
      autoGenerateVariations(true)
    }

    const fallbackPrice = Number(form.unit_price) || 0
    const seenCodes = new Set<string>()

    cleanedVariations = (form.variations || [])
      .map(v => {
        const code = String(v.code || '').replace(/^#/, '').trim().toUpperCase()
        if (!code || seenCodes.has(code)) return null
        seenCodes.add(code)

        return {
          code,
          color_name: v.color_name || '',
          price: Number(v.price) > 0 ? Number(v.price) : fallbackPrice,
          sku: String(v.sku || '').trim() || `SKU-${code}`,
          qty: Number(v.qty) >= 0 ? Number(v.qty) : 10
        }
      })
      .filter((v): v is ProductVariationItem => v !== null)
  }

  emit('submit', { 
    ...form,
    colors_active: isColorsActive,
    colors: cleanColors,
    choice_attributes: cleanedChoiceAttrs,
    choice_options: cleanedChoiceOptions,
    variations: cleanedVariations
  })
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

