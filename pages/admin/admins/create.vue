<template>
  <div>
    <StaffForm :is-edit="false" />
  </div>
</template>

<script setup lang="ts">
import StaffForm from '~/components/dashboard/StaffForm.vue'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إضافة مشرف جديد | لوحة التحكم'
})
</script>
