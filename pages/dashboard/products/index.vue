<template>
  <div class="space-y-6">
    <!-- Header & Actions -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة المنتجات</h1>
        <p class="text-sm text-slate-500 mt-1">تصفح، أضف، وعدّل منتجات متجرك.</p>
      </div>
      
      <NuxtLink to="/dashboard/products/create">
        <BaseButton variant="primary" class="gap-2 shadow-md">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة منتج جديد
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Toolbar: Search & Filters -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <div class="flex-1">
        <BaseInput v-model="searchQuery" placeholder="ابحث باسم المنتج، الصنف، أو الـ SKU...">
          <template #icon>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </BaseInput>
      </div>
      <div class="w-full md:w-48">
        <BaseSelect v-model="categoryFilter" :options="categoryOptions" placeholder="جميع التصنيفات" />
      </div>
      <div class="w-full md:w-48">
        <BaseSelect v-model="stockFilter" :options="stockOptions" placeholder="حالة المخزون" />
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto w-full">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4 font-bold">المنتج</th>
              <th class="px-6 py-4 font-bold">التصنيف</th>
              <th class="px-6 py-4 font-bold">السعر</th>
              <th class="px-6 py-4 font-bold">المخزون</th>
              <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-for="product in products" :key="product.id" class="hover:bg-slate-50/50 transition-colors">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                    <img :src="product.image" class="w-full h-full object-cover" />
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-slate-800">{{ product.name }}</span>
                    <span class="text-xs text-slate-400">SKU: {{ product.sku }}</span>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-600 font-medium">{{ product.category }}</td>
              <td class="px-6 py-4 font-bold text-slate-800 dir-ltr text-right">{{ product.price }} ر.س</td>
              <td class="px-6 py-4">
                <StatusBadge :status="product.stock > 10 ? 'completed' : (product.stock > 0 ? 'pending' : 'cancelled')" />
                <span class="text-xs text-slate-400 mr-2">({{ product.stock }})</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2">
                  <NuxtLink :to="`/dashboard/products/${product.id}`" class="w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors" title="تعديل">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </NuxtLink>
                  <button 
                    @click="confirmDelete(product.id)"
                    class="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors" 
                    title="حذف"
                  >
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="p-4 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500">
        <span>عرض 1 إلى 5 من أصل 24 منتج</span>
        <div class="flex items-center gap-1">
          <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50 disabled:opacity-50" disabled>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center bg-indigo-50 text-indigo-600 font-bold">1</button>
          <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50">2</button>
          <button class="w-8 h-8 rounded border border-slate-200 flex items-center justify-center hover:bg-slate-50">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()

const searchQuery = ref('')
const categoryFilter = ref('')
const stockFilter = ref('')

const categoryOptions = [
  { label: 'الكل', value: '' },
  { label: 'مكيفات', value: 'ac' },
  { label: 'ثلاجات', value: 'fridge' },
  { label: 'غسالات', value: 'washing' }
]

const stockOptions = [
  { label: 'الكل', value: '' },
  { label: 'متوفر', value: 'in_stock' },
  { label: 'قارب على الانتهاء', value: 'low_stock' },
  { label: 'نفد', value: 'out_of_stock' }
]

// Mock Products
const products = ref([
  { id: '1', name: 'مكيف سبليت جري 18000 وحدة', sku: 'GREE-18K-SPLIT', category: 'مكيفات', price: '2,450', stock: 15, image: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'ثلاجة سامسونج 18 قدم فضي', sku: 'SAM-FR-18-SLV', category: 'ثلاجات', price: '3,200', stock: 4, image: 'https://images.unsplash.com/photo-1585237722700-1c7b8bc1df84?q=80&w=200&auto=format&fit=crop' },
  { id: '3', name: 'غسالة ال جي 9 كيلو تعبئة أمامية', sku: 'LG-WM-9K-FR', category: 'غسالات', price: '2,100', stock: 0, image: 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?q=80&w=200&auto=format&fit=crop' },
  { id: '4', name: 'ميكروويف باناسونيك 25 لتر', sku: 'PAN-MW-25L', category: 'أجهزة صغيرة', price: '450', stock: 24, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=200&auto=format&fit=crop' },
  { id: '5', name: 'شاشة سوني سمارت 65 بوصة', sku: 'SONY-TV-65', category: 'شاشات', price: '4,800', stock: 8, image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=200&auto=format&fit=crop' },
])

const confirmDelete = (id: string) => {
  if(confirm('هل أنت متأكد من رغبتك في حذف هذا المنتج نهائياً؟')) {
    // Fake deletion logic
    products.value = products.value.filter(p => p.id !== id)
    success('تم الحذف بنجاح', 'تم إزالة المنتج من المتجر بشكل نهائي.')
  }
}
</script>
