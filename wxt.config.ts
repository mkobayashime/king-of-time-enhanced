import { defineConfig } from "wxt";
import { description, version } from "./package.json";

export default defineConfig({
	srcDir: "src",
	imports: false,
	manifest: {
		name: "KING OF TIME Enhanced",
		description,
		version,
		host_permissions: ["https://*.kingtime.jp/*", "https://*.kingoftime.jp/*"],
	},
	outDirTemplate: "{{browser}}-mv{{manifestVersion}}",
});
