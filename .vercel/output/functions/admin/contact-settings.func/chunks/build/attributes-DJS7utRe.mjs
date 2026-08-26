import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useAdminAttributes, A as AttributeFormAdvanced_default } from './useAdminAttributes-fz4oNP16.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
import 'vue-router';
import '@vue/shared';
import 'unhead/utils';

//#region pages/admin/attributes/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `${t("admin.attributes.title")} | ${t("admin.sidebar.panel_title")}`) });
		const { attributes, isLoading, isSubmitting, errorMessage, currentPage, lastPage, perPage, totalAttributes, fetchAttributes, submitForm } = useAdminAttributes();
		const activeView = ref("list");
		const searchQuery = ref("");
		const editingAttribute = ref(null);
		let searchDebounceTimeout = null;
		const onSearchInput = () => {
			if (searchDebounceTimeout) clearTimeout(searchDebounceTimeout);
			searchDebounceTimeout = setTimeout(() => {
				fetchAttributes(searchQuery.value, 1, perPage.value);
			}, 400);
		};
		const filteredAttributes = computed(() => attributes.value);
		const isClientPaginated = computed(() => filteredAttributes.value.length > perPage.value);
		const displayTotal = computed(() => {
			if (isClientPaginated.value) return filteredAttributes.value.length;
			return totalAttributes.value || filteredAttributes.value.length;
		});
		const displayLastPage = computed(() => {
			if (isClientPaginated.value) return Math.ceil(filteredAttributes.value.length / perPage.value) || 1;
			return lastPage.value || 1;
		});
		const paginatedAttributes = computed(() => {
			if (isClientPaginated.value) {
				const start = (currentPage.value - 1) * perPage.value;
				return filteredAttributes.value.slice(start, start + perPage.value);
			}
			return filteredAttributes.value;
		});
		const startItem = computed(() => {
			if (displayTotal.value === 0) return 0;
			return (currentPage.value - 1) * perPage.value + 1;
		});
		const endItem = computed(() => {
			return Math.min(currentPage.value * perPage.value, displayTotal.value);
		});
		const visiblePages = computed(() => {
			const pages = [];
			const maxPages = displayLastPage.value;
			const start = Math.max(1, currentPage.value - 2);
			const end = Math.min(maxPages, start + 4);
			for (let i = start; i <= end; i++) pages.push(i);
			return pages;
		});
		const editingAttributeData = computed(() => {
			if (!editingAttribute.value) return {};
			const a = editingAttribute.value;
			return {
				id: a.id,
				name_ar: a.name_ar || a.name,
				name_en: a.name_en || ""
			};
		});
		const handleFormSubmit = async (payload) => {
			const isEdit = Boolean(editingAttribute.value);
			const attributeId = editingAttribute.value?.id;
			if (await submitForm(payload, isEdit, attributeId)) {
				editingAttribute.value = null;
				activeView.value = "list";
				await fetchAttributes(searchQuery.value, currentPage.value, perPage.value);
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.attributes.title"))}</h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(activeView.value === "list" ? unref(t)("admin.attributes.subtitle") : editingAttribute.value ? unref(t)("admin.attributes.edit_attribute") : unref(t)("admin.attributes.add_attribute"))}</p></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			if (activeView.value === "list") _push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/attributes/create",
				class: "w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("admin.attributes.add_attribute"))}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2.5"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M12 4v16m8-8H4"
					})])), createVNode("span", null, toDisplayString(unref(t)("admin.attributes.add_attribute")), 1)];
				}),
				_: 1
			}, _parent));
			else _push(`<button class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.back"))}</span></button>`);
			_push(`</div></div>`);
			if (activeView.value === "list") {
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div class="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg></div><div><span class="text-xs font-bold text-slate-400 block">${ssrInterpolate(unref(t)("admin.common.total"))}</span><div class="flex items-center gap-2">`);
				if (!unref(isLoading)) _push(`<span class="text-2xl font-black text-slate-900">${ssrInterpolate(displayTotal.value)}</span>`);
				else _push(`<div class="h-7 w-12 bg-slate-200 animate-pulse rounded-lg mt-1"></div>`);
				_push(`</div></div></div></div>`);
			} else _push(`<!---->`);
			if (activeView.value === "list") {
				_push(`<div class="space-y-6"><div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-center"><div class="w-full md:w-96">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: searchQuery.value,
					"onUpdate:modelValue": ($event) => searchQuery.value = $event,
					placeholder: unref(t)("admin.common.search_placeholder"),
					onInput: onSearchInput
				}, {
					icon: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-5 h-5 text-slate-400",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="flex items-center gap-3 w-full md:w-auto justify-end"><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50 transition-colors"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button></div></div>`);
				if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3"><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">`);
				if (unref(isLoading)) {
					_push(`<div class="p-6 space-y-4"><!--[-->`);
					ssrRenderList(5, (i) => {
						_push(`<div class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0"><div class="w-10 h-10 bg-slate-200 rounded-2xl animate-pulse shrink-0"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div><div class="h-3 bg-slate-100 rounded w-1/6 animate-pulse"></div></div><div class="w-16 h-6 bg-slate-200 rounded-md animate-pulse"></div></div>`);
					});
					_push(`<!--]--></div>`);
				} else if (filteredAttributes.value.length === 0) {
					_push(`<div class="p-12 text-center space-y-3"><svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg><p class="text-sm font-extrabold text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</p>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/admin/attributes/create",
						class: "px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs inline-block cursor-pointer"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`${ssrInterpolate(unref(t)("admin.attributes.add_attribute"))}`);
							else return [createTextVNode(toDisplayString(unref(t)("admin.attributes.add_attribute")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div>`);
				} else {
					_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">#</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.attributes.attribute_name"))}</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100/80"><!--[-->`);
					ssrRenderList(paginatedAttributes.value, (attribute, idx) => {
						_push(`<tr class="hover:bg-slate-50/50 transition-colors"><td class="px-6 py-4 text-slate-400 font-bold text-xs">${ssrInterpolate(startItem.value + idx)}</td><td class="px-6 py-4"><div class="flex flex-col"><span class="font-extrabold text-[#0B0E28] text-base">${ssrInterpolate(attribute.name_ar || attribute.name)}</span>`);
						if (attribute.name_en) _push(`<span class="text-xs text-slate-400 font-medium" dir="ltr">en: ${ssrInterpolate(attribute.name_en)}</span>`);
						else _push(`<!---->`);
						_push(`</div></td><td class="px-6 py-4"><div class="flex items-center justify-center gap-2">`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: `/admin/attributes/${attribute.id}`,
							class: "w-8 h-8 rounded-xl text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer",
							title: unref(t)("admin.common.edit")
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"${_scopeId}></path></svg>`);
								else return [(openBlock(), createBlock("svg", {
									class: "w-4 h-4",
									fill: "none",
									viewBox: "0 0 24 24",
									stroke: "currentColor",
									"stroke-width": "2"
								}, [createVNode("path", {
									"stroke-linecap": "round",
									"stroke-linejoin": "round",
									d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
								})]))];
							}),
							_: 2
						}, _parent));
						_push(`<button class="w-8 h-8 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.delete"))}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
					});
					_push(`<!--]--></tbody></table></div>`);
				}
				if (!unref(isLoading) && filteredAttributes.value.length > 0) {
					_push(`<div class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500"><div>${ssrInterpolate(startItem.value)} - ${ssrInterpolate(endItem.value)} (${ssrInterpolate(unref(t)("admin.common.total"))}: ${ssrInterpolate(displayTotal.value)}) </div><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.back"))}</span></button><!--[-->`);
					ssrRenderList(visiblePages.value, (p) => {
						_push(`<button class="${ssrRenderClass([p === unref(currentPage) ? "bg-[#0B0E28] text-white shadow-sm" : "border border-slate-200 text-slate-700 hover:bg-slate-50", "w-8 h-8 rounded-xl font-extrabold flex items-center justify-center transition-colors cursor-pointer"])}">${ssrInterpolate(p)}</button>`);
					});
					_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) >= displayLastPage.value || unref(isLoading)) ? " disabled" : ""} class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"><span>${ssrInterpolate(unref(t)("admin.common.view"))}</span><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button></div></div>`);
				} else _push(`<!---->`);
				_push(`</div></div>`);
			} else if (activeView.value === "form") {
				_push(`<div>`);
				_push(ssrRenderComponent(AttributeFormAdvanced_default, {
					"initial-data": editingAttributeData.value,
					"is-edit-mode": Boolean(editingAttribute.value),
					"is-submitting": unref(isSubmitting),
					onSubmit: handleFormSubmit,
					onCancel: ($event) => activeView.value = "list"
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/attributes/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/attributes/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var attributes_default = index_vue_vue_type_script_setup_true_lang_default;

export { attributes_default as default };
//# sourceMappingURL=attributes-DJS7utRe.mjs.map
