<template>
  <Breadcrumbs :items="items" :tiers="tiers" :current-title="currentTitle" />
</template>

<script setup lang="ts">
import Breadcrumbs from '~/components/common/Breadcrumbs.vue'

defineProps({
  items: {
    type: Array,
    default: undefined
  },
  tiers: {
    type: Array,
    default: undefined
  },
  currentTitle: {
    type: String,
    default: ''
  }
})
</script>
