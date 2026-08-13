<template>
  <div class="account-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA]" :dir="layoutDirection">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

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
              <div class="absolute -end-20 -top-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
              <div class="absolute -start-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div>
            </div>
            
            <div class="relative z-10 max-w-2xl">
              <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold mb-6">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                {{ t('account.welcome_back') }}
              </div>
              <h1 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">{{ t('account.welcome_user') }} <span class="text-amber-400">{{ userName }}</span></h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">
                {{ t('account.dashboard_desc') }}
              </p>
            </div>
            
            <div class="hidden lg:block relative z-10">
               <!-- Decorative Icon/Graphic for the right side of the banner -->
               <div class="w-32 h-32 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center">
                 <svg class="w-16 h-16 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
               </div>
            </div>
          </div>

          <!-- STATS ROW (DYNAMICALLY COMPUTED FROM API ORDERS) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Stat 1: Total Orders -->
            <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
              <div class="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-[#0B0E28] transition-colors flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-[#0B0E28] group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              </div>
              <div>
                <p class="text-slate-400 text-sm font-semibold mb-1">{{ t('account.total_orders') }}</p>
                <h3 class="text-3xl font-black text-[#0B0E28]">
                  <span v-if="pending" class="text-slate-300 animate-pulse">...</span>
                  <span v-else>{{ ordersList.length }}</span>
                </h3>
              </div>
            </div>

            <!-- Stat 2: Processing Orders -->
            <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
              <div class="w-16 h-16 rounded-2xl bg-amber-50 group-hover:bg-amber-500 transition-colors flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-amber-600 group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div>
                <p class="text-slate-400 text-sm font-semibold mb-1">{{ t('account.processing_orders') }}</p>
                <h3 class="text-3xl font-black text-[#0B0E28]">
                  <span v-if="pending" class="text-slate-300 animate-pulse">...</span>
                  <span v-else>{{ processingCount }}</span>
                </h3>
              </div>
            </div>

            <!-- Stat 3: Completed Orders -->
            <div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1">
              <div class="w-16 h-16 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 transition-colors flex items-center justify-center shrink-0">
                <svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div>
                <p class="text-slate-400 text-sm font-semibold mb-1">{{ t('account.completed_orders') }}</p>
                <h3 class="text-3xl font-black text-[#0B0E28]">
                  <span v-if="pending" class="text-slate-300 animate-pulse">...</span>
                  <span v-else>{{ completedCount }}</span>
                </h3>
              </div>
            </div>
          </div>

          <!-- LOADING STATE -->
          <div v-if="pending" class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60">
            <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs font-bold text-slate-500">{{ t('account.loading_orders') }}</p>
          </div>

          <!-- RECENT ORDERS (CLEAN LUXURY TABLE) -->
          <AccountOrdersTable 
            v-else
            :orders="recentOrders" 
            :title="t('account.recent_orders')"
            :showViewAll="true"
            @open-details="openOrderDetails" 
          />
        </main>
      </div>
    </div>
    
    <!-- SECTION 2: STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-12">
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

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'
import AccountOrdersTable from '~/components/account/OrdersTable.vue'
import AccountOrderDetailsModal from '~/components/account/OrderDetailsModal.vue'
import { useAuth } from '~/composables/useAuth'
import { useLanguage } from '~/composables/useLanguage'
import { orderApiService } from '~/services/orderApiService'

const { t, formatCurrency, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('nav.account')} | أسوار جدة`)
})

const { userName } = useAuth()

const pending = ref(true)
const ordersList = ref<any[]>([])
const isOrderModalOpen = ref(false)
const activeOrderData = ref<any>(null)

const loadOrders = async () => {
  pending.value = true
  try {
    const res = await orderApiService.fetchCustomerOrders()
    const rawList = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.orders) 
          ? res.orders 
          : (Array.isArray(res?.data) ? res.data : (Array.isArray(res?.list) ? res.list : [])))

    if (Array.isArray(rawList)) {
      ordersList.value = rawList.map((item: any) => {
        const orderId = item.id || item.order_id || `#ORD-${Math.floor(1000 + Math.random() * 9000)}`
        const statusRaw = (item.order_status || item.status || 'pending').toString().toLowerCase()
        
        let statusText = t('orders.processing')
        let statusKey = 'processing'

        if (statusRaw.includes('deliver') || statusRaw.includes('complet')) {
          statusText = t('orders.completed')
          statusKey = 'completed'
        } else if (statusRaw.includes('cancel') || statusRaw.includes('fail') || statusRaw.includes('return')) {
          statusText = t('orders.cancelled')
          statusKey = 'cancelled'
        } else {
          statusText = t('orders.processing')
          statusKey = 'processing'
        }

        const dateStr = item.created_at 
          ? new Date(item.created_at).toLocaleDateString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          : '—'

        const totalAmount = Number(item.order_amount || item.total_amount || item.amount || 0)

        return {
          id: typeof orderId === 'number' ? `#ORD-${orderId}` : String(orderId).startsWith('#') ? orderId : `#${orderId}`,
          date: dateStr,
          status: statusKey,
          statusText,
          paymentMethod: item.payment_method || 'Pay',
          total: formatCurrency(totalAmount),
          rawItem: item
        }
      })
    }
  } catch (err) {
    console.warn('[AccountDashboard] Load orders failed:', err)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadOrders()
})

const recentOrders = computed(() => {
  return ordersList.value.slice(0, 5)
})

const processingCount = computed(() => {
  return ordersList.value.filter(o => o.status === 'processing').length
})

const completedCount = computed(() => {
  return ordersList.value.filter(o => o.status === 'completed').length
})

const openOrderDetails = (order: any) => {
  activeOrderData.value = order.rawItem || order
  isOrderModalOpen.value = true
}
</script>
