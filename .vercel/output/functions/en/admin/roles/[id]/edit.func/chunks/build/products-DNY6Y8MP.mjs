import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { b as useAdminLanguage } from '../virtual/entry.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useAdminProducts, P as ProductFormAdvanced_default } from './useAdminProducts-CVjbM0a2.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import 'nostics';
import 'unhead/utils';
import '../routes/renderer.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'nostics/formatters/ansi';
import 'vue-router';
import '@vue/shared';
import './RichTextEditor-UVwplTEi.mjs';
import './adminCategoriesApiService-nS8glRi_.mjs';
import './BaseSelect-mF2QR5Dg.mjs';

//#region pages/admin/products/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t } = useAdminLanguage();
		useHead$1({ title: computed(() => `${t("admin.products.title")} | ${t("admin.sidebar.panel_title")}`) });
		const { products, isLoading, isSubmitting, errorMessage, currentPage, lastPage, perPage, totalProducts, submitForm } = useAdminProducts();
		const activeView = ref("list");
		const searchQuery = ref("");
		const editingProduct = ref(null);
		const editingProductData = ref({});
		const filteredProducts = computed(() => {
			if (!searchQuery.value.trim()) return products.value;
			const query = searchQuery.value.toLowerCase();
			return products.value.filter((p) => p.name.toLowerCase().includes(query) || p.sku && p.sku.toLowerCase().includes(query) || p.category_name && p.category_name.toLowerCase().includes(query));
		});
		const isClientPaginated = computed(() => filteredProducts.value.length > perPage.value);
		const displayTotal = computed(() => {
			if (isClientPaginated.value) return filteredProducts.value.length;
			return totalProducts.value || filteredProducts.value.length;
		});
		const displayLastPage = computed(() => {
			if (isClientPaginated.value) return Math.ceil(filteredProducts.value.length / perPage.value) || 1;
			return lastPage.value || 1;
		});
		const paginatedProducts = computed(() => {
			if (isClientPaginated.value) {
				const start = (currentPage.value - 1) * perPage.value;
				return filteredProducts.value.slice(start, start + perPage.value);
			}
			return filteredProducts.value;
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
			const maxButtons = 5;
			let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2));
			let end = Math.min(displayLastPage.value, start + maxButtons - 1);
			if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);
			for (let i = start; i <= end; i++) pages.push(i);
			return pages;
		});
		const handleFormSubmit = async (payload) => {
			const isEdit = Boolean(editingProduct.value);
			const productId = editingProduct.value?.id;
			if (await submitForm(payload, isEdit, productId)) activeView.value = "list";
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.products.title"))}</h1><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(activeView.value === "list" ? unref(t)("admin.products.subtitle") : editingProduct.value ? unref(t)("admin.products.edit_product") : unref(t)("admin.products.add_product"))}</p></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			if (activeView.value === "list") _push(`<button class="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg><span>${ssrInterpolate(unref(t)("admin.products.add_product"))}</span></button>`);
			else _push(`<button class="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.back"))}</span></button>`);
			_push(`</div></div>`);
			if (activeView.value === "list") {
				_push(`<div class="space-y-6"><div class="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4"><div class="flex-1">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: searchQuery.value,
					"onUpdate:modelValue": ($event) => searchQuery.value = $event,
					placeholder: unref(t)("admin.common.search_placeholder")
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
				_push(`</div><button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-2 justify-center cursor-pointer disabled:opacity-50"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button></div>`);
				if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3"><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden relative">`);
				if (unref(isLoading)) {
					_push(`<div class="p-6 space-y-4"><div class="flex items-center justify-between border-b border-slate-100 pb-4"><div class="h-4 bg-slate-200 rounded w-1/4 animate-pulse"></div><div class="h-4 bg-slate-200 rounded w-1/6 animate-pulse"></div></div><!--[-->`);
					ssrRenderList(5, (i) => {
						_push(`<div class="flex items-center gap-4 py-3 border-b border-slate-50 last:border-0"><div class="w-12 h-12 bg-slate-200 rounded-xl animate-pulse shrink-0"></div><div class="flex-1 space-y-2"><div class="h-4 bg-slate-200 rounded w-1/3 animate-pulse"></div><div class="h-3 bg-slate-100 rounded w-1/5 animate-pulse"></div></div><div class="w-20 h-6 bg-slate-100 rounded-lg animate-pulse"></div><div class="w-16 h-6 bg-slate-200 rounded-md animate-pulse"></div></div>`);
					});
					_push(`<!--]--></div>`);
				} else if (filteredProducts.value.length === 0) _push(`<div class="p-12 text-center space-y-3"><svg class="w-12 h-12 text-slate-300 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg><p class="text-sm font-extrabold text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</p><button class="px-5 py-2 rounded-xl bg-amber-400 text-[#0B0E28] font-bold text-xs cursor-pointer">${ssrInterpolate(unref(t)("admin.products.add_product"))}</button></div>`);
				else {
					_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.products.product_name"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.products.category"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.products.price"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.products.stock"))}</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100/80"><!--[-->`);
					ssrRenderList(paginatedProducts.value, (product) => {
						_push(`<tr class="hover:bg-slate-50/50 transition-colors"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0"><img${ssrRenderAttr("src", product.thumbnail || "https://images.unsplash.com/photo-1626806819282-2c1dc01a5e0c?q=80&w=200&auto=format&fit=crop")} class="w-full h-full object-cover" alt="Product Image"></div><div class="flex flex-col"><span class="font-bold text-slate-900">${ssrInterpolate(product.name)}</span><span class="text-xs text-slate-400">SKU: ${ssrInterpolate(product.sku)}</span></div></div></td><td class="px-6 py-4 text-slate-600 font-medium text-start">${ssrInterpolate(product.category_name)}</td><td class="px-6 py-4 font-black text-slate-900 text-start">${ssrInterpolate(product.unit_price)} ${ssrInterpolate(unref(t)("admin.common.currency"))}</td><td class="px-6 py-4 text-start"><span class="${ssrRenderClass([product.current_stock > 5 ? "bg-emerald-50 text-emerald-700" : product.current_stock > 0 ? "bg-amber-50 text-amber-700" : "bg-rose-50 text-rose-700", "px-2.5 py-1 rounded-md text-xs font-extrabold"])}">${ssrInterpolate(product.current_stock > 0 ? `${unref(t)("admin.products.in_stock")} (${product.current_stock})` : unref(t)("admin.products.out_of_stock"))}</span></td><td class="px-6 py-4"><div class="flex items-center justify-center gap-2"><button class="w-8 h-8 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.edit"))}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button><button class="w-8 h-8 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.delete"))}><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
					});
					_push(`<!--]--></tbody></table></div>`);
				}
				if (!unref(isLoading) && filteredProducts.value.length > 0) {
					_push(`<div class="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-500"><div>${ssrInterpolate(startItem.value)} - ${ssrInterpolate(endItem.value)} (${ssrInterpolate(unref(t)("admin.common.total"))}: ${ssrInterpolate(displayTotal.value)}) </div><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.back"))}</span></button><!--[-->`);
					ssrRenderList(visiblePages.value, (p) => {
						_push(`<button class="${ssrRenderClass([p === unref(currentPage) ? "bg-[#0B0E28] text-white shadow-sm" : "border border-slate-200 text-slate-700 hover:bg-slate-50", "w-8 h-8 rounded-xl font-extrabold flex items-center justify-center transition-colors cursor-pointer"])}">${ssrInterpolate(p)}</button>`);
					});
					_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) >= displayLastPage.value || unref(isLoading)) ? " disabled" : ""} class="px-3 py-2 rounded-xl border border-slate-200 flex items-center gap-1 hover:bg-slate-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"><span>${ssrInterpolate(unref(t)("admin.common.view"))}</span><svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button></div></div>`);
				} else _push(`<!---->`);
				_push(`</div></div>`);
			} else if (activeView.value === "form") {
				_push(`<div>`);
				_push(ssrRenderComponent(ProductFormAdvanced_default, {
					"initial-data": editingProductData.value,
					"is-edit-mode": Boolean(editingProduct.value),
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
//#region pages/admin/products/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/products/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var products_default = index_vue_vue_type_script_setup_true_lang_default;

export { products_default as default };
//# sourceMappingURL=products-DNY6Y8MP.mjs.map
