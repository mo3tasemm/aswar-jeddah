<template>
  <div class="bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3 animate-pulse">
    <!-- Image Box Skeleton -->
    <div class="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden">
      <div class="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center">
        <i class="fa-regular fa-image text-slate-300 text-xl"></i>
      </div>
      <!-- Shimmer sweep effect -->
      <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
    </div>

    <!-- Category / Brand Line Skeleton -->
    <div class="h-3 bg-slate-100 rounded-md w-1/3"></div>

    <!-- Product Title Skeleton (2 lines) -->
    <div class="space-y-1.5 pt-1">
      <div class="h-4 bg-slate-200/80 rounded-md w-full"></div>
      <div class="h-4 bg-slate-200/60 rounded-md w-3/4"></div>
    </div>

    <!-- Price & Button Row Skeleton -->
    <div class="flex items-center justify-between pt-3 border-t border-slate-100">
      <div class="space-y-1">
        <div class="h-5 bg-amber-100 rounded-md w-20"></div>
        <div class="h-3 bg-slate-100 rounded-md w-12"></div>
      </div>
      <div class="w-9 h-9 rounded-xl bg-slate-100 shrink-0"></div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
.animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>
