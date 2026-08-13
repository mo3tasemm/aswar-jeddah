<template>
  <Teleport to="body">
    <Transition name="fade">
      <!-- Backdrop -->
      <div 
        v-if="isCartOpen" 
        class="fixed inset-0 z-[100] bg-[#0B0E28]/60 backdrop-blur-sm"
        @click="closeCart"
      ></div>
    </Transition>

    <!-- Slide Transition: Left in RTL (Arabic), Right in LTR (English) -->
    <Transition :name="layoutDirection === 'rtl' ? 'slide-left' : 'slide-right'">
      <!-- Drawer Panel -->
      <div 
        v-if="isCartOpen" 
        class="w-full max-w-md bg-white shadow-2xl flex flex-col z-[110]"
        :class="layoutDirection === 'rtl' ? 'fixed inset-y-0 left-0' : 'fixed inset-y-0 right-0'"
        :dir="layoutDirection"
      >
        <!-- Header with Compare, Wishlist & Clear All Buttons -->
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white gap-2">
          <div class="flex items-center gap-2">
            <h2 class="text-base sm:text-lg font-black text-[#0B0E28]">{{ t('cart.title') }}</h2>
            <span class="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
              {{ cart.length }}
            </span>
          </div>

          <!-- Quick Action Buttons: Compare, Wishlist & Clear Cart -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <!-- Clear Cart Button -->
            <button 
              v-if="cart.length > 0"
              @click="handleClearCart" 
              class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs border border-rose-200 transition-colors cursor-pointer shrink-0"
              :title="layoutDirection === 'ltr' ? 'Clear Cart' : 'تفريغ السلة'"
            >
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span class="hidden sm:inline">{{ layoutDirection === 'ltr' ? 'Clear' : 'تفريغ' }}</span>
            </button>

            <!-- Compare Icon Link -->
            <NuxtLink 
              to="/my-account/compare" 
              @click="closeCart"
              class="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200/80 transition-colors cursor-pointer"
              :title="t('cart.compare')"
            >
              <svg class="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="20" x2="18" y2="10"></line>
                <line x1="12" y1="20" x2="12" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="14"></line>
              </svg>
              <span class="hidden sm:inline">{{ t('cart.compare') }}</span>
              <span v-if="compareCount > 0" class="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0">
                {{ compareCount }}
              </span>
            </NuxtLink>

            <!-- Wishlist Icon Link -->
            <NuxtLink 
              to="/my-account/wishlist" 
              @click="closeCart"
              class="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200/80 transition-colors cursor-pointer"
              :title="t('cart.wishlist')"
            >
              <svg class="w-4 h-4 text-rose-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <span class="hidden sm:inline">{{ t('cart.wishlist') }}</span>
              <span v-if="wishlistCount > 0" class="w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shrink-0">
                {{ wishlistCount }}
              </span>
            </NuxtLink>

            <!-- Close Button -->
            <button 
              @click="closeCart" 
              class="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        <!-- Scrollable Content -->
        <div class="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4 custom-scrollbar">
          
          <template v-if="cart.length > 0">
            <TransitionGroup name="list">
              <CartItem 
                v-for="item in cart" 
                :key="item.product.id" 
                :item="item"
                @update-quantity="updateQuantity"
                @remove-item="removeFromCart"
              />
            </TransitionGroup>
          </template>

          <div v-else class="h-full flex items-center justify-center py-10">
            <EmptyState
              :title="t('cart.empty_title')"
              :description="t('cart.empty_desc')"
              :actionText="t('cart.back_to_shop')"
              @action="closeCart(); $router.push('/shop')"
            >
              <template #icon>
                <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </template>
            </EmptyState>
          </div>
        </div>

        <!-- Footer / Checkout CTA -->
        <div v-if="cart.length > 0" class="border-t border-slate-100 bg-slate-50 p-6 shrink-0 space-y-4">
          <!-- Summary Row -->
          <div class="flex items-center justify-between text-sm font-bold text-slate-600">
            <span>{{ t('cart.subtotal') }}</span>
            <span class="text-lg text-[#0B0E28]">{{ formattedCartTotal }}</span>
          </div>
          <p class="text-xs text-slate-400 text-center">{{ t('cart.taxes_note') }}</p>
          
          <!-- Checkout Button -->
          <NuxtLink 
            to="/checkout"
            @click="closeCart"
            class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{{ t('cart.checkout_btn') }}</span>
            <svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </NuxtLink>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onUnmounted } from 'vue'
import CartItem from './CartItem.vue'
import EmptyState from '~/components/common/EmptyState.vue'
import { useCart } from '~/composables/useCart'
import { useCompare } from '~/composables/useCompare'
import { useWishlist } from '~/composables/useWishlist'
import { useLanguage } from '~/composables/useLanguage'

const { isCartOpen, cart, closeCart, updateQuantity, removeFromCart, clearCart, formattedCartTotal } = useCart()
const { compareCount } = useCompare()
const { wishlistCount } = useWishlist()
const { t, layoutDirection } = useLanguage()

const handleClearCart = async () => {
  const confirmMsg = layoutDirection.value === 'ltr' ? 'Are you sure you want to clear all items from your cart?' : 'هل أنت تأكد من رغبتك في تفريغ السلة بالكامل؟'
  if (process.client && window.confirm(confirmMsg)) {
    await clearCart()
  }
}

// Scroll Lock Logic
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = `${scrollbarWidth}px`
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.paddingRight = ''
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

watch(isCartOpen, (newVal) => {
  if (newVal) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
