<template>
  <div class="min-h-screen bg-slate-50 text-slate-900" :dir="layoutDirection">

    <!-- 1. LUXURY DARK HERO SECTION -->
    <section class="relative bg-[#0B0E28] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden">
      <!-- Ambient Glow & Lighting Effect -->
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
            <i class="fa-solid fa-shield-check text-xs"></i>
            <span>{{ currentLanguage === 'en' ? 'Customer Protection & Rights' : 'حقوق المستهلك والضمان' }}</span>
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

    <!-- 2. ELEVATED HIGHLIGHTS BAR -->
    <section class="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-slate-100">
        
        <div 
          v-for="(item, idx) in displayHighlights" 
          :key="item.id || idx"
          class="p-2.5 sm:p-3 flex items-start gap-3.5 text-start min-w-0"
        >
          <div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shrink-0 shadow-2xs">
            <i :class="item.icon || 'fa-solid fa-check'"></i>
          </div>
          <div class="min-w-0 space-y-0.5">
            <h3 class="text-sm sm:text-base font-black text-[#0B0E28] block tracking-tight truncate">{{ item.title }}</h3>
            <p class="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">{{ item.desc }}</p>
          </div>
        </div>

      </div>
    </section>

    <!-- 3. MAIN POLICY CONTENT & RETURN STEPS -->
    <section class="py-12 sm:py-20">
      <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          <!-- Main Content Card -->
          <div class="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-start">
            
            <div class="flex items-center justify-between border-b border-slate-100 pb-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-base font-bold">
                  <i class="fa-solid fa-scale-balanced"></i>
                </div>
                <div>
                  <h2 class="text-lg sm:text-xl font-black text-[#0B0E28]">
                    {{ currentLanguage === 'en' ? 'Policy Guidelines & Conditions' : 'الشروط والأحكام التفصيلية' }}
                  </h2>
                  <span class="text-xs text-slate-400">
                    {{ currentLanguage === 'en' ? 'Compliant with Ministry of Commerce Regulations' : 'متوافقة مع اشتراطات وزارة التجارة السعودية' }}
                  </span>
                </div>
              </div>

              <span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{{ currentLanguage === 'en' ? 'Active Policy' : 'سياسة سارية ومعتمدة' }}</span>
              </span>
            </div>

            <!-- Policy Rich Text HTML Content -->
            <div 
              class="text-slate-600 font-normal leading-relaxed text-sm sm:text-base space-y-4 policy-prose"
              v-html="displayContent"
            ></div>

          </div>

          <!-- Sidebar Guide & Help -->
          <div class="lg:col-span-4 space-y-6">
            
            <!-- Step-by-Step Return Process (100% Dynamic) -->
            <div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 text-start">
              <h3 class="text-base font-black text-[#0B0E28] flex items-center gap-2 border-b border-slate-100 pb-3">
                <i class="fa-solid fa-list-check text-amber-500"></i>
                <span>{{ displayStepsTitle }}</span>
              </h3>

              <ol class="space-y-4 relative before:absolute before:top-3 before:bottom-3 before:start-4 before:w-0.5 before:bg-slate-100">
                <li 
                  v-for="step in displaySteps" 
                  :key="step.number"
                  class="relative flex items-start gap-3.5 z-10"
                >
                  <span 
                    :class="[
                      'w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 shadow-xs',
                      step.number === 4 ? 'bg-amber-400 text-[#0B0E28]' : 'bg-[#0B0E28] text-amber-400'
                    ]"
                  >
                    {{ step.number }}
                  </span>
                  <div class="space-y-0.5 pt-0.5 min-w-0">
                    <h4 class="font-bold text-xs sm:text-sm text-[#0B0E28]">{{ step.title }}</h4>
                    <p class="text-[11px] sm:text-xs text-slate-500 leading-tight">{{ step.desc }}</p>
                  </div>
                </li>
              </ol>
            </div>

            <!-- Help & Contact CTA Box (100% Dynamic) -->
            <div class="bg-gradient-to-br from-[#0B0E28] to-slate-900 p-6 sm:p-7 rounded-3xl text-white space-y-4 text-start shadow-xl">
              <div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl">
                <i class="fa-solid fa-headset"></i>
              </div>

              <div>
                <h3 class="text-base font-black text-white">
                  {{ displayHelpBox.title }}
                </h3>
                <p class="text-xs text-slate-300 mt-1 leading-relaxed">
                  {{ displayHelpBox.desc }}
                </p>
              </div>

              <div class="pt-2 flex flex-col gap-2.5">
                <a 
                  :href="displayHelpBox.whatsapp" 
                  target="_blank" 
                  class="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
                >
                  <i class="fa-brands fa-whatsapp text-sm"></i>
                  <span>{{ displayHelpBox.whatsappBtn }}</span>
                </a>

                <NuxtLink 
                  :to="localePath(displayHelpBox.contactUrl || '/contact-us')" 
                  class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
                >
                  <i class="fa-solid fa-envelope text-xs"></i>
                  <span>{{ displayHelpBox.contactBtn }}</span>
                </NuxtLink>
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
import { useReturnPolicy } from '~/composables/useReturnPolicy'

const { t, layoutDirection, currentLanguage, localePath } = useLanguage()
const {
  policyData,
  isLoading,
  fetchPublicReturnPolicy,
  displayTitle,
  displaySubtitle,
  displayContent,
  displayHighlights,
  displayStepsTitle,
  displaySteps,
  displayHelpBox
} = useReturnPolicy()

// Nuxt AsyncData for instant SSR & Client Hydration with Cache Control
const { refresh } = useAsyncData('return-policy-public', () => fetchPublicReturnPolicy(true))

// Watch language change to re-fetch with new locale
watch(currentLanguage, () => {
  fetchPublicReturnPolicy(true)
})

// Auto sync when updated from Admin Dashboard without page reload
onMounted(() => {
  fetchPublicReturnPolicy(true)
  if (process.client) {
    const handleUpdate = () => {
      fetchPublicReturnPolicy(true)
    }
    window.addEventListener('aswar:return-policy-updated', handleUpdate)
    onUnmounted(() => {
      window.removeEventListener('aswar:return-policy-updated', handleUpdate)
    })
  }
})

useHead({
  title: computed(() => `${displayTitle.value} | أسوار جدة`),
  meta: [
    { name: 'description', content: computed(() => displaySubtitle.value) }
  ]
})
</script>
