import { f as useAdminAuth, a as useToast } from '../virtual/entry.mjs';
import { b as buildCategoryFormData, a as adminCategoriesApiService } from './adminCategoriesApiService-nS8glRi_.mjs';
import { ref, computed } from 'vue';

//#region composables/useAdminCategories.ts
/**
* Dedicated Admin Categories Composable with Auto-Refresh, Expandable Subcategories, & Dynamic Stats
* Handles fetchCategories, fetchSubcategories, fetchCategoryById, deleteCategory, toggleExpand, and submitForm (FormData)
*/
var useAdminCategories = () => {
	const toast = useToast();
	const { adminCookie, adminToken } = useAdminAuth();
	const categories = ref([]);
	const allSubcategories = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const errorMessage = ref("");
	const searchQuery = ref("");
	const currentPage = ref(1);
	const totalCount = ref(0);
	const expandedParentIds = ref(/* @__PURE__ */ new Set());
	const subcategoriesMap = ref({});
	const loadingSubcategoriesMap = ref({});
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const mainCategories = computed(() => {
		return categories.value.filter((c) => !c.parent_id || c.parent_id === 0 || c.parent_id === "0" || c.position === 0);
	});
	const mainCategoriesCount = computed(() => {
		return mainCategories.value.length;
	});
	const subCategoriesCount = computed(() => {
		const uniqueSubIds = /* @__PURE__ */ new Set();
		allSubcategories.value.forEach((s) => uniqueSubIds.add(s.id));
		Object.values(subcategoriesMap.value).forEach((list) => {
			list.forEach((s) => uniqueSubIds.add(s.id));
		});
		categories.value.forEach((cat) => {
			if (cat.subCategories && Array.isArray(cat.subCategories)) cat.subCategories.forEach((s) => uniqueSubIds.add(s.id));
		});
		return uniqueSubIds.size;
	});
	const totalCategoriesCount = computed(() => {
		return mainCategoriesCount.value + subCategoriesCount.value;
	});
	/**
	* 1. GET Categories List & All Subcategories in parallel for 100% dynamic stats
	*/
	const fetchCategories = async (search = searchQuery.value, page = currentPage.value) => {
		isLoading.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const [mainRes, subRes] = await Promise.allSettled([adminCategoriesApiService.fetchCategories(token, search, page), adminCategoriesApiService.fetchCategories(token, "", 1, { position: 1 })]);
			if (mainRes.status === "fulfilled" && mainRes.value.success) {
				categories.value = [...mainRes.value.data];
				totalCount.value = mainRes.value.total || mainRes.value.data.length;
				mainRes.value.data.forEach((cat) => {
					if (cat.subCategories && cat.subCategories.length > 0) {
						if (!subcategoriesMap.value[cat.id]) subcategoriesMap.value[cat.id] = [];
						cat.subCategories.forEach((s) => {
							if (!subcategoriesMap.value[cat.id].some((existing) => String(existing.id) === String(s.id))) subcategoriesMap.value[cat.id].push(s);
						});
					}
				});
			} else if (mainRes.status === "fulfilled" && !mainRes.value.success) errorMessage.value = mainRes.value.message || "تعذر جلب قائمة الأقسام.";
			if (subRes.status === "fulfilled" && subRes.value.success) {
				allSubcategories.value = [...subRes.value.data];
				subRes.value.data.forEach((sub) => {
					if (sub.parent_id && sub.parent_id !== 0 && sub.parent_id !== "0") {
						if (!subcategoriesMap.value[sub.parent_id]) subcategoriesMap.value[sub.parent_id] = [];
						if (!subcategoriesMap.value[sub.parent_id].some((s) => String(s.id) === String(sub.id))) subcategoriesMap.value[sub.parent_id].push(sub);
					}
				});
			}
		} catch (err) {
			errorMessage.value = "حدث خطأ في الشبكة أثناء جلب الأقسام.";
		} finally {
			isLoading.value = false;
		}
		return categories.value;
	};
	/**
	* 1.1 Fetch Subcategories for a specific parent ID
	* GET /api/v1/admin/categories/list?position=1&parent_id={parentId}
	*/
	const fetchSubcategories = async (parentId, force = false) => {
		if (!parentId) return [];
		if (loadingSubcategoriesMap.value[parentId]) return subcategoriesMap.value[parentId] || [];
		if (!force && subcategoriesMap.value[parentId] && subcategoriesMap.value[parentId].length > 0) return subcategoriesMap.value[parentId];
		loadingSubcategoriesMap.value[parentId] = true;
		const token = getToken();
		try {
			const res = await adminCategoriesApiService.fetchSubcategories(token, parentId);
			if (res.success) {
				subcategoriesMap.value[parentId] = [...res.data];
				const parent = categories.value.find((c) => String(c.id) === String(parentId));
				if (parent) parent.subCategories = [...res.data];
			}
		} catch (err) {
			console.warn(`[useAdminCategories] Error fetching subcategories for parent ${parentId}:`, err);
		} finally {
			loadingSubcategoriesMap.value[parentId] = false;
		}
		return subcategoriesMap.value[parentId] || [];
	};
	/**
	* 1.2 Fetch a single category by ID (Deep search)
	*/
	const fetchCategoryById = async (id) => {
		const token = getToken();
		try {
			const res = await adminCategoriesApiService.fetchCategoryById(id, token);
			if (res.success && res.data) return res.data;
			return null;
		} catch (err) {
			console.warn(`[useAdminCategories] Error fetching category ${id}:`, err);
			return null;
		}
	};
	/**
	* Toggle Expand / Collapse row for a parent category
	*/
	const toggleExpand = async (parentId) => {
		if (expandedParentIds.value.has(parentId)) expandedParentIds.value.delete(parentId);
		else {
			expandedParentIds.value.add(parentId);
			await fetchSubcategories(parentId);
		}
	};
	const isExpanded = (parentId) => {
		return expandedParentIds.value.has(parentId);
	};
	/**
	* 2. DELETE Category by ID (Main or Subcategory)
	*/
	const deleteCategory = async (id, parentId) => {
		const token = getToken();
		isLoading.value = true;
		try {
			const res = await adminCategoriesApiService.deleteCategory(id, token);
			if (res.success) {
				if (parentId && subcategoriesMap.value[parentId]) {
					subcategoriesMap.value[parentId] = subcategoriesMap.value[parentId].filter((s) => String(s.id) !== String(id));
					allSubcategories.value = allSubcategories.value.filter((s) => String(s.id) !== String(id));
					const parent = categories.value.find((c) => String(c.id) === String(parentId));
					if (parent && parent.subCategories) parent.subCategories = parent.subCategories.filter((s) => String(s.id) !== String(id));
				} else {
					categories.value = categories.value.filter((c) => String(c.id) !== String(id));
					delete subcategoriesMap.value[id];
					expandedParentIds.value.delete(id);
					totalCount.value = Math.max(0, totalCount.value - 1);
				}
				toast.success("تم الحذف", res.message || "تم حذف القسم بنجاح.");
				return true;
			} else {
				toast.error("خطأ في الحذف", res.message || "لم نتمكن من حذف القسم.");
				return false;
			}
		} catch (err) {
			toast.error("خطأ في الشبكة", "تعذر الاتصال بالسيرفر لحذف القسم.");
			return false;
		} finally {
			isLoading.value = false;
		}
	};
	/**
	* 3. SUBMIT Form (POST Add / POST Update via FormData)
	*/
	const submitForm = async (payload, isEditMode = false, categoryId) => {
		isSubmitting.value = true;
		errorMessage.value = "";
		const token = getToken();
		try {
			const formData = buildCategoryFormData(payload);
			let res;
			if (isEditMode && (categoryId || payload.id)) {
				const id = categoryId || payload.id;
				res = await adminCategoriesApiService.updateCategory(id, formData, token);
			} else res = await adminCategoriesApiService.addCategory(formData, token);
			if (res.success) {
				toast.success(isEditMode ? "تم التحديث بنجاح" : "تمت الإضافة بنجاح", res.message || (isEditMode ? "تم تحديث بيانات القسم." : "تم إضافة القسم الجديد بنجاح."));
				if (payload.parent_id && Number(payload.parent_id) > 0) {
					expandedParentIds.value.add(payload.parent_id);
					await fetchSubcategories(payload.parent_id, true);
				}
				await fetchCategories(searchQuery.value, currentPage.value);
				return true;
			} else {
				errorMessage.value = res.message || "فشل حفظ بيانات القسم.";
				toast.error("فشل العملية", errorMessage.value);
				return false;
			}
		} catch (err) {
			errorMessage.value = err?.data?.message || err?.message || "حدث خطأ غير متوقع أثناء إرسال بيانات القسم.";
			toast.error("خطأ في النظام", errorMessage.value);
			return false;
		} finally {
			isSubmitting.value = false;
		}
	};
	return {
		categories,
		mainCategories,
		mainCategoriesCount,
		subCategoriesCount,
		totalCategoriesCount,
		allSubcategories,
		isLoading,
		isSubmitting,
		errorMessage,
		searchQuery,
		currentPage,
		totalCount,
		expandedParentIds,
		subcategoriesMap,
		loadingSubcategoriesMap,
		toggleExpand,
		isExpanded,
		fetchCategories,
		fetchSubcategories,
		fetchCategoryById,
		deleteCategory,
		submitForm
	};
};

export { useAdminCategories as u };
//# sourceMappingURL=useAdminCategories-1__J71xC.mjs.map
