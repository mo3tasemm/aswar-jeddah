/**
 * Composable for Managing Brands State with Shared Singleton Cache & Request Deduplication
 */
import { ref, computed, watch } from 'vue'
import { brandApiService, type BrandItem } from '~/services/brandApiService'
import { useLanguage } from '~/composables/useLanguage'

// Module-level shared singleton state across all component instances
const sharedBrands = ref<BrandItem[]>([])
const sharedPending = ref<boolean>(false)
const sharedError = ref<string | null>(null)
const isFetched = ref<boolean>(false)

export const useBrands = () => {
  const { apiLocale, currentLanguage } = useLanguage()

  const loadBrands = async (force: boolean = false) => {
    // Deduplication: Return if already fetching or if cached data exists and not forced
    if (sharedPending.value) return
    if (isFetched.value && !force && sharedBrands.value.length > 0) return

    sharedPending.value = true
    sharedError.value = null

    try {
      const data = await brandApiService.fetchBrands('1', apiLocale.value)
      if (Array.isArray(data)) {
        sharedBrands.value = data
        isFetched.value = true
      }
    } catch (err: any) {
      console.error('[useBrands] Load error:', err)
      sharedError.value = 'تعذر تحميل العلامات التجارية.'
    } finally {
      sharedPending.value = false
    }
  }

  // Auto-refetch when language changes (only if previously fetched)
  watch([apiLocale, currentLanguage], () => {
    if (isFetched.value) {
      loadBrands(true)
    }
  })

  // Trigger initial fetch on client side if not already fetched
  if (process.client && !isFetched.value && !sharedPending.value) {
    loadBrands()
  }

  return {
    brands: sharedBrands,
    pending: sharedPending,
    error: sharedError,
    isEmpty: computed(() => !sharedPending.value && sharedBrands.value.length === 0),
    loadBrands
  }
}
