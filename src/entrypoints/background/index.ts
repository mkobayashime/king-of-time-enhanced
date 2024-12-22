import * as v from "valibot";
import { defineBackground } from "wxt/sandbox";

const ORIGIN = "https://s2.kingtime.jp";

export default defineBackground(() => {
  chrome.runtime.onMessage.addListener((...args) => {
    /**
     * @see https://qiita.com/noenture/items/1a963f3dc87bc9bd9b79
     */
    void (async ([message, , sendResponse]) => {
      if (
        v.is(
          v.object({
            kind: v.literal("fetchAdminPage"),
            gatewayBase: v.string(),
            token: v.string(),
            userToken: v.string(),
            version: v.string(),
          }),
          message,
        )
      ) {
        const gatewayParams = new URLSearchParams({
          token: message.token,
          user_token: message.userToken,
          version: message.version,
        });

        const gatewayResponse = await (
          await fetch(`${ORIGIN}${message.gatewayBase}`, {
            method: "post",
            headers: {
              Accept: "application/json, text/javascript, */*; q=0.01",
            },
            body: gatewayParams,
          })
        ).json();

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

        const adminPageResponse = await fetch(
          `${ORIGIN}/admin${adminPageParams}`,
        );

        const adminPageURL = new URL(adminPageResponse.url);

        const [, redirectedURLPath] =
          /<meta.*http-equiv="refresh".*content=".*URL=(\S+)"/.exec(
            await adminPageResponse.text(),
          ) ?? [];
        if (!redirectedURLPath) return;

        const adminRedirectedPageResponseHTML = await (
          await fetch(`${adminPageURL.origin}${redirectedURLPath}`)
        ).text();

        sendResponse(adminRedirectedPageResponseHTML);
      }
    })(args);

    return true;
  });
});
