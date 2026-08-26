import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';

//#region components/dashboard/ui/AdminCard.vue?vue&type=script&setup=true&lang.ts
var AdminCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminCard",
	__ssrInlineRender: true,
	props: {
		title: {},
		subtitle: {},
		icon: {},
		iconColor: {},
		badge: {},
		badgeColor: {}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6" }, _attrs))}>`);
			if (__props.title || _ctx.$slots["header-actions"]) {
				_push(`<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4"><div><div class="flex items-center gap-2">`);
				if (__props.icon) _push(`<i class="${ssrRenderClass([
					__props.icon,
					__props.iconColor || "text-amber-500",
					"text-base sm:text-lg"
				])}"></i>`);
				else _push(`<!---->`);
				_push(`<h3 class="text-base sm:text-lg font-black text-slate-900">${ssrInterpolate(__props.title)}</h3>`);
				if (__props.badge) _push(`<span class="${ssrRenderClass(["px-2.5 py-0.5 rounded-full text-[11px] font-bold", __props.badgeColor || "bg-indigo-50 text-indigo-700 border border-indigo-200/60"])}">${ssrInterpolate(__props.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (__props.subtitle) _push(`<p class="text-xs text-slate-500 mt-1 font-normal leading-relaxed">${ssrInterpolate(__props.subtitle)}</p>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (_ctx.$slots["header-actions"]) {
					_push(`<div class="flex items-center gap-2 shrink-0">`);
					ssrRenderSlot(_ctx.$slots, "header-actions", {}, null, _push, _parent);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div>`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div>`);
			if (_ctx.$slots.footer) {
				_push(`<div class="border-t border-slate-100 pt-4">`);
				ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminCard.vue
var _sfc_setup = AdminCard_vue_vue_type_script_setup_true_lang_default.setup;
AdminCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminCard_default = Object.assign(AdminCard_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminCard" });

export { AdminCard_default as A };
//# sourceMappingURL=AdminCard-BCY_YRzZ.mjs.map
