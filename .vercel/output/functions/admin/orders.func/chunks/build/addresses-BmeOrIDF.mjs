import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderTeleport, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
import 'vue-router';
import '@vue/shared';
import 'unhead/utils';
import './useAuth-IbNI92RZ.mjs';

//#region pages/my-account/addresses/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.addresses")} | أسوار جدة`) });
		const addressPending = ref(true);
		const addresses = ref([]);
		const isAddModalOpen = ref(false);
		const isSubmitting = ref(false);
		const newAddr = reactive({
			contact_person_name: "",
			contact_person_number: "",
			address: "",
			city: "جدة",
			zip: "21577",
			address_type: "Home"
		});
		const getAddrTitle = (addr) => addr?.address_type || addr?.type || addr?.title || addr?.label || t("addresses.default_title");
		const getAddrContactName = (addr) => addr?.contact_person_name || addr?.contact_name || addr?.name || addr?.person_name || "—";
		const getAddrPhone = (addr) => addr?.contact_person_number || addr?.phone || addr?.mobile || addr?.contact_phone || "—";
		const getAddrText = (addr) => addr?.address || addr?.address_1 || addr?.street || addr?.city || "—";
		const isAddrDefault = (addr) => Boolean(addr?.is_default || addr?.is_billing || addr?.default);
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "account-addresses-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			_push(ssrRenderComponent(Breadcrumbs_default, null, null, _parent));
			_push(`<div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"><div><h1 class="text-2xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("account.addresses"))}</h1><p class="text-sm text-slate-500 mt-1">${ssrInterpolate(unref(t)("addresses.subtitle"))}</p></div><button class="px-6 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>${ssrInterpolate(unref(t)("addresses.add_new"))}</span></button></div>`);
			if (addressPending.value) _push(`<div class="py-12 text-center"><div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p class="text-xs font-bold text-slate-500">${ssrInterpolate(unref(t)("addresses.loading"))}</p></div>`);
			else if (addresses.value.length === 0) _push(`<div class="bg-white rounded-[2rem] p-12 text-center shadow-sm border border-slate-100/60 flex flex-col items-center"><div class="w-24 h-24 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mb-6"><svg class="w-12 h-12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div><h3 class="text-xl font-bold text-[#0B0E28] mb-2">${ssrInterpolate(unref(t)("addresses.empty_title"))}</h3><p class="text-slate-500 max-w-sm mx-auto mb-8 text-sm">${ssrInterpolate(unref(t)("addresses.empty_desc"))}</p><button class="px-8 py-3.5 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 cursor-pointer">${ssrInterpolate(unref(t)("addresses.add_first"))}</button></div>`);
			else {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><!--[-->`);
				ssrRenderList(addresses.value, (addr) => {
					_push(`<div class="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 flex flex-col justify-between relative group hover:shadow-lg transition-all"><div><div class="flex items-center justify-between gap-2 mb-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500 font-bold"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg></div><h3 class="font-bold text-lg text-[#0B0E28]">${ssrInterpolate(getAddrTitle(addr))}</h3></div>`);
					if (isAddrDefault(addr)) _push(`<span class="px-3 py-1 rounded-full bg-amber-50 text-amber-600 border border-amber-200 text-xs font-bold">${ssrInterpolate(unref(t)("addresses.default_badge"))}</span>`);
					else _push(`<!---->`);
					_push(`</div><div class="space-y-2 text-slate-600 text-sm mb-6"><p class="font-medium flex items-center gap-2"><svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg><span>${ssrInterpolate(getAddrContactName(addr))}</span></p><p class="font-medium flex items-center gap-2"><svg class="w-4 h-4 text-slate-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg><span dir="ltr" class="text-start">${ssrInterpolate(getAddrPhone(addr))}</span></p><p class="font-medium flex items-start gap-2 pt-1"><svg class="w-4 h-4 text-slate-400 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg><span>${ssrInterpolate(getAddrText(addr))}</span></p></div></div><div class="pt-4 border-t border-slate-100 flex items-center justify-end gap-3"><button class="px-4 py-2 rounded-xl text-rose-500 hover:bg-rose-50 font-bold text-xs transition-colors cursor-pointer">${ssrInterpolate(unref(t)("common.delete"))}</button></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</main></div></div>`);
			ssrRenderTeleport(_push, (_push) => {
				if (isAddModalOpen.value) _push(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0E28]/60 backdrop-blur-sm"${ssrRenderAttr("dir", unref(layoutDirection))}><div class="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6"><div class="flex items-center justify-between border-b border-slate-100 pb-4"><h3 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("addresses.modal_title"))}</h3><button class="text-slate-400 hover:text-slate-600">✕</button></div><form class="space-y-4"><div class="space-y-1"><label class="text-xs font-bold text-slate-700">${ssrInterpolate(unref(t)("addresses.recipient_name"))}</label><input type="text"${ssrRenderAttr("value", newAddr.contact_person_name)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm"${ssrRenderAttr("placeholder", unref(t)("addresses.recipient_name"))}></div><div class="space-y-1"><label class="text-xs font-bold text-slate-700">${ssrInterpolate(unref(t)("addresses.phone"))}</label><input type="tel"${ssrRenderAttr("value", newAddr.contact_person_number)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="05xxxxxxxx" dir="ltr"></div><div class="space-y-1"><label class="text-xs font-bold text-slate-700">${ssrInterpolate(unref(t)("addresses.detailed"))}</label><textarea required rows="3" class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm"${ssrRenderAttr("placeholder", unref(t)("addresses.detailed"))}>${ssrInterpolate(newAddr.address)}</textarea></div><div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100"><button type="button" class="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600">${ssrInterpolate(unref(t)("common.cancel"))}</button><button type="submit"${ssrIncludeBooleanAttr(isSubmitting.value) ? " disabled" : ""} class="px-8 py-2.5 rounded-xl bg-[#0B0E28] text-amber-400 font-bold text-xs shadow-md disabled:opacity-50"><span>${ssrInterpolate(isSubmitting.value ? unref(t)("addresses.saving") : unref(t)("addresses.save"))}</span></button></div></form></div></div>`);
				else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/my-account/addresses/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/addresses/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var addresses_default = index_vue_vue_type_script_setup_true_lang_default;

export { addresses_default as default };
//# sourceMappingURL=addresses-BmeOrIDF.mjs.map
