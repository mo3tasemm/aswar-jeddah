<template>
  <div class="space-y-6">
    <!-- Header & Actions -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة العلامات التجارية</h1>
        <p class="text-sm text-slate-500 mt-1">أضف وأدر العلامات التجارية (البراندات) المتاحة في متجرك.</p>
      </div>
      
      <NuxtLink to="/dashboard/brands/create">
        <BaseButton variant="primary" class="gap-2 shadow-md">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة براند جديد
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Toolbar: Search -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
      <BaseInput v-model="searchQuery" placeholder="ابحث باسم العلامة التجارية..." class="max-w-md">
        <template #icon>
          <svg class="w-5 h-5" fill="none" viewBox="0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </BaseInput>
    </div>

    <!-- Brands Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold">العلامة التجارية</th>
              <th class="px-6 py-4 font-bold">الوصف</th>
              <th class="px-6 py-4 font-bold">المنتجات المرتبطة</th>
              <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-if="filteredBrands.length === 0">
              <td colspan="4" class="px-6 py-12 text-center text-slate-500 font-bold">
                لم يتم العثور على أي علامة تجارية.
              </td>
            </tr>
            <tr v-for="brand in filteredBrands" :key="brand.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 shrink-0 overflow-hidden">
                    <img :src="brand.logo" class="max-w-full max-h-full object-contain" />
                  </div>
                  <span class="font-black text-slate-800 text-base">{{ brand.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-500 text-xs whitespace-normal max-w-xs leading-relaxed">
                {{ brand.description || 'لا يوجد وصف.' }}
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-xs">
                  {{ brand.productsCount }} منتج
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink :to="`/dashboard/brands/${brand.id}`" class="w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors" title="تعديل">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </NuxtLink>
                  <button @click="deleteBrand(brand.id)" class="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors" title="حذف">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()

interface Brand {
  id: string
  name: string
  description?: string
  logo: string
  productsCount: number
}

// Mock Data
const brands = ref<Brand[]>([
  { id: 'b1', name: 'سامسونج - Samsung', description: 'شركة رائدة في الأجهزة المنزلية والإلكترونيات.', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg', productsCount: 145 },
  { id: 'b2', name: 'إل جي - LG', description: 'حياة أفضل مع إل جي.', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg', productsCount: 89 },
  { id: 'b3', name: 'سوني - Sony', description: 'متعة الترفيه المنزلي والمستوى الفاخر.', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Sony_logo.svg', productsCount: 52 },
  { id: 'b4', name: 'جري - Gree', description: 'المكيف رقم واحد عالمياً.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Gree_logo.svg/512px-Gree_logo.svg.png', productsCount: 34 },
  { id: 'b5', name: 'باناسونيك - Panasonic', description: 'جودة يابانية عالية تدوم طويلاً.', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Panasonic_logo.svg/512px-Panasonic_logo.svg.png', productsCount: 22 },
])

const searchQuery = ref('')
const filteredBrands = computed(() => {
  if (!searchQuery.value) return brands.value
  const q = searchQuery.value.toLowerCase()
  return brands.value.filter(b => b.name.toLowerCase().includes(q))
})

const deleteBrand = (id: string) => {
  if(confirm('هل أنت متأكد من حذف هذا البراند؟')) {
    brands.value = brands.value.filter(b => b.id !== id)
    success('تم الحذف بنجاح', 'تم إزالة العلامة التجارية.')
  }
}
</script>
