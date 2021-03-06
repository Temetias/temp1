import { makeComponent } from "../fn_web_components/api";

type ContainerProps = {
	spacing: number;
};

export type RowProps = ContainerProps;
export type ColumnProps = ContainerProps;

const containerRenderFunction = (orientation: "row" | "column") => ({ spacing }: ContainerProps) => /* html */`
	<style>
		div {
			display: flex;
			flex-direction: ${orientation};
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
	<div>
		<slot/>
	</div>
`;

const defaultProps = {
	spacing: 0,
};

export const row = makeComponent<RowProps>({
	initialRender: containerRenderFunction("row"),
	defaultProps,
});

export const column = makeComponent<ColumnProps>({
	initialRender: containerRenderFunction("column"),
	defaultProps,
});
