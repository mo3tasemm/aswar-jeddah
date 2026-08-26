import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { u as useWishlist } from './useWishlist-BWj6pk_8.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import './useCompare-BYK443T-.mjs';
import './useAuth-IbNI92RZ.mjs';

//#region pages/my-account/wishlist/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.wishlist")} | أسوار جدة`) });
		const { wishlist, wishlistItems, wishlistPending} = useWishlist();
		useCart();
		const safeWishlist = computed(() => {
			return wishlist?.value || wishlistItems?.value || [];
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "account-wishlist-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			_push(ssrRenderComponent(Breadcrumbs_default, null, null, _parent));
			_push(`<div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200"><div><div class="flex items-center gap-3 mb-1"><h1 class="text-2xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("account.wishlist"))}</h1><span class="bg-amber-100 text-amber-600 text-xs font-bold px-3 py-1 rounded-full">${ssrInterpolate(safeWishlist.value.length)} ${ssrInterpolate(unref(t)("order.items_count"))}</span></div><p class="text-sm text-slate-500">${ssrInterpolate(unref(t)("wishlist.subtitle"))}</p></div>`);
			if (safeWishlist.value.length > 0) _push(`<div class="flex flex-wrap items-center gap-3 shrink-0"><button class="px-5 py-2.5 rounded-xl text-sm font-bold bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-colors flex items-center justify-center gap-2 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg><span>${ssrInterpolate(unref(t)("wishlist.clear_all"))}</span></button><button class="px-5 py-2.5 rounded-xl text-sm font-bold bg-amber-400 text-[#0B0E28] hover:bg-amber-500 transition-colors shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg><span>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Add All to Cart" : "إضافة الكل للسلة")}</span></button></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (unref(wishlistPending)) _push(`<div class="py-12 text-center space-y-4"><div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div><p class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("common.loading"))}</p></div>`);
			else if (safeWishlist.value.length === 0) {
				_push(`<div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center justify-center"><div class="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6"><svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></div><h3 class="text-xl font-bold text-[#0B0E28] mb-2">${ssrInterpolate(unref(t)("wishlist.empty_title"))}</h3><p class="text-slate-500 max-w-sm mx-auto mb-8 text-sm">${ssrInterpolate(unref(t)("wishlist.empty_desc"))}</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/shop",
					class: "px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(unref(t)("cart.back_to_shop"))}`);
						else return [createTextVNode(toDisplayString(unref(t)("cart.back_to_shop")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
				ssrRenderList(safeWishlist.value, (product) => {
					_push(ssrRenderComponent(ProductCard_default, {
						key: product.id,
						product
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
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
//#region pages/my-account/wishlist/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/wishlist/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var wishlist_default = index_vue_vue_type_script_setup_true_lang_default;

export { wishlist_default as default };
//# sourceMappingURL=wishlist-azJuf0O7.mjs.map
