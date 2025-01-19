export default {
	get props() {
		return { testName1: 'test1', testName2: 'test2' };
	},

	html: '<div class="test1test2 poly-x1o6ra"></div>',

	test({ assert, component, target }) {
		const div = target.querySelector('div');
		assert.equal(div.className, 'test1test2 poly-x1o6ra');

		component.testName1 = null;
		component.testName2 = null;
		assert.equal(div.className, '0 poly-x1o6ra');

		component.testName1 = null;
		component.testName2 = 'test';
		assert.equal(div.className, 'nulltest poly-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 'test';
		assert.equal(div.className, 'undefinedtest poly-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = undefined;
		assert.equal(div.className, 'NaN poly-x1o6ra');

		component.testName1 = null;
		component.testName2 = 1;
		assert.equal(div.className, '1 poly-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 1;
		assert.equal(div.className, 'NaN poly-x1o6ra');

		component.testName1 = null;
		component.testName2 = 0;
		assert.equal(div.className, '0 poly-x1o6ra');

		component.testName1 = undefined;
		component.testName2 = 0;
		assert.equal(div.className, 'NaN poly-x1o6ra');
	}
};
