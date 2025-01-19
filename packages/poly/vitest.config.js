import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    {
      name: "resolve-poly",
      resolveId(id) {
        if (id === "poly/compiler") {
          return `${__dirname}/src/compiler/index.js`;
        }
        if (id === "poly") {
          return `${__dirname}/src/runtime/index.js`;
        }

        if (id.startsWith("poly/")) {
          return id.replace(/^poly(.*)\/?$/, `${__dirname}/src/runtime/$1/index.js`);
        }
      },
    },
  ],
  test: {
    dir: "test",
    reporters: ["dot"],
    exclude: [...configDefaults.exclude, "**/samples/**"],
    globalSetup: "./test/vitest-global-setup.js",
    testTimeout: 10_000,
  },
});
