export default {
	skip_if_ssr: true,
	compileOptions: {
		cssHash: () => 'poly-xyz'
	},
	async test({ assert, component, window }) {
		assert.htmlEqual(window.document.head.innerHTML, '');
		assert.htmlEqual(
			component.div.shadowRoot.innerHTML,
			`
			<style id="poly-xyz">div.poly-xyz{color:red}</style>
			<div class="poly-xyz">Hello World</div>
		`
		);
	}
};
