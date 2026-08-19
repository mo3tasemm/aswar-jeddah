<template>
  <div class="forgot-password-page selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- SECTION 1: FORGOT PASSWORD CARD SECTION -->
    <section class="auth-section">
      <div class="card-container">
        
        <!-- HEADER LOGO -->
        <div class="logo-wrapper">
          <NuxtLink :to="localePath('/')">
            <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="store-logo object-contain" />
          </NuxtLink>
        </div>

        <!-- FORM HEADER -->
        <div class="header-text">
          <h1 class="title">{{ t('auth.forgot_password_title') }}</h1>
          <p class="subtitle">{{ t('auth.forgot_password_desc') }}</p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleResetPassword" class="reset-form">
          <div class="input-group">
            <label for="email" class="input-label text-start">{{ t('auth.email_label') }}</label>
            <input 
              id="email" 
              type="email" 
              :placeholder="t('auth.email_placeholder')" 
              v-model="resetEmail" 
              required 
              class="form-input text-start"
              dir="ltr"
            />
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="!isLoading">{{ t('auth.send_reset_link') }}</span>
            <span v-else>{{ t('auth.sending') }}</span>
          </button>
        </form>

        <!-- FOOTER LINK -->
        <div class="card-footer">
          <NuxtLink class="back-link flex items-center justify-center gap-2" :to="localePath('/login')">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 rtl:-scale-x-100">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            <span>{{ t('auth.back_to_login') }}</span>
          </NuxtLink>
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
import { ref, computed } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'
import { useToast } from '~/composables/useToast'
import { useLanguage } from '~/composables/useLanguage'

const { t, layoutDirection, localePath } = useLanguage()

useHead({
  title: computed(() => t('auth.forgot_password_page_title'))
})

const toast = useToast()
const resetEmail = ref('')
const isLoading = ref(false)

const handleResetPassword = () => {
  if (!resetEmail.value) return
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    toast.success(t('auth.forgot_password_title'), t('auth.reset_link_sent'))
    resetEmail.value = ''
  }, 1000)
}
</script>

<style scoped>
.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  background: #f8fafc;
  min-height: 80vh;
}

.card-container {
  background-color: #FFFFFF;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(11, 14, 40, 0.08);
  border: 1px solid #e2e8f0;
  width: 100%;
  max-width: 480px;
  padding: 40px 32px;
  text-align: center;
}

.logo-wrapper {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
}

.store-logo {
  max-width: 150px;
  height: auto;
}

.header-text {
  margin-bottom: 25px;
}

.title {
  font-size: 24px;
  font-weight: 800;
  color: #0B0E28;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 13px;
  color: #64748b;
  line-height: 1.6;
}

.reset-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 12px;
  font-weight: 700;
  color: #334155;
}

.form-input {
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid #cbd5e1;
  background-color: #f8fafc;
  font-size: 14px;
  outline: none;
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #0B0E28;
  background-color: #ffffff;
  box-shadow: 0 0 0 3px rgba(11, 14, 40, 0.1);
}

.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  background-color: #0B0E28;
  color: #fbbf24;
  font-weight: 800;
  font-size: 14px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(11, 14, 40, 0.15);
}

.btn-primary:hover {
  background-color: #151a42;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.card-footer {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

.back-link {
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #0B0E28;
}
</style>
