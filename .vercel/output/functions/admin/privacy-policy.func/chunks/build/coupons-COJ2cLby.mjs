import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { u as useAdminCoupons } from './useAdminCoupons-D7s_TgM8.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, isRef, createTextVNode, useSSRContext } from 'vue';
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

//#region pages/admin/coupons/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `${t("admin.coupons.title")} | ${t("admin.sidebar.panel_title")}`) });
		const { coupons, isLoading, isUpdatingStatus, isDeleting, errorMessage, totalCoupons, lastPage, currentPage, perPage, searchQuery, statusFilter, typeFilter, fetchCoupons, toggleCouponStatus, isExpired} = useAdminCoupons();
		const couponToDelete = ref(null);
		let searchTimeout = null;
		const handleSearchInput = () => {
			clearTimeout(searchTimeout);
			searchTimeout = setTimeout(() => {
				fetchCoupons(1);
			}, 400);
		};
		const handleToggleStatus = async (coupon) => {
			await toggleCouponStatus(coupon);
		};
		const getCouponTypeLabel = (type) => {
			return {
				discount_on_purchase: "خصم على المشتريات",
				free_delivery: "توصيل مجاني",
				first_order: "خصم أول طلب"
			}[type || ""] || "خصم عام";
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
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><div class="flex items-center gap-3"><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.coupons.title"))}</h1>`);
			if (!unref(isLoading)) _push(`<span class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full font-mono">${ssrInterpolate(unref(totalCoupons))} كوبون </span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(unref(t)("admin.coupons.subtitle"))}</p></div><div class="flex items-center gap-3 w-full sm:w-auto"><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50" title="تحديث البيانات"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/coupons/create",
				class: "w-full sm:w-auto inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs transition-all shadow-md gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("admin.coupons.add_coupon"))}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2.5"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M12 4v16m8-8H4"
					})])), createVNode("span", null, toDisplayString(unref(t)("admin.coupons.add_coupon")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"><div class="w-full md:flex-1">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: unref(searchQuery),
				"onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
				placeholder: unref(t)("admin.common.search_placeholder") + " (كود الكوبون أو العنوان)...",
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
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto"><div class="w-full sm:w-48"><label class="block text-[11px] font-black text-slate-500 mb-1">حالة الكوبون</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>كافة الحالات (الكل)</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "1") : ssrLooseEqual(unref(statusFilter), "1")) ? " selected" : ""}>كوبونات نشطة (Active)</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "0") : ssrLooseEqual(unref(statusFilter), "0")) ? " selected" : ""}>كوبونات معطلة (Inactive)</option><option value="expired"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "expired") : ssrLooseEqual(unref(statusFilter), "expired")) ? " selected" : ""}>كوبونات منتهية الصلاحية (Expired)</option></select></div><div class="w-full sm:w-48"><label class="block text-[11px] font-black text-slate-500 mb-1">نوع الكوبون</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "all") : ssrLooseEqual(unref(typeFilter), "all")) ? " selected" : ""}>كافة الأنواع</option><option value="discount_on_purchase"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "discount_on_purchase") : ssrLooseEqual(unref(typeFilter), "discount_on_purchase")) ? " selected" : ""}>خصم على المشتريات</option><option value="free_delivery"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "free_delivery") : ssrLooseEqual(unref(typeFilter), "free_delivery")) ? " selected" : ""}>توصيل مجاني</option><option value="first_order"${ssrIncludeBooleanAttr(Array.isArray(unref(typeFilter)) ? ssrLooseContain(unref(typeFilter), "first_order") : ssrLooseEqual(unref(typeFilter), "first_order")) ? " selected" : ""}>خصم أول طلب</option></select></div>`);
			if (unref(statusFilter) !== "" || unref(typeFilter) !== "all" || unref(searchQuery)) _push(`<div class="self-end pb-0.5"><button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer" title="إعادة تعيين الفلاتر">${ssrInterpolate(unref(t)("admin.common.reset_filter"))}</button></div>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div><button class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">`);
			if (unref(isLoading)) _push(`<div class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!unref(coupons) || unref(coupons).length === 0) {
				_push(`<div class="p-16 text-center space-y-3"><div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg></div><h3 class="text-base font-black text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</h3><p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">لم يتم العثور على أي كوبونات تطابق معايير البحث.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/coupons/create",
					class: "inline-block px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("admin.coupons.add_coupon"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("admin.coupons.add_coupon")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.coupons.coupon_code"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.coupons.discount_value"))}</th><th class="px-6 py-4 font-bold text-start">فترة الصلاحية</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.coupons.usage_count"))}</th><th class="px-6 py-4 font-bold text-center">حالة الكوبون</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(unref(coupons), (coupon) => {
					_push(`<tr class="hover:bg-slate-50/80 transition-colors group"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="px-3.5 py-1.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/80 font-mono font-black text-amber-900 tracking-wider text-xs flex items-center gap-1.5 shadow-2xs"><span>${ssrInterpolate(coupon.code)}</span><button class="text-amber-700 hover:text-amber-900 cursor-pointer" title="نسخ الكود"><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg></button></div><div class="flex flex-col"><span class="font-black text-slate-900 text-xs">${ssrInterpolate(coupon.title)}</span><span class="text-[11px] text-slate-400 font-bold mt-0.5">${ssrInterpolate(getCouponTypeLabel(coupon.coupon_type))}</span></div></div></td><td class="px-6 py-4 text-start"><div class="font-black text-slate-900 text-sm font-mono">`);
					if (coupon.coupon_type === "free_delivery") _push(`<span class="text-emerald-700 font-sans text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200"> توصيل مجاني </span>`);
					else if (coupon.discount_type === "percent" || coupon.discount_type === "percentage") {
						_push(`<span class="text-amber-700">${ssrInterpolate(coupon.discount)}% `);
						if (coupon.max_discount > 0) _push(`<span class="text-[10px] text-slate-400 font-normal block"> (حد أقصى ${ssrInterpolate(coupon.max_discount)} ر.س) </span>`);
						else _push(`<!---->`);
						_push(`</span>`);
					} else _push(`<span class="text-slate-800">${ssrInterpolate(coupon.discount)} <span class="text-xs text-slate-400 font-bold font-sans">ر.س</span></span>`);
					_push(`</div>`);
					if (coupon.min_purchase > 0) _push(`<div class="text-[10px] text-slate-400 font-medium mt-0.5"> الحد الأدنى: ${ssrInterpolate(coupon.min_purchase)} ر.س </div>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-6 py-4 text-xs font-bold"><div class="text-slate-700 font-mono">${ssrInterpolate(coupon.start_date || "-")} <span class="text-slate-400">إلى</span> ${ssrInterpolate(coupon.expire_date || "-")}</div><div class="mt-1.5">`);
					if (unref(isExpired)(coupon)) _push(`<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-300 rounded-md text-[11px] font-black shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span><span>منتهي الصلاحية (Expired)</span></div>`);
					else _push(`<div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-md text-[11px] font-black shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>ساري المفعول (Valid)</span></div>`);
					_push(`</div></td><td class="px-6 py-4 text-center"><span class="px-3 py-1 bg-slate-100 text-slate-800 rounded-full text-xs font-black font-mono">${ssrInterpolate(coupon.order_count || 0)} / ${ssrInterpolate(coupon.limit > 0 ? coupon.limit : "∞")}</span></td><td class="px-6 py-4 text-center"><div class="flex flex-col items-center justify-center gap-1"><div${ssrRenderAttr("title", unref(isExpired)(coupon) ? "الكوبون منتهي الصلاحية ويتم تعطيله تلقائياً" : coupon.status === 1 || coupon.status === true ? "انقر لتعطيل الكوبون" : "انقر لتفعيل الكوبون")} class="${ssrRenderClass(unref(isExpired)(coupon) ? "cursor-not-allowed opacity-60" : "")}">`);
					_push(ssrRenderComponent(BaseToggle_default, {
						"model-value": !unref(isExpired)(coupon) && (coupon.status === 1 || coupon.status === true),
						"onUpdate:modelValue": ($event) => handleToggleStatus(coupon),
						disabled: unref(isUpdatingStatus) || unref(isExpired)(coupon)
					}, null, _parent));
					_push(`</div><span class="${ssrRenderClass([{
						"text-rose-600 font-bold": unref(isExpired)(coupon),
						"text-emerald-700 font-bold": !unref(isExpired)(coupon) && (coupon.status === 1 || coupon.status === true),
						"text-slate-400 font-bold": !unref(isExpired)(coupon) && (coupon.status === 0 || coupon.status === false)
					}, "text-[10px] font-black"])}">${ssrInterpolate(unref(isExpired)(coupon) ? "منتهي (معطل تلقائياً)" : coupon.status === 1 || coupon.status === true ? "نشط (Active)" : "معطل (Inactive)")}</span></div></td><td class="px-6 py-4 text-center"><div class="flex items-center justify-center gap-1.5">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/coupons/${coupon.id}`,
						class: "p-2 text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 rounded-xl transition-all shadow-2xs cursor-pointer",
						title: unref(t)("admin.common.edit")
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"${_scopeId}></path></svg>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							})]))];
						}),
						_: 2
					}, _parent));
					_push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.delete"))}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div>`);
			}
			if (unref(coupons) && unref(coupons).length > 0 && unref(totalCoupons) > unref(perPage)) {
				_push(`<div class="p-4 sm:p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="text-xs font-bold text-slate-500"> عرض الصفحة <span class="text-slate-900 font-black">${ssrInterpolate(unref(currentPage))}</span> من أصل <span class="text-slate-900 font-black">${ssrInterpolate(unref(lastPage))}</span> (إجمالي ${ssrInterpolate(unref(totalCoupons))} كوبون) </div><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"> السابق </button><!--[-->`);
				ssrRenderList(visiblePages.value, (p) => {
					_push(`<button class="${ssrRenderClass([p === unref(currentPage) ? "bg-[#0B0E28] text-amber-400 shadow-sm" : "border border-slate-200 text-slate-700 hover:bg-slate-50", "w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center"])}">${ssrInterpolate(p)}</button>`);
				});
				_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(lastPage) || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"> التالي </button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (couponToDelete.value) {
				_push(`<div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"><div class="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center border border-slate-100"><div class="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></div><h3 class="text-base font-black text-slate-900">تأكيد حذف الكوبون</h3><p class="text-xs text-slate-500"> هل أنت متأكد من رغبتك في حذف الكوبون <span class="font-mono font-black text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded">${ssrInterpolate(couponToDelete.value.code)}</span>؟ لن يتمكن العملاء من استخدامه بعد الحذف. </p><div class="flex items-center gap-3 pt-2"><button class="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"> إلغاء </button><button${ssrIncludeBooleanAttr(unref(isDeleting)) ? " disabled" : ""} class="flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-black transition-colors cursor-pointer disabled:opacity-50">`);
				if (unref(isDeleting)) _push(`<span>جاري الحذف...</span>`);
				else _push(`<span>تأكيد الحذف</span>`);
				_push(`</button></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/coupons/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var coupons_default = index_vue_vue_type_script_setup_true_lang_default;

export { coupons_default as default };
//# sourceMappingURL=coupons-COJ2cLby.mjs.map
