import { _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderTeleport, ssrRenderList, ssrRenderClass, ssrInterpolate } from 'vue/server-renderer';

//#region components/dashboard/ui/TheToast.vue?vue&type=script&setup=true&lang.ts
var TheToast_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TheToast",
	__ssrInlineRender: true,
	setup(__props) {
		const { toasts} = useToast();
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				_push(`<div class="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 w-full max-w-sm px-4 pointer-events-none" dir="rtl" data-v-7453eafc><!--[-->`);
				ssrRenderList(unref(toasts), (toast) => {
					_push(`<div class="${ssrRenderClass([{
						"border-green-200": toast.type === "success",
						"border-red-200": toast.type === "error",
						"border-blue-200": toast.type === "info",
						"border-amber-200": toast.type === "warning"
					}, "flex items-start gap-3 p-4 rounded-xl shadow-lg border pointer-events-auto bg-white backdrop-blur-sm"])}" data-v-7453eafc><div class="shrink-0 mt-0.5" data-v-7453eafc>`);
					if (toast.type === "success") _push(`<svg class="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-v-7453eafc><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-7453eafc></path></svg>`);
					else if (toast.type === "error") _push(`<svg class="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-v-7453eafc><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-7453eafc></path></svg>`);
					else if (toast.type === "info") _push(`<svg class="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-v-7453eafc><path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" data-v-7453eafc></path></svg>`);
					else _push(`<!---->`);
					_push(`</div><div class="flex-1 min-w-0" data-v-7453eafc><h4 class="text-sm font-bold text-slate-800" data-v-7453eafc>${ssrInterpolate(toast.title)}</h4>`);
					if (toast.message) _push(`<p class="text-xs text-slate-500 mt-1" data-v-7453eafc>${ssrInterpolate(toast.message)}</p>`);
					else _push(`<!---->`);
					_push(`</div><button class="shrink-0 p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50 transition-colors" data-v-7453eafc><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" data-v-7453eafc><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-7453eafc></path></svg></button></div>`);
				});
				_push(`<!--]--></div>`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/dashboard/ui/TheToast.vue
var _sfc_setup = TheToast_vue_vue_type_script_setup_true_lang_default.setup;
TheToast_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/TheToast.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var TheToast_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(TheToast_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7453eafc"]]), { __name: "DashboardUiTheToast" });

export { TheToast_default as T };
//# sourceMappingURL=TheToast-zsI2cH7U.mjs.map
