import { B as Breadcrumbs_default } from './Breadcrumbs-DbmDaiX_.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

//#region components/Shop/ShopBreadcrumb.vue?vue&type=script&setup=true&lang.ts
var ShopBreadcrumb_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "ShopBreadcrumb",
	__ssrInlineRender: true,
	props: {
		items: {
			type: Array,
			default: void 0
		},
		tiers: {
			type: Array,
			default: void 0
		},
		currentTitle: {
			type: String,
			default: ""
		}
	},
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(ssrRenderComponent(Breadcrumbs_default, mergeProps({
				items: __props.items,
				tiers: __props.tiers,
				"current-title": __props.currentTitle
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region components/Shop/ShopBreadcrumb.vue
var _sfc_setup = ShopBreadcrumb_vue_vue_type_script_setup_true_lang_default.setup;
ShopBreadcrumb_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Shop/ShopBreadcrumb.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ShopBreadcrumb_default = Object.assign(ShopBreadcrumb_vue_vue_type_script_setup_true_lang_default, { __name: "ShopBreadcrumb" });

export { ShopBreadcrumb_default as S };
//# sourceMappingURL=ShopBreadcrumb-BeSt_caF.mjs.map
