import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';

//#region pages/wishlist.vue?vue&type=script&setup=true&lang.ts
var wishlist_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "wishlist",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center" }, _attrs))}><div class="space-y-4"><div class="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div><p class="text-sm font-bold text-slate-600">جاري التوجيه إلى قائمة الرغبات والمفضلة...</p></div></div>`);
		};
	}
});
//#endregion
//#region pages/wishlist.vue
var _sfc_setup = wishlist_vue_vue_type_script_setup_true_lang_default.setup;
wishlist_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/wishlist.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var wishlist_default = wishlist_vue_vue_type_script_setup_true_lang_default;

export { wishlist_default as default };
//# sourceMappingURL=wishlist-D1lmXHNQ.mjs.map
