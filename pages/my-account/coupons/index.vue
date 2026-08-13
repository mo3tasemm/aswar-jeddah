<template>
  <div class="min-h-screen bg-[#f8fafc] pb-24 selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- PAGE HEADER -->
    <div class="bg-[#0B0E28] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 z-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      <div class="absolute top-0 start-0 w-full h-full bg-gradient-to-b from-transparent to-[#0B0E28] z-0"></div>
      <div class="container mx-auto px-4 relative z-10">
        <h1 class="text-3xl md:text-5xl font-black text-white mb-4 text-center">{{ t('account.coupons') }}</h1>
        <p class="text-slate-300 text-center text-sm md:text-base max-w-2xl mx-auto">
          {{ t('coupons.subtitle') }}
        </p>
      </div>
    </div>

    <!-- MAIN CONTENT -->
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0 space-y-8">
          
          <!-- Top Action Bar & Coupon Count -->
          <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h2 class="text-xl font-black text-[#0B0E28] mb-1">{{ t('coupons.available') }}</h2>
              <p class="text-xs sm:text-sm text-slate-500">{{ t('coupons.hint') }}</p>
            </div>
            
            <div class="flex items-center gap-2 bg-amber-50 text-amber-700 font-extrabold text-xs px-4 py-2.5 rounded-2xl border border-amber-200/60 shrink-0">
              <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              <span>{{ couponsList.length }} {{ t('coupons.active_count') }}</span>
            </div>
          </div>

          <!-- LOADING STATE -->
          <div v-if="pending" class="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-slate-100/60">
            <div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p class="text-xs font-bold text-slate-500">{{ t('coupons.loading') }}</p>
          </div>

          <!-- EMPTY STATE -->
          <div v-else-if="couponsList.length === 0" class="bg-white rounded-[2rem] p-12 sm:p-16 text-center shadow-sm border border-slate-100/60 space-y-6">
            <div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
            </div>
            <div class="space-y-2 max-w-sm mx-auto">
              <h3 class="text-xl font-black text-[#0B0E28]">{{ t('coupons.empty_title') }}</h3>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {{ t('coupons.empty_desc') }}
              </p>
            </div>
            <NuxtLink 
              to="/shop" 
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B0E28] text-amber-400 font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#0B0E28]/10 transition-all hover:bg-[#151a42]"
            >
              {{ t('cart.back_to_shop') }}
            </NuxtLink>
          </div>

          <!-- DYNAMIC COUPONS CARDS GRID -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div 
              v-for="coupon in couponsList" 
              :key="coupon.id"
              class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"
            >
              <!-- Decorative Left Cutout Punch Hole -->
              <div class="absolute -start-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-100/80"></div>
              <div class="absolute -end-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-100/80"></div>

              <div>
                <!-- Top Badge & Header -->
                <div class="flex items-center justify-between gap-2 mb-4">
                  <span class="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 font-black text-xs">
                    {{ coupon.badge }}
                  </span>

                  <span class="text-[11px] font-bold text-slate-400">
                    {{ t('coupons.expires') }} {{ formatDate(coupon.expireDate) }}
                  </span>
                </div>

                <!-- Coupon Title & Description -->
                <h3 class="text-lg font-black text-[#0B0E28] mb-2 group-hover:text-amber-500 transition-colors">
                  {{ coupon.title }}
                </h3>
                <p class="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {{ coupon.description }}
                </p>
              </div>

              <!-- Bottom Bar: Code Box & Action Buttons -->
              <div class="pt-6 border-t border-slate-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                
                <!-- Code Box -->
                <div class="w-full sm:w-auto px-4 py-2.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between gap-3">
                  <span class="font-mono text-sm font-black text-[#0B0E28] tracking-widest dir-ltr">{{ coupon.code }}</span>
                  <button 
                    @click="copyCouponCode(coupon.code)" 
                    class="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                    :title="t('coupons.copy')"
                  >
                    {{ t('coupons.copy') }}
                  </button>
                </div>

                <!-- Apply Button -->
                <button 
                  @click="applyCouponToCart(coupon.code)"
                  :disabled="applyingCode === coupon.code"
                  class="w-full sm:w-auto px-6 py-3 bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <svg v-if="applyingCode === coupon.code" class="animate-spin h-4 w-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  <span>{{ applyingCode === coupon.code ? t('coupons.applying') : t('coupons.apply') }}</span>
                </button>

              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'
import { couponApiService } from '~/services/couponApiService'
import { useCart } from '~/composables/useCart'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => `${t('account.coupons')} | أسوار جدة`)
})

