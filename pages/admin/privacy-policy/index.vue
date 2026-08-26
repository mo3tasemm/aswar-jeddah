<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-24" :dir="adminDir">
    
    <!-- 1. UNIFIED PAGE HEADER -->
    <AdminPageHeader
      title="إدارة سياسة الخصوصية والشروط والأحكام"
      subtitle="إدارة وتخصيص كافة بنود وسياسات الخصوصية والأمان وحقوق المستخدم باللغتين العربية والإنجليزية."
      icon="fa-solid fa-user-shield"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'سياسة الخصوصية والشروط' }
      ]"
      :show-lang-tabs="true"
      v-model:lang-tab="activeLangTab"
      :show-save="true"
      :is-saving="isSubmitting"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminPrivacyPolicy"
    >
      <template #actions>
        <NuxtLink 
          to="/privacy-policy" 
          target="_blank" 
          class="px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
        >
          <i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"></i>
          <span class="hidden sm:inline">معاينة بالمتجر</span>
        </NuxtLink>
      </template>
    </AdminPageHeader>

    <!-- 2. SKELETON LOADING -->
    <AdminSkeletonForm v-if="isLoading" :cards="4" />

    <!-- 3. MAIN FORM BODY -->
    <div v-else class="space-y-6">

      <!-- SECTION 1: STATUS & MAIN TITLES -->
      <AdminCard
        title="الحالة والعناوين التمهيدية"
        subtitle="التحكم في ظهور صفحة الخصوصية للمستخدمين وصياغة العناوين المعروضة في أعلى الصفحة."
        icon="fa-solid fa-sliders"
        icon-color="text-amber-500"
      >
        <template #header-actions>
          <div class="flex items-center gap-3 bg-slate-50 p-2 sm:px-3.5 rounded-2xl border border-slate-200">
            <span class="text-xs font-black text-slate-700">تفعيل السياسة في المتجر:</span>
            <BaseToggle 
              v-model="form.is_active" 
              :label="form.is_active ? 'مفعلة وتظهر للعملاء' : 'معطلة مؤقتاً'"
            />
          </div>
        </template>

        <!-- Arabic Inputs -->
        <div v-show="activeLangTab === 'ar'" class="space-y-4">
          <BaseInput 
            v-model="form.title_ar" 
            label="العنوان الرئيسي للمحتوى (بالعربي) *" 
            placeholder="سياسة الخصوصية والشروط والأحكام" 
            required 
          />
          <BaseTextarea 
            v-model="form.subtitle_ar" 
            label="الوصف التمهيدي أسفل العنوان (بالعربي)" 
            placeholder="خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى وفق الأنظمة المعتمدة في المملكة..." 
            :rows="2" 
          />
        </div>

        <!-- English Inputs -->
        <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
          <BaseInput 
            v-model="form.title_en" 
            label="Main Title (English) *" 
            placeholder="Privacy Policy & Terms of Service" 
            dir="ltr" 
            required 
          />
          <BaseTextarea 
            v-model="form.subtitle_en" 
            label="Hero Subtitle (English)" 
            placeholder="Your privacy and data security are our highest priority..." 
            dir="ltr" 
            :rows="2" 
          />
        </div>
      </AdminCard>

      <!-- SECTION 2: RICH TEXT CLAUSES & TERMS -->
      <AdminCard
        title="محتوى البنود والشروط والأحكام (HTML Rich Content)"
        subtitle="كتابة وصياغة بنود الخصوصية والشروط مع الترويسات والقوائم المتسلسلة لسهولة القراءة."
        icon="fa-solid fa-file-shield"
        icon-color="text-indigo-600"
      >
        <!-- Arabic Policy Content -->
        <div v-show="activeLangTab === 'ar'" class="space-y-2">
          <label class="block text-xs font-black text-slate-700 mb-1">بنود وفقرات الخصوصية والشروط (بالعربي):</label>
          <RichTextEditor 
            v-model="form.content_ar" 
            placeholder="اكتب بنود الخصوصية والشروط هنا..." 
          />
        </div>

        <!-- English Policy Content -->
        <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
          <label class="block text-xs font-black text-slate-700 mb-1">Privacy Clauses & Terms (English):</label>
          <RichTextEditor 
            v-model="form.content_en" 
            placeholder="Write privacy policy clauses and terms in English here..." 
          />
        </div>
      </AdminCard>

      <!-- SECTION 3: TOP 4 TRUST & SECURITY BADGES -->
      <AdminCard
        title="البطاقات والمحددات الأربع العلوية (Trust & Security Badges)"
        subtitle="تخصيص البطاقات العائمة الأربع المعروضة أسفل الهيدر الرئيسي مع الأيقونات والعناوين والوصف باللغتين."
        icon="fa-solid fa-shield-halved"
        icon-color="text-amber-500"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          <!-- Badge 1 -->
          <div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-amber-700">البطاقة الأولى #1</span>
              <input 
                v-model="form.badge_1_icon" 
                placeholder="fa-solid fa-shield-halved" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.badge_1_title_ar" label="العنوان (عربي) *" placeholder="تشفير وحماية مشددة" />
              <BaseInput v-model="form.badge_1_desc_ar" label="الوصف (عربي)" placeholder="حماية كاملة لكافة البيانات والمعاملات..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.badge_1_title_en" label="Title (English) *" placeholder="SSL/TLS Encryption" dir="ltr" />
              <BaseInput v-model="form.badge_1_desc_en" label="Description (English)" placeholder="256-bit encrypted data protocols..." dir="ltr" />
            </div>
          </div>

          <!-- Badge 2 -->
          <div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-indigo-700">البطاقة الثانية #2</span>
              <input 
                v-model="form.badge_2_icon" 
                placeholder="fa-solid fa-user-lock" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.badge_2_title_ar" label="العنوان (عربي) *" placeholder="سرية تامة للبيانات" />
              <BaseInput v-model="form.badge_2_desc_ar" label="الوصف (عربي)" placeholder="لا نشارك أو نبيع بياناتك لأي طرف..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.badge_2_title_en" label="Title (English) *" placeholder="Strict Confidentiality" dir="ltr" />
              <BaseInput v-model="form.badge_2_desc_en" label="Description (English)" placeholder="We never sell or trade your info..." dir="ltr" />
            </div>
          </div>

          <!-- Badge 3 -->
          <div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-emerald-700">البطاقة الثالثة #3</span>
              <input 
                v-model="form.badge_3_icon" 
                placeholder="fa-solid fa-building-shield" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.badge_3_title_ar" label="العنوان (عربي) *" placeholder="نظام حماية البيانات" />
              <BaseInput v-model="form.badge_3_desc_ar" label="الوصف (عربي)" placeholder="متوافق مع نظام حماية البيانات في المملكة..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.badge_3_title_en" label="Title (English) *" placeholder="Saudi PDPL Compliant" dir="ltr" />
              <BaseInput v-model="form.badge_3_desc_en" label="Description (English)" placeholder="Full alignment with KSA privacy laws..." dir="ltr" />
            </div>
          </div>

          <!-- Badge 4 -->
          <div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-purple-700">البطاقة الرابعة #4</span>
              <input 
                v-model="form.badge_4_icon" 
                placeholder="fa-solid fa-sliders" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.badge_4_title_ar" label="العنوان (عربي) *" placeholder="تحكم كامل بالبيانات" />
              <BaseInput v-model="form.badge_4_desc_ar" label="الوصف (عربي)" placeholder="حق مراجعة وتحديث أو حذف بياناتك..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.badge_4_title_en" label="Title (English) *" placeholder="Full User Rights" dir="ltr" />
              <BaseInput v-model="form.badge_4_desc_en" label="Description (English)" placeholder="Manage or delete your data anytime..." dir="ltr" />
            </div>
          </div>

        </div>
      </AdminCard>

      <!-- SECTION 4: QUICK SUMMARY CARD -->
      <AdminCard
        title="بطاقة الملخص السريع في الشريط الجانبي (Quick Summary Card)"
        subtitle="تخصيص عنوان والنقاط الموجزة المعروضة في الشريط الجانبي لتسهيل قراءة أهم بنود الخصوصية على العميل."
        icon="fa-solid fa-circle-info"
        icon-color="text-indigo-500"
      >
        <!-- Summary Title -->
        <div v-show="activeLangTab === 'ar'">
          <BaseInput v-model="form.summary_title_ar" label="عنوان بطاقة الملخص (عربي)" placeholder="ملخص موجز لأهم البنود" />
        </div>
        <div v-show="activeLangTab === 'en'" dir="ltr">
          <BaseInput v-model="form.summary_title_en" label="Summary Card Title (English)" placeholder="Summary in Brief" dir="ltr" />
        </div>

        <div class="space-y-3 pt-2">
          <div v-show="activeLangTab === 'ar'" class="space-y-3">
            <BaseInput v-model="form.summary_point_1_ar" label="البند الموجز الأول (عربي)" placeholder="نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة." />
            <BaseInput v-model="form.summary_point_2_ar" label="البند الموجز الثاني (عربي)" placeholder="لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا." />
            <BaseInput v-model="form.summary_point_3_ar" label="البند الموجز الثالث (عربي)" placeholder="يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم." />
          </div>
          <div v-show="activeLangTab === 'en'" class="space-y-3" dir="ltr">
            <BaseInput v-model="form.summary_point_1_en" label="Summary Point 1 (English)" placeholder="We collect data strictly to process and deliver your orders." dir="ltr" />
            <BaseInput v-model="form.summary_point_2_en" label="Summary Point 2 (English)" placeholder="Payment card information is never stored on our servers." dir="ltr" />
            <BaseInput v-model="form.summary_point_3_en" label="Summary Point 3 (English)" placeholder="You have full right to edit or delete your account anytime." dir="ltr" />
          </div>
        </div>
      </AdminCard>

      <!-- SECTION 5: PRIVACY INQUIRIES & CONTACT CTA -->
      <AdminCard
        title="صندوق استفسارات الخصوصية والدعم (Privacy Inquiries CTA)"
        subtitle="تخصيص الصندوق المعروض أسفل الملخص للتواصل المباشر مع فريق حماية الخصوصية."
        icon="fa-solid fa-envelope-shield"
        icon-color="text-emerald-500"
      >
        <div v-show="activeLangTab === 'ar'" class="space-y-4">
          <BaseInput v-model="form.inquiry_title_ar" label="عنوان الصندوق (عربي)" placeholder="استفسارات حول الخصوصية؟" />
          <BaseInput v-model="form.inquiry_desc_ar" label="الوصف التوضيحي (عربي)" placeholder="إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة." />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput v-model="form.inquiry_contact_btn_ar" label="نص زر التواصل (عربي)" placeholder="تواصل مع فريق الخصوصية" />
            <BaseInput v-model="form.inquiry_whatsapp_btn_ar" label="نص زر الواتساب (عربي)" placeholder="دعم عبر الواتساب" />
          </div>
        </div>

        <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
          <BaseInput v-model="form.inquiry_title_en" label="Box Title (English)" placeholder="Privacy Inquiries?" dir="ltr" />
          <BaseInput v-model="form.inquiry_desc_en" label="Box Description (English)" placeholder="For any questions regarding your personal data or privacy rights, please reach out to us." dir="ltr" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput v-model="form.inquiry_contact_btn_en" label="Contact Button Text (English)" placeholder="Contact Privacy Team" dir="ltr" />
            <BaseInput v-model="form.inquiry_whatsapp_btn_en" label="WhatsApp Button Text (English)" placeholder="WhatsApp Support" dir="ltr" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <BaseInput v-model="form.inquiry_contact_url" label="رابط صفحة التواصل" placeholder="/contact-us" dir="ltr" />
          <BaseInput v-model="form.inquiry_whatsapp_url" label="رابط / رقم الواتساب" placeholder="https://wa.me/966500000000" dir="ltr" />
        </div>
      </AdminCard>

      <!-- SECTION 6: SEO & META TAGS -->
      <AdminSeoFields
        :active-lang="activeLangTab"
        v-model:meta-title-ar="form.meta_title_ar"
        v-model:meta-title-en="form.meta_title_en"
        v-model:meta-description-ar="form.meta_description_ar"
        v-model:meta-description-en="form.meta_description_en"
      />

    </div>

    <!-- 4. STICKY BOTTOM SAVE ACTION BAR -->
    <AdminSaveBar
      :is-saving="isSubmitting"
      :is-active="form.is_active"
      preview-url="/privacy-policy"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminPrivacyPolicy"
    />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AdminPageHeader from '~/components/dashboard/ui/AdminPageHeader.vue'
import AdminCard from '~/components/dashboard/ui/AdminCard.vue'
import AdminSeoFields from '~/components/dashboard/ui/AdminSeoFields.vue'
import AdminSaveBar from '~/components/dashboard/ui/AdminSaveBar.vue'
import AdminSkeletonForm from '~/components/dashboard/ui/AdminSkeletonForm.vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseTextarea from '~/components/dashboard/ui/BaseTextarea.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import RichTextEditor from '~/components/dashboard/ui/RichTextEditor.vue'
import { usePrivacyPolicy } from '~/composables/usePrivacyPolicy'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { adminDir } = useAdminLanguage()
const {
  form,
  isLoading,
  isSubmitting,
  fetchAdminPrivacyPolicy,
  submitAdminPrivacyPolicy
} = usePrivacyPolicy()

const activeLangTab = ref<'ar' | 'en'>('ar')

useHead({
  title: 'إدارة سياسة الخصوصية والشروط | لوحة تحكم أسوار جدة'
})

onMounted(() => {
  fetchAdminPrivacyPolicy()
})
</script>
