import * as v from "valibot";
import { defineBackground } from "wxt/sandbox";

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
            origin: v.string(),
            params: v.string(),
          }),
          message,
        )
      ) {
        const adminPageResponseHTML = await (
          await fetch(`${message.origin}/admin${message.params}`)
        ).text();

        const [, redirectedURLPath] =
          /<meta.*http-equiv="refresh".*content=".*URL=(\S+)"/.exec(
            adminPageResponseHTML,
          ) ?? [];
        if (!redirectedURLPath) return;

        const adminRedirectedPageResponseHTML = await (
          await fetch(`${message.origin}${redirectedURLPath}`)
        ).text();

        sendResponse(adminRedirectedPageResponseHTML);
      }
    })(args);

    return true;
  });
});
