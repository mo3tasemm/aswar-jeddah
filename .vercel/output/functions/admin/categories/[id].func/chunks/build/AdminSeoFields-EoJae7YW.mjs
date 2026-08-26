import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { A as AdminCard_default } from './AdminCard-BCY_YRzZ.mjs';
import { defineComponent, mergeProps, withCtx, withDirectives, createVNode, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle } from 'vue/server-renderer';

//#region components/dashboard/ui/AdminSeoFields.vue?vue&type=script&setup=true&lang.ts
var AdminSeoFields_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "AdminSeoFields",
	__ssrInlineRender: true,
	props: {
		metaTitleAr: { default: "" },
		metaTitleEn: { default: "" },
		metaDescriptionAr: { default: "" },
		metaDescriptionEn: { default: "" },
		activeLang: { default: "ar" },
		titleArLabel: {},
		titleArPlaceholder: {},
		descArLabel: {},
		descArPlaceholder: {},
		titleEnLabel: {},
		titleEnPlaceholder: {},
		descEnLabel: {},
		descEnPlaceholder: {}
	},
	emits: [
		"update:metaTitleAr",
		"update:metaTitleEn",
		"update:metaDescriptionAr",
		"update:metaDescriptionEn"
	],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(AdminCard_default, mergeProps({
				title: "إعدادات محركات البحث والـ SEO (Meta Data)",
				subtitle: "تحسين ظهور الصفحة في نتائج بحث Google ومحركات البحث باللغتين العربية والإنجليزية.",
				icon: "fa-solid fa-magnifying-glass",
				iconColor: "text-blue-500"
			}, _attrs), {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) {
						_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4" style="${ssrRenderStyle(__props.activeLang === "ar" ? null : { display: "none" })}"${_scopeId}>`);
						_push(ssrRenderComponent(BaseInput_default, {
							"model-value": __props.metaTitleAr,
							"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaTitleAr", $event),
							label: __props.titleArLabel || "عنوان الميتا (بالعربي)",
							placeholder: __props.titleArPlaceholder || "سياسة الخصوصية والأمان | متجر أسوار جدة"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(BaseInput_default, {
							"model-value": __props.metaDescriptionAr,
							"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaDescriptionAr", $event),
							label: __props.descArLabel || "وصف الميتا (بالعربي)",
							placeholder: __props.descArPlaceholder || "وصف تفصيلي لتحسين الـ SEO..."
						}, null, _parent, _scopeId));
						_push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr" style="${ssrRenderStyle(__props.activeLang === "en" ? null : { display: "none" })}"${_scopeId}>`);
						_push(ssrRenderComponent(BaseInput_default, {
							"model-value": __props.metaTitleEn,
							"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaTitleEn", $event),
							label: __props.titleEnLabel || "Meta Title (English)",
							placeholder: __props.titleEnPlaceholder || "Privacy Policy & Terms | Aswar Jeddah",
							dir: "ltr"
						}, null, _parent, _scopeId));
						_push(ssrRenderComponent(BaseInput_default, {
							"model-value": __props.metaDescriptionEn,
							"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaDescriptionEn", $event),
							label: __props.descEnLabel || "Meta Description (English)",
							placeholder: __props.descEnPlaceholder || "Detailed SEO description in English...",
							dir: "ltr"
						}, null, _parent, _scopeId));
						_push(`</div>`);
					} else return [withDirectives(createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
						"model-value": __props.metaTitleAr,
						"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaTitleAr", $event),
						label: __props.titleArLabel || "عنوان الميتا (بالعربي)",
						placeholder: __props.titleArPlaceholder || "سياسة الخصوصية والأمان | متجر أسوار جدة"
					}, null, 8, [
						"model-value",
						"onUpdate:modelValue",
						"label",
						"placeholder"
					]), createVNode(BaseInput_default, {
						"model-value": __props.metaDescriptionAr,
						"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaDescriptionAr", $event),
						label: __props.descArLabel || "وصف الميتا (بالعربي)",
						placeholder: __props.descArPlaceholder || "وصف تفصيلي لتحسين الـ SEO..."
					}, null, 8, [
						"model-value",
						"onUpdate:modelValue",
						"label",
						"placeholder"
					])], 512), [[vShow, __props.activeLang === "ar"]]), withDirectives(createVNode("div", {
						class: "grid grid-cols-1 md:grid-cols-2 gap-4",
						dir: "ltr"
					}, [createVNode(BaseInput_default, {
						"model-value": __props.metaTitleEn,
						"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaTitleEn", $event),
						label: __props.titleEnLabel || "Meta Title (English)",
						placeholder: __props.titleEnPlaceholder || "Privacy Policy & Terms | Aswar Jeddah",
						dir: "ltr"
					}, null, 8, [
						"model-value",
						"onUpdate:modelValue",
						"label",
						"placeholder"
					]), createVNode(BaseInput_default, {
						"model-value": __props.metaDescriptionEn,
						"onUpdate:modelValue": ($event) => _ctx.$emit("update:metaDescriptionEn", $event),
						label: __props.descEnLabel || "Meta Description (English)",
						placeholder: __props.descEnPlaceholder || "Detailed SEO description in English...",
						dir: "ltr"
					}, null, 8, [
						"model-value",
						"onUpdate:modelValue",
						"label",
						"placeholder"
					])], 512), [[vShow, __props.activeLang === "en"]])];
				}),
				_: 1
			}, _parent));
		};
	}
});
//#endregion
//#region components/dashboard/ui/AdminSeoFields.vue
var _sfc_setup = AdminSeoFields_vue_vue_type_script_setup_true_lang_default.setup;
AdminSeoFields_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/ui/AdminSeoFields.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var AdminSeoFields_default = Object.assign(AdminSeoFields_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardUiAdminSeoFields" });

export { AdminSeoFields_default as A };
//# sourceMappingURL=AdminSeoFields-EoJae7YW.mjs.map
