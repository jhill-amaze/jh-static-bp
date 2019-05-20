import $ from 'jquery';

// NOTE - size entries must be sorted in ascending order
const baseBreakpointName = 'base';
const sizes = [
	{ name: 'xs', min: 480 },
	{ name: 'sm', min: 768 },
	{ name: 'md', min: 1024 },
	{ name: 'lg', min: 1280 }
];
const $window = $(window);


const getCurrent = () => {

	const viewportWidth = $window.outerWidth();

	for (let s = 0; s < sizes.length; s++) {

		const bp = sizes[s];

		if (viewportWidth >= bp.min) {

			if (s === sizes.length - 1 || viewportWidth < sizes[s + 1].min) {

				return bp.name;
			}
		}
		else {

			return baseBreakpointName;
		}
	}

	console.warn(`breakpoints.js : no matching breakpoint found for viewport width ${viewportWidth}`);
};


export default {
	sizes,
	getCurrent
};