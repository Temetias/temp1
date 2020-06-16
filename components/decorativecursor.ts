import { makeComponent } from "../fn_web_components/api";

export const decorativeCursor = makeComponent({
	initialRender: () => /* html */`
		<style>
			:host:after {
				display: inline;
				content: "_";
				animation: 1s infinite blink;
			}
			@keyframes blink {
				0% { opacity: 1; }
				49% { opacity: 1; }
				50% { opacity: 0; }
				100% { opacity: 0; }
			}
		</style>
		<slot class="decorative-cursor"/>
	`,
	defaultProps: {},
});
