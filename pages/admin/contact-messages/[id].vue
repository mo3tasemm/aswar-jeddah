<template>
  <div class="space-y-6" :dir="adminDir">

    <!-- 1. Loading State -->
    <div v-if="isLoading" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
      <svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-sm font-bold">{{ t('admin.common.loading') }}</span>
    </div>

    <!-- 2. Error / Not Found State -->
    <div v-else-if="!activeMessage && !isLoading" class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100 shadow-sm">
      <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto text-2xl">
        <i class="fa-solid fa-envelope-open-text"></i>
      </div>
      <h2 class="text-xl font-black text-slate-800">تعذر العثور على بيانات الرسالة</h2>
      <p class="text-xs text-slate-500 max-w-sm mx-auto font-medium">
        تأكد من صحة معرف الرسالة أو حاول العودة إلى قائمة الرسائل الواردة.
      </p>
      <NuxtLink 
        to="/admin/contact-messages" 
        class="inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer shadow-sm"
      >
        {{ t('admin.contact_messages.back_to_list') }}
      </NuxtLink>
    </div>

    <!-- 3. Main Message Details View -->
    <div v-else-if="activeMessage" class="space-y-6">

      <!-- Top Action Bar (Matching Orders Details Header) -->
      <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex items-center gap-4">
          <!-- Back Button with Arrow -->
          <NuxtLink 
            to="/admin/contact-messages" 
            class="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer shrink-0"
            :title="t('admin.contact_messages.back_to_list')"
          >
            <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>

          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-2xl font-black text-slate-900">
                {{ t('admin.contact_messages.details_title') }}
              </h1>
              <!-- Read Status Badge -->
              <span 
                v-if="!activeMessage.is_read"
                class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span>
                <span>{{ t('admin.contact_messages.unread') }}</span>
              </span>
              <span 
                v-else
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"
              >
                <i class="fa-solid fa-check text-[10px]"></i>
                <span>{{ t('admin.contact_messages.read') }}</span>
              </span>
            </div>
            <p class="text-xs text-slate-400 font-medium mt-1">
              {{ t('admin.contact_messages.sent_date') }}: {{ formatDate(activeMessage.created_at) }} - {{ formatTime(activeMessage.created_at) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto flex-wrap">
          <!-- WhatsApp Quick Action if phone available -->
          <a 
            v-if="activeMessage.phone"
            :href="`https://wa.me/${cleanPhone(activeMessage.phone)}`"
            target="_blank"
            class="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <i class="fa-brands fa-whatsapp text-sm"></i>
            <span>{{ t('admin.contact_messages.chat_whatsapp') }}</span>
          </a>

          <!-- Email Reply Button -->
          <a 
            :href="`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`"
            class="px-4 py-2.5 rounded-xl bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-bold text-xs transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          >
            <i class="fa-solid fa-reply text-xs"></i>
            <span>{{ t('admin.contact_messages.reply_email') }}</span>
          </a>

          <!-- Delete Message Button -->
          <button 
            @click="handleDeleteMessage"
            type="button"
            class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-bold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <i class="fa-solid fa-trash-can text-xs"></i>
            <span>{{ t('admin.contact_messages.delete_message') }}</span>
          </button>
        </div>
      </div>

      <!-- Main Grid Layout (Matching Orders Details 2-Column Grid) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Left / Main Column: Message Subject & Full Content -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Message Body Card -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-start">
            
            <div class="border-b border-slate-100 pb-5">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-black mb-3">
                <i class="fa-solid fa-tag text-xs"></i>
                <span>{{ t('admin.contact_messages.subject') }}</span>
              </div>
              <h2 class="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {{ activeMessage.subject }}
              </h2>
            </div>

            <!-- Full Content Box -->
            <div class="space-y-2">
              <span class="text-xs font-black text-slate-400 block uppercase tracking-wider">
                {{ t('admin.contact_messages.message_content') }}
              </span>
              <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 text-slate-800 text-sm leading-relaxed whitespace-pre-wrap font-normal">
                {{ activeMessage.message }}
              </div>
            </div>

            <!-- Response Options Footer -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <button 
                  @click="copyToClipboard(activeMessage.email, 'تم نسخ البريد الإلكتروني')"
                  type="button"
                  class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i class="fa-regular fa-copy text-xs"></i>
                  <span>نسخ الإيميل</span>
                </button>

                <button 
                  v-if="activeMessage.phone"
                  @click="copyToClipboard(activeMessage.phone, 'تم نسخ رقم الهاتف')"
                  type="button"
                  class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <i class="fa-regular fa-copy text-xs"></i>
                  <span>نسخ الهاتف</span>
                </button>
              </div>

              <NuxtLink 
                to="/admin/contact-messages" 
                class="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>{{ t('admin.contact_messages.back_to_list') }}</span>
                <i class="fa-solid fa-arrow-left text-xs rtl:rotate-180"></i>
              </NuxtLink>
            </div>

          </div>

        </div>

        <!-- Right / Side Column: Sender Information -->
        <div class="space-y-6">

          <!-- Sender Card -->
          <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6 text-start">
            
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>{{ t('admin.contact_messages.sender_details') }}</span>
            </h3>

            <!-- Sender Identity -->
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xl shrink-0 shadow-sm">
                {{ (activeMessage.name || 'ع').charAt(0).toUpperCase() }}
              </div>
              <div class="space-y-0.5 min-w-0">
                <h4 class="font-black text-slate-900 text-base truncate">{{ activeMessage.name }}</h4>
                <p class="text-xs text-slate-400 font-medium">مرسل الاستفسار</p>
              </div>
            </div>

            <!-- Detailed Meta Info -->
            <div class="space-y-3.5 pt-2">
              
              <!-- Email -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span class="text-[11px] font-bold text-slate-400 block">{{ t('admin.contact_messages.sender_email') }}</span>
                <a 
                  :href="`mailto:${activeMessage.email}`"
                  class="font-bold text-xs text-indigo-600 hover:underline block font-mono dir-ltr truncate"
                >
                  {{ activeMessage.email }}
                </a>
              </div>

              <!-- Phone -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span class="text-[11px] font-bold text-slate-400 block">{{ t('admin.contact_messages.sender_phone') }}</span>
                <span v-if="activeMessage.phone" class="font-bold text-xs text-slate-900 block font-mono dir-ltr">
                  {{ activeMessage.phone }}
                </span>
                <span v-else class="text-xs text-slate-400 block italic">
                  غير متوفر
                </span>
              </div>

              <!-- Date & Time -->
              <div class="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                <span class="text-[11px] font-bold text-slate-400 block">{{ t('admin.contact_messages.sent_date') }}</span>
                <span class="font-bold text-xs text-slate-900 block">
                  {{ formatDate(activeMessage.created_at) }} - {{ formatTime(activeMessage.created_at) }}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useContact } from '~/composables/useContact'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { adminDir, t, adminLanguage } = useAdminLanguage()
const {
  activeMessage,
  isLoading,
  fetchMessageDetail,
  deleteMessage
} = useContact()

const messageId = computed(() => route.params.id as string)

useHead({
  title: computed(() => 
    activeMessage.value?.subject 
      ? `${activeMessage.value.subject} | ${t('admin.contact_messages.title')}` 
      : `${t('admin.contact_messages.title')} | لوحة التحكم`
  )
})

onMounted(async () => {
  if (messageId.value) {
    await fetchMessageDetail(messageId.value)
  }
})

const handleDeleteMessage = async () => {
  if (activeMessage.value?.id) {
    await deleteMessage(activeMessage.value.id)
    router.push('/admin/contact-messages')
  }
}

const cleanPhone = (phone?: string) => {
  if (!phone) return ''
  return phone.replace(/[^0-9]/g, '')
}

const copyToClipboard = (text?: string, successMsg = 'تم النسخ بنجاح') => {
  if (!text) return
  if (process.client && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    toast.success(successMsg)
  }
}

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
