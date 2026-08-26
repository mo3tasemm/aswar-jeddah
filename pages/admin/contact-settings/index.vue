<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-24" :dir="adminDir">
    
    <!-- 1. UNIFIED PAGE HEADER -->
    <AdminPageHeader
      title="إعدادات التواصل ومعلومات المتجر"
      subtitle="تعديل أرقام الهواتف، الواتساب، البريد الإلكتروني، ساعات العمل، العنوان، وروابط التواصل الاجتماعي."
      icon="fa-solid fa-sliders"
      :breadcrumbs="[
        { label: 'لوحة التحكم', to: '/admin' },
        { label: 'إعدادات التواصل' }
      ]"
      :show-save="true"
      :is-saving="isSubmitting"
      save-label="حفظ ونشر التعديلات"
      @save="saveAdminContactSettings"
    >
      <template #actions>
        <NuxtLink 
          to="/contact-us" 
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

    <!-- 3. FORM BODY -->
    <form v-else @submit.prevent="saveAdminContactSettings" class="space-y-6">

      <!-- SECTION 1: DIRECT CONTACT NUMBERS -->
      <AdminCard
        title="أرقام الاتصال وقنوات المراسلة المباشرة"
        subtitle="الأرقام والوسائل المستخدمة في الـ Header والـ Footer وصفحة اتصل بنا."
        icon="fa-solid fa-phone"
        icon-color="text-amber-500"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BaseInput 
            v-model="adminSettingsForm.phone" 
            label="رقم الهاتف الرئيسي (Phone)" 
            placeholder="966500000000" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.phone_secondary" 
            label="رقم هاتف إضافي (Secondary Phone)" 
            placeholder="966500000001" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.whatsapp" 
            label="رقم الواتساب الرسمي (WhatsApp)" 
            placeholder="966500000000" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.email" 
            label="البريد الإلكتروني الرسمي (Email)" 
            placeholder="support@aswar-jeddah.com" 
            type="email" 
            dir="ltr" 
          />
        </div>
      </AdminCard>

      <!-- SECTION 2: ADDRESS & BUSINESS HOURS -->
      <AdminCard
        title="العنوان الجغرافي وأوقات العمل الرسمية"
        subtitle="تفاصيل الموقع وساعات العمل الموضحة للعملاء."
        icon="fa-solid fa-location-dot"
        icon-color="text-indigo-600"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <BaseInput 
            v-model="adminSettingsForm.address_ar" 
            label="العنوان باللغة العربية" 
            placeholder="جدة، المملكة العربية السعودية - شارع فلسطين" 
          />
          <BaseInput 
            v-model="adminSettingsForm.address_en" 
            label="Address in English" 
            placeholder="Palestine St, Jeddah, Saudi Arabia" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.working_hours_ar" 
            label="أوقات العمل باللغة العربية" 
            placeholder="السبت - الخميس: 9:00 ص - 10:00 م" 
          />
          <BaseInput 
            v-model="adminSettingsForm.working_hours_en" 
            label="Working Hours in English" 
            placeholder="Sat - Thu: 9:00 AM - 10:00 PM" 
            dir="ltr" 
          />
        </div>
      </AdminCard>

      <!-- SECTION 3: SOCIAL MEDIA LINKS -->
      <AdminCard
        title="روابط منصات التواصل الاجتماعي (Social Media)"
        subtitle="الروابط المباشرة لحسابات المتجر على منصات التواصل."
        icon="fa-solid fa-share-nodes"
        icon-color="text-blue-500"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <BaseInput 
            v-model="adminSettingsForm.instagram" 
            label="إنستغرام (Instagram URL)" 
            placeholder="https://instagram.com/aswar" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.snapchat" 
            label="سناب شات (Snapchat URL)" 
            placeholder="https://snapchat.com/add/aswar" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.tiktok" 
            label="تيك توك (TikTok URL)" 
            placeholder="https://tiktok.com/@aswar" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.x_twitter" 
            label="إكس / تويتر (X / Twitter URL)" 
            placeholder="https://x.com/aswar" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.facebook" 
            label="فيسبوك (Facebook URL)" 
            placeholder="https://facebook.com/aswar" 
            dir="ltr" 
          />
          <BaseInput 
            v-model="adminSettingsForm.maroof" 
            label="منصة معروف / توثيق المتجر (Maroof)" 
            placeholder="https://maroof.sa/..." 
            dir="ltr" 
          />
        </div>
      </AdminCard>

      <!-- SECTION 4: GOOGLE MAPS EMBED -->
      <AdminCard
        title="خريطة موقع المعرض (Google Maps Embed)"
        subtitle="تضمين خريطة موقع المعرض للظهور في صفحة اتصل بنا."
        icon="fa-solid fa-map-location-dot"
        icon-color="text-teal-500"
      >
        <div class="grid grid-cols-1 gap-6">
          <BaseInput 
            v-model="adminSettingsForm.map_iframe" 
            label="كود تضمين الخريطة أو رابط خرائط جوجل (Google Maps Iframe / URL)" 
            placeholder="https://www.google.com/maps/embed?..." 
            dir="ltr" 
          />
        </div>
      </AdminCard>

    </form>

    <!-- 4. STICKY BOTTOM SAVE ACTION BAR -->
    <AdminSaveBar
      :is-saving="isSubmitting"
      :show-status="false"
      preview-url="/contact-us"
      save-label="حفظ ونشر التعديلات"
      @save="saveAdminContactSettings"
    />

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AdminPageHeader from '~/components/dashboard/ui/AdminPageHeader.vue'
import AdminCard from '~/components/dashboard/ui/AdminCard.vue'
import AdminSkeletonForm from '~/components/dashboard/ui/AdminSkeletonForm.vue'
import AdminSaveBar from '~/components/dashboard/ui/AdminSaveBar.vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import { useContact } from '~/composables/useContact'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { adminDir } = useAdminLanguage()
const {
  adminSettingsForm,
  isLoading,
  isSubmitting,
  fetchAdminContactSettings,
  saveAdminContactSettings
} = useContact()

useHead({
  title: 'إعدادات التواصل | لوحة تحكم أسوار جدة'
})

onMounted(() => {
  fetchAdminContactSettings()
})
</script>
