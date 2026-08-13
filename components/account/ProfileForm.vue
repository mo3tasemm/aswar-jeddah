<template>
  <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden flex flex-col relative" :dir="layoutDirection">
    
    <!-- 1. IDENTITY HEADER & VIEW/EDIT TOGGLE -->
    <div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-6 sm:p-10 border-b border-slate-100 bg-white">
      
      <div class="flex flex-col sm:flex-row items-center gap-6">
        <!-- Avatar Container -->
        <div class="relative shrink-0 group">
          <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full aspect-square shrink-0 bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
            <img 
              v-if="effectiveAvatarUrl && !imgError" 
              :src="effectiveAvatarUrl" 
              @error="imgError = true"
              class="w-full h-full object-cover object-center rounded-full" 
              alt="User Avatar" 
            />
            <span v-else class="text-4xl font-black text-[#0B0E28]">
              {{ userInitial }}
            </span>
            
            <!-- Hover Overlay for Upload (Only in Edit Mode) -->
            <div 
              v-if="isEditing" 
              class="absolute inset-0 bg-[#0B0E28]/60 rounded-full flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-xs"
            >
              <svg class="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                <circle cx="12" cy="13" r="4"></circle>
              </svg>
              <input 
                type="file" 
                class="absolute inset-0 opacity-0 cursor-pointer rounded-full z-10" 
                accept="image/*" 
                @change="handleFileUpload" 
              />
            </div>
          </div>

          <!-- Edit Icon Badge -->
          <div 
            v-if="isEditing" 
            class="absolute bottom-1 start-1 w-9 h-9 aspect-square bg-amber-400 text-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-none z-20"
          >
            <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
          </div>
        </div>

        <!-- User Info Header -->
        <div class="text-center sm:text-start space-y-1.5 sm:mt-2">
          <h2 class="text-2xl sm:text-3xl font-black text-[#0B0E28]">
            {{ fullNameDisplay }}
          </h2>
          <p class="text-slate-500 text-xs sm:text-sm">{{ t('account.manage_profile') }}</p>
        </div>
      </div>

      <!-- TOGGLE EDIT MODE BUTTON -->
      <div class="shrink-0 w-full sm:w-auto flex justify-center">
        <button 
          @click="toggleEditMode" 
          type="button"
          class="w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          :class="isEditing ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300' : 'bg-[#0B0E28] text-amber-400 hover:bg-[#161c47]'"
        >
          <svg v-if="!isEditing" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          <span>{{ isEditing ? t('account.cancel_edit') : t('account.edit_profile') }}</span>
        </button>
      </div>

    </div>

    <!-- PROFILE DETAILS CONTENT (VIEW VS EDIT MODE) -->
    <div class="p-6 sm:p-10 space-y-10">
      
      <!-- PERSONAL INFORMATION -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1.5 h-6 bg-amber-400 rounded-full"></div>
          <h3 class="text-xl font-black text-[#0B0E28]">{{ t('account.details') }}</h3>
        </div>
        
        <!-- EDIT MODE (Interactive Inputs) -->
        <div v-if="isEditing" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">{{ t('auth.first_name') }}</label>
            <input type="text" v-model="formData.f_name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" :placeholder="t('auth.first_name')" />
          </div>
          
          <!-- Last Name -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">{{ t('auth.last_name') }}</label>
            <input type="text" v-model="formData.l_name" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" :placeholder="t('auth.last_name')" />
          </div>

          <!-- Phone Number -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">{{ t('auth.phone_placeholder') }}</label>
            <input type="tel" v-model="formData.phone" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="05XXXXXXXX" dir="ltr" />
          </div>

          <!-- Email Address -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">{{ t('auth.email_label') }}</label>
            <input type="email" v-model="formData.email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="example@domain.com" dir="ltr" />
          </div>

          <!-- Optional Password Update Section -->
          <div class="space-y-2 md:col-span-2 pt-4 border-t border-slate-100 mt-2">
            <h4 class="text-sm font-black text-[#0B0E28] flex items-center gap-2">
              <svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              تغيير كلمة المرور (اختياري)
            </h4>
            <p class="text-xs text-slate-400">اترك هذه الحقول فارغة إذا كنت تريد الإبقاء على كلمة المرور الحالية بدون تغيير.</p>
          </div>

          <!-- New Password -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">كلمة المرور الجديدة</label>
            <input 
              type="password" 
              v-model="formData.password" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" 
              placeholder="كلمة المرور الجديدة (اختياري)" 
              dir="ltr"
            />
          </div>

          <!-- Confirm New Password -->
          <div class="space-y-2">
            <label class="text-xs sm:text-sm font-bold text-slate-700">تأكيد كلمة المرور الجديدة</label>
            <input 
              type="password" 
              v-model="formData.confirm_password" 
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" 
              placeholder="تأكيد كلمة المرور الجديدة" 
              dir="ltr"
            />
          </div>
        </div>

        <!-- VIEW MODE (Read-only Display Cards) -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1">
            <span class="text-xs font-semibold text-slate-400 block">{{ t('auth.first_name') }}</span>
            <p class="text-base font-bold text-[#0B0E28]">{{ user?.f_name || '—' }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1">
            <span class="text-xs font-semibold text-slate-400 block">{{ t('auth.last_name') }}</span>
            <p class="text-base font-bold text-[#0B0E28]">{{ user?.l_name || '—' }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1">
            <span class="text-xs font-semibold text-slate-400 block">{{ t('auth.phone_placeholder') }}</span>
            <p class="text-base font-bold text-[#0B0E28] dir-ltr text-start">{{ user?.phone || '—' }}</p>
          </div>

          <div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1">
            <span class="text-xs font-semibold text-slate-400 block">{{ t('auth.email_label') }}</span>
            <p class="text-base font-bold text-[#0B0E28] dir-ltr text-start">{{ user?.email || '—' }}</p>
          </div>
        </div>
      </section>

      <!-- DANGER ZONE: DELETE ACCOUNT -->
      <section class="pt-6 border-t border-slate-100">
        <div class="p-6 sm:p-8 rounded-2xl bg-rose-50/40 border border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div class="space-y-1 text-center sm:text-start">
            <h4 class="text-base font-black text-rose-700">حذف الحساب</h4>
            <p class="text-xs text-rose-600/80 max-w-md">بمجرد حذف حسابك، سيتم مسح كافة سجلاتك وعناوينك المحفوظة نهائياً من المتجر.</p>
          </div>
          <button 
            type="button"
            @click="isDeleteModalOpen = true"
            class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors shrink-0 cursor-pointer"
          >
            حذف الحساب نهائياً
          </button>
        </div>
      </section>

    </div>

    <!-- STICKY ACTION BAR (EDIT MODE ONLY) -->
    <div 
      v-if="isEditing" 
      class="sticky bottom-0 start-0 end-0 bg-white border-t border-slate-100 p-6 flex items-center justify-end gap-4 shadow-[0_-10px_30px_rgb(0,0,0,0.04)] z-30 rounded-b-[2rem]"
    >
      <button 
        type="button"
        @click="toggleEditMode"
        class="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
      >
        {{ t('account.cancel_edit') }}
      </button>
      <button 
        @click="handleSave"
        :disabled="isSaving"
        class="px-8 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 min-w-[150px] cursor-pointer disabled:opacity-50"
      >
        <svg v-if="isSaving" class="animate-spin h-4 w-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span v-else>{{ t('account.save_changes') }}</span>
      </button>
    </div>

    <!-- DELETE ACCOUNT CONFIRMATION MODAL -->
    <Teleport to="body">
      <div 
        v-if="isDeleteModalOpen" 
        class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0E28]/60 backdrop-blur-sm" 
        :dir="layoutDirection"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5">
          <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner">
            <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </div>

          <div class="space-y-2">
            <h3 class="text-xl font-black text-[#0B0E28]">تأكيد حذف الحساب نهائياً</h3>
            <p class="text-xs sm:text-sm text-slate-500 leading-relaxed">
              تحذير: هذا الإجراء سيقوم بمحو كافة بياناتك الشخصية، العناوين، وسجل طلباتك نهائياً من المتجر ولا يمكن استعادتها لاحقاً.
            </p>
          </div>

          <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button 
              @click="isDeleteModalOpen = false" 
              class="w-full sm:flex-1 py-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {{ t('common.cancel') }}
            </button>
            <button 
              @click="confirmDeleteAccount" 
              :disabled="isDeleting"
              class="w-full sm:flex-1 py-3.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <svg v-if="isDeleting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ isDeleting ? t('common.loading') : 'نعم، قم بالحذف' }}</span>
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { user, userName, updateProfile, deleteAccount } = useAuth()
const { t, layoutDirection } = useLanguage()
const toast = useToast()

