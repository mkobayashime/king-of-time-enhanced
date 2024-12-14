import { defineContentScript } from "wxt/sandbox";
import { awaitWithInterval } from "../utils/awaitWithInterval";
import type { Consts } from "../utils/consts";

type PartialDeep<T> = T extends Record<string, unknown>
  ? Partial<{
      [K in keyof T]: PartialDeep<T[K]>;
    }>
  : T;

declare const window: {
  Recorder?: PartialDeep<{
    Consts: {
      GATEWAY_BASE: string;
      VERSION: string;
    };
    userData: {
      user: {
        user_token: string;
      };
      token: {
        token_f: string;
      };
      timerecorder: {
        record_button: {
          name: string;
          id: string;
        }[];
      };
    };
  }>;
};

export const getConsts = (): Promise<Consts | undefined> =>
  awaitWithInterval(() => {
    const gatewayBase = window.Recorder?.Consts?.GATEWAY_BASE;
    const version = window.Recorder?.Consts?.VERSION;
    const token = window.Recorder?.userData?.token?.token_f;
    const userToken = window.Recorder?.userData?.user?.user_token;
    const recordButtons =
      window.Recorder?.userData?.timerecorder?.record_button;

    if (gatewayBase && version && token && userToken && recordButtons) {
      return {
        data: {
          api: {
            gatewayBase,
            version,
          },
          token: {
            token,
            userToken,
          },
          recordButtons,
        },
      };
    }
  });

export default defineContentScript({
  matches: ["https://s2.kingtime.jp/independent/recorder2/personal/*"],
  world: "MAIN",
  runAt: "document_end",
  main() {
    void (async () => {
      const consts = await getConsts();

      document.dispatchEvent(new CustomEvent("consts", { detail: consts }));
    })();
  },
});
