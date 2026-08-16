<template>
  <div class="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50/50" :dir="layoutDirection">
    <div class="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg">
      <div class="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner border border-amber-200">
        404
      </div>

      <div class="space-y-2">
        <h1 class="text-2xl font-black text-[#0B0E28]">
          {{ layoutDirection === 'ltr' ? 'Page Not Found' : 'الصفحة غير موجودة' }}
        </h1>
        <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
          {{ layoutDirection === 'ltr' 
            ? 'The page you are looking for might have been moved or does not exist.' 
            : 'عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم تغيير مسارها.' }}
        </p>
      </div>

      <div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
        <NuxtLink 
          to="/" 
          class="w-full sm:w-auto px-6 py-3 bg-[#0B0E28] hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
        >
          {{ layoutDirection === 'ltr' ? 'Back to Home' : 'الرئيسية' }}
        </NuxtLink>

        <NuxtLink 
          to="/shop" 
          class="w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
        >
          {{ layoutDirection === 'ltr' ? 'Browse Shop' : 'تصفح المتجر' }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const { layoutDirection } = useLanguage()

useHead({
  title: '404 - الصفحة غير موجودة | أسوار جدة'
})
</script>
