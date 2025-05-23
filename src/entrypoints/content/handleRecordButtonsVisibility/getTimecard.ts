import * as v from "valibot";
import type { Consts } from "../../../utils/consts";

export const getTimecard = async (consts: Consts) => {
	try {
		// biome-ignore lint/correctness/noUndeclaredVariables: <explanation>
		const adminPageHTML = (await chrome.runtime.sendMessage({
			kind: "fetchAdminPage",
			gatewayBase: consts.api.gatewayBase,
			token: consts.token.token,
			userToken: consts.token.userToken,
			version: consts.api.version,
		})) as unknown;

		v.assert(v.string(), adminPageHTML);

		return new DOMParser().parseFromString(adminPageHTML, "text/html");
	} catch (err) {
		console.error(err);
	}
};
