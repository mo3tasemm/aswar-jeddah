<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة المشرفين</h1>
        <p class="text-sm text-slate-500 mt-1">إدارة حسابات فريق العمل وتحديد صلاحياتهم في لوحة التحكم.</p>
      </div>
      
      <NuxtLink to="/dashboard/staff/create">
        <BaseButton variant="primary" class="gap-2 shadow-sm">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة مشرف جديد
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Search & Filters -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4">
      <div class="relative flex-1">
        <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          placeholder="البحث بالاسم أو البريد الإلكتروني..."
        >
      </div>
    </div>

    <!-- Staff Table -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full text-right text-sm whitespace-nowrap">
          <thead class="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
            <tr>
              <th class="px-6 py-4">المشرف</th>
              <th class="px-6 py-4">البريد الإلكتروني</th>
              <th class="px-6 py-4">الرتبة</th>
              <th class="px-6 py-4">الحالة</th>
              <th class="px-6 py-4 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100/80">
            <tr v-for="staff in filteredStaff" :key="staff.id" class="hover:bg-slate-50/50 transition-colors group">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black text-lg shrink-0">
                    {{ staff.name.charAt(0) }}
                  </div>
                  <div class="font-bold text-slate-800">{{ staff.name }}</div>
                </div>
              </td>
              <td class="px-6 py-4 text-slate-500 font-medium font-mono" dir="ltr">
                {{ staff.email }}
              </td>
              <td class="px-6 py-4">
                <span class="font-bold" :class="getRoleColor(staff.role)">{{ getRoleName(staff.role) }}</span>
              </td>
              <td class="px-6 py-4">
                <span v-if="staff.isActive" class="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">نشط</span>
                <span v-else class="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600">معطل</span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                  <NuxtLink :to="`/dashboard/staff/${staff.id}`" class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="تعديل">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                  </NuxtLink>
                  <button @click="deleteStaff(staff.id)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف" :disabled="staff.role === 'admin'">
                    <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredStaff.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-slate-500 font-bold">
                لا يوجد مشرفين يطابقون بحثك.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()
const searchQuery = ref('')

// Mock Data
const staffMembers = ref([
  { id: '1', name: 'معتصم عاطف', email: 'admin@aswar.sa', role: 'admin', isActive: true },
  { id: '2', name: 'أحمد محمد', email: 'ahmed@aswar.sa', role: 'manager', isActive: true },
  { id: '3', name: 'سارة خالد', email: 'sara@aswar.sa', role: 'support', isActive: false },
])

const filteredStaff = computed(() => {
  if (!searchQuery.value) return staffMembers.value
  const query = searchQuery.value.toLowerCase()
  return staffMembers.value.filter(s => 
    s.name.toLowerCase().includes(query) || 
    s.email.toLowerCase().includes(query)
  )
})

const getRoleName = (role: string) => {
  const roles: Record<string, string> = {
    'admin': 'مدير عام',
    'manager': 'مدير متجر',
    'support': 'خدمة عملاء'
  }
  return roles[role] || role
}

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    'admin': 'text-purple-600',
    'manager': 'text-blue-600',
    'support': 'text-amber-600'
  }
  return colors[role] || 'text-slate-600'
}

const deleteStaff = (id: string) => {
  if (confirm('هل أنت متأكد من حذف هذا المشرف؟ لا يمكن التراجع عن هذا الإجراء.')) {
    staffMembers.value = staffMembers.value.filter(s => s.id !== id)
    success('تم الحذف', 'تم حذف المشرف بنجاح.')
  }
}
</script>
