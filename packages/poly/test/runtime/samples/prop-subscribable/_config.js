import { writable } from 'poly/store';

export default {
	get props() {
		return { b: writable(42) };
	},

	html: `
		42
	`
};
