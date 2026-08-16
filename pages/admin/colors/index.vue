<template>
  <div class="space-y-6">
    <!-- 1. HEADER & VIEW CONTROLLER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">إدارة الألوان (Admin Colors CRUD)</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ activeView === 'list' ? 'إدارة وتخصيص باليت ألوان المنتجات وخاماتها في المتجر مع نظام الصفحات.' : (editingColor ? 'تعديل بيانات وخيارات اللون المحدد.' : 'إضافة لون جديد كـ FormData.') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          v-if="activeView === 'list'"
          to="/admin/colors/create"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>إضافة لون جديد</span>
        </NuxtLink>

        <button 
          v-else
          @click="activeView = 'list'"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>العودة لقائمة الألوان</span>
        </button>
      </div>
    </div>

    <!-- 2. DYNAMIC STATS CARDS -->
    <div v-if="activeView === 'list'" class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Total Colors Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7" />
          </svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">إجمالي الألوان المسجلة</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ displayTotal }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>

      <!-- Hex Code Colors Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">ألوان أكواد (Hex Code)</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ codeColorsCount }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>

      <!-- Texture / Image Colors Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">ألوان بصور ونقوش (Image)</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ imageColorsCount }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- VIEW 1: COLORS LIST TABLE WITH PAGINATION -->
    <div v-if="activeView === 'list'" class="space-y-6">
      
      <!-- Toolbar: Live Search & Refresh -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="w-full md:w-96">
          <BaseInput 
            v-model="searchQuery" 
            placeholder="ابحث باسم اللون (searchValue)..."
            @input="onSearchInput"
          >
            <template #icon>
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </template>
          </BaseInput>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end">
          <span class="hidden sm:block text-xs font-extrabold text-slate-500 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
            إجمالي الألوان: {{ displayTotal }}
          </span>

          <button 
            @click="loadColors(currentPage)" 
            :disabled="isLoading"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50 transition-colors"
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

      <!-- COLORS TABLE -->
      <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
        
        <!-- Loading Skeleton State -->
        <div v-if="isLoading && colors.length === 0" class="p-6 space-y-4">
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
        <div v-else-if="filteredColors.length === 0" class="p-12 text-center space-y-3">
          <div class="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mx-auto">
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" />
            </svg>
          </div>
          <p class="text-sm font-extrabold text-slate-700">لم يتم العثور على أي ألوان.</p>
          <NuxtLink to="/admin/colors/create" class="px-5 py-2.5 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs inline-block">
            إضافة أول لون
          </NuxtLink>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-x-auto w-full">
          <table class="w-full text-right text-sm whitespace-nowrap">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th class="px-6 py-4 font-bold">المعاينة البصرية (Color Swatch)</th>
                <th class="px-6 py-4 font-bold">اسم اللون</th>
                <th class="px-6 py-4 font-bold text-center">نوع اللون</th>
                <th class="px-6 py-4 font-bold text-center">القيمة / الكود</th>
                <th class="px-6 py-4 font-bold text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100/80">
              <tr v-for="color in paginatedColors" :key="color.id" class="hover:bg-slate-50/60 transition-colors">
                
                <!-- Swatch / Visual Preview -->
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <!-- Case 1: Hex Code Swatch -->
                    <div 
                      v-if="color.color_type === 'code'"
                      class="w-11 h-11 rounded-2xl border-2 border-white shadow-md flex items-center justify-center shrink-0 ring-1 ring-slate-200/80 transition-transform hover:scale-110"
                      :style="{ backgroundColor: normalizeHex(color.code) }"
                      :title="color.code || '#000000'"
                    ></div>

                    <!-- Case 2: Image Swatch -->
                    <div 
                      v-else-if="color.color_type === 'image'"
                      class="w-11 h-11 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm transition-transform hover:scale-110"
                      :title="color.name"
                    >
                      <img 
                        v-if="color.image || color.image_full_url?.path" 
                        :src="color.image || color.image_full_url?.path" 
                        class="w-full h-full object-cover"
                        alt="Color Texture"
                      />
                      <svg v-else class="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    </div>
                  </div>
                </td>

                <!-- Color Name -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <span class="font-extrabold text-[#0B0E28] text-base">{{ color.name }}</span>
                    <span class="text-[11px] text-slate-400 font-medium">معرف اللون: #{{ color.id }}</span>
                  </div>
                </td>

                <!-- Type Badge -->
                <td class="px-6 py-4 text-center">
                  <span 
                    v-if="color.color_type === 'code'"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-amber-50 text-amber-800 border border-amber-200/80"
                  >
                    <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                    <span>كود لون (Hex)</span>
                  </span>

                  <span 
                    v-else
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black bg-indigo-50 text-indigo-800 border border-indigo-200/80"
                  >
                    <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>صورة / نقشة</span>
                  </span>
                </td>

                <!-- Value / Hex Code / Image Indicator -->
                <td class="px-6 py-4 text-center">
                  <div v-if="color.color_type === 'code'" class="inline-flex items-center gap-2">
                    <span class="font-mono font-bold text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-lg border border-slate-200 uppercase">
                      {{ normalizeHex(color.code) }}
                    </span>
                    <button 
                      @click="copyCode(normalizeHex(color.code))"
                      class="text-slate-400 hover:text-amber-600 transition-colors p-1"
                      title="نسخ كود اللون"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                    </button>
                  </div>

                  <div v-else class="inline-flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <span>ملف صورة</span>
                  </div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <NuxtLink 
                      :to="`/admin/colors/${color.id}`"
                      class="w-9 h-9 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                      title="تعديل اللون"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </NuxtLink>

                    <button 
                      @click="handleDelete(color.id)"
                      class="w-9 h-9 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                      title="حذف اللون"
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
        <div v-if="!isLoading && filteredColors.length > 0" class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500">
          <div>
            عرض الألوان من {{ startItem }} إلى {{ endItem }} (إجمالي {{ displayTotal }} لون)
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

    <!-- VIEW 2: FORM VIEW (INLINE ADD / EDIT FALLBACK) -->
    <div v-else-if="activeView === 'form'">
      <ColorFormAdvanced 
        :initial-data="editingColorData"
        :is-edit-mode="Boolean(editingColor)"
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
import ColorFormAdvanced from '~/components/dashboard/ColorFormAdvanced.vue'
import { useAdminColors } from '~/composables/useAdminColors'
import { useToast } from '~/composables/useToast'
import type { AdminColorItem, ColorFormDataPayload } from '~/services/adminColorsApiService'
import { normalizeHexCode } from '~/services/adminColorsApiService'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إدارة الألوان | لوحة التحكم'
})

