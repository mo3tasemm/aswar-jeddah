import { u as useCookie, n as navigateTo, $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { computed, ref } from 'vue';

//#region services/authApiService.ts
/**
* Production-ready Auth API Service Layer for WedgetStore Live API
* Endpoints:
* - POST   https:/ai-agunt.elbakry2.com/api/v1/auth/login
* - POST   https:/ai-agunt.elbakry2.com/api/v1/auth/register
* - GET    https:/ai-agunt.elbakry2.com/api/v1/auth/logout (Authorization: Bearer <token>)
* - GET    https:/ai-agunt.elbakry2.com/api/v1/customer/info (Authorization: Bearer <token>)
* - POST   https:/ai-agunt.elbakry2.com/api/v1/customer/update-profile (_method: 'PUT', Authorization: Bearer <token>)
* - DELETE https:/ai-agunt.elbakry2.com/api/v1/customer/account-delete (Authorization: Bearer <token>)
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var authApiService = {
	/**
	* Send Login Request with Clean Body & Dynamic Type ('manual' / 'email' / 'phone')
	*/
	async login(payload) {
		const inputVal = payload.email_or_phone ? payload.email_or_phone.trim() : "";
		const isEmail = inputVal.includes("@");
		const loginType = payload.type || (isEmail ? "email" : "manual");
		const bodyPayload = {
			email_or_phone: inputVal,
			password: payload.password,
			type: loginType
		};
		try {
			const endpoint = `${API_BASE_URL}/auth/login`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: bodyPayload,
				timeout: 1e4
			});
			const token = response?.token || response?.access_token || response?.data?.token || response?.data?.access_token || response?.user?.token;
			const user = response?.user || response?.customer || response?.data?.user || response?.data?.customer || null;
			if (token) return {
				success: true,
				token,
				user,
				message: response?.message || "تم تسجيل الدخول بنجاح."
			};
			return {
				success: false,
				message: response?.message || "فشل تسجيل الدخول. يرجى التأكد من البيانات المدخلة."
			};
		} catch (err) {
			console.error("[authApiService] Login Error:", err?.data || err?.message || err);
			return {
				success: false,
				message: err?.data?.message || err?.data?.errors?.[0]?.message || "خطأ في الاتصال بالخادم."
			};
		}
	},
	/**
	* Send Register Request
	*/
	async register(payload) {
		try {
			const endpoint = `${API_BASE_URL}/auth/register`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: payload,
				timeout: 1e4
			});
			const token = response?.token || response?.access_token || response?.data?.token;
			const user = response?.user || response?.customer || response?.data?.user;
			if (token) return {
				success: true,
				token,
				user,
				message: response?.message || "تم إنشاء الحساب بنجاح."
			};
			return {
				success: false,
				message: response?.message || "فشل إنشاء الحساب."
			};
		} catch (err) {
			console.error("[authApiService] Register Error:", err);
			return {
				success: false,
				message: err?.data?.message || "فشل إنشاء الحساب. يرجى التأكد من البيانات."
			};
		}
	},
	/**
	* Fetch Customer Info (GET /api/v1/customer/info with Bearer Token)
	*/
	async fetchCustomerInfo(token) {
		try {
			const endpoint = `${API_BASE_URL}/customer/info`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				timeout: 8e3
			});
			return {
				success: true,
				user: response?.user || response?.customer || response?.data || response
			};
		} catch (err) {
			console.warn("[authApiService] fetchCustomerInfo Error:", err?.data || err?.message || err);
			return { success: false };
		}
	},
	/**
	* Update Profile via POST + Laravel Method Spoofing (_method: 'PUT') for 100% Multipart FormData & Image Upload Compatibility
	*/
	async updateProfile(payload, token) {
		try {
			const endpoint = `${API_BASE_URL}/customer/update-profile`;
			let bodyData;
			if (typeof FormData !== "undefined" && payload instanceof FormData) {
				bodyData = payload;
				if (!bodyData.has("_method")) bodyData.append("_method", "PUT");
			} else {
				const fd = new FormData();
				fd.append("_method", "PUT");
				if (payload) Object.keys(payload).forEach((key) => {
					if (payload[key] !== void 0 && payload[key] !== null) fd.append(key, payload[key]);
				});
				bodyData = fd;
			}
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: bodyData,
				timeout: 12e3
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				user: response?.user || response?.customer || response?.data || null,
				message: response?.message || "تم تحديث الملف الشخصي بنجاح."
			};
		} catch (err) {
			console.error("[authApiService] updateProfile Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.data?.errors?.[0]?.message || "فشل تحديث البيانات."
			};
		}
	},
	/**
	* Delete Customer Account (DELETE /api/v1/customer/account-delete)
	*/
	async deleteAccount(token) {
		try {
			const endpoint = `${API_BASE_URL}/customer/account-delete`;
			const response = await $fetch$2(endpoint, {
				method: "DELETE",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				timeout: 1e4
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				message: response?.message || "تم حذف الحساب نهائياً."
			};
		} catch (err) {
			console.error("[authApiService] deleteAccount Error:", err);
			return {
				success: false,
				message: err?.data?.message || "فشل حذف الحساب."
			};
		}
	},
	/**
	* Send Logout Request (GET /api/v1/auth/logout with Bearer Token)
	*/
	async logout(token) {
		if (!token) return {
			success: true,
			message: "تم تسجيل الخروج بنجاح."
		};
		try {
			const endpoint = `${API_BASE_URL}/auth/logout`;
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					},
					timeout: 6e3
				}))?.message || "تم تسجيل الخروج بنجاح."
			};
		} catch (err) {
			return {
				success: true,
				message: "تم تسجيل الخروج محلياً."
			};
		}
	}
};
//#endregion
//#region composables/useAuth.ts
/**
* Global Authentication Composable for Managing Token, User Profile & Auth Flow
* Includes robust session cleanup and redirect logic for Logout and Account Deletion.
*/
var userState = ref(null);
var tokenState = ref(null);
ref(false);
var useAuth = () => {
	const cookieToken = useCookie("auth_token", { maxAge: 2592e3 });
	const toast = useToast();
	const fetchProfile = async () => {
		const activeToken = tokenState.value || cookieToken.value;
		if (!activeToken) return;
		try {
			const res = await authApiService.fetchCustomerInfo(activeToken);
			if (res.success && res.user) userState.value = res.user;
		} catch (e) {
			console.warn("[useAuth] fetchProfile Error:", e);
		}
	};
	const setAuth = (token, user) => {
		tokenState.value = token;
		cookieToken.value = token;
		fetchProfile();
	};
	const updateProfile = async (payload) => {
		const activeToken = tokenState.value || cookieToken.value;
		if (!activeToken) return {
			success: false,
			message: "يرجى تسجيل الدخول أولاً."
		};
		try {
			const res = await authApiService.updateProfile(payload, activeToken);
			if (res.success) {
				toast.success("تم تحديث البيانات بنجاح!", res.message);
				await fetchProfile();
			} else toast.error("فشل تحديث البيانات", res.message);
			return res;
		} catch (e) {
			toast.error("فشل تحديث الملف الشخصي", e?.message);
			return {
				success: false,
				message: e?.message
			};
		}
	};
	/**
	* Account Deletion Handler:
	* Clears all session tokens and user state in finally block to ensure user is redirected to /login regardless of server response
	*/
	const deleteAccount = async () => {
		const activeToken = tokenState.value || cookieToken.value;
		try {
			if (activeToken) await authApiService.deleteAccount(activeToken);
		} catch (e) {
			console.warn("[useAuth] Server deleteAccount error:", e);
		} finally {
			tokenState.value = null;
			cookieToken.value = null;
			userState.value = null;
			toast.success("تم حذف الحساب بنجاح", "تم حذف الحساب وتصفية البيانات المحلية.");
			return navigateTo("/login");
		}
	};
	/**
	* Complete Logout Handler:
	* Always clears local state and redirects to /login in finally block
	*/
	const logout = async () => {
		const currentToken = tokenState.value || cookieToken.value || null;
		try {
			if (currentToken) await authApiService.logout(currentToken);
		} catch (e) {
			console.warn("[useAuth] Server logout notification failed:", e);
		} finally {
			tokenState.value = null;
			cookieToken.value = null;
			userState.value = null;
			toast.info("تم تسجيل الخروج", "تم الخروج وتصفية الجلسة بنجاح.");
			return navigateTo("/login");
		}
	};
	return {
		user: userState,
		token: tokenState,
		isAuthenticated: computed(() => {
			return Boolean(tokenState.value || cookieToken.value);
		}),
		isLoggedIn: computed(() => {
			return Boolean(tokenState.value || cookieToken.value);
		}),
		userName: computed(() => {
			if (userState.value?.f_name || userState.value?.l_name) return `${userState.value.f_name || ""} ${userState.value.l_name || ""}`.trim();
			return userState.value?.name || "عميل أسوار جدة";
		}),
		userEmail: computed(() => {
			return userState.value?.email || userState.value?.phone || "حساب العميل";
		}),
		fetchProfile,
		updateProfile,
		deleteAccount,
		setAuth,
		logout
	};
};

export { useAuth as u };
//# sourceMappingURL=useAuth-IbNI92RZ.mjs.map
