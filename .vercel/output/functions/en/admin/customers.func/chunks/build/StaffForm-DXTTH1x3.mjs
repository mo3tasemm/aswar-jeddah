import { N as NuxtLink } from '../virtual/entry.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { u as useAdminRolesAndAdmins } from './useAdminRolesAndAdmins-DKcWDju0.mjs';
import { defineComponent, computed, reactive, watch, mergeProps, withCtx, openBlock, createBlock, createVNode, createTextVNode, unref, useSSRContext } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';

//#region components/dashboard/StaffForm.vue?vue&type=script&setup=true&lang.ts
var StaffForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StaffForm",
	__ssrInlineRender: true,
	props: { initialData: {} },
	setup(__props) {
		const props = __props;
		useRouter();
		useRoute();
		const isEdit = computed(() => !!props.initialData);
		const { roles, isSavingAdmin, validationErrors} = useAdminRolesAndAdmins();
		const form = reactive({
			name: props.initialData?.name || "",
			email: props.initialData?.email || "",
			phone: props.initialData?.phone || "",
			password: "",
			admin_role_id: props.initialData?.admin_role_id || props.initialData?.role_id || "",
			status: props.initialData?.status !== 0 && props.initialData?.status !== false
		});
		function populateForm(data) {
			if (!data) return;
			form.name = data.name || "";
			form.email = data.email || "";
			form.phone = data.phone || "";
			form.password = "";
			form.admin_role_id = data.admin_role_id || data.role_id || "";
			form.status = data.status !== 0 && data.status !== false;
		}
		watch(() => props.initialData, (newVal) => {
			if (newVal) populateForm(newVal);
		}, { immediate: true });
		const selectedRole = computed(() => {
			if (!form.admin_role_id || !roles.value) return null;
			return roles.value.find((r) => String(r.id) === String(form.admin_role_id)) || null;
		});
		const getFieldError = (field) => {
			if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) return validationErrors.value[field][0];
			return "";
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6 pb-24 lg:pb-6 relative max-w-[1200px] mx-auto" }, _attrs))}><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/staff",
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
			_push(`<div><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(isEdit.value ? "تعديل بيانات المشرف" : "إضافة مشرف جديد")}</h1><p class="text-xs text-slate-500 mt-1 font-medium">قم بتعبئة بيانات المشرف وتحديد الدور الوظيفي للتحكم بالصلاحيات.</p></div></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/staff",
				class: "px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` إلغاء `);
					else return [createTextVNode(" إلغاء ")];
				}),
				_: 1
			}, _parent));
			_push(`<button type="submit" class="px-6 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-amber-400 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"${ssrIncludeBooleanAttr(unref(isSavingAdmin)) ? " disabled" : ""}>`);
			if (unref(isSavingAdmin)) _push(`<svg class="w-4 h-4 animate-spin text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(isEdit.value ? "حفظ التغييرات" : "إضافة المشرف")}</span></button></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>البيانات الأساسية</span></h3><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div><label class="block text-xs font-black text-slate-800 mb-1.5">الاسم الكامل *</label><input${ssrRenderAttr("value", form.name)} type="text" placeholder="مثال: أحمد محمد" class="${ssrRenderClass([getFieldError("name") ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
			if (getFieldError("name")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("name"))}</span>`);
			else _push(`<!---->`);
			_push(`</div><div><label class="block text-xs font-black text-slate-800 mb-1.5">البريد الإلكتروني *</label><input${ssrRenderAttr("value", form.email)} type="email" dir="ltr" placeholder="ahmed@aswar.com" class="${ssrRenderClass([getFieldError("email") ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
			if (getFieldError("email")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("email"))}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="md:col-span-2"><label class="block text-xs font-black text-slate-800 mb-1.5">رقم الهاتف *</label><input${ssrRenderAttr("value", form.phone)} type="tel" dir="ltr" placeholder="0501234567" class="${ssrRenderClass([getFieldError("phone") ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"])}" required>`);
			if (getFieldError("phone")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("phone"))}</span>`);
			else _push(`<!---->`);
			_push(`</div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>الأمان وكلمة المرور</span></h3><div class="grid grid-cols-1 gap-4"><div><label class="block text-xs font-black text-slate-800 mb-1.5"> كلمة المرور ${ssrInterpolate(isEdit.value ? "(اتركها فارغة للإبقاء على الحالية)" : "*")}</label><input${ssrRenderAttr("value", form.password)} type="password" dir="ltr"${ssrRenderAttr("placeholder", isEdit.value ? "اتركه فارغاً للإبقاء على كلمة المرور الحالية" : "6 خانات على الأقل...")} class="${ssrRenderClass([getFieldError("password") ? "border-rose-400 bg-rose-50/50" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-bold text-sm text-slate-900 focus:outline-none transition-all"])}"${ssrIncludeBooleanAttr(!isEdit.value) ? " required" : ""} minlength="6">`);
			if (getFieldError("password")) _push(`<span class="text-xs font-bold text-rose-500 block mt-1">${ssrInterpolate(getFieldError("password"))}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50"><div><h4 class="font-black text-xs text-slate-800">حالة الحساب</h4><p class="text-[11px] text-slate-400 mt-0.5">تعطيل الحساب سيمنع المشرف من تسجيل الدخول فوراً.</p></div>`);
			_push(ssrRenderComponent(BaseToggle_default, {
				modelValue: form.status,
				"onUpdate:modelValue": ($event) => form.status = $event
			}, null, _parent));
			_push(`</div></div></div></div><div class="space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h3 class="text-sm font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>الدور الوظيفي والصلاحيات</span></h3><div><label class="block text-xs font-black text-slate-800 mb-1.5">تحديد الدور الوظيفي *</label><select class="${ssrRenderClass([getFieldError("admin_role_id") ? "border-rose-400 bg-rose-50/50" : "border-slate-200", "w-full px-4 py-2.5 rounded-xl border font-bold text-sm text-slate-900 bg-slate-50 focus:bg-white focus:border-amber-400 focus:outline-none transition-all cursor-pointer"])}" required><option value="" disabled${ssrIncludeBooleanAttr(Array.isArray(form.admin_role_id) ? ssrLooseContain(form.admin_role_id, "") : ssrLooseEqual(form.admin_role_id, "")) ? " selected" : ""}>اختر الدور الوظيفي...</option><!--[-->`);
			ssrRenderList(unref(roles) || [], (r) => {
				_push(`<option${ssrRenderAttr("value", r.id)}${ssrIncludeBooleanAttr(Array.isArray(form.admin_role_id) ? ssrLooseContain(form.admin_role_id, r.id) : ssrLooseEqual(form.admin_role_id, r.id)) ? " selected" : ""}>${ssrInterpolate(r.name)} ${ssrInterpolate(r.modules ? `(${r.modules.length} صلاحيات)` : "")}</option>`);
			});
			_push(`<!--]--></select></div>`);
			if (selectedRole.value) {
				_push(`<div class="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/60 space-y-2"><div class="text-xs font-black text-amber-900 flex items-center justify-between"><span>صلاحيات هذا الدور:</span><span class="text-[10px] font-bold font-mono">${ssrInterpolate(selectedRole.value.modules?.length || 0)} أقسام</span></div><div class="flex flex-wrap gap-1 pt-1"><!--[-->`);
				ssrRenderList(selectedRole.value.modules || [], (m) => {
					_push(`<span class="px-2 py-0.5 bg-white text-amber-900 border border-amber-200 rounded-md text-[10px] font-bold">${ssrInterpolate(m)}</span>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/StaffForm.vue
var _sfc_setup = StaffForm_vue_vue_type_script_setup_true_lang_default.setup;
StaffForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/StaffForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var StaffForm_default = Object.assign(StaffForm_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardStaffForm" });

export { StaffForm_default as S };
//# sourceMappingURL=StaffForm-DXTTH1x3.mjs.map
