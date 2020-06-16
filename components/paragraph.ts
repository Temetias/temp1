import { makeComponent } from "../fn_web_components/api";

export const paragraph = makeComponent({
	initialRender: () => /* html */`
		<style>

		</style>
		<p><slot/></p>
	`,
	defaultProps: {},
});
