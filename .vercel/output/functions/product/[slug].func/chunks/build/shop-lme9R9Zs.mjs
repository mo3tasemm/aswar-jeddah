import { m as page_default } from '../virtual/entry.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
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

//#region pages/shop.vue?vue&type=script&setup=true&lang.ts
var shop_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "shop",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(page_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region pages/shop.vue
var _sfc_setup = shop_vue_vue_type_script_setup_true_lang_default.setup;
shop_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var shop_default = shop_vue_vue_type_script_setup_true_lang_default;

export { shop_default as default };
//# sourceMappingURL=shop-lme9R9Zs.mjs.map
