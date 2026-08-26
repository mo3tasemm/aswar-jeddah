<template>
  <div class="max-w-[1550px] mx-auto px-4 lg:px-6 my-8 relative overflow-hidden bg-slate-50/70 py-8 md:py-10 rounded-3xl border border-slate-100 shadow-xs">
    <!-- Title Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold mb-2">
        <i class="fa-solid fa-award text-amber-600 text-xs"></i>
        <span>شركاء النجاح والأصالة</span>
      </div>
      <h2 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight">{{ resolvedTitle }}</h2>
      <div class="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full"></div>
    </div>

    <!-- Ticker Wrapper with Gradient Fade Overlays -->
    <div class="relative flex overflow-hidden group/ticker py-2">
      <!-- Right/Left Fades for smooth infinite effect -->
      <div class="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50/90 via-slate-50/50 to-transparent z-10 pointer-events-none"></div>
      <div class="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-transparent z-10 pointer-events-none"></div>
      
      <!-- Infinite Continuous Marquee Track -->
      <div class="flex animate-marquee group-hover/ticker:[animation-play-state:paused] w-max select-none">
        <template v-for="loop in repeatedCount" :key="loop">
          <div class="flex gap-4 sm:gap-6 pl-4 sm:pl-6 items-center shrink-0">
            <NuxtLink 
              v-for="(brand, bIdx) in normalizedBrands" 
              :key="`${loop}-${bIdx}-${brand.name}`"
              :to="brand.url"
              class="h-20 min-w-[140px] sm:min-w-[170px] px-5 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-amber-400 hover:-translate-y-1 group shrink-0 cursor-pointer"
              :title="brand.name"
            >
              <!-- 1. Real Image Logo if exists -->
              <img 
                v-if="brand.logo && !failedLogos[brand.name]" 
                :src="brand.logo" 
                :alt="brand.name"
                @error="onImageError(brand.name)"
                class="max-h-11 max-w-[120px] sm:max-w-[140px] object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />

              <!-- 2. Typography Badge Fallback if image doesn't exist or fails -->
              <div 
                v-else 
                class="flex items-center gap-2 font-black text-sm text-slate-700 group-hover:text-amber-600 transition-colors"
              >
                <div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-black border border-amber-100">
                  {{ (brand.name || 'B').charAt(0).toUpperCase() }}
                </div>
                <span class="tracking-wide">{{ brand.name }}</span>
              </div>
            </NuxtLink>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { brandApiService } from '~/services/brandApiService'

export interface BrandTickerItem {
  name: string
  logo?: string
  url: string
}

const props = defineProps<{
  title?: string
  brandLogos?: any[]
  brands?: any[]
  config?: {
    title?: string
    brandLogos?: any[]
    brand_logos?: any[]
    brands?: any[]
    items?: any[]
  }
}>()

const apiBrands = ref<BrandTickerItem[]>([])
const failedLogos = ref<Record<string, boolean>>({})

const onImageError = (brandName: string) => {
  failedLogos.value[brandName] = true
}

const resolvedTitle = computed(() => {
  return props.config?.title || props.title || 'شركاؤنا من كبرى العلامات التجارية'
})

// Normalized Brands from Props/Config or Live API Fallback
const normalizedBrands = computed<BrandTickerItem[]>(() => {
  const rawList = props.config?.brandLogos || 
                   props.config?.brand_logos || 
                   props.config?.brands || 
                   props.config?.items || 
                   props.brandLogos || 
                   props.brands || 
                   []

  if (Array.isArray(rawList) && rawList.length > 0) {
    const list = rawList.map((item: any) => {
      const name = typeof item === 'string' ? item : (item.name || item.name_ar || item.name_en || item.title || 'ماركة')
      const img = typeof item === 'object' 
        ? (item.imageUrl || item.image_url || item.image || item.logo || item.icon || '') 
        : ''
      const slug = (item.slug || name).toLowerCase().replace(/\s+/g, '-')
      const url = item.linkUrl || item.link_url || item.url || `/brand/${slug}`

      return {
        name,
        logo: img,
        url
      }
    }).filter(b => Boolean(b.name))

    if (list.length > 0) return list
  }

  // If config is empty, use API brands fetched dynamically
  if (apiBrands.value.length > 0) {
    return apiBrands.value
  }

  // Fallback defaults with clean SVG icons
  return [
    { name: 'PHILIPS', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg', url: '/brand/philips' },
    { name: 'SAMSUNG', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', url: '/brand/samsung' },
    { name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg', url: '/brand/lg' },
    { name: 'DYSON', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Dyson_logo.svg', url: '/brand/dyson' },
    { name: 'DELONGHI', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/De%27Longhi_logo.svg', url: '/brand/delonghi' },
    { name: 'KENWOOD', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/23/Kenwood_logo.svg', url: '/brand/kenwood' },
    { name: 'BISSELL', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Bissell_logo.svg', url: '/brand/bissell' },
    { name: 'BRAUN', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Braun-Logo.svg', url: '/brand/braun' }
  ]
})

// Number of track repetitions to ensure uninterrupted continuous marquee scrolling
const repeatedCount = computed(() => {
  const len = normalizedBrands.value.length
  if (len <= 4) return 6
  if (len <= 8) return 4
  return 3
})

// Fetch live brands from API if not supplied in props
const fetchLiveBrands = async () => {
  const rawList = props.config?.brandLogos || props.config?.brand_logos || props.config?.brands || props.brandLogos
  if (Array.isArray(rawList) && rawList.length > 0) return

  try {
    const list = await brandApiService.fetchBrands()
    if (Array.isArray(list) && list.length > 0) {
      apiBrands.value = list.map(b => ({
        name: b.name_ar || b.name || b.name_en || 'علامة تجارية',
        logo: b.image || b.logo || b.image_full_url || '',
        url: `/brand/${b.slug || b.name.toLowerCase().replace(/\s+/g, '-')}`
      }))
    }
  } catch (err) {
    console.warn('[BrandsTickerShowcase] Could not fetch dynamic brands:', err)
  }
}

onMounted(() => {
  fetchLiveBrands()
})
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Translate half the total combined track width */
    transform: translateX(50%);
  }
}

.animate-marquee {
  animation: marquee 40s linear infinite;
}
</style>
