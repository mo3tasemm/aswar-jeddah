import { u as useCookie, a as useToast } from '../virtual/entry.mjs';
import { ref } from 'vue';

//#region services/adminCouponsApiService.ts
/**
* Admin Coupons API Service Layer
* Supported Endpoints:
* - GET /api/v1/admin/coupon/list or /api/v1/admin/coupons/list
* - GET /api/v1/admin/coupon/{id} or /api/v1/admin/coupon/details/{id}
* - POST /api/v1/admin/coupon/add or /api/v1/admin/coupon/store
* - POST /api/v1/admin/coupon/update/{id} or PUT /api/v1/admin/coupon/update/{id}
* - POST /api/v1/admin/coupon/status-update or /api/v1/admin/coupon/status
* - DELETE /api/v1/admin/coupon/delete/{id} or DELETE /api/v1/admin/coupon/{id}
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
/**
* Format headers with Token
*/
var buildHeaders = (token, isJson = true) => {
	const cleanToken = (token || "").replace(/^Bearer\s+/i, "").trim();
	const headers = {
		"Accept": "application/json",
		"X-Client-Type": "admin",
		"zoneId": "1"
	};
	if (cleanToken) headers["Authorization"] = `Bearer ${cleanToken}`;
	if (isJson) headers["Content-Type"] = "application/json";
	return headers;
};
/**
* Parse server validation and error responses from Laravel / 6valley
*/
var parseServerApiError = (json, status, defaultMsg = "فشل في حفظ الكوبون") => {
	let message = json?.message || json?.error || defaultMsg;
	const errors = {};
	if (json?.errors) {
		if (Array.isArray(json.errors)) json.errors.forEach((err) => {
			if (typeof err === "string") message = err;
			else if (err && typeof err === "object") {
				const key = err.code || err.key || "general";
				const msg = err.message || JSON.stringify(err);
				if (!errors[key]) errors[key] = [];
				errors[key].push(msg);
				if (message === defaultMsg) message = msg;
			}
		});
		else if (typeof json.errors === "object") {
			for (const [key, val] of Object.entries(json.errors)) if (Array.isArray(val)) errors[key] = val.map(String);
			else if (typeof val === "string") errors[key] = [val];
		}
	}
	const msgLower = String(message).toLowerCase();
	const isDuplicateCode = msgLower.includes("unique") || msgLower.includes("already exists") || errors.code && errors.code.some((e) => e.toLowerCase().includes("unique"));
	if (isDuplicateCode) {
		errors.code = ["كود الخصم مستخدم مسبقاً! يرجى اختيار كود آخر أو الضغط على زر \"توليد كود\"."];
		message = "كود الخصم مستخدم مسبقاً في النظام! يرجى إدخال كود جديد.";
	}
	if (status === 403 && !isDuplicateCode) message = json?.message || "ليس لديك الصلاحية لتنفيذ هذا الإجراء أو أن البيانات غير مطابقة.";
	return {
		message,
		errors
	};
};
var adminCouponsApiService = {
	/**
	* Fetch Coupons List
	*/
	async fetchCoupons(token, filters = {}) {
		const limit = filters.limit || 10;
		const offset = filters.offset !== void 0 ? filters.offset : filters.page || 1;
		const params = new URLSearchParams();
		params.append("limit", String(limit));
		params.append("offset", String(offset));
		params.append("page", String(offset));
		params.append("_t", String(Date.now()));
		if (filters.search && filters.search.trim()) params.append("search", filters.search.trim());
		if (filters.status !== void 0 && filters.status !== "") params.append("status", String(filters.status));
		if (filters.coupon_type && filters.coupon_type !== "all") params.append("coupon_type", filters.coupon_type);
		const candidateUrls = [
			`${API_BASE_URL}/admin/coupons/list?${params.toString()}`,
			`${API_BASE_URL}/admin/coupon/list?${params.toString()}`,
			`${API_BASE_URL}/admin/coupon?${params.toString()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) continue;
			const raw = await response.json();
			let rawList = [];
			let totalCount = 0;
			if (Array.isArray(raw)) {
				rawList = raw;
				totalCount = raw.length;
			} else if (raw && typeof raw === "object") {
				totalCount = Number(raw.total_size ?? raw.total ?? raw.coupons?.total ?? raw.data?.total ?? 0);
				if (Array.isArray(raw.coupons)) rawList = raw.coupons;
				else if (raw.coupons && Array.isArray(raw.coupons.data)) rawList = raw.coupons.data;
				else if (Array.isArray(raw.data)) rawList = raw.data;
				else if (raw.data && Array.isArray(raw.data.coupons)) rawList = raw.data.coupons;
				else if (raw.data && Array.isArray(raw.data.data)) rawList = raw.data.data;
				else if (Array.isArray(raw.items)) rawList = raw.items;
				if (totalCount === 0 && rawList.length > 0) totalCount = rawList.length;
			}
			const mappedCoupons = rawList.map((item) => {
				if (!item || typeof item !== "object") return null;
				const statusVal = item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1 || item.is_active === true;
				const expDate = item.expire_date ? String(item.expire_date).split("T")[0] : item.end_date ? String(item.end_date).split("T")[0] : "";
				let isExp = false;
				if (item.is_expired !== void 0) isExp = item.is_expired === 1 || item.is_expired === true || item.is_expired === "1";
				else if (expDate) try {
					const expTime = new Date(expDate).getTime();
					isExp = !isNaN(expTime) && expTime + 864e5 < Date.now();
				} catch {
					isExp = false;
				}
				return {
					id: item.id,
					title: item.title || item.code || "كوبون خصم",
					code: String(item.code || "").trim().toUpperCase(),
					coupon_type: item.coupon_type || item.type || "discount_on_purchase",
					discount_type: item.discount_type || "percent",
					discount: Number(item.discount || item.discount_value || 0),
					min_purchase: Number(item.min_purchase || item.min_order || 0),
					max_discount: Number(item.max_discount || 0),
					limit: Number(item.limit || item.usage_limit || 0),
					order_count: Number(item.order_count || item.times_used || item.usage_count || 0),
					start_date: item.start_date ? String(item.start_date).split("T")[0] : "",
					expire_date: expDate,
					is_expired: isExp,
					status: statusVal ? 1 : 0,
					customer_id: item.customer_id || "0",
					created_at: item.created_at || ""
				};
			}).filter((c) => c !== null);
			const lastPageNum = Number(raw.last_page || Math.max(1, Math.ceil(totalCount / limit)));
			return {
				success: true,
				coupons: mappedCoupons,
				data: mappedCoupons,
				total: totalCount || mappedCoupons.length,
				total_size: totalCount || mappedCoupons.length,
				last_page: lastPageNum,
				limit,
				offset
			};
		} catch (err) {}
		return {
			success: false,
			coupons: [],
			data: [],
			total: 0,
			total_size: 0,
			last_page: 1,
			limit,
			offset,
			message: "فشل في جلب قائمة الكوبونات"
		};
	},
	/**
	* Fetch Single Coupon Details
	*/
	async fetchCouponDetails(token, couponId) {
		const candidateUrls = [
			`${API_BASE_URL}/admin/coupons/details/${couponId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/coupon/details/${couponId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/coupon/${couponId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/coupon/edit/${couponId}?_t=${Date.now()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) continue;
			const raw = await response.json();
			const item = raw.coupon || raw.data?.coupon || raw.data || raw;
			if (item && (item.id || item.code)) {
				const statusVal = item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1 || item.is_active === true;
				const expDate = item.expire_date ? String(item.expire_date).split("T")[0] : item.end_date ? String(item.end_date).split("T")[0] : "";
				let isExp = false;
				if (item.is_expired !== void 0) isExp = item.is_expired === 1 || item.is_expired === true || item.is_expired === "1";
				else if (expDate) try {
					const expTime = new Date(expDate).getTime();
					isExp = !isNaN(expTime) && expTime + 864e5 < Date.now();
				} catch {
					isExp = false;
				}
				return {
					success: true,
					coupon: {
						id: item.id || couponId,
						title: item.title || item.code || "",
						code: String(item.code || "").trim().toUpperCase(),
						coupon_type: item.coupon_type || item.type || "discount_on_purchase",
						discount_type: item.discount_type || "percent",
						discount: Number(item.discount || item.discount_value || 0),
						min_purchase: Number(item.min_purchase || item.min_order || 0),
						max_discount: Number(item.max_discount || 0),
						limit: Number(item.limit || item.usage_limit || 0),
						order_count: Number(item.order_count || item.times_used || 0),
						start_date: item.start_date ? String(item.start_date).split("T")[0] : "",
						expire_date: expDate,
						is_expired: isExp,
						status: statusVal ? 1 : 0,
						customer_id: item.customer_id || "0",
						created_at: item.created_at || ""
					}
				};
			}
		} catch (e) {}
		try {
			const found = (await this.fetchCoupons(token, {
				limit: 100,
				search: String(couponId)
			})).coupons.find((c) => String(c.id) === String(couponId) || c.code.toLowerCase() === String(couponId).toLowerCase());
			if (found) return {
				success: true,
				coupon: found
			};
		} catch {}
		return {
			success: false,
			coupon: null,
			message: "تعذر العثور على بيانات الكوبون"
		};
	},
	/**
	* Create New Coupon
	* Target endpoint: POST /api/v1/admin/coupons/store
	*/
	async createCoupon(token, payload) {
		const candidateEndpoints = [`${API_BASE_URL}/admin/coupons/store`, `${API_BASE_URL}/admin/coupon/store`];
		const bodyData = {
			coupon_type: payload.coupon_type || "discount_on_purchase",
			title: payload.title,
			code: String(payload.code).trim().toUpperCase(),
			start_date: payload.start_date,
			expire_date: payload.expire_date,
			discount_type: payload.discount_type || "percent",
			discount: Number(payload.discount || 0),
			min_purchase: Number(payload.min_purchase || 0),
			max_discount: Number(payload.max_discount || 0),
			limit: Number(payload.limit || 0),
			status: payload.status ? 1 : 0,
			customer_id: payload.customer_id || "0"
		};
		let parsedResult = {
			message: "فشل في إضافة الكوبون",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep, {
				method: "POST",
				headers: buildHeaders(token, true),
				body: JSON.stringify(bodyData)
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminCouponsApiService] createCoupon (${ep}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تمت إضافة الكوبون بنجاح!",
				data: json.data || json.coupon
			};
			parsedResult = parseServerApiError(json, res.status, "فشل في إضافة الكوبون");
			if (res.status === 403 || res.status === 422 || parsedResult.errors.code) return {
				success: false,
				message: parsedResult.message,
				errors: parsedResult.errors
			};
		} catch (err) {
			console.error(`[adminCouponsApiService] createCoupon (${ep}) error:`, err);
			parsedResult.message = err.message || parsedResult.message;
		}
		return {
			success: false,
			message: parsedResult.message,
			errors: parsedResult.errors
		};
	},
	/**
	* Update Existing Coupon
	* Target endpoint: PUT or POST /api/v1/admin/coupons/update/{id}
	*/
	async updateCoupon(token, couponId, payload) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/coupons/update/${couponId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/coupons/update/${couponId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/coupon/update/${couponId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/coupon/update/${couponId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/coupons/store`,
				method: "POST"
			}
		];
		const bodyData = {
			id: couponId,
			coupon_id: couponId,
			coupon_type: payload.coupon_type || "discount_on_purchase",
			title: payload.title,
			code: String(payload.code).trim().toUpperCase(),
			start_date: payload.start_date,
			expire_date: payload.expire_date,
			discount_type: payload.discount_type || "percent",
			discount: Number(payload.discount || 0),
			min_purchase: Number(payload.min_purchase || 0),
			max_discount: Number(payload.max_discount || 0),
			limit: Number(payload.limit || 0),
			status: payload.status ? 1 : 0,
			customer_id: payload.customer_id || "0"
		};
		let parsedResult = {
			message: "فشل في تحديث الكوبون",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, true),
				body: JSON.stringify(bodyData)
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminCouponsApiService] updateCoupon (${ep.method} ${ep.url}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تم تحديث الكوبون بنجاح!",
				data: json.data || json.coupon
			};
			parsedResult = parseServerApiError(json, res.status, "فشل في تحديث الكوبون");
			if (res.status === 403 || res.status === 422 || parsedResult.errors.code) return {
				success: false,
				message: parsedResult.message,
				errors: parsedResult.errors
			};
		} catch (err) {
			console.error(`[adminCouponsApiService] updateCoupon (${ep.method} ${ep.url}) error:`, err);
			parsedResult.message = err.message || parsedResult.message;
		}
		return {
			success: false,
			message: parsedResult.message,
			errors: parsedResult.errors
		};
	},
	/**
	* Toggle Coupon Status (Active / Inactive)
	* POST /api/v1/admin/coupons/status-update
	*/
	async toggleCouponStatus(token, couponId, status) {
		const candidateEndpoints = [
			`${API_BASE_URL}/admin/coupons/status-update`,
			`${API_BASE_URL}/admin/coupon/status-update`,
			`${API_BASE_URL}/admin/coupon/status`
		];
		const statusVal = status ? 1 : 0;
		const bodyData = {
			id: couponId,
			coupon_id: couponId,
			status: statusVal,
			is_active: statusVal
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep, {
				method: "POST",
				headers: buildHeaders(token, true),
				body: JSON.stringify(bodyData)
			});
			if (res.ok) return {
				success: true,
				message: (await res.json().catch(() => ({}))).message || "تم تغيير حالة الكوبون بنجاح!"
			};
		} catch (e) {}
		return {
			success: false,
			message: "فشل في تحديث حالة الكوبون"
		};
	},
	/**
	* Delete Coupon
	* DELETE /api/v1/admin/coupons/delete/{id}
	*/
	async deleteCoupon(token, couponId) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/coupons/delete/${couponId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/coupons/delete/${couponId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/coupon/delete/${couponId}`,
				method: "DELETE"
			}
		];
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, true),
				body: JSON.stringify({ id: couponId })
			});
			if (res.ok) return {
				success: true,
				message: (await res.json().catch(() => ({}))).message || "تم حذف الكوبون بنجاح!"
			};
		} catch (e) {}
		return {
			success: false,
			message: "فشل في حذف الكوبون"
		};
	}
};
//#endregion
//#region composables/useAdminCoupons.ts
/**
* Composable for Admin Coupons Management
*/
var useAdminCoupons = () => {
	const adminCookie = useCookie("admin_token");
	const toast = useToast();
	const coupons = ref([]);
	const currentCoupon = ref(null);
	const isLoading = ref(false);
	const isLoadingDetails = ref(false);
	const isSubmitting = ref(false);
	const isUpdatingStatus = ref(false);
	const isDeleting = ref(false);
	const errorMessage = ref(null);
	const validationErrors = ref({});
	const totalCoupons = ref(0);
	const lastPage = ref(1);
	const currentPage = ref(1);
	const perPage = ref(10);
	const searchQuery = ref("");
	const statusFilter = ref("");
	const typeFilter = ref("all");
	const getToken = () => {
		if (adminCookie.value) return adminCookie.value;
		return "";
	};
	/**
	* Fetch Coupons List
	*/
	const fetchCoupons = async (page = currentPage.value) => {
		isLoading.value = true;
		errorMessage.value = null;
		currentPage.value = page;
		const token = getToken();
		const filters = {
			limit: perPage.value,
			offset: page,
			search: searchQuery.value,
			status: statusFilter.value,
			coupon_type: typeFilter.value
		};
		try {
			console.log("Fetching coupons with filters:", filters);
			const res = await adminCouponsApiService.fetchCoupons(token, filters);
			console.log("Coupons list response:", res);
			if (res && res.success) {
				coupons.value = res.coupons || res.data || [];
				totalCoupons.value = res.total_size || res.total || coupons.value.length || 0;
				lastPage.value = res.last_page || Math.max(1, Math.ceil(totalCoupons.value / (perPage.value || 10)));
				console.log("Assigned coupons.value:", coupons.value);
			} else {
				errorMessage.value = res?.message || "فشل في جلب قائمة الكوبونات";
				coupons.value = [];
				totalCoupons.value = 0;
				lastPage.value = 1;
			}
		} catch (err) {
			console.error("Error in useAdminCoupons fetchCoupons:", err);
			errorMessage.value = err.message || "حدث خطأ أثناء تحميل الكوبونات";
			coupons.value = [];
			totalCoupons.value = 0;
			lastPage.value = 1;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* Fetch Single Coupon Details
	*/
	const fetchCouponDetails = async (couponId) => {
		isLoadingDetails.value = true;
		errorMessage.value = null;
		currentCoupon.value = null;
		const token = getToken();
		try {
			console.log("Fetching coupon details for ID:", couponId);
			const res = await adminCouponsApiService.fetchCouponDetails(token, couponId);
			console.log("Coupon details response:", res);
			if (res && res.success && res.coupon) {
				currentCoupon.value = res.coupon;
				return res.coupon;
			} else {
				errorMessage.value = res?.message || "تعذر العثور على بيانات الكوبون";
				return null;
			}
		} catch (err) {
			console.error("Error in useAdminCoupons fetchCouponDetails:", err);
			errorMessage.value = err.message || "حدث خطأ أثناء تحميل تفاصيل الكوبون";
			return null;
		} finally {
			isLoadingDetails.value = false;
		}
	};
	/**
	* Create or Update Coupon
	*/
	const saveCoupon = async (payload, couponId) => {
		isSubmitting.value = true;
		validationErrors.value = {};
		const token = getToken();
		try {
			let res;
			if (couponId) res = await adminCouponsApiService.updateCoupon(token, couponId, payload);
			else res = await adminCouponsApiService.createCoupon(token, payload);
			if (res.success) {
				toast.showToast({
					type: "success",
					title: "تم بنجاح",
					message: res.message || (couponId ? "تم تعديل الكوبون بنجاح!" : "تمت إضافة الكوبون بنجاح!")
				});
				return true;
			} else {
				if (res.errors) validationErrors.value = res.errors;
				toast.showToast({
					type: "error",
					title: "فشل العملية",
					message: res.message || "يرجى مراجعة الحقول والبيانات المدخلة"
				});
				return false;
			}
		} catch (err) {
			toast.showToast({
				type: "error",
				title: "خطأ",
				message: err.message || "حدث خطأ أثناء إرسال البيانات"
			});
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	/**
	* Toggle Coupon Active Status
	*/
	const toggleCouponStatus = async (coupon) => {
		const newStatus = coupon.status ? 0 : 1;
		isUpdatingStatus.value = true;
		const token = getToken();
		try {
			const res = await adminCouponsApiService.toggleCouponStatus(token, coupon.id, newStatus);
			if (res.success) {
				coupon.status = newStatus;
				if (currentCoupon.value && String(currentCoupon.value.id) === String(coupon.id)) currentCoupon.value.status = newStatus;
				toast.showToast({
					type: "success",
					title: "تم التحديث",
					message: newStatus ? "تم تفعيل الكوبون بنجاح!" : "تم تعطيل الكوبون بنجاح!"
				});
				return true;
			} else {
				toast.showToast({
					type: "error",
					title: "خطأ",
					message: res.message || "فشل في تغيير حالة الكوبون"
				});
				return false;
			}
		} catch (err) {
			toast.showToast({
				type: "error",
				title: "خطأ",
				message: err.message || "حدث خطأ في الاتصال بالخادم"
			});
			return false;
		} finally {
			isUpdatingStatus.value = false;
		}
	};
	/**
	* Delete Coupon
	*/
	const deleteCoupon = async (couponId) => {
		isDeleting.value = true;
		const token = getToken();
		try {
			const res = await adminCouponsApiService.deleteCoupon(token, couponId);
			if (res.success) {
				coupons.value = coupons.value.filter((c) => String(c.id) !== String(couponId));
				totalCoupons.value = Math.max(0, totalCoupons.value - 1);
				toast.showToast({
					type: "success",
					title: "تم الحذف",
					message: res.message || "تم حذف الكوبون بنجاح!"
				});
				return true;
			} else {
				toast.showToast({
					type: "error",
					title: "خطأ",
					message: res.message || "فشل في حذف الكوبون"
				});
				return false;
			}
		} catch (err) {
			toast.showToast({
				type: "error",
				title: "خطأ",
				message: err.message || "حدث خطأ أثناء محاولة الحذف"
			});
			return false;
		} finally {
			isDeleting.value = false;
		}
	};
	/**
	* Generate Random Promo Code
	*/
	const generateRandomCode = (prefix = "ASWAR") => {
		const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
		let rand = "";
		for (let i = 0; i < 5; i++) rand += chars.charAt(Math.floor(Math.random() * 32));
		return `${prefix}-${rand}`;
	};
	const isExpired = (couponOrDate) => {
		if (!couponOrDate) return false;
		if (typeof couponOrDate === "object") {
			if (couponOrDate.is_expired !== void 0) return Boolean(couponOrDate.is_expired);
			return isExpired(couponOrDate.expire_date);
		}
		try {
			const exp = new Date(couponOrDate).getTime();
			if (isNaN(exp)) return false;
			return exp + 864e5 < Date.now();
		} catch {
			return false;
		}
	};
	const isCouponEffectivelyActive = (coupon) => {
		const isActive = coupon.status === 1 || coupon.status === true;
		const expired = isExpired(coupon);
		return isActive && !expired;
	};
	const changePage = (page) => {
		if (page >= 1 && page <= lastPage.value && page !== currentPage.value) fetchCoupons(page);
	};
	return {
		coupons,
		currentCoupon,
		isLoading,
		isLoadingDetails,
		isSubmitting,
		isUpdatingStatus,
		isDeleting,
		errorMessage,
		validationErrors,
		totalCoupons,
		lastPage,
		currentPage,
		perPage,
		searchQuery,
		statusFilter,
		typeFilter,
		fetchCoupons,
		fetchCouponDetails,
		saveCoupon,
		toggleCouponStatus,
		deleteCoupon,
		generateRandomCode,
		isExpired,
		isCouponEffectivelyActive,
		changePage
	};
};

export { useAdminCoupons as u };
//# sourceMappingURL=useAdminCoupons-D7s_TgM8.mjs.map
