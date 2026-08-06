<template>
  <Transition name="toast">
    <div 
      v-if="isVisible" 
      class="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 bg-white rounded-2xl shadow-[0_10px_40px_rgba(11,14,40,0.12)] border border-slate-100 p-4 flex items-center gap-4 max-w-[320px] md:max-w-[380px] cursor-pointer hover:-translate-y-1 transition-transform"
      @click="isVisible = false"
    >
      <div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>
      
      <div class="flex-1 min-w-0">
        <p class="text-xs text-slate-500 mb-1">
          <span class="font-bold text-[#0B0E28]">{{ buyerName }}</span> من {{ buyerCity }}
        </p>
        <p class="text-sm font-bold text-[#0B0E28] line-clamp-2 leading-snug">
          قام بشراء {{ productTitle }} للتو!
        </p>
        <p class="text-[10px] text-slate-400 mt-1">{{ timeAgo }}</p>
      </div>

      <button class="absolute top-2 right-2 text-slate-400 hover:text-slate-600">
        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  productTitle: {
    type: String,
    required: true
  }
})

const isVisible = ref(false)
const buyerName = ref('')
const buyerCity = ref('')
const timeAgo = ref('')

const names = ['محمد', 'أحمد', 'خالد', 'سارة', 'فاطمة', 'عمر', 'عبدالله']
const cities = ['الرياض', 'جدة', 'مكة', 'الدمام', 'المدينة', 'الطائف']
const times = ['منذ دقيقة', 'منذ 3 دقائق', 'منذ 5 دقائق']

let timeoutId = null

const showNotification = () => {
  buyerName.value = names[Math.floor(Math.random() * names.length)]
  buyerCity.value = cities[Math.floor(Math.random() * cities.length)]
  timeAgo.value = times[Math.floor(Math.random() * times.length)]
  
  isVisible.value = true

  // Hide after 5 seconds
  setTimeout(() => {
    isVisible.value = false
  }, 5000)
}

onMounted(() => {
  // Show first notification after 7 seconds
  timeoutId = setTimeout(() => {
    showNotification()
    
    // Then show randomly every 30-60 seconds
    setInterval(() => {
      showNotification()
    }, Math.floor(Math.random() * 30000) + 30000)
    
  }, 7000)
})

onUnmounted(() => {
  if (timeoutId) clearTimeout(timeoutId)
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
