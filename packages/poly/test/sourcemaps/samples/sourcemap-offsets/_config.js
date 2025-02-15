import { magic_string_bundle } from '../../helpers.js';

export const EXTERNAL = 'span { --external-var: 1px; }';

export default {
	js_map_sources: ['input.poly'],
	css_map_sources: ['input.poly', 'external.css'],
	preprocess: [
		{
			style: ({ content, filename }) => {
				return magic_string_bundle([
					{ code: EXTERNAL, filename: 'external.css' },
					{ code: content, filename }
				]);
			}
		}
	]
};
