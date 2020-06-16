import { cloneNodeDeep } from "../fns/index";

export type AttributeChangeCallback<T> = (newVal: T, oldVal: T, context: HTMLElement) => any;

export type LifecycleCallback = (context: HTMLElement) => any;

export type ComponentDeclaration<P extends object> = {
	render: (props: P) => string,
	props: P,
	attributeChangedCallbacks: {
		[K in keyof P]: AttributeChangeCallback<P[K]>;
	},
	appended?: LifecycleCallback,
	removed?: LifecycleCallback,
};

const createElement = (rendered: string) => {
	const template = document.createElement("template");
	template.innerHTML = rendered;
	return template.content;
};

export const makeComponent = <P extends object>(declaration: ComponentDeclaration<P>) => {
	return class extends HTMLElement {
		public constructor() {
			super();
			this.attachShadow({ mode: "open" });
			this.shadowRoot?.appendChild(cloneNodeDeep(createElement(declaration.render(declaration.props))));
		}
		protected attributeChangedCallback<K extends keyof P>(attrName: K, newVal: P[K], oldVal: P[K]) {
			declaration.attributeChangedCallbacks[attrName](newVal, oldVal, this);
		}
		protected static get observedAttributes() {
			return Object.keys(declaration.attributeChangedCallbacks);
		}
		protected connectedCallback() {
			declaration.appended?.(this);
		}
		protected disconnectedCallback() {
			declaration.removed?.(this);
		}
	};
};

const initializeComponentUsageCache = () => {
	const cache: Record<string, boolean> = {};
	return (templateTag: string, componentBuilder: ReturnType<typeof makeComponent>) => {
		if (cache[templateTag])
			return;
		else {
			cache[templateTag] = true;
			window.customElements.define(templateTag, componentBuilder);
		}
	};
};

export const useComponent = initializeComponentUsageCache();
