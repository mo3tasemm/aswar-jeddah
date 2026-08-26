import { u as useCookie, a as useToast } from '../virtual/entry.mjs';
import { ref } from 'vue';

//#region services/adminRolesAndAdminsService.ts
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var AVAILABLE_MODULES = [
	{
		key: "dashboard",
		nameAr: "لوحة التحكم والمؤشرات",
		nameEn: "Dashboard & Analytics",
		description: "عرض الإحصائيات العامة والمبيعات"
	},
	{
		key: "order_management",
		nameAr: "إدارة الطلبات",
		nameEn: "Order Management",
		description: "عرض وتعديل وتحديث حالات الطلبات"
	},
	{
		key: "product_management",
		nameAr: "إدارة المنتجات",
		nameEn: "Product Management",
		description: "إضافة وتعديل وحذف المنتجات والمخزون"
	},
	{
		key: "category_management",
		nameAr: "إدارة الأقسام والتصنيفات",
		nameEn: "Category Management",
		description: "تنظيم التصنيفات الرئيسية والفرعية"
	},
	{
		key: "brand_management",
		nameAr: "إدارة العلامات التجارية",
		nameEn: "Brand Management",
		description: "إدارة الماركات والبراندات"
	},
	{
		key: "attribute_management",
		nameAr: "إدارة الخصائص والألوان",
		nameEn: "Attributes & Colors",
		description: "السمات، المقاسات، وخيارات الألوان"
	},
	{
		key: "customer_management",
		nameAr: "إدارة العملاء",
		nameEn: "Customer Management",
		description: "حسابات العملاء، المحافظ، ونقاط الولاء"
	},
	{
		key: "coupon_management",
		nameAr: "إدارة الكوبونات والخصومات",
		nameEn: "Coupon Management",
		description: "إنشاء وتفعيل أكواد وقسائم الخصم"
	},
	{
		key: "report_management",
		nameAr: "التقارير المالية والتحليلات",
		nameEn: "Reports & Analytics",
		description: "تقارير المبيعات وحركة المتجر"
	},
	{
		key: "employee_management",
		nameAr: "إدارة المشرفين والأدوار",
		nameEn: "Admins & Staff Management",
		description: "صلاحيات المشرفين وتعيين الأدوار"
	},
	{
		key: "system_settings",
		nameAr: "إعدادات النظام والمتجر",
		nameEn: "System Settings",
		description: "بيانات المتجر، الشحن، وطرق الدفع"
	}
];
var buildHeaders = (token, isJson = true) => {
	const headers = {
		Accept: "application/json",
		"X-Client-Type": "admin",
		zoneId: "1"
	};
	if (token) headers.Authorization = `Bearer ${token}`;
	if (isJson) headers["Content-Type"] = "application/json";
	return headers;
};
/**
* Parse server validation and error responses
*/
var parseServerApiError = (json, status, defaultMsg = "فشلت العملية") => {
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
	if (msgLower.includes("email") && (msgLower.includes("unique") || msgLower.includes("already exists") || msgLower.includes("taken"))) {
		errors.email = ["البريد الإلكتروني مسجل مسبقاً لمشرف آخر"];
		message = "البريد الإلكتروني مسجل مسبقاً! يرجى استخدام بريد آخر.";
	}
	if (msgLower.includes("phone") && (msgLower.includes("unique") || msgLower.includes("already exists") || msgLower.includes("taken"))) {
		errors.phone = ["رقم الهاتف مسجل مسبقاً لمشرف آخر"];
		message = "رقم الهاتف مسجل مسبقاً! يرجى إدخال رقم هاتف آخر.";
	}
	return {
		message,
		errors
	};
};
var adminRolesAndAdminsService = {
	/**
	* Fetch All Roles
	* GET /api/v1/admin/roles/list or /custom-role/list
	*/
	async fetchRoles(token) {
		const candidateUrls = [
			`${API_BASE_URL}/admin/roles/list?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/custom-role/list?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/roles?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/custom-role?_t=${Date.now()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) continue;
			const raw = await response.json();
			let rawList = [];
			if (Array.isArray(raw)) rawList = raw;
			else if (raw && typeof raw === "object") {
				if (Array.isArray(raw.roles)) rawList = raw.roles;
				else if (Array.isArray(raw.data)) rawList = raw.data;
				else if (raw.roles && Array.isArray(raw.roles.data)) rawList = raw.roles.data;
				else if (raw.data && Array.isArray(raw.data.roles)) rawList = raw.data.roles;
				else if (raw.data && Array.isArray(raw.data.data)) rawList = raw.data.data;
			}
			return {
				success: true,
				roles: rawList.map((item) => {
					if (!item) return null;
					let parsedModules = [];
					if (Array.isArray(item.modules)) parsedModules = item.modules.map(String);
					else if (Array.isArray(item.module_access)) parsedModules = item.module_access.map(String);
					else if (typeof item.module_access === "string") try {
						const p = JSON.parse(item.module_access);
						if (Array.isArray(p)) parsedModules = p.map(String);
					} catch {
						parsedModules = item.module_access.split(",").map((s) => s.trim()).filter(Boolean);
					}
					return {
						id: item.id,
						name: item.name || item.role_name || `دور #${item.id}`,
						modules: parsedModules,
						module_access: parsedModules,
						admins_count: Number(item.admins_count || item.users_count || item.employee_count || 0),
						status: item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1,
						created_at: item.created_at || "",
						updated_at: item.updated_at || ""
					};
				}).filter((r) => r !== null),
				available_modules: raw.available_modules || raw.modules || AVAILABLE_MODULES
			};
		} catch (err) {}
		return {
			success: false,
			roles: [],
			message: "فشل في جلب قائمة الأدوار"
		};
	},
	/**
	* Fetch Single Role Details
	*/
	async fetchRoleDetails(token, roleId) {
		const candidateUrls = [
			`${API_BASE_URL}/admin/custom-role/details/${roleId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/roles/details/${roleId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/custom-role/edit/${roleId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/roles/edit/${roleId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/roles/${roleId}?_t=${Date.now()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) continue;
			const raw = await response.json();
			const item = raw.role || raw.custom_role || raw.data?.role || raw.data || raw;
			if (item && (item.id || item.name)) {
				let parsedModules = [];
				if (Array.isArray(item.modules)) parsedModules = item.modules.map(String);
				else if (Array.isArray(item.module_access)) parsedModules = item.module_access.map(String);
				else if (typeof item.module_access === "string") try {
					const p = JSON.parse(item.module_access);
					if (Array.isArray(p)) parsedModules = p.map(String);
				} catch {
					parsedModules = item.module_access.split(",").map((s) => s.trim()).filter(Boolean);
				}
				return {
					success: true,
					role: {
						id: item.id || roleId,
						name: item.name || item.role_name || "",
						modules: parsedModules,
						module_access: parsedModules,
						admins_count: Number(item.admins_count || item.users_count || 0),
						status: item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1,
						created_at: item.created_at || "",
						updated_at: item.updated_at || ""
					}
				};
			}
		} catch (err) {}
		try {
			const found = (await this.fetchRoles(token)).roles.find((r) => String(r.id) === String(roleId));
			if (found) return {
				success: true,
				role: found
			};
		} catch {}
		return {
			success: false,
			role: null,
			message: "تعذر العثور على بيانات الدور الوظيفي"
		};
	},
	/**
	* Create New Role
	* POST /api/v1/admin/roles/store or /custom-role/store or /custom-role/create
	*/
	async createRole(token, payload) {
		const candidateEndpoints = [
			`${API_BASE_URL}/admin/roles/store`,
			`${API_BASE_URL}/admin/custom-role/store`,
			`${API_BASE_URL}/admin/custom-role/create`,
			`${API_BASE_URL}/admin/custom-role/add-new`,
			`${API_BASE_URL}/admin/roles/create`
		];
		const bodyData = {
			name: payload.name.trim(),
			role_name: payload.name.trim(),
			modules: payload.modules || [],
			module_access: payload.modules || [],
			status: payload.status === false || payload.status === 0 ? 0 : 1
		};
		let parsed = {
			message: "فشل في إضافة الدور",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep, {
				method: "POST",
				headers: buildHeaders(token, true),
				body: JSON.stringify(bodyData)
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminRolesAndAdminsService] createRole (${ep}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تم إنشاء الدور الوظيفي بنجاح!",
				data: json.data || json.role
			};
			parsed = parseServerApiError(json, res.status, "فشل في إضافة الدور");
			if (res.status === 422 || parsed.errors && Object.keys(parsed.errors).length > 0) return {
				success: false,
				message: parsed.message,
				errors: parsed.errors
			};
		} catch (err) {
			parsed.message = err.message || parsed.message;
		}
		return {
			success: false,
			message: parsed.message,
			errors: parsed.errors
		};
	},
	/**
	* Update Existing Role
	* PUT or POST /api/v1/admin/roles/update/{id} or /custom-role/update/{id}
	*/
	async updateRole(token, roleId, payload) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/roles/update/${roleId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/roles/update/${roleId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/custom-role/update/${roleId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/custom-role/update/${roleId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/custom-role/update`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/roles/store`,
				method: "POST"
			}
		];
		const bodyData = {
			id: roleId,
			name: payload.name.trim(),
			role_name: payload.name.trim(),
			modules: payload.modules || [],
			module_access: payload.modules || [],
			status: payload.status === false || payload.status === 0 ? 0 : 1
		};
		let parsed = {
			message: "فشل في تعديل الدور",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, true),
				body: JSON.stringify(bodyData)
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminRolesAndAdminsService] updateRole (${ep.method} ${ep.url}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تم تعديل الدور الوظيفي بنجاح!",
				data: json.data || json.role
			};
			parsed = parseServerApiError(json, res.status, "فشل في تعديل الدور");
			if (res.status === 422 || parsed.errors && Object.keys(parsed.errors).length > 0) return {
				success: false,
				message: parsed.message,
				errors: parsed.errors
			};
		} catch (err) {
			parsed.message = err.message || parsed.message;
		}
		return {
			success: false,
			message: parsed.message,
			errors: parsed.errors
		};
	},
	/**
	* Delete Role
	* DELETE /api/v1/admin/roles/delete/{id}
	*/
	async deleteRole(token, roleId) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/roles/delete/${roleId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/custom-role/delete/${roleId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/roles/delete/${roleId}`,
				method: "POST"
			}
		];
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, true),
				body: JSON.stringify({ id: roleId })
			});
			if (res.ok) return {
				success: true,
				message: (await res.json().catch(() => ({}))).message || "تم حذف الدور بنجاح!"
			};
		} catch (e) {}
		return {
			success: false,
			message: "فشل في حذف الدور الوظيفي"
		};
	},
	/**
	* Fetch Admins / Staff List
	* GET /api/v1/admin/admins/list or /staff/list or /employee/list
	*/
	async fetchAdmins(token, filters = {}) {
		const params = new URLSearchParams();
		if (filters.search) params.append("search", filters.search.trim());
		if (filters.role_id) params.append("role_id", String(filters.role_id));
		if (filters.status !== void 0 && filters.status !== "") params.append("status", String(filters.status));
		if (filters.page) params.append("page", String(filters.page));
		if (filters.limit) params.append("limit", String(filters.limit));
		params.append("_t", String(Date.now()));
		const candidateUrls = [
			`${API_BASE_URL}/admin/admins/list?${params.toString()}`,
			`${API_BASE_URL}/admin/staff/list?${params.toString()}`,
			`${API_BASE_URL}/admin/employee/list?${params.toString()}`,
			`${API_BASE_URL}/admin/admins?${params.toString()}`,
			`${API_BASE_URL}/admin/staff?${params.toString()}`
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
				totalCount = Number(raw.total_size ?? raw.total ?? 0);
				if (Array.isArray(raw.admins)) rawList = raw.admins;
				else if (Array.isArray(raw.staff)) rawList = raw.staff;
				else if (Array.isArray(raw.employees)) rawList = raw.employees;
				else if (Array.isArray(raw.data)) rawList = raw.data;
				else if (raw.data && Array.isArray(raw.data.admins)) rawList = raw.data.admins;
				else if (raw.data && Array.isArray(raw.data.staff)) rawList = raw.data.staff;
				else if (raw.data && Array.isArray(raw.data.employees)) rawList = raw.data.employees;
				else if (raw.data && Array.isArray(raw.data.data)) rawList = raw.data.data;
				if (totalCount === 0 && rawList.length > 0) totalCount = rawList.length;
			}
			const mapped = rawList.map((item) => {
				if (!item) return null;
				const fName = item.f_name || item.first_name || "";
				const lName = item.l_name || item.last_name || "";
				const fullName = item.name || `${fName} ${lName}`.trim() || "مشرف بدون اسم";
				const roleObj = item.role || item.admin_role || (item.role_name ? { name: item.role_name } : null);
				const roleTitle = roleObj?.name || item.role_name || (item.admin_role_id === 1 ? "مدير النظام (Super Admin)" : "مشرف");
				const statusVal = item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1 || item.is_active === true;
				return {
					id: item.id,
					name: fullName,
					f_name: fName,
					l_name: lName,
					email: item.email || "",
					phone: item.phone || item.mobile || "",
					admin_role_id: item.admin_role_id || item.role_id || roleObj?.id || "0",
					role_id: item.role_id || item.admin_role_id || roleObj?.id || "0",
					role_name: roleTitle,
					role: roleObj ? {
						id: roleObj.id || item.admin_role_id,
						name: roleTitle
					} : null,
					image: item.image || "",
					image_url: item.image_full_url?.path || item.image_url || (item.image ? `${API_BASE_URL.replace("/api/v1", "")}/storage/app/public/admin/${item.image}` : ""),
					status: statusVal ? 1 : 0,
					is_active: statusVal ? 1 : 0,
					created_at: item.created_at || ""
				};
			}).filter((u) => u !== null);
			return {
				success: true,
				admins: mapped,
				total: totalCount || mapped.length
			};
		} catch (err) {}
		return {
			success: false,
			admins: [],
			total: 0,
			message: "فشل في جلب قائمة المشرفين"
		};
	},
	/**
	* Fetch Single Admin Details
	*/
	async fetchAdminDetails(token, adminId) {
		const candidateUrls = [
			`${API_BASE_URL}/admin/admins/details/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/staff/details/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/employee/details/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/employee/edit/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/admins/edit/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/staff/edit/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/admins/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/staff/${adminId}?_t=${Date.now()}`,
			`${API_BASE_URL}/admin/employee/${adminId}?_t=${Date.now()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token, true)
			});
			if (!response.ok) continue;
			const raw = await response.json();
			const item = raw.admin || raw.employee || raw.staff || raw.data?.admin || raw.data?.employee || raw.data?.staff || raw.data || raw;
			if (item && (item.id || item.name || item.email || item.f_name)) {
				const fName = item.f_name || item.first_name || "";
				const lName = item.l_name || item.last_name || "";
				const fullName = item.name || `${fName} ${lName}`.trim() || "مشرف";
				const roleObj = item.role || item.admin_role || (item.role_name ? { name: item.role_name } : null);
				const roleTitle = roleObj?.name || item.role_name || (item.admin_role_id === 1 ? "مدير النظام (Super Admin)" : "مشرف");
				const statusVal = item.status === 1 || item.status === "1" || item.status === true || item.is_active === 1 || item.is_active === true;
				return {
					success: true,
					admin: {
						id: item.id || adminId,
						name: fullName,
						f_name: fName,
						l_name: lName,
						email: item.email || "",
						phone: item.phone || item.mobile || "",
						admin_role_id: item.admin_role_id || item.role_id || item.custom_role_id || roleObj?.id || "",
						role_id: item.role_id || item.admin_role_id || item.custom_role_id || roleObj?.id || "",
						role_name: roleTitle,
						role: roleObj ? {
							id: roleObj.id || item.admin_role_id,
							name: roleTitle
						} : null,
						image: item.image || "",
						image_url: item.image_full_url?.path || item.image_url || "",
						status: statusVal ? 1 : 0,
						is_active: statusVal ? 1 : 0,
						created_at: item.created_at || ""
					}
				};
			}
		} catch (err) {}
		try {
			const found = (await this.fetchAdmins(token, { limit: 100 })).admins.find((a) => String(a.id) === String(adminId));
			if (found) return {
				success: true,
				admin: found
			};
		} catch {}
		return {
			success: false,
			admin: null,
			message: "تعذر العثور على بيانات المشرف"
		};
	},
	/**
	* Create New Admin / Staff
	* POST /api/v1/admin/admins/store or /staff/store or /employee/store
	*/
	async createAdmin(token, payload) {
		const candidateEndpoints = [
			`${API_BASE_URL}/admin/admins/store`,
			`${API_BASE_URL}/admin/staff/store`,
			`${API_BASE_URL}/admin/employee/store`,
			`${API_BASE_URL}/admin/admins/create`,
			`${API_BASE_URL}/admin/employee/add-new`
		];
		const isFormData = payload.image instanceof File;
		let bodyData;
		if (isFormData) {
			const fd = new FormData();
			fd.append("name", payload.name.trim());
			if (payload.f_name) fd.append("f_name", payload.f_name);
			if (payload.l_name) fd.append("l_name", payload.l_name);
			fd.append("email", payload.email.trim());
			fd.append("phone", payload.phone.trim());
			fd.append("admin_role_id", String(payload.admin_role_id));
			fd.append("role_id", String(payload.admin_role_id));
			if (payload.password) fd.append("password", payload.password);
			fd.append("status", payload.status === 0 || payload.status === false ? "0" : "1");
			if (payload.image instanceof File) fd.append("image", payload.image);
			bodyData = fd;
		} else bodyData = JSON.stringify({
			name: payload.name.trim(),
			f_name: payload.f_name || payload.name.split(" ")[0] || "",
			l_name: payload.l_name || payload.name.split(" ").slice(1).join(" ") || "",
			email: payload.email.trim(),
			phone: payload.phone.trim(),
			admin_role_id: payload.admin_role_id,
			role_id: payload.admin_role_id,
			password: payload.password,
			status: payload.status === 0 || payload.status === false ? 0 : 1
		});
		let parsed = {
			message: "فشل في إضافة المشرف",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep, {
				method: "POST",
				headers: buildHeaders(token, !isFormData),
				body: bodyData
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminRolesAndAdminsService] createAdmin (${ep}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تمت إضافة المشرف بنجاح!",
				data: json.data || json.admin
			};
			parsed = parseServerApiError(json, res.status, "فشل في إضافة المشرف");
			if (res.status === 403 || res.status === 422 || Object.keys(parsed.errors).length > 0) return {
				success: false,
				message: parsed.message,
				errors: parsed.errors
			};
		} catch (err) {
			parsed.message = err.message || parsed.message;
		}
		return {
			success: false,
			message: parsed.message,
			errors: parsed.errors
		};
	},
	/**
	* Update Existing Admin
	* PUT /api/v1/admin/admins/update/{id} or /staff/update/{id}
	*/
	async updateAdmin(token, adminId, payload) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/admins/update/${adminId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/admins/update/${adminId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/staff/update/${adminId}`,
				method: "PUT"
			},
			{
				url: `${API_BASE_URL}/admin/staff/update/${adminId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/employee/update/${adminId}`,
				method: "POST"
			}
		];
		const isFormData = payload.image instanceof File;
		let bodyData;
		if (isFormData) {
			const fd = new FormData();
			fd.append("id", String(adminId));
			fd.append("name", payload.name.trim());
			if (payload.f_name) fd.append("f_name", payload.f_name);
			if (payload.l_name) fd.append("l_name", payload.l_name);
			fd.append("email", payload.email.trim());
			fd.append("phone", payload.phone.trim());
			fd.append("admin_role_id", String(payload.admin_role_id));
			fd.append("role_id", String(payload.admin_role_id));
			if (payload.password && payload.password.trim()) fd.append("password", payload.password.trim());
			fd.append("status", payload.status === 0 || payload.status === false ? "0" : "1");
			if (payload.image instanceof File) fd.append("image", payload.image);
			bodyData = fd;
		} else {
			const obj = {
				id: adminId,
				name: payload.name.trim(),
				f_name: payload.f_name || payload.name.split(" ")[0] || "",
				l_name: payload.l_name || payload.name.split(" ").slice(1).join(" ") || "",
				email: payload.email.trim(),
				phone: payload.phone.trim(),
				admin_role_id: payload.admin_role_id,
				role_id: payload.admin_role_id,
				status: payload.status === 0 || payload.status === false ? 0 : 1
			};
			if (payload.password && payload.password.trim()) obj.password = payload.password.trim();
			bodyData = JSON.stringify(obj);
		}
		let parsed = {
			message: "فشل في تعديل بيانات المشرف",
			errors: {}
		};
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, !isFormData),
				body: bodyData
			});
			const json = await res.json().catch(() => ({}));
			console.log(`[adminRolesAndAdminsService] updateAdmin (${ep.method} ${ep.url}) status:`, res.status, json);
			if ((res.status === 200 || res.status === 201 || res.ok) && json.success !== false) return {
				success: true,
				message: json.message || "تم تحديث بيانات المشرف بنجاح!",
				data: json.data || json.admin
			};
			parsed = parseServerApiError(json, res.status, "فشل في تعديل بيانات المشرف");
			if (res.status === 403 || res.status === 422 || Object.keys(parsed.errors).length > 0) return {
				success: false,
				message: parsed.message,
				errors: parsed.errors
			};
		} catch (err) {
			parsed.message = err.message || parsed.message;
		}
		return {
			success: false,
			message: parsed.message,
			errors: parsed.errors
		};
	},
	/**
	* Toggle Admin Status
	* POST /api/v1/admin/admins/status or /status-update
	*/
	async toggleAdminStatus(token, adminId, status) {
		const candidateEndpoints = [
			`${API_BASE_URL}/admin/admins/status`,
			`${API_BASE_URL}/admin/admins/status-update`,
			`${API_BASE_URL}/admin/staff/status`,
			`${API_BASE_URL}/admin/employee/status-update`
		];
		const statusVal = status ? 1 : 0;
		const bodyData = {
			id: adminId,
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
				message: (await res.json().catch(() => ({}))).message || "تم تحديث حالة المشرف بنجاح!"
			};
		} catch (e) {}
		return {
			success: false,
			message: "فشل في تحديث حالة المشرف"
		};
	},
	/**
	* Delete Admin
	* DELETE /api/v1/admin/admins/delete/{id}
	*/
	async deleteAdmin(token, adminId) {
		const candidateEndpoints = [
			{
				url: `${API_BASE_URL}/admin/admins/delete/${adminId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/staff/delete/${adminId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/employee/delete/${adminId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/admins/delete/${adminId}`,
				method: "POST"
			}
		];
		for (const ep of candidateEndpoints) try {
			const res = await fetch(ep.url, {
				method: ep.method,
				headers: buildHeaders(token, true),
				body: JSON.stringify({ id: adminId })
			});
			if (res.ok) return {
				success: true,
				message: (await res.json().catch(() => ({}))).message || "تم حذف المشرف بنجاح!"
			};
		} catch (e) {}
		return {
			success: false,
			message: "فشل في حذف المشرف"
		};
	}
};
//#endregion
//#region composables/useAdminRolesAndAdmins.ts
var useAdminRolesAndAdmins = () => {
	const toast = useToast();
	const adminCookie = useCookie("admin_token");
	const roles = ref([]);
	const currentRole = ref(null);
	const availableModules = ref(AVAILABLE_MODULES);
	const isLoadingRoles = ref(false);
	const isSavingRole = ref(false);
	const isDeletingRole = ref(false);
	const admins = ref([]);
	const currentAdmin = ref(null);
	const totalAdmins = ref(0);
	const isLoadingAdmins = ref(false);
	const isSavingAdmin = ref(false);
	const isUpdatingStatus = ref(false);
	const isDeletingAdmin = ref(false);
	const searchAdminQuery = ref("");
	const roleFilter = ref("");
	const statusFilter = ref("");
	const currentAdminPage = ref(1);
	const validationErrors = ref({});
	const errorMessage = ref("");
	const getToken = () => {
		if (adminCookie.value) return adminCookie.value;
		return "";
	};
	const fetchRoles = async () => {
		isLoadingRoles.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.fetchRoles(token);
			if (res.success) {
				roles.value = res.roles;
				if (res.available_modules && Array.isArray(res.available_modules) && res.available_modules.length > 0) availableModules.value = res.available_modules.map((m) => {
					if (typeof m === "string") return AVAILABLE_MODULES.find((mod) => mod.key === m) || {
						key: m,
						nameAr: m,
						nameEn: m
					};
					return {
						key: m.key || m.id || m.name,
						nameAr: m.nameAr || m.name || m.title || m.key,
						nameEn: m.nameEn || m.name || m.key,
						description: m.description || ""
					};
				});
				return res.roles;
			} else {
				roles.value = [];
				return [];
			}
		} catch (err) {
			console.error("Error fetching roles:", err);
			roles.value = [];
			return [];
		} finally {
			isLoadingRoles.value = false;
		}
	};
	const saveRole = async (payload, roleId) => {
		isSavingRole.value = true;
		validationErrors.value = {};
		errorMessage.value = "";
		const token = getToken();
		try {
			let res;
			if (roleId) res = await adminRolesAndAdminsService.updateRole(token, roleId, payload);
			else res = await adminRolesAndAdminsService.createRole(token, payload);
			if (res.success) {
				toast.showToast({
					type: "success",
					title: "تم بنجاح",
					message: res.message || (roleId ? "تم تعديل الدور الوظيفي بنجاح!" : "تم إنشاء الدور الوظيفي بنجاح!")
				});
				await fetchRoles();
				return true;
			} else {
				if (res.errors) validationErrors.value = res.errors;
				errorMessage.value = res.message || "يرجى تصحيح البيانات المدخلة";
				toast.showToast({
					type: "error",
					title: "فشل العملية",
					message: errorMessage.value
				});
				return false;
			}
		} catch (err) {
			errorMessage.value = err.message || "حدث خطأ غير متوقع";
			toast.showToast({
				type: "error",
				title: "خطأ",
				message: errorMessage.value
			});
			return false;
		} finally {
			isSavingRole.value = false;
		}
	};
	const fetchRoleDetails = async (roleId) => {
		isLoadingRoles.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.fetchRoleDetails(token, roleId);
			if (res.success && res.role) {
				currentRole.value = res.role;
				return res.role;
			}
			return null;
		} catch (err) {
			console.error("Error fetching role details:", err);
			return null;
		} finally {
			isLoadingRoles.value = false;
		}
	};
	const deleteRole = async (roleId) => {
		isDeletingRole.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.deleteRole(token, roleId);
			if (res.success) {
				roles.value = roles.value.filter((r) => String(r.id) !== String(roleId));
				toast.showToast({
					type: "success",
					title: "تم الحذف",
					message: res.message || "تم حذف الدور الوظيفي بنجاح!"
				});
				return true;
			} else {
				toast.showToast({
					type: "error",
					title: "تعذر الحذف",
					message: res.message || "لا يمكن حذف هذا الدور لوجود مشرفين مرتبطين به"
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
			isDeletingRole.value = false;
		}
	};
	const fetchAdmins = async (page = 1) => {
		isLoadingAdmins.value = true;
		currentAdminPage.value = page;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.fetchAdmins(token, {
				search: searchAdminQuery.value,
				role_id: roleFilter.value,
				status: statusFilter.value,
				page,
				limit: 20
			});
			if (res.success) {
				admins.value = res.admins;
				totalAdmins.value = res.total;
				return res.admins;
			} else {
				admins.value = [];
				totalAdmins.value = 0;
				return [];
			}
		} catch (err) {
			console.error("Error fetching admins:", err);
			admins.value = [];
			totalAdmins.value = 0;
			return [];
		} finally {
			isLoadingAdmins.value = false;
		}
	};
	const fetchAdminDetails = async (adminId) => {
		isLoadingAdmins.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.fetchAdminDetails(token, adminId);
			if (res.success && res.admin) {
				currentAdmin.value = res.admin;
				return res.admin;
			}
			return null;
		} catch (err) {
			console.error("Error fetching admin details:", err);
			return null;
		} finally {
			isLoadingAdmins.value = false;
		}
	};
	const saveAdmin = async (payload, adminId) => {
		isSavingAdmin.value = true;
		validationErrors.value = {};
		errorMessage.value = "";
		const token = getToken();
		try {
			let res;
			if (adminId) res = await adminRolesAndAdminsService.updateAdmin(token, adminId, payload);
			else res = await adminRolesAndAdminsService.createAdmin(token, payload);
			if (res.success) {
				toast.showToast({
					type: "success",
					title: "تم بنجاح",
					message: res.message || (adminId ? "تم تحديث بيانات المشرف بنجاح!" : "تمت إضافة المشرف بنجاح!")
				});
				await fetchAdmins(currentAdminPage.value);
				return true;
			} else {
				if (res.errors) validationErrors.value = res.errors;
				errorMessage.value = res.message || "يرجى مراجعة الحقول والبيانات المدخلة";
				toast.showToast({
					type: "error",
					title: "فشل العملية",
					message: errorMessage.value
				});
				return false;
			}
		} catch (err) {
			errorMessage.value = err.message || "حدث خطأ أثناء حفظ بيانات المشرف";
			toast.showToast({
				type: "error",
				title: "خطأ",
				message: errorMessage.value
			});
			return false;
		} finally {
			isSavingAdmin.value = false;
		}
	};
	const toggleAdminStatus = async (admin) => {
		const newStatus = admin.status ? 0 : 1;
		isUpdatingStatus.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.toggleAdminStatus(token, admin.id, newStatus);
			if (res.success) {
				admin.status = newStatus;
				admin.is_active = newStatus;
				toast.showToast({
					type: "success",
					title: "تم التحديث",
					message: newStatus ? "تم تفعيل حساب المشرف بنجاح!" : "تم تعطيل حساب المشرف بنجاح!"
				});
				return true;
			} else {
				toast.showToast({
					type: "error",
					title: "خطأ",
					message: res.message || "فشل في تحديث حالة المشرف"
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
	const deleteAdmin = async (adminId) => {
		isDeletingAdmin.value = true;
		const token = getToken();
		try {
			const res = await adminRolesAndAdminsService.deleteAdmin(token, adminId);
			if (res.success) {
				admins.value = admins.value.filter((a) => String(a.id) !== String(adminId));
				totalAdmins.value = Math.max(0, totalAdmins.value - 1);
				toast.showToast({
					type: "success",
					title: "تم الحذف",
					message: res.message || "تم حذف المشرف بنجاح!"
				});
				return true;
			} else {
				toast.showToast({
					type: "error",
					title: "تعذر الحذف",
					message: res.message || "فشل في حذف حساب المشرف"
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
			isDeletingAdmin.value = false;
		}
	};
	return {
		roles,
		currentRole,
		availableModules,
		isLoadingRoles,
		isSavingRole,
		isDeletingRole,
		fetchRoles,
		fetchRoleDetails,
		saveRole,
		deleteRole,
		admins,
		currentAdmin,
		totalAdmins,
		isLoadingAdmins,
		isSavingAdmin,
		isUpdatingStatus,
		isDeletingAdmin,
		searchAdminQuery,
		roleFilter,
		statusFilter,
		currentAdminPage,
		fetchAdmins,
		fetchAdminDetails,
		saveAdmin,
		toggleAdminStatus,
		deleteAdmin,
		validationErrors,
		errorMessage
	};
};

export { useAdminRolesAndAdmins as u };
//# sourceMappingURL=useAdminRolesAndAdmins-DKcWDju0.mjs.map
