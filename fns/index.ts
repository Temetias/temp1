// HTML ////////

export const cloneNode = (deep: boolean) => (node: DocumentFragment) => {
	return node.cloneNode(deep);
};

export const cloneNodeDeep = cloneNode(true);
export const cloneNodeShallow = cloneNode(false);

export const mapToHtmlString = <T>(cb: (x: T) => string) => (arr: T[]) => {
	return arr.map(cb).join("");
};

// GENERAL //////

export const is = (assertionValue: any) => (testValue: any) => {
	return assertionValue === testValue;
};

export const isDeclared = (val: any) => {
	return val !== null && val !== undefined;
};

export const identity = <T>(x: T) => x;

export const noOp = identity;

type UnaryFn<P, R> = (p: P) => R;

export const compose2 = <R1, P1, P2>(fn1: UnaryFn<P1, R1>, fn2: UnaryFn<P2, P1>) => {
	return (p: P2) => fn1(fn2(p));
};

export const compose3 = <R1, P1, P2, P3>(fn1: UnaryFn<P1, R1>, fn2: UnaryFn<P2, P1>, fn3: UnaryFn<P3, P2>) => {
	return (p: P3) => fn1(fn2(fn3(p)));
};

// STRING //////

export const isTrueString = is("true");
export const isFalseString = is("false");

export const prefixWith = (prefix: string) => (target: string) => {
	return `${prefix}${target}`;
};

export const suffixWith = (suffix: string) => (target: string) => {
	return `${target}${suffix}`;
};

export const replaceAll = (replace: string) => (search: string) => (target: string) => {
	return target.split(search).join(replace);
};

// ARRAY ///////

export const includes = <T>(x: T) => (arr: T[]) => {
	return arr.filter(y => y === x).length > 0;
};

// OBJECT //////

export const dumbClone = (obj: object) => {
	return JSON.parse(JSON.stringify(obj));
};

export const filterKey = (keyToFilter: string) => (obj: Record<string, any>) => {
	return Object.keys(obj).reduce((acc, cur) => cur === keyToFilter ? acc : { ...acc, [cur]: obj[cur]}, {});
};
