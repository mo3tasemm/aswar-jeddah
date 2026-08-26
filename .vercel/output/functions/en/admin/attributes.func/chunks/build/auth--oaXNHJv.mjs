import { d as defineNuxtRouteMiddleware, u as useCookie, a as useToast, n as navigateTo } from '../virtual/entry.mjs';
import 'nostics';
import 'nostics/formatters/ansi';
import 'vue';
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
import 'vue/server-renderer';
import 'devalue';
import 'vue-router';
import '@vue/shared';

//#region middleware/auth.ts
/**
* Global Route Authentication Middleware
* Protects private customer routes like /checkout and /my-account/*
*/
var auth_default = defineNuxtRouteMiddleware((to) => {
	const tokenCookie = useCookie("auth_token").value || useCookie("token").value || useCookie("access_token").value;
	if (!Boolean(tokenCookie)) {
		useToast().info("تسجيل الدخول مطلوب", "يرجى تسجيل الدخول للوصول إلى هذه الصفحة.");
		return navigateTo(`/login?redirect=${encodeURIComponent(to.fullPath)}`);
	}
});

export { auth_default as default };
//# sourceMappingURL=auth--oaXNHJv.mjs.map
