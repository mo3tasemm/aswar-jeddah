import { $ as $fetch$2, f as useAdminAuth, _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { ref, computed, defineComponent, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';

//#region services/adminAttributesApiService.ts
/**
* Admin Attributes API Service Layer with Multi-language (AR & EN) Support
* Live API Endpoints:
* 1. GET /api/v1/admin/attributes/list?searchValue={searchValue}&page={page}&limit={limit}&_t={timestamp}
* 2. POST /api/v1/admin/attributes/add (JSON: name[], lang[])
* 3. POST /api/v1/admin/attributes/update/{id} (JSON: name[], lang[])
* 4. DELETE /api/v1/admin/attributes/delete/{id}
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
/**
* Universal Multi-Language Text Extractor Helper for Attributes
*/
function extractMultiLangAttribute(item) {
	if (!item) return {
		ar: "",
		en: ""
	};
	let ar = "";
	let en = "";
	if (item.name_ar) ar = String(item.name_ar);
	if (item.name_en) en = String(item.name_en);
	if (item.name && typeof item.name === "object" && !Array.isArray(item.name)) {
		if (!ar && item.name.ar) ar = String(item.name.ar);
		if (!en && item.name.en) en = String(item.name.en);
	}
	if (Array.isArray(item.translations)) item.translations.forEach((t) => {
		const locale = (t.locale || t.lang || t.language || "").toLowerCase();
		const val = t.value || t.name || "";
		if (locale === "ar" && !ar) ar = String(val);
		if (locale === "en" && !en) en = String(val);
	});
	if (!ar && typeof item.name === "string" && item.name) ar = item.name;
	if (!en) en = ar;
	return {
		ar,
		en
	};
}
/**
* Builds JSON payload for Admin Add/Update Attribute API
*/
function buildAttributeJsonPayload(payload) {
	return {
		name: [(payload.name_ar || "").trim(), (payload.name_en || payload.name_ar || "").trim()],
		lang: ["ar", "en"]
	};
}
var adminAttributesApiService = {
	/**
	* 1. GET Admin Attributes List
	*/
	async fetchAttributes(token, searchValue = "", page = 1, limit = 10) {
		try {
			const queryParams = new URLSearchParams();
			if (searchValue.trim()) queryParams.append("searchValue", searchValue.trim());
			queryParams.append("page", String(page));
			queryParams.append("limit", String(limit));
			queryParams.append("_t", String(Date.now()));
			const endpoint = `${API_BASE_URL}/admin/attributes/list?${queryParams.toString()}`;
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
				rawList = response.attributes || response.data || response.list || [];
				const meta = response.meta || response.pagination || response;
				pagination.current_page = Number(meta.current_page || meta.page || page);
				pagination.per_page = Number(meta.per_page || meta.limit || limit);
				pagination.total = Number(meta.total || rawList.length);
				pagination.last_page = Number(meta.last_page || meta.total_pages || Math.ceil(pagination.total / pagination.per_page) || 1);
			}
			return {
				success: true,
				data: rawList.map((a) => {
					const langData = extractMultiLangAttribute(a);
					return {
						id: a.id,
						name: langData.ar || langData.en || "سمة بدون اسم",
						name_ar: langData.ar,
						name_en: langData.en,
						created_at: a.created_at || "",
						updated_at: a.updated_at || "",
						values: a.values || []
					};
				}),
				pagination
			};
		} catch (err) {
			console.warn("Admin fetchAttributes Error:", err?.data?.message || err?.message || err);
			return {
				success: false,
				data: [],
				pagination: {
					current_page: page,
					last_page: 1,
					per_page: limit,
					total: 0
				},
				message: err?.data?.message || err?.message || "فشل جلب قائمة السمات."
			};
		}
	},
	/**
	* 2. POST Add Admin Attribute (JSON)
	*/
	async addAttribute(payload, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/attributes/add`;
			const jsonBody = buildAttributeJsonPayload(payload);
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: jsonBody,
				timeout: 15e3
			});
			return {
				success: true,
				message: response?.message || "تمت إضافة السمة بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin addAttribute Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل إضافة السمة الجديدة."
			};
		}
	},
	/**
	* 3. POST Update Admin Attribute (JSON)
	*/
	async updateAttribute(id, payload, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/attributes/update/${id}`;
			const jsonBody = buildAttributeJsonPayload(payload);
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"Content-Type": "application/json",
					"Accept-Language": "ar",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: jsonBody,
				timeout: 15e3
			});
			return {
				success: true,
				message: response?.message || "تم تحديث بيانات السمة بنجاح.",
				data: response?.data || response
			};
		} catch (err) {
			console.error("Admin updateAttribute Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل تحديث السمة."
			};
		}
	},
	/**
	* 4. DELETE Admin Attribute
	*/
	async deleteAttribute(id, token) {
		try {
			const endpoint = `${API_BASE_URL}/admin/attributes/delete/${id}`;
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
				}))?.message || "تم حذف السمة بنجاح."
			};
		} catch (err) {
			console.error("Admin deleteAttribute Error:", err);
			return {
				success: false,
				message: err?.data?.message || err?.message || "فشل حذف السمة."
			};
		}
	}
};

