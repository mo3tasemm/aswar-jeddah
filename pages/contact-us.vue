<template>
  <div class="min-h-screen bg-slate-50 text-slate-900" :dir="layoutDirection">

    <!-- 1. CLEAN HEADER (HERO) -->
    <header class="bg-[#0B0E28] text-white py-10 sm:py-14 border-b border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">
          <NuxtLink :to="localePath('/')" class="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{{ t('nav.home') || (currentLanguage === 'en' ? 'Home' : 'الرئيسية') }}</span>
          </NuxtLink>
          <span class="text-slate-600">/</span>
          <span class="text-amber-400 font-bold">{{ currentLanguage === 'en' ? 'Contact Us' : 'تواصل معنا' }}</span>
        </nav>

        <!-- Header Title & Subtitle -->
        <div class="max-w-3xl text-start">
          <h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {{ currentLanguage === 'en' ? 'Contact Us' : 'تواصل معنا' }}
          </h1>
          <p class="text-sm sm:text-base text-slate-300 font-normal mt-2 leading-relaxed">
            {{ currentLanguage === 'en' 
              ? 'Have questions about products, orders, or warranties? Our dedicated support team is here to assist you.' 
              : 'فريقنا متواجد دائماً للإجابة على استفساراتكم ومساعدتكم في كل ما يخص المنتجات والطلبات والضمان.' }}
          </p>
        </div>

      </div>
    </header>

    <!-- 2. MAIN CONTENT (CLEAN 2-COLUMN GRID) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        <!-- COLUMN 1: CONTACT DETAILS CARD (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-start space-y-6">
            
            <div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900">
                {{ currentLanguage === 'en' ? 'Contact Information' : 'بيانات ومعلومات التواصل' }}
              </h2>
              <p class="text-xs text-slate-500 font-medium mt-1">
                {{ currentLanguage === 'en' 
                  ? 'Reach out to us directly through any of the following channels:' 
                  : 'يمكنكم التواصل المباشر معنا عبر قنوات الاتصال التالية:' }}
              </p>
            </div>

            <div class="space-y-4 divide-y divide-slate-100">
              
              <!-- Hotline / Direct Phone -->
              <div v-if="contactInfo.hotline || contactInfo.phone" class="pt-3 first:pt-0 flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base shrink-0">
                  <i class="fa-solid fa-phone"></i>
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-slate-500 block">
                    {{ currentLanguage === 'en' ? 'Direct Hotline & Phone' : 'الخط الساخن ورقم المعرض' }}
                  </span>
                  <div class="flex flex-col gap-0.5">
                    <a 
                      v-if="contactInfo.hotline"
                      :href="'tel:' + contactInfo.hotline.replace(/\s+/g, '')"
                      class="text-sm sm:text-base font-black text-slate-900 hover:text-amber-600 transition-colors dir-ltr block"
                    >
                      {{ contactInfo.hotline }}
                    </a>
                    <a 
                      v-if="contactInfo.phone && contactInfo.phone !== contactInfo.hotline"
                      :href="'tel:' + contactInfo.phone.replace(/\s+/g, '')"
                      class="text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors dir-ltr block"
                    >
                      {{ contactInfo.phone }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- WhatsApp Support -->
              <div v-if="contactInfo.whatsapp" class="pt-4 flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0">
                  <i class="fa-brands fa-whatsapp"></i>
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-slate-500 block">
                    {{ currentLanguage === 'en' ? 'WhatsApp Customer Service' : 'خدمة العملاء عبر واتساب' }}
                  </span>
                  <a 
                    :href="`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`"
                    target="_blank"
                    class="text-sm sm:text-base font-black text-slate-900 hover:text-emerald-600 transition-colors dir-ltr block"
                  >
                    {{ contactInfo.whatsapp }}
                  </a>
                  <span class="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>{{ currentLanguage === 'en' ? 'Fast online response' : 'استجابة سريعة ومباشرة' }}</span>
                  </span>
                </div>
              </div>

              <!-- Email -->
              <div v-if="contactInfo.email" class="pt-4 flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-base shrink-0">
                  <i class="fa-solid fa-envelope"></i>
                </div>
                <div class="space-y-0.5 min-w-0">
                  <span class="text-xs font-bold text-slate-500 block">
                    {{ currentLanguage === 'en' ? 'Official Email' : 'البريد الإلكتروني الرسمي' }}
                  </span>
                  <a 
                    :href="'mailto:' + contactInfo.email"
                    class="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors block font-mono dir-ltr truncate max-w-[240px] sm:max-w-xs"
                  >
                    {{ contactInfo.email }}
                  </a>
                </div>
              </div>

              <!-- Working Hours -->
              <div v-if="contactInfo.working_hours" class="pt-4 flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base shrink-0">
                  <i class="fa-solid fa-clock"></i>
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-slate-500 block">
                    {{ currentLanguage === 'en' ? 'Working Hours' : 'أوقات العمل والدوام' }}
                  </span>
                  <p class="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {{ contactInfo.working_hours }}
                  </p>
                </div>
              </div>

              <!-- Store Address -->
              <div v-if="contactInfo.address" class="pt-4 flex items-start gap-3.5">
                <div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-base shrink-0">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div class="space-y-0.5">
                  <span class="text-xs font-bold text-slate-500 block">
                    {{ currentLanguage === 'en' ? 'Showroom & Store Location' : 'عنوان المعرض' }}
                  </span>
                  <p class="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">
                    {{ contactInfo.address }}
                  </p>
                </div>
              </div>

            </div>

            <!-- Social Media Channels Bar -->
            <div v-if="hasSocialLinks" class="pt-4 border-t border-slate-100 space-y-3">
              <span class="text-xs font-bold text-slate-600 block">
                {{ currentLanguage === 'en' ? 'Follow Us on Social Media' : 'تابعنا عبر منصات التواصل' }}
              </span>
              <div class="flex items-center gap-2 flex-wrap">
                <a 
                  v-if="contactInfo.twitter || contactInfo.x" 
                  :href="contactInfo.twitter || contactInfo.x" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#0B0E28] hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                  title="X / Twitter"
                >
                  <i class="fa-brands fa-x-twitter text-sm"></i>
                </a>
                <a 
                  v-if="contactInfo.instagram" 
                  :href="contactInfo.instagram" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                  title="Instagram"
                >
                  <i class="fa-brands fa-instagram text-sm"></i>
                </a>
                <a 
                  v-if="contactInfo.tiktok" 
                  :href="contactInfo.tiktok" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                  title="TikTok"
                >
                  <i class="fa-brands fa-tiktok text-sm"></i>
                </a>
                <a 
                  v-if="contactInfo.snapchat" 
                  :href="contactInfo.snapchat" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-colors"
                  title="Snapchat"
                >
                  <i class="fa-brands fa-snapchat text-sm"></i>
                </a>
                <a 
                  v-if="contactInfo.facebook" 
                  :href="contactInfo.facebook" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                  title="Facebook"
                >
                  <i class="fa-brands fa-facebook text-sm"></i>
                </a>
                <a 
                  v-if="contactInfo.youtube" 
                  :href="contactInfo.youtube" 
                  target="_blank" 
                  class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors"
                  title="YouTube"
                >
                  <i class="fa-brands fa-youtube text-sm"></i>
                </a>
              </div>
            </div>

          </div>
        </div>

        <!-- COLUMN 2: CONTACT FORM CARD (7 Cols) -->
        <div class="lg:col-span-7">
          <div class="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-start space-y-6">
            
            <div>
              <h2 class="text-lg sm:text-xl font-black text-slate-900">
                {{ currentLanguage === 'en' ? 'Send Us a Message' : 'نموذج المراسلة المباشر' }}
              </h2>
              <p class="text-xs text-slate-500 font-medium mt-1">
                {{ currentLanguage === 'en' 
                  ? 'Please fill out the form below and we will get back to you promptly.' 
                  : 'يرجى تعبئة النموذج التالي وسيقوم فريق الدعم الفني بالرد عليكم في أقرب وقت ممكن.' }}
              </p>
            </div>

            <form @submit.prevent="submitMessage" class="space-y-4">
              
              <!-- Full Name -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">
                  {{ currentLanguage === 'en' ? 'Full Name *' : 'الاسم الكامل *' }}
                </label>
                <input 
                  type="text" 
                  v-model="messageForm.name"
                  :placeholder="currentLanguage === 'en' ? 'e.g. John Doe' : 'مثال: محمد أحمد'"
                  class="w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  :class="formErrors.name ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300'"
                />
                <span v-if="formErrors.name" class="text-[11px] text-red-500 font-bold block mt-1">{{ formErrors.name }}</span>
              </div>

              <!-- Email & Phone Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Email -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ currentLanguage === 'en' ? 'Email Address *' : 'البريد الإلكتروني *' }}
                  </label>
                  <input 
                    type="email" 
                    v-model="messageForm.email"
                    :placeholder="currentLanguage === 'en' ? 'name@example.com' : 'name@example.com'"
                    class="w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all dir-ltr"
                    :class="formErrors.email ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300'"
                  />
                  <span v-if="formErrors.email" class="text-[11px] text-red-500 font-bold block mt-1">{{ formErrors.email }}</span>
                </div>

                <!-- Phone -->
                <div>
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ currentLanguage === 'en' ? 'Phone Number (Optional)' : 'رقم الجوال (اختياري)' }}
                  </label>
                  <input 
                    type="tel" 
                    v-model="messageForm.phone"
                    placeholder="0500000000"
                    class="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all dir-ltr"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1.5">
                  {{ currentLanguage === 'en' ? 'Subject *' : 'موضوع الرسالة *' }}
                </label>
                <input 
                  type="text" 
                  v-model="messageForm.subject"
                  :placeholder="currentLanguage === 'en' ? 'e.g. Question regarding product or order' : 'مثال: استفسار عن توفر منتج أو مواصفات جهاز'"
                  class="w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  :class="formErrors.subject ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300'"
                />
                <span v-if="formErrors.subject" class="text-[11px] text-red-500 font-bold block mt-1">{{ formErrors.subject }}</span>
              </div>

              <!-- Message Body -->
              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-xs font-bold text-slate-700">
                    {{ currentLanguage === 'en' ? 'Message Content *' : 'نص الرسالة *' }}
                  </label>
                  <span class="text-[11px] text-slate-400 font-mono">{{ messageForm.message.length }} / 1000</span>
                </div>
                <textarea 
                  rows="4"
                  v-model="messageForm.message"
                  maxlength="1000"
                  :placeholder="currentLanguage === 'en' ? 'Write your message details here...' : 'اكتب تفاصيل استفسارك أو ملاحظاتك هنا...'"
                  class="w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  :class="formErrors.message ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-300'"
                ></textarea>
                <span v-if="formErrors.message" class="text-[11px] text-red-500 font-bold block mt-1">{{ formErrors.message }}</span>
              </div>

              <!-- Submit Button -->
              <div class="pt-2">
                <button 
                  type="submit"
                  :disabled="isSubmitting"
                  class="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin text-sm"></i>
                  <i v-else class="fa-solid fa-paper-plane text-xs"></i>
                  <span>{{ isSubmitting ? (currentLanguage === 'en' ? 'Sending...' : 'جاري الإرسال...') : (currentLanguage === 'en' ? 'Send Message' : 'إرسال الرسالة') }}</span>
                </button>
              </div>

            </form>

          </div>
        </div>

      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { useContact } from '~/composables/useContact'

const { t, layoutDirection, currentLanguage, localePath } = useLanguage()
const {
  contactInfo,
  isLoading,
  isSubmitting,
  messageForm,
  formErrors,
  fetchPublicContactInfo,
  submitMessage
} = useContact()

useHead({
  title: computed(() => currentLanguage.value === 'en' ? 'Contact Us | Aswar Jeddah' : 'تواصل معنا | أسوار جدة'),
  meta: [
    { name: 'description', content: computed(() => currentLanguage.value === 'en' ? 'Get in touch with Aswar Jeddah customer care team' : 'تواصل مع فريق خدمة العملاء والدعم الفني في أسوار جدة') }
  ]
})

const hasSocialLinks = computed(() => {
  const c = contactInfo.value
  return !!(c.twitter || c.x || c.instagram || c.tiktok || c.snapchat || c.facebook || c.youtube)
})

onMounted(() => {
  fetchPublicContactInfo()
})
</script>
