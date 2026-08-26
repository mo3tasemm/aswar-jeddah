<template>
  <div class="space-y-6 pb-28 max-w-7xl mx-auto relative" :dir="adminDir">
    
    <!-- 1. UNIFIED ADMIN PAGE HEADER -->
    <AdminPageHeader
      title="إدارة واجهة المتجر والصفحة الرئيسية"
      subtitle="تخصيص كافة أقسام الصفحة الرئيسية باللغتين العربية والإنجليزية، إعادة الترتيب بالسحب والإفلات، وإدارة المحتوى."
      icon="fa-solid fa-cubes-stacked"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'إدارة واجهة المتجر' }
      ]"
      :show-lang-tabs="true"
      v-model:lang-tab="activeLangTab"
      :show-save="true"
      :is-saving="isSaving"
      save-label="حفظ ونشر التعديلات"
      @save="saveAllLayout"
    >
      <template #actions>
        <NuxtLink 
          to="/" 
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
        >
          <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"></i>
          <span class="hidden sm:inline">معاينة المتجر</span>
        </NuxtLink>

        <button
          type="button"
          @click="openAddModal"
          class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          <span>إضافة سكشن جديد</span>
        </button>
      </template>
    </AdminPageHeader>

    <!-- Language Notice Banner -->
    <div class="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900">
      <div class="flex items-center gap-2.5">
        <i class="fa-solid fa-language text-amber-600 text-base shrink-0"></i>
        <span>
          أنت الآن في وضع تحرير: <strong class="font-black text-slate-900 underline">{{ activeLangTab === 'ar' ? '🇸🇦 اللغة العربية (Arabic)' : '🇺🇸 اللغة الإنجليزية (English)' }}</strong>.
          يمكنك التبديل بين اللغتين من التبويب بالأعلى أو التعديل المباشر على الحقول أدناه.
        </span>
      </div>
      <div class="flex items-center gap-1.5 shrink-0">
        <button
          type="button"
          @click="activeLangTab = 'ar'"
          :class="['px-3 py-1 rounded-lg font-black transition-all cursor-pointer', activeLangTab === 'ar' ? 'bg-amber-500 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200']"
        >
          🇸🇦 عربي
        </button>
        <button
          type="button"
          @click="activeLangTab = 'en'"
          :class="['px-3 py-1 rounded-lg font-black transition-all cursor-pointer', activeLangTab === 'en' ? 'bg-amber-500 text-white shadow-xs' : 'bg-white text-slate-700 border border-slate-200']"
        >
          🇺🇸 English
        </button>
      </div>
    </div>

    <!-- 2. QUICK EXPAND / COLLAPSE CONTROLS BAR -->
    <div v-if="!isLoading && sections.length > 0" class="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-bold text-slate-500">
      <div class="flex items-center gap-2">
        <span>إجمالي الأقسام: <strong class="text-slate-800 font-black">{{ sections.length }}</strong></span>
        <span class="text-slate-300">|</span>
        <span class="text-indigo-600 font-normal hidden sm:inline flex items-center gap-1">
          <i class="fa-solid fa-arrows-up-down text-[10px]"></i>
          يمكنك سحب وإفلات أي بطاقة لتغيير ترتيب ظهورها
        </span>
      </div>
      <div class="flex items-center gap-3">
        <button type="button" @click="expandAllSections" class="hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer">
          <i class="fa-solid fa-angles-down text-[10px]"></i>
          توسيع الكل
        </button>
        <span class="text-slate-300">|</span>
        <button type="button" @click="collapseAllSections" class="hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer">
          <i class="fa-solid fa-angles-up text-[10px]"></i>
          طي الكل
        </button>
      </div>
    </div>

    <!-- 3. LOADING SKELETON -->
    <AdminSkeletonForm v-if="isLoading" :cards="4" />

    <!-- 4. EMPTY STATE -->
    <div v-else-if="sections.length === 0" class="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-4 shadow-sm">
      <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <i class="fa-solid fa-folder-open text-2xl"></i>
      </div>
      <h3 class="text-lg font-bold text-slate-800">لا توجد أقسام مضافة حالياً في الصفحة الرئيسية</h3>
      <p class="text-sm text-slate-500 max-w-md mx-auto">يمكنك إضافة أي سكشن وتخصيص محتواه ونماذجه بالكامل من خلال الضغط على زر إضافة سكشن جديد.</p>
      <button 
        @click="openAddModal"
        class="px-6 py-3 bg-[#0B0E28] hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
      >
        <i class="fa-solid fa-plus text-xs"></i>
        إضافة سكشن جديد الآن
      </button>
    </div>

    <!-- 5. SECTIONS EDITOR LIST -->
    <div v-else class="space-y-5">
      <div 
        v-for="(section, index) in sections" 
        :key="section.id || index"
        draggable="true"
        @dragstart="onDragStart(index, $event)"
        @dragover.prevent="onDragOver(index, $event)"
        @dragenter.prevent="dragOverIndex = index"
        @dragleave="dragOverIndex === index ? dragOverIndex = null : null"
        @drop="onDrop(index, $event)"
        @dragend="onDragEnd"
        :class="[
          'bg-white rounded-3xl shadow-sm border overflow-hidden transition-all duration-200',
          dragOverIndex === index ? 'border-indigo-500 ring-2 ring-indigo-200 shadow-md scale-[1.01]' : 'border-slate-100',
          draggedIndex === index ? 'opacity-40 border-dashed border-indigo-400' : ''
        ]"
      >
        
        <!-- Section Header Bar -->
        <div 
          @click="toggleSectionCollapse(section.id)"
          class="bg-slate-50/80 px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/80 transition-colors select-none group"
        >
          <!-- Right: Drag handle, Section index & title -->
          <div class="flex items-center gap-3">
            <span 
              class="w-6 h-6 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0" 
              title="اسحب لتغيير الترتيب"
              @click.stop
            >
              <i class="fa-solid fa-grip-vertical text-sm"></i>
            </span>

            <span class="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              {{ index + 1 }}
            </span>
            
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-black text-slate-800 text-sm md:text-base">{{ getSectionTitle(section.type) }}</h3>
              <span class="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 uppercase tracking-wider hidden sm:inline-block">
                {{ section.type }}
              </span>
              <span class="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100">
                الترتيب: {{ section.sort_order || (index + 1) }}
              </span>
            </div>
          </div>

          <!-- Left: Controls & Toggle Arrow -->
          <div class="flex items-center gap-2" @click.stop>
            
            <!-- Active/Inactive Status Toggle -->
            <button
              type="button"
              @click.stop="toggleActiveStatus(section)"
              :class="[
                'px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border',
                section.is_active 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' 
                  : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200'
              ]"
              :title="section.is_active ? 'القسم مفعل وظاهر للزوار (اضغط للتعطيل)' : 'القسم معطل ومخفي (اضغط للتفعيل)'"
            >
              <span :class="['w-2 h-2 rounded-full', section.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400']"></span>
              <span>{{ section.is_active ? 'مفعل' : 'معطل' }}</span>
            </button>

            <div class="h-4 w-px bg-slate-300 mx-0.5"></div>

            <!-- Move Up -->
            <button 
              type="button" 
              @click.stop="moveSectionUp(index)" 
              :disabled="index === 0 || isReordering"
              class="w-8 h-8 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              title="تحريك للأعلى"
            >
              <i class="fa-solid fa-arrow-up text-xs"></i>
            </button>

            <!-- Move Down -->
            <button 
              type="button" 
              @click.stop="moveSectionDown(index)" 
              :disabled="index === sections.length - 1 || isReordering"
              class="w-8 h-8 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
              title="تحريك للأسفل"
            >
              <i class="fa-solid fa-arrow-down text-xs"></i>
            </button>

            <div class="h-4 w-px bg-slate-300 mx-0.5"></div>

            <!-- Delete Section -->
            <button 
              type="button" 
              @click.stop="handleDeleteSection(section, index)" 
              class="px-3 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer"
              title="حذف هذا السكشن"
            >
              <i class="fa-solid fa-trash-can text-xs"></i>
              <span class="hidden sm:inline">حذف</span>
            </button>

            <div class="h-4 w-px bg-slate-300 mx-0.5"></div>

            <!-- Collapse Toggle Button -->
            <button 
              type="button"
              @click.stop="toggleSectionCollapse(section.id)"
              class="w-8 h-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center cursor-pointer"
              :title="isSectionCollapsed(section.id) ? 'توسيع السكشن' : 'طي السكشن'"
            >
              <i 
                :class="[
                  'fa-solid transition-transform duration-300 text-xs',
                  isSectionCollapsed(section.id) ? 'fa-chevron-down' : 'fa-chevron-up'
                ]"
              ></i>
            </button>
          </div>
        </div>

        <!-- Section Content Editor Body -->
        <div v-show="!isSectionCollapsed(section.id)" class="p-6 md:p-8 bg-white space-y-6">
          
          <!-- Section Language Switcher Tabs Header -->
          <div class="flex items-center justify-between pb-3 border-b border-slate-100">
            <span class="text-xs font-bold text-slate-400">لغة عرض وتحرير الحقول:</span>
            <div class="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                @click="activeLangTab = 'ar'"
                :class="['px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer', activeLangTab === 'ar' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800']"
              >
                🇸🇦 العربية
              </button>
              <button
                type="button"
                @click="activeLangTab = 'en'"
                :class="['px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer', activeLangTab === 'en' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-800']"
              >
                🇺🇸 English
              </button>
            </div>
          </div>

          <!-- 1. HERO SLIDER SECTION FORM -->
          <div v-if="section.type === 'hero' || section.type === 'hero_slider'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-black text-slate-800 text-sm">شرائح السليدر الرئيسي (Hero Slides)</h4>
                <p class="text-xs text-slate-500 mt-0.5">إدارة شرائح البانر الرئيسي: رفع الصور للكمبيوتر والموبايل مع الرابط والنص الترويجي باللغتين.</p>
              </div>
              <button 
                type="button" 
                @click="addHeroSlide(section)"
                class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة شريحة جديدة
              </button>
            </div>

            <div 
              v-for="(slide, sIdx) in (section.data.slides || [])" 
              :key="slide.id || sIdx" 
              class="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 items-start relative group"
            >
              <div class="shrink-0 w-full sm:w-60 space-y-3">
                <ImageUploader v-model="slide.imageUrl" :label="`صورة الشاشة الكبيرة ${sIdx + 1} (Desktop)`" :maxFiles="1" />
                <ImageUploader v-model="slide.mobileImageUrl" :label="`صورة الموبايل ${sIdx + 1} (اختياري)`" :maxFiles="1" />
              </div>

              <div class="flex-1 w-full space-y-4">
                <!-- ARABIC FORM -->
                <div v-if="activeLangTab === 'ar'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BaseInput 
                    v-model="slide.altText" 
                    label="العنوان الترويجي / الوصف المختصر (عربي)" 
                    placeholder="مثال: أقوى التخفيضات على المكيفات" 
                  />
                  <BaseInput 
                    v-model="slide.linkUrl" 
                    label="رابط التوجيه عند النقر (Target URL)" 
                    placeholder="/category/ac" 
                    dir="ltr" 
                  />
                </div>

                <!-- ENGLISH FORM -->
                <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BaseInput 
                    v-model="slide.altText_en" 
                    label="Promotional Title / Alt Text (English)" 
                    placeholder="e.g. Mega Sale on ACs" 
                    dir="ltr"
                  />
                  <BaseInput 
                    v-model="slide.linkUrl" 
                    label="Target Link URL" 
                    placeholder="/category/ac" 
                    dir="ltr" 
                  />
                </div>
              </div>

              <!-- Slide Actions -->
              <div class="flex items-center gap-1 shrink-0 self-end md:self-start pt-2 md:pt-0">
                <button 
                  type="button"
                  @click="moveHeroSlideUp(section, sIdx)"
                  :disabled="sIdx === 0"
                  class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-xl transition-colors disabled:opacity-30 cursor-pointer"
                  title="تحريك للأعلى"
                >
                  <i class="fa-solid fa-arrow-up text-xs"></i>
                </button>
                <button 
                  type="button"
                  @click="moveHeroSlideDown(section, sIdx)"
                  :disabled="sIdx === (section.data.slides || []).length - 1"
                  class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-xl transition-colors disabled:opacity-30 cursor-pointer"
                  title="تحريك للأسفل"
                >
                  <i class="fa-solid fa-arrow-down text-xs"></i>
                </button>
                <button 
                  v-if="(section.data.slides || []).length > 1"
                  type="button" 
                  @click="removeHeroSlide(section, sIdx)"
                  class="p-2 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer"
                  title="حذف الشريحة"
                >
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 2. CATEGORY SLIDER SECTION FORM -->
          <div v-else-if="section.type === 'category_slider'" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- ARABIC TITLE -->
              <div v-if="activeLangTab === 'ar'">
                <BaseInput v-model="section.data.title" label="عنوان السكشن الرئيسي (عربي)" placeholder="أقسام المتجر" />
              </div>
              <!-- ENGLISH TITLE -->
              <div v-else>
                <BaseInput v-model="section.data.title_en" label="Section Title (English)" placeholder="Store Categories" dir="ltr" />
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">عدد الأقسام المعروضة (Limit)</label>
                <select v-model.number="section.data.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold">
                  <option :value="6">6 أقسام</option>
                  <option :value="8">8 أقسام</option>
                  <option :value="12">12 قسم</option>
                  <option :value="16">16 قسم</option>
                  <option :value="24">24 قسم</option>
                </select>
              </div>
            </div>
            <div class="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between gap-3">
              <div class="flex items-center gap-3">
                <i class="fa-solid fa-circle-info text-indigo-600 text-base shrink-0"></i>
                <p class="text-xs text-indigo-900 leading-relaxed">هذا السكشن يقوم بجلب أقسام وتصنيفات المتجر الرئيسية والصور الخاصة بها تلقائياً ومباشرة من قاعدة البيانات (تم تحميل {{ categories.length }} تصنيف).</p>
              </div>
              <span v-if="isLoadingCategories" class="text-xs text-indigo-600 font-bold flex items-center gap-1 shrink-0">
                <i class="fa-solid fa-spinner fa-spin"></i>
              </span>
            </div>
          </div>

          <!-- 3. BRAND SHOWCASE SECTION FORM -->
          <div v-else-if="section.type === 'brand_showcase'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- ARABIC TITLES -->
              <template v-if="activeLangTab === 'ar'">
                <BaseInput v-model="section.data.title" label="عنوان السكشن (عربي)" placeholder="مثال: منتجات فيليبس العالمية" />
                <BaseInput v-model="section.data.subtitle" label="العنوان الفرعي الترويجي (عربي)" placeholder="مثال: ابتكر معنا لحياة أفضل" />
              </template>
              <!-- ENGLISH TITLES -->
              <template v-else>
                <BaseInput v-model="section.data.title_en" label="Section Title (English)" placeholder="e.g. Philips World-Class Products" dir="ltr" />
                <BaseInput v-model="section.data.subtitle_en" label="Promotional Subtitle (English)" placeholder="e.g. Innovation and you" dir="ltr" />
              </template>
              
              <!-- Dynamic Brand Selection from Database -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="block text-sm font-bold text-slate-700">اختيار العلامة التجارية (من قاعدة البيانات)</label>
                  <span v-if="isLoadingBrands" class="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <i class="fa-solid fa-spinner fa-spin text-[10px]"></i>
                    جلب الماركات...
                  </span>
                </div>
                <select 
                  v-model="section.data.brand_id" 
                  @change="handleBrandSelection(section, $event)"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="" disabled>-- اختر العلامة التجارية من القائمة --</option>
                  <option 
                    v-for="brand in brands" 
                    :key="brand.id" 
                    :value="brand.id"
                  >
                    {{ (brand.name_ar && brand.name_en && brand.name_ar !== brand.name_en) ? `${brand.name_ar} (${brand.name_en})` : brand.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
                <select v-model.number="section.data.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold">
                  <option :value="4">4 منتجات</option>
                  <option :value="6">6 منتجات</option>
                  <option :value="8">8 منتجات</option>
                  <option :value="12">12 منتج</option>
                </select>
              </div>

              <BaseInput v-model="section.data.viewAllUrl" label="رابط زر عرض الكل" placeholder="/brand/philips" dir="ltr" />

              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">لون خلفية القسم</label>
                <div class="flex items-center gap-3">
                  <input 
                    type="color" 
                    :value="extractHex(section.data.bgColor)" 
                    @input="updateBgColor(section, $event)"
                    class="w-11 h-11 rounded-xl cursor-pointer border border-slate-200 p-1"
                  />
                  <input 
                    type="text" 
                    v-model="section.data.bgColor" 
                    placeholder="bg-[#1a66cc]"
                    class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono"
                    dir="ltr"
                  />
                </div>
              </div>
            </div>

            <!-- Dynamic Brand Auto-Logo Preview Badge -->
            <div class="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100/80 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3.5">
                <div class="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">
                  <img 
                    v-if="section.data.brandLogo" 
                    :src="section.data.brandLogo" 
                    :alt="section.data.brandName" 
                    class="w-full h-full object-contain"
                  />
                  <i v-else class="fa-solid fa-tag text-slate-400 text-xl"></i>
                </div>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-800">{{ section.data.brandName || 'لم يتم تحديد ماركة بعد' }}</span>
                    <span v-if="section.data.brand_id" class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">ID: {{ section.data.brand_id }}</span>
                  </div>
                  <p class="text-[11px] text-slate-500 mt-0.5">يتم جلب شعار الماركة واسمها وربط منتجاتها تلقائياً وبشكل ديناميكي من حقل image_full_url في الـ Backend.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. NEW ARRIVALS SECTION FORM -->
          <div v-else-if="section.type === 'new_arrivals'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ARABIC TITLES -->
            <template v-if="activeLangTab === 'ar'">
              <BaseInput v-model="section.data.title" label="عنوان السكشن (عربي)" placeholder="أحدث المنتجات الواصلة حديثاً" />
              <BaseInput v-model="section.data.subtitle" label="العنوان الفرعي (عربي)" placeholder="اكتشف أحدث الأجهزة المنزلية" />
            </template>
            <!-- ENGLISH TITLES -->
            <template v-else>
              <BaseInput v-model="section.data.title_en" label="Section Title (English)" placeholder="New Arrivals" dir="ltr" />
              <BaseInput v-model="section.data.subtitle_en" label="Subtitle (English)" placeholder="Discover the latest home appliances" dir="ltr" />
            </template>

            <BaseInput v-model="section.data.shopUrl" label="رابط زر تسوق الآن / عرض الكل" placeholder="/shop?sort_by=latest" dir="ltr" />
            
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
              <select v-model.number="section.data.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold">
                <option :value="4">4 منتجات</option>
                <option :value="8">8 منتجات</option>
                <option :value="12">12 منتج</option>
                <option :value="16">16 منتج</option>
              </select>
            </div>

            <div class="space-y-2 col-span-1 md:col-span-2">
              <label class="block text-sm font-bold text-slate-700">لون خلفية القسم (Background Color)</label>
              <div class="flex items-center gap-3">
                <input 
                  type="color" 
                  :value="extractHex(section.data.bgColor || '#7dd3fc')" 
                  @input="updateBgColor(section, $event)"
                  class="w-11 h-11 rounded-xl cursor-pointer border border-slate-200 p-1"
                />
                <input 
                  type="text" 
                  v-model="section.data.bgColor" 
                  placeholder="bg-[#7dd3fc] أو #7dd3fc"
                  class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <!-- 5. BRAND CAMPAIGN SECTION FORM -->
          <div v-else-if="section.type === 'brand_campaign'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- ARABIC FORM -->
              <template v-if="activeLangTab === 'ar'">
                <BaseInput v-model="section.data.title" label="عنوان الحملة الترويجية (عربي)" placeholder="مثال: خصومات Tineco الكبرى" />
                <BaseInput v-model="section.data.subtitle" label="الوصف / العنوان الفرعي (عربي)" placeholder="أقوى العروض على أجهزة التنظيف الذكية" />
                <BaseInput v-model="section.data.btnText" label="نص الزر الترويجي (عربي)" placeholder="تسوق منتجات الحملة" />
              </template>
              <!-- ENGLISH FORM -->
              <template v-else>
                <BaseInput v-model="section.data.title_en" label="Campaign Title (English)" placeholder="e.g. Mega Tineco Savings" dir="ltr" />
                <BaseInput v-model="section.data.subtitle_en" label="Description / Subtitle (English)" placeholder="Best offers on smart appliances" dir="ltr" />
                <BaseInput v-model="section.data.btnText_en" label="CTA Button Text (English)" placeholder="Shop Campaign Products" dir="ltr" />
              </template>

              <BaseInput v-model="section.data.targetUrl" label="رابط التحويل المستهدف" placeholder="/brand/tineco" dir="ltr" />
              
              <!-- Dynamic Main Category Select -->
              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="block text-sm font-bold text-slate-700">التصنيف الرئيسي (من قاعدة البيانات)</label>
                  <span v-if="isLoadingCategories" class="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
                    <i class="fa-solid fa-spinner fa-spin text-[10px]"></i>
                    جلب التصنيفات...
                  </span>
                </div>
                <select 
                  :value="section.data.category_id || section.data.category" 
                  @change="handleCategoryChange(section, $event)"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="">-- كافة التصنيفات الرئيسية --</option>
                  <option 
                    v-for="cat in categories" 
                    :key="cat.id" 
                    :value="cat.id"
                  >
                    {{ (cat.name_ar && cat.name_en && cat.name_ar !== cat.name_en) ? `${cat.name_ar} (${cat.name_en})` : cat.name }}
                  </option>
                </select>
              </div>

              <!-- Dynamic Subcategory Select -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">التصنيف الفرعي (اختياري)</label>
                <select 
                  :value="section.data.sub_category_id || section.data.subCategory" 
                  @change="handleSubCategoryChange(section, $event)"
                  :disabled="!section.data.category_id && !section.data.category"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">-- كافة التصنيفات الفرعية لهذا القسم --</option>
                  <option 
                    v-for="sub in getSubcategoriesForParent(section.data.category_id || section.data.category)" 
                    :key="sub.id" 
                    :value="sub.id"
                  >
                    ↳ {{ (sub.name_ar && sub.name_en && sub.name_ar !== sub.name_en) ? `${sub.name_ar} (${sub.name_en})` : sub.name }}
                  </option>
                </select>
              </div>

              <!-- Dynamic Brand Select -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">أو تصفية حسب الماركة</label>
                <select 
                  :value="section.data.brand_id || section.data.brandName" 
                  @change="handleCampaignBrandSelection(section, $event)"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="">بدون تحديد ماركة محددة</option>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.id">
                    {{ (brand.name_ar && brand.name_en && brand.name_ar !== brand.name_en) ? `${brand.name_ar} (${brand.name_en})` : brand.name }}
                  </option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
                <select v-model.number="section.data.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold">
                  <option :value="4">4 منتجات</option>
                  <option :value="5">5 منتجات</option>
                  <option :value="6">6 منتجات</option>
                  <option :value="8">8 منتجات</option>
                  <option :value="10">10 منتجات</option>
                </select>
              </div>
            </div>

            <div class="max-w-xl">
              <ImageUploader v-model="section.data.bannerImage" label="صورة البانر العريض للحملة (Desktop & Tablet)" :maxFiles="1" />
            </div>
          </div>

          <!-- 6. SIDE BANNER SLIDER SECTION FORM -->
          <div v-else-if="section.type === 'side_banner'" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Main Category -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">التصنيف الرئيسي المستهدف</label>
                <select 
                  :value="section.data.category_id || section.data.category" 
                  @change="handleCategoryChange(section, $event)"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"
                >
                  <option value="">كافة التصنيفات</option>
                  <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                    {{ (cat.name_ar && cat.name_en && cat.name_ar !== cat.name_en) ? `${cat.name_ar} (${cat.name_en})` : cat.name }}
                  </option>
                </select>
              </div>

              <!-- Subcategory -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">التصنيف الفرعي</label>
                <select 
                  :value="section.data.sub_category_id || section.data.subCategory" 
                  @change="handleSubCategoryChange(section, $event)"
                  :disabled="!section.data.category_id && !section.data.category"
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer disabled:opacity-50"
                >
                  <option value="">كافة الأقسام الفرعية</option>
                  <option 
                    v-for="sub in getSubcategoriesForParent(section.data.category_id || section.data.category)" 
                    :key="sub.id" 
                    :value="sub.id"
                  >
                    ↳ {{ (sub.name_ar && sub.name_en && sub.name_ar !== sub.name_en) ? `${sub.name_ar} (${sub.name_en})` : sub.name }}
                  </option>
                </select>
              </div>

              <!-- Brand -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">أو تصفية حسب الماركة</label>
                <select v-model="section.data.brandName" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer">
                  <option value="">بدون تحديد ماركة</option>
                  <option v-for="brand in brands" :key="brand.id" :value="brand.name">{{ brand.name }}</option>
                </select>
              </div>

              <!-- Limit -->
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة</label>
                <select v-model.number="section.data.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold">
                  <option :value="4">4 منتجات</option>
                  <option :value="5">5 منتجات</option>
                  <option :value="6">6 منتجات</option>
                  <option :value="8">8 منتجات</option>
                </select>
              </div>
            </div>

            <!-- Side Slides List -->
            <div class="space-y-4">
              <div class="flex items-center justify-between border-b border-slate-100 pb-2">
                <div>
                  <h5 class="text-sm font-bold text-slate-800">صور السلايدر الجانبي المتحرك</h5>
                  <p class="text-xs text-slate-500 mt-0.5">يمكنك إضافة أكثر من صورة ليتم تقليبها انسيابياً بجانب المنتجات.</p>
                </div>
                <button 
                  type="button" 
                  @click="addSideBannerSlide(section)"
                  class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i class="fa-solid fa-plus text-xs"></i>
                  إضافة صورة للسلايدر الجانبي
                </button>
              </div>

              <div 
                v-for="(slide, bsIdx) in (section.data.sideBannerSlides || [])" 
                :key="bsIdx" 
                class="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70 items-center"
              >
                <div class="w-full sm:w-48 shrink-0">
                  <ImageUploader v-model="slide.imageUrl" :label="`صورة البانر الجانبي ${bsIdx + 1}`" :maxFiles="1" />
                </div>
                <div class="flex-1 w-full">
                  <BaseInput v-model="slide.linkUrl" label="رابط التوجيه عند الضغط على الصورة" placeholder="/brand/smeg" dir="ltr" />
                </div>
                <div class="flex items-center gap-1">
                  <button 
                    type="button"
                    @click="moveSideBannerSlideUp(section, bsIdx)"
                    :disabled="bsIdx === 0"
                    class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                    title="تحريك للأعلى"
                  >
                    <i class="fa-solid fa-arrow-up text-xs"></i>
                  </button>
                  <button 
                    type="button"
                    @click="moveSideBannerSlideDown(section, bsIdx)"
                    :disabled="bsIdx === (section.data.sideBannerSlides || []).length - 1"
                    class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30 cursor-pointer"
                    title="تحريك للأسفل"
                  >
                    <i class="fa-solid fa-arrow-down text-xs"></i>
                  </button>
                  <button 
                    v-if="(section.data.sideBannerSlides || []).length > 1"
                    type="button" 
                    @click="removeSideBannerSlide(section, bsIdx)"
                    class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer"
                    title="حذف الصورة"
                  >
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 7. STORE FEATURES SECTION FORM -->
          <div v-else-if="section.type === 'store_features'" class="space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h5 class="text-sm font-bold text-slate-800">بطاقات مميزات المتجر (أيقونة + عنوان + وصف) باللغتين</h5>
                <p class="text-xs text-slate-500 mt-0.5">تظهر أسفل السليدر أو بأعلى الصفحة لتعزيز ثقة العميل.</p>
              </div>
              <button 
                type="button" 
                @click="addFeatureItem(section)"
                class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة ميزة جديدة
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(item, fIdx) in (section.data.features || [])" 
                :key="fIdx"
                class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group"
              >
                <button 
                  type="button" 
                  @click="removeFeatureItem(section, fIdx)"
                  class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
                  title="حذف الميزة"
                >
                  <i class="fa-solid fa-xmark text-xs"></i>
                </button>
                
                <div class="space-y-1">
                  <label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome)</label>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0">
                      <i :class="item.icon || 'fa-solid fa-star'"></i>
                    </div>
                    <input 
                      type="text" 
                      v-model="item.icon" 
                      placeholder="fa-solid fa-truck-fast" 
                      class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <!-- ARABIC INPUTS -->
                <template v-if="activeLangTab === 'ar'">
                  <BaseInput v-model="item.title" label="العنوان الرئيسي للميزة (عربي)" placeholder="مثال: شحن سريع وآمن" />
                  <BaseInput v-model="item.desc" label="الوصف التوضيحي للميزة (عربي)" placeholder="مثال: توصيل مجاني للطلبات فوق 300 ريال" />
                </template>
                <!-- ENGLISH INPUTS -->
                <template v-else>
                  <BaseInput v-model="item.title_en" label="Feature Title (English)" placeholder="e.g. Fast & Secure Shipping" dir="ltr" />
                  <BaseInput v-model="item.desc_en" label="Feature Description (English)" placeholder="e.g. Free shipping on orders over 300 SAR" dir="ltr" />
                </template>
              </div>
            </div>
          </div>

          <!-- 8. BRANDS TICKER SECTION FORM -->
          <div v-else-if="section.type === 'brands_ticker'" class="space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3">
              <div>
                <h5 class="text-sm font-bold text-slate-800">شريط شعارات الماركات المتحرك</h5>
                <p class="text-xs text-slate-500 mt-0.5">يمكنك ضبط عنوان الشريط واختيار الماركات من قاعدة البيانات أو تخصيصها.</p>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  type="button" 
                  @click="populateAllDbBrandsToTicker(section)"
                  class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="سحب كافة ماركات المتجر للشريط بنقرة واحدة"
                >
                  <i class="fa-solid fa-cloud-arrow-down text-xs"></i>
                  مزامنة كافة ماركات المتجر
                </button>
                <button 
                  type="button" 
                  @click="addBrandLogoItem(section)"
                  class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i class="fa-solid fa-plus text-xs"></i>
                  إضافة ماركة
                </button>
              </div>
            </div>

            <div class="max-w-md">
              <div v-if="activeLangTab === 'ar'">
                <BaseInput v-model="section.data.title" label="عنوان الشريط الترويجي (عربي)" placeholder="شركاؤنا من كبرى الماركات العالمية" />
              </div>
              <div v-else>
                <BaseInput v-model="section.data.title_en" label="Ticker Title (English)" placeholder="Our Global Trusted Partners" dir="ltr" />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div 
                v-for="(brand, bIdx) in (section.data.brandLogos || [])" 
                :key="bIdx"
                class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative"
              >
                <button 
                  type="button" 
                  @click="removeBrandLogoItem(section, bIdx)"
                  class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
                  title="حذف الماركة"
                >
                  <i class="fa-solid fa-xmark text-xs"></i>
                </button>

                <!-- Quick Brand Selector from Database -->
                <div class="space-y-1">
                  <label class="block text-xs font-bold text-slate-700">اختر من ماركات المتجر</label>
                  <select 
                    @change="onTickerBrandSelected(brand, $event)"
                    class="w-full rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-bold text-slate-800"
                  >
                    <option value="">-- تخصيص يدوي أو اختر ماركة --</option>
                    <option v-for="dbBrand in brands" :key="dbBrand.id" :value="dbBrand.id">{{ dbBrand.name }}</option>
                  </select>
                </div>

                <BaseInput v-model="brand.name" label="اسم الماركة" placeholder="PHILIPS" />
                <ImageUploader v-model="brand.imageUrl" label="شعار الماركة (PNG بخلفية شفافة)" :maxFiles="1" />
                <BaseInput v-model="brand.linkUrl" label="رابط التوجيه للماركة" placeholder="/brand/philips" dir="ltr" />
              </div>
            </div>
          </div>

          <!-- 9. STORE GUARANTEES SECTION FORM -->
          <div v-else-if="section.type === 'store_guarantees'" class="space-y-4">
            <div class="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h5 class="text-sm font-bold text-slate-800">عناصر قسم الضمانات المعتمدة باللغتين</h5>
                <p class="text-xs text-slate-500 mt-0.5">ضمانات الأصالة، الاستبدال، وخدمة ما بعد البيع.</p>
              </div>
              <button 
                type="button" 
                @click="addGuaranteeItem(section)"
                class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة ضمان جديد
              </button>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                v-for="(guarantee, gIdx) in (section.data.guarantees || [])" 
                :key="gIdx"
                class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative"
              >
                <button 
                  type="button" 
                  @click="removeGuaranteeItem(section, gIdx)"
                  class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer"
                  title="حذف الضمان"
                >
                  <i class="fa-solid fa-xmark text-xs"></i>
                </button>

                <div class="space-y-1">
                  <label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome)</label>
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0">
                      <i :class="guarantee.icon || 'fa-solid fa-shield-halved'"></i>
                    </div>
                    <input 
                      type="text" 
                      v-model="guarantee.icon" 
                      placeholder="fa-solid fa-certificate" 
                      class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <!-- ARABIC INPUTS -->
                <template v-if="activeLangTab === 'ar'">
                  <BaseInput v-model="guarantee.title" label="عنوان الضمان (عربي)" placeholder="منتجات أصلية 100%" />
                  <BaseInput v-model="guarantee.desc" label="تفاصيل وشروط الضمان (عربي)" placeholder="مضمونة من الوكيل المعتمد مباشرة" />
                </template>
                <!-- ENGLISH INPUTS -->
                <template v-else>
                  <BaseInput v-model="guarantee.title_en" label="Guarantee Title (English)" placeholder="100% Genuine Products" dir="ltr" />
                  <BaseInput v-model="guarantee.desc_en" label="Guarantee Details (English)" placeholder="Directly covered by authorized agency" dir="ltr" />
                </template>
              </div>
            </div>
          </div>

          <!-- 10. STORE LOCATION SECTION FORM -->
          <div v-else-if="section.type === 'store_location'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ARABIC INPUTS -->
            <template v-if="activeLangTab === 'ar'">
              <BaseInput v-model="section.data.title" label="عنوان السكشن الرئيسي (عربي)" placeholder="تفضل بزيارة معرضنا الرئيسي" />
              <BaseInput v-model="section.data.address" label="العنوان التفصيلي للمعرض (عربي)" placeholder="جدة، المملكة العربية السعودية - طريق الملك فهد" />
              <BaseInput v-model="section.data.workingHours" label="مواعيد وأوقات العمل (عربي)" placeholder="يومياً من 10 صباحاً حتى 11 مساءً" />
            </template>
            <!-- ENGLISH INPUTS -->
            <template v-else>
              <BaseInput v-model="section.data.title_en" label="Section Title (English)" placeholder="Visit Our Main Showroom" dir="ltr" />
              <BaseInput v-model="section.data.address_en" label="Showroom Address (English)" placeholder="King Fahd Road, Jeddah, Saudi Arabia" dir="ltr" />
              <BaseInput v-model="section.data.workingHours_en" label="Working Hours (English)" placeholder="Daily: 10:00 AM - 11:00 PM" dir="ltr" />
            </template>

            <BaseInput v-model="section.data.phone" label="رقم الهاتف والتواصل" placeholder="01286000037" dir="ltr" />
            <BaseInput v-model="section.data.mapsUrl" label="رابط خرائط جوجل (Google Maps URL)" placeholder="https://maps.google.com" dir="ltr" class="col-span-1 md:col-span-2" />
          </div>

          <!-- Save This Section Individual Action Bar -->
          <div class="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs text-slate-400">سيتم حفظ كائن الـ data المحدث لهذا السكشن فورياً في الـ Backend.</span>
            <button
              type="button"
              @click="handleSaveSingleSection(section)"
              :disabled="savingSectionId === section.id"
              class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <i v-if="savingSectionId === section.id" class="fa-solid fa-spinner fa-spin text-xs"></i>
              <i v-else class="fa-solid fa-check text-xs"></i>
              <span>{{ savingSectionId === section.id ? 'جاري الحفظ...' : 'حفظ تعديلات هذا السكشن' }}</span>
            </button>
          </div>

        </div>

      </div>
    </div>

    <!-- 6. ADD SECTION MODAL -->
    <BaseModal 
      v-model="isAddModalOpen" 
      :is-open="isAddModalOpen" 
      :title="selectedTypeForAdd ? 'تحديد موضع السكشن الجديد' : 'إضافة سكشن جديد للصفحة الرئيسية'" 
      @close="isAddModalOpen = false; selectedTypeForAdd = null"
      size="lg"
    >
      <!-- Step 1: Select Section Type -->
      <div v-if="!selectedTypeForAdd" class="space-y-4">
        <p class="text-xs text-slate-500">اختر نوع السكشن الذي ترغب في إضافته إلى الصفحة الرئيسية:</p>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto p-1">
          <button
            v-for="option in availableSectionTypes"
            :key="option.type"
            type="button"
            @click="selectSectionType(option.type)"
            class="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all text-start group cursor-pointer"
          >
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-lg shrink-0 transition-colors">
              <i :class="option.icon"></i>
            </div>
            <div class="space-y-1">
              <h5 class="text-sm font-bold text-slate-800 group-hover:text-indigo-900">{{ option.title }}</h5>
              <p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{{ option.description }}</p>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 2: Select Placement / Position -->
      <div v-else class="space-y-5">
        <div class="flex items-center gap-3 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100">
          <div class="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg shrink-0">
            <i :class="getSelectedTypeIcon(selectedTypeForAdd)"></i>
          </div>
          <div>
            <h5 class="text-sm font-bold text-indigo-950">{{ getSectionTitle(selectedTypeForAdd) }}</h5>
            <span class="text-xs text-indigo-700">نوع السكشن المختار</span>
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-bold text-slate-700">موضع ظهور السكشن في الصفحة (الترتيب)</label>
          <select 
            v-model.number="selectedPositionForAdd"
            class="w-full rounded-xl border border-slate-200 bg-white px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"
          >
            <option :value="1">في بداية الصفحة (الموضع 1)</option>
            <option 
              v-for="pos in sections.length" 
              :key="pos + 1" 
              :value="pos + 1"
            >
              بعد سكشن {{ pos }} (الموضع {{ pos + 1 }})
            </option>
          </select>
        </div>

        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            @click="selectedTypeForAdd = null"
            class="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
          >
            رجوع لاختيار نوع آخر
          </button>
          <button 
            type="button" 
            @click="confirmAddSection"
            :disabled="isCreating"
            class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <i v-if="isCreating" class="fa-solid fa-spinner fa-spin text-xs"></i>
            <span>{{ isCreating ? 'جاري الإضافة...' : 'تأكيد وإضافة السكشن' }}</span>
          </button>
        </div>
      </div>
    </BaseModal>

    <!-- 7. BILINGUAL SEO & META DATA FIELDS -->
    <AdminSeoFields
      v-model:meta-title-ar="storefrontSeo.metaTitleAr"
      v-model:meta-title-en="storefrontSeo.metaTitleEn"
      v-model:meta-description-ar="storefrontSeo.metaDescriptionAr"
      v-model:meta-description-en="storefrontSeo.metaDescriptionEn"
      :active-lang="activeLangTab"
      title-ar-label="عنوان الصفحة في محركات البحث (عربي - Meta Title)"
      title-ar-placeholder="متجر أسوار جدة | الأجهزة الكهربائية والمنزلية الأصلية"
      title-en-label="Homepage Meta Title (English)"
      title-en-placeholder="Aswar Jeddah Store | Premium Electronics & Home Appliances"
      desc-ar-label="وصف المتجر في جوجل (عربي - Meta Description)"
      desc-ar-placeholder="تسوق أفضل الأجهزة الكهربائية والمنزلية والتنظيف الذكي في المملكة العربية السعودية مع ضمان معتمد."
      desc-en-label="Homepage Meta Description (English)"
      desc-en-placeholder="Shop top home appliances, smart cleaning devices and electronics in Saudi Arabia with official warranty."
    />

    <!-- 8. STICKY BOTTOM SAVE ACTION BAR -->
    <AdminSaveBar
      :is-saving="isSaving"
      :show-status="false"
      preview-url="/"
      save-label="حفظ ونشر التعديلات"
      @save="saveAllLayout"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import AdminPageHeader from '~/components/dashboard/ui/AdminPageHeader.vue'
