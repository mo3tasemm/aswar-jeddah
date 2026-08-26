import { _ as _plugin_vue_export_helper_default, N as NuxtLink, c as useNuxtApp, f as useAdminAuth } from '../virtual/entry.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { T as TheToast_default } from './TheToast-zsI2cH7U.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAuth } from './useAuth-IbNI92RZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { a as useAuthDrawer, u as useCompare } from './useCompare-BYK443T-.mjs';
import { a as adminSettingsApiService } from './adminSettingsApiService-C7FyPisQ.mjs';
import { a as adminNavbarApiService } from './adminNavbarApiService-D0ZIw4fK.mjs';
import { _ as _sfc_main$1 } from './EmptyState-DApFxOYg.mjs';
import { u as useWishlist } from './useWishlist-BWj6pk_8.mjs';
import { defineComponent, mergeProps, unref, ref, watch, computed, withCtx, openBlock, createBlock, createVNode, toDisplayString, createCommentVNode, createTextVNode, useSSRContext } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderClass, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderTeleport, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import './apiConfig-CCR2eNes.mjs';

//#region components/layout/LanguageSwitcher.vue?vue&type=script&setup=true&lang.ts
var LanguageSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LanguageSwitcher",
	__ssrInlineRender: true,
	props: { isScrolled: { type: Boolean } },
	setup(__props) {
		const { currentLanguage} = useLanguage();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				class: ["flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer select-none", [__props.isScrolled ? "bg-slate-800/90 hover:bg-slate-700 text-white border-slate-700" : "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200"]],
				title: unref(currentLanguage) === "ar" ? "Switch to English" : "التحويل للعربية"
			}, _attrs))}><i class="fa-solid fa-globe text-xs text-amber-500"></i><span>${ssrInterpolate(unref(currentLanguage) === "ar" ? "EN" : "عربي")}</span></button>`);
		};
	}
});
//#endregion
//#region components/layout/LanguageSwitcher.vue
var _sfc_setup$8 = LanguageSwitcher_vue_vue_type_script_setup_true_lang_default.setup;
LanguageSwitcher_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/LanguageSwitcher.vue");
	return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
var LanguageSwitcher_default = Object.assign(LanguageSwitcher_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutLanguageSwitcher" });
//#endregion
//#region composables/useStoreSettings.ts
/**
* Public & Universal Store Settings Composable (useStoreSettings)
* Provides centralized reactive access to live store configuration from /admin/settings.
*/
var settingsState = ref({});
var isSettingsLoading = ref(false);
var hasLoadedSettings = ref(false);
var useStoreSettings = () => {
	const { currentLanguage } = useLanguage();
	const { adminToken, adminCookie } = useAdminAuth();
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const fetchStoreSettings = async (forceRefresh = false) => {
		if (hasLoadedSettings.value && !forceRefresh && Object.keys(settingsState.value).length > 0) return settingsState.value;
		isSettingsLoading.value = true;
		try {
			const token = getToken();
			const res = await adminSettingsApiService.fetchSettings(token);
			if (res.success && res.data) {
				settingsState.value = { ...res.data };
				hasLoadedSettings.value = true;
			}
		} catch (err) {
			console.warn("[useStoreSettings] Error fetching settings:", err);
		} finally {
			isSettingsLoading.value = false;
		}
		return settingsState.value;
	};
	const storeName = computed(() => {
		const s = settingsState.value;
		if (currentLanguage?.value === "en") return s.store_name_en || s.meta_title_en || s.store_name_ar || "Aswar Jeddah";
		return s.store_name_ar || s.meta_title || s.store_name_en || "أسوار جدة";
	});
	return {
		settingsState,
		isSettingsLoading,
		hasLoadedSettings,
		fetchStoreSettings,
		storeName,
		storeDescription: computed(() => {
			const s = settingsState.value;
			if (currentLanguage?.value === "en") return s.store_description_en || s.meta_description_en || s.store_description_ar || "";
			return s.store_description_ar || s.meta_description || s.store_description_en || "";
		}),
		logoUrl: computed(() => {
			const s = settingsState.value;
			return s.logo_url || s.mobile_logo_url || "";
		}),
		footerLogoUrl: computed(() => {
			const s = settingsState.value;
			return s.footer_logo_url || s.logo_url || "";
		}),
		phone: computed(() => {
			const s = settingsState.value;
			return s.support_phone || s.hotline || "01286000037";
		}),
		hotline: computed(() => {
			const s = settingsState.value;
			return s.hotline || s.support_phone || "01286000037";
		}),
		email: computed(() => {
			return settingsState.value.support_email || "info@aswarjeddah.com";
		}),
		address: computed(() => {
			const s = settingsState.value;
			if (currentLanguage?.value === "en") return s.shop_address_en || s.address_en || s.shop_address_ar || "Saudi Arabia - Jeddah";
			return s.shop_address_ar || s.address_ar || s.shop_address_en || "المملكة العربية السعودية - جدة";
		}),
		socialLinks: computed(() => {
			const s = settingsState.value;
			return {
				facebook: s.facebook_url || "",
				instagram: s.instagram_url || "",
				twitter: s.twitter_url || "",
				tiktok: s.tiktok_url || "",
				snapchat: s.snapchat_url || "",
				youtube: s.youtube_url || "",
				whatsapp: s.whatsapp_number ? `https://wa.me/${s.whatsapp_number.replace(/\D/g, "")}` : ""
			};
		}),
		copyright: computed(() => {
			const s = settingsState.value;
			const year = (/* @__PURE__ */ new Date()).getFullYear();
			if (currentLanguage?.value === "en") return s.copyright_text_en ? s.copyright_text_en.replace("{year}", String(year)) : `© ${year} ${storeName.value}. All Rights Reserved.`;
			return s.copyright_text_ar ? s.copyright_text_ar.replace("{year}", String(year)) : `جميع الحقوق محفوظة © ${year} لمتجر ${storeName.value}`;
		})
	};
};
//#endregion
//#region composables/usePublicNavbar.ts
/**
* Public Navbar Composable (usePublicNavbar)
* Loads dynamic navbar items configured from /admin/navbar and translates titles with fallback.
*/
var rawNavItems = ref([]);
var isNavLoading = ref(false);
var hasLoadedNav = ref(false);
var usePublicNavbar = () => {
	const { currentLanguage, t } = useLanguage();
	const { adminToken, adminCookie } = useAdminAuth();
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const fetchPublicNavbar = async (forceRefresh = false) => {
		if (hasLoadedNav.value && !forceRefresh && rawNavItems.value.length > 0) return rawNavItems.value;
		isNavLoading.value = true;
		try {
			const token = getToken();
			const res = await adminNavbarApiService.fetchNavbarItems(token);
			if (res.success && Array.isArray(res.data) && res.data.length > 0) {
				rawNavItems.value = res.data;
				hasLoadedNav.value = true;
			}
		} catch (err) {
			console.warn("[usePublicNavbar] Failed to load public navbar:", err);
		} finally {
			isNavLoading.value = false;
		}
		return rawNavItems.value;
	};
	const dynamicNavItems = computed(() => {
		const list = rawNavItems.value.filter((item) => item.is_active === 1 || item.is_active === true);
		if (!list || list.length === 0) return [];
		list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
		const isEn = currentLanguage?.value === "en";
		const formatItem = (item) => ({
			id: item.id,
			name: isEn ? item.title_en || item.title_ar || item.title : item.title_ar || item.title || item.title_en,
			url: item.url || "/",
			target: item.target || "_self",
			badge: item.badge,
			badge_color: item.badge_color,
			icon: item.icon,
			children: []
		});
		if (list.some((item) => Array.isArray(item.children) && item.children.length > 0)) return list.filter((item) => !item.parent_id || item.parent_id === 0 || item.parent_id === "0").map((parent) => {
			const formatted = formatItem(parent);
			if (Array.isArray(parent.children) && parent.children.length > 0) formatted.children = parent.children.filter((c) => c.is_active === 1 || c.is_active === true).map(formatItem);
			return formatted;
		});
		const itemMap = /* @__PURE__ */ new Map();
		list.forEach((item) => {
			itemMap.set(item.id, formatItem(item));
		});
		const rootItems = [];
		list.forEach((item) => {
			const current = itemMap.get(item.id);
			if (item.parent_id && itemMap.has(item.parent_id)) {
				const parent = itemMap.get(item.parent_id);
				if (!parent.children) parent.children = [];
				parent.children.push(current);
			} else rootItems.push(current);
		});
		return rootItems;
	});
	const defaultFallbackLinks = computed(() => [
		{
			id: "app-1",
			name: t("cat.appliances"),
			url: "/category/appliances",
			target: "_self"
		},
		{
			id: "app-2",
			name: t("cat.houseware"),
			url: "/category/houseware",
			target: "_self"
		},
		{
			id: "app-3",
			name: t("cat.security"),
			url: "/category/security",
			target: "_self"
		},
		{
			id: "app-4",
			name: t("cat.laptops"),
			url: "/category/laptops",
			target: "_self"
		},
		{
			id: "app-5",
			name: t("cat.networks"),
			url: "/category/networks",
			target: "_self"
		},
		{
			id: "app-6",
			name: t("cat.pos"),
			url: "/category/pos",
			target: "_self"
		},
		{
			id: "app-7",
			name: t("cat.mobile"),
			url: "/category/mobile",
			target: "_self"
		},
		{
			id: "app-8",
			name: t("cat.scooter"),
			url: "/category/scooter",
			target: "_self"
		},
		{
			id: "app-9",
			name: `${t("cat.blog")} 📝`,
			url: "/blog",
			target: "_self"
		}
	]);
	return {
		rawNavItems,
		isNavLoading,
		fetchPublicNavbar,
		dynamicNavItems,
		navItems: computed(() => {
			if (dynamicNavItems.value.length > 0) return dynamicNavItems.value;
			return defaultFallbackLinks.value;
		})
	};
};
//#endregion
//#region components/layout/TheHeader.vue?vue&type=script&setup=true&lang.ts
var TheHeader_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TheHeader",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		useRouter();
		const { user, isLoggedIn, userName, userEmail } = useAuth();
		const { cartCount, formattedCartTotal} = useCart();
		const { t, layoutDirection, currentLanguage, localePath } = useLanguage();
		useAuthDrawer();
		const { storeName, logoUrl, hotline} = useStoreSettings();
		const { navItems} = usePublicNavbar();
		const searchQuery = ref("");
		const isScrolled = ref(false);
		const isMobileMenuOpen = ref(false);
		const isUserDropdownOpen = ref(false);
		const activeHoveredMenuId = ref(null);
		const expandedMobileMenus = ref({});
		const headerImgError = ref(false);
		const logoLoadError = ref(false);
		const resolveItemIcon = (icon, url, name) => {
			if (icon && typeof icon === "string" && icon.trim().length > 0) {
				const trimmed = icon.trim();
				if (trimmed.startsWith("fa-solid ") || trimmed.startsWith("fa-regular ") || trimmed.startsWith("fa-brands ") || trimmed.startsWith("fa ")) return trimmed;
				if (trimmed.startsWith("fa-")) return `fa-solid ${trimmed}`;
				return `fa-solid fa-${trimmed}`;
			}
			const u = (url || "").toLowerCase();
			const n = (name || "").toLowerCase();
			if (u === "/" || u === "" || n.includes("الرئيسية") || n.includes("home")) return "fa-solid fa-house";
			if (u.includes("shop") || n.includes("متجر") || n.includes("منتجات")) return "fa-solid fa-store";
			if (u.includes("category") || n.includes("قسم") || n.includes("أقسام")) return "fa-solid fa-folder-tree";
			if (u.includes("brand") || n.includes("مارك") || n.includes("brand")) return "fa-solid fa-tag";
			if (u.includes("blog") || n.includes("مدون") || n.includes("blog")) return "fa-solid fa-newspaper";
			if (u.includes("offer") || n.includes("عروض") || n.includes("تخفيض")) return "fa-solid fa-percent";
			if (u.includes("contact") || n.includes("اتصل") || n.includes("تواصل")) return "fa-solid fa-headset";
			if (u.includes("about") || n.includes("من نحن") || n.includes("عن")) return "fa-solid fa-circle-info";
			return "fa-solid fa-link";
		};
		watch(() => route.fullPath, () => {
			isMobileMenuOpen.value = false;
			isUserDropdownOpen.value = false;
		});
		const resolvedLogoUrl = computed(() => {
			if (logoUrl.value && typeof logoUrl.value === "string" && logoUrl.value.trim().length > 0) return logoUrl.value;
			return "";
		});
		const userHeaderAvatarUrl = computed(() => {
			const u = user.value;
			const raw = u?.image_full_url?.path || u?.image_full_url || u?.image || u?.avatar || u?.profile_image;
			if (!raw) return null;
			let str = typeof raw === "object" && raw?.path ? raw.path : String(raw);
			if (!str || typeof str !== "string" || !str.trim()) return null;
			if (str.startsWith("blob:") || str.startsWith("data:")) return str;
			let clean = str.replace(/(https?:\/\/)|(\/+)/g, (match, protocol) => {
				return protocol ? protocol : "/";
			});
			if (!clean.startsWith("http://") && !clean.startsWith("https://")) clean = "https://wedgetstore.com/" + clean.replace(/^\/+/, "");
			return clean;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<header${ssrRenderAttrs(mergeProps({
				class: ["sticky top-0 z-50 w-full font-sans shadow-md border-b transition-all duration-300 ease-in-out gpu-header", isScrolled.value ? "bg-[#0B0E28]/95 backdrop-blur-md border-slate-800 text-white py-2" : "bg-white border-slate-200/80 text-slate-900 py-3 sm:py-4"],
				dir: unref(layoutDirection)
			}, _attrs))} data-v-1884f75b><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8" data-v-1884f75b><div class="flex items-center justify-between gap-2 sm:gap-4 md:gap-6" data-v-1884f75b><div class="flex items-center gap-3 shrink-0" data-v-1884f75b><button type="button" class="${ssrRenderClass([isScrolled.value ? "text-amber-400 hover:text-amber-300" : "text-slate-900 hover:text-amber-600", "lg:hidden p-1.5 -ms-1.5 rounded-xl text-slate-800 hover:text-amber-500 active:scale-90 transition-all cursor-pointer select-none"])}" aria-label="القائمة الرئيسية" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-6 h-6 sm:w-7 sm:h-7" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" data-v-1884f75b></path></svg></button>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "hidden lg:flex items-center gap-2 group shrink-0"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (resolvedLogoUrl.value && !logoLoadError.value) _push(`<img${ssrRenderAttr("src", resolvedLogoUrl.value)}${ssrRenderAttr("alt", unref(storeName) || "أسوار جدة - Aswar Jeddah")} class="${ssrRenderClass(["transition-all duration-300 object-contain", isScrolled.value ? "h-9 xl:h-10" : "h-12 xl:h-14"])}" data-v-1884f75b${_scopeId}>`);
					else _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة - Aswar Jeddah" class="${ssrRenderClass(["transition-all duration-300 object-contain", isScrolled.value ? "h-9 xl:h-10" : "h-12 xl:h-14"])}" data-v-1884f75b${_scopeId}>`);
					else return [resolvedLogoUrl.value && !logoLoadError.value ? (openBlock(), createBlock("img", {
						key: 0,
						src: resolvedLogoUrl.value,
						onError: ($event) => logoLoadError.value = true,
						alt: unref(storeName) || "أسوار جدة - Aswar Jeddah",
						class: ["transition-all duration-300 object-contain", isScrolled.value ? "h-9 xl:h-10" : "h-12 xl:h-14"]
					}, null, 42, [
						"src",
						"onError",
						"alt"
					])) : (openBlock(), createBlock("img", {
						key: 1,
						src: Logo_default,
						alt: "أسوار جدة - Aswar Jeddah",
						class: ["transition-all duration-300 object-contain", isScrolled.value ? "h-9 xl:h-10" : "h-12 xl:h-14"]
					}, null, 2))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex-1 flex items-center justify-center lg:hidden min-w-0 px-2" data-v-1884f75b>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "flex items-center justify-center group max-w-full"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (resolvedLogoUrl.value && !logoLoadError.value) _push(`<img${ssrRenderAttr("src", resolvedLogoUrl.value)}${ssrRenderAttr("alt", unref(storeName) || "أسوار جدة - Aswar Jeddah")} class="h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102" data-v-1884f75b${_scopeId}>`);
					else _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة - Aswar Jeddah" class="h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102" data-v-1884f75b${_scopeId}>`);
					else return [resolvedLogoUrl.value && !logoLoadError.value ? (openBlock(), createBlock("img", {
						key: 0,
						src: resolvedLogoUrl.value,
						onError: ($event) => logoLoadError.value = true,
						alt: unref(storeName) || "أسوار جدة - Aswar Jeddah",
						class: "h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102"
					}, null, 40, [
						"src",
						"onError",
						"alt"
					])) : (openBlock(), createBlock("img", {
						key: 1,
						src: Logo_default,
						alt: "أسوار جدة - Aswar Jeddah",
						class: "h-11 sm:h-12 max-h-12 w-auto object-contain transition-transform group-hover:scale-102"
					}))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="hidden lg:flex flex-1 max-w-2xl mx-4" data-v-1884f75b><form class="relative w-full" data-v-1884f75b><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("nav.search_placeholder"))} class="${ssrRenderClass(["w-full ps-4 pe-12 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border focus:outline-none focus:ring-2", isScrolled.value ? "bg-slate-900/90 text-white placeholder-slate-400 border-slate-700/80 focus:border-amber-400 focus:ring-amber-400/20" : "bg-slate-50 text-slate-900 placeholder-slate-400 border-slate-200 focus:border-amber-500 focus:ring-amber-500/20 shadow-inner"])}" data-v-1884f75b><button type="submit" class="absolute end-1.5 top-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors shadow-sm cursor-pointer" title="بحث" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-4 h-4" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" data-v-1884f75b></path></svg></button></form></div><div class="flex items-center gap-2 sm:gap-4 shrink-0" data-v-1884f75b><div class="relative group hidden lg:block" data-v-1884f75b>`);
			if (!unref(isLoggedIn)) _push(`<button class="${ssrRenderClass(["flex items-center gap-2 group/btn text-start focus:outline-none cursor-pointer", isScrolled.value ? "text-white" : "text-slate-900"])}"${ssrRenderAttr("title", unref(t)("nav.login"))} data-v-1884f75b><div class="${ssrRenderClass(["w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border", isScrolled.value ? "bg-slate-800/80 text-white group-hover/btn:bg-amber-500 group-hover/btn:text-slate-950 border-slate-700/80" : "bg-slate-100 text-slate-700 group-hover/btn:bg-slate-900 group-hover/btn:text-white border-slate-200"])}" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" data-v-1884f75b></path></svg></div><div class="hidden xl:flex flex-col text-xs text-start" data-v-1884f75b><span class="${ssrRenderClass(isScrolled.value ? "text-slate-400 text-[11px]" : "text-slate-500 text-[11px]")}" data-v-1884f75b>${ssrInterpolate(unref(t)("account.welcome_user"))}</span><span class="${ssrRenderClass(["font-bold transition-colors", isScrolled.value ? "text-white group-hover/btn:text-amber-400" : "text-slate-900 group-hover/btn:text-amber-600"])}" data-v-1884f75b>${ssrInterpolate(unref(t)("nav.login"))}</span></div></button>`);
			else {
				_push(`<div class="relative" data-v-1884f75b><button class="flex items-center gap-2 group/btn text-start focus:outline-none cursor-pointer"${ssrRenderAttr("title", unref(t)("nav.account"))} data-v-1884f75b><div class="${ssrRenderClass(["w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border overflow-hidden shrink-0 bg-slate-100", isScrolled.value ? "bg-slate-800/80 text-white border-slate-700/80" : "bg-slate-100 text-slate-700 border-slate-200"])}" data-v-1884f75b>`);
				if (userHeaderAvatarUrl.value && !headerImgError.value) _push(`<img${ssrRenderAttr("src", userHeaderAvatarUrl.value)} class="w-full h-full object-cover rounded-full" alt="User Avatar" data-v-1884f75b>`);
				else _push(`<span class="text-sm font-black text-amber-500" data-v-1884f75b>${ssrInterpolate(unref(userName).charAt(0).toUpperCase())}</span>`);
				_push(`</div><div class="hidden xl:flex flex-col text-xs text-start" data-v-1884f75b><span class="${ssrRenderClass(isScrolled.value ? "text-slate-400 text-[11px]" : "text-slate-500 text-[11px]")}" data-v-1884f75b>${ssrInterpolate(unref(t)("account.welcome_user"))}</span><span class="${ssrRenderClass(["font-bold truncate max-w-[110px] transition-colors", isScrolled.value ? "text-white group-hover/btn:text-amber-400" : "text-slate-900 group-hover/btn:text-amber-600"])}" data-v-1884f75b>${ssrInterpolate(unref(userName))}</span></div><svg class="w-3.5 h-3.5 text-slate-400 group-hover/btn:rotate-180 transition-transform hidden xl:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-1884f75b><polyline points="6 9 12 15 18 9" data-v-1884f75b></polyline></svg></button><div class="${ssrRenderClass(["absolute start-0 top-full pt-3 w-64 transition-all duration-200 z-50", isUserDropdownOpen.value ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0"])}"${ssrRenderAttr("dir", unref(layoutDirection))} data-v-1884f75b><div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-start" data-v-1884f75b><div class="px-4 py-3 bg-slate-50 rounded-xl mb-2 border border-slate-100/80" data-v-1884f75b><div class="flex items-center gap-2.5 mb-1" data-v-1884f75b><div class="w-8 h-8 rounded-full bg-[#0B0E28] text-amber-400 text-xs font-black flex items-center justify-center shrink-0 overflow-hidden border border-slate-200" data-v-1884f75b>`);
				if (userHeaderAvatarUrl.value && !headerImgError.value) _push(`<img${ssrRenderAttr("src", userHeaderAvatarUrl.value)} class="w-full h-full object-cover rounded-full" alt="Avatar" data-v-1884f75b>`);
				else _push(`<span data-v-1884f75b>${ssrInterpolate(unref(userName).charAt(0).toUpperCase())}</span>`);
				_push(`</div><p class="font-black text-sm text-[#0B0E28] truncate" data-v-1884f75b>${ssrInterpolate(unref(userName))}</p></div>`);
				if (unref(userEmail)) _push(`<p class="text-[11px] text-slate-500 truncate dir-ltr text-start" data-v-1884f75b>${ssrInterpolate(unref(userEmail))}</p>`);
				else _push(`<!---->`);
				_push(`</div><div class="space-y-1 text-xs font-bold text-slate-700" data-v-1884f75b>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/my-account"),
					onClick: ($event) => isUserDropdownOpen.value = false,
					class: "flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 hover:text-[#0B0E28] transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-1884f75b${_scopeId}><path d="M3 3h7v7H3z" data-v-1884f75b${_scopeId}></path><path d="M14 3h7v7h-7z" data-v-1884f75b${_scopeId}></path><path d="M14 14h7v7h-7z" data-v-1884f75b${_scopeId}></path><path d="M3 14h7v7H3z" data-v-1884f75b${_scopeId}></path></svg><span data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.account"))}</span>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-4 h-4 text-amber-500 shrink-0",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [
							createVNode("path", { d: "M3 3h7v7H3z" }),
							createVNode("path", { d: "M14 3h7v7h-7z" }),
							createVNode("path", { d: "M14 14h7v7h-7z" }),
							createVNode("path", { d: "M3 14h7v7H3z" })
						])), createVNode("span", null, toDisplayString(unref(t)("nav.account")), 1)];
					}),
					_: 1
				}, _parent));
				_push(`</div><div class="mt-2 pt-2 border-t border-slate-100" data-v-1884f75b><button class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-rose-600 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer text-start" data-v-1884f75b><svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-1884f75b><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" data-v-1884f75b></path><polyline points="16 17 21 12 16 7" data-v-1884f75b></polyline><line x1="21" y1="12" x2="9" y2="12" data-v-1884f75b></line></svg><span data-v-1884f75b>${ssrInterpolate(unref(t)("account.logout"))}</span></button></div></div></div></div>`);
			}
			_push(`</div><div class="hidden lg:block" data-v-1884f75b>`);
			_push(ssrRenderComponent(LanguageSwitcher_default, { "is-scrolled": isScrolled.value }, null, _parent));
			_push(`</div><div class="${ssrRenderClass(["h-8 w-px hidden lg:block transition-colors", isScrolled.value ? "bg-slate-800" : "bg-slate-200"])}" data-v-1884f75b></div><a${ssrRenderAttr("href", `tel:${unref(hotline)}`)} class="hidden lg:flex items-center gap-3 group text-start"${ssrRenderAttr("title", unref(t)("nav.hotline"))} data-v-1884f75b><div class="${ssrRenderClass(["w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-sm border", isScrolled.value ? "bg-slate-800/80 text-amber-400 border-slate-700/80" : "bg-slate-100 text-amber-600 border-slate-200"])}" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="w-5 h-5" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-3.728 0-7.382-1.026-10.5-2.985A1.125 1.125 0 013 19.125V14.25c0-.568.422-1.048.987-1.106a48.554 48.554 0 0010.026 0 1.106 1.106 0 00.987 1.106v4.875c0 .485-.309.914-.76 1.054a24.237 24.237 0 01-4.24.475z" data-v-1884f75b></path></svg></div><div class="flex flex-col text-xs text-start" data-v-1884f75b><span class="${ssrRenderClass(isScrolled.value ? "text-slate-400 text-[11px]" : "text-slate-500 text-[11px]")}" data-v-1884f75b>${ssrInterpolate(unref(t)("nav.hotline"))}</span><span class="${ssrRenderClass(["font-bold dir-ltr tracking-wider", isScrolled.value ? "text-amber-400" : "text-slate-900"])}" data-v-1884f75b>${ssrInterpolate(unref(hotline))}</span></div></a><div class="${ssrRenderClass(["h-8 w-px hidden lg:block transition-colors", isScrolled.value ? "bg-slate-800" : "bg-slate-200"])}" data-v-1884f75b></div><button class="${ssrRenderClass(["hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full transition-all relative group cursor-pointer shadow-sm border", isScrolled.value ? "bg-slate-900/90 hover:bg-slate-800 border-slate-700/80 text-white" : "bg-slate-900 hover:bg-slate-800 border-slate-900 text-white"])}" data-v-1884f75b><span class="${ssrRenderClass(["w-5 h-5 rounded-full font-black text-xs flex items-center justify-center shadow-md shrink-0 transition-colors", isScrolled.value ? "bg-white text-[#0B0E28]" : "bg-amber-500 text-slate-950"])}" data-v-1884f75b>${ssrInterpolate(unref(cartCount))}</span><div class="flex flex-col text-xs text-start" data-v-1884f75b><span class="text-[10px] text-slate-300" data-v-1884f75b>${ssrInterpolate(unref(t)("nav.cart"))}</span><span class="font-black text-amber-400 text-xs lg:text-sm" data-v-1884f75b>${ssrInterpolate(unref(formattedCartTotal))}</span></div><div class="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-1884f75b></path></svg></div></button><button type="button" class="lg:hidden relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-2xs shrink-0" aria-label="سلة المشتريات" data-v-1884f75b><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.2" stroke="currentColor" class="w-5 h-5" data-v-1884f75b><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" data-v-1884f75b></path></svg><span class="absolute -top-1 -end-1 bg-[#0B0E28] text-amber-400 font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs" data-v-1884f75b>${ssrInterpolate(unref(cartCount))}</span></button></div></div><nav class="${ssrRenderClass([isScrolled.value ? "border-slate-800" : "border-slate-100", "hidden lg:flex items-center justify-start border-t mt-3 pt-2.5 transition-colors relative z-20"])}" data-v-1884f75b><div class="flex items-center gap-6 xl:gap-7 flex-wrap" data-v-1884f75b>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: ["text-sm font-bold transition-colors py-1.5 whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-2", isScrolled.value ? "text-white" : "text-slate-900"]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i class="fa-solid fa-house text-amber-500 text-xs" data-v-1884f75b${_scopeId}></i><span data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.home") || "الرئيسية")}</span>`);
					else return [createVNode("i", { class: "fa-solid fa-house text-amber-500 text-xs" }), createVNode("span", null, toDisplayString(unref(t)("nav.home") || "الرئيسية"), 1)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/shop"),
				class: ["text-sm font-bold transition-colors py-1.5 whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-2", isScrolled.value ? "text-white" : "text-slate-900"]
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i class="fa-solid fa-store text-amber-500 text-xs" data-v-1884f75b${_scopeId}></i><span data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.shop") || "المتجر")}</span>`);
					else return [createVNode("i", { class: "fa-solid fa-store text-amber-500 text-xs" }), createVNode("span", null, toDisplayString(unref(t)("nav.shop") || "المتجر"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<!--[-->`);
			ssrRenderList(unref(navItems), (item) => {
				_push(`<div class="relative py-1.5 shrink-0 group/nav" data-v-1884f75b><div class="flex items-center gap-1" data-v-1884f75b>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)(item.url),
					target: item.target || "_self",
					class: [
						"text-sm font-medium transition-colors whitespace-nowrap shrink-0 hover:text-amber-500 flex items-center gap-1.5 cursor-pointer",
						isScrolled.value ? "text-slate-300" : "text-slate-700",
						activeHoveredMenuId.value === item.id ? "text-amber-500 font-bold" : ""
					]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<i class="${ssrRenderClass([resolveItemIcon(item.icon, item.url, item.name), "text-xs opacity-80 shrink-0"])}" data-v-1884f75b${_scopeId}></i><span data-v-1884f75b${_scopeId}>${ssrInterpolate(item.name)}</span>`);
							if (item.badge) _push(`<span class="px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs shrink-0 tracking-wide" style="${ssrRenderStyle({ backgroundColor: item.badge_color || "#ef4444" })}" data-v-1884f75b${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
							else _push(`<!---->`);
						} else return [
							createVNode("i", { class: [resolveItemIcon(item.icon, item.url, item.name), "text-xs opacity-80 shrink-0"] }, null, 2),
							createVNode("span", null, toDisplayString(item.name), 1),
							item.badge ? (openBlock(), createBlock("span", {
								key: 0,
								class: "px-2 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs shrink-0 tracking-wide",
								style: { backgroundColor: item.badge_color || "#ef4444" }
							}, toDisplayString(item.badge), 5)) : createCommentVNode("", true)
						];
					}),
					_: 2
				}, _parent));
				if (Array.isArray(item.children) && item.children.length > 0) _push(`<button type="button" class="${ssrRenderClass([activeHoveredMenuId.value === item.id ? "rotate-180 text-amber-500" : "", "p-0.5 text-slate-400 hover:text-amber-500 transition-transform cursor-pointer"])}" data-v-1884f75b><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-1884f75b><polyline points="6 9 12 15 18 9" data-v-1884f75b></polyline></svg></button>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (Array.isArray(item.children) && item.children.length > 0) {
					_push(`<div class="${ssrRenderClass(["absolute start-0 top-full pt-2 w-60 z-[90] transition-all duration-200", activeHoveredMenuId.value === item.id ? "opacity-100 visible translate-y-0 pointer-events-auto" : "opacity-0 invisible translate-y-2 pointer-events-none"])}" data-v-1884f75b><div class="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 overflow-hidden text-start space-y-1" data-v-1884f75b><!--[-->`);
					ssrRenderList(item.children, (sub) => {
						_push(ssrRenderComponent(_component_NuxtLink, {
							key: sub.id,
							to: unref(localePath)(sub.url),
							target: sub.target || "_self",
							onClick: ($event) => activeHoveredMenuId.value = null,
							class: "flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) {
									_push(`<div class="flex items-center gap-2" data-v-1884f75b${_scopeId}><i class="${ssrRenderClass([resolveItemIcon(sub.icon, sub.url, sub.name), "text-xs text-slate-400"])}" data-v-1884f75b${_scopeId}></i><span data-v-1884f75b${_scopeId}>${ssrInterpolate(sub.name)}</span></div>`);
									if (sub.badge) _push(`<span class="px-1.5 py-0.5 rounded-full text-[9px] font-black text-white" style="${ssrRenderStyle({ backgroundColor: sub.badge_color || "#ef4444" })}" data-v-1884f75b${_scopeId}>${ssrInterpolate(sub.badge)}</span>`);
									else _push(`<!---->`);
								} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("i", { class: [resolveItemIcon(sub.icon, sub.url, sub.name), "text-xs text-slate-400"] }, null, 2), createVNode("span", null, toDisplayString(sub.name), 1)]), sub.badge ? (openBlock(), createBlock("span", {
									key: 0,
									class: "px-1.5 py-0.5 rounded-full text-[9px] font-black text-white",
									style: { backgroundColor: sub.badge_color || "#ef4444" }
								}, toDisplayString(sub.badge), 5)) : createCommentVNode("", true)];
							}),
							_: 2
						}, _parent));
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</div>`);
			});
			_push(`<!--]--></div></nav></div>`);
			ssrRenderTeleport(_push, (_push) => {
				if (isMobileMenuOpen.value) _push(`<div class="fixed inset-0 z-[100] bg-[#0B0E28]/70 backdrop-blur-sm transition-opacity duration-300" data-v-1884f75b></div>`);
				else _push(`<!---->`);
				_push(`<aside class="${ssrRenderClass([
					"fixed inset-y-0 h-full max-h-screen z-[101] w-84 max-w-[88vw] bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col overflow-hidden",
					unref(layoutDirection) === "rtl" ? "right-0" : "left-0",
					isMobileMenuOpen.value ? "translate-x-0" : unref(layoutDirection) === "rtl" ? "translate-x-full" : "-translate-x-full"
				])}"${ssrRenderAttr("dir", unref(layoutDirection))} data-v-1884f75b><div class="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0" data-v-1884f75b>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/"),
					onClick: ($event) => isMobileMenuOpen.value = false,
					class: "flex items-center gap-2"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة" class="h-9 w-auto object-contain" data-v-1884f75b${_scopeId}>`);
						else return [createVNode("img", {
							src: Logo_default,
							alt: "أسوار جدة",
							class: "h-9 w-auto object-contain"
						})];
					}),
					_: 1
				}, _parent));
				_push(`<button type="button" class="w-9 h-9 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer" aria-label="إغلاق القائمة" data-v-1884f75b><i class="fa-solid fa-xmark text-sm" data-v-1884f75b></i></button></div><div class="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4" data-v-1884f75b><div class="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/70" data-v-1884f75b>`);
				if (unref(isLoggedIn)) {
					_push(`<div class="flex items-center justify-between gap-3" data-v-1884f75b>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(localePath)("/my-account"),
						onClick: ($event) => isMobileMenuOpen.value = false,
						class: "flex items-center gap-2.5 min-w-0 flex-1"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<div class="w-10 h-10 rounded-xl bg-[#0B0E28] text-amber-400 font-black text-sm flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs" data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(userName).charAt(0).toUpperCase())}</div><div class="min-w-0" data-v-1884f75b${_scopeId}><span class="text-xs font-black text-slate-900 block truncate" data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(userName))}</span><span class="text-[10px] font-bold text-indigo-600 block" data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.account"))}</span></div>`);
							else return [createVNode("div", { class: "w-10 h-10 rounded-xl bg-[#0B0E28] text-amber-400 font-black text-sm flex items-center justify-center shrink-0 border border-slate-200 shadow-2xs" }, toDisplayString(unref(userName).charAt(0).toUpperCase()), 1), createVNode("div", { class: "min-w-0" }, [createVNode("span", { class: "text-xs font-black text-slate-900 block truncate" }, toDisplayString(unref(userName)), 1), createVNode("span", { class: "text-[10px] font-bold text-indigo-600 block" }, toDisplayString(unref(t)("nav.account")), 1)])];
						}),
						_: 1
					}, _parent));
					_push(`<button type="button" class="px-2.5 py-1.5 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold transition-colors cursor-pointer shrink-0" data-v-1884f75b>${ssrInterpolate(unref(t)("account.logout"))}</button></div>`);
				} else _push(`<button type="button" class="w-full py-3 px-4 bg-[#0B0E28] hover:bg-slate-900 text-white font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer shadow-md shadow-slate-900/10" data-v-1884f75b><i class="fa-solid fa-arrow-right-to-bracket text-amber-400 text-sm" data-v-1884f75b></i><span data-v-1884f75b>${ssrInterpolate(unref(t)("nav.login"))} / تسجيل حساب جديد</span></button>`);
				_push(`</div><div class="grid grid-cols-2 gap-2" data-v-1884f75b><button type="button" class="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs" data-v-1884f75b><i class="fa-solid fa-globe text-amber-500" data-v-1884f75b></i><span data-v-1884f75b>${ssrInterpolate(unref(currentLanguage) === "ar" ? "🇺🇸 English" : "🇸🇦 العربية")}</span></button><a${ssrRenderAttr("href", `tel:${unref(hotline)}`)} class="py-2.5 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-black text-slate-800 transition-colors flex items-center justify-center gap-2 shadow-2xs" data-v-1884f75b><i class="fa-solid fa-phone text-emerald-500" data-v-1884f75b></i><span class="dir-ltr text-[11px]" data-v-1884f75b>${ssrInterpolate(unref(hotline))}</span></a></div><div data-v-1884f75b><form class="relative w-full" data-v-1884f75b><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("nav.search_placeholder"))} class="w-full ps-4 pe-10 py-2.5 rounded-xl bg-slate-100 text-xs font-bold text-slate-900 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-400" data-v-1884f75b><button type="submit" class="absolute end-1.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-amber-600 cursor-pointer" title="بحث" data-v-1884f75b><i class="fa-solid fa-magnifying-glass text-xs" data-v-1884f75b></i></button></form></div><div class="border-t border-slate-100 pt-1" data-v-1884f75b><span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 px-1" data-v-1884f75b> روابط وأقسام المتجر </span><div class="space-y-1" data-v-1884f75b>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/"),
					onClick: ($event) => isMobileMenuOpen.value = false,
					class: "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-black text-xs text-[#0B0E28] hover:bg-amber-50 hover:text-amber-600 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0" data-v-1884f75b${_scopeId}><i class="fa-solid fa-house" data-v-1884f75b${_scopeId}></i></div><span data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.home") || "الرئيسية")}</span>`);
						else return [createVNode("div", { class: "w-7 h-7 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center text-xs shrink-0" }, [createVNode("i", { class: "fa-solid fa-house" })]), createVNode("span", null, toDisplayString(unref(t)("nav.home") || "الرئيسية"), 1)];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)("/shop"),
					onClick: ($event) => isMobileMenuOpen.value = false,
					class: "flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-black text-xs text-[#0B0E28] hover:bg-amber-50 hover:text-amber-600 transition-colors"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs shrink-0" data-v-1884f75b${_scopeId}><i class="fa-solid fa-store" data-v-1884f75b${_scopeId}></i></div><span data-v-1884f75b${_scopeId}>${ssrInterpolate(unref(t)("nav.shop") || "المتجر")}</span>`);
						else return [createVNode("div", { class: "w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center text-xs shrink-0" }, [createVNode("i", { class: "fa-solid fa-store" })]), createVNode("span", null, toDisplayString(unref(t)("nav.shop") || "المتجر"), 1)];
					}),
					_: 1
				}, _parent));
				_push(`<!--[-->`);
				ssrRenderList(unref(navItems), (item) => {
					_push(`<div class="rounded-xl overflow-hidden" data-v-1884f75b>`);
					if (Array.isArray(item.children) && item.children.length > 0) {
						_push(`<div class="space-y-1" data-v-1884f75b><div class="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer select-none" data-v-1884f75b><div class="flex items-center gap-2.5" data-v-1884f75b><div class="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs shrink-0" data-v-1884f75b><i class="${ssrRenderClass(resolveItemIcon(item.icon, item.url, item.name))}" data-v-1884f75b></i></div><span data-v-1884f75b>${ssrInterpolate(item.name)}</span>`);
						if (item.badge) _push(`<span class="px-2 py-0.5 rounded-full text-[9px] font-black text-white" style="${ssrRenderStyle({ backgroundColor: item.badge_color || "#ef4444" })}" data-v-1884f75b>${ssrInterpolate(item.badge)}</span>`);
						else _push(`<!---->`);
						_push(`</div><i class="${ssrRenderClass(["fa-solid text-xs text-slate-400 transition-transform duration-200", expandedMobileMenus.value[item.id] ? "fa-chevron-up" : "fa-chevron-down"])}" data-v-1884f75b></i></div><div class="ps-6 pe-2 py-1 space-y-1 bg-slate-50 rounded-xl border border-slate-100" style="${ssrRenderStyle(expandedMobileMenus.value[item.id] ? null : { display: "none" })}" data-v-1884f75b><!--[-->`);
						ssrRenderList(item.children, (sub) => {
							_push(ssrRenderComponent(_component_NuxtLink, {
								key: sub.id,
								to: unref(localePath)(sub.url),
								onClick: ($event) => isMobileMenuOpen.value = false,
								class: "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold text-slate-600 hover:text-amber-600 hover:bg-white transition-colors"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) {
										_push(`<div class="flex items-center gap-2" data-v-1884f75b${_scopeId}><i class="${ssrRenderClass([resolveItemIcon(sub.icon, sub.url, sub.name), "text-[10px] text-slate-400"])}" data-v-1884f75b${_scopeId}></i><span data-v-1884f75b${_scopeId}>${ssrInterpolate(sub.name)}</span></div>`);
										if (sub.badge) _push(`<span class="px-1.5 py-0.5 rounded-full text-[8px] font-black text-white" style="${ssrRenderStyle({ backgroundColor: sub.badge_color || "#ef4444" })}" data-v-1884f75b${_scopeId}>${ssrInterpolate(sub.badge)}</span>`);
										else _push(`<!---->`);
									} else return [createVNode("div", { class: "flex items-center gap-2" }, [createVNode("i", { class: [resolveItemIcon(sub.icon, sub.url, sub.name), "text-[10px] text-slate-400"] }, null, 2), createVNode("span", null, toDisplayString(sub.name), 1)]), sub.badge ? (openBlock(), createBlock("span", {
										key: 0,
										class: "px-1.5 py-0.5 rounded-full text-[8px] font-black text-white",
										style: { backgroundColor: sub.badge_color || "#ef4444" }
									}, toDisplayString(sub.badge), 5)) : createCommentVNode("", true)];
								}),
								_: 2
							}, _parent));
						});
						_push(`<!--]--></div></div>`);
					} else _push(ssrRenderComponent(_component_NuxtLink, {
						to: unref(localePath)(item.url),
						onClick: ($event) => isMobileMenuOpen.value = false,
						class: "flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs text-slate-700 hover:bg-slate-100 hover:text-amber-600 transition-colors"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="flex items-center gap-2.5" data-v-1884f75b${_scopeId}><div class="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs shrink-0" data-v-1884f75b${_scopeId}><i class="${ssrRenderClass(resolveItemIcon(item.icon, item.url, item.name))}" data-v-1884f75b${_scopeId}></i></div><span data-v-1884f75b${_scopeId}>${ssrInterpolate(item.name)}</span></div>`);
								if (item.badge) _push(`<span class="px-2 py-0.5 rounded-full text-[9px] font-black text-white" style="${ssrRenderStyle({ backgroundColor: item.badge_color || "#ef4444" })}" data-v-1884f75b${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
								else _push(`<!---->`);
							} else return [createVNode("div", { class: "flex items-center gap-2.5" }, [createVNode("div", { class: "w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center text-xs shrink-0" }, [createVNode("i", { class: resolveItemIcon(item.icon, item.url, item.name) }, null, 2)]), createVNode("span", null, toDisplayString(item.name), 1)]), item.badge ? (openBlock(), createBlock("span", {
								key: 0,
								class: "px-2 py-0.5 rounded-full text-[9px] font-black text-white",
								style: { backgroundColor: item.badge_color || "#ef4444" }
							}, toDisplayString(item.badge), 5)) : createCommentVNode("", true)];
						}),
						_: 2
					}, _parent));
					_push(`</div>`);
				});
				_push(`<!--]--></div></div></div><div class="p-4 border-t border-slate-100 bg-slate-50 shrink-0" data-v-1884f75b><button type="button" class="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs rounded-xl transition-all flex items-center justify-between cursor-pointer shadow-sm" data-v-1884f75b><div class="flex items-center gap-2" data-v-1884f75b><i class="fa-solid fa-bag-shopping text-sm" data-v-1884f75b></i><span data-v-1884f75b>${ssrInterpolate(unref(t)("nav.cart"))} (${ssrInterpolate(unref(cartCount))})</span></div><span data-v-1884f75b>${ssrInterpolate(unref(formattedCartTotal))}</span></button></div></aside>`);
			}, "body", false, _parent);
			_push(`</header>`);
		};
	}
});
//#endregion
//#region components/layout/TheHeader.vue
var _sfc_setup$7 = TheHeader_vue_vue_type_script_setup_true_lang_default.setup;
TheHeader_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/TheHeader.vue");
	return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
