<template>
  <div class="space-y-6 pb-24 lg:pb-6 relative">
    
    <!-- Header -->
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-black text-slate-800">إعدادات المتجر</h1>
        <p class="text-sm text-slate-500 mt-1">إدارة جميع الخيارات العامة والمالية للمتجر من مكان واحد.</p>
      </div>
      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Success Indicator -->
        <div v-if="hasUnsavedChanges" class="hidden sm:flex items-center justify-center gap-1.5 text-amber-600 text-xs font-bold bg-amber-50 rounded-lg px-3 py-2 border border-amber-100">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          تغييرات غير محفوظة
        </div>
        <BaseButton 
          variant="primary" 
          class="w-full sm:w-auto justify-center shadow-sm" 
          :loading="isSaving"
          @click="saveSettings"
        >
          حفظ التغييرات
        </BaseButton>
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex overflow-x-auto border-b border-slate-200 hide-scrollbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2"
        :class="activeTab === tab.id ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'"
      >
        <component :is="tab.icon" class="w-5 h-5" />
        {{ tab.name }}
      </button>
    </div>

    <!-- Main Content Area -->
    <div class="w-full space-y-6">
        
        <!-- Tab 1: General Settings -->
        <div v-show="activeTab === 'general'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">البيانات الأساسية</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput v-model="settings.storeName" label="اسم المتجر" placeholder="أدخل اسم المتجر..." />
              
              <BaseInput v-model="settings.supportEmail" label="البريد الإلكتروني للدعم" type="email" placeholder="support@domain.com"/>
              
              <BaseInput v-model="settings.supportPhone" label="رقم الهاتف / الجوال" type="tel" placeholder="+966500000000"/>
              
              <div class="md:col-span-2">
                <label class="block text-sm font-bold text-slate-700 mb-2">وصف المتجر (SEO)</label>
                <textarea 
                  v-model="settings.storeDescription" 
                  rows="3" 
                  class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-slate-700"
                  placeholder="وصف مختصر للمتجر يظهر في محركات البحث..."
                ></textarea>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">شعار المتجر (Logo)</h3>
            
            <div class="flex flex-col sm:flex-row gap-6 items-center">
              <div class="w-32 h-32 rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden shrink-0 relative group">
                <img v-if="settings.logoUrl" :src="settings.logoUrl" class="w-full h-full object-contain p-2" />
                <div v-else class="text-slate-400 flex flex-col items-center gap-2">
                  <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                
                <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span class="text-white text-xs font-bold">تغيير</span>
                </div>
                
                <input type="file" @change="handleLogoUpload" accept="image/*" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              </div>
              
              <div class="flex flex-col gap-2">
                <h4 class="font-bold text-slate-700">تحديث شعار المتجر</h4>
                <p class="text-xs text-slate-500 max-w-xs">يرجى رفع صورة بصيغة PNG أو JPG وبحجم لا يتجاوز 2 ميجابايت.</p>
                <div class="mt-2">
                  <BaseButton v-if="settings.logoUrl" variant="outline" size="sm" @click="settings.logoUrl = ''" class="text-red-600 border-red-200 hover:bg-red-50">إزالة الشعار</BaseButton>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">حالة المتجر</h3>
            <div class="flex items-start justify-between">
              <div>
                <h4 class="font-bold text-slate-700 mb-1">تفعيل المتجر للزوار</h4>
                <p class="text-xs text-slate-500">في حال التعطيل، ستظهر صفحة "المتجر تحت الصيانة" ولن يتمكن الزوار من تصفح المنتجات.</p>
              </div>
              <BaseToggle v-model="settings.isStoreActive" />
            </div>
          </div>
        </div>

        <!-- Tab 2: Financial Settings -->
        <div v-show="activeTab === 'financial'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">العملة والضرائب</h3>
            
            <div class="grid grid-cols-1 gap-6">
              <BaseSelect 
                v-model="settings.currency" 
                label="عملة المتجر الافتراضية" 
                :options="[{value: 'SAR', label: 'ريال سعودي (SAR)'}, {value: 'USD', label: 'دولار أمريكي (USD)'}]" 
              />
              
              <div class="pt-6 border-t border-slate-100">
                <div class="flex items-start justify-between mb-6">
                  <div>
                    <h4 class="font-bold text-slate-700 mb-1">تفعيل ضريبة القيمة المضافة (VAT)</h4>
                    <p class="text-xs text-slate-500">تطبيق الضريبة على جميع المنتجات وتكاليف الشحن.</p>
                  </div>
                  <BaseToggle v-model="settings.isTaxEnabled" />
                </div>
                
                <div v-if="settings.isTaxEnabled" class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <BaseInput v-model="settings.taxRate" label="نسبة الضريبة" type="number" min="0" max="100">
                    <template #icon><span class="text-slate-400 font-bold px-3">%</span></template>
                  </BaseInput>
                  
                  <BaseInput v-model="settings.taxNumber" label="الرقم الضريبي للمتجر" placeholder="أدخل الرقم الضريبي..." dir="ltr" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab 3: Shipping Settings -->
        <div v-show="activeTab === 'shipping'" class="space-y-6">
          
          <!-- General Shipping Rules -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">قواعد الشحن العامة</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BaseInput v-model="settings.freeShippingThreshold" label="الحد الأدنى للشحن المجاني (اتركه 0 للإلغاء)" type="number" min="0">
                <template #icon><span class="text-slate-400 font-bold px-3">ر.س</span></template>
              </BaseInput>
            </div>
          </div>

          <!-- Shipping Regions -->
          <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-6 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-slate-50/50">
              <div>
                <h3 class="text-lg font-black text-slate-800">مناطق الشحن</h3>
                <p class="text-xs text-slate-500 mt-1">تخصيص أسعار الشحن وأوقات التوصيل حسب المحافظة أو المدينة.</p>
              </div>
              <BaseButton variant="primary" @click="openRegionModal()" class="shrink-0 gap-2 shadow-sm">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" /></svg>
                إضافة منطقة شحن جديدة
              </BaseButton>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full text-right text-sm whitespace-nowrap">
                <thead class="bg-white text-slate-500 font-bold border-b border-slate-100">
                  <tr>
                    <th class="px-6 py-4">اسم المنطقة / المدينة</th>
                    <th class="px-6 py-4">تكلفة الشحن</th>
                    <th class="px-6 py-4">الوقت المتوقع</th>
                    <th class="px-6 py-4">الحالة</th>
                    <th class="px-6 py-4 text-center">الإجراءات</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100/80 bg-white">
                  <tr v-if="shippingRegions.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-slate-500 font-bold">
                      لا توجد مناطق شحن مضافة حتى الآن.
                    </td>
                  </tr>
                  <tr v-for="region in shippingRegions" :key="region.id" class="hover:bg-slate-50/50 transition-colors group">
                    <td class="px-6 py-4 font-bold text-slate-800">{{ region.name }}</td>
                    <td class="px-6 py-4 font-black text-slate-800">{{ region.cost }} ر.س</td>
                    <td class="px-6 py-4 text-slate-600">{{ region.estimatedTime }}</td>
                    <td class="px-6 py-4">
                      <span v-if="region.isActive" class="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-100 text-emerald-700">مفعل</span>
                      <span v-else class="px-2.5 py-1 rounded-md text-xs font-bold bg-slate-100 text-slate-600">معطل</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                        <button @click="openRegionModal(region)" class="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="تعديل">
                          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button @click="deleteRegion(region.id)" class="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="حذف">
                          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- Tab 4: Payments Settings -->
        <div v-show="activeTab === 'payments'" class="space-y-6">
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h3 class="text-lg font-black text-slate-800 mb-6">طرق الدفع المتاحة</h3>
            
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-700">الدفع عند الاستلام (COD)</h4>
                    <p class="text-xs text-slate-500 mt-1">السماح للعملاء بالدفع نقداً عند استلام طلباتهم.</p>
                  </div>
                </div>
                <BaseToggle v-model="settings.payments.cod" />
              </div>
              
              <div class="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                <div class="flex items-center gap-4">
                  <div class="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div>
                    <h4 class="font-bold text-slate-700">الدفع الإلكتروني (البطاقات)</h4>
                    <p class="text-xs text-slate-500 mt-1">تفعيل الدفع ببطاقات مدى، فيزا، وماستركارد.</p>
                  </div>
                </div>
                <BaseToggle v-model="settings.payments.online" />
              </div>
            </div>
          </div>
          
          <div v-if="settings.payments.online" class="bg-indigo-50/50 rounded-2xl p-6 shadow-sm border border-indigo-100">
            <h3 class="text-lg font-black text-indigo-900 mb-2">إعدادات بوابة الدفع (Paymob)</h3>
            <p class="text-sm text-indigo-600/80 mb-6">أدخل مفاتيح الربط الخاصة بحسابك لتفعيل المدفوعات بنجاح.</p>
            
            <div class="space-y-4">
              <BaseInput v-model="settings.payments.paymobApiKey" label="API Key" placeholder="sk_test_..." dir="ltr" class="font-mono" />
              <BaseInput v-model="settings.payments.paymobIntegrationId" label="Integration ID" placeholder="123456" dir="ltr" class="font-mono" />
              <BaseInput v-model="settings.payments.paymobIframeId" label="Iframe ID" placeholder="123456" dir="ltr" class="font-mono" />
            </div>
          </div>
        </div>
      </div>
  </div>

  <ShippingRegionModal 
    v-model:isOpen="isRegionModalOpen" 
    :regionData="selectedRegion" 
    @save="saveRegion"
  />