import AdminSkeletonForm from '~/components/dashboard/ui/AdminSkeletonForm.vue'
import AdminSaveBar from '~/components/dashboard/ui/AdminSaveBar.vue'
import AdminSeoFields from '~/components/dashboard/ui/AdminSeoFields.vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseModal from '~/components/dashboard/ui/BaseModal.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import { useStorefrontBuilder } from '~/composables/useStorefrontBuilder'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { t, adminDir } = useAdminLanguage()
const { success, error: toastError } = useToast()

useHead({
  title: 'إدارة واجهة المتجر | لوحة تحكم أسوار جدة'
})

// Storefront Builder Composable
const {
  sections,
  brands,
  categories,
  allSubcategories,
  isLoading,
  isLoadingBrands,
  isLoadingCategories,
  isSaving,
  isReordering,
  savingSectionId,
  fetchBrands,
  fetchCategories,
  getSubcategoriesForParent,
  fetchSections,
  saveSection,
  createSection,
  deleteSection,
  reorderSections,
  syncSortOrders
} = useStorefrontBuilder()

const activeLangTab = ref<'ar' | 'en'>('ar')
const storefrontSeo = reactive({
  metaTitleAr: '',
  metaTitleEn: '',
  metaDescriptionAr: '',
  metaDescriptionEn: ''
})
const isCreating = ref(false)
const isAddModalOpen = ref(false)
const selectedTypeForAdd = ref<string | null>(null)
const selectedPositionForAdd = ref<number>(1)
const collapsedSections = ref<Record<string, boolean>>({})

