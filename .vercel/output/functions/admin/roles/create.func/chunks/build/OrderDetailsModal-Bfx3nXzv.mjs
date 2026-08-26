import { _ as _plugin_vue_export_helper_default, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useCart } from './useCart-CqauBZhc.mjs';
import { o as orderApiService } from './orderApiService-BPbSmUjB.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, ref, computed, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderTeleport, ssrRenderAttr, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';

//#region components/account/OrdersTable.vue?vue&type=script&setup=true&lang.ts
var OrdersTable_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OrdersTable",
	__ssrInlineRender: true,
	props: {
		orders: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
			default: ""
		},
		showViewAll: {
			type: Boolean,
			default: true
		}
	},
	emits: ["open-details"],
	setup(__props) {
		const { t, formatCurrency, layoutDirection } = useLanguage();
		const renderOrderTotal = (order) => {
			if (typeof order.total === "string" && (order.total.includes("SAR") || order.total.includes("ر.س"))) return order.total;
			return formatCurrency(order.total || 0);
		};
		const isProcessing = (order) => {
			return order.status === "processing";
		};
		const getStatusBadgeClass = (order) => {
			if (order.status === "completed") return "bg-emerald-50 text-emerald-600 border-emerald-200";
			if (order.status === "cancelled") return "bg-rose-50 text-rose-600 border-rose-200";
			return "bg-amber-50 text-amber-600 border-amber-200";
		};
		const getStatusLabel = (order) => {
			if (order.statusText) return order.statusText;
			if (order.status === "completed") return t("orders.completed");
			if (order.status === "cancelled") return t("orders.cancelled");
			return t("orders.processing");
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100/60 overflow-hidden",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="p-8 border-b border-slate-100 flex items-center justify-between"><div><h2 class="text-xl font-black text-[#0B0E28]">${ssrInterpolate(__props.title || unref(t)("account.orders"))}</h2><p class="text-slate-400 text-sm mt-1">${ssrInterpolate(unref(t)("orders.track_subtitle"))}</p></div>`);
			if (__props.showViewAll) _push(ssrRenderComponent(_component_NuxtLink, {
				to: "/my-account/orders",
				class: "text-sm font-bold text-amber-500 hover:text-[#0B0E28] transition-colors flex items-center gap-2 cursor-pointer"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<span${_scopeId}>${ssrInterpolate(unref(t)("orders.view_all"))}</span><svg class="w-4 h-4 rtl:-scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="M5 12h14M12 5l7 7-7 7"${_scopeId}></path></svg>`);
					else return [createVNode("span", null, toDisplayString(unref(t)("orders.view_all")), 1), (openBlock(), createBlock("svg", {
						class: "w-4 h-4 rtl:-scale-x-100",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}, [createVNode("path", { d: "M5 12h14M12 5l7 7-7 7" })]))];
				}),
				_: 1
			}, _parent));
			else _push(`<!---->`);
			_push(`</div><div class="overflow-x-auto"><table class="w-full text-start border-collapse"><thead><tr class="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider"><th class="p-6 whitespace-nowrap text-start">${ssrInterpolate(unref(t)("orders.order_id"))}</th><th class="p-6 whitespace-nowrap text-start">${ssrInterpolate(unref(t)("orders.date"))}</th><th class="p-6 whitespace-nowrap text-start">${ssrInterpolate(unref(t)("orders.total"))}</th><th class="p-6 whitespace-nowrap text-start">${ssrInterpolate(unref(t)("orders.status"))}</th><th class="p-6 whitespace-nowrap text-end">${ssrInterpolate(unref(t)("orders.action"))}</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
			ssrRenderList(__props.orders, (order) => {
				_push(`<tr class="hover:bg-slate-50/50 transition-colors group"><td class="p-6"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 shrink-0"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg></div><span class="font-black text-[#0B0E28]">${ssrInterpolate(order.id)}</span></div></td><td class="p-6 text-sm text-slate-500 font-medium">${ssrInterpolate(order.date)}</td><td class="p-6 text-sm font-black text-[#0B0E28]">${ssrInterpolate(renderOrderTotal(order))}</td><td class="p-6"><span class="${ssrRenderClass([getStatusBadgeClass(order), "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border"])}">`);
				if (isProcessing(order)) _push(`<span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>`);
				else _push(`<!---->`);
				_push(`<span>${ssrInterpolate(getStatusLabel(order))}</span></span></td><td class="p-6 text-end"><button class="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-bold hover:bg-[#0B0E28] hover:text-amber-400 hover:border-[#0B0E28] transition-all shadow-sm cursor-pointer">${ssrInterpolate(unref(t)("orders.details"))}</button></td></tr>`);
			});
			_push(`<!--]-->`);
			if (__props.orders.length === 0) _push(`<tr><td colspan="5" class="p-12 text-center text-slate-400 font-medium">${ssrInterpolate(unref(t)("orders.empty"))}</td></tr>`);
			else _push(`<!---->`);
			_push(`</tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region components/account/OrdersTable.vue
var _sfc_setup$1 = OrdersTable_vue_vue_type_script_setup_true_lang_default.setup;
OrdersTable_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/OrdersTable.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var OrdersTable_default = Object.assign(OrdersTable_vue_vue_type_script_setup_true_lang_default, { __name: "AccountOrdersTable" });
//#endregion
//#region composables/useOrders.ts
/**
* Production-ready Composable for Order Management, Placement, Refunds & Tracking
* Bound to official Order APIs:
* - GET    /api/v1/customer/order/list
* - GET    /api/v1/customer/order/details
* - POST   /api/v1/customer/order/place
* - POST   /api/v1/customer/order/again
* - POST   /api/v1/customer/order/refund-store
* - GET    /api/v1/customer/order/refund-details
* - GET    /api/v1/order/track
* - GET    /api/v1/order/cancel-order
*/
ref([]);
ref(null);
ref(false);
ref(null);
//#endregion
//#region components/account/OrderDetailsModal.vue?vue&type=script&setup=true&lang.ts
var OrderDetailsModal_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "OrderDetailsModal",
	__ssrInlineRender: true,
	props: {
		isOpen: {
			type: Boolean,
			default: false
		},
		activeOrder: {
			type: Object,
			default: null
		}
	},
	emits: ["close"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		useCart();
		const { t, layoutDirection } = useLanguage();
		const pending = ref(false);
		const actionPending = ref(false);
		const isReordering = ref(false);
		const isRefunding = ref(false);
		const hasRefundApplied = ref(false);
		const orderDetailsData = ref([]);
		const orderHeaderInfo = ref(null);
		const rawApiResponse = ref(null);
		const trackerSteps = computed(() => [
			{ label: t("order.step_confirmed") },
			{ label: t("order.step_processing") },
			{ label: t("order.step_shipped") },
			{ label: t("order.step_delivered") }
		]);
		const loadDetails = async () => {
			if (!props.activeOrder) return;
			const rawObj = props.activeOrder.rawItem || props.activeOrder;
			const rawId = rawObj.id || rawObj.order_id || props.activeOrder.id;
			if (!rawId) return;
			pending.value = true;
			hasRefundApplied.value = false;
			try {
				const cleanId = typeof rawId === "string" ? rawId.replace("#ORD-", "").replace("#", "") : rawId;
				const res = await orderApiService.fetchOrderDetails(cleanId);
				rawApiResponse.value = res.rawResponse || res;
				if (res.details && res.details.length > 0) orderDetailsData.value = res.details;
				else if (Array.isArray(res)) orderDetailsData.value = res;
				else if (Array.isArray(res.rawResponse)) orderDetailsData.value = res.rawResponse;
				if (res.orderInfo) orderHeaderInfo.value = res.orderInfo;
				else if (orderDetailsData.value[0]?.order) orderHeaderInfo.value = orderDetailsData.value[0].order;
				if (orderDetailsData.value.some((item) => item.refund_request === 1 || item.refund_request === true) || Boolean(orderHeaderInfo.value?.refund_request === 1 || props.activeOrder?.rawItem?.refund_request === 1)) hasRefundApplied.value = true;
			} catch (err) {
				console.warn("[OrderDetailsModal] Failed to load order details:", err);
			} finally {
				pending.value = false;
			}
		};
		watch(() => props.isOpen, (newVal) => {
			if (newVal) loadDetails();
		});
		const orderIdDisplay = computed(() => {
			const rawObj = props.activeOrder?.rawItem || props.activeOrder;
			const id = rawObj?.id || rawObj?.order_id;
			return id ? String(id).startsWith("#") ? id : `#${id}` : "#ORD-101";
		});
		const rawStatus = computed(() => {
			const info = orderHeaderInfo.value || props.activeOrder?.rawItem || props.activeOrder || {};
			return (info.order_status || info.status || info.statusText || "pending").toString().toLowerCase();
		});
		const isCanceled = computed(() => {
			return [
				"canceled",
				"cancelled",
				"failed",
				"returned",
				"ملغي"
			].includes(rawStatus.value);
		});
		const isDelivered = computed(() => {
			return [
				"delivered",
				"completed",
				"مكتمل",
				"تم التوصيل"
			].includes(rawStatus.value);
		});
		const isPendingOrConfirmed = computed(() => {
			return [
				"pending",
				"confirmed",
				"قيد الانتظار",
				"مؤكد"
			].includes(rawStatus.value);
		});
		const isRefundApplied = computed(() => {
			return hasRefundApplied.value;
		});
		const statusTextDisplay = computed(() => {
			const st = rawStatus.value;
			if (st === "pending") return layoutDirection.value === "ltr" ? "Pending" : "قيد الانتظار";
			if (st === "confirmed") return t("order.step_confirmed");
			if (st === "processing") return t("order.step_processing");
			if (st === "shipped") return t("order.step_shipped");
			if (st === "delivered" || st === "completed") return t("order.step_delivered");
			if (st === "canceled" || st === "cancelled") return t("order.canceled_badge");
			if (st === "returned") return layoutDirection.value === "ltr" ? "Returned" : "مسترجع";
			return props.activeOrder?.statusText || t("order.step_delivered");
		});
		const statusBadgeClass = computed(() => {
			if (isCanceled.value) return "bg-rose-50 text-rose-600 border-rose-200";
			if (isDelivered.value) return "bg-emerald-50 text-emerald-600 border-emerald-200";
			return "bg-amber-50 text-amber-700 border-amber-200";
		});
		const dateDisplay = computed(() => {
			return props.activeOrder?.date || (layoutDirection.value === "ltr" ? "Recently" : "مؤخراً");
		});
		const paymentMethodDisplay = computed(() => {
			const rawObj = props.activeOrder?.rawItem || props.activeOrder || {};
			const rawMethod = (props.activeOrder?.paymentMethod || rawObj?.payment_method || orderHeaderInfo.value?.payment_method || "").toLowerCase();
			if (layoutDirection.value === "ltr") return {
				"offline_payment": "Bank Transfer / Manual",
				"manual_payment": "Bank Transfer / Manual",
				"bank_transfer": "Bank Transfer",
				"cash_on_delivery": "Cash on Delivery",
				"cod": "Cash on Delivery",
				"paymob": "Digital Payment (Paymob)",
				"tabby": "Tabby (Installments)",
				"tamara": "Tamara (Interest-free)",
				"digital_payment": "Credit Card / Mada / Visa"
			}[rawMethod] || (rawMethod ? rawMethod : "Bank Transfer");
			return {
				"offline_payment": "تحويل بنكي / دفع يدوي",
				"manual_payment": "تحويل بنكي / دفع يدوي",
				"bank_transfer": "تحويل بنكي معتمد",
				"cash_on_delivery": "الدفع عند الاستلام",
				"cod": "الدفع عند الاستلام",
				"paymob": "الدفع الإلكتروني (Paymob)",
				"tabby": "تابي (تقسيط مشترياتك)",
				"tamara": "تمارا (تقسيط بدون فوائد)",
				"digital_payment": "بطاقة ماليّة / مدى / فيزا"
			}[rawMethod] || (rawMethod ? rawMethod : "تحويل بنكي / يدوي");
		});
		const orderItemsList = computed(() => {
			let source = [];
			if (orderDetailsData.value && orderDetailsData.value.length > 0) source = orderDetailsData.value;
			else if (rawApiResponse.value) source = Array.isArray(rawApiResponse.value) ? rawApiResponse.value : rawApiResponse.value.details || rawApiResponse.value.order_details || rawApiResponse.value.data || rawApiResponse.value.order?.details || rawApiResponse.value.order?.order_details || rawApiResponse.value.order?.items || rawApiResponse.value.items || [];
			if ((!source || source.length === 0) && props.activeOrder) {
				const rawObj = props.activeOrder.rawItem || props.activeOrder;
				source = rawObj.details || rawObj.order_details || rawObj.items || rawObj.products || [];
			}
			if (Array.isArray(source) && source.length > 0) return source.map((item) => {
				let prodObj = item.product_details || item.product || item.product_detail || {};
				if (typeof prodObj === "string") try {
					prodObj = JSON.parse(prodObj);
				} catch {}
				const name = prodObj.name || prodObj.title || item.product_name || item.name || "منتج من أسوار جدة";
				const qty = Number(item.qty || item.quantity || item.product_quantity || 1);
				const numPrice = Number(item.price || item.unit_price || prodObj.price || prodObj.unit_price || 0);
				let img = prodObj.thumbnail || prodObj.image || prodObj.images?.[0] || item.image || item.thumbnail || item.product_thumbnail;
				if (img && typeof img === "string" && !img.startsWith("http")) img = `https://wedgetstore.com/storage/app/public/product/thumbnail/${img}`;
				return {
					id: item.id || prodObj.id || Math.random(),
					name,
					quantity: qty,
					unitPrice: numPrice,
					price: numPrice.toLocaleString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US"),
					image: img || null
				};
			});
			return [];
		});
		const shippingInfo = computed(() => {
			const rawAddr = props.activeOrder?.rawItem?.shipping_address_data || orderHeaderInfo.value?.shipping_address_data;
			if (rawAddr) return {
				name: rawAddr.contact_person_name || "عميل أسوار",
				address: `${rawAddr.city || ""}، ${rawAddr.address || ""}`
			};
			return {
				name: props.activeOrder?.customerName || (layoutDirection.value === "ltr" ? "Aswar Customer" : "عميل أسوار جدة"),
				address: props.activeOrder?.shippingAddress || (layoutDirection.value === "ltr" ? "Saudi Arabia" : "المملكة العربية السعودية")
			};
		});
		const orderObj = computed(() => {
			if (orderHeaderInfo.value) return orderHeaderInfo.value;
			if (orderDetailsData.value[0]?.order) return orderDetailsData.value[0].order;
			return rawApiResponse.value?.order || rawApiResponse.value?.data?.order || props.activeOrder?.rawItem || props.activeOrder || {};
		});
		const subtotalValue = computed(() => {
			if (orderItemsList.value && orderItemsList.value.length > 0) {
				const sum = orderItemsList.value.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
				if (sum > 0) return sum;
			}
			const rawSub = orderObj.value.subtotal || orderObj.value.order_amount || 0;
			return Number(rawSub) || 0;
		});
		const subtotalDisplay = computed(() => {
			return subtotalValue.value.toLocaleString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US");
		});
		const discountValue = computed(() => {
			let itemDiscountSum = 0;
			if (orderDetailsData.value && orderDetailsData.value.length > 0) itemDiscountSum = orderDetailsData.value.reduce((acc, item) => acc + Number(item.discount || item.discount_amount || 0), 0);
			const val = orderObj.value.discount_amount || orderObj.value.coupon_discount_amount || orderObj.value.coupon_discount || orderObj.value.discount || itemDiscountSum || 0;
			return Number(val) || 0;
		});
		const discountDisplay = computed(() => {
			return discountValue.value > 0 ? `- ${discountValue.value.toLocaleString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US")} ${t("product.currency")}` : "";
		});
		const shippingFeeValue = computed(() => {
			const val = orderObj.value.shipping_cost || orderObj.value.delivery_fee || orderObj.value.shipping_fee || 0;
			return Number(val) || 0;
		});
		const shippingFeeDisplay = computed(() => {
			return shippingFeeValue.value > 0 ? `${shippingFeeValue.value.toLocaleString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US")} ${t("product.currency")}` : "";
		});
		const totalValue = computed(() => {
			const serverTotal = orderObj.value.order_amount || orderObj.value.total_amount || orderObj.value.total;
			if (serverTotal && Number(serverTotal) > 0) return Number(serverTotal);
			const calculated = subtotalValue.value - discountValue.value + shippingFeeValue.value;
			return Math.max(0, calculated);
		});
		const totalDisplay = computed(() => {
			return totalValue.value.toLocaleString(layoutDirection.value === "rtl" ? "ar-SA" : "en-US");
		});
		const currentStepIndex = computed(() => {
			const st = rawStatus.value;
			if (st.includes("deliver") || st.includes("complet")) return 3;
			if (st.includes("ship") || st.includes("out")) return 2;
			if (st.includes("process") || st.includes("prepar")) return 1;
			return 0;
		});
		const trackerProgress = computed(() => {
			const idx = currentStepIndex.value;
			if (idx === 0) return "0%";
			if (idx === 1) return "33%";
			if (idx === 2) return "66%";
			return "100%";
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			ssrRenderTeleport(_push, (_push) => {
				if (__props.isOpen) {
					_push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#0B0E28]/60 backdrop-blur-md overflow-y-auto"${ssrRenderAttr("dir", unref(layoutDirection))} data-v-6a3b4540><div class="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8 transform transition-all flex flex-col max-h-[90vh]" data-v-6a3b4540><div class="bg-[#0B0E28] text-white p-6 pb-5 flex items-center justify-between shrink-0" data-v-6a3b4540><div data-v-6a3b4540><div class="flex items-center gap-3" data-v-6a3b4540><h3 class="text-xl font-black text-white" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.details_title"))}</h3><span class="bg-amber-400 text-[#0B0E28] text-xs font-black px-3 py-0.5 rounded-full dir-ltr" data-v-6a3b4540>${ssrInterpolate(orderIdDisplay.value)}</span></div><p class="text-xs text-slate-300 mt-1" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.date"))} ${ssrInterpolate(dateDisplay.value)}</p></div><button class="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors text-sm cursor-pointer" data-v-6a3b4540><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><line x1="18" y1="6" x2="6" y2="18" data-v-6a3b4540></line><line x1="6" y1="6" x2="18" y2="18" data-v-6a3b4540></line></svg></button></div><div class="p-6 md:p-8 space-y-8 overflow-y-auto custom-scrollbar overscroll-contain flex-1" data-v-6a3b4540>`);
					if (pending.value) _push(`<div class="py-16 text-center" data-v-6a3b4540><div class="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" data-v-6a3b4540></div><p class="text-xs font-bold text-slate-500" data-v-6a3b4540>${ssrInterpolate(unref(t)("common.loading"))}</p></div>`);
					else {
						_push(`<!--[-->`);
						if (isCanceled.value) _push(`<div class="bg-rose-50/90 rounded-3xl p-6 sm:p-7 border border-rose-200/90 shadow-sm transition-all" data-v-6a3b4540><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-6a3b4540><div class="flex items-start sm:items-center gap-4" data-v-6a3b4540><div class="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 border border-rose-200/80 flex items-center justify-center shrink-0 shadow-xs" data-v-6a3b4540><svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><circle cx="12" cy="12" r="10" data-v-6a3b4540></circle><line x1="15" y1="9" x2="9" y2="15" data-v-6a3b4540></line><line x1="9" y1="9" x2="15" y2="15" data-v-6a3b4540></line></svg></div><div class="space-y-1 text-start" data-v-6a3b4540><div class="flex items-center gap-3 flex-wrap" data-v-6a3b4540><h4 class="text-lg font-black text-rose-700" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.canceled_title"))}</h4><span class="bg-rose-600 text-white text-xs font-extrabold px-3.5 py-1 rounded-full shadow-xs" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.canceled_badge"))}</span></div><p class="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-medium" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.canceled_desc"))}</p></div></div></div></div>`);
						else {
							_push(`<div class="bg-slate-50 p-6 rounded-3xl border border-slate-200/60" data-v-6a3b4540><div class="flex items-center justify-between mb-6" data-v-6a3b4540><h4 class="text-xs font-bold text-slate-400" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.status_header"))}</h4><span class="${ssrRenderClass([statusBadgeClass.value, "text-xs font-black px-3 py-1 rounded-full border shadow-2xs"])}" data-v-6a3b4540>${ssrInterpolate(statusTextDisplay.value)}</span></div><div class="relative flex items-center justify-between max-w-md mx-auto" data-v-6a3b4540><div class="absolute top-1/2 start-0 end-0 h-1 bg-slate-200 -translate-y-1/2 z-0" data-v-6a3b4540></div><div class="absolute top-1/2 start-0 h-1 bg-[#0B0E28] -translate-y-1/2 z-0 transition-all duration-500" style="${ssrRenderStyle({ width: trackerProgress.value })}" data-v-6a3b4540></div><!--[-->`);
							ssrRenderList(trackerSteps.value, (step, index) => {
								_push(`<div class="relative z-10 flex flex-col items-center gap-2" data-v-6a3b4540><div class="${ssrRenderClass(["w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300", index <= currentStepIndex.value ? "bg-[#0B0E28] text-amber-400 ring-4 ring-amber-400/20 shadow-md" : "bg-white text-slate-400 border-2 border-slate-200"])}" data-v-6a3b4540>`);
								if (index === 0) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><polyline points="20 6 9 17 4 12" data-v-6a3b4540></polyline></svg>`);
								else if (index === 1) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" data-v-6a3b4540></path><polyline points="3.27 6.96 12 12.01 20.73 6.96" data-v-6a3b4540></polyline><line x1="12" y1="22.08" x2="12" y2="12" data-v-6a3b4540></line></svg>`);
								else if (index === 2) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><rect x="1" y="3" width="15" height="13" data-v-6a3b4540></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" data-v-6a3b4540></polygon><circle cx="5.5" cy="18.5" r="2.5" data-v-6a3b4540></circle><circle cx="18.5" cy="18.5" r="2.5" data-v-6a3b4540></circle></svg>`);
								else if (index === 3) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" data-v-6a3b4540></path><polyline points="9 22 9 12 15 12 15 22" data-v-6a3b4540></polyline></svg>`);
								else _push(`<!---->`);
								_push(`</div><span class="${ssrRenderClass(["text-[11px] font-bold whitespace-nowrap", index <= currentStepIndex.value ? "text-[#0B0E28]" : "text-slate-400"])}" data-v-6a3b4540>${ssrInterpolate(step.label)}</span></div>`);
							});
							_push(`<!--]--></div></div>`);
						}
						_push(`<div data-v-6a3b4540><div class="flex items-center justify-between mb-4" data-v-6a3b4540><h4 class="text-sm font-black text-[#0B0E28]" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.items_header"))}</h4><span class="text-xs font-bold text-slate-400" data-v-6a3b4540>(${ssrInterpolate(orderItemsList.value.length)} ${ssrInterpolate(unref(t)("order.items_count"))})</span></div>`);
						if (orderItemsList.value.length === 0) _push(`<div class="text-center py-8 text-slate-400 text-xs font-medium bg-slate-50 rounded-2xl border border-dashed border-slate-200" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.empty_items"))}</div>`);
						else {
							_push(`<div class="space-y-3" data-v-6a3b4540><!--[-->`);
							ssrRenderList(orderItemsList.value, (item, idx) => {
								_push(`<div class="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-slate-200 transition-colors" data-v-6a3b4540><div class="flex items-center gap-4" data-v-6a3b4540><div class="w-14 h-14 bg-white rounded-xl border border-slate-200 flex items-center justify-center p-1 overflow-hidden shrink-0" data-v-6a3b4540>`);
								if (item.image) _push(`<img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.name)} class="w-full h-full object-contain" data-v-6a3b4540>`);
								else _push(`<svg class="w-6 h-6 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-6a3b4540><rect x="3" y="3" width="18" height="18" rx="2" ry="2" data-v-6a3b4540></rect><circle cx="8.5" cy="8.5" r="1.5" data-v-6a3b4540></circle><polyline points="21 15 16 10 5 21" data-v-6a3b4540></polyline></svg>`);
								_push(`</div><div class="text-start" data-v-6a3b4540><h5 class="font-extrabold text-[#0B0E28] text-sm line-clamp-1" data-v-6a3b4540>${ssrInterpolate(item.name)}</h5><p class="text-xs text-slate-400 mt-1" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.qty"))} ${ssrInterpolate(item.quantity)}</p></div></div><span class="font-black text-[#0B0E28] text-sm shrink-0" data-v-6a3b4540>${ssrInterpolate(item.price)} ${ssrInterpolate(unref(t)("product.currency"))}</span></div>`);
							});
							_push(`<!--]--></div>`);
						}
						_push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2" data-v-6a3b4540><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2 text-start" data-v-6a3b4540><h5 class="text-xs font-bold text-slate-400" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.shipping_info"))}</h5><p class="text-xs font-bold text-[#0B0E28] mt-2" data-v-6a3b4540>${ssrInterpolate(shippingInfo.value.name)}</p><p class="text-xs text-slate-600 leading-relaxed" data-v-6a3b4540>${ssrInterpolate(shippingInfo.value.address)}</p><div class="pt-2 flex items-center gap-2" data-v-6a3b4540><span class="text-[11px] font-semibold text-slate-500" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.payment_method"))}</span><span class="text-[11px] font-bold text-[#0B0E28] bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm" data-v-6a3b4540>${ssrInterpolate(paymentMethodDisplay.value)}</span></div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2.5 text-start" data-v-6a3b4540><h5 class="text-xs font-bold text-slate-400 mb-3" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.invoice_summary"))}</h5><div class="flex justify-between text-xs text-slate-600" data-v-6a3b4540><span data-v-6a3b4540>${ssrInterpolate(unref(t)("order.subtotal"))}</span><span class="font-bold text-[#0B0E28]" data-v-6a3b4540>${ssrInterpolate(subtotalDisplay.value)} ${ssrInterpolate(unref(t)("product.currency"))}</span></div>`);
						if (shippingFeeValue.value > 0) _push(`<div class="flex justify-between text-xs text-slate-600" data-v-6a3b4540><span data-v-6a3b4540>${ssrInterpolate(unref(t)("order.shipping_fee"))}</span><span class="font-bold text-[#0B0E28]" data-v-6a3b4540>${ssrInterpolate(shippingFeeDisplay.value)}</span></div>`);
						else _push(`<!---->`);
						if (discountValue.value > 0) _push(`<div class="flex justify-between text-xs text-emerald-600 font-bold" data-v-6a3b4540><span data-v-6a3b4540>${ssrInterpolate(unref(t)("order.discount"))}</span><span data-v-6a3b4540>${ssrInterpolate(discountDisplay.value)}</span></div>`);
						else _push(`<!---->`);
						_push(`<div class="border-t border-slate-200 pt-3 flex justify-between items-center" data-v-6a3b4540><span class="text-xs font-black text-[#0B0E28]" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.grand_total"))}</span><span class="text-base font-black text-[#0B0E28]" data-v-6a3b4540>${ssrInterpolate(totalDisplay.value)} ${ssrInterpolate(unref(t)("product.currency"))}</span></div></div></div><!--]-->`);
					}
					_push(`</div><div class="bg-slate-50 p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0" data-v-6a3b4540><div class="flex flex-wrap items-center gap-2 w-full sm:w-auto" data-v-6a3b4540>`);
					if (isDelivered.value) {
						_push(`<button${ssrIncludeBooleanAttr(actionPending.value || isReordering.value) ? " disabled" : ""} class="px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-900 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50" data-v-6a3b4540>`);
						if (isReordering.value) _push(`<span class="w-3.5 h-3.5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" data-v-6a3b4540></span>`);
						else _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-6a3b4540><polyline points="23 4 23 10 17 10" data-v-6a3b4540></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" data-v-6a3b4540></path></svg>`);
						_push(`<span data-v-6a3b4540>${ssrInterpolate(isReordering.value ? unref(t)("order.reordering") : unref(t)("order.reorder"))}</span></button>`);
					} else _push(`<!---->`);
					if (isDelivered.value) {
						_push(`<button${ssrIncludeBooleanAttr(actionPending.value || isRefunding.value || isRefundApplied.value) ? " disabled" : ""} class="${ssrRenderClass([isRefundApplied.value ? "bg-slate-200/80 text-slate-500 border border-slate-300 cursor-not-allowed" : "bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 shadow-2xs", "px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"])}" data-v-6a3b4540>`);
						if (isRefunding.value) _push(`<span class="w-3.5 h-3.5 border-2 border-rose-600 border-t-transparent rounded-full animate-spin" data-v-6a3b4540></span>`);
						else _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-6a3b4540><path d="M3 10h18M3 14h18M5 18h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 2 2 2z" data-v-6a3b4540></path></svg>`);
						_push(`<span data-v-6a3b4540>${ssrInterpolate(isRefunding.value ? unref(t)("order.refund_submitting") : isRefundApplied.value ? unref(t)("order.refund_applied") : unref(t)("order.refund_request"))}</span></button>`);
					} else _push(`<!---->`);
					if (isPendingOrConfirmed.value) _push(`<button${ssrIncludeBooleanAttr(actionPending.value) ? " disabled" : ""} class="px-4 py-2.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white border border-rose-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50" data-v-6a3b4540><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-6a3b4540><line x1="18" y1="6" x2="6" y2="18" data-v-6a3b4540></line><line x1="6" y1="6" x2="18" y2="18" data-v-6a3b4540></line></svg><span data-v-6a3b4540>${ssrInterpolate(unref(t)("order.cancel_order"))}</span></button>`);
					else _push(`<!---->`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: "/my-account/support-tickets",
						class: "px-4 py-2.5 rounded-xl text-xs font-bold bg-[#0B0E28] text-amber-400 hover:bg-[#1a204c] transition-colors shadow-sm flex items-center justify-center gap-1.5"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-6a3b4540${_scopeId}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" data-v-6a3b4540${_scopeId}></path></svg><span data-v-6a3b4540${_scopeId}>${ssrInterpolate(unref(t)("order.support"))}</span>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-3.5 h-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2",
								"stroke-linecap": "round",
								"stroke-linejoin": "round"
							}, [createVNode("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })])), createVNode("span", null, toDisplayString(unref(t)("order.support")), 1)];
						}),
						_: 1
					}, _parent));
					_push(`</div><button class="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 transition-colors flex items-center justify-center cursor-pointer" data-v-6a3b4540>${ssrInterpolate(unref(t)("order.close"))}</button></div></div></div>`);
				} else _push(`<!---->`);
			}, "body", false, _parent);
		};
	}
});
//#endregion
//#region components/account/OrderDetailsModal.vue
var _sfc_setup = OrderDetailsModal_vue_vue_type_script_setup_true_lang_default.setup;
OrderDetailsModal_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/account/OrderDetailsModal.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var OrderDetailsModal_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(OrderDetailsModal_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-6a3b4540"]]), { __name: "AccountOrderDetailsModal" });

export { OrdersTable_default as O, OrderDetailsModal_default as a };
//# sourceMappingURL=OrderDetailsModal-Bfx3nXzv.mjs.map
