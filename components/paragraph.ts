import { makeComponent } from "../fn_web_components/api";

export const paragraph = makeComponent({
	renderFunction: () => /* html */`
		<style>

		</style>
		<p><slot/></p>
	`,
});
