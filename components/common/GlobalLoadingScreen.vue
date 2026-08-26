<template>
  <Teleport to="body">
    <!-- Initial Splash Loader (On First Page Load / Hydration) -->
    <Transition name="splash-fade">
      <div 
        v-if="!isAppReady" 
        class="fixed inset-0 z-[9999] bg-[#0B0E28] flex flex-col items-center justify-center select-none"
      >
        <!-- Luxury Ambient Glow Background -->
        <div class="absolute w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse"></div>
        
        <div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
          <!-- Animated Brand Logo Container -->
          <div class="relative flex items-center justify-center">
            <!-- Pulsing Golden Orbit Ring -->
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin"></div>
            
            <div class="absolute inset-0 flex items-center justify-center">
              <img 
                src="~/assets/images/Logo.png" 
                alt="أسوار جدة - Aswar Jeddah" 
                class="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md animate-pulse"
              />
            </div>
          </div>

          <!-- Brand Title & Slogan -->
          <div class="space-y-2">
            <h2 class="text-xl sm:text-2xl font-black text-white tracking-wide">
              متجر <span class="text-amber-400">أسوار جدة</span>
            </h2>
            <p class="text-xs text-slate-400 font-medium">
              جاري تجهيز تجربة التسوق المميزة...
            </p>
          </div>

          <!-- Loading Dots Indicator -->
          <div class="flex items-center gap-1.5 pt-2">
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]"></span>
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]"></span>
            <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Top Route Transition Loading Bar (On Page Navigation) -->
    <div 
      v-if="isRouteLoading"
      class="fixed top-0 left-0 right-0 z-[9990] h-1 bg-amber-500/20 overflow-hidden"
    >
      <div class="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 animate-progress"></div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useGlobalLoading } from '~/composables/useGlobalLoading'
import { useNuxtApp } from '#app'

const { isAppReady, isRouteLoading, setAppReady, startLoading, stopLoading } = useGlobalLoading()
const nuxtApp = useNuxtApp()

onMounted(() => {
  // Listen to Nuxt page transition lifecycle hooks
  nuxtApp.hook('page:start', () => {
    startLoading()
  })

  nuxtApp.hook('page:finish', () => {
    stopLoading()
  })

  // Dismiss initial splash after DOM & initial API hydrate smoothly
  setTimeout(() => {
    setAppReady(true)
  }, 450)
})
</script>

<style scoped>
.splash-fade-enter-active,
.splash-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.splash-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

@keyframes progressAnimation {
  0% {
    width: 0%;
    margin-left: 0%;
  }
  50% {
    width: 60%;
    margin-left: 20%;
  }
  100% {
    width: 100%;
    margin-left: 100%;
  }
}

.animate-progress {
  animation: progressAnimation 1.2s infinite cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