// Drag & Drop State
const draggedIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

onMounted(async () => {
  await Promise.all([
    fetchBrands(),
    fetchCategories(),
    fetchSections()
  ])
  
  // Auto-match brand_id if brandName exists from database
  sections.value.forEach(sec => {
    if (sec.type === 'brand_showcase' && sec.data) {
      if (!sec.data.brand_id && sec.data.brandName) {
        const found = brands.value.find(b => 
          b.name.toLowerCase() === String(sec.data.brandName).toLowerCase() ||
          b.name_ar === sec.data.brandName ||
          b.name_en === sec.data.brandName
        )
        if (found) {
          sec.data.brand_id = found.id
          if (!sec.data.brandLogo) sec.data.brandLogo = found.image_full_url || found.logo || found.image || ''
        }
      }
    }
  })
})

// Main Category Change Handler
const handleCategoryChange = (section: any, event: Event) => {
  const select = event.target as HTMLSelectElement
  const selectedVal = select.value
  if (!section.data) section.data = {}

  const found = categories.value.find(c => String(c.id) === String(selectedVal) || c.name === selectedVal)
  if (found) {
    section.data.category_id = found.id
    section.data.category = found.name_ar || found.name
  } else {
    section.data.category_id = ''
    section.data.category = selectedVal
  }

  // Reset Subcategory when main category changes
  section.data.sub_category_id = ''
  section.data.subCategory = ''
}

