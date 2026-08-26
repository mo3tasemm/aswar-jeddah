import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { A as AdminPageHeader_default } from './AdminPageHeader-RavS7Sn5.mjs';
import { A as AdminSkeletonForm_default, a as AdminSaveBar_default } from './AdminSaveBar-BcLKI7oo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { R as RichTextEditor_default } from './RichTextEditor-UVwplTEi.mjs';
import { B as BaseToggle_default } from './BaseToggle-BWlI_UOK.mjs';
import { A as AdminCard_default } from './AdminCard-BCY_YRzZ.mjs';
import { A as AdminSeoFields_default } from './AdminSeoFields-EoJae7YW.mjs';
import { B as BaseTextarea_default } from './BaseTextarea-B8WQh6wy.mjs';
import { u as useReturnPolicy } from './useReturnPolicy-CqsOPjo7.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, withDirectives, vShow, vModelText, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr } from 'vue/server-renderer';
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
import './useLanguage-Dqkt54yZ.mjs';

//#region pages/admin/return-policy/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		const { form, isLoading, isSubmitting, submitAdminReturnPolicy } = useReturnPolicy();
		const activeLangTab = ref("ar");
		useHead$1({ title: "إدارة سياسة الاستبدال والاسترجاع | لوحة تحكم أسوار جدة" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6 max-w-7xl mx-auto pb-24",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إدارة سياسة الاستبدال والاسترجاع (Return Policy)",
				subtitle: "تخصيص بنود الاسترجاع، البطاقات العلوية، خطوات الإرجاع الأربعة، وصندوق المساعدة والتواصل.",
				icon: "fa-solid fa-rotate-left",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "سياسة الاستبدال والاسترجاع" }],
				"show-lang-tabs": true,
				"lang-tab": activeLangTab.value,
				"onUpdate:langTab": ($event) => activeLangTab.value = $event,
				"show-save": true,
				"is-saving": unref(isSubmitting),
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminReturnPolicy)
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/return-policy",
						target: "_blank",
						class: "px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<i class="fa-solid fa-arrow-up-right-from-square text-xs text-slate-400"${_scopeId}></i><span class="hidden sm:inline"${_scopeId}>معاينة بالمتجر</span>`);
							else return [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, "معاينة بالمتجر")];
						}),
						_: 1
					}, _parent, _scopeId));
					else return [createVNode(_component_NuxtLink, {
						to: "/return-policy",
						target: "_blank",
						class: "px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
					}, {
						default: withCtx(() => [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, "معاينة بالمتجر")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			if (unref(isLoading)) _push(ssrRenderComponent(AdminSkeletonForm_default, { cards: 4 }, null, _parent));
			else {
				_push(`<div class="space-y-6">`);
				_push(ssrRenderComponent(AdminCard_default, {
					title: "الحالة والعناوين الرئيسية",
					subtitle: "تحديد ظهور السياسة للزوار وصياغة العناوين المعروضة في أعلى الصفحة.",
					icon: "fa-solid fa-sliders",
					"icon-color": "text-amber-500"
				}, {
					"header-actions": withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="flex items-center gap-3 bg-slate-50 p-2 sm:px-3.5 rounded-2xl border border-slate-200"${_scopeId}><span class="text-xs font-black text-slate-700"${_scopeId}>تفعيل السياسة في المتجر:</span>`);
							_push(ssrRenderComponent(BaseToggle_default, {
								modelValue: unref(form).is_active,
								"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
								label: unref(form).is_active ? "مفعلة وتظهر للعملاء" : "معطلة مؤقتاً"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "flex items-center gap-3 bg-slate-50 p-2 sm:px-3.5 rounded-2xl border border-slate-200" }, [createVNode("span", { class: "text-xs font-black text-slate-700" }, "تفعيل السياسة في المتجر:"), createVNode(BaseToggle_default, {
							modelValue: unref(form).is_active,
							"onUpdate:modelValue": ($event) => unref(form).is_active = $event,
							label: unref(form).is_active ? "مفعلة وتظهر للعملاء" : "معطلة مؤقتاً"
						}, null, 8, [
							"modelValue",
							"onUpdate:modelValue",
							"label"
						])])];
					}),
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).title_ar,
								"onUpdate:modelValue": ($event) => unref(form).title_ar = $event,
								label: "العنوان الرئيسي للمحتوى (بالعربي) *",
								placeholder: "سياسة الاستبدال والاسترجاع",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseTextarea_default, {
								modelValue: unref(form).subtitle_ar,
								"onUpdate:modelValue": ($event) => unref(form).subtitle_ar = $event,
								label: "الوصف التمهيدي أسفل العنوان (بالعربي)",
								placeholder: "تسوق بكل ثقة مع متجر أسوار جدة. نوفر لك تجربة استرجاع واستبدال مرنة...",
								rows: 2
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).title_en,
								"onUpdate:modelValue": ($event) => unref(form).title_en = $event,
								label: "Main Title (English) *",
								placeholder: "Return & Refund Policy",
								dir: "ltr",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseTextarea_default, {
								modelValue: unref(form).subtitle_en,
								"onUpdate:modelValue": ($event) => unref(form).subtitle_en = $event,
								label: "Hero Subtitle (English)",
								placeholder: "Shop with complete confidence at Aswar Jeddah. We provide smooth returns...",
								dir: "ltr",
								rows: 2
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [withDirectives(createVNode("div", { class: "space-y-4" }, [createVNode(BaseInput_default, {
							modelValue: unref(form).title_ar,
							"onUpdate:modelValue": ($event) => unref(form).title_ar = $event,
							label: "العنوان الرئيسي للمحتوى (بالعربي) *",
							placeholder: "سياسة الاستبدال والاسترجاع",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseTextarea_default, {
							modelValue: unref(form).subtitle_ar,
							"onUpdate:modelValue": ($event) => unref(form).subtitle_ar = $event,
							label: "الوصف التمهيدي أسفل العنوان (بالعربي)",
							placeholder: "تسوق بكل ثقة مع متجر أسوار جدة. نوفر لك تجربة استرجاع واستبدال مرنة...",
							rows: 2
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", {
							class: "space-y-4",
							dir: "ltr"
						}, [createVNode(BaseInput_default, {
							modelValue: unref(form).title_en,
							"onUpdate:modelValue": ($event) => unref(form).title_en = $event,
							label: "Main Title (English) *",
							placeholder: "Return & Refund Policy",
							dir: "ltr",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseTextarea_default, {
							modelValue: unref(form).subtitle_en,
							"onUpdate:modelValue": ($event) => unref(form).subtitle_en = $event,
							label: "Hero Subtitle (English)",
							placeholder: "Shop with complete confidence at Aswar Jeddah. We provide smooth returns...",
							dir: "ltr",
							rows: 2
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "بنود وشروط الاسترجاع والاستبدال (HTML Rich Content)",
					subtitle: "كتابة وصياغة بنود السياسة مع الترويسات والقوائم المتسلسلة لسهولة القراءة.",
					icon: "fa-solid fa-file-contract",
					"icon-color": "text-indigo-600"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}><label class="block text-xs font-black text-slate-700 mb-1"${_scopeId}>بنود وفقرات السياسة (بالعربي):</label>`);
							_push(ssrRenderComponent(RichTextEditor_default, {
								modelValue: unref(form).content_ar,
								"onUpdate:modelValue": ($event) => unref(form).content_ar = $event,
								placeholder: "اكتب بنود الاسترجاع والاستبدال هنا..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}><label class="block text-xs font-black text-slate-700 mb-1"${_scopeId}>Policy Clauses &amp; Terms (English):</label>`);
							_push(ssrRenderComponent(RichTextEditor_default, {
								modelValue: unref(form).content_en,
								"onUpdate:modelValue": ($event) => unref(form).content_en = $event,
								placeholder: "Write return policy clauses in English here..."
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode("label", { class: "block text-xs font-black text-slate-700 mb-1" }, "بنود وفقرات السياسة (بالعربي):"), createVNode(RichTextEditor_default, {
							modelValue: unref(form).content_ar,
							"onUpdate:modelValue": ($event) => unref(form).content_ar = $event,
							placeholder: "اكتب بنود الاسترجاع والاستبدال هنا..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", {
							class: "space-y-2",
							dir: "ltr"
						}, [createVNode("label", { class: "block text-xs font-black text-slate-700 mb-1" }, "Policy Clauses & Terms (English):"), createVNode(RichTextEditor_default, {
							modelValue: unref(form).content_en,
							"onUpdate:modelValue": ($event) => unref(form).content_en = $event,
							placeholder: "Write return policy clauses in English here..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "البطاقات الأربع العلوية (Top Highlight Cards)",
					subtitle: "تخصيص البطاقات العائمة الأربع المعروضة أسفل الهيدر مع الأيقونات والعناوين والوصف باللغتين.",
					icon: "fa-solid fa-layer-group",
					"icon-color": "text-amber-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"${_scopeId}><div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-amber-700"${_scopeId}>البطاقة الأولى #1</span><input${ssrRenderAttr("value", unref(form).highlight_1_icon)} placeholder="fa-solid fa-clock-rotate-left" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_1_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_1_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "مهلة استرجاع 14 يوماً"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_1_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_1_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "يمكنك استرجاع أو استبدال المنتج..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_1_title_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_1_title_en = $event,
								label: "Title (English) *",
								placeholder: "14-Day Return Window",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_1_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_1_desc_en = $event,
								label: "Description (English)",
								placeholder: "Return or exchange items within 14 days...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-indigo-700"${_scopeId}>البطاقة الثانية #2</span><input${ssrRenderAttr("value", unref(form).highlight_2_icon)} placeholder="fa-solid fa-box-open" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_2_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_2_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "تغليف المصنع الأصلي"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_2_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_2_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "أن يكون المنتج بحالته الأصلية غير مستخدم..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_2_title_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_2_title_en = $event,
								label: "Title (English) *",
								placeholder: "Original Packaging",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_2_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_2_desc_en = $event,
								label: "Description (English)",
								placeholder: "Items must be in original condition...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-emerald-700"${_scopeId}>البطاقة الثالثة #3</span><input${ssrRenderAttr("value", unref(form).highlight_3_icon)} placeholder="fa-solid fa-money-bill-transfer" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_3_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_3_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "استرداد مالي سريع"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_3_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_3_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "تحويل فوري إلى نفس وسيلة الدفع..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_3_title_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_3_title_en = $event,
								label: "Title (English) *",
								placeholder: "Fast Refund",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_3_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_3_desc_en = $event,
								label: "Description (English)",
								placeholder: "Fast refund to your original payment method...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-purple-700"${_scopeId}>البطاقة الرابعة #4</span><input${ssrRenderAttr("value", unref(form).highlight_4_icon)} placeholder="fa-solid fa-headset" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_4_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_4_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "دعم فني متاح"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_4_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).highlight_4_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "فريق خدمة العملاء جاهز لمساعدتك..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_4_title_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_4_title_en = $event,
								label: "Title (English) *",
								placeholder: "Dedicated Support",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).highlight_4_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).highlight_4_desc_en = $event,
								label: "Description (English)",
								placeholder: "Customer service team ready to assist...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" }, [
							createVNode("div", { class: "p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-amber-700" }, "البطاقة الأولى #1"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).highlight_1_icon = $event,
									placeholder: "fa-solid fa-clock-rotate-left",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).highlight_1_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_1_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_1_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "مهلة استرجاع 14 يوماً"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_1_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_1_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "يمكنك استرجاع أو استبدال المنتج..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_1_title_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_1_title_en = $event,
									label: "Title (English) *",
									placeholder: "14-Day Return Window",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_1_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_1_desc_en = $event,
									label: "Description (English)",
									placeholder: "Return or exchange items within 14 days...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-indigo-700" }, "البطاقة الثانية #2"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).highlight_2_icon = $event,
									placeholder: "fa-solid fa-box-open",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).highlight_2_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_2_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_2_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "تغليف المصنع الأصلي"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_2_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_2_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "أن يكون المنتج بحالته الأصلية غير مستخدم..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_2_title_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_2_title_en = $event,
									label: "Title (English) *",
									placeholder: "Original Packaging",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_2_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_2_desc_en = $event,
									label: "Description (English)",
									placeholder: "Items must be in original condition...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-emerald-700" }, "البطاقة الثالثة #3"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).highlight_3_icon = $event,
									placeholder: "fa-solid fa-money-bill-transfer",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).highlight_3_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_3_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_3_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "استرداد مالي سريع"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_3_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_3_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "تحويل فوري إلى نفس وسيلة الدفع..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_3_title_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_3_title_en = $event,
									label: "Title (English) *",
									placeholder: "Fast Refund",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_3_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_3_desc_en = $event,
									label: "Description (English)",
									placeholder: "Fast refund to your original payment method...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-purple-700" }, "البطاقة الرابعة #4"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).highlight_4_icon = $event,
									placeholder: "fa-solid fa-headset",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).highlight_4_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_4_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_4_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "دعم فني متاح"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_4_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).highlight_4_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "فريق خدمة العملاء جاهز لمساعدتك..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_4_title_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_4_title_en = $event,
									label: "Title (English) *",
									placeholder: "Dedicated Support",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).highlight_4_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).highlight_4_desc_en = $event,
									label: "Description (English)",
									placeholder: "Customer service team ready to assist...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "خطوات الإرجاع الأربعة (Step-by-Step Guide)",
					subtitle: "تخصيص خطوات الإرجاع المعروضة في أسفل الصفحة لشرح الآلية للعملاء بالتفصيل.",
					icon: "fa-solid fa-list-ol",
					"icon-color": "text-blue-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="mb-4"${_scopeId}><div style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).steps_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).steps_title_ar = $event,
								label: "عنوان قسم الخطوات (عربي)",
								placeholder: "كيف تتم عملية الاسترجاع أو الاستبدال؟"
							}, null, _parent, _scopeId));
							_push(`</div><div dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).steps_title_en,
								"onUpdate:modelValue": ($event) => unref(form).steps_title_en = $event,
								label: "Steps Section Title (English)",
								placeholder: "How does the return or exchange process work?",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"${_scopeId}><span class="text-xs font-black text-slate-700"${_scopeId}>الخطوة رقم 1</span><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_1_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_1_title_ar = $event,
								label: "عنوان الخطوة (عربي)",
								placeholder: "1. تقديم الطلب"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_1_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_1_desc_ar = $event,
								label: "شرح الخطوة (عربي)",
								placeholder: "تواصل معنا عبر الواتساب أو البريد..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_1_title_en,
								"onUpdate:modelValue": ($event) => unref(form).step_1_title_en = $event,
								label: "Step Title (English)",
								placeholder: "1. Submit Request",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_1_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).step_1_desc_en = $event,
								label: "Step Description (English)",
								placeholder: "Reach out via WhatsApp or email...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"${_scopeId}><span class="text-xs font-black text-slate-700"${_scopeId}>الخطوة رقم 2</span><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_2_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_2_title_ar = $event,
								label: "عنوان الخطوة (عربي)",
								placeholder: "2. مراجعة والموافقة"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_2_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_2_desc_ar = $event,
								label: "شرح الخطوة (عربي)",
								placeholder: "يتم التحقق من طلبك وإصدار بوليصة الشحن..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_2_title_en,
								"onUpdate:modelValue": ($event) => unref(form).step_2_title_en = $event,
								label: "Step Title (English)",
								placeholder: "2. Review & Approval",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_2_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).step_2_desc_en = $event,
								label: "Step Description (English)",
								placeholder: "We verify your request and issue return label...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"${_scopeId}><span class="text-xs font-black text-slate-700"${_scopeId}>الخطوة رقم 3</span><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_3_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_3_title_ar = $event,
								label: "عنوان الخطوة (عربي)",
								placeholder: "3. استلام وفحص المنتج"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_3_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_3_desc_ar = $event,
								label: "شرح الخطوة (عربي)",
								placeholder: "يستلم المندوب الشحنة وتفحص في مستودعاتنا..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_3_title_en,
								"onUpdate:modelValue": ($event) => unref(form).step_3_title_en = $event,
								label: "Step Title (English)",
								placeholder: "3. Product Inspection",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_3_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).step_3_desc_en = $event,
								label: "Step Description (English)",
								placeholder: "Items received and inspected at warehouse...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"${_scopeId}><span class="text-xs font-black text-slate-700"${_scopeId}>الخطوة رقم 4</span><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_4_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_4_title_ar = $event,
								label: "عنوان الخطوة (عربي)",
								placeholder: "4. الاسترداد أو الاستبدال"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_4_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).step_4_desc_ar = $event,
								label: "شرح الخطوة (عربي)",
								placeholder: "إعادة المبلغ لحسابك أو شحن البديل فورا..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_4_title_en,
								"onUpdate:modelValue": ($event) => unref(form).step_4_title_en = $event,
								label: "Step Title (English)",
								placeholder: "4. Refund or Exchange",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).step_4_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).step_4_desc_en = $event,
								label: "Step Description (English)",
								placeholder: "Refund processed or replacement shipped...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else return [createVNode("div", { class: "mb-4" }, [withDirectives(createVNode("div", null, [createVNode(BaseInput_default, {
							modelValue: unref(form).steps_title_ar,
							"onUpdate:modelValue": ($event) => unref(form).steps_title_ar = $event,
							label: "عنوان قسم الخطوات (عربي)",
							placeholder: "كيف تتم عملية الاسترجاع أو الاستبدال؟"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", { dir: "ltr" }, [createVNode(BaseInput_default, {
							modelValue: unref(form).steps_title_en,
							"onUpdate:modelValue": ($event) => unref(form).steps_title_en = $event,
							label: "Steps Section Title (English)",
							placeholder: "How does the return or exchange process work?",
							dir: "ltr"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])]), createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
							createVNode("div", { class: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2" }, [
								createVNode("span", { class: "text-xs font-black text-slate-700" }, "الخطوة رقم 1"),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_1_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_1_title_ar = $event,
									label: "عنوان الخطوة (عربي)",
									placeholder: "1. تقديم الطلب"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_1_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_1_desc_ar = $event,
									label: "شرح الخطوة (عربي)",
									placeholder: "تواصل معنا عبر الواتساب أو البريد..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_1_title_en,
									"onUpdate:modelValue": ($event) => unref(form).step_1_title_en = $event,
									label: "Step Title (English)",
									placeholder: "1. Submit Request",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_1_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).step_1_desc_en = $event,
									label: "Step Description (English)",
									placeholder: "Reach out via WhatsApp or email...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2" }, [
								createVNode("span", { class: "text-xs font-black text-slate-700" }, "الخطوة رقم 2"),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_2_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_2_title_ar = $event,
									label: "عنوان الخطوة (عربي)",
									placeholder: "2. مراجعة والموافقة"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_2_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_2_desc_ar = $event,
									label: "شرح الخطوة (عربي)",
									placeholder: "يتم التحقق من طلبك وإصدار بوليصة الشحن..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_2_title_en,
									"onUpdate:modelValue": ($event) => unref(form).step_2_title_en = $event,
									label: "Step Title (English)",
									placeholder: "2. Review & Approval",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_2_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).step_2_desc_en = $event,
									label: "Step Description (English)",
									placeholder: "We verify your request and issue return label...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2" }, [
								createVNode("span", { class: "text-xs font-black text-slate-700" }, "الخطوة رقم 3"),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_3_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_3_title_ar = $event,
									label: "عنوان الخطوة (عربي)",
									placeholder: "3. استلام وفحص المنتج"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_3_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_3_desc_ar = $event,
									label: "شرح الخطوة (عربي)",
									placeholder: "يستلم المندوب الشحنة وتفحص في مستودعاتنا..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_3_title_en,
									"onUpdate:modelValue": ($event) => unref(form).step_3_title_en = $event,
									label: "Step Title (English)",
									placeholder: "3. Product Inspection",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_3_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).step_3_desc_en = $event,
									label: "Step Description (English)",
									placeholder: "Items received and inspected at warehouse...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2" }, [
								createVNode("span", { class: "text-xs font-black text-slate-700" }, "الخطوة رقم 4"),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_4_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_4_title_ar = $event,
									label: "عنوان الخطوة (عربي)",
									placeholder: "4. الاسترداد أو الاستبدال"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_4_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).step_4_desc_ar = $event,
									label: "شرح الخطوة (عربي)",
									placeholder: "إعادة المبلغ لحسابك أو شحن البديل فورا..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).step_4_title_en,
									"onUpdate:modelValue": ($event) => unref(form).step_4_title_en = $event,
									label: "Step Title (English)",
									placeholder: "4. Refund or Exchange",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).step_4_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).step_4_desc_en = $event,
									label: "Step Description (English)",
									placeholder: "Refund processed or replacement shipped...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "صندوق المساعدة والتواصل السريع (Help & Contact Box)",
					subtitle: "تخصيص الصندوق المعروض أسفل الخطوات للتواصل مع خدمة العملاء.",
					icon: "fa-solid fa-headset",
					"icon-color": "text-emerald-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).help_box_title_ar = $event,
								label: "عنوان الصندوق (عربي)",
								placeholder: "هل تحتاج لمساعدة في استرجاع طلبك؟"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).help_box_desc_ar = $event,
								label: "الوصف التوضيحي (عربي)",
								placeholder: "فريق خدمة العملاء متواجد على مدار الساعة لمساعدتك..."
							}, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_btn_contact_ar,
								"onUpdate:modelValue": ($event) => unref(form).help_box_btn_contact_ar = $event,
								label: "نص زر التواصل (عربي)",
								placeholder: "تواصل مع الدعم الفني"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_btn_whatsapp_ar,
								"onUpdate:modelValue": ($event) => unref(form).help_box_btn_whatsapp_ar = $event,
								label: "نص زر الواتساب (عربي)",
								placeholder: "محادثة واتساب مباشرة"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_title_en,
								"onUpdate:modelValue": ($event) => unref(form).help_box_title_en = $event,
								label: "Box Title (English)",
								placeholder: "Need help with your return?",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).help_box_desc_en = $event,
								label: "Box Description (English)",
								placeholder: "Our customer support team is available 24/7...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_btn_contact_en,
								"onUpdate:modelValue": ($event) => unref(form).help_box_btn_contact_en = $event,
								label: "Contact Button Text (English)",
								placeholder: "Contact Support",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_btn_whatsapp_en,
								"onUpdate:modelValue": ($event) => unref(form).help_box_btn_whatsapp_en = $event,
								label: "WhatsApp Button Text (English)",
								placeholder: "Direct WhatsApp Chat",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_contact_url,
								"onUpdate:modelValue": ($event) => unref(form).help_box_contact_url = $event,
								label: "رابط صفحة التواصل",
								placeholder: "/contact-us",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).help_box_whatsapp_url,
								"onUpdate:modelValue": ($event) => unref(form).help_box_whatsapp_url = $event,
								label: "رابط / رقم الواتساب",
								placeholder: "https://wa.me/966500000000",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [
							withDirectives(createVNode("div", { class: "space-y-4" }, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).help_box_title_ar = $event,
									label: "عنوان الصندوق (عربي)",
									placeholder: "هل تحتاج لمساعدة في استرجاع طلبك؟"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).help_box_desc_ar = $event,
									label: "الوصف التوضيحي (عربي)",
									placeholder: "فريق خدمة العملاء متواجد على مدار الساعة لمساعدتك..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_btn_contact_ar,
									"onUpdate:modelValue": ($event) => unref(form).help_box_btn_contact_ar = $event,
									label: "نص زر التواصل (عربي)",
									placeholder: "تواصل مع الدعم الفني"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_btn_whatsapp_ar,
									"onUpdate:modelValue": ($event) => unref(form).help_box_btn_whatsapp_ar = $event,
									label: "نص زر الواتساب (عربي)",
									placeholder: "محادثة واتساب مباشرة"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])
							], 512), [[vShow, activeLangTab.value === "ar"]]),
							withDirectives(createVNode("div", {
								class: "space-y-4",
								dir: "ltr"
							}, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_title_en,
									"onUpdate:modelValue": ($event) => unref(form).help_box_title_en = $event,
									label: "Box Title (English)",
									placeholder: "Need help with your return?",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).help_box_desc_en = $event,
									label: "Box Description (English)",
									placeholder: "Our customer support team is available 24/7...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_btn_contact_en,
									"onUpdate:modelValue": ($event) => unref(form).help_box_btn_contact_en = $event,
									label: "Contact Button Text (English)",
									placeholder: "Contact Support",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).help_box_btn_whatsapp_en,
									"onUpdate:modelValue": ($event) => unref(form).help_box_btn_whatsapp_en = $event,
									label: "WhatsApp Button Text (English)",
									placeholder: "Direct WhatsApp Chat",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])
							], 512), [[vShow, activeLangTab.value === "en"]]),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100" }, [createVNode(BaseInput_default, {
								modelValue: unref(form).help_box_contact_url,
								"onUpdate:modelValue": ($event) => unref(form).help_box_contact_url = $event,
								label: "رابط صفحة التواصل",
								placeholder: "/contact-us",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
								modelValue: unref(form).help_box_whatsapp_url,
								"onUpdate:modelValue": ($event) => unref(form).help_box_whatsapp_url = $event,
								label: "رابط / رقم الواتساب",
								placeholder: "https://wa.me/966500000000",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])])
						];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminSeoFields_default, {
					"active-lang": activeLangTab.value,
					"meta-title-ar": unref(form).meta_title_ar,
					"onUpdate:metaTitleAr": ($event) => unref(form).meta_title_ar = $event,
					"meta-title-en": unref(form).meta_title_en,
					"onUpdate:metaTitleEn": ($event) => unref(form).meta_title_en = $event,
					"meta-description-ar": unref(form).meta_description_ar,
					"onUpdate:metaDescriptionAr": ($event) => unref(form).meta_description_ar = $event,
					"meta-description-en": unref(form).meta_description_en,
					"onUpdate:metaDescriptionEn": ($event) => unref(form).meta_description_en = $event
				}, null, _parent));
				_push(`</div>`);
			}
			_push(ssrRenderComponent(AdminSaveBar_default, {
				"is-saving": unref(isSubmitting),
				"is-active": unref(form).is_active,
				"preview-url": "/return-policy",
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminReturnPolicy)
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/return-policy/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/return-policy/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var return_policy_default = index_vue_vue_type_script_setup_true_lang_default;

export { return_policy_default as default };
//# sourceMappingURL=return-policy-xaWawUhn.mjs.map
