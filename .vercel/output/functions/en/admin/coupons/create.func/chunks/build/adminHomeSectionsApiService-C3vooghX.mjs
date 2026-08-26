import { g as useRuntimeConfig, $ as $fetch$2 } from '../virtual/entry.mjs';

//#region services/api.ts
/**
* Centralized API Client Service for Nuxt 3
* Automatically injects authentication tokens and multi-language localization headers on all HTTP requests.
*/
var getCurrentApiLocale = (localeInput) => {
	if (localeInput) {
		const clean = localeInput.trim();
		if (clean.toUpperCase() === "EN" || clean.toLowerCase() === "en") return "EN";
		if (clean.toLowerCase() === "sa" || clean.toLowerCase() === "ar") return "sa";
		return clean;
	}
	return "sa";
};
var getApiHeaders = (localeInput) => {
	const locale = getCurrentApiLocale(localeInput);
	const isEn = locale === "EN";
	return {
		"Content-Type": "application/json",
		"Accept": "application/json",
		"X-Requested-With": "XMLHttpRequest",
		"Accept-Language": isEn ? "en-US,en;q=0.9" : "ar-SA,ar;q=0.9",
		"X-localization": locale,
		"lang": locale,
		"X-Language": isEn ? "en" : "ar"
	};
};
var useApi = () => {
	let apiBase = "https:/ai-agunt.elbakry2.com/api/v1";
	try {
		const config = useRuntimeConfig();
		if (config?.public?.apiBase) apiBase = config.public.apiBase;
	} catch (e) {
		if (process.env.NUXT_PUBLIC_API_BASE) apiBase = process.env.NUXT_PUBLIC_API_BASE;
	}
	apiBase = apiBase.replace(/\/+$/, "");
	const request = async (url, options) => {
		const locale = getCurrentApiLocale(options?.locale);
		let cleanUrl = url;
		if (apiBase.endsWith("/api/v1") && cleanUrl.startsWith("/api/v1/")) cleanUrl = cleanUrl.substring(7);
		else if (apiBase.endsWith("/api/v1") && cleanUrl === "/api/v1") cleanUrl = "/";
		const params = {
			guest_id: "1",
			locale,
			...options?.params || {}
		};
		return $fetch$2(cleanUrl, {
			baseURL: apiBase,
			...options,
			params,
			headers: {
				...getApiHeaders(locale),
				...options?.headers
			}
		});
	};
	return {
		get: (url, options) => request(url, {
			...options,
			method: "GET"
		}),
		post: (url, body, options) => request(url, {
			...options,
			method: "POST",
			body
		}),
		put: (url, body, options) => request(url, {
			...options,
			method: "PUT",
			body
		}),
		delete: (url, options) => request(url, {
			...options,
			method: "DELETE"
		})
	};
};
//#endregion
//#region services/adminHomeSectionsApiService.ts
/**
* Admin Home Sections API Service Layer
* Live Endpoints:
* 1. GET    /api/v1/admin/home-sections
* 2. POST   /api/v1/admin/home-sections
* 3. PUT    /api/v1/admin/home-sections/{id}
* 4. DELETE /api/v1/admin/home-sections/{id}
* 5. POST   /api/v1/admin/home-sections/reorder
*/
var adminHomeSectionsApiService = {
	/**
	* Fetch all home sections for the admin panel
	*/
	async getSections() {
		const res = await useApi().get("/api/v1/admin/home-sections");
		let rawList = [];
		if (Array.isArray(res)) rawList = res;
		else if (res && Array.isArray(res.data)) rawList = res.data;
		else if (res && res.data && Array.isArray(res.data.sections)) rawList = res.data.sections;
		else if (res && res.data && Array.isArray(res.data.data)) rawList = res.data.data;
		else if (res && Array.isArray(res.sections)) rawList = res.sections;
		return rawList.map((sec, index) => {
			let sectionData = sec.data;
			if (typeof sectionData === "string") try {
				sectionData = JSON.parse(sectionData);
			} catch (e) {
				sectionData = {};
			}
			const realId = sec.id !== void 0 && sec.id !== null ? sec.id : sec.section_id !== void 0 && sec.section_id !== null ? sec.section_id : sec._id || null;
			const realType = sec.type || sectionData && sectionData.type || "hero_slider";
			return {
				...sec,
				id: realId,
				type: realType,
				sort_order: sec.sort_order !== void 0 ? Number(sec.sort_order) : index + 1,
				is_active: sec.is_active !== void 0 ? sec.is_active === 1 || sec.is_active === true || sec.is_active === "1" ? 1 : 0 : 1,
				data: sectionData || {}
			};
		}).sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
	},
	/**
	* Create a new section
	*/
	async createSection(payload) {
		const res = await useApi().post("/api/v1/admin/home-sections", {
			type: payload.type,
			is_active: payload.is_active !== void 0 ? payload.is_active ? 1 : 0 : 1,
			sort_order: payload.sort_order || 1,
			data: payload.data || {}
		});
		let createdItem = res;
		if (res && res.data && typeof res.data === "object" && !Array.isArray(res.data)) createdItem = res.data.section || res.data;
		else if (res && res.section && typeof res.section === "object") createdItem = res.section;
		return createdItem;
	},
	/**
	* Update an existing section
	*/
	async updateSection(id, payload) {
		const api = useApi();
		const body = {};
		if (payload.type !== void 0) body.type = payload.type;
		if (payload.is_active !== void 0) body.is_active = payload.is_active ? 1 : 0;
		if (payload.sort_order !== void 0) body.sort_order = payload.sort_order;
		if (payload.data !== void 0) body.data = payload.data;
		return await api.put(`/api/v1/admin/home-sections/${id}`, body);
	},
	/**
	* Save or Update a section (Auto-determines POST vs PUT based on database ID)
	*/
	async saveOrUpdateSection(id, payload) {
		if (!id || typeof id === "string" && (id.startsWith("sec-") || isNaN(Number(id)))) return await this.createSection(payload);
		else return await this.updateSection(id, payload);
	},
	/**
	* Delete a section
	*/
	async deleteSection(id) {
		return await useApi().delete(`/api/v1/admin/home-sections/${id}`);
	},
	/**
	* Reorder sections
	*/
	async reorderSections(orderedIds) {
		const api = useApi();
		const validSections = Array.isArray(orderedIds) && typeof orderedIds[0] === "object" ? orderedIds.filter((item) => item.id && !(typeof item.id === "string" && item.id.startsWith("sec-"))) : orderedIds.filter((id) => id && !(typeof id === "string" && id.startsWith("sec-"))).map((id, index) => ({
			id,
			sort_order: index + 1
		}));
		const ids = validSections.map((s) => s.id);
		if (ids.length === 0) return { status: true };
		return await api.post("/api/v1/admin/home-sections/reorder", {
			ids,
			sections: validSections
		});
	}
};

export { adminHomeSectionsApiService as a, useApi as u };
//# sourceMappingURL=adminHomeSectionsApiService-C3vooghX.mjs.map
