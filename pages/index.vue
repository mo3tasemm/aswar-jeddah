<template>
  <div dir="rtl" class="font-sans text-luxury-black bg-luxury-cream min-h-screen">
    
    <!-- Home Sections Skeleton Loading State -->
    <div v-if="loading && (!sections || sections.length === 0)" class="space-y-8 py-4">
      <HomeHeroSkeleton />
      <div class="max-w-[1550px] mx-auto px-4 lg:px-6 space-y-4">
        <div class="h-6 bg-slate-200/80 rounded-xl w-48 animate-pulse"></div>
        <ProductGridSkeleton :count="4" />
      </div>
    </div>

    <!-- Dynamic Component Renderer for Home Sections -->
    <template v-else>
      <template v-for="section in sections" :key="section.id || section.type">
        <component 
          v-if="getSectionComponent(section.type)"
          :is="getSectionComponent(section.type)" 
          :config="section.data || section"
        />
      </template>
    </template>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HomeHeroSkeleton from '~/components/ui/HomeHeroSkeleton.vue'
import ProductGridSkeleton from '~/components/ui/ProductGridSkeleton.vue'
import HomeHeroBanner from '~/components/home/HeroBanner.vue'
import HomeCategorySlider from '~/components/home/CategorySlider.vue'
import HomeBrandShowcase from '~/components/home/BrandShowcase.vue'
import HomeNewArrivalsShowcase from '~/components/home/NewArrivalsShowcase.vue'
import HomeBrandCampaignSection from '~/components/home/BrandCampaignSection.vue'
import HomeSideBannerSliderShowcase from '~/components/home/SideBannerSliderShowcase.vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeBrandsTickerShowcase from '~/components/home/BrandsTickerShowcase.vue'
import HomeStoreGuaranteesBar from '~/components/home/StoreGuaranteesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'
import { useHomeSections } from '~/composables/useHomeSections'

const { sections, loading, error, loadHomeSections } = useHomeSections()

// Map approved section types to their respective Vue components
const componentMap: Record<string, any> = {
  hero_slider: HomeHeroBanner,
  hero: HomeHeroBanner,
  category_slider: HomeCategorySlider,
  brand_showcase: HomeBrandShowcase,
  new_arrivals: HomeNewArrivalsShowcase,
  brand_campaign: HomeBrandCampaignSection,
  side_banner: HomeSideBannerSliderShowcase,
  store_features: HomeStoreFeaturesBar,
  brands_ticker: HomeBrandsTickerShowcase,
  store_guarantees: HomeStoreGuaranteesBar,
  store_location: HomeStoreLocationShowcase
}

const getSectionComponent = (type: string) => {
  return componentMap[type] || null
}

onMounted(() => {
  loadHomeSections()
})

useHead({
  title: 'الرئيسية | أسوار جدة - أحدث الأجهزة الكهربائية بأسعار تنافسية',
  meta: [
    { name: 'description', content: 'اكتشف أحدث الأجهزة الكهربائية والإلكترونيات من ماركات عالمية في أسوار جدة. عروض يومية، أسعار تنافسية، وتوصيل سريع لجميع مناطق المملكة.' },
    { property: 'og:title', content: 'الرئيسية | أسوار جدة - أحدث الأجهزة الكهربائية' },
    { property: 'og:description', content: 'اكتشف أحدث الأجهزة الكهربائية والإلكترونيات في أسوار جدة بأسعار لا تقبل المنافسة.' }
  ]
})
</script>
