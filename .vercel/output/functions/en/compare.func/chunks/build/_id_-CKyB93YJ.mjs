import { N as NuxtLink, n as navigateTo } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { C as CategoryFormAdvanced_default } from './CategoryFormAdvanced-C9bz3fBx.mjs';
import { u as useAdminCategories } from './useAdminCategories-1__J71xC.mjs';
import { defineComponent, computed, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, unref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@vue/shared';
import 'unhead/utils';
import './adminCategoriesApiService-nS8glRi_.mjs';

//#region pages/admin/categories/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const categoryId = String(route.params.id);
		useHead$1({ title: computed(() => `تعديل القسم #${categoryId} | لوحة التحكم`) });
		const { categories, submitForm, isSubmitting } = useAdminCategories();
		const loading = ref(true);
		const fetchError = ref("");
		const categoryData = ref({});
		const handleUpdate = async (payload) => {
			if (await submitForm(payload, true, categoryId)) navigateTo("/admin/categories");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex items-center gap-4 mb-6">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/categories",
				class: "w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-100 transition-colors shadow-sm cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 rtl:-scale-x-100",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M15 19l-7-7 7-7"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`<div><h1 class="text-2xl font-black text-slate-900"> تعديل بيانات القسم (ID: #${ssrInterpolate(unref(categoryId))}) </h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium"> تحديث اسم القسم باللغتين، صورة الغلاف، الترتيب، أو نقله إلى قسم أب آخر عبر API التحديث المباشر. </p></div></div>`);
			if (loading.value) _push(`<div class="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-4"><div class="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin"></div><span class="font-extrabold text-sm text-slate-700">جاري جلب بيانات القسم #${ssrInterpolate(unref(categoryId))} من السيرفر...</span></div>`);
			else if (fetchError.value) _push(`<div class="p-5 bg-rose-50 border border-rose-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"><div class="flex items-center gap-3"><svg class="w-6 h-6 text-rose-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg><div><span class="font-bold text-xs text-rose-700 block">${ssrInterpolate(fetchError.value)}</span><span class="text-[11px] text-rose-500 font-medium">يمكنك المتابعة وتعديل بيانات القسم أدناه أو إعادة المحاولة.</span></div></div><button class="px-4 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0"> إعادة المحاولة </button></div>`);
			else _push(`<!---->`);
			if (!loading.value) _push(ssrRenderComponent(CategoryFormAdvanced_default, {
				"is-edit-mode": true,
				"initial-data": categoryData.value,
				"is-submitting": unref(isSubmitting),
				"categories-list": unref(categories),
				onSubmit: handleUpdate,
				onCancel: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/categories")
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/categories/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-CKyB93YJ.mjs.map
