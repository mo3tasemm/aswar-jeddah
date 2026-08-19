<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Header with Action Buttons -->
    <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <div class="flex items-center gap-3">
        <NuxtLink 
          to="/admin/coupons" 
          class="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer"
          title="العودة"
        >
          <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </NuxtLink>
        <div>
          <h1 class="text-xl sm:text-2xl font-black text-slate-900">
            {{ isEdit ? 'تعديل الكوبون' : 'إضافة كوبون جديد' }}
          </h1>
          <p class="text-xs sm:text-sm text-slate-500 mt-0.5">
            {{ isEdit ? `تعديل إعدادات وشروط الكوبون #${couponId}` : 'تحديد شروط ونسب وقواعد خصم الكوبون الجديد' }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <NuxtLink 
          to="/admin/coupons" 
          class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors text-center cursor-pointer"
        >
          {{ t('admin.common.cancel') }}
        </NuxtLink>
        <button 
          type="submit" 
          :disabled="isSubmitting"
          class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          <svg v-if="isSubmitting" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{{ isEdit ? 'حفظ التعديلات' : 'إضافة الكوبون' }}</span>
        </button>
      </div>
    </div>

    <!-- Server Error Alert -->
    <div v-if="serverErrorMessage" class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs">
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{{ serverErrorMessage }}</span>
      </div>
      <button v-if="serverErrorMessage.includes('مستخدم') || serverErrorMessage.includes('unique')" @click="generateCode" type="button" class="underline hover:text-rose-900 cursor-pointer font-black">
        توليد كود عشوائي بديل
      </button>
    </div>

    <!-- Main Form Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Right/Main Column: Coupon Settings (2 cols) -->
      <div class="lg:col-span-2 space-y-6">
        
        <!-- Basic Information Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>البيانات الأساسية للكوبون</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Coupon Title -->
            <div class="sm:col-span-2">
              <BaseInput 
                v-model="form.title"
                label="عنوان أو وصف الكوبون *"
                placeholder="مثال: خصم اليوم الوطني، عروض الصيف..."
                :error="getFieldError('title')"
                required
              />
            </div>

            <!-- Coupon Code with Auto-generator -->
            <div class="sm:col-span-2 space-y-1.5">
              <label class="block text-xs font-black text-slate-800">
                كود الخصم (Promo Code) *
              </label>
              <div class="flex items-center gap-2">
                <div class="flex-1">
                  <input
                    v-model="form.code"
                    type="text"
                    dir="ltr"
                    placeholder="مثال: ASWAR-SUMMER"
                    class="w-full px-4 py-2.5 rounded-xl border font-mono font-black text-sm text-slate-900 tracking-wider uppercase focus:outline-none transition-all"
                    :class="getFieldError('code') 
                      ? 'border-rose-400 bg-rose-50/60 focus:border-rose-500 text-rose-900' 
                      : 'border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400'"
                    required
                  />
                </div>
                <button
                  type="button"
                  @click="generateCode"
                  class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer"
                  title="توليد كود عشوائي جديد"
                >
                  <svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>توليد كود</span>
                </button>
              </div>
              <span v-if="getFieldError('code')" class="text-xs font-black text-rose-600 block mt-1">
                {{ getFieldError('code') }}
              </span>
              <p class="text-[11px] text-slate-400 font-medium">الأحرف والأرقام الإنجليزية فقط (بدون مسافات).</p>
            </div>

            <!-- Coupon Type -->
            <div>
              <BaseSelect
                v-model="form.coupon_type"
                label="نوع الكوبون *"
                :options="couponTypeOptions"
                :error="getFieldError('coupon_type')"
              />
            </div>

            <!-- Discount Type -->
            <div>
              <BaseSelect
                v-model="form.discount_type"
                label="نوع الخصم *"
                :options="discountTypeOptions"
                :error="getFieldError('discount_type')"
              />
            </div>

            <!-- Discount Value -->
            <div :class="form.coupon_type === 'free_delivery' ? 'opacity-50 pointer-events-none' : ''">
              <BaseInput
                v-model="form.discount"
                label="قيمة الخصم *"
                type="number"
                min="0"
                :max="form.discount_type === 'percent' ? '100' : undefined"
                step="0.01"
                placeholder="0"
                :error="getFieldError('discount')"
              >
                <template #icon>
                  <span class="text-slate-400 font-bold px-2 text-xs">
                    {{ form.discount_type === 'percent' ? '%' : 'ر.س' }}
                  </span>
                </template>
              </BaseInput>
              <p v-if="form.discount_type === 'percent'" class="text-[10px] text-slate-400 mt-1 font-medium">الحد الأقصى للنسبة 100%</p>
            </div>

            <!-- Max Discount (Only for percentage discount) -->
            <div v-if="form.discount_type === 'percent'">
              <BaseInput
                v-model="form.max_discount"
                label="الحد الأقصى لمبلغ الخصم (ر.س)"
                type="number"
                min="0"
                step="0.01"
                placeholder="اتركه 0 إذا لم يكن هناك حد أقصى"
                :error="getFieldError('max_discount')"
              />
            </div>
          </div>
        </div>

        <!-- Limits and Conditions Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
          <h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span>شروط الاستخدام والحدود</span>
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <!-- Minimum Purchase Amount -->
            <div>
              <BaseInput
                v-model="form.min_purchase"
                label="الحد الأدنى لمبلغ الطلب (ر.س)"
                type="number"
                min="0"
                step="0.01"
                placeholder="0"
                :error="getFieldError('min_purchase')"
              />
            </div>

            <!-- Usage Limit Per User / Total -->
            <div>
              <BaseInput
                v-model="form.limit"
                label="الحد الأقصى لمرات الاستخدام"
                type="number"
                min="0"
                placeholder="مثال: 1 (اتركه 0 لعدد غير محدود)"
                :error="getFieldError('limit')"
              />
            </div>
          </div>
        </div>

      </div>

      <!-- Left / Sidebar Column: Dates & Status (1 col) -->
      <div class="space-y-6">
        
        <!-- Validity Dates Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5">
          <h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>فترة الصلاحية</span>
          </h2>

          <!-- Start Date -->
          <div>
            <BaseInput
              v-model="form.start_date"
              label="تاريخ بدء السريان *"
              type="date"
              :error="getFieldError('start_date')"
              required
            />
          </div>

          <!-- Expire Date -->
          <div>
            <BaseInput
              v-model="form.expire_date"
              label="تاريخ انتهاء السريان *"
              type="date"
              :error="getFieldError('expire_date') || dateValidationError"
              required
            />
          </div>

          <div v-if="dateValidationError" class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">
            {{ dateValidationError }}
          </div>
        </div>

        <!-- Status & Visibility Card -->
        <div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>حالة الكوبون</span>
          </h2>

          <div class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <div>
              <span class="text-xs font-black text-slate-800 block">تفعيل الكوبون فوراً</span>
              <span class="text-[11px] text-slate-400 font-medium">سيكون الكوبون متاحاً للعملاء للاستخدام في السلة</span>
            </div>
            <BaseToggle v-model="form.status" />
          </div>
        </div>

        <!-- Live Preview Card -->
        <div class="bg-gradient-to-br from-[#0B0E28] to-slate-800 text-white rounded-3xl p-5 shadow-md border border-slate-800 space-y-3">
          <div class="flex justify-between items-center text-xs text-amber-400 font-black">
            <span>معاينة الكوبون</span>
            <span class="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-md border border-amber-400/30 text-[10px]">
              {{ form.status ? 'نشط' : 'معطل' }}
            </span>
          </div>

          <div class="p-3 bg-white/10 rounded-2xl border border-dashed border-amber-400/40 text-center space-y-1">
            <span class="text-xs font-bold text-slate-300 block">{{ form.title || 'عنوان الكوبون' }}</span>
            <span class="font-mono font-black text-lg text-amber-400 tracking-widest block uppercase">
              {{ form.code || 'COUPON-CODE' }}
            </span>
          </div>

          <div class="text-[11px] text-slate-300 space-y-1">
            <div class="flex justify-between">
              <span>قيمة الخصم:</span>
              <span class="font-bold text-white font-mono">
                {{ form.discount_type === 'percent' ? `${form.discount || 0}%` : `${form.discount || 0} ر.س` }}
              </span>
            </div>
            <div v-if="form.min_purchase > 0" class="flex justify-between">
              <span>الحد الأدنى:</span>
              <span class="font-bold text-white font-mono">{{ form.min_purchase }} ر.س</span>
            </div>
            <div class="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10">
              <span>الصلاحية حتى:</span>
              <span class="font-mono">{{ form.expire_date || 'غير محدد' }}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseInput from '~/components/dashboard/ui/BaseInput.vue'
import BaseSelect from '~/components/dashboard/ui/BaseSelect.vue'
import BaseToggle from '~/components/dashboard/ui/BaseToggle.vue'
import { useAdminCoupons } from '~/composables/useAdminCoupons'
import { useAdminLanguage } from '~/composables/useAdminLanguage'
import type { AdminCouponItem, AdminCouponPayload } from '~/services/adminCouponsApiService'

const props = defineProps<{
  initialData?: AdminCouponItem | null
  isEdit?: boolean
  couponId?: string | number
}>()

const router = useRouter()
const route = useRoute()
const { t } = useAdminLanguage()

const {
  saveCoupon,
  isSubmitting,
  validationErrors,
  errorMessage: serverErrorMessage,
  generateRandomCode
} = useAdminCoupons()

const form = reactive({
  title: '',
  code: '',
  coupon_type: 'discount_on_purchase',
  discount_type: 'percent',
  discount: 10,
  min_purchase: 0,
  max_discount: 0,
  limit: 1,
  start_date: new Date().toISOString().split('T')[0],
  expire_date: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
  status: true,
  customer_id: '0'
})

const couponTypeOptions = [
  { label: 'خصم على إجمالي المشتريات (Discount on purchase)', value: 'discount_on_purchase' },
  { label: 'توصيل مجاني (Free delivery)', value: 'free_delivery' },
  { label: 'خصم أول طلب (First order)', value: 'first_order' }
]

const discountTypeOptions = [
  { label: 'نسبة مئوية (%)', value: 'percent' },
  { label: 'مبلغ ثابت (ر.س)', value: 'amount' }
]

const dateValidationError = computed(() => {
  if (form.start_date && form.expire_date) {
    if (new Date(form.expire_date) < new Date(form.start_date)) {
      return 'تاريخ الانتهاء يجب ألا يسبق تاريخ بدء الكوبون'
    }
  }
  return null
})

const getFieldError = (field: string): string => {
  if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) {
    return validationErrors.value[field][0]
  }
  return ''
}

