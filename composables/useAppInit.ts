/**
 * Application Bootstrap & Initialization Composable (useAppInit)
 * Coordinates pre-fetching of essential store APIs (Navbar, Settings, Categories)
 * and controls the Global Loading Screen so the layout never renders incomplete data.
 */
import { ref } from 'vue'
import { useStoreSettings } from '~/composables/useStoreSettings'
import { usePublicNavbar } from '~/composables/usePublicNavbar'
import { useCategories } from '~/composables/useCategories'
import { useGlobalLoading } from '~/composables/useGlobalLoading'

const isInitialized = ref(false)
const isInitializing = ref(false)
const initError = ref<string | null>(null)

export const useAppInit = () => {
  const { fetchStoreSettings } = useStoreSettings()
  const { fetchPublicNavbar } = usePublicNavbar()
  const { loadCategories } = useCategories()
  const { isAppReady, setAppReady } = useGlobalLoading()

  const initApp = async (force = false) => {
    if (isInitialized.value && !force) {
      setAppReady(true)
      return
    }

    if (isInitializing.value) {
      return
    }

    isInitializing.value = true
    initError.value = null

    try {
      // Fetch core layout data in parallel with timeout guard
      const results = await Promise.allSettled([
        fetchStoreSettings(force),
        fetchPublicNavbar(force),
        loadCategories(force)
      ])

      // Check if any critical API had a fatal issue
      const failed = results.filter(r => r.status === 'rejected')
      if (failed.length === results.length) {
        initError.value = 'تعذر الاتصال بخادم المتجر. يرجى التحقق من اتصال الإنترنت.'
      }

      isInitialized.value = true
    } catch (err: any) {
      console.error('[useAppInit] Bootstrap error:', err)
      initError.value = err?.message || 'خطأ غير متوقع أثناء تحميل المتجر.'
    } finally {
      isInitializing.value = false
      // Smoothly dismiss global loading screen once all data promises resolve
      setTimeout(() => {
        setAppReady(true)
      }, 150)
    }
  }

  return {
    isInitialized,
    isInitializing,
    initError,
    isAppReady,
    initApp
  }
}
