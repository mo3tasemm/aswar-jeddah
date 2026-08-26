import { f as useAdminAuth, _ as _plugin_vue_export_helper_default, $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { R as RichTextEditor_default } from './RichTextEditor-UVwplTEi.mjs';
import { a as adminCategoriesApiService } from './adminCategoriesApiService-nS8glRi_.mjs';
import { B as BaseSelect_default } from './BaseSelect-mF2QR5Dg.mjs';
import { ref, defineComponent, watch, reactive, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderClass, ssrRenderStyle, ssrRenderAttr, ssrRenderComponent, ssrLooseContain } from 'vue/server-renderer';

//#region services/adminProductsApiService.ts
/**
* Admin Products API Service Layer with Multi-language Translation Support
* Live API Endpoints:
* 1. GET  /api/v1/admin/products/list?page={page}&limit={limit}
* 2. DELETE /api/v1/admin/products/delete/{id}
* 3. POST /api/v1/admin/products/add (Multipart FormData with binary files)
* 4. POST /api/v1/admin/products/update/{id} (Multipart FormData with binary files)
*
* NOTE: /api/v1/admin/products/upload-images is NOT a valid endpoint on this server.
* Images MUST be sent directly as binary files inside the add/update FormData request.
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
/**
* Normalizes product image url into a complete absolute URL
*/
function normalizeProductImageUrl(raw, isThumbnail = false) {
	if (!raw) return "";
	if (typeof raw === "object") {
		if (raw.path) return normalizeProductImageUrl(raw.path, isThumbnail);
		if (raw.url) return normalizeProductImageUrl(raw.url, isThumbnail);
		if (raw.image_full_url?.path) return normalizeProductImageUrl(raw.image_full_url.path, isThumbnail);
		if (raw.thumbnail_full_url?.path) return normalizeProductImageUrl(raw.thumbnail_full_url.path, true);
	}
	if (typeof raw === "string") {
		const trimmed = raw.trim();
		if (!trimmed || trimmed === "null" || trimmed === "undefined") return "";
		if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) return trimmed;
		if (trimmed.startsWith("data:image/") || trimmed.startsWith("blob:")) return trimmed;
		if (trimmed.startsWith("/")) return `https://wedgetstore.com${trimmed}`;
		const cleanName = extractCleanFilename(trimmed);
		if (isThumbnail) return `https://wedgetstore.com/storage/app/public/product/thumbnail/${cleanName}`;
		return `https://wedgetstore.com/storage/app/public/product/${cleanName}`;
	}
	return "";
}
/**
* Extracts pure filename from path or URL
*/
function extractCleanFilename(raw) {
	if (!raw) return "";
	const trimmed = raw.trim();
	if (trimmed.includes("/")) {
		const parts = trimmed.split("/");
		return parts[parts.length - 1] || trimmed;
	}
	return trimmed;
}
/**
* Universal Multi-Language Text Extractor Helper
* Extracts Arabic and English text from direct properties, nested objects, or translations arrays
*/
function extractMultiLangField(item, fieldName) {
	if (!item) return {
		ar: "",
		en: ""
	};
	let ar = "";
	let en = "";
	if (item[`${fieldName}_ar`]) ar = String(item[`${fieldName}_ar`]);
	if (item[`${fieldName}_en`]) en = String(item[`${fieldName}_en`]);
	const rawField = item[fieldName] || (fieldName === "description" ? item["details"] : null);
	if (rawField && typeof rawField === "object" && !Array.isArray(rawField)) {
		if (!ar && rawField.ar) ar = String(rawField.ar);
		if (!en && rawField.en) en = String(rawField.en);
	}
	if (Array.isArray(item.translations)) item.translations.forEach((t) => {
		const locale = (t.locale || t.lang || t.language || "").toLowerCase();
		const key = t.key || t.field_name;
		if (!key || key === fieldName || fieldName === "description" && key === "details") {
			const val = t.value || t.name || t.description || t.details || "";
			if (locale === "ar" && !ar) ar = String(val);
			if (locale === "en" && !en) en = String(val);
		}
	});
	if (!ar && typeof rawField === "string" && rawField) ar = rawField;
	if (!en) en = ar;
	return {
		ar,
		en
	};
}
/**
* Helper to parse backend error response from 6valley Laravel API
*/
function formatApiErrorMessage(err) {
	if (!err) return "حدث خطأ غير متوقع في الخادم.";
	if (err.data) {
		if (typeof err.data === "string") return err.data;
		if (Array.isArray(err.data.errors) && err.data.errors.length > 0) return err.data.errors.map((e) => e.message || e.code || JSON.stringify(e)).join(" - ");
		if (err.data.errors && typeof err.data.errors === "object") {
			const messages = Object.values(err.data.errors).flat();
			if (messages.length > 0) return messages.join(" - ");
		}
		if (err.data.message) return err.data.message;
	}
	return err.message || "فشل الاتصال بالخادم.";
}
/**
* Universal Mapper: Converts backend raw product JSON into complete ProductFormDataPayload
*/
function mapRawProductToFormData(p) {
	if (!p) return {};
	const nameData = extractMultiLangField(p, "name");
	const descData = extractMultiLangField(p, "description");
	let categoryId = p.category_id || "";
	let subCategoryId = p.sub_category_id || "";
	let subSubCategoryId = p.sub_sub_category_id || "";
	if (!categoryId && Array.isArray(p.category_ids)) {
		const mainCat = p.category_ids.find((c) => c.position === 1 || c.position === "1" || c.position === 0 || c.position === "0");
		const subCat = p.category_ids.find((c) => c.position === 2 || c.position === "2");
		const subSubCat = p.category_ids.find((c) => c.position === 3 || c.position === "3");
		if (mainCat) categoryId = mainCat.id;
		if (subCat) subCategoryId = subCat.id;
		if (subSubCat) subSubCategoryId = subSubCat.id;
	} else if (!categoryId && typeof p.category_ids === "string") try {
		const parsedCatIds = JSON.parse(p.category_ids);
		if (Array.isArray(parsedCatIds)) {
			if (parsedCatIds[0]?.id) categoryId = parsedCatIds[0].id;
			if (parsedCatIds[1]?.id) subCategoryId = parsedCatIds[1].id;
			if (parsedCatIds[2]?.id) subSubCategoryId = parsedCatIds[2].id;
		}
	} catch {}
	let colorsList = [];
	if (Array.isArray(p.colors)) colorsList = p.colors.map((c) => typeof c === "string" ? c.replace(/^#/, "").toUpperCase().trim() : c?.code ? String(c.code).replace(/^#/, "").toUpperCase().trim() : "").filter(Boolean);
	else if (typeof p.colors === "string" && p.colors.trim()) try {
		const parsedColors = JSON.parse(p.colors);
		if (Array.isArray(parsedColors)) colorsList = parsedColors.map((c) => typeof c === "string" ? c.replace(/^#/, "").toUpperCase().trim() : c?.code ? String(c.code).replace(/^#/, "").toUpperCase().trim() : "").filter(Boolean);
	} catch {
		colorsList = p.colors.split(",").map((c) => c.replace(/^#/, "").toUpperCase().trim()).filter(Boolean);
	}
	const safeJsonParse = (val) => {
		if (!val) return null;
		if (typeof val === "object") return val;
		if (typeof val === "string") try {
			let parsed = JSON.parse(val);
			if (typeof parsed === "string") try {
				parsed = JSON.parse(parsed);
			} catch {}
			return parsed;
		} catch {
			return null;
		}
		return null;
	};
	let choiceAttributes = [];
	const rawAttrs = safeJsonParse(p.attributes) || p.attributes || p.choice_attributes || p.choice_no;
	if (Array.isArray(rawAttrs)) rawAttrs.forEach((a) => {
		const id = typeof a === "object" ? a?.id || a?.attribute_id || a?.no : a;
		if (id !== void 0 && id !== null && String(id).trim()) choiceAttributes.push(String(id).trim());
	});
	let choiceOptions = {};
	const rawChoiceOptions = safeJsonParse(p.choice_options) || p.choice_options;
	if (Array.isArray(rawChoiceOptions)) rawChoiceOptions.forEach((opt) => {
		let attrId = opt.attribute_id || opt.id || opt.no;
		if (!attrId && opt.name) {
			const match = String(opt.name).match(/\d+/);
			if (match) attrId = match[0];
		}
		if (attrId !== void 0 && attrId !== null) {
			const idStr = String(attrId).trim();
			let optionsList = [];
			const rawOpts = safeJsonParse(opt.options) || opt.options;
			if (Array.isArray(rawOpts)) optionsList = rawOpts.map((o) => String(o).trim()).filter(Boolean);
			else if (typeof rawOpts === "string" && rawOpts.trim()) optionsList = rawOpts.split(/[,،\n]+/).map((o) => o.trim()).filter(Boolean);
			if (idStr && optionsList.length > 0) {
				choiceOptions[idStr] = optionsList;
				if (!choiceAttributes.includes(idStr)) choiceAttributes.push(idStr);
			}
		}
	});
	else if (rawChoiceOptions && typeof rawChoiceOptions === "object") Object.entries(rawChoiceOptions).forEach(([k, v]) => {
		const match = String(k).match(/\d+/);
		const idStr = match ? match[0] : String(k).trim();
		const rawOpts = safeJsonParse(v) || v;
		let optionsList = [];
		if (Array.isArray(rawOpts)) optionsList = rawOpts.map((o) => String(o).trim()).filter(Boolean);
		else if (typeof rawOpts === "string" && rawOpts.trim()) optionsList = rawOpts.split(/[,،\n]+/).map((o) => o.trim()).filter(Boolean);
		if (idStr && optionsList.length > 0) {
			choiceOptions[idStr] = optionsList;
			if (!choiceAttributes.includes(idStr)) choiceAttributes.push(idStr);
		}
	});
	Object.keys(p).forEach((key) => {
		if (key.startsWith("choice_options_")) {
			const attrId = key.replace("choice_options_", "").trim();
			const val = p[key];
			const rawOpts = safeJsonParse(val) || val;
			let optionsList = [];
			if (Array.isArray(rawOpts)) optionsList = rawOpts.map((o) => String(o).trim()).filter(Boolean);
			else if (typeof rawOpts === "string" && rawOpts.trim()) optionsList = rawOpts.split(/[,،\n]+/).map((o) => o.trim()).filter(Boolean);
			if (attrId && optionsList.length > 0) {
				choiceOptions[attrId] = Array.from(/* @__PURE__ */ new Set([...choiceOptions[attrId] || [], ...optionsList]));
				if (!choiceAttributes.includes(attrId)) choiceAttributes.push(attrId);
			}
		}
	});
	choiceAttributes = Array.from(new Set(choiceAttributes.map(String).filter(Boolean)));
	let variations = [];
	const rawVariations = p.variation || p.variations;
	if (Array.isArray(rawVariations)) variations = rawVariations.map((v) => ({
		code: String(v.type || v.code || v.sku || "").replace(/^#/, "").trim().toUpperCase(),
		color_name: v.color_name || v.color || "",
		price: v.price ?? p.unit_price ?? 0,
		sku: v.sku || `SKU-${v.type || v.code || "VAR"}`,
		qty: v.qty ?? v.quantity ?? v.stock ?? 10
	}));
	else if (typeof rawVariations === "string" && rawVariations.trim()) try {
		const parsedVars = JSON.parse(rawVariations);
		if (Array.isArray(parsedVars)) variations = parsedVars.map((v) => ({
			code: String(v.type || v.code || v.sku || "").replace(/^#/, "").trim().toUpperCase(),
			color_name: v.color_name || v.color || "",
			price: v.price ?? p.unit_price ?? 0,
			sku: v.sku || `SKU-${v.type || v.code || "VAR"}`,
			qty: v.qty ?? v.quantity ?? v.stock ?? 10
		}));
	} catch {}
	let imagesList = [];
	if (Array.isArray(p.images)) imagesList = p.images.map((img) => typeof img === "string" ? extractCleanFilename(img) : extractCleanFilename(img?.path || img?.image_name || img?.url || "")).filter(Boolean);
	else if (typeof p.images === "string" && p.images.trim()) try {
		const parsedImgs = JSON.parse(p.images);
		if (Array.isArray(parsedImgs)) imagesList = parsedImgs.map((img) => typeof img === "string" ? extractCleanFilename(img) : extractCleanFilename(img?.image_name || img?.path || "")).filter(Boolean);
		else imagesList = [extractCleanFilename(p.images)];
	} catch {
		imagesList = [extractCleanFilename(p.images)];
	}
	let colorImages = {};
	const rawColorImages = p.color_images || p.color_image;
	if (Array.isArray(rawColorImages)) rawColorImages.forEach((item) => {
		const color = (item.color || item.color_code || item.code || "").replace(/^#/, "").trim().toUpperCase();
		const img = extractCleanFilename(item.image_name || item.image || item.file_name || item.path || "");
		if (color && img) colorImages[color] = img;
	});
	else if (rawColorImages && typeof rawColorImages === "object") Object.entries(rawColorImages).forEach(([k, v]) => {
		const color = k.replace(/^#/, "").trim().toUpperCase();
		const img = extractCleanFilename(typeof v === "string" ? v : v?.image_name || v?.path || "");
		if (color && img) colorImages[color] = img;
	});
	else if (typeof rawColorImages === "string" && rawColorImages.trim()) try {
		const parsedColorImgs = JSON.parse(rawColorImages);
		if (Array.isArray(parsedColorImgs)) parsedColorImgs.forEach((item) => {
			const color = (item.color || item.color_code || "").replace(/^#/, "").trim().toUpperCase();
			const img = extractCleanFilename(item.image_name || item.image || "");
			if (color && img) colorImages[color] = img;
		});
	} catch {}
	const thumb = extractCleanFilename(p.thumbnail_full_url?.path || p.thumbnail_full_url?.key || p.thumbnail || p.image || imagesList[0] || "");
	const rawStartDate = p.discount_start_date || p.start_date || p.discount_start || "";
	const rawEndDate = p.discount_end_date || p.end_date || p.discount_end || "";
	const startDate = rawStartDate ? String(rawStartDate).split("T")[0].split(" ")[0] : "";
	const endDate = rawEndDate ? String(rawEndDate).split("T")[0].split(" ")[0] : "";
	const purchasePrice = p.purchase_price !== void 0 && p.purchase_price !== null && p.purchase_price !== "" ? p.purchase_price : p.unit_price ?? p.price ?? "";
	return {
		id: p.id,
		product_type: p.product_type || "physical",
		name_ar: nameData.ar || nameData.en || p.name || "",
		name_en: nameData.en || "",
		description_ar: descData.ar || descData.en || p.description || p.details || "",
		description_en: descData.en || "",
		category_id: categoryId || "",
		sub_category_id: subCategoryId || "",
		sub_sub_category_id: subSubCategoryId || "",
		brand_id: p.brand_id || "",
		unit_price: p.unit_price ?? p.price ?? "",
		purchase_price: purchasePrice,
		minimum_order_qty: p.minimum_order_qty ?? p.min_qty ?? p.minimum_order_quantity ?? 1,
		current_stock: p.current_stock ?? p.stock ?? p.total_stock ?? 10,
		discount: p.discount ?? 0,
		discount_type: p.discount_type || "flat",
		discount_start_date: startDate,
		discount_end_date: endDate,
		colors_active: Boolean(p.colors_active === 1 || p.colors_active === "1" || p.colors_active === true || colorsList.length > 0),
		colors: colorsList,
		choice_attributes: choiceAttributes,
		choice_options: choiceOptions,
		variations,
		thumbnail: thumb,
		images: imagesList,
		color_images: colorImages
	};
}
/**
* Builds standard FormData for Add / Update Admin Products API (6valley Standard)
* - Multi-language: ONLY lang[], name[], description[] arrays
* - Attributes & Choices: ONLY choice_no[] and choice_attributes[] when active
* - Colors: colors_active ('1'|'0') & colors[] & color_image_{cleanHex}
* - Variations: Clean keys without '#' symbols (price_{cleanCode}, sku_{cleanCode}, qty_{cleanCode})
* - Images: Text string names of already uploaded images
*/
function buildProductFormData(payload) {
	const formData = new FormData();
	const nameAr = (payload.name_ar || "").trim();
	const nameEn = (payload.name_en || payload.name_ar || "").trim();
	const descAr = (payload.description_ar || "").trim();
	const descEn = (payload.description_en || payload.description_ar || "").trim();
	formData.append("lang[]", "ar");
	formData.append("name[]", nameAr);
	formData.append("description[]", descAr);
	formData.append("lang[]", "en");
	formData.append("name[]", nameEn);
	formData.append("description[]", descEn);
	if (payload.category_id !== void 0 && payload.category_id !== null && String(payload.category_id).trim() !== "") formData.append("category_id", String(payload.category_id));
	if (payload.sub_category_id !== void 0 && payload.sub_category_id !== null && String(payload.sub_category_id).trim() !== "") formData.append("sub_category_id", String(payload.sub_category_id));
	if (payload.sub_sub_category_id !== void 0 && payload.sub_sub_category_id !== null && String(payload.sub_sub_category_id).trim() !== "") formData.append("sub_sub_category_id", String(payload.sub_sub_category_id));
	if (payload.brand_id !== void 0 && payload.brand_id !== null && String(payload.brand_id).trim() !== "") formData.append("brand_id", String(payload.brand_id));
	const unitPrice = String(payload.unit_price || 0);
	const purchasePrice = String(payload.purchase_price !== void 0 && payload.purchase_price !== null && payload.purchase_price !== "" ? payload.purchase_price : unitPrice);
	const currentStock = String(payload.current_stock !== void 0 ? payload.current_stock : 0);
	const minOrderQty = String(payload.minimum_order_qty || 1);
	formData.append("unit_price", unitPrice);
	formData.append("purchase_price", purchasePrice);
	formData.append("unit", "pc");
	formData.append("tax", "15");
	formData.append("tax_type", "percent");
	formData.append("tax_model", "exclude");
	formData.append("minimum_order_qty", minOrderQty);
	formData.append("current_stock", currentStock);
	formData.append("discount", String(payload.discount || 0));
	formData.append("discount_type", payload.discount_type || "flat");
	if (payload.discount_start_date) formData.append("discount_start_date", payload.discount_start_date);
	if (payload.discount_end_date) formData.append("discount_end_date", payload.discount_end_date);
	formData.append("product_type", payload.product_type || "physical");
	formData.append("shipping_cost", "0");
	formData.append("multiply_qty", "0");
	formData.append("status", "1");
	formData.append("request_status", "1");
	const isColorsActive = Boolean(payload.colors_active && payload.colors && payload.colors.length > 0);
	formData.append("colors_active", isColorsActive ? "1" : "0");
	const uniqueCleanColors = Array.from(new Set((payload.colors || []).map((c) => String(c).replace(/^#/, "").trim().toUpperCase()).filter(Boolean)));
	if (isColorsActive && uniqueCleanColors.length > 0) uniqueCleanColors.forEach((clean) => {
		formData.append("colors[]", `#${clean}`);
	});
	const choiceAttrs = Array.from(new Set((payload.choice_attributes || []).map(String).filter(Boolean)));
	if (choiceAttrs.length > 0) choiceAttrs.forEach((attrId) => {
		formData.append("choice_no[]", attrId);
		formData.append("choice_attributes[]", attrId);
		Array.from(new Set((payload.choice_options?.[attrId] || []).map((opt) => String(opt || "").trim()).filter(Boolean))).forEach((opt) => {
			formData.append(`choice_options_${attrId}[]`, opt);
		});
	});
	if (Boolean(isColorsActive && uniqueCleanColors.length > 0 || choiceAttrs.length > 0) && payload.variations && payload.variations.length > 0) {
		const seenCodes = /* @__PURE__ */ new Set();
		payload.variations.forEach((varItem) => {
			const cleanCode = String(varItem.code || "").replace(/^#/, "").trim().toUpperCase();
			if (!cleanCode || seenCodes.has(cleanCode)) return;
			seenCodes.add(cleanCode);
			const price = String(varItem.price !== void 0 && varItem.price !== null && Number(varItem.price) > 0 ? varItem.price : unitPrice || "0");
			const sku = varItem.sku && String(varItem.sku).trim() || `SKU-${cleanCode}`;
			const qty = String(varItem.qty !== void 0 && varItem.qty !== null && Number(varItem.qty) >= 0 ? varItem.qty : "10");
			formData.append(`price_${cleanCode}`, price);
			formData.append(`sku_${cleanCode}`, sku);
			formData.append(`qty_${cleanCode}`, qty);
		});
	}
	if (payload.thumbnail) {
		const thumbVal = typeof payload.thumbnail === "string" ? extractCleanFilename(payload.thumbnail) : payload.thumbnail;
		if (thumbVal) {
			formData.append("image", thumbVal);
			formData.append("thumbnail", thumbVal);
		}
	}
	if (payload.images && payload.images.length > 0) payload.images.forEach((img) => {
		if (img) {
			const imgVal = typeof img === "string" ? extractCleanFilename(img) : img;
			if (imgVal) formData.append("images[]", imgVal);
		}
	});
	if (payload.color_images && isColorsActive) Object.entries(payload.color_images).forEach(([colorKey, fileOrStr]) => {
		const cleanCode = colorKey.replace(/^#/, "").trim();
		if (fileOrStr) {
			const colorImgVal = typeof fileOrStr === "string" ? extractCleanFilename(fileOrStr) : fileOrStr;
			if (colorImgVal) formData.append(`color_image_${cleanCode}`, colorImgVal);
		}
	});
	return formData;
}
var adminProductsApiService = {
	/**
	* 1. GET Admin Products List with Pagination & Multi-lang formatting
	*/
	async fetchProducts(token, page = 1, limit = 10) {
		try {
			const endpoint = `${API_BASE_URL}/admin/products/list?page=${page}&limit=${limit}&_t=${Date.now()}`;
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
			let rawProducts = [];
			let pagination = {
				current_page: page,
				last_page: 1,
				per_page: limit,
				total: 0
			};
			if (Array.isArray(response)) {
				rawProducts = response;
				pagination.total = response.length;
				pagination.last_page = Math.ceil(response.length / limit) || 1;
			} else if (response && typeof response === "object") {
				rawProducts = response.products || response.data || response.list || [];
				const meta = response.meta || response.pagination || response;
				pagination.current_page = Number(meta.current_page || meta.page || page);
				pagination.per_page = Number(meta.per_page || meta.limit || limit);
				pagination.total = Number(meta.total || rawProducts.length);
				pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1);
			}
			return {
				success: true,
				data: rawProducts.map((p) => {
					const nameData = extractMultiLangField(p, "name");
					const descData = extractMultiLangField(p, "description");
					return {
						id: p.id,
						name: nameData.ar || nameData.en || "منتج بدون اسم",
						name_ar: nameData.ar,
						name_en: nameData.en,
						description: descData.ar || descData.en || "",
						description_ar: descData.ar,
						description_en: descData.en,
						sku: p.code || p.sku || `SKU-${p.id}`,
						category_id: p.category_id || p.category_ids?.[0]?.id || "",
						category_name: p.category_name || p.category?.name || "تصنيف عام",
						sub_category_id: p.sub_category_id || "",
						sub_sub_category_id: p.sub_sub_category_id || "",
						brand_id: p.brand_id || "",
						brand_name: p.brand?.name || "",
						unit_price: p.unit_price || p.price || 0,
						purchase_price: p.purchase_price || 0,
						minimum_order_qty: p.minimum_order_qty || 1,
						current_stock: p.current_stock !== void 0 ? p.current_stock : p.stock || 0,
						discount: p.discount || 0,
						discount_type: p.discount_type || "flat",
						discount_start_date: p.discount_start_date || "",
						discount_end_date: p.discount_end_date || "",
						thumbnail: normalizeProductImageUrl(p.thumbnail_full_url?.path || p.thumbnail || p.images?.[0] || ""),
						images: Array.isArray(p.images) ? p.images.map((img) => normalizeProductImageUrl(typeof img === "string" ? img : img?.path || img?.url || "")) : [],
						status: p.status ?? 1,
						created_at: p.created_at || ""
					};
				}),
				pagination
			};
		} catch (err) {
			console.warn("Admin fetchProducts Error:", err);
			return {
				success: false,
				data: [],
				pagination: {
					current_page: page,
					last_page: 1,
					per_page: limit,
					total: 0
				},
				message: formatApiErrorMessage(err)
			};
		}
	},
	/**
	* 2. DELETE Admin Product by ID
	*/
	async deleteProduct(id, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/products/delete/${id}`;
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
				}))?.message || "تم حذف المنتج بنجاح."
			};
		} catch (err) {
			console.error("Admin deleteProduct Error:", err);
			return {
				success: false,
				message: formatApiErrorMessage(err)
			};
		}
	},
	/**
	* 3. Step 1: POST Upload Single Image (type: 'thumbnail' | 'product')
	* Endpoint: POST /api/v1/admin/products/upload-images
	*/
	async uploadProductImage(file, type = "product", token) {
		try {
			const uploadData = new FormData();
			uploadData.append("image", file);
			uploadData.append("file", file);
			uploadData.append("type", type);
			const endpoint = `${API_BASE_URL}/admin/products/upload-images`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: uploadData,
				timeout: 3e4
			});
			let imageName = "";
			if (typeof response === "string") imageName = response;
			else if (response && typeof response === "object") imageName = response.image_name || response.img_name || response.imageName || response.file_name || response.name || response.data?.image_name || response.data?.name || (Array.isArray(response.data) ? response.data[0] : typeof response.data === "string" ? response.data : "") || (Array.isArray(response.images) ? response.images[0] : response.images) || (Array.isArray(response.image) ? response.image[0] : response.image) || (Array.isArray(response) ? response[0] : "") || "";
			if (!imageName && response?.data && typeof response.data === "string") imageName = response.data;
			if (imageName) return {
				success: true,
				imageName: extractCleanFilename(String(imageName)),
				message: "تم رفع الصورة بنجاح."
			};
			else return {
				success: false,
				imageName: "",
				message: "لم يتم استلام اسم الصورة من السيرفر بعد الرفع."
			};
		} catch (err) {
			console.error("Admin uploadProductImage Error:", err);
			return {
				success: false,
				imageName: "",
				message: formatApiErrorMessage(err)
			};
		}
	},
	/**
	* 4. Step 2: POST Add Admin Product (Metadata with Text Image Names)
	*/
	async addProduct(formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/products/add`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: formData,
				timeout: 3e4
			});
			return {
				success: true,
				message: response?.message || "تم إضافة المنتج الجديد بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin addProduct Error:", err);
			return {
				success: false,
				message: formatApiErrorMessage(err)
			};
		}
	},
	/**
	* 5. Step 2: POST Update Admin Product (Metadata with Text Image Names)
	*/
	async updateProduct(id, formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/products/update/${id}`;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: formData,
				timeout: 3e4
			});
			return {
				success: true,
				message: response?.message || "تم تحديث بيانات المنتج بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin updateProduct Error:", err);
			return {
				success: false,
				message: formatApiErrorMessage(err)
			};
		}
	},
	/**
	* 6. GET Single Admin Product Details for Editing with full mapping
	*/
	async fetchProductDetails(id, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/products/list?page=1&limit=500&_t=${Date.now()}`;
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
				timeout: 15e3
			});
			let rawProducts = [];
			if (Array.isArray(response)) rawProducts = response;
			else if (response && typeof response === "object") rawProducts = response.products || response.data || response.list || [];
			const found = rawProducts.find((p) => String(p.id) === String(id));
			if (found) return {
				success: true,
				data: mapRawProductToFormData(found)
			};
			return {
				success: false,
				data: null,
				message: "لم يتم العثور على بيانات المنتج المطلوب."
			};
		} catch (err) {
			console.error("Admin fetchProductDetails Error:", err);
			return {
				success: false,
				data: null,
				message: formatApiErrorMessage(err)
			};
		}
	}
};
//#endregion
//#region components/dashboard/ProductFormAdvanced.vue?vue&type=script&setup=true&lang.ts
var ProductFormAdvanced_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ProductFormAdvanced",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEditMode: { type: Boolean },
		isSubmitting: { type: Boolean },
		serverError: {}
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const { adminCookie, adminToken } = useAdminAuth();
		const activeTab = ref("basic");
		const formError = ref("");
		watch(() => props.serverError, (val) => {
			if (val) formError.value = val;
		});
		const tabs = [
			{
				id: "basic",
				label: "البيانات الأساسية",
				icon: "<svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z\" /></svg>"
			},
			{
				id: "category",
				label: "الأقسام والبراند",
				icon: "<svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10\" /></svg>"
			},
			{
				id: "pricing",
				label: "التسعير والمخزون",
				icon: "<svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>"
			},
			{
				id: "variations",
				label: "الألوان والسمات",
				icon: "<svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01\" /></svg>"
			},
			{
				id: "media",
				label: "الصور والملفات",
				icon: "<svg class=\"w-4 h-4\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z\" /></svg>"
			}
		];
		const form = reactive({
			id: "",
			product_type: "physical",
			name_ar: "",
			name_en: "",
			description_ar: "",
			description_en: "",
			category_id: "",
			sub_category_id: "",
			sub_sub_category_id: "",
			brand_id: "",
			unit_price: "",
			purchase_price: "",
			minimum_order_qty: 1,
			current_stock: 10,
			discount: 0,
			discount_type: "flat",
			discount_start_date: "",
			discount_end_date: "",
			colors_active: false,
			colors: [],
			choice_attributes: [],
			choice_options: {},
			variations: [],
			thumbnail: null,
			images: [],
			color_images: {}
		});
		const categoriesList = ref([]);
		const subCategoriesList = ref([]);
		const brandsList = ref([]);
		const colorsList = ref([]);
		const attributesList = ref([]);
		const isLoadingCategories = ref(false);
		const isLoadingSubcategories = ref(false);
		const isLoadingBrands = ref(false);
		const isLoadingColors = ref(false);
		const isLoadingAttributes = ref(false);
		const colorSearchTerm = ref("");
		const newColorInput = ref("");
		const newOptionInputs = reactive({});
		const thumbnailName = ref("");
		const thumbnailPreview = ref("");
		ref(null);
		const galleryCount = ref(0);
		const galleryPreviews = ref([]);
		const colorImagePreviews = reactive({});
		const colorImageNames = reactive({});
		let isInitialPopulating = false;
		const getToken = () => {
			if (adminToken?.value) return adminToken.value;
			if (adminCookie?.value) return adminCookie.value;
			return "";
		};
		const fetchSubcategoriesForCategory = async (parentId) => {
			if (!parentId) {
				subCategoriesList.value = [];
				return;
			}
			isLoadingSubcategories.value = true;
			const token = getToken();
			try {
				const res = await adminCategoriesApiService.fetchSubcategories(token, parentId);
				if (res.success) subCategoriesList.value = res.data;
				else subCategoriesList.value = [];
			} catch (err) {
				console.warn("Error fetching subcategories:", err);
				subCategoriesList.value = [];
			} finally {
				isLoadingSubcategories.value = false;
			}
		};
		const populateForm = async (data) => {
			if (!data) return;
			isInitialPopulating = true;
			form.id = data.id || "";
			form.product_type = data.product_type || "physical";
			form.name_ar = data.name_ar || "";
			form.name_en = data.name_en || "";
			form.description_ar = data.description_ar || "";
			form.description_en = data.description_en || "";
			form.category_id = data.category_id !== void 0 && data.category_id !== null ? String(data.category_id) : "";
			form.sub_category_id = data.sub_category_id !== void 0 && data.sub_category_id !== null ? String(data.sub_category_id) : "";
			form.sub_sub_category_id = data.sub_sub_category_id !== void 0 && data.sub_sub_category_id !== null ? String(data.sub_sub_category_id) : "";
			form.brand_id = data.brand_id !== void 0 && data.brand_id !== null ? String(data.brand_id) : "";
			form.unit_price = data.unit_price !== void 0 && data.unit_price !== null ? data.unit_price : "";
			form.purchase_price = data.purchase_price !== void 0 && data.purchase_price !== null ? data.purchase_price : "";
			form.minimum_order_qty = data.minimum_order_qty || 1;
			form.current_stock = data.current_stock !== void 0 && data.current_stock !== null ? data.current_stock : 10;
			form.discount = data.discount || 0;
			form.discount_type = data.discount_type || "flat";
			form.discount_start_date = data.discount_start_date || "";
			form.discount_end_date = data.discount_end_date || "";
			form.colors_active = Boolean(data.colors_active);
			form.colors = data.colors ? [...data.colors] : [];
			form.choice_attributes = data.choice_attributes ? [...data.choice_attributes] : [];
			form.choice_options = data.choice_options ? JSON.parse(JSON.stringify(data.choice_options)) : {};
			form.variations = data.variations && data.variations.length > 0 ? JSON.parse(JSON.stringify(data.variations)) : [];
			form.thumbnail = data.thumbnail || null;
			form.images = data.images ? [...data.images] : [];
			form.color_images = data.color_images ? { ...data.color_images } : {};
			if (typeof form.thumbnail === "string" && form.thumbnail) {
				thumbnailPreview.value = normalizeProductImageUrl(form.thumbnail, true);
				thumbnailName.value = extractCleanFilename(form.thumbnail) || "الصورة المحفوظة";
			} else if (!form.thumbnail) {
				thumbnailPreview.value = "";
				thumbnailName.value = "";
			}
			galleryPreviews.value = [];
			if (Array.isArray(form.images)) {
				form.images.forEach((img) => {
					if (typeof img === "string" && img) galleryPreviews.value.push(normalizeProductImageUrl(img, false));
				});
				galleryCount.value = galleryPreviews.value.length;
			}
			if (form.color_images) Object.entries(form.color_images).forEach(([k, v]) => {
				const clean = cleanColorCode(k);
				if (typeof v === "string" && v) {
					colorImagePreviews[clean] = normalizeProductImageUrl(v, false);
					colorImageNames[clean] = extractCleanFilename(v);
				}
			});
			if ((!form.variations || form.variations.length === 0) && (form.colors_active || form.choice_attributes && form.choice_attributes.length > 0)) autoGenerateVariations(true);
			if (form.category_id) await fetchSubcategoriesForCategory(form.category_id);
			setTimeout(() => {
				isInitialPopulating = false;
			}, 250);
		};
		watch(() => props.initialData, (newVal) => {
			if (newVal && Object.keys(newVal).length > 0) populateForm(newVal);
		}, {
			immediate: true,
			deep: true
		});
		watch([
			() => form.colors_active,
			() => form.colors,
			() => form.choice_attributes,
			() => form.choice_options
		], () => {
			if (isInitialPopulating) return;
			autoGenerateVariations(true);
		}, { deep: true });
		const mainCategorySelectOptions = computed(() => {
			return categoriesList.value.map((c) => ({
				label: c.name,
				value: c.id
			}));
		});
		const subCategorySelectOptions = computed(() => {
			return subCategoriesList.value.map((s) => ({
				label: s.name,
				value: s.id
			}));
		});
		const subCategoryPlaceholder = computed(() => {
			if (!form.category_id) return "اختر الفئة الرئيسية أولاً";
			if (isLoadingSubcategories.value) return "جاري جلب الفئات الفرعية...";
			if (subCategoriesList.value.length === 0) return "لا توجد فئات فرعية متاحة";
			return "-- اختر الفئة الفرعية --";
		});
		const handleMainCategoryChange = async (newCategoryId) => {
			form.sub_category_id = "";
			form.sub_sub_category_id = "";
			await fetchSubcategoriesForCategory(newCategoryId);
		};
		const brandSelectOptions = computed(() => {
			return brandsList.value.map((b) => ({
				label: b.name,
				value: b.id
			}));
		});
		const discountTypeSelectOptions = [{
			label: "مبلغ ثابت (flat)",
			value: "flat"
		}, {
			label: "نسبة مئوية (percent %)",
			value: "percent"
		}];
		const cleanColorCode = (code) => {
			if (!code) return "";
			return String(code).replace(/^#/, "").toUpperCase();
		};
		const normalizeHex = (code) => {
			if (!code) return "#000000";
			return `#${cleanColorCode(code)}`;
		};
		const filteredColorsList = computed(() => {
			if (!colorSearchTerm.value.trim()) return colorsList.value;
			const q = colorSearchTerm.value.trim().toLowerCase();
			return colorsList.value.filter((c) => c.name.toLowerCase().includes(q) || c.code && c.code.toLowerCase().includes(q));
		});
		const isColorSelected = (colorCodeOrName) => {
			const clean = cleanColorCode(colorCodeOrName);
			return (form.colors || []).some((c) => cleanColorCode(c) === clean);
		};
		const isAttributeSelected = (attrId) => {
			const idStr = String(attrId);
			return (form.choice_attributes || []).some((id) => String(id) === idStr);
		};
		const selectedAttributesObjects = computed(() => {
			return attributesList.value.filter((attr) => isAttributeSelected(attr.id));
		});
		const getChoiceOptions = (attrId) => {
			const idStr = String(attrId);
			return form.choice_options?.[idStr] || form.choice_options?.[attrId] || [];
		};
		const getColorNameByCode = (colorCode) => {
			const clean = cleanColorCode(colorCode);
			const found = colorsList.value.find((c) => cleanColorCode(c.code) === clean || cleanColorCode(c.name) === clean);
			return found ? found.name : "";
		};
		const autoGenerateVariations = (preserveExisting = true) => {
			const activeColors = form.colors_active && (form.colors || []).length > 0 ? form.colors : [];
			const choiceAttrIds = form.choice_attributes || [];
			const attrOptionsMatrix = [];
			choiceAttrIds.forEach((attrId) => {
				const idStr = String(attrId);
				const opts = form.choice_options?.[idStr] || form.choice_options?.[attrId] || [];
				if (opts.length > 0) attrOptionsMatrix.push(opts);
			});
			const cartesian = (arrays) => {
				return arrays.reduce((acc, curr) => {
					return acc.flatMap((a) => curr.map((c) => [...a, c]));
				}, [[]]);
			};
			const existingMap = /* @__PURE__ */ new Map();
			if (preserveExisting && Array.isArray(form.variations)) form.variations.forEach((v) => {
				const codeKey = String(v.code || "").replace(/^#/, "").trim().toUpperCase();
				if (codeKey) existingMap.set(codeKey, v);
			});
			const variationRows = [];
			const defaultPrice = form.unit_price !== void 0 && form.unit_price !== "" ? Number(form.unit_price) : 100;
			if (activeColors.length > 0 && attrOptionsMatrix.length > 0) {
				const attrCombos = cartesian(attrOptionsMatrix);
				activeColors.forEach((c) => {
					const cleanC = cleanColorCode(c);
					const colorName = getColorNameByCode(c);
					attrCombos.forEach((combo) => {
						const comboStr = combo.join("-");
						const code = `${cleanC}-${comboStr}`;
						const existing = existingMap.get(code.toUpperCase());
						variationRows.push({
							code,
							color_name: colorName,
							price: existing?.price ?? defaultPrice,
							sku: existing?.sku || `SKU-${code}`,
							qty: existing?.qty ?? 10
						});
					});
				});
			} else if (activeColors.length > 0) activeColors.forEach((c) => {
				const cleanC = cleanColorCode(c);
				const colorName = getColorNameByCode(c);
				const code = cleanC;
				const existing = existingMap.get(code.toUpperCase());
				variationRows.push({
					code,
					color_name: colorName,
					price: existing?.price ?? defaultPrice,
					sku: existing?.sku || `SKU-${code}`,
					qty: existing?.qty ?? 10
				});
			});
			else if (attrOptionsMatrix.length > 0) cartesian(attrOptionsMatrix).forEach((combo) => {
				const code = combo.join("-");
				const existing = existingMap.get(code.toUpperCase());
				variationRows.push({
					code,
					price: existing?.price ?? defaultPrice,
					sku: existing?.sku || `SKU-${code}`,
					qty: existing?.qty ?? 10
				});
			});
			if (variationRows.length > 0) {
				const stockPerVar = Math.max(1, Math.floor(Number(form.current_stock || 10) / variationRows.length));
				variationRows.forEach((v) => {
					if (v.qty === void 0 || v.qty === null || !existingMap.has(v.code.toUpperCase())) v.qty = stockPerVar;
				});
			}
			form.variations = variationRows;
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-e8346942><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-e8346942><div data-v-e8346942><h2 class="text-xl sm:text-2xl font-black text-slate-900" data-v-e8346942>${ssrInterpolate(__props.isEditMode ? "تعديل منتج موجود" : "إضافة منتج جديد")}</h2><p class="text-xs sm:text-sm text-slate-500 font-medium mt-1" data-v-e8346942> قم بتعبئة بيانات المنتج باللغتين وتحديد التصنيفات، السمات، خيارات الألوان، والأسعار. </p></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-e8346942><button type="button" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors" data-v-e8346942> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-e8346942>`);
			if (__props.isSubmitting) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-e8346942></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-e8346942>${ssrInterpolate(__props.isSubmitting ? "جاري الحفظ والرفع..." : __props.isEditMode ? "حفظ التعديلات" : "إضافة المنتج")}</span></button></div></div>`);
			if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake" data-v-e8346942><svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-e8346942><circle cx="12" cy="12" r="10" data-v-e8346942></circle><line x1="12" y1="8" x2="12" y2="12" data-v-e8346942></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-e8346942></line></svg><span data-v-e8346942>${ssrInterpolate(formError.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center gap-2 overflow-x-auto" data-v-e8346942><!--[-->`);
			ssrRenderList(tabs, (tab) => {
				_push(`<button type="button" class="${ssrRenderClass([activeTab.value === tab.id ? "bg-[#0B0E28] text-white shadow-sm" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50", "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2.5 cursor-pointer"])}" data-v-e8346942><span class="w-4 h-4 flex items-center justify-center" data-v-e8346942>${tab.icon ?? ""}</span><span data-v-e8346942>${ssrInterpolate(tab.label)}</span></button>`);
			});
			_push(`<!--]--></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" style="${ssrRenderStyle(activeTab.value === "basic" ? null : { display: "none" })}" data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> الاسم والوصف باللغتين (ar &amp; en) </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e8346942><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> اسم المنتج (بالعربي) <span class="text-rose-500" data-v-e8346942>*</span></label><input type="text"${ssrRenderAttr("value", form.name_ar)} placeholder="مثال: مكنسة بيسيل بروهيت اللاسلكية..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> اسم المنتج (بالإنجليزي) </label><input type="text"${ssrRenderAttr("value", form.name_en)} placeholder="e.g. Bissell ProHeat Cordless Vacuum..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" dir="ltr" data-v-e8346942></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e8346942>`);
			_push(ssrRenderComponent(RichTextEditor_default, {
				modelValue: form.description_ar,
				"onUpdate:modelValue": ($event) => form.description_ar = $event,
				label: "الوصف (بالعربي)",
				required: true,
				dir: "rtl",
				placeholder: "اكتب وصفاً مفصلاً ومنسقاً للمنتج..."
			}, null, _parent));
			_push(ssrRenderComponent(RichTextEditor_default, {
				modelValue: form.description_en,
				"onUpdate:modelValue": ($event) => form.description_en = $event,
				label: "الوصف (بالإنجليزي)",
				dir: "ltr",
				placeholder: "Write detailed formatted product description..."
			}, null, _parent));
			_push(`</div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" style="${ssrRenderStyle(activeTab.value === "category" ? null : { display: "none" })}" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> ربط التصنيفات والفئات الفرعية والعلامة التجارية </h3><span class="text-xs text-slate-400 font-medium" data-v-e8346942>جلب حي ومترابط من الـ API</span></div><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-v-e8346942><div class="space-y-1.5" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-e8346942> الفئة الرئيسية (category_id) <span class="text-rose-500" data-v-e8346942>*</span></label>`);
			if (isLoadingCategories.value) _push(`<span class="text-[10px] text-amber-500 font-bold animate-pulse" data-v-e8346942>جاري التحميل...</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.category_id,
				"onUpdate:modelValue": [($event) => form.category_id = $event, handleMainCategoryChange],
				placeholder: "-- اختر الفئة الرئيسية --",
				options: mainCategorySelectOptions.value,
				required: true,
				disabled: isLoadingCategories.value
			}, null, _parent));
			_push(`</div><div class="space-y-1.5" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-e8346942> الفئة الفرعية (sub_category_id) </label>`);
			if (isLoadingSubcategories.value) _push(`<span class="text-[10px] text-amber-500 font-bold animate-pulse" data-v-e8346942>جاري جلب الفئات الفرعية...</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.sub_category_id,
				"onUpdate:modelValue": ($event) => form.sub_category_id = $event,
				placeholder: subCategoryPlaceholder.value,
				options: subCategorySelectOptions.value,
				disabled: !form.category_id || isLoadingSubcategories.value || subCategoriesList.value.length === 0
			}, null, _parent));
			if (form.category_id && !isLoadingSubcategories.value && subCategoriesList.value.length === 0) _push(`<p class="text-[10px] text-slate-400 font-medium" data-v-e8346942> لا توجد فئات فرعية مسجلة تحت هذا القسم. </p>`);
			else _push(`<!---->`);
			_push(`</div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-e8346942> الفئة الفرعية الثانوية (sub_sub_category_id) </label><input type="number"${ssrRenderAttr("value", form.sub_sub_category_id)} placeholder="رقم الفئة الثانوية (اختياري)" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-e8346942> العلامة التجارية (brand_id) </label>`);
			if (isLoadingBrands.value) _push(`<span class="text-[10px] text-amber-500 font-bold animate-pulse" data-v-e8346942>جاري التحميل...</span>`);
			else _push(`<!---->`);
			_push(`</div>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.brand_id,
				"onUpdate:modelValue": ($event) => form.brand_id = $event,
				placeholder: "-- اختر العلامة التجارية --",
				options: brandSelectOptions.value,
				disabled: isLoadingBrands.value
			}, null, _parent));
			_push(`</div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" style="${ssrRenderStyle(activeTab.value === "pricing" ? null : { display: "none" })}" data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> التسعير والمخزون والخصم </h3><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-v-e8346942><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> سعر البيع (unit_price) <span class="text-rose-500" data-v-e8346942>*</span></label><input type="number" step="0.01"${ssrRenderAttr("value", form.unit_price)} placeholder="0.00" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> سعر التكلفة (purchase_price) </label><input type="number" step="0.01"${ssrRenderAttr("value", form.purchase_price)} placeholder="0.00" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> المخزون الكلي (current_stock) </label><input type="number"${ssrRenderAttr("value", form.current_stock)} placeholder="10" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> أقل كمية للطلب (minimum_order_qty) </label><input type="number"${ssrRenderAttr("value", form.minimum_order_qty)} placeholder="1" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div></div><div class="pt-4 border-t border-slate-100 space-y-4" data-v-e8346942><h4 class="text-sm font-bold text-slate-800" data-v-e8346942>بيانات الخصم والعروض الترويجية</h4><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-v-e8346942><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942>قيمة الخصم (discount)</label><input type="number" step="0.01"${ssrRenderAttr("value", form.discount)} placeholder="0" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942>نوع الخصم (discount_type)</label>`);
			_push(ssrRenderComponent(BaseSelect_default, {
				modelValue: form.discount_type,
				"onUpdate:modelValue": ($event) => form.discount_type = $event,
				options: discountTypeSelectOptions
			}, null, _parent));
			_push(`</div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942>تاريخ بداية الخصم</label><input type="date"${ssrRenderAttr("value", form.discount_start_date)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-e8346942></div><div class="space-y-1.5" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942>تاريخ نهاية الخصم</label><input type="date"${ssrRenderAttr("value", form.discount_end_date)} class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-e8346942></div></div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-8" style="${ssrRenderStyle(activeTab.value === "variations" ? null : { display: "none" })}" data-v-e8346942><div class="space-y-4" data-v-e8346942><div class="flex items-center justify-between pb-3 border-b border-slate-100" data-v-e8346942><div data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> 1. خيارات الألوان المتاحة (Colors) </h3><p class="text-xs text-slate-500 mt-0.5" data-v-e8346942>تفعيل الألوان لجلب قائمة الألوان التفاعلية من الـ API وتخصيصها للمنتج.</p></div><label class="flex items-center gap-3 cursor-pointer select-none bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors" data-v-e8346942><div class="relative" data-v-e8346942><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.colors_active) ? ssrLooseContain(form.colors_active, null) : form.colors_active) ? " checked" : ""} class="sr-only peer" data-v-e8346942><div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-400" data-v-e8346942></div></div><span class="text-xs font-black text-slate-900" data-v-e8346942>تفعيل الألوان (colors_active)</span></label></div>`);
			if (form.colors_active) {
				_push(`<div class="space-y-4 pt-2" data-v-e8346942><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-v-e8346942><div class="flex items-center gap-2" data-v-e8346942><span class="text-xs font-bold text-slate-700" data-v-e8346942>اختر من الألوان المتاحة في المتجر:</span><span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[11px] font-black" data-v-e8346942> تم تحديد ${ssrInterpolate((form.colors || []).length)} لون </span></div><div class="relative w-full sm:w-64" data-v-e8346942><input type="text"${ssrRenderAttr("value", colorSearchTerm.value)} placeholder="بحث في الألوان..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" data-v-e8346942><svg class="w-4 h-4 text-slate-400 absolute end-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" data-v-e8346942><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" data-v-e8346942></path></svg></div></div>`);
				if (isLoadingColors.value) _push(`<div class="flex items-center justify-center p-8 bg-slate-50 rounded-2xl border border-dashed border-slate-200 gap-3" data-v-e8346942><div class="w-5 h-5 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" data-v-e8346942></div><span class="text-xs font-bold text-slate-600" data-v-e8346942>جاري جلب قائمة الألوان من السيرفر...</span></div>`);
				else {
					_push(`<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3" data-v-e8346942><!--[-->`);
					ssrRenderList(filteredColorsList.value, (color) => {
						_push(`<div class="${ssrRenderClass([isColorSelected(color.code || color.name) ? "border-amber-400 bg-amber-50/60 shadow-sm ring-2 ring-amber-400/20" : "border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300", "p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-2.5 select-none"])}" data-v-e8346942><div class="w-6 h-6 rounded-full border border-slate-300 shrink-0 shadow-inner flex items-center justify-center transition-transform" style="${ssrRenderStyle({ backgroundColor: normalizeHex(color.code) })}" data-v-e8346942>`);
						if (isColorSelected(color.code || color.name)) _push(`<svg class="w-3.5 h-3.5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" data-v-e8346942><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-e8346942></path></svg>`);
						else _push(`<!---->`);
						_push(`</div><div class="flex flex-col min-w-0 overflow-hidden" data-v-e8346942><span class="text-xs font-extrabold text-[#0B0E28] truncate" data-v-e8346942>${ssrInterpolate(color.name)}</span><span class="text-[10px] text-slate-400 font-mono" data-v-e8346942>${ssrInterpolate(normalizeHex(color.code))}</span></div></div>`);
					});
					_push(`<!--]--></div>`);
				}
				_push(`<div class="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3" data-v-e8346942><div class="flex flex-wrap items-center gap-2" data-v-e8346942><span class="text-xs font-bold text-slate-600" data-v-e8346942>الألوان المختارة:</span><!--[-->`);
				ssrRenderList(form.colors, (c) => {
					_push(`<div class="flex items-center gap-2 bg-[#0B0E28] text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm" data-v-e8346942><span class="w-3.5 h-3.5 rounded-full border border-white/40" style="${ssrRenderStyle({ backgroundColor: normalizeHex(c) })}" data-v-e8346942></span><span data-v-e8346942>#${ssrInterpolate(cleanColorCode(c))}</span><button type="button" class="text-amber-400 hover:text-rose-400 font-black cursor-pointer" data-v-e8346942>✕</button></div>`);
				});
				_push(`<!--]-->`);
				if (!form.colors || form.colors.length === 0) _push(`<span class="text-xs text-slate-400 italic" data-v-e8346942>لم يتم اختيار أي لون بعد</span>`);
				else _push(`<!---->`);
				_push(`</div><div class="flex items-center gap-2" data-v-e8346942><input type="text"${ssrRenderAttr("value", newColorInput.value)} placeholder="كود لون مخصص (FF0000)" class="w-40 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-400" dir="ltr" data-v-e8346942><button type="button" class="px-3.5 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-900 cursor-pointer" data-v-e8346942> + إضافة </button></div></div></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="space-y-4 pt-4 border-t border-slate-100" data-v-e8346942><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-v-e8346942><div data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> 2. السمات والخصائص (Attributes &amp; Choice Options) </h3><p class="text-xs text-slate-500 mt-0.5" data-v-e8346942>اختر السمات المطلوبة (مثل المقاس، الخامة، السعة) وحدد خياراتها للمنتج.</p></div>`);
			if (isLoadingAttributes.value) _push(`<span class="text-xs font-bold text-amber-500 animate-pulse" data-v-e8346942>جاري جلب السمات...</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block" data-v-e8346942> اضغط لتحديد السمات المطبقة على هذا المنتج: </label>`);
			if (attributesList.value.length > 0) {
				_push(`<div class="flex flex-wrap gap-2.5" data-v-e8346942><!--[-->`);
				ssrRenderList(attributesList.value, (attr) => {
					_push(`<button type="button" class="${ssrRenderClass([isAttributeSelected(attr.id) ? "bg-amber-400 border-amber-500 text-[#0B0E28] shadow-sm" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300", "px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 cursor-pointer border"])}" data-v-e8346942>`);
					if (isAttributeSelected(attr.id)) _push(`<svg class="w-3.5 h-3.5 text-[#0B0E28]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3" data-v-e8346942><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-e8346942></path></svg>`);
					else _push(`<!---->`);
					_push(`<span data-v-e8346942>${ssrInterpolate(attr.name)}</span></button>`);
				});
				_push(`<!--]--></div>`);
			} else if (!isLoadingAttributes.value) _push(`<div class="text-xs text-slate-400 font-bold" data-v-e8346942> لا توجد سمات متاحة مسجلة في المتجر. </div>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (selectedAttributesObjects.value.length > 0) {
				_push(`<div class="space-y-4 pt-2" data-v-e8346942><h4 class="text-xs font-black text-slate-800" data-v-e8346942>تحديد خيارات وقيم السمات المختارة (Choice Options):</h4><!--[-->`);
				ssrRenderList(selectedAttributesObjects.value, (attr) => {
					_push(`<div class="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><div class="flex items-center gap-2" data-v-e8346942><span class="w-2 h-2 rounded-full bg-slate-800" data-v-e8346942></span><span class="text-xs font-black text-[#0B0E28]" data-v-e8346942>${ssrInterpolate(attr.name)}</span><span class="text-[11px] text-slate-400 font-mono" data-v-e8346942>(ID: ${ssrInterpolate(attr.id)})</span></div><button type="button" class="text-xs font-bold text-rose-500 hover:text-rose-700 cursor-pointer" data-v-e8346942> إلغاء السمة </button></div><div class="space-y-2" data-v-e8346942><div class="flex flex-wrap items-center gap-2" data-v-e8346942><!--[-->`);
					ssrRenderList(getChoiceOptions(attr.id), (opt) => {
						_push(`<div class="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 shadow-sm" data-v-e8346942><span data-v-e8346942>${ssrInterpolate(opt)}</span><button type="button" class="text-slate-400 hover:text-rose-500 font-black ms-1" data-v-e8346942> ✕ </button></div>`);
					});
					_push(`<!--]--><div class="flex items-center gap-1.5" data-v-e8346942><input type="text"${ssrRenderAttr("value", newOptionInputs[attr.id])}${ssrRenderAttr("placeholder", `أضف خيار لـ ${attr.name}...`)} class="bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400" data-v-e8346942><button type="button" class="px-3 py-1.5 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer" data-v-e8346942> + إضافة </button></div></div>`);
					if (attr.values && attr.values.length > 0) {
						_push(`<div class="flex flex-wrap items-center gap-1.5 pt-1" data-v-e8346942><span class="text-[10px] font-bold text-slate-400" data-v-e8346942>اقتراحات سريعة:</span><!--[-->`);
						ssrRenderList(attr.values, (val) => {
							_push(`<button type="button" class="text-[10px] px-2 py-0.5 bg-white border border-slate-200 rounded-lg text-slate-600 hover:border-amber-400 hover:text-[#0B0E28]" data-v-e8346942> + ${ssrInterpolate(val.value)}</button>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`</div></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="pt-4 border-t border-slate-100 space-y-4" data-v-e8346942><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3" data-v-e8346942><div data-v-e8346942><h4 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> 3. جدول المتغيرات والتوليفات (Product Variations) </h4><p class="text-xs text-slate-500 mt-0.5" data-v-e8346942>يتم تحديث التوليفات والأسعار والمخزون تلقائياً عند تغيير الألوان أو السمات.</p></div><div class="flex items-center gap-2" data-v-e8346942><button type="button" class="px-4 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-950 font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm" title="إعادة ضبط وتوليد التوليفات من البداية" data-v-e8346942><svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" data-v-e8346942><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" data-v-e8346942></path></svg><span data-v-e8346942>إعادة توليد التوليفات</span></button><button type="button" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-colors cursor-pointer" data-v-e8346942> + إضافة صف يدوي </button></div></div>`);
			if ((form.variations || []).length === 0) _push(`<div class="p-8 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-xs text-slate-400 font-bold" data-v-e8346942> لا توجد متغيرات حالياً. سيتم إنشاؤها تلقائياً عند تحديد لون أو سمة، أو يمكنك إضافة صف يدوياً. </div>`);
			else {
				_push(`<div class="space-y-3" data-v-e8346942><!--[-->`);
				ssrRenderList(form.variations, (v, idx) => {
					_push(`<div class="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 relative items-center shadow-xs" data-v-e8346942><div data-v-e8346942><div class="flex items-center justify-between mb-1" data-v-e8346942><label class="text-[11px] font-bold text-slate-600 block" data-v-e8346942>رمز المتغير (code)</label>`);
					if (v.color_name) _push(`<span class="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md" data-v-e8346942>${ssrInterpolate(v.color_name)}</span>`);
					else _push(`<!---->`);
					_push(`</div><input type="text"${ssrRenderAttr("value", v.code)} placeholder="FF0000-S" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 font-mono" dir="ltr" data-v-e8346942></div><div data-v-e8346942><label class="text-[11px] font-bold text-slate-600 block" data-v-e8346942>السعر الخاص</label><input type="number" step="0.01"${ssrRenderAttr("value", v.price)} placeholder="0.00" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" data-v-e8346942></div><div data-v-e8346942><label class="text-[11px] font-bold text-slate-600 block" data-v-e8346942>رمز الـ SKU</label><input type="text"${ssrRenderAttr("value", v.sku)} placeholder="SKU-CODE" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" dir="ltr" data-v-e8346942></div><div class="flex items-center gap-2" data-v-e8346942><div class="flex-1" data-v-e8346942><label class="text-[11px] font-bold text-slate-600 block" data-v-e8346942>الكمية بالمخزن</label><input type="number"${ssrRenderAttr("value", v.qty)} placeholder="10" class="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800" data-v-e8346942></div><button type="button" class="mt-4 p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer" title="حذف هذا المتغير" data-v-e8346942> ✕ </button></div></div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" style="${ssrRenderStyle(activeTab.value === "media" ? null : { display: "none" })}" data-v-e8346942><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-e8346942><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-e8346942></span> الصور والملفات (Media &amp; Gallery Attachments) </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" data-v-e8346942><div class="space-y-2" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block flex items-center justify-between" data-v-e8346942><span data-v-e8346942>الصورة المصغرة الرئيسية (thumbnail) <span class="text-rose-500" data-v-e8346942>*</span></span>`);
			if (thumbnailPreview.value) _push(`<span class="text-[10px] font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full" data-v-e8346942> جاهزة للمعاينة </span>`);
			else _push(`<!---->`);
			_push(`</label><div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3" data-v-e8346942>`);
			if (thumbnailPreview.value) _push(`<div class="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md bg-white group" data-v-e8346942><img${ssrRenderAttr("src", thumbnailPreview.value)} class="w-full h-full object-contain p-1" alt="معاينة الصورة المصغرة" data-v-e8346942><div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2" data-v-e8346942><button type="button" class="bg-amber-400 text-slate-900 px-2.5 py-1 rounded-xl text-xs font-black shadow hover:bg-amber-500" data-v-e8346942> استبدال </button><button type="button" class="bg-rose-500 text-white p-1.5 rounded-xl text-xs shadow hover:bg-rose-600" title="حذف الصورة" data-v-e8346942> ✕ </button></div></div>`);
			else _push(`<!---->`);
			_push(`<input type="file" accept="image/*" class="hidden" data-v-e8346942><div class="flex items-center gap-2" data-v-e8346942><button type="button" class="py-2 px-4 rounded-xl text-xs font-black bg-amber-400 text-[#0B0E28] hover:bg-amber-500 shadow-sm cursor-pointer" data-v-e8346942>${ssrInterpolate(thumbnailPreview.value ? "اختر صورة جديدة للاستبدال" : "رفع الصورة المصغرة")}</button>`);
			if (thumbnailPreview.value) _push(`<button type="button" class="py-2 px-3 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer" data-v-e8346942> حذف </button>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (thumbnailName.value) _push(`<p class="text-xs font-bold text-slate-600 truncate max-w-[260px]" dir="ltr" data-v-e8346942>${ssrInterpolate(thumbnailName.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="space-y-2" data-v-e8346942><label class="text-xs font-extrabold text-slate-800 block flex items-center justify-between" data-v-e8346942><span data-v-e8346942>معرض صور المنتج الإضافية (images[])</span>`);
			if (galleryPreviews.value.length > 0) _push(`<span class="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full" data-v-e8346942>${ssrInterpolate(galleryPreviews.value.length)} صور </span>`);
			else _push(`<!---->`);
			_push(`</label><div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl text-center flex flex-col items-center justify-center gap-3" data-v-e8346942>`);
			if (galleryPreviews.value.length > 0) {
				_push(`<div class="flex flex-wrap gap-2.5 justify-center max-h-48 overflow-y-auto p-1" data-v-e8346942><!--[-->`);
				ssrRenderList(galleryPreviews.value, (prev, gIdx) => {
					_push(`<div class="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-white" data-v-e8346942><img${ssrRenderAttr("src", prev)} class="w-full h-full object-cover" data-v-e8346942><button type="button" class="absolute top-0.5 end-0.5 bg-rose-500 text-white w-4 h-4 flex items-center justify-center rounded-full text-[10px] shadow hover:bg-rose-600 cursor-pointer" title="حذف هذه الصورة" data-v-e8346942> ✕ </button></div>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<!---->`);
			_push(`<input type="file" accept="image/*" multiple class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-slate-800 file:text-white hover:file:bg-slate-900 cursor-pointer" data-v-e8346942></div></div></div>`);
			if (form.colors_active && (form.colors || []).length > 0) {
				_push(`<div class="pt-4 border-t border-slate-100 space-y-3" data-v-e8346942><h4 class="text-sm font-bold text-slate-800" data-v-e8346942>صور المنتجات حسب اللون المختار (color_image[COLOR_CODE])</h4><div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" data-v-e8346942><!--[-->`);
				ssrRenderList(form.colors, (colorCode) => {
					_push(`<div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3" data-v-e8346942><div class="flex items-center justify-between" data-v-e8346942><div class="flex items-center gap-2" data-v-e8346942><span class="w-4 h-4 rounded-full border border-slate-300 shadow-inner" style="${ssrRenderStyle({ backgroundColor: normalizeHex(colorCode) })}" data-v-e8346942></span><span class="text-xs font-black text-slate-900" data-v-e8346942>#${ssrInterpolate(cleanColorCode(colorCode))}</span></div>`);
					if (colorImageNames[cleanColorCode(colorCode)]) _push(`<span class="text-[10px] font-bold text-emerald-600" data-v-e8346942>تم الاختيار</span>`);
					else _push(`<!---->`);
					_push(`</div>`);
					if (colorImagePreviews[cleanColorCode(colorCode)]) _push(`<div class="w-16 h-16 rounded-xl overflow-hidden border border-slate-200" data-v-e8346942><img${ssrRenderAttr("src", colorImagePreviews[cleanColorCode(colorCode)])} class="w-full h-full object-cover" data-v-e8346942></div>`);
					else _push(`<!---->`);
					_push(`<input type="file" accept="image/*" class="block w-full text-[11px] text-slate-500 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-[11px] file:font-bold file:bg-slate-200 file:text-slate-800 cursor-pointer" data-v-e8346942></div>`);
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/ProductFormAdvanced.vue
var _sfc_setup = ProductFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup;
ProductFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ProductFormAdvanced.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ProductFormAdvanced_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ProductFormAdvanced_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-e8346942"]]), { __name: "DashboardProductFormAdvanced" });
//#endregion
//#region composables/useAdminProducts.ts
/**
* Dedicated Admin Products Composable with Pagination Support
* Handles fetchProducts, page navigation, deleteProduct, and submitForm (FormData)
*/
var useAdminProducts = () => {
	const toast = useToast();
	const { adminCookie } = useAdminAuth();
	const products = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const errorMessage = ref("");
	const currentPage = ref(1);
	const lastPage = ref(1);
	const perPage = ref(10);
	const totalProducts = ref(0);
	const getToken = () => {
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	/**
	* 1. GET Products List with Pagination (page & limit)
	*/
	const fetchProducts = async (page = currentPage.value, limit = perPage.value) => {
		isLoading.value = true;
		errorMessage.value = "";
		currentPage.value = page;
		perPage.value = limit;
		const token = getToken();
		try {
			const res = await adminProductsApiService.fetchProducts(token, page, limit);
			if (res.success) {
				products.value = res.data;
				if (res.pagination) {
					currentPage.value = res.pagination.current_page;
					lastPage.value = res.pagination.last_page;
					perPage.value = res.pagination.per_page;
					totalProducts.value = res.pagination.total;
				}
			} else errorMessage.value = res.message || "تعذر جلب قائمة المنتجات.";
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب المنتجات.";
		} finally {
			isLoading.value = false;
		}
		return products.value;
	};
	/**
	* Navigate to a specific page
	*/
	const changePage = async (page) => {
		if (page < 1 || page > lastPage.value || page === currentPage.value) return;
		await fetchProducts(page, perPage.value);
	};
	/**
	* 2. DELETE Product by ID
	*/
	const deleteProduct = async (id) => {
		const token = getToken();
		isLoading.value = true;
		try {
			const res = await adminProductsApiService.deleteProduct(id, token);
			if (res.success) {
				products.value = products.value.filter((p) => String(p.id) !== String(id));
				totalProducts.value = Math.max(0, totalProducts.value - 1);
				toast.success("تم الحذف", res.message || "تم حذف المنتج بنجاح.");
				return true;
			} else {
				toast.error("خطأ في الحذف", res.message || "لم نتمكن من حذف المنتج.");
				return false;
			}
		} catch (err) {
			toast.error("خطأ في الشبكة", "تعذر الاتصال بالسيرفر لحذف المنتج.");
			return false;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* 3. SUBMIT Form (Two-step flow: Upload images to /upload-images -> send names to /add or /update)
	*/
	const submitForm = async (payload, isEditMode = false, productId) => {
		isSubmitting.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const processedPayload = { ...payload };
			if (payload.thumbnail && typeof payload.thumbnail !== "string" && (payload.thumbnail instanceof File || payload.thumbnail instanceof Blob)) {
				const thumbRes = await adminProductsApiService.uploadProductImage(payload.thumbnail, "thumbnail", token);
				if (!thumbRes.success || !thumbRes.imageName) throw new Error(thumbRes.message || "فشل رفع صورة الغلاف (Thumbnail).");
				processedPayload.thumbnail = thumbRes.imageName;
			} else if (typeof payload.thumbnail === "string") processedPayload.thumbnail = extractCleanFilename(payload.thumbnail);
			if (payload.images && payload.images.length > 0) {
				const uploadedImages = [];
				for (const img of payload.images) if (img && typeof img !== "string" && (img instanceof File || img instanceof Blob)) {
					const imgRes = await adminProductsApiService.uploadProductImage(img, "product", token);
					if (!imgRes.success || !imgRes.imageName) throw new Error(imgRes.message || "فشل رفع إحدى صور المنتج.");
					uploadedImages.push(imgRes.imageName);
				} else if (typeof img === "string" && img.trim()) uploadedImages.push(extractCleanFilename(img));
				processedPayload.images = uploadedImages;
			}
			if (payload.color_images && Object.keys(payload.color_images).length > 0) {
				const uploadedColorImages = {};
				for (const [colorKey, fileOrStr] of Object.entries(payload.color_images)) if (fileOrStr && typeof fileOrStr !== "string" && (fileOrStr instanceof File || fileOrStr instanceof Blob)) {
					const colorImgRes = await adminProductsApiService.uploadProductImage(fileOrStr, "product", token);
					if (!colorImgRes.success || !colorImgRes.imageName) throw new Error(colorImgRes.message || `فشل رفع صورة اللون ${colorKey}`);
					uploadedColorImages[colorKey] = colorImgRes.imageName;
				} else if (typeof fileOrStr === "string" && fileOrStr.trim()) uploadedColorImages[colorKey] = extractCleanFilename(fileOrStr);
				processedPayload.color_images = uploadedColorImages;
			}
			const formData = buildProductFormData(processedPayload);
			let res;
			if (isEditMode && (productId || processedPayload.id)) {
				const id = productId || processedPayload.id;
				res = await adminProductsApiService.updateProduct(id, formData, token);
			} else res = await adminProductsApiService.addProduct(formData, token);
			if (res.success) {
				toast.success(isEditMode ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح", res.message || (isEditMode ? "تم تحديث بيانات المنتج." : "تم إضافة المنتج الجديد إلى القائمة."));
				await fetchProducts(currentPage.value, perPage.value);
				return true;
			} else {
				errorMessage.value = res.message || "فشل حفظ بيانات المنتج.";
				toast.error("فشل العملية", errorMessage.value);
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.data?.message || err?.message || "حدث خطأ أثناء حفظ بيانات وصور المنتج.";
			toast.error("خطأ في العملية", errorMessage.value);
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	/**
	* 4. GET Product Details by ID for Edit Form
	*/
	const fetchProductDetails = async (id) => {
		isLoading.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const res = await adminProductsApiService.fetchProductDetails(id, token);
			if (res.success && res.data) return res.data;
			else {
				errorMessage.value = res.message || "تعذر جلب تفاصيل المنتج.";
				return null;
			}
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب تفاصيل المنتج.";
			return null;
		} finally {
			isLoading.value = false;
		}
	};
	return {
		products,
		isLoading,
		isSubmitting,
		errorMessage,
		currentPage,
		lastPage,
		perPage,
		totalProducts,
		fetchProducts,
		fetchProductDetails,
		changePage,
		deleteProduct,
		submitForm
	};
};

export { ProductFormAdvanced_default as P, useAdminProducts as u };
//# sourceMappingURL=useAdminProducts-CVjbM0a2.mjs.map
