export default {
	html: `
		<div>Hello World</div>
		<div>Hello World</div>
	`,

	async test({ assert, component, target }) {
		await component.update_value('Hi Poly');

		assert.htmlEqual(
			target.innerHTML,
			`
			<div>Hi Poly</div>
			<div>Hi Poly</div>
		`
		);
	}
};
