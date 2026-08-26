import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { p as productApiService } from './productApiService-DKwZsTgl.mjs';
import { ref, computed, watch } from 'vue';

//#region composables/useProducts.ts
/**
* Production-ready Vue 3 / Nuxt 3 Composable for Managing Pure Backend Products & Reviews State
*/
var useProducts = () => {
	const { apiLocale, currentLanguage } = useLanguage();
	const products = ref([]);
	const currentProduct = ref(null);
	const productReviews = ref([]);
	const pending = ref(false);
	const reviewsPending = ref(false);
	const error = ref(null);
	const totalProducts = ref(0);
	const lastParams = ref({});
	const isEmpty = computed(() => !pending.value && !error.value && products.value.length === 0);
	const hasError = computed(() => error.value !== null);
	/**
	* Fetch filtered products directly via WedgetStore Filter API with strict state overwrite
	*/
	const fetchFilteredProducts = async (params = {}) => {
		pending.value = true;
		error.value = null;
		products.value = [];
		lastParams.value = { ...params };
		const activeParams = {
			locale: params.locale || apiLocale.value,
			...params
		};
		try {
			const result = await productApiService.fetchFilteredProducts(activeParams);
			products.value = Array.isArray(result?.products) ? result.products : [];
			totalProducts.value = Number(result?.total) || products.value.length;
		} catch (err) {
			console.error("[useProducts] Filter request failed:", err);
			error.value = err?.message || (currentLanguage.value === "en" ? "An error occurred while fetching filtered products." : "حدث خطأ أثناء جلب المنتجات المفلترة.");
			products.value = [];
			totalProducts.value = 0;
		} finally {
			pending.value = false;
		}
	};
	/**
	* Fetch products list directly from WedgetStore Latest API
	*/
	const loadProducts = async (params = {}) => {
		return fetchFilteredProducts(params);
	};
	/**
	* Fetch details for a specific single product by slug or ID
	*/
	const loadProductBySlug = async (slugOrId) => {
		pending.value = true;
		error.value = null;
		currentProduct.value = null;
		productReviews.value = [];
		try {
			const result = await productApiService.fetchProductDetails(slugOrId, "1", apiLocale.value);
			if (!result) error.value = currentLanguage.value === "en" ? "The requested product is unavailable or not found." : "المنتج المطلوب غير موجود أو غير متاح حالياً.";
			else {
				currentProduct.value = result;
				if (result.id) loadProductReviews(result.id);
			}
		} catch (err) {
			console.error(`[useProducts] Failed to fetch product details for ${slugOrId}:`, err);
			error.value = currentLanguage.value === "en" ? "Could not load product details." : "تعذر تحميل تفاصيل المنتج.";
		} finally {
			pending.value = false;
		}
	};
	/**
	* Fetch live reviews list for a specific product ID
	*/
	const loadProductReviews = async (productId) => {
		reviewsPending.value = true;
		try {
			const data = await productApiService.fetchProductReviews(productId, "12345", apiLocale.value);
			productReviews.value = data;
		} catch (err) {
			console.warn(`[useProducts] Failed to load reviews for product ${productId}:`, err);
			productReviews.value = [];
		} finally {
			reviewsPending.value = false;
		}
	};
	/**
	* Watcher: Auto-refetch products whenever the locale/language changes anywhere in the app
	*/
	watch([apiLocale, currentLanguage], ([newLocale]) => {
		if (currentProduct.value?.slug) loadProductBySlug(currentProduct.value.slug);
		else if (lastParams.value && Object.keys(lastParams.value).length > 0) fetchFilteredProducts({
			...lastParams.value,
			locale: newLocale
		});
	});
	/**
	* Search products by keyword via backend API
	*/
	const searchProducts = async (query) => {
		if (!query.trim()) return fetchFilteredProducts();
		return fetchFilteredProducts({ search: query.trim() });
	};
	/**
	* Filter products by Category ID via backend API
	*/
	const loadCategoryProducts = async (categoryId, limit = 12) => {
		return fetchFilteredProducts({
			category_id: categoryId,
			limit
		});
	};
	/**
	* Filter products by Brand ID via backend API
	*/
	const loadBrandProducts = async (brandId, limit = 12) => {
		return fetchFilteredProducts({
			brand_id: brandId,
			limit
		});
	};
	return {
		products,
		currentProduct,
		productReviews,
		pending,
		reviewsPending,
		error,
		isEmpty,
		hasError,
		totalProducts,
		currentLocale: apiLocale,
		loadProducts,
		fetchFilteredProducts,
		loadProductBySlug,
		loadProductReviews,
		searchProducts,
		loadCategoryProducts,
		loadBrandProducts
	};
};

export { useProducts as u };
//# sourceMappingURL=useProducts-BMlxn0rw.mjs.map
