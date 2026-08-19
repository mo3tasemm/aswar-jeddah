<template>
  <div class="space-y-6 pb-24 lg:pb-6 relative" :dir="adminDir">
    
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
      <div>
        <h1 class="text-2xl font-black text-slate-800 flex items-center gap-2.5">
          <i class="fa-solid fa-cubes-stacked text-indigo-600 text-xl"></i>
          {{ t('admin.storefront.title') }}
        </h1>
        <p class="text-sm text-slate-500 mt-1">{{ t('admin.storefront.subtitle') }}</p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button
          type="button"
          @click="isAddModalOpen = true"
          class="flex-1 sm:flex-initial px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 border border-indigo-200/60 shadow-sm cursor-pointer"
        >
          <i class="fa-solid fa-plus text-xs"></i>
          {{ t('admin.storefront.add_section') }}
        </button>

        <BaseButton 
          variant="primary" 
          class="flex-1 sm:flex-initial justify-center shadow-sm" 
          :loading="isSaving"
          @click="saveLayout"
        >
          <i class="fa-solid fa-floppy-disk text-xs ml-1.5"></i>
          {{ t('admin.common.save') }}
        </BaseButton>
      </div>
    </div>

    <!-- Quick Expand / Collapse All Controls Bar -->
    <div v-if="sections.length > 0" class="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
      <span>إجمالي الأقسام: <strong class="text-slate-800 font-black">{{ sections.length }}</strong></span>
      <div class="flex items-center gap-3">
        <button type="button" @click="expandAllSections" class="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <i class="fa-solid fa-angles-down text-[10px]"></i>
          توسيع الكل
        </button>
        <span class="text-slate-300">|</span>
        <button type="button" @click="collapseAllSections" class="hover:text-indigo-600 transition-colors flex items-center gap-1">
          <i class="fa-solid fa-angles-up text-[10px]"></i>
          طي الكل
        </button>
      </div>
    </div>

    <!-- Empty State (When no sections exist) -->
    <div v-if="sections.length === 0" class="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4 shadow-sm">
      <div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
        <i class="fa-solid fa-folder-open text-2xl"></i>
      </div>
      <h3 class="text-lg font-bold text-slate-800">لا توجد أقسام مضافة حالياً في الصفحة الرئيسية</h3>
      <p class="text-sm text-slate-500 max-w-md mx-auto">يمكنك إضافة أي سكشن وتخصيص محتواه بالكامل من خلال الضغط على زر إضافة سكشن جديد.</p>
      <button 
        @click="isAddModalOpen = true"
        class="px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2"
      >
        <i class="fa-solid fa-plus text-xs"></i>
        إضافة سكشن جديد الآن
      </button>
    </div>

    <!-- Layout Sections Editor (Collapsible Cards) -->
    <div v-else class="space-y-4">
      <div 
        v-for="(section, index) in sections" 
        :key="section.id" 
        class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all duration-200"
      >
        
        <!-- Compact Section Header Bar (Click to Toggle Collapse) -->
        <div 
          @click="toggleSectionCollapse(section.id)"
          class="bg-slate-50 px-5 py-3 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/80 transition-colors select-none"
        >
          <!-- Right: Section info & title -->
          <div class="flex items-center gap-3">
            <span class="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0 shadow-inner">
              {{ index + 1 }}
            </span>
            
            <div class="flex items-center gap-2">
              <h3 class="font-bold text-slate-800 text-sm md:text-base">{{ getSectionTitle(section.type) }}</h3>
              <span class="text-[10px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200 uppercase tracking-wider hidden sm:inline-block">
                {{ section.type }}
              </span>
              <span class="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100">
                الترتيب: {{ section.sort_order || (index + 1) }}
              </span>
            </div>
          </div>

          <!-- Left: Controls & Toggle Arrow -->
          <div class="flex items-center gap-1.5" @click.stop>
            <!-- Move Up -->
            <button 
              type="button" 
              @click.stop="moveSectionUp(index)" 
              :disabled="index === 0"
              class="w-7 h-7 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
              title="تحريك للأعلى"
            >
              <i class="fa-solid fa-arrow-up text-xs"></i>
            </button>

            <!-- Move Down -->
            <button 
              type="button" 
              @click.stop="moveSectionDown(index)" 
              :disabled="index === sections.length - 1"
              class="w-7 h-7 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-lg transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed"
              title="تحريك للأسفل"
            >
              <i class="fa-solid fa-arrow-down text-xs"></i>
            </button>

            <div class="h-4 w-px bg-slate-300 mx-1"></div>

            <!-- Delete Section -->
            <button 
              type="button" 
              @click.stop="deleteSection(index)" 
              class="px-2.5 py-1 text-red-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-100 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-bold"
              title="حذف هذا السكشن"
            >
              <i class="fa-solid fa-trash-can text-xs"></i>
              <span class="hidden sm:inline">حذف</span>
            </button>

            <div class="h-4 w-px bg-slate-300 mx-1"></div>

            <!-- Collapse Toggle Button -->
            <button 
              type="button"
              @click.stop="toggleSectionCollapse(section.id)"
              class="w-7 h-7 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors flex items-center justify-center"
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

        <!-- Section Content Editor Body (Collapsed State Animated) -->
        <div v-show="!isSectionCollapsed(section.id)" class="p-6 border-t border-slate-100 bg-white">
          
          <!-- 1. Hero Slider Section -->
          <div v-if="section.type === 'hero'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-bold text-slate-800 text-sm">شرائح السليدر الرئيسي (Hero Slides)</h4>
                <p class="text-xs text-slate-500 mt-0.5">يمكنك إضافة، ترتيب، أو حذف أي شريحة بشكل مستقل.</p>
              </div>
              <button 
                type="button" 
                @click="addHeroSlide(section)"
                class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة سلايد جديد
              </button>
            </div>

            <div 
              v-for="(slide, sIdx) in (section.slides || [])" 
              :key="sIdx" 
              class="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 items-start relative group"
            >
              <div class="shrink-0 w-full sm:w-56">
                <ImageUploader v-model="slide.imageUrl" :label="`صورة السلايد ${sIdx + 1}`" :maxFiles="1" />
              </div>

              <div class="flex-1 w-full space-y-4">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <BaseInput v-model="slide.altText" label="العنوان الترويجي / الوصف مختصر" placeholder="مثال: أقوى التخفيضات على المكيفات" />
                  <BaseInput v-model="slide.linkUrl" label="رابط التوجيه (Target URL)" placeholder="/category/ac" dir="ltr" />
                </div>
              </div>

              <!-- Slide Actions (Move Up, Move Down, Trash) -->
              <div class="flex items-center gap-1 shrink-0 self-end md:self-start pt-2 md:pt-0">
                <button 
                  type="button"
                  @click="moveHeroSlideUp(section, sIdx)"
                  :disabled="sIdx === 0"
                  class="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30"
                  title="تحريك للأعلى"
                >
                  <i class="fa-solid fa-arrow-up text-xs"></i>
                </button>
                <button 
                  type="button"
                  @click="moveHeroSlideDown(section, sIdx)"
                  :disabled="sIdx === (section.slides || []).length - 1"
                  class="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30"
                  title="تحريك للأسفل"
                >
                  <i class="fa-solid fa-arrow-down text-xs"></i>
                </button>
                <button 
                  v-if="(section.slides || []).length > 1"
                  type="button"
                  @click="removeHeroSlide(section, sIdx)"
                  class="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  title="حذف السلايد"
                >
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 2. Category Slider -->
          <div v-else-if="section.type === 'category_slider'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput v-model="section.title" label="عنوان السكشن" placeholder="أقسام المتجر" />
            <p class="text-sm text-slate-500 py-4 col-span-2">هذا القسم يسحب قائمة أقسام المتجر الرئيسية تلقائياً من نظام التصنيفات.</p>
          </div>

          <!-- 3. Brand Showcase Section -->
          <div v-else-if="section.type === 'brand_showcase'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput v-model="section.title" label="عنوان القسم" placeholder="مثال: منتجات فيليبس العالمية" />
            <BaseInput v-model="section.subtitle" label="العنوان الفرعي" placeholder="مثال: ابتكر معنا لحياة أفضل" />
            
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">العلامة التجارية المستهدفة</label>
              <select v-model="section.brandName" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                <option v-for="brand in brandOptions" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
              <select v-model="section.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                <option :value="4">4 منتجات</option>
                <option :value="6">6 منتجات</option>
                <option :value="8">8 منتجات</option>
                <option :value="12">12 منتج</option>
              </select>
            </div>

            <BaseInput v-model="section.viewAllUrl" label="رابط زر عرض الكل" placeholder="/brand/philips" dir="ltr" />

            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">لون خلفية السكشن (Background Color)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="section.bgColorHex" @input="updateBgColor(section, $event)" class="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                <span class="text-sm font-mono text-slate-500" dir="ltr">{{ section.bgColorHex || extractHex(section.bgColor) }}</span>
              </div>
            </div>
          </div>

          <!-- 4. Brand Campaign Section -->
          <div v-else-if="section.type === 'brand_campaign'" class="flex flex-col md:flex-row gap-6">
            <div class="shrink-0 w-full sm:w-64">
              <ImageUploader v-model="section.bannerImage" label="صورة البانر الترويجي" :maxFiles="1" />
            </div>
            
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
              <BaseInput v-model="section.title" label="العنوان الرئيسي للبانر" />
              <BaseInput v-model="section.subtitle" label="الوصف الفرعي" />
              <BaseInput v-model="section.btnText" label="نص زر الحركة (Call to Action)" />
              <BaseInput v-model="section.targetUrl" label="رابط التوجيه (Link)" dir="ltr" />
              
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">التصنيف المستهدف للمنتجات</label>
                <select v-model="section.category" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>

              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
                <select v-model="section.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option :value="4">4 منتجات</option>
                  <option :value="5">5 منتجات</option>
                  <option :value="8">8 منتجات</option>
                  <option :value="10">10 منتجات</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 5. Side Banner Slider Section -->
          <div v-else-if="section.type === 'side_banner'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-bold text-slate-800 text-sm">شرائح البانر الجانبي (Side Banner Slides)</h4>
                <p class="text-xs text-slate-500 mt-0.5">لكل صورة رابط توجيه خاص ومستقل بها.</p>
              </div>
              <button 
                type="button" 
                @click="addSideBannerSlide(section)"
                class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة سلايد جديد
              </button>
            </div>

            <div 
              v-for="(slide, sIdx) in (section.sideBannerSlides || [])" 
              :key="sIdx" 
              class="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 items-start relative group"
            >
              <div class="shrink-0 w-full sm:w-48">
                <ImageUploader v-model="slide.imageUrl" :label="`صورة البانر ${sIdx + 1}`" :maxFiles="1" />
              </div>
              <div class="flex-1 w-full space-y-4 pt-1">
                <BaseInput v-model="slide.linkUrl" label="رابط التوجيه لهذه الصورة (مثال: /brand/smeg)" dir="ltr" />
              </div>

              <!-- Slide Actions -->
              <div class="flex items-center gap-1 shrink-0 self-end md:self-start pt-2 md:pt-0">
                <button 
                  type="button"
                  @click="moveSideBannerSlideUp(section, sIdx)"
                  :disabled="sIdx === 0"
                  class="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30"
                  title="تحريك للأعلى"
                >
                  <i class="fa-solid fa-arrow-up text-xs"></i>
                </button>
                <button 
                  type="button"
                  @click="moveSideBannerSlideDown(section, sIdx)"
                  :disabled="sIdx === (section.sideBannerSlides || []).length - 1"
                  class="p-1.5 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30"
                  title="تحريك للأسفل"
                >
                  <i class="fa-solid fa-arrow-down text-xs"></i>
                </button>
                <button 
                  v-if="(section.sideBannerSlides || []).length > 1"
                  type="button"
                  @click="removeSideBannerSlide(section, sIdx)"
                  class="p-1.5 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                  title="حذف السلايد"
                >
                  <i class="fa-solid fa-trash-can text-xs"></i>
                </button>
              </div>
            </div>

            <div class="space-y-4 pt-4 border-t border-slate-100">
              <label class="block text-sm font-bold text-slate-700">تصفية المنتجات المرافقة للبانر</label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <select v-model="section.category" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option value="">-- اختر التصنيف --</option>
                  <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <select v-model="section.brandName" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option value="">-- اختر الماركة --</option>
                  <option v-for="brand in brandOptions" :key="brand" :value="brand">{{ brand }}</option>
                </select>
                <select v-model="section.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option :value="4">4 منتجات</option>
                  <option :value="5">5 منتجات</option>
                  <option :value="8">8 منتجات</option>
                  <option :value="10">10 منتجات</option>
                </select>
              </div>
            </div>
          </div>

          <!-- 6. New Arrivals Section -->
          <div v-else-if="section.type === 'new_arrivals'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput v-model="section.title" label="عنوان السكشن" placeholder="أحدث المنتجات الواصلة حديثاً" />
            <BaseInput v-model="section.shopUrl" label="رابط زر عرض الكل" placeholder="/new-arrivals" dir="ltr" />
            <div class="space-y-2 col-span-2 sm:col-span-1">
              <label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label>
              <select v-model="section.limit" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                <option :value="4">4 منتجات</option>
                <option :value="8">8 منتجات</option>
                <option :value="12">12 منتج</option>
              </select>
            </div>
          </div>

          <!-- 7. Store Features Section -->
          <div v-else-if="section.type === 'store_features'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-bold text-slate-800 text-sm">مميزات المتجر (Store Features Items)</h4>
                <p class="text-xs text-slate-500 mt-0.5">يمكنك تكييف مميزات التوصيل والضمان والدعم الفني بسهولة.</p>
              </div>
              <button 
                type="button" 
                @click="addFeatureItem(section)"
                class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة ميزة جديدة
              </button>
            </div>

            <div 
              v-for="(item, fIdx) in (section.features || [])" 
              :key="fIdx" 
              class="flex flex-col sm:flex-row gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 items-start sm:items-center relative group"
            >
              <div class="w-32 shrink-0">
                <BaseInput v-model="item.icon" label="كلاس أيقونة FA" placeholder="fa-truck-fast" />
              </div>
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BaseInput v-model="item.title" label="عنوان الميزة" placeholder="توصيل سريع" />
                <BaseInput v-model="item.desc" label="الوصف المختصر" placeholder="توصيل لجميع مناطق المملكة" />
              </div>
              <button 
                v-if="(section.features || []).length > 1"
                type="button"
                @click="removeFeatureItem(section, fIdx)"
                class="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors shrink-0 self-end sm:self-center"
                title="حذف الميزة"
              >
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>

          <!-- 8. Brands Ticker Section -->
          <div v-else-if="section.type === 'brands_ticker'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-bold text-slate-800 text-sm">شعار العلامات التجارية للشريط (Brand Logos)</h4>
                <p class="text-xs text-slate-500 mt-0.5">أضف شعارات الماركات وتوجيه كل ماركة.</p>
              </div>
              <button 
                type="button" 
                @click="addBrandLogoItem(section)"
                class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة ماركة جديدة
              </button>
            </div>

            <div 
              v-for="(brand, bIdx) in (section.brandLogos || [])" 
              :key="bIdx" 
              class="flex flex-col sm:flex-row gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 items-start sm:items-center relative group"
            >
              <div class="shrink-0 w-full sm:w-44 lg:w-48">
                <ImageUploader v-model="brand.imageUrl" :label="`شعار الماركة ${bIdx + 1}`" :maxFiles="1" />
              </div>
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BaseInput v-model="brand.name" label="اسم الماركة" placeholder="Philips" />
                <BaseInput v-model="brand.linkUrl" label="رابط التوجيه" placeholder="/brand/philips" dir="ltr" />
              </div>
              <button 
                v-if="(section.brandLogos || []).length > 1"
                type="button"
                @click="removeBrandLogoItem(section, bIdx)"
                class="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors shrink-0 self-end sm:self-center"
                title="حذف الماركة"
              >
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>

          <!-- 9. Store Guarantees Section -->
          <div v-else-if="section.type === 'store_guarantees'" class="space-y-6">
            <div class="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 class="font-bold text-slate-800 text-sm">عناصر ضمانات المتجر</h4>
                <p class="text-xs text-slate-500 mt-0.5">أضف بنود الضمان والاستبدال المعروضة للزوار.</p>
              </div>
              <button 
                type="button" 
                @click="addGuaranteeItem(section)"
                class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5"
              >
                <i class="fa-solid fa-plus text-xs"></i>
                إضافة ضمان جديد
              </button>
            </div>

            <div 
              v-for="(item, gIdx) in (section.guarantees || [])" 
              :key="gIdx" 
              class="flex flex-col sm:flex-row gap-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200/80 items-start sm:items-center relative group"
            >
              <div class="w-32 shrink-0">
                <BaseInput v-model="item.icon" label="كلاس أيقونة FA" placeholder="fa-shield-halved" />
              </div>
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <BaseInput v-model="item.title" label="عنوان الضمان" placeholder="ضمان أصلي 100%" />
                <BaseInput v-model="item.desc" label="الوصف" placeholder="جميع منتجاتنا مضمونة من الوكيل المعتمد" />
              </div>
              <button 
                v-if="(section.guarantees || []).length > 1"
                type="button"
                @click="removeGuaranteeItem(section, gIdx)"
                class="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors shrink-0 self-end sm:self-center"
                title="حذف العنصر"
              >
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
          </div>

          <!-- 10. Store Location Section -->
          <div v-else-if="section.type === 'store_location'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput v-model="section.title" label="عنوان قسم المعرض" placeholder="زيارة معرضنا الرئيسي" />
            <BaseInput v-model="section.address" label="العنوان التفصيلي" placeholder="جدة - حي الصفا - طريق الملك فهد" />
            <BaseInput v-model="section.workingHours" label="مواعيد العمل" placeholder="يومياً من 9 صباحاً إلى 11 مساءً" />
            <BaseInput v-model="section.phone" label="رقم الهاتف للتواصل" placeholder="01286000037" dir="ltr" />
            <BaseInput v-model="section.mapUrl" label="رابط الخريطة (Google Maps Link)" placeholder="https://maps.google.com/..." dir="ltr" class="col-span-2" />
          </div>

        </div>
      </div>
    </div>

    <!-- Modal for Adding New Section (With Position Selector) -->
    <BaseModal
      v-model="isAddModalOpen"
      :title="selectedTypeForAdd ? 'حدد موضع وترتيب السكشن' : 'اختر نوع السكشن الجديد'"
      :description="selectedTypeForAdd ? 'حدد الترتيب أو الموقع الذي ترغب بوضع السكشن فيه داخل الواجهة.' : 'اختر نوع السكشن الذي تريد إضافته للواجهة الرئيسية للمتجر.'"
      maxWidth="lg"
      @close="selectedTypeForAdd = null"
    >
      <!-- Step 1: Select Section Type -->
      <div v-if="!selectedTypeForAdd" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div 
          v-for="opt in availableSectionTypes" 
          :key="opt.type"
          @click="selectSectionType(opt.type)"
          class="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/50 transition-all cursor-pointer group flex flex-col justify-between space-y-2 bg-white"
        >
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors shrink-0">
              <i :class="opt.icon"></i>
            </div>
            <div>
              <h4 class="font-bold text-slate-800 text-sm group-hover:text-indigo-700 transition-colors">{{ opt.title }}</h4>
              <p class="text-xs text-slate-400 mt-0.5 line-clamp-2">{{ opt.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 2: Select Section Position / Order -->
      <div v-else class="space-y-6">
        <button 
          type="button" 
          @click="selectedTypeForAdd = null"
          class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 transition-colors"
        >
          <i class="fa-solid fa-arrow-right text-[10px]"></i>
          العودة لاختيار نوع السكشن
        </button>

        <!-- Selected Type Summary Card -->
        <div class="bg-indigo-50/70 border border-indigo-100 rounded-xl p-4 flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg font-bold shrink-0 shadow-sm">
            <i :class="getSelectedTypeIcon(selectedTypeForAdd)"></i>
          </div>
          <div>
            <span class="text-[10px] font-bold uppercase text-indigo-500 tracking-wider">السكشن المختار</span>
            <h4 class="font-bold text-slate-800 text-base">{{ getSectionTitle(selectedTypeForAdd) }}</h4>
          </div>
        </div>

        <!-- Position Dropdown Input -->
        <div class="space-y-2">
          <label class="block text-sm font-bold text-slate-700">اختر موضع / ترتيب السكشن في الصفحة:</label>
          <select 
            v-model="selectedPositionForAdd" 
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-800 font-bold"
          >
            <option 
              v-for="pos in (sections.length + 1)" 
              :key="pos" 
              :value="pos"
            >
              {{ pos === 1 ? '1. في بداية الصفحة (الموقع الأول)' : (pos === sections.length + 1 ? `${pos}. في نهاية الصفحة (الموقع الأخير)` : `${pos}. الترتيب رقم ${pos}`) }}
            </option>
          </select>
          <p class="text-xs text-slate-400">سيتم إدراج السكشن في الترتيب رقم ({{ selectedPositionForAdd }}) وإعادة ترتيب باقي السكاشن تلقائياً.</p>
        </div>

        <!-- Confirm / Cancel Buttons -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button 
            type="button" 
            @click="isAddModalOpen = false; selectedTypeForAdd = null"
            class="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors"
          >
            إلغاء
          </button>
          <button 
            type="button" 
            @click="confirmAddSection"
            class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2"
          >
            <i class="fa-solid fa-check text-xs"></i>
            تأكيد إضافة السكشن في الموقع ({{ selectedPositionForAdd }})
          </button>
        </div>
      </div>
    </BaseModal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import BaseModal from '~/components/dashboard/ui/BaseModal.vue'
import { fetchHomeLayout, saveHomeLayout, type HomeSection } from '~/services/homeLayoutService'
import { useToast } from '~/composables/useToast'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { t, adminDir } = useAdminLanguage()

useHead({
  title: computed(() => `${t('admin.storefront.title')} | ${t('admin.sidebar.panel_title')}`)
})

const { success } = useToast()
const isSaving = ref(false)
const isAddModalOpen = ref(false)
const selectedTypeForAdd = ref<string | null>(null)
const selectedPositionForAdd = ref<number>(1)
const sections = ref<HomeSection[]>([])
const collapsedSections = ref<Record<string, boolean>>({})

// Options for selects
const brandOptions = ['PHILIPS', 'NUTRICOOK', 'JBL', 'TINECO', 'DYSON', 'SMEG']
const categoryOptions = ['أجهزة المطبخ', 'المكيفات', 'الشاشات', 'الغسالات']

// Section Options for Add Section Modal (FontAwesome Icons)
const availableSectionTypes = [
  {
    type: 'hero',
    title: 'السليدر الرئيسي (Hero)',
    description: 'شرائح صور رئيسية كبيرة تظهر في أعلى الصفحة لترويج أهم العروض.',
    icon: 'fa-solid fa-images'
  },
  {
    type: 'category_slider',
    title: 'أقسام المتجر (Categories)',
    description: 'شريط ينقل الزوار بين الأقسام الرئيسية للمتجر.',
    icon: 'fa-solid fa-layer-group'
  },
  {
    type: 'brand_showcase',
    title: 'عرض منتجات ماركة',
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
    title: 'حملة ترويجية (Banner & Products)',
    description: 'بانر عريض مع قائمة المنتجات المرتبطة بالحملة.',
    icon: 'fa-solid fa-bullhorn'
  },
  {
    type: 'side_banner',
    title: 'بانر جانبي ومنتجات',
    description: 'سلايدر بانر جانبي متحرك وبجانبه سلايدر منتجات متناسق.',
    icon: 'fa-solid fa-sliders'
  },
  {
    type: 'store_features',
    title: 'مميزات المتجر',
    description: 'شريط يعرض خيارات الشحن، التوصيل، والدفع للعملاء.',
    icon: 'fa-solid fa-truck-fast'
  },
  {
    type: 'brands_ticker',
    title: 'شريط الماركات المتحرك',
    description: 'شريط يعرض شعارات الماركات الشريكة بشكل انسيابي.',
    icon: 'fa-solid fa-certificate'
  },
  {
    type: 'store_guarantees',
    title: 'ضمانات المتجر',
    description: 'قسم يوضح الضمان المعتمد وسياسة الاستبدال.',
    icon: 'fa-solid fa-shield-halved'
  },
  {
    type: 'store_location',
    title: 'موقع المعرض',
    description: 'خريطة ومعلومات التواصل لزيارة معرض المتجر.',
    icon: 'fa-solid fa-location-dot'
  }
]

onMounted(async () => {
  const data = await fetchHomeLayout()
  sections.value = data.map((sec, idx) => {
    // Assign default sort_order if missing
    if (sec.sort_order === undefined || sec.sort_order === null) {
      sec.sort_order = idx + 1
    }
    
    // Collapse by default
    collapsedSections.value[sec.id] = true

    if (sec.bgColor) {
      sec.bgColorHex = extractHex(sec.bgColor)
    }
    if (sec.type === 'side_banner') {
      if (!sec.sideBannerSlides || !Array.isArray(sec.sideBannerSlides)) {
        if (sec.sideBannerImages && Array.isArray(sec.sideBannerImages)) {
          sec.sideBannerSlides = sec.sideBannerImages.map((img: any) => 
            typeof img === 'string' 
              ? { imageUrl: img, linkUrl: sec.sideBannerUrl || '' } 
              : { imageUrl: img.imageUrl || img.image || '', linkUrl: img.linkUrl || img.url || sec.sideBannerUrl || '' }
          )
        } else if (sec.sideBannerImage) {
          sec.sideBannerSlides = [
            { imageUrl: sec.sideBannerImage, linkUrl: sec.sideBannerUrl || '' }
          ]
        } else {
          sec.sideBannerSlides = [
            { imageUrl: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop', linkUrl: '/brand/smeg' }
          ]
        }
      }
    }
    if (sec.type === 'store_features' && (!sec.features || !Array.isArray(sec.features))) {
      sec.features = [
        { icon: 'fa-truck-fast', title: 'توصيل سريع وآمن', desc: 'توصيل مجاني للطلبات فوق 300 ريال' },
        { icon: 'fa-shield-halved', title: 'ضمان الوكيل الأصلي', desc: 'جميع الأجهزة الكهربائية بأعلى جودة' },
        { icon: 'fa-credit-card', title: 'خيارات دفع متعددة', desc: 'دفع بالتقسيط أو عند الاستلام' },
        { icon: 'fa-headset', title: 'دعم فني 24/7', desc: 'خدمة عملاء جاهزة لمساعدتك دائماً' }
      ]
    }
    if (sec.type === 'brands_ticker' && (!sec.brandLogos || !Array.isArray(sec.brandLogos))) {
      sec.brandLogos = [
        { name: 'PHILIPS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg', linkUrl: '/brand/philips' },
        { name: 'SMEG', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Smeg_logo.svg', linkUrl: '/brand/smeg' },
        { name: 'DYSON', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Dyson_logo.svg', linkUrl: '/brand/dyson' },
        { name: 'JBL', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/JBL_logo.svg', linkUrl: '/brand/jbl' }
      ]
    }
    if (sec.type === 'store_guarantees' && (!sec.guarantees || !Array.isArray(sec.guarantees))) {
      sec.guarantees = [
        { icon: 'fa-certificate', title: 'منتجات أصلية 100%', desc: 'جميع منتجاتنا مضمونة مباشرة من الوكلاء' },
        { icon: 'fa-rotate-left', title: 'استبدال مرن', desc: 'إمكانية الاستبدال أو الإرجاع خلال 14 يوماً' }
      ]
    }
    return sec
  })

  syncSortOrders()
})

const syncSortOrders = () => {
  sections.value.forEach((sec, idx) => {
    sec.sort_order = idx + 1
  })
}

// ----------------- Collapse State Helpers -----------------
const isSectionCollapsed = (id: string): boolean => {
  return collapsedSections.value[id] ?? true
}

const toggleSectionCollapse = (id: string) => {
  collapsedSections.value[id] = !isSectionCollapsed(id)
}

const expandAllSections = () => {
  sections.value.forEach(sec => {
    collapsedSections.value[sec.id] = false
  })
}

const collapseAllSections = () => {
  sections.value.forEach(sec => {
    collapsedSections.value[sec.id] = true
  })
}

// ----------------- Section Factory & CRUD -----------------
const createDefaultSection = (type: string): HomeSection => {
  const timestamp = Date.now()
  const nextOrder = sections.value.length + 1

  switch (type) {
    case 'hero':
      return {
        id: `sec-hero-${timestamp}`,
        type: 'hero',
        sort_order: nextOrder,
        slides: [
          { id: 1, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80', linkUrl: '/category/ac', altText: 'عروض المكيفات' }
        ]
      }
    case 'category_slider':
      return { id: `sec-cat-${timestamp}`, type: 'category_slider', sort_order: nextOrder, title: 'أقسام المتجر' }
    case 'brand_showcase':
      return {
        id: `sec-brand-${timestamp}`,
        type: 'brand_showcase',
        sort_order: nextOrder,
        brandName: 'PHILIPS',
        title: 'منتجات فيليبس العالمية',
        subtitle: 'ابتكر معنا لحياة أفضل',
        bgColor: 'bg-[#1a66cc]',
        bgColorHex: '#1a66cc',
        limit: 6,
        viewAllUrl: '/brand/philips'
      }
    case 'new_arrivals':
      return { id: `sec-new-${timestamp}`, type: 'new_arrivals', sort_order: nextOrder, title: 'أحدث المنتجات الواصلة حديثاً', shopUrl: '/new-arrivals', limit: 8 }
    case 'brand_campaign':
      return {
        id: `sec-campaign-${timestamp}`,
        type: 'brand_campaign',
        sort_order: nextOrder,
        title: 'خصومات مميزة',
        subtitle: 'أقوى العروض على أجهزة المطبخ',
        btnText: 'تسوق الآن',
        targetUrl: '/category/kitchen-appliances',
        bannerImage: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80',
        category: 'أجهزة المطبخ',
        limit: 5
      }
    case 'side_banner':
      return {
        id: `sec-side-${timestamp}`,
        type: 'side_banner',
        sort_order: nextOrder,
        sideBannerSlides: [
          { imageUrl: 'https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop', linkUrl: '/brand/smeg' }
        ],
        category: 'أجهزة المطبخ',
        limit: 5
      }
    case 'store_features':
      return { 
        id: `sec-features-${timestamp}`, 
        type: 'store_features',
        sort_order: nextOrder,
        features: [
          { icon: 'fa-truck-fast', title: 'توصيل سريع وآمن', desc: 'توصيل مجاني للطلبات فوق 300 ريال' },
          { icon: 'fa-shield-halved', title: 'ضمان الوكيل الأصلي', desc: 'جميع الأجهزة الكهربائية بأعلى جودة' }
        ]
      }
    case 'brands_ticker':
      return { 
        id: `sec-brands-${timestamp}`, 
        type: 'brands_ticker',
        sort_order: nextOrder,
        brandLogos: [
          { name: 'PHILIPS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg', linkUrl: '/brand/philips' }
        ]
      }
    case 'store_guarantees':
      return { 
        id: `sec-guarantees-${timestamp}`, 
        type: 'store_guarantees',
        sort_order: nextOrder,
        guarantees: [
          { icon: 'fa-certificate', title: 'منتجات أصلية 100%', desc: 'جميع منتجاتنا مضمونة من الوكيل المعتمد' }
        ]
      }
    case 'store_location':
      return { 
        id: `sec-location-${timestamp}`, 
        type: 'store_location',
        sort_order: nextOrder,
        title: 'زيارة معرضنا الرئيسي',
        address: 'جدة - حي الصفا - طريق الملك فهد',
        workingHours: 'يومياً من 9 صباحاً إلى 11 مساءً',
        phone: '01286000037',
        mapUrl: 'https://maps.google.com'
      }
    default:
      return { id: `sec-${timestamp}`, type, sort_order: nextOrder }
  }
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

const confirmAddSection = () => {
  if (!selectedTypeForAdd.value) return
  const newSec = createDefaultSection(selectedTypeForAdd.value)
  const targetIdx = Math.max(0, Math.min(sections.value.length, selectedPositionForAdd.value - 1))
  sections.value.splice(targetIdx, 0, newSec)
  collapsedSections.value[newSec.id] = false // Expand newly added section
  syncSortOrders()
  
  const addedTitle = getSectionTitle(selectedTypeForAdd.value)
  const finalPos = targetIdx + 1
  isAddModalOpen.value = false
  selectedTypeForAdd.value = null
  success(`تمت إضافة سكشن ${addedTitle} في الموقع (${finalPos}) بنجاح!`)
}

const addNewSection = (type: string) => {
  selectSectionType(type)
}

const deleteSection = (index: number) => {
  const deleted = sections.value[index]
  sections.value.splice(index, 1)
  delete collapsedSections.value[deleted.id]
  syncSortOrders()
  success(`تم حذف سكشن ${getSectionTitle(deleted.type)}`)
}

const moveSectionUp = (index: number) => {
  if (index <= 0) return
  const item = sections.value[index]
  sections.value.splice(index, 1)
  sections.value.splice(index - 1, 0, item)
  syncSortOrders()
}

const moveSectionDown = (index: number) => {
  if (index >= sections.value.length - 1) return
  const item = sections.value[index]
  sections.value.splice(index, 1)
  sections.value.splice(index + 1, 0, item)
  syncSortOrders()
}

// ----------------- Sub-items Helpers -----------------
const addHeroSlide = (section: any) => {
  if (!section.slides) section.slides = []
  section.slides.push({
    id: Date.now(),
    imageUrl: '',
    linkUrl: '',
    altText: ''
  })
}

const removeHeroSlide = (section: any, index: number) => {
  section.slides.splice(index, 1)
}

const moveHeroSlideUp = (section: any, index: number) => {
  if (index <= 0) return
  const item = section.slides[index]
  section.slides.splice(index, 1)
  section.slides.splice(index - 1, 0, item)
}

const moveHeroSlideDown = (section: any, index: number) => {
  if (index >= section.slides.length - 1) return
  const item = section.slides[index]
  section.slides.splice(index, 1)
  section.slides.splice(index + 1, 0, item)
}

const addSideBannerSlide = (section: any) => {
  if (!section.sideBannerSlides) section.sideBannerSlides = []
  section.sideBannerSlides.push({
    imageUrl: '',
    linkUrl: ''
  })
}

const removeSideBannerSlide = (section: any, index: number) => {
  section.sideBannerSlides.splice(index, 1)
}

const moveSideBannerSlideUp = (section: any, index: number) => {
  if (index <= 0) return
  const item = section.sideBannerSlides[index]
  section.sideBannerSlides.splice(index, 1)
  section.sideBannerSlides.splice(index - 1, 0, item)
}

const moveSideBannerSlideDown = (section: any, index: number) => {
  if (index >= section.sideBannerSlides.length - 1) return
  const item = section.sideBannerSlides[index]
  section.sideBannerSlides.splice(index, 1)
  section.sideBannerSlides.splice(index + 1, 0, item)
}

const addFeatureItem = (section: any) => {
  if (!section.features) section.features = []
  section.features.push({ icon: 'fa-star', title: '', desc: '' })
}

const removeFeatureItem = (section: any, index: number) => {
  section.features.splice(index, 1)
}

const addBrandLogoItem = (section: any) => {
  if (!section.brandLogos) section.brandLogos = []
  section.brandLogos.push({ name: '', imageUrl: '', linkUrl: '' })
}

const removeBrandLogoItem = (section: any, index: number) => {
  section.brandLogos.splice(index, 1)
}

const addGuaranteeItem = (section: any) => {
  if (!section.guarantees) section.guarantees = []
  section.guarantees.push({ icon: 'fa-check', title: '', desc: '' })
}

const removeGuaranteeItem = (section: any, index: number) => {
  section.guarantees.splice(index, 1)
}

const getSectionTitle = (type: string) => {
  const titles: Record<string, string> = {
    hero: 'السليدر الرئيسي (Hero)',
    category_slider: 'أقسام المتجر (Categories)',
    brand_showcase: 'عرض منتجات ماركة',
    new_arrivals: 'أحدث المنتجات (New Arrivals)',
    brand_campaign: 'حملة ترويجية (Banner & Products)',
    side_banner: 'بانر جانبي ومنتجات (سلايدر مالتي ميديا)',
    store_features: 'مميزات المتجر',
    brands_ticker: 'شريط الماركات المتحرك',
    store_guarantees: 'ضمانات المتجر',
    store_location: 'موقع المعرض'
  }
  return titles[type] || type
}

const extractHex = (bgColorClass: string) => {
  const match = bgColorClass.match(/bg-\[(#[0-9A-Fa-f]{6})\]/)
  return match ? match[1] : '#ffffff'
}

const updateBgColor = (section: any, event: any) => {
  const hex = event.target.value
  section.bgColor = `bg-[${hex}]`
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

const saveLayout = async () => {
  isSaving.value = true
  try {
    syncSortOrders()
    // Convert any uploaded File objects to base64 strings so they can be JSON cloned
    for (const section of sections.value) {
      if (section.type === 'hero' && section.slides) {
        for (const slide of section.slides) {
          if (slide.imageUrl instanceof File) slide.imageUrl = await fileToBase64(slide.imageUrl)
          if (slide.mobileImageUrl instanceof File) slide.mobileImageUrl = await fileToBase64(slide.mobileImageUrl)
        }
      }
      if (section.type === 'brand_campaign' && section.bannerImage instanceof File) {
        section.bannerImage = await fileToBase64(section.bannerImage)
      }
      if (section.type === 'side_banner') {
        if (section.sideBannerSlides && Array.isArray(section.sideBannerSlides)) {
          for (const slide of section.sideBannerSlides) {
            if (slide.imageUrl instanceof File) {
              slide.imageUrl = await fileToBase64(slide.imageUrl as File)
            }
          }
        }
      }
      if (section.type === 'brands_ticker' && section.brandLogos) {
        for (const brand of section.brandLogos) {
          if (brand.imageUrl instanceof File) {
            brand.imageUrl = await fileToBase64(brand.imageUrl as File)
          }
        }
      }
    }

    // Clean up temporary fields before saving
    const dataToSave = JSON.parse(JSON.stringify(sections.value))
    dataToSave.forEach((sec: any) => {
      delete sec.bgColorHex
    })
    
    await saveHomeLayout(dataToSave)
    success('تم حفظ تغييرات الواجهة بنجاح!')
  } catch (error) {
    console.error('Error saving layout:', error)
  } finally {
    isSaving.value = false
  }
}
</script>
