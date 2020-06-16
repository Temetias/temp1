import { useComponents } from "./fn_web_components/api";
import { baseTheme } from "./components/basetheme";
import { decorativeCursor } from "./components/decorativecursor";
import { spacer } from "./components/spacer";

(() => {
	useComponents(
		["f-base-theme", baseTheme],
		["f-decorative-cursor", decorativeCursor],
		["f-spacer", spacer],
	);
})();
