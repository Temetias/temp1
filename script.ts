import { useComponents, useComponent } from "./fn_web_components/api";
import { baseTheme } from "./components/basetheme";
import { decorativeCursor } from "./components/decorativecursor";
import { spacer } from "./components/spacer";
import { testComponent } from "./testComp";

(() => {
	useComponents(
		["f-base-theme", baseTheme],
		["f-decorative-cursor", decorativeCursor],
		["f-spacer", spacer],
	);
	useComponent("f2-test-button", testComponent);
})();
