<template>
  <div class="checkout-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" dir="rtl">
    
    <!-- Header -->
    <header class="bg-white border-b border-slate-100 py-4 mb-8">
      <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2">
          <!-- Logo -->
          <img src="~/assets/images/Logo.png" alt="أسوار" class="h-10" />
        </NuxtLink>
        <div class="flex items-center gap-2 text-slate-500 text-sm font-bold">
          <svg class="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          تسوق آمن
        </div>
      </div>
    </header>

    <div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Stepper -->
      <CheckoutStepper :currentStep="currentStep" />

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Main Content (Left in LTR, Right in RTL) -->
        <main class="lg:col-span-8 space-y-8">
          
          <!-- Step 2: Shipping Address -->
          <section v-if="currentStep === 2" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-xl font-black text-[#0B0E28]">عنوان التوصيل</h2>
              <button @click="isAddressModalOpen = true" class="text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                إضافة عنوان
              </button>
            </div>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Addresses -->
              <label v-for="address in addresses" :key="address.id" class="cursor-pointer relative">
                <input type="radio" v-model="selectedAddress" :value="address.id" class="peer sr-only" />
                <div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/20 transition-all flex flex-col gap-2 h-full">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2 text-[#0B0E28] font-black">
                      <svg v-if="address.label === 'المنزل'" class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <svg v-else class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      {{ address.label }}
                    </div>
                    <div v-if="selectedAddress === address.id" class="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[#0B0E28]">
                      <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                  </div>
                  <p class="text-sm font-bold text-slate-600 mt-2">معتصم عاطف</p>
                  <p class="text-xs text-slate-500 leading-relaxed">{{ address.city }}، حي {{ address.district }}، {{ address.street }}</p>
                  <p class="text-xs font-bold text-[#0B0E28] mt-1" dir="ltr">{{ address.phone }}</p>
                </div>
              </label>
            </div>
          </section>

          <!-- Step 3: Payment -->
          <section v-if="currentStep === 3" class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all">
            <CheckoutPaymentMethods v-model:method="paymentMethod" />
          </section>

        </main>

        <!-- Sidebar (Order Summary) -->
        <aside class="lg:col-span-4 relative">
          <CheckoutOrderSummary :cartItems="cartItems">
            <template #action>
              <button 
                @click="nextStep"
                :disabled="isProcessing"
                class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 mt-2"
              >
                <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span v-else>{{ currentStep === 2 ? 'متابعة إلى الدفع' : 'تأكيد وإتمام الطلب' }}</span>
              </button>
              
              <button 
                v-if="currentStep === 3" 
                @click="currentStep = 2"
                :disabled="isProcessing"
                class="w-full py-3 mt-3 rounded-xl text-sm font-bold bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
              >
                العودة لعنوان التوصيل
              </button>
            </template>
          </CheckoutOrderSummary>
        </aside>

      </div>
    </div>
    
    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-20">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- Address Modal -->
    <AddressModal 
      :isOpen="isAddressModalOpen" 
      @close="isAddressModalOpen = false" 
      @save="saveAddress" 
    />

  </div>
</template>

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import CheckoutStepper from '~/components/Checkout/CheckoutStepper.vue'
import CheckoutOrderSummary from '~/components/Checkout/OrderSummary.vue'
import CheckoutPaymentMethods from '~/components/Checkout/PaymentMethods.vue'
import AddressModal from '~/components/account/AddressModal.vue'

useHead({
  title: 'إتمام الشراء | أسوار جدة'
})

const currentStep = ref(2)
const selectedAddress = ref('1')
const paymentMethod = ref('credit')
const isProcessing = ref(false)
const isAddressModalOpen = ref(false)

const addresses = ref([
  { id: '1', label: 'المنزل', city: 'جدة', district: 'الخالدية', street: 'شارع الأمير سلطان، المبنى 14', phone: '+966 501234567' },
  { id: '2', label: 'العمل', city: 'الرياض', district: 'العليا', street: 'طريق الملك فهد، برج المملكة', phone: '+966 559876543' }
])

const saveAddress = (newAddress) => {
  const mappedAddress = {
    id: newAddress.id || Date.now().toString(),
    label: newAddress.type === 'home' ? 'المنزل' : 'العمل',
    city: newAddress.city,
    district: newAddress.district,
    street: newAddress.street + (newAddress.building ? '، مبنى ' + newAddress.building : ''),
    phone: newAddress.phone
  }
  addresses.value.push(mappedAddress)
  selectedAddress.value = mappedAddress.id
  isAddressModalOpen.value = false
}

// Mock Cart Items for checkout
const cartItems = ref([
  {
    id: 1,
    name: 'سوار ذهب عيار 18 بتصميم كلاسيكي',
    category: 'أساور ذهبية',
    price: '2,450',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'قلادة ألماس مرصعة بزمرد طبيعي',
    category: 'قلائد',
    price: '5,800',
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1599643478514-4a42041b3780?q=80&w=200&auto=format&fit=crop'
  }
])

const nextStep = () => {
  if (currentStep.value === 2) {
    // Validate address then move to payment
    isProcessing.value = true
    setTimeout(() => {
      isProcessing.value = false
      currentStep.value = 3
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 600)
  } else if (currentStep.value === 3) {
    // Process Payment & Complete Order
    isProcessing.value = true
    setTimeout(() => {
      isProcessing.value = false
      alert('تم استلام طلبك بنجاح! شكراً لتسوقك من أسوار جدة.')
      // Redirect to success page or orders
    }, 1500)
  }
}
</script>
