import { defineConfig } from "wxt";
import { description, version } from "./package.json";

export default defineConfig({
  extensionApi: "chrome",
  manifest: {
    name: "KING OF TIME Enhanced",
    description,
    version,
  },
});
