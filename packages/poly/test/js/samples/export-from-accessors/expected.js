/* generated by Poly vX.Y.Z */
import { PolyComponent, init, safe_not_equal } from "poly/internal";

import { f as f_1, g as g_1 } from './d';
import { h as h_1 } from './e';
import { i as j } from './f';
export { d as e } from './c';
export { c } from './b';
export { a, b } from './a';

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, null, null, safe_not_equal, {});
	}

	get f() {
		return f_1;
	}

	get g() {
		return g_1;
	}

	get h() {
		return h_1;
	}

	get j() {
		return j;
	}
}

export default Component;