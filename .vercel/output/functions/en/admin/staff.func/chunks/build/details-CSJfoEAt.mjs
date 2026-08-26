import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useAuth } from './useAuth-IbNI92RZ.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { S as StoreLocationShowcase_default } from './StoreLocationShowcase-C7JtXjFz.mjs';
import { S as SidebarNav_default } from './SidebarNav-CktF21h6.mjs';
import { defineComponent, computed, mergeProps, unref, ref, reactive, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport } from 'vue/server-renderer';
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

//#region components/account/ProfileForm.vue?vue&type=script&setup=true&lang.ts
var ProfileForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProfileForm",
	__ssrInlineRender: true,
	setup(__props) {
		const { user, userName} = useAuth();
		const { t, layoutDirection } = useLanguage();
		const isEditing = ref(false);
		const isSaving = ref(false);
		const isDeleting = ref(false);
		const isDeleteModalOpen = ref(false);
		const imgError = ref(false);
		ref(null);
		const avatarPreview = ref(null);
		const formData = reactive({
			f_name: "",
			l_name: "",
			email: "",
			phone: "",
			password: "",
			confirm_password: ""
		});
		const populateFormFromUser = () => {
			if (user.value) {
				formData.f_name = user.value.f_name || "";
				formData.l_name = user.value.l_name || "";
				formData.email = user.value.email || "";
				formData.phone = user.value.phone || "";
				formData.password = "";
				formData.confirm_password = "";
			}
		};
		watch(user, () => {
			populateFormFromUser();
		}, { immediate: true });
		const userInitial = computed(() => {
			return (userName?.value || user.value?.f_name || user.value?.name || "م").charAt(0).toUpperCase();
		});
		const fullNameDisplay = computed(() => {
			if (user.value?.f_name || user.value?.l_name) return `${user.value.f_name || ""} ${user.value.l_name || ""}`.trim();
			return user.value?.name || userName.value || "عميل أسوار جدة";
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
		const effectiveAvatarUrl = computed(() => {
			return avatarPreview.value || userAvatarUrl.value;
		});
		watch(userAvatarUrl, () => {
			imgError.value = false;
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden flex flex-col relative",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 p-6 sm:p-10 border-b border-slate-100 bg-white"><div class="flex flex-col sm:flex-row items-center gap-6"><div class="relative shrink-0 group"><div class="w-28 h-28 sm:w-32 sm:h-32 rounded-full aspect-square shrink-0 bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative">`);
			if (effectiveAvatarUrl.value && !imgError.value) _push(`<img${ssrRenderAttr("src", effectiveAvatarUrl.value)} class="w-full h-full object-cover object-center rounded-full" alt="User Avatar">`);
			else _push(`<span class="text-4xl font-black text-[#0B0E28]">${ssrInterpolate(userInitial.value)}</span>`);
			if (isEditing.value) _push(`<div class="absolute inset-0 bg-[#0B0E28]/60 rounded-full flex items-center justify-center transition-opacity cursor-pointer backdrop-blur-xs"><svg class="w-8 h-8 text-amber-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg><input type="file" class="absolute inset-0 opacity-0 cursor-pointer rounded-full z-10" accept="image/*"></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (isEditing.value) _push(`<div class="absolute bottom-1 start-1 w-9 h-9 aspect-square bg-amber-400 text-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-md pointer-events-none z-20"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="text-center sm:text-start space-y-1.5 sm:mt-2"><h2 class="text-2xl sm:text-3xl font-black text-[#0B0E28]">${ssrInterpolate(fullNameDisplay.value)}</h2><p class="text-slate-500 text-xs sm:text-sm">${ssrInterpolate(unref(t)("account.manage_profile"))}</p></div></div><div class="shrink-0 w-full sm:w-auto flex justify-center"><button type="button" class="${ssrRenderClass([isEditing.value ? "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300" : "bg-[#0B0E28] text-amber-400 hover:bg-[#161c47]", "w-full sm:w-auto px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"])}">`);
			if (!isEditing.value) _push(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>`);
			else _push(`<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`);
			_push(`<span>${ssrInterpolate(isEditing.value ? unref(t)("account.cancel_edit") : unref(t)("account.edit_profile"))}</span></button></div></div><div class="p-6 sm:p-10 space-y-10"><section><div class="flex items-center gap-3 mb-6"><div class="w-1.5 h-6 bg-amber-400 rounded-full"></div><h3 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("account.details"))}</h3></div>`);
			if (isEditing.value) _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">${ssrInterpolate(unref(t)("auth.first_name"))}</label><input type="text"${ssrRenderAttr("value", formData.f_name)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"${ssrRenderAttr("placeholder", unref(t)("auth.first_name"))}></div><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">${ssrInterpolate(unref(t)("auth.last_name"))}</label><input type="text"${ssrRenderAttr("value", formData.l_name)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all"${ssrRenderAttr("placeholder", unref(t)("auth.last_name"))}></div><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">${ssrInterpolate(unref(t)("auth.phone_placeholder"))}</label><input type="tel"${ssrRenderAttr("value", formData.phone)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="05XXXXXXXX" dir="ltr"></div><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">${ssrInterpolate(unref(t)("auth.email_label"))}</label><input type="email"${ssrRenderAttr("value", formData.email)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="example@domain.com" dir="ltr"></div><div class="space-y-2 md:col-span-2 pt-4 border-t border-slate-100 mt-2"><h4 class="text-sm font-black text-[#0B0E28] flex items-center gap-2"><svg class="w-4 h-4 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg> تغيير كلمة المرور (اختياري) </h4><p class="text-xs text-slate-400">اترك هذه الحقول فارغة إذا كنت تريد الإبقاء على كلمة المرور الحالية بدون تغيير.</p></div><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">كلمة المرور الجديدة</label><input type="password"${ssrRenderAttr("value", formData.password)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="كلمة المرور الجديدة (اختياري)" dir="ltr"></div><div class="space-y-2"><label class="text-xs sm:text-sm font-bold text-slate-700">تأكيد كلمة المرور الجديدة</label><input type="password"${ssrRenderAttr("value", formData.confirm_password)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="تأكيد كلمة المرور الجديدة" dir="ltr"></div></div>`);
			else _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"><div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1"><span class="text-xs font-semibold text-slate-400 block">${ssrInterpolate(unref(t)("auth.first_name"))}</span><p class="text-base font-bold text-[#0B0E28]">${ssrInterpolate(unref(user)?.f_name || "—")}</p></div><div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1"><span class="text-xs font-semibold text-slate-400 block">${ssrInterpolate(unref(t)("auth.last_name"))}</span><p class="text-base font-bold text-[#0B0E28]">${ssrInterpolate(unref(user)?.l_name || "—")}</p></div><div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1"><span class="text-xs font-semibold text-slate-400 block">${ssrInterpolate(unref(t)("auth.phone_placeholder"))}</span><p class="text-base font-bold text-[#0B0E28] dir-ltr text-start">${ssrInterpolate(unref(user)?.phone || "—")}</p></div><div class="p-5 rounded-2xl bg-slate-50/70 border border-slate-100/80 space-y-1"><span class="text-xs font-semibold text-slate-400 block">${ssrInterpolate(unref(t)("auth.email_label"))}</span><p class="text-base font-bold text-[#0B0E28] dir-ltr text-start">${ssrInterpolate(unref(user)?.email || "—")}</p></div></div>`);
			_push(`</section><section class="pt-6 border-t border-slate-100"><div class="p-6 sm:p-8 rounded-2xl bg-rose-50/40 border border-rose-100/80 flex flex-col sm:flex-row items-center justify-between gap-6"><div class="space-y-1 text-center sm:text-start"><h4 class="text-base font-black text-rose-700">حذف الحساب</h4><p class="text-xs text-rose-600/80 max-w-md">بمجرد حذف حسابك، سيتم مسح كافة سجلاتك وعناوينك المحفوظة نهائياً من المتجر.</p></div><button type="button" class="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors shrink-0 cursor-pointer"> حذف الحساب نهائياً </button></div></section></div>`);
			if (isEditing.value) {
				_push(`<div class="sticky bottom-0 start-0 end-0 bg-white border-t border-slate-100 p-6 flex items-center justify-end gap-4 shadow-[0_-10px_30px_rgb(0,0,0,0.04)] z-30 rounded-b-[2rem]"><button type="button" class="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer">${ssrInterpolate(unref(t)("account.cancel_edit"))}</button><button${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="px-8 py-3 rounded-xl text-xs sm:text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-lg shadow-[#0B0E28]/20 flex items-center justify-center gap-2 min-w-[150px] cursor-pointer disabled:opacity-50">`);
				if (isSaving.value) _push(`<svg class="animate-spin h-4 w-4 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
				else _push(`<span>${ssrInterpolate(unref(t)("account.save_changes"))}</span>`);
				_push(`</button></div>`);
			} else _push(`<!---->`);
			ssrRenderTeleport(_push, (_push) => {
				if (isDeleteModalOpen.value) {
					_push(`<div class="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-[#0B0E28]/60 backdrop-blur-sm"${ssrRenderAttr("dir", unref(layoutDirection))}><div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center space-y-5"><div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto text-2xl shadow-inner"><svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg></div><div class="space-y-2"><h3 class="text-xl font-black text-[#0B0E28]">تأكيد حذف الحساب نهائياً</h3><p class="text-xs sm:text-sm text-slate-500 leading-relaxed"> تحذير: هذا الإجراء سيقوم بمحو كافة بياناتك الشخصية، العناوين، وسجل طلباتك نهائياً من المتجر ولا يمكن استعادتها لاحقاً. </p></div><div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3"><button class="w-full sm:flex-1 py-3.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer">${ssrInterpolate(unref(t)("common.cancel"))}</button><button${ssrIncludeBooleanAttr(isDeleting.value) ? " disabled" : ""} class="w-full sm:flex-1 py-3.5 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
					if (isDeleting.value) _push(`<svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
					else _push(`<!---->`);
					_push(`<span>${ssrInterpolate(isDeleting.value ? unref(t)("common.loading") : "نعم، قم بالحذف")}</span></button></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/account/ProfileForm.vue
var _sfc_setup$1 = ProfileForm_vue_vue_type_script_setup_true_lang_default.setup;
ProfileForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/ProfileForm.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var ProfileForm_default = Object.assign(ProfileForm_vue_vue_type_script_setup_true_lang_default, { __name: "AccountProfileForm" });
//#endregion
//#region pages/my-account/details/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection } = useLanguage();
		useHead$1({ title: computed(() => `${t("account.details")} | أسوار جدة`) });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "account-details-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">`);
			_push(ssrRenderComponent(Breadcrumbs_default, null, null, _parent));
			_push(`<div class="flex flex-col lg:flex-row gap-10">`);
			_push(ssrRenderComponent(SidebarNav_default, null, null, _parent));
			_push(`<main class="flex-1 min-w-0">`);
			_push(ssrRenderComponent(ProfileForm_default, null, null, _parent));
			_push(`</main></div></div><section class="w-full bg-white border-t border-slate-200 mt-12">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section><section class="w-full bg-[#F8F9FA]">`);
			_push(ssrRenderComponent(StoreLocationShowcase_default, null, null, _parent));
			_push(`</section></div>`);
		};
	}
});
//#endregion
//#region pages/my-account/details/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/my-account/details/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var details_default = index_vue_vue_type_script_setup_true_lang_default;

export { details_default as default };
//# sourceMappingURL=details-CSJfoEAt.mjs.map
