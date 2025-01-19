<div align="center">
<h1>Poly</h1>
&nbsp;<a href="https://npmjs.com/poly"><img src="https://img.shields.io/badge/npm%20install%20poly-4e9057?style=for-the-badge"></a>
&nbsp;<a href="https://discord.gg/RSg4NNwM4f"><img src="https://img.shields.io/discord/1256590312177012806?style=for-the-badge&label=chat&logoColor=fff&color=5865f2"></a>
</div>
<br>

## What is Poly?

Poly is a Svelte 4 fork with the goal of long-term support. For now, we will
focus on technical improvements with no API changes, but we may add additional
incremental features in the future. It is not planned to deprecate any Svelte 4
APIs at this point in time, and, depending on adoption, they may never be
deprecated.

## Svelte Compatibility

Poly is fully compatible with Svelte 4. In particular existing code, including
code that uses `<svelte:...>` tags, should work flawlessly. Please file an 
issue if your existing Svelte 4 code doesn't work in Poly.

## How to run

### esbuild

To run Poly with esbuild (no SSR), run `npm start` in `apps/esbuild`.

### SvelteKit

If you're a user of SvelteKit, you will need to migrate your app to Primate
(https://primatejs.com), a full-stack framework that supports a multitude of
backends and frontends, including Svelte. Support for Poly will be added in the
coming days.

## License

MIT

## Contributing

By contributing to Poly, you agree that your contributions will be licensed
under its MIT license.
