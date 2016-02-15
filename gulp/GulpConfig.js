/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var argv = require('yargs')
	.usage('Usage: gulp <options>')
	.options({
		'target': {
			describe: 'Choose a platform target',
			choices: ['chrome'],
			demand: true
		},
		'env': {
			describe: 'Choose an environment build',
			choices: ['development', 'production'],
			default: 'development'
		},
		'watch': {
			describe: 'Watch files to automate build on change',
			boolean: true
		}
	})
	.argv;

var libs = ['react', 'react-dom', 'babel-polyfill'];
var environment = argv.env;
var isDebug = environment === 'development';
var isProd = environment === 'production';
var watch = argv.watch;
var babelOptions = {
	presets: ['es2015', 'react', 'stage-0'],
	plugins: ['external-helpers', 'transform-runtime']
};
var target = argv.target;

module.exports = {
	libs: libs,
	environment: environment,
	isDebug: isDebug,
	isProd: isProd,
	babelOptions: babelOptions,
	target: target,
	watch: watch
};