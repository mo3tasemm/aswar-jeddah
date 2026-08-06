<template>
  <div class="login-page-wrapper selection:bg-amber-500 selection:text-white" dir="rtl">
    
    <!-- SECTION 1: SLIDING AUTH FORM CONTAINER -->
    <section class="auth-section flex-col">
      
      <!-- Mobile Tabs (Visible only on smaller screens since the overlay is hidden) -->
      <div class="md:hidden flex w-full max-w-sm mx-auto mb-6 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <button 
          @click="isRightPanelActive = false" 
          class="flex-1 py-3 text-sm font-bold transition-colors"
          :class="!isRightPanelActive ? 'bg-[#0B0E28] text-white' : 'text-slate-500 hover:bg-slate-50'"
        >
          تسجيل الدخول
        </button>
        <button 
          @click="isRightPanelActive = true" 
          class="flex-1 py-3 text-sm font-bold transition-colors"
          :class="isRightPanelActive ? 'bg-[#0B0E28] text-white' : 'text-slate-500 hover:bg-slate-50'"
        >
          إنشاء حساب
        </button>
      </div>

      <div class="container" :class="{ 'right-panel-active': isRightPanelActive }" id="container">
        
        <!-- SIGN UP CONTAINER -->
        <div class="form-container sign-up-container">
          <form @submit.prevent="handleSignUp">
            <h1 class="title">إنشاء حساب جديد</h1>
            <div class="social-container">
              <a href="#" class="social">
                <svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </a>
              <a href="#" class="social">
                <svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </a>
            </div>
            <span>أو استخدم البريد الإلكتروني للتسجيل</span>
            <input type="text" placeholder="الاسم بالكامل" v-model="signUpForm.name" required />
            <input type="email" placeholder="البريد الإلكتروني" v-model="signUpForm.email" required />
            <input type="tel" placeholder="رقم الهاتف" v-model="signUpForm.phone" required dir="ltr" class="text-right" />
            <input type="password" placeholder="كلمة المرور" v-model="signUpForm.password" required />
            <button type="submit" class="btn-primary">إنشاء الحساب</button>
          </form>
        </div>

        <!-- SIGN IN CONTAINER -->
        <div class="form-container sign-in-container">
          <form @submit.prevent="handleSignIn">
            <h1 class="title">تسجيل الدخول</h1>
            <div class="social-container">
              <a href="#" class="social">
                <svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              </a>
              <a href="#" class="social">
                <svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
              </a>
            </div>
            <span>أو استخدم حسابك المسجل</span>
            <input type="email" placeholder="البريد الإلكتروني / رقم الهاتف" v-model="signInForm.email" required />
            <input type="password" placeholder="كلمة المرور" v-model="signInForm.password" required />
            <a href="#" class="forgot-link">نسيت كلمة المرور؟</a>
            <button type="submit" class="btn-primary">تسجيل الدخول</button>
          </form>
        </div>

        <!-- OVERLAY CONTAINER -->
<div class="overlay-container hidden md:block" style="z-index: 1;">          <div class="overlay">
            
            <!-- OVERLAY LEFT (يظهر عند طلب تسجيل الدخول) -->
            <div class="overlay-panel overlay-left">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="overlay-logo" />
              <h1>مرحباً بك مجدداً!</h1>
              <p>لمتابعة تسوقك والإطلاع على طلباتك وسلتك، يرجى تسجيل الدخول ببياناتك</p>
              <button class="ghost" id="signIn" @click="isRightPanelActive = false">تسجيل الدخول</button>
            </div>

            <!-- OVERLAY RIGHT (يظهر عند طلب إنشاء حساب) -->
            <div class="overlay-panel overlay-right">
              <img src="~/assets/images/Logo.png" alt="أسوار جدة" class="overlay-logo" />
              <h1>مرحباً بك في أسوار جدة!</h1>
              <p>أنشئ حسابك الآن واستمتع بأفضل العروض الحصرية والأجهزة الإلكترونية والمنزلية</p>
              <button class="ghost" id="signUp" @click="isRightPanelActive = true">إنشاء حساب جديد</button>
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

<script setup>
import { ref, reactive } from 'vue'
import HomeStoreFeaturesBar from '~/components/home/StoreFeaturesBar.vue';
import HomeStoreLocationShowcase from '~/components/home/StoreLocationShowcase.vue';

