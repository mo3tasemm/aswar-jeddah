import { u as useCookie, b as useAdminLanguage, a as useToast } from '../virtual/entry.mjs';
import { ref } from 'vue';

//#region services/adminOrdersApiService.ts
/**
* Admin Orders API Service Layer
* Live API Endpoints:
* 1. GET  /api/v1/admin/orders/list?limit={limit}&offset={offset}&order_status={order_status}&payment_status={payment_status}&search={search}
* 2. GET  /api/v1/admin/orders/details/{id}
* 3. POST /api/v1/admin/orders/update-status (body: { order_id, order_status })
* 4. POST /api/v1/admin/orders/update-payment-status (body: { order_id, payment_status })
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var buildHeaders = (token, isJson = true) => {
	const headers = {
		"Accept": "application/json",
		"X-Client-Type": "admin",
		"zoneId": "1"
	};
	if (isJson) headers["Content-Type"] = "application/json";
	if (token) headers["Authorization"] = `Bearer ${token.replace(/^"(.*)"$/, "$1").trim()}`;
	return headers;
};
var normalizeOrderProductImage = (rawImg) => {
	if (!rawImg) return "/images/placeholder.png";
	if (typeof rawImg !== "string") return "/images/placeholder.png";
	if (rawImg.startsWith("http://") || rawImg.startsWith("https://")) return rawImg;
	return `https://wedgetstore.com/storage/app/public/product/thumbnail/${rawImg.replace(/^\/+/, "").trim()}`;
};
var formatCustomerFullName = (customer, fallbackName) => {
	if (!customer) return fallbackName || "عميل غير مسجل";
	if (customer.name) return customer.name;
	return `${customer.f_name || ""} ${customer.l_name || ""}`.trim() || fallbackName || "عميل";
};
var parseAddressData = (data) => {
	if (!data) return null;
	if (typeof data === "object") return data;
	if (typeof data === "string") try {
		return JSON.parse(data);
	} catch {
		return { address: data };
	}
	return null;
};
var adminOrdersApiService = {
	/**
	* Fetch Orders List with Filters & Pagination
	* GET /api/v1/admin/orders/list?limit=10&offset=1&order_status=pending&payment_status=paid&search=1001
	*/
	async fetchOrdersList(token, filters = {}) {
		const limit = filters.limit || 10;
		const offset = filters.offset !== void 0 ? filters.offset : filters.page || 1;
		const params = new URLSearchParams();
		params.append("limit", String(limit));
		params.append("offset", String(offset));
		params.append("page", String(offset));
		params.append("_t", String(Date.now()));
		if (filters.order_status && filters.order_status !== "all") {
			params.append("order_status", filters.order_status);
			params.append("status", filters.order_status);
		}
		if (filters.payment_status && filters.payment_status !== "all") params.append("payment_status", filters.payment_status);
		if (filters.search && filters.search.trim()) params.append("search", filters.search.trim());
		const url = `${API_BASE_URL}/admin/orders/list?${params.toString()}`;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const raw = await response.json();
			let ordersList = [];
			let totalCount = 0;
			if (Array.isArray(raw)) {
				ordersList = raw;
				totalCount = raw.length;
			} else if (raw && typeof raw === "object") {
				totalCount = Number(raw.total_size ?? raw.total ?? raw.orders?.total ?? raw.data?.total ?? 0);
				if (Array.isArray(raw.orders)) ordersList = raw.orders;
				else if (raw.orders && typeof raw.orders === "object") if (Array.isArray(raw.orders.data)) ordersList = raw.orders.data;
				else {
					const vals = Object.values(raw.orders).filter((v) => v && typeof v === "object");
					if (vals.length > 0) ordersList = vals;
				}
				else if (Array.isArray(raw.data)) ordersList = raw.data;
				else if (raw.data && typeof raw.data === "object") if (Array.isArray(raw.data.orders)) ordersList = raw.data.orders;
				else if (Array.isArray(raw.data.data)) ordersList = raw.data.data;
				else {
					const vals = Object.values(raw.data).filter((v) => v && typeof v === "object");
					if (vals.length > 0) ordersList = vals;
				}
				else if (Array.isArray(raw.items)) ordersList = raw.items;
				if (totalCount === 0 && ordersList.length > 0) totalCount = ordersList.length;
			}
			const mappedOrders = (ordersList || []).map((item) => {
				if (!item || typeof item !== "object") return null;
				const shippingAddr = parseAddressData(item.shipping_address_data || item.shipping_address);
				const billingAddr = parseAddressData(item.billing_address_data || item.billing_address);
				let parsedCustomer = null;
				if (item.customer && typeof item.customer === "object") parsedCustomer = item.customer;
				else if (item.customer && typeof item.customer === "string") try {
					parsedCustomer = JSON.parse(item.customer);
				} catch {}
				else if (item.customer_id) parsedCustomer = {
					id: item.customer_id,
					name: item.customer_name || item.name,
					phone: item.customer_phone || item.phone,
					email: item.customer_email || item.email
				};
				const fallbackCustomerName = item.customer_name || (item.customer ? `${item.customer.f_name || ""} ${item.customer.l_name || ""}`.trim() : "") || shippingAddr?.contact_person_name || billingAddr?.contact_person_name || "عميل غير مسجل";
				const custName = formatCustomerFullName(parsedCustomer, fallbackCustomerName);
				const custPhone = item.customer_phone || parsedCustomer?.phone || shippingAddr?.phone || billingAddr?.phone || item.phone || "";
				const custEmail = item.customer_email || parsedCustomer?.email || item.email || "";
				const rawAmount = item.order_amount ?? item.order_amount_with_tax ?? item.total_amount ?? item.amount ?? 0;
				const orderAmount = Number(rawAmount);
				return {
					...item,
					id: item.id || item.order_id || "0",
					order_amount: isNaN(orderAmount) ? 0 : orderAmount,
					shipping_cost: Number(item.shipping_cost ?? 0),
					discount_amount: Number(item.discount_amount ?? item.discount ?? 0),
					order_status: String(item.order_status || item.status || "pending").toLowerCase().trim(),
					payment_status: String(item.payment_status || "unpaid").toLowerCase().trim(),
					customer: parsedCustomer,
					customer_name: custName,
					customer_phone: custPhone,
					customer_email: custEmail,
					shipping_address_data: shippingAddr,
					billing_address_data: billingAddr,
					created_at: item.created_at || (/* @__PURE__ */ new Date()).toISOString()
				};
			}).filter((item) => item !== null);
			const lastPageNum = Number(raw.last_page || Math.max(1, Math.ceil(totalCount / limit)));
			return {
				success: true,
				orders: mappedOrders,
				data: mappedOrders,
				total: totalCount || mappedOrders.length,
				total_size: totalCount || mappedOrders.length,
				last_page: lastPageNum,
				limit,
				offset
			};
		} catch (error) {
			console.error("Error fetching admin orders list:", error);
			return {
				success: false,
				orders: [],
				data: [],
				total: 0,
				total_size: 0,
				last_page: 1,
				limit,
				offset,
				message: error.message || "فشل في جلب قائمة الطلبات"
			};
		}
	},
	/**
	* Fetch Single Order Details
	* GET /api/v1/admin/orders/details/{id}
	*/
	async fetchOrderDetails(token, orderId) {
		const url = `${API_BASE_URL}/admin/orders/details/${orderId}?_t=${Date.now()}`;
		try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
			const raw = await response.json();
			let orderObj = null;
			let detailsList = [];
			if (Array.isArray(raw)) {
				detailsList = raw;
				if (raw.length > 0 && raw[0].order) orderObj = raw[0].order;
			} else if (raw && typeof raw === "object") {
				if (Array.isArray(raw.details)) detailsList = raw.details;
				else if (Array.isArray(raw.order_details)) detailsList = raw.order_details;
				else if (Array.isArray(raw.items)) detailsList = raw.items;
				else if (Array.isArray(raw.items_summary)) detailsList = raw.items_summary;
				else if (Array.isArray(raw.data)) detailsList = raw.data;
				else if (raw.data && Array.isArray(raw.data.details)) detailsList = raw.data.details;
				else if (raw.data && Array.isArray(raw.data.order_details)) detailsList = raw.data.order_details;
				else if (raw.data && Array.isArray(raw.data.items)) detailsList = raw.data.items;
				else if (raw.order && Array.isArray(raw.order.details)) detailsList = raw.order.details;
				else if (raw.order && Array.isArray(raw.order.order_details)) detailsList = raw.order.order_details;
				else if (raw.order && Array.isArray(raw.order.items)) detailsList = raw.order.items;
				if (raw.order && typeof raw.order === "object") orderObj = raw.order;
				else if (raw.data && typeof raw.data === "object" && !Array.isArray(raw.data)) orderObj = raw.data.order || raw.data;
				else if (raw.id) orderObj = raw;
			}
			if (!orderObj || !orderObj.id) try {
				const found = (await this.fetchOrdersList(token, {
					limit: 100,
					search: String(orderId)
				})).orders.find((o) => String(o.id) === String(orderId));
				if (found) orderObj = found;
			} catch {}
			const mappedDetails = detailsList.map((d) => {
				if (!d || typeof d !== "object") return null;
				let pDetails = null;
				if (d.product_details) {
					if (typeof d.product_details === "string") try {
						pDetails = JSON.parse(d.product_details);
					} catch {
						pDetails = { name: d.product_details };
					}
					else if (typeof d.product_details === "object") pDetails = d.product_details;
				} else if (d.product && typeof d.product === "object") pDetails = d.product;
				const name = d.product_name || pDetails?.name || d.product?.name || d.name || d.title || `منتج #${d.product_id || d.id || "1"}`;
				const thumbnail = normalizeOrderProductImage(pDetails?.thumbnail || d.product_thumbnail || d.thumbnail || d.product?.thumbnail || d.image || d.product?.image || "");
				const qty = Number(d.qty ?? d.quantity ?? d.count ?? 1);
				const price = Number(d.price ?? d.unit_price ?? pDetails?.unit_price ?? 0);
				const tax = Number(d.tax ?? d.tax_amount ?? 0);
				const discount = Number(d.discount ?? d.discount_amount ?? 0);
				let variantText = "";
				if (typeof d.variant === "string") variantText = d.variant;
				else if (typeof d.variation === "string") variantText = d.variation;
				else if (d.variation && typeof d.variation === "object") variantText = d.variation.type || d.variation.code || d.variation.title || "";
				return {
					id: d.id || String(Math.random()),
					order_id: d.order_id || orderId,
					product_id: d.product_id || pDetails?.id,
					product_name: name,
					product_thumbnail: thumbnail,
					product_details: pDetails,
					qty: isNaN(qty) ? 1 : qty,
					price: isNaN(price) ? 0 : price,
					tax: isNaN(tax) ? 0 : tax,
					discount: isNaN(discount) ? 0 : discount,
					variant: variantText,
					variation: d.variation,
					delivery_status: d.delivery_status || orderObj?.order_status || "pending",
					payment_status: d.payment_status || orderObj?.payment_status || "unpaid"
				};
			}).filter((item) => item !== null);
			const parsedCustomer = orderObj?.customer || (orderObj?.customer_id ? {
				id: orderObj.customer_id,
				name: orderObj.customer_name,
				phone: orderObj.customer_phone,
				email: orderObj.customer_email
			} : null);
			const shippingAddr = parseAddressData(orderObj?.shipping_address_data || orderObj?.shipping_address);
			return {
				success: true,
				order: {
					...orderObj,
					id: orderObj?.id || orderId,
					order_amount: Number(orderObj?.order_amount !== void 0 ? orderObj?.order_amount : orderObj?.total_amount || 0),
					shipping_cost: Number(orderObj?.shipping_cost || 0),
					discount_amount: Number(orderObj?.discount_amount || orderObj?.discount || 0),
					order_status: String(orderObj?.order_status || "pending").toLowerCase(),
					payment_status: String(orderObj?.payment_status || "unpaid").toLowerCase(),
					customer: parsedCustomer,
					customer_name: formatCustomerFullName(parsedCustomer, orderObj?.customer_name),
					customer_phone: parsedCustomer?.phone || orderObj?.customer_phone || "",
					customer_email: parsedCustomer?.email || orderObj?.customer_email || "",
					shipping_address_data: shippingAddr,
					details: mappedDetails,
					created_at: orderObj?.created_at || (/* @__PURE__ */ new Date()).toISOString()
				},
				details: mappedDetails,
				customer: parsedCustomer,
				shipping_address: shippingAddr
			};
		} catch (error) {
			console.error("Error fetching order details:", error);
			return {
				success: false,
				order: null,
				details: [],
				message: error.message || "فشل في جلب تفاصيل الطلب"
			};
		}
	},
	/**
	* Update Order Status
	* POST /api/v1/admin/orders/update-status
	* Body: { order_id: 123, order_status: 'processing' }
	*/
	async updateOrderStatus(token, payload) {
		const url = `${API_BASE_URL}/admin/orders/update-status`;
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: buildHeaders(token, true),
				body: JSON.stringify({
					order_id: payload.order_id,
					order_status: payload.order_status
				})
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) return {
				success: false,
				message: data.message || `فشل تحديث حالة الطلب (${response.status})`,
				errors: data.errors
			};
			return {
				success: true,
				message: data.message || "تم تحديث حالة الطلب بنجاح",
				data
			};
		} catch (error) {
			console.error("Error updating order status:", error);
			return {
				success: false,
				message: error.message || "فشل الاتصال بالخادم لتحديث حالة الطلب"
			};
		}
	},
	/**
	* Update Payment Status
	* POST /api/v1/admin/orders/update-payment-status
	* Body: { order_id: 123, payment_status: 'paid' }
	*/
	async updatePaymentStatus(token, payload) {
		const url = `${API_BASE_URL}/admin/orders/update-payment-status`;
		try {
			const response = await fetch(url, {
				method: "POST",
				headers: buildHeaders(token, true),
				body: JSON.stringify({
					order_id: payload.order_id,
					payment_status: payload.payment_status
				})
			});
			const data = await response.json().catch(() => ({}));
			if (!response.ok) return {
				success: false,
				message: data.message || `فشل تحديث حالة الدفع (${response.status})`,
				errors: data.errors
			};
			return {
				success: true,
				message: data.message || "تم تحديث حالة الدفع بنجاح",
				data
			};
		} catch (error) {
			console.error("Error updating payment status:", error);
			return {
				success: false,
				message: error.message || "فشل الاتصال بالخادم لتحديث حالة الدفع"
			};
		}
	}
};
//#endregion
//#region composables/useAdminOrders.ts
/**
* Admin Orders Management Composable
* Handles fetching list, filtering, pagination, details view, and status updates.
*/
var useAdminOrders = () => {
	const adminCookie = useCookie("admin_token");
	const toast = useToast();
	const { t } = useAdminLanguage();
	const orders = ref([]);
	const currentOrder = ref(null);
	const currentOrderDetails = ref([]);
	const isLoading = ref(false);
	const isLoadingDetails = ref(false);
	const isUpdatingStatus = ref(false);
	const isUpdatingPayment = ref(false);
	const errorMessage = ref(null);
	const totalOrders = ref(0);
	const lastPage = ref(1);
	const currentPage = ref(1);
	const perPage = ref(10);
	const orderStatusFilter = ref("all");
	const paymentStatusFilter = ref("all");
	const searchQuery = ref("");
	const getToken = () => {
		if (adminCookie.value) return adminCookie.value;
		return "";
	};
	/**
	* Fetch Orders List from API
	*/
	const fetchOrders = async (page = currentPage.value) => {
		isLoading.value = true;
		errorMessage.value = null;
		currentPage.value = page;
		const token = getToken();
		const filters = {
			limit: perPage.value,
			offset: page,
			order_status: orderStatusFilter.value,
			payment_status: paymentStatusFilter.value,
			search: searchQuery.value
		};
		try {
			console.log("Fetching orders with filters:", filters);
			const res = await adminOrdersApiService.fetchOrdersList(token, filters);
			console.log("API Response:", res);
			if (res && res.success) {
				orders.value = res.orders || res.data || [];
				totalOrders.value = res.total_size || res.total || orders.value.length || 0;
				lastPage.value = res.last_page || Math.max(1, Math.ceil(totalOrders.value / (perPage.value || 10)));
				console.log("Orders Variable:", orders.value);
			} else {
				errorMessage.value = res?.message || "فشل في جلب قائمة الطلبات";
				orders.value = [];
				totalOrders.value = 0;
				lastPage.value = 1;
			}
		} catch (err) {
			console.error("Error in useAdminOrders fetchOrders:", err);
			errorMessage.value = err.message || "حدث خطأ أثناء تحميل الطلبات";
			orders.value = [];
			totalOrders.value = 0;
			lastPage.value = 1;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* Fetch Single Order Details
	*/
	const fetchOrderDetails = async (orderId) => {
		isLoadingDetails.value = true;
		errorMessage.value = null;
		currentOrder.value = null;
		currentOrderDetails.value = [];
		const token = getToken();
		try {
			console.log("Fetching order details for ID:", orderId);
			const res = await adminOrdersApiService.fetchOrderDetails(token, orderId);
			console.log("Order details response:", res);
			if (res && (res.success || res.order)) {
				currentOrder.value = res.order || res;
				currentOrderDetails.value = res.details || res.order?.details || res.details || res.items || res.order_details || [];
				console.log("Final currentOrderDetails:", currentOrderDetails.value);
				return currentOrder.value;
			} else {
				errorMessage.value = res?.message || "تعذر العثور على بيانات الطلب";
				return null;
			}
		} catch (err) {
			console.error("Error in useAdminOrders fetchOrderDetails:", err);
			errorMessage.value = err.message || "حدث خطأ أثناء تحميل تفاصيل الطلب";
			return null;
		} finally {
			isLoadingDetails.value = false;
		}
	};
	/**
	* Quick Update Order Status
	*/
	const updateOrderStatus = async (orderId, newStatus) => {
		if (!orderId || !newStatus) return false;
		isUpdatingStatus.value = true;
		const token = getToken();
		try {
			const res = await adminOrdersApiService.updateOrderStatus(token, {
				order_id: orderId,
				order_status: newStatus
			});
			if (res.success) {
				toast.success(t("admin.common.success") || "تم التحديث بنجاح", res.message || "تم تحديث حالة الطلب بنجاح");
				const idx = orders.value.findIndex((o) => String(o.id) === String(orderId));
				if (idx !== -1) orders.value[idx].order_status = newStatus;
				if (currentOrder.value && String(currentOrder.value.id) === String(orderId)) currentOrder.value.order_status = newStatus;
				return true;
			} else {
				toast.error(t("admin.common.error") || "فشل التحديث", res.message || "تعذر تغيير حالة الطلب");
				return false;
			}
		} catch (err) {
			toast.error(t("admin.common.error") || "فشل التحديث", err.message || "حدث خطأ أثناء تحديث حالة الطلب");
			return false;
		} finally {
			isUpdatingStatus.value = false;
		}
	};
	/**
	* Quick Update Payment Status
	*/
	const updatePaymentStatus = async (orderId, newPaymentStatus) => {
		if (!orderId || !newPaymentStatus) return false;
		isUpdatingPayment.value = true;
		const token = getToken();
		try {
			const res = await adminOrdersApiService.updatePaymentStatus(token, {
				order_id: orderId,
				payment_status: newPaymentStatus
			});
			if (res.success) {
				toast.success(t("admin.common.success") || "تم التحديث بنجاح", res.message || "تم تحديث حالة الدفع بنجاح");
				const idx = orders.value.findIndex((o) => String(o.id) === String(orderId));
				if (idx !== -1) orders.value[idx].payment_status = newPaymentStatus;
				if (currentOrder.value && String(currentOrder.value.id) === String(orderId)) currentOrder.value.payment_status = newPaymentStatus;
				return true;
			} else {
				toast.error(t("admin.common.error") || "فشل التحديث", res.message || "تعذر تغيير حالة الدفع");
				return false;
			}
		} catch (err) {
			toast.error(t("admin.common.error") || "فشل التحديث", err.message || "حدث خطأ أثناء تحديث حالة الدفع");
			return false;
		} finally {
			isUpdatingPayment.value = false;
		}
	};
	const changePage = (page) => {
		if (page >= 1 && page <= lastPage.value) fetchOrders(page);
	};
	return {
		orders,
		currentOrder,
		currentOrderDetails,
		isLoading,
		isLoadingDetails,
		isUpdatingStatus,
		isUpdatingPayment,
		errorMessage,
		totalOrders,
		currentPage,
		perPage,
		lastPage,
		orderStatusFilter,
		paymentStatusFilter,
		searchQuery,
		fetchOrders,
		fetchOrderDetails,
		updateOrderStatus,
		updatePaymentStatus,
		changePage
	};
};

export { useAdminOrders as u };
//# sourceMappingURL=useAdminOrders-BL-HGdnF.mjs.map
