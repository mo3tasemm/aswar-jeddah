import { b as useAdminLanguage, f as useAdminAuth, N as NuxtLink } from '../virtual/entry.mjs';
import { u as useHead$1 } from './head-CrPJzvuo.mjs';
import { a as adminAnalyticsApiService, S as StatCard_default } from './adminAnalyticsApiService-Ck5WSGqn.mjs';
import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler } from 'chart.js';
import { Line, Doughnut } from 'vue-chartjs';
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

//#region pages/admin/analytics/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Filler);
		const { t } = useAdminLanguage();
		useAdminAuth();
		useHead$1({ title: computed(() => `${t("admin.analytics.title")} | ${t("admin.sidebar.panel_title")}`) });
		const timeRanges = computed(() => [
			{
				label: "اليوم",
				value: "today"
			},
			{
				label: "هذا الأسبوع",
				value: "this_week"
			},
			{
				label: "هذا الشهر",
				value: "this_month"
			},
			{
				label: "هذا العام",
				value: "this_year"
			}
		]);
		const selectedPeriod = ref("this_month");
		const isLoading = ref(false);
		const isInitialLoaded = ref(false);
		const errorMessage = ref("");
		const chartDataReady = ref(false);
		const dashboardData = ref(adminAnalyticsApiService.getEmptyDashboardData());
		const currentRangeLabel = computed(() => {
			return timeRanges.value.find((r) => r.value === selectedPeriod.value)?.label || "هذا الشهر";
		});
		const periodGrowthLabel = computed(() => {
			if (selectedPeriod.value === "today") return "مقارنة بالأمس";
			if (selectedPeriod.value === "this_week") return "مقارنة بالأسبوع الماضي";
			if (selectedPeriod.value === "this_year") return "مقارنة بالعام الماضي";
			return "مقارنة بالشهر الماضي";
		});
		const currencySymbol = computed(() => {
			return dashboardData.value.summary.currency_symbol || dashboardData.value.summary.currency || "ر.س";
		});
		const kpiStats = computed(() => [
			{
				title: t("admin.analytics.total_revenue") || "إجمالي المبيعات",
				value: `${dashboardData.value.summary.total_sales.toLocaleString()} ${currencySymbol.value}`,
				trend: dashboardData.value.summary.total_sales_growth,
				icon: "<svg class=\"w-6 h-6 text-emerald-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z\" /></svg>",
				iconBgColor: "bg-emerald-50 text-emerald-600"
			},
			{
				title: t("admin.analytics.total_orders") || "إجمالي الطلبات",
				value: `${dashboardData.value.summary.total_orders.toLocaleString()}`,
				trend: dashboardData.value.summary.total_orders_growth,
				icon: "<svg class=\"w-6 h-6 text-indigo-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z\" /></svg>",
				iconBgColor: "bg-indigo-50 text-indigo-600"
			},
			{
				title: t("admin.analytics.total_customers") || "إجمالي العملاء",
				value: `${dashboardData.value.summary.total_customers.toLocaleString()}`,
				trend: dashboardData.value.summary.total_customers_growth,
				icon: "<svg class=\"w-6 h-6 text-amber-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z\" /></svg>",
				iconBgColor: "bg-amber-50 text-amber-600"
			},
			{
				title: t("admin.analytics.average_order") || "متوسط قيمة الطلب",
				value: `${dashboardData.value.summary.average_order_value.toLocaleString()} ${currencySymbol.value}`,
				trend: dashboardData.value.summary.average_order_value_growth,
				icon: "<svg class=\"w-6 h-6 text-blue-600\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" stroke-width=\"2\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z\" /></svg>",
				iconBgColor: "bg-blue-50 text-blue-600"
			}
		]);
		const salesChartData = computed(() => {
			const chart = dashboardData.value.sales_chart;
			const labels = chart.labels && chart.labels.length > 0 ? chart.labels : selectedPeriod.value === "today" ? [
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
			const sales = chart.sales && chart.sales.length > 0 ? chart.sales : [
				0,
				0,
				0,
				0,
				0,
				0,
				0
			];
			return {
				labels,
				datasets: [{
					label: t("admin.analytics.total_revenue") || "إجمالي المبيعات",
					data: sales,
					borderColor: "#4f46e5",
					backgroundColor: "rgba(79, 70, 229, 0.12)",
					fill: true,
					tension: .35,
					borderWidth: 2.5,
					pointBackgroundColor: "#4f46e5",
					pointRadius: 3.5,
					pointHoverRadius: 6
				}]
			};
		});
		const salesChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			plugins: {
				legend: { display: false },
				tooltip: { callbacks: { label: (ctx) => `${ctx.dataset.label}: ${Number(ctx.raw).toLocaleString()} ${currencySymbol.value}` } }
			},
			scales: {
				y: {
					beginAtZero: true,
					grid: { color: "rgba(226, 232, 240, 0.6)" },
					ticks: { callback: (val) => `${Number(val).toLocaleString()}` }
				},
				x: { grid: { display: false } }
			}
		};
		const orderStatusChartData = computed(() => {
			const counts = dashboardData.value.order_status_counts;
			const hasData = counts.delivered + counts.processing + counts.pending + counts.canceled > 0;
			return {
				labels: [
					t("admin.orders.status_delivered") || "تم التوصيل",
					t("admin.orders.status_processing") || "قيد التجهيز",
					t("admin.orders.status_pending") || "قيد الانتظار",
					t("admin.orders.status_cancelled") || "ملغي"
				],
				datasets: [{
					data: hasData ? [
						counts.delivered,
						counts.processing,
						counts.pending,
						counts.canceled
					] : [
						0,
						0,
						0,
						1
					],
					backgroundColor: hasData ? [
						"#10b981",
						"#6366f1",
						"#f59e0b",
						"#ef4444"
					] : ["#e2e8f0"],
					borderWidth: 2,
					borderColor: "#ffffff"
				}]
			};
		});
		const donutChartOptions = {
			responsive: true,
			maintainAspectRatio: false,
			cutout: "72%",
			plugins: { legend: { display: false } }
		};
		const getOrderStatusMeta = (status) => {
			const s = (status || "").toLowerCase();
			if (s === "delivered" || s === "completed") return {
				label: t("admin.orders.status_delivered") || "تم التوصيل",
				class: "bg-emerald-50 text-emerald-700"
			};
			if (s === "processing" || s === "confirmed" || s === "packaging" || s === "out_for_delivery") return {
				label: t("admin.orders.status_processing") || "قيد التجهيز",
				class: "bg-indigo-50 text-indigo-700"
			};
			if (s === "pending") return {
				label: t("admin.orders.status_pending") || "قيد الانتظار",
				class: "bg-amber-50 text-amber-700"
			};
			if (s === "canceled" || s === "cancelled" || s === "failed") return {
				label: t("admin.orders.status_cancelled") || "ملغي",
				class: "bg-red-50 text-red-700"
			};
			return {
				label: status,
				class: "bg-slate-100 text-slate-700"
			};
		};
		return (_ctx, _push, _parent, _attrs) => {
			const _component_NuxtLink = NuxtLink;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"><div><div class="flex items-center gap-3"><h1 class="text-2xl font-black text-slate-800">${ssrInterpolate(unref(t)("admin.analytics.title"))}</h1><button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} title="تحديث البيانات" class="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"><svg class="${ssrRenderClass([{ "animate-spin": isLoading.value }, "w-4 h-4"])}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg></button></div><p class="text-sm text-slate-500 mt-1">${ssrInterpolate(unref(t)("admin.analytics.subtitle"))}</p></div><div class="flex items-center p-1 bg-white border border-slate-200 rounded-xl shadow-sm w-full sm:w-auto"><!--[-->`);
			ssrRenderList(timeRanges.value, (range) => {
				_push(`<button${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="${ssrRenderClass([selectedPeriod.value === range.value ? "bg-[#0B0E28] text-amber-400 shadow-sm" : "text-slate-600 hover:bg-slate-50", "flex-1 sm:flex-none px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer disabled:cursor-not-allowed"])}">${ssrInterpolate(range.label)}</button>`);
			});
			_push(`<!--]--></div></div>`);
			if (errorMessage.value) _push(`<div class="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center justify-between"><span>${ssrInterpolate(errorMessage.value)}</span><button class="underline hover:text-red-900 cursor-pointer">إعادة المحاولة</button></div>`);
			else _push(`<!---->`);
			_push(`<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">`);
			if (isLoading.value && !isInitialLoaded.value) {
				_push(`<!--[-->`);
				ssrRenderList(4, (i) => {
					_push(`<div class="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 animate-pulse space-y-4"><div class="flex justify-between items-start"><div class="space-y-2"><div class="w-20 h-4 bg-slate-200 rounded"></div><div class="w-28 h-7 bg-slate-200 rounded"></div></div><div class="w-12 h-12 rounded-xl bg-slate-100"></div></div><div class="w-24 h-3 bg-slate-200 rounded pt-2"></div></div>`);
				});
				_push(`<!--]-->`);
			} else {
				_push(`<!--[-->`);
				ssrRenderList(kpiStats.value, (stat) => {
					_push(ssrRenderComponent(StatCard_default, {
						key: stat.title,
						title: stat.title,
						value: stat.value,
						trend: stat.trend,
						trendLabel: periodGrowthLabel.value,
						iconBgColor: stat.iconBgColor
					}, {
						icon: withCtx((_, _push, _parent, _scopeId) => {
							if (_push) _push(`<span${_scopeId}>${stat.icon ?? ""}</span>`);
							else return [createVNode("span", { innerHTML: stat.icon }, null, 8, ["innerHTML"])];
						}),
						_: 2
					}, _parent));
				});
				_push(`<!--]-->`);
			}
			_push(`</div><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"><div class="flex items-center justify-between mb-6"><div><h3 class="text-lg font-black text-slate-800">${ssrInterpolate(unref(t)("admin.analytics.sales_overview"))}</h3><p class="text-xs text-slate-400 mt-0.5">${ssrInterpolate(currentRangeLabel.value)}</p></div><div class="flex items-center gap-2"><span class="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-black rounded-lg"><span class="w-2 h-2 rounded-full bg-indigo-600"></span> ${ssrInterpolate(unref(t)("admin.analytics.total_revenue"))}</span></div></div><div class="h-[300px] w-full relative flex items-center justify-center">`);
			if (isLoading.value) _push(`<div class="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10"><div class="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>`);
			else _push(`<!---->`);
			if (chartDataReady.value) _push(ssrRenderComponent(unref(Line), {
				data: salesChartData.value,
				options: salesChartOptions
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between"><div class="flex items-center justify-between mb-6"><div><h3 class="text-lg font-black text-slate-800">${ssrInterpolate(unref(t)("admin.orders.order_status"))}</h3><p class="text-xs text-slate-400 mt-0.5">توزيع الحالات للفترة الحالية</p></div></div><div class="h-[240px] w-full relative flex items-center justify-center">`);
			if (isLoading.value) _push(`<div class="absolute inset-0 bg-white/70 backdrop-blur-[1px] flex items-center justify-center z-10"><div class="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div></div>`);
			else _push(`<!---->`);
			if (chartDataReady.value) _push(ssrRenderComponent(unref(Doughnut), {
				data: orderStatusChartData.value,
				options: donutChartOptions
			}, null, _parent));
			else _push(`<!---->`);
			_push(`</div><div class="grid grid-cols-2 gap-2 pt-4 mt-2 border-t border-slate-100 text-xs font-bold"><div class="flex items-center justify-between p-2 rounded-xl bg-emerald-50 text-emerald-800"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500"></span>${ssrInterpolate(unref(t)("admin.orders.status_delivered"))}</span><span class="font-black">${ssrInterpolate(dashboardData.value.order_status_counts.delivered)}</span></div><div class="flex items-center justify-between p-2 rounded-xl bg-indigo-50 text-indigo-800"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-indigo-500"></span>${ssrInterpolate(unref(t)("admin.orders.status_processing"))}</span><span class="font-black">${ssrInterpolate(dashboardData.value.order_status_counts.processing)}</span></div><div class="flex items-center justify-between p-2 rounded-xl bg-amber-50 text-amber-800"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-amber-500"></span>${ssrInterpolate(unref(t)("admin.orders.status_pending"))}</span><span class="font-black">${ssrInterpolate(dashboardData.value.order_status_counts.pending)}</span></div><div class="flex items-center justify-between p-2 rounded-xl bg-red-50 text-red-800"><span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-red-500"></span>${ssrInterpolate(unref(t)("admin.orders.status_cancelled"))}</span><span class="font-black">${ssrInterpolate(dashboardData.value.order_status_counts.canceled)}</span></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-black text-slate-800">${ssrInterpolate(unref(t)("admin.analytics.top_selling_products"))}</h3>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/products",
				class: "text-xs font-bold text-indigo-600 hover:text-indigo-800"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` عرض كل المنتجات ← `);
					else return [createTextVNode(" عرض كل المنتجات ← ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="overflow-x-auto flex-1"><table class="w-full text-start text-sm"><thead class="text-xs text-slate-400 font-bold border-b border-slate-100 pb-2"><tr><th class="pb-3 text-start">${ssrInterpolate(unref(t)("admin.products.product_name"))}</th><th class="pb-3 text-center">${ssrInterpolate(unref(t)("admin.orders.quantity"))}</th><th class="pb-3 text-end">${ssrInterpolate(unref(t)("admin.analytics.total_revenue"))}</th></tr></thead><tbody class="divide-y divide-slate-100 font-medium">`);
			if (dashboardData.value.top_selling_products.length > 0) {
				_push(`<!--[-->`);
				ssrRenderList(dashboardData.value.top_selling_products, (prod) => {
					_push(`<tr class="hover:bg-slate-50/50 transition-colors"><td class="py-3 flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">`);
					if (prod.thumbnail) _push(`<img${ssrRenderAttr("src", prod.thumbnail)} class="w-full h-full object-cover"${ssrRenderAttr("alt", prod.name)}>`);
					else _push(`<svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>`);
					_push(`</div><div><span class="font-bold text-slate-800 block line-clamp-1">${ssrInterpolate(prod.name)}</span><span class="text-[11px] text-slate-400 font-mono">${ssrInterpolate(prod.unit_price.toLocaleString())} ${ssrInterpolate(currencySymbol.value)}</span></div></td><td class="py-3 text-slate-700 font-black text-center"><span class="px-2 py-1 bg-slate-100 rounded-lg text-xs">${ssrInterpolate(prod.sold_quantity)}</span></td><td class="py-3 font-black text-slate-900 text-end">${ssrInterpolate(prod.total_revenue.toLocaleString())} ${ssrInterpolate(currencySymbol.value)}</td></tr>`);
				});
				_push(`<!--]-->`);
			} else _push(`<tr><td colspan="3" class="py-10 text-center text-xs text-slate-400 font-bold"> لا توجد مبيعات مسجلة في هذه الفترة </td></tr>`);
			_push(`</tbody></table></div></div><div class="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-black text-slate-800">${ssrInterpolate(unref(t)("admin.analytics.recent_orders"))}</h3>`);
			_push(ssrRenderComponent(_component_NuxtLink, {
				to: "/admin/orders",
				class: "text-xs font-bold text-indigo-600 hover:text-indigo-800"
			}, {
				default: withCtx((_, _push, _parent, _scopeId) => {
					if (_push) _push(` عرض كل الطلبات ← `);
					else return [createTextVNode(" عرض كل الطلبات ← ")];
				}),
				_: 1
			}, _parent));
			_push(`</div><div class="space-y-3 flex-1">`);
			if (dashboardData.value.recent_orders.length > 0) {
				_push(`<!--[-->`);
				ssrRenderList(dashboardData.value.recent_orders, (order) => {
					_push(`<div class="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-slate-100/60 transition-colors"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-slate-200 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">`);
					if (order.customer?.image) _push(`<img${ssrRenderAttr("src", order.customer.image)} class="w-full h-full object-cover" alt="Customer">`);
					else _push(`<span class="text-xs font-black text-slate-600 uppercase">${ssrInterpolate((order.customer?.name || "U").charAt(0))}</span>`);
					_push(`</div><div><div class="flex items-center gap-2"><span class="font-mono text-xs font-black text-indigo-600">${ssrInterpolate(order.order_key)}</span><h4 class="font-bold text-xs text-slate-800">${ssrInterpolate(order.customer?.name)}</h4></div><span class="text-[10px] text-slate-400 font-medium block mt-0.5">${ssrInterpolate(order.created_at_human || order.created_at)}</span></div></div><div class="text-end space-y-1"><span class="font-black text-xs text-slate-900 block">${ssrInterpolate(order.order_amount.toLocaleString())} ${ssrInterpolate(currencySymbol.value)}</span><span class="${ssrRenderClass([getOrderStatusMeta(order.order_status).class, "text-[10px] font-black px-2 py-0.5 rounded-md inline-block"])}">${ssrInterpolate(getOrderStatusMeta(order.order_status).label)}</span></div></div>`);
				});
				_push(`<!--]-->`);
			} else _push(`<div class="py-10 text-center text-xs text-slate-400 font-bold"> لا توجد طلبات مسجلة في هذه الفترة </div>`);
			_push(`</div></div></div></div>`);
		};
	}
});
//#endregion
//#region pages/admin/analytics/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/analytics/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var analytics_default = index_vue_vue_type_script_setup_true_lang_default;

export { analytics_default as default };
//# sourceMappingURL=analytics-DLayf66g.mjs.map
