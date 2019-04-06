import "./about.scss";
import template from "./about.hbs";
import BaseComponent from "../baseComponent";
import LinkComponent from "../link/link";

/**
 * Компонент About
 */
export default class AboutComponent extends BaseComponent {
	constructor() {
		super();
		this.template = template;
	}

	render(context) {
		super.render(context);
		this._renderChildren();
	}

	/**
	 * Рендерит все ссылки
	 */
	_renderChildren() {
		this.renderChild("dev-1", LinkComponent, {
			text: "eadium (Fullstack developer)",
			href: "https://github.com/eadium",
		});

		this.renderChild("dev-2", LinkComponent, {
			text: "0sektor0 (Backend developer)",
			href: "https://github.com/0sektor0",
		});

		this.renderChild("mentor", LinkComponent, {
			text: "8coon (Mentor)",
			href: "https://github.com/8coon",
		});
	}
}
