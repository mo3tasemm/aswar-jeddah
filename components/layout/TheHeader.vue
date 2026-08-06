<template>
  <header class="sticky top-0 left-0 right-0 z-50 w-full dir-rtl transition-all duration-500 ease-in-out will-change-transform" dir="rtl">
    
    <!-- 1. Top Header Bar (Scroll Morphing) -->
    <div 
      :class="[
        'transition-all duration-500 ease-in-out px-4 lg:px-8 border-b will-change-transform',
        isScrolled 
          ? 'bg-[#0B0E28]/95 backdrop-blur-md text-white py-2 shadow-xl border-slate-800' 
          : 'bg-white text-slate-900 py-4 shadow-sm border-slate-100'
      ]" 
      dir="rtl"
    >
      <div class="max-w-[1550px] mx-auto flex items-center justify-between gap-4 lg:gap-8 relative">
        
        <!-- Mobile Hamburger Button (Right in RTL) -->
        <div class="flex md:hidden w-1/3 justify-start">
          <button 
            @click="isMobileMenuOpen = true"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        
        <!-- Part 1: Logo (Center on mobile, Right on Desktop) -->
        <div class="w-1/3 md:w-auto flex justify-center md:justify-start">
          <NuxtLink to="/" class="flex items-center shrink-0 group">
            <img 
              src="~/assets/images/Logo.png" 
              alt="اسوار جدة" 
              :class="[
                'w-auto object-contain transition-all duration-500 ease-in-out group-hover:scale-105',
                isScrolled ? 'h-10 lg:h-12' : 'h-11 lg:h-20'
              ]" 
            />
          </NuxtLink>
        </div>

        <!-- Part 2: Search Bar -->
        <div class="flex-1 max-w-xl hidden md:block relative">
          <form @submit.prevent="handleSearch" class="relative">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="دور واختر على راحتك.." 
              :class="[
                'w-full transition-all duration-500 rounded-full text-xs lg:text-sm font-medium outline-none text-right',
                isScrolled 
                  ? 'bg-white/10 text-white placeholder-slate-300 border border-white/20 focus:border-amber-400 py-2 px-5 pl-12 pr-5 shadow-inner' 
                  : 'bg-slate-100 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-slate-800 py-2.5 px-5 pl-12 pr-5 shadow-inner'
              ]"
            />
            <button 
              type="submit" 
              :class="[
                'absolute left-1 top-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all shadow-sm',
                isScrolled ? 'w-7 h-7 bg-amber-500 text-slate-950 hover:bg-amber-400' : 'w-8 h-8 bg-[#0B0E28] text-white hover:bg-slate-900'
              ]"
              title="بحث"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Left Controls Group (Parts 3, 4, 5) -->
        <div class="w-1/3 md:w-auto flex items-center justify-end gap-4 lg:gap-7 shrink-0">
          
          <!-- Part 3: Account Icon (Redirects to Login Page) -->
          <NuxtLink 
            to="/login"
            class="hidden md:flex items-center gap-2 group text-right focus:outline-none"
            title="حسابي / تسجيل الدخول"
          >
            <div 
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border',
                isScrolled 
                  ? 'bg-slate-800/80 text-white group-hover:bg-amber-500 group-hover:text-slate-950 border-slate-700/80' 
                  : 'bg-slate-100 text-slate-700 group-hover:bg-slate-900 group-hover:text-white border-slate-200'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <div class="hidden xl:flex flex-col text-xs text-right">
              <span :class="isScrolled ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'">حسابي</span>
              <span :class="['font-bold transition-colors', isScrolled ? 'text-white group-hover:text-amber-400' : 'text-slate-900 group-hover:text-amber-600']">
                تسجيل الدخول
              </span>
            </div>
          </NuxtLink>

          <!-- Divider -->
          <div :class="['h-8 w-px hidden sm:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- Part 4: Hotline (Customer Service) -->
          <a 
            href="tel:01286000037" 
            class="hidden lg:flex items-center gap-3 group text-right"
          >
            <div 
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border',
                isScrolled 
                  ? 'bg-slate-800/80 text-amber-400 border-slate-700/80' 
                  : 'bg-slate-100 text-amber-600 border-slate-200'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-3.728 0-7.382-1.026-10.5-2.985A1.125 1.125 0 013 19.125V14.25c0-.568.422-1.048.987-1.106a48.554 48.554 0 0010.026 0 1.106 1.106 0 00.987 1.106v4.875c0 .485-.309.914-.76 1.054a24.237 24.237 0 01-4.24.475z" />
              </svg>
            </div>
            <div class="flex flex-col text-xs text-right">
              <span :class="isScrolled ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'">الخط الساخن</span>
              <span :class="['font-bold dir-ltr tracking-wider', isScrolled ? 'text-amber-400' : 'text-slate-900']">01286000037</span>
            </div>
          </a>

          <!-- Divider -->
          <div :class="['h-8 w-px hidden lg:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- Part 5: Cart Section & Amount (Desktop) -->
          <button 
            @click="toggleCart" 
            :class="[
              'hidden md:flex items-center gap-3 px-3.5 py-1.5 rounded-full transition-all relative group cursor-pointer shadow-sm border',
              isScrolled 
                ? 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white'
            ]"
          >
            <!-- Badge -->
            <span :class="['w-5 h-5 rounded-full font-black text-xs flex items-center justify-center shadow-md shrink-0 transition-colors', isScrolled ? 'bg-white text-[#0B0E28]' : 'bg-amber-500 text-slate-950']">
              {{ cartCount }}
            </span>

            <!-- Total Price -->
            <div class="flex flex-col text-xs text-right">
              <span class="text-[10px] text-slate-300">السلة</span>
              <span class="font-black text-amber-400 dir-ltr text-xs lg:text-sm">
                {{ formattedCartTotal }}
              </span>
            </div>

            <!-- Cart Icon -->
            <div class="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 md:w-4 md:h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </button>

          <!-- Mobile Cart Button -->
          <button 
            @click="toggleCart" 
            class="md:hidden relative flex items-center justify-center p-1 group focus:outline-none"
            title="السلة"
          >
            <!-- Shopping Cart Icon Outline -->
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" :class="['w-7 h-7 transition-colors', isScrolled ? 'text-white' : 'text-slate-900']">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <!-- Badge over the cart -->
            <span :class="['absolute -top-1.5 -left-1 w-[22px] h-[22px] rounded-full flex items-center justify-center text-[11px] font-black shadow-sm transition-colors', isScrolled ? 'bg-white text-[#0B0E28]' : 'bg-amber-500 text-slate-950']">
              {{ cartCount }}
            </span>
          </button>

        </div>

      </div>

      <!-- Mobile Search Bar (under logo on small screens, hides on scroll) -->
      <div 
        :class="[
          'md:hidden overflow-hidden transition-all duration-500 ease-in-out',
          isScrolled ? 'max-h-0 opacity-0 mt-0 pointer-events-none' : 'max-h-20 opacity-100 mt-3'
        ]"
      >
        <form @submit.prevent="handleSearch" class="relative">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="دور واختر على راحتك.." 
            :class="[
              'w-full text-right px-4 py-2.5 pl-10 pr-4 rounded-full text-xs outline-none shadow-inner transition-colors',
              isScrolled ? 'bg-white/10 text-white placeholder-slate-300' : 'bg-slate-100 text-slate-900 placeholder-slate-400'
            ]"
          />
          <button 
            type="submit" 
            class="absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0B0E28] text-white flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </form>
      </div>
    </div>

    <!-- 2. Bottom Navigation Bar (Desktop Only) -->
    <nav 
      :class="[
        'hidden md:block bg-[#EBF2FA] border-b border-slate-200/70 overflow-hidden transition-all duration-500 ease-in-out no-scrollbar',
        isScrolled ? 'max-h-0 py-0 opacity-0 pointer-events-none' : 'max-h-16 py-2.5 opacity-100'
      ]" 
      dir="rtl"
    >
      <div class="max-w-[1550px] mx-auto flex items-center justify-between md:justify-center gap-1 md:gap-4 lg:gap-6 text-xs lg:text-sm font-bold text-slate-800 whitespace-nowrap">
        
        <NuxtLink 
          v-for="(cat, idx) in navCategories" 
          :key="cat.name"
          :to="cat.url"
          :prefetch="true"
          class="flex items-center gap-3 px-3 py-1 text-slate-700 hover:text-amber-600 transition-colors group"
        >
          <span>{{ cat.name }}</span>
          <!-- Soft divider line between items -->
          <span v-if="idx < navCategories.length - 1" class="text-slate-300 font-light select-none">|</span>
        </NuxtLink>

      </div>
    </nav>

    <!-- 3. Mobile Navigation Drawer -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] md:hidden" @click="isMobileMenuOpen = false"></div>
      </Transition>
      
      <div 
        class="fixed top-0 bottom-0 right-0 z-[110] w-[85%] max-w-sm bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col"
        :class="isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'"
        dir="rtl"
      >
      <div class="flex items-center justify-between p-4 border-b border-slate-100">
        <img src="~/assets/images/Logo.png" alt="اسوار جدة" class="h-10 object-contain" />
        <button @click="isMobileMenuOpen = false" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        
        <!-- Mobile Actions -->
        <div class="flex flex-col gap-3 mb-6 pb-6 border-b border-slate-100">
          <NuxtLink to="/login" @click="isMobileMenuOpen = false" class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors">
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            حسابي / تسجيل الدخول
          </NuxtLink>
          
          <a href="tel:01286000037" class="flex items-center gap-3 p-3 rounded-2xl bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition-colors">
            <div class="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-3.728 0-7.382-1.026-10.5-2.985A1.125 1.125 0 013 19.125V14.25c0-.568.422-1.048.987-1.106a48.554 48.554 0 0010.026 0 1.106 1.106 0 00.987 1.106v4.875c0 .485-.309.914-.76 1.054a24.237 24.237 0 01-4.24.475z" />
              </svg>
            </div>
            خدمة العملاء: 01286000037
          </a>
        </div>

        <NuxtLink 
          v-for="cat in navCategories" 
          :key="cat.name"
          :to="cat.url"
          :prefetch="true"
          @click="isMobileMenuOpen = false"
          class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl text-slate-800 font-bold active:bg-amber-100 transition-colors"
        >
          {{ cat.name }}
          <svg class="w-4 h-4 text-slate-400 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </NuxtLink>
      </div>
      </div>
    </Teleport>

  </header>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import { useCart } from '~/composables/useCart';
import { useAuthDrawer } from '~/composables/useAuthDrawer';

const { toggleCart, cartCount, formattedCartTotal } = useCart();
const { toggleLogin } = useAuthDrawer();

const searchQuery = ref('');
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

// Add overflow hidden to body when mobile menu is open
watch(isMobileMenuOpen, (isOpen) => {
  if (process.client) {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});

onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50;
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

const navCategories = [
  { name: 'الأجهزة الكهربائية', url: '/category/appliances' },
  { name: 'الأدوات المنزلية', url: '/category/houseware' },
  { name: 'النظم الأمنية', url: '/category/security' },
  { name: 'لاب توب وكمبيوتر', url: '/category/laptops' },
  { name: 'أنظمة الشبكات', url: '/category/networks' },
  { name: 'أنظمة الكاشير', url: '/category/pos' },
  { name: 'موبايل وثابت', url: '/category/mobile' },
  { name: 'سكوتر', url: '/category/scooter' },
  { name: 'المدونة 📝', url: '/blog' },
];

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
};
</script>

<style scoped>
/* Hide scrollbar for category navigation */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
