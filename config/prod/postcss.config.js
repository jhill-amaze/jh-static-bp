module.exports = ctx => ({
	map: ctx.options.map,
	parser: ctx.options.parser,
	plugins: {
		'autoprefixer': {},
		'postcss-import': {}
	}
})