import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';

//#region components/home/StoreFeaturesBar.vue?vue&type=script&setup=true&lang.ts
var StoreFeaturesBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StoreFeaturesBar",
	__ssrInlineRender: true,
	props: { config: {} },
	setup(__props) {
		const { currentLanguage } = useLanguage();
		const defaultFeaturesAr = [
			{
				title: "شحن سريع وآمن",
				desc: "توصيل لكافة المحافظات"
			},
			{
				title: "خدمة عملاء محترفة",
				desc: "دعم متواصل 24/7"
			},
			{
				title: "ضمان سنة كاملة",
				desc: "ضمان شامل معتمد"
			},
			{
				title: "تقسيط حتى 60 شهر",
				desc: "بأسهل الإجراءات وبدون فوائد"
			}
		];
		const defaultFeaturesEn = [
			{
				title: "Fast & Secure Shipping",
				desc: "Delivery to all regions"
			},
			{
				title: "24/7 Customer Support",
				desc: "Always here to assist you"
			},
			{
				title: "Full 1-Year Warranty",
				desc: "Official certified warranty"
			},
			{
				title: "Easy Installments",
				desc: "Flexible plans with 0% interest"
			}
		];
		const props = __props;
		const resolvedFeatures = computed(() => {
			const isEn = currentLanguage.value === "en";
			if (props.config?.features && props.config.features.length > 0) return props.config.features.map((f) => ({
				title: isEn ? f.title_en || f.title : f.title || f.title_en,
				desc: isEn ? f.desc_en || f.desc || f.subtitle : f.desc || f.subtitle || f.desc_en
			}));
			return isEn ? defaultFeaturesEn : defaultFeaturesAr;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-4 lg:px-6 my-10" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"><!--[-->`);
			ssrRenderList(resolvedFeatures.value, (feature, idx) => {
				_push(`<div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-1 group"><div class="w-14 h-14 rounded-full bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-amber-500 group-hover:text-white transition-colors shrink-0">`);
				if (idx === 0) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path></svg>`);
				else if (idx === 1) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.223-3.923-6.819-6.819l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"></path></svg>`);
				else if (idx === 2) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path></svg>`);
				else _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"></path></svg>`);
				_push(`</div><div><h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">${ssrInterpolate(feature.title)}</h3><p class="text-slate-500 text-xs md:text-sm">${ssrInterpolate(feature.desc || feature.subtitle)}</p></div></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region components/home/StoreFeaturesBar.vue
var _sfc_setup = StoreFeaturesBar_vue_vue_type_script_setup_true_lang_default.setup;
StoreFeaturesBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/StoreFeaturesBar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var StoreFeaturesBar_default = Object.assign(StoreFeaturesBar_vue_vue_type_script_setup_true_lang_default, { __name: "HomeStoreFeaturesBar" });

export { StoreFeaturesBar_default as S };
//# sourceMappingURL=StoreFeaturesBar-BP26V_jW.mjs.map
