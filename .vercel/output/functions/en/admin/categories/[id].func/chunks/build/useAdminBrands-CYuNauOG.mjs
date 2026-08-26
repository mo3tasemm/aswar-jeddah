import { f as useAdminAuth, _ as _plugin_vue_export_helper_default, a as useToast } from '../virtual/entry.mjs';
import { b as buildBrandFormData, a as adminBrandsApiService } from './adminBrandsApiService-CxliYt3r.mjs';
import { ref, defineComponent, reactive, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';

//#region components/dashboard/BrandFormAdvanced.vue?vue&type=script&setup=true&lang.ts
var BrandFormAdvanced_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "BrandFormAdvanced",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEditMode: { type: Boolean },
		isSubmitting: { type: Boolean }
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const formError = ref("");
		const fileName = ref("");
		const imagePreview = ref(props.initialData?.existingImage || "");
		const form = reactive({
			id: props.initialData?.id || "",
			name_ar: props.initialData?.name_ar || "",
			name_en: props.initialData?.name_en || "",
			imageFile: null
		});
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.id = newVal.id || "";
				form.name_ar = newVal.name_ar || "";
				form.name_en = newVal.name_en || "";
				if (newVal.existingImage) imagePreview.value = newVal.existingImage;
			}
		}, { immediate: true });
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-a95a1cdd><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-a95a1cdd><div data-v-a95a1cdd><h2 class="text-xl sm:text-2xl font-black text-slate-900" data-v-a95a1cdd>${ssrInterpolate(__props.isEditMode ? "تعديل علامة تجارية" : "إضافة علامة تجارية جديدة")}</h2><p class="text-xs sm:text-sm text-slate-500 font-medium mt-1" data-v-a95a1cdd> أدخل اسم البراند بالعربية والإنجليزية وحدد صورة الشعار (اللوجو) ليتم إرسال البيانات كـ FormData. </p></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-a95a1cdd><button type="button" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors" data-v-a95a1cdd> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-a95a1cdd>`);
			if (__props.isSubmitting) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-a95a1cdd></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-a95a1cdd>${ssrInterpolate(__props.isSubmitting ? "جاري الإرسال (FormData)..." : __props.isEditMode ? "حفظ التعديلات" : "إضافة البراند")}</span></button></div></div>`);
			if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake" data-v-a95a1cdd><svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-a95a1cdd><circle cx="12" cy="12" r="10" data-v-a95a1cdd></circle><line x1="12" y1="8" x2="12" y2="12" data-v-a95a1cdd></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-a95a1cdd></line></svg><span data-v-a95a1cdd>${ssrInterpolate(formError.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 xl:grid-cols-3 gap-6" data-v-a95a1cdd><div class="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-a95a1cdd><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-a95a1cdd><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-a95a1cdd></span> اسم العلامة التجارية (Arabic &amp; English Brand Names) </h3><div class="space-y-1.5" data-v-a95a1cdd><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-a95a1cdd> اسم العلامة التجارية (بالعربية) <span class="text-rose-500" data-v-a95a1cdd>*</span></label><input type="text"${ssrRenderAttr("value", form.name_ar)} placeholder="مثال: سامسونج / LG..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-a95a1cdd></div><div class="space-y-1.5" data-v-a95a1cdd><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-a95a1cdd> اسم العلامة التجارية (بالإنجليزية) </label><input type="text"${ssrRenderAttr("value", form.name_en)} placeholder="e.g. Samsung / LG..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" dir="ltr" data-v-a95a1cdd></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-a95a1cdd><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-a95a1cdd><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-a95a1cdd></span> شعار العلامة التجارية (image File Object) </h3><div class="space-y-3 text-center" data-v-a95a1cdd><div class="w-32 h-32 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden mx-auto flex items-center justify-center relative p-2" data-v-a95a1cdd>`);
			if (imagePreview.value) _push(`<img${ssrRenderAttr("src", imagePreview.value)} class="w-full h-full object-contain" alt="Brand Logo Preview" data-v-a95a1cdd>`);
			else _push(`<svg class="w-10 h-10 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-a95a1cdd><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" data-v-a95a1cdd></path></svg>`);
			_push(`</div><div class="p-4 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl" data-v-a95a1cdd><label class="block text-xs font-bold text-slate-700 mb-2" data-v-a95a1cdd> اختر ملف الشعار ${ssrInterpolate(__props.isEditMode ? "(اختياري عند التعديل)" : "(إجباري عند الإضافة)")}</label><input type="file" accept="image/*" class="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-amber-400 file:text-[#0B0E28] hover:file:bg-amber-500 cursor-pointer" data-v-a95a1cdd></div>`);
			if (fileName.value) _push(`<p class="text-xs font-bold text-emerald-600" data-v-a95a1cdd> الملف المحدد: ${ssrInterpolate(fileName.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/BrandFormAdvanced.vue
var _sfc_setup = BrandFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup;
BrandFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/BrandFormAdvanced.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var BrandFormAdvanced_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(BrandFormAdvanced_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-a95a1cdd"]]), { __name: "DashboardBrandFormAdvanced" });
//#endregion
//#region composables/useAdminBrands.ts
/**
* Dedicated Admin Brands Composable with Pagination & Auto-Refetch Support
* Handles fetchBrands, changePage, deleteBrand, and submitForm (FormData)
*/
var useAdminBrands = () => {
	const toast = useToast();
	const { adminCookie } = useAdminAuth();
	const brands = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const errorMessage = ref("");
	const searchQuery = ref("");
	const currentPage = ref(1);
	const lastPage = ref(1);
	const perPage = ref(10);
	const totalBrands = ref(0);
	const getToken = () => {
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	/**
	* 1. GET Brands List (with pagination, anti-cache & searchValue)
	*/
	const fetchBrands = async (search = searchQuery.value, page = currentPage.value, limit = perPage.value) => {
		isLoading.value = true;
		errorMessage.value = "";
		currentPage.value = page;
		perPage.value = limit;
		const token = getToken();
		try {
			const res = await adminBrandsApiService.fetchBrands(token, search, page, limit);
			if (res.success) {
				brands.value = [...res.data];
				if (res.pagination) {
					currentPage.value = res.pagination.current_page;
					lastPage.value = res.pagination.last_page;
					perPage.value = res.pagination.per_page;
					totalBrands.value = res.pagination.total;
				}
			} else errorMessage.value = res.message || "تعذر جلب قائمة العلامات التجارية.";
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب العلامات التجارية.";
		} finally {
			isLoading.value = false;
		}
		return brands.value;
	};
	/**
	* Navigate to a specific page
	*/
	const changePage = async (page) => {
		if (page < 1 || page > lastPage.value || page === currentPage.value) return;
		await fetchBrands(searchQuery.value, page, perPage.value);
	};
	/**
	* 2. DELETE Brand by ID
	*/
	const deleteBrand = async (id) => {
		const token = getToken();
		isLoading.value = true;
		try {
			const res = await adminBrandsApiService.deleteBrand(id, token);
			if (res.success) {
				brands.value = brands.value.filter((b) => String(b.id) !== String(id));
				totalBrands.value = Math.max(0, totalBrands.value - 1);
				toast.success("تم الحذف", res.message || "تم حذف العلامة التجارية بنجاح.");
				return true;
			} else {
				toast.error("خطأ في الحذف", res.message || "لم نتمكن من حذف العلامة التجارية.");
				return false;
			}
		} catch (err) {
			toast.error("خطأ في الشبكة", "تعذر الاتصال بالسيرفر لحذف العلامة التجارية.");
			return false;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* 3. SUBMIT Form (POST Add / POST Update via FormData) with Immediate Refetch
	*/
	const submitForm = async (payload, isEditMode = false, brandId) => {
		isSubmitting.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const formData = buildBrandFormData(payload);
			let res;
			if (isEditMode && (brandId || payload.id)) {
				const id = brandId || payload.id;
				res = await adminBrandsApiService.updateBrand(id, formData, token);
			} else res = await adminBrandsApiService.addBrand(formData, token);
			if (res.success) {
				toast.success(isEditMode ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح", res.message || (isEditMode ? "تم تحديث بيانات العلامة التجارية." : "تم إضافة العلامة التجارية الجديدة بنجاح."));
				if (!isEditMode && res.data) {
					const newItem = {
						id: res.data.id || Date.now(),
						name: payload.name_ar,
						name_ar: payload.name_ar,
						name_en: payload.name_en || "",
						image: res.data.image_full_url?.path || res.data.image || ""
					};
					brands.value = [newItem, ...brands.value];
					totalBrands.value = totalBrands.value + 1;
				} else if (isEditMode && (brandId || payload.id)) {
					const targetId = String(brandId || payload.id);
					const idx = brands.value.findIndex((b) => String(b.id) === targetId);
					if (idx !== -1) brands.value[idx] = {
						...brands.value[idx],
						name: payload.name_ar,
						name_ar: payload.name_ar,
						name_en: payload.name_en || ""
					};
				}
				await fetchBrands(searchQuery.value, currentPage.value, perPage.value);
				return true;
			} else {
				errorMessage.value = res.message || "فشل حفظ بيانات العلامة التجارية.";
				toast.error("فشل العملية", errorMessage.value);
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.data?.message || err?.message || "حدث خطأ غير متوقع أثناء إرسال بيانات العلامة التجارية.";
			toast.error("خطأ في النظام", errorMessage.value);
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	return {
		brands,
		isLoading,
		isSubmitting,
		errorMessage,
		searchQuery,
		currentPage,
		lastPage,
		perPage,
		totalBrands,
		fetchBrands,
		changePage,
		deleteBrand,
		submitForm
	};
};

export { BrandFormAdvanced_default as B, useAdminBrands as u };
//# sourceMappingURL=useAdminBrands-CYuNauOG.mjs.map
