<template>
  <div class="space-y-6">
    <!-- HEADER & VIEW CONTROLLER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">إدارة العلامات التجارية (Admin Brands CRUD)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ activeView === 'list' ? 'إدارة واستعراض شعارات وعلامات المتجر التجارية مع نظام الصفحات.' : (editingBrand ? 'تعديل بيانات البراند المحدد.' : 'إضافة براند جديد كـ FormData.') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <button 
          v-if="activeView === 'list'"
          @click="openAddForm"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>إضافة براند جديد</span>
        </button>

        <button 
          v-else
          @click="activeView = 'list'"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>العودة لقائمة البراندات</span>
        </button>
      </div>
    </div>

    <!-- VIEW 1: BRANDS LIST TABLE WITH PAGINATION -->
    <div v-if="activeView === 'list'" class="space-y-6">
      
      <!-- Toolbar: Live Search & Refresh -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="w-full md:w-96">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="ابحث باسم العلامة (searchValue)..."
            @input="onSearchInput"
          >
            <template #icon>
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </template>
          </BaseInput>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end">
          <span class="hidden sm:block text-xs font-extrabold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            إجمالي العلامات: {{ displayTotal }}
          </span>

          <button 
            @click="loadBrands(currentPage)" 
            :disabled="isLoading"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>تحديث القائمة</span>
          </button>
        </div>
      </div>

      <!-- ERROR MESSAGE -->
      <div v-if="errorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3">
        <svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        <span>{{ errorMessage }}</span>
      </div>

      <!-- BRANDS TABLE -->
      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        <!-- Loading Skeleton State -->
        <div v-if="isLoading" class="p-6 space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
            <div class="w-12 h-12 bg-slate-200 rounded-2xl animate-pulse shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <div class="h-3 bg-slate-100 rounded w-1/6 animate-pulse"></div>
            </div>
            <div class="w-20 h-6 bg-slate-100 rounded-lg animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredBrands.length === 0" class="p-12 text-center space-y-3">
          <svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          <p class="text-sm font-extrabold text-slate-700">لم يتم العثور على أي علامة تجارية.</p>
          <button @click="openAddForm" class="px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs">
            إضافة أول براند
          </button>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-x-auto w-full">
          <table class="w-full text-right text-sm whitespace-nowrap">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th class="px-6 py-4 font-bold">شعار البراند (Logo)</th>
                <th class="px-6 py-4 font-bold">اسم العلامة التجارية (الرئيسي واللغات)</th>
                <th class="px-6 py-4 font-bold text-center">اللغات المدعومة</th>
                <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100/80">
              <tr v-for="brand in paginatedBrands" :key="brand.id" class="hover:bg-slate-50/50 transition-colors">
                <!-- Image / Logo -->
                <td class="px-6 py-4">
                  <div class="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 p-1">
                    <img 
                      v-if="brand.image || brand.logo" 
                      :src="brand.image || brand.logo" 
                      class="w-full h-full object-contain"
                      alt="Brand Logo"
                    />
                    <svg v-else class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  </div>
                </td>

                <!-- Name & Languages -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-extrabold text-[#0B0E28] text-base">{{ brand.name }}</span>
                    <span v-if="brand.name_en" class="text-xs text-slate-400 font-medium" dir="ltr">en: {{ brand.name_en }}</span>
                  </div>
                </td>

                <!-- Supported Languages Badge -->
                <td class="px-6 py-4 text-center">
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 text-slate-700 font-extrabold text-xs">
                    <span>AR</span>
                    <span class="text-slate-300">|</span>
                    <span>EN</span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <button 
                      @click="openEditForm(brand)"
                      class="w-9 h-9 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="تعديل البراند"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </button>

                    <button 
                      @click="handleDelete(brand.id)"
                      class="w-9 h-9 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                      title="حذف البراند"
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
        <div v-if="!isLoading && filteredBrands.length > 0" class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div>
            عرض العلامات التجارية من {{ startItem }} إلى {{ endItem }} (إجمالي {{ displayTotal }} علامة)
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

    <!-- VIEW 2: FORM VIEW (ADD / EDIT) -->
    <div v-else-if="activeView === 'form'">
      <BrandFormAdvanced 
        :initial-data="editingBrandData"
        :is-edit-mode="Boolean(editingBrand)"
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
import BrandFormAdvanced from '~/components/dashboard/BrandFormAdvanced.vue'
import { useAdminBrands } from '~/composables/useAdminBrands'
import type { AdminBrandItem, BrandFormDataPayload } from '~/services/adminBrandsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إدارة العلامات التجارية | لوحة التحكم'
})

const { 
  brands, 
  isLoading, 
  isSubmitting, 
  errorMessage, 
  searchQuery, 
  currentPage, 
  lastPage, 
  perPage, 
  totalBrands, 
  fetchBrands, 
  changePage, 
  deleteBrand, 
  submitForm 
} = useAdminBrands()

const activeView = ref<'list' | 'form'>('list')
const editingBrand = ref<AdminBrandItem | null>(null)
let searchDebounceTimeout: any = null

const loadBrands = async (page: number = 1) => {
  await fetchBrands(searchQuery.value, page, perPage.value)
}

onMounted(() => {
  loadBrands(1)
})

const onSearchInput = () => {
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(() => {
    fetchBrands(searchQuery.value, 1, perPage.value)
  }, 400)
}

const filteredBrands = computed(() => {
  if (!searchQuery.value.trim()) return brands.value
  const query = searchQuery.value.toLowerCase()
  return brands.value.filter(b => 
    b.name.toLowerCase().includes(query) || 
    (b.name_en && b.name_en.toLowerCase().includes(query))
  )
})

// Client-side fallback pagination if backend returns unpaginated list
const isClientPaginated = computed(() => filteredBrands.value.length > perPage.value)

const displayTotal = computed(() => {
  if (isClientPaginated.value) return filteredBrands.value.length
  return totalBrands.value || filteredBrands.value.length
})

const displayLastPage = computed(() => {
  if (isClientPaginated.value) return Math.ceil(filteredBrands.value.length / perPage.value) || 1
  return lastPage.value || 1
})

const paginatedBrands = computed(() => {
  if (isClientPaginated.value) {
    const start = (currentPage.value - 1) * perPage.value
    return filteredBrands.value.slice(start, start + perPage.value)
  }
  return filteredBrands.value
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
  editingBrand.value = null
  activeView.value = 'form'
}

const openEditForm = (brand: AdminBrandItem) => {
  editingBrand.value = brand
  activeView.value = 'form'
}

const editingBrandData = computed<Partial<BrandFormDataPayload & { existingImage?: string }>>(() => {
  if (!editingBrand.value) return {}
  const b = editingBrand.value
  return {
    id: b.id,
    name_ar: b.name_ar || b.name,
    name_en: b.name_en || '',
    existingImage: b.image || b.logo
  }
})

const handleDelete = async (id: string | number) => {
  if (confirm('هل أنت متأكد من حذف هذه العلامة التجارية نهائياً من النظام؟')) {
    const ok = await deleteBrand(id)
    if (ok) {
      await fetchBrands(searchQuery.value, currentPage.value, perPage.value)
    }
  }
}

const handleFormSubmit = async (payload: BrandFormDataPayload) => {
  const isEdit = Boolean(editingBrand.value)
  const brandId = editingBrand.value?.id
  const success = await submitForm(payload, isEdit, brandId)
  if (success) {
    editingBrand.value = null
    activeView.value = 'list'
    await fetchBrands(searchQuery.value, currentPage.value, perPage.value)
  }
}
</script>
