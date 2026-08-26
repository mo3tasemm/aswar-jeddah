<template>
  <div class="min-h-screen flex flex-col bg-white text-slate-900 font-sans" :dir="dir">
    <!-- Main Header -->
    <TheHeader />
    
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Main Footer -->
    <TheFooter />
    
    <!-- Global Slide-over Drawers -->
    <CartDrawer />
    <LoginDrawer />

    <!-- Global Toast Notifications -->
    <TheToast />

    <!-- Global Floating Actions -->
    <ScrollToTop />

    <!-- Global Splash & Page Loading Screen -->
    <GlobalLoadingScreen />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue'
import TheFooter from '~/components/layout/TheFooter.vue'
import CartDrawer from '~/components/cart/CartDrawer.vue'
import LoginDrawer from '~/components/auth/LoginDrawer.vue'
import TheToast from '~/components/dashboard/ui/TheToast.vue'
import ScrollToTop from '~/components/common/ScrollToTop.vue'
import GlobalLoadingScreen from '~/components/common/GlobalLoadingScreen.vue'
import { useLanguage } from '~/composables/useLanguage'

const { dir } = useLanguage()
</script>
