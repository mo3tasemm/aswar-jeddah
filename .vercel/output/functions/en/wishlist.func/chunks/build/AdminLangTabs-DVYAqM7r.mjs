import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

//#region components/dashboard/ui/AdminLangTabs.vue?vue&type=script&setup=true&lang.ts
var AdminLangTabs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminLangTabs",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "ar" },
		arLabel: { default: "العربية (AR)" },
		enLabel: { default: "English (EN)" }
	},
	emits: ["update:modelValue"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200/80 shrink-0" }, _attrs))}><button type="button" class="${ssrRenderClass(["px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5", __props.modelValue === "ar" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"])}"><span>🇸🇦</span><span>${ssrInterpolate(__props.arLabel)}</span></button><button type="button" class="${ssrRenderClass(["px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5", __props.modelValue === "en" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"])}"><span>🇺🇸</span><span>${ssrInterpolate(__props.enLabel)}</span></button></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminLangTabs.vue
var _sfc_setup = AdminLangTabs_vue_vue_type_script_setup_true_lang_default.setup;
AdminLangTabs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminLangTabs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminLangTabs_default = Object.assign(AdminLangTabs_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminLangTabs" });

export { AdminLangTabs_default as A };
//# sourceMappingURL=AdminLangTabs-DVYAqM7r.mjs.map
