<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    
    <div v-for="(badge, idx) in badges" :key="idx" class="flex flex-col items-center justify-center text-center gap-2 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
      <div class="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-[#0B0E28] mb-1 ring-1 ring-slate-100">
        <component :is="badge.icon" class="w-6 h-6 stroke-[1.5]" />
      </div>
      <h5 class="text-xs font-bold text-slate-800 leading-snug">{{ badge.title }}</h5>
      <p class="text-[10px] text-slate-400">{{ badge.desc }}</p>
    </div>

  </div>
</template>

<script setup>
import { h } from 'vue'

// SVG Icons as functional components
const TruckIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }, [
  h('rect', { x: '1', y: '3', width: '15', height: '13' }),
  h('polygon', { points: '16 8 20 8 23 11 23 16 16 16 16 8' }),
  h('circle', { cx: '5.5', cy: '18.5', r: '2.5' }),
  h('circle', { cx: '18.5', cy: '18.5', r: '2.5' })
])

const ShieldIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }, [
  h('path', { d: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' }),
  h('path', { d: 'M9 12l2 2 4-4' })
])

const OriginalIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }, [
  h('circle', { cx: '12', cy: '8', r: '7' }),
  h('polyline', { points: '8.21 13.89 7 23 12 20 17 23 15.79 13.88' })
])

const SupportIcon = () => h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }, [
  h('path', { d: 'M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' })
])

const badges = [
  { icon: TruckIcon, title: 'توصيل سريع', desc: 'لجميع المحافظات' },
  { icon: ShieldIcon, title: 'ضمان سنتين', desc: 'من وكيل معتمد' },
  { icon: OriginalIcon, title: 'أصلي 100%', desc: 'جودة مضمونة' },
  { icon: SupportIcon, title: 'دعم متواصل', desc: 'خدمة عملاء 24/7' }
]
</script>
