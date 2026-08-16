<template>
  <footer class="w-full" :dir="layoutDirection">
    
    <!-- 1. Main Footer Content (Dark Navy #0B0E28) -->
    <div class="bg-[#0B0E28] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div class="max-w-[1550px] mx-auto px-4 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-start">
          
          <!-- Column 1: Brand Info & Social Media -->
          <div class="space-y-4">
            <!-- Logo -->
            <NuxtLink to="/" class="inline-block">
              <img 
                src="~/assets/images/Logo.png" 
                alt="أسوار جدة - Aswar Jeddah" 
                class="h-12 lg:h-14 w-auto object-contain" 
              />
            </NuxtLink>

            <!-- Description -->
            <p class="text-slate-400 text-sm leading-relaxed mt-4 mb-6">
              {{ t('footer.about') }}
            </p>

            <!-- Social Media Title -->
            <h4 class="text-white font-bold text-sm mb-3">
              {{ t('footer.follow_us') }}
            </h4>

            <!-- Social Media Icons -->
            <div class="flex items-center gap-3">
              <!-- Facebook -->
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                :title="t('footer.facebook')"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <!-- Instagram -->
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                :title="t('footer.instagram')"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <!-- TikTok -->
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noopener noreferrer"
                class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"
                :title="t('footer.tiktok')"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.56-1.35 2.56-.03 1.18.63 2.34 1.64 2.92.93.55 2.1.62 3.09.23 1.05-.41 1.83-1.38 2.01-2.5.07-.63.05-1.27.05-1.91V.02z"/>
                </svg>
              </a>
            </div>
          </div>

          <!-- Column 2: Top Categories -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">
              {{ t('nav.categories') }}
            </h3>
            <ul class="space-y-1">
              <li v-for="link in categoryLinks" :key="link.name">
                <NuxtLink 
                  :to="link.url" 
                  class="transition-all duration-300 hover:text-white hover:translate-x-1.5 rtl:hover:-translate-x-1.5 block py-1.5 text-sm text-slate-400"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 3: My Account -->
          <div>
            <h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">
              {{ t('nav.account') }}
            </h3>
            <ul class="space-y-1">
              <li v-for="link in accountLinks" :key="link.name">
                <NuxtLink 
                  :to="link.url" 
                  class="transition-all duration-300 hover:text-white hover:translate-x-1.5 rtl:hover:-translate-x-1.5 block py-1.5 text-sm text-slate-400"
                >
                  {{ link.name }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 4: Contact & Hotline -->
          <div class="space-y-4">
            <h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[''] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">
              {{ t('footer.contact_us') }}
            </h3>
            
            <ul class="space-y-3 text-sm text-slate-400">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{{ t('footer.address') }}</span>
              </li>

              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.001 1.001 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:01286000037" class="hover:text-amber-400 transition-colors font-bold dir-ltr">01286000037</a>
              </li>

              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@aswarjeddah.com" class="hover:text-amber-400 transition-colors font-medium">info@aswarjeddah.com</a>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

    <!-- 2. Bottom Footer Bar (Copyright & Payments) -->
    <div class="bg-[#07091B] text-slate-400 text-xs py-6 border-t border-slate-900">
      <div class="max-w-[1550px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="font-medium text-center md:text-start">
          {{ copyrightText }}
        </p>

        <!-- Payment Badges Placeholder -->
        <div class="flex items-center gap-3">
          <span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">mada</span>
          <span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">VISA</span>
          <span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">MasterCard</span>
          <span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-amber-400">Apple Pay</span>
        </div>
      </div>
    </div>

  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

const currentYear = computed(() => new Date().getFullYear())

const copyrightText = computed(() => {
  return t('footer.rights').replace('{year}', String(currentYear.value))
})

const categoryLinks = computed(() => [
  { name: t('cat.appliances'), url: '/category/appliances' },
  { name: t('cat.houseware'), url: '/category/houseware' },
  { name: t('cat.security'), url: '/category/security' },
  { name: t('cat.laptops'), url: '/category/laptops' },
  { name: t('cat.networks'), url: '/category/networks' },
])

const accountLinks = computed(() => [
  { name: t('nav.account'), url: '/my-account' },
  { name: t('product.wishlist'), url: '/my-account/wishlist' },
  { name: t('product.compare'), url: '/compare' },
  { name: t('nav.cart'), url: '/cart' },
])
</script>
