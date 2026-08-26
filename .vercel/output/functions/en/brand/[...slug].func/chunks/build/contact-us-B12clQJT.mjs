import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { u as useContact } from './useContact-BEn_tp9Z.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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

//#region pages/contact-us.vue?vue&type=script&setup=true&lang.ts
var contact_us_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "contact-us",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, layoutDirection, currentLanguage, localePath } = useLanguage();
		const { contactInfo, isSubmitting, messageForm, formErrors} = useContact();
		useHead$1({
			title: computed(() => currentLanguage.value === "en" ? "Contact Us | Aswar Jeddah" : "تواصل معنا | أسوار جدة"),
			meta: [{
				name: "description",
				content: computed(() => currentLanguage.value === "en" ? "Get in touch with Aswar Jeddah customer care team" : "تواصل مع فريق خدمة العملاء والدعم الفني في أسوار جدة")
			}]
		});
		const hasSocialLinks = computed(() => {
			const c = contactInfo.value;
			return !!(c.twitter || c.x || c.instagram || c.tiktok || c.snapchat || c.facebook || c.youtube);
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-slate-50 text-slate-900",
				dir: unref(layoutDirection)
			}, _attrs))}><header class="bg-[#0B0E28] text-white py-10 sm:py-14 border-b border-slate-800"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><nav class="flex items-center gap-2 text-xs text-slate-400 font-medium mb-4">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: unref(localePath)("/"),
				class: "hover:text-amber-400 transition-colors flex items-center gap-1.5"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("nav.home") || (unref(currentLanguage) === "en" ? "Home" : "الرئيسية"))}</span>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-4 h-4 text-slate-400",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					})])), createVNode("span", null, toDisplayString(unref(t)("nav.home") || (unref(currentLanguage) === "en" ? "Home" : "الرئيسية")), 1)];
				}),
				_: 1
			}, _parent));
			_push(`<span class="text-slate-600">/</span><span class="text-amber-400 font-bold">${ssrInterpolate(unref(currentLanguage) === "en" ? "Contact Us" : "تواصل معنا")}</span></nav><div class="max-w-3xl text-start"><h1 class="text-2xl sm:text-4xl font-black text-white tracking-tight">${ssrInterpolate(unref(currentLanguage) === "en" ? "Contact Us" : "تواصل معنا")}</h1><p class="text-sm sm:text-base text-slate-300 font-normal mt-2 leading-relaxed">${ssrInterpolate(unref(currentLanguage) === "en" ? "Have questions about products, orders, or warranties? Our dedicated support team is here to assist you." : "فريقنا متواجد دائماً للإجابة على استفساراتكم ومساعدتكم في كل ما يخص المنتجات والطلبات والضمان.")}</p></div></div></header><main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14"><div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"><div class="lg:col-span-5 space-y-6"><div class="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-start space-y-6"><div><h2 class="text-lg sm:text-xl font-black text-slate-900">${ssrInterpolate(unref(currentLanguage) === "en" ? "Contact Information" : "بيانات ومعلومات التواصل")}</h2><p class="text-xs text-slate-500 font-medium mt-1">${ssrInterpolate(unref(currentLanguage) === "en" ? "Reach out to us directly through any of the following channels:" : "يمكنكم التواصل المباشر معنا عبر قنوات الاتصال التالية:")}</p></div><div class="space-y-4 divide-y divide-slate-100">`);
			if (unref(contactInfo).hotline || unref(contactInfo).phone) {
				_push(`<div class="pt-3 first:pt-0 flex items-start gap-3.5"><div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-base shrink-0"><i class="fa-solid fa-phone"></i></div><div class="space-y-0.5"><span class="text-xs font-bold text-slate-500 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "Direct Hotline & Phone" : "الخط الساخن ورقم المعرض")}</span><div class="flex flex-col gap-0.5">`);
				if (unref(contactInfo).hotline) _push(`<a${ssrRenderAttr("href", "tel:" + unref(contactInfo).hotline.replace(/\s+/g, ""))} class="text-sm sm:text-base font-black text-slate-900 hover:text-amber-600 transition-colors dir-ltr block">${ssrInterpolate(unref(contactInfo).hotline)}</a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).phone && unref(contactInfo).phone !== unref(contactInfo).hotline) _push(`<a${ssrRenderAttr("href", "tel:" + unref(contactInfo).phone.replace(/\s+/g, ""))} class="text-xs font-bold text-slate-600 hover:text-amber-600 transition-colors dir-ltr block">${ssrInterpolate(unref(contactInfo).phone)}</a>`);
				else _push(`<!---->`);
				_push(`</div></div></div>`);
			} else _push(`<!---->`);
			if (unref(contactInfo).whatsapp) _push(`<div class="pt-4 flex items-start gap-3.5"><div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg shrink-0"><i class="fa-brands fa-whatsapp"></i></div><div class="space-y-0.5"><span class="text-xs font-bold text-slate-500 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "WhatsApp Customer Service" : "خدمة العملاء عبر واتساب")}</span><a${ssrRenderAttr("href", `https://wa.me/${unref(contactInfo).whatsapp.replace(/[^0-9]/g, "")}`)} target="_blank" class="text-sm sm:text-base font-black text-slate-900 hover:text-emerald-600 transition-colors dir-ltr block">${ssrInterpolate(unref(contactInfo).whatsapp)}</a><span class="text-[11px] text-emerald-600 font-medium flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span><span>${ssrInterpolate(unref(currentLanguage) === "en" ? "Fast online response" : "استجابة سريعة ومباشرة")}</span></span></div></div>`);
			else _push(`<!---->`);
			if (unref(contactInfo).email) _push(`<div class="pt-4 flex items-start gap-3.5"><div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center text-base shrink-0"><i class="fa-solid fa-envelope"></i></div><div class="space-y-0.5 min-w-0"><span class="text-xs font-bold text-slate-500 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "Official Email" : "البريد الإلكتروني الرسمي")}</span><a${ssrRenderAttr("href", "mailto:" + unref(contactInfo).email)} class="text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors block font-mono dir-ltr truncate max-w-[240px] sm:max-w-xs">${ssrInterpolate(unref(contactInfo).email)}</a></div></div>`);
			else _push(`<!---->`);
			if (unref(contactInfo).working_hours) _push(`<div class="pt-4 flex items-start gap-3.5"><div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-base shrink-0"><i class="fa-solid fa-clock"></i></div><div class="space-y-0.5"><span class="text-xs font-bold text-slate-500 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "Working Hours" : "أوقات العمل والدوام")}</span><p class="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">${ssrInterpolate(unref(contactInfo).working_hours)}</p></div></div>`);
			else _push(`<!---->`);
			if (unref(contactInfo).address) _push(`<div class="pt-4 flex items-start gap-3.5"><div class="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-base shrink-0"><i class="fa-solid fa-location-dot"></i></div><div class="space-y-0.5"><span class="text-xs font-bold text-slate-500 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "Showroom & Store Location" : "عنوان المعرض")}</span><p class="text-xs sm:text-sm font-medium text-slate-800 leading-relaxed">${ssrInterpolate(unref(contactInfo).address)}</p></div></div>`);
			else _push(`<!---->`);
			_push(`</div>`);
			if (hasSocialLinks.value) {
				_push(`<div class="pt-4 border-t border-slate-100 space-y-3"><span class="text-xs font-bold text-slate-600 block">${ssrInterpolate(unref(currentLanguage) === "en" ? "Follow Us on Social Media" : "تابعنا عبر منصات التواصل")}</span><div class="flex items-center gap-2 flex-wrap">`);
				if (unref(contactInfo).twitter || unref(contactInfo).x) _push(`<a${ssrRenderAttr("href", unref(contactInfo).twitter || unref(contactInfo).x)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#0B0E28] hover:text-white text-slate-700 flex items-center justify-center transition-colors" title="X / Twitter"><i class="fa-brands fa-x-twitter text-sm"></i></a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).instagram) _push(`<a${ssrRenderAttr("href", unref(contactInfo).instagram)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-pink-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors" title="Instagram"><i class="fa-brands fa-instagram text-sm"></i></a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).tiktok) _push(`<a${ssrRenderAttr("href", unref(contactInfo).tiktok)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-black hover:text-white text-slate-700 flex items-center justify-center transition-colors" title="TikTok"><i class="fa-brands fa-tiktok text-sm"></i></a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).snapchat) _push(`<a${ssrRenderAttr("href", unref(contactInfo).snapchat)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-slate-950 text-slate-700 flex items-center justify-center transition-colors" title="Snapchat"><i class="fa-brands fa-snapchat text-sm"></i></a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).facebook) _push(`<a${ssrRenderAttr("href", unref(contactInfo).facebook)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors" title="Facebook"><i class="fa-brands fa-facebook text-sm"></i></a>`);
				else _push(`<!---->`);
				if (unref(contactInfo).youtube) _push(`<a${ssrRenderAttr("href", unref(contactInfo).youtube)} target="_blank" class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 flex items-center justify-center transition-colors" title="YouTube"><i class="fa-brands fa-youtube text-sm"></i></a>`);
				else _push(`<!---->`);
				_push(`</div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div><div class="lg:col-span-7"><div class="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs text-start space-y-6"><div><h2 class="text-lg sm:text-xl font-black text-slate-900">${ssrInterpolate(unref(currentLanguage) === "en" ? "Send Us a Message" : "نموذج المراسلة المباشر")}</h2><p class="text-xs text-slate-500 font-medium mt-1">${ssrInterpolate(unref(currentLanguage) === "en" ? "Please fill out the form below and we will get back to you promptly." : "يرجى تعبئة النموذج التالي وسيقوم فريق الدعم الفني بالرد عليكم في أقرب وقت ممكن.")}</p></div><form class="space-y-4"><div><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "Full Name *" : "الاسم الكامل *")}</label><input type="text"${ssrRenderAttr("value", unref(messageForm).name)}${ssrRenderAttr("placeholder", unref(currentLanguage) === "en" ? "e.g. John Doe" : "مثال: محمد أحمد")} class="${ssrRenderClass([unref(formErrors).name ? "border-red-400 ring-2 ring-red-100" : "border-slate-300", "w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"])}">`);
			if (unref(formErrors).name) _push(`<span class="text-[11px] text-red-500 font-bold block mt-1">${ssrInterpolate(unref(formErrors).name)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "Email Address *" : "البريد الإلكتروني *")}</label><input type="email"${ssrRenderAttr("value", unref(messageForm).email)}${ssrRenderAttr("placeholder", unref(currentLanguage) === "en" ? "name@example.com" : "name@example.com")} class="${ssrRenderClass([unref(formErrors).email ? "border-red-400 ring-2 ring-red-100" : "border-slate-300", "w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all dir-ltr"])}">`);
			if (unref(formErrors).email) _push(`<span class="text-[11px] text-red-500 font-bold block mt-1">${ssrInterpolate(unref(formErrors).email)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "Phone Number (Optional)" : "رقم الجوال (اختياري)")}</label><input type="tel"${ssrRenderAttr("value", unref(messageForm).phone)} placeholder="0500000000" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all dir-ltr"></div></div><div><label class="block text-xs font-bold text-slate-700 mb-1.5">${ssrInterpolate(unref(currentLanguage) === "en" ? "Subject *" : "موضوع الرسالة *")}</label><input type="text"${ssrRenderAttr("value", unref(messageForm).subject)}${ssrRenderAttr("placeholder", unref(currentLanguage) === "en" ? "e.g. Question regarding product or order" : "مثال: استفسار عن توفر منتج أو مواصفات جهاز")} class="${ssrRenderClass([unref(formErrors).subject ? "border-red-400 ring-2 ring-red-100" : "border-slate-300", "w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"])}">`);
			if (unref(formErrors).subject) _push(`<span class="text-[11px] text-red-500 font-bold block mt-1">${ssrInterpolate(unref(formErrors).subject)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div><div class="flex items-center justify-between mb-1.5"><label class="block text-xs font-bold text-slate-700">${ssrInterpolate(unref(currentLanguage) === "en" ? "Message Content *" : "نص الرسالة *")}</label><span class="text-[11px] text-slate-400 font-mono">${ssrInterpolate(unref(messageForm).message.length)} / 1000</span></div><textarea rows="4" maxlength="1000"${ssrRenderAttr("placeholder", unref(currentLanguage) === "en" ? "Write your message details here..." : "اكتب تفاصيل استفسارك أو ملاحظاتك هنا...")} class="${ssrRenderClass([unref(formErrors).message ? "border-red-400 ring-2 ring-red-100" : "border-slate-300", "w-full px-4 py-2.5 rounded-xl border bg-slate-50/50 text-sm font-medium text-slate-900 focus:bg-white focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"])}">${ssrInterpolate(unref(messageForm).message)}</textarea>`);
			if (unref(formErrors).message) _push(`<span class="text-[11px] text-red-500 font-bold block mt-1">${ssrInterpolate(unref(formErrors).message)}</span>`);
			else _push(`<!---->`);
			_push(`</div><div class="pt-2"><button type="submit"${ssrIncludeBooleanAttr(unref(isSubmitting)) ? " disabled" : ""} class="w-full py-3 px-6 rounded-xl bg-amber-400 hover:bg-amber-500 text-[#0B0E28] font-black text-sm transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50">`);
			if (unref(isSubmitting)) _push(`<i class="fa-solid fa-spinner fa-spin text-sm"></i>`);
			else _push(`<i class="fa-solid fa-paper-plane text-xs"></i>`);
			_push(`<span>${ssrInterpolate(unref(isSubmitting) ? unref(currentLanguage) === "en" ? "Sending..." : "جاري الإرسال..." : unref(currentLanguage) === "en" ? "Send Message" : "إرسال الرسالة")}</span></button></div></form></div></div></div></main></div>`);
		};
	}
});
//#endregion
//#region pages/contact-us.vue
var _sfc_setup = contact_us_vue_vue_type_script_setup_true_lang_default.setup;
contact_us_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/contact-us.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contact_us_default = contact_us_vue_vue_type_script_setup_true_lang_default;

export { contact_us_default as default };
//# sourceMappingURL=contact-us-B12clQJT.mjs.map
