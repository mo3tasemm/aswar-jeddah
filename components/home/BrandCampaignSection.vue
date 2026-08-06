<template>
  <div class="mb-8">
    <HomeBrandBannerShowcase 
      :title="title"
      :btnText="btnText"
      :targetUrl="targetUrl"
      :bannerImage="bannerImage"
    />
    
    <div class="-mt-4 relative z-10">
      <HomeProductsSliderShowcase 
        :viewAllUrl="targetUrl"
        :products="products"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import HomeBrandBannerShowcase from '~/components/home/BrandBannerShowcase.vue'
import HomeProductsSliderShowcase from '~/components/home/ProductsSliderShowcase.vue'
import type { Product } from '~/types'

defineProps<{
  title: string
  btnText: string
  targetUrl: string
  bannerImage: string
  products: Product[]
}>()
</script>
