import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { B as BaseSelect_default } from './BaseSelect-mF2QR5Dg.mjs';
import { u as useAdminCoupons } from './useAdminCoupons-D7s_TgM8.mjs';
import { defineComponent, reactive, computed, watch, mergeProps, withCtx, openBlock, createBlock, createVNode, unref, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';

//#region components/dashboard/CouponForm.vue?vue&type=script&setup=true&lang.ts
var CouponForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CouponForm",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEdit: { type: Boolean },
		couponId: {}
	},
	setup(__props) {
		const props = __props;
		useRouter();
		useRoute();
		const { t } = useAdminLanguage();
		const { isSubmitting, validationErrors, errorMessage: serverErrorMessage} = useAdminCoupons();
		const form = reactive({
			title: "",
			code: "",
			coupon_type: "discount_on_purchase",
			discount_type: "percent",
			discount: 10,
			min_purchase: 0,
			max_discount: 0,
			limit: 1,
			start_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			expire_date: new Date(Date.now() + 2592e6).toISOString().split("T")[0],
			status: true,
			customer_id: "0"
		});
		const couponTypeOptions = [
			{
				label: "خصم على إجمالي المشتريات (Discount on purchase)",
				value: "discount_on_purchase"
			},
			{
				label: "توصيل مجاني (Free delivery)",
				value: "free_delivery"
			},
			{
				label: "خصم أول طلب (First order)",
				value: "first_order"
			}
		];
		const discountTypeOptions = [{
			label: "نسبة مئوية (%)",
			value: "percent"
		}, {
			label: "مبلغ ثابت (ر.س)",
			value: "amount"
		}];
		const dateValidationError = computed(() => {
			if (form.start_date && form.expire_date) {
				if (new Date(form.expire_date) < new Date(form.start_date)) return "تاريخ الانتهاء يجب ألا يسبق تاريخ بدء الكوبون";
			}
			return null;
		});
		const getFieldError = (field) => {
			if (validationErrors.value && validationErrors.value[field] && validationErrors.value[field].length > 0) return validationErrors.value[field][0];
			return "";
		};
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.title = newVal.title || "";
				form.code = newVal.code || "";
				form.coupon_type = newVal.coupon_type || "discount_on_purchase";
				form.discount_type = newVal.discount_type === "percentage" ? "percent" : newVal.discount_type || "percent";
				form.discount = newVal.discount || 0;
				form.min_purchase = newVal.min_purchase || 0;
				form.max_discount = newVal.max_discount || 0;
				form.limit = newVal.limit || 0;
				form.start_date = newVal.start_date || form.start_date;
				form.expire_date = newVal.expire_date || form.expire_date;
				form.status = newVal.status === 1 || newVal.status === true;
				form.customer_id = String(newVal.customer_id || "0");
			}
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div class="flex items-center gap-3">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/coupons",
				class: "w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0B0E28] hover:bg-amber-400 hover:border-amber-400 transition-all shadow-2xs cursor-pointer",
				title: "العودة"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 rtl:-scale-x-100",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2.5"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M15 19l-7-7 7-7"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`<div><h1 class="text-xl sm:text-2xl font-black text-slate-900">${ssrInterpolate(__props.isEdit ? "تعديل الكوبون" : "إضافة كوبون جديد")}</h1><p class="text-xs sm:text-sm text-slate-500 mt-0.5">${ssrInterpolate(__props.isEdit ? `تعديل إعدادات وشروط الكوبون #${__props.couponId}` : "تحديد شروط ونسب وقواعد خصم الكوبون الجديد")}</p></div></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/coupons",
				class: "w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors text-center cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`${ssrInterpolate(unref(t)("admin.common.cancel"))}`);
					else return [createTextVNode(toDisplayString(unref(t)("admin.common.cancel")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
			if (unref(isSubmitting)) _push(`<svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>`);
			else _push(`<!---->`);
			_push(`<span>${ssrInterpolate(__props.isEdit ? "حفظ التعديلات" : "إضافة الكوبون")}</span></button></div></div>`);
			if (unref(serverErrorMessage)) {
				_push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center justify-between text-rose-700 text-xs font-bold shadow-2xs"><div class="flex items-center gap-2"><svg class="w-5 h-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>${ssrInterpolate(unref(serverErrorMessage))}</span></div>`);
				if (unref(serverErrorMessage).includes("مستخدم") || unref(serverErrorMessage).includes("unique")) _push(`<button type="button" class="underline hover:text-rose-900 cursor-pointer font-black"> توليد كود عشوائي بديل </button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6"><h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>البيانات الأساسية للكوبون</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div class="sm:col-span-2">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.title,
				"onUpdate:modelValue": ($event) => form.title = $event,
				label: "عنوان أو وصف الكوبون *",
				placeholder: "مثال: خصم اليوم الوطني، عروض الصيف...",
				error: getFieldError("title"),
				required: ""
			}, null, _parent));
			_push(`</div><div class="sm:col-span-2 space-y-1.5"><label class="block text-xs font-black text-slate-800"> كود الخصم (Promo Code) * </label><div class="flex items-center gap-2"><div class="flex-1"><input${ssrRenderAttr("value", form.code)} type="text" dir="ltr" placeholder="مثال: ASWAR-SUMMER" class="${ssrRenderClass([getFieldError("code") ? "border-rose-400 bg-rose-50/60 focus:border-rose-500 text-rose-900" : "border-slate-200 bg-slate-50 focus:bg-white focus:border-amber-400", "w-full px-4 py-2.5 rounded-xl border font-mono font-black text-sm text-slate-900 tracking-wider uppercase focus:outline-none transition-all"])}" required></div><button type="button" class="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer" title="توليد كود عشوائي جديد"><svg class="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>توليد كود</span></button></div>`);
			if (getFieldError("code")) _push(`<span class="text-xs font-black text-rose-600 block mt-1">${ssrInterpolate(getFieldError("code"))}</span>`);
			else _push(`<!---->`);
			_push(`<p class="text-[11px] text-slate-400 font-medium">الأحرف والأرقام الإنجليزية فقط (بدون مسافات).</p></div><div>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.coupon_type,
				"onUpdate:modelValue": ($event) => form.coupon_type = $event,
				label: "نوع الكوبون *",
				options: couponTypeOptions,
				error: getFieldError("coupon_type")
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.discount_type,
				"onUpdate:modelValue": ($event) => form.discount_type = $event,
				label: "نوع الخصم *",
				options: discountTypeOptions,
				error: getFieldError("discount_type")
			}, null, _parent));
			_push(`</div><div class="${ssrRenderClass(form.coupon_type === "free_delivery" ? "opacity-50 pointer-events-none" : "")}">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.discount,
				"onUpdate:modelValue": ($event) => form.discount = $event,
				label: "قيمة الخصم *",
				type: "number",
				min: "0",
				max: form.discount_type === "percent" ? "100" : void 0,
				step: "0.01",
				placeholder: "0",
				error: getFieldError("discount")
			}, {
				icon: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span class="text-slate-400 font-bold px-2 text-xs"${_scopeId}>${ssrInterpolate(form.discount_type === "percent" ? "%" : "ر.س")}</span>`);
					else return [createVNode("span", { class: "text-slate-400 font-bold px-2 text-xs" }, toDisplayString(form.discount_type === "percent" ? "%" : "ر.س"), 1)];
				}),
				_: 1
			}, _parent));
			if (form.discount_type === "percent") _push(`<p class="text-[10px] text-slate-400 mt-1 font-medium">الحد الأقصى للنسبة 100%</p>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (form.discount_type === "percent") {
				_push(`<div>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: form.max_discount,
					"onUpdate:modelValue": ($event) => form.max_discount = $event,
					label: "الحد الأقصى لمبلغ الخصم (ر.س)",
					type: "number",
					min: "0",
					step: "0.01",
					placeholder: "اتركه 0 إذا لم يكن هناك حد أقصى",
					error: getFieldError("max_discount")
				}, null, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6"><h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><span class="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span>شروط الاستخدام والحدود</span></h2><div class="grid grid-cols-1 sm:grid-cols-2 gap-5"><div>`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.min_purchase,
				"onUpdate:modelValue": ($event) => form.min_purchase = $event,
				label: "الحد الأدنى لمبلغ الطلب (ر.س)",
				type: "number",
				min: "0",
				step: "0.01",
				placeholder: "0",
				error: getFieldError("min_purchase")
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.limit,
				"onUpdate:modelValue": ($event) => form.limit = $event,
				label: "الحد الأقصى لمرات الاستخدام",
				type: "number",
				min: "0",
				placeholder: "مثال: 1 (اتركه 0 لعدد غير محدود)",
				error: getFieldError("limit")
			}, null, _parent));
			_push(`</div></div></div></div><div class="space-y-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-5"><h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><svg class="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>فترة الصلاحية</span></h2><div>`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.start_date,
				"onUpdate:modelValue": ($event) => form.start_date = $event,
				label: "تاريخ بدء السريان *",
				type: "date",
				error: getFieldError("start_date"),
				required: ""
			}, null, _parent));
			_push(`</div><div>`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.expire_date,
				"onUpdate:modelValue": ($event) => form.expire_date = $event,
				label: "تاريخ انتهاء السريان *",
				type: "date",
				error: getFieldError("expire_date") || dateValidationError.value,
				required: ""
			}, null, _parent));
			_push(`</div>`);
			if (dateValidationError.value) _push(`<div class="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold">${ssrInterpolate(dateValidationError.value)}</div>`);
			else _push(`<!---->`);
			_push(`</div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"><h2 class="text-sm font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><svg class="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span>حالة الكوبون</span></h2><div class="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"><div><span class="text-xs font-black text-slate-800 block">تفعيل الكوبون فوراً</span><span class="text-[11px] text-slate-400 font-medium">سيكون الكوبون متاحاً للعملاء للاستخدام في السلة</span></div>`);
			_push(ssrRenderComponent(BaseToggle_default, {
				modelValue: form.status,
				"onUpdate:modelValue": ($event) => form.status = $event
			}, null, _parent));
			_push(`</div></div><div class="bg-gradient-to-br from-[#0B0E28] to-slate-800 text-white rounded-3xl p-5 shadow-md border border-slate-800 space-y-3"><div class="flex justify-between items-center text-xs text-amber-400 font-black"><span>معاينة الكوبون</span><span class="px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-md border border-amber-400/30 text-[10px]">${ssrInterpolate(form.status ? "نشط" : "معطل")}</span></div><div class="p-3 bg-white/10 rounded-2xl border border-dashed border-amber-400/40 text-center space-y-1"><span class="text-xs font-bold text-slate-300 block">${ssrInterpolate(form.title || "عنوان الكوبون")}</span><span class="font-mono font-black text-lg text-amber-400 tracking-widest block uppercase">${ssrInterpolate(form.code || "COUPON-CODE")}</span></div><div class="text-[11px] text-slate-300 space-y-1"><div class="flex justify-between"><span>قيمة الخصم:</span><span class="font-bold text-white font-mono">${ssrInterpolate(form.discount_type === "percent" ? `${form.discount || 0}%` : `${form.discount || 0} ر.س`)}</span></div>`);
			if (form.min_purchase > 0) _push(`<div class="flex justify-between"><span>الحد الأدنى:</span><span class="font-bold text-white font-mono">${ssrInterpolate(form.min_purchase)} ر.س</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-white/10"><span>الصلاحية حتى:</span><span class="font-mono">${ssrInterpolate(form.expire_date || "غير محدد")}</span></div></div></div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/CouponForm.vue
var _sfc_setup = CouponForm_vue_vue_type_script_setup_true_lang_default.setup;
CouponForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/CouponForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CouponForm_default = Object.assign(CouponForm_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardCouponForm" });

export { CouponForm_default as C };
//# sourceMappingURL=CouponForm-DTFzl9Wj.mjs.map
