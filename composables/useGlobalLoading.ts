import { ref } from 'vue'

const isAppReady = ref(false)
const isRouteLoading = ref(false)
const loadingMessage = ref('')

export const useGlobalLoading = () => {
  const startLoading = (msg = '') => {
    loadingMessage.value = msg
    isRouteLoading.value = true
  }

  const stopLoading = () => {
    isRouteLoading.value = false
    loadingMessage.value = ''
  }

  const setAppReady = (ready = true) => {
    isAppReady.value = ready
  }

  return {
    isAppReady,
    isRouteLoading,
    loadingMessage,
    startLoading,
    stopLoading,
    setAppReady
  }
}
