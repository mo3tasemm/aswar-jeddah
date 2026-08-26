import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useAdminOrders } from './useAdminOrders-BL-HGdnF.mjs';
import { defineComponent, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import 'vue-router';
import '@vue/shared';
import 'unhead/utils';

//#region pages/admin/orders/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `${t("admin.orders.title")} | ${t("admin.sidebar.panel_title")}`) });
		const { orders, isLoading, isUpdatingPayment, errorMessage, totalOrders, currentPage, perPage, lastPage, orderStatusFilter, paymentStatusFilter, searchQuery, fetchOrders} = useAdminOrders();
		const statusPills = computed(() => [
			{
				value: "all",
				label: "كافة الطلبات"
			},
			{
				value: "pending",
				label: "قيد الانتظار"
			},
			{
				value: "confirmed",
				label: "تم التأكيد"
			},
			{
				value: "processing",
				label: "قيد التجهيز"
			},
			{
				value: "out_for_delivery",
				label: "خرج للتوصيل"
			},
			{
				value: "delivered",
				label: "تم التوصيل"
			},
			{
				value: "canceled",
				label: "ملغي"
			},
			{
				value: "returned",
				label: "مرتجع"
			}
		]);
		const orderStatusOptions = [
			{
				value: "all",
				label: "كافة الحالات (الكل)"
			},
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
		const paymentStatusOptions = [
			{
				value: "all",
				label: "كافة حالات الدفع (الكل)"
			},
			{
				value: "paid",
				label: "مدفوع (Paid)"
			},
			{
				value: "unpaid",
				label: "غير مدفوع (Unpaid)"
			}
		];
		const updateStatusOptions = [
			{
				value: "pending",
				label: "قيد الانتظار"
			},
			{
				value: "confirmed",
				label: "تم التأكيد"
			},
			{
				value: "processing",
				label: "قيد التجهيز"
			},
			{
				value: "out_for_delivery",
				label: "خرج للتوصيل"
			},
			{
				value: "delivered",
				label: "تم التوصيل"
			},
			{
				value: "canceled",
				label: "ملغي"
			},
			{
				value: "returned",
				label: "مرتجع"
			},
			{
				value: "failed",
				label: "فاشل"
			}
		];
		let searchTimeout = null;
		const handleSearchInput = () => {
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(() => {
				fetchOrders(1);
			}, 400);
		};
		const getOrderStatusClass = (status) => {
			switch (String(status || "pending").toLowerCase().trim()) {
				case "pending": return "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/70 focus:ring-amber-400";
				case "confirmed": return "bg-sky-50 text-sky-800 border-sky-300 hover:bg-sky-100/70 focus:ring-sky-400";
				case "processing": return "bg-blue-50 text-blue-800 border-blue-300 hover:bg-blue-100/70 focus:ring-blue-400";
				case "out_for_delivery":
				case "shipped": return "bg-indigo-50 text-indigo-800 border-indigo-300 hover:bg-indigo-100/70 focus:ring-indigo-400";
				case "delivered":
				case "completed": return "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70 focus:ring-emerald-400";
				case "canceled":
				case "cancelled":
				case "failed": return "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100/70 focus:ring-rose-400";
				case "returned": return "bg-orange-50 text-orange-800 border-orange-300 hover:bg-orange-100/70 focus:ring-orange-400";
				default: return "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 focus:ring-slate-400";
			}
		};
		const getPaymentStatusClass = (status) => {
			switch (String(status || "unpaid").toLowerCase().trim()) {
				case "paid": return "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100/70 focus:ring-emerald-400";
				case "unpaid": return "bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100/70 focus:ring-amber-400";
				case "refunded": return "bg-purple-50 text-purple-800 border-purple-300 hover:bg-purple-100/70 focus:ring-purple-400";
				default: return "bg-slate-50 text-slate-700 border-slate-300 hover:bg-slate-100 focus:ring-slate-400";
			}
		};
		const visiblePages = computed(() => {
			const pages = [];
			const maxButtons = 5;
			let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2));
			let end = Math.min(lastPage.value, start + maxButtons - 1);
			if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);
			for (let i = start; i <= end; i++) pages.push(i);
			return pages;
		});
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><div class="flex items-center gap-3"><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.orders.title"))}</h1>`);
			if (!unref(isLoading)) _push(`<span class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">${ssrInterpolate(unref(totalOrders))} ${ssrInterpolate(unref(t)("admin.orders.order_number") || "طلب")}</span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(unref(t)("admin.orders.subtitle"))}</p></div><div class="flex items-center gap-3 w-full sm:w-auto"><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"><!--[-->`);
			ssrRenderList(statusPills.value, (pill) => {
				_push(`<button class="${ssrRenderClass([unref(orderStatusFilter) === pill.value ? "bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50", "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border"])}"><span>${ssrInterpolate(pill.label)}</span></button>`);
			});
			_push(`<!--]--></div><div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"><div class="w-full md:flex-1">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: unref(searchQuery),
				"onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
				placeholder: unref(t)("admin.common.search_placeholder") + " (رقم الطلب أو اسم العميل أو الهاتف)...",
				onInput: handleSearchInput
			}, {
				icon: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 text-slate-400",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto"><div class="w-full sm:w-48"><label class="block text-[11px] font-black text-slate-500 mb-1">${ssrInterpolate(unref(t)("admin.orders.order_status"))}</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"><!--[-->`);
			ssrRenderList(orderStatusOptions, (opt) => {
				_push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(orderStatusFilter)) ? ssrLooseContain(unref(orderStatusFilter), opt.value) : ssrLooseEqual(unref(orderStatusFilter), opt.value)) ? " selected" : ""}>${ssrInterpolate(opt.label)}</option>`);
			});
			_push(`<!--]--></select></div><div class="w-full sm:w-44"><label class="block text-[11px] font-black text-slate-500 mb-1">${ssrInterpolate(unref(t)("admin.orders.payment_status"))}</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"><!--[-->`);
			ssrRenderList(paymentStatusOptions, (opt) => {
				_push(`<option${ssrRenderAttr("value", opt.value)}${ssrIncludeBooleanAttr(Array.isArray(unref(paymentStatusFilter)) ? ssrLooseContain(unref(paymentStatusFilter), opt.value) : ssrLooseEqual(unref(paymentStatusFilter), opt.value)) ? " selected" : ""}>${ssrInterpolate(opt.label)}</option>`);
			});
			_push(`<!--]--></select></div>`);
			if (unref(orderStatusFilter) !== "all" || unref(paymentStatusFilter) !== "all" || unref(searchQuery)) _push(`<div class="self-end pb-0.5"><button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer" title="إعادة تعيين الفلاتر">${ssrInterpolate(unref(t)("admin.common.reset_filter"))}</button></div>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div><button class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">`);
			if (unref(isLoading)) _push(`<div class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!unref(orders) || unref(orders).length === 0) {
				_push(`<div class="p-16 text-center space-y-3"><div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div><h3 class="text-base font-black text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</h3><p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي طلبات تطابق معايير البحث أو الفلترة المحددة.</p>`);
				if (unref(orderStatusFilter) !== "all" || unref(paymentStatusFilter) !== "all" || unref(searchQuery)) _push(`<button class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"> عرض كافة الطلبات </button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.order_number"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.customer"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.order_date"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.total_amount"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.payment_status"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.orders.order_status"))}</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(unref(orders), (order) => {
					_push(`<tr class="hover:bg-slate-50/80 transition-colors group"><td class="px-6 py-4 font-black text-slate-900">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${order.id}`,
						class: "text-[#0B0E28] hover:text-amber-600 flex items-center gap-1.5 cursor-pointer"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span class="font-mono text-sm"${_scopeId}>#${ssrInterpolate(order.id)}</span>`);
							else return [createVNode("span", { class: "font-mono text-sm" }, "#" + toDisplayString(order.id), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</td><td class="px-6 py-4"><div class="flex flex-col"><span class="font-bold text-slate-800">${ssrInterpolate(order.customer_name || "عميل غير مسجل")}</span>`);
					if (order.customer_phone) _push(`<span class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">${ssrInterpolate(order.customer_phone)}</span>`);
					else _push(`<!---->`);
					_push(`</div></td><td class="px-6 py-4 text-xs font-bold text-slate-600"><div>${ssrInterpolate(formatDate(order.created_at))}</div><div class="text-[11px] text-slate-400 font-mono mt-0.5">${ssrInterpolate(formatTime(order.created_at))}</div></td><td class="px-6 py-4 font-black text-slate-900 text-start"><span class="text-sm">${ssrInterpolate(formatCurrency(order.order_amount))}</span><span class="text-[11px] text-slate-400 ms-1">${ssrInterpolate(unref(t)("admin.common.currency"))}</span></td><td class="px-6 py-4"><div class="relative inline-block"><select${ssrRenderAttr("value", order.payment_status)}${ssrIncludeBooleanAttr(unref(isUpdatingPayment)) ? " disabled" : ""} class="${ssrRenderClass([getPaymentStatusClass(order.payment_status), "appearance-none text-xs font-black rounded-full px-3.5 py-1.5 pe-7 border transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2"])}" title="تغيير حالة الدفع"><option value="paid" class="bg-white text-slate-800 font-bold py-1">مدفوع (Paid)</option><option value="unpaid" class="bg-white text-slate-800 font-bold py-1">غير مدفوع (Unpaid)</option><option value="refunded" class="bg-white text-slate-800 font-bold py-1">مسترد (Refunded)</option></select><div class="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></div></td><td class="px-6 py-4"><div class="relative inline-block"><select${ssrRenderAttr("value", order.order_status)}${ssrIncludeBooleanAttr(_ctx.isUpdatingStatus) ? " disabled" : ""} class="${ssrRenderClass([getOrderStatusClass(order.order_status), "appearance-none text-xs font-black rounded-full px-3.5 py-1.5 pe-7 border transition-all cursor-pointer shadow-2xs focus:outline-none focus:ring-2"])}" title="تغيير حالة الطلب"><!--[-->`);
					ssrRenderList(updateStatusOptions, (st) => {
						_push(`<option${ssrRenderAttr("value", st.value)} class="bg-white text-slate-800 font-bold py-1">${ssrInterpolate(st.label)}</option>`);
					});
					_push(`<!--]--></select><div class="absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-60"><svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg></div></div></td><td class="px-6 py-4 text-center"><div class="flex items-center justify-center gap-2">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${order.id}`,
						class: "px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-[#0B0E28] text-slate-700 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("admin.common.details"))}</span>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-3.5 h-3.5",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								"stroke-width": "2.5"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							}), createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							})])), createVNode("span", null, toDisplayString(unref(t)("admin.common.details")), 1)];
						}),
						_: 2
					}, _parent));
					_push(`</div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div>`);
			}
			if (unref(orders) && unref(orders).length > 0 && unref(totalOrders) > unref(perPage)) {
				_push(`<div class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="text-xs font-bold text-slate-500"> عرض الصفحة <span class="text-slate-900 font-black">${ssrInterpolate(unref(currentPage))}</span> من أصل <span class="text-slate-900 font-black">${ssrInterpolate(unref(lastPage))}</span> (إجمالي ${ssrInterpolate(unref(totalOrders))} طلب) </div><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"> السابق </button><!--[-->`);
				ssrRenderList(visiblePages.value, (p) => {
					_push(`<button class="${ssrRenderClass([p === unref(currentPage) ? "bg-[#0B0E28] text-amber-400 shadow-sm" : "border border-slate-200 text-slate-700 hover:bg-slate-50", "w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center"])}">${ssrInterpolate(p)}</button>`);
				});
				_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(lastPage) || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"> التالي </button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/orders/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/orders/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = index_vue_vue_type_script_setup_true_lang_default;

export { orders_default as default };
//# sourceMappingURL=orders-B8iVHVOy.mjs.map
