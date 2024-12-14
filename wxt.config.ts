import { defineConfig } from "wxt";
import { description, version } from "./package.json";

// See https://wxt.dev/api/config.html
export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    name: "KING OF TIME Enhanced",
    description,
    version,
  },
});
