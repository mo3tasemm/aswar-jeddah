import { l as useAsyncData, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useReturnPolicy } from './useReturnPolicy-CqsOPjo7.mjs';
import { defineComponent, watch, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
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

//#region pages/return-policy.vue?vue&type=script&setup=true&lang.ts
var return_policy_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "return-policy",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, currentLanguage, localePath } = useLanguage();
		const { fetchPublicReturnPolicy, displayTitle, displaySubtitle, displayContent, displayHighlights, displayStepsTitle, displaySteps, displayHelpBox } = useReturnPolicy();
		const { refresh } = useAsyncData("return-policy-public", () => fetchPublicReturnPolicy(true));
		watch(currentLanguage, () => {
			fetchPublicReturnPolicy(true);
		});
		useHead$1({
			title: computed(() => `${displayTitle.value} | أسوار جدة`),
			meta: [{
				name: "description",
				content: computed(() => displaySubtitle.value)
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-slate-50 text-slate-900",
				dir: unref(layoutDirection)
			}, _attrs))}><section class="relative bg-[#0B0E28] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden"><div class="absolute inset-0 z-0 pointer-events-none"><div class="absolute top-0 end-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 start-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4 sm:mb-6">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "hover:text-amber-400 transition-colors flex items-center gap-1.5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("nav.home") || (unref(currentLanguage) === "en" ? "Home" : "الرئيسية"))}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4 text-slate-400",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					})])), createVNode("span", null, toDisplayString(unref(t)("nav.home") || (unref(currentLanguage) === "en" ? "Home" : "الرئيسية")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-slate-600">/</span><span class="text-amber-400 font-bold">${ssrInterpolate(unref(displayTitle))}</span></nav><div class="max-w-3xl text-start"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-black mb-3 backdrop-blur-xs"><i class="fa-solid fa-shield-check text-xs"></i><span>${ssrInterpolate(unref(currentLanguage) === "en" ? "Customer Protection & Rights" : "حقوق المستهلك والضمان")}</span></div><h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">${ssrInterpolate(unref(displayTitle))}</h1><p class="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">${ssrInterpolate(unref(displaySubtitle))}</p></div></div></section><section class="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-slate-100"><!--[-->`);
			ssrRenderList(unref(displayHighlights), (item, idx) => {
				_push(`<div class="p-2.5 sm:p-3 flex items-start gap-3.5 text-start min-w-0"><div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shrink-0 shadow-2xs"><i class="${ssrRenderClass(item.icon || "fa-solid fa-check")}"></i></div><div class="min-w-0 space-y-0.5"><h3 class="text-sm sm:text-base font-black text-[#0B0E28] block tracking-tight truncate">${ssrInterpolate(item.title)}</h3><p class="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2">${ssrInterpolate(item.desc)}</p></div></div>`);
			});
			_push(`<!--]--></div></section><section class="py-12 sm:py-20"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"><div class="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-start"><div class="flex items-center justify-between border-b border-slate-100 pb-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-base font-bold"><i class="fa-solid fa-scale-balanced"></i></div><div><h2 class="text-lg sm:text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(currentLanguage) === "en" ? "Policy Guidelines & Conditions" : "الشروط والأحكام التفصيلية")}</h2><span class="text-xs text-slate-400">${ssrInterpolate(unref(currentLanguage) === "en" ? "Compliant with Ministry of Commerce Regulations" : "متوافقة مع اشتراطات وزارة التجارة السعودية")}</span></div></div><span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span><span>${ssrInterpolate(unref(currentLanguage) === "en" ? "Active Policy" : "سياسة سارية ومعتمدة")}</span></span></div><div class="text-slate-600 font-normal leading-relaxed text-sm sm:text-base space-y-4 policy-prose">${unref(displayContent) ?? ""}</div></div><div class="lg:col-span-4 space-y-6"><div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-5 text-start"><h3 class="text-base font-black text-[#0B0E28] flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-list-check text-amber-500"></i><span>${ssrInterpolate(unref(displayStepsTitle))}</span></h3><ol class="space-y-4 relative before:absolute before:top-3 before:bottom-3 before:start-4 before:w-0.5 before:bg-slate-100"><!--[-->`);
			ssrRenderList(unref(displaySteps), (step) => {
				_push(`<li class="relative flex items-start gap-3.5 z-10"><span class="${ssrRenderClass(["w-8 h-8 rounded-xl text-xs font-black flex items-center justify-center shrink-0 shadow-xs", step.number === 4 ? "bg-amber-400 text-[#0B0E28]" : "bg-[#0B0E28] text-amber-400"])}">${ssrInterpolate(step.number)}</span><div class="space-y-0.5 pt-0.5 min-w-0"><h4 class="font-bold text-xs sm:text-sm text-[#0B0E28]">${ssrInterpolate(step.title)}</h4><p class="text-[11px] sm:text-xs text-slate-500 leading-tight">${ssrInterpolate(step.desc)}</p></div></li>`);
			});
			_push(`<!--]--></ol></div><div class="bg-gradient-to-br from-[#0B0E28] to-slate-900 p-6 sm:p-7 rounded-3xl text-white space-y-4 text-start shadow-xl"><div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl"><i class="fa-solid fa-headset"></i></div><div><h3 class="text-base font-black text-white">${ssrInterpolate(unref(displayHelpBox).title)}</h3><p class="text-xs text-slate-300 mt-1 leading-relaxed">${ssrInterpolate(unref(displayHelpBox).desc)}</p></div><div class="pt-2 flex flex-col gap-2.5"><a${ssrRenderAttr("href", unref(displayHelpBox).whatsapp)} target="_blank" class="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"><i class="fa-brands fa-whatsapp text-sm"></i><span>${ssrInterpolate(unref(displayHelpBox).whatsappBtn)}</span></a>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)(unref(displayHelpBox).contactUrl || "/contact-us"),
				class: "w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i class="fa-solid fa-envelope text-xs"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(displayHelpBox).contactBtn)}</span>`);
					else return [createVNode("i", { class: "fa-solid fa-envelope text-xs" }), createVNode("span", null, toDisplayString(unref(displayHelpBox).contactBtn), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div></div></div></section></div>`);
		};
	}
});
//#endregion
//#region pages/return-policy.vue
var _sfc_setup = return_policy_vue_vue_type_script_setup_true_lang_default.setup;
return_policy_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/return-policy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var return_policy_default = return_policy_vue_vue_type_script_setup_true_lang_default;

export { return_policy_default as default };
//# sourceMappingURL=return-policy-CKl3XPO3.mjs.map
