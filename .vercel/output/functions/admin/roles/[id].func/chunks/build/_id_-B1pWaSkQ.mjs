import { t as _slug__default } from './_slug_-uW1KYjcW.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import './rolldown-runtime-D7D4PA-g.mjs';
import '../virtual/entry.mjs';
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
import './head-CrPJzvuo.mjs';
import 'unhead/utils';
import './useLanguage-Dqkt54yZ.mjs';
import './useCart-CqauBZhc.mjs';
import './useCompare-BYK443T-.mjs';
import './useWishlist-BWj6pk_8.mjs';
import './Breadcrumbs-DbmDaiX_.mjs';
import './useProducts-BMlxn0rw.mjs';
import './productApiService-DKwZsTgl.mjs';
import './apiConfig-CCR2eNes.mjs';
import './ProductCard-B9ldMXFO.mjs';

//#region pages/product/[id].vue?vue&type=script&setup=true&lang.ts
var _id__vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "[id]",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(_slug__default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region pages/product/[id].vue
var _sfc_setup = _id__vue_vue_type_script_setup_true_lang_default.setup;
_id__vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/product/[id].vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var _id__default = _id__vue_vue_type_script_setup_true_lang_default;

export { _id__default as default };
//# sourceMappingURL=_id_-B1pWaSkQ.mjs.map
