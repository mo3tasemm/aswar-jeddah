import { l as useAsyncData, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAboutUs } from './useAboutUs-CRQHzHzE.mjs';
import { defineComponent, watch, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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

//#region pages/about-us.vue?vue&type=script&setup=true&lang.ts
var about_us_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "about-us",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, currentLanguage, localePath } = useLanguage();
		const { aboutData, fetchPublicAboutUs, displayTitle, displaySubtitle, displayStoryTitle, displayStoryContent, displayVisionTitle, displayVisionContent, displayMissionTitle, displayMissionContent, displayStats, displayFeaturesBadge, displayFeaturesTitle, displayFeature1, displayFeature2, displayFeature3, displayFeature4, displayCta } = useAboutUs();
		const { refresh } = useAsyncData("about-us-public", () => fetchPublicAboutUs(true));
		watch(currentLanguage, () => {
			fetchPublicAboutUs(true);
		});
		const renderedFeatures = computed(() => {
			if (Array.isArray(aboutData.value.values) && aboutData.value.values.length > 0) return aboutData.value.values.map((v) => ({
				icon: v.icon || "fa-solid fa-star",
				title: currentLanguage.value === "en" ? v.title_en || v.title || v.title_ar : v.title_ar || v.title || v.title_en,
				desc: currentLanguage.value === "en" ? v.desc_en || v.description_en || v.desc || v.description : v.desc_ar || v.description_ar || v.desc || v.description
			}));
			return [
				displayFeature1.value,
				displayFeature2.value,
				displayFeature3.value,
				displayFeature4.value
			];
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
			}, _attrs))}><section class="relative bg-[#0B0E28] text-white pt-10 pb-16 sm:pt-16 sm:pb-28 overflow-hidden"><div class="absolute inset-0 z-0 pointer-events-none">`);
			if (unref(aboutData).banner_image_full_url) _push(`<img${ssrRenderAttr("src", unref(aboutData).banner_image_full_url)} alt="Aswar Jeddah Banner" class="w-full h-full object-cover object-center opacity-40">`);
			else _push(`<!---->`);
			_push(`<div class="absolute inset-0 bg-gradient-to-b from-[#0B0E28]/40 via-[#0B0E28]/75 to-[#0B0E28]"></div><div class="absolute top-0 end-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 start-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl"></div></div><div class="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4 sm:mb-6">`);
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
			_push(`<span class="text-slate-600">/</span><span class="text-amber-400 font-bold">${ssrInterpolate(unref(t)("nav.about_us") || unref(displayTitle))}</span></nav><div class="max-w-3xl text-start"><h1 class="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-3">${ssrInterpolate(unref(displayTitle))}</h1><p class="text-sm sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">${ssrInterpolate(unref(displaySubtitle))}</p></div></div></section><section class="relative z-20 -mt-8 sm:-mt-12 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-xl shadow-slate-900/5 border border-slate-100 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x sm:rtl:divide-x-reverse divide-slate-100"><!--[-->`);
			ssrRenderList(unref(displayStats), (stat) => {
				_push(`<div class="p-2.5 sm:p-3 flex flex-col sm:flex-row items-start sm:items-center gap-2.5 sm:gap-4 text-start min-w-0"><div class="${ssrRenderClass(["w-11 h-11 sm:w-13 sm:h-13 rounded-xl sm:rounded-2xl border flex items-center justify-center text-lg sm:text-2xl shrink-0", stat.colorClass])}"><i class="${ssrRenderClass(stat.icon)}"></i></div><div class="min-w-0"><span class="text-xl sm:text-2xl lg:text-3xl font-black text-[#0B0E28] block tracking-tight truncate">${ssrInterpolate(stat.value)}</span><span class="text-[11px] sm:text-xs font-bold text-slate-500 mt-0.5 block leading-tight">${ssrInterpolate(stat.label)}</span></div></div>`);
			});
			_push(`<!--]--></div></section><section class="py-12 sm:py-20 bg-white border-b border-slate-200/80"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"><div class="lg:col-span-7 space-y-5 text-start"><div><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black mb-2 border border-amber-200/60"><i class="fa-solid fa-sparkles text-xs text-amber-500"></i><span>${ssrInterpolate(unref(currentLanguage) === "en" ? "Our Background" : "قصتنا وانطلاقتنا")}</span></div><h2 class="text-xl sm:text-3xl font-black text-[#0B0E28] leading-snug">${ssrInterpolate(unref(displayStoryTitle))}</h2></div><div class="text-slate-600 font-normal leading-relaxed text-sm sm:text-base space-y-3 story-prose">${unref(displayStoryContent) ?? ""}</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100"><div class="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"><div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-sm shrink-0 font-bold"><i class="fa-solid fa-check"></i></div><div><h4 class="font-bold text-xs sm:text-sm text-[#0B0E28]">${ssrInterpolate(unref(currentLanguage) === "en" ? "Official Brand Warranty" : "ضمان رسمي معتمد")}</h4><p class="text-[11px] sm:text-xs text-slate-500 mt-0.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "All products are covered by authorized agent warranty" : "كافة الأجهزة مشمولة بضمان الوكلاء المعتمدين")}</p></div></div><div class="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-100"><div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-sm shrink-0 font-bold"><i class="fa-solid fa-headset"></i></div><div><h4 class="font-bold text-xs sm:text-sm text-[#0B0E28]">${ssrInterpolate(unref(currentLanguage) === "en" ? "Technical Support & Care" : "دعم فني واستشارات متخصصة")}</h4><p class="text-[11px] sm:text-xs text-slate-500 mt-0.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "Expert help before and after purchasing" : "فريق متخصص لمساعدتكم قبل وبعد الشراء")}</p></div></div></div></div><div class="lg:col-span-5 relative w-full"><div class="w-full max-w-md mx-auto lg:max-w-none rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-slate-100 aspect-4/3 sm:aspect-square flex items-center justify-center relative group">`);
			if (unref(aboutData).story_image_full_url) _push(`<img${ssrRenderAttr("src", unref(aboutData).story_image_full_url)}${ssrRenderAttr("alt", unref(displayStoryTitle))} class="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500">`);
			else _push(`<div class="text-center p-8 bg-gradient-to-br from-slate-900 to-[#0B0E28] text-white w-full h-full flex flex-col items-center justify-center"><img${ssrRenderAttr("src", Logo_default)} alt="Aswar Jeddah" class="h-14 mx-auto mb-3 object-contain brightness-0 invert"><h4 class="font-black text-base text-amber-400">أسوار جدة</h4><p class="text-xs text-slate-300 mt-1">الأجهزة والحلول التقنية المعتمدة</p></div>`);
			_push(`</div></div></div></div></section><section class="py-12 sm:py-20 bg-slate-50 border-b border-slate-200/80"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="max-w-2xl text-start mb-8 sm:mb-12"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-black mb-2"><i class="fa-solid fa-compass text-xs text-amber-500"></i><span>${ssrInterpolate(unref(currentLanguage) === "en" ? "Principles & Purpose" : "المبادئ والأهداف")}</span></div><h2 class="text-xl sm:text-3xl font-black text-[#0B0E28]">${ssrInterpolate(unref(currentLanguage) === "en" ? "Vision & Mission" : "رؤيتنا ورسالتنا")}</h2><p class="text-xs sm:text-sm text-slate-500 mt-1.5 font-medium">${ssrInterpolate(unref(currentLanguage) === "en" ? "The values that guide our daily commitment to our customers." : "القيم والمبادئ التي تحرك شغفنا لتقديم أفضل تجربة لكل عميل.")}</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 text-start group"><div class="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-500 flex items-center justify-center text-xl shrink-0 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors"><i class="fa-solid fa-eye"></i></div><h3 class="text-lg sm:text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(displayVisionTitle))}</h3><p class="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">${ssrInterpolate(unref(displayVisionContent))}</p></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 space-y-3 text-start group"><div class="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center text-xl shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors"><i class="fa-solid fa-bullseye"></i></div><h3 class="text-lg sm:text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(displayMissionTitle))}</h3><p class="text-slate-600 text-xs sm:text-sm leading-relaxed font-normal">${ssrInterpolate(unref(displayMissionContent))}</p></div></div></div></section><section class="py-12 sm:py-20 bg-white"><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"><div class="max-w-2xl text-start mb-8 sm:mb-12"><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-black mb-2 border border-amber-200/60"><i class="fa-solid fa-star text-xs text-amber-500"></i><span>${ssrInterpolate(unref(displayFeaturesBadge))}</span></div><h2 class="text-xl sm:text-3xl font-black text-[#0B0E28]">${ssrInterpolate(unref(displayFeaturesTitle))}</h2></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"><!--[-->`);
			ssrRenderList(renderedFeatures.value, (feat, idx) => {
				_push(`<div class="p-5 sm:p-6 rounded-3xl bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-amber-200 hover:shadow-lg transition-all duration-300 space-y-3 text-start group min-w-0"><div class="w-11 h-11 rounded-2xl bg-white border border-slate-200 text-amber-500 flex items-center justify-center text-lg shadow-2xs group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-colors shrink-0"><i class="${ssrRenderClass(feat.icon || "fa-solid fa-star")}"></i></div><h3 class="font-bold text-sm sm:text-base text-[#0B0E28] break-words">${ssrInterpolate(feat.title)}</h3><p class="text-xs text-slate-500 leading-relaxed break-words">${ssrInterpolate(feat.desc)}</p></div>`);
			});
			_push(`<!--]--></div><div class="mt-12 sm:mt-16 p-6 sm:p-10 rounded-3xl bg-[#0B0E28] text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-start shadow-xl"><div class="space-y-1"><h3 class="text-lg sm:text-2xl font-black text-white">${ssrInterpolate(unref(displayCta).title)}</h3><p class="text-xs sm:text-sm text-slate-300 font-medium">${ssrInterpolate(unref(displayCta).desc)}</p></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)(unref(displayCta).url || "/shop"),
				class: "px-7 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 inline-flex items-center gap-2 cursor-pointer shrink-0 hover:scale-105"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>${ssrInterpolate(unref(displayCta).btn)}</span><i class="fa-solid fa-arrow-left rtl:rotate-0 rotate-180 text-xs"${_scopeId}></i>`);
					else return [createVNode("span", null, toDisplayString(unref(displayCta).btn), 1), createVNode("i", { class: "fa-solid fa-arrow-left rtl:rotate-0 rotate-180 text-xs" })];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></section></div>`);
		};
	}
});
//#endregion
//#region pages/about-us.vue
var _sfc_setup = about_us_vue_vue_type_script_setup_true_lang_default.setup;
about_us_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/about-us.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var about_us_default = about_us_vue_vue_type_script_setup_true_lang_default;

export { about_us_default as default };
//# sourceMappingURL=about-us-BqEtYycX.mjs.map
