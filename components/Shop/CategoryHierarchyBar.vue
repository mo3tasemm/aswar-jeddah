<template>
  <div v-if="categories && categories.length > 0" class="w-full relative mb-8 overflow-hidden">
    <!-- Fade Gradients for scroll indication -->
    <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>
    <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>

    <div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 custom-scrollbar snap-x snap-mandatory hide-scroll-mobile px-2">
      
      <!-- Category Item with Direct Route to /category/[slug] -->
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="`/category/${cat.slug || cat.id}`"
        class="group flex flex-col items-center gap-2.5 shrink-0 snap-start outline-none cursor-pointer"
      >
        <!-- Circle Image / Icon Container -->
        <div 
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-white p-2.5 flex items-center justify-center relative shadow-sm border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:border-indigo-500"
          :class="{ 'border-indigo-600 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-500/30': selectedCategoryId === cat.id }"
        >
          <div class="w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative">
            <img 
              v-if="cat.icon"
              :src="cat.icon" 
              :alt="cat.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <i v-else class="fa-solid fa-layer-group text-slate-400 text-lg group-hover:text-indigo-600 transition-colors"></i>
          </div>
        </div>

        <!-- Text Details -->
        <div class="text-center">
          <h3 
            class="text-[11px] sm:text-xs font-black transition-colors max-w-[80px] sm:max-w-[100px] truncate"
            :class="selectedCategoryId === cat.id ? 'text-indigo-600' : 'text-slate-800 group-hover:text-indigo-600'"
          >
            {{ cat.name }}
          </h3>
          <span v-if="cat.productCount" class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block">
            {{ cat.productCount }} منتج
          </span>
        </div>
      </NuxtLink>

    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  categories: any[]
  selectedCategoryId?: number | string | null
}>()
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #CBD5E1;
  border-radius: 4px;
}
.hide-scroll-mobile::-webkit-scrollbar {
  display: none;
}
</style>
