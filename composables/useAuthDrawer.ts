import { useState } from '#imports';

export const useAuthDrawer = () => {
  const isLoginOpen = useState<boolean>('isLoginOpen', () => false);

  const toggleLogin = () => {
    isLoginOpen.value = !isLoginOpen.value;
  };

  const openLogin = () => {
    isLoginOpen.value = true;
  };

  const closeLogin = () => {
    isLoginOpen.value = false;
  };

  return {
    isLoginOpen,
    toggleLogin,
    openLogin,
    closeLogin,
  };
};
