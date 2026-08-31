<template>
  <div class="login-page-wrapper selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- SECTION 1: SLIDING AUTH FORM CONTAINER -->
    <section class="auth-section flex-col py-8 sm:py-12 px-4">
      
      <!-- Mobile & Tablet Quick Switch Tabs -->
      <div class="lg:hidden flex w-full max-w-sm mx-auto mb-6 bg-white rounded-2xl shadow-sm border border-slate-200/80 p-1">
        <button 
          type="button"
          @click="isRightPanelActive = false" 
          class="flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          :class="!isRightPanelActive ? 'bg-[#0B0E28] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
        >
          <i class="fa-solid fa-arrow-right-to-bracket text-xs" :class="!isRightPanelActive ? 'text-amber-400' : 'text-slate-400'"></i>
          <span>{{ t('auth.login_tab') || 'تسجيل الدخول' }}</span>
        </button>
        <button 
          type="button"
          @click="isRightPanelActive = true" 
          class="flex-1 py-2.5 text-xs sm:text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
          :class="isRightPanelActive ? 'bg-[#0B0E28] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'"
        >
          <i class="fa-solid fa-user-plus text-xs" :class="isRightPanelActive ? 'text-amber-400' : 'text-slate-400'"></i>
          <span>{{ t('auth.register_tab') || 'إنشاء حساب' }}</span>
        </button>
      </div>

      <!-- Main Animated Card Container -->
      <div 
        class="auth-slider-container" 
        :class="{ 'right-panel-active': isRightPanelActive }" 
        id="auth-container" 
        dir="ltr"
      >
        
        <!-- ================= 1. SIGN UP FORM PANEL ================= -->
        <div class="auth-form-panel sign-up-panel" :dir="layoutDirection">
          <form @submit.prevent="handleSignUp" class="auth-form">
            <h1 class="auth-title">{{ t('auth.create_account') || 'إنشاء حساب جديد' }}</h1>
            <p class="auth-desc">{{ t('auth.welcome_new_desc') || 'أدخل بياناتك للتسجيل والاستمتاع بأفضل العروض' }}</p>

            <!-- Error Banner -->
            <div v-if="registerError" class="w-full my-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
              <i class="fa-solid fa-circle-exclamation shrink-0"></i>
              <span>{{ registerError }}</span>
            </div>

            <!-- Form Inputs -->
            <div class="grid grid-cols-2 gap-2 w-full">
              <input 
                type="text" 
                :placeholder="t('auth.first_name') || 'الاسم الأول'" 
                v-model="signUpForm.f_name" 
                required 
                class="auth-input"
              />
              <input 
                type="text" 
                :placeholder="t('auth.last_name') || 'اسم العائلة'" 
                v-model="signUpForm.l_name" 
                required 
                class="auth-input"
              />
            </div>

            <input 
              type="email" 
              :placeholder="t('auth.email_placeholder') || 'البريد الإلكتروني'" 
              v-model="signUpForm.email" 
              required 
              dir="ltr"
              class="auth-input"
            />

            <input 
              type="tel" 
              :placeholder="t('auth.phone_placeholder') || 'رقم الجوال (05xxxxxxxx)'" 
              v-model="signUpForm.phone" 
              required 
              dir="ltr" 
              class="auth-input" 
            />

            <div class="relative w-full">
              <input 
                :type="showRegisterPassword ? 'text' : 'password'" 
                :placeholder="t('auth.password_placeholder') || 'كلمة المرور (6 خانات فأكثر)'" 
                v-model="signUpForm.password" 
                required 
                minlength="6" 
                class="auth-input pe-10"
              />
              <button 
                type="button"
                @click="showRegisterPassword = !showRegisterPassword"
                class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 cursor-pointer p-1"
                :title="showRegisterPassword ? 'إخفاء' : 'إظهار'"
              >
                <i :class="showRegisterPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'" class="text-xs"></i>
              </button>
            </div>

            <button type="submit" :disabled="registerPending" class="auth-btn-primary w-full mt-3 flex items-center justify-center gap-2">
              <svg v-if="registerPending" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ registerPending ? (t('auth.creating_account') || 'جاري إنشاء الحساب...') : (t('auth.create_account_btn') || 'إنشاء الحساب') }}</span>
            </button>

            <!-- Bottom Inline Switcher for all viewports -->
            <div class="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500 font-bold w-full">
              <span>{{ t('auth.have_account') || 'لديك حساب بالفعل؟' }}</span>
              <button 
                type="button" 
                @click="isRightPanelActive = false" 
                class="text-amber-600 hover:text-amber-700 font-extrabold underline underline-offset-4 ms-1 transition-colors cursor-pointer"
              >
                {{ t('auth.login_tab') || 'تسجيل الدخول' }}
              </button>
            </div>
          </form>
        </div>


        <!-- ================= 2. SIGN IN FORM PANEL ================= -->
        <div class="auth-form-panel sign-in-panel" :dir="layoutDirection">
          <form @submit.prevent="handleSignIn" class="auth-form">
            <h1 class="auth-title">{{ t('auth.login_title') || 'تسجيل الدخول' }}</h1>
            <p class="auth-desc">{{ t('auth.welcome_desc') || 'أهلاً بك مجدداً! أدخل بيانات حسابك للمتابعة' }}</p>

            <!-- Error Banner -->
            <div v-if="loginError" class="w-full my-2 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold flex items-center gap-2">
              <i class="fa-solid fa-circle-exclamation shrink-0"></i>
              <span>{{ loginError }}</span>
            </div>

            <!-- Email or Phone -->
            <input 
              type="text" 
              :placeholder="t('auth.email_or_phone_placeholder') || 'البريد الإلكتروني أو رقم الجوال'" 
              v-model="signInForm.email" 
              required 
              dir="ltr"
              class="auth-input"
            />

            <!-- Password & Show Toggle -->
            <div class="relative w-full">
              <input 
                :type="showLoginPassword ? 'text' : 'password'" 
                :placeholder="t('auth.password_label') || 'كلمة المرور'" 
                v-model="signInForm.password" 
                required 
                class="auth-input pe-10"
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
            
            <div class="w-full flex justify-end">
              <NuxtLink 
                :to="localePath('/forgot-password')" 
                class="text-xs font-bold text-slate-600 hover:text-amber-600 my-1 transition-colors"
              >
                {{ t('auth.forgot_password') || 'نسيت كلمة المرور؟' }}
              </NuxtLink>
            </div>
            
            <button type="submit" :disabled="loginPending" class="auth-btn-primary w-full mt-2 flex items-center justify-center gap-2">
              <svg v-if="loginPending" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ loginPending ? (t('auth.logging_in') || 'جاري تسجيل الدخول...') : (t('auth.login_btn') || 'تسجيل الدخول') }}</span>
            </button>

            <!-- Bottom Inline Switcher for all viewports -->
            <div class="mt-4 pt-3 border-t border-slate-100 text-center text-xs text-slate-500 font-bold w-full">
              <span>{{ t('auth.no_account') || 'ليس لديك حساب؟' }}</span>
              <button 
                type="button" 
                @click="isRightPanelActive = true" 
                class="text-amber-600 hover:text-amber-700 font-extrabold underline underline-offset-4 ms-1 transition-colors cursor-pointer"
              >
                {{ t('auth.register_now') || 'إنشاء حساب جديد' }}
              </button>
            </div>
          </form>
        </div>


        <!-- ================= 3. ANIMATED OVERLAY SLIDER (Desktop >= lg) ================= -->
        <div class="auth-overlay-container hidden lg:block" dir="ltr">
          <div class="auth-overlay">
            
            <!-- OVERLAY LEFT (Visible when Sign Up is active -> switch to Sign In) -->
            <div class="auth-overlay-panel auth-overlay-left" :dir="layoutDirection">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="auth-overlay-logo" />
              <h2 class="text-xl font-black text-white mb-2">{{ t('auth.welcome_back_title') || 'مرحباً بك مجدداً!' }}</h2>
              <p class="text-xs text-slate-300 leading-relaxed max-w-xs mb-6">
                {{ t('auth.welcome_back_desc') || 'للبقاء على اتصال معنا يرجى تسجيل الدخول بمعلوماتك الشخصية' }}
              </p>
              <button type="button" class="auth-btn-ghost cursor-pointer" id="signInBtn" @click="isRightPanelActive = false">
                <i class="fa-solid fa-arrow-right-to-bracket me-2 text-amber-400"></i>
                <span>{{ t('auth.login_tab') || 'تسجيل الدخول' }}</span>
              </button>
            </div>

            <!-- OVERLAY RIGHT (Visible when Sign In is active -> switch to Sign Up) -->
            <div class="auth-overlay-panel auth-overlay-right" :dir="layoutDirection">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="auth-overlay-logo" />
              <h2 class="text-xl font-black text-white mb-2">{{ t('auth.welcome_new_title') || 'مرحباً بك معنا!' }}</h2>
              <p class="text-xs text-slate-300 leading-relaxed max-w-xs mb-6">
                {{ t('auth.welcome_new_desc') || 'أدخل بياناتك الشخصية وابدأ رحلة التسوق المميزة معنا في أسوار جدة' }}
              </p>
              <button type="button" class="auth-btn-ghost cursor-pointer" id="signUpBtn" @click="isRightPanelActive = true">
                <i class="fa-solid fa-user-plus me-2 text-amber-400"></i>
                <span>{{ t('auth.register_now') || 'إنشاء حساب جديد' }}</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>

    <!-- SECTION 2: STORE FEATURES BAR -->
    <section class="w-full bg-white border-t border-slate-200">
      <HomeStoreFeaturesBar/>
    </section>

    <!-- SECTION 3: LOCATION SHOWCASE -->
    <section class="w-full bg-slate-50">
      <HomeStoreLocationShowcase/>
    </section>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection, localePath } = useLanguage()

