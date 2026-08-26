import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { defineProdDiagnostics } from 'nostics';
import { ansiFormatter } from 'nostics/formatters/ansi';
import { shallowReactive, reactive, effectScope, getCurrentScope, hasInjectionContext, getCurrentInstance, inject, toRef, ref, customRef, defineComponent, shallowRef, h, resolveComponent, computed, unref, isRef, toValue, onServerPrefetch, nextTick, queuePostFlushCb, createApp, provide, onErrorCaptured, createVNode, resolveDynamicComponent, defineAsyncComponent, mergeProps, isReadonly, useSSRContext, isShallow, isReactive, toRaw, isVNode, createCommentVNode, withCtx, Suspense, Fragment } from 'vue';
import { c as createError, m as hasProtocol, n as isScriptProtocol, i as joinURL, w as withQuery, s as sanitizeStatusCode, o as parseURL, e as encodePath, q as decodePath, r as klona, v as getRequestHeader, x as isEqual, y as setCookie, z as getCookie, A as deleteCookie, $ as $fetch, B as defu, p as parseQuery, C as withTrailingSlash, D as withoutTrailingSlash } from '../_/nitro.mjs';
import { b as baseURL } from '../routes/renderer.mjs';
import { START_LOCATION, createMemoryHistory, createRouter, useRoute as useRoute$1, RouterView } from 'vue-router';
import { isPlainObject } from '@vue/shared';
import { ssrRenderSuspense, ssrRenderComponent, ssrRenderVNode } from 'vue/server-renderer';

function flatHooks(configHooks, hooks = {}, parentName) {
	for (const key in configHooks) {
		const subHook = configHooks[key];
		const name = parentName ? `${parentName}:${key}` : key;
		if (typeof subHook === "object" && subHook !== null) flatHooks(subHook, hooks, name);
		else if (typeof subHook === "function") hooks[name] = subHook;
	}
	return hooks;
}
const createTask = /* @__PURE__ */ (() => {
	if (console.createTask) return console.createTask;
	const defaultTask = { run: (fn) => fn() };
	return () => defaultTask;
})();
function callHooks(hooks, args, startIndex, task) {
	for (let i = startIndex; i < hooks.length; i += 1) try {
		const result = task ? task.run(() => hooks[i](...args)) : hooks[i](...args);
		if (result && typeof result.then === "function") return Promise.resolve(result).then(() => callHooks(hooks, args, i + 1, task));
	} catch (error) {
		return Promise.reject(error);
	}
}
function serialTaskCaller(hooks, args, name) {
	if (hooks.length > 0) return callHooks(hooks, args, 0, createTask(name));
}
function parallelTaskCaller(hooks, args, name) {
	if (hooks.length > 0) {
		const task = createTask(name);
		return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
	}
}
function callEachWith(callbacks, arg0) {
	for (const callback of [...callbacks]) callback(arg0);
}
var Hookable = class {
	_hooks;
	_before;
	_after;
	_deprecatedHooks;
	_deprecatedMessages;
	constructor() {
		this._hooks = {};
		this._before = void 0;
		this._after = void 0;
		this._deprecatedMessages = void 0;
		this._deprecatedHooks = {};
		this.hook = this.hook.bind(this);
		this.callHook = this.callHook.bind(this);
		this.callHookWith = this.callHookWith.bind(this);
	}
	hook(name, function_, options = {}) {
		if (!name || typeof function_ !== "function") return () => {};
		const originalName = name;
		let dep;
		while (this._deprecatedHooks[name]) {
			dep = this._deprecatedHooks[name];
			name = dep.to;
		}
		if (dep && !options.allowDeprecated) {
			let message = dep.message;
			if (!message) message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
			if (!this._deprecatedMessages) this._deprecatedMessages = /* @__PURE__ */ new Set();
			if (!this._deprecatedMessages.has(message)) {
				console.warn(message);
				this._deprecatedMessages.add(message);
			}
		}
		if (!function_.name) try {
			Object.defineProperty(function_, "name", {
				get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
				configurable: true
			});
		} catch {}
		this._hooks[name] = this._hooks[name] || [];
		this._hooks[name].push(function_);
		return () => {
			if (function_) {
				this.removeHook(name, function_);
				function_ = void 0;
			}
		};
	}
	hookOnce(name, function_) {
		let _unreg;
		let _function = (...arguments_) => {
			if (typeof _unreg === "function") _unreg();
			_unreg = void 0;
			_function = void 0;
			return function_(...arguments_);
		};
		_unreg = this.hook(name, _function);
		return _unreg;
	}
	removeHook(name, function_) {
		const hooks = this._hooks[name];
		if (hooks) {
			const index = hooks.indexOf(function_);
			if (index !== -1) hooks.splice(index, 1);
			if (hooks.length === 0) this._hooks[name] = void 0;
		}
	}
	clearHook(name) {
		this._hooks[name] = void 0;
	}
	deprecateHook(name, deprecated) {
		this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
		const _hooks = this._hooks[name] || [];
		this._hooks[name] = void 0;
		for (const hook of _hooks) this.hook(name, hook);
	}
	deprecateHooks(deprecatedHooks) {
		for (const name in deprecatedHooks) this.deprecateHook(name, deprecatedHooks[name]);
	}
	addHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
		return () => {
			for (const unreg of removeFns) unreg();
			removeFns.length = 0;
		};
	}
	removeHooks(configHooks) {
		const hooks = flatHooks(configHooks);
		for (const key in hooks) this.removeHook(key, hooks[key]);
	}
	removeAllHooks() {
		this._hooks = {};
	}
	callHook(name, ...args) {
		return this.callHookWith(serialTaskCaller, name, args);
	}
	callHookParallel(name, ...args) {
		return this.callHookWith(parallelTaskCaller, name, args);
	}
	callHookWith(caller, name, args) {
		const event = this._before || this._after ? {
			name,
			args,
			context: {}
		} : void 0;
		if (this._before) callEachWith(this._before, event);
		const result = caller(this._hooks[name] ? [...this._hooks[name]] : [], args, name);
		if (result instanceof Promise) return result.finally(() => {
			if (this._after && event) callEachWith(this._after, event);
		});
		if (this._after && event) callEachWith(this._after, event);
		return result;
	}
	beforeEach(function_) {
		this._before = this._before || [];
		this._before.push(function_);
		return () => {
			if (this._before !== void 0) {
				const index = this._before.indexOf(function_);
				if (index !== -1) this._before.splice(index, 1);
			}
		};
	}
	afterEach(function_) {
		this._after = this._after || [];
		this._after.push(function_);
		return () => {
			if (this._after !== void 0) {
				const index = this._after.indexOf(function_);
				if (index !== -1) this._after.splice(index, 1);
			}
		};
	}
};
function createHooks() {
	return new Hookable();
}

function _getAsyncLocalStorage() {
	return globalThis.AsyncLocalStorage || globalThis.process?.getBuiltinModule?.("node:async_hooks")?.AsyncLocalStorage;
}
function createContext(opts = {}) {
	let currentInstance;
	let isSingleton = false;
	const checkConflict = (instance) => {
		if (currentInstance && currentInstance !== instance) throw new Error("Context conflict");
	};
	let als;
	if (opts.asyncContext) {
		const _AsyncLocalStorage = opts.AsyncLocalStorage || _getAsyncLocalStorage();
		if (_AsyncLocalStorage) als = new _AsyncLocalStorage();
		else console.warn("[unctx] `AsyncLocalStorage` is not provided.");
	}
	const _wrapInstance = (instance) => als && instance !== null && typeof instance === "object" ? { __unctx_weak: new WeakRef(instance) } : instance;
	const _unwrapInstance = (store) => store && store.__unctx_weak ? store.__unctx_weak.deref() : store;
	const _getCurrentInstance = () => {
		if (als) {
			const store = als.getStore();
			if (store !== void 0) return _unwrapInstance(store);
		}
		return currentInstance;
	};
	return {
		use: () => {
			const _instance = _getCurrentInstance();
			if (_instance === void 0) throw new Error("Context is not available");
			return _instance;
		},
		tryUse: () => {
			return _getCurrentInstance();
		},
		set: (instance, replace) => {
			if (!replace) checkConflict(instance);
			currentInstance = instance;
			isSingleton = true;
		},
		unset: () => {
			currentInstance = void 0;
			isSingleton = false;
		},
		call: (instance, callback) => {
			checkConflict(instance);
			currentInstance = instance;
			try {
				return als ? als.run(_wrapInstance(instance), callback) : callback();
			} finally {
				if (!isSingleton) currentInstance = void 0;
			}
		},
		async callAsync(instance, callback) {
			currentInstance = instance;
			const onRestore = () => {
				currentInstance = instance;
			};
			const onLeave = () => currentInstance === instance ? onRestore : void 0;
			asyncHandlers.add(onLeave);
			try {
				const r = als ? als.run(_wrapInstance(instance), callback) : callback();
				if (!isSingleton) currentInstance = void 0;
				return await r;
			} finally {
				asyncHandlers.delete(onLeave);
			}
		}
	};
}
function createNamespace(defaultOpts = {}) {
	const contexts = {};
	return { get(key, opts = {}) {
		if (!contexts[key]) contexts[key] = createContext({
			...defaultOpts,
			...opts
		});
		return contexts[key];
	} };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());
function executeAsync(function_) {
	const restores = [];
	for (const leaveHandler of asyncHandlers) {
		const restore = leaveHandler();
		if (restore) restores.push(restore);
	}
	const restore = () => {
		for (const restore of restores) restore();
	};
	let awaitable = function_();
	if (awaitable && typeof awaitable === "object" && "catch" in awaitable) awaitable = awaitable.catch((error) => {
		restore();
		throw error;
	});
	return [awaitable, restore];
}

//#region node_modules/nuxt/dist/app/diagnostics/_shared.js
/**
* Shared configuration for the runtime (E<N>xxx) diagnostics catalogs.
*
* Catalogs are split by domain and imported directly where used (no barrel),
* so the browser bundle only pulls in the codes a module references. Pair the
* pure-call annotations on each `defineDiagnostics()` with dev-guarded,
* statement-level report calls so report-only diagnostics strip from production.
*
* Codes are stable, fully-qualified `NUXT_E<NNNN>` identifiers. Codes with a
* dedicated docs page resolve a `see:` URL via {@link docsBase}; the rest opt
* out with `docs: false`.
*/
function docsBase(code) {
	return `https://nuxt.com/docs/4.x/errors/${code.replace("NUXT_", "").toLowerCase()}`;
}
var ansi = (open, close) => (s) => `\x1B[${open}m${s}\x1B[${close}m`;
var colors = {
	red: ansi(31, 39),
	yellow: ansi(33, 39),
	cyan: ansi(36, 39),
	gray: ansi(90, 39),
	bold: ansi(1, 22),
	dim: ansi(2, 22)
};
ansiFormatter(colors);
var prodReporter = (diagnostic) => {
	console.error(`[${diagnostic.name}]`);
};
var prodReporters = [prodReporter];
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/core.js
/**
* E1xxx
* Core / Nuxt-instance / lifecycle runtime diagnostics.
*/
var appDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fnuxt.config.mjs
var nuxtLinkDefaults = {
	"componentName": "NuxtLink"};
var asyncDataDefaults = { "deep": false };
var fetchDefaults = {};
//#endregion
//#region node_modules/nuxt/dist/app/nuxt.js
function getNuxtAppCtx(id = "nuxt-app") {
	return getContext(id, { asyncContext: false });
}
var NuxtPluginIndicator = "__nuxt_plugin";
/** @since 3.0.0 */
function createNuxtApp(options) {
	let hydratingCount = 0;
	const nuxtApp = {
		_id: options.id || "nuxt-app",
		_scope: effectScope(),
		provide: void 0,
		versions: {
			get nuxt() {
				return "4.5.1";
			},
			get vue() {
				return nuxtApp.vueApp.version;
			}
		},
		payload: shallowReactive({
			...options.ssrContext?.payload || {},
			data: shallowReactive({}),
			state: reactive({}),
			once: /* @__PURE__ */ new Set(),
			_errors: shallowReactive({})
		}),
		static: { data: {} },
		runWithContext(fn) {
			if (nuxtApp._scope.active && !getCurrentScope()) return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
			return callWithNuxt(nuxtApp, fn);
		},
		isHydrating: false,
		deferHydration() {
			if (!nuxtApp.isHydrating) return () => {};
			hydratingCount++;
			let called = false;
			return () => {
				if (called) return;
				called = true;
				hydratingCount--;
				if (hydratingCount === 0) {
					nuxtApp.isHydrating = false;
					return nuxtApp.callHook("app:suspense:resolve");
				}
			};
		},
		_asyncDataPromises: {},
		_asyncData: shallowReactive({}),
		_state: shallowReactive({}),
		_payloadRevivers: {},
		...options
	};
	nuxtApp.payload.serverRendered = true;
	if (nuxtApp.ssrContext) {
		nuxtApp.payload.path = nuxtApp.ssrContext.url;
		nuxtApp.ssrContext.nuxt = nuxtApp;
		nuxtApp.ssrContext.payload = nuxtApp.payload;
		nuxtApp.ssrContext.config = {
			public: nuxtApp.ssrContext.runtimeConfig.public,
			app: nuxtApp.ssrContext.runtimeConfig.app
		};
	}
	nuxtApp.hooks = createHooks();
	nuxtApp.hook = nuxtApp.hooks.hook;
	{
		const contextCaller = async function(hooks, args) {
			for (const hook of hooks) await nuxtApp.runWithContext(() => hook(...args));
		};
		nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, args);
	}
	nuxtApp.callHook = nuxtApp.hooks.callHook;
	nuxtApp.provide = (name, value) => {
		const $name = "$" + name;
		defineGetter(nuxtApp, $name, value);
		defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
	};
	defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
	defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
	const runtimeConfig = options.ssrContext.runtimeConfig;
	nuxtApp.provide("config", runtimeConfig);
	return nuxtApp;
}
/** @since 3.0.0 */
async function applyPlugin(nuxtApp, plugin) {
	if (typeof plugin === "function") {
		const run = () => nuxtApp.runWithContext(() => plugin(nuxtApp));
		const { provide } = await run() || {};
		if (provide && typeof provide === "object") for (const key in provide) nuxtApp.provide(key, provide[key]);
	}
}
/** @since 3.0.0 */
async function applyPlugins(nuxtApp, plugins) {
	let error;
	for (const plugin of plugins) try {
		await applyPlugin(nuxtApp, plugin);
	} catch (e) {
		if (!nuxtApp.payload.error) throw e;
		error ||= e;
	}
	if (error) throw nuxtApp.payload.error || error;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtPlugin(plugin) {
	if (typeof plugin === "function") return plugin;
	const _name = plugin._name || plugin.name;
	delete plugin.name;
	return Object.assign(plugin.setup || (() => {}), plugin, {
		[NuxtPluginIndicator]: true,
		_name
	});
}
/**
* Ensures that the setup function passed in has access to the Nuxt instance via `useNuxtApp`.
* @param nuxt A Nuxt instance
* @param setup The function to call
* @since 3.0.0
*/
function callWithNuxt(nuxt, setup, args) {
	const fn = () => setup();
	const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
	return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
}
function tryUseNuxtApp(id) {
	let nuxtAppInstance;
	if (hasInjectionContext()) nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
	nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
	return nuxtAppInstance || null;
}
function useNuxtApp(id) {
	const nuxtAppInstance = tryUseNuxtApp(id);
	if (!nuxtAppInstance) throw appDiagnostics.NUXT_E1001();
	return nuxtAppInstance;
}
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function useRuntimeConfig(_event) {
	return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
	Object.defineProperty(obj, key, { get: () => val });
}

//#region node_modules/nuxt/dist/app/utils.js
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
//#endregion
//#region node_modules/nuxt/dist/app/components/injections.js
var LayoutMetaSymbol = Symbol("layout-meta");
var LayoutSymbol = Symbol("layout");
var PageRouteSymbol = Symbol("route");
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/navigation.js
/**
* E2xxx
* Navigation / routing / middleware runtime diagnostics.
*/
var navigationDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/router.js
/** @since 3.0.0 */
var useRouter = () => {
	return useNuxtApp()?.$router;
};
/**
* Whether the current effect scope is (a descendant of) the component instance's scope.
* A detached scope (e.g. `createSharedComposable`) outlives the component, so the
* per-page route injected there would freeze after navigation (#18903).
*/
function isScopeWithinInstance(instance) {
	const instanceScope = instance.scope;
	let scope = getCurrentScope();
	while (scope) {
		if (scope === instanceScope) return true;
		scope = scope.parent;
	}
	return false;
}
/** @since 3.0.0 */
var useRoute = (() => {
	if (hasInjectionContext()) {
		const instance = getCurrentInstance();
		if (!instance || isScopeWithinInstance(instance)) return inject(PageRouteSymbol, useNuxtApp()._route);
	}
	return useNuxtApp()._route;
});
/** @since 3.0.0 */
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtRouteMiddleware(middleware) {
	return middleware;
}
/** @since 3.0.0 */
var isProcessingMiddleware = () => {
	try {
		if (useNuxtApp()._processingMiddleware) return true;
	} catch {
		return false;
	}
	return false;
};
var HTML_ATTR_UNSAFE_RE = /[&"'<>]/g;
var HTML_ATTR_ENCODE_MAP = {
	"&": "&amp;",
	"\"": "&quot;",
	"'": "&#x27;",
	"<": "&lt;",
	">": "&gt;"
};
function encodeForHtmlAttr(value) {
	return value.replace(HTML_ATTR_UNSAFE_RE, (c) => HTML_ATTR_ENCODE_MAP[c]);
}
/**
* A helper that aids in programmatic navigation within your Nuxt application.
*
* Can be called on the server and on the client, within pages, route middleware, plugins, and more.
* @param {RouteLocationRaw | undefined | null} [to] - The route to navigate to. Accepts a route object, string path, `undefined`, or `null`. Defaults to '/'.
* @param {NavigateToOptions} [options] - Optional customization for controlling the behavior of the navigation.
* @returns {Promise<void | NavigationFailure | false> | false | void | RouteLocationRaw} The navigation result, which varies depending on context and options.
* @see https://nuxt.com/docs/4.x/api/utils/navigate-to
* @since 3.0.0
*/
var navigateTo = (to, options) => {
	to ||= "/";
	const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject(to) : useRouter().resolve(to).href;
	const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
	const isExternal = options?.external || isExternalHost;
	if (isExternal) {
		if (!options?.external) throw navigationDiagnostics.NUXT_E2001({ toPath });
		const { protocol } = new URL(toPath, "http://localhost");
		if (protocol && isScriptProtocol(protocol)) throw navigationDiagnostics.NUXT_E2002({
			toPath,
			protocol
		});
	}
	const inMiddleware = isProcessingMiddleware();
	const router = useRouter();
	const nuxtApp = useNuxtApp();
	if (nuxtApp.ssrContext) {
		const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
		const location = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
		const redirect = async function(response) {
			await nuxtApp.callHook("app:redirected");
			const encodedHeader = encodeURL(location, isExternalHost);
			const encodedLoc = encodeForHtmlAttr(encodedHeader);
			nuxtApp.ssrContext["~renderResponse"] = {
				statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
				body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
				headers: { location: encodedHeader }
			};
			return response;
		};
		if (!isExternal && inMiddleware) {
			router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
			return to;
		}
		return redirect(!inMiddleware ? void 0 : false);
	}
	if (isExternal) {
		nuxtApp._scope.stop();
		if (options?.replace) (void 0).replace(toPath);
		else (void 0).href = toPath;
		if (inMiddleware) {
			if (!nuxtApp.isHydrating) return false;
			return new Promise(() => {});
		}
		return Promise.resolve();
	}
	const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
	return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
/**
* @internal
*/
function resolveRouteObject(to) {
	return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
/**
* @internal
*/
function encodeURL(location, isExternalHost = false) {
	const url = new URL(location, "http://localhost");
	if (!isExternalHost) return url.pathname.replace(/^\/{2,}/, "/") + url.search + url.hash;
	if (location.startsWith("//")) return url.toString().replace(url.protocol, "");
	return url.toString();
}
/**
* Encode the pathname of a route location string. Ensures decoded paths like
* `/café` are percent-encoded to match vue-router's encoded route records.
* Already-encoded paths are not double-encoded.
* @internal
*/
function encodeRoutePath(url) {
	const parsed = parseURL(url);
	return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/error.js
var NUXT_ERROR_SIGNATURE = "__nuxt_error";
/** @since 3.0.0 */
var useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
/** @since 3.0.0 */
var showError = (error) => {
	const nuxtError = createError$1(error);
	try {
		const error = /* @__PURE__ */ useError();
		error.value ||= nuxtError;
	} catch {
		throw nuxtError;
	}
	return nuxtError;
};
/**
* Show the error page unless the current client is a crawler, in which case the
* bot receives the already server-rendered HTML instead (#32137, #35338).
*
* @internal
*/
var _showErrorUnlessCrawler = async (nuxtApp, error) => {
	await nuxtApp.runWithContext(() => showError(error));
};
/** @since 3.0.0 */
var isNuxtError = (error) => !!error && typeof error === "object" && "__nuxt_error" in error;
/** @since 3.0.0 */
var createError$1 = (error) => {
	if (typeof error !== "string" && error.statusText) error.message ??= error.statusText;
	const nuxtError = createError(error);
	Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
		value: true,
		configurable: false,
		writable: false
	});
	Object.defineProperty(nuxtError, "status", {
		get: () => nuxtError.statusCode,
		configurable: true
	});
	Object.defineProperty(nuxtError, "statusText", {
		get: () => nuxtError.statusMessage,
		configurable: true
	});
	return nuxtError;
};

//#region node_modules/nuxt/dist/app/diagnostics/state.js
/**
* E7xxx
* Payload / state / cookie runtime diagnostics.
*/
var stateDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});

function endIndex(str, min, len) {
	const index = str.indexOf(";", min);
	return index === -1 ? len : index;
}
function eqIndex(str, min, max) {
	const index = str.indexOf("=", min);
	return index < max ? index : -1;
}
function valueSlice(str, min, max) {
	if (min === max) return "";
	let start = min;
	let end = max;
	do {
		const code = str.charCodeAt(start);
		if (code !== 32 && code !== 9) break;
	} while (++start < end);
	while (end > start) {
		const code = str.charCodeAt(end - 1);
		if (code !== 32 && code !== 9) break;
		end--;
	}
	return str.slice(start, end);
}
const NullObject = /* @__PURE__ */ (() => {
	const C = function() {};
	C.prototype = Object.create(null);
	return C;
})();
function parse(str, options) {
	const obj = new NullObject();
	const len = str.length;
	if (len < 2) return obj;
	const dec = options?.decode || decode;
	const allowMultiple = options?.allowMultiple || false;
	let index = 0;
	do {
		const eqIdx = eqIndex(str, index, len);
		if (eqIdx === -1) break;
		const endIdx = endIndex(str, index, len);
		if (eqIdx > endIdx) {
			index = str.lastIndexOf(";", eqIdx - 1) + 1;
			continue;
		}
		const key = valueSlice(str, index, eqIdx);
		if (options?.filter && !options.filter(key)) {
			index = endIdx + 1;
			continue;
		}
		const val = dec(valueSlice(str, eqIdx + 1, endIdx));
		if (allowMultiple) {
			const existing = obj[key];
			if (existing === void 0) obj[key] = val;
			else if (Array.isArray(existing)) existing.push(val);
			else obj[key] = [existing, val];
		} else if (obj[key] === void 0) obj[key] = val;
		index = endIdx + 1;
	} while (index < len);
	return obj;
}
function decode(str) {
	if (!str.includes("%")) return str;
	try {
		return decodeURIComponent(str);
	} catch {
		return str;
	}
}

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Ffetch.mjs
if (!globalThis.$fetch) globalThis.$fetch = $fetch.create({ baseURL: baseURL() });
var $fetch$2 = globalThis.$fetch;
//#endregion
//#region node_modules/nuxt/dist/app/composables/ssr.js
var $fetch$1$1 = $fetch$2;
/** @since 3.0.0 */
function useRequestEvent(nuxtApp) {
	nuxtApp ||= useNuxtApp();
	return nuxtApp.ssrContext?.event;
}
/** @since 3.2.0 */
function useRequestFetch() {
	return useRequestEvent()?.$fetch || $fetch$1$1;
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/cookie.js
function parseCookieValue(value) {
	if (value === "undefined") return;
	try {
		const parsed = JSON.parse(value);
		if (typeof parsed === "number" && String(parsed) !== value) return value;
		return parsed;
	} catch {
		return value;
	}
}
var CookieDefaults = {
	path: "/",
	watch: true,
	decode: (val) => val ? parseCookieValue(decodeURIComponent(val)) : val,
	encode: (val) => {
		if (typeof val !== "string" || val === "undefined") return encodeURIComponent(JSON.stringify(val));
		try {
			if (typeof JSON.parse(val) !== "string") return encodeURIComponent(JSON.stringify(val));
		} catch {}
		return encodeURIComponent(val);
	},
	refresh: false
};
function useCookie(name, _opts) {
	const opts = {
		...CookieDefaults,
		..._opts
	};
	opts.filter ??= (key) => key === name;
	const cookies = readRawCookies(opts) || {};
	let delay;
	if (opts.maxAge !== void 0) delay = opts.maxAge * 1e3;
	else if (opts.expires) delay = opts.expires.getTime() - Date.now();
	const cookie = cookieServerRef(name, klona(delay !== void 0 && delay <= 0 ? void 0 : cookies[name] ?? opts.default?.()));
	{
		const nuxtApp = useNuxtApp();
		const writeFinalCookieValue = () => {
			const valueIsSame = isEqual(cookie.value, cookies[name]);
			if (opts.readonly || valueIsSame && !opts.refresh) return;
			nuxtApp._cookiesChanged ||= {};
			if (valueIsSame && opts.refresh && !nuxtApp._cookiesChanged[name]) return;
			nuxtApp._cookies ||= {};
			if (name in nuxtApp._cookies) {
				if (isEqual(cookie.value, nuxtApp._cookies[name])) return;
			}
			nuxtApp._cookies[name] = cookie.value;
			const encoded = cookie.value === null || cookie.value === void 0 ? void 0 : opts.encode(cookie.value);
			writeServerCookie(useRequestEvent(nuxtApp), name, encoded, opts);
		};
		const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
		nuxtApp.hooks.hookOnce("app:error", () => {
			unhook();
			return writeFinalCookieValue();
		});
	}
	return cookie;
}
function readRawCookies(opts = {}) {
	return parse(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
}
var identityEncode = (val) => val;
function toSerializeOptions(opts) {
	const { encode: _encode, decode: _decode, ...rest } = opts;
	return {
		...rest,
		encode: identityEncode
	};
}
function writeServerCookie(event, name, value, opts = {}) {
	if (event) {
		const serializeOpts = toSerializeOptions(opts);
		if (value !== void 0) return setCookie(event, name, value, serializeOpts);
		if (getCookie(event, name) !== void 0) return deleteCookie(event, name, serializeOpts);
	}
}
/**
* Custom ref that tracks explicit cookie writes on the server.
*
* This is required for the `refresh` option to ensure the cookie is
* re-written on SSR even when the value remains unchanged.
*/
function cookieServerRef(name, value) {
	const internalRef = ref(value);
	const nuxtApp = useNuxtApp();
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return internalRef.value;
			},
			set(newValue) {
				nuxtApp._cookiesChanged ||= {};
				nuxtApp._cookiesChanged[name] = true;
				internalRef.value = newValue;
				trigger();
			}
		};
	});
}