</template>

<script setup lang="ts">
import { ref, watch, h } from 'vue'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import ShippingRegionModal from '~/components/dashboard/settings/ShippingRegionModal.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const { success } = useToast()

// Icons for tabs
const TabIconGeneral = h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z' })
])
const TabIconFinancial = h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])
const TabIconShipping = h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z' })
])
const TabIconPayments = h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' })
])

const tabs = [
  { id: 'general', name: 'عام', icon: TabIconGeneral },
  { id: 'financial', name: 'المالية والضرائب', icon: TabIconFinancial },
  { id: 'shipping', name: 'الشحن', icon: TabIconShipping },
  { id: 'payments', name: 'المدفوعات', icon: TabIconPayments },
]

const activeTab = ref('general')
const isSaving = ref(false)
const hasUnsavedChanges = ref(false)

// State
const settings = ref({
  storeName: 'أسوار (Aswar)',
  supportEmail: 'support@aswar.sa',
  supportPhone: '+966559876543',
  storeDescription: 'متجر أسوار الرائد في بيع الأجهزة المنزلية...',
  logoUrl: '',
  isStoreActive: true,
  
  currency: 'SAR',
  isTaxEnabled: true,
  taxRate: 15,
  taxNumber: '300123456789003',
  
  freeShippingThreshold: 500,
  
  payments: {
    cod: true,
    online: true,
    paymobApiKey: '',
    paymobIntegrationId: '',
    paymobIframeId: ''
  }
})

