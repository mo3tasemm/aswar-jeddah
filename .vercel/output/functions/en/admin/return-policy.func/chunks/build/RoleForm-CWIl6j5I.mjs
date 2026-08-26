import { N as NuxtLink } from '../virtual/entry.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { u as useAdminRolesAndAdmins } from './useAdminRolesAndAdmins-DKcWDju0.mjs';
import { defineComponent, reactive, watch, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';

//#region components/dashboard/RoleForm.vue?vue&type=script&setup=true&lang.ts
var RoleForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RoleForm",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEdit: { type: Boolean },
		roleId: {}
	},
	setup(__props) {
		const props = __props;
		useRouter();
		useRoute();
		const { availableModules, isSavingRole, validationErrors, errorMessage} = useAdminRolesAndAdmins();
		const form = reactive({
			name: props.initialData?.name || "",
			modules: [...props.initialData?.modules || []],
			status: props.initialData?.status !== 0 && props.initialData?.status !== false
		});
		function populateForm(data) {
			if (!data) return;
			form.name = data.name || "";
			form.modules = [...data.modules || []];
			form.status = data.status !== 0 && data.status !== false;
		}
		watch(() => props.initialData, (newVal) => {
			if (newVal) populateForm(newVal);
		}, { immediate: true });
		const isModuleSelected = (key) => {
			return form.modules.includes(key);
		};
		const getFieldError = (field) => {
			if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) return validationErrors.value[field][0];
			return "";
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6 pb-24 lg:pb-6 relative max-w-[1100px] mx-auto" }, _attrs))}><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/roles",
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
			_push(`<div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(__props.isEdit ? "تعديل الدور الوظيفي والصلاحيات" : "إضافة دور وظيفي جديد")}</h1><p class="text-xs text-slate-500 mt-1 font-medium">حدد اسم الدور ومصفوفة الصلاحيات المسموح بها للمشرفين التابعين له.</p></div></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/roles",
				class: "px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` إلغاء `);
					else return [createTextVNode(" إلغاء ")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="submit"${ssrIncludeBooleanAttr(unref(isSavingRole)) ? " disabled" : ""} class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">`);
			if (unref(isSavingRole)) _push(`<svg class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(__props.isEdit ? "حفظ التعديلات" : "إنشاء الدور")}</span></button></div></div>`);
			if (unref(errorMessage)) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(errorMessage))}</span></div></div>`);
			else _push(`<!---->`);
			if (__props.isEdit && __props.initialData?.admins_count && __props.initialData.admins_count > 0) {
				_push(`<div class="p-4 bg-amber-50/80 border border-amber-200/80 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-2xs"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-2xl bg-amber-400 text-[#0B0E28] flex items-center justify-center shrink-0 shadow-2xs"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg></div><div><h4 class="text-xs font-black text-amber-950"> هذا الدور مرتبط حالياً بـ <span class="text-amber-800 underline font-mono font-black">${ssrInterpolate(__props.initialData.admins_count)}</span> مشرفين </h4><p class="text-[11px] text-amber-800 font-medium mt-0.5"> إذا كنت تخطط لحذف هذا الدور لاحقاً، يرجى أولاً نقل المشرفين المرتبطين به إلى دور وظيفي آخر (Reassign Admins). </p></div></div>`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/admin/staff?role_id=${__props.initialData.id}`,
					class: "px-4 py-2 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black shrink-0 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<span${_scopeId}>عرض ونقل المشرفين</span><svg class="w-3.5 h-3.5 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"${_scopeId}></path></svg>`);
						else return [createVNode("span", null, "عرض ونقل المشرفين"), (openBlock(), createBlock("svg", {
							class: "w-3.5 h-3.5 rtl:rotate-180",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M9 5l7 7-7 7"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h2 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>البيانات الأساسية للدور</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"><div><label class="block text-xs font-black text-slate-800 mb-1.5"> اسم الدور الوظيفي (Role Name) * </label><input${ssrRenderAttr("value", form.name)} type="text" placeholder="مثال: مدير المنتجات، مسؤول خدمة العملاء، محاسب..." class="${ssrRenderClass([getFieldError("name") ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
			if (getFieldError("name")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("name"))}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex items-center justify-between p-3.5 rounded-2xl border border-slate-100 bg-slate-50"><div><span class="text-xs font-black text-slate-800 block">حالة تفعيل الدور</span><span class="text-[11px] text-slate-400 font-medium">الأدوار المعطلة تمنع المشرفين من الوصول</span></div>`);
			_push(ssrRenderComponent(BaseToggle_default, {
				modelValue: form.status,
				"onUpdate:modelValue": ($event) => form.status = $event
			}, null, _parent));
			_push(`</div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3"><div><h2 class="text-sm font-black text-slate-900 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>مصفوفة الصلاحيات والأقسام المسموحة (Module Permissions) *</span></h2><p class="text-[11px] text-slate-400 font-medium mt-0.5">اختر الأقسام التي يحق للمشرفين التابعين لهذا الدور الوصول إليها.</p></div><div class="flex items-center gap-2"><button type="button" class="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"> تحديد الكل (Select All) </button><button type="button" class="text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors cursor-pointer"> إلغاء التحديد </button></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-2"><!--[-->`);
			ssrRenderList(unref(availableModules), (mod) => {
				_push(`<label class="${ssrRenderClass([isModuleSelected(mod.key) ? "border-amber-400 bg-amber-50/40 shadow-2xs" : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50", "flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none"])}"><input type="checkbox"${ssrRenderAttr("value", mod.key)}${ssrIncludeBooleanAttr(isModuleSelected(mod.key)) ? " checked" : ""} class="mt-1 rounded border-slate-300 text-amber-500 focus:ring-amber-400 h-4 w-4 cursor-pointer"><div class="flex-1"><div class="text-xs font-black text-slate-900 flex items-center justify-between"><span>${ssrInterpolate(mod.nameAr)}</span><span class="text-[10px] font-bold text-slate-400 font-mono" dir="ltr">${ssrInterpolate(mod.key)}</span></div>`);
				if (mod.description) _push(`<p class="text-[11px] text-slate-500 mt-1 font-medium leading-relaxed">${ssrInterpolate(mod.description)}</p>`);
				else _push(`<!---->`);
				_push(`</div></label>`);
			});
			_push(`<!--]--></div>`);
			if (getFieldError("modules")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("modules"))}</span>`);
			else _push(`<!---->`);
			_push(`</div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/RoleForm.vue
var _sfc_setup = RoleForm_vue_vue_type_script_setup_true_lang_default.setup;
RoleForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/RoleForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RoleForm_default = Object.assign(RoleForm_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardRoleForm" });

export { RoleForm_default as R };
//# sourceMappingURL=RoleForm-CWIl6j5I.mjs.map
