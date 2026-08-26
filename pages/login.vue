<template>
  <div class="login-page-wrapper selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- SECTION 1: SLIDING AUTH FORM CONTAINER -->
    <section class="auth-section flex-col">
      
      <!-- Mobile Tabs (Visible only on smaller screens since the overlay is hidden) -->
      <div class="md:hidden flex w-full max-w-sm mx-auto mb-6 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <button 
          @click="isRightPanelActive = false" 
          class="flex-1 py-3 text-sm font-bold transition-colors cursor-pointer"
          :class="!isRightPanelActive ? 'bg-[#0B0E28] text-white' : 'text-slate-500 hover:bg-slate-50'"
        >
          {{ t('auth.login_tab') }}
        </button>
        <button 
          @click="isRightPanelActive = true" 
          class="flex-1 py-3 text-sm font-bold transition-colors cursor-pointer"
          :class="isRightPanelActive ? 'bg-[#0B0E28] text-white' : 'text-slate-500 hover:bg-slate-50'"
        >
          {{ t('auth.register_tab') }}
        </button>
      </div>

      <!-- Container forced with dir="ltr" internally for coordinate stability, while inner forms adopt layoutDirection -->
      <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container" dir="ltr">
        
        <!-- SIGN UP CONTAINER -->
        <div class="form-container sign-up-container" :dir="layoutDirection">
          <form @submit.prevent="handleSignUp">
            <h1 class="title">{{ t('auth.create_account') }}</h1>
            <div class="social-container">
              <a href="#" class="social" title="Google">
                <svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </a>
              <a href="#" class="social" title="Apple">
                <svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </a>
            </div>
            <span>{{ t('auth.or_register_with') }}</span>

            <!-- Error Banner -->
            <div v-if="registerError" class="w-full my-2 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
              {{ registerError }}
            </div>

            <div class="grid grid-cols-2 gap-2 w-full">
              <input type="text" :placeholder="t('auth.first_name')" v-model="signUpForm.f_name" required />
              <input type="text" :placeholder="t('auth.last_name')" v-model="signUpForm.l_name" required />
            </div>
            <input type="email" :placeholder="t('auth.email_placeholder')" v-model="signUpForm.email" required />
            <input type="tel" :placeholder="t('auth.phone_placeholder')" v-model="signUpForm.phone" required dir="ltr" class="text-start" />
            <input type="password" :placeholder="t('auth.password_placeholder')" v-model="signUpForm.password" required minlength="6" />

            <button type="submit" :disabled="registerPending" class="btn-primary flex items-center justify-center gap-2">
              <svg v-if="registerPending" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ registerPending ? t('auth.creating_account') : t('auth.create_account_btn') }}</span>
            </button>
          </form>
        </div>

        <!-- SIGN IN CONTAINER -->
        <div class="form-container sign-in-container" :dir="layoutDirection">
          <form @submit.prevent="handleSignIn">
            <h1 class="title">{{ t('auth.login_title') }}</h1>
            <div class="social-container">
              <a href="#" class="social" title="Google">
                <svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </a>
              <a href="#" class="social" title="Apple">
                <svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </a>
            </div>
            <span>{{ t('auth.or_login_with') }}</span>

            <!-- Error Banner -->
            <div v-if="loginError" class="w-full my-2 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">
              {{ loginError }}
            </div>

            <input type="text" :placeholder="t('auth.email_or_phone_placeholder')" v-model="signInForm.email" required />
            <input type="password" :placeholder="t('auth.password_label')" v-model="signInForm.password" required />
            
            <NuxtLink to="/forgot-password" class="forgot-link text-xs font-bold text-slate-700 hover:text-amber-600 my-2 transition-colors">
              {{ t('auth.forgot_password') }}
            </NuxtLink>
            
            <button type="submit" :disabled="loginPending" class="btn-primary flex items-center justify-center gap-2">
              <svg v-if="loginPending" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              <span>{{ loginPending ? t('auth.logging_in') : t('auth.login_btn') }}</span>
            </button>
          </form>
        </div>

        <!-- OVERLAY CONTAINER -->
        <div class="overlay-container hidden md:block" style="z-index: 100;" :dir="layoutDirection">
          <div class="overlay">
            
            <!-- OVERLAY LEFT (Appears when switching to Sign In) -->
            <div class="overlay-panel overlay-left">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="overlay-logo" />
              <h1>{{ t('auth.welcome_back_title') }}</h1>
              <p>{{ t('auth.welcome_back_desc') }}</p>
              <button class="ghost cursor-pointer" id="signIn" @click="isRightPanelActive = false">
                {{ t('auth.login_tab') }}
              </button>
            </div>

            <!-- OVERLAY RIGHT (Appears when switching to Sign Up) -->
            <div class="overlay-panel overlay-right">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="overlay-logo" />
              <h1>{{ t('auth.welcome_new_title') }}</h1>
              <p>{{ t('auth.welcome_new_desc') }}</p>
              <button class="ghost cursor-pointer" id="signUp" @click="isRightPanelActive = true">
                {{ t('auth.register_now') }}
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
import { authApiService } from '~/services/authApiService'
import { useAuth } from '~/composables/useAuth'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection } = useLanguage()

useHead({
  title: computed(() => t('auth.login_register_title'))
})

const { setAuth, isLoggedIn } = useAuth()
const toast = useToast()
const route = useRoute()

const targetPath = computed(() => {
  const q = route.query.redirect as string
  return q ? decodeURIComponent(q) : '/my-account'
})

// Redirect if user is already logged in
if (isLoggedIn.value) {
  navigateTo(targetPath.value)
}

const isRightPanelActive = ref(false)

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
    const res = await authApiService.login({
      email_or_phone: signInForm.email,
      password: signInForm.password
    })

    if (res.success && res.token) {
      setAuth(res.token, res.user)
      toast.success(t('auth.login_btn'), t('auth.welcome_back_title'))
      navigateTo(targetPath.value)
    } else {
      loginError.value = res.message || t('auth.login_error')
      toast.error(t('auth.login_title'), loginError.value)
    }
  } catch (err: any) {
    loginError.value = t('auth.login_error')
    toast.error(t('auth.login_title'), loginError.value)
  } finally {
    loginPending.value = false
  }
}

const handleSignUp = async () => {
  registerError.value = null
  registerPending.value = true

  try {
    const res = await authApiService.register({
      f_name: signUpForm.f_name,
      l_name: signUpForm.l_name,
      email: signUpForm.email,
      phone: signUpForm.phone,
      password: signUpForm.password
    })

    if (res.success) {
      if (res.token) {
        setAuth(res.token, res.user)
        toast.success(t('auth.create_account'), t('auth.welcome_new_title'))
        navigateTo(targetPath.value)
      } else {
        toast.success(t('auth.create_account'), t('auth.welcome_new_title'))
        isRightPanelActive.value = false
      }
    } else {
      registerError.value = res.message || 'فشل إنشاء الحساب.'
      toast.error(t('auth.create_account'), registerError.value)
    }
  } catch (err: any) {
    registerError.value = 'تعذر الاتصال بالسيرفر. يرجى المحاولة لاحقاً.'
    toast.error(t('auth.create_account'), registerError.value)
  } finally {
    registerPending.value = false
  }
}
</script>
