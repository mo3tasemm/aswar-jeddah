import { o as appDiagnostics, _ as _plugin_vue_export_helper_default, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useApi } from './adminHomeSectionsApiService-C3vooghX.mjs';
import { p as productApiService } from './productApiService-DKwZsTgl.mjs';
import { u as useCategories } from './useCategories-mcAJj4mX.mjs';
import { P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { g as getProductsByBrand, a as getProductsByCategory, b as getNewArrivalProducts } from './productService-DOFzoJXT.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { defineComponent, mergeProps, unref, createVNode, resolveDynamicComponent, ref, computed, withCtx, openBlock, createBlock, toDisplayString, watch, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderVNode, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
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
import './useCart-CqauBZhc.mjs';
import './apiConfig-CCR2eNes.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';

//#region node_modules/nuxt/dist/app/compat/interval.js
var setInterval = (() => {
	appDiagnostics.NUXT_E1004();
});

//#region components/ui/HomeHeroSkeleton.vue
var _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-4 lg:px-6 my-4" }, _attrs))} data-v-f64c17d9><div class="w-full h-[320px] sm:h-[420px] md:h-[500px] bg-slate-100 rounded-3xl animate-pulse relative overflow-hidden flex items-center justify-center border border-slate-200/60" data-v-f64c17d9><div class="text-center space-y-3 p-6" data-v-f64c17d9><div class="w-16 h-16 rounded-2xl bg-slate-200 mx-auto flex items-center justify-center" data-v-f64c17d9><i class="fa-regular fa-image text-slate-300 text-2xl" data-v-f64c17d9></i></div><div class="h-6 bg-slate-200 rounded-xl w-48 sm:w-72 mx-auto" data-v-f64c17d9></div><div class="h-4 bg-slate-200/70 rounded-lg w-32 sm:w-48 mx-auto" data-v-f64c17d9></div></div><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" data-v-f64c17d9></div></div></div>`);
}
var _sfc_setup$13 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/HomeHeroSkeleton.vue");
	return _sfc_setup$13 ? _sfc_setup$13(props, ctx) : void 0;
};
var HomeHeroSkeleton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-f64c17d9"]]), { __name: "UiHomeHeroSkeleton" });
//#endregion
//#region components/ui/ProductCardSkeleton.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl border border-slate-100 p-4 shadow-sm space-y-3 animate-pulse" }, _attrs))} data-v-e390ce1f><div class="w-full aspect-square bg-slate-100 rounded-xl flex items-center justify-center relative overflow-hidden" data-v-e390ce1f><div class="w-12 h-12 rounded-full bg-slate-200/70 flex items-center justify-center" data-v-e390ce1f><i class="fa-regular fa-image text-slate-300 text-xl" data-v-e390ce1f></i></div><div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" data-v-e390ce1f></div></div><div class="h-3 bg-slate-100 rounded-md w-1/3" data-v-e390ce1f></div><div class="space-y-1.5 pt-1" data-v-e390ce1f><div class="h-4 bg-slate-200/80 rounded-md w-full" data-v-e390ce1f></div><div class="h-4 bg-slate-200/60 rounded-md w-3/4" data-v-e390ce1f></div></div><div class="flex items-center justify-between pt-3 border-t border-slate-100" data-v-e390ce1f><div class="space-y-1" data-v-e390ce1f><div class="h-5 bg-amber-100 rounded-md w-20" data-v-e390ce1f></div><div class="h-3 bg-slate-100 rounded-md w-12" data-v-e390ce1f></div></div><div class="w-9 h-9 rounded-xl bg-slate-100 shrink-0" data-v-e390ce1f></div></div></div>`);
}
var _sfc_setup$12 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ProductCardSkeleton.vue");
	return _sfc_setup$12 ? _sfc_setup$12(props, ctx) : void 0;
};
var ProductCardSkeleton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e390ce1f"]]), { __name: "UiProductCardSkeleton" });
//#endregion
//#region components/ui/ProductGridSkeleton.vue?vue&type=script&setup=true&lang.ts
var ProductGridSkeleton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductGridSkeleton",
	__ssrInlineRender: true,
	props: { count: { default: 8 } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.count, (i) => {
				_push(ssrRenderComponent(ProductCardSkeleton_default, { key: i }, null, _parent));
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region components/ui/ProductGridSkeleton.vue
var _sfc_setup$11 = ProductGridSkeleton_vue_vue_type_script_setup_true_lang_default.setup;
ProductGridSkeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ProductGridSkeleton.vue");
	return _sfc_setup$11 ? _sfc_setup$11(props, ctx) : void 0;
};
var ProductGridSkeleton_default = Object.assign(ProductGridSkeleton_vue_vue_type_script_setup_true_lang_default, { __name: "UiProductGridSkeleton" });
//#endregion
//#region composables/useHero.ts
var useHero = (initialSlides = []) => {
	const slides = ref(initialSlides);
	const currentIndex = ref(0);
	let autoplayTimer = null;
	const nextSlide = () => {
		currentIndex.value = (currentIndex.value + 1) % slides.value.length;
	};
	const prevSlide = () => {
		currentIndex.value = (currentIndex.value - 1 + slides.value.length) % slides.value.length;
	};
	const goToSlide = (index) => {
		if (index >= 0 && index < slides.value.length) currentIndex.value = index;
	};
	const startAutoplay = () => {
		if (!autoplayTimer) autoplayTimer = setInterval();
	};
	const stopAutoplay = () => {
		if (autoplayTimer) {
			clearInterval(autoplayTimer);
			autoplayTimer = null;
		}
	};
	return {
		slides,
		currentIndex,
		nextSlide,
		prevSlide,
		goToSlide,
		startAutoplay,
		stopAutoplay
	};
};
//#endregion
//#region components/home/HeroBanner.vue?vue&type=script&setup=true&lang.ts
var HeroBanner_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "HeroBanner",
	__ssrInlineRender: true,
	props: {
		slides: {},
		config: {}
	},
	setup(__props) {
		const defaultSlides = [
			{
				id: 1,
				imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
				linkUrl: "/category/ac",
				altText: "أقوى التخفيضات على المكيفات"
			},
			{
				id: 2,
				imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
				linkUrl: "/category/kitchen-appliances",
				altText: "جدد مطبخك بأحدث الأجهزة"
			},
			{
				id: 3,
				imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
				linkUrl: "/category/screens",
				altText: "شاشات ذكية بدقة 4K"
			}
		];
		const props = __props;
		const { slides, currentIndex} = useHero(computed(() => {
			if (props.config?.slides && props.config.slides.length > 0) return props.config.slides;
			if (props.config?.items && props.config.items.length > 0) return props.config.items;
			if (props.slides && props.slides.length > 0) return props.slides;
			return defaultSlides;
		}).value);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-8" }, _attrs))}><section class="relative w-full overflow-hidden group aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.6/1] rounded-3xl shadow-xl border border-slate-100"><div class="relative w-full h-full bg-luxury-black"><div${ssrRenderAttrs({
				class: "w-full h-full",
				"enter-active-class": "transition-opacity duration-700 ease-in-out",
				"enter-from-class": "opacity-0",
				"enter-to-class": "opacity-100",
				"leave-active-class": "transition-opacity duration-700 ease-in-out absolute inset-0",
				"leave-from-class": "opacity-100",
				"leave-to-class": "opacity-0"
			})}>`);
			ssrRenderList(unref(slides), (slide, index) => {
				_push(`<div class="absolute inset-0 w-full h-full" style="${ssrRenderStyle(unref(currentIndex) === index ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: slide.linkUrl,
					class: "block w-full h-full"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<picture class="w-full h-full block"${_scopeId}>`);
							if (slide.mobileImageUrl) _push(`<source${ssrRenderAttr("srcset", slide.mobileImageUrl)} media="(max-width: 767px)"${_scopeId}>`);
							else _push(`<!---->`);
							_push(`<img${ssrRenderAttr("src", slide.imageUrl)}${ssrRenderAttr("alt", slide.altText)} class="w-full h-full object-cover"${_scopeId}></picture>`);
						} else return [createVNode("picture", { class: "w-full h-full block" }, [slide.mobileImageUrl ? (openBlock(), createBlock("source", {
							key: 0,
							srcset: slide.mobileImageUrl,
							media: "(max-width: 767px)"
						}, null, 8, ["srcset"])) : createCommentVNode("", true), createVNode("img", {
							src: slide.imageUrl,
							alt: slide.altText,
							class: "w-full h-full object-cover"
						}, null, 8, ["src", "alt"])])];
					}),
					_: 2
				}, _parent));
				_push(`</div>`);
			});
			_push(`</div></div><button class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-luxury-black shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100" aria-label="Next slide"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path></svg></button><button class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-luxury-black shadow-lg hover:bg-white transition-all duration-300 opacity-0 group-hover:opacity-100" aria-label="Previous slide"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path></svg></button><div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2"><!--[-->`);
			ssrRenderList(unref(slides), (_, index) => {
				_push(`<button class="${ssrRenderClass(["w-2.5 h-2.5 rounded-full transition-all duration-300 shadow-sm", unref(currentIndex) === index ? "bg-luxury-gold scale-125 w-6" : "bg-white/60 hover:bg-white"])}"${ssrRenderAttr("aria-label", `Go to slide ${index + 1}`)}></button>`);
			});
			_push(`<!--]--></div></section></div>`);
		};
	}
});
//#endregion
//#region components/home/HeroBanner.vue
var _sfc_setup$10 = HeroBanner_vue_vue_type_script_setup_true_lang_default.setup;
HeroBanner_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/HeroBanner.vue");
	return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
