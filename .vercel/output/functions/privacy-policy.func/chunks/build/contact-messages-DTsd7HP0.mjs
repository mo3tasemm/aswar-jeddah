import { b as useAdminLanguage, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { B as BaseInput_default } from './BaseInput-DtpOFLj4.mjs';
import { u as useContact } from './useContact-BEn_tp9Z.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrLooseContain, ssrLooseEqual, ssrRenderAttr } from 'vue/server-renderer';
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

//#region pages/admin/contact-messages/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const { adminDir, t, adminLanguage } = useAdminLanguage();
		const { adminMessages, totalMessages, unreadCount, isLoading, currentPage, lastPage, searchFilter, statusFilter, selectedMessageIds, fetchAdminMessages} = useContact();
		const searchQuery = ref("");
		let searchDebounceTimeout = null;
		useHead$1({ title: computed(() => `${t("admin.contact_messages.title")} | ${t("admin.sidebar.panel_title") || "لوحة تحكم أسوار جدة"}`) });
		const loadMessages = (page = 1) => {
			fetchAdminMessages(page);
		};
		const statusPills = computed(() => [
			{
				value: "all",
				label: t("admin.contact_messages.all_messages"),
				count: totalMessages.value
			},
			{
				value: "unread",
				label: t("admin.contact_messages.unread"),
				count: unreadCount.value
			},
			{
				value: "read",
				label: t("admin.contact_messages.read")
			}
		]);
		const handleSearchInput = () => {
			clearTimeout(searchDebounceTimeout);
			searchDebounceTimeout = setTimeout(() => {
				searchFilter.value = searchQuery.value;
				loadMessages(1);
			}, 350);
		};
		const filteredMessages = computed(() => {
			let list = adminMessages.value || [];
			if (statusFilter.value === "unread") list = list.filter((m) => !m.is_read);
			else if (statusFilter.value === "read") list = list.filter((m) => m.is_read);
			if (searchQuery.value && searchQuery.value.trim()) {
				const q = searchQuery.value.toLowerCase().trim();
				list = list.filter((m) => m.name && m.name.toLowerCase().includes(q) || m.email && m.email.toLowerCase().includes(q) || m.subject && m.subject.toLowerCase().includes(q) || m.phone && m.phone.includes(q));
			}
			return list;
		});
		const isAllSelected = computed(() => {
			return filteredMessages.value.length > 0 && filteredMessages.value.every((m) => selectedMessageIds.value.includes(m.id));
		});
		const visiblePages = computed(() => {
			const pages = [];
			const maxButtons = 5;
			let start = Math.max(1, currentPage.value - Math.floor(maxButtons / 2));
			let end = Math.min(lastPage.value, start + maxButtons - 1);
			if (end - start + 1 < maxButtons) start = Math.max(1, end - maxButtons + 1);
			for (let i = start; i <= end; i++) pages.push(i);
			return pages;
		});
		const formatDate = (dateStr) => {
			if (!dateStr) return "-";
			try {
				const cleanStr = String(dateStr).replace(" ", "T");
				const d = new Date(cleanStr);
				if (isNaN(d.getTime())) return String(dateStr).split("T")[0] || dateStr;
				const locale = adminLanguage.value === "en" ? "en-US" : "ar-SA";
				return d.toLocaleDateString(locale, {
					year: "numeric",
					month: "short",
					day: "numeric"
				});
			} catch {
				return String(dateStr);
			}
		};
		const formatTime = (dateStr) => {
			if (!dateStr) return "";
			try {
				const cleanStr = String(dateStr).replace(" ", "T");
				const d = new Date(cleanStr);
				if (isNaN(d.getTime())) return "";
				const locale = adminLanguage.value === "en" ? "en-US" : "ar-SA";
				return d.toLocaleTimeString(locale, {
					hour: "2-digit",
					minute: "2-digit"
				});
			} catch {
				return "";
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({
				class: "space-y-6",
				dir: unref(adminDir)
			}, _attrs))}><div class="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between"><div><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg shrink-0"><i class="fa-solid fa-inbox"></i></div><div><div class="flex items-center gap-2.5"><h1 class="text-2xl font-black text-slate-900">${ssrInterpolate(unref(t)("admin.contact_messages.title"))}</h1>`);
			if (!unref(isLoading)) _push(`<span class="px-3 py-1 bg-amber-100 text-amber-900 text-xs font-black rounded-full">${ssrInterpolate(unref(totalMessages))} ${ssrInterpolate(unref(t)("admin.contact_messages.total_messages"))}</span>`);
			else _push(`<!---->`);
			if (unref(unreadCount) > 0 && !unref(isLoading)) _push(`<span class="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500 text-white animate-pulse">${ssrInterpolate(unref(unreadCount))} ${ssrInterpolate(unref(t)("admin.contact_messages.unread"))}</span>`);
			else _push(`<!---->`);
			_push(`</div><p class="text-xs sm:text-sm text-slate-500 mt-1 font-medium">${ssrInterpolate(unref(t)("admin.contact_messages.subtitle"))}</p></div></div></div><div class="flex items-center gap-3 w-full sm:w-auto">`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/contact-settings",
				class: "p-2.5 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<i class="fa-solid fa-sliders text-xs text-amber-500"${_scopeId}></i><span${_scopeId}>${ssrInterpolate(unref(t)("admin.sidebar.contact_settings"))}</span>`);
					else return [createVNode("i", { class: "fa-solid fa-sliders text-xs text-amber-500" }), createVNode("span", null, toDisplayString(unref(t)("admin.sidebar.contact_settings")), 1)];
				}),
				_: 1
			}, _parent));
			if (unref(selectedMessageIds).length > 0) _push(`<button type="button" class="px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-black text-xs transition-colors flex items-center gap-2 cursor-pointer shadow-2xs"><i class="fa-solid fa-trash-can text-xs"></i><span>${ssrInterpolate(unref(t)("admin.contact_messages.bulk_delete"))} (${ssrInterpolate(unref(selectedMessageIds).length)})</span></button>`);
			else _push(`<!---->`);
			_push(`<button${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"><svg class="${ssrRenderClass([{ "animate-spin": unref(isLoading) }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span>${ssrInterpolate(unref(t)("admin.common.refresh"))}</span></button></div></div><div class="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none"><!--[-->`);
			ssrRenderList(statusPills.value, (pill) => {
				_push(`<button class="${ssrRenderClass([unref(statusFilter) === pill.value ? "bg-[#0B0E28] text-amber-400 border-[#0B0E28] shadow-sm" : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50", "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer border"])}"><span>${ssrInterpolate(pill.label)}</span>`);
				if (pill.count !== void 0) _push(`<span class="${ssrRenderClass([unref(statusFilter) === pill.value ? pill.value === "unread" ? "bg-rose-500 text-white" : "bg-amber-400/20 text-amber-300" : pill.value === "unread" && unref(unreadCount) > 0 ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600", "text-[10px] px-1.5 py-0.5 rounded-full font-mono font-black"])}">${ssrInterpolate(pill.count)}</span>`);
				else _push(`<!---->`);
				_push(`</button>`);
			});
			_push(`<!--]--></div><div class="bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"><div class="w-full md:flex-1">`);
			_push(ssrRenderComponent(BaseInput_default, {
				modelValue: searchQuery.value,
				"onUpdate:modelValue": ($event) => searchQuery.value = $event,
				placeholder: unref(t)("admin.contact_messages.search_placeholder"),
				onInput: handleSearchInput
			}, {
				icon: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(`<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"${_scopeId}></path></svg>`);
					else return [(openBlock(), createBlock("svg", {
						class: "w-5 h-5 text-slate-400",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full md:w-auto"><div class="w-full sm:w-48"><label class="block text-[11px] font-black text-slate-500 mb-1">${ssrInterpolate(unref(t)("admin.contact_messages.status"))}</label><select class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:border-amber-400"><option value="all"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "all") : ssrLooseEqual(unref(statusFilter), "all")) ? " selected" : ""}>${ssrInterpolate(unref(t)("admin.contact_messages.all_messages"))}</option><option value="unread"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "unread") : ssrLooseEqual(unref(statusFilter), "unread")) ? " selected" : ""}>${ssrInterpolate(unref(t)("admin.contact_messages.unread"))}</option><option value="read"${ssrIncludeBooleanAttr(Array.isArray(unref(statusFilter)) ? ssrLooseContain(unref(statusFilter), "read") : ssrLooseEqual(unref(statusFilter), "read")) ? " selected" : ""}>${ssrInterpolate(unref(t)("admin.contact_messages.read"))}</option></select></div>`);
			if (unref(statusFilter) !== "all" || searchQuery.value) _push(`<div class="self-end pb-0.5"><button class="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-bold transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.reset_filter"))}>${ssrInterpolate(unref(t)("admin.common.reset_filter"))}</button></div>`);
			else _push(`<!---->`);
			_push(`</div></div><div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">`);
			if (unref(isLoading)) _push(`<div class="p-16 flex flex-col items-center justify-center gap-3 text-slate-400"><svg class="w-8 h-8 animate-spin text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg><span class="text-xs font-bold">${ssrInterpolate(unref(t)("admin.common.loading"))}</span></div>`);
			else if (!filteredMessages.value || filteredMessages.value.length === 0) {
				_push(`<div class="p-16 text-center space-y-3"><div class="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto"><i class="fa-solid fa-envelope-open text-2xl"></i></div><h3 class="text-base font-black text-slate-700">${ssrInterpolate(unref(t)("admin.common.no_data"))}</h3><p class="text-xs text-slate-400 max-w-sm mx-auto font-medium">${ssrInterpolate(unref(t)("admin.contact_messages.no_messages"))}</p>`);
				if (unref(statusFilter) !== "all" || searchQuery.value) _push(`<button class="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-[#0B0E28] rounded-xl text-xs font-black cursor-pointer shadow-sm transition-all">${ssrInterpolate(unref(t)("admin.contact_messages.all_messages"))}</button>`);
				else _push(`<!---->`);
				_push(`</div>`);
			} else {
				_push(`<div class="overflow-x-auto w-full"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-500 font-bold border-b border-slate-100 text-xs"><tr><th class="px-4 py-4 w-10 text-center"><input type="checkbox"${ssrIncludeBooleanAttr(isAllSelected.value) ? " checked" : ""} class="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"></th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.contact_messages.sender_name"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.contact_messages.subject"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.contact_messages.sent_date"))}</th><th class="px-6 py-4 font-bold text-start">${ssrInterpolate(unref(t)("admin.contact_messages.status"))}</th><th class="px-6 py-4 font-bold text-center">${ssrInterpolate(unref(t)("admin.common.actions"))}</th></tr></thead><tbody class="divide-y divide-slate-100"><!--[-->`);
				ssrRenderList(filteredMessages.value, (msg) => {
					_push(`<tr class="${ssrRenderClass([!msg.is_read ? "bg-amber-50/10 font-bold" : "", "hover:bg-amber-50/20 transition-colors group cursor-pointer"])}"><td class="px-4 py-4 text-center"><input type="checkbox"${ssrRenderAttr("value", msg.id)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedMessageIds)) ? ssrLooseContain(unref(selectedMessageIds), msg.id) : unref(selectedMessageIds)) ? " checked" : ""} class="rounded border-slate-300 text-amber-500 focus:ring-amber-400 cursor-pointer"></td><td class="px-6 py-4"><div class="flex items-center gap-3"><div class="${ssrRenderClass([!msg.is_read ? "bg-amber-400 text-[#0B0E28] shadow-sm" : "bg-slate-100 text-slate-600", "w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 transition-transform group-hover:scale-105"])}">${ssrInterpolate((msg.name || "ع").charAt(0).toUpperCase())}</div><div class="flex flex-col text-start"><span class="font-black text-slate-900 group-hover:text-amber-600 transition-colors text-sm">${ssrInterpolate(msg.name)}</span><span class="text-xs text-slate-400 font-mono mt-0.5" dir="ltr">${ssrInterpolate(msg.email)}</span>`);
					if (msg.phone) _push(`<span class="text-[11px] text-slate-400 font-mono" dir="ltr">${ssrInterpolate(msg.phone)}</span>`);
					else _push(`<!---->`);
					_push(`</div></div></td><td class="px-6 py-4 max-w-xs sm:max-w-md"><div class="flex flex-col text-start space-y-0.5"><span class="font-bold text-slate-900 text-sm truncate group-hover:text-amber-700 transition-colors">${ssrInterpolate(msg.subject)}</span><p class="text-xs text-slate-400 truncate max-w-sm font-normal">${ssrInterpolate(msg.message)}</p></div></td><td class="px-6 py-4 text-xs font-bold text-slate-600 text-start"><div>${ssrInterpolate(formatDate(msg.created_at))}</div><div class="text-[11px] text-slate-400 font-mono mt-0.5">${ssrInterpolate(formatTime(msg.created_at))}</div></td><td class="px-6 py-4 text-start">`);
					if (!msg.is_read) _push(`<span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-50 text-rose-700 border border-rose-200 shadow-2xs"><span class="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping"></span><span>${ssrInterpolate(unref(t)("admin.contact_messages.unread"))}</span></span>`);
					else _push(`<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600 border border-slate-200/60"><i class="fa-solid fa-check text-[10px] text-slate-400"></i><span>${ssrInterpolate(unref(t)("admin.contact_messages.read"))}</span></span>`);
					_push(`</td><td class="px-6 py-4 text-center"><div class="flex items-center justify-center gap-2">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/contact-messages/${msg.id}`,
						class: "px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-400 hover:text-[#0B0E28] text-slate-700 text-xs font-black transition-all flex items-center gap-1 cursor-pointer shadow-2xs",
						title: unref(t)("admin.common.details")
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg><span${_scopeId}>${ssrInterpolate(unref(t)("admin.common.details"))}</span>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-3.5 h-3.5",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								"stroke-width": "2.5"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							}), createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							})])), createVNode("span", null, toDisplayString(unref(t)("admin.common.details")), 1)];
						}),
						_: 2
					}, _parent));
					_push(`<button type="button" class="p-2 rounded-xl bg-slate-100 hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"${ssrRenderAttr("title", unref(t)("admin.common.delete"))}><i class="fa-solid fa-trash-can text-xs"></i></button></div></td></tr>`);
				});
				_push(`<!--]--></tbody></table></div>`);
			}
			if (unref(lastPage) > 1) {
				_push(`<div class="p-4 sm:p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4"><span class="text-xs text-slate-500 font-bold">${ssrInterpolate(unref(t)("admin.common.showing") || "عرض الصفحة")} ${ssrInterpolate(unref(currentPage))} ${ssrInterpolate(unref(t)("admin.common.of") || "من")} ${ssrInterpolate(unref(lastPage))}</span><div class="flex items-center gap-1.5"><button${ssrIncludeBooleanAttr(unref(currentPage) <= 1 || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer">${ssrInterpolate(unref(t)("admin.common.previous") || "السابق")}</button><!--[-->`);
				ssrRenderList(visiblePages.value, (p) => {
					_push(`<button class="${ssrRenderClass([unref(currentPage) === p ? "bg-[#0B0E28] text-amber-400 shadow-sm" : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50", "w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer"])}">${ssrInterpolate(p)}</button>`);
				});
				_push(`<!--]--><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(lastPage) || unref(isLoading)) ? " disabled" : ""} class="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-white disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer">${ssrInterpolate(unref(t)("admin.common.next") || "التالي")}</button></div></div>`);
			} else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/contact-messages/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/contact-messages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var contact_messages_default = index_vue_vue_type_script_setup_true_lang_default;

export { contact_messages_default as default };
//# sourceMappingURL=contact-messages-DTsd7HP0.mjs.map