var TheHeader_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(TheHeader_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-1884f75b"]]), { __name: "LayoutTheHeader" });
//#endregion
//#region components/layout/TheFooter.vue?vue&type=script&setup=true&lang.ts
var TheFooter_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TheFooter",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, localePath, currentLanguage } = useLanguage();
		const { storeName, storeDescription, footerLogoUrl, logoUrl, hotline, email, address, socialLinks, copyright} = useStoreSettings();
		const { navItems} = usePublicNavbar();
		const logoError = ref(false);
		const resolvedFooterLogo = computed(() => {
			if (footerLogoUrl.value && typeof footerLogoUrl.value === "string" && footerLogoUrl.value.trim().length > 0) return footerLogoUrl.value;
			if (logoUrl.value && typeof logoUrl.value === "string" && logoUrl.value.trim().length > 0) return logoUrl.value;
			return "";
		});
		const categoryLinks = computed(() => {
			if (navItems.value.length > 0) return navItems.value.slice(0, 6).map((item) => ({
				name: item.name,
				url: item.url
			}));
			return [
				{
					name: t("cat.appliances"),
					url: "/category/appliances"
				},
				{
					name: t("cat.houseware"),
					url: "/category/houseware"
				},
				{
					name: t("cat.security"),
					url: "/category/security"
				},
				{
					name: t("cat.laptops"),
					url: "/category/laptops"
				},
				{
					name: t("cat.networks"),
					url: "/category/networks"
				}
			];
		});
		const accountLinks = computed(() => [
			{
				name: t("nav.account"),
				url: localePath("/my-account")
			},
			{
				name: t("product.wishlist"),
				url: localePath("/my-account/wishlist")
			},
			{
				name: t("product.compare"),
				url: localePath("/compare")
			},
			{
				name: t("nav.cart"),
				url: localePath("/cart")
			},
			{
				name: currentLanguage?.value === "en" ? "Return & Refund Policy" : "سياسة الاستبدال والاسترجاع",
				url: localePath("/return-policy")
			},
			{
				name: currentLanguage?.value === "en" ? "Privacy Policy & Terms" : "سياسة الخصوصية والشروط",
				url: localePath("/privacy-policy")
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<footer${ssrRenderAttrs(mergeProps({
				class: "w-full",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="bg-[#0B0E28] text-slate-300 pt-16 pb-12 border-t border-slate-800"><div class="max-w-[1550px] mx-auto px-4 lg:px-8"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-start"><div class="space-y-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "inline-block"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) if (resolvedFooterLogo.value && !logoError.value) _push(`<img${ssrRenderAttr("src", resolvedFooterLogo.value)}${ssrRenderAttr("alt", unref(storeName) || "أسوار جدة - Aswar Jeddah")} class="h-12 lg:h-14 w-auto object-contain"${_scopeId}>`);
					else _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة - Aswar Jeddah" class="h-12 lg:h-14 w-auto object-contain"${_scopeId}>`);
					else return [resolvedFooterLogo.value && !logoError.value ? (openBlock(), createBlock("img", {
						key: 0,
						src: resolvedFooterLogo.value,
						onError: ($event) => logoError.value = true,
						alt: unref(storeName) || "أسوار جدة - Aswar Jeddah",
						class: "h-12 lg:h-14 w-auto object-contain"
					}, null, 40, [
						"src",
						"onError",
						"alt"
					])) : (openBlock(), createBlock("img", {
						key: 1,
						src: Logo_default,
						alt: "أسوار جدة - Aswar Jeddah",
						class: "h-12 lg:h-14 w-auto object-contain"
					}))];
				}),
				_: 1
			}, _parent));
			_push(`<p class="text-slate-400 text-sm leading-relaxed mt-4 mb-6">${ssrInterpolate(unref(storeDescription) || unref(t)("footer.about"))}</p><h4 class="text-white font-bold text-sm mb-3">${ssrInterpolate(unref(t)("footer.follow_us"))}</h4><div class="flex items-center gap-3 flex-wrap">`);
			if (unref(socialLinks).facebook) _push(`<a${ssrRenderAttr("href", unref(socialLinks).facebook)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"${ssrRenderAttr("title", unref(t)("footer.facebook"))}><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg></a>`);
			else _push(`<!---->`);
			if (unref(socialLinks).instagram) _push(`<a${ssrRenderAttr("href", unref(socialLinks).instagram)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"${ssrRenderAttr("title", unref(t)("footer.instagram"))}><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg></a>`);
			else _push(`<!---->`);
			if (unref(socialLinks).tiktok) _push(`<a${ssrRenderAttr("href", unref(socialLinks).tiktok)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm"${ssrRenderAttr("title", unref(t)("footer.tiktok"))}><svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.57-1.34 1.56-1.35 2.56-.03 1.18.63 2.34 1.64 2.92.93.55 2.1.62 3.09.23 1.05-.41 1.83-1.38 2.01-2.5.07-.63.05-1.27.05-1.91V.02z"></path></svg></a>`);
			else _push(`<!---->`);
			if (unref(socialLinks).twitter) _push(`<a${ssrRenderAttr("href", unref(socialLinks).twitter)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm" title="Twitter / X"><i class="fa-brands fa-x-twitter text-sm"></i></a>`);
			else _push(`<!---->`);
			if (unref(socialLinks).snapchat) _push(`<a${ssrRenderAttr("href", unref(socialLinks).snapchat)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm" title="Snapchat"><i class="fa-brands fa-snapchat text-sm"></i></a>`);
			else _push(`<!---->`);
			if (unref(socialLinks).whatsapp) _push(`<a${ssrRenderAttr("href", unref(socialLinks).whatsapp)} target="_blank" rel="noopener noreferrer" class="w-10 h-10 rounded-full bg-slate-800/80 hover:bg-emerald-600 text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm" title="WhatsApp"><i class="fa-brands fa-whatsapp text-sm"></i></a>`);
			else _push(`<!---->`);
			_push(`</div></div><div><h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[&#39;&#39;] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">${ssrInterpolate(unref(t)("nav.categories"))}</h3><ul class="space-y-1"><!--[-->`);
			ssrRenderList(categoryLinks.value, (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: unref(localePath)(link.url),
					class: "transition-all duration-300 hover:text-white hover:translate-x-1.5 rtl:hover:-translate-x-1.5 block py-1.5 text-sm text-slate-400"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.name)}`);
						else return [createTextVNode(toDisplayString(link.name), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div><h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[&#39;&#39;] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">${ssrInterpolate(unref(t)("nav.account"))}</h3><ul class="space-y-1"><!--[-->`);
			ssrRenderList(accountLinks.value, (link) => {
				_push(`<li>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: link.url,
					class: "transition-all duration-300 hover:text-white hover:translate-x-1.5 rtl:hover:-translate-x-1.5 block py-1.5 text-sm text-slate-400"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(link.name)}`);
						else return [createTextVNode(toDisplayString(link.name), 1)];
					}),
					_: 2
				}, _parent));
				_push(`</li>`);
			});
			_push(`<!--]--></ul></div><div class="space-y-4"><h3 class="text-white font-bold text-lg mb-4 relative pb-2 after:content-[&#39;&#39;] after:absolute after:start-0 after:bottom-0 after:w-8 after:h-0.5 after:bg-slate-600">${ssrInterpolate(unref(t)("footer.contact_us"))}</h3><ul class="space-y-3 text-sm text-slate-400"><li class="flex items-start gap-3"><svg class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span>${ssrInterpolate(unref(address) || unref(t)("footer.address"))}</span></li><li class="flex items-center gap-3"><svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1.001 1.001 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><a${ssrRenderAttr("href", `tel:${unref(hotline)}`)} class="hover:text-amber-400 transition-colors font-bold dir-ltr">${ssrInterpolate(unref(hotline))}</a></li><li class="flex items-center gap-3"><svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><a${ssrRenderAttr("href", `mailto:${unref(email)}`)} class="hover:text-amber-400 transition-colors font-medium">${ssrInterpolate(unref(email))}</a></li></ul></div></div></div></div><div class="bg-[#07091B] text-slate-400 text-xs py-6 border-t border-slate-900"><div class="max-w-[1550px] mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4"><p class="font-medium text-center md:text-start">${ssrInterpolate(unref(copyright))}</p><div class="flex items-center gap-3"><span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">mada</span><span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">VISA</span><span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-slate-300">MasterCard</span><span class="px-3 py-1 bg-slate-900 rounded border border-slate-800 text-[10px] font-bold text-amber-400">Apple Pay</span></div></div></div></footer>`);
		};
	}
});
//#endregion
//#region components/layout/TheFooter.vue
var _sfc_setup$6 = TheFooter_vue_vue_type_script_setup_true_lang_default.setup;
TheFooter_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/layout/TheFooter.vue");
	return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
