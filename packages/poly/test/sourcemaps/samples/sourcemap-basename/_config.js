import { magic_string_bundle } from '../../helpers.js';

export const component_filepath = 'src/input.poly';

export const component_file_basename = 'input.poly';

// as output by external tool for src/external_code.css (relative to src/input.poly)
export const external_relative_filename = 'external_code.css';

const external_code = `
span {
	--external_code-var: 1px;
}
`;

export default {
	css_map_sources: [external_relative_filename],
	js_map_sources: ['input.poly'],
	preprocess: [
		{
			style: ({ content, filename }) => {
				const external = `/* Filename from preprocess: ${filename} */` + external_code;
				return magic_string_bundle([
					{ code: external, filename: external_relative_filename },
					{ code: content, filename }
				]);
			}
		}
	],
	options: {
		filename: component_filepath
	}
};
