var path = require('path');

module.exports = {
	entry: './src/phoenix/index.ts',
	output: {
		filename: 'build/build.js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
		modules: [
			path.resolve('./src/'),
			path.resolve('./node_modules/'),
		]
	},
	module: {
		loaders: [
			{ test: /\.ts$/, loader: 'ts-loader' },
		],
	},
};
