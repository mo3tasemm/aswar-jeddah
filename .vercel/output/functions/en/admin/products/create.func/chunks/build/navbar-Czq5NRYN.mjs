import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { A as AdminPageHeader_default } from './AdminPageHeader-RavS7Sn5.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useAdminNavbar } from './useAdminNavbar-w3yxR_La.mjs';
import { B as BaseModal_default } from './BaseModal-D9dLO0m4.mjs';
import { defineComponent, ref, reactive, computed, mergeProps, unref, withCtx, createVNode, withModifiers, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withDirectives, vModelSelect, createTextVNode, vModelText, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';
import 'nostics';
import 'nostics/formatters/ansi';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '../routes/renderer.mjs';
import 'unhead/server';
import 'unhead/legacy';
import 'unhead/plugins';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import 'vue-router';
import '@vue/shared';
import 'unhead/utils';
import './AdminLangTabs-DVYAqM7r.mjs';
import './adminNavbarApiService-D0ZIw4fK.mjs';
import './apiConfig-CCR2eNes.mjs';
import './adminBrandsApiService-CxliYt3r.mjs';
import './adminCategoriesApiService-nS8glRi_.mjs';

//#region pages/admin/navbar/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		useHead$1({ title: "إدارة شريط التنقل والقوائم (Navbar Manager) | لوحة تحكم أسوار جدة" });
		const activeLangTab = ref("ar");
		const { treeItems, parentOptions, totalCount, topLevelCount, subItemsCount, activeCount, isLoading, isSubmitting, deletingId, dbCategories, dbBrands, fetchNavbarItems, createNavbarItem, updateNavbarItem} = useAdminNavbar();
		const searchQuery = ref("");
		const isFormModalOpen = ref(false);
		const isDeleteModalOpen = ref(false);
		const editingItem = ref(null);
		const itemToDelete = ref(null);
		const draggedIndex = ref(null);
		const dragOverIndex = ref(null);
		const formData = reactive({
			title_ar: "",
			title_en: "",
			type: "link",
			url: "/",
			target: "_self",
			parent_id: null,
			badge: "",
			badge_color: "#ef4444",
			icon: "",
			is_active: true
		});
		const typeOptions = [
			{
				value: "link",
				label: "رابط مباشر",
				icon: "fa-solid fa-link"
			},
			{
				value: "dropdown",
				label: "قائمة منسدلة",
				icon: "fa-solid fa-layer-group"
			},
			{
				value: "category",
				label: "قسم من المتجر",
				icon: "fa-solid fa-folder-tree"
			},
			{
				value: "brand",
				label: "ماركة تجارية",
				icon: "fa-solid fa-tag"
			}
		];
		const colorPresets = [
			{
				name: "أحمر",
				color: "#ef4444"
			},
			{
				name: "برتقالي",
				color: "#f97316"
			},
			{
				name: "ذهبي",
				color: "#f59e0b"
			},
			{
				name: "أخضر",
				color: "#10b981"
			},
			{
				name: "أزرق",
				color: "#3b82f6"
			},
			{
				name: "بنفسجي",
				color: "#8b5cf6"
			},
			{
				name: "وردي",
				color: "#ec4899"
			}
		];
		const filteredTreeItems = computed(() => {
			if (!searchQuery.value.trim()) return treeItems.value;
			const q = searchQuery.value.trim().toLowerCase();
			return treeItems.value.filter((item) => item.title.toLowerCase().includes(q) || item.title_ar && item.title_ar.toLowerCase().includes(q) || item.title_en && item.title_en.toLowerCase().includes(q) || item.url.toLowerCase().includes(q) || item.children && item.children.some((c) => c.title.toLowerCase().includes(q)));
		});
		const availableParentOptions = computed(() => {
			if (!editingItem.value) return parentOptions.value;
			return parentOptions.value.filter((p) => String(p.id) !== String(editingItem.value.id));
		});
		const onTypeSelect = (typeVal) => {
			formData.type = typeVal;
			if (typeVal === "dropdown") formData.url = "#";
		};
		const onCategoryAutofill = (event) => {
			const slug = event.target.value;
			if (!slug) return;
			const found = dbCategories.value.find((c) => c.slug === slug);
			if (found) {
				if (!formData.title_ar) formData.title_ar = found.name;
				formData.url = `/category/${found.slug}`;
			}
		};
		const onBrandAutofill = (event) => {
			const slug = event.target.value;
			if (!slug) return;
			const found = dbBrands.value.find((b) => b.slug === slug);
			if (found) {
				if (!formData.title_ar) formData.title_ar = found.name;
				formData.url = `/brand/${found.slug}`;
			}
		};
		const handleSubmitForm = async () => {
			const payload = {
				title: formData.title_ar,
				title_ar: formData.title_ar,
				title_en: formData.title_en || formData.title_ar,
				type: formData.type,
				url: formData.url,
				target: formData.target,
				parent_id: formData.parent_id,
				badge: formData.badge || void 0,
				badge_color: formData.badge ? formData.badge_color : void 0,
				icon: formData.icon || void 0,
				is_active: formData.is_active ? 1 : 0
			};
			if (editingItem.value) await updateNavbarItem(editingItem.value.id, payload);
			else await createNavbarItem(payload);
			isFormModalOpen.value = false;
		};
		const resolveTypeName = (type) => {
			switch (type) {
				case "dropdown": return "قائمة منسدلة";
				case "category": return "قسم متجر";
				case "brand": return "علامة تجارية";
				case "page": return "صفحة مخصصة";
				default: return "رابط مباشر";
			}
		};
		const resolveTypeBadge = (type) => {
			switch (type) {
				case "dropdown": return "bg-purple-50 text-purple-700 border-purple-200";
				case "category": return "bg-amber-50 text-amber-800 border-amber-200";
				case "brand": return "bg-indigo-50 text-indigo-700 border-indigo-200";
				case "page": return "bg-emerald-50 text-emerald-700 border-emerald-200";
				default: return "bg-slate-100 text-slate-700 border-slate-200";
			}
		};
		const resolveBadgeColorClass = (color) => {
			if (!color) return "bg-rose-500";
			if (color.startsWith("bg-")) return color;
			return "";
		};
		const resolveBadgeColorStyle = (color) => {
			if (color && (color.startsWith("#") || color.startsWith("rgb"))) return { backgroundColor: color };
			return {};
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إدارة شريط التنقل والقوائم (Navbar Manager)",
				subtitle: "تحكم كامل في روابط المتجر، القوائم المنسدلة، الشارات الترويجية باللغتين العربية والإنجليزية، والترتيب بالسحب والإفلات.",
				icon: "fa-solid fa-bars-staggered",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "شريط التنقل والقوائم" }],
				"show-lang-tabs": true,
				"lang-tab": activeLangTab.value,
				"onUpdate:langTab": ($event) => activeLangTab.value = $event
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer" title="تحديث البيانات"${_scopeId}><i class="${ssrRenderClass([{ "fa-spin": unref(isLoading) }, "fa-solid fa-rotate text-sm"])}"${_scopeId}></i></button>`);
						_push(ssrRenderComponent(_component_NuxtLink, {
							to: "/admin/navbar/create",
							class: "px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
						}, {
							default: withCtx((_, _push, _parent, _scopeId) => {
								if (_push) _push(`<i class="fa-solid fa-plus text-xs"${_scopeId}></i><span${_scopeId}>إضافة عنصر جديد</span>`);
								else return [createVNode("i", { class: "fa-solid fa-plus text-xs" }), createVNode("span", null, "إضافة عنصر جديد")];
							}),
							_: 1
						}, _parent, _scopeId));
					} else return [createVNode("button", {
						onClick: unref(fetchNavbarItems),
						disabled: unref(isLoading),
						class: "p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer",
						title: "تحديث البيانات"
					}, [createVNode("i", { class: ["fa-solid fa-rotate text-sm", { "fa-spin": unref(isLoading) }] }, null, 2)], 8, ["onClick", "disabled"]), createVNode(_component_NuxtLink, {
						to: "/admin/navbar/create",
						class: "px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-xs sm:text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer shrink-0"
					}, {
						default: withCtx(() => [createVNode("i", { class: "fa-solid fa-plus text-xs" }), createVNode("span", null, "إضافة عنصر جديد")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			_push(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"><div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-list-ul"></i></div><div><span class="text-xs font-bold text-slate-400 block">إجمالي الروابط</span><span class="text-xl sm:text-2xl font-black text-slate-900">${ssrInterpolate(unref(totalCount))}</span></div></div><div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-layer-group"></i></div><div><span class="text-xs font-bold text-slate-400 block">العناصر الرئيسية</span><span class="text-xl sm:text-2xl font-black text-indigo-600">${ssrInterpolate(unref(topLevelCount))}</span></div></div><div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-network-wired"></i></div><div><span class="text-xs font-bold text-slate-400 block">القوائم الفرعية</span><span class="text-xl sm:text-2xl font-black text-purple-600">${ssrInterpolate(unref(subItemsCount))}</span></div></div><div class="bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0"><i class="fa-solid fa-circle-check"></i></div><div><span class="text-xs font-bold text-slate-400 block">العناصر المفعلة</span><span class="text-xl sm:text-2xl font-black text-emerald-600">${ssrInterpolate(unref(activeCount))}</span></div></div></div><div class="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4"><div class="relative w-full sm:w-80"><input${ssrRenderAttr("value", searchQuery.value)} type="text" placeholder="بحث في عناصر القوائم..." class="w-full rounded-xl border border-slate-200 bg-slate-50/50 ps-10 pe-4 h-[42px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"><i class="fa-solid fa-magnifying-glass absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs"></i></div><div class="flex items-center gap-2 w-full sm:w-auto justify-end"><span class="text-xs font-bold text-slate-500 flex items-center gap-1.5"><i class="fa-solid fa-up-down-left-right text-indigo-500"></i> اسحب العناصر لإعادة الترتيب تلقائياً </span></div></div><div class="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">`);
			if (unref(isLoading)) {
				_push(`<div class="p-6 space-y-4"><!--[-->`);
				ssrRenderList(5, (i) => {
					_push(`<div class="h-16 bg-slate-50 rounded-2xl animate-pulse border border-slate-100"></div>`);
				});
				_push(`<!--]--></div>`);
			} else if (filteredTreeItems.value.length === 0) _push(`<div class="p-12 text-center"><div class="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl mx-auto mb-4"><i class="fa-solid fa-bars"></i></div><h3 class="text-base font-black text-slate-800">لا توجد عناصر في شريط التنقل</h3><p class="text-xs text-slate-500 mt-1 max-w-sm mx-auto"> ابدأ بإضافة الروابط الرئيسية والقوائم المنسدلة لمتجرك لتسهيل وصول العملاء للأقسام والمنتجات. </p><button class="mt-4 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"><i class="fa-solid fa-plus text-xs"></i><span>إضافة أول عنصر</span></button></div>`);
			else {
				_push(`<div class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(filteredTreeItems.value, (item, index) => {
					_push(`<div draggable="true" class="${ssrRenderClass([
						"p-4 sm:p-5 transition-all duration-200 group/row",
						dragOverIndex.value === index ? "bg-indigo-50/80 border-t-2 border-indigo-500 scale-[1.005]" : "hover:bg-slate-50/70",
						draggedIndex.value === index ? "opacity-40 bg-slate-100" : ""
					])}"><div class="flex items-center justify-between gap-3 sm:gap-4"><div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1"><div class="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 p-1 shrink-0 transition-colors" title="اسحب لإعادة الترتيب"><i class="fa-solid fa-grip-vertical text-sm"></i></div><div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-200/60 shadow-2xs">`);
					if (item.icon) _push(`<i class="${ssrRenderClass(item.icon)}"></i>`);
					else _push(`<i class="fa-solid fa-link text-slate-400"></i>`);
					_push(`</div><div class="min-w-0 flex-1"><div class="flex items-center gap-2 flex-wrap"><span class="font-extrabold text-slate-900 text-sm sm:text-base">${ssrInterpolate(item.title_ar || item.title)}</span>`);
					if (item.title_en && item.title_en !== item.title_ar) _push(`<span class="text-xs text-slate-400 font-medium" dir="ltr">(${ssrInterpolate(item.title_en)})</span>`);
					else _push(`<!---->`);
					if (item.badge) _push(`<span class="${ssrRenderClass(["px-2.5 py-0.5 rounded-full text-[10px] font-black text-white shadow-2xs tracking-wide", resolveBadgeColorClass(item.badge_color)])}" style="${ssrRenderStyle(resolveBadgeColorStyle(item.badge_color))}">${ssrInterpolate(item.badge)}</span>`);
					else _push(`<!---->`);
					_push(`<span class="${ssrRenderClass(["px-2 py-0.5 rounded-md text-[10px] font-bold border", resolveTypeBadge(item.type)])}">${ssrInterpolate(resolveTypeName(item.type))}</span>`);
					if (item.target === "_blank") _push(`<span class="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-bold border border-slate-200" title="يفتح في نافذة جديدة"><i class="fa-solid fa-arrow-up-right-from-square"></i> _blank </span>`);
					else _push(`<!---->`);
					_push(`</div><div class="flex items-center gap-2 mt-1 text-xs text-slate-500 font-mono" dir="ltr"><span class="truncate max-w-[280px] sm:max-w-md text-slate-600">${ssrInterpolate(item.url)}</span></div></div></div><div class="flex items-center gap-2 sm:gap-3 shrink-0" draggable="false"><button type="button" class="${ssrRenderClass([item.is_active === 1 || item.is_active === true ? "bg-emerald-500" : "bg-slate-300", "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"])}"${ssrRenderAttr("title", item.is_active === 1 || item.is_active === true ? "مفعل (انقر للتعطيل)" : "معطل (انقر للتفعيل)")}><span class="${ssrRenderClass([item.is_active === 1 || item.is_active === true ? unref(adminDir) === "rtl" ? "-translate-x-5" : "translate-x-5" : "translate-x-0", "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"])}"></span></button>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/navbar/create?parent_id=${item.id}`,
						class: "px-2.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs transition-colors hidden sm:flex items-center gap-1 cursor-pointer",
						title: "إضافة عنصر فرعي منسدل أسفل هذا الرابط"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<i class="fa-solid fa-plus text-[10px]"${_scopeId}></i><span${_scopeId}>+ فرعي</span>`);
							else return [createVNode("i", { class: "fa-solid fa-plus text-[10px]" }), createVNode("span", null, "+ فرعي")];
						}),
						_: 2
					}, _parent));
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/navbar/${item.id}`,
						class: "w-8 h-8 rounded-xl bg-slate-100 hover:bg-amber-50 text-slate-600 hover:text-amber-600 flex items-center justify-center transition-colors cursor-pointer",
						title: "تعديل العنصر"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<i class="fa-solid fa-pen text-xs"${_scopeId}></i>`);
							else return [createVNode("i", { class: "fa-solid fa-pen text-xs" })];
						}),
						_: 2
					}, _parent));
					_push(`<button type="button" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 flex items-center justify-center transition-colors cursor-pointer" title="حذف العنصر"><i class="fa-solid fa-trash text-xs"></i></button></div></div>`);
					if (Array.isArray(item.children) && item.children.length > 0) {
						_push(`<div class="mt-3.5 space-y-2 ps-6 sm:ps-10 border-s-2 border-indigo-100 ms-3 sm:ms-5 pt-1"><!--[-->`);
						ssrRenderList(item.children, (sub) => {
							_push(`<div class="p-3 bg-slate-50/80 rounded-xl border border-slate-200/70 flex items-center justify-between gap-3 hover:bg-white transition-colors"><div class="flex items-center gap-2.5 min-w-0 flex-1"><span class="text-indigo-400 font-bold text-xs shrink-0">↳</span><div class="w-7 h-7 rounded-lg bg-white text-slate-600 flex items-center justify-center text-xs shrink-0 border border-slate-200">`);
							if (sub.icon) _push(`<i class="${ssrRenderClass(sub.icon)}"></i>`);
							else _push(`<i class="fa-solid fa-arrow-turn-down text-slate-400 rotate-270"></i>`);
							_push(`</div><div class="min-w-0 flex-1"><div class="flex items-center gap-2 flex-wrap"><span class="font-bold text-slate-800 text-xs sm:text-sm">${ssrInterpolate(sub.title_ar || sub.title)}</span>`);
							if (sub.badge) _push(`<span class="${ssrRenderClass(["px-2 py-0.2 rounded-full text-[9px] font-black text-white", resolveBadgeColorClass(sub.badge_color)])}" style="${ssrRenderStyle(resolveBadgeColorStyle(sub.badge_color))}">${ssrInterpolate(sub.badge)}</span>`);
							else _push(`<!---->`);
							_push(`</div><span class="text-[11px] text-slate-500 font-mono block truncate" dir="ltr">${ssrInterpolate(sub.url)}</span></div></div><div class="flex items-center gap-1.5 shrink-0" draggable="false"><button type="button" class="${ssrRenderClass([sub.is_active === 1 || sub.is_active === true ? "text-emerald-600 bg-emerald-50" : "text-slate-400 bg-slate-200", "w-6 h-6 rounded-lg text-xs flex items-center justify-center transition-colors cursor-pointer"])}"${ssrRenderAttr("title", sub.is_active === 1 || sub.is_active === true ? "مفعل" : "معطل")}><i class="fa-solid fa-circle text-[8px]"></i></button>`);
							_push(ssrRenderComponent(_component_NuxtLink, {
								to: `/admin/navbar/${sub.id}`,
								class: "w-7 h-7 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors cursor-pointer",
								title: "تعديل"
							}, {
								default: withCtx((_, _push, _parent, _scopeId) => {
									if (_push) _push(`<i class="fa-solid fa-pen text-[10px]"${_scopeId}></i>`);
									else return [createVNode("i", { class: "fa-solid fa-pen text-[10px]" })];
								}),
								_: 2
							}, _parent));
							_push(`<button type="button" class="w-7 h-7 rounded-lg text-slate-500 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center transition-colors cursor-pointer" title="حذف"><i class="fa-solid fa-trash text-[10px]"></i></button></div></div>`);
						});
						_push(`<!--]--></div>`);
					} else _push(`<!---->`);
					_push(`</div>`);
				});
				_push(`<!--]--></div>`);
			}
			_push(`</div>`);
			_push(ssrRenderComponent(BaseModal_default, {
				"is-open": isFormModalOpen.value,
				title: editingItem.value ? "تعديل عنصر في شريط التنقل" : "إضافة عنصر جديد لشريط التنقل",
				onClose: ($event) => isFormModalOpen.value = false
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<form class="space-y-5"${_scopeId}><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: formData.title_ar,
							"onUpdate:modelValue": ($event) => formData.title_ar = $event,
							label: "العنوان بالعربية *",
							placeholder: "مثال: الأجهزة المنزلية",
							required: ""
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: formData.title_en,
							"onUpdate:modelValue": ($event) => formData.title_en = $event,
							label: "العنوان بالإنجليزية (English)",
							placeholder: "e.g. Home Appliances",
							dir: "ltr"
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-1.5"${_scopeId}><label class="block text-xs font-bold text-slate-700"${_scopeId}>نوع العنصر في القائمة</label><div class="grid grid-cols-2 sm:grid-cols-4 gap-2"${_scopeId}><!--[-->`);
						ssrRenderList(typeOptions, (tOpt) => {
							_push(`<button type="button" class="${ssrRenderClass(["p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer", formData.type === tOpt.value ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs" : "border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100"])}"${_scopeId}><i class="${ssrRenderClass(tOpt.icon)}"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(tOpt.label)}</span></button>`);
						});
						_push(`<!--]--></div></div>`);
						if (formData.type === "category") {
							_push(`<div class="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2"${_scopeId}><label class="block text-xs font-black text-amber-900"${_scopeId}>اختر القسم من قاعدة البيانات لتوليد الرابط تلقائياً</label><select class="w-full rounded-xl border border-amber-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"${_scopeId}><option value=""${_scopeId}>-- اختر القسم --</option><!--[-->`);
							ssrRenderList(unref(dbCategories), (cat) => {
								_push(`<option${ssrRenderAttr("value", cat.slug)}${_scopeId}>${ssrInterpolate(cat.name)}</option>`);
							});
							_push(`<!--]--></select></div>`);
						} else _push(`<!---->`);
						if (formData.type === "brand") {
							_push(`<div class="p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 space-y-2"${_scopeId}><label class="block text-xs font-black text-indigo-900"${_scopeId}>اختر الماركة من قاعدة البيانات لتوليد الرابط تلقائياً</label><select class="w-full rounded-xl border border-indigo-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"${_scopeId}><option value=""${_scopeId}>-- اختر الماركة --</option><!--[-->`);
							ssrRenderList(unref(dbBrands), (b) => {
								_push(`<option${ssrRenderAttr("value", b.slug)}${_scopeId}>${ssrInterpolate(b.name)}</option>`);
							});
							_push(`<!--]--></select></div>`);
						} else _push(`<!---->`);
						_push(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"${_scopeId}><div class="sm:col-span-2"${_scopeId}>`);
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: formData.url,
							"onUpdate:modelValue": ($event) => formData.url = $event,
							label: "الرابط المستهدف (URL) *",
							placeholder: "/category/kitchen-appliances أو https://...",
							dir: "ltr",
							required: ""
						}, null, _parent, _scopeId));
						_push(`</div><div class="space-y-1.5"${_scopeId}><label class="block text-xs font-bold text-slate-700"${_scopeId}>فتح الرابط في</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"${_scopeId}><option value="_self"${ssrIncludeBooleanAttr(Array.isArray(formData.target) ? ssrLooseContain(formData.target, "_self") : ssrLooseEqual(formData.target, "_self")) ? " selected" : ""}${_scopeId}>نفس الصفحة (_self)</option><option value="_blank"${ssrIncludeBooleanAttr(Array.isArray(formData.target) ? ssrLooseContain(formData.target, "_blank") : ssrLooseEqual(formData.target, "_blank")) ? " selected" : ""}${_scopeId}>علامة تبويب جديدة (_blank)</option></select></div></div><div class="space-y-1.5"${_scopeId}><label class="block text-xs font-bold text-slate-700"${_scopeId}>العنصر الأب (Parent Menu Item)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"${_scopeId}><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(formData.parent_id) ? ssrLooseContain(formData.parent_id, null) : ssrLooseEqual(formData.parent_id, null)) ? " selected" : ""}${_scopeId}>-- عنصر رئيسي في شريط التنقل (بدون أب) --</option><!--[-->`);
						ssrRenderList(availableParentOptions.value, (p) => {
							_push(`<option${ssrRenderAttr("value", p.id)}${ssrIncludeBooleanAttr(Array.isArray(formData.parent_id) ? ssrLooseContain(formData.parent_id, p.id) : ssrLooseEqual(formData.parent_id, p.id)) ? " selected" : ""}${_scopeId}> ↳ ${ssrInterpolate(p.title_ar || p.title)}</option>`);
						});
						_push(`<!--]--></select><p class="text-[11px] text-slate-400"${_scopeId}>إذا اخترت عنصراً أباً، فسيظهر هذا الرابط كخيار منسدل فرعي تحته.</p></div><div class="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3"${_scopeId}><h5 class="text-xs font-black text-slate-800 flex items-center gap-1.5"${_scopeId}><i class="fa-solid fa-tag text-indigo-500"${_scopeId}></i> الشارة الترويجية (Badge) </h5><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
						_push(ssrRenderComponent(BaseInput_default, {
							modelValue: formData.badge,
							"onUpdate:modelValue": ($event) => formData.badge = $event,
							label: "نص الشارة (اختياري)",
							placeholder: "مثال: HOT, جديد, خصم 20%"
						}, null, _parent, _scopeId));
						_push(`<div class="space-y-1.5"${_scopeId}><label class="block text-xs font-bold text-slate-700"${_scopeId}>لون الشارة</label><div class="flex items-center gap-2"${_scopeId}><input type="color"${ssrRenderAttr("value", formData.badge_color)} class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 shrink-0"${_scopeId}><input type="text"${ssrRenderAttr("value", formData.badge_color)} placeholder="#ef4444 أو bg-rose-500" class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono" dir="ltr"${_scopeId}></div></div></div><div class="flex items-center gap-2 flex-wrap pt-1"${_scopeId}><span class="text-[11px] font-bold text-slate-400"${_scopeId}>ألوان جاهزة:</span><!--[-->`);
						ssrRenderList(colorPresets, (preset) => {
							_push(`<button type="button" class="px-2 py-0.5 rounded-md text-[10px] font-bold text-white transition-transform hover:scale-105 cursor-pointer" style="${ssrRenderStyle({ backgroundColor: preset.color })}"${_scopeId}>${ssrInterpolate(preset.name)}</button>`);
						});
						_push(`<!--]--></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"${_scopeId}><div class="space-y-1.5"${_scopeId}><label class="block text-xs font-bold text-slate-700"${_scopeId}>أيقونة العنصر (FontAwesome Class)</label><div class="flex items-center gap-2"${_scopeId}><div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-200"${_scopeId}>`);
						if (formData.icon) _push(`<i class="${ssrRenderClass(formData.icon)}"${_scopeId}></i>`);
						else _push(`<i class="fa-solid fa-icons text-slate-400"${_scopeId}></i>`);
						_push(`</div><input type="text"${ssrRenderAttr("value", formData.icon)} placeholder="fa-solid fa-tag" class="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[40px] text-xs font-mono" dir="ltr"${_scopeId}></div></div><div class="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 sm:mt-4"${_scopeId}><div${_scopeId}><span class="text-xs font-black text-slate-800 block"${_scopeId}>تفعيل العنصر في المتجر</span><span class="text-[10px] text-slate-500"${_scopeId}>إظهار العنصر فورياً في الناف بار</span></div><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(formData.is_active) ? ssrLooseContain(formData.is_active, null) : formData.is_active) ? " checked" : ""} class="w-5 h-5 text-indigo-600 rounded cursor-pointer accent-indigo-600"${_scopeId}></div></div><div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100"${_scopeId}><button type="button" class="px-4 py-2.5 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"${_scopeId}> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"${_scopeId}>`);
						if (unref(isSubmitting)) _push(`<i class="fa-solid fa-spinner fa-spin text-xs"${_scopeId}></i>`);
						else _push(`<i class="fa-solid fa-check text-xs"${_scopeId}></i>`);
						_push(`<span${_scopeId}>${ssrInterpolate(unref(isSubmitting) ? "جاري الحفظ..." : editingItem.value ? "حفظ التعديلات" : "تأكيد الإضافة")}</span></button></div></form>`);
					} else return [createVNode("form", {
						onSubmit: withModifiers(handleSubmitForm, ["prevent"]),
						class: "space-y-5"
					}, [
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
							modelValue: formData.title_ar,
							"onUpdate:modelValue": ($event) => formData.title_ar = $event,
							label: "العنوان بالعربية *",
							placeholder: "مثال: الأجهزة المنزلية",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
							modelValue: formData.title_en,
							"onUpdate:modelValue": ($event) => formData.title_en = $event,
							label: "العنوان بالإنجليزية (English)",
							placeholder: "e.g. Home Appliances",
							dir: "ltr"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]),
						createVNode("div", { class: "space-y-1.5" }, [createVNode("label", { class: "block text-xs font-bold text-slate-700" }, "نوع العنصر في القائمة"), createVNode("div", { class: "grid grid-cols-2 sm:grid-cols-4 gap-2" }, [(openBlock(), createBlock(Fragment, null, renderList(typeOptions, (tOpt) => {
							return createVNode("button", {
								type: "button",
								key: tOpt.value,
								onClick: ($event) => onTypeSelect(tOpt.value),
								class: ["p-2.5 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer", formData.type === tOpt.value ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 shadow-xs" : "border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100"]
							}, [createVNode("i", { class: tOpt.icon }, null, 2), createVNode("span", null, toDisplayString(tOpt.label), 1)], 10, ["onClick"]);
						}), 64))])]),
						formData.type === "category" ? (openBlock(), createBlock("div", {
							key: 0,
							class: "p-3.5 bg-amber-50/70 rounded-2xl border border-amber-200/80 space-y-2"
						}, [createVNode("label", { class: "block text-xs font-black text-amber-900" }, "اختر القسم من قاعدة البيانات لتوليد الرابط تلقائياً"), createVNode("select", {
							onChange: ($event) => onCategoryAutofill($event),
							class: "w-full rounded-xl border border-amber-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
						}, [createVNode("option", { value: "" }, "-- اختر القسم --"), (openBlock(true), createBlock(Fragment, null, renderList(unref(dbCategories), (cat) => {
							return openBlock(), createBlock("option", {
								key: cat.id,
								value: cat.slug
							}, toDisplayString(cat.name), 9, ["value"]);
						}), 128))], 40, ["onChange"])])) : createCommentVNode("", true),
						formData.type === "brand" ? (openBlock(), createBlock("div", {
							key: 1,
							class: "p-3.5 bg-indigo-50/70 rounded-2xl border border-indigo-200/80 space-y-2"
						}, [createVNode("label", { class: "block text-xs font-black text-indigo-900" }, "اختر الماركة من قاعدة البيانات لتوليد الرابط تلقائياً"), createVNode("select", {
							onChange: ($event) => onBrandAutofill($event),
							class: "w-full rounded-xl border border-indigo-300 bg-white px-3 h-[40px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
						}, [createVNode("option", { value: "" }, "-- اختر الماركة --"), (openBlock(true), createBlock(Fragment, null, renderList(unref(dbBrands), (b) => {
							return openBlock(), createBlock("option", {
								key: b.id,
								value: b.slug
							}, toDisplayString(b.name), 9, ["value"]);
						}), 128))], 40, ["onChange"])])) : createCommentVNode("", true),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, [createVNode("div", { class: "sm:col-span-2" }, [createVNode(BaseInput_default, {
							modelValue: formData.url,
							"onUpdate:modelValue": ($event) => formData.url = $event,
							label: "الرابط المستهدف (URL) *",
							placeholder: "/category/kitchen-appliances أو https://...",
							dir: "ltr",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"])]), createVNode("div", { class: "space-y-1.5" }, [createVNode("label", { class: "block text-xs font-bold text-slate-700" }, "فتح الرابط في"), withDirectives(createVNode("select", {
							"onUpdate:modelValue": ($event) => formData.target = $event,
							class: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
						}, [createVNode("option", { value: "_self" }, "نفس الصفحة (_self)"), createVNode("option", { value: "_blank" }, "علامة تبويب جديدة (_blank)")], 8, ["onUpdate:modelValue"]), [[vModelSelect, formData.target]])])]),
						createVNode("div", { class: "space-y-1.5" }, [
							createVNode("label", { class: "block text-xs font-bold text-slate-700" }, "العنصر الأب (Parent Menu Item)"),
							withDirectives(createVNode("select", {
								"onUpdate:modelValue": ($event) => formData.parent_id = $event,
								class: "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
							}, [createVNode("option", { value: null }, "-- عنصر رئيسي في شريط التنقل (بدون أب) --"), (openBlock(true), createBlock(Fragment, null, renderList(availableParentOptions.value, (p) => {
								return openBlock(), createBlock("option", {
									key: p.id,
									value: p.id
								}, " ↳ " + toDisplayString(p.title_ar || p.title), 9, ["value"]);
							}), 128))], 8, ["onUpdate:modelValue"]), [[vModelSelect, formData.parent_id]]),
							createVNode("p", { class: "text-[11px] text-slate-400" }, "إذا اخترت عنصراً أباً، فسيظهر هذا الرابط كخيار منسدل فرعي تحته.")
						]),
						createVNode("div", { class: "p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-3" }, [
							createVNode("h5", { class: "text-xs font-black text-slate-800 flex items-center gap-1.5" }, [createVNode("i", { class: "fa-solid fa-tag text-indigo-500" }), createTextVNode(" الشارة الترويجية (Badge) ")]),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
								modelValue: formData.badge,
								"onUpdate:modelValue": ($event) => formData.badge = $event,
								label: "نص الشارة (اختياري)",
								placeholder: "مثال: HOT, جديد, خصم 20%"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode("div", { class: "space-y-1.5" }, [createVNode("label", { class: "block text-xs font-bold text-slate-700" }, "لون الشارة"), createVNode("div", { class: "flex items-center gap-2" }, [withDirectives(createVNode("input", {
								type: "color",
								"onUpdate:modelValue": ($event) => formData.badge_color = $event,
								class: "w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 shrink-0"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, formData.badge_color]]), withDirectives(createVNode("input", {
								type: "text",
								"onUpdate:modelValue": ($event) => formData.badge_color = $event,
								placeholder: "#ef4444 أو bg-rose-500",
								class: "flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono",
								dir: "ltr"
							}, null, 8, ["onUpdate:modelValue"]), [[vModelText, formData.badge_color]])])])]),
							createVNode("div", { class: "flex items-center gap-2 flex-wrap pt-1" }, [createVNode("span", { class: "text-[11px] font-bold text-slate-400" }, "ألوان جاهزة:"), (openBlock(), createBlock(Fragment, null, renderList(colorPresets, (preset) => {
								return createVNode("button", {
									type: "button",
									key: preset.color,
									onClick: ($event) => formData.badge_color = preset.color,
									class: "px-2 py-0.5 rounded-md text-[10px] font-bold text-white transition-transform hover:scale-105 cursor-pointer",
									style: { backgroundColor: preset.color }
								}, toDisplayString(preset.name), 13, ["onClick"]);
							}), 64))])
						]),
						createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 items-center" }, [createVNode("div", { class: "space-y-1.5" }, [createVNode("label", { class: "block text-xs font-bold text-slate-700" }, "أيقونة العنصر (FontAwesome Class)"), createVNode("div", { class: "flex items-center gap-2" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-sm shrink-0 border border-slate-200" }, [formData.icon ? (openBlock(), createBlock("i", {
							key: 0,
							class: formData.icon
						}, null, 2)) : (openBlock(), createBlock("i", {
							key: 1,
							class: "fa-solid fa-icons text-slate-400"
						}))]), withDirectives(createVNode("input", {
							type: "text",
							"onUpdate:modelValue": ($event) => formData.icon = $event,
							placeholder: "fa-solid fa-tag",
							class: "flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[40px] text-xs font-mono",
							dir: "ltr"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelText, formData.icon]])])]), createVNode("div", { class: "flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 sm:mt-4" }, [createVNode("div", null, [createVNode("span", { class: "text-xs font-black text-slate-800 block" }, "تفعيل العنصر في المتجر"), createVNode("span", { class: "text-[10px] text-slate-500" }, "إظهار العنصر فورياً في الناف بار")]), withDirectives(createVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": ($event) => formData.is_active = $event,
							class: "w-5 h-5 text-indigo-600 rounded cursor-pointer accent-indigo-600"
						}, null, 8, ["onUpdate:modelValue"]), [[vModelCheckbox, formData.is_active]])])]),
						createVNode("div", { class: "flex items-center justify-end gap-3 pt-4 border-t border-slate-100" }, [createVNode("button", {
							type: "button",
							onClick: ($event) => isFormModalOpen.value = false,
							class: "px-4 py-2.5 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
						}, " إلغاء ", 8, ["onClick"]), createVNode("button", {
							type: "submit",
							disabled: unref(isSubmitting),
							class: "px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
						}, [unref(isSubmitting) ? (openBlock(), createBlock("i", {
							key: 0,
							class: "fa-solid fa-spinner fa-spin text-xs"
						})) : (openBlock(), createBlock("i", {
							key: 1,
							class: "fa-solid fa-check text-xs"
						})), createVNode("span", null, toDisplayString(unref(isSubmitting) ? "جاري الحفظ..." : editingItem.value ? "حفظ التعديلات" : "تأكيد الإضافة"), 1)], 8, ["disabled"])])
					], 32)];
				}),
				_: 1
			}, _parent));
			_push(ssrRenderComponent(BaseModal_default, {
				"is-open": isDeleteModalOpen.value,
				title: "تأكيد حذف عنصر القائمة",
				onClose: ($event) => isDeleteModalOpen.value = false
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="space-y-4"${_scopeId}><div class="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg shrink-0"${_scopeId}><i class="fa-solid fa-triangle-exclamation"${_scopeId}></i></div><div${_scopeId}><h4 class="text-sm font-black text-rose-900"${_scopeId}>هل أنت متأكد من حذف هذا العنصر؟</h4><p class="text-xs text-rose-700 mt-0.5"${_scopeId}> سيتم حذف &quot;<span class="font-bold"${_scopeId}>${ssrInterpolate(itemToDelete.value?.title_ar || itemToDelete.value?.title)}</span>&quot; وكافة العناصر الفرعية المنسدلة التابعة له نهائياً من شريط التنقل. </p></div></div><div class="flex items-center justify-end gap-3 pt-3 border-t border-slate-100"${_scopeId}><button type="button" class="px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"${_scopeId}> إلغاء </button><button type="button"${ssrIncludeBooleanAttr(unref(deletingId) !== null) ? " disabled" : ""} class="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"${_scopeId}>`);
						if (unref(deletingId) !== null) _push(`<i class="fa-solid fa-spinner fa-spin text-xs"${_scopeId}></i>`);
						else _push(`<i class="fa-solid fa-trash text-xs"${_scopeId}></i>`);
						_push(`<span${_scopeId}>تأكيد الحذف النهائي</span></button></div></div>`);
					} else return [createVNode("div", { class: "space-y-4" }, [createVNode("div", { class: "p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3" }, [createVNode("div", { class: "w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg shrink-0" }, [createVNode("i", { class: "fa-solid fa-triangle-exclamation" })]), createVNode("div", null, [createVNode("h4", { class: "text-sm font-black text-rose-900" }, "هل أنت متأكد من حذف هذا العنصر؟"), createVNode("p", { class: "text-xs text-rose-700 mt-0.5" }, [
						createTextVNode(" سيتم حذف \""),
						createVNode("span", { class: "font-bold" }, toDisplayString(itemToDelete.value?.title_ar || itemToDelete.value?.title), 1),
						createTextVNode("\" وكافة العناصر الفرعية المنسدلة التابعة له نهائياً من شريط التنقل. ")
					])])]), createVNode("div", { class: "flex items-center justify-end gap-3 pt-3 border-t border-slate-100" }, [createVNode("button", {
						type: "button",
						onClick: ($event) => isDeleteModalOpen.value = false,
						class: "px-4 py-2 text-slate-600 hover:text-slate-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
					}, " إلغاء ", 8, ["onClick"]), createVNode("button", {
						type: "button",
						onClick: _ctx.executeDelete,
						disabled: unref(deletingId) !== null,
						class: "px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-colors shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
					}, [unref(deletingId) !== null ? (openBlock(), createBlock("i", {
						key: 0,
						class: "fa-solid fa-spinner fa-spin text-xs"
					})) : (openBlock(), createBlock("i", {
						key: 1,
						class: "fa-solid fa-trash text-xs"
					})), createVNode("span", null, "تأكيد الحذف النهائي")], 8, ["onClick", "disabled"])])])];
				}),
				_: 1
			}, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/navbar/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/navbar/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var navbar_default = index_vue_vue_type_script_setup_true_lang_default;

export { navbar_default as default };
//# sourceMappingURL=navbar-Czq5NRYN.mjs.map
