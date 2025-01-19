import { writable } from 'poly/store';

export default {
	get props() {
		return { count: writable(0) };
	},

	error: 'The $ prefix is reserved, and cannot be used for variable and import names'
};
