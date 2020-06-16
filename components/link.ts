import { makeComponent } from "../fn_web_components/api";

type LinkProps = {
	href: string;
};

export const link = makeComponent<LinkProps>({
	initialRender: ({ href }) => /* html */`
		<style>
			a {
				color: orange;
			}
		</style>
		<a href="${href}"><slot /></a>
	`,
	defaultProps: {
		href: "",
	},
});
