<template>
  <div class="cart-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" dir="rtl">
    
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

      <div class="flex items-center justify-between mb-8">
        <div class="flex items-center gap-3">
          <h1 class="text-2xl lg:text-3xl font-black text-[#0B0E28]">سلة المشتريات</h1>
          <span v-if="cartItems.length > 0" class="bg-amber-100 text-amber-600 text-sm font-bold px-3 py-1 rounded-full">
            {{ cartItems.length }} منتجات
          </span>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="flex flex-col md:flex-row gap-8 items-start">
        
        <!-- Main Content: Cart Table & Promo Code (Right Side) -->
        <main class="w-full md:w-3/5 lg:w-2/3 xl:w-3/4 space-y-6">
          
          <!-- Cart Table -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            
            <!-- Table Header -->
            <div class="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500">
              <div class="col-span-5 lg:col-span-6">المنتج</div>
              <div class="col-span-2 text-center">السعر</div>
              <div class="col-span-3 text-center">الكمية</div>
              <div class="col-span-2 text-left">المجموع</div>
            </div>

            <!-- Table Rows -->
            <div class="divide-y divide-slate-100">
              <div v-for="item in cartItems" :key="item.id" class="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center">
                
                <!-- Product Details -->
                <div class="md:col-span-5 lg:col-span-6 flex items-center gap-4">
                  <!-- Remove Icon (Mobile only, top right absolute usually, but here flex) -->
                  <button @click="removeItem(item.id)" class="md:hidden w-8 h-8 shrink-0 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors" title="إزالة">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>

                  <NuxtLink :to="`/product/${item.id}`" class="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 group">
                    <img :src="item.image" :alt="item.name" class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500" />
                  </NuxtLink>
                  <div class="min-w-0 flex-1">
                    <h3 class="text-sm font-bold text-[#0B0E28] leading-snug line-clamp-2 hover:text-amber-500 transition-colors">
                      <NuxtLink :to="`/product/${item.id}`">{{ item.name }}</NuxtLink>
                    </h3>
                    <span class="text-[10px] sm:text-xs text-slate-400 mt-1 block uppercase">SKU: {{ item.id }}000</span>
                  </div>
                </div>

                <!-- Unit Price (Hidden on mobile) -->
                <div class="hidden md:block col-span-2 text-center text-sm font-bold text-slate-600">
                  {{ item.price }} ر.س
                </div>

                <!-- Quantity -->
                <div class="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center mt-2 md:mt-0">
                  <!-- Mobile Unit Price -->
                  <div class="md:hidden text-sm font-bold text-slate-600">{{ item.price }} ر.س</div>
                  
                  <div class="flex items-center bg-white border border-slate-200 rounded-lg p-1">
                    <button 
                      @click="decreaseQty(item)" 
                      :disabled="item.quantity <= 1" 
                      class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                    <span class="w-10 text-center text-sm font-bold text-[#0B0E28]">{{ item.quantity }}</span>
                    <button 
                      @click="increaseQty(item)" 
                      :disabled="item.quantity >= item.maxQuantity"
                      class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                    >
                      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                    </button>
                  </div>
                </div>

                <!-- Total & Remove -->
                <div class="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2 mt-2 md:mt-0">
                  <div class="text-sm font-black text-amber-500">
                    {{ calculateTotal(item) }} ر.س
                  </div>
                  <!-- Desktop Remove -->
                  <button @click="removeItem(item.id)" class="hidden md:flex w-8 h-8 shrink-0 items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors mr-2" title="إزالة">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>

              </div>
            </div>
          </div>

          <!-- Promo Code Box -->
          <div class="w-full">
          <div class="w-full flex items-stretch shadow-sm">
            <input 
              type="text" 
              placeholder="رمز القسيمة" 
              class="w-full bg-white border border-slate-200 rounded-r-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all border-l-0" 
            />
            <button class="bg-[#0B0E28] text-white px-6 rounded-l-xl text-sm font-bold hover:bg-[#1a204c] transition-colors shrink-0">
              استخدام القسيمة
            </button>
          </div>
        </div>

        </main>

        <!-- Sidebar: Cart Summary (Left Side) -->
        <aside class="w-full md:w-2/5 lg:w-1/3 xl:w-1/4">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/60 sticky top-24">
            <h3 class="text-lg font-black text-[#0B0E28] mb-6 pb-4 border-b border-slate-100">إجمالي السلة</h3>

            <div class="space-y-4 text-sm font-bold mb-6">
              <div class="flex items-center justify-between text-slate-600">
                <span>المجموع الفرعي</span>
                <span class="text-[#0B0E28]">{{ subtotalFormatted }} ر.س</span>
              </div>
              
              <div class="flex items-start justify-between text-slate-600">
                <div class="flex flex-col gap-1.5">
                  <span>الشحن</span>
                  <button class="text-xs text-amber-500 hover:text-amber-600 underline decoration-amber-500/30 underline-offset-4 text-right transition-colors w-max">
                    تغيير العنوان
                  </button>
                </div>
                <div class="text-left">
                  <span class="text-[#0B0E28] block">شحن مجاني</span>
                  <span class="text-[10px] text-slate-400 font-medium block mt-0.5">الشحن إلى جدة</span>
                </div>
              </div>
            </div>

            <div class="flex items-end justify-between pt-5 border-t border-slate-100 mb-6">
              <span class="text-base font-black text-[#0B0E28]">الإجمالي</span>
              <span class="text-2xl font-black text-amber-500">{{ subtotalFormatted }} <span class="text-sm text-[#0B0E28]">ر.س</span></span>
            </div>

            <NuxtLink 
              to="/checkout"
              class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-white hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2"
            >
              التقدم لإتمام الطلب
            </NuxtLink>
            
            <!-- Trust Badges inside Cart Summary -->
            <div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                </div>
                <span class="text-[10px] font-bold text-slate-600 leading-tight">دفع إلكتروني<br>آمن 100%</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                </div>
                <span class="text-[10px] font-bold text-slate-600 leading-tight">ضمان ذهبي<br>معتمد</span>
              </div>
            </div>

          </div>
        </aside>

      </div>

      <!-- Empty State -->
      <div v-else class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center">
        <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-[#0B0E28] mb-2">سلة المشتريات فارغة</h3>
        <p class="text-slate-500 max-w-sm mx-auto mb-8">لم تقم بإضافة أي منتجات للسلة بعد. استكشف تشكيلتنا الفاخرة وأضف ما يعجبك.</p>
        <NuxtLink 
          to="/"
          class="px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20"
        >
          العودة للتسوق
        </NuxtLink>
      </div>

    </div>

    <!-- STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200 mt-20">
      <HomeStoreFeaturesBar/>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'

useHead({
  title: 'سلة المشتريات | أسوار جدة'
})

// Mock Cart Items
const cartItems = ref([
  {
    id: 1,
    name: 'سوار ذهب عيار 18 بتصميم كلاسيكي',
    category: 'أساور ذهبية',
    price: '2,450',
    quantity: 1,
    maxQuantity: 5,
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 2,
    name: 'قلادة ألماس مرصعة بزمرد طبيعي',
    category: 'قلائد',
    price: '5,800',
    quantity: 2,
    maxQuantity: 3,
    image: 'https://images.unsplash.com/photo-1599643478514-4a42041b3780?q=80&w=200&auto=format&fit=crop'
  }
])

const parsePrice = (priceStr) => {
  return parseFloat(priceStr.replace(/,/g, ''))
}

const formatPrice = (priceNum) => {
  return priceNum.toLocaleString('en-US')
}

const calculateTotal = (item) => {
  return formatPrice(parsePrice(item.price) * item.quantity)
}

const subtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0)
})

const subtotalFormatted = computed(() => {
  return formatPrice(subtotal.value)
})

const updateQty = (item, newQty) => {
  if (newQty >= 1 && newQty <= item.maxQuantity) {
    item.quantity = newQty
  }
}

const increaseQty = (item) => {
  updateQty(item, item.quantity + 1)
}

const decreaseQty = (item) => {
  updateQty(item, item.quantity - 1)
}

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(i => i.id !== id)
}
</script>
<style scoped>
</style>