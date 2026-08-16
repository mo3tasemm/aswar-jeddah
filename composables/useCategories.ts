/**
 * Composable for Managing Categories State with Locale Auto-Refetching
 */
import { ref, computed, watch, onMounted } from 'vue'
import { categoryApiService, type CategoryItem } from '~/services/categoryApiService'
import { useLanguage } from '~/composables/useLanguage'

const sharedCategories = ref<CategoryItem[]>([])
const sharedPending = ref<boolean>(false)
const sharedError = ref<string | null>(null)
const isFetched = ref<boolean>(false)

export const useCategories = () => {
  const { apiLocale, currentLanguage } = useLanguage()

  const isEmpty = computed(() => !sharedPending.value && sharedCategories.value.length === 0)

  const loadCategories = async (force: boolean = false) => {
    if (isFetched.value && !force && sharedCategories.value.length > 0) {
      return
    }

    sharedPending.value = true
    sharedError.value = null

    try {
      const data = await categoryApiService.fetchCategories('1', apiLocale.value)
      sharedCategories.value = data
      isFetched.value = true
    } catch (err: any) {
      console.error('[useCategories] Load error:', err)
      sharedError.value = 'تعذر تحميل التصنيفات.'
    } finally {
      sharedPending.value = false
    }
  }

  // Auto-refetch when language changes
  watch([apiLocale, currentLanguage], () => {
    loadCategories(true)
  })

  onMounted(() => {
    if (!isFetched.value || sharedCategories.value.length === 0) {
      loadCategories()
    }
  })

  return {
    categories: sharedCategories,
    pending: sharedPending,
    error: sharedError,
    isEmpty,
    loadCategories
  }
}
