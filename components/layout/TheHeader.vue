<template>
  <header 
    :class="[
      'sticky top-0 z-50 w-full font-sans shadow-md border-b transition-all duration-300 ease-in-out gpu-header',
      isScrolled 
        ? 'bg-[#0B0E28]/95 backdrop-blur-md border-slate-800 text-white py-2' 
        : 'bg-white border-slate-200/80 text-slate-900 py-3 sm:py-4'
    ]"
    :dir="layoutDirection"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Top Row: Logo, Search, Quick Tools, Cart -->
      <div class="flex items-center justify-between gap-3 md:gap-6">
        
        <!-- Part 1: Logo & Mobile Drawer Toggle -->
        <div class="flex items-center gap-3 shrink-0">
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            :class="['lg:hidden p-2 rounded-xl border transition-all cursor-pointer', isScrolled ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-900']"
            aria-label="القائمة"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <NuxtLink to="/" class="flex items-center gap-2 group">
            <img 
              src="~/assets/images/Logo.png" 
              alt="أسوار جدة - Aswar Jeddah" 
              :class="['transition-all duration-300 object-contain', isScrolled ? 'h-9 sm:h-10' : 'h-11 sm:h-14']"
            />
          </NuxtLink>
        </div>

        <!-- Part 2: Search Bar (Desktop - Logical Properties) -->
        <div class="hidden md:flex flex-1 max-w-2xl mx-2 lg:mx-4">
          <form @submit.prevent="handleSearch" class="relative w-full">
            <input 
              v-model="searchQuery"
              type="text" 
              :placeholder="t('nav.search_placeholder')"
              :class="[
                'w-full ps-4 pe-12 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2',
                isScrolled 
                  ? 'bg-slate-900/90 text-white placeholder-slate-400 border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20' 
                  : 'bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 shadow-inner'
              ]"
            />
            <button 
              type="submit"
              class="absolute end-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer"
              title="بحث"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>

        <!-- Part 3: Tools (Compare, Profile, Hotline, Language, Cart) -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <!-- Profile / Account Button & Dropdown -->
          <div class="relative group">
            
            <!-- Guest Login Drawer Button -->
            <button 
              v-if="!isLoggedIn"
              @click="toggleLogin" 
              :class="[
                'flex items-center gap-2 group/btn text-start focus:outline-none cursor-pointer',
                isScrolled ? 'text-white' : 'text-slate-900'
              ]"
              :title="t('nav.login')"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border',
                  isScrolled 
                    ? 'bg-slate-800/80 text-white group-hover/btn:bg-amber-500 group-hover/btn:text-slate-950 border-slate-700/80' 
                    : 'bg-slate-100 text-slate-700 group-hover/btn:bg-slate-900 group-hover/btn:text-white border-slate-200'
                ]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div class="hidden xl:flex flex-col text-xs text-start">
                <span :class="isScrolled ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'">{{ t('account.welcome_user') }}</span>
                <span :class="['font-bold transition-colors', isScrolled ? 'text-white group-hover/btn:text-amber-400' : 'text-slate-900 group-hover/btn:text-amber-600']">
                  {{ t('nav.login') }}
                </span>
              </div>
            </button>

            <!-- Authenticated User Profile Link & Avatar -->
            <NuxtLink 
              v-else
              to="/my-account"
              class="flex items-center gap-2 group/btn text-start focus:outline-none cursor-pointer"
              :title="t('nav.account')"
            >
              <div 
                :class="[
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border overflow-hidden shrink-0 bg-slate-100',
                  isScrolled 
                    ? 'bg-slate-800/80 text-white border-slate-700/80' 
                    : 'bg-slate-100 text-slate-700 border-slate-200'
                ]"
              >
                <img 
                  v-if="userHeaderAvatarUrl && !headerImgError" 
                  :src="userHeaderAvatarUrl" 
                  @error="headerImgError = true"
                  class="w-full h-full object-cover rounded-full" 
                  alt="User Avatar" 
                />
                <span v-else class="text-sm font-black text-amber-500">
                  {{ userName.charAt(0).toUpperCase() }}
                </span>
              </div>
              <div class="hidden xl:flex flex-col text-xs text-start">
                <span :class="isScrolled ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'">{{ t('account.welcome_user') }}</span>
                <span :class="['font-bold transition-colors truncate max-w-[120px]', isScrolled ? 'text-white group-hover/btn:text-amber-400' : 'text-slate-900 group-hover/btn:text-amber-600']">
                  {{ userName }}
                </span>
              </div>
              <svg class="w-3.5 h-3.5 text-slate-400 group-hover/btn:rotate-180 transition-transform hidden xl:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </NuxtLink>

            <!-- Auth Dropdown Menu (Only when Logged In) -->
            <div 
              v-if="isLoggedIn"
              class="absolute start-0 top-full pt-3 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50 pointer-events-none group-hover:pointer-events-auto"
              :dir="layoutDirection"
            >
              <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-start">
                
                <!-- User Header Badge -->
                <div class="px-4 py-3 bg-slate-50 rounded-xl mb-2 border border-slate-100/80">
                  <div class="flex items-center gap-2.5 mb-1">
                    <div class="w-8 h-8 rounded-full bg-[#0B0E28] text-amber-400 text-xs font-black flex items-center justify-center shrink-0 overflow-hidden border border-slate-200">
                      <img 
                        v-if="userHeaderAvatarUrl && !headerImgError" 
                        :src="userHeaderAvatarUrl" 
                        @error="headerImgError = true"
                        class="w-full h-full object-cover rounded-full" 
                        alt="Avatar" 
                      />
                      <span v-else>
                        {{ userName.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <p class="font-black text-sm text-[#0B0E28] truncate">{{ userName }}</p>
                  </div>
                  <p v-if="userEmail" class="text-[11px] text-slate-500 truncate dir-ltr text-start">{{ userEmail }}</p>
                </div>

                <!-- Nav Menu Links -->
                <div class="space-y-1 text-xs font-bold text-slate-700">
                  <NuxtLink to="/my-account" class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-[#0B0E28] transition-colors">
                    <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v7h-7z"></path><path d="M14 14h7v7h-7z"></path><path d="M3 14h7v7H3z"></path></svg>
                    <span>{{ t('nav.account') }}</span>
                  </NuxtLink>
                </div>

                <!-- Divider & Logout -->
                <div class="mt-2 pt-2 border-t border-slate-100">
                  <button 
                    @click="logout"
                    class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer text-start"
                  >
                    <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>{{ t('account.logout') }}</span>
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Language Switcher -->
          <LanguageSwitcher :is-scrolled="isScrolled" />

          <!-- Divider -->
          <div :class="['h-8 w-px hidden sm:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- Hotline (Customer Service) -->
          <a 
            href="tel:01286000037" 
            class="hidden lg:flex items-center gap-3 group text-start"
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
            <div class="flex flex-col text-xs text-start">
              <span :class="isScrolled ? 'text-slate-400 text-[11px]' : 'text-slate-500 text-[11px]'">{{ t('nav.hotline') }}</span>
              <span :class="['font-bold dir-ltr tracking-wider', isScrolled ? 'text-amber-400' : 'text-slate-900']">01286000037</span>
            </div>
          </a>

          <!-- Divider -->
          <div :class="['h-8 w-px hidden lg:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- Cart Section & Amount (Desktop) -->
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
            <div class="flex flex-col text-xs text-start">
              <span class="text-[10px] text-slate-300">{{ t('nav.cart') }}</span>
              <span class="font-black text-amber-400 text-xs lg:text-sm">
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
          >
            <div :class="['w-10 h-10 rounded-full flex items-center justify-center border shadow-sm transition-all', isScrolled ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-slate-900']">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <span class="absolute -top-1 -end-1 w-5 h-5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-full flex items-center justify-center shadow-md">
              {{ cartCount }}
            </span>
          </button>
        </div>

      </div>

      <!-- Categories Bar (Desktop) -->
      <nav class="hidden lg:flex items-center justify-between border-t mt-3 pt-2.5 transition-colors overflow-x-auto no-scrollbar" :class="isScrolled ? 'border-slate-800' : 'border-slate-100'">
        <div class="flex items-center gap-6">
          <NuxtLink 
            to="/shop" 
            :class="['text-xs font-extrabold transition-colors py-1 whitespace-nowrap hover:text-amber-500', isScrolled ? 'text-white' : 'text-slate-900']"
          >
            {{ t('nav.shop') }}
          </NuxtLink>

          <NuxtLink 
            v-for="cat in navCategories" 
            :key="cat.url" 
            :to="cat.url" 
            :class="['text-xs font-bold transition-colors py-1 whitespace-nowrap hover:text-amber-500', isScrolled ? 'text-slate-300' : 'text-slate-600']"
          >
            {{ cat.name }}
          </NuxtLink>
        </div>
      </nav>

    </div>

    <!-- Login Drawer Integration -->
    <LoginDrawer :is-login-open="isLoginOpen" @close="isLoginOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'
import LoginDrawer from '~/components/auth/LoginDrawer.vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'
import { useLanguage } from '~/composables/useLanguage'

const { user, isLoggedIn, logout, userName, userEmail } = useAuth()
const { cartCount, formattedCartTotal, toggleCart } = useCart()
const { t, layoutDirection } = useLanguage()

const searchQuery = ref('')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isLoginOpen = ref(false)
const headerImgError = ref(false)

const toggleLogin = () => {
  isLoginOpen.value = !isLoginOpen.value
}

const userHeaderAvatarUrl = computed(() => {
  const u = user.value as any
  const raw = u?.image_full_url?.path || u?.image_full_url || u?.image || u?.avatar || u?.profile_image
  if (!raw) return null

  let str = typeof raw === 'object' && raw?.path ? raw.path : String(raw)
  if (!str || typeof str !== 'string' || !str.trim()) return null

  if (str.startsWith('blob:') || str.startsWith('data:')) {
    return str
  }

  let clean = str.replace(/(https?:\/\/)|(\/+)/g, (match, protocol) => {
    return protocol ? protocol : '/'
  })

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean
  }

  const relative = clean.replace(/^\/+/, '')
  return `https://wedgetstore.com/${relative}`
})

onMounted(() => {
  let ticking = false;
  const updateScrollState = () => {
    isScrolled.value = window.scrollY > 30;
    ticking = false;
  };

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  updateScrollState();

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
});

const navCategories = computed(() => [
  { name: t('cat.appliances'), url: '/category/appliances' },
  { name: t('cat.houseware'), url: '/category/houseware' },
  { name: t('cat.security'), url: '/category/security' },
  { name: t('cat.laptops'), url: '/category/laptops' },
  { name: t('cat.networks'), url: '/category/networks' },
  { name: t('cat.pos'), url: '/category/pos' },
  { name: t('cat.mobile'), url: '/category/mobile' },
  { name: t('cat.scooter'), url: '/category/scooter' },
  { name: `${t('cat.blog')} 📝`, url: '/blog' },
]);

const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
};
</script>

<style scoped>
.gpu-header {
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  will-change: transform;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