// Shipping Regions State
const shippingRegions = ref([
  { id: '1', name: 'الرياض', cost: 25, estimatedTime: '1 - 2 أيام عمل', isActive: true },
  { id: '2', name: 'جدة', cost: 35, estimatedTime: '2 - 3 أيام عمل', isActive: true },
  { id: '3', name: 'الدمام', cost: 40, estimatedTime: '3 - 5 أيام عمل', isActive: true }
])
const isRegionModalOpen = ref(false)
const selectedRegion = ref<any>(null)

const openRegionModal = (region: any = null) => {
  selectedRegion.value = region
  isRegionModalOpen.value = true
}

const saveRegion = (region: any) => {
  const index = shippingRegions.value.findIndex((r: any) => r.id === region.id)
  if (index !== -1) {
    shippingRegions.value[index] = region
  } else {
    shippingRegions.value.push(region)
  }
}

const deleteRegion = (id: string) => {
  if (confirm('هل أنت متأكد من حذف منطقة الشحن هذه؟')) {
    shippingRegions.value = shippingRegions.value.filter((r: any) => r.id !== id)
    success('تم الحذف', 'تم حذف منطقة الشحن بنجاح.')
  }
}

// Watch for changes to show "Unsaved" indicator
watch(() => settings.value, () => {
  hasUnsavedChanges.value = true
}, { deep: true })

const handleLogoUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    settings.value.logoUrl = URL.createObjectURL(file)
  }
}

const saveSettings = async () => {
  isSaving.value = true
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSaving.value = false
  hasUnsavedChanges.value = false
  success('تم حفظ الإعدادات', 'لقد تم تحديث إعدادات المتجر بنجاح.')
}
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
