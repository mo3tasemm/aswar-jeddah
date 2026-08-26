import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region pages/forgot-password.vue?vue&type=script&setup=true&lang.ts
var forgot_password_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "forgot-password",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, localePath } = useLanguage();
		const resetEmail = ref("");
		const isLoading = ref(false);
		useHead$1({ title: computed(() => `${t("auth.forgot_password_title")} | أسوار جدة`) });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "forgot-page-wrapper selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="card-container"><div class="logo-wrapper">`);
			_push(ssrRenderComponent(_component_NuxtLink, { to: unref(localePath)("/") }, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار جدة" class="store-logo object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: Logo_default,
						alt: "أسوار جدة",
						class: "store-logo object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="header-text"><h1 class="title">${ssrInterpolate(unref(t)("auth.forgot_password_title"))}</h1><p class="subtitle">${ssrInterpolate(unref(t)("auth.forgot_password_desc"))}</p></div><form class="reset-form"><div class="input-group"><label for="email" class="input-label text-start">${ssrInterpolate(unref(t)("auth.email_label"))}</label><input id="email" type="email"${ssrRenderAttr("placeholder", unref(t)("auth.email_placeholder"))}${ssrRenderAttr("value", resetEmail.value)} class="form-input" required></div><button type="submit"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="btn-primary">`);
			if (!isLoading.value) _push(`<span>${ssrInterpolate(unref(t)("auth.send_reset_link"))}</span>`);
			else _push(`<span class="flex items-center justify-center gap-2"><svg class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg><span>${ssrInterpolate(unref(t)("auth.sending"))}</span></span>`);
			_push(`</button></form><div class="card-footer">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/login"),
				class: "back-link flex items-center justify-center gap-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("auth.back_to_login"))}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4 rtl:-scale-x-100",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M10 19l-7-7m0 0l7-7m-7 7h18"
					})])), createVNode("span", null, toDisplayString(unref(t)("auth.back_to_login")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region pages/forgot-password.vue
var _sfc_setup = forgot_password_vue_vue_type_script_setup_true_lang_default.setup;
forgot_password_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/forgot-password.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var forgot_password_default = forgot_password_vue_vue_type_script_setup_true_lang_default;

export { forgot_password_default as default };
//# sourceMappingURL=forgot-password-D3H79O-0.mjs.map
