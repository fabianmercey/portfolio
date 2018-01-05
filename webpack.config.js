const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

const path = require('path');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								publicPath: '/dist'
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => {
									return [
										require('autoprefixer')()
									];
								},
								publicPath: '/dist'
							}
						},
						{
							loader: 'sass-loader',
							options: {
								publicPath: '/dist'
							}
						}
					]
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: 'images/',
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Portfolio',
			minify: {
				collapseWhitespace: true
			},
			hash: true,
			template: './src/index.ejs'
		}),
		new ExtractTextPlugin({
			filename: 'app.css',
		})
	]
}