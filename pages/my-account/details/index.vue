<template>
  <div class="account-details-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" :dir="layoutDirection">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          <AccountProfileForm />
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
import AccountProfileForm from '~/components/account/ProfileForm.vue'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('account.details')} | أسوار جدة`)
})
</script>
