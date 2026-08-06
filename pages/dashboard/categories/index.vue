<template>
  <div class="space-y-6">
    <!-- Header & Actions -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إدارة التصنيفات</h1>
        <p class="text-sm text-slate-500 mt-1">نظّم متجرك وقم ببناء شجرة تصنيفات متكاملة.</p>
      </div>
      
      <NuxtLink to="/dashboard/categories/create">
        <BaseButton variant="primary" class="gap-2 shadow-md">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          إضافة تصنيف جديد
        </BaseButton>
      </NuxtLink>
    </div>

    <!-- Toolbar -->
    <div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
      <BaseInput v-model="searchQuery" placeholder="ابحث باسم التصنيف..." class="w-full max-w-md">
        <template #icon>
          <svg class="w-5 h-5" fill="none" viewBox="0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </template>
      </BaseInput>
      
      <div class="hidden sm:block text-sm font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
        إجمالي التصنيفات: {{ totalCategories }}
      </div>
    </div>

    <!-- Categories Wide Tree -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[400px]">
      <div class="px-6 py-4 border-b border-slate-100 bg-slate-50/50 grid grid-cols-12 gap-4 text-slate-500 font-bold text-sm">
        <div class="col-span-8 sm:col-span-6">التصنيف</div>
        <div class="col-span-4 hidden sm:block text-center">النوع</div>
        <div class="col-span-4 sm:col-span-2 text-center">الإجراءات</div>
      </div>
      
      <div class="p-2 sm:p-4 space-y-2">
        <div v-if="categoriesTree.length === 0" class="text-center py-12 text-slate-500 font-bold">
          لم يتم العثور على أي تصنيف.
        </div>
        
        <!-- Render Tree -->
        <div v-for="mainCat in categoriesTree" :key="mainCat.id" class="border border-slate-100 rounded-xl overflow-hidden shadow-sm">
          <!-- Main Category Row -->
          <div class="bg-white hover:bg-slate-50/50 px-4 py-3 grid grid-cols-12 gap-4 items-center group transition-colors">
            <div class="col-span-8 sm:col-span-6 flex items-center gap-4">
              <div class="w-12 h-12 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                <img v-if="mainCat.icon" :src="mainCat.icon" class="w-full h-full object-cover" />
                <svg v-else class="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <h4 class="font-black text-slate-800 text-base">{{ mainCat.name }}</h4>
            </div>
            <div class="col-span-4 hidden sm:flex justify-center">
              <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 font-bold text-xs">رئيسي</span>
            </div>
            <div class="col-span-4 sm:col-span-2 flex items-center justify-center gap-2">
              <NuxtLink :to="`/dashboard/categories/${mainCat.id}`" class="w-8 h-8 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="تعديل">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </NuxtLink>
              <button @click="deleteCategory(mainCat.id)" class="w-8 h-8 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="حذف">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
          </div>

          <!-- Sub Categories -->
          <div v-if="mainCat.children && mainCat.children.length > 0" class="border-t border-slate-100 bg-slate-50/30">
            <div v-for="(subCat, sIndex) in mainCat.children" :key="subCat.id" class="relative group">
              <!-- Branch line -->
              <div class="absolute right-10 top-0 bottom-0 w-px bg-slate-200 z-0"></div>
              <div class="absolute right-10 top-1/2 w-8 h-px bg-slate-200 z-0"></div>
              
              <div class="pr-20 pl-4 py-3 grid grid-cols-12 gap-4 items-center border-b border-slate-100 last:border-0 relative z-10 hover:bg-slate-50/80 transition-colors">
                <div class="col-span-8 sm:col-span-6 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                    <img v-if="subCat.icon" :src="subCat.icon" class="w-full h-full object-cover" />
                    <svg v-else class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
                  </div>
                  <h5 class="font-bold text-slate-700">{{ subCat.name }}</h5>
                </div>
                <div class="col-span-4 hidden sm:flex justify-center">
                  <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-sky-50 text-sky-700 font-bold text-xs">فرعي</span>
                </div>
                <div class="col-span-4 sm:col-span-2 flex items-center justify-center gap-2">
                  <NuxtLink :to="`/dashboard/categories/${subCat.id}`" class="w-7 h-7 rounded-md text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="تعديل"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></NuxtLink>
                  <button @click="deleteCategory(subCat.id)" class="w-7 h-7 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="حذف"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
              </div>

              <!-- Sub-Sub Categories -->
              <div v-if="subCat.children && subCat.children.length > 0" class="bg-white/50">
                <div v-for="subSubCat in subCat.children" :key="subSubCat.id" class="relative group">
                  <!-- Branch line for Sub-Sub -->
                  <div class="absolute right-10 top-0 bottom-0 w-px bg-slate-200 z-0"></div>
                  <div class="absolute right-[6.5rem] top-0 bottom-0 w-px bg-slate-200 z-0"></div>
                  <div class="absolute right-[6.5rem] top-1/2 w-6 h-px bg-slate-200 z-0"></div>
                  
                  <div class="pr-[8.5rem] pl-4 py-2.5 grid grid-cols-12 gap-4 items-center border-b border-slate-50 last:border-0 relative z-10 hover:bg-slate-100/50 transition-colors">
                    <div class="col-span-8 sm:col-span-6 flex items-center gap-3">
                      <div class="w-2 h-2 rounded-full bg-slate-300"></div>
                      <h6 class="font-medium text-slate-600">{{ subSubCat.name }}</h6>
                    </div>
                    <div class="col-span-4 hidden sm:flex justify-center">
                      <span class="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 font-bold text-[11px]">فرعي دقيق</span>
                    </div>
                    <div class="col-span-4 sm:col-span-2 flex items-center justify-center gap-1">
                      <NuxtLink :to="`/dashboard/categories/${subSubCat.id}`" class="w-6 h-6 rounded text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="تعديل"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></NuxtLink>
                      <button @click="deleteCategory(subSubCat.id)" class="w-6 h-6 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100" title="حذف"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()

