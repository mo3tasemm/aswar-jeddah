<template>
  <div class="bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden flex flex-col relative">
    
    <!-- 1. IDENTITY HEADER -->
    <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 sm:p-10 border-b border-slate-100 bg-white">
      <!-- Avatar Upload -->
      <div class="relative shrink-0 group">
  <!-- Avatar Main Container -->
  <div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full aspect-square shrink-0 bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">
    
    <!-- Uploaded Image -->
    <img 
      v-if="avatarUrl" 
      :src="avatarUrl" 
      class="w-full h-full object-cover object-center rounded-full" 
      alt="User Avatar" 
    />
    
    <!-- Fallback Letter -->
    <span v-else class="text-4xl font-black text-[#0B0E28]">
      {{ formData.firstName?.charAt(0) || 'م' }}
    </span>
    
    <!-- Hover Overlay for Upload -->
    <div class="absolute inset-0 bg-[#0B0E28]/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
      <svg class="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
    </div>
    
    <!-- File Input -->
    <input 
      type="file" 
      class="absolute inset-0 opacity-0 cursor-pointer rounded-full z-10" 
      accept="image/*" 
      @change="handleFileUpload" 
    />
  </div>

  <!-- Edit Icon Badge -->
  <div class="absolute bottom-1 start-1 w-9 h-9 aspect-square bg-amber-400 text-white rounded-full flex items-center justify-center border-2 border-white shadow-md cursor-pointer hover:bg-amber-500 transition-colors pointer-events-none z-20">
    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  </div>
</div>

      <!-- User Name & Badge -->
      <div class="flex-1 text-center sm:text-right space-y-2 sm:mt-4">
        <div class="flex justify-center sm:justify-start">
          <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200">
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            عضو ماسي VIP
          </span>
        </div>
        <h2 class="text-2xl sm:text-3xl font-black text-[#0B0E28]">
          {{ formData.firstName }} {{ formData.lastName }}
        </h2>
        <p class="text-slate-500 text-sm">تحديث بياناتك الشخصية للحصول على تجربة تسوق مخصصة.</p>
      </div>
    </div>

    <!-- FORM CONTENT -->
    <div class="p-6 sm:p-10 space-y-12">
      
      <!-- 2. PERSONAL INFORMATION -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1.5 h-6 bg-amber-400 rounded-full"></div>
          <h3 class="text-xl font-black text-[#0B0E28]">البيانات الأساسية</h3>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- First Name -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700">الاسم الأول</label>
            <input type="text" v-model="formData.firstName" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="أدخل اسمك الأول" />
          </div>
          
          <!-- Last Name -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700">الاسم الأخير</label>
            <input type="text" v-model="formData.lastName" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="أدخل اسمك الأخير" />
          </div>

          <!-- Display Name -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700">الاسم الظاهر</label>
            <input type="text" v-model="formData.displayName" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="الاسم الذي سيظهر في الموقع" />
            <p class="text-xs text-slate-400">هذا هو الاسم الذي سيظهر في تعليقاتك وتقييماتك للمنتجات.</p>
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

          <!-- Email Address (Full Width) -->
          <div class="space-y-2 md:col-span-2 relative">
            <div class="flex items-center justify-between">
              <label class="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold">
                <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                مفعل
              </span>
            </div>
            <input type="email" v-model="formData.email" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="example@domain.com" dir="ltr" />
          </div>
        </div>
      </section>

      <!-- 3. SECURITY & PASSWORD -->
      <section>
        <div class="flex items-center gap-3 mb-6">
          <div class="w-1.5 h-6 bg-[#0B0E28] rounded-full"></div>
          <h3 class="text-xl font-black text-[#0B0E28]">الأمان وكلمة المرور</h3>
        </div>

        <div class="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/60 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <!-- Current Password -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700">كلمة المرور الحالية</label>
            <div class="relative">
              <input :type="showCurrentPassword ? 'text' : 'password'" v-model="formData.currentPassword" class="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-[#0B0E28]/30 focus:border-[#0B0E28] transition-all" placeholder="••••••••" dir="ltr" />
              <button @click="showCurrentPassword = !showCurrentPassword" type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B0E28] transition-colors">
                <svg v-if="!showCurrentPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </button>
            </div>
          </div>

          <!-- New Password -->
          <div class="space-y-2 relative">
            <label class="text-sm font-bold text-slate-700">كلمة المرور الجديدة</label>
            <div class="relative">
              <input :type="showNewPassword ? 'text' : 'password'" v-model="formData.newPassword" @input="checkPasswordStrength" class="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-[#0B0E28]/30 focus:border-[#0B0E28] transition-all" placeholder="••••••••" dir="ltr" />
              <button @click="showNewPassword = !showNewPassword" type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#0B0E28] transition-colors">
                <svg v-if="!showNewPassword" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
              </button>
            </div>
            <!-- Strength Indicator -->
            <div v-if="formData.newPassword" class="flex gap-1 mt-2">
              <div class="h-1 rounded-full flex-1" :class="passwordStrength >= 1 ? strengthColor : 'bg-slate-200'"></div>
              <div class="h-1 rounded-full flex-1" :class="passwordStrength >= 2 ? strengthColor : 'bg-slate-200'"></div>
              <div class="h-1 rounded-full flex-1" :class="passwordStrength >= 3 ? strengthColor : 'bg-slate-200'"></div>
              <div class="h-1 rounded-full flex-1" :class="passwordStrength >= 4 ? strengthColor : 'bg-slate-200'"></div>
            </div>
            <p v-if="formData.newPassword" class="text-[10px] font-bold mt-1" :class="strengthTextColor">{{ strengthText }}</p>
          </div>

          <!-- Confirm New Password -->
          <div class="space-y-2">
            <label class="text-sm font-bold text-slate-700">تأكيد كلمة المرور</label>
            <div class="relative">
              <input :type="showNewPassword ? 'text' : 'password'" v-model="formData.confirmPassword" class="w-full bg-white border border-slate-200 rounded-xl pl-4 pr-12 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-[#0B0E28]/30 focus:border-[#0B0E28] transition-all" placeholder="••••••••" dir="ltr" />
            </div>
          </div>
        </div>
      </section>

    </div>

    <!-- 4. STICKY ACTION BAR -->
    <div class="sticky bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-6 flex items-center justify-end gap-4 shadow-[0_-10px_30px_rgb(0,0,0,0.03)] z-30 mt-4 rounded-b-[2rem]">
      <button 
        type="button"
        class="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors"
      >
        تراجع
      </button>
      <button 
        @click="handleSave"
        :disabled="isSaving"
        class="px-8 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-white hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 min-w-[140px]"
      >
        <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
        <span v-else>حفظ التغييرات</span>
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const emit = defineEmits(['save'])

