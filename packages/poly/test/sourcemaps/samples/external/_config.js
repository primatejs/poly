import { magic_string_bundle } from '../../helpers.js';

export const COMMON = ':global(html) { height: 100%; }\n';

// TODO: removing '\n' breaks test
// - _actual.poly.map looks correct
// - _actual.css.map adds reference to </style> on input.poly
// - Most probably caused by bug in current magic-string version (fixed in 0.25.7)
export const STYLES = '.awesome { color: orange; }\n';

export default {
	css_map_sources: ['common.scss', 'styles.scss'],
	js_map_sources: ['input.poly'],
	preprocess: [
		{
			style: () => {
				return magic_string_bundle([
					{ filename: 'common.scss', code: COMMON },
					{ filename: 'styles.scss', code: STYLES }
				]);
			}
		}
	]
};
