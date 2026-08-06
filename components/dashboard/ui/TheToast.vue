<template>
  <Teleport to="body">
    <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none" dir="rtl">
      <TransitionGroup name="toast">
        <div 
          v-for="toast in toasts" 
          :key="toast.id"
          class="flex items-start gap-3 p-4 rounded-xl shadow-lg border pointer-events-auto bg-white backdrop-blur-sm"
          :class="{
            'border-green-200': toast.type === 'success',
            'border-red-200': toast.type === 'error',
            'border-blue-200': toast.type === 'info',
            'border-amber-200': toast.type === 'warning'
          }"
        >
          <!-- Icon -->
          <div class="shrink-0 mt-0.5">
            <!-- Success Icon -->
            <svg v-if="toast.type === 'success'" class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <!-- Error Icon -->
            <svg v-else-if="toast.type === 'error'" class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <!-- Info Icon -->
            <svg v-else-if="toast.type === 'info'" class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0">
            <h4 class="text-sm font-bold text-slate-800">{{ toast.title }}</h4>
            <p v-if="toast.message" class="text-xs text-slate-500 mt-1">{{ toast.message }}</p>
          </div>

          <!-- Close Button -->
          <button @click="removeToast(toast.id)" class="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'

const { toasts, removeToast } = useToast()
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(-20px) scale(0.95);
}
.toast-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
}
</style>
