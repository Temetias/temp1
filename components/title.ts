import { makeComponent } from "../fn_web_components/api";
import { booleanPropParser, stringPropParser, declarationParser } from "./utils";
import { prefixWith } from "../fns/index";

type TitleProps = {
	link: boolean;
	priority: string;
	inline: boolean;
};

const hTag = prefixWith("h");

export const title = makeComponent<TitleProps>({
	renderFunction: ({ priority, link, inline }) => {
		const tag = hTag(priority);
		return /* html */`
			<style>
				${tag} {
					position: relative;
					${inline ? "display: inline;" : ""}
					margin: 0;
				}

				${tag}:after {
					display: ${link ? "block" : "none"};
					position: absolute;
				}
			</style>
			<${tag}>
				<slot/>
			</${tag}>
		`;
	},
	propParsers: {
		link: booleanPropParser,
		priority: stringPropParser,
		inline: declarationParser,
	}
});
