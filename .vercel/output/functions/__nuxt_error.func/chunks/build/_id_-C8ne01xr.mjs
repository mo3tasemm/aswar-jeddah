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

//#region pages/admin/navbar/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const itemId = computed(() => route.params.id);
		const { adminDir } = useAdminLanguage();
		const { rawItems, parentOptions, dbCategories, dbBrands, isLoading, isSubmitting, updateNavbarItem } = useAdminNavbar();
		const currentItem = computed(() => {
			return rawItems.value.find((i) => String(i.id) === itemId.value);
		});
		useHead$1({ title: computed(() => `تعديل ${currentItem.value?.title_ar || currentItem.value?.title || "عنصر القائمة"} | لوحة تحكم أسوار جدة`) });
		const handleUpdate = async (payload) => {
			await updateNavbarItem(itemId.value, payload);
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
			_push(`<div><h1 class="text-2xl font-black text-slate-900"> تعديل عنصر القائمة: &quot;${ssrInterpolate(currentItem.value?.title_ar || currentItem.value?.title || "جاري التحميل...")}&quot; </h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium"> قم بتحديث الروابط، العناوين، الأيقونات أو الشارات الترويجية وحفظ التغييرات فوراً. </p></div></div>`);
			if (unref(isLoading) && !currentItem.value) _push(`<div class="bg-white rounded-3xl p-8 border border-slate-100 space-y-6 animate-pulse"><div class="h-10 bg-slate-100 rounded-xl w-1/3"></div><div class="grid grid-cols-2 gap-4"><div class="h-12 bg-slate-100 rounded-xl"></div><div class="h-12 bg-slate-100 rounded-xl"></div></div><div class="h-40 bg-slate-100 rounded-2xl"></div></div>`);
			else _push(ssrRenderComponent(NavbarItemForm_default, {
				"is-edit-mode": true,
				"initial-data": currentItem.value || {},
				"is-submitting": unref(isSubmitting),
				"parent-options": unref(parentOptions),
				"db-categories": unref(dbCategories),
				"db-brands": unref(dbBrands),
				onSubmit: handleUpdate,
				onCancel: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/admin/navbar")
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/navbar/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/navbar/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-C8ne01xr.mjs.map
