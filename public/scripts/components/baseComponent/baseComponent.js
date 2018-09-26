"use strict";

export default class BaseComponent {
	constructor() {
		this._element = null;
		this.events = {};
	}

	render(newContext = {}) {
		this._removeEvents();
		this._renderTemplate(newContext);
		this._addEvents();
	}

	element() {
		return this._element;
	}

	_renderTemplate(newContext = {}) {
		this._context = { ...this._context, ...newContext };
		const div = document.createElement("div");
		div.innerHTML = this._template(this._context);
		const newElement = div.firstChild;

		if (this._element) {
			this._element.parentNode.replaceChild(
				newElement,
				this._element
			);
		}

		this._element = newElement;
	}

	_addEvents() {
		Object.entries(this.events).forEach(([event, callback]) => {
			this._element.addEventListener(event, callback);
		});
	}

	_removeEvents() {
		if (this._element) {
			Object.entries(this.events).forEach(([event, callback]) => {
				this._element.removeEventListener(event, callback);
			});
		}
	}
}
