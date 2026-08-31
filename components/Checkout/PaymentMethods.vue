<template>
  <div class="space-y-4" :dir="layoutDirection">
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg sm:text-xl font-black text-[#0B0E28] text-start">{{ t('checkout.select_payment') }}</h3>
      <span class="text-xs text-slate-400 font-medium flex items-center gap-1.5">
        <svg class="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
        {{ t('checkout.encrypted_ssl') || 'دفع آمن ومشفّر 100%' }}
      </span>
    </div>

    <!-- Payment Options List -->
    <div class="space-y-3">
      
      <!-- 1. MOYASAR GATEWAY (Credit Cards, Mada, Apple Pay, STC Pay) -->
      <label class="cursor-pointer relative block group">
        <input 
          type="radio" 
          v-model="selectedMethod" 
          value="moyasar" 
          class="peer sr-only" 
        />
        <div class="p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 bg-white flex flex-col gap-3 group-hover:border-amber-300 shadow-sm"
          :class="selectedMethod === 'moyasar' ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/20' : 'border-slate-200/80'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                :class="selectedMethod === 'moyasar' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
                <div v-if="selectedMethod === 'moyasar'" class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="text-start">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm sm:text-base font-black text-[#0B0E28]">
                    {{ isEn ? 'Moyasar (Cards / Mada / Apple Pay)' : 'ميسر (بطاقات الائتمان / مدى / Apple Pay)' }}
                  </span>
                  <span class="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {{ isEn ? 'Instant' : 'دفع فوري مباشر' }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ isEn ? 'Pay securely using Mada, Visa, Mastercard, Apple Pay, or STC Pay' : 'ادفع بأمان عبر مدى، فيزا، ماستركارد، آبل باي أو STC Pay' }}
                </p>
              </div>
            </div>
          </div>

          <!-- Brand Logos Bar -->
          <div class="flex items-center gap-2 pt-2 border-t border-slate-100/80 flex-wrap">
            <!-- Mada -->
            <div class="h-6 px-2 bg-slate-50 border border-slate-200 rounded flex items-center justify-center">
              <span class="text-[10px] font-black text-emerald-700 tracking-wider">mada</span>
            </div>
            <!-- Visa -->
            <div class="h-6 px-2.5 bg-[#1A1F71] text-white rounded flex items-center justify-center">
              <span class="text-[10px] font-black italic tracking-wider">VISA</span>
            </div>
            <!-- Mastercard -->
            <div class="h-6 px-2 bg-[#222222] text-white rounded flex items-center justify-center gap-0.5">
              <div class="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></div>
              <div class="w-2.5 h-2.5 rounded-full bg-[#F79E1B] -ms-1.5 opacity-90"></div>
            </div>
            <!-- Apple Pay -->
            <div class="h-6 px-2.5 bg-black text-white rounded flex items-center justify-center gap-1">
              <svg class="w-3 h-3 fill-current" viewBox="0 0 170 170"><path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.04-7.69-7.85-12-14.43-5.64-8.6-10.02-18.49-13.14-29.66-3.12-11.17-4.68-21.91-4.68-32.22 0-14.86 3.66-26.96 10.98-36.3 7.32-9.34 16.59-14.15 27.81-14.43 4.9.11 10.23 1.34 16 3.69 5.77 2.36 9.87 3.59 12.3 3.69 2.01 0 6.31-1.34 12.89-4.02 6.58-2.69 12.28-3.8 17.1-3.35 12.98 1.11 23.36 6.18 31.13 15.2-11.39 6.89-16.97 16.33-16.73 28.32.24 9.57 3.86 17.5 10.86 23.8 6.99 6.29 15.22 9.87 24.67 10.74-2.24 6.88-5.08 13.88-8.52 21zM119.22 31.84c0-7.23 2.65-13.9 7.94-20 5.3-6.11 11.96-9.98 20-11.61.22 1.34.33 2.57.33 3.69 0 7.12-2.73 13.92-8.2 20.4-5.46 6.48-12.25 10.45-20.35 11.91-.22-1.34-.33-2.57-.33-3.69l.61-.7z"/></svg>
              <span class="text-[9px] font-bold tracking-tight">Pay</span>
            </div>
            <!-- STC Pay -->
            <div class="h-6 px-2 bg-[#4f008c] text-white rounded flex items-center justify-center">
              <span class="text-[9px] font-black tracking-tight">stc pay</span>
            </div>
          </div>
        </div>
      </label>

      <!-- 2. TAMARA (Buy Now, Pay Later - 3 or 4 payments) -->
      <label class="cursor-pointer relative block group">
        <input 
          type="radio" 
          v-model="selectedMethod" 
          value="tamara" 
          class="peer sr-only" 
        />
        <div class="p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 bg-white flex flex-col gap-3 group-hover:border-amber-300 shadow-sm"
          :class="selectedMethod === 'tamara' ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/20' : 'border-slate-200/80'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                :class="selectedMethod === 'tamara' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
                <div v-if="selectedMethod === 'tamara'" class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="text-start">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm sm:text-base font-black text-[#0B0E28]">
                    {{ isEn ? 'Tamara - Buy Now, Pay Later' : 'تمارا - قسّم مشترياتك' }}
                  </span>
                  <span class="bg-orange-50 text-orange-600 border border-orange-200 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {{ isEn ? 'Zero Interest' : 'بدون فوائد أو رسوم' }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ isEn ? 'Split your bill into 3 or 4 easy monthly installments with Tamara' : 'قسّطها على 3 أو 4 دفعات بدون فوائد أو رسوم خفية' }}
                </p>
              </div>
            </div>

            <!-- Tamara Logo Badge -->
            <div class="h-7 px-3 bg-gradient-to-r from-orange-400 to-pink-500 rounded-lg flex items-center justify-center text-white font-black text-xs shadow-sm shrink-0">
              tamara
            </div>
          </div>

          <!-- Feature Badge -->
          <div class="bg-orange-50/70 border border-orange-100 rounded-xl px-3 py-1.5 flex items-center gap-2 text-start">
            <span class="w-2 h-2 rounded-full bg-orange-500"></span>
            <span class="text-[11px] font-bold text-orange-800">
              {{ isEn ? 'Split into 3 or 4 interest-free payments. Sharia-compliant.' : 'قسّطها على 3 أو 4 دفعات بدون فوائد - متوافقة مع الشريعة الإسلامية' }}
            </span>
          </div>
        </div>
      </label>

      <!-- 3. TABBY (Split in 4 installments) -->
      <label class="cursor-pointer relative block group">
        <input 
          type="radio" 
          v-model="selectedMethod" 
          value="tabby" 
          class="peer sr-only" 
        />
        <div class="p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 bg-white flex flex-col gap-3 group-hover:border-amber-300 shadow-sm"
          :class="selectedMethod === 'tabby' ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/20' : 'border-slate-200/80'">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
                :class="selectedMethod === 'tabby' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
                <div v-if="selectedMethod === 'tabby'" class="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div class="text-start">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-sm sm:text-base font-black text-[#0B0E28]">
                    {{ isEn ? 'Tabby - Split in 4' : 'تابي - ادفع على 4 دفعات' }}
                  </span>
                  <span class="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-black px-2 py-0.5 rounded-md">
                    {{ isEn ? '4 Payments' : 'اقسمها على 4' }}
                  </span>
                </div>
                <p class="text-xs text-slate-500 mt-0.5">
                  {{ isEn ? 'Split in 4 equal payments without interest or hidden fees' : 'ادفع ربع المبلغ اليوم وقسّط الباقي على 3 أشهر بدون أي فوائد' }}
                </p>
              </div>
            </div>

            <!-- Tabby Logo Badge -->
            <div class="h-7 px-3 bg-[#3EFEBA] text-[#0B0E28] rounded-lg flex items-center justify-center font-black text-xs uppercase shadow-sm shrink-0">
              tabby
            </div>
          </div>

          <!-- Feature Badge -->
          <div class="bg-emerald-50/70 border border-emerald-100 rounded-xl px-3 py-1.5 flex items-center gap-2 text-start">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-[11px] font-bold text-emerald-800">
              {{ isEn ? 'Pay 25% today, and the rest over 3 months. No interest, no fees.' : 'اقسمها على 4 دفعات: ادفع 25% الآن والباقي على 3 أشهر بدون فوائد' }}
            </span>
          </div>
        </div>
      </label>

      <!-- 4. OFFLINE PAYMENT / BANK TRANSFER / CASH -->
      <label class="cursor-pointer relative block group">
        <input 
          type="radio" 
          v-model="selectedMethod" 
          value="offline_payment" 
          class="peer sr-only" 
        />
        <div class="p-4 rounded-2xl border-2 transition-all duration-200 bg-white flex items-center justify-between group-hover:border-slate-300"
          :class="selectedMethod === 'offline_payment' ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/20' : 'border-slate-200/80'">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"
              :class="selectedMethod === 'offline_payment' ? 'border-amber-500 bg-amber-500' : 'border-slate-300'">
              <div v-if="selectedMethod === 'offline_payment'" class="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div class="text-start">
              <span class="text-sm font-bold text-[#0B0E28] block">
                {{ isEn ? 'Bank Transfer / Cash On Delivery' : 'تحويل بنكي / الدفع عند الاستلام' }}
              </span>
              <span class="text-xs text-slate-400">
                {{ isEn ? 'Pay upon delivery or direct bank account transfer' : 'إتمام الطلب والدفع عند الاستلام أو بالتحويل البنكي' }}
              </span>
            </div>
          </div>
          <div class="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2"></rect>
              <line x1="2" y1="10" x2="22" y2="10"></line>
            </svg>
          </div>
        </div>
      </label>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  method: {
    type: String,
    default: 'moyasar'
  }
})

const emit = defineEmits(['update:method'])
const { t, layoutDirection, currentLanguage } = useLanguage()

const isEn = computed(() => currentLanguage.value === 'en')
const selectedMethod = ref(props.method || 'moyasar')

watch(() => props.method, (val) => {
  if (val && val !== selectedMethod.value) {
    selectedMethod.value = val
  }
})

watch(selectedMethod, (newVal) => {
  emit('update:method', newVal)
})
</script>
