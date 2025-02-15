/* generated by Poly vX.Y.Z */
import {
	PolyComponent,
	append_hydration,
	attr,
	children,
	claim_svg_element,
	detach,
	init,
	insert_hydration,
	noop,
	safe_not_equal,
	svg_element
} from "poly/internal";

function create_fragment(ctx) {
	let svg;
	let img;

	return {
		c() {
			svg = svg_element("svg");
			img = svg_element("img");
			this.h();
		},
		l(nodes) {
			svg = claim_svg_element(nodes, "svg", {});
			var svg_nodes = children(svg);
			img = claim_svg_element(svg_nodes, "img", { alt: true, src: true });
			svg_nodes.forEach(detach);
			this.h();
		},
		h() {
			attr(img, "alt", "potato");
			attr(img, "src", /*url*/ ctx[0]);
		},
		m(target, anchor) {
			insert_hydration(target, svg, anchor);
			append_hydration(svg, img);
		},
		p(ctx, [dirty]) {
			if (dirty & /*url*/ 1) {
				attr(img, "src", /*url*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(svg);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { url } = $$props;

	$$self.$$set = $$props => {
		if ('url' in $$props) $$invalidate(0, url = $$props.url);
	};

	return [url];
}

class Component extends PolyComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, { url: 0 });
	}
}

export default Component;