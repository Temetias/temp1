import { cloneNodeDeep, mapToHtmlString } from "../fns/index";

export type RenderFunction<T extends object> = (props: T) => string;

export type ComponentDeclarationWithProps<T extends object> = {
	renderFunction: RenderFunction<T>;
	propParsers: PropertyParsers<T>;
};

export type ComponentDeclarationPropless = {
	renderFunction: RenderFunction<{}>;
};

export type ComponentDeclaration<T extends object> = {} extends T
	? ComponentDeclarationPropless
	: ComponentDeclarationWithProps<T>;

export type PropertyParsers<T> = {
	[K in keyof T]: (val: string | null) => T[K];
};

const createElement = <T extends object>(render: ReturnType<RenderFunction<T>>) => {
	const template = document.createElement("template");
	template.innerHTML = render;
	return template.content;
};

const declarationHasProps = <T extends object>(declaration: ComponentDeclarationWithProps<T> | ComponentDeclarationPropless): declaration is ComponentDeclarationWithProps<T> => {
	return !!(declaration as ComponentDeclarationWithProps<T>).propParsers;
};

const extractProps = <T extends object>(extractee: HTMLElement, declaration: ComponentDeclaration<T>) => {
	return declarationHasProps(declaration as ComponentDeclarationPropless)
		? Object.keys((declaration as ComponentDeclarationWithProps<T>).propParsers).reduce(
			(acc, cur) => ({ ...acc, [cur]: (declaration as ComponentDeclarationWithProps<T>).propParsers[cur as keyof T](extractee.getAttribute(cur)) }),
			{},
		) as T
		: {} as T;
}

export const makeComponent = <T extends object = {}>(declaration: ComponentDeclaration<T>) => (templateTag: string) => {
	return {[templateTag]: class extends HTMLElement {
		private props: T;
		public constructor() {
			super();
			this.props = extractProps(this, declaration);
			this.attachShadow({ mode: process.env.NODE_ENV === "development" ? "open" : "closed" });
			this.shadowRoot?.appendChild(cloneNodeDeep(createElement(declaration.renderFunction(this.props))));
			Object.keys(this.props).forEach(k => {
				Object.defineProperty(this, k, {
					set: (v: T[keyof T]) => {
						console.log(v);
						/* [].forEach.call(this.shadowRoot?.querySelectorAll(`[${k}]`), el => {

						}); */
					},
				});
			});
		}
		protected static get observedAttributes() {
			return declarationHasProps(declaration as ComponentDeclarationPropless)
				? Object.keys((declaration as ComponentDeclarationWithProps<T>).propParsers)
				: [];
		}
		protected attributeChangedCallback<T>(attrName: keyof T, oldValue: T, newValue: T) {
			if (oldValue === newValue)
				return;
			else
				(this as any as Record<keyof T, any>)[attrName] = newValue;
		}
	}}[templateTag];
};

const componentUseCache = () => {
	const cache: Record<string, boolean> = {};
	return (templateTag: string, componentFactory: (templateTag: string) => CustomElementConstructor) => {
		if (cache[templateTag])
			return;
		else {
			cache[templateTag] = true;
			window.customElements.define(templateTag, componentFactory(templateTag));
		}
	};
};

export const useComponent = componentUseCache();

export const useComponents = (...components: [string, (templateTag: string) => CustomElementConstructor][]) => {
	components.forEach(([ templateTag, componentConstructor ]) => useComponent(templateTag, componentConstructor));
};

export const componentMap = mapToHtmlString;
