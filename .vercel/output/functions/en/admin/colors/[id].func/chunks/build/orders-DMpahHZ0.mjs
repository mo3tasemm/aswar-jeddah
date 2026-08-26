import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { O as OrdersTable_default, a as OrderDetailsModal_default } from './OrderDetailsModal-Bfx3nXzv.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
import './useCart-CqauBZhc.mjs';
import './orderApiService-BPbSmUjB.mjs';

//#region pages/my-account/orders/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.orders")} | أسوار جدة`) });
		const pending = ref(true);
		const ordersList = ref([]);
		const isOrderModalOpen = ref(false);
		const activeOrderData = ref(null);
		const activeFilter = ref("all");
		const filters = computed(() => [
			{
				label: t("common.view_all"),
				value: "all"
			},
			{
				label: t("orders.processing"),
				value: "processing"
			},
			{
				label: t("orders.completed"),
				value: "completed"
			},
			{
				label: t("orders.cancelled"),
				value: "cancelled"
			}
		]);
		const filteredOrders = computed(() => {
			if (activeFilter.value === "all") return ordersList.value;
			return ordersList.value.filter((o) => o.status === activeFilter.value);
		});
		const openOrderDetails = (order) => {
			activeOrderData.value = order.rawItem || order;
			isOrderModalOpen.value = true;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-[#f8fafc] pb-24 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="bg-[#0B0E28] pt-32 pb-20 relative overflow-hidden"><div class="absolute inset-0 z-0 opacity-20 bg-[url(&#39;https://www.transparenttextures.com/patterns/cubes.png&#39;)]"></div><div class="absolute top-0 start-0 w-full h-full bg-gradient-to-b from-transparent to-[#0B0E28] z-0"></div><div class="container mx-auto px-4 relative z-10"><h1 class="text-3xl md:text-5xl font-black text-white mb-4 text-center">${ssrInterpolate(unref(t)("account.orders"))}</h1><p class="text-slate-300 text-center text-sm md:text-base max-w-2xl mx-auto">${ssrInterpolate(unref(t)("orders.track_subtitle"))}</p></div></div><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20"><div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0 flex flex-col gap-6"><div class="flex flex-col sm:flex-row items-center justify-between gap-4"><div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-100/60 flex flex-wrap gap-2 w-full sm:w-auto"><!--[-->`);
			ssrRenderList(filters.value, (filter) => {
				_push(`<button class="${ssrRenderClass(["px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer", activeFilter.value === filter.value ? "bg-[#0B0E28] text-amber-400 shadow-md" : "bg-transparent text-slate-500 hover:bg-slate-50"])}">${ssrInterpolate(filter.label)}</button>`);
			});
			_push(`<!--]--></div><div class="text-xs font-bold text-slate-500 bg-white px-4 py-3 rounded-2xl border border-slate-100 shadow-sm shrink-0">${ssrInterpolate(unref(t)("account.total_orders"))}: <span class="text-[#0B0E28] font-black">${ssrInterpolate(ordersList.value.length)}</span></div></div>`);
			if (pending.value) _push(`<div class="bg-white rounded-[2rem] p-16 text-center shadow-sm border border-slate-100/60"><div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div><p class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("account.loading_orders"))}</p></div>`);
			else if (filteredOrders.value.length === 0) {
				_push(`<div class="bg-white rounded-[2rem] p-12 sm:p-16 text-center shadow-sm border border-slate-100/60 space-y-6"><div class="w-20 h-20 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto text-3xl shadow-inner"><svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><div class="space-y-2 max-w-sm mx-auto"><h2 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("orders.empty"))}</h2><p class="text-xs sm:text-sm text-slate-500 leading-relaxed">${ssrInterpolate(unref(t)("cart.empty_desc"))}</p></div>`);
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
			} else _push(ssrRenderComponent(OrdersTable_default, {
				orders: filteredOrders.value,
				title: unref(t)("account.orders"),
				showViewAll: false,
				onOpenDetails: openOrderDetails
			}, null, _parent));
			_push(`</main></div></div>`);
			_push(ssrRenderComponent(OrderDetailsModal_default, {
				isOpen: isOrderModalOpen.value,
				activeOrder: activeOrderData.value,
				onClose: ($event) => isOrderModalOpen.value = false
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/my-account/orders/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/orders/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var orders_default = index_vue_vue_type_script_setup_true_lang_default;

export { orders_default as default };
//# sourceMappingURL=orders-DMpahHZ0.mjs.map
