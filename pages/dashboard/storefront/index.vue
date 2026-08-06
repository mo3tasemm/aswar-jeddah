<template>
  <div class="space-y-6 pb-24 lg:pb-6 relative">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة الواجهة الرئيسية</h1>
        <p class="text-sm text-slate-500 mt-1">تحكم في أقسام المتجر الرئيسية بسهولة.</p>
      </div>
      <BaseButton 
        variant="primary" 
        class="w-full sm:w-auto justify-center shadow-sm" 
        :loading="isSaving"
        @click="saveLayout"
      >
        حفظ التغييرات
      </BaseButton>
    </div>

    <!-- Layout Editor -->
    <div class="space-y-6">
      <div v-for="(section, index) in sections" :key="section.id" class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        
        <!-- Section Header -->
        <div class="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
              {{ index + 1 }}
            </span>
            <h3 class="font-bold text-slate-800">{{ getSectionTitle(section.type) }}</h3>
          </div>
          <span class="text-xs font-bold text-slate-400 bg-white px-2 py-1 rounded-md border border-slate-200 uppercase">{{ section.type }}</span>
        </div>

        <!-- Section Content Editor -->
        <div class="p-6">
          
          <!-- Hero Slider -->
          <div v-if="section.type === 'hero'" class="space-y-4">
            <p class="text-sm text-slate-500 mb-4">أضف روابط الصور والوجهات للسليدر الرئيسي.</p>
            <div v-for="(slide, sIdx) in section.slides" :key="sIdx" class="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-4 rounded-xl border border-slate-100 items-start">
              <div class="shrink-0">
                <ImageUploader v-model="slide.imageUrl" label="صورة السلايد (Desktop)" :maxFiles="1" />
              </div>
              <div class="flex-1 w-full space-y-4">
                <BaseInput v-model="slide.linkUrl" label="رابط التوجيه (مثال: /category/ac)" dir="ltr" />
              </div>
            </div>
          </div>

          <!-- Category Slider, Store Features, Guarantees, Location, Brands Ticker -->
          <div v-else-if="['category_slider', 'store_features', 'store_guarantees', 'store_location', 'brands_ticker'].includes(section.type)">
            <p class="text-sm text-slate-500 text-center py-4">هذا القسم ثابت ويسحب بياناته تلقائياً من إعدادات المتجر العامة.</p>
          </div>

          <!-- Brand Showcase -->
          <div v-else-if="section.type === 'brand_showcase'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <BaseInput v-model="section.title" label="عنوان القسم" placeholder="مثال: منتجات فيليبس" />
            
            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">العلامة التجارية</label>
              <select v-model="section.brandName" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                <option v-for="brand in brandOptions" :key="brand" :value="brand">{{ brand }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-bold text-slate-700">لون الخلفية (Background Color)</label>
              <div class="flex items-center gap-3">
                <input type="color" v-model="section.bgColorHex" @input="updateBgColor(section, $event)" class="w-10 h-10 rounded-lg cursor-pointer border-0 p-0" />
                <span class="text-sm font-mono text-slate-500" dir="ltr">{{ section.bgColorHex || extractHex(section.bgColor) }}</span>
              </div>
              <p class="text-xs text-slate-400">انقر لاختيار اللون المناسب להوية الماركة.</p>
            </div>
          </div>

          <!-- Brand Campaign -->
          <div v-else-if="section.type === 'brand_campaign'" class="flex flex-col md:flex-row gap-6">
            <div class="shrink-0">
              <ImageUploader v-model="section.bannerImage" label="صورة البانر" :maxFiles="1" />
            </div>
            
            <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
              <BaseInput v-model="section.title" label="العنوان الرئيسي للبانر" />
              <BaseInput v-model="section.btnText" label="نص الزر" />
              <BaseInput v-model="section.targetUrl" label="رابط التوجيه (Link)" dir="ltr" />
              
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">التصنيف المستهدف للمنتجات</label>
                <select v-model="section.category" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                  <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Side Banner -->
          <div v-else-if="section.type === 'side_banner'" class="flex flex-col md:flex-row gap-6">
            <div class="shrink-0">
              <ImageUploader v-model="section.sideBannerImage" label="صورة البانر الجانبي" :maxFiles="1" />
            </div>
            
            <div class="flex-1 space-y-6">
              <BaseInput v-model="section.sideBannerUrl" label="رابط التوجيه (Link)" dir="ltr" />
              
              <div class="space-y-2">
                <label class="block text-sm font-bold text-slate-700">تصفية المنتجات حسب (اختر واحداً)</label>
                <div class="flex gap-4">
                  <select v-model="section.category" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                    <option value="">-- اختر التصنيف --</option>
                    <option v-for="cat in categoryOptions" :key="cat" :value="cat">{{ cat }}</option>
                  </select>
                  <select v-model="section.brandName" class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[42px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700">
                    <option value="">-- اختر الماركة --</option>
                    <option v-for="brand in brandOptions" :key="brand" :value="brand">{{ brand }}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- New Arrivals -->
          <div v-else-if="section.type === 'new_arrivals'" class="grid grid-cols-1 md:grid-cols-2 gap-6">
             <BaseInput v-model="section.shopUrl" label="رابط زر عرض الكل" dir="ltr" />
             <p class="text-sm text-slate-500 py-4 col-span-2">يعرض أحدث المنتجات المضافة للمتجر تلقائياً.</p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import ImageUploader from '~/components/dashboard/ui/ImageUploader.vue'
import { fetchHomeLayout, saveHomeLayout, type HomeSection } from '~/services/homeLayoutService'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()
const isSaving = ref(false)
const sections = ref<HomeSection[]>([])

// Options for selects
const brandOptions = ['PHILIPS', 'NUTRICOOK', 'JBL', 'TINECO', 'DYSON', 'SMEG']
const categoryOptions = ['أجهزة المطبخ', 'المكيفات', 'الشاشات', 'الغسالات']

onMounted(async () => {
  const data = await fetchHomeLayout()
  // Add temporary hex color field for the color picker based on tailwind arbitrary values if any
  sections.value = data.map(sec => {
    if (sec.bgColor) {
      sec.bgColorHex = extractHex(sec.bgColor)
    }
    return sec
  })
})

const getSectionTitle = (type: string) => {
  const titles: Record<string, string> = {
    hero: 'السليدر الرئيسي (Hero)',
    category_slider: 'أقسام المتجر (Categories)',
    brand_showcase: 'عرض منتجات ماركة',
    new_arrivals: 'أحدث المنتجات (New Arrivals)',
    brand_campaign: 'حملة ترويجية (Banner & Products)',
    side_banner: 'بانر جانبي ومنتجات',
    store_features: 'مميزات المتجر',
    brands_ticker: 'شريط الماركات المتحرك',
    store_guarantees: 'ضمانات المتجر',
    store_location: 'موقع المعرض'
  }
  return titles[type] || type
}

const extractHex = (bgColorClass: string) => {
  const match = bgColorClass.match(/bg-\[(#[0-9A-Fa-f]{6})\]/)
  return match ? match[1] : '#ffffff'
}

const updateBgColor = (section: any, event: any) => {
  const hex = event.target.value
  section.bgColor = `bg-[${hex}]`
}

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = error => reject(error)
  })
}

const saveLayout = async () => {
  isSaving.value = true
  try {
    // Convert any uploaded File objects to base64 strings so they can be JSON cloned
    for (const section of sections.value) {
      if (section.type === 'hero' && section.slides) {
        for (const slide of section.slides) {
          if (slide.imageUrl instanceof File) slide.imageUrl = await fileToBase64(slide.imageUrl)
          if (slide.mobileImageUrl instanceof File) slide.mobileImageUrl = await fileToBase64(slide.mobileImageUrl)
        }
      }
      if (section.type === 'brand_campaign' && section.bannerImage instanceof File) {
        section.bannerImage = await fileToBase64(section.bannerImage)
      }
      if (section.type === 'side_banner' && section.sideBannerImage instanceof File) {
        section.sideBannerImage = await fileToBase64(section.sideBannerImage)
      }
    }

    // Clean up temporary fields before saving
    const dataToSave = JSON.parse(JSON.stringify(sections.value))
    dataToSave.forEach((sec: any) => {
      delete sec.bgColorHex
    })
    
    await saveHomeLayout(dataToSave)
    success('تم حفظ تغييرات الواجهة بنجاح!')
  } catch (error) {
    console.error('Error saving layout:', error)
  } finally {
    isSaving.value = false
  }
}
</script>
