<template>
  <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6">
    <div class="h-8 bg-slate-200 rounded-xl w-48"></div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Cart Items List (8 cols) -->
      <div class="lg:col-span-8 space-y-4">
        <div v-for="i in 3" :key="i" class="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-4">
          <div class="w-20 h-20 bg-slate-100 rounded-xl shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-200 rounded-md w-3/4"></div>
            <div class="h-4 bg-amber-100 rounded-md w-24"></div>
          </div>
          <div class="w-24 h-9 bg-slate-100 rounded-xl shrink-0"></div>
        </div>
      </div>

      <!-- Order Summary (4 cols) -->
      <div class="lg:col-span-4 p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
        <div class="h-6 bg-slate-200 rounded-lg w-32"></div>
        <div class="space-y-3 pt-2">
          <div class="flex justify-between"><div class="h-4 bg-slate-100 rounded w-20"></div><div class="h-4 bg-slate-100 rounded w-16"></div></div>
          <div class="flex justify-between"><div class="h-4 bg-slate-100 rounded w-24"></div><div class="h-4 bg-slate-100 rounded w-16"></div></div>
          <div class="flex justify-between border-t pt-2"><div class="h-5 bg-slate-200 rounded w-20"></div><div class="h-5 bg-amber-200 rounded w-20"></div></div>
        </div>
        <div class="h-12 bg-amber-400/50 rounded-2xl w-full"></div>
      </div>
    </div>
  </div>
</template>
