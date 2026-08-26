import { N as NuxtLink, n as navigateTo, _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { L as Logo_default } from './Logo-DJsxyFwb.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart, c as cartApiService } from './useCart-CqauBZhc.mjs';
import { S as StoreFeaturesBar_default } from './StoreFeaturesBar-BP26V_jW.mjs';
import { o as orderApiService } from './orderApiService-BPbSmUjB.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, watch, reactive, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderClass, ssrRenderStyle, ssrRenderSlot, ssrRenderTeleport } from 'vue/server-renderer';
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

//#region services/addressApiService.ts
/**
* Production-ready Address API Service Layer for WedgetStore Live API
* Endpoints:
* - GET    /api/v1/customer/address/list
* - POST   /api/v1/customer/address/add
* - PUT    /api/v1/customer/address/update?id={id}
* - DELETE /api/v1/customer/address/delete?address_id={id}
* - GET    /api/v1/customer/address/get/{id}
* Mandatory Header: Authorization: Bearer <token>
*/
process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var addressApiService = {
	/**
	* Fetch customer addresses from API (GET /api/v1/customer/address/list)
	*/
	async fetchAddresses() {
		return {
			addresses: [],
			error: "يرجى تسجيل الدخول لعرض العناوين."
		};
	},
	/**
	* Add new customer address via API (POST /api/v1/customer/address/add)
	*/
	async addAddress(payload) {
		return {
			success: false,
			message: "يرجى تسجيل الدخول لإضافة عنوان جديد."
		};
	},
	/**
	* Delete customer address via API (DELETE /api/v1/customer/address/delete or /api/v1/customer/address/{id})
	*/
	async deleteAddress(addressId) {
		return {
			success: false,
			message: "يرجى تسجيل الدخول لحذف العنوان."
		};
	}
};

//#region components/Checkout/CheckoutStepper.vue?vue&type=script&setup=true&lang.ts
var CheckoutStepper_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CheckoutStepper",
	__ssrInlineRender: true,
	props: { currentStep: {
		type: Number,
		required: true,
		default: 1
	} },
	setup(__props) {
		const props = __props;
		const { t, layoutDirection } = useLanguage();
		const progressWidth = computed(() => {
			if (props.currentStep === 1) return "0%";
			if (props.currentStep === 2) return "50%";
			if (props.currentStep === 3) return "100%";
			return "0%";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "w-full relative mb-10 mt-4",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="absolute top-5 inset-x-0 h-1 bg-slate-100 rounded-full w-[90%] mx-auto hidden sm:block"></div><div class="${ssrRenderClass([unref(layoutDirection) === "rtl" ? "right-[5%]" : "left-[5%]", "absolute top-5 h-1 bg-amber-400 rounded-full transition-all duration-500 hidden sm:block"])}" style="${ssrRenderStyle({ width: progressWidth.value })}"></div><div class="relative flex justify-between items-center sm:w-[90%] mx-auto gap-2"><div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none"><div class="${ssrRenderClass([[__props.currentStep >= 1 ? "bg-[#0B0E28] text-amber-400 border-2 border-amber-400" : "bg-white text-slate-400 border border-slate-200"], "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"])}">`);
			if (__props.currentStep > 1) _push(`<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
			else _push(`<span>1</span>`);
			_push(`</div><span class="${ssrRenderClass([__props.currentStep >= 1 ? "text-[#0B0E28]" : "text-slate-400", "text-xs sm:text-sm font-bold text-center"])}">${ssrInterpolate(unref(t)("checkout.step_cart"))}</span></div><div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none"><div class="${ssrRenderClass([[__props.currentStep >= 2 ? "bg-[#0B0E28] text-amber-400 border-2 border-amber-400" : "bg-white text-slate-400 border border-slate-200"], "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"])}">`);
			if (__props.currentStep > 2) _push(`<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
			else _push(`<span>2</span>`);
			_push(`</div><span class="${ssrRenderClass([__props.currentStep >= 2 ? "text-[#0B0E28]" : "text-slate-400", "text-xs sm:text-sm font-bold text-center"])}">${ssrInterpolate(unref(t)("checkout.step_shipping"))}</span></div><div class="flex flex-col items-center gap-2 relative z-10 flex-1 sm:flex-none"><div class="${ssrRenderClass([[__props.currentStep >= 3 ? "bg-[#0B0E28] text-amber-400 border-2 border-amber-400" : "bg-white text-slate-400 border border-slate-200"], "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300 shadow-sm"])}">`);
			if (__props.currentStep > 3) _push(`<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`);
			else _push(`<span>3</span>`);
			_push(`</div><span class="${ssrRenderClass([__props.currentStep >= 3 ? "text-[#0B0E28]" : "text-slate-400", "text-xs sm:text-sm font-bold text-center"])}">${ssrInterpolate(unref(t)("checkout.step_payment"))}</span></div></div></div>`);
		};
	}
});
//#endregion
//#region components/Checkout/CheckoutStepper.vue
var _sfc_setup$4 = CheckoutStepper_vue_vue_type_script_setup_true_lang_default.setup;
CheckoutStepper_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/CheckoutStepper.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var CheckoutStepper_default = Object.assign(CheckoutStepper_vue_vue_type_script_setup_true_lang_default, { __name: "CheckoutStepper" });
//#endregion
//#region components/Checkout/OrderSummary.vue?vue&type=script&setup=true&lang.ts
var OrderSummary_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OrderSummary",
	__ssrInlineRender: true,
	props: { cartItems: {
		type: Array,
		required: true,
		default: () => []
	} },
	emits: ["coupon-applied", "financials-updated"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t, formatCurrency, layoutDirection } = useLanguage();
		const couponCode = ref("");
		const isApplying = ref(false);
		const discountAmount = ref(0);
		const shippingFee = ref(0);
		const getItemFormattedPrice = (item) => {
			const p = item.product?.price || (typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : item.price) || 0;
			return formatCurrency(p);
		};
		const subtotal = computed(() => {
			return props.cartItems.reduce((sum, item) => {
				return sum + (item.product?.price || (typeof item.price === "string" ? parseFloat(item.price.replace(/,/g, "")) : item.price) || 0) * (item.quantity || 1);
			}, 0);
		});
		const subtotalFormatted = computed(() => {
			return formatCurrency(subtotal.value);
		});
		const discountAmountFormatted = computed(() => {
			return formatCurrency(discountAmount.value);
		});
		const total = computed(() => {
			return Math.max(0, subtotal.value - discountAmount.value + shippingFee.value);
		});
		const totalFormatted = computed(() => {
			return formatCurrency(total.value);
		});
		watch([
			subtotal,
			discountAmount,
			shippingFee,
			total
		], () => {
			emit("financials-updated", {
				subtotal: subtotal.value,
				discount: discountAmount.value,
				shippingFee: shippingFee.value,
				total: total.value,
				couponCode: couponCode.value
			});
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "bg-white rounded-3xl p-6 shadow-sm border border-slate-100/60 sticky top-24",
				dir: unref(layoutDirection)
			}, _attrs))}><h3 class="text-lg font-black text-[#0B0E28] mb-6 text-start">${ssrInterpolate(unref(t)("checkout.order_summary"))}</h3><div class="space-y-4 mb-6 max-h-60 overflow-y-auto custom-scrollbar pe-2"><!--[-->`);
			ssrRenderList(__props.cartItems, (item) => {
				_push(`<div class="flex items-center gap-3"><div class="w-16 h-16 rounded-xl bg-slate-50 overflow-hidden shrink-0 border border-slate-100 p-1 flex items-center justify-center"><img${ssrRenderAttr("src", item.product?.thumbnail || item.product?.images?.[0] || item.image)}${ssrRenderAttr("alt", item.product?.title || item.name)} class="w-full h-full object-contain mix-blend-multiply"></div><div class="flex-1 min-w-0 text-start"><h4 class="text-xs font-bold text-[#0B0E28] truncate">${ssrInterpolate(item.product?.title || item.name)}</h4><span class="text-[10px] text-slate-400 block mt-0.5">${ssrInterpolate(unref(t)("order.qty"))} ${ssrInterpolate(item.quantity)}</span></div><div class="text-sm font-black text-[#0B0E28] shrink-0">${ssrInterpolate(getItemFormattedPrice(item))}</div></div>`);
			});
			_push(`<!--]--></div><div class="mb-6 relative"><input type="text"${ssrRenderAttr("value", couponCode.value)}${ssrRenderAttr("placeholder", unref(t)("checkout.have_coupon"))} class="${ssrRenderClass([unref(layoutDirection) === "rtl" ? "pl-24" : "pr-24", "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all text-start"])}"><button${ssrIncludeBooleanAttr(isApplying.value || !couponCode.value) ? " disabled" : ""} class="${ssrRenderClass([unref(layoutDirection) === "rtl" ? "left-2" : "right-2", "absolute top-2 bottom-2 bg-[#0B0E28] text-amber-400 px-4 rounded-lg text-xs font-bold hover:bg-[#1a204c] transition-colors flex items-center justify-center cursor-pointer disabled:opacity-50"])}">`);
			if (!isApplying.value) _push(`<span>${ssrInterpolate(unref(t)("checkout.apply_coupon"))}</span>`);
			else _push(`<svg class="animate-spin h-3.5 w-3.5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>`);
			_push(`</button></div><div class="space-y-3 text-sm font-bold border-b border-slate-100 pb-4 mb-4"><div class="flex items-center justify-between text-slate-600"><span>${ssrInterpolate(unref(t)("order.subtotal"))}</span><span class="text-[#0B0E28]">${ssrInterpolate(subtotalFormatted.value)}</span></div>`);
			if (discountAmount.value > 0) _push(`<div class="flex items-center justify-between text-emerald-600"><span>${ssrInterpolate(unref(t)("order.discount"))}</span><span>- ${ssrInterpolate(discountAmountFormatted.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="flex items-center justify-between text-slate-600"><span>${ssrInterpolate(unref(t)("order.shipping_fee"))}</span><span class="text-amber-500 bg-amber-50 px-2 py-0.5 rounded-md text-xs font-bold">${ssrInterpolate(unref(t)("checkout.free_shipping"))}</span></div></div><div class="flex items-end justify-between mb-6"><div class="text-start"><span class="text-base font-black text-[#0B0E28] block">${ssrInterpolate(unref(t)("order.grand_total"))}</span><span class="text-xs text-slate-400 font-normal block">${ssrInterpolate(unref(t)("checkout.total_incl_vat"))}</span></div><span class="text-2xl font-black text-amber-500">${ssrInterpolate(totalFormatted.value)}</span></div>`);
			ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
			_push(`<div class="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-4"><div class="flex items-center gap-2 text-start"><div class="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></div><span class="text-[10px] font-bold text-slate-600 leading-tight">${ssrInterpolate(unref(t)("checkout.secure_payment_badge"))}</span></div><div class="flex items-center gap-2 text-start"><div class="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 shrink-0"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg></div><span class="text-[10px] font-bold text-slate-600 leading-tight">${ssrInterpolate(unref(t)("checkout.guarantee_badge"))}</span></div></div></div>`);
		};
	}
});
//#endregion
//#region components/Checkout/OrderSummary.vue
var _sfc_setup$3 = OrderSummary_vue_vue_type_script_setup_true_lang_default.setup;
OrderSummary_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/OrderSummary.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var OrderSummary_default = Object.assign(OrderSummary_vue_vue_type_script_setup_true_lang_default, { __name: "CheckoutOrderSummary" });
//#endregion
//#region components/Checkout/PaymentMethods.vue?vue&type=script&setup=true&lang.ts
var PaymentMethods_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "PaymentMethods",
	__ssrInlineRender: true,
	props: { method: {
		type: String,
		default: "offline_payment"
	} },
	emits: ["update:method"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const emit = __emit;
		const { t, layoutDirection } = useLanguage();
		const selectedMethod = ref(props.method || "offline_payment");
		watch(selectedMethod, (newVal) => {
			emit("update:method", newVal);
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6",
				dir: unref(layoutDirection)
			}, _attrs))}><h3 class="text-xl font-black text-[#0B0E28] mb-4 text-start">${ssrInterpolate(unref(t)("checkout.select_payment"))}</h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><label class="cursor-pointer relative group sm:col-span-2"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(selectedMethod.value, "offline_payment")) ? " checked" : ""} value="offline_payment" class="peer sr-only"><div class="p-5 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/40 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200 shadow-sm"><div class="flex items-center gap-4"><div class="${ssrRenderClass([selectedMethod.value === "offline_payment" ? "border-amber-500 bg-amber-500" : "border-slate-300", "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors"])}">`);
			if (selectedMethod.value === "offline_payment") _push(`<div class="w-2.5 h-2.5 bg-white rounded-full"></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="w-12 h-12 rounded-2xl bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0"><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg></div><div class="flex flex-col text-start"><div class="flex items-center gap-2 flex-wrap"><span class="text-base font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("checkout.offline_payment_title"))}</span><span class="bg-amber-400 text-[#0B0E28] text-[10px] font-black px-2 py-0.5 rounded-md">${ssrInterpolate(unref(t)("checkout.recommended_badge"))}</span></div><span class="text-xs text-slate-500 mt-1 leading-relaxed">${ssrInterpolate(unref(t)("checkout.offline_payment_desc"))}</span></div></div></div></label><label class="cursor-pointer relative group"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(selectedMethod.value, "paymob")) ? " checked" : ""} value="paymob" class="peer sr-only"><div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200"><div class="flex items-center gap-3"><div class="${ssrRenderClass([selectedMethod.value === "paymob" ? "border-amber-400 bg-amber-400" : "border-slate-300", "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
			if (selectedMethod.value === "paymob") _push(`<div class="w-2 h-2 bg-white rounded-full"></div>`);
			else _push(`<!---->`);
			_push(`</div><span class="text-sm font-bold text-[#0B0E28] text-start">${ssrInterpolate(unref(t)("checkout.paymob_title"))}</span></div><div class="flex items-center gap-1 shrink-0"><div class="w-8 h-5 bg-blue-900 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div><div class="w-8 h-5 bg-slate-100 rounded text-green-600 text-[10px] font-black flex items-center justify-center border border-slate-200">Mada</div></div></div></label><label class="cursor-pointer relative group"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(selectedMethod.value, "tabby")) ? " checked" : ""} value="tabby" class="peer sr-only"><div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/30 transition-all flex items-center justify-between h-full bg-white group-hover:border-slate-200"><div class="flex items-center gap-3"><div class="${ssrRenderClass([selectedMethod.value === "tabby" ? "border-amber-400 bg-amber-400" : "border-slate-300", "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"])}">`);
			if (selectedMethod.value === "tabby") _push(`<div class="w-2 h-2 bg-white rounded-full"></div>`);
			else _push(`<!---->`);
			_push(`</div><div class="flex flex-col text-start"><span class="text-sm font-bold text-[#0B0E28]">${ssrInterpolate(unref(t)("checkout.tabby_title"))}</span><span class="text-[10px] text-slate-400">${ssrInterpolate(unref(t)("checkout.interest_free"))}</span></div></div><div class="flex items-center gap-1 shrink-0"><div class="w-8 h-5 bg-teal-300 rounded flex items-center justify-center text-[#0B0E28] font-black text-[9px] uppercase">Tabby</div></div></div></label></div>`);
			if (selectedMethod.value === "offline_payment") _push(`<div class="mt-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-3 text-start"><div class="flex items-center gap-2 text-amber-400 text-sm font-black"><svg class="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg><span>${ssrInterpolate(unref(t)("checkout.offline_instructions_title"))}</span></div><ul class="text-xs text-slate-300 space-y-2 list-disc list-inside leading-relaxed"><li>${ssrInterpolate(unref(t)("checkout.offline_instruction_1"))}</li><li>${ssrInterpolate(unref(t)("checkout.offline_instruction_2"))}</li></ul></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/Checkout/PaymentMethods.vue
var _sfc_setup$2 = PaymentMethods_vue_vue_type_script_setup_true_lang_default.setup;
PaymentMethods_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Checkout/PaymentMethods.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var PaymentMethods_default = Object.assign(PaymentMethods_vue_vue_type_script_setup_true_lang_default, { __name: "CheckoutPaymentMethods" });
//#endregion
//#region composables/useAddresses.ts
/**
* Production-ready Composable for Address Management, Instant Reactivity & Sync
* Aligned with official API endpoints:
* - GET    /api/v1/customer/address/get/{id}
* - PUT    /api/v1/customer/address/update (params: { id: addressId }, body: payload)
* - GET    /api/v1/customer/address/list
* - POST   /api/v1/customer/address/add
* - DELETE /api/v1/customer/address/{id}
*/
var addressList = ref([]);
var selectedAddressId = ref(null);
var selectedBillingAddressId = ref(null);
var addressPending = ref(false);
var useAddresses = () => {
	const toast = useToast();
	const loadAddresses = async () => {
		addressPending.value = true;
		try {
			const res = await addressApiService.fetchAddresses();
			if (res.addresses && res.addresses.length > 0) {
				addressList.value = res.addresses;
				if (!selectedAddressId.value) selectedAddressId.value = res.addresses[0].id;
			} else addressList.value = [];
		} catch (e) {
			console.warn("[useAddresses] Load error:", e);
		} finally {
			addressPending.value = false;
		}
	};
	/**
	* GET Address Details (GET /api/v1/customer/address/get/{id})
	*/
	const getAddressDetails = async (addressId) => {
		addressPending.value = true;
		try {
			const res = await addressApiService.getAddressDetails(addressId);
			if (res.address) return res.address;
			return null;
		} catch (e) {
			console.warn("[useAddresses] getAddressDetails error:", e);
			return null;
		} finally {
			addressPending.value = false;
		}
	};
	/**
	* Add Address (POST /api/v1/customer/address/add)
	*/
	const addAddress = async (payload) => {
		addressPending.value = true;
		try {
			const res = await addressApiService.addAddress(payload);
			if (res.success) {
				toast.success("تمت إضافة العنوان بنجاح", payload.address);
				await loadAddresses();
				if (res.addressId) selectedAddressId.value = Number(res.addressId);
				return true;
			} else {
				toast.error("خطأ في إضافة العنوان", res.message);
				return false;
			}
		} catch (e) {
			toast.error("فشل حفظ العنوان", e?.message || "يرجى التأكد من البيانات.");
			return false;
		} finally {
			addressPending.value = false;
		}
	};
	/**
	* Update Address (PUT /api/v1/customer/address/update with params: { id: addressId } and body)
	*/
	const updateAddress = async (payload) => {
		addressPending.value = true;
		try {
			const index = addressList.value.findIndex((a) => String(a.id) === String(payload.address_id));
			if (index !== -1) addressList.value[index] = {
				...addressList.value[index],
				contact_person_name: payload.contact_person_name,
				phone: payload.phone,
				address_type: payload.address_type,
				address: payload.address,
				city: payload.city,
				country: payload.country,
				is_billing: payload.is_billing
			};
			const res = await addressApiService.updateAddress(payload);
			if (res.success) {
				toast.success("تم تحديث العنوان بنجاح!");
				await loadAddresses();
				return true;
			} else {
				toast.error("فشل تحديث العنوان في السيرفر", res.message);
				await loadAddresses();
				return false;
			}
		} catch (e) {
			toast.error("فشل تحديث العنوان", e?.message || "يرجى التأكد من البيانات.");
			await loadAddresses();
			return false;
		} finally {
			addressPending.value = false;
		}
	};
	/**
	* Delete Address (DELETE /api/v1/customer/address/{id})
	*/
	const deleteAddress = async (addressId) => {
		addressPending.value = true;
		try {
			addressList.value = addressList.value.filter((a) => String(a.id) !== String(addressId));
			toast.success("تم حذف العنوان بنجاح");
			const res = await addressApiService.deleteAddress(addressId);
			if (!res.success) toast.error("ملاحظة في السيرفر", res.message);
			await loadAddresses();
			return true;
		} catch (e) {
			toast.error("فشل حذف العنوان", e?.message);
			return false;
		} finally {
			addressPending.value = false;
		}
	};
	const selectAddress = (id) => {
		selectedAddressId.value = id;
	};
	return {
		addresses: addressList,
		selectedAddressId,
		selectedBillingAddressId,
		selectedAddress: computed(() => {
			return addressList.value.find((a) => a.id === selectedAddressId.value) || addressList.value[0] || null;
		}),
		addressPending,
		loadAddresses,
		getAddressDetails,
		addAddress,
		updateAddress,
		deleteAddress,
		selectAddress
	};
};
//#endregion
//#region components/account/AddressModal.vue?vue&type=script&setup=true&lang.ts
var AddressModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AddressModal",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		editingAddress: {
			type: Object,
			default: null
		}
	},
	emits: ["close", "saved"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		useAddresses();
		const isSaving = ref(false);
		const isEditMode = computed(() => Boolean(props.editingAddress && props.editingAddress.id));
		const formData = reactive({
			contact_person_name: "",
			phone: "",
			address_type: "Home",
			address: "",
			city: "جدة",
			country: "السعودية",
			latitude: 21.5433,
			longitude: 39.1728,
			is_billing: 0
		});
		const populateForm = () => {
			if (props.editingAddress) {
				formData.contact_person_name = props.editingAddress.contact_person_name || props.editingAddress.receiverName || "";
				formData.phone = props.editingAddress.phone || "";
				formData.address_type = props.editingAddress.address_type || props.editingAddress.type || "Home";
				formData.address = props.editingAddress.address || "";
				formData.city = props.editingAddress.city || "جدة";
				formData.country = props.editingAddress.country || "السعودية";
				formData.is_billing = props.editingAddress.is_billing ? 1 : 0;
			} else resetForm();
		};
		const resetForm = () => {
			formData.contact_person_name = "";
			formData.phone = "";
			formData.address_type = "Home";
			formData.address = "";
			formData.city = "جدة";
			formData.country = "السعودية";
			formData.latitude = 21.5433;
			formData.longitude = 39.1728;
			formData.is_billing = 0;
		};
		watch(() => props.isOpen, (newVal) => {
			if (newVal) populateForm();
		}, { immediate: true });
		watch(() => props.editingAddress, () => {
			if (props.isOpen) populateForm();
		}, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) {
					_push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0 md:p-6 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto" dir="rtl" data-v-40343a68><div class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]" data-v-40343a68><div class="bg-white p-6 pb-4 flex items-center justify-between border-b border-slate-100 shrink-0" data-v-40343a68><h3 class="text-xl font-black text-[#0B0E28]" data-v-40343a68>${ssrInterpolate(isEditMode.value ? "تعديل عنوان التوصيل" : "إضافة عنوان توصيل جديد")}</h3><button class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors text-sm cursor-pointer" data-v-40343a68><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-40343a68><line x1="18" y1="6" x2="6" y2="18" data-v-40343a68></line><line x1="6" y1="6" x2="18" y2="18" data-v-40343a68></line></svg></button></div><form class="p-6 md:p-8 space-y-6 overflow-y-auto overscroll-contain flex-1 custom-scrollbar" data-v-40343a68><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-40343a68><div class="space-y-2 md:col-span-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>نوع العنوان</label><div class="flex gap-4" data-v-40343a68><label class="flex-1 cursor-pointer" data-v-40343a68><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(formData.address_type, "Home")) ? " checked" : ""} value="Home" class="peer sr-only" data-v-40343a68><div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all" data-v-40343a68><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-40343a68><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-40343a68></path><polyline points="9 22 9 12 15 12 15 22" data-v-40343a68></polyline></svg><span class="text-sm font-bold" data-v-40343a68>المنزل (Home)</span></div></label><label class="flex-1 cursor-pointer" data-v-40343a68><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(formData.address_type, "Office")) ? " checked" : ""} value="Office" class="peer sr-only" data-v-40343a68><div class="p-4 rounded-xl border border-slate-200 peer-checked:border-amber-400 peer-checked:bg-amber-50 peer-checked:text-amber-600 text-slate-500 flex flex-col items-center gap-2 transition-all" data-v-40343a68><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-40343a68><rect x="2" y="7" width="20" height="14" rx="2" ry="2" data-v-40343a68></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" data-v-40343a68></path></svg><span class="text-sm font-bold" data-v-40343a68>العمل (Office)</span></div></label></div></div><div class="space-y-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>اسم المستلم بالكامل</label><input type="text"${ssrRenderAttr("value", formData.contact_person_name)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="الاسم الكامل للمستلم" data-v-40343a68></div><div class="space-y-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>رقم الجوال</label><input type="tel"${ssrRenderAttr("value", formData.phone)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="05XXXXXXXX" dir="ltr" data-v-40343a68></div><div class="space-y-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>المدينة</label><input type="text"${ssrRenderAttr("value", formData.city)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="جدة، الرياض، إلخ..." data-v-40343a68></div><div class="space-y-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>الدولة</label><input type="text"${ssrRenderAttr("value", formData.country)} required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all" placeholder="السعودية" data-v-40343a68></div><div class="space-y-2 md:col-span-2" data-v-40343a68><label class="text-sm font-bold text-slate-700" data-v-40343a68>تفاصيل العنوان التفصيلي</label><textarea rows="3" required class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-[#0B0E28] font-medium focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400 transition-all resize-none" placeholder="اسم الحي، اسم الشارع، رقم المبنى أو الشقة..." data-v-40343a68>${ssrInterpolate(formData.address)}</textarea></div><div class="md:col-span-2 flex items-center gap-3 pt-2" data-v-40343a68><div class="relative flex items-start" data-v-40343a68><div class="flex items-center h-5" data-v-40343a68><input id="isBilling" type="checkbox"${ssrIncludeBooleanAttr(ssrLooseEqual(formData.is_billing, 1)) ? " checked" : ""} class="w-4 h-4 text-[#0B0E28] bg-slate-50 border-slate-300 rounded focus:ring-[#0B0E28] focus:ring-2 cursor-pointer" data-v-40343a68></div><div class="ml-3 text-sm mr-3" data-v-40343a68><label for="isBilling" class="font-bold text-slate-700 cursor-pointer" data-v-40343a68>تعيين كعنوان الدفع والفواتير (Billing Address)</label></div></div></div></div><div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row-reverse items-center justify-between gap-3 shrink-0 rounded-b-3xl" data-v-40343a68><button type="submit"${ssrIncludeBooleanAttr(isSaving.value) ? " disabled" : ""} class="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-2 min-w-[140px] cursor-pointer disabled:opacity-50" data-v-40343a68>`);
					if (isSaving.value) _push(`<svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" data-v-40343a68><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-v-40343a68></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-v-40343a68></path></svg>`);
					else _push(`<span data-v-40343a68>${ssrInterpolate(isEditMode.value ? "حفظ التعديلات" : "حفظ العنوان")}</span>`);
					_push(`</button><button type="button" class="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold bg-[#fff] text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer" data-v-40343a68> إلغاء </button></div></form></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/account/AddressModal.vue
var _sfc_setup$1 = AddressModal_vue_vue_type_script_setup_true_lang_default.setup;
AddressModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/AddressModal.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var AddressModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AddressModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-40343a68"]]), { __name: "AccountAddressModal" });
//#endregion
//#region pages/checkout/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, localePath } = useLanguage();
		useHead$1({ title: computed(() => t("checkout.title")) });
		const { cart, clearCart } = useCart();
		const { addresses, selectedAddressId, addressPending, loadAddresses } = useAddresses();
		const toast = useToast();
		const currentStep = ref(2);
		const paymentMethod = ref("offline_payment");
		const orderNote = ref("");
		const couponCode = ref("");
		const isProcessing = ref(false);
		const isAddressModalOpen = ref(false);
		const checkoutFinancials = ref({
			subtotal: 0,
			discount: 0,
			shippingFee: 0,
			total: 0,
			couponCode: ""
		});
		const onCouponApplied = (data) => {
			couponCode.value = data.code;
		};
		const onFinancialsUpdated = (data) => {
			if (data) checkoutFinancials.value = {
				subtotal: data.subtotal || 0,
				discount: data.discount || 0,
				shippingFee: data.shippingFee || 0,
				total: data.total || 0,
				couponCode: data.couponCode || couponCode.value
			};
		};
		const nextStep = async () => {
			if (currentStep.value === 2) {
				if (!selectedAddressId.value && addresses.value.length > 0) selectedAddressId.value = addresses.value[0].id;
				if (!selectedAddressId.value && addresses.value.length === 0) {
					toast.error(layoutDirection.value === "ltr" ? "Missing Address" : "عنوان التوصيل مفقود", layoutDirection.value === "ltr" ? "Please add a delivery address to complete your order." : "يرجى إضافة عنوان توصيل لإكمال الطلب.");
					isAddressModalOpen.value = true;
					return;
				}
				isProcessing.value = true;
				setTimeout(() => {
					isProcessing.value = false;
					currentStep.value = 3;
					(void 0).scrollTo({
						top: 0,
						behavior: "smooth"
					});
				}, 400);
			} else if (currentStep.value === 3) {
				if (!cart.value || cart.value.length === 0) {
					toast.error(layoutDirection.value === "ltr" ? "Cart is Empty" : "السلة فارغة", layoutDirection.value === "ltr" ? "Please add products to your cart before checking out." : "يرجى إضافة منتجات إلى السلة قبل إتمام الطلب.");
					return;
				}
				if (!selectedAddressId.value) {
					toast.error(layoutDirection.value === "ltr" ? "Please select a delivery address" : "يرجى تحديد عنوان التوصيل");
					currentStep.value = 2;
					return;
				}
				isProcessing.value = true;
				try {
					if (cart.value && cart.value.length > 0) {
						for (const item of cart.value) if (item.product && item.product.id) await cartApiService.addToCart(item.product, item.quantity || 1);
					}
					const res = await orderApiService.placeOrder({
						address_id: selectedAddressId.value,
						payment_method: paymentMethod.value || "offline_payment",
						order_note: orderNote.value,
						coupon_code: couponCode.value || checkoutFinancials.value.couponCode,
						coupon_discount: checkoutFinancials.value.discount,
						discount_amount: checkoutFinancials.value.discount,
						shipping_cost: checkoutFinancials.value.shippingFee,
						order_amount: checkoutFinancials.value.total
					});
					if (res.success) {
						const orderIdDisplay = res.orderId ? String(res.orderId).startsWith("#") ? res.orderId : `#${res.orderId}` : "#ORD-101";
						toast.success(layoutDirection.value === "ltr" ? "Order Placed Successfully!" : "تم إرسال وإنشاء طلبك بنجاح!", `${layoutDirection.value === "ltr" ? "Order ID:" : "رقم الطلب:"} ${orderIdDisplay}`);
						await clearCart();
						navigateTo("/my-account/orders");
					} else toast.error(layoutDirection.value === "ltr" ? "Order Execution Failed" : "لم يتم إكتمال الطلب", res.message);
				} catch (err) {
					console.error("[CheckoutPage] Unexpected error during checkout:", err);
					const msg = err?.data?.message || err?.message || (layoutDirection.value === "ltr" ? "Unexpected checkout error. Please try again." : "حدث خطأ غير متوقع أثناء الدفع. حاول مرة أخرى.");
					toast.error(layoutDirection.value === "ltr" ? "Order Failed" : "فشل إرسال الطلب", msg);
				} finally {
					isProcessing.value = false;
				}
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "checkout-page selection:bg-amber-500 selection:text-white bg-[#F8F9FA] min-h-screen pb-20",
				dir: unref(layoutDirection)
			}, _attrs))}><header class="bg-white border-b border-slate-100 py-4 mb-8"><div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "flex items-center gap-2"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<img${ssrRenderAttr("src", Logo_default)} alt="أسوار" class="h-10 object-contain"${_scopeId}>`);
					else return [createVNode("img", {
						src: Logo_default,
						alt: "أسوار",
						class: "h-10 object-contain"
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="flex items-center gap-2 text-slate-500 text-sm font-bold"><svg class="w-4 h-4 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg><span>${ssrInterpolate(unref(t)("checkout.secure_shopping"))}</span></div></div></header><div class="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">`);
			_push(ssrRenderComponent(CheckoutStepper_default, { currentStep: currentStep.value }, null, _parent));
			_push(`<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><main class="lg:col-span-8 space-y-8">`);
			if (currentStep.value === 2) {
				_push(`<section class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all"><div class="flex items-center justify-between mb-6"><h2 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(unref(t)("checkout.delivery_address"))}</h2><button class="text-sm font-bold text-amber-500 hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer"><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg><span>${ssrInterpolate(unref(t)("checkout.add_address"))}</span></button></div>`);
				if (unref(addressPending)) _push(`<div class="py-8 text-center"><div class="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div><p class="text-xs text-slate-500 font-bold">${ssrInterpolate(unref(t)("checkout.loading_addresses"))}</p></div>`);
				else if (unref(addresses).length === 0) _push(`<div class="text-center py-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200"><p class="text-xs text-slate-500 font-bold mb-3">${ssrInterpolate(unref(t)("checkout.no_addresses"))}</p><button class="px-5 py-2.5 bg-[#0B0E28] text-amber-400 font-bold text-xs rounded-xl shadow-md cursor-pointer">${ssrInterpolate(unref(t)("checkout.add_first_address"))}</button></div>`);
				else {
					_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><!--[-->`);
					ssrRenderList(unref(addresses), (address) => {
						_push(`<label class="cursor-pointer relative"><input type="radio"${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedAddressId), address.id)) ? " checked" : ""}${ssrRenderAttr("value", address.id)} class="peer sr-only"><div class="p-4 rounded-2xl border-2 border-slate-100 peer-checked:border-amber-400 peer-checked:bg-amber-50/20 transition-all flex flex-col gap-2 h-full text-start"><div class="flex items-center justify-between"><div class="flex items-center gap-2 text-[#0B0E28] font-black text-sm"><svg class="w-4 h-4 text-amber-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg> ${ssrInterpolate(address.address_type || unref(t)("checkout.default_home"))}</div>`);
						if (unref(selectedAddressId) === address.id) _push(`<div class="w-5 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[#0B0E28] shrink-0"><svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>`);
						else _push(`<!---->`);
						_push(`</div><p class="text-sm font-bold text-slate-600 mt-1">${ssrInterpolate(address.contact_person_name)}</p><p class="text-xs text-slate-500 leading-relaxed">${ssrInterpolate(address.city)}، ${ssrInterpolate(address.address)}</p><p class="text-xs font-bold text-[#0B0E28] mt-1" dir="ltr">${ssrInterpolate(address.phone || address.contact_person_number)}</p></div></label>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`</section>`);
			} else _push(`<!---->`);
			if (currentStep.value === 3) {
				_push(`<section class="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100/60 transition-all space-y-6">`);
				_push(ssrRenderComponent(PaymentMethods_default, {
					method: paymentMethod.value,
					"onUpdate:method": ($event) => paymentMethod.value = $event
				}, null, _parent));
				_push(`<div class="text-start"><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(t)("checkout.order_notes_label"))}</label><textarea rows="2"${ssrRenderAttr("placeholder", unref(t)("checkout.order_notes_placeholder"))} class="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs font-medium outline-none focus:border-[#0B0E28] resize-none">${ssrInterpolate(orderNote.value)}</textarea></div></section>`);
			} else _push(`<!---->`);
			_push(`</main><aside class="lg:col-span-4 relative">`);
			_push(ssrRenderComponent(OrderSummary_default, {
				cartItems: unref(cart),
				onCouponApplied,
				onFinancialsUpdated
			}, {
				action: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} class="w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70"${_scopeId}>`);
						if (isProcessing.value) _push(`<svg class="animate-spin h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"${_scopeId}><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"${_scopeId}></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"${_scopeId}></path></svg>`);
						else _push(`<span${_scopeId}>${ssrInterpolate(currentStep.value === 2 ? unref(t)("checkout.proceed_to_payment") : unref(t)("checkout.place_order"))}</span>`);
						_push(`</button>`);
						if (currentStep.value === 3) _push(`<button${ssrIncludeBooleanAttr(isProcessing.value) ? " disabled" : ""} class="w-full py-3 mt-3 rounded-xl text-sm font-bold bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"${_scopeId}>${ssrInterpolate(unref(t)("checkout.back_to_address"))}</button>`);
						else _push(`<!---->`);
					} else return [createVNode("button", {
						onClick: nextStep,
						disabled: isProcessing.value,
						class: "w-full py-4 rounded-xl text-base font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#151a42] transition-colors shadow-xl shadow-[#0B0E28]/20 flex items-center justify-center gap-2 mt-2 cursor-pointer disabled:opacity-70"
					}, [isProcessing.value ? (openBlock(), createBlock("svg", {
						key: 0,
						class: "animate-spin h-5 w-5 text-amber-400",
						xmlns: "http://www.w3.org/2000/svg",
						fill: "none",
						viewBox: "0 0 24 24"
					}, [createVNode("circle", {
						class: "opacity-25",
						cx: "12",
						cy: "12",
						r: "10",
						stroke: "currentColor",
						"stroke-width": "4"
					}), createVNode("path", {
						class: "opacity-75",
						fill: "currentColor",
						d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					})])) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString(currentStep.value === 2 ? unref(t)("checkout.proceed_to_payment") : unref(t)("checkout.place_order")), 1))], 8, ["disabled"]), currentStep.value === 3 ? (openBlock(), createBlock("button", {
						key: 0,
						onClick: ($event) => currentStep.value = 2,
						disabled: isProcessing.value,
						class: "w-full py-3 mt-3 rounded-xl text-sm font-bold bg-white text-slate-500 border border-slate-200 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
					}, toDisplayString(unref(t)("checkout.back_to_address")), 9, ["onClick", "disabled"])) : createCommentVNode("", true)];
				}),
				_: 1
			}, _parent));
			_push(`</aside></div></div><section class="w-full bg-white border-t border-slate-200 mt-20">`);
			_push(ssrRenderComponent(StoreFeaturesBar_default, null, null, _parent));
			_push(`</section>`);
			_push(ssrRenderComponent(AddressModal_default, {
				isOpen: isAddressModalOpen.value,
				onClose: ($event) => isAddressModalOpen.value = false,
				onSaved: unref(loadAddresses)
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/checkout/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var checkout_default = index_vue_vue_type_script_setup_true_lang_default;

export { checkout_default as default };
//# sourceMappingURL=checkout-DoWfWLRG.mjs.map
