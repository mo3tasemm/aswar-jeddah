<template>
  <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden">
    <div class="p-8 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-[#0B0E28]">{{ title }}</h2>
        <p class="text-slate-400 text-sm mt-1">تتبع آخر مشترياتك وحالتها</p>
      </div>
      <NuxtLink v-if="showViewAll" to="/my-account/orders" class="text-sm font-bold text-amber-500 hover:text-[#0B0E28] transition-colors flex items-center gap-2">
        عرض كل الطلبات
        <svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
      </NuxtLink>
    </div>
    
    <div class="overflow-x-auto">
      <table class="w-full text-right border-collapse">
        <thead>
          <tr class="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
            <th class="p-6 whitespace-nowrap">رقم الطلب</th>
            <th class="p-6 whitespace-nowrap">التاريخ</th>
            <th class="p-6 whitespace-nowrap">الإجمالي</th>
            <th class="p-6 whitespace-nowrap">الحالة</th>
            <th class="p-6 whitespace-nowrap text-left">إجراء</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-slate-50/50 transition-colors group">
            <td class="p-6">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
                </div>
                <span class="font-black text-[#0B0E28]">{{ order.id }}</span>
              </div>
            </td>
            <td class="p-6 text-sm text-slate-500 font-medium">{{ order.date }}</td>
            <td class="p-6 text-sm font-black text-[#0B0E28]">{{ order.total }} ر.س</td>
            <td class="p-6">
              <span v-if="order.status === 'processing'" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-100">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                {{ order.statusText }}
              </span>
              <span v-else-if="order.status === 'completed'" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                {{ order.statusText }}
              </span>
              <!-- Fallback for other statuses -->
              <span v-else class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200">
                {{ order.statusText }}
              </span>
            </td>
            <td class="p-6 text-left">
              <button @click="$emit('open-details', order)" class="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-[#0B0E28] hover:text-white hover:border-[#0B0E28] transition-all shadow-sm">
                التفاصيل
              </button>
            </td>
          </tr>
          <!-- Empty State -->
          <tr v-if="orders.length === 0">
            <td colspan="5" class="p-12 text-center text-slate-400 font-medium">
              لا توجد طلبات لعرضها حالياً
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  orders: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'الطلبات الأخيرة'
  },
  showViewAll: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['open-details'])
</script>
