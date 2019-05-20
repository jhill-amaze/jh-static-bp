import $ from 'jquery';


class BaseView {

	constructor ($el, opts) {

		this.$el = $el;
		this.options = {};
		this.data = {};
		this.state = {};
		this.options = Object.assign({}, this.options, opts);
	}
}


export default BaseView;