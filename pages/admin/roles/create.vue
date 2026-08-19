<template>
  <div>
    <RoleForm :is-edit="false" />
  </div>
</template>

<script setup lang="ts">
import RoleForm from '~/components/dashboard/RoleForm.vue'

definePageMeta({
  layout: 'dashboard'
})

useHead({
  title: 'إضافة دور وظيفي جديد | لوحة التحكم'
})
</script>
