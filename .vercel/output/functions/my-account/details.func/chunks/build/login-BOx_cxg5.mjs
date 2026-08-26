import { _ as _plugin_vue_export_helper_default, j as useRoute, f as useAdminAuth, n as navigateTo, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderDynamicModel, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region pages/admin/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "تسجيل دخول المسؤولين | أسوار جدة" });
		const route = useRoute();
		const { isRtl } = useLanguage();
		const { isAdminLoggedIn } = useAdminAuth();
		if (isAdminLoggedIn.value) {
			const target = route.query.redirect || "/admin";
			navigateTo(target);
		}
		const email = ref("");
		const password = ref("");
		const showPassword = ref(false);
		const isSubmitting = ref(false);
		const emailError = ref("");
		const passwordError = ref("");
		const errorMessage = ref("");
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen w-full bg-[#F8F9FA] text-slate-900 flex items-center justify-center p-4 font-sans selection:bg-amber-400 selection:text-slate-950 relative overflow-hidden",
				dir: unref(isRtl) ? "rtl" : "ltr"
			}, _attrs))} data-v-552101ab><div class="h-1.5 bg-gradient-to-r from-[#0B0E28] via-amber-400 to-[#0B0E28] w-full fixed top-0 left-0 right-0 z-30" data-v-552101ab></div><div class="w-full max-w-md mx-auto flex flex-col items-center justify-center relative z-10 py-6" data-v-552101ab><div class="w-full bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(11,14,40,0.06)] border border-slate-100 space-y-6 relative overflow-hidden" data-v-552101ab><div class="absolute -top-12 start-1/2 -translate-x-1/2 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" data-v-552101ab></div><div class="text-center space-y-2 relative z-10" data-v-552101ab>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "inline-block mb-1 transition-transform hover:scale-105"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة - Aswar Jeddah" class="h-11 sm:h-12 mx-auto object-contain" data-v-552101ab${_scopeId}>`);
					else return [createVNode("img", {
						src: Logo_default,
						alt: "أسوار جدة - Aswar Jeddah",
						class: "h-11 sm:h-12 mx-auto object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<h1 class="text-xl sm:text-2xl font-black text-[#0B0E28] tracking-tight" data-v-552101ab>${ssrInterpolate(unref(isRtl) ? "لوحة تحكم المسؤولين" : "Admin Control Panel")}</h1><p class="text-xs text-slate-500 font-medium" data-v-552101ab>${ssrInterpolate(unref(isRtl) ? "بوابة الإدارة المركزية للمتجر" : "Central Store Management Gateway")}</p></div><form class="space-y-4 relative z-10" novalidate data-v-552101ab>`);
			if (errorMessage.value) _push(`<div class="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2.5 animate-shake" data-v-552101ab><svg class="w-4 h-4 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-552101ab><circle cx="12" cy="12" r="10" data-v-552101ab></circle><line x1="12" y1="8" x2="12" y2="12" data-v-552101ab></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-552101ab></line></svg><span data-v-552101ab>${ssrInterpolate(errorMessage.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="space-y-1.5 text-start" data-v-552101ab><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-552101ab>${ssrInterpolate(unref(isRtl) ? "البريد الإلكتروني للمسؤول" : "Admin Email Address")} <span class="text-rose-500 ms-0.5" data-v-552101ab>*</span></label><div class="relative" data-v-552101ab><input type="email"${ssrRenderAttr("value", email.value)} class="${ssrRenderClass([emailError.value ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20" : "border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20", "w-full bg-slate-50 border rounded-xl px-4 py-3 pe-12 text-sm text-[#0B0E28] placeholder-slate-400 font-medium focus:outline-none transition-all"])}" placeholder="admin@aswarjeddah.com" dir="ltr" data-v-552101ab><div class="absolute inset-y-0 end-0 pe-4 flex items-center pointer-events-none text-slate-400" data-v-552101ab><svg class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-v-552101ab><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" data-v-552101ab></path><polyline points="22,6 12,13 2,6" data-v-552101ab></polyline></svg></div></div>`);
			if (emailError.value) _push(`<p class="text-[11px] font-bold text-rose-500 mt-1" data-v-552101ab>${ssrInterpolate(emailError.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div><div class="space-y-1.5 text-start" data-v-552101ab><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-552101ab>${ssrInterpolate(unref(isRtl) ? "كلمة المرور" : "Password")} <span class="text-rose-500 ms-0.5" data-v-552101ab>*</span></label><div class="relative" data-v-552101ab><input${ssrRenderAttr("type", showPassword.value ? "text" : "password")}${ssrRenderDynamicModel(showPassword.value ? "text" : "password", password.value, null)} class="${ssrRenderClass([passwordError.value ? "border-rose-500 focus:ring-2 focus:ring-rose-500/20" : "border-slate-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20", "w-full bg-slate-50 border rounded-xl px-4 py-3 pe-11 text-sm text-[#0B0E28] placeholder-slate-400 font-medium focus:outline-none transition-all"])}" placeholder="••••••••••••" dir="ltr" data-v-552101ab><button type="button" class="absolute inset-y-0 end-0 pe-3.5 flex items-center text-slate-400 hover:text-[#0B0E28] transition-colors cursor-pointer" tabindex="-1" data-v-552101ab>`);
			if (showPassword.value) _push(`<svg class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-552101ab><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" data-v-552101ab></path><circle cx="12" cy="12" r="3" data-v-552101ab></circle></svg>`);
			else _push(`<svg class="w-8 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-552101ab><line x1="1" y1="1" x2="23" y2="23" data-v-552101ab></line><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" data-v-552101ab></path></svg>`);
			_push(`</button></div>`);
			if (passwordError.value) _push(`<p class="text-[11px] font-bold text-rose-500 mt-1" data-v-552101ab>${ssrInterpolate(passwordError.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-3" data-v-552101ab>`);
			if (isSubmitting.value) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-552101ab></span>`);
			else if (unref(isRtl)) _push(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-552101ab><line x1="5" y1="12" x2="19" y2="12" data-v-552101ab></line><polyline points="12 5 19 12 12 19" data-v-552101ab></polyline></svg>`);
			else _push(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-552101ab><line x1="5" y1="12" x2="19" y2="12" data-v-552101ab></line><polyline points="12 5 19 12 12 19" data-v-552101ab></polyline></svg>`);
			_push(`<span data-v-552101ab>${ssrInterpolate(isSubmitting.value ? unref(isRtl) ? "جاري المصادقة والدخول..." : "Authenticating..." : unref(isRtl) ? "تسجيل الدخول كمسؤول" : "Login as Admin")}</span></button></form></div><footer class="mt-6 text-center text-xs text-slate-500 font-bold space-y-1" data-v-552101ab><p data-v-552101ab>${ssrInterpolate(unref(isRtl) ? "أسوار جدة © 2026 — جميع الحقوق محفوظة" : "Aswar Jeddah © 2026 — All Rights Reserved")}</p>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "inline-flex items-center gap-1 text-[#0B0E28] hover:text-amber-600 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						if (unref(isRtl)) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-552101ab${_scopeId}><line x1="19" y1="12" x2="5" y2="12" data-v-552101ab${_scopeId}></line><polyline points="12 19 5 12 12 5" data-v-552101ab${_scopeId}></polyline></svg>`);
						else _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-552101ab${_scopeId}><line x1="5" y1="12" x2="19" y2="12" data-v-552101ab${_scopeId}></line><polyline points="12 19 5 12 12 19" data-v-552101ab${_scopeId}></polyline></svg>`);
						_push(`<span data-v-552101ab${_scopeId}>${ssrInterpolate(unref(isRtl) ? "العودة للمتجر الرئيسي" : "Return to Main Store")}</span>`);
					} else return [unref(isRtl) ? (openBlock(), createBlock("svg", {
						key: 0,
						class: "w-3.5 h-3.5",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2.5"
					}, [createVNode("line", {
						x1: "19",
						y1: "12",
						x2: "5",
						y2: "12"
					}), createVNode("polyline", { points: "12 19 5 12 12 5" })])) : (openBlock(), createBlock("svg", {
						key: 1,
						class: "w-3.5 h-3.5",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2.5"
					}, [createVNode("line", {
						x1: "5",
						y1: "12",
						x2: "19",
						y2: "12"
					}), createVNode("polyline", { points: "12 19 5 12 12 19" })])), createVNode("span", null, toDisplayString(unref(isRtl) ? "العودة للمتجر الرئيسي" : "Return to Main Store"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</footer></div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = /*#__PURE__*/ _plugin_vue_export_helper_default(login_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-552101ab"]]);

export { login_default as default };
//# sourceMappingURL=login-BOx_cxg5.mjs.map
