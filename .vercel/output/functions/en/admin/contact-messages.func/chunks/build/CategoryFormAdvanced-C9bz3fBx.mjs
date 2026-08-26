import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, ref, reactive, computed, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList } from 'vue/server-renderer';

//#region components/dashboard/CategoryFormAdvanced.vue?vue&type=script&setup=true&lang.ts
var CategoryFormAdvanced_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "CategoryFormAdvanced",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEditMode: { type: Boolean },
		isSubmitting: { type: Boolean },
		categoriesList: {}
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		ref(null);
		const formError = ref("");
		const fileName = ref("");
		const imagePreview = ref(props.initialData?.existingImage || "");
		const form = reactive({
			id: props.initialData?.id || "",
			name_ar: props.initialData?.name_ar || "",
			name_en: props.initialData?.name_en || "",
			parent_id: props.initialData?.parent_id !== void 0 ? props.initialData.parent_id : 0,
			position: props.initialData?.position || 0,
			priority: props.initialData?.priority || 1,
			imageFile: null
		});
		const availableParents = computed(() => {
			const list = props.categoriesList || [];
			if (!props.isEditMode || !form.id) return list.filter((c) => !c.parent_id || c.parent_id === 0 || c.parent_id === "0");
			return list.filter((c) => String(c.id) !== String(form.id) && (!c.parent_id || c.parent_id === 0 || c.parent_id === "0"));
		});
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.id = newVal.id || "";
				form.name_ar = newVal.name_ar || "";
				form.name_en = newVal.name_en || "";
				form.parent_id = newVal.parent_id !== void 0 ? newVal.parent_id : 0;
				form.position = newVal.position || 0;
				form.priority = newVal.priority || 1;
				if (newVal.existingImage) imagePreview.value = newVal.existingImage;
			}
		}, {
			immediate: true,
			deep: true
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))} data-v-193f9c31><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" data-v-193f9c31><div data-v-193f9c31><h2 class="text-xl sm:text-2xl font-black text-slate-900" data-v-193f9c31>${ssrInterpolate(__props.isEditMode ? "تعديل بيانات القسم" : "إضافة قسم جديد")}</h2><p class="text-xs sm:text-sm text-slate-500 font-medium mt-1" data-v-193f9c31> أدخل اسم القسم بالعربية والإنجليزية وحدد صورة الغلاف ليتم إرسال البيانات كـ FormData مع مصفوفات اللغات. </p></div><div class="flex items-center gap-3 w-full sm:w-auto" data-v-193f9c31><button type="button" class="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors cursor-pointer" data-v-193f9c31> إلغاء </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="flex-1 sm:flex-initial px-8 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-md shadow-amber-400/20 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer" data-v-193f9c31>`);
			if (__props.isSubmitting) _push(`<span class="w-4 h-4 border-2 border-[#0B0E28] border-t-transparent rounded-full animate-spin" data-v-193f9c31></span>`);
			else _push(`<!---->`);
			_push(`<span data-v-193f9c31>${ssrInterpolate(__props.isSubmitting ? "جاري الإرسال (FormData)..." : __props.isEditMode ? "حفظ التعديلات" : "إضافة القسم")}</span></button></div></div>`);
			if (formError.value) _push(`<div class="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-600 flex items-center gap-3 animate-shake" data-v-193f9c31><svg class="w-5 h-5 shrink-0 text-rose-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" data-v-193f9c31><circle cx="12" cy="12" r="10" data-v-193f9c31></circle><line x1="12" y1="8" x2="12" y2="12" data-v-193f9c31></line><line x1="12" y1="16" x2="12.01" y2="16" data-v-193f9c31></line></svg><span data-v-193f9c31>${ssrInterpolate(formError.value)}</span></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 xl:grid-cols-3 gap-6" data-v-193f9c31><div class="xl:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-193f9c31><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-193f9c31><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-193f9c31></span> بيانات القسم والتسلسل الهرمي (Category Hierarchy &amp; Names) </h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" data-v-193f9c31><div class="space-y-1.5" data-v-193f9c31><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-193f9c31> اسم القسم (بالعربية - name[ar]) <span class="text-rose-500" data-v-193f9c31>*</span></label><input type="text"${ssrRenderAttr("value", form.name_ar)} placeholder="مثال: أجهزة منزلية..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-193f9c31></div><div class="space-y-1.5" data-v-193f9c31><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-193f9c31> اسم القسم (بالإنجليزية - name[en]) </label><input type="text"${ssrRenderAttr("value", form.name_en)} placeholder="e.g. Home Appliances..." class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" dir="ltr" data-v-193f9c31></div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100" data-v-193f9c31><div class="space-y-1.5" data-v-193f9c31><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-193f9c31> القسم الأب (Parent Category) </label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 cursor-pointer" data-v-193f9c31><option${ssrRenderAttr("value", 0)} data-v-193f9c31${ssrIncludeBooleanAttr(Array.isArray(form.parent_id) ? ssrLooseContain(form.parent_id, 0) : ssrLooseEqual(form.parent_id, 0)) ? " selected" : ""}>قسم رئيسي (بدون أب - Main Category)</option><!--[-->`);
			ssrRenderList(availableParents.value, (cat) => {
				_push(`<option${ssrRenderAttr("value", cat.id)} data-v-193f9c31${ssrIncludeBooleanAttr(Array.isArray(form.parent_id) ? ssrLooseContain(form.parent_id, cat.id) : ssrLooseEqual(form.parent_id, cat.id)) ? " selected" : ""}>${ssrInterpolate(cat.name_ar || cat.name)} (${ssrInterpolate(cat.name_en || "Main")}) </option>`);
			});
			_push(`<!--]--></select><p class="text-[11px] text-slate-400 font-medium" data-v-193f9c31> اختر &quot;قسم رئيسي&quot; إذا كان القسم في المستوى الأول، أو حدد القسم الأب. </p></div><div class="space-y-1.5" data-v-193f9c31><label class="text-xs font-extrabold text-[#0B0E28] block" data-v-193f9c31> أولوية الترتيب (Priority) </label><input type="number"${ssrRenderAttr("value", form.priority)} min="0" placeholder="1" class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-[#0B0E28] focus:outline-none focus:bg-white focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20" data-v-193f9c31><p class="text-[11px] text-slate-400 font-medium" data-v-193f9c31> يحدد ترتيب ظهور القسم في واجهة المتجر (0، 1، 2...). </p></div></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6" data-v-193f9c31><h3 class="text-base font-extrabold text-slate-900 flex items-center gap-2" data-v-193f9c31><span class="w-2.5 h-2.5 rounded-full bg-amber-400" data-v-193f9c31></span> صورة القسم (image File) </h3><div class="space-y-4 text-center" data-v-193f9c31><div class="w-36 h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden mx-auto flex items-center justify-center relative shadow-sm group" data-v-193f9c31>`);
			if (imagePreview.value) _push(`<img${ssrRenderAttr("src", imagePreview.value)} class="w-full h-full object-cover" alt="Category Preview" data-v-193f9c31>`);
			else _push(`<div class="flex flex-col items-center justify-center text-slate-400 gap-1" data-v-193f9c31><svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5" data-v-193f9c31><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" data-v-193f9c31></path></svg><span class="text-[10px] font-bold" data-v-193f9c31>لا توجد صورة</span></div>`);
			if (form.imageFile) _push(`<button type="button" class="absolute top-2 left-2 w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-md hover:bg-rose-600 transition-colors cursor-pointer" title="إزالة الصورة المحددة" data-v-193f9c31><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" data-v-193f9c31><line x1="18" y1="6" x2="6" y2="18" data-v-193f9c31></line><line x1="6" y1="6" x2="18" y2="18" data-v-193f9c31></line></svg></button>`);
			else _push(`<!---->`);
			_push(`</div><div class="p-5 bg-slate-50 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl transition-colors cursor-pointer" data-v-193f9c31><input type="file" accept="image/*" class="hidden" data-v-193f9c31><div class="space-y-1" data-v-193f9c31><svg class="w-8 h-8 text-amber-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-193f9c31><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" data-v-193f9c31></path></svg><p class="text-xs font-bold text-[#0B0E28]" data-v-193f9c31> اضغط لاختيار صورة القسم </p><p class="text-[10px] text-slate-400 font-medium" data-v-193f9c31>${ssrInterpolate(__props.isEditMode ? "(اختياري عند التعديل - اتركها للإبقاء على الصورة الحالية)" : "(إجباري عند الإضافة - JPG, PNG, WEBP)")}</p></div></div>`);
			if (fileName.value) _push(`<p class="text-xs font-bold text-emerald-600 truncate max-w-full" data-v-193f9c31> الملف المحدد: ${ssrInterpolate(fileName.value)}</p>`);
			else _push(`<!---->`);
			_push(`</div></div></div></form>`);
		};
	}
});
//#endregion
//#region components/dashboard/CategoryFormAdvanced.vue
var _sfc_setup = CategoryFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup;
CategoryFormAdvanced_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/CategoryFormAdvanced.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CategoryFormAdvanced_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(CategoryFormAdvanced_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-193f9c31"]]), { __name: "DashboardCategoryFormAdvanced" });

export { CategoryFormAdvanced_default as C };
//# sourceMappingURL=CategoryFormAdvanced-C9bz3fBx.mjs.map
