import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, useId, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';

//#region components/dashboard/ui/BaseTextarea.vue?vue&type=script&setup=true&lang.ts
var BaseTextarea_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseTextarea",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		error: { default: "" },
		placeholder: { default: "" },
		disabled: {
			type: Boolean,
			default: false
		},
		rows: { default: 4 }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const id = useId();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5 w-full" }, _attrs))} data-v-87344bab>`);
			if (__props.label) _push(`<label${ssrRenderAttr("for", unref(id))} class="text-sm font-bold text-slate-700" data-v-87344bab>${ssrInterpolate(__props.label)}</label>`);
			else _push(`<!---->`);
			_push(`<div class="relative" data-v-87344bab><textarea${ssrRenderAttr("id", unref(id))}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""}${ssrRenderAttr("rows", __props.rows)} class="${ssrRenderClass([
				"w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 resize-y min-h-[100px]",
				__props.error ? "border-red-500 bg-red-50/50 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500/20" : "border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 hover:border-slate-400",
				__props.disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""
			])}" data-v-87344bab>${ssrInterpolate(__props.modelValue)}</textarea></div>`);
			if (__props.error) _push(`<span class="text-xs font-bold text-red-500 mt-0.5" data-v-87344bab>${ssrInterpolate(__props.error)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/BaseTextarea.vue
var _sfc_setup = BaseTextarea_vue_vue_type_script_setup_true_lang_default.setup;
BaseTextarea_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/BaseTextarea.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseTextarea_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BaseTextarea_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-87344bab"]]), { __name: "DashboardUiBaseTextarea" });

export { BaseTextarea_default as B };
//# sourceMappingURL=BaseTextarea-B8WQh6wy.mjs.map
