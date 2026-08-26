<template>
  <div class="forgot-page-wrapper selection:bg-amber-500 selection:text-white" :dir="layoutDirection">
    
    <!-- SECTION 1: FORGOT PASSWORD CARD SECTION -->
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
            class="form-input"
            required 
          />
        </div>

        <button 
          type="submit" 
          :disabled="isLoading" 
          class="btn-primary"
        >
          <span v-if="!isLoading">{{ t('auth.send_reset_link') }}</span>
          <span v-else class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ t('auth.sending') }}</span>
          </span>
        </button>
      </form>

      <!-- BACK TO LOGIN -->
      <div class="card-footer">
        <NuxtLink :to="localePath('/login')" class="back-link flex items-center justify-center gap-2">
          <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>{{ t('auth.back_to_login') }}</span>
        </NuxtLink>
      </div>

    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLanguage } from '~/composables/useLanguage'
import { useToast } from '~/composables/useToast'

const { t, layoutDirection, localePath } = useLanguage()
const toast = useToast()
const resetEmail = ref('')
const isLoading = ref(false)

useHead({
  title: computed(() => `${t('auth.forgot_password_title')} | أسوار جدة`)
})

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
