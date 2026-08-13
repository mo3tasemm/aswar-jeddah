<template>
  <div class="space-y-6">
    <!-- VIEW TOGGLE CONTROLLER HEADER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">إدارة المنتجات (Admin Products CRUD)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ activeView === 'list' ? 'استعراض وإدارة منتجات المتجر مع نظام الصفحات التفاعلي.' : (editingProduct ? 'تعديل بيانات المنتج المختار.' : 'نموذج إضافة منتج جديد كـ FormData.') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          v-if="activeView === 'list'"
          @click="openAddForm"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>إضافة منتج جديد</span>
        </button>

        <button 
          v-else
          @click="activeView = 'list'"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>العودة لقائمة المنتجات</span>
        </button>
      </div>
    </div>

    <!-- VIEW 1: PRODUCTS LIST TABLE WITH PAGINATION -->
    <div v-if="activeView === 'list'" class="space-y-6">
      
      <!-- Toolbar: Search & Refresh -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
        <div class="flex-1">
          <BaseInput v-model="searchQuery" placeholder="ابحث باسم المنتج، الصنف، أو الـ SKU...">
            <template #icon>
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </template>
          </BaseInput>
        </div>

        <button 
          @click="loadProducts(currentPage)" 
          :disabled="isLoading"
          class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          <span>تحديث القائمة</span>
        </button>
      </div>

      <!-- ERROR MESSAGE -->
      <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3">
        <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- PRODUCTS TABLE -->
      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        <!-- SKELETON LOADER STATE DURING PAGE CHANGE -->
        <div v-if="isLoading" class="p-6 space-y-4">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
            <div class="h-4 bg-slate-200 rounded w-1/6 animate-pulse"></div>
          </div>
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
            <div class="w-12 h-12 bg-slate-200 rounded-xl animate-pulse shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div>
              <div class="h-3 bg-slate-100 rounded w-1/5 animate-pulse"></div>
            </div>
            <div class="w-20 h-6 bg-slate-100 rounded-lg animate-pulse"></div>
            <div class="w-16 h-6 bg-slate-200 rounded-md animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredProducts.length === 0" class="p-12 text-center space-y-3">
          <svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
          <p class="text-sm font-extrabold text-slate-700">لا توجد منتجات مسجلة في النظام.</p>
          <button @click="openAddForm" class="px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs">
            إضافة أول منتج
          </button>
        </div>

        <!-- Table Data -->
        <div v-else class="overflow-x-auto w-full">
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
              <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-slate-50/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img 
                        :src="product.thumbnail || 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=200&auto=format&fit=crop'" 
                        class="w-full h-full object-cover" 
                        alt="Product Image"
                      />
                    </div>
                    <div class="flex flex-col">
                      <span class="font-bold text-slate-900">{{ product.name }}</span>
                      <span class="text-xs text-slate-400">SKU: {{ product.sku }}</span>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-slate-600 font-medium">
                  {{ product.category_name }}
                </td>
                <td class="px-6 py-4 font-black text-slate-900">
                  {{ product.unit_price }} ر.س
                </td>
                <td class="px-6 py-4">
                  <span 
                    class="px-2.5 py-1 rounded-md text-xs font-extrabold"
                    :class="product.current_stock > 5 ? 'bg-emerald-50 text-emerald-700' : (product.current_stock > 0 ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700')"
                  >
                    {{ product.current_stock > 0 ? `متوفر (${product.current_stock})` : 'نفذت الكمية' }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="openEditForm(product)"
                      class="w-8 h-8 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="تعديل المنتج"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>

                    <button 
                      @click="handleDelete(product.id)"
                      class="w-8 h-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                      title="حذف المنتج"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- PAGINATION CONTROLS BAR -->
        <div v-if="!isLoading && filteredProducts.length > 0" class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div>
            عرض المنتجات من {{ startItem }} إلى {{ endItem }} (إجمالي {{ displayTotal }} منتج)
          </div>

          <div class="flex items-center gap-1.5">
            <!-- Previous Button -->
            <button 
              @click="handlePageChange(currentPage - 1)" 
              :disabled="currentPage <= 1 || isLoading"
              class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              <span>السابق</span>
            </button>

            <!-- Page Number Buttons -->
            <button 
              v-for="p in visiblePages" 
              :key="p"
              @click="handlePageChange(p)"
              class="w-8 h-8 rounded-xl font-extrabold flex items-center justify-center transition-colors cursor-pointer"
              :class="p === currentPage ? 'bg-[#0B0E28] text-white shadow-sm' : 'border border-slate-200 text-slate-700 hover:bg-slate-50'"
            >
              {{ p }}
            </button>

            <!-- Next Button -->
            <button 
              @click="handlePageChange(currentPage + 1)" 
              :disabled="currentPage >= displayLastPage || isLoading"
              class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <span>التالي</span>
              <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- VIEW 2: ADVANCED FORM VIEW (ADD / EDIT) -->
    <div v-else-if="activeView === 'form'">
      <ProductFormAdvanced 
        :initial-data="editingProductData"
        :is-edit-mode="Boolean(editingProduct)"
        :is-submitting="isSubmitting"
        @submit="handleFormSubmit"
        @cancel="activeView = 'list'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import ProductFormAdvanced from '~/components/dashboard/ProductFormAdvanced.vue'
import { useAdminProducts } from '~/composables/useAdminProducts'
import type { AdminProductItem, ProductFormDataPayload } from '~/services/adminProductsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إدارة المنتجات | لوحة التحكم'
})

