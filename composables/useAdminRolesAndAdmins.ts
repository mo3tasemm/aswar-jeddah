import { ref, reactive, computed } from 'vue'
import {
  adminRolesAndAdminsService,
  AVAILABLE_MODULES,
  type AdminRoleItem,
  type AdminUserItem,
  type AdminRolePayload,
  type AdminUserPayload,
  type AdminModulePermission
} from '~/services/adminRolesAndAdminsService'
import { useToast } from '~/composables/useToast'

export const useAdminRolesAndAdmins = () => {
  const toast = useToast()
  const adminCookie = useCookie<string | null>('admin_token')

  // State: Roles
  const roles = ref<AdminRoleItem[]>([])
  const currentRole = ref<AdminRoleItem | null>(null)
  const availableModules = ref<AdminModulePermission[]>(AVAILABLE_MODULES)
  const isLoadingRoles = ref(false)
  const isSavingRole = ref(false)
  const isDeletingRole = ref(false)

  // State: Admins
  const admins = ref<AdminUserItem[]>([])
  const currentAdmin = ref<AdminUserItem | null>(null)
  const totalAdmins = ref(0)
  const isLoadingAdmins = ref(false)
  const isSavingAdmin = ref(false)
  const isUpdatingStatus = ref(false)
  const isDeletingAdmin = ref(false)

  // Filters & Pagination
  const searchAdminQuery = ref('')
  const roleFilter = ref<string | number>('')
  const statusFilter = ref<string | number>('')
  const currentAdminPage = ref(1)

  // Errors
  const validationErrors = ref<Record<string, string[]>>({})
  const errorMessage = ref('')

  const getToken = (): string => {
    if (adminCookie.value) return adminCookie.value
    if (process.client) {
      return localStorage.getItem('admin_token') || localStorage.getItem('auth_token') || ''
    }
    return ''
  }

  // ==========================================
  // ROLES ACTIONS
  // ==========================================

  const fetchRoles = async (): Promise<AdminRoleItem[]> => {
    isLoadingRoles.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.fetchRoles(token)
      if (res.success) {
        roles.value = res.roles
        if (res.available_modules && Array.isArray(res.available_modules) && res.available_modules.length > 0) {
          // If strings or objects, map accordingly
          availableModules.value = res.available_modules.map((m: any) => {
            if (typeof m === 'string') {
              const matched = AVAILABLE_MODULES.find(mod => mod.key === m)
              return matched || { key: m, nameAr: m, nameEn: m }
            }
            return {
              key: m.key || m.id || m.name,
              nameAr: m.nameAr || m.name || m.title || m.key,
              nameEn: m.nameEn || m.name || m.key,
              description: m.description || ''
            }
          })
        }
        return res.roles
      } else {
        roles.value = []
        return []
      }
    } catch (err: any) {
      console.error('Error fetching roles:', err)
      roles.value = []
      return []
    } finally {
      isLoadingRoles.value = false
    }
  }

  const saveRole = async (payload: AdminRolePayload, roleId?: string | number): Promise<boolean> => {
    isSavingRole.value = true
    validationErrors.value = {}
    errorMessage.value = ''
    const token = getToken()

    try {
      let res: { success: boolean; message: string; errors?: Record<string, string[]>; data?: any }
      if (roleId) {
        res = await adminRolesAndAdminsService.updateRole(token, roleId, payload)
      } else {
        res = await adminRolesAndAdminsService.createRole(token, payload)
      }

      if (res.success) {
        toast.showToast({
          type: 'success',
          title: 'تم بنجاح',
          message: res.message || (roleId ? 'تم تعديل الدور الوظيفي بنجاح!' : 'تم إنشاء الدور الوظيفي بنجاح!')
        })
        await fetchRoles()
        return true
      } else {
        if (res.errors) validationErrors.value = res.errors
        errorMessage.value = res.message || 'يرجى تصحيح البيانات المدخلة'
        toast.showToast({
          type: 'error',
          title: 'فشل العملية',
          message: errorMessage.value
        })
        return false
      }
    } catch (err: any) {
      errorMessage.value = err.message || 'حدث خطأ غير متوقع'
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: errorMessage.value
      })
      return false
    } finally {
      isSavingRole.value = false
    }
  }

  const fetchRoleDetails = async (roleId: string | number): Promise<AdminRoleItem | null> => {
    isLoadingRoles.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.fetchRoleDetails(token, roleId)
      if (res.success && res.role) {
        currentRole.value = res.role
        return res.role
      }
      return null
    } catch (err) {
      console.error('Error fetching role details:', err)
      return null
    } finally {
      isLoadingRoles.value = false
    }
  }

  const deleteRole = async (roleId: string | number): Promise<boolean> => {
    isDeletingRole.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.deleteRole(token, roleId)
      if (res.success) {
        roles.value = roles.value.filter(r => String(r.id) !== String(roleId))
        toast.showToast({
          type: 'success',
          title: 'تم الحذف',
          message: res.message || 'تم حذف الدور الوظيفي بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'تعذر الحذف',
          message: res.message || 'لا يمكن حذف هذا الدور لوجود مشرفين مرتبطين به'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ في الاتصال بالخادم'
      })
      return false
    } finally {
      isDeletingRole.value = false
    }
  }

  // ==========================================
  // ADMINS ACTIONS
  // ==========================================

  const fetchAdmins = async (page: number = 1): Promise<AdminUserItem[]> => {
    isLoadingAdmins.value = true
    currentAdminPage.value = page
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.fetchAdmins(token, {
        search: searchAdminQuery.value,
        role_id: roleFilter.value,
        status: statusFilter.value,
        page,
        limit: 20
      })

      if (res.success) {
        admins.value = res.admins
        totalAdmins.value = res.total
        return res.admins
      } else {
        admins.value = []
        totalAdmins.value = 0
        return []
      }
    } catch (err: any) {
      console.error('Error fetching admins:', err)
      admins.value = []
      totalAdmins.value = 0
      return []
    } finally {
      isLoadingAdmins.value = false
    }
  }

  const fetchAdminDetails = async (adminId: string | number): Promise<AdminUserItem | null> => {
    isLoadingAdmins.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.fetchAdminDetails(token, adminId)
      if (res.success && res.admin) {
        currentAdmin.value = res.admin
        return res.admin
      }
      return null
    } catch (err) {
      console.error('Error fetching admin details:', err)
      return null
    } finally {
      isLoadingAdmins.value = false
    }
  }

  const saveAdmin = async (payload: AdminUserPayload, adminId?: string | number): Promise<boolean> => {
    isSavingAdmin.value = true
    validationErrors.value = {}
    errorMessage.value = ''
    const token = getToken()

    try {
      let res: { success: boolean; message: string; errors?: Record<string, string[]>; data?: any }
      if (adminId) {
        res = await adminRolesAndAdminsService.updateAdmin(token, adminId, payload)
      } else {
        res = await adminRolesAndAdminsService.createAdmin(token, payload)
      }

      if (res.success) {
        toast.showToast({
          type: 'success',
          title: 'تم بنجاح',
          message: res.message || (adminId ? 'تم تحديث بيانات المشرف بنجاح!' : 'تمت إضافة المشرف بنجاح!')
        })
        await fetchAdmins(currentAdminPage.value)
        return true
      } else {
        if (res.errors) validationErrors.value = res.errors
        errorMessage.value = res.message || 'يرجى مراجعة الحقول والبيانات المدخلة'
        toast.showToast({
          type: 'error',
          title: 'فشل العملية',
          message: errorMessage.value
        })
        return false
      }
    } catch (err: any) {
      errorMessage.value = err.message || 'حدث خطأ أثناء حفظ بيانات المشرف'
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: errorMessage.value
      })
      return false
    } finally {
      isSavingAdmin.value = false
    }
  }

  const toggleAdminStatus = async (admin: AdminUserItem): Promise<boolean> => {
    const newStatus = admin.status ? 0 : 1
    isUpdatingStatus.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.toggleAdminStatus(token, admin.id, newStatus)
      if (res.success) {
        admin.status = newStatus
        admin.is_active = newStatus
        toast.showToast({
          type: 'success',
          title: 'تم التحديث',
          message: newStatus ? 'تم تفعيل حساب المشرف بنجاح!' : 'تم تعطيل حساب المشرف بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'خطأ',
          message: res.message || 'فشل في تحديث حالة المشرف'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ في الاتصال بالخادم'
      })
      return false
    } finally {
      isUpdatingStatus.value = false
    }
  }

  const deleteAdmin = async (adminId: string | number): Promise<boolean> => {
    isDeletingAdmin.value = true
    const token = getToken()

    try {
      const res = await adminRolesAndAdminsService.deleteAdmin(token, adminId)
      if (res.success) {
        admins.value = admins.value.filter(a => String(a.id) !== String(adminId))
        totalAdmins.value = Math.max(0, totalAdmins.value - 1)
        toast.showToast({
          type: 'success',
          title: 'تم الحذف',
          message: res.message || 'تم حذف المشرف بنجاح!'
        })
        return true
      } else {
        toast.showToast({
          type: 'error',
          title: 'تعذر الحذف',
          message: res.message || 'فشل في حذف حساب المشرف'
        })
        return false
      }
    } catch (err: any) {
      toast.showToast({
        type: 'error',
        title: 'خطأ',
        message: err.message || 'حدث خطأ في الاتصال بالخادم'
      })
      return false
    } finally {
      isDeletingAdmin.value = false
    }
  }

  return {
    // Roles State & Actions
    roles,
    currentRole,
    availableModules,
    isLoadingRoles,
    isSavingRole,
    isDeletingRole,
    fetchRoles,
    fetchRoleDetails,
    saveRole,
    deleteRole,

    // Admins State & Actions
    admins,
    currentAdmin,
    totalAdmins,
    isLoadingAdmins,
    isSavingAdmin,
    isUpdatingStatus,
    isDeletingAdmin,
    searchAdminQuery,
    roleFilter,
    statusFilter,
    currentAdminPage,
    fetchAdmins,
    fetchAdminDetails,
    saveAdmin,
    toggleAdminStatus,
    deleteAdmin,

    // Errors
    validationErrors,
    errorMessage
  }
}
