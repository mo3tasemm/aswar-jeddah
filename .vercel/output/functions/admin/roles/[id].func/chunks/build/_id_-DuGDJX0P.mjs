import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useAdminCoupons } from './useAdminCoupons-D7s_TgM8.mjs';
import { C as CouponForm_default } from './CouponForm-DTFzl9Wj.mjs';
import { defineComponent, computed, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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
import './BaseInput-DtpOFLj4.mjs';
import './BaseToggle-BWlI_UOK.mjs';
import './BaseSelect-mF2QR5Dg.mjs';

//#region pages/admin/coupons/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useRoute();
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `تعديل الكوبون | ${t("admin.sidebar.panel_title")}`) });
		const { currentCoupon, isLoadingDetails} = useAdminCoupons();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (unref(isLoadingDetails)) _push(`<div class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-10 h-10 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!unref(currentCoupon) && !unref(isLoadingDetails)) {
				_push(`<div class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100"><div class="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><h2 class="text-xl font-black text-slate-800">تعذر العثور على بيانات الكوبون</h2><p class="text-xs text-slate-500 max-w-sm mx-auto">تأكد من صحة معرف الكوبون أو حاول العودة إلى قائمة الكوبونات.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/coupons",
					class: "inline-block px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl hover:bg-slate-800 transition-all cursor-pointer"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` العودة لقائمة الكوبونات `);
						else return [createTextVNode(" العودة لقائمة الكوبونات ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else if (unref(currentCoupon)) {
				_push(`<div>`);
				_push(ssrRenderComponent(CouponForm_default, {
					"initial-data": unref(currentCoupon),
					"is-edit": true,
					"coupon-id": unref(currentCoupon).id
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/coupons/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/coupons/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-DuGDJX0P.mjs.map
