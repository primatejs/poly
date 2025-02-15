// Compile all Poly files in a directory to JS and CSS files
// Usage: node scripts/compile-test.js <directory>

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import glob from "tiny-glob/sync.js";
import { compile } from "../src/compiler/index.js";

const cwd = path.resolve(process.argv[2]);

const options = [
  ["normal", {}],
  ["hydrate", { hydratable: true }],
  ["ssr", { generate: "ssr" }],
];
for (const file of glob("**/*.poly", { cwd })) {
  const contents = readFileSync(`${cwd}/${file}`, "utf-8").replace(/\r/g, "");
  let w;
  for (const [name, opts] of options) {
    const dir = `${cwd}/_output/${name}`;

    const { js, css, warnings } = compile(contents, {
      ...opts,
      filename: file,
    });

    if (warnings.length) {
      w = warnings;
    }

    mkdirSync(dir, { recursive: true });
    js.code && writeFileSync(`${dir}/${file.replace(/\.poly$/, ".js")}`, js.code);
    css.code && writeFileSync(`${dir}/${file.replace(/\.poly$/, ".css")}`, css.code);
  }

  if (w) {
    console.log(`Warnings for ${file}:`);
    console.log(w);
  }
}
