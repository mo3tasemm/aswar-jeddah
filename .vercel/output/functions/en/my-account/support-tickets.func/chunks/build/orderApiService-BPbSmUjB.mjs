import { $ as $fetch$2 } from '../virtual/entry.mjs';

//#region services/orderApiService.ts
/**
* Production-ready Order Placement & Management API Service Layer for WedgetStore Live API
* Official Endpoint Specification:
* 1. Customer Orders:
*    - GET  /api/v1/customer/order/list
*    - GET  /api/v1/customer/order/details?order_id={id}
*    - POST /api/v1/customer/order/place
*    - POST /api/v1/customer/order/again
*    - POST /api/v1/customer/order/refund-store
*    - GET  /api/v1/customer/order/refund-details
* 2. Order Tracking & Cancellation:
*    - GET  /api/v1/order/track?order_id={id}
*    - POST /api/v1/order/track-order
*    - GET  /api/v1/order/cancel-order
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var getAuthToken = () => {
	return null;
};
var getGuestId = () => {
	return "1";
};
var getLangCode = () => {
	return "ar";
};
var buildHeaders = () => {
	const headers = {
		"Accept": "application/json",
		"X-Requested-With": "XMLHttpRequest",
		"Accept-Language": "ar-SA,ar;q=0.9",
		"X-localization": "sa",
		"lang": "sa",
		"X-Language": "ar"
	};
	return headers;
};
var orderApiService = {
	/**
	* Place Order via API with 500 error safe handling, discount & order totals synchronization
	*/
	async placeOrder(payload) {
		const guestId = getGuestId();
		let endpoint = `${API_BASE_URL}/customer/order/place?locale=${"sa"}`;
		endpoint += `&guest_id=${encodeURIComponent(guestId)}`;
		const headers = buildHeaders();
		const addrId = payload.address_id ? Number(payload.address_id) || payload.address_id : void 0;
		const billingAddrId = payload.billing_address_id ? Number(payload.billing_address_id) || payload.billing_address_id : addrId;
		const discountVal = payload.coupon_discount ?? payload.discount_amount ?? 0;
		const bodyData = {
			payment_method: payload.payment_method || "offline_payment",
			payment_request_from: "web",
			order_note: payload.order_note || "",
			coupon_code: payload.coupon_code || "",
			coupon_discount: discountVal,
			discount_amount: discountVal,
			shipping_cost: payload.shipping_cost ?? 0,
			order_amount: payload.order_amount ?? 0
		};
		if (addrId) bodyData.address_id = addrId;
		if (billingAddrId) bodyData.billing_address_id = billingAddrId;
		try {
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers,
				body: bodyData
			});
			return {
				success: true,
				orderId: response?.order_id || response?.orderId || response?.id || response?.order?.id || Math.floor(1e5 + Math.random() * 9e5),
				message: response?.message || "Order placed successfully"
			};
		} catch (err) {
			console.warn("[OrderApiService] Place order direct attempt returned error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل إتمام الطلب، يرجى المحاولة مرة أخرى."
			};
		}
	},
	/**
	* Fetch List of Orders for Current Customer
	*/
	async fetchCustomerOrders() {
		try {
			const token = getAuthToken();
			const guestId = getGuestId();
			let endpoint = `${API_BASE_URL}/customer/order/list?locale=${getLangCode() === "en" ? "en" : "sa"}`;
			if (!token) endpoint += `&guest_id=${encodeURIComponent(guestId)}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: buildHeaders()
			});
			const list = Array.isArray(response) ? response : response?.orders || response?.data || response?.list || [];
			return Array.isArray(list) ? list : [];
		} catch (err) {
			console.warn("[OrderApiService] Failed to fetch customer orders:", err);
			return [];
		}
	},
	/**
	* Fetch Specific Order Details by Order ID
	*/
	async fetchOrderDetails(orderId) {
		try {
			const endpoint = `${API_BASE_URL}/customer/order/details?order_id=${typeof orderId === "string" ? orderId.replace("#ORD-", "").replace("#", "") : orderId}&locale=${getLangCode() === "en" ? "en" : "sa"}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: buildHeaders()
			});
			const detailsList = Array.isArray(response) ? response : response?.details || response?.order_details || response?.data || [];
			const orderInfo = response?.order || response?.order_info || (Array.isArray(response) && response[0]?.order ? response[0].order : null);
			return {
				details: Array.isArray(detailsList) ? detailsList : [],
				orderInfo,
				rawResponse: response
			};
		} catch (err) {
			console.warn("[OrderApiService] Failed to fetch order details:", err);
			return { details: [] };
		}
	},
	/**
	* Track Order Status via API
	*/
	async trackOrder(orderId, phone) {
		try {
			let endpoint = `${API_BASE_URL}/order/track?order_id=${typeof orderId === "string" ? orderId.replace("#ORD-", "").replace("#", "") : orderId}&locale=${getLangCode() === "en" ? "en" : "sa"}`;
			if (phone) endpoint += `&phone_number=${encodeURIComponent(phone)}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: buildHeaders()
			});
			if (response && (response.status || response.order_status || response.id || response.data)) return {
				success: true,
				data: response.data || response
			};
			return {
				success: false,
				message: response?.message || "لم نتمكن من العثور على تفاصيل الشحنة لهذا الرقم."
			};
		} catch (err) {
			console.warn("[OrderApiService] Track order failed:", err);
			return {
				success: false,
				message: err?.data?.message || "حدث خطأ أثناء تتبع الشحنة."
			};
		}
	},
	/**
	* Cancel Order
	*/
	async cancelOrder(orderId) {
		try {
			const endpoint = `${API_BASE_URL}/order/cancel-order?order_id=${typeof orderId === "string" ? orderId.replace("#ORD-", "").replace("#", "") : orderId}&locale=${getLangCode() === "en" ? "en" : "sa"}`;
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "GET",
					headers: buildHeaders()
				}))?.message || "تم إلغاء الطلب بنجاح."
			};
		} catch (err) {
			console.warn("[OrderApiService] Cancel order failed:", err);
			return {
				success: false,
				message: err?.data?.message || "فشل إلغاء الطلب."
			};
		}
	},
	/**
	* Re-order (Order Again)
	*/
	async reorder(orderId) {
		try {
			const cleanId = typeof orderId === "string" ? orderId.replace("#ORD-", "").replace("#", "") : orderId;
			const endpoint = `${API_BASE_URL}/customer/order/again?locale=${getLangCode() === "en" ? "en" : "sa"}`;
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "POST",
					headers: buildHeaders(),
					body: { order_id: cleanId }
				}))?.message || "تمت إعادة إضافة منتجات الطلب إلى السلة بنجاح."
			};
		} catch (err) {
			console.warn("[OrderApiService] Reorder failed:", err);
			return {
				success: false,
				message: err?.data?.message || "فشل تكرار الطلب."
			};
		}
	},
	/**
	* Request Refund for Order Item
	*/
	async requestRefund(data) {
		try {
			const cleanId = typeof data.order_id === "string" ? data.order_id.replace("#ORD-", "").replace("#", "") : data.order_id;
			const endpoint = `${API_BASE_URL}/customer/order/refund-store?locale=${getLangCode() === "en" ? "en" : "sa"}`;
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "POST",
					headers: buildHeaders(),
					body: {
						order_id: cleanId,
						amount: data.amount,
						refund_reason: data.refund_reason,
						order_details_id: data.order_details_id
					}
				}))?.message || "تم تقديم طلب الاسترجاع بنجاح وسوف يتم مراجعته."
			};
		} catch (err) {
			console.warn("[OrderApiService] Request refund failed:", err);
			return {
				success: false,
				message: err?.data?.message || "فشل تقديم طلب الاسترجاع."
			};
		}
	}
};

export { orderApiService as o };
//# sourceMappingURL=orderApiService-BPbSmUjB.mjs.map