const generateCode = () => {
  form.code = generateRandomCode('ASWAR')
}

// Populate when initialData is provided
watch(() => props.initialData, (newVal) => {
  if (newVal) {
    form.title = newVal.title || ''
    form.code = newVal.code || ''
    form.coupon_type = newVal.coupon_type || 'discount_on_purchase'
    form.discount_type = newVal.discount_type === 'percentage' ? 'percent' : (newVal.discount_type || 'percent')
    form.discount = newVal.discount || 0
    form.min_purchase = newVal.min_purchase || 0
    form.max_discount = newVal.max_discount || 0
    form.limit = newVal.limit || 0
    form.start_date = newVal.start_date || form.start_date
    form.expire_date = newVal.expire_date || form.expire_date
    form.status = newVal.status === 1 || newVal.status === true
    form.customer_id = String(newVal.customer_id || '0')
  }
}, { immediate: true })

const resetForm = () => {
  form.title = ''
  form.code = ''
  form.coupon_type = 'discount_on_purchase'
  form.discount_type = 'percent'
  form.discount = 10
  form.min_purchase = 0
  form.max_discount = 0
  form.limit = 1
  form.start_date = new Date().toISOString().split('T')[0]
  form.expire_date = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0]
  form.status = true
  form.customer_id = '0'
}

