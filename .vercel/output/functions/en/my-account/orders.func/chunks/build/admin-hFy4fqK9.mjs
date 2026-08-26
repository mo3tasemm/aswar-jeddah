import { f as useAdminAuth, _ as _plugin_vue_export_helper_default, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { a as adminAnalyticsApiService, S as StatCard_default } from './adminAnalyticsApiService-Ck5WSGqn.mjs';
import { S as StatusBadge_default } from './StatusBadge-klet5TK_.mjs';
import { defineComponent, ref, computed, mergeProps, unref, withCtx, openBlock, createBlock, createVNode, watch, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrIncludeBooleanAttr, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'vue-chartjs';
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

//#region components/dashboard/StatCardSkeleton.vue
var _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[138px] animate-pulse" }, _attrs))}><div class="flex items-start justify-between mb-4"><div class="flex-1"><div class="w-1/2 h-3 bg-slate-200 rounded-full mb-3 mt-1"></div><div class="w-3/4 h-6 bg-slate-200 rounded-full"></div></div><div class="w-12 h-12 rounded-xl bg-slate-100 shrink-0 ml-4"></div></div><div class="flex items-center gap-2 mt-auto pt-3 border-t border-slate-50"><div class="w-1/3 h-2 bg-slate-200 rounded-full"></div></div></div>`);
}
var _sfc_setup$4 = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/StatCardSkeleton.vue");
	return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var StatCardSkeleton_default = /*#__PURE__*/ Object.assign(_plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]), { __name: "DashboardStatCardSkeleton" });
