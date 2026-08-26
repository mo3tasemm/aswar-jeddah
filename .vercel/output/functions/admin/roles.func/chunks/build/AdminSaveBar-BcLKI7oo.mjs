import { N as NuxtLink } from '../virtual/entry.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderSlot, ssrRenderClass, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr } from 'vue/server-renderer';

//#region components/dashboard/ui/AdminSkeletonForm.vue?vue&type=script&setup=true&lang.ts
var AdminSkeletonForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminSkeletonForm",
	__ssrInlineRender: true,
	props: { cards: { default: 2 } },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!--[-->`);
			ssrRenderList(__props.cards || 2, (c) => {
				_push(`<div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 animate-pulse space-y-5 shadow-xs"><div class="flex items-center justify-between border-b border-slate-100 pb-4"><div class="space-y-2 w-1/3"><div class="h-5 bg-slate-200 rounded-lg w-3/4"></div><div class="h-3 bg-slate-100 rounded-md w-full"></div></div><div class="h-8 bg-slate-100 rounded-xl w-24"></div></div><div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="space-y-1.5"><div class="h-3 bg-slate-200 rounded-md w-24"></div><div class="h-11 bg-slate-100 rounded-xl w-full"></div></div><div class="space-y-1.5"><div class="h-3 bg-slate-200 rounded-md w-24"></div><div class="h-11 bg-slate-100 rounded-xl w-full"></div></div></div><div class="space-y-1.5"><div class="h-3 bg-slate-200 rounded-md w-32"></div><div class="h-28 bg-slate-100 rounded-2xl w-full"></div></div></div></div>`);
			});
			_push(`<!--]--></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminSkeletonForm.vue
var _sfc_setup$1 = AdminSkeletonForm_vue_vue_type_script_setup_true_lang_default.setup;
AdminSkeletonForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminSkeletonForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AdminSkeletonForm_default = Object.assign(AdminSkeletonForm_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminSkeletonForm" });
//#endregion
//#region components/dashboard/ui/AdminSaveBar.vue?vue&type=script&setup=true&lang.ts
var AdminSaveBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminSaveBar",
	__ssrInlineRender: true,
	props: {
		isSaving: {
			type: Boolean,
			default: false
		},
		saveLabel: { default: "حفظ ونشر التعديلات" },
		savingLabel: { default: "جاري الحفظ..." },
		statusLabel: {},
		isActive: {
			type: [Boolean, Number],
			default: true
		},
		showStatus: {
			type: Boolean,
			default: true
		},
		previewUrl: {},
		previewLabel: {},
		cancelUrl: {},
		cancelLabel: {}
	},
	emits: ["save", "cancel"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-slate-200 py-3.5 px-4 sm:px-8 z-40 flex flex-wrap items-center justify-between gap-3 shadow-lg" }, _attrs))}><div class="flex items-center gap-2.5">`);
			ssrRenderSlot(_ctx.$slots, "status-slot", {}, () => {
				if (__props.showStatus) _push(`<!--[--><span class="${ssrRenderClass([__props.isActive ? "bg-emerald-500 animate-pulse" : "bg-slate-400", "w-2.5 h-2.5 rounded-full shrink-0"])}"></span><span class="text-xs font-bold text-slate-700">${ssrInterpolate(__props.statusLabel || "حالة الصفحة:")} <span class="${ssrRenderClass(__props.isActive ? "text-emerald-700 font-black" : "text-slate-500 font-medium")}">${ssrInterpolate(__props.isActive ? "مفعلة وتظهر للمستخدمين" : "غير نشطة مؤقتاً")}</span></span><!--]-->`);
				else _push(`<!---->`);
			}, _push, _parent);
			_push(`</div><div class="flex items-center gap-2 sm:gap-3 ms-auto">`);
			ssrRenderSlot(_ctx.$slots, "cancel", {}, () => {
				if (__props.cancelUrl) _push(ssrRenderComponent(_component_NuxtLink, {
					to: __props.cancelUrl,
					class: "px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(__props.cancelLabel || "إلغاء")}`);
						else return [createTextVNode(toDisplayString(__props.cancelLabel || "إلغاء"), 1)];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
			}, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "preview", {}, () => {
				if (__props.previewUrl) _push(ssrRenderComponent(_component_NuxtLink, {
					to: __props.previewUrl,
					target: "_blank",
					class: "px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<i class="fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400"${_scopeId}></i><span class="hidden sm:inline"${_scopeId}>${ssrInterpolate(__props.previewLabel || "معاينة بالمتجر")}</span>`);
						else return [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-[10px] text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, toDisplayString(__props.previewLabel || "معاينة بالمتجر"), 1)];
					}),
					_: 1
				}, _parent));
				else _push(`<!---->`);
			}, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
			_push(`<button type="button"${ssrIncludeBooleanAttr(__props.isSaving) ? " disabled" : ""} class="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 hover:scale-102 active:scale-98">`);
			if (__props.isSaving) _push(`<i class="fa-solid fa-spinner fa-spin"></i>`);
			else _push(`<i class="fa-solid fa-check"></i>`);
			_push(`<span>${ssrInterpolate(__props.isSaving ? __props.savingLabel || "جاري الحفظ..." : __props.saveLabel || "حفظ ونشر التعديلات")}</span></button></div></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminSaveBar.vue
var _sfc_setup = AdminSaveBar_vue_vue_type_script_setup_true_lang_default.setup;
AdminSaveBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminSaveBar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminSaveBar_default = Object.assign(AdminSaveBar_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminSaveBar" });

export { AdminSkeletonForm_default as A, AdminSaveBar_default as a };
//# sourceMappingURL=AdminSaveBar-BcLKI7oo.mjs.map
