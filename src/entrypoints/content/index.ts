import * as v from "valibot";
import { defineContentScript } from "#imports";
import { constsSchema } from "../../utils/consts";
import { handleRecordButtonsVisibility } from "./handleRecordButtonsVisibility";
import { redirectTimecardLink } from "./redirectTimecardLink";
import { setModalShortcuts } from "./setModalShortcuts";
import { setRoleToButtons } from "./setRoleToButtons";

export default defineContentScript({
	matches: ["https://s2.kingtime.jp/independent/recorder2/personal/*"],
	main() {
		document.addEventListener("consts", (e) => {
			if (
				v.is(
					v.object({
						detail: constsSchema,
					}),
					e,
				)
			) {
				void handleRecordButtonsVisibility(e.detail);
			}
		});
		void setRoleToButtons();
		void redirectTimecardLink();
		setModalShortcuts();
	},
});
