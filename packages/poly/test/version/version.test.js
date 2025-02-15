import { fileURLToPath } from 'node:url';
import { assert, describe, it } from 'vitest';
import { VERSION } from 'poly/compiler';
import { try_load_json } from '../helpers.js';

describe('poly/compiler VERSION', () => {
	it('should be the exact version from package.json');
	const pkg = try_load_json(
		fileURLToPath(new URL('../../../../packages/poly/package.json', import.meta.url))
	);
	assert.equal(
		VERSION,
		pkg.version,
		'VERSION export in src/shared/version.js does not equal version in package.json'
	);
});
