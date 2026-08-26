import { $ as $fetch$2 } from '../virtual/entry.mjs';
import { A as API_BASE_URL } from './apiConfig-CCR2eNes.mjs';

//#region services/adminNavbarApiService.ts
var extractMultiLangTitle = (item) => {
	let ar = item.title_ar || item.name_ar || "";
	let en = item.title_en || item.name_en || "";
	if (Array.isArray(item.translations) && item.translations.length > 0) item.translations.forEach((t) => {
		const locale = (t.locale || "").toLowerCase();
		const key = (t.key || "").toLowerCase();
		if (!key || key === "title" || key === "name") {
			const val = (t.value || t.title || t.name || "").trim();
			if (locale === "ar" && !ar) ar = val;
			if (locale === "en" && !en) en = val;
		}
	});
	const rawTitle = typeof item.title === "string" ? item.title.trim() : typeof item.name === "string" ? item.name.trim() : "";
	if (rawTitle) {
		if (/[\u0600-\u06FF]/.test(rawTitle)) {
			if (!ar) ar = rawTitle;
		} else if (!en) en = rawTitle;
	}
	if (!ar && rawTitle) ar = rawTitle;
	if (!en) en = ar || "Menu Item";
	return {
		ar,
		en
	};
};
var normalizeNavbarItem = (item, idx = 0) => {
	const lang = extractMultiLangTitle(item);
	const isAct = item.is_active !== void 0 ? item.is_active === 1 || item.is_active === true || item.is_active === "1" : item.status === 1 || item.status === true || item.status === "1" || item.status === void 0;
	const rawSubs = item.children || item.childes || item.sub_items || [];
	const mappedSubs = Array.isArray(rawSubs) ? rawSubs.map((sub, sIdx) => normalizeNavbarItem(sub, sIdx)) : [];
	return {
		id: item.id !== void 0 && item.id !== null ? item.id : `nav-${idx + 1}`,
		title: lang.ar || item.title || item.name || "عنصر قائمة",
		title_ar: lang.ar || item.title_ar || item.name_ar || item.title || "",
		title_en: lang.en || item.title_en || item.name_en || item.title || "",
		type: item.type || "link",
		url: item.url || item.link || "/",
		target: item.target === "_blank" ? "_blank" : "_self",
		parent_id: item.parent_id !== void 0 && item.parent_id !== null && item.parent_id !== 0 && item.parent_id !== "0" ? item.parent_id : null,
		badge: item.badge || item.badge_text || "",
		badge_color: item.badge_color || item.badgeColor || "",
		icon: item.icon || "",
		is_active: isAct ? 1 : 0,
		sort_order: item.sort_order !== void 0 ? Number(item.sort_order) : item.order !== void 0 ? Number(item.order) : idx + 1,
		children: mappedSubs,
		childes: mappedSubs
	};
};
var adminNavbarApiService = {
	/**
	* 1. GET Admin Navbar items list (Tree or Flat)
	*/
	async fetchNavbarItems(token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/navbar?_t=${Date.now()}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				retry: 1,
				timeout: 1e4
			});
			let rawList = [];
			if (Array.isArray(response)) rawList = response;
			else if (response && typeof response === "object") rawList = response.data || response.items || response.navbar || response.list || [];
			return {
				success: true,
				data: rawList.map((item, idx) => normalizeNavbarItem(item, idx))
			};
		} catch (err) {
			console.warn("[adminNavbarApiService] fetchNavbarItems fallback or error:", err);
			return {
				success: false,
				data: [],
				message: err.data?.message || err.message || "تعذر جلب عناصر الناف بار من الخادم"
			};
		}
	},
	/**
	* 2. POST Create new Navbar Item
	*/
	async createNavbarItem(token, payload) {
		try {
			const endpoint = `${API_BASE_URL}/admin/navbar`;
			const arTitle = (payload.title_ar || payload.title || "").trim();
			const enTitle = (payload.title_en || payload.title || payload.title_ar || "").trim();
			const body = {
				title: arTitle || enTitle,
				title_ar: arTitle,
				title_en: enTitle,
				name: arTitle || enTitle,
				name_ar: arTitle,
				name_en: enTitle,
				translations: [
					{
						locale: "ar",
						key: "title",
						value: arTitle
					},
					{
						locale: "en",
						key: "title",
						value: enTitle
					},
					{
						locale: "ar",
						key: "name",
						value: arTitle
					},
					{
						locale: "en",
						key: "name",
						value: enTitle
					}
				],
				type: payload.type || "link",
				url: payload.url || "/",
				target: payload.target || "_self",
				parent_id: payload.parent_id ? Number(payload.parent_id) : null,
				badge: payload.badge || null,
				badge_color: payload.badge_color || null,
				icon: payload.icon || null,
				is_active: payload.is_active ? 1 : 0,
				sort_order: payload.sort_order || 1
			};
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body
			});
			return {
				success: true,
				data: normalizeNavbarItem(response?.data || response?.item || response || body),
				message: response?.message || "تمت إضافة عنصر القائمة بنجاح"
			};
		} catch (err) {
			console.error("[adminNavbarApiService] createNavbarItem error:", err);
			throw err;
		}
	},
	/**
	* 3. PUT Update Navbar Item
	*/
	async updateNavbarItem(token, id, payload) {
		try {
			const endpoint = `${API_BASE_URL}/admin/navbar/${id}`;
			const arTitle = (payload.title_ar || payload.title || "").trim();
			const enTitle = (payload.title_en || payload.title || payload.title_ar || "").trim();
			const body = {
				title: arTitle || enTitle,
				title_ar: arTitle,
				title_en: enTitle,
				name: arTitle || enTitle,
				name_ar: arTitle,
				name_en: enTitle,
				translations: [
					{
						locale: "ar",
						key: "title",
						value: arTitle
					},
					{
						locale: "en",
						key: "title",
						value: enTitle
					},
					{
						locale: "ar",
						key: "name",
						value: arTitle
					},
					{
						locale: "en",
						key: "name",
						value: enTitle
					}
				],
				type: payload.type,
				url: payload.url,
				target: payload.target || "_self",
				parent_id: payload.parent_id ? Number(payload.parent_id) : null,
				badge: payload.badge,
				badge_color: payload.badge_color,
				icon: payload.icon,
				is_active: payload.is_active !== void 0 ? payload.is_active ? 1 : 0 : void 0,
				sort_order: payload.sort_order
			};
			const response = await $fetch$2(endpoint, {
				method: "PUT",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Content-Type": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body
			});
			return {
				success: true,
				data: normalizeNavbarItem(response?.data || response?.item || response || body),
				message: response?.message || "تم تعديل عنصر القائمة بنجاح"
			};
		} catch (err) {
			console.error("[adminNavbarApiService] updateNavbarItem error:", err);
			throw err;
		}
	},
	/**
	* 4. DELETE Navbar Item (supports multiple endpoint patterns)
	*/
	async deleteNavbarItem(token, id) {
		const cleanId = String(id).trim();
		const endpoints = [
			{
				url: `${API_BASE_URL}/admin/navbar/${cleanId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/navbar/delete/${cleanId}`,
				method: "DELETE"
			},
			{
				url: `${API_BASE_URL}/admin/navbar/delete/${cleanId}`,
				method: "POST"
			},
			{
				url: `${API_BASE_URL}/admin/navbar/${cleanId}`,
				method: "POST",
				body: { _method: "DELETE" }
			}
		];
		let lastError = null;
		for (const ep of endpoints) try {
			return {
				success: true,
				message: (await $fetch$2(ep.url, {
					method: ep.method,
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					},
					body: ep.body || void 0,
					timeout: 1e4
				}))?.message || "تم حذف العنصر بنجاح"
			};
		} catch (err) {
			lastError = err;
			if (err.status === 404 || err.status === 405 || err.statusCode === 404 || err.statusCode === 405) continue;
			if (err.response?.status === 200 || err.response?.status === 204) return {
				success: true,
				message: "تم حذف العنصر بنجاح"
			};
		}
		if (typeof id === "string" && (id.startsWith("nav-") || isNaN(Number(id)))) return {
			success: true,
			message: "تم حذف العنصر بنجاح"
		};
		if (lastError) {
			console.error("[adminNavbarApiService] deleteNavbarItem error:", lastError);
			throw lastError;
		}
		return {
			success: true,
			message: "تم حذف العنصر بنجاح"
		};
	},
	/**
	* 5. POST Reorder Navbar Items
	*/
	async reorderNavbarItems(token, items) {
		try {
			const endpoint = `${API_BASE_URL}/admin/navbar/reorder`;
			const payload = items.map((item, idx) => {
				if (typeof item === "object" && item !== null) return {
					id: item.id,
					sort_order: item.sort_order || idx + 1
				};
				return {
					id: item,
					sort_order: idx + 1
				};
			});
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "POST",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					},
					body: {
						items: payload,
						ids: payload.map((p) => p.id)
					}
				}))?.message || "تم تحديث الترتيب بنجاح"
			};
		} catch (err) {
			console.error("[adminNavbarApiService] reorderNavbarItems error:", err);
			throw err;
		}
	}
};

export { adminNavbarApiService as a };
//# sourceMappingURL=adminNavbarApiService-D0ZIw4fK.mjs.map
