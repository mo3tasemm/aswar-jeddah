<template>
  <div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
    
    <!-- Language Switcher Bar inside Form -->
    <div class="flex items-center justify-between pb-4 border-b border-slate-100">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-language text-indigo-600 text-base"></i>
        <span class="text-xs font-bold text-slate-700">لغة إدخال بيانات الرابط:</span>
      </div>
      <AdminLangTabs v-model="activeLang" />
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      
      <!-- 1. Titles Section (AR & EN) -->
      <div class="space-y-4">
        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
          <i class="fa-solid fa-heading text-indigo-500"></i>
          عناوين عنصر القائمة (Navbar Titles)
        </h3>

        <!-- ARABIC TITLE -->
        <div v-show="activeLang === 'ar'" class="space-y-4">
          <BaseInput 
            v-model="form.title_ar" 
            label="العنوان بالعربية (Arabic Title) *" 
            placeholder="مثال: الأجهزة المنزلية، العروض الخاصة..." 
            required 
          />
        </div>

        <!-- ENGLISH TITLE -->
        <div v-show="activeLang === 'en'" class="space-y-4">
          <BaseInput 
            v-model="form.title_en" 
            label="العنوان بالإنجليزية (English Title) *" 
            placeholder="e.g. Home Appliances, Special Offers..." 
            dir="ltr" 
            required
          />
        </div>
      </div>

      <!-- 2. Type & Quick Selector -->
      <div class="space-y-4 pt-2">
        <h3 class="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2">
          <i class="fa-solid fa-shapes text-indigo-500"></i>
          نوع الرابط والوجهة (Type & Destination)
        </h3>

        <div class="space-y-2">
          <label class="block text-xs font-bold text-slate-700">نوع العنصر في شريط التنقل</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              type="button" 
              v-for="tOpt in typeOptions" 
              :key="tOpt.value"
              @click="onTypeSelect(tOpt.value)"
              :class="[
                'p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs',
                form.type === tOpt.value 
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 font-black' 
                  : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100'
              ]"
            >
              <i :class="tOpt.icon"></i>
              <span>{{ tOpt.label }}</span>
            </button>
          </div>
        </div>

        <!-- Quick Autocomplete for Category / Brand -->
        <div v-if="form.type === 'category'" class="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
          <label class="block text-xs font-black text-amber-900 flex items-center gap-1.5">
            <i class="fa-solid fa-folder-tree"></i>
            اختر القسم من قاعدة البيانات لتوليد الرابط والعنوان تلقائياً
          </label>
          <select 
            @change="onCategoryAutofill($event)"
            class="w-full rounded-xl border border-amber-300 bg-white px-4 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-xs"
          >
            <option value="">-- اضغط للاختيار من أقسام المتجر --</option>
            <option v-for="cat in dbCategories" :key="cat.id" :value="cat.slug">{{ cat.name }}</option>
          </select>
        </div>

        <div v-if="form.type === 'brand'" class="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-2">
          <label class="block text-xs font-black text-indigo-900 flex items-center gap-1.5">
            <i class="fa-solid fa-tag"></i>
            اختر الماركة من قاعدة البيانات لتوليد الرابط والعنوان تلقائياً
          </label>
          <select 
            @change="onBrandAutofill($event)"
            class="w-full rounded-xl border border-indigo-300 bg-white px-4 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"
          >
            <option value="">-- اضغط للاختيار من ماركات المتجر --</option>
            <option v-for="b in dbBrands" :key="b.id" :value="b.slug">{{ b.name }}</option>
          </select>
        </div>

        <!-- URL & Target Row -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div class="sm:col-span-2">
            <BaseInput 
              v-model="form.url" 
              label="الرابط المستهدف (Target URL) *" 
              placeholder="/category/kitchen-appliances أو https://..." 
              dir="ltr" 
              required 
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">فتح الرابط في</label>
            <select 
              v-model="form.target" 
              class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              <option value="_self">نفس الصفحة (_self)</option>
              <option value="_blank">علامة تبويب جديدة (_blank)</option>
            </select>
          </div>
        </div>

        <!-- Parent Menu Item -->
        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">العنصر الأب في القائمة (Parent Item)</label>
          <select 
            v-model="form.parent_id" 
            class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            <option :value="null">-- عنصر رئيسي مباشر في شريط التنقل (بدون أب) --</option>
            <option 
              v-for="parent in parentCandidates" 
              :key="parent.id" 
              :value="parent.id"
            >
              ↳ {{ parent.title_ar || parent.title }}
            </option>
          </select>
          <p class="text-[11px] text-slate-400">إذا اخترت عنصراً أباً، فسيظهر هذا الرابط كخيار منسدل فرعي تحته.</p>
        </div>
      </div>

      <!-- 3. Promotional Badge & Appearance -->
      <div class="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-4">
        <h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5">
          <i class="fa-solid fa-tag text-indigo-500"></i>
          الشارة الترويجية والمظهر (Badge & Visuals)
        </h4>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div v-show="activeLang === 'ar'">
            <BaseInput 
              v-model="form.badge" 
              label="نص الشارة الترويجية (عربي)" 
              placeholder="مثال: خصم 20%, جديد, HOT" 
            />
          </div>

          <div v-show="activeLang === 'en'">
            <BaseInput 
              v-model="form.badge" 
              label="Promotional Badge Text (English)" 
              placeholder="e.g. 20% OFF, NEW, HOT" 
              dir="ltr"
            />
          </div>

          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-700">لون الشارة (Badge Color)</label>
            <div class="flex items-center gap-2">
              <input 
                type="color" 
                v-model="form.badge_color" 
                class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 shrink-0"
              />
              <input 
                type="text" 
                v-model="form.badge_color" 
                placeholder="#ef4444" 
                class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        <!-- Color Quick Presets -->
        <div class="flex items-center gap-2 flex-wrap pt-1">
          <span class="text-[11px] font-bold text-slate-400">ألوان سريعة للشارة:</span>
          <button 
            type="button" 
            v-for="preset in colorPresets" 
            :key="preset.color"
            @click="form.badge_color = preset.color"
            class="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white transition-transform hover:scale-105 cursor-pointer shadow-2xs"
            :style="{ backgroundColor: preset.color }"
          >
            {{ preset.name }}
          </button>
        </div>
      </div>

      <!-- 4. Icon & Sort Order -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
        <div class="space-y-1.5 sm:col-span-2">
          <label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome Icon)</label>
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm shrink-0 border border-indigo-100">
              <i v-if="form.icon" :class="form.icon"></i>
              <i v-else class="fa-solid fa-icons text-slate-400"></i>
            </div>
            <input 
              type="text" 
              v-model="form.icon" 
              placeholder="fa-solid fa-tag" 
              class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono"
              dir="ltr"
            />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="block text-xs font-bold text-slate-700">ترتيب الظهور (Sort Order)</label>
          <input 
            type="number" 
            v-model.number="form.sort_order" 
            min="1"
            class="w-full rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-bold text-slate-800"
          />
        </div>
      </div>

      <!-- 5. Active Status Toggle -->
      <div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
        <div>
          <span class="text-xs font-black text-slate-900 block">تفعيل العنصر في المتجر (Active Status)</span>
          <span class="text-[11px] text-slate-500">إظهار هذا الرابط أو القائمة المنسدلة لزوار المتجر فورياً.</span>
        </div>
        <label class="relative inline-flex items-center cursor-pointer">
          <input 
            type="checkbox" 
            v-model="form.is_active" 
            class="sr-only peer"
          />
          <div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
        </label>
      </div>

      <!-- 6. Form Actions -->
      <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button 
          type="button" 
          @click="$emit('cancel')"
          class="px-6 py-3 text-slate-600 hover:text-slate-900 font-bold text-sm rounded-xl transition-colors cursor-pointer border border-slate-200 bg-white hover:bg-slate-50"
        >
          إلغاء والرجوع
        </button>

        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <i v-if="isSubmitting" class="fa-solid fa-spinner fa-spin text-sm"></i>
          <i v-else class="fa-solid fa-check text-sm"></i>
          <span>{{ isSubmitting ? 'جاري الحفظ...' : (isEditMode ? 'حفظ التعديلات' : 'تأكيد إضافة عنصر القائمة') }}</span>
        </button>
      </div>

    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import AdminLangTabs from '~/components/dashboard/ui/AdminLangTabs.vue'
