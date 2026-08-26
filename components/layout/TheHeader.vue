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
      
      <!-- Top Row: Mobile Minimal Bar vs Desktop Full Bar -->
      <div class="flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
        
        <!-- Start Column: Hamburger Toggle (Mobile) + Brand Logo (Desktop) -->
        <div class="flex items-center gap-3 shrink-0">
          <!-- Mobile Hamburger Toggle (Clean & Minimalist - NO heavy gray box) -->
          <button 
            @click="isMobileMenuOpen = true"
            type="button"
            class="lg:hidden p-1.5 -ms-1.5 rounded-xl text-slate-800 hover:text-amber-500 active:scale-90 transition-all cursor-pointer select-none"
            :class="isScrolled ? 'text-amber-400 hover:text-amber-300' : 'text-slate-900 hover:text-amber-600'"
            aria-label="القائمة الرئيسية"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-6 h-6 sm:w-7 sm:h-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>

          <!-- Desktop Logo (Visible on Desktop >= lg) -->
          <NuxtLink :to="localePath('/')" class="hidden lg:flex items-center gap-2 group shrink-0">
            <img 
              v-if="resolvedLogoUrl && !logoLoadError"
              :src="resolvedLogoUrl" 
              @error="logoLoadError = true"
              :alt="storeName || 'أسوار جدة - Aswar Jeddah'" 
              :class="['transition-all duration-300 object-contain', isScrolled ? 'h-9 xl:h-10' : 'h-12 xl:h-14']"
            />
            <img 
              v-else
              src="~/assets/images/Logo.png" 
              alt="أسوار جدة - Aswar Jeddah" 
              :class="['transition-all duration-300 object-contain', isScrolled ? 'h-9 xl:h-10' : 'h-12 xl:h-14']"
            />
          </NuxtLink>
        </div>

        <!-- Center Column (Mobile ONLY): Prominently Centered Clear Logo -->
        <div class="flex-1 flex items-center justify-center lg:hidden min-w-0 px-2">
          <NuxtLink :to="localePath('/')" class="flex items-center justify-center group max-w-full">
            <img 
              v-if="resolvedLogoUrl && !logoLoadError"
              :src="resolvedLogoUrl" 
              @error="logoLoadError = true"
              :alt="storeName || 'أسوار جدة - Aswar Jeddah'" 
              class="h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
            <img 
              v-else
              src="~/assets/images/Logo.png" 
              alt="أسوار جدة - Aswar Jeddah" 
              class="h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102"
            />
          </NuxtLink>
        </div>

        <!-- Center Column (Desktop ONLY): Search Bar -->
        <div class="hidden lg:flex flex-1 max-w-2xl mx-4">
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

        <!-- End Column: Desktop Tools vs Mobile Compact Cart Button -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          
          <!-- DESKTOP PROFILE / AUTH DROPDOWN (hidden on mobile) -->
          <div class="relative group hidden lg:block">
            <!-- Guest Login Button -->
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

            <!-- Authenticated User Profile -->
            <div v-else class="relative">
              <button 
                @click="isUserDropdownOpen = !isUserDropdownOpen"
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
                  <span :class="['font-bold truncate max-w-[110px] transition-colors', isScrolled ? 'text-white group-hover/btn:text-amber-400' : 'text-slate-900 group-hover/btn:text-amber-600']">
                    {{ userName }}
                  </span>
                </div>
                <svg class="w-3.5 h-3.5 text-slate-400 group-hover/btn:rotate-180 transition-transform hidden xl:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </button>

              <!-- Auth Dropdown Menu -->
              <div 
                :class="[
                  'absolute start-0 top-full pt-3 w-64 transition-all duration-200 z-50',
                  isUserDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0'
                ]"
                :dir="layoutDirection"
              >
                <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-start">
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

                  <div class="space-y-1 text-xs font-bold text-slate-700">
                    <NuxtLink 
                      :to="localePath('/my-account')" 
                      @click="isUserDropdownOpen = false"
                      class="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-[#0B0E28] transition-colors"
                    >
                      <svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3h7v7H3z"></path><path d="M14 3h7v7h-7z"></path><path d="M14 14h7v7h-7z"></path><path d="M3 14h7v7H3z"></path></svg>
                      <span>{{ t('nav.account') }}</span>
                    </NuxtLink>
                  </div>

                  <div class="mt-2 pt-2 border-t border-slate-100">
                    <button 
                      @click="logout(); isUserDropdownOpen = false"
                      class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer text-start"
                    >
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                      <span>{{ t('account.logout') }}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- DESKTOP LANGUAGE SWITCHER (hidden on mobile) -->
          <div class="hidden lg:block">
            <LanguageSwitcher :is-scrolled="isScrolled" />
          </div>

          <!-- DESKTOP DIVIDER -->
          <div :class="['h-8 w-px hidden lg:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- DESKTOP HOTLINE (hidden on mobile) -->
          <a 
            :href="`tel:${hotline}`" 
            class="hidden lg:flex items-center gap-3 group text-start"
            :title="t('nav.hotline')"
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
              <span :class="['font-bold dir-ltr tracking-wider', isScrolled ? 'text-amber-400' : 'text-slate-900']">{{ hotline }}</span>
            </div>
          </a>

          <!-- DESKTOP DIVIDER -->
          <div :class="['h-8 w-px hidden lg:block transition-colors', isScrolled ? 'bg-slate-800' : 'bg-slate-200']"></div>

          <!-- DESKTOP FULL CART BUTTON (hidden on mobile) -->
          <button 
            @click="toggleCart" 
            :class="[
              'hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full transition-all relative group cursor-pointer shadow-sm border',
              isScrolled 
                ? 'bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 border-slate-900 text-white'
            ]"
          >
            <span :class="['w-5 h-5 rounded-full font-black text-xs flex items-center justify-center shadow-md shrink-0 transition-colors', isScrolled ? 'bg-white text-[#0B0E28]' : 'bg-amber-500 text-slate-950']">
              {{ cartCount }}
            </span>
            <div class="flex flex-col text-xs text-start">
              <span class="text-[10px] text-slate-300">{{ t('nav.cart') }}</span>
              <span class="font-black text-amber-400 text-xs lg:text-sm">
                {{ formattedCartTotal }}
              </span>
            </div>
            <div class="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </button>

          <!-- MOBILE COMPACT CART BUTTON (Visible ONLY on < lg) -->
          <button 
            @click="toggleCart"
            type="button"
            class="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-2xs shrink-0"
            aria-label="سلة المشتريات"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            <span class="absolute -top-1 -end-1 bg-[#0B0E28] text-amber-400 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
              {{ cartCount }}
            </span>
          </button>

        </div>

      </div>

      <!-- DYNAMIC NAVBAR LINKS BAR (Desktop ONLY) Loaded from /admin/navbar -->
      <nav 
        class="hidden lg:flex items-center justify-start border-t mt-3 pt-2.5 transition-colors relative z-20" 
        :class="isScrolled ? 'border-slate-800' : 'border-slate-100'"
      >
        <div class="flex items-center gap-6 xl:gap-7 flex-wrap">
          <!-- 1. Home Link -->
          <NuxtLink 
            :to="localePath('/')" 
            :class="[
              'text-sm font-bold transition-colors py-1.5 whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-2',
              isScrolled ? 'text-white' : 'text-slate-900'
            ]"
          >
            <i class="fa-solid fa-house text-amber-500 text-xs"></i>
            <span>{{ t('nav.home') || 'الرئيسية' }}</span>
          </NuxtLink>

          <!-- 2. All Products / Shop link -->
          <NuxtLink 
            :to="localePath('/shop')" 
            :class="[
              'text-sm font-bold transition-colors py-1.5 whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-2',
              isScrolled ? 'text-white' : 'text-slate-900'
            ]"
          >
            <i class="fa-solid fa-store text-amber-500 text-xs"></i>
            <span>{{ t('nav.shop') || 'المتجر' }}</span>
          </NuxtLink>

          <!-- 3. Dynamic Navbar Items from DB -->
          <div 
            v-for="item in navItems" 
            :key="item.id" 
            class="relative py-1.5 shrink-0 group/nav"
            @mouseenter="activeHoveredMenuId = item.id"
            @mouseleave="activeHoveredMenuId = null"
          >
            <div class="flex items-center gap-1">
              <NuxtLink 
                :to="localePath(item.url)"
                :target="item.target || '_self'"
                :class="[
                  'text-sm font-medium transition-colors whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-1.5 cursor-pointer',
                  isScrolled ? 'text-slate-300' : 'text-slate-700',
                  activeHoveredMenuId === item.id ? 'text-amber-500 font-bold' : ''
                ]"
              >
                <i :class="[resolveItemIcon(item.icon, item.url, item.name), 'text-xs opacity-80 shrink-0']"></i>
                <span>{{ item.name }}</span>

                <!-- Promotional Badge -->
                <span 
                  v-if="item.badge" 
                  class="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs shrink-0 tracking-wide"
                  :style="{ backgroundColor: item.badge_color || '#ef4444' }"
                >
                  {{ item.badge }}
                </span>
              </NuxtLink>

              <!-- Dropdown Trigger Button if children exist -->
              <button 
                v-if="Array.isArray(item.children) && item.children.length > 0"
                type="button"
                @click.stop="toggleDesktopDropdown(item.id)"
                class="p-0.5 text-slate-400 hover:text-amber-500 transition-transform cursor-pointer"
                :class="activeHoveredMenuId === item.id ? 'rotate-180 text-amber-500' : ''"
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
            </div>

            <!-- Dropdown Sub-menu -->
            <div 
              v-if="Array.isArray(item.children) && item.children.length > 0"
              :class="[
                'absolute start-0 top-full pt-2 w-60 z-[90] transition-all duration-200',
                activeHoveredMenuId === item.id 
                  ? 'opacity-100 visible translate-y-0 pointer-events-auto' 
                  : 'opacity-0 invisible translate-y-2 pointer-events-none'
              ]"
            >
              <div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-start space-y-1">
                <NuxtLink 
                  v-for="sub in item.children" 
                  :key="sub.id"
                  :to="localePath(sub.url)"
                  :target="sub.target || '_self'"
                  @click="activeHoveredMenuId = null"
                  class="flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                >
                  <div class="flex items-center gap-2">
                    <i :class="[resolveItemIcon(sub.icon, sub.url, sub.name), 'text-xs text-slate-400']"></i>
                    <span>{{ sub.name }}</span>
                  </div>
                  <span 
                    v-if="sub.badge" 
                    class="px-1.5 py-0.5 rounded-full text-[9px] font-black text-white"
                    :style="{ backgroundColor: sub.badge_color || '#ef4444' }"
                  >
                    {{ sub.badge }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

    </div>

    <!-- ========================================================= -->
    <!-- ORGANIZED MOBILE NAVIGATION DRAWER (Slide-over Drawer) -->
    <!-- ========================================================= -->
    <Teleport to="body">
      <!-- Backdrop Overlay with smooth transition -->
      <Transition name="fade">
        <div 
          v-if="isMobileMenuOpen" 
          class="fixed inset-0 z-[100] bg-[#0B0E28]/70 backdrop-blur-sm transition-opacity duration-300"
          @click="isMobileMenuOpen = false"
        ></div>
      </Transition>

      <!-- Mobile Side Drawer -->
      <aside 
        :class="[
          'fixed inset-y-0 h-full max-h-screen z-[101] w-84 max-w-[88vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-hidden',
          layoutDirection === 'rtl' ? 'right-0' : 'left-0',
          isMobileMenuOpen 
            ? 'translate-x-0' 
            : (layoutDirection === 'rtl' ? 'translate-x-full' : '-translate-x-full')
        ]"
        :dir="layoutDirection"
      >
        <!-- 1. Fixed Drawer Header: Logo + Close -->
        <div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0">
          <NuxtLink :to="localePath('/')" @click="isMobileMenuOpen = false" class="flex items-center gap-2">
            <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="h-9 w-auto object-contain" />
          </NuxtLink>
          <button 
            type="button"
            @click="isMobileMenuOpen = false"
            class="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="إغلاق القائمة"
          >
            <i class="fa-solid fa-xmark text-sm"></i>
          </button>
        </div>

        <!-- 2. Smoothly Scrollable Drawer Body (All interactive sections) -->
        <div class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4">
          
          <!-- Profile & Authentication Section -->
          <div class="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70">
            <!-- Logged-in User Profile -->
            <div v-if="isLoggedIn" class="flex items-center justify-between gap-3">
              <NuxtLink :to="localePath('/my-account')" @click="isMobileMenuOpen = false" class="flex items-center gap-2.5 min-w-0 flex-1">
                <div class="w-10 h-10 rounded-xl bg-[#0B0E28] text-amber-400 font-black text-sm flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs">
                  {{ userName.charAt(0).toUpperCase() }}
                </div>
                <div class="min-w-0">
                  <span class="text-xs font-black text-slate-900 block truncate">{{ userName }}</span>
                  <span class="text-[10px] font-bold text-indigo-600 block">{{ t('nav.account') }}</span>
                </div>
              </NuxtLink>
              <button 
                type="button" 
                @click="logout(); isMobileMenuOpen = false" 
                class="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0"
              >
                {{ t('account.logout') }}
              </button>
            </div>

            <!-- Guest Login / Register Button -->
            <button 
              v-else
              type="button"
              @click="toggleLogin(); isMobileMenuOpen = false"
              class="w-full py-3 px-4 bg-[#0B0E28] hover:bg-slate-900 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-slate-900/10"
            >
              <i class="fa-solid fa-arrow-right-to-bracket text-amber-400 text-sm"></i>
              <span>{{ t('nav.login') }} / تسجيل حساب جديد</span>
            </button>
          </div>

          <!-- Quick Actions: Language Switcher & Hotline Call -->
          <div class="grid grid-cols-2 gap-2">
            <!-- Language Toggle Switcher -->
            <button
              type="button"
              @click="toggleLanguage"
              class="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <i class="fa-solid fa-globe text-amber-500"></i>
              <span>{{ currentLanguage === 'ar' ? '🇺🇸 English' : '🇸🇦 العربية' }}</span>
            </button>

            <!-- Hotline Call Button -->
            <a 
              :href="`tel:${hotline}`"
              class="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-800 transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <i class="fa-solid fa-phone text-emerald-500"></i>
              <span class="dir-ltr text-[11px]">{{ hotline }}</span>
            </a>
          </div>

          <!-- Mobile Search Bar -->
          <div>
            <form @submit.prevent="handleMobileSearch" class="relative w-full">
              <input 
                v-model="searchQuery"
                type="text" 
                :placeholder="t('nav.search_placeholder')"
                class="w-full ps-4 pe-10 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button 
                type="submit"
                class="absolute end-1.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-amber-600 cursor-pointer"
                title="بحث"
              >
                <i class="fa-solid fa-magnifying-glass text-xs"></i>
              </button>
            </form>
          </div>

          <!-- Divider -->
          <div class="border-t border-slate-100 pt-1">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1">
              روابط وأقسام المتجر
            </span>

            <!-- Complete Navigation Links List -->
            <div class="space-y-1">
              <!-- Home link -->
              <NuxtLink 
                :to="localePath('/')" 
                @click="isMobileMenuOpen = false"
                class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-black text-xs text-[#0B0E28] hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-house"></i>
                </div>
                <span>{{ t('nav.home') || 'الرئيسية' }}</span>
              </NuxtLink>

              <!-- All Products / Shop link -->
              <NuxtLink 
                :to="localePath('/shop')" 
                @click="isMobileMenuOpen = false"
                class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-black text-xs text-[#0B0E28] hover:bg-amber-50 hover:text-amber-600 transition-colors"
              >
                <div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs shrink-0">
                  <i class="fa-solid fa-store"></i>
                </div>
                <span>{{ t('nav.shop') || 'المتجر' }}</span>
              </NuxtLink>

              <!-- Dynamic Navbar Items (Accordion for Children) -->
              <div 
                v-for="item in navItems" 
                :key="item.id"
                class="rounded-xl overflow-hidden"
              >
                <!-- Parent Item With Children -->
                <div v-if="Array.isArray(item.children) && item.children.length > 0" class="space-y-1">
                  <div 
                    @click="toggleMobileSubmenu(item.id)"
                    class="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer select-none"
                  >
                    <div class="flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs shrink-0">
                        <i :class="resolveItemIcon(item.icon, item.url, item.name)"></i>
                      </div>
                      <span>{{ item.name }}</span>
                      <span 
                        v-if="item.badge" 
                        class="px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                        :style="{ backgroundColor: item.badge_color || '#ef4444' }"
                      >
                        {{ item.badge }}
                      </span>
                    </div>
                    <i 
                      :class="[
                        'fa-solid text-xs text-slate-400 transition-transform duration-200',
                        expandedMobileMenus[item.id] ? 'fa-chevron-up' : 'fa-chevron-down'
                      ]"
                    ></i>
                  </div>

                  <!-- Sub-items List -->
                  <div v-show="expandedMobileMenus[item.id]" class="ps-6 pe-2 py-1 space-y-1 bg-slate-50 rounded-xl border border-slate-100">
                    <NuxtLink 
                      v-for="sub in item.children" 
                      :key="sub.id"
                      :to="localePath(sub.url)"
                      @click="isMobileMenuOpen = false"
                      class="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-amber-600 hover:bg-white transition-colors"
                    >
                      <div class="flex items-center gap-2">
                        <i :class="[resolveItemIcon(sub.icon, sub.url, sub.name), 'text-[10px] text-slate-400']"></i>
                        <span>{{ sub.name }}</span>
                      </div>
                      <span 
                        v-if="sub.badge" 
                        class="px-1.5 py-0.5 rounded-full text-[8px] font-black text-white"
                        :style="{ backgroundColor: sub.badge_color || '#ef4444' }"
                      >
                        {{ sub.badge }}
                      </span>
                    </NuxtLink>
                  </div>
                </div>

                <!-- Single Item Without Children -->
                <NuxtLink 
                  v-else
                  :to="localePath(item.url)"
                  @click="isMobileMenuOpen = false"
                  class="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
                >
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs shrink-0">
                      <i :class="resolveItemIcon(item.icon, item.url, item.name)"></i>
                    </div>
                    <span>{{ item.name }}</span>
                  </div>
                  <span 
                    v-if="item.badge" 
                    class="px-2 py-0.5 rounded-full text-[9px] font-black text-white"
                    :style="{ backgroundColor: item.badge_color || '#ef4444' }"
                  >
                    {{ item.badge }}
                  </span>
                </NuxtLink>
              </div>
            </div>
          </div>

        </div>

        <!-- 3. Fixed Drawer Footer: Cart Summary -->
        <div class="p-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <button 
            type="button"
            @click="isMobileMenuOpen = false; toggleCart()"
            class="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer shadow-sm"
          >
            <div class="flex items-center gap-2">
              <i class="fa-solid fa-bag-shopping text-sm"></i>
              <span>{{ t('nav.cart') }} ({{ cartCount }})</span>
            </div>
            <span>{{ formattedCartTotal }}</span>
          </button>
        </div>
      </aside>
    </Teleport>

  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import LanguageSwitcher from '~/components/layout/LanguageSwitcher.vue'
import { useAuth } from '~/composables/useAuth'
import { useCart } from '~/composables/useCart'
import { useLanguage } from '~/composables/useLanguage'
import { useAuthDrawer } from '~/composables/useAuthDrawer'
import { useStoreSettings } from '~/composables/useStoreSettings'
import { usePublicNavbar } from '~/composables/usePublicNavbar'

const route = useRoute()
const router = useRouter()
const { user, isLoggedIn, logout, userName, userEmail } = useAuth()
const { cartCount, formattedCartTotal, toggleCart } = useCart()
const { t, layoutDirection, currentLanguage, toggleLanguage, localePath } = useLanguage()
const { toggleLogin } = useAuthDrawer()

// Live Store Settings & Navbar Links
const { storeName, logoUrl, hotline, fetchStoreSettings } = useStoreSettings()
const { navItems, fetchPublicNavbar } = usePublicNavbar()

const searchQuery = ref('')
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const isUserDropdownOpen = ref(false)
const activeHoveredMenuId = ref<string | number | null>(null)
const expandedMobileMenus = ref<Record<string | number, boolean>>({})
const headerImgError = ref(false)
const logoLoadError = ref(false)

const resolveItemIcon = (icon?: string, url?: string, name?: string): string => {
  if (icon && typeof icon === 'string' && icon.trim().length > 0) {
    const trimmed = icon.trim()
    if (trimmed.startsWith('fa-solid ') || trimmed.startsWith('fa-regular ') || trimmed.startsWith('fa-brands ') || trimmed.startsWith('fa ')) {
      return trimmed
    }
    if (trimmed.startsWith('fa-')) {
      return `fa-solid ${trimmed}`
    }
    return `fa-solid fa-${trimmed}`
  }

  // Smart fallback by URL or name
  const u = (url || '').toLowerCase()
  const n = (name || '').toLowerCase()

  if (u === '/' || u === '' || n.includes('الرئيسية') || n.includes('home')) return 'fa-solid fa-house'
  if (u.includes('shop') || n.includes('متجر') || n.includes('منتجات')) return 'fa-solid fa-store'
  if (u.includes('category') || n.includes('قسم') || n.includes('أقسام')) return 'fa-solid fa-folder-tree'
  if (u.includes('brand') || n.includes('مارك') || n.includes('brand')) return 'fa-solid fa-tag'
  if (u.includes('blog') || n.includes('مدون') || n.includes('blog')) return 'fa-solid fa-newspaper'
  if (u.includes('offer') || n.includes('عروض') || n.includes('تخفيض')) return 'fa-solid fa-percent'
  if (u.includes('contact') || n.includes('اتصل') || n.includes('تواصل')) return 'fa-solid fa-headset'
  if (u.includes('about') || n.includes('من نحن') || n.includes('عن')) return 'fa-solid fa-circle-info'

  return 'fa-solid fa-link'
}

const toggleMobileSubmenu = (id: string | number) => {
  expandedMobileMenus.value[id] = !expandedMobileMenus.value[id]
}

const toggleDesktopDropdown = (id: string | number) => {
  if (activeHoveredMenuId.value === id) {
    activeHoveredMenuId.value = null
  } else {
    activeHoveredMenuId.value = id
  }
}

// Auto close drawers on route change
watch(() => route.fullPath, () => {
  isMobileMenuOpen.value = false
  isUserDropdownOpen.value = false
})

const resolvedLogoUrl = computed(() => {
  if (logoUrl.value && typeof logoUrl.value === 'string' && logoUrl.value.trim().length > 0) {
    return logoUrl.value
  }
  return ''
})

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

  if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
    clean = 'https://wedgetstore.com/' + clean.replace(/^\/+/, '')
  }

  return clean
})

onMounted(() => {
  fetchStoreSettings()
  fetchPublicNavbar()

  let ticking = false
  const updateScrollState = () => {
    isScrolled.value = window.scrollY > 30
    ticking = false
  }

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollState)
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  updateScrollState()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})

const handleSearch = () => {
  if (!searchQuery.value.trim()) return
  router.push({ path: localePath('/search'), query: { q: searchQuery.value } })
}

const handleMobileSearch = () => {
  if (!searchQuery.value.trim()) return
  isMobileMenuOpen.value = false
  router.push({ path: localePath('/search'), query: { q: searchQuery.value } })
}
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
