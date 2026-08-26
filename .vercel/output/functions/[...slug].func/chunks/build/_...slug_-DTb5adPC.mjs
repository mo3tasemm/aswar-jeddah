import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
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
import 'vue-router';
import '@vue/shared';
import 'unhead/utils';

//#region pages/[...slug].vue?vue&type=script&setup=true&lang.ts
var ____slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[...slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const { layoutDirection, localePath } = useLanguage();
		useHead$1({ title: "404 - الصفحة غير موجودة | أسوار جدة" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-[70vh] flex items-center justify-center py-16 px-4 bg-slate-50/50",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/80 shadow-lg"><div class="w-20 h-20 bg-amber-100 text-amber-600 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-inner border border-amber-200"> 404 </div><div class="space-y-2"><h1 class="text-2xl font-black text-[#0B0E28]">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Page Not Found" : "الصفحة غير موجودة")}</h1><p class="text-xs sm:text-sm text-slate-500 leading-relaxed">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "The page you are looking for might have been moved or does not exist." : "عذراً، الصفحة التي تبحث عنها غير موجودة أو ربما تم تغيير مسارها.")}</p></div><div class="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "w-full sm:w-auto px-6 py-3 bg-[#0B0E28] hover:bg-slate-800 text-white text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Back to Home" : "الرئيسية")}`);
					else return [createTextVNode(toDisplayString(unref(layoutDirection) === "ltr" ? "Back to Home" : "الرئيسية"), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/shop"),
				class: "w-full sm:w-auto px-6 py-3 bg-amber-400 hover:bg-amber-500 text-slate-950 text-xs font-black rounded-xl shadow-md transition-all cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Browse Shop" : "تصفح المتجر")}`);
					else return [createTextVNode(toDisplayString(unref(layoutDirection) === "ltr" ? "Browse Shop" : "تصفح المتجر"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region pages/[...slug].vue
var _sfc_setup = ____slug__vue_vue_type_script_setup_true_lang_default.setup;
____slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/[...slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ____slug__default = ____slug__vue_vue_type_script_setup_true_lang_default;

export { ____slug__default as default };
//# sourceMappingURL=_...slug_-DTb5adPC.mjs.map
