<template>
  <div 
    :class="[
      'bg-white rounded-[1.5rem] p-5 sm:p-6 transition-all duration-300 relative group flex flex-col h-full',
      isDefault 
        ? 'border-2 border-amber-400/90 shadow-[0_8px_30px_rgba(251,191,36,0.12)]' 
        : 'border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
    ]"
  >
    <!-- Header: Icon & Type & Receiver & Sleek Integrated Default Pill Tag -->
    <div class="flex items-start justify-between gap-3 mb-4">
      <div class="flex items-center gap-3 min-w-0">
        <div 
          :class="[
            'w-11 h-11 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors',
            isDefault ? 'bg-amber-50 text-amber-600 border border-amber-200/60' : 'bg-slate-50 text-slate-500 border border-slate-100'
          ]"
        >
          <svg v-if="addressType === 'Home' || addressType === 'home'" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        </div>

        <div class="min-w-0 text-right">
          <div class="flex items-center gap-2">
            <h3 class="text-sm sm:text-base font-black text-[#0B0E28] truncate">
              {{ addressType === 'Office' ? 'مكتب / العمل' : 'المنزل' }}
            </h3>
            <span 
              v-if="isDefault" 
              class="bg-amber-50 text-amber-700 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-amber-200/80 inline-flex items-center gap-1 shrink-0"
            >
              <svg class="w-2.5 h-2.5 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"></path></svg>
              افتراضي
            </span>
          </div>
          <p class="text-xs font-bold text-slate-500 truncate mt-0.5">{{ receiverName }}</p>
        </div>
      </div>
    </div>

    <!-- Address Details -->
    <div class="space-y-1 mb-5 flex-1 text-right">
      <p class="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed break-words">
        <span class="font-bold text-[#0B0E28]">{{ address.city }}</span><span v-if="address.country">، {{ address.country }}</span><br>
        {{ addressDetails }}
      </p>

      <div class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100" dir="ltr">
        <svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        <span class="text-xs font-bold text-[#0B0E28]">{{ phoneDisplay }}</span>
      </div>
    </div>

    <!-- Footer Actions (Edit & Delete Buttons) -->
    <div class="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto gap-2">
      <!-- Edit Button -->
      <button 
        @click.prevent.stop="$emit('edit', address)"
        class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-[#0B0E28] hover:text-amber-400 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="تعديل هذا العنوان"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
        <span>تعديل</span>
      </button>

      <!-- Delete Button -->
      <button 
        @click.prevent.stop="$emit('delete', address.id)"
        class="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
        title="حذف هذا العنوان"
      >
        <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
        <span>مسح</span>
      </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  address: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

const receiverName = computed(() => {
  return props.address.contact_person_name || props.address.receiverName || 'عميل أسوار'
})

const addressType = computed(() => {
  return props.address.address_type || props.address.type || 'Home'
})

const addressDetails = computed(() => {
  if (props.address.address) return props.address.address
  const parts = []
  if (props.address.district) parts.push(`حي ${props.address.district}`)
  if (props.address.street) parts.push(`شارع ${props.address.street}`)
  if (props.address.building) parts.push(`مبنى ${props.address.building}`)
  return parts.join('، ') || 'العنوان الرئيسي'
})

const phoneDisplay = computed(() => {
  return props.address.phone || '05XXXXXXXX'
})

const isDefault = computed(() => {
  return Boolean(props.address.is_billing || props.address.isDefault)
})
</script>
