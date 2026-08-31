<template>
  <div class="checkout-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-16 sm:pb-24 font-sans" :dir="layoutDirection">
    
    <!-- Top Breadcrumb & Page Header Section -->
    <div class="bg-white border-b border-slate-200/70 py-4 sm:py-5 mb-6 sm:mb-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <!-- Breadcrumbs & Title -->
          <div class="text-start">
            <nav class="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-1.5">
              <NuxtLink :to="localePath('/')" class="hover:text-amber-500 transition-colors">
                {{ isEn ? 'Home' : 'الرئيسية' }}
              </NuxtLink>
              <span>/</span>
              <NuxtLink :to="localePath('/cart')" class="hover:text-amber-500 transition-colors">
                {{ isEn ? 'Shopping Cart' : 'سلة المشتريات' }}
              </NuxtLink>
              <span>/</span>
              <span class="text-slate-700 font-bold">
                {{ currentStep === 2 ? (isEn ? 'Shipping Address' : 'عنوان الشحن') : (isEn ? 'Payment Method' : 'طريقة الدفع') }}
              </span>
            </nav>
            <h1 class="text-xl sm:text-2xl font-black text-[#0B0E28]">
              {{ currentStep === 2 ? (isEn ? 'Step 2: Shipping & Delivery Address' : 'الخطوة 2: عنوان الشحن والتوصيل') : (isEn ? 'Step 3: Choose Payment Gateway' : 'الخطوة 3: اختيار وسيلة الدفع') }}
            </h1>
          </div>

          <!-- Security Badge -->
          <div class="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold w-fit">
            <svg class="w-4 h-4 text-emerald-600 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>{{ isEn ? '256-Bit SSL Encrypted Checkout' : 'دفع آمن ومشفّر 100%' }}</span>
          </div>
        </div>

      </div>
    </div>

    <div class="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
      
      <!-- 4-Step Checkout Stepper -->
      <div class="mb-6 sm:mb-8">
        <CheckoutStepper :currentStep="currentStep" @step-click="handleStepClick" />
      </div>

      <!-- Empty Cart Alert -->
      <div v-if="!isCartLoading && (!cart || cart.length === 0)" class="bg-white rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-sm border border-slate-100">
        <div class="w-16 h-16 sm:w-20 sm:h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h2 class="text-lg sm:text-xl font-black text-[#0B0E28] mb-2">{{ isEn ? 'Your cart is empty' : 'سلة المشتريات فارغة' }}</h2>
        <p class="text-xs sm:text-sm text-slate-500 mb-6">{{ isEn ? 'Add some electronics and products to your cart before proceeding.' : 'يرجى إضافة بعض المنتجات إلى سلتك قبل المتابعة للدفع.' }}</p>
        <NuxtLink :to="localePath('/shop')" class="inline-flex items-center justify-center px-6 py-3 bg-[#0B0E28] text-amber-400 font-bold text-xs sm:text-sm rounded-xl hover:bg-[#151a42] transition-colors shadow-md">
          {{ isEn ? 'Start Shopping' : 'تصفح المتجر الآن' }}
        </NuxtLink>
      </div>

      <!-- Two-Column Checkout Layout -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        
        <!-- Left Column (Step 2 or Step 3) -->
        <main class="lg:col-span-8 space-y-6">
          
          <!-- ============================================== -->
          <!-- STEP 2: SHIPPING & DELIVERY ADDRESS -->
          <!-- ============================================== -->
          <section v-if="currentStep === 2" class="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-100 transition-all">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-sm sm:text-base shrink-0">
                  2
                </div>
                <div class="text-start">
                  <h2 class="text-base sm:text-lg font-black text-[#0B0E28]">{{ isEn ? 'Shipping & Delivery Address' : 'عنوان الشحن والتوصيل' }}</h2>
                  <p class="text-xs text-slate-400">{{ isEn ? 'Where should we deliver your order?' : 'حدد عنوان استلام شحنتك' }}</p>
                </div>
              </div>

              <!-- Switch between Saved Addresses and Direct Form -->
              <div v-if="addresses.length > 0" class="flex items-center">
                <button 
                  type="button"
                  @click="useSavedAddressMode = !useSavedAddressMode"
                  class="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  {{ useSavedAddressMode ? (isEn ? '+ Enter New Address' : '+ إدخال عنوان جديد') : (isEn ? 'Choose Saved Address' : 'اختيار من العناوين المحفوظة') }}
                </button>
              </div>
            </div>

            <!-- Option A: User has saved addresses and wants to choose one -->
            <div v-if="useSavedAddressMode && addresses.length > 0" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <label 
                  v-for="addr in addresses" 
                  :key="addr.id" 
                  class="cursor-pointer relative block"
                >
                  <input 
                    type="radio" 
                    v-model="selectedAddressId" 
                    :value="addr.id" 
                    class="peer sr-only" 
                  />
                  <div class="p-4 rounded-2xl border-2 transition-all h-full flex flex-col justify-between text-start"
                    :class="selectedAddressId === addr.id ? 'border-amber-400 bg-amber-50/30 ring-2 ring-amber-400/20' : 'border-slate-200 hover:border-slate-300 bg-white'">
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="text-[11px] font-black text-[#0B0E28] bg-slate-100 px-2 py-0.5 rounded-md">
                          {{ addr.address_type || (isEn ? 'Home' : 'المنزل') }}
                        </span>
                        <div v-if="selectedAddressId === addr.id" class="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[#0B0E28]">
                          <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </div>
                      </div>
                      <p class="text-sm font-bold text-slate-800">{{ addr.contact_person_name }}</p>
                      <p class="text-xs text-slate-500 mt-1 leading-relaxed">{{ addr.city }} - {{ addr.address }}</p>
                    </div>
                    <p class="text-xs font-bold text-slate-700 mt-3" dir="ltr">{{ addr.phone || addr.contact_person_number }}</p>
                  </div>
                </label>
              </div>

              <!-- Button to open Add Address Modal if needed -->
              <button 
                type="button" 
                @click="isAddressModalOpen = true" 
                class="w-full py-2.5 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-xl text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              >
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <span>{{ isEn ? 'Add New Address to Profile' : 'إضافة عنوان جديد إلى حسابك' }}</span>
              </button>
            </div>

            <!-- Option B: Direct Inline Address Form -->
            <div v-else class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                
                <!-- Full Name -->
                <div class="text-start">
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ isEn ? 'Full Name' : 'الاسم الكامل' }} <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    v-model="addressForm.fullName" 
                    :placeholder="isEn ? 'e.g. Mohammed Al-Ghamdi' : 'مثال: محمد الغامدي'"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-white"
                    :class="{ 'border-rose-400 bg-rose-50/20': errors.fullName }"
                  />
                  <span v-if="errors.fullName" class="text-[11px] text-rose-500 font-bold mt-1 block">{{ errors.fullName }}</span>
                </div>

                <!-- Phone Number -->
                <div class="text-start">
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ isEn ? 'Mobile Phone Number' : 'رقم الجوال' }} <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative" dir="ltr">
                    <input 
                      type="tel" 
                      v-model="addressForm.phone" 
                      placeholder="05XXXXXXXX"
                      class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-white text-start"
                      :class="{ 'border-rose-400 bg-rose-50/20': errors.phone }"
                    />
                  </div>
                  <span v-if="errors.phone" class="text-[11px] text-rose-500 font-bold mt-1 block">{{ errors.phone }}</span>
                </div>

                <!-- City -->
                <div class="text-start">
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ isEn ? 'City' : 'المدينة' }} <span class="text-rose-500">*</span>
                  </label>
                  <div class="relative">
                    <select 
                      v-model="addressForm.city"
                      class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-white appearance-none"
                    >
                      <option value="جدة">{{ isEn ? 'Jeddah' : 'جدة' }}</option>
                      <option value="الرياض">{{ isEn ? 'Riyadh' : 'الرياض' }}</option>
                      <option value="مكة المكرمة">{{ isEn ? 'Makkah' : 'مكة المكرمة' }}</option>
                      <option value="المدينة المنورة">{{ isEn ? 'Madinah' : 'المدينة المنورة' }}</option>
                      <option value="الدمام">{{ isEn ? 'Dammam' : 'الدمام' }}</option>
                      <option value="الخبر">{{ isEn ? 'Khobar' : 'الخبر' }}</option>
                      <option value="الطائف">{{ isEn ? 'Taif' : 'الطائف' }}</option>
                      <option value="أخرى">{{ isEn ? 'Other City' : 'مدينة أخرى' }}</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center px-4 text-slate-400">
                      <svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </div>
                  </div>
                </div>

                <!-- District / Neighborhood -->
                <div class="text-start">
                  <label class="block text-xs font-bold text-slate-700 mb-1.5">
                    {{ isEn ? 'District / Neighborhood' : 'الحي / المنطقة' }} <span class="text-rose-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    v-model="addressForm.district" 
                    :placeholder="isEn ? 'e.g. Al-Safa / Al-Rawdah' : 'مثال: حي الصفا / حي الروضة'"
                    class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-white"
                    :class="{ 'border-rose-400 bg-rose-50/20': errors.district }"
                  />
                  <span v-if="errors.district" class="text-[11px] text-rose-500 font-bold mt-1 block">{{ errors.district }}</span>
                </div>

              </div>

              <!-- Street Address & Details -->
              <div class="text-start">
                <label class="block text-xs font-bold text-slate-700 mb-1.5">
                  {{ isEn ? 'Street Address & Building / Villa Details' : 'اسم الشارع، رقم المبنى أو تفاصيل العنوان' }} <span class="text-rose-500">*</span>
                </label>
                <input 
                  type="text" 
                  v-model="addressForm.street" 
                  :placeholder="isEn ? 'Street name, building number, apartment/villa details' : 'الشارع، رقم العمارة، رقم الشقة أو تفاصيل المعلم القريب'"
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all bg-white"
                  :class="{ 'border-rose-400 bg-rose-50/20': errors.street }"
                />
                <span v-if="errors.street" class="text-[11px] text-rose-500 font-bold mt-1 block">{{ errors.street }}</span>
              </div>
            </div>
          </section>

          <!-- ============================================== -->
          <!-- STEP 3: PAYMENT METHODS & NOTES -->
          <!-- ============================================== -->
          <section v-if="currentStep === 3" class="space-y-6">
            
            <!-- Address Summary Banner (with quick Edit button) -->
            <div class="bg-amber-50/50 border border-amber-200/70 rounded-3xl p-4 sm:p-5 flex items-center justify-between gap-3 text-start">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                </div>
                <div>
                  <span class="text-xs font-bold text-slate-400 block">{{ isEn ? 'Delivering to:' : 'عنوان التوصيل المختار:' }}</span>
                  <span class="text-xs sm:text-sm font-black text-[#0B0E28] block">{{ getSelectedAddressText() }}</span>
                </div>
              </div>
              
              <button 
                type="button"
                @click="currentStep = 2"
                class="px-3 py-1.5 bg-white border border-amber-300 text-amber-700 hover:bg-amber-100 rounded-xl text-xs font-black transition-colors cursor-pointer shrink-0"
              >
                {{ isEn ? 'Edit' : 'تعديل' }}
              </button>
            </div>

            <!-- Payment Gateways Selection Component -->
            <div class="bg-white rounded-3xl p-5 sm:p-7 shadow-xs border border-slate-100 transition-all">
              <div class="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
                <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-black text-sm sm:text-base shrink-0">
                  3
                </div>
                <div class="text-start">
                  <h2 class="text-base sm:text-lg font-black text-[#0B0E28]">{{ isEn ? 'Payment Method' : 'طريقة الدفع' }}</h2>
                  <p class="text-xs text-slate-400">{{ isEn ? 'Choose your preferred secure payment gateway' : 'اختر بوابة الدفع الآمنة المفضلة لديك' }}</p>
                </div>
              </div>

              <CheckoutPaymentMethods v-model:method="selectedPaymentGateway" />

              <!-- Order Notes -->
              <div class="text-start mt-6 pt-5 border-t border-slate-100">
                <label class="block text-xs font-bold text-slate-700 mb-2">
                  {{ isEn ? 'Order Notes & Delivery Instructions (Optional)' : 'ملاحظات الطلب أو تعليمات التوصيل (اختياري)' }}
                </label>
                <textarea 
                  v-model="orderNote" 
                  rows="2" 
                  :placeholder="isEn ? 'Any notes regarding delivery, packaging, or timing...' : 'أي ملاحظات خاصة بالتوصيل، أوقات الاستلام أو تفاصيل إضافية...'" 
                  class="w-full px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 resize-none transition-all bg-white"
                ></textarea>
              </div>
            </div>

          </section>

        </main>

        <!-- Right Column: Order Summary & Stepper Action Buttons -->
        <aside class="lg:col-span-4 w-full">
          
          <CheckoutOrderSummary 
            :cartItems="cart" 
            @coupon-applied="onCouponApplied"
            @financials-updated="onFinancialsUpdated"
          >
            <template #action>
              
              <!-- STEP 2 ACTION: Proceed to Payment Step -->
              <div v-if="currentStep === 2" class="mt-4">
                <button 
                  type="button"
                  @click="goToPaymentStep"
                  class="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl text-sm sm:text-base font-black bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] active:scale-[0.99] transition-all duration-200 shadow-xl shadow-[#0B0E28]/15 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <span>{{ isEn ? 'Proceed to Payment (Step 3)' : 'المتابعة لطريقة الدفع (الخطوة 3)' }}</span>
                  <svg class="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </div>

              <!-- STEP 3 ACTION: Place Order & Pay Now -->
              <div v-else-if="currentStep === 3" class="space-y-3 mt-4">
                <button 
                  type="button"
                  @click="handlePlaceOrderAndPay"
                  :disabled="isProcessing || isCartLoading || !cart || cart.length === 0"
                  class="w-full py-3.5 sm:py-4 px-5 sm:px-6 rounded-2xl text-sm sm:text-base font-black bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] active:scale-[0.99] transition-all duration-200 shadow-xl shadow-[#0B0E28]/15 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                >
                  <svg v-if="isProcessing" class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>

                  <span v-if="!isProcessing">
                    {{ isEn ? 'Place Order & Pay Now' : 'إتمام الطلب والدفع' }}
                  </span>
                  <span v-else class="text-xs sm:text-sm">
                    {{ redirectingMessage || (isEn ? 'Preparing secure payment...' : 'جاري التحويل لبوابة الدفع...') }}
                  </span>

                  <svg v-if="!isProcessing" class="w-4 h-4 sm:w-5 sm:h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <!-- Back to Step 2 Button -->
                <button 
                  type="button" 
                  @click="currentStep = 2"
                  :disabled="isProcessing"
                  class="w-full py-2.5 sm:py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg class="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  <span>{{ isEn ? 'Back to Shipping Address' : 'الرجوع لتعديل عنوان الشحن' }}</span>
                </button>
              </div>

              <p class="text-[11px] text-center text-slate-400 font-medium mt-3">
                {{ isEn ? 'You will be securely redirected to the payment gateway to complete your payment.' : 'سيتم تحويلك بشكل آمن إلى بوابة الدفع لإتمام العملية.' }}
              </p>
            </template>
          </CheckoutOrderSummary>

        </aside>

      </div>
    </div>
    
    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-16 sm:mt-20">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- Address Modal (For adding addresses to saved profile list) -->
    <AddressModal 
      :isOpen="isAddressModalOpen" 
      @close="isAddressModalOpen = false" 
      @saved="onAddressModalSaved" 
    />

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import CheckoutStepper from '~/components/Checkout/CheckoutStepper.vue'
import CheckoutOrderSummary from '~/components/Checkout/OrderSummary.vue'
import CheckoutPaymentMethods from '~/components/Checkout/PaymentMethods.vue'
import AddressModal from '~/components/account/AddressModal.vue'
import { useCart } from '~/composables/useCart'
import { useAddresses } from '~/composables/useAddresses'
import { orderApiService } from '~/services/orderApiService'
import { addressApiService } from '~/services/addressApiService'
import { paymentApiService } from '~/services/paymentApiService'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { layoutDirection, localePath, currentLanguage } = useLanguage()
const isEn = computed(() => currentLanguage.value === 'en')

