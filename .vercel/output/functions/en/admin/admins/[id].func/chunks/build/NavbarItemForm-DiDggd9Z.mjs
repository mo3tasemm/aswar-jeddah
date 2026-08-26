import { A as AdminLangTabs_default } from './AdminLangTabs-DVYAqM7r.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { defineComponent, ref, reactive, watch, computed, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from 'vue/server-renderer';

//#region components/dashboard/NavbarItemForm.vue?vue&type=script&setup=true&lang.ts
var NavbarItemForm_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "NavbarItemForm",
	__ssrInlineRender: true,
	props: {
		initialData: {},
		isEditMode: { type: Boolean },
		isSubmitting: { type: Boolean },
		parentOptions: {},
		dbCategories: {},
		dbBrands: {}
	},
	emits: ["submit", "cancel"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const activeLang = ref("ar");
		const form = reactive({
			title_ar: props.initialData?.title_ar || props.initialData?.title || "",
			title_en: props.initialData?.title_en || "",
			type: props.initialData?.type || "link",
			url: props.initialData?.url || "/",
			target: props.initialData?.target || "_self",
			parent_id: props.initialData?.parent_id ? Number(props.initialData.parent_id) : null,
			badge: props.initialData?.badge || "",
			badge_color: props.initialData?.badge_color || "#ef4444",
			icon: props.initialData?.icon || "",
			is_active: props.initialData?.is_active !== void 0 ? props.initialData.is_active === 1 || props.initialData.is_active === true : true,
			sort_order: props.initialData?.sort_order || 1
		});
		watch(() => props.initialData, (newVal) => {
			if (newVal) {
				form.title_ar = newVal.title_ar || newVal.title || "";
				form.title_en = newVal.title_en || "";
				form.type = newVal.type || "link";
				form.url = newVal.url || "/";
				form.target = newVal.target || "_self";
				form.parent_id = newVal.parent_id ? Number(newVal.parent_id) : null;
				form.badge = newVal.badge || "";
				form.badge_color = newVal.badge_color || "#ef4444";
				form.icon = newVal.icon || "";
				form.is_active = newVal.is_active !== void 0 ? newVal.is_active === 1 || newVal.is_active === true : true;
				form.sort_order = newVal.sort_order || 1;
			}
		}, { deep: true });
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
				label: "قسم متجر",
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
		const parentCandidates = computed(() => {
			return (props.parentOptions || []).filter((p) => !props.initialData?.id || String(p.id) !== String(props.initialData.id));
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6" }, _attrs))}><div class="flex items-center justify-between pb-4 border-b border-slate-100"><div class="flex items-center gap-2"><i class="fa-solid fa-language text-indigo-600 text-base"></i><span class="text-xs font-bold text-slate-700">لغة إدخال بيانات الرابط:</span></div>`);
			_push(ssrRenderComponent(AdminLangTabs_default, {
				modelValue: activeLang.value,
				"onUpdate:modelValue": ($event) => activeLang.value = $event
			}, null, _parent));
			_push(`</div><form class="space-y-6"><div class="space-y-4"><h3 class="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2"><i class="fa-solid fa-heading text-indigo-500"></i> عناوين عنصر القائمة (Navbar Titles) </h3><div class="space-y-4" style="${ssrRenderStyle(activeLang.value === "ar" ? null : { display: "none" })}">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.title_ar,
				"onUpdate:modelValue": ($event) => form.title_ar = $event,
				label: "العنوان بالعربية (Arabic Title) *",
				placeholder: "مثال: الأجهزة المنزلية، العروض الخاصة...",
				required: ""
			}, null, _parent));
			_push(`</div><div class="space-y-4" style="${ssrRenderStyle(activeLang.value === "en" ? null : { display: "none" })}">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.title_en,
				"onUpdate:modelValue": ($event) => form.title_en = $event,
				label: "العنوان بالإنجليزية (English Title) *",
				placeholder: "e.g. Home Appliances, Special Offers...",
				dir: "ltr",
				required: ""
			}, null, _parent));
			_push(`</div></div><div class="space-y-4 pt-2"><h3 class="text-sm font-black text-slate-800 flex items-center gap-2 border-b border-slate-100 pb-2"><i class="fa-solid fa-shapes text-indigo-500"></i> نوع الرابط والوجهة (Type &amp; Destination) </h3><div class="space-y-2"><label class="block text-xs font-bold text-slate-700">نوع العنصر في شريط التنقل</label><div class="grid grid-cols-2 sm:grid-cols-4 gap-3"><!--[-->`);
			ssrRenderList(typeOptions, (tOpt) => {
				_push(`<button type="button" class="${ssrRenderClass(["p-3 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs", form.type === tOpt.value ? "border-indigo-600 bg-indigo-50 text-indigo-700 ring-2 ring-indigo-500/20 font-black" : "border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100"])}"><i class="${ssrRenderClass(tOpt.icon)}"></i><span>${ssrInterpolate(tOpt.label)}</span></button>`);
			});
			_push(`<!--]--></div></div>`);
			if (form.type === "category") {
				_push(`<div class="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2"><label class="block text-xs font-black text-amber-900 flex items-center gap-1.5"><i class="fa-solid fa-folder-tree"></i> اختر القسم من قاعدة البيانات لتوليد الرابط والعنوان تلقائياً </label><select class="w-full rounded-xl border border-amber-300 bg-white px-4 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer shadow-xs"><option value="">-- اضغط للاختيار من أقسام المتجر --</option><!--[-->`);
				ssrRenderList(__props.dbCategories, (cat) => {
					_push(`<option${ssrRenderAttr("value", cat.slug)}>${ssrInterpolate(cat.name)}</option>`);
				});
				_push(`<!--]--></select></div>`);
			} else _push(`<!---->`);
			if (form.type === "brand") {
				_push(`<div class="p-4 bg-indigo-50/80 rounded-2xl border border-indigo-200 space-y-2"><label class="block text-xs font-black text-indigo-900 flex items-center gap-1.5"><i class="fa-solid fa-tag"></i> اختر الماركة من قاعدة البيانات لتوليد الرابط والعنوان تلقائياً </label><select class="w-full rounded-xl border border-indigo-300 bg-white px-4 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer shadow-xs"><option value="">-- اضغط للاختيار من ماركات المتجر --</option><!--[-->`);
				ssrRenderList(__props.dbBrands, (b) => {
					_push(`<option${ssrRenderAttr("value", b.slug)}>${ssrInterpolate(b.name)}</option>`);
				});
				_push(`<!--]--></select></div>`);
			} else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><div class="sm:col-span-2">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.url,
				"onUpdate:modelValue": ($event) => form.url = $event,
				label: "الرابط المستهدف (Target URL) *",
				placeholder: "/category/kitchen-appliances أو https://...",
				dir: "ltr",
				required: ""
			}, null, _parent));
			_push(`</div><div class="space-y-1.5"><label class="block text-xs font-bold text-slate-700">فتح الرابط في</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"><option value="_self"${ssrIncludeBooleanAttr(Array.isArray(form.target) ? ssrLooseContain(form.target, "_self") : ssrLooseEqual(form.target, "_self")) ? " selected" : ""}>نفس الصفحة (_self)</option><option value="_blank"${ssrIncludeBooleanAttr(Array.isArray(form.target) ? ssrLooseContain(form.target, "_blank") : ssrLooseEqual(form.target, "_blank")) ? " selected" : ""}>علامة تبويب جديدة (_blank)</option></select></div></div><div class="space-y-1.5"><label class="block text-xs font-bold text-slate-700">العنصر الأب في القائمة (Parent Item)</label><select class="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 h-[44px] text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"><option${ssrRenderAttr("value", null)}${ssrIncludeBooleanAttr(Array.isArray(form.parent_id) ? ssrLooseContain(form.parent_id, null) : ssrLooseEqual(form.parent_id, null)) ? " selected" : ""}>-- عنصر رئيسي مباشر في شريط التنقل (بدون أب) --</option><!--[-->`);
			ssrRenderList(parentCandidates.value, (parent) => {
				_push(`<option${ssrRenderAttr("value", parent.id)}${ssrIncludeBooleanAttr(Array.isArray(form.parent_id) ? ssrLooseContain(form.parent_id, parent.id) : ssrLooseEqual(form.parent_id, parent.id)) ? " selected" : ""}> ↳ ${ssrInterpolate(parent.title_ar || parent.title)}</option>`);
			});
			_push(`<!--]--></select><p class="text-[11px] text-slate-400">إذا اخترت عنصراً أباً، فسيظهر هذا الرابط كخيار منسدل فرعي تحته.</p></div></div><div class="p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-4"><h4 class="text-xs font-black text-slate-800 flex items-center gap-1.5"><i class="fa-solid fa-tag text-indigo-500"></i> الشارة الترويجية والمظهر (Badge &amp; Visuals) </h4><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div style="${ssrRenderStyle(activeLang.value === "ar" ? null : { display: "none" })}">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.badge,
				"onUpdate:modelValue": ($event) => form.badge = $event,
				label: "نص الشارة الترويجية (عربي)",
				placeholder: "مثال: خصم 20%, جديد, HOT"
			}, null, _parent));
			_push(`</div><div style="${ssrRenderStyle(activeLang.value === "en" ? null : { display: "none" })}">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: form.badge,
				"onUpdate:modelValue": ($event) => form.badge = $event,
				label: "Promotional Badge Text (English)",
				placeholder: "e.g. 20% OFF, NEW, HOT",
				dir: "ltr"
			}, null, _parent));
			_push(`</div><div class="space-y-1.5"><label class="block text-xs font-bold text-slate-700">لون الشارة (Badge Color)</label><div class="flex items-center gap-2"><input type="color"${ssrRenderAttr("value", form.badge_color)} class="w-10 h-10 rounded-xl cursor-pointer border border-slate-200 p-1 shrink-0"><input type="text"${ssrRenderAttr("value", form.badge_color)} placeholder="#ef4444" class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono" dir="ltr"></div></div></div><div class="flex items-center gap-2 flex-wrap pt-1"><span class="text-[11px] font-bold text-slate-400">ألوان سريعة للشارة:</span><!--[-->`);
			ssrRenderList(colorPresets, (preset) => {
				_push(`<button type="button" class="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white transition-transform hover:scale-105 cursor-pointer shadow-2xs" style="${ssrRenderStyle({ backgroundColor: preset.color })}">${ssrInterpolate(preset.name)}</button>`);
			});
			_push(`<!--]--></div></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"><div class="space-y-1.5 sm:col-span-2"><label class="block text-xs font-bold text-slate-700">كلاس الأيقونة (FontAwesome Icon)</label><div class="flex items-center gap-2"><div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm shrink-0 border border-indigo-100">`);
			if (form.icon) _push(`<i class="${ssrRenderClass(form.icon)}"></i>`);
			else _push(`<i class="fa-solid fa-icons text-slate-400"></i>`);
			_push(`</div><input type="text"${ssrRenderAttr("value", form.icon)} placeholder="fa-solid fa-tag" class="flex-1 rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-mono" dir="ltr"></div></div><div class="space-y-1.5"><label class="block text-xs font-bold text-slate-700">ترتيب الظهور (Sort Order)</label><input type="number"${ssrRenderAttr("value", form.sort_order)} min="1" class="w-full rounded-xl border border-slate-200 bg-white px-3 h-[40px] text-xs font-bold text-slate-800"></div></div><div class="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200"><div><span class="text-xs font-black text-slate-900 block">تفعيل العنصر في المتجر (Active Status)</span><span class="text-[11px] text-slate-500">إظهار هذا الرابط أو القائمة المنسدلة لزوار المتجر فورياً.</span></div><label class="relative inline-flex items-center cursor-pointer"><input type="checkbox"${ssrIncludeBooleanAttr(Array.isArray(form.is_active) ? ssrLooseContain(form.is_active, null) : form.is_active) ? " checked" : ""} class="sr-only peer"><div class="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[&#39;&#39;] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div></label></div><div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100"><button type="button" class="px-6 py-3 text-slate-600 hover:text-slate-900 font-bold text-sm rounded-xl transition-colors cursor-pointer border border-slate-200 bg-white hover:bg-slate-50"> إلغاء والرجوع </button><button type="submit"${ssrIncludeBooleanAttr(__props.isSubmitting) ? " disabled" : ""} class="px-8 py-3 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm rounded-xl transition-all shadow-md shadow-amber-400/20 flex items-center gap-2 cursor-pointer disabled:opacity-50">`);
			if (__props.isSubmitting) _push(`<i class="fa-solid fa-spinner fa-spin text-sm"></i>`);
			else _push(`<i class="fa-solid fa-check text-sm"></i>`);
			_push(`<span>${ssrInterpolate(__props.isSubmitting ? "جاري الحفظ..." : __props.isEditMode ? "حفظ التعديلات" : "تأكيد إضافة عنصر القائمة")}</span></button></div></form></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/NavbarItemForm.vue
var _sfc_setup = NavbarItemForm_vue_vue_type_script_setup_true_lang_default.setup;
NavbarItemForm_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/NavbarItemForm.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var NavbarItemForm_default = Object.assign(NavbarItemForm_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardNavbarItemForm" });

export { NavbarItemForm_default as N };
//# sourceMappingURL=NavbarItemForm-DiDggd9Z.mjs.map
