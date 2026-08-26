import { n as navigateTo } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { _ as _sfc_main$1 } from './EmptyState-DApFxOYg.mjs';
import { u as useProducts } from './useProducts-BMlxn0rw.mjs';
import { u as useCategories } from './useCategories-mcAJj4mX.mjs';
import { u as useBrands, P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { S as ShopFilterSidebar_default, a as ShopToolbar_default, _ as _sfc_main$2, b as ShopMobileFilterDrawer_default } from './ShopPagination-Dq7B4dcN.mjs';
import { _ as _sfc_main } from './ProductCardSkeleton-BU0A1QbE.mjs';
import { C as CategoryHierarchyBar_default } from './CategoryHierarchyBar-D7wNBy_Z.mjs';
import { S as ShopBreadcrumb_default } from './ShopBreadcrumb-BeSt_caF.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
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
import './productApiService-DKwZsTgl.mjs';
import './useCart-CqauBZhc.mjs';
import './apiConfig-CCR2eNes.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';
import './Breadcrumbs-DbmDaiX_.mjs';

//#region pages/shop/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, currentLanguage, apiLocale } = useLanguage();
		const { products, pending: productsPending, error: productsError, isEmpty, totalProducts, fetchFilteredProducts } = useProducts();
		const { categories } = useCategories();
		const { brands } = useBrands();
		const breadcrumbTiers = computed(() => [{
			name: t("nav.home"),
			path: "/"
		}, {
			name: t("nav.shop"),
			path: "/shop"
		}]);
		const isMobileFilterOpen = ref(false);
		const viewMode = ref("grid-4");
		const sortBy = ref("default");
		const currentPage = ref(1);
		const itemsPerPage = ref(12);
		const selectedCategoryId = ref(null);
		const defaultFilters = {
			priceMin: null,
			priceMax: null,
			brands: [],
			categoryId: [],
			inStock: false
		};
		const filters = ref({ ...defaultFilters });
		const gridClass = computed(() => {
			if (viewMode.value === "list") return "flex flex-col gap-4 w-full";
			else if (viewMode.value === "grid-3") return "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full";
			else return "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full";
		});
		const activeFilterChips = computed(() => {
			const chips = [];
			if (filters.value.priceMin || filters.value.priceMax) chips.push({
				id: "price",
				label: `${t("product.price")}: ${filters.value.priceMin || 0} - ${filters.value.priceMax || "Max"}`
			});
			if (filters.value.brands.length) chips.push({
				id: "brands",
				label: `${filters.value.brands.length} ${layoutDirection.value === "ltr" ? "Brands" : "ماركات"}`
			});
			if (selectedCategoryId.value) {
				const foundCat = categories.value.find((c) => String(c.id) === String(selectedCategoryId.value));
				if (foundCat) chips.push({
					id: "category",
					label: `${t("product.category")}: ${foundCat.name}`
				});
			}
			if (filters.value.inStock) chips.push({
				id: "inStock",
				label: t("product.in_stock")
			});
			return chips;
		});
		const totalPages = computed(() => Math.ceil((totalProducts.value || 1) / itemsPerPage.value));
		const fetchShopProducts = () => {
			const selectedBrandId = filters.value.brands.length > 0 ? filters.value.brands[0] : void 0;
			const activeCatId = selectedCategoryId.value || (Array.isArray(filters.value.categoryId) && filters.value.categoryId.length > 0 ? filters.value.categoryId[0] : void 0);
			fetchFilteredProducts({
				limit: itemsPerPage.value,
				page: currentPage.value,
				offset: (currentPage.value - 1) * itemsPerPage.value,
				category_id: activeCatId || void 0,
				brand_id: selectedBrandId || void 0,
				locale: apiLocale.value,
				min_price: filters.value.priceMin || void 0,
				max_price: filters.value.priceMax || void 0,
				sort_by: sortBy.value === "default" ? "latest" : sortBy.value
			});
		};
		const handleCategorySelect = (catId) => {
			const targetSlug = categories.value.find((c) => String(c.id) === String(catId))?.slug || catId;
			navigateTo(`/category/${targetSlug}`);
		};
		const applyFilters = (newFilters) => {
			filters.value = { ...newFilters };
			if (Array.isArray(newFilters.categoryId) && newFilters.categoryId.length > 0) selectedCategoryId.value = newFilters.categoryId[0];
			currentPage.value = 1;
			fetchShopProducts();
		};
		const resetFilters = () => {
			filters.value = { ...defaultFilters };
			selectedCategoryId.value = null;
			currentPage.value = 1;
			fetchShopProducts();
		};
		const removeFilter = (id) => {
			if (id === "price") {
				filters.value.priceMin = null;
				filters.value.priceMax = null;
			} else if (id === "brands") filters.value.brands = [];
			else if (id === "category") {
				selectedCategoryId.value = null;
				filters.value.categoryId = [];
			} else filters.value[id] = false;
			fetchShopProducts();
		};
		watch([
			currentPage,
			sortBy,
			apiLocale,
			currentLanguage
		], () => {
			fetchShopProducts();
		});
		watch(filters, () => {
			currentPage.value = 1;
			fetchShopProducts();
		}, { deep: true });
		useHead$1({ title: computed(() => `${t("shop.title")} | ${layoutDirection.value === "ltr" ? "Aswar Jeddah" : "أسوار جدة"}`) });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-slate-50/50 min-h-screen pb-16 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="container mx-auto px-4 max-w-7xl py-6 sm:py-8">`);
			_push(ssrRenderComponent(ShopBreadcrumb_default, { tiers: breadcrumbTiers.value }, null, _parent));
			_push(`<div class="mb-6 mt-4"><h1 class="text-2xl sm:text-3xl font-black text-[#0B0E28] mb-2 text-start">${ssrInterpolate(unref(t)("shop.title"))}</h1><p class="text-xs sm:text-sm text-slate-500 mb-6 text-start">${ssrInterpolate(unref(t)("shop.subtitle"))}</p>`);
			if (unref(categories) && unref(categories).length > 0) _push(ssrRenderComponent(CategoryHierarchyBar_default, {
				categories: unref(categories),
				"selected-category-id": selectedCategoryId.value,
				onSelectCategory: handleCategorySelect
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div><div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full"><aside class="hidden lg:block w-full lg:w-[280px] shrink-0 sticky top-24 h-fit">`);
			_push(ssrRenderComponent(ShopFilterSidebar_default, {
				filters: filters.value,
				categories: unref(categories),
				brands: unref(brands),
				onUpdateFilters: applyFilters,
				onResetFilters: resetFilters
			}, null, _parent));
			_push(`</aside><main class="flex-1 w-full min-w-0 space-y-6">`);
			_push(ssrRenderComponent(ShopToolbar_default, {
				sortBy: sortBy.value,
				"onUpdate:sortBy": ($event) => sortBy.value = $event,
				viewMode: viewMode.value,
				"onUpdate:viewMode": ($event) => viewMode.value = $event,
				"total-results": unref(totalProducts) || unref(products).length,
				"items-per-page": itemsPerPage.value,
				"active-filters": activeFilterChips.value,
				onRemoveFilter: removeFilter,
				onClearFilters: resetFilters,
				onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true
			}, null, _parent));
			if (unref(productsPending)) {
				_push(`<div class="${ssrRenderClass(gridClass.value)}"><!--[-->`);
				ssrRenderList(itemsPerPage.value, (i) => {
					_push(ssrRenderComponent(_sfc_main, { key: i }, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else if (unref(productsError)) _push(`<div class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-3 my-6"><div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl"><i class="fa-solid fa-triangle-exclamation"></i></div><h3 class="text-base font-bold text-red-800">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Failed to load products from server" : "تعذر تحميل المنتجات من السيرفر")}</h3><p class="text-xs text-red-600 max-w-md mx-auto">${ssrInterpolate(unref(productsError))}</p><button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"><i class="fa-solid fa-rotate-right text-xs"></i> ${ssrInterpolate(unref(t)("shop.retry"))}</button></div>`);
			else if (unref(isEmpty)) _push(ssrRenderComponent(_sfc_main$1, {
				title: unref(t)("shop.no_products_title"),
				description: unref(t)("shop.no_products_desc"),
				actionText: unref(t)("shop.reset_filters"),
				onAction: resetFilters
			}, {
				icon: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-10 h-10 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><circle cx="11" cy="11" r="8"${_scopeId}></circle><line x1="21" y1="21" x2="16.65" y2="16.65"${_scopeId}></line></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-10 h-10 text-slate-400",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}, [createVNode("circle", {
						cx: "11",
						cy: "11",
						r: "8"
					}), createVNode("line", {
						x1: "21",
						y1: "21",
						x2: "16.65",
						y2: "16.65"
					})]))];
				}),
				_: 1
			}, _parent));
			else {
				_push(`<div class="${ssrRenderClass(["grid gap-6 w-full", viewMode.value === "list" ? "grid-cols-1" : viewMode.value === "grid-4" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"])}"><!--[-->`);
				ssrRenderList(unref(products), (product) => {
					_push(ssrRenderComponent(ProductCard_default, {
						key: product.id,
						product,
						"view-mode": viewMode.value
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			if (!unref(productsPending) && unref(products).length > 0) _push(ssrRenderComponent(_sfc_main$2, {
				"current-page": currentPage.value,
				"onUpdate:currentPage": ($event) => currentPage.value = $event,
				"total-pages": totalPages.value,
				class: "pt-6"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</main></div>`);
			_push(ssrRenderComponent(ShopMobileFilterDrawer_default, {
				"is-open": isMobileFilterOpen.value,
				filters: filters.value,
				categories: unref(categories),
				brands: unref(brands),
				onClose: ($event) => isMobileFilterOpen.value = false,
				onUpdateFilters: applyFilters,
				onResetFilters: resetFilters
			}, null, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region pages/shop/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var shop_default = index_vue_vue_type_script_setup_true_lang_default;

export { shop_default as default };
//# sourceMappingURL=shop-B2psNGKu.mjs.map
