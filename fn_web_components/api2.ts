import { cloneNodeDeep } from "../fns/index";

type ComponentDeclaration<P extends object> = {
	render: (props: P) => string,
	props: P,
	attributeChangedCallbacks: {
		[K in keyof P]: (newVal: P[K], oldVal: P[K]) => any;
	},
	appended?: () => void,
	removed?: () => void,
};

const createElement = (rendered: string) => {
	const template = document.createElement("template");
	template.innerHTML = rendered;
	return template.content;
};

const makeComponent = <P extends object>(declaration: ComponentDeclaration<P>) => {
	return (templateTag: string) => {
		return { [templateTag]: class extends HTMLElement {
			public constructor() {
				super();
				this.attachShadow({ mode: "open" });
				this.shadowRoot?.appendChild(cloneNodeDeep(createElement(declaration.render(declaration.props))));
			}
			protected attributeChangedCallback<K extends keyof P>(attrName: K, newVal: P[K], oldVal: P[K]) {
				declaration.attributeChangedCallbacks[attrName](newVal, oldVal);
			}
			protected static get observedAttributes() {
				return Object.keys(declaration.attributeChangedCallbacks);
			}
			protected connectedCallback() {
				declaration.appended?.();
			}
			protected disconnectedCallback() {
				declaration.removed?.();
			}
		}}[templateTag];
	};
};

const initializeComponentUsageCache = () => {
	const cache: Record<string, boolean> = {};
	return (templateTag: string, componentBuilder: ReturnType<typeof makeComponent>) => {
		if (cache[templateTag])
			return;
		else {
			cache[templateTag] = true;
			window.customElements.define(templateTag, componentBuilder(templateTag));
		}
	};
};

export default {
	makeComponent,
	useComponent: initializeComponentUsageCache(),
};
