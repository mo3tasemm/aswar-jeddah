<template>
  <div class="account-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA]" dir="rtl">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumbs -->
      <nav class="flex items-center text-sm text-slate-500 mb-8 font-medium">
        <NuxtLink to="/" class="hover:text-[#0B0E28] transition-colors">الرئيسية</NuxtLink>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mx-2 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-[#0B0E28]">حسابي</span>
      </nav>

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0 flex flex-col gap-8">
          
          <!-- WELCOME BANNER -->
          <div class="relative bg-[#0B0E28] rounded-[2rem] p-10 md:p-12 overflow-hidden shadow-2xl flex items-center justify-between">
            <!-- Luxury Abstract Background Elements -->
            <div class="absolute inset-0 pointer-events-none opacity-20">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" stroke-width="0.5" fill="none"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
              </svg>
              <div class="absolute -right-20 -top-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
              <div class="absolute -left-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            </div>
            
            <div class="relative z-10 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold mb-6">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                مرحباً بعودتك إلى أسوار جدة
              </div>
              <h1 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">أهلاً بك، <span class="text-amber-400">معتصم</span></h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                هذه لوحة التحكم الخاصة بك. يمكنك من هنا تتبع طلباتك الحالية، استعراض فواتيرك، إدارة عناوينك بكل سهولة وتحديث بياناتك الشخصية للحصول على تجربة تسوق أفضل.
              </p>
            </div>
            
            <div class="hidden lg:block relative z-10">
               <!-- Decorative Icon/Graphic for the right side of the banner -->
               <div class="w-32 h-32 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center">
                 <svg class="w-16 h-16 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
               </div>
            </div>
          </div>

          <!-- STATS ROW -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Stat 1 -->
            <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
              <div class="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-[#0B0E28] transition-colors flex items-center justify-center">
                <svg class="w-7 h-7 text-[#0B0E28] group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <div>
                <p class="text-slate-400 text-sm font-semibold mb-1">إجمالي الطلبات</p>
                <h3 class="text-3xl font-black text-[#0B0E28]">24</h3>
              </div>
            </div>
          </div>

          <!-- RECENT ORDERS (CLEAN LUXURY TABLE) -->
          <AccountOrdersTable 
            :orders="recentOrders" 
            :showViewAll="true"
            @open-details="openOrderDetails" 
          />
        </main>
      </div>
    </div>
    
    <!-- SECTION 2: STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- SECTION 3: LOCATION SHOWCASE -->
    <section class="w-full bg-[#F8F9FA]">
      <HomeStoreLocationShowcase/>
    </section>

    <!-- ORDER DETAILS MODAL -->
    <AccountOrderDetailsModal 
      :isOpen="isOrderModalOpen"
      :activeOrder="activeOrderData" 
      @close="isOrderModalOpen = false" 
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'

useHead({
  title: 'حسابي | أسوار جدة'
})

const isOrderModalOpen = ref(false)
const activeOrderData = ref(null)

const recentOrders = [
  {
    id: '#ORD-7829',
    date: '12 أكتوبر 2026',
    status: 'processing',
    statusText: 'قيد التجهيز',
    customerName: 'معتصم عاطف',
    shippingAddress: 'جدة، حي الخالدية، شارع الأمير سلطان، مبنى 14',
    paymentMethod: 'بطاقة مدى',
    subtotal: 4250,
    shippingFee: 0,
    tax: 250,
    total: 4500,
    items: [
      { id: 1, name: 'ساعة ذكية فاخرة الإصدار الخامس', quantity: 1, price: 4500, image: null }
    ]
  },
  {
    id: '#ORD-7815',
    date: '05 أكتوبر 2026',
    status: 'completed',
    statusText: 'مكتمل',
    customerName: 'معتصم عاطف',
    shippingAddress: 'جدة، حي الخالدية، شارع الأمير سلطان، مبنى 14',
    paymentMethod: 'أبل باي',
    subtotal: 1100,
    shippingFee: 50,
    tax: 100,
    total: 1250,
    items: [
      { id: 2, name: 'سماعات بلوتوث لاسلكية عازلة للضوضاء', quantity: 1, price: 1250, image: null }
    ]
  }
]

const openOrderDetails = (order) => {
  activeOrderData.value = order
  isOrderModalOpen.value = true
}
</script>

<style scoped>
/* Optional specific micro-animations could go here if needed */
</style>
