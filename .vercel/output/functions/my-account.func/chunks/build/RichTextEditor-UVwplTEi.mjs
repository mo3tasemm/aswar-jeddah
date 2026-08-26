import { _ as _plugin_vue_export_helper_default } from '../virtual/entry.mjs';
import { defineComponent, ref, watch, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';

//#region components/dashboard/ui/RichTextEditor.vue?vue&type=script&setup=true&lang.ts
var RichTextEditor_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RichTextEditor",
	__ssrInlineRender: true,
	props: {
		modelValue: { default: "" },
		label: { default: "" },
		placeholder: { default: "اكتب وصفاً مفصلاً ومسقاً هنا..." },
		required: {
			type: Boolean,
			default: false
		},
		dir: { default: "rtl" }
	},
	emits: ["update:modelValue"],
	setup(__props, { emit: __emit }) {
		const props = __props;
		const editorRef = ref(null);
		const isFocused = ref(false);
		watch(() => props.modelValue, (newVal) => {
			if (editorRef.value && editorRef.value.innerHTML !== newVal) editorRef.value.innerHTML = newVal || "";
		});
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col gap-1.5 w-full" }, _attrs))} data-v-0bf80ceb>`);
			if (__props.label) {
				_push(`<label class="text-xs font-extrabold text-[#0B0E28] block" data-v-0bf80ceb>${ssrInterpolate(__props.label)} `);
				if (__props.required) _push(`<span class="text-rose-500 ms-0.5" data-v-0bf80ceb>*</span>`);
				else _push(`<!---->`);
				_push(`</label>`);
			} else _push(`<!---->`);
			_push(`<div class="${ssrRenderClass([isFocused.value ? "border-amber-400 bg-white ring-2 ring-amber-400/20" : "border-slate-200 hover:border-slate-300", "border rounded-2xl overflow-hidden bg-slate-50/50 transition-all duration-200"])}" data-v-0bf80ceb><div class="bg-slate-100/80 p-2 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700 text-xs font-bold select-none" data-v-0bf80ceb><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center font-black transition-colors" title="عريض (Bold)" data-v-0bf80ceb> B </button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center italic font-serif transition-colors" title="مائل (Italic)" data-v-0bf80ceb> I </button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center underline transition-colors" title="تحته خط (Underline)" data-v-0bf80ceb> U </button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center line-through transition-colors" title="مشطوب (Strike)" data-v-0bf80ceb> S </button><div class="w-px h-5 bg-slate-300 mx-1" data-v-0bf80ceb></div><select class="bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 outline-none cursor-pointer" data-v-0bf80ceb><option value="p" data-v-0bf80ceb>نص عادي</option><option value="h2" data-v-0bf80ceb>عنوان رئيسي (H2)</option><option value="h3" data-v-0bf80ceb>عنوان فرعي (H3)</option></select><div class="w-px h-5 bg-slate-300 mx-1" data-v-0bf80ceb></div><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors" title="قائمة نقطية" data-v-0bf80ceb><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0bf80ceb><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" data-v-0bf80ceb></path></svg></button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors" title="قائمة رقمية" data-v-0bf80ceb><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0bf80ceb><path stroke-linecap="round" stroke-linejoin="round" d="M7 6h13M7 12h13M7 18h13M3 6h.01M3 12h.01M3 18h.01" data-v-0bf80ceb></path></svg></button><div class="w-px h-5 bg-slate-300 mx-1" data-v-0bf80ceb></div><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors" title="محاذاة لليمين" data-v-0bf80ceb><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0bf80ceb><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M10 12h10M6 18h14" data-v-0bf80ceb></path></svg></button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors" title="محاذاة في الوسط" data-v-0bf80ceb><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0bf80ceb><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M7 12h10M5 18h14" data-v-0bf80ceb></path></svg></button><button type="button" class="w-7 h-7 rounded-lg hover:bg-slate-200/80 flex items-center justify-center transition-colors" title="محاذاة لليسار" data-v-0bf80ceb><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" data-v-0bf80ceb><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h10M4 18h14" data-v-0bf80ceb></path></svg></button><div class="w-px h-5 bg-slate-300 mx-1 ms-auto" data-v-0bf80ceb></div><button type="button" class="px-2 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-[11px] font-bold transition-colors" title="إزالة التنسيقات" data-v-0bf80ceb> مسح التنسيق </button></div><div contenteditable="true"${ssrRenderAttr("dir", __props.dir)} class="p-4 min-h-[140px] max-h-[300px] overflow-y-auto text-sm font-medium text-[#0B0E28] outline-none prose prose-slate max-w-none focus:outline-none"${ssrRenderAttr("data-placeholder", __props.placeholder)} data-v-0bf80ceb></div></div></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/ui/RichTextEditor.vue
var _sfc_setup = RichTextEditor_vue_vue_type_script_setup_true_lang_default.setup;
RichTextEditor_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/RichTextEditor.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RichTextEditor_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(RichTextEditor_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-0bf80ceb"]]), { __name: "DashboardUiRichTextEditor" });

export { RichTextEditor_default as R };
//# sourceMappingURL=RichTextEditor-UVwplTEi.mjs.map
