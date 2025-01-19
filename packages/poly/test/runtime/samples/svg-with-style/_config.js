export default {
	get props() {
		return { x: 'bar' };
	},

	html: `
		<svg>
			<circle class="poly-i03x00" cx=50 cy=50 r=50 />
			<circle class="foo poly-i03x00" cx=150 cy=50 r=50 />
			<circle class="bar poly-i03x00" cx=250 cy=50 r=50 />
		</svg>
	`
};
