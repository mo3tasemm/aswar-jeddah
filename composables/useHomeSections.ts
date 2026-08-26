import { ref } from 'vue'
import { fetchPublicHomeSections, type HomeSectionItem } from '~/services/homeSectionApiService'

export const useHomeSections = () => {
  const sections = ref<HomeSectionItem[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const loadHomeSections = async () => {
    loading.value = true
    error.value = null
    try {
      const data = await fetchPublicHomeSections()
      sections.value = data
    } catch (err: any) {
      error.value = err?.message || 'Failed to load home sections'
    } finally {
      loading.value = false
    }
  }

  return {
    sections,
    loading,
    error,
    loadHomeSections
  }
}
