const webpack = require('webpack');
const path = require('path');

/*
 * SplitChunksPlugin is enabled by default and replaced
 * deprecated CommonsChunkPlugin. It automatically identifies modules which
 * should be splitted of chunk by heuristics using module duplication count and
 * module category (i. e. node_modules). And splits the chunks…
 *
 * It is safe to remove "splitChunks" from the generated configuration
 * and was added as an educational example.
 *
 * https://webpack.js.org/plugins/split-chunks-plugin/
 *
 */

const MinifyPlugin = require("babel-minify-webpack-plugin");

module.exports = {
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../../build/js/')
	},

	mode: 'production',

	entry: './src/js/main.js',

	optimization: {
		splitChunks: {
			cacheGroups: {
				vendors: {
					priority: -10,
					test: /[\\/]node_modules[\\/]/
				}
			},

			chunks: 'async',
			minChunks: 1,
			minSize: 30000,
			name: true
		}
	},

	devServer: {
		contentBase: path.join(__dirname, 'build'),
		watchContentBase: true,
		compress: true,
		port: 8080
	},

	resolve: {
		extensions: ['.scss', '.js']
	},

	plugins: [
		new MinifyPlugin({}, {})
	]
};
