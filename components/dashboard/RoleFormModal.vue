<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
    <div class="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
      
      <!-- Modal Header -->
      <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-amber-400/10 text-amber-600 flex items-center justify-center">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h3 class="font-black text-slate-900 text-base">
              {{ isEdit ? 'تعديل الدور الوظيفي والصلاحيات' : 'إضافة دور وظيفي جديد' }}
            </h3>
            <p class="text-xs text-slate-400 font-medium">حدد اسم الدور والصلاحيات المسموح بها للمشرفين التابعين له.</p>
          </div>
        </div>

        <button 
          @click="closeModal" 
          class="text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
        
        <!-- Role Name Input -->
        <div>
          <label class="block text-xs font-black text-slate-800 mb-1.5">
            اسم الدور الوظيفي (Role Name) *
          </label>
          <input
            v-model="form.name"
            type="text"
            placeholder="مثال: مدير المنتجات، مسؤول خدمة العملاء، محاسب..."
            class="w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"
            :class="getFieldError('name') ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
            required
          />
          <span v-if="getFieldError('name')" class="text-xs font-bold text-rose-500 block mt-1">
            {{ getFieldError('name') }}
          </span>
        </div>

        <!-- Permissions Section -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-xs font-black text-slate-900">صلاحيات الأقسام المسموحة (Module Access) *</h4>
              <p class="text-[11px] text-slate-400 font-medium">اختر الأقسام التي يحق لهذا الدور الوصول إليها والتحكم بها.</p>
            </div>
            
            <div class="flex items-center gap-2">
              <button
                type="button"
                @click="selectAllModules"
                class="text-[11px] font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                تحديد الكل
              </button>
              <button
                type="button"
                @click="deselectAllModules"
                class="text-[11px] font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
              >
                إلغاء التحديد
              </button>
            </div>
          </div>

          <!-- Modules Checkboxes Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <label
              v-for="mod in availableModules"
              :key="mod.key"
              class="flex items-start gap-3 p-3 rounded-2xl border transition-all cursor-pointer select-none"
              :class="isModuleSelected(mod.key) 
                ? 'border-amber-400 bg-amber-50/40 shadow-2xs' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'"
            >
              <input
                type="checkbox"
                :value="mod.key"
                :checked="isModuleSelected(mod.key)"
                @change="toggleModule(mod.key)"
                class="mt-1 rounded border-slate-300 text-amber-500 focus:ring-amber-400 h-4 w-4"
              />
              <div class="flex-1">
                <div class="text-xs font-black text-slate-900 flex items-center justify-between">
                  <span>{{ mod.nameAr }}</span>
                  <span class="text-[10px] font-bold text-slate-400 font-mono" dir="ltr">{{ mod.key }}</span>
                </div>
                <p v-if="mod.description" class="text-[11px] text-slate-500 mt-0.5 font-medium">
                  {{ mod.description }}
                </p>
              </div>
            </label>
          </div>

          <span v-if="getFieldError('modules')" class="text-xs font-bold text-rose-500 block mt-1">
            {{ getFieldError('modules') }}
          </span>
        </div>

        <!-- Active Status -->
        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs font-black text-slate-800 block">حالة تفعيل الدور</span>
            <span class="text-[11px] text-slate-400 font-medium">الأدوار المعطلة تمنع المشرفين المرتبطين بها من الدخول</span>
          </div>
          <BaseToggle v-model="form.status" />
        </div>

        <!-- Modal Footer -->
        <div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
          <button
            type="button"
            @click="closeModal"
            class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            إلغاء
          </button>
          
          <button
            type="submit"
            :disabled="isSubmitting"
            class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <svg v-if="isSubmitting" class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{{ isEdit ? 'حفظ التعديلات' : 'إنشاء الدور' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import type { AdminRoleItem, AdminRolePayload, AdminModulePermission } from '~/services/adminRolesAndAdminsService'

const props = defineProps<{
  isOpen: boolean
  isEdit?: boolean
  roleData?: AdminRoleItem | null
  availableModules: AdminModulePermission[]
  isSubmitting?: boolean
  validationErrors?: Record<string, string[]>
}>()

const emit = defineEmits<{
  'close': []
  'submit': [payload: AdminRolePayload]
}>()

const form = reactive({
  name: '',
  modules: [] as string[],
  status: true
})

watch(() => props.roleData, (newVal) => {
  if (newVal) {
    form.name = newVal.name || ''
    form.modules = [...(newVal.modules || [])]
    form.status = newVal.status !== false && newVal.status !== 0
  } else {
    form.name = ''
    form.modules = []
    form.status = true
  }
}, { immediate: true })

watch(() => props.isOpen, (open) => {
  if (open && !props.roleData) {
    form.name = ''
    form.modules = []
    form.status = true
  }
})

const isModuleSelected = (key: string) => {
  return form.modules.includes(key)
}

const toggleModule = (key: string) => {
  const idx = form.modules.indexOf(key)
  if (idx > -1) {
    form.modules.splice(idx, 1)
  } else {
    form.modules.push(key)
  }
}

const selectAllModules = () => {
  form.modules = props.availableModules.map(m => m.key)
}

const deselectAllModules = () => {
  form.modules = []
}

const getFieldError = (field: string): string => {
  if (props.validationErrors && props.validationErrors[field] && props.validationErrors[field].length > 0) {
    return props.validationErrors[field][0]
  }
  return ''
}

const closeModal = () => {
  emit('close')
}

const handleSubmit = () => {
  if (form.modules.length === 0) {
    alert('يرجى تحديد صلاحية قسم واحد على الأقل لهذا الدور')
    return
  }

  emit('submit', {
    name: form.name,
    modules: form.modules,
    status: form.status ? 1 : 0
  })
}
</script>
