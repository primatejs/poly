export default {
	test({ assert, component, target, raf }) {
		component.visible = true;
		const div = target.querySelector('div');

		assert.equal(div.style.animation, '__poly_3809512021_0 100ms linear 0ms 1 both');

		raf.tick(50);
		component.visible = false;

		// both in and out styles
		assert.equal(
			div.style.animation,
			'__poly_3809512021_0 100ms linear 0ms 1 both, __poly_3750847757_0 100ms linear 0ms 1 both'
		);

		raf.tick(75);
		component.visible = true;

		// reset original styles
		assert.equal(div.style.animation, '__poly_3809512021_0 100ms linear 0ms 1 both');
	}
};