//#region node_modules/nuxt/dist/app/components/utils.js
/**
* Internal utility
* @private
*/
var _wrapInTransition = (props, children) => {
	return { default: () => children.default?.() };
};
var ROUTE_KEY_PARENTHESES_RE$1 = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE$1 = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE$1 = /:\w+/g;
function generateRouteKey$1(route) {
	const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE$1, "$1").replace(ROUTE_KEY_SYMBOLS_RE$1, "$1").replace(ROUTE_KEY_NORMAL_RE$1, (r) => route.params[r.slice(1)]?.toString() || "");
	return typeof source === "function" ? source(route) : source;
}
/**
* Utility used within router guards
* return true if the route has been changed with a page change during navigation
*/
function isChangingPage(to, from) {
	if (to === from || from === START_LOCATION) return false;
	if (generateRouteKey$1(to) !== generateRouteKey$1(from)) return true;
	if (to.matched.every((comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default)) return false;
	return true;
}
var VALID_TAG_RE = /^[a-z][a-z0-9-]*$/i;
/** Return `tag` if it is a safe HTML tag name, otherwise `fallback`. */
function sanitizeTag(tag, fallback) {
	return tag && VALID_TAG_RE.test(tag) ? tag : fallback;
}
function toArray$1(value) {
	return Array.isArray(value) ? value : [value];
}
/**
* Internal utility
* @private
*/
function _mergeTransitionProps(routeProps) {
	const _props = [];
	for (const prop of routeProps) {
		if (!prop) continue;
		_props.push({
			...prop,
			onAfterLeave: prop.onAfterLeave ? toArray$1(prop.onAfterLeave) : void 0,
			onBeforeLeave: prop.onBeforeLeave ? toArray$1(prop.onBeforeLeave) : void 0
		});
	}
	return defu(..._props);
}

//#region node_modules/nuxt/dist/pages/runtime/router.options.js
var router_options_default = { scrollBehavior(to, from, savedPosition) {
	const nuxtApp = useNuxtApp();
	const router = useRouter();
	const hashScrollBehaviour = router.options?.scrollBehaviorType ?? "auto";
	if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
		if (from.hash && !to.hash) return savedPosition ?? {
			left: 0,
			top: 0
		};
		if (to.hash) return {
			el: to.hash,
			top: _getHashElementScrollMarginTop(to.hash),
			behavior: hashScrollBehaviour
		};
		return false;
	}
	if ((typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop) === false) return false;
	if (from === START_LOCATION) return _calculatePosition(to, from, savedPosition, hashScrollBehaviour);
	return new Promise((resolve) => {
		const doScroll = () => {
			requestAnimationFrame(() => {
				if (router.currentRoute.value.fullPath !== to.fullPath) {
					resolve(false);
					return;
				}
				resolve(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
			});
		};
		nuxtApp.hooks.hookOnce("page:loading:end", () => {
			const transitionPromise = nuxtApp["~transitionPromise"];
			if (transitionPromise) transitionPromise.then(doScroll);
			else doScroll();
		});
	});
} };
function _getHashElementScrollMarginTop(selector) {
	try {
		const elem = (void 0).querySelector(selector);
		if (elem) return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
	} catch {}
	return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
	if (savedPosition) return savedPosition;
	if (to.hash) return {
		el: to.hash,
		top: _getHashElementScrollMarginTop(to.hash),
		behavior: isChangingPage(to, from) ? defaultHashScrollBehaviour : "instant"
	};
	return {
		left: 0,
		top: 0
	};
}
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default = {
	hashMode: false,
	scrollBehaviorType: "auto",
	...router_options_default
};
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-link.js
var firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
/**
* Reject URL strings that would resolve to a script-capable protocol when used as the
* `href` of an anchor element. Returns the value unchanged when safe, or `null`.
*
* The denylist is delegated to `ufo`'s `isScriptProtocol` so it stays in sync with the
* check used by `navigateTo` (currently `javascript:`, `data:`, `vbscript:`, `blob:`).
* ASCII whitespace and control characters are stripped first because browser URL
* parsers tolerate them before the scheme, and `view-source:` is peeled recursively
* because Chromium resolves it transparently to the inner URL.
*/
function sanitizeExternalHref(value) {
	let candidate = value.replace(/[\u0000-\u001F\s]+/g, "");
	while (candidate.toLowerCase().startsWith("view-source:")) candidate = candidate.slice(12);
	const colon = candidate.indexOf(":");
	if (colon > 0 && isScriptProtocol(candidate.slice(0, colon + 1))) return null;
	return value;
}
/* @__NO_SIDE_EFFECTS__ */
function defineNuxtLink(options) {
	const componentName = options.componentName || "NuxtLink";
	function isHashLinkWithoutHashMode(link) {
		return typeof link === "string" && link.startsWith("#");
	}
	function resolveTrailingSlashBehavior(to, resolve, trailingSlash) {
		const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
		if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") return to;
		if (typeof to === "string") return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
		const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
		return {
			...to,
			name: void 0,
			path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
		};
	}
	function useNuxtLink(props) {
		const router = useRouter();
		const config = /* @__PURE__ */ useRuntimeConfig();
		const hasTarget = computed(() => !!unref(props.target) && unref(props.target) !== "_self");
		const isAbsoluteUrl = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
		});
		const builtinRouterLink = resolveComponent("RouterLink");
		const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
		const isExternal = computed(() => {
			if (unref(props.external)) return true;
			const path = unref(props.to) || unref(props.href) || "";
			if (typeof path === "object") return false;
			return path === "" || isAbsoluteUrl.value;
		});
		const to = computed(() => {
			const path = unref(props.to) || unref(props.href) || "";
			if (isExternal.value) return path;
			return resolveTrailingSlashBehavior(path, router.resolve, unref(props.trailingSlash));
		});
		const link = isExternal.value ? void 0 : useBuiltinLink?.({
			...props,
			to,
			viewTransition: unref(props.viewTransition)
		});
		const href = computed(() => {
			const effectiveTrailingSlash = unref(props.trailingSlash) ?? options.trailingSlash;
			if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
				const raw = to.value;
				return typeof raw === "string" ? sanitizeExternalHref(raw) : raw;
			}
			if (isExternal.value) {
				const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject(to.value) : to.value;
				const href = typeof path === "object" ? router.resolve(path).href : path;
				const safe = typeof href === "string" ? sanitizeExternalHref(href) : href;
				return safe === null ? null : applyTrailingSlashBehavior(safe, effectiveTrailingSlash);
			}
			if (typeof to.value === "object") return router.resolve(to.value)?.href ?? null;
			return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
		});
		return {
			to,
			hasTarget,
			isAbsoluteUrl,
			isExternal,
			href,
			isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
			isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
			route: link?.route ?? computed(() => router.resolve(to.value)),
			async navigate(_e) {
				if (href.value === null) return;
				await navigateTo(href.value, {
					replace: unref(props.replace),
					external: isExternal.value || hasTarget.value
				});
			}
		};
	}
	return defineComponent({
		name: componentName,
		props: {
			to: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			href: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			target: {
				type: String,
				default: void 0,
				required: false
			},
			rel: {
				type: String,
				default: void 0,
				required: false
			},
			noRel: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			prefetchOn: {
				type: [String, Object],
				default: void 0,
				required: false
			},
			noPrefetch: {
				type: Boolean,
				default: void 0,
				required: false
			},
			activeClass: {
				type: String,
				default: void 0,
				required: false
			},
			exactActiveClass: {
				type: String,
				default: void 0,
				required: false
			},
			prefetchedClass: {
				type: String,
				default: void 0,
				required: false
			},
			replace: {
				type: Boolean,
				default: void 0,
				required: false
			},
			ariaCurrentValue: {
				type: String,
				default: void 0,
				required: false
			},
			external: {
				type: Boolean,
				default: void 0,
				required: false
			},
			custom: {
				type: Boolean,
				default: void 0,
				required: false
			},
			trailingSlash: {
				type: String,
				default: void 0,
				required: false
			}
		},
		useLink: useNuxtLink,
		setup(props, { slots }) {
			const router = useRouter();
			const { to, href, navigate, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
			const prefetched = shallowRef(false);
			const el = void 0;
			const elRef = void 0;
			function shouldPrefetch(mode) {
				return false;
			}
			async function prefetch(nuxtApp = useNuxtApp()) {}
			return () => {
				const target = props.target || null;
				const rel = firstNonUndefined(props.noRel ? "" : props.rel, options.externalRelAttribute, isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : "") || null;
				const getCustomSlotProps = (routerLinkSlotProps) => ({
					href: href.value,
					navigate,
					get route() {
						if (!href.value) return;
						const url = new URL(href.value, "http://localhost");
						return {
							path: url.pathname,
							fullPath: url.pathname,
							get query() {
								return parseQuery(url.search);
							},
							hash: url.hash,
							params: {},
							name: void 0,
							matched: [],
							redirectedFrom: void 0,
							meta: {},
							href: href.value
						};
					},
					rel,
					target,
					isExternal: isExternal.value || hasTarget.value,
					isActive: false,
					isExactActive: false,
					...routerLinkSlotProps,
					prefetch,
					prefetched: prefetched.value,
					shouldPrefetch
				});
				if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
					const routerLinkProps = {
						ref: elRef,
						to: to.value,
						activeClass: props.activeClass || options.activeClass,
						exactActiveClass: props.exactActiveClass || options.exactActiveClass,
						replace: props.replace,
						ariaCurrentValue: props.ariaCurrentValue,
						custom: props.custom
					};
					if (!props.custom) routerLinkProps.rel = props.rel || void 0;
					return h(resolveComponent("RouterLink"), routerLinkProps, props.custom && slots.default ? { default: (slotProps) => slots.default(getCustomSlotProps(slotProps)) } : slots.default);
				}
				if (props.custom) {
					if (!slots.default) return null;
					return slots.default(getCustomSlotProps());
				}
				return h("a", {
					ref: el,
					href: href.value || null,
					rel,
					target,
					onClick: async (event) => {
						if (isExternal.value || hasTarget.value) return;
						event.preventDefault();
						try {
							const encodedHref = encodeRoutePath(href.value ?? "");
							return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
						} finally {}
					}
				}, slots.default?.());
			};
		}
	});
}
var NuxtLink = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
	if (trailingSlash !== "append" && trailingSlash !== "remove") return to;
	const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
	if (hasProtocol(to) && !to.startsWith("http")) return to;
	return normalizeFn(to, true);
}

//#region composables/useToast.ts
var toasts = ref([]);
var useToast = () => {
	const addToast = (toast) => {
		const id = Math.random().toString(36).substring(2, 9);
		const newToast = {
			...toast,
			id,
			duration: toast.duration || 3e3
		};
		toasts.value.push(newToast);
		if (newToast.duration > 0) setTimeout(() => {
			removeToast(id);
		}, newToast.duration);
	};
	const removeToast = (id) => {
		const index = toasts.value.findIndex((t) => t.id === id);
		if (index > -1) toasts.value.splice(index, 1);
	};
	const success = (title, message = "", duration = 3e3) => {
		addToast({
			title,
			message,
			type: "success",
			duration
		});
	};
	const error = (title, message = "", duration = 4e3) => {
		addToast({
			title,
			message,
			type: "error",
			duration
		});
	};
	const info = (title, message = "", duration = 3e3) => {
		addToast({
			title,
			message,
			type: "info",
			duration
		});
	};
	const warning = (title, message = "", duration = 4e3) => {
		addToast({
			title,
			message,
			type: "warning",
			duration
		});
	};
	const showToast = (options) => {
		addToast({
			title: options.title || (options.type === "success" ? "نجاح" : options.type === "error" ? "خطأ" : "تنبيه"),
			message: options.message || "",
			type: options.type || "info",
			duration: options.duration || 3500
		});
	};
	return {
		toasts,
		addToast,
		showToast,
		removeToast,
		success,
		error,
		info,
		warning
	};
};

//#region node_modules/nuxt/dist/app/composables/state.js
var useStateKeyPrefix = "$s";
function useState(...args) {
	const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
	if (typeof args[0] !== "string") args.unshift(autoKey);
	const [_key, init] = args;
	if (!_key || typeof _key !== "string") throw stateDiagnostics.NUXT_E7009({ key: _key });
	if (init !== void 0 && typeof init !== "function") throw stateDiagnostics.NUXT_E7007({ type: typeof init });
	const key = useStateKeyPrefix + _key;
	const nuxtApp = useNuxtApp();
	const state = toRef(nuxtApp.payload.state, key);
	if (init) nuxtApp._state[key] ??= { _default: init };
	if (state.value === void 0 && init) {
		const initialValue = init();
		if (isRef(initialValue)) {
			nuxtApp.payload.state[key] = initialValue;
			return initialValue;
		}
		state.value = initialValue;
	}
	return state;
}

