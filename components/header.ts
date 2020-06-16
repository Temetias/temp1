import { makeComponent, useComponent } from "../fn_web_components/api";
import { row } from "./containers";
import { spacer } from "./spacer";
import { title } from "./title";

useComponent("f-row-container", row);
useComponent("f-spacer", spacer);
useComponent("f-title", title);

export const header = makeComponent({
	initialRender: () => /* html */`
		<style>
			header {
				background-color: tomato;
				height: 4rem;
			}
		</style>
		<header>
			<f-row-container>
				<f-spacer horizontal="4" vertical="1">
					<f-title priority="1">
						<slot name="title"/>
					</f-title>
				</f-spacer>
				<f-spacer horizontal="4" vertical="1">
					<slot name="navigation"/>
				</f-spacer>
			</f-row-container>
		</header>
	`,
	defaultProps: {},
});