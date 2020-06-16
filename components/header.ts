import { makeComponent, useComponent } from "../fn_web_components/api";
import { row, column } from "./containers";
import { spacer } from "./spacer";
import { title } from "./title";

useComponent("f-row-container", row);
useComponent("f-spacer", spacer);
useComponent("f-column", column);
useComponent("f-title", title);

export const header = makeComponent({
	initialRender: () => /* html */`
		<style>
			header {
				background-color: tomato;
			}
			f-title {
				font-size: 2rem;
				transform: translate(-25vw, -3rem);
			}
		</style>
		<f-spacer vertical="8"></f-spacer>
		<header>
			<f-column>
				<f-title priority="1">
					<slot name="title"/>
				</f-title>
				<f-spacer horizontal="2" vertical="3">
					<slot name="navigation"/>
				</f-spacer>
			</f-column>
		</header>
	`,
});