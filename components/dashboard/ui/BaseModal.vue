<template>
  <Teleport to="#modals">
    <Transition name="fade">
      <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl">
        <!-- Backdrop -->
        <div 
          class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
          @click="close"
        ></div>
        
        <!-- Modal Content -->
        <Transition name="slide-up">
          <div 
            v-if="modelValue"
            class="bg-white rounded-2xl shadow-xl w-full max-h-full flex flex-col relative z-10 overflow-hidden"
            :class="[maxWidthClass]"
            @click.stop
          >
            <!-- Header -->
            <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <div>
                <h3 class="text-lg font-black text-slate-800">{{ title }}</h3>
                <p v-if="description" class="text-sm text-slate-500 mt-0.5">{{ description }}</p>
              </div>
              <button 
                @click="close"
                class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 flex items-center justify-center transition-colors"
              >
                <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <!-- Body -->
            <div class="p-6 overflow-y-auto">
              <slot />
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: boolean
  title: string
  description?: string
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl'
}>()

const emit = defineEmits(['update:modelValue', 'close'])

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const maxWidthClass = computed(() => {
  switch (props.maxWidth) {
    case 'sm': return 'max-w-md'
    case 'md': return 'max-w-lg'
    case 'lg': return 'max-w-2xl'
    case 'xl': return 'max-w-4xl'
    default: return 'max-w-md'
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
</style>
