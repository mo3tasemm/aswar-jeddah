<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-24" :dir="adminDir">
    
    <!-- 1. UNIFIED PAGE HEADER -->
    <AdminPageHeader
      title="إدارة صفحة من نحن (About Us Manager)"
      subtitle="تعديل كافة نصوص الصفحة، القصة، الرؤية والرسالة، مميزات وقيم المتجر (Values)، الإحصائيات وبانر التسوق."
      icon="fa-solid fa-address-card"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'إدارة صفحة من نحن' }
      ]"
      :show-lang-tabs="true"
      v-model:lang-tab="activeLangTab"
      :show-save="true"
      :is-saving="isSubmitting"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminAboutUs"
    >
      <template #actions>
        <NuxtLink 
          to="/about-us" 
          target="_blank"
          class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
        >
          <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"></i>
          <span class="hidden sm:inline">معاينة بالمتجر</span>
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <!-- 2. SKELETON LOADING STATE -->
    <AdminSkeletonForm v-if="isLoading" :cards="3" />

    <div v-else class="space-y-6">

      <!-- 3. MAIN FORM BODY -->
      <form @submit.prevent="submitAdminAboutUs" class="space-y-6">

        <!-- SECTION 1: HERO & MAIN HEADER -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="fa-solid fa-heading text-amber-500"></i>
            الهيدر والعنوان الرئيسي (Hero Header)
          </h3>

          <!-- Arabic Fields -->
          <div v-show="activeLangTab === 'ar'" class="space-y-4">
            <BaseInput 
              v-model="form.title_ar" 
              label="العنوان الرئيسي باللغة العربية *" 
              placeholder="مثال: عن أسوار جدة" 
              required 
            />
            <BaseInput 
              v-model="form.subtitle_ar" 
              label="النبذة التعريفية المختصرة (Arabic Subtitle) *" 
              placeholder="مثال: وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة" 
              required 
            />
          </div>

          <!-- English Fields -->
          <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
            <BaseInput 
              v-model="form.title_en" 
              label="Main Title in English" 
              placeholder="e.g. About Aswar Jeddah" 
              dir="ltr" 
            />
            <BaseInput 
              v-model="form.subtitle_en" 
              label="Short Subtitle in English" 
              placeholder="e.g. Your leading destination for smart tech and home solutions in KSA" 
              dir="ltr" 
            />
          </div>

          <!-- Hero Banner Image Upload & Live Preview -->
          <div class="space-y-2 pt-2 border-t border-slate-100">
            <label class="block text-xs font-bold text-slate-700">صورة غلاف الهيدر (Hero Banner Image)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <!-- Upload Box -->
              <label class="border-2 border-dashed border-slate-300 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                <i class="fa-solid fa-cloud-arrow-up text-2xl text-slate-400"></i>
                <span class="text-xs font-bold text-slate-700">اضغط لرفع أو تغيير صورة الغلاف</span>
                <span class="text-[10px] text-slate-400">PNG, JPG, WEBP حتى 5MB (الأبعاد المفضلة 1920x600)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  class="hidden" 
                  @change="onBannerFilePick($event)"
                />
              </label>

              <!-- Live Preview Box -->
              <div class="h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center group">
                <img 
                  v-if="bannerPreview || form.banner_image_full_url || form.banner_image" 
                  :src="bannerPreview || form.banner_image_full_url || form.banner_image" 
                  alt="Banner Preview" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex flex-col items-center justify-center text-slate-400 gap-1">
                  <i class="fa-solid fa-image text-2xl"></i>
                  <span class="text-xs font-medium">لا توجد صورة غلاف مرفوعة</span>
                </div>

                <div v-if="bannerPreview || form.banner_image_full_url || form.banner_image" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a :href="bannerPreview || form.banner_image_full_url || form.banner_image" target="_blank" class="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-bold text-slate-800 hover:bg-white flex items-center gap-1 shadow-sm">
                    <i class="fa-solid fa-eye text-xs"></i>
                    <span>عرض بالحجم الكامل</span>
                  </a>
                  <button type="button" @click="clearBannerImage" class="px-3 py-1.5 rounded-lg bg-rose-500 text-xs font-bold text-white hover:bg-rose-600 flex items-center gap-1 shadow-sm">
                    <i class="fa-solid fa-trash text-xs"></i>
                    <span>إزالة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 2: OUR STORY & RICH TEXT -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="fa-solid fa-book-open text-indigo-500"></i>
            قصة المتجر والشغف (Our Story & Rich Content)
          </h3>

          <!-- Arabic Story Fields -->
          <div v-show="activeLangTab === 'ar'" class="space-y-4">
            <BaseInput 
              v-model="form.story_title_ar" 
              label="عنوان قسم القصة (بالعربي) *" 
              placeholder="مثال: قصة نجاحنا وشغفنا" 
              required 
            />

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">محتوى القصة المنسق (Arabic Rich Text) *</label>
              <RichTextEditor 
                v-model="form.story_content_ar"
                label="محتوى القصة"
                dir="rtl"
                placeholder="اكتب قصة وتاريخ متجر أسوار جدة..."
              />
            </div>
          </div>

          <!-- English Story Fields -->
          <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
            <BaseInput 
              v-model="form.story_title_en" 
              label="Story Section Title (English)" 
              placeholder="e.g. Our Story & Passion" 
              dir="ltr" 
            />

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1.5">Story Content (English Rich Text)</label>
              <RichTextEditor 
                v-model="form.story_content_en"
                label="Story Content"
                dir="ltr"
                placeholder="Write the formatted story of Aswar Jeddah..."
              />
            </div>
          </div>

          <!-- Story Image Upload & Live Preview -->
          <div class="space-y-2 pt-2 border-t border-slate-100">
            <label class="block text-xs font-bold text-slate-700">صورة قسم القصة (Story Feature Image)</label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <!-- Upload Box -->
              <label class="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all">
                <i class="fa-solid fa-image text-2xl text-slate-400"></i>
                <span class="text-xs font-bold text-slate-700">اضغط لرفع أو تغيير صورة القصة</span>
                <span class="text-[10px] text-slate-400">PNG, JPG, WEBP (يفضل مربعة أو 800x800)</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  class="hidden" 
                  @change="onStoryFilePick($event)"
                />
              </label>

              <!-- Live Preview Box -->
              <div class="h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center group">
                <img 
                  v-if="storyPreview || form.story_image_full_url || form.story_image" 
                  :src="storyPreview || form.story_image_full_url || form.story_image" 
                  alt="Story Preview" 
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex flex-col items-center justify-center text-slate-400 gap-1">
                  <i class="fa-solid fa-image text-2xl"></i>
                  <span class="text-xs font-medium">لا توجد صورة قصة مرفوعة</span>
                </div>

                <div v-if="storyPreview || form.story_image_full_url || form.story_image" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a :href="storyPreview || form.story_image_full_url || form.story_image" target="_blank" class="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-bold text-slate-800 hover:bg-white flex items-center gap-1 shadow-sm">
                    <i class="fa-solid fa-eye text-xs"></i>
                    <span>عرض بالحجم الكامل</span>
                  </a>
                  <button type="button" @click="clearStoryImage" class="px-3 py-1.5 rounded-lg bg-rose-500 text-xs font-bold text-white hover:bg-rose-600 flex items-center gap-1 shadow-sm">
                    <i class="fa-solid fa-trash text-xs"></i>
                    <span>إزالة</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 3: VISION & MISSION -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="fa-solid fa-compass text-purple-500"></i>
            الرؤية والرسالة (Vision & Mission)
          </h3>

          <!-- Arabic Vision & Mission -->
          <div v-show="activeLangTab === 'ar'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Vision -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 class="text-sm font-black text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-eye text-amber-500"></i>
                الرؤية (Vision)
              </h4>
              <BaseInput 
                v-model="form.vision_title_ar" 
                label="عنوان الرؤية" 
                placeholder="مثال: رؤيتنا" 
              />
              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-700">نص الرؤية</label>
                <textarea 
                  v-model="form.vision_content_ar"
                  rows="3" 
                  class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="اكتب نص رؤية المتجر..."
                ></textarea>
              </div>
            </div>

            <!-- Mission -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 class="text-sm font-black text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-bullseye text-indigo-500"></i>
                الرسالة (Mission)
              </h4>
              <BaseInput 
                v-model="form.mission_title_ar" 
                label="عنوان الرسالة" 
                placeholder="مثال: رسالتنا" 
              />
              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-700">نص الرسالة</label>
                <textarea 
                  v-model="form.mission_content_ar"
                  rows="3" 
                  class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="اكتب نص رسالة المتجر..."
                ></textarea>
              </div>
            </div>
          </div>

          <!-- English Vision & Mission -->
          <div v-show="activeLangTab === 'en'" class="grid grid-cols-1 md:grid-cols-2 gap-6" dir="ltr">
            <!-- Vision -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 class="text-sm font-black text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-eye text-amber-500"></i>
                Vision (English)
              </h4>
              <BaseInput 
                v-model="form.vision_title_en" 
                label="Vision Title" 
                placeholder="e.g. Our Vision" 
                dir="ltr" 
              />
              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-700">Vision Statement</label>
                <textarea 
                  v-model="form.vision_content_en"
                  rows="3" 
                  class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Write your vision statement..."
                  dir="ltr"
                ></textarea>
              </div>
            </div>

            <!-- Mission -->
            <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h4 class="text-sm font-black text-slate-800 flex items-center gap-2">
                <i class="fa-solid fa-bullseye text-indigo-500"></i>
                Mission (English)
              </h4>
              <BaseInput 
                v-model="form.mission_title_en" 
                label="Mission Title" 
                placeholder="e.g. Our Mission" 
                dir="ltr" 
              />
              <div class="space-y-1">
                <label class="block text-xs font-bold text-slate-700">Mission Statement</label>
                <textarea 
                  v-model="form.mission_content_en"
                  rows="3" 
                  class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Write your mission statement..."
                  dir="ltr"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- SECTION 4: STATS COUNTERS (100% Dynamic Cards) -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div class="border-b border-slate-100 pb-3">
            <h3 class="text-base font-black text-slate-900 flex items-center gap-2">
              <i class="fa-solid fa-chart-simple text-emerald-500"></i>
              أرقام وإحصائيات المتجر (Elevated Stats Counters)
            </h3>
            <p class="text-xs text-slate-500 mt-1">تخصيص الأرقام، العناوين باللغتين، والأيقونات للبطاقات الإحصائية الأربع المعروضة أسفل الهيدر.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <!-- Stat 1: Customers -->
            <div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-amber-700">الإحصائية الأولى #1</span>
                <i class="fa-solid fa-users text-amber-500"></i>
              </div>
              <BaseInput 
                v-model="form.stats_customers" 
                label="الرقم / القيمة *" 
                placeholder="25,000+" 
                dir="ltr" 
              />
              <BaseInput 
                v-if="activeLangTab === 'ar'"
                v-model="form.stats_customers_label_ar" 
                label="العنوان (عربي)" 
                placeholder="عميل سعيد وموثوق" 
              />
              <BaseInput 
                v-else
                v-model="form.stats_customers_label_en" 
                label="Label (English)" 
                placeholder="Satisfied Customers" 
                dir="ltr" 
              />
              <BaseInput 
                v-model="form.stats_customers_icon" 
                label="كود الأيقونة" 
                placeholder="fa-solid fa-users" 
                dir="ltr" 
              />
            </div>

            <!-- Stat 2: Products -->
            <div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-indigo-700">الإحصائية الثانية #2</span>
                <i class="fa-solid fa-boxes-stacked text-indigo-500"></i>
              </div>
              <BaseInput 
                v-model="form.stats_products" 
                label="الرقم / القيمة *" 
                placeholder="1,500+" 
                dir="ltr" 
              />
              <BaseInput 
                v-if="activeLangTab === 'ar'"
                v-model="form.stats_products_label_ar" 
                label="العنوان (عربي)" 
                placeholder="منتج أصلي معتمد" 
              />
              <BaseInput 
                v-else
                v-model="form.stats_products_label_en" 
                label="Label (English)" 
                placeholder="Certified Products" 
                dir="ltr" 
              />
              <BaseInput 
                v-model="form.stats_products_icon" 
                label="كود الأيقونة" 
                placeholder="fa-solid fa-boxes-stacked" 
                dir="ltr" 
              />
            </div>

            <!-- Stat 3: Experience -->
            <div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-purple-700">الإحصائية الثالثة #3</span>
                <i class="fa-solid fa-award text-purple-500"></i>
              </div>
              <BaseInput 
                v-model="form.stats_experience" 
                label="الرقم / القيمة *" 
                placeholder="10+" 
                dir="ltr" 
              />
              <BaseInput 
                v-if="activeLangTab === 'ar'"
                v-model="form.stats_experience_label_ar" 
                label="العنوان (عربي)" 
                placeholder="سنوات من الخبرة" 
              />
              <BaseInput 
                v-else
                v-model="form.stats_experience_label_en" 
                label="Label (English)" 
                placeholder="Years of Experience" 
                dir="ltr" 
              />
              <BaseInput 
                v-model="form.stats_experience_icon" 
                label="كود الأيقونة" 
                placeholder="fa-solid fa-award" 
                dir="ltr" 
              />
            </div>

            <!-- Stat 4: Guarantee -->
            <div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-black text-emerald-700">الإحصائية الرابعة #4</span>
                <i class="fa-solid fa-shield text-emerald-500"></i>
              </div>
              <BaseInput 
                v-model="form.stats_awards" 
                label="الرقم / القيمة *" 
                placeholder="100%" 
                dir="ltr" 
              />
              <BaseInput 
                v-if="activeLangTab === 'ar'"
                v-model="form.stats_awards_label_ar" 
                label="العنوان (عربي)" 
                placeholder="ضمان وجودة معتمدة" 
              />
              <BaseInput 
                v-else
                v-model="form.stats_awards_label_en" 
                label="Label (English)" 
                placeholder="Warranty & Quality" 
                dir="ltr" 
              />
              <BaseInput 
                v-model="form.stats_awards_icon" 
                label="كود الأيقونة" 
                placeholder="fa-solid fa-shield" 
                dir="ltr" 
              />
            </div>

          </div>
        </div>

        <!-- SECTION 5: STORE COMMITMENTS / VALUES -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="fa-solid fa-star text-amber-500"></i>
            التزامات وقيم المتجر (Store Commitments & Values)
          </h3>

          <!-- Main Section Header -->
          <div v-show="activeLangTab === 'ar'" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput 
              v-model="form.features_badge_ar" 
              label="شارة القسم (بالعربي)" 
              placeholder="مثال: التزاماتنا لعملائنا" 
            />
            <BaseInput 
              v-model="form.features_title_ar" 
              label="عنوان القسم الرئيسي (بالعربي)" 
              placeholder="مثال: لماذا يفضل العملاء التسوق معنا؟" 
            />
          </div>

          <div v-show="activeLangTab === 'en'" class="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr">
            <BaseInput 
              v-model="form.features_badge_en" 
              label="Section Badge (English)" 
              placeholder="e.g. Store Commitments" 
              dir="ltr" 
            />
            <BaseInput 
              v-model="form.features_title_en" 
              label="Section Title (English)" 
              placeholder="e.g. Why Shop With Aswar Jeddah?" 
              dir="ltr" 
            />
          </div>

          <!-- 4 Feature Cards / Values Editor -->
          <div class="space-y-4 pt-2">
            <h4 class="text-xs font-black text-slate-700">البطاقات الأربع للمميزات والقيم (Values):</h4>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              <!-- Feature 1 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-amber-600">الميزة الأولى #1</span>
                  <input 
                    type="text" 
                    v-model="form.feature_1_icon" 
                    placeholder="fa-solid fa-shield" 
                    class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                    dir="ltr"
                    title="FontAwesome Icon Class"
                  />
                </div>
                <div v-show="activeLangTab === 'ar'" class="space-y-2">
                  <BaseInput v-model="form.feature_1_title_ar" label="العنوان (بالعربي)" placeholder="مثال: منتجات أصلية 100%" />
                  <BaseInput v-model="form.feature_1_desc_ar" label="الوصف المختصر (بالعربي)" placeholder="مثال: نوفر كافة الأجهزة مباشرة من الوكلاء..." />
                </div>
                <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
                  <BaseInput v-model="form.feature_1_title_en" label="Title (English)" placeholder="e.g. 100% Genuine Products" dir="ltr" />
                  <BaseInput v-model="form.feature_1_desc_en" label="Description (English)" placeholder="e.g. Direct from certified brands..." dir="ltr" />
                </div>
              </div>

              <!-- Feature 2 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-amber-600">الميزة الثانية #2</span>
                  <input 
                    type="text" 
                    v-model="form.feature_2_icon" 
                    placeholder="fa-solid fa-truck-fast" 
                    class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                    dir="ltr"
                    title="FontAwesome Icon Class"
                  />
                </div>
                <div v-show="activeLangTab === 'ar'" class="space-y-2">
                  <BaseInput v-model="form.feature_2_title_ar" label="العنوان (بالعربي)" placeholder="مثال: شحن سريع وآمن" />
                  <BaseInput v-model="form.feature_2_desc_ar" label="الوصف المختصر (بالعربي)" placeholder="مثال: توصيل موثوق ومحمي لكافة مدن ومناطق المملكة" />
                </div>
                <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
                  <BaseInput v-model="form.feature_2_title_en" label="Title (English)" placeholder="e.g. Fast Kingdom Shipping" dir="ltr" />
                  <BaseInput v-model="form.feature_2_desc_en" label="Description (English)" placeholder="e.g. Reliable door-to-door delivery..." dir="ltr" />
                </div>
              </div>

              <!-- Feature 3 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-amber-600">الميزة الثالثة #3</span>
                  <input 
                    type="text" 
                    v-model="form.feature_3_icon" 
                    placeholder="fa-solid fa-credit-card" 
                    class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                    dir="ltr"
                    title="FontAwesome Icon Class"
                  />
                </div>
                <div v-show="activeLangTab === 'ar'" class="space-y-2">
                  <BaseInput v-model="form.feature_3_title_ar" label="العنوان (بالعربي)" placeholder="مثال: طرق دفع متعددة وآمنة" />
                  <BaseInput v-model="form.feature_3_desc_ar" label="الوصف المختصر (بالعربي)" placeholder="مثال: مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط" />
                </div>
                <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
                  <BaseInput v-model="form.feature_3_title_en" label="Title (English)" placeholder="e.g. Secure Payment Options" dir="ltr" />
                  <BaseInput v-model="form.feature_3_desc_en" label="Description (English)" placeholder="e.g. Support for Mada, Apple Pay, Visa..." dir="ltr" />
                </div>
              </div>

              <!-- Feature 4 -->
              <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-black text-amber-600">الميزة الرابعة #4</span>
                  <input 
                    type="text" 
                    v-model="form.feature_4_icon" 
                    placeholder="fa-solid fa-headset" 
                    class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                    dir="ltr"
                    title="FontAwesome Icon Class"
                  />
                </div>
                <div v-show="activeLangTab === 'ar'" class="space-y-2">
                  <BaseInput v-model="form.feature_4_title_ar" label="العنوان (بالعربي)" placeholder="مثال: خدمة عملاء متخصصة" />
                  <BaseInput v-model="form.feature_4_desc_ar" label="الوصف المختصر (بالعربي)" placeholder="مثال: فريق متكامل للإجابة على استفساراتكم..." />
                </div>
                <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
                  <BaseInput v-model="form.feature_4_title_en" label="Title (English)" placeholder="e.g. Dedicated Support" dir="ltr" />
                  <BaseInput v-model="form.feature_4_desc_en" label="Description (English)" placeholder="e.g. Our technical support team is ready to assist..." dir="ltr" />
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- SECTION 6: CTA SHOP BANNER -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <i class="fa-solid fa-bag-shopping text-emerald-500"></i>
            بانر الدعوة للتسوق أسفل الصفحة (CTA Banner)
          </h3>

          <!-- Arabic CTA Fields -->
          <div v-show="activeLangTab === 'ar'" class="space-y-4">
            <BaseInput 
              v-model="form.cta_title_ar" 
              label="عنوان البانر (بالعربي)" 
              placeholder="مثال: اكتشف آلاف الأجهزة والحلول التقنية المعتمدة" 
            />
            <BaseInput 
              v-model="form.cta_desc_ar" 
              label="وصف البانر (بالعربي)" 
              placeholder="مثال: تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة." 
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseInput 
                v-model="form.cta_btn_ar" 
                label="نص زر التسوق (بالعربي)" 
                placeholder="مثال: تسوق المنتجات الآن" 
              />
              <BaseInput 
                v-model="form.cta_url" 
                label="الرابط المستهدف (URL)" 
                placeholder="/shop" 
                dir="ltr" 
              />
            </div>
          </div>

          <!-- English CTA Fields -->
          <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
            <BaseInput 
              v-model="form.cta_title_en" 
              label="Banner Title (English)" 
              placeholder="e.g. Discover Thousands of Verified Products" 
              dir="ltr" 
            />
            <BaseInput 
              v-model="form.cta_desc_en" 
              label="Banner Description (English)" 
              placeholder="e.g. Shop with complete peace of mind with our official warranties." 
              dir="ltr" 
            />
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <BaseInput 
                v-model="form.cta_btn_en" 
                label="Button Text (English)" 
                placeholder="e.g. Browse All Products" 
                dir="ltr" 
              />
              <BaseInput 
                v-model="form.cta_url" 
                label="Target Link (URL)" 
                placeholder="/shop" 
                dir="ltr" 
              />
            </div>
          </div>
        </div>

      </form>
    </div>

    <!-- 4. STICKY BOTTOM SAVE ACTION BAR -->
    <AdminSaveBar
      :is-saving="isSubmitting"
      :show-status="false"
      preview-url="/about-us"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminAboutUs"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminPageHeader from '~/components/dashboard/ui/AdminPageHeader.vue'
