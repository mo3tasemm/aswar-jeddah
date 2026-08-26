import { _ as _plugin_vue_export_helper_default, b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { S as StatusBadge_default } from './StatusBadge-klet5TK_.mjs';
import { u as useAdminOrders } from './useAdminOrders-BL-HGdnF.mjs';
import { defineComponent, ref, computed, unref, withCtx, createTextVNode, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@vue/shared';

//#region pages/admin/orders/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute();
		const { t } = useAdminLanguage();
		const { currentOrder, currentOrderDetails, isLoadingDetails, isUpdatingStatus, isUpdatingPayment} = useAdminOrders();
		const selectedNewStatus = ref("pending");
		const selectedNewPaymentStatus = ref("unpaid");
		const updateStatusOptions = [
			{
				value: "pending",
				label: "قيد الانتظار (Pending)"
			},
			{
				value: "confirmed",
				label: "تم التأكيد (Confirmed)"
			},
			{
				value: "processing",
				label: "قيد التجهيز (Processing)"
			},
			{
				value: "out_for_delivery",
				label: "خرج للتوصيل (Out for delivery)"
			},
			{
				value: "delivered",
				label: "تم التوصيل (Delivered)"
			},
			{
				value: "canceled",
				label: "ملغي (Canceled)"
			},
			{
				value: "returned",
				label: "مرتجع (Returned)"
			},
			{
				value: "failed",
				label: "فشل التسليم (Failed)"
			}
		];
		const shippingAddress = computed(() => {
			if (!currentOrder.value) return null;
			return currentOrder.value.shipping_address_data || null;
		});
		const calculateSubtotal = computed(() => {
			if (!currentOrderDetails.value || currentOrderDetails.value.length === 0) return currentOrder.value?.order_amount || 0;
			return currentOrderDetails.value.reduce((sum, item) => sum + item.price * item.qty, 0);
		});
		const formatPaymentMethod = (method) => {
			if (!method) return "دفع إلكتروني";
			if (method === "cash_on_delivery" || method === "cod") return "الدفع عند الاستلام (COD)";
			if (method === "card" || method === "credit_card") return "بطاقة ائتمان / مدى";
			return method;
		};
		const formatDate = (dateStr) => {
			if (!dateStr) return "-";
			try {
				const cleanStr = String(dateStr).replace(" ", "T");
				const d = new Date(cleanStr);
				if (isNaN(d.getTime())) return String(dateStr).split("T")[0] || dateStr;
				return d.toLocaleDateString("ar-SA", {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
			} catch {
				return String(dateStr);
			}
		};
		const formatTime = (dateStr) => {
			if (!dateStr) return "";
			try {
				const cleanStr = String(dateStr).replace(" ", "T");
				const d = new Date(cleanStr);
				if (isNaN(d.getTime())) return "";
				return d.toLocaleTimeString("ar-SA", {
					hour: "2-digit",
					minute: "2-digit"
				});
			} catch {
				return "";
			}
		};
		const formatCurrency = (val) => {
			const num = Number(val || 0);
			if (isNaN(num)) return "0.00";
			return num.toLocaleString("en-US", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2
			});
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(_attrs)} data-v-1c1bd52c>`);
			if (unref(isLoadingDetails)) _push(`<div class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400" data-v-1c1bd52c><svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-1c1bd52c></path></svg><span class="text-sm font-bold" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!unref(currentOrder) && !unref(isLoadingDetails)) {
				_push(`<div class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100" data-v-1c1bd52c><div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto" data-v-1c1bd52c><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1c1bd52c></path></svg></div><h2 class="text-xl font-black text-slate-800" data-v-1c1bd52c>تعذر العثور على بيانات الطلب</h2><p class="text-xs text-slate-500 max-w-sm mx-auto" data-v-1c1bd52c>تأكد من صحة رقم الطلب أو حاول العودة إلى قائمة الطلبات.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/orders",
					class: "inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` العودة لقائمة الطلبات `);
						else return [createTextVNode(" العودة لقائمة الطلبات ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else if (unref(currentOrder)) {
				_push(`<div class="space-y-6 print:hidden" data-v-1c1bd52c><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between" data-v-1c1bd52c><div class="flex items-center gap-4" data-v-1c1bd52c>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/orders",
					class: "w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer",
					title: "العودة"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-v-1c1bd52c${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" data-v-1c1bd52c${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-5 h-5 rtl:-scale-x-100",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2.5"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M15 19l-7-7 7-7"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(`<div data-v-1c1bd52c><div class="flex flex-wrap items-center gap-3" data-v-1c1bd52c><h1 class="text-2xl font-black text-slate-900" data-v-1c1bd52c>تفاصيل الطلب <span class="font-mono text-amber-600" data-v-1c1bd52c>#${ssrInterpolate(unref(currentOrder).id)}</span></h1>`);
				_push(ssrRenderComponent(StatusBadge_default, {
					status: unref(currentOrder).order_status,
					type: "order"
				}, null, _parent));
				_push(ssrRenderComponent(StatusBadge_default, {
					status: unref(currentOrder).payment_status,
					type: "payment"
				}, null, _parent));
				_push(`</div><p class="text-xs text-slate-400 font-medium mt-1" data-v-1c1bd52c> تاريخ الطلب: ${ssrInterpolate(formatDate(unref(currentOrder).created_at))} - ${ssrInterpolate(formatTime(unref(currentOrder).created_at))}</p></div></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-1c1bd52c><button class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 font-bold text-xs transition-all shadow-2xs flex items-center justify-center gap-2 cursor-pointer" data-v-1c1bd52c><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.print_invoice"))}</span></button></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6" data-v-1c1bd52c><div class="lg:col-span-2 space-y-6" data-v-1c1bd52c><div class="bg-white p-5 sm:p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4" data-v-1c1bd52c><h3 class="text-sm font-black text-slate-900 flex items-center gap-2" data-v-1c1bd52c><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-1c1bd52c></span><span data-v-1c1bd52c>إجراءات تحديث حالة الطلب والدفع</span></h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1" data-v-1c1bd52c><div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2" data-v-1c1bd52c><label class="block text-xs font-black text-slate-700" data-v-1c1bd52c>تغيير حالة الطلب (Order Status):</label><div class="flex items-center gap-2" data-v-1c1bd52c><select class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400" data-v-1c1bd52c><!--[-->`);
				ssrRenderList(updateStatusOptions, (st) => {
					_push(`<option${ssrRenderAttr("value", st.value)} data-v-1c1bd52c${ssrIncludeBooleanAttr(Array.isArray(selectedNewStatus.value) ? ssrLooseContain(selectedNewStatus.value, st.value) : ssrLooseEqual(selectedNewStatus.value, st.value)) ? " selected" : ""}>${ssrInterpolate(st.label)}</option>`);
				});
				_push(`<!--]--></select><button${ssrIncludeBooleanAttr(unref(isUpdatingStatus) || selectedNewStatus.value === unref(currentOrder).order_status) ? " disabled" : ""} class="px-4 py-2 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0" data-v-1c1bd52c>`);
				if (unref(isUpdatingStatus)) _push(`<span data-v-1c1bd52c>...</span>`);
				else _push(`<span data-v-1c1bd52c>حفظ</span>`);
				_push(`</button></div></div><div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2" data-v-1c1bd52c><label class="block text-xs font-black text-slate-700" data-v-1c1bd52c>تغيير حالة الدفع (Payment Status):</label><div class="flex items-center gap-2" data-v-1c1bd52c><select class="flex-1 bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400" data-v-1c1bd52c><option value="paid" data-v-1c1bd52c${ssrIncludeBooleanAttr(Array.isArray(selectedNewPaymentStatus.value) ? ssrLooseContain(selectedNewPaymentStatus.value, "paid") : ssrLooseEqual(selectedNewPaymentStatus.value, "paid")) ? " selected" : ""}>مدفوع (Paid)</option><option value="unpaid" data-v-1c1bd52c${ssrIncludeBooleanAttr(Array.isArray(selectedNewPaymentStatus.value) ? ssrLooseContain(selectedNewPaymentStatus.value, "unpaid") : ssrLooseEqual(selectedNewPaymentStatus.value, "unpaid")) ? " selected" : ""}>غير مدفوع (Unpaid)</option><option value="refunded" data-v-1c1bd52c${ssrIncludeBooleanAttr(Array.isArray(selectedNewPaymentStatus.value) ? ssrLooseContain(selectedNewPaymentStatus.value, "refunded") : ssrLooseEqual(selectedNewPaymentStatus.value, "refunded")) ? " selected" : ""}>مسترد (Refunded)</option></select><button${ssrIncludeBooleanAttr(unref(isUpdatingPayment) || selectedNewPaymentStatus.value === unref(currentOrder).payment_status) ? " disabled" : ""} class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0" data-v-1c1bd52c>`);
				if (unref(isUpdatingPayment)) _push(`<span data-v-1c1bd52c>...</span>`);
				else _push(`<span data-v-1c1bd52c>حفظ</span>`);
				_push(`</button></div></div></div></div><div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden" data-v-1c1bd52c><div class="p-5 border-b border-slate-100 flex items-center justify-between" data-v-1c1bd52c><h3 class="text-sm font-black text-slate-900 flex items-center gap-2" data-v-1c1bd52c><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-1c1bd52c></span><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.order_items"))} (${ssrInterpolate(unref(currentOrderDetails).length)})</span></h3></div><div class="overflow-x-auto w-full" data-v-1c1bd52c><table class="w-full text-start text-sm" data-v-1c1bd52c><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-xs" data-v-1c1bd52c><tr data-v-1c1bd52c><th class="px-6 py-3.5 text-start" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.item"))}</th><th class="px-6 py-3.5 text-center" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.unit_price"))}</th><th class="px-6 py-3.5 text-center" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.quantity"))}</th><th class="px-6 py-3.5 text-start" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.total_amount"))}</th></tr></thead><tbody class="divide-y divide-slate-100" data-v-1c1bd52c><!--[-->`);
				ssrRenderList(unref(currentOrderDetails), (item) => {
					_push(`<tr class="hover:bg-slate-50/60 transition-colors" data-v-1c1bd52c><td class="px-6 py-4" data-v-1c1bd52c><div class="flex items-center gap-3" data-v-1c1bd52c><img${ssrRenderAttr("src", item.product_thumbnail || "/images/placeholder.png")}${ssrRenderAttr("alt", item.product_name)} class="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0 bg-slate-50" data-v-1c1bd52c><div class="flex flex-col" data-v-1c1bd52c><span class="font-black text-slate-900 text-xs leading-snug" data-v-1c1bd52c>${ssrInterpolate(item.product_name)}</span>`);
					if (item.variant) _push(`<span class="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold w-fit mt-1" data-v-1c1bd52c> النوع / السمة: ${ssrInterpolate(item.variant)}</span>`);
					else _push(`<!---->`);
					_push(`</div></div></td><td class="px-6 py-4 text-center font-bold text-slate-700 text-xs" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(item.price))} ${ssrInterpolate(unref(t)("admin.common.currency"))}</td><td class="px-6 py-4 text-center font-black text-slate-900 text-xs" data-v-1c1bd52c>${ssrInterpolate(item.qty)}</td><td class="px-6 py-4 text-start font-black text-slate-900 text-xs" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(item.price * item.qty))} ${ssrInterpolate(unref(t)("admin.common.currency"))}</td></tr>`);
				});
				_push(`<!--]--></tbody></table></div><div class="p-6 bg-slate-50/60 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6" data-v-1c1bd52c><div class="space-y-1.5 text-xs text-slate-400 font-medium" data-v-1c1bd52c><div class="flex items-center gap-2 text-slate-700 font-black" data-v-1c1bd52c><svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>ملخص الفاتورة والحسابات</span></div><p class="text-slate-500 text-[11px]" data-v-1c1bd52c>جميع الأسعار تشمل ضريبة القيمة المضافة المعتمدة ورسوم التوصيل.</p></div><div class="w-full sm:max-w-sm bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm space-y-3.5" data-v-1c1bd52c><div class="flex justify-between items-center text-xs" data-v-1c1bd52c><span class="text-slate-500 font-bold flex items-center gap-1.5" data-v-1c1bd52c><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.subtotal"))}</span><span class="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrderDetails).length)} منتجات </span></span><span class="font-black text-slate-800 font-mono text-sm" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(calculateSubtotal.value))} <span class="text-[11px] text-slate-400 font-bold font-sans" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.common.currency"))}</span></span></div><div class="flex justify-between items-center text-xs" data-v-1c1bd52c><span class="text-slate-500 font-bold" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.shipping_fee"))}</span><span class="font-black text-slate-800 font-mono text-sm" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).shipping_cost > 0 ? formatCurrency(unref(currentOrder).shipping_cost) : "0.00")} <span class="text-[11px] text-slate-400 font-bold font-sans" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.common.currency"))}</span></span></div>`);
				if (unref(currentOrder).discount_amount > 0) _push(`<div class="flex justify-between items-center text-xs bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100" data-v-1c1bd52c><span class="text-emerald-700 font-bold flex items-center gap-1.5" data-v-1c1bd52c><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.discount"))}</span></span><span class="font-black text-emerald-700 font-mono text-sm" data-v-1c1bd52c> -${ssrInterpolate(formatCurrency(unref(currentOrder).discount_amount))} <span class="text-[11px] font-sans" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.common.currency"))}</span></span></div>`);
				else _push(`<!---->`);
				_push(`<div class="pt-3.5 border-t-2 border-dashed border-slate-200 flex justify-between items-center" data-v-1c1bd52c><div data-v-1c1bd52c><span class="text-xs font-black text-[#0B0E28] block" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.grand_total"))}</span><span class="text-[10px] text-slate-400 font-medium" data-v-1c1bd52c>المبلغ الإجمالي المستحق</span></div><div class="text-end" data-v-1c1bd52c><span class="text-xl font-black text-amber-500 font-mono block leading-none" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(unref(currentOrder).order_amount))}</span><span class="text-[11px] font-bold text-slate-500" data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.common.currency"))}</span></div></div></div></div></div></div><div class="space-y-6" data-v-1c1bd52c><div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4" data-v-1c1bd52c><h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3" data-v-1c1bd52c><svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.customer"))}</span></h3><div class="space-y-3 text-xs" data-v-1c1bd52c><div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>الاسم:</span><span class="font-black text-slate-800 text-sm" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_name || "عميل غير مسجل")}</span></div>`);
				if (unref(currentOrder).customer_phone) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>رقم الهاتف:</span><a${ssrRenderAttr("href", `tel:${unref(currentOrder).customer_phone}`)} class="font-bold text-amber-600 font-mono" dir="ltr" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_phone)}</a></div>`);
				else _push(`<!---->`);
				if (unref(currentOrder).customer_email) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>البريد الإلكتروني:</span><span class="font-bold text-slate-700 font-mono" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_email)}</span></div>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4" data-v-1c1bd52c><h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3" data-v-1c1bd52c><svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" data-v-1c1bd52c></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>${ssrInterpolate(unref(t)("admin.orders.shipping_address"))}</span></h3>`);
				if (shippingAddress.value) {
					_push(`<div class="space-y-2.5 text-xs font-bold text-slate-700" data-v-1c1bd52c>`);
					if (shippingAddress.value.contact_person_name) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-normal" data-v-1c1bd52c>المستلم:</span><span data-v-1c1bd52c>${ssrInterpolate(shippingAddress.value.contact_person_name)}</span></div>`);
					else _push(`<!---->`);
					if (shippingAddress.value.city) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-normal" data-v-1c1bd52c>المدينة:</span><span data-v-1c1bd52c>${ssrInterpolate(shippingAddress.value.city)}</span></div>`);
					else _push(`<!---->`);
					if (shippingAddress.value.address) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-normal" data-v-1c1bd52c>العنوان:</span><span data-v-1c1bd52c>${ssrInterpolate(shippingAddress.value.address)}</span></div>`);
					else _push(`<!---->`);
					if (shippingAddress.value.phone) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-normal" data-v-1c1bd52c>هاتف التوصيل:</span><span class="font-mono" dir="ltr" data-v-1c1bd52c>${ssrInterpolate(shippingAddress.value.phone)}</span></div>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<div class="text-xs text-slate-400 font-medium" data-v-1c1bd52c> لم يتم تحديد تفاصيل عنوان شحن إضافية. </div>`);
				_push(`</div><div class="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 space-y-4" data-v-1c1bd52c><h3 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3" data-v-1c1bd52c><svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1c1bd52c><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" data-v-1c1bd52c></path></svg><span data-v-1c1bd52c>معلومات الدفع والمعاملة</span></h3><div class="space-y-3 text-xs" data-v-1c1bd52c><div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>طريقة الدفع:</span><span class="font-black text-slate-800" data-v-1c1bd52c>${ssrInterpolate(formatPaymentMethod(unref(currentOrder).payment_method))}</span></div>`);
				if (unref(currentOrder).transaction_ref) _push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>رقم المعاملة (Ref):</span><span class="font-mono font-bold text-slate-700" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).transaction_ref)}</span></div>`);
				else _push(`<!---->`);
				_push(`<div data-v-1c1bd52c><span class="text-slate-400 block font-bold mb-0.5" data-v-1c1bd52c>حالة الدفع الحالية:</span>`);
				_push(ssrRenderComponent(StatusBadge_default, {
					status: unref(currentOrder).payment_status,
					type: "payment"
				}, null, _parent));
				_push(`</div></div></div></div></div></div>`);
			} else _push(`<!---->`);
			if (unref(currentOrder)) {
				_push(`<div id="printable-invoice" class="hidden print:block p-8 bg-white text-slate-900 text-right" dir="rtl" data-v-1c1bd52c><div class="border-b-2 border-slate-900 pb-6 mb-6 flex justify-between items-start" data-v-1c1bd52c><div data-v-1c1bd52c><h1 class="text-2xl font-black text-slate-900" data-v-1c1bd52c>فاتورة طلب مبيعات</h1><p class="text-sm font-bold text-slate-600 mt-1 font-mono" data-v-1c1bd52c>رقم الطلب: #${ssrInterpolate(unref(currentOrder).id)}</p><p class="text-xs text-slate-500" data-v-1c1bd52c>تاريخ الطلب: ${ssrInterpolate(formatDate(unref(currentOrder).created_at))}</p></div><div class="text-left" dir="ltr" data-v-1c1bd52c><h2 class="text-xl font-black text-slate-900" data-v-1c1bd52c>WedgetStore</h2><p class="text-xs text-slate-500" data-v-1c1bd52c>المملكة العربية السعودية</p></div></div><div class="grid grid-cols-2 gap-6 mb-8 text-xs" data-v-1c1bd52c><div class="p-4 bg-slate-50 rounded-xl border border-slate-200" data-v-1c1bd52c><h3 class="font-black text-slate-900 mb-2" data-v-1c1bd52c>بيانات العميل:</h3><p class="font-bold" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_name)}</p>`);
				if (unref(currentOrder).customer_phone) _push(`<p class="font-mono mt-1" dir="ltr" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_phone)}</p>`);
				else _push(`<!---->`);
				if (unref(currentOrder).customer_email) _push(`<p class="font-mono mt-1" data-v-1c1bd52c>${ssrInterpolate(unref(currentOrder).customer_email)}</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="p-4 bg-slate-50 rounded-xl border border-slate-200" data-v-1c1bd52c><h3 class="font-black text-slate-900 mb-2" data-v-1c1bd52c>عنوان التوصيل:</h3>`);
				if (shippingAddress.value?.city) _push(`<p data-v-1c1bd52c>المدينة: ${ssrInterpolate(shippingAddress.value.city)}</p>`);
				else _push(`<!---->`);
				if (shippingAddress.value?.address) _push(`<p data-v-1c1bd52c>العنوان: ${ssrInterpolate(shippingAddress.value.address)}</p>`);
				else _push(`<!---->`);
				if (shippingAddress.value?.phone) _push(`<p class="font-mono mt-1" dir="ltr" data-v-1c1bd52c>هاتف التوصيل: ${ssrInterpolate(shippingAddress.value.phone)}</p>`);
				else _push(`<!---->`);
				_push(`</div></div><table class="w-full text-xs text-right mb-8 border border-slate-200" data-v-1c1bd52c><thead class="bg-slate-100 font-bold border-b border-slate-200" data-v-1c1bd52c><tr data-v-1c1bd52c><th class="p-3 border-e border-slate-200" data-v-1c1bd52c>المنتج</th><th class="p-3 border-e border-slate-200 text-center" data-v-1c1bd52c>السعر</th><th class="p-3 border-e border-slate-200 text-center" data-v-1c1bd52c>الكمية</th><th class="p-3 text-left" data-v-1c1bd52c>المجموع</th></tr></thead><tbody class="divide-y divide-slate-200" data-v-1c1bd52c><!--[-->`);
				ssrRenderList(unref(currentOrderDetails), (item) => {
					_push(`<tr data-v-1c1bd52c><td class="p-3 border-e border-slate-200" data-v-1c1bd52c><span class="font-bold" data-v-1c1bd52c>${ssrInterpolate(item.product_name)}</span>`);
					if (item.variant) _push(`<span class="text-[10px] text-slate-500 block" data-v-1c1bd52c>(${ssrInterpolate(item.variant)})</span>`);
					else _push(`<!---->`);
					_push(`</td><td class="p-3 border-e border-slate-200 text-center font-mono" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(item.price))} ر.س</td><td class="p-3 border-e border-slate-200 text-center font-mono font-bold" data-v-1c1bd52c>${ssrInterpolate(item.qty)}</td><td class="p-3 text-left font-mono font-bold" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(item.price * item.qty))} ر.س</td></tr>`);
				});
				_push(`<!--]--></tbody></table><div class="max-w-xs ms-auto text-xs space-y-2 border-t border-slate-300 pt-3" data-v-1c1bd52c><div class="flex justify-between font-bold" data-v-1c1bd52c><span data-v-1c1bd52c>المجموع الفرعي:</span><span class="font-mono" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(calculateSubtotal.value))} ر.س</span></div><div class="flex justify-between font-bold" data-v-1c1bd52c><span data-v-1c1bd52c>تكلفة الشحن:</span><span class="font-mono" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(unref(currentOrder).shipping_cost))} ر.س</span></div>`);
				if (unref(currentOrder).discount_amount > 0) _push(`<div class="flex justify-between font-bold text-emerald-700" data-v-1c1bd52c><span data-v-1c1bd52c>الخصم:</span><span class="font-mono" data-v-1c1bd52c>-${ssrInterpolate(formatCurrency(unref(currentOrder).discount_amount))} ر.س</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="flex justify-between text-base font-black border-t-2 border-slate-900 pt-2 mt-2" data-v-1c1bd52c><span data-v-1c1bd52c>المجموع الإجمالي:</span><span class="font-mono" data-v-1c1bd52c>${ssrInterpolate(formatCurrency(unref(currentOrder).order_amount))} ر.س</span></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/orders/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = /*#__PURE__*/ _plugin_vue_export_helper_default(_id__vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1c1bd52c"]]);

export { _id__default as default };
//# sourceMappingURL=_id_-g7OHzPJq.mjs.map
