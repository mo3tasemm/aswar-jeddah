import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

//#region pages/compare.vue?vue&type=script&setup=true&lang.ts
var compare_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "compare",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center" }, _attrs))}><div class="space-y-4"><div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div><p class="text-sm font-bold text-slate-600">جاري التوجيه إلى صفحة مقارنة المنتجات...</p></div></div>`);
		};
	}
});
//#endregion
//#region pages/compare.vue
var _sfc_setup = compare_vue_vue_type_script_setup_true_lang_default.setup;
compare_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/compare.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var compare_default = compare_vue_vue_type_script_setup_true_lang_default;

export { compare_default as default };
//# sourceMappingURL=compare-D-qhGb9P.mjs.map