// Subcategory Change Handler
const handleSubCategoryChange = (section: any, event: Event) => {
  const select = event.target as HTMLSelectElement
  const selectedVal = select.value
  if (!section.data) section.data = {}

  const subs = getSubcategoriesForParent(section.data.category_id || section.data.category)
  const found = subs.find(s => String(s.id) === String(selectedVal) || s.name === selectedVal)
  if (found) {
    section.data.sub_category_id = found.id
    section.data.subCategory = found.name_ar || found.name
  } else {
    section.data.sub_category_id = ''
    section.data.subCategory = selectedVal
  }
}

// Brand selection for brand_showcase
const handleBrandSelection = (section: any, event: Event) => {
  const select = event.target as HTMLSelectElement
  const selectedVal = select.value
  if (!section.data) section.data = {}

  const found = brands.value.find(b => String(b.id) === String(selectedVal) || b.name === selectedVal)
  if (found) {
    section.data.brand_id = found.id
    section.data.brandName = found.name
    section.data.brandLogo = found.image_full_url || found.logo || found.image || ''
    
    if (!section.data.title || section.data.title.includes('منتجات')) {
      section.data.title = `منتجات ${found.name} العالمية`
    }
    section.data.viewAllUrl = `/brand/${found.slug || found.name.toLowerCase().replace(/\s+/g, '-')}`
  } else {
    section.data.brandName = selectedVal
  }
}

