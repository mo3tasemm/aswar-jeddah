import { b as useAdminLanguage, f as useAdminAuth, k as useAdminPermissions, N as NuxtLink } from '../virtual/entry.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { T as TheToast_default } from './TheToast-zsI2cH7U.mjs';
import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

//#region components/dashboard/AdminLanguageSwitcher.vue?vue&type=script&setup=true&lang.ts
var AdminLanguageSwitcher_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminLanguageSwitcher",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminLanguage} = useAdminLanguage();
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<button${ssrRenderAttrs(mergeProps({
				type: "button",
				class: "flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 border shadow-sm cursor-pointer select-none bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200",
				title: unref(adminLanguage) === "ar" ? "Switch to English" : "التحويل إلى العربية"
			}, _attrs))}><svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(adminLanguage) === "ar" ? "English" : "عربي")}</span></button>`);
		};
	}
});
//#endregion
//#region components/dashboard/AdminLanguageSwitcher.vue
var _sfc_setup$1 = AdminLanguageSwitcher_vue_vue_type_script_setup_true_lang_default.setup;
AdminLanguageSwitcher_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/AdminLanguageSwitcher.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AdminLanguageSwitcher_default = Object.assign(AdminLanguageSwitcher_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardAdminLanguageSwitcher" });
//#endregion
//#region layouts/dashboard.vue?vue&type=script&setup=true&lang.ts
var dashboard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "dashboard",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const isMobileMenuOpen = ref(false);
		const { t, adminDir } = useAdminLanguage();
		const { adminUser} = useAdminAuth();
		const { canAccessRoute, isSuperAdmin } = useAdminPermissions();
		watch(() => route.path, () => {
			isMobileMenuOpen.value = false;
		});
		const isLinkActive = (targetPath) => {
			const current = route.path.replace(/\/$/, "");
			const target = targetPath.replace(/\/$/, "");
			if (target === "/admin") return current === "/admin";
			return current === target || current.startsWith(`${target}/`);
		};
		const adminRoleTitle = computed(() => {
			if (isSuperAdmin.value) return "مدير عام النظام (Super Admin)";
			return adminUser.value?.role_name || adminUser.value?.role?.name || "مشرف";
		});
		const allNavLinks = computed(() => [
			{
				to: "/admin",
				label: t("admin.sidebar.dashboard"),
				exact: true,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\" /></svg>"
			},
			{
				to: "/admin/analytics",
				label: t("admin.sidebar.analytics"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z\" /></svg>"
			},
			{
				to: "/admin/products",
				label: t("admin.sidebar.products"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4\" /></svg>"
			},
			{
				to: "/admin/categories",
				label: t("admin.sidebar.categories"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\" /></svg>"
			},
			{
				to: "/admin/brands",
				label: t("admin.sidebar.brands"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z\" /></svg>"
			},
			{
				to: "/admin/colors",
				label: t("admin.sidebar.colors"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7\" /></svg>"
			},
			{
				to: "/admin/attributes",
				label: t("admin.sidebar.attributes"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01\" /></svg>"
			},
			{
				to: "/admin/orders",
				label: t("admin.sidebar.orders"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z\" /></svg>"
			},
			{
				to: "/admin/customers",
				label: t("admin.sidebar.customers"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z\" /></svg>"
			},
			{
				to: "/admin/coupons",
				label: t("admin.sidebar.coupons"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z\" /></svg>"
			},
			{
				to: "/admin/settings",
				label: t("admin.sidebar.settings"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z\" /><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 12a3 3 0 11-6 0 3 3 0 016 0z\" /></svg>"
			},
			{
				to: "/admin/staff",
				label: t("admin.sidebar.staff"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z\" /></svg>"
			},
			{
				to: "/admin/storefront",
				label: t("admin.sidebar.storefront"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z\" /></svg>"
			},
			{
				to: "/admin/navbar",
				label: t("admin.sidebar.navbar"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 6h16M4 12h16M4 18h7\" /></svg>"
			},
			{
				to: "/admin/about-us",
				label: t("admin.sidebar.about_us"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>"
			},
			{
				to: "/admin/return-policy",
				label: t("admin.sidebar.return_policy"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 15v-1a4 4 0 00-4-4H4m0 0l4-4m-4 4l4 4m6 4v1a3 3 0 003 3h3a3 3 0 003-3V7a3 3 0 00-3-3h-3a3 3 0 00-3 3v1\" /></svg>"
			},
			{
				to: "/admin/privacy-policy",
				label: t("admin.sidebar.privacy_policy"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z\" /></svg>"
			},
			{
				to: "/admin/contact-messages",
				label: t("admin.sidebar.contact_messages"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\" /></svg>"
			},
			{
				to: "/admin/contact-settings",
				label: t("admin.sidebar.contact_settings"),
				exact: false,
				icon: "<svg fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z\" /></svg>"
			}
		]);
		const allowedNavLinks = computed(() => {
			return allNavLinks.value.filter((link) => canAccessRoute(link.to));
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen flex bg-slate-50 font-sans",
				dir: unref(adminDir)
			}, _attrs))}>`);
			if (isMobileMenuOpen.value) _push(`<div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 md:hidden"></div>`);
			else _push(`<!---->`);
			_push(`<aside class="${ssrRenderClass([[unref(adminDir) === "rtl" ? "right-0" : "left-0", isMobileMenuOpen.value ? "translate-x-0" : unref(adminDir) === "rtl" ? "translate-x-full" : "-translate-x-full"], "fixed top-0 bottom-0 z-50 w-64 bg-white shadow-2xl transition-transform duration-300 ease-in-out md:hidden flex flex-col"])}"><div class="h-16 flex items-center justify-between px-6 border-b border-slate-100">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "flex items-center gap-3",
				onClick: ($event) => isMobileMenuOpen.value = false
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="Aswar Logo" class="w-24 h-24 object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: Logo_default,
						alt: "Aswar Logo",
						class: "w-24 h-24 object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<button class="p-1 text-slate-400 hover:text-slate-600 rounded-lg"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1"><!--[-->`);
			ssrRenderList(allowedNavLinks.value, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.to,
					to: link.to,
					onClick: ($event) => isMobileMenuOpen.value = false,
					class: ["flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all", isLinkActive(link.to) ? "bg-amber-400 text-slate-950 shadow-sm font-black" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span class="${ssrRenderClass([isLinkActive(link.to) ? "text-slate-950" : "text-slate-400", "w-5 h-5 shrink-0"])}"${_scopeId}>${link.icon ?? ""}</span><span class="truncate"${_scopeId}>${ssrInterpolate(link.label)}</span>`);
						else return [createVNode("span", {
							innerHTML: link.icon,
							class: ["w-5 h-5 shrink-0", isLinkActive(link.to) ? "text-slate-950" : "text-slate-400"]
						}, null, 10, ["innerHTML"]), createVNode("span", { class: "truncate" }, toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav>`);
			if (unref(adminUser)) _push(`<div class="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center gap-3"><div class="w-9 h-9 rounded-xl bg-amber-400 text-[#0B0E28] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">${ssrInterpolate((unref(adminUser).name || "A").charAt(0))}</div><div class="min-w-0 flex-1"><span class="text-xs font-black text-slate-900 truncate block">${ssrInterpolate(unref(adminUser).name || "المشرف")}</span><span class="text-[10px] font-bold text-amber-700 block truncate">${ssrInterpolate(adminRoleTitle.value)}</span></div></div>`);
			else _push(`<!---->`);
			_push(`</aside><aside class="${ssrRenderClass([unref(adminDir) === "rtl" ? "border-l border-slate-200" : "border-r border-slate-200", "w-64 bg-white hidden md:flex flex-col shrink-0"])}"><div class="h-16 flex items-center px-6 border-b border-slate-100">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin",
				class: "flex items-center gap-3"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="Aswar Logo" class="w-24 h-24 object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: Logo_default,
						alt: "Aswar Logo",
						class: "w-24 h-24 object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><nav class="flex-1 overflow-y-auto py-4 px-3 space-y-1"><!--[-->`);
			ssrRenderList(allowedNavLinks.value, (link) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: link.to,
					to: link.to,
					class: ["flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all", isLinkActive(link.to) ? "bg-amber-400 text-slate-950 shadow-sm font-black" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span class="${ssrRenderClass([isLinkActive(link.to) ? "text-slate-950" : "text-slate-400", "w-5 h-5 shrink-0"])}"${_scopeId}>${link.icon ?? ""}</span><span class="truncate"${_scopeId}>${ssrInterpolate(link.label)}</span>`);
						else return [createVNode("span", {
							innerHTML: link.icon,
							class: ["w-5 h-5 shrink-0", isLinkActive(link.to) ? "text-slate-950" : "text-slate-400"]
						}, null, 10, ["innerHTML"]), createVNode("span", { class: "truncate" }, toDisplayString(link.label), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav>`);
			if (unref(adminUser)) _push(`<div class="p-4 border-t border-slate-100 bg-slate-50/60 flex items-center justify-between gap-3"><div class="flex items-center gap-2.5 min-w-0"><div class="w-9 h-9 rounded-xl bg-amber-400 text-[#0B0E28] font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">${ssrInterpolate((unref(adminUser).name || "A").charAt(0))}</div><div class="min-w-0"><span class="text-xs font-black text-slate-900 truncate block">${ssrInterpolate(unref(adminUser).name || "المشرف")}</span><span class="text-[10px] font-bold text-amber-700 block truncate">${ssrInterpolate(adminRoleTitle.value)}</span></div></div><button class="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer" title="تسجيل الخروج"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg></button></div>`);
			else _push(`<!---->`);
			_push(`</aside><main class="flex-1 flex flex-col min-w-0 relative"><header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-30"><button class="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" title="القائمة"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button><div class="flex-1"></div><div class="flex items-center gap-3 sm:gap-4">`);
			_push(ssrRenderComponent(AdminLanguageSwitcher_default, null, null, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "text-sm font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-2 bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("admin.sidebar.view_store"))} <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"${_scopeId}></path></svg>`);
					else return [createTextVNode(toDisplayString(unref(t)("admin.sidebar.view_store")) + " ", 1), (openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex items-center gap-2"><div class="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold shadow-sm"><i class="fa-solid fa-user-shield text-sm"></i></div></div></div></header><div class="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">`);
			ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
			_push(`</div></main>`);
			_push(ssrRenderComponent(TheToast_default, null, null, _parent));
			_push(`<div id="modals"></div></div>`);
		};
	}
});
//#endregion
//#region layouts/dashboard.vue
var _sfc_setup = dashboard_vue_vue_type_script_setup_true_lang_default.setup;
dashboard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/dashboard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var dashboard_default = dashboard_vue_vue_type_script_setup_true_lang_default;

export { dashboard_default as default };
//# sourceMappingURL=dashboard-BrE8_bQc.mjs.map