const pending = ref(true)
const couponsList = ref<any[]>([])
const applyingCode = ref<string | null>(null)

const { openCart } = useCart()
const toast = useToast()

const formatDate = (dateStr?: string) => {
  if (!dateStr || dateStr === 'متاح حالياً' || dateStr === 'Available') {
    return layoutDirection.value === 'ltr' ? 'Available' : 'متاح حالياً'
  }
  try {
    const date = new Date(dateStr)
    if (isNaN(date.getTime())) return dateStr
    return date.toLocaleDateString(layoutDirection.value === 'rtl' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  } catch (e) {
    return dateStr
  }
}

const formatBadge = (discVal: number | string, isPercent: boolean) => {
  if (layoutDirection.value === 'ltr') {
    return isPercent ? `${discVal}% OFF` : `${discVal} ${t('product.currency')} OFF`
  }
  return isPercent ? `خصم ${discVal}%` : `خصم ${discVal} ر.س`
}

const loadCoupons = async () => {
  pending.value = true
  try {
    const res = await couponApiService.fetchAvailableCoupons()
    const list = Array.isArray(res) 
      ? res 
      : (Array.isArray(res?.coupons) 
          ? res.coupons 
          : (Array.isArray(res?.data) ? res.data : []))

    if (Array.isArray(list) && list.length > 0) {
      couponsList.value = list.map((c: any) => {
        const discVal = c.discount || c.discount_amount || c.amount || 0
        const discType = String(c.discount_type || c.type || 'flat').toLowerCase()
        const isPercent = discType.includes('percent') || discType === 'p' || discType === '%'

        return {
          id: c.id || c.code || c.coupon_code,
          code: c.code || c.coupon_code || 'ASWAR20',
          title: c.title || c.coupon_title || c.name || (layoutDirection.value === 'ltr' ? `Discount Code ${isPercent ? discVal + '%' : discVal + ' SAR'}` : `كود تخفيض ${isPercent ? discVal + '%' : discVal + ' ر.س'}`),
          description: c.details || c.description || c.short_description || (layoutDirection.value === 'ltr' ? 'Get instant discount on your cart total during checkout.' : 'احصل على خصم فوري على إجمالي سلتك عند إتمام الشراء.'),
          badge: formatBadge(discVal, isPercent),
          minPurchase: c.min_purchase || c.min_buy ? `${c.min_purchase || c.min_buy} SAR` : 'No min purchase',
          expireDate: c.expire_date || c.end_date || c.valid_until || '2026-12-31',
          rawItem: c
        }
      })
    } else {
      couponsList.value = [
        {
          id: 1,
          code: 'ASWAR20',
          title: layoutDirection.value === 'ltr' ? 'Exclusive Aswar Coupon' : 'كود خصم أسوار الحصري',
          description: layoutDirection.value === 'ltr' ? '20% OFF on all smart devices and home supplies.' : 'خصم 20% على جميع الأجهزة الذكية ومستلزمات المنزل.',
          badge: formatBadge(20, true),
          minPurchase: '150 SAR',
          expireDate: '2026-12-31'
        },
        {
          id: 2,
          code: 'GO26',
          title: layoutDirection.value === 'ltr' ? 'Quick Savings Coupon' : 'كوبون التوفير السريع',
          description: layoutDirection.value === 'ltr' ? 'Instant 26 SAR discount on your next order.' : 'خصم مباشر بقيمة 26 ريال على طلبك التالي.',
          badge: formatBadge(26, false),
          minPurchase: '200 SAR',
          expireDate: '2026-11-30'
        }
      ]
    }
  } catch (err) {
    console.warn('[CouponsPage] Load coupons error:', err)
  } finally {
    pending.value = false
  }
}

const copyCouponCode = (code: string) => {
  if (process.client && navigator.clipboard) {
    navigator.clipboard.writeText(code)
    toast.success(t('coupons.copy'), `${code}`)
  }
}

const applyCouponToCart = async (code: string) => {
  applyingCode.value = code
  try {
    const res = await couponApiService.applyCoupon(code)
    if (res.success) {
      toast.success(t('coupons.apply'), res.message || `${code}`)
      openCart()
    } else {
      toast.error('Error', res.message || 'Coupon invalid.')
    }
  } catch (err) {
    toast.error('Error', 'Failed to apply coupon.')
  } finally {
    applyingCode.value = null
  }
}

onMounted(() => {
  loadCoupons()
})
</script>
