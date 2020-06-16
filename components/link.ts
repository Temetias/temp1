import { makeComponent } from "../fn_web_components/api";
import { stringPropParser } from "./utils";

type LinkProps = {
	href: string;
};

export const link = makeComponent<LinkProps>({
	renderFunction: ({ href }) => /* html */`
		<style>
			a {
				color: orange;
			}
		</style>
		<a href="${href}"><slot /></a>
	`,
	propParsers: {
		href: stringPropParser,
	},
});