const { 
  products, 
  isLoading, 
  isSubmitting, 
  errorMessage, 
  currentPage, 
  lastPage, 
  perPage, 
  totalProducts, 
  fetchProducts, 
  changePage, 
  deleteProduct, 
  submitForm 
} = useAdminProducts()

const activeView = ref<'list' | 'form'>('list')
const searchQuery = ref('')
const editingProduct = ref<AdminProductItem | null>(null)

const loadProducts = async (page: number = 1) => {
  await fetchProducts(page, perPage.value)
}

onMounted(() => {
  loadProducts(1)
})

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return products.value
  const query = searchQuery.value.toLowerCase()
  return products.value.filter(p => 
    p.name.toLowerCase().includes(query) || 
    (p.sku && p.sku.toLowerCase().includes(query)) ||
    (p.category_name && p.category_name.toLowerCase().includes(query))
  )
})

// Displayed Products per Page (Client-side fallback if backend returns full array)
const isClientPaginated = computed(() => filteredProducts.value.length > perPage.value)

const displayTotal = computed(() => {
  if (isClientPaginated.value) return filteredProducts.value.length
  return totalProducts.value || filteredProducts.value.length
})

const displayLastPage = computed(() => {
  if (isClientPaginated.value) return Math.ceil(filteredProducts.value.length / perPage.value) || 1
  return lastPage.value || 1
})

const paginatedProducts = computed(() => {
  if (isClientPaginated.value) {
    const start = (currentPage.value - 1) * perPage.value
    return filteredProducts.value.slice(start, start + perPage.value)
  }
  return filteredProducts.value
})

const startItem = computed(() => {
  if (displayTotal.value === 0) return 0
  return (currentPage.value - 1) * perPage.value + 1
})

const endItem = computed(() => {
  return Math.min(currentPage.value * perPage.value, displayTotal.value)
})

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxPages = displayLastPage.value
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(maxPages, start + 4)
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const handlePageChange = async (page: number) => {
  if (isClientPaginated.value) {
    currentPage.value = page
  } else {
    await changePage(page)
  }
}

const openAddForm = () => {
  editingProduct.value = null
  activeView.value = 'form'
}

const openEditForm = (product: AdminProductItem) => {
  editingProduct.value = product
  activeView.value = 'form'
}

const editingProductData = computed<Partial<ProductFormDataPayload>>(() => {
  if (!editingProduct.value) return {}
  const p = editingProduct.value
  return {
    id: p.id,
    name_ar: p.name_ar || p.name,
    name_en: p.name_en || '',
    description_ar: p.description_ar || p.description,
    description_en: p.description_en || '',
    category_id: p.category_id || '',
    sub_category_id: p.sub_category_id || '',
    sub_sub_category_id: p.sub_sub_category_id || '',
    brand_id: p.brand_id || '',
    unit_price: p.unit_price,
    purchase_price: p.purchase_price || 0,
    minimum_order_qty: p.minimum_order_qty || 1,
    current_stock: p.current_stock || 0,
    discount: p.discount || 0,
    discount_type: p.discount_type || 'flat',
    discount_start_date: p.discount_start_date || '',
    discount_end_date: p.discount_end_date || '',
    colors_active: Boolean(p.colors_active),
    colors: p.colors || []
  }
})

const handleDelete = async (id: string | number) => {
  if (confirm('هل أنت متأكد من حذف هذا المنتج نهائياً من النظام؟')) {
    await deleteProduct(id)
  }
}

const handleFormSubmit = async (payload: ProductFormDataPayload) => {
  const isEdit = Boolean(editingProduct.value)
  const productId = editingProduct.value?.id
  const success = await submitForm(payload, isEdit, productId)
  if (success) {
    activeView.value = 'list'
  }
}
</script>