// Brand selection for brand_campaign
const handleCampaignBrandSelection = (section: any, event: Event) => {
  const select = event.target as HTMLSelectElement
  const selectedVal = select.value
  if (!section.data) section.data = {}

  const found = brands.value.find(b => String(b.id) === String(selectedVal) || b.name === selectedVal)
  if (found) {
    section.data.brand_id = found.id
    section.data.brandName = found.name
  } else {
    section.data.brand_id = ''
    section.data.brandName = ''
  }
}

// Brand selection for brands_ticker item
const onTickerBrandSelected = (brandItem: any, event: Event) => {
  const select = event.target as HTMLSelectElement
  const selectedVal = select.value
  const found = brands.value.find(b => String(b.id) === String(selectedVal) || b.name === selectedVal)
  if (found) {
    brandItem.name = found.name
    brandItem.imageUrl = found.image_full_url || found.logo || found.image || ''
    brandItem.linkUrl = `/brand/${found.slug || found.name.toLowerCase().replace(/\s+/g, '-')}`
  }
}

const populateAllDbBrandsToTicker = (section: any) => {
  if (!section.data) section.data = {}
  section.data.brandLogos = brands.value.map(b => ({
    name: b.name,
    imageUrl: b.image_full_url || b.logo || b.image || '',
    linkUrl: `/brand/${b.slug || b.name.toLowerCase().replace(/\s+/g, '-')}`
  }))
  success(`تمت مزامنة ${brands.value.length} علامة تجارية إلى الشريط بنجاح!`)
}

