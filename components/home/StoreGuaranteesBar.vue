<template>
  <div class="max-w-[1550px] mx-auto px-4 lg:px-6 my-10">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
      
      <div 
        v-for="(guarantee, idx) in resolvedGuarantees" 
        :key="idx"
        class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group"
      >
        <div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">
          <svg v-if="idx === 0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
          <svg v-else-if="idx === 1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <svg v-else-if="idx === 2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
          </svg>
        </div>
        <div>
          <h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">{{ guarantee.title }}</h3>
          <p class="text-slate-500 text-xs md:text-sm">{{ guarantee.desc || guarantee.subtitle }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'

const { currentLanguage } = useLanguage()

const defaultGuaranteesAr = [
  { title: 'منتجات أصلية 100%', desc: 'مضمونة من الوكيل مباشرة' },
  { title: 'أسرع خدمة ما بعد البيع', desc: 'متابعة وصيانة فورية' },
  { title: 'ضمان حتى 12 شهر', desc: 'ضمان شامل ومعتمد' },
  { title: 'توصيل سريع وآمن', desc: 'شحن لكافة المحافظات' }
]

const defaultGuaranteesEn = [
  { title: '100% Genuine Products', desc: 'Directly from authorized agency' },
  { title: 'Rapid After-Sales Service', desc: 'Immediate support & maintenance' },
  { title: 'Up to 12 Months Warranty', desc: 'Comprehensive certified warranty' },
  { title: 'Fast & Secure Delivery', desc: 'Reliable dispatch to all regions' }
]

const props = defineProps<{
  config?: {
    guarantees?: Array<{ title?: string; title_en?: string; desc?: string; desc_en?: string; subtitle?: string; icon?: string }>
  }
}>()

const resolvedGuarantees = computed(() => {
  const isEn = currentLanguage.value === 'en'
  if (props.config?.guarantees && props.config.guarantees.length > 0) {
    return props.config.guarantees.map(g => ({
      title: isEn ? (g.title_en || g.title) : (g.title || g.title_en),
      desc: isEn ? (g.desc_en || g.desc || g.subtitle) : (g.desc || g.subtitle || g.desc_en)
    }))
  }
  return isEn ? defaultGuaranteesEn : defaultGuaranteesAr
})
</script>
