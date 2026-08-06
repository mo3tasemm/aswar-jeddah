<template>
  <div>
    <StaffForm v-if="!pending" :initialData="staffData" />
    <div v-else class="flex items-center justify-center py-20">
      <div class="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import StaffForm from '~/components/dashboard/StaffForm.vue'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const pending = ref(true)
const staffData = ref<any>(null)

onMounted(() => {
  // Simulate API fetch based on route.params.id
  setTimeout(() => {
    staffData.value = {
      id: route.params.id,
      name: 'أحمد محمد',
      email: 'ahmed@aswar.sa',
      role: 'manager',
      isActive: true,
      permissions: ['products', 'orders', 'customers']
    }
    pending.value = false
  }, 500)
})
</script>