// ----------------- Drag & Drop Reordering -----------------
const onDragStart = (index: number, event: DragEvent) => {
  draggedIndex.value = index
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(index))
  }
}

const onDragOver = (index: number, event: DragEvent) => {
  if (draggedIndex.value === null || draggedIndex.value === index) return
  dragOverIndex.value = index
}

const onDrop = async (targetIndex: number, event: DragEvent) => {
  if (draggedIndex.value === null || draggedIndex.value === targetIndex) {
    draggedIndex.value = null
    dragOverIndex.value = null
    return
  }

  const fromIdx = draggedIndex.value
  const itemToMove = sections.value.splice(fromIdx, 1)[0]
  sections.value.splice(targetIndex, 0, itemToMove)
  syncSortOrders()

  draggedIndex.value = null
  dragOverIndex.value = null

  await reorderSections(sections.value.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))
  success('تم تحديث ترتيب السكاشن بنجاح!')
}

const onDragEnd = () => {
  draggedIndex.value = null
  dragOverIndex.value = null
}

// Section Options for Add Section Modal (FontAwesome Icons)
const availableSectionTypes = [
  {
    type: 'hero_slider',
    title: 'السليدر الرئيسي (Hero Slider)',
    description: 'شرائح صور رئيسية كبيرة تظهر في أعلى الصفحة لترويج أهم العروض.',
    icon: 'fa-solid fa-images'
  },
  {
    type: 'category_slider',
    title: 'أقسام المتجر (Category Slider)',
    description: 'شريط ينقل الزوار بين الأقسام الرئيسية للمتجر تلقائياً.',
    icon: 'fa-solid fa-layer-group'
  },
  {
    type: 'brand_showcase',
    title: 'عرض منتجات ماركة (Brand Showcase)',
    description: 'سكشن بتصميم مخصص يعرض منتجات ماركة عالمية معينة (مثل Philips).',
    icon: 'fa-solid fa-tag'
  },
  {
    type: 'new_arrivals',
    title: 'أحدث المنتجات (New Arrivals)',
    description: 'شبكة تعرض أحدث المنتجات الواصلة حديثاً للمتجر.',
    icon: 'fa-solid fa-bolt'
  },
  {
    type: 'brand_campaign',
    title: 'حملة ترويجية (Brand Campaign)',
    description: 'بانر عريض مع قائمة المنتجات المرتبطة بالحملة.',
    icon: 'fa-solid fa-bullhorn'
  },
  {
    type: 'side_banner',
    title: 'بانر جانبي ومنتجات (Side Banner)',
    description: 'سلايدر بانر جانبي متحرك وبجانبه سلايدر منتجات متناسق.',
    icon: 'fa-solid fa-sliders'
  },
  {
    type: 'store_features',
    title: 'مميزات المتجر (Store Features)',
    description: 'شريط يعرض خيارات الشحن، التوصيل، والدفع للعملاء.',
    icon: 'fa-solid fa-truck-fast'
  },
  {
    type: 'brands_ticker',
    title: 'شريط الماركات المتحرك (Brands Ticker)',
    description: 'شريط يعرض شعارات الماركات الشريكة بشكل انسيابي.',
    icon: 'fa-solid fa-certificate'
  },
  {
    type: 'store_guarantees',
    title: 'ضمانات المتجر (Store Guarantees)',
    description: 'قسم يوضح الضمان المعتمد وسياسة الاستبدال.',
    icon: 'fa-solid fa-shield-halved'
  },
  {
    type: 'store_location',
    title: 'موقع المعرض (Store Location)',
    description: 'خريطة ومعلومات التواصل لزيارة معرض المتجر.',
    icon: 'fa-solid fa-location-dot'
  }
]

