<template>
  <div class="account-wishlist-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen" dir="rtl">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumbs -->
      <nav class="flex items-center text-sm text-slate-500 mb-8 font-medium">
        <NuxtLink to="/" class="hover:text-[#0B0E28] transition-colors">الرئيسية</NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <NuxtLink to="/my-account" class="hover:text-[#0B0E28] transition-colors">حسابي</NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-[#0B0E28]">قائمة الرغبات</span>
      </nav>

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          
          <!-- Page Header & Bulk Actions -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm border border-slate-100/60">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h1 class="text-2xl font-black text-[#0B0E28]">قائمة الرغبات والمفضلة</h1>
                <span class="bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">
                  {{ wishlist.length }} منتجات محفوظة
                </span>
              </div>
              <p class="text-sm text-slate-500">احتفظ بمنتجاتك المفضلة هنا لسهولة الوصول إليها وشرائها لاحقاً.</p>
            </div>
            
            <div v-if="wishlist.length > 0" class="flex flex-wrap items-center gap-3 shrink-0">
              <button 
                @click="clearWishlist"
                class="px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                إفراغ القائمة
              </button>
              <button 
                @click="addAllToCart"
                class="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                إضافة الكل للسلة
              </button>
            </div>
          </div>

          <!-- Empty State -->
          <AccountWishlistEmptyState v-if="wishlist.length === 0" />

          <!-- Wishlist Grid with TransitionGroup -->
          <div v-else>
            <TransitionGroup 
              name="wishlist-list" 
              tag="div" 
              class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6"
            >
              <AccountWishlistCard 
                v-for="product in wishlist" 
                :key="product.id" 
                :product="product"
                @remove-from-wishlist="removeFromWishlist"
                @add-to-cart="addToCart"
              />
            </TransitionGroup>
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

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'

useHead({
  title: 'قائمة الرغبات | أسوار جدة'
})

// Mock Data
const wishlist = ref([
  {
    id: 1,
    name: 'سوار ذهب عيار 18 بتصميم كلاسيكي مع ألماس نقي',
    category: 'أساور ذهبية',
    price: '2,450',
    oldPrice: '3,000',
    discount: '18',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=600&auto=format&fit=crop',
    inStock: true
  },
  {
    id: 2,
    name: 'قلادة ألماس مرصعة بزمرد طبيعي فائق النقاء',
    category: 'قلائد',
    price: '5,800',
    oldPrice: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1599643478514-4a42041b3780?q=80&w=600&auto=format&fit=crop',
    inStock: true
  },
  {
    id: 3,
    name: 'خاتم زواج سولتير پلاتينيوم بتصميم عصري',
    category: 'خواتم',
    price: '4,200',
    oldPrice: null,
    discount: null,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b254a4?q=80&w=600&auto=format&fit=crop',
    inStock: false
  },
  {
    id: 4,
    name: 'طقم مجوهرات متكامل للعرايس مطلي بالذهب',
    category: 'أطقم مجوهرات',
    price: '12,500',
    oldPrice: '15,000',
    discount: '15',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=600&auto=format&fit=crop',
    inStock: true
  }
])

const removeFromWishlist = (id) => {
  wishlist.value = wishlist.value.filter(p => p.id !== id)
}

const clearWishlist = () => {
  wishlist.value = []
}

const addToCart = (product) => {
  // In a real app, dispatch to store/cart composable
  console.log('Added to cart:', product.name)
}

const addAllToCart = () => {
  const availableItems = wishlist.value.filter(p => p.inStock)
  console.log('Added all available items to cart:', availableItems.length)
  // Optionally clear or keep wishlist items
}
</script>

<style scoped>
/* Transition Group Animations */
.wishlist-list-move,
.wishlist-list-enter-active,
.wishlist-list-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.wishlist-list-enter-from,
.wishlist-list-leave-to {
  opacity: 0;
  transform: scale(0.9) translateY(20px);
}

/* Ensure leaving items are taken out of layout flow so moving items animate smoothly */
.wishlist-list-leave-active {
  position: absolute;
  width: calc(100% - 1.5rem); /* account for gap if absolute */
}
</style>
