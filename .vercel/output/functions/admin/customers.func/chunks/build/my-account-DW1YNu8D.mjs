import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAuth } from './useAuth-IbNI92RZ.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { O as OrdersTable_default, a as OrderDetailsModal_default } from './OrderDetailsModal-Bfx3nXzv.mjs';
import { defineComponent, computed, ref, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import '../virtual/entry.mjs';
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
import './orderApiService-BPbSmUjB.mjs';

//#region pages/my-account/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("nav.account")} | أسوار جدة`) });
		const { userName } = useAuth();
		const pending = ref(true);
		const ordersList = ref([]);
		const isOrderModalOpen = ref(false);
		const activeOrderData = ref(null);
		const recentOrders = computed(() => {
			return ordersList.value.slice(0, 5);
		});
		const processingCount = computed(() => {
			return ordersList.value.filter((o) => o.status === "processing").length;
		});
		const completedCount = computed(() => {
			return ordersList.value.filter((o) => o.status === "completed").length;
		});
		const openOrderDetails = (order) => {
			activeOrderData.value = order.rawItem || order;
			isOrderModalOpen.value = true;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "account-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA]",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			_push(ssrRenderComponent(Breadcrumbs_default, null, null, _parent));
			_push(`<div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0 flex flex-col gap-8"><div class="relative bg-[#0B0E28] rounded-[2rem] p-10 md:p-12 overflow-hidden shadow-2xl flex items-center justify-between"><div class="absolute inset-0 pointer-events-none opacity-20"><svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="white" stroke-width="0.5" fill="none"></path></pattern></defs><rect width="100%" height="100%" fill="url(#grid-pattern)"></rect></svg><div class="absolute -end-20 -top-20 w-96 h-96 bg-amber-500 rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div><div class="absolute -start-20 -bottom-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-screen filter blur-[100px] opacity-20"></div></div><div class="relative z-10 max-w-2xl"><div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold mb-6"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg> ${ssrInterpolate(unref(t)("account.welcome_back"))}</div><h1 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">${ssrInterpolate(unref(t)("account.welcome_user"))} <span class="text-amber-400">${ssrInterpolate(unref(userName))}</span></h1><p class="text-slate-300 text-sm md:text-base leading-relaxed max-w-xl">${ssrInterpolate(unref(t)("account.dashboard_desc"))}</p></div><div class="hidden lg:block relative z-10"><div class="w-32 h-32 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 flex items-center justify-center"><svg class="w-16 h-16 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg></div></div></div><div class="grid grid-cols-1 md:grid-cols-3 gap-6"><div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"><div class="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-[#0B0E28] transition-colors flex items-center justify-center shrink-0"><svg class="w-7 h-7 text-[#0B0E28] group-hover:text-amber-400 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg></div><div><p class="text-slate-400 text-sm font-semibold mb-1">${ssrInterpolate(unref(t)("account.total_orders"))}</p><h3 class="text-3xl font-black text-[#0B0E28]">`);
			if (pending.value) _push(`<span class="text-slate-300 animate-pulse">...</span>`);
			else _push(`<span>${ssrInterpolate(ordersList.value.length)}</span>`);
			_push(`</h3></div></div><div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"><div class="w-16 h-16 rounded-2xl bg-amber-50 group-hover:bg-amber-500 transition-colors flex items-center justify-center shrink-0"><svg class="w-7 h-7 text-amber-600 group-hover:text-slate-950 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-slate-400 text-sm font-semibold mb-1">${ssrInterpolate(unref(t)("account.processing_orders"))}</p><h3 class="text-3xl font-black text-[#0B0E28]">`);
			if (pending.value) _push(`<span class="text-slate-300 animate-pulse">...</span>`);
			else _push(`<span>${ssrInterpolate(processingCount.value)}</span>`);
			_push(`</h3></div></div><div class="bg-white p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex items-center gap-6 group transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1"><div class="w-16 h-16 rounded-2xl bg-emerald-50 group-hover:bg-emerald-600 transition-colors flex items-center justify-center shrink-0"><svg class="w-7 h-7 text-emerald-600 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div><div><p class="text-slate-400 text-sm font-semibold mb-1">${ssrInterpolate(unref(t)("account.completed_orders"))}</p><h3 class="text-3xl font-black text-[#0B0E28]">`);
			if (pending.value) _push(`<span class="text-slate-300 animate-pulse">...</span>`);
			else _push(`<span>${ssrInterpolate(completedCount.value)}</span>`);
			_push(`</h3></div></div></div>`);
			if (pending.value) _push(`<div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60"><div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("account.loading_orders"))}</p></div>`);
			else _push(ssrRenderComponent(OrdersTable_default, {
				orders: recentOrders.value,
				title: unref(t)("account.recent_orders"),
				showViewAll: true,
				onOpenDetails: openOrderDetails
			}, null, _parent));
			_push(`</main></div></div><section class="w-full bg-white border-t border-slate-200 mt-12">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section><section class="w-full bg-[#F8F9FA]">`);
			_push(ssrRenderComponent(StoreLocationShowcase_default, null, null, _parent));
			_push(`</section>`);
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
//#region pages/my-account/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var my_account_default = index_vue_vue_type_script_setup_true_lang_default;

export { my_account_default as default };
//# sourceMappingURL=my-account-DW1YNu8D.mjs.map