// ----------------- Extract Hex Color -----------------
const extractHex = (bgColorClass: string | undefined) => {
  if (!bgColorClass) return '#1a66cc'
  const match = bgColorClass.match(/bg-\[(#[0-9A-Fa-f]{6})\]/)
  return match ? match[1] : (bgColorClass.startsWith('#') ? bgColorClass : '#1a66cc')
}

const updateBgColor = (section: any, event: any) => {
  const hex = event.target.value
  if (!section.data) section.data = {}
  section.data.bgColor = `bg-[${hex}]`
}

// ----------------- Collapse State Helpers -----------------
const isSectionCollapsed = (id: string | number): boolean => {
  return collapsedSections.value[String(id)] ?? true
}

const toggleSectionCollapse = (id: string | number) => {
  collapsedSections.value[String(id)] = !isSectionCollapsed(id)
}

const expandAllSections = () => {
  sections.value.forEach(sec => {
    collapsedSections.value[String(sec.id)] = false
  })
}

const collapseAllSections = () => {
  sections.value.forEach(sec => {
    collapsedSections.value[String(sec.id)] = true
  })
}

// ----------------- Section Factory & Modal Handlers -----------------
const openAddModal = () => {
  selectedTypeForAdd.value = null
  selectedPositionForAdd.value = sections.value.length + 1
  isAddModalOpen.value = true
}

const selectSectionType = (type: string) => {
  selectedTypeForAdd.value = type
  selectedPositionForAdd.value = sections.value.length + 1
}

const getSelectedTypeIcon = (type: string | null) => {
  if (!type) return 'fa-solid fa-cube'
  const found = availableSectionTypes.find(opt => opt.type === type)
  return found ? found.icon : 'fa-solid fa-cube'
}

// ----------------- API Operations -----------------

// POST /api/v1/admin/home-sections
const confirmAddSection = async () => {
  if (!selectedTypeForAdd.value) return
  const rawType = selectedTypeForAdd.value
  const normalizedType = rawType === 'hero' ? 'hero_slider' : rawType
  const targetPos = Math.max(1, Math.min(sections.value.length + 1, Number(selectedPositionForAdd.value) || (sections.value.length + 1)))
  
  isCreating.value = true
  try {
    const created = await createSection({
      type: normalizedType,
      is_active: 1,
      sort_order: targetPos
    })

    const targetIdx = targetPos - 1
    sections.value.splice(targetIdx, 0, created)
    collapsedSections.value[String(created.id)] = false
    syncSortOrders()

    await reorderSections(sections.value.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))

    const addedTitle = getSectionTitle(normalizedType)
    isAddModalOpen.value = false
    selectedTypeForAdd.value = null
    success(`تمت إضافة سكشن ${addedTitle} بنجاح!`)
  } catch (err: any) {
    console.error('Error creating section:', err)
    toastError('حدث خطأ أثناء إضافة السكشن')
  } finally {
    isCreating.value = false
  }
}

// Single Section Save
const handleSaveSingleSection = async (section: any) => {
  try {
    await saveSection(section.id, section)
  } catch (e) {}
}

// Toggle Active Status
const toggleActiveStatus = async (section: any) => {
  const newStatus = section.is_active ? 0 : 1
  section.is_active = newStatus
  try {
    await saveSection(section.id, section)
  } catch (err) {
    section.is_active = newStatus ? 0 : 1
  }
}

// Delete Section
const handleDeleteSection = async (section: any, index: number) => {
  if (!confirm(`هل أنت متأكد من حذف سكشن "${getSectionTitle(section.type)}"؟`)) {
    return
  }
  try {
    await deleteSection(section.id)
    success(`تم حذف سكشن ${getSectionTitle(section.type)} بنجاح`)
  } catch (err) {
    toastError('حدث خطأ أثناء حذف السكشن')
  }
}

// Reorder Up
const moveSectionUp = async (index: number) => {
  if (index <= 0 || isReordering.value) return
  const item = sections.value[index]
  sections.value.splice(index, 1)
  sections.value.splice(index - 1, 0, item)
  syncSortOrders()
  await reorderSections(sections.value.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))
}

// Reorder Down
const moveSectionDown = async (index: number) => {
  if (index >= sections.value.length - 1 || isReordering.value) return
  const item = sections.value[index]
  sections.value.splice(index, 1)
  sections.value.splice(index + 1, 0, item)
  syncSortOrders()
  await reorderSections(sections.value.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))
}

