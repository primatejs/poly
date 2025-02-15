export default {
	props: {
		componentName: 'Slider1'
	},
	html: `
		<section>
			<div style="display: contents; --rail-color:rgb(0, 0, 0); --track-color:rgb(255, 0, 0);">
				<div id="component1">
					<p class="poly-17ay6rc">Slider1</p>
					<span class="poly-17ay6rc">Track</span>
				</div>
			</div>
			<div style="display: contents; --rail-color:rgb(0, 255, 0); --track-color:rgb(0, 0, 255);">
				<div id="component2">
					<p class="poly-17ay6rc">Slider1</p>
					<span class="poly-17ay6rc">Track</span>
				</div>
			</div>
		</section>
	`,
	test({ target, window, assert, component }) {
		function assert_slider_1() {
			const rail_color1 = target.querySelector('#component1 p');
			const track_color1 = target.querySelector('#component1 span');
			const rail_color2 = target.querySelector('#component2 p');
			const track_color2 = target.querySelector('#component2 span');

			assert.equal(window.getComputedStyle(rail_color1).color, 'rgb(0, 0, 0)');
			assert.equal(window.getComputedStyle(track_color1).color, 'rgb(255, 0, 0)');
			assert.equal(window.getComputedStyle(rail_color2).color, 'rgb(0, 255, 0)');
			assert.equal(window.getComputedStyle(track_color2).color, 'rgb(0, 0, 255)');
			assert.equal(rail_color1.textContent, 'Slider1');
			assert.equal(rail_color2.textContent, 'Slider1');
		}

		function assert_slider_2() {
			const rail_color1 = target.querySelector('#component1 p');
			const track_color1 = target.querySelector('#component1 span');
			const rail_color2 = target.querySelector('#component2 p');
			const track_color2 = target.querySelector('#component2 span');

			assert.equal(window.getComputedStyle(rail_color1).color, 'rgb(0, 0, 0)');
			assert.equal(window.getComputedStyle(track_color1).color, 'rgb(255, 0, 0)');
			assert.equal(window.getComputedStyle(rail_color2).color, 'rgb(0, 255, 0)');
			assert.equal(window.getComputedStyle(track_color2).color, 'rgb(0, 0, 255)');
			assert.equal(rail_color1.textContent, 'Slider2');
			assert.equal(rail_color2.textContent, 'Slider2');
		}

		assert_slider_1();
		component.componentName = 'Slider2';
		assert_slider_2();
		component.componentName = undefined;
		assert.equal(window.document.querySelector('div'), null);
		component.componentName = 'Slider1';
		assert_slider_1();
	}
};
