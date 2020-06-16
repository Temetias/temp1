import { makeComponent } from "./fn_web_components/api";

type TestProps = {
	toggled: boolean;
};

export const testComponent = makeComponent<TestProps>({
	initialRender: ({ toggled }) => /* html */`
		<style>
			.toggled {
				color: red;
			}
		</style>
		<button class="${toggled ? "toggled" : ""}">
			<slot/>
		</button>
	`,
	defaultProps: {
		toggled: false,
	},
	connectedCallback(ctx) {
		const btn = ctx.shadowQuerySelector("button")!;
		btn.onclick = () => {
			ctx.toggled = !ctx.toggled
			btn.setAttribute("class", ctx.toggled ? "toggled" : "");
		};
	},
});
