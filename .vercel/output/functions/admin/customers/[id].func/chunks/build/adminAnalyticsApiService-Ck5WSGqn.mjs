import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';

//#region components/dashboard/StatCard.vue?vue&type=script&setup=true&lang.ts
var StatCard_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "StatCard",
	__ssrInlineRender: true,
	props: {
		title: {},
		value: {},
		trend: {},
		trendLabel: { default: "مقارنة بالشهر الماضي" },
		iconBgColor: { default: "bg-indigo-50 text-indigo-600" }
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow" }, _attrs))}><div class="flex items-start justify-between mb-4"><div><p class="text-sm font-bold text-slate-500 mb-1">${ssrInterpolate(__props.title)}</p><h4 class="text-2xl font-black text-slate-800 dir-ltr text-right">${ssrInterpolate(__props.value)}</h4></div><div class="${ssrRenderClass([__props.iconBgColor, "w-12 h-12 rounded-xl flex items-center justify-center shrink-0"])}">`);
			ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
				_push(`<svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`);
			}, _push, _parent);
			_push(`</div></div>`);
			if (__props.trend) {
				_push(`<div class="flex items-center gap-2 text-xs font-bold mt-auto pt-2 border-t border-slate-50"><div class="${ssrRenderClass([__props.trend > 0 ? "text-green-600" : __props.trend < 0 ? "text-red-500" : "text-slate-400", "flex items-center gap-1"])}">`);
				if (__props.trend > 0) _push(`<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"></path></svg>`);
				else if (__props.trend < 0) _push(`<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 4.5l-15 15m0 0h11.25m-11.25 0V8.25"></path></svg>`);
				else _push(`<svg class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15"></path></svg>`);
				_push(`<span class="dir-ltr inline-block">${ssrInterpolate(Math.abs(__props.trend))}%</span></div><span class="text-slate-400">${ssrInterpolate(__props.trendLabel)}</span></div>`);
			} else _push(`<!---->`);
			_push(`</div>`);
		};
	}
});
//#endregion
//#region components/dashboard/StatCard.vue
var _sfc_setup = StatCard_vue_vue_type_script_setup_true_lang_default.setup;
StatCard_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/dashboard/StatCard.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var StatCard_default = Object.assign(StatCard_vue_vue_type_script_setup_true_lang_default, { __name: "DashboardStatCard" });
//#endregion
//#region services/adminAnalyticsApiService.ts
/**
* Admin Analytics & Reports API Service Layer
* Endpoint:
* GET /api/v1/admin/analytics/dashboard?period={today|this_week|this_month|this_year}
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var buildHeaders = (token) => {
	const headers = {
		Accept: "application/json",
		"X-Client-Type": "admin",
		"Cache-Control": "no-cache, no-store, must-revalidate",
		Pragma: "no-cache",
		Expires: "0",
		zoneId: "1"
	};
	if (token) headers.Authorization = `Bearer ${token}`;
	return headers;
};
function normalizeAnalyticsImageUrl(pathOrObj, fallback = "") {
	if (!pathOrObj) return fallback;
	if (typeof pathOrObj === "object") {
		const raw = pathOrObj.path || pathOrObj.url || pathOrObj.image_full_url?.path || "";
		if (raw) return normalizeAnalyticsImageUrl(raw, fallback);
	}
	const str = String(pathOrObj).trim();
	if (!str) return fallback;
	if (str.startsWith("http://") || str.startsWith("https://") || str.startsWith("data:") || str.startsWith("blob:")) return str;
	return `${API_BASE_URL.replace("/api/v1", "")}/storage/app/public/${str.replace(/^\/+/, "")}`;
}
var adminAnalyticsApiService = {
	/**
	* Fetch Dashboard Analytics Data
	* GET /api/v1/admin/analytics/dashboard?period=...
	*/
	async fetchDashboardAnalytics(token, period = "this_month") {
		const candidateUrls = [
			`${API_BASE_URL}/admin/analytics/dashboard?period=${period}&_t=${Date.now()}`,
			`${API_BASE_URL}/admin/analytics?period=${period}&_t=${Date.now()}`,
			`${API_BASE_URL}/admin/dashboard?period=${period}&_t=${Date.now()}`
		];
		for (const url of candidateUrls) try {
			const response = await fetch(url, {
				method: "GET",
				headers: buildHeaders(token),
				cache: "no-store"
			});
			if (!response.ok) continue;
			const raw = await response.json();
			console.log("[adminAnalyticsApiService] Dashboard raw response:", raw);
			const payload = raw?.data || raw;
			if (payload && typeof payload === "object") return {
				success: true,
				data: this.mapDashboardData(payload)
			};
		} catch (err) {
			console.warn(`[adminAnalyticsApiService] Error fetching from ${url}:`, err);
		}
		return {
			success: false,
			data: this.getEmptyDashboardData(),
			message: "تعذر جلب إحصائيات لوحة التحكم من السيرفر."
		};
	},
	/**
	* Safely map raw response data to normalized AdminAnalyticsDashboardData
	*/
	mapDashboardData(raw) {
		const summaryRaw = raw.summary || raw.kpi || raw.statistics || {};
		const chartRaw = raw.sales_chart || raw.chart || raw.chart_data || {};
		const statusCountsRaw = raw.order_status_counts || raw.order_statuses || raw.orders_count_by_status || {};
		const recentOrdersRaw = Array.isArray(raw.recent_orders) ? raw.recent_orders : Array.isArray(raw.orders) ? raw.orders : [];
		const topProductsRaw = Array.isArray(raw.top_selling_products) ? raw.top_selling_products : Array.isArray(raw.top_products) ? raw.top_products : [];
		const totalSales = Number(summaryRaw.total_sales ?? summaryRaw.sales ?? summaryRaw.revenue ?? 0);
		const totalSalesGrowth = Number(summaryRaw.total_sales_growth ?? summaryRaw.sales_growth ?? summaryRaw.revenue_growth ?? 0);
		const totalOrders = Number(summaryRaw.total_orders ?? summaryRaw.orders ?? summaryRaw.orders_count ?? 0);
		const totalOrdersGrowth = Number(summaryRaw.total_orders_growth ?? summaryRaw.orders_growth ?? 0);
		const totalCustomers = Number(summaryRaw.total_customers ?? summaryRaw.customers ?? summaryRaw.users_count ?? 0);
		const totalCustomersGrowth = Number(summaryRaw.total_customers_growth ?? summaryRaw.customers_growth ?? 0);
		const pendingOrders = Number(summaryRaw.pending_orders ?? statusCountsRaw.pending ?? statusCountsRaw.Pending ?? 0);
		const pendingOrdersGrowth = Number(summaryRaw.pending_orders_growth ?? summaryRaw.total_orders_growth ?? 0);
		const outOfStockProducts = Number(summaryRaw.out_of_stock_products ?? summaryRaw.out_of_stock ?? summaryRaw.stock_out_products ?? 0);
		const avgOrderValue = Number(summaryRaw.average_order_value ?? summaryRaw.avg_order_value ?? (totalOrders > 0 ? totalSales / totalOrders : 0));
		const avgOrderValueGrowth = Number(summaryRaw.average_order_value_growth ?? summaryRaw.avg_order_value_growth ?? 0);
		const currency = summaryRaw.currency || "SAR";
		const currencySymbol = summaryRaw.currency_symbol || summaryRaw.currency || "ر.س";
		const chartLabels = Array.isArray(chartRaw.labels) ? chartRaw.labels : Array.isArray(chartRaw.categories) ? chartRaw.categories : [];
		const chartSales = Array.isArray(chartRaw.sales) ? chartRaw.sales.map(Number) : Array.isArray(chartRaw.data) ? chartRaw.data.map(Number) : Array.isArray(chartRaw.series) ? chartRaw.series.map(Number) : [];
		const chartOrders = Array.isArray(chartRaw.orders) ? chartRaw.orders.map(Number) : [];
		const pendingCount = Number(statusCountsRaw.pending ?? statusCountsRaw.Pending ?? pendingOrders);
		const processingCount = Number(statusCountsRaw.processing ?? statusCountsRaw.Processing ?? statusCountsRaw.confirmed ?? 0);
		const deliveredCount = Number(statusCountsRaw.delivered ?? statusCountsRaw.Delivered ?? statusCountsRaw.completed ?? 0);
		const canceledCount = Number(statusCountsRaw.canceled ?? statusCountsRaw.cancelled ?? statusCountsRaw.Canceled ?? statusCountsRaw.Cancelled ?? 0);
		const recentOrders = recentOrdersRaw.map((item) => {
			const orderKey = String(item.order_key || item.id || item.order_id || "");
			const custObj = item.customer || item.user || {};
			const custName = typeof custObj === "object" ? custObj.name || `${custObj.f_name || ""} ${custObj.l_name || ""}`.trim() || "عميل نقدي" : typeof item.customer_name === "string" ? item.customer_name : "عميل نقدي";
			const custImage = normalizeAnalyticsImageUrl(custObj.image || item.customer_image, "");
			const orderAmount = Number(item.order_amount ?? item.total ?? item.order_total ?? 0);
			const orderStatus = String(item.order_status || item.status || "pending").toLowerCase();
			const createdAt = String(item.created_at || "");
			const createdAtHuman = String(item.created_at_human || item.created_at_formatted || item.created_at || "");
			return {
				id: item.id || orderKey,
				order_key: orderKey.startsWith("#") ? orderKey : `#${orderKey}`,
				customer: {
					id: custObj.id,
					name: custName,
					image: custImage,
					email: custObj.email,
					phone: custObj.phone
				},
				order_amount: orderAmount,
				order_status: orderStatus,
				payment_status: item.payment_status,
				created_at: createdAt,
				created_at_human: createdAtHuman
			};
		});
		const topProducts = topProductsRaw.map((p) => {
			const id = p.id || p.product_id;
			const name = p.name || p.product_name || "منتج غير محدد";
			const thumb = normalizeAnalyticsImageUrl(p.thumbnail || p.image || p.cover_image, "");
			const unitPrice = Number(p.unit_price ?? p.price ?? 0);
			const soldQuantity = Number(p.sold_quantity ?? p.quantity ?? p.qty ?? p.sales_count ?? 0);
			return {
				id,
				name,
				thumbnail: thumb,
				unit_price: unitPrice,
				sold_quantity: soldQuantity,
				total_revenue: Number(p.total_revenue ?? p.revenue ?? unitPrice * soldQuantity)
			};
		});
		return {
			summary: {
				total_sales: totalSales,
				total_sales_growth: isNaN(totalSalesGrowth) ? 0 : totalSalesGrowth,
				total_orders: totalOrders,
				total_orders_growth: isNaN(totalOrdersGrowth) ? 0 : totalOrdersGrowth,
				pending_orders: pendingOrders,
				pending_orders_growth: isNaN(pendingOrdersGrowth) ? 0 : pendingOrdersGrowth,
				total_customers: totalCustomers,
				total_customers_growth: isNaN(totalCustomersGrowth) ? 0 : totalCustomersGrowth,
				out_of_stock_products: outOfStockProducts,
				average_order_value: isNaN(avgOrderValue) ? 0 : avgOrderValue,
				average_order_value_growth: isNaN(avgOrderValueGrowth) ? 0 : avgOrderValueGrowth,
				currency,
				currency_symbol: currencySymbol
			},
			sales_chart: {
				labels: chartLabels,
				sales: chartSales,
				orders: chartOrders
			},
			order_status_counts: {
				pending: pendingCount,
				processing: processingCount,
				delivered: deliveredCount,
				canceled: canceledCount
			},
			recent_orders: recentOrders,
			top_selling_products: topProducts
		};
	},
	getEmptyDashboardData() {
		return {
			summary: {
				total_sales: 0,
				total_sales_growth: 0,
				total_orders: 0,
				total_orders_growth: 0,
				pending_orders: 0,
				pending_orders_growth: 0,
				total_customers: 0,
				total_customers_growth: 0,
				out_of_stock_products: 0,
				average_order_value: 0,
				average_order_value_growth: 0,
				currency: "SAR",
				currency_symbol: "ر.س"
			},
			sales_chart: {
				labels: [],
				sales: [],
				orders: []
			},
			order_status_counts: {
				pending: 0,
				processing: 0,
				delivered: 0,
				canceled: 0
			},
			recent_orders: [],
			top_selling_products: []
		};
	}
};

export { StatCard_default as S, adminAnalyticsApiService as a };
//# sourceMappingURL=adminAnalyticsApiService-Ck5WSGqn.mjs.map
