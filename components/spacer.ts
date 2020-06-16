import { makeComponent } from "../fn_web_components/api";
import { intPropParser } from "./utils";

export type SpacerProps = {
	horizontal: number;
	vertical: number;
};

export const spacer = makeComponent<SpacerProps>({
	propParsers: {
		horizontal: intPropParser,
		vertical: intPropParser,
	},
	renderFunction: ({ horizontal, vertical }) => /* html */`
		<style>
			div {
				padding: ${vertical}rem ${horizontal}rem;
			}
		</style>
		<div><slot/></div>
	`,
});