const handleSubmit = async () => {
  if (dateValidationError.value) {
    return
  }

  if (form.discount_type === 'percent' && form.discount > 100) {
    alert('نسبة الخصم المئوية لا يمكن أن تتجاوز 100%')
    return
  }

  const payload: AdminCouponPayload = {
    title: form.title,
    code: form.code.trim().toUpperCase(),
    coupon_type: form.coupon_type,
    discount_type: form.discount_type,
    discount: Number(form.discount),
    min_purchase: Number(form.min_purchase),
    max_discount: Number(form.max_discount),
    limit: Number(form.limit),
    start_date: form.start_date,
    expire_date: form.expire_date,
    status: form.status ? 1 : 0,
    customer_id: form.customer_id
  }

  const targetId = props.couponId || props.initialData?.id || (props.isEdit ? (route.params.id as string) : undefined)
  console.log('[CouponForm] Submitting coupon payload:', payload, 'targetId:', targetId)

  const isEnglish = route.path.startsWith('/en') || route.path.includes('/en/admin')
  const targetPath = isEnglish ? '/en/admin/coupons' : '/admin/coupons'

  try {
    const success = await saveCoupon(payload, targetId)
    console.log('[CouponForm] saveCoupon result:', success)

    // If no blocking validation error, proceed with immediate redirect to coupons list
    if (!validationErrors.value || Object.keys(validationErrors.value).length === 0) {
      resetForm()
      console.log('[CouponForm] Redirecting to coupons table:', targetPath)
      await navigateTo(targetPath, { replace: true })
    }
  } catch (err) {
    console.error('[CouponForm] Error during save:', err)
    if (!validationErrors.value || Object.keys(validationErrors.value).length === 0) {
      resetForm()
      await navigateTo(targetPath, { replace: true })
    }
  }
}
</script>
