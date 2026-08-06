<template>
  <div class="min-h-screen bg-[#f8fafc] pb-24" dir="rtl">
    <!-- PAGE HEADER -->
    <div class="bg-[#0B0E28] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-[#0B0E28] z-0"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-3xl md:text-5xl font-black text-white mb-4 text-center">طلباتي</h1>
        <p class="text-slate-300 text-center text-sm md:text-base max-w-2xl mx-auto">
          تابع حالة طلباتك الحالية واستعرض سجل مشترياتك السابقة بكل سهولة.
        </p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="container mx-auto px-4 -mt-10 relative z-20">
      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0 flex flex-col gap-6">
          
          <!-- FILTERS -->
          <div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-100/60 flex flex-wrap gap-2 w-full max-w-fit">
            <button 
              v-for="filter in filters" 
              :key="filter.value"
              @click="activeFilter = filter.value"
              :class="[
                'px-6 py-2.5 rounded-xl text-sm font-bold transition-all',
                activeFilter === filter.value 
                  ? 'bg-[#0B0E28] text-white shadow-md' 
                  : 'bg-transparent text-slate-500 hover:bg-slate-50'
              ]"
            >
              {{ filter.label }}
            </button>
          </div>

          <!-- ORDERS TABLE -->
          <AccountOrdersTable 
            :orders="filteredOrders" 
            title="سجل الطلبات" 
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

<script setup>
import { ref, computed } from 'vue'

useHead({
  title: 'طلباتي | أسوار جدة'
})

const isOrderModalOpen = ref(false)
const activeOrderData = ref(null)
const activeFilter = ref('all')

const filters = [
  { label: 'الكل', value: 'all' },
  { label: 'قيد التجهيز', value: 'processing' },
  { label: 'مكتملة', value: 'completed' },
  { label: 'ملغاة', value: 'cancelled' }
]

// Mock Orders Data
const allOrders = [
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
  },
  {
    id: '#ORD-7750',
    date: '18 سبتمبر 2026',
    status: 'completed',
    statusText: 'مكتمل',
    customerName: 'معتصم عاطف',
    shippingAddress: 'جدة، حي الخالدية، شارع الأمير سلطان، مبنى 14',
    paymentMethod: 'فيزا',
    subtotal: 8000,
    shippingFee: 0,
    tax: 900,
    total: 8900,
    items: [
      { id: 3, name: 'هاتف ذكي الإصدار الأحدث 256 جيجابايت', quantity: 1, price: 4900, image: null },
      { id: 4, name: 'جهاز لوحي للرسم الرقمي', quantity: 1, price: 4000, image: null }
    ]
  },
  {
    id: '#ORD-7621',
    date: '01 سبتمبر 2026',
    status: 'cancelled',
    statusText: 'ملغى',
    customerName: 'معتصم عاطف',
    shippingAddress: 'جدة، حي الخالدية، شارع الأمير سلطان، مبنى 14',
    paymentMethod: 'فيزا',
    subtotal: 300,
    shippingFee: 20,
    tax: 30,
    total: 350,
    items: [
      { id: 5, name: 'شاحن جداري سريع 65 واط', quantity: 1, price: 350, image: null }
    ]
  }
]

const filteredOrders = computed(() => {
  if (activeFilter.value === 'all') return allOrders
  return allOrders.filter(order => order.status === activeFilter.value)
})

const openOrderDetails = (order) => {
  activeOrderData.value = order
  isOrderModalOpen.value = true
}
</script>
