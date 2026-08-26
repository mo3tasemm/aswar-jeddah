<template>
  <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
    <ProductCardSkeleton 
      v-for="i in count" 
      :key="i" 
    />
  </div>
</template>

<script setup lang="ts">
import ProductCardSkeleton from './ProductCardSkeleton.vue'

withDefaults(defineProps<{
  count?: number
}>(), {
  count: 8
})
</script>
