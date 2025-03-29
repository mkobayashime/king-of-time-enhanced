import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";

export default [
	{
		ignores: [".wxt"],
	},
	...typescriptWithBiome,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
];
