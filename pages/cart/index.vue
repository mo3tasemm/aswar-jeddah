<template>
  <div class="cart-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" :dir="layoutDirection">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Loading Skeleton -->
      <CartPageSkeleton v-if="isLoading" />

      <template v-else>
        <!-- Breadcrumbs -->
        <Breadcrumbs :items="breadcrumbItems" />

        <div class="flex items-center justify-between mb-8 mt-4">
          <div class="flex items-center gap-3">
            <h1 class="text-2xl lg:text-3xl font-black text-[#0B0E28]">{{ t('cart.title') }}</h1>
            <span v-if="cart.length > 0" class="bg-amber-100 text-amber-600 text-sm font-bold px-3 py-1 rounded-full">
              {{ cartCount }} {{ layoutDirection === 'ltr' ? 'Items' : 'منتجات' }}
            </span>
          </div>

          <button 
            v-if="cart.length > 0"
            @click="clearCart"
            class="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            {{ layoutDirection === 'ltr' ? 'Clear Cart' : 'تفريغ السلة' }}
          </button>
        </div>

        <div v-if="cart.length > 0" class="flex flex-col md:flex-row gap-8 items-start">
        
        <!-- Main Content: Cart Table & Promo Code -->
        <main class="w-full md:w-3/5 lg:w-2/3 xl:w-3/4 space-y-6">
          
          <!-- Cart Table -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            <!-- Table Header -->
            <div class="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 text-start">
              <div class="col-span-5 lg:col-span-6">{{ layoutDirection === 'ltr' ? 'Product' : 'المنتج' }}</div>
              <div class="col-span-2 text-center">{{ layoutDirection === 'ltr' ? 'Price' : 'السعر' }}</div>
              <div class="col-span-3 text-center">{{ layoutDirection === 'ltr' ? 'Quantity' : 'الكمية' }}</div>
              <div class="col-span-2 text-end">{{ layoutDirection === 'ltr' ? 'Total' : 'المجموع' }}</div>
            </div>

            <!-- Table Rows -->
            <div class="divide-y divide-slate-100">
              <div v-for="item in cart" :key="item.key || item.id || item.product?.id" class="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                
                <!-- Product Details -->
                <div class="md:col-span-5 lg:col-span-6 flex items-center gap-4 text-start">
                  <!-- Remove Icon (Mobile only) -->
                  <button 
                    @click="removeFromCart(item.key || item.id || item.product?.id)" 
                    class="md:hidden w-8 h-8 shrink-0 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer" 
                    :title="t('common.delete')"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>

                  <NuxtLink :to="`/product/${item.product?.slug || item.product?.id}`" class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 group">
                    <img 
                      :src="getItemImage(item)" 
                      :alt="getItemTitle(item)" 
                      class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                    />
                  </NuxtLink>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-sm font-bold text-[#0B0E28] leading-snug line-clamp-2 hover:text-amber-500 transition-colors">
                      <NuxtLink :to="`/product/${item.product?.slug || item.product?.id}`">{{ getItemTitle(item) }}</NuxtLink>
                    </h3>
                    <span v-if="item.selectedSize || item.selectedColor" class="text-[10px] text-slate-400 mt-1 block">
                      {{ item.selectedSize }} {{ item.selectedColor }}
                    </span>
                  </div>
                </div>

                <!-- Unit Price (Desktop) -->
                <div class="hidden md:block col-span-2 text-center text-sm font-bold text-slate-600">
                  {{ formatCurrency(item.product?.price || 0) }}
                </div>

                <!-- Quantity -->
                <div class="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center mt-2 md:mt-0">
                  <!-- Mobile Unit Price -->
                  <div class="md:hidden text-sm font-bold text-slate-600">{{ formatCurrency(item.product?.price || 0) }}</div>
                  
                  <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1" dir="ltr">
                    <button 
                      @click="updateQuantity(item.key || item.id || item.product?.id, item.quantity - 1)" 
                      :disabled="item.quantity <= 1" 
                      class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span class="w-10 text-center text-sm font-bold text-[#0B0E28]">{{ item.quantity }}</span>
                    <button 
                      @click="updateQuantity(item.key || item.id || item.product?.id, item.quantity + 1)" 
                      class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                </div>

                <!-- Total & Remove (Desktop) -->
                <div class="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2 mt-2 md:mt-0 text-end">
                  <div class="text-sm font-black text-amber-500">
                    {{ formatCurrency((item.product?.price || 0) * (item.quantity || 1)) }}
                  </div>
                  <!-- Desktop Remove Button -->
                  <button 
                    @click="removeFromCart(item.key || item.id || item.product?.id)" 
                    class="hidden md:flex w-8 h-8 shrink-0 items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors ms-2 cursor-pointer" 
                    :title="t('common.delete')"
                  >
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </main>

        <!-- Sidebar: Cart Summary -->
        <aside class="w-full md:w-2/5 lg:w-1/3 xl:w-1/4">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/60 sticky top-24 text-start">
            <h3 class="text-lg font-black text-[#0B0E28] mb-6 pb-4 border-b border-slate-100">
              {{ layoutDirection === 'ltr' ? 'Order Summary' : 'إجمالي السلة' }}
            </h3>

            <div class="space-y-4 text-sm font-bold mb-6">
              <div class="flex items-center justify-between text-slate-600">
                <span>{{ t('cart.subtotal') }}</span>
                <span class="text-[#0B0E28]">{{ formattedCartTotal }}</span>
              </div>
              
              <div class="text-xs text-slate-400 font-normal">
                {{ t('cart.taxes_note') }}
              </div>
            </div>

            <div class="flex items-end justify-between pt-5 border-t border-slate-100 mb-6">
              <span class="text-base font-black text-[#0B0E28]">{{ layoutDirection === 'ltr' ? 'Total' : 'الإجمالي' }}</span>
              <span class="text-2xl font-black text-amber-500">{{ formattedCartTotal }}</span>
            </div>

            <NuxtLink 
              to="/checkout"
              class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-white hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2"
            >
              {{ t('cart.checkout_btn') }}
            </NuxtLink>
            
            <!-- Trust Badges -->
            <div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <span class="text-[10px] font-bold text-slate-600 leading-tight">
                  {{ layoutDirection === 'ltr' ? '100% Secure Payment' : 'دفع إلكتروني آمن 100%' }}
                </span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <span class="text-[10px] font-bold text-slate-600 leading-tight">
                  {{ layoutDirection === 'ltr' ? 'Certified Warranty' : 'ضمان أصلي معتمد' }}
                </span>
              </div>
            </div>

          </div>
        </aside>

      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-[#0B0E28] mb-2">{{ t('cart.empty_title') }}</h3>
        <p class="text-slate-500 max-w-sm mx-auto mb-8">{{ t('cart.empty_desc') }}</p>
        <NuxtLink 
          to="/shop"
          class="px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20"
        >
          {{ t('cart.back_to_shop') }}
        </NuxtLink>
        </div>
      </template>

    </div>

    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-20">
      <HomeStoreFeaturesBar/>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import CartPageSkeleton from '~/components/ui/CartPageSkeleton.vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import { useCart } from '~/composables/useCart'
import { useLanguage } from '~/composables/useLanguage'

const { t, formatCurrency, layoutDirection } = useLanguage()
const { cart, cartCount, formattedCartTotal, updateQuantity, removeFromCart, clearCart, isLoading } = useCart()

const breadcrumbItems = computed(() => [
  { label: layoutDirection.value === 'ltr' ? 'Home' : 'الرئيسية', to: '/' },
  { label: t('nav.cart') }
])

const getItemTitle = (item: any) => {
  const p = item?.product || {}
  if (layoutDirection.value === 'ltr') {
    return p.name_en || p.title_en || p.title || p.name || 'Product'
  }
  return p.title || p.name || p.name_ar || 'منتج'
}

const getItemImage = (item: any) => {
  const p = item?.product || {}
  const img = p.images?.[0] || p.image || p.thumbnail
  if (img && typeof img === 'string') return img
  return '/images/placeholder.png'
}

useHead({
  title: computed(() => `${t('cart.title')} | ${layoutDirection.value === 'ltr' ? 'Aswar Jeddah' : 'أسوار جدة'}`)
})
</script>