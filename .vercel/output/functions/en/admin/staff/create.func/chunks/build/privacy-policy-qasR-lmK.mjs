import { _ as _plugin_vue_export_helper_default, l as useAsyncData, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as usePrivacyPolicy } from './usePrivacyPolicy-GSsCFP9x.mjs';
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

//#region pages/privacy-policy.vue?vue&type=script&setup=true&lang.ts
var privacy_policy_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "privacy-policy",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, currentLanguage, localePath } = useLanguage();
		const { fetchPublicPrivacyPolicy, displayTitle, displaySubtitle, displayContent, displayBadges, displaySummaryTitle, displaySummaryPoints, displayInquiryBox, displayMetaTitle, displayMetaDescription } = usePrivacyPolicy();
		const { refresh } = useAsyncData("privacy-policy-public", () => fetchPublicPrivacyPolicy(true));
		watch(currentLanguage, () => {
			fetchPublicPrivacyPolicy(true);
		});
		useHead$1({
			title: computed(() => displayMetaTitle.value),
			meta: [{
				name: "description",
				content: computed(() => displayMetaDescription.value)
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-slate-50 text-slate-900",
				dir: unref(layoutDirection)
			}, _attrs))} data-v-0b5e3847><section class="relative bg-[#0B0E28] text-white pt-10 pb-16 sm:pt-16 sm:pb-24 overflow-hidden" data-v-0b5e3847><div class="absolute inset-0 z-0 pointer-events-none" data-v-0b5e3847><div class="absolute top-0 end-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" data-v-0b5e3847></div><div class="absolute bottom-0 start-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl" data-v-0b5e3847></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" data-v-0b5e3847><nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4 sm:mb-6" data-v-0b5e3847>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "hover:text-amber-400 transition-colors flex items-center gap-1.5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0b5e3847${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" data-v-0b5e3847${_scopeId}></path></svg><span data-v-0b5e3847${_scopeId}>${ssrInterpolate(unref(t)("nav.home") || (unref(currentLanguage) === "en" ? "Home" : "الرئيسية"))}</span>`);
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
			_push(`<span class="text-slate-600" data-v-0b5e3847>/</span><span class="text-amber-400 font-bold" data-v-0b5e3847>${ssrInterpolate(unref(displayTitle))}</span></nav><div class="max-w-3xl text-start" data-v-0b5e3847><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-400 text-xs font-black mb-3 backdrop-blur-xs" data-v-0b5e3847><i class="fa-solid fa-lock text-xs" data-v-0b5e3847></i><span data-v-0b5e3847>${ssrInterpolate(unref(currentLanguage) === "en" ? "Data Protection & Security" : "حماية البيانات والأمان")}</span></div><h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3" data-v-0b5e3847>${ssrInterpolate(unref(displayTitle))}</h1><p class="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl" data-v-0b5e3847>${ssrInterpolate(unref(displaySubtitle))}</p></div></div></section><section class="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" data-v-0b5e3847><div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-slate-100" data-v-0b5e3847><!--[-->`);
			ssrRenderList(unref(displayBadges), (badge, idx) => {
				_push(`<div class="p-2.5 sm:p-3 flex items-start gap-3.5 text-start min-w-0" data-v-0b5e3847><div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shrink-0 shadow-2xs" data-v-0b5e3847><i class="${ssrRenderClass(badge.icon || "fa-solid fa-shield-halved")}" data-v-0b5e3847></i></div><div class="min-w-0 space-y-0.5" data-v-0b5e3847><h3 class="text-sm sm:text-base font-black text-[#0B0E28] block tracking-tight truncate" data-v-0b5e3847>${ssrInterpolate(badge.title)}</h3><p class="text-[11px] sm:text-xs text-slate-500 font-medium leading-tight line-clamp-2" data-v-0b5e3847>${ssrInterpolate(badge.desc)}</p></div></div>`);
			});
			_push(`<!--]--></div></section><section class="py-12 sm:py-20" data-v-0b5e3847><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" data-v-0b5e3847><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start" data-v-0b5e3847><div class="lg:col-span-8 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs space-y-6 text-start" data-v-0b5e3847><div class="flex items-center justify-between border-b border-slate-100 pb-4" data-v-0b5e3847><div class="flex items-center gap-3" data-v-0b5e3847><div class="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center text-base font-bold" data-v-0b5e3847><i class="fa-solid fa-file-shield" data-v-0b5e3847></i></div><div data-v-0b5e3847><h2 class="text-lg sm:text-xl font-black text-[#0B0E28]" data-v-0b5e3847>${ssrInterpolate(unref(currentLanguage) === "en" ? "Privacy Terms & User Rights" : "بنود الخصوصية وحقوق المستخدم")}</h2><span class="text-xs text-slate-400" data-v-0b5e3847>${ssrInterpolate(unref(currentLanguage) === "en" ? "Last revised and active across all store platforms" : "سياسة سارية ومحدثة لكافة منصات متجر أسوار جدة")}</span></div></div><span class="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60" data-v-0b5e3847><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-0b5e3847></span><span data-v-0b5e3847>${ssrInterpolate(unref(currentLanguage) === "en" ? "Official Policy" : "سياسة معتمدة ومحمية")}</span></span></div><div class="text-slate-600 font-normal leading-relaxed text-sm sm:text-base space-y-4 policy-prose" data-v-0b5e3847>${unref(displayContent) ?? ""}</div></div><div class="lg:col-span-4 space-y-6" data-v-0b5e3847><div class="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200/80 shadow-xs space-y-4 text-start" data-v-0b5e3847><h3 class="text-base font-black text-[#0B0E28] flex items-center gap-2 border-b border-slate-100 pb-3" data-v-0b5e3847><i class="fa-solid fa-circle-info text-amber-500" data-v-0b5e3847></i><span data-v-0b5e3847>${ssrInterpolate(unref(displaySummaryTitle))}</span></h3><ul class="space-y-3 text-xs text-slate-600 leading-relaxed" data-v-0b5e3847><!--[-->`);
			ssrRenderList(unref(displaySummaryPoints), (point, idx) => {
				_push(`<li class="flex items-start gap-2.5" data-v-0b5e3847><i class="fa-solid fa-check text-emerald-500 mt-1 shrink-0" data-v-0b5e3847></i><span data-v-0b5e3847>${ssrInterpolate(point)}</span></li>`);
			});
			_push(`<!--]--></ul></div><div class="bg-gradient-to-br from-[#0B0E28] to-slate-900 p-6 sm:p-7 rounded-3xl text-white space-y-4 text-start shadow-xl" data-v-0b5e3847><div class="w-11 h-11 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center text-xl" data-v-0b5e3847><i class="fa-solid fa-envelope-shield" data-v-0b5e3847></i></div><div data-v-0b5e3847><h3 class="text-base font-black text-white" data-v-0b5e3847>${ssrInterpolate(unref(displayInquiryBox).title)}</h3><p class="text-xs text-slate-300 mt-1 leading-relaxed" data-v-0b5e3847>${ssrInterpolate(unref(displayInquiryBox).desc)}</p></div><div class="pt-2 flex flex-col gap-2.5" data-v-0b5e3847>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)(unref(displayInquiryBox).contactUrl || "/contact-us"),
				class: "w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i class="fa-solid fa-envelope text-xs" data-v-0b5e3847${_scopeId}></i><span data-v-0b5e3847${_scopeId}>${ssrInterpolate(unref(displayInquiryBox).contactBtn)}</span>`);
					else return [createVNode("i", { class: "fa-solid fa-envelope text-xs" }), createVNode("span", null, toDisplayString(unref(displayInquiryBox).contactBtn), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<a${ssrRenderAttr("href", unref(displayInquiryBox).whatsappUrl)} target="_blank" class="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all border border-white/10" data-v-0b5e3847><i class="fa-brands fa-whatsapp text-sm text-emerald-400" data-v-0b5e3847></i><span data-v-0b5e3847>${ssrInterpolate(unref(displayInquiryBox).whatsappBtn)}</span></a></div></div></div></div></div></section></div>`);
		};
	}
});
//#endregion
//#region pages/privacy-policy.vue
var _sfc_setup = privacy_policy_vue_vue_type_script_setup_true_lang_default.setup;
privacy_policy_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/privacy-policy.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var privacy_policy_default = /*#__PURE__*/ _plugin_vue_export_helper_default(privacy_policy_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0b5e3847"]]);

export { privacy_policy_default as default };
//# sourceMappingURL=privacy-policy-qasR-lmK.mjs.map
