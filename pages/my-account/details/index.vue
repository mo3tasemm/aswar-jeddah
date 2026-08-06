<template>
  <div class="account-details-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA]" dir="rtl">
    
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
        <span class="text-[#0B0E28]">تفاصيل الحساب</span>
      </nav>

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR (1 Column on lg) -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA (3 Columns on lg) -->
        <main class="flex-1 min-w-0">
          <AccountProfileForm @save="handleProfileSave" />
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

    <!-- SECURITY CONFIRMATION MODAL -->
    <AccountSecurityModal 
      :isOpen="isSecurityModalOpen" 
      @close="isSecurityModalOpen = false"
      @confirm="onSecurityConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'

useHead({
  title: 'تفاصيل الحساب | أسوار جدة'
})

const isSecurityModalOpen = ref(false)
const pendingFormData = ref(null)

const handleProfileSave = (formData) => {
  pendingFormData.value = formData
  isSecurityModalOpen.value = true
}

const onSecurityConfirm = () => {
  // Proceed with actual saving logic (API Call etc.)
  console.log('Confirmed Save with data:', pendingFormData.value)
  isSecurityModalOpen.value = false
  
  // Show success toast or notification here
}
</script>
