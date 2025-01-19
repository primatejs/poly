/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	action_destroyer,
	detach,
	element,
	init,
	insert,
	is_function,
	noop,
	safe_not_equal
} from "poly/internal";

function create_fragment(ctx) {
	let button;
	let foo_action;
	let mounted;
	let dispose;

	return {
		c() {
			button = element("button");
			button.textContent = "foo";
		},
		m(target, anchor) {
			insert(target, button, anchor);

			if (!mounted) {
				dispose = action_destroyer(foo_action = foo.call(null, button, /*foo_function*/ ctx[1]));
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (foo_action && is_function(foo_action.update) && dirty & /*bar*/ 1) foo_action.update.call(null, /*foo_function*/ ctx[1]);
		},
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

function handleFoo(bar) {
	console.log(bar);
}

function foo(node, callback) {
	
} // code goes here

function instance($$self, $$props, $$invalidate) {
	let { bar } = $$props;
	const foo_function = () => handleFoo(bar);

	$$self.$$set = $$props => {
		if ('bar' in $$props) $$invalidate(0, bar = $$props.bar);
	};

	return [bar, foo_function];
}

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { bar: 0 });
	}
}

export default Component;