//#region services/adminAuthApiService.ts
/**
* Production-ready Admin Auth API Service Layer
* Endpoints for Admin Authentication:
* - POST /api/v1/admin/auth/login (or fallback /api/v1/auth/admin/login)
* - POST /api/v1/admin/auth/logout
*/
var API_BASE_URL = process.env.NUXT_PUBLIC_API_BASE || "https:/ai-agunt.elbakry2.com/api/v1";
var adminAuthApiService = {
	/**
	* Send Admin Login Request
	*/
	async login(payload) {
		const cleanEmail = payload.email.trim().toLowerCase();
		const bodyPayload = {
			email: cleanEmail,
			password: payload.password
		};
		const endpoints = [
			`${API_BASE_URL}/admin/auth/login`,
			`${API_BASE_URL}/auth/admin/login`,
			`${API_BASE_URL}/admin/login`
		];
		let lastErrorMsg = "بيانات الاعتماد غير صحيحة.";
		for (const endpoint of endpoints) try {
			const response = await $fetch$2(endpoint, {
				method: "POST",
				headers: {
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				body: bodyPayload,
				timeout: 1e4
			});
			const token = response?.token || response?.access_token || response?.data?.token || response?.data?.access_token;
			let adminObj = response?.admin || response?.user || response?.data?.admin || response?.data?.user || response?.data;
			if (token) {
				if (cleanEmail === "wedgetstore@gmail.com") {
					if (!adminObj || typeof adminObj !== "object") adminObj = {
						email: cleanEmail,
						name: "Super Admin"
					};
					adminObj.admin_role_id = 1;
					adminObj.role_id = 1;
					adminObj.role_name = "مدير عام النظام (Super Admin)";
					adminObj.modules = ["*"];
					adminObj.module_access = ["*"];
				}
				return {
					success: true,
					token,
					admin: adminObj,
					message: response?.message || "تم تسجيل الدخول بنجاح"
				};
			}
		} catch (err) {
			lastErrorMsg = err?.data?.message || err?.message || "فشل الاتصال بسيرفر الآدمن.";
		}
		return {
			success: false,
			message: lastErrorMsg
		};
	},
	/**
	* Fetch current admin profile info
	* GET /api/v1/admin/auth/info (Graceful fallback to prevent CORS redirect spam)
	*/
	async getProfile(token) {
		if (!token) return {
			success: false,
			message: "No token provided"
		};
		try {
			const response = await fetch(`${API_BASE_URL}/admin/auth/info`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json",
					"X-Requested-With": "XMLHttpRequest"
				},
				redirect: "manual"
			});
			if (response.type === "opaqueredirect" || response.status === 301 || response.status === 302 || response.status === 404) return {
				success: false,
				message: "Profile endpoint not directly available"
			};
			if (!response.ok) return {
				success: false,
				message: `Status ${response.status}`
			};
			const raw = await response.json().catch(() => null);
			let adminObj = raw?.admin || raw?.user || raw?.data?.admin || raw?.data?.user || raw?.data || raw;
			if (adminObj && (adminObj.id || adminObj.email || adminObj.name)) {
				if (String(adminObj.email || "").trim().toLowerCase() === "wedgetstore@gmail.com" || adminObj.admin_role_id === 1 || adminObj.admin_role_id === "1") {
					adminObj.admin_role_id = 1;
					adminObj.role_id = 1;
					adminObj.role_name = "مدير عام النظام (Super Admin)";
					adminObj.modules = ["*"];
					adminObj.module_access = ["*"];
				}
				return {
					success: true,
					admin: adminObj
				};
			}
		} catch (err) {}
		return {
			success: false,
			message: "تعذر جلب بيانات المشرف من السيرفر."
		};
	},
	/**
	* Admin Logout Request
	*/
	async logout(token) {
		try {
			await $fetch$2(`${API_BASE_URL}/admin/auth/logout`, {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${token}`,
					"Accept": "application/json"
				}
			});
			return true;
		} catch {
			return false;
		}
	}
};
//#endregion
//#region composables/useAdminAuth.ts
/**
* Dedicated Admin Authentication Composable
* Manages admin_token cookie & state separately from regular customer session tokens.
*/
var useAdminAuth = () => {
	const adminCookie = useCookie("admin_token", { maxAge: 2592e3 });
	const adminUserCookie = useCookie("admin_user", { maxAge: 2592e3 });
	const adminState = useState("admin_token_state", () => adminCookie.value || null);
	const adminUser = useState("admin_user_state", () => adminUserCookie.value || null);
	const isLoadingProfile = useState("admin_is_loading_profile", () => false);
	const toast = useToast();
	/**
	* Normalize admin user object (special rule for Super Admin wedgetstore@gmail.com)
	*/
	const normalizeAdminUser = (user) => {
		if (!user || typeof user !== "object") return user;
		if (String(user.email || "").trim().toLowerCase() === "wedgetstore@gmail.com" || user.admin_role_id === 1 || user.admin_role_id === "1") {
			user.admin_role_id = 1;
			user.role_id = 1;
			if (!user.role_name || user.role_name === "مشرف") user.role_name = "مدير عام النظام (Super Admin)";
			user.modules = ["*"];
			user.module_access = ["*"];
		}
		return user;
	};
	/**
	* Fetch fresh admin profile from API to refresh permissions and state
	*/
	const fetchAdminProfile = async (force = false) => {
		const currentToken = adminState.value || adminCookie.value || null;
		if (!currentToken) return null;
		isLoadingProfile.value = true;
		try {
			const res = await adminAuthApiService.getProfile(currentToken);
			if (res.success && res.admin) {
				const normalized = normalizeAdminUser(res.admin);
				adminUser.value = normalized;
				adminUserCookie.value = normalized;
				return normalized;
			}
		} catch (e) {
			console.warn("[useAdminAuth] fetchAdminProfile error:", e);
		} finally {
			isLoadingProfile.value = false;
		}
		return adminUser.value;
	};
	const initializeAdminAuth = () => {};
	const setAdminAuth = (token, adminData) => {
		adminState.value = token;
		adminCookie.value = token;
		if (adminData) {
			const normalized = normalizeAdminUser(adminData);
			adminUser.value = normalized;
			adminUserCookie.value = normalized;
		}
		fetchAdminProfile(true);
	};
	const logoutAdmin = async () => {
		const currentToken = adminState.value || adminCookie.value;
		if (currentToken) await adminAuthApiService.logout(currentToken);
		adminState.value = null;
		adminCookie.value = null;
		adminUser.value = null;
		adminUserCookie.value = null;
		toast.info("تسجيل خروج المشرف", "تم تسجيل الخروج من لوحة التحكم بنجاح.");
		return navigateTo("/admin/login");
	};
	const isAdminLoggedIn = computed(() => {
		return Boolean(adminState.value || adminCookie.value);
	});
	const getAdminToken = () => {
		return adminState.value || adminCookie.value || null;
	};
	return {
		adminToken: adminState,
		adminUser,
		isLoadingProfile,
		isAdminLoggedIn,
		getAdminToken,
		setAdminAuth,
		fetchAdminProfile,
		logoutAdmin,
		initializeAdminAuth
	};
};

//#region node_modules/nuxt/dist/app/utils/debounce-tick.js
/**
* Debounce an async function so that repeated calls within the same tick are
* collapsed into a single call (plus a trailing call if arguments arrived
* while the debounced call was still pending).
*
* Adapted from https://github.com/unjs/perfect-debounce with the timeout
* replaced by Vue's post-flush callback queue.
*/
function debounceTick(fn, options = {}) {
	let leadingValue;
	let active = false;
	let resolveList = [];
	let currentPromise;
	let trailingArgs;
	const applyFn = (_this, args) => {
		const promise = _applyPromised(fn, _this, args);
		currentPromise = promise;
		promise.finally(() => {
			currentPromise = void 0;
			if (trailingArgs && !active) {
				const args = trailingArgs;
				trailingArgs = void 0;
				applyFn(_this, args);
			}
		});
		return promise;
	};
	return function(...args) {
		trailingArgs = args;
		if (currentPromise) return currentPromise;
		return new Promise((resolve) => {
			const shouldCallNow = options.leading && !active;
			if (!active) {
				active = true;
				queuePostFlushCb(() => {
					active = false;
					const flushArgs = trailingArgs ?? args;
					trailingArgs = void 0;
					const promise = options.leading ? leadingValue : applyFn(this, flushArgs);
					for (const _resolve of resolveList) _resolve(promise);
					resolveList = [];
				});
			}
			if (shouldCallNow) {
				leadingValue = applyFn(this, args);
				resolve(leadingValue);
			} else resolveList.push(resolve);
		});
	};
}
async function _applyPromised(fn, _this, args) {
	return await fn.apply(_this, args);
}
//#endregion
//#region node_modules/nuxt/dist/compiler/runtime/index.js
/**
* Define a factory for a function that should be registered for automatic key injection.
* @since 4.2.0
* @param factory
*/
function defineKeyedFunctionFactory(factory) {
	const placeholder = function() {
		throw appDiagnostics.NUXT_E1007({ name: factory.name });
	};
	return Object.defineProperty(placeholder, "__nuxt_factory", {
		enumerable: false,
		get: () => factory.factory
	});
}
//#endregion
//#region node_modules/nuxt/dist/app/diagnostics/data.js
/**
* E3xxx
* Data fetching (useFetch / useAsyncData) runtime diagnostics.
*/
var dataDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/asyncData.js
var createUseAsyncData = defineKeyedFunctionFactory({
	name: "createUseAsyncData",
	factory(options = {}) {
		function useAsyncData(...args) {
			const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
			if (_isAutoKeyNeeded(args[0], args[1])) args.unshift(autoKey);
			let [_key, _handler, opts = {}] = args;
			const key = isRef(_key) || typeof _key === "function" ? computed(() => toValue(_key)) : { value: _key };
			if (!key.value || typeof key.value !== "string") throw dataDiagnostics.NUXT_E3008();
			if (typeof _handler !== "function") throw dataDiagnostics.NUXT_E3009();
			const shouldFactoryOptionsOverride = typeof options === "function";
			const nuxtApp = useNuxtApp();
			const factoryOptions = shouldFactoryOptionsOverride ? options(opts) : options;
			if (!shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				if (opts[key] !== void 0) continue;
				opts[key] = factoryOptions[key];
			}
			opts.server ??= true;
			opts.default ??= getDefault;
			opts.getCachedData ??= getDefaultCachedData;
			opts.lazy ??= false;
			opts.immediate ??= true;
			opts.deep ??= asyncDataDefaults.deep;
			opts.dedupe ??= "cancel";
			opts.enabled ??= true;
			if (shouldFactoryOptionsOverride) for (const key in factoryOptions) {
				if (factoryOptions[key] === void 0) continue;
				opts[key] = factoryOptions[key];
			}
			nuxtApp._asyncData[key.value];
			function createInitialFetch() {
				const initialFetchOptions = {
					cause: "initial",
					dedupe: opts.dedupe
				};
				const existing = nuxtApp._asyncData[key.value];
				if (!existing?._init) {
					initialFetchOptions.cachedData = opts.getCachedData(key.value, nuxtApp, { cause: "initial" });
					nuxtApp._asyncData[key.value] = buildAsyncData(nuxtApp, key.value, _handler, opts, initialFetchOptions.cachedData);
					nuxtApp._asyncData[key.value]._initialCachedData = initialFetchOptions.cachedData;
				} else if (nuxtApp._asyncDataPromises[key.value]) initialFetchOptions.cachedData = existing._initialCachedData;
				return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
			}
			const initialFetch = createInitialFetch();
			const asyncData = nuxtApp._asyncData[key.value];
			asyncData._deps++;
			if (opts.server !== false && nuxtApp.payload.serverRendered && opts.immediate) {
				const promise = initialFetch();
				if (getCurrentInstance()) onServerPrefetch(() => promise);
				else nuxtApp.hook("app:created", async () => {
					await promise;
				});
			}
			const asyncReturn = {
				data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
				pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
				status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
				error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
				refresh: (...args) => {
					if (!nuxtApp._asyncData[key.value]?._init) return createInitialFetch()();
					return nuxtApp._asyncData[key.value].execute(...args);
				},
				execute: (...args) => asyncReturn.refresh(...args),
				clear: () => {
					const entry = nuxtApp._asyncData[key.value];
					if (entry?._abortController) try {
						entry._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
					} finally {
						entry._abortController = void 0;
					}
					clearNuxtDataByKey(nuxtApp, key.value);
				}
			};
			const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
			Object.assign(asyncDataPromise, asyncReturn);
			Object.defineProperties(asyncDataPromise, {
				then: {
					enumerable: true,
					value: asyncDataPromise.then.bind(asyncDataPromise)
				},
				catch: {
					enumerable: true,
					value: asyncDataPromise.catch.bind(asyncDataPromise)
				},
				finally: {
					enumerable: true,
					value: asyncDataPromise.finally.bind(asyncDataPromise)
				}
			});
			return asyncDataPromise;
		}
		return useAsyncData;
	}
});
var useAsyncData = createUseAsyncData.__nuxt_factory();
createUseAsyncData.__nuxt_factory({
	lazy: true,
	_functionName: "useLazyAsyncData"
});
function writableComputedRef(getter) {
	return computed({
		get() {
			return getter()?.value;
		},
		set(value) {
			const ref = getter();
			if (ref) ref.value = value;
		}
	});
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
	if (typeof keyOrFetcher === "string") return false;
	if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) return false;
	if (typeof keyOrFetcher === "function" && typeof fetcher === "function") return false;
	return true;
}
function clearNuxtDataByKey(nuxtApp, key) {
	delete nuxtApp.payload.data[key];
	delete nuxtApp.payload._errors[key];
	if (nuxtApp._asyncData[key]) {
		nuxtApp._asyncData[key].data.value = unref(nuxtApp._asyncData[key]._default());
		nuxtApp._asyncData[key].error.value = void 0;
		nuxtApp._asyncData[key].status.value = "idle";
		nuxtApp._asyncData[key]._initialCachedData = void 0;
	}
	delete nuxtApp._asyncDataPromises[key];
}
function pick(obj, keys) {
	const newObj = {};
	for (const key of keys) newObj[key] = obj[key];
	return newObj;
}
function buildAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
	nuxtApp.payload._errors[key] ??= void 0;
	const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
	const handler = _handler ;
	const _ref = options.deep ? ref : shallowRef;
	const hasCachedData = initialCachedData !== void 0;
	const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
		if (!keys || keys.includes(key)) await asyncData.execute({ cause: "refresh:hook" });
	});
	const asyncData = {
		data: _ref(hasCachedData ? initialCachedData : options.default()),
		pending: computed(() => asyncData.status.value === "pending"),
		error: toRef(nuxtApp.payload._errors, key),
		status: shallowRef("idle"),
		execute: (...args) => {
			const [_opts, newValue = void 0] = args;
			const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
			if (nuxtApp._asyncDataPromises[key]) {
				if ((opts.dedupe ?? options.dedupe) === "defer") return nuxtApp._asyncDataPromises[key];
			}
			{
				const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
				if (cachedData !== void 0) {
					nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
					asyncData.error.value = void 0;
					asyncData.status.value = "success";
					return Promise.resolve(cachedData);
				}
			}
			if (toValue(options.enabled) === false) return Promise.resolve(asyncData.data.value);
			if (asyncData._abortController) asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
			asyncData._abortController = new AbortController();
			asyncData.status.value = "pending";
			const cleanupController = new AbortController();
			const promise = new Promise((resolve, reject) => {
				try {
					const timeout = opts.timeout ?? options.timeout;
					const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
					if (mergedSignal.aborted) {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
						return;
					}
					mergedSignal.addEventListener("abort", () => {
						const reason = mergedSignal.reason;
						reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
					}, {
						once: true,
						signal: cleanupController.signal
					});
					return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve, reject);
				} catch (err) {
					reject(err);
				}
			}).then(async (_result) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return;
				let result = _result;
				if (options.transform) result = await options.transform(_result);
				if (options.pick) result = pick(result, options.pick);
				nuxtApp.payload.data[key] = result;
				asyncData.data.value = result;
				asyncData.error.value = void 0;
				asyncData.status.value = "success";
			}).catch((error) => {
				if (nuxtApp._asyncDataPromises[key] !== promise) return nuxtApp._asyncDataPromises[key];
				if (asyncData._abortController?.signal.aborted) return nuxtApp._asyncDataPromises[key];
				if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
					asyncData.status.value = "idle";
					return nuxtApp._asyncDataPromises[key];
				}
				asyncData.error.value = createError$1(error);
				asyncData.data.value = unref(options.default());
				asyncData.status.value = "error";
			}).finally(() => {
				cleanupController.abort();
				if (nuxtApp._asyncDataPromises[key] === promise) delete nuxtApp._asyncDataPromises[key];
			});
			nuxtApp._asyncDataPromises[key] = promise;
			return nuxtApp._asyncDataPromises[key];
		},
		_execute: debounceTick((...args) => asyncData.execute(...args)),
		_default: options.default,
		_deps: 0,
		_init: true,
		_hash: void 0,
		_off: () => {
			unsubRefreshAsyncData();
			if (nuxtApp._asyncData[key]?._init) nuxtApp._asyncData[key]._init = false;
			if (nuxtApp._asyncDataPromises[key]) {
				asyncData._abortController?.abort(new DOMException("AsyncData request cancelled by unmount", "AbortError"));
				delete nuxtApp._asyncDataPromises[key];
			}
			if (!hasCustomGetCachedData) nextTick(() => {
				if (!nuxtApp._asyncData[key]?._init) {
					clearNuxtDataByKey(nuxtApp, key);
					asyncData.execute = () => Promise.resolve();
				}
			});
		}
	};
	return asyncData;
}
var getDefault = () => void 0;
var getDefaultCachedData = (key, nuxtApp, ctx) => {
	if (nuxtApp.isHydrating) return nuxtApp.payload.data[key];
	if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") return nuxtApp.static.data[key];
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
	const list = signals.filter((s) => !!s);
	if (typeof timeout === "number" && timeout >= 0) {
		const timeoutSignal = AbortSignal.timeout?.(timeout);
		if (timeoutSignal) list.push(timeoutSignal);
	}
	if (AbortSignal.any) return AbortSignal.any(list);
	const controller = new AbortController();
	for (const sig of list) if (sig.aborted) {
		const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
		return controller.signal;
	}
	const onAbort = () => {
		const reason = list.find((s) => s.aborted)?.reason ?? new DOMException("Aborted", "AbortError");
		try {
			controller.abort(reason);
		} catch {
			controller.abort();
		}
	};
	for (const sig of list) sig.addEventListener?.("abort", onAbort, {
		once: true,
		signal: cleanupSignal
	});
	return controller.signal;
}

//#region src/index.ts
/**
* Compute the 64-bit FNV-1a hash of a string as two 32-bit lanes.
*
* This is the fast core: no BigInt, no allocations, plain `Math.imul`-free
* 32-bit arithmetic. Prefer {@link fnv1a64Hex} or {@link fnv1a64Base36} for a
* usable key; use this directly only when you want to avoid string formatting.
*
* The hash is computed over UTF-16 code units (`str.charCodeAt(i)`), not UTF-8
* bytes. For ASCII input this matches a canonical FNV-1a-64; for non-ASCII it
* does not. See the README for details.
*
* @param str - The string to hash.
* @returns The `{ high, low }` 32-bit lanes of the 64-bit hash.
*/
function fnv1a64(str) {
	const len = str.length;
	let i = 0;
	let t0 = 0;
	let v0 = 8997;
	let t1 = 0;
	let v1 = 33826;
	let t2 = 0;
	let v2 = 40164;
	let t3 = 0;
	let v3 = 52210;
	while (i < len) {
		v0 ^= str.charCodeAt(i++);
		t0 = v0 * 435;
		t1 = v1 * 435;
		t2 = v2 * 435;
		t3 = v3 * 435;
		t2 += v0 << 8;
		t3 += v1 << 8;
		t1 += t0 >>> 16;
		v0 = t0 & 65535;
		t2 += t1 >>> 16;
		v1 = t1 & 65535;
		v3 = t3 + (t2 >>> 16) & 65535;
		v2 = t2 & 65535;
	}
	return {
		high: (v3 << 16 | v2) >>> 0,
		low: (v1 << 16 | v0) >>> 0
	};
}
/**
* Compute the 64-bit FNV-1a hash of a string as a `bigint`.
*
* Ergonomic and comparable, at the cost of composing the two lanes into a
* `bigint`. For a compact string key, prefer {@link fnv1a64Base36}.
*
* @param str - The string to hash.
* @returns The 64-bit hash as an unsigned `bigint`.
*/
function fnv1a64BigInt(str) {
	const { high, low } = fnv1a64(str);
	return BigInt(high) << 32n | BigInt(low);
}
const hexDigits = "0123456789abcdef";
/**
* Every byte value rendered as its two hex digits, so a 32-bit lane formats in
* 4 lookups instead of `toString(16)` plus a `padStart`. Leading zeros are
* intrinsic to the table, which is what makes the padding free.
*/
Array.from({ length: 256 }, (_, i) => hexDigits.charAt(i >> 4) + hexDigits.charAt(i & 15));
/**
* Compute the 64-bit FNV-1a hash of a string as a base36 string.
*
* This is the shortest textual form (up to 13 characters) and is ideal for
* cache keys. The length varies with the value; it is not zero-padded. Equal
* inputs always produce identical strings.
*
* @param str - The string to hash.
* @returns A base36 string of the 64-bit hash.
*/
function fnv1a64Base36(str) {
	return fnv1a64BigInt(str).toString(36);
}

function walk(input, seen) {
	if (input === null) return "L";
	let out, i = 0, keys = input, tmp = typeof input;
	if (tmp !== "object") {
		if (tmp === "number") return input - input === 0 ? "n" + input : "L";
		if (tmp === "string") return "s" + input;
		if (tmp === "bigint") return "n" + input;
		if (tmp === "boolean") return input ? "T" : "F";
		return;
	}
	let is_arr = Array.isArray(input);
	if (!is_arr) {
		if (input instanceof Date) return "d" + +input;
		if (input instanceof RegExp) return "r" + input.source + input.flags;
	}
	tmp = seen.indexOf(input);
	if (~tmp) return "~" + (tmp + 1);
	if (typeof input.toJSON === "function" && !ArrayBuffer.isView(input)) {
		input = input.toJSON();
		if (input === null || typeof input !== "object") return walk(input, seen);
		tmp = seen.indexOf(input);
		if (~tmp) return "~" + (tmp + 1);
		is_arr = Array.isArray(input);
	}
	seen.push(keys);
	if (is_arr) {
		for (out = "a"; i < input.length; out += (tmp = walk(input[i++], seen)) === undefined ? "L" : tmp);
	} else if (input instanceof Set) {
		out = "e";
		for (let value of input) out += (tmp = walk(value, seen)) === undefined ? "L" : tmp;
	} else if (input instanceof Map) {
		keys = [...input.keys()];
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input.get(keys[i]), seen)) !== undefined) out += keys[i] + tmp;
		}
	} else if (input[Symbol.toStringTag] === undefined || ArrayBuffer.isView(input)) {
		keys = Object.keys(input);
		if (keys.length > 1) keys.sort();
		for (out = "o"; i < keys.length; i++) {
			if ((tmp = walk(input[keys[i]], seen)) !== undefined) out += keys[i] + tmp;
		}
	} else {
		throw new Error("Unsupported value");
	}
	seen.pop();
	return out;
}
/**
* Canonicalize a value into a stable identity string. Two structurally-equal
* inputs return the same id, regardless of key order.
*
* @example
* ```ts
* identify({ a: 1, b: 2 }) === identify({ b: 2, a: 1 }); // true
* ```
*/
function identify(input) {
	return walk(input, []) ?? "U";
}

//#region node_modules/nuxt/dist/app/diagnostics/manifest.js
/**
* E5xxx
* App manifest / route-rules runtime diagnostics.
*/
var manifestDiagnostics = /* #__PURE__ */ defineProdDiagnostics({
	docsBase,
	reporters: prodReporters
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froute-rules.mjs
var sensitiveMatcher = (m, p) => {
	return [];
};
var foldedMatcher = sensitiveMatcher;
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default = (path) => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.sensitive ? defu({}, ...sensitiveMatcher().map((r) => r.data).reverse()) : defu({}, ...foldedMatcher("", typeof path === "string" ? path.toLowerCase() : path).map((r) => r.data).reverse());
//#endregion
//#region node_modules/nuxt/dist/app/composables/manifest.js
var routeRulesMatcher$1 = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function getRouteRules(arg) {
	const path = typeof arg === "string" ? arg : arg.path;
	try {
		return routeRulesMatcher$1(path);
	} catch (e) {
		manifestDiagnostics.NUXT_E5003({
			path,
			cause: e
		});
		return {};
	}
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/payload.js
/**
* This is an experimental function for configuring passing rich data from server -> client.
* @since 3.4.0
*/
function definePayloadReducer(name, reduce) {
	useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
}
//#endregion
//#region node_modules/nuxt/dist/app/utils/hash.js
/**
* Hash an arbitrary value into a short, stable string key.
*
* Values are serialized to a canonical, locale-independent representation
* (equal structures hash equally regardless of key order or runtime locale),
* then digested with a fast non-cryptographic hash. This is what `useFetch` and
* `useAsyncData` use internally to derive their cache keys, so it is safe to use
* for the same purpose in your own code.
*
* The digest is non-cryptographic and must not be used for integrity checks.
*
* @since 4.5.0
*/
function hashKey(value) {
	return fnv1a64Base36(identify(value));
}
//#endregion
//#region node_modules/nuxt/dist/app/composables/fetch.js
var $fetch$1 = $fetch$2;
var MAYBE_REF_OR_GETTER_OPTION_KEYS = [
	"method",
	"baseURL",
	"query",
	"params",
	"body",
	"headers"
];
function generateOptionSegments(opts) {
	const segments = [toValue(opts.method)?.toUpperCase() || "GET", toValue(opts.baseURL)];
	for (const _obj of [opts.query || opts.params]) {
		const obj = toValue(_obj);
		if (!obj) continue;
		const unwrapped = {};
		for (const [key, value] of Object.entries(obj)) unwrapped[toValue(key)] = toValue(value);
		segments.push(unwrapped);
	}
	if (opts.body) {
		const value = toValue(opts.body);
		if (!value) segments.push(hashKey(value));
		else if (value instanceof ArrayBuffer) segments.push(hashKey(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
		else if (value instanceof FormData) {
			const entries = [];
			for (const entry of value.entries()) {
				const [key, val] = entry;
				entries.push([key, val instanceof File ? `${val.name}:${val.size}:${val.lastModified}` : val]);
			}
			segments.push(hashKey(entries));
		} else if (isPlainObject(value)) segments.push(hashKey(reactive(value)));
		else try {
			segments.push(hashKey(value));
		} catch {
			dataDiagnostics.NUXT_E3002({ cause: value });
		}
	}
	return segments;
}
/**
* A factory function to create a custom `useFetch` composable with pre-defined default options.
* @since 4.2.0
*/
var createUseFetch = defineKeyedFunctionFactory({
	name: "createUseFetch",
	factory(options = {}) {
		function useFetch(request, arg1, arg2) {
			const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
			const factoryOptions = typeof options === "function" ? options(opts) : options;
			const { server, lazy, default: defaultFn, transform, pick, watch: watchSources, immediate, getCachedData, deep, dedupe, timeout, enabled, ...fetchOptions } = {
				...typeof options === "function" ? {} : factoryOptions,
				...opts,
				...typeof options === "function" ? factoryOptions : {}
			};
			const _request = computed(() => toValue(request));
			const key = computed(() => toValue(fetchOptions.key) || "$f" + hashKey([
				autoKey,
				typeof _request.value === "string" ? _request.value : "",
				...generateOptionSegments(fetchOptions)
			]));
			if (!fetchOptions.baseURL && typeof _request.value === "string" && _request.value[0] === "/" && _request.value[1] === "/") throw dataDiagnostics.NUXT_E3001({ url: _request.value });
			const _fetchOptions = reactive({
				...fetchDefaults,
				...fetchOptions,
				cache: typeof fetchOptions.cache === "boolean" ? void 0 : fetchOptions.cache
			});
			const _asyncDataOptions = {
				server,
				lazy,
				default: defaultFn,
				transform,
				pick,
				immediate,
				getCachedData,
				deep,
				dedupe,
				timeout,
				enabled,
				watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
			};
			if (watchSources === false) _asyncDataOptions._keyTriggersExecute = false;
			return useAsyncData(key, (_, { signal }) => {
				let _$fetch = fetchOptions.$fetch || $fetch$1;
				if (!fetchOptions.$fetch) {
					if (typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(fetchOptions.baseURL) || toValue(fetchOptions.baseURL)[0] === "/")) _$fetch = useRequestFetch();
				}
				const resolvedOptions = {
					signal,
					..._fetchOptions
				};
				for (const key of MAYBE_REF_OR_GETTER_OPTION_KEYS) if (typeof resolvedOptions[key] === "function") resolvedOptions[key] = toValue(resolvedOptions[key]);
				return _$fetch(_request.value, resolvedOptions);
			}, _asyncDataOptions);
		}
		return useFetch;
	}
});
createUseFetch.__nuxt_factory();
createUseFetch.__nuxt_factory({
	lazy: true,
	_functionName: "useLazyFetch"
});
//#endregion
//#region node_modules/nuxt/dist/app/composables/layout.js
var routeRulesMatcher = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froute_rules_default;
function resolveLayoutName(route, name) {
	return unref(name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path ?? "/").appLayout ?? "default";
}

//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fglobal-polyfills.mjs
if (!("global" in globalThis)) globalThis.global = globalThis;
//#endregion
//#region node_modules/nuxt/dist/head/runtime/island-head.js
/**
* No-op `head.push` until the returned `unfreeze` runs. Plugin/transformer
* augmentations on the same head are unaffected.
*/
function freezeHead(head) {
	const realPush = head.push;
	head.push = () => ({
		dispose: () => {},
		patch: () => {},
		_i: 0
	});
	return () => {
		head.push = realPush;
	};
}
//#endregion
//#region node_modules/nuxt/dist/head/runtime/plugins/unhead.server.js
var plugin$2 = defineNuxtPlugin({
	name: "nuxt:head",
	enforce: "pre",
	setup(nuxtApp) {
		const head = nuxtApp.ssrContext.head;
		if (nuxtApp.ssrContext.islandContext) {
			const unfreeze = freezeHead(head);
			nuxtApp.hooks.hookOnce("app:created", unfreeze);
		}
		nuxtApp.vueApp.use(head);
	}
});
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/utils.js
var ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
var ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
var ROUTE_KEY_NORMAL_RE = /:\w+/g;
var interpolatePath = (route, match) => {
	return match.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
};
var generateRouteKey = (routeProps, override) => {
	const matchedRoute = routeProps.route.matched.find((m) => m.components?.default === routeProps.Component.type);
	const source = matchedRoute?.meta.key ?? (matchedRoute && interpolatePath(routeProps.route, matchedRoute));
	return typeof source === "function" ? source(routeProps.route) : source;
};
/** @since 3.9.0 */
function toArray(value) {
	return Array.isArray(value) ? value : [value];
}
Object.assign(Object.create(null), {});
var pageIslandRoutes = Object.assign(Object.create(null), {});
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/validate.js
var middleware$1 = defineNuxtRouteMiddleware(async (to) => {
	let __temp, __restore;
	if (!to.meta?.validate) return;
	const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
	if (result === true) return;
	return createError$1({
		fatal: false,
		status: result && (result.status || result.statusCode) || 404,
		statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
		data: { path: to.fullPath }
	});
});
var PREFIXED_LOCALES = ["en"];
/**
* Extracts locale and the "clean" path (without locale prefix) from a given pathname.
* Examples:
*   /en/admin/products → { locale: 'en', cleanPath: '/admin/products' }
*   /en/shop           → { locale: 'en', cleanPath: '/shop' }
*   /shop              → { locale: 'ar', cleanPath: '/shop' }
*   /en                → { locale: 'en', cleanPath: '/' }
*   /                  → { locale: 'ar', cleanPath: '/' }
*/
var parseLocalePath = (path) => {
	if (!path) return {
		locale: "ar",
		cleanPath: "/"
	};
	for (const locale of PREFIXED_LOCALES) {
		if (path === `/${locale}`) return {
			locale,
			cleanPath: "/"
		};
		if (path.startsWith(`/${locale}/`)) return {
			locale,
			cleanPath: path.slice(`/${locale}`.length)
		};
	}
	return {
		locale: "ar",
		cleanPath: path
	};
};
/**
* Builds the full localized path for a given locale and clean path.
* Examples:
*   buildLocalePath('en', '/admin/products') → '/en/admin/products'
*   buildLocalePath('ar', '/admin/products') → '/admin/products'
*   buildLocalePath('en', '/shop')           → '/en/shop'
*   buildLocalePath('ar', '/shop')           → '/shop'
*   buildLocalePath('en', '/')               → '/en'
*   buildLocalePath('ar', '/')               → '/'
*/
var buildLocalePath = (locale, rawPath) => {
	if (!rawPath) return locale === "en" ? "/en" : "/";
	const { cleanPath } = parseLocalePath(rawPath);
	if (!PREFIXED_LOCALES.includes(locale)) return cleanPath || "/";
	if (cleanPath === "/") return `/${locale}`;
	return `/${locale}${cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath}`;
};
var locale_global_default = defineNuxtRouteMiddleware((to) => {
	const path = to.path;
	const { locale: urlLocale, cleanPath } = parseLocalePath(path);
	const currentLanguage = useState("appLanguage", () => "ar");
	currentLanguage.value = urlLocale;
});
//#endregion
//#region composables/useAdminPermissions.ts
/**
* Route to Module Permission Keys Mapping
* Maps clean admin route prefixes to candidate permission module keys.
*/
var ROUTE_PERMISSION_MAP = {
	"/admin/analytics": [
		"report_management",
		"analytics",
		"reports"
	],
	"/admin/products": ["product_management", "products"],
	"/admin/categories": ["category_management", "categories"],
	"/admin/brands": ["brand_management", "brands"],
	"/admin/attributes": [
		"attributes_management",
		"attributes",
		"colors"
	],
	"/admin/colors": [
		"attributes_management",
		"attributes",
		"colors"
	],
	"/admin/orders": ["order_management", "orders"],
	"/admin/customers": ["customer_management", "customers"],
	"/admin/coupons": ["coupon_management", "coupons"],
	"/admin/staff": [
		"employee_management",
		"employees",
		"staff",
		"admin_management",
		"custom_role",
		"roles"
	],
	"/admin/admins": [
		"employee_management",
		"employees",
		"staff",
		"admin_management",
		"custom_role",
		"roles"
	],
	"/admin/roles": [
		"employee_management",
		"employees",
		"staff",
		"admin_management",
		"custom_role",
		"roles"
	],
	"/admin/custom-role": [
		"employee_management",
		"employees",
		"staff",
		"admin_management",
		"custom_role",
		"roles"
	],
	"/admin/settings": [
		"system_settings",
		"settings",
		"business_settings"
	],
	"/admin/storefront": [
		"system_settings",
		"settings",
		"storefront"
	],
	"/admin/navbar": [
		"system_settings",
		"settings",
		"storefront",
		"navbar"
	],
	"/admin/about-us": [
		"system_settings",
		"settings",
		"storefront",
		"about_us"
	],
	"/admin/return-policy": [
		"system_settings",
		"settings",
		"storefront",
		"return_policy"
	],
	"/admin/privacy-policy": [
		"system_settings",
		"settings",
		"storefront",
		"privacy_policy"
	],
	"/admin/contact-messages": [
		"system_settings",
		"settings",
		"support_tickets",
		"contact_messages",
		"messages"
	],
	"/admin/contact-settings": [
		"system_settings",
		"settings",
		"business_settings",
		"contact_settings"
	]
};
var useAdminPermissions = () => {
	const { adminUser } = useAdminAuth();
	/**
	* Check if current user is Super Admin
	* Unconditionally grants full access to wedgetstore@gmail.com and admin_role_id 1
	*/
	const isSuperAdmin = computed(() => {
		const user = adminUser.value;
		if (!user) return false;
		if (String(user.email || "").trim().toLowerCase() === "wedgetstore@gmail.com") return true;
		if (user.admin_role_id === 1 || user.admin_role_id === "1") return true;
		if (user.role_id === 1 || user.role_id === "1") return true;
		if (user.id === 1 || user.id === "1") return true;
		if (user.role?.id === 1 || user.role?.id === "1") return true;
		if (user.admin_role?.id === 1 || user.admin_role?.id === "1") return true;
		const roleName = String(user.role_name || user.role?.name || user.admin_role?.name || user.role_title || "").toLowerCase();
		if (roleName.includes("super") || roleName.includes("مدير النظام") || roleName.includes("المدير العام") || roleName.includes("سوبر") || roleName.includes("super admin") || roleName === "admin") return true;
		return false;
	});
	/**
	* Extract array of allowed module keys from admin user object
	*/
	const userModules = computed(() => {
		if (isSuperAdmin.value) return ["*"];
		const user = adminUser.value;
		if (!user) return [];
		let rawModules = user.modules || user.module_access || user.role?.modules || user.role?.module_access || user.admin_role?.modules || user.admin_role?.module_access || [];
		if (typeof rawModules === "string") try {
			rawModules = JSON.parse(rawModules);
		} catch {
			rawModules = rawModules.split(",").map((s) => s.trim()).filter(Boolean);
		}
		if (!Array.isArray(rawModules)) return [];
		return rawModules.map((m) => String(m).trim().toLowerCase());
	});
	/**
	* Check if admin has access to a specific module
	*/
	const hasModulePermission = (moduleKey) => {
		if (isSuperAdmin.value) return true;
		if (!moduleKey) return true;
		const cleanKey = moduleKey.trim().toLowerCase();
		const modules = userModules.value;
		return modules.includes("*") || modules.includes(cleanKey);
	};
	/**
	* Check if admin can access a specific route
	*/
	const canAccessRoute = (routePath) => {
		if (isSuperAdmin.value) return true;
		let clean = routePath.replace(/^\/(?:en|ar)\//, "/");
		if (!clean.startsWith("/")) clean = "/" + clean;
		if (clean === "/admin" || clean === "/admin/") return true;
		for (const [prefix, requiredKeys] of Object.entries(ROUTE_PERMISSION_MAP)) if (clean === prefix || clean.startsWith(prefix + "/") || clean.startsWith(prefix + "?")) {
			const modules = userModules.value;
			return requiredKeys.some((k) => modules.includes(k.toLowerCase()) || modules.includes("*"));
		}
		return true;
	};
	/**
	* Get first allowed route to redirect if root /admin is not allowed or for fallbacks
	*/
	const getFirstAllowedRoute = () => {
		for (const r of [
			"/admin",
			"/admin/products",
			"/admin/orders",
			"/admin/categories",
			"/admin/customers",
			"/admin/coupons",
			"/admin/analytics",
			"/admin/staff",
			"/admin/settings"
		]) if (canAccessRoute(r)) return r;
		return "/admin";
	};
	return {
		isSuperAdmin,
		userModules,
		hasModulePermission,
		canAccessRoute,
		getFirstAllowedRoute
	};
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fmiddleware.mjs
var globalMiddleware = [
	middleware$1,
	defineNuxtRouteMiddleware((to) => {
		const { locale, cleanPath } = parseLocalePath(to.path);
		const isAdminLoginPage = cleanPath === "/admin/login";
		const isAdminRoute = (cleanPath === "/admin" || cleanPath.startsWith("/admin/")) && !isAdminLoginPage;
		const adminTokenCookie = useCookie("admin_token").value;
		let hasAdminToken = Boolean(adminTokenCookie);
		if (isAdminLoginPage && hasAdminToken) {
			const adminPath = buildLocalePath(locale, "/admin");
			return navigateTo(adminPath);
		}
		if (isAdminRoute && !hasAdminToken) {
			const loginPath = buildLocalePath(locale, "/admin/login");
			return navigateTo(`${loginPath}?redirect=${encodeURIComponent(to.fullPath)}`);
		}
		if (isAdminRoute && hasAdminToken && cleanPath !== "/admin") {
			const { canAccessRoute, getFirstAllowedRoute } = useAdminPermissions();
			if (!canAccessRoute(cleanPath)) {
				const safePath = buildLocalePath(locale, getFirstAllowedRoute());
				return navigateTo(safePath);
			}
		}
	}),
	defineNuxtRouteMiddleware((to) => {
		const { locale, cleanPath } = parseLocalePath(to.path);
		if (!["/checkout", "/my-account"].some((path) => cleanPath === path || cleanPath.startsWith(`${path}/`))) return;
		const tokenCookie = useCookie("auth_token").value || useCookie("token").value || useCookie("access_token").value;
		if (!Boolean(tokenCookie)) {
			const loginPath = buildLocalePath(locale, "/login");
			return navigateTo(`${loginPath}?redirect=${encodeURIComponent(to.fullPath)}`);
		}
	}),
	locale_global_default,
	/* @__PURE__ */ defineNuxtRouteMiddleware((to) => {})
];
var namedMiddleware = { auth: () => import('../build/auth--oaXNHJv.mjs') };
//#endregion
//#region pages/admin/admins/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$53 = { layout: "dashboard" };
//#endregion
//#region pages/admin/attributes/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$52 = { layout: "dashboard" };
//#endregion
//#region pages/admin/brands/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$51 = { layout: "dashboard" };
//#endregion
//#region pages/admin/categories/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$50 = { layout: "dashboard" };
//#endregion
//#region pages/admin/colors/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$49 = { layout: "dashboard" };
//#endregion
//#region pages/admin/coupons/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$48 = { layout: "dashboard" };
//#endregion
//#region pages/admin/navbar/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$47 = { layout: "dashboard" };
//#endregion
//#region pages/admin/products/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$46 = { layout: "dashboard" };
//#endregion
//#region pages/admin/roles/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$45 = { layout: "dashboard" };
//#endregion
//#region pages/admin/staff/create.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$44 = { layout: "dashboard" };
//#endregion
//#region pages/admin/admins/[id]/edit.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$43 = { layout: "dashboard" };
//#endregion
//#region pages/admin/admins/[id]/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$42 = { layout: "dashboard" };
//#endregion
//#region pages/admin/admins/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$41 = { layout: "dashboard" };
//#endregion
//#region pages/admin/attributes/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$40 = { layout: "dashboard" };
//#endregion
//#region pages/admin/brands/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$39 = { layout: "dashboard" };
//#endregion
//#region pages/admin/categories/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$38 = { layout: "dashboard" };
//#endregion
//#region pages/admin/colors/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$37 = { layout: "dashboard" };
//#endregion
//#region pages/admin/contact-messages/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$36 = { layout: "dashboard" };
//#endregion
//#region pages/admin/coupons/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$35 = { layout: "dashboard" };
//#endregion
//#region pages/admin/customers/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$34 = { layout: "dashboard" };
//#endregion
//#region pages/admin/navbar/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$33 = { layout: "dashboard" };
//#endregion
//#region pages/admin/orders/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$32 = { layout: "dashboard" };
//#endregion
//#region pages/admin/products/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$31 = { layout: "dashboard" };
//#endregion
//#region pages/admin/roles/[id]/edit.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$30 = { layout: "dashboard" };
//#endregion
//#region pages/admin/roles/[id]/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$29 = { layout: "dashboard" };
//#endregion
//#region pages/admin/roles/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$28 = { layout: "dashboard" };
//#endregion
//#region pages/admin/staff/[id]/edit.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$27 = { layout: "dashboard" };
//#endregion
//#region pages/admin/staff/[id]/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$26 = { layout: "dashboard" };
//#endregion
//#region pages/admin/staff/[id].vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$25 = { layout: "dashboard" };
//#endregion
//#region pages/admin/about-us/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$24 = { layout: "dashboard" };
//#endregion
//#region pages/admin/admins/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$23 = { layout: "dashboard" };
//#endregion
//#region pages/admin/analytics/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$22 = { layout: "dashboard" };
//#endregion
//#region pages/admin/attributes/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$21 = { layout: "dashboard" };
//#endregion
//#region pages/admin/brands/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$20 = { layout: "dashboard" };
//#endregion
//#region pages/admin/categories/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$19 = { layout: "dashboard" };
//#endregion
//#region pages/admin/colors/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$18 = { layout: "dashboard" };
//#endregion
//#region pages/admin/contact-messages/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$17 = { layout: "dashboard" };
//#endregion
//#region pages/admin/contact-settings/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$16 = { layout: "dashboard" };
//#endregion
//#region pages/admin/coupons/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$15 = { layout: "dashboard" };
//#endregion
//#region pages/admin/custom-role/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$14 = { layout: "dashboard" };
//#endregion
//#region pages/admin/customers/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$13 = { layout: "dashboard" };
//#endregion
//#region pages/admin/login.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$12 = { layout: "empty" };
//#endregion
//#region pages/admin/navbar/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$11 = { layout: "dashboard" };
//#endregion
//#region pages/admin/orders/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$10 = { layout: "dashboard" };
//#endregion
//#region pages/admin/privacy-policy/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$9 = { layout: "dashboard" };
//#endregion
//#region pages/admin/products/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$8 = { layout: "dashboard" };
//#endregion
//#region pages/admin/return-policy/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$7 = { layout: "dashboard" };
//#endregion
//#region pages/admin/roles/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$6 = { layout: "dashboard" };
//#endregion
//#region pages/admin/settings/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$5 = { layout: "dashboard" };
//#endregion
//#region pages/admin/staff/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$4 = { layout: "dashboard" };
//#endregion
//#region pages/admin/storefront/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$3 = { layout: "dashboard" };
//#endregion
//#region pages/admin/index.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$2 = { layout: "dashboard" };
//#endregion
//#region pages/compare.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta$1 = { middleware: [function(to, from) {
	return navigateTo("/my-account/compare", { redirectCode: 301 });
}] };
//#endregion
//#region pages/wishlist.vue?macro=true&vue&type=script&setup=true&lang.ts
var __nuxt_page_meta = { middleware: [function(to, from) {
	return navigateTo("/my-account/wishlist", { redirectCode: 301 });
}] };
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Froutes.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default = [
	{
		name: "admin-admins-create",
		path: "/admin/admins/create",
		meta: __nuxt_page_meta$53 || {},
		component: () => import('../build/create-Bn1nSIlu.mjs')
	},
	{
		name: "admin-attributes-create",
		path: "/admin/attributes/create",
		meta: __nuxt_page_meta$52 || {},
		component: () => import('../build/create-DVrw3SYV.mjs')
	},
	{
		name: "admin-brands-create",
		path: "/admin/brands/create",
		meta: __nuxt_page_meta$51 || {},
		component: () => import('../build/create-DjNzLtZm.mjs')
	},
	{
		name: "admin-categories-create",
		path: "/admin/categories/create",
		meta: __nuxt_page_meta$50 || {},
		component: () => import('../build/create-Bqt59Guz.mjs')
	},
	{
		name: "admin-colors-create",
		path: "/admin/colors/create",
		meta: __nuxt_page_meta$49 || {},
		component: () => import('../build/create-D7uqEKEX.mjs')
	},
	{
		name: "admin-coupons-create",
		path: "/admin/coupons/create",
		meta: __nuxt_page_meta$48 || {},
		component: () => import('../build/create-CaHkSBUR.mjs')
	},
	{
		name: "admin-navbar-create",
		path: "/admin/navbar/create",
		meta: __nuxt_page_meta$47 || {},
		component: () => import('../build/create--VPtGww5.mjs')
	},
	{
		name: "admin-products-create",
		path: "/admin/products/create",
		meta: __nuxt_page_meta$46 || {},
		component: () => import('../build/create-Bswo3IlX.mjs')
	},
	{
		name: "admin-roles-create",
		path: "/admin/roles/create",
		meta: __nuxt_page_meta$45 || {},
		component: () => import('../build/create-zTrx6oWL.mjs')
	},
	{
		name: "admin-staff-create",
		path: "/admin/staff/create",
		meta: __nuxt_page_meta$44 || {},
		component: () => import('../build/create-t4eY_pbr.mjs')
	},
	{
		name: __nuxt_page_meta$41?.name,
		path: "/admin/admins/:id()",
		meta: __nuxt_page_meta$41 || {},
		component: () => import('../build/_id_-DM2Esjbg.mjs'),
		children: [{
			name: "admin-admins-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$43 || {},
			component: () => import('../build/edit-DQRu5DfX.mjs')
		}, {
			name: "admin-admins-id",
			path: "",
			meta: __nuxt_page_meta$42 || {},
			component: () => import('../build/_id_-DPBOhjGW.mjs')
		}]
	},
	{
		name: "admin-attributes-id",
		path: "/admin/attributes/:id()",
		meta: __nuxt_page_meta$40 || {},
		component: () => import('../build/_id_-nOdmz7St.mjs')
	},
	{
		name: "admin-brands-id",
		path: "/admin/brands/:id()",
		meta: __nuxt_page_meta$39 || {},
		component: () => import('../build/_id_-CHN_-O2t.mjs')
	},
	{
		name: "admin-categories-id",
		path: "/admin/categories/:id()",
		meta: __nuxt_page_meta$38 || {},
		component: () => import('../build/_id_-CKyB93YJ.mjs')
	},
	{
		name: "admin-colors-id",
		path: "/admin/colors/:id()",
		meta: __nuxt_page_meta$37 || {},
		component: () => import('../build/_id_-PSgblo05.mjs')
	},
	{
		name: "admin-contact-messages-id",
		path: "/admin/contact-messages/:id()",
		meta: __nuxt_page_meta$36 || {},
		component: () => import('../build/_id_-D2oBCtrN.mjs')
	},
	{
		name: "admin-coupons-id",
		path: "/admin/coupons/:id()",
		meta: __nuxt_page_meta$35 || {},
		component: () => import('../build/_id_-DuGDJX0P.mjs')
	},
	{
		name: "admin-customers-id",
		path: "/admin/customers/:id()",
		meta: __nuxt_page_meta$34 || {},
		component: () => import('../build/_id_-DM6WfpqD.mjs')
	},
	{
		name: "admin-navbar-id",
		path: "/admin/navbar/:id()",
		meta: __nuxt_page_meta$33 || {},
		component: () => import('../build/_id_-C8ne01xr.mjs')
	},
	{
		name: "admin-orders-id",
		path: "/admin/orders/:id()",
		meta: __nuxt_page_meta$32 || {},
		component: () => import('../build/_id_-g7OHzPJq.mjs')
	},
	{
		name: "admin-products-id",
		path: "/admin/products/:id()",
		meta: __nuxt_page_meta$31 || {},
		component: () => import('../build/_id_-DN_DOyNf.mjs')
	},
	{
		name: __nuxt_page_meta$28?.name,
		path: "/admin/roles/:id()",
		meta: __nuxt_page_meta$28 || {},
		component: () => import('../build/_id_-q9fvkAjX.mjs'),
		children: [{
			name: "admin-roles-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$30 || {},
			component: () => import('../build/edit-6dayZfW9.mjs').then((n) => n.n)
		}, {
			name: "admin-roles-id",
			path: "",
			meta: __nuxt_page_meta$29 || {},
			component: () => import('../build/_id_-yD8nfME-.mjs')
		}]
	},
	{
		name: __nuxt_page_meta$25?.name,
		path: "/admin/staff/:id()",
		meta: __nuxt_page_meta$25 || {},
		component: () => import('../build/_id_-Br-a7-fc.mjs'),
		children: [{
			name: "admin-staff-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$27 || {},
			component: () => import('../build/edit-DVBaTPL2.mjs').then((n) => n.n)
		}, {
			name: "admin-staff-id",
			path: "",
			meta: __nuxt_page_meta$26 || {},
			component: () => import('../build/_id_-C9XstMoh.mjs')
		}]
	},
	{
		name: "admin-about-us",
		path: "/admin/about-us",
		meta: __nuxt_page_meta$24 || {},
		component: () => import('../build/about-us-BtemaPLX.mjs')
	},
	{
		name: "admin-admins",
		path: "/admin/admins",
		meta: __nuxt_page_meta$23 || {},
		component: () => import('../build/admins-AMOJTaSD.mjs')
	},
	{
		name: "admin-analytics",
		path: "/admin/analytics",
		meta: __nuxt_page_meta$22 || {},
		component: () => import('../build/analytics-DLayf66g.mjs')
	},
	{
		name: "admin-attributes",
		path: "/admin/attributes",
		meta: __nuxt_page_meta$21 || {},
		component: () => import('../build/attributes-DJS7utRe.mjs')
	},
	{
		name: "admin-brands",
		path: "/admin/brands",
		meta: __nuxt_page_meta$20 || {},
		component: () => import('../build/brands-3UuPs3za.mjs')
	},
	{
		name: "admin-categories",
		path: "/admin/categories",
		meta: __nuxt_page_meta$19 || {},
		component: () => import('../build/categories-Cmv93XAz.mjs')
	},
	{
		name: "admin-colors",
		path: "/admin/colors",
		meta: __nuxt_page_meta$18 || {},
		component: () => import('../build/colors-DUL0nMYp.mjs')
	},
	{
		name: "admin-contact-messages",
		path: "/admin/contact-messages",
		meta: __nuxt_page_meta$17 || {},
		component: () => import('../build/contact-messages-DTsd7HP0.mjs')
	},
	{
		name: "admin-contact-settings",
		path: "/admin/contact-settings",
		meta: __nuxt_page_meta$16 || {},
		component: () => import('../build/contact-settings-CkEu188Y.mjs')
	},
	{
		name: "admin-coupons",
		path: "/admin/coupons",
		meta: __nuxt_page_meta$15 || {},
		component: () => import('../build/coupons-COJ2cLby.mjs')
	},
	{
		name: "admin-custom-role",
		path: "/admin/custom-role",
		meta: __nuxt_page_meta$14 || {},
		component: () => import('../build/custom-role-BcEa-zdW.mjs')
	},
	{
		name: "admin-customers",
		path: "/admin/customers",
		meta: __nuxt_page_meta$13 || {},
		component: () => import('../build/customers-BVl8hcmy.mjs')
	},
	{
		name: "admin-login",
		path: "/admin/login",
		meta: __nuxt_page_meta$12 || {},
		component: () => import('../build/login-BOx_cxg5.mjs')
	},
	{
		name: "admin-navbar",
		path: "/admin/navbar",
		meta: __nuxt_page_meta$11 || {},
		component: () => import('../build/navbar-Czq5NRYN.mjs')
	},
	{
		name: "admin-orders",
		path: "/admin/orders",
		meta: __nuxt_page_meta$10 || {},
		component: () => import('../build/orders-B8iVHVOy.mjs')
	},
	{
		name: "admin-privacy-policy",
		path: "/admin/privacy-policy",
		meta: __nuxt_page_meta$9 || {},
		component: () => import('../build/privacy-policy-Rz8LaUIW.mjs')
	},
	{
		name: "admin-products",
		path: "/admin/products",
		meta: __nuxt_page_meta$8 || {},
		component: () => import('../build/products-DNY6Y8MP.mjs')
	},
	{
		name: "admin-return-policy",
		path: "/admin/return-policy",
		meta: __nuxt_page_meta$7 || {},
		component: () => import('../build/return-policy-xaWawUhn.mjs')
	},
	{
		name: "admin-roles",
		path: "/admin/roles",
		meta: __nuxt_page_meta$6 || {},
		component: () => import('../build/roles-BKONRJwq.mjs').then((n) => n.n)
	},
	{
		name: "admin-settings",
		path: "/admin/settings",
		meta: __nuxt_page_meta$5 || {},
		component: () => import('../build/settings-BdzM7aUr.mjs')
	},
	{
		name: "admin-staff",
		path: "/admin/staff",
		meta: __nuxt_page_meta$4 || {},
		component: () => import('../build/staff-Cc5ca9qR.mjs').then((n) => n.n)
	},
	{
		name: "admin-storefront",
		path: "/admin/storefront",
		meta: __nuxt_page_meta$3 || {},
		component: () => import('../build/storefront-BAjFT1PX.mjs')
	},
	{
		name: "my-account-addresses",
		path: "/my-account/addresses",
		component: () => import('../build/addresses-BmeOrIDF.mjs')
	},
	{
		name: "my-account-compare",
		path: "/my-account/compare",
		component: () => import('../build/compare-lHdnyQab.mjs')
	},
	{
		name: "my-account-coupons",
		path: "/my-account/coupons",
		component: () => import('../build/coupons-CDzIYYVi.mjs')
	},
	{
		name: "my-account-details",
		path: "/my-account/details",
		component: () => import('../build/details-CSJfoEAt.mjs')
	},
	{
		name: "my-account-orders",
		path: "/my-account/orders",
		component: () => import('../build/orders-DMpahHZ0.mjs')
	},
	{
		name: "my-account-support-tickets",
		path: "/my-account/support-tickets",
		component: () => import('../build/support-tickets-BvefI6gA.mjs')
	},
	{
		name: "my-account-wishlist",
		path: "/my-account/wishlist",
		component: () => import('../build/wishlist-azJuf0O7.mjs')
	},
	{
		name: "blog-slug",
		path: "/blog/:slug()",
		component: () => import('../build/_slug_-BPXntgrI.mjs')
	},
	{
		name: "product-id",
		path: "/product/:id()",
		component: () => import('../build/_id_-B1pWaSkQ.mjs')
	},
	{
		name: "product-slug",
		path: "/product/:slug()",
		component: () => import('../build/_slug_-uW1KYjcW.mjs').then((n) => n.n)
	},
	{
		name: "brand-catchall",
		path: "/brand/:slug(.*)*",
		component: () => import('../build/_...slug_-DQD_nG5g.mjs')
	},
	{
		name: "category-catchall",
		path: "/category/:slug(.*)*",
		component: () => import('../build/_...slug_-CxEUsdE7.mjs')
	},
	{
		name: "about-us",
		path: "/about-us",
		component: () => import('../build/about-us-BqEtYycX.mjs')
	},
	{
		name: "admin",
		path: "/admin",
		meta: __nuxt_page_meta$2 || {},
		component: () => import('../build/admin-hFy4fqK9.mjs')
	},
	{
		name: "blog",
		path: "/blog",
		component: () => import('../build/blog-CzrfC541.mjs')
	},
	{
		name: "cart",
		path: "/cart",
		component: () => import('../build/cart-Db325QEW.mjs')
	},
	{
		name: "checkout",
		path: "/checkout",
		component: () => import('../build/checkout-DoWfWLRG.mjs')
	},
	{
		name: "compare",
		path: "/compare",
		meta: __nuxt_page_meta$1 || {},
		component: () => import('../build/compare-D-qhGb9P.mjs')
	},
	{
		name: "contact-us",
		path: "/contact-us",
		component: () => import('../build/contact-us-B12clQJT.mjs')
	},
	{
		name: "forgot-password",
		path: "/forgot-password",
		component: () => import('../build/forgot-password-D3H79O-0.mjs')
	},
	{
		name: "login",
		path: "/login",
		component: () => import('../build/login-z0N9CZRz.mjs')
	},
	{
		name: "my-account",
		path: "/my-account",
		component: () => import('../build/my-account-DW1YNu8D.mjs')
	},
	{
		name: "new-arrivals",
		path: "/new-arrivals",
		component: () => import('../build/new-arrivals-BKuELp8E.mjs')
	},
	{
		name: "privacy-policy",
		path: "/privacy-policy",
		component: () => import('../build/privacy-policy-qasR-lmK.mjs')
	},
	{
		name: "return-policy",
		path: "/return-policy",
		component: () => import('../build/return-policy-CKl3XPO3.mjs')
	},
	{
		name: "search",
		path: "/search",
		component: () => import('../build/search-CivLdH_Y.mjs')
	},
	{
		name: void 0,
		path: "/shop",
		component: () => import('../build/shop-lme9R9Zs.mjs'),
		children: [{
			name: "shop",
			path: "",
			component: () => import('../build/shop-B2psNGKu.mjs')
		}]
	},
	{
		name: "wishlist",
		path: "/wishlist",
		meta: __nuxt_page_meta || {},
		component: () => import('../build/wishlist-D1lmXHNQ.mjs')
	},
	{
		name: "slug",
		path: "/:slug(.*)*",
		component: () => import('../build/_...slug_-DTb5adPC.mjs')
	},
	{
		name: "index",
		path: "/",
		component: () => import('../build/pages-Dds_IhlF.mjs')
	},
	{
		name: "en-admin-admins-create",
		path: "/en/admin/admins/create",
		meta: __nuxt_page_meta$53 || {},
		component: () => import('../build/create-Bn1nSIlu.mjs')
	},
	{
		name: "en-admin-attributes-create",
		path: "/en/admin/attributes/create",
		meta: __nuxt_page_meta$52 || {},
		component: () => import('../build/create-DVrw3SYV.mjs')
	},
	{
		name: "en-admin-brands-create",
		path: "/en/admin/brands/create",
		meta: __nuxt_page_meta$51 || {},
		component: () => import('../build/create-DjNzLtZm.mjs')
	},
	{
		name: "en-admin-categories-create",
		path: "/en/admin/categories/create",
		meta: __nuxt_page_meta$50 || {},
		component: () => import('../build/create-Bqt59Guz.mjs')
	},
	{
		name: "en-admin-colors-create",
		path: "/en/admin/colors/create",
		meta: __nuxt_page_meta$49 || {},
		component: () => import('../build/create-D7uqEKEX.mjs')
	},
	{
		name: "en-admin-coupons-create",
		path: "/en/admin/coupons/create",
		meta: __nuxt_page_meta$48 || {},
		component: () => import('../build/create-CaHkSBUR.mjs')
	},
	{
		name: "en-admin-navbar-create",
		path: "/en/admin/navbar/create",
		meta: __nuxt_page_meta$47 || {},
		component: () => import('../build/create--VPtGww5.mjs')
	},
	{
		name: "en-admin-products-create",
		path: "/en/admin/products/create",
		meta: __nuxt_page_meta$46 || {},
		component: () => import('../build/create-Bswo3IlX.mjs')
	},
	{
		name: "en-admin-roles-create",
		path: "/en/admin/roles/create",
		meta: __nuxt_page_meta$45 || {},
		component: () => import('../build/create-zTrx6oWL.mjs')
	},
	{
		name: "en-admin-staff-create",
		path: "/en/admin/staff/create",
		meta: __nuxt_page_meta$44 || {},
		component: () => import('../build/create-t4eY_pbr.mjs')
	},
	{
		name: __nuxt_page_meta$41?.name,
		path: "/en/admin/admins/:id()",
		meta: __nuxt_page_meta$41 || {},
		component: () => import('../build/_id_-DM2Esjbg.mjs'),
		children: [{
			name: "en-admin-admins-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$43 || {},
			component: () => import('../build/edit-DQRu5DfX.mjs')
		}, {
			name: "en-admin-admins-id",
			path: "",
			meta: __nuxt_page_meta$42 || {},
			component: () => import('../build/_id_-DPBOhjGW.mjs')
		}]
	},
	{
		name: "en-admin-attributes-id",
		path: "/en/admin/attributes/:id()",
		meta: __nuxt_page_meta$40 || {},
		component: () => import('../build/_id_-nOdmz7St.mjs')
	},
	{
		name: "en-admin-brands-id",
		path: "/en/admin/brands/:id()",
		meta: __nuxt_page_meta$39 || {},
		component: () => import('../build/_id_-CHN_-O2t.mjs')
	},
	{
		name: "en-admin-categories-id",
		path: "/en/admin/categories/:id()",
		meta: __nuxt_page_meta$38 || {},
		component: () => import('../build/_id_-CKyB93YJ.mjs')
	},
	{
		name: "en-admin-colors-id",
		path: "/en/admin/colors/:id()",
		meta: __nuxt_page_meta$37 || {},
		component: () => import('../build/_id_-PSgblo05.mjs')
	},
	{
		name: "en-admin-contact-messages-id",
		path: "/en/admin/contact-messages/:id()",
		meta: __nuxt_page_meta$36 || {},
		component: () => import('../build/_id_-D2oBCtrN.mjs')
	},
	{
		name: "en-admin-coupons-id",
		path: "/en/admin/coupons/:id()",
		meta: __nuxt_page_meta$35 || {},
		component: () => import('../build/_id_-DuGDJX0P.mjs')
	},
	{
		name: "en-admin-customers-id",
		path: "/en/admin/customers/:id()",
		meta: __nuxt_page_meta$34 || {},
		component: () => import('../build/_id_-DM6WfpqD.mjs')
	},
	{
		name: "en-admin-navbar-id",
		path: "/en/admin/navbar/:id()",
		meta: __nuxt_page_meta$33 || {},
		component: () => import('../build/_id_-C8ne01xr.mjs')
	},
	{
		name: "en-admin-orders-id",
		path: "/en/admin/orders/:id()",
		meta: __nuxt_page_meta$32 || {},
		component: () => import('../build/_id_-g7OHzPJq.mjs')
	},
	{
		name: "en-admin-products-id",
		path: "/en/admin/products/:id()",
		meta: __nuxt_page_meta$31 || {},
		component: () => import('../build/_id_-DN_DOyNf.mjs')
	},
	{
		name: __nuxt_page_meta$28?.name,
		path: "/en/admin/roles/:id()",
		meta: __nuxt_page_meta$28 || {},
		component: () => import('../build/_id_-q9fvkAjX.mjs'),
		children: [{
			name: "en-admin-roles-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$30 || {},
			component: () => import('../build/edit-6dayZfW9.mjs').then((n) => n.n)
		}, {
			name: "en-admin-roles-id",
			path: "",
			meta: __nuxt_page_meta$29 || {},
			component: () => import('../build/_id_-yD8nfME-.mjs')
		}]
	},
	{
		name: __nuxt_page_meta$25?.name,
		path: "/en/admin/staff/:id()",
		meta: __nuxt_page_meta$25 || {},
		component: () => import('../build/_id_-Br-a7-fc.mjs'),
		children: [{
			name: "en-admin-staff-id-edit",
			path: "edit",
			meta: __nuxt_page_meta$27 || {},
			component: () => import('../build/edit-DVBaTPL2.mjs').then((n) => n.n)
		}, {
			name: "en-admin-staff-id",
			path: "",
			meta: __nuxt_page_meta$26 || {},
			component: () => import('../build/_id_-C9XstMoh.mjs')
		}]
	},
	{
		name: "en-admin-about-us",
		path: "/en/admin/about-us",
		meta: __nuxt_page_meta$24 || {},
		component: () => import('../build/about-us-BtemaPLX.mjs')
	},
	{
		name: "en-admin-admins",
		path: "/en/admin/admins",
		meta: __nuxt_page_meta$23 || {},
		component: () => import('../build/admins-AMOJTaSD.mjs')
	},
	{
		name: "en-admin-analytics",
		path: "/en/admin/analytics",
		meta: __nuxt_page_meta$22 || {},
		component: () => import('../build/analytics-DLayf66g.mjs')
	},
	{
		name: "en-admin-attributes",
		path: "/en/admin/attributes",
		meta: __nuxt_page_meta$21 || {},
		component: () => import('../build/attributes-DJS7utRe.mjs')
	},
	{
		name: "en-admin-brands",
		path: "/en/admin/brands",
		meta: __nuxt_page_meta$20 || {},
		component: () => import('../build/brands-3UuPs3za.mjs')
	},
	{
		name: "en-admin-categories",
		path: "/en/admin/categories",
		meta: __nuxt_page_meta$19 || {},
		component: () => import('../build/categories-Cmv93XAz.mjs')
	},
	{
		name: "en-admin-colors",
		path: "/en/admin/colors",
		meta: __nuxt_page_meta$18 || {},
		component: () => import('../build/colors-DUL0nMYp.mjs')
	},
	{
		name: "en-admin-contact-messages",
		path: "/en/admin/contact-messages",
		meta: __nuxt_page_meta$17 || {},
		component: () => import('../build/contact-messages-DTsd7HP0.mjs')
	},
	{
		name: "en-admin-contact-settings",
		path: "/en/admin/contact-settings",
		meta: __nuxt_page_meta$16 || {},
		component: () => import('../build/contact-settings-CkEu188Y.mjs')
	},
	{
		name: "en-admin-coupons",
		path: "/en/admin/coupons",
		meta: __nuxt_page_meta$15 || {},
		component: () => import('../build/coupons-COJ2cLby.mjs')
	},
	{
		name: "en-admin-custom-role",
		path: "/en/admin/custom-role",
		meta: __nuxt_page_meta$14 || {},
		component: () => import('../build/custom-role-BcEa-zdW.mjs')
	},
	{
		name: "en-admin-customers",
		path: "/en/admin/customers",
		meta: __nuxt_page_meta$13 || {},
		component: () => import('../build/customers-BVl8hcmy.mjs')
	},
	{
		name: "en-admin-login",
		path: "/en/admin/login",
		meta: __nuxt_page_meta$12 || {},
		component: () => import('../build/login-BOx_cxg5.mjs')
	},
	{
		name: "en-admin-navbar",
		path: "/en/admin/navbar",
		meta: __nuxt_page_meta$11 || {},
		component: () => import('../build/navbar-Czq5NRYN.mjs')
	},
	{
		name: "en-admin-orders",
		path: "/en/admin/orders",
		meta: __nuxt_page_meta$10 || {},
		component: () => import('../build/orders-B8iVHVOy.mjs')
	},
	{
		name: "en-admin-privacy-policy",
		path: "/en/admin/privacy-policy",
		meta: __nuxt_page_meta$9 || {},
		component: () => import('../build/privacy-policy-Rz8LaUIW.mjs')
	},
	{
		name: "en-admin-products",
		path: "/en/admin/products",
		meta: __nuxt_page_meta$8 || {},
		component: () => import('../build/products-DNY6Y8MP.mjs')
	},
	{
		name: "en-admin-return-policy",
		path: "/en/admin/return-policy",
		meta: __nuxt_page_meta$7 || {},
		component: () => import('../build/return-policy-xaWawUhn.mjs')
	},
	{
		name: "en-admin-roles",
		path: "/en/admin/roles",
		meta: __nuxt_page_meta$6 || {},
		component: () => import('../build/roles-BKONRJwq.mjs').then((n) => n.n)
	},
	{
		name: "en-admin-settings",
		path: "/en/admin/settings",
		meta: __nuxt_page_meta$5 || {},
		component: () => import('../build/settings-BdzM7aUr.mjs')
	},
	{
		name: "en-admin-staff",
		path: "/en/admin/staff",
		meta: __nuxt_page_meta$4 || {},
		component: () => import('../build/staff-Cc5ca9qR.mjs').then((n) => n.n)
	},
	{
		name: "en-admin-storefront",
		path: "/en/admin/storefront",
		meta: __nuxt_page_meta$3 || {},
		component: () => import('../build/storefront-BAjFT1PX.mjs')
	},
	{
		name: "en-my-account-addresses",
		path: "/en/my-account/addresses",
		component: () => import('../build/addresses-BmeOrIDF.mjs')
	},
	{
		name: "en-my-account-compare",
		path: "/en/my-account/compare",
		component: () => import('../build/compare-lHdnyQab.mjs')
	},
	{
		name: "en-my-account-coupons",
		path: "/en/my-account/coupons",
		component: () => import('../build/coupons-CDzIYYVi.mjs')
	},
	{
		name: "en-my-account-details",
		path: "/en/my-account/details",
		component: () => import('../build/details-CSJfoEAt.mjs')
	},
	{
		name: "en-my-account-orders",
		path: "/en/my-account/orders",
		component: () => import('../build/orders-DMpahHZ0.mjs')
	},
	{
		name: "en-my-account-support-tickets",
		path: "/en/my-account/support-tickets",
		component: () => import('../build/support-tickets-BvefI6gA.mjs')
	},
	{
		name: "en-my-account-wishlist",
		path: "/en/my-account/wishlist",
		component: () => import('../build/wishlist-azJuf0O7.mjs')
	},
	{
		name: "en-blog-slug",
		path: "/en/blog/:slug()",
		component: () => import('../build/_slug_-BPXntgrI.mjs')
	},
	{
		name: "en-product-id",
		path: "/en/product/:id()",
		component: () => import('../build/_id_-B1pWaSkQ.mjs')
	},
	{
		name: "en-product-slug",
		path: "/en/product/:slug()",
		component: () => import('../build/_slug_-uW1KYjcW.mjs').then((n) => n.n)
	},
	{
		name: "en-brand-slug",
		path: "/en/brand/:slug(.*)*",
		component: () => import('../build/_...slug_-DQD_nG5g.mjs')
	},
	{
		name: "en-category-slug",
		path: "/en/category/:slug(.*)*",
		component: () => import('../build/_...slug_-CxEUsdE7.mjs')
	},
	{
		name: "en-about-us",
		path: "/en/about-us",
		component: () => import('../build/about-us-BqEtYycX.mjs')
	},
	{
		name: "en-admin",
		path: "/en/admin",
		meta: __nuxt_page_meta$2 || {},
		component: () => import('../build/admin-hFy4fqK9.mjs')
	},
	{
		name: "en-blog",
		path: "/en/blog",
		component: () => import('../build/blog-CzrfC541.mjs')
	},
	{
		name: "en-cart",
		path: "/en/cart",
		component: () => import('../build/cart-Db325QEW.mjs')
	},
	{
		name: "en-checkout",
		path: "/en/checkout",
		component: () => import('../build/checkout-DoWfWLRG.mjs')
	},
	{
		name: "en-compare",
		path: "/en/compare",
		meta: __nuxt_page_meta$1 || {},
		component: () => import('../build/compare-D-qhGb9P.mjs')
	},
	{
		name: "en-contact-us",
		path: "/en/contact-us",
		component: () => import('../build/contact-us-B12clQJT.mjs')
	},
	{
		name: "en-forgot-password",
		path: "/en/forgot-password",
		component: () => import('../build/forgot-password-D3H79O-0.mjs')
	},
	{
		name: "en-login",
		path: "/en/login",
		component: () => import('../build/login-z0N9CZRz.mjs')
	},
	{
		name: "en-my-account",
		path: "/en/my-account",
		component: () => import('../build/my-account-DW1YNu8D.mjs')
	},
	{
		name: "en-new-arrivals",
		path: "/en/new-arrivals",
		component: () => import('../build/new-arrivals-BKuELp8E.mjs')
	},
	{
		name: "en-privacy-policy",
		path: "/en/privacy-policy",
		component: () => import('../build/privacy-policy-qasR-lmK.mjs')
	},
	{
		name: "en-return-policy",
		path: "/en/return-policy",
		component: () => import('../build/return-policy-CKl3XPO3.mjs')
	},
	{
		name: "en-search",
		path: "/en/search",
		component: () => import('../build/search-CivLdH_Y.mjs')
	},
	{
		name: void 0,
		path: "/en/shop",
		component: () => import('../build/shop-lme9R9Zs.mjs'),
		children: [{
			name: "en-shop",
			path: "",
			component: () => import('../build/shop-B2psNGKu.mjs')
		}]
	},
	{
		name: "en-wishlist",
		path: "/en/wishlist",
		meta: __nuxt_page_meta || {},
		component: () => import('../build/wishlist-D1lmXHNQ.mjs')
	},
	{
		name: "en-index",
		path: "/en",
		component: () => import('../build/pages-Dds_IhlF.mjs')
	}
];
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/plugins/router.js
var plugin$1 = defineNuxtPlugin({
	name: "nuxt:router",
	enforce: "pre",
	async setup(nuxtApp) {
		let __temp, __restore;
		let routerBase = useRuntimeConfig().app.baseURL;
		const history = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.history?.(routerBase) ?? createMemoryHistory(routerBase);
		const routes = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes ? ([__temp, __restore] = executeAsync(() => virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.routes(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default)), __temp = await __temp, __restore(), __temp) ?? virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default : virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Froutes_default;
		let startPosition;
		const router = createRouter({
			...virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default,
			scrollBehavior: (to, from, savedPosition) => {
				if (from === START_LOCATION) {
					startPosition = savedPosition;
					return;
				}
				if (virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior) {
					router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
					if ("scrollRestoration" in (void 0).history) {
						const unsub = router.beforeEach(() => {
							unsub();
							(void 0).history.scrollRestoration = "manual";
						});
					}
					return virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
				}
			},
			history,
			routes
		});
		nuxtApp.vueApp.use(router);
		const previousRoute = shallowRef(router.currentRoute.value);
		router.afterEach((_to, from) => {
			previousRoute.value = from;
		});
		Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", { get: () => previousRoute.value });
		const initialURL = nuxtApp.ssrContext.url;
		const _route = shallowRef(router.currentRoute.value);
		const syncCurrentRoute = () => {
			_route.value = router.currentRoute.value;
		};
		router.afterEach((to, from) => {
			const lastTo = to.matched.at(-1)?.components?.default;
			const lastFrom = from.matched.at(-1)?.components?.default;
			if (lastTo === lastFrom) {
				if (generateRouteKey({
					route: to,
					Component: { type: lastTo }
				}) === generateRouteKey({
					route: from,
					Component: { type: lastFrom }
				})) syncCurrentRoute();
				return;
			}
			if (to.matched.length < from.matched.length && to.matched.every((m, i) => m.components?.default === from.matched[i]?.components?.default)) syncCurrentRoute();
		});
		const route = { sync: syncCurrentRoute };
		for (const key in _route.value) Object.defineProperty(route, key, {
			get: () => _route.value[key],
			enumerable: true
		});
		nuxtApp._route = shallowReactive(route);
		nuxtApp._middleware ||= {
			global: [],
			named: {}
		};
		const error = useError();
		const isServerPage = nuxtApp.ssrContext?.islandContext?.name?.startsWith("page_");
		if (!nuxtApp.ssrContext?.islandContext || isServerPage) router.afterEach(async (to, _from, failure) => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			if (failure) await nuxtApp.callHook("page:loading:end");
			if (failure?.type === 4) return;
			if (to.redirectedFrom && to.fullPath !== initialURL) await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
		});
		try {
			[__temp, __restore] = executeAsync(() => router.push(initialURL)), __temp = await __temp, __restore();
			[__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
		} catch (error) {
			[__temp, __restore] = executeAsync(() => _showErrorUnlessCrawler(nuxtApp, error)), await __temp, __restore();
		}
		const resolvedInitialRoute = router.currentRoute.value;
		syncCurrentRoute();
		if (nuxtApp.ssrContext?.islandContext && !isServerPage) return { provide: { router } };
		const initialLayout = nuxtApp.payload.state._layout;
		router.beforeEach(async (to, from) => {
			await nuxtApp.callHook("page:loading:start");
			to.meta = reactive(to.meta);
			if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) to.meta.layout = initialLayout;
			nuxtApp._processingMiddleware = true;
			nuxtApp._middlewareTo = to;
			if (!nuxtApp.ssrContext?.islandContext || isServerPage) {
				const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
				for (const component of to.matched) {
					const componentMiddleware = component.meta.middleware;
					if (!componentMiddleware) continue;
					for (const entry of toArray(componentMiddleware)) middlewareEntries.add(entry);
				}
				const routeRules = getRouteRules({ path: to.path });
				if (routeRules.appMiddleware) for (const key in routeRules.appMiddleware) if (routeRules.appMiddleware[key]) middlewareEntries.add(key);
				else middlewareEntries.delete(key);
				for (const entry of middlewareEntries) {
					const middleware = typeof entry === "string" ? nuxtApp._middleware.named[entry] || await namedMiddleware[entry]?.().then((r) => r.default || r) : entry;
					if (!middleware) throw navigationDiagnostics.NUXT_E2004({
						entry: String(entry),
						validMiddleware: void 0
					});
					try {
						const result = await nuxtApp.runWithContext(() => middleware(to, from));
						if (result === false || result instanceof Error) {
							const error = result || createError$1({
								status: 404,
								statusText: `Page Not Found: ${initialURL}`
							});
							await nuxtApp.runWithContext(() => showError(error));
							return false;
						}
						if (result === true) continue;
						if (result === false) return result;
						if (result) {
							if (isNuxtError(result) && result.fatal) await nuxtApp.runWithContext(() => showError(result));
							return result;
						}
					} catch (err) {
						const error = createError$1(err);
						if (error.fatal) await nuxtApp.runWithContext(() => showError(error));
						return error;
					}
				}
			}
		});
		if (isServerPage) router.beforeResolve((to) => {
			const expected = pageIslandRoutes[nuxtApp.ssrContext.islandContext.name];
			const actual = to.matched.find((m) => (m.components?.default)?.__nuxt_island)?.components?.default;
			if (!expected || expected !== actual?.__nuxt_island) {
				nuxtApp.ssrContext["~renderResponse"] = {
					statusCode: 400,
					statusMessage: "Invalid island request path"
				};
				return false;
			}
		});
		router.onError(async () => {
			delete nuxtApp._processingMiddleware;
			delete nuxtApp._middlewareTo;
			await nuxtApp.callHook("page:loading:end");
		});
		router.afterEach((to) => {
			if (to.matched.length === 0 && !error.value) return nuxtApp.runWithContext(() => showError(createError$1({
				status: 404,
				fatal: false,
				statusText: `Page not found: ${to.fullPath}`,
				data: { path: to.fullPath }
			})));
		});
		nuxtApp.hooks.hookOnce("app:created", async () => {
			try {
				if ("name" in resolvedInitialRoute) resolvedInitialRoute.name = void 0;
				await router.replace({
					...resolvedInitialRoute,
					force: true
				});
				router.options.scrollBehavior = virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Frouter_options_default.scrollBehavior;
			} catch (error) {
				await _showErrorUnlessCrawler(nuxtApp, error);
			}
		});
		return { provide: { router } };
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/plugins/revive-payload.server.js
var reducers = [
	["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
	["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
	["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
	["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
	["Ref", (data) => isRef(data) && data.value],
	["Reactive", (data) => isReactive(data) && toRaw(data)]
];
var plugin = /* @__PURE__ */ defineNuxtPlugin({
	name: "nuxt:revive-payload:server",
	setup() {
		for (const [reducer, fn] of reducers) definePayloadReducer(reducer, fn);
	}
});
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fcomponents.plugin.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default = defineNuxtPlugin({ name: "nuxt:global-components" });
//#endregion
//#region composables/useAdminLanguage.ts
/**
* Centralized Multi-Language Composable for Aswar Jeddah Admin Panel
*
* Supports nested JSON dictionary keys from `locales/admin/ar.json` and `locales/admin/en.json`.
* Features:
* - Reactive state persistence in localStorage ('admin_lang') and cookies ('admin_lang').
* - Dynamic RTL / LTR layout switching.
* - String variable interpolation (e.g. {name}, {count}).
* - Fallback to Arabic and key string if translation is missing.
*/
var dictionaries = {
	ar: { admin: /* @__PURE__ */ JSON.parse("{\"sidebar\":{\"dashboard\":\"الرئيسية\",\"analytics\":\"التقارير والإحصائيات\",\"products\":\"المنتجات\",\"categories\":\"التصنيفات\",\"brands\":\"العلامات التجارية\",\"colors\":\"الألوان\",\"attributes\":\"السمات والخصائص\",\"orders\":\"الطلبات\",\"customers\":\"العملاء\",\"coupons\":\"الكوبونات والخصومات\",\"settings\":\"الإعدادات\",\"staff\":\"المشرفين والصلاحيات\",\"storefront\":\"الواجهة الرئيسية\",\"navbar\":\"شريط التنقل والقوائم\",\"about_us\":\"صفحة من نحن\",\"return_policy\":\"سياسة الاستبدال والاسترجاع\",\"privacy_policy\":\"سياسة الخصوصية والشروط\",\"contact_messages\":\"رسائل الزوار\",\"contact_settings\":\"إعدادات التواصل\",\"view_store\":\"عرض المتجر\",\"logout\":\"تسجيل الخروج\",\"panel_title\":\"لوحة تحكم أسوار جدة\"},\"common\":{\"search\":\"بحث...\",\"search_placeholder\":\"ابحث بالاسم أو الرمز...\",\"add\":\"إضافة\",\"add_new\":\"إضافة جديد\",\"edit\":\"تعديل\",\"delete\":\"حذف\",\"save\":\"حفظ التغييرات\",\"saving\":\"جاري الحفظ...\",\"cancel\":\"إلغاء\",\"confirm\":\"تأكيد\",\"confirm_delete\":\"هل أنت متأكد من الحذف؟ لا يمكن التراجع عن هذا الإجراء.\",\"actions\":\"الإجراءات\",\"status\":\"الحالة\",\"active\":\"نشط\",\"inactive\":\"غير نشط\",\"enabled\":\"مفعل\",\"disabled\":\"معطل\",\"all\":\"الكل\",\"filter\":\"تصفية\",\"reset_filter\":\"إعادة تعيين\",\"loading\":\"جاري التحميل...\",\"no_data\":\"لا توجد بيانات متاحة حالياً\",\"refresh\":\"تحديث\",\"total\":\"الإجمالي\",\"export\":\"تصدير\",\"import\":\"استيراد\",\"back\":\"رجوع\",\"view\":\"عرض\",\"details\":\"التفاصيل\",\"success\":\"تمت العملية بنجاح\",\"error\":\"حدث خطأ ما، يرجى المحاولة لاحقاً\",\"image\":\"الصورة\",\"images\":\"الصور\",\"name\":\"الاسم\",\"name_ar\":\"الاسم بالعربية\",\"name_en\":\"الاسم بالإنجليزية\",\"description\":\"الوصف\",\"description_ar\":\"الوصف بالعربية\",\"description_en\":\"الوصف بالإنجليزية\",\"created_at\":\"تاريخ الإنشاء\",\"updated_at\":\"تاريخ التحديث\",\"yes\":\"نعم\",\"no\":\"لا\",\"optional\":\"اختياري\",\"required\":\"مطلوب\",\"currency\":\"ر.س\",\"select\":\"اختر...\",\"upload_image\":\"رفع صورة\",\"drag_drop_image\":\"اسحب وأفلت الصورة هنا أو اضغط للاختيار\"},\"products\":{\"title\":\"إدارة المنتجات\",\"subtitle\":\"استعراض، إضافة، وتعديل كافة المنتجات وأسعارها ومخزونها في المتجر.\",\"add_product\":\"إضافة منتج جديد\",\"edit_product\":\"تعديل المنتج\",\"product_name\":\"اسم المنتج\",\"sku\":\"رمز المنتج (SKU)\",\"barcode\":\"الباركود\",\"category\":\"التصنيف\",\"brand\":\"العلامة التجارية\",\"price\":\"السعر الأصلي\",\"sale_price\":\"سعر الخصم\",\"cost_price\":\"سعر التكلفة\",\"stock\":\"الكمية بالمخزون\",\"stock_status\":\"حالة المخزون\",\"in_stock\":\"متوفر\",\"out_of_stock\":\"نفذ من المخزون\",\"low_stock\":\"مخزون منخفض\",\"featured\":\"منتج مميز\",\"is_featured\":\"إظهار في المنتجات المميزة\",\"publish_status\":\"حالة النشر\",\"published\":\"منشور\",\"draft\":\"مسودة\",\"basic_info\":\"المعلومات الأساسية\",\"pricing_inventory\":\"الأسعار والمخزون\",\"media\":\"صور المنتج\",\"attributes_variants\":\"الخصائص والأنواع\",\"seo_settings\":\"تهيئة محركات البحث (SEO)\",\"meta_title\":\"عنوان السيو (Meta Title)\",\"meta_description\":\"وصف السيو (Meta Description)\",\"delete_product_confirm\":\"هل أنت متأكد من رغبتك في حذف هذا المنتج؟\",\"products_count\":\"منتج\"},\"categories\":{\"title\":\"إدارة التصنيفات\",\"subtitle\":\"تنظيم أقسام وتصنيفات المتجر الرئيسية والفرعية وترتيبها.\",\"add_category\":\"إضافة تصنيف جديد\",\"edit_category\":\"تعديل التصنيف\",\"category_name\":\"اسم التصنيف\",\"parent_category\":\"التصنيف الأب\",\"no_parent\":\"تصنيف رئيسي (بدون أب)\",\"subcategories\":\"التصنيفات الفرعية\",\"slug\":\"الرابط الدائم (Slug)\",\"icon\":\"الأيقونة\",\"order\":\"الترتيب\",\"delete_category_confirm\":\"هل أنت متأكد من حذف هذا التصنيف؟ سيتم فك ارتباط المنتجات التابعة له.\"},\"orders\":{\"title\":\"إدارة الطلبات\",\"subtitle\":\"متابعة طلبات العملاء وتحديث حالات الشحن والدفع والفواتير.\",\"order_number\":\"رقم الطلب\",\"customer\":\"العميل\",\"customer_name\":\"اسم العميل\",\"customer_phone\":\"رقم الهاتف\",\"order_date\":\"تاريخ الطلب\",\"total_amount\":\"إجمالي المبلغ\",\"order_status\":\"حالة الطلب\",\"payment_status\":\"حالة الدفع\",\"payment_method\":\"طريقة الدفع\",\"shipping_address\":\"عنوان الشحن\",\"order_items\":\"منتجات الطلب\",\"item\":\"المنتج\",\"quantity\":\"الكمية\",\"unit_price\":\"سعر الوحدة\",\"subtotal\":\"المجموع الفرعي\",\"shipping_fee\":\"رسوم الشحن\",\"discount\":\"الخصم\",\"grand_total\":\"المجموع النهائي\",\"status_pending\":\"قيد الانتظار\",\"status_confirmed\":\"تم التأكيد\",\"status_processing\":\"قيد التجهيز\",\"status_out_for_delivery\":\"خرج للتوصيل\",\"status_delivered\":\"تم التوصيل\",\"status_cancelled\":\"ملغي\",\"status_returned\":\"مرتجع\",\"payment_paid\":\"مدفوع\",\"payment_unpaid\":\"غير مدفوع\",\"payment_refunded\":\"مسترد\",\"print_invoice\":\"طباعة الفاتورة\",\"update_status\":\"تحديث الحالة\"},\"brands\":{\"title\":\"إدارة العلامات التجارية\",\"subtitle\":\"إدارة الماركات والشركات المصنعة المعروضة في المتجر.\",\"add_brand\":\"إضافة علامة تجارية\",\"edit_brand\":\"تعديل العلامة التجارية\",\"brand_name\":\"اسم العلامة التجارية\",\"logo\":\"الشعار (Logo)\",\"website\":\"الموقع الإلكتروني\",\"products_count\":\"عدد المنتجات\"},\"colors\":{\"title\":\"إدارة الألوان\",\"subtitle\":\"تحديد قائمة الألوان ورموز HEX الخاصة بخيارات المنتجات.\",\"add_color\":\"إضافة لون جديد\",\"edit_color\":\"تعديل اللون\",\"color_name\":\"اسم اللون\",\"hex_code\":\"كود اللون (HEX)\",\"preview\":\"معاينة اللون\"},\"attributes\":{\"title\":\"إدارة السمات والخصائص\",\"subtitle\":\"تخصيص الخصائص المتغيرة للمنتجات (مثل الحجم، السعة، المقاس).\",\"add_attribute\":\"إضافة سمة جديدة\",\"edit_attribute\":\"تعديل السمة\",\"attribute_name\":\"اسم السمة\",\"values\":\"القيم المتاحة\",\"add_value\":\"إضافة قيمة\"},\"customers\":{\"title\":\"إدارة العملاء\",\"subtitle\":\"قائمة العملاء المسجلين وسجل طلباتهم وعناوينهم المحفوظة.\",\"customer_details\":\"بيانات العميل\",\"email\":\"البريد الإلكتروني\",\"phone\":\"رقم الجوال\",\"orders_count\":\"عدد الطلبات\",\"total_spent\":\"إجمالي المشتريات\",\"registered_date\":\"تاريخ التسجيل\",\"saved_addresses\":\"العناوين المحفوظة\"},\"coupons\":{\"title\":\"إدارة الكوبونات والخصومات\",\"subtitle\":\"إنشاء وتفعيل أكواد التخفيض وتحديد فترات الصلاحية وشروط الاستخدام.\",\"add_coupon\":\"إنشاء كوبون جديد\",\"edit_coupon\":\"تعديل الكوبون\",\"coupon_code\":\"كود الكوبون\",\"discount_type\":\"نوع الخصم\",\"discount_value\":\"قيمة الخصم\",\"percentage\":\"نسبة مئوية (%)\",\"fixed_amount\":\"مبلغ ثابت (ر.س)\",\"min_purchase\":\"الحد الأدنى للطلب\",\"max_discount\":\"الحد الأقصى للخصم\",\"start_date\":\"تاريخ البدء\",\"end_date\":\"تاريخ الانتهاء\",\"usage_limit\":\"حد الاستخدام الإجمالي\",\"user_limit\":\"حد الاستخدام لكل عميل\",\"usage_count\":\"مرات الاستخدام\"},\"analytics\":{\"title\":\"لوحة المؤشرات والتقارير\",\"subtitle\":\"نظرة عامة على المبيعات، أداء الطلبات، ونمو العملاء بالمتجر.\",\"total_revenue\":\"إجمالي المبيعات\",\"total_orders\":\"إجمالي الطلبات\",\"total_customers\":\"إجمالي العملاء\",\"average_order\":\"متوسط قيمة الطلب\",\"sales_overview\":\"مخطط المبيعات\",\"top_selling_products\":\"المنتجات الأكثر مبيعاً\",\"recent_orders\":\"أحدث الطلبات\",\"period_today\":\"اليوم\",\"period_week\":\"هذا الأسبوع\",\"period_month\":\"هذا الشهر\",\"period_year\":\"هذا العام\"},\"settings\":{\"title\":\"إعدادات المتجر\",\"subtitle\":\"التحكم في بيانات المتجر، سياسات الشحن، وسائل الدفع، والمعلومات العامة.\",\"store_info\":\"بيانات المتجر العامة\",\"store_name\":\"اسم المتجر\",\"contact_email\":\"بريد التواصل\",\"contact_phone\":\"هاتف التواصل / الواتساب\",\"address\":\"عنوان المقر\",\"social_links\":\"روابط التواصل الاجتماعي\",\"facebook\":\"فيسبوك\",\"instagram\":\"إنستغرام\",\"tiktok\":\"تيك توك\",\"snapchat\":\"سناب شات\",\"shipping_settings\":\"إعدادات الشحن والتوصيل\",\"default_shipping_fee\":\"رسوم الشحن الافتراضية\",\"free_shipping_min\":\"الحد الأدنى للشحن المجاني\",\"payment_settings\":\"إعدادات الدفع\"},\"staff\":{\"title\":\"إدارة المشرفين والصلاحيات\",\"subtitle\":\"إدارة حسابات مدراء النظام وتحديد صلاحيات الوصول للأقسام.\",\"add_staff\":\"إضافة مشرف جديد\",\"edit_staff\":\"تعديل بيانات المشرف\",\"staff_name\":\"اسم المشرف\",\"email\":\"البريد الإلكتروني\",\"role\":\"الدور الوظيفي\",\"role_admin\":\"مدير عام (Full Admin)\",\"role_manager\":\"مدير متجر\",\"role_editor\":\"محرر محتوى\",\"password\":\"كلمة المرور\",\"password_placeholder\":\"اتركه فارغاً للإبقاء على كلمة المرور الحالية\"},\"storefront\":{\"title\":\"إدارة الواجهة الرئيسية للمتجر\",\"subtitle\":\"السيطرة والتحكم الكامل في كافة أقسام المتجر، السكاشن الفرعية، الصور والروابط.\",\"add_section\":\"إضافة قسم جديد\",\"edit_section\":\"تعديل القسم\",\"section_type\":\"نوع القسم\",\"hero_slider\":\"شريط البانر الرئيسي (Hero Slider)\",\"banner_grid\":\"شبكة الإعلانات والبانرات\",\"featured_categories\":\"الأقسام المميزة\",\"product_carousel\":\"شريط المنتجات التفاعلي\",\"deals_section\":\"عروض وتخفيضات خاصة\",\"title_text\":\"عنوان القسم\",\"subtitle_text\":\"العنوان الفرعي\",\"link_url\":\"رابط التوجيه\",\"badge_text\":\"نص الشارة المميزة\",\"button_text\":\"نص زر الإجراء\",\"display_order\":\"ترتيب العرض\",\"visible\":\"ظاهر بالصفحة الرئيسية\",\"hidden\":\"مخفي\"},\"contact_messages\":{\"title\":\"رسائل واستفسارات العملاء\",\"subtitle\":\"استعراض وإدارة كافة الرسائل والاستفسارات الواردة من صفحة تواصل معنا.\",\"total_messages\":\"رسالة\",\"unread_messages\":\"رسائل غير مقروءة\",\"all_messages\":\"كافة الرسائل\",\"unread\":\"غير مقروءة\",\"read\":\"مقروءة\",\"sender_name\":\"اسم المرسل\",\"sender_email\":\"البريد الإلكتروني\",\"sender_phone\":\"رقم الهاتف\",\"subject\":\"الموضوع\",\"message\":\"نص الرسالة\",\"sent_date\":\"تاريخ الإرسال\",\"status\":\"حالة القراءة\",\"details_title\":\"تفاصيل رسالة العميل\",\"sender_details\":\"بيانات المرسل\",\"message_content\":\"محتوى الرسالة\",\"reply_email\":\"الرد عبر البريد\",\"chat_whatsapp\":\"مراسلة عبر واتساب\",\"delete_message\":\"حذف الرسالة\",\"bulk_delete\":\"حذف المحدد\",\"confirm_delete_single\":\"هل أنت متأكد من رغبتك في حذف هذه الرسالة نهائياً؟\",\"confirm_delete_bulk\":\"هل أنت متأكد من حذف {count} رسالة محددة؟\",\"back_to_list\":\"العودة لقائمة الرسائل\",\"search_placeholder\":\"ابحث باسم المرسل، البريد، الهاتف أو الموضوع...\",\"no_messages\":\"لا توجد رسائل مطابقة حالياً\"}}") },
	en: { admin: {
		"sidebar": {
			"dashboard": "Dashboard",
			"analytics": "Reports & Analytics",
			"products": "Products",
			"categories": "Categories",
			"brands": "Brands",
			"colors": "Colors",
			"attributes": "Attributes",
			"orders": "Orders",
			"customers": "Customers",
			"coupons": "Coupons & Discounts",
			"settings": "Settings",
			"staff": "Staff & Roles",
			"storefront": "Storefront Manager",
			"navbar": "Navbar & Menus",
			"about_us": "About Us Page",
			"return_policy": "Return & Refund Policy",
			"privacy_policy": "Privacy Policy & Terms",
			"contact_messages": "Visitor Messages",
			"contact_settings": "Contact Settings",
			"view_store": "View Store",
			"logout": "Logout",
			"panel_title": "Aswar Jeddah Admin"
		},
		"common": {
			"search": "Search...",
			"search_placeholder": "Search by name or code...",
			"add": "Add",
			"add_new": "Add New",
			"edit": "Edit",
			"delete": "Delete",
			"save": "Save Changes",
			"saving": "Saving...",
			"cancel": "Cancel",
			"confirm": "Confirm",
			"confirm_delete": "Are you sure you want to delete this item? This action cannot be undone.",
			"actions": "Actions",
			"status": "Status",
			"active": "Active",
			"inactive": "Inactive",
			"enabled": "Enabled",
			"disabled": "Disabled",
			"all": "All",
			"filter": "Filter",
			"reset_filter": "Reset Filter",
			"loading": "Loading...",
			"no_data": "No data available currently",
			"refresh": "Refresh",
			"total": "Total",
			"export": "Export",
			"import": "Import",
			"back": "Back",
			"view": "View",
			"details": "Details",
			"success": "Operation completed successfully",
			"error": "An error occurred, please try again later",
			"image": "Image",
			"images": "Images",
			"name": "Name",
			"name_ar": "Arabic Name",
			"name_en": "English Name",
			"description": "Description",
			"description_ar": "Arabic Description",
			"description_en": "English Description",
			"created_at": "Created Date",
			"updated_at": "Updated Date",
			"yes": "Yes",
			"no": "No",
			"optional": "Optional",
			"required": "Required",
			"currency": "SAR",
			"select": "Select...",
			"upload_image": "Upload Image",
			"drag_drop_image": "Drag & drop image here or click to select"
		},
		"products": {
			"title": "Products Management",
			"subtitle": "Explore, add, and manage all store products, prices, and stock inventory.",
			"add_product": "Add New Product",
			"edit_product": "Edit Product",
			"product_name": "Product Name",
			"sku": "Product SKU",
			"barcode": "Barcode",
			"category": "Category",
			"brand": "Brand",
			"price": "Regular Price",
			"sale_price": "Sale Price",
			"cost_price": "Cost Price",
			"stock": "Stock Quantity",
			"stock_status": "Stock Status",
			"in_stock": "In Stock",
			"out_of_stock": "Out of Stock",
			"low_stock": "Low Stock",
			"featured": "Featured Product",
			"is_featured": "Display in Featured Products",
			"publish_status": "Publish Status",
			"published": "Published",
			"draft": "Draft",
			"basic_info": "Basic Information",
			"pricing_inventory": "Pricing & Inventory",
			"media": "Product Media",
			"attributes_variants": "Attributes & Variations",
			"seo_settings": "Search Engine Optimization (SEO)",
			"meta_title": "SEO Meta Title",
			"meta_description": "SEO Meta Description",
			"delete_product_confirm": "Are you sure you want to delete this product?",
			"products_count": "Products"
		},
		"categories": {
			"title": "Categories Management",
			"subtitle": "Organize, sort, and manage main and sub categories across the store.",
			"add_category": "Add New Category",
			"edit_category": "Edit Category",
			"category_name": "Category Name",
			"parent_category": "Parent Category",
			"no_parent": "Main Category (No Parent)",
			"subcategories": "Subcategories",
			"slug": "Slug",
			"icon": "Icon",
			"order": "Display Order",
			"delete_category_confirm": "Are you sure you want to delete this category? Associated products will be unlinked."
		},
		"orders": {
			"title": "Orders Management",
			"subtitle": "Track customer orders, update shipping and payment statuses, and view invoices.",
			"order_number": "Order ID",
			"customer": "Customer",
			"customer_name": "Customer Name",
			"customer_phone": "Phone Number",
			"order_date": "Order Date",
			"total_amount": "Total Amount",
			"order_status": "Order Status",
			"payment_status": "Payment Status",
			"payment_method": "Payment Method",
			"shipping_address": "Shipping Address",
			"order_items": "Order Items",
			"item": "Product",
			"quantity": "Quantity",
			"unit_price": "Unit Price",
			"subtotal": "Subtotal",
			"shipping_fee": "Shipping Fee",
			"discount": "Discount",
			"grand_total": "Grand Total",
			"status_pending": "Pending",
			"status_confirmed": "Confirmed",
			"status_processing": "Processing",
			"status_out_for_delivery": "Out for Delivery",
			"status_delivered": "Delivered",
			"status_cancelled": "Cancelled",
			"status_returned": "Returned",
			"payment_paid": "Paid",
			"payment_unpaid": "Unpaid",
			"payment_refunded": "Refunded",
			"print_invoice": "Print Invoice",
			"update_status": "Update Status"
		},
		"brands": {
			"title": "Brands Management",
			"subtitle": "Manage manufacturers, brands, and partner logos displayed across the store.",
			"add_brand": "Add New Brand",
			"edit_brand": "Edit Brand",
			"brand_name": "Brand Name",
			"logo": "Brand Logo",
			"website": "Official Website",
			"products_count": "Products Count"
		},
		"colors": {
			"title": "Colors Management",
			"subtitle": "Define the list of available product colors and their HEX codes.",
			"add_color": "Add New Color",
			"edit_color": "Edit Color",
			"color_name": "Color Name",
			"hex_code": "HEX Color Code",
			"preview": "Color Preview"
		},
		"attributes": {
			"title": "Attributes Management",
			"subtitle": "Customize product variable attributes (e.g. Size, Storage, Capacity).",
			"add_attribute": "Add New Attribute",
			"edit_attribute": "Edit Attribute",
			"attribute_name": "Attribute Name",
			"values": "Available Values",
			"add_value": "Add Value"
		},
		"customers": {
			"title": "Customers Management",
			"subtitle": "View registered customer accounts, order history, and saved addresses.",
			"customer_details": "Customer Details",
			"email": "Email Address",
			"phone": "Mobile Phone",
			"orders_count": "Total Orders",
			"total_spent": "Total Spent",
			"registered_date": "Registration Date",
			"saved_addresses": "Saved Addresses"
		},
		"coupons": {
			"title": "Coupons & Discounts Management",
			"subtitle": "Create and manage promotional discount codes, validity periods, and limits.",
			"add_coupon": "Create New Coupon",
			"edit_coupon": "Edit Coupon",
			"coupon_code": "Coupon Code",
			"discount_type": "Discount Type",
			"discount_value": "Discount Value",
			"percentage": "Percentage (%)",
			"fixed_amount": "Fixed Amount (SAR)",
			"min_purchase": "Minimum Order Amount",
			"max_discount": "Maximum Discount Cap",
			"start_date": "Start Date",
			"end_date": "End Date",
			"usage_limit": "Total Usage Limit",
			"user_limit": "Limit Per Customer",
			"usage_count": "Times Used"
		},
		"analytics": {
			"title": "Analytics & Reports Dashboard",
			"subtitle": "Overview of store sales, order performance, and customer growth trends.",
			"total_revenue": "Total Revenue",
			"total_orders": "Total Orders",
			"total_customers": "Total Customers",
			"average_order": "Average Order Value",
			"sales_overview": "Sales Overview Chart",
			"top_selling_products": "Top Selling Products",
			"recent_orders": "Recent Orders",
			"period_today": "Today",
			"period_week": "This Week",
			"period_month": "This Month",
			"period_year": "This Year"
		},
		"settings": {
			"title": "Store Settings",
			"subtitle": "Manage store information, shipping policies, payment gateways, and contact info.",
			"store_info": "General Store Information",
			"store_name": "Store Name",
			"contact_email": "Contact Email",
			"contact_phone": "Contact Phone / WhatsApp",
			"address": "Store Address",
			"social_links": "Social Media Links",
			"facebook": "Facebook",
			"instagram": "Instagram",
			"tiktok": "TikTok",
			"snapchat": "Snapchat",
			"shipping_settings": "Shipping & Delivery Settings",
			"default_shipping_fee": "Default Shipping Fee",
			"free_shipping_min": "Free Shipping Minimum Threshold",
			"payment_settings": "Payment Gateways"
		},
		"staff": {
			"title": "Staff & Permissions Management",
			"subtitle": "Manage administrator accounts and customize their department permissions.",
			"add_staff": "Add New Staff Member",
			"edit_staff": "Edit Staff Member",
			"staff_name": "Staff Name",
			"email": "Email Address",
			"role": "Job Role",
			"role_admin": "Full Administrator",
			"role_manager": "Store Manager",
			"role_editor": "Content Editor",
			"password": "Password",
			"password_placeholder": "Leave empty to keep existing password"
		},
		"storefront": {
			"title": "Storefront Management",
			"subtitle": "Full control over home page layout, banner sliders, subsections, links, and images.",
			"add_section": "Add New Section",
			"edit_section": "Edit Section",
			"section_type": "Section Type",
			"hero_slider": "Hero Banner Slider",
			"banner_grid": "Promotional Banner Grid",
			"featured_categories": "Featured Categories",
			"product_carousel": "Interactive Products Carousel",
			"deals_section": "Special Offers & Discounts",
			"title_text": "Section Title",
			"subtitle_text": "Section Subtitle",
			"link_url": "Target Link URL",
			"badge_text": "Badge Text",
			"button_text": "Action Button Text",
			"display_order": "Display Order",
			"visible": "Visible on Home Page",
			"hidden": "Hidden"
		},
		"contact_messages": {
			"title": "Customer Inquiries & Messages",
			"subtitle": "View and manage all customer inquiries received from the Contact Us page.",
			"total_messages": "messages",
			"unread_messages": "unread messages",
			"all_messages": "All Messages",
			"unread": "Unread",
			"read": "Read",
			"sender_name": "Sender Name",
			"sender_email": "Email Address",
			"sender_phone": "Phone Number",
			"subject": "Subject",
			"message": "Message Content",
			"sent_date": "Sent Date",
			"status": "Read Status",
			"details_title": "Customer Message Details",
			"sender_details": "Sender Details",
			"message_content": "Message Content",
			"reply_email": "Reply via Email",
			"chat_whatsapp": "Chat on WhatsApp",
			"delete_message": "Delete Message",
			"bulk_delete": "Delete Selected",
			"confirm_delete_single": "Are you sure you want to permanently delete this message?",
			"confirm_delete_bulk": "Are you sure you want to delete {count} selected messages?",
			"back_to_list": "Back to Messages",
			"search_placeholder": "Search by sender name, email, phone or subject...",
			"no_messages": "No matching messages found"
		}
	} }
};
/**
* Resolves a nested key (e.g. 'admin.products.title') in a dictionary object.
*/
var resolveNestedKey = (obj, path) => {
	if (!obj || !path) return void 0;
	const keys = path.split(".");
	let current = obj;
	for (const key of keys) {
		if (current === void 0 || current === null) return void 0;
		current = current[key];
	}
	return typeof current === "string" ? current : void 0;
};
var useAdminLanguage = () => {
	const adminLanguage = useState("adminAppLanguage", () => {
		return "ar";
	});
	const adminDir = computed(() => adminLanguage.value === "en" ? "ltr" : "rtl");
	const isAdminRtl = computed(() => adminDir.value === "rtl");
	/**
	* Switch admin language
	*/
	const setAdminLanguage = (lang) => {
		if (adminLanguage.value !== lang) adminLanguage.value = lang;
	};
	/**
	* Toggle between Arabic and English
	*/
	const toggleAdminLanguage = () => {
		const nextLang = adminLanguage.value === "ar" ? "en" : "ar";
		setAdminLanguage(nextLang);
	};
	/**
	* Translation Helper
	* Supports nested keys (e.g., 'admin.products.title' or 'admin.common.save') and parameter interpolation.
	*/
	const t = (key, params, fallback) => {
		const currentDict = dictionaries[adminLanguage.value] || dictionaries.ar;
		const fallbackDict = dictionaries.ar;
		let text = resolveNestedKey(currentDict, key);
		if (!text) text = resolveNestedKey(fallbackDict, key);
		if (!text) text = fallback || key;
		if (params && typeof text === "string") for (const [k, val] of Object.entries(params)) text = text.replace(new RegExp(`\\{${k}\\}`, "g"), String(val));
		return text;
	};
	if (getCurrentInstance()) ;
	return {
		adminLanguage,
		currentLanguage: adminLanguage,
		locale: adminLanguage,
		adminDir,
		dir: adminDir,
		isAdminRtl,
		isRtl: isAdminRtl,
		setAdminLanguage,
		toggleAdminLanguage,
		t,
		$t: t
	};
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fplugins.server.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default = [
	plugin$2,
	plugin$1,
	plugin,
	virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fcomponents_plugin_default,
	defineNuxtPlugin((nuxtApp) => {
		const { t, adminLanguage, adminDir, toggleAdminLanguage, setAdminLanguage } = useAdminLanguage();
		return { provide: {
			t,
			adminLanguage,
			adminDir,
			toggleAdminLanguage,
			setAdminLanguage
		} };
	})
];
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Flayouts.mjs
var virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default = {
	dashboard: defineAsyncComponent(() => import('../build/dashboard-BrE8_bQc.mjs').then((m) => m.default || m)),
	default: defineAsyncComponent(() => import('../build/default-gbBy4QE0.mjs').then((m) => m.default || m))
};
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-layout.js
var LayoutLoader = defineComponent({
	name: "LayoutLoader",
	inheritAttrs: false,
	props: {
		name: String,
		layoutProps: Object
	},
	setup(props, context) {
		return () => h(virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default[props.name], props.layoutProps, context.slots);
	}
});
var nuxt_layout_default = defineComponent({
	name: "NuxtLayout",
	inheritAttrs: false,
	props: {
		name: {
			type: [
				String,
				Boolean,
				Object
			],
			default: null
		},
		fallback: {
			type: [String, Object],
			default: null
		}
	},
	setup(props, context) {
		const nuxtApp = useNuxtApp();
		const injectedRoute = inject(PageRouteSymbol);
		const route = !injectedRoute || injectedRoute === useRoute() ? useRoute$1() : injectedRoute;
		const layout = computed(() => {
			let layout = resolveLayoutName(route, props.name);
			if (layout && !(layout in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) {
				if (props.fallback) layout = unref(props.fallback);
			}
			return layout;
		});
		provide(LayoutSymbol, layout);
		const layoutRef = shallowRef();
		context.expose({ layoutRef });
		const done = nuxtApp.deferHydration();
		let lastLayout;
		return () => {
			const hasTransition = !!layout.value && layout.value in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default && !!(route?.meta.layoutTransition ?? false);
			const transitionProps = hasTransition && _mergeTransitionProps([
				route?.meta.layoutTransition,
				false,
				{
					onBeforeLeave() {
						nuxtApp["~transitionPromise"] = new Promise((resolve) => {
							nuxtApp["~transitionFinish"] = resolve;
						});
					},
					onAfterLeave() {
						nuxtApp["~transitionFinish"]?.();
						delete nuxtApp["~transitionFinish"];
						delete nuxtApp["~transitionPromise"];
					}
				}
			]);
			const previouslyRenderedLayout = lastLayout;
			lastLayout = layout.value;
			return _wrapInTransition(transitionProps, { default: () => h(Suspense, {
				suspensible: true,
				onResolve: async () => {
					await nextTick(done);
				}
			}, { default: () => h(LayoutProvider, {
				layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
				key: layout.value || void 0,
				name: layout.value,
				shouldProvide: !props.name,
				isRenderingNewLayout: (name) => {
					return name !== previouslyRenderedLayout && name === layout.value;
				},
				hasTransition
			}, context.slots) }) }).default();
		};
	}
});
var LayoutProvider = defineComponent({
	name: "NuxtLayoutProvider",
	inheritAttrs: false,
	props: {
		name: { type: [String, Boolean] },
		layoutProps: { type: Object },
		hasTransition: { type: Boolean },
		shouldProvide: { type: Boolean },
		isRenderingNewLayout: {
			type: Function,
			required: true
		}
	},
	setup(props, context) {
		const name = props.name;
		if (props.shouldProvide) provide(LayoutMetaSymbol, { isCurrent: (route) => name === false || name === resolveLayoutName(route) });
		const injectedRoute = inject(PageRouteSymbol);
		const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
		const enclosingLayout = inject(LayoutMetaSymbol, null);
		if (isNotWithinNuxtPage) {
			const vueRouterRoute = useRoute$1();
			const reactiveChildRoute = {};
			for (const _key in vueRouterRoute) {
				const key = _key;
				Object.defineProperty(reactiveChildRoute, key, {
					enumerable: true,
					get: () => {
						return props.isRenderingNewLayout(props.name) && (!enclosingLayout || enclosingLayout.isCurrent(vueRouterRoute)) ? vueRouterRoute[key] : injectedRoute[key];
					}
				});
			}
			provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
		}
		return () => {
			if (!name || typeof name === "string" && !(name in virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Flayouts_default)) return context.slots.default?.();
			return h(LayoutLoader, {
				key: name,
				layoutProps: props.layoutProps,
				name
			}, context.slots);
		};
	}
});
//#endregion
//#region node_modules/nuxt/dist/app/components/route-provider.js
var defineRouteProvider = (name = "RouteProvider") => defineComponent({
	name,
	props: {
		route: {
			type: Object,
			required: true
		},
		vnode: Object,
		vnodeRef: Object,
		renderKey: String,
		trackRootNodes: Boolean
	},
	setup(props) {
		const previousKey = props.renderKey;
		const previousRoute = props.route;
		const route = {};
		for (const key in props.route) Object.defineProperty(route, key, {
			get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
			enumerable: true
		});
		provide(PageRouteSymbol, shallowReactive(route));
		return () => {
			if (!props.vnode) return props.vnode;
			return h(props.vnode, { ref: props.vnodeRef });
		};
	}
});
var RouteProvider = defineRouteProvider();
//#endregion
//#region node_modules/nuxt/dist/pages/runtime/page.js
var page_default = defineComponent({
	name: "NuxtPage",
	inheritAttrs: false,
	props: {
		name: { type: String },
		transition: {
			type: [Boolean, Object],
			default: void 0
		},
		keepalive: {
			type: [Boolean, Object],
			default: void 0
		},
		route: { type: Object },
		pageKey: {
			type: [Function, String],
			default: null
		}
	},
	setup(props, { attrs, slots, expose }) {
		const nuxtApp = useNuxtApp();
		const pageRef = ref();
		inject(PageRouteSymbol, null);
		expose({ pageRef });
		inject(LayoutMetaSymbol, null);
		nuxtApp.deferHydration();
		return () => {
			return h(RouterView, {
				name: props.name,
				route: props.route,
				...attrs
			}, { default: markStableSlot((routeProps) => {
				return h(Suspense, { suspensible: true }, { default() {
					return h(RouteProvider, {
						vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
						route: routeProps.route,
						vnodeRef: pageRef
					});
				} });
			}) });
		};
	}
});
function markStableSlot(fn) {
	const wrapped = ((routeProps) => {
		const result = fn(routeProps);
		if (Array.isArray(result)) return result;
		if (result == null || !isVNode(result)) return [createCommentVNode()];
		return [result];
	});
	wrapped._n = true;
	return wrapped;
}
function normalizeSlot(slot, data) {
	const slotContent = slot(data);
	return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
//#endregion
//#region \0plugin-vue:export-helper
var _plugin_vue_export_helper_default = (sfc, props) => {
	const target = sfc.__vccOpts || sfc;
	for (const [key, val] of props) target[key] = val;
	return target;
};
//#endregion
//#region app.vue
var _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
	const _component_NuxtLayout = nuxt_layout_default;
	const _component_NuxtPage = page_default;
	_push(ssrRenderComponent(_component_NuxtLayout, _attrs, {
		default: withCtx((_, _push, _parent, _scopeId) => {
			if (_push) _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent, _scopeId));
			else return [createVNode(_component_NuxtPage)];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
	return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var app_default = /*#__PURE__*/ _plugin_vue_export_helper_default(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-error-page.vue
var _sfc_main$1 = {
	__name: "nuxt-error-page",
	__ssrInlineRender: true,
	props: { error: Object },
	setup(__props) {
		const _error = __props.error;
		const status = Number(_error.statusCode || 500);
		const is404 = status === 404;
		const statusText = _error.statusMessage ?? (is404 ? "Page Not Found" : "Internal Server Error");
		const description = _error.message || _error.toString();
		const stack = void 0;
		const _Error404 = defineAsyncComponent(() => import('../build/error-404-BB2OmjMj.mjs'));
		const _Error = defineAsyncComponent(() => import('../build/error-500-ByQ4chBB.mjs'));
		const ErrorTemplate = is404 ? _Error404 : _Error;
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(unref(ErrorTemplate), mergeProps({
				status: unref(status),
				statusText: unref(statusText),
				statusCode: unref(status),
				statusMessage: unref(statusText),
				description: unref(description),
				stack: unref(stack)
			}, _attrs), null, _parent));
		};
	}
};
var _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
	return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
//#endregion
//#region virtual:nuxt:node_modules%2F.cache%2Fnuxt%2F.nuxt%2Fisland-renderer.mjs
var IslandRenderer = () => null;
//#endregion
//#region node_modules/nuxt/dist/app/components/nuxt-root.vue
var _sfc_main = {
	__name: "nuxt-root",
	__ssrInlineRender: true,
	setup(__props) {
		const nuxtApp = useNuxtApp();
		nuxtApp.deferHydration();
		nuxtApp.ssrContext.url;
		const SingleRenderer = false;
		provide(PageRouteSymbol, useRoute());
		nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup", []);
		const error = useError();
		const abortRender = error.value && !nuxtApp.ssrContext.error;
		function invokeAppErrorHandler(err, target, info) {
			const errorHandler = nuxtApp.vueApp.config.errorHandler;
			if (errorHandler && !errorHandler.__nuxt_default) try {
				errorHandler(err, target, info);
			} catch (handlerError) {
				console.error("[nuxt] Error in `app.config.errorHandler`", handlerError);
			}
		}
		onErrorCaptured((err, target, info) => {
			nuxtApp.hooks.callHook("vue:error", err, target, info)?.catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
			{
				const p = nuxtApp.runWithContext(() => showError(err));
				onServerPrefetch(() => p);
				invokeAppErrorHandler(err, target, info);
				return false;
			}
		});
		const islandContext = nuxtApp.ssrContext.islandContext;
		return (_ctx, _push, _parent, _attrs) => {
			ssrRenderSuspense(_push, {
				default: () => {
					if (unref(abortRender)) _push(`<div></div>`);
					else if (unref(error)) _push(ssrRenderComponent(unref(_sfc_main$1), { error: unref(error) }, null, _parent));
					else if (unref(islandContext)) _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
					else if (unref(SingleRenderer)) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
					else _push(ssrRenderComponent(unref(app_default), null, null, _parent));
				},
				_: 1
			});
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
//#endregion
//#region node_modules/nuxt/dist/app/entry.js
var entry$1 = async function createNuxtAppServer(ssrContext) {
	const vueApp = createApp(_sfc_main);
	const nuxt = createNuxtApp({
		vueApp,
		ssrContext
	});
	try {
		await applyPlugins(nuxt, virtual_nuxt_node_modules_2F_cache_2Fnuxt_2F_nuxt_2Fplugins_server_default);
		await nuxt.hooks.callHook("app:created", vueApp);
	} catch (error) {
		await nuxt.hooks.callHook("app:error", error);
		nuxt.payload.error ||= createError$1(error);
	}
	if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) throw new Error("skipping render");
	return vueApp;
};
var entry_default = ((ssrContext) => entry$1(ssrContext));

const entry = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: entry_default
}, Symbol.toStringTag, { value: 'Module' }));

export { $fetch$2 as $, NuxtLink as N, _plugin_vue_export_helper_default as _, useToast as a, useAdminLanguage as b, useNuxtApp as c, defineNuxtRouteMiddleware as d, docsBase as e, useAdminAuth as f, useRuntimeConfig as g, useState as h, buildLocalePath as i, useRoute as j, useAdminPermissions as k, useAsyncData as l, page_default as m, navigateTo as n, appDiagnostics as o, prodReporters as p, entry as q, sanitizeTag as s, useCookie as u };
//# sourceMappingURL=entry.mjs.map
