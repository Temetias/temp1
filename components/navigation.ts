import { makeComponent, componentMap, useComponents } from "../fn_web_components/api";
import { stringArrPropParser } from "./utils";
import { link } from "./link";
import { prefixWith, is, compose2 } from "../fns/index";
import { spacer } from "./spacer";

type NavigationProps = {
	paths: string;
};

useComponents(
	["f-link", link],
	["f-spacer", spacer],
);

const prefixSlash = prefixWith("/");

const linkItemMapper = (isCurrentPath: (path: string) => boolean) => componentMap((p: string) => /* html */`
	<f-spacer horizontal="1">
		<f-link href="${prefixSlash(p)}" class="current-${isCurrentPath(p)}">
			${p}
		</f-link>
	</f-spacer>
`);

export const navigation = makeComponent<NavigationProps>({
	initialRender: ({ paths }) => {
		const isCurrentPath = compose2(is(window.location.pathname), prefixSlash);
		return /* html */`
			<style>
				f-link {
					text-transform: capitalize;
				}

				f-spacer {
					display: inline-block;
				}

				.current-true {
					background-color: limegreen;
				}
			</style>
			<nav>
				${linkItemMapper(isCurrentPath)(stringArrPropParser(paths))}
			</nav>
		`;
	},
	defaultProps: {
		paths: "[]",
	},
});
