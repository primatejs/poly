import * as assert from 'assert.js';
import { tick } from 'poly';
import './main.poly';

export default async function (target) {
	target.innerHTML = '<custom-element name="world" answer="42" test="poly"></custom-element>';
	await tick();
	const el = target.querySelector('custom-element');

	assert.htmlEqual(
		el.shadowRoot.innerHTML,
		`
		<p>name: world</p>
		<p>$$props: {"name":"world","answer":"42","test":"poly"}</p>
		<p>$$restProps: {"answer":"42","test":"poly"}</p>
	`
	);
}
