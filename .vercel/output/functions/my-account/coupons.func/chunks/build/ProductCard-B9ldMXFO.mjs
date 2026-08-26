import { N as NuxtLink, _ as _plugin_vue_export_helper_default, $ as $fetch$2 } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { u as useCompare } from './useCompare-BYK443T-.mjs';
import { u as useWishlist } from './useWishlist-BWj6pk_8.mjs';
import { watch, computed, defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderList } from 'vue/server-renderer';

//#region services/brandApiService.ts
/**
* Brand API Service Layer
* Endpoint: GET https:/ai-agunt.elbakry2.com/api/v1/brands?guest_id=1&locale=sa
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var BRAND_AR_TO_EN_MAP = {
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
	"كينوود": "KENWOOD",
	"ديجيتال كريست": "Digital Crest",
	"ايربلو": "Airblu"
};
function extractBrandName(b, lang = "ar") {
	if (!b) return "";
	const isEn = lang === "en";
	let nameAr = "";
	let nameEn = "";
	if (b.name_ar) nameAr = String(b.name_ar).trim();
	if (b.name_en) nameEn = String(b.name_en).trim();
	if (b.title_ar) nameAr = nameAr || String(b.title_ar).trim();
	if (b.title_en) nameEn = nameEn || String(b.title_en).trim();
	const alt = b.image_alt_text || b.alt_text || b.image_alt;
	if (typeof alt === "string" && alt.trim()) {
		const cleanAlt = alt.trim();
		if (!/[\u0600-\u06FF]/.test(cleanAlt)) {
			if (!nameEn) nameEn = cleanAlt;
		} else if (!nameAr) nameAr = cleanAlt;
	}
	if (Array.isArray(b.translations)) for (const t of b.translations) {
		const loc = String(t.locale || t.lang || t.language || "").toLowerCase();
		const key = String(t.key || "").toLowerCase();
		if (!key || key === "name" || key === "title") {
			const val = String(t.value || "").trim();
			if ((loc === "sa" || loc === "ar") && val && !nameAr) nameAr = val;
			if ((loc === "en" || loc === "en-us" || loc === "en_us") && val && !nameEn) nameEn = val;
		}
	}
	if (typeof b.name === "string" && b.name.trim()) {
		const raw = b.name.trim();
		if (/[\u0600-\u06FF]/.test(raw)) {
			if (!nameAr) nameAr = raw;
			if (!nameEn && BRAND_AR_TO_EN_MAP[raw]) nameEn = BRAND_AR_TO_EN_MAP[raw];
		} else if (!nameEn) nameEn = raw;
	}
	if (nameAr && !nameEn && BRAND_AR_TO_EN_MAP[nameAr]) nameEn = BRAND_AR_TO_EN_MAP[nameAr];
	if (isEn) return nameEn || (nameAr ? BRAND_AR_TO_EN_MAP[nameAr] || nameAr : typeof b.name === "string" ? b.name : "");
	return nameAr || (typeof b.name === "string" ? b.name : "") || nameEn;
}
var getCurrentApiLocale = (localeInput) => {
	if (localeInput) {
		const clean = localeInput.trim();
		if (clean.toUpperCase() === "EN" || clean.toLowerCase() === "en") return "EN";
		if (clean.toLowerCase() === "sa" || clean.toLowerCase() === "ar") return "sa";
		return clean;
	}
	return "sa";
};
var brandApiService = { 
/**
* Fetch brands from live WedgetStore API
*/
async fetchBrands(guestId = "1", localeInput) {
	try {
		const locale = getCurrentApiLocale(localeInput);
		const isEn = locale === "EN";
		const endpoint = `${API_BASE_URL}/brands?guest_id=${guestId}&locale=${locale}`;
		const response = await $fetch$2(endpoint, {
			method: "GET",
			headers: {
				"Accept": "application/json",
				"X-Requested-With": "XMLHttpRequest",
				"Accept-Language": isEn ? "en-US,en;q=0.9" : "ar-SA,ar;q=0.9",
				"X-localization": locale,
				"lang": locale,
				"X-Language": isEn ? "en" : "ar"
			},
			retry: 1,
			timeout: 1e4
		});
		let rawBrands = [];
		if (Array.isArray(response)) rawBrands = response;
		else if (response && typeof response === "object") rawBrands = response.brands || response.data || [];
		return rawBrands.map((b) => {
			const brandName = extractBrandName(b, isEn ? "en" : "ar");
			const brandNameAr = extractBrandName(b, "ar");
			const brandNameEn = extractBrandName(b, "en");
			const altText = b.image_alt_text || b.alt_text || "";
			const resolvedLogo = (typeof b.image_full_url === "string" ? b.image_full_url : b.image_full_url?.path || b.image_full_url?.url) || (typeof b.logo_full_url === "string" ? b.logo_full_url : b.logo_full_url?.path || b.logo_full_url?.url) || (typeof b.image === "string" ? b.image : b.image?.path || b.image?.url) || (typeof b.logo === "string" ? b.logo : b.logo?.path || b.logo?.url) || "";
			return {
				id: b.id,
				name: brandName,
				name_ar: brandNameAr,
				name_en: brandNameEn,
				slug: (brandNameEn || brandName || String(b.id)).toLowerCase().replace(/\s+/g, "-"),
				alt_text: altText,
				image: resolvedLogo,
				logo: resolvedLogo,
				image_full_url: resolvedLogo,
				productCount: b.brand_products_count || b.product_count || b.products_count || 0
			};
		});
	} catch (err) {
		console.warn("Brand API request failed:", err?.message || err);
		return [];
	}
} };
//#endregion
//#region composables/useBrands.ts
/**
* Composable for Managing Brands State with Shared Singleton Cache & Request Deduplication
*/
var sharedBrands = ref([]);
var sharedPending = ref(false);
var sharedError = ref(null);
var lastFetchedLocale = ref(null);
var useBrands = () => {
	const { apiLocale, currentLanguage } = useLanguage();
	const loadBrands = async (force = false) => {
		const currentLoc = apiLocale.value || "sa";
		if (sharedPending.value) return;
		if (!force && lastFetchedLocale.value === currentLoc && sharedBrands.value.length > 0) return;
		sharedPending.value = true;
		sharedError.value = null;
		try {
			const data = await brandApiService.fetchBrands("1", currentLoc);
			if (Array.isArray(data)) {
				sharedBrands.value = data;
				lastFetchedLocale.value = currentLoc;
			}
		} catch (err) {
			console.error("[useBrands] Load error:", err);
			sharedError.value = "تعذر تحميل العلامات التجارية.";
		} finally {
			sharedPending.value = false;
		}
	};
	watch([apiLocale, currentLanguage], () => {
		loadBrands(true);
	});
	return {
		brands: sharedBrands,
		pending: sharedPending,
		error: sharedError,
		isEmpty: computed(() => !sharedPending.value && sharedBrands.value.length === 0),
		loadBrands
	};
};
//#endregion
//#region components/product/QuickViewModal.vue?vue&type=script&setup=true&lang.ts
var QuickViewModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "QuickViewModal",
	__ssrInlineRender: true,
	props: {
		isOpen: { type: Boolean },
		product: {}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		useCart();
		const currentImageIndex = ref(0);
		const quantity = ref(1);
		const defaultFeatures = [
			"جودة تصنيع عالية وتصميم عصري يعزز مطبخك.",
			"أداء قوي وفعال يلبي كافة الاحتياجات اليومية.",
			"ضمان الوكيل الشامل المعتمد لمدة سنتين.",
			"توفير في استهلاك الطاقة بفضل التكنولوجيا الحديثة."
		];
		watch(() => props.isOpen, (newVal) => {
			if (newVal) {
				(void 0).body.style.overflow = "hidden";
				quantity.value = 1;
				currentImageIndex.value = 0;
			} else (void 0).body.style.overflow = "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) {
					_push(`<div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" data-v-1ef7ff9a><div class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" data-v-1ef7ff9a></div><div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-auto overflow-hidden flex flex-col md:flex-row max-h-[90vh] z-10 animate-fade-in-up" dir="rtl" data-v-1ef7ff9a><button class="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-colors" aria-label="إغلاق" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-1ef7ff9a><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" data-v-1ef7ff9a></path></svg></button><div class="w-full md:w-1/2 relative group bg-white border-b md:border-b-0 md:border-l border-slate-100" data-v-1ef7ff9a><div class="relative w-full h-[300px] md:h-full min-h-[300px] flex items-center justify-center p-8" data-v-1ef7ff9a><img${ssrRenderAttr("src", __props.product.images[currentImageIndex.value])}${ssrRenderAttr("alt", __props.product.title)} class="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300" data-v-1ef7ff9a><div class="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" data-v-1ef7ff9a>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/product/${__props.product.slug}`,
						class: "bg-[#0b1a30] text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-luxury-gold hover:text-white transition-colors shadow-lg whitespace-nowrap"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(` عرض التفاصيل الكاملة `);
							else return [createTextVNode(" عرض التفاصيل الكاملة ")];
						}),
						_: 1
					}, _parent));
					_push(`</div></div>`);
					if (__props.product.images.length > 1) _push(`<button class="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-luxury-gold hover:text-white transition-colors text-slate-800" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" data-v-1ef7ff9a><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" data-v-1ef7ff9a></path></svg></button>`);
					else _push(`<!---->`);
					if (__props.product.images.length > 1) _push(`<button class="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 shadow-md hover:bg-luxury-gold hover:text-white transition-colors text-slate-800" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" data-v-1ef7ff9a><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" data-v-1ef7ff9a></path></svg></button>`);
					else _push(`<!---->`);
					_push(`</div><div class="w-full md:w-1/2 overflow-y-auto max-h-[50vh] md:max-h-[80vh] p-6 md:p-8 space-y-5 bg-slate-50/50" data-v-1ef7ff9a><div class="flex items-center justify-between" data-v-1ef7ff9a><span class="text-sm font-bold text-slate-500 uppercase tracking-widest" data-v-1ef7ff9a>${ssrInterpolate(__props.product.brand || __props.product.category)}</span>`);
					if (__props.product.rating) _push(`<div class="flex items-center gap-1 text-yellow-500" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4" data-v-1ef7ff9a><path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" data-v-1ef7ff9a></path></svg><span class="text-xs font-bold text-slate-600 mt-1" data-v-1ef7ff9a>${ssrInterpolate(__props.product.rating)} (${ssrInterpolate(__props.product.reviewCount || 0)})</span></div>`);
					else _push(`<!---->`);
					_push(`</div><h2 class="text-xl md:text-2xl font-bold text-slate-900 leading-tight" data-v-1ef7ff9a>${ssrInterpolate(__props.product.title)}</h2><div class="flex items-end gap-3 pb-4 border-b border-slate-200" data-v-1ef7ff9a><span class="text-2xl font-black text-[#1a66cc]" data-v-1ef7ff9a>${ssrInterpolate(__props.product.formattedPrice)}</span>`);
					if (__props.product.formattedOldPrice) _push(`<span class="text-sm text-slate-400 line-through mb-1" data-v-1ef7ff9a>${ssrInterpolate(__props.product.formattedOldPrice)}</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="py-2" data-v-1ef7ff9a><h4 class="text-sm font-bold text-slate-800 mb-3" data-v-1ef7ff9a>أبرز المواصفات:</h4><ul class="space-y-2" data-v-1ef7ff9a><!--[-->`);
					ssrRenderList(__props.product.features || defaultFeatures, (feature, idx) => {
						_push(`<li class="flex items-start gap-2 text-sm text-slate-600" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5 text-green-500 flex-shrink-0" data-v-1ef7ff9a><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-1ef7ff9a></path></svg><span data-v-1ef7ff9a>${ssrInterpolate(feature)}</span></li>`);
					});
					_push(`<!--]--></ul></div><div class="flex items-center justify-between text-sm py-2" data-v-1ef7ff9a><span class="${ssrRenderClass(__props.product.inStock ? "text-green-600 font-semibold" : "text-red-500 font-semibold")}" data-v-1ef7ff9a>${ssrInterpolate(__props.product.availabilityStatus || (__props.product.inStock ? "متوفر في المخزون" : "نفذت الكمية"))}</span><span class="text-slate-500 font-medium text-xs uppercase" data-v-1ef7ff9a>SKU: ${ssrInterpolate(__props.product.sku || "N/A")}</span></div><div class="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 mt-auto" data-v-1ef7ff9a><div class="flex items-center border border-slate-300 rounded-lg h-12 w-full sm:w-32 bg-white flex-shrink-0" data-v-1ef7ff9a><button class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-50 rounded-r-lg transition-colors pb-1" data-v-1ef7ff9a>-</button><input type="text" readonly${ssrRenderAttr("value", quantity.value)} class="w-full h-full text-center font-bold text-slate-800 bg-transparent outline-none pointer-events-none" data-v-1ef7ff9a><button class="w-10 h-full flex items-center justify-center text-slate-500 hover:text-black hover:bg-slate-50 rounded-l-lg transition-colors pb-1" data-v-1ef7ff9a>+</button></div><button${ssrIncludeBooleanAttr(!__props.product.inStock) ? " disabled" : ""} class="flex-grow h-12 w-full bg-[#0b1a30] text-white font-bold rounded-lg hover:bg-luxury-gold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md" data-v-1ef7ff9a><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5" data-v-1ef7ff9a><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-1ef7ff9a></path></svg> إضافة إلى السلة </button></div></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/product/QuickViewModal.vue
var _sfc_setup$1 = QuickViewModal_vue_vue_type_script_setup_true_lang_default.setup;
QuickViewModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/QuickViewModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var QuickViewModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(QuickViewModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1ef7ff9a"]]), { __name: "ProductQuickViewModal" });
//#endregion
//#region components/product/ProductCard.vue?vue&type=script&setup=true&lang.ts
var ProductCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductCard",
	__ssrInlineRender: true,
	props: {
		product: {},
		viewMode: {}
	},
	setup(__props) {
		const props = __props;
		const { t, formatCurrency, layoutDirection } = useLanguage();
		useCart();
		const { brands } = useBrands();
		const { isInCompare } = useCompare();
		const { isInWishlist } = useWishlist();
		const isQuickViewOpen = ref(false);
		const isAdding = ref(false);
		const justAdded = ref(false);
		const displayTitle = computed(() => {
			if (!props.product) return "";
			if (layoutDirection.value === "ltr") return props.product.name_en || props.product.title_en || props.product.en_name || props.product.title || props.product.name || "Featured Product";
			return props.product.title || props.product.name || "منتج مميز";
		});
		const discountBadgeText = computed(() => {
			if (!props.product) return "";
			const pct = props.product.discountPercentage || 0;
			if (pct > 0) return layoutDirection.value === "ltr" ? `${pct}% OFF` : `خصم ${pct}%`;
			return props.product.discountBadge || "";
		});
		const availabilityText = computed(() => {
			if (!props.product) return "";
			if (props.product.inStock ?? props.product.current_stock > 0) return t("product.in_stock");
			return t("product.out_of_stock");
		});
		const displayPrice = computed(() => {
			if (!props.product) return formatCurrency(0);
			return formatCurrency(props.product.price || 0);
		});
		const displayOriginalPrice = computed(() => {
			if (!props.product || !props.product.hasDiscount || !props.product.originalPrice) return "";
			return formatCurrency(props.product.originalPrice);
		});
		const wishlistTooltip = computed(() => {
			const inW = isInWishlist(props.product?.id);
			if (layoutDirection.value === "ltr") return inW ? "Remove from Wishlist" : "Add to Wishlist";
			return inW ? "إزالة من المفضلة" : "إضافة للمفضلة";
		});
		const compareTooltip = computed(() => {
			const inC = isInCompare(props.product?.id);
			if (layoutDirection.value === "ltr") return inC ? "Remove from Compare" : "Add to Compare";
			return inC ? "إزالة من المقارنة" : "إضافة للمقارنة";
		});
		const brandDisplay = computed(() => {
			if (!props.product) return "";
			const targetBrandId = props.product.brandId || (typeof props.product.brand === "object" ? props.product.brand?.id : void 0);
			if (targetBrandId !== void 0 && targetBrandId !== null && brands.value.length > 0) {
				const matchedBrand = brands.value.find((b) => String(b.id) === String(targetBrandId));
				if (matchedBrand && matchedBrand.name) return matchedBrand.name;
			}
			if (typeof props.product.brand === "object" && props.product.brand?.name) return props.product.brand.name;
			if (props.product.brandName && props.product.brandName.trim() !== "") return props.product.brandName;
			if (typeof props.product.brand === "string" && props.product.brand.trim() !== "") return props.product.brand;
			if (props.product.category && props.product.category !== "عام" && props.product.category !== "General") return props.product.category;
			return "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (__props.product) {
				_push(`<div${ssrRenderAttrs(mergeProps({
					class: "group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 w-full h-full flex flex-col overflow-hidden p-3 sm:p-4",
					dir: unref(layoutDirection)
				}, _attrs))}><div class="relative w-full h-40 sm:h-48 md:h-56 bg-white flex items-center justify-center overflow-hidden shrink-0 rounded-xl p-2 mb-3">`);
				if (discountBadgeText.value) _push(`<div class="absolute top-2 end-2 z-10"><span class="bg-[#0b1a30] text-amber-400 text-[10px] md:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-sm">${ssrInterpolate(discountBadgeText.value)}</span></div>`);
				else _push(`<!---->`);
				_push(`<div class="absolute top-2 start-2 flex flex-col gap-1.5 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 rtl:translate-x-2 group-hover:translate-x-0"><button class="${ssrRenderClass([[unref(isInWishlist)(__props.product.id) ? "bg-rose-500 text-white border-rose-500 shadow-rose-500/20" : "bg-white hover:bg-slate-50 text-slate-700 border-slate-100"], "p-2 rounded-xl shadow-md border transition-all cursor-pointer z-30"])}"${ssrRenderAttr("title", wishlistTooltip.value)}><svg xmlns="http://www.w3.org/2000/svg"${ssrRenderAttr("fill", unref(isInWishlist)(__props.product.id) ? "currentColor" : "none")} viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path></svg></button><button class="${ssrRenderClass([[unref(isInCompare)(__props.product.id) ? "bg-amber-500 text-slate-900 border-amber-500 shadow-amber-500/20" : "bg-white hover:bg-slate-50 text-slate-700 border-slate-100"], "p-2 rounded-xl shadow-md border transition-all cursor-pointer"])}"${ssrRenderAttr("title", compareTooltip.value)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"></path></svg></button><button class="bg-white hover:bg-slate-50 text-slate-700 p-2 rounded-xl shadow-md border border-slate-100 transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("product.quick_view"))}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg></button></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/product/${__props.product?.slug || __props.product?.id}`,
					prefetch: true,
					class: "block w-full h-full flex items-center justify-center"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<img${ssrRenderAttr("src", __props.product?.thumbnail || __props.product?.images && __props.product?.images[0] || "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80")}${ssrRenderAttr("alt", displayTitle.value)} loading="lazy" decoding="async" class="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"${_scopeId}>`);
						else return [createVNode("img", {
							src: __props.product?.thumbnail || __props.product?.images && __props.product?.images[0] || "https://images.unsplash.com/photo-1588854337236-6889d631faa8?w=800&q=80",
							alt: displayTitle.value,
							loading: "lazy",
							decoding: "async",
							class: "w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
						}, null, 8, ["src", "alt"])];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="flex flex-col flex-grow text-start bg-white relative"><div class="mb-1"><h3 class="text-xs md:text-sm font-bold text-slate-800 leading-snug md:leading-relaxed text-start line-clamp-2 h-[36px] md:h-[44px] overflow-hidden">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/product/${__props.product?.slug || __props.product?.id}`,
					prefetch: true,
					class: "hover:text-amber-500 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(displayTitle.value)}`);
						else return [createTextVNode(toDisplayString(displayTitle.value), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</h3></div>`);
				if (brandDisplay.value || __props.product?.sku) {
					_push(`<div class="flex items-center justify-between gap-1 mb-2 h-[16px] md:h-[20px] overflow-hidden text-start"><span class="text-[10px] md:text-xs text-amber-600 font-bold uppercase tracking-wider truncate">${ssrInterpolate(brandDisplay.value)}</span>`);
					if (__props.product?.sku) _push(`<span class="text-[9px] text-slate-400 uppercase tracking-wider shrink-0">${ssrInterpolate(unref(t)("product.sku"))} ${ssrInterpolate(__props.product.sku)}</span>`);
					else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
				_push(`<div class="flex items-center justify-start gap-1.5 text-start mb-3 h-[16px] md:h-[20px]"><span class="text-[11px] md:text-xs font-bold text-slate-800 truncate">${ssrInterpolate(availabilityText.value)}</span>`);
				if (__props.product?.inStock || __props.product?.current_stock > 0) _push(`<svg class="w-3.5 h-3.5 text-[#0B0E28] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
				else _push(`<!---->`);
				_push(`</div><div class="flex items-center justify-start gap-2.5 mt-auto pt-2 mb-2 flex-wrap"${ssrRenderAttr("dir", unref(layoutDirection))}><span class="text-base sm:text-lg font-black text-[#0B0E28] tracking-tight">${ssrInterpolate(displayPrice.value)}</span>`);
				if (displayOriginalPrice.value) _push(`<span class="text-xs sm:text-sm text-slate-400 line-through font-semibold">${ssrInterpolate(displayOriginalPrice.value)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="w-full mt-1"><button${ssrIncludeBooleanAttr(isAdding.value || __props.product?.inStock === false) ? " disabled" : ""} class="w-full bg-[#0B0E28] hover:bg-[#1a204d] active:scale-[0.98] text-white text-xs md:text-sm font-bold py-2.5 px-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">`);
				if (isAdding.value) _push(`<svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
				else if (justAdded.value) _push(`<svg class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
				else _push(`<svg class="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>`);
				_push(`<span>${ssrInterpolate(justAdded.value ? unref(layoutDirection) === "ltr" ? "Added Successfully!" : "تمت الإضافة بنجاح!" : unref(t)("product.add_to_cart"))}</span></button></div></div>`);
				if (isQuickViewOpen.value) _push(ssrRenderComponent(QuickViewModal_default, {
					"is-open": isQuickViewOpen.value,
					product: __props.product,
					onClose: ($event) => isQuickViewOpen.value = false
				}, null, _parent));
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region components/product/ProductCard.vue
var _sfc_setup = ProductCard_vue_vue_type_script_setup_true_lang_default.setup;
ProductCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/product/ProductCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductCard_default = Object.assign(ProductCard_vue_vue_type_script_setup_true_lang_default, { __name: "ProductCard" });

export { ProductCard_default as P, useBrands as u };
//# sourceMappingURL=ProductCard-B9ldMXFO.mjs.map
