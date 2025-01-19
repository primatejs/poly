// ----------------------------------------------------------------------
// This script gets a list of global objects/functions of browser.
// This process is simple for now, so it is handled without AST parser.
// Please run `node scripts/globals-extractor.js` at the project root.
//
// see: https://github.com/microsoft/TypeScript/tree/main/lib
// ----------------------------------------------------------------------

import http from "node:https";
import fs from "node:fs";

const GLOBAL_TS_PATH = "./src/compiler/utils/globals.js";

// MEMO: add additional objects/functions which existed in `src/compiler/utils/names.ts`
//       before this script was introduced but could not be retrieved by this process.
const SPECIALS = ["global", "globalThis", "InternalError", "process", "undefined"];

const get_url = (name) =>
  `https://raw.githubusercontent.com/microsoft/TypeScript/main/src/lib/${name}.d.ts`;
const extract_name = (split) => split.match(/^[a-zA-Z0-9_$]+/)[0];

const extract_functions_and_references = (name, data) => {
  const functions = [];
  const references = [];
  data.split("\n").forEach((line) => {
    const trimmed = line.trim();
    const split = trimmed.replace(/[\s+]/, " ").split(" ");
    if (split[0] === "declare" && split[1] !== "type") {
      functions.push(extract_name(split[2]));
    } else if (trimmed.startsWith("/// <reference")) {
      const matched = trimmed.match(/ lib="(.+)"/);
      const reference = matched && matched[1];
      if (reference) {
        references.push(reference);
      }
    }
  });
  return { functions, references };
};

const do_get = (url) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => body += chunk);
        res.on("end", () => resolve(body));
      })
      .on("error", (e) => {
        console.error(e.message);
        reject(e);
      });
  });

const fetched_names = new Set();
const get_functions = async (name) => {
  const res = [];
  if (fetched_names.has(name)) {
    return res;
  }
  fetched_names.add(name);
  const body = await do_get(get_url(name));
  const { functions, references } = extract_functions_and_references(name, body);
  res.push(...functions);
  const chile_functions = await Promise.all(references.map(get_functions));
  chile_functions.forEach((i) => res.push(...i));
  return res;
};

const build_output = (functions) => {
  const sorted = Array.from(new Set(functions.sort()));
  return `\
/** ----------------------------------------------------------------------
This file is automatically generated by \`scripts/globals-extractor.js\`.
Generated At: ${new Date().toISOString()}
---------------------------------------------------------------------- */

export default new Set([
${sorted.map((i) => `  "${i}"`).join(",\n")},
]);
`;
};

const get_exists_globals = () => {
  const regexp = /^\s*["'](.+)["'],?\s*$/;
  return fs
    .readFileSync(GLOBAL_TS_PATH, "utf8")
    .split("\n")
    .filter((line) => line.match(regexp))
    .map((line) => line.match(regexp)[1]);
};

(async () => {
  const globals = get_exists_globals();
  const new_globals = await get_functions("es2021.full");
  globals.forEach((g) => new_globals.push(g));
  SPECIALS.forEach((g) => new_globals.push(g));
  fs.writeFileSync(GLOBAL_TS_PATH, build_output(new_globals));
})();
