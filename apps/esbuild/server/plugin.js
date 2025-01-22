import file from "@rcompat/fs/file";
import webpath from "@rcompat/fs/webpath";
import * as compiler from "poly/compiler";

const css_filter = /\.polycss$/u;
const root_filter = /^root:poly$/u;

const compile = text => {
  const options = { generate: "dom", hydratable: true };
  const { js, css } = compiler.compile(text, options);
  return { js: js.code, css: css?.code ?? null };
};

const paths = {};

const save = (path, contents) => {
  paths[path] = contents;
};

const load = path => paths[path];

export default (resolveDir, extension = ".poly") => ({
  name: "poly",
  setup(build) {
    build.onResolve({ filter: css_filter }, ({ path }) => {
      return { path, namespace: "poly" };
    });
    build.onResolve({ filter: root_filter }, ({ path }) => {
      return { path, namespace: "polyroot" };
    });
    build.onLoad({ filter: css_filter }, ({ path }) => {
      const contents = load(webpath(path));
      return contents ? { contents, loader: "css", resolveDir } : null;
    });
    build.onLoad({ filter: root_filter }, ({ path }) => {
      const contents = load(path);
      return contents ? { contents, loader: "js", resolveDir } : null;
    });
    build.onLoad({ filter: new RegExp(`${extension}$`, "u") }, async args => {
      // Load the file from the file system
      const source = await file(args.path).text();

      // Convert Poly syntax to JavaScript
      const { js, css } = compile(source);
      let contents = js;
      if (css !== null && css !== "") {
        const path = webpath(`${args.path}css`);
        save(path, css);
        contents += `\nimport "${path}";`;
      }
      return { contents };
    });
  },
});
