import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { s as sanitizeTag, _ as _plugin_vue_export_helper_default, k as useAdminPermissions, f as useAdminAuth, a as useToast } from '../virtual/entry.mjs';
import { defineComponent, shallowRef, getCurrentInstance, provide, cloneVNode, h, createElementBlock, ref, mergeProps, unref, withCtx, createVNode, reactive, watch, useSSRContext } from 'vue';
import { a as adminSettingsApiService } from './adminSettingsApiService-C7FyPisQ.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderComponent } from 'vue/server-renderer';
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

defineComponent({
	name: "ServerPlaceholder",
	render() {
		return createElementBlock("div");
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/components/client-only.js
var clientOnlySymbol = Symbol.for("nuxt:client-only");
var ClientOnly = defineComponent({
	name: "ClientOnly",
	inheritAttrs: false,
	props: [
		"fallback",
		"placeholder",
		"placeholderTag",
		"fallbackTag"
	],
	setup(props, { slots, attrs }) {
		const mounted = shallowRef(false);
		const vm = getCurrentInstance();
		if (vm) vm._nuxtClientOnly = true;
		provide(clientOnlySymbol, true);
		return () => {
			if (mounted.value) {
				const vnodes = slots.default?.();
				if (vnodes && vnodes.length === 1) return [cloneVNode(vnodes[0], attrs)];
				return vnodes;
			}
			const slot = slots.fallback || slots.placeholder;
			if (slot) return h(slot);
			const fallbackStr = props.fallback || props.placeholder || "";
			return createElementBlock(sanitizeTag(props.fallbackTag || props.placeholderTag, "span"), attrs, fallbackStr);
		};
	}
});

//#region composables/useAdminSettings.ts
var useAdminSettings = () => {
	const { adminToken } = useAdminAuth();
	const toast = useToast();
	const isLoading = ref(false);
	const isSaving = ref(false);
	const hasUnsavedChanges = ref(false);
	const isInitialLoaded = ref(false);
	const errorMessage = ref("");
	const fieldErrors = ref({});
	const settings = reactive({
		store_name_ar: "أسوار جدة",
		store_name_en: "Aswar Jeddah",
		meta_title: "أسوار جدة | الأجهزة الكهربائية والمنزلية",
		meta_title_en: "Aswar Jeddah | Home Appliances & Electronics",
		meta_description: "متجر أسوار جدة الرائد للأجهزة الكهربائية والمنزلية والإلكترونيات بالمملكة العربية السعودية بأفضل الأسعار وأعلى جودة.",
		meta_description_en: "Leading e-commerce store for home appliances and electronics in Saudi Arabia with best prices and fast delivery.",
		store_description_ar: "متجر أسوار جدة الرائد للأجهزة الكهربائية والمنزلية والإلكترونيات بالمملكة العربية السعودية.",
		store_description_en: "Leading e-commerce store for home appliances and electronics in Saudi Arabia.",
		support_email: "support@aswarjeddah.com",
		support_phone: "+966559876543",
		hotline: "920000000",
		currency: "SAR",
		currency_symbol: "ر.س",
		timezone: "Asia/Riyadh",
		shop_address_ar: "طريق الملك فهد، حي الروضة، جدة، المملكة العربية السعودية",
		shop_address_en: "King Fahd Road, Al Rawdah, Jeddah, Saudi Arabia",
		address_ar: "طريق الملك فهد، حي الروضة، جدة، المملكة العربية السعودية",
		address_en: "King Fahd Road, Al Rawdah, Jeddah, Saudi Arabia",
		city: "جدة",
		country: "المملكة العربية السعودية",
		latitude: "21.543333",
		longitude: "39.172778",
		google_map_embed_url: "",
		logo_url: "",
		mobile_logo_url: "",
		footer_logo_url: "",
		invoice_logo_url: "",
		favicon_url: "",
		loader_gif_url: "",
		primary_color: "#0B0E28",
		secondary_color: "#FBBF24",
		accent_color: "#4F46E5",
		bg_color: "#F8F9FA",
		header_color: "#FFFFFF",
		footer_color: "#0B0E28",
		copyright_text_ar: "جميع الحقوق محفوظة © 2026 لشركة أسوار جدة للتجارة.",
		copyright_text_en: "All rights reserved © 2026 Aswar Jeddah Trading Co.",
		cookie_bar_status: true,
		cookie_bar_text_ar: "نستخدم ملفات تعريف الارتباط لتحسين تجربة التسوق وتقديم محتوى ملائم.",
		cookie_bar_text_en: "We use cookies to improve your shopping experience and deliver relevant content.",
		terms_url: "/terms",
		privacy_url: "/privacy",
		refund_url: "/refund-policy",
		shipping_enabled: true,
		free_shipping_enabled: true,
		free_shipping_threshold: 500,
		default_shipping_cost: 25,
		estimated_delivery_days: "1 - 3 أيام عمل",
		vat_enabled: true,
		vat_rate: 15,
		prices_tax_inclusive: true,
		tax_number: "300123456789003",
		backorder_enabled: false,
		min_order_amount: 50,
		default_order_status: "pending",
		invoice_prefix: "ASW-",
		cod_enabled: true,
		online_payment_enabled: true,
		payment_mode: "live",
		paymob_api_key: "",
		paymob_integration_id: "",
		paymob_iframe_id: "",
		tabby_enabled: true,
		tamara_enabled: true,
		moyasar_enabled: false,
		cash_on_delivery: true,
		digital_payment: true,
		tabby: true,
		tamara: true,
		sandbox_mode: false,
		active_gateways: [
			"cash_on_delivery",
			"paymob_accept",
			"tamara",
			"tabby"
		],
		whatsapp_number: "+966559876543",
		whatsapp_chat_enabled: true,
		facebook_url: "https://facebook.com",
		instagram_url: "https://instagram.com",
		twitter_url: "https://x.com",
		tiktok_url: "https://tiktok.com",
		youtube_url: "",
		snapchat_url: "https://snapchat.com",
		ga_tracking_id: "",
		google_analytics_id: "",
		fb_pixel_id: "",
		facebook_pixel_id: "",
		tiktok_pixel_id: "",
		download_app_apple_store: "",
		download_app_google_store: "",
		maintenance_mode: false,
		allow_admin_bypass: true,
		maintenance_title_ar: "المتجر تحت الصيانة والتطوير",
		maintenance_title_en: "Store Under Maintenance",
		maintenance_message_ar: "نقوم حالياً ببعض أعمال الصيانة والترقية لنقدم لكم تجربة تسوق أفضل. سنعود قريباً!",
		maintenance_message_en: "We are currently upgrading our store for a better experience. We will be back shortly!",
		expected_back_date: "",
		maintenance_end_at: ""
	});
	const files = reactive({
		logo: null,
		mobile_logo: null,
		footer_logo: null,
		invoice_logo: null,
		favicon: null,
		loader_gif: null
	});
	const filePreviews = reactive({
		logo: "",
		mobile_logo: "",
		footer_logo: "",
		invoice_logo: "",
		favicon: "",
		loader_gif: ""
	});
	/**
	* Fetch current settings from backend
	*/
	const fetchSettings = async () => {
		const token = adminToken.value || null;
		if (!token) {
			console.warn("[useAdminSettings] No admin token found for fetchSettings");
			return;
		}
		isLoading.value = true;
		errorMessage.value = "";
		try {
			const res = await adminSettingsApiService.fetchSettings(token);
			console.log("[useAdminSettings] fetchSettings result:", res);
			if (res.success && res.data) Object.assign(settings, res.data);
		} catch (err) {
			console.warn("[useAdminSettings] fetch error:", err);
			errorMessage.value = "تعذر جلب إعدادات المتجر من السيرفر.";
		} finally {
			isLoading.value = false;
			isInitialLoaded.value = true;
			setTimeout(() => {
				hasUnsavedChanges.value = false;
			}, 150);
		}
	};
	/**
	* Handle image file selection with live preview
	*/
	const handleFileUpload = (field, file) => {
		if (!file) {
			files[field] = null;
			filePreviews[field] = "";
			return;
		}
		files[field] = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			filePreviews[field] = e.target?.result;
			hasUnsavedChanges.value = true;
		};
		reader.readAsDataURL(file);
	};
	/**
	* Remove image
	*/
	const removeImage = (field) => {
		files[field] = null;
		filePreviews[field] = "";
		const urlKey = `${field}_url`;
		if (urlKey in settings) settings[urlKey] = "";
		hasUnsavedChanges.value = true;
	};
	/**
	* Save / Update all settings via multipart/form-data
	*/
	const saveSettings = async () => {
		const token = adminToken.value;
		if (!token) {
			toast.error("غير مصرح", "يرجى تسجيل الدخول أولاً كمسؤول.");
			return false;
		}
		isSaving.value = true;
		fieldErrors.value = {};
		errorMessage.value = "";
		try {
			const res = await adminSettingsApiService.updateSettings(token, settings, files);
			if (res.success) {
				toast.success("تم الحفظ بنجاح", res.message || "تم تحديث كافة إعدادات المتجر بنجاح!");
				hasUnsavedChanges.value = false;
				Object.keys(files).forEach((k) => {
					files[k] = null;
				});
				Object.keys(filePreviews).forEach((k) => {
					filePreviews[k] = "";
				});
				if (res.data) {
					const mapped = adminSettingsApiService.mapServerSettingsToState(res.data);
					Object.assign(settings, mapped);
				}
				await fetchSettings();
				return true;
			} else {
				errorMessage.value = res.message;
				if (res.errors) fieldErrors.value = res.errors;
				toast.error("فشل الحفظ", res.message || "يرجى مراجعة الحقول وإعادة المحاولة.");
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.message || "حدث خطأ غير متوقع أثناء حفظ الإعدادات.";
			toast.error("خطأ غير متوقع", errorMessage.value);
			return false;
		} finally {
			isSaving.value = false;
		}
	};
	watch(() => [
		settings.cod_enabled,
		settings.online_payment_enabled,
		settings.tabby_enabled,
		settings.tamara_enabled,
		settings.payment_mode
	], ([cod, online, tabby, tamara, mode]) => {
		settings.cash_on_delivery = Boolean(cod);
		settings.digital_payment = Boolean(online);
		settings.tabby = Boolean(tabby);
		settings.tamara = Boolean(tamara);
		settings.sandbox_mode = mode === "sandbox";
	}, { immediate: true });
	watch(() => settings, () => {
		if (isInitialLoaded.value) hasUnsavedChanges.value = true;
	}, { deep: true });
	return {
		settings,
		files,
		filePreviews,
		isLoading,
		isSaving,
		hasUnsavedChanges,
		errorMessage,
		fieldErrors,
		fetchSettings,
		handleFileUpload,
		removeImage,
		saveSettings
	};
};
//#endregion
//#region pages/admin/settings/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "إعدادات النظام والمتجر الشاملة | أسوار جدة" });
		useAdminPermissions();
		const { settings, filePreviews, isLoading, isSaving, hasUnsavedChanges, errorMessage} = useAdminSettings();
		const activeSection = ref("general");
		ref(null);
		const sections = [
			{
				id: "general",
				title: "1. الإعدادات العامة",
				badge: "أساسي",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4\" /></svg>"
			},
			{
				id: "location",
				title: "2. العناوين والموقع",
				badge: "Maps",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 11a3 3 0 11-6 0 3 3 0 016 0z\" /></svg>"
			},
			{
				id: "media",
				title: "3. الشعارات والوسائط",
				badge: "6 صور",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\" /></svg>"
			},
			{
				id: "colors",
				title: "4. هوية الألوان والسمة",
				badge: "Branding",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7\" /></svg>"
			},
			{
				id: "legal",
				title: "5. القوانين والحقوق",
				badge: "SEO",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" /></svg>"
			},
			{
				id: "shipping",
				title: "6. الشحن والتوصيل",
				badge: "Delivery",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z\" /></svg>"
			},
			{
				id: "financial",
				title: "7. المالية والضرائب",
				badge: "VAT 15%",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>"
			},
			{
				id: "orders",
				title: "8. الطلبات والمخزون",
				badge: "Stock",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4\" /></svg>"
			},
			{
				id: "payments",
				title: "9. بوابات الدفع",
				badge: "Mada/Visa",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z\" /></svg>"
			},
			{
				id: "social",
				title: "10. التواصل والبيكسل",
				badge: "Analytics",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 7h8m0 0v8m0-8l-8 8-4-4-6 6\" /></svg>"
			},
			{
				id: "maintenance",
				title: "11. الصيانة والتعطيل",
				badge: "Live/Off",
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\" /></svg>"
			}
		];
		return (_ctx, _push, _parent, _attrs) => {
			const _component_ClientOnly = ClientOnly;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 pb-28 min-h-screen" }, _attrs))} data-v-d3ec70a8><div class="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-d3ec70a8><div class="flex items-center gap-3.5" data-v-d3ec70a8><div class="w-12 h-12 rounded-2xl bg-amber-400/20 text-[#0B0E28] flex items-center justify-center font-black shrink-0 shadow-2xs" data-v-d3ec70a8><svg class="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" data-v-d3ec70a8></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" data-v-d3ec70a8></path></svg></div><div data-v-d3ec70a8><h1 class="text-xl sm:text-2xl font-black text-slate-900 leading-tight" data-v-d3ec70a8>إعدادات النظام والمتجر الشاملة</h1><p class="text-xs sm:text-sm text-slate-500 font-medium mt-0.5" data-v-d3ec70a8>تخصيص البيانات العامة، الهوية البصرية، الشحن، الضرائب، بوابات الدفع، وإدارة الصيانة.</p></div></div><div class="flex items-center gap-3 w-full sm:w-auto justify-end" data-v-d3ec70a8>`);
			if (unref(hasUnsavedChanges)) _push(`<div class="flex items-center gap-1.5 text-amber-700 text-xs font-black bg-amber-50 rounded-xl px-3 py-2 border border-amber-200/80 animate-pulse" data-v-d3ec70a8><svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" data-v-d3ec70a8></path></svg><span class="hidden md:inline" data-v-d3ec70a8>يوجد تعديلات غير محفوظة</span><span class="md:hidden" data-v-d3ec70a8>غير محفوظ</span></div>`);
			else _push(`<!---->`);
			_push(`<button${ssrIncludeBooleanAttr(unref(isLoading) || unref(isSaving)) ? " disabled" : ""} class="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer disabled:opacity-50" title="إعادة جلب الإعدادات من السيرفر" data-v-d3ec70a8><svg class="${ssrRenderClass([unref(isLoading) ? "animate-spin" : "", "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-d3ec70a8></path></svg></button><button${ssrIncludeBooleanAttr(unref(isSaving) || unref(isLoading)) ? " disabled" : ""} class="px-6 py-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-black text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 min-w-[150px]" data-v-d3ec70a8>`);
			if (unref(isSaving)) _push(`<span class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" data-v-d3ec70a8></span>`);
			else _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-d3ec70a8></path></svg>`);
			_push(`<span data-v-d3ec70a8>${ssrInterpolate(unref(isSaving) ? "جاري الحفظ..." : "حفظ كافة الإعدادات")}</span></button></div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold" data-v-d3ec70a8><div class="flex items-center gap-2" data-v-d3ec70a8><svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-d3ec70a8></path></svg><span data-v-d3ec70a8>${ssrInterpolate(unref(errorMessage))}</span></div><button class="text-rose-500 hover:text-rose-700 cursor-pointer" data-v-d3ec70a8>✕</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 relative" data-v-d3ec70a8><div class="flex items-center gap-2.5 overflow-x-auto pb-1 scroll-smooth hide-scrollbar" data-v-d3ec70a8><!--[-->`);
			ssrRenderList(sections, (section) => {
				_push(`<button type="button" class="${ssrRenderClass([activeSection.value === section.id ? "bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-md shadow-slate-900/15 ring-2 ring-amber-400/20" : "bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 border-slate-200/80", "whitespace-nowrap shrink-0 px-4 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer flex items-center gap-2.5 border select-none"])}" data-v-d3ec70a8><span class="w-4 h-4 flex items-center justify-center shrink-0" data-v-d3ec70a8>${section.icon ?? ""}</span><span data-v-d3ec70a8>${ssrInterpolate(section.title)}</span>`);
				if (section.badge) _push(`<span class="${ssrRenderClass([activeSection.value === section.id ? "bg-amber-400 text-[#0B0E28]" : "bg-slate-200 text-slate-600", "px-2 py-0.5 rounded-lg text-[10px] font-black"])}" data-v-d3ec70a8>${ssrInterpolate(section.badge)}</span>`);
				else _push(`<!---->`);
				_push(`</button>`);
			});
			_push(`<!--]--></div></div><div class="w-full space-y-6" data-v-d3ec70a8>`);
			if (unref(isLoading) && !unref(settings).store_name_ar) _push(`<div class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6 animate-pulse" data-v-d3ec70a8><div class="w-48 h-6 bg-slate-200 rounded-xl" data-v-d3ec70a8></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" data-v-d3ec70a8><div class="h-12 bg-slate-100 rounded-xl" data-v-d3ec70a8></div><div class="h-12 bg-slate-100 rounded-xl" data-v-d3ec70a8></div></div><div class="h-28 bg-slate-100 rounded-xl" data-v-d3ec70a8></div></div>`);
			else {
				_push(`<!--[--><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "general" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>1. الإعدادات العامة للمتجر</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>البيانات التعريفية الأساسية لمتجر أسوار جدة والمعلومات الرسمية المعتمدة.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>اسم المتجر (بالعربية) <span class="text-rose-500" data-v-d3ec70a8>*</span></label><input${ssrRenderAttr("value", unref(settings).store_name_ar)} type="text" placeholder="أسوار جدة" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Store Name (English) <span class="text-rose-500" data-v-d3ec70a8>*</span></label><input${ssrRenderAttr("value", unref(settings).store_name_en)} type="text" placeholder="Aswar Jeddah" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>البريد الإلكتروني الرسمي للدعم <span class="text-rose-500" data-v-d3ec70a8>*</span></label><input${ssrRenderAttr("value", unref(settings).support_email)} type="email" placeholder="support@aswarjeddah.com" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رقم الهاتف والجوال للدعم</label><input${ssrRenderAttr("value", unref(settings).support_phone)} type="text" placeholder="+966559876543" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الرقم الموحد / الخط الساخن (Hotline)</label><input${ssrRenderAttr("value", unref(settings).hotline)} type="text" placeholder="920000000" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="grid grid-cols-2 gap-3" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>العملة الافتراضية</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer" data-v-d3ec70a8><option value="SAR" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "SAR") : ssrLooseEqual(unref(settings).currency, "SAR")) ? " selected" : ""}>ريال سعودي (SAR)</option><option value="USD" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "USD") : ssrLooseEqual(unref(settings).currency, "USD")) ? " selected" : ""}>دولار أمريكي (USD)</option><option value="AED" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).currency) ? ssrLooseContain(unref(settings).currency, "AED") : ssrLooseEqual(unref(settings).currency, "AED")) ? " selected" : ""}>درهم إماراتي (AED)</option></select></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>المنطقة الزمنية</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 cursor-pointer" data-v-d3ec70a8><option value="Asia/Riyadh" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).timezone) ? ssrLooseContain(unref(settings).timezone, "Asia/Riyadh") : ssrLooseEqual(unref(settings).timezone, "Asia/Riyadh")) ? " selected" : ""}>توقيت السعودية (Asia/Riyadh)</option><option value="Asia/Dubai" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).timezone) ? ssrLooseContain(unref(settings).timezone, "Asia/Dubai") : ssrLooseEqual(unref(settings).timezone, "Asia/Dubai")) ? " selected" : ""}>توقيت دبي (Asia/Dubai)</option><option value="Africa/Cairo" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).timezone) ? ssrLooseContain(unref(settings).timezone, "Africa/Cairo") : ssrLooseEqual(unref(settings).timezone, "Africa/Cairo")) ? " selected" : ""}>توقيت القاهرة (Africa/Cairo)</option></select></div></div><div class="md:col-span-1 lg:col-span-2 space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>عنوان محركات البحث SEO (بالعربية - Meta Title)</label><input${ssrRenderAttr("value", unref(settings).meta_title)} type="text" placeholder="أسوار جدة | متجر الأجهزة المنزلية والإلكترونيات" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="md:col-span-1 lg:col-span-1 space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>SEO Meta Title (English)</label><input${ssrRenderAttr("value", unref(settings).meta_title_en)} type="text" placeholder="Aswar Jeddah | Home Appliances &amp; Electronics" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>وصف المتجر ونبذة عن النشاط (عربي - لمحركات البحث Meta Description) <span class="text-amber-600 font-normal text-[11px]" data-v-d3ec70a8>(form.general.meta_description)</span></label></div><textarea rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all leading-relaxed" placeholder="اكتب نبذة تعريفية شاملة عن متجر أسوار جدة تظهر في نتائج بحث جوجل..." data-v-d3ec70a8>${ssrInterpolate(unref(settings).meta_description)}</textarea></div><div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Store SEO Meta Description (English) <span class="text-slate-400 font-normal text-[11px]" data-v-d3ec70a8>(meta_description_en)</span></label></div><textarea rows="3" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all leading-relaxed" placeholder="Store meta description in English for Google search results..." data-v-d3ec70a8>${ssrInterpolate(unref(settings).meta_description_en)}</textarea></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "location" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2" data-v-d3ec70a8><div data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>2. العناوين والموقع الجغرافي (الخريطة التفاعلية)</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>حدد موقع المتجر عبر الخريطة التفاعلية بالسحب والإفلات أو بالبحث عن العنوان.</p></div><span class="px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-black rounded-xl border border-emerald-200/80 flex items-center gap-1.5" data-v-d3ec70a8><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" data-v-d3ec70a8></span><span data-v-d3ec70a8>خريطة تفاعلية نشطة</span></span></div>`);
				_push(ssrRenderComponent(_component_ClientOnly, null, { fallback: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<div class="w-full h-80 sm:h-96 rounded-3xl bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2 border border-slate-200" data-v-d3ec70a8${_scopeId}><span class="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" data-v-d3ec70a8${_scopeId}></span><span class="text-xs font-black text-slate-400" data-v-d3ec70a8${_scopeId}>جاري تهيئة الخريطة التفاعلية...</span></div>`);
					else return [createVNode("div", { class: "w-full h-80 sm:h-96 rounded-3xl bg-slate-100 animate-pulse flex flex-col items-center justify-center gap-2 border border-slate-200" }, [createVNode("span", { class: "w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" }), createVNode("span", { class: "text-xs font-black text-slate-400" }, "جاري تهيئة الخريطة التفاعلية...")])];
				}) }, _parent));
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>العنوان التفصيلي للمتجر (بالعربية) <span class="text-rose-500" data-v-d3ec70a8>*</span></label><input${ssrRenderAttr("value", unref(settings).shop_address_ar)} type="text" placeholder="طريق الملك فهد، حي الروضة، جدة" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Detailed Store Address (English)</label><input${ssrRenderAttr("value", unref(settings).shop_address_en)} type="text" placeholder="King Fahd Road, Al Rawdah, Jeddah" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>المدينة / المنطقة</label><input${ssrRenderAttr("value", unref(settings).city)} type="text" placeholder="جدة" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>خط العرض (Latitude)</label><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>تحديث تلقائي</span></div><input${ssrRenderAttr("value", unref(settings).latitude)} type="text" placeholder="21.543333" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>خط الطول (Longitude)</label><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>تحديث تلقائي</span></div><input${ssrRenderAttr("value", unref(settings).longitude)} type="text" placeholder="39.172778" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الدولة</label><input${ssrRenderAttr("value", unref(settings).country)} type="text" placeholder="المملكة العربية السعودية" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div><div class="md:col-span-2 lg:col-span-3 space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط تضمين خريطة جوجل (Google Maps Embed URL)</label><input${ssrRenderAttr("value", unref(settings).google_map_embed_url)} type="url" placeholder="https://maps.google.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "media" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>3. الشعارات، الأيقونات والوسائط البصرية</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>رفع وتحديث كافة الشعارات الرسمية، أيقونة المتصفح، وصورة التحميل مع المعاينة الحية الفورية.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d3ec70a8><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>شعار الديسكتوب (Header)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>PNG / SVG</span></div><div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative group" data-v-d3ec70a8>`);
				if (unref(filePreviews).logo || unref(settings).logo_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).logo || unref(settings).logo_url)} alt="Desktop Logo" class="max-h-full max-w-full object-contain" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-300 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>لا يوجد شعار</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).logo || unref(settings).logo_url ? "تغيير الشعار" : "رفع شعار")}</span><input type="file" accept="image/*" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).logo || unref(settings).logo_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" title="حذف" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>شعار الموبايل (Mobile)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>PNG / SVG</span></div><div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative" data-v-d3ec70a8>`);
				if (unref(filePreviews).mobile_logo || unref(settings).mobile_logo_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).mobile_logo || unref(settings).mobile_logo_url)} alt="Mobile Logo" class="max-h-full max-w-full object-contain" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-300 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>لا يوجد شعار</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).mobile_logo || unref(settings).mobile_logo_url ? "تغيير" : "رفع")}</span><input type="file" accept="image/*" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).mobile_logo || unref(settings).mobile_logo_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>شعار تذييل الصفحة (Footer)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>PNG / SVG</span></div><div class="w-full h-32 rounded-xl bg-[#0B0E28] border border-slate-800 flex items-center justify-center p-3 overflow-hidden relative" data-v-d3ec70a8>`);
				if (unref(filePreviews).footer_logo || unref(settings).footer_logo_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).footer_logo || unref(settings).footer_logo_url)} alt="Footer Logo" class="max-h-full max-w-full object-contain" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-600 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>شعار الفوتر</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).footer_logo || unref(settings).footer_logo_url ? "تغيير" : "رفع")}</span><input type="file" accept="image/*" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).footer_logo || unref(settings).footer_logo_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>شعار الفواتير والطباعة (Invoice)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>أبيض وأسود / ملون</span></div><div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative" data-v-d3ec70a8>`);
				if (unref(filePreviews).invoice_logo || unref(settings).invoice_logo_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).invoice_logo || unref(settings).invoice_logo_url)} alt="Invoice Logo" class="max-h-full max-w-full object-contain" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-300 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>شعار الفواتير</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).invoice_logo || unref(settings).invoice_logo_url ? "تغيير" : "رفع")}</span><input type="file" accept="image/*" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).invoice_logo || unref(settings).invoice_logo_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>أيقونة المتصفح (Favicon)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>ICO / PNG (32x32)</span></div><div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative" data-v-d3ec70a8>`);
				if (unref(filePreviews).favicon || unref(settings).favicon_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).favicon || unref(settings).favicon_url)} alt="Favicon" class="w-12 h-12 object-contain shadow-2xs rounded-lg" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-300 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>Favicon</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).favicon || unref(settings).favicon_url ? "تغيير" : "رفع")}</span><input type="file" accept="image/*,.ico" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).favicon || unref(settings).favicon_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col items-center text-center space-y-4" data-v-d3ec70a8><div class="w-full flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-900" data-v-d3ec70a8>متحرك التحميل (Loader GIF)</span><span class="text-[10px] text-slate-400 font-bold" data-v-d3ec70a8>GIF / APNG</span></div><div class="w-full h-32 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 overflow-hidden relative" data-v-d3ec70a8>`);
				if (unref(filePreviews).loader_gif || unref(settings).loader_gif_url) _push(`<img${ssrRenderAttr("src", unref(filePreviews).loader_gif || unref(settings).loader_gif_url)} alt="Loader GIF" class="max-h-full max-w-full object-contain" data-v-d3ec70a8>`);
				else _push(`<div class="text-slate-300 flex flex-col items-center gap-1" data-v-d3ec70a8><svg class="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" data-v-d3ec70a8></path></svg><span class="text-[10px] font-bold" data-v-d3ec70a8>Loader GIF</span></div>`);
				_push(`</div><div class="flex items-center gap-2 w-full" data-v-d3ec70a8><label class="flex-1 py-2.5 px-3 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black cursor-pointer transition-all text-center" data-v-d3ec70a8><span data-v-d3ec70a8>${ssrInterpolate(unref(filePreviews).loader_gif || unref(settings).loader_gif_url ? "تغيير" : "رفع")}</span><input type="file" accept="image/gif,image/png,image/*" class="hidden" data-v-d3ec70a8></label>`);
				if (unref(filePreviews).loader_gif || unref(settings).loader_gif_url) _push(`<button class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" data-v-d3ec70a8><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-d3ec70a8><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" data-v-d3ec70a8></path></svg></button>`);
				else _push(`<!---->`);
				_push(`</div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "colors" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>4. هوية الألوان والسمة العامة (Theme Colors)</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>تحديد باليتة الألوان المعتمدة للمتجر الإلكتروني، الأزرار، الترويسة، والتذييل.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d3ec70a8><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>اللون الأساسي (Primary Color)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).primary_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).primary_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>اللون الثانوي (Secondary Color)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).secondary_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).secondary_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>لون التمييز والأزرار (Accent)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).accent_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).accent_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>لون خلفية المتجر (Background)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).bg_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).bg_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>لون شريط الرأس (Header Navbar)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).header_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).header_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>لون التذييل (Footer Background)</label><div class="flex items-center gap-3" data-v-d3ec70a8><input type="color"${ssrRenderAttr("value", unref(settings).footer_color)} class="w-10 h-10 rounded-xl border border-slate-300 cursor-pointer p-0.5" data-v-d3ec70a8><input type="text"${ssrRenderAttr("value", unref(settings).footer_color)} dir="ltr" class="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold" data-v-d3ec70a8></div></div></div><div class="mt-6 p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3" data-v-d3ec70a8><span class="text-xs font-black text-slate-700 block" data-v-d3ec70a8>معاينة تفاعلية حية لألوان المتجر:</span><div class="w-full rounded-2xl overflow-hidden shadow-md border border-slate-200" style="${ssrRenderStyle({ backgroundColor: unref(settings).bg_color })}" data-v-d3ec70a8><div class="h-10 px-4 flex items-center justify-between border-b" style="${ssrRenderStyle({
					backgroundColor: unref(settings).header_color,
					borderColor: "#e2e8f0"
				})}" data-v-d3ec70a8><div class="w-16 h-4 rounded" style="${ssrRenderStyle({ backgroundColor: unref(settings).primary_color })}" data-v-d3ec70a8></div><div class="flex items-center gap-2" data-v-d3ec70a8><div class="w-12 h-2.5 rounded bg-slate-200" data-v-d3ec70a8></div><div class="w-12 h-2.5 rounded bg-slate-200" data-v-d3ec70a8></div></div></div><div class="p-4 flex items-center gap-4" data-v-d3ec70a8><div class="flex-1 space-y-2" data-v-d3ec70a8><div class="w-3/4 h-4 rounded font-bold" style="${ssrRenderStyle({ color: unref(settings).primary_color })}" data-v-d3ec70a8>عنوان منتج تجريبي</div><div class="w-1/2 h-2.5 rounded bg-slate-300" data-v-d3ec70a8></div></div><button class="px-3 py-1.5 rounded-lg text-[11px] font-black text-white" style="${ssrRenderStyle({
					backgroundColor: unref(settings).secondary_color,
					color: unref(settings).primary_color
				})}" data-v-d3ec70a8> إضافة للسلة </button></div><div class="h-8 px-4 flex items-center justify-between text-[10px] text-white/80" style="${ssrRenderStyle({ backgroundColor: unref(settings).footer_color })}" data-v-d3ec70a8><span data-v-d3ec70a8>أسوار جدة © 2026</span><div class="w-8 h-2 rounded bg-white/20" data-v-d3ec70a8></div></div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "legal" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>5. القوانين، الحقوق وسياسات الخصوصية</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>نصوص حقوق الملكية الفكرية، شريط الكوكيز، وروابط الصفحات التنظيمية.</p></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>نص حقوق الملكية (بالعربية)</label><input${ssrRenderAttr("value", unref(settings).copyright_text_ar)} type="text" placeholder="جميع الحقوق محفوظة © 2026 لشركة أسوار جدة" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400 transition-all" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Copyright Notice (English)</label><input${ssrRenderAttr("value", unref(settings).copyright_text_en)} type="text" placeholder="All Rights Reserved © 2026 Aswar Jeddah" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400 transition-all" data-v-d3ec70a8></div><div class="md:col-span-2 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>تفعيل إشعار ملفات تعريف الارتباط (Cookie Consent Bar)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>إظهار شريط الموافقة على الكوكيز والخصوصية للزوار الجدد في أسفل الصفحة.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).cookie_bar_status,
					"onUpdate:modelValue": ($event) => unref(settings).cookie_bar_status = $event
				}, null, _parent));
				_push(`</div>`);
				if (unref(settings).cookie_bar_status) _push(`<div class="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 pt-1" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>نص رسالة الكوكيز (بالعربية)</label><textarea rows="3" placeholder="نستخدم ملفات تعريف الارتباط لتحسين تجربة التسوق وتقديم أفضل خدمة..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8>${ssrInterpolate(unref(settings).cookie_bar_text_ar)}</textarea></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Cookie Notice Message (English)</label><textarea rows="3" dir="ltr" placeholder="We use cookies to enhance your browsing experience, serve personalized content..." class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:bg-white transition-all" data-v-d3ec70a8>${ssrInterpolate(unref(settings).cookie_bar_text_en)}</textarea></div></div>`);
				else _push(`<!---->`);
				_push(`<div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط الشروط والأحكام (Terms)</label><input${ssrRenderAttr("value", unref(settings).terms_url)} type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط سياسة الخصوصية (Privacy)</label><input${ssrRenderAttr("value", unref(settings).privacy_url)} type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "shipping" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>6. قواعد الشحن والتوصيل</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>تحديد تكاليف التوصيل، حد الشحن المجاني، وأوقات التسليم المتوقعة للطلبات.</p></div><div class="space-y-4" data-v-d3ec70a8><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>تفعيل نظام الشحن والتوصيل للعملاء</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>في حال التعطيل سيتاح للعملاء الاستلام من الفرع فقط.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).shipping_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).shipping_enabled = $event
				}, null, _parent));
				_push(`</div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>تفعيل ميزة الشحن المجاني فوق حد محدد</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>منح الشحن المجاني تلقائياً عند تجاوز سلة الشراء للمبلغ المحدد.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).free_shipping_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).free_shipping_enabled = $event
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>تكلفة الشحن الافتراضية</label><div class="relative" data-v-d3ec70a8><input${ssrRenderAttr("value", unref(settings).default_shipping_cost)} type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8><span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400" data-v-d3ec70a8>ر.س</span></div></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الحد الأدنى للشحن المجاني</label><div class="relative" data-v-d3ec70a8><input${ssrRenderAttr("value", unref(settings).free_shipping_threshold)} type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8><span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400" data-v-d3ec70a8>ر.س</span></div></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الوقت التقديري للتوصيل</label><input${ssrRenderAttr("value", unref(settings).estimated_delivery_days)} type="text" placeholder="1 - 3 أيام عمل" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8></div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "financial" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>7. المالية وضريبة القيمة المضافة (VAT)</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>إعدادات هيئة الزكاة والضريبة والجمارك (ZATCA)، نسبة الضريبة، والرقم الضريبي الرسمي.</p></div><div class="space-y-4" data-v-d3ec70a8><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>تفعيل ضريبة القيمة المضافة (VAT)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>تطبيق النسبة الضريبية النظامية على المنتجات وتكاليف الشحن.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).vat_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).vat_enabled = $event
				}, null, _parent));
				_push(`</div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>الأسعار المعروضة في المتجر شاملة الضريبة</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>إذا تم التفعيل، فلن يتم احتساب مبلغ ضريبة إضافي عند الدفع بل سيتم استخراجه من السعر.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).prices_tax_inclusive,
					"onUpdate:modelValue": ($event) => unref(settings).prices_tax_inclusive = $event
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>نسبة ضريبة القيمة المضافة (%)</label><div class="relative" data-v-d3ec70a8><input${ssrRenderAttr("value", unref(settings).vat_rate)} type="number" min="0" max="100" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8><span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400" data-v-d3ec70a8>%</span></div></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الرقم الضريبي للمنشأة (Tax Number)</label><input${ssrRenderAttr("value", unref(settings).tax_number)} type="text" placeholder="300123456789003" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8></div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "orders" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>8. سياسات الطلبات وإدارة المخزون</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>التحكم في قيود الشراء، المخزون الصفري، وبادئات الفواتير.</p></div><div class="space-y-4" data-v-d3ec70a8><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>السماح بالشراء عند نفاد المخزون (Backorders)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>تمكين العملاء من إتمام الطلب مسبقاً حتى لو كان المخزون المتاح 0.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).backorder_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).backorder_enabled = $event
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>أقل مبلغ لإتمام الطلب (Min Order Amount)</label><div class="relative" data-v-d3ec70a8><input${ssrRenderAttr("value", unref(settings).min_order_amount)} type="number" min="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8><span class="absolute end-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400" data-v-d3ec70a8>ر.س</span></div></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الحالة الافتراضية للطلب الجديد</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8><option value="pending" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).default_order_status) ? ssrLooseContain(unref(settings).default_order_status, "pending") : ssrLooseEqual(unref(settings).default_order_status, "pending")) ? " selected" : ""}>قيد الانتظار (Pending)</option><option value="confirmed" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).default_order_status) ? ssrLooseContain(unref(settings).default_order_status, "confirmed") : ssrLooseEqual(unref(settings).default_order_status, "confirmed")) ? " selected" : ""}>مؤكد (Confirmed)</option><option value="processing" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).default_order_status) ? ssrLooseContain(unref(settings).default_order_status, "processing") : ssrLooseEqual(unref(settings).default_order_status, "processing")) ? " selected" : ""}>جاري التجهيز (Processing)</option></select></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>بادئة رقم الفاتورة (Invoice Prefix)</label><input${ssrRenderAttr("value", unref(settings).invoice_prefix)} type="text" placeholder="ASW-" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8></div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "payments" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>9. بوابات وطرق الدفع الإلكتروني</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>تفعيل الدفع عند الاستلام، البطاقات الائتمانية، وخدمات التقسيط (تابي وتمارا).</p></div><div class="space-y-4" data-v-d3ec70a8><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>الدفع عند الاستلام (Cash On Delivery - COD)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>السماح للعميل بالدفع نقداً أو عبر جهاز الشبكة عند وصول المندوب.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).cod_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).cod_enabled = $event
				}, null, _parent));
				_push(`</div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>الدفع الإلكتروني عبر البطاقات (مدى، فيزا، ماستركارد، Apple Pay)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>تفعيل معالجة المدفوعات الفورية عبر بوابة Paymob / Moyasar.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).online_payment_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).online_payment_enabled = $event
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-d3ec70a8><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-800" data-v-d3ec70a8>تفعيل خيار تابي (Tabby) للتقسيط</span>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).tabby_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).tabby_enabled = $event
				}, null, _parent));
				_push(`</div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><span class="text-xs font-black text-slate-800" data-v-d3ec70a8>تفعيل خيار تمارا (Tamara) للتقسيط</span>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).tamara_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).tamara_enabled = $event
				}, null, _parent));
				_push(`</div></div>`);
				if (unref(settings).online_payment_enabled) _push(`<div class="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-4" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><h4 class="text-xs font-black text-indigo-900" data-v-d3ec70a8>بيانات الربط مع بوابة الدفع (Paymob Credentials)</h4><div class="flex items-center gap-2" data-v-d3ec70a8><span class="text-[11px] font-bold text-slate-500" data-v-d3ec70a8>وضع التشغيل:</span><select class="bg-white border border-indigo-200 rounded-lg px-2.5 py-1 text-xs font-black text-indigo-900" data-v-d3ec70a8><option value="sandbox" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).payment_mode) ? ssrLooseContain(unref(settings).payment_mode, "sandbox") : ssrLooseEqual(unref(settings).payment_mode, "sandbox")) ? " selected" : ""}>تجريبي (Sandbox / Test)</option><option value="live" data-v-d3ec70a8${ssrIncludeBooleanAttr(Array.isArray(unref(settings).payment_mode) ? ssrLooseContain(unref(settings).payment_mode, "live") : ssrLooseEqual(unref(settings).payment_mode, "live")) ? " selected" : ""}>مباشر حقيقي (Live / Production)</option></select></div></div><div class="space-y-3" data-v-d3ec70a8><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-indigo-950 block" data-v-d3ec70a8>Paymob API Key / Secret Key</label><input${ssrRenderAttr("value", unref(settings).paymob_api_key)} type="password" name="paymob_secret_key" autocomplete="new-password" placeholder="sec_..." dir="ltr" class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono focus:outline-none focus:border-indigo-400" data-v-d3ec70a8></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-3" data-v-d3ec70a8><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-indigo-950 block" data-v-d3ec70a8>Integration ID</label><input${ssrRenderAttr("value", unref(settings).paymob_integration_id)} type="text" placeholder="123456" dir="ltr" class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-indigo-950 block" data-v-d3ec70a8>Iframe ID</label><input${ssrRenderAttr("value", unref(settings).paymob_iframe_id)} type="text" placeholder="123456" dir="ltr" class="w-full bg-white border border-indigo-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div></div></div></div>`);
				else _push(`<!---->`);
				_push(`</div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "social" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>10. منصات التواصل وأكواد التتبع والتحليلات</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>ربط حسابات السوشيال ميديا، المحادثة الفورية، وأكواد Google Analytics و Facebook Pixel.</p></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-v-d3ec70a8><div class="space-y-3 text-start md:col-span-2 lg:col-span-3 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>تفعيل المحادثة الفورية عبر الواتساب (WhatsApp Chat Widget)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>إظهار أيقونة الدردشة المباشرة مع العملاء في واجهة المتجر.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).whatsapp_chat_enabled,
					"onUpdate:modelValue": ($event) => unref(settings).whatsapp_chat_enabled = $event
				}, null, _parent));
				_push(`</div><div class="space-y-1.5 pt-1" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رقم الواتساب للمحادثة المباشرة</label><input${ssrRenderAttr("value", unref(settings).whatsapp_number)} type="text" placeholder="+966559876543" dir="ltr" class="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono font-bold" data-v-d3ec70a8></div></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط صفحة إنستغرام (Instagram)</label><input${ssrRenderAttr("value", unref(settings).instagram_url)} type="url" placeholder="https://instagram.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط منصة إكس / تويتر (X / Twitter)</label><input${ssrRenderAttr("value", unref(settings).twitter_url)} type="url" placeholder="https://x.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط تيك توك (TikTok)</label><input${ssrRenderAttr("value", unref(settings).tiktok_url)} type="url" placeholder="https://tiktok.com/@..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط سناب شات (Snapchat)</label><input${ssrRenderAttr("value", unref(settings).snapchat_url)} type="url" placeholder="https://snapchat.com/add/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط فيسبوك (Facebook)</label><input${ssrRenderAttr("value", unref(settings).facebook_url)} type="url" placeholder="https://facebook.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رابط قناة يوتيوب (YouTube)</label><input${ssrRenderAttr("value", unref(settings).youtube_url)} type="url" placeholder="https://youtube.com/@..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="md:col-span-2 lg:col-span-3 border-t border-slate-100 pt-4" data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900 mb-1" data-v-d3ec70a8>روابط تحميل تطبيق الجوال (Mobile App Links)</h4><p class="text-[11px] text-slate-500 mb-4" data-v-d3ec70a8>عرض أزرار تحميل تطبيق المتجر في التذييل وصفحات الهبوط.</p><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-d3ec70a8><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-slate-700 block" data-v-d3ec70a8>رابط متجر آبل (Apple App Store)</label><input${ssrRenderAttr("value", unref(settings).download_app_apple_store)} type="url" placeholder="https://apps.apple.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-slate-700 block" data-v-d3ec70a8>رابط متجر جوجل (Google Play Store)</label><input${ssrRenderAttr("value", unref(settings).download_app_google_store)} type="url" placeholder="https://play.google.com/..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" data-v-d3ec70a8></div></div></div><div class="md:col-span-2 lg:col-span-3 border-t border-slate-100 pt-4" data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900 mb-1" data-v-d3ec70a8>أكواد التتبع والبيكسل الإعلاني (Tracking &amp; Pixels)</h4><p class="text-[11px] text-slate-500 mb-4" data-v-d3ec70a8>يتم حقن هذه المعرفات تلقائياً في صفحات المتجر لقياس التحويلات والمبيعات.</p><div class="grid grid-cols-1 sm:grid-cols-3 gap-4" data-v-d3ec70a8><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-slate-700 block" data-v-d3ec70a8>Google Analytics (G-XXXXX)</label><input${ssrRenderAttr("value", unref(settings).ga_tracking_id)} type="text" placeholder="G-ABC123456" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-slate-700 block" data-v-d3ec70a8>Meta Facebook Pixel ID</label><input${ssrRenderAttr("value", unref(settings).fb_pixel_id)} type="text" placeholder="123456789012345" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" data-v-d3ec70a8></div><div class="space-y-1 text-start" data-v-d3ec70a8><label class="text-[11px] font-black text-slate-700 block" data-v-d3ec70a8>TikTok Pixel ID</label><input${ssrRenderAttr("value", unref(settings).tiktok_pixel_id)} type="text" placeholder="CXXXXX..." dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs font-mono" data-v-d3ec70a8></div></div></div></div></div><div class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6 animate-in fade-in duration-200" style="${ssrRenderStyle(activeSection.value === "maintenance" ? null : { display: "none" })}" data-v-d3ec70a8><div class="border-b border-slate-100 pb-4" data-v-d3ec70a8><h2 class="text-lg font-black text-slate-900" data-v-d3ec70a8>11. حالة الصيانة والإيقاف المؤقت (Maintenance Mode)</h2><p class="text-xs text-slate-500 mt-1" data-v-d3ec70a8>إيقاف ظهور المنتجات مؤقتاً للزوار وتوجيههم لصفحة الصيانة أثناء التحديثات أو الجرد.</p></div><div class="space-y-4" data-v-d3ec70a8><div class="${ssrRenderClass([unref(settings).maintenance_mode ? "bg-rose-50 border-rose-200" : "bg-slate-50 border-slate-200/80", "p-5 rounded-2xl border transition-all"])}" data-v-d3ec70a8><div class="flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="${ssrRenderClass([unref(settings).maintenance_mode ? "text-rose-900" : "text-slate-900", "text-xs font-black"])}" data-v-d3ec70a8> تفعيل وضع الصيانة العام (Enable Maintenance Mode) </h4><p class="${ssrRenderClass([unref(settings).maintenance_mode ? "text-rose-600" : "text-slate-500", "text-[11px] mt-0.5"])}" data-v-d3ec70a8>${ssrInterpolate(unref(settings).maintenance_mode ? "المتجر متوقف حالياً عن استقبال الطلبات للزوار وتظهر صفحة الصيانة." : "المتجر متاح ونشط للزوار والعملاء.")}</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).maintenance_mode,
					"onUpdate:modelValue": ($event) => unref(settings).maintenance_mode = $event
				}, null, _parent));
				_push(`</div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between" data-v-d3ec70a8><div data-v-d3ec70a8><h4 class="text-xs font-black text-slate-900" data-v-d3ec70a8>السماح لمدراء المتجر بتجاوز الصيانة (Allow Admin Bypass)</h4><p class="text-[11px] text-slate-500 mt-0.5" data-v-d3ec70a8>تمكين المشرفين والمدراء من تصفح المتجر وإجراء الاختبارات حتى أثناء تفعيل الصيانة.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: unref(settings).allow_admin_bypass,
					"onUpdate:modelValue": ($event) => unref(settings).allow_admin_bypass = $event
				}, null, _parent));
				_push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-d3ec70a8><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>عنوان صفحة الصيانة (بالعربية)</label><input${ssrRenderAttr("value", unref(settings).maintenance_title_ar)} type="text" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Maintenance Title (English)</label><input${ssrRenderAttr("value", unref(settings).maintenance_title_en)} type="text" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-none focus:border-amber-400" data-v-d3ec70a8></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>رسالة وتفاصيل الصيانة للعملاء (عربي)</label><textarea rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 leading-relaxed" data-v-d3ec70a8>${ssrInterpolate(unref(settings).maintenance_message_ar)}</textarea></div><div class="space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>Maintenance Message (English)</label><textarea rows="3" dir="ltr" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-medium text-slate-800 focus:outline-none focus:border-amber-400 leading-relaxed" data-v-d3ec70a8>${ssrInterpolate(unref(settings).maintenance_message_en)}</textarea></div><div class="md:col-span-2 space-y-1.5 text-start" data-v-d3ec70a8><label class="text-xs font-black text-slate-800 block" data-v-d3ec70a8>الوقت والتاريخ المتوقع للعودة للعمل (Maintenance End At)</label><input${ssrRenderAttr("value", unref(settings).expected_back_date)} type="datetime-local" class="w-full sm:w-80 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer" data-v-d3ec70a8></div></div></div><!--]-->`);
			}
			_push(`</div><div class="fixed bottom-0 inset-x-0 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 z-30 sm:hidden flex items-center justify-between gap-3 shadow-2xl" data-v-d3ec70a8>`);
			if (unref(hasUnsavedChanges)) _push(`<span class="text-[11px] font-black text-amber-700" data-v-d3ec70a8>⚠️ تغييرات غير محفوظة</span>`);
			else _push(`<span class="text-[11px] font-bold text-slate-400" data-v-d3ec70a8>كافة الإعدادات محفوظة</span>`);
			_push(`<button${ssrIncludeBooleanAttr(unref(isSaving) || unref(isLoading)) ? " disabled" : ""} class="flex-1 py-3 bg-[#0B0E28] text-amber-400 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-d3ec70a8>`);
			if (unref(isSaving)) _push(`<span class="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" data-v-d3ec70a8></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-d3ec70a8>${ssrInterpolate(unref(isSaving) ? "جاري الحفظ..." : "حفظ الإعدادات")}</span></button></div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/settings/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/settings/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var settings_default = /*#__PURE__*/ _plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-d3ec70a8"]]);

export { settings_default as default };
//# sourceMappingURL=settings-BdzM7aUr.mjs.map
