import { j as useRoute, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAuth } from './useAuth-IbNI92RZ.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderClass } from 'vue/server-renderer';

//#region components/account/SidebarNav.vue?vue&type=script&setup=true&lang.ts
var SidebarNav_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SidebarNav",
	__ssrInlineRender: true,
	setup(__props) {
		const route = useRoute();
		const { user, userName, userEmail} = useAuth();
		const { t, layoutDirection } = useLanguage();
		const imgError = ref(false);
		const userInitial = computed(() => {
			return (userName?.value || user.value?.f_name || user.value?.name || "م").charAt(0).toUpperCase();
		});
		const userAvatarUrl = computed(() => {
			const u = user.value;
			const raw = u?.image_full_url?.path || u?.image_full_url || u?.image || u?.avatar || u?.profile_image;
			if (!raw) return null;
			let str = typeof raw === "object" && raw?.path ? raw.path : String(raw);
			if (!str || typeof str !== "string" || !str.trim()) return null;
			if (str.startsWith("blob:") || str.startsWith("data:")) return str;
			let clean = str.replace(/(https?:\/\/)|(\/+)/g, (match, protocol) => {
				return protocol ? protocol : "/";
			});
			if (clean.startsWith("http://") || clean.startsWith("https://")) return clean;
			return `https://wedgetstore.com/${clean.replace(/^\/+/, "")}`;
		});
		watch(userAvatarUrl, () => {
			imgError.value = false;
		}, { immediate: true });
		const navItems = computed(() => [
			{
				id: "overview",
				label: t("account.overview"),
				path: "/my-account",
				icon: "<path d=\"M3 3h7v7H3z\"></path><path d=\"M14 3h7v7h-7z\"></path><path d=\"M14 14h7v7h-7z\"></path><path d=\"M3 14h7v7H3z\"></path>"
			},
			{
				id: "orders",
				label: t("account.orders"),
				path: "/my-account/orders",
				icon: "<circle cx=\"9\" cy=\"21\" r=\"1\"></circle><circle cx=\"20\" cy=\"21\" r=\"1\"></circle><path d=\"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6\"></path>"
			},
			{
				id: "coupons",
				label: t("account.coupons"),
				path: "/my-account/coupons",
				icon: "<path d=\"M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z\"></path><line x1=\"7\" y1=\"7\" x2=\"7.01\" y2=\"7\"></line>"
			},
			{
				id: "details",
				label: t("account.details"),
				path: "/my-account/details",
				icon: "<path d=\"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2\"></path><circle cx=\"12\" cy=\"7\" r=\"4\"></circle>"
			},
			{
				id: "addresses",
				label: t("account.addresses"),
				path: "/my-account/addresses",
				icon: "<path d=\"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle>"
			},
			{
				id: "wishlist",
				label: t("account.wishlist"),
				path: "/my-account/wishlist",
				icon: "<path d=\"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z\"></path>"
			},
			{
				id: "compare",
				label: t("account.compare"),
				path: "/my-account/compare",
				icon: "<path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\"></path><polyline points=\"15 3 21 3 21 9\"></polyline><line x1=\"10\" y1=\"14\" x2=\"21\" y2=\"3\"></line>"
			}
		]);
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<aside${ssrRenderAttrs(mergeProps({
				class: "w-full lg:w-[320px] flex-shrink-0",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 sticky top-10"><div class="flex flex-col items-center text-center pb-8 border-b border-slate-100 mb-6"><div class="relative mb-4"><div class="w-24 h-24 rounded-full bg-gradient-to-tr from-[#0B0E28] to-slate-800 p-1"><div class="w-full h-full rounded-full bg-white flex items-center justify-center text-3xl font-black text-[#0B0E28] overflow-hidden">`);
			if (userAvatarUrl.value && !imgError.value) _push(`<img${ssrRenderAttr("src", userAvatarUrl.value)} class="w-full h-full object-cover rounded-full" alt="Avatar">`);
			else _push(`<span>${ssrInterpolate(userInitial.value)}</span>`);
			_push(`</div></div><div class="absolute bottom-0 end-0 bg-amber-400 text-slate-900 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border-2 border-white shadow-sm">${ssrInterpolate(unref(t)("account.customer"))}</div></div><h2 class="text-xl font-black text-[#0B0E28] mb-1">${ssrInterpolate(unref(userName))}</h2><p class="text-slate-500 text-xs sm:text-sm dir-ltr">${ssrInterpolate(unref(userEmail))}</p></div><nav class="flex flex-col gap-2"><!--[-->`);
			ssrRenderList(navItems.value, (item) => {
				_push(ssrRenderComponent(_component_NuxtLink, {
					key: item.id,
					to: item.path,
					class: ["flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 relative group cursor-pointer", unref(route).path === item.path ? "bg-slate-50 text-[#0B0E28]" : "text-slate-500 hover:bg-slate-50 hover:text-[#0B0E28]"]
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="${ssrRenderClass([unref(route).path === item.path ? "opacity-100" : "opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-50", "absolute start-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-e-full bg-amber-500 transition-all duration-300"])}"${_scopeId}></div><div class="${ssrRenderClass([unref(route).path === item.path ? "bg-white shadow-sm text-amber-500" : "bg-transparent text-slate-400 group-hover:bg-white group-hover:text-amber-500", "w-10 h-10 rounded-xl flex items-center justify-center transition-colors"])}"${_scopeId}><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}>${item.icon ?? ""}</svg></div><span class="${ssrRenderClass([unref(route).path === item.path ? "text-[#0B0E28]" : "", "font-bold text-sm"])}"${_scopeId}>${ssrInterpolate(item.label)}</span>`);
						else return [
							createVNode("div", { class: ["absolute start-0 top-1/2 -translate-y-1/2 w-1.5 h-8 rounded-e-full bg-amber-500 transition-all duration-300", unref(route).path === item.path ? "opacity-100" : "opacity-0 scale-y-0 group-hover:scale-y-50 group-hover:opacity-50"] }, null, 2),
							createVNode("div", { class: ["w-10 h-10 rounded-xl flex items-center justify-center transition-colors", unref(route).path === item.path ? "bg-white shadow-sm text-amber-500" : "bg-transparent text-slate-400 group-hover:bg-white group-hover:text-amber-500"] }, [(openBlock(), createBlock("svg", {
								innerHTML: item.icon,
								class: "w-5 h-5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"stroke-linecap": "round",
								"stroke-linejoin": "round"
							}, null, 8, ["innerHTML"]))], 2),
							createVNode("span", { class: ["font-bold text-sm", unref(route).path === item.path ? "text-[#0B0E28]" : ""] }, toDisplayString(item.label), 3)
						];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></nav><div class="mt-8 pt-6 border-t border-slate-100"><button class="flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 w-full text-rose-500 hover:bg-rose-50 group cursor-pointer"><div class="w-10 h-10 rounded-xl bg-rose-50 group-hover:bg-white flex items-center justify-center transition-colors"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div><span class="font-bold text-sm">${ssrInterpolate(unref(t)("account.logout"))}</span></button></div></div></aside>`);
		};
	}
});
//#endregion
//#region components/account/SidebarNav.vue
var _sfc_setup = SidebarNav_vue_vue_type_script_setup_true_lang_default.setup;
SidebarNav_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/SidebarNav.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SidebarNav_default = Object.assign(SidebarNav_vue_vue_type_script_setup_true_lang_default, { __name: "AccountSidebarNav" });

export { SidebarNav_default as S };
//# sourceMappingURL=SidebarNav-CktF21h6.mjs.map
