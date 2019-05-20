var pretty = require('pretty');
var hbsHelpers = require('../../handlebars-helpers.js');

module.exports = function (eleventyConfig) {

	eleventyConfig.addTransform("pretty", function(content, outputPath) {

		if( outputPath.endsWith(".html") ) {
			return pretty(content, {
				ocd: true
			});
		}
	});

	// Custom helpers (handlebars)
	for (var hh in hbsHelpers) {
		if (hbsHelpers.hasOwnProperty(hh)) {
			
			eleventyConfig.addHandlebarsHelper(hh, hbsHelpers[hh]);			
		}
	}

	return {
		dir: {
			input: "./src/html/",
			output: "./build/",
			includes: "partials", // relative to input directory
			layouts: "layouts", // relative to input directory
			data: "data/dev", // relative to input directory
			dataTemplateEngine: "hbs",
			markdownTemplateEngine: "hbs",
			htmlTemplateEngine: "hbs",
			templateFormats: ["hbs"],
			passthroughFileCopy: true
		}
	};
};