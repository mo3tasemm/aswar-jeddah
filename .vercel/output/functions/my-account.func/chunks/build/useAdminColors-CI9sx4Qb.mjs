import { $ as $fetch$2, f as useAdminAuth, _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { ref, computed, defineComponent, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList } from 'vue/server-renderer';

//#region services/adminColorsApiService.ts
/**
* Admin Colors API Service Layer
* Live API Endpoints:
* 1. GET /api/v1/admin/colors/list?searchValue={searchValue}&page={page}&limit={limit}&_t={timestamp}
* 2. POST /api/v1/admin/colors/add (FormData)
* 3. POST /api/v1/admin/colors/update/{id} (FormData)
* 4. DELETE /api/v1/admin/colors/delete/{id}
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
/**
* Normalizes hex code to standard `#RRGGBB` format or raw string
*/
function normalizeHexCode(code) {
	if (!code) return "#000000";
	const trimmed = code.trim();
	return trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
}
/**
* Builds FormData payload for Admin Add/Update Color API
* Nuxt/$fetch handles multipart/form-data boundary automatically when passing FormData
*/
function buildColorFormData(payload) {
	const formData = new FormData();
	formData.append("name", (payload.name || "").trim());
	formData.append("color_type", payload.color_type || "code");
	if (payload.color_type === "code") {
		const cleanCode = normalizeHexCode(payload.code);
		formData.append("code", cleanCode);
	} else if (payload.color_type === "image") {
		if (payload.imageFile && payload.imageFile instanceof File) formData.append("image", payload.imageFile);
	}
	return formData;
}
var adminColorsApiService = {
	/**
	* 1. GET Admin Colors List (with pagination, anti-cache & searchValue)
	*/
	async fetchColors(token, searchValue = "", page = 1, limit = 10) {
		try {
			const queryParams = new URLSearchParams();
			if (searchValue.trim()) queryParams.append("searchValue", searchValue.trim());
			queryParams.append("page", String(page));
			queryParams.append("limit", String(limit));
			queryParams.append("_t", String(Date.now()));
			const endpoint = `${API_BASE_URL}/admin/colors/list?${queryParams.toString()}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest",
					"Cache-Control": "no-cache, no-store, must-revalidate",
					"Pragma": "no-cache",
					"Expires": "0"
				},
				retry: 1,
				timeout: 1e4
			});
			let rawList = [];
			let pagination = {
				current_page: page,
				last_page: 1,
				per_page: limit,
				total: 0
			};
			if (Array.isArray(response)) {
				rawList = response;
				pagination.total = response.length;
				pagination.last_page = Math.ceil(response.length / limit) || 1;
			} else if (response && typeof response === "object") {
				rawList = response.colors || response.data || response.list || [];
				const meta = response.meta || response.pagination || response;
				pagination.current_page = Number(meta.current_page || meta.page || page);
				pagination.per_page = Number(meta.per_page || meta.limit || limit);
				pagination.total = Number(meta.total || rawList.length);
				pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1);
			}
			return {
				success: true,
				data: rawList.map((c) => {
					let detectedType = "code";
					if (c.color_type) detectedType = c.color_type === "image" ? "image" : "code";
					else if (c.image || c.image_full_url?.path) detectedType = "image";
					const rawCode = c.code || c.hex || c.color_code || "";
					const imageUrl = c.image_full_url?.path || c.image || "";
					return {
						id: c.id,
						name: c.name || c.name_ar || "لون بدون اسم",
						color_type: detectedType,
						code: rawCode ? normalizeHexCode(rawCode) : "#000000",
						image: imageUrl,
						image_full_url: c.image_full_url || (imageUrl ? { path: imageUrl } : void 0),
						created_at: c.created_at || "",
						updated_at: c.updated_at || ""
					};
				}),
				pagination
			};
		} catch (err) {
			console.warn("Admin fetchColors Error:", err?.data?.message || err?.message || err);
			return {
				success: false,
				data: [],
				pagination: {
					current_page: page,
					last_page: 1,
					per_page: limit,
					total: 0
				},
				message: err?.data?.message || err?.message || "فشل جلب قائمة الألوان."
			};
		}
	},
	/**
	* 2. POST Add Admin Color (FormData)
	*/
	async addColor(formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/colors/add`;
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
				success: true,
				message: response?.message || "تمت إضافة اللون بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin addColor Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل إضافة اللون الجديد."
			};
		}
	},
	/**
	* 3. POST Update Admin Color (FormData)
	*/
	async updateColor(id, formData, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/colors/update/${id}`;
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
				success: true,
				message: response?.message || "تم تحديث بيانات اللون بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin updateColor Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل تحديث بيانات اللون."
			};
		}
	},
	/**
	* 4. DELETE Admin Color
	*/
	async deleteColor(id, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/colors/delete/${id}`;
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
				}))?.message || "تم حذف اللون بنجاح."
			};
		} catch (err) {
			console.error("Admin deleteColor Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل حذف اللون."
			};
		}
	}
};