useHead({
  title: computed(() => isEn.value ? 'Checkout & Secure Payment - Aswar' : 'إتمام الطلب والدفع الآمن - أسوار جدة')
})

const { cart, clearCart, isCartLoading } = useCart()
const { addresses, selectedAddressId, loadAddresses } = useAddresses()
const toast = useToast()

// 4-Step Checkout Management (Step 1: Cart, Step 2: Shipping, Step 3: Payment, Step 4: Confirmation)
const currentStep = ref(2)

const selectedPaymentGateway = ref<'moyasar' | 'tamara' | 'tabby' | 'offline_payment' | string>('moyasar')
const orderNote = ref('')
const couponCode = ref('')
const isProcessing = ref(false)
const redirectingMessage = ref('')
const isAddressModalOpen = ref(false)
const useSavedAddressMode = ref(false)

// Window Polling Reference
let paymentCheckTimer: ReturnType<typeof setInterval> | null = null
let paymentWindow: Window | null = null

const stopPaymentPolling = () => {
  if (paymentCheckTimer) {
    clearInterval(paymentCheckTimer)
    paymentCheckTimer = null
  }
}

// Inline Address Form
const addressForm = reactive({
  fullName: '',
  phone: '',
  city: 'جدة',
  district: '',
  street: '',
  notes: ''
})

