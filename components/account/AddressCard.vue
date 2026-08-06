<template>
  <div 
    :class="[
      'bg-white rounded-[1.5rem] p-6 transition-all duration-300 relative group flex flex-col h-full',
      address.isDefault 
        ? 'border-2 border-amber-400 shadow-[0_8px_30px_rgba(251,191,36,0.15)] ring-4 ring-amber-400/10' 
        : 'border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
    ]"
  >

    <!-- Header: Icon & Type & Badge -->
    <div class="flex items-start justify-between mb-5">
      <div class="flex items-center gap-3">
        <div 
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            address.isDefault ? 'bg-amber-50 text-amber-600' : 'bg-slate-50 text-slate-500'
          ]"
        >
          <svg v-if="address.type === 'home'" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <svg v-else class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>
        <div>
          <h3 class="text-base font-black text-[#0B0E28]">
            {{ address.type === 'home' ? 'المنزل' : 'العمل' }}
            <span v-if="address.title" class="text-slate-400 font-medium ml-1">- {{ address.title }}</span>
          </h3>
          <p class="text-sm font-bold text-slate-500 mt-0.5">{{ address.receiverName }}</p>
        </div>
      </div>

      <!-- Default Badge -->
      <div 
        v-if="address.isDefault" 
        class="bg-[#0B0E28] text-amber-400 text-[10px] sm:text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 shrink-0"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
        العنوان الافتراضي
      </div>
    </div>

    <!-- Address Details -->
    <div class="space-y-1 mb-6 flex-1">
      <p class="text-sm text-slate-600 font-medium leading-relaxed">
        {{ address.city }}، {{ address.district }}<br>
        شارع {{ address.street }}<br>
        المبنى: {{ address.building }}
      </p>
      <div class="flex items-center gap-2 mt-4 pt-4 border-t border-slate-100">
        <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span class="text-xs font-bold text-[#0B0E28]" dir="ltr">+966 {{ address.phone }}</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-between gap-2 mt-auto">
      <div class="flex gap-2">
        <button 
          @click="$emit('edit', address)"
          class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-slate-100 text-[#0B0E28] flex items-center justify-center transition-colors shadow-sm border border-slate-200/60"
          title="تعديل العنوان"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
        </button>
        <button 
          @click="$emit('delete', address.id)"
          class="w-9 h-9 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 text-slate-400 flex items-center justify-center transition-colors shadow-sm border border-slate-200/60"
          title="حذف العنوان"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        </button>
      </div>
      
      <button 
        v-if="!address.isDefault"
        @click="$emit('set-default', address.id)"
        class="text-[11px] font-bold text-slate-500 hover:text-[#0B0E28] transition-colors"
      >
        تعيين كافتراضي
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  address: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete', 'set-default'])
</script>
