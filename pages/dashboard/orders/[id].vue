<template>
  <div>
    <!-- Dashboard Screen Content -->
    <div class="space-y-6 print:hidden">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex items-center gap-4">
        <NuxtLink to="/dashboard/orders" class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 hover:border-indigo-100 transition-colors shadow-sm">
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-black text-slate-800">تفاصيل الطلب #{{ order.orderNumber }}</h1>
            <StatusBadge :status="order.status" />
          </div>
          <p class="text-sm text-slate-500 mt-1">{{ order.date }} - {{ order.time }}</p>
        </div>
      </div>
      
      <!-- Print Button -->
      <BaseButton variant="outline" class="gap-2 bg-white" @click="printInvoice">
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
        </svg>
        طباعة الفاتورة
      </BaseButton>
    </div>

    <!-- Main Content -->
    <div class="flex flex-col xl:flex-row gap-6">
      
      <!-- Right Column: Products & Timeline -->
      <div class="flex-1 space-y-6">
        
        <!-- Products Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div class="p-5 border-b border-slate-100">
            <h3 class="text-lg font-black text-slate-800">المنتجات المطلوبة</h3>
          </div>
          <div class="overflow-x-auto w-full">
            <table class="w-full text-right text-sm">
              <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100">
                <tr>
                  <th class="px-6 py-4">المنتج</th>
                  <th class="px-6 py-4">السعر</th>
                  <th class="px-6 py-4">الكمية</th>
                  <th class="px-6 py-4 text-left">المجموع</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100/80">
                <tr v-for="item in order.items" :key="item.id" class="hover:bg-slate-50/50 transition-colors">
                  <td class="px-6 py-4">
                    <div class="flex items-center gap-4">
                      <div class="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        <!-- Mock Image Placeholder -->
                        <svg class="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                      </div>
                      <div class="flex flex-col">
                        <span class="font-bold text-slate-800">{{ item.name }}</span>
                        <span class="text-xs text-slate-500 mt-1" v-if="item.variant">{{ item.variant }}</span>
                      </div>
                    </div>
                  </td>
                  <td class="px-6 py-4 text-slate-600 font-bold">{{ item.price }} ر.س</td>
                  <td class="px-6 py-4 text-slate-600">{{ item.quantity }}x</td>
                  <td class="px-6 py-4 text-left font-black text-slate-800">{{ item.price * item.quantity }} ر.س</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Order Financial Summary -->
          <div class="p-6 bg-slate-50 border-t border-slate-100">
            <div class="flex flex-col gap-3 mr-auto text-sm">
              <div class="flex justify-between items-center text-slate-600">
                <span>المجموع الفرعي:</span>
                <span class="font-bold">{{ order.subtotal }} ر.س</span>
              </div>
              <div class="flex justify-between items-center text-slate-600">
                <span>تكلفة الشحن:</span>
                <span class="font-bold">{{ order.shippingCost }} ر.س</span>
              </div>
              <div class="flex justify-between items-center text-slate-600" v-if="order.discount > 0">
                <span>الخصم:</span>
                <span class="font-bold text-emerald-600">-{{ order.discount }} ر.س</span>
              </div>
              <div class="pt-3 border-t border-slate-200 mt-1 flex justify-between items-center">
                <span class="font-black text-slate-800 text-base">الإجمالي:</span>
                <span class="font-black text-indigo-600 text-xl">{{ order.total }} ر.س</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Timeline -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-6">
          <h3 class="text-lg font-black text-slate-800">سجل الطلب (Timeline)</h3>
          
          <div class="relative border-r-2 border-slate-100 mr-3 pr-6 space-y-6">
            <div v-for="(event, index) in order.timeline" :key="index" class="relative">
              <span class="absolute w-3 h-3 bg-indigo-500 rounded-full -right-[29.5px] top-1.5 ring-4 ring-white"></span>
              <div class="flex flex-col">
                <span class="font-bold text-slate-800 text-sm">{{ event.statusLabel }}</span>
                <span class="text-xs text-slate-500 mt-1">{{ event.date }} - {{ event.time }}</span>
                <p class="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl" v-if="event.note">{{ event.note }}</p>
              </div>
            </div>
          </div>
        </div>
        
      </div>

      <!-- Left Column: Sidebar (Customer, Shipping, Status, Notes) -->
      <div class="w-full xl:w-[380px] shrink-0 space-y-6">
        
        <!-- Status Update -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">
          <h3 class="text-lg font-black text-slate-800">تحديث الحالة</h3>
          
          <BaseSelect 
            v-model="newStatus"
            label="حالة الطلب"
            :options="statusOptions"
          />
          
          <BaseButton variant="primary" @click="updateStatus" :loading="isUpdatingStatus" class="w-full">
            تحديث الحالة وإشعار العميل
          </BaseButton>
        </div>

        <!-- Internal Notes -->
        <div class="bg-amber-50/50 rounded-2xl p-6 shadow-sm border border-amber-100 flex flex-col gap-4">
          <div class="flex items-center gap-2 text-amber-700">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <h3 class="font-black">ملاحظات إدارية (داخلية)</h3>
          </div>
          
          <textarea 
            v-model="internalNotes"
            rows="3"
            class="w-full bg-white border border-amber-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-slate-700"
            placeholder="اكتب ملاحظات لمتابعة الطلب داخلياً (لن يراها العميل)..."
          ></textarea>
          
          <BaseButton 
            variant="primary" 
            size="sm" 
            @click="saveNotes" 
            :loading="isSavingNotes" 
            class="w-full bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-700 shadow-sm"
          >
            حفظ الملاحظة
          </BaseButton>
        </div>

        <!-- Customer Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">
          <h3 class="text-lg font-black text-slate-800">بيانات العميل</h3>
          
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-lg">
              {{ order.customerName.charAt(0) }}
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-slate-800">{{ order.customerName }}</span>
              <span class="text-sm text-slate-500">عميل جديد</span>
            </div>
          </div>
          
          <div class="pt-4 border-t border-slate-100 space-y-3 text-sm">
            <div class="flex items-center gap-3 text-slate-600">
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              <span>{{ order.customerEmail }}</span>
            </div>
            <div class="flex items-center gap-3 text-slate-600">
              <svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              <span dir="ltr">{{ order.customerPhone }}</span>
            </div>
          </div>
        </div>

        <!-- Shipping Info -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col gap-5">
          <h3 class="text-lg font-black text-slate-800">عنوان الشحن</h3>
          
          <div class="flex items-start gap-3 text-slate-600 text-sm">
            <svg class="w-5 h-5 text-slate-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            <div class="flex flex-col gap-1 leading-relaxed">
              <span class="font-bold text-slate-700">{{ order.shipping.city }}، {{ order.shipping.country }}</span>
              <span>{{ order.shipping.addressLine1 }}</span>
              <span v-if="order.shipping.addressLine2">{{ order.shipping.addressLine2 }}</span>
              <span>الرمز البريدي: {{ order.shipping.zip }}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
  
  <!-- Printable Invoice (Hidden on Screen, Visible on Print) -->
    <div id="printable-invoice" class="hidden print:block w-full bg-white text-black p-8 font-sans" dir="rtl">
      <!-- Invoice Header -->
      <div class="flex justify-between items-start border-b-2 border-slate-200 pb-6 mb-6">
        <div>
          <h1 class="text-3xl font-black text-slate-800">فاتورة ضريبية</h1>
          <p class="text-slate-500 mt-2">رقم الطلب: <span class="font-bold text-slate-800">#{{ order.orderNumber }}</span></p>
          <p class="text-slate-500">تاريخ الطلب: <span class="font-bold text-slate-800">{{ order.date }}</span></p>
        </div>
        <div class="text-left">
          <h2 class="text-2xl font-black text-indigo-600">أسوار (Aswar)</h2>
          <p class="text-sm text-slate-500 mt-1">المملكة العربية السعودية، الرياض</p>
          <p class="text-sm text-slate-500">الرقم الضريبي: 300123456789003</p>
        </div>
      </div>

      <!-- Customer & Shipping Info -->
      <div class="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">بيانات العميل</h3>
          <p class="font-bold text-slate-800">{{ order.customerName }}</p>
          <p class="text-slate-600">{{ order.customerEmail }}</p>
          <p class="text-slate-600" dir="ltr">{{ order.customerPhone }}</p>
        </div>
        <div>
          <h3 class="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">عنوان الشحن</h3>
          <p class="font-bold text-slate-800">{{ order.shipping.city }}، {{ order.shipping.country }}</p>
          <p class="text-slate-600">{{ order.shipping.addressLine1 }}</p>
          <p class="text-slate-600" v-if="order.shipping.addressLine2">{{ order.shipping.addressLine2 }}</p>
          <p class="text-slate-600">الرمز البريدي: {{ order.shipping.zip }}</p>
        </div>
      </div>

      <!-- Products Table -->
      <table class="w-full text-right border-collapse mb-8">
        <thead>
          <tr class="bg-slate-100">
            <th class="p-3 border border-slate-200 font-bold text-slate-700 text-sm">المنتج</th>
            <th class="p-3 border border-slate-200 font-bold text-slate-700 text-sm text-center">الكمية</th>
            <th class="p-3 border border-slate-200 font-bold text-slate-700 text-sm">السعر (ر.س)</th>
            <th class="p-3 border border-slate-200 font-bold text-slate-700 text-sm">الإجمالي (ر.س)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.id">
            <td class="p-3 border border-slate-200">
              <p class="font-bold text-slate-800">{{ item.name }}</p>
              <p class="text-xs text-slate-500" v-if="item.variant">{{ item.variant }}</p>
            </td>
            <td class="p-3 border border-slate-200 text-center font-bold">{{ item.quantity }}</td>
            <td class="p-3 border border-slate-200">{{ item.price }}</td>
            <td class="p-3 border border-slate-200 font-bold">{{ item.price * item.quantity }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals -->
      <div class="flex justify-end">
        <div class="w-72 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <div class="flex justify-between items-center mb-2">
            <span class="text-slate-600">المجموع الفرعي:</span>
            <span class="font-bold">{{ order.subtotal }} ر.س</span>
          </div>
          <div class="flex justify-between items-center mb-2">
            <span class="text-slate-600">تكلفة الشحن:</span>
            <span class="font-bold">{{ order.shippingCost }} ر.س</span>
          </div>
          <div class="flex justify-between items-center mb-2" v-if="order.discount > 0">
            <span class="text-slate-600">الخصم:</span>
            <span class="font-bold text-red-600">-{{ order.discount }} ر.س</span>
          </div>
          <div class="flex justify-between items-center mt-4 pt-4 border-t border-slate-200">
            <span class="font-black text-slate-800 text-lg">الإجمالي:</span>
            <span class="font-black text-indigo-600 text-xl">{{ order.total }} ر.س</span>
          </div>
        </div>
      </div>
      
      <!-- Footer Note -->
      <div class="mt-12 pt-6 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>شكراً لتسوقكم من متجر أسوار. نتمنى لكم يوماً سعيداً!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseButton from '~/components/dashboard/ui/BaseButton.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'
import { useToast } from '~/composables/useToast'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { success } = useToast()

const isUpdatingStatus = ref(false)
const isSavingNotes = ref(false)

const statusOptions = [
  { value: 'pending', label: 'قيد الانتظار' },
  { value: 'processing', label: 'قيد المعالجة (جاري التجهيز)' },
  { value: 'shipped', label: 'تم الشحن' },
  { value: 'completed', label: 'مكتمل (تم التسليم)' },
  { value: 'cancelled', label: 'ملغي' },
]

// Mock Order Data
const order = ref({
  id: '1',
  orderNumber: 'ORD-1001',
  date: '2026-08-06',
  time: '14:30',
  status: 'pending',
  customerName: 'أحمد محمد',
  customerEmail: 'ahmed@example.com',
  customerPhone: '+966 50 123 4567',
  shipping: {
    country: 'المملكة العربية السعودية',
    city: 'الرياض',
    addressLine1: 'حي الملقا، شارع الأمير محمد بن سعد',
    addressLine2: 'مبنى 45، شقة 12',
    zip: '13521'
  },
  items: [
    { id: 'p1', name: 'مكيف سبليت جداري 18000 وحدة', variant: 'بارد فقط', price: 2100, quantity: 2 },
    { id: 'p2', name: 'غسالة سامسونج تعبئة أمامية 9 كيلو', variant: 'فضي', price: 1800, quantity: 1 }
  ],
  subtotal: 6000,
  shippingCost: 50,
  discount: 150,
  total: 5900,
  timeline: [
    { statusLabel: 'تم إنشاء الطلب', date: '2026-08-06', time: '14:30', note: 'قام العميل بإنشاء الطلب واختيار الدفع عند الاستلام.' },
    { statusLabel: 'في انتظار المراجعة', date: '2026-08-06', time: '14:31', note: '' }
  ]
})

const newStatus = ref(order.value.status)
const internalNotes = ref('يرجى الاتصال بالعميل لتأكيد موعد التوصيل.')

const updateStatus = async () => {
  isUpdatingStatus.value = true
  await new Promise(resolve => setTimeout(resolve, 1000)) // simulate API
  order.value.status = newStatus.value
  
  // Add to timeline
  const selectedStatus = statusOptions.find(o => o.value === newStatus.value)
  order.value.timeline.unshift({
    statusLabel: `تم تغيير الحالة إلى: ${selectedStatus?.label}`,
    date: 'الآن',
    time: '',
    note: 'تم إرسال بريد إلكتروني للعميل بالحالة الجديدة.'
  })

  isUpdatingStatus.value = false
  success('تم تحديث الطلب بنجاح', 'تم إرسال إشعار للعميل بحالة الطلب الجديدة.')
}

const saveNotes = async () => {
  isSavingNotes.value = true
  await new Promise(resolve => setTimeout(resolve, 800)) // simulate API
  isSavingNotes.value = false
  success('تم حفظ الملاحظات', 'تم تحديث الملاحظات الإدارية بنجاح.')
}

const printInvoice = () => {
  window.print()
}
</script>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 1.5cm;
  }
  
  /* Reset background for printing */
  html, body {
    background-color: white !important;
  }
  
  /* The printable invoice takes over */
  #printable-invoice {
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
