import { _ as __exportAll } from './rolldown-runtime-D7D4PA-g.mjs';
import { N as NuxtLink, _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { u as useCompare } from './useCompare-BYK443T-.mjs';
import { u as useWishlist } from './useWishlist-BWj6pk_8.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { u as useProducts } from './useProducts-BMlxn0rw.mjs';
import { P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { defineComponent, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, ref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderStyle } from 'vue/server-renderer';
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
import 'unhead/utils';
import './productApiService-DKwZsTgl.mjs';
import './apiConfig-CCR2eNes.mjs';

//#region components/ui/ProductDetailsSkeleton.vue
var _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-8" }, _attrs))}><div class="h-4 bg-slate-100 rounded-md w-64"></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"><div class="lg:col-span-5 space-y-4"><div class="w-full aspect-square bg-slate-100 rounded-3xl border border-slate-200/60 flex items-center justify-center"><i class="fa-regular fa-image text-slate-300 text-4xl"></i></div><div class="flex gap-3"><!--[-->`);
	ssrRenderList(4, (i) => {
		_push(`<div class="w-20 h-20 bg-slate-100 rounded-2xl border border-slate-200/60"></div>`);
	});
	_push(`<!--]--></div></div><div class="lg:col-span-7 space-y-6"><div class="flex items-center gap-3"><div class="h-6 bg-slate-100 rounded-lg w-24"></div><div class="h-6 bg-emerald-50 rounded-lg w-20"></div></div><div class="space-y-2"><div class="h-7 bg-slate-200 rounded-xl w-4/5"></div><div class="h-7 bg-slate-200 rounded-xl w-3/5"></div></div><div class="h-4 bg-slate-100 rounded-md w-48"></div><div class="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-3"><div class="h-8 bg-amber-200/80 rounded-xl w-40"></div><div class="h-4 bg-slate-200 rounded-md w-64"></div></div><div class="space-y-3"><div class="h-4 bg-slate-100 rounded-md w-28"></div><div class="flex gap-2"><!--[-->`);
	ssrRenderList(3, (i) => {
		_push(`<div class="w-10 h-10 rounded-full bg-slate-200"></div>`);
	});
	_push(`<!--]--></div></div><div class="flex flex-col sm:flex-row gap-4 pt-4"><div class="h-14 bg-amber-400/50 rounded-2xl flex-1"></div><div class="h-14 bg-slate-900/40 rounded-2xl flex-1"></div></div></div></div></div>`);
}
var _sfc_setup$7 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/ProductDetailsSkeleton.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var ProductDetailsSkeleton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]), { __name: "UiProductDetailsSkeleton" });
//#endregion
//#region components/product/details/ProductGallery.vue?vue&type=script&setup=true&lang.ts
var ProductGallery_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductGallery",
	__ssrInlineRender: true,
	props: {
		images: {
			type: Array,
			default: () => []
		},
		brand: {
			type: [Object, String],
			default: ""
		},
		discountBadge: {
			type: String,
			default: ""
		}
	},
	setup(__props) {
		const props = __props;
		const activeImageIndex = ref(0);
		const imagesList = computed(() => {
			if (Array.isArray(props.images) && props.images.length > 0) return props.images;
			return ["https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80"];
		});
		const brandLogo = computed(() => {
			if (typeof props.brand === "object" && props.brand !== null) return props.brand.logo || props.brand.image || props.brand.icon || "";
			return "";
		});
		const brandName = computed(() => {
			if (typeof props.brand === "object" && props.brand !== null) return props.brand.name || "";
			return String(props.brand || "");
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-4 sticky top-24" }, _attrs))} data-v-273a0b78><div class="relative w-full aspect-square bg-slate-50 rounded-3xl overflow-hidden border border-slate-100 flex items-center justify-center p-8 group" data-v-273a0b78><div class="absolute top-4 right-4 z-10 flex flex-col gap-2" data-v-273a0b78>`);
			if (__props.discountBadge) _push(`<span class="bg-amber-500 text-white text-xs md:text-sm font-black px-3 py-1 rounded-full shadow-lg shadow-amber-500/30" data-v-273a0b78>${ssrInterpolate(__props.discountBadge)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (brandName.value) {
				_push(`<div class="absolute top-4 left-4 z-10" data-v-273a0b78><div class="bg-white/95 backdrop-blur text-slate-800 text-xs font-black uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-sm border border-slate-100 flex items-center gap-2" data-v-273a0b78>`);
				if (brandLogo.value) _push(`<img${ssrRenderAttr("src", brandLogo.value)}${ssrRenderAttr("alt", brandName.value)} class="h-5 w-auto object-contain max-w-[80px]" data-v-273a0b78>`);
				else _push(`<span data-v-273a0b78>${ssrInterpolate(brandName.value)}</span>`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			if (imagesList.value.length > 1) _push(`<button class="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-[#0B0E28] hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer" aria-label="الصورة السابقة" data-v-273a0b78><svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-273a0b78><polyline points="15 18 9 12 15 6" data-v-273a0b78></polyline></svg></button>`);
			else _push(`<!---->`);
			if (imagesList.value.length > 1) _push(`<button class="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 shadow-md text-slate-700 hover:bg-[#0B0E28] hover:text-white flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 cursor-pointer" aria-label="الصورة التالية" data-v-273a0b78><svg class="w-5 h-5 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-273a0b78><polyline points="9 18 15 12 9 6" data-v-273a0b78></polyline></svg></button>`);
			else _push(`<!---->`);
			_push(`<img${ssrRenderAttr("src", imagesList.value[activeImageIndex.value])} alt="Product Image" class="w-full h-full object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-105" data-v-273a0b78></div>`);
			if (imagesList.value.length > 1) {
				_push(`<div class="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1" data-v-273a0b78><!--[-->`);
				ssrRenderList(imagesList.value, (img, idx) => {
					_push(`<button class="${ssrRenderClass([activeImageIndex.value === idx ? "border-amber-500 shadow-md shadow-amber-500/20" : "border-transparent hover:border-slate-200 opacity-60 hover:opacity-100", "relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-slate-50 p-2 cursor-pointer"])}" data-v-273a0b78><img${ssrRenderAttr("src", img)} alt="Thumbnail" class="w-full h-full object-contain mix-blend-multiply" data-v-273a0b78></button>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/product/details/ProductGallery.vue
var _sfc_setup$6 = ProductGallery_vue_vue_type_script_setup_true_lang_default.setup;
ProductGallery_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/ProductGallery.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var ProductGallery_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ProductGallery_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-273a0b78"]]), { __name: "ProductDetailsProductGallery" });
//#endregion
//#region components/product/details/ProductInfo.vue?vue&type=script&setup=true&lang.ts
var ProductInfo_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductInfo",
	__ssrInlineRender: true,
	props: { product: {
		type: Object,
		required: true
	} },
	setup(__props) {
		const props = __props;
		const { t, formatCurrency, layoutDirection } = useLanguage();
		useCart();
		const { isInCompare } = useCompare();
		const { isInWishlist } = useWishlist();
		const quantity = ref(1);
		const displayTitle = computed(() => {
			if (!props.product) return "";
			if (layoutDirection.value === "ltr") return props.product.title_en || props.product.name_en || props.product.title || props.product.name || "Featured Product";
			return props.product.title || props.product.name || "منتج مميز";
		});
		const displayPrice = computed(() => {
			if (!props.product) return formatCurrency(0);
			return formatCurrency(props.product.price || 0);
		});
		const displayOriginalPrice = computed(() => {
			if (!props.product || !props.product.hasDiscount || !props.product.originalPrice) return "";
			return formatCurrency(props.product.originalPrice);
		});
		const availabilityText = computed(() => {
			if (!props.product) return "";
			if (props.product.inStock ?? props.product.stockCount > 0) return t("product.in_stock");
			return t("product.out_of_stock");
		});
		const wishlistTooltip = computed(() => {
			const inW = isInWishlist(props.product?.id);
			if (layoutDirection.value === "ltr") return inW ? "Remove from Wishlist" : "Add to Wishlist";
			return inW ? "إزالة من المفضلة" : "إضافة للمفضلة";
		});
		const compareTooltip = computed(() => {
			const inC = isInCompare(props.product?.id);
			if (layoutDirection.value === "ltr") return inC ? "Remove from Compare" : "Add to Compare";
			return inC ? "إزالة من المقارنة" : "إضافة للمقارنة";
		});
		const compareText = computed(() => {
			const inC = isInCompare(props.product?.id);
			if (layoutDirection.value === "ltr") return inC ? "In Compare" : "Compare";
			return inC ? "مضاف للمقارنة" : "مقارنة المنتج";
		});
		const brandLogo = computed(() => {
			if (typeof props.product?.brand === "object" && props.product.brand !== null) return props.product.brand.logo || props.product.brand.image || props.product.brand.icon || "";
			return "";
		});
		const brandName = computed(() => {
			if (typeof props.product?.brand === "object" && props.product.brand !== null) return props.product.brand.name || "";
			return props.product?.brandName || (typeof props.product?.brand === "string" ? props.product.brand : "");
		});
		const displayRating = computed(() => {
			return props.product?.rating || props.product?.reviews_avg_rating || 4.9;
		});
		const displayReviewsCount = computed(() => {
			return props.product?.reviewCount || props.product?.reviewsCount || props.product?.reviews_count || 18;
		});
		const formattedInstallment = computed(() => {
			const price = props.product?.price || 0;
			return formatCurrency(Math.ceil(price / 4));
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "flex flex-col h-full text-start",
				dir: unref(layoutDirection)
			}, _attrs))}>`);
			if (brandName.value) {
				_push(`<div class="mb-3 flex items-center gap-2">`);
				if (brandLogo.value) _push(`<img${ssrRenderAttr("src", brandLogo.value)}${ssrRenderAttr("alt", brandName.value)} class="h-6 w-auto object-contain max-w-[100px]">`);
				else _push(`<!---->`);
				_push(`<span class="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100/80 px-2.5 py-1 rounded-lg uppercase tracking-wider">${ssrInterpolate(brandName.value)}</span></div>`);
			} else _push(`<!---->`);
			_push(`<div class="mb-6"><h1 class="text-2xl md:text-3xl lg:text-4xl font-black text-[#0B0E28] leading-tight mb-4 text-start">${ssrInterpolate(displayTitle.value)}</h1><div class="flex flex-wrap items-center gap-4 text-sm"><div class="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100"><svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd"></path></svg><span class="font-bold text-amber-700">${ssrInterpolate(displayRating.value)}</span><span class="text-amber-600/70">(${ssrInterpolate(displayReviewsCount.value)} ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "reviews" : "تقييم")})</span></div>`);
			if (__props.product?.sku) _push(`<div class="flex items-center gap-1.5 text-slate-500 font-medium bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100"><span>${ssrInterpolate(unref(t)("product.sku"))}</span><span class="text-slate-700 font-mono">${ssrInterpolate(__props.product.sku)}</span></div>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="bg-slate-50/50 rounded-2xl p-5 border border-slate-100 mb-6 relative overflow-hidden"><div class="flex items-end justify-between flex-wrap gap-4"><div><span class="text-slate-500 font-bold block mb-1 text-xs">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Base Price" : "السعر الأساسي")}</span><div class="flex items-end gap-3"${ssrRenderAttr("dir", unref(layoutDirection))}><span class="text-3xl md:text-4xl font-black text-[#0B0E28] leading-none">${ssrInterpolate(displayPrice.value)}</span>`);
			if (displayOriginalPrice.value) _push(`<div class="flex flex-col"><span class="text-sm md:text-base text-slate-400 line-through font-medium">${ssrInterpolate(displayOriginalPrice.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (__props.product?.discountPercentage) _push(`<div class="bg-rose-100 text-rose-600 font-black text-sm px-3 py-1.5 rounded-xl border border-rose-200">${ssrInterpolate(unref(layoutDirection) === "ltr" ? `Save ${__props.product.discountPercentage}%` : `وفر ${__props.product.discountPercentage}%`)}</div>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="bg-gradient-to-r from-[#0B0E28] to-[#1a235c] rounded-2xl p-4 mb-6 flex items-center gap-4 text-white shadow-lg shadow-[#0B0E28]/10 cursor-pointer hover:shadow-xl transition-shadow group"><div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0 border border-white/20"><svg class="w-6 h-6 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div><div class="flex-1"><h4 class="font-bold text-sm mb-0.5">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Smart Installment Plan" : "قسط مشترياتك بذكاء")}</h4><p class="text-xs text-slate-300 font-medium">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Flexible monthly plans starting from" : "خطط تقسيط مرنة تبدأ من")} <span class="text-amber-400 font-bold mx-1">${ssrInterpolate(formattedInstallment.value)}</span> ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "/ month" : "/ شهر")}</p></div><svg class="w-5 h-5 text-slate-400 rtl:-scale-x-100 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></div><div class="mt-auto pt-6 border-t border-slate-100"><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5"><div class="flex items-center gap-2"><span class="relative flex h-3 w-3"><span class="${ssrRenderClass([[__props.product?.stockCount && __props.product.stockCount <= 5 ? "bg-rose-500" : "bg-emerald-500"], "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"])}"></span><span class="${ssrRenderClass([[__props.product?.stockCount && __props.product.stockCount <= 5 ? "bg-rose-500" : "bg-emerald-500"], "relative inline-flex rounded-full h-3 w-3"])}"></span></span><span class="${ssrRenderClass([[__props.product?.stockCount && __props.product.stockCount <= 5 ? "text-rose-600" : "text-emerald-600"], "font-bold text-sm"])}">${ssrInterpolate(availabilityText.value)}</span></div>`);
			if (__props.product?.stockCount && __props.product.stockCount <= 5) _push(`<span class="text-xs font-bold text-rose-500 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-100/50">${ssrInterpolate(unref(layoutDirection) === "ltr" ? `Only ${__props.product.stockCount} left in stock - Order now!` : `باقي ${__props.product.stockCount} قطع فقط - اطلبها الآن!`)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-stretch gap-3"><div class="flex items-center bg-slate-50 rounded-2xl border border-slate-200 h-14 px-2 w-[120px] shrink-0 order-1"><button${ssrIncludeBooleanAttr(quantity.value <= 1) ? " disabled" : ""} class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:text-[#0B0E28] disabled:opacity-50 transition-colors cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button><span class="flex-1 text-center font-black text-[#0B0E28] text-lg">${ssrInterpolate(quantity.value)}</span><button class="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm hover:text-[#0B0E28] transition-colors cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button></div><button class="${ssrRenderClass([[unref(isInWishlist)(__props.product?.id) ? "border-rose-500 bg-rose-50 text-rose-500 shadow-rose-500/10" : "border-slate-100 text-slate-400 hover:border-rose-500 hover:text-rose-500 hover:bg-rose-50"], "w-14 h-14 flex items-center justify-center rounded-2xl border-2 transition-all shrink-0 order-2 cursor-pointer"])}"${ssrRenderAttr("title", wishlistTooltip.value)}><svg class="w-5 h-5"${ssrRenderAttr("fill", unref(isInWishlist)(__props.product?.id) ? "currentColor" : "none")} viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></button><button class="${ssrRenderClass([[unref(isInCompare)(__props.product?.id) ? "border-amber-500 bg-amber-50 text-amber-700" : "border-slate-100 text-slate-600 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/50"], "h-14 px-4 flex items-center justify-center gap-2 rounded-2xl border-2 transition-all shrink-0 order-2 cursor-pointer font-bold text-xs"])}"${ssrRenderAttr("title", compareTooltip.value)}><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg><span class="hidden sm:inline">${ssrInterpolate(compareText.value)}</span></button><button class="w-full sm:flex-1 h-14 bg-amber-500 text-slate-900 font-black text-base rounded-2xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 hover:shadow-xl hover:shadow-amber-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 overflow-hidden relative group order-3 sm:order-2 mt-1 sm:mt-0 cursor-pointer"><div class="absolute inset-0 -translate-x-full bg-white/30 group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div><svg class="w-5 h-5 shrink-0 relative z-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span class="relative z-10">${ssrInterpolate(unref(t)("product.add_to_cart"))}</span></button></div></div></div>`);
		};
	}
});
//#endregion
//#region components/product/details/ProductInfo.vue
var _sfc_setup$5 = ProductInfo_vue_vue_type_script_setup_true_lang_default.setup;
ProductInfo_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/ProductInfo.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var ProductInfo_default = Object.assign(ProductInfo_vue_vue_type_script_setup_true_lang_default, { __name: "ProductDetailsProductInfo" });
//#endregion
//#region components/product/details/ReviewModal.vue?vue&type=script&setup=true&lang.ts
var ReviewModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ReviewModal",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		productId: {
			type: [Number, String],
			default: null
		}
	},
	emits: ["close", "submitted"],
	setup(__props, { emit: __emit }) {
		const { layoutDirection } = useLanguage();
		const isSubmitting = ref(false);
		const alertMessage = ref("");
		const alertSuccess = ref(false);
		ref([]);
		const reviewForm = ref({
			rating: 5,
			order_id: "",
			comment: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			if (__props.isOpen) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: "fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4",
					dir: unref(layoutDirection)
				}, _attrs))} data-v-8b495c51><div class="bg-white rounded-3xl max-w-lg w-full p-6 lg:p-8 shadow-2xl border border-slate-100 relative space-y-5 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar" data-v-8b495c51><button class="absolute top-4 end-4 lg:top-6 lg:end-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer" data-v-8b495c51><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-8b495c51><line x1="18" y1="6" x2="6" y2="18" data-v-8b495c51></line><line x1="6" y1="6" x2="18" y2="18" data-v-8b495c51></line></svg></button><div class="text-start" data-v-8b495c51><h3 class="text-2xl font-black text-[#0B0E28] mb-1" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Add Your Review" : "أضف تقييمك للمنتج")}</h3><p class="text-sm text-slate-500" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Share your experience with this product." : "شاركنا رأيك وتجربتك مع المنتج بكل شفافية.")}</p></div>`);
				if (alertMessage.value) _push(`<div class="${ssrRenderClass(["p-4 rounded-2xl text-xs font-bold transition-all text-start", alertSuccess.value ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-rose-50 text-rose-700 border border-rose-200"])}" data-v-8b495c51>${ssrInterpolate(alertMessage.value)}</div>`);
				else _push(`<!---->`);
				_push(`<div class="text-start" data-v-8b495c51><label class="block text-sm font-bold text-slate-700 mb-2" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Overall Rating" : "ما هو تقييمك العام؟")}</label><div class="flex items-center gap-1.5 justify-start" data-v-8b495c51><!--[-->`);
				ssrRenderList(5, (star) => {
					_push(`<button type="button" class="transition-transform hover:scale-110 focus:outline-none cursor-pointer" data-v-8b495c51><svg class="${ssrRenderClass([star <= reviewForm.value.rating ? "text-amber-500 drop-shadow-sm" : "text-slate-200", "w-9 h-9"])}" viewBox="0 0 24 24" fill="currentColor" data-v-8b495c51><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" data-v-8b495c51></path></svg></button>`);
				});
				_push(`<!--]--></div></div><div class="text-start" data-v-8b495c51><label class="block text-xs font-bold text-slate-600 mb-1.5" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Order ID (Optional)" : "رقم الطلب (اختياري لتوثيق الشراء)")}</label><input${ssrRenderAttr("value", reviewForm.value.order_id)} type="text"${ssrRenderAttr("placeholder", unref(layoutDirection) === "ltr" ? "e.g. 100408" : "مثال: 100408")} class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all placeholder:font-normal placeholder:text-slate-400 text-start" data-v-8b495c51></div><div class="text-start" data-v-8b495c51><label class="block text-xs font-bold text-slate-600 mb-1.5" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Detailed Review" : "التقييم التفصيلي")} <span class="text-rose-500" data-v-8b495c51>*</span></label><textarea rows="4"${ssrRenderAttr("placeholder", unref(layoutDirection) === "ltr" ? "Write your review here..." : "اكتب تجربتك الدقيقة مع هذا المنتج...")} class="w-full bg-slate-50/50 border border-slate-200 rounded-2xl p-3.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all resize-none placeholder:text-slate-400 text-start" data-v-8b495c51>${ssrInterpolate(reviewForm.value.comment)}</textarea></div><div class="text-start" data-v-8b495c51><label class="block text-xs font-bold text-slate-600 mb-1.5" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Attach Photos (Optional)" : "إرفاق صور للمنتج (اختياري)")}</label><input type="file" multiple accept="image/*" class="w-full text-xs text-slate-500 file:me-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100" data-v-8b495c51></div><div class="flex items-center justify-end gap-3 pt-2" data-v-8b495c51><button class="px-6 py-2.5 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors text-xs cursor-pointer" data-v-8b495c51>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Cancel" : "إلغاء")}</button><button${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="bg-[#0B0E28] text-amber-400 px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#151a42] transition-all shadow-lg shadow-[#0B0E28]/10 flex items-center gap-2 cursor-pointer disabled:opacity-50" data-v-8b495c51>`);
				if (isSubmitting.value) _push(`<span class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" data-v-8b495c51></span>`);
				else _push(`<!---->`);
				_push(`<span data-v-8b495c51>${ssrInterpolate(isSubmitting.value ? unref(layoutDirection) === "ltr" ? "Submitting..." : "جاري إرسال التقييم..." : unref(layoutDirection) === "ltr" ? "Submit Review" : "إرسال التقييم")}</span></button></div></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region components/product/details/ReviewModal.vue
var _sfc_setup$4 = ReviewModal_vue_vue_type_script_setup_true_lang_default.setup;
ReviewModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/ReviewModal.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var ReviewModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ReviewModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-8b495c51"]]), { __name: "ProductDetailsReviewModal" });
//#endregion
//#region components/product/details/ProductTabs.vue?vue&type=script&setup=true&lang.ts
var ProductTabs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductTabs",
	__ssrInlineRender: true,
	props: {
		product: {
			type: Object,
			required: true
		},
		reviews: {
			type: Array,
			default: () => []
		}
	},
	emits: ["reload-reviews"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { layoutDirection } = useLanguage();
		const tabs = computed(() => [
			{
				id: "desc",
				label: layoutDirection.value === "ltr" ? "Product Details" : "تفاصيل المنتج"
			},
			{
				id: "specs",
				label: layoutDirection.value === "ltr" ? "Technical Specifications" : "المواصفات الفنية"
			},
			{
				id: "reviews",
				label: layoutDirection.value === "ltr" ? "Reviews & Ratings" : "التقييمات والآراء"
			}
		]);
		const activeTab = ref("desc");
		const isReviewModalOpen = ref(false);
		const reviewsList = computed(() => {
			return props.reviews && props.reviews.length > 0 ? props.reviews : props.product.reviews || [];
		});
		const specificationsList = computed(() => {
			const specs = [];
			const p = props.product;
			if (!p) return specs;
			if (p.brand) specs.push({
				label: layoutDirection.value === "ltr" ? "Brand" : "الماركة / العلامة التجارية",
				value: typeof p.brand === "object" ? p.brand.name : p.brand
			});
			if (p.unit) specs.push({
				label: layoutDirection.value === "ltr" ? "Unit" : "الوحدة",
				value: p.unit
			});
			if (p.product_type) specs.push({
				label: layoutDirection.value === "ltr" ? "Product Type" : "نوع المنتج",
				value: p.product_type === "physical" ? layoutDirection.value === "ltr" ? "Physical Product" : "منتج مادي" : layoutDirection.value === "ltr" ? "Digital Product" : "منتج رقمي"
			});
			if (p.current_stock !== void 0) specs.push({
				label: layoutDirection.value === "ltr" ? "Available Stock" : "المخزون المتوفر",
				value: `${p.current_stock} ${layoutDirection.value === "ltr" ? "items" : "قطعة"}`
			});
			return specs;
		});
		const displayRating = computed(() => {
			if (reviewsList.value.length > 0) return (reviewsList.value.reduce((acc, r) => acc + Number(r.rating || 5), 0) / reviewsList.value.length).toFixed(1);
			const val = props.product.rating || props.product.reviews_avg_rating || props.product.average_rating || 5;
			return Number(val).toFixed(1);
		});
		const displayReviewsCount = computed(() => {
			return reviewsList.value.length || props.product.reviewCount || props.product.reviews_count || 0;
		});
		const ratingBreakdown = computed(() => {
			const counts = {
				5: 0,
				4: 0,
				3: 0,
				2: 0,
				1: 0
			};
			const total = reviewsList.value.length;
			if (total > 0) reviewsList.value.forEach((r) => {
				const star = Math.min(5, Math.max(1, Math.round(Number(r.rating || 5))));
				counts[star] = (counts[star] || 0) + 1;
			});
			return [
				5,
				4,
				3,
				2,
				1
			].map((star) => {
				const count = counts[star] || 0;
				return {
					star,
					count,
					percentage: total > 0 ? Math.round(count / total * 100) : star === 5 && total === 0 ? 100 : 0
				};
			});
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden",
				dir: unref(layoutDirection)
			}, _attrs))} data-v-33b0789d><div class="flex items-center overflow-x-auto no-scrollbar border-b border-slate-100 px-4 md:px-8" data-v-33b0789d><!--[-->`);
			ssrRenderList(tabs.value, (tab) => {
				_push(`<button class="${ssrRenderClass([activeTab.value === tab.id ? "text-[#0B0E28]" : "text-slate-400 hover:text-slate-600", "relative px-6 py-5 text-sm md:text-base font-bold whitespace-nowrap transition-colors cursor-pointer"])}" data-v-33b0789d>${ssrInterpolate(tab.label)} `);
				if (activeTab.value === tab.id) _push(`<span class="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t-full" data-v-33b0789d></span>`);
				else _push(`<!---->`);
				_push(`</button>`);
			});
			_push(`<!--]--></div><div class="p-6 md:p-8 lg:p-10 min-h-[300px]" data-v-33b0789d>`);
			if (activeTab.value === "desc") {
				_push(`<div class="prose prose-slate max-w-none text-slate-600 leading-loose" data-v-33b0789d>`);
				if (__props.product.details || __props.product.description) _push(`<div class="rich-html-content space-y-4 text-slate-700 font-medium text-start" data-v-33b0789d>${(__props.product.details || __props.product.description) ?? ""}</div>`);
				else _push(`<div class="text-slate-400 font-bold text-sm text-center py-6" data-v-33b0789d>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "No detailed description available for this product." : "لا يوجد وصف تفصيلي متوفر لهذا المنتج.")}</div>`);
				_push(`</div>`);
			} else if (activeTab.value === "specs") {
				_push(`<div class="max-w-7xl mx-auto" data-v-33b0789d>`);
				if (specificationsList.value.length > 0) {
					_push(`<div class="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm" data-v-33b0789d><!--[-->`);
					ssrRenderList(specificationsList.value, (spec, index) => {
						_push(`<div class="flex flex-col sm:flex-row border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors" data-v-33b0789d><div class="bg-slate-50/50 sm:w-1/3 p-4 text-sm font-bold text-[#0B0E28] border-b sm:border-b-0 sm:border-s border-slate-100 text-start" data-v-33b0789d>${ssrInterpolate(spec.label)}</div><div class="p-4 text-sm text-slate-600 sm:w-2/3 font-medium text-start" data-v-33b0789d>${ssrInterpolate(spec.value)}</div></div>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<div class="bg-slate-50 p-8 rounded-2xl text-center text-slate-500 font-bold text-sm" data-v-33b0789d>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "No additional specifications available for this product." : "لا توجد مواصفات إضافية لهذا المنتج حالياً.")}</div>`);
				_push(`</div>`);
			} else if (activeTab.value === "reviews") {
				_push(`<div class="max-w-7xl mx-auto space-y-6" data-v-33b0789d><div class="flex flex-col md:flex-row items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-8" data-v-33b0789d><div class="text-center shrink-0" data-v-33b0789d><span class="text-5xl font-black text-[#0B0E28]" data-v-33b0789d>${ssrInterpolate(displayRating.value)}</span><div class="flex items-center justify-center gap-1 my-2" data-v-33b0789d><!--[-->`);
				ssrRenderList(5, (i) => {
					_push(`<svg class="${ssrRenderClass([i <= Math.round(Number(displayRating.value)) ? "text-amber-500" : "text-slate-300", "w-5 h-5"])}" viewBox="0 0 24 24" fill="currentColor" data-v-33b0789d><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" data-v-33b0789d></path></svg>`);
				});
				_push(`<!--]--></div><span class="text-sm text-slate-500 font-medium" data-v-33b0789d>${ssrInterpolate(unref(layoutDirection) === "ltr" ? `Based on ${displayReviewsCount.value} reviews` : `بناءً على ${displayReviewsCount.value} تقييم`)}</span></div><div class="w-full flex-1 space-y-2" data-v-33b0789d><!--[-->`);
				ssrRenderList(ratingBreakdown.value, (item) => {
					_push(`<div class="flex items-center gap-3" data-v-33b0789d><span class="text-xs font-bold w-3 text-slate-600" data-v-33b0789d>${ssrInterpolate(item.star)}</span><svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="currentColor" data-v-33b0789d><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-v-33b0789d></path></svg><div class="flex-1 h-2.5 bg-slate-200/80 rounded-full overflow-hidden" data-v-33b0789d><div class="h-full bg-amber-500 transition-all duration-500 rounded-full" style="${ssrRenderStyle(`width: ${item.percentage}%`)}" data-v-33b0789d></div></div><span class="text-[11px] font-bold text-slate-400 min-w-[28px] text-end" data-v-33b0789d>${ssrInterpolate(item.percentage)}%</span></div>`);
				});
				_push(`<!--]--></div><button class="md:w-auto px-6 py-3 rounded-xl bg-[#0B0E28] text-amber-400 font-bold text-sm hover:bg-[#151a42] transition-colors shrink-0 cursor-pointer shadow-md" data-v-33b0789d>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Add Your Review" : "أضف تقييمك")}</button></div>`);
				if (reviewsList.value.length > 0) {
					_push(`<div class="space-y-4" data-v-33b0789d><!--[-->`);
					ssrRenderList(reviewsList.value, (review, index) => {
						_push(`<div class="bg-white border border-slate-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow" data-v-33b0789d><div class="flex justify-between items-start mb-3" data-v-33b0789d><div class="flex items-center gap-3" data-v-33b0789d><div class="w-10 h-10 rounded-full bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center text-base" data-v-33b0789d>${ssrInterpolate(review.author ? review.author.charAt(0) : "U")}</div><div class="text-start" data-v-33b0789d><h5 class="font-bold text-[#0B0E28] text-sm" data-v-33b0789d>${ssrInterpolate(review.author || (unref(layoutDirection) === "ltr" ? "Verified Customer" : "عميل موثوق"))}</h5><span class="text-xs text-slate-400" data-v-33b0789d>${ssrInterpolate(review.date || (unref(layoutDirection) === "ltr" ? "Recently" : "مؤخراً"))}</span></div></div><div class="flex items-center gap-3" data-v-33b0789d><div class="flex gap-0.5" data-v-33b0789d><!--[-->`);
						ssrRenderList(5, (i) => {
							_push(`<svg class="${ssrRenderClass([i <= (review.rating || 5) ? "text-amber-500" : "text-slate-200", "w-3.5 h-3.5"])}" viewBox="0 0 24 24" fill="currentColor" data-v-33b0789d><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" data-v-33b0789d></path></svg>`);
						});
						_push(`<!--]--></div>`);
						if (review.id) _push(`<button class="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-500 transition-colors bg-slate-50 px-2 py-1 rounded-lg border border-slate-200 cursor-pointer"${ssrRenderAttr("title", unref(layoutDirection) === "ltr" ? "Like review" : "أعجبني هذا التقييم")} data-v-33b0789d><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-33b0789d><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" data-v-33b0789d></path></svg><span data-v-33b0789d>${ssrInterpolate(review.likes_count || 0)}</span></button>`);
						else _push(`<!---->`);
						_push(`</div></div><p class="text-sm text-slate-600 leading-relaxed text-start" data-v-33b0789d>${ssrInterpolate(review.comment || review.details || (unref(layoutDirection) === "ltr" ? "Excellent product, fast delivery and great quality!" : "منتج ممتاز ورائع، التوصيل سريع جداً والخامة ممتازة."))}</p></div>`);
					});
					_push(`<!--]--></div>`);
				} else _push(`<div class="text-center py-8 text-slate-400 font-bold text-sm bg-slate-50 rounded-2xl border border-dashed border-slate-200" data-v-33b0789d>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "No written reviews for this product yet. Be the first to leave a review!" : "لا توجد تقييمات مكتوبة لهذا المنتج بعد. كن أول من يضيف تقييماً!")}</div>`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(ReviewModal_default, {
				isOpen: isReviewModalOpen.value,
				productId: __props.product?.id,
				onClose: ($event) => isReviewModalOpen.value = false,
				onSubmitted: ($event) => _ctx.$emit("reload-reviews")
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/product/details/ProductTabs.vue
var _sfc_setup$3 = ProductTabs_vue_vue_type_script_setup_true_lang_default.setup;
ProductTabs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/ProductTabs.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ProductTabs_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ProductTabs_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-33b0789d"]]), { __name: "ProductDetailsProductTabs" });
//#endregion
//#region components/product/details/StickyMobileBuyBar.vue
var _sfc_main$1 = {
	__name: "ProductDetailsStickyMobileBuyBar",
	__ssrInlineRender: true,
	props: { product: {
		type: Object,
		required: true
	} },
	setup(__props) {
		useCart();
		const isVisible = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			if (isVisible.value) _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 left-0 right-0 z-[60] bg-white border-t border-slate-100 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-4 pb-safe flex items-center gap-4 md:hidden" }, _attrs))}><div class="flex-1 min-w-0"><h4 class="text-xs font-bold text-slate-500 truncate mb-0.5">${ssrInterpolate(__props.product.title)}</h4><div class="text-lg font-black text-[#0B0E28] leading-none">${ssrInterpolate(__props.product.formattedPrice)}</div></div><button class="shrink-0 bg-amber-500 text-slate-900 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/30 hover:bg-amber-400 active:scale-95 transition-all flex items-center justify-center gap-2"><svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg> إضافة للسلة </button></div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$2 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/StickyMobileBuyBar.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
//#endregion
//#region components/product/details/LiveSocialProof.vue
var _sfc_main = {
	__name: "ProductDetailsLiveSocialProof",
	__ssrInlineRender: true,
	props: { productTitle: {
		type: String,
		required: true
	} },
	setup(__props) {
		const isVisible = ref(false);
		const buyerName = ref("");
		const buyerCity = ref("");
		const timeAgo = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			if (isVisible.value) _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 bg-white rounded-2xl shadow-[0_10px_40px_rgba(11,14,40,0.12)] border border-slate-100 p-4 flex items-center gap-4 max-w-[320px] md:max-w-[380px] cursor-pointer hover:-translate-y-1 transition-transform" }, _attrs))} data-v-720e6233><div class="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0" data-v-720e6233><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-720e6233><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" data-v-720e6233></path><polyline points="22 4 12 14.01 9 11.01" data-v-720e6233></polyline></svg></div><div class="flex-1 min-w-0" data-v-720e6233><p class="text-xs text-slate-500 mb-1" data-v-720e6233><span class="font-bold text-[#0B0E28]" data-v-720e6233>${ssrInterpolate(buyerName.value)}</span> من ${ssrInterpolate(buyerCity.value)}</p><p class="text-sm font-bold text-[#0B0E28] line-clamp-2 leading-snug" data-v-720e6233> قام بشراء ${ssrInterpolate(__props.productTitle)} للتو! </p><p class="text-[10px] text-slate-400 mt-1" data-v-720e6233>${ssrInterpolate(timeAgo.value)}</p></div><button class="absolute top-2 right-2 text-slate-400 hover:text-slate-600" data-v-720e6233><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-720e6233><line x1="18" y1="6" x2="6" y2="18" data-v-720e6233></line><line x1="6" y1="6" x2="18" y2="18" data-v-720e6233></line></svg></button></div>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/details/LiveSocialProof.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var LiveSocialProof_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-720e6233"]]);
//#endregion
//#region pages/product/[slug].vue?vue&type=script&setup=true&lang.ts
var _slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { t, layoutDirection, currentLanguage, apiLocale } = useLanguage();
		const { currentProduct, productReviews, pending, error, loadProductBySlug, loadProductReviews, products: allProducts, loadProducts } = useProducts();
		const product = computed(() => currentProduct.value);
		const relatedProducts = computed(() => allProducts.value.filter((p) => String(p.id) !== String(product.value?.id)).slice(0, 4));
		const productSlug = computed(() => String(route.params.slug || route.params.id || ""));
		const displayProductTitle = computed(() => {
			if (!product.value) return t("common.loading");
			if (layoutDirection.value === "ltr") return product.value.name_en || product.value.title_en || product.value.en_name || product.value.title || product.value.name;
			return product.value.title || product.value.name;
		});
		const fetchProductDetails = async () => {
			if (!productSlug.value) return;
			await loadProductBySlug(productSlug.value);
			loadProducts({
				limit: 6,
				locale: apiLocale.value
			});
		};
		watch([
			apiLocale,
			currentLanguage,
			productSlug
		], () => {
			fetchProductDetails();
		});
		useHead$1({ title: computed(() => product.value ? `${displayProductTitle.value} | ${layoutDirection.value === "ltr" ? "Aswar Jeddah" : "أسوار جدة"}` : layoutDirection.value === "ltr" ? "Product Details" : "تفاصيل المنتج") });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-slate-50/50 min-h-screen pb-24 md:pb-16 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}>`);
			if (unref(pending)) _push(ssrRenderComponent(ProductDetailsSkeleton_default, null, null, _parent));
			else if (unref(error) || !product.value) {
				_push(`<div class="container mx-auto px-4 max-w-xl pt-16 text-center space-y-4"><div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto text-2xl"><i class="fa-solid fa-triangle-exclamation"></i></div><h2 class="text-xl font-bold text-slate-800">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Product Currently Unavailable" : "المنتج غير متاح حالياً")}</h2><p class="text-xs text-slate-500">${ssrInterpolate(unref(error) || (unref(layoutDirection) === "ltr" ? "Could not access product details." : "لم نتمكن من الوصول لتفاصيل هذا المنتج."))}</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/shop",
					class: "inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl shadow-sm hover:bg-[#151a42] transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("cart.back_to_shop"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("cart.back_to_shop")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div><div class="container mx-auto px-4 max-w-7xl pt-4">`);
				_push(ssrRenderComponent(Breadcrumbs_default, { items: [
					{
						label: unref(t)("nav.home"),
						to: "/"
					},
					{
						label: unref(t)("nav.shop"),
						to: "/shop"
					},
					{
						label: product.value?.category || unref(t)("nav.categories"),
						to: "/shop"
					},
					{ label: displayProductTitle.value }
				] }, null, _parent));
				_push(`</div><div class="w-full px-4 sm:px-6 lg:px-8 max-w-[70rem] mx-auto mt-8 mb-16"><div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start bg-white rounded-3xl shadow-sm border border-slate-100 p-4 lg:p-8"><div class="min-w-0">`);
				_push(ssrRenderComponent(ProductGallery_default, {
					images: product.value.images || [product.value.thumbnail],
					brand: product.value.brand,
					"discount-badge": product.value.discountBadge
				}, null, _parent));
				_push(`</div><div class="min-w-0">`);
				_push(ssrRenderComponent(ProductInfo_default, { product: product.value }, null, _parent));
				_push(`</div></div></div><div class="container mx-auto px-4 max-w-7xl mb-16">`);
				_push(ssrRenderComponent(ProductTabs_default, {
					product: product.value,
					reviews: unref(productReviews),
					onReloadReviews: ($event) => product.value?.id && unref(loadProductReviews)(product.value.id)
				}, null, _parent));
				_push(`</div>`);
				if (relatedProducts.value.length > 0) {
					_push(`<div class="container mx-auto px-4 max-w-7xl mb-16 pt-8"><div class="flex items-center justify-between mb-8"><h2 class="text-2xl font-black text-[#0B0E28]">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Related Products" : "منتجات ذات صلة")}</h2>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/shop",
						class: "text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>${ssrInterpolate(unref(t)("common.view_all"))}</span><svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><polyline points="9 18 15 12 9 6"${_scopeId}></polyline></svg>`);
							else return [createVNode("span", null, toDisplayString(unref(t)("common.view_all")), 1), (openBlock(), createBlock("svg", {
								class: "w-4 h-4 rtl:-scale-x-100",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2.5",
								"stroke-linecap": "round",
								"stroke-linejoin": "round"
							}, [createVNode("polyline", { points: "9 18 15 12 9 6" })]))];
						}),
						_: 1
					}, _parent));
					_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"><!--[-->`);
					ssrRenderList(relatedProducts.value, (relProduct) => {
						_push(ssrRenderComponent(ProductCard_default, {
							key: relProduct.id,
							product: relProduct
						}, null, _parent));
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(ssrRenderComponent(_sfc_main$1, { product: product.value }, null, _parent));
				_push(ssrRenderComponent(LiveSocialProof_default, { "product-title": displayProductTitle.value }, null, _parent));
				_push(`</div>`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/product/[slug].vue
var _slug__exports = /* @__PURE__ */ __exportAll({ default: () => _slug__default });
var _sfc_setup = _slug__vue_vue_type_script_setup_true_lang_default.setup;
_slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _slug__default = _slug__vue_vue_type_script_setup_true_lang_default;

export { _slug__exports as n, _slug__default as t };
//# sourceMappingURL=_slug_-uW1KYjcW.mjs.map
