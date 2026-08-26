import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { computed, mergeProps, defineComponent, ref, watch, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrLooseContain, ssrRenderTeleport } from 'vue/server-renderer';

//#region components/Shop/ShopToolbar.vue?vue&type=script&setup=true&lang.ts
var ShopToolbar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ShopToolbar",
	__ssrInlineRender: true,
	props: {
		totalResults: {
			type: Number,
			default: 0
		},
		itemsPerPage: {
			type: Number,
			default: 24
		},
		sortBy: {
			type: String,
			default: "default"
		},
		viewMode: {
			type: String,
			default: "grid-4"
		},
		activeFilters: {
			type: Array,
			default: () => []
		}
	},
	emits: [
		"update:sortBy",
		"update:viewMode",
		"remove-filter",
		"clear-filters",
		"open-mobile-filter"
	],
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full flex flex-col gap-4 mb-8",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="flex flex-col sm:flex-row items-center justify-between gap-4 w-full bg-white p-4 rounded-2xl border border-slate-100 shadow-sm mb-6"><div class="flex flex-row items-center justify-between w-full sm:w-auto gap-4"><button class="lg:hidden flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#0B0E28] rounded-2xl text-xs sm:text-sm font-bold border border-slate-200 hover:bg-slate-50 transition-colors flex-1 sm:flex-none cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg><span>${ssrInterpolate(unref(t)("shop.filters"))}</span>`);
			if (__props.activeFilters.length) _push(`<span class="flex items-center justify-center w-5 h-5 bg-amber-500 text-[#0B0E28] rounded-full text-[10px]">${ssrInterpolate(__props.activeFilters.length)}</span>`);
			else _push(`<!---->`);
			_push(`</button><p class="text-xs sm:text-sm font-bold text-slate-500 text-start">`);
			if (unref(layoutDirection) === "ltr") _push(`<!--[--> Showing <span class="text-[#0B0E28]">1-${ssrInterpolate(__props.itemsPerPage)}</span> of <span class="text-[#0B0E28]">${ssrInterpolate(__props.totalResults)}</span> results <!--]-->`);
			else _push(`<!--[--> عرض <span class="text-[#0B0E28]">1-${ssrInterpolate(__props.itemsPerPage)}</span> من أصل <span class="text-[#0B0E28]">${ssrInterpolate(__props.totalResults)}</span> نتيجة <!--]-->`);
			_push(`</p></div><div class="flex items-center gap-4 justify-between w-full sm:w-auto sm:justify-end"><div class="flex items-center gap-2 flex-1 sm:flex-none"><label class="text-xs font-bold text-slate-500 hidden sm:block shrink-0">${ssrInterpolate(unref(t)("shop.sort_by"))}</label><select${ssrRenderAttr("value", __props.sortBy)} class="bg-white border border-slate-200 text-[#0B0E28] text-xs sm:text-sm font-bold rounded-2xl focus:ring-amber-400 focus:border-amber-400 block w-full sm:w-auto px-4 py-3 outline-none cursor-pointer"><option value="default">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Default" : "الافتراضي")}</option><option value="newest">${ssrInterpolate(unref(t)("shop.sort_latest"))}</option><option value="bestseller">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Best Sellers" : "الأكثر مبيعاً")}</option><option value="price_asc">${ssrInterpolate(unref(t)("shop.sort_price_low"))}</option><option value="price_desc">${ssrInterpolate(unref(t)("shop.sort_price_high"))}</option><option value="rating">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Highest Rated" : "الأعلى تقييماً")}</option></select></div><div class="hidden sm:block w-px h-6 bg-slate-200"></div><div class="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-200"><button class="${ssrRenderClass([__props.viewMode === "grid-4" ? "bg-white shadow-sm text-[#0B0E28]" : "text-slate-400 hover:text-slate-600", "w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"])}" title="4 Columns"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="7.5" y1="3" x2="7.5" y2="21"></line><line x1="12" y1="3" x2="12" y2="21"></line><line x1="16.5" y1="3" x2="16.5" y2="21"></line></svg></button><button class="${ssrRenderClass([__props.viewMode === "grid-3" ? "bg-white shadow-sm text-[#0B0E28]" : "text-slate-400 hover:text-slate-600", "w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"])}" title="3 Columns"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg></button><button class="${ssrRenderClass([__props.viewMode === "list" ? "bg-white shadow-sm text-[#0B0E28]" : "text-slate-400 hover:text-slate-600", "w-8 h-8 flex items-center justify-center rounded-lg transition-colors cursor-pointer"])}" title="List View"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg></button></div></div></div>`);
			if (__props.activeFilters.length > 0) {
				_push(`<div class="flex flex-wrap items-center gap-2"><span class="text-xs font-bold text-slate-500 shrink-0">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Active Filters:" : "الفلاتر النشطة:")}</span><!--[-->`);
				ssrRenderList(__props.activeFilters, (filter) => {
					_push(`<div class="flex items-center gap-1.5 bg-[#0B0E28] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm"><span>${ssrInterpolate(filter.label)}</span><button class="w-4 h-4 flex items-center justify-center rounded-full bg-white/20 hover:bg-rose-500 transition-colors cursor-pointer"><svg class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div>`);
				});
				_push(`<!--]--><button class="text-xs font-bold text-amber-500 hover:text-amber-600 underline decoration-amber-500/30 underline-offset-4 cursor-pointer">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Clear All" : "إفراغ الكل")}</button></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/Shop/ShopToolbar.vue
var _sfc_setup$3 = ShopToolbar_vue_vue_type_script_setup_true_lang_default.setup;
ShopToolbar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ShopToolbar.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var ShopToolbar_default = Object.assign(ShopToolbar_vue_vue_type_script_setup_true_lang_default, { __name: "ShopToolbar" });
//#endregion
//#region components/Shop/ShopFilterSidebar.vue?vue&type=script&setup=true&lang.ts
var ShopFilterSidebar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ShopFilterSidebar",
	__ssrInlineRender: true,
	props: {
		filters: {
			type: Object,
			default: () => ({
				priceMin: null,
				priceMax: null,
				brands: [],
				categoryId: []
			})
		},
		categories: {
			type: Array,
			default: () => []
		},
		brands: {
			type: Array,
			default: () => []
		}
	},
	emits: ["update-filters", "reset-filters"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t, layoutDirection } = useLanguage();
		const isPriceOpen = ref(true);
		const isCategoriesOpen = ref(true);
		const isBrandsOpen = ref(true);
		const brandSearchQuery = ref("");
		const localFilters = ref({
			priceMin: props.filters.priceMin,
			priceMax: props.filters.priceMax,
			brands: [...props.filters.brands || []],
			categoryId: [...props.filters.categoryId || []]
		});
		watch(() => props.filters, (newVal) => {
			localFilters.value = {
				priceMin: newVal.priceMin,
				priceMax: newVal.priceMax,
				brands: [...newVal.brands || []],
				categoryId: [...newVal.categoryId || []]
			};
		}, { deep: true });
		const categoriesList = computed(() => props.categories || []);
		const getCategoryName = (cat) => {
			if (!cat) return "";
			if (layoutDirection.value === "ltr") return cat.name_en || cat.title_en || cat.name;
			return cat.name || cat.name_ar;
		};
		const BRAND_AR_MAP = {
			"ويسلامك": "weslamic",
			"اشهار التسويقية": "ESHHAR",
			"ايفون هاي كوبي": "IPhone High copy",
			"ناتشر ريبورت": "NATURE REPORT",
			"ارجان": "Argan",
			"أنكر ساوندكور": "Anker Soundcore",
			"توسما": "TOSMA",
			"ديورا بوكس": "DURA BOX",
			"سوني": "SONY",
			"بايسِل": "Piecell",
			"بيلديند": "Beldend",
			"ريجرسي": "REGRSI",
			"جو ديس": "Go-Des",
			"أسوار جدة": "Aswar Jeddah",
			"فيليبس": "PHILIPS",
			"سامسونج": "SAMSUNG",
			"كينوود": "KENWOOD"
		};
		const getBrandName = (brand) => {
			if (!brand) return "";
			if (layoutDirection.value === "ltr") {
				if (brand.name_en && !/[\u0600-\u06FF]/.test(brand.name_en)) return brand.name_en;
				if (brand.alt_text && !/[\u0600-\u06FF]/.test(brand.alt_text)) return brand.alt_text;
				if (brand.image_alt_text && !/[\u0600-\u06FF]/.test(brand.image_alt_text)) return brand.image_alt_text;
				if (brand.name && !/[\u0600-\u06FF]/.test(brand.name)) return brand.name;
				if (brand.name_ar && BRAND_AR_MAP[brand.name_ar]) return BRAND_AR_MAP[brand.name_ar];
				if (brand.name && BRAND_AR_MAP[brand.name]) return BRAND_AR_MAP[brand.name];
				return brand.name_en || brand.name || brand.name_ar || "";
			}
			return brand.name_ar || brand.name || brand.name_en || "";
		};
		const filteredBrands = computed(() => {
			if (!props.brands) return [];
			if (!brandSearchQuery.value.trim()) return props.brands;
			const q = brandSearchQuery.value.toLowerCase();
			return props.brands.filter((b) => getBrandName(b).toLowerCase().includes(q));
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 flex flex-col gap-6",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="w-full"><button class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"><span>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Price (SAR)" : "السعر (ر.س)")}</span><svg class="${ssrRenderClass([isPriceOpen.value ? "rotate-180" : "", "w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="flex flex-col gap-4 mt-2 w-full" style="${ssrRenderStyle(isPriceOpen.value ? null : { display: "none" })}"><div class="flex items-center gap-2 w-full"><div class="flex-1 min-w-0"><label class="text-[10px] font-bold text-slate-400 mb-1 block text-start">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "From" : "من")}</label><input type="number"${ssrRenderAttr("value", localFilters.value.priceMin)} placeholder="0" class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none text-start"></div><span class="text-slate-300 font-bold mt-4 shrink-0">-</span><div class="flex-1 min-w-0"><label class="text-[10px] font-bold text-slate-400 mb-1 block text-start">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "To" : "إلى")}</label><input type="number"${ssrRenderAttr("value", localFilters.value.priceMax)} placeholder="Max" class="w-full min-w-0 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-bold text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none text-start"></div></div><button class="w-full bg-[#0B0E28] hover:bg-[#1a204d] text-white text-xs font-bold py-2 rounded-lg transition-colors cursor-pointer">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Apply Price" : "تطبيق السعر")}</button></div></div><div class="w-full h-px bg-slate-100"></div>`);
			if (categoriesList.value.length > 0) {
				_push(`<div class="w-full"><button class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"><span>${ssrInterpolate(unref(t)("nav.categories"))}</span><svg class="${ssrRenderClass([isCategoriesOpen.value ? "rotate-180" : "", "w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="flex flex-col gap-1 mt-1 w-full max-h-48 overflow-y-auto custom-scrollbar" style="${ssrRenderStyle(isCategoriesOpen.value ? null : { display: "none" })}"><!--[-->`);
				ssrRenderList(categoriesList.value, (cat) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: cat.id,
						to: `/category/${cat.slug || cat.id}`,
						class: "flex items-center justify-between gap-3 w-full py-1.5 px-2 rounded-lg cursor-pointer group hover:bg-amber-50/60 transition-colors"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex items-center gap-2.5 min-w-0"${_scopeId}><span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform"${_scopeId}></span><span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors truncate"${_scopeId}>${ssrInterpolate(getCategoryName(cat))}</span></div>`);
								if (cat.productCount) _push(`<span class="text-[10px] font-medium text-slate-400 shrink-0"${_scopeId}>${ssrInterpolate(cat.productCount)}</span>`);
								else _push(`<!---->`);
							} else return [createVNode("div", { class: "flex items-center gap-2.5 min-w-0" }, [createVNode("span", { class: "w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 group-hover:scale-125 transition-transform" }), createVNode("span", { class: "text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors truncate" }, toDisplayString(getCategoryName(cat)), 1)]), cat.productCount ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-[10px] font-medium text-slate-400 shrink-0"
							}, toDisplayString(cat.productCount), 1)) : createCommentVNode("", true)];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			if (categoriesList.value.length > 0) _push(`<div class="w-full h-px bg-slate-100"></div>`);
			else _push(`<!---->`);
			_push(`<div class="w-full"><button class="flex items-center justify-between w-full text-sm font-bold text-[#0B0E28] mb-3 group whitespace-nowrap cursor-pointer"><span>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Brands" : "العلامات التجارية")}</span><svg class="${ssrRenderClass([isBrandsOpen.value ? "rotate-180" : "", "w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-transform duration-300 shrink-0"])}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></button><div class="flex flex-col gap-3 mt-1 w-full" style="${ssrRenderStyle(isBrandsOpen.value ? null : { display: "none" })}"><div class="relative w-full"><input type="text"${ssrRenderAttr("value", brandSearchQuery.value)} class="w-full min-w-0 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-[#0B0E28] focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 outline-none placeholder-slate-400 text-start"${ssrRenderAttr("placeholder", unref(layoutDirection) === "ltr" ? "Search brands..." : "ابحث عن ماركة...")}></div><div class="max-h-48 overflow-y-auto custom-scrollbar flex flex-col pr-1 w-full"><!--[-->`);
			ssrRenderList(filteredBrands.value, (brand) => {
				_push(`<label class="flex items-center justify-between gap-3 w-full py-1 cursor-pointer group"><div class="flex items-center gap-2.5 min-w-0"><input type="checkbox"${ssrRenderAttr("value", brand.id)}${ssrIncludeBooleanAttr(Array.isArray(localFilters.value.brands) ? ssrLooseContain(localFilters.value.brands, brand.id) : localFilters.value.brands) ? " checked" : ""} class="w-4 h-4 text-amber-500 bg-slate-50 border-slate-300 rounded focus:ring-amber-500 cursor-pointer shrink-0"><span class="text-xs font-bold text-slate-600 group-hover:text-[#0B0E28] transition-colors truncate">${ssrInterpolate(getBrandName(brand))}</span></div>`);
				if (brand.count) _push(`<span class="text-[10px] font-medium text-slate-400 shrink-0">${ssrInterpolate(brand.count)}</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			});
			_push(`<!--]--></div></div></div><button class="w-full border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 text-xs font-bold py-2.5 rounded-xl transition-colors cursor-pointer mt-2">${ssrInterpolate(unref(t)("shop.reset_filters"))}</button></div>`);
		};
	}
});
//#endregion
//#region components/Shop/ShopFilterSidebar.vue
var _sfc_setup$2 = ShopFilterSidebar_vue_vue_type_script_setup_true_lang_default.setup;
ShopFilterSidebar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ShopFilterSidebar.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ShopFilterSidebar_default = Object.assign(ShopFilterSidebar_vue_vue_type_script_setup_true_lang_default, { __name: "ShopFilterSidebar" });
//#endregion
//#region components/Shop/ShopMobileFilterDrawer.vue?vue&type=script&setup=true&lang.ts
var ShopMobileFilterDrawer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ShopMobileFilterDrawer",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		filters: {
			type: Object,
			required: true
		},
		categories: {
			type: Array,
			default: () => []
		},
		brands: {
			type: Array,
			default: () => []
		}
	},
	emits: [
		"close",
		"update-filters",
		"reset-filters"
	],
	setup(__props) {
		const props = __props;
		const { t, layoutDirection } = useLanguage();
		watch(() => props.isOpen, (newVal) => {
		});
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) _push(`<div class="fixed inset-0 bg-[#0B0E28]/60 backdrop-blur-sm z-[100] transition-opacity"></div>`);
				else _push(`<!---->`);
				if (__props.isOpen) {
					_push(`<div class="fixed top-0 bottom-0 end-0 w-[90%] max-w-sm bg-white z-[101] shadow-2xl flex flex-col"${ssrRenderAttr("dir", unref(layoutDirection))}><div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50"><h2 class="text-lg font-black text-[#0B0E28] flex items-center gap-2"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg><span>${ssrInterpolate(unref(t)("shop.filters"))}</span></h2><button class="w-10 h-10 flex items-center justify-center rounded-full bg-white text-slate-400 hover:text-rose-500 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="flex-1 overflow-y-auto custom-scrollbar p-5 overscroll-contain">`);
					_push(ssrRenderComponent(ShopFilterSidebar_default, {
						filters: __props.filters,
						categories: __props.categories,
						brands: __props.brands,
						onUpdateFilters: ($event) => _ctx.$emit("update-filters", $event),
						onResetFilters: ($event) => _ctx.$emit("reset-filters"),
						class: "!p-0 !border-none !shadow-none"
					}, null, _parent));
					_push(`</div><div class="p-5 border-t border-slate-100 shrink-0 bg-white"><button class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 cursor-pointer">${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Show Results" : "عرض النتائج")}</button></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/Shop/ShopMobileFilterDrawer.vue
var _sfc_setup$1 = ShopMobileFilterDrawer_vue_vue_type_script_setup_true_lang_default.setup;
ShopMobileFilterDrawer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ShopMobileFilterDrawer.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ShopMobileFilterDrawer_default = Object.assign(ShopMobileFilterDrawer_vue_vue_type_script_setup_true_lang_default, { __name: "ShopMobileFilterDrawer" });
//#endregion
//#region components/Shop/ShopPagination.vue
var _sfc_main = {
	__name: "ShopPagination",
	__ssrInlineRender: true,
	props: {
		currentPage: {
			type: Number,
			required: true
		},
		totalPages: {
			type: Number,
			required: true
		}
	},
	emits: ["update:currentPage"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const pages = computed(() => {
			const current = props.currentPage;
			const total = props.totalPages;
			if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
			if (current <= 3) return [
				1,
				2,
				3,
				4,
				"...",
				total
			];
			if (current >= total - 2) return [
				1,
				"...",
				total - 3,
				total - 2,
				total - 1,
				total
			];
			return [
				1,
				"...",
				current - 1,
				current,
				current + 1,
				"...",
				total
			];
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<nav${ssrRenderAttrs(mergeProps({
				class: "flex justify-center items-center gap-1 sm:gap-2 mt-12",
				"aria-label": "Pagination"
			}, _attrs))}><button${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0B0E28] hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ml-1 sm:ml-2" aria-label="Previous page"><svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg></button><!--[-->`);
			ssrRenderList(pages.value, (page) => {
				_push(`<!--[-->`);
				if (page === "...") _push(`<span class="w-10 h-10 flex items-center justify-center text-slate-400 font-bold"> ... </span>`);
				else _push(`<button class="${ssrRenderClass([page === __props.currentPage ? "bg-[#0B0E28] text-amber-400 shadow-md border-transparent" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm", "w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all"])}">${ssrInterpolate(page)}</button>`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--><button${ssrIncludeBooleanAttr(__props.currentPage === __props.totalPages) ? " disabled" : ""} class="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-[#0B0E28] hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mr-1 sm:mr-2" aria-label="Next page"><svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg></button></nav>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ShopPagination.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { ShopFilterSidebar_default as S, _sfc_main as _, ShopToolbar_default as a, ShopMobileFilterDrawer_default as b };
//# sourceMappingURL=ShopPagination-Dq7B4dcN.mjs.map
