<template>
  <div class="group relative bg-white transition-all duration-300 w-full h-full flex flex-col overflow-hidden animate-pulse">
    
    <!-- Image Area Skeleton -->
    <div class="relative w-full h-40 sm:h-48 md:h-56 bg-slate-100 flex items-center justify-center overflow-hidden shrink-0 border-b border-slate-50 p-2 sm:p-4">
      <!-- Image Placeholder -->
      <div class="w-20 h-20 bg-slate-200 rounded-full opacity-50"></div>
    </div>

    <!-- Product Details Area Skeleton -->
    <div class="flex flex-col flex-grow text-right p-3 sm:p-4 bg-white relative">
      
      <!-- Title Skeleton -->
      <div class="mb-1 h-[36px] md:h-[44px] overflow-hidden flex flex-col gap-2 pt-1">
        <div class="w-full h-3 bg-slate-200 rounded-full"></div>
        <div class="w-2/3 h-3 bg-slate-200 rounded-full"></div>
      </div>

      <!-- Brand Skeleton -->
      <div class="mb-2 h-[16px] md:h-[20px] overflow-hidden flex items-center">
        <div class="w-1/3 h-2 bg-slate-100 rounded-full"></div>
      </div>

      <!-- Availability Skeleton -->
      <div class="flex items-center justify-end gap-1.5 text-right mb-4 h-[16px] md:h-[20px]">
        <div class="w-1/4 h-2 bg-slate-200 rounded-full"></div>
      </div>

      <!-- Price Skeleton (Pinned to Bottom via mt-auto) -->
      <div class="flex items-center justify-start gap-2 mt-auto pt-2">
        <div class="w-1/2 h-5 bg-slate-200 rounded-lg"></div>
      </div>
    </div>

    <!-- Buy Button Skeleton -->
    <div class="w-full relative shrink-0">
      <!-- Cart Icon Area -->
      <div class="absolute right-0 bottom-0 top-0 w-12 md:w-16 bg-slate-100 flex items-center justify-center transition-colors border-l border-slate-50">
        <div class="w-5 h-5 bg-slate-300 rounded-md"></div>
      </div>
      <!-- Add to Cart Text Area -->
      <div class="w-full h-10 md:h-[3.25rem] bg-slate-50 flex items-center justify-center transition-colors">
        <div class="w-1/2 h-3 bg-slate-200 rounded-full"></div>
      </div>
    </div>

  </div>
</template>

<script setup>
// Skeleton component doesn't need props or logic
</script>
