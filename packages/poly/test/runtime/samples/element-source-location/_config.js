import * as path from 'node:path';

export default {
	compileOptions: {
		dev: true
	},

	test({ assert, target }) {
		const h1 = target.querySelector('h1');
		const p = target.querySelector('p');

		assert.deepEqual(h1.__poly_meta.loc, {
			file: path.relative(process.cwd(), path.resolve(__dirname, 'main.poly')),
			line: 4,
			column: 0,
			char: 51
		});

		assert.deepEqual(p.__poly_meta.loc, {
			file: path.relative(process.cwd(), path.resolve(__dirname, 'Foo.poly')),
			line: 1,
			column: 1,
			char: 7
		});
	}
};
