import { _ as __exportAll } from './rolldown-runtime-D7D4PA-g.mjs';
import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { u as useAdminRolesAndAdmins } from './useAdminRolesAndAdmins-DKcWDju0.mjs';
import { defineComponent, ref, mergeProps, withCtx, openBlock, createBlock, createVNode, isRef, unref, createTextVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
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

//#region pages/admin/staff/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "إدارة المشرفين والصلاحيات | لوحة التحكم" });
		useRoute();
		const { admins, roles, isLoadingAdmins, isUpdatingStatus, isDeletingAdmin, searchAdminQuery, roleFilter, statusFilter, errorMessage, fetchAdmins, toggleAdminStatus} = useAdminRolesAndAdmins();
		const adminToDelete = ref(null);
		let searchDebounce = null;
		const handleSearch = () => {
			clearTimeout(searchDebounce);
			searchDebounce = setTimeout(() => {
				fetchAdmins(1);
			}, 350);
		};
		const handleToggleStatus = async (admin) => {
			await toggleAdminStatus(admin);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><h1 class="text-2xl font-black text-slate-900">إدارة المشرفين والصلاحيات (Staff &amp; Admins)</h1><p class="text-xs text-slate-500 mt-1 font-medium">إدارة حسابات مدراء النظام وتعيين الأدوار والصلاحيات والتحكم بحالة التفعيل.</p></div><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/staff/create",
				class: "px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 font-black text-xs rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"${_scopeId}></path></svg><span${_scopeId}>إضافة مشرف جديد</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
					})])), createVNode("span", null, "إضافة مشرف جديد")];
				}),
				_: 1
			}, _parent));
			_push(`</div></div><div class="flex items-center gap-2 border-b border-slate-200">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/staff",
				class: "px-4 py-2.5 text-xs font-black text-amber-600 border-b-2 border-amber-500 transition-all flex items-center gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"${_scopeId}></path></svg><span${_scopeId}>المشرفون (Staff / Admins)</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					})])), createVNode("span", null, "المشرفون (Staff / Admins)")];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/roles",
				class: "px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-900 border-b-2 border-transparent hover:border-slate-300 transition-all flex items-center gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"${_scopeId}></path></svg><span${_scopeId}>الأدوار والصلاحيات (Roles)</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
					})])), createVNode("span", null, "الأدوار والصلاحيات (Roles)")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4"><div class="w-full md:w-80">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: unref(searchAdminQuery),
				"onUpdate:modelValue": ($event) => isRef(searchAdminQuery) ? searchAdminQuery.value = $event : null,
				onInput: handleSearch,
				placeholder: "البحث بالاسم، البريد، أو الهاتف...",
				class: "w-full"
			}, {
				icon: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 text-slate-400",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto"><div class="w-full sm:w-44"><label class="block text-[11px] font-black text-slate-500 mb-1">الدور الوظيفي</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), "") : ssrLooseEqual(unref(roleFilter), "")) ? " selected" : ""}>كافة الأدوار</option><!--[-->`);
			ssrRenderList(unref(roles), (r) => {
				_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(roleFilter)) ? ssrLooseContain(unref(roleFilter), r.id) : ssrLooseEqual(unref(roleFilter), r.id)) ? " selected" : ""}>${ssrInterpolate(r.name)}</option>`);
			});
			_push(`<!--]--></select></div><div class="w-full sm:w-40"><label class="block text-[11px] font-black text-slate-500 mb-1">حالة الحساب</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400 cursor-pointer"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "") : ssrLooseEqual(unref(statusFilter), "")) ? " selected" : ""}>كافة الحالات</option><option value="1"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "1") : ssrLooseEqual(unref(statusFilter), "1")) ? " selected" : ""}>حسابات نشطة (Active)</option><option value="0"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "0") : ssrLooseEqual(unref(statusFilter), "0")) ? " selected" : ""}>حسابات معطلة (Inactive)</option></select></div>`);
			if (unref(searchAdminQuery) || unref(roleFilter) || unref(statusFilter) !== "") _push(`<div class="self-end pb-0.5"><button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer" title="إعادة تعيين الفلاتر"> إعادة تعيين </button></div>`);
			else _push(`<!---->`);
			_push(`</div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div><button class="underline hover:text-rose-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">`);
			if (unref(isLoadingAdmins)) _push(`<div class="p-12 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">جاري تحميل قائمة المشرفين...</span></div>`);
			else if (!unref(admins) || unref(admins).length === 0) {
				_push(`<div class="p-16 text-center space-y-3"><div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto"><svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div><h3 class="text-base font-black text-slate-700">لم يتم العثور على مشرفين</h3><p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">جرب تغيير معايير البحث أو أضف مشرفاً جديداً.</p>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: "/admin/staff/create",
					class: "inline-block px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(` إضافة مشرف جديد `);
						else return [createTextVNode(" إضافة مشرف جديد ")];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100"><tr><th class="px-6 py-4 font-bold text-start">المشرف (Admin)</th><th class="px-6 py-4 font-bold text-start">معلومات التواصل</th><th class="px-6 py-4 font-bold text-start">الدور الوظيفي (Role)</th><th class="px-6 py-4 font-bold text-center">حالة الحساب</th><th class="px-6 py-4 font-bold text-center">الإجراءات</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(unref(admins), (admin) => {
					_push(`<tr class="hover:bg-slate-50/80 transition-colors group"><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 border border-amber-200/60 flex items-center justify-center font-black text-sm shrink-0 overflow-hidden shadow-2xs">`);
					if (admin.image_url) _push(`<img${ssrRenderAttr("src", admin.image_url)}${ssrRenderAttr("alt", admin.name)} class="w-full h-full object-cover">`);
					else _push(`<span>${ssrInterpolate(admin.name.charAt(0))}</span>`);
					_push(`</div><div><span class="font-black text-slate-900 text-xs block">${ssrInterpolate(admin.name)}</span><span class="text-[10px] text-slate-400 font-mono">ID: #${ssrInterpolate(admin.id)}</span></div></div></td><td class="px-6 py-4 text-xs font-bold"><div class="text-slate-800 font-mono flex items-center gap-1.5" dir="ltr"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg><span>${ssrInterpolate(admin.email || "-")}</span></div>`);
					if (admin.phone) _push(`<div class="text-slate-500 font-mono text-[11px] mt-0.5 flex items-center gap-1.5" dir="ltr"><svg class="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg><span>${ssrInterpolate(admin.phone)}</span></div>`);
					else _push(`<!---->`);
					_push(`</td><td class="px-6 py-4"><span class="px-3 py-1 bg-amber-50 text-amber-900 border border-amber-200/80 rounded-xl text-xs font-black inline-flex items-center gap-1.5 shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span><span>${ssrInterpolate(admin.role_name || (admin.role ? admin.role.name : "مشرف"))}</span></span></td><td class="px-6 py-4 text-center"><div class="flex flex-col items-center justify-center gap-1">`);
					_push(ssrRenderComponent(BaseToggle_default, {
						"model-value": admin.status === 1 || admin.status === true,
						"onUpdate:modelValue": ($event) => handleToggleStatus(admin),
						disabled: unref(isUpdatingStatus) || admin.id === 1
					}, null, _parent));
					_push(`<span class="${ssrRenderClass([admin.status === 1 || admin.status === true ? "text-emerald-700" : "text-slate-400", "text-[10px] font-black"])}">${ssrInterpolate(admin.status === 1 || admin.status === true ? "نشط (Active)" : "معطل (Inactive)")}</span></div></td><td class="px-6 py-4 text-center"><div class="flex items-center justify-center gap-1.5">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/staff/${admin.id}/edit`,
						class: "p-2 text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 rounded-xl transition-all shadow-2xs cursor-pointer",
						title: "تعديل بيانات المشرف"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"${_scopeId}></path></svg>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
							})]))];
						}),
						_: 2
					}, _parent));
					_push(`<button${ssrIncludeBooleanAttr(admin.id === 1 || String(admin.role_name).toLowerCase().includes("super")) ? " disabled" : ""} class="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer disabled:opacity-20 disabled:cursor-not-allowed" title="حذف المشرف"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div>`);
			}
			_push(`</div>`);
			if (adminToDelete.value) _push(`<div class="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"><div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 text-center space-y-4 animate-in fade-in zoom-in-95 duration-150"><div class="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto"><svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></div><div><h4 class="text-base font-black text-slate-900">تأكيد حذف المشرف</h4><p class="text-xs text-slate-500 mt-1">هل أنت متأكد من رغبتك في حذف حساب المشرف &quot;${ssrInterpolate(adminToDelete.value.name)}&quot;؟</p></div><div class="flex items-center gap-2 pt-2"><button class="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"> إلغاء </button><button${ssrIncludeBooleanAttr(unref(isDeletingAdmin)) ? " disabled" : ""} class="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black transition-colors shadow-sm disabled:opacity-50 cursor-pointer">${ssrInterpolate(unref(isDeletingAdmin) ? "جاري الحذف..." : "نعم، احذف")}</button></div></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/staff/index.vue
var staff_exports = /* @__PURE__ */ __exportAll({ default: () => staff_default });
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/staff/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var staff_default = index_vue_vue_type_script_setup_true_lang_default;

export { staff_exports as n, staff_default as t };
//# sourceMappingURL=staff-Cc5ca9qR.mjs.map