const isSaving = ref(false)
const avatarUrl = ref(null)

const formData = reactive({
  firstName: 'معتصم',
  lastName: 'عاطف',
  displayName: 'Moatasem Atef',
  phone: '501234567',
  email: 'moatasem@example.com',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)

const passwordStrength = ref(0)
const strengthText = ref('')
const strengthColor = ref('')
const strengthTextColor = ref('')

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    avatarUrl.value = URL.createObjectURL(file)
  }
}

const checkPasswordStrength = () => {
  const pass = formData.newPassword
  let strength = 0
  if (pass.length > 0) strength = 1
  if (pass.length >= 8) strength = 2
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength = 3
  if (pass.match(/\d/) && pass.match(/[^a-zA-Z\d]/)) strength = 4

  passwordStrength.value = strength

  switch (strength) {
    case 1:
      strengthText.value = 'ضعيفة جداً'
      strengthColor.value = 'bg-rose-500'
      strengthTextColor.value = 'text-rose-500'
      break
    case 2:
      strengthText.value = 'متوسطة'
      strengthColor.value = 'bg-amber-500'
      strengthTextColor.value = 'text-amber-500'
      break
    case 3:
      strengthText.value = 'جيدة'
      strengthColor.value = 'bg-emerald-400'
      strengthTextColor.value = 'text-emerald-500'
      break
    case 4:
      strengthText.value = 'قوية جداً'
      strengthColor.value = 'bg-emerald-600'
      strengthTextColor.value = 'text-emerald-600'
      break
    default:
      strengthText.value = ''
      strengthColor.value = ''
      strengthTextColor.value = ''
  }
}

const handleSave = () => {
  // Validate if needed
  isSaving.value = true
  // Simulate API Call delay
  setTimeout(() => {
    isSaving.value = false
    emit('save', formData)
  }, 600)
}
</script>
