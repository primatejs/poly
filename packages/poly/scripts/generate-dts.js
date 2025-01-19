import * as fs from "node:fs";
import { createBundle } from "dts-buddy";

// It may look weird, but the imports MUST be ending with index.js to be properly resolved in all TS modes
for (const name of ["action", "animate", "easing", "motion", "store", "transition"]) {
  fs.writeFileSync(`${name}.d.ts`, "import './types/index.js';");
}

fs.writeFileSync("index.d.ts", "import './types/index.js';");
fs.writeFileSync("compiler.d.ts", "import './types/index.js';");

// TODO: some way to mark these as deprecated
fs.mkdirSync("./types/compiler", { recursive: true });
fs.writeFileSync("./types/compiler/preprocess.d.ts", "import '../index.js';");
fs.writeFileSync("./types/compiler/interfaces.d.ts", "import '../index.js';");

await createBundle({
  output: "types/index.d.ts",
  compilerOptions: {
    strict: true,
  },
  modules: {
    poly: "src/runtime/public.d.ts",
    "poly/compiler": "src/compiler/public.d.ts",
    "poly/types/compiler/preprocess": "src/compiler/preprocess/public.d.ts",
    "poly/types/compiler/interfaces": "src/compiler/interfaces.d.ts",
    "poly/action": "src/runtime/action/public.d.ts",
    "poly/animate": "src/runtime/animate/public.d.ts",
    "poly/easing": "src/runtime/easing/index.js",
    "poly/motion": "src/runtime/motion/public.d.ts",
    "poly/store": "src/runtime/store/public.d.ts",
    "poly/transition": "src/runtime/transition/public.d.ts",
  },
});

// There's no way to tell in JS that a class can have arbitrary properties, so we need to add that manually
const types = fs.readFileSync("types/index.d.ts", "utf-8");

const bad_links = [...types.matchAll(/\]\((\/[^)]+)\)/g)];
if (bad_links.length > 0) {
  console.error(
    "The following links in JSDoc annotations should be prefixed with https://svelte.dev:",
  );

  for (const [, link] of bad_links) {
    console.error(`- ${link}`);
  }

  process.exit(1);
}

fs.writeFileSync(
  "types/index.d.ts",
  // same line to not affect source map
  types.replace(/export class PolyComponent<[^{]*{/, "$& [prop: string]: any;"),
);
