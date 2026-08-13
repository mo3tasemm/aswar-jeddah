<template>
  <div dir="rtl" class="font-sans text-luxury-black bg-luxury-cream">

    <template v-for="(section, index) in layoutSections" :key="section.id">
      
      <!-- Hero Slider -->
      <HomeHeroBanner 
        v-if="section.type === 'hero'" 
        :slides="section.slides" 
      />

      <!-- Categories Slider -->
      <HomeCategorySlider 
        v-else-if="section.type === 'category_slider'" 
      />

      <!-- Brand Showcases -->
      <HomeBrandShowcase 
        v-else-if="section.type === 'brand_showcase'"
        :brandName="section.brandName"
        :title="section.title"
        :subtitle="section.subtitle"
        :brandLogo="section.brandLogo"
        :viewAllUrl="section.viewAllUrl"
        :bgColor="section.bgColor"
        :btnColor="section.btnColor"
        :products="getProductsByBrand(section.brandName)"
        class="mb-8"
      />

      <!-- New Arrivals -->
      <HomeNewArrivalsShowcase 
        v-else-if="section.type === 'new_arrivals'"
        :products="getNewArrivalProducts()"
        :shopUrl="section.shopUrl"
        class="mb-8"
      />

      <!-- Brand Campaign Section -->
      <HomeBrandCampaignSection
        v-else-if="section.type === 'brand_campaign'"
        :title="section.title"
        :btnText="section.btnText"
        :targetUrl="section.targetUrl"
        :bannerImage="section.bannerImage"
        :products="getProductsByCategory(section.category).slice(0, section.limit)"
      />

      <!-- Side Banner Slider -->
      <HomeSideBannerSliderShowcase 
        v-else-if="section.type === 'side_banner'"
        :sideBannerImage="section.sideBannerImage"
        :sideBannerImages="section.sideBannerImages"
        :sideBannerSlides="section.sideBannerSlides || section.slides"
        :sideBannerUrl="section.sideBannerUrl"
        :products="section.brandName ? getProductsByBrand(section.brandName).slice(0, section.limit) : getProductsByCategory(section.category).slice(0, section.limit)"
        class="mb-12"
      />

      <!-- Store Features -->
      <HomeStoreFeaturesBar 
        v-else-if="section.type === 'store_features'" 
      />

      <!-- Brands Ticker -->
      <HomeBrandsTickerShowcase 
        v-else-if="section.type === 'brands_ticker'" 
      />

      <!-- Store Guarantees -->
      <HomeStoreGuaranteesBar 
        v-else-if="section.type === 'store_guarantees'" 
      />

      <!-- Store Location -->
      <HomeStoreLocationShowcase 
        v-else-if="section.type === 'store_location'" 
      />

    </template>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
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
import { getProductsByCategory, getProductsByBrand, getNewArrivalProducts } from '~/services/productService'
import { fetchHomeLayout, type HomeSection } from '~/services/homeLayoutService'

const layoutSections = ref<HomeSection[]>([])

onMounted(async () => {
  // Fetch dynamic layout structure
  layoutSections.value = await fetchHomeLayout()
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
