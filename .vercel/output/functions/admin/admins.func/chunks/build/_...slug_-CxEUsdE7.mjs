import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { _ as _sfc_main$1 } from './EmptyState-DApFxOYg.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { u as useProducts } from './useProducts-BMlxn0rw.mjs';
import { u as useCategories } from './useCategories-mcAJj4mX.mjs';
import { u as useBrands, P as ProductCard_default } from './ProductCard-B9ldMXFO.mjs';
import { S as ShopFilterSidebar_default, a as ShopToolbar_default, _ as _sfc_main$2, b as ShopMobileFilterDrawer_default } from './ShopPagination-Dq7B4dcN.mjs';
import { _ as _sfc_main } from './ProductCardSkeleton-BU0A1QbE.mjs';
import { C as CategoryHierarchyBar_default } from './CategoryHierarchyBar-D7wNBy_Z.mjs';
import { defineComponent, computed, ref, watch, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, useSSRContext } from 'vue';
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
import './productApiService-DKwZsTgl.mjs';
import './useCart-CqauBZhc.mjs';
import './apiConfig-CCR2eNes.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';

//#region pages/category/[...slug].vue?vue&type=script&setup=true&lang.ts
var ____slug__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[...slug]",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { t, apiLocale, currentLanguage, layoutDirection } = useLanguage();
		const { products, pending: productsPending, error: productsError, isEmpty, totalProducts, fetchFilteredProducts } = useProducts();
		const { categories, loadCategories } = useCategories();
		const { brands, loadBrands } = useBrands();
		const slugs = computed(() => {
			const s = route.params.slug;
			if (!s) return [];
			if (Array.isArray(s)) return s.map(String).filter(Boolean);
			return String(s).split("/").filter(Boolean);
		});
		const currentCategoryPath = computed(() => {
			return slugs.value.join("/");
		});
		const targetLeafSlug = computed(() => {
			return slugs.value.length > 0 ? slugs.value[slugs.value.length - 1] : "";
		});
		const getCategoryName = (cat) => {
			if (!cat) return "";
			if (currentLanguage.value === "en") return cat.name_en || cat.title_en || cat.name;
			return cat.name_ar || cat.name;
		};
		const hierarchyTrail = computed(() => {
			const trail = [];
			if (!categories.value || categories.value.length === 0) return trail;
			let currentLevelList = categories.value;
			let accumulatedPath = "/category";
			for (let i = 0; i < slugs.value.length; i++) {
				const slugSegment = slugs.value[i];
				let matched = currentLevelList.find((c) => String(c.slug) === slugSegment || String(c.id) === slugSegment);
				if (matched) {
					accumulatedPath += `/${matched.slug || matched.id}`;
					trail.push({
						category: matched,
						slug: matched.slug || String(matched.id),
						name: getCategoryName(matched),
						url: accumulatedPath
					});
					currentLevelList = matched.subCategories || matched.childes || [];
				} else {
					let globalMatch = null;
					for (const cat of categories.value) {
						if (String(cat.slug) === slugSegment || String(cat.id) === slugSegment) {
							globalMatch = cat;
							break;
						}
						if (cat.subCategories && cat.subCategories.length > 0) {
							const sub = cat.subCategories.find((s) => String(s.slug) === slugSegment || String(s.id) === slugSegment);
							if (sub) {
								globalMatch = sub;
								break;
							}
						}
					}
					if (globalMatch) {
						accumulatedPath += `/${globalMatch.slug || globalMatch.id}`;
						trail.push({
							category: globalMatch,
							slug: globalMatch.slug || String(globalMatch.id),
							name: getCategoryName(globalMatch),
							url: accumulatedPath
						});
						currentLevelList = globalMatch.subCategories || globalMatch.childes || [];
					} else {
						accumulatedPath += `/${slugSegment}`;
						trail.push({
							category: null,
							slug: slugSegment,
							name: slugSegment.replace(/-/g, " "),
							url: accumulatedPath
						});
					}
				}
			}
			return trail;
		});
		const activeLeafTier = computed(() => {
			return hierarchyTrail.value.length > 0 ? hierarchyTrail.value[hierarchyTrail.value.length - 1] : null;
		});
		const currentCategory = computed(() => {
			return activeLeafTier.value?.category || null;
		});
		const resolvedCategoryId = computed(() => {
			if (currentCategory.value?.id) return currentCategory.value.id;
			const leaf = targetLeafSlug.value;
			if (!leaf) return void 0;
			if (!isNaN(Number(leaf))) return Number(leaf);
			return leaf;
		});
		const displayCategoryName = computed(() => {
			if (activeLeafTier.value?.name) return activeLeafTier.value.name;
			if (currentCategory.value) return getCategoryName(currentCategory.value);
			const slug = targetLeafSlug.value;
			return slug ? slug.replace(/-/g, " ") : currentLanguage.value === "en" ? "Category" : "تصنيف المنتجات";
		});
		const breadcrumbItems = computed(() => {
			const isEn = layoutDirection.value === "ltr";
			const items = [{
				label: isEn ? "Home" : "الرئيسية",
				to: "/"
			}, {
				label: isEn ? "Shop" : "المتجر",
				to: "/shop"
			}];
			hierarchyTrail.value.forEach((tier, index) => {
				const isLast = index === hierarchyTrail.value.length - 1;
				items.push({
					label: tier.name,
					to: isLast ? void 0 : tier.url
				});
			});
			return items;
		});
		const subCategoriesList = computed(() => {
			if (currentCategory.value?.subCategories && currentCategory.value.subCategories.length > 0) return currentCategory.value.subCategories.map((sub) => ({
				...sub,
				name: getCategoryName(sub),
				customUrl: `/category/${currentCategoryPath.value}/${sub.slug || sub.id}`
			}));
			if (hierarchyTrail.value.length > 1) {
				const parentTier = hierarchyTrail.value[hierarchyTrail.value.length - 2];
				if (parentTier?.category?.subCategories && parentTier.category.subCategories.length > 0) {
					const parentPath = slugs.value.slice(0, -1).join("/");
					return parentTier.category.subCategories.map((sub) => ({
						...sub,
						name: getCategoryName(sub),
						customUrl: `/category/${parentPath}/${sub.slug || sub.id}`
					}));
				}
			}
			return [];
		});
		const viewMode = ref("grid-4");
		const sortBy = ref("default");
		const currentPage = ref(1);
		const itemsPerPage = ref(12);
		const isMobileFilterOpen = ref(false);
		const selectedSubCategoryId = ref(null);
		const defaultFilters = {
			priceMin: null,
			priceMax: null,
			brands: [],
			categoryId: [],
			inStock: false
		};
		const filters = ref({ ...defaultFilters });
		const totalPages = computed(() => Math.ceil((totalProducts.value || 1) / itemsPerPage.value));
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
			if (filters.value.brands.length) chips.push({
				id: "brands",
				label: isEn ? `${filters.value.brands.length} Brands` : `${filters.value.brands.length} ماركات`
			});
			if (selectedSubCategoryId.value) {
				const foundSub = subCategoriesList.value.find((s) => String(s.id) === String(selectedSubCategoryId.value));
				if (foundSub) {
					const subName = getCategoryName(foundSub);
					chips.push({
						id: "subcategory",
						label: isEn ? `Subcategory: ${subName}` : `فرعي: ${subName}`
					});
				}
			}
			if (filters.value.inStock) chips.push({
				id: "inStock",
				label: isEn ? "In Stock" : "متاح بالمخزون"
			});
			return chips;
		});
		const fetchCategoryProducts = async () => {
			if (categories.value.length === 0) await loadCategories();
			loadBrands(true);
			const targetCategoryId = selectedSubCategoryId.value || resolvedCategoryId.value || targetLeafSlug.value;
			const selectedBrandId = filters.value.brands.length > 0 ? filters.value.brands[0] : void 0;
			fetchFilteredProducts({
				category_id: targetCategoryId,
				brand_id: selectedBrandId || void 0,
				locale: apiLocale.value,
				limit: itemsPerPage.value,
				page: currentPage.value,
				offset: (currentPage.value - 1) * itemsPerPage.value,
				min_price: filters.value.priceMin || void 0,
				max_price: filters.value.priceMax || void 0,
				sort_by: sortBy.value === "default" ? "latest" : sortBy.value
			});
		};
		const initCategoryPage = async () => {
			filters.value = { ...defaultFilters };
			selectedSubCategoryId.value = null;
			currentPage.value = 1;
			if (categories.value.length === 0) await loadCategories();
			loadBrands(true);
			await fetchCategoryProducts();
		};
		const handleCategorySelect = (subId) => {
			selectedSubCategoryId.value = selectedSubCategoryId.value === subId ? null : subId;
			currentPage.value = 1;
			fetchCategoryProducts();
		};
		const applyFilters = (newFilters) => {
			filters.value = { ...newFilters };
			currentPage.value = 1;
			fetchCategoryProducts();
		};
		const resetFilters = () => {
			filters.value = { ...defaultFilters };
			selectedSubCategoryId.value = null;
			currentPage.value = 1;
			fetchCategoryProducts();
		};
		const removeFilter = (id) => {
			if (id === "price") {
				filters.value.priceMin = null;
				filters.value.priceMax = null;
			} else if (id === "brands") filters.value.brands = [];
			else if (id === "subcategory") selectedSubCategoryId.value = null;
			else filters.value[id] = false;
			fetchCategoryProducts();
		};
		watch([currentPage, sortBy], () => {
			fetchCategoryProducts();
		});
		watch(filters, () => {
			currentPage.value = 1;
			fetchCategoryProducts();
		}, { deep: true });
		watch(() => route.params.slug, () => {
			initCategoryPage();
		});
		watch([apiLocale, currentLanguage], () => {
			initCategoryPage();
		});
		useHead$1({ title: computed(() => `${displayCategoryName.value} | ${layoutDirection.value === "ltr" ? "Aswar Jeddah" : "أسوار جدة"}`) });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-slate-50/50 min-h-screen pb-16",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="container mx-auto px-4 max-w-7xl">`);
			_push(ssrRenderComponent(Breadcrumbs_default, { items: breadcrumbItems.value }, null, _parent));
			_push(`<div class="mb-8"><h1 class="text-2xl sm:text-3xl font-bold text-[#0B0E28] mb-6 mt-6 text-start">${ssrInterpolate(displayCategoryName.value)}</h1>`);
			if (subCategoriesList.value && subCategoriesList.value.length > 0) _push(ssrRenderComponent(CategoryHierarchyBar_default, {
				categories: subCategoriesList.value,
				"selected-category-id": selectedSubCategoryId.value,
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
				"total-results": unref(totalProducts),
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
			else if (unref(isEmpty)) _push(ssrRenderComponent(_sfc_main$1, {
				title: unref(t)("category.empty_title"),
				description: unref(t)("category.empty_desc"),
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
//#region pages/category/[...slug].vue
var _sfc_setup = ____slug__vue_vue_type_script_setup_true_lang_default.setup;
____slug__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category/[...slug].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ____slug__default = ____slug__vue_vue_type_script_setup_true_lang_default;

export { ____slug__default as default };
//# sourceMappingURL=_...slug_-CxEUsdE7.mjs.map
