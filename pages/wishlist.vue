<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center">
    <div class="space-y-4">
      <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p class="text-sm font-bold text-slate-600">جاري التوجيه إلى قائمة الرغبات والمفضلة...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

definePageMeta({
  middleware: [
    function (to, from) {
      return navigateTo('/my-account/wishlist', { redirectCode: 301 })
    }
  ]
})

onMounted(() => {
  navigateTo('/my-account/wishlist')
})
</script>
