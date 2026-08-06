<template>
  <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
    <!-- Header Skeleton -->
    <div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
      <div class="w-32 h-6 bg-slate-200 rounded-lg animate-pulse"></div>
      <div class="w-20 h-4 bg-slate-200 rounded-lg animate-pulse"></div>
    </div>

    <!-- Table Skeleton -->
    <div class="overflow-x-auto w-full">
      <table class="w-full text-right text-sm">
        <thead class="bg-slate-50 border-b border-slate-100">
          <tr>
            <th v-for="i in 6" :key="i" class="px-6 py-4">
              <div class="w-16 h-4 bg-slate-200 rounded-md animate-pulse"></div>
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100/80">
          <tr v-for="row in rows" :key="row">
            <td v-for="col in 6" :key="col" class="px-6 py-4">
              <div v-if="col === 2" class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0"></div>
                <div class="flex flex-col gap-1 w-full max-w-[120px]">
                  <div class="h-3 bg-slate-200 rounded-full w-3/4 animate-pulse"></div>
                  <div class="h-2 bg-slate-200 rounded-full w-1/2 animate-pulse"></div>
                </div>
              </div>
              <div v-else-if="col === 4" class="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div>
              <div v-else class="w-16 h-3 bg-slate-200 rounded-full animate-pulse"></div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  rows: {
    type: Number,
    default: 5
  }
})
</script>
