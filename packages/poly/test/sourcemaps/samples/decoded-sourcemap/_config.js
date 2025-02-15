import MagicString from 'magic-string';
import { magic_string_preprocessor_result, magic_string_replace_all } from '../../helpers.js';

export default {
	js_map_sources: ['input.poly'],

	preprocess: {
		markup: ({ content, filename }) => {
			const src = new MagicString(content);
			magic_string_replace_all(src, 'replace me', 'success');
			return magic_string_preprocessor_result(filename, src);
		}
	}
};
