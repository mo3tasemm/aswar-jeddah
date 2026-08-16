<template>
  <nav class="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium py-4 text-start" aria-label="Breadcrumb">
    
    <!-- Home Link -->
    <NuxtLink to="/" class="hover:text-[#0B0E28] transition-colors flex items-center gap-1.5 shrink-0 group">
      <svg class="w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        <polyline points="9 22 9 12 15 12 15 22"></polyline>
      </svg>
      <span>{{ homeLabel }}</span>
    </NuxtLink>

    <!-- Breadcrumb Items Loop -->
    <template v-for="(item, index) in normalizedItems" :key="index">
      
      <!-- Separator Icon -->
      <svg class="w-3.5 h-3.5 rtl:-scale-x-100 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>

      <!-- Linked Non-Last Item -->
      <NuxtLink 
        v-if="index < normalizedItems.length - 1 && (item.to || item.path)" 
        :to="item.to || item.path" 
        class="hover:text-[#0B0E28] transition-colors truncate max-w-[140px] sm:max-w-[220px]"
        :title="item.label"
      >
        {{ item.label }}
      </NuxtLink>

      <!-- Current Active Page (Last Item - Plain Text) -->
      <span 
        v-else 
        class="text-[#0B0E28] font-bold truncate max-w-[180px] sm:max-w-[320px]" 
        :title="item.label"
      >
        {{ item.label }}
      </span>

    </template>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLanguage } from '~/composables/useLanguage'

export interface BreadcrumbItem {
  label?: string;
  name?: string;
  to?: string;
  path?: string;
}

const props = defineProps({
  items: {
    type: Array as () => BreadcrumbItem[],
    default: undefined
  },
  tiers: {
    type: Array as () => BreadcrumbItem[],
    default: undefined
  },
  currentTitle: {
    type: String,
    default: ''
  }
})

const route = useRoute()
const { currentLanguage } = useLanguage()

// Home Label translated based on active language
const homeLabel = computed(() => {
  return currentLanguage.value === 'en' ? 'Home' : 'الرئيسية'
})

// Localized labels dictionary for route path segments
const routeSegmentLabels: Record<string, { ar: string; en: string }> = {
  shop: { ar: 'المتجر', en: 'Shop' },
  category: { ar: 'التصنيفات', en: 'Categories' },
  product: { ar: 'المنتجات', en: 'Products' },
  cart: { ar: 'سلة المشتريات', en: 'Cart' },
  checkout: { ar: 'إتمام الشراء', en: 'Checkout' },
  'my-account': { ar: 'حسابي', en: 'My Account' },
  wishlist: { ar: 'المفضلة', en: 'Wishlist' },
  orders: { ar: 'طلباتي', en: 'My Orders' },
  addresses: { ar: 'العناوين', en: 'Addresses' },
  details: { ar: 'تفاصيل الحساب', en: 'Account Details' },
  search: { ar: 'البحث', en: 'Search' },
  login: { ar: 'تسجيل الدخول', en: 'Login' },
  blog: { ar: 'المدونة', en: 'Blog' }
}

const normalizedItems = computed<BreadcrumbItem[]>(() => {
  const rawList = props.items || props.tiers

  // 1. If explicit items/tiers passed, use them
  if (Array.isArray(rawList) && rawList.length > 0) {
    return rawList
      .filter(i => i && (i.label || i.name))
      .filter((i, idx) => !(idx === 0 && (i.to === '/' || i.path === '/')))
      .map(i => ({
        label: i.label || i.name || '',
        to: i.to || i.path
      }))
  }

  // 2. Fallback: Parse URL route path segments automatically
  const path = route.path
  const segments = path.split('/').filter(Boolean)
  const autoItems: BreadcrumbItem[] = []

  let accumulatedPath = ''

  segments.forEach((seg, idx) => {
    accumulatedPath += `/${seg}`
    const isLast = idx === segments.length - 1

    const mapped = routeSegmentLabels[seg]
    let label = ''

    if (mapped) {
      label = currentLanguage.value === 'en' ? mapped.en : mapped.ar
    } else if (isLast && props.currentTitle) {
      label = props.currentTitle
    } else {
      label = seg.replace(/-/g, ' ')
      label = label.charAt(0).toUpperCase() + label.slice(1)
    }

    autoItems.push({
      label,
      to: isLast ? undefined : accumulatedPath
    })
  })

  return autoItems
})
</script>
