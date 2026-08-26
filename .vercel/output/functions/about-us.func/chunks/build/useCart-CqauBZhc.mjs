import { $ as $fetch$2, a as useToast } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { watch, computed, ref } from 'vue';

//#region types/product.ts
/**
* Utility Mapper: Converts raw API Product JSON into standardized Product UI Model with dynamic locale title, description & currency
*/
var mapApiProductToProduct = (rawInput) => {
	const apiProd = rawInput?.productFullInfo || rawInput?.product_full_info || rawInput?.product || rawInput?.product_details || rawInput?.product_all_status || rawInput?.details_product || rawInput;
	if (!apiProd || typeof apiProd !== "object") return {
		id: Math.random().toString(36).substring(7),
		title: "منتج مميز",
		slug: "",
		sku: "",
		price: 0,
		originalPrice: 0,
		discountPercentage: 0,
		hasDiscount: false,
		formattedPrice: "0 ر.س",
		thumbnail: "/images/placeholder.png",
		images: [],
		description: "",
		category: "عام",
		brand: "",
		brandName: "",
		inStock: true,
		stockCount: 5,
		rating: 0,
		reviewCount: 0
	};
	let prodTitle = "";
	{
		let arTitle = apiProd.name_ar || apiProd.title_ar;
		if (!arTitle && Array.isArray(apiProd.translations)) {
			const tr = apiProd.translations.find((t) => (t.key === "name" || t.key === "title") && (t.locale === "sa" || t.locale === "ar"));
			if (tr?.value) arTitle = String(tr.value).trim();
		}
		prodTitle = arTitle || apiProd.name || apiProd.title || "منتج مميز";
	}
	let prodDesc = "";
	{
		let arDesc = apiProd.details_ar || apiProd.description_ar;
		if (!arDesc && Array.isArray(apiProd.translations)) {
			const tr = apiProd.translations.find((t) => (t.key === "details" || t.key === "description") && (t.locale === "sa" || t.locale === "ar"));
			if (tr?.value) arDesc = String(tr.value).trim();
		}
		prodDesc = arDesc || apiProd.details || apiProd.description || "";
	}
	let imagePath = "";
	if (apiProd.thumbnail_full_url?.path && typeof apiProd.thumbnail_full_url.path === "string") imagePath = apiProd.thumbnail_full_url.path;
	else if (apiProd.image_full_url?.path && typeof apiProd.image_full_url.path === "string") imagePath = apiProd.image_full_url.path;
	else if (typeof apiProd.thumbnail === "string" && apiProd.thumbnail) imagePath = apiProd.thumbnail;
	else if (typeof apiProd.image === "string" && apiProd.image) imagePath = apiProd.image;
	else if (Array.isArray(apiProd.images_full_url) && apiProd.images_full_url.length > 0) {
		const valid = apiProd.images_full_url.find((i) => i?.path && typeof i.path === "string");
		if (valid?.path) imagePath = valid.path;
	} else if (Array.isArray(apiProd.images) && apiProd.images.length > 0) {
		const valid = apiProd.images[0];
		if (typeof valid === "string") imagePath = valid;
		else if (typeof valid === "object" && valid?.path) imagePath = valid.path;
	}
	if (imagePath && !imagePath.startsWith("http://") && !imagePath.startsWith("https://")) imagePath = `https://wedgetstore.com/${imagePath.replace(/^\/+/, "")}`;
	if (!imagePath) imagePath = "/images/placeholder.png";
	const images = (apiProd.images_full_url || []).map((img) => img?.path).filter((p) => Boolean(p && typeof p === "string")).map((p) => p.startsWith("http://") || p.startsWith("https://") ? p : `https://wedgetstore.com/${p.replace(/^\/+/, "")}`);
	if (images.length === 0) images.push(imagePath);
	const originalPrice = Number(apiProd.unit_price || apiProd.price || apiProd.purchase_price || apiProd.discounted_price) || 0;
	const price = Number(apiProd.discounted_price || apiProd.price || apiProd.unit_price) || originalPrice;
	const hasDiscount = originalPrice > price;
	let discountPercentage = 0;
	if (hasDiscount && originalPrice > 0) discountPercentage = Math.round((originalPrice - price) / originalPrice * 100);
	let categoryName = "عام";
	let categoryId = apiProd.category_id;
	if (typeof apiProd.category === "object" && apiProd.category?.name) {
		categoryName = apiProd.category.name;
		if (apiProd.category.id) categoryId = apiProd.category.id;
	} else if (typeof apiProd.category === "string" && apiProd.category.trim() !== "") categoryName = apiProd.category;
	let brandId = apiProd.brand_id;
	if (!brandId && apiProd.brand && typeof apiProd.brand === "object" && apiProd.brand?.id) brandId = apiProd.brand.id;
	let brandNameStr = "";
	if (apiProd.brand && typeof apiProd.brand === "object" && apiProd.brand?.name) brandNameStr = apiProd.brand.name;
	else if (typeof apiProd.brand === "string" && apiProd.brand.trim() !== "") brandNameStr = apiProd.brand.trim();
	else if (apiProd.brand_name && typeof apiProd.brand_name === "string") brandNameStr = apiProd.brand_name.trim();
	if (!brandNameStr && categoryName && categoryName !== "عام" && categoryName !== "General") brandNameStr = categoryName;
	const brandObj = {
		id: brandId || 0,
		name: brandNameStr || ""
	};
	const formatCurrency = (val) => {
		try {
			return `${val.toLocaleString("ar-SA")} ر.س`;
		} catch {
			return `${val} ر.س`;
		}
	};
	const extractedRating = Number(apiProd.rating || apiProd.rating_average || apiProd.reviews_avg_rating || apiProd.rating_avg || apiProd.avg_rating || 0) || 0;
	const extractedReviewCount = Number(apiProd.reviews_count || apiProd.rating_count || apiProd.reviewsCount || apiProd.reviewCount || 0) || 0;
	const resolvedId = apiProd.id || rawInput?.product_id || rawInput?.id || Math.random().toString(36).substring(7);
	return {
		id: resolvedId,
		title: prodTitle,
		slug: apiProd.slug || `product-${resolvedId}`,
		sku: apiProd.sku || `SKU-${resolvedId}`,
		price,
		originalPrice,
		discountPercentage,
		hasDiscount,
		formattedPrice: formatCurrency(price),
		formattedOriginalPrice: hasDiscount ? formatCurrency(originalPrice) : void 0,
		discountBadge: hasDiscount ? `خصم ${discountPercentage}%` : void 0,
		thumbnail: imagePath,
		images,
		description: prodDesc,
		category: categoryName,
		categoryId,
		brand: brandObj,
		brandId,
		brandName: brandNameStr || "",
		inStock: (apiProd.current_stock ?? 1) > 0,
		stockCount: apiProd.current_stock ?? 5,
		rating: extractedRating,
		reviewCount: extractedReviewCount
	};
};
//#endregion
//#region services/cartApiService.ts
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var cachedCartGroupId = null;
/**
* Extract active user token from storage or cookies
*/
var getAuthToken = () => {
	return null;
};
/**
* Extract or generate persistent Guest ID
*/
var getGuestId = () => {
	return "1";
};
/**
* Get current API locale code (EN or sa)
*/
var getApiLocale = () => {
	return "sa";
};
/**
* Build request headers with strict Auth vs Guest distinction
*/
var buildCartHeaders = (token, locale) => {
	const isEn = locale === "EN";
	const headers = {
		"Accept": "application/json",
		"Content-Type": "application/json",
		"X-Requested-With": "XMLHttpRequest",
		"Accept-Language": isEn ? "en-US,en;q=0.9" : "ar-SA,ar;q=0.9",
		"X-localization": locale,
		"lang": locale,
		"X-Language": isEn ? "en" : "ar"
	};
	return headers;
};
var cartApiService = {
	/**
	* Fetch current cart contents from WedgetStore API
	*/
	async fetchCart() {
		try {
			const token = getAuthToken();
			const locale = getApiLocale();
			const isAuth = !!token;
			const guestId = getGuestId();
			const endpoint = isAuth ? `${API_BASE_URL}/cart?locale=${locale}` : `${API_BASE_URL}/cart?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`;
			const response = await $fetch$2(endpoint, {
				method: "GET",
				headers: buildCartHeaders(token, locale),
				timeout: 8e3
			});
			return (Array.isArray(response) ? response : response?.data || response?.cart || []).map((item) => {
				const prod = item.product || item;
				const mappedProduct = mapApiProductToProduct(prod);
				const cartKey = item.id || item.key || item.cart_id || `cart-${prod?.id || Math.random()}`;
				const cartGroupId = item.cart_group_id || item.cart_id || null;
				if (cartGroupId) cachedCartGroupId = String(cartGroupId);
				return {
					id: cartKey,
					key: cartKey,
					cartKey,
					cart_group_id: cartGroupId,
					product_id: item.product_id || prod?.id,
					product: mappedProduct,
					quantity: Number(item.quantity || item.qty || 1),
					price: Number(item.price || mappedProduct.price),
					discount: Number(item.discount || 0),
					tax: Number(item.tax || 0),
					selectedSize: item.variant || item.size || void 0,
					selectedColor: item.color || void 0
				};
			});
		} catch (error) {
			console.warn("[CartApiService] fetchCart API failed, fallback to empty array:", error);
			return [];
		}
	},
	/**
	* Add Product to Cart via WedgetStore API
	* Payload Keys: { id: productId, quantity: qty }
	*/
	async addToCart(productId, quantity = 1, options = {}) {
		try {
			const token = getAuthToken();
			const locale = getApiLocale();
			const isAuth = !!token;
			const guestId = getGuestId();
			const endpoint = isAuth ? `${API_BASE_URL}/cart/add?locale=${locale}` : `${API_BASE_URL}/cart/add?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`;
			const body = {
				id: Number(productId) || productId,
				quantity: Number(quantity) || 1,
				...options.variant ? { variant: options.variant } : {},
				...options.color ? { color: options.color } : {}
			};
			if (!isAuth) body.guest_id = guestId;
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: buildCartHeaders(token, locale),
				body
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				message: response?.message || "Product added to cart successfully"
			};
		} catch (error) {
			console.warn("[CartApiService] addToCart API failed:", error);
			return {
				success: false,
				message: error?.data?.message || "Failed to add product to cart"
			};
		}
	},
	/**
	* Update Cart Item Quantity
	* Payload Keys: { key: cartItemKey, quantity: qty }
	*/
	async updateQuantity(cartItemKey, quantity) {
		try {
			const token = getAuthToken();
			const locale = getApiLocale();
			const isAuth = !!token;
			const guestId = getGuestId();
			const endpoint = isAuth ? `${API_BASE_URL}/cart/update?locale=${locale}` : `${API_BASE_URL}/cart/update?guest_id=${encodeURIComponent(guestId)}&locale=${locale}`;
			const body = {
				key: cartItemKey,
				quantity: Number(quantity)
			};
			if (!isAuth) body.guest_id = guestId;
			const response = await $fetch$2(endpoint, {
				method: "PUT",
				headers: buildCartHeaders(token, locale),
				body
			});
			return {
				success: response?.status === 1 || response?.success === true || true,
				message: response?.message || "Cart quantity updated successfully"
			};
		} catch (error) {
			console.warn("[CartApiService] updateQuantity failed:", error);
			return {
				success: false,
				message: error?.data?.message || "Failed to update cart quantity"
			};
		}
	},
	/**
	* Remove Item from Cart
	* Payload Keys: { key: cartItemKey }
	*/
	async removeFromCart(cartItemKey) {
		try {
			const token = getAuthToken();
			const locale = getApiLocale();
			const isAuth = !!token;
			const guestId = getGuestId();
			const cleanKey = String(cartItemKey);
			const endpoint = isAuth ? `${API_BASE_URL}/cart/remove?key=${encodeURIComponent(cleanKey)}&locale=${locale}` : `${API_BASE_URL}/cart/remove?key=${encodeURIComponent(cleanKey)}&guest_id=${encodeURIComponent(guestId)}&locale=${locale}`;
			const body = { key: cleanKey };
			if (!isAuth) body.guest_id = guestId;
			const response = await $fetch$2(endpoint, {
				method: "DELETE",
				headers: buildCartHeaders(token, locale),
				body
			});
			return {
				success: true,
				message: typeof response === "string" ? response : response?.message || "Item removed from cart"
			};
		} catch (error) {
			console.warn("[CartApiService] removeFromCart failed:", error);
			return {
				success: false,
				message: error?.data?.message || "Failed to remove item from cart"
			};
		}
	},
	/**
	* Clear All Items from Cart
	* WedgetStore API requires: 'key' (cart_group_id or item key/id)
	*/
	async clearAllCart(options) {
		try {
			const token = getAuthToken();
			const locale = getApiLocale();
			const isAuth = !!token;
			const guestId = getGuestId();
			const targetKey = options?.cartGroupId || cachedCartGroupId || (options?.itemKeys && options.itemKeys.length > 0 ? options.itemKeys[0] : null);
			if (targetKey) {
				const cleanKey = String(targetKey);
				const endpoint = isAuth ? `${API_BASE_URL}/cart/remove-all?key=${encodeURIComponent(cleanKey)}&locale=${locale}` : `${API_BASE_URL}/cart/remove-all?key=${encodeURIComponent(cleanKey)}&guest_id=${encodeURIComponent(guestId)}&locale=${locale}`;
				const body = { key: cleanKey };
				if (!isAuth) body.guest_id = guestId;
				const response = await $fetch$2(endpoint, {
					method: "DELETE",
					headers: buildCartHeaders(token, locale),
					body
				});
				if (response?.errors && Array.isArray(response.errors)) console.warn("[CartApiService] remove-all API returned errors:", response.errors);
				else {
					cachedCartGroupId = null;
					return { success: true };
				}
			}
			if (options?.itemKeys && options.itemKeys.length > 0) await Promise.allSettled(options.itemKeys.map((k) => this.removeFromCart(k)));
			cachedCartGroupId = null;
			return { success: true };
		} catch (error) {
			console.warn("[CartApiService] clearAllCart failed, trying fallback:", error);
			if (options?.itemKeys && options.itemKeys.length > 0) await Promise.allSettled(options.itemKeys.map((k) => this.removeFromCart(k)));
			return { success: true };
		}
	}
};
//#endregion
//#region composables/useCart.ts
/**
* Production-ready Vue 3 / Nuxt 3 Cart Composable connected to live WedgetStore Cart API
* Features global singleton state, request deduplication lock & dynamic locale sync.
*/
var globalCartItems = ref([]);
var isCartOpenState = ref(false);
var isCartLoadingState = ref(false);
var isCartInitialized = ref(false);
var isFetchingCart = ref(false);
var useCart = () => {
	const { currentLanguage, formatCurrency } = useLanguage();
	const toast = useToast();
	/**
	* Load cart from backend API with global deduplication lock
	*/
	const loadCart = async (force = false) => {
		if (isFetchingCart.value && !force) return;
		if (isCartInitialized.value && !force) return;
		isFetchingCart.value = true;
		isCartLoadingState.value = true;
		try {
			globalCartItems.value = await cartApiService.fetchCart() || [];
			isCartInitialized.value = true;
		} catch (err) {
			console.warn("[useCart] Failed to sync cart with API:", err);
		} finally {
			isCartLoadingState.value = false;
			isFetchingCart.value = false;
		}
	};
	watch(currentLanguage, () => {});
	const toggleCart = () => {
		isCartOpenState.value = !isCartOpenState.value;
	};
	const openCart = () => {
		isCartOpenState.value = true;
	};
	const closeCart = () => {
		isCartOpenState.value = false;
	};
	/**
	* Add item to cart
	* Payload: id (product id), quantity, options
	*/
	const addToCart = async (product, quantity = 1, size, color) => {
		if (!product || !product.id) return;
		const existingIndex = globalCartItems.value.findIndex((item) => String(item.product?.id) === String(product.id) && item.selectedSize === size && item.selectedColor === color);
		if (existingIndex > -1) globalCartItems.value[existingIndex].quantity += quantity;
		else {
			const tempId = `temp-${product.id}-${Date.now()}`;
			globalCartItems.value.push({
				id: tempId,
				key: tempId,
				cartKey: tempId,
				product_id: product.id,
				product,
				quantity,
				selectedSize: size,
				selectedColor: color
			});
		}
		const prodTitle = currentLanguage.value === "en" ? product.title_en || product.name_en || product.title || product.name : product.title || product.name;
		toast.success(currentLanguage.value === "en" ? "Item added to cart" : "تمت إضافة المنتج إلى السلة", prodTitle);
		try {
			await cartApiService.addToCart(product.id, quantity, {
				variant: size,
				color
			});
		} catch (e) {
			console.warn("[useCart] API sync fallback:", e);
		} finally {
			await loadCart(true);
		}
	};
	/**
	* Remove item from cart by cartItemKey (or product.id)
	* Payload: key (cart item key)
	*/
	const removeFromCart = async (targetId) => {
		if (!targetId && targetId !== 0) return;
		const index = globalCartItems.value.findIndex((item) => String(item.id) === String(targetId) || String(item.key) === String(targetId) || String(item.cartKey) === String(targetId) || String(item.product?.id) === String(targetId));
		let targetKey = targetId;
		if (index > -1) {
			const removedItem = globalCartItems.value.splice(index, 1)[0];
			targetKey = removedItem.key || removedItem.id || removedItem.cartKey || targetId;
		}
		toast.info(currentLanguage.value === "en" ? "Item removed from cart" : "تمت إزالة المنتج من السلة");
		try {
			await cartApiService.removeFromCart(targetKey);
		} catch (e) {
			console.warn("[useCart] Remove API sync fallback:", e);
		} finally {
			await loadCart(true);
		}
	};
	/**
	* Update item quantity by cartItemKey (or product.id)
	* Payload: key (cart item key), quantity
	*/
	const updateQuantity = async (targetId, newQty) => {
		if (!targetId && targetId !== 0) return;
		const item = globalCartItems.value.find((i) => String(i.id) === String(targetId) || String(i.key) === String(targetId) || String(i.cartKey) === String(targetId) || String(i.product?.id) === String(targetId));
		if (!item) return;
		if (newQty <= 0) {
			await removeFromCart(targetId);
			return;
		}
		item.quantity = newQty;
		const targetKey = item.key || item.id || item.cartKey || targetId;
		try {
			await cartApiService.updateQuantity(targetKey, newQty);
		} catch (e) {
			console.warn("[useCart] Update Qty API sync fallback:", e);
		} finally {
			await loadCart(true);
		}
	};
	/**
	* Clear entire cart with key/cart_group_id support and item keys fallback
	*/
	const clearCart = async () => {
		const itemsToClear = [...globalCartItems.value];
		const itemKeys = itemsToClear.map((i) => i.key || i.id || i.product?.id).filter(Boolean);
		const cartGroupId = itemsToClear.find((i) => i.cart_group_id)?.cart_group_id;
		globalCartItems.value = [];
		try {
			await cartApiService.clearAllCart({
				cartGroupId,
				itemKeys
			});
			toast.info(currentLanguage.value === "en" ? "Cart cleared" : "تم تفريغ السلة");
		} catch (e) {
			console.warn("[useCart] Clear cart API error:", e);
		} finally {
			await loadCart(true);
		}
	};
	const cartCount = computed(() => {
		return globalCartItems.value.reduce((total, item) => total + (item.quantity || 1), 0);
	});
	const cartTotal = computed(() => {
		return globalCartItems.value.reduce((total, item) => {
			const price = typeof item.product?.price === "number" ? item.product.price : Number(item.product?.price || 0);
			return total + (isNaN(price) ? 0 : price) * (item.quantity || 1);
		}, 0);
	});
	return {
		cart: globalCartItems,
		isCartOpen: isCartOpenState,
		isCartLoading: isCartLoadingState,
		cartCount,
		cartTotal,
		formattedCartTotal: computed(() => {
			return formatCurrency(cartTotal.value || 0);
		}),
		loadCart,
		toggleCart,
		openCart,
		closeCart,
		addToCart,
		removeFromCart,
		updateQuantity,
		clearCart
	};
};

export { cartApiService as c, mapApiProductToProduct as m, useCart as u };
//# sourceMappingURL=useCart-CqauBZhc.mjs.map
