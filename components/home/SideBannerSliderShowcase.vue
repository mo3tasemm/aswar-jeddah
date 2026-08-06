<template>
  <div class="flex flex-col lg:flex-row gap-4 items-stretch max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    
    <!-- Side Banner Wrapper to match slider padding -->
    <div class="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 flex flex-col pt-4">
      <div class="w-full h-[350px] sm:h-[565px] rounded-2xl overflow-hidden shadow-sm relative group">        <NuxtLink v-if="sideBannerUrl" :to="sideBannerUrl" class="block w-full h-full">
          <img 
            :src="sideBannerImage" 
            alt="Banner"
            class="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </NuxtLink>
        <div v-else class="w-full h-full">
          <img 
            :src="sideBannerImage" 
            alt="Banner"
            class="w-full h-full object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>

    <!-- Products Slider Portion -->
    <div class="flex-1 min-w-0 relative -mx-2 sm:-mx-4 lg:-mx-6 -my-4 lg:my-0">
      <HomeProductsSliderShowcase 
        :products="products"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import HomeProductsSliderShowcase from '~/components/home/ProductsSliderShowcase.vue'
import type { Product } from '~/types'

defineProps<{
  sideBannerImage: string
  sideBannerUrl?: string
  products: Product[]
}>()
</script>
