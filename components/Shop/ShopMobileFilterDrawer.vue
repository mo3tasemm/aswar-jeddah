<template>
  <Teleport to="body">
    <Transition name="fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 bg-[#0B0E28]/60 backdrop-blur-sm z-[100] transition-opacity"
        @click="$emit('close')"
      ></div>
    </Transition>

    <Transition name="slide-right">
      <div 
        v-if="isOpen"
        class="fixed top-0 bottom-0 end-0 w-[90%] max-w-sm bg-white z-[101] shadow-2xl flex flex-col"
        :dir="layoutDirection"
      >
        <!-- Header -->
        <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50">
          <h2 class="text-lg font-black text-[#0B0E28] flex items-center gap-2">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span>{{ t('shop.filters') }}</span>
          </h2>
          <button 
            @click="$emit('close')"
            class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        <!-- Filter Content -->
        <div class="flex-1 overflow-y-auto custom-scrollbar p-5 overscroll-contain">
          <ShopFilterSidebar 
            :filters="filters" 
            :categories="categories"
            :brands="brands"
            @update-filters="$emit('update-filters', $event)" 
            @reset-filters="$emit('reset-filters')" 
            class="!p-0 !border-none !shadow-none"
          />
        </div>

        <!-- Footer Action -->
        <div class="p-5 border-t border-slate-100 shrink-0 bg-white">
          <button 
            @click="$emit('close')"
            class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            {{ layoutDirection === 'ltr' ? 'Show Results' : 'عرض النتائج' }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue'
import ShopFilterSidebar from './ShopFilterSidebar.vue'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  filters: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    default: () => []
  },
  brands: {
    type: Array,
    default: () => []
  }
})

defineEmits(['close', 'update-filters', 'reset-filters'])

const { t, layoutDirection } = useLanguage()

// Scroll Lock Logic
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = `${scrollbarWidth}px`
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
  document.body.style.overscrollBehavior = 'contain'
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.paddingRight = ''
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
  document.body.style.overscrollBehavior = ''
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) lockScroll()
  else unlockScroll()
})

onMounted(() => {
  if (props.isOpen) lockScroll()
})
</script>
