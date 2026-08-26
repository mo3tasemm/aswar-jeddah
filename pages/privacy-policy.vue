<template>
  <div class="min-h-screen bg-slate-50 text-slate-900" :dir="layoutDirection">

    <!-- 1. LUXURY DARK HERO SECTION -->
    <section class="relative bg-[#0B0E28] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <!-- Ambient Brand Glow & Texture -->
      <div class="absolute inset-0 z-0 pointer-events-none">
        <div class="absolute top-0 end-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 start-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div>
      </div>

      <div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Breadcrumbs -->
        <nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4 sm:mb-6">
          <NuxtLink :to="localePath('/')" class="hover:text-amber-400 transition-colors flex items-center gap-1.5">
            <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>{{ t('nav.home') || (currentLanguage === 'en' ? 'Home' : 'الرئيسية') }}</span>
          </NuxtLink>
          <span class="text-slate-600">/</span>
          <span class="text-amber-400 font-bold">{{ displayTitle }}</span>
        </nav>

        <!-- Main Title & Subtitle -->
        <div class="max-w-3xl text-start">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-black mb-3 backdrop-blur-xs">
            <i class="fa-solid fa-lock text-xs"></i>
            <span>{{ currentLanguage === 'en' ? 'Data Protection & Security' : 'حماية البيانات والأمان' }}</span>
          </div>

          <h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">
            {{ displayTitle }}
          </h1>

          <p class="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            {{ displaySubtitle }}
          </p>
        </div>

      </div>
    </section>

    <!-- 2. ELEVATED TRUST & SECURITY BADGES BAR (100% Dynamic) -->
    <section class="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-slate-100">
        
        <div 
          v-for="(badge, idx) in displayBadges" 
          :key="badge.id || idx"
          class="p-2.5 sm:p-3 flex items-start gap-3.5 text-start min-w-0"
        >
          <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shrink-0 shadow-2xs">
            <i :class="badge.icon || 'fa-solid fa-shield-halved'"></i>
          </div>
          <div class="min-w-0 space-y-0.5">
            <h3 class="text-sm sm:text-base font-black text-[#0B0E28] block tracking-tight truncate">
              {{ badge.title }}
            </h3>
            <p class="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">
              {{ badge.desc }}
            </p>
          </div>
        </div>

      </div>
    </section>

    <!-- 3. MAIN PRIVACY POLICY CONTENT & SIDEBAR -->
    <section class="py-12 sm:py-20">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Main Content Card -->
          <div class="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-start">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-base font-bold">
                  <i class="fa-solid fa-file-shield"></i>
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-black text-[#0B0E28]">
                    {{ currentLanguage === 'en' ? 'Privacy Terms & User Rights' : 'بنود الخصوصية وحقوق المستخدم' }}
                  </h2>
                  <span class="text-xs text-slate-400">
                    {{ currentLanguage === 'en' ? 'Last revised and active across all store platforms' : 'سياسة سارية ومحدثة لكافة منصات متجر أسوار جدة' }}
                  </span>
                </div>
              </div>

              <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{{ currentLanguage === 'en' ? 'Official Policy' : 'سياسة معتمدة ومحمية' }}</span>
              </span>
            </div>

            <!-- Policy Rich Text HTML Content -->
            <div 
              class="text-slate-600 font-normal leading-relaxed text-sm sm:text-base space-y-4 policy-prose"
              v-html="displayContent"
            ></div>

          </div>

          <!-- Sidebar Guide & Contact Support -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Quick Summary Card (100% Dynamic) -->
            <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-start">
              <h3 class="text-base font-black text-[#0B0E28] flex items-center gap-2 border-b border-slate-100 pb-3">
                <i class="fa-solid fa-circle-info text-amber-500"></i>
                <span>{{ displaySummaryTitle }}</span>
              </h3>

              <ul class="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li 
                  v-for="(point, idx) in displaySummaryPoints" 
                  :key="idx"
                  class="flex items-start gap-2.5"
                >
                  <i class="fa-solid fa-check text-emerald-500 mt-1 shrink-0"></i>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- Privacy Officer / Contact Support Card (100% Dynamic) -->
            <div class="bg-gradient-to-br from-[#0B0E28] to-slate-900 p-6 sm:p-7 rounded-3xl text-white space-y-4 text-start shadow-xl">
              <div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl">
                <i class="fa-solid fa-envelope-shield"></i>
              </div>

              <div>
                <h3 class="text-base font-black text-white">
                  {{ displayInquiryBox.title }}
                </h3>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                  {{ displayInquiryBox.desc }}
                </p>
              </div>

              <div class="pt-2 flex flex-col gap-2.5">
                <NuxtLink 
                  :to="localePath(displayInquiryBox.contactUrl || '/contact-us')" 
                  class="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20"
                >
                  <i class="fa-solid fa-envelope text-xs"></i>
                  <span>{{ displayInquiryBox.contactBtn }}</span>
                </NuxtLink>

                <a 
                  :href="displayInquiryBox.whatsappUrl" 
                  target="_blank" 
                  class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  <i class="fa-brands fa-whatsapp text-sm text-emerald-400"></i>
                  <span>{{ displayInquiryBox.whatsappBtn }}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, watch, onMounted, onUnmounted } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { usePrivacyPolicy } from '~/composables/usePrivacyPolicy'

const { t, layoutDirection, currentLanguage, localePath } = useLanguage()
const {
  policyData,
  isLoading,
  fetchPublicPrivacyPolicy,
  displayTitle,
  displaySubtitle,
  displayContent,
  displayBadges,
  displaySummaryTitle,
  displaySummaryPoints,
  displayInquiryBox,
  displayMetaTitle,
  displayMetaDescription
} = usePrivacyPolicy()

// Nuxt AsyncData for instant SSR & Client Hydration with Cache Control
const { refresh } = useAsyncData('privacy-policy-public', () => fetchPublicPrivacyPolicy(true))

// Watch language change to re-fetch with new locale
watch(currentLanguage, () => {
  fetchPublicPrivacyPolicy(true)
})

// Auto sync when updated from Admin Dashboard without page reload
onMounted(() => {
  fetchPublicPrivacyPolicy(true)
  if (process.client) {
    const handleUpdate = () => {
      fetchPublicPrivacyPolicy(true)
    }
    window.addEventListener('aswar:privacy-policy-updated', handleUpdate)
    onUnmounted(() => {
      window.removeEventListener('aswar:privacy-policy-updated', handleUpdate)
    })
  }
})

useHead({
  title: computed(() => displayMetaTitle.value),
  meta: [
    { name: 'description', content: computed(() => displayMetaDescription.value) }
  ]
})
</script>

<style scoped>
.policy-prose :deep(h3) {
  font-size: 1.125rem;
  font-weight: 900;
  color: #0B0E28;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.policy-prose :deep(p) {
  margin-bottom: 0.75rem;
  line-height: 1.75;
  color: #475569;
}
.policy-prose :deep(strong) {
  color: #0B0E28;
  font-weight: 800;
}
.policy-prose :deep(ul) {
  list-style-type: disc;
  margin-inline-start: 1.5rem;
  margin-bottom: 1rem;
  color: #475569;
}
.policy-prose :deep(li) {
  margin-bottom: 0.35rem;
  line-height: 1.6;
}
</style>