//#endregion
//#region components/dashboard/SalesChart.vue?vue&type=script&setup=true&lang.ts
var SalesChart_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "SalesChart",
	__ssrInlineRender: true,
	props: {
		labels: { default: () => [] },
		sales: { default: () => [] },
		period: { default: "this_month" },
		loading: {
			type: Boolean,
			default: false
		},
		currencySymbol: { default: "ر.س" }
	},
	emits: ["update:period", "change-period"],
	setup(__props, { emit: __emit }) {
		Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
		const props = __props;
		const periods = [
			{
				label: "شهري",
				value: "this_month"
			},
			{
				label: "أسبوعي",
				value: "this_week"
			},
			{
				label: "يومي",
				value: "today"
			}
		];
		const internalPeriod = ref(props.period || "this_month");
		watch(() => props.period, (newVal) => {
			if (newVal) internalPeriod.value = newVal;
		});
		const currentActivePeriod = computed(() => props.period || internalPeriod.value);
		const chartData = computed(() => {
			const customLabels = props.labels && props.labels.length > 0 ? props.labels : currentActivePeriod.value === "today" ? [
				"00:00",
				"04:00",
				"08:00",
				"12:00",
				"16:00",
				"20:00"
			] : [
				"1",
				"5",
				"10",
				"15",
				"20",
				"25",
				"30"
			];
			const customSales = props.sales && props.sales.length > 0 ? props.sales : [
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			return {
				labels: customLabels,
				datasets: [{
					label: `إجمالي المبيعات (${props.currencySymbol})`,
					backgroundColor: "rgba(99, 102, 241, 0.12)",
					borderColor: "#4f46e5",
					borderWidth: 2.5,
					pointBackgroundColor: "#ffffff",
					pointBorderColor: "#4f46e5",
					pointBorderWidth: 2,
					pointRadius: 3.5,
					pointHoverRadius: 6,
					fill: true,
					tension: .35,
					data: customSales
				}]
			};
		});
		const chartOptions = computed(() => ({
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: {
					backgroundColor: "#0B0E28",
					titleFont: {
						family: "Tajawal",
						size: 13,
						weight: "bold"
					},
					bodyFont: {
						family: "Tajawal",
						size: 12
					},
					padding: 10,
					displayColors: false,
					rtl: true,
					textDirection: "rtl",
					callbacks: { label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.raw).toLocaleString()} ${props.currencySymbol}` }
				}
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "#f1f5f9" },
					ticks: {
						color: "#94a3b8",
						font: {
							family: "Tajawal",
							size: 11
						},
						callback: function(value) {
							if (value >= 1e3) return (value / 1e3).toFixed(0) + "k";
							return value;
						}
					}
				},
				x: {
					grid: { display: false },
					ticks: {
						color: "#64748b",
						font: {
							family: "Tajawal",
							size: 11,
							weight: "bold"
						}
					}
				}
			},
			interaction: {
				intersect: false,
				mode: "index"
			}
		}));
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-[400px]" }, _attrs))}><div class="flex items-center justify-between mb-6"><div><h3 class="font-black text-slate-800 text-lg">تحليلات المبيعات</h3><p class="text-sm text-slate-400 font-medium">مراقبة الأداء والإيرادات بمرور الوقت</p></div><div class="flex bg-slate-50 p-1 rounded-lg border border-slate-100"><!--[-->`);
			ssrRenderList(periods, (period) => {
				_push(`<button${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} class="${ssrRenderClass([currentActivePeriod.value === period.value ? "bg-[#0B0E28] text-amber-400 shadow-sm" : "text-slate-500 hover:text-slate-700", "px-4 py-1.5 rounded-md text-xs sm:text-sm font-bold transition-all cursor-pointer disabled:opacity-50"])}">${ssrInterpolate(period.label)}</button>`);
			});
			_push(`<!--]--></div></div><div class="flex-1 relative w-full h-full min-h-0 flex items-center justify-center">`);
			if (__props.loading) _push(`<div class="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10"><div class="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>`);
			else _push(`<!---->`);
			if (chartData.value) _push(ssrRenderComponent(unref(Line), {
				data: chartData.value,
				options: chartOptions.value,
				class: "w-full h-full"
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/SalesChart.vue
var _sfc_setup$3 = SalesChart_vue_vue_type_script_setup_true_lang_default.setup;
SalesChart_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/SalesChart.vue");
	return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
var SalesChart_default = Object.assign(SalesChart_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardSalesChart" });
//#endregion
//#region components/dashboard/RecentOrdersTable.vue?vue&type=script&setup=true&lang.ts
var RecentOrdersTable_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "RecentOrdersTable",
	__ssrInlineRender: true,
	props: {
		orders: { default: () => [] },
		currencySymbol: { default: "ر.س" }
	},
	setup(__props) {
		const props = __props;
		const formatOrderKey = (order) => {
			const key = String(order.order_key || order.id || "");
			if (!key) return "#---";
			return key.startsWith("#") ? key : `#${key}`;
		};
		const getCustomerName = (order) => {
			if (typeof order.customer === "object" && order.customer !== null) return order.customer.name || "عميل نقدي";
			if (typeof order.customer === "string" && order.customer) return order.customer;
			return order.customer_name || "عميل نقدي";
		};
		const getCustomerContact = (order) => {
			if (typeof order.customer === "object" && order.customer !== null) return order.customer.email || order.customer.phone || "";
			return order.email || order.phone || "";
		};
		const getCustomerImage = (order) => {
			if (typeof order.customer === "object" && order.customer !== null) return order.customer.image || "";
			return order.image || "";
		};
		const formatTotal = (order) => {
			if (order.total !== void 0 && typeof order.total === "string") return order.total;
			return `${Number(order.order_amount ?? order.total ?? 0).toLocaleString()} ${props.currencySymbol}`;
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col" }, _attrs))}><div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between"><div><h3 class="font-black text-slate-800 text-lg">أحدث الطلبات</h3><p class="text-xs text-slate-400 mt-0.5">آخر العمليات الشرائية المحدثة في المتجر</p></div>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/orders",
				class: "text-xs font-black text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` عرض الكل <svg class="w-4 h-4 rtl:-scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"${_scopeId}></path></svg>`);
					else return [createTextVNode(" عرض الكل "), (openBlock(), createBlock("svg", {
						class: "w-4 h-4 rtl:-scale-x-100",
						fill: "none",
						viewBox: "0 0 24 24",
						stroke: "currentColor",
						"stroke-width": "2"
					}, [createVNode("path", {
						"stroke-linecap": "round",
						"stroke-linejoin": "round",
						d: "M15 19l-7-7 7-7"
					})]))];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="overflow-x-auto w-full flex-1"><table class="w-full text-start text-sm whitespace-nowrap"><thead class="bg-slate-50 text-slate-400 text-xs font-bold border-b border-slate-100"><tr><th class="px-6 py-3.5 font-black text-start">رقم الطلب</th><th class="px-6 py-3.5 font-black text-start">العميل</th><th class="px-6 py-3.5 font-black text-start">التاريخ</th><th class="px-6 py-3.5 font-black text-start">الحالة</th><th class="px-6 py-3.5 font-black text-end">الإجمالي</th><th class="px-6 py-3.5 font-black text-center">إجراء</th></tr></thead><tbody class="divide-y divide-slate-100">`);
			if (__props.orders && __props.orders.length > 0) {
				_push(`<!--[-->`);
				ssrRenderList(__props.orders, (order) => {
					_push(`<tr class="hover:bg-slate-50/50 transition-colors"><td class="px-6 py-4 font-mono font-black text-xs text-indigo-600 text-start">${ssrInterpolate(formatOrderKey(order))}</td><td class="px-6 py-4 text-start"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center text-slate-700 font-black text-xs shrink-0">`);
					if (getCustomerImage(order)) _push(`<img${ssrRenderAttr("src", getCustomerImage(order))} class="w-full h-full object-cover" alt="Customer">`);
					else _push(`<span>${ssrInterpolate(getCustomerName(order).charAt(0).toUpperCase())}</span>`);
					_push(`</div><div class="flex flex-col"><span class="font-bold text-xs text-slate-800">${ssrInterpolate(getCustomerName(order))}</span><span class="text-[11px] text-slate-400 font-mono">${ssrInterpolate(getCustomerContact(order))}</span></div></div></td><td class="px-6 py-4 text-xs text-slate-500 font-medium text-start">${ssrInterpolate(order.created_at_human || order.date || order.created_at || "الآن")}</td><td class="px-6 py-4 text-start">`);
					_push(ssrRenderComponent(StatusBadge_default, { status: order.order_status || order.status || "pending" }, null, _parent));
					_push(`</td><td class="px-6 py-4 font-black text-xs text-slate-900 text-end">${ssrInterpolate(formatTotal(order))}</td><td class="px-6 py-4 text-center">`);
					_push(ssrRenderComponent(_component_NuxtLink, {
						to: `/admin/orders/${order.id}`,
						class: "text-slate-400 hover:text-indigo-600 transition-colors p-1.5 rounded-lg hover:bg-indigo-50 inline-flex items-center justify-center cursor-pointer",
						title: "تفاصيل الطلب"
					}, {
						default: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"${_scopeId}></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"${_scopeId}></path></svg>`);
							else return [(openBlock(), createBlock("svg", {
								class: "w-4 h-4",
								fill: "none",
								viewBox: "0 0 24 24",
								stroke: "currentColor",
								"stroke-width": "2"
							}, [createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							}), createVNode("path", {
								"stroke-linecap": "round",
								"stroke-linejoin": "round",
								d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							})]))];
						}),
						_: 2
					}, _parent));
					_push(`</td></tr>`);
				});
				_push(`<!--]-->`);
			} else _push(`<tr><td colspan="6" class="py-12 text-center text-xs text-slate-400 font-bold"> لا توجد طلبات مسجلة حالياً </td></tr>`);
			_push(`</tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/RecentOrdersTable.vue
var _sfc_setup$2 = RecentOrdersTable_vue_vue_type_script_setup_true_lang_default.setup;
RecentOrdersTable_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/RecentOrdersTable.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var RecentOrdersTable_default = Object.assign(RecentOrdersTable_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardRecentOrdersTable" });
//#endregion
//#region components/dashboard/TableSkeleton.vue?vue&type=script&setup=true&lang.ts
var TableSkeleton_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "TableSkeleton",
	__ssrInlineRender: true,
	props: { rows: {
		type: Number,
		default: 5
	} },
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col" }, _attrs))}><div class="px-6 py-5 border-b border-slate-100 flex items-center justify-between"><div class="w-32 h-6 bg-slate-200 rounded-lg animate-pulse"></div><div class="w-20 h-4 bg-slate-200 rounded-lg animate-pulse"></div></div><div class="overflow-x-auto w-full"><table class="w-full text-right text-sm"><thead class="bg-slate-50 border-b border-slate-100"><tr><!--[-->`);
			ssrRenderList(6, (i) => {
				_push(`<th class="px-6 py-4"><div class="w-16 h-4 bg-slate-200 rounded-md animate-pulse"></div></th>`);
			});
			_push(`<!--]--></tr></thead><tbody class="divide-y divide-slate-100/80"><!--[-->`);
			ssrRenderList(__props.rows, (row) => {
				_push(`<tr><!--[-->`);
				ssrRenderList(6, (col) => {
					_push(`<td class="px-6 py-4">`);
					if (col === 2) _push(`<div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-slate-200 animate-pulse shrink-0"></div><div class="flex flex-col gap-1 w-full max-w-[120px]"><div class="h-3 bg-slate-200 rounded-full w-3/4 animate-pulse"></div><div class="h-2 bg-slate-200 rounded-full w-1/2 animate-pulse"></div></div></div>`);
					else if (col === 4) _push(`<div class="w-20 h-6 bg-slate-200 rounded-full animate-pulse"></div>`);
					else _push(`<div class="w-16 h-3 bg-slate-200 rounded-full animate-pulse"></div>`);
					_push(`</td>`);
				});
				_push(`<!--]--></tr>`);
			});
			_push(`<!--]--></tbody></table></div></div>`);
		};
	}
});
//#endregion
//#region components/dashboard/TableSkeleton.vue
var _sfc_setup$1 = TableSkeleton_vue_vue_type_script_setup_true_lang_default.setup;
TableSkeleton_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/TableSkeleton.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var TableSkeleton_default = Object.assign(TableSkeleton_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardTableSkeleton" });
//#endregion
//#region pages/admin/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		useHead$1({ title: "لوحة التحكم الرئيسية | أسوار جدة" });
		const { getAdminToken } = useAdminAuth();
		const loading = ref(true);
		const isInitialLoaded = ref(false);
		const errorMessage = ref("");
		const activePeriod = ref("this_month");
		const dashboardData = ref(adminAnalyticsApiService.getEmptyDashboardData());
		const currentDate = new Intl.DateTimeFormat("ar-SA", {
			year: "numeric",
			month: "long",
			day: "numeric"
		}).format(/* @__PURE__ */ new Date());
		const currencySymbol = computed(() => {
			return dashboardData.value.summary.currency_symbol || dashboardData.value.summary.currency || "ر.س";
		});
		const periodGrowthLabel = computed(() => {
			if (activePeriod.value === "today") return "مقارنة بالأمس";
			if (activePeriod.value === "this_week") return "مقارنة بالأسبوع الماضي";
			return "مقارنة بالشهر الماضي";
		});
		const handlePeriodChange = async (period) => {
			if (activePeriod.value === period && isInitialLoaded.value) return;
			activePeriod.value = period;
			await loadDashboard();
		};
		const loadDashboard = async () => {
			const token = getAdminToken() || null;
			if (!token) {
				loading.value = false;
				return;
			}
			loading.value = true;
			errorMessage.value = "";
			try {
				const res = await adminAnalyticsApiService.fetchDashboardAnalytics(token, activePeriod.value);
				if (res.success && res.data) dashboardData.value = res.data;
				else errorMessage.value = res.message || "تعذر جلب إحصائيات المتجر.";
			} catch (err) {
				console.error("[Dashboard] Error loading dashboard:", err);
				errorMessage.value = err?.message || "حدث خطأ أثناء تحديث بيانات لوحة التحكم.";
			} finally {
				loading.value = false;
				isInitialLoaded.value = true;
			}
		};
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"><div><div class="flex items-center gap-3"><h1 class="text-2xl font-black text-slate-800">نظرة عامة</h1><button${ssrIncludeBooleanAttr(loading.value) ? " disabled" : ""} title="تحديث البيانات" class="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"><svg class="${ssrRenderClass([{ "animate-spin": loading.value }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button></div><p class="text-sm text-slate-500 mt-1">مرحباً بك في لوحة تحكم أسوار جدة. إليك ملخص وأداء المتجر.</p></div><div class="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 shadow-sm"><svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span>اليوم: ${ssrInterpolate(unref(currentDate))}</span></div></div>`);
			if (errorMessage.value) _push(`<div class="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-between"><span>${ssrInterpolate(errorMessage.value)}</span><button class="underline hover:text-red-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">`);
			if (loading.value && !isInitialLoaded.value) {
				_push(`<!--[-->`);
				ssrRenderList(4, (i) => {
					_push(ssrRenderComponent(StatCardSkeleton_default, { key: i }, null, _parent));
				});
				_push(`<!--]-->`);
			} else {
				_push(`<!--[-->`);
				_push(ssrRenderComponent(StatCard_default, {
					title: "إجمالي المبيعات",
					value: `${dashboardData.value.summary.total_sales.toLocaleString()} ${currencySymbol.value}`,
					trend: dashboardData.value.summary.total_sales_growth,
					trendLabel: periodGrowthLabel.value,
					iconBgColor: "bg-indigo-50 text-indigo-600"
				}, {
					icon: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(StatCard_default, {
					title: "الطلبات المعلقة",
					value: `${(dashboardData.value.summary.pending_orders || dashboardData.value.order_status_counts.pending || dashboardData.value.summary.total_orders).toLocaleString()} طلب`,
					trend: dashboardData.value.summary.pending_orders_growth || dashboardData.value.summary.total_orders_growth,
					trendLabel: periodGrowthLabel.value,
					iconBgColor: "bg-amber-50 text-amber-600"
				}, {
					icon: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(StatCard_default, {
					title: "عدد العملاء",
					value: dashboardData.value.summary.total_customers.toLocaleString(),
					trend: dashboardData.value.summary.total_customers_growth,
					trendLabel: periodGrowthLabel.value,
					iconBgColor: "bg-emerald-50 text-emerald-600"
				}, {
					icon: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(ssrRenderComponent(StatCard_default, {
					title: "منتجات نفدت",
					value: `${dashboardData.value.summary.out_of_stock_products.toLocaleString()} منتج`,
					trend: 0,
					trendLabel: "يحتاج لتوريد عاجل",
					iconBgColor: "bg-red-50 text-red-600"
				}, {
					icon: withCtx((_, _push, _parent, _scopeId) => {
						if (_push) _push(`<svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"${_scopeId}><path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"${_scopeId}></path></svg>`);
						else return [(openBlock(), createBlock("svg", {
							class: "w-6 h-6",
							fill: "none",
							viewBox: "0 0 24 24",
							stroke: "currentColor",
							"stroke-width": "2"
						}, [createVNode("path", {
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							d: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
						})]))];
					}),
					_: 1
				}, _parent));
				_push(`<!--]-->`);
			}
			_push(`</div><div class="grid grid-cols-1 xl:grid-cols-3 gap-6"><div class="xl:col-span-2 flex flex-col min-w-0">`);
			if (loading.value && !isInitialLoaded.value) _push(`<div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col h-[400px]"><div class="flex items-center justify-between mb-6"><div class="w-32 h-6 bg-slate-200 rounded-lg animate-pulse mb-2"></div><div class="w-48 h-8 bg-slate-200 rounded-lg animate-pulse"></div></div><div class="flex-1 w-full bg-slate-100 rounded-lg animate-pulse"></div></div>`);
			else _push(ssrRenderComponent(SalesChart_default, {
				labels: dashboardData.value.sales_chart.labels,
				sales: dashboardData.value.sales_chart.sales,
				period: activePeriod.value,
				loading: loading.value,
				currencySymbol: currencySymbol.value,
				onChangePeriod: handlePeriodChange
			}, null, _parent));
			_push(`</div><div class="xl:col-span-1 flex flex-col min-w-0">`);
			if (loading.value && !isInitialLoaded.value) _push(ssrRenderComponent(TableSkeleton_default, { rows: 5 }, null, _parent));
			else _push(ssrRenderComponent(RecentOrdersTable_default, {
				orders: dashboardData.value.recent_orders,
				currencySymbol: currencySymbol.value
			}, null, _parent));
			_push(`</div></div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var admin_default = index_vue_vue_type_script_setup_true_lang_default;

export { admin_default as default };
//# sourceMappingURL=admin-hFy4fqK9.mjs.map
