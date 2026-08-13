<template>
  <aside class="w-full lg:w-[320px] flex-shrink-0" :dir="layoutDirection">
    <div class="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 sticky top-10">
      
      <!-- User Profile Mini -->
      <div class="flex flex-col items-center text-center pb-8 border-b border-slate-100 mb-6">
        <div class="relative mb-4">
          <div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-800 p-1">
            <div class="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-[#0B0E28] overflow-hidden">
              <img 
                v-if="userAvatarUrl && !imgError" 
                :src="userAvatarUrl" 
                @error="imgError = true"
                class="w-full h-full object-cover rounded-full" 
                alt="Avatar" 
              />
              <span v-else>{{ userInitial }}</span>
            </div>
          </div>
          <div class="absolute bottom-0 end-0 bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border-2 border-white shadow-sm">
            {{ t('account.customer') }}
          </div>
        </div>
        <h2 class="text-xl font-black text-[#0B0E28] mb-1">{{ userName }}</h2>
        <p class="text-slate-500 text-xs sm:text-sm dir-ltr">{{ userEmail }}</p>
      </div>

      <!-- Navigation Links -->
      <nav class="flex flex-col gap-2">
        <NuxtLink 
          v-for="item in navItems" 
          :key="item.id"
          :to="item.path"
          class="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group cursor-pointer"
          :class="route.path === item.path ? 'bg-slate-50 text-[#0B0E28]' : 'text-slate-500 hover:bg-slate-50 hover:text-[#0B0E28]'"
        >
          <!-- Active Indicator -->
          <div 
            class="absolute start-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-e-full bg-amber-500 transition-all duration-300"
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

      <!-- Logout Button -->
      <div class="mt-8 pt-6 border-t border-slate-100">
        <button 
          @click="logout"
          class="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 w-full text-rose-500 hover:bg-rose-50 group cursor-pointer"
        >
          <div class="w-10 h-10 rounded-xl bg-rose-50 group-hover:bg-white flex items-center justify-center transition-colors">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
          <span class="font-bold text-sm">{{ t('account.logout') }}</span>
        </button>
      </div>

    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useLanguage } from '~/composables/useLanguage'

const route = useRoute()
const { user, userName, userEmail, logout } = useAuth()
const { t, layoutDirection } = useLanguage()
const imgError = ref(false)

const userInitial = computed(() => {
  const name = userName?.value || user.value?.f_name || user.value?.name || 'م'
  return name.charAt(0).toUpperCase()
})

const userAvatarUrl = computed(() => {
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

watch(userAvatarUrl, () => {
  imgError.value = false
}, { immediate: true })

const navItems = computed(() => [
  { 
    id: 'overview', 
    label: t('account.overview'), 
    path: '/my-account',
    icon: '<path d="M3 3h7v7H3z"></path><path d="M14 3h7v7h-7z"></path><path d="M14 14h7v7h-7z"></path><path d="M3 14h7v7H3z"></path>' 
  },
  { 
    id: 'orders', 
    label: t('account.orders'), 
    path: '/my-account/orders',
    icon: '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>' 
  },
  { 
    id: 'coupons', 
    label: t('account.coupons'), 
    path: '/my-account/coupons',
    icon: '<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line>' 
  },
  { 
    id: 'details', 
    label: t('account.details'), 
    path: '/my-account/details',
    icon: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle>' 
  },
  { 
    id: 'addresses', 
    label: t('account.addresses'), 
    path: '/my-account/addresses',
    icon: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>' 
  },
  { 
    id: 'wishlist', 
    label: t('account.wishlist'), 
    path: '/my-account/wishlist',
    icon: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>' 
  },
  { 
    id: 'compare', 
    label: t('account.compare'), 
    path: '/my-account/compare',
    icon: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>' 
  }
])
</script>
