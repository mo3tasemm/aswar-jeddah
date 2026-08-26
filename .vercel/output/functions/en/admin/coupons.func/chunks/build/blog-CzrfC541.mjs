import { N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { u as useLanguage } from './useLanguage-Dqkt54yZ.mjs';
import { B as Breadcrumbs_default } from './Breadcrumbs-BBY8An0U.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
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
import './Breadcrumbs-DbmDaiX_.mjs';

//#region pages/blog/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { t, currentLanguage, layoutDirection } = useLanguage();
		const searchQuery = ref("");
		const selectedCategory = ref("all");
		const categories = [
			{
				id: "all",
				name: {
					ar: "الكل",
					en: "All"
				}
			},
			{
				id: "appliances",
				name: {
					ar: "الأجهزة المنزلية",
					en: "Home Appliances"
				}
			},
			{
				id: "security",
				name: {
					ar: "النظم الأمنية",
					en: "Security Systems"
				}
			},
			{
				id: "pos",
				name: {
					ar: "أنظمة الكاشير",
					en: "POS Systems"
				}
			},
			{
				id: "laptops",
				name: {
					ar: "لاب توب وكمبيوتر",
					en: "Laptops & Computers"
				}
			},
			{
				id: "networks",
				name: {
					ar: "أنظمة الشبكات",
					en: "Networks"
				}
			}
		];
		const articles = ref([
			{
				slug: "smart-home-appliances-2026-guide",
				icon: "⚡",
				categoryId: "appliances",
				categoryName: {
					ar: "الأجهزة المنزلية",
					en: "Home Appliances"
				},
				title: {
					ar: "دليل اختيار الأجهزة الكهربائية الموفرة للطاقة لمنزلك في 2026",
					en: "Energy-Saving Home Appliances Buying Guide 2026"
				},
				excerpt: {
					ar: "تعرف على أهم المعايير لاختيار أجهزة كهربائية موفرة للطاقة مع أعلى كفاءة وأطول عمر افتراضي مع توفير ملحوظ في فاتورة الكهرباء.",
					en: "Learn the essential criteria for choosing energy-efficient home appliances with maximum longevity and significant electricity savings."
				},
				readTime: 5,
				date: "2026-02-10",
				author: { name: "فريق خبراء أسوار جدة" },
				isFeatured: true
			},
			{
				slug: "cctv-security-systems-tips",
				icon: "📹",
				categoryId: "security",
				categoryName: {
					ar: "النظم الأمنية",
					en: "Security Systems"
				},
				title: {
					ar: "كيف تختار نظام الكاميرات والمراقبة الأنسب لمنزلك أو مكتبك؟",
					en: "How to Choose the Best Security & CCTV System for Your Home or Office"
				},
				excerpt: {
					ar: "مقارنة شاملة بين كاميرات IP والكاميرات اللاسلكية الذكية وأفضل ممارسات الحماية الأمنية للفلل والمكاتب التجارية.",
					en: "A comprehensive comparison between IP and smart wireless cameras, plus top security best practices for homes and offices."
				},
				readTime: 6,
				date: "2026-02-05",
				author: { name: "م. أحمد العتيبي" },
				isFeatured: false
			},
			{
				slug: "pos-systems-retail-guide",
				icon: "💳",
				categoryId: "pos",
				categoryName: {
					ar: "أنظمة الكاشير",
					en: "POS Systems"
				},
				title: {
					ar: "أفضل أنظمة نقاط البيع والكاشير لإدارة متجرك بكفاءة وسهولة",
					en: "Top POS & Cashier Systems for Seamless Retail Management"
				},
				excerpt: {
					ar: "اكتشف كيف تختار نظام الكاشير وأجهزة الباركود الملائمة للفوترة الإلكترونية وتتبع المخزون بدقة عالية.",
					en: "Discover how to choose the right POS hardware and barcode devices for e-invoicing and accurate inventory tracking."
				},
				readTime: 4,
				date: "2026-01-28",
				author: { name: "سارة الدوسري" },
				isFeatured: false
			},
			{
				slug: "laptop-buying-guide-students-professionals",
				icon: "💻",
				categoryId: "laptops",
				categoryName: {
					ar: "لاب توب وكمبيوتر",
					en: "Laptops & Computers"
				},
				title: {
					ar: "دليل شراء اللابتوب المناسب للعمل والدراسة: المواصفات والميزانية",
					en: "Laptop Buying Guide for Work & Study: Specs and Budget"
				},
				excerpt: {
					ar: "كل ما تحتاج معرفته عن أحدث المعالجات، الذاكرة العشوائية RAM وبطاقات الرسوميات لاختيار جهاز يلبي تطلعاتك بأفضل قيمة.",
					en: "Everything you need to know about the latest processors, RAM, and graphics cards to choose the best laptop value."
				},
				readTime: 7,
				date: "2026-01-20",
				author: { name: "م. خالد الحربي" },
				isFeatured: false
			},
			{
				slug: "home-network-setup-speed",
				icon: "📡",
				categoryId: "networks",
				categoryName: {
					ar: "أنظمة الشبكات",
					en: "Networks"
				},
				title: {
					ar: "أسرار تقوية شبكة الواي فاي وتغطية كامل المنزل بشبكات Mesh",
					en: "Secrets to Boosting Home Wi-Fi and Full Coverage with Mesh Networks"
				},
				excerpt: {
					ar: "طرق عملية للقضاء على البقع الميتة وزيادة سرعة الإنترنت المنزلي واختيار أفضل أجهزة الراوتر والموزعات الذكية.",
					en: "Practical methods to eliminate dead zones and maximize home Wi-Fi speeds with smart Mesh routers."
				},
				readTime: 5,
				date: "2026-01-15",
				author: { name: "فريق التقنية" },
				isFeatured: false
			}
		]);
		const featuredArticle = computed(() => {
			return articles.value.find((a) => a.isFeatured) || articles.value[0];
		});
		const filteredArticles = computed(() => {
			return articles.value.filter((article) => {
				const matchesCategory = selectedCategory.value === "all" || article.categoryId === selectedCategory.value;
				const q = searchQuery.value.trim().toLowerCase();
				if (!q) return matchesCategory;
				const lang = currentLanguage.value;
				const title = article.title[lang]?.toLowerCase() || "";
				const excerpt = article.excerpt[lang]?.toLowerCase() || "";
				const matchesSearch = title.includes(q) || excerpt.includes(q);
				return matchesCategory && matchesSearch;
			});
		});
		useHead$1({
			title: computed(() => `${t("blog.title")} | أسوار جدة`),
			meta: [{
				name: "description",
				content: computed(() => t("blog.subtitle"))
			}]
		});
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "min-h-screen bg-slate-50/50 pb-20 selection:bg-amber-500 selection:text-white",
				dir: unref(layoutDirection)
			}, _attrs))}><div class="container mx-auto px-4 max-w-7xl py-6 sm:py-8">`);
			_push(ssrRenderComponent(Breadcrumbs_default, { items: [{
				label: unref(layoutDirection) === "ltr" ? "Home" : "الرئيسية",
				to: "/"
			}, { label: unref(t)("cat.blog") }] }, null, _parent));
			_push(`<div class="mt-6 mb-10 text-center max-w-3xl mx-auto space-y-4"><div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-black shadow-xs"><span>📝</span><span>${ssrInterpolate(unref(t)("cat.blog"))}</span></div><h1 class="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0B0E28] tracking-tight">${ssrInterpolate(unref(t)("blog.title"))}</h1><p class="text-slate-600 text-sm sm:text-base leading-relaxed">${ssrInterpolate(unref(t)("blog.subtitle"))}</p><div class="pt-4 max-w-xl mx-auto flex items-center gap-3"><div class="relative flex-1"><input${ssrRenderAttr("value", searchQuery.value)} type="text"${ssrRenderAttr("placeholder", unref(t)("blog.search_placeholder"))} class="w-full bg-white border border-slate-200 rounded-2xl py-3 px-11 text-sm font-medium text-slate-800 focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-400/10 shadow-xs transition-all"><svg class="w-4 h-4 text-slate-400 absolute start-4 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg>`);
			if (searchQuery.value) _push(`<button class="absolute end-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"> ✕ </button>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="flex items-center justify-center gap-2 pt-3 flex-wrap"><!--[-->`);
			ssrRenderList(categories, (category) => {
				_push(`<button class="${ssrRenderClass(["px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer border", selectedCategory.value === category.id ? "bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-md scale-105" : "bg-white text-slate-600 hover:text-[#0B0E28] hover:bg-slate-50 border-slate-200/80 shadow-2xs"])}">${ssrInterpolate(category.name[unref(currentLanguage)])}</button>`);
			});
			_push(`<!--]--></div></div>`);
			if (featuredArticle.value && !searchQuery.value && selectedCategory.value === "all") {
				_push(`<div class="mb-12">`);
				_push(ssrRenderComponent(_component_NuxtLink, {
					to: `/blog/${featuredArticle.value.slug}`,
					class: "group block bg-gradient-to-br from-[#0B0E28] to-slate-900 rounded-3xl p-6 sm:p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300 border border-slate-800/80 overflow-hidden relative"
				}, {
					default: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<div class="absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"${_scopeId}></div><div class="flex flex-col lg:flex-row items-center gap-8 relative z-10"${_scopeId}><div class="w-full lg:w-1/2 space-y-4 text-start"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><span class="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider"${_scopeId}>${ssrInterpolate(unref(t)("blog.featured"))}</span><span class="text-xs text-slate-400 font-bold flex items-center gap-1"${_scopeId}><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"${_scopeId}><circle cx="12" cy="12" r="10"${_scopeId}></circle><polyline points="12 6 12 12 16 14"${_scopeId}></polyline></svg> ${ssrInterpolate(featuredArticle.value.readTime)} ${ssrInterpolate(unref(t)("blog.read_time"))}</span></div><h2 class="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight"${_scopeId}>${ssrInterpolate(featuredArticle.value.title[unref(currentLanguage)])}</h2><p class="text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3"${_scopeId}>${ssrInterpolate(featuredArticle.value.excerpt[unref(currentLanguage)])}</p><div class="flex items-center justify-between pt-2"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-9 h-9 rounded-full bg-amber-400 text-[#0B0E28] font-black text-sm flex items-center justify-center"${_scopeId}>${ssrInterpolate(featuredArticle.value.author.name.charAt(0))}</div><div${_scopeId}><p class="text-xs font-bold text-white"${_scopeId}>${ssrInterpolate(featuredArticle.value.author.name)}</p><p class="text-[11px] text-slate-400"${_scopeId}>${ssrInterpolate(featuredArticle.value.date)}</p></div></div><span class="inline-flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm group-hover:translate-x-1 transition-transform"${_scopeId}><span${_scopeId}>${ssrInterpolate(unref(t)("blog.read_more"))}</span><svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"${_scopeId}><path d="M5 12h14M12 5l7 7-7 7"${_scopeId}></path></svg></span></div></div><div class="w-full lg:w-1/2 aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/60 flex items-center justify-center relative group-hover:scale-[1.01] transition-transform"${_scopeId}><div class="text-center p-6 space-y-3"${_scopeId}><div class="w-20 h-20 rounded-2xl bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center text-4xl border border-amber-400/30"${_scopeId}> ⚡ </div><span class="text-xs font-bold text-slate-300 block"${_scopeId}>${ssrInterpolate(featuredArticle.value.categoryName[unref(currentLanguage)])}</span></div></div></div>`);
						else return [createVNode("div", { class: "absolute -right-20 -bottom-20 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" }), createVNode("div", { class: "flex flex-col lg:flex-row items-center gap-8 relative z-10" }, [createVNode("div", { class: "w-full lg:w-1/2 space-y-4 text-start" }, [
							createVNode("div", { class: "flex items-center gap-3" }, [createVNode("span", { class: "bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider" }, toDisplayString(unref(t)("blog.featured")), 1), createVNode("span", { class: "text-xs text-slate-400 font-bold flex items-center gap-1" }, [(openBlock(), createBlock("svg", {
								class: "w-3.5 h-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("circle", {
								cx: "12",
								cy: "12",
								r: "10"
							}), createVNode("polyline", { points: "12 6 12 12 16 14" })])), createTextVNode(" " + toDisplayString(featuredArticle.value.readTime) + " " + toDisplayString(unref(t)("blog.read_time")), 1)])]),
							createVNode("h2", { class: "text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-amber-400 transition-colors leading-tight" }, toDisplayString(featuredArticle.value.title[unref(currentLanguage)]), 1),
							createVNode("p", { class: "text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3" }, toDisplayString(featuredArticle.value.excerpt[unref(currentLanguage)]), 1),
							createVNode("div", { class: "flex items-center justify-between pt-2" }, [createVNode("div", { class: "flex items-center gap-3" }, [createVNode("div", { class: "w-9 h-9 rounded-full bg-amber-400 text-[#0B0E28] font-black text-sm flex items-center justify-center" }, toDisplayString(featuredArticle.value.author.name.charAt(0)), 1), createVNode("div", null, [createVNode("p", { class: "text-xs font-bold text-white" }, toDisplayString(featuredArticle.value.author.name), 1), createVNode("p", { class: "text-[11px] text-slate-400" }, toDisplayString(featuredArticle.value.date), 1)])]), createVNode("span", { class: "inline-flex items-center gap-2 text-amber-400 font-black text-xs sm:text-sm group-hover:translate-x-1 transition-transform" }, [createVNode("span", null, toDisplayString(unref(t)("blog.read_more")), 1), (openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2.5"
							}, [createVNode("path", { d: "M5 12h14M12 5l7 7-7 7" })]))])])
						]), createVNode("div", { class: "w-full lg:w-1/2 aspect-video sm:aspect-16/10 rounded-2xl overflow-hidden bg-slate-800/80 border border-slate-700/60 flex items-center justify-center relative group-hover:scale-[1.01] transition-transform" }, [createVNode("div", { class: "text-center p-6 space-y-3" }, [createVNode("div", { class: "w-20 h-20 rounded-2xl bg-amber-400/20 text-amber-400 mx-auto flex items-center justify-center text-4xl border border-amber-400/30" }, " ⚡ "), createVNode("span", { class: "text-xs font-bold text-slate-300 block" }, toDisplayString(featuredArticle.value.categoryName[unref(currentLanguage)]), 1)])])])];
					}),
					_: 1
				}, _parent));
				_push(`</div>`);
			} else _push(`<!---->`);
			if (filteredArticles.value.length > 0) {
				_push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"><!--[-->`);
				ssrRenderList(filteredArticles.value, (article) => {
					_push(`<article class="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group text-start"><div class="h-48 bg-gradient-to-br from-slate-100 to-slate-200 relative overflow-hidden flex items-center justify-center border-b border-slate-100"><div class="text-5xl group-hover:scale-110 transition-transform duration-300">${ssrInterpolate(article.icon)}</div><div class="absolute top-4 start-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-slate-800 border border-slate-200/60 shadow-xs">${ssrInterpolate(article.categoryName[unref(currentLanguage)])}</div></div><div class="p-6 flex-1 flex flex-col justify-between space-y-4"><div class="space-y-2.5"><div class="flex items-center gap-3 text-xs text-slate-400 font-bold"><span>${ssrInterpolate(article.date)}</span><span>•</span><span>${ssrInterpolate(article.readTime)} ${ssrInterpolate(unref(t)("blog.read_time"))}</span></div>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/blog/${article.slug}`,
						class: "block"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<h3 class="text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2"${_scopeId}>${ssrInterpolate(article.title[unref(currentLanguage)])}</h3>`);
							else return [createVNode("h3", { class: "text-lg font-black text-slate-900 group-hover:text-amber-600 transition-colors leading-snug line-clamp-2" }, toDisplayString(article.title[unref(currentLanguage)]), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<p class="text-xs text-slate-500 line-clamp-3 leading-relaxed">${ssrInterpolate(article.excerpt[unref(currentLanguage)])}</p></div><div class="pt-4 border-t border-slate-100 flex items-center justify-between"><span class="text-xs font-bold text-slate-600">${ssrInterpolate(article.author.name)}</span>`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/blog/${article.slug}`,
						class: "inline-flex items-center gap-1.5 text-xs font-black text-amber-600 hover:text-amber-700 transition-colors group-hover:underline underline-offset-4"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>${ssrInterpolate(unref(t)("blog.read_more"))}</span><svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"${_scopeId}><path d="M5 12h14M12 5l7 7-7 7"${_scopeId}></path></svg>`);
							else return [createVNode("span", null, toDisplayString(unref(t)("blog.read_more")), 1), (openBlock(), createBlock("svg", {
								class: "w-3.5 h-3.5",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								"stroke-width": "2.5"
							}, [createVNode("path", { d: "M5 12h14M12 5l7 7-7 7" })]))];
						}),
						_: 2
					}, _parent));
					_push(`</div></div></article>`);
				});
				_push(`<!--]--></div>`);
			} else _push(`<div class="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto my-12 space-y-4 shadow-xs"><div class="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl border border-amber-200"> 🔍 </div><h3 class="text-lg font-black text-slate-900">${ssrInterpolate(unref(t)("blog.no_articles"))}</h3><p class="text-xs text-slate-500">جرب البحث بكلمات أخرى أو اختر قسماً آخر.</p><button class="px-5 py-2.5 bg-[#0B0E28] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer">${ssrInterpolate(unref(t)("blog.all"))}</button></div>`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region pages/blog/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var blog_default = index_vue_vue_type_script_setup_true_lang_default;

export { blog_default as default };
//# sourceMappingURL=blog-CzrfC541.mjs.map
