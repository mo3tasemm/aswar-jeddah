<template>
  <div class="account-addresses-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" :dir="layoutDirection">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          
          <!-- Page Header -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 class="text-2xl font-black text-[#0B0E28]">{{ t('account.addresses') }}</h1>
              <p class="text-sm text-slate-500 mt-1">{{ t('addresses.subtitle') }}</p>
            </div>
            <button 
              @click="openAddModal"
              class="px-6 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              <span>{{ t('addresses.add_new') }}</span>
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="addressPending" class="py-12 text-center">
            <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs font-bold text-slate-500">{{ t('addresses.loading') }}</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="addresses.length === 0" class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center">
            <div class="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6">
              <svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <h3 class="text-xl font-bold text-[#0B0E28] mb-2">{{ t('addresses.empty_title') }}</h3>
            <p class="text-slate-500 max-w-sm mx-auto mb-8 text-sm">{{ t('addresses.empty_desc') }}</p>
            <button 
              @click="openAddModal"
              class="px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 cursor-pointer"
            >
              {{ t('addresses.add_first') }}
            </button>
          </div>

          <!-- Addresses Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="addr in addresses" 
              :key="getAddrId(addr)" 
              class="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex flex-col justify-between relative group hover:shadow-lg transition-all"
            >
              <div>
                <div class="flex items-center justify-between gap-2 mb-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500 font-bold">
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                    </div>
                    <h3 class="font-bold text-lg text-[#0B0E28]">{{ getAddrTitle(addr) }}</h3>
                  </div>

                  <span v-if="isAddrDefault(addr)" class="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold">
                    {{ t('addresses.default_badge') }}
                  </span>
                </div>

                <div class="space-y-2 text-slate-600 text-sm mb-6">
                  <p class="font-medium flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>{{ getAddrContactName(addr) }}</span>
                  </p>
                  <p class="font-medium flex items-center gap-2">
                    <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <span dir="ltr" class="text-start">{{ getAddrPhone(addr) }}</span>
                  </p>
                  <p class="font-medium flex items-start gap-2 pt-1">
                    <svg class="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <span>{{ getAddrText(addr) }}</span>
                  </p>
                </div>
              </div>

              <!-- Actions Bar -->
              <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button 
                  @click="deleteAddress(getAddrId(addr))"
                  class="px-4 py-2 rounded-xl text-rose-500 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer"
                >
                  {{ t('common.delete') }}
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>

    <!-- ADD ADDRESS MODAL -->
    <Teleport to="body">
      <div v-if="isAddModalOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0E28]/60 backdrop-blur-sm" :dir="layoutDirection">
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 class="text-xl font-black text-[#0B0E28]">{{ t('addresses.modal_title') }}</h3>
            <button @click="isAddModalOpen = false" class="text-slate-400 hover:text-slate-600">✕</button>
          </div>

          <form @submit.prevent="handleSaveAddress" class="space-y-4">
            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">{{ t('addresses.recipient_name') }}</label>
              <input type="text" v-model="newAddr.contact_person_name" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" :placeholder="t('addresses.recipient_name')" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">{{ t('addresses.phone') }}</label>
              <input type="tel" v-model="newAddr.contact_person_number" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="05xxxxxxxx" dir="ltr" />
            </div>

            <div class="space-y-1">
              <label class="text-xs font-bold text-slate-700">{{ t('addresses.detailed') }}</label>
              <textarea v-model="newAddr.address" required rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm" :placeholder="t('addresses.detailed')"></textarea>
            </div>

            <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button type="button" @click="isAddModalOpen = false" class="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">{{ t('common.cancel') }}</button>
              <button type="submit" :disabled="isSubmitting" class="px-8 py-2.5 rounded-xl bg-[#0B0E28] text-amber-400 font-bold text-xs shadow-md disabled:opacity-50">
                <span>{{ isSubmitting ? t('addresses.saving') : t('addresses.save') }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'
import { addressApiService } from '~/services/addressApiService'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('account.addresses')} | أسوار جدة`)
})

const toast = useToast()

const addressPending = ref(true)
const addresses = ref<any[]>([])
const isAddModalOpen = ref(false)
const isSubmitting = ref(false)

const newAddr = reactive({
  contact_person_name: '',
  contact_person_number: '',
  address: '',
  city: 'جدة',
  zip: '21577',
  address_type: 'Home'
})

const getAddrId = (addr: any) => addr?.id || addr?.address_id || Math.random()
const getAddrTitle = (addr: any) => addr?.address_type || addr?.type || addr?.title || addr?.label || t('addresses.default_title')
const getAddrContactName = (addr: any) => addr?.contact_person_name || addr?.contact_name || addr?.name || addr?.person_name || '—'
const getAddrPhone = (addr: any) => addr?.contact_person_number || addr?.phone || addr?.mobile || addr?.contact_phone || '—'
const getAddrText = (addr: any) => addr?.address || addr?.address_1 || addr?.street || addr?.city || '—'
const isAddrDefault = (addr: any) => Boolean(addr?.is_default || addr?.is_billing || addr?.default)

const loadAddresses = async () => {
  addressPending.value = true
  try {
    const res = await addressApiService.fetchAddresses()
    const list = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.addresses) 
          ? res.addresses 
          : (Array.isArray(res?.data) ? res.data : []))

    addresses.value = Array.isArray(list) ? list : []
  } catch (e) {
    console.warn('[AddressesPage] Load failed:', e)
    addresses.value = []
  } finally {
    addressPending.value = false
  }
}

onMounted(() => {
  loadAddresses()
})

const openAddModal = () => {
  isAddModalOpen.value = true
}

const handleSaveAddress = async () => {
  isSubmitting.value = true
  try {
    const res = await addressApiService.addAddress(newAddr)
    if (res.success) {
      toast.success(t('common.save'), t('addresses.modal_title'))
      isAddModalOpen.value = false
      newAddr.contact_person_name = ''
      newAddr.contact_person_number = ''
      newAddr.address = ''
      loadAddresses()
    } else {
      toast.error('خطأ', res.message || 'فشل حفظ العنوان.')
    }
  } catch (e) {
    toast.error('خطأ', 'فشل حفظ العنوان.')
  } finally {
    isSubmitting.value = false
  }
}

const deleteAddress = async (id: number | string) => {
  try {
    const res = await addressApiService.deleteAddress(id)
    if (res.success) {
      toast.success(t('common.delete'), t('account.addresses'))
      loadAddresses()
    }
  } catch (e) {
    toast.error('خطأ', 'فشل حذف العنوان.')
  }
}
</script>
