<template>
  <aside class="w-full lg:w-[320px] flex-shrink-0">
    <div class="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 sticky top-10">
      
      <!-- User Profile Mini -->
      <div class="flex flex-col items-center text-center pb-8 border-b border-slate-100 mb-6">
        <div class="relative mb-4">
          <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-800 p-1">
            <div class="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-[#0B0E28]">
              م
            </div>
          </div>
          <div class="absolute bottom-0 right-0 bg-amber-400 text-white text-[10px] font-bold px-2.5 py-1 rounded-full border-2 border-white shadow-sm">
            VIP
          </div>
        </div>
        <h2 class="text-xl font-black text-[#0B0E28] mb-1">معتصم عاطف</h2>
        <p class="text-slate-500 text-sm">moatasem@example.com</p>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col gap-2">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.id"
          :to="item.path"
          class="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group"
          :class="route.path === item.path ? 'bg-slate-50 text-[#0B0E28]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0B0E28]'"
        >
          <!-- Active Indicator -->
          <div 
            class="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-l-full bg-amber-500 transition-all duration-300"
            :class="route.path === item.path ? 'opacity-100' : 'opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-50'"
          ></div>
          
          <div 
            class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
            :class="route.path === item.path ? 'bg-white shadow-sm text-amber-500' : 'bg-transparent text-slate-400 group-hover:bg-white group-hover:text-amber-500'"
          >
            <svg v-html="item.icon" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></svg>
          </div>
          <span class="font-bold text-sm" :class="route.path === item.path ? 'text-[#0B0E28]' : ''">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <!-- Logout -->
      <div class="mt-8 pt-6 border-t border-slate-100">
        <button class="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 w-full text-rose-500 hover:bg-rose-50 group">
          <div class="w-10 h-10 rounded-xl bg-rose-50 group-hover:bg-white flex items-center justify-center transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span class="font-bold text-sm">تسجيل الخروج</span>
        </button>
      </div>

    </div>
  </aside>
</template>

<script setup>
const route = useRoute()

const navItems = [
  { 
    id: 'overview', 
    label: 'نظرة عامة', 
    path: '/my-account',
    icon: '<path d="M3 3h7v7H3z"></path><path d="M14 3h7v7h-7z"></path><path d="M14 14h7v7h-7z"></path><path d="M3 14h7v7H3z"></path>' 
  },
  { 
    id: 'orders', 
    label: 'طلباتي', 
    path: '/my-account/orders',
    icon: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>' 
  },
  { 
    id: 'details', 
    label: 'تفاصيل الحساب', 
    path: '/my-account/details',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' 
  },
  { 
    id: 'addresses', 
    label: 'عناوين التوصيل', 
    path: '/my-account/addresses',
    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>' 
  },
  { 
    id: 'wishlist', 
    label: 'قائمة الرغبات', 
    path: '/my-account/wishlist',
    icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>' 
  }
]
</script>
