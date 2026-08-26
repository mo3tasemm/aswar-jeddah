<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-24" :dir="adminDir">
    
    <!-- 1. UNIFIED PAGE HEADER -->
    <AdminPageHeader
      title="إدارة سياسة الاستبدال والاسترجاع (Return Policy)"
      subtitle="تخصيص بنود الاسترجاع، البطاقات العلوية، خطوات الإرجاع الأربعة، وصندوق المساعدة والتواصل."
      icon="fa-solid fa-rotate-left"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'سياسة الاستبدال والاسترجاع' }
      ]"
      :show-lang-tabs="true"
      v-model:lang-tab="activeLangTab"
      :show-save="true"
      :is-saving="isSubmitting"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminReturnPolicy"
    >
      <template #actions>
        <NuxtLink 
          to="/return-policy" 
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
        title="الحالة والعناوين الرئيسية"
        subtitle="تحديد ظهور السياسة للزوار وصياغة العناوين المعروضة في أعلى الصفحة."
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
            placeholder="سياسة الاستبدال والاسترجاع" 
            required 
          />
          <BaseTextarea 
            v-model="form.subtitle_ar" 
            label="الوصف التمهيدي أسفل العنوان (بالعربي)" 
            placeholder="تسوق بكل ثقة مع متجر أسوار جدة. نوفر لك تجربة استرجاع واستبدال مرنة..." 
            :rows="2" 
          />
        </div>

        <!-- English Inputs -->
        <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
          <BaseInput 
            v-model="form.title_en" 
            label="Main Title (English) *" 
            placeholder="Return & Refund Policy" 
            dir="ltr" 
            required 
          />
          <BaseTextarea 
            v-model="form.subtitle_en" 
            label="Hero Subtitle (English)" 
            placeholder="Shop with complete confidence at Aswar Jeddah. We provide smooth returns..." 
            dir="ltr" 
            :rows="2" 
          />
        </div>
      </AdminCard>

      <!-- SECTION 2: RICH TEXT CLAUSES & TERMS -->
      <AdminCard
        title="بنود وشروط الاسترجاع والاستبدال (HTML Rich Content)"
        subtitle="كتابة وصياغة بنود السياسة مع الترويسات والقوائم المتسلسلة لسهولة القراءة."
        icon="fa-solid fa-file-contract"
        icon-color="text-indigo-600"
      >
        <!-- Arabic Content -->
        <div v-show="activeLangTab === 'ar'" class="space-y-2">
          <label class="block text-xs font-black text-slate-700 mb-1">بنود وفقرات السياسة (بالعربي):</label>
          <RichTextEditor 
            v-model="form.content_ar" 
            placeholder="اكتب بنود الاسترجاع والاستبدال هنا..." 
          />
        </div>

        <!-- English Content -->
        <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
          <label class="block text-xs font-black text-slate-700 mb-1">Policy Clauses & Terms (English):</label>
          <RichTextEditor 
            v-model="form.content_en" 
            placeholder="Write return policy clauses in English here..." 
          />
        </div>
      </AdminCard>

      <!-- SECTION 3: TOP 4 HIGHLIGHT CARDS -->
      <AdminCard
        title="البطاقات الأربع العلوية (Top Highlight Cards)"
        subtitle="تخصيص البطاقات العائمة الأربع المعروضة أسفل الهيدر مع الأيقونات والعناوين والوصف باللغتين."
        icon="fa-solid fa-layer-group"
        icon-color="text-amber-500"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          
          <!-- Highlight 1 -->
          <div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-amber-700">البطاقة الأولى #1</span>
              <input 
                v-model="form.highlight_1_icon" 
                placeholder="fa-solid fa-clock-rotate-left" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.highlight_1_title_ar" label="العنوان (عربي) *" placeholder="مهلة استرجاع 14 يوماً" />
              <BaseInput v-model="form.highlight_1_desc_ar" label="الوصف (عربي)" placeholder="يمكنك استرجاع أو استبدال المنتج..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.highlight_1_title_en" label="Title (English) *" placeholder="14-Day Return Window" dir="ltr" />
              <BaseInput v-model="form.highlight_1_desc_en" label="Description (English)" placeholder="Return or exchange items within 14 days..." dir="ltr" />
            </div>
          </div>

          <!-- Highlight 2 -->
          <div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-indigo-700">البطاقة الثانية #2</span>
              <input 
                v-model="form.highlight_2_icon" 
                placeholder="fa-solid fa-box-open" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.highlight_2_title_ar" label="العنوان (عربي) *" placeholder="تغليف المصنع الأصلي" />
              <BaseInput v-model="form.highlight_2_desc_ar" label="الوصف (عربي)" placeholder="أن يكون المنتج بحالته الأصلية غير مستخدم..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.highlight_2_title_en" label="Title (English) *" placeholder="Original Packaging" dir="ltr" />
              <BaseInput v-model="form.highlight_2_desc_en" label="Description (English)" placeholder="Items must be in original condition..." dir="ltr" />
            </div>
          </div>

          <!-- Highlight 3 -->
          <div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-emerald-700">البطاقة الثالثة #3</span>
              <input 
                v-model="form.highlight_3_icon" 
                placeholder="fa-solid fa-money-bill-transfer" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.highlight_3_title_ar" label="العنوان (عربي) *" placeholder="استرداد مالي سريع" />
              <BaseInput v-model="form.highlight_3_desc_ar" label="الوصف (عربي)" placeholder="تحويل فوري إلى نفس وسيلة الدفع..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.highlight_3_title_en" label="Title (English) *" placeholder="Fast Refund" dir="ltr" />
              <BaseInput v-model="form.highlight_3_desc_en" label="Description (English)" placeholder="Fast refund to your original payment method..." dir="ltr" />
            </div>
          </div>

          <!-- Highlight 4 -->
          <div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-xs font-black text-purple-700">البطاقة الرابعة #4</span>
              <input 
                v-model="form.highlight_4_icon" 
                placeholder="fa-solid fa-headset" 
                class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40"
                dir="ltr"
                title="FontAwesome Icon"
              />
            </div>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.highlight_4_title_ar" label="العنوان (عربي) *" placeholder="دعم فني متاح" />
              <BaseInput v-model="form.highlight_4_desc_ar" label="الوصف (عربي)" placeholder="فريق خدمة العملاء جاهز لمساعدتك..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.highlight_4_title_en" label="Title (English) *" placeholder="Dedicated Support" dir="ltr" />
              <BaseInput v-model="form.highlight_4_desc_en" label="Description (English)" placeholder="Customer service team ready to assist..." dir="ltr" />
            </div>
          </div>

        </div>
      </AdminCard>

      <!-- SECTION 4: 4 DYNAMIC RETURN STEPS -->
      <AdminCard
        title="خطوات الإرجاع الأربعة (Step-by-Step Guide)"
        subtitle="تخصيص خطوات الإرجاع المعروضة في أسفل الصفحة لشرح الآلية للعملاء بالتفصيل."
        icon="fa-solid fa-list-ol"
        icon-color="text-blue-500"
      >
        <!-- Steps Section Title -->
        <div class="mb-4">
          <div v-show="activeLangTab === 'ar'">
            <BaseInput v-model="form.steps_title_ar" label="عنوان قسم الخطوات (عربي)" placeholder="كيف تتم عملية الاسترجاع أو الاستبدال؟" />
          </div>
          <div v-show="activeLangTab === 'en'" dir="ltr">
            <BaseInput v-model="form.steps_title_en" label="Steps Section Title (English)" placeholder="How does the return or exchange process work?" dir="ltr" />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <!-- Step 1 -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-black text-slate-700">الخطوة رقم 1</span>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.step_1_title_ar" label="عنوان الخطوة (عربي)" placeholder="1. تقديم الطلب" />
              <BaseInput v-model="form.step_1_desc_ar" label="شرح الخطوة (عربي)" placeholder="تواصل معنا عبر الواتساب أو البريد..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.step_1_title_en" label="Step Title (English)" placeholder="1. Submit Request" dir="ltr" />
              <BaseInput v-model="form.step_1_desc_en" label="Step Description (English)" placeholder="Reach out via WhatsApp or email..." dir="ltr" />
            </div>
          </div>

          <!-- Step 2 -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-black text-slate-700">الخطوة رقم 2</span>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.step_2_title_ar" label="عنوان الخطوة (عربي)" placeholder="2. مراجعة والموافقة" />
              <BaseInput v-model="form.step_2_desc_ar" label="شرح الخطوة (عربي)" placeholder="يتم التحقق من طلبك وإصدار بوليصة الشحن..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.step_2_title_en" label="Step Title (English)" placeholder="2. Review & Approval" dir="ltr" />
              <BaseInput v-model="form.step_2_desc_en" label="Step Description (English)" placeholder="We verify your request and issue return label..." dir="ltr" />
            </div>
          </div>

          <!-- Step 3 -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-black text-slate-700">الخطوة رقم 3</span>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.step_3_title_ar" label="عنوان الخطوة (عربي)" placeholder="3. استلام وفحص المنتج" />
              <BaseInput v-model="form.step_3_desc_ar" label="شرح الخطوة (عربي)" placeholder="يستلم المندوب الشحنة وتفحص في مستودعاتنا..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.step_3_title_en" label="Step Title (English)" placeholder="3. Product Inspection" dir="ltr" />
              <BaseInput v-model="form.step_3_desc_en" label="Step Description (English)" placeholder="Items received and inspected at warehouse..." dir="ltr" />
            </div>
          </div>

          <!-- Step 4 -->
          <div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <span class="text-xs font-black text-slate-700">الخطوة رقم 4</span>
            <div v-show="activeLangTab === 'ar'" class="space-y-2">
              <BaseInput v-model="form.step_4_title_ar" label="عنوان الخطوة (عربي)" placeholder="4. الاسترداد أو الاستبدال" />
              <BaseInput v-model="form.step_4_desc_ar" label="شرح الخطوة (عربي)" placeholder="إعادة المبلغ لحسابك أو شحن البديل فورا..." />
            </div>
            <div v-show="activeLangTab === 'en'" class="space-y-2" dir="ltr">
              <BaseInput v-model="form.step_4_title_en" label="Step Title (English)" placeholder="4. Refund or Exchange" dir="ltr" />
              <BaseInput v-model="form.step_4_desc_en" label="Step Description (English)" placeholder="Refund processed or replacement shipped..." dir="ltr" />
            </div>
          </div>

        </div>
      </AdminCard>

      <!-- SECTION 5: HELP & CONTACT BOX -->
      <AdminCard
        title="صندوق المساعدة والتواصل السريع (Help & Contact Box)"
        subtitle="تخصيص الصندوق المعروض أسفل الخطوات للتواصل مع خدمة العملاء."
        icon="fa-solid fa-headset"
        icon-color="text-emerald-500"
      >
        <div v-show="activeLangTab === 'ar'" class="space-y-4">
          <BaseInput v-model="form.help_box_title_ar" label="عنوان الصندوق (عربي)" placeholder="هل تحتاج لمساعدة في استرجاع طلبك؟" />
          <BaseInput v-model="form.help_box_desc_ar" label="الوصف التوضيحي (عربي)" placeholder="فريق خدمة العملاء متواجد على مدار الساعة لمساعدتك..." />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput v-model="form.help_box_btn_contact_ar" label="نص زر التواصل (عربي)" placeholder="تواصل مع الدعم الفني" />
            <BaseInput v-model="form.help_box_btn_whatsapp_ar" label="نص زر الواتساب (عربي)" placeholder="محادثة واتساب مباشرة" />
          </div>
        </div>

        <div v-show="activeLangTab === 'en'" class="space-y-4" dir="ltr">
          <BaseInput v-model="form.help_box_title_en" label="Box Title (English)" placeholder="Need help with your return?" dir="ltr" />
          <BaseInput v-model="form.help_box_desc_en" label="Box Description (English)" placeholder="Our customer support team is available 24/7..." dir="ltr" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <BaseInput v-model="form.help_box_btn_contact_en" label="Contact Button Text (English)" placeholder="Contact Support" dir="ltr" />
            <BaseInput v-model="form.help_box_btn_whatsapp_en" label="WhatsApp Button Text (English)" placeholder="Direct WhatsApp Chat" dir="ltr" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <BaseInput v-model="form.help_box_contact_url" label="رابط صفحة التواصل" placeholder="/contact-us" dir="ltr" />
          <BaseInput v-model="form.help_box_whatsapp_url" label="رابط / رقم الواتساب" placeholder="https://wa.me/966500000000" dir="ltr" />
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
      preview-url="/return-policy"
      save-label="حفظ ونشر التعديلات"
      @save="submitAdminReturnPolicy"
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
import { useReturnPolicy } from '~/composables/useReturnPolicy'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { adminDir } = useAdminLanguage()
const {
  form,
  isLoading,
  isSubmitting,
  fetchAdminReturnPolicy,
  submitAdminReturnPolicy
} = useReturnPolicy()

const activeLangTab = ref<'ar' | 'en'>('ar')

useHead({
  title: 'إدارة سياسة الاستبدال والاسترجاع | لوحة تحكم أسوار جدة'
})

onMounted(() => {
  fetchAdminReturnPolicy()
})
</script>
