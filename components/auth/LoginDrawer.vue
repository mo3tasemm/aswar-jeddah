<template>
  <Teleport to="body">
    <!-- Backdrop Transition -->
    <Transition name="fade">
      <div 
        v-if="isLoginOpen" 
        class="fixed inset-0 z-[100] bg-[#0B0E28]/60 backdrop-blur-sm transition-opacity" 
        @click="closeLogin"
        aria-hidden="true"
      ></div>
    </Transition>

    <!-- Slide Panel Transition: Left in RTL (Arabic), Right in LTR (English) -->
    <Transition :name="layoutDirection === 'rtl' ? 'slide-left' : 'slide-right'">
      <div 
        v-if="isLoginOpen" 
        class="fixed inset-y-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-[110]"
        :class="layoutDirection === 'rtl' ? 'left-0' : 'right-0'"
        :dir="layoutDirection"
        role="dialog"
        aria-modal="true"
        id="auth-drawer"
      >
        <!-- 1. Drawer Header -->
        <div class="px-6 py-5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-400/20 text-[#0B0E28] flex items-center justify-center font-black">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h2 class="text-lg font-black text-slate-900">
              {{ activeTab === 'login' ? (t('nav.login') || 'تسجيل الدخول') : (t('auth.create_account') || 'إنشاء حساب جديد') }}
            </h2>
          </div>

          <button 
            type="button" 
            class="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-xs cursor-pointer"
            @click="closeLogin"
            aria-label="إغلاق"
          >
            <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- 2. Dual Tab Selector (Login / Register Switch) -->
        <div class="px-6 pt-4 pb-1 shrink-0 bg-white">
          <div class="flex p-1 bg-slate-100 rounded-xl">
            <button 
              type="button"
              @click="switchTab('login')" 
              class="flex-1 py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              :class="activeTab === 'login' ? 'bg-[#0B0E28] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
            >
              <i class="fa-solid fa-arrow-right-to-bracket text-[11px]" :class="activeTab === 'login' ? 'text-amber-400' : 'text-slate-400'"></i>
              <span>{{ t('auth.login_tab') || 'تسجيل الدخول' }}</span>
            </button>

            <button 
              type="button"
              @click="switchTab('register')" 
              class="flex-1 py-2 text-xs font-black rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5"
              :class="activeTab === 'register' ? 'bg-[#0B0E28] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
            >
              <i class="fa-solid fa-user-plus text-[11px]" :class="activeTab === 'register' ? 'text-amber-400' : 'text-slate-400'"></i>
              <span>{{ t('auth.register_tab') || 'حساب جديد' }}</span>
            </button>
          </div>
        </div>

        <!-- 3. Form Body (Scrollable) -->
        <div class="flex-1 overflow-y-auto px-6 py-4 space-y-5 custom-scrollbar">

          <!-- TAB 1: LOGIN FORM -->
          <div v-if="activeTab === 'login'" class="space-y-4">
            <div class="text-center space-y-1">
              <h3 class="text-base font-black text-slate-900">{{ t('auth.welcome_title') || 'مرحباً بك في أسوار جدة' }}</h3>
              <p class="text-xs text-slate-500 font-medium">{{ t('auth.welcome_desc') || 'أدخل بيانات حسابك للمتابعة والوصول لطلباتك' }}</p>
            </div>

            <!-- ERROR BANNER -->
            <div v-if="loginErrorMsg" class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-start gap-2">
              <svg class="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>{{ loginErrorMsg }}</span>
            </div>

            <!-- LOGIN FORM -->
            <form @submit.prevent="handleLoginSubmit" class="space-y-3.5">
              <!-- Email / Phone Identifier -->
              <div class="space-y-1">
                <label class="text-xs font-extrabold text-slate-700 block">
                  {{ t('auth.email_or_phone_placeholder') || 'البريد الإلكتروني أو رقم الجوال' }}
                </label>
                <div class="relative">
                  <input 
                    v-model="loginIdentifier"
                    type="text" 
                    required
                    placeholder="name@example.com / 05xxxxxxxx" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                    dir="ltr"
                  />
                  <div class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <i class="fa-regular fa-envelope text-xs"></i>
                  </div>
                </div>
              </div>

              <!-- Password & Show Toggle -->
              <div class="space-y-1">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-extrabold text-slate-700 block">
                    {{ t('auth.password_label') || 'كلمة المرور' }}
                  </label>
                  <NuxtLink 
                    :to="localePath('/forgot-password')" 
                    @click="closeLogin"
                    class="text-[11px] font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"
                  >
                    {{ t('auth.forgot_password') || 'نسيت كلمة المرور؟' }}
                  </NuxtLink>
                </div>
                <div class="relative">
                  <input 
                    v-model="loginPassword"
                    :type="showLoginPassword ? 'text' : 'password'" 
                    required
                    placeholder="••••••••" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                  <button 
                    type="button"
                    @click="showLoginPassword = !showLoginPassword"
                    class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                    :title="showLoginPassword ? 'إخفاء' : 'إظهار'"
                  >
                    <i :class="showLoginPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-xs"></i>
                  </button>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="isLoading"
                class="w-full py-3 px-4 bg-[#0B0E28] hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
              >
                <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{{ isLoading ? (t('auth.logging_in') || 'جاري تسجيل الدخول...') : (t('auth.login_btn') || 'تسجيل الدخول') }}</span>
              </button>
            </form>

            <!-- Switch to Register Tab Prompt -->
            <div class="pt-3 border-t border-slate-100 text-center text-xs text-slate-500 font-bold">
              <span>{{ t('auth.no_account') || 'ليس لديك حساب؟' }}</span>
              <button 
                type="button"
                @click="switchTab('register')"
                class="text-amber-600 hover:text-amber-700 font-extrabold underline underline-offset-4 ms-1 transition-colors cursor-pointer"
              >
                {{ t('auth.register_now') || 'إنشاء حساب جديد' }}
              </button>
            </div>
          </div>


          <!-- TAB 2: REGISTER FORM -->
          <div v-else-if="activeTab === 'register'" class="space-y-4">
            <div class="text-center space-y-1">
              <h3 class="text-base font-black text-slate-900">{{ t('auth.create_account') || 'إنشاء حساب جديد' }}</h3>
              <p class="text-xs text-slate-500 font-medium">{{ t('auth.welcome_new_desc') || 'سجل الآن للاستفادة من كافة العروض والخدمات' }}</p>
            </div>

            <!-- ERROR BANNER -->
            <div v-if="registerErrorMsg" class="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-start gap-2">
              <svg class="w-4 h-4 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
              <span>{{ registerErrorMsg }}</span>
            </div>

            <!-- REGISTER FORM -->
            <form @submit.prevent="handleRegisterSubmit" class="space-y-3">
              <!-- First & Last Name -->
              <div class="grid grid-cols-2 gap-2">
                <div class="space-y-1">
                  <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.first_name') || 'الاسم الأول' }}</label>
                  <input 
                    v-model="regFName"
                    type="text" 
                    required
                    placeholder="محمد" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
                <div class="space-y-1">
                  <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.last_name') || 'اسم العائلة' }}</label>
                  <input 
                    v-model="regLName"
                    type="text" 
                    required
                    placeholder="الغامدي" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-1">
                <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.email_label') || 'البريد الإلكتروني' }}</label>
                <input 
                  v-model="regEmail"
                  type="email" 
                  required
                  placeholder="name@example.com" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  dir="ltr"
                />
              </div>

              <!-- Phone Number -->
              <div class="space-y-1">
                <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.phone_placeholder') || 'رقم الجوال' }}</label>
                <input 
                  v-model="regPhone"
                  type="tel" 
                  required
                  placeholder="05xxxxxxxx" 
                  class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  dir="ltr"
                />
              </div>

              <!-- Password -->
              <div class="space-y-1">
                <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.password_label') || 'كلمة المرور' }}</label>
                <div class="relative">
                  <input 
                    v-model="regPassword"
                    :type="showRegPassword ? 'text' : 'password'" 
                    required
                    minlength="6"
                    placeholder="••••••••" 
                    class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                  />
                  <button 
                    type="button"
                    @click="showRegPassword = !showRegPassword"
                    class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                    :title="showRegPassword ? 'إخفاء' : 'إظهار'"
                  >
                    <i :class="showRegPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-xs"></i>
                  </button>
                </div>
              </div>

              <!-- Submit Button -->
              <button 
                type="submit" 
                :disabled="isLoading"
                class="w-full py-3 px-4 bg-[#0B0E28] hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer mt-2"
              >
                <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                <span>{{ isLoading ? (t('auth.creating_account') || 'جاري إنشاء الحساب...') : (t('auth.create_account_btn') || 'إنشاء الحساب') }}</span>
              </button>
            </form>

            <!-- Switch to Login Tab Prompt -->
            <div class="pt-3 border-t border-slate-100 text-center text-xs text-slate-500 font-bold">
              <span>{{ t('auth.have_account') || 'لديك حساب بالفعل؟' }}</span>
              <button 
                type="button"
                @click="switchTab('login')"
                class="text-amber-600 hover:text-amber-700 font-extrabold underline underline-offset-4 ms-1 transition-colors cursor-pointer"
              >
                {{ t('nav.login') || 'تسجيل الدخول' }}
              </button>
            </div>
          </div>

        </div>

        <!-- 4. Full Screen Page Alternative Link Footer -->
        <div class="p-4 border-t border-slate-100 bg-slate-50 text-center shrink-0">
          <NuxtLink 
            :to="localePath('/login')" 
            @click="closeLogin"
            class="text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors inline-flex items-center gap-1.5"
          >
            <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
            <span>الانتقال لصفحة تسجيل الدخول المخصصة</span>
          </NuxtLink>
        </div>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'