const errors = reactive({
  fullName: '',
  phone: '',
  district: '',
  street: ''
})

const checkoutFinancials = ref({
  subtotal: 0,
  discount: 0,
  shippingFee: 0,
  total: 0,
  couponCode: ''
})

onMounted(async () => {
  await loadAddresses()
  if (addresses.value && addresses.value.length > 0) {
    useSavedAddressMode.value = true
    if (!selectedAddressId.value) {
      selectedAddressId.value = addresses.value[0].id
    }
  }

  // Listen for callback messages from popup if applicable
  if (process.client) {
    window.addEventListener('message', handleWindowMessage)
  }
})

onUnmounted(() => {
  stopPaymentPolling()
  if (process.client) {
    window.removeEventListener('message', handleWindowMessage)
  }
})

const handleStepClick = (step: number) => {
  if (step === 2) {
    currentStep.value = 2
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else if (step === 3) {
    goToPaymentStep()
  }
}

const getSelectedAddressText = () => {
  if (useSavedAddressMode.value && addresses.value.length > 0) {
    const selected = addresses.value.find(a => a.id === selectedAddressId.value) || addresses.value[0]
    return `${selected.contact_person_name} (${selected.city} - ${selected.address})`
  }
  return `${addressForm.fullName} (${addressForm.city} - ${addressForm.district} - ${addressForm.street})`
}

const handleWindowMessage = (event: MessageEvent) => {
  if (!event.data || typeof event.data !== 'object') return

  if (event.data.type === 'PAYMENT_SUCCESS' || event.data.status === 'success' || event.data.status === 'paid') {
    stopPaymentPolling()
    if (paymentWindow && !paymentWindow.closed) {
      try { paymentWindow.close() } catch (e) {}
    }
    const orderId = event.data.payment_id || event.data.order_id || ''
    navigateTo(localePath(`/checkout/success?payment_id=${orderId}&status=paid`))
  } else if (event.data.type === 'PAYMENT_FAILED' || event.data.status === 'failed' || event.data.status === 'cancelled') {
    stopPaymentPolling()
    if (paymentWindow && !paymentWindow.closed) {
      try { paymentWindow.close() } catch (e) {}
    }
    const orderId = event.data.payment_id || event.data.order_id || ''
    navigateTo(localePath(`/checkout/failure?payment_id=${orderId}&status=failed`))
  }
}

const onAddressModalSaved = async () => {
  isAddressModalOpen.value = false
  await loadAddresses()
  if (addresses.value.length > 0) {
    useSavedAddressMode.value = true
    selectedAddressId.value = addresses.value[0].id
  }
}

const onCouponApplied = (data: { code: string; discount: number }) => {
  couponCode.value = data.code
}

const onFinancialsUpdated = (data: any) => {
  if (data) {
    checkoutFinancials.value = {
      subtotal: data.subtotal || 0,
      discount: data.discount || 0,
      shippingFee: data.shippingFee || 0,
      total: data.total || 0,
      couponCode: data.couponCode || couponCode.value
    }
  }
}

const validateAddressForm = (): boolean => {
  errors.fullName = ''
  errors.phone = ''
  errors.district = ''
  errors.street = ''

  let isValid = true

  if (!addressForm.fullName.trim()) {
    errors.fullName = isEn.value ? 'Full name is required' : 'يرجى إدخال الاسم الكامل'
    isValid = false
  }

  const phoneClean = addressForm.phone.replace(/[\s-+()]/g, '')
  if (!phoneClean || phoneClean.length < 9) {
    errors.phone = isEn.value ? 'Valid phone number is required (min 9 digits)' : 'يرجى إدخال رقم جوال صحيح'
    isValid = false
  }

  if (!addressForm.district.trim()) {
    errors.district = isEn.value ? 'District / neighborhood is required' : 'يرجى إدخال الحي / المنطقة'
    isValid = false
  }

  if (!addressForm.street.trim()) {
    errors.street = isEn.value ? 'Street address is required' : 'يرجى إدخال اسم الشارع وتفاصيل العنوان'
    isValid = false
  }

  return isValid
}

/**
 * Move from Step 2 to Step 3 after validating address
 */
const goToPaymentStep = () => {
  if (useSavedAddressMode.value && addresses.value.length > 0) {
    if (!selectedAddressId.value) {
      selectedAddressId.value = addresses.value[0].id
    }
    currentStep.value = 3
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  if (!validateAddressForm()) {
    toast.error(
      isEn.value ? 'Incomplete Address' : 'بيانات العنوان غير مكتملة',
      isEn.value ? 'Please fill in all required shipping address fields.' : 'يرجى ملء جميع الحقول المطلوبة لعنوان الشحن.'
    )
    return
  }

  currentStep.value = 3
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/**
 * Main Checkout Handler (Step 3 -> Step 4)
 */
const handlePlaceOrderAndPay = async () => {
  if (!cart.value || cart.value.length === 0) {
    toast.error(
      isEn.value ? 'Cart is Empty' : 'السلة فارغة',
      isEn.value ? 'Please add items to your cart before proceeding.' : 'يرجى إضافة منتجات إلى السلة قبل إتمام الطلب.'
    )
    return
  }

  let finalAddressId: string | number | undefined = undefined

  if (useSavedAddressMode.value && addresses.value.length > 0) {
    if (!selectedAddressId.value) {
      selectedAddressId.value = addresses.value[0].id
    }
    finalAddressId = selectedAddressId.value
  } else {
    if (!validateAddressForm()) {
      currentStep.value = 2
      toast.error(
        isEn.value ? 'Incomplete Address' : 'بيانات العنوان غير مكتملة',
        isEn.value ? 'Please fill in all required shipping address fields.' : 'يرجى ملء جميع الحقول المطلوبة لعنوان الشحن.'
      )
      return
    }

    try {
      const fullAddressString = `${addressForm.district} - ${addressForm.street}`
      const addRes = await addressApiService.addAddress({
        contact_person_name: addressForm.fullName,
        contact_person_number: addressForm.phone,
        phone: addressForm.phone,
        address: fullAddressString,
        city: addressForm.city || 'جدة',
        address_type: 'Home'
      })
      if (addRes.success && addRes.addressId) {
        finalAddressId = addRes.addressId
      }
    } catch (e) {
      console.warn('[Checkout] Guest inline address used:', e)
    }
  }

  isProcessing.value = true
  redirectingMessage.value = isEn.value ? 'Creating order...' : 'جاري إنشاء الطلب...'

  try {
    const gateway = selectedPaymentGateway.value || 'moyasar'

    const combinedNotes = [
      addressForm.fullName ? `العميل: ${addressForm.fullName}` : '',
      addressForm.phone ? `الجوال: ${addressForm.phone}` : '',
      addressForm.street ? `العنوان: ${addressForm.city} - ${addressForm.district} - ${addressForm.street}` : '',
      orderNote.value ? `ملاحظات: ${orderNote.value}` : ''
    ].filter(Boolean).join(' | ')

    // 1. Create Order
    const orderRes = await orderApiService.placeOrder({
      address_id: finalAddressId,
      payment_method: gateway,
      order_note: combinedNotes || orderNote.value,
      coupon_code: couponCode.value || checkoutFinancials.value.couponCode,
      coupon_discount: checkoutFinancials.value.discount,
      discount_amount: checkoutFinancials.value.discount,
      shipping_cost: checkoutFinancials.value.shippingFee,
      order_amount: checkoutFinancials.value.total
    })

    if (!orderRes.success) {
      toast.error(
        isEn.value ? 'Order Creation Failed' : 'فشل إنشاء الطلب',
        orderRes.message || (isEn.value ? 'Could not create order. Please try again.' : 'تعذر إنشاء الطلب، يرجى المحاولة مرة أخرى.')
      )
      isProcessing.value = false
      return
    }

    const paymentId = orderRes.paymentId || orderRes.orderId
    const orderId = orderRes.orderId || paymentId

    // 2. Handle Online Payment Gateways (Moyasar / Tamara / Tabby)
    if (['moyasar', 'tamara', 'tabby', 'card', 'mada', 'apple_pay'].includes(gateway.toLowerCase())) {
      redirectingMessage.value = isEn.value 
        ? `Opening ${gateway.toUpperCase()} secure payment window...` 
        : `جاري فتح نافذة الدفع الآمنة (${gateway === 'moyasar' ? 'ميسر' : gateway === 'tamara' ? 'تمارا' : 'تابي'})...`

      let targetPaymentUrl = orderRes.paymentUrl

      if (!targetPaymentUrl) {
        const paymentRes = await paymentApiService.initiateGatewayPayment(gateway, paymentId)
        if (paymentRes.success && paymentRes.paymentUrl) {
          targetPaymentUrl = paymentRes.paymentUrl
        } else {
          console.error('[Checkout] Gateway payment failed:', paymentRes)
          toast.error(
            isEn.value ? 'Payment Gateway Error' : 'خطأ في بوابة الدفع',
            paymentRes.message || (isEn.value ? 'Failed to initialize payment gateway. Please try again.' : 'فشل فتح بوابة الدفع، يرجى المحاولة مرة أخرى أو اختيار طريقة دفع أخرى.')
          )
          isProcessing.value = false
          return
        }
      }

      if (targetPaymentUrl) {
        stopPaymentPolling()

        toast.info(
          isEn.value ? 'Payment Window Opened' : 'تم فتح نافذة الدفع',
          isEn.value ? 'Please complete your payment in the opened tab.' : 'يرجى إكمال عملية الدفع في التبويب المفتوح.'
        )

        paymentWindow = window.open(targetPaymentUrl, '_blank')

        if (!paymentWindow || paymentWindow.closed || typeof paymentWindow.closed === 'undefined') {
          console.warn('[Checkout] Popup blocked. Falling back to same-window redirect.')
          window.location.href = targetPaymentUrl
          return
        }

        redirectingMessage.value = isEn.value ? 'Waiting for payment completion...' : 'بانتظار إتمام عملية الدفع...'

        paymentCheckTimer = setInterval(() => {
          if (paymentWindow && paymentWindow.closed) {
            stopPaymentPolling()
            isProcessing.value = false

            toast.warning(
              isEn.value ? 'Payment Cancelled' : 'تم إلغاء الدفع أو إغلاق النافذة',
              isEn.value ? 'The payment window was closed before completing the order.' : 'تم إغلاق نافذة الدفع قبل تأكيد الطلب.'
            )

            navigateTo(localePath(`/checkout/failure?payment_id=${paymentId}&status=cancelled`))
          }
        }, 1000)

        return
      }
    }

    // 3. Offline Payment / Cash On Delivery
    await clearCart()
    toast.success(
      isEn.value ? 'Order Placed Successfully!' : 'تم تأكيد طلبك بنجاح!',
      `${isEn.value ? 'Order ID:' : 'رقم الطلب:'} #${orderId}`
    )
    navigateTo(localePath(`/checkout/success?payment_id=${orderId}&status=success`))

  } catch (err: any) {
    console.error('[Checkout] Unexpected error during checkout:', err)
    const msg = err?.data?.message || err?.message || (isEn.value ? 'An unexpected error occurred. Please try again.' : 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.')
    toast.error(isEn.value ? 'Checkout Failed' : 'فشل إتمام الدفع', msg)
    isProcessing.value = false
  }
}
</script>
