import $ from 'jquery';
import views from './views';


const viewAttr = 'data-view';
const viewSelector = `[${viewAttr}]`;


document.addEventListener("DOMContentLoaded", event => { 

	instantiateViews();
});


// Locates any DOM elements that are bound to javascript views, decides what type of view they need, and instantiates the view passing in the element as its root element.
const instantiateViews = () => {

	$(viewSelector).each((idx, elem) => {

		const $elem = $(elem);
		const viewType = $elem.attr(viewAttr);

		if (!views.hasOwnProperty(viewType)) {
			console.warn(`main.js > instantiateViews : view of type ${viewType} not found in views list`);
		}

		new views[viewType]($elem);
	});
};