import { useAuthDrawer, type AuthDrawerMode } from '~/composables/useAuthDrawer'

const { isLoginOpen, authMode, closeLogin: drawerCloseLogin, setAuthMode } = useAuthDrawer()
const { login, register } = useAuth()
const toast = useToast()
const { t, layoutDirection, localePath } = useLanguage()

const activeTab = ref<AuthDrawerMode>('login')

// Sync tab with drawer mode
watch(() => authMode.value, (newMode) => {
  if (newMode) {
    activeTab.value = newMode
  }
}, { immediate: true })

const switchTab = (tab: AuthDrawerMode) => {
  activeTab.value = tab
  setAuthMode(tab)
  loginErrorMsg.value = ''
  registerErrorMsg.value = ''
}

// Form state - Login
const loginIdentifier = ref('')
const loginPassword = ref('')
const showLoginPassword = ref(false)
const loginErrorMsg = ref('')

// Form state - Register
const regFName = ref('')
const regLName = ref('')
const regEmail = ref('')
const regPhone = ref('')
const regPassword = ref('')
const showRegPassword = ref(false)
const registerErrorMsg = ref('')

const isLoading = ref(false)

const closeLogin = () => {
  drawerCloseLogin()
  loginErrorMsg.value = ''
  registerErrorMsg.value = ''
}

