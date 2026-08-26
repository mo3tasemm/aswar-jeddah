import { g as useRuntimeConfig } from '../virtual/entry.mjs';

//#region services/apiConfig.ts
/**
* Central API Configuration for Aswar Store
* Supports dynamic environment variables in Vercel, Node, and local development.
*/
var getApiBaseUrl = () => {
	try {
		const config = useRuntimeConfig();
		if (config?.public?.apiBase && typeof config.public.apiBase === "string") return config.public.apiBase.replace(/\/+$/, "");
	} catch (e) {}
	if (typeof process !== "undefined" && process.env?.NUXT_PUBLIC_API_BASE) return process.env.NUXT_PUBLIC_API_BASE.replace(/\/+$/, "");
	return "https://ai-agunt.elbakry2.com/api/v1";
};
var API_BASE_URL = getApiBaseUrl();

export { API_BASE_URL as A };
//# sourceMappingURL=apiConfig-CCR2eNes.mjs.map
