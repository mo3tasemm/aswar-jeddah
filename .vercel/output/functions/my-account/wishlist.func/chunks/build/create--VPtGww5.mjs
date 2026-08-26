import { b as useAdminLanguage, N as NuxtLink, n as navigateTo } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { N as NavbarItemForm_default } from './NavbarItemForm-DiDggd9Z.mjs';
import { u as useAdminNavbar } from './useAdminNavbar-w3yxR_La.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
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
import './AdminLangTabs-DVYAqM7r.mjs';
import './BaseInput-DtpOFLj4.mjs';
import './adminNavbarApiService-D0ZIw4fK.mjs';
import './apiConfig-CCR2eNes.mjs';
import './adminBrandsApiService-CxliYt3r.mjs';
import './adminCategoriesApiService-nS8glRi_.mjs';

//#region pages/admin/navbar/create.vue?vue&type=script&setup=true&lang.ts
var create_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "create",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { adminDir } = useAdminLanguage();
		const { rawItems, parentOptions, dbCategories, dbBrands, isSubmitting, createNavbarItem } = useAdminNavbar();
		useHead$1({ title: "إضافة عنصر قائمة جديد | لوحة تحكم أسوار جدة" });
		const queryParentId = computed(() => route.query.parent_id ? String(route.query.parent_id) : "");
		const isSubItemCreation = computed(() => Boolean(queryParentId.value && queryParentId.value !== "0"));
		const parentNameDisplay = computed(() => {
			const found = rawItems.value.find((i) => String(i.id) === queryParentId.value);
			return found ? found.title_ar || found.title : `عنصر #${queryParentId.value}`;
		});
		const initialFormData = computed(() => ({
			parent_id: queryParentId.value ? Number(queryParentId.value) : null,
			type: "link",
			url: "/",
			target: "_self",
			is_active: true
		}));
		const handleCreate = async (payload) => {
			await createNavbarItem(payload);
			await navigateTo("/admin/navbar");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6",
				dir: unref(adminDir)
			}, _attrs))}><div class="flex items-center gap-4 mb-6">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/navbar",
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
			_push(`<div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(isSubItemCreation.value ? `إضافة عنصر فرعي منسدل لـ "${parentNameDisplay.value}"` : "إضافة عنصر جديد لشريط التنقل")}</h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium"> أدخل بيانات الرابط، العنوان باللغتين، الشارة الترويجية والوجهة المستهدفة. </p></div></div>`);
			_push(ssrRenderComponent(NavbarItemForm_default, {
				"is-edit-mode": false,
				"initial-data": initialFormData.value,
				"is-submitting": unref(isSubmitting),
				"parent-options": unref(parentOptions),
				"db-categories": unref(dbCategories),
				"db-brands": unref(dbBrands),
				onSubmit: handleCreate,
				onCancel: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/navbar")
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/navbar/create.vue
var _sfc_setup = create_vue_vue_type_script_setup_true_lang_default.setup;
create_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/navbar/create.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var create_default = create_vue_vue_type_script_setup_true_lang_default;

export { create_default as default };
//# sourceMappingURL=create--VPtGww5.mjs.map
