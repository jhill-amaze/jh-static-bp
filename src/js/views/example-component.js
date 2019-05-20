// Example javascript component view
import BaseView from '../base-view';
import utils from '../utils';

class ExampleComponent extends BaseView {

	constructor (el) {

		const opts = {
			selectors: {
				container: '.js-example-component-container'
			},
			attributes: {
				src: 'data-video-src'
			},
			modifiers: {
				active: 'is--active'
			},
			markup: {
				embed: '<div class="example-component__embed">{{content}}</div>'
			}
		};

		super(el, opts);

		this.state = {
			active: false
		};

		this.init();
	}

	init () {

		this.getData();
		this.getElems();
		this.bindDomEvents();
	}

	getElems () {

		this.$container = this.$el.find(this.options.selectors.container);
	}

	getData () {

		for (const key in this.options.attributes) {

			this.data[key] = this.$el.attr(this.options.attributes[key]);
		}
	}

	bindDomEvents () {

		utils.bindClick(this.$container, this.handleClick.bind(this));
	}

	handleClick () {

		console.log(`ExampleComponent clicked at ${Date.now()}`);
	}
}

export default ExampleComponent;