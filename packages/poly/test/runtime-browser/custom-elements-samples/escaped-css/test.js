import * as assert from 'assert.js';
import { tick } from 'poly';
import './main.poly';

export default async function (target) {
	target.innerHTML = '<custom-element></custom-element>';
	await tick();
	const icon = target.querySelector('custom-element').shadowRoot.querySelector('.icon');
	const before = getComputedStyle(icon, '::before');

	assert.equal(before.content, JSON.stringify(String.fromCharCode(0xff)));
}
