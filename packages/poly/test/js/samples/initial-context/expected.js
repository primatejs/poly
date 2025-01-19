/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	safe_not_equal
} from "poly/internal";

function create_fragment(ctx) {
	let button;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = listen(button, "click", /*click_handler*/ ctx[1]);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(button);
			}

			mounted = false;
			dispose();
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let foo;

	function unreferenced() {
		$$invalidate(0, foo = 1);
	}

	const click_handler = () => $$invalidate(0, foo = 2);
	return [foo, click_handler];
}

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

export default Component;