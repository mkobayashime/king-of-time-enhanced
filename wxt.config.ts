import { defineConfig } from "wxt";
import { description, version } from "./package.json";

export default defineConfig({
  srcDir: "src",
  imports: false,
  extensionApi: "chrome",
  manifest: {
    name: "KING OF TIME Enhanced",
    description,
    version,
  },
});
