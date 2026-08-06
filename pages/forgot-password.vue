<template>
  <div class="forgot-password-page selection:bg-amber-500 selection:text-white" dir="rtl">
    
    <!-- SECTION 1: FORGOT PASSWORD CARD SECTION -->
    <section class="auth-section">
      <div class="card-container">
        
        <!-- HEADER LOGO -->
        <div class="logo-wrapper">
          <NuxtLink to="/">
            <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="store-logo" />
          </NuxtLink>
        </div>

        <!-- FORM HEADER -->
        <div class="header-text">
          <h1 class="title">استعادة كلمة المرور</h1>
          <p class="subtitle">أدخل بريدك الإلكتروني المسجل وسنرسل لك رابطاً آمناً لإعادة ضبط كلمة المرور الخاصة بك.</p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleResetPassword" class="reset-form">
          <div class="input-group">
            <label for="email" class="input-label">البريد الإلكتروني</label>
            <input 
              id="email" 
              type="email" 
              placeholder="example@domain.com" 
              v-model="resetEmail" 
              required 
              class="form-input"
            />
          </div>

          <button type="submit" class="btn-primary" :disabled="isLoading">
            <span v-if="!isLoading">إرسال رابط إعادة الضبط</span>
            <span v-else>جاري الإرسال...</span>
          </button>
        </form>

        <!-- FOOTER LINK -->
        <div class="card-footer">
          <NuxtLink class="back-link" to="/login">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 ml-2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
            العودة لتسجيل الدخول
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

<script setup>
import { ref } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue'
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue'

useHead({
  title: 'استعادة كلمة المرور | أسوار جدة'
})

const resetEmail = ref('')
const isLoading = ref(false)

const handleResetPassword = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('تم إرسال رابط إعادة الضبط إلى بريدك الإلكتروني')
    resetEmail.value = ''
  }, 1200)
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
  text-align: right;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  font-size: 13px;
  font-weight: 600;
  color: #334155;
}

.form-input {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 14px 16px;
  font-size: 14px;
  color: #0f172a;
  outline: none;
  transition: all 0.2s ease;
  direction: ltr; /* Email is LTR */
}

.form-input:focus {
  background-color: #ffffff;
  border-color: #0B0E28;
  box-shadow: 0 0 0 3px rgba(11, 14, 40, 0.1);
}

.btn-primary {
  background-color: #0B0E28;
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 15px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;
}

.btn-primary:hover:not(:disabled) {
  background-color: #1a204c;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(11, 14, 40, 0.15);
}

.btn-primary:active:not(:disabled) {
  transform: translateY(0);
}

.btn-primary:disabled {
  opacity: 0.7;
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
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #0B0E28;
}

@media (max-width: 640px) {
  .auth-section {
    padding: 40px 16px;
  }
  .card-container {
    padding: 30px 20px;
  }
}
</style>
