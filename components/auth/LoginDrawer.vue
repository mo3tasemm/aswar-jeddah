<template>
  <Teleport to="body">
    <div class="relative z-[100]" aria-labelledby="login-drawer-title" role="dialog" aria-modal="true">
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
          <!-- Slide-over panel from LEFT (left-0) -->
          <div class="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
            <Transition
              enter-active-class="transform transition ease-in-out duration-300"
              enter-from-class="-translate-x-full"
              enter-to-class="translate-x-0"
              leave-active-class="transform transition ease-in-out duration-300"
              leave-from-class="translate-x-0"
              leave-to-class="-translate-x-full"
            >
              <div v-if="isLoginOpen" class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-white shadow-2xl dir-rtl">
                  
                  <!-- Drawer Header -->
                  <div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 class="text-xl font-bold text-slate-900" id="login-drawer-title">
                      تسجيل الدخول
                    </h2>
                    <button 
                      type="button" 
                      class="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm"
                      @click="closeLogin"
                    >
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <!-- Drawer Body (Form) -->
                  <div class="flex-1 overflow-y-auto p-6 space-y-6">
                    <form @submit.prevent="handleSubmit" class="space-y-5">
                      <!-- Username / Email -->
                      <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">
                          اسم المستخدم أو البريد الإلكتروني <span class="text-red-500">*</span>
                        </label>
                        <input 
                          v-model="email"
                          type="text" 
                          required
                          placeholder="أدخل البريد الإلكتروني أو اسم المستخدم"
                          class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 text-slate-900 text-sm outline-none transition-all"
                        />
                      </div>

                      <!-- Password with Eye Toggle -->
                      <div>
                        <label class="block text-xs font-bold text-slate-700 mb-2">
                          كلمة المرور <span class="text-red-500">*</span>
                        </label>
                        <div class="relative">
                          <input 
                            v-model="password"
                            :type="showPassword ? 'text' : 'password'" 
                            required
                            placeholder="أدخل كلمة المرور"
                            class="w-full px-4 py-3 pl-10 rounded-xl border border-slate-200 focus:border-slate-800 focus:ring-2 focus:ring-slate-900/10 text-slate-900 text-sm outline-none transition-all"
                          />
                          <button 
                            type="button" 
                            @click="showPassword = !showPassword"
                            class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors p-1"
                            title="إظهار/إخفاء كلمة المرور"
                          >
                            <!-- Eye Open -->
                            <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                              <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <!-- Eye Slash -->
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <!-- Log In Submit Button -->
                      <button 
                        type="submit"
                        class="w-full py-3.5 px-4 bg-[#0B0E28] hover:bg-slate-900 text-white font-bold rounded-xl shadow-md transition-all duration-300 mt-2"
                      >
                        Log In
                      </button>

                      <!-- Options (Remember me + Forgot password) -->
                      <div class="flex items-center justify-between text-xs pt-1">
                        <label class="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                          <input 
                            type="checkbox" 
                            v-model="rememberMe"
                            class="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                          />
                          <span>تذكر بيانات الدخول</span>
                        </label>

                        <a href="#" class="text-amber-600 hover:text-amber-700 font-bold transition-colors">
                          نسيت كلمة المرور؟
                        </a>
                      </div>
                    </form>
                  </div>

                  <!-- Drawer Footer (Create Account) -->
                  <div class="border-t border-slate-100 p-6 bg-slate-50/70 flex items-center justify-between">
                    <div class="flex items-center gap-2 text-slate-700 text-sm">
                      <div class="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                        </svg>
                      </div>
                      <span class="font-medium">ليس لديك حساب؟</span>
                    </div>

                    <a href="#" class="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-4 py-2 rounded-xl transition-colors">
                      إنشاء حساب جديد
                    </a>
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
import { ref } from 'vue';
import { useAuthDrawer } from '~/composables/useAuthDrawer';

const { isLoginOpen, closeLogin } = useAuthDrawer();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const rememberMe = ref(false);

const handleSubmit = () => {
  // Simple mock login logic
  alert(`تم تسجيل الدخول بنجاح لـ ${email.value}`);
  closeLogin();
};
</script>
