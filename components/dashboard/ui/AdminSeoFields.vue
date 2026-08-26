<template>
  <AdminCard 
    title="إعدادات محركات البحث والـ SEO (Meta Data)" 
    subtitle="تحسين ظهور الصفحة في نتائج بحث Google ومحركات البحث باللغتين العربية والإنجليزية."
    icon="fa-solid fa-magnifying-glass"
    iconColor="text-blue-500"
  >
    <!-- Arabic SEO -->
    <div v-show="activeLang === 'ar'" class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <BaseInput 
        :model-value="metaTitleAr"
        @update:model-value="$emit('update:metaTitleAr', $event)"
        :label="titleArLabel || 'عنوان الميتا (بالعربي)'" 
        :placeholder="titleArPlaceholder || 'سياسة الخصوصية والأمان | متجر أسوار جدة'" 
      />
      <BaseInput 
        :model-value="metaDescriptionAr"
        @update:model-value="$emit('update:metaDescriptionAr', $event)"
        :label="descArLabel || 'وصف الميتا (بالعربي)'" 
        :placeholder="descArPlaceholder || 'وصف تفصيلي لتحسين الـ SEO...'" 
      />
    </div>

    <!-- English SEO -->
    <div v-show="activeLang === 'en'" class="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
      <BaseInput 
        :model-value="metaTitleEn"
        @update:model-value="$emit('update:metaTitleEn', $event)"
        :label="titleEnLabel || 'Meta Title (English)'" 
        :placeholder="titleEnPlaceholder || 'Privacy Policy & Terms | Aswar Jeddah'" 
        dir="ltr" 
      />
      <BaseInput 
        :model-value="metaDescriptionEn"
        @update:model-value="$emit('update:metaDescriptionEn', $event)"
        :label="descEnLabel || 'Meta Description (English)'" 
        :placeholder="descEnPlaceholder || 'Detailed SEO description in English...'" 
        dir="ltr" 
      />
    </div>
  </AdminCard>
</template>

<script setup lang="ts">
import AdminCard from './AdminCard.vue'
import BaseInput from './BaseInput.vue'

withDefaults(defineProps<{
  metaTitleAr?: string
  metaTitleEn?: string
  metaDescriptionAr?: string
  metaDescriptionEn?: string
  activeLang?: 'ar' | 'en' | string
  titleArLabel?: string
  titleArPlaceholder?: string
  descArLabel?: string
  descArPlaceholder?: string
  titleEnLabel?: string
  titleEnPlaceholder?: string
  descEnLabel?: string
  descEnPlaceholder?: string
}>(), {
  activeLang: 'ar',
  metaTitleAr: '',
  metaTitleEn: '',
  metaDescriptionAr: '',
  metaDescriptionEn: ''
})

defineEmits<{
  (e: 'update:metaTitleAr', value: string): void
  (e: 'update:metaTitleEn', value: string): void
  (e: 'update:metaDescriptionAr', value: string): void
  (e: 'update:metaDescriptionEn', value: string): void
}>()
</script>
