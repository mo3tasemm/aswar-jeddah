<template>
  <div class="max-w-[1550px] mx-auto px-4 lg:px-6 my-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
      
      <!-- Guarantee 1: 100% Original Products -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group">
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
          <!-- Badge Check Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        </div>
        <div>
          <h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">منتجات أصلية 100%</h3>
          <p class="text-slate-500 text-xs md:text-sm">مضمونة من الوكيل مباشرة</p>
        </div>
      </div>

      <!-- Guarantee 2: Fastest After-sales Service -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group">
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
          <!-- Clock Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">أسرع خدمة ما بعد البيع</h3>
          <p class="text-slate-500 text-xs md:text-sm">متابعة وصيانة فورية</p>
        </div>
      </div>

      <!-- Guarantee 3: 12 Months Warranty -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group">
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
          <!-- Shield Check Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </div>
        <div>
          <h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">ضمان حتى 12 شهر</h3>
          <p class="text-slate-500 text-xs md:text-sm">ضمان شامل ومعتمد</p>
        </div>
      </div>

      <!-- Guarantee 4: Fast Delivery -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group">
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
          <!-- Truck Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        </div>
        <div>
          <h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">توصيل سريع وآمن</h3>
          <p class="text-slate-500 text-xs md:text-sm">شحن لكافة المحافظات</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
// Component logic (purely presentational)
</script>
