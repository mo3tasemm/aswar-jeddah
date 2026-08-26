import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import './useAuth-IbNI92RZ.mjs';

//#region pages/my-account/coupons/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.coupons")} | أسوار جدة`) });
		const pending = ref(true);
		const couponsList = ref([]);
		const applyingCode = ref(null);
		useCart();
		const formatDate = (dateStr) => {
			if (!dateStr || dateStr === "متاح حالياً" || dateStr === "Available") return layoutDirection.value === "ltr" ? "Available" : "متاح حالياً";
			try {
				const date = new Date(dateStr);
				if (isNaN(date.getTime())) return dateStr;
				return date.toLocaleDateString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US", {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
			} catch (e) {
				return dateStr;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-[#f8fafc] pb-24 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="bg-[#0B0E28] pt-32 pb-20 relative overflow-hidden"><div class="absolute inset-0 z-0 opacity-20 bg-[url(&#39;https://www.transparenttextures.com/patterns/cubes.png&#39;)]"></div><div class="absolute top-0 start-0 w-full h-full bg-gradient-to-b from-transparent to-[#0B0E28] z-0"></div><div class="container mx-auto px-4 relative z-10"><h1 class="text-3xl md:text-5xl font-black text-white mb-4 text-center">${ssrInterpolate(unref(t)("account.coupons"))}</h1><p class="text-slate-300 text-center text-sm md:text-base max-w-2xl mx-auto">${ssrInterpolate(unref(t)("coupons.subtitle"))}</p></div></div><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20"><div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0 space-y-8"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 flex flex-col sm:flex-row items-center justify-between gap-4"><div><h2 class="text-xl font-black text-[#0B0E28] mb-1">${ssrInterpolate(unref(t)("coupons.available"))}</h2><p class="text-xs sm:text-sm text-slate-500">${ssrInterpolate(unref(t)("coupons.hint"))}</p></div><div class="flex items-center gap-2 bg-amber-50 text-amber-700 font-extrabold text-xs px-4 py-2.5 rounded-2xl border border-amber-200/60 shrink-0"><svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg><span>${ssrInterpolate(couponsList.value.length)} ${ssrInterpolate(unref(t)("coupons.active_count"))}</span></div></div>`);
			if (pending.value) _push(`<div class="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-slate-100/60"><div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("coupons.loading"))}</p></div>`);
			else if (couponsList.value.length === 0) {
				_push(`<div class="bg-white rounded-[2rem] p-12 sm:p-16 text-center shadow-sm border border-slate-100/60 space-y-6"><div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner"><svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div><div class="space-y-2 max-w-sm mx-auto"><h3 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("coupons.empty_title"))}</h3><p class="text-xs sm:text-sm text-slate-500 leading-relaxed">${ssrInterpolate(unref(t)("coupons.empty_desc"))}</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/shop",
					class: "inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B0E28] text-amber-400 font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-[#0B0E28]/10 transition-all hover:bg-[#151a42]"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("cart.back_to_shop"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("cart.back_to_shop")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
				ssrRenderList(couponsList.value, (coupon) => {
					_push(`<div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100/80 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between group"><div class="absolute -start-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-100/80"></div><div class="absolute -end-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#f8fafc] border border-slate-100/80"></div><div><div class="flex items-center justify-between gap-2 mb-4"><span class="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200/60 font-black text-xs">${ssrInterpolate(coupon.badge)}</span><span class="text-[11px] font-bold text-slate-400">${ssrInterpolate(unref(t)("coupons.expires"))} ${ssrInterpolate(formatDate(coupon.expireDate))}</span></div><h3 class="text-lg font-black text-[#0B0E28] mb-2 group-hover:text-amber-500 transition-colors">${ssrInterpolate(coupon.title)}</h3><p class="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">${ssrInterpolate(coupon.description)}</p></div><div class="pt-6 border-t border-slate-100/80 flex flex-col sm:flex-row items-center justify-between gap-4"><div class="w-full sm:w-auto px-4 py-2.5 bg-slate-50 rounded-2xl border border-dashed border-slate-300 flex items-center justify-between gap-3"><span class="font-mono text-sm font-black text-[#0B0E28] tracking-widest dir-ltr">${ssrInterpolate(coupon.code)}</span><button class="text-xs font-bold text-amber-600 hover:text-amber-700 transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("coupons.copy"))}>${ssrInterpolate(unref(t)("coupons.copy"))}</button></div><button${ssrIncludeBooleanAttr(applyingCode.value === coupon.code) ? " disabled" : ""} class="w-full sm:w-auto px-6 py-3 bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
					if (applyingCode.value === coupon.code) _push(`<svg class="animate-spin h-4 w-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(applyingCode.value === coupon.code ? unref(t)("coupons.applying") : unref(t)("coupons.apply"))}</span></button></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</main></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/my-account/coupons/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/coupons/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var coupons_default = index_vue_vue_type_script_setup_true_lang_default;

export { coupons_default as default };
//# sourceMappingURL=coupons-CDzIYYVi.mjs.map
