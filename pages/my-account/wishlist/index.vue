<template>
  <div class="account-wishlist-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen" :dir="layoutDirection">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          
          <!-- Header Title & Bulk Actions Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h1 class="text-2xl font-black text-[#0B0E28]">{{ t('account.wishlist') }}</h1>
                <span class="bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">
                  {{ safeWishlist.length }} {{ t('order.items_count') }}
                </span>
              </div>
              <p class="text-sm text-slate-500">{{ t('wishlist.subtitle') }}</p>
            </div>
            
            <div v-if="safeWishlist.length > 0" class="flex flex-wrap items-center gap-3 shrink-0">
              <button 
                @click="clearWishlist"
                class="px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                <span>{{ t('wishlist.clear_all') }}</span>
              </button>
              <button 
                @click="addAllToCart"
                class="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <span>{{ layoutDirection === 'ltr' ? 'Add All to Cart' : 'إضافة الكل للسلة' }}</span>
              </button>
            </div>
          </div>

          <!-- 1. LOADING STATE -->
          <div v-if="wishlistPending" class="py-12 text-center space-y-4">
            <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p class="text-xs font-bold text-slate-500">{{ t('common.loading') }}</p>
          </div>

          <!-- 2. EMPTY STATE -->
          <div 
            v-else-if="safeWishlist.length === 0" 
            class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center justify-center"
          >
            <div class="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[#0B0E28] mb-2">{{ t('wishlist.empty_title') }}</h3>
            <p class="text-slate-500 max-w-sm mx-auto mb-8 text-sm">
              {{ t('wishlist.empty_desc') }}
            </p>
            <NuxtLink 
              to="/shop" 
              class="px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20"
            >
              {{ t('cart.back_to_shop') }}
            </NuxtLink>
          </div>

          <!-- 3. PRODUCTS GRID -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard 
              v-for="product in safeWishlist" 
              :key="product.id" 
              :product="product" 
            />
          </div>

        </main>
      </div>
    </div>
    
    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-12">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- LOCATION SHOWCASE -->
    <section class="w-full bg-[#F8F9FA]">
      <HomeStoreLocationShowcase/>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'
import ProductCard from '~/components/product/ProductCard.vue'
import { useWishlist } from '~/composables/useWishlist'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('account.wishlist')} | أسوار جدة`)
})

const { wishlist, wishlistItems, wishlistPending, clearWishlist } = useWishlist()
const { addToCart } = useCart()
const toast = useToast()

const safeWishlist = computed(() => {
  return wishlist?.value || wishlistItems?.value || []
})

const addAllToCart = () => {
  if (safeWishlist.value.length === 0) return
  safeWishlist.value.forEach(item => {
    addToCart(item, 1)
  })
  toast.success(
    t('product.added_to_cart'), 
    layoutDirection.value === 'ltr' ? 'All items added to cart.' : 'تمت إضافة جميع منتجات القائمة لسلة الشراء بنجاح.'
  )
}
</script>
