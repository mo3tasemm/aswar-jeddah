<template>
  <div class="space-y-6">
    <!-- 1. HEADER & ACTIONS -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-900">{{ t('admin.categories.title') }}</h1>
        <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {{ t('admin.categories.subtitle') }}
        </p>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          to="/admin/categories/create"
          class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
          <span>{{ t('admin.categories.add_category') }}</span>
        </NuxtLink>
      </div>
    </div>

    <!-- 2. DYNAMIC STATS CARDS -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <!-- Total Categories Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">{{ t('admin.common.total') }}</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ totalCategoriesCount }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>

      <!-- Main Categories Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">{{ t('admin.categories.no_parent') }}</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ mainCategoriesCount }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>

      <!-- Subcategories Card -->
      <div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
        <div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0">
          <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
        </div>
        <div>
          <span class="text-xs font-bold text-slate-400 block">{{ t('admin.categories.subcategories') }}</span>
          <div class="flex items-center gap-2">
            <span v-if="!isLoading" class="text-2xl font-black text-slate-900">{{ subCategoriesCount }}</span>
            <div v-else class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. TOOLBAR: Search & Refresh -->
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
          @click="loadCategories" 
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

    <!-- 4. CATEGORIES TABLE WITH EXPANDABLE ACCORDION FOR SUBCATEGORIES -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">
      
      <!-- Loading Skeleton State -->
      <div v-if="isLoading && categories.length === 0" class="p-6 space-y-4">
        <div v-for="i in 5" :key="i" class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0">
          <div class="w-12 h-12 bg-slate-200 rounded-xl animate-pulse shrink-0"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div>
            <div class="h-3 bg-slate-100 rounded w-1/6 animate-pulse"></div>
          </div>
          <div class="w-20 h-6 bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else-if="mainCategories.length === 0" class="p-12 text-center space-y-3">
        <svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        <p class="text-sm font-extrabold text-slate-700">{{ t('admin.common.no_data') }}</p>
        <NuxtLink to="/admin/categories/create" class="px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs inline-block cursor-pointer">
          {{ t('admin.categories.add_category') }}
        </NuxtLink>
      </div>

      <!-- Table Content -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-4 py-4 w-12 text-center">{{ t('admin.common.view') }}</th>
              <th class="px-4 py-4 font-bold text-start">{{ t('admin.common.image') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.categories.category_name') }}</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.categories.subcategories') }}</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.categories.order') }}</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <template v-for="cat in mainCategories" :key="cat.id">
              <!-- MAIN CATEGORY ROW -->
              <tr 
                class="hover:bg-slate-50/70 transition-colors group"
                :class="{ 'bg-amber-50/30': isExpanded(cat.id) }"
              >
                <!-- Expand / Collapse Action -->
                <td class="px-4 py-4 text-center">
                  <button 
                    @click="toggleExpand(cat.id)"
                    class="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-amber-600 hover:bg-amber-100/50 transition-all cursor-pointer"
                    :title="isExpanded(cat.id) ? t('admin.common.back') : t('admin.common.view')"
                  >
                    <svg 
                      class="w-4 h-4 transition-transform duration-300 rtl:-scale-x-100" 
                      :class="{ 'rotate-90 text-amber-600': isExpanded(cat.id) }"
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      stroke-width="2.5"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>

                <!-- Image -->
                <td class="px-4 py-4">
                  <div class="w-12 h-12 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0 shadow-sm">
                    <img 
                      v-if="cat.image || cat.icon" 
                      :src="cat.image || cat.icon" 
                      class="w-full h-full object-cover"
                      alt="Category Image"
                    />
                    <svg v-else class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                </td>

                <!-- Name & Languages -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <div class="flex items-center gap-2">
                      <span class="font-extrabold text-[#0B0E28] text-base">{{ cat.name_ar || cat.name }}</span>
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100">
                        {{ t('admin.categories.no_parent') }}
                      </span>
                    </div>
                    <span v-if="cat.name_en" class="text-xs text-slate-400 font-medium mt-0.5" dir="ltr">en: {{ cat.name_en }}</span>
                  </div>
                </td>

                <!-- Subcategories Count / Badge -->
                <td class="px-6 py-4 text-center">
                  <button 
                    @click="toggleExpand(cat.id)"
                    class="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-black transition-colors cursor-pointer"
                    :class="getSubcategories(cat.id).length > 0 ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-100' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                    <span>{{ getSubcategories(cat.id).length }}</span>
                  </button>
                </td>

                <!-- Priority -->
                <td class="px-6 py-4 text-center">
                  <span class="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs">
                    {{ cat.priority !== undefined ? cat.priority : (cat.position || 1) }}
                  </span>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Add Subcategory Link Button -->
                    <NuxtLink 
                      :to="`/admin/categories/create?parent_id=${cat.id}&parent_name=${encodeURIComponent(cat.name_ar || cat.name)}`"
                      class="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-400 text-amber-800 hover:text-[#0B0E28] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer border border-amber-200"
                      :title="t('admin.categories.add_category')"
                    >
                      <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                      <span>+ {{ t('admin.categories.subcategories') }}</span>
                    </NuxtLink>

                    <!-- Edit Main Category Link Button -->
                    <NuxtLink 
                      :to="`/admin/categories/${cat.id}`"
                      class="w-8 h-8 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                      :title="t('admin.common.edit')"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    </NuxtLink>

                    <!-- Delete Main Category -->
                    <button 
                      @click="handleDelete(cat.id)"
                      class="w-8 h-8 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                      :title="t('admin.common.delete')"
                    >
                      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </td>
              </tr>

              <!-- NESTED SUBCATEGORIES ACCORDION / CONTAINER -->
              <tr v-if="isExpanded(cat.id)" class="bg-slate-50/50">
                <td colspan="6" class="p-0 border-y border-slate-100">
                  <div class="px-6 py-4 space-y-3">
                    
                    <!-- Subcategories Header -->
                    <div class="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
                      <div class="flex items-center gap-2 text-xs font-black text-slate-700">
                        <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
                        <span>{{ t('admin.categories.subcategories') }}: "{{ cat.name_ar || cat.name }}"</span>
                      </div>

                      <NuxtLink 
                        :to="`/admin/categories/create?parent_id=${cat.id}&parent_name=${encodeURIComponent(cat.name_ar || cat.name)}`"
                        class="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                        <span>{{ t('admin.categories.add_category') }}</span>
                      </NuxtLink>
                    </div>

                    <!-- Loading Subcategories Spinner -->
                    <div v-if="loadingSubcategoriesMap[cat.id]" class="py-6 text-center text-xs font-bold text-indigo-600 flex items-center justify-center gap-2">
                      <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                      <span>{{ t('admin.common.loading') }}</span>
                    </div>

                    <!-- Empty Subcategories Notice -->
                    <div 
                      v-else-if="getSubcategories(cat.id).length === 0" 
                      class="py-6 text-center bg-white rounded-2xl border border-slate-200/60 p-4 space-y-2"
                    >
                      <p class="text-xs font-bold text-slate-500">{{ t('admin.common.no_data') }}</p>
                      <NuxtLink 
                        :to="`/admin/categories/create?parent_id=${cat.id}&parent_name=${encodeURIComponent(cat.name_ar || cat.name)}`"
                        class="px-4 py-1.5 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs hover:bg-amber-500 cursor-pointer transition-colors inline-flex items-center gap-1.5"
                      >
                        <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                        <span>{{ t('admin.categories.add_category') }}</span>
                      </NuxtLink>
                    </div>

                    <!-- Subcategories List Items -->
                    <div v-else class="space-y-2">
                      <div 
                        v-for="sub in getSubcategories(cat.id)" 
                        :key="sub.id" 
                        class="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between gap-4 hover:border-indigo-300 transition-colors"
                      >
                        <!-- Left: Branch Indicator & Image & Names -->
                        <div class="flex items-center gap-3 min-w-0">
                          <span class="text-slate-300 font-bold text-base select-none mr-1">↳</span>
                          
                          <div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                            <img 
                              v-if="sub.image || sub.icon" 
                              :src="sub.image || sub.icon" 
                              class="w-full h-full object-cover"
                              alt="Subcategory Image"
                            />
                            <svg v-else class="w-4 h-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          </div>

                          <div class="flex flex-col min-w-0">
                            <div class="flex items-center gap-2">
                              <span class="font-extrabold text-[#0B0E28] text-sm truncate">{{ sub.name_ar || sub.name }}</span>
                              <span class="px-2 py-0.5 rounded-md text-[9px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                                {{ t('admin.categories.subcategories') }}
                              </span>
                            </div>
                            <span v-if="sub.name_en" class="text-[11px] text-slate-400 font-medium" dir="ltr">en: {{ sub.name_en }}</span>
                          </div>
                        </div>

                        <!-- Right: Actions for Subcategory -->
                        <div class="flex items-center gap-2 shrink-0">
                          <span v-if="sub.priority" class="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold">
                            {{ t('admin.categories.order') }}: {{ sub.priority }}
                          </span>

                          <!-- Edit Subcategory Link Button -->
                          <NuxtLink 
                            :to="`/admin/categories/${sub.id}`"
                            class="w-8 h-8 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"
                            :title="t('admin.common.edit')"
                          >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                          </NuxtLink>

                          <!-- Delete Subcategory Button -->
                          <button 
                            @click="handleDelete(sub.id, cat.id)"
                            class="w-8 h-8 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" 
                            :title="t('admin.common.delete')"
                          >
                            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>

                      </div>
                    </div>

                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import { useAdminCategories } from '~/composables/useAdminCategories'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { AdminCategoryItem } from '~/services/adminCategoriesApiService'

