import { t as roles_default } from './roles-BKONRJwq.mjs';
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
import './useAdminRolesAndAdmins-DKcWDju0.mjs';

//#region pages/admin/custom-role/index.vue?vue&type=script&setup=true&lang.ts
var index_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(roles_default, _attrs, null, _parent));
		};
	}
});
//#endregion
//#region pages/admin/custom-role/index.vue
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/custom-role/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var custom_role_default = index_vue_vue_type_script_setup_true_lang_default;

export { custom_role_default as default };
//# sourceMappingURL=custom-role-BcEa-zdW.mjs.map
