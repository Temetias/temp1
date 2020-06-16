import { makeComponent } from "../fn_web_components/api";

export type SpacerProps = {
	horizontal: number;
	vertical: number;
};

export const spacer = makeComponent<SpacerProps>({
	initialRender: ({ horizontal, vertical }) => /* html */`
		<style>
			div {
				padding: ${vertical}rem ${horizontal}rem;
			}
		</style>
		<div>
			<slot/>
		</div>
	`,
	defaultProps: {
		horizontal: 0,
		vertical: 0,
	},
});
