<template>
  <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8">
    <!-- Breadcrumbs Skeleton -->
    <div class="h-4 bg-slate-100 rounded-md w-64"></div>

    <!-- Main Grid: Gallery & Info -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
      <!-- Gallery Left (5 cols) -->
      <div class="lg:col-span-5 space-y-4">
        <div class="w-full aspect-square bg-slate-100 rounded-3xl border border-slate-200/60 flex items-center justify-center">
          <i class="fa-regular fa-image text-slate-300 text-4xl"></i>
        </div>
        <div class="flex gap-3">
          <div v-for="i in 4" :key="i" class="w-20 h-20 bg-slate-100 rounded-2xl border border-slate-200/60"></div>
        </div>
      </div>

      <!-- Details Right (7 cols) -->
      <div class="lg:col-span-7 space-y-6">
        <!-- Brand & Badges -->
        <div class="flex items-center gap-3">
          <div class="h-6 bg-slate-100 rounded-lg w-24"></div>
          <div class="h-6 bg-emerald-50 rounded-lg w-20"></div>
        </div>

        <!-- Title -->
        <div class="space-y-2">
          <div class="h-7 bg-slate-200 rounded-xl w-4/5"></div>
          <div class="h-7 bg-slate-200 rounded-xl w-3/5"></div>
        </div>

        <!-- Rating & Code -->
        <div class="h-4 bg-slate-100 rounded-md w-48"></div>

        <!-- Price Card -->
        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
          <div class="h-8 bg-amber-200/80 rounded-xl w-40"></div>
          <div class="h-4 bg-slate-200 rounded-md w-64"></div>
        </div>

        <!-- Color & Variation Selectors -->
        <div class="space-y-3">
          <div class="h-4 bg-slate-100 rounded-md w-28"></div>
          <div class="flex gap-2">
            <div v-for="i in 3" :key="i" class="w-10 h-10 rounded-full bg-slate-200"></div>
          </div>
        </div>

        <!-- Action Buttons (Add to Cart & Buy) -->
        <div class="flex flex-col sm:flex-row gap-4 pt-4">
          <div class="h-14 bg-amber-400/50 rounded-2xl flex-1"></div>
          <div class="h-14 bg-slate-900/40 rounded-2xl flex-1"></div>
        </div>
      </div>
    </div>
  </div>
</template>
