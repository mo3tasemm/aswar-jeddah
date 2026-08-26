import { f as useAdminAuth, a as useToast } from '../virtual/entry.mjs';
import { a as adminNavbarApiService } from './adminNavbarApiService-D0ZIw4fK.mjs';
import { a as adminBrandsApiService } from './adminBrandsApiService-CxliYt3r.mjs';
import { a as adminCategoriesApiService } from './adminCategoriesApiService-nS8glRi_.mjs';
import { ref, computed } from 'vue';

//#region composables/useAdminNavbar.ts
/**
* Admin Navbar Composable (useAdminNavbar)
* Manages full navbar state, tree construction, Drag & Drop reordering, and CRUD operations.
*/
var useAdminNavbar = () => {
	const toast = useToast();
	const { adminCookie, adminToken } = useAdminAuth();
	const rawItems = ref([]);
	const isLoading = ref(false);
	const isSubmitting = ref(false);
	const isReordering = ref(false);
	const deletingId = ref(null);
	const dbCategories = ref([]);
	const dbBrands = ref([]);
	const isLoadingOptions = ref(false);
	const getToken = () => {
		if (adminToken?.value) return adminToken.value;
		if (adminCookie?.value) return adminCookie.value;
		return "";
	};
	const treeItems = computed(() => {
		const list = [...rawItems.value];
		list.sort((a, b) => (Number(a.sort_order) || 0) - (Number(b.sort_order) || 0));
		if (list.some((item) => Array.isArray(item.children) && item.children.length > 0)) return list;
		const itemMap = /* @__PURE__ */ new Map();
		list.forEach((item) => {
			itemMap.set(item.id, {
				...item,
				children: []
			});
		});
		const rootItems = [];
		list.forEach((item) => {
			const current = itemMap.get(item.id);
			if (item.parent_id && itemMap.has(item.parent_id)) {
				const parent = itemMap.get(item.parent_id);
				if (!parent.children) parent.children = [];
				parent.children.push(current);
			} else rootItems.push(current);
		});
		return rootItems;
	});
	const parentOptions = computed(() => {
		return rawItems.value.filter((item) => !item.parent_id || item.parent_id === 0 || item.parent_id === "0");
	});
	const totalCount = computed(() => rawItems.value.length);
	const topLevelCount = computed(() => parentOptions.value.length);
	const subItemsCount = computed(() => totalCount.value - topLevelCount.value);
	const activeCount = computed(() => rawItems.value.filter((i) => i.is_active === 1 || i.is_active === true).length);
	const fetchNavbarItems = async () => {
		isLoading.value = true;
		try {
			const token = getToken();
			const res = await adminNavbarApiService.fetchNavbarItems(token);
			if (res.success && Array.isArray(res.data)) rawItems.value = res.data;
			return rawItems.value;
		} catch (err) {
			console.warn("[useAdminNavbar] Failed to fetch navbar:", err);
			return [];
		} finally {
			isLoading.value = false;
		}
	};
	const fetchAutocompleteOptions = async () => {
		isLoadingOptions.value = true;
		try {
			const token = getToken();
			const [catRes, brandRes] = await Promise.allSettled([adminCategoriesApiService.fetchCategories(token, "", 1), adminBrandsApiService.fetchBrands(token, "", 1, 100)]);
			if (catRes.status === "fulfilled" && catRes.value.success) dbCategories.value = catRes.value.data.map((c) => ({
				id: c.id,
				name: c.name_ar || c.name || c.name_en || "قسم",
				slug: c.slug || (c.name_en || c.name || String(c.id)).toLowerCase().replace(/\s+/g, "-")
			}));
			if (brandRes.status === "fulfilled" && brandRes.value.success) dbBrands.value = brandRes.value.data.map((b) => ({
				id: b.id,
				name: b.name_ar || b.name || b.name_en || "ماركة",
				slug: b.slug || (b.name_en || b.name || String(b.id)).toLowerCase().replace(/\s+/g, "-")
			}));
		} catch (err) {
			console.warn("[useAdminNavbar] Error fetching options:", err);
		} finally {
			isLoadingOptions.value = false;
		}
	};
	const createNavbarItem = async (payload) => {
		isSubmitting.value = true;
		try {
			const token = getToken();
			const sortOrder = payload.sort_order || rawItems.value.length + 1;
			const res = await adminNavbarApiService.createNavbarItem(token, {
				...payload,
				sort_order: sortOrder
			});
			if (res.success && res.data) rawItems.value.push(res.data);
			else await fetchNavbarItems();
			toast.success("تمت إضافة عنصر القائمة بنجاح!");
			return res;
		} catch (err) {
			toast.error(err.data?.message || "حدث خطأ أثناء إضافة العنصر");
			throw err;
		} finally {
			isSubmitting.value = false;
		}
	};
	const updateNavbarItem = async (id, payload) => {
		isSubmitting.value = true;
		try {
			const token = getToken();
			const res = await adminNavbarApiService.updateNavbarItem(token, id, payload);
			const idx = rawItems.value.findIndex((i) => String(i.id) === String(id));
			if (idx !== -1 && res.data) rawItems.value[idx] = {
				...rawItems.value[idx],
				...res.data
			};
			else await fetchNavbarItems();
			toast.success("تم حفظ تعديلات عنصر القائمة بنجاح!");
			return res;
		} catch (err) {
			toast.error(err.data?.message || "حدث خطأ أثناء تعديل العنصر");
			throw err;
		} finally {
			isSubmitting.value = false;
		}
	};
	const deleteNavbarItem = async (id) => {
		deletingId.value = id;
		try {
			const token = getToken();
			await adminNavbarApiService.deleteNavbarItem(token, id);
			rawItems.value = rawItems.value.filter((i) => String(i.id) !== String(id) && String(i.parent_id) !== String(id));
			toast.success("تم حذف عنصر القائمة بنجاح!");
		} catch (err) {
			toast.error(err.data?.message || "تعذر حذف عنصر القائمة");
			throw err;
		} finally {
			deletingId.value = null;
		}
	};
	const toggleActiveStatus = async (item) => {
		const newStatus = item.is_active === 1 || item.is_active === true ? 0 : 1;
		const prevStatus = item.is_active;
		item.is_active = newStatus;
		try {
			const token = getToken();
			await adminNavbarApiService.updateNavbarItem(token, item.id, { is_active: newStatus });
			toast.success(newStatus === 1 ? "تم تفعيل العنصر بنجاح" : "تم تعطيل العنصر");
		} catch (err) {
			item.is_active = prevStatus;
			toast.error("تعذر تغيير حالة العنصر");
		}
	};
	const reorderNavbarItems = async (orderedItems) => {
		isReordering.value = true;
		try {
			const token = getToken();
			const payload = orderedItems.map((item, idx) => {
				item.sort_order = idx + 1;
				return {
					id: item.id,
					sort_order: idx + 1
				};
			});
			await adminNavbarApiService.reorderNavbarItems(token, payload);
			toast.success("تم تحديث ترتيب القوائم بنجاح!");
		} catch (err) {
			console.error("[useAdminNavbar] Reorder error:", err);
			toast.error("تعذر حفظ الترتيب الجديد");
		} finally {
			isReordering.value = false;
		}
	};
	return {
		rawItems,
		treeItems,
		parentOptions,
		totalCount,
		topLevelCount,
		subItemsCount,
		activeCount,
		isLoading,
		isSubmitting,
		isReordering,
		deletingId,
		dbCategories,
		dbBrands,
		isLoadingOptions,
		fetchNavbarItems,
		fetchAutocompleteOptions,
		createNavbarItem,
		updateNavbarItem,
		deleteNavbarItem,
		toggleActiveStatus,
		reorderNavbarItems
	};
};

export { useAdminNavbar as u };
//# sourceMappingURL=useAdminNavbar-w3yxR_La.mjs.map
