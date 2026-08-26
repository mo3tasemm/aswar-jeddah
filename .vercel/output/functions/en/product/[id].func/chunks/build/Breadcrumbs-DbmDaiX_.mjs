import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, computed, mergeProps, withCtx, openBlock, createBlock, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { useRoute } from 'vue-router';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';

//#region components/common/Breadcrumbs.vue?vue&type=script&setup=true&lang.ts
var Breadcrumbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Breadcrumbs",
	__ssrInlineRender: true,
	props: {
		items: {
			type: Array,
			default: void 0
		},
		tiers: {
			type: Array,
			default: void 0
		},
		currentTitle: {
			type: String,
			default: ""
		}
	},
	setup(__props) {
		const props = __props;
		const route = useRoute();
		const { currentLanguage } = useLanguage();
		const homeLabel = computed(() => {
			return currentLanguage.value === "en" ? "Home" : "الرئيسية";
		});
		const routeSegmentLabels = {
			shop: {
				ar: "المتجر",
				en: "Shop"
			},
			category: {
				ar: "التصنيفات",
				en: "Categories"
			},
			product: {
				ar: "المنتجات",
				en: "Products"
			},
			cart: {
				ar: "سلة المشتريات",
				en: "Cart"
			},
			checkout: {
				ar: "إتمام الشراء",
				en: "Checkout"
			},
			"my-account": {
				ar: "حسابي",
				en: "My Account"
			},
			wishlist: {
				ar: "المفضلة",
				en: "Wishlist"
			},
			orders: {
				ar: "طلباتي",
				en: "My Orders"
			},
			addresses: {
				ar: "العناوين",
				en: "Addresses"
			},
			details: {
				ar: "تفاصيل الحساب",
				en: "Account Details"
			},
			search: {
				ar: "البحث",
				en: "Search"
			},
			login: {
				ar: "تسجيل الدخول",
				en: "Login"
			},
			blog: {
				ar: "المدونة",
				en: "Blog"
			}
		};
		const normalizedItems = computed(() => {
			const rawList = props.items || props.tiers;
			if (Array.isArray(rawList) && rawList.length > 0) return rawList.filter((i) => i && (i.label || i.name)).filter((i, idx) => !(idx === 0 && (i.to === "/" || i.path === "/"))).map((i) => ({
				label: i.label || i.name || "",
				to: i.to || i.path
			}));
			const segments = route.path.split("/").filter(Boolean);
			const autoItems = [];
			let accumulatedPath = "";
			segments.forEach((seg, idx) => {
				accumulatedPath += `/${seg}`;
				const isLast = idx === segments.length - 1;
				const mapped = routeSegmentLabels[seg];
				let label = "";
				if (mapped) label = currentLanguage.value === "en" ? mapped.en : mapped.ar;
				else if (isLast && props.currentTitle) label = props.currentTitle;
				else {
					label = seg.replace(/-/g, " ");
					label = label.charAt(0).toUpperCase() + label.slice(1);
				}
				autoItems.push({
					label,
					to: isLast ? void 0 : accumulatedPath
				});
			});
			return autoItems;
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<nav${ssrRenderAttrs(mergeProps({
				class: "flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 font-medium py-4 text-start",
				"aria-label": "Breadcrumb"
			}, _attrs))}>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/",
				class: "hover:text-[#0B0E28] transition-colors flex items-center gap-1.5 shrink-0 group"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"${_scopeId}></path><polyline points="9 22 9 12 15 12 15 22"${_scopeId}></polyline></svg><span${_scopeId}>${ssrInterpolate(homeLabel.value)}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4 text-slate-400 group-hover:text-[#0B0E28] transition-colors",
						viewBox: "0 0 24 24",
						fill: "none",
						stroke: "currentColor",
						"stroke-width": "2",
						"stroke-linecap": "round",
						"stroke-linejoin": "round"
					}, [createVNode("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }), createVNode("polyline", { points: "9 22 9 12 15 12 15 22" })])), createVNode("span", null, toDisplayString(homeLabel.value), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<!--[-->`);
			ssrRenderList(normalizedItems.value, (item, index) => {
				_push(`<!--[--><svg class="w-3.5 h-3.5 rtl:-scale-x-100 text-slate-300 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`);
				if (index < normalizedItems.value.length - 1 && (item.to || item.path)) _push(ssrRenderComponent(_component_NuxtLink, {
					to: item.to || item.path,
					class: "hover:text-[#0B0E28] transition-colors truncate max-w-[140px] sm:max-w-[220px]",
					title: item.label
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`${ssrInterpolate(item.label)}`);
						else return [createTextVNode(toDisplayString(item.label), 1)];
					}),
					_: 2
				}, _parent));
				else _push(`<span class="text-[#0B0E28] font-bold truncate max-w-[180px] sm:max-w-[320px]"${ssrRenderAttr("title", item.label)}>${ssrInterpolate(item.label)}</span>`);
				_push(`<!--]-->`);
			});
			_push(`<!--]--></nav>`);
		};
	}
});
//#endregion
//#region components/common/Breadcrumbs.vue
var _sfc_setup = Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup;
Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/Breadcrumbs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Breadcrumbs_default = Object.assign(Breadcrumbs_vue_vue_type_script_setup_true_lang_default, { __name: "CommonBreadcrumbs" });

export { Breadcrumbs_default as B };
//# sourceMappingURL=Breadcrumbs-DbmDaiX_.mjs.map
