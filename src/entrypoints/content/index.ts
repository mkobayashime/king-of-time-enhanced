import { defineContentScript } from "wxt/sandbox";
import { setModalShortcuts } from "./setModalShortcuts";

export default defineContentScript({
  matches: ["https://s2.kingtime.jp/independent/recorder2/personal/*"],
  main() {
    setModalShortcuts();
  },
});