var HeroBanner_default = Object.assign(HeroBanner_vue_vue_type_script_setup_true_lang_default, { __name: "HomeHeroBanner" });
//#endregion
//#region components/home/CategorySlider.vue?vue&type=script&setup=true&lang.ts
var CategorySlider_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategorySlider",
	__ssrInlineRender: true,
	props: {
		title: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const { categories: fetchedCategories } = useCategories();
		const { layoutDirection } = useLanguage();
		ref(null);
		const displayTitle = computed(() => {
			if (props.config?.title) return props.config.title;
			if (props.title) return props.title;
			return layoutDirection.value === "ltr" ? "Shop by Category" : "تسوق حسب القسم";
		});
		const displayCategories = computed(() => {
			const list = props.config?.categories && props.config.categories.length > 0 ? props.config.categories : fetchedCategories.value;
			const limit = props.config?.limit;
			if (limit && Number(limit) > 0) return list.slice(0, Number(limit));
			return list;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<section${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-12 relative group" }, _attrs))} data-v-eec820e0><div class="flex items-center justify-between mb-8 px-2" data-v-eec820e0><h2 class="text-2xl font-bold text-luxury-black" data-v-eec820e0>${ssrInterpolate(displayTitle.value)}</h2></div><button class="hidden md:flex absolute right-0 top-[55%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-luxury-black shadow-lg hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 border border-slate-200"${ssrRenderAttr("aria-label", unref(layoutDirection) === "ltr" ? "Scroll right" : "التمرير يميناً")} data-v-eec820e0><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6" data-v-eec820e0><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-eec820e0></path></svg></button><div class="flex gap-3 sm:gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 px-2" data-v-eec820e0><!--[-->`);
			ssrRenderList(displayCategories.value, (category) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: category.id,
					to: `/category/${category.slug || category.id}`,
					class: "flex-none w-[calc(50%-6px)] sm:w-[160px] md:w-[200px] h-[180px] sm:h-[220px] rounded-2xl overflow-hidden relative group/card snap-start shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col bg-white"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="flex-grow p-4 flex items-center justify-center bg-white overflow-hidden relative" data-v-eec820e0${_scopeId}><img${ssrRenderAttr("src", category.icon || category.imageUrl || "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80")}${ssrRenderAttr("alt", category.name)} loading="lazy" decoding="async" class="w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-500 ease-out" data-v-eec820e0${_scopeId}></div><div class="bg-[#0a192f] py-3 text-center transition-colors duration-300 group-hover/card:bg-luxury-gold flex-shrink-0" data-v-eec820e0${_scopeId}><span class="text-white font-bold text-sm sm:text-base tracking-wide" data-v-eec820e0${_scopeId}>${ssrInterpolate(category.name)}</span></div>`);
						else return [createVNode("div", { class: "flex-grow p-4 flex items-center justify-center bg-white overflow-hidden relative" }, [createVNode("img", {
							src: category.icon || category.imageUrl || "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80",
							alt: category.name,
							loading: "lazy",
							decoding: "async",
							class: "w-full h-full object-contain group-hover/card:scale-110 transition-transform duration-500 ease-out"
						}, null, 8, ["src", "alt"])]), createVNode("div", { class: "bg-[#0a192f] py-3 text-center transition-colors duration-300 group-hover/card:bg-luxury-gold flex-shrink-0" }, [createVNode("span", { class: "text-white font-bold text-sm sm:text-base tracking-wide" }, toDisplayString(category.name), 1)])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div><button class="hidden md:flex absolute left-0 top-[55%] -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-luxury-black shadow-lg hover:bg-luxury-gold hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 border border-slate-200"${ssrRenderAttr("aria-label", unref(layoutDirection) === "ltr" ? "Scroll left" : "التمرير يساراً")} data-v-eec820e0><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-6 h-6" data-v-eec820e0><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-v-eec820e0></path></svg></button></section>`);
		};
	}
});
//#endregion
//#region components/home/CategorySlider.vue
var _sfc_setup$9 = CategorySlider_vue_vue_type_script_setup_true_lang_default.setup;
CategorySlider_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/CategorySlider.vue");
	return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
var CategorySlider_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CategorySlider_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-eec820e0"]]), { __name: "HomeCategorySlider" });
//#endregion
//#region components/home/BrandShowcase.vue?vue&type=script&setup=true&lang.ts
var BrandShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandShowcase",
	__ssrInlineRender: true,
	props: {
		brandName: {},
		brand_id: {},
		title: {},
		viewAllUrl: {},
		bgColor: {},
		products: {},
		subtitle: {},
		btnColor: {},
		brandLogo: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const apiProducts = ref([]);
		const isLoadingProducts = ref(false);
		const resolvedBrandId = computed(() => {
			return props.config?.brand_id || props.config?.brandId || props.brand_id || "";
		});
		const resolvedBrandName = computed(() => {
			return props.config?.brandName || props.config?.brand_name || props.brandName || "PHILIPS";
		});
		const resolvedTitle = computed(() => {
			return props.config?.title || props.title || `منتجات ${resolvedBrandName.value} العالمية`;
		});
		const resolvedSubtitle = computed(() => {
			return props.config?.subtitle || props.subtitle || "";
		});
		const resolvedBrandLogo = computed(() => {
			return props.config?.brandLogo || props.config?.brand_logo || props.brandLogo || "";
		});
		const resolvedViewAllUrl = computed(() => {
			return props.config?.viewAllUrl || props.config?.view_all_url || props.viewAllUrl || (resolvedBrandName.value ? `/brand/${resolvedBrandName.value.toLowerCase().replace(/\s+/g, "-")}` : "/shop");
		});
		const resolvedBgColor = computed(() => {
			return props.config?.bgColor || props.config?.bg_color || props.bgColor || "bg-[#1a66cc]";
		});
		const resolvedBtnColor = computed(() => {
			return props.config?.btnColor || props.config?.btn_color || props.btnColor || "";
		});
		const resolvedLimit = computed(() => {
			return Number(props.config?.limit) || 6;
		});
		const fetchShowcaseProducts = async () => {
			if (props.config?.products && props.config.products.length > 0) {
				apiProducts.value = props.config.products;
				return;
			}
			if (props.products && props.products.length > 0) {
				apiProducts.value = props.products;
				return;
			}
			isLoadingProducts.value = true;
			try {
				const limit = resolvedLimit.value;
				let fetched = [];
				const brandId = resolvedBrandId.value;
				if (brandId) {
					const res = await productApiService.fetchFilteredProducts({
						brand_id: brandId,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && resolvedBrandName.value) {
					const searchRes = await productApiService.searchProducts({
						keyword: resolvedBrandName.value,
						name: resolvedBrandName.value,
						limit
					});
					if (Array.isArray(searchRes.products) && searchRes.products.length > 0) fetched = searchRes.products.slice(0, limit);
				}
				if (fetched.length === 0) {
					const mockList = getProductsByBrand(resolvedBrandName.value);
					if (mockList.length > 0) fetched = mockList.slice(0, limit);
					else fetched = (await productApiService.fetchFilteredProducts({ limit })).products.slice(0, limit);
				}
				apiProducts.value = fetched;
			} catch (err) {
				console.warn("[BrandShowcase] Error loading brand products:", err);
				apiProducts.value = getProductsByBrand(resolvedBrandName.value).slice(0, resolvedLimit.value);
			} finally {
				isLoadingProducts.value = false;
			}
		};
		const displayProducts = computed(() => {
			return apiProducts.value.length > 0 ? apiProducts.value : getProductsByBrand(resolvedBrandName.value).slice(0, resolvedLimit.value);
		});
		watch([
			resolvedBrandId,
			resolvedBrandName,
			resolvedLimit
		], () => {
			fetchShowcaseProducts();
		}, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4" }, _attrs))} data-v-904bced2><div class="${ssrRenderClass(`rounded-2xl p-4 md:p-6 overflow-hidden ${resolvedBgColor.value} shadow-sm transition-all`)}" data-v-904bced2><div class="flex flex-col md:flex-row items-center justify-between mb-6 px-2 gap-4" data-v-904bced2><div class="w-full md:w-1/3 text-center md:text-right" data-v-904bced2><h2 class="text-base md:text-lg font-black text-white" data-v-904bced2>${ssrInterpolate(resolvedTitle.value)}</h2>`);
			if (resolvedSubtitle.value) _push(`<p class="text-xs md:text-sm text-white/80 mt-1 font-medium" data-v-904bced2>${ssrInterpolate(resolvedSubtitle.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="w-full md:w-1/3 text-center flex justify-center items-center order-first md:order-none" data-v-904bced2>`);
			if (resolvedBrandLogo.value) _push(`<div class="h-12 md:h-14 max-w-[180px] bg-white/10 backdrop-blur-xs rounded-xl p-2 flex items-center justify-center" data-v-904bced2><img${ssrRenderAttr("src", resolvedBrandLogo.value)}${ssrRenderAttr("alt", resolvedBrandName.value)} class="h-full w-full object-contain filter drop-shadow-sm" data-v-904bced2></div>`);
			else _push(`<h3 class="text-2xl md:text-4xl font-black text-white tracking-wide uppercase drop-shadow-xs" data-v-904bced2>${ssrInterpolate(resolvedBrandName.value)}</h3>`);
			_push(`</div><div class="w-full md:w-1/3 flex justify-center md:justify-end" data-v-904bced2>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: resolvedViewAllUrl.value,
				class: ["font-bold text-xs md:text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-all flex items-center justify-center gap-2 w-full md:w-auto shadow-sm", resolvedBtnColor.value || "bg-white text-slate-900 hover:bg-slate-50"]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-904bced2${_scopeId}>عرض الكل</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100" data-v-904bced2${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-904bced2${_scopeId}></path></svg>`);
					else return [createVNode("span", null, "عرض الكل"), (openBlock(), createBlock("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						fill: "none",
						viewBox: "0 0 24 24",
						"stroke-width": "2.5",
						stroke: "currentColor",
						class: "w-3.5 h-3.5 rtl:-scale-x-100"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="relative w-full" data-v-904bced2>`);
			if (isLoadingProducts.value && displayProducts.value.length === 0) {
				_push(`<div class="flex gap-3 sm:gap-6 overflow-hidden pb-4" data-v-904bced2><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-white/20 rounded-2xl animate-pulse p-4 space-y-3" data-v-904bced2><div class="w-full h-44 bg-white/30 rounded-xl" data-v-904bced2></div><div class="h-4 bg-white/40 rounded w-3/4" data-v-904bced2></div><div class="h-4 bg-white/30 rounded w-1/2" data-v-904bced2></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4" data-v-904bced2><!--[-->`);
				ssrRenderList(displayProducts.value, (product) => {
					_push(ssrRenderComponent(ProductCard_default, {
						key: product.id,
						product,
						class: "snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px]"
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region components/home/BrandShowcase.vue
var _sfc_setup$8 = BrandShowcase_vue_vue_type_script_setup_true_lang_default.setup;
BrandShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BrandShowcase.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var BrandShowcase_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BrandShowcase_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-904bced2"]]), { __name: "HomeBrandShowcase" });
//#endregion
//#region components/home/NewArrivalsShowcase.vue?vue&type=script&setup=true&lang.ts
var NewArrivalsShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NewArrivalsShowcase",
	__ssrInlineRender: true,
	props: {
		products: {},
		shopUrl: {},
		bgColor: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const apiProducts = ref([]);
		const isLoading = ref(false);
		const resolvedTitle = computed(() => {
			return props.config?.title || "أجهزة كهربائية وصلت حديثاً";
		});
		const resolvedSubtitle = computed(() => {
			return props.config?.subtitle !== void 0 ? props.config.subtitle : "اكتشف أحدث الأجهزة المنزلية بأفضل الأسعار";
		});
		const resolvedLimit = computed(() => {
			return Number(props.config?.limit) || 8;
		});
		const resolvedBgColor = computed(() => {
			return props.config?.bgColor || props.config?.bg_color || props.bgColor || "bg-[#7dd3fc]";
		});
		const resolvedBgStyle = computed(() => {
			const bg = resolvedBgColor.value;
			if (!bg) return { backgroundColor: "#7dd3fc" };
			if (bg.startsWith("#") || bg.startsWith("rgb")) return { backgroundColor: bg };
			const hexMatch = bg.match(/bg-\[(#[0-9A-Fa-f]{3,8})\]/);
			if (hexMatch && hexMatch[1]) return { backgroundColor: hexMatch[1] };
			return {};
		});
		const resolvedShopUrl = computed(() => {
			const url = props.config?.shopUrl || props.config?.shop_url || props.shopUrl;
			if (!url || url === "/new-arrivals" || url === "new-arrivals") return "/shop?sort_by=latest";
			return url;
		});
		const fetchNewArrivals = async () => {
			if (props.config?.products && props.config.products.length > 0) {
				apiProducts.value = props.config.products;
				return;
			}
			if (props.products && props.products.length > 0) {
				apiProducts.value = props.products;
				return;
			}
			isLoading.value = true;
			try {
				const limit = resolvedLimit.value;
				const res = await productApiService.fetchFilteredProducts({
					sort_by: "latest",
					limit
				});
				if (Array.isArray(res.products) && res.products.length > 0) apiProducts.value = res.products.slice(0, limit);
				else apiProducts.value = getNewArrivalProducts().slice(0, limit);
			} catch (err) {
				console.warn("[NewArrivalsShowcase] Error fetching latest products:", err);
				apiProducts.value = getNewArrivalProducts().slice(0, resolvedLimit.value);
			} finally {
				isLoading.value = false;
			}
		};
		const displayProducts = computed(() => {
			return apiProducts.value.length > 0 ? apiProducts.value : getNewArrivalProducts().slice(0, resolvedLimit.value);
		});
		watch(() => [props.config?.limit], () => fetchNewArrivals());
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4" }, _attrs))} data-v-7f379824><div class="${ssrRenderClass(["rounded-3xl py-4 px-4 sm:px-6 relative overflow-hidden shadow-sm transition-all", resolvedBgColor.value.startsWith("bg-") ? resolvedBgColor.value : ""])}" style="${ssrRenderStyle(resolvedBgStyle.value)}" data-v-7f379824><div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-2 px-2" data-v-7f379824><div class="text-right" data-v-7f379824><div class="bg-white/90 text-slate-800 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold inline-flex items-center gap-1 mb-1 shadow-sm" data-v-7f379824><span data-v-7f379824>✦ وصل حديثاً</span></div><h2 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight leading-snug" data-v-7f379824>${ssrInterpolate(resolvedTitle.value)}</h2>`);
			if (resolvedSubtitle.value) _push(`<p class="text-xs md:text-sm text-slate-800/80 mt-0.5 font-medium" data-v-7f379824>${ssrInterpolate(resolvedSubtitle.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex-shrink-0 mt-2 md:mt-0" data-v-7f379824>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: resolvedShopUrl.value,
				class: "bg-white text-slate-900 hover:bg-slate-50 font-bold px-5 py-2 rounded-full shadow-sm border border-white/50 transition-all inline-flex items-center gap-2 text-sm shadow-xs cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span data-v-7f379824${_scopeId}>تسوق الآن</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3.5 h-3.5 rtl:-scale-x-100" data-v-7f379824${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" data-v-7f379824${_scopeId}></path></svg>`);
					else return [createVNode("span", null, "تسوق الآن"), (openBlock(), createBlock("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						fill: "none",
						viewBox: "0 0 24 24",
						"stroke-width": "2.5",
						stroke: "currentColor",
						class: "w-3.5 h-3.5 rtl:-scale-x-100"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="relative w-full" data-v-7f379824>`);
			if (isLoading.value && displayProducts.value.length === 0) {
				_push(`<div class="flex gap-3 sm:gap-6 overflow-hidden pb-4" data-v-7f379824><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-white/40 rounded-2xl animate-pulse p-4 space-y-3" data-v-7f379824><div class="w-full h-44 bg-white/50 rounded-xl" data-v-7f379824></div><div class="h-4 bg-white/60 rounded w-3/4" data-v-7f379824></div><div class="h-4 bg-white/50 rounded w-1/2" data-v-7f379824></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else {
				_push(`<div class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4" data-v-7f379824><!--[-->`);
				ssrRenderList(displayProducts.value, (product) => {
					_push(ssrRenderComponent(ProductCard_default, {
						key: product.id,
						product,
						class: "snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] shadow-md hover:shadow-xl"
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region components/home/NewArrivalsShowcase.vue
var _sfc_setup$7 = NewArrivalsShowcase_vue_vue_type_script_setup_true_lang_default.setup;
NewArrivalsShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/NewArrivalsShowcase.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var NewArrivalsShowcase_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(NewArrivalsShowcase_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7f379824"]]), { __name: "HomeNewArrivalsShowcase" });
//#endregion
//#region components/home/BrandBannerShowcase.vue?vue&type=script&setup=true&lang.ts
var BrandBannerShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandBannerShowcase",
	__ssrInlineRender: true,
	props: {
		title: {},
		btnText: {},
		targetUrl: {},
		bannerImage: {},
		altText: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4" }, _attrs))}><div class="flex justify-between items-center mb-4 px-2"><h2 class="text-xl md:text-2xl font-black text-slate-800">${ssrInterpolate(__props.title)}</h2>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: __props.targetUrl,
				class: "bg-blue-50 text-blue-600 hover:bg-blue-100 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold inline-flex items-center gap-1.5 transition-all"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>${ssrInterpolate(__props.btnText)}</span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-3 h-3 md:w-4 md:h-4"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"${_scopeId}></path></svg>`);
					else return [createVNode("span", null, toDisplayString(__props.btnText), 1), (openBlock(), createBlock("svg", {
						xmlns: "http://www.w3.org/2000/svg",
						fill: "none",
						viewBox: "0 0 24 24",
						"stroke-width": "2.5",
						stroke: "currentColor",
						class: "w-3 h-3 md:w-4 md:h-4"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: __props.targetUrl,
				class: "aspect-[1664/624] w-full rounded-2xl overflow-hidden bg-slate-100 relative block group shadow-sm cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", __props.bannerImage)}${ssrRenderAttr("alt", __props.altText || __props.title)} width="1664" height="624" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"${_scopeId}>`);
					else return [createVNode("img", {
						src: __props.bannerImage,
						alt: __props.altText || __props.title,
						width: "1664",
						height: "624",
						loading: "lazy",
						decoding: "async",
						class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
					}, null, 8, ["src", "alt"])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/home/BrandBannerShowcase.vue
var _sfc_setup$6 = BrandBannerShowcase_vue_vue_type_script_setup_true_lang_default.setup;
BrandBannerShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BrandBannerShowcase.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var BrandBannerShowcase_default = Object.assign(BrandBannerShowcase_vue_vue_type_script_setup_true_lang_default, { __name: "HomeBrandBannerShowcase" });
//#endregion
//#region components/home/ProductsSliderShowcase.vue?vue&type=script&setup=true&lang.ts
var ProductsSliderShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductsSliderShowcase",
	__ssrInlineRender: true,
	props: {
		title: {},
		subtitle: {},
		viewAllUrl: {},
		products: {}
	},
	setup(__props) {
		ref(null);
		const scrollProgress = ref(0);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4" }, _attrs))} data-v-54992797><div class="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100" data-v-54992797>`);
			if (__props.title) {
				_push(`<div class="flex items-center justify-between mb-6 px-2" data-v-54992797><div data-v-54992797><h2 class="text-xl md:text-2xl font-black text-slate-800" data-v-54992797>${ssrInterpolate(__props.title)}</h2>`);
				if (__props.subtitle) _push(`<p class="text-sm text-slate-500 mt-1" data-v-54992797>${ssrInterpolate(__props.subtitle)}</p>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`<div class="relative w-full group/slider" data-v-54992797><button class="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a] text-white hover:bg-black p-3 rounded-xl shadow-lg transition-all border border-slate-700 opacity-0 group-hover/slider:opacity-100 translate-x-4 group-hover/slider:translate-x-2" title="السابق" data-v-54992797><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5" data-v-54992797><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-54992797></path></svg></button><button class="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-[#0f172a] text-white hover:bg-black p-3 rounded-xl shadow-lg transition-all border border-slate-700 opacity-0 group-hover/slider:opacity-100 -translate-x-4 group-hover/slider:-translate-x-2" title="التالي" data-v-54992797><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5" data-v-54992797><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-v-54992797></path></svg></button><div class="flex gap-3 sm:gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar pb-4 pt-1 px-1" data-v-54992797><!--[-->`);
			ssrRenderList(__props.products, (product) => {
				_push(ssrRenderComponent(ProductCard_default, {
					key: product.id,
					product,
					class: "snap-start shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px]"
				}, null, _parent));
			});
			_push(`<!--]--></div></div><div class="mt-4 flex justify-center items-center gap-1.5" data-v-54992797><div class="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden relative" data-v-54992797><div class="absolute top-0 right-0 h-full bg-[#0f172a] transition-all duration-300 rounded-full" style="${ssrRenderStyle({ width: scrollProgress.value + "%" })}" data-v-54992797></div></div></div></div></div>`);
		};
	}
});
//#endregion
//#region components/home/ProductsSliderShowcase.vue
var _sfc_setup$5 = ProductsSliderShowcase_vue_vue_type_script_setup_true_lang_default.setup;
ProductsSliderShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/ProductsSliderShowcase.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ProductsSliderShowcase_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ProductsSliderShowcase_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-54992797"]]), { __name: "HomeProductsSliderShowcase" });
//#endregion
//#region components/home/BrandCampaignSection.vue?vue&type=script&setup=true&lang.ts
var BrandCampaignSection_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandCampaignSection",
	__ssrInlineRender: true,
	props: {
		title: {},
		btnText: {},
		targetUrl: {},
		bannerImage: {},
		products: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const { currentLanguage } = useLanguage();
		const apiProducts = ref([]);
		const isLoading = ref(false);
		const resolvedTitle = computed(() => {
			if (currentLanguage.value === "en") return props.config?.title_en || props.config?.title || props.title || "Special Offers & Discounts";
			return props.config?.title || props.title || "خصومات وعروض مميزة";
		});
		const resolvedBtnText = computed(() => {
			if (currentLanguage.value === "en") return props.config?.btnText_en || props.config?.btn_text_en || "Shop Now";
			return props.config?.btnText || props.config?.btn_text || props.btnText || "تسوق الآن";
		});
		const resolvedTargetUrl = computed(() => {
			return props.config?.targetUrl || props.config?.target_url || props.targetUrl || "/shop";
		});
		const resolvedBannerImage = computed(() => {
			return props.config?.bannerImage || props.config?.banner_image || props.bannerImage || "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80";
		});
		const resolvedLimit = computed(() => {
			return Number(props.config?.limit) || 5;
		});
		const fetchCampaignProducts = async () => {
			if (props.config?.products && props.config.products.length > 0) {
				apiProducts.value = props.config.products;
				return;
			}
			if (props.products && props.products.length > 0) {
				apiProducts.value = props.products;
				return;
			}
			isLoading.value = true;
			try {
				const limit = resolvedLimit.value;
				let fetched = [];
				const brandId = props.config?.brand_id || props.config?.brandId;
				const brandName = props.config?.brandName || props.config?.brand_name;
				const targetCatId = props.config?.sub_category_id || props.config?.subCategoryId || props.config?.category_id || props.config?.categoryId;
				const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category;
				if (targetCatId && brandId) {
					const res = await productApiService.searchProducts({
						category_id: targetCatId,
						brand_id: brandId,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && targetCatId) {
					const res = await productApiService.fetchFilteredProducts({
						category_id: targetCatId,
						brand_id: brandId || void 0,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && brandId) {
					const res = await productApiService.fetchFilteredProducts({
						brand_id: brandId,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && (brandName || catName)) {
					const searchTerms = [brandName, catName].filter(Boolean).join(" ");
					const res = await productApiService.searchProducts({
						keyword: searchTerms,
						name: searchTerms,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0) {
					if (brandName) {
						const byBrand = getProductsByBrand(brandName);
						if (byBrand.length > 0) fetched = byBrand.slice(0, limit);
					}
					if (fetched.length === 0 && catName) {
						const byCat = getProductsByCategory(catName);
						if (byCat.length > 0) fetched = byCat.slice(0, limit);
					}
					if (fetched.length === 0) {
						const latest = await productApiService.fetchFilteredProducts({ limit });
						if (Array.isArray(latest.products) && latest.products.length > 0) fetched = latest.products.slice(0, limit);
						else fetched = getNewArrivalProducts().slice(0, limit);
					}
				}
				apiProducts.value = fetched;
			} catch (e) {
				console.warn("[BrandCampaignSection] Error fetching campaign products:", e);
				apiProducts.value = getNewArrivalProducts().slice(0, resolvedLimit.value);
			} finally {
				isLoading.value = false;
			}
		};
		const displayProducts = computed(() => {
			if (apiProducts.value.length > 0) return apiProducts.value;
			const limit = resolvedLimit.value;
			const brandName = props.config?.brandName || props.config?.brand_name;
			const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category;
			if (brandName) return getProductsByBrand(brandName).slice(0, limit);
			if (catName) return getProductsByCategory(catName).slice(0, limit);
			return getNewArrivalProducts().slice(0, limit);
		});
		watch(() => [
			props.config?.brand_id,
			props.config?.brandName,
			props.config?.category_id,
			props.config?.category,
			props.config?.sub_category_id,
			props.config?.subCategory,
			props.config?.limit
		], () => fetchCampaignProducts(), { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8" }, _attrs))}>`);
			_push(ssrRenderComponent(BrandBannerShowcase_default, {
				title: resolvedTitle.value,
				btnText: resolvedBtnText.value,
				targetUrl: resolvedTargetUrl.value,
				bannerImage: resolvedBannerImage.value
			}, null, _parent));
			_push(`<div class="-mt-4 relative z-10">`);
			if (isLoading.value && displayProducts.value.length === 0) {
				_push(`<div class="max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4"><div class="flex gap-3 sm:gap-6 overflow-hidden pb-4"><!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-slate-100 rounded-2xl animate-pulse p-4 space-y-3 border border-slate-200"><div class="w-full h-44 bg-slate-200 rounded-xl"></div><div class="h-4 bg-slate-200 rounded w-3/4"></div><div class="h-4 bg-slate-200 rounded w-1/2"></div></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(ssrRenderComponent(ProductsSliderShowcase_default, {
				viewAllUrl: resolvedTargetUrl.value,
				products: displayProducts.value
			}, null, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region components/home/BrandCampaignSection.vue
var _sfc_setup$4 = BrandCampaignSection_vue_vue_type_script_setup_true_lang_default.setup;
BrandCampaignSection_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BrandCampaignSection.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var BrandCampaignSection_default = Object.assign(BrandCampaignSection_vue_vue_type_script_setup_true_lang_default, { __name: "HomeBrandCampaignSection" });
//#endregion
//#region components/home/SideBannerSliderShowcase.vue?vue&type=script&setup=true&lang.ts
var SideBannerSliderShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SideBannerSliderShowcase",
	__ssrInlineRender: true,
	props: {
		sideBannerImage: {},
		sideBannerImages: {},
		sideBannerSlides: {},
		sideBannerUrl: {},
		products: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const currentIndex = ref(0);
		const apiProducts = ref([]);
		const isLoading = ref(false);
		const resolvedSideBannerUrl = computed(() => {
			return props.config?.sideBannerUrl || props.config?.side_banner_url || props.sideBannerUrl || "#";
		});
		const resolvedLimit = computed(() => {
			return Number(props.config?.limit) || 5;
		});
		const banners = computed(() => {
			const cfgSlides = props.config?.sideBannerSlides || props.sideBannerSlides;
			if (cfgSlides && cfgSlides.length > 0) return cfgSlides.map((slide) => ({
				image: slide.imageUrl || slide.image || "",
				url: slide.linkUrl || slide.url || resolvedSideBannerUrl.value
			}));
			const cfgImages = props.config?.sideBannerImages || props.config?.side_banner_images || props.sideBannerImages;
			if (cfgImages && cfgImages.length > 0) return cfgImages.map((img) => typeof img === "string" ? {
				image: img,
				url: resolvedSideBannerUrl.value
			} : {
				image: img.imageUrl || img.image || "",
				url: img.linkUrl || img.url || resolvedSideBannerUrl.value
			});
			const singleImg = props.config?.sideBannerImage || props.config?.side_banner_image || props.sideBannerImage;
			if (singleImg) return [
				{
					image: singleImg,
					url: resolvedSideBannerUrl.value
				},
				{
					image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
					url: "/category/kitchen-appliances"
				},
				{
					image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80",
					url: "/brand/philips"
				}
			];
			return [
				{
					image: "https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop",
					url: "/brand/smeg"
				},
				{
					image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
					url: "/category/kitchen-appliances"
				},
				{
					image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80",
					url: "/brand/philips"
				}
			];
		});
		const fetchSideProducts = async () => {
			if (props.config?.products && props.config.products.length > 0) {
				apiProducts.value = props.config.products;
				return;
			}
			if (props.products && props.products.length > 0) {
				apiProducts.value = props.products;
				return;
			}
			isLoading.value = true;
			try {
				const limit = resolvedLimit.value;
				let fetched = [];
				const brandId = props.config?.brand_id || props.config?.brandId;
				const brandName = props.config?.brandName || props.config?.brand_name;
				const targetCatId = props.config?.sub_category_id || props.config?.subCategoryId || props.config?.category_id || props.config?.categoryId;
				const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category;
				if (targetCatId && (brandId || brandName)) {
					const res = await productApiService.searchProducts({
						category_id: targetCatId,
						brand_id: brandId || void 0,
						keyword: brandName || void 0,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && targetCatId) {
					const res = await productApiService.fetchFilteredProducts({
						category_id: targetCatId,
						brand_id: brandId || void 0,
						limit
					});
					if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
				}
				if (fetched.length === 0 && (brandId || brandName)) {
					if (brandId) {
						const res = await productApiService.fetchFilteredProducts({
							brand_id: brandId,
							limit
						});
						if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
					} else if (brandName) {
						const res = await productApiService.searchProducts({
							keyword: brandName,
							name: brandName,
							limit
						});
						if (Array.isArray(res.products) && res.products.length > 0) fetched = res.products.slice(0, limit);
					}
				}
				if (fetched.length === 0) {
					if (brandName) {
						const byBrand = getProductsByBrand(brandName);
						if (byBrand.length > 0) fetched = byBrand.slice(0, limit);
					}
					if (fetched.length === 0 && catName) {
						const byCat = getProductsByCategory(catName);
						if (byCat.length > 0) fetched = byCat.slice(0, limit);
					}
					if (fetched.length === 0) {
						const latestRes = await productApiService.fetchFilteredProducts({ limit });
						if (Array.isArray(latestRes.products) && latestRes.products.length > 0) fetched = latestRes.products.slice(0, limit);
						else fetched = getNewArrivalProducts().slice(0, limit);
					}
				}
				apiProducts.value = fetched;
			} catch (e) {
				console.warn("[SideBannerSliderShowcase] Error fetching side products:", e);
				apiProducts.value = getNewArrivalProducts().slice(0, resolvedLimit.value);
			} finally {
				isLoading.value = false;
			}
		};
		const displayProducts = computed(() => {
			if (apiProducts.value.length > 0) return apiProducts.value;
			const limit = resolvedLimit.value;
			const brandName = props.config?.brandName || props.config?.brand_name;
			const catName = props.config?.subCategory || props.config?.sub_category || props.config?.category;
			if (brandName) return getProductsByBrand(brandName).slice(0, limit);
			if (catName) return getProductsByCategory(catName).slice(0, limit);
			return getNewArrivalProducts().slice(0, limit);
		});
		watch(() => [
			props.config?.brandName,
			props.config?.brand_id,
			props.config?.category_id,
			props.config?.category,
			props.config?.sub_category_id,
			props.config?.subCategory,
			props.config?.limit
		], () => fetchSideProducts(), { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col lg:flex-row gap-4 items-stretch max-w-[1550px] mx-auto px-2 sm:px-4 lg:px-6 py-4" }, _attrs))}><div class="w-full lg:w-[320px] xl:w-[380px] flex-shrink-0 flex flex-col pt-4"><div class="w-full h-[350px] sm:h-[565px] rounded-2xl overflow-hidden shadow-sm relative group bg-slate-100"><!--[-->`);
			ssrRenderList(banners.value, (banner, idx) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: idx,
					to: banner.url || __props.sideBannerUrl || "#",
					class: ["absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out", idx === currentIndex.value ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<img${ssrRenderAttr("src", banner.image)}${ssrRenderAttr("alt", `Side Banner ${idx + 1}`)} class="w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"${_scopeId}>`);
						else return [createVNode("img", {
							src: banner.image,
							alt: `Side Banner ${idx + 1}`,
							class: "w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
						}, null, 8, ["src", "alt"])];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></div></div><div class="flex-1 min-w-0 relative -mx-2 sm:-mx-4 lg:-mx-6 -my-4 lg:my-0">`);
			if (isLoading.value && displayProducts.value.length === 0) {
				_push(`<div class="flex gap-3 sm:gap-6 overflow-hidden py-4 px-4"><!--[-->`);
				ssrRenderList(3, (i) => {
					_push(`<div class="shrink-0 w-[calc(50%-6px)] sm:w-[260px] lg:w-[280px] h-[340px] bg-slate-100 rounded-2xl animate-pulse p-4 space-y-3 border border-slate-200"><div class="w-full h-44 bg-slate-200 rounded-xl"></div><div class="h-4 bg-slate-200 rounded w-3/4"></div><div class="h-4 bg-slate-200 rounded w-1/2"></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(ssrRenderComponent(ProductsSliderShowcase_default, { products: displayProducts.value }, null, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region components/home/SideBannerSliderShowcase.vue
var _sfc_setup$3 = SideBannerSliderShowcase_vue_vue_type_script_setup_true_lang_default.setup;
SideBannerSliderShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/SideBannerSliderShowcase.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SideBannerSliderShowcase_default = Object.assign(SideBannerSliderShowcase_vue_vue_type_script_setup_true_lang_default, { __name: "HomeSideBannerSliderShowcase" });
//#endregion
//#region components/home/BrandsTickerShowcase.vue?vue&type=script&setup=true&lang.ts
var BrandsTickerShowcase_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandsTickerShowcase",
	__ssrInlineRender: true,
	props: {
		title: {},
		brandLogos: {},
		brands: {},
		config: {}
	},
	setup(__props) {
		const props = __props;
		const apiBrands = ref([]);
		const failedLogos = ref({});
		const onImageError = (brandName) => {
			failedLogos.value[brandName] = true;
		};
		const resolvedTitle = computed(() => {
			return props.config?.title || props.title || "شركاؤنا من كبرى العلامات التجارية";
		});
		const normalizedBrands = computed(() => {
			const rawList = props.config?.brandLogos || props.config?.brand_logos || props.config?.brands || props.config?.items || props.brandLogos || props.brands || [];
			if (Array.isArray(rawList) && rawList.length > 0) {
				const list = rawList.map((item) => {
					const name = typeof item === "string" ? item : item.name || item.name_ar || item.name_en || item.title || "ماركة";
					const img = typeof item === "object" ? item.imageUrl || item.image_url || item.image || item.logo || item.icon || "" : "";
					const slug = (item.slug || name).toLowerCase().replace(/\s+/g, "-");
					return {
						name,
						logo: img,
						url: item.linkUrl || item.link_url || item.url || `/brand/${slug}`
					};
				}).filter((b) => Boolean(b.name));
				if (list.length > 0) return list;
			}
			if (apiBrands.value.length > 0) return apiBrands.value;
			return [
				{
					name: "PHILIPS",
					logo: "https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg",
					url: "/brand/philips"
				},
				{
					name: "SAMSUNG",
					logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg",
					url: "/brand/samsung"
				},
				{
					name: "LG",
					logo: "https://upload.wikimedia.org/wikipedia/commons/b/bf/LG_logo_%282015%29.svg",
					url: "/brand/lg"
				},
				{
					name: "DYSON",
					logo: "https://upload.wikimedia.org/wikipedia/commons/4/41/Dyson_logo.svg",
					url: "/brand/dyson"
				},
				{
					name: "DELONGHI",
					logo: "https://upload.wikimedia.org/wikipedia/commons/e/e0/De%27Longhi_logo.svg",
					url: "/brand/delonghi"
				},
				{
					name: "KENWOOD",
					logo: "https://upload.wikimedia.org/wikipedia/commons/2/23/Kenwood_logo.svg",
					url: "/brand/kenwood"
				},
				{
					name: "BISSELL",
					logo: "https://upload.wikimedia.org/wikipedia/commons/b/b8/Bissell_logo.svg",
					url: "/brand/bissell"
				},
				{
					name: "BRAUN",
					logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Braun-Logo.svg",
					url: "/brand/braun"
				}
			];
		});
		const repeatedCount = computed(() => {
			const len = normalizedBrands.value.length;
			if (len <= 4) return 6;
			if (len <= 8) return 4;
			return 3;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-4 lg:px-6 my-8 relative overflow-hidden bg-slate-50/70 py-8 md:py-10 rounded-3xl border border-slate-100 shadow-xs" }, _attrs))} data-v-8ac26dc5><div class="text-center mb-8" data-v-8ac26dc5><div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold mb-2" data-v-8ac26dc5><i class="fa-solid fa-award text-amber-600 text-xs" data-v-8ac26dc5></i><span data-v-8ac26dc5>شركاء النجاح والأصالة</span></div><h2 class="text-xl md:text-2xl font-black text-slate-800 tracking-tight" data-v-8ac26dc5>${ssrInterpolate(resolvedTitle.value)}</h2><div class="w-12 h-1 bg-amber-500 mx-auto mt-2.5 rounded-full" data-v-8ac26dc5></div></div><div class="relative flex overflow-hidden group/ticker py-2" data-v-8ac26dc5><div class="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-50/90 via-slate-50/50 to-transparent z-10 pointer-events-none" data-v-8ac26dc5></div><div class="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-50/90 via-slate-50/50 to-transparent z-10 pointer-events-none" data-v-8ac26dc5></div><div class="flex animate-marquee group-hover/ticker:[animation-play-state:paused] w-max select-none" data-v-8ac26dc5><!--[-->`);
			ssrRenderList(repeatedCount.value, (loop) => {
				_push(`<div class="flex gap-4 sm:gap-6 pl-4 sm:pl-6 items-center shrink-0" data-v-8ac26dc5><!--[-->`);
				ssrRenderList(normalizedBrands.value, (brand, bIdx) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: `${loop}-${bIdx}-${brand.name}`,
						to: brand.url,
						class: "h-20 min-w-[140px] sm:min-w-[170px] px-5 py-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-amber-400 hover:-translate-y-1 group shrink-0 cursor-pointer",
						title: brand.name
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) if (brand.logo && !failedLogos.value[brand.name]) _push(`<img${ssrRenderAttr("src", brand.logo)}${ssrRenderAttr("alt", brand.name)} class="max-h-11 max-w-[120px] sm:max-w-[140px] object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105" loading="lazy" data-v-8ac26dc5${_scopeId}>`);
							else _push(`<div class="flex items-center gap-2 font-black text-sm text-slate-700 group-hover:text-amber-600 transition-colors" data-v-8ac26dc5${_scopeId}><div class="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-black border border-amber-100" data-v-8ac26dc5${_scopeId}>${ssrInterpolate((brand.name || "B").charAt(0).toUpperCase())}</div><span class="tracking-wide" data-v-8ac26dc5${_scopeId}>${ssrInterpolate(brand.name)}</span></div>`);
							else return [brand.logo && !failedLogos.value[brand.name] ? (openBlock(), createBlock("img", {
								key: 0,
								src: brand.logo,
								alt: brand.name,
								onError: ($event) => onImageError(brand.name),
								class: "max-h-11 max-w-[120px] sm:max-w-[140px] object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105",
								loading: "lazy"
							}, null, 40, [
								"src",
								"alt",
								"onError"
							])) : (openBlock(), createBlock("div", {
								key: 1,
								class: "flex items-center gap-2 font-black text-sm text-slate-700 group-hover:text-amber-600 transition-colors"
							}, [createVNode("div", { class: "w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center text-xs font-black border border-amber-100" }, toDisplayString((brand.name || "B").charAt(0).toUpperCase()), 1), createVNode("span", { class: "tracking-wide" }, toDisplayString(brand.name), 1)]))];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			});
			_push(`<!--]--></div></div></div>`);
		};
	}
});
//#endregion
//#region components/home/BrandsTickerShowcase.vue
var _sfc_setup$2 = BrandsTickerShowcase_vue_vue_type_script_setup_true_lang_default.setup;
BrandsTickerShowcase_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/BrandsTickerShowcase.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var BrandsTickerShowcase_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BrandsTickerShowcase_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8ac26dc5"]]), { __name: "HomeBrandsTickerShowcase" });
//#endregion
//#region components/home/StoreGuaranteesBar.vue?vue&type=script&setup=true&lang.ts
var StoreGuaranteesBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StoreGuaranteesBar",
	__ssrInlineRender: true,
	props: { config: {} },
	setup(__props) {
		const { currentLanguage } = useLanguage();
		const defaultGuaranteesAr = [
			{
				title: "منتجات أصلية 100%",
				desc: "مضمونة من الوكيل مباشرة"
			},
			{
				title: "أسرع خدمة ما بعد البيع",
				desc: "متابعة وصيانة فورية"
			},
			{
				title: "ضمان حتى 12 شهر",
				desc: "ضمان شامل ومعتمد"
			},
			{
				title: "توصيل سريع وآمن",
				desc: "شحن لكافة المحافظات"
			}
		];
		const defaultGuaranteesEn = [
			{
				title: "100% Genuine Products",
				desc: "Directly from authorized agency"
			},
			{
				title: "Rapid After-Sales Service",
				desc: "Immediate support & maintenance"
			},
			{
				title: "Up to 12 Months Warranty",
				desc: "Comprehensive certified warranty"
			},
			{
				title: "Fast & Secure Delivery",
				desc: "Reliable dispatch to all regions"
			}
		];
		const props = __props;
		const resolvedGuarantees = computed(() => {
			const isEn = currentLanguage.value === "en";
			if (props.config?.guarantees && props.config.guarantees.length > 0) return props.config.guarantees.map((g) => ({
				title: isEn ? g.title_en || g.title : g.title || g.title_en,
				desc: isEn ? g.desc_en || g.desc || g.subtitle : g.desc || g.subtitle || g.desc_en
			}));
			return isEn ? defaultGuaranteesEn : defaultGuaranteesAr;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1550px] mx-auto px-4 lg:px-6 my-10" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6"><!--[-->`);
			ssrRenderList(resolvedGuarantees.value, (guarantee, idx) => {
				_push(`<div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:border-slate-200 hover:-translate-y-1 group"><div class="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-800 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 flex-shrink-0">`);
				if (idx === 0) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"></path></svg>`);
				else if (idx === 1) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
				else if (idx === 2) _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path></svg>`);
				else _push(`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"></path></svg>`);
				_push(`</div><div><h3 class="text-slate-800 font-bold text-sm md:text-base mb-1">${ssrInterpolate(guarantee.title)}</h3><p class="text-slate-500 text-xs md:text-sm">${ssrInterpolate(guarantee.desc || guarantee.subtitle)}</p></div></div>`);
			});
			_push(`<!--]--></div></div>`);
		};
	}
});
//#endregion
//#region components/home/StoreGuaranteesBar.vue
var _sfc_setup$1 = StoreGuaranteesBar_vue_vue_type_script_setup_true_lang_default.setup;
StoreGuaranteesBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home/StoreGuaranteesBar.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var StoreGuaranteesBar_default = Object.assign(StoreGuaranteesBar_vue_vue_type_script_setup_true_lang_default, { __name: "HomeStoreGuaranteesBar" });
//#endregion
//#region services/homeSectionApiService.ts
var defaultFallbackSections = [
	{
		id: "sec-hero-1",
		type: "hero_slider",
		sort_order: 1,
		is_active: 1,
		data: { slides: [
			{
				id: 1,
				imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
				linkUrl: "/category/ac",
				altText: "أقوى التخفيضات على المكيفات"
			},
			{
				id: 2,
				imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
				linkUrl: "/category/kitchen-appliances",
				altText: "جدد مطبخك بأحدث الأجهزة"
			},
			{
				id: 3,
				imageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=1600&q=80",
				mobileImageUrl: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80",
				linkUrl: "/category/screens",
				altText: "شاشات ذكية بدقة 4K"
			}
		] }
	},
	{
		id: "sec-cat-slider-1",
		type: "category_slider",
		sort_order: 2,
		is_active: 1,
		data: {
			title: "تسوق حسب القسم",
			limit: 12
		}
	},
	{
		id: "sec-brand-1",
		type: "brand_showcase",
		sort_order: 3,
		is_active: 1,
		data: {
			brandName: "PHILIPS",
			title: "منتجات فيليبس العالمية",
			viewAllUrl: "/brand/philips",
			bgColor: "bg-[#1a66cc]"
		}
	},
	{
		id: "sec-brand-2",
		type: "brand_showcase",
		sort_order: 4,
		is_active: 1,
		data: {
			brandName: "NUTRICOOK",
			title: "منتجات NutriCook العالمية",
			subtitle: "أكل أكثر ذكاءً وصحة",
			viewAllUrl: "/brand/nutricook",
			bgColor: "bg-[#111827]",
			btnColor: "bg-[#f97316] text-white hover:bg-orange-600"
		}
	},
	{
		id: "sec-new-arrivals-1",
		type: "new_arrivals",
		sort_order: 5,
		is_active: 1,
		data: {
			title: "أجهزة كهربائية وصلت حديثاً",
			subtitle: "اكتشف أحدث الأجهزة المنزلية بأفضل الأسعار",
			shopUrl: "/new-arrivals"
		}
	},
	{
		id: "sec-campaign-1",
		type: "brand_campaign",
		sort_order: 6,
		is_active: 1,
		data: {
			title: "خصومات Tineco",
			btnText: "منتجات Tineco",
			targetUrl: "/brand/tineco",
			bannerImage: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80",
			category: "أجهزة المطبخ",
			limit: 5
		}
	},
	{
		id: "sec-side-banner-1",
		type: "side_banner",
		sort_order: 7,
		is_active: 1,
		data: {
			sideBannerImage: "https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop",
			sideBannerImages: [
				"https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop",
				"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&q=80",
				"https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80"
			],
			sideBannerUrl: "/brand/smeg",
			category: "أجهزة المطبخ",
			limit: 5
		}
	},
	{
		id: "sec-side-banner-2",
		type: "side_banner",
		sort_order: 8,
		is_active: 1,
		data: {
			sideBannerImage: "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80",
			sideBannerImages: ["https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80", "https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop"],
			sideBannerUrl: "/brand/philips",
			brandName: "PHILIPS",
			limit: 10
		}
	},
	{
		id: "sec-campaign-2",
		type: "brand_campaign",
		sort_order: 9,
		is_active: 1,
		data: {
			title: "مجموعة أجهزة دايسون الحديثة",
			btnText: "تسوق دايسون",
			targetUrl: "/brand/dyson",
			bannerImage: "https://makka.store/wp-content/uploads/2026/06/sage-homebanner-desktop.webp",
			category: "أجهزة المطبخ",
			limit: 5
		}
	},
	{
		id: "sec-brand-3",
		type: "brand_showcase",
		sort_order: 10,
		is_active: 1,
		data: {
			brandName: "JBL",
			title: "منتجات JBL العالمية",
			subtitle: "سماعات وأصوات بجودة لا مثيل لها",
			brandLogo: "https://upload.wikimedia.org/wikipedia/commons/1/1d/JBL_logo.svg",
			bgColor: "bg-[#FF3300]",
			viewAllUrl: "/brand/jbl"
		}
	},
	{
		id: "sec-features-1",
		type: "store_features",
		sort_order: 11,
		is_active: 1,
		data: {}
	},
	{
		id: "sec-brands-ticker-1",
		type: "brands_ticker",
		sort_order: 12,
		is_active: 1,
		data: {}
	},
	{
		id: "sec-guarantees-1",
		type: "store_guarantees",
		sort_order: 13,
		is_active: 1,
		data: {}
	},
	{
		id: "sec-location-1",
		type: "store_location",
		sort_order: 14,
		is_active: 1,
		data: {}
	}
];
var fetchPublicHomeSections = async () => {
	const api = useApi();
	try {
		const res = await api.get("/api/v1/home-sections");
		let rawList = [];
		if (Array.isArray(res)) rawList = res;
		else if (res && Array.isArray(res.data)) rawList = res.data;
		else if (res && res.data && Array.isArray(res.data.sections)) rawList = res.data.sections;
		else if (res && Array.isArray(res.sections)) rawList = res.sections;
		if (rawList && rawList.length > 0) return rawList.filter((sec) => sec.is_active === void 0 || sec.is_active === true || sec.is_active === 1 || sec.is_active === "1").sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0)).map((sec) => {
			let sectionData = sec.data;
			if (typeof sectionData === "string") try {
				sectionData = JSON.parse(sectionData);
			} catch (e) {
				sectionData = {};
			}
			return {
				...sec,
				data: sectionData || {}
			};
		});
		return defaultFallbackSections;
	} catch (error) {
		console.warn("Failed to fetch home sections from API, using fallback layout:", error);
		return defaultFallbackSections;
	}
};
//#endregion
//#region composables/useHomeSections.ts
var useHomeSections = () => {
	const sections = ref([]);
	const loading = ref(false);
	const error = ref(null);
	const loadHomeSections = async () => {
		loading.value = true;
		error.value = null;
		try {
			const data = await fetchPublicHomeSections();
			sections.value = data;
		} catch (err) {
			error.value = err?.message || "Failed to load home sections";
		} finally {
			loading.value = false;
		}
	};
	return {
		sections,
		loading,
		error,
		loadHomeSections
	};
};
//#endregion
//#region pages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { sections, loading} = useHomeSections();
		const componentMap = {
			hero_slider: HeroBanner_default,
			hero: HeroBanner_default,
			category_slider: CategorySlider_default,
			brand_showcase: BrandShowcase_default,
			new_arrivals: NewArrivalsShowcase_default,
			brand_campaign: BrandCampaignSection_default,
			side_banner: SideBannerSliderShowcase_default,
			store_features: StoreFeaturesBar_default,
			brands_ticker: BrandsTickerShowcase_default,
			store_guarantees: StoreGuaranteesBar_default,
			store_location: StoreLocationShowcase_default
		};
		const getSectionComponent = (type) => {
			return componentMap[type] || null;
		};
		useHead$1({
			title: "الرئيسية | أسوار جدة - أحدث الأجهزة الكهربائية بأسعار تنافسية",
			meta: [
				{
					name: "description",
					content: "اكتشف أحدث الأجهزة الكهربائية والإلكترونيات من ماركات عالمية في أسوار جدة. عروض يومية، أسعار تنافسية، وتوصيل سريع لجميع مناطق المملكة."
				},
				{
					property: "og:title",
					content: "الرئيسية | أسوار جدة - أحدث الأجهزة الكهربائية"
				},
				{
					property: "og:description",
					content: "اكتشف أحدث الأجهزة الكهربائية والإلكترونيات في أسوار جدة بأسعار لا تقبل المنافسة."
				}
			]
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				dir: "rtl",
				class: "font-sans text-luxury-black bg-luxury-cream min-h-screen"
			}, _attrs))}>`);
			if (unref(loading) && (!unref(sections) || unref(sections).length === 0)) {
				_push(`<div class="space-y-8 py-4">`);
				_push(ssrRenderComponent(HomeHeroSkeleton_default, null, null, _parent));
				_push(`<div class="max-w-[1550px] mx-auto px-4 lg:px-6 space-y-4"><div class="h-6 bg-slate-200/80 rounded-xl w-48 animate-pulse"></div>`);
				_push(ssrRenderComponent(ProductGridSkeleton_default, { count: 4 }, null, _parent));
				_push(`</div></div>`);
			} else {
				_push(`<!--[-->`);
				ssrRenderList(unref(sections), (section) => {
					_push(`<!--[-->`);
					if (getSectionComponent(section.type)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(getSectionComponent(section.type)), { config: section.data || section }, null), _parent);
					else _push(`<!---->`);
					_push(`<!--]-->`);
				});
				_push(`<!--]-->`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = index_vue_vue_type_script_setup_true_lang_default;

export { pages_default as default };
//# sourceMappingURL=pages-Dds_IhlF.mjs.map
