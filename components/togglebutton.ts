import { makeComponent } from "../fn_web_components/api";
import { booleanPropParser } from "./utils";

type ToggleButtonProps = {
	toggled: boolean;
};

export const toggleButton = makeComponent<ToggleButtonProps>({
	renderFunction: ({ toggled }) => /* html */`
		<style>
			button {
				background-color: tomato;
			}

			button[toggled="true"] {
				background-color: limegreen;
			}
		</style>
		<button toggled="${toggled}">
			<slot />
		</button>
	`,
	propParsers: {
		toggled: booleanPropParser,
	},
});