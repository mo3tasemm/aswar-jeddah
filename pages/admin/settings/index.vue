<template>
  <div class="space-y-6 pb-28 min-h-screen">
    
    <!-- 1. MAIN HEADER & ACTIONS BAR -->
    <div class="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#0B0E28] flex items-center justify-center font-black shrink-0 shadow-2xs">
          <svg class="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight">إعدادات النظام والمتجر الشاملة</h1>
          <p class="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">تخصيص البيانات العامة، الهوية البصرية، الشحن، الضرائب، بوابات الدفع، وإدارة الصيانة.</p>
        </div>
      </div>

      <!-- Header Actions -->
      <div class="flex items-center gap-3 w-full sm:w-auto justify-end">
        <!-- Unsaved Changes Warning Badge -->
        <Transition name="fade">
          <div v-if="hasUnsavedChanges" class="flex items-center gap-1.5 text-amber-700 text-xs font-black bg-amber-50 rounded-xl px-3 py-2 border border-amber-200/80 animate-pulse">
            <svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span class="hidden md:inline">يوجد تعديلات غير محفوظة</span>
            <span class="md:hidden">غير محفوظ</span>
          </div>
        </Transition>

        <!-- Refresh Button -->
        <button 
          @click="fetchSettings" 
          :disabled="isLoading || isSaving"
          class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50"
          title="إعادة جلب الإعدادات من السيرفر"
        >
          <svg class="w-4 h-4" :class="isLoading ? 'animate-spin' : ''" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>

        <!-- Primary Save CTA -->
        <button 
          @click="handleSave"
          :disabled="isSaving || isLoading"
          class="px-6 py-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-w-[150px]"
        >
          <span v-if="isSaving" class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
          <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span>{{ isSaving ? 'جاري الحفظ...' : 'حفظ كافة الإعدادات' }}</span>
        </button>
      </div>
    </div>

    <!-- Error Banner -->
    <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ errorMessage }}</span>
      </div>
      <button @click="errorMessage = ''" class="text-rose-500 hover:text-rose-700 cursor-pointer">✕</button>
    </div>

    <!-- 2. HORIZONTAL NAVIGATION TABS (11 Standalone Top Tabs) -->
    <div class="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 relative">
      <div class="flex items-center gap-2.5 overflow-x-auto pb-1 scroll-smooth hide-scrollbar" ref="tabsContainerRef">
        <button
          v-for="section in sections"
          :key="section.id"
          type="button"
          @click="activeSection = section.id"
          class="whitespace-nowrap shrink-0 px-4 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2.5 border select-none"
          :class="activeSection === section.id 
            ? 'bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-md shadow-slate-900/15 ring-2 ring-amber-400/20' 
            : 'bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-slate-200/80'"
        >
          <span class="w-4 h-4 flex items-center justify-center shrink-0" v-html="section.icon"></span>
          <span>{{ section.title }}</span>
          
          <span 
            v-if="section.badge" 
            class="px-2 py-0.5 rounded-lg text-[10px] font-black"
            :class="activeSection === section.id ? 'bg-amber-400 text-[#0B0E28]' : 'bg-slate-200 text-slate-600'"
          >
            {{ section.badge }}
          </span>
        </button>
      </div>
    </div>

    <!-- 3. FULL WIDTH ACTIVE SETTINGS SECTION CANVAS -->
    <div class="w-full space-y-6">
      
      <!-- Loading Skeleton -->
      <div v-if="isLoading && !settings.store_name_ar" class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6 animate-pulse">
        <div class="w-48 h-6 bg-slate-200 rounded-xl"></div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="h-12 bg-slate-100 rounded-xl"></div>
          <div class="h-12 bg-slate-100 rounded-xl"></div>
        </div>
        <div class="h-28 bg-slate-100 rounded-xl"></div>
      </div>

      <template v-else>

        <!-- ======================================================== -->
        <!-- SECTION 1: الإعدادات العامة (General Settings) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'general'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">1. الإعدادات العامة للمتجر</h2>
            <p class="text-xs text-slate-500 mt-1">البيانات التعريفية الأساسية لمتجر أسوار جدة والمعلومات الرسمية المعتمدة.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Store Name AR -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">اسم المتجر (بالعربية) <span class="text-rose-500">*</span></label>
              <input 
                v-model="settings.store_name_ar" 
                type="text" 
                placeholder="أسوار جدة"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Store Name EN -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">Store Name (English) <span class="text-rose-500">*</span></label>
              <input 
                v-model="settings.store_name_en" 
                type="text" 
                placeholder="Aswar Jeddah" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Support Email -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">البريد الإلكتروني الرسمي للدعم <span class="text-rose-500">*</span></label>
              <input 
                v-model="settings.support_email" 
                type="email" 
                placeholder="support@aswarjeddah.com" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Support Phone -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رقم الهاتف والجوال للدعم</label>
              <input 
                v-model="settings.support_phone" 
                type="text" 
                placeholder="+966559876543" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Hotline -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">الرقم الموحد / الخط الساخن (Hotline)</label>
              <input 
                v-model="settings.hotline" 
                type="text" 
                placeholder="920000000" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Currency & Timezone -->
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">العملة الافتراضية</label>
                <select 
                  v-model="settings.currency"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="SAR">ريال سعودي (SAR)</option>
                  <option value="USD">دولار أمريكي (USD)</option>
                  <option value="AED">درهم إماراتي (AED)</option>
                </select>
              </div>
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">المنطقة الزمنية</label>
                <select 
                  v-model="settings.timezone"
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  <option value="Asia/Riyadh">توقيت السعودية (Asia/Riyadh)</option>
                  <option value="Asia/Dubai">توقيت دبي (Asia/Dubai)</option>
                  <option value="Africa/Cairo">توقيت القاهرة (Africa/Cairo)</option>
                </select>
              </div>
            </div>

            <!-- SEO Meta Title AR -->
            <div class="md:col-span-1 lg:col-span-2 space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">عنوان محركات البحث SEO (بالعربية - Meta Title)</label>
              <input 
                v-model="settings.meta_title" 
                type="text" 
                placeholder="أسوار جدة | متجر الأجهزة المنزلية والإلكترونيات"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- SEO Meta Title EN -->
            <div class="md:col-span-1 lg:col-span-1 space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">SEO Meta Title (English)</label>
              <input 
                v-model="settings.meta_title_en" 
                type="text" 
                placeholder="Aswar Jeddah | Home Appliances & Electronics"
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <!-- Store Description AR (Meta Description) -->
            <div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start">
              <div class="flex items-center justify-between">
                <label class="text-xs font-black text-slate-800 block">وصف المتجر ونبذة عن النشاط (عربي - لمحركات البحث Meta Description) <span class="text-amber-600 font-normal text-[11px]">(form.general.meta_description)</span></label>
              </div>
              <textarea 
                v-model="settings.meta_description" 
                @input="settings.store_description_ar = settings.meta_description"
                rows="3"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all leading-relaxed"
                placeholder="اكتب نبذة تعريفية شاملة عن متجر أسوار جدة تظهر في نتائج بحث جوجل..."
              ></textarea>
            </div>

            <!-- Store Description EN (Meta Description EN) -->
            <div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start">
              <div class="flex items-center justify-between">
                <label class="text-xs font-black text-slate-800 block">Store SEO Meta Description (English) <span class="text-slate-400 font-normal text-[11px]">(meta_description_en)</span></label>
              </div>
              <textarea 
                v-model="settings.meta_description_en" 
                @input="settings.store_description_en = settings.meta_description_en"
                rows="3"
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all leading-relaxed"
                placeholder="Store meta description in English for Google search results..."
              ></textarea>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 2: العناوين والموقع (Location & Maps) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'location'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h2 class="text-lg font-black text-slate-900">2. العناوين والموقع الجغرافي (الخريطة التفاعلية)</h2>
              <p class="text-xs text-slate-500 mt-1">حدد موقع المتجر عبر الخريطة التفاعلية بالسحب والإفلات أو بالبحث عن العنوان.</p>
            </div>
            <span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border border-emerald-200/80 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>خريطة تفاعلية نشطة</span>
            </span>
          </div>

          <!-- INTERACTIVE MAP PICKER COMPONENT (Wrapped in ClientOnly for SSR Safety) -->
          <ClientOnly>
            <InteractiveMapPicker
              :latitude="settings.latitude"
              :longitude="settings.longitude"
              :address-ar="settings.shop_address_ar || settings.address_ar"
              :address-en="settings.shop_address_en || settings.address_en"
              @update:latitude="(val) => settings.latitude = val"
              @update:longitude="(val) => settings.longitude = val"
              @update:address-ar="(val) => { settings.shop_address_ar = val; settings.address_ar = val; }"
              @update:address-en="(val) => { settings.shop_address_en = val; settings.address_en = val; }"
              @locationChanged="(loc) => {
                settings.latitude = String(loc.lat);
                settings.longitude = String(loc.lng);
                if (loc.addressAr) {
                  settings.shop_address_ar = loc.addressAr;
                  settings.address_ar = loc.addressAr;
                }
                if (loc.addressEn) {
                  settings.shop_address_en = loc.addressEn;
                  settings.address_en = loc.addressEn;
                }
                if (loc.city) settings.city = loc.city;
              }"
            />
            <template #fallback>
              <div class="w-full h-80 sm:h-96 rounded-3xl bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2 border border-slate-200">
                <span class="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></span>
                <span class="text-xs font-black text-slate-400">جاري تهيئة الخريطة التفاعلية...</span>
              </div>
            </template>
          </ClientOnly>

          <!-- Coordinate & Address Detail Form Fields -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">العنوان التفصيلي للمتجر (بالعربية) <span class="text-rose-500">*</span></label>
              <input 
                v-model="settings.shop_address_ar" 
                @input="settings.address_ar = settings.shop_address_ar"
                type="text" 
                placeholder="طريق الملك فهد، حي الروضة، جدة" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">Detailed Store Address (English)</label>
              <input 
                v-model="settings.shop_address_en" 
                @input="settings.address_en = settings.shop_address_en"
                type="text" 
                placeholder="King Fahd Road, Al Rawdah, Jeddah" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">المدينة / المنطقة</label>
              <input 
                v-model="settings.city" 
                type="text" 
                placeholder="جدة" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <div class="flex items-center justify-between">
                <label class="text-xs font-black text-slate-800 block">خط العرض (Latitude)</label>
                <span class="text-[10px] text-slate-400 font-bold">تحديث تلقائي</span>
              </div>
              <input 
                v-model="settings.latitude" 
                type="text" 
                placeholder="21.543333" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <div class="flex items-center justify-between">
                <label class="text-xs font-black text-slate-800 block">خط الطول (Longitude)</label>
                <span class="text-[10px] text-slate-400 font-bold">تحديث تلقائي</span>
              </div>
              <input 
                v-model="settings.longitude" 
                type="text" 
                placeholder="39.172778" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">الدولة</label>
              <input 
                v-model="settings.country" 
                type="text" 
                placeholder="المملكة العربية السعودية" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>

            <div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط تضمين خريطة جوجل (Google Maps Embed URL)</label>
              <input 
                v-model="settings.google_map_embed_url" 
                type="url" 
                placeholder="https://maps.google.com/..." 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 3: الشعارات والوسائط (Logos & Media) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'media'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">3. الشعارات، الأيقونات والوسائط البصرية</h2>
            <p class="text-xs text-slate-500 mt-1">رفع وتحديث كافة الشعارات الرسمية، أيقونة المتصفح، وصورة التحميل مع المعاينة الحية الفورية.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- 1. Desktop Logo -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">شعار الديسكتوب (Header)</span>
                <span class="text-[10px] text-slate-400 font-bold">PNG / SVG</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative group">
                <img 
                  v-if="filePreviews.logo || settings.logo_url" 
                  :src="filePreviews.logo || settings.logo_url" 
                  alt="Desktop Logo" 
                  class="max-h-full max-w-full object-contain"
                />
                <div v-else class="text-slate-300 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span class="text-[10px] font-bold">لا يوجد شعار</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.logo || settings.logo_url ? 'تغيير الشعار' : 'رفع شعار' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="(e: any) => handleFileUpload('logo', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.logo || settings.logo_url" 
                  @click="removeImage('logo')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  title="حذف"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <!-- 2. Mobile Logo -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">شعار الموبايل (Mobile)</span>
                <span class="text-[10px] text-slate-400 font-bold">PNG / SVG</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative">
                <img 
                  v-if="filePreviews.mobile_logo || settings.mobile_logo_url" 
                  :src="filePreviews.mobile_logo || settings.mobile_logo_url" 
                  alt="Mobile Logo" 
                  class="max-h-full max-w-full object-contain"
                />
                <div v-else class="text-slate-300 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  <span class="text-[10px] font-bold">لا يوجد شعار</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.mobile_logo || settings.mobile_logo_url ? 'تغيير' : 'رفع' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="(e: any) => handleFileUpload('mobile_logo', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.mobile_logo || settings.mobile_logo_url" 
                  @click="removeImage('mobile_logo')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <!-- 3. Footer Logo -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">شعار تذييل الصفحة (Footer)</span>
                <span class="text-[10px] text-slate-400 font-bold">PNG / SVG</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-[#0B0E28] border border-slate-800 flex items-center justify-center p-3 overflow-hidden relative">
                <img 
                  v-if="filePreviews.footer_logo || settings.footer_logo_url" 
                  :src="filePreviews.footer_logo || settings.footer_logo_url" 
                  alt="Footer Logo" 
                  class="max-h-full max-w-full object-contain"
                />
                <div v-else class="text-slate-600 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span class="text-[10px] font-bold">شعار الفوتر</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.footer_logo || settings.footer_logo_url ? 'تغيير' : 'رفع' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="(e: any) => handleFileUpload('footer_logo', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.footer_logo || settings.footer_logo_url" 
                  @click="removeImage('footer_logo')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <!-- 4. Invoice Logo -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">شعار الفواتير والطباعة (Invoice)</span>
                <span class="text-[10px] text-slate-400 font-bold">أبيض وأسود / ملون</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative">
                <img 
                  v-if="filePreviews.invoice_logo || settings.invoice_logo_url" 
                  :src="filePreviews.invoice_logo || settings.invoice_logo_url" 
                  alt="Invoice Logo" 
                  class="max-h-full max-w-full object-contain"
                />
                <div v-else class="text-slate-300 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                  <span class="text-[10px] font-bold">شعار الفواتير</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.invoice_logo || settings.invoice_logo_url ? 'تغيير' : 'رفع' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="(e: any) => handleFileUpload('invoice_logo', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.invoice_logo || settings.invoice_logo_url" 
                  @click="removeImage('invoice_logo')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <!-- 5. Favicon Icon -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">أيقونة المتصفح (Favicon)</span>
                <span class="text-[10px] text-slate-400 font-bold">ICO / PNG (32x32)</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative">
                <img 
                  v-if="filePreviews.favicon || settings.favicon_url" 
                  :src="filePreviews.favicon || settings.favicon_url" 
                  alt="Favicon" 
                  class="w-12 h-12 object-contain shadow-2xs rounded-lg"
                />
                <div v-else class="text-slate-300 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  <span class="text-[10px] font-bold">Favicon</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.favicon || settings.favicon_url ? 'تغيير' : 'رفع' }}</span>
                  <input type="file" accept="image/*,.ico" class="hidden" @change="(e: any) => handleFileUpload('favicon', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.favicon || settings.favicon_url" 
                  @click="removeImage('favicon')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

            <!-- 6. Loading GIF / Preloader -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4">
              <div class="w-full flex items-center justify-between">
                <span class="text-xs font-black text-slate-900">متحرك التحميل (Loader GIF)</span>
                <span class="text-[10px] text-slate-400 font-bold">GIF / APNG</span>
              </div>

              <div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative">
                <img 
                  v-if="filePreviews.loader_gif || settings.loader_gif_url" 
                  :src="filePreviews.loader_gif || settings.loader_gif_url" 
                  alt="Loader GIF" 
                  class="max-h-full max-w-full object-contain"
                />
                <div v-else class="text-slate-300 flex flex-col items-center gap-1">
                  <svg class="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                  <span class="text-[10px] font-bold">Loader GIF</span>
                </div>
              </div>

              <div class="flex items-center gap-2 w-full">
                <label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center">
                  <span>{{ filePreviews.loader_gif || settings.loader_gif_url ? 'تغيير' : 'رفع' }}</span>
                  <input type="file" accept="image/gif,image/png,image/*" class="hidden" @change="(e: any) => handleFileUpload('loader_gif', e.target.files?.[0] || null)" />
                </label>
                <button 
                  v-if="filePreviews.loader_gif || settings.loader_gif_url" 
                  @click="removeImage('loader_gif')" 
                  class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 4: هوية الألوان (Branding & Theme Colors) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'colors'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">4. هوية الألوان والسمة العامة (Theme Colors)</h2>
            <p class="text-xs text-slate-500 mt-1">تحديد باليتة الألوان المعتمدة للمتجر الإلكتروني، الأزرار، الترويسة، والتذييل.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Primary Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">اللون الأساسي (Primary Color)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.primary_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.primary_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Secondary Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">اللون الثانوي (Secondary Color)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.secondary_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.secondary_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Accent Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">لون التمييز والأزرار (Accent)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.accent_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.accent_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Background Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">لون خلفية المتجر (Background)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.bg_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.bg_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Header Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">لون شريط الرأس (Header Navbar)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.header_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.header_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Footer Color -->
            <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label class="text-xs font-black text-slate-800 block">لون التذييل (Footer Background)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="settings.footer_color" class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" />
                <input type="text" v-model="settings.footer_color" dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" />
              </div>
            </div>
          </div>

          <!-- Visual Live Store Preview Mockup Card -->
          <div class="mt-6 p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3">
            <span class="text-xs font-black text-slate-700 block">معاينة تفاعلية حية لألوان المتجر:</span>
            <div class="w-full rounded-2xl overflow-hidden shadow-md border border-slate-200" :style="{ backgroundColor: settings.bg_color }">
              <!-- Header mockup -->
              <div class="h-10 px-4 flex items-center justify-between border-b" :style="{ backgroundColor: settings.header_color, borderColor: '#e2e8f0' }">
                <div class="w-16 h-4 rounded" :style="{ backgroundColor: settings.primary_color }"></div>
                <div class="flex items-center gap-2">
                  <div class="w-12 h-2.5 rounded bg-slate-200"></div>
                  <div class="w-12 h-2.5 rounded bg-slate-200"></div>
                </div>
              </div>
              <!-- Body mockup -->
              <div class="p-4 flex items-center gap-4">
                <div class="flex-1 space-y-2">
                  <div class="w-3/4 h-4 rounded font-bold" :style="{ color: settings.primary_color }">عنوان منتج تجريبي</div>
                  <div class="w-1/2 h-2.5 rounded bg-slate-300"></div>
                </div>
                <button class="px-3 py-1.5 rounded-lg text-[11px] font-black text-white" :style="{ backgroundColor: settings.secondary_color, color: settings.primary_color }">
                  إضافة للسلة
                </button>
              </div>
              <!-- Footer mockup -->
              <div class="h-8 px-4 flex items-center justify-between text-[10px] text-white/80" :style="{ backgroundColor: settings.footer_color }">
                <span>أسوار جدة © 2026</span>
                <div class="w-8 h-2 rounded bg-white/20"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 5: القوانين والحقوق (Legal & Copyrights) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'legal'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">5. القوانين، الحقوق وسياسات الخصوصية</h2>
            <p class="text-xs text-slate-500 mt-1">نصوص حقوق الملكية الفكرية، شريط الكوكيز، وروابط الصفحات التنظيمية.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">نص حقوق الملكية (بالعربية)</label>
              <input 
                v-model="settings.copyright_text_ar" 
                type="text" 
                placeholder="جميع الحقوق محفوظة © 2026 لشركة أسوار جدة" 
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">Copyright Notice (English)</label>
              <input 
                v-model="settings.copyright_text_en" 
                type="text" 
                placeholder="All Rights Reserved © 2026 Aswar Jeddah" 
                dir="ltr"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400 transition-all"
              />
            </div>

            <!-- Cookie Bar Toggle -->
            <div class="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">تفعيل إشعار ملفات تعريف الارتباط (Cookie Consent Bar)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">إظهار شريط الموافقة على الكوكيز والخصوصية للزوار الجدد في أسفل الصفحة.</p>
              </div>
              <BaseToggle v-model="settings.cookie_bar_status" />
            </div>

            <div v-if="settings.cookie_bar_status" class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-1">
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">نص رسالة الكوكيز (بالعربية)</label>
                <textarea 
                  v-model="settings.cookie_bar_text_ar" 
                  rows="3"
                  placeholder="نستخدم ملفات تعريف الارتباط لتحسين تجربة التسوق وتقديم أفضل خدمة..."
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                ></textarea>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">Cookie Notice Message (English)</label>
                <textarea 
                  v-model="settings.cookie_bar_text_en" 
                  rows="3"
                  dir="ltr"
                  placeholder="We use cookies to enhance your browsing experience, serve personalized content..."
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all"
                ></textarea>
              </div>
            </div>

            <!-- Legal URLs -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط الشروط والأحكام (Terms)</label>
              <input v-model="settings.terms_url" type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط سياسة الخصوصية (Privacy)</label>
              <input v-model="settings.privacy_url" type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 6: الشحن والتوصيل (Shipping & Delivery) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'shipping'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">6. قواعد الشحن والتوصيل</h2>
            <p class="text-xs text-slate-500 mt-1">تحديد تكاليف التوصيل، حد الشحن المجاني، وأوقات التسليم المتوقعة للطلبات.</p>
          </div>

          <div class="space-y-4">
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">تفعيل نظام الشحن والتوصيل للعملاء</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">في حال التعطيل سيتاح للعملاء الاستلام من الفرع فقط.</p>
              </div>
              <BaseToggle v-model="settings.shipping_enabled" />
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">تفعيل ميزة الشحن المجاني فوق حد محدد</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">منح الشحن المجاني تلقائياً عند تجاوز سلة الشراء للمبلغ المحدد.</p>
              </div>
              <BaseToggle v-model="settings.free_shipping_enabled" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">تكلفة الشحن الافتراضية</label>
                <div class="relative">
                  <input v-model.number="settings.default_shipping_cost" type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" />
                  <span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ر.س</span>
                </div>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">الحد الأدنى للشحن المجاني</label>
                <div class="relative">
                  <input v-model.number="settings.free_shipping_threshold" type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" />
                  <span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ر.س</span>
                </div>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">الوقت التقديري للتوصيل</label>
                <input v-model="settings.estimated_delivery_days" type="text" placeholder="1 - 3 أيام عمل" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 7: المالية والضرائب (Finance & VAT) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'financial'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">7. المالية وضريبة القيمة المضافة (VAT)</h2>
            <p class="text-xs text-slate-500 mt-1">إعدادات هيئة الزكاة والضريبة والجمارك (ZATCA)، نسبة الضريبة، والرقم الضريبي الرسمي.</p>
          </div>

          <div class="space-y-4">
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">تفعيل ضريبة القيمة المضافة (VAT)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">تطبيق النسبة الضريبية النظامية على المنتجات وتكاليف الشحن.</p>
              </div>
              <BaseToggle v-model="settings.vat_enabled" />
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">الأسعار المعروضة في المتجر شاملة الضريبة</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">إذا تم التفعيل، فلن يتم احتساب مبلغ ضريبة إضافي عند الدفع بل سيتم استخراجه من السعر.</p>
              </div>
              <BaseToggle v-model="settings.prices_tax_inclusive" />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">نسبة ضريبة القيمة المضافة (%)</label>
                <div class="relative">
                  <input v-model.number="settings.vat_rate" type="number" min="0" max="100" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" />
                  <span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">%</span>
                </div>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">الرقم الضريبي للمنشأة (Tax Number)</label>
                <input v-model="settings.tax_number" type="text" placeholder="300123456789003" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 8: الطلبات والمخزون (Orders & Inventory) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'orders'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">8. سياسات الطلبات وإدارة المخزون</h2>
            <p class="text-xs text-slate-500 mt-1">التحكم في قيود الشراء، المخزون الصفري، وبادئات الفواتير.</p>
          </div>

          <div class="space-y-4">
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">السماح بالشراء عند نفاد المخزون (Backorders)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">تمكين العملاء من إتمام الطلب مسبقاً حتى لو كان المخزون المتاح 0.</p>
              </div>
              <BaseToggle v-model="settings.backorder_enabled" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">أقل مبلغ لإتمام الطلب (Min Order Amount)</label>
                <div class="relative">
                  <input v-model.number="settings.min_order_amount" type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" />
                  <span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ر.س</span>
                </div>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">الحالة الافتراضية للطلب الجديد</label>
                <select v-model="settings.default_order_status" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400">
                  <option value="pending">قيد الانتظار (Pending)</option>
                  <option value="confirmed">مؤكد (Confirmed)</option>
                  <option value="processing">جاري التجهيز (Processing)</option>
                </select>
              </div>

              <div class="space-y-1.5 text-start">
                <label class="text-xs font-black text-slate-800 block">بادئة رقم الفاتورة (Invoice Prefix)</label>
                <input v-model="settings.invoice_prefix" type="text" placeholder="ASW-" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-400" />
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 9: بوابات الدفع (Payment Gateways) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'payments'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">9. بوابات وطرق الدفع الإلكتروني</h2>
            <p class="text-xs text-slate-500 mt-1">تفعيل الدفع عند الاستلام، البطاقات الائتمانية، وخدمات التقسيط (تابي وتمارا).</p>
          </div>

          <div class="space-y-4">
            <!-- COD -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">الدفع عند الاستلام (Cash On Delivery - COD)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">السماح للعميل بالدفع نقداً أو عبر جهاز الشبكة عند وصول المندوب.</p>
              </div>
              <BaseToggle v-model="settings.cod_enabled" />
            </div>

            <!-- Online Payment Gateway -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">الدفع الإلكتروني عبر البطاقات (مدى، فيزا، ماستركارد، Apple Pay)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">تفعيل معالجة المدفوعات الفورية عبر بوابة Paymob / Moyasar.</p>
              </div>
              <BaseToggle v-model="settings.online_payment_enabled" />
            </div>

            <!-- Installments -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span class="text-xs font-black text-slate-800">تفعيل خيار تابي (Tabby) للتقسيط</span>
                <BaseToggle v-model="settings.tabby_enabled" />
              </div>
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <span class="text-xs font-black text-slate-800">تفعيل خيار تمارا (Tamara) للتقسيط</span>
                <BaseToggle v-model="settings.tamara_enabled" />
              </div>
            </div>

            <!-- Gateway Keys Config Card -->
            <div v-if="settings.online_payment_enabled" class="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4">
              <div class="flex items-center justify-between">
                <h4 class="text-xs font-black text-indigo-900">بيانات الربط مع بوابة الدفع (Paymob Credentials)</h4>
                <div class="flex items-center gap-2">
                  <span class="text-[11px] font-bold text-slate-500">وضع التشغيل:</span>
                  <select v-model="settings.payment_mode" class="bg-white border border-indigo-200 rounded-lg px-2.5 py-1 text-xs font-black text-indigo-900">
                    <option value="sandbox">تجريبي (Sandbox / Test)</option>
                    <option value="live">مباشر حقيقي (Live / Production)</option>
                  </select>
                </div>
              </div>

              <div class="space-y-3">
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-indigo-950 block">Paymob API Key / Secret Key</label>
                  <input 
                    v-model="settings.paymob_api_key" 
                    type="password" 
                    name="paymob_secret_key"
                    autocomplete="new-password"
                    placeholder="sec_..." 
                    dir="ltr" 
                    class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-indigo-400" 
                  />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div class="space-y-1 text-start">
                    <label class="text-[11px] font-black text-indigo-950 block">Integration ID</label>
                    <input v-model="settings.paymob_integration_id" type="text" placeholder="123456" dir="ltr" class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
                  </div>
                  <div class="space-y-1 text-start">
                    <label class="text-[11px] font-black text-indigo-950 block">Iframe ID</label>
                    <input v-model="settings.paymob_iframe_id" type="text" placeholder="123456" dir="ltr" class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 10: التواصل الاجتماعي والتتبع (Social & Pixels) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'social'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">10. منصات التواصل وأكواد التتبع والتحليلات</h2>
            <p class="text-xs text-slate-500 mt-1">ربط حسابات السوشيال ميديا، المحادثة الفورية، وأكواد Google Analytics و Facebook Pixel.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- WhatsApp -->
            <div class="space-y-3 text-start md:col-span-2 lg:col-span-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-black text-slate-900">تفعيل المحادثة الفورية عبر الواتساب (WhatsApp Chat Widget)</h4>
                  <p class="text-[11px] text-slate-500 mt-0.5">إظهار أيقونة الدردشة المباشرة مع العملاء في واجهة المتجر.</p>
                </div>
                <BaseToggle v-model="settings.whatsapp_chat_enabled" />
              </div>
              <div class="space-y-1.5 pt-1">
                <label class="text-xs font-black text-slate-800 block">رقم الواتساب للمحادثة المباشرة</label>
                <input v-model="settings.whatsapp_number" type="text" placeholder="+966559876543" dir="ltr" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold" />
              </div>
            </div>

            <!-- Social Links -->
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط صفحة إنستغرام (Instagram)</label>
              <input v-model="settings.instagram_url" type="url" placeholder="https://instagram.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط منصة إكس / تويتر (X / Twitter)</label>
              <input v-model="settings.twitter_url" type="url" placeholder="https://x.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط تيك توك (TikTok)</label>
              <input v-model="settings.tiktok_url" type="url" placeholder="https://tiktok.com/@..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط سناب شات (Snapchat)</label>
              <input v-model="settings.snapchat_url" type="url" placeholder="https://snapchat.com/add/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط فيسبوك (Facebook)</label>
              <input v-model="settings.facebook_url" type="url" placeholder="https://facebook.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رابط قناة يوتيوب (YouTube)</label>
              <input v-model="settings.youtube_url" type="url" placeholder="https://youtube.com/@..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" />
            </div>

            <!-- App Store Download Links -->
            <div class="md:col-span-2 lg:col-span-3 border-t border-slate-100 pt-4">
              <h4 class="text-xs font-black text-slate-900 mb-1">روابط تحميل تطبيق الجوال (Mobile App Links)</h4>
              <p class="text-[11px] text-slate-500 mb-4">عرض أزرار تحميل تطبيق المتجر في التذييل وصفحات الهبوط.</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-slate-700 block">رابط متجر آبل (Apple App Store)</label>
                  <input v-model="settings.download_app_apple_store" type="url" placeholder="https://apps.apple.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" />
                </div>
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-slate-700 block">رابط متجر جوجل (Google Play Store)</label>
                  <input v-model="settings.download_app_google_store" type="url" placeholder="https://play.google.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" />
                </div>
              </div>
            </div>

            <!-- Tracking Pixels Header -->
            <div class="md:col-span-2 lg:col-span-3 border-t border-slate-100 pt-4">
              <h4 class="text-xs font-black text-slate-900 mb-1">أكواد التتبع والبيكسل الإعلاني (Tracking & Pixels)</h4>
              <p class="text-[11px] text-slate-500 mb-4">يتم حقن هذه المعرفات تلقائياً في صفحات المتجر لقياس التحويلات والمبيعات.</p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-slate-700 block">Google Analytics (G-XXXXX)</label>
                  <input v-model="settings.ga_tracking_id" type="text" placeholder="G-ABC123456" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" />
                </div>
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-slate-700 block">Meta Facebook Pixel ID</label>
                  <input v-model="settings.fb_pixel_id" type="text" placeholder="123456789012345" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" />
                </div>
                <div class="space-y-1 text-start">
                  <label class="text-[11px] font-black text-slate-700 block">TikTok Pixel ID</label>
                  <input v-model="settings.tiktok_pixel_id" type="text" placeholder="CXXXXX..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- ======================================================== -->
        <!-- SECTION 11: إدارة المتجر والصيانة (Maintenance Mode) -->
        <!-- ======================================================== -->
        <div v-show="activeSection === 'maintenance'" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200">
          <div class="border-b border-slate-100 pb-4">
            <h2 class="text-lg font-black text-slate-900">11. حالة الصيانة والإيقاف المؤقت (Maintenance Mode)</h2>
            <p class="text-xs text-slate-500 mt-1">إيقاف ظهور المنتجات مؤقتاً للزوار وتوجيههم لصفحة الصيانة أثناء التحديثات أو الجرد.</p>
          </div>

          <div class="space-y-4">
            <div class="p-5 rounded-2xl border transition-all"
              :class="settings.maintenance_mode ? 'bg-rose-50 border-rose-200' : 'bg-slate-50 border-slate-200/80'">
              <div class="flex items-center justify-between">
                <div>
                  <h4 class="text-xs font-black" :class="settings.maintenance_mode ? 'text-rose-900' : 'text-slate-900'">
                    تفعيل وضع الصيانة العام (Enable Maintenance Mode)
                  </h4>
                  <p class="text-[11px] mt-0.5" :class="settings.maintenance_mode ? 'text-rose-600' : 'text-slate-500'">
                    {{ settings.maintenance_mode ? 'المتجر متوقف حالياً عن استقبال الطلبات للزوار وتظهر صفحة الصيانة.' : 'المتجر متاح ونشط للزوار والعملاء.' }}
                  </p>
                </div>
                <BaseToggle v-model="settings.maintenance_mode" />
              </div>
            </div>

            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
              <div>
                <h4 class="text-xs font-black text-slate-900">السماح لمدراء المتجر بتجاوز الصيانة (Allow Admin Bypass)</h4>
                <p class="text-[11px] text-slate-500 mt-0.5">تمكين المشرفين والمدراء من تصفح المتجر وإجراء الاختبارات حتى أثناء تفعيل الصيانة.</p>
              </div>
              <BaseToggle v-model="settings.allow_admin_bypass" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">عنوان صفحة الصيانة (بالعربية)</label>
              <input v-model="settings.maintenance_title_ar" type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">Maintenance Title (English)</label>
              <input v-model="settings.maintenance_title_en" type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400" />
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">رسالة وتفاصيل الصيانة للعملاء (عربي)</label>
              <textarea v-model="settings.maintenance_message_ar" rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 leading-relaxed"></textarea>
            </div>

            <div class="space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">Maintenance Message (English)</label>
              <textarea v-model="settings.maintenance_message_en" rows="3" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 leading-relaxed"></textarea>
            </div>

            <div class="md:col-span-2 space-y-1.5 text-start">
              <label class="text-xs font-black text-slate-800 block">الوقت والتاريخ المتوقع للعودة للعمل (Maintenance End At)</label>
              <input v-model="settings.expected_back_date" type="datetime-local" class="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer" />
            </div>
          </div>
        </div>

      </template>
    </div>

    <!-- 4. BOTTOM FLOATING BAR ON MOBILE -->
    <div class="fixed bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 sm:hidden flex items-center justify-between gap-3 shadow-2xl">
      <span v-if="hasUnsavedChanges" class="text-[11px] font-black text-amber-700">⚠️ تغييرات غير محفوظة</span>
      <span v-else class="text-[11px] font-bold text-slate-400">كافة الإعدادات محفوظة</span>

      <button 
        @click="handleSave"
        :disabled="isSaving || isLoading"
        class="flex-1 py-3 bg-[#0B0E28] text-amber-400 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
      >
        <span v-if="isSaving" class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></span>
        <span>{{ isSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات' }}</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import InteractiveMapPicker from '~/components/dashboard/InteractiveMapPicker.vue'
import { useAdminSettings } from '~/composables/useAdminSettings'
import { useAdminPermissions } from '~/composables/useAdminPermissions'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إعدادات النظام والمتجر الشاملة | أسوار جدة'
})

const { canAccessRoute } = useAdminPermissions()

const {
  settings,
  filePreviews,
  isLoading,
  isSaving,
  hasUnsavedChanges,
  errorMessage,
  fetchSettings,
  handleFileUpload,
  removeImage,
  saveSettings
} = useAdminSettings()

const activeSection = ref<string>('general')
const tabsContainerRef = ref<HTMLElement | null>(null)

const sections = [
  { id: 'general', title: '1. الإعدادات العامة', badge: 'أساسي', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>' },
  { id: 'location', title: '2. العناوين والموقع', badge: 'Maps', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>' },
  { id: 'media', title: '3. الشعارات والوسائط', badge: '6 صور', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>' },
  { id: 'colors', title: '4. هوية الألوان والسمة', badge: 'Branding', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" /><path stroke-linecap="round" stroke-linejoin="round" d="M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7" /></svg>' },
  { id: 'legal', title: '5. القوانين والحقوق', badge: 'SEO', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>' },
  { id: 'shipping', title: '6. الشحن والتوصيل', badge: 'Delivery', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>' },
  { id: 'financial', title: '7. المالية والضرائب', badge: 'VAT 15%', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>' },
  { id: 'orders', title: '8. الطلبات والمخزون', badge: 'Stock', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>' },
  { id: 'payments', title: '9. بوابات الدفع', badge: 'Mada/Visa', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>' },
  { id: 'social', title: '10. التواصل والبيكسل', badge: 'Analytics', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>' },
  { id: 'maintenance', title: '11. الصيانة والتعطيل', badge: 'Live/Off', icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>' }
]

onMounted(async () => {
  await fetchSettings()
})

const handleSave = async () => {
  await saveSettings()
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
