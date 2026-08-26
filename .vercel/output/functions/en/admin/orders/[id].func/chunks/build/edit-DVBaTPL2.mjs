import { _ as __exportAll } from './rolldown-runtime-D7D4PA-g.mjs';
import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { u as useAdminRolesAndAdmins } from './useAdminRolesAndAdmins-DKcWDju0.mjs';
import { defineComponent, computed, ref, reactive, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';
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
import 'unhead/utils';

//#region pages/admin/staff/[id]/edit.vue?vue&type=script&setup=true&lang.ts
var edit_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "edit",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "تعديل بيانات المشرف | لوحة التحكم" });
		const route = useRoute();
		const { roles} = useAdminRolesAndAdmins();
		const adminId = computed(() => route.params.id);
		const isEnglish = computed(() => route.path.startsWith("/en") || route.path.includes("/en/admin"));
		const backRoute = computed(() => isEnglish.value ? "/en/admin/admins" : "/admin/admins");
		const isLoading = ref(true);
		const isSubmitting = ref(false);
		const adminFound = ref(false);
		const formError = ref("");
		const form = reactive({
			name: "",
			email: "",
			phone: "",
			password: "",
			admin_role_id: "",
			status: true
		});
		const errors = reactive({
			name: "",
			email: "",
			phone: "",
			password: "",
			admin_role_id: ""
		});
		const selectedRole = computed(() => {
			if (!form.admin_role_id || !roles.value) return null;
			return roles.value.find((r) => String(r.id) === String(form.admin_role_id)) || null;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "max-w-[1200px] mx-auto space-y-6 pb-24 lg:pb-6" }, _attrs))}><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: backRoute.value,
				class: "w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-colors shadow-2xs cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 rtl:-scale-x-100",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M15 19l-7-7 7-7"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`<div><h1 class="text-2xl font-black text-slate-900"> تعديل بيانات المشرف </h1><p class="text-xs text-slate-500 mt-1 font-medium"> تعديل الحساب وتعيين الدور الوظيفي وحالة التفعيل للمشرف #${ssrInterpolate(adminId.value)}. </p></div></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: backRoute.value,
				class: "px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` إلغاء `);
					else return [createTextVNode(" إلغاء ")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="button"${ssrIncludeBooleanAttr(isSubmitting.value || isLoading.value) ? " disabled" : ""} class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">`);
			if (isSubmitting.value) _push(`<svg class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>حفظ التغييرات</span></button></div></div>`);
			if (isLoading.value) _push(`<div class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400 bg-white rounded-3xl border border-slate-100 shadow-sm"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold text-slate-600">جاري جلب وتعبئة بيانات المشرف...</span></div>`);
			else if (!adminFound.value) {
				_push(`<div class="bg-white p-12 rounded-3xl text-center space-y-4 border border-slate-100 shadow-sm"><div class="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><h3 class="text-base font-black text-slate-800">تعذر العثور على بيانات المشرف (#${ssrInterpolate(adminId.value)})</h3><p class="text-xs text-slate-400 max-w-sm mx-auto">تأكد من صحة معرف المشرف وحاول مجدداً أو عد لقائمة المشرفين.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: backRoute.value,
					class: "inline-block px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs rounded-xl cursor-pointer shadow-sm transition-all"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` العودة لقائمة المشرفين `);
						else return [createTextVNode(" العودة لقائمة المشرفين ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<form class="space-y-6">`);
				if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(formError.value)}</span></div></div>`);
				else _push(`<!---->`);
				_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>البيانات الأساسية للمشرف</span></h2><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-xs font-black text-slate-800 mb-1.5">الاسم الكامل *</label><input${ssrRenderAttr("value", form.name)} type="text" placeholder="مثال: أحمد محمد" class="${ssrRenderClass([errors.name ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
				if (errors.name) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(errors.name)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div><label class="block text-xs font-black text-slate-800 mb-1.5">البريد الإلكتروني *</label><input${ssrRenderAttr("value", form.email)} type="email" dir="ltr" placeholder="ahmed@aswar.com" class="${ssrRenderClass([errors.email ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
				if (errors.email) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(errors.email)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="md:col-span-2"><label class="block text-xs font-black text-slate-800 mb-1.5">رقم الهاتف *</label><input${ssrRenderAttr("value", form.phone)} type="tel" dir="ltr" placeholder="0501234567" class="${ssrRenderClass([errors.phone ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
				if (errors.phone) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(errors.phone)}</span>`);
				else _push(`<!---->`);
				_push(`</div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>الأمان وتعديل كلمة المرور</span></h2><div class="grid grid-cols-1 gap-4"><div><label class="block text-xs font-black text-slate-800 mb-1.5"> كلمة المرور الجديدة (اتركها فارغة إذا لم ترغب في تغييرها) </label><input${ssrRenderAttr("value", form.password)} type="password" dir="ltr" placeholder="اتركه فارغاً للإبقاء على كلمة المرور الحالية" class="w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400" minlength="6">`);
				if (errors.password) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(errors.password)}</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50"><div><h4 class="font-black text-xs text-slate-800">حالة الحساب</h4><p class="text-[11px] text-slate-400 mt-0.5">تعطيل الحساب سيمنع المشرف من تسجيل الدخول للوحة التحكم فوراً.</p></div>`);
				_push(ssrRenderComponent(BaseToggle_default, {
					modelValue: form.status,
					"onUpdate:modelValue": ($event) => form.status = $event
				}, null, _parent));
				_push(`</div></div></div></div><div class="space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>الدور الوظيفي والصلاحيات</span></h2><div><label class="block text-xs font-black text-slate-800 mb-1.5">تحديد الدور الوظيفي *</label><select class="${ssrRenderClass([errors.admin_role_id ? "border-rose-400 bg-rose-50/50" : "border-slate-200", "w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"])}" required><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.admin_role_id) ? ssrLooseContain(form.admin_role_id, "") : ssrLooseEqual(form.admin_role_id, "")) ? " selected" : ""}>اختر الدور الوظيفي...</option><!--[-->`);
				ssrRenderList(unref(roles) || [], (r) => {
					_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(form.admin_role_id) ? ssrLooseContain(form.admin_role_id, r.id) : ssrLooseEqual(form.admin_role_id, r.id)) ? " selected" : ""}>${ssrInterpolate(r.name)} ${ssrInterpolate(r.modules ? `(${r.modules.length} صلاحيات)` : "")}</option>`);
				});
				_push(`<!--]--></select>`);
				if (errors.admin_role_id) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(errors.admin_role_id)}</span>`);
				else _push(`<!---->`);
				_push(`</div>`);
				if (selectedRole.value) {
					_push(`<div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2"><div class="text-xs font-black text-amber-900 flex items-center justify-between"><span>صلاحيات هذا الدور:</span><span class="text-[10px] font-bold font-mono">${ssrInterpolate(selectedRole.value.modules?.length || 0)} أقسام</span></div><div class="flex flex-wrap gap-1 pt-1"><!--[-->`);
					ssrRenderList(selectedRole.value.modules || [], (m) => {
						_push(`<span class="px-2 py-0.5 bg-white text-amber-900 border border-amber-200 rounded-md text-[10px] font-bold">${ssrInterpolate(m)}</span>`);
					});
					_push(`<!--]--></div></div>`);
				} else _push(`<!---->`);
				_push(`</div></div></div></form>`);
			}
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/staff/[id]/edit.vue
var edit_exports = /* @__PURE__ */ __exportAll({ default: () => edit_default });
var _sfc_setup = edit_vue_vue_type_script_setup_true_lang_default.setup;
edit_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/staff/[id]/edit.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var edit_default = edit_vue_vue_type_script_setup_true_lang_default;

export { edit_exports as n, edit_default as t };
//# sourceMappingURL=edit-DVBaTPL2.mjs.map
