export default {
	get props() {
		return {
			things: [
				{ id: 1, name: 'a' },
				{ id: 2, name: 'b' },
				{ id: 3, name: 'c' },
				{ id: 4, name: 'd' },
				{ id: 5, name: 'e' }
			],
			tag: 'div'
		};
	},

	html: `
		<div>a</div>
		<div>b</div>
		<div>c</div>
		<div>d</div>
		<div>e</div>
	`,

	test({ assert, component, target, raf }) {
		component.tag = 'p';
		assert.equal(target.querySelectorAll('p').length, 5);

		component.tag = 'div';
		let divs = target.querySelectorAll('div');
		divs.forEach((div) => {
			div.getBoundingClientRect = function () {
				const index = [...this.parentNode.children].indexOf(this);
				const top = index * 30;

				return {
					left: 0,
					right: 100,
					top,
					bottom: top + 20
				};
			};
		});

		component.things = [
			{ id: 5, name: 'e' },
			{ id: 2, name: 'b' },
			{ id: 3, name: 'c' },
			{ id: 4, name: 'd' },
			{ id: 1, name: 'a' }
		];

		divs = target.querySelectorAll('div');
		assert.ok(~divs[0].style.animation.indexOf('__poly'));
		assert.equal(divs[1].style.animation, '');
		assert.equal(divs[2].style.animation, '');
		assert.equal(divs[3].style.animation, '');
		assert.ok(~divs[4].style.animation.indexOf('__poly'));

		raf.tick(100);
		assert.deepEqual([divs[0].style.animation, divs[4].style.animation], ['', '']);
	}
};
