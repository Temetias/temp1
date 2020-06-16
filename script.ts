import { useComponents } from "./fn_web_components/api";
import { baseTheme } from "./components/basetheme";
import { decorativeCursor } from "./components/decorativecursor";
import { spacer } from "./components/spacer";
import { title } from "./components/title";
import { paragraph } from "./components/paragraph";

(() => {
	useComponents(
		["f-base-theme", baseTheme],
		["f-decorative-cursor", decorativeCursor],
		["f-spacer", spacer],
		["f-title", title],
		["f-paragraph", paragraph],
	);
})();