const toast = useToast()

const {
  colors,
  isLoading,
  isSubmitting,
  errorMessage,
  searchQuery,
  currentPage,
  lastPage,
  perPage,
  totalColors,
  codeColorsCount,
  imageColorsCount,
  fetchColors,
  changePage,
  deleteColor,
  submitForm
} = useAdminColors()

const activeView = ref<'list' | 'form'>('list')
const editingColor = ref<AdminColorItem | null>(null)
let searchDebounceTimeout: any = null

const loadColors = async (page: number = 1) => {
  await fetchColors(searchQuery.value, page, perPage.value)
}

onMounted(() => {
  loadColors(1)
})

const onSearchInput = () => {
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(() => {
    fetchColors(searchQuery.value, 1, perPage.value)
  }, 400)
}

const normalizeHex = (code?: string) => normalizeHexCode(code)

const copyCode = (code: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code)
    toast.info('تم النسخ', `تم نسخ الكود ${code} للحافظة بنجاح.`)
  }
}

const filteredColors = computed(() => {
  if (!searchQuery.value.trim()) return colors.value
  const query = searchQuery.value.toLowerCase()
  return colors.value.filter(c => 
    c.name.toLowerCase().includes(query) || 
    (c.code && c.code.toLowerCase().includes(query))
  )
})

// Client-side fallback pagination if backend returns entire unpaginated array
const isClientPaginated = computed(() => filteredColors.value.length > perPage.value)

const displayTotal = computed(() => {
  if (isClientPaginated.value) return filteredColors.value.length
  return totalColors.value || filteredColors.value.length
})

const displayLastPage = computed(() => {
  if (isClientPaginated.value) return Math.ceil(filteredColors.value.length / perPage.value) || 1
  return lastPage.value || 1
})

const paginatedColors = computed(() => {
  if (isClientPaginated.value) {
    const start = (currentPage.value - 1) * perPage.value
    return filteredColors.value.slice(start, start + perPage.value)
  }
  return filteredColors.value
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

const editingColorData = computed<Partial<ColorFormDataPayload & { existingImage?: string }>>(() => {
  if (!editingColor.value) return {}
  const c = editingColor.value
  return {
    id: c.id,
    name: c.name,
    color_type: c.color_type,
    code: c.code,
    existingImage: c.image || c.image_full_url?.path
  }
})

const handleDelete = async (id: string | number) => {
  if (confirm('هل أنت متأكد من رغبتك في حذف هذا اللون نهائياً؟')) {
    const ok = await deleteColor(id)
    if (ok) {
      await fetchColors(searchQuery.value, currentPage.value, perPage.value)
    }
  }
}

const handleFormSubmit = async (payload: ColorFormDataPayload) => {
  const isEdit = Boolean(editingColor.value)
  const colorId = editingColor.value?.id
  const success = await submitForm(payload, isEdit, colorId)
  if (success) {
    editingColor.value = null
    activeView.value = 'list'
    await fetchColors(searchQuery.value, currentPage.value, perPage.value)
  }
}
</script>