interface Category {
  id: string
  name: string
  icon?: string
  parentId?: string | null
  children?: Category[]
}

const searchQuery = ref('')

// Mock Data
const allCategoriesTree = ref<Category[]>([
  {
    id: 'cat_1',
    name: 'أجهزة كهربائية',
    icon: 'https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=150&auto=format&fit=crop',
    children: [
      {
        id: 'cat_1_1',
        parentId: 'cat_1',
        name: 'مكيفات',
        children: [
          { id: 'cat_1_1_1', parentId: 'cat_1_1', name: 'سبليت' },
          { id: 'cat_1_1_2', parentId: 'cat_1_1', name: 'شباك' }
        ]
      },
      {
        id: 'cat_1_2',
        parentId: 'cat_1',
        name: 'ثلاجات',
        children: [
          { id: 'cat_1_2_1', parentId: 'cat_1_2', name: 'فريزر علوي' },
          { id: 'cat_1_2_2', parentId: 'cat_1_2', name: 'بابين متقابلين' }
        ]
      }
    ]
  },
  {
    id: 'cat_2',
    name: 'أجهزة المطبخ',
    icon: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=150&auto=format&fit=crop',
    children: [
      { id: 'cat_2_1', parentId: 'cat_2', name: 'خلاطات' },
      { id: 'cat_2_2', parentId: 'cat_2', name: 'عجانات' }
    ]
  }
])

const categoriesTree = computed(() => {
  if (!searchQuery.value) return allCategoriesTree.value
  const q = searchQuery.value.toLowerCase()
  // Very simplistic search for demo purposes (usually done via API)
  return allCategoriesTree.value.filter(cat => cat.name.toLowerCase().includes(q))
})

const totalCategories = computed(() => {
  let count = 0
  const countNode = (node: Category) => {
    count++
    if (node.children) node.children.forEach(countNode)
  }
  allCategoriesTree.value.forEach(countNode)
  return count
})

const deleteCategory = (id: string) => {
  if(confirm('هل أنت متأكد من حذف هذا التصنيف؟ سيتم حذف جميع التصنيفات الفرعية المرتبطة به.')) {
    success('تم الحذف بنجاح', 'تم إزالة التصنيف من المتجر.')
  }
}
</script>
