<template>
  <Teleport to="body">
    <div 
      v-if="isLoginOpen" 
      class="relative z-[999]" 
      aria-labelledby="login-drawer-title" 
      role="dialog" 
      aria-modal="true"
    >
      <!-- Backdrop -->
      <Transition
        enter-active-class="ease-in-out duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="ease-in-out duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="isLoginOpen" 
          class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity" 
          @click="closeLogin"
        ></div>
      </Transition>

      <div class="fixed inset-0 overflow-hidden pointer-events-none">
        <div class="absolute inset-0 overflow-hidden">
          <!-- Mirror Slide Panel: Left in RTL (Arabic), Right in LTR (English) -->
          <div 
            class="pointer-events-none fixed inset-y-0 flex max-w-full"
            :class="layoutDirection === 'rtl' ? 'left-0 pr-10' : 'right-0 pl-10'"
          >
            <Transition
              enter-active-class="transform transition ease-in-out duration-300"
              :enter-from-class="layoutDirection === 'rtl' ? '-translate-x-full' : 'translate-x-full'"
              enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in-out duration-300"
              leave-from-class="translate-x-0"
              :leave-to-class="layoutDirection === 'rtl' ? '-translate-x-full' : 'translate-x-full'"
            >
              <div v-if="isLoginOpen" class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-white shadow-2xl" :dir="layoutDirection">
                  
                  <!-- Drawer Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 class="text-xl font-bold text-slate-900" id="login-drawer-title">
                      {{ t('nav.login') }}
                    </h2>
                    <button 
                      type="button" 
                      class="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm cursor-pointer"
                      @click="closeLogin"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Form Body -->
                  <div class="flex-1 overflow-y-auto p-6 space-y-6">
                    <div class="text-center space-y-2">
                      <div class="w-14 h-14 bg-amber-400/20 text-[#0B0E28] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-400/30 shadow-inner">
                        <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <h3 class="text-lg font-black text-slate-900">{{ t('auth.welcome_title') }}</h3>
                      <p class="text-xs text-slate-500 font-medium">{{ t('auth.welcome_desc') }}</p>
                    </div>

                    <!-- ERROR BANNER -->
                    <div v-if="errorMsg" class="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2">
                      <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                      <span>{{ errorMsg }}</span>
                    </div>

                    <!-- LOGIN FORM -->
                    <form @submit.prevent="handleLogin" class="space-y-4">
                      <!-- Email Address -->
                      <div class="space-y-1.5">
                        <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.email_label') }}</label>
                        <input 
                          v-model="email"
                          type="email" 
                          required
                          placeholder="name@example.com" 
                          class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                          dir="ltr"
                        />
                      </div>

                      <!-- Password & Forgot Password Link -->
                      <div class="space-y-1.5">
                        <div class="flex items-center justify-between">
                          <label class="text-xs font-extrabold text-slate-700 block">{{ t('auth.password_label') }}</label>
                          <NuxtLink 
                            to="/forgot-password" 
                            @click="closeLogin"
                            class="text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors cursor-pointer"
                          >
                            {{ t('auth.forgot_password') }}
                          </NuxtLink>
                        </div>
                        <input 
                          v-model="password"
                          type="password" 
                          required
                          placeholder="••••••••" 
                          class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"
                        />
                      </div>

                      <!-- Submit Button -->
                      <button 
                        type="submit" 
                        :disabled="isLoading"
                        class="w-full py-3.5 px-6 bg-[#0B0E28] hover:bg-slate-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                      >
                        <span v-if="isLoading" class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>{{ isLoading ? t('auth.logging_in') : t('auth.login_btn') }}</span>
                      </button>
                    </form>

                    <!-- REGISTER NEW ACCOUNT LINK FOOTER (Navigates to /login) -->
                    <div class="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-1.5">
                      <span>{{ t('auth.no_account') }}</span>
                      <NuxtLink 
                        to="/login" 
                        @click="closeLogin"
                        class="text-amber-600 hover:text-amber-500 font-extrabold underline underline-offset-4 transition-colors cursor-pointer"
                      >
                        {{ t('auth.register_now') }}
                      </NuxtLink>
                    </div>
                  </div>

                </div>
              </div>
            </Transition>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useLanguage } from '~/composables/useLanguage'

const props = defineProps<{
  isLoginOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const { login } = useAuth()
const { t, layoutDirection } = useLanguage()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMsg = ref('')

const closeLogin = () => {
  emit('close')
}

const handleLogin = async () => {
  errorMsg.value = ''
  isLoading.value = true

  try {
    const success = await login({ email: email.value, password: password.value })
    if (success) {
      closeLogin()
    } else {
      errorMsg.value = t('auth.login_error')
    }
  } catch (err: any) {
    errorMsg.value = err?.data?.message || t('auth.login_error')
  } finally {
    isLoading.value = false
  }
}
</script>
