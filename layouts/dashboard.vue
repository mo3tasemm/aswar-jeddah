<template>
  <div class="min-h-screen flex bg-slate-50 font-sans" dir="rtl">
    
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-l border-slate-200 hidden md:flex flex-col shrink-0">
      <!-- Logo Area -->
      <div class="h-16 flex items-center px-6 border-b border-slate-100">
        <NuxtLink to="/dashboard" class="flex items-center gap-3">
          <img src="~/assets/images/Logo.png" alt="Aswar Logo" class="w-24 h-24 object-contain">
        </NuxtLink>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        <NuxtLink 
          v-for="link in navLinks" 
          :key="link.to"
          :to="link.to" 
          :exact="link.exact"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
          active-class="!bg-indigo-50 !text-indigo-600"
        >
          <span v-html="link.icon" class="w-5 h-5"></span>
          {{ link.label }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 flex flex-col min-w-0 relative">
      
      <!-- Topbar -->
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30">
        <!-- Mobile Menu Toggle (Placeholder) -->
        <button class="md:hidden p-2 -mr-2 text-slate-500 hover:bg-slate-100 rounded-lg">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div class="flex-1"></div>

        <!-- User Actions -->
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
            المتجر
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </NuxtLink>
          <div class="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-sm">
            م
          </div>
        </div>
      </header>

      <!-- Page Content -->
      <div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
        <slot />
      </div>

    </main>
    
    <!-- Global Dashboard Toast -->
    <TheToast />
    
    <!-- Modals Container (Target for Teleport) -->
    <div id="modals"></div>
  </div>
</template>

<script setup lang="ts">
import TheToast from '~/components/dashboard/ui/TheToast.vue'

const navLinks = [
  {
    to: '/dashboard',
    label: 'الرئيسية',
    exact: true,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>'
  },
  {
    to: '/dashboard/analytics',
    label: 'التقارير',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>'
  },
  {
    to: '/dashboard/products',
    label: 'المنتجات',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>'
  },
  {
    to: '/dashboard/categories',
    label: 'التصنيفات',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>'
  },
  {
    to: '/dashboard/brands',
    label: 'العلامات التجارية',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>'
  },
  {
    to: '/dashboard/orders',
    label: 'الطلبات',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
  },
  {
    to: '/dashboard/customers',
    label: 'العملاء',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>'
  },
  {
    to: '/dashboard/coupons',
    label: 'الكوبونات',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>'
  },
  {
    to: '/dashboard/settings',
    label: 'الإعدادات',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>'
  },
  {
    to: '/dashboard/staff',
    label: 'المشرفين',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>'
  },
  {
    to: '/dashboard/storefront',
    label: 'الواجهة الرئيسية',
    exact: false,
    icon: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>'
  }
]
</script>