useHead({
  title: computed(() => t('auth.login_register_title') || 'تسجيل الدخول / إنشاء حساب | أسوار جدة')
})

const { login, register, isLoggedIn } = useAuth()
const toast = useToast()
const route = useRoute()

const targetPath = computed(() => {
  const q = route.query.redirect as string
  return q ? decodeURIComponent(q) : localePath('/my-account')
})

// Redirect if user is already logged in
if (isLoggedIn.value) {
  navigateTo(targetPath.value)
}

const isRightPanelActive = ref(false)
const showLoginPassword = ref(false)
const showRegisterPassword = ref(false)

onMounted(() => {
  if (route.query.mode === 'register') {
    isRightPanelActive.value = true
  }
})

const loginPending = ref(false)
const loginError = ref<string | null>(null)

const registerPending = ref(false)
const registerError = ref<string | null>(null)

const signInForm = reactive({ email: '', password: '' })
const signUpForm = reactive({ f_name: '', l_name: '', email: '', phone: '', password: '' })

const handleSignIn = async () => {
  loginError.value = null
  loginPending.value = true

  try {
    const res = await login({
      email_or_phone: signInForm.email,
      password: signInForm.password
    })

    if (res.success) {
      toast.success(t('auth.login_btn') || 'تسجيل الدخول', t('auth.welcome_back_title') || 'مرحباً بك مجدداً!')
      navigateTo(targetPath.value)
    } else {
      loginError.value = res.message || t('auth.login_error') || 'فشل تسجيل الدخول.'
      toast.error(t('auth.login_title') || 'تسجيل الدخول', loginError.value)
    }
  } catch (err: any) {
    loginError.value = err?.data?.message || err?.message || t('auth.login_error') || 'فشل تسجيل الدخول.'
    toast.error(t('auth.login_title') || 'تسجيل الدخول', loginError.value)
  } finally {
    loginPending.value = false
  }
}