import type { NavbarItem, NavbarItemPayload } from '~/services/adminNavbarApiService'

const props = defineProps<{
  initialData?: Partial<NavbarItem>
  isEditMode?: boolean
  isSubmitting?: boolean
  parentOptions?: NavbarItem[]
  dbCategories?: Array<{ id: number | string; name: string; slug: string }>
  dbBrands?: Array<{ id: number | string; name: string; slug: string }>
}>()

const emit = defineEmits<{
  (e: 'submit', payload: NavbarItemPayload): void
  (e: 'cancel'): void
}>()

const activeLang = ref<'ar' | 'en'>('ar')

const form = reactive({
  title_ar: props.initialData?.title_ar || props.initialData?.title || '',
  title_en: props.initialData?.title_en || '',
  type: props.initialData?.type || 'link',
  url: props.initialData?.url || '/',
  target: props.initialData?.target || '_self',
  parent_id: props.initialData?.parent_id ? Number(props.initialData.parent_id) : null,
  badge: props.initialData?.badge || '',
  badge_color: props.initialData?.badge_color || '#ef4444',
  icon: props.initialData?.icon || '',
  is_active: props.initialData?.is_active !== undefined ? (props.initialData.is_active === 1 || props.initialData.is_active === true) : true,
  sort_order: props.initialData?.sort_order || 1
})

watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.title_ar = newVal.title_ar || newVal.title || ''
    form.title_en = newVal.title_en || ''
    form.type = newVal.type || 'link'
    form.url = newVal.url || '/'
    form.target = newVal.target || '_self'
    form.parent_id = newVal.parent_id ? Number(newVal.parent_id) : null
    form.badge = newVal.badge || ''
    form.badge_color = newVal.badge_color || '#ef4444'
    form.icon = newVal.icon || ''
    form.is_active = newVal.is_active !== undefined ? (newVal.is_active === 1 || newVal.is_active === true) : true
    form.sort_order = newVal.sort_order || 1
  }
}, { deep: true })

const typeOptions = [
  { value: 'link', label: 'رابط مباشر', icon: 'fa-solid fa-link' },
  { value: 'dropdown', label: 'قائمة منسدلة', icon: 'fa-solid fa-layer-group' },
  { value: 'category', label: 'قسم متجر', icon: 'fa-solid fa-folder-tree' },
  { value: 'brand', label: 'ماركة تجارية', icon: 'fa-solid fa-tag' }
]

const colorPresets = [
  { name: 'أحمر', color: '#ef4444' },
  { name: 'برتقالي', color: '#f97316' },
  { name: 'ذهبي', color: '#f59e0b' },
  { name: 'أخضر', color: '#10b981' },
  { name: 'أزرق', color: '#3b82f6' },
  { name: 'بنفسجي', color: '#8b5cf6' },
  { name: 'وردي', color: '#ec4899' }
]

const parentCandidates = computed(() => {
  return (props.parentOptions || []).filter(p => !props.initialData?.id || String(p.id) !== String(props.initialData.id))
})

const onTypeSelect = (typeVal: string) => {
  form.type = typeVal
  if (typeVal === 'dropdown') {
    form.url = '#'
  }
}

const onCategoryAutofill = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const slug = select.value
  if (!slug) return

  const found = (props.dbCategories || []).find(c => c.slug === slug)
  if (found) {
    if (!form.title_ar) form.title_ar = found.name
    form.url = `/category/${found.slug}`
  }
}

const onBrandAutofill = (event: Event) => {
  const select = event.target as HTMLSelectElement
  const slug = select.value
  if (!slug) return

  const found = (props.dbBrands || []).find(b => b.slug === slug)
  if (found) {
    if (!form.title_ar) form.title_ar = found.name
    form.url = `/brand/${found.slug}`
  }
}

const handleSubmit = () => {
  const payload: NavbarItemPayload = {
    title: form.title_ar || form.title_en,
    title_ar: form.title_ar,
    title_en: form.title_en || form.title_ar,
    type: form.type,
    url: form.url,
    target: form.target,
    parent_id: form.parent_id,
    badge: form.badge || undefined,
    badge_color: form.badge ? form.badge_color : undefined,
    icon: form.icon || undefined,
    is_active: form.is_active ? 1 : 0,
    sort_order: Number(form.sort_order) || 1
  }

  emit('submit', payload)
}
</script>
