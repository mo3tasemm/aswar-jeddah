import { N as NuxtLink } from '../virtual/entry.mjs';
import { A as AdminLangTabs_default } from './AdminLangTabs-DVYAqM7r.mjs';
import { defineComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';

//#region components/dashboard/ui/AdminPageHeader.vue?vue&type=script&setup=true&lang.ts
var AdminPageHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminPageHeader",
	__ssrInlineRender: true,
	props: {
		title: { default: "" },
		subtitle: { default: "" },
		icon: { default: "" },
		breadcrumbs: {},
		showLangTabs: {
			type: Boolean,
			default: false
		},
		langTab: { default: "ar" },
		showSave: {
			type: Boolean,
			default: false
		},
		isSaving: {
			type: Boolean,
			default: false
		},
		saveLabel: {},
		savingLabel: {}
	},
	emits: ["save", "update:langTab"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4" }, _attrs))}><div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4"><div class="space-y-1.5 min-w-0">`);
			ssrRenderSlot(_ctx.$slots, "breadcrumbs", {}, () => {
				if (__props.breadcrumbs && __props.breadcrumbs.length > 0) {
					_push(`<nav class="flex items-center gap-2 text-xs text-slate-400 font-bold flex-wrap mb-1"><!--[-->`);
					ssrRenderList(__props.breadcrumbs, (item, idx) => {
						_push(`<!--[-->`);
						if (item.to) _push(ssrRenderComponent(_component_NuxtLink, {
							to: item.to,
							class: "hover:text-indigo-600 transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(item.label)}`);
								else return [createTextVNode(toDisplayString(item.label), 1)];
							}),
							_: 2
						}, _parent));
						else _push(`<span class="text-slate-700">${ssrInterpolate(item.label)}</span>`);
						if (idx < __props.breadcrumbs.length - 1) _push(`<span class="text-slate-300">/</span>`);
						else _push(`<!---->`);
						_push(`<!--]-->`);
					});
					_push(`<!--]--></nav>`);
				} else _push(`<!---->`);
			}, _push, _parent);
			_push(`<div class="flex items-start sm:items-center gap-3">`);
			if (__props.icon) _push(`<div class="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl border border-indigo-100 shrink-0 shadow-2xs mt-0.5 sm:mt-0"><i class="${ssrRenderClass(__props.icon)}"></i></div>`);
			else _push(`<!---->`);
			_push(`<div><h1 class="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">${ssrInterpolate(__props.title)}</h1>`);
			if (__props.subtitle) _push(`<p class="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 line-clamp-2">${ssrInterpolate(__props.subtitle)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div></div><div class="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0 self-stretch lg:self-center justify-start lg:justify-end">`);
			ssrRenderSlot(_ctx.$slots, "lang-tabs", {}, () => {
				if (__props.showLangTabs) _push(ssrRenderComponent(AdminLangTabs_default, {
					"model-value": __props.langTab,
					"onUpdate:modelValue": ($event) => _ctx.$emit("update:langTab", $event)
				}, null, _parent));
				else _push(`<!---->`);
			}, _push, _parent);
			ssrRenderSlot(_ctx.$slots, "actions", {}, null, _push, _parent);
			if (__props.showSave) {
				_push(`<button type="button"${ssrIncludeBooleanAttr(__props.isSaving) ? " disabled" : ""} class="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-400/20 cursor-pointer disabled:opacity-50 active:scale-98 shrink-0">`);
				if (__props.isSaving) _push(`<i class="fa-solid fa-spinner fa-spin"></i>`);
				else _push(`<i class="fa-solid fa-floppy-disk"></i>`);
				_push(`<span>${ssrInterpolate(__props.isSaving ? __props.savingLabel || "جاري الحفظ..." : __props.saveLabel || "حفظ التعديلات")}</span></button>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
			if (_ctx.$slots.bottom) {
				_push(`<div class="pt-3 border-t border-slate-100">`);
				ssrRenderSlot(_ctx.$slots, "bottom", {}, null, _push, _parent);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminPageHeader.vue
var _sfc_setup = AdminPageHeader_vue_vue_type_script_setup_true_lang_default.setup;
AdminPageHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminPageHeader.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminPageHeader_default = Object.assign(AdminPageHeader_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminPageHeader" });

export { AdminPageHeader_default as A };
//# sourceMappingURL=AdminPageHeader-RavS7Sn5.mjs.map
