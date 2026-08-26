<template>
  <div class="max-w-[1300px] mx-auto px-4 lg:px-6 my-16">
    <div class="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
      
      <!-- Right Side (Text Info in RTL) -->
      <div class="w-full lg:w-1/2 p-8 lg:p-14 flex flex-col justify-center space-y-8">
        <div>
          <span class="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full inline-block mb-3">
            {{ resolvedBadge }}
          </span>
          <h2 class="text-2xl md:text-3xl font-bold text-slate-900">{{ resolvedTitle }}</h2>
        </div>

        <div class="space-y-6">
          <!-- Address -->
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-1">
              <!-- MapPin Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-400 mb-1">العنوان</h3>
              <p class="text-slate-800 font-medium leading-relaxed">{{ resolvedAddress }}</p>
            </div>
          </div>

          <!-- Phone -->
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-1">
              <!-- Phone Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.223-3.923-6.819-6.819l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-400 mb-1">رقم الهاتف</h3>
              <a :href="`tel:${resolvedPhone}`" class="text-slate-800 font-bold hover:text-amber-600 transition-colors dir-ltr inline-block">{{ resolvedPhone }}</a>
            </div>
          </div>

          <!-- Working Hours -->
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-amber-600 shrink-0 mt-1">
              <!-- Clock Icon -->
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-slate-400 mb-1">مواعيد العمل</h3>
              <p class="text-slate-800 font-medium">{{ resolvedWorkingHours }}</p>
            </div>
          </div>
        </div>

        <!-- Google Maps Button -->
        <div>
          <a 
            :href="resolvedMapsUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors w-fit font-medium mt-4 shadow-sm"
          >
            <!-- Navigation Icon -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            <span>عرض الاتجاهات على خرائط جوجل</span>
          </a>
        </div>
      </div>

      <!-- Left Side (Interactive Google Map) -->
      <div class="w-full lg:w-1/2 min-h-[350px] lg:min-h-[450px] relative overflow-hidden bg-slate-100 group/map">
        <iframe
          :src="resolvedMapEmbedUrl"
          class="absolute inset-0 w-full h-full border-0 filter contrast-[1.05] grayscale-[25%] hover:grayscale-0 transition-all duration-500"
          allowfullscreen
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="موقع معرض أسوار جدة"
        ></iframe>

        <!-- Floating Luxury Pin Card Overlay -->
        <div class="absolute top-4 right-4 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700/50 flex items-center gap-3 pointer-events-none z-10 transition-transform duration-300 group-hover/map:scale-105">
          <div class="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold shrink-0 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path fill-rule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
            </svg>
          </div>
          <div>
            <p class="text-xs font-bold text-slate-100">معرض أسوار جدة الرئيسي</p>
            <p class="text-[11px] text-amber-400 font-medium mt-0.5">{{ resolvedAddress }}</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  config?: {
    badge?: string
    branch_badge?: string
    title?: string
    address?: string
    phone?: string
    workingHours?: string
    working_hours?: string
    mapsUrl?: string
    maps_url?: string
    mapEmbedUrl?: string
    map_embed_url?: string
  }
}>()

const resolvedBadge = computed(() => {
  return props.config?.branch_badge || props.config?.badge || 'فرعنا الرئيسي'
})

const resolvedTitle = computed(() => {
  return props.config?.title || 'تفضل بزيارة معرضنا الرئيسي'
})

const resolvedAddress = computed(() => {
  return props.config?.address || 'جدة، المملكة العربية السعودية'
})

const resolvedPhone = computed(() => {
  return props.config?.phone || '01286000037'
})

const resolvedWorkingHours = computed(() => {
  return props.config?.working_hours || props.config?.workingHours || 'يومياً من 10 صباحاً حتى 11 مساءً'
})

const resolvedMapsUrl = computed(() => {
  return props.config?.maps_url || props.config?.mapsUrl || 'https://maps.google.com/?q=Jeddah'
})

const resolvedMapEmbedUrl = computed(() => {
  return props.config?.map_embed_url || props.config?.mapEmbedUrl || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d118830.2492582855!2d39.1601664!3d21.5433334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d01fb1137e59%3A0xe059579737b118db!2sJeddah%20Saudi%20Arabia!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa'
})
</script>