definePageMeta({
  layout: 'dashboard'
})

const { t } = useAdminLanguage()

useHead({
  title: computed(() => `${t('admin.categories.title')} | ${t('admin.sidebar.panel_title')}`)
})

const { 
  categories,
  mainCategories,
  mainCategoriesCount,
  subCategoriesCount,
  totalCategoriesCount,
  isLoading, 
  errorMessage, 
  searchQuery, 
  subcategoriesMap,
  loadingSubcategoriesMap,
  toggleExpand,
  isExpanded,
  fetchCategories, 
  deleteCategory
} = useAdminCategories()

let searchDebounceTimeout: any = null

const getSubcategories = (parentId: string | number): AdminCategoryItem[] => {
  if (subcategoriesMap.value[parentId] && subcategoriesMap.value[parentId].length > 0) {
    return subcategoriesMap.value[parentId]
  }
  const parent = categories.value.find(c => String(c.id) === String(parentId))
  return parent?.subCategories || []
}

const loadCategories = async () => {
  await fetchCategories()
}

onMounted(() => {
  loadCategories()
})

const onSearchInput = () => {
  if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(() => {
    fetchCategories(searchQuery.value)
  }, 400)
}

const handleDelete = async (id: string | number, parentId?: string | number) => {
  if (confirm(t('admin.categories.delete_category_confirm'))) {
    await deleteCategory(id, parentId)
  }
}
</script>

<style scoped>
.shadow-xs {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}
</style>