//#region components/dashboard/AttributeFormAdvanced.vue?vue&type=script&setup=true&lang.ts
var AttributeFormAdvanced_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AttributeFormAdvanced",
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
		const formError = ref("");
		const form = reactive({
			id: props.initialData?.id || "",
			name_ar: props.initialData?.name_ar || "",
			name_en: props.initialData?.name_en || ""
		});
		const formTitle = computed(() => {
			return props.isEditMode ? "تعديل بيانات السمة" : "إضافة سمة جديدة";
		});
		const submitButtonText = computed(() => {
			if (props.isSubmitting) return "جاري الحفظ (JSON)...";
			return props.isEditMode ? "حفظ التعديلات" : "إضافة السمة";
		});
		const presetAttributes = [
			{
				ar: "المقاس",
				en: "Size"
			},
			{
				ar: "الوزن",
				en: "Weight"
			},
			{
				ar: "الخامة",
				en: "Material"
			},
			{
				ar: "الحجم",
				en: "Volume"
			},
			{
				ar: "الطول",
				en: "Length"
			},
			{
				ar: "الذاكرة",
				en: "Storage"
			},
			{
				ar: "السعة",
				en: "Capacity"
			},
			{
				ar: "الموديل",
				en: "Model"
			},
			{
				ar: "النمط",
				en: "Style"
			}
		];
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.id = newVal.id || "";
				form.name_ar = newVal.name_ar || "";
				form.name_en = newVal.name_en || "";
			}
		}, {
			immediate: true,
			deep: true
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-39b225c1><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-39b225c1><div data-v-39b225c1><h2 class="text-xl sm:text-2xl font-black text-slate-900" data-v-39b225c1>${ssrInterpolate(formTitle.value)}</h2><p class="text-xs sm:text-sm text-slate-500 font-medium mt-1" data-v-39b225c1> أدخل اسم السمة بالعربية والإنجليزية (مثل: المقاس / Size) ليتم إرسالها بصيغة المصفوفات عبر JSON. </p></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-39b225c1><button type="button" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer" data-v-39b225c1> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-39b225c1>`);
			if (__props.isSubmitting) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-39b225c1></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-39b225c1>${ssrInterpolate(submitButtonText.value)}</span></button></div></div>`);
			if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake" data-v-39b225c1><svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-39b225c1><circle cx="12" cy="12" r="10" data-v-39b225c1></circle><line x1="12" y1="8" x2="12" y2="12" data-v-39b225c1></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-39b225c1></line></svg><span data-v-39b225c1>${ssrInterpolate(formError.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 xl:grid-cols-3 gap-6" data-v-39b225c1><div class="xl:col-span-2 space-y-6" data-v-39b225c1><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-39b225c1><div class="flex items-center justify-between" data-v-39b225c1><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-39b225c1><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-39b225c1></span> بيانات السمة واللغات المدعومة (Multilingual Names) </h3><span class="px-2.5 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-100" data-v-39b225c1> JSON Array Format </span></div><div class="space-y-1.5" data-v-39b225c1><div class="flex items-center justify-between" data-v-39b225c1><label class="text-xs font-extrabold text-[#0B0E28] flex items-center gap-1.5" data-v-39b225c1><span data-v-39b225c1>اسم السمة (بالعربية - name[0])</span><span class="text-rose-500" data-v-39b225c1>*</span></label><span class="text-[11px] font-bold text-slate-400" data-v-39b225c1>lang: ar</span></div><div class="relative" data-v-39b225c1><input type="text"${ssrRenderAttr("value", form.name_ar)} placeholder="مثال: المقاس، الوزن، الخامة، السعة..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" data-v-39b225c1></div><p class="text-[11px] text-slate-400 font-medium" data-v-39b225c1>اسم الخاصية أو السمة كما سيظهر للمستخدمين بالعربية.</p></div><div class="space-y-1.5" data-v-39b225c1><div class="flex items-center justify-between" data-v-39b225c1><label class="text-xs font-extrabold text-[#0B0E28] flex items-center gap-1.5" data-v-39b225c1><span data-v-39b225c1>اسم السمة (بالإنجليزية - name[1])</span><span class="text-rose-500" data-v-39b225c1>*</span></label><span class="text-[11px] font-bold text-slate-400" data-v-39b225c1>lang: en</span></div><div class="relative" data-v-39b225c1><input type="text"${ssrRenderAttr("value", form.name_en)} placeholder="e.g. Size, Weight, Material, Capacity..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all" dir="ltr" data-v-39b225c1></div><p class="text-[11px] text-slate-400 font-medium" data-v-39b225c1>الاسم بالإنجليزية (شرط أساسي في الـ API للترجمة).</p></div><div class="space-y-2 pt-2 border-t border-slate-100" data-v-39b225c1><span class="text-xs font-extrabold text-[#0B0E28] block" data-v-39b225c1> سمات شائعة جاهزة للاختيار السريع: </span><div class="flex flex-wrap gap-2" data-v-39b225c1><!--[-->`);
			ssrRenderList(presetAttributes, (preset) => {
				_push(`<button type="button" class="${ssrRenderClass([form.name_ar === preset.ar && form.name_en === preset.en ? "border-amber-400 bg-amber-50 text-slate-900 shadow-xs" : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50", "group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all text-xs font-bold cursor-pointer"])}" data-v-39b225c1><span data-v-39b225c1>${ssrInterpolate(preset.ar)}</span><span class="text-slate-300" data-v-39b225c1>|</span><span class="text-slate-400 font-medium" dir="ltr" data-v-39b225c1>${ssrInterpolate(preset.en)}</span></button>`);
			});
			_push(`<!--]--></div></div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between" data-v-39b225c1><div class="space-y-6" data-v-39b225c1><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-39b225c1><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-39b225c1></span> معاينة السمة في المتجر (Live Preview) </h3><div class="space-y-4" data-v-39b225c1><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3" data-v-39b225c1><span class="text-[11px] font-bold text-slate-400 block" data-v-39b225c1>شكل الخاصية في صفحة تفاصيل المنتج:</span><div class="space-y-2" data-v-39b225c1><span class="text-xs font-black text-slate-800 block" data-v-39b225c1>${ssrInterpolate(form.name_ar || "اسم السمة")} (${ssrInterpolate(form.name_en || "Attribute")}): </span><div class="flex flex-wrap gap-2" data-v-39b225c1><div class="px-3 py-1.5 rounded-xl border-2 border-amber-400 bg-amber-50 text-[#0B0E28] font-bold text-xs shadow-xs" data-v-39b225c1> خيار 1 (افتراضي) </div><div class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-xs" data-v-39b225c1> خيار 2 </div><div class="px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-600 font-medium text-xs" data-v-39b225c1> خيار 3 </div></div></div></div><div class="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5 text-xs font-medium text-slate-600" data-v-39b225c1><div class="flex justify-between items-center" data-v-39b225c1><span class="text-slate-400" data-v-39b225c1>الاسم العربي:</span><span class="font-extrabold text-slate-900" data-v-39b225c1>${ssrInterpolate(form.name_ar || "لم يُحدد")}</span></div><div class="flex justify-between items-center" data-v-39b225c1><span class="text-slate-400" data-v-39b225c1>الاسم الإنجليزي:</span><span class="font-extrabold text-slate-900" dir="ltr" data-v-39b225c1>${ssrInterpolate(form.name_en || "Not set")}</span></div><div class="flex justify-between items-center" data-v-39b225c1><span class="text-slate-400" data-v-39b225c1>هيكل الإرسال:</span><span class="font-mono text-[11px] font-bold text-indigo-600" data-v-39b225c1>name[], lang[]</span></div></div></div></div><div class="p-3 bg-amber-50/50 rounded-2xl border border-amber-200/50 text-[11px] text-amber-900 font-medium flex items-center gap-2 mt-4" data-v-39b225c1><svg class="w-4 h-4 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-39b225c1><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" data-v-39b225c1></path></svg><span data-v-39b225c1>تُستخدم هذه السمات لإنشاء تنوعات وخيارات المنتجات (Variations).</span></div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/AttributeFormAdvanced.vue
var _sfc_setup = AttributeFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup;
AttributeFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/AttributeFormAdvanced.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AttributeFormAdvanced_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(AttributeFormAdvanced_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-39b225c1"]]), { __name: "DashboardAttributeFormAdvanced" });
//#endregion
//#region composables/useAdminAttributes.ts
/**
* Dedicated Admin Attributes Composable with Pagination, Search & Auto-Refetch Support
* Handles fetchAttributes, changePage, deleteAttribute, and submitForm (JSON)
*/
var useAdminAttributes = () => {
	const toast = useToast();
	const { adminCookie } = useAdminAuth();
	const attributes = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const errorMessage = ref("");
	const searchQuery = ref("");
	const currentPage = ref(1);
	const lastPage = ref(1);
	const perPage = ref(10);
	const totalAttributes = ref(0);
	const getToken = () => {
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	/**
	* 1. GET Attributes List (with pagination, anti-cache & searchValue)
	*/
	const fetchAttributes = async (search = searchQuery.value, page = currentPage.value, limit = perPage.value) => {
		isLoading.value = true;
		errorMessage.value = "";
		currentPage.value = page;
		perPage.value = limit;
		const token = getToken();
		try {
			const res = await adminAttributesApiService.fetchAttributes(token, search, page, limit);
			if (res.success) {
				attributes.value = [...res.data];
				if (res.pagination) {
					currentPage.value = res.pagination.current_page;
					lastPage.value = res.pagination.last_page;
					perPage.value = res.pagination.per_page;
					totalAttributes.value = res.pagination.total;
				}
			} else errorMessage.value = res.message || "تعذر جلب قائمة السمات والخصائص.";
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب السمات.";
		} finally {
			isLoading.value = false;
		}
		return attributes.value;
	};
	/**
	* Navigate to a specific page
	*/
	const changePage = async (page) => {
		if (page < 1 || page > lastPage.value || page === currentPage.value) return;
		await fetchAttributes(searchQuery.value, page, perPage.value);
	};
	/**
	* 2. DELETE Attribute by ID
	*/
	const deleteAttribute = async (id) => {
		const token = getToken();
		isLoading.value = true;
		try {
			const res = await adminAttributesApiService.deleteAttribute(id, token);
			if (res.success) {
				attributes.value = attributes.value.filter((a) => String(a.id) !== String(id));
				totalAttributes.value = Math.max(0, totalAttributes.value - 1);
				toast.success("تم الحذف", res.message || "تم حذف السمة بنجاح.");
				return true;
			} else {
				toast.error("خطأ في الحذف", res.message || "لم نتمكن من حذف السمة.");
				return false;
			}
		} catch (err) {
			toast.error("خطأ في الشبكة", "تعذر الاتصال بالسيرفر لحذف السمة.");
			return false;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* 3. SUBMIT Form (POST Add / POST Update via JSON) with Immediate Refetch
	*/
	const submitForm = async (payload, isEditMode = false, attributeId) => {
		isSubmitting.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			let res;
			if (isEditMode && (attributeId || payload.id)) {
				const id = attributeId || payload.id;
				res = await adminAttributesApiService.updateAttribute(id, payload, token);
			} else res = await adminAttributesApiService.addAttribute(payload, token);
			if (res.success) {
				toast.success(isEditMode ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح", res.message || (isEditMode ? "تم تحديث بيانات السمة بنجاح." : "تم إضافة السمة الجديدة بنجاح."));
				if (!isEditMode && res.data) {
					const newItem = {
						id: res.data.id || Date.now(),
						name: payload.name_ar,
						name_ar: payload.name_ar,
						name_en: payload.name_en
					};
					attributes.value = [newItem, ...attributes.value];
					totalAttributes.value = totalAttributes.value + 1;
				} else if (isEditMode && (attributeId || payload.id)) {
					const targetId = String(attributeId || payload.id);
					const idx = attributes.value.findIndex((a) => String(a.id) === targetId);
					if (idx !== -1) attributes.value[idx] = {
						...attributes.value[idx],
						name: payload.name_ar,
						name_ar: payload.name_ar,
						name_en: payload.name_en
					};
				}
				await fetchAttributes(searchQuery.value, currentPage.value, perPage.value);
				return true;
			} else {
				errorMessage.value = res.message || "فشل حفظ بيانات السمة.";
				toast.error("فشل العملية", errorMessage.value);
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.data?.message || err?.message || "حدث خطأ غير متوقع أثناء إرسال بيانات السمة.";
			toast.error("خطأ في النظام", errorMessage.value);
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	/**
	* Find an attribute item by ID from local list or API
	*/
	const getAttributeById = async (id) => {
		const existing = attributes.value.find((a) => String(a.id) === String(id));
		if (existing) return existing;
		return (await fetchAttributes("", 1, 100)).find((a) => String(a.id) === String(id)) || null;
	};
	return {
		attributes,
		isLoading,
		isSubmitting,
		errorMessage,
		searchQuery,
		currentPage,
		lastPage,
		perPage,
		totalAttributes,
		totalCount: computed(() => totalAttributes.value || attributes.value.length),
		multilingualCount: computed(() => attributes.value.filter((a) => a.name_ar && a.name_en).length),
		fetchAttributes,
		changePage,
		deleteAttribute,
		submitForm,
		getAttributeById
	};
};

export { AttributeFormAdvanced_default as A, useAdminAttributes as u };
//# sourceMappingURL=useAdminAttributes-fz4oNP16.mjs.map
