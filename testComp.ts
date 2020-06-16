import { makeComponent } from "./fn_web_components/api2";

type TestProps = {
	toggled: boolean;
};

function testFn() {
	console.log(this, "hello");
}

export const testComponent = makeComponent<TestProps>({
	render: ({ toggled }) => /* html */`
		<style>
			.toggled {
				color: red;
			}
		</style>
		<button class="${toggled ? "toggled" : "" }" onclick="${testFn}">
			Test Button
		</button>
	`,
	attributeChangedCallbacks: {
		toggled: (newVal, oldVal, context) => {
			context.shadowRoot?.querySelector("button")?.setAttribute("class", newVal ? "toggled" : "");
		},
	},
	props: {
		toggled: false,
	}
});