const isEditing = ref(false)
const isSaving = ref(false)
const isDeleting = ref(false)
const isDeleteModalOpen = ref(false)
const imgError = ref(false)
const avatarFile = ref<File | null>(null)
const avatarPreview = ref<string | null>(null)

const formData = reactive({
  f_name: '',
  l_name: '',
  email: '',
  phone: '',
  password: '',
  confirm_password: ''
})

const populateFormFromUser = () => {
  if (user.value) {
    formData.f_name = user.value.f_name || ''
    formData.l_name = user.value.l_name || ''
    formData.email = user.value.email || ''
    formData.phone = user.value.phone || ''
    formData.password = ''
    formData.confirm_password = ''
  }
}

watch(user, () => {
  populateFormFromUser()
}, { immediate: true })

const userInitial = computed(() => {
  const name = userName?.value || user.value?.f_name || user.value?.name || 'م'
  return name.charAt(0).toUpperCase()
})

const fullNameDisplay = computed(() => {
  if (user.value?.f_name || user.value?.l_name) {
    return `${user.value.f_name || ''} ${user.value.l_name || ''}`.trim()
  }
  return user.value?.name || userName.value || 'عميل أسوار جدة'
})

const userAvatarUrl = computed(() => {
  const u = user.value as any
  const raw = u?.image_full_url?.path || u?.image_full_url || u?.image || u?.avatar || u?.profile_image
  if (!raw) return null

  let str = typeof raw === 'object' && raw?.path ? raw.path : String(raw)
  if (!str || typeof str !== 'string' || !str.trim()) return null

  if (str.startsWith('blob:') || str.startsWith('data:')) {
    return str
  }

  let clean = str.replace(/(https?:\/\/)|(\/+)/g, (match, protocol) => {
    return protocol ? protocol : '/'
  })

  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean
  }

  const relative = clean.replace(/^\/+/, '')
  return `https://wedgetstore.com/${relative}`
})

