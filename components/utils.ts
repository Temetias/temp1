import { isDeclared } from "../fns/index";

export const intPropParser = (val: string | null) => {
	return parseInt(val || "0");
};

export const stringPropParser = (val: string | null) => {
	return val || "";
};

export const booleanPropParser = (val: string | null) => {
	return val === "true";
};

export const stringArrPropParser = (val: string | null) => {
	return !val
		? []
		: JSON.parse(val.replace(/'/g, '"'));
};

export const declarationParser = isDeclared;
