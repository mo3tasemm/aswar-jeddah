<template>
  <nav class="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium py-4">
    
    <!-- Home Link -->
    <NuxtLink to="/" class="hover:text-[#0B0E28] transition-colors flex items-center gap-2">
      <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
      الرئيسية
    </NuxtLink>

    <!-- Dynamic Tiers -->
    <template v-for="(tier, index) in tiers" :key="index">
      
      <!-- Separator -->
      <svg class="w-3 h-3 rtl:-scale-x-100 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>

      <!-- Tier Link / Active Span -->
      <NuxtLink 
        v-if="index < tiers.length - 1" 
        :to="tier.path" 
        class="hover:text-[#0B0E28] transition-colors truncate max-w-[120px] sm:max-w-[200px]"
        :title="tier.name"
      >
        {{ tier.name }}
      </NuxtLink>
      
      <!-- Last active tier -->
      <span v-else class="text-[#0B0E28] font-bold truncate max-w-[150px] sm:max-w-[250px]" :title="tier.name">
        {{ tier.name }}
      </span>

    </template>
  </nav>
</template>

<script setup>
defineProps({
  tiers: {
    type: Array,
    required: true,
    // Expected format: [{ name: 'الأجهزة الكهربائية', path: '/shop/electrical' }, ...]
    default: () => []
  }
})
</script>
