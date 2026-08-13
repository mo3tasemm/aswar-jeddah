<template>
  <div class="min-h-screen bg-[#f8fafc] pb-24 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    <!-- PAGE HEADER -->
    <div class="bg-[#0B0E28] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute top-0 start-0 w-full h-full bg-gradient-to-b from-transparent to-[#0B0E28] z-0"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-3xl md:text-5xl font-black text-white mb-4 text-center">{{ t('account.orders') }}</h1>
        <p class="text-slate-300 text-center text-sm md:text-base max-w-2xl mx-auto">
          {{ t('orders.track_subtitle') }}
        </p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0 flex flex-col gap-6">
          
          <!-- FILTERS & STATS BAR -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-100/60 flex flex-wrap gap-2 w-full sm:w-auto">
              <button 
                v-for="filter in filters" 
                :key="filter.value"
                @click="activeFilter = filter.value"
                :class="[
                  'px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer',
                  activeFilter === filter.value 
                    ? 'bg-[#0B0E28] text-amber-400 shadow-md' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-50'
                ]"
              >
                {{ filter.label }}
              </button>
            </div>

            <div class="text-xs font-bold text-slate-500 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm shrink-0">
              {{ t('account.total_orders') }}: <span class="text-[#0B0E28] font-black">{{ ordersList.length }}</span>
            </div>
          </div>

          <!-- LOADING LOADER STATE -->
          <div v-if="pending" class="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-slate-100/60">
            <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-xs font-bold text-slate-500">{{ t('account.loading_orders') }}</p>
          </div>

          <!-- EMPTY STATE -->
          <div v-else-if="filteredOrders.length === 0" class="bg-white rounded-[2rem] p-12 sm:p-16 text-center shadow-sm border border-slate-100/60 space-y-6">
            <div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <div class="space-y-2 max-w-sm mx-auto">
              <h2 class="text-xl font-black text-[#0B0E28]">{{ t('orders.empty') }}</h2>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {{ t('cart.empty_desc') }}
              </p>
            </div>
            <NuxtLink 
              to="/shop" 
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B0E28] text-amber-400 font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:bg-[#151a42]"
            >
              {{ t('cart.back_to_shop') }}
            </NuxtLink>
          </div>

          <!-- DYNAMIC ORDERS TABLE -->
          <AccountOrdersTable 
            v-else
            :orders="filteredOrders" 
            :title="t('account.orders')" 
            :showViewAll="false"
            @open-details="openOrderDetails"
          />

        </main>
      </div>
    </div>

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
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'
import AccountOrdersTable from '~/components/account/OrdersTable.vue'
import AccountOrderDetailsModal from '~/components/account/OrderDetailsModal.vue'
import { orderApiService } from '~/services/orderApiService'
import { useLanguage } from '~/composables/useLanguage'

const { t, formatCurrency, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('account.orders')} | أسوار جدة`)
})

const pending = ref(true)
const ordersList = ref<any[]>([])
const isOrderModalOpen = ref(false)
const activeOrderData = ref(null)
const activeFilter = ref('all')

const filters = computed(() => [
  { label: t('common.view_all'), value: 'all' },
  { label: t('orders.processing'), value: 'processing' },
  { label: t('orders.completed'), value: 'completed' },
  { label: t('orders.cancelled'), value: 'cancelled' }
])

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
        } else if (statusRaw.includes('out') || statusRaw.includes('ship') || statusRaw.includes('confirm')) {
          statusText = t('orders.processing')
          statusKey = 'processing'
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
    console.warn('[OrdersPage] Load orders failed:', err)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadOrders()
})

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return ordersList.value
  return ordersList.value.filter(o => o.status === activeFilter.value)
})

const openOrderDetails = (order: any) => {
  activeOrderData.value = order.rawItem || order
  isOrderModalOpen.value = true
}
</script>
