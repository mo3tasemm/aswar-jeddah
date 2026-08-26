import { B as Breadcrumbs_default$1 } from './Breadcrumbs-DbmDaiX_.mjs';
import { defineComponent, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';

//#region components/Breadcrumbs.vue?vue&type=script&setup=true&lang.ts
var Breadcrumbs_vue_vue_type_script_setup_true_lang_default = /*@__PURE__*/ defineComponent({
	__name: "Breadcrumbs",
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
			_push(ssrRenderComponent(Breadcrumbs_default$1, mergeProps({
				items: __props.items,
				tiers: __props.tiers,
				"current-title": __props.currentTitle
			}, _attrs), null, _parent));
		};
	}
});
//#endregion
//#region components/Breadcrumbs.vue
var _sfc_setup = Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup;
Breadcrumbs_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Breadcrumbs.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Breadcrumbs_default = Object.assign(Breadcrumbs_vue_vue_type_script_setup_true_lang_default, { __name: "Breadcrumbs" });

export { Breadcrumbs_default as B };
//# sourceMappingURL=Breadcrumbs-BBY8An0U.mjs.map
