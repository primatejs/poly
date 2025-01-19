/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	create_component,
	destroy_component,
	init,
	mount_component,
	noop,
	not_equal,
	transition_in,
	transition_out
} from "poly/internal";

function create_fragment(ctx) {
	let nested;
	let current;
	nested = new /*Nested*/ ctx[0]({ props: { foo: "bar" } });

	return {
		c() {
			create_component(nested.$$.fragment);
		},
		m(target, anchor) {
			mount_component(nested, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(nested.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(nested.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(nested, detaching);
		}
	};
}

function instance($$self) {
	const Nested = window.Nested;
	return [Nested];
}

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, not_equal, {});
	}
}

export default Component;