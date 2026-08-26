import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useAboutUs } from './useAboutUs-CRQHzHzE.mjs';
import { A as AdminPageHeader_default } from './AdminPageHeader-RavS7Sn5.mjs';
import { A as AdminSkeletonForm_default, a as AdminSaveBar_default } from './AdminSaveBar-BcLKI7oo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { R as RichTextEditor_default } from './RichTextEditor-UVwplTEi.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
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
import './useLanguage-Dqkt54yZ.mjs';
import './AdminLangTabs-DVYAqM7r.mjs';

//#region pages/admin/about-us/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		const { form, isLoading, isSubmitting, bannerPreview, storyPreview, submitAdminAboutUs} = useAboutUs();
		const activeLangTab = ref("ar");
		useHead$1({ title: "إدارة صفحة \"من نحن\" | لوحة تحكم أسوار جدة" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6 max-w-7xl mx-auto pb-24",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إدارة صفحة من نحن (About Us Manager)",
				subtitle: "تعديل كافة نصوص الصفحة، القصة، الرؤية والرسالة، مميزات وقيم المتجر (Values)، الإحصائيات وبانر التسوق.",
				icon: "fa-solid fa-address-card",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "إدارة صفحة من نحن" }],
				"show-lang-tabs": true,
				"lang-tab": activeLangTab.value,
				"onUpdate:langTab": ($event) => activeLangTab.value = $event,
				"show-save": true,
				"is-saving": unref(isSubmitting),
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminAboutUs)
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/about-us",
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
						to: "/about-us",
						target: "_blank",
						class: "px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center gap-2 transition-all shadow-xs"
					}, {
						default: withCtx(() => [createVNode("i", { class: "fa-solid fa-arrow-up-right-from-square text-xs text-slate-400" }), createVNode("span", { class: "hidden sm:inline" }, "معاينة بالمتجر")]),
						_: 1
					})];
				}),
				_: 1
			}, _parent));
			if (unref(isLoading)) _push(ssrRenderComponent(AdminSkeletonForm_default, { cards: 3 }, null, _parent));
			else {
				_push(`<div class="space-y-6"><form class="space-y-6"><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-heading text-amber-500"></i> الهيدر والعنوان الرئيسي (Hero Header) </h3><div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).title_ar,
					"onUpdate:modelValue": ($event) => unref(form).title_ar = $event,
					label: "العنوان الرئيسي باللغة العربية *",
					placeholder: "مثال: عن أسوار جدة",
					required: ""
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).subtitle_ar,
					"onUpdate:modelValue": ($event) => unref(form).subtitle_ar = $event,
					label: "النبذة التعريفية المختصرة (Arabic Subtitle) *",
					placeholder: "مثال: وجهتكم الرائدة للأجهزة والحلول التقنية والمنزلية في المملكة",
					required: ""
				}, null, _parent));
				_push(`</div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).title_en,
					"onUpdate:modelValue": ($event) => unref(form).title_en = $event,
					label: "Main Title in English",
					placeholder: "e.g. About Aswar Jeddah",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).subtitle_en,
					"onUpdate:modelValue": ($event) => unref(form).subtitle_en = $event,
					label: "Short Subtitle in English",
					placeholder: "e.g. Your leading destination for smart tech and home solutions in KSA",
					dir: "ltr"
				}, null, _parent));
				_push(`</div><div class="space-y-2 pt-2 border-t border-slate-100"><label class="block text-xs font-bold text-slate-700">صورة غلاف الهيدر (Hero Banner Image)</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"><label class="border-2 border-dashed border-slate-300 hover:border-amber-400 bg-slate-50/70 hover:bg-amber-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"><i class="fa-solid fa-cloud-arrow-up text-2xl text-slate-400"></i><span class="text-xs font-bold text-slate-700">اضغط لرفع أو تغيير صورة الغلاف</span><span class="text-[10px] text-slate-400">PNG, JPG, WEBP حتى 5MB (الأبعاد المفضلة 1920x600)</span><input type="file" accept="image/*" class="hidden"></label><div class="h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center group">`);
				if (unref(bannerPreview) || unref(form).banner_image_full_url || unref(form).banner_image) _push(`<img${ssrRenderAttr("src", unref(bannerPreview) || unref(form).banner_image_full_url || unref(form).banner_image)} alt="Banner Preview" class="w-full h-full object-cover">`);
				else _push(`<div class="flex flex-col items-center justify-center text-slate-400 gap-1"><i class="fa-solid fa-image text-2xl"></i><span class="text-xs font-medium">لا توجد صورة غلاف مرفوعة</span></div>`);
				if (unref(bannerPreview) || unref(form).banner_image_full_url || unref(form).banner_image) _push(`<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"><a${ssrRenderAttr("href", unref(bannerPreview) || unref(form).banner_image_full_url || unref(form).banner_image)} target="_blank" class="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-bold text-slate-800 hover:bg-white flex items-center gap-1 shadow-sm"><i class="fa-solid fa-eye text-xs"></i><span>عرض بالحجم الكامل</span></a><button type="button" class="px-3 py-1.5 rounded-lg bg-rose-500 text-xs font-bold text-white hover:bg-rose-600 flex items-center gap-1 shadow-sm"><i class="fa-solid fa-trash text-xs"></i><span>إزالة</span></button></div>`);
				else _push(`<!---->`);
				_push(`</div></div></div></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-book-open text-indigo-500"></i> قصة المتجر والشغف (Our Story &amp; Rich Content) </h3><div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).story_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).story_title_ar = $event,
					label: "عنوان قسم القصة (بالعربي) *",
					placeholder: "مثال: قصة نجاحنا وشغفنا",
					required: ""
				}, null, _parent));
				_push(`<div><label class="block text-xs font-bold text-slate-700 mb-1.5">محتوى القصة المنسق (Arabic Rich Text) *</label>`);
				_push(ssrRenderComponent(RichTextEditor_default, {
					modelValue: unref(form).story_content_ar,
					"onUpdate:modelValue": ($event) => unref(form).story_content_ar = $event,
					label: "محتوى القصة",
					dir: "rtl",
					placeholder: "اكتب قصة وتاريخ متجر أسوار جدة..."
				}, null, _parent));
				_push(`</div></div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).story_title_en,
					"onUpdate:modelValue": ($event) => unref(form).story_title_en = $event,
					label: "Story Section Title (English)",
					placeholder: "e.g. Our Story & Passion",
					dir: "ltr"
				}, null, _parent));
				_push(`<div><label class="block text-xs font-bold text-slate-700 mb-1.5">Story Content (English Rich Text)</label>`);
				_push(ssrRenderComponent(RichTextEditor_default, {
					modelValue: unref(form).story_content_en,
					"onUpdate:modelValue": ($event) => unref(form).story_content_en = $event,
					label: "Story Content",
					dir: "ltr",
					placeholder: "Write the formatted story of Aswar Jeddah..."
				}, null, _parent));
				_push(`</div></div><div class="space-y-2 pt-2 border-t border-slate-100"><label class="block text-xs font-bold text-slate-700">صورة قسم القصة (Story Feature Image)</label><div class="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center"><label class="border-2 border-dashed border-slate-300 hover:border-indigo-400 bg-slate-50/70 hover:bg-indigo-50/30 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all"><i class="fa-solid fa-image text-2xl text-slate-400"></i><span class="text-xs font-bold text-slate-700">اضغط لرفع أو تغيير صورة القصة</span><span class="text-[10px] text-slate-400">PNG, JPG, WEBP (يفضل مربعة أو 800x800)</span><input type="file" accept="image/*" class="hidden"></label><div class="h-36 rounded-2xl bg-slate-100 border border-slate-200 overflow-hidden relative flex items-center justify-center group">`);
				if (unref(storyPreview) || unref(form).story_image_full_url || unref(form).story_image) _push(`<img${ssrRenderAttr("src", unref(storyPreview) || unref(form).story_image_full_url || unref(form).story_image)} alt="Story Preview" class="w-full h-full object-cover">`);
				else _push(`<div class="flex flex-col items-center justify-center text-slate-400 gap-1"><i class="fa-solid fa-image text-2xl"></i><span class="text-xs font-medium">لا توجد صورة قصة مرفوعة</span></div>`);
				if (unref(storyPreview) || unref(form).story_image_full_url || unref(form).story_image) _push(`<div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2"><a${ssrRenderAttr("href", unref(storyPreview) || unref(form).story_image_full_url || unref(form).story_image)} target="_blank" class="px-3 py-1.5 rounded-lg bg-white/90 text-xs font-bold text-slate-800 hover:bg-white flex items-center gap-1 shadow-sm"><i class="fa-solid fa-eye text-xs"></i><span>عرض بالحجم الكامل</span></a><button type="button" class="px-3 py-1.5 rounded-lg bg-rose-500 text-xs font-bold text-white hover:bg-rose-600 flex items-center gap-1 shadow-sm"><i class="fa-solid fa-trash text-xs"></i><span>إزالة</span></button></div>`);
				else _push(`<!---->`);
				_push(`</div></div></div></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-compass text-purple-500"></i> الرؤية والرسالة (Vision &amp; Mission) </h3><div class="grid grid-cols-1 md:grid-cols-2 gap-6" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}"><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"><h4 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="fa-solid fa-eye text-amber-500"></i> الرؤية (Vision) </h4>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).vision_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).vision_title_ar = $event,
					label: "عنوان الرؤية",
					placeholder: "مثال: رؤيتنا"
				}, null, _parent));
				_push(`<div class="space-y-1"><label class="block text-xs font-bold text-slate-700">نص الرؤية</label><textarea rows="3" class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="اكتب نص رؤية المتجر...">${ssrInterpolate(unref(form).vision_content_ar)}</textarea></div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"><h4 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="fa-solid fa-bullseye text-indigo-500"></i> الرسالة (Mission) </h4>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).mission_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).mission_title_ar = $event,
					label: "عنوان الرسالة",
					placeholder: "مثال: رسالتنا"
				}, null, _parent));
				_push(`<div class="space-y-1"><label class="block text-xs font-bold text-slate-700">نص الرسالة</label><textarea rows="3" class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="اكتب نص رسالة المتجر...">${ssrInterpolate(unref(form).mission_content_ar)}</textarea></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 gap-6" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}"><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"><h4 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="fa-solid fa-eye text-amber-500"></i> Vision (English) </h4>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).vision_title_en,
					"onUpdate:modelValue": ($event) => unref(form).vision_title_en = $event,
					label: "Vision Title",
					placeholder: "e.g. Our Vision",
					dir: "ltr"
				}, null, _parent));
				_push(`<div class="space-y-1"><label class="block text-xs font-bold text-slate-700">Vision Statement</label><textarea rows="3" class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500" placeholder="Write your vision statement..." dir="ltr">${ssrInterpolate(unref(form).vision_content_en)}</textarea></div></div><div class="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"><h4 class="text-sm font-black text-slate-800 flex items-center gap-2"><i class="fa-solid fa-bullseye text-indigo-500"></i> Mission (English) </h4>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).mission_title_en,
					"onUpdate:modelValue": ($event) => unref(form).mission_title_en = $event,
					label: "Mission Title",
					placeholder: "e.g. Our Mission",
					dir: "ltr"
				}, null, _parent));
				_push(`<div class="space-y-1"><label class="block text-xs font-bold text-slate-700">Mission Statement</label><textarea rows="3" class="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Write your mission statement..." dir="ltr">${ssrInterpolate(unref(form).mission_content_en)}</textarea></div></div></div></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><div class="border-b border-slate-100 pb-3"><h3 class="text-base font-black text-slate-900 flex items-center gap-2"><i class="fa-solid fa-chart-simple text-emerald-500"></i> أرقام وإحصائيات المتجر (Elevated Stats Counters) </h3><p class="text-xs text-slate-500 mt-1">تخصيص الأرقام، العناوين باللغتين، والأيقونات للبطاقات الإحصائية الأربع المعروضة أسفل الهيدر.</p></div><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><div class="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-amber-700">الإحصائية الأولى #1</span><i class="fa-solid fa-users text-amber-500"></i></div>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_customers,
					"onUpdate:modelValue": ($event) => unref(form).stats_customers = $event,
					label: "الرقم / القيمة *",
					placeholder: "25,000+",
					dir: "ltr"
				}, null, _parent));
				if (activeLangTab.value === "ar") _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_customers_label_ar,
					"onUpdate:modelValue": ($event) => unref(form).stats_customers_label_ar = $event,
					label: "العنوان (عربي)",
					placeholder: "عميل سعيد وموثوق"
				}, null, _parent));
				else _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_customers_label_en,
					"onUpdate:modelValue": ($event) => unref(form).stats_customers_label_en = $event,
					label: "Label (English)",
					placeholder: "Satisfied Customers",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_customers_icon,
					"onUpdate:modelValue": ($event) => unref(form).stats_customers_icon = $event,
					label: "كود الأيقونة",
					placeholder: "fa-solid fa-users",
					dir: "ltr"
				}, null, _parent));
				_push(`</div><div class="p-4 rounded-2xl bg-indigo-50/40 border border-indigo-200/60 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-indigo-700">الإحصائية الثانية #2</span><i class="fa-solid fa-boxes-stacked text-indigo-500"></i></div>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_products,
					"onUpdate:modelValue": ($event) => unref(form).stats_products = $event,
					label: "الرقم / القيمة *",
					placeholder: "1,500+",
					dir: "ltr"
				}, null, _parent));
				if (activeLangTab.value === "ar") _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_products_label_ar,
					"onUpdate:modelValue": ($event) => unref(form).stats_products_label_ar = $event,
					label: "العنوان (عربي)",
					placeholder: "منتج أصلي معتمد"
				}, null, _parent));
				else _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_products_label_en,
					"onUpdate:modelValue": ($event) => unref(form).stats_products_label_en = $event,
					label: "Label (English)",
					placeholder: "Certified Products",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_products_icon,
					"onUpdate:modelValue": ($event) => unref(form).stats_products_icon = $event,
					label: "كود الأيقونة",
					placeholder: "fa-solid fa-boxes-stacked",
					dir: "ltr"
				}, null, _parent));
				_push(`</div><div class="p-4 rounded-2xl bg-purple-50/40 border border-purple-200/60 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-purple-700">الإحصائية الثالثة #3</span><i class="fa-solid fa-award text-purple-500"></i></div>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_experience,
					"onUpdate:modelValue": ($event) => unref(form).stats_experience = $event,
					label: "الرقم / القيمة *",
					placeholder: "10+",
					dir: "ltr"
				}, null, _parent));
				if (activeLangTab.value === "ar") _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_experience_label_ar,
					"onUpdate:modelValue": ($event) => unref(form).stats_experience_label_ar = $event,
					label: "العنوان (عربي)",
					placeholder: "سنوات من الخبرة"
				}, null, _parent));
				else _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_experience_label_en,
					"onUpdate:modelValue": ($event) => unref(form).stats_experience_label_en = $event,
					label: "Label (English)",
					placeholder: "Years of Experience",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_experience_icon,
					"onUpdate:modelValue": ($event) => unref(form).stats_experience_icon = $event,
					label: "كود الأيقونة",
					placeholder: "fa-solid fa-award",
					dir: "ltr"
				}, null, _parent));
				_push(`</div><div class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-200/60 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-emerald-700">الإحصائية الرابعة #4</span><i class="fa-solid fa-shield text-emerald-500"></i></div>`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_awards,
					"onUpdate:modelValue": ($event) => unref(form).stats_awards = $event,
					label: "الرقم / القيمة *",
					placeholder: "100%",
					dir: "ltr"
				}, null, _parent));
				if (activeLangTab.value === "ar") _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_awards_label_ar,
					"onUpdate:modelValue": ($event) => unref(form).stats_awards_label_ar = $event,
					label: "العنوان (عربي)",
					placeholder: "ضمان وجودة معتمدة"
				}, null, _parent));
				else _push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_awards_label_en,
					"onUpdate:modelValue": ($event) => unref(form).stats_awards_label_en = $event,
					label: "Label (English)",
					placeholder: "Warranty & Quality",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).stats_awards_icon,
					"onUpdate:modelValue": ($event) => unref(form).stats_awards_icon = $event,
					label: "كود الأيقونة",
					placeholder: "fa-solid fa-shield",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-star text-amber-500"></i> التزامات وقيم المتجر (Store Commitments &amp; Values) </h3><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).features_badge_ar,
					"onUpdate:modelValue": ($event) => unref(form).features_badge_ar = $event,
					label: "شارة القسم (بالعربي)",
					placeholder: "مثال: التزاماتنا لعملائنا"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).features_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).features_title_ar = $event,
					label: "عنوان القسم الرئيسي (بالعربي)",
					placeholder: "مثال: لماذا يفضل العملاء التسوق معنا؟"
				}, null, _parent));
				_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).features_badge_en,
					"onUpdate:modelValue": ($event) => unref(form).features_badge_en = $event,
					label: "Section Badge (English)",
					placeholder: "e.g. Store Commitments",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).features_title_en,
					"onUpdate:modelValue": ($event) => unref(form).features_title_en = $event,
					label: "Section Title (English)",
					placeholder: "e.g. Why Shop With Aswar Jeddah?",
					dir: "ltr"
				}, null, _parent));
				_push(`</div><div class="space-y-4 pt-2"><h4 class="text-xs font-black text-slate-700">البطاقات الأربع للمميزات والقيم (Values):</h4><div class="grid grid-cols-1 md:grid-cols-2 gap-4"><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-amber-600">الميزة الأولى #1</span><input type="text"${ssrRenderAttr("value", unref(form).feature_1_icon)} placeholder="fa-solid fa-shield" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon Class"></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_1_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_1_title_ar = $event,
					label: "العنوان (بالعربي)",
					placeholder: "مثال: منتجات أصلية 100%"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_1_desc_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_1_desc_ar = $event,
					label: "الوصف المختصر (بالعربي)",
					placeholder: "مثال: نوفر كافة الأجهزة مباشرة من الوكلاء..."
				}, null, _parent));
				_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_1_title_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_1_title_en = $event,
					label: "Title (English)",
					placeholder: "e.g. 100% Genuine Products",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_1_desc_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_1_desc_en = $event,
					label: "Description (English)",
					placeholder: "e.g. Direct from certified brands...",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-amber-600">الميزة الثانية #2</span><input type="text"${ssrRenderAttr("value", unref(form).feature_2_icon)} placeholder="fa-solid fa-truck-fast" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon Class"></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_2_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_2_title_ar = $event,
					label: "العنوان (بالعربي)",
					placeholder: "مثال: شحن سريع وآمن"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_2_desc_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_2_desc_ar = $event,
					label: "الوصف المختصر (بالعربي)",
					placeholder: "مثال: توصيل موثوق ومحمي لكافة مدن ومناطق المملكة"
				}, null, _parent));
				_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_2_title_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_2_title_en = $event,
					label: "Title (English)",
					placeholder: "e.g. Fast Kingdom Shipping",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_2_desc_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_2_desc_en = $event,
					label: "Description (English)",
					placeholder: "e.g. Reliable door-to-door delivery...",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-amber-600">الميزة الثالثة #3</span><input type="text"${ssrRenderAttr("value", unref(form).feature_3_icon)} placeholder="fa-solid fa-credit-card" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon Class"></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_3_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_3_title_ar = $event,
					label: "العنوان (بالعربي)",
					placeholder: "مثال: طرق دفع متعددة وآمنة"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_3_desc_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_3_desc_ar = $event,
					label: "الوصف المختصر (بالعربي)",
					placeholder: "مثال: مدى، فيزا، ماستركارد، آبل باي وخيارات التقسيط"
				}, null, _parent));
				_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_3_title_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_3_title_en = $event,
					label: "Title (English)",
					placeholder: "e.g. Secure Payment Options",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_3_desc_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_3_desc_en = $event,
					label: "Description (English)",
					placeholder: "e.g. Support for Mada, Apple Pay, Visa...",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div><div class="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"><div class="flex items-center justify-between"><span class="text-xs font-black text-amber-600">الميزة الرابعة #4</span><input type="text"${ssrRenderAttr("value", unref(form).feature_4_icon)} placeholder="fa-solid fa-headset" class="rounded-lg border border-slate-200 bg-white px-2 py-1 text-[11px] font-mono w-40" dir="ltr" title="FontAwesome Icon Class"></div><div class="space-y-2" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_4_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_4_title_ar = $event,
					label: "العنوان (بالعربي)",
					placeholder: "مثال: خدمة عملاء متخصصة"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_4_desc_ar,
					"onUpdate:modelValue": ($event) => unref(form).feature_4_desc_ar = $event,
					label: "الوصف المختصر (بالعربي)",
					placeholder: "مثال: فريق متكامل للإجابة على استفساراتكم..."
				}, null, _parent));
				_push(`</div><div class="space-y-2" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_4_title_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_4_title_en = $event,
					label: "Title (English)",
					placeholder: "e.g. Dedicated Support",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).feature_4_desc_en,
					"onUpdate:modelValue": ($event) => unref(form).feature_4_desc_en = $event,
					label: "Description (English)",
					placeholder: "e.g. Our technical support team is ready to assist...",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div></div></div></div><div class="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6"><h3 class="text-base font-black text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3"><i class="fa-solid fa-bag-shopping text-emerald-500"></i> بانر الدعوة للتسوق أسفل الصفحة (CTA Banner) </h3><div class="space-y-4" style="${ssrRenderStyle(activeLangTab.value === "ar" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_title_ar,
					"onUpdate:modelValue": ($event) => unref(form).cta_title_ar = $event,
					label: "عنوان البانر (بالعربي)",
					placeholder: "مثال: اكتشف آلاف الأجهزة والحلول التقنية المعتمدة"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_desc_ar,
					"onUpdate:modelValue": ($event) => unref(form).cta_desc_ar = $event,
					label: "وصف البانر (بالعربي)",
					placeholder: "مثال: تسوق بأعلى مستويات الأمان والضمان المعتمد في كافة أنحاء المملكة."
				}, null, _parent));
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_btn_ar,
					"onUpdate:modelValue": ($event) => unref(form).cta_btn_ar = $event,
					label: "نص زر التسوق (بالعربي)",
					placeholder: "مثال: تسوق المنتجات الآن"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_url,
					"onUpdate:modelValue": ($event) => unref(form).cta_url = $event,
					label: "الرابط المستهدف (URL)",
					placeholder: "/shop",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div><div class="space-y-4" dir="ltr" style="${ssrRenderStyle(activeLangTab.value === "en" ? null : { display: "none" })}">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_title_en,
					"onUpdate:modelValue": ($event) => unref(form).cta_title_en = $event,
					label: "Banner Title (English)",
					placeholder: "e.g. Discover Thousands of Verified Products",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_desc_en,
					"onUpdate:modelValue": ($event) => unref(form).cta_desc_en = $event,
					label: "Banner Description (English)",
					placeholder: "e.g. Shop with complete peace of mind with our official warranties.",
					dir: "ltr"
				}, null, _parent));
				_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">`);
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_btn_en,
					"onUpdate:modelValue": ($event) => unref(form).cta_btn_en = $event,
					label: "Button Text (English)",
					placeholder: "e.g. Browse All Products",
					dir: "ltr"
				}, null, _parent));
				_push(ssrRenderComponent(BaseInput_default, {
					modelValue: unref(form).cta_url,
					"onUpdate:modelValue": ($event) => unref(form).cta_url = $event,
					label: "Target Link (URL)",
					placeholder: "/shop",
					dir: "ltr"
				}, null, _parent));
				_push(`</div></div></div></form></div>`);
			}
			_push(ssrRenderComponent(AdminSaveBar_default, {
				"is-saving": unref(isSubmitting),
				"show-status": false,
				"preview-url": "/about-us",
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(submitAdminAboutUs)
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/about-us/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/about-us/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var about_us_default = index_vue_vue_type_script_setup_true_lang_default;

export { about_us_default as default };
//# sourceMappingURL=about-us-BtemaPLX.mjs.map
