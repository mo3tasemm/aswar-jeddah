import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useAdminCustomers } from './useAdminCustomers-BFAXAu3o.mjs';
import { defineComponent, computed, mergeProps, unref, isRef, withCtx, openBlock, createBlock, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

//#region pages/admin/customers/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `${t("admin.customers.title")} | ${t("admin.sidebar.panel_title")}`) });
		const { customers, isLoading, isUpdatingStatus, errorMessage, totalCustomers, lastPage, currentPage, perPage, searchQuery, statusFilter, fetchCustomers} = useAdminCustomers();
		let searchTimeout = null;
		const handleSearchInput = () => {
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(() => {
				fetchCustomers(1);
			}, 400);
		};
		const getInitials = (name) => {
			if (!name) return "ع";
			return name.trim().charAt(0).toUpperCase();
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
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><div class="flex items-center gap-3"><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.customers.title"))}</h1>`);
			if (!unref(isLoading)) _push(`<span class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">${ssrInterpolate(unref(totalCustomers))} عميل </span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(unref(t)("admin.customers.subtitle"))}</p></div><div class="flex items-center gap-3 w-full sm:w-auto"><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button></div></div><div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"><div class="w-full md:flex-1">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: unref(searchQuery),
				"onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
				placeholder: unref(t)("admin.common.search_placeholder") + " (الاسم أو البريد أو الهاتف)...",
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
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto"><div class="w-full sm:w-48"><label class="block text-[11px] font-black text-slate-500 mb-1">حالة الحساب</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>كافة الحالات (الكل)</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "1") : ssrLooseEqual(unref(statusFilter), "1")) ? " selected" : ""}>حسابات نشطة (Active)</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "0") : ssrLooseEqual(unref(statusFilter), "0")) ? " selected" : ""}>حسابات محظورة (Blocked)</option></select></div>`);
			if (unref(statusFilter) !== "" || unref(searchQuery)) _push(`<div class="self-end pb-0.5"><button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer" title="إعادة تعيين الفلاتر">${ssrInterpolate(unref(t)("admin.common.reset_filter"))}</button></div>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div><button class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">`);
			if (unref(isLoading)) _push(`<div class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!unref(customers) || unref(customers).length === 0) {
				_push(`<div class="p-16 text-center space-y-3"><div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div><h3 class="text-base font-black text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</h3><p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي عملاء يطابقون معايير البحث المحددة.</p>`);
				if (unref(statusFilter) !== "" || unref(searchQuery)) _push(`<button class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"> عرض كافة العملاء </button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.customers.customer_details"))}</th><th class="px-6 py-4 font-bold text-start">معلومات الاتصال والمدينة</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.customers.orders_count"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.customers.total_spent"))}</th><th class="px-6 py-4 font-bold text-center">حالة الحساب</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(unref(customers), (customer) => {
					_push(`<tr class="hover:bg-slate-50/80 transition-colors group"><td class="px-6 py-4"><div class="flex items-center gap-3.5">`);
					if (customer.image_url) _push(`<img${ssrRenderAttr("src", customer.image_url)}${ssrRenderAttr("alt", customer.name)} class="w-11 h-11 rounded-full object-cover border border-slate-200 shrink-0 bg-slate-100 shadow-2xs">`);
					else _push(`<div class="w-11 h-11 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-700 text-amber-400 flex items-center justify-center font-black text-sm shrink-0 shadow-2xs">${ssrInterpolate(getInitials(customer.name))}</div>`);
					_push(`<div class="flex flex-col">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/customers/${customer.id}`,
						class: "font-black text-slate-900 hover:text-amber-600 transition-colors text-xs sm:text-sm cursor-pointer"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(customer.name)}`);
							else return [createTextVNode(toDisplayString(customer.name), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<span class="text-xs text-slate-400 font-medium mt-0.5 font-mono">${ssrInterpolate(customer.email || "بدون بريد إلكتروني")}</span></div></div></td><td class="px-6 py-4 text-xs font-bold text-slate-600">`);
					if (customer.phone) _push(`<div class="font-mono text-slate-800" dir="ltr">${ssrInterpolate(customer.phone)}</div>`);
					else _push(`<div class="text-slate-400">غير محدد</div>`);
					_push(`<div class="text-[11px] text-slate-400 mt-0.5">${ssrInterpolate(customer.city || "المدينة غير محددة")}</div></td><td class="px-6 py-4 text-center"><span class="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black">${ssrInterpolate(customer.orders_count)} طلبات </span></td><td class="px-6 py-4 font-black text-slate-900 text-start"><span class="text-sm">${ssrInterpolate(formatCurrency(customer.total_spent))}</span><span class="text-[11px] text-slate-400 ms-1">${ssrInterpolate(unref(t)("admin.common.currency"))}</span></td><td class="px-6 py-4 text-center"><button${ssrIncludeBooleanAttr(unref(isUpdatingStatus)) ? " disabled" : ""} class="${ssrRenderClass([customer.is_active ? "bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100" : "bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100", "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black border transition-all cursor-pointer shadow-2xs hover:scale-105"])}"${ssrRenderAttr("title", customer.is_active ? "انقر لحظر الحساب" : "انقر لتفعيل الحساب")}><span class="${ssrRenderClass([customer.is_active ? "bg-emerald-500" : "bg-rose-500", "w-2 h-2 rounded-full"])}"></span><span>${ssrInterpolate(customer.is_active ? "نشط (Active)" : "محظور (Blocked)")}</span></button></td><td class="px-6 py-4 text-center"><div class="flex items-center justify-center gap-2">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/customers/${customer.id}`,
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
			if (unref(customers) && unref(customers).length > 0 && unref(totalCustomers) > unref(perPage)) {
				_push(`<div class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="text-xs font-bold text-slate-500"> عرض الصفحة <span class="text-slate-900 font-black">${ssrInterpolate(unref(currentPage))}</span> من أصل <span class="text-slate-900 font-black">${ssrInterpolate(unref(lastPage))}</span> (إجمالي ${ssrInterpolate(unref(totalCustomers))} عميل) </div><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"> السابق </button><!--[-->`);
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
//#region pages/admin/customers/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/customers/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var customers_default = index_vue_vue_type_script_setup_true_lang_default;

export { customers_default as default };
//# sourceMappingURL=customers-BVl8hcmy.mjs.map
