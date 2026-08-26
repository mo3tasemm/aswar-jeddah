import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';

//#region components/common/EmptyState.vue
var _sfc_main = {
	__name: "CommonEmptyState",
	__ssrInlineRender: true,
	props: {
		title: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		actionText: {
			type: String,
			default: ""
		}
	},
	emits: ["action"],
	setup(__props) {
		return (_ctx, _push, _parent, _attrs) => {
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-[2rem] p-10 md:p-16 text-center shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[400px] w-full" }, _attrs))}><div class="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 mx-auto border border-slate-100 shadow-inner">`);
			ssrRenderSlot(_ctx.$slots, "icon", {}, () => {
				_push(`<svg class="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`);
			}, _push, _parent);
			_push(`</div><h3 class="text-xl md:text-2xl font-black text-[#0B0E28] mb-3">${ssrInterpolate(__props.title)}</h3><p class="text-sm md:text-base text-slate-500 max-w-sm mx-auto mb-8 leading-relaxed">${ssrInterpolate(__props.description)}</p>`);
			if (__props.actionText) _push(`<button class="px-8 py-3.5 bg-[#0B0E28] text-amber-400 text-sm md:text-base font-bold rounded-2xl hover:bg-[#151a42] transition-all shadow-lg shadow-[#0B0E28]/10 hover:shadow-xl hover:-translate-y-0.5">${ssrInterpolate(__props.actionText)}</button>`);
			else ssrRenderSlot(_ctx.$slots, "action", {}, null, _push, _parent);
			_push(`</div>`);
		};
	}
};
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/EmptyState.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=EmptyState-DApFxOYg.mjs.map
