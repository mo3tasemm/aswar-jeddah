<template>
  <div class="account-addresses-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen" dir="rtl">
    
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
        <span class="text-[#0B0E28]">عناوين التوصيل</span>
      </nav>

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          
          <!-- Page Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 class="text-2xl font-black text-[#0B0E28]">عناوين التوصيل</h1>
              <p class="text-sm text-slate-500 mt-1">إدارة العناوين المحفوظة لتسهيل عملية الدفع في طلباتك القادمة.</p>
            </div>
            <button 
              @click="openAddModal"
              class="px-6 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 shrink-0"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>إضافة عنوان جديد</span>
            </button>
          </div>

          <!-- Empty State -->
          <div v-if="addresses.length === 0" class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center">
            <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 class="text-xl font-bold text-[#0B0E28] mb-2">لا توجد عناوين محفوظة</h3>
            <p class="text-slate-500 max-w-sm mx-auto mb-8">قم بإضافة عنوان التوصيل الخاص بك لتتمكن من إتمام طلباتك بكل سرعة وسهولة في المرات القادمة.</p>
            <button 
              @click="openAddModal"
              class="px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20"
            >
              إضافة عنوانك الأول
            </button>
          </div>

          <!-- Addresses Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            
            <!-- Address Cards -->
            <AccountAddressCard 
              v-for="address in addresses" 
              :key="address.id" 
              :address="address"
              @edit="openEditModal"
              @delete="deleteAddress"
              @set-default="setDefaultAddress"
            />

            <!-- Interactive Add Card -->
            <button 
              @click="openAddModal"
              class="bg-slate-50/50 hover:bg-slate-50 rounded-[1.5rem] p-6 border-2 border-dashed border-slate-200 hover:border-amber-400 transition-all flex flex-col items-center justify-center min-h-[220px] text-slate-400 hover:text-amber-500 group"
            >
              <div class="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              </div>
              <span class="font-bold">إضافة عنوان جديد</span>
            </button>

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

    <!-- ADDRESS MODAL -->
    <AccountAddressModal 
      :isOpen="isModalOpen" 
      :addressData="activeAddress"
      @close="isModalOpen = false"
      @save="saveAddress"
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'

useHead({
  title: 'عناوين التوصيل | أسوار جدة'
})

const isModalOpen = ref(false)
const activeAddress = ref(null)

// Mock Data
const addresses = ref([
  {
    id: 1,
    type: 'home',
    title: '',
    receiverName: 'معتصم عاطف',
    phone: '501234567',
    city: 'جدة',
    district: 'حي الخالدية',
    street: 'الأمير سلطان',
    building: '14',
    notes: '',
    isDefault: true
  },
  {
    id: 2,
    type: 'office',
    title: 'مكتب الشركة',
    receiverName: 'معتصم عاطف',
    phone: '559876543',
    city: 'الرياض',
    district: 'حي العليا',
    street: 'طريق الملك فهد',
    building: 'برج المملكة، الدور 15',
    notes: 'التوصيل خلال أوقات الدوام الرسمي فقط',
    isDefault: false
  }
])

const openAddModal = () => {
  activeAddress.value = null
  isModalOpen.value = true
}

const openEditModal = (address) => {
  activeAddress.value = { ...address }
  isModalOpen.value = true
}

const deleteAddress = (id) => {
  addresses.value = addresses.value.filter(a => a.id !== id)
}

const setDefaultAddress = (id) => {
  addresses.value.forEach(a => {
    a.isDefault = a.id === id
  })
}

const saveAddress = (formData) => {
  if (formData.isDefault) {
    addresses.value.forEach(a => a.isDefault = false)
  }

  if (formData.id) {
    // Edit existing
    const index = addresses.value.findIndex(a => a.id === formData.id)
    if (index !== -1) {
      addresses.value[index] = { ...formData }
    }
  } else {
    // Add new
    const newId = addresses.value.length > 0 ? Math.max(...addresses.value.map(a => a.id)) + 1 : 1
    addresses.value.push({ ...formData, id: newId })
  }
  
  isModalOpen.value = false
}
</script>
