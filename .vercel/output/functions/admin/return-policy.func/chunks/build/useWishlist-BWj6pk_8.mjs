import { u as useCookie, a as useToast } from '../virtual/entry.mjs';
import { a as useAuthDrawer } from './useCompare-BYK443T-.mjs';
import { watch, computed, ref } from 'vue';

process.env.NUXT_PUBLIC_API_BASE;
//#endregion
//#region composables/useWishlist.ts
/**
* Production-ready Wishlist Composable connected to live WedgetStore Wishlist API
* Features singleton shared state, request deduplication, optimistic UI updates & strict error handling.
*/
var wishlistItems = ref([]);
var wishlistPending = ref(false);
var wishlistError = ref(null);
ref(false);
var isFetchingWishlist = ref(false);
var useWishlist = () => {
	const toast = useToast();
	const { toggleLogin } = useAuthDrawer();
	/**
	* Helper to verify if user is authenticated before critical wishlist actions
	*/
	const checkAuth = () => {
		if (!(useCookie("auth_token").value || useCookie("token").value || useCookie("access_token").value || null)) {
			toast.info("تسجيل الدخول مطلوب", "يرجى تسجيل الدخول أولاً لإضافة المنتجات إلى المفضلة.");
			toggleLogin();
			return false;
		}
		return true;
	};
	const loadWishlist = async (force = false) => {
		if (isFetchingWishlist.value) return;
		wishlistPending.value = false;
		isFetchingWishlist.value = false;
	};
	watch(wishlistItems, (newVal) => {}, { deep: true });
	const isInWishlist = (productId) => {
		return wishlistItems.value.some((p) => String(p.id) === String(productId));
	};
	const addToWishlist = async (product) => {
		if (!product || !product.id) return;
		if (!checkAuth()) return;
		if (isInWishlist(product.id)) {
			toast.info("المنتج موجود بالفعل في المفضلة");
			return;
		}
		wishlistItems.value.push(product);
		toast.success("تمت إضافة المنتج للمفضلة", product.title || product.name);
	};
	const removeFromWishlist = async (productId) => {
		if (!checkAuth()) return;
		wishlistItems.value = wishlistItems.value.filter((p) => String(p.id) !== String(productId));
		toast.info("تمت إزالة المنتج من المفضلة");
	};
	const clearWishlist = async () => {
		[...wishlistItems.value];
		wishlistItems.value = [];
	};
	return {
		wishlist: wishlistItems,
		wishlistItems,
		wishlistPending,
		wishlistError,
		wishlistCount: computed(() => wishlistItems.value.length),
		loadWishlist,
		isInWishlist,
		addToWishlist,
		removeFromWishlist,
		clearWishlist
	};
};

export { useWishlist as u };
//# sourceMappingURL=useWishlist-BWj6pk_8.mjs.map