const effectiveAvatarUrl = computed(() => {
  return avatarPreview.value || userAvatarUrl.value
})

watch(userAvatarUrl, () => {
  imgError.value = false
}, { immediate: true })

const toggleEditMode = () => {
  isEditing.value = !isEditing.value
  if (!isEditing.value) {
    avatarFile.value = null
    avatarPreview.value = null
    populateFormFromUser()
  }
}

const handleFileUpload = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    avatarFile.value = file
    avatarPreview.value = URL.createObjectURL(file)
    imgError.value = false
  }
}

const handleSave = async () => {
  if (formData.password && formData.password !== formData.confirm_password) {
    toast.error('خطأ في كلمة المرور', 'كلمة المرور وتأكيد كلمة المرور غير متطابقين.')
    return
  }

  isSaving.value = true

  try {
    const payload: any = {
      f_name: formData.f_name,
      l_name: formData.l_name,
      email: formData.email,
      phone: formData.phone
    }

    if (formData.password) {
      payload.password = formData.password
    }

    if (avatarFile.value) {
      payload.image = avatarFile.value
    }

    const success = await updateProfile(payload)

    if (success) {
      isEditing.value = false
      avatarFile.value = null
      avatarPreview.value = null
    }
  } catch (err: any) {
    console.error('Update profile error:', err)
  } finally {
    isSaving.value = false
  }
}

const confirmDeleteAccount = async () => {
  isDeleting.value = true
  try {
    await deleteAccount()
  } catch (e) {
    console.error('Delete account error:', e)
  } finally {
    isDeleting.value = false
    isDeleteModalOpen.value = false
  }
}
</script>
