<template>
  <div v-if="categories && categories.length > 0" class="w-full relative mb-10 overflow-hidden">
    <!-- Optional Fade Gradients for scroll indication -->
    <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>
    <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>

    <div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 custom-scrollbar snap-x snap-mandatory hide-scroll-mobile px-2" dir="rtl">
      
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="cat.path"
        class="group flex flex-col items-center gap-3 shrink-0 snap-start outline-none"
      >
        <!-- Circle Image Container -->
        <div 
          class="w-20 h-20 sm:w-24 sm:h-24 rounded-[2rem] bg-white p-3 flex items-center justify-center relative shadow-sm border border-slate-100/80 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-amber-400/20 group-hover:border-amber-400 group-focus-visible:ring-4 group-focus-visible:ring-amber-400/50"
          :class="{ 'border-amber-400 shadow-md shadow-amber-400/10': cat.isActive }"
        >
          <div class="w-full h-full rounded-2xl bg-slate-50 overflow-hidden flex items-center justify-center relative">
            <!-- Background Decoration for luxury feel -->
            <div class="absolute inset-0 bg-gradient-to-br from-slate-100/50 to-amber-50/20 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <img 
              :src="cat.image" 
              :alt="cat.name"
              class="w-full h-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        <!-- Text Details -->
        <div class="text-center">
          <h3 class="text-[11px] sm:text-xs font-black text-[#0B0E28] transition-colors group-hover:text-amber-500 max-w-[90px] sm:max-w-[100px] truncate">
            {{ cat.name }}
          </h3>
          <span class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block">
            {{ cat.count }} منتج
          </span>
        </div>
      </NuxtLink>

    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true,
    // Expected: [{ id: 1, name: 'أجهزة الطهي', image: 'url', count: 120, path: '/shop/...', isActive: false }]
    default: () => []
  }
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

@media (max-width: 640px) {
  .hide-scroll-mobile::-webkit-scrollbar {
    display: none;
  }
  .hide-scroll-mobile {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
}
</style>
