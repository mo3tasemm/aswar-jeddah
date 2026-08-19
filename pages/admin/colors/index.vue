<template>
  <div class="space-y-6">
    <!-- 1. HEADER & VIEW CONTROLLER -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">{{ t('admin.colors.title') }}</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ activeView === 'list' ? t('admin.colors.subtitle') : (editingColor ? t('admin.colors.edit_color') : t('admin.colors.add_color')) }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          v-if="activeView === 'list'"
          to="/admin/colors/create"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>{{ t('admin.colors.add_color') }}</span>
        </NuxtLink>

        <button 
          v-else
          @click="activeView = 'list'"
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          <span>{{ t('admin.common.back') }}</span>
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
          <span class="text-xs font-bold text-slate-400 block">{{ t('admin.common.total') }}</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ displayTotal }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. VIEW 1: COLORS LIST TABLE WITH PAGINATION -->
    <div v-if="activeView === 'list'" class="space-y-6">
      
      <!-- Toolbar: Live Search & Refresh -->
      <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div class="w-full md:w-96">
          <BaseInput 
            v-model="searchQuery" 
            :placeholder="t('admin.common.search_placeholder')"
            @input="onSearchInput"
          >
            <template #icon>
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </template>
          </BaseInput>
        </div>

        <div class="flex items-center gap-3 w-full md:w-auto justify-end">
          <button 
            @click="loadColors(currentPage)" 
            :disabled="isLoading"
            class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50 transition-colors"
          >
            <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            <span>{{ t('admin.common.refresh') }}</span>
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
        
        <!-- Skeleton Loader State -->
        <div v-if="isLoading" class="p-6 space-y-4">
          <div v-for="i in 5" :key="i" class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
            <div class="w-10 h-10 bg-slate-200 rounded-2xl animate-pulse shrink-0"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
              <div class="h-3 bg-slate-100 rounded w-1/6 animate-pulse"></div>
            </div>
            <div class="w-16 h-6 bg-slate-200 rounded-md animate-pulse"></div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else-if="filteredColors.length === 0" class="p-12 text-center space-y-3">
          <svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" /></svg>
          <p class="text-sm font-extrabold text-slate-700">{{ t('admin.common.no_data') }}</p>
          <NuxtLink to="/admin/colors/create" class="px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs inline-block cursor-pointer">
            {{ t('admin.colors.add_color') }}
          </NuxtLink>
        </div>

        <!-- Table Content -->
        <div v-else class="overflow-x-auto w-full">
          <table class="w-full text-start text-sm whitespace-nowrap">
            <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
              <tr>
                <th class="px-6 py-4 font-bold text-start">{{ t('admin.colors.preview') }}</th>
                <th class="px-6 py-4 font-bold text-start">{{ t('admin.colors.color_name') }}</th>
                <th class="px-6 py-4 font-bold text-start">{{ t('admin.colors.hex_code') }}</th>
                <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100/80">
              <tr v-for="color in paginatedColors" :key="color.id" class="hover:bg-slate-50/50 transition-colors">
                <!-- Visual Preview -->
                <td class="px-6 py-4">
                  <div 
                    class="w-9 h-9 rounded-xl border border-slate-200 shadow-xs flex items-center justify-center shrink-0"
                    :style="{ backgroundColor: color.code || '#cbd5e1' }"
                  ></div>
                </td>

                <!-- Name -->
                <td class="px-6 py-4">
                  <span class="font-extrabold text-[#0B0E28] text-base">{{ color.name }}</span>
                </td>

                <!-- Code -->
                <td class="px-6 py-4 text-start font-mono text-xs font-bold text-slate-600">
                  {{ color.code }}
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <NuxtLink 
                      :to="`/admin/colors/${color.id}`"
                      class="w-8 h-8 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                      :title="t('admin.common.edit')"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </NuxtLink>

                    <button 
                      @click="handleDelete(color.id)"
                      class="w-8 h-8 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                      :title="t('admin.common.delete')"
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
            {{ startItem }} - {{ endItem }} ({{ t('admin.common.total') }}: {{ displayTotal }})
          </div>

          <div class="flex items-center gap-1.5">
            <!-- Previous Button -->
            <button 
              @click="handlePageChange(currentPage - 1)" 
              :disabled="currentPage <= 1 || isLoading"
              class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
              <span>{{ t('admin.common.back') }}</span>
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
              <span>{{ t('admin.common.view') }}</span>
              <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
          </div>
        </div>

      </div>

    </div>

    <!-- VIEW 2: COLOR FORM VIEW (ADD / EDIT) -->
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
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { AdminColorItem, ColorFormDataPayload } from '~/services/adminColorsApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useAdminLanguage()

useHead({
  title: computed(() => `${t('admin.colors.title')} | ${t('admin.sidebar.panel_title')}`)
})

const { 
  colors, 
  isLoading, 
  isSubmitting, 
  errorMessage, 
  currentPage, 
  lastPage, 
  perPage, 
  totalColors, 
  fetchColors, 
  changePage, 
  deleteColor, 
  submitForm 
} = useAdminColors()

const activeView = ref<'list' | 'form'>('list')
const searchQuery = ref('')
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

const filteredColors = computed(() => colors.value)
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
  if (confirm(t('admin.common.confirm_delete'))) {
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
