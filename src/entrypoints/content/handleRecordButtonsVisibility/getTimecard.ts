import type { Consts } from "../../../utils/consts";

export const getTimecard = async (consts: Consts) => {
	try {
		const adminPageHTML = await chrome.runtime.sendMessage({
			kind: "fetchAdminPage",
			gatewayBase: consts.api.gatewayBase,
			token: consts.token.token,
			userToken: consts.token.userToken,
			version: consts.api.version,
		});

		return new DOMParser().parseFromString(adminPageHTML, "text/html");
	} catch (err) {
		console.error(err);
	}
};
