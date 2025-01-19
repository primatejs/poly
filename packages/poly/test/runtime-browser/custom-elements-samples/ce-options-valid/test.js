import * as assert from 'assert.js';
import { tick } from 'poly';
import './main.poly';

export default async function (target) {
	target.innerHTML = '<custom-element name="world"></custom-element>';
	await tick();

	const el = target.querySelector('custom-element');
	const h1 = el.shadowRoot.querySelector('h1');

	assert.equal(h1.textContent, 'Hello world!');
}
