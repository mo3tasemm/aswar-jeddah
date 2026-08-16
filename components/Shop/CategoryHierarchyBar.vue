<template>
  <div v-if="categories && categories.length > 0" class="w-full relative mb-8 overflow-hidden">
    <!-- Fade Gradients for scroll indication -->
    <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>
    <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block"></div>

    <div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 custom-scrollbar snap-x snap-mandatory hide-scroll-mobile px-2">
      
      <!-- Category Item with Nested/Dynamic Route -->
      <NuxtLink
        v-for="cat in categories"
        :key="cat.id"
        :to="getCategoryUrl(cat)"
        class="group flex flex-col items-center gap-2.5 shrink-0 snap-start outline-none cursor-pointer"
      >
        <!-- Circle Image / Icon Container -->
        <div 
          class="w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-white p-2.5 flex items-center justify-center relative shadow-sm border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:border-indigo-500"
          :class="{ 'border-indigo-600 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-500/30': isSelected(cat) }"
        >
          <div class="w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative">
            <img 
              v-if="cat.icon"
              :src="cat.icon" 
              :alt="getCatName(cat)"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <i v-else class="fa-solid fa-layer-group text-slate-400 text-lg group-hover:text-indigo-600 transition-colors"></i>
          </div>
        </div>

        <!-- Text Details -->
        <div class="text-center">
          <h3 
            class="text-[11px] sm:text-xs font-black transition-colors max-w-[80px] sm:max-w-[100px] truncate"
            :class="isSelected(cat) ? 'text-indigo-600' : 'text-slate-800 group-hover:text-indigo-600'"
          >
            {{ getCatName(cat) }}
          </h3>
          <span v-if="cat.productCount" class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block">
            {{ cat.productCount }} {{ layoutDirection === 'ltr' ? 'Products' : 'منتج' }}
          </span>
        </div>
      </NuxtLink>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps<{
  categories: any[]
  selectedCategoryId?: number | string | null
  basePath?: string
}>()

const { layoutDirection } = useLanguage()

const getCatName = (cat: any) => {
  if (!cat) return ''
  if (layoutDirection.value === 'ltr') {
    return cat.name_en || cat.title_en || cat.name
  }
  return cat.name_ar || cat.name
}

const getCategoryUrl = (cat: any) => {
  if (cat.customUrl) return cat.customUrl
  if (cat.fullPath) return `/category/${cat.fullPath}`
  if (props.basePath) {
    const cleanBase = props.basePath.replace(/^\/|\/$/g, '')
    const catSlug = cat.slug || cat.id
    return `/${cleanBase}/${catSlug}`
  }
  return `/category/${cat.slug || cat.id}`
}

const isSelected = (cat: any) => {
  if (!props.selectedCategoryId) return false
  return String(props.selectedCategoryId) === String(cat.id) || String(props.selectedCategoryId) === String(cat.slug)
}
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