// Handle Login Submission
const handleLoginSubmit = async () => {
  loginErrorMsg.value = ''
  isLoading.value = true

  try {
    const res = await login({
      email_or_phone: loginIdentifier.value,
      password: loginPassword.value
    })

    if (res.success) {
      toast.success(t('auth.login_btn') || 'تسجيل الدخول', t('auth.welcome_back_title') || 'مرحباً بك مجدداً!')
      loginIdentifier.value = ''
      loginPassword.value = ''
      closeLogin()
    } else {
      loginErrorMsg.value = res.message || t('auth.login_error') || 'فشل تسجيل الدخول. يرجى التحقق من البيانات.'
    }
  } catch (err: any) {
    loginErrorMsg.value = err?.data?.message || err?.message || t('auth.login_error') || 'فشل تسجيل الدخول.'
  } finally {
    isLoading.value = false
  }
}

// Handle Register Submission
const handleRegisterSubmit = async () => {
  registerErrorMsg.value = ''
  isLoading.value = true

  try {
    const res = await register({
      f_name: regFName.value,
      l_name: regLName.value,
      email: regEmail.value,
      phone: regPhone.value,
      password: regPassword.value
    })

    if (res.success) {
      toast.success(t('auth.create_account') || 'إنشاء الحساب', t('auth.welcome_new_title') || 'تم إنشاء حسابك بنجاح!')
      regFName.value = ''
      regLName.value = ''
      regEmail.value = ''
      regPhone.value = ''
      regPassword.value = ''
      closeLogin()
    } else {
      registerErrorMsg.value = res.message || 'فشل إنشاء الحساب. يرجى التحقق من البيانات.'
    }
  } catch (err: any) {
    registerErrorMsg.value = err?.data?.message || err?.message || 'تعذر إنشاء الحساب.'
  } finally {
    isLoading.value = false
  }
}

// Scroll Lock Logic
const lockScroll = () => {
  if (typeof window === 'undefined') return
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.paddingRight = `${scrollbarWidth}px`
  document.documentElement.style.overflow = 'hidden'
  document.body.style.overflow = 'hidden'
}

const unlockScroll = () => {
  if (typeof window === 'undefined') return
  document.body.style.paddingRight = ''
  document.documentElement.style.overflow = ''
  document.body.style.overflow = ''
}

// Escape key to close
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && isLoginOpen.value) {
    closeLogin()
  }
}

watch(isLoginOpen, (newVal) => {
  if (newVal) {
    lockScroll()
    if (process.client) {
      window.addEventListener('keydown', handleKeydown)
    }
  } else {
    unlockScroll()
    if (process.client) {
      window.removeEventListener('keydown', handleKeydown)
    }
  }
})

onMounted(() => {
  if (isLoginOpen.value) {
    lockScroll()
  }
})

onUnmounted(() => {
  unlockScroll()
  if (process.client) {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
