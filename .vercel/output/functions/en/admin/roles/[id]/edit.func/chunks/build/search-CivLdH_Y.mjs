import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { p as productApiService } from './productApiService-DKwZsTgl.mjs';
import { P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { S as ShopFilterSidebar_default, a as ShopToolbar_default, _ as _sfc_main, b as ShopMobileFilterDrawer_default } from './ShopPagination-Dq7B4dcN.mjs';
import { S as ShopBreadcrumb_default } from './ShopBreadcrumb-BeSt_caF.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import '../virtual/entry.mjs';
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
import './useCart-CqauBZhc.mjs';
import './apiConfig-CCR2eNes.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';
import './Breadcrumbs-DbmDaiX_.mjs';

//#region pages/search/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { t, layoutDirection, currentLanguage } = useLanguage();
		const searchQuery = ref(route.query.q || route.query.name || "");
		const searchHeaderTitle = computed(() => {
			return layoutDirection.value === "ltr" ? "Search Results for" : "نتائج البحث عن";
		});
		const searchFoundCountText = computed(() => {
			if (layoutDirection.value === "ltr") return `Found ${totalResults.value} products`;
			return `تم العثور على ${totalResults.value} منتج`;
		});
		useHead$1({ title: computed(() => `${searchHeaderTitle.value}: ${searchQuery.value || "All"} | أسوار جدة`) });
		const breadcrumbTiers = computed(() => [{
			name: t("nav.home"),
			path: "/"
		}, {
			name: searchHeaderTitle.value,
			path: "#"
		}]);
		const isLoading = ref(true);
		const isMobileFilterOpen = ref(false);
		const products = ref([]);
		const viewMode = ref("grid-4");
		const sortBy = ref("default");
		const currentPage = ref(1);
		const totalPages = ref(1);
		const itemsPerPage = ref(12);
		const totalResults = ref(0);
		const defaultFilters = {
			priceMin: null,
			priceMax: null,
			brands: [],
			colors: [],
			inStock: false,
			onSale: false,
			freeShipping: false
		};
		const filters = ref({ ...defaultFilters });
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
			if (filters.value.inStock) chips.push({
				id: "inStock",
				label: t("product.in_stock")
			});
			return chips;
		});
		const fetchProducts = async () => {
			isLoading.value = true;
			try {
				const res = await productApiService.searchProducts({
					name: searchQuery.value,
					keyword: searchQuery.value,
					min_price: filters.value.priceMin ? Number(filters.value.priceMin) : void 0,
					max_price: filters.value.priceMax ? Number(filters.value.priceMax) : void 0,
					sort_by: sortBy.value,
					limit: itemsPerPage.value,
					offset: (currentPage.value - 1) * itemsPerPage.value
				});
				products.value = res.products;
				totalResults.value = res.total;
				totalPages.value = Math.max(1, Math.ceil(res.total / itemsPerPage.value));
			} catch (err) {
				console.warn("[SearchPage] Fetch error:", err);
				products.value = [];
				totalResults.value = 0;
			} finally {
				isLoading.value = false;
			}
		};
		const applyFilters = (newFilters) => {
			filters.value = { ...newFilters };
			currentPage.value = 1;
			fetchProducts();
		};
		const resetFilters = () => {
			filters.value = { ...defaultFilters };
			currentPage.value = 1;
			fetchProducts();
		};
		const removeFilter = (id) => {
			if (id === "price") {
				filters.value.priceMin = null;
				filters.value.priceMax = null;
			} else if (id === "brands") filters.value.brands = [];
			else if (id === "colors") filters.value.colors = [];
			else filters.value[id] = false;
			currentPage.value = 1;
			fetchProducts();
		};
		watch([
			sortBy,
			currentPage,
			currentLanguage
		], () => {
			fetchProducts();
		});
		watch(() => route.query.q, (newQ) => {
			searchQuery.value = newQ || "";
			currentPage.value = 1;
			fetchProducts();
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-slate-50/50 min-h-screen pb-16 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="container mx-auto px-4 max-w-7xl py-6 sm:py-8">`);
			_push(ssrRenderComponent(ShopBreadcrumb_default, { tiers: breadcrumbTiers.value }, null, _parent));
			_push(`<div class="mb-8 mt-6"><h1 class="text-2xl font-bold text-[#0B0E28] mb-2 text-start">${ssrInterpolate(searchHeaderTitle.value)}: <span class="text-amber-500">&quot;${ssrInterpolate(searchQuery.value)}&quot;</span></h1><p class="text-slate-500 text-sm font-medium text-start">${ssrInterpolate(searchFoundCountText.value)}</p></div><div class="flex flex-col lg:flex-row gap-6 lg:gap-8 w-full"><aside class="hidden lg:block w-full lg:w-[280px] shrink-0 sticky top-24 h-fit">`);
			_push(ssrRenderComponent(ShopFilterSidebar_default, {
				filters: filters.value,
				onUpdateFilters: applyFilters,
				onResetFilters: resetFilters
			}, null, _parent));
			_push(`</aside><main class="flex-1 w-full min-w-0 space-y-6">`);
			_push(ssrRenderComponent(ShopToolbar_default, {
				sortBy: sortBy.value,
				"onUpdate:sortBy": ($event) => sortBy.value = $event,
				viewMode: viewMode.value,
				"onUpdate:viewMode": ($event) => viewMode.value = $event,
				"total-results": totalResults.value,
				"items-per-page": itemsPerPage.value,
				"active-filters": activeFilterChips.value,
				onRemoveFilter: removeFilter,
				onClearFilters: resetFilters,
				onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true
			}, null, _parent));
			if (isLoading.value) {
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"><!--[-->`);
				ssrRenderList(itemsPerPage.value, (i) => {
					_push(`<div class="w-full bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100 animate-pulse flex flex-col gap-4"><div class="bg-slate-200/80 rounded-xl w-full aspect-square"></div><div class="flex-1 space-y-3 w-full"><div class="h-4 bg-slate-200/80 rounded-full w-3/4"></div><div class="h-3 bg-slate-200/80 rounded-full w-1/2"></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (products.value.length === 0) _push(`<div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center justify-center min-h-[400px] w-full space-y-6"><div class="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto text-3xl shadow-inner"><svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div><div class="space-y-2 max-w-md mx-auto"><h3 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("shop.no_products_title"))}</h3><p class="text-xs sm:text-sm text-slate-500 leading-relaxed">${ssrInterpolate(unref(layoutDirection) === "ltr" ? `No products found matching "${searchQuery.value}". Try broader search terms.` : `لم نجد أي منتجات تطابق "${searchQuery.value}". جرب استخدام كلمات بحث عامة.`)}</p></div><button class="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 cursor-pointer">${ssrInterpolate(unref(t)("shop.reset_filters"))}</button></div>`);
			else {
				_push(`<div class="${ssrRenderClass(["grid gap-6 w-full", viewMode.value === "list" ? "grid-cols-1" : viewMode.value === "grid-4" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"])}"><!--[-->`);
				ssrRenderList(products.value, (product) => {
					_push(ssrRenderComponent(ProductCard_default, {
						key: product.id,
						product,
						"view-mode": viewMode.value
					}, null, _parent));
				});
				_push(`<!--]--></div>`);
			}
			if (!isLoading.value && products.value.length > 0) _push(ssrRenderComponent(_sfc_main, {
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
				onClose: ($event) => isMobileFilterOpen.value = false,
				onUpdateFilters: applyFilters,
				onResetFilters: resetFilters
			}, null, _parent));
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region pages/search/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var search_default = index_vue_vue_type_script_setup_true_lang_default;

export { search_default as default };
//# sourceMappingURL=search-CivLdH_Y.mjs.map
