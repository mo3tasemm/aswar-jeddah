<template>
  <div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4">
    
    <!-- Header -->
    <div class="flex justify-between items-center mb-4 px-2">
      <!-- Title -->
      <h2 class="text-xl md:text-2xl font-black text-slate-800">{{ title }}</h2>
      
      <!-- Action Button -->
      <NuxtLink 
        :to="targetUrl" 
        class="bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold inline-flex items-center gap-1.5 transition-all"
      >
        <span>{{ btnText }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
      </NuxtLink>
    </div>

    <!-- Clickable Banner -->
    <NuxtLink :to="targetUrl" class="aspect-[1664/624] w-full rounded-2xl overflow-hidden bg-slate-100 relative block group shadow-sm cursor-pointer">
      <img 
        :src="bannerImage" 
        :alt="altText || title" 
        width="1664"
        height="624"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
      />
    </NuxtLink>

  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  btnText: string
  targetUrl: string
  bannerImage: string
  altText?: string
}>()
</script>
