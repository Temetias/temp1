import { makeComponent } from "../fn_web_components/api";
import { prefixWith } from "../fns/index";

type TitleProps = {
	link: boolean;
	priority: number;
	inline: boolean;
};

const hTag = prefixWith("h");

export const title = makeComponent<TitleProps>({
	initialRender: ({ priority, link, inline }) => {
		const tag = hTag(priority.toString());
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
	defaultProps: {
		link: false,
		priority: 1,
		inline: false,
	}
});