var TheFooter_default = Object.assign(TheFooter_vue_vue_type_script_setup_true_lang_default, { __name: "LayoutTheFooter" });
//#endregion
//#region components/cart/CartItem.vue?vue&type=script&setup=true&lang.ts
var CartItem_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CartItem",
	__ssrInlineRender: true,
	props: { item: {
		type: Object,
		required: true
	} },
	emits: ["update-quantity", "remove-item"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { t, formatCurrency, layoutDirection } = useLanguage();
		const itemTitle = computed(() => {
			const p = props.item?.product || {};
			if (layoutDirection.value === "ltr") return p.name_en || p.title_en || p.title || p.name || "Product";
			return p.title || p.name || p.name_ar || "منتج";
		});
		const itemCategory = computed(() => {
			const p = props.item?.product || {};
			return p.category || p.category_name || "";
		});
		const itemImage = computed(() => {
			const p = props.item?.product || {};
			const img = p.images?.[0] || p.image || p.thumbnail;
			if (img && typeof img === "string") return img;
			return "/images/placeholder.png";
		});
		const formattedPrice = computed(() => {
			const p = props.item?.product || {};
			const rawPrice = p.price || p.unit_price || 0;
			return formatCurrency(rawPrice);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 hover:border-amber-400/30 transition-colors shadow-sm group",
				dir: unref(layoutDirection)
			}, _attrs))}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: `/product/${__props.item.product.slug}`,
				class: "w-20 h-20 sm:w-24 sm:h-24 shrink-0 bg-slate-50 rounded-xl overflow-hidden relative"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", itemImage.value)}${ssrRenderAttr("alt", itemTitle.value)} class="w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"${_scopeId}>`);
					else return [createVNode("img", {
						src: itemImage.value,
						alt: itemTitle.value,
						class: "w-full h-full object-cover mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
					}, null, 8, ["src", "alt"])];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex-1 flex flex-col justify-between min-w-0"><div class="flex justify-between items-start gap-2"><div class="min-w-0 text-start">`);
			if (itemCategory.value) _push(`<span class="text-[10px] text-slate-400 font-medium mb-1 block truncate">${ssrInterpolate(itemCategory.value)}</span>`);
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: `/product/${__props.item.product.slug}`,
				class: "text-sm font-bold text-[#0B0E28] leading-snug line-clamp-2 hover:text-amber-500 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(itemTitle.value)}`);
					else return [createTextVNode(toDisplayString(itemTitle.value), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div><button class="w-8 h-8 shrink-0 flex items-center justify-center rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("common.delete"))}><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button></div><div class="flex items-end justify-between mt-3"><div class="text-start"><span class="text-xs text-slate-500 font-medium block">${ssrInterpolate(unref(t)("product.price"))}</span><div class="text-base font-black text-[#0B0E28] leading-none mt-1">${ssrInterpolate(formattedPrice.value)}</div></div><div class="flex items-center bg-slate-50 rounded-lg p-1 border border-slate-200" dir="ltr"><button${ssrIncludeBooleanAttr(__props.item.quantity <= 1) ? " disabled" : ""} class="w-7 h-7 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#0B0E28] transition-colors cursor-pointer"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg></button><span class="w-8 text-center text-sm font-bold text-[#0B0E28]">${ssrInterpolate(__props.item.quantity)}</span><button class="w-7 h-7 flex items-center justify-center rounded bg-white text-slate-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed hover:text-[#0B0E28] transition-colors cursor-pointer"><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></button></div></div></div></div>`);
		};
	}
});
//#endregion
//#region components/cart/CartItem.vue
var _sfc_setup$5 = CartItem_vue_vue_type_script_setup_true_lang_default.setup;
CartItem_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartItem.vue");
	return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
