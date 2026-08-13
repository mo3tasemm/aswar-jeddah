<template>
  <div class="account-tickets-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20" dir="rtl">
    <div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <!-- Central Breadcrumbs -->
      <Breadcrumbs />

      <div class="flex flex-col lg:flex-row gap-10">
        
        <!-- SIDEBAR -->
        <AccountSidebarNav />

        <!-- MAIN CONTENT AREA -->
        <main class="flex-1 min-w-0">
          
          <!-- Header Title & Action Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h1 class="text-2xl font-black text-[#0B0E28]">تذاكر الدعم الفني</h1>
                <span class="bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">
                  {{ tickets.length }} تذاكر
                </span>
              </div>
              <p class="text-sm text-slate-500">
                قم بإنشاء ومتابعة تذاكر الدعم الفني والاستفسارات الخاصة بطلباتك ومنتجاتك.
              </p>
            </div>
            
            <button 
              @click="isModalOpen = true"
              class="px-5 py-3 bg-[#0B0E28] hover:bg-[#151a42] text-amber-400 font-bold text-xs rounded-2xl shadow-lg shadow-[#0B0E28]/10 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              إنشاء تذكرة جديدة
            </button>
          </div>

          <!-- Loading State -->
          <div v-if="pending" class="py-12 text-center">
            <div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p class="text-xs font-bold text-slate-500">جاري تحميل تذاكر الدعم...</p>
          </div>

          <!-- Empty State -->
          <div v-else-if="tickets.length === 0" class="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm max-w-xl mx-auto my-6 space-y-6">
            <div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner">
              <svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <div class="space-y-2">
              <h2 class="text-xl font-black text-[#0B0E28]">لا توجد تذاكر دعم حالياً</h2>
              <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
                إذا كان لديك أي استفسار أو شكوى بخصوص شحنة أو طلب، يسعدنا تواصلك معنا لفتح تذكرة جديدة.
              </p>
            </div>
            <button 
              @click="isModalOpen = true"
              class="inline-flex items-center gap-2 px-6 py-3 bg-[#0B0E28] hover:bg-[#151a42] text-white font-bold text-xs sm:text-sm rounded-2xl transition-all cursor-pointer"
            >
              فتح تذكرة جديدة الآن
            </button>
          </div>

          <!-- Tickets List Grid -->
          <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              v-for="ticket in tickets" 
              :key="ticket.id"
              class="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between gap-2 mb-3">
                  <span class="text-xs font-bold text-slate-400">#{{ ticket.id }}</span>
                  <span 
                    class="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full"
                    :class="{
                      'bg-amber-100 text-amber-700': ticket.priority === 'High',
                      'bg-blue-100 text-blue-700': ticket.priority === 'Medium',
                      'bg-slate-100 text-slate-700': ticket.priority === 'Low'
                    }"
                  >
                    أولوية {{ ticket.priority === 'High' ? 'عالية' : ticket.priority === 'Medium' ? 'متوسطة' : 'عادية' }}
                  </span>
                </div>
                <h3 class="font-black text-base text-[#0B0E28] mb-2">{{ ticket.subject }}</h3>
                <p class="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">{{ ticket.description }}</p>
              </div>

              <div class="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold">
                <span class="text-slate-400">{{ ticket.type === 'Complaint' ? 'شكوى' : 'استفسار' }}</span>
                <span class="text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {{ ticket.status || 'مفتوحة' }}
                </span>
              </div>
            </div>
          </div>

        </main>
      </div>

    </div>

    <!-- CREATE TICKET MODAL -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0E28]/60 backdrop-blur-sm" dir="rtl">
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
          <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <h3 class="text-xl font-black text-[#0B0E28]">إنشاء تذكرة دعم جديدة</h3>
            <button @click="isModalOpen = false" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <form @submit.prevent="handleCreateTicket" class="space-y-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">عنوان التذكرة / المشكلة</label>
              <input 
                type="text" 
                v-model="form.subject" 
                placeholder="مثال: تأخر في استلام الطلب رقم #102" 
                required 
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0B0E28] focus:ring-0 text-xs font-medium outline-none"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">نوع المشكلة</label>
                <select 
                  v-model="form.type" 
                  class="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-[#0B0E28] focus:ring-0 text-xs font-medium outline-none bg-white"
                >
                  <option value="Complaint">شكوى (Complaint)</option>
                  <option value="Query">استفسار (Query)</option>
                </select>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-700 mb-1">الأولوية</label>
                <select 
                  v-model="form.priority" 
                  class="w-full px-3 py-3 rounded-xl border border-slate-200 focus:border-[#0B0E28] focus:ring-0 text-xs font-medium outline-none bg-white"
                >
                  <option value="High">عالية (High)</option>
                  <option value="Medium">متوسطة (Medium)</option>
                  <option value="Low">عادية (Low)</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 mb-1">شرح المشكلة بالتفصيل</label>
              <textarea 
                v-model="form.description" 
                rows="4" 
                placeholder="اكتب التفاصيل الكاملة لمساعدتنا في معالجة طلبك بسرعة..." 
                required 
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-[#0B0E28] focus:ring-0 text-xs font-medium outline-none resize-none"
              ></textarea>
            </div>

            <div class="pt-3 flex items-center justify-end gap-3">
              <button 
                type="button" 
                @click="isModalOpen = false" 
                class="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                إلغاء
              </button>

              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="px-6 py-3 rounded-xl bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] text-xs font-bold transition-colors flex items-center gap-2 shadow-md cursor-pointer"
              >
                <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>{{ isSubmitting ? 'جاري الإرسال...' : 'إرسال التذكرة' }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { supportTicketApiService, type SupportTicket } from '~/services/supportTicketApiService'
import { useToast } from '~/composables/useToast'
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'
import AccountSidebarNav from '~/components/account/SidebarNav.vue'

useHead({
  title: 'تذاكر الدعم الفني | أسوار جدة'
})

const toast = useToast()

const tickets = ref<SupportTicket[]>([])
const pending = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  subject: '',
  type: 'Complaint',
  priority: 'Medium',
  description: ''
})

const loadTickets = async () => {
  pending.value = true
  try {
    const res = await supportTicketApiService.fetchTickets()
    if (res.tickets) {
      tickets.value = res.tickets
    }
  } catch (e) {
    console.warn('Failed to load tickets:', e)
  } finally {
    pending.value = false
  }
}

onMounted(() => {
  loadTickets()
})

const handleCreateTicket = async () => {
  if (!form.subject || !form.description) return
  isSubmitting.value = true

  try {
    const res = await supportTicketApiService.createTicket({
      subject: form.subject,
      type: form.type,
      priority: form.priority,
      description: form.description
    })

    if (res.success) {
      toast.success('تم إنشاء تذكرة الدعم بنجاح', form.subject)
      isModalOpen.value = false
      form.subject = ''
      form.description = ''
      await loadTickets()
    } else {
      toast.error('فشل إنشاء التذكرة', res.message)
    }
  } catch (err: any) {
    toast.error('خطأ في الاتصال', err?.message || 'تعذر إرسال التذكرة.')
  } finally {
    isSubmitting.value = false
  }
}
</script>
