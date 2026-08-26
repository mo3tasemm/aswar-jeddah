import { _ as _plugin_vue_export_helper_default, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { defineComponent, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';

//#region components/Shop/CategoryHierarchyBar.vue?vue&type=script&setup=true&lang.ts
var CategoryHierarchyBar_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategoryHierarchyBar",
	__ssrInlineRender: true,
	props: {
		categories: {},
		selectedCategoryId: {},
		basePath: {}
	},
	setup(__props) {
		const props = __props;
		const { layoutDirection } = useLanguage();
		const getCatName = (cat) => {
			if (!cat) return "";
			if (layoutDirection.value === "ltr") return cat.name_en || cat.title_en || cat.name;
			return cat.name_ar || cat.name;
		};
		const getCategoryUrl = (cat) => {
			if (cat.customUrl) return cat.customUrl;
			if (cat.fullPath) return `/category/${cat.fullPath}`;
			if (props.basePath) return `/${props.basePath.replace(/^\/|\/$/g, "")}/${cat.slug || cat.id}`;
			return `/category/${cat.slug || cat.id}`;
		};
		const isSelected = (cat) => {
			if (!props.selectedCategoryId) return false;
			return String(props.selectedCategoryId) === String(cat.id) || String(props.selectedCategoryId) === String(cat.slug);
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			if (__props.categories && __props.categories.length > 0) {
				_push(`<div${ssrRenderAttrs(mergeProps({ class: "w-full relative mb-8 overflow-hidden" }, _attrs))} data-v-485a921b><div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block" data-v-485a921b></div><div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#F8F9FA] to-transparent z-10 pointer-events-none hidden sm:block" data-v-485a921b></div><div class="flex items-center gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 custom-scrollbar snap-x snap-mandatory hide-scroll-mobile px-2" data-v-485a921b><!--[-->`);
				ssrRenderList(__props.categories, (cat) => {
					_push(ssrRenderComponent(_component_NuxtLink, {
						key: cat.id,
						to: getCategoryUrl(cat),
						class: "group flex flex-col items-center gap-2.5 shrink-0 snap-start outline-none cursor-pointer"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) {
								_push(`<div class="${ssrRenderClass([{ "border-indigo-600 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-500/30": isSelected(cat) }, "w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-white p-2.5 flex items-center justify-center relative shadow-sm border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:border-indigo-500"])}" data-v-485a921b${_scopeId}><div class="w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative" data-v-485a921b${_scopeId}>`);
								if (cat.icon) _push(`<img${ssrRenderAttr("src", cat.icon)}${ssrRenderAttr("alt", getCatName(cat))} class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" data-v-485a921b${_scopeId}>`);
								else _push(`<i class="fa-solid fa-layer-group text-slate-400 text-lg group-hover:text-indigo-600 transition-colors" data-v-485a921b${_scopeId}></i>`);
								_push(`</div></div><div class="text-center" data-v-485a921b${_scopeId}><h3 class="${ssrRenderClass([isSelected(cat) ? "text-indigo-600" : "text-slate-800 group-hover:text-indigo-600", "text-[11px] sm:text-xs font-black transition-colors max-w-[80px] sm:max-w-[100px] truncate"])}" data-v-485a921b${_scopeId}>${ssrInterpolate(getCatName(cat))}</h3>`);
								if (cat.productCount) _push(`<span class="text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block" data-v-485a921b${_scopeId}>${ssrInterpolate(cat.productCount)} ${ssrInterpolate(unref(layoutDirection) === "ltr" ? "Products" : "منتج")}</span>`);
								else _push(`<!---->`);
								_push(`</div>`);
							} else return [createVNode("div", { class: ["w-16 h-16 sm:w-20 sm:h-20 rounded-[1.5rem] bg-white p-2.5 flex items-center justify-center relative shadow-sm border border-slate-100 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg group-hover:shadow-indigo-500/10 group-hover:border-indigo-500", { "border-indigo-600 shadow-md shadow-indigo-600/10 ring-2 ring-indigo-500/30": isSelected(cat) }] }, [createVNode("div", { class: "w-full h-full rounded-xl bg-slate-50 overflow-hidden flex items-center justify-center relative" }, [cat.icon ? (openBlock(), createBlock("img", {
								key: 0,
								src: cat.icon,
								alt: getCatName(cat),
								class: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							}, null, 8, ["src", "alt"])) : (openBlock(), createBlock("i", {
								key: 1,
								class: "fa-solid fa-layer-group text-slate-400 text-lg group-hover:text-indigo-600 transition-colors"
							}))])], 2), createVNode("div", { class: "text-center" }, [createVNode("h3", { class: ["text-[11px] sm:text-xs font-black transition-colors max-w-[80px] sm:max-w-[100px] truncate", isSelected(cat) ? "text-indigo-600" : "text-slate-800 group-hover:text-indigo-600"] }, toDisplayString(getCatName(cat)), 3), cat.productCount ? (openBlock(), createBlock("span", {
								key: 0,
								class: "text-[9px] sm:text-[10px] font-bold text-slate-400 mt-0.5 block"
							}, toDisplayString(cat.productCount) + " " + toDisplayString(unref(layoutDirection) === "ltr" ? "Products" : "منتج"), 1)) : createCommentVNode("", true)])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]--></div></div>`);
			} else _push(`<!---->`);
		};
	}
});
//#endregion
//#region components/Shop/CategoryHierarchyBar.vue
var _sfc_setup = CategoryHierarchyBar_vue_vue_type_script_setup_true_lang_default.setup;
CategoryHierarchyBar_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/CategoryHierarchyBar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CategoryHierarchyBar_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CategoryHierarchyBar_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-485a921b"]]), { __name: "ShopCategoryHierarchyBar" });

export { CategoryHierarchyBar_default as C };
//# sourceMappingURL=CategoryHierarchyBar-D7wNBy_Z.mjs.map