var CartItem_default = Object.assign(CartItem_vue_vue_type_script_setup_true_lang_default, { __name: "CartItem" });
//#endregion
//#region components/cart/CartDrawer.vue?vue&type=script&setup=true&lang.ts
var CartDrawer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CartDrawer",
	__ssrInlineRender: true,
	setup(__props) {
		const { isCartOpen, cart, closeCart, updateQuantity, removeFromCart, formattedCartTotal } = useCart();
		const { compareCount } = useCompare();
		const { wishlistCount } = useWishlist();
		const { t, layoutDirection } = useLanguage();
		watch(isCartOpen, (newVal) => {
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (unref(isCartOpen)) _push(`<div class="fixed inset-0 z-[100] bg-[#0B0E28]/60 backdrop-blur-sm" data-v-a58faff1></div>`);
				else _push(`<!---->`);
				if (unref(isCartOpen)) {
					_push(`<div class="${ssrRenderClass([unref(layoutDirection) === "rtl" ? "fixed inset-y-0 left-0" : "fixed inset-y-0 right-0", "w-full max-w-md bg-white shadow-2xl flex flex-col z-[110]"])}"${ssrRenderAttr("dir", unref(layoutDirection))} data-v-a58faff1><div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between shrink-0 bg-white gap-2" data-v-a58faff1><div class="flex items-center gap-2" data-v-a58faff1><h2 class="text-base sm:text-lg font-black text-[#0B0E28]" data-v-a58faff1>${ssrInterpolate(unref(t)("cart.title"))}</h2><span class="bg-amber-100 text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full" data-v-a58faff1>${ssrInterpolate(unref(cart).length)}</span></div><div class="flex items-center gap-1.5 sm:gap-2" data-v-a58faff1>`);
					if (unref(cart).length > 0) _push(`<button class="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-600 font-bold text-xs border border-rose-200 transition-colors cursor-pointer shrink-0"${ssrRenderAttr("title", unref(layoutDirection) === "ltr" ? "Clear Cart" : "تفريغ السلة")} data-v-a58faff1><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a58faff1><polyline points="3 6 5 6 21 6" data-v-a58faff1></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" data-v-a58faff1></path></svg><span class="hidden sm:inline" data-v-a58faff1>${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Clear" : "تفريغ")}</span></button>`);
					else _push(`<!---->`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/my-account/compare",
						onClick: unref(closeCart),
						class: "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200/80 transition-colors cursor-pointer",
						title: unref(t)("cart.compare")
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<svg class="w-4 h-4 text-slate-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a58faff1${_scopeId}><line x1="18" y1="20" x2="18" y2="10" data-v-a58faff1${_scopeId}></line><line x1="12" y1="20" x2="12" y2="4" data-v-a58faff1${_scopeId}></line><line x1="6" y1="20" x2="6" y2="14" data-v-a58faff1${_scopeId}></line></svg><span class="hidden sm:inline" data-v-a58faff1${_scopeId}>${ssrInterpolate(unref(t)("cart.compare"))}</span>`);
								if (unref(compareCount) > 0) _push(`<span class="w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0" data-v-a58faff1${_scopeId}>${ssrInterpolate(unref(compareCount))}</span>`);
								else _push(`<!---->`);
							} else return [
								(openBlock(), createBlock("svg", {
									class: "w-4 h-4 text-slate-500 shrink-0",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "2",
									"stroke-linecap": "round",
									"stroke-linejoin": "round"
								}, [
									createVNode("line", {
										x1: "18",
										y1: "20",
										x2: "18",
										y2: "10"
									}),
									createVNode("line", {
										x1: "12",
										y1: "20",
										x2: "12",
										y2: "4"
									}),
									createVNode("line", {
										x1: "6",
										y1: "20",
										x2: "6",
										y2: "14"
									})
								])),
								createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(t)("cart.compare")), 1),
								unref(compareCount) > 0 ? (openBlock(), createBlock("span", {
									key: 0,
									class: "w-4 h-4 rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center shrink-0"
								}, toDisplayString(unref(compareCount)), 1)) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/my-account/wishlist",
						onClick: unref(closeCart),
						class: "relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-rose-50/50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200/80 transition-colors cursor-pointer",
						title: unref(t)("cart.wishlist")
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<svg class="w-4 h-4 text-rose-500 shrink-0" fill="currentColor" viewBox="0 0 24 24" data-v-a58faff1${_scopeId}><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" data-v-a58faff1${_scopeId}></path></svg><span class="hidden sm:inline" data-v-a58faff1${_scopeId}>${ssrInterpolate(unref(t)("cart.wishlist"))}</span>`);
								if (unref(wishlistCount) > 0) _push(`<span class="w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shrink-0" data-v-a58faff1${_scopeId}>${ssrInterpolate(unref(wishlistCount))}</span>`);
								else _push(`<!---->`);
							} else return [
								(openBlock(), createBlock("svg", {
									class: "w-4 h-4 text-rose-500 shrink-0",
									fill: "currentColor",
									viewBox: "0 0 24 24"
								}, [createVNode("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" })])),
								createVNode("span", { class: "hidden sm:inline" }, toDisplayString(unref(t)("cart.wishlist")), 1),
								unref(wishlistCount) > 0 ? (openBlock(), createBlock("span", {
									key: 0,
									class: "w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[10px] flex items-center justify-center shrink-0"
								}, toDisplayString(unref(wishlistCount)), 1)) : createCommentVNode("", true)
							];
						}),
						_: 1
					}, _parent));
					_push(`<button class="w-8 h-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 flex items-center justify-center transition-colors cursor-pointer shrink-0" data-v-a58faff1><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-a58faff1><line x1="18" y1="6" x2="6" y2="18" data-v-a58faff1></line><line x1="6" y1="6" x2="18" y2="18" data-v-a58faff1></line></svg></button></div></div><div class="flex-1 overflow-y-auto overscroll-contain p-6 space-y-4 custom-scrollbar" data-v-a58faff1>`);
					if (unref(cart).length > 0) {
						_push(`<!--[-->`);
						ssrRenderList(unref(cart), (item) => {
							_push(ssrRenderComponent(CartItem_default, {
								key: item.product.id,
								item,
								onUpdateQuantity: unref(updateQuantity),
								onRemoveItem: unref(removeFromCart)
							}, null, _parent));
						});
						_push(`<!--]-->`);
					} else {
						_push(`<div class="h-full flex items-center justify-center py-10" data-v-a58faff1>`);
						_push(ssrRenderComponent(_sfc_main$1, {
							title: unref(t)("cart.empty_title"),
							description: unref(t)("cart.empty_desc"),
							actionText: unref(t)("cart.back_to_shop"),
							onAction: ($event) => {
								unref(closeCart)();
								_ctx.$router.push("/shop");
							}
						}, {
							icon: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-a58faff1${_scopeId}><circle cx="9" cy="21" r="1" data-v-a58faff1${_scopeId}></circle><circle cx="20" cy="21" r="1" data-v-a58faff1${_scopeId}></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" data-v-a58faff1${_scopeId}></path></svg>`);
								else return [(openBlock(), createBlock("svg", {
									class: "w-10 h-10",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "2",
									"stroke-linecap": "round",
									"stroke-linejoin": "round"
								}, [
									createVNode("circle", {
										cx: "9",
										cy: "21",
										r: "1"
									}),
									createVNode("circle", {
										cx: "20",
										cy: "21",
										r: "1"
									}),
									createVNode("path", { d: "M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" })
								]))];
							}),
							_: 1
						}, _parent));
						_push(`</div>`);
					}
					_push(`</div>`);
					if (unref(cart).length > 0) {
						_push(`<div class="border-t border-slate-100 bg-slate-50 p-6 shrink-0 space-y-4" data-v-a58faff1><div class="flex items-center justify-between text-sm font-bold text-slate-600" data-v-a58faff1><span data-v-a58faff1>${ssrInterpolate(unref(t)("cart.subtotal"))}</span><span class="text-lg text-[#0B0E28]" data-v-a58faff1>${ssrInterpolate(unref(formattedCartTotal))}</span></div><p class="text-xs text-slate-400 text-center" data-v-a58faff1>${ssrInterpolate(unref(t)("cart.taxes_note"))}</p>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/checkout",
							onClick: unref(closeCart),
							class: "w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 cursor-pointer"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<span data-v-a58faff1${_scopeId}>${ssrInterpolate(unref(t)("cart.checkout_btn"))}</span><svg class="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-a58faff1${_scopeId}><line x1="5" y1="12" x2="19" y2="12" data-v-a58faff1${_scopeId}></line><polyline points="12 5 19 12 12 19" data-v-a58faff1${_scopeId}></polyline></svg>`);
								else return [createVNode("span", null, toDisplayString(unref(t)("cart.checkout_btn")), 1), (openBlock(), createBlock("svg", {
									class: "w-5 h-5 rtl:-scale-x-100",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									"stroke-width": "2.5",
									"stroke-linecap": "round",
									"stroke-linejoin": "round"
								}, [createVNode("line", {
									x1: "5",
									y1: "12",
									x2: "19",
									y2: "12"
								}), createVNode("polyline", { points: "12 5 19 12 12 19" })]))];
							}),
							_: 1
						}, _parent));
						_push(`</div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/cart/CartDrawer.vue
var _sfc_setup$4 = CartDrawer_vue_vue_type_script_setup_true_lang_default.setup;
CartDrawer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartDrawer.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var CartDrawer_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CartDrawer_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a58faff1"]]), { __name: "CartDrawer" });
//#endregion
//#region components/auth/LoginDrawer.vue?vue&type=script&setup=true&lang.ts
var LoginDrawer_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "LoginDrawer",
	__ssrInlineRender: true,
	props: { isLoginOpen: { type: Boolean } },
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { isLoginOpen: drawerLoginState, closeLogin: drawerCloseLogin } = useAuthDrawer();
		const isLoginOpen = computed(() => {
			if (typeof props.isLoginOpen === "boolean") return props.isLoginOpen;
			return drawerLoginState.value;
		});
		useAuth();
		const { t, layoutDirection } = useLanguage();
		const email = ref("");
		const password = ref("");
		const isLoading = ref(false);
		const errorMsg = ref("");
		const closeLogin = () => {
			drawerCloseLogin();
			emit("close");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (isLoginOpen.value) {
					_push(`<div class="relative z-[999]" aria-labelledby="login-drawer-title" role="dialog" aria-modal="true">`);
					if (isLoginOpen.value) _push(`<div class="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"></div>`);
					else _push(`<!---->`);
					_push(`<div class="fixed inset-0 overflow-hidden pointer-events-none"><div class="absolute inset-0 overflow-hidden"><div class="${ssrRenderClass([unref(layoutDirection) === "rtl" ? "left-0 pr-10" : "right-0 pl-10", "pointer-events-none fixed inset-y-0 flex max-w-full"])}">`);
					if (isLoginOpen.value) {
						_push(`<div class="pointer-events-auto w-screen max-w-md"><div class="flex h-full flex-col bg-white shadow-2xl"${ssrRenderAttr("dir", unref(layoutDirection))}><div class="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/50"><h2 class="text-xl font-bold text-slate-900" id="login-drawer-title">${ssrInterpolate(unref(t)("nav.login"))}</h2><button type="button" class="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-all shadow-sm cursor-pointer"><svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><div class="flex-1 overflow-y-auto p-6 space-y-6"><div class="text-center space-y-2"><div class="w-14 h-14 bg-amber-400/20 text-[#0B0E28] rounded-2xl flex items-center justify-center mx-auto mb-3 border border-amber-400/30 shadow-inner"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path></svg></div><h3 class="text-lg font-black text-slate-900">${ssrInterpolate(unref(t)("auth.welcome_title"))}</h3><p class="text-xs text-slate-500 font-medium">${ssrInterpolate(unref(t)("auth.welcome_desc"))}</p></div>`);
						if (errorMsg.value) _push(`<div class="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2"><svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg><span>${ssrInterpolate(errorMsg.value)}</span></div>`);
						else _push(`<!---->`);
						_push(`<form class="space-y-4"><div class="space-y-1.5"><label class="text-xs font-extrabold text-slate-700 block">${ssrInterpolate(unref(t)("auth.email_label"))}</label><input${ssrRenderAttr("value", email.value)} type="email" required placeholder="name@example.com" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" dir="ltr"></div><div class="space-y-1.5"><div class="flex items-center justify-between"><label class="text-xs font-extrabold text-slate-700 block">${ssrInterpolate(unref(t)("auth.password_label"))}</label>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/forgot-password",
							onClick: closeLogin,
							class: "text-xs font-bold text-amber-600 hover:text-amber-500 transition-colors cursor-pointer"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(t)("auth.forgot_password"))}`);
								else return [createTextVNode(toDisplayString(unref(t)("auth.forgot_password")), 1)];
							}),
							_: 1
						}, _parent));
						_push(`</div><input${ssrRenderAttr("value", password.value)} type="password" required placeholder="••••••••" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20"></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="w-full py-3.5 px-6 bg-[#0B0E28] hover:bg-slate-800 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer">`);
						if (isLoading.value) _push(`<span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>`);
						else _push(`<!---->`);
						_push(`<span>${ssrInterpolate(isLoading.value ? unref(t)("auth.logging_in") : unref(t)("auth.login_btn"))}</span></button></form><div class="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-bold flex items-center justify-center gap-1.5"><span>${ssrInterpolate(unref(t)("auth.no_account"))}</span>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/login",
							onClick: closeLogin,
							class: "text-amber-600 hover:text-amber-500 font-extrabold underline underline-offset-4 transition-colors cursor-pointer"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`${ssrInterpolate(unref(t)("auth.register_now"))}`);
								else return [createTextVNode(toDisplayString(unref(t)("auth.register_now")), 1)];
							}),
							_: 1
						}, _parent));
						_push(`</div></div></div></div>`);
					} else _push(`<!---->`);
					_push(`</div></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/auth/LoginDrawer.vue
var _sfc_setup$3 = LoginDrawer_vue_vue_type_script_setup_true_lang_default.setup;
LoginDrawer_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/auth/LoginDrawer.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var LoginDrawer_default = Object.assign(LoginDrawer_vue_vue_type_script_setup_true_lang_default, { __name: "AuthLoginDrawer" });
//#endregion
//#region components/common/ScrollToTop.vue
var _sfc_main = {
	__name: "CommonScrollToTop",
	__ssrInlineRender: true,
	setup(__props) {
		const isVisible = ref(false);
		return (_ctx, _push, _parent, _attrs) => {
			if (isVisible.value) _push(`<button${ssrRenderAttrs(mergeProps({
				class: "fixed bottom-6 rtl:left-6 ltr:right-6 z-[90] w-12 h-12 rounded-full shadow-lg bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] flex items-center justify-center transition-all hover:scale-110 active:scale-95 group",
				"aria-label": "العودة للأعلى",
				title: "العودة للأعلى"
			}, _attrs))} data-v-3410cd42><svg class="w-6 h-6 group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-3410cd42><line x1="12" y1="19" x2="12" y2="5" data-v-3410cd42></line><polyline points="5 12 12 5 19 12" data-v-3410cd42></polyline></svg></button>`);
			else _push(`<!---->`);
		};
	}
};
var _sfc_setup$2 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/ScrollToTop.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var ScrollToTop_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main, [["__scopeId", "data-v-3410cd42"]]);
//#endregion
//#region composables/useGlobalLoading.ts
var isAppReady = ref(false);
var isRouteLoading = ref(false);
var loadingMessage = ref("");
var useGlobalLoading = () => {
	const startLoading = (msg = "") => {
		loadingMessage.value = msg;
		isRouteLoading.value = true;
	};
	const stopLoading = () => {
		isRouteLoading.value = false;
		loadingMessage.value = "";
	};
	const setAppReady = (ready = true) => {
		isAppReady.value = ready;
	};
	return {
		isAppReady,
		isRouteLoading,
		loadingMessage,
		startLoading,
		stopLoading,
		setAppReady
	};
};
//#endregion
//#region components/common/GlobalLoadingScreen.vue?vue&type=script&setup=true&lang.ts
var GlobalLoadingScreen_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "GlobalLoadingScreen",
	__ssrInlineRender: true,
	setup(__props) {
		const { isAppReady, isRouteLoading} = useGlobalLoading();
		useNuxtApp();
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (!unref(isAppReady)) _push(`<div class="fixed inset-0 z-[9999] bg-[#0B0E28] flex flex-col items-center justify-center select-none" data-v-7c2fe2cd><div class="absolute w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none animate-pulse" data-v-7c2fe2cd></div><div class="relative z-10 flex flex-col items-center gap-6 px-6 text-center" data-v-7c2fe2cd><div class="relative flex items-center justify-center" data-v-7c2fe2cd><div class="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-amber-400/20 border-t-amber-400 animate-spin" data-v-7c2fe2cd></div><div class="absolute inset-0 flex items-center justify-center" data-v-7c2fe2cd><img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة - Aswar Jeddah" class="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md animate-pulse" data-v-7c2fe2cd></div></div><div class="space-y-2" data-v-7c2fe2cd><h2 class="text-xl sm:text-2xl font-black text-white tracking-wide" data-v-7c2fe2cd> متجر <span class="text-amber-400" data-v-7c2fe2cd>أسوار جدة</span></h2><p class="text-xs text-slate-400 font-medium" data-v-7c2fe2cd> جاري تجهيز تجربة التسوق المميزة... </p></div><div class="flex items-center gap-1.5 pt-2" data-v-7c2fe2cd><span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.3s]" data-v-7c2fe2cd></span><span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:-0.15s]" data-v-7c2fe2cd></span><span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce" data-v-7c2fe2cd></span></div></div></div>`);
				else _push(`<!---->`);
				if (unref(isRouteLoading)) _push(`<div class="fixed top-0 left-0 right-0 z-[9990] h-1 bg-amber-500/20 overflow-hidden" data-v-7c2fe2cd><div class="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 animate-progress" data-v-7c2fe2cd></div></div>`);
				else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/common/GlobalLoadingScreen.vue
var _sfc_setup$1 = GlobalLoadingScreen_vue_vue_type_script_setup_true_lang_default.setup;
GlobalLoadingScreen_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/GlobalLoadingScreen.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var GlobalLoadingScreen_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(GlobalLoadingScreen_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-7c2fe2cd"]]), { __name: "CommonGlobalLoadingScreen" });
//#endregion
//#region layouts/default.vue?vue&type=script&setup=true&lang.ts
var default_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "default",
	__ssrInlineRender: true,
	setup(__props) {
		const { dir } = useLanguage();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen flex flex-col bg-white text-slate-900 font-sans",
				dir: unref(dir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(TheHeader_default, null, null, _parent));
			_push(`<main class="flex-grow">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</main>`);
			_push(ssrRenderComponent(TheFooter_default, null, null, _parent));
			_push(ssrRenderComponent(CartDrawer_default, null, null, _parent));
			_push(ssrRenderComponent(LoginDrawer_default, null, null, _parent));
			_push(ssrRenderComponent(TheToast_default, null, null, _parent));
			_push(ssrRenderComponent(ScrollToTop_default, null, null, _parent));
			_push(ssrRenderComponent(GlobalLoadingScreen_default, null, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region layouts/default.vue
var _sfc_setup = default_vue_vue_type_script_setup_true_lang_default.setup;
default_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var default_default = default_vue_vue_type_script_setup_true_lang_default;

export { default_default as default };
//# sourceMappingURL=default-gbBy4QE0.mjs.map
