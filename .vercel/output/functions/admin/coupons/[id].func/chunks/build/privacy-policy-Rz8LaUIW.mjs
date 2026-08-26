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
import { u as usePrivacyPolicy } from './usePrivacyPolicy-GSsCFP9x.mjs';
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

//#region pages/admin/privacy-policy/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		const { form, isLoading, isSubmitting, submitAdminPrivacyPolicy } = usePrivacyPolicy();
		const activeLangTab = ref("ar");
		useHead$1({ title: "إدارة سياسة الخصوصية والشروط | لوحة تحكم أسوار جدة" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6 max-w-7xl mx-auto pb-24",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إدارة سياسة الخصوصية والشروط والأحكام",
				subtitle: "إدارة وتخصيص كافة بنود وسياسات الخصوصية والأمان وحقوق المستخدم باللغتين العربية والإنجليزية.",
				icon: "fa-solid fa-user-shield",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "سياسة الخصوصية والشروط" }],
				"show-lang-tabs": true,
				"lang-tab": activeLangTab.value,
				"onUpdate:langTab": ($event) => activeLangTab.value = $event,
				"show-save": true,
				"is-saving": unref(isSubmitting),
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminPrivacyPolicy)
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/privacy-policy",
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
						to: "/privacy-policy",
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
					title: "الحالة والعناوين التمهيدية",
					subtitle: "التحكم في ظهور صفحة الخصوصية للمستخدمين وصياغة العناوين المعروضة في أعلى الصفحة.",
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
								placeholder: "سياسة الخصوصية والشروط والأحكام",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseTextarea_default, {
								modelValue: unref(form).subtitle_ar,
								"onUpdate:modelValue": ($event) => unref(form).subtitle_ar = $event,
								label: "الوصف التمهيدي أسفل العنوان (بالعربي)",
								placeholder: "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى وفق الأنظمة المعتمدة في المملكة...",
								rows: 2
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).title_en,
								"onUpdate:modelValue": ($event) => unref(form).title_en = $event,
								label: "Main Title (English) *",
								placeholder: "Privacy Policy & Terms of Service",
								dir: "ltr",
								required: ""
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseTextarea_default, {
								modelValue: unref(form).subtitle_en,
								"onUpdate:modelValue": ($event) => unref(form).subtitle_en = $event,
								label: "Hero Subtitle (English)",
								placeholder: "Your privacy and data security are our highest priority...",
								dir: "ltr",
								rows: 2
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [withDirectives(createVNode("div", { class: "space-y-4" }, [createVNode(BaseInput_default, {
							modelValue: unref(form).title_ar,
							"onUpdate:modelValue": ($event) => unref(form).title_ar = $event,
							label: "العنوان الرئيسي للمحتوى (بالعربي) *",
							placeholder: "سياسة الخصوصية والشروط والأحكام",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseTextarea_default, {
							modelValue: unref(form).subtitle_ar,
							"onUpdate:modelValue": ($event) => unref(form).subtitle_ar = $event,
							label: "الوصف التمهيدي أسفل العنوان (بالعربي)",
							placeholder: "خصوصيتكم وأمان بياناتكم هي أولويتنا القصوى وفق الأنظمة المعتمدة في المملكة...",
							rows: 2
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", {
							class: "space-y-4",
							dir: "ltr"
						}, [createVNode(BaseInput_default, {
							modelValue: unref(form).title_en,
							"onUpdate:modelValue": ($event) => unref(form).title_en = $event,
							label: "Main Title (English) *",
							placeholder: "Privacy Policy & Terms of Service",
							dir: "ltr",
							required: ""
						}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseTextarea_default, {
							modelValue: unref(form).subtitle_en,
							"onUpdate:modelValue": ($event) => unref(form).subtitle_en = $event,
							label: "Hero Subtitle (English)",
							placeholder: "Your privacy and data security are our highest priority...",
							dir: "ltr",
							rows: 2
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "محتوى البنود والشروط والأحكام (HTML Rich Content)",
					subtitle: "كتابة وصياغة بنود الخصوصية والشروط مع الترويسات والقوائم المتسلسلة لسهولة القراءة.",
					icon: "fa-solid fa-file-shield",
					"icon-color": "text-indigo-600"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}><label class="block text-xs font-black text-slate-700 mb-1"${_scopeId}>بنود وفقرات الخصوصية والشروط (بالعربي):</label>`);
							_push(ssrRenderComponent(RichTextEditor_default, {
								modelValue: unref(form).content_ar,
								"onUpdate:modelValue": ($event) => unref(form).content_ar = $event,
								placeholder: "اكتب بنود الخصوصية والشروط هنا..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}><label class="block text-xs font-black text-slate-700 mb-1"${_scopeId}>Privacy Clauses &amp; Terms (English):</label>`);
							_push(ssrRenderComponent(RichTextEditor_default, {
								modelValue: unref(form).content_en,
								"onUpdate:modelValue": ($event) => unref(form).content_en = $event,
								placeholder: "Write privacy policy clauses and terms in English here..."
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode("label", { class: "block text-xs font-black text-slate-700 mb-1" }, "بنود وفقرات الخصوصية والشروط (بالعربي):"), createVNode(RichTextEditor_default, {
							modelValue: unref(form).content_ar,
							"onUpdate:modelValue": ($event) => unref(form).content_ar = $event,
							placeholder: "اكتب بنود الخصوصية والشروط هنا..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", {
							class: "space-y-2",
							dir: "ltr"
						}, [createVNode("label", { class: "block text-xs font-black text-slate-700 mb-1" }, "Privacy Clauses & Terms (English):"), createVNode(RichTextEditor_default, {
							modelValue: unref(form).content_en,
							"onUpdate:modelValue": ($event) => unref(form).content_en = $event,
							placeholder: "Write privacy policy clauses and terms in English here..."
						}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "البطاقات والمحددات الأربع العلوية (Trust & Security Badges)",
					subtitle: "تخصيص البطاقات العائمة الأربع المعروضة أسفل الهيدر الرئيسي مع الأيقونات والعناوين والوصف باللغتين.",
					icon: "fa-solid fa-shield-halved",
					"icon-color": "text-amber-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"${_scopeId}><div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-amber-700"${_scopeId}>البطاقة الأولى #1</span><input${ssrRenderAttr("value", unref(form).badge_1_icon)} placeholder="fa-solid fa-shield-halved" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_1_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_1_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "تشفير وحماية مشددة"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_1_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_1_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "حماية كاملة لكافة البيانات والمعاملات..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_1_title_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_1_title_en = $event,
								label: "Title (English) *",
								placeholder: "SSL/TLS Encryption",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_1_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_1_desc_en = $event,
								label: "Description (English)",
								placeholder: "256-bit encrypted data protocols...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-indigo-700"${_scopeId}>البطاقة الثانية #2</span><input${ssrRenderAttr("value", unref(form).badge_2_icon)} placeholder="fa-solid fa-user-lock" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_2_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_2_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "سرية تامة للبيانات"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_2_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_2_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "لا نشارك أو نبيع بياناتك لأي طرف..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_2_title_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_2_title_en = $event,
								label: "Title (English) *",
								placeholder: "Strict Confidentiality",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_2_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_2_desc_en = $event,
								label: "Description (English)",
								placeholder: "We never sell or trade your info...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-emerald-700"${_scopeId}>البطاقة الثالثة #3</span><input${ssrRenderAttr("value", unref(form).badge_3_icon)} placeholder="fa-solid fa-building-shield" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_3_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_3_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "نظام حماية البيانات"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_3_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_3_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "متوافق مع نظام حماية البيانات في المملكة..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_3_title_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_3_title_en = $event,
								label: "Title (English) *",
								placeholder: "Saudi PDPL Compliant",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_3_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_3_desc_en = $event,
								label: "Description (English)",
								placeholder: "Full alignment with KSA privacy laws...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-xs font-black text-purple-700"${_scopeId}>البطاقة الرابعة #4</span><input${ssrRenderAttr("value", unref(form).badge_4_icon)} placeholder="fa-solid fa-sliders" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon"${_scopeId}></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_4_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_4_title_ar = $event,
								label: "العنوان (عربي) *",
								placeholder: "تحكم كامل بالبيانات"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_4_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).badge_4_desc_ar = $event,
								label: "الوصف (عربي)",
								placeholder: "حق مراجعة وتحديث أو حذف بياناتك..."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_4_title_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_4_title_en = $event,
								label: "Title (English) *",
								placeholder: "Full User Rights",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).badge_4_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).badge_4_desc_en = $event,
								label: "Description (English)",
								placeholder: "Manage or delete your data anytime...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div></div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" }, [
							createVNode("div", { class: "p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-amber-700" }, "البطاقة الأولى #1"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).badge_1_icon = $event,
									placeholder: "fa-solid fa-shield-halved",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).badge_1_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_1_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_1_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "تشفير وحماية مشددة"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_1_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_1_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "حماية كاملة لكافة البيانات والمعاملات..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_1_title_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_1_title_en = $event,
									label: "Title (English) *",
									placeholder: "SSL/TLS Encryption",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_1_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_1_desc_en = $event,
									label: "Description (English)",
									placeholder: "256-bit encrypted data protocols...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-indigo-700" }, "البطاقة الثانية #2"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).badge_2_icon = $event,
									placeholder: "fa-solid fa-user-lock",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).badge_2_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_2_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_2_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "سرية تامة للبيانات"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_2_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_2_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "لا نشارك أو نبيع بياناتك لأي طرف..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_2_title_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_2_title_en = $event,
									label: "Title (English) *",
									placeholder: "Strict Confidentiality",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_2_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_2_desc_en = $event,
									label: "Description (English)",
									placeholder: "We never sell or trade your info...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-emerald-700" }, "البطاقة الثالثة #3"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).badge_3_icon = $event,
									placeholder: "fa-solid fa-building-shield",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).badge_3_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_3_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_3_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "نظام حماية البيانات"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_3_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_3_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "متوافق مع نظام حماية البيانات في المملكة..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_3_title_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_3_title_en = $event,
									label: "Title (English) *",
									placeholder: "Saudi PDPL Compliant",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_3_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_3_desc_en = $event,
									label: "Description (English)",
									placeholder: "Full alignment with KSA privacy laws...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							]),
							createVNode("div", { class: "p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3" }, [
								createVNode("div", { class: "flex items-center justify-between" }, [createVNode("span", { class: "text-xs font-black text-purple-700" }, "البطاقة الرابعة #4"), withDirectives(createVNode("input", {
									"onUpdate:modelValue": ($event) => unref(form).badge_4_icon = $event,
									placeholder: "fa-solid fa-sliders",
									class: "rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40",
									dir: "ltr",
									title: "FontAwesome Icon"
								}, null, 8, ["onUpdate:modelValue"]), [[vModelText, unref(form).badge_4_icon]])]),
								withDirectives(createVNode("div", { class: "space-y-2" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_4_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_4_title_ar = $event,
									label: "العنوان (عربي) *",
									placeholder: "تحكم كامل بالبيانات"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_4_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).badge_4_desc_ar = $event,
									label: "الوصف (عربي)",
									placeholder: "حق مراجعة وتحديث أو حذف بياناتك..."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
								withDirectives(createVNode("div", {
									class: "space-y-2",
									dir: "ltr"
								}, [createVNode(BaseInput_default, {
									modelValue: unref(form).badge_4_title_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_4_title_en = $event,
									label: "Title (English) *",
									placeholder: "Full User Rights",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).badge_4_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).badge_4_desc_en = $event,
									label: "Description (English)",
									placeholder: "Manage or delete your data anytime...",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]])
							])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "بطاقة الملخص السريع في الشريط الجانبي (Quick Summary Card)",
					subtitle: "تخصيص عنوان والنقاط الموجزة المعروضة في الشريط الجانبي لتسهيل قراءة أهم بنود الخصوصية على العميل.",
					icon: "fa-solid fa-circle-info",
					"icon-color": "text-indigo-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).summary_title_ar = $event,
								label: "عنوان بطاقة الملخص (عربي)",
								placeholder: "ملخص موجز لأهم البنود"
							}, null, _parent, _scopeId));
							_push(`</div><div dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_title_en,
								"onUpdate:modelValue": ($event) => unref(form).summary_title_en = $event,
								label: "Summary Card Title (English)",
								placeholder: "Summary in Brief",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-3 pt-2"${_scopeId}><div class="space-y-3" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_1_ar,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_1_ar = $event,
								label: "البند الموجز الأول (عربي)",
								placeholder: "نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة."
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_2_ar,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_2_ar = $event,
								label: "البند الموجز الثاني (عربي)",
								placeholder: "لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا."
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_3_ar,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_3_ar = $event,
								label: "البند الموجز الثالث (عربي)",
								placeholder: "يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم."
							}, null, _parent, _scopeId));
							_push(`</div><div class="space-y-3" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_1_en,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_1_en = $event,
								label: "Summary Point 1 (English)",
								placeholder: "We collect data strictly to process and deliver your orders.",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_2_en,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_2_en = $event,
								label: "Summary Point 2 (English)",
								placeholder: "Payment card information is never stored on our servers.",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).summary_point_3_en,
								"onUpdate:modelValue": ($event) => unref(form).summary_point_3_en = $event,
								label: "Summary Point 3 (English)",
								placeholder: "You have full right to edit or delete your account anytime.",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div>`);
						} else return [
							withDirectives(createVNode("div", null, [createVNode(BaseInput_default, {
								modelValue: unref(form).summary_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).summary_title_ar = $event,
								label: "عنوان بطاقة الملخص (عربي)",
								placeholder: "ملخص موجز لأهم البنود"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "ar"]]),
							withDirectives(createVNode("div", { dir: "ltr" }, [createVNode(BaseInput_default, {
								modelValue: unref(form).summary_title_en,
								"onUpdate:modelValue": ($event) => unref(form).summary_title_en = $event,
								label: "Summary Card Title (English)",
								placeholder: "Summary in Brief",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])], 512), [[vShow, activeLangTab.value === "en"]]),
							createVNode("div", { class: "space-y-3 pt-2" }, [withDirectives(createVNode("div", { class: "space-y-3" }, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_1_ar,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_1_ar = $event,
									label: "البند الموجز الأول (عربي)",
									placeholder: "نجمع البيانات فقط لمعالجة وتوصيل طلباتكم بدقة."
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_2_ar,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_2_ar = $event,
									label: "البند الموجز الثاني (عربي)",
									placeholder: "لا نخزن أي بيانات بطاقات ائتمانية أو أرقام سرية مطلقا."
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_3_ar,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_3_ar = $event,
									label: "البند الموجز الثالث (عربي)",
									placeholder: "يحق لكم في أي وقت تعديل بياناتكم أو حذف حسابكم."
								}, null, 8, ["modelValue", "onUpdate:modelValue"])
							], 512), [[vShow, activeLangTab.value === "ar"]]), withDirectives(createVNode("div", {
								class: "space-y-3",
								dir: "ltr"
							}, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_1_en,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_1_en = $event,
									label: "Summary Point 1 (English)",
									placeholder: "We collect data strictly to process and deliver your orders.",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_2_en,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_2_en = $event,
									label: "Summary Point 2 (English)",
									placeholder: "Payment card information is never stored on our servers.",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).summary_point_3_en,
									"onUpdate:modelValue": ($event) => unref(form).summary_point_3_en = $event,
									label: "Summary Point 3 (English)",
									placeholder: "You have full right to edit or delete your account anytime.",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])
							], 512), [[vShow, activeLangTab.value === "en"]])])
						];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "صندوق استفسارات الخصوصية والدعم (Privacy Inquiries CTA)",
					subtitle: "تخصيص الصندوق المعروض أسفل الملخص للتواصل المباشر مع فريق حماية الخصوصية.",
					icon: "fa-solid fa-envelope-shield",
					"icon-color": "text-emerald-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_title_ar,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_title_ar = $event,
								label: "عنوان الصندوق (عربي)",
								placeholder: "استفسارات حول الخصوصية؟"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_desc_ar,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_desc_ar = $event,
								label: "الوصف التوضيحي (عربي)",
								placeholder: "إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة."
							}, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_contact_btn_ar,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_btn_ar = $event,
								label: "نص زر التواصل (عربي)",
								placeholder: "تواصل مع فريق الخصوصية"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_whatsapp_btn_ar,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_btn_ar = $event,
								label: "نص زر الواتساب (عربي)",
								placeholder: "دعم عبر الواتساب"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_title_en,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_title_en = $event,
								label: "Box Title (English)",
								placeholder: "Privacy Inquiries?",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_desc_en,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_desc_en = $event,
								label: "Box Description (English)",
								placeholder: "For any questions regarding your personal data or privacy rights, please reach out to us.",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_contact_btn_en,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_btn_en = $event,
								label: "Contact Button Text (English)",
								placeholder: "Contact Privacy Team",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_whatsapp_btn_en,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_btn_en = $event,
								label: "WhatsApp Button Text (English)",
								placeholder: "WhatsApp Support",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_contact_url,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_url = $event,
								label: "رابط صفحة التواصل",
								placeholder: "/contact-us",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(form).inquiry_whatsapp_url,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_url = $event,
								label: "رابط / رقم الواتساب",
								placeholder: "https://wa.me/966500000000",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [
							withDirectives(createVNode("div", { class: "space-y-4" }, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_title_ar,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_title_ar = $event,
									label: "عنوان الصندوق (عربي)",
									placeholder: "استفسارات حول الخصوصية؟"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_desc_ar,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_desc_ar = $event,
									label: "الوصف التوضيحي (عربي)",
									placeholder: "إذا كان لديكم أي استفسار حول حماية بياناتكم أو رغبتكم في ممارسة حقوقكم، تواصلوا معنا مباشرة."
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_contact_btn_ar,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_btn_ar = $event,
									label: "نص زر التواصل (عربي)",
									placeholder: "تواصل مع فريق الخصوصية"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_whatsapp_btn_ar,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_btn_ar = $event,
									label: "نص زر الواتساب (عربي)",
									placeholder: "دعم عبر الواتساب"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])
							], 512), [[vShow, activeLangTab.value === "ar"]]),
							withDirectives(createVNode("div", {
								class: "space-y-4",
								dir: "ltr"
							}, [
								createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_title_en,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_title_en = $event,
									label: "Box Title (English)",
									placeholder: "Privacy Inquiries?",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_desc_en,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_desc_en = $event,
									label: "Box Description (English)",
									placeholder: "For any questions regarding your personal data or privacy rights, please reach out to us.",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]),
								createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_contact_btn_en,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_btn_en = $event,
									label: "Contact Button Text (English)",
									placeholder: "Contact Privacy Team",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
									modelValue: unref(form).inquiry_whatsapp_btn_en,
									"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_btn_en = $event,
									label: "WhatsApp Button Text (English)",
									placeholder: "WhatsApp Support",
									dir: "ltr"
								}, null, 8, ["modelValue", "onUpdate:modelValue"])])
							], 512), [[vShow, activeLangTab.value === "en"]]),
							createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100" }, [createVNode(BaseInput_default, {
								modelValue: unref(form).inquiry_contact_url,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_contact_url = $event,
								label: "رابط صفحة التواصل",
								placeholder: "/contact-us",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]), createVNode(BaseInput_default, {
								modelValue: unref(form).inquiry_whatsapp_url,
								"onUpdate:modelValue": ($event) => unref(form).inquiry_whatsapp_url = $event,
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
				"preview-url": "/privacy-policy",
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminPrivacyPolicy)
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/privacy-policy/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/privacy-policy/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var privacy_policy_default = index_vue_vue_type_script_setup_true_lang_default;

export { privacy_policy_default as default };
//# sourceMappingURL=privacy-policy-Rz8LaUIW.mjs.map
