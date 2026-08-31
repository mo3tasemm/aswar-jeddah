import { ref } from 'vue';

export type AuthDrawerMode = 'login' | 'register';

// Module-level shared singleton reactive state
const isLoginOpenState = ref<boolean>(false);
const authDrawerModeState = ref<AuthDrawerMode>('login');

export const useAuthDrawer = () => {
  const toggleLogin = (mode?: any) => {
    authDrawerModeState.value = mode === 'register' ? 'register' : 'login';
    isLoginOpenState.value = !isLoginOpenState.value;
  };

  const openLogin = (mode?: any) => {
    authDrawerModeState.value = mode === 'register' ? 'register' : 'login';
    isLoginOpenState.value = true;
  };

  const openRegister = () => {
    authDrawerModeState.value = 'register';
    isLoginOpenState.value = true;
  };

  const setAuthMode = (mode: AuthDrawerMode) => {
    authDrawerModeState.value = mode === 'register' ? 'register' : 'login';
  };

  const closeLogin = () => {
    isLoginOpenState.value = false;
  };

  return {
    isLoginOpen: isLoginOpenState,
    authMode: authDrawerModeState,
    toggleLogin,
    openLogin,
    openRegister,
    setAuthMode,
    closeLogin,
  };
};
