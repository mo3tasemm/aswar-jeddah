import { $ as $fetch$2 } from '../virtual/entry.mjs';

//#region services/adminCategoriesApiService.ts
/**
* Admin Categories API Service Layer with Multi-language Translation & FormData Support
* Live Endpoints:
* 1. GET    /api/v1/admin/categories/list?page={page}&searchValue={searchValue}&parent_id={parentId}&position={position}
* 2. POST   /api/v1/admin/categories/add
* 3. POST   /api/v1/admin/categories/update/{id}
* 4. DELETE /api/v1/admin/categories/delete/{id}
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
/**
* Normalizes category image or icon into a complete absolute URL
*/
function normalizeCategoryImageUrl(raw) {
	if (!raw) return "";
	if (typeof raw === "object") {
		if (raw.path) return String(raw.path);
		if (raw.url) return String(raw.url);
		if (raw.image_full_url?.path) return String(raw.image_full_url.path);
		if (raw.icon_full_url?.path) return String(raw.icon_full_url.path);
	}
	if (typeof raw === "string") {
		const trimmed = raw.trim();
		if (!trimmed || trimmed === "null" || trimmed === "undefined") return "";
		if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
		if (trimmed.startsWith("data:image/")) return trimmed;
		if (trimmed.startsWith("/")) return `https://wedgetstore.com${trimmed}`;
		return `https://wedgetstore.com/storage/app/public/category/${trimmed}`;
	}
	return "";
}
/**
* Universal Multi-Language Text Extractor Helper
*/
function extractMultiLangCategory(c) {
	if (!c) return {
		ar: "",
		en: ""
	};
	let ar = "";
	let en = "";
	if (c.name_ar) ar = String(c.name_ar).trim();
	if (c.name_en) en = String(c.name_en).trim();
	if (c.name && typeof c.name === "object" && !Array.isArray(c.name)) {
		if (!ar && c.name.ar) ar = String(c.name.ar).trim();
		if (!en && c.name.en) en = String(c.name.en).trim();
	}
	if (Array.isArray(c.translations)) c.translations.forEach((t) => {
		const locale = (t.locale || t.lang || t.language || "").toLowerCase();
		const key = (t.key || "").toLowerCase();
		if (!key || key === "name" || key === "title") {
			const val = (t.value || t.name || "").trim();
			if (locale === "ar" && !ar) ar = val;
			if (locale === "en" && !en) en = val;
		}
	});
	if (typeof c.name === "string" && c.name.trim()) {
		const raw = c.name.trim();
		if (/[\u0600-\u06FF]/.test(raw)) {
			if (!ar) ar = raw;
		} else if (!en) en = raw;
	}
	if (!ar && typeof c.name === "string") ar = c.name;
	if (!en) en = ar;
	return {
		ar,
		en
	};
}
/**
* Builds FormData payload for Admin Add/Update Category API
* Format required by Backend:
* - name[] (ar)
* - lang[] ('ar')
* - name[] (en)
* - lang[] ('en')
* - parent_id (0 for main category, parent ID for subcategory)
* - position (0 for main, 1 for sub)
* - image (File object)
*/
function buildCategoryFormData(payload) {
	const formData = new FormData();
	const nameAr = (payload.name_ar || "").trim();
	const nameEn = (payload.name_en || payload.name_ar || "").trim();
	const parentId = payload.parent_id !== void 0 && payload.parent_id !== null ? payload.parent_id : 0;
	const position = payload.position !== void 0 && payload.position !== null ? payload.position : Number(parentId) > 0 ? 1 : 0;
	formData.append("name", nameAr);
	formData.append("name[]", nameAr);
	formData.append("lang[]", "ar");
	formData.append("name[]", nameEn);
	formData.append("lang[]", "en");
	formData.append("parent_id", String(parentId));
	formData.append("position", String(position));
	if (payload.priority !== void 0 && payload.priority !== null) formData.append("priority", String(payload.priority));
	if (payload.imageFile && payload.imageFile instanceof File) formData.append("image", payload.imageFile);
	return formData;
}
var adminCategoriesApiService = {
	/**
	* 1. GET Admin Categories List with filters (searchValue, page, parent_id, position)
	*/
	async fetchCategories(token, searchValue = "", page = 1, options) {
		try {
			const queryParams = new URLSearchParams();
			if (searchValue) queryParams.append("searchValue", searchValue);
			if (page > 1) queryParams.append("page", String(page));
			if (options?.parent_id !== void 0 && options.parent_id !== null) queryParams.append("parent_id", String(options.parent_id));
			if (options?.position !== void 0 && options.position !== null) queryParams.append("position", String(options.position));
			queryParams.append("_t", String(Date.now()));
			const endpoint = `${API_BASE_URL}/admin/categories/list?${queryParams.toString()}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest",
					"Cache-Control": "no-cache, no-store, must-revalidate",
					"Pragma": "no-cache"
				},
				retry: 1,
				timeout: 1e4
			});
			let rawList = [];
			let totalCount = 0;
			if (Array.isArray(response)) {
				rawList = response;
				totalCount = response.length;
			} else if (response && typeof response === "object") {
				rawList = response.categories || response.data || response.list || [];
				totalCount = response.total || response.total_size || rawList.length;
			}
			return {
				success: true,
				data: rawList.map((c) => {
					const langData = extractMultiLangCategory(c);
					const childList = c.childes || c.sub_categories || c.subCategories || [];
					const rawImg = c.image_full_url || c.image || c.icon_full_url || c.icon;
					const rawIcon = c.icon_full_url || c.icon || c.image_full_url || c.image;
					return {
						id: c.id,
						name: langData.ar || langData.en || "قسم بدون اسم",
						name_ar: langData.ar,
						name_en: langData.en,
						slug: c.slug || `cat-${c.id}`,
						icon: normalizeCategoryImageUrl(rawIcon),
						image: normalizeCategoryImageUrl(rawImg),
						parent_id: c.parent_id !== void 0 ? c.parent_id : 0,
						position: c.position || 0,
						priority: c.priority || 1,
						productCount: c.product_count || c.products_count || c.product_counts || 0,
						subCategories: childList.map((sub) => {
							const subLang = extractMultiLangCategory(sub);
							const subImg = sub.image_full_url || sub.image || sub.icon_full_url || sub.icon;
							const subIcon = sub.icon_full_url || sub.icon || sub.image_full_url || sub.image;
							return {
								id: sub.id,
								name: subLang.ar || subLang.en || "",
								name_ar: subLang.ar,
								name_en: subLang.en,
								slug: sub.slug || `sub-${sub.id}`,
								parent_id: c.id,
								position: 1,
								priority: sub.priority || 1,
								icon: normalizeCategoryImageUrl(subIcon),
								image: normalizeCategoryImageUrl(subImg)
							};
						}),
						created_at: c.created_at || ""
					};
				}),
				total: totalCount
			};
		} catch (err) {
			console.warn("Admin fetchCategories Error:", err?.data?.message || err?.message || err);
			return {
				success: false,
				data: [],
				message: err?.data?.message || err?.message || "فشل جلب قائمة الأقسام."
			};
		}
	},
	/**
	* 1.1 GET Subcategories for a specific parent
	* GET /api/v1/admin/categories/list?position=1&parent_id={parentId}
	*/
	async fetchSubcategories(token, parentId) {
		return this.fetchCategories(token, "", 1, {
			parent_id: parentId,
			position: 1
		});
	},
	/**
	* 1.2 GET Category By ID with deep search across main categories and subcategories
	*/
	async fetchCategoryById(id, token) {
		const targetId = String(id).trim();
		if (!targetId) return {
			success: false,
			message: "معرف القسم غير صالح."
		};
		try {
			const mainRes = await this.fetchCategories(token, "", 1);
			if (mainRes.success && Array.isArray(mainRes.data)) {
				const found = mainRes.data.find((c) => String(c.id) === targetId);
				if (found) return {
					success: true,
					data: found
				};
				for (const parent of mainRes.data) if (Array.isArray(parent.subCategories) && parent.subCategories.length > 0) {
					const sub = parent.subCategories.find((s) => String(s.id) === targetId);
					if (sub) return {
						success: true,
						data: {
							...sub,
							parent_id: parent.id,
							position: 1
						}
					};
				}
			}
			const subRes = await this.fetchCategories(token, "", 1, { position: 1 });
			if (subRes.success && Array.isArray(subRes.data)) {
				const foundSub = subRes.data.find((c) => String(c.id) === targetId);
				if (foundSub) return {
					success: true,
					data: {
						...foundSub,
						position: 1
					}
				};
			}
			try {
				const publicRes = await $fetch$2(`${API_BASE_URL}/categories`, {
					method: "GET",
					headers: {
						"Accept": "application/json",
						"Accept-Language": "ar"
					},
					params: { guest_id: "1" },
					timeout: 8e3
				});
				const publicList = Array.isArray(publicRes) ? publicRes : publicRes?.data || [];
				for (const cat of publicList) {
					if (String(cat.id) === targetId) {
						const lang = extractMultiLangCategory(cat);
						const rawImg = cat.image_full_url || cat.image || cat.icon_full_url || cat.icon;
						return {
							success: true,
							data: {
								id: cat.id,
								name: lang.ar || lang.en,
								name_ar: lang.ar,
								name_en: lang.en,
								parent_id: cat.parent_id || 0,
								position: cat.position || 0,
								priority: cat.priority || 1,
								image: normalizeCategoryImageUrl(rawImg)
							}
						};
					}
					if (Array.isArray(cat.childes)) {
						for (const sub of cat.childes) if (String(sub.id) === targetId) {
							const subLang = extractMultiLangCategory(sub);
							const subImg = sub.image_full_url || sub.image || sub.icon_full_url || sub.icon;
							return {
								success: true,
								data: {
									id: sub.id,
									name: subLang.ar || subLang.en,
									name_ar: subLang.ar,
									name_en: subLang.en,
									parent_id: cat.id,
									position: 1,
									priority: sub.priority || 1,
									image: normalizeCategoryImageUrl(subImg)
								}
							};
						}
					}
				}
			} catch (publicErr) {
				console.warn("Public category tree search skipped:", publicErr);
			}
			return {
				success: false,
				message: `لم يتم العثور على قسم بالمعرف #${targetId}`
			};
		} catch (err) {
			return {
				success: false,
				message: err?.message || "فشل جلب بيانات القسم."
			};
		}
	},
	/**
	* 2. POST Add Admin Category (FormData)
	*/
	async addCategory(formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/categories/add`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: formData,
				timeout: 15e3
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				message: response?.message || "تم إضافة القسم الجديد بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin addCategory Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.data?.errors?.[0]?.message || err?.message || "فشل إضافة القسم."
			};
		}
	},
	/**
	* 3. POST Update Admin Category (FormData)
	*/
	async updateCategory(id, formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/categories/update/${id}`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: formData,
				timeout: 15e3
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				message: response?.message || "تم تحديث بيانات القسم بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin updateCategory Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.data?.errors?.[0]?.message || err?.message || "فشل تحديث بيانات القسم."
			};
		}
	},
	/**
	* 4. DELETE Admin Category (Main or Subcategory)
	*/
	async deleteCategory(id, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/categories/delete/${id}`;
			return {
				success: true,
				message: (await $fetch$2(endpoint, {
					method: "DELETE",
					headers: {
						"Authorization": `Bearer ${token}`,
						"Accept": "application/json",
						"Accept-Language": "ar",
						"X-Requested-With": "XMLHttpRequest"
					},
					timeout: 1e4
				}))?.message || "تم حذف القسم بنجاح."
			};
		} catch (err) {
			console.error("Admin deleteCategory Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل حذف القسم."
			};
		}
	}
};

export { adminCategoriesApiService as a, buildCategoryFormData as b };
//# sourceMappingURL=adminCategoriesApiService-nS8glRi_.mjs.map
