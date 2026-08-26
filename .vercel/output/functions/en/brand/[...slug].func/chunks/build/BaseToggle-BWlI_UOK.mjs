import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

//#region components/dashboard/ui/BaseToggle.vue?vue&type=script&setup=true&lang.ts
var BaseToggle_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseToggle",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		label: {},
		disabled: { type: Boolean }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<label${ssrRenderAttrs(mergeProps({ class: "flex items-center gap-3 cursor-pointer" }, _attrs))}><div class="relative"><input type="checkbox"${ssrIncludeBooleanAttr(__props.modelValue) ? " checked" : ""} class="sr-only peer"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}><div class="${ssrRenderClass([[__props.modelValue ? "bg-emerald-500" : "bg-rose-500", __props.disabled ? "opacity-50 cursor-not-allowed" : ""], "w-11 h-6 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all rtl:peer-checked:after:-translate-x-full"])}"></div></div>`);
			if (__props.label) _push(`<span class="font-bold text-slate-700 select-none">${ssrInterpolate(__props.label)}</span>`);
			else _push(`<!---->`);
			_push(`</label>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/BaseToggle.vue
var _sfc_setup = BaseToggle_vue_vue_type_script_setup_true_lang_default.setup;
BaseToggle_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/BaseToggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseToggle_default = Object.assign(BaseToggle_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiBaseToggle" });

export { BaseToggle_default as B };
//# sourceMappingURL=BaseToggle-BWlI_UOK.mjs.map