useHead({
  title: 'تسجيل الدخول | أسوار جدة'
})

const isRightPanelActive = ref(false)

const signInForm = reactive({ email: '', password: '' })
const signUpForm = reactive({ name: '', email: '', phone: '', password: '' })

const handleSignIn = () => { console.log('Sign in:', signInForm) }
const handleSignUp = () => { console.log('Sign up:', signUpForm) }
</script>

<style scoped>
/* CSS الخاص بالأنيميشن والهايكل الحركية من Florin Pop */
.auth-section {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 120px 20px;
  background: #f8fafc;
}

.title {
  font-weight: 800;
  font-size: 24px;
  color: #0B0E28;
  margin-bottom: 10px;
}

p {
  font-size: 13px;
  line-height: 22px;
  letter-spacing: 0.5px;
  margin: 15px 0 25px;
  color: #e2e8f0;
}

span {
  font-size: 12px;
  color: #64748b;
  margin: 10px 0;
}

.forgot-link {
  color: #0B0E28;
  font-size: 12px;
  text-decoration: none;
  margin: 12px 0;
  font-weight: 600;
}

.btn-primary {
  border-radius: 12px;
  border: none;
  background-color: #0B0E28;
  color: #FFFFFF;
  font-size: 13px;
  font-weight: bold;
  padding: 12px 40px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: transform 80ms ease-in, background-color 0.2s;
  margin-top: 10px;
}

.btn-primary:active {
  transform: scale(0.95);
}

button.ghost {
  background-color: transparent;
  border: 2px solid #FFFFFF;
  color: #FFFFFF;
  border-radius: 12px;
  font-size: 13px;
  font-weight: bold;
  padding: 12px 40px;
  cursor: pointer;
  transition: all 0.2s ease-in;
}

button.ghost:hover {
  background: rgba(255, 255, 255, 0.15);
}

form {
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  height: 100%;
  text-align: center;
}

input {
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 15px;
  margin: 6px 0;
  width: 100%;
  font-size: 13px;
  outline: none;
  transition: all 0.3s;
}

input:focus {
  border-color: #0B0E28;
  background-color: #fff;
  box-shadow: 0 0 0 2px rgba(11, 14, 40, 0.1);
}

.container {
  background-color: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(11, 14, 40, 0.12);
  position: relative;
  overflow: hidden;
  width: 850px;
  max-width: 100%;
  min-height: 540px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  right: 0;
  width: 50%;
  z-index: 2;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(-100%);
}

.sign-up-container {
  right: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(-100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%, 49.99% {
    opacity: 0;
    z-index: 1;
  }
  50%, 100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(100%);
}

.overlay {
  background: #0B0E28;
  background: linear-gradient(135deg, #0B0E28 0%, #1a204c 100%);
  color: #FFFFFF;
  position: relative;
  right: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(-50%);
}

.overlay-panel {
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
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  left: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(-20%);
}

.overlay-logo {
  max-width: 140px;
  height: auto;
  margin-bottom: 15px;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
}

.social-container {
  margin: 12px 0;
}

.social-container a {
  border: 1px solid #cbd5e1;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 38px;
  width: 38px;
  color: #334155;
  transition: all 0.2s;
}

.social-container a:hover {
  background-color: #0B0E28;
  color: #fff;
  border-color: #0B0E28;
}

/* Responsive design for Mobile */
@media (max-width: 768px) {
  .container {
    min-height: 600px;
  }
  .form-container, .overlay-container {
    width: 100%;
  }
  .overlay-container {
    display: none;
  }
  .sign-in-container, .sign-up-container {
    width: 100%;
    transform: translateX(0) !important;
  }
  
  .sign-in-container {
    z-index: 2;
    opacity: 1;
    pointer-events: auto;
  }
  
  .sign-up-container {
    z-index: 1;
    opacity: 0;
    pointer-events: none;
  }
  
  .container.right-panel-active .sign-in-container {
    opacity: 0;
    z-index: 1;
    pointer-events: none;
  }
  
  .container.right-panel-active .sign-up-container {
    opacity: 1;
    z-index: 2;
    pointer-events: auto;
  }
}
</style>
