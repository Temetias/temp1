import { makeComponent } from "../fn_web_components/api";
import { intPropParser } from "./utils";

type ContainerProps = {
	spacing: number;
};

export type RowProps = ContainerProps;
export type ColumnProps = ContainerProps;

const containerRenderFunction = (orientation: "row" | "column") => ({ spacing }: ContainerProps) => /* html */`
	<style>
		div {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		div > * {
			margin-${orientation === "row" ? "right" : "bottom"}: ${spacing}rem;
		}

		div > *:last-child {
			margin: 0;
		}
	</style>
	<div><slot/></div>
`;

const containerPropsParsers = {
	propParsers: {
		spacing: intPropParser,
	},
};

export const row = makeComponent<RowProps>({
	renderFunction: containerRenderFunction("row"),
	...containerPropsParsers,
});

export const column = makeComponent<ColumnProps>({
	renderFunction: containerRenderFunction("column"),
	...containerPropsParsers,
});
