<template>
  <div 
    class="min-h-screen w-full bg-[#F8F9FA] text-slate-900 flex items-center justify-center p-4 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden" 
    :dir="isRtl ? 'rtl' : 'ltr'"
  >
    <!-- Top Ambient Accent Line -->
    <div class="h-1.5 bg-gradient-to-r from-[#0B0E28] via-amber-400 to-[#0B0E28] w-full fixed top-0 left-0 right-0 z-30"></div>

    <!-- MAIN CENTERED COMPACT CONTAINER (max-w-md w-full mx-auto ~ 440px) -->
    <div class="w-full max-w-md mx-auto flex flex-col items-center justify-center relative z-10 py-6">
      
      <!-- WHITE ADMIN LOGIN CARD -->
      <div class="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,14,40,0.06)] border border-slate-100 space-y-6 relative overflow-hidden">
        
        <!-- Subtle Top Glow Accent -->
        <div class="absolute -top-12 start-1/2 -translate-x-1/2 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none"></div>

        <!-- LOGO & BRANDING HEADER -->
        <div class="text-center space-y-2 relative z-10">
          <NuxtLink to="/" class="inline-block mb-1 transition-transform hover:scale-105">
            <img 
              src="~/assets/images/Logo.png" 
              alt="أسوار جدة - Aswar Jeddah" 
              class="h-11 sm:h-12 mx-auto object-contain" 
            />
          </NuxtLink>
          
          <h1 class="text-xl sm:text-2xl font-black text-[#0B0E28] tracking-tight">
            {{ isRtl ? 'لوحة تحكم المسؤولين' : 'Admin Control Panel' }}
          </h1>
          <p class="text-xs text-slate-500 font-medium">
            {{ isRtl ? 'بوابة الإدارة المركزية للمتجر' : 'Central Store Management Gateway' }}
          </p>
        </div>

        <!-- FORM & VALIDATION ERROR ALERT -->
        <form @submit.prevent="handleAdminLogin" class="space-y-4 relative z-10" novalidate>
          
          <!-- Validation Error Message Banner -->
          <div v-if="errorMessage" class="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2.5 animate-shake">
            <svg class="w-4 h-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <span>{{ errorMessage }}</span>
          </div>

          <!-- 1. Email Field -->
          <div class="space-y-1.5 text-start">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              {{ isRtl ? 'البريد الإلكتروني للمسؤول' : 'Admin Email Address' }}
              <span class="text-rose-500 ms-0.5">*</span>
            </label>
            <div class="relative">
              <input 
                type="email" 
                v-model="email"
                @input="clearError"
                class="w-full bg-slate-50 border rounded-xl px-4 py-3 pe-12 text-sm text-[#0B0E28] placeholder-slate-400 font-medium focus:outline-none transition-all"
                :class="emailError ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'"
                placeholder="admin@aswarjeddah.com"
                dir="ltr"
              />
              <div class="absolute inset-y-0 end-0 pe-4 flex items-center pointer-events-none text-slate-400">
                <svg class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
            </div>
            <p v-if="emailError" class="text-[11px] font-bold text-rose-500 mt-1">{{ emailError }}</p>
          </div>

          <!-- 2. Password Field -->
          <div class="space-y-1.5 text-start">
            <label class="text-xs font-extrabold text-[#0B0E28] block">
              {{ isRtl ? 'كلمة المرور' : 'Password' }}
              <span class="text-rose-500 ms-0.5">*</span>
            </label>
            <div class="relative">
              <input 
                :type="showPassword ? 'text' : 'password'" 
                v-model="password"
                @input="clearError"
                class="w-full bg-slate-50 border rounded-xl px-4 py-3 pe-11 text-sm text-[#0B0E28] placeholder-slate-400 font-medium focus:outline-none transition-all"
                :class="passwordError ? 'border-rose-500 focus:ring-2 focus:ring-rose-500/20' : 'border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20'"
                placeholder="••••••••••••"
                dir="ltr"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-[#0B0E28] transition-colors cursor-pointer"
                tabindex="-1"
              >
                <svg v-if="showPassword" class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <svg v-else class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <line x1="1" y1="1" x2="23" y2="23"></line>
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"></path>
                </svg>
              </button>
            </div>
            <p v-if="passwordError" class="text-[11px] font-bold text-rose-500 mt-1">{{ passwordError }}</p>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3"
          >
            <span v-if="isSubmitting" class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin"></span>
            <svg v-else-if="isRtl" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <svg v-else class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            <span>
              {{ isSubmitting ? (isRtl ? 'جاري المصادقة والدخول...' : 'Authenticating...') : (isRtl ? 'تسجيل الدخول كمسؤول' : 'Login as Admin') }}
            </span>
          </button>

        </form>

      </div>

      <!-- FOOTER BELOW CARD -->
      <footer class="mt-6 text-center text-xs text-slate-500 font-bold space-y-1">
        <p>{{ isRtl ? 'أسوار جدة © 2026 — جميع الحقوق محفوظة' : 'Aswar Jeddah © 2026 — All Rights Reserved' }}</p>
        <NuxtLink to="/" class="inline-flex items-center gap-1 text-[#0B0E28] hover:text-amber-600 transition-colors">
          <svg v-if="isRtl" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          <svg v-else class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 19 5 12 12 19"></polyline></svg>
          <span>{{ isRtl ? 'العودة للمتجر الرئيسي' : 'Return to Main Store' }}</span>
        </NuxtLink>
      </footer>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { adminAuthApiService } from '~/services/adminAuthApiService';
import { useAdminAuth } from '~/composables/useAdminAuth';
import { useToast } from '~/composables/useToast';
import { useLanguage } from '~/composables/useLanguage';

definePageMeta({
  layout: 'empty'
});

useHead({
  title: 'تسجيل دخول المسؤولين | أسوار جدة'
});

const route = useRoute();
const toast = useToast();
const { isRtl } = useLanguage();
const { setAdminAuth, isAdminLoggedIn } = useAdminAuth();

// Redirect if already logged in as Admin
if (isAdminLoggedIn.value) {
  const target = (route.query.redirect as string) || '/admin';
  navigateTo(target);
}

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const isSubmitting = ref(false);

const emailError = ref('');
const passwordError = ref('');
const errorMessage = ref('');

const clearError = () => {
  emailError.value = '';
  passwordError.value = '';
  errorMessage.value = '';
};

const validateForm = () => {
  clearError();
  let valid = true;

  const trimmedEmail = email.value.trim();
  if (!trimmedEmail) {
    emailError.value = isRtl.value ? 'يرجى كتابة البريد الإلكتروني للمسؤول.' : 'Please enter admin email.';
    valid = false;
  } else if (!trimmedEmail.includes('@') || !trimmedEmail.includes('.')) {
    emailError.value = isRtl.value ? 'يرجى كتابة عنوان بريد إلكتروني بشكل صحيح.' : 'Please enter a valid email address.';
    valid = false;
  }

  if (!password.value) {
    passwordError.value = isRtl.value ? 'يرجى كتابة كلمة المرور الخاصة بالمسؤول.' : 'Please enter admin password.';
    valid = false;
  } else if (password.value.length < 6) {
    passwordError.value = isRtl.value ? 'يجب ألا تقل كلمة المرور عن 6 أحرف.' : 'Password must be at least 6 characters.';
    valid = false;
  }

  return valid;
};

const handleAdminLogin = async () => {
  if (!validateForm()) return;

  isSubmitting.value = true;
  errorMessage.value = '';

  try {
    const res = await adminAuthApiService.login({
      email: email.value,
      password: password.value
    });

    if (res.success && res.token) {
      setAdminAuth(res.token, res.admin);
      toast.success(
        isRtl.value ? 'تم تسجيل الدخول بنجاح' : 'Login Successful', 
        isRtl.value ? 'مرحباً بك في لوحة تحكم أسوار جدة!' : 'Welcome to Aswar Jeddah Control Panel!'
      );
      
      const target = route.query.redirect ? decodeURIComponent(route.query.redirect as string) : '/admin';
      navigateTo(target);
    } else {
      errorMessage.value = res.message || (isRtl.value ? 'فشل تسجيل الدخول. البريد أو كلمة المرور غير صحيحة.' : 'Login failed. Invalid credentials.');
      toast.error(isRtl.value ? 'فشل دخول المسؤول' : 'Admin Login Failed', errorMessage.value);
    }
  } catch (err: any) {
    errorMessage.value = err?.data?.message || err?.message || (isRtl.value ? 'تعذر الاتصال بسيرفر الآدمن. يرجى المحاولة لاحقاً.' : 'Unable to connect to Admin server.');
    toast.error(isRtl.value ? 'خطأ في الاتصال' : 'Connection Error', errorMessage.value);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-4px); }
  40%, 80% { transform: translateX(4px); }
}
.animate-shake {
  animation: shake 0.4s ease-in-out;
}
</style>
