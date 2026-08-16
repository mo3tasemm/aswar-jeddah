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
const lastFetchedLocale = ref<string | null>(null)

export const useBrands = () => {
  const { apiLocale, currentLanguage } = useLanguage()

  const loadBrands = async (force: boolean = false) => {
    const currentLoc = apiLocale.value || 'sa'
    
    // Deduplication: Return if already fetching or if cached data exists for this exact locale and not forced
    if (sharedPending.value) return
    if (!force && lastFetchedLocale.value === currentLoc && sharedBrands.value.length > 0) return

    sharedPending.value = true
    sharedError.value = null

    try {
      const data = await brandApiService.fetchBrands('1', currentLoc)
      if (Array.isArray(data)) {
        sharedBrands.value = data
        lastFetchedLocale.value = currentLoc
      }
    } catch (err: any) {
      console.error('[useBrands] Load error:', err)
      sharedError.value = 'تعذر تحميل العلامات التجارية.'
    } finally {
      sharedPending.value = false
    }
  }

  // Auto-refetch when language changes
  watch([apiLocale, currentLanguage], () => {
    loadBrands(true)
  })

  // Trigger fetch on client side if not already fetched for the current locale
  if (process.client && !sharedPending.value) {
    if (lastFetchedLocale.value !== apiLocale.value || sharedBrands.value.length === 0) {
      loadBrands(true)
    }
  }

  return {
    brands: sharedBrands,
    pending: sharedPending,
    error: sharedError,
    isEmpty: computed(() => !sharedPending.value && sharedBrands.value.length === 0),
    loadBrands
  }
}
