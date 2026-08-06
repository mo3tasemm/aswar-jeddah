<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div 
        v-if="isOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 md:p-6 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto"
        @click.self="closeModal"
        dir="rtl"
      >
        <!-- Modal Container -->
        <div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]">
          
          <!-- MODAL HEADER -->
          <div class="bg-white p-6 pb-4 flex items-center justify-between border-b border-slate-100 shrink-0">
            <h3 class="text-xl font-black text-[#0B0E28]">
              {{ isEditing ? 'تعديل العنوان' : 'إضافة عنوان جديد' }}
            </h3>
            <button 
              @click="closeModal" 
              class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors text-sm"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- MODAL BODY -->
          <div class="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 custom-scrollbar">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Address Type -->
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-bold text-slate-700">نوع العنوان</label>
                <div class="flex gap-4">
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" v-model="formData.type" value="home" class="peer sr-only" />
                    <div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span class="text-sm font-bold">المنزل</span>
                    </div>
                  </label>
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" v-model="formData.type" value="office" class="peer sr-only" />
                    <div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      <span class="text-sm font-bold">العمل</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Receiver Name -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">اسم المستلم بالكامل</label>
                <input type="text" v-model="formData.receiverName" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="الاسم الكامل" />
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">رقم الجوال</label>
                <div class="relative flex">
                  <div class="bg-slate-100 border border-slate-200 border-l-0 rounded-r-xl px-4 py-3.5 text-sm font-bold text-slate-600 flex items-center justify-center shrink-0">
                    +966
                  </div>
                  <input type="tel" v-model="formData.phone" class="w-full bg-slate-50 border border-slate-200 rounded-l-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="5X XXX XXXX" dir="ltr" />
                </div>
              </div>

              <!-- City -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">المدينة</label>
                <div class="relative">
                  <select v-model="formData.city" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all appearance-none cursor-pointer">
                    <option value="" disabled>اختر المدينة</option>
                    <option value="جدة">جدة</option>
                    <option value="الرياض">الرياض</option>
                    <option value="مكة المكرمة">مكة المكرمة</option>
                    <option value="الدمام">الدمام</option>
                    <option value="الخبر">الخبر</option>
                  </select>
                  <svg class="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <!-- District -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">الحي</label>
                <input type="text" v-model="formData.district" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="اسم الحي" />
              </div>

              <!-- Street -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">الشارع</label>
                <input type="text" v-model="formData.street" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="اسم الشارع" />
              </div>

              <!-- Building -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">رقم المبنى</label>
                <input type="text" v-model="formData.building" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="رقم المبنى أو الفيلا" />
              </div>

              <!-- Notes -->
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-bold text-slate-700">ملاحظات التوصيل (اختياري)</label>
                <textarea v-model="formData.notes" rows="2" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none" placeholder="معلم بارز، لون الباب، الخ..."></textarea>
              </div>

              <!-- Set Default -->
              <div class="md:col-span-2 flex items-center gap-3 pt-2">
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="setDefault" type="checkbox" v-model="formData.isDefault" class="w-4 h-4 text-[#0B0E28] bg-slate-50 border-slate-300 rounded focus:ring-[#0B0E28] focus:ring-2" />
                  </div>
                  <div class="ml-3 text-sm mr-3">
                    <label for="setDefault" class="font-bold text-slate-700 cursor-pointer">تعيين كعنوان افتراضي للشحن</label>
                    <p class="text-xs text-slate-500 mt-1">سيتم استخدام هذا العنوان تلقائياً في طلباتك القادمة.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- MODAL FOOTER -->
          <div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row-reverse items-center justify-between gap-3 shrink-0">
            <button 
              @click="handleSave"
              :disabled="isSaving"
              class="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-white hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-2 min-w-[140px]"
            >
              <svg v-if="isSaving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span v-else>حفظ العنوان</span>
            </button>
            <button 
              @click="closeModal"
              class="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center"
            >
              إلغاء
            </button>
          </div>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, reactive, watch, onUnmounted } from 'vue'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  addressData: { type: Object, default: null }
})

const emit = defineEmits(['close', 'save'])

const isSaving = ref(false)

const formData = reactive({
  id: null,
  type: 'home',
  title: '',
  receiverName: '',
  phone: '',
  city: '',
  district: '',
  street: '',
  building: '',
  notes: '',
  isDefault: false
})

const resetForm = () => {
  formData.id = null
  formData.type = 'home'
  formData.title = ''
  formData.receiverName = ''
  formData.phone = ''
  formData.city = ''
  formData.district = ''
  formData.street = ''
  formData.building = ''
  formData.notes = ''
  formData.isDefault = false
}

const populateForm = (data) => {
  Object.assign(formData, data)
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    if (props.addressData) {
      populateForm(props.addressData)
    } else {
      resetForm()
    }
  }
})

const closeModal = () => {
  emit('close')
}

const handleSave = () => {
  isSaving.value = true
  setTimeout(() => {
    isSaving.value = false
    emit('save', { ...formData })
  }, 800)
}

// SCROLL LOCK FIX LOGIC
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    lockScroll()
  } else {
    unlockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
})
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #0B0E28;
}
</style>
