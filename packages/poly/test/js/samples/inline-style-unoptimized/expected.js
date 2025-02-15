/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	attr,
	detach,
	element,
	init,
	insert,
	noop,
	safe_not_equal,
	space
} from "poly/internal";

function create_fragment(ctx) {
	let div0;
	let t;
	let div1;
	let div1_style_value;

	return {
		c() {
			div0 = element("div");
			t = space();
			div1 = element("div");
			attr(div0, "style", /*style*/ ctx[0]);
			attr(div1, "style", div1_style_value = "" + (/*key*/ ctx[1] + ": " + /*value*/ ctx[2]));
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			insert(target, t, anchor);
			insert(target, div1, anchor);
		},
		p(ctx, [dirty]) {
			if (dirty & /*style*/ 1) {
				attr(div0, "style", /*style*/ ctx[0]);
			}

			if (dirty & /*key, value*/ 6 && div1_style_value !== (div1_style_value = "" + (/*key*/ ctx[1] + ": " + /*value*/ ctx[2]))) {
				attr(div1, "style", div1_style_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t);
				detach(div1);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { style } = $$props;
	let { key } = $$props;
	let { value } = $$props;

	$$self.$$set = $$props => {
		if ('style' in $$props) $$invalidate(0, style = $$props.style);
		if ('key' in $$props) $$invalidate(1, key = $$props.key);
		if ('value' in $$props) $$invalidate(2, value = $$props.value);
	};

	return [style, key, value];
}

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { style: 0, key: 1, value: 2 });
	}
}

export default Component;