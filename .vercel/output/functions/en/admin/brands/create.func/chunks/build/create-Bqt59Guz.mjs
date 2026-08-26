import { N as NuxtLink, n as navigateTo } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { C as CategoryFormAdvanced_default } from './CategoryFormAdvanced-C9bz3fBx.mjs';
import { u as useAdminCategories } from './useAdminCategories-1__J71xC.mjs';
import { defineComponent, computed, mergeProps, withCtx, openBlock, createBlock, createVNode, unref, useSSRContext } from 'vue';
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

//#region pages/admin/categories/create.vue?vue&type=script&setup=true&lang.ts
var create_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "create",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { categories, submitForm, isSubmitting } = useAdminCategories();
		const queryParentId = computed(() => route.query.parent_id ? String(route.query.parent_id) : "");
		const queryParentName = computed(() => route.query.parent_name ? String(route.query.parent_name) : "");
		const isSubcategoryCreation = computed(() => Boolean(queryParentId.value && queryParentId.value !== "0"));
		const parentNameDisplay = computed(() => {
			if (queryParentName.value) return queryParentName.value;
			const found = categories.value.find((c) => String(c.id) === queryParentId.value);
			return found ? found.name_ar || found.name : `قسم #${queryParentId.value}`;
		});
		const initialFormData = computed(() => {
			if (isSubcategoryCreation.value) return {
				parent_id: queryParentId.value,
				position: 1,
				priority: 1
			};
			return {
				parent_id: 0,
				position: 0,
				priority: 1
			};
		});
		useHead$1({ title: computed(() => isSubcategoryCreation.value ? "إضافة قسم فرعي | لوحة التحكم" : "إضافة قسم رئيسي | لوحة التحكم") });
		const handleCreate = async (payload) => {
			if (await submitForm(payload, false)) navigateTo("/admin/categories");
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
			_push(`<div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(isSubcategoryCreation.value ? `إضافة قسم فرعي جديد لـ "${parentNameDisplay.value}"` : "إضافة قسم رئيسي جديد")}</h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium"> أدخل بيانات القسم باللغتين العربية والإنجليزية وحدد صورة الغلاف ليتم إرسال البيانات كـ FormData. </p></div></div>`);
			_push(ssrRenderComponent(CategoryFormAdvanced_default, {
				"is-edit-mode": false,
				"initial-data": initialFormData.value,
				"is-submitting": unref(isSubmitting),
				"categories-list": unref(categories),
				onSubmit: handleCreate,
				onCancel: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/categories")
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/categories/create.vue
var _sfc_setup = create_vue_vue_type_script_setup_true_lang_default.setup;
create_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/categories/create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var create_default = create_vue_vue_type_script_setup_true_lang_default;

export { create_default as default };
//# sourceMappingURL=create-Bqt59Guz.mjs.map
