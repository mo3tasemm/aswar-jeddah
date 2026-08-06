<template>
  <div class="bg-white rounded-[2rem] p-10 md:p-16 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px] w-full">
    <!-- Icon Circle -->
    <div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 mx-auto border border-slate-100 shadow-inner">
      <slot name="icon">
        <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      </slot>
    </div>
    
    <!-- Title -->
    <h3 class="text-xl md:text-2xl font-black text-[#0B0E28] mb-3">{{ title }}</h3>
    
    <!-- Description -->
    <p class="text-sm md:text-base text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">
      {{ description }}
    </p>
    
    <!-- Action Button -->
    <button 
      v-if="actionText"
      @click="$emit('action')"
      class="px-8 py-3.5 bg-[#0B0E28] text-amber-400 text-sm md:text-base font-bold rounded-2xl hover:bg-[#151a42] transition-all shadow-lg shadow-[#0B0E28]/10 hover:shadow-xl hover:-translate-y-0.5"
    >
      {{ actionText }}
    </button>
    <slot name="action" v-else></slot>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  actionText: {
    type: String,
    default: ''
  }
})

defineEmits(['action'])
</script>
