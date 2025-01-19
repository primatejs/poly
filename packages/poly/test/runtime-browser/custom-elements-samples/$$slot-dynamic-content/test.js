import * as assert from 'assert.js';
import { tick } from 'poly';
import Component from './main.poly';

export default async function (target) {
	const component = new Component({ target, props: { name: 'slot' } });
	await tick();
	await tick();

	const ce = target.querySelector('my-widget');

	assert.htmlEqual(
		ce.shadowRoot.innerHTML,
		`
		<slot></slot>
		<p>named fallback</p>
	`
	);

	component.name = 'slot2';
	assert.htmlEqual(
		ce.shadowRoot.innerHTML,
		`
		<slot></slot>
		<p>named fallback</p>
	`
	);
}
