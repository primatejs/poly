import * as fs from 'node:fs';
import * as path from 'node:path';

export function test({ assert, js }) {
	assert.deepEqual(js.map.sources, ['input.poly']);
	assert.deepEqual(js.map.sourcesContent, [
		fs.readFileSync(path.join(__dirname, 'input.poly'), 'utf-8')
	]);
}
