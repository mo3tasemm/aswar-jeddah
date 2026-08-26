import { n as navigateTo } from '../virtual/entry.mjs';
import { defineComponent, withAsyncContext, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
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

//#region pages/new-arrivals.vue?vue&type=script&setup=true&lang.ts
var new_arrivals_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "new-arrivals",
	__ssrInlineRender: true,
	async setup(__props) {
		let __temp, __restore;
		[__temp, __restore] = withAsyncContext(() => navigateTo("/shop?sort_by=latest", { redirectCode: 301 })), await __temp, __restore();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-[50vh] flex items-center justify-center" }, _attrs))}><div class="animate-spin text-indigo-600 text-3xl"><i class="fa-solid fa-spinner"></i></div></div>`);
		};
	}
});
//#endregion
//#region pages/new-arrivals.vue
var _sfc_setup = new_arrivals_vue_vue_type_script_setup_true_lang_default.setup;
new_arrivals_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/new-arrivals.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var new_arrivals_default = new_arrivals_vue_vue_type_script_setup_true_lang_default;

export { new_arrivals_default as default };
//# sourceMappingURL=new-arrivals-BKuELp8E.mjs.map
