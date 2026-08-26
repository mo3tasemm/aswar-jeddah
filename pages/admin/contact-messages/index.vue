<template>
  <div class="space-y-6" :dir="adminDir">
    
    <!-- 1. Header & Actions (Matching Orders Page Style) -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0">
            <i class="fa-solid fa-inbox"></i>
          </div>
          <div>
            <div class="flex items-center gap-2.5">
              <h1 class="text-2xl font-black text-slate-900">{{ t('admin.contact_messages.title') }}</h1>
              <span v-if="!isLoading" class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">
                {{ totalMessages }} {{ t('admin.contact_messages.total_messages') }}
              </span>
              <span 
                v-if="unreadCount > 0 && !isLoading" 
                class="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse"
              >
                {{ unreadCount }} {{ t('admin.contact_messages.unread') }}
              </span>
            </div>
            <p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {{ t('admin.contact_messages.subtitle') }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Settings Link -->
        <NuxtLink 
          to="/admin/contact-settings" 
          class="p-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <i class="fa-solid fa-sliders text-xs text-amber-500"></i>
          <span>{{ t('admin.sidebar.contact_settings') }}</span>
        </NuxtLink>

        <!-- Bulk Delete Action -->
        <button 
          v-if="selectedMessageIds.length > 0"
          @click="bulkDeleteMessages"
          type="button"
          class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
        >
          <i class="fa-solid fa-trash-can text-xs"></i>
          <span>{{ t('admin.contact_messages.bulk_delete') }} ({{ selectedMessageIds.length }})</span>
        </button>

        <!-- Refresh Button -->
        <button 
          @click="loadMessages(currentPage)"
          :disabled="isLoading"
          class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <svg class="w-4 h-4" :class="{ 'animate-spin': isLoading }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ t('admin.common.refresh') }}</span>
        </button>
      </div>
    </div>

    <!-- 2. Quick Status Filter Pills -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        v-for="pill in statusPills"
        :key="pill.value"
        @click="handleStatusFilterChange(pill.value)"
        class="px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border"
        :class="statusFilter === pill.value 
          ? 'bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-sm' 
          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'"
      >
        <span>{{ pill.label }}</span>
        <span 
          v-if="pill.count !== undefined"
          class="text-[10px] px-1.5 py-0.5 rounded-full font-mono font-black"
          :class="statusFilter === pill.value 
            ? (pill.value === 'unread' ? 'bg-rose-500 text-white' : 'bg-amber-400/20 text-amber-300')
            : (pill.value === 'unread' && unreadCount > 0 ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-600')"
        >
          {{ pill.count }}
        </span>
      </button>
    </div>

    <!-- 3. Filters & Search Toolbar -->
    <div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:flex-1">
        <BaseInput 
          v-model="searchQuery" 
          :placeholder="t('admin.contact_messages.search_placeholder')" 
          @input="handleSearchInput"
        >
          <template #icon>
            <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </template>
        </BaseInput>
      </div>

      <div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto">
        <!-- Status Dropdown -->
        <div class="w-full sm:w-48">
          <label class="block text-[11px] font-black text-slate-500 mb-1">{{ t('admin.contact_messages.status') }}</label>
          <select
            v-model="statusFilter"
            @change="handleFilterChange"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
          >
            <option value="all">{{ t('admin.contact_messages.all_messages') }}</option>
            <option value="unread">{{ t('admin.contact_messages.unread') }}</option>
            <option value="read">{{ t('admin.contact_messages.read') }}</option>
          </select>
        </div>

        <!-- Reset Button -->
        <div v-if="statusFilter !== 'all' || searchQuery" class="self-end pb-0.5">
          <button
            @click="resetFilters"
            class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"
            :title="t('admin.common.reset_filter')"
          >
            {{ t('admin.common.reset_filter') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 4. Messages Table Container -->
    <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
        <svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <span class="text-xs font-bold">{{ t('admin.common.loading') }}</span>
      </div>

      <!-- Empty State -->
      <div v-else-if="!filteredMessages || filteredMessages.length === 0" class="p-16 text-center space-y-3">
        <div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto">
          <i class="fa-solid fa-envelope-open text-2xl"></i>
        </div>
        <h3 class="text-base font-black text-slate-700">{{ t('admin.common.no_data') }}</h3>
        <p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">
          {{ t('admin.contact_messages.no_messages') }}
        </p>
        <button 
          v-if="statusFilter !== 'all' || searchQuery"
          @click="resetFilters" 
          class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
        >
          {{ t('admin.contact_messages.all_messages') }}
        </button>
      </div>

      <!-- Messages Table -->
      <div v-else class="overflow-x-auto w-full">
        <table class="w-full text-start text-sm whitespace-nowrap">
          <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-xs">
            <tr>
              <th class="px-4 py-4 w-10 text-center">
                <input 
                  type="checkbox" 
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
              </th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.contact_messages.sender_name') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.contact_messages.subject') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.contact_messages.sent_date') }}</th>
              <th class="px-6 py-4 font-bold text-start">{{ t('admin.contact_messages.status') }}</th>
              <th class="px-6 py-4 font-bold text-center">{{ t('admin.common.actions') }}</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-slate-100">
            <tr 
              v-for="msg in filteredMessages" 
              :key="msg.id" 
              @click="navigateToDetail(msg.id)"
              class="hover:bg-amber-50/20 transition-colors group cursor-pointer"
              :class="!msg.is_read ? 'bg-amber-50/10 font-bold' : ''"
            >
              <!-- Checkbox -->
              <td class="px-4 py-4 text-center" @click.stop>
                <input 
                  type="checkbox" 
                  :value="msg.id"
                  v-model="selectedMessageIds"
                  class="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"
                />
              </td>

              <!-- Sender Info -->
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div 
                    class="w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 transition-transform group-hover:scale-105"
                    :class="!msg.is_read ? 'bg-amber-400 text-[#0B0E28] shadow-sm' : 'bg-slate-100 text-slate-600'"
                  >
                    {{ (msg.name || 'ع').charAt(0).toUpperCase() }}
                  </div>
                  <div class="flex flex-col text-start">
                    <span class="font-black text-slate-900 group-hover:text-amber-600 transition-colors text-sm">
                      {{ msg.name }}
                    </span>
                    <span class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">
                      {{ msg.email }}
                    </span>
                    <span v-if="msg.phone" class="text-[11px] text-slate-400 font-mono" dir="ltr">
                      {{ msg.phone }}
                    </span>
                  </div>
                </div>
              </td>

              <!-- Subject & Snippet -->
              <td class="px-6 py-4 max-w-xs sm:max-w-md">
                <div class="flex flex-col text-start space-y-0.5">
                  <span class="font-bold text-slate-900 text-sm truncate group-hover:text-amber-700 transition-colors">
                    {{ msg.subject }}
                  </span>
                  <p class="text-xs text-slate-400 truncate max-w-sm font-normal">
                    {{ msg.message }}
                  </p>
                </div>
              </td>

              <!-- Date & Time -->
              <td class="px-6 py-4 text-xs font-bold text-slate-600 text-start">
                <div>{{ formatDate(msg.created_at) }}</div>
                <div class="text-[11px] text-slate-400 font-mono mt-0.5">{{ formatTime(msg.created_at) }}</div>
              </td>

              <!-- Read Status Badge -->
              <td class="px-6 py-4 text-start">
                <span 
                  v-if="!msg.is_read"
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs"
                >
                  <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span>{{ t('admin.contact_messages.unread') }}</span>
                </span>
                <span 
                  v-else
                  class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/60"
                >
                  <i class="fa-solid fa-check text-[10px] text-slate-400"></i>
                  <span>{{ t('admin.contact_messages.read') }}</span>
                </span>
              </td>

              <!-- Action Buttons -->
              <td class="px-6 py-4 text-center" @click.stop>
                <div class="flex items-center justify-center gap-2">
                  <!-- View / Details Button -->
                  <NuxtLink 
                    :to="`/admin/contact-messages/${msg.id}`" 
                    class="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-[#0B0E28] text-slate-700 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    :title="t('admin.common.details')"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>{{ t('admin.common.details') }}</span>
                  </NuxtLink>

                  <!-- Delete Button -->
                  <button 
                    @click="deleteMessage(msg.id)"
                    type="button"
                    class="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                    :title="t('admin.common.delete')"
                  >
                    <i class="fa-solid fa-trash-can text-xs"></i>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination (Matching Orders Pagination Style) -->
      <div v-if="lastPage > 1" class="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span class="text-xs text-slate-500 font-bold">
          {{ t('admin.common.showing') || 'عرض الصفحة' }} {{ currentPage }} {{ t('admin.common.of') || 'من' }} {{ lastPage }}
        </span>

        <div class="flex items-center gap-1.5">
          <!-- Previous Button -->
          <button
            @click="loadMessages(currentPage - 1)"
            :disabled="currentPage <= 1 || isLoading"
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            {{ t('admin.common.previous') || 'السابق' }}
          </button>

          <!-- Page Numbers -->
          <button
            v-for="p in visiblePages"
            :key="p"
            @click="loadMessages(p)"
            class="w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer"
            :class="currentPage === p 
              ? 'bg-[#0B0E28] text-amber-400 shadow-sm' 
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'"
          >
            {{ p }}
          </button>

          <!-- Next Button -->
          <button
            @click="loadMessages(currentPage + 1)"
            :disabled="currentPage >= lastPage || isLoading"
            class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
          >
            {{ t('admin.common.next') || 'التالي' }}
          </button>
        </div>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import { useContact } from '~/composables/useContact'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const { adminDir, t, adminLanguage } = useAdminLanguage()
const {
  adminMessages,
  totalMessages,
  unreadCount,
  isLoading,
  currentPage,
  lastPage,
  searchFilter,
  statusFilter,
  selectedMessageIds,
  fetchAdminMessages,
  deleteMessage,
  bulkDeleteMessages
} = useContact()

const searchQuery = ref('')
let searchDebounceTimeout: any = null

useHead({
  title: computed(() => `${t('admin.contact_messages.title')} | ${t('admin.sidebar.panel_title') || 'لوحة تحكم أسوار جدة'}`)
})

onMounted(() => {
  loadMessages(1)
})

const loadMessages = (page = 1) => {
  fetchAdminMessages(page)
}

// Quick status filter pills
const statusPills = computed(() => [
  { value: 'all', label: t('admin.contact_messages.all_messages'), count: totalMessages.value },
  { value: 'unread', label: t('admin.contact_messages.unread'), count: unreadCount.value },
  { value: 'read', label: t('admin.contact_messages.read') }
])

const handleStatusFilterChange = (val: 'all' | 'unread' | 'read') => {
  statusFilter.value = val
  loadMessages(1)
}

const handleFilterChange = () => {
  loadMessages(1)
}

const handleSearchInput = () => {
  clearTimeout(searchDebounceTimeout)
  searchDebounceTimeout = setTimeout(() => {
    searchFilter.value = searchQuery.value
    loadMessages(1)
  }, 350)
}

const resetFilters = () => {
  searchQuery.value = ''
  searchFilter.value = ''
  statusFilter.value = 'all'
  loadMessages(1)
}

// Client-side instant filter fallback
const filteredMessages = computed(() => {
  let list = adminMessages.value || []
  if (statusFilter.value === 'unread') {
    list = list.filter(m => !m.is_read)
  } else if (statusFilter.value === 'read') {
    list = list.filter(m => m.is_read)
  }

  if (searchQuery.value && searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim()
    list = list.filter(m => 
      (m.name && m.name.toLowerCase().includes(q)) ||
      (m.email && m.email.toLowerCase().includes(q)) ||
      (m.subject && m.subject.toLowerCase().includes(q)) ||
      (m.phone && m.phone.includes(q))
    )
  }
  return list
})

const isAllSelected = computed(() => {
  return filteredMessages.value.length > 0 && 
    filteredMessages.value.every(m => selectedMessageIds.value.includes(m.id))
})

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedMessageIds.value = []
  } else {
    selectedMessageIds.value = filteredMessages.value.map(m => m.id)
  }
}

const navigateToDetail = (id: number | string) => {
  navigateTo(`/admin/contact-messages/${id}`)
}

const visiblePages = computed(() => {
  const pages: number[] = []
  const maxButtons = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2))
  let end = Math.min(lastPage.value, start + maxButtons - 1)

  if (end - start + 1 < maxButtons) {
    start = Math.max(1, end - maxButtons + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const formatDate = (dateStr?: string | null) => {
  if (!dateStr) return '-'
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return String(dateStr).split('T')[0] || dateStr
    const locale = adminLanguage.value === 'en' ? 'en-US' : 'ar-SA'
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(dateStr)
  }
}

const formatTime = (dateStr?: string | null) => {
  if (!dateStr) return ''
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return ''
    const locale = adminLanguage.value === 'en' ? 'en-US' : 'ar-SA'
    return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}
</script>
