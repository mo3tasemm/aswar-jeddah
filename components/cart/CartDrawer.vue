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

    <Transition name="slide-left">
      <!-- Drawer Panel -->
      <div 
        v-if="isCartOpen" 
        class="fixed inset-y-0 left-0 z-[110] w-full max-w-md bg-white shadow-2xl flex flex-col"
        dir="rtl"
      >
        <!-- Header -->
        <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-black text-[#0B0E28]">سلة المشتريات</h2>
            <span class="bg-amber-100 text-amber-600 text-xs font-bold px-2.5 py-1 rounded-full">
              {{ cart.length }} منتجات
            </span>
          </div>
          <button 
            @click="closeCart" 
            class="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
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
              title="سلة المشتريات فارغة"
              description="لم تقم بإضافة أي منتجات للسلة بعد. تصفح منتجاتنا واكتشف العروض المميزة!"
              actionText="العودة للمتجر"
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
            <span>المجموع الفرعي:</span>
            <span class="text-lg text-[#0B0E28]">{{ formattedCartTotal }}</span>
          </div>
          <p class="text-xs text-slate-400 text-center">الضرائب ورسوم الشحن تُحسب عند إتمام الطلب.</p>
          
          <!-- Checkout Button -->
          <NuxtLink 
            to="/checkout"
            @click="closeCart"
            class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2"
          >
            الانتقال للدفع وإتمام الشراء
            <svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </NuxtLink>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, watch, onUnmounted } from 'vue'
import CartItem from './CartItem.vue'
import EmptyState from '~/components/common/EmptyState.vue'
import { useCart } from '~/composables/useCart'

const { isCartOpen, cart, closeCart, updateQuantity, removeFromCart, formattedCartTotal } = useCart()


// SCROLL LOCK FIX LOGIC
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(() => isCartOpen.value, (newVal) => {
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide from LEFT since it's RTL and we want it on the left side */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
