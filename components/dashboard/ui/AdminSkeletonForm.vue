<template>
  <div class="space-y-6">
    <div 
      v-for="c in (cards || 2)" 
      :key="c"
      class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 animate-pulse space-y-5 shadow-xs"
    >
      <div class="flex items-center justify-between border-b border-slate-100 pb-4">
        <div class="space-y-2 w-1/3">
          <div class="h-5 bg-slate-200 rounded-lg w-3/4"></div>
          <div class="h-3 bg-slate-100 rounded-md w-full"></div>
        </div>
        <div class="h-8 bg-slate-100 rounded-xl w-24"></div>
      </div>

      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-1.5">
            <div class="h-3 bg-slate-200 rounded-md w-24"></div>
            <div class="h-11 bg-slate-100 rounded-xl w-full"></div>
          </div>
          <div class="space-y-1.5">
            <div class="h-3 bg-slate-200 rounded-md w-24"></div>
            <div class="h-11 bg-slate-100 rounded-xl w-full"></div>
          </div>
        </div>

        <div class="space-y-1.5">
          <div class="h-3 bg-slate-200 rounded-md w-32"></div>
          <div class="h-28 bg-slate-100 rounded-2xl w-full"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  cards?: number
}>(), {
  cards: 2
})
</script>
