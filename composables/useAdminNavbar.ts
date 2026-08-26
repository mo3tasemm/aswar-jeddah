/**
 * Admin Navbar Composable (useAdminNavbar)
 * Manages full navbar state, tree construction, Drag & Drop reordering, and CRUD operations.
 */
import { ref, computed } from 'vue'
import { adminNavbarApiService, type NavbarItem, type NavbarItemPayload } from '~/services/adminNavbarApiService'
import { adminCategoriesApiService } from '~/services/adminCategoriesApiService'
import { adminBrandsApiService } from '~/services/adminBrandsApiService'
import { useAdminAuth } from '~/composables/useAdminAuth'
import { useToast } from '~/composables/useToast'

export const useAdminNavbar = () => {
  const toast = useToast()
  const { adminCookie, adminToken } = useAdminAuth()

  const rawItems = ref<NavbarItem[]>([])
  const isLoading = ref<boolean>(false)
  const isSubmitting = ref<boolean>(false)
  const isReordering = ref<boolean>(false)
  const deletingId = ref<number | string | null>(null)

  // Options for quick link selection
  const dbCategories = ref<Array<{ id: number | string; name: string; slug: string }>>([])
  const dbBrands = ref<Array<{ id: number | string; name: string; slug: string }>>([])
  const isLoadingOptions = ref<boolean>(false)

  const getToken = (): string => {
    if (adminToken?.value) return adminToken.value
    if (adminCookie?.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // -------------------------------------------------------------
  // 1. Hierarchical Tree Construction
  // -------------------------------------------------------------
  const treeItems = computed<NavbarItem[]>(() => {
    const list = [...rawItems.value]
    
    // Sort all by sort_order
    list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0))

    // Check if items already came nested from backend
    const hasAlreadyNested = list.some(item => Array.isArray(item.children) && item.children.length > 0)
    if (hasAlreadyNested) {
      return list
    }

    // Build hierarchy from flat list using parent_id
    const itemMap = new Map<string | number, NavbarItem>()
    list.forEach(item => {
      itemMap.set(item.id, { ...item, children: [] })
    })

    const rootItems: NavbarItem[] = []

    list.forEach(item => {
      const current = itemMap.get(item.id)!
      if (item.parent_id && itemMap.has(item.parent_id)) {
        const parent = itemMap.get(item.parent_id)!
        if (!parent.children) parent.children = []
        parent.children.push(current)
      } else {
        rootItems.push(current)
      }
    })

    return rootItems
  })

  // Top-level parent candidates for parent_id dropdown
  const parentOptions = computed(() => {
    return rawItems.value.filter(item => !item.parent_id || item.parent_id === 0 || item.parent_id === '0')
  })

  // Stats Counters
  const totalCount = computed(() => rawItems.value.length)
  const topLevelCount = computed(() => parentOptions.value.length)
  const subItemsCount = computed(() => totalCount.value - topLevelCount.value)
  const activeCount = computed(() => rawItems.value.filter(i => i.is_active === 1 || i.is_active === true).length)

  // -------------------------------------------------------------
  // 2. Fetch Navbar Items
  // -------------------------------------------------------------
  const fetchNavbarItems = async (): Promise<NavbarItem[]> => {
    isLoading.value = true
    try {
      const token = getToken()
      const res = await adminNavbarApiService.fetchNavbarItems(token)
      if (res.success && Array.isArray(res.data)) {
        rawItems.value = res.data
      }
      return rawItems.value
    } catch (err: any) {
      console.warn('[useAdminNavbar] Failed to fetch navbar:', err)
      return []
    } finally {
      isLoading.value = false
    }
  }

  // -------------------------------------------------------------
  // 3. Fetch Dynamic Categories & Brands for Easy Form Autocomplete
  // -------------------------------------------------------------
  const fetchAutocompleteOptions = async () => {
    isLoadingOptions.value = true
    try {
      const token = getToken()
      const [catRes, brandRes] = await Promise.allSettled([
        adminCategoriesApiService.fetchCategories(token, '', 1),
        adminBrandsApiService.fetchBrands(token, '', 1, 100)
      ])

      if (catRes.status === 'fulfilled' && catRes.value.success) {
        dbCategories.value = catRes.value.data.map(c => ({
          id: c.id,
          name: c.name_ar || c.name || c.name_en || 'قسم',
          slug: c.slug || (c.name_en || c.name || String(c.id)).toLowerCase().replace(/\s+/g, '-')
        }))
      }

      if (brandRes.status === 'fulfilled' && brandRes.value.success) {
        dbBrands.value = brandRes.value.data.map(b => ({
          id: b.id,
          name: b.name_ar || b.name || b.name_en || 'ماركة',
          slug: b.slug || (b.name_en || b.name || String(b.id)).toLowerCase().replace(/\s+/g, '-')
        }))
      }
    } catch (err) {
      console.warn('[useAdminNavbar] Error fetching options:', err)
    } finally {
      isLoadingOptions.value = false
    }
  }

  // -------------------------------------------------------------
  // 4. Create Navbar Item
  // -------------------------------------------------------------
  const createNavbarItem = async (payload: NavbarItemPayload) => {
    isSubmitting.value = true
    try {
      const token = getToken()
      const sortOrder = payload.sort_order || rawItems.value.length + 1
      const res = await adminNavbarApiService.createNavbarItem(token, {
        ...payload,
        sort_order: sortOrder
      })

      if (res.success && res.data) {
        rawItems.value.push(res.data)
      } else {
        await fetchNavbarItems()
      }

      toast.success('تمت إضافة عنصر القائمة بنجاح!')
      return res
    } catch (err: any) {
      toast.error(err.data?.message || 'حدث خطأ أثناء إضافة العنصر')
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  // -------------------------------------------------------------
  // 5. Update Navbar Item
  // -------------------------------------------------------------
  const updateNavbarItem = async (id: number | string, payload: Partial<NavbarItemPayload>) => {
    isSubmitting.value = true
    try {
      const token = getToken()
      const res = await adminNavbarApiService.updateNavbarItem(token, id, payload)

      const idx = rawItems.value.findIndex(i => String(i.id) === String(id))
      if (idx !== -1 && res.data) {
        rawItems.value[idx] = { ...rawItems.value[idx], ...res.data }
      } else {
        await fetchNavbarItems()
      }

      toast.success('تم حفظ تعديلات عنصر القائمة بنجاح!')
      return res
    } catch (err: any) {
      toast.error(err.data?.message || 'حدث خطأ أثناء تعديل العنصر')
      throw err
    } finally {
      isSubmitting.value = false
    }
  }

  // -------------------------------------------------------------
  // 6. Delete Navbar Item
  // -------------------------------------------------------------
  const deleteNavbarItem = async (id: number | string) => {
    deletingId.value = id
    try {
      const token = getToken()
      await adminNavbarApiService.deleteNavbarItem(token, id)
      
      // Remove from list and child items if any
      rawItems.value = rawItems.value.filter(i => String(i.id) !== String(id) && String(i.parent_id) !== String(id))
      toast.success('تم حذف عنصر القائمة بنجاح!')
    } catch (err: any) {
      toast.error(err.data?.message || 'تعذر حذف عنصر القائمة')
      throw err
    } finally {
      deletingId.value = null
    }
  }

  // -------------------------------------------------------------
  // 7. Toggle Active Status
  // -------------------------------------------------------------
  const toggleActiveStatus = async (item: NavbarItem) => {
    const newStatus = (item.is_active === 1 || item.is_active === true) ? 0 : 1
    const prevStatus = item.is_active
    item.is_active = newStatus

    try {
      const token = getToken()
      await adminNavbarApiService.updateNavbarItem(token, item.id, { is_active: newStatus })
      toast.success(newStatus === 1 ? 'تم تفعيل العنصر بنجاح' : 'تم تعطيل العنصر')
    } catch (err) {
      item.is_active = prevStatus
      toast.error('تعذر تغيير حالة العنصر')
    }
  }

  // -------------------------------------------------------------
  // 8. Reorder Items (Drag & Drop)
  // -------------------------------------------------------------
  const reorderNavbarItems = async (orderedItems: NavbarItem[]) => {
    isReordering.value = true
    try {
      const token = getToken()
      const payload = orderedItems.map((item, idx) => {
        item.sort_order = idx + 1
        return { id: item.id, sort_order: idx + 1 }
      })

      await adminNavbarApiService.reorderNavbarItems(token, payload)
      toast.success('تم تحديث ترتيب القوائم بنجاح!')
    } catch (err: any) {
      console.error('[useAdminNavbar] Reorder error:', err)
      toast.error('تعذر حفظ الترتيب الجديد')
    } finally {
      isReordering.value = false
    }
  }

  return {
    // State
    rawItems,
    treeItems,
    parentOptions,
    totalCount,
    topLevelCount,
    subItemsCount,
    activeCount,
    isLoading,
    isSubmitting,
    isReordering,
    deletingId,
    dbCategories,
    dbBrands,
    isLoadingOptions,

    // Methods
    fetchNavbarItems,
    fetchAutocompleteOptions,
    createNavbarItem,
    updateNavbarItem,
    deleteNavbarItem,
    toggleActiveStatus,
    reorderNavbarItems
  }
}
