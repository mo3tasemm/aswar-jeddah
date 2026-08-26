import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useAdminRolesAndAdmins } from './useAdminRolesAndAdmins-DKcWDju0.mjs';
import { S as StaffForm_default } from './StaffForm-DXTTH1x3.mjs';
import { defineComponent, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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
import './BaseToggle-BWlI_UOK.mjs';

//#region pages/admin/admins/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "تعديل بيانات المشرف | لوحة التحكم" });
		useRoute();
		const { currentAdmin, isLoadingAdmins} = useAdminRolesAndAdmins();
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(_attrs)}>`);
			if (unref(isLoadingAdmins)) _push(`<div class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">جاري تحميل بيانات المشرف...</span></div>`);
			else if (unref(currentAdmin)) _push(ssrRenderComponent(StaffForm_default, { "initial-data": unref(currentAdmin) }, null, _parent));
			else {
				_push(`<div class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100"><h3 class="text-base font-black text-slate-800">تعذر العثور على بيانات المشرف</h3><p class="text-xs text-slate-400">تأكد من صحة معرف المشرف وحاول مجدداً.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/staff",
					class: "inline-block px-4 py-2 bg-amber-400 text-[#0B0E28] font-bold text-xs rounded-xl"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` العودة لقائمة المشرفين `);
						else return [createTextVNode(" العودة لقائمة المشرفين ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/admins/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/admins/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-DM2Esjbg.mjs.map
