import { N as NuxtLink, _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region components/ui/CartPageSkeleton.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse space-y-6" }, _attrs))}><div class="h-8 bg-slate-200 rounded-xl w-48"></div><div class="grid grid-cols-1 lg:grid-cols-12 gap-8"><div class="lg:col-span-8 space-y-4"><!--[-->`);
	ssrRenderList(3, (i) => {
		_push(`<div class="p-4 bg-white rounded-2xl border border-slate-100 flex items-center gap-4"><div class="w-20 h-20 bg-slate-100 rounded-xl shrink-0"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-200 rounded-md w-3/4"></div><div class="h-4 bg-amber-100 rounded-md w-24"></div></div><div class="w-24 h-9 bg-slate-100 rounded-xl shrink-0"></div></div>`);
	});
	_push(`<!--]--></div><div class="lg:col-span-4 p-6 bg-white rounded-3xl border border-slate-100 space-y-4"><div class="h-6 bg-slate-200 rounded-lg w-32"></div><div class="space-y-3 pt-2"><div class="flex justify-between"><div class="h-4 bg-slate-100 rounded w-20"></div><div class="h-4 bg-slate-100 rounded w-16"></div></div><div class="flex justify-between"><div class="h-4 bg-slate-100 rounded w-24"></div><div class="h-4 bg-slate-100 rounded w-16"></div></div><div class="flex justify-between border-t pt-2"><div class="h-5 bg-slate-200 rounded w-20"></div><div class="h-5 bg-amber-200 rounded w-20"></div></div></div><div class="h-12 bg-amber-400/50 rounded-2xl w-full"></div></div></div></div>`);
}
var _sfc_setup$1 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/CartPageSkeleton.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var CartPageSkeleton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "UiCartPageSkeleton" });
//#endregion
//#region pages/cart/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, formatCurrency, layoutDirection } = useLanguage();
		const { cart, cartCount, formattedCartTotal, isLoading } = useCart();
		const breadcrumbItems = computed(() => [{
			label: layoutDirection.value === "ltr" ? "Home" : "الرئيسية",
			to: "/"
		}, { label: t("nav.cart") }]);
		const getItemTitle = (item) => {
			const p = item?.product || {};
			if (layoutDirection.value === "ltr") return p.name_en || p.title_en || p.title || p.name || "Product";
			return p.title || p.name || p.name_ar || "منتج";
		};
		const getItemImage = (item) => {
			const p = item?.product || {};
			const img = p.images?.[0] || p.image || p.thumbnail;
			if (img && typeof img === "string") return img;
			return "/images/placeholder.png";
		};
		useHead$1({ title: computed(() => `${t("cart.title")} | ${layoutDirection.value === "ltr" ? "Aswar Jeddah" : "أسوار جدة"}`) });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "cart-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			if (unref(isLoading)) _push(ssrRenderComponent(CartPageSkeleton_default, null, null, _parent));
			else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(Breadcrumbs_default, { items: breadcrumbItems.value }, null, _parent));
				_push(`<div class="flex items-center justify-between mb-8 mt-4"><div class="flex items-center gap-3"><h1 class="text-2xl lg:text-3xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("cart.title"))}</h1>`);
				if (unref(cart).length > 0) _push(`<span class="bg-amber-100 text-amber-600 text-sm font-bold px-3 py-1 rounded-full">${ssrInterpolate(unref(cartCount))} ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Items" : "منتجات")}</span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (unref(cart).length > 0) _push(`<button class="text-xs font-bold text-slate-400 hover:text-rose-500 transition-colors flex items-center gap-1.5 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg> ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Clear Cart" : "تفريغ السلة")}</button>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (unref(cart).length > 0) {
					_push(`<div class="flex flex-col md:flex-row gap-8 items-start"><main class="w-full md:w-3/5 lg:w-2/3 xl:w-3/4 space-y-6"><div class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"><div class="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-slate-100 bg-slate-50 text-xs font-bold text-slate-500 text-start"><div class="col-span-5 lg:col-span-6">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Product" : "المنتج")}</div><div class="col-span-2 text-center">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Price" : "السعر")}</div><div class="col-span-3 text-center">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Quantity" : "الكمية")}</div><div class="col-span-2 text-end">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Total" : "المجموع")}</div></div><div class="divide-y divide-slate-100"><!--[-->`);
					ssrRenderList(unref(cart), (item) => {
						_push(`<div class="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center"><div class="md:col-span-5 lg:col-span-6 flex items-center gap-4 text-start"><button class="md:hidden w-8 h-8 shrink-0 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("common.delete"))}><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/product/${item.product?.slug || item.product?.id}`,
							class: "w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-xl overflow-hidden shrink-0 border border-slate-100 group"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<img${ssrRenderAttr("src", getItemImage(item))}${ssrRenderAttr("alt", getItemTitle(item))} class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"${_scopeId}>`);
								else return [createVNode("img", {
									src: getItemImage(item),
									alt: getItemTitle(item),
									class: "w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
								}, null, 8, ["src", "alt"])];
							}),
							_: 2
						}, _parent));
						_push(`<div class="min-w-0 flex-1"><h3 class="text-sm font-bold text-[#0B0E28] leading-snug line-clamp-2 hover:text-amber-500 transition-colors">`);
						_push(ssrRenderComponent(_component_NuxtLink, { to: `/product/${item.product?.slug || item.product?.id}` }, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(getItemTitle(item))}`);
								else return [createTextVNode(toDisplayString(getItemTitle(item)), 1)];
							}),
							_: 2
						}, _parent));
						_push(`</h3>`);
						if (item.selectedSize || item.selectedColor) _push(`<span class="text-[10px] text-slate-400 mt-1 block">${ssrInterpolate(item.selectedSize)} ${ssrInterpolate(item.selectedColor)}</span>`);
						else _push(`<!---->`);
						_push(`</div></div><div class="hidden md:block col-span-2 text-center text-sm font-bold text-slate-600">${ssrInterpolate(unref(formatCurrency)(item.product?.price || 0))}</div><div class="col-span-1 md:col-span-3 flex items-center justify-between md:justify-center mt-2 md:mt-0"><div class="md:hidden text-sm font-bold text-slate-600">${ssrInterpolate(unref(formatCurrency)(item.product?.price || 0))}</div><div class="flex items-center bg-white border border-slate-200 rounded-lg p-1" dir="ltr"><button${ssrIncludeBooleanAttr(item.quantity <= 1) ? " disabled" : ""} class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button><span class="w-10 text-center text-sm font-bold text-[#0B0E28]">${ssrInterpolate(item.quantity)}</span><button class="w-7 h-7 flex items-center justify-center rounded text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors cursor-pointer"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button></div></div><div class="col-span-1 md:col-span-2 flex items-center justify-between md:justify-end gap-2 mt-2 md:mt-0 text-end"><div class="text-sm font-black text-amber-500">${ssrInterpolate(unref(formatCurrency)((item.product?.price || 0) * (item.quantity || 1)))}</div><button class="hidden md:flex w-8 h-8 shrink-0 items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors ms-2 cursor-pointer"${ssrRenderAttr("title", unref(t)("common.delete"))}><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div></div>`);
					});
					_push(`<!--]--></div></div></main><aside class="w-full md:w-2/5 lg:w-1/3 xl:w-1/4"><div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100/60 sticky top-24 text-start"><h3 class="text-lg font-black text-[#0B0E28] mb-6 pb-4 border-b border-slate-100">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Order Summary" : "إجمالي السلة")}</h3><div class="space-y-4 text-sm font-bold mb-6"><div class="flex items-center justify-between text-slate-600"><span>${ssrInterpolate(unref(t)("cart.subtotal"))}</span><span class="text-[#0B0E28]">${ssrInterpolate(unref(formattedCartTotal))}</span></div><div class="text-xs text-slate-400 font-normal">${ssrInterpolate(unref(t)("cart.taxes_note"))}</div></div><div class="flex items-end justify-between pt-5 border-t border-slate-100 mb-6"><span class="text-base font-black text-[#0B0E28]">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Total" : "الإجمالي")}</span><span class="text-2xl font-black text-amber-500">${ssrInterpolate(unref(formattedCartTotal))}</span></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/checkout",
						class: "w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-white hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(t)("cart.checkout_btn"))}`);
							else return [createTextVNode(toDisplayString(unref(t)("cart.checkout_btn")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`<div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div><span class="text-[10px] font-bold text-slate-600 leading-tight">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "100% Secure Payment" : "دفع إلكتروني آمن 100%")}</span></div><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><span class="text-[10px] font-bold text-slate-600 leading-tight">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Certified Warranty" : "ضمان أصلي معتمد")}</span></div></div></div></aside></div>`);
				} else {
					_push(`<div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center"><div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300"><svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><h3 class="text-xl font-bold text-[#0B0E28] mb-2">${ssrInterpolate(unref(t)("cart.empty_title"))}</h3><p class="text-slate-500 max-w-sm mx-auto mb-8">${ssrInterpolate(unref(t)("cart.empty_desc"))}</p>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/shop",
						class: "px-8 py-3.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-lg shadow-amber-400/20"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(t)("cart.back_to_shop"))}`);
							else return [createTextVNode(toDisplayString(unref(t)("cart.back_to_shop")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div>`);
				}
				_push(`<!--]-->`);
			}
			_push(`</div><section class="w-full bg-white border-t border-slate-200 mt-20">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section></div>`);
		};
	}
});
//#endregion
//#region pages/cart/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var cart_default = index_vue_vue_type_script_setup_true_lang_default;

export { cart_default as default };
//# sourceMappingURL=cart-Db325QEW.mjs.map
