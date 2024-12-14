import * as v from "valibot";
import type { Consts } from "../../../utils/consts";

const ORIGIN = "https://s2.kingtime.jp";

export const getTimecard = async (consts: Consts) => {
  try {
    const formData = new FormData();
    formData.append("token", consts.token.token);
    formData.append("user_token", consts.token.userToken);
    formData.append("version", consts.api.version);

    const gatewayResponse = (await (
      await fetch(`${ORIGIN}${consts.api.gatewayBase}`, {
        method: "post",
        headers: {
          Accept: "application/json, text/javascript, */*; q=0.01",
        },
        body: formData,
      })
    ).json()) as unknown;

    if (
      !v.is(
        v.object({
          result: v.literal("OK"),
          params: v.string(),
        }),
        gatewayResponse,
      )
    ) {
      return;
    }

    const adminPageParams = gatewayResponse.params;

    const adminPageHTML = await chrome.runtime.sendMessage({
      kind: "fetchAdminPage",
      origin: ORIGIN,
      params: adminPageParams,
    });

    return new DOMParser().parseFromString(adminPageHTML, "text/html");
  } catch (err) {
    console.error(err);
  }
};
