import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { _ as _sfc_main$1 } from './EmptyState-DApFxOYg.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { u as useProducts } from './useProducts-BMlxn0rw.mjs';
import { u as useCategories } from './useCategories-mcAJj4mX.mjs';
import { u as useBrands, P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { g as getProductsByBrand } from './productService-DOFzoJXT.mjs';
import { S as ShopFilterSidebar_default, a as ShopToolbar_default, _ as _sfc_main$2, b as ShopMobileFilterDrawer_default } from './ShopPagination-Dq7B4dcN.mjs';
import { _ as _sfc_main } from './ProductCardSkeleton-BU0A1QbE.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
import './productApiService-DKwZsTgl.mjs';
import './useCart-CqauBZhc.mjs';
import './apiConfig-CCR2eNes.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';

//#region pages/brand/[...slug].vue?vue&type=script&setup=true&lang.ts
var ____slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[...slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { t, apiLocale, currentLanguage, layoutDirection } = useLanguage();
		const { products, pending: productsPending, error: productsError, isEmpty, totalProducts, fetchFilteredProducts } = useProducts();
		const { categories, loadCategories } = useCategories();
		const { brands, loadBrands } = useBrands();
		const routeSlug = computed(() => {
			const s = route.params.slug;
			if (!s) return "";
			if (Array.isArray(s)) return s.join("-");
			return String(s);
		});
		const getBrandSlug = (b) => {
			if (!b) return "";
			if (b.slug) return String(b.slug);
			return (b.name_en || b.name || String(b.id)).toLowerCase().replace(/\s+/g, "-");
		};
		const getBrandName = (b) => {
			if (!b) return "";
			if (currentLanguage.value === "en") return b.name_en || b.name || b.name_ar || "";
			return b.name_ar || b.name || b.name_en || "";
		};
		const currentBrand = computed(() => {
			const slug = routeSlug.value.toLowerCase().trim();
			if (!slug) return null;
			return brands.value.find((b) => {
				const bId = String(b.id).toLowerCase();
				const bName = (b.name || "").toLowerCase();
				const bNameAr = (b.name_ar || "").toLowerCase();
				const bNameEn = (b.name_en || "").toLowerCase();
				const bSlug = getBrandSlug(b).toLowerCase();
				return bId === slug || bSlug === slug || bName === slug || bNameEn === slug || bNameAr === slug;
			}) || null;
		});
		const displayBrandName = computed(() => {
			if (currentBrand.value) return getBrandName(currentBrand.value);
			const raw = routeSlug.value;
			return raw ? raw.replace(/-/g, " ").toUpperCase() : layoutDirection.value === "ltr" ? "Brand" : "العلامة التجارية";
		});
		const displayBrandLogo = computed(() => {
			if (currentBrand.value) return currentBrand.value.image || currentBrand.value.logo || currentBrand.value.image_full_url || "";
			return "";
		});
		const displayTotalCount = computed(() => {
			if (productsPending.value) return 0;
			return totalProducts.value || products.value.length || 0;
		});
		const otherBrands = computed(() => {
			if (!brands.value || brands.value.length === 0) return [];
			const currentId = currentBrand.value?.id;
			return brands.value.filter((b) => b.id !== currentId).slice(0, 10);
		});
		const breadcrumbItems = computed(() => {
			const isEn = layoutDirection.value === "ltr";
			return [
				{
					label: isEn ? "Home" : "الرئيسية",
					to: "/"
				},
				{
					label: isEn ? "Shop" : "المتجر",
					to: "/shop"
				},
				{ label: displayBrandName.value }
			];
		});
		const viewMode = ref("grid-4");
		const sortBy = ref("default");
		const currentPage = ref(1);
		const itemsPerPage = ref(12);
		const isMobileFilterOpen = ref(false);
		const defaultFilters = {
			priceMin: null,
			priceMax: null,
			brands: [],
			categoryId: [],
			inStock: false
		};
		const filters = ref({ ...defaultFilters });
		const totalPages = computed(() => Math.ceil((displayTotalCount.value || 1) / itemsPerPage.value));
		const activeFilterChips = computed(() => {
			const chips = [];
			const isEn = layoutDirection.value === "ltr";
			if (filters.value.priceMin || filters.value.priceMax) {
				const min = filters.value.priceMin || 0;
				const max = filters.value.priceMax || (isEn ? "All" : "الكل");
				chips.push({
					id: "price",
					label: isEn ? `Price: ${min} - ${max} SAR` : `السعر: ${min} - ${max} ر.س`
				});
			}
			if (filters.value.categoryId.length) chips.push({
				id: "category",
				label: isEn ? `${filters.value.categoryId.length} Categories` : `${filters.value.categoryId.length} أقسام`
			});
			if (filters.value.inStock) chips.push({
				id: "inStock",
				label: isEn ? "In Stock" : "متاح بالمخزون"
			});
			return chips;
		});
		const fetchBrandProducts = async () => {
			if (brands.value.length === 0) await loadBrands(true);
			if (categories.value.length === 0) loadCategories();
			const brandId = currentBrand.value?.id || (!isNaN(Number(routeSlug.value)) ? Number(routeSlug.value) : void 0);
			const selectedCategoryId = filters.value.categoryId.length > 0 ? filters.value.categoryId[0] : void 0;
			if (brandId) await fetchFilteredProducts({
				brand_id: brandId,
				category_id: selectedCategoryId || void 0,
				locale: apiLocale.value,
				limit: itemsPerPage.value,
				page: currentPage.value,
				offset: (currentPage.value - 1) * itemsPerPage.value,
				min_price: filters.value.priceMin || void 0,
				max_price: filters.value.priceMax || void 0,
				sort_by: sortBy.value === "default" ? "latest" : sortBy.value
			});
			else {
				const searchKeyword = currentBrand.value?.name || routeSlug.value.replace(/-/g, " ");
				await fetchFilteredProducts({
					search: searchKeyword,
					category_id: selectedCategoryId || void 0,
					locale: apiLocale.value,
					limit: itemsPerPage.value,
					page: currentPage.value,
					offset: (currentPage.value - 1) * itemsPerPage.value,
					min_price: filters.value.priceMin || void 0,
					max_price: filters.value.priceMax || void 0,
					sort_by: sortBy.value === "default" ? "latest" : sortBy.value
				});
			}
			if (products.value.length === 0) {
				const mockList = getProductsByBrand(displayBrandName.value);
				if (mockList.length > 0) {
					products.value = mockList;
					totalProducts.value = mockList.length;
				}
			}
		};
		const initBrandPage = async () => {
			filters.value = { ...defaultFilters };
			currentPage.value = 1;
			if (brands.value.length === 0) await loadBrands(true);
			if (categories.value.length === 0) loadCategories();
			await fetchBrandProducts();
		};
		const applyFilters = (newFilters) => {
			filters.value = { ...newFilters };
			currentPage.value = 1;
			fetchBrandProducts();
		};
		const resetFilters = () => {
			filters.value = { ...defaultFilters };
			currentPage.value = 1;
			fetchBrandProducts();
		};
		const removeFilter = (id) => {
			if (id === "price") {
				filters.value.priceMin = null;
				filters.value.priceMax = null;
			} else if (id === "category") filters.value.categoryId = [];
			else filters.value[id] = false;
			fetchBrandProducts();
		};
		watch([currentPage, sortBy], () => {
			fetchBrandProducts();
		});
		watch(filters, () => {
			currentPage.value = 1;
			fetchBrandProducts();
		}, { deep: true });
		watch(() => route.params.slug, () => {
			initBrandPage();
		});
		watch([apiLocale, currentLanguage], () => {
			initBrandPage();
		});
		useHead$1({ title: computed(() => `${displayBrandName.value} | ${layoutDirection.value === "ltr" ? "Aswar Jeddah" : "أسوار جدة"}`) });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-slate-50/50 min-h-screen pb-16",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="container mx-auto px-4 max-w-7xl">`);
			_push(ssrRenderComponent(Breadcrumbs_default, { items: breadcrumbItems.value }, null, _parent));
			_push(`<div class="mb-8 mt-6"><div class="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"><div class="flex items-center gap-5 z-10"><div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0 shadow-inner overflow-hidden">`);
			if (displayBrandLogo.value) _push(`<img${ssrRenderAttr("src", displayBrandLogo.value)}${ssrRenderAttr("alt", displayBrandName.value)} class="w-full h-full object-contain">`);
			else _push(`<div class="w-full h-full rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-2xl uppercase">${ssrInterpolate(displayBrandName.value.charAt(0))}</div>`);
			_push(`</div><div class="space-y-1.5"><div class="flex items-center gap-3 flex-wrap"><h1 class="text-2xl sm:text-3xl font-black text-[#0B0E28]">${ssrInterpolate(displayBrandName.value)}</h1>`);
			if (!unref(productsPending)) _push(`<span class="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100/80">${ssrInterpolate(displayTotalCount.value)} ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Products" : "منتج")}</span>`);
			else _push(`<span class="w-16 h-5 bg-slate-100 rounded-full animate-pulse"></span>`);
			_push(`</div><p class="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed font-medium">${ssrInterpolate(unref(layoutDirection) === "ltr" ? `Discover the latest genuine products and exclusive offers from ${displayBrandName.value}.` : `اكتشف أحدث المنتجات الأصلية والعروض الحصرية المتوفرة من ماركة ${displayBrandName.value}.`)}</p></div></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/shop",
				class: "z-10 px-5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "All Brands & Products" : "كافة الماركات والمنتجات")}</span><i class="fa-solid fa-arrow-left text-[11px] rtl:rotate-0 rotate-180"${_scopeId}></i>`);
					else return [createVNode("span", null, toDisplayString(unref(layoutDirection) === "ltr" ? "All Brands & Products" : "كافة الماركات والمنتجات"), 1), createVNode("i", { class: "fa-solid fa-arrow-left text-[11px] rtl:rotate-0 rotate-180" })];
				}),
				_: 1
			}, _parent));
			_push(`<div class="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div></div>`);
			if (otherBrands.value && otherBrands.value.length > 0) {
				_push(`<div class="mt-4 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar"><span class="text-xs font-bold text-slate-400 shrink-0 px-1">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Other Brands:" : "ماركات أخرى:")}</span><!--[-->`);
				ssrRenderList(otherBrands.value, (b) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: b.id,
						to: `/brand/${getBrandSlug(b)}`,
						class: "px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-indigo-500 hover:text-indigo-600 text-slate-700 text-xs font-bold transition-all shrink-0 flex items-center gap-2 shadow-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								if (b.image || b.logo) _push(`<img${ssrRenderAttr("src", b.image || b.logo)}${ssrRenderAttr("alt", b.name)} class="w-4 h-4 object-contain"${_scopeId}>`);
								else _push(`<!---->`);
								_push(`<span${_scopeId}>${ssrInterpolate(getBrandName(b))}</span>`);
							} else return [b.image || b.logo ? (openBlock(), createBlock("img", {
								key: 0,
								src: b.image || b.logo,
								alt: b.name,
								class: "w-4 h-4 object-contain"
							}, null, 8, ["src", "alt"])) : createCommentVNode("", true), createVNode("span", null, toDisplayString(getBrandName(b)), 1)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
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
				"total-results": displayTotalCount.value,
				"items-per-page": itemsPerPage.value,
				"active-filters": activeFilterChips.value,
				onRemoveFilter: removeFilter,
				onClearFilters: resetFilters,
				onOpenMobileFilter: ($event) => isMobileFilterOpen.value = true
			}, null, _parent));
			if (unref(productsPending)) {
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full"><!--[-->`);
				ssrRenderList(itemsPerPage.value, (i) => {
					_push(ssrRenderComponent(_sfc_main, { key: i }, null, _parent));
				});
				_push(`<!--]--></div>`);
			} else if (unref(productsError)) _push(`<div class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center space-y-3 my-6"><div class="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto text-xl"><i class="fa-solid fa-triangle-exclamation"></i></div><h3 class="text-base font-bold text-red-800">${ssrInterpolate(unref(t)("category.error_title"))}</h3><p class="text-xs text-red-600 max-w-md mx-auto">${ssrInterpolate(unref(productsError))}</p><button class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 shadow-sm cursor-pointer"><i class="fa-solid fa-rotate-right text-xs"></i> ${ssrInterpolate(unref(t)("shop.retry"))}</button></div>`);
			else if (unref(isEmpty) || !unref(productsPending) && unref(products).length === 0) _push(ssrRenderComponent(_sfc_main$1, {
				title: unref(layoutDirection) === "ltr" ? `No products found for ${displayBrandName.value}` : `لا توجد منتجات متوفرة لماركة ${displayBrandName.value}`,
				description: unref(layoutDirection) === "ltr" ? "Try adjusting your filters or browsing other brands." : "يرجى تجربة تعديل الفلاتر أو تصفح علامات تجارية أخرى.",
				actionText: unref(t)("category.reset_filters"),
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
			if (!unref(productsPending) && unref(products).length > 0 && totalPages.value > 1) _push(ssrRenderComponent(_sfc_main$2, {
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
//#region pages/brand/[...slug].vue
var _sfc_setup = ____slug__vue_vue_type_script_setup_true_lang_default.setup;
____slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/brand/[...slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ____slug__default = ____slug__vue_vue_type_script_setup_true_lang_default;

export { ____slug__default as default };
//# sourceMappingURL=_...slug_-DQD_nG5g.mjs.map
