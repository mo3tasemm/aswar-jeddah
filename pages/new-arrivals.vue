<script setup lang="ts">
// Seamless redirect to shop with latest products sorting
await navigateTo('/shop?sort_by=latest', { redirectCode: 301 })
</script>

<template>
  <div class="min-h-[50vh] flex items-center justify-center">
    <div class="animate-spin text-indigo-600 text-3xl">
      <i class="fa-solid fa-spinner"></i>
    </div>
  </div>
</template>