const handleSignUp = async () => {
  registerError.value = null
  registerPending.value = true

  try {
    const res = await register({
      f_name: signUpForm.f_name,
      l_name: signUpForm.l_name,
      email: signUpForm.email,
      phone: signUpForm.phone,
      password: signUpForm.password
    })

    if (res.success) {
      toast.success(t('auth.create_account') || 'إنشاء الحساب', t('auth.welcome_new_title') || 'تم إنشاء الحساب بنجاح!')
      navigateTo(targetPath.value)
    } else {
      registerError.value = res.message || 'فشل إنشاء الحساب.'
      toast.error(t('auth.create_account') || 'إنشاء الحساب', registerError.value)
    }
  } catch (err: any) {
    registerError.value = err?.data?.message || err?.message || 'تعذر الاتصال بالسيرفر. يرجى المحاولة لاحقاً.'
    toast.error(t('auth.create_account') || 'إنشاء الحساب', registerError.value)
  } finally {
    registerPending.value = false
  }
}
</script>

<style scoped>
.login-page-wrapper {
  background-color: #f8fafc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 80vh;
}

.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.auth-title {
  font-weight: 900;
  font-size: 22px;
  color: #0B0E28;
  margin-bottom: 4px;
}

.auth-desc {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  margin-bottom: 14px;
  color: #64748b;
  text-align: center;
}

