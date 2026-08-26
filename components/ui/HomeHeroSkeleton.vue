<template>
  <div class="max-w-[1550px] mx-auto px-4 lg:px-6 my-4">
    <div class="w-full h-[320px] sm:h-[420px] md:h-[500px] bg-slate-100 rounded-3xl animate-pulse relative overflow-hidden flex items-center justify-center border border-slate-200/60">
      <div class="text-center space-y-3 p-6">
        <div class="w-16 h-16 rounded-2xl bg-slate-200 mx-auto flex items-center justify-center">
          <i class="fa-regular fa-image text-slate-300 text-2xl"></i>
        </div>
        <div class="h-6 bg-slate-200 rounded-xl w-48 sm:w-72 mx-auto"></div>
        <div class="h-4 bg-slate-200/70 rounded-lg w-32 sm:w-48 mx-auto"></div>
      </div>
      <!-- Shimmer sweep effect -->
      <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
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
  animation: shimmer 1.8s infinite;
}
</style>
