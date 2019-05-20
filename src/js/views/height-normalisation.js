import BaseView from '../base-view';
import utils from '../utils';
import breakpoints from '../breakpoints';
import $ from 'jquery';


class HeightNormView extends BaseView {

	constructor (el) {

		const opts = {
			selectors: {
				normItem: '.js-height-norm-item'
			},
			attributes: {
				normItemClasses: 'data-norm-elements',
				enabledAtBreakpoints: 'data-norm-enabled-at'
			},
			separators: {
				normItemClasses: ',',
				enabledAtBreakpoints: ','
			},
			resizeDebounceMS: 100
		};

		super(el, opts);

		this.state = {
			enabled: false
		};

		this.init();
	}

	init () {

		this.getElems();
		this.getData();
		this.getItems();
		this.bindDomEvents();
		this.onResize();
	}

	getData () {

		for (const key in this.options.attributes) {

			this.data[key] = this.$el.attr(this.options.attributes[key]);
		}

		this.normItemClasses = this.data['normItemClasses'].replace(/\s/g,'').split(this.options.separators.normItemClasses);
		this.enabledBreakpointsList = this.data['enabledAtBreakpoints'].replace(/\s/g,'').split(this.options.separators.enabledAtBreakpoints);
	}

	getElems () {

		this.$window = $(window);
	}

	getItems () {

		this.normItemSets = [];

		for (let i = 0; i < this.normItemClasses.length; i++) {

			this.normItemSets.push(this.$el.find(`.${this.normItemClasses[i]}`));
		}
	}

	bindDomEvents () {

		this.$window.on('resize', utils.bindResize(this.$window, this.onResize.bind(this), this.options.resizeDebounceMS));
	}

	onResize () {

		this.autoSetEnabled();
		this.applyNormalisation();
	}

	autoSetEnabled () {

		const currentBP = breakpoints.getCurrent();

		this.state.enabled = this.enabledBreakpointsList.indexOf(currentBP) !== -1;
	}

	applyNormalisationToSet ($set) {

		$set.outerHeight('');

		if (!this.state.enabled) {
			return;
		}

		setTimeout(() => {

			$set.outerHeight(this.getTallestItem($set));

		}, 1);
	}

	applyNormalisation () {

		this.normItemSets.forEach(this.applyNormalisationToSet.bind(this));
	}


	getTallestItem ($items) {

		let tallest = 0;

		for (let i = 0; i < $items.length; i++) {

			const $item = $items.eq(i);
			const itemHeight = $item.outerHeight();

			if (itemHeight > tallest) {

				tallest = itemHeight;
			}
		}

		return tallest;
	}
}


export default HeightNormView;