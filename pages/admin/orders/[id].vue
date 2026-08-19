<template>
  <div>
    <!-- Loading State -->
    <div v-if="isLoadingDetails" class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400">
      <svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <span class="text-sm font-bold">{{ t('admin.common.loading') }}</span>
    </div>

    <!-- Error / Not Found State -->
    <div v-else-if="!currentOrder && !isLoadingDetails" class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100">
      <div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      </div>
      <h2 class="text-xl font-black text-slate-800">تعذر العثور على بيانات الطلب</h2>
      <p class="text-xs text-slate-500 max-w-sm mx-auto">تأكد من صحة رقم الطلب أو حاول العودة إلى قائمة الطلبات.</p>
      <NuxtLink to="/admin/orders" class="inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer">
        العودة لقائمة الطلبات
      </NuxtLink>
    </div>

    <!-- Main Order Details View -->
    <div v-else-if="currentOrder" class="space-y-6 print:hidden">
      <!-- Top Action Bar -->
      <div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink 
            to="/admin/orders" 
            class="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer"
            title="العودة"
          >
            <svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </NuxtLink>

          <div>
            <div class="flex flex-wrap items-center gap-3">
              <h1 class="text-2xl font-black text-slate-900">تفاصيل الطلب <span class="font-mono text-amber-600">#{{ currentOrder.id }}</span></h1>
              <StatusBadge :status="currentOrder.order_status" type="order" />
              <StatusBadge :status="currentOrder.payment_status" type="payment" />
            </div>
            <p class="text-xs text-slate-400 font-medium mt-1">
              تاريخ الطلب: {{ formatDate(currentOrder.created_at) }} - {{ formatTime(currentOrder.created_at) }}
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto">
          <!-- Print Button -->
          <button 
            @click="printInvoice"
            class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>{{ t('admin.orders.print_invoice') }}</span>
          </button>
        </div>
      </div>

      <!-- Grid Content Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left / Main Column: Products & Quick Status Updates -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Quick Status Changer Card -->
          <div class="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
              <span>إجراءات تحديث حالة الطلب والدفع</span>
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <!-- Order Status Action -->
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <label class="block text-xs font-black text-slate-700">تغيير حالة الطلب (Order Status):</label>
                <div class="flex items-center gap-2">
                  <select 
                    v-model="selectedNewStatus"
                    class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
                  >
                    <option v-for="st in updateStatusOptions" :key="st.value" :value="st.value">
                      {{ st.label }}
                    </option>
                  </select>
                  <button
                    @click="handleUpdateOrderStatus"
                    :disabled="isUpdatingStatus || selectedNewStatus === currentOrder.order_status"
                    class="px-4 py-2 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <span v-if="isUpdatingStatus">...</span>
                    <span v-else>حفظ</span>
                  </button>
                </div>
              </div>

              <!-- Payment Status Action -->
              <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <label class="block text-xs font-black text-slate-700">تغيير حالة الدفع (Payment Status):</label>
                <div class="flex items-center gap-2">
                  <select 
                    v-model="selectedNewPaymentStatus"
                    class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"
                  >
                    <option value="paid">مدفوع (Paid)</option>
                    <option value="unpaid">غير مدفوع (Unpaid)</option>
                    <option value="refunded">مسترد (Refunded)</option>
                  </select>
                  <button
                    @click="handleUpdatePaymentStatus"
                    :disabled="isUpdatingPayment || selectedNewPaymentStatus === currentOrder.payment_status"
                    class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
                  >
                    <span v-if="isUpdatingPayment">...</span>
                    <span v-else>حفظ</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Order Items Table -->
          <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div class="p-5 border-b border-slate-100 flex items-center justify-between">
              <h3 class="text-sm font-black text-slate-900 flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>{{ t('admin.orders.order_items') }} ({{ currentOrderDetails.length }})</span>
              </h3>
            </div>

            <div class="overflow-x-auto w-full">
              <table class="w-full text-start text-sm">
                <thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-xs">
                  <tr>
                    <th class="px-6 py-3.5 text-start">{{ t('admin.orders.item') }}</th>
                    <th class="px-6 py-3.5 text-center">{{ t('admin.orders.unit_price') }}</th>
                    <th class="px-6 py-3.5 text-center">{{ t('admin.orders.quantity') }}</th>
                    <th class="px-6 py-3.5 text-start">{{ t('admin.orders.total_amount') }}</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr v-for="item in currentOrderDetails" :key="item.id" class="hover:bg-slate-50/60 transition-colors">
                    <!-- Product Image & Details -->
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-3">
                        <img 
                          :src="item.product_thumbnail || '/images/placeholder.png'" 
                          :alt="item.product_name"
                          class="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50"
                          @error="handleImageError($event)"
                        />
                        <div class="flex flex-col">
                          <span class="font-black text-slate-900 text-xs leading-snug">{{ item.product_name }}</span>
                          <span v-if="item.variant" class="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold w-fit mt-1">
                            النوع / السمة: {{ item.variant }}
                          </span>
                        </div>
                      </div>
                    </td>

                    <!-- Price -->
                    <td class="px-6 py-4 text-center font-bold text-slate-700 text-xs">
                      {{ formatCurrency(item.price) }} {{ t('admin.common.currency') }}
                    </td>

                    <!-- Quantity -->
                    <td class="px-6 py-4 text-center font-black text-slate-900 text-xs">
                      {{ item.qty }}
                    </td>

                    <!-- Item Total -->
                    <td class="px-6 py-4 text-start font-black text-slate-900 text-xs">
                      {{ formatCurrency(item.price * item.qty) }} {{ t('admin.common.currency') }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Financial Summary Box -->
            <div class="p-6 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
              
              <!-- Left side note & tax info -->
              <div class="space-y-1.5 text-xs text-slate-400 font-medium">
                <div class="flex items-center gap-2 text-slate-700 font-black">
                  <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>ملخص الفاتورة والحسابات</span>
                </div>
                <p class="text-slate-500 text-[11px]">جميع الأسعار تشمل ضريبة القيمة المضافة المعتمدة ورسوم التوصيل.</p>
              </div>

              <!-- Right side structured financial card -->
              <div class="w-full sm:max-w-sm bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3.5">
                <!-- Subtotal -->
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-500 font-bold flex items-center gap-1.5">
                    <span>{{ t('admin.orders.subtotal') }}</span>
                    <span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black">
                      {{ currentOrderDetails.length }} منتجات
                    </span>
                  </span>
                  <span class="font-black text-slate-800 font-mono text-sm">
                    {{ formatCurrency(calculateSubtotal) }} <span class="text-[11px] text-slate-400 font-bold font-sans">{{ t('admin.common.currency') }}</span>
                  </span>
                </div>

                <!-- Shipping -->
                <div class="flex justify-between items-center text-xs">
                  <span class="text-slate-500 font-bold">{{ t('admin.orders.shipping_fee') }}</span>
                  <span class="font-black text-slate-800 font-mono text-sm">
                    {{ currentOrder.shipping_cost > 0 ? formatCurrency(currentOrder.shipping_cost) : '0.00' }} 
                    <span class="text-[11px] text-slate-400 font-bold font-sans">{{ t('admin.common.currency') }}</span>
                  </span>
                </div>

                <!-- Discount if any -->
                <div v-if="currentOrder.discount_amount > 0" class="flex justify-between items-center text-xs bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                  <span class="text-emerald-700 font-bold flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    <span>{{ t('admin.orders.discount') }}</span>
                  </span>
                  <span class="font-black text-emerald-700 font-mono text-sm">
                    -{{ formatCurrency(currentOrder.discount_amount) }} <span class="text-[11px] font-sans">{{ t('admin.common.currency') }}</span>
                  </span>
                </div>

                <!-- Grand Total Box -->
                <div class="pt-3.5 border-t-2 border-dashed border-slate-200 flex justify-between items-center">
                  <div>
                    <span class="text-xs font-black text-[#0B0E28] block">{{ t('admin.orders.grand_total') }}</span>
                    <span class="text-[10px] text-slate-400 font-medium">المبلغ الإجمالي المستحق</span>
                  </div>
                  <div class="text-end">
                    <span class="text-xl font-black text-amber-500 font-mono block leading-none">
                      {{ formatCurrency(currentOrder.order_amount) }}
                    </span>
                    <span class="text-[11px] font-bold text-slate-500">{{ t('admin.common.currency') }}</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Right / Sidebar Column: Customer & Shipping Details -->
        <div class="space-y-6">
          
          <!-- Customer Information Card -->
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <span>{{ t('admin.orders.customer') }}</span>
            </h3>

            <div class="space-y-3 text-xs">
              <div>
                <span class="text-slate-400 block font-bold mb-0.5">الاسم:</span>
                <span class="font-black text-slate-800 text-sm">{{ currentOrder.customer_name || 'عميل غير مسجل' }}</span>
              </div>

              <div v-if="currentOrder.customer_phone">
                <span class="text-slate-400 block font-bold mb-0.5">رقم الهاتف:</span>
                <a :href="`tel:${currentOrder.customer_phone}`" class="font-bold text-amber-600 font-mono" dir="ltr">
                  {{ currentOrder.customer_phone }}
                </a>
              </div>

              <div v-if="currentOrder.customer_email">
                <span class="text-slate-400 block font-bold mb-0.5">البريد الإلكتروني:</span>
                <span class="font-bold text-slate-700 font-mono">{{ currentOrder.customer_email }}</span>
              </div>
            </div>
          </div>

          <!-- Shipping Address Card -->
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <span>{{ t('admin.orders.shipping_address') }}</span>
            </h3>

            <div v-if="shippingAddress" class="space-y-2.5 text-xs font-bold text-slate-700">
              <div v-if="shippingAddress.contact_person_name">
                <span class="text-slate-400 block font-normal">المستلم:</span>
                <span>{{ shippingAddress.contact_person_name }}</span>
              </div>
              <div v-if="shippingAddress.city">
                <span class="text-slate-400 block font-normal">المدينة:</span>
                <span>{{ shippingAddress.city }}</span>
              </div>
              <div v-if="shippingAddress.address">
                <span class="text-slate-400 block font-normal">العنوان:</span>
                <span>{{ shippingAddress.address }}</span>
              </div>
              <div v-if="shippingAddress.phone">
                <span class="text-slate-400 block font-normal">هاتف التوصيل:</span>
                <span class="font-mono" dir="ltr">{{ shippingAddress.phone }}</span>
              </div>
            </div>
            <div v-else class="text-xs text-slate-400 font-medium">
              لم يتم تحديد تفاصيل عنوان شحن إضافية.
            </div>
          </div>

          <!-- Payment & Method Details Card -->
          <div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4">
            <h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
              <svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
              <span>معلومات الدفع والمعاملة</span>
            </h3>

            <div class="space-y-3 text-xs">
              <div>
                <span class="text-slate-400 block font-bold mb-0.5">طريقة الدفع:</span>
                <span class="font-black text-slate-800">{{ formatPaymentMethod(currentOrder.payment_method) }}</span>
              </div>

              <div v-if="currentOrder.transaction_ref">
                <span class="text-slate-400 block font-bold mb-0.5">رقم المعاملة (Ref):</span>
                <span class="font-mono font-bold text-slate-700">{{ currentOrder.transaction_ref }}</span>
              </div>

              <div>
                <span class="text-slate-400 block font-bold mb-0.5">حالة الدفع الحالية:</span>
                <StatusBadge :status="currentOrder.payment_status" type="payment" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Printable Invoice Template (Visible only when window.print() is executed) -->
    <div v-if="currentOrder" id="printable-invoice" class="hidden print:block p-8 bg-white text-slate-900 text-right" dir="rtl">
      <div class="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start">
        <div>
          <h1 class="text-2xl font-black text-slate-900">فاتورة طلب مبيعات</h1>
          <p class="text-sm font-bold text-slate-600 mt-1 font-mono">رقم الطلب: #{{ currentOrder.id }}</p>
          <p class="text-xs text-slate-500">تاريخ الطلب: {{ formatDate(currentOrder.created_at) }}</p>
        </div>
        <div class="text-left" dir="ltr">
          <h2 class="text-xl font-black text-slate-900">WedgetStore</h2>
          <p class="text-xs text-slate-500">المملكة العربية السعودية</p>
        </div>
      </div>

      <!-- Customer & Shipping Summary for Invoice -->
      <div class="grid grid-cols-2 gap-6 mb-8 text-xs">
        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h3 class="font-black text-slate-900 mb-2">بيانات العميل:</h3>
          <p class="font-bold">{{ currentOrder.customer_name }}</p>
          <p v-if="currentOrder.customer_phone" class="font-mono mt-1" dir="ltr">{{ currentOrder.customer_phone }}</p>
          <p v-if="currentOrder.customer_email" class="font-mono mt-1">{{ currentOrder.customer_email }}</p>
        </div>

        <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h3 class="font-black text-slate-900 mb-2">عنوان التوصيل:</h3>
          <p v-if="shippingAddress?.city">المدينة: {{ shippingAddress.city }}</p>
          <p v-if="shippingAddress?.address">العنوان: {{ shippingAddress.address }}</p>
          <p v-if="shippingAddress?.phone" class="font-mono mt-1" dir="ltr">هاتف التوصيل: {{ shippingAddress.phone }}</p>
        </div>
      </div>

      <!-- Invoice Items Table -->
      <table class="w-full text-xs text-right mb-8 border border-slate-200">
        <thead class="bg-slate-100 font-bold border-b border-slate-200">
          <tr>
            <th class="p-3 border-e border-slate-200">المنتج</th>
            <th class="p-3 border-e border-slate-200 text-center">السعر</th>
            <th class="p-3 border-e border-slate-200 text-center">الكمية</th>
            <th class="p-3 text-left">المجموع</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200">
          <tr v-for="item in currentOrderDetails" :key="item.id">
            <td class="p-3 border-e border-slate-200">
              <span class="font-bold">{{ item.product_name }}</span>
              <span v-if="item.variant" class="text-[10px] text-slate-500 block">({{ item.variant }})</span>
            </td>
            <td class="p-3 border-e border-slate-200 text-center font-mono">{{ formatCurrency(item.price) }} ر.س</td>
            <td class="p-3 border-e border-slate-200 text-center font-mono font-bold">{{ item.qty }}</td>
            <td class="p-3 text-left font-mono font-bold">{{ formatCurrency(item.price * item.qty) }} ر.س</td>
          </tr>
        </tbody>
      </table>

      <!-- Total Calculation in Invoice -->
      <div class="max-w-xs ms-auto text-xs space-y-2 border-t border-slate-300 pt-3">
        <div class="flex justify-between font-bold">
          <span>المجموع الفرعي:</span>
          <span class="font-mono">{{ formatCurrency(calculateSubtotal) }} ر.س</span>
        </div>
        <div class="flex justify-between font-bold">
          <span>تكلفة الشحن:</span>
          <span class="font-mono">{{ formatCurrency(currentOrder.shipping_cost) }} ر.س</span>
        </div>
        <div v-if="currentOrder.discount_amount > 0" class="flex justify-between font-bold text-emerald-700">
          <span>الخصم:</span>
          <span class="font-mono">-{{ formatCurrency(currentOrder.discount_amount) }} ر.س</span>
        </div>
        <div class="flex justify-between text-base font-black border-t-2 border-slate-900 pt-2 mt-2">
          <span>المجموع الإجمالي:</span>
          <span class="font-mono">{{ formatCurrency(currentOrder.order_amount) }} ر.س</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import StatusBadge from '~/components/dashboard/ui/StatusBadge.vue'
import { useAdminOrders } from '~/composables/useAdminOrders'
import { useAdminLanguage } from '~/composables/useAdminLanguage'

definePageMeta({
  layout: 'dashboard'
})

const route = useRoute()
const { t } = useAdminLanguage()

const {
  currentOrder,
  currentOrderDetails,
  isLoadingDetails,
  isUpdatingStatus,
  isUpdatingPayment,
  fetchOrderDetails,
  updateOrderStatus,
  updatePaymentStatus
} = useAdminOrders()

const selectedNewStatus = ref('pending')
const selectedNewPaymentStatus = ref('unpaid')

const updateStatusOptions = [
  { value: 'pending', label: 'قيد الانتظار (Pending)' },
  { value: 'confirmed', label: 'تم التأكيد (Confirmed)' },
  { value: 'processing', label: 'قيد التجهيز (Processing)' },
  { value: 'out_for_delivery', label: 'خرج للتوصيل (Out for delivery)' },
  { value: 'delivered', label: 'تم التوصيل (Delivered)' },
  { value: 'canceled', label: 'ملغي (Canceled)' },
  { value: 'returned', label: 'مرتجع (Returned)' },
  { value: 'failed', label: 'فشل التسليم (Failed)' },
]

const shippingAddress = computed(() => {
  if (!currentOrder.value) return null
  return currentOrder.value.shipping_address_data || null
})

const calculateSubtotal = computed(() => {
  if (!currentOrderDetails.value || currentOrderDetails.value.length === 0) {
    return currentOrder.value?.order_amount || 0
  }
  return currentOrderDetails.value.reduce((sum, item) => sum + (item.price * item.qty), 0)
})

const handleUpdateOrderStatus = async () => {
  if (!currentOrder.value) return
  const ok = await updateOrderStatus(currentOrder.value.id, selectedNewStatus.value)
  if (ok && currentOrder.value) {
    selectedNewStatus.value = currentOrder.value.order_status
  }
}

const handleUpdatePaymentStatus = async () => {
  if (!currentOrder.value) return
  const ok = await updatePaymentStatus(currentOrder.value.id, selectedNewPaymentStatus.value)
  if (ok && currentOrder.value) {
    selectedNewPaymentStatus.value = currentOrder.value.payment_status
  }
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement | null
  if (target) {
    target.src = '/images/placeholder.png'
  }
}

const printInvoice = () => {
  window.print()
}

const formatPaymentMethod = (method?: string) => {
  if (!method) return 'دفع إلكتروني'
  if (method === 'cash_on_delivery' || method === 'cod') return 'الدفع عند الاستلام (COD)'
  if (method === 'card' || method === 'credit_card') return 'بطاقة ائتمان / مدى'
  return method
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-'
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return String(dateStr).split('T')[0] || dateStr
    return d.toLocaleDateString('ar-SA', { year: 'numeric', month: 'short', day: 'numeric' })
  } catch {
    return String(dateStr)
  }
}

const formatTime = (dateStr?: string) => {
  if (!dateStr) return ''
  try {
    const cleanStr = String(dateStr).replace(' ', 'T')
    const d = new Date(cleanStr)
    if (isNaN(d.getTime())) return ''
    return d.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
  } catch {
    return ''
  }
}

const formatCurrency = (val: any) => {
  const num = Number(val || 0)
  if (isNaN(num)) return '0.00'
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

onMounted(async () => {
  const orderId = route.params.id as string
  if (orderId) {
    const loaded = await fetchOrderDetails(orderId)
    if (loaded) {
      selectedNewStatus.value = loaded.order_status
      selectedNewPaymentStatus.value = loaded.payment_status
    }
  }
})
</script>

<style scoped>
@media print {
  @page {
    size: A4;
    margin: 1.5cm;
  }
  
  html, body {
    background-color: white !important;
    color: black !important;
  }
  
  #printable-invoice {
    display: block !important;
    width: 100%;
    margin: 0;
    padding: 0;
  }
}
</style>
