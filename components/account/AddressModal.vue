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
              {{ isEditMode ? 'تعديل عنوان التوصيل' : 'إضافة عنوان توصيل جديد' }}
            </h3>
            <button 
              @click="closeModal" 
              class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors text-sm cursor-pointer"
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <!-- MODAL BODY -->
          <form @submit.prevent="handleSave" class="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 custom-scrollbar">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <!-- Address Type -->
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-bold text-slate-700">نوع العنوان</label>
                <div class="flex gap-4">
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" v-model="formData.address_type" value="Home" class="peer sr-only" />
                    <div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                      <span class="text-sm font-bold">المنزل (Home)</span>
                    </div>
                  </label>
                  <label class="flex-1 cursor-pointer">
                    <input type="radio" v-model="formData.address_type" value="Office" class="peer sr-only" />
                    <div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all">
                      <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                      <span class="text-sm font-bold">العمل (Office)</span>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Receiver Name -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">اسم المستلم بالكامل</label>
                <input type="text" v-model="formData.contact_person_name" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="الاسم الكامل للمستلم" />
              </div>

              <!-- Phone Number -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">رقم الجوال</label>
                <input type="tel" v-model="formData.phone" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="05XXXXXXXX" dir="ltr" />
              </div>

              <!-- City -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">المدينة</label>
                <input type="text" v-model="formData.city" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="جدة، الرياض، إلخ..." />
              </div>

              <!-- Country -->
              <div class="space-y-2">
                <label class="text-sm font-bold text-slate-700">الدولة</label>
                <input type="text" v-model="formData.country" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="السعودية" />
              </div>

              <!-- Detailed Address -->
              <div class="space-y-2 md:col-span-2">
                <label class="text-sm font-bold text-slate-700">تفاصيل العنوان التفصيلي</label>
                <textarea v-model="formData.address" rows="3" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none" placeholder="اسم الحي، اسم الشارع، رقم المبنى أو الشقة..."></textarea>
              </div>

              <!-- Is Billing Address -->
              <div class="md:col-span-2 flex items-center gap-3 pt-2">
                <div class="relative flex items-start">
                  <div class="flex items-center h-5">
                    <input id="isBilling" type="checkbox" v-model="formData.is_billing" :true-value="1" :false-value="0" class="w-4 h-4 text-[#0B0E28] bg-slate-50 border-slate-300 rounded focus:ring-[#0B0E28] focus:ring-2 cursor-pointer" />
                  </div>
                  <div class="ml-3 text-sm mr-3">
                    <label for="isBilling" class="font-bold text-slate-700 cursor-pointer">تعيين كعنوان الدفع والفواتير (Billing Address)</label>
                  </div>
                </div>
              </div>

            </div>

            <!-- MODAL FOOTER -->
            <div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row-reverse items-center justify-between gap-3 shrink-0 rounded-b-3xl">
              <button 
                type="submit"
                :disabled="isSaving"
                class="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-2 min-w-[140px] cursor-pointer disabled:opacity-50"
              >
                <svg v-if="isSaving" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span v-else>{{ isEditMode ? 'حفظ التعديلات' : 'حفظ العنوان' }}</span>
              </button>
              <button 
                type="button"
                @click="closeModal"
                class="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-[#fff] text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer"
              >
                إلغاء
              </button>
            </div>
          </form>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useAddresses } from '~/composables/useAddresses'

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  editingAddress: { type: Object, default: null }
})

const emit = defineEmits(['close', 'saved'])
const { addAddress, updateAddress, loadAddresses } = useAddresses()
const isSaving = ref(false)

const isEditMode = computed(() => Boolean(props.editingAddress && props.editingAddress.id))

const formData = reactive({
  contact_person_name: '',
  phone: '',
  address_type: 'Home',
  address: '',
  city: 'جدة',
  country: 'السعودية',
  latitude: 21.5433,
  longitude: 39.1728,
  is_billing: 0
})

const populateForm = () => {
  if (props.editingAddress) {
    formData.contact_person_name = props.editingAddress.contact_person_name || props.editingAddress.receiverName || ''
    formData.phone = props.editingAddress.phone || ''
    formData.address_type = props.editingAddress.address_type || props.editingAddress.type || 'Home'
    formData.address = props.editingAddress.address || ''
    formData.city = props.editingAddress.city || 'جدة'
    formData.country = props.editingAddress.country || 'السعودية'
    formData.is_billing = props.editingAddress.is_billing ? 1 : 0
  } else {
    resetForm()
  }
}

const resetForm = () => {
  formData.contact_person_name = ''
  formData.phone = ''
  formData.address_type = 'Home'
  formData.address = ''
  formData.city = 'جدة'
  formData.country = 'السعودية'
  formData.latitude = 21.5433
  formData.longitude = 39.1728
  formData.is_billing = 0
}

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    populateForm()
  }
}, { immediate: true })

watch(() => props.editingAddress, () => {
  if (props.isOpen) {
    populateForm()
  }
}, { deep: true })

const closeModal = () => {
  resetForm()
  emit('close')
}

const handleSave = async () => {
  isSaving.value = true
  try {
    let ok = false
    if (isEditMode.value && props.editingAddress?.id) {
      // 1. Instant Local State Update + API PUT /update + Auto Refetch
      ok = await updateAddress({
        address_id: props.editingAddress.id,
        ...formData
      })
    } else {
      // 2. Add Address + API POST /add + Auto Refetch
      ok = await addAddress(formData)
    }

    if (ok) {
      await loadAddresses()
      emit('saved')
      closeModal()
    }
  } catch (err: any) {
    console.error('[AddressModal] handleSave Error:', err)
  } finally {
    isSaving.value = false
  }
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}
</style>