// Save All
const saveAllLayout = async () => {
  try {
    for (const section of sections.value) {
      await saveSection(section.id, section)
    }
    await reorderSections(sections.value.map((s, idx) => ({ id: s.id, sort_order: idx + 1 })))
    success('تم حفظ وتحديث كافة أقسام الواجهة بنجاح!')
  } catch (err) {
    toastError('حدث خطأ أثناء حفظ التغييرات')
  }
}

// ----------------- Sub-items Helpers -----------------
const addHeroSlide = (section: any) => {
  if (!section.data) section.data = {}
  if (!Array.isArray(section.data.slides)) section.data.slides = []
  section.data.slides.push({
    id: Date.now(),
    imageUrl: '',
    mobileImageUrl: '',
    linkUrl: '',
    altText: '',
    altText_en: ''
  })
}

const removeHeroSlide = (section: any, index: number) => {
  if (section.data && Array.isArray(section.data.slides)) {
    section.data.slides.splice(index, 1)
  }
}

const moveHeroSlideUp = (section: any, index: number) => {
  if (index <= 0 || !section.data?.slides) return
  const item = section.data.slides[index]
  section.data.slides.splice(index, 1)
  section.data.slides.splice(index - 1, 0, item)
}

const moveHeroSlideDown = (section: any, index: number) => {
  if (!section.data?.slides || index >= section.data.slides.length - 1) return
  const item = section.data.slides[index]
  section.data.slides.splice(index, 1)
  section.data.slides.splice(index + 1, 0, item)
}

const addSideBannerSlide = (section: any) => {
  if (!section.data) section.data = {}
  if (!Array.isArray(section.data.sideBannerSlides)) section.data.sideBannerSlides = []
  section.data.sideBannerSlides.push({
    imageUrl: '',
    linkUrl: ''
  })
}

const removeSideBannerSlide = (section: any, index: number) => {
  if (section.data && Array.isArray(section.data.sideBannerSlides)) {
    section.data.sideBannerSlides.splice(index, 1)
  }
}

const moveSideBannerSlideUp = (section: any, index: number) => {
  if (index <= 0 || !section.data?.sideBannerSlides) return
  const item = section.data.sideBannerSlides[index]
  section.data.sideBannerSlides.splice(index, 1)
  section.data.sideBannerSlides.splice(index - 1, 0, item)
}

const moveSideBannerSlideDown = (section: any, index: number) => {
  if (!section.data?.sideBannerSlides || index >= section.data.sideBannerSlides.length - 1) return
  const item = section.data.sideBannerSlides[index]
  section.data.sideBannerSlides.splice(index, 1)
  section.data.sideBannerSlides.splice(index + 1, 0, item)
}

const addFeatureItem = (section: any) => {
  if (!section.data) section.data = {}
  if (!Array.isArray(section.data.features)) section.data.features = []
  section.data.features.push({ icon: 'fa-solid fa-truck-fast', title: '', title_en: '', desc: '', desc_en: '' })
}

const removeFeatureItem = (section: any, index: number) => {
  if (section.data && Array.isArray(section.data.features)) {
    section.data.features.splice(index, 1)
  }
}

const addBrandLogoItem = (section: any) => {
  if (!section.data) section.data = {}
  if (!Array.isArray(section.data.brandLogos)) section.data.brandLogos = []
  section.data.brandLogos.push({ name: '', imageUrl: '', linkUrl: '' })
}

const removeBrandLogoItem = (section: any, index: number) => {
  if (section.data && Array.isArray(section.data.brandLogos)) {
    section.data.brandLogos.splice(index, 1)
  }
}

const addGuaranteeItem = (section: any) => {
  if (!section.data) section.data = {}
  if (!Array.isArray(section.data.guarantees)) section.data.guarantees = []
  section.data.guarantees.push({ icon: 'fa-solid fa-certificate', title: '', title_en: '', desc: '', desc_en: '' })
}

const removeGuaranteeItem = (section: any, index: number) => {
  if (section.data && Array.isArray(section.data.guarantees)) {
    section.data.guarantees.splice(index, 1)
  }
}

const getSectionTitle = (type: string | null) => {
  if (!type) return ''
  const titles: Record<string, string> = {
    hero: 'السليدر الرئيسي (Hero)',
    hero_slider: 'السليدر الرئيسي (Hero)',
    category_slider: 'أقسام المتجر (Categories)',
    brand_showcase: 'عرض منتجات ماركة (Brand Showcase)',
    new_arrivals: 'أحدث المنتجات (New Arrivals)',
    brand_campaign: 'حملة ترويجية (Brand Campaign)',
    side_banner: 'بانر جانبي ومنتجات (Side Banner)',
    store_features: 'مميزات المتجر (Store Features)',
    brands_ticker: 'شريط الماركات المتحرك (Brands Ticker)',
    store_guarantees: 'ضمانات المتجر (Store Guarantees)',
    store_location: 'موقع المعرض (Store Location)'
  }
  return titles[type] || type
}
</script>
