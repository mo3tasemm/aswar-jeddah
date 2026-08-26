import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { u as useCompare } from './useCompare-BYK443T-.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
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

//#region pages/my-account/compare.vue?vue&type=script&setup=true&lang.ts
var compare_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "compare",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, formatCurrency, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.compare")} | أسوار جدة`) });
		const { compareList} = useCompare();
		useCart();
		const productRatingsMap = ref({});
		const getProductName = (item) => {
			if (!item) return "";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			if (layoutDirection.value === "ltr") return prod.title_en || prod.name_en || prod.en_name || prod.title || prod.name || "Featured Product";
			return prod.title || prod.name || prod.name_ar || "منتج أسوار جدة";
		};
		const getProductImage = (item) => {
			if (!item) return "/images/placeholder.png";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			const imgPath = prod.thumbnail || prod.image || prod.images?.[0];
			if (!imgPath) return "/images/placeholder.png";
			let str = typeof imgPath === "object" ? imgPath.path || "" : String(imgPath);
			if (!str) return "/images/placeholder.png";
			if (str.startsWith("http://") || str.startsWith("https://")) return str;
			return `https://wedgetstore.com/${str.replace(/^\/+/, "")}`;
		};
		const getProductPrice = (item) => {
			if (!item) return formatCurrency(0);
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			const price = prod.price || prod.unit_price || 0;
			return formatCurrency(price);
		};
		const isProductAvailable = (item) => {
			if (!item) return false;
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			return prod.inStock ?? (prod.stockCount > 0 || (prod.current_stock ?? 1) > 0);
		};
		const getProductCategory = (item) => {
			if (!item) return "";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			if (typeof prod.category === "string" && prod.category.trim() !== "") return prod.category;
			if (typeof prod.brand === "object" && prod.brand?.name) return prod.brand.name;
			if (prod.brandName) return prod.brandName;
			return layoutDirection.value === "ltr" ? "Home Appliances" : "الأجهزة المنزلية";
		};
		const getProductSKU = (item) => {
			if (!item) return "N/A";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			return prod.sku || (prod.id ? `#${prod.id}` : "ASWAR-SKU");
		};
		const getProductSummary = (item) => {
			if (!item) return "";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			const clean = (prod.description || prod.details || "").replace(/<[^>]*>?/gm, "").trim();
			if (clean) return clean.length > 80 ? clean.substring(0, 80) + "..." : clean;
			return layoutDirection.value === "ltr" ? "High quality appliance with original warranty" : "أجهزة ذات جودة عالية وضمان أصلي";
		};
		const getProductRating = (item) => {
			if (!item) return "4.8";
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			const rawId = String(prod.id || item.id || "");
			if (rawId && productRatingsMap.value[rawId]?.rating) return productRatingsMap.value[rawId].rating;
			return prod.rating ? Number(prod.rating).toFixed(1) : "4.8";
		};
		const getProductReviewsCount = (item) => {
			if (!item) return 18;
			const prod = item?.product || item?.product_details || item?.product_all_status || item || {};
			const rawId = String(prod.id || item.id || "");
			if (rawId && productRatingsMap.value[rawId]?.count !== void 0) return productRatingsMap.value[rawId].count;
			return prod.reviewCount || 18;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "account-compare-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			_push(ssrRenderComponent(Breadcrumbs_default, null, null, _parent));
			_push(`<div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200"><div><div class="flex items-center gap-3 mb-1"><h1 class="text-2xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("account.compare"))}</h1><span class="bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">${ssrInterpolate(unref(compareList).length)} ${ssrInterpolate(unref(t)("order.items_count"))}</span></div><p class="text-sm text-slate-500">${ssrInterpolate(unref(t)("compare.subtitle"))}</p></div>`);
			if (unref(compareList).length > 0) _push(`<button class="px-4 py-2.5 bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs rounded-xl border border-rose-200 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg><span>${ssrInterpolate(unref(t)("compare.clear_all"))}</span></button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(compareList).length === 0) {
				_push(`<div class="bg-white rounded-3xl border border-slate-100 p-12 text-center shadow-sm max-w-xl mx-auto my-6 space-y-6"><div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner"><svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg></div><div class="space-y-2"><h3 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("compare.empty_title"))}</h3><p class="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">${ssrInterpolate(unref(t)("compare.empty_desc"))}</p></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/shop",
					class: "inline-flex items-center gap-2 px-8 py-3.5 bg-[#0B0E28] text-amber-400 font-bold text-xs sm:text-sm rounded-2xl shadow-lg transition-all hover:bg-[#151a42]"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("cart.back_to_shop"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("cart.back_to_shop")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="bg-white rounded-3xl border border-slate-100/80 shadow-sm overflow-hidden"><div class="overflow-x-auto"><table class="w-full text-start border-collapse min-w-[700px]"><thead><tr class="bg-slate-50 border-b border-slate-100"><th class="p-6 text-start text-xs font-black text-slate-500 uppercase tracking-wider w-48 bg-slate-100/60 sticky start-0 z-10">${ssrInterpolate(unref(t)("compare.features"))}</th><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<th class="p-6 text-center w-72 min-w-[260px] relative border-s border-slate-100"><button class="absolute top-3 end-3 p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("common.delete"))}><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button><div class="w-32 h-32 mx-auto mb-4 flex items-center justify-center p-2 rounded-2xl bg-slate-50 border border-slate-100"><img${ssrRenderAttr("src", getProductImage(item))}${ssrRenderAttr("alt", getProductName(item))} class="max-h-full max-w-full object-contain"></div><h3 class="font-bold text-sm text-[#0B0E28] line-clamp-2 mb-3 px-2">${ssrInterpolate(getProductName(item))}</h3><div class="text-lg font-black text-[#0B0E28] mb-4">${ssrInterpolate(getProductPrice(item))}</div><button class="w-full py-2.5 bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span>${ssrInterpolate(unref(t)("product.add_to_cart"))}</span></button></th>`);
				});
				_push(`<!--]--></tr></thead><tbody class="divide-y divide-slate-100 text-sm"><tr><td class="p-5 font-bold text-slate-700 bg-slate-50/60 sticky start-0 z-10 border-b border-slate-100 text-start">${ssrInterpolate(unref(t)("compare.rating"))}</td><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<td class="p-5 text-center border-s border-slate-100"><div class="flex items-center justify-center gap-1"><svg class="w-4 h-4 fill-amber-400 text-amber-400" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg><span class="font-bold text-[#0B0E28] text-xs">${ssrInterpolate(getProductRating(item))}</span><span class="text-slate-400 text-[11px]">(${ssrInterpolate(getProductReviewsCount(item))})</span></div></td>`);
				});
				_push(`<!--]--></tr><tr><td class="p-5 font-bold text-slate-700 bg-slate-50/60 sticky start-0 z-10 border-b border-slate-100 text-start">${ssrInterpolate(unref(t)("compare.availability"))}</td><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<td class="p-5 text-center border-s border-slate-100"><span class="${ssrRenderClass([isProductAvailable(item) ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600", "px-3 py-1 rounded-full text-xs font-bold"])}">${ssrInterpolate(isProductAvailable(item) ? unref(t)("product.in_stock") : unref(t)("product.out_of_stock"))}</span></td>`);
				});
				_push(`<!--]--></tr><tr><td class="p-5 font-bold text-slate-700 bg-slate-50/60 sticky start-0 z-10 border-b border-slate-100 text-start">${ssrInterpolate(unref(t)("compare.category"))}</td><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<td class="p-5 text-center text-slate-600 border-s border-slate-100">${ssrInterpolate(getProductCategory(item))}</td>`);
				});
				_push(`<!--]--></tr><tr><td class="p-5 font-bold text-slate-700 bg-slate-50/60 sticky start-0 z-10 border-b border-slate-100 text-start">${ssrInterpolate(unref(t)("product.sku"))}</td><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<td class="p-5 text-center font-mono text-xs text-slate-500 border-s border-slate-100">${ssrInterpolate(getProductSKU(item))}</td>`);
				});
				_push(`<!--]--></tr><tr><td class="p-5 font-bold text-slate-700 bg-slate-50/60 sticky start-0 z-10 border-b border-slate-100 text-start">${ssrInterpolate(unref(t)("compare.features"))}</td><!--[-->`);
				ssrRenderList(unref(compareList), (item) => {
					_push(`<td class="p-5 text-center text-xs text-slate-500 leading-relaxed border-s border-slate-100">${ssrInterpolate(getProductSummary(item))}</td>`);
				});
				_push(`<!--]--></tr></tbody></table></div></div>`);
			}
			_push(`</main></div></div><section class="w-full bg-white border-t border-slate-200 mt-12">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section><section class="w-full bg-[#F8F9FA]">`);
			_push(ssrRenderComponent(StoreLocationShowcase_default, null, null, _parent));
			_push(`</section></div>`);
		};
	}
});
//#endregion
//#region pages/my-account/compare.vue
var _sfc_setup = compare_vue_vue_type_script_setup_true_lang_default.setup;
compare_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/compare.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var compare_default = compare_vue_vue_type_script_setup_true_lang_default;

export { compare_default as default };
//# sourceMappingURL=compare-lHdnyQab.mjs.map
