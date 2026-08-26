import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, useId, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';

//#region components/dashboard/ui/BaseSelect.vue?vue&type=script&setup=true&lang.ts
var BaseSelect_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseSelect",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		error: { default: "" },
		placeholder: { default: "" },
		options: { default: () => [] },
		required: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		}
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const id = useId();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5 w-full" }, _attrs))} data-v-fadfd155>`);
			if (__props.label) {
				_push(`<label${ssrRenderAttr("for", unref(id))} class="text-xs font-extrabold text-[#0B0E28] block" data-v-fadfd155>${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-rose-500 ms-0.5" data-v-fadfd155>*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<div class="relative" data-v-fadfd155><select${ssrRenderAttr("id", unref(id))}${ssrRenderAttr("value", __props.modelValue)}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} class="${ssrRenderClass([
				"w-full px-4 py-3 pe-10 rounded-xl border text-sm font-bold outline-none transition-all duration-200 appearance-none cursor-pointer",
				__props.error ? "border-rose-500 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-500/20" : "border-slate-200 bg-slate-50/80 text-[#0B0E28] focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 hover:border-slate-300",
				__props.disabled ? "opacity-60 cursor-not-allowed bg-slate-100" : "",
				!__props.modelValue ? "text-slate-400 font-medium" : ""
			])}" data-v-fadfd155>`);
			if (__props.placeholder) _push(`<option value="" disabled selected data-v-fadfd155>${ssrInterpolate(__props.placeholder)}</option>`);
			else _push(`<!---->`);
			_push(`<!--[-->`);
			ssrRenderList(__props.options, (option) => {
				_push(`<option${ssrRenderAttr("value", option.value)} class="text-[#0B0E28] font-bold py-2" data-v-fadfd155>${ssrInterpolate(option.label)}</option>`);
			});
			_push(`<!--]--></select><div class="absolute end-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none flex items-center justify-center" data-v-fadfd155><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-v-fadfd155><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" data-v-fadfd155></path></svg></div></div>`);
			if (__props.error) _push(`<span class="text-xs font-bold text-rose-500 mt-0.5" data-v-fadfd155>${ssrInterpolate(__props.error)}</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/BaseSelect.vue
var _sfc_setup = BaseSelect_vue_vue_type_script_setup_true_lang_default.setup;
BaseSelect_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/BaseSelect.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseSelect_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BaseSelect_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fadfd155"]]), { __name: "DashboardUiBaseSelect" });

export { BaseSelect_default as B };
//# sourceMappingURL=BaseSelect-mF2QR5Dg.mjs.map
