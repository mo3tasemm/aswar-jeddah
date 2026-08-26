import { h as useState, u as useCookie, a as useToast } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { watch, computed, ref } from 'vue';

//#region composables/useAuthDrawer.ts
var useAuthDrawer = () => {
	const isLoginOpen = useState("isLoginOpen", () => false);
	const toggleLogin = () => {
		isLoginOpen.value = !isLoginOpen.value;
	};
	const openLogin = () => {
		isLoginOpen.value = true;
	};
	const closeLogin = () => {
		isLoginOpen.value = false;
	};
	return {
		isLoginOpen,
		toggleLogin,
		openLogin,
		closeLogin
	};
};
process.env.NUXT_PUBLIC_API_BASE;
//#endregion
//#region composables/useCompare.ts
/**
* Production-ready Composable for Product Comparison State connected to live Compare API
* Protected Actions: Guests are prompted to log in before adding items to compare list.
*/
var compareList = ref([]);
ref(false);
var comparePending = ref(false);
var useCompare = () => {
	const { currentLanguage } = useLanguage();
	const toast = useToast();
	const { toggleLogin } = useAuthDrawer();
	/**
	* Helper to verify if user is authenticated before critical compare actions
	*/
	const checkAuth = () => {
		if (!(useCookie("auth_token").value || useCookie("token").value || useCookie("access_token").value || null)) {
			toast.info("تسجيل الدخول مطلوب", "يرجى تسجيل الدخول أولاً لمقارنة المنتجات.");
			toggleLogin();
			return false;
		}
		return true;
	};
	watch(compareList, (newVal) => {}, { deep: true });
	const compareCount = computed(() => compareList.value.length);
	const isInCompare = (productId) => {
		return compareList.value.some((p) => String(p.id) === String(productId));
	};
	const addToCompare = async (product) => {
		if (!product || !product.id) return;
		if (!checkAuth()) return;
		if (isInCompare(product.id)) {
			toast.info("المنتج موجود بالفعل في المقارنة");
			return;
		}
		if (compareList.value.length >= 4) {
			toast.error(currentLanguage.value === "en" ? "Max 4 items" : "الحد الأقصى للمقارنة", currentLanguage.value === "en" ? "You can compare up to 4 products." : "يمكنك مقارنة حتى 4 منتجات في وقت واحد.");
			return;
		}
		compareList.value.push(product);
		toast.success("تمت إضافة المنتج للمقارنة", product.title);
	};
	const removeFromCompare = (productId) => {
		if (!checkAuth()) return;
		compareList.value = compareList.value.filter((p) => String(p.id) !== String(productId));
		toast.info("تمت إزالة المنتج من المقارنة");
	};
	const toggleCompare = async (product) => {
		if (!product || !product.id) return;
		if (!checkAuth()) return;
		if (isInCompare(product.id)) removeFromCompare(product.id);
		else await addToCompare(product);
	};
	const clearCompare = async () => {
		if (!checkAuth()) return;
		compareList.value = [];
		toast.info("تم تفريغ قائمة المقارنة");
	};
	return {
		compareList,
		compareCount,
		comparePending,
		isInCompare,
		addToCompare,
		removeFromCompare,
		toggleCompare,
		clearCompare
	};
};

export { useAuthDrawer as a, useCompare as u };
//# sourceMappingURL=useCompare-BYK443T-.mjs.map
