import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, computed, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

//#region components/dashboard/ui/BaseModal.vue?vue&type=script&setup=true&lang.ts
var BaseModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BaseModal",
	__ssrInlineRender: true,
	props: {
		modelValue: { type: Boolean },
		isOpen: { type: Boolean },
		title: {},
		description: {},
		maxWidth: {},
		size: {}
	},
	emits: [
		"update:modelValue",
		"update:isOpen",
		"close"
	],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const isVisible = computed(() => {
			if (props.modelValue !== void 0) return Boolean(props.modelValue);
			if (props.isOpen !== void 0) return Boolean(props.isOpen);
			return false;
		});
		const maxWidthClass = computed(() => {
			switch (props.maxWidth || props.size || "md") {
				case "sm": return "max-w-md";
				case "md": return "max-w-lg";
				case "lg": return "max-w-2xl";
				case "xl": return "max-w-4xl";
				case "2xl": return "max-w-5xl";
				default: return "max-w-lg";
			}
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (isVisible.value) {
					_push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" dir="rtl" data-v-1eac582f><div class="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" data-v-1eac582f></div>`);
					if (isVisible.value) {
						_push(`<div class="${ssrRenderClass([[maxWidthClass.value], "bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] flex flex-col relative z-10 overflow-hidden border border-slate-100"])}" data-v-1eac582f><div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/70" data-v-1eac582f><div data-v-1eac582f><h3 class="text-lg font-black text-slate-800" data-v-1eac582f>${ssrInterpolate(__props.title)}</h3>`);
						if (__props.description) _push(`<p class="text-sm text-slate-500 mt-0.5" data-v-1eac582f>${ssrInterpolate(__props.description)}</p>`);
						else _push(`<!---->`);
						_push(`</div><button type="button" class="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/80 flex items-center justify-center transition-colors cursor-pointer" title="إغلاق" data-v-1eac582f><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-1eac582f><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-1eac582f></path></svg></button></div><div class="p-6 overflow-y-auto flex-1" data-v-1eac582f>`);
						ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
						_push(`</div></div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/dashboard/ui/BaseModal.vue
var _sfc_setup = BaseModal_vue_vue_type_script_setup_true_lang_default.setup;
BaseModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/BaseModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BaseModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BaseModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1eac582f"]]), { __name: "DashboardUiBaseModal" });

export { BaseModal_default as B };
//# sourceMappingURL=BaseModal-D9dLO0m4.mjs.map
