import { j as useRoute, n as navigateTo, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAuth } from './useAuth-IbNI92RZ.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';
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

//#region pages/login.vue?vue&type=script&setup=true&lang.ts
var login_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "login",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => t("auth.login_register_title")) });
		const { isLoggedIn } = useAuth();
		const route = useRoute();
		const targetPath = computed(() => {
			const q = route.query.redirect;
			return q ? decodeURIComponent(q) : "/my-account";
		});
		if (isLoggedIn.value) navigateTo(targetPath.value);
		const isRightPanelActive = ref(false);
		const loginPending = ref(false);
		const loginError = ref(null);
		const registerPending = ref(false);
		const registerError = ref(null);
		const signInForm = reactive({
			email: "",
			password: ""
		});
		const signUpForm = reactive({
			f_name: "",
			l_name: "",
			email: "",
			phone: "",
			password: ""
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "login-page-wrapper selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><section class="auth-section flex-col"><div class="md:hidden flex w-full max-w-sm mx-auto mb-6 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden"><button class="${ssrRenderClass([!isRightPanelActive.value ? "bg-[#0B0E28] text-white" : "text-slate-500 hover:bg-slate-50", "flex-1 py-3 text-sm font-bold transition-colors cursor-pointer"])}">${ssrInterpolate(unref(t)("auth.login_tab"))}</button><button class="${ssrRenderClass([isRightPanelActive.value ? "bg-[#0B0E28] text-white" : "text-slate-500 hover:bg-slate-50", "flex-1 py-3 text-sm font-bold transition-colors cursor-pointer"])}">${ssrInterpolate(unref(t)("auth.register_tab"))}</button></div><div class="${ssrRenderClass([{ "right-panel-active": isRightPanelActive.value }, "container"])}" id="container" dir="ltr"><div class="form-container sign-up-container"${ssrRenderAttr("dir", unref(layoutDirection))}><form><h1 class="title">${ssrInterpolate(unref(t)("auth.create_account"))}</h1><div class="social-container"><a href="#" class="social" title="Google"><svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg></a><a href="#" class="social" title="Apple"><svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg></a></div><span>${ssrInterpolate(unref(t)("auth.or_register_with"))}</span>`);
			if (registerError.value) _push(`<div class="w-full my-2 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">${ssrInterpolate(registerError.value)}</div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-2 gap-2 w-full"><input type="text"${ssrRenderAttr("placeholder", unref(t)("auth.first_name"))}${ssrRenderAttr("value", signUpForm.f_name)} required><input type="text"${ssrRenderAttr("placeholder", unref(t)("auth.last_name"))}${ssrRenderAttr("value", signUpForm.l_name)} required></div><input type="email"${ssrRenderAttr("placeholder", unref(t)("auth.email_placeholder"))}${ssrRenderAttr("value", signUpForm.email)} required><input type="tel"${ssrRenderAttr("placeholder", unref(t)("auth.phone_placeholder"))}${ssrRenderAttr("value", signUpForm.phone)} required dir="ltr" class="text-start"><input type="password"${ssrRenderAttr("placeholder", unref(t)("auth.password_placeholder"))}${ssrRenderAttr("value", signUpForm.password)} required minlength="6"><button type="submit"${ssrIncludeBooleanAttr(registerPending.value) ? " disabled" : ""} class="btn-primary flex items-center justify-center gap-2">`);
			if (registerPending.value) _push(`<svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(registerPending.value ? unref(t)("auth.creating_account") : unref(t)("auth.create_account_btn"))}</span></button></form></div><div class="form-container sign-in-container"${ssrRenderAttr("dir", unref(layoutDirection))}><form><h1 class="title">${ssrInterpolate(unref(t)("auth.login_title"))}</h1><div class="social-container"><a href="#" class="social" title="Google"><svg viewBox="0 0 24 24" class="w-4 h-4"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path></svg></a><a href="#" class="social" title="Apple"><svg viewBox="0 0 384 512" class="w-4 h-4 fill-slate-800"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></path></svg></a></div><span>${ssrInterpolate(unref(t)("auth.or_login_with"))}</span>`);
			if (loginError.value) _push(`<div class="w-full my-2 p-2.5 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-bold text-center">${ssrInterpolate(loginError.value)}</div>`);
			else _push(`<!---->`);
			_push(`<input type="text"${ssrRenderAttr("placeholder", unref(t)("auth.email_or_phone_placeholder"))}${ssrRenderAttr("value", signInForm.email)} required><input type="password"${ssrRenderAttr("placeholder", unref(t)("auth.password_label"))}${ssrRenderAttr("value", signInForm.password)} required>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/forgot-password",
				class: "forgot-link text-xs font-bold text-slate-700 hover:text-amber-600 my-2 transition-colors"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("auth.forgot_password"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("auth.forgot_password")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<button type="submit"${ssrIncludeBooleanAttr(loginPending.value) ? " disabled" : ""} class="btn-primary flex items-center justify-center gap-2">`);
			if (loginPending.value) _push(`<svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(loginPending.value ? unref(t)("auth.logging_in") : unref(t)("auth.login_btn"))}</span></button></form></div><div class="overlay-container hidden md:block" style="${ssrRenderStyle({ "z-index": "100" })}"${ssrRenderAttr("dir", unref(layoutDirection))}><div class="overlay"><div class="overlay-panel overlay-left"><img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة" class="overlay-logo"><h1>${ssrInterpolate(unref(t)("auth.welcome_back_title"))}</h1><p>${ssrInterpolate(unref(t)("auth.welcome_back_desc"))}</p><button class="ghost cursor-pointer" id="signIn">${ssrInterpolate(unref(t)("auth.login_tab"))}</button></div><div class="overlay-panel overlay-right"><img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة" class="overlay-logo"><h1>${ssrInterpolate(unref(t)("auth.welcome_new_title"))}</h1><p>${ssrInterpolate(unref(t)("auth.welcome_new_desc"))}</p><button class="ghost cursor-pointer" id="signUp">${ssrInterpolate(unref(t)("auth.register_now"))}</button></div></div></div></div></section><section class="w-full bg-white border-t border-slate-200">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section><section class="w-full bg-slate-50">`);
			_push(ssrRenderComponent(StoreLocationShowcase_default, null, null, _parent));
			_push(`</section></div>`);
		};
	}
});
//#endregion
//#region pages/login.vue
var _sfc_setup = login_vue_vue_type_script_setup_true_lang_default.setup;
login_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var login_default = login_vue_vue_type_script_setup_true_lang_default;

export { login_default as default };
//# sourceMappingURL=login-z0N9CZRz.mjs.map
