/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	assign,
	attr,
	compute_rest_props,
	create_component,
	destroy_component,
	detach,
	element,
	exclude_internal_props,
	init,
	insert,
	mount_component,
	safe_not_equal,
	space,
	transition_in,
	transition_out
} from "poly/internal";

import Component from "./Component.poly";

function create_fragment(ctx) {
	let div;
	let div_class_value;
	let div_style_value;
	let div_other_value;
	let t;
	let component;
	let current;

	component = new Component({
			props: {
				class: "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''),
				style: "\n\t\tcolor: green;\n\t\tbackground: white;\n\t\tfont-size: " + /*size*/ ctx[0] + ";\n  \ttransform: " + /*$$restProps*/ ctx[2].scale + "  " + /*$$restProps*/ ctx[2].rotate + ";\n\t\t" + /*$$restProps*/ ctx[2].styles,
				other: "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '')
			}
		});

	return {
		c() {
			div = element("div");
			t = space();
			create_component(component.$$.fragment);
			attr(div, "class", div_class_value = "button button--size--" + /*size*/ ctx[0] + " button--theme--" + /*theme*/ ctx[1] + " " + (/*$$restProps*/ ctx[2].class || ''));
			attr(div, "style", div_style_value = "color: green; background: white; font-size: " + /*size*/ ctx[0] + "; transform: " + /*$$restProps*/ ctx[2].scale + " " + /*$$restProps*/ ctx[2].rotate + "; " + /*$$restProps*/ ctx[2].styles);
			attr(div, "other", div_other_value = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			insert(target, t, anchor);
			mount_component(component, target, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (!current || dirty & /*size, theme, $$restProps*/ 7 && div_class_value !== (div_class_value = "button button--size--" + /*size*/ ctx[0] + " button--theme--" + /*theme*/ ctx[1] + " " + (/*$$restProps*/ ctx[2].class || ''))) {
				attr(div, "class", div_class_value);
			}

			if (!current || dirty & /*size, $$restProps*/ 5 && div_style_value !== (div_style_value = "color: green; background: white; font-size: " + /*size*/ ctx[0] + "; transform: " + /*$$restProps*/ ctx[2].scale + " " + /*$$restProps*/ ctx[2].rotate + "; " + /*$$restProps*/ ctx[2].styles)) {
				attr(div, "style", div_style_value);
			}

			if (!current || dirty & /*size, theme, $$restProps*/ 7 && div_other_value !== (div_other_value = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || ''))) {
				attr(div, "other", div_other_value);
			}

			const component_changes = {};
			if (dirty & /*size, theme, $$restProps*/ 7) component_changes.class = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '');
			if (dirty & /*size, $$restProps*/ 5) component_changes.style = "\n\t\tcolor: green;\n\t\tbackground: white;\n\t\tfont-size: " + /*size*/ ctx[0] + ";\n  \ttransform: " + /*$$restProps*/ ctx[2].scale + "  " + /*$$restProps*/ ctx[2].rotate + ";\n\t\t" + /*$$restProps*/ ctx[2].styles;
			if (dirty & /*size, theme, $$restProps*/ 7) component_changes.other = "\n\t\tbutton\n\t\tbutton--size--" + /*size*/ ctx[0] + "\n\t\tbutton--theme--" + /*theme*/ ctx[1] + "\n  \t" + (/*$$restProps*/ ctx[2].class || '');
			component.$set(component_changes);
		},
		i(local) {
			if (current) return;
			transition_in(component.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(component.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div);
				detach(t);
			}

			destroy_component(component, detaching);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	const omit_props_names = ["size","theme"];
	let $$restProps = compute_rest_props($$props, omit_props_names);
	let { size } = $$props;
	let { theme } = $$props;

	$$self.$$set = $$new_props => {
		$$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
		$$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
		if ('size' in $$new_props) $$invalidate(0, size = $$new_props.size);
		if ('theme' in $$new_props) $$invalidate(1, theme = $$new_props.theme);
	};

	return [size, theme, $$restProps];
}

class Component_1 extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { size: 0, theme: 1 });
	}
}

export default Component_1;