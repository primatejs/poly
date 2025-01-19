import * as assert from 'assert.js';
import { tick } from 'poly';
import './main.poly';

export default async function (target) {
	const element = document.createElement('custom-element');
	target.appendChild(element);
	await tick();

	const el = target.querySelector('custom-element');
	el.shadowRoot.querySelector('button').click();
	await tick();

	assert.equal(el.getAttribute('aria-expanded'), '');
	el.shadowRoot.querySelector('button').click();
	await tick();

	assert.equal(el.getAttribute('aria-expanded'), null);
}
