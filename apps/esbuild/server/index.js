import esbuild from "esbuild";
import plugin from "./plugin.js";
import serve from "@rcompat/http/serve";
import { html } from "@rcompat/http/mime";
import file from "@rcompat/fs/file";

const root = file(import.meta.dirname).join("../app");
const app_html = await root.join("app.html").text();
const extension = ".poly";

const options = {
  bundle: true,
  format: "esm",
  entryPoints: [`${root}/index.js`],
  plugins: [plugin(import.meta.dirname, extension)],
  outfile: "build/app.js",
};

const reload_options = {
  host: "localhost",
  port: 6262,
};

const context = await esbuild.context(options);
await context.rebuild();
await context.watch();
await context.serve(reload_options);

await serve(request => {
  const url = new URL(request.url);

  if (url.pathname === "/esbuild") {
    const { method, headers, body } = request;
    const { host, port } = reload_options;
    return fetch(`http://${host}:${port}/app.js`,
      { method, headers, body, duplex: "half" });
  }

  return new Response(app_html, { headers: { "Content-Type": html } });
});