import AdminSkeletonForm from '~/components/dashboard/ui/AdminSkeletonForm.vue'
import AdminSaveBar from '~/components/dashboard/ui/AdminSaveBar.vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import RichTextEditor from '~/components/dashboard/ui/RichTextEditor.vue'
import { useAboutUs } from '~/composables/useAboutUs'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { adminDir } = useAdminLanguage()
const {
  form,
  isLoading,
  isSubmitting,
  bannerPreview,
  storyPreview,
  fetchAdminAboutUs,
  submitAdminAboutUs,
  handleBannerFileChange,
  handleStoryFileChange
} = useAboutUs()

const activeLangTab = ref<'ar' | 'en'>('ar')

useHead({
  title: 'إدارة صفحة "من نحن" | لوحة تحكم أسوار جدة'
})

onMounted(() => {
  fetchAdminAboutUs()
})

const onBannerFilePick = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    handleBannerFileChange(target.files[0])
  }
}

const clearBannerImage = () => {
  handleBannerFileChange(null)
  bannerPreview.value = ''
  form.banner_image = ''
  form.banner_image_full_url = ''
}

const onStoryFilePick = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    handleStoryFileChange(target.files[0])
  }
}

const clearStoryImage = () => {
  handleStoryFileChange(null)
  storyPreview.value = ''
  form.story_image = ''
  form.story_image_full_url = ''
}
</script>
