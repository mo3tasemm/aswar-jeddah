/**
 * Composable for Managing Categories State with Locale Auto-Refetching
 */
import { ref, computed, watch, onMounted } from 'vue'
import { categoryApiService, type CategoryItem } from '~/services/categoryApiService'
import { useLanguage } from '~/composables/useLanguage'

export const useCategories = () => {
  const { apiLocale, currentLanguage } = useLanguage()

  const categories = ref<CategoryItem[]>([])
  const pending = ref<boolean>(false)
  const error = ref<string | null>(null)

  const isEmpty = computed(() => !pending.value && categories.value.length === 0)

  const loadCategories = async () => {
    pending.value = true
    error.value = null

    try {
      const data = await categoryApiService.fetchCategories('1', apiLocale.value)
      categories.value = data
    } catch (err: any) {
      console.error('[useCategories] Load error:', err)
      error.value = 'تعذر تحميل التصنيفات.'
    } finally {
      pending.value = false
    }
  }

  // Auto-refetch when language changes
  watch([apiLocale, currentLanguage], () => {
    loadCategories()
  })

  onMounted(() => {
    if (categories.value.length === 0) {
      loadCategories()
    }
  })

  return {
    categories,
    pending,
    error,
    isEmpty,
    loadCategories
  }
}
