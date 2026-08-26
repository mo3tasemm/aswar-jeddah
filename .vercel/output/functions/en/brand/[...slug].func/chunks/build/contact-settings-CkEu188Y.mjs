import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { A as AdminPageHeader_default } from './AdminPageHeader-RavS7Sn5.mjs';
import { A as AdminSkeletonForm_default, a as AdminSaveBar_default } from './AdminSaveBar-BcLKI7oo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useContact } from './useContact-BEn_tp9Z.mjs';
import { A as AdminCard_default } from './AdminCard-BCY_YRzZ.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
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

//#region pages/admin/contact-settings/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir } = useAdminLanguage();
		const { adminSettingsForm, isLoading, isSubmitting, saveAdminContactSettings } = useContact();
		useHead$1({ title: "إعدادات التواصل | لوحة تحكم أسوار جدة" });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6 max-w-7xl mx-auto pb-24",
				dir: unref(adminDir)
			}, _attrs))}>`);
			_push(ssrRenderComponent(AdminPageHeader_default, {
				title: "إعدادات التواصل ومعلومات المتجر",
				subtitle: "تعديل أرقام الهواتف، الواتساب، البريد الإلكتروني، ساعات العمل، العنوان، وروابط التواصل الاجتماعي.",
				icon: "fa-solid fa-sliders",
				breadcrumbs: [{
					label: "لوحة التحكم",
					to: "/admin"
				}, { label: "إعدادات التواصل" }],
				"show-save": true,
				"is-saving": unref(isSubmitting),
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(saveAdminContactSettings)
			}, {
				actions: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(ssrRenderComponent(_component_NuxtLink, {
						to: "/contact-us",
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
						to: "/contact-us",
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
				_push(`<form class="space-y-6">`);
				_push(ssrRenderComponent(AdminCard_default, {
					title: "أرقام الاتصال وقنوات المراسلة المباشرة",
					subtitle: "الأرقام والوسائل المستخدمة في الـ Header والـ Footer وصفحة اتصل بنا.",
					icon: "fa-solid fa-phone",
					"icon-color": "text-amber-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).phone,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).phone = $event,
								label: "رقم الهاتف الرئيسي (Phone)",
								placeholder: "966500000000",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).phone_secondary,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).phone_secondary = $event,
								label: "رقم هاتف إضافي (Secondary Phone)",
								placeholder: "966500000001",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).whatsapp,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).whatsapp = $event,
								label: "رقم الواتساب الرسمي (WhatsApp)",
								placeholder: "966500000000",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).email,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).email = $event,
								label: "البريد الإلكتروني الرسمي (Email)",
								placeholder: "support@aswar-jeddah.com",
								type: "email",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).phone,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).phone = $event,
								label: "رقم الهاتف الرئيسي (Phone)",
								placeholder: "966500000000",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).phone_secondary,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).phone_secondary = $event,
								label: "رقم هاتف إضافي (Secondary Phone)",
								placeholder: "966500000001",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).whatsapp,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).whatsapp = $event,
								label: "رقم الواتساب الرسمي (WhatsApp)",
								placeholder: "966500000000",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).email,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).email = $event,
								label: "البريد الإلكتروني الرسمي (Email)",
								placeholder: "support@aswar-jeddah.com",
								type: "email",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "العنوان الجغرافي وأوقات العمل الرسمية",
					subtitle: "تفاصيل الموقع وساعات العمل الموضحة للعملاء.",
					icon: "fa-solid fa-location-dot",
					"icon-color": "text-indigo-600"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-6"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).address_ar,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).address_ar = $event,
								label: "العنوان باللغة العربية",
								placeholder: "جدة، المملكة العربية السعودية - شارع فلسطين"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).address_en,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).address_en = $event,
								label: "Address in English",
								placeholder: "Palestine St, Jeddah, Saudi Arabia",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).working_hours_ar,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).working_hours_ar = $event,
								label: "أوقات العمل باللغة العربية",
								placeholder: "السبت - الخميس: 9:00 ص - 10:00 م"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).working_hours_en,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).working_hours_en = $event,
								label: "Working Hours in English",
								placeholder: "Sat - Thu: 9:00 AM - 10:00 PM",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-6" }, [
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).address_ar,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).address_ar = $event,
								label: "العنوان باللغة العربية",
								placeholder: "جدة، المملكة العربية السعودية - شارع فلسطين"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).address_en,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).address_en = $event,
								label: "Address in English",
								placeholder: "Palestine St, Jeddah, Saudi Arabia",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).working_hours_ar,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).working_hours_ar = $event,
								label: "أوقات العمل باللغة العربية",
								placeholder: "السبت - الخميس: 9:00 ص - 10:00 م"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).working_hours_en,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).working_hours_en = $event,
								label: "Working Hours in English",
								placeholder: "Sat - Thu: 9:00 AM - 10:00 PM",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "روابط منصات التواصل الاجتماعي (Social Media)",
					subtitle: "الروابط المباشرة لحسابات المتجر على منصات التواصل.",
					icon: "fa-solid fa-share-nodes",
					"icon-color": "text-blue-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).instagram,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).instagram = $event,
								label: "إنستغرام (Instagram URL)",
								placeholder: "https://instagram.com/aswar",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).snapchat,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).snapchat = $event,
								label: "سناب شات (Snapchat URL)",
								placeholder: "https://snapchat.com/add/aswar",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).tiktok,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).tiktok = $event,
								label: "تيك توك (TikTok URL)",
								placeholder: "https://tiktok.com/@aswar",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).x_twitter,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).x_twitter = $event,
								label: "إكس / تويتر (X / Twitter URL)",
								placeholder: "https://x.com/aswar",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).facebook,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).facebook = $event,
								label: "فيسبوك (Facebook URL)",
								placeholder: "https://facebook.com/aswar",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).maroof,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).maroof = $event,
								label: "منصة معروف / توثيق المتجر (Maroof)",
								placeholder: "https://maroof.sa/...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" }, [
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).instagram,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).instagram = $event,
								label: "إنستغرام (Instagram URL)",
								placeholder: "https://instagram.com/aswar",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).snapchat,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).snapchat = $event,
								label: "سناب شات (Snapchat URL)",
								placeholder: "https://snapchat.com/add/aswar",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).tiktok,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).tiktok = $event,
								label: "تيك توك (TikTok URL)",
								placeholder: "https://tiktok.com/@aswar",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).x_twitter,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).x_twitter = $event,
								label: "إكس / تويتر (X / Twitter URL)",
								placeholder: "https://x.com/aswar",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).facebook,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).facebook = $event,
								label: "فيسبوك (Facebook URL)",
								placeholder: "https://facebook.com/aswar",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"]),
							createVNode(BaseInput_default, {
								modelValue: unref(adminSettingsForm).maroof,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).maroof = $event,
								label: "منصة معروف / توثيق المتجر (Maroof)",
								placeholder: "https://maroof.sa/...",
								dir: "ltr"
							}, null, 8, ["modelValue", "onUpdate:modelValue"])
						])];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(AdminCard_default, {
					title: "خريطة موقع المعرض (Google Maps Embed)",
					subtitle: "تضمين خريطة موقع المعرض للظهور في صفحة اتصل بنا.",
					icon: "fa-solid fa-map-location-dot",
					"icon-color": "text-teal-500"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) {
							_push(`<div class="grid grid-cols-1 gap-6"${_scopeId}>`);
							_push(ssrRenderComponent(BaseInput_default, {
								modelValue: unref(adminSettingsForm).map_iframe,
								"onUpdate:modelValue": ($event) => unref(adminSettingsForm).map_iframe = $event,
								label: "كود تضمين الخريطة أو رابط خرائط جوجل (Google Maps Iframe / URL)",
								placeholder: "https://www.google.com/maps/embed?...",
								dir: "ltr"
							}, null, _parent, _scopeId));
							_push(`</div>`);
						} else return [createVNode("div", { class: "grid grid-cols-1 gap-6" }, [createVNode(BaseInput_default, {
							modelValue: unref(adminSettingsForm).map_iframe,
							"onUpdate:modelValue": ($event) => unref(adminSettingsForm).map_iframe = $event,
							label: "كود تضمين الخريطة أو رابط خرائط جوجل (Google Maps Iframe / URL)",
							placeholder: "https://www.google.com/maps/embed?...",
							dir: "ltr"
						}, null, 8, ["modelValue", "onUpdate:modelValue"])])];
					}),
					_: 1
				}, _parent));
				_push(`</form>`);
			}
			_push(ssrRenderComponent(AdminSaveBar_default, {
				"is-saving": unref(isSubmitting),
				"show-status": false,
				"preview-url": "/contact-us",
				"save-label": "حفظ ونشر التعديلات",
				onSave: unref(saveAdminContactSettings)
			}, null, _parent));
			_push(`</div>`);
		};
	}
});
//#endregion
//#region pages/admin/contact-settings/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact-settings/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contact_settings_default = index_vue_vue_type_script_setup_true_lang_default;

export { contact_settings_default as default };
//# sourceMappingURL=contact-settings-CkEu188Y.mjs.map