//#region components/dashboard/ColorFormAdvanced.vue?vue&type=script&setup=true&lang.ts
var ColorFormAdvanced_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ColorFormAdvanced",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEditMode: {
			type: Boolean,
			default: false
		},
		isSubmitting: {
			type: Boolean,
			default: false
		}
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const formTitle = computed(() => {
			return props.isEditMode ? "تعديل بيانات اللون" : "إضافة لون جديد";
		});
		const submitButtonText = computed(() => {
			if (props.isSubmitting) return "جاري الإرسال (FormData)...";
			return props.isEditMode ? "حفظ التعديلات" : "إضافة اللون";
		});
		const imageUploadHint = computed(() => {
			return props.isEditMode ? "(اختياري عند التعديل - اتركها للإبقاء على الصورة الحالية)" : "(إجباري عند الإضافة - يدعم PNG, JPG, WEBP)";
		});
		ref(null);
		const formError = ref("");
		const fileName = ref("");
		const imagePreview = ref(props.initialData?.existingImage || "");
		const form = reactive({
			id: props.initialData?.id || "",
			name: props.initialData?.name || "",
			color_type: props.initialData?.color_type || "code",
			code: props.initialData?.code || "#000000",
			imageFile: null,
			existingImage: props.initialData?.existingImage || ""
		});
		const presetColors = [
			{
				name: "أسود",
				code: "#000000"
			},
			{
				name: "أبيض",
				code: "#FFFFFF"
			},
			{
				name: "رمادي",
				code: "#6B7280"
			},
			{
				name: "فضي",
				code: "#CBD5E1"
			},
			{
				name: "أحمر",
				code: "#EF4444"
			},
			{
				name: "عنابي",
				code: "#881337"
			},
			{
				name: "برتقالي",
				code: "#F97316"
			},
			{
				name: "أصفر",
				code: "#FACC15"
			},
			{
				name: "ذهبي",
				code: "#D97706"
			},
			{
				name: "أخضر",
				code: "#10B981"
			},
			{
				name: "زيتي",
				code: "#365314"
			},
			{
				name: "أزرق",
				code: "#3B82F6"
			},
			{
				name: "كحلي",
				code: "#1E3A8A"
			},
			{
				name: "سماوي",
				code: "#06B6D4"
			},
			{
				name: "بنفسجي",
				code: "#8B5CF6"
			},
			{
				name: "وردي",
				code: "#EC4899"
			},
			{
				name: "بيج",
				code: "#E2D9C8"
			},
			{
				name: "بني",
				code: "#78350F"
			}
		];
		const normalizedHex = computed({
			get: () => {
				let hex = form.code || "#000000";
				if (!hex.startsWith("#")) hex = `#${hex}`;
				return /^#[0-9A-F]{6}$/i.test(hex) ? hex : "#000000";
			},
			set: (val) => {
				form.code = val.toUpperCase();
			}
		});
		const previewColor = computed(() => {
			const c = form.code || "#000000";
			return c.startsWith("#") ? c : `#${c}`;
		});
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.id = newVal.id || "";
				form.name = newVal.name || "";
				form.color_type = newVal.color_type || "code";
				form.code = newVal.code || "#000000";
				if (newVal.existingImage) {
					form.existingImage = newVal.existingImage;
					imagePreview.value = newVal.existingImage;
				}
			}
		}, {
			immediate: true,
			deep: true
		});
		const isDark = computed(() => {
			let c = previewColor.value.replace("#", "");
			if (c.length === 3) c = c.split("").map((x) => x + x).join("");
			const r = parseInt(c.substring(0, 2), 16) || 0;
			const g = parseInt(c.substring(2, 4), 16) || 0;
			const b = parseInt(c.substring(4, 6), 16) || 0;
			return (r * 299 + g * 587 + b * 114) / 1e3 < 128;
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-614446f6><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-614446f6><div data-v-614446f6><h2 class="text-xl sm:text-2xl font-black text-slate-900" data-v-614446f6>${ssrInterpolate(formTitle.value)}</h2><p class="text-xs sm:text-sm text-slate-500 font-medium mt-1" data-v-614446f6> حدد اسم اللون ونوعه (كود سداسي عشري أو صورة نقوش/خامة) لإرسال البيانات كـ FormData. </p></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-614446f6><button type="button" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer" data-v-614446f6> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-614446f6>`);
			if (__props.isSubmitting) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-614446f6></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-614446f6>${ssrInterpolate(submitButtonText.value)}</span></button></div></div>`);
			if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake" data-v-614446f6><svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-614446f6><circle cx="12" cy="12" r="10" data-v-614446f6></circle><line x1="12" y1="8" x2="12" y2="12" data-v-614446f6></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-614446f6></line></svg><span data-v-614446f6>${ssrInterpolate(formError.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 xl:grid-cols-3 gap-6" data-v-614446f6><div class="xl:col-span-2 space-y-6" data-v-614446f6><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-614446f6><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-614446f6><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-614446f6></span> البيانات الأساسية ونوع اللون </h3><div class="space-y-1.5" data-v-614446f6><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-614446f6> اسم اللون <span class="text-rose-500" data-v-614446f6>*</span></label><input type="text"${ssrRenderAttr("value", form.name)} placeholder="مثال: أحمر ياقوتي، أزرق كحلي، رمادي ميتاليك..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" data-v-614446f6><p class="text-[11px] text-slate-400 font-medium" data-v-614446f6>الاسم الذي يظهر للعملاء في صفحة المنتج وفلاتر البحث.</p></div><div class="space-y-2" data-v-614446f6><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-614446f6> نوع اللون (Color Type) <span class="text-rose-500" data-v-614446f6>*</span></label><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-614446f6><button type="button" class="${ssrRenderClass([form.color_type === "code" ? "border-amber-400 bg-amber-50/40 shadow-sm" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600", "p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 cursor-pointer"])}" data-v-614446f6><div class="${ssrRenderClass([form.color_type === "code" ? "bg-amber-400 text-[#0B0E28]" : "bg-white text-slate-400 border border-slate-200", "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"])}" data-v-614446f6><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4 4 4 0 014-4c.498 0 .973.092 1.411.26a2 2 0 002.502-.952l1.642-3.284a2 2 0 012.772-.892l.836.418a2 2 0 01.892 2.772l-1.642 3.284a2 2 0 00-.26 1.411A4 4 0 0111 21H7z" data-v-614446f6></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 7l4 4m2-6a3 3 0 11-4.243 4.243L12 7" data-v-614446f6></path></svg></div><div class="space-y-1" data-v-614446f6><div class="flex items-center gap-2" data-v-614446f6><span class="text-sm font-extrabold text-slate-900" data-v-614446f6>كود لون (Hex Code)</span>`);
			if (form.color_type === "code") _push(`<span class="w-2 h-2 rounded-full bg-amber-500" data-v-614446f6></span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs text-slate-500 font-medium leading-relaxed" data-v-614446f6> استخدام لون أحادي مصمت عبر كود الـ Hex (مثال: #FF0000). </p></div></button><button type="button" class="${ssrRenderClass([form.color_type === "image" ? "border-amber-400 bg-amber-50/40 shadow-sm" : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 text-slate-600", "p-4 rounded-2xl border-2 text-right transition-all flex items-start gap-3 cursor-pointer"])}" data-v-614446f6><div class="${ssrRenderClass([form.color_type === "image" ? "bg-amber-400 text-[#0B0E28]" : "bg-white text-slate-400 border border-slate-200", "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-xs"])}" data-v-614446f6><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-614446f6></path></svg></div><div class="space-y-1" data-v-614446f6><div class="flex items-center gap-2" data-v-614446f6><span class="text-sm font-extrabold text-slate-900" data-v-614446f6>صورة / نقوش (Image)</span>`);
			if (form.color_type === "image") _push(`<span class="w-2 h-2 rounded-full bg-amber-500" data-v-614446f6></span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs text-slate-500 font-medium leading-relaxed" data-v-614446f6> رفع صورة لخامة أو نقشة مميزة أو تدرج لوني خاص. </p></div></button></div></div></div>`);
			if (form.color_type === "code") {
				_push(`<div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-614446f6><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-614446f6><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-614446f6></span> تحديد كود اللون وقائمته السريعة </h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center" data-v-614446f6><div class="space-y-1.5" data-v-614446f6><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-614446f6> كود الـ Hex <span class="text-rose-500" data-v-614446f6>*</span></label><div class="flex items-center gap-2" data-v-614446f6><div class="relative w-12 h-12 rounded-xl border border-slate-200 overflow-hidden shrink-0 shadow-inner cursor-pointer" data-v-614446f6><input type="color"${ssrRenderAttr("value", normalizedHex.value)} class="absolute -top-4 -left-4 w-20 h-20 cursor-pointer border-0 p-0" data-v-614446f6></div><div class="relative flex-1" data-v-614446f6><input type="text"${ssrRenderAttr("value", form.code)} placeholder="#1E40AF" maxlength="7" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black font-mono text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 uppercase" dir="ltr" data-v-614446f6></div></div><p class="text-[11px] text-slate-400 font-medium" data-v-614446f6>يمكنك كتابة الكود مباشرة أو النقر على المربع لاختيار اللون.</p></div><div class="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl flex items-center gap-3" data-v-614446f6><div class="w-10 h-10 rounded-xl shadow-md border border-black/10 shrink-0" style="${ssrRenderStyle({ backgroundColor: previewColor.value })}" data-v-614446f6></div><div data-v-614446f6><span class="text-xs font-bold text-slate-700 block" data-v-614446f6>اللون المحدد:</span><span class="text-sm font-black font-mono text-slate-900 uppercase" data-v-614446f6>${ssrInterpolate(previewColor.value)}</span></div></div></div><div class="space-y-2 pt-2 border-t border-slate-100" data-v-614446f6><span class="text-xs font-extrabold text-[#0B0E28] block" data-v-614446f6> ألوان سريعة شائعة (Quick Colors): </span><div class="flex flex-wrap gap-2" data-v-614446f6><!--[-->`);
				ssrRenderList(presetColors, (preset) => {
					_push(`<button type="button" class="${ssrRenderClass([(form.code || "").toUpperCase() === preset.code.toUpperCase() ? "border-amber-400 bg-amber-50 text-slate-900 shadow-xs" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50", "group relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all text-xs font-bold cursor-pointer"])}"${ssrRenderAttr("title", `${preset.name} (${preset.code})`)} data-v-614446f6><span class="w-4 h-4 rounded-full border border-black/15 shadow-2xs shrink-0" style="${ssrRenderStyle({ backgroundColor: preset.code })}" data-v-614446f6></span><span data-v-614446f6>${ssrInterpolate(preset.name)}</span></button>`);
				});
				_push(`<!--]--></div></div></div>`);
			} else if (form.color_type === "image") {
				_push(`<div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-614446f6><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-614446f6><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-614446f6></span> رفع صورة نقشة أو خامة اللون </h3><div class="p-6 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-3xl transition-all text-center cursor-pointer group" data-v-614446f6><input type="file" accept="image/*" class="hidden" data-v-614446f6><div class="space-y-2" data-v-614446f6><div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform" data-v-614446f6><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-614446f6></path></svg></div><p class="text-sm font-extrabold text-[#0B0E28]" data-v-614446f6> اضغط هنا لاختيار صورة اللون أو اسحب الملف وأفلته </p><p class="text-xs text-slate-400 font-medium" data-v-614446f6>${ssrInterpolate(imageUploadHint.value)}</p></div></div>`);
				if (fileName.value) _push(`<div class="flex items-center justify-between p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-bold text-emerald-800" data-v-614446f6><div class="flex items-center gap-2 truncate" data-v-614446f6><svg class="w-4 h-4 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" data-v-614446f6></path></svg><span class="truncate" data-v-614446f6>الملف المحدد: ${ssrInterpolate(fileName.value)}</span></div><button type="button" class="text-rose-600 hover:text-rose-800 underline text-xs shrink-0 cursor-pointer" data-v-614446f6> إلغاء التحديد </button></div>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`</div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between" data-v-614446f6><div class="space-y-6" data-v-614446f6><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-614446f6><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-614446f6></span> معاينة اللون الحية (Live Preview) </h3><div class="space-y-4" data-v-614446f6>`);
			if (form.color_type === "code") _push(`<div class="w-full h-44 rounded-2xl border border-slate-200 shadow-inner flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300 relative overflow-hidden" style="${ssrRenderStyle({ backgroundColor: previewColor.value })}" data-v-614446f6><div class="${ssrRenderClass([isDark.value ? "bg-white/80 text-slate-900" : "bg-slate-900/80 text-white", "px-3 py-1.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-2 backdrop-blur-md"])}" data-v-614446f6><span data-v-614446f6>${ssrInterpolate(form.name || "اسم اللون")}</span><span class="font-mono text-[11px]" data-v-614446f6>${ssrInterpolate(previewColor.value)}</span></div><div class="w-10 h-10 rounded-full border-2 border-white shadow-lg" style="${ssrRenderStyle({ backgroundColor: previewColor.value })}" data-v-614446f6></div></div>`);
			else if (form.color_type === "image") {
				_push(`<div class="w-full h-44 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner overflow-hidden flex items-center justify-center relative p-2" data-v-614446f6>`);
				if (imagePreview.value) _push(`<img${ssrRenderAttr("src", imagePreview.value)} class="w-full h-full object-cover rounded-xl" alt="Color Image Preview" data-v-614446f6>`);
				else _push(`<div class="flex flex-col items-center justify-center text-slate-400 gap-1" data-v-614446f6><svg class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-614446f6></path></svg><span class="text-xs font-bold" data-v-614446f6>لا توجد صورة محددة</span></div>`);
				_push(`</div>`);
			} else _push(`<!---->`);
			_push(`<div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs font-medium text-slate-600" data-v-614446f6><div class="flex justify-between items-center" data-v-614446f6><span class="text-slate-400" data-v-614446f6>الاسم:</span><span class="font-extrabold text-slate-900" data-v-614446f6>${ssrInterpolate(form.name || "لم يُحدد")}</span></div><div class="flex justify-between items-center" data-v-614446f6><span class="text-slate-400" data-v-614446f6>النوع:</span><span class="${ssrRenderClass([form.color_type === "code" ? "text-amber-600" : "text-indigo-600", "font-extrabold"])}" data-v-614446f6>${ssrInterpolate(form.color_type === "code" ? "كود لون (Hex)" : "صورة (Image)")}</span></div>`);
			if (form.color_type === "code") _push(`<div class="flex justify-between items-center" data-v-614446f6><span class="text-slate-400" data-v-614446f6>القيمة:</span><span class="font-black font-mono text-slate-900 uppercase" data-v-614446f6>${ssrInterpolate(previewColor.value)}</span></div>`);
			else _push(`<div class="flex justify-between items-center" data-v-614446f6><span class="text-slate-400" data-v-614446f6>ملف الصورة:</span><span class="font-bold text-slate-900 truncate max-w-[140px]" data-v-614446f6>${ssrInterpolate(fileName.value || (imagePreview.value ? "صورة مرفوعة" : "غير متوفر"))}</span></div>`);
			_push(`</div></div></div><div class="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/50 text-[11px] text-amber-900 font-medium flex items-center gap-2 mt-4" data-v-614446f6><svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-614446f6><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-614446f6></path></svg><span data-v-614446f6>تظهر هذه الألوان مباشرة في خيارات المنتجات وفلاتر المتجر.</span></div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/ColorFormAdvanced.vue
var _sfc_setup = ColorFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup;
ColorFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ColorFormAdvanced.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ColorFormAdvanced_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(ColorFormAdvanced_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-614446f6"]]), { __name: "DashboardColorFormAdvanced" });
//#endregion
//#region composables/useAdminColors.ts
/**
* Dedicated Admin Colors Composable with Pagination, Search & Auto-Refetch Support
* Handles fetchColors, changePage, deleteColor, submitForm (FormData)
*/
var useAdminColors = () => {
	const toast = useToast();
	const { adminCookie } = useAdminAuth();
	const colors = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const errorMessage = ref("");
	const searchQuery = ref("");
	const currentPage = ref(1);
	const lastPage = ref(1);
	const perPage = ref(10);
	const totalColors = ref(0);
	const getToken = () => {
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	/**
	* 1. GET Colors List (with pagination, anti-cache & searchValue)
	*/
	const fetchColors = async (search = searchQuery.value, page = currentPage.value, limit = perPage.value) => {
		isLoading.value = true;
		errorMessage.value = "";
		currentPage.value = page;
		perPage.value = limit;
		const token = getToken();
		try {
			const res = await adminColorsApiService.fetchColors(token, search, page, limit);
			if (res.success) {
				colors.value = [...res.data];
				if (res.pagination) {
					currentPage.value = res.pagination.current_page;
					lastPage.value = res.pagination.last_page;
					perPage.value = res.pagination.per_page;
					totalColors.value = res.pagination.total;
				}
			} else errorMessage.value = res.message || "تعذر جلب قائمة الألوان.";
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب الألوان.";
		} finally {
			isLoading.value = false;
		}
		return colors.value;
	};
	/**
	* Navigate to a specific page
	*/
	const changePage = async (page) => {
		if (page < 1 || page > lastPage.value || page === currentPage.value) return;
		await fetchColors(searchQuery.value, page, perPage.value);
	};
	/**
	* 2. DELETE Color by ID
	*/
	const deleteColor = async (id) => {
		const token = getToken();
		isLoading.value = true;
		try {
			const res = await adminColorsApiService.deleteColor(id, token);
			if (res.success) {
				colors.value = colors.value.filter((c) => String(c.id) !== String(id));
				totalColors.value = Math.max(0, totalColors.value - 1);
				toast.success("تم الحذف", res.message || "تم حذف اللون بنجاح.");
				return true;
			} else {
				toast.error("خطأ في الحذف", res.message || "لم نتمكن من حذف اللون.");
				return false;
			}
		} catch (err) {
			toast.error("خطأ في الشبكة", "تعذر الاتصال بالسيرفر لحذف اللون.");
			return false;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* 3. SUBMIT Form (POST Add / POST Update via FormData) with Immediate Refetch
	*/
	const submitForm = async (payload, isEditMode = false, colorId) => {
		isSubmitting.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const formData = buildColorFormData(payload);
			let res;
			if (isEditMode && (colorId || payload.id)) {
				const id = colorId || payload.id;
				res = await adminColorsApiService.updateColor(id, formData, token);
			} else res = await adminColorsApiService.addColor(formData, token);
			if (res.success) {
				toast.success(isEditMode ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح", res.message || (isEditMode ? "تم تحديث بيانات اللون بنجاح." : "تم إضافة اللون الجديد بنجاح."));
				if (!isEditMode && res.data) {
					const newItem = {
						id: res.data.id || Date.now(),
						name: payload.name,
						color_type: payload.color_type,
						code: payload.code,
						image: res.data.image_full_url?.path || res.data.image || ""
					};
					colors.value = [newItem, ...colors.value];
					totalColors.value = totalColors.value + 1;
				} else if (isEditMode && (colorId || payload.id)) {
					const targetId = String(colorId || payload.id);
					const idx = colors.value.findIndex((c) => String(c.id) === targetId);
					if (idx !== -1) colors.value[idx] = {
						...colors.value[idx],
						name: payload.name,
						color_type: payload.color_type,
						code: payload.code,
						image: payload.existingImage || colors.value[idx].image
					};
				}
				await fetchColors(searchQuery.value, currentPage.value, perPage.value);
				return true;
			} else {
				errorMessage.value = res.message || "فشل حفظ بيانات اللون.";
				toast.error("فشل العملية", errorMessage.value);
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.data?.message || err?.message || "حدث خطأ غير متوقع أثناء إرسال بيانات اللون.";
			toast.error("خطأ في النظام", errorMessage.value);
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	/**
	* Find a color item by ID from local list or API
	*/
	const getColorById = async (id) => {
		const existing = colors.value.find((c) => String(c.id) === String(id));
		if (existing) return existing;
		return (await fetchColors("", 1, 100)).find((c) => String(c.id) === String(id)) || null;
	};
	return {
		colors,
		isLoading,
		isSubmitting,
		errorMessage,
		searchQuery,
		currentPage,
		lastPage,
		perPage,
		totalColors,
		totalCount: computed(() => totalColors.value || colors.value.length),
		codeColorsCount: computed(() => colors.value.filter((c) => c.color_type === "code").length),
		imageColorsCount: computed(() => colors.value.filter((c) => c.color_type === "image").length),
		fetchColors,
		changePage,
		deleteColor,
		submitForm,
		getColorById
	};
};

export { ColorFormAdvanced_default as C, useAdminColors as u };
//# sourceMappingURL=useAdminColors-CI9sx4Qb.mjs.map
