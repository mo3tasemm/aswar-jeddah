<template>
  <div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center">
    
    <!-- Icon Container -->
    <div class="relative w-28 h-28 mb-8 group">
      <!-- Background Circles -->
      <div class="absolute inset-0 bg-amber-50 rounded-full scale-110 group-hover:scale-125 transition-transform duration-500"></div>
      <div class="absolute inset-0 bg-[#0B0E28]/5 rounded-full rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
      
      <!-- Icon -->
      <div class="absolute inset-0 flex items-center justify-center text-amber-500">
        <svg class="w-12 h-12 fill-current" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      </div>
      
      <!-- Sparkles -->
      <svg class="absolute -top-2 -right-2 w-6 h-6 text-amber-300 animate-pulse" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
    </div>

    <!-- Text Content -->
    <h3 class="text-2xl font-black text-[#0B0E28] mb-3">قائمة الرغبات فارغة حالياً</h3>
    <p class="text-slate-500 max-w-md mx-auto mb-10 leading-relaxed text-sm">
      لم تقم بإضافة أي منتجات إلى قائمة رغباتك بعد. استكشف تشكيلتنا الفاخرة وأضف ما يعجبك لشرائه لاحقاً بكل سهولة.
    </p>

    <!-- Action Button -->
    <NuxtLink 
      to="/" 
      class="px-10 py-4 rounded-xl text-sm font-bold bg-[#0B0E28] text-white hover:bg-[#1a204c] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-3"
    >
      تصفح المنتجات الآن
      <svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    </NuxtLink>

  </div>
</template>

<script setup>
// Empty State component for Wishlist
</script>
