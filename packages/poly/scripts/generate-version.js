import fs from "node:fs";

const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

fs.writeFileSync(
  "./src/shared/version.js",
  `// generated during release, do not modify

/**
 * The current version, as set in package.json.
 *
 * https://svelte.dev/docs/svelte-compiler#svelte-version
 * @type {string}
 */
export const VERSION = "${pkg.version}";
export const PUBLIC_VERSION = VERSION.split(".")[0];
`,
);
