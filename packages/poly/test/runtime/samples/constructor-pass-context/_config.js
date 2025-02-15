export default {
	async test({ assert, target, window, load }) {
		const Component = (await load('Component.poly')).default;

		const called = [];
		const component = new Component({
			target,
			context: new Map([
				['key', 'poly'],
				['fn', (value) => called.push(value)]
			])
		});
		assert.htmlEqual(target.innerHTML, '<div>poly</div><button></button>');

		const button = target.querySelector('button');
		await button.dispatchEvent(new window.MouseEvent('click'));

		assert.deepEqual(called, ['hello world']);

		component.$destroy();
	},
	async test_ssr({ assert, load }) {
		const Component = (await load('./Component.poly')).default;

		const called = [];
		const { html } = Component.render(undefined, {
			context: new Map([
				['key', 'poly'],
				['fn', (value) => called.push(value)]
			])
		});
		assert.htmlEqual(html, '<div>poly</div><button></button>');
	}
};