.auth-input {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 11px 14px;
  margin: 4px 0;
  width: 100%;
  font-size: 13px;
  font-weight: 700;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
}

.auth-input:focus {
  border-color: #f59e0b;
  background-color: #fff;
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.15);
}

.auth-btn-primary {
  border-radius: 12px;
  border: none;
  background-color: #0B0E28;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: 800;
  padding: 13px 28px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(11, 14, 40, 0.15);
}

.auth-btn-primary:hover {
  background-color: #1a204c;
}

.auth-btn-primary:active {
  transform: scale(0.98);
}

.auth-btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.auth-btn-ghost {
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: #FFFFFF;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 800;
  padding: 11px 30px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.auth-btn-ghost:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: #FFFFFF;
}

/* ================= CONTAINER & SLIDING LAYOUT ================= */
.auth-slider-container {
  background-color: #fff;
  border-radius: 28px;
  box-shadow: 0 20px 40px -15px rgba(11, 14, 40, 0.12), 0 0 1px 1px rgba(11, 14, 40, 0.05);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 560px;
}

.auth-form-panel {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 30px 40px;
  height: 100%;
  width: 100%;
  text-align: center;
}

/* Sign In Panel (Left side by default) */
.sign-in-panel {
  left: 0;
  width: 50%;
  z-index: 2;
  opacity: 1;
}

.auth-slider-container.right-panel-active .sign-in-panel {
  transform: translateX(100%);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

/* Sign Up Panel (Hidden behind left by default) */
.sign-up-panel {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.auth-slider-container.right-panel-active .sign-up-panel {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  pointer-events: auto;
}

/* ================= OVERLAY SLIDER ================= */
.auth-overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 100;
}

.auth-slider-container.right-panel-active .auth-overlay-container {
  transform: translateX(-100%);
}

.auth-overlay {
  background: #0B0E28;
  background: linear-gradient(135deg, #0B0E28 0%, #151b47 50%, #0B0E28 100%);
  color: #FFFFFF;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-slider-container.right-panel-active .auth-overlay {
  transform: translateX(50%);
}

.auth-overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.auth-overlay-left {
  transform: translateX(-20%);
}

.auth-slider-container.right-panel-active .auth-overlay-left {
  transform: translateX(0);
}

.auth-overlay-right {
  right: 0;
  transform: translateX(0);
}

.auth-slider-container.right-panel-active .auth-overlay-right {
  transform: translateX(20%);
}

.auth-overlay-logo {
  max-width: 130px;
  height: auto;
  margin-bottom: 20px;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4));
}

/* ================= RESPONSIVE FOR MOBILE / TABLET (< 1024px) ================= */
@media (max-width: 1023px) {
  .auth-slider-container {
    min-height: 520px;
    width: 100%;
    max-width: 480px;
    border-radius: 20px;
  }

  .auth-form-panel {
    width: 100%;
    transform: none !important;
  }

  .sign-in-panel {
    z-index: 2;
    opacity: 1;
    pointer-events: auto;
  }

  .sign-up-panel {
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }

  .auth-slider-container.right-panel-active .sign-in-panel {
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  }

  .auth-slider-container.right-panel-active .sign-up-panel {
    opacity: 1;
    z-index: 2;
    pointer-events: auto;
  }

  .auth-form {
    padding: 24px 20px;
  }
}
</style>
