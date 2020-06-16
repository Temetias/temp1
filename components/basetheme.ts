import { makeComponent, useComponents } from "../fn_web_components/api";
import { header } from "./header";
import { spacer } from "./spacer";
import { link } from "./link";
import { navigation } from "./navigation";

useComponents(
	["f-header", header],
	["f-spacer", spacer],
	["f-link", link],
	["f-navigation", navigation],
);

export const baseTheme = makeComponent({
	initialRender: () => /* html */`
		<style>

		</style>
		<f-header>
			<f-link slot="title" href="/">
				Lorem Ipsum
			</f-link>
			<f-navigation slot="navigation"
				paths="['about', 'uses', 'blog']"
			/>
		</f-header>
		<f-spacer horizontal="4" vertical="5">
			<slot/>
		</f-spacer>
	`,
});