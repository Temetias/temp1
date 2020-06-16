import { cloneNodeDeep, mapToHtmlString } from "../fns/index";

type Primitive = number | boolean | string;

type ComponentProps = Record<string, Primitive>;

type AttributeSetter = (name: string, value: Primitive) => void;

type ShadowQuerySelector = (selector: string) => null | HTMLElement;

type Component<P extends ComponentProps> = P & {
	shadowQuerySelector: ShadowQuerySelector,
	setAttribute: AttributeSetter,
	nativeApi: HTMLElement,
};

export interface ComponentDeclaration<P extends ComponentProps> {
	defaultProps: P,
	initialRender: (props: P) => string,
	connectedCallback?: (context: Component<P>) => void,
	disconnectedCallback?: (context: Component<P>) => void,
};

const convertInstanceToContext = <T extends HTMLElement, P extends ComponentProps>(instance: T & P, propKeys: (keyof P)[]): Component<P> => {
	return {
		...propKeys.reduce((acc, cur) => ({ ...acc, [cur]: instance[cur] }), {} as P),
		nativeApi: instance,
		shadowQuerySelector: (selector: string) => instance.shadowRoot!.querySelector(selector),
		setAttribute: (name: string, value: Primitive) => instance.setAttribute(name, `${value}`),
	};
};

const createElement = <P extends ComponentProps>(render: ReturnType<ComponentDeclaration<P>["initialRender"]>) => {
	const template = document.createElement("template");
	template.innerHTML = render;
	return template.content;
};

const extractProps = <P extends ComponentProps>(extractee: HTMLElement, defaultProps: P) => {
	return Object.keys(defaultProps).reduce(
		(acc, cur) => ({
			...acc,
			[cur]: defaultProps[cur].constructor(extractee.getAttribute(cur) || defaultProps[cur]),
		}),
		{} as P,
	);
};

export const makeComponent = <P extends ComponentProps>(declaration: ComponentDeclaration<P>) => {
	return class extends HTMLElement {
		constructor() {
			super();
			this.attachShadow({ mode: "open" });
			const props = extractProps(this, declaration.defaultProps);
			this.shadowRoot?.appendChild(cloneNodeDeep(createElement(declaration.initialRender(props))));
			Object.keys(declaration.defaultProps).forEach(k => {
				Object.defineProperty(this, k, { set: () => { console.log("asdf") } });
			});
		}
		connectedCallback() {
			declaration.connectedCallback?.(convertInstanceToContext(this as any as HTMLElement & P, Object.keys(declaration.defaultProps)));
		}
		disconnectedCallback() {
			declaration.disconnectedCallback?.(convertInstanceToContext(this as any as HTMLElement & P, Object.keys(declaration.defaultProps)));
		}
		static get observedAttributes() {
			return Object.keys(declaration.defaultProps);
		}
		attributeChangedCallback<K extends keyof P>(attrName: K, newVal: P[K], oldVal: P[K]) {
			(this as any as P)[attrName] = newVal;
		}
	};
};

const initializeComponentUsageCache = () => {
	const cache: Record<string, boolean> = {};
	return (templateTag: string, componentInstance: ReturnType<typeof makeComponent>) => {
		if (cache[templateTag]) return;
		else {
			cache[templateTag] = true;
			window.customElements.define(templateTag, componentInstance);
		}
	};
};

export const useComponent = initializeComponentUsageCache();

export const useComponents = (...components: [ string, ReturnType<typeof makeComponent> ][]) => {
	components.forEach(([tag, instance]) => useComponent(tag, instance));
};

export const componentMap = mapToHtmlString;
