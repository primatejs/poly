export default {
	html: '<div class=" poly-x1o6ra"></div>',

	test({ assert, component, target }) {
		const div = target.querySelector('div');

		component.testName = null;
		assert.equal(div.className, ' poly-x1o6ra');

		component.testName = undefined;
		assert.equal(div.className, ' poly-x1o6ra');

		component.testName = undefined + '';
		assert.equal(div.className, 'undefined poly-x1o6ra');

		component.testName = null + '';
		assert.equal(div.className, 'null poly-x1o6ra');

		component.testName = 1;
		assert.equal(div.className, '1 poly-x1o6ra');

		component.testName = 0;
		assert.equal(div.className, '0 poly-x1o6ra');

		component.testName = false;
		assert.equal(div.className, 'false poly-x1o6ra');

		component.testName = true;
		assert.equal(div.className, 'true poly-x1o6ra');

		component.testName = {};
		assert.equal(div.className, '[object Object] poly-x1o6ra');

		component.testName = '';
		assert.equal(div.className, ' poly-x1o6ra');

		component.testName = 'testClassName';
		assert.equal(div.className, 'testClassName poly-x1o6ra');
	}
};
