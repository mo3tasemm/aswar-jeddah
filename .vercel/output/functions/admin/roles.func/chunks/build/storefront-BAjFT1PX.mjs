import { b as useAdminLanguage, N as NuxtLink, f as useAdminAuth, _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { A as AdminPageHeader_default } from './AdminPageHeader-RavS7Sn5.mjs';
import { A as AdminSkeletonForm_default, a as AdminSaveBar_default } from './AdminSaveBar-BcLKI7oo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { a as adminBrandsApiService } from './adminBrandsApiService-CxliYt3r.mjs';
import { a as adminCategoriesApiService } from './adminCategoriesApiService-nS8glRi_.mjs';
import { B as BaseModal_default } from './BaseModal-D9dLO0m4.mjs';
import { A as AdminSeoFields_default } from './AdminSeoFields-EoJae7YW.mjs';
import { u as useApi, a as adminHomeSectionsApiService } from './adminHomeSectionsApiService-C3vooghX.mjs';
import { defineComponent, ref, reactive, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, withDirectives, vModelSelect, createCommentVNode, computed, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderStyle, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
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
import './AdminLangTabs-DVYAqM7r.mjs';
import './AdminCard-BCY_YRzZ.mjs';

//#region components/dashboard/ui/ImageUploader.vue?vue&type=script&setup=true&lang.ts
var ImageUploader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ImageUploader",
	__ssrInlineRender: true,
	props: {
		label: {},
		error: {},
		modelValue: {},
		maxFiles: { default: 1 }
	},
	emits: ["update:modelValue", "upload"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const isDragging = ref(false);
		const uploading = ref(false);
		const showUrlInput = ref(false);
		const urlInputValue = ref("");
		const previews = ref([]);
		const filesList = ref([]);
		const hasImage = computed(() => {
			return previews.value.length > 0 && Boolean(previews.value[0]);
		});
		const currentSinglePreview = computed(() => {
			return previews.value.length > 0 ? previews.value[0] : "";
		});
		const getImageName = (index) => {
			const item = filesList.value[index];
			if (!item) return "";
			if (typeof item === "string") {
				if (item.startsWith("data:image/")) return "صورة مرفوعة (Base64)";
				try {
					const pathParts = new URL(item).pathname.split("/");
					return pathParts[pathParts.length - 1] || item;
				} catch (e) {
					return item.length > 35 ? item.substring(0, 32) + "..." : item;
				}
			}
			return item.name || "image.jpg";
		};
		watch(() => props.modelValue, (newVal) => {
			if (!newVal) {
				previews.value = [];
				filesList.value = [];
				return;
			}
			if (Array.isArray(newVal)) {
				filesList.value = [...newVal];
				previews.value = newVal.map((item) => {
					if (typeof item === "string") return item;
					if (item instanceof File) return URL.createObjectURL(item);
					return "";
				}).filter(Boolean);
			} else {
				filesList.value = [newVal];
				if (typeof newVal === "string") previews.value = newVal ? [newVal] : [];
				else if (newVal instanceof File) previews.value = [URL.createObjectURL(newVal)];
				else previews.value = [];
			}
		}, {
			immediate: true,
			deep: true
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5 w-full" }, _attrs))} data-v-fecb8c12>`);
			if (__props.label) {
				_push(`<div class="flex items-center justify-between" data-v-fecb8c12><label class="text-sm font-bold text-slate-700" data-v-fecb8c12>${ssrInterpolate(__props.label)}</label>`);
				if (__props.maxFiles === 1 && !hasImage.value) _push(`<button type="button" class="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1 cursor-pointer" data-v-fecb8c12><i class="${ssrRenderClass(showUrlInput.value ? "fa-solid fa-cloud-arrow-up" : "fa-solid fa-link")}" data-v-fecb8c12></i><span data-v-fecb8c12>${ssrInterpolate(showUrlInput.value ? "الرفع من الجهاز" : "استخدام رابط مباشر (URL)")}</span></button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (__props.maxFiles === 1 && hasImage.value) _push(`<div class="relative w-full rounded-2xl border border-slate-200 overflow-hidden group bg-slate-50 shadow-sm transition-all" data-v-fecb8c12><div class="relative w-full h-44 sm:h-52 bg-slate-100 flex items-center justify-center overflow-hidden" data-v-fecb8c12><img${ssrRenderAttr("src", currentSinglePreview.value)} alt="Preview" class="w-full h-full object-contain p-2 transition-transform duration-300 group-hover:scale-105" data-v-fecb8c12><div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-xs" data-v-fecb8c12><label class="px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 transition-colors shadow-sm cursor-pointer" title="تغيير الصورة" data-v-fecb8c12><i class="fa-solid fa-arrows-rotate text-indigo-600" data-v-fecb8c12></i><span data-v-fecb8c12>تغيير</span><input type="file" accept="image/*" class="hidden" data-v-fecb8c12></label><button class="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold flex items-center gap-1.5 hover:bg-red-700 transition-colors shadow-sm cursor-pointer" type="button" title="حذف الصورة" data-v-fecb8c12><i class="fa-solid fa-trash-can" data-v-fecb8c12></i><span data-v-fecb8c12>حذف</span></button></div></div><div class="px-3 py-2 bg-white border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500" data-v-fecb8c12><span class="truncate max-w-[200px]" dir="ltr" data-v-fecb8c12>${ssrInterpolate(getImageName(0))}</span><span class="text-emerald-600 font-bold flex items-center gap-1" data-v-fecb8c12><i class="fa-solid fa-circle-check text-[10px]" data-v-fecb8c12></i> تمت المعاينة </span></div></div>`);
			else if (__props.maxFiles === 1 && showUrlInput.value) _push(`<div class="space-y-2" data-v-fecb8c12><div class="flex items-center gap-2" data-v-fecb8c12><div class="relative flex-1" data-v-fecb8c12><input type="url"${ssrRenderAttr("value", urlInputValue.value)} placeholder="https://example.com/image.jpg" class="w-full rounded-xl border border-slate-300 bg-white px-4 h-[44px] text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono" dir="ltr" data-v-fecb8c12></div><button type="button" class="px-4 h-[44px] bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer shrink-0" data-v-fecb8c12><i class="fa-solid fa-check text-xs" data-v-fecb8c12></i> تطبيق </button></div><p class="text-[11px] text-slate-400" data-v-fecb8c12>الصق رابط الصورة الخارجي ثم اضغط على تطبيق.</p></div>`);
			else if (!hasImage.value || __props.maxFiles !== 1) {
				_push(`<div class="${ssrRenderClass([[isDragging.value ? "border-indigo-500 bg-indigo-50/70 scale-[0.99]" : __props.error ? "border-red-400 bg-red-50/30" : "border-slate-300 bg-slate-50/80 hover:bg-slate-100/80 hover:border-indigo-300"], "relative w-full border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer group"])}" data-v-fecb8c12><input type="file"${ssrIncludeBooleanAttr(__props.maxFiles !== 1) ? " multiple" : ""} accept="image/png, image/jpeg, image/webp, image/svg+xml, image/gif" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"${ssrIncludeBooleanAttr(uploading.value) ? " disabled" : ""} data-v-fecb8c12>`);
				if (uploading.value) _push(`<div class="flex flex-col items-center gap-3 text-indigo-600" data-v-fecb8c12><svg class="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-fecb8c12><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-fecb8c12></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-fecb8c12></path></svg><span class="text-xs font-bold" data-v-fecb8c12>جاري معالجة الصورة...</span></div>`);
				else _push(`<div class="flex flex-col items-center gap-2 text-slate-500 pointer-events-none" data-v-fecb8c12><div class="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-xs" data-v-fecb8c12><i class="fa-solid fa-cloud-arrow-up" data-v-fecb8c12></i></div><div class="text-xs font-bold text-slate-700 text-center" data-v-fecb8c12> اضغط هنا لاختيار ${ssrInterpolate(__props.maxFiles === 1 ? "صورة" : "الصور")} أو اسحبها إلى هنا </div><p class="text-[11px] text-slate-400" data-v-fecb8c12>PNG, JPG, WEBP, SVG (حجم أقصى 5MB)</p></div>`);
				_push(`</div>`);
			} else _push(`<!---->`);
			if (__props.error) _push(`<span class="text-xs font-bold text-red-500 mt-0.5 flex items-center gap-1" data-v-fecb8c12><i class="fa-solid fa-circle-exclamation text-[10px]" data-v-fecb8c12></i> ${ssrInterpolate(__props.error)}</span>`);
			else _push(`<!---->`);
			if (__props.maxFiles !== 1 && previews.value.length > 0) {
				_push(`<div class="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3" data-v-fecb8c12><!--[-->`);
				ssrRenderList(previews.value, (preview, index) => {
					_push(`<div class="relative aspect-square rounded-xl border border-slate-200 overflow-hidden group bg-slate-50 shadow-xs" data-v-fecb8c12><img${ssrRenderAttr("src", preview)} class="w-full h-full object-cover" data-v-fecb8c12><div class="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center" data-v-fecb8c12><button class="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm cursor-pointer" type="button" title="حذف" data-v-fecb8c12><i class="fa-solid fa-trash-can text-xs" data-v-fecb8c12></i></button></div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/ImageUploader.vue
var _sfc_setup$1 = ImageUploader_vue_vue_type_script_setup_true_lang_default.setup;
ImageUploader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/ImageUploader.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ImageUploader_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ImageUploader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-fecb8c12"]]), { __name: "DashboardUiImageUploader" });
//#endregion
//#region composables/useStorefrontBuilder.ts
/**
* Storefront Builder Composable (useStorefrontBuilder)
* Uses Admin Brands & Categories API Services to match /admin/brands and /admin/categories dynamically.
*/
var useStorefrontBuilder = () => {
	const toast = useToast();
	const api = useApi();
	const { adminCookie, adminToken } = useAdminAuth();
	const sections = ref([]);
	const brands = ref([]);
	const categories = ref([]);
	const allSubcategories = ref([]);
	const isLoading = ref(false);
	const isLoadingBrands = ref(false);
	const isLoadingCategories = ref(false);
	const isSaving = ref(false);
	const isReordering = ref(false);
	const savingSectionId = ref(null);
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const fetchBrands = async () => {
		isLoadingBrands.value = true;
		try {
			const token = getToken();
			const adminRes = await adminBrandsApiService.fetchBrands(token, "", 1, 100);
			if (adminRes.success && Array.isArray(adminRes.data) && adminRes.data.length > 0) {
				brands.value = adminRes.data.map((b) => {
					const imgUrl = b.image || b.logo || "";
					return {
						id: b.id,
						name: b.name_ar || b.name || b.name_en || "علامة تجارية",
						name_ar: b.name_ar,
						name_en: b.name_en,
						logo: imgUrl,
						image: imgUrl,
						image_full_url: imgUrl,
						slug: (b.name_en || b.name || String(b.id)).toLowerCase().replace(/\s+/g, "-")
					};
				});
				return brands.value;
			}
			const publicRes = await api.get("/api/v1/brands");
			const rawList = Array.isArray(publicRes) ? publicRes : publicRes?.data || [];
			if (Array.isArray(rawList) && rawList.length > 0) brands.value = rawList.map((b, idx) => {
				const logoUrl = b.image_full_url?.path || b.image_full_url || b.logo || b.image || b.icon || "";
				const name = b.name || b.name_ar || b.name_en || b.title_ar || b.title_en || `Brand ${idx + 1}`;
				return {
					id: b.id || idx + 1,
					name,
					name_ar: b.name_ar,
					name_en: b.name_en,
					logo: logoUrl,
					image: logoUrl,
					image_full_url: logoUrl,
					slug: b.slug || name.toLowerCase().replace(/\s+/g, "-")
				};
			}).filter((b) => Boolean(b.name));
			return brands.value;
		} catch (err) {
			console.warn("[useStorefrontBuilder] Failed to fetch live brands:", err);
			return brands.value;
		} finally {
			isLoadingBrands.value = false;
		}
	};
	const fetchCategories = async () => {
		isLoadingCategories.value = true;
		try {
			const token = getToken();
			const [mainRes, subRes] = await Promise.allSettled([adminCategoriesApiService.fetchCategories(token, "", 1), adminCategoriesApiService.fetchCategories(token, "", 1, { position: 1 })]);
			const mappedCategories = [];
			const subList = [];
			if (subRes.status === "fulfilled" && subRes.value.success && Array.isArray(subRes.value.data)) subRes.value.data.forEach((s) => {
				subList.push({
					id: s.id,
					name: s.name_ar || s.name || s.name_en || "تصنيف فرعي",
					name_ar: s.name_ar,
					name_en: s.name_en,
					parent_id: s.parent_id,
					position: s.position,
					slug: s.slug || String(s.id),
					image: s.image || s.icon || "",
					icon: s.icon || ""
				});
			});
			if (mainRes.status === "fulfilled" && mainRes.value.success && Array.isArray(mainRes.value.data)) mainRes.value.data.forEach((c) => {
				const nestedSubs = [];
				if (Array.isArray(c.subCategories) && c.subCategories.length > 0) c.subCategories.forEach((sc) => {
					nestedSubs.push({
						id: sc.id,
						name: sc.name_ar || sc.name || sc.name_en || "تصنيف فرعي",
						name_ar: sc.name_ar,
						name_en: sc.name_en,
						parent_id: c.id,
						position: 1,
						slug: sc.slug || String(sc.id),
						image: sc.image || sc.icon || "",
						icon: sc.icon || ""
					});
				});
				subList.filter((s) => String(s.parent_id) === String(c.id)).forEach((sc) => {
					if (!nestedSubs.some((existing) => String(existing.id) === String(sc.id))) nestedSubs.push(sc);
				});
				mappedCategories.push({
					id: c.id,
					name: c.name_ar || c.name || c.name_en || "تصنيف رئيسي",
					name_ar: c.name_ar,
					name_en: c.name_en,
					parent_id: c.parent_id || 0,
					position: c.position || 0,
					slug: c.slug || (c.name_en || c.name || String(c.id)).toLowerCase().replace(/\s+/g, "-"),
					image: c.image || c.icon || "",
					icon: c.icon || "",
					subCategories: nestedSubs
				});
			});
			if (mappedCategories.length > 0) {
				categories.value = mappedCategories;
				allSubcategories.value = subList;
				return categories.value;
			}
			const publicRes = await api.get("/api/v1/categories");
			const rawList = Array.isArray(publicRes) ? publicRes : publicRes?.data || [];
			if (Array.isArray(rawList) && rawList.length > 0) categories.value = rawList.map((c, idx) => {
				const name = c.name || c.category_name || c.title || `Category ${idx + 1}`;
				const subs = Array.isArray(c.childes || c.sub_categories) ? (c.childes || c.sub_categories).map((sc) => ({
					id: sc.id,
					name: sc.name || sc.name_ar || sc.name_en || "تصنيف فرعي",
					name_ar: sc.name_ar,
					name_en: sc.name_en,
					parent_id: c.id,
					slug: sc.slug || String(sc.id)
				})) : [];
				return {
					id: c.id || idx + 1,
					name,
					name_ar: c.name_ar || name,
					name_en: c.name_en,
					slug: c.slug || name.toLowerCase().replace(/\s+/g, "-"),
					image: c.image || c.icon || "",
					icon: c.icon || "",
					subCategories: subs
				};
			}).filter((c) => Boolean(c.name));
			return categories.value;
		} catch (err) {
			console.warn("[useStorefrontBuilder] Failed to fetch live categories:", err);
			return categories.value;
		} finally {
			isLoadingCategories.value = false;
		}
	};
	const getSubcategoriesForParent = (parentIdOrName) => {
		if (!parentIdOrName) return [];
		const parent = categories.value.find((c) => String(c.id) === String(parentIdOrName) || c.name === parentIdOrName || c.name_ar === parentIdOrName || c.name_en === parentIdOrName);
		if (parent && Array.isArray(parent.subCategories) && parent.subCategories.length > 0) return parent.subCategories;
		if (parent) return allSubcategories.value.filter((s) => String(s.parent_id) === String(parent.id));
		return [];
	};
	const normalizeSection = (sec, idx) => {
		const rawType = sec.type === "hero" ? "hero_slider" : sec.type || "hero_slider";
		let rawData = sec.data;
		if (typeof rawData === "string") try {
			rawData = JSON.parse(rawData);
		} catch (e) {
			rawData = {};
		}
		if (!rawData || typeof rawData !== "object" || Array.isArray(rawData)) rawData = {};
		const normalized = {
			id: sec.id !== void 0 && sec.id !== null && sec.id !== "" ? sec.id : sec.section_id !== void 0 && sec.section_id !== null ? sec.section_id : sec._id || `sec-${rawType}-${idx + 1}`,
			type: rawType,
			sort_order: sec.sort_order !== void 0 ? Number(sec.sort_order) : idx + 1,
			is_active: sec.is_active !== void 0 ? sec.is_active === 1 || sec.is_active === true || sec.is_active === "1" ? 1 : 0 : 1,
			data: { ...rawData }
		};
		switch (rawType) {
			case "hero_slider":
				if (!Array.isArray(normalized.data.slides)) normalized.data.slides = Array.isArray(sec.slides) && sec.slides.length > 0 ? sec.slides : [{
					id: 1,
					imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80",
					mobileImageUrl: "",
					linkUrl: "/category/ac",
					altText: "أقوى التخفيضات"
				}];
				break;
			case "category_slider":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "أقسام المتجر";
				if (normalized.data.limit === void 0) normalized.data.limit = Number(sec.limit) || 12;
				break;
			case "brand_showcase":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "منتجات فيليبس العالمية";
				if (normalized.data.subtitle === void 0) normalized.data.subtitle = sec.subtitle || "ابتكر معنا لحياة أفضل";
				if (normalized.data.brand_id === void 0) normalized.data.brand_id = sec.brand_id || "";
				if (normalized.data.brandName === void 0) normalized.data.brandName = sec.brandName || "PHILIPS";
				if (normalized.data.brandLogo === void 0) normalized.data.brandLogo = sec.brandLogo || "";
				if (normalized.data.bgColor === void 0) normalized.data.bgColor = sec.bgColor || "bg-[#1a66cc]";
				if (normalized.data.viewAllUrl === void 0) normalized.data.viewAllUrl = sec.viewAllUrl || "/brand/philips";
				if (normalized.data.limit === void 0) normalized.data.limit = Number(sec.limit) || 6;
				break;
			case "new_arrivals":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "أحدث المنتجات الواصلة حديثاً";
				if (normalized.data.subtitle === void 0) normalized.data.subtitle = sec.subtitle || "اكتشف أحدث الأجهزة المنزلية";
				if (normalized.data.shopUrl === void 0) normalized.data.shopUrl = sec.shopUrl || "/shop?sort_by=latest";
				if (normalized.data.bgColor === void 0) normalized.data.bgColor = sec.bgColor || sec.bg_color || "bg-[#7dd3fc]";
				if (normalized.data.limit === void 0) normalized.data.limit = Number(sec.limit) || 8;
				break;
			case "brand_campaign":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "خصومات مميزة";
				if (normalized.data.subtitle === void 0) normalized.data.subtitle = sec.subtitle || "أقوى العروض الحصرية";
				if (normalized.data.btnText === void 0) normalized.data.btnText = sec.btnText || "تسوق الآن";
				if (normalized.data.targetUrl === void 0) normalized.data.targetUrl = sec.targetUrl || "/category/kitchen-appliances";
				if (normalized.data.bannerImage === void 0) normalized.data.bannerImage = sec.bannerImage || "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=1600&q=80";
				if (normalized.data.category_id === void 0) normalized.data.category_id = sec.category_id || "";
				if (normalized.data.category === void 0) normalized.data.category = sec.category || "أجهزة المطبخ";
				if (normalized.data.sub_category_id === void 0) normalized.data.sub_category_id = sec.sub_category_id || "";
				if (normalized.data.subCategory === void 0) normalized.data.subCategory = sec.subCategory || "";
				if (normalized.data.brandName === void 0) normalized.data.brandName = sec.brandName || "";
				if (normalized.data.brand_id === void 0) normalized.data.brand_id = sec.brand_id || "";
				if (normalized.data.limit === void 0) normalized.data.limit = Number(sec.limit) || 5;
				break;
			case "side_banner":
				if (!Array.isArray(normalized.data.sideBannerSlides)) normalized.data.sideBannerSlides = Array.isArray(sec.sideBannerSlides) && sec.sideBannerSlides.length > 0 ? sec.sideBannerSlides : [{
					imageUrl: "https://images.unsplash.com/photo-1590725140246-20acdee442be?q=80&w=800&auto=format&fit=crop",
					linkUrl: "/brand/smeg"
				}];
				if (normalized.data.sideBannerUrl === void 0) normalized.data.sideBannerUrl = sec.sideBannerUrl || "";
				if (normalized.data.category_id === void 0) normalized.data.category_id = sec.category_id || "";
				if (normalized.data.category === void 0) normalized.data.category = sec.category || "أجهزة المطبخ";
				if (normalized.data.sub_category_id === void 0) normalized.data.sub_category_id = sec.sub_category_id || "";
				if (normalized.data.subCategory === void 0) normalized.data.subCategory = sec.subCategory || "";
				if (normalized.data.brandName === void 0) normalized.data.brandName = sec.brandName || "";
				if (normalized.data.limit === void 0) normalized.data.limit = Number(sec.limit) || 5;
				break;
			case "store_features":
				if (!Array.isArray(normalized.data.features)) normalized.data.features = Array.isArray(sec.features) && sec.features.length > 0 ? sec.features : [{
					icon: "fa-solid fa-truck-fast",
					title: "توصيل سريع وآمن",
					desc: "توصيل مجاني للطلبات فوق 300 ريال"
				}, {
					icon: "fa-solid fa-shield-halved",
					title: "ضمان الوكيل الأصلي",
					desc: "جميع الأجهزة الكهربائية بأعلى جودة"
				}];
				break;
			case "brands_ticker":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "شركاؤنا من كبرى العلامات التجارية";
				if (!Array.isArray(normalized.data.brandLogos)) normalized.data.brandLogos = Array.isArray(sec.brandLogos) && sec.brandLogos.length > 0 ? sec.brandLogos : [{
					name: "PHILIPS",
					imageUrl: "https://upload.wikimedia.org/wikipedia/commons/4/46/Philips_logo.svg",
					linkUrl: "/brand/philips"
				}];
				break;
			case "store_guarantees":
				if (!Array.isArray(normalized.data.guarantees)) normalized.data.guarantees = Array.isArray(sec.guarantees) && sec.guarantees.length > 0 ? sec.guarantees : [{
					icon: "fa-solid fa-certificate",
					title: "منتجات أصلية 100%",
					desc: "جميع منتجاتنا مضمونة من الوكيل المعتمد"
				}];
				break;
			case "store_location":
				if (normalized.data.title === void 0) normalized.data.title = sec.title || "زيارة معرضنا الرئيسي";
				if (normalized.data.address === void 0) normalized.data.address = sec.address || "جدة - حي الصفا - طريق الملك فهد";
				if (normalized.data.workingHours === void 0) normalized.data.workingHours = sec.workingHours || "يومياً من 10 صباحاً إلى 11 مساءً";
				if (normalized.data.phone === void 0) normalized.data.phone = sec.phone || "01286000037";
				if (normalized.data.mapsUrl === void 0) normalized.data.mapsUrl = sec.mapsUrl || "https://maps.google.com";
		}
		return normalized;
	};
	const fetchSections = async () => {
		isLoading.value = true;
		try {
			const rawList = await adminHomeSectionsApiService.getSections();
			sections.value = rawList.map((sec, idx) => normalizeSection(sec, idx));
			syncSortOrders();
			return sections.value;
		} catch (err) {
			console.error("[useStorefrontBuilder] Error fetching sections:", err);
			toast.error("تعذر جلب أقسام واجهة المتجر من الخادم");
			return [];
		} finally {
			isLoading.value = false;
		}
	};
	const syncSortOrders = () => {
		sections.value.forEach((sec, idx) => {
			sec.sort_order = idx + 1;
		});
	};
	const preparePayloadData = (sec) => {
		const type = sec.type === "hero" ? "hero_slider" : sec.type || "hero_slider";
		const data = sec.data || {};
		switch (type) {
			case "hero_slider": return { slides: (data.slides || []).map((s) => ({
				id: s.id || Date.now(),
				imageUrl: typeof s.imageUrl === "string" ? s.imageUrl : "",
				mobileImageUrl: typeof s.mobileImageUrl === "string" ? s.mobileImageUrl : "",
				linkUrl: s.linkUrl || "",
				altText: s.altText || ""
			})) };
			case "category_slider": return {
				title: data.title || "أقسام المتجر",
				limit: Number(data.limit) || 12
			};
			case "brand_showcase": return {
				brand_id: data.brand_id ? isNaN(Number(data.brand_id)) ? data.brand_id : Number(data.brand_id) : "",
				brandName: data.brandName || "PHILIPS",
				title: data.title || "",
				subtitle: data.subtitle || "",
				brandLogo: typeof data.brandLogo === "string" ? data.brandLogo : "",
				bgColor: data.bgColor || "bg-[#1a66cc]",
				btnColor: data.btnColor || "",
				viewAllUrl: data.viewAllUrl || "",
				limit: Number(data.limit) || 6
			};
			case "new_arrivals": return {
				title: data.title || "أحدث المنتجات الواصلة حديثاً",
				subtitle: data.subtitle || "",
				shopUrl: data.shopUrl || "/shop?sort_by=latest",
				bgColor: data.bgColor || "bg-[#7dd3fc]",
				limit: Number(data.limit) || 8
			};
			case "brand_campaign": return {
				title: data.title || "",
				subtitle: data.subtitle || "",
				btnText: data.btnText || "تسوق الآن",
				targetUrl: data.targetUrl || "",
				bannerImage: typeof data.bannerImage === "string" ? data.bannerImage : "",
				category_id: data.category_id || "",
				category: data.category || "",
				sub_category_id: data.sub_category_id || "",
				subCategory: data.subCategory || "",
				brandName: data.brandName || "",
				brand_id: data.brand_id ? isNaN(Number(data.brand_id)) ? data.brand_id : Number(data.brand_id) : "",
				limit: Number(data.limit) || 5
			};
			case "side_banner": return {
				sideBannerSlides: (data.sideBannerSlides || []).map((slide) => ({
					imageUrl: typeof slide.imageUrl === "string" ? slide.imageUrl : "",
					linkUrl: slide.linkUrl || ""
				})),
				sideBannerUrl: data.sideBannerUrl || "",
				category_id: data.category_id || "",
				category: data.category || "",
				sub_category_id: data.sub_category_id || "",
				subCategory: data.subCategory || "",
				brandName: data.brandName || "",
				limit: Number(data.limit) || 5
			};
			case "store_features": return { features: (data.features || []).map((f) => ({
				icon: f.icon || "fa-solid fa-truck-fast",
				title: f.title || "",
				desc: f.desc || ""
			})) };
			case "brands_ticker": return {
				title: data.title || "",
				brandLogos: (data.brandLogos || []).map((b) => ({
					name: b.name || "",
					imageUrl: typeof b.imageUrl === "string" ? b.imageUrl : "",
					linkUrl: b.linkUrl || ""
				}))
			};
			case "store_guarantees": return { guarantees: (data.guarantees || []).map((g) => ({
				icon: g.icon || "fa-solid fa-certificate",
				title: g.title || "",
				desc: g.desc || ""
			})) };
			case "store_location": return {
				title: data.title || "",
				address: data.address || "",
				workingHours: data.workingHours || "",
				phone: data.phone || "",
				mapsUrl: data.mapsUrl || ""
			};
			default: return data && typeof data === "object" && !Array.isArray(data) ? data : {};
		}
	};
	const saveSection = async (id, sectionPayload) => {
		savingSectionId.value = id;
		try {
			const type = sectionPayload.type === "hero" ? "hero_slider" : sectionPayload.type || "hero_slider";
			const cleanData = preparePayloadData(sectionPayload);
			const payload = {
				type,
				is_active: sectionPayload.is_active ? 1 : 0,
				sort_order: Number(sectionPayload.sort_order) || 1,
				data: cleanData
			};
			const res = await adminHomeSectionsApiService.saveOrUpdateSection(id, payload);
			if (res?.id) sectionPayload.id = res.id;
			else if (res?.data?.id) sectionPayload.id = res.data.id;
			toast.success("تم حفظ تعديلات السكشن بنجاح!");
			return res;
		} catch (err) {
			console.error("[useStorefrontBuilder] Save error:", err);
			toast.error("حدث خطأ أثناء حفظ السكشن");
			throw err;
		} finally {
			savingSectionId.value = null;
		}
	};
	const createSection = async (payload) => {
		try {
			const created = await adminHomeSectionsApiService.createSection({
				type: payload.type === "hero" ? "hero_slider" : payload.type,
				is_active: payload.is_active !== void 0 ? payload.is_active : 1,
				sort_order: payload.sort_order || sections.value.length + 1,
				data: payload.data || {}
			});
			return normalizeSection(created, sections.value.length);
		} catch (err) {
			console.error("[useStorefrontBuilder] Create error:", err);
			throw err;
		}
	};
	const deleteSection = async (id) => {
		if (!(!id || typeof id === "string" && (id.startsWith("sec-") || isNaN(Number(id))))) await adminHomeSectionsApiService.deleteSection(id);
		const idx = sections.value.findIndex((s) => s.id === id);
		if (idx !== -1) {
			sections.value.splice(idx, 1);
			syncSortOrders();
			if (sections.value.length > 0) await reorderSections(sections.value.map((s) => s.id));
		}
	};
	const reorderSections = async (idsOrItems) => {
		isReordering.value = true;
		try {
			const payload = idsOrItems.map((item, idx) => {
				if (typeof item === "object" && item !== null) return {
					id: item.id,
					sort_order: idx + 1
				};
				return {
					id: item,
					sort_order: idx + 1
				};
			});
			await adminHomeSectionsApiService.reorderSections(payload);
		} catch (err) {
			console.error("[useStorefrontBuilder] Reorder error:", err);
		} finally {
			isReordering.value = false;
		}
	};
	return {
		sections,
		brands,
		categories,
		allSubcategories,
		isLoading,
		isLoadingBrands,
		isLoadingCategories,
		isSaving,
		isReordering,
		savingSectionId,
		fetchBrands,
		fetchCategories,
		getSubcategoriesForParent,
		fetchSections,
		saveSection,
		createSection,
		deleteSection,
		reorderSections,
		syncSortOrders,
		normalizeSection,
		preparePayloadData
	};
};
//#endregion
//#region pages/admin/storefront/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		const { success, error: toastError } = useToast();
		useHead$1({ title: "إدارة واجهة المتجر | لوحة تحكم أسوار جدة" });
		const { sections, brands, categories, isLoading, isLoadingBrands, isLoadingCategories, isSaving, isReordering, savingSectionId, getSubcategoriesForParent, saveSection, createSection, reorderSections, syncSortOrders } = useStorefrontBuilder();
		const activeLangTab = ref("ar");
		const storefrontSeo = reactive({
			metaTitleAr: "",
			metaTitleEn: "",
			metaDescriptionAr: "",
			metaDescriptionEn: ""
		});
		const isCreating = ref(false);
		const isAddModalOpen = ref(false);
		const selectedTypeForAdd = ref(null);
		const selectedPositionForAdd = ref(1);
		const collapsedSections = ref({});
		const draggedIndex = ref(null);
		const dragOverIndex = ref(null);
		const availableSectionTypes = [
			{
				type: "hero_slider",
				title: "السليدر الرئيسي (Hero Slider)",
				description: "شرائح صور رئيسية كبيرة تظهر في أعلى الصفحة لترويج أهم العروض.",
				icon: "fa-solid fa-images"
			},
			{
				type: "category_slider",
				title: "أقسام المتجر (Category Slider)",
				description: "شريط ينقل الزوار بين الأقسام الرئيسية للمتجر تلقائياً.",
				icon: "fa-solid fa-layer-group"
			},
			{
				type: "brand_showcase",
				title: "عرض منتجات ماركة (Brand Showcase)",
				description: "سكشن بتصميم مخصص يعرض منتجات ماركة عالمية معينة (مثل Philips).",
				icon: "fa-solid fa-tag"
			},
			{
				type: "new_arrivals",
				title: "أحدث المنتجات (New Arrivals)",
				description: "شبكة تعرض أحدث المنتجات الواصلة حديثاً للمتجر.",
				icon: "fa-solid fa-bolt"
			},
			{
				type: "brand_campaign",
				title: "حملة ترويجية (Brand Campaign)",
				description: "بانر عريض مع قائمة المنتجات المرتبطة بالحملة.",
				icon: "fa-solid fa-bullhorn"
			},
			{
				type: "side_banner",
				title: "بانر جانبي ومنتجات (Side Banner)",
				description: "سلايدر بانر جانبي متحرك وبجانبه سلايدر منتجات متناسق.",
				icon: "fa-solid fa-sliders"
			},
			{
				type: "store_features",
				title: "مميزات المتجر (Store Features)",
				description: "شريط يعرض خيارات الشحن، التوصيل، والدفع للعملاء.",
				icon: "fa-solid fa-truck-fast"
			},
			{
				type: "brands_ticker",
				title: "شريط الماركات المتحرك (Brands Ticker)",
				description: "شريط يعرض شعارات الماركات الشريكة بشكل انسيابي.",
				icon: "fa-solid fa-certificate"
			},
			{
				type: "store_guarantees",
				title: "ضمانات المتجر (Store Guarantees)",
				description: "قسم يوضح الضمان المعتمد وسياسة الاستبدال.",
				icon: "fa-solid fa-shield-halved"
			},
			{
				type: "store_location",
				title: "موقع المعرض (Store Location)",
				description: "خريطة ومعلومات التواصل لزيارة معرض المتجر.",
				icon: "fa-solid fa-location-dot"
			}
		];
		const extractHex = (bgColorClass) => {
			if (!bgColorClass) return "#1a66cc";
			const match = bgColorClass.match(/bg-\[(#[0-9A-Fa-f]{6})\]/);
			return match ? match[1] : bgColorClass.startsWith("#") ? bgColorClass : "#1a66cc";
		};
		const isSectionCollapsed = (id) => {
			return collapsedSections.value[String(id)] ?? true;
		};
		const openAddModal = () => {
			selectedTypeForAdd.value = null;
			selectedPositionForAdd.value = sections.value.length + 1;
			isAddModalOpen.value = true;
		};
		const selectSectionType = (type) => {
			selectedTypeForAdd.value = type;
			selectedPositionForAdd.value = sections.value.length + 1;
		};
		const getSelectedTypeIcon = (type) => {
			if (!type) return "fa-solid fa-cube";
			const found = availableSectionTypes.find((opt) => opt.type === type);
			return found ? found.icon : "fa-solid fa-cube";
		};
		const confirmAddSection = async () => {
			if (!selectedTypeForAdd.value) return;
			const rawType = selectedTypeForAdd.value;
			const normalizedType = rawType === "hero" ? "hero_slider" : rawType;
			const targetPos = Math.max(1, Math.min(sections.value.length + 1, Number(selectedPositionForAdd.value) || sections.value.length + 1));
			isCreating.value = true;
			try {
				const created = await createSection({
					type: normalizedType,
					is_active: 1,
					sort_order: targetPos
				});
				const targetIdx = targetPos - 1;
				sections.value.splice(targetIdx, 0, created);
				collapsedSections.value[String(created.id)] = false;
				syncSortOrders();
				await reorderSections(sections.value.map((s, idx) => ({
					id: s.id,
					sort_order: idx + 1
				})));
				const addedTitle = getSectionTitle(normalizedType);
				isAddModalOpen.value = false;
				selectedTypeForAdd.value = null;
				success(`تمت إضافة سكشن ${addedTitle} بنجاح!`);
			} catch (err) {
				console.error("Error creating section:", err);
				toastError("حدث خطأ أثناء إضافة السكشن");
			} finally {
				isCreating.value = false;
			}
		};
		const saveAllLayout = async () => {
			try {
				for (const section of sections.value) await saveSection(section.id, section);
				await reorderSections(sections.value.map((s, idx) => ({
					id: s.id,
					sort_order: idx + 1
				})));
				success("تم حفظ وتحديث كافة أقسام الواجهة بنجاح!");
			} catch (err) {
				toastError("حدث خطأ أثناء حفظ التغييرات");
			}
		};
		const getSectionTitle = (type) => {
			if (!type) return "";
			return {
				hero: "السليدر الرئيسي (Hero)",
				hero_slider: "السليدر الرئيسي (Hero)",
				category_slider: "أقسام المتجر (Categories)",
				brand_showcase: "عرض منتجات ماركة (Brand Showcase)",
				new_arrivals: "أحدث المنتجات (New Arrivals)",
				brand_campaign: "حملة ترويجية (Brand Campaign)",
				side_banner: "بانر جانبي ومنتجات (Side Banner)",
				store_features: "مميزات المتجر (Store Features)",
				brands_ticker: "شريط الماركات المتحرك (Brands Ticker)",
				store_guarantees: "ضمانات المتجر (Store Guarantees)",
				store_location: "موقع المعرض (Store Location)"
			}[type] || type;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6 pb-28 max-w-7xl mx-auto relative",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إدارة واجهة المتجر والصفحة الرئيسية",
				subtitle: "تخصيص كافة أقسام الصفحة الرئيسية باللغتين العربية والإنجليزية، إعادة الترتيب بالسحب والإفلات، وإدارة المحتوى.",
				icon: "fa-solid fa-cubes-stacked",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "إدارة واجهة المتجر" }],
				"show-lang-tabs": true,
				"lang-tab": activeLangTab.value,
				"onUpdate:langTab": ($event) => activeLangTab.value = $event,
				"show-save": true,
				"is-saving": unref(isSaving),
				"save-label": "حفظ ونشر التعديلات",
				onSave: saveAllLayout
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/",
							target: "_blank",
							class: "px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"${_scopeId}></i><span class="hidden sm:inline"${_scopeId}>معاينة المتجر</span>`);
								else return [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, "معاينة المتجر")];
							}),
							_: 1
						}, _parent, _scopeId));
						_push(`<button type="button" class="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"${_scopeId}><i class="fa-solid fa-plus text-xs"${_scopeId}></i><span${_scopeId}>إضافة سكشن جديد</span></button>`);
					} else return [createVNode(_component_NuxtLink, {
						to: "/",
						target: "_blank",
						class: "px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
					}, {
						default: withCtx(() => [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, "معاينة المتجر")]),
						_: 1
					}), createVNode("button", {
						type: "button",
						onClick: openAddModal,
						class: "px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-sm cursor-pointer"
					}, [createVNode("i", { class: "fa-solid fa-plus text-xs" }), createVNode("span", null, "إضافة سكشن جديد")])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="bg-amber-50/80 border border-amber-200/80 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900"><div class="flex items-center gap-2.5"><i class="fa-solid fa-language text-amber-600 text-base shrink-0"></i><span> أنت الآن في وضع تحرير: <strong class="font-black text-slate-900 underline">${ssrInterpolate(activeLangTab.value === "ar" ? "🇸🇦 اللغة العربية (Arabic)" : "🇺🇸 اللغة الإنجليزية (English)")}</strong>. يمكنك التبديل بين اللغتين من التبويب بالأعلى أو التعديل المباشر على الحقول أدناه. </span></div><div class="flex items-center gap-1.5 shrink-0"><button type="button" class="${ssrRenderClass(["px-3 py-1 rounded-lg font-black transition-all cursor-pointer", activeLangTab.value === "ar" ? "bg-amber-500 text-white shadow-xs" : "bg-white text-slate-700 border border-slate-200"])}"> 🇸🇦 عربي </button><button type="button" class="${ssrRenderClass(["px-3 py-1 rounded-lg font-black transition-all cursor-pointer", activeLangTab.value === "en" ? "bg-amber-500 text-white shadow-xs" : "bg-white text-slate-700 border border-slate-200"])}"> 🇺🇸 English </button></div></div>`);
			if (!unref(isLoading) && unref(sections).length > 0) _push(`<div class="flex flex-wrap items-center justify-between gap-3 px-2 text-xs font-bold text-slate-500"><div class="flex items-center gap-2"><span>إجمالي الأقسام: <strong class="text-slate-800 font-black">${ssrInterpolate(unref(sections).length)}</strong></span><span class="text-slate-300">|</span><span class="text-indigo-600 font-normal hidden sm:inline flex items-center gap-1"><i class="fa-solid fa-arrows-up-down text-[10px]"></i> يمكنك سحب وإفلات أي بطاقة لتغيير ترتيب ظهورها </span></div><div class="flex items-center gap-3"><button type="button" class="hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-angles-down text-[10px]"></i> توسيع الكل </button><span class="text-slate-300">|</span><button type="button" class="hover:text-indigo-600 transition-colors flex items-center gap-1 cursor-pointer"><i class="fa-solid fa-angles-up text-[10px]"></i> طي الكل </button></div></div>`);
			else _push(`<!---->`);
			if (unref(isLoading)) _push(ssrRenderComponent(AdminSkeletonForm_default, { cards: 4 }, null, _parent));
			else if (unref(sections).length === 0) _push(`<div class="bg-white rounded-3xl p-12 border border-slate-100 text-center space-y-4 shadow-sm"><div class="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto"><i class="fa-solid fa-folder-open text-2xl"></i></div><h3 class="text-lg font-bold text-slate-800">لا توجد أقسام مضافة حالياً في الصفحة الرئيسية</h3><p class="text-sm text-slate-500 max-w-md mx-auto">يمكنك إضافة أي سكشن وتخصيص محتواه ونماذجه بالكامل من خلال الضغط على زر إضافة سكشن جديد.</p><button class="px-6 py-3 bg-[#0B0E28] hover:bg-slate-900 text-white font-bold text-sm rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"><i class="fa-solid fa-plus text-xs"></i> إضافة سكشن جديد الآن </button></div>`);
			else {
				_push(`<div class="space-y-5"><!--[-->`);
				ssrRenderList(unref(sections), (section, index) => {
					_push(`<div draggable="true" class="${ssrRenderClass([
						"bg-white rounded-3xl shadow-sm border overflow-hidden transition-all duration-200",
						dragOverIndex.value === index ? "border-indigo-500 ring-2 ring-indigo-200 shadow-md scale-[1.01]" : "border-slate-100",
						draggedIndex.value === index ? "opacity-40 border-dashed border-indigo-400" : ""
					])}"><div class="bg-slate-50/80 px-5 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 cursor-pointer hover:bg-slate-100/80 transition-colors select-none group"><div class="flex items-center gap-3"><span class="w-6 h-6 text-slate-400 group-hover:text-indigo-600 flex items-center justify-center cursor-grab active:cursor-grabbing shrink-0" title="اسحب لتغيير الترتيب"><i class="fa-solid fa-grip-vertical text-sm"></i></span><span class="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-xs shrink-0 shadow-xs">${ssrInterpolate(index + 1)}</span><div class="flex items-center gap-2 flex-wrap"><h3 class="font-black text-slate-800 text-sm md:text-base">${ssrInterpolate(getSectionTitle(section.type))}</h3><span class="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-0.5 rounded-lg border border-slate-200 uppercase tracking-wider hidden sm:inline-block">${ssrInterpolate(section.type)}</span><span class="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-100"> الترتيب: ${ssrInterpolate(section.sort_order || index + 1)}</span></div></div><div class="flex items-center gap-2"><button type="button" class="${ssrRenderClass(["px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border", section.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"])}"${ssrRenderAttr("title", section.is_active ? "القسم مفعل وظاهر للزوار (اضغط للتعطيل)" : "القسم معطل ومخفي (اضغط للتفعيل)")}><span class="${ssrRenderClass(["w-2 h-2 rounded-full", section.is_active ? "bg-emerald-500 animate-pulse" : "bg-slate-400"])}"></span><span>${ssrInterpolate(section.is_active ? "مفعل" : "معطل")}</span></button><div class="h-4 w-px bg-slate-300 mx-0.5"></div><button type="button"${ssrIncludeBooleanAttr(index === 0 || unref(isReordering)) ? " disabled" : ""} class="w-8 h-8 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer" title="تحريك للأعلى"><i class="fa-solid fa-arrow-up text-xs"></i></button><button type="button"${ssrIncludeBooleanAttr(index === unref(sections).length - 1 || unref(isReordering)) ? " disabled" : ""} class="w-8 h-8 text-slate-500 hover:text-slate-800 hover:bg-slate-200/80 rounded-xl transition-colors flex items-center justify-center disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer" title="تحريك للأسفل"><i class="fa-solid fa-arrow-down text-xs"></i></button><div class="h-4 w-px bg-slate-300 mx-0.5"></div><button type="button" class="px-3 py-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-colors flex items-center gap-1.5 text-xs font-bold cursor-pointer" title="حذف هذا السكشن"><i class="fa-solid fa-trash-can text-xs"></i><span class="hidden sm:inline">حذف</span></button><div class="h-4 w-px bg-slate-300 mx-0.5"></div><button type="button" class="w-8 h-8 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors flex items-center justify-center cursor-pointer"${ssrRenderAttr("title", isSectionCollapsed(section.id) ? "توسيع السكشن" : "طي السكشن")}><i class="${ssrRenderClass(["fa-solid transition-transform duration-300 text-xs", isSectionCollapsed(section.id) ? "fa-chevron-down" : "fa-chevron-up"])}"></i></button></div></div><div class="p-6 md:p-8 bg-white space-y-6" style="${ssrRenderStyle(!isSectionCollapsed(section.id) ? null : { display: "none" })}"><div class="flex items-center justify-between pb-3 border-b border-slate-100"><span class="text-xs font-bold text-slate-400">لغة عرض وتحرير الحقول:</span><div class="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200"><button type="button" class="${ssrRenderClass(["px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer", activeLangTab.value === "ar" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"])}"> 🇸🇦 العربية </button><button type="button" class="${ssrRenderClass(["px-3 py-1 text-xs font-black rounded-lg transition-all cursor-pointer", activeLangTab.value === "en" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-500 hover:text-slate-800"])}"> 🇺🇸 English </button></div></div>`);
					if (section.type === "hero" || section.type === "hero_slider") {
						_push(`<div class="space-y-6"><div class="flex items-center justify-between border-b border-slate-100 pb-3"><div><h4 class="font-black text-slate-800 text-sm">شرائح السليدر الرئيسي (Hero Slides)</h4><p class="text-xs text-slate-500 mt-0.5">إدارة شرائح البانر الرئيسي: رفع الصور للكمبيوتر والموبايل مع الرابط والنص الترويجي باللغتين.</p></div><button type="button" class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"><i class="fa-solid fa-plus text-xs"></i> إضافة شريحة جديدة </button></div><!--[-->`);
						ssrRenderList(section.data.slides || [], (slide, sIdx) => {
							_push(`<div class="flex flex-col md:flex-row gap-6 bg-slate-50/50 p-5 rounded-2xl border border-slate-200/80 items-start relative group"><div class="shrink-0 w-full sm:w-60 space-y-3">`);
							_push(ssrRenderComponent(ImageUploader_default, {
								modelValue: slide.imageUrl,
								"onUpdate:modelValue": ($event) => slide.imageUrl = $event,
								label: `صورة الشاشة الكبيرة ${sIdx + 1} (Desktop)`,
								maxFiles: 1
							}, null, _parent));
							_push(ssrRenderComponent(ImageUploader_default, {
								modelValue: slide.mobileImageUrl,
								"onUpdate:modelValue": ($event) => slide.mobileImageUrl = $event,
								label: `صورة الموبايل ${sIdx + 1} (اختياري)`,
								maxFiles: 1
							}, null, _parent));
							_push(`</div><div class="flex-1 w-full space-y-4">`);
							if (activeLangTab.value === "ar") {
								_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: slide.altText,
									"onUpdate:modelValue": ($event) => slide.altText = $event,
									label: "العنوان الترويجي / الوصف المختصر (عربي)",
									placeholder: "مثال: أقوى التخفيضات على المكيفات"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: slide.linkUrl,
									"onUpdate:modelValue": ($event) => slide.linkUrl = $event,
									label: "رابط التوجيه عند النقر (Target URL)",
									placeholder: "/category/ac",
									dir: "ltr"
								}, null, _parent));
								_push(`</div>`);
							} else {
								_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: slide.altText_en,
									"onUpdate:modelValue": ($event) => slide.altText_en = $event,
									label: "Promotional Title / Alt Text (English)",
									placeholder: "e.g. Mega Sale on ACs",
									dir: "ltr"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: slide.linkUrl,
									"onUpdate:modelValue": ($event) => slide.linkUrl = $event,
									label: "Target Link URL",
									placeholder: "/category/ac",
									dir: "ltr"
								}, null, _parent));
								_push(`</div>`);
							}
							_push(`</div><div class="flex items-center gap-1 shrink-0 self-end md:self-start pt-2 md:pt-0"><button type="button"${ssrIncludeBooleanAttr(sIdx === 0) ? " disabled" : ""} class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-xl transition-colors disabled:opacity-30 cursor-pointer" title="تحريك للأعلى"><i class="fa-solid fa-arrow-up text-xs"></i></button><button type="button"${ssrIncludeBooleanAttr(sIdx === (section.data.slides || []).length - 1) ? " disabled" : ""} class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-xl transition-colors disabled:opacity-30 cursor-pointer" title="تحريك للأسفل"><i class="fa-solid fa-arrow-down text-xs"></i></button>`);
							if ((section.data.slides || []).length > 1) _push(`<button type="button" class="p-2 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl transition-colors cursor-pointer" title="حذف الشريحة"><i class="fa-solid fa-trash-can text-xs"></i></button>`);
							else _push(`<!---->`);
							_push(`</div></div>`);
						});
						_push(`<!--]--></div>`);
					} else if (section.type === "category_slider") {
						_push(`<div class="space-y-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
						if (activeLangTab.value === "ar") {
							_push(`<div>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان السكشن الرئيسي (عربي)",
								placeholder: "أقسام المتجر"
							}, null, _parent));
							_push(`</div>`);
						} else {
							_push(`<div>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Section Title (English)",
								placeholder: "Store Categories",
								dir: "ltr"
							}, null, _parent));
							_push(`</div>`);
						}
						_push(`<div class="space-y-2"><label class="block text-sm font-bold text-slate-700">عدد الأقسام المعروضة (Limit)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold"><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 6) : ssrLooseEqual(section.data.limit, 6)) ? " selected" : ""}>6 أقسام</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 8) : ssrLooseEqual(section.data.limit, 8)) ? " selected" : ""}>8 أقسام</option><option${ssrRenderAttr("value", 12)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 12) : ssrLooseEqual(section.data.limit, 12)) ? " selected" : ""}>12 قسم</option><option${ssrRenderAttr("value", 16)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 16) : ssrLooseEqual(section.data.limit, 16)) ? " selected" : ""}>16 قسم</option><option${ssrRenderAttr("value", 24)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 24) : ssrLooseEqual(section.data.limit, 24)) ? " selected" : ""}>24 قسم</option></select></div></div><div class="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 flex items-center justify-between gap-3"><div class="flex items-center gap-3"><i class="fa-solid fa-circle-info text-indigo-600 text-base shrink-0"></i><p class="text-xs text-indigo-900 leading-relaxed">هذا السكشن يقوم بجلب أقسام وتصنيفات المتجر الرئيسية والصور الخاصة بها تلقائياً ومباشرة من قاعدة البيانات (تم تحميل ${ssrInterpolate(unref(categories).length)} تصنيف).</p></div>`);
						if (unref(isLoadingCategories)) _push(`<span class="text-xs text-indigo-600 font-bold flex items-center gap-1 shrink-0"><i class="fa-solid fa-spinner fa-spin"></i></span>`);
						else _push(`<!---->`);
						_push(`</div></div>`);
					} else if (section.type === "brand_showcase") {
						_push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
						if (activeLangTab.value === "ar") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان السكشن (عربي)",
								placeholder: "مثال: منتجات فيليبس العالمية"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle,
								"onUpdate:modelValue": ($event) => section.data.subtitle = $event,
								label: "العنوان الفرعي الترويجي (عربي)",
								placeholder: "مثال: ابتكر معنا لحياة أفضل"
							}, null, _parent));
							_push(`<!--]-->`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Section Title (English)",
								placeholder: "e.g. Philips World-Class Products",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle_en,
								"onUpdate:modelValue": ($event) => section.data.subtitle_en = $event,
								label: "Promotional Subtitle (English)",
								placeholder: "e.g. Innovation and you",
								dir: "ltr"
							}, null, _parent));
							_push(`<!--]-->`);
						}
						_push(`<div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-bold text-slate-700">اختيار العلامة التجارية (من قاعدة البيانات)</label>`);
						if (unref(isLoadingBrands)) _push(`<span class="text-[11px] text-indigo-600 font-bold flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin text-[10px]"></i> جلب الماركات... </span>`);
						else _push(`<!---->`);
						_push(`</div><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(section.data.brand_id) ? ssrLooseContain(section.data.brand_id, "") : ssrLooseEqual(section.data.brand_id, "")) ? " selected" : ""}>-- اختر العلامة التجارية من القائمة --</option><!--[-->`);
						ssrRenderList(unref(brands), (brand) => {
							_push(`<option${ssrRenderAttr("value", brand.id)}${ssrIncludeBooleanAttr(Array.isArray(section.data.brand_id) ? ssrLooseContain(section.data.brand_id, brand.id) : ssrLooseEqual(section.data.brand_id, brand.id)) ? " selected" : ""}>${ssrInterpolate(brand.name_ar && brand.name_en && brand.name_ar !== brand.name_en ? `${brand.name_ar} (${brand.name_en})` : brand.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold"><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 4) : ssrLooseEqual(section.data.limit, 4)) ? " selected" : ""}>4 منتجات</option><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 6) : ssrLooseEqual(section.data.limit, 6)) ? " selected" : ""}>6 منتجات</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 8) : ssrLooseEqual(section.data.limit, 8)) ? " selected" : ""}>8 منتجات</option><option${ssrRenderAttr("value", 12)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 12) : ssrLooseEqual(section.data.limit, 12)) ? " selected" : ""}>12 منتج</option></select></div>`);
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: section.data.viewAllUrl,
							"onUpdate:modelValue": ($event) => section.data.viewAllUrl = $event,
							label: "رابط زر عرض الكل",
							placeholder: "/brand/philips",
							dir: "ltr"
						}, null, _parent));
						_push(`<div class="space-y-2"><label class="block text-sm font-bold text-slate-700">لون خلفية القسم</label><div class="flex items-center gap-3"><input type="color"${ssrRenderAttr("value", extractHex(section.data.bgColor))} class="w-11 h-11 rounded-xl cursor-pointer border border-slate-200 p-1"><input type="text"${ssrRenderAttr("value", section.data.bgColor)} placeholder="bg-[#1a66cc]" class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono" dir="ltr"></div></div></div><div class="bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100/80 flex items-center justify-between gap-4"><div class="flex items-center gap-3.5"><div class="w-14 h-14 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center overflow-hidden shrink-0 shadow-xs">`);
						if (section.data.brandLogo) _push(`<img${ssrRenderAttr("src", section.data.brandLogo)}${ssrRenderAttr("alt", section.data.brandName)} class="w-full h-full object-contain">`);
						else _push(`<i class="fa-solid fa-tag text-slate-400 text-xl"></i>`);
						_push(`</div><div><div class="flex items-center gap-2"><span class="text-xs font-bold text-slate-800">${ssrInterpolate(section.data.brandName || "لم يتم تحديد ماركة بعد")}</span>`);
						if (section.data.brand_id) _push(`<span class="text-[10px] font-bold bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-md">ID: ${ssrInterpolate(section.data.brand_id)}</span>`);
						else _push(`<!---->`);
						_push(`</div><p class="text-[11px] text-slate-500 mt-0.5">يتم جلب شعار الماركة واسمها وربط منتجاتها تلقائياً وبشكل ديناميكي من حقل image_full_url في الـ Backend.</p></div></div></div></div>`);
					} else if (section.type === "new_arrivals") {
						_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
						if (activeLangTab.value === "ar") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان السكشن (عربي)",
								placeholder: "أحدث المنتجات الواصلة حديثاً"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle,
								"onUpdate:modelValue": ($event) => section.data.subtitle = $event,
								label: "العنوان الفرعي (عربي)",
								placeholder: "اكتشف أحدث الأجهزة المنزلية"
							}, null, _parent));
							_push(`<!--]-->`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Section Title (English)",
								placeholder: "New Arrivals",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle_en,
								"onUpdate:modelValue": ($event) => section.data.subtitle_en = $event,
								label: "Subtitle (English)",
								placeholder: "Discover the latest home appliances",
								dir: "ltr"
							}, null, _parent));
							_push(`<!--]-->`);
						}
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: section.data.shopUrl,
							"onUpdate:modelValue": ($event) => section.data.shopUrl = $event,
							label: "رابط زر تسوق الآن / عرض الكل",
							placeholder: "/shop?sort_by=latest",
							dir: "ltr"
						}, null, _parent));
						_push(`<div class="space-y-2"><label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold"><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 4) : ssrLooseEqual(section.data.limit, 4)) ? " selected" : ""}>4 منتجات</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 8) : ssrLooseEqual(section.data.limit, 8)) ? " selected" : ""}>8 منتجات</option><option${ssrRenderAttr("value", 12)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 12) : ssrLooseEqual(section.data.limit, 12)) ? " selected" : ""}>12 منتج</option><option${ssrRenderAttr("value", 16)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 16) : ssrLooseEqual(section.data.limit, 16)) ? " selected" : ""}>16 منتج</option></select></div><div class="space-y-2 col-span-1 md:col-span-2"><label class="block text-sm font-bold text-slate-700">لون خلفية القسم (Background Color)</label><div class="flex items-center gap-3"><input type="color"${ssrRenderAttr("value", extractHex(section.data.bgColor || "#7dd3fc"))} class="w-11 h-11 rounded-xl cursor-pointer border border-slate-200 p-1"><input type="text"${ssrRenderAttr("value", section.data.bgColor)} placeholder="bg-[#7dd3fc] أو #7dd3fc" class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-mono" dir="ltr"></div></div></div>`);
					} else if (section.type === "brand_campaign") {
						_push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
						if (activeLangTab.value === "ar") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان الحملة الترويجية (عربي)",
								placeholder: "مثال: خصومات Tineco الكبرى"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle,
								"onUpdate:modelValue": ($event) => section.data.subtitle = $event,
								label: "الوصف / العنوان الفرعي (عربي)",
								placeholder: "أقوى العروض على أجهزة التنظيف الذكية"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.btnText,
								"onUpdate:modelValue": ($event) => section.data.btnText = $event,
								label: "نص الزر الترويجي (عربي)",
								placeholder: "تسوق منتجات الحملة"
							}, null, _parent));
							_push(`<!--]-->`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Campaign Title (English)",
								placeholder: "e.g. Mega Tineco Savings",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.subtitle_en,
								"onUpdate:modelValue": ($event) => section.data.subtitle_en = $event,
								label: "Description / Subtitle (English)",
								placeholder: "Best offers on smart appliances",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.btnText_en,
								"onUpdate:modelValue": ($event) => section.data.btnText_en = $event,
								label: "CTA Button Text (English)",
								placeholder: "Shop Campaign Products",
								dir: "ltr"
							}, null, _parent));
							_push(`<!--]-->`);
						}
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: section.data.targetUrl,
							"onUpdate:modelValue": ($event) => section.data.targetUrl = $event,
							label: "رابط التحويل المستهدف",
							placeholder: "/brand/tineco",
							dir: "ltr"
						}, null, _parent));
						_push(`<div class="space-y-2"><div class="flex items-center justify-between"><label class="block text-sm font-bold text-slate-700">التصنيف الرئيسي (من قاعدة البيانات)</label>`);
						if (unref(isLoadingCategories)) _push(`<span class="text-[11px] text-indigo-600 font-bold flex items-center gap-1"><i class="fa-solid fa-spinner fa-spin text-[10px]"></i> جلب التصنيفات... </span>`);
						else _push(`<!---->`);
						_push(`</div><select${ssrRenderAttr("value", section.data.category_id || section.data.category)} class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"><option value="">-- كافة التصنيفات الرئيسية --</option><!--[-->`);
						ssrRenderList(unref(categories), (cat) => {
							_push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.name_ar && cat.name_en && cat.name_ar !== cat.name_en ? `${cat.name_ar} (${cat.name_en})` : cat.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">التصنيف الفرعي (اختياري)</label><select${ssrRenderAttr("value", section.data.sub_category_id || section.data.subCategory)}${ssrIncludeBooleanAttr(!section.data.category_id && !section.data.category) ? " disabled" : ""} class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"><option value="">-- كافة التصنيفات الفرعية لهذا القسم --</option><!--[-->`);
						ssrRenderList(unref(getSubcategoriesForParent)(section.data.category_id || section.data.category), (sub) => {
							_push(`<option${ssrRenderAttr("value", sub.id)}> ↳ ${ssrInterpolate(sub.name_ar && sub.name_en && sub.name_ar !== sub.name_en ? `${sub.name_ar} (${sub.name_en})` : sub.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">أو تصفية حسب الماركة</label><select${ssrRenderAttr("value", section.data.brand_id || section.data.brandName)} class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"><option value="">بدون تحديد ماركة محددة</option><!--[-->`);
						ssrRenderList(unref(brands), (brand) => {
							_push(`<option${ssrRenderAttr("value", brand.id)}>${ssrInterpolate(brand.name_ar && brand.name_en && brand.name_ar !== brand.name_en ? `${brand.name_ar} (${brand.name_en})` : brand.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة (Limit)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold"><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 4) : ssrLooseEqual(section.data.limit, 4)) ? " selected" : ""}>4 منتجات</option><option${ssrRenderAttr("value", 5)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 5) : ssrLooseEqual(section.data.limit, 5)) ? " selected" : ""}>5 منتجات</option><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 6) : ssrLooseEqual(section.data.limit, 6)) ? " selected" : ""}>6 منتجات</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 8) : ssrLooseEqual(section.data.limit, 8)) ? " selected" : ""}>8 منتجات</option><option${ssrRenderAttr("value", 10)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 10) : ssrLooseEqual(section.data.limit, 10)) ? " selected" : ""}>10 منتجات</option></select></div></div><div class="max-w-xl">`);
						_push(ssrRenderComponent(ImageUploader_default, {
							modelValue: section.data.bannerImage,
							"onUpdate:modelValue": ($event) => section.data.bannerImage = $event,
							label: "صورة البانر العريض للحملة (Desktop & Tablet)",
							maxFiles: 1
						}, null, _parent));
						_push(`</div></div>`);
					} else if (section.type === "side_banner") {
						_push(`<div class="space-y-6"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">التصنيف الرئيسي المستهدف</label><select${ssrRenderAttr("value", section.data.category_id || section.data.category)} class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"><option value="">كافة التصنيفات</option><!--[-->`);
						ssrRenderList(unref(categories), (cat) => {
							_push(`<option${ssrRenderAttr("value", cat.id)}>${ssrInterpolate(cat.name_ar && cat.name_en && cat.name_ar !== cat.name_en ? `${cat.name_ar} (${cat.name_en})` : cat.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">التصنيف الفرعي</label><select${ssrRenderAttr("value", section.data.sub_category_id || section.data.subCategory)}${ssrIncludeBooleanAttr(!section.data.category_id && !section.data.category) ? " disabled" : ""} class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer disabled:opacity-50"><option value="">كافة الأقسام الفرعية</option><!--[-->`);
						ssrRenderList(unref(getSubcategoriesForParent)(section.data.category_id || section.data.category), (sub) => {
							_push(`<option${ssrRenderAttr("value", sub.id)}> ↳ ${ssrInterpolate(sub.name_ar && sub.name_en && sub.name_ar !== sub.name_en ? `${sub.name_ar} (${sub.name_en})` : sub.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">أو تصفية حسب الماركة</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(section.data.brandName) ? ssrLooseContain(section.data.brandName, "") : ssrLooseEqual(section.data.brandName, "")) ? " selected" : ""}>بدون تحديد ماركة</option><!--[-->`);
						ssrRenderList(unref(brands), (brand) => {
							_push(`<option${ssrRenderAttr("value", brand.name)}${ssrIncludeBooleanAttr(Array.isArray(section.data.brandName) ? ssrLooseContain(section.data.brandName, brand.name) : ssrLooseEqual(section.data.brandName, brand.name)) ? " selected" : ""}>${ssrInterpolate(brand.name)}</option>`);
						});
						_push(`<!--]--></select></div><div class="space-y-2"><label class="block text-sm font-bold text-slate-700">عدد المنتجات المعروضة</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 font-bold"><option${ssrRenderAttr("value", 4)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 4) : ssrLooseEqual(section.data.limit, 4)) ? " selected" : ""}>4 منتجات</option><option${ssrRenderAttr("value", 5)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 5) : ssrLooseEqual(section.data.limit, 5)) ? " selected" : ""}>5 منتجات</option><option${ssrRenderAttr("value", 6)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 6) : ssrLooseEqual(section.data.limit, 6)) ? " selected" : ""}>6 منتجات</option><option${ssrRenderAttr("value", 8)}${ssrIncludeBooleanAttr(Array.isArray(section.data.limit) ? ssrLooseContain(section.data.limit, 8) : ssrLooseEqual(section.data.limit, 8)) ? " selected" : ""}>8 منتجات</option></select></div></div><div class="space-y-4"><div class="flex items-center justify-between border-b border-slate-100 pb-2"><div><h5 class="text-sm font-bold text-slate-800">صور السلايدر الجانبي المتحرك</h5><p class="text-xs text-slate-500 mt-0.5">يمكنك إضافة أكثر من صورة ليتم تقليبها انسيابياً بجانب المنتجات.</p></div><button type="button" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"><i class="fa-solid fa-plus text-xs"></i> إضافة صورة للسلايدر الجانبي </button></div><!--[-->`);
						ssrRenderList(section.data.sideBannerSlides || [], (slide, bsIdx) => {
							_push(`<div class="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/70 items-center"><div class="w-full sm:w-48 shrink-0">`);
							_push(ssrRenderComponent(ImageUploader_default, {
								modelValue: slide.imageUrl,
								"onUpdate:modelValue": ($event) => slide.imageUrl = $event,
								label: `صورة البانر الجانبي ${bsIdx + 1}`,
								maxFiles: 1
							}, null, _parent));
							_push(`</div><div class="flex-1 w-full">`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: slide.linkUrl,
								"onUpdate:modelValue": ($event) => slide.linkUrl = $event,
								label: "رابط التوجيه عند الضغط على الصورة",
								placeholder: "/brand/smeg",
								dir: "ltr"
							}, null, _parent));
							_push(`</div><div class="flex items-center gap-1"><button type="button"${ssrIncludeBooleanAttr(bsIdx === 0) ? " disabled" : ""} class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30 cursor-pointer" title="تحريك للأعلى"><i class="fa-solid fa-arrow-up text-xs"></i></button><button type="button"${ssrIncludeBooleanAttr(bsIdx === (section.data.sideBannerSlides || []).length - 1) ? " disabled" : ""} class="p-2 text-slate-400 hover:text-slate-700 bg-white border border-slate-200 rounded-lg transition-colors disabled:opacity-30 cursor-pointer" title="تحريك للأسفل"><i class="fa-solid fa-arrow-down text-xs"></i></button>`);
							if ((section.data.sideBannerSlides || []).length > 1) _push(`<button type="button" class="p-2 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer" title="حذف الصورة"><i class="fa-solid fa-trash-can text-xs"></i></button>`);
							else _push(`<!---->`);
							_push(`</div></div>`);
						});
						_push(`<!--]--></div></div>`);
					} else if (section.type === "store_features") {
						_push(`<div class="space-y-4"><div class="flex items-center justify-between border-b border-slate-100 pb-2"><div><h5 class="text-sm font-bold text-slate-800">بطاقات مميزات المتجر (أيقونة + عنوان + وصف) باللغتين</h5><p class="text-xs text-slate-500 mt-0.5">تظهر أسفل السليدر أو بأعلى الصفحة لتعزيز ثقة العميل.</p></div><button type="button" class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"><i class="fa-solid fa-plus text-xs"></i> إضافة ميزة جديدة </button></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
						ssrRenderList(section.data.features || [], (item, fIdx) => {
							_push(`<div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative group"><button type="button" class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer" title="حذف الميزة"><i class="fa-solid fa-xmark text-xs"></i></button><div class="space-y-1"><label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome)</label><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0"><i class="${ssrRenderClass(item.icon || "fa-solid fa-star")}"></i></div><input type="text"${ssrRenderAttr("value", item.icon)} placeholder="fa-solid fa-truck-fast" class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-mono" dir="ltr"></div></div>`);
							if (activeLangTab.value === "ar") {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: item.title,
									"onUpdate:modelValue": ($event) => item.title = $event,
									label: "العنوان الرئيسي للميزة (عربي)",
									placeholder: "مثال: شحن سريع وآمن"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: item.desc,
									"onUpdate:modelValue": ($event) => item.desc = $event,
									label: "الوصف التوضيحي للميزة (عربي)",
									placeholder: "مثال: توصيل مجاني للطلبات فوق 300 ريال"
								}, null, _parent));
								_push(`<!--]-->`);
							} else {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: item.title_en,
									"onUpdate:modelValue": ($event) => item.title_en = $event,
									label: "Feature Title (English)",
									placeholder: "e.g. Fast & Secure Shipping",
									dir: "ltr"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: item.desc_en,
									"onUpdate:modelValue": ($event) => item.desc_en = $event,
									label: "Feature Description (English)",
									placeholder: "e.g. Free shipping on orders over 300 SAR",
									dir: "ltr"
								}, null, _parent));
								_push(`<!--]-->`);
							}
							_push(`</div>`);
						});
						_push(`<!--]--></div></div>`);
					} else if (section.type === "brands_ticker") {
						_push(`<div class="space-y-4"><div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-3"><div><h5 class="text-sm font-bold text-slate-800">شريط شعارات الماركات المتحرك</h5><p class="text-xs text-slate-500 mt-0.5">يمكنك ضبط عنوان الشريط واختيار الماركات من قاعدة البيانات أو تخصيصها.</p></div><div class="flex items-center gap-2"><button type="button" class="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer" title="سحب كافة ماركات المتجر للشريط بنقرة واحدة"><i class="fa-solid fa-cloud-arrow-down text-xs"></i> مزامنة كافة ماركات المتجر </button><button type="button" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"><i class="fa-solid fa-plus text-xs"></i> إضافة ماركة </button></div></div><div class="max-w-md">`);
						if (activeLangTab.value === "ar") {
							_push(`<div>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان الشريط الترويجي (عربي)",
								placeholder: "شركاؤنا من كبرى الماركات العالمية"
							}, null, _parent));
							_push(`</div>`);
						} else {
							_push(`<div>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Ticker Title (English)",
								placeholder: "Our Global Trusted Partners",
								dir: "ltr"
							}, null, _parent));
							_push(`</div>`);
						}
						_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"><!--[-->`);
						ssrRenderList(section.data.brandLogos || [], (brand, bIdx) => {
							_push(`<div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative"><button type="button" class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer" title="حذف الماركة"><i class="fa-solid fa-xmark text-xs"></i></button><div class="space-y-1"><label class="block text-xs font-bold text-slate-700">اختر من ماركات المتجر</label><select class="w-full rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-bold text-slate-800"><option value="">-- تخصيص يدوي أو اختر ماركة --</option><!--[-->`);
							ssrRenderList(unref(brands), (dbBrand) => {
								_push(`<option${ssrRenderAttr("value", dbBrand.id)}>${ssrInterpolate(dbBrand.name)}</option>`);
							});
							_push(`<!--]--></select></div>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: brand.name,
								"onUpdate:modelValue": ($event) => brand.name = $event,
								label: "اسم الماركة",
								placeholder: "PHILIPS"
							}, null, _parent));
							_push(ssrRenderComponent(ImageUploader_default, {
								modelValue: brand.imageUrl,
								"onUpdate:modelValue": ($event) => brand.imageUrl = $event,
								label: "شعار الماركة (PNG بخلفية شفافة)",
								maxFiles: 1
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: brand.linkUrl,
								"onUpdate:modelValue": ($event) => brand.linkUrl = $event,
								label: "رابط التوجيه للماركة",
								placeholder: "/brand/philips",
								dir: "ltr"
							}, null, _parent));
							_push(`</div>`);
						});
						_push(`<!--]--></div></div>`);
					} else if (section.type === "store_guarantees") {
						_push(`<div class="space-y-4"><div class="flex items-center justify-between border-b border-slate-100 pb-2"><div><h5 class="text-sm font-bold text-slate-800">عناصر قسم الضمانات المعتمدة باللغتين</h5><p class="text-xs text-slate-500 mt-0.5">ضمانات الأصالة، الاستبدال، وخدمة ما بعد البيع.</p></div><button type="button" class="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"><i class="fa-solid fa-plus text-xs"></i> إضافة ضمان جديد </button></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
						ssrRenderList(section.data.guarantees || [], (guarantee, gIdx) => {
							_push(`<div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 relative"><button type="button" class="absolute top-2 left-2 text-rose-400 hover:text-rose-600 p-1 cursor-pointer" title="حذف الضمان"><i class="fa-solid fa-xmark text-xs"></i></button><div class="space-y-1"><label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome)</label><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm shrink-0"><i class="${ssrRenderClass(guarantee.icon || "fa-solid fa-shield-halved")}"></i></div><input type="text"${ssrRenderAttr("value", guarantee.icon)} placeholder="fa-solid fa-certificate" class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[38px] text-xs font-mono" dir="ltr"></div></div>`);
							if (activeLangTab.value === "ar") {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: guarantee.title,
									"onUpdate:modelValue": ($event) => guarantee.title = $event,
									label: "عنوان الضمان (عربي)",
									placeholder: "منتجات أصلية 100%"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: guarantee.desc,
									"onUpdate:modelValue": ($event) => guarantee.desc = $event,
									label: "تفاصيل وشروط الضمان (عربي)",
									placeholder: "مضمونة من الوكيل المعتمد مباشرة"
								}, null, _parent));
								_push(`<!--]-->`);
							} else {
								_push(`<!--[-->`);
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: guarantee.title_en,
									"onUpdate:modelValue": ($event) => guarantee.title_en = $event,
									label: "Guarantee Title (English)",
									placeholder: "100% Genuine Products",
									dir: "ltr"
								}, null, _parent));
								_push(ssrRenderComponent(BaseInput_default, {
									modelValue: guarantee.desc_en,
									"onUpdate:modelValue": ($event) => guarantee.desc_en = $event,
									label: "Guarantee Details (English)",
									placeholder: "Directly covered by authorized agency",
									dir: "ltr"
								}, null, _parent));
								_push(`<!--]-->`);
							}
							_push(`</div>`);
						});
						_push(`<!--]--></div></div>`);
					} else if (section.type === "store_location") {
						_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
						if (activeLangTab.value === "ar") {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title,
								"onUpdate:modelValue": ($event) => section.data.title = $event,
								label: "عنوان السكشن الرئيسي (عربي)",
								placeholder: "تفضل بزيارة معرضنا الرئيسي"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.address,
								"onUpdate:modelValue": ($event) => section.data.address = $event,
								label: "العنوان التفصيلي للمعرض (عربي)",
								placeholder: "جدة، المملكة العربية السعودية - طريق الملك فهد"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.workingHours,
								"onUpdate:modelValue": ($event) => section.data.workingHours = $event,
								label: "مواعيد وأوقات العمل (عربي)",
								placeholder: "يومياً من 10 صباحاً حتى 11 مساءً"
							}, null, _parent));
							_push(`<!--]-->`);
						} else {
							_push(`<!--[-->`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.title_en,
								"onUpdate:modelValue": ($event) => section.data.title_en = $event,
								label: "Section Title (English)",
								placeholder: "Visit Our Main Showroom",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.address_en,
								"onUpdate:modelValue": ($event) => section.data.address_en = $event,
								label: "Showroom Address (English)",
								placeholder: "King Fahd Road, Jeddah, Saudi Arabia",
								dir: "ltr"
							}, null, _parent));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: section.data.workingHours_en,
								"onUpdate:modelValue": ($event) => section.data.workingHours_en = $event,
								label: "Working Hours (English)",
								placeholder: "Daily: 10:00 AM - 11:00 PM",
								dir: "ltr"
							}, null, _parent));
							_push(`<!--]-->`);
						}
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: section.data.phone,
							"onUpdate:modelValue": ($event) => section.data.phone = $event,
							label: "رقم الهاتف والتواصل",
							placeholder: "01286000037",
							dir: "ltr"
						}, null, _parent));
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: section.data.mapsUrl,
							"onUpdate:modelValue": ($event) => section.data.mapsUrl = $event,
							label: "رابط خرائط جوجل (Google Maps URL)",
							placeholder: "https://maps.google.com",
							dir: "ltr",
							class: "col-span-1 md:col-span-2"
						}, null, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`<div class="pt-4 border-t border-slate-100 flex items-center justify-between"><span class="text-xs text-slate-400">سيتم حفظ كائن الـ data المحدث لهذا السكشن فورياً في الـ Backend.</span><button type="button"${ssrIncludeBooleanAttr(unref(savingSectionId) === section.id) ? " disabled" : ""} class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50">`);
					if (unref(savingSectionId) === section.id) _push(`<i class="fa-solid fa-spinner fa-spin text-xs"></i>`);
					else _push(`<i class="fa-solid fa-check text-xs"></i>`);
					_push(`<span>${ssrInterpolate(unref(savingSectionId) === section.id ? "جاري الحفظ..." : "حفظ تعديلات هذا السكشن")}</span></button></div></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(ssrRenderComponent(BaseModal_default, {
				modelValue: isAddModalOpen.value,
				"onUpdate:modelValue": ($event) => isAddModalOpen.value = $event,
				"is-open": isAddModalOpen.value,
				title: selectedTypeForAdd.value ? "تحديد موضع السكشن الجديد" : "إضافة سكشن جديد للصفحة الرئيسية",
				onClose: ($event) => {
					isAddModalOpen.value = false;
					selectedTypeForAdd.value = null;
				},
				size: "lg"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (!selectedTypeForAdd.value) {
						_push(`<div class="space-y-4"${_scopeId}><p class="text-xs text-slate-500"${_scopeId}>اختر نوع السكشن الذي ترغب في إضافته إلى الصفحة الرئيسية:</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto p-1"${_scopeId}><!--[-->`);
						ssrRenderList(availableSectionTypes, (option) => {
							_push(`<button type="button" class="flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all text-start group cursor-pointer"${_scopeId}><div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-lg shrink-0 transition-colors"${_scopeId}><i class="${ssrRenderClass(option.icon)}"${_scopeId}></i></div><div class="space-y-1"${_scopeId}><h5 class="text-sm font-bold text-slate-800 group-hover:text-indigo-900"${_scopeId}>${ssrInterpolate(option.title)}</h5><p class="text-[11px] text-slate-500 line-clamp-2 leading-relaxed"${_scopeId}>${ssrInterpolate(option.description)}</p></div></button>`);
						});
						_push(`<!--]--></div></div>`);
					} else {
						_push(`<div class="space-y-5"${_scopeId}><div class="flex items-center gap-3 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100"${_scopeId}><div class="w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg shrink-0"${_scopeId}><i class="${ssrRenderClass(getSelectedTypeIcon(selectedTypeForAdd.value))}"${_scopeId}></i></div><div${_scopeId}><h5 class="text-sm font-bold text-indigo-950"${_scopeId}>${ssrInterpolate(getSectionTitle(selectedTypeForAdd.value))}</h5><span class="text-xs text-indigo-700"${_scopeId}>نوع السكشن المختار</span></div></div><div class="space-y-2"${_scopeId}><label class="block text-sm font-bold text-slate-700"${_scopeId}>موضع ظهور السكشن في الصفحة (الترتيب)</label><select class="w-full rounded-xl border border-slate-200 bg-white px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"${_scopeId}><option${ssrRenderAttr("value", 1)}${ssrIncludeBooleanAttr(Array.isArray(selectedPositionForAdd.value) ? ssrLooseContain(selectedPositionForAdd.value, 1) : ssrLooseEqual(selectedPositionForAdd.value, 1)) ? " selected" : ""}${_scopeId}>في بداية الصفحة (الموضع 1)</option><!--[-->`);
						ssrRenderList(unref(sections).length, (pos) => {
							_push(`<option${ssrRenderAttr("value", pos + 1)}${ssrIncludeBooleanAttr(Array.isArray(selectedPositionForAdd.value) ? ssrLooseContain(selectedPositionForAdd.value, pos + 1) : ssrLooseEqual(selectedPositionForAdd.value, pos + 1)) ? " selected" : ""}${_scopeId}> بعد سكشن ${ssrInterpolate(pos)} (الموضع ${ssrInterpolate(pos + 1)}) </option>`);
						});
						_push(`<!--]--></select></div><div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100"${_scopeId}><button type="button" class="px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"${_scopeId}> رجوع لاختيار نوع آخر </button><button type="button"${ssrIncludeBooleanAttr(isCreating.value) ? " disabled" : ""} class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"${_scopeId}>`);
						if (isCreating.value) _push(`<i class="fa-solid fa-spinner fa-spin text-xs"${_scopeId}></i>`);
						else _push(`<!---->`);
						_push(`<span${_scopeId}>${ssrInterpolate(isCreating.value ? "جاري الإضافة..." : "تأكيد وإضافة السكشن")}</span></button></div></div>`);
					}
					else return [!selectedTypeForAdd.value ? (openBlock(), createBlock("div", {
						key: 0,
						class: "space-y-4"
					}, [createVNode("p", { class: "text-xs text-slate-500" }, "اختر نوع السكشن الذي ترغب في إضافته إلى الصفحة الرئيسية:"), createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[60vh] overflow-y-auto p-1" }, [(openBlock(), createBlock(Fragment, null, renderList(availableSectionTypes, (option) => {
						return createVNode("button", {
							key: option.type,
							type: "button",
							onClick: ($event) => selectSectionType(option.type),
							class: "flex items-start gap-3.5 p-4 rounded-2xl border border-slate-200/80 hover:border-indigo-500 hover:bg-indigo-50/40 transition-all text-start group cursor-pointer"
						}, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white flex items-center justify-center text-lg shrink-0 transition-colors" }, [createVNode("i", { class: option.icon }, null, 2)]), createVNode("div", { class: "space-y-1" }, [createVNode("h5", { class: "text-sm font-bold text-slate-800 group-hover:text-indigo-900" }, toDisplayString(option.title), 1), createVNode("p", { class: "text-[11px] text-slate-500 line-clamp-2 leading-relaxed" }, toDisplayString(option.description), 1)])], 8, ["onClick"]);
					}), 64))])])) : (openBlock(), createBlock("div", {
						key: 1,
						class: "space-y-5"
					}, [
						createVNode("div", { class: "flex items-center gap-3 p-3.5 bg-indigo-50/60 rounded-xl border border-indigo-100" }, [createVNode("div", { class: "w-10 h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg shrink-0" }, [createVNode("i", { class: getSelectedTypeIcon(selectedTypeForAdd.value) }, null, 2)]), createVNode("div", null, [createVNode("h5", { class: "text-sm font-bold text-indigo-950" }, toDisplayString(getSectionTitle(selectedTypeForAdd.value)), 1), createVNode("span", { class: "text-xs text-indigo-700" }, "نوع السكشن المختار")])]),
						createVNode("div", { class: "space-y-2" }, [createVNode("label", { class: "block text-sm font-bold text-slate-700" }, "موضع ظهور السكشن في الصفحة (الترتيب)"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => selectedPositionForAdd.value = $event,
							class: "w-full rounded-xl border border-slate-200 bg-white px-4 h-[44px] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-slate-800"
						}, [createVNode("option", { value: 1 }, "في بداية الصفحة (الموضع 1)"), (openBlock(true), createBlock(Fragment, null, renderList(unref(sections).length, (pos) => {
							return openBlock(), createBlock("option", {
								key: pos + 1,
								value: pos + 1
							}, " بعد سكشن " + toDisplayString(pos) + " (الموضع " + toDisplayString(pos + 1) + ") ", 9, ["value"]);
						}), 128))], 8, ["onUpdate:modelValue"]), [[
							vModelSelect,
							selectedPositionForAdd.value,
							void 0,
							{ number: true }
						]])]),
						createVNode("div", { class: "flex items-center justify-end gap-3 pt-4 border-t border-slate-100" }, [createVNode("button", {
							type: "button",
							onClick: ($event) => selectedTypeForAdd.value = null,
							class: "px-4 py-2 text-slate-600 hover:text-slate-900 text-xs font-bold transition-colors cursor-pointer"
						}, " رجوع لاختيار نوع آخر ", 8, ["onClick"]), createVNode("button", {
							type: "button",
							onClick: confirmAddSection,
							disabled: isCreating.value,
							class: "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
						}, [isCreating.value ? (openBlock(), createBlock("i", {
							key: 0,
							class: "fa-solid fa-spinner fa-spin text-xs"
						})) : createCommentVNode("", true), createVNode("span", null, toDisplayString(isCreating.value ? "جاري الإضافة..." : "تأكيد وإضافة السكشن"), 1)], 8, ["disabled"])])
					]))];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(AdminSeoFields_default, {
				"meta-title-ar": storefrontSeo.metaTitleAr,
				"onUpdate:metaTitleAr": ($event) => storefrontSeo.metaTitleAr = $event,
				"meta-title-en": storefrontSeo.metaTitleEn,
				"onUpdate:metaTitleEn": ($event) => storefrontSeo.metaTitleEn = $event,
				"meta-description-ar": storefrontSeo.metaDescriptionAr,
				"onUpdate:metaDescriptionAr": ($event) => storefrontSeo.metaDescriptionAr = $event,
				"meta-description-en": storefrontSeo.metaDescriptionEn,
				"onUpdate:metaDescriptionEn": ($event) => storefrontSeo.metaDescriptionEn = $event,
				"active-lang": activeLangTab.value,
				"title-ar-label": "عنوان الصفحة في محركات البحث (عربي - Meta Title)",
				"title-ar-placeholder": "متجر أسوار جدة | الأجهزة الكهربائية والمنزلية الأصلية",
				"title-en-label": "Homepage Meta Title (English)",
				"title-en-placeholder": "Aswar Jeddah Store | Premium Electronics & Home Appliances",
				"desc-ar-label": "وصف المتجر في جوجل (عربي - Meta Description)",
				"desc-ar-placeholder": "تسوق أفضل الأجهزة الكهربائية والمنزلية والتنظيف الذكي في المملكة العربية السعودية مع ضمان معتمد.",
				"desc-en-label": "Homepage Meta Description (English)",
				"desc-en-placeholder": "Shop top home appliances, smart cleaning devices and electronics in Saudi Arabia with official warranty."
			}, null, _parent));
			_push(ssrRenderComponent(AdminSaveBar_default, {
				"is-saving": unref(isSaving),
				"show-status": false,
				"preview-url": "/",
				"save-label": "حفظ ونشر التعديلات",
				onSave: saveAllLayout
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/storefront/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/storefront/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var storefront_default = index_vue_vue_type_script_setup_true_lang_default;

export { storefront_default as default };
//# sourceMappingURL=storefront-BAjFT1PX.mjs.map
