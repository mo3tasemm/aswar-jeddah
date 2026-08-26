import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, useId, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';

//#region components/dashboard/ui/BaseInput.vue?vue&type=script&setup=true&lang.ts
var BaseInput_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseInput",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		error: { default: "" },
		placeholder: { default: "" },
		type: { default: "text" },
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const id = useId();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5 w-full" }, _attrs))} data-v-e9575093>`);
			if (__props.label) _push(`<label${ssrRenderAttr("for", unref(id))} class="text-sm font-bold text-slate-700" data-v-e9575093>${ssrInterpolate(__props.label)}</label>`);
			else _push(`<!---->`);
			_push(`<div class="relative" data-v-e9575093><input${ssrRenderAttr("id", unref(id))}${ssrRenderAttr("type", __props.type)}${ssrRenderAttr("value", __props.modelValue)}${ssrRenderAttr("placeholder", __props.placeholder)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([
				"w-full px-4 py-2.5 rounded-lg border text-sm outline-none transition-all duration-200",
				__props.error ? "border-red-500 bg-red-50/50 text-red-900 placeholder-red-300 focus:ring-2 focus:ring-red-500/20" : "border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 hover:border-slate-400",
				__props.disabled ? "opacity-60 cursor-not-allowed bg-slate-50" : ""
			])}" data-v-e9575093>`);
			if (_ctx.$slots.icon) {
				_push(`<div class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" data-v-e9575093>`);
				ssrRenderSlot(_ctx.$slots, "icon", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
			if (__props.error) _push(`<span class="text-xs font-bold text-red-500 mt-0.5" data-v-e9575093>${ssrInterpolate(__props.error)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/BaseInput.vue
var _sfc_setup = BaseInput_vue_vue_type_script_setup_true_lang_default.setup;
BaseInput_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/BaseInput.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseInput_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BaseInput_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e9575093"]]), { __name: "DashboardUiBaseInput" });

export { BaseInput_default as B };
//# sourceMappingURL=BaseInput-DtpOFLj4.mjs.map